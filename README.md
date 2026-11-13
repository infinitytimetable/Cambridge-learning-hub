# LOTS Cambridge Learning Hub

Teaching and learning hub for Cambridge IGCSE Chemistry 0620, IGCSE Biology 0610 and AS & A Level Biology 9700, made by Kasonde Mumba (Lusaka Oaktree School).

| Folder | What it is |
|---|---|
| `dist/` | The current Master (teacher) hub for Windows and the files the installed app updates itself with |
| `update/manifest.json` | The version number and file fingerprints that installed hubs check |
| `docs/` | The learner hubs (IGCSE and A Level), published as a website with GitHub Pages |
| `installer/` | Windows installer scripts and the setup stub source |
| `src/` | Source files; `bash build.sh all` rebuilds the three hubs |
| `tools/make_manifest.py` | Writes a new `update/manifest.json` |

The full installer (`LOTS-Hub-Setup-v4.0.exe`) is attached to the [latest release](../../releases/latest).

## How online updating works

1. Version 4.0 and newer installs include `update.ps1`. Each time the Hub opens, it runs hidden in the background.
2. It reads `update/manifest.json` from this repository. If the version there is newer than the installed one, it downloads the changed files from `dist/`.
3. It checks each downloaded file against its SHA-256 fingerprint before swapping it in, and keeps the old files in `previous-version`.
4. The new version is used the next time the Hub opens, and a short message says it was updated.
5. It never touches saved progress or the `Documents\LOTS Hub Content` folder. Everything is logged in `%LOCALAPPDATA%\LOTS Hub\update-log.txt`.
6. To switch updating off on one computer, add the line `autoupdate=off` to `%LOCALAPPDATA%\LOTS Hub\config.txt`.

## Publishing a new version

```bash
cd src && bash build.sh all && cd ..
cp src/hub.html dist/hub.html
cp src/hub_igcse.html docs/igcse.html
cp src/hub_alevel.html docs/alevel.html
python3 tools/make_manifest.py 4.1 "One line about what changed"
git add -A && git commit -m "Version 4.1" && git push
```

Installs older than 4.0 have no updater: run `LOTS-Hub-Setup-v4.0.exe` on them once.
