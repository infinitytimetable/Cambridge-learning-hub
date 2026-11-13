#!/usr/bin/env python3
"""Write update/manifest.json for the installed Windows hubs.
Usage: python3 tools/make_manifest.py 4.1 "What changed in one or two lines"
Run it after copying the new build into dist/, then commit and push. Installed hubs pick it up
automatically the next time they open (and use it the time after that)."""
import hashlib, json, os, sys, datetime
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ver = sys.argv[1] if len(sys.argv) > 1 else "4.0"
notes = sys.argv[2] if len(sys.argv) > 2 else ""
files = []
for name in ["hub.html", "picker.html", "launch.ps1", "launch.vbs", "update.ps1"]:
    p = os.path.join(root, "dist", name)
    if not os.path.exists(p): continue
    h = hashlib.sha256(open(p, "rb").read()).hexdigest()
    files.append({"name": name, "path": "dist/" + name, "sha256": h, "size": os.path.getsize(p)})
m = {"app": "LOTS Cambridge Learning Hub (Master, Windows)", "version": ver, "date": datetime.date.today().isoformat(),
     "minSetup": "4.0", "notes": notes, "files": files}
json.dump(m, open(os.path.join(root, "update", "manifest.json"), "w"), indent=1, ensure_ascii=False)
print(json.dumps(m, indent=1, ensure_ascii=False))
