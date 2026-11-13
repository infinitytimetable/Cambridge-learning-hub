# LOTS Cambridge Learning Hub - automatic updater.
# Runs hidden in the background each time the Hub opens. It checks the GitHub repository for a newer
# version, downloads the changed files, checks each one against its SHA-256 fingerprint, and only then
# swaps them in. The new version is used the next time the Hub opens. Saved progress and the
# Documents\LOTS Hub Content folder are never touched. Everything is written to update-log.txt.
$ErrorActionPreference = 'Stop'
$Repo     = 'infinitytimetable/Cambridge-learning-hub'
$Branch   = 'main'
$here     = Split-Path -Parent $MyInvocation.MyCommand.Path
$logf     = Join-Path $here 'update-log.txt'
$lockf    = Join-Path $here 'update.lock'
$stage    = Join-Path $here 'update-staging'
$prev     = Join-Path $here 'previous-version'
function Log($m) { try { Add-Content -LiteralPath $logf -Value ((Get-Date -Format 'yyyy-MM-dd HH:mm:ss') + '  ' + $m) } catch {} }
function Sha($p) { (Get-FileHash -LiteralPath $p -Algorithm SHA256).Hash.ToLowerInvariant() }
function Ver($s) { $t = ([string]$s -replace '[^0-9.]','').Trim('.'); if ($t -notmatch '\.') { $t += '.0' }; try { return [version]$t } catch { return [version]'0.0' } }

# keep the log short
try { if ((Test-Path -LiteralPath $logf) -and ((Get-Item -LiteralPath $logf).Length -gt 200KB)) { Remove-Item -LiteralPath $logf -Force } } catch {}

# only one updater at a time (a stale lock older than 2 hours is ignored)
if (Test-Path -LiteralPath $lockf) {
  if (((Get-Date) - (Get-Item -LiteralPath $lockf).LastWriteTime).TotalHours -lt 2) { exit 0 }
}
try { Set-Content -LiteralPath $lockf -Value $PID } catch { exit 0 }

try {
  try { [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12 } catch {}
  $verFile = Join-Path $here 'version.txt'
  $local = if (Test-Path -LiteralPath $verFile) { (Get-Content -LiteralPath $verFile -Raw).Trim() } else { '0' }
  $base = "https://raw.githubusercontent.com/$Repo/$Branch"
  $wc = New-Object Net.WebClient
  $wc.Headers['User-Agent'] = 'LOTS-Hub-Updater'
  $wc.Headers['Cache-Control'] = 'no-cache'
  try { $raw = $wc.DownloadString("$base/update/manifest.json?t=" + [DateTime]::UtcNow.Ticks) }
  catch { Log ('No internet or GitHub not reachable: ' + $_.Exception.Message); exit 0 }
  $m = $raw | ConvertFrom-Json
  if ((Ver $m.version) -le (Ver $local)) { Log ("Up to date (installed $local, online " + $m.version + ').'); exit 0 }
  if ($m.minSetup -and ((Ver $local) -lt (Ver $m.minSetup))) { Log ('Version ' + $m.version + ' needs the full installer (Setup ' + $m.minSetup + ' or newer). Skipped.'); exit 0 }
  Log ("Updating from $local to " + $m.version + ' ...')

  # download every changed file into the staging folder and check it
  if (Test-Path -LiteralPath $stage) { Remove-Item -LiteralPath $stage -Recurse -Force }
  New-Item -ItemType Directory -Force -Path $stage | Out-Null
  $todo = @()
  foreach ($f in $m.files) {
    $dst = Join-Path $here $f.name
    if ((Test-Path -LiteralPath $dst) -and ((Sha $dst) -eq $f.sha256.ToLowerInvariant())) { continue }
    $tmp = Join-Path $stage $f.name
    $url = if ($f.url) { $f.url } else { "$base/" + $f.path }
    $ok = $false
    for ($try = 1; $try -le 3 -and -not $ok; $try++) {
      try {
        $wc.DownloadFile($url + '?t=' + [DateTime]::UtcNow.Ticks, $tmp)
        if ((Sha $tmp) -eq $f.sha256.ToLowerInvariant()) { $ok = $true } else { Log ($f.name + ': fingerprint did not match (try ' + $try + ').') }
      } catch { Log ($f.name + ': download failed (try ' + $try + '): ' + $_.Exception.Message) }
    }
    if (-not $ok) { Log 'Update stopped; nothing was changed. It will try again next time.'; exit 0 }
    $todo += $f.name
  }

  # swap the files in, keeping the old ones in previous-version
  if (Test-Path -LiteralPath $prev) { Remove-Item -LiteralPath $prev -Recurse -Force }
  New-Item -ItemType Directory -Force -Path $prev | Out-Null
  foreach ($n in $todo) {
    $dst = Join-Path $here $n
    if (Test-Path -LiteralPath $dst) { Copy-Item -LiteralPath $dst -Destination (Join-Path $prev $n) -Force }
    $moved = $false
    for ($try = 1; $try -le 10 -and -not $moved; $try++) {
      try { Copy-Item -LiteralPath (Join-Path $stage $n) -Destination $dst -Force; $moved = $true } catch { Start-Sleep -Seconds 3 }
    }
    if (-not $moved) {
      Log ($n + ': could not be replaced (file in use). Restoring the previous version.')
      foreach ($r in $todo) { $b = Join-Path $prev $r; if (Test-Path -LiteralPath $b) { Copy-Item -LiteralPath $b -Destination (Join-Path $here $r) -Force -ErrorAction SilentlyContinue } }
      exit 0
    }
  }
  [IO.File]::WriteAllText($verFile, [string]$m.version)
  Set-Content -LiteralPath (Join-Path $here 'update-notes.txt') -Value ("Updated to version " + $m.version + " on " + (Get-Date -Format 'd MMMM yyyy HH:mm') + "`r`n`r`n" + [string]$m.notes)
  Remove-Item -LiteralPath $stage -Recurse -Force -ErrorAction SilentlyContinue
  Log ('Updated to ' + $m.version + ' (' + ($todo -join ', ') + '). Close and reopen the Hub to use it.')
} catch {
  Log ('Updater error: ' + $_.Exception.Message)
} finally {
  Remove-Item -LiteralPath $lockf -Force -ErrorAction SilentlyContinue
}
