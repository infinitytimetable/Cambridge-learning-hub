/* ===== Group D: Topic 7 (acids, bases, salts) and Topic 8 (Periodic Table), rebuilt from the teacher's notes (own wording) ===== */
(function(){
/* ---------- figure helpers ---------- */
const FG=(w,h,inner,label,cap,mw)=>`<figure class="fig"${mw?` style="max-width:${mw}px"`:""}><svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${inner}</svg><figcaption>${cap}</figcaption></figure>`;
const TX=(x,y,t,o)=>{o=o||{};return `<text x="${x}" y="${y}" font-size="${o.s||11}" text-anchor="${o.a||"middle"}" fill="${o.f||"currentColor"}"${o.w?` font-weight="${o.w}"`:""}${o.i?` font-style="italic"`:""}${o.r?` transform="rotate(${o.r} ${x} ${y})"`:""}>${t}</text>`};
const SUP="⁰¹²³⁴⁵⁶⁷⁸⁹";
const sup=n=>String(n).split("").map(c=>c==="-"?"⁻":SUP[+c]).join("");
const ARR=(x1,y1,x2,y2,col,w)=>{const a=Math.atan2(y2-y1,x2-x1),h=7,c=col||"currentColor";
  return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="${w||2}" fill="none"/><path d="M${x2} ${y2}l${(-h*Math.cos(a-.45)).toFixed(1)} ${(-h*Math.sin(a-.45)).toFixed(1)}M${x2} ${y2}l${(-h*Math.cos(a+.45)).toFixed(1)} ${(-h*Math.sin(a+.45)).toFixed(1)}" stroke="${c}" stroke-width="${w||2}" fill="none" stroke-linecap="round"/>`};
const BEAKER=(cx,y,w,h,liq,lvl,extra)=>{const x=cx-w/2,ly=y+h*(1-lvl);
  return `${liq?`<rect x="${x+1}" y="${ly}" width="${w-2}" height="${y+h-ly-1}" fill="${liq}" fill-opacity=".45"/>`:""}${extra||""}<path d="M${x} ${y}V${y+h-4}Q${x} ${y+h} ${x+4} ${y+h}H${x+w-4}Q${x+w} ${y+h} ${x+w} ${y+h-4}V${y}" fill="none" stroke="currentColor" stroke-width="1.6"/>`};
const FUNNEL=(cx,y,res)=>`<path d="M${cx-30} ${y}H${cx+30}L${cx+4} ${y+34}V${y+52}H${cx-4}V${y+34}Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M${cx-24} ${y+4}L${cx} ${y+30}L${cx+24} ${y+4}" fill="none" stroke="currentColor" stroke-dasharray="3 3" stroke-opacity=".6"/>${res?`<path d="M${cx-11} ${y+19}L${cx} ${y+31}L${cx+11} ${y+19}Z" fill="${res}" stroke="currentColor" stroke-opacity=".5"/>`:""}`;
const DOT=(x,y,r,f,o)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"${o?` fill-opacity="${o}"`:""}/>`;
const TUBE=(cx,y,w,h,col,lvl)=>{const x=cx-w/2,ly=y+h*(1-lvl);return `<path d="M${x} ${ly}H${x+w}V${y+h-w/2}A${w/2} ${w/2} 0 0 1 ${x} ${y+h-w/2}Z" fill="${col}" fill-opacity=".85"/><path d="M${x-2} ${y}H${x}V${y+h-w/2}A${w/2} ${w/2} 0 0 0 ${x+w} ${y+h-w/2}V${y}H${x+w+2}" fill="none" stroke="currentColor" stroke-width="1.6"/>`};
function ATOM(cx,cy,shells,sym,step,r0,hi){
  let s="";shells.forEach((n,i)=>{const r=r0+i*step;s+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.3"/>`;
    for(let k=0;k<n;k++){const a=-Math.PI/2+(2*Math.PI*k)/n+(i%2?.3:0);s+=DOT((cx+r*Math.cos(a)).toFixed(1),(cy+r*Math.sin(a)).toFixed(1),3.2,hi&&i===shells.length-1?"var(--accent)":"var(--bad)")}});
  return s+`<circle cx="${cx}" cy="${cy}" r="${r0-7}" fill="currentColor" fill-opacity=".1"/>`+TX(cx,cy+4,sym,{s:12,w:700});
}

/* pH scale with universal indicator colours */
FIGS.D_PH=()=>{
  const col=["#E3262B","#E8392A","#EE5A2D","#F07A25","#F28B1E","#F0B323","#E3D21F","#4FB84C","#22AE8C","#2290BC","#3F6FD1","#5A57C9","#7A4DB8","#8A4AB0","#9050B8"];
  const ex=["battery acid","stomach acid","lemon juice","cola","tomato juice","black coffee","saliva","distilled water","seawater","borax","milk of magnesia","ammonia","soapy water","oven cleaner","drain cleaner"];
  let s=TX(98,12,"vs pH 7",{s:9,a:"end",f:"currentColor"})+TX(115,12,"pH",{s:9,w:700});
  col.forEach((c,i)=>{const y=20+i*20,dk=i>=4&&i<=8;
    s+=`<rect x="100" y="${y}" width="30" height="19" fill="${c}"/>`+TX(115,y+14,i,{s:11,w:700,f:dk?"#1B2A2F":"#fff"});
    const k=7-i;s+=TX(94,y+14,k===0?"1×":(k===1?"10×":"10"+sup(k)+"×"),{s:10,a:"end"});
    s+=TX(138,y+14,ex[i],{s:11,a:"start"})});
  const br=(a,b,t)=>{const y1=20+a*20+3,y2=20+b*20+16;return `<path d="M244 ${y1}H249V${y2}H244" fill="none" stroke="currentColor" stroke-width="1.4"/>`+TX(255,(y1+y2)/2+4,t,{s:11,a:"start",w:700})};
  s+=br(0,2,"strong acid")+br(3,6,"weak acid")+br(7,7,"neutral")+br(8,11,"weak alkali")+br(12,14,"strong alkali");
  return FG(340,326,s,"The pH scale from 0 to 14 with universal indicator colours, common examples and the ten-fold change in hydrogen ion concentration per pH unit","The pH scale and universal indicator colours. Each step down is ten times more H⁺.",380);
};
/* simplified periodic table */
FIGS.D_PT_WIDE=()=>{
  const rows=[
   ["H",,,,,,,,,,,,,,,,,"He"],
   ["Li","Be",,,,,,,,,,,"B","C","N","O","F","Ne"],
   ["Na","Mg",,,,,,,,,,,"Al","Si","P","S","Cl","Ar"],
   ["K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br","Kr"],
   ["Rb","Sr","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Sb","Te","I","Xe"],
   ["Cs","Ba","*","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg","Tl","Pb","Bi","Po","At","Rn"],
   ["Fr","Ra","**","Rf","Db","Sg","Bh","Hs","Mt","Ds","Rg","Cn","Nh","Fl","Mc","Lv","Ts","Og"]];
  const meta=new Set(["B","Si","Ge","As","Sb","Te"]),nonm=new Set(["H","C","N","O","P","S","Se"]);
  const C={a:"#E3626B",b:"#F0A04B",t:"#6FA8DC",m:"#B9C4A8",x:"#B79CE0",n:"#7CCB8E",h:"#F2D74B",g:"#6CC6C9",z:"#E5E5E5"};
  const kind=(sym,c)=>{if(sym==="*"||sym==="**")return null;if(c===0&&sym!=="H")return "a";if(c===1)return "b";if(c>=2&&c<=11)return "t";if(c===17)return "z";if(c===16)return "g";if(c===15)return "h";if(meta.has(sym))return "x";if(nonm.has(sym))return "n";return "m"};
  const cw=23,x0=34,y0=34;let s="";
  ["I","II","","","","","","","","","","","III","IV","V","VI","VII","VIII"].forEach((g,c)=>{if(g)s+=TX(x0+c*cw+cw/2,y0-6,g,{s:10,w:700})});
  s+=TX(x0+7*cw,y0-20,"transition elements",{s:10,i:1,f:"var(--accent)"});
  s+=`<path d="M${x0+2*cw+2} ${y0-15}H${x0+12*cw-2}" stroke="var(--accent)" stroke-width="1.4"/>`;
  rows.forEach((r,ri)=>{s+=TX(x0-6,y0+ri*cw+cw/2+4,ri+1,{s:10,a:"end",w:700});
    r.forEach((sym,c)=>{if(!sym)return;const k=kind(sym,c);const x=x0+c*cw,y=y0+ri*cw;
      s+=`<rect x="${x+1}" y="${y+1}" width="${cw-2}" height="${cw-2}" rx="2" fill="${k?C[k]:"none"}" fill-opacity="${k?.9:1}" stroke="currentColor" stroke-opacity=".35"/>`+TX(x+cw/2,y+cw/2+3.5,sym,{s:8.5,f:"#1B2A2F",w:600})})});
  s+=TX(x0+9*cw,y0+7*cw+14,"Groups run down the columns. Periods run across the rows.",{s:10,i:1});
  const L=[["a","Group I: alkali metals"],["b","Group II"],["t","transition elements"],["m","other metals"],["x","metalloids"],["n","non-metals"],["h","Group VI"],["g","Group VII: halogens"],["z","Group VIII: noble gases"]];
  let lx=34,ly=y0+7*cw+26;L.forEach(([k,t])=>{const w=15+t.length*4.9+10;if(lx+w>450){lx=34;ly+=17}s+=`<rect x="${lx}" y="${ly}" width="11" height="11" rx="2" fill="${C[k]}"/>`+TX(lx+15,ly+10,t,{s:9.5,a:"start"});lx+=w});
  s+=`<rect x="${x0+17*cw+1}" y="${y0+1}" width="${cw-2}" height="${cw-2}" rx="2" fill="${C.g}" fill-opacity=".0"/>`;
  return FG(460,y0+7*cw+86,s,"Simplified periodic table: groups I to VII and 0 across the top, periods 1 to 7 down the side, metals on the left, non-metals on the right and metalloids on the boundary","A simplified Periodic Table. Noble gases (Group VIII) are the last column. Metalloids sit on the boundary between metals and non-metals.",720);
};
/* electron shell diagrams */
FIGS.D_ELEC=()=>FG(330,190,ATOM(90,95,[2,8,7],"Cl",24,26,true)+ARR(238,50,168,50,"var(--accent)",1.6)+TX(244,46,"Group VII",{s:12,a:"start",w:700,f:"var(--accent)"})+TX(244,62,"7 outer electrons",{s:11,a:"start"})+TX(244,100,"Period 3",{s:12,a:"start",w:700,f:"var(--bad)"})+TX(244,116,"3 shells (2, 8, 7)",{s:11,a:"start"})+ARR(240,104,152,118,"var(--bad)",1.6)+TX(165,184,"Electronic configuration of chlorine: 2,8,7",{s:11}),"Chlorine atom with three electron shells holding 2, 8 and 7 electrons","The electron shells give the period (number of shells) and the group (outer electrons).",340);
FIGS.D_NOBLE=()=>FG(340,150,ATOM(52,66,[2],"He",0,20)+ATOM(160,66,[2,8],"Ne",18,20)+ATOM(280,66,[2,8,8],"Ar",17,18)+TX(52,138,"He  2",{s:12,w:700})+TX(160,138,"Ne  2,8",{s:12,w:700})+TX(280,138,"Ar  2,8,8",{s:12,w:700}),"Electron arrangements of helium, neon and argon, each with a full outer shell","Full outer shells make the noble gases very stable.",360);
/* Group I trends */
FIGS.D_GRP1=()=>{
  const el=[["Li","lithium"],["Na","sodium"],["K","potassium"],["Rb","rubidium"],["Cs","caesium"],["Fr","francium"]];
  let s="";el.forEach((e,i)=>{const y=14+i*44,pred=i>=3;
    s+=`<rect x="96" y="${y}" width="128" height="36" rx="7" fill="${pred?"none":"var(--mint)"}" stroke="currentColor" stroke-opacity="${pred?.5:.8}"${pred?` stroke-dasharray="4 3"`:""} stroke-width="1.4"/>`+TX(160,y+23,`<tspan font-weight="700">${e[0]}</tspan>  ${e[1]}`,{s:13})});
  s+=ARR(54,24,54,252,"var(--accent)",2.5)+TX(30,138,"reactivity with water increases",{s:11,r:-90,w:700,f:"var(--accent)"});
  s+=ARR(266,24,266,252,"var(--bad)",2.5)+TX(292,138,"melting point decreases",{s:11,r:90,w:700,f:"var(--bad)"});
  s+=TX(160,284,"Rb, Cs and Fr are predicted from the trend",{s:10,i:1})+TX(160,300,"(dashed boxes)",{s:10,i:1});
  return FG(320,310,s,"Group I metals lithium to francium in a column with arrows showing reactivity increasing and melting point decreasing down the group","Trends down Group I. Density generally increases down the group too.",340);
};
/* halogens */
FIGS.D_HAL=()=>{
  const jar=(cx,fill,fo,lab,sub,extra)=>`<rect x="${cx-34}" y="52" width="68" height="84" rx="4" fill="${fill}" fill-opacity="${fo}" stroke="currentColor" stroke-width="1.6"/><rect x="${cx-38}" y="44" width="76" height="9" rx="3" fill="currentColor" fill-opacity=".25" stroke="currentColor"/>${extra||""}`+TX(cx,156,lab,{s:13,w:700})+TX(cx,171,sub,{s:11});
  let s=jar(58,"#C5D96A",.75,"Chlorine","gas, pale yellow-green")+jar(170,"#F2C48A",.35,"Bromine","liquid, red-brown",`<path d="M${170-33} 104H${170+33}V135H${170-33}Z" fill="#8F2D14" fill-opacity=".85"/>`)+jar(282,"#C9A9E6",.28,"Iodine","solid, grey-black",`<g fill="#33323A">${[0,1,2,3,4,5].map(i=>`<polygon points="${255+i*9},135 ${259+i*9},123 ${264+i*9},135"/>`).join("")}</g>`);
  s+=TX(170,22,"Colour gets darker, boiling point rises ➜",{s:12,w:700,f:"var(--accent)"})+ARR(36,32,304,32,"var(--accent)",1.6);
  return FG(340,182,s,"Three jars showing chlorine as a pale yellow-green gas, bromine as a red-brown liquid and iodine as a grey-black solid","Halogens at room temperature. Iodine vapour is purple.",380);
};
/* displacement */
FIGS.D_DISP_WIDE=()=>{
  const exp=(ox,a,b,r,cap1,cap2)=>TUBE(ox+22,40,24,84,a,.7)+TX(ox+22,140,"halogen",{s:10})+TX(ox+22,152,"solution",{s:10})+TX(ox+62,86,"+",{s:20})+TUBE(ox+102,40,24,84,"#E8F0F0",.7)+TX(ox+102,140,"halide",{s:10})+TX(ox+102,152,"solution",{s:10})+ARR(ox+124,82,ox+148,82)+TUBE(ox+172,40,24,84,r,.8)+TX(ox+172,140,"result",{s:10,w:700})+TX(ox+86,184,cap1,{s:11,w:700})+TX(ox+86,199,cap2,{s:10.5});
  const s=exp(10,"#E6F1B8","#fff","#F4A640","Cl₂ + KBr","orange: Br₂ displaced")+exp(210,"#F4A640","#fff","#7B4A24","Br₂ + KI","brown: I₂ displaced")+exp(410,"#7B4A24","#fff","#7B4A24","I₂ + KBr","no change: no reaction");
  return FG(620,212,s,"Three displacement experiments: chlorine with potassium bromide gives orange, bromine with potassium iodide gives brown, iodine with potassium bromide shows no change","Halogen displacement: a more reactive halogen takes the place of a less reactive one in its halide.",760);
};
/* transition element colours */
FIGS.D_TRANS=()=>{
  const sw=[["Cu²⁺(aq)","blue","#3B7DD8"],["Fe²⁺(aq)","green","#79B866"],["Fe³⁺(aq)","orange-brown","#C4752B"],["CuO","black","#22252A"],["CuCO₃","green","#4E9F7A"]];
  let s="";sw.forEach((w,i)=>{const cx=34+i*62;s+=`<circle cx="${cx}" cy="40" r="22" fill="${w[2]}" stroke="currentColor" stroke-opacity=".5"/>`+TX(cx,84,w[0],{s:11,w:700})+TX(cx,98,w[1],{s:10.5})});
  return FG(330,110,s,"Colour swatches for copper(II) ions blue, iron(II) ions green, iron(III) ions orange-brown, copper(II) oxide black and copper(II) carbonate green","Transition element compounds are often coloured.",360);
};
/* proton transfer */
FIGS.D_PROTON=()=>{
  const at=(x,y,r,t,f)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" fill-opacity=".35" stroke="currentColor" stroke-width="1.4"/>`+TX(x,y+4,t,{s:r>12?12:10,w:700});
  let s=at(34,84,17,"Cl","var(--good)")+at(64,84,10,"H","var(--bad)")+TX(98,90,"+",{s:20})+at(140,84,15,"O","var(--accent)")+at(122,104,9,"H","var(--bad)")+at(158,104,9,"H","var(--bad)")+ARR(186,86,214,86)+at(254,84,15,"O","var(--accent)")+at(236,104,9,"H","var(--bad)")+at(272,104,9,"H","var(--bad)")+at(254,62,9,"H","var(--bad)")+TX(288,60,"+",{s:15,w:700})+TX(310,90,"+",{s:20})+at(340,84,17,"Cl","var(--good)")+TX(362,66,"−",{s:15,w:700});
  s+=`<path d="M64 72Q100 28 134 70" fill="none" stroke="var(--bad)" stroke-width="2"/><path d="M134 70l-9 -2M134 70l-2 -9" stroke="var(--bad)" stroke-width="2" fill="none"/>`+TX(98,26,"H⁺ moves across",{s:11,w:700,f:"var(--bad)"});
  s+=TX(48,134,"acid",{s:11,w:700})+TX(48,148,"(proton donor)",{s:10})+TX(140,134,"water as a base",{s:11,w:700})+TX(140,148,"(proton acceptor)",{s:10})+TX(254,134,"H₃O⁺",{s:11,w:700})+TX(340,134,"Cl⁻",{s:11,w:700});
  return FG(380,158,s,"A hydrogen chloride molecule transferring a proton to a water molecule to form an oxonium ion and a chloride ion","HCl donates a proton to H₂O, so H₂O acts as a base.",420);
};
/* strong vs weak acid particles */
FIGS.D_STRONG=()=>{
  const ion=(x,y,p)=>DOT(x,y,8,p?"var(--bad)":"var(--accent)",.85)+TX(x,y+3.5,p?"+":"−",{s:11,w:700,f:"#fff"});
  const mol=(x,y)=>DOT(x-6,y,5,"var(--bad)",.85)+DOT(x+6,y,8,"var(--accent)",.85)+`<path d="M${x-2} ${y}H${x}" stroke="currentColor"/>`;
  const box=(x,t)=>`<rect x="${x}" y="30" width="150" height="130" rx="8" fill="none" stroke="currentColor" stroke-width="1.5"/>`+TX(x+75,20,t,{s:12,w:700});
  let s=box(6,"Strong acid, HCl")+box(176,"Weak acid, CH₃COOH");
  [[28,60,1],[50,52,0],[78,70,1],[100,58,0],[128,76,1],[36,98,0],[64,112,1],[92,102,0],[118,120,1],[132,100,0],[30,138,1],[56,144,0],[100,140,0]].forEach(p=>{s+=ion(6+p[0]-6+6,p[1]+8,p[2])});
  [[196,60],[236,56],[276,66],[206,92],[250,100],[290,92],[200,128],[240,132],[284,126],[222,76]].forEach(p=>{s+=mol(p[0],p[1]+8)});
  s+=ion(316,52,1)+ion(300,142,0);
  s+=TX(81,176,"fully ionised: many H⁺",{s:10.5})+TX(251,176,"mostly molecules: few H⁺",{s:10.5});
  return FG(338,184,s,"Particle pictures: a strong acid is fully split into ions, a weak acid is mostly un-ionised molecules with a few ions","Red + is H⁺, blue − is the negative ion, joined circles are intact acid molecules.",420);
};
/* oxide classification */
FIGS.D_OXIDES=()=>{
  const bx=(x,y,t,sub,ex,c)=>`<rect x="${x}" y="${y}" width="158" height="104" rx="9" fill="${c}" fill-opacity=".22" stroke="currentColor" stroke-opacity=".6" stroke-width="1.4"/>`+TX(x+79,y+20,t,{s:13,w:700})+TX(x+79,y+38,sub[0],{s:10.5})+TX(x+79,y+51,sub[1],{s:10.5})+TX(x+79,y+72,ex[0],{s:11,w:700})+TX(x+79,y+88,ex[1],{s:11,w:700});
  return FG(340,236,bx(6,6,"Basic",["metal oxides","react with acids"],["CuO  MgO","CaO  K₂O"],"var(--accent)")+bx(176,6,"Acidic",["non-metal oxides","react with bases"],["CO₂  SO₂","NO₂  SiO₂"],"var(--bad)")+bx(6,122,"Amphoteric",["react with acids AND bases","(Extended)"],["ZnO","Al₂O₃"],"#B79CE0")+bx(176,122,"Neutral",["no reaction with","acids or bases"],["CO  NO","N₂O"],"var(--good)"),"Four boxes classifying oxides as basic, acidic, amphoteric or neutral with examples","Classifying oxides by their reactions.",380);
};
/* soluble salt, excess solid */
FIGS.D_SALTA_WIDE=()=>{
  let s=TX(100,18,"1  React",{s:13,w:700})+TX(300,18,"2  Filter",{s:13,w:700})+TX(500,18,"3  Crystallise",{s:13,w:700});
  s+=BEAKER(100,50,80,100,"#7FC4D6",.72,[0,1,2,3,4].map(i=>DOT(70+i*15,142-(i%2)*4,6,"currentColor",.55)).join("")+[[86,110],[108,96],[120,120]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="none" stroke="currentColor" stroke-opacity=".6"/>`).join(""))+TX(100,168,"warm dilute acid + excess solid",{s:10.5})+TX(100,182,"stir until no more reacts",{s:10.5});
  s+=FUNNEL(284,34,"#8D8D8D")+BEAKER(284,100,64,54,"#7FC4D6",.45)+`<path d="M284 86V104" stroke="#7FC4D6" stroke-width="2.5"/>`+TX(340,58,"residue = excess solid",{s:10.5,a:"start"})+TX(340,148,"filtrate = salt solution",{s:10.5,a:"start"})+TX(300,176,"",{s:10});
  s+=`<path d="M462 94Q462 128 500 128Q538 128 538 94Z" fill="#7FC4D6" fill-opacity=".35" stroke="currentColor" stroke-width="1.6"/><path d="M450 134H550M460 134L452 176M540 134L548 176" stroke="currentColor" stroke-width="2"/><path d="M500 164Q490 152 496 142Q500 150 504 144Q512 154 500 164Z" fill="#F28B1E"/>`+[0,1,2].map(i=>`<path d="M${480+i*20} 84q-6 -8 0 -16t0 -16" fill="none" stroke="currentColor" stroke-opacity=".4"/>`).join("")+TX(500,182,"heat gently, cold-rod test, cool",{s:10.5});
  s+=ARR(150,100,196,100)+ARR(372,100,416,100);
  return FG(600,192,s,"Three stages of making a soluble salt with an excess solid: react in a beaker, filter off the excess, then evaporate and crystallise","Method A: excess solid, filter, crystallise.",760);
};
/* titration apparatus */
FIGS.D_TITR=()=>{
  let s=`<path d="M30 306H190" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="M46 306V30" stroke="currentColor" stroke-width="4"/><path d="M46 70H100" stroke="currentColor" stroke-width="4"/>`;
  s+=`<rect x="100" y="20" width="22" height="170" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="101" y="52" width="20" height="136" fill="var(--accent)" fill-opacity=".35"/>`+[0,1,2,3,4,5,6,7].map(i=>`<path d="M100 ${34+i*18}h7" stroke="currentColor"/>`).join("")+`<path d="M111 190V214" stroke="currentColor" stroke-width="2"/><path d="M104 196H118" stroke="currentColor" stroke-width="4"/><circle cx="111" cy="222" r="2" fill="var(--accent)"/>`;
  s+=`<rect x="70" y="296" width="82" height="10" fill="#fff" stroke="currentColor" stroke-opacity=".5"/><path d="M98 232H124L152 290Q154 296 148 296H74Q68 296 70 290Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M86 266H136L150 290Q152 295 146 295H76Q70 295 72 290Z" fill="#F2B6C8" fill-opacity=".75"/>`;
  s+=TX(140,40,"burette: acid",{s:11,a:"start",w:700})+TX(140,54,"(read the volume at the",{s:10,a:"start"})+TX(140,66,"bottom of the meniscus)",{s:10,a:"start"})+TX(168,206,"tap",{s:10,a:"start"})+TX(166,252,"conical flask:",{s:11,a:"start",w:700})+TX(166,266,"alkali from a pipette",{s:10,a:"start"})+TX(166,278,"+ a few drops of indicator",{s:10,a:"start"})+TX(12,320,"white tile makes the colour change easy to see",{s:10,a:"start",i:1});
  return FG(330,330,s,"Titration apparatus: burette of acid above a conical flask of alkali with indicator standing on a white tile","Titration apparatus. Swirl the flask and add acid drop by drop near the end-point.",360);
};
/* precipitation method */
FIGS.D_PPT_WIDE=()=>{
  let s=TX(100,18,"1  Mix",{s:13,w:700})+TX(300,18,"2  Filter and wash",{s:13,w:700})+TX(500,18,"3  Dry",{s:13,w:700});
  s+=BEAKER(60,40,44,36,"#CFE8F2",.7)+BEAKER(150,40,44,36,"#CFE8F2",.7)+BEAKER(105,98,84,70,"#CFE8F2",.7,[0,1,2,3,4,5,6,7,8].map(i=>DOT(78+(i%5)*10+(i>4?5:0),112+Math.floor(i/5)*14+(i%3)*4,3.6,"#fff",.95)).join("").replace(/fill="#fff"/g,`fill="#fff" stroke="currentColor" stroke-opacity=".5"`))+`<path d="M62 78Q80 92 96 98M150 78Q134 92 116 98" fill="none" stroke="currentColor" stroke-dasharray="3 3" stroke-opacity=".6"/>`+TX(105,184,"white precipitate forms",{s:10.5});
  s+=FUNNEL(300,40,"#fff")+BEAKER(300,108,64,54,"#CFE8F2",.4)+`<path d="M300 94V112" stroke="#CFE8F2" stroke-width="2.5"/>`+[0,1,2].map(i=>`<path d="M${270+i*30} 22l0 10" stroke="#2290BC" stroke-width="2.5" stroke-linecap="round"/>`).join("")+TX(300,184,"wash residue with distilled water",{s:10.5});
  s+=`<rect x="450" y="40" width="100" height="100" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M450 96H550" stroke="currentColor" stroke-opacity=".5"/><path d="M470 96Q470 80 500 80Q530 80 530 96Z" fill="#fff" stroke="currentColor"/><path d="M462 52q6 -8 12 0t12 0M498 52q6 -8 12 0t12 0" fill="none" stroke="var(--bad)" stroke-opacity=".7"/>`+TX(500,160,"leave to dry in a warm oven",{s:10.5})+TX(500,174,"or on filter paper",{s:10.5});
  s+=ARR(170,110,214,110)+ARR(380,100,430,100);
  return FG(600,192,s,"Making an insoluble salt: mix two solutions to form a precipitate, filter and wash it, then dry it","Precipitation: mix, filter, wash, dry.",760);
};
/* hydrated and anhydrous copper(II) sulfate */
FIGS.D_HYD=()=>{
  const cr=(cx,col)=>[0,1,2,3,4].map(i=>`<polygon points="${cx-17+i*7},128 ${cx-14+i*7},118 ${cx-8+i*7},128" fill="${col}" stroke="currentColor" stroke-opacity=".5"/>`).join("");
  let s=TUBE(70,50,36,90,"#E8F0F0",0)+cr(70,"#2E7DD1")+TUBE(250,50,36,90,"#E8F0F0",0)+[0,1,2,3,4,5,6].map(i=>DOT(238+(i%4)*8,132-Math.floor(i/4)*8,3,"#fff",1)).join("").replace(/fill="#fff"/g,`fill="#fff" stroke="currentColor" stroke-opacity=".5"`);
  s+=ARR(112,86,208,86,"var(--bad)",2.2)+TX(160,78,"heat",{s:12,w:700,f:"var(--bad)"})+ARR(208,112,112,112,"var(--accent)",2.2)+TX(160,130,"add water",{s:12,w:700,f:"var(--accent)"});
  s+=TX(70,168,"CuSO₄·5H₂O",{s:12,w:700})+TX(70,183,"hydrated: blue",{s:11})+TX(250,168,"CuSO₄",{s:12,w:700})+TX(250,183,"anhydrous: white",{s:11});
  return FG(320,194,s,"Blue hydrated copper(II) sulfate crystals turn into white anhydrous powder on heating and back again when water is added","The change is reversible. Water test: white CuSO₄ turns blue.",360);
};
})();

/* ---------- Topic 7 lessons ---------- */
const D7=[];
D7.push(L("Properties of acids and bases","What acids and bases are, their reactions, indicators and the ammonium test.",
`<h4>What are acids and bases?</h4>
<p>An <b>acid</b> is a substance that forms hydrogen ions, H^+^, when it dissolves in water. These ions are what make a solution acidic. Acids have a pH below 7, taste sour (when safe to taste) and can be corrosive.</p>
<p>A <b>base</b> is a substance that neutralises an acid to form a salt and water. Most bases are metal oxides or metal hydroxides. A base that dissolves in water is called an <b>alkali</b>. Alkalis form hydroxide ions, OH^−^, in solution and have a pH above 7.</p>
<div class="ex"><b>Worked example</b>Hydrochloric acid: HCl(aq) → H^+^(aq) + Cl^−^(aq)<br>Sodium hydroxide: NaOH(s) → Na^+^(aq) + OH^−^(aq)</div>
<table><tr><th></th><th>Acid</th><th>Alkali</th></tr><tr><td>Ion formed in water</td><td>H^+^</td><td>OH^−^</td></tr><tr><td>pH</td><td>Below 7</td><td>Above 7</td></tr><tr><td>Examples</td><td>HCl, H~2~SO~4~, HNO~3~</td><td>NaOH, KOH, Ca(OH)~2~</td></tr></table>
<h4>Reactions of acids</h4>
<p>Dilute acids have three typical reactions. The salt you get depends on the acid: hydrochloric acid gives <b>chlorides</b>, sulfuric acid gives <b>sulfates</b> and nitric acid gives <b>nitrates</b>.</p>
<table><tr><th>Reaction</th><th>Products</th><th>Example with sulfuric acid</th></tr>
<tr><td>Acid + metal</td><td>salt + hydrogen</td><td>Mg + H~2~SO~4~ → MgSO~4~ + H~2~</td></tr>
<tr><td>Acid + base (oxide or hydroxide)</td><td>salt + water</td><td>MgO + H~2~SO~4~ → MgSO~4~ + H~2~O</td></tr>
<tr><td>Acid + carbonate</td><td>salt + water + carbon dioxide</td><td>MgCO~3~ + H~2~SO~4~ → MgSO~4~ + H~2~O + CO~2~</td></tr></table>
<div class="key"><b>Exam tip</b>Only metals <i>above hydrogen</i> in the reactivity series react with dilute acids. Copper, silver and gold do not.</div>
<h4>More examples with magnesium</h4>
<table><tr><th>Acid</th><th>With magnesium</th><th>With magnesium hydroxide</th><th>With magnesium carbonate</th></tr>
<tr><td>Hydrochloric</td><td>Mg + 2HCl → MgCl~2~ + H~2~</td><td>Mg(OH)~2~ + 2HCl → MgCl~2~ + 2H~2~O</td><td>MgCO~3~ + 2HCl → MgCl~2~ + H~2~O + CO~2~</td></tr>
<tr><td>Nitric</td><td>Mg + 2HNO~3~ → Mg(NO~3~)~2~ + H~2~</td><td>Mg(OH)~2~ + 2HNO~3~ → Mg(NO~3~)~2~ + 2H~2~O</td><td>MgCO~3~ + 2HNO~3~ → Mg(NO~3~)~2~ + H~2~O + CO~2~</td></tr></table>
<p>Notice how the number of H atoms and the formula of the salt change with the acid. Nitric acid has one H per molecule, so two are needed to react with one Mg.</p>
<h4>Indicators</h4>
<p>An <b>indicator</b> is a dye that shows by its colour whether a solution is acidic or alkaline. Litmus comes from lichens. Synthetic indicators such as methyl orange and thymolphthalein are organic compounds.</p>
<table><tr><th>Indicator</th><th>In acid</th><th>In alkali</th></tr><tr><td>Litmus</td><td>red</td><td>blue</td></tr><tr><td>Methyl orange</td><td>red</td><td>yellow</td></tr><tr><td>Thymolphthalein</td><td>colourless</td><td>blue</td></tr></table>
<ul><li><b>Titrations</b> use synthetic indicators because their colour changes sharply at the end-point.</li><li><b>Litmus</b> changes gradually through purple, so it is poor for titrations. It is excellent as paper for testing solutions and gases.</li></ul>
<h4>Testing for ammonium ions</h4>
<p>Warming an ammonium salt with an alkali gives off ammonia gas. Ammonia is volatile, so even though it is a weak base, a stronger alkali pushes it out of the salt.</p>
<div class="ex"><b>Worked example</b>NH~4~Cl + NaOH → NaCl + H~2~O + NH~3~</div>
<p><b>Test:</b> add sodium hydroxide solution, warm gently, and hold <b>damp red litmus paper</b> at the mouth of the tube. If ammonium ions were present the paper turns <b>blue</b>.</p>
<h4>Neutralisation and the ions involved</h4>
<p>Acids supply H^+^ and alkalis supply OH^−^. In every neutralisation, these two react to make water:</p>
<div class="key"><b>Ionic equation</b>H^+^(aq) + OH^−^(aq) → H~2~O(l)</div>
<p>This is why the solution moves towards pH 7. Not every reaction of an acid is a neutralisation. When a metal reacts with an acid a salt forms, but <b>no water</b> forms, so it is not neutralisation.</p>`,
I("How can you tell what is in an unlabelled bottle without tasting it?",
`<ol><li>Four unlabelled colourless liquids are dilute hydrochloric acid, sodium hydroxide solution, distilled water and ammonium chloride solution. Which could you identify with litmus alone? Predict the result for each.</li><li>Plan extra tests to separate the ones that litmus cannot tell apart. Use the ammonium test.</li><li>Predict what you would see if magnesium ribbon were added to each liquid.</li><li>Write a balanced equation for each reaction you predict.</li></ol>`,
`<p><b>Reactions of an acid.</b> Add dilute hydrochloric acid to separate samples of magnesium ribbon, copper(II) oxide and calcium carbonate chips. Record bubbles, temperature change and colour change. Test any gas: lighted splint for hydrogen, limewater for carbon dioxide.</p><p><b>Indicator comparison.</b> Put 1 cm<sup>3</sup> of dilute acid and alkali into separate tubes. Add litmus, methyl orange and thymolphthalein in turn. Build a colour table.</p><p><b>Ammonium test.</b> Warm 1 cm<sup>3</sup> of ammonium chloride solution with 1 cm<sup>3</sup> of sodium hydroxide solution and test the fumes with damp red litmus paper.</p><p class="safe">Safety: eye protection. Acids and alkalis are corrosive. Ammonia is irritating, so use small amounts and keep the fumes away from your face.</p>`,
["https://phet.colorado.edu/en/simulations/acid-base-solutions","PhET: Acid-Base Solutions simulation"]),
[["State what is meant by an alkali.","A base that is soluble in water (1). It forms OH^−^ ions in solution (1).",2],
["Complete and balance: Zn + 2HCl →. Name the products.","ZnCl~2~ + H~2~ (1). Zinc chloride and hydrogen (1).",2],
["Write the equation for the reaction of calcium carbonate with nitric acid.","CaCO~3~ + 2HNO~3~ → Ca(NO~3~)~2~ + H~2~O + CO~2~ (2).",2],
["Give the colours of litmus and methyl orange in an alkali.","Litmus: blue (1). Methyl orange: yellow (1).",2],
["Describe the test for ammonium ions.","Add sodium hydroxide solution and warm (1). Test the gas with damp red litmus paper (1), which turns blue (1).",3],
["Explain why the reaction of a metal with an acid is not neutralisation.","Neutralisation forms a salt and water (1). A metal and an acid form a salt and hydrogen, with no water (1).",2]],
[M("Which ion is present in all acidic solutions?",["OH^−^","H^+^","Cl^−^","Na^+^"],1,"Acids release H^+^ in water."),
M("Which reaction produces carbon dioxide?",["Acid + metal","Acid + alkali","Acid + carbonate","Acid + metal oxide"],2,"Acid + carbonate gives salt + water + CO~2~."),
M("Which indicator is red in acid and yellow in alkali?",["Litmus","Thymolphthalein","Methyl orange","Universal indicator"],2,"Methyl orange."),
M("Which metal does NOT react with dilute hydrochloric acid?",["Zinc","Magnesium","Copper","Iron"],2,"Copper is below hydrogen in the reactivity series."),
T("What colour does damp red litmus paper turn in ammonia gas?",["blue"],"Ammonia is alkaline, so red litmus turns blue."),
T("Name the salt formed when magnesium oxide reacts with sulfuric acid.",["magnesium sulfate","magnesium sulphate"],"Magnesium sulfate, MgSO~4~."),
M("Which is the ionic equation for neutralisation?",["H^+^ + OH^−^ → H~2~O","H~2~ + O → H~2~O","Na^+^ + Cl^−^ → NaCl","2H + O → H~2~O"],0,"H^+^ and OH^−^ combine to make water.")],
[["What is an acid?","A substance that forms H^+^ ions in water."],
["What is an alkali?","A soluble base. It forms OH^−^ ions in water."],
["Acid + metal gives…","A salt and hydrogen."],
["Acid + base gives…","A salt and water."],
["Acid + carbonate gives…","A salt, water and carbon dioxide."],
["Colours of thymolphthalein","Colourless in acid, blue in alkali."],
["Why is litmus unsuitable for titrations?","Its colour change is gradual and goes through purple, so the end-point is hard to see."],
["Test for NH~4~^+^","Warm with NaOH solution. Ammonia turns damp red litmus blue."]]));

D7.push(L("pH, strong acids and weak acids","The pH scale, hydrogen ion concentration, proton transfer and acid strength.",
`<h4>The pH scale</h4>
<p>The pH scale runs from 0 to 14 and measures how acidic or alkaline a solution is. Pure water and neutral solutions have pH 7. Lower values are more acidic and higher values are more alkaline.</p>
<table><tr><th>pH</th><th>Description</th></tr><tr><td>0 to 2</td><td>strong acid</td></tr><tr><td>3 to 6</td><td>weak acid</td></tr><tr><td>7</td><td>neutral</td></tr><tr><td>8 to 11</td><td>weak alkali</td></tr><tr><td>12 to 14</td><td>strong alkali</td></tr></table>
{{D_PH}}
<h4>pH and hydrogen ion concentration</h4>
<p>pH tells you how many H^+^ ions are in the solution, but the link is <b>inverse</b>: more H^+^ means a lower pH. The scale is <b>logarithmic</b>. Each step of 1 on the scale means a ten-fold change in the concentration of H^+^ ions.</p>
<div class="ex"><b>Worked example</b>An acid of pH 3 has 10 times more H^+^ than an acid of pH 4.<br>An acid of pH 2 has 10 × 10 = 100 times more H^+^ than an acid of pH 4.</div>
<div class="key"><b>Exam tip</b>Count the number of pH steps, then multiply by 10 for each step. Three steps apart means 1000 times.</div>
<h4>Measuring pH</h4>
<p><b>Universal indicator</b> is a mixture of dyes that gives a range of colours. Add a few drops, then match the colour to a chart: red for strong acid, orange or yellow for weak acid, green for neutral, blue for weak alkali and purple for strong alkali. A pH meter gives a more exact number.</p>
<h4>Acids as proton donors <i>(Extended only)</i></h4>
<p>A hydrogen ion is just a proton. In water an acid <b>donates</b> a proton to a water molecule, and the water acts as a base because it <b>accepts</b> the proton.</p>
<ul><li>Acid: proton <b>donor</b></li><li>Base: proton <b>acceptor</b></li></ul>
{{D_PROTON}}
<h4>Strong and weak acids</h4>
<p>The <b>strength</b> of an acid depends on how much of it splits into ions in water.</p>
<ul><li>A <b>strong acid</b> is fully ionised. Every molecule releases H^+^. Examples: hydrochloric acid, sulfuric acid, nitric acid. HCl(aq) → H^+^(aq) + Cl^−^(aq).</li><li>A <b>weak acid</b> is only partly ionised. An equilibrium forms, and most of the acid stays as molecules. Examples: ethanoic acid, propanoic acid, citric acid. CH~3~CH~2~COOH ⇌ H^+^ + CH~3~CH~2~COO^−^</li></ul>
{{D_STRONG}}
<p>The ⇌ sign shows that the reaction can go both ways. In a weak acid the equilibrium lies far to the left, so there are few H^+^ ions and the pH is higher than for a strong acid of the same concentration. A weak acid still reacts with alkalis: CH~3~COOH + NaOH → CH~3~COONa + H~2~O.</p>
<h4>Strength is not concentration</h4>
<p><b>Concentration</b> is how many acid molecules there are in 1 dm^3^. <b>Strength</b> is how much of the acid ionises. They are independent.</p>
<div class="ex"><b>Worked example</b>A dilute solution of hydrochloric acid can have a lower pH than a concentrated solution of ethanoic acid. Almost all the HCl molecules ionise, but very few ethanoic acid molecules do, so the dilute HCl has more H^+^ ions.</div>
<div class="key"><b>Exam tip</b>Say <i>"strong"</i> or <i>"weak"</i> for ionisation, and <i>"concentrated"</i> or <i>"dilute"</i> for amount dissolved. Do not mix them up.</div>`,
I("Two acids have the same concentration. Why is one far more acidic?",
`<ol><li>Look at the data: 0.1 mol/dm<sup>3</sup> hydrochloric acid has pH 1; 0.1 mol/dm<sup>3</sup> ethanoic acid has pH about 3. How many times more H<sup>+</sup> ions does the hydrochloric acid solution contain?</li><li>Draw particle pictures of the two solutions using circles for H<sup>+</sup> and for acid molecules.</li><li>Predict which acid will react faster with magnesium ribbon at the same concentration, and why.</li><li>Predict whether the same amount of sodium hydroxide is needed to neutralise 25 cm<sup>3</sup> of each acid.</li></ol>`,
`<p><b>pH survey.</b> Use universal indicator paper or a pH meter to find the pH of household liquids that are safe to handle, such as vinegar, lemon juice, tap water, soap solution and baking soda solution. Arrange them on a class pH scale.</p><p><b>Strong against weak.</b> Add 2 cm of magnesium ribbon to equal volumes of 0.1 mol/dm<sup>3</sup> hydrochloric acid and 0.1 mol/dm<sup>3</sup> ethanoic acid. Compare the rate of bubbling, then test the pH of each. The acids react with the same amount of alkali, so neutralisation does not show the difference in strength.</p><p><b>Dilution ladder.</b> Dilute 10 cm<sup>3</sup> of acid with 90 cm<sup>3</sup> of water, then repeat three times. Measure the pH at every step and link it to the ten-fold change in H<sup>+</sup>.</p><p class="safe">Safety: eye protection. Use dilute solutions only.</p>`,
["https://phet.colorado.edu/en/simulations/ph-scale","PhET: pH Scale simulation"]),
[["State the pH of a neutral solution and name an indicator that shows a pH range.","pH 7 (1). Universal indicator (1).",2],
["An acid of pH 2 and an acid of pH 5 are compared. How many times more H^+^ ions does the first acid have?","1000 times (3 steps) (1).",1],
["Define a strong acid and a weak acid.","Strong: fully ionised in water (1). Weak: only partly ionised in water (1).",2],
["Write an equation to show the ionisation of ethanoic acid. Explain what the symbol ⇌ means. (Extended)","CH~3~COOH ⇌ CH~3~COO^−^ + H^+^ (1). The reaction is reversible and reaches equilibrium (1).",2],
["Explain, using proton transfer, why water acts as a base when HCl dissolves in it. (Extended)","HCl donates a proton, H^+^ (1). Water accepts the proton to form H~3~O^+^ (1).",2],
["A student says: 'concentrated acid is always strong acid'. Explain why she is wrong.","Concentration is the amount of acid in 1 dm^3^ (1). A concentrated weak acid still ionises only slightly (1).",2]],
[M("Which solution has the highest concentration of H^+^ ions?",["pH 1","pH 4","pH 7","pH 12"],0,"The lowest pH has the most H^+^."),
N("How many times more H^+^ is in a solution of pH 2 than in a solution of pH 4?",100,"","Two steps: 10 × 10 = 100."),
M("Which acid is a weak acid?",["Nitric acid","Hydrochloric acid","Ethanoic acid","Sulfuric acid"],2,"Ethanoic acid is only partly ionised."),
M("What colour does universal indicator show at pH 7?",["Red","Orange","Green","Purple"],2,"Neutral is green."),
T("What do we call a substance that accepts a proton?",["base"],"A base is a proton acceptor."),
M("Which statement is correct?",["A strong acid is always concentrated","A weak acid is fully ionised","A dilute solution of a strong acid can be more acidic than a concentrated weak acid","pH 3 is a strong alkali"],2,"Strength and concentration are different ideas."),
M("In the equation HCl + H~2~O → H~3~O^+^ + Cl^−^, the water acts as",["an acid","a base","a catalyst","an indicator"],1,"It accepts the proton from HCl.")],
[["pH of a strong acid","0 to 2."],
["pH of a strong alkali","12 to 14."],
["Effect of 1 unit change in pH","Ten times change in H^+^ concentration."],
["What is universal indicator?","A mixture of dyes that gives different colours across the pH scale."],
["Acid (Extended, proton terms)","A proton donor."],
["Base (Extended, proton terms)","A proton acceptor."],
["Difference: strong and weak acids","Strong: fully ionised. Weak: partly ionised (equilibrium)."],
["Strength vs concentration","Strength is the degree of ionisation. Concentration is the amount per dm^3^."]]));

D7.push(L("Classifying oxides","Acidic, basic, neutral and amphoteric oxides and how to tell them apart.",
`<h4>What is an oxide?</h4>
<p>An <b>oxide</b> is a compound of oxygen with <b>one other element</b>. Examples are magnesium oxide, MgO, zinc oxide, ZnO, potassium oxide, K~2~O, carbon dioxide, CO~2~, sulfur dioxide, SO~2~ and water, H~2~O.</p>
<p>Oxides are classified by how they behave with acids and bases. The position of the element in the Periodic Table gives a very good first guess.</p>
{{D_OXIDES}}
<h4>Basic oxides</h4>
<p>Oxides of <b>metals</b> are usually basic. They react with acids to give a salt and water, and the ones that dissolve in water form alkaline solutions with a high pH.</p>
<div class="ex"><b>Worked example</b>CuO + H~2~SO~4~ → CuSO~4~ + H~2~O<br>CaO + H~2~O → Ca(OH)~2~ (an alkali forms)</div>
<h4>Acidic oxides</h4>
<p>Oxides of <b>non-metals</b> are usually acidic. They react with bases to give a salt and water. When they dissolve in water they form acidic solutions with a low pH. Common examples are CO~2~, SO~2~, NO~2~ and SiO~2~.</p>
<div class="ex"><b>Worked example</b>CO~2~ + 2NaOH → Na~2~CO~3~ + H~2~O<br>SO~2~ + H~2~O → H~2~SO~3~ (an acidic solution forms)</div>
<div class="key"><b>Exam tip</b>Metals form basic oxides. Non-metals form acidic oxides. This is also why acid rain forms when non-metal oxides such as SO~2~ and NO~2~ dissolve in rain water.</div>
<h4>Neutral oxides</h4>
<p>A few non-metal oxides do not react with acids or bases. They are <b>neutral</b>. Examples are dinitrogen oxide, N~2~O, nitrogen monoxide, NO, and carbon monoxide, CO. (Water is also a neutral oxide.)</p>
<h4>Amphoteric oxides <i>(Extended only)</i></h4>
<p>An <b>amphoteric</b> oxide can react as a base with an acid <i>and</i> as an acid with a base. In both cases a salt and water form. The two to know are <b>zinc oxide, ZnO</b>, and <b>aluminium oxide, Al~2~O~3~</b>. Their hydroxides are amphoteric too.</p>
<table><tr><th>Behaves as</th><th>Reaction</th></tr>
<tr><td>a base (with an acid)</td><td>Al~2~O~3~ + 6HCl → 2AlCl~3~ + 3H~2~O</td></tr>
<tr><td>an acid (with an alkali)</td><td>Al~2~O~3~ + 2NaOH → 2NaAlO~2~ + H~2~O</td></tr></table>
<h4>Summary</h4>
<table><tr><th>Type</th><th>Made from</th><th>Reaction</th><th>Examples</th></tr>
<tr><td>Basic</td><td>metals</td><td>react with acids</td><td>CuO, CaO, MgO, K~2~O</td></tr>
<tr><td>Acidic</td><td>non-metals</td><td>react with bases</td><td>CO~2~, SO~2~, NO~2~, SiO~2~</td></tr>
<tr><td>Neutral</td><td>some non-metals</td><td>none</td><td>CO, NO, N~2~O</td></tr>
<tr><td>Amphoteric <i>(Ext.)</i></td><td>some metals</td><td>react with both</td><td>ZnO, Al~2~O~3~</td></tr></table>`,
I("Can you predict whether an oxide is acidic or basic from the element alone?",
`<ol><li>Write the formulae of the oxides of sodium, magnesium, carbon, sulfur and nitrogen. Predict each as acidic, basic or neutral.</li><li>Predict the pH of the solution each oxide would make when dissolved in water (if it dissolves).</li><li>Where in the Periodic Table do the oxides change from basic to acidic?</li><li>Zinc oxide breaks the pattern. What does it do with hydrochloric acid and with sodium hydroxide?</li></ol>`,
`<p><b>Oxide survey.</b> Place a small amount of each of magnesium oxide, calcium oxide and copper(II) oxide in water, shake and test with universal indicator. Burn a little sulfur in a deflagrating spoon under a fume cupboard (teacher demonstration) and test the product with damp indicator paper.</p><p><b>Amphoteric test.</b> Add a spatula of zinc oxide to dilute hydrochloric acid and to sodium hydroxide solution. Warm gently and record whether it dissolves in each.</p><p class="safe">Safety: eye protection. Burning sulfur gives toxic sulfur dioxide, so it must be done in a fume cupboard by the teacher.</p>`),
[["Classify these oxides as acidic, basic or neutral: SO~2~, CaO, CO.","SO~2~ acidic (1), CaO basic (1), CO neutral (1).",3],
["Write the equation for copper(II) oxide reacting with dilute sulfuric acid.","CuO + H~2~SO~4~ → CuSO~4~ + H~2~O (2).",2],
["Explain why sulfur dioxide in the air can cause acid rain.","Sulfur dioxide is an acidic oxide (1). It dissolves in rain water to form an acidic solution (1).",2],
["State what is meant by an amphoteric oxide, and name one. (Extended)","An oxide that reacts with both acids and bases (1). Zinc oxide or aluminium oxide (1).",2],
["Write an equation to show aluminium oxide behaving as a base. (Extended)","Al~2~O~3~ + 6HCl → 2AlCl~3~ + 3H~2~O (2).",2]],
[M("Which oxide is basic?",["CO~2~","SO~2~","MgO","CO"],2,"MgO is a metal oxide."),
M("Which oxide is neutral?",["NO~2~","Al~2~O~3~","N~2~O","SiO~2~"],2,"N~2~O does not react with acids or bases."),
M("Which oxide is amphoteric?",["Sodium oxide","Zinc oxide","Carbon dioxide","Calcium oxide"],1,"ZnO reacts with both acids and bases."),
T("What type of oxide is formed when a non-metal burns in oxygen? (usually)",["acid"],"Acidic."),
M("Solution of an acidic oxide in water has a pH",["above 7","equal to 7","below 7","exactly 14"],2,"Acidic oxides form acidic solutions."),
M("Which equation shows an acidic oxide reacting with a base?",["CuO + 2HCl → CuCl~2~ + H~2~O","CO~2~ + 2NaOH → Na~2~CO~3~ + H~2~O","Mg + 2HCl → MgCl~2~ + H~2~","ZnO + 2HCl → ZnCl~2~ + H~2~O"],1,"Carbon dioxide is an acidic oxide.")],
[["Metal oxides are usually…","Basic."],
["Non-metal oxides are usually…","Acidic."],
["Name three neutral oxides","CO, NO and N~2~O (and water)."],
["Amphoteric oxide (Extended)","Reacts with both acids and bases to form a salt and water."],
["Two amphoteric oxides (Extended)","Zinc oxide and aluminium oxide."],
["Basic oxide + acid gives…","Salt and water."],
["Acidic oxide + base gives…","Salt and water."],
["pH of a solution of a soluble basic oxide","Above 7."]]));

D7.push(L("Preparing soluble salts","What a salt is and two methods for making pure, dry crystals of a soluble salt.",
`<h4>What is a salt?</h4>
<p>A <b>salt</b> forms when the hydrogen of an acid is replaced by a metal ion or the ammonium ion. Replace the H in HCl with potassium and you get potassium chloride, KCl. Salts are used in fertilisers, batteries, cleaning products, medicines and fungicides.</p>
<p>The name has two parts. The <b>first part</b> comes from the metal, base or carbonate. The <b>second part</b> comes from the acid: hydrochloric acid gives chlorides, sulfuric acid gives sulfates and nitric acid gives nitrates.</p>
<div class="ex"><b>Worked example</b>Zinc oxide + sulfuric acid → zinc sulfate + water<br>Sodium hydroxide + hydrochloric acid → sodium chloride + water</div>
<h4>Choosing a method</h4>
<table><tr><th>If the other reactant is…</th><th>Use</th></tr>
<tr><td>a metal (above hydrogen, not too reactive)</td><td>Method A1: excess metal</td></tr>
<tr><td>an insoluble base, such as a metal oxide</td><td>Method A2: excess insoluble base</td></tr>
<tr><td>an insoluble carbonate</td><td>Method A3: excess insoluble carbonate</td></tr>
<tr><td>a soluble base (an alkali)</td><td>Method B: titration</td></tr></table>
<div class="key"><b>Exam tip</b>Method A uses an <b>excess of a solid</b>, so the extra can be filtered off. Method B uses a soluble alkali, so you cannot filter. You must add exactly the right volume, found by a titration.</div>
<h4>Method A: excess solid</h4>
<ol><li><b>Warm</b> a measured volume of dilute acid in a beaker.</li><li>Add the solid (metal, insoluble base or insoluble carbonate) a little at a time, stirring, until <b>no more reacts</b>. Some solid is left over: that is the excess, so all the acid has been used.</li><li><b>Filter</b> to remove the excess solid. The filtrate is the salt solution.</li><li>Pour the filtrate into an evaporating basin and <b>heat gently</b> to concentrate it. Dip in a cold glass rod: if crystals form on the rod, the solution is saturated.</li><li>Leave the basin in a warm place to <b>crystallise</b>.</li><li>Pour off the remaining liquid and <b>dry</b> the crystals between filter paper.</li></ol>
{{D_SALTA_WIDE}}
<table><tr><th>Method</th><th>Example</th></tr>
<tr><td>A1 excess metal</td><td>Mg(s) + H~2~SO~4~(aq) → MgSO~4~(aq) + H~2~(g)</td></tr>
<tr><td>A2 excess insoluble base</td><td>CuO(s) + H~2~SO~4~(aq) → CuSO~4~(aq) + H~2~O(l)</td></tr>
<tr><td>A3 excess insoluble carbonate</td><td>CaCO~3~(s) + 2HCl(aq) → CaCl~2~(aq) + CO~2~(g) + H~2~O(l)</td></tr></table>
<h4>Method B: titration with an alkali</h4>
<p>Use this for soluble bases such as sodium hydroxide or potassium hydroxide. Both reactants are in solution, so the acid and alkali must be added in the exact ratio.</p>
<ol><li>Use a <b>pipette</b> to put a fixed volume of alkali in a conical flask. Add a few drops of indicator.</li><li>Fill a <b>burette</b> with acid and note the start volume.</li><li>Add acid slowly, swirling, until the indicator changes colour (the <b>end-point</b>). Note the final volume.</li><li>Repeat <b>without indicator</b>, using the same volumes, so the salt is not coloured by the dye.</li><li>Heat the neutral solution in an evaporating basin, crystallise and dry the crystals as in Method A.</li></ol>
{{D_TITR}}
<div class="ex"><b>Worked example</b>NaOH(aq) + HCl(aq) → NaCl(aq) + H~2~O(l)</div>
<h4>Why each step matters</h4>
<ul><li><b>Excess solid:</b> guarantees all the acid has reacted, so the salt is not contaminated with acid.</li><li><b>Filtering:</b> removes the unreacted solid.</li><li><b>Cold-rod test and slow cooling:</b> make larger, better crystals than boiling the solution dry.</li><li><b>Repeat without indicator:</b> otherwise the crystals would be contaminated with the dye.</li><li><b>Drying with filter paper:</b> avoids heating and keeps the water of crystallisation in the crystals.</li></ul>`,
I("How can you be sure all the acid has been used up?",
`<ol><li>A student wants to make copper(II) sulfate crystals from dilute sulfuric acid. List two different solids the student could use.</li><li>Explain why adding <i>exactly</i> the right amount of copper(II) oxide would be a poor plan.</li><li>Predict what you would see if the oxide is in excess.</li><li>Explain why sodium and potassium can not be used in Method A1, even though they are above hydrogen. Which method works for their salts?</li></ol>`,
`<p><b>Make copper(II) sulfate crystals.</b> Warm 25 cm<sup>3</sup> of 0.5 mol/dm<sup>3</sup> sulfuric acid. Add copper(II) oxide a spatula at a time, stirring, until some stays at the bottom. Filter, heat the filtrate until a cold glass rod shows crystals, then leave to cool. Dry the crystals and weigh them.</p><p><b>Make sodium chloride by titration.</b> Titrate 25.0 cm<sup>3</sup> of sodium hydroxide solution with dilute hydrochloric acid using methyl orange. Repeat without indicator, evaporate and crystallise.</p><p><b>Compare yields.</b> Calculate the percentage yield for each method and suggest where product was lost.</p><p class="safe">Safety: eye protection. Heat gently and never evaporate to dryness. Copper compounds are harmful.</p>`,
["https://phet.colorado.edu/en/simulations/acid-base-solutions","PhET: Acid-Base Solutions simulation"]),
[["Write the word equation and the symbol equation for magnesium reacting with sulfuric acid.","Magnesium + sulfuric acid → magnesium sulfate + hydrogen (1). Mg + H~2~SO~4~ → MgSO~4~ + H~2~ (1).",2],
["Explain why an excess of copper(II) oxide is used to make copper(II) sulfate.","To make sure all the acid has reacted (1). The excess solid can be filtered off (1).",2],
["Describe how crystals of zinc sulfate are obtained from a solution of zinc sulfate.","Heat gently to evaporate some water (1) until a cold glass rod shows crystals (1). Leave to cool and crystallise (1), then filter and dry between filter paper (1).",4],
["State which method you would use to make potassium nitrate from potassium hydroxide and nitric acid, and why.","Titration (1). Potassium hydroxide is soluble, so excess cannot be filtered off (1).",2],
["Explain why the titration is repeated without indicator.","The indicator is a dye (1) that would contaminate the crystals (1).",2],
["Name the salt made from calcium carbonate and hydrochloric acid and write the equation.","Calcium chloride (1). CaCO~3~ + 2HCl → CaCl~2~ + H~2~O + CO~2~ (2).",3]],
[M("Which solid could be used in excess to make zinc chloride from dilute hydrochloric acid?",["Zinc oxide","Sodium hydroxide","Potassium carbonate","Copper"],0,"Zinc oxide is an insoluble base."),
M("Which method makes sodium sulfate from sulfuric acid?",["Excess metal","Excess insoluble oxide","Titration with sodium hydroxide","Precipitation"],2,"Sodium hydroxide is a soluble alkali."),
M("Why is the mixture filtered in Method A?",["To remove the salt","To remove the excess solid","To cool the solution","To dry the crystals"],1,"The excess solid is left on the filter paper."),
T("What is the name of the burette reading where the indicator changes colour?",["end-point","end point","endpoint"],"The end-point."),
M("Which salt is made by reacting nitric acid with copper(II) oxide?",["Copper(II) nitrate","Copper(II) nitride","Copper(II) sulfate","Copper(II) carbonate"],0,"Nitric acid gives nitrates."),
M("How can you check that a solution is saturated?",["Taste it","Add universal indicator","Dip in a cold glass rod and see if crystals form","Measure its pH"],2,"Crystals on a cold rod show the solution is saturated."),
M("Which is the correct equation for making copper(II) sulfate?",["CuO + H~2~SO~4~ → CuSO~4~ + H~2~O","Cu + H~2~SO~4~ → CuSO~4~ + H~2~","CuO + 2HCl → CuCl~2~ + H~2~O","Cu + 2HCl → CuCl~2~ + H~2~"],0,"Copper does not react with dilute acid, but the oxide does.")],
[["What is a salt?","A compound formed when the H of an acid is replaced by a metal or ammonium ion."],
["Which salt does nitric acid form?","A nitrate."],
["Method A1, A2, A3","Excess metal, excess insoluble base, excess insoluble carbonate."],
["Method B is used for…","Soluble bases (alkalis) such as NaOH. Done by titration."],
["Why use excess solid?","So all the acid reacts. The excess is filtered off."],
["Cold glass rod test","Crystals on a cold rod show the solution is saturated."],
["Why repeat the titration without indicator?","So the crystals are not contaminated with the dye."],
["How are crystals dried?","Pat dry between filter paper."]]));

D7.push(L("Insoluble salts, solubility rules and hydrated salts","Making insoluble salts by precipitation, predicting solubility, and water of crystallisation.",
`<h4>Which salts dissolve?</h4>
<p>Before you plan a preparation you must know whether the salt is soluble. Learn these rules.</p>
<table><tr><th>Salt type</th><th>Soluble?</th><th>Exceptions</th></tr>
<tr><td>Sodium, potassium and ammonium salts</td><td>All soluble</td><td>None</td></tr>
<tr><td>Nitrates</td><td>All soluble</td><td>None</td></tr>
<tr><td>Chlorides</td><td>Soluble</td><td>Silver and lead(II) chloride are insoluble</td></tr>
<tr><td>Sulfates</td><td>Soluble</td><td>Barium, calcium and lead(II) sulfate are insoluble</td></tr>
<tr><td>Carbonates</td><td>Insoluble</td><td>Sodium, potassium and ammonium carbonate are soluble</td></tr>
<tr><td>Hydroxides</td><td>Insoluble</td><td>Sodium, potassium and ammonium hydroxide are soluble (calcium hydroxide is slightly soluble)</td></tr></table>
<div class="key"><b>Exam tip</b>A common memory aid: if the metal is sodium, potassium or ammonium, or the anion is nitrate, the salt dissolves. Start there before checking exceptions.</div>
<h4>Making an insoluble salt by precipitation</h4>
<p>An insoluble salt is made by mixing two <b>soluble</b> salts so that the right ions meet. The insoluble product forms at once as a <b>precipitate</b>. Choose a soluble salt of the metal you want and a soluble salt of the anion you want.</p>
<div class="ex"><b>Worked example</b>To make lead(II) sulfate, mix lead(II) nitrate and potassium sulfate:<br>Pb(NO~3~)~2~(aq) + K~2~SO~4~(aq) → PbSO~4~(s) + 2KNO~3~(aq)<br>Ionic equation: Pb^2+^(aq) + SO~4~^2−^(aq) → PbSO~4~(s)</div>
{{D_PPT_WIDE}}
<ol><li>Mix the two solutions in a beaker. The precipitate forms.</li><li><b>Filter</b> the mixture.</li><li><b>Wash</b> the residue with distilled water to remove soluble impurities.</li><li><b>Dry</b> the solid in a warm oven or between filter paper.</li></ol>
<h4>Ionic equations <i>(Extended only)</i></h4>
<p>An ionic equation shows only the ions that actually join. The other ions, called <b>spectator ions</b>, stay in solution unchanged and are left out.</p>
<div class="ex"><b>Worked example</b>Silver nitrate + sodium chloride:<br>AgNO~3~(aq) + NaCl(aq) → AgCl(s) + NaNO~3~(aq)<br>Spectators: Na^+^ and NO~3~^−^<br>Ionic: Ag^+^(aq) + Cl^−^(aq) → AgCl(s)</div>
<div class="key"><b>Exam tip</b>Check both atoms and charges balance. The total charge must be the same on each side.</div>
<h4>Hydrated and anhydrous salts</h4>
<p>Many salts crystallise with water molecules locked into the crystal. This is <b>water of crystallisation</b>. A salt that contains it is <b>hydrated</b>. One with none is <b>anhydrous</b>.</p>
<table><tr><th>Salt</th><th>Hydrated</th><th>Anhydrous</th></tr>
<tr><td>Copper(II) sulfate</td><td>CuSO~4~·5H~2~O, blue</td><td>CuSO~4~, white</td></tr>
<tr><td>Cobalt(II) chloride</td><td>CoCl~2~·6H~2~O, pink</td><td>CoCl~2~, blue</td></tr></table>
{{D_HYD}}
<p>Heating drives the water off and the colour changes. Adding water back turns the anhydrous salt back to the hydrated colour, and the change is <b>reversible</b>. This makes both useful as a <b>test for water</b>: anhydrous copper(II) sulfate turns from white to blue, and anhydrous cobalt(II) chloride from blue to pink. It shows water is present but not that it is pure.</p>
<div class="ex"><b>Worked example</b>CuSO~4~·5H~2~O(s) ⇌ CuSO~4~(s) + 5H~2~O(l)<br>M~r~ of CuSO~4~·5H~2~O = 64 + 32 + 64 + 5(18) = 250</div>
<h4>Formulae of hydrates <i>(Extended only)</i></h4>
<p>To find the number of water molecules, x, in a hydrate, heat a known mass until it stops changing, then compare moles of water and anhydrous salt.</p>
<div class="ex"><b>Worked example</b>5.00 g of hydrated copper(II) sulfate gives 3.20 g of anhydrous salt.<br>Mass of water = 1.80 g, so moles H~2~O = 1.80 ÷ 18 = 0.10<br>Moles CuSO~4~ = 3.20 ÷ 160 = 0.020<br>Ratio = 0.10 : 0.020 = 5 : 1, so the formula is CuSO~4~·5H~2~O.</div>`,
I("Can you design a way to make a pure sample of an insoluble salt?",
`<ol><li>Choose two soluble salts that would make barium sulfate. Write the equation.</li><li>Plan the four steps to turn the mixture into a dry, pure sample.</li><li>Explain why the solid is washed.</li><li>Predict what you would see when anhydrous copper(II) sulfate is heated, cooled and then wetted.</li></ol>`,
`<p><b>Make a precipitate.</b> Mix equal volumes of 0.1 mol/dm<sup>3</sup> barium chloride and sodium sulfate. Note what you see and write the ionic equation.</p><p><b>Separate it.</b> Filter, wash with distilled water, then dry the solid between filter paper. Record the colour and texture.</p><p><b>Test for water.</b> Heat a few crystals of hydrated copper(II) sulfate gently in a dry test tube. Record the colour change, let it cool, then add two drops of water.</p><p class="safe">Safety: eye protection. Barium and copper compounds are harmful. Wash hands afterwards.</p>`,
null),
[["State whether each salt is soluble: (a) potassium carbonate (b) silver chloride (c) calcium sulfate (d) copper(II) nitrate.","(a) soluble (b) insoluble (c) insoluble (d) soluble (1 each, 4 marks)",4],
["Describe how to make a dry sample of silver chloride from silver nitrate solution.","Add sodium chloride (or another soluble chloride) solution (1). Filter (1). Wash the residue with distilled water (1). Dry in a warm oven or between filter paper (1).",4],
["Write the ionic equation for the formation of barium sulfate. (Extended)","Ba^2+^(aq) + SO~4~^2−^(aq) → BaSO~4~(s)  (formulae 1, state symbols 1)",2],
["What is meant by water of crystallisation?","Water molecules (1) that are chemically bonded within the crystal structure of a salt (1).",2],
["Describe the colour change when hydrated copper(II) sulfate is heated, and how this is used.","Blue to white (1). Adding water to the white solid turns it blue again, so it is a test for water (1).",2],
["Calculate x in MgSO~4~·xH~2~O if 2.46 g gives 1.20 g of anhydrous salt (M~r~ MgSO~4~ = 120). (Extended)","Water = 1.26 g, moles = 0.070 (1). MgSO~4~ moles = 0.010 (1). x = 7 (1).",3]],
[M("Which salt is insoluble in water?",["Sodium chloride","Barium sulfate","Potassium nitrate","Ammonium carbonate"],1,"Barium sulfate is an insoluble sulfate."),
M("Which pair of solutions gives a precipitate of lead(II) iodide?",["Lead(II) nitrate and potassium iodide","Sodium nitrate and potassium iodide","Lead(II) carbonate and water","Potassium nitrate and sodium chloride"],0,"Both are soluble and the ions combine to form insoluble PbI~2~."),
M("Why is a precipitate washed with distilled water?",["To dissolve it","To remove soluble impurities","To make it dry","To react it"],1,"Washing removes dissolved salts left on the solid."),
M("What colour is anhydrous copper(II) sulfate?",["Blue","Pink","White","Green"],2,"Anhydrous copper(II) sulfate is white."),
T("What is the term for a salt with no water of crystallisation?",["anhydrous"],"Anhydrous."),
N("What is the M~r~ of CuSO~4~·5H~2~O? (A~r~: Cu 64, S 32, O 16, H 1)",250,"",""),
M("Which ions are spectators when AgNO~3~ reacts with NaCl? (Extended)",["Ag^+^ and Cl^−^","Na^+^ and NO~3~^−^","Ag^+^ and Na^+^","Cl^−^ and NO~3~^−^"],1,"They do not take part in forming AgCl.")],
[["Which salts are always soluble?","Sodium, potassium and ammonium salts, and all nitrates."],
["Which chlorides are insoluble?","Silver and lead(II) chloride."],
["Which sulfates are insoluble?","Barium, calcium and lead(II) sulfate."],
["How is an insoluble salt made?","Precipitation: mix two soluble salts, filter, wash, dry."],
["What is a spectator ion?","An ion that stays in solution unchanged. It is left out of the ionic equation."],
["Water of crystallisation","Water molecules chemically bonded in a crystal."],
["Test for water","White anhydrous copper(II) sulfate turns blue, or blue cobalt(II) chloride turns pink."],
["Formula of hydrated copper(II) sulfate","CuSO~4~·5H~2~O (M~r~ 250)."]]));

/* ---------- Topic 8 lessons ---------- */
const D8=[];
D8.push(L("Arrangement and trends of the Periodic Table","How the elements are laid out, what groups and periods tell you, and how metallic character changes.",
`<h4>Groups and periods</h4>
<p>The Periodic Table arranges elements in order of increasing <b>proton (atomic) number</b>. Rows are <b>periods</b>. Columns are <b>groups</b>, numbered I to VII, then Group VIII (the noble gases) on the right. A block in the middle holds the transition elements.</p>
{{D_PT_WIDE}}
<div class="key"><b>Exam tip</b>Elements in the same group have similar chemical properties because they have the same number of outer electrons.</div>
<h4>Electrons decide the position</h4>
<p>The <b>group number</b> equals the number of outer-shell electrons (Groups I to VII). The <b>period number</b> equals the number of occupied electron shells.</p>
{{D_ELEC}}
<div class="ex"><b>Worked example</b>Sodium has configuration 2,8,1. Three shells means Period 3. One outer electron means Group I.<br>Chlorine is 2,8,7: Period 3, Group VII.</div>
<h4>Metals and non-metals</h4>
<p>Metals sit on the left and in the centre. Non-metals sit on the right. A zigzag line separates them.</p>
<table><tr><th>Property</th><th>Metals</th><th>Non-metals</th></tr>
<tr><td>Structure</td><td>Giant metallic lattice</td><td>Mostly simple molecules</td></tr>
<tr><td>Electrical conduction</td><td>Good</td><td>Poor (except graphite)</td></tr>
<tr><td>Oxides</td><td>Basic</td><td>Acidic</td></tr>
<tr><td>Ions formed</td><td>Positive</td><td>Negative</td></tr></table>
<h4>Trends across a period</h4>
<p>Moving from left to right across a period, the number of outer electrons rises by one each time. The elements change from <b>metallic to non-metallic</b>. The oxides change from basic to amphoteric to acidic. Sodium oxide is strongly basic, aluminium oxide is amphoteric, and sulfur dioxide is acidic.</p>
<h4>Using the table to predict</h4>
<p>Properties change gradually down a group, so an unknown element's behaviour can be estimated from its neighbours.</p>
<div class="ex"><b>Worked example</b>Rubidium lies below potassium in Group I. It should be a soft metal, more reactive than potassium, forming an ion Rb^+^.</div>
<h4>Identifying trends <i>(Extended only)</i></h4>
<p>You may be given data for a group or period and asked to describe the trend, then use it to predict a missing value. Look at the direction of change and whether it is steady. Quote numbers from the data, and say whether the trend is up or down as you move along the row or column.</p>
<div class="key"><b>Exam tip</b>An interpolated prediction should fall between the two neighbouring values. Check your answer lies in that range.</div>`,
I("What can the position of an element tell you without any other data?",
`<ol><li>Pick any element from Periods 2 to 4. Write its electron configuration.</li><li>From the configuration alone, state its group and period.</li><li>Predict whether its oxide is acidic or basic.</li><li>Check against the table. Where might your prediction fail?</li></ol>`,
`<p><b>Position from electrons.</b> Choose three elements. Work out the group and period from the configuration, then check on the Periodic Table.</p><p><b>Across Period 3.</b> List Na, Mg, Al, Si, P, S, Cl, Ar with the number of outer electrons. Describe the change in metallic character.</p><p><b>Predict a missing element.</b> Without looking up data, predict the properties of an element just below your choice.</p>`,
null),
[["State the difference between a group and a period.","A group is a vertical column (1), a period is a horizontal row (1).",2],
["Explain how the position of sulfur (2,8,6) in the Periodic Table can be deduced.","Three shells so Period 3 (1). Six outer electrons so Group VI (1).",2],
["Describe how the character of the oxides changes across Period 3.","From basic (1) through amphoteric (1) to acidic (1).",3],
["State why elements in the same group have similar chemical properties.","They have the same number of outer-shell electrons (1).",1],
["Predict two properties of rubidium. (Group I)","Soft, low melting point, reacts vigorously with water, forms +1 ion (any 2).",2]],
[M("What does the period number of an element show?",["Number of outer electrons","Number of occupied shells","Number of neutrons","Relative atomic mass"],1,"Period = number of shells."),
M("An element has configuration 2,8,3. It is in…",["Group III, Period 3","Group III, Period 2","Group II, Period 3","Group VIII, Period 3"],0,"Three shells, three outer electrons."),
M("Which oxide is amphoteric?",["Sodium oxide","Aluminium oxide","Sulfur dioxide","Carbon dioxide"],1,"Aluminium oxide is amphoteric."),
M("Moving across a period, elements become…",["More metallic","More non-metallic","Unchanged","Larger"],1,"Metallic character falls across a period."),
T("What is the group of elements called whose outer shell is full?",["noble gas","noble gases","group viii","group 0"],"Noble gases (Group VIII)."),
M("Elements in the Periodic Table are arranged by increasing…",["Mass number","Proton number","Neutron number","Density"],1,"Proton (atomic) number.")],
[["How is the Periodic Table ordered?","By increasing proton number."],
["Group number shows…","The number of outer-shell electrons."],
["Period number shows…","The number of occupied shells."],
["Metal oxides are…","Basic."],
["Non-metal oxides are…","Acidic."],
["Trend across a period","Metallic to non-metallic character."],
["Why same group, same properties?","Same number of outer electrons."],
["What separates metals from non-metals?","A zigzag line on the right."]]));

D8.push(L("Group I: the alkali metals","Properties, reactions with water and how reactivity changes down the group.",
`<h4>Properties of the alkali metals</h4>
<p>Group I contains lithium, sodium, potassium, rubidium, caesium and francium. They are called <b>alkali metals</b> because they react with water to form alkaline solutions.</p>
<ul><li>Soft: they can be cut with a knife.</li><li>Shiny when freshly cut, but tarnish quickly in air.</li><li>Low density: lithium, sodium and potassium float on water.</li><li>Low melting points compared with other metals.</li><li>Good conductors of heat and electricity.</li></ul>
{{D_GRP1}}
<div class="key"><b>Exam tip</b>Store alkali metals under oil to stop them reacting with air and moisture.</div>
<h4>Reaction with water</h4>
<p>All alkali metals react with water to give a <b>hydroxide</b> and <b>hydrogen</b>. The hydroxide dissolves to make an alkaline solution, so universal indicator turns purple.</p>
<div class="ex"><b>Worked example</b>2Na(s) + 2H~2~O(l) → 2NaOH(aq) + H~2~(g)<br>2K(s) + 2H~2~O(l) → 2KOH(aq) + H~2~(g)</div>
<table><tr><th>Metal</th><th>Observation</th></tr>
<tr><td>Lithium</td><td>Fizzes steadily, floats and moves slowly</td></tr>
<tr><td>Sodium</td><td>Fizzes quickly, melts into a ball and darts about</td></tr>
<tr><td>Potassium</td><td>Very fast, melts, hydrogen ignites with a lilac flame</td></tr></table>
<h4>Trends down the group</h4>
<table><tr><th>Property</th><th>Down Group I</th></tr>
<tr><td>Reactivity</td><td>Increases</td></tr>
<tr><td>Melting point</td><td>Decreases</td></tr>
<tr><td>Boiling point</td><td>Decreases</td></tr>
<tr><td>Hardness</td><td>Softer</td></tr>
<tr><td>Density</td><td>Generally increases (potassium is less dense than sodium)</td></tr></table>
<h4>Why reactivity increases</h4>
<p>Each alkali metal atom loses its single outer electron to form a +1 ion. Going down the group, the outer electron is in a shell <b>further from the nucleus</b>, and more inner shells <b>shield</b> it. The attraction is weaker, so the electron is lost more easily and the metal is more reactive.</p>
<div class="key"><b>Exam tip</b>Do not say the atoms “want” to lose an electron. Explain it by distance and shielding.</div>
<h4>Predicting properties</h4>
<div class="ex"><b>Worked example</b>Caesium is below potassium, so it should be softer, have a lower melting point, and react explosively with water to make CsOH and hydrogen.<br>Compounds of Group I metals are white solids that dissolve to give colourless solutions.</div>`,
I("Why does the reaction get more violent as you go down the group?",
`<ol><li>Write the word and symbol equations for potassium and water.</li><li>Rank lithium, sodium and potassium by reactivity from the observations.</li><li>Draw outer-shell diagrams of Li, Na and K.</li><li>Use shielding to explain the order.</li></ol>`,
`<p><b>Observe a demonstration.</b> Watch (do not do) the reactions of Li, Na and K with water. Record speed, flame colour and movement.</p><p><b>Test the solution.</b> Add universal indicator to the water after the reaction and note the colour.</p><p><b>Draw conclusions.</b> Write one sentence for each trend you saw and one for the explanation.</p><p class="safe">Safety: teacher demonstration only, behind a screen, with eye protection.</p>`,
null),
[["Describe two physical properties of sodium.","Soft, low density, low melting point, shiny when cut (any 2).",2],
["Write the equation for lithium reacting with water.","2Li + 2H~2~O → 2LiOH + H~2~ (formulae 1, balancing 1).",2],
["Describe what is seen when potassium is added to water.","Floats and fizzes (1), melts into a ball and moves quickly (1), hydrogen burns with a lilac flame (1).",3],
["Explain why potassium is more reactive than sodium.","Outer electron is further from the nucleus (1) and more shielded (1), so it is lost more easily (1).",3],
["Predict the formula and appearance of rubidium chloride.","RbCl (1), white solid that dissolves to give a colourless solution (1).",2]],
[M("Which gas is produced when sodium reacts with water?",["Oxygen","Hydrogen","Carbon dioxide","Chlorine"],1,"Hydrogen is released."),
M("What colour does universal indicator turn after Group I metals react with water?",["Red","Green","Purple","Orange"],2,"The solution is strongly alkaline."),
M("Which is the most reactive?",["Li","Na","K","Rb"],3,"Reactivity increases down the group."),
M("Why are alkali metals stored under oil?",["To keep them cold","To stop reaction with air and water","To make them softer","To increase density"],1,"They react quickly with oxygen and moisture."),
T("What is the charge on an alkali metal ion?",["1+","+1","1 +","plus one"],"+1."),
M("Going down Group I the melting point…",["Increases","Decreases","Stays the same","Is random"],1,"Melting points fall.")],
[["Why are Group I metals called alkali metals?","Their hydroxides are alkaline."],
["Products of Group I metal + water","Metal hydroxide and hydrogen."],
["Reactivity down Group I","Increases."],
["Melting point down Group I","Decreases."],
["Explain increasing reactivity","Outer electron further from nucleus and more shielded, so lost more easily."],
["Ion formed","+1."],
["Why stored under oil?","They react with air and moisture."],
["Flame colour of K burning with water","Lilac."]]));

D8.push(L("Group VII: the halogens","Halogen properties, trends down the group and displacement reactions.",
`<h4>Properties of the halogens</h4>
<p>Group VII contains fluorine, chlorine, bromine, iodine and astatine. They are <b>non-metals</b> made of <b>diatomic molecules</b> (F~2~, Cl~2~, Br~2~, I~2~). Each atom has seven outer electrons and gains one to form a −1 ion.</p>
{{D_HAL}}
<table><tr><th>Halogen</th><th>Colour</th><th>State at r.t.p.</th></tr>
<tr><td>Chlorine</td><td>Pale yellow-green</td><td>Gas</td></tr>
<tr><td>Bromine</td><td>Red-brown</td><td>Liquid</td></tr>
<tr><td>Iodine</td><td>Grey-black</td><td>Solid</td></tr></table>
<div class="key"><b>Exam tip</b>Halogens are poisonous. Chlorine and bromine vapours irritate the lungs, so experiments are done in a fume cupboard.</div>
<h4>Trends down the group</h4>
<ul><li><b>Colour</b> gets darker.</li><li><b>Melting and boiling points increase</b>, because larger molecules have stronger forces between them.</li><li><b>Density</b> increases.</li><li><b>Reactivity decreases</b>.</li></ul>
<h4>Why reactivity decreases</h4>
<p>A halogen atom reacts by <b>gaining</b> one electron. Going down the group, the incoming electron goes into a shell farther from the nucleus and is more shielded. The attraction is weaker, so the electron is gained less easily and the halogen is less reactive.</p>
<h4>Displacement reactions</h4>
<p>A more reactive halogen displaces a less reactive one from a solution of its salt.</p>
<table><tr><th></th><th>Potassium chloride</th><th>Potassium bromide</th><th>Potassium iodide</th></tr>
<tr><td>Chlorine</td><td>No reaction</td><td>Orange solution</td><td>Brown solution</td></tr>
<tr><td>Bromine</td><td>No reaction</td><td>No reaction</td><td>Brown solution</td></tr>
<tr><td>Iodine</td><td>No reaction</td><td>No reaction</td><td>No reaction</td></tr></table>
{{D_DISP_WIDE}}
<div class="ex"><b>Worked example</b>Cl~2~(aq) + 2KBr(aq) → 2KCl(aq) + Br~2~(aq)<br>Ionic: Cl~2~ + 2Br^−^ → 2Cl^−^ + Br~2~<br>Chlorine is more reactive than bromine, so it displaces it.</div>
<div class="key"><b>Exam tip</b>Name the colour of the solution formed, not the starting solution. Bromine in water is orange, iodine in water is brown.</div>
<h4>Predicting properties</h4>
<div class="ex"><b>Worked example</b>Astatine lies below iodine. Predict it is a dark solid with a high melting point, less reactive than iodine, and that it forms a −1 ion, At^−^.<br>Fluorine, above chlorine, is a pale yellow gas and the most reactive halogen.</div>`,
I("Can you put the halogens in order of reactivity using only displacement results?",
`<ol><li>Mix each halogen solution with each of the three halide solutions.</li><li>Record every colour change in a table.</li><li>Rank chlorine, bromine and iodine.</li><li>Predict whether fluorine would displace chlorine.</li></ol>`,
`<p><b>Set up the grid.</b> Put 1 cm depth of KCl, KBr and KI in separate tubes. Add a few drops of each halogen water.</p><p><b>Record.</b> Note any change from the original colour. Use a white background.</p><p><b>Interpret.</b> Write ionic equations for each reaction that happened.</p><p class="safe">Safety: use dilute solutions, eye protection and good ventilation. Bromine water is harmful.</p>`,
null),
[["State the colour and state of bromine at r.t.p.","Red-brown (1) liquid (1).",2],
["Explain why iodine has a higher melting point than chlorine.","Iodine molecules are larger (1) so the forces between them are stronger (1).",2],
["Chlorine water is added to potassium iodide. State the observation and write the equation.","Solution turns brown (1). Cl~2~ + 2KI → 2KCl + I~2~ (2).",3],
["Explain why bromine does not react with potassium chloride.","Bromine is less reactive than chlorine (1) so cannot displace it (1).",2],
["Explain why reactivity decreases down Group VII.","Outer shell is further from the nucleus (1) and more shielded (1), so electron is gained less easily (1).",3],
["Predict the state and colour of astatine.","Solid (1), black or dark (1).",2]],
[M("What is the formula of a bromine molecule?",["Br","Br~2~","Br^−^","Br~3~"],1,"Halogens are diatomic."),
M("Which halogen is a liquid at r.t.p.?",["Chlorine","Bromine","Iodine","Fluorine"],1,"Bromine."),
M("What happens when chlorine is bubbled into potassium bromide?",["Nothing","Solution turns orange","Solution turns purple","A white solid forms"],1,"Bromine is produced."),
M("Which halogen is the least reactive of Cl, Br, I?",["Cl","Br","I","All equal"],2,"Reactivity decreases down the group."),
T("What charge does a halide ion carry?",["1-","-1","−1","1−","minus one"],"−1."),
M("Going down Group VII the melting point…",["Decreases","Increases","Is constant","Falls then rises"],1,"Forces between larger molecules are stronger.")],
[["Halogen molecules","Diatomic: F~2~, Cl~2~, Br~2~, I~2~."],
["Colour of chlorine","Pale yellow-green gas."],
["Colour of iodine","Grey-black solid."],
["Reactivity down Group VII","Decreases."],
["Displacement rule","A more reactive halogen displaces a less reactive one."],
["Cl~2~ + KBr gives…","Orange bromine and KCl."],
["Melting point down group","Increases."],
["Halide ion charge","−1."]]));

D8.push(L("Noble gases and transition elements","Why the noble gases are unreactive and what makes transition elements special.",
`<h4>The noble gases</h4>
<p>Group VIII contains helium, neon, argon, krypton, xenon and radon. They are <b>colourless, monatomic gases</b>: each exists as single atoms.</p>
{{D_NOBLE}}
<table><tr><th>Gas</th><th>Electron configuration</th></tr>
<tr><td>Helium</td><td>2</td></tr><tr><td>Neon</td><td>2,8</td></tr><tr><td>Argon</td><td>2,8,8</td></tr><tr><td>Krypton</td><td>2,8,18,8</td></tr></table>
<h4>Why they are unreactive</h4>
<p>Each noble gas has a <b>full outer shell</b> (two electrons for helium, eight for the others). They do not need to gain, lose or share electrons, so they do not form bonds easily.</p>
<h4>Uses</h4>
<ul><li><b>Helium:</b> filling balloons and airships, because it is less dense than air and non-flammable.</li><li><b>Neon:</b> bright advertising signs.</li><li><b>Argon:</b> filling filament lamps and as an inert atmosphere for welding, so the hot metal does not oxidise.</li></ul>
<div class="key"><b>Exam tip</b>Use the words “inert” or “unreactive” and link it to the full outer shell.</div>
<h4>Transition elements</h4>
<p>The transition elements form the block between Group II and Group III. Examples are iron, copper, nickel, chromium, manganese and cobalt. They are typical metals.</p>
{{D_TRANS}}
<table><tr><th>Property</th><th>Transition elements</th><th>Group I metals</th></tr>
<tr><td>Density</td><td>High</td><td>Low</td></tr>
<tr><td>Melting point</td><td>High</td><td>Low</td></tr>
<tr><td>Hardness</td><td>Hard and strong</td><td>Soft</td></tr>
<tr><td>Reactivity</td><td>Low</td><td>Very high</td></tr></table>
<h4>Their special features</h4>
<ul><li>Their compounds are often <b>coloured</b>: copper(II) compounds are blue, iron(II) green and iron(III) orange-brown.</li><li>They and their compounds are good <b>catalysts</b>: iron in the Haber process, nickel in hydrogenation of fats.</li></ul>
<div class="ex"><b>Worked example</b>Iron(II) sulfate solution is pale green. Iron(III) chloride solution is yellow-brown. Copper(II) sulfate solution is blue.</div>
<h4>Variable oxidation states <i>(Extended only)</i></h4>
<p>Transition elements form ions with <b>different charges</b>. Iron forms Fe^2+^ and Fe^3+^, so there are two chlorides, FeCl~2~ and FeCl~3~. The charge is shown in the name with a Roman numeral: iron(II) chloride, iron(III) chloride.</p>
<div class="key"><b>Exam tip</b>Scandium and zinc are in the block but have only one common ion, so they are not true transition elements.</div>`,
I("Why do some elements form coloured compounds and others never react?",
`<ol><li>Describe the outer shells of helium, neon and argon.</li><li>Link that to why they are used in welding and lamps.</li><li>Compare the properties of iron and sodium.</li><li>Predict which one is a better catalyst and why.</li></ol>`,
`<p><b>Observe samples.</b> Look at solutions of copper(II) sulfate, iron(II) sulfate and iron(III) chloride and compare colours with sodium chloride solution.</p><p><b>Compare metals.</b> Compare a piece of iron and a piece of sodium (shown by teacher) for hardness and appearance.</p><p><b>Explain.</b> Write two sentences on why noble gases are inert and two on how transition elements differ from Group I.</p><p class="safe">Safety: eye protection. Do not touch the sodium.</p>`,
null),
[["State why noble gases are unreactive.","They have a full outer shell (1) so do not need to gain, lose or share electrons (1).",2],
["Give one use of argon and explain why it is suitable.","Filling light bulbs or welding (1), because it is unreactive (1).",2],
["Give two properties of transition elements that differ from Group I metals.","High density, high melting point, hard, form coloured compounds, catalysts, less reactive (any 2).",2],
["State the colour of copper(II) sulfate solution.","Blue.",1],
["Explain why there are two chlorides of iron. (Extended)","Iron forms ions with different charges (1): Fe^2+^ and Fe^3+^ (1).",2],
["Name an industrial catalyst containing a transition element.","Iron in the Haber process (or nickel in hydrogenation).",1]],
[M("Which noble gas is used to fill balloons?",["Helium","Neon","Argon","Krypton"],0,"Helium is less dense than air."),
M("How many electrons are in the outer shell of argon?",["2","6","8","18"],2,"Argon is 2,8,8."),
M("Noble gases exist as…",["Diatomic molecules","Monatomic atoms","Giant lattices","Ions"],1,"Single atoms."),
M("Which is a property of transition elements?",["Low melting point","Form coloured compounds","Very soft","Form 1+ ions only"],1,"Coloured compounds."),
T("What colour is iron(II) sulfate solution?",["green","pale green"],"Pale green."),
M("Which pair shows iron with two oxidation states? (Extended)",["FeCl~2~ and FeCl~3~","NaCl and KCl","CuO and CuS","MgO and MgCl~2~"],0,"Fe(II) and Fe(III).")],
[["Noble gas structure","Monatomic, full outer shell."],
["Why inert?","Full outer shell."],
["Use of helium","Balloons and airships."],
["Use of argon","Light bulbs and welding."],
["Transition element properties","High density and melting point, coloured compounds, catalysts."],
["Colour of copper(II) compounds","Blue."],
["Iron catalyst","Haber process."],
["Variable oxidation states (Extended)","Fe^2+^ and Fe^3+^."]]));

SETL(7,[D7[0],D7[1],D7[2],D7[3],D7[4]]);
SETL(8,[D8[0],D8[1],D8[2],D8[3]]);
