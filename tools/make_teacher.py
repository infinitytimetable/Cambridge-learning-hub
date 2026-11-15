"""Publish the online Teacher (Master) hub as an installable app in its own folder.
usage: python3 tools/make_teacher.py <slug>   -> docs/<slug>/index.html (manifest lives in docs/<slug>/)"""
import sys,os
slug=sys.argv[1];root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
h=open(os.path.join(root,'dist/hub.html'),encoding='utf-8').read()
head=('<link rel="manifest" href="manifest.webmanifest"><meta name="theme-color" content="#0b3b36"><meta name="robots" content="noindex,nofollow">'
 '<link rel="icon" href="../icons/teacher-192.png"><link rel="apple-touch-icon" href="../icons/teacher-180.png"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes">'
 '<script>if((location.protocol==="https:"||location.hostname==="localhost")&&"serviceWorker" in navigator)addEventListener("load",()=>navigator.serviceWorker.register("../sw.js").catch(()=>{}));</script>')
i=h.index('</title>')+8
os.makedirs(os.path.join(root,'docs',slug),exist_ok=True)
open(os.path.join(root,'docs',slug,'index.html'),'w',encoding='utf-8').write(h[:i]+head+h[i:])
print("ok")
