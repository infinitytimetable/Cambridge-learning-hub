import json,os,sys
from PIL import Image,ImageDraw,ImageFont
K={"States of matter and the particle model":"pnm1","Bonding and structure":"bond","Stoichiometry":"stoi","Electrochemistry":"elec","Energetics":"ener","Rate (speed) of reaction":"rate","Redox":"redox","Reversible reactions":"rev","Periodic Table and group properties":"ptab","Preparation of salts":"salts","Properties of acids and bases":"acids","Types of oxides":"oxides","Air and rust":"air","Carbon dioxide and methane":"co2","Extraction of metals":"extr","Nitrogen and fertilisers":"nitro","Reactivity series":"react","Uses of metals":"uses","Water":"water"}
H=json.load(open('hubq.json'));rows=[];stat=dict(both=0,hubonly=0,croponly=0)
for x in H:
    k=K.get(x['topic']);
    if not k:continue
    d=json.load(open(f'out/{k}/{k}.json'));fs=d['figs'].get(str(x['n']),[])
    if x['fig'] and fs:stat['both']+=1
    elif x['fig']:stat['hubonly']+=1
    elif fs:stat['croponly']+=1
    if fs:rows.append((x,k,fs))
print(stat,len(rows))
fnt=ImageFont.truetype('/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',15)
per=int(sys.argv[1]) if len(sys.argv)>1 else 14
for s in range(0,len(rows),per):
    part=rows[s:s+per];RH=190;m=Image.new('RGB',(1400,RH*len(part)),'white');dr=ImageDraw.Draw(m)
    for i,(x,k,fs) in enumerate(part):
        y=i*RH;dr.text((5,y+5),f"{k} Q{x['n']} {'[hubfig]' if x['fig'] else ''}",fill='red',font=fnt);dr.text((5,y+25),x['t'][:40],fill='black',font=fnt)
        xx=330
        for f in fs:
            im=Image.open(f'out/{k}/'+f['f']).convert('RGB');im.thumbnail((360,RH-10));m.paste(im,(xx,y+5));xx+=im.width+10
            if xx>1380:break
        dr.line((0,y+RH-1,1400,y+RH-1),fill='#999')
    m.save(f'/tmp/claude-0/-home-claude/3a821e8e-0793-59ae-b98f-98eeecb96b06/scratchpad/j{s//per:02d}.png')
