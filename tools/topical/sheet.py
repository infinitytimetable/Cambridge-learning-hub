import sys,glob,os,json,re
from PIL import Image,ImageDraw
od=sys.argv[1];out=sys.argv[2];fs=sorted(glob.glob(od+'/*.png'),key=lambda f:[int(x) if x.isdigit() else x for x in re.split(r'(\d+)',os.path.basename(f))])
T=230;cols=6;cells=[]
for f in fs:
    im=Image.open(f).convert('RGB');im.thumbnail((T,T));c=Image.new('RGB',(T,T+16),'white');c.paste(im,((T-im.width)//2,0));ImageDraw.Draw(c).text((3,T+2),os.path.basename(f)[:34],fill='red');cells.append(c)
rows=(len(cells)+cols-1)//cols;m=Image.new('RGB',(cols*T,rows*(T+16)),'#ccc')
for i,c in enumerate(cells):m.paste(c,((i%cols)*T,(i//cols)*(T+16)))
m.save(out);print(len(cells))
