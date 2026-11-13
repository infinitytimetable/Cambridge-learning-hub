# LOTS Cambridge Learning Hub - installer (no administrator rights, no internet needed)
$ErrorActionPreference = 'Stop'
$AppName = 'LOTS Hub'
$src = Split-Path -Parent $MyInvocation.MyCommand.Path
$app = Join-Path $env:LOCALAPPDATA $AppName
$docs = [Environment]::GetFolderPath('MyDocuments')
$content = Join-Path $docs 'LOTS Hub Content'

$NewVer = '4.0'
New-Item -ItemType Directory -Force -Path $app | Out-Null
$logFile = Join-Path $app 'install-log.txt'
function Log($m) { try { Add-Content -LiteralPath $logFile -Value ((Get-Date -Format 'yyyy-MM-dd HH:mm:ss') + '  ' + $m) } catch {} }
Log ('--- Setup 2.5 started (Windows ' + [Environment]::OSVersion.Version + ', PowerShell ' + $PSVersionTable.PSVersion + ') ---')
trap {
  Log ('ERROR: ' + $_.Exception.Message + ' at line ' + $_.InvocationInfo.ScriptLineNumber)
  Write-Host ''
  Write-Host '  Setup could not finish.' -ForegroundColor Red
  Write-Host ('  Reason: ' + $_.Exception.Message) -ForegroundColor Red
  Write-Host ('  Your saved data was NOT changed. Details were written to: ' + $logFile)
  Write-Host '  Please send that file to your IT support or to the developer.'
  exit 1
}

Write-Host ''
Write-Host '  LOTS Cambridge Learning Hub - setup' -ForegroundColor Green
Write-Host '  -----------------------------------'
Write-Host ''

# ---- is a version already installed? (update instead of fresh install) ----
$oldCfg = @{}
$cfgPath = Join-Path $app 'config.txt'
if (Test-Path -LiteralPath $cfgPath) { Get-Content -LiteralPath $cfgPath -ErrorAction SilentlyContinue | ForEach-Object { if ($_ -match '^([^=]+)=(.*)$') { $oldCfg[$matches[1]] = $matches[2] } } }
$oldVer = ''
$verFile = Join-Path $app 'version.txt'
if (Test-Path -LiteralPath $verFile) { try { $oldVer = (Get-Content -LiteralPath $verFile -Raw).Trim() } catch {} }
$isUpdate = (Test-Path -LiteralPath (Join-Path $app 'hub.html')) -or ($oldCfg.Count -gt 0)
if ($isUpdate) {
  if (-not $oldVer) { $oldVer = 'an earlier version' } else { $oldVer = 'version ' + $oldVer }
  Write-Host ("  Found " + $oldVer + " of LOTS Hub. This will UPDATE it to $NewVer.") -ForegroundColor Cyan
  Write-Host '  Your progress, marks, plans and your content folder are kept.' -ForegroundColor Cyan
  Write-Host ''
  Log ('Update from ' + $oldVer)
}
# older desktop-app (portable) versions are a separate program with their own data
$electron = @()
foreach ($d in (Join-Path $env:APPDATA 'LOTS Hub'), (Join-Path $env:APPDATA 'lots-hub'), (Join-Path $env:LOCALAPPDATA 'Programs\LOTS Hub')) { if (Test-Path -LiteralPath $d) { $electron += $d } }

