import struct,sys
ico=open(sys.argv[1],'rb').read();n=struct.unpack('<H',ico[4:6])[0]
ents=[struct.unpack('<BBBBHHII',ico[6+16*i:22+16*i]) for i in range(n)]
imgs=[ico[e[7]:e[7]+e[6]] for e in ents]
grp=struct.pack('<HHH',0,1,n)+b''.join(struct.pack('<BBBBHHIH',e[0],e[1],e[2],0,e[4],e[5],e[6],i+1) for i,e in enumerate(ents))
datas=imgs+[grp]  # ids 1..n icons, group id 1
# layout
def dir_(ne,entries):  # entries list of (id,off,subdir)
    b=struct.pack('<IIHHHH',0,0,4,0,0,ne)
    for i,o,s in entries: b+=struct.pack('<II',i,o|(0x80000000 if s else 0))
    return b
root_sz=16+8*2
type_dir_sz=lambda k:16+8*k
lang_dir_sz=16+8
# offsets
off=root_sz
t3=off;off+=type_dir_sz(n)
t14=off;off+=type_dir_sz(1)
lang3=[];
for i in range(n): lang3.append(off);off+=lang_dir_sz
lang14=off;off+=lang_dir_sz
de3=[];
for i in range(n): de3.append(off);off+=16
de14=off;off+=16
raw=off
rawoffs=[];o=raw
for d in datas:
    rawoffs.append(o);o+=(len(d)+3)&~3
sec=bytearray()
sec+=dir_(2,[(3,t3,1),(14,t14,1)])
sec+=dir_(n,[(i+1,lang3[i],1) for i in range(n)])
sec+=dir_(1,[(1,lang14,1)])
for i in range(n): sec+=dir_(1,[(1033,de3[i],0)])
sec+=dir_(1,[(1033,de14,0)])
relocs=[]
for i in range(n):
    relocs.append(len(sec));sec+=struct.pack('<IIII',rawoffs[i],len(datas[i]),0,0)
relocs.append(len(sec));sec+=struct.pack('<IIII',rawoffs[n],len(datas[n]),0,0)
assert len(sec)==raw
for d in datas: sec+=d+b'\0'*((-len(d))%4)
# COFF
nrel=len(relocs)
hdr_sz=20;sh_sz=40
sec_off=hdr_sz+sh_sz;rel_off=sec_off+len(sec);sym_off=rel_off+10*nrel
shdr=struct.pack('<8sIIIIIIHHI',b'.rsrc',0,0,len(sec),sec_off,rel_off,0,nrel,0,0x40000040|0x00300000)
fh=struct.pack('<HHIIIHH',0x8664,1,0,sym_off,2,0,0)
rel=b''.join(struct.pack('<IIH',r,0,3) for r in relocs)  # ADDR32NB=3, symbol 0
sym=struct.pack('<8sIhHBB',b'.rsrc',0,1,0,3,1)+struct.pack('<IHHIHB3x',len(sec),nrel,0,0,1,0)
strtab=struct.pack('<I',4)
open(sys.argv[2],'wb').write(fh+shdr+bytes(sec)+rel+sym+strtab)
