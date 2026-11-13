try{window.HUBSET=window.HUBSET||{get:function(){try{var o=JSON.parse(localStorage.getItem("hubset")||"{}");return{teacher:Object.assign({school:"Lusaka Oaktree School",name:""},o.teacher||{}),lesson:Object.assign({maxInline:6,gallery:true,notes:true,hide:[],start:"engage"},o.lesson||{}),assess:Object.assign({},o.assess||{}),games:Object.assign({pairs:6,hint:true},o.games||{}),exam:Object.assign({open:false},o.exam||{}),ibl:Object.assign({notes:true,roles:"Manager, Recorder, Technician, Reporter"},o.ibl||{})}}catch(e){return{teacher:{school:"Lusaka Oaktree School"},lesson:{maxInline:6,gallery:true,notes:true,hide:[],start:"engage"},assess:{},games:{pairs:6,hint:true},exam:{open:false},ibl:{notes:true,roles:"Manager, Recorder, Technician, Reporter"}}}}}}catch(e){}
const U=[];
const M=(q,o,a,e)=>({t:"mcq",q,o,a,e:e||""});
const N=(q,a,u,e,tol)=>({t:"num",q,a,u:u||"",e:e||"",tol});
const T=(q,a,e)=>({t:"txt",q,a:Array.isArray(a)?a:[a],e:e||""});
const L=(t,sum,notes,ibl,ws,pr,cards)=>({t,sum,notes,ibl,ws,pr,cards});
const I=(q,task,act,link)=>({q,task,act,link});
const P=(title,marks,q,ms,src)=>({title,marks,q,ms,src});
const UN=(n,sym,name,blurb,lessons,quiz,pp)=>U.push({n,sym,name,blurb,lessons,quiz,pp});

/* ---------- inline figures used inside lesson notes ---------- */
function rng(seed){let s=seed;return()=>{s=(s*9301+49297)%233280;return s/233280}}
function STATES(){
  const r=rng(7);let c="";
  const panel=(x,label,pts)=>{
    c+=`<rect x="${x}" y="8" width="104" height="92" rx="6" fill="none" stroke="currentColor" stroke-opacity=".35"/>`;
    pts.forEach(p=>{c+=`<circle cx="${x+p[0]}" cy="${8+p[1]}" r="7" style="fill:var(--accent)" fill-opacity=".85"/>`});
    c+=`<text x="${x+52}" y="120" text-anchor="middle" font-size="12" fill="currentColor">${label}</text>`;
  };
  const solid=[];for(let i=0;i<5;i++)for(let j=0;j<5;j++)solid.push([12+i*20,12+j*17]);
  const liquid=[];for(let i=0;i<5;i++)for(let j=0;j<5;j++){if(j==0&&i%2==0)continue;liquid.push([14+i*19+(r()*6-3),18+j*16+(r()*6-3)])}
  const gas=[];for(let k=0;k<9;k++)gas.push([12+r()*80,12+r()*68]);
  panel(4,"Solid",solid);panel(118,"Liquid",liquid);panel(232,"Gas",gas);
  return `<figure class="fig"><svg viewBox="0 0 340 128" role="img" aria-label="Particle diagrams: solid regular and touching, liquid irregular and touching, gas far apart">${c}</svg><figcaption>Particle arrangement in the three states</figcaption></figure>`;
}
function CURVE(){
  return `<figure class="fig"><svg viewBox="0 0 360 210" role="img" aria-label="Heating curve with two flat sections at the melting point and boiling point">
<path d="M52 12V176H346" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="14" y="100" transform="rotate(-90 14 100)" text-anchor="middle" font-size="11" fill="currentColor">Temperature</text>
<text x="200" y="200" text-anchor="middle" font-size="11" fill="currentColor">Time (heating at a steady rate)</text>
<path d="M60 160L100 124H146L196 66H246L316 24" fill="none" style="stroke:var(--accent)" stroke-width="3" stroke-linejoin="round"/>
<g font-size="11" fill="currentColor"><text x="62" y="148">solid</text><text x="104" y="114">solid + liquid</text><text x="154" y="100">liquid</text><text x="196" y="56">liquid + gas</text><text x="290" y="48">gas</text>
<text x="48" y="127" text-anchor="end">m.p.</text><text x="48" y="69" text-anchor="end">b.p.</text></g></svg><figcaption>Flat sections: energy is breaking attractions, not raising temperature</figcaption></figure>`;
}
function PROFILE(exo){
  const ry=exo?80:135,py=exo?135:80,mid=(ry+py)/2+4,id=exo?"a1":"a2";
  return `<figure class="fig"><svg viewBox="0 0 360 204" role="img" aria-label="${exo?"Exothermic":"Endothermic"} energy profile: products ${exo?"lower":"higher"} than reactants"><defs><marker id="${id}" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L8 4L0 8z" fill="currentColor"/></marker></defs>
<path d="M44 14V172H346" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="14" y="100" transform="rotate(-90 14 100)" text-anchor="middle" font-size="11" fill="currentColor">Energy</text>
<text x="195" y="196" text-anchor="middle" font-size="11" fill="currentColor">Progress of reaction</text>
<path d="M52 ${ry}H112C142 ${ry} 142 28 170 28S198 ${py} 228 ${py}H296" fill="none" style="stroke:var(--accent)" stroke-width="3"/>
<path d="M170 ${ry}V32" stroke="currentColor" stroke-width="1.3" fill="none" marker-start="url(#${id})" marker-end="url(#${id})"/>
<path d="M318 ${ry}V${exo?py-4:py+4}" stroke="currentColor" stroke-width="1.3" fill="none" marker-end="url(#${id})"/>
<g font-size="11" fill="currentColor"><text x="52" y="${ry-8}">Reactants</text><text x="232" y="${py-8}">Products</text>
<text x="170" y="16" text-anchor="middle">Ea</text><text x="324" y="${mid-6}">ΔH</text><text x="324" y="${mid+8}">(${exo?"−":"+"})</text></g></svg><figcaption>${exo?"Exothermic: products have less energy than reactants":"Endothermic: products have more energy than reactants"}</figcaption></figure>`;
}

