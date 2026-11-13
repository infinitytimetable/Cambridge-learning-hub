/* ---------- covalent dot-and-cross renderer ---------- */
/* spec rows: [symbol, parentIndex(-1 = root), angleDeg(y up), bondOrder, marker 'd'|'x', lonePairs] */
const COVR={H:24,X:32},COVO=18;
function covSVG(spec,label,blank){
  const rad=s=>s==="H"?COVR.H:COVR.X,pos=[],bAng=spec.map(()=>[]);
  spec.forEach((r,i)=>{
    if(r[1]<0){pos.push([0,0]);return}
    const p=pos[r[1]],d=rad(spec[r[1]][0])+rad(r[0])-COVO,a=r[2]*Math.PI/180;
    pos.push([p[0]+d*Math.cos(a),p[1]-d*Math.sin(a)]);
    bAng[r[1]].push(r[2]);bAng[i].push(r[2]+180);
  });
  const mk=(k,x,y)=>k==="d"?`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.2" style="fill:var(--bad)"/>`:`<path d="M${(x-3).toFixed(1)} ${(y-3).toFixed(1)}l6 6m0 -6l-6 6" style="stroke:var(--accent)" stroke-width="2" stroke-linecap="round" fill="none"/>`;
  const angDiff=(a,b)=>{let d=Math.abs(a-b)%360;return d>180?360-d:d};
  let circ="",el="",sym="",x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;
  spec.forEach((r,i)=>{
    const R=rad(r[0]),[x,y]=pos[i];
    x0=Math.min(x0,x-R);x1=Math.max(x1,x+R);y0=Math.min(y0,y-R);y1=Math.max(y1,y+R);
    circ+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${R}" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.4"/>`;
    sym+=`<text x="${x.toFixed(1)}" y="${(y+5).toFixed(1)}" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">${r[0]==="Cl"?"Cl":r[0]}</text>`;
    /* lone pairs: choose directions furthest from bonds and each other */
    const taken=bAng[i].slice();
    for(let k=0;k<(r[5]||0);k++){
      let best=0,bs=-1;
      for(let a=0;a<360;a+=10){const m=Math.min(...taken.map(t=>angDiff(a,t)),180);if(m>bs){bs=m;best=a}}
      taken.push(best);
      [-10,10].forEach(o=>{const a=(best+o)*Math.PI/180;el+=mk(r[4],x+R*Math.cos(a),y-R*Math.sin(a))});
    }
  });
  spec.forEach((r,j)=>{
    if(r[1]<0)return;const i=r[1],n=r[3]||1,A=pos[i],B=pos[j],dx=B[0]-A[0],dy=B[1]-A[1],d=Math.hypot(dx,dy),ux=dx/d,uy=dy/d,nx=-uy,ny=ux;
    const mid=(rad(spec[i][0])+(d-rad(r[0])))/2,offs=n===1?[0]:n===2?[-5,5]:[-8,0,8];
    offs.forEach(o=>{const cx=A[0]+ux*(mid+o),cy=A[1]+uy*(mid+o);
      el+=mk(spec[i][4],cx+nx*4.5,cy+ny*4.5)+mk(r[4],cx-nx*4.5,cy-ny*4.5)});
  });
  const pad=8,w=x1-x0+2*pad,h=y1-y0+2*pad;
  return `<svg viewBox="${(x0-pad).toFixed(0)} ${(y0-pad).toFixed(0)} ${w.toFixed(0)} ${h.toFixed(0)}" role="img" style="width:${(w*.85).toFixed(0)}px;max-width:100%;height:auto" aria-label="${label}">${circ}${blank?"":el}${sym}</svg>`;
}
const COVM={
  H2:["Hydrogen, H~2~","Two hydrogen atoms share one pair of electrons.",[["H",-1,0,0,"d",0],["H",0,0,1,"x",0]]],
  Cl2:["Chlorine, Cl~2~","Each chlorine has three non-bonding pairs and shares one pair.",[["Cl",-1,0,0,"d",3],["Cl",0,0,1,"x",3]]],
  H2O:["Water, H~2~O","Oxygen shares two pairs and keeps two non-bonding pairs.",[["O",-1,0,0,"d",2],["H",0,225,1,"x",0],["H",0,315,1,"x",0]]],
  CH4:["Methane, CH~4~","Carbon shares four pairs, one with each hydrogen.",[["C",-1,0,0,"d",0],["H",0,90,1,"x",0],["H",0,180,1,"x",0],["H",0,270,1,"x",0],["H",0,0,1,"x",0]]],
  NH3:["Ammonia, NH~3~","Nitrogen shares three pairs and keeps one non-bonding pair.",[["N",-1,0,0,"d",1],["H",0,190,1,"x",0],["H",0,350,1,"x",0],["H",0,270,1,"x",0]]],
  HCl:["Hydrogen chloride, HCl","One shared pair. Chlorine keeps three non-bonding pairs.",[["H",-1,0,0,"d",0],["Cl",0,0,1,"x",3]]],
  O2:["Oxygen, O~2~","Two shared pairs make a double bond.",[["O",-1,0,0,"d",2],["O",0,0,2,"x",2]]],
  N2:["Nitrogen, N~2~","Three shared pairs make a triple bond.",[["N",-1,0,0,"d",1],["N",0,0,3,"x",1]]],
  C2H4:["Ethene, C~2~H~4~","The two carbons share two pairs (a C=C double bond).",[["C",-1,0,0,"d",0],["C",0,0,2,"x",0],["H",0,135,1,"x",0],["H",0,225,1,"x",0],["H",1,45,1,"d",0],["H",1,315,1,"d",0]]],
  CH3OH:["Methanol, CH~3~OH","Carbon makes four single bonds. Oxygen makes two and keeps two non-bonding pairs.",[["C",-1,0,0,"d",0],["H",0,90,1,"x",0],["H",0,180,1,"x",0],["H",0,270,1,"x",0],["O",0,0,1,"x",2],["H",4,300,1,"d",0]]],
  CO2:["Carbon dioxide, CO~2~","Carbon makes two double bonds, one to each oxygen.",[["O",-1,0,0,"d",2],["C",0,0,2,"x",0],["O",1,0,2,"d",2]]],
  COCl2:["Carbonyl chloride, COCl~2~","One C=O double bond and two C–Cl single bonds. Every atom has eight outer electrons.",[["C",-1,0,0,"d",0],["O",0,0,2,"x",2],["Cl",0,120,1,"x",3],["Cl",0,240,1,"x",3]]]
};
function COV(k,wide,blank){
  const m=COVM[k];
  return `<figure class="fig covf" style="max-width:${wide||190}px"><div class="svgw">${covSVG(m[2],"Dot-and-cross diagram of "+m[0].replace(/~/g,""),blank)}</div><figcaption><b>${m[0].replace(/~([^~]+)~/g,"<sub>$1</sub>")}</b><br>${m[1]}</figcaption></figure>`;
}
const COVSET=a=>`<div class="figs">${a.map(k=>COV(k,260)).join("")}</div>`;
FIGS.COV_SINGLE=()=>COVSET(["H2","Cl2","H2O","CH4","NH3","HCl"]);
FIGS.COV_MULTI=()=>COVSET(["O2","N2","C2H4","CH3OH","CO2"]);
FIGS.COV_COCL2=()=>COV("COCl2",260);
