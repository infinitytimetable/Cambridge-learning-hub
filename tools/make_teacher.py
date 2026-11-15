"""Build the online Teacher (Master) hub: dist/hub.html gzipped and encrypted (AES-GCM, key from passcode via PBKDF2-SHA256).
usage: python3 tools/make_teacher.py <passcode> <slug>   -> docs/<slug>.html (loader) + docs/<slug>.bin"""
import sys,os,gzip,json,hashlib
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
pw,slug=sys.argv[1],sys.argv[2]; ITER=310000
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
html=open(os.path.join(root,'dist/hub.html'),'rb').read()
salt,iv=os.urandom(16),os.urandom(12)
key=PBKDF2HMAC(algorithm=hashes.SHA256(),length=32,salt=salt,iterations=ITER).derive(pw.encode())
ct=AESGCM(key).encrypt(iv,gzip.compress(html,9,mtime=0),None)
ver=hashlib.sha256(ct).hexdigest()[:10]
open(os.path.join(root,'docs',slug+'.bin'),'wb').write(salt+iv+ct)
tpl=open(os.path.join(root,'tools','teacher_loader.html'),encoding='utf-8').read()
out=tpl.replace('__SLUG__',slug).replace('__ITER__',str(ITER)).replace('__VER__',ver)
open(os.path.join(root,'docs',slug+'.html'),'w',encoding='utf-8').write(out)
man={"id":"./"+slug+".html","name":"My Teaching Hub","short_name":"My Teaching Hub","description":"My Teaching Hub: the teacher (Master) hub","start_url":"./"+slug+".html","scope":"./","display":"standalone","orientation":"any","background_color":"#ffffff","theme_color":"#0b3b36",
 "icons":[{"src":"icons/teacher-192.png","sizes":"192x192","type":"image/png","purpose":"any"},{"src":"icons/teacher-512.png","sizes":"512x512","type":"image/png","purpose":"any"},{"src":"icons/teacher-192-maskable.png","sizes":"192x192","type":"image/png","purpose":"maskable"},{"src":"icons/teacher-512-maskable.png","sizes":"512x512","type":"image/png","purpose":"maskable"}]}
open(os.path.join(root,'docs',slug+'.webmanifest'),'w').write(json.dumps(man,indent=2))
print("ok",len(ct),ver)