# ---- find Chrome / Edge ----
function Find-Exe($names, $rel) {
  $c = @()
  foreach ($n in $names) {
    foreach ($b in @($env:ProgramFiles, ${env:ProgramFiles(x86)}, $env:LOCALAPPDATA)) { if ($b) { $c += (Join-Path $b $rel) } }
    foreach ($h in 'HKLM','HKCU') {
      try { $v = (Get-ItemProperty "$($h):\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\$n" -ErrorAction Stop).'(default)'; if ($v) { $c += $v } } catch {}
    }
  }
  foreach ($p in $c) { if ($p -and (Test-Path -LiteralPath $p)) { return $p } }
  return $null
}
$chrome = Find-Exe @('chrome.exe') 'Google\Chrome\Application\chrome.exe'
$edge = Find-Exe @('msedge.exe') 'Microsoft\Edge\Application\msedge.exe'
if (-not $chrome -and -not $edge) {
  Write-Host '  Google Chrome or Microsoft Edge was not found on this computer.' -ForegroundColor Red
  Write-Host '  Please install one of them and run Install.bat again.'
  exit 1
}
$browser = $null; $bname = $null
# an update keeps using the same browser so the saved data is found again
if ($oldCfg['browser'] -and (Test-Path -LiteralPath $oldCfg['browser'])) {
  $browser = $oldCfg['browser']
  if ($oldCfg['data'] -match 'Data-(\w+)') { $bname = $matches[1] } else { $bname = $(if ($browser -match 'msedge') { 'Edge' } else { 'Chrome' }) }
} elseif ($chrome -and $edge) {
  Write-Host '  Both browsers were found. Which should LOTS Hub use?'
  Write-Host '    1 = Google Chrome'
  Write-Host '    2 = Microsoft Edge'
  $a = ''
  try { $a = Read-Host '  Type 1 or 2 and press Enter (Enter alone = Chrome)' } catch {}
  if ($a -eq '2') { $browser = $edge; $bname = 'Edge' } else { $browser = $chrome; $bname = 'Chrome' }
} elseif ($chrome) { $browser = $chrome; $bname = 'Chrome' } else { $browser = $edge; $bname = 'Edge' }
Write-Host "  Using $bname." -ForegroundColor Cyan

# ---- close anything that is using the old files (saves first, so the open Hub is flushed) ----
$running = @()
try {
  $running = @(Get-CimInstance Win32_Process -ErrorAction Stop | Where-Object { ($_.CommandLine -and $_.CommandLine -like '*LOTS Hub*') -and ($_.ProcessId -ne $PID) -and ($_.Name -notmatch '^(powershell|pwsh|LOTS-Hub-Setup.*)\.exe$') })
} catch {}
$hubWindows = @($running | Where-Object { $_.CommandLine -like '*--user-data-dir*' -or $_.Name -like 'LOTS Hub*' })
if ($hubWindows.Count -gt 0) {
  Write-Host '  LOTS Hub is open. Closing it so it can be updated (your work is saved automatically)...' -ForegroundColor Yellow
  Log ('Closing ' + $hubWindows.Count + ' Hub process(es)')
  foreach ($r in $hubWindows) { try { Stop-Process -Id $r.ProcessId -Force -ErrorAction SilentlyContinue } catch {} }
  Start-Sleep -Seconds 2
}
foreach ($n in 'LOTS-Reminder','LOTS Hub') { Get-Process -Name $n -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue }
Start-Sleep -Milliseconds 600

# ---- safety copy of saved data before anything is replaced ----
if ($isUpdate) {
  try {
    $bkRoot = Join-Path $docs 'LOTS Hub Backups'
    $bk = Join-Path $bkRoot ('before-update-' + (Get-Date -Format 'yyyy-MM-dd_HHmm'))
    $made = $false
    foreach ($dd in (Get-ChildItem -LiteralPath $app -Directory -Filter 'Data-*' -ErrorAction SilentlyContinue)) {
      foreach ($sub in 'Default\Local Storage','Default\IndexedDB','Default\Session Storage') {
        $from = Join-Path $dd.FullName $sub
        if (Test-Path -LiteralPath $from) {
          $to = Join-Path $bk (Join-Path $dd.Name $sub)
          New-Item -ItemType Directory -Force -Path (Split-Path $to -Parent) | Out-Null
          Copy-Item -LiteralPath $from -Destination $to -Recurse -Force -ErrorAction SilentlyContinue
          $made = $true
        }
      }
    }
    foreach ($f in 'config.txt','version.txt') { if (Test-Path -LiteralPath (Join-Path $app $f)) { New-Item -ItemType Directory -Force -Path $bk | Out-Null; Copy-Item -LiteralPath (Join-Path $app $f) -Destination $bk -Force -ErrorAction SilentlyContinue } }
    if ($made) {
      Write-Host "  Safety copy of your saved data: $bk" -ForegroundColor Green
      Log ('Backup written to ' + $bk)
    }
    # keep only the 5 newest safety copies
    Get-ChildItem -LiteralPath $bkRoot -Directory -Filter 'before-update-*' -ErrorAction SilentlyContinue | Sort-Object Name -Descending | Select-Object -Skip 5 | ForEach-Object { Remove-Item -LiteralPath $_.FullName -Recurse -Force -ErrorAction SilentlyContinue }
  } catch { Log ('Backup step problem: ' + $_.Exception.Message); Write-Host '  (Could not make the safety copy, continuing. Saved data is not touched by the update.)' -ForegroundColor Yellow }
}

