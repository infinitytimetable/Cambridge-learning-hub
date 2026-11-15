"""Publish the online Teacher (Master) hub as an installable app (no passcode).
usage: python3 tools/make_teacher.py <slug>   -> docs/<slug>.html + docs/<slug>.webmanifest"""
import sys,os,json
slug=sys.argv[1];root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
h=open(os.path.join(root,'dist/hub.html'),encoding='utf-8').read()
head=(f'<link rel="manifest" href="{slug}.webmanifest"><meta name="theme-color" content="#0b3b36"><meta name="robots" content="noindex,nofollow">'
 '<link rel="icon" href="icons/teacher-192.png"><link rel="apple-touch-icon" href="icons/teacher-180.png"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes">'
 '<script>if((location.protocol==="https:"||location.hostname==="localhost")&&"serviceWorker" in navigator)addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));</script>')
i=h.index('</title>')+len('</title>');h=h[:i]+head+h[i:]
open(os.path.join(root,'docs',slug+'.html'),'w',encoding='utf-8').write(h)
man={"id":"./"+slug+".html","name":"My Teaching Hub","short_name":"My Teaching Hub","description":"My Teaching Hub: the teacher (Master) hub","start_url":"./"+slug+".html","scope":"./","display":"standalone","orientation":"any","background_color":"#ffffff","theme_color":"#0b3b36",
 "icons":[{"src":"icons/teacher-192.png","sizes":"192x192","type":"image/png","purpose":"any"},{"src":"icons/teacher-512.png","sizes":"512x512","type":"image/png","purpose":"any"},{"src":"icons/teacher-192-maskable.png","sizes":"192x192","type":"image/png","purpose":"maskable"},{"src":"icons/teacher-512-maskable.png","sizes":"512x512","type":"image/png","purpose":"maskable"}]}
open(os.path.join(root,'docs',slug+'.webmanifest'),'w').write(json.dumps(man,indent=2))
print("ok",len(h))
