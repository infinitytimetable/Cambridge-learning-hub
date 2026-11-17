"""Cut the diagrams out of the scanned topical question sheets.
usage: crop.py <pdf> <topic-key> <outdir>"""
import sys,os,re,json,subprocess,glob,tempfile
import numpy as np,cv2
from PIL import Image
pdf,key,od=sys.argv[1],sys.argv[2],sys.argv[3];os.makedirs(od,exist_ok=True)
tmp=tempfile.mkdtemp()
subprocess.run(['pdfimages','-png',pdf,tmp+'/p'],check=True)
pages=sorted(glob.glob(tmp+'/p-*.png'))
def clean(path):
    a=np.array(Image.open(path).convert('RGB')).astype(int)
    r,g,b=a[...,0],a[...,1],a[...,2];lum=(r*299+g*587+b*114)//1000
    blue=(b-r>35)
    out=np.where((lum>195)|blue,255,np.clip((lum-10)*1.15,0,255)).astype(np.uint8)
    return out
def ocr(img):
    p=tmp+'/o.png';cv2.imwrite(p,img)
    t=subprocess.run(['tesseract',p,'-','--psm','3','tsv'],capture_output=True,text=True).stdout
    W=[]
    for ln in t.splitlines()[1:]:
        f=ln.split('\t')
        if len(f)<12 or not f[11].strip():continue
        try:c=float(f[10])
        except:continue
        W.append(dict(x=int(f[6]),y=int(f[7]),w=int(f[8]),h=int(f[9]),c=c,t=f[11].strip()))
    return W