# ---- copy files (progress data in Data-* is never touched) ----
foreach ($f in 'hub.html','picker.html','icon.ico','launch.ps1','launch.vbs','uninstall.ps1','update.ps1','LOTS-Reminder.exe') {
  $ok = $false
  for ($t = 1; $t -le 4 -and -not $ok; $t++) {
    try { Copy-Item -LiteralPath (Join-Path $src $f) -Destination (Join-Path $app $f) -Force -ErrorAction Stop; $ok = $true }
    catch { Log ("Copy $f attempt $t failed: " + $_.Exception.Message); Start-Sleep -Seconds 1; if ($f -eq 'LOTS-Reminder.exe') { Get-Process -Name 'LOTS-Reminder' -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue } }
  }
  if (-not $ok) { throw "Could not replace $f. Close LOTS Hub (and any anti-virus scan) and run Setup again." }
}
$data = Join-Path $app ("Data-$bname")
New-Item -ItemType Directory -Force -Path $data | Out-Null
[IO.File]::WriteAllText((Join-Path $app 'config.txt'), ("browser=$browser`r`ndata=$data`r`ncontent=$content`r`n"), (New-Object Text.UTF8Encoding($false)))
Get-ChildItem -LiteralPath $app -File | ForEach-Object { try { Unblock-File -LiteralPath $_.FullName } catch {} }

# ---- content folder (existing files are kept) ----
foreach ($c in '0620','0610','9700') { foreach ($k in 'Papers','Notes') { New-Item -ItemType Directory -Force -Path (Join-Path $content "$k\$c") | Out-Null } }
foreach ($k in 'Images','Lessons','Questions','Figures') { New-Item -ItemType Directory -Force -Path (Join-Path $content $k) | Out-Null }
$tpl = Join-Path $src 'content'
foreach ($rel in 'README.txt','Lessons\example-lesson.json','Questions\example-questions.json') {
  $dst = Join-Path $content $rel
  if (-not (Test-Path -LiteralPath $dst) -or $rel -eq 'README.txt') { Copy-Item -LiteralPath (Join-Path $tpl $rel) -Destination $dst -Force }
}

# ---- built-in notes pack (replaced on every update; your own files are never touched) ----
Get-ChildItem -LiteralPath (Join-Path $tpl 'Lessons') -Filter 'pack-*.json' -File -ErrorAction SilentlyContinue | ForEach-Object { Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $content 'Lessons') -Force }
if (Test-Path -LiteralPath (Join-Path $tpl 'Figures')) { Copy-Item -Path (Join-Path $tpl 'Figures\*') -Destination (Join-Path $content 'Figures') -Recurse -Force -ErrorAction SilentlyContinue }
# ---- v1.4: the built-in 0610 pictures were rebuilt; move the old set aside once so nothing shows twice ----
$nv = Join-Path $app 'notes-version.txt'
$have = ''
if (Test-Path -LiteralPath $nv) { try { $have = (Get-Content -LiteralPath $nv -Raw).Trim() } catch {} }
$old0610 = Join-Path $content 'Notes\0610'
if ($have -ne '1.4' -and (Test-Path -LiteralPath $old0610) -and (Get-ChildItem -LiteralPath $old0610 -Force -ErrorAction SilentlyContinue | Select-Object -First 1)) {
  try {
    $bkRoot = Join-Path (Split-Path $content -Parent) 'LOTS Hub Old Notes'
    New-Item -ItemType Directory -Force -Path $bkRoot | Out-Null
    $bk = Join-Path $bkRoot ('0610 ' + (Get-Date -Format 'yyyy-MM-dd_HHmm'))
    Move-Item -LiteralPath $old0610 -Destination $bk -Force
    New-Item -ItemType Directory -Force -Path $old0610 | Out-Null
    Write-Host "  Your previous 0610 notes were moved to: $bk" -ForegroundColor Yellow
  } catch { Write-Host '  Could not move the previous 0610 notes (they stay where they are).' -ForegroundColor Yellow }
}
if (Test-Path -LiteralPath (Join-Path $tpl 'Notes')) { Copy-Item -Path (Join-Path $tpl 'Notes\*') -Destination (Join-Path $content 'Notes') -Recurse -Force -ErrorAction SilentlyContinue }
try { [IO.File]::WriteAllText($nv, '1.4') } catch {}
try { [IO.File]::WriteAllText($verFile, $NewVer) } catch {}
Log ('Files installed, version ' + $NewVer)