/* ---------- ionic bonding figures ---------- */
function ionSVG(cx,cy,sym,slots,charge){
  const r=34,ang=[80,100,170,190,260,280,350,10];let s="";
  s+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="currentColor" stroke-opacity=".55" stroke-width="1.5"/>`;
  s+=`<text x="${cx}" y="${cy+5}" text-anchor="middle" font-size="15" font-weight="700" fill="currentColor">${sym}</text>`;
  slots.split("").forEach((c,i)=>{const a=ang[i]*Math.PI/180,x=cx+r*Math.cos(a),y=cy-r*Math.sin(a);
    if(c==="d")s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.4" style="fill:var(--bad)"/>`;
    else if(c==="x")s+=`<path d="M${(x-3).toFixed(1)} ${(y-3).toFixed(1)}l6 6m0 -6l-6 6" style="stroke:var(--accent)" stroke-width="2" stroke-linecap="round" fill="none"/>`});
  s+=`<path d="M${cx-r-6} ${cy-r-8}H${cx-r-14}V${cy+r+8}H${cx-r-6}M${cx+r+6} ${cy-r-8}H${cx+r+14}V${cy+r+8}H${cx+r+6}" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
  s+=`<text x="${cx+r+18}" y="${cy-r-3}" font-size="14" font-weight="600" fill="currentColor">${charge}</text>`;
  return s;
}
function DC_NACL(){
  return `<figure class="fig"><svg viewBox="0 0 330 150" role="img" aria-label="Dot-and-cross diagram of sodium chloride: a sodium ion with eight outer electrons and charge 1 plus, and a chloride ion with eight outer electrons and charge 1 minus">${ionSVG(80,66,"Na","dddddddd","+")}${ionSVG(240,66,"Cl","xxdxxxxx","−")}
