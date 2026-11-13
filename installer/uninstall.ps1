# LOTS Cambridge Learning Hub - uninstaller
$AppName = 'LOTS Hub'
$app = Join-Path $env:LOCALAPPDATA $AppName
$desk = [Environment]::GetFolderPath('Desktop')
$start = Join-Path ([Environment]::GetFolderPath('Programs')) $AppName
Write-Host ''
Write-Host '  Removing LOTS Hub...' -ForegroundColor Yellow
Get-Process -Name 'LOTS-Reminder' -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Remove-Item -LiteralPath (Join-Path ([Environment]::GetFolderPath('Startup')) 'LOTS Hub Reminders.lnk') -Force -ErrorAction SilentlyContinue
Start-Sleep -Milliseconds 500
Remove-Item -LiteralPath (Join-Path $desk 'LOTS Hub.lnk') -Force -ErrorAction SilentlyContinue
Remove-Item -LiteralPath (Join-Path $desk 'LOTS Hub Content.lnk') -Force -ErrorAction SilentlyContinue
Remove-Item -LiteralPath $start -Recurse -Force -ErrorAction SilentlyContinue
$keep = $false
if (Test-Path -LiteralPath $app) {
  $a = Read-Host '  Also delete saved progress (learner marks, plans, overviews)? (Y/N, Enter = No, keep it)'
  if ($a -eq 'y' -or $a -eq 'Y') {
    Remove-Item -LiteralPath $app -Recurse -Force -ErrorAction SilentlyContinue
  } else {
    $keep = $true
    Get-ChildItem -LiteralPath $app -Force | Where-Object { $_.Name -notlike 'Data-*' } | ForEach-Object { Remove-Item -LiteralPath $_.FullName -Recurse -Force -ErrorAction SilentlyContinue }
  }
}
Write-Host ''
Write-Host '  LOTS Hub has been removed.' -ForegroundColor Green
if ($keep) { Write-Host "  Your saved progress was kept in $app" }
Write-Host '  Your content folder (Documents\LOTS Hub Content) was not touched.'
Write-Host ''