# ---- shortcuts ----
$sh = New-Object -ComObject WScript.Shell
$ico = Join-Path $app 'icon.ico'
$vbs = Join-Path $app 'launch.vbs'
$desk = [Environment]::GetFolderPath('Desktop')
$start = Join-Path ([Environment]::GetFolderPath('Programs')) $AppName
New-Item -ItemType Directory -Force -Path $start | Out-Null
function Make-Link($path, $target, $arguments, $icon, $desc) {
  $l = $sh.CreateShortcut($path)
  $l.TargetPath = $target; $l.Arguments = $arguments; $l.IconLocation = $icon; $l.Description = $desc; $l.WorkingDirectory = $app
  $l.Save()
}
$wscript = Join-Path $env:WINDIR 'System32\wscript.exe'
foreach ($dir in $desk, $start) { Make-Link (Join-Path $dir 'LOTS Hub.lnk') $wscript ('"' + $vbs + '"') $ico 'LOTS Cambridge Learning Hub' }
Make-Link (Join-Path $start 'LOTS Hub Content folder.lnk') $content '' $ico 'Put your papers, notes, images and new lessons here'
Make-Link (Join-Path $desk 'LOTS Hub Content.lnk') $content '' $ico 'Put your papers, notes, images and new lessons here'
$pk = ([Uri](Join-Path $app 'picker.html')).AbsoluteUri
$pkArgs = '--app=' + $pk + ' --user-data-dir="' + $data + '" --no-first-run --no-default-browser-check --start-maximized'
foreach ($dir in $desk, $start) { Make-Link (Join-Path $dir 'LOTS Slide Picker.lnk') $browser $pkArgs $ico 'Turn lecture-note slides into pictures for the hub' }
$un = Join-Path $app 'uninstall.ps1'
Make-Link (Join-Path $start 'Uninstall LOTS Hub.lnk') (Join-Path $env:WINDIR 'System32\WindowsPowerShell\v1.0\powershell.exe') ('-NoProfile -ExecutionPolicy Bypass -File "' + $un + '"') $ico 'Remove LOTS Hub'

# ---- v1.7: lesson reminder helper (starts with Windows, runs quietly in the background) ----
try {
  $rem = Join-Path $app 'LOTS-Reminder.exe'
  $startup = [Environment]::GetFolderPath('Startup')
  Make-Link (Join-Path $startup 'LOTS Hub Reminders.lnk') $rem '' $ico 'Reminds you before each lesson'
  Start-Process -FilePath $rem -WindowStyle Hidden
} catch { Write-Host '  Could not start the reminder helper (the Hub still works).' -ForegroundColor Yellow }

Write-Host ''
if ($isUpdate) { Write-Host "  Done. LOTS Hub was updated to $NewVer - nothing was lost." -ForegroundColor Green } else { Write-Host '  Done. LOTS Hub is installed.' -ForegroundColor Green }
if ($electron.Count -gt 0) {
  Write-Host ''
  Write-Host '  NOTE: an older desktop-app copy of LOTS Hub was also found on this computer.' -ForegroundColor Yellow
  Write-Host '  It keeps its own separate data. To bring that data across: open the OLD app,'
  Write-Host '  go to Settings > Back up / Restore > Save backup, then open the NEW Hub and'
  Write-Host '  use Restore. After that you can delete the old app. See README.txt, section 4.'
}
Log 'Setup finished OK'
Write-Host '    - Open it from the "LOTS Hub" icon on the Desktop or Start menu.'
Write-Host '    - Lesson reminders run in the background (set times in Hub > Classes and reports).'
Write-Host '    - "LOTS Slide Picker" turns lecture-note PDFs into pictures for your lessons.'
Write-Host "    - Your files go in:  $content"
Write-Host '      (also on the Desktop as "LOTS Hub Content")'
Write-Host ''
$o = ''
try { $o = Read-Host '  Open LOTS Hub now? (Y/N, Enter = Yes)' } catch {}
if ($o -ne 'n' -and $o -ne 'N') { Start-Process -FilePath $wscript -ArgumentList ('"' + $vbs + '"') }