<text x="80" y="136" text-anchor="middle" font-size="12" fill="currentColor">Sodium ion</text><text x="240" y="136" text-anchor="middle" font-size="12" fill="currentColor">Chloride ion</text></svg><figcaption>Sodium chloride, NaCl. Dots are electrons from sodium, crosses are chlorine's own electrons. Only outer shells are shown.</figcaption></figure>`;
}
function DC_MGO(){
  return `<figure class="fig"><svg viewBox="0 0 330 150" role="img" aria-label="Dot-and-cross diagram of magnesium oxide: a magnesium ion with eight outer electrons and charge 2 plus, and an oxide ion with eight outer electrons and charge 2 minus">${ionSVG(80,66,"Mg","dddddddd","2+")}${ionSVG(240,66,"O","xxddxxxx","2−")}
<text x="80" y="136" text-anchor="middle" font-size="12" fill="currentColor">Magnesium ion</text><text x="240" y="136" text-anchor="middle" font-size="12" fill="currentColor">Oxide ion</text></svg><figcaption>Magnesium oxide, MgO. Two electrons move from magnesium to oxygen.</figcaption></figure>`;
}
function LATTICE(){
  let s="";const o=34,g=38;
  for(let i=0;i<4;i++)for(let j=0;j<4;j++){if(i<3)s+=`<path d="M${o+i*g} ${o+j*g}H${o+(i+1)*g}" stroke="currentColor" stroke-opacity=".3"/>`;if(j<3)s+=`<path d="M${o+i*g} ${o+j*g}V${o+(j+1)*g}" stroke="currentColor" stroke-opacity=".3"/>`}
  for(let i=0;i<4;i++)for(let j=0;j<4;j++){const x=o+i*g,y=o+j*g;
    if((i+j)%2===0)s+=`<circle cx="${x}" cy="${y}" r="10" style="fill:var(--accent)"/><text x="${x}" y="${y+4.5}" text-anchor="middle" font-size="13" font-weight="700" style="fill:var(--accent-ink)">+</text>`;
    else s+=`<circle cx="${x}" cy="${y}" r="13" style="fill:var(--surface2)" stroke="currentColor" stroke-width="1.4"/><text x="${x}" y="${y+4.5}" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">−</text>`}
  s+=`<circle cx="214" cy="52" r="8" style="fill:var(--accent)"/><text x="230" y="56" font-size="12" fill="currentColor">Na⁺ (smaller)</text><circle cx="214" cy="82" r="11" style="fill:var(--surface2)" stroke="currentColor" stroke-width="1.4"/><text x="230" y="86" font-size="12" fill="currentColor">Cl⁻ (larger)</text>`;
  return `<figure class="fig"><svg viewBox="0 0 330 168" role="img" aria-label="Two-dimensional slice of a sodium chloride lattice with positive and negative ions alternating in rows and columns">${s}</svg><figcaption>A slice through the NaCl lattice. Every ion is surrounded by ions of the opposite charge.</figcaption></figure>`;
}
function CONDUCT(){
  const r=rng(11);let s="";
  const panel=(x0,title,pts)=>{s+=`<rect x="${x0}" y="6" width="150" height="104" rx="6" fill="none" stroke="currentColor" stroke-opacity=".35"/>`;
    pts.forEach(p=>{const pos=p[2];if(pos)s+=`<circle cx="${x0+p[0]}" cy="${6+p[1]}" r="7" style="fill:var(--accent)"/><text x="${x0+p[0]}" y="${10+p[1]}" text-anchor="middle" font-size="11" font-weight="700" style="fill:var(--accent-ink)">+</text>`;else s+=`<circle cx="${x0+p[0]}" cy="${6+p[1]}" r="9" style="fill:var(--surface2)" stroke="currentColor"/><text x="${x0+p[0]}" y="${10+p[1]}" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">−</text>`});
    s+=`<text x="${x0+75}" y="128" text-anchor="middle" font-size="12" fill="currentColor">${title}</text>`};
  const solid=[];for(let i=0;i<5;i++)for(let j=0;j<4;j++)solid.push([22+i*26,20+j*26,(i+j)%2===0]);
  const melt=[];for(let k=0;k<16;k++)melt.push([14+r()*122,14+r()*78,k%2===0]);
  panel(4,"Solid: ions fixed, no current",solid);panel(176,"Molten or dissolved: ions move",melt);
  return `<figure class="fig"><svg viewBox="0 0 340 136" role="img" aria-label="Ions in a solid are in a fixed regular lattice, but in a molten or dissolved ionic compound they move freely">${s}</svg><figcaption>Ions must be free to move to carry charge</figcaption></figure>`;
}
const FIGS={STATES,CURVE,EXO:()=>PROFILE(true),ENDO:()=>PROFILE(false),DC_NACL,DC_MGO,LATTICE,CONDUCT};

/* SETL(unitNo, list): set the final ordered lesson list of a unit. Items are L() objects or the title (string) of an existing lesson to keep. */
function SETL(n,list){const u=U.find(x=>x.n===n),old=u.lessons;u.lessons=list.map(x=>{if(typeof x!=="string")return x;const f=old.find(l=>l.t===x);if(!f)throw new Error("SETL: no lesson titled "+x+" in topic "+n);return f})}