res=[];qmarks=[]
for pi,pg in enumerate(pages):
    img=clean(pg);H,Wd=img.shape
    words=ocr(img)
    top,bot=110,H-110
    strip=(img[:,50:140]<150).astype(np.uint8);strip[:top,:]=0;strip[bot:,:]=0
    dd=cv2.dilate(strip,cv2.getStructuringElement(cv2.MORPH_RECT,(14,5)))
    n_,lb_,st_,_=cv2.connectedComponentsWithStats(dd,8)
    for i in range(1,n_):
        x,y,w,h,a=st_[i]
        if not(12<=h<=34 and 8<=w<=45):continue
        if x+w>=88:continue   # sub-part labels like (a) sit further right
        c=img[y-6:y+h+6,50+x-6:50+x+w+6]
        c=cv2.copyMakeBorder(c,20,20,20,20,cv2.BORDER_CONSTANT,value=255)
        p=tmp+'/n.png';cv2.imwrite(p,cv2.resize(c,None,fx=2,fy=2))
        t=subprocess.run(['tesseract',p,'-','--psm','7','-c','tessedit_char_whitelist=0123456789'],capture_output=True,text=True).stdout.strip()
        if re.fullmatch(r'\d{1,2}',t):qmarks.append((pi,y,int(t)))
    ink=(img<140).astype(np.uint8)
    ink[:top,:]=0;ink[bot:,:]=0;ink[:,:60]=0;ink[:,Wd-50:]=0
    for w in words:
        if w['h']>60:continue
        ink[max(0,w['y']-2):w['y']+w['h']+2,max(0,w['x']-2):w['x']+w['w']+2]=0
    n,lab,st,_=cv2.connectedComponentsWithStats(ink,8)
    for i in range(1,n):
        x,y,w,h,a=st[i]
        if (h<=6 and w>40) or a<8: ink[lab==i]=0   # answer lines, dots, specks
    d=cv2.dilate(ink,cv2.getStructuringElement(cv2.MORPH_RECT,(70,30)))
    n,lab,st,_=cv2.connectedComponentsWithStats(d,8)
    boxes=[]
    for i in range(1,n):
        x,y,w,h,a=st[i]
        if w<90 or h<60:continue
        if ink[y:y+h,x:x+w].sum()<700:continue
        boxes.append([x,y,x+w,y+h])
    # take in words (labels) that touch a box
    for b in boxes:
      for _ in range(3):
        for w in words:
            if w['h']>60 or w['y']<top or w['y']>bot:continue
            if re.fullmatch(r'\[\d+\]|\[Total:?|\d+\]',w['t']):continue
            if w['x']+w['w']>b[0]-34 and w['x']<b[2]+34 and w['y']+w['h']>b[1]-4 and w['y']<b[3]+4:
                b[0]=min(b[0],w['x']);b[1]=min(b[1],w['y']);b[2]=max(b[2],w['x']+w['w']);b[3]=max(b[3],w['y']+w['h'])
    ch=True
    while ch:
        ch=False
        for i in range(len(boxes)):
            for j in range(i+1,len(boxes)):
                a,b=boxes[i],boxes[j]
                if a[0]<b[2]+10 and b[0]<a[2]+10 and a[1]<b[3]+10 and b[1]<a[3]+10:
                    boxes[i]=[min(a[0],b[0]),min(a[1],b[1]),max(a[2],b[2]),max(a[3],b[3])];boxes.pop(j);ch=True;break
            if ch:break
    # join table rows / stacked parts that line up above each other with a small gap
    ch=True
    while ch:
        ch=False
        for i in range(len(boxes)):
            for j in range(i+1,len(boxes)):
                a,b=boxes[i],boxes[j];xo=min(a[2],b[2])-max(a[0],b[0])
                g=max(a[1],b[1])-min(a[3],b[3]);mw=min(a[2]-a[0],b[2]-b[0])
                if (xo>0.8*mw and g<45) or (xo>0.95*mw and abs((a[2]-a[0])-(b[2]-b[0]))<0.06*mw and g<110):
                    boxes[i]=[min(a[0],b[0]),min(a[1],b[1]),max(a[2],b[2]),max(a[3],b[3])];boxes.pop(j);ch=True;break
            if ch:break
    # join pieces that sit side by side on one row (e.g. the ions in [Mg]2+ [Cl]-)
    ch=True
    while ch:
        ch=False
        for i in range(len(boxes)):
            for j in range(i+1,len(boxes)):
                a,b=boxes[i],boxes[j];ov=min(a[3],b[3])-max(a[1],b[1])
                if ov>0.5*min(a[3]-a[1],b[3]-b[1]) and (max(a[0],b[0])-min(a[2],b[2]))<160:
                    boxes[i]=[min(a[0],b[0]),min(a[1],b[1]),max(a[2],b[2]),max(a[3],b[3])];boxes.pop(j);ch=True;break
            if ch:break
    for b in sorted(boxes,key=lambda z:(z[1]//60,z[0])):
        res.append(dict(page=pi,box=b,img=img))
# a table or diagram split over a page break: stack the two parts
i=0
while i<len(res)-1:
    a,b=res[i],res[i+1];H=a['img'].shape[0]
    if b['page']==a['page']+1 and a['box'][3]>H-260 and b['box'][1]<260 and abs(a['box'][0]-b['box'][0])<25 and abs(a['box'][2]-b['box'][2])<25:
        x0=min(a['box'][0],b['box'][0]);x1=max(a['box'][2],b['box'][2])
        top=a['img'][a['box'][1]:a['box'][3],x0:x1];bt=b['img'][b['box'][1]:b['box'][3],x0:x1]
        st=np.vstack([top,bt]);pad=np.full((st.shape[0]+40,st.shape[1]+40),255,np.uint8);pad[20:-20,20:-20]=st
        a['qy']=a['box'][1];a['img']=pad;a['box']=[20,20,pad.shape[1]-20,pad.shape[0]-20];a['stack']=True;res.pop(i+1)
    i+=1
# assign question numbers in reading order across pages
qmarks.sort()
mx=0;qq=[]
for m in qmarks:
    if m[2]>mx and m[2]<=mx+3: qq.append(m);mx=m[2]
qmarks=qq
out={}
for k,f in enumerate(res):
    q=None
    for (pi,y,n) in qmarks:
        if (pi,y)<=(f['page'],f.get('qy',f['box'][1])+8):q=n
    if q is None:continue
    x0,y0,x1,y1=f['box'];pad=16;H,Wd=f['img'].shape
    c=f['img'][max(0,y0-pad):min(H,y1+pad),max(0,x0-pad):min(Wd,x1+pad)]
    fn=f"{key}_q{q}_{len(out.get(q,[]))+1}.png";cv2.imwrite(os.path.join(od,fn),c)
    out.setdefault(q,[]).append(dict(f=fn,page=f['page']+1,box=[int(v) for v in f['box']]))
json.dump(dict(pages=len(pages),q=sorted({n for _,_,n in qmarks}),figs=out),open(os.path.join(od,key+'.json'),'w'),indent=1)
print([(p+1,n) for p,_,n in qmarks]);print(key,len(pages),'pages',len(res),'figs','questions',len({n for _,_,n in qmarks}))
