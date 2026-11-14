# LOTS Cambridge Learning Hub - launcher. Scans the content folder, then opens the hub in an app window.
$ErrorActionPreference = 'Stop'
$logf = Join-Path (Split-Path -Parent $MyInvocation.MyCommand.Path) 'launch-log.txt'
function Show-Fail($m) {
  try { Add-Content -LiteralPath $logf -Value ((Get-Date -Format 'yyyy-MM-dd HH:mm:ss') + '  ' + $m) } catch {}
  try { (New-Object -ComObject WScript.Shell).Popup("LOTS Hub could not open.`n`n" + $m + "`n`nRun Setup again to repair it. Details: " + $logf, 0, 'LOTS Hub', 16) | Out-Null } catch {}
}
trap { Show-Fail $_.Exception.Message; exit 1 }
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$cfg = @{}
Get-Content (Join-Path $here 'config.txt') | ForEach-Object { if ($_ -match '^([^=]+)=(.*)$') { $cfg[$matches[1]] = $matches[2] } }
$content = $cfg['content']

# ---- scan the content folder and write content.js next to the hub ----
try {
  $files = @(); $json = @()
  if (Test-Path -LiteralPath $content) {
    $rootFull = (Get-Item -LiteralPath $content).FullName.TrimEnd('\')
    foreach ($cat in 'Papers','Notes','Images') {
      $d = Join-Path $rootFull $cat
      if (Test-Path -LiteralPath $d) {
        Get-ChildItem -LiteralPath $d -Recurse -File -ErrorAction SilentlyContinue | Where-Object { $_.Name -notmatch '^\.' -and $_.Name -notmatch '^readme' } | Sort-Object FullName | Select-Object -First 5000 | ForEach-Object {
          $rel = $_.FullName.Substring($rootFull.Length + 1).Replace('\','/')
          $files += ('{"name":' + ($_.Name | ConvertTo-Json) + ',"rel":' + ($rel | ConvertTo-Json) + '}')
        }
      }
    }
    foreach ($cat in 'Lessons','Questions') {
      $d = Join-Path $rootFull $cat
      if (Test-Path -LiteralPath $d) {
        Get-ChildItem -LiteralPath $d -Filter *.json -File -ErrorAction SilentlyContinue | Where-Object { $_.Name -notmatch '^(template|example)' } | Sort-Object Name | ForEach-Object {
          $raw = [IO.File]::ReadAllText($_.FullName)
          $json += ('{"dir":"' + $cat + '","file":' + ($_.Name | ConvertTo-Json) + ',"raw":' + ($raw | ConvertTo-Json) + '}')
        }
      }
    }
  }
  $rootUrl = ([Uri]((Get-Item -LiteralPath $content).FullName.TrimEnd('\') + '\')).AbsoluteUri
  $js = 'window.LOTS_CONTENT={"root":' + ($rootUrl | ConvertTo-Json) + ',"rootText":' + ($content | ConvertTo-Json) + ',"files":[' + ($files -join ',') + '],"json":[' + ($json -join ',') + ']};'
  [IO.File]::WriteAllText((Join-Path $here 'content.js'), $js, (New-Object Text.UTF8Encoding($false)))
  # tell the hub once that it was updated in the background (see update.ps1)
  $un = Join-Path $here 'update-notes.txt'
  if (Test-Path -LiteralPath $un) {
    $vt = ''; try { $vt = (Get-Content -LiteralPath (Join-Path $here 'version.txt') -Raw).Trim() } catch {}
    $nt = [IO.File]::ReadAllText($un)
    [IO.File]::AppendAllText((Join-Path $here 'content.js'), ('window.LOTS_UPDATE={"version":' + ($vt | ConvertTo-Json) + ',"notes":' + ($nt | ConvertTo-Json) + '};'), (New-Object Text.UTF8Encoding($false)))
    Move-Item -LiteralPath $un -Destination (Join-Path $here 'update-notes-shown.txt') -Force -ErrorAction SilentlyContinue
  }
} catch {
  try { [IO.File]::WriteAllText((Join-Path $here 'content.js'), 'window.LOTS_CONTENT=null;', (New-Object Text.UTF8Encoding($false))) } catch {}
}

# ---- open the hub ----
if (-not (Test-Path -LiteralPath $cfg['browser'])) { throw ('The browser set up for LOTS Hub was not found: ' + $cfg['browser'] + '. Run Setup again to choose a browser.') }
if (-not (Test-Path -LiteralPath (Join-Path $here 'hub.html'))) { throw 'hub.html is missing from the install folder.' }
New-Item -ItemType Directory -Force -Path $cfg['data'] | Out-Null
$hubUrl = ([Uri](Join-Path $here 'hub.html')).AbsoluteUri
$LaunchArgs = @('--app=' + $hubUrl, '--user-data-dir=' + $cfg['data'], '--no-first-run', '--no-default-browser-check', '--start-maximized', '--allow-file-access-from-files')
Start-Process -FilePath $cfg['browser'] -ArgumentList $LaunchArgs

# ---- check GitHub for a newer version in the background (used next time the Hub opens) ----
try {
  $up = Join-Path $here 'update.ps1'
  if ((Test-Path -LiteralPath $up) -and ($cfg['autoupdate'] -ne 'off')) {
    Start-Process -FilePath 'powershell.exe' -ArgumentList @('-NoProfile','-ExecutionPolicy','Bypass','-WindowStyle','Hidden','-File',('"' + $up + '"')) -WindowStyle Hidden
  }
} catch {}
