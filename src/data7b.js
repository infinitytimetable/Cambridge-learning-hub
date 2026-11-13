/* ===== Group B (chunk 1 of 4): figures for Topic 4 electrochemistry (own drawings) ===== */
var BLESS=BLESS||{};
(function(){
const FG=(w,h,inner,label,cap,mw)=>`<figure class="fig"${mw?` style="max-width:${mw}px"`:""}><svg viewBox="${typeof w==="string"?w:"0 0 "+w+" "+h}" role="img" aria-label="${label}">${inner}</svg><figcaption>${cap}</figcaption></figure>`;
const TX=(x,y,t,o)=>{o=o||{};return `<text x="${x}" y="${y}" font-size="${o.s||11.5}" text-anchor="${o.a||"middle"}"${o.b?' font-weight="700"':""}${o.i?' font-style="italic"':""} ${o.c?`style="fill:${o.c}"`:'fill="currentColor"'}>${t}</text>`};
const LN=(x,y,a,o)=>a.map((t,i)=>TX(x,y+i*14,t,o)).join("");
const DEFS='<defs><marker id="b_ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker><marker id="b_ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" style="fill:var(--bad)"/></marker><marker id="b_ag" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" style="fill:var(--accent)"/></marker></defs>';
const AR=(x1,y1,x2,y2,k)=>`<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke-width="1.8" ${k==="r"?'style="stroke:var(--bad)" marker-end="url(#b_ar)"':k==="g"?'style="stroke:var(--accent)" marker-end="url(#b_ag)"':'stroke="currentColor" marker-end="url(#b_ah)"'}/>`;
const BUB=(x,pts,r)=>pts.map(p=>`<circle cx="${x+p[0]}" cy="${p[1]}" r="${r||3.2}" fill="none" stroke="currentColor" stroke-width="1.2"/>`).join("");
const FLAME=(x,y)=>`<path d="M${x} ${y}q-14-10-6-24q4 8 8 2q4-14 14-18q-2 14 6 20q8 10-4 22q-8 6-18-2z" style="fill:#F2A93B"/><path d="M${x+8} ${y-2}q-6-6-3-14q4 6 7 0q3 8 5 10q0 6-9 4z" style="fill:#D9482B"/>`;

/* generic electrolysis cell. o: liq, lvl, heat, flow, ions, anFill, caFill, anDissolve, caCoat, bA, bC, depC, cloudA, anL, caL, liqL, an2, ca2 */
function CELL(o){
  let s=DEFS;const L=150,R=370,T=100,B=252,LV=o.lvl||138,ax=199,cx=309;
  s+=`<rect x="${L+1}" y="${LV}" width="${R-L-2}" height="${B-LV-1}" style="fill:${o.liq||"var(--accent)"}" fill-opacity="${o.lo||.18}"/>`;
  s+=`<path d="M${L} ${T}V${B-6}Q${L} ${B} ${L+6} ${B}H${R-6}Q${R} ${B} ${R} ${B-6}V${T}" fill="none" stroke="currentColor" stroke-width="2"/>`;
  if(o.heat)s+=FLAME(260,B+34);
  /* power supply */
  s+=`<path d="M${ax+6} 62V40H247M265 40H${cx+6}V62" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M247 28V52" stroke="currentColor" stroke-width="2"/><path d="M265 34V46" stroke="currentColor" stroke-width="5"/>`;
  s+=TX(247,22,"+",{b:1})+TX(265,22,"−",{b:1});
  if(o.flow)s+=AR(212,40,236,40,"r")+AR(276,40,300,40,"r")+TX(224,33,"e⁻",{c:"var(--bad)",b:1,s:11})+TX(288,33,"e⁻",{c:"var(--bad)",b:1,s:11});
  /* electrodes */
  const el=(x,fill,dis,coat)=>{let r="";
    if(coat)r+=`<rect x="${x-5}" y="150" width="22" height="46" rx="3" style="fill:${coat}"/>`;
    r+=`<rect x="${x}" y="62" width="12" height="138" rx="2" style="fill:${fill}"/>`;
    if(dis)r+=`<path d="M${x} 150l-3 6l3 6l-3 6l3 6l-3 6l3 6M${x+12} 154l3 6l-3 6l3 6l-3 6l3 6" fill="none" style="stroke:var(--bg)" stroke-width="2"/>`;
    return r};
  s+=el(ax,o.anFill||"#6B7A80",o.anDissolve,null)+el(cx,o.caFill||"#6B7A80",false,o.caCoat);
  s+=TX(ax-8,80,"anode (+)",{a:"end",b:1})+TX(cx+20,80,"cathode (−)",{a:"start",b:1});
  if(o.bA)s+=BUB(ax+6,[[-14,150],[-9,134],[-18,170],[17,146],[21,166],[-8,184],[15,182],[-18,196]]);
  if(o.bC)s+=BUB(cx+6,[[-14,150],[-20,168],[17,146],[22,166],[-10,184],[15,182],[-14,134],[24,134]]);
  if(o.depC)s+=`<path d="M${cx-4} 150q-4 7 0 12q-4 8 0 13M${cx+16} 156q4 7 0 12q4 8 0 12" fill="none" style="stroke:${o.depC}" stroke-width="5" stroke-linecap="round"/>`;
  if(o.cloudA)s+=[[ax-6,118,9],[ax-20,104,12],[ax+4,100,10],[ax-10,92,8]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="${p[2]}" style="fill:#8B4A1B" fill-opacity=".55"/>`).join("");
  if(o.blob)s+=`<ellipse cx="${cx+6}" cy="${B-8}" rx="22" ry="6" style="fill:#8E979B"/>`;
  if(o.ions){
    s+=AR(262,220,226,220,"g")+TX(262,215,"anions",{s:10,c:"var(--accent)",a:"start"});
    s+=AR(262,198,298,198,"g")+TX(262,193,"cations",{s:10,c:"var(--accent)",a:"start"});
  }
  if(o.liqL)s+=TX(260,B-4,o.liqL,{s:10.5,i:1});
  if(o.anL)s+=LN(L-8,150,o.anL,{a:"end",s:11});
  if(o.caL)s+=LN(R+8,150,o.caL,{a:"start",s:11});
  return s;
}
const VB=(h)=>h||300;
FIGS.B_CELL=()=>FG(520,300,CELL({flow:1,ions:1,liqL:"electrolyte",anL:["anions are attracted","to the anode and","lose electrons","(oxidation)"],caL:["cations are attracted","to the cathode and","gain electrons","(reduction)"]}),"A simple electrolysis cell","Electrolysis cell: electrons travel in the wires, ions travel in the liquid.","Electrolysis cell with two electrodes in an electrolyte, electrons moving in the wires and ions moving in the liquid",640);
FIGS.B_PBBR2=()=>FG(520,300,CELL({heat:1,liq:"#C98A2E",lo:.3,lvl:150,cloudA:1,blob:1,anL:["bromide ions lose","electrons: brown","bromine vapour","2Br⁻ → Br₂ + 2e⁻"],caL:["lead ions gain","electrons: molten","lead forms","Pb²⁺ + 2e⁻ → Pb"],liqL:"molten PbBr₂"}),"Electrolysis of molten lead(II) bromide","Molten lead(II) bromide with graphite electrodes: lead at the cathode, bromine at the anode.","Molten lead bromide electrolysis with graphite electrodes, brown bromine at the anode and molten lead collecting at the cathode",640);
FIGS.B_BRINE=()=>FG(520,300,CELL({bA:1,bC:1,liq:"#5DA9B5",liqL:"brine: NaCl(aq)",anL:["chlorine gas","2Cl⁻ → Cl₂ + 2e⁻","(bleaches damp","litmus paper)"],caL:["hydrogen gas","2H⁺ + 2e⁻ → H₂","(squeaky pop)","NaOH(aq) is left"]}),"Electrolysis of concentrated aqueous sodium chloride","Brine with inert electrodes: chlorine at the anode, hydrogen at the cathode, sodium hydroxide solution left behind.","Brine electrolysis with bubbles at both electrodes",640);
FIGS.B_CUSO4=()=>{
  const a=CELL({bA:1,depC:"#B87333",liq:"#3E7BD0",lo:.3,anL:["oxygen gas","4OH⁻ → O₂ + 2H₂O + 4e⁻"],caL:["copper deposits","Cu²⁺ + 2e⁻ → Cu"],liqL:"CuSO₄(aq)"});
  const b=CELL({anDissolve:1,caCoat:"#B87333",liq:"#3E7BD0",lo:.3,anL:["anode gets smaller","Cu → Cu²⁺ + 2e⁻"],caL:["cathode gets bigger","Cu²⁺ + 2e⁻ → Cu"],liqL:"CuSO₄(aq): blue stays",anFill:"#B87333",caFill:"#B87333"});
  return `<figure class="fig" style="max-width:640px"><svg viewBox="0 0 520 300" role="img" aria-label="Copper sulfate solution electrolysed with graphite electrodes: copper at the cathode and oxygen at the anode">${a}</svg><figcaption>Graphite electrodes: copper forms at the cathode and oxygen at the anode, so the blue colour fades.</figcaption></figure><figure class="fig" style="max-width:640px"><svg viewBox="0 0 520 300" role="img" aria-label="Copper sulfate solution electrolysed with copper electrodes: the anode dissolves and the cathode gains copper">${b}</svg><figcaption>Copper electrodes: the anode dissolves and the cathode grows by the same mass, so the colour does not change.</figcaption></figure>`;
};
FIGS.B_PLATE=()=>FG(520,300,CELL({flow:1,liq:"#7BA7C9",anFill:"#A8B0B4",caFill:"#6B7A80",caCoat:"#C9CED1",anDissolve:1,liqL:"tin(II) chloride solution",anL:["anode: pure tin","Sn → Sn²⁺ + 2e⁻","(the tin dissolves)"],caL:["cathode: the iron","object being plated","Sn²⁺ + 2e⁻ → Sn"]}),"Electroplating an iron object with tin","Electroplating: the object is the cathode, the plating metal is the anode, and the electrolyte contains ions of the plating metal.","Electroplating cell with the object as the cathode and pure plating metal as the anode",640);
FIGS.B_REFINE=()=>FG(520,300,CELL({flow:1,liq:"#3E7BD0",lo:.28,anFill:"#A9703A",caFill:"#B87333",caCoat:"#D58B49",anDissolve:1,liqL:"copper(II) sulfate solution",anL:["impure copper anode","Cu → Cu²⁺ + 2e⁻","impurities fall as sludge"],caL:["pure copper cathode","Cu²⁺ + 2e⁻ → Cu","pure copper builds up"]})+`<g style="fill:#5B4636"><circle cx="164" cy="246" r="3"/><circle cx="174" cy="242" r="2.5"/><circle cx="185" cy="247" r="3"/><circle cx="194" cy="243" r="2.4"/></g>`,"Purifying copper by electrolysis","Copper refining: impure copper dissolves from the anode, pure copper is deposited on the cathode.","Copper purification cell",640);
FIGS.B_HOFF=()=>{
  let s=DEFS;
  s+=`<rect x="131" y="114" width="38" height="134" style="fill:var(--accent)" fill-opacity=".22"/><rect x="291" y="168" width="38" height="80" style="fill:var(--accent)" fill-opacity=".22"/><rect x="170" y="230" width="120" height="18" style="fill:var(--accent)" fill-opacity=".22"/><rect x="216" y="100" width="28" height="130" style="fill:var(--accent)" fill-opacity=".22"/>`;
  s+=`<path d="M130 60V248H330V60M170 60V230H216V44M244 44V230H290V60" fill="none" stroke="currentColor" stroke-width="2"/><path d="M130 60H170M290 60H330" stroke="currentColor" stroke-width="2"/>`;
  s+=`<path d="M131 114H169M291 168H329" stroke="currentColor" stroke-dasharray="3 3"/>`;
  s+=`<rect x="146" y="196" width="8" height="48" style="fill:#6B7A80"/><rect x="306" y="196" width="8" height="48" style="fill:#6B7A80"/>`;
  s+=`<path d="M150 244V274H236M310 244V274H254" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M236 262V286" stroke="currentColor" stroke-width="2"/><path d="M254 268V280" stroke="currentColor" stroke-width="5"/>`;
  s+=TX(228,262,"+",{b:1})+TX(262,262,"−",{b:1});
  s+=TX(150,52,"anode (+)",{b:1,s:11})+TX(310,52,"cathode (−)",{b:1,s:11});
  s+=LN(120,92,["oxygen","(1 volume)"],{a:"end"})+LN(340,118,["hydrogen","(2 volumes)"],{a:"start"});
  s+=TX(230,30,"dilute H₂SO₄ is poured in here",{s:10.5,i:1});
  return FG(520,300,s,"Electrolysis of dilute sulfuric acid","Dilute sulfuric acid in a Hofmann voltameter: twice as much hydrogen as oxygen (2H₂O → 2H₂ + O₂).","Hofmann voltameter with twice as much hydrogen at the cathode as oxygen at the anode",560);
};
FIGS.B_FUEL=()=>{
  let s=DEFS;
  s+=`<rect x="120" y="70" width="40" height="150" rx="4" style="fill:#6B7A80"/><rect x="360" y="70" width="40" height="150" rx="4" style="fill:#6B7A80"/><rect x="160" y="70" width="200" height="150" style="fill:var(--accent)" fill-opacity=".18"/><path d="M160 70H360M160 220H360" stroke="currentColor" stroke-width="1.8"/>`;
  s+=TX(140,62,"electrode",{s:10.5})+TX(380,62,"electrode",{s:10.5})+TX(260,148,"electrolyte",{s:11,i:1});
  s+=AR(-24,140,118,140,"g")+TX(-24,126,"hydrogen in",{a:"start",b:1,s:11.5})+TX(-24,162,"H₂ → 2H⁺ + 2e⁻",{a:"start",s:10.5});
  s+=AR(440,140,402,140,"g");s+=`<path d="M440 140H402" stroke="none"/>`;
  s+=TX(404,126,"",{});
  s+=`<path d="M402 140H470" stroke="none"/>`;
  s+=TX(412,112,"air (oxygen) in",{a:"start",b:1,s:11.5})+TX(412,184,"O₂ + 4H⁺ + 4e⁻ → 2H₂O",{a:"start",s:10.5});
  s+=AR(380,232,380,262,"g")+TX(392,252,"water out",{a:"start",b:1,s:11.5});
  /* external circuit */
  s+=`<path d="M140 70V28H380V70" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="260" cy="28" r="13" fill="var(--bg)" stroke="currentColor" stroke-width="1.8"/><path d="M254 34l12-12M254 22l12 12" stroke="none"/><path d="M255 33l5-12l5 12" fill="none" stroke="currentColor"/>`;
  s+=AR(170,28,226,28,"r")+TX(198,18,"e⁻",{c:"var(--bad)",b:1})+TX(260,6,"electric current to the motor",{s:10.5});
  return FG("-30 0 580 290",0,s,"Hydrogen–oxygen fuel cell","Hydrogen–oxygen fuel cell: electrons flow through the external circuit, and the only chemical product is water.","Fuel cell with hydrogen entering one electrode, air entering the other, electrons flowing through an external circuit and water leaving",600);
};
FIGS.B_ALCELL=()=>{
  let s=`<path d="M110 90V250H410V90" fill="none" stroke="currentColor" stroke-width="3"/>`;
  s+=`<rect x="112" y="116" width="296" height="120" style="fill:#C98A2E" fill-opacity=".28"/><rect x="112" y="226" width="296" height="22" style="fill:#8E979B" fill-opacity=".8"/>`;
  s+=[170,240,310].map(x=>`<rect x="${x}" y="40" width="22" height="130" style="fill:#4A5256"/>`).join("");
  s+=`<path d="M181 40V20H321V40" fill="none" stroke="currentColor" stroke-width="2"/>`;
  s+=TX(260,12,"+ to power supply",{s:10.5});
  s+=LN(420,150,["molten aluminium oxide","dissolved in molten","cryolite (about 900 °C)"],{a:"start",s:10.5});
  s+=LN(420,236,["molten aluminium","collects at the bottom","and is tapped off"],{a:"start",s:10.5});
  s+=LN(100,150,["graphite anodes","(+) burn away","as O₂ forms CO₂"],{a:"end",s:10.5});
  s+=LN(100,214,["steel tank lined with","graphite is the cathode (−)"],{a:"end",s:10.5});
  return FG("-80 0 640 270",0,s,"Extraction of aluminium","Aluminium extraction: graphite anodes, a graphite-lined cathode, and a molten mixture of aluminium oxide and cryolite.","Aluminium electrolysis cell",640);
};
})();

/* ===== chunk 2: figures for Topic 5 (energetics) and Topic 12 (ion and gas tests) ===== */
(function(){
const FG=(w,h,inner,label,cap,mw)=>`<figure class="fig"${mw?` style="max-width:${mw}px"`:""}><svg viewBox="${typeof w==="string"?w:"0 0 "+w+" "+h}" role="img" aria-label="${label}">${inner}</svg><figcaption>${cap}</figcaption></figure>`;
const TX=(x,y,t,o)=>{o=o||{};return `<text x="${x}" y="${y}" font-size="${o.s||11.5}" text-anchor="${o.a||"middle"}"${o.b?' font-weight="700"':""}${o.i?' font-style="italic"':""} ${o.c?`style="fill:${o.c}"`:'fill="currentColor"'}>${t}</text>`};
const LN=(x,y,a,o)=>a.map((t,i)=>TX(x,y+i*14,t,o)).join("");
const DEFS='<defs><marker id="b_ah2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker><marker id="b_ar2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" style="fill:var(--bad)"/></marker><marker id="b_ag2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" style="fill:var(--accent)"/></marker></defs>';
const AR=(x1,y1,x2,y2,k,w)=>`<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke-width="${w||2}" ${k==="r"?'style="stroke:var(--bad)" marker-end="url(#b_ar2)"':k==="g"?'style="stroke:var(--accent)" marker-end="url(#b_ag2)"':'stroke="currentColor" marker-end="url(#b_ah2)"'}/>`;

/* system and surroundings */
FIGS.B_SYS=()=>{
  const pan=(x,exo)=>{let s=`<rect x="${x}" y="14" width="250" height="150" rx="10" fill="none" stroke="currentColor" stroke-opacity=".4"/>`;
    s+=`<circle cx="${x+125}" cy="86" r="46" style="fill:${exo?"var(--bad)":"var(--accent)"}" fill-opacity=".2" stroke="currentColor"/>`;
    s+=TX(x+125,82,"the system",{b:1})+TX(x+125,97,"(reacting chemicals)",{s:10});
    if(exo){s+=AR(x+170,70,x+226,40,"r",2.4)+AR(x+172,86,x+236,86,"r",2.4)+AR(x+170,102,x+226,132,"r",2.4);s+=TX(x+125,30,"surroundings get hotter",{s:11,b:1,c:"var(--bad)"})}
    else{s+=AR(x+226,40,x+170,70,"g",2.4)+AR(x+236,86,x+172,86,"g",2.4)+AR(x+226,132,x+170,102,"g",2.4);s+=TX(x+125,30,"surroundings get colder",{s:11,b:1,c:"var(--accent)"})}
    s+=TX(x+125,158,exo?"energy flows out of the system":"energy flows into the system",{s:11,i:1});return s};
  return FG(540,182,DEFS+pan(4,true)+pan(286,false),"Energy flow in exothermic and endothermic reactions","Exothermic (left): energy flows out of the system, ΔH is negative. Endothermic (right): energy flows in, ΔH is positive.","Two panels: an exothermic reaction transferring heat out to the surroundings and an endothermic reaction absorbing heat from the surroundings",720);
};
/* reaction pathway diagrams with Ea and dH, optional catalyst curve */
function PATH(exo,cat){
  const ry=exo?92:150,py=exo?150:92,pk=26,cp=cat?58:pk;
  let s=DEFS+`<path d="M52 14V186H350" fill="none" stroke="currentColor" stroke-width="1.6"/>`+TX(16,100,"Energy",{s:11}).replace('<text','<text transform="rotate(-90 16 100)"');
  s+=TX(200,206,"Progress of reaction",{s:11});
  s+=`<path d="M60 ${ry}H118C150 ${ry} 150 ${pk} 190 ${pk}S232 ${py} 262 ${py}H336" fill="none" style="stroke:var(--accent)" stroke-width="3"/>`;
  if(cat)s+=`<path d="M118 ${ry}C146 ${ry} 150 ${cp} 190 ${cp}S234 ${py} 262 ${py}" fill="none" style="stroke:var(--bad)" stroke-width="2.4" stroke-dasharray="6 4"/>`;
  s+=TX(62,ry-8,"reactants",{a:"start"})+TX(262,exo?py+18:py-8,"products",{a:"start"});
  s+=`<path d="M190 ${ry}V${pk+4}" stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#b_ah2)"/>`+TX(184,ry-8,"Eₐ",{a:"end",b:1,s:13});
  const my=(ry+py)/2;
  s+=`<path d="M300 ${ry}V${py+(py>ry?-4:4)}" stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#b_ah2)"/>`;
  s+=`<path d="M290 ${ry}H336" stroke="currentColor" stroke-dasharray="3 3" stroke-opacity=".6"/>`+TX(310,my+4,"ΔH",{a:"start",b:1,s:13})+TX(310,my+18,exo?"(negative)":"(positive)",{a:"start",s:10.5});
  if(cat)s+=TX(222,cp-4,"with catalyst: lower Eₐ",{a:"start",s:10.5,c:"var(--bad)"});
  return s;
}
FIGS.B_PEXO=()=>FG(420,214,PATH(true,false),"Reaction pathway diagram for an exothermic reaction","Exothermic: the products are lower in energy than the reactants, so ΔH is negative.","Reaction pathway diagram with products lower than reactants, activation energy and enthalpy change labelled",460);
FIGS.B_PENDO=()=>FG(420,214,PATH(false,false),"Reaction pathway diagram for an endothermic reaction","Endothermic: the products are higher in energy than the reactants, so ΔH is positive.","Reaction pathway diagram with products higher than reactants",460);
FIGS.B_PCAT=()=>FG(420,214,PATH(true,true),"Reaction pathway with and without a catalyst","A catalyst gives a different pathway with a lower activation energy. ΔH does not change.","Reaction pathway with a lower dashed catalysed curve",460);
/* bond energy bars: H2 + Cl2 -> 2HCl */
FIGS.B_BONDS=()=>{
  const k=0.17;let s=DEFS+`<path d="M44 20V190H360" fill="none" stroke="currentColor" stroke-width="1.5"/>`;
  s+=`<rect x="70" y="${190-678*k}" width="80" height="${678*k}" style="fill:var(--bad)" fill-opacity=".6"/><rect x="230" y="${190-862*k}" width="80" height="${862*k}" style="fill:var(--accent)" fill-opacity=".6"/>`;
  s+=TX(110,190-678*k-6,"678 kJ in",{b:1})+TX(270,190-862*k-6,"862 kJ out",{b:1});
  s+=TX(110,206,"break H–H and Cl–Cl",{s:10.5})+TX(270,206,"make 2 × H–Cl",{s:10.5});
  s+=AR(170,190-678*k,170,190-862*k+4,"g",2.2)+TX(176,190-762*k+4,"ΔH =",{a:"start",s:11,b:1})+TX(176,190-762*k+18,"−184 kJ",{a:"start",s:11,b:1});
  return FG(380,216,s,"Bond energies for hydrogen reacting with chlorine","Energy in (breaking bonds) is less than energy out (making bonds), so ΔH is negative.","Two bars comparing the energy needed to break bonds with the energy released when bonds form",460);
};
})();

/* ===== chunk 3: Topic 4 lessons ===== */
(function(){
BLESS.L41=L("Electrolysis: principles and molten compounds","What electrolysis is, how ions move to the electrodes, and how to predict the products from molten ionic compounds.",
`<h4>What is electrolysis?</h4>
<p><b>Electrolysis</b> is the breaking down of an ionic compound, either <b>molten</b> or <b>dissolved in water</b>, by passing an electric current through it. Electrical energy forces a chemical change that would not happen on its own.</p>
<p>The key words are:</p>
<table><tr><th>Term</th><th>Meaning</th></tr><tr><td>Electrolyte</td><td>The ionic liquid or solution that is split up. It conducts because its ions are free to move.</td></tr><tr><td>Electrode</td><td>A solid conductor, usually graphite or metal, that carries current in and out of the electrolyte.</td></tr><tr><td>Anode</td><td>The <b>positive</b> electrode.</td></tr><tr><td>Cathode</td><td>The <b>negative</b> electrode.</td></tr><tr><td>Inert electrode</td><td>One that does not take part in the reaction, such as graphite or platinum.</td></tr></table>
<div class="key"><b>Exam tip</b>Ionic solids do not conduct because their ions are locked in the lattice. They only conduct once molten or dissolved, when the ions can move.</div>
<p><b>Where the ions go</b></p>
<p>Opposite charges attract. <b>Positive ions (cations)</b> are pulled to the negative cathode. <b>Negative ions (anions)</b> are pulled to the positive anode. Electrons carry the current in the wires, but <b>ions carry the current in the liquid</b>.</p>
{{B_CELL}}
<p>A useful memory aid is <b>PANIC</b>: <b>P</b>ositive is the <b>A</b>node, <b>N</b>egative <b>I</b>s the <b>C</b>athode.</p>
<h4>What happens at each electrode</h4>
<p>At the cathode, cations <b>gain electrons</b> (reduction). At the anode, anions <b>lose electrons</b> (oxidation). The ions become uncharged atoms or molecules and are <b>discharged</b>.</p>
<p>This links to the redox rules: <b>OIL RIG</b>, oxidation is loss of electrons and reduction is gain.</p>
<div class="ex"><b>Worked example</b>Molten lead(II) bromide, PbBr~2~, contains Pb^2+^ and Br^-^ ions.<br>Cathode: Pb^2+^ + 2e^-^ → Pb (lead metal forms, a reduction).<br>Anode: 2Br^-^ → Br~2~ + 2e^-^ (red-brown bromine vapour, an oxidation).</div>
<p><b>Predicting products from a molten compound</b></p>
<p>A molten binary compound (two elements only) always splits into its <b>two elements</b>. The <b>metal forms at the cathode</b> and the <b>non-metal at the anode</b>.</p>
{{B_PBBR2}}
<table><tr><th>Molten compound</th><th>Cathode product</th><th>Anode product</th></tr><tr><td>Lead(II) bromide</td><td>Lead</td><td>Bromine</td></tr><tr><td>Sodium chloride</td><td>Sodium</td><td>Chlorine</td></tr><tr><td>Zinc chloride</td><td>Zinc</td><td>Chlorine</td></tr><tr><td>Potassium iodide</td><td>Potassium</td><td>Iodine</td></tr></table>
<h4>Half-equations <i>(Extended only)</i></h4>
<p>A <b>half-equation</b> shows what happens at one electrode. It must balance for <b>atoms and charge</b>. The electrons appear on the left for the cathode and on the right for the anode.</p>
<ul><li>Cathode: Na^+^ + e^-^ → Na</li><li>Cathode: Al^3+^ + 3e^-^ → Al</li><li>Anode: 2Cl^-^ → Cl~2~ + 2e^-^</li><li>Anode: 2O^2-^ → O~2~ + 4e^-^</li></ul>
<div class="ex"><b>Worked example</b>Write the half-equation for chloride ions at the anode. Chloride gives Cl atoms, but chlorine is diatomic, so two ions are needed: 2Cl^-^ → Cl~2~. The charge on the left is 2−, so two electrons must appear on the right: 2Cl^-^ → Cl~2~ + 2e^-^. Both atoms and charge now balance.</div>
<div class="key"><b>Exam tip</b>Anions need a coefficient that gives a diatomic molecule. Check charge as well as atoms: total charge on both sides must match.</div>`,
I("Which ion goes to which electrode, and can we predict what we will see?",
`<p>Work in pairs with the electrolysis figure and a data card for each molten compound.</p><ol><li>For molten zinc chloride, list the ions present and say which will move to the cathode and which to the anode.</li><li>Predict the product at each electrode and write the observation you would expect.</li><li>Repeat for molten potassium iodide and molten lead(II) bromide.</li><li>Look for a pattern that lets you predict the products of any molten binary compound.</li></ol>`,
`<p><b>Demonstration.</b> Your teacher heats lead(II) bromide in a crucible with two graphite rods and a power supply in a fume cupboard. Watch for the molten state, the brown fumes and the silvery bead. Record what you see at each rod.</p><p><b>Sort it.</b> Check your predictions against the demonstration. Explain why the solid did not conduct but the molten liquid did.</p><p><b>Pattern.</b> Write one rule for molten binary compounds that covers every case you did, then test it on molten sodium chloride.</p>`,
null),
[["Define electrolysis.","The breaking down of an ionic compound (1) when molten or in solution, using electricity (1).",2],
["Explain why solid sodium chloride does not conduct but molten sodium chloride does.","In the solid the ions are held in fixed positions (1). When molten the ions are free to move (1) and carry the charge (1).",3],
["Molten lead(II) bromide is electrolysed using graphite electrodes. State the products at the anode and at the cathode.","Anode: bromine (1). Cathode: lead (1).",2],
["Explain why lead forms at the cathode.","Lead ions are positive (1) so they are attracted to the negative cathode (1) where they gain electrons (1).",3],
["Write the half-equation for the reaction at the cathode when molten sodium chloride is electrolysed. (Extended)","Na^+^ + e^-^ → Na (1 for formulae, 1 for balanced charge using the electron).",2],
["Write the half-equation for the anode reaction in the electrolysis of molten zinc chloride. (Extended)","2Cl^-^ → Cl~2~ + 2e^-^ (1 for species, 1 for balancing).",2]],
[M("Which electrode is the cathode?",["The positive electrode","The negative electrode","The one made of graphite","The one that gives off gas"],1,"The cathode is negative. Positive ions are attracted to it."),
M("What is formed at the anode when molten potassium bromide is electrolysed?",["Potassium","Hydrogen","Bromine","Oxygen"],2,"Bromide ions lose electrons at the anode to make bromine."),
M("Why can molten ionic compounds conduct electricity?",["They contain free electrons","Their ions can move","Their atoms are bonded covalently","They are metals"],1,"Ions are free to move in the liquid and carry the charge."),
T("What word describes the ionic liquid that is broken down in electrolysis?",["electrolyte"],"The electrolyte is the molten or dissolved compound."),
M("Which half-equation is correct for the anode in molten magnesium chloride? (Extended)",["Mg^2+^ + 2e^-^ → Mg","2Cl^-^ → Cl~2~ + 2e^-^","Cl~2~ + 2e^-^ → 2Cl^-^","Mg → Mg^2+^ + 2e^-^"],1,"Chloride ions lose electrons at the anode."),
M("Which process happens at the cathode?",["Oxidation","Reduction","Neutralisation","Evaporation"],1,"Cations gain electrons at the cathode, which is reduction."),
N("How many electrons appear in the half-equation for Al^3+^ forming aluminium? (Extended)",3,"","Al^3+^ + 3e^-^ → Al"),],
[["Electrolysis","Breaking down an ionic compound, molten or dissolved, using electricity."],
["Electrolyte","The molten or dissolved ionic compound that conducts by moving ions."],
["Anode and cathode","Anode is positive. Cathode is negative. Remember PANIC."],
["Where do cations go?","To the negative cathode, where they gain electrons."],
["Where do anions go?","To the positive anode, where they lose electrons."],
["Products of molten binary compounds","The metal at the cathode and the non-metal at the anode."],
["Cathode half-equation example (Extended)","Pb^2+^ + 2e^-^ → Pb"],
["Anode half-equation example (Extended)","2Br^-^ → Br~2~ + 2e^-^"]]);

BLESS.L42=L("Electrolysis of aqueous solutions","Predicting products when the electrolyte is dissolved in water, including brine, copper(II) sulfate and the Hofmann voltameter.",
`<h4>Why water changes things</h4>
<p>An aqueous solution contains the ions of the dissolved compound <b>and</b> ions from water: <b>H^+^</b> and <b>OH^-^</b>. At each electrode there are now two possible ions. Only <b>one</b> of them is discharged.</p>
<p><b>Rules for the cathode</b></p>
<p>The ion that is less reactive is the one that gets discharged. Compare the metal with hydrogen in the reactivity series.</p>
<ul><li>If the metal is <b>less reactive than hydrogen</b> (for example copper, silver), the <b>metal</b> forms.</li><li>If the metal is <b>more reactive than hydrogen</b> (for example sodium, potassium, calcium), <b>hydrogen gas</b> forms.</li></ul>
<h4>Rules for the anode</h4>
<ul><li>If the solution contains a <b>halide</b> (Cl^-^, Br^-^, I^-^) in reasonable concentration, the <b>halogen</b> forms.</li><li>Otherwise, <b>hydroxide ions</b> are discharged and <b>oxygen</b> forms. This is the case for sulfate, nitrate and very dilute halide solutions.</li></ul>
<table><tr><th>Electrolyte</th><th>Cathode</th><th>Anode</th></tr><tr><td>Concentrated NaCl</td><td>H~2~</td><td>Cl~2~</td></tr><tr><td>Dilute H~2~SO~4~</td><td>H~2~</td><td>O~2~</td></tr><tr><td>CuSO~4~ (graphite)</td><td>Cu</td><td>O~2~</td></tr><tr><td>NaOH solution</td><td>H~2~</td><td>O~2~</td></tr></table>
<div class="key"><b>Exam tip</b>Always list the ions that are present, including H^+^ and OH^-^, then choose using the rules. Naming only the dissolved ions loses marks.</div>
<h4>Concentrated sodium chloride (brine)</h4>
<p>Brine contains Na^+^, Cl^-^, H^+^ and OH^-^. Sodium is more reactive than hydrogen, so <b>H~2~</b> forms at the cathode. Chloride is a halide, so <b>Cl~2~</b> forms at the anode. The ions left behind are Na^+^ and OH^-^, so the solution becomes <b>sodium hydroxide</b>.</p>
{{B_BRINE}}
<div class="ex"><b>Worked example</b>Name the three products of electrolysing concentrated sodium chloride solution. Hydrogen (cathode), chlorine (anode) and sodium hydroxide (stays in solution). These are all important industrial chemicals.</div>
<h4>Water: dilute sulfuric acid and the Hofmann voltameter</h4>
<p>In dilute sulfuric acid, the ions are H^+^, OH^-^ and SO~4~^2-^. Hydrogen forms at the cathode. Sulfate is not discharged, so OH^-^ ions give <b>oxygen</b> at the anode. The acid is not used up: <b>water is being split</b>, and the solution gets more concentrated.</p>
{{B_HOFF}}
<p>The volume of hydrogen is <b>twice</b> the volume of oxygen, matching the formula H~2~O. Test the gases: hydrogen gives a squeaky pop with a lit splint and oxygen relights a glowing splint.</p>
<div class="ex"><b>Worked example</b>If 15 cm³ of oxygen collects at the anode, the volume of hydrogen at the cathode is 15 × 2 = <b>30 cm³</b>.</div>
<h4>Copper(II) sulfate solution</h4>
<p>The ions are Cu^2+^, H^+^, SO~4~^2-^ and OH^-^. With <b>graphite electrodes</b>, copper forms at the cathode because it is less reactive than hydrogen, and oxygen forms at the anode. The blue colour fades as Cu^2+^ ions are used up.</p>
<p>With <b>copper electrodes</b>, the anode itself dissolves: Cu → Cu^2+^ + 2e^-^. Copper is deposited on the cathode, and the solution stays blue because the number of Cu^2+^ ions does not change.</p>
{{B_CUSO4}}
<h4>Half-equations in solution <i>(Extended only)</i></h4>
<ul><li>Hydrogen: 2H^+^ + 2e^-^ → H~2~</li><li>Copper: Cu^2+^ + 2e^-^ → Cu</li><li>Chlorine: 2Cl^-^ → Cl~2~ + 2e^-^</li><li>Oxygen: 4OH^-^ → 2H~2~O + O~2~ + 4e^-^</li></ul>
<div class="key"><b>Exam tip</b>The oxygen half-equation has four electrons. Check that the charge is 4− on both sides and the atoms balance.</div>`,
I("Can we predict the products of electrolysing any aqueous solution?",
`<p>Use the rules and results tables. Work in pairs.</p><ol><li>List every ion in dilute potassium iodide solution, including those from water.</li><li>Use the rules to predict the cathode and anode products and say what you would see.</li><li>Repeat for copper(II) chloride solution and dilute sodium sulfate solution.</li><li>Check your predictions against the class results table.</li></ol>`,
`<p><b>Test tube electrolysis.</b> Set up small cells with graphite electrodes and a low voltage supply. Record bubbles, colours and deposits at each electrode. Test gases with damp indicator paper, a lit splint and a glowing splint.</p><p><b>Colour change.</b> Add universal indicator to brine and watch the cathode. Explain the purple colour using the ions left in solution.</p><p><b>Reflect.</b> For each solution, state which ion at each electrode was discharged and why the other ion was not.</p>`,
null),
[["Name the ions present in dilute sulfuric acid.","H^+^ (1), OH^-^ (1), SO~4~^2-^ (1).",3],
["State the products at each electrode when concentrated sodium chloride solution is electrolysed.","Cathode: hydrogen (1). Anode: chlorine (1).",2],
["Explain why hydrogen, not sodium, forms at the cathode in the electrolysis of sodium chloride solution.","Sodium is more reactive than hydrogen (1) so H^+^ ions are discharged in preference to Na^+^ (1).",2],
["Copper(II) sulfate solution is electrolysed with copper electrodes. Describe what happens at each electrode and explain why the colour of the solution does not change.","Anode loses mass as copper dissolves (1). Cathode gains copper (1). Cu^2+^ ions removed at the cathode are replaced from the anode (1) so the blue colour stays (1).",4],
["In an electrolysis of dilute sulfuric acid, 36 cm³ of oxygen was collected. Calculate the volume of hydrogen collected.","36 × 2 (1) = 72 cm³ (1).",2],
["Write the half-equation for the formation of oxygen at the anode in aqueous solutions. (Extended)","4OH^-^ → 2H~2~O + O~2~ + 4e^-^ (1 species, 1 balancing).",2]],
[M("Which product forms at the cathode in aqueous copper(II) sulfate with graphite electrodes?",["Hydrogen","Oxygen","Copper","Sulfur"],2,"Copper is less reactive than hydrogen so it is discharged."),
M("What remains in solution after electrolysis of concentrated sodium chloride?",["Sodium hydroxide","Hydrochloric acid","Sodium metal","Water only"],0,"Na^+^ and OH^-^ are left, so the solution is sodium hydroxide."),
N("In a Hofmann voltameter 20 cm³ of oxygen collects at the anode. What volume of hydrogen collects at the cathode in cm³?",40,"cm³","Hydrogen is twice the volume of oxygen."),
M("Which gas forms at the anode when dilute sodium sulfate is electrolysed?",["Chlorine","Hydrogen","Oxygen","Sulfur dioxide"],2,"Hydroxide is discharged. Sulfate is not."),
T("Name the gas given off at the cathode when sodium hydroxide solution is electrolysed.",["hydrogen"],"Sodium is more reactive than hydrogen."),
M("Which change happens at a copper anode in copper(II) sulfate solution?",["Copper is deposited","Copper dissolves","Oxygen is made","Hydrogen is made"],1,"The anode dissolves: Cu → Cu^2+^ + 2e^-^."),
M("Which half-equation shows hydrogen forming at the cathode? (Extended)",["2H^+^ + 2e^-^ → H~2~","H~2~ → 2H^+^ + 2e^-^","4OH^-^ → O~2~ + 2H~2~O + 4e^-^","2Cl^-^ → Cl~2~ + 2e^-^"],0,"Hydrogen ions gain electrons.")],
[["Ions in any aqueous electrolyte","The dissolved ions plus H^+^ and OH^-^ from water."],
["Cathode rule","Metal if it is less reactive than hydrogen. Otherwise hydrogen."],
["Anode rule","Halogen if a halide is present. Otherwise oxygen."],
["Products of concentrated brine","Hydrogen, chlorine and sodium hydroxide solution."],
["Products of dilute sulfuric acid","Hydrogen at the cathode, oxygen at the anode. Ratio 2:1 by volume."],
["Copper electrodes in CuSO~4~","Anode dissolves and cathode grows. Blue colour stays."],
["Hydrogen at the cathode (Extended)","2H^+^ + 2e^-^ → H~2~"],
["Oxygen at the anode (Extended)","4OH^-^ → 2H~2~O + O~2~ + 4e^-^"]]);
})();

/* ===== chunk 4: Topic 4 lessons (applications, fuel cells) ===== */
(function(){
BLESS.L43=L("Applications of electrolysis","Electroplating, refining copper, extracting aluminium and the industrial uses of brine electrolysis.",
`<h4>Electroplating</h4>
<p><b>Electroplating</b> coats an object with a thin layer of metal using electrolysis. The set-up follows three rules:</p>
<ul><li>The object to be plated is the <b>cathode</b> (negative).</li><li>The anode is a bar of the <b>plating metal</b>.</li><li>The electrolyte contains <b>ions of the plating metal</b>.</li></ul>
{{B_PLATE}}
<p>At the anode, the metal dissolves into ions. At the cathode, the ions gain electrons and coat the object. The concentration of the electrolyte stays the same.</p>
<div class="ex"><b>Worked example</b>To silver-plate a spoon: spoon = cathode, silver bar = anode, electrolyte = silver nitrate solution. Cathode: Ag^+^ + e^-^ → Ag. Anode: Ag → Ag^+^ + e^-^.</div>
<p><b>Why we plate objects</b></p>
<ul><li><b>Protection:</b> a layer of chromium or zinc stops iron rusting.</li><li><b>Appearance:</b> silver or gold plate gives a shiny, attractive finish to cheaper metals.</li><li><b>Saving money:</b> only a thin layer of an expensive metal is needed.</li></ul>
<h4>Refining copper</h4>
<p>Copper must be very pure to be a good electrical conductor, so impure copper from smelting is refined by electrolysis.</p>
{{B_REFINE}}
<table><tr><th>Part</th><th>Material</th><th>Change</th></tr><tr><td>Anode</td><td>Impure copper</td><td>Dissolves: Cu → Cu^2+^ + 2e^-^</td></tr><tr><td>Cathode</td><td>Pure copper</td><td>Grows: Cu^2+^ + 2e^-^ → Cu</td></tr><tr><td>Electrolyte</td><td>Copper(II) sulfate</td><td>Stays blue</td></tr></table>
<p>Impurities fall to the bottom as a <b>sludge</b>, which often contains valuable metals such as silver and gold.</p>
<h4>Extracting aluminium</h4>
<p>Aluminium is more reactive than carbon, so it cannot be reduced with carbon. It is extracted by electrolysis of <b>aluminium oxide</b> from the ore <b>bauxite</b>.</p>
<ul><li>Aluminium oxide has a very high melting point (over 2000 °C), so it is <b>dissolved in molten cryolite</b>. This lowers the temperature needed to about <b>950 °C</b> and saves energy.</li><li>Both electrodes are <b>graphite</b>.</li><li>Cathode: Al^3+^ + 3e^-^ → Al. Molten aluminium sinks and is tapped off.</li><li>Anode: 2O^2-^ → O~2~ + 4e^-^. The oxygen reacts with the hot graphite to make carbon dioxide, so the <b>anodes burn away</b> and must be replaced.</li></ul>
{{B_ALCELL}}
<div class="key"><b>Exam tip</b>Aluminium is not extracted with carbon because it is more reactive than carbon. Always state that the oxide is dissolved in cryolite to lower the melting temperature and reduce energy costs.</div>
<p><b>Products of brine electrolysis and their uses</b></p>
<table><tr><th>Product</th><th>Uses</th></tr><tr><td>Hydrogen</td><td>Making ammonia, margarine; fuel</td></tr><tr><td>Chlorine</td><td>Water treatment, bleach, plastics such as PVC</td></tr><tr><td>Sodium hydroxide</td><td>Soap, paper, bleach, ceramics</td></tr></table>
<p>Brine electrolysis is a large-scale industry because all three products are useful and valuable.</p>`,
I("How does the set-up of an electrolysis cell change when we want to plate or purify a metal?",
`<p>Work in groups. Use the plating and refining figures.</p><ol><li>For each application (plating a key with copper, refining copper), identify the anode, the cathode and the electrolyte.</li><li>Write half-equations for both electrodes in the plating cell.</li><li>Explain why the electrolyte concentration does not change during plating.</li><li>Compare the two cells and list what is the same and what is different.</li></ol>`,
`<p><b>Plate a key.</b> Clean a steel key, connect it as the cathode in copper(II) sulfate solution, and use a copper strip as the anode. Run a small current for 10 minutes. Weigh the key and the copper anode before and after.</p><p><b>Compare.</b> Calculate how the mass of the anode changed and how the cathode changed. They should be similar. Explain why.</p><p><b>Evaluate.</b> Suggest two ways to improve the quality of the coating, such as cleaning the object and using a lower current.</p>`,
null),
[["Describe how a metal spoon could be silver-plated.","Spoon as the cathode (1). Silver as the anode (1). Electrolyte of silver nitrate solution (1). Pass an electric current (1).",4],
["Give two reasons for electroplating objects.","Any two from: protect against corrosion, improve appearance, save cost of using the pure metal (2).",2],
["State what is observed at the anode and at the cathode when impure copper is refined.","The anode gets smaller or dissolves (1). The cathode gets bigger or copper is deposited (1).",2],
["Explain why aluminium oxide is dissolved in molten cryolite before electrolysis.","Aluminium oxide has a very high melting point (1). Cryolite lowers the temperature needed (1) which reduces energy costs (1).",3],
["Explain why the graphite anodes in an aluminium cell must be replaced regularly.","Oxygen forms at the anode (1) and reacts with the hot graphite to form carbon dioxide (1).",2],
["Give one use for each product of electrolysing brine.","Hydrogen: ammonia or margarine (1). Chlorine: water treatment or bleach (1). Sodium hydroxide: soap or paper (1).",3]],
[M("In electroplating, the object to be plated is the:",["Anode","Cathode","Electrolyte","Cryolite"],1,"The object is the negative electrode where metal ions gain electrons."),
M("Why is aluminium not extracted by heating its oxide with carbon?",["Aluminium is less reactive than carbon","Aluminium is more reactive than carbon","Carbon is too expensive","Aluminium oxide is a gas"],1,"Carbon cannot reduce a more reactive metal's oxide."),
M("What is the function of cryolite in aluminium extraction?",["It is the ore","It lowers the melting point of the electrolyte","It is the anode","It reduces the oxide"],1,"It reduces the operating temperature, saving energy."),
M("What happens to the pure copper cathode during refining?",["It loses mass","It gains mass","It dissolves completely","It turns to sludge"],1,"Copper ions are deposited, so the cathode gets thicker."),
T("What is the name of the main ore of aluminium?",["bauxite"],"Bauxite contains aluminium oxide."),
M("Which is a use of chlorine from brine electrolysis?",["Making margarine","Treating drinking water","Making ammonia","Making soap"],1,"Chlorine kills bacteria in water."),
N("The temperature in an aluminium cell is about 950 °C. The melting point of pure aluminium oxide is over 2000 °C. By roughly how many degrees does cryolite lower the temperature, if the oxide melts at 2050 °C?",1100,"°C","2050 − 950 = 1100.")],
[["Electroplating set-up","Object = cathode. Plating metal = anode. Electrolyte has the plating metal's ions."],
["Why electroplate?","To protect from corrosion, to improve appearance or to save money."],
["Refining copper","Impure anode dissolves, pure cathode grows, blue CuSO~4~ electrolyte."],
["What is the anode sludge?","Impurities that do not dissolve, sometimes valuable metals."],
["Why use cryolite?","It lowers the melting temperature of aluminium oxide and saves energy."],
["Why do aluminium anodes wear away?","Oxygen reacts with hot graphite to form carbon dioxide."],
["Aluminium cathode equation (Extended)","Al^3+^ + 3e^-^ → Al"],
["Brine products","Hydrogen, chlorine and sodium hydroxide."]]);

BLESS.L44=L("Hydrogen fuel cells","How a hydrogen–oxygen fuel cell makes electricity, its half-reactions, and how it compares with petrol engines and rechargeable batteries.",
`<h4>What is a fuel cell?</h4>
<p>A <b>fuel cell</b> is a device that converts the <b>chemical energy of a fuel directly into electrical energy</b>. Reactants are fed in continuously, so unlike a battery it does not run flat while fuel is supplied.</p>
<p>The simplest is the <b>hydrogen–oxygen fuel cell</b>. Hydrogen and oxygen (or air) react to make <b>water</b> and release energy as electricity.</p>
<p>Overall: 2H~2~ + O~2~ → 2H~2~O</p>
<h4>How the cell works</h4>
{{B_FUEL}}
<ul><li>Hydrogen goes in at the negative electrode (anode) where it loses electrons.</li><li>The electrons travel round the <b>external circuit</b> as an electric current and can power a device.</li><li>Hydrogen ions move through the electrolyte to the positive electrode.</li><li>Oxygen reacts at the positive electrode, gaining the electrons and combining with the ions to form water.</li></ul>
<div class="key"><b>Exam tip</b>The only product is water. This is the main advantage over fossil fuel engines, which produce carbon dioxide and other pollutants.</div>
<h4>Half-equations <i>(Extended only)</i></h4>
<p>In an acidic electrolyte:</p>
<ul><li>Negative electrode: H~2~ → 2H^+^ + 2e^-^ (oxidation)</li><li>Positive electrode: O~2~ + 4H^+^ + 4e^-^ → 2H~2~O (reduction)</li></ul>
<p>Double the first equation to get four electrons each side. Adding gives 2H~2~ + O~2~ → 2H~2~O, with the H^+^ and electrons cancelling.</p>
<div class="ex"><b>Worked example</b>Show the half-equations combine correctly. 2 × (H~2~ → 2H^+^ + 2e^-^) gives 2H~2~ → 4H^+^ + 4e^-^. Add O~2~ + 4H^+^ + 4e^-^ → 2H~2~O. The 4H^+^ and 4e^-^ cancel, leaving 2H~2~ + O~2~ → 2H~2~O.</div>
<h4>Advantages and disadvantages</h4>
<table><tr><th>Advantages</th><th>Disadvantages</th></tr><tr><td>Water is the only product, so no carbon dioxide or air pollution at the point of use</td><td>Hydrogen is highly flammable and hard to store as a gas</td></tr><tr><td>Very efficient: energy is converted directly, with little heat loss</td><td>Hydrogen is often made from fossil fuels, which causes pollution elsewhere</td></tr><tr><td>Does not need recharging, only refuelling</td><td>Cells and storage tanks are expensive, and there are few refuelling points</td></tr></table>
<h4>Fuel cells, batteries and petrol engines</h4>
<p>Compare the three power sources:</p>
<ul><li><b>Petrol engine:</b> burns fuel, losing a lot of energy as heat, and releases CO~2~, NO~x~ and other pollutants.</li><li><b>Rechargeable battery:</b> stores electricity, takes long to charge, and is heavy.</li><li><b>Fuel cell:</b> quick to refuel and produces only water, but needs a hydrogen supply.</li></ul>
<div class="key"><b>Exam tip</b>When asked to evaluate, give a point for and a point against, and say where the hydrogen comes from.</div>`,
I("Is a hydrogen fuel cell a better power source than a petrol engine?",
`<p>Work in groups. Use the fuel cell figure and notes.</p><ol><li>Trace the path of electrons, hydrogen ions and oxygen in the fuel cell.</li><li>Write the overall equation and name the one product.</li><li>List two advantages and two disadvantages of fuel cells compared with petrol engines.</li><li>Decide which you would choose for a city bus and justify your choice.</li></ol>`,
`<p><b>Model.</b> Build a simple model with electrolysis of water: electrolyse dilute sulfuric acid to collect hydrogen and oxygen, then connect the electrodes to a small voltmeter or motor. Observe a brief current in the reverse direction.</p><p><b>Compare.</b> Use a data table of energy efficiencies. Petrol engines convert about 20–30% of the fuel's energy into motion while hydrogen fuel cells convert about 40–60% into electricity.</p><p><b>Evaluate.</b> Discuss where the hydrogen is made and how that affects the claim that a fuel cell is "clean".</p>`,
null),
[["State the overall equation for the reaction in a hydrogen–oxygen fuel cell.","2H~2~ + O~2~ → 2H~2~O (1 for correct formulae, 1 for balancing).",2],
["State one advantage of a hydrogen fuel cell over a petrol engine.","Only water is produced (1) / no carbon dioxide or pollutants at the point of use (1). Accept: more efficient.",1],
["Explain how a fuel cell is different from a rechargeable battery.","The fuel cell is supplied with reactants continuously (1) so it keeps producing electricity as long as fuel is supplied (1), while a battery runs out of stored chemicals (1).",3],
["Give two disadvantages of using hydrogen fuel cells in cars.","Any two from: hydrogen is hard to store, highly flammable, expensive to produce or often made from fossil fuels, few refuelling stations (2).",2],
["Write the half-equation for the reaction at the negative electrode of an acidic hydrogen fuel cell. (Extended)","H~2~ → 2H^+^ + 2e^-^ (1 species, 1 balancing).",2],
["Explain why the reaction at the negative electrode is oxidation. (Extended)","Hydrogen loses electrons (1) so it is oxidised (1).",2]],
[M("What is the only product of a hydrogen–oxygen fuel cell?",["Carbon dioxide","Water","Hydrogen peroxide","Steam and smoke"],1,"2H~2~ + O~2~ → 2H~2~O."),
M("Where do the electrons flow in a fuel cell?",["Through the electrolyte","Through the external circuit","Through the air","Nowhere"],1,"Electrons pass through the wire and power the device."),
M("Which is a disadvantage of hydrogen fuel cells?",["They give off carbon dioxide","Hydrogen is difficult to store","They need frequent recharging","They produce soot"],1,"Hydrogen is a flammable gas that takes up a lot of space."),
T("What is the name of the process in which a substance loses electrons?",["oxidation"],"Hydrogen loses electrons at the negative electrode."),
M("Which half-equation shows what happens at the negative electrode in an acidic fuel cell? (Extended)",["H~2~ → 2H^+^ + 2e^-^","O~2~ + 4H^+^ + 4e^-^ → 2H~2~O","2H^+^ + 2e^-^ → H~2~","2H~2~O → O~2~ + 4H^+^ + 4e^-^"],0,"Hydrogen is oxidised there."),
N("Two moles of hydrogen react completely with oxygen. How many moles of water form?",2,"mol","2H~2~ + O~2~ → 2H~2~O"),
M("Why is hydrogen not always a 'clean' fuel?",["It makes soot","It is often produced using fossil fuels","It reacts with nitrogen","It causes acid rain directly"],1,"Production can cause pollution.")],
[["Fuel cell","Converts the chemical energy of a fuel directly into electricity."],
["Overall reaction","2H~2~ + O~2~ → 2H~2~O"],
["Only product","Water."],
["Fuel cell vs battery","Fuel cell is refuelled and keeps running. A battery stores a fixed amount of chemicals."],
["Advantage over petrol","No carbon dioxide or pollutants at the point of use, more efficient."],
["Disadvantage","Hydrogen is flammable, hard to store, and often made from fossil fuels."],
["Negative electrode (Extended)","H~2~ → 2H^+^ + 2e^-^ (oxidation)"],
["Positive electrode (Extended)","O~2~ + 4H^+^ + 4e^-^ → 2H~2~O (reduction)"]]);
})();

/* ===== chunk 5: Topic 5 lessons ===== */
(function(){
BLESS.L51=L("Exothermic and endothermic reactions","Energy transfer to and from the surroundings, how to tell the two types apart, and the meaning of the sign of ΔH.",
`<h4>Energy changes in reactions</h4>
<p>Every chemical reaction involves a transfer of energy between the reacting chemicals and their <b>surroundings</b>. Chemists call the reacting chemicals <b>the system</b>. Energy is usually transferred as <b>heat</b>, which is why the temperature of the surroundings changes.</p>
{{B_SYS}}
<p>The total energy is always conserved. Energy is never created or destroyed. It just moves between the system and the surroundings.</p>
<h4>Exothermic reactions</h4>
<p>In an <b>exothermic</b> reaction, energy is <b>transferred out</b> to the surroundings. The temperature of the surroundings <b>increases</b>. The change in energy, ΔH, is <b>negative</b>.</p>
<ul><li>Combustion (burning fuels)</li><li>Neutralisation of an acid with an alkali</li><li>Respiration</li><li>Most oxidation reactions, such as rusting</li><li>Displacement of a metal such as zinc with copper(II) sulfate</li></ul>
<p>Exothermic reactions are used in hand warmers, self-heating cans and in burning fuels to heat homes.</p>
<h4>Endothermic reactions</h4>
<p>In an <b>endothermic</b> reaction, energy is <b>taken in</b> from the surroundings. The temperature of the surroundings <b>decreases</b>. ΔH is <b>positive</b>.</p>
<ul><li>Thermal decomposition, such as heating calcium carbonate</li><li>Photosynthesis (energy comes from light)</li><li>Reaction of citric acid with sodium hydrogencarbonate</li><li>Dissolving some salts, such as ammonium nitrate</li></ul>
<p>Endothermic reactions are used in instant cold packs for sports injuries.</p>
<table><tr><th>Feature</th><th>Exothermic</th><th>Endothermic</th></tr><tr><td>Energy transfer</td><td>Out to surroundings</td><td>In from surroundings</td></tr><tr><td>Temperature of surroundings</td><td>Rises</td><td>Falls</td></tr><tr><td>Sign of ΔH</td><td>Negative</td><td>Positive</td></tr><tr><td>Products compared with reactants</td><td>Lower in energy</td><td>Higher in energy</td></tr></table>
<div class="key"><b>Exam tip</b>Do not say heat is "lost" or "used up" without saying where it goes. State whether energy goes <b>to</b> or <b>from</b> the surroundings, and link it to the temperature change.</div>
<h4>Reading ΔH</h4>
<p>The <b>enthalpy change</b>, ΔH, is the overall energy change of a reaction, measured in <b>kJ/mol</b>. Its sign tells you the type of reaction.</p>
<div class="ex"><b>Worked example</b>Reaction A has ΔH = −890 kJ/mol. Reaction B has ΔH = +178 kJ/mol. A is exothermic: the temperature of the surroundings rises. B is endothermic: the temperature falls.</div>
<h4>Reversible reactions and energy</h4>
<p>If a reaction is exothermic in one direction, it is endothermic in the reverse direction by the <b>same amount</b>. Hydrated copper(II) sulfate (blue) turns to white anhydrous copper(II) sulfate on heating. This is endothermic. Adding water to the white solid reverses it, giving out heat and turning blue again.</p>
<div class="key"><b>Exam tip</b>In the reverse direction ΔH has the opposite sign but the same size: forward −57 kJ/mol means backward +57 kJ/mol.</div>`,
I("How can we tell from the temperature whether a reaction is exothermic or endothermic?",
`<p>Work in pairs and record temperatures carefully.</p><ol><li>Measure the starting temperature of 25 cm³ of dilute hydrochloric acid in a polystyrene cup.</li><li>Add a measured quantity of sodium hydroxide solution, stir and record the highest temperature.</li><li>Repeat with citric acid and sodium hydrogencarbonate, recording the lowest temperature.</li><li>Classify each as exothermic or endothermic and state the sign of ΔH.</li></ol>`,
`<p><b>Measure.</b> Use a thermometer reading to 0.5 °C. Stir gently and keep the lid on the cup. Record the temperature every 30 seconds for two minutes.</p><p><b>Analyse.</b> Calculate the temperature change for each reaction. A rise means exothermic, a fall means endothermic.</p><p><b>Evaluate.</b> Explain why polystyrene cups give better results than glass beakers. List two ways to reduce energy lost to the air.</p>`,
null),
[["Define an exothermic reaction.","A reaction that transfers energy to the surroundings (1) so the temperature of the surroundings rises (1).",2],
["State two examples of exothermic reactions.","Any two from: combustion, neutralisation, respiration, rusting, displacement (2).",2],
["Citric acid is added to sodium hydrogencarbonate solution and the temperature falls. Explain what this shows.","The reaction is endothermic (1) because it takes in energy from the surroundings (1).",2],
["State the sign of ΔH for an endothermic reaction.","Positive (1).",1],
["A reaction has ΔH = −120 kJ/mol. State what happens to the temperature of the surroundings and the energy of the products compared with the reactants.","Temperature increases (1). Products have less energy than reactants (1).",2],
["The decomposition of calcium carbonate has ΔH = +178 kJ/mol. State ΔH for the reverse reaction.","−178 kJ/mol (1).",1]],
[M("Which describes an endothermic reaction?",["Temperature of surroundings rises","Energy is transferred to surroundings","ΔH is positive","Products have less energy than reactants"],2,"Endothermic reactions have positive ΔH."),
M("Which process is endothermic?",["Burning methane","Neutralisation","Photosynthesis","Respiration"],2,"Photosynthesis absorbs energy from light."),
N("A reaction has ΔH = +65 kJ/mol. What is ΔH for the reverse reaction in kJ/mol?",-65,"kJ/mol","Reverse reactions have the opposite sign."),
T("What word describes a reaction that gives out energy to the surroundings?",["exothermic"],"Exo- means out."),
M("A student mixes two solutions and the temperature increases from 21 °C to 29 °C. This reaction is:",["Endothermic","Exothermic","Neither","A physical change only"],1,"The surroundings got hotter."),
M("Why is anhydrous copper(II) sulfate turned blue when water is added?",["The reaction is exothermic and forms hydrated crystals","The reaction is endothermic","It is reduced","It decomposes"],0,"Adding water reverses the dehydration and gives out heat."),
M("Which product is used in hand warmers?",["An endothermic reaction","An exothermic reaction","A physical change","A catalyst"],1,"The reaction gives out heat.")],
[["System and surroundings","The system is the reacting chemicals. The surroundings are everything else."],
["Exothermic","Energy out to surroundings. Temperature rises. ΔH negative."],
["Endothermic","Energy in from surroundings. Temperature falls. ΔH positive."],
["Exothermic examples","Combustion, neutralisation, respiration, rusting."],
["Endothermic examples","Thermal decomposition, photosynthesis, dissolving ammonium nitrate."],
["Units of ΔH","kJ/mol."],
["Reverse reaction","ΔH has the same size but the opposite sign."],
["Hydrated copper(II) sulfate","Heating is endothermic and turns blue to white. Adding water reverses it and gives out heat."]]);

BLESS.L52=L("Reaction pathway diagrams and activation energy","Energy profile diagrams, activation energy and how a catalyst lowers it.",
`<h4>Reaction pathway diagrams</h4>
<p>A <b>reaction pathway diagram</b> (energy profile) shows how the energy of the chemicals changes as the reaction goes from reactants to products. The vertical axis is <b>energy</b> and the horizontal axis is the <b>progress of the reaction</b>.</p>
<ul><li>The left line is the energy of the reactants.</li><li>The right line is the energy of the products.</li><li>The curve between them rises to a peak.</li></ul>
<p><b>Exothermic profile</b></p>
{{B_PEXO}}
<p>The products are <b>lower</b> in energy than the reactants. The difference is ΔH, drawn as an arrow pointing <b>down</b>. ΔH is negative.</p>
<p><b>Endothermic profile</b></p>
{{B_PENDO}}
<p>The products are <b>higher</b> in energy than the reactants. ΔH is drawn as an arrow pointing <b>up</b> and is positive.</p>
<div class="key"><b>Exam tip</b>Draw ΔH from the reactant level to the product level. Label the axes, the reactants, the products and ΔH.</div>
<h4>Activation energy</h4>
<p>Even exothermic reactions need a starting push. The <b>activation energy</b>, E~a~, is the <b>minimum energy that colliding particles must have in order to react</b>. On the diagram it is the height from the reactants up to the top of the peak.</p>
<p>Particles must break some bonds before new bonds can form. The energy to do this comes from the collision. A fuel such as petrol does not burn until a spark supplies the activation energy.</p>
<div class="ex"><b>Worked example</b>On a profile, the reactants are at 100 kJ and the peak is at 180 kJ. The activation energy is 180 − 100 = <b>80 kJ</b>. If the products are at 40 kJ, ΔH = 40 − 100 = <b>−60 kJ</b> and the reaction is exothermic.</div>
<h4>Catalysts and the pathway</h4>
<p>A <b>catalyst</b> speeds up a reaction without being used up. It does this by providing an <b>alternative pathway with a lower activation energy</b>.</p>
{{B_PCAT}}
<ul><li>The peak is lower with the catalyst.</li><li>More collisions have enough energy to react, so the rate increases.</li><li>The energies of the reactants and products do <b>not</b> change, so <b>ΔH stays the same</b>.</li></ul>
<div class="key"><b>Exam tip</b>A catalyst does not add energy and does not change ΔH. It lowers the activation energy.</div>
<h4>Putting it together</h4>
<table><tr><th>Question</th><th>Where to look on the diagram</th></tr><tr><td>Exothermic or endothermic?</td><td>Are the products lower or higher than the reactants?</td></tr><tr><td>Size of ΔH</td><td>Difference between reactant and product levels</td></tr><tr><td>Activation energy</td><td>Reactants to top of the peak</td></tr><tr><td>Effect of a catalyst</td><td>Lower peak, same start and end</td></tr></table>`,
I("What does a catalyst change on a reaction pathway diagram?",
`<p>Work in pairs with the three energy profiles.</p><ol><li>For each diagram, decide if the reaction is exothermic or endothermic and justify it.</li><li>Measure E~a~ and ΔH from a set of given diagrams.</li><li>Sketch the same reaction with a catalyst and say what changes and what stays the same.</li><li>Explain why the catalysed reaction is faster.</li></ol>`,
`<p><b>Experiment.</b> Add manganese(IV) oxide to hydrogen peroxide solution and measure the volume of oxygen collected over time. Compare with a run without the catalyst.</p><p><b>Link.</b> Match the faster rate to the lower activation energy. Explain why the overall energy released is the same.</p><p><b>Sketch.</b> Draw an energy profile for the reaction with and without catalyst, labelling E~a~ and ΔH.</p>`,
null),
[["On a reaction pathway diagram, the products are at a lower energy than the reactants. State whether the reaction is exothermic or endothermic.","Exothermic (1).",1],
["Define activation energy.","The minimum energy (1) that colliding particles must have in order to react (1).",2],
["Sketch and label a reaction pathway diagram for an endothermic reaction.","Axes labelled energy and progress of reaction (1). Products higher than reactants (1). Curve rises above products (1). ΔH arrow upward (1).",4],
["Explain how a catalyst increases the rate of a reaction.","It provides an alternative pathway (1) with a lower activation energy (1) so more collisions have enough energy to react (1).",3],
["State the effect of a catalyst on ΔH.","No effect (1).",1],
["A reaction has reactants at 250 kJ, a peak at 340 kJ and products at 130 kJ. Calculate the activation energy and ΔH.","E~a~ = 340 − 250 = 90 kJ (1). ΔH = 130 − 250 = −120 kJ (1).",2]],
[M("On a pathway diagram, the activation energy is the energy difference between:",["Reactants and products","Reactants and the top of the peak","Products and the top of the peak","The two axes"],1,"It is measured from the reactants to the peak."),
N("Reactants are at 60 kJ and the peak is at 150 kJ. What is the activation energy in kJ?",90,"kJ","150 − 60 = 90."),
M("What does a catalyst do to the activation energy?",["Raises it","Lowers it","Removes it","No effect"],1,"The alternative pathway has a lower peak."),
M("A reaction has products higher in energy than reactants. ΔH is:",["Negative","Positive","Zero","Cannot tell"],1,"Endothermic reactions have ΔH positive."),
N("Reactants are at 200 kJ and products at 120 kJ. What is ΔH in kJ?",-80,"kJ","120 − 200 = −80."),
T("What do we call the minimum energy needed for a reaction to start?",["activation energy"],"Particles must collide with at least this energy."),
M("Which statement about a catalyst is true?",["It changes ΔH","It is used up","It lowers the activation energy","It makes the reaction endothermic"],2,"A catalyst only changes the pathway.")],
[["Reaction pathway diagram","A graph of energy against progress of reaction."],
["Exothermic profile","Products lower than reactants. ΔH down and negative."],
["Endothermic profile","Products higher than reactants. ΔH up and positive."],
["Activation energy","The minimum energy particles need to react."],
["Measuring activation energy","From the reactants up to the top of the peak."],
["Catalyst","Provides a lower-energy pathway and is not used up."],
["Effect of a catalyst on ΔH","None. Reactant and product energies are unchanged."],
["Why does a catalyst speed up a reaction?","More collisions have the lower activation energy."]]);

BLESS.L53=L("Bond energies","Energy needed to break bonds, energy released when bonds form, and calculating ΔH from bond energies.",
`<h4>Breaking and making bonds</h4>
<p>During a reaction, bonds in the reactants are <b>broken</b> and new bonds in the products are <b>formed</b>.</p>
<ul><li><b>Breaking bonds</b> is <b>endothermic</b>. It takes in energy from the surroundings.</li><li><b>Making bonds</b> is <b>exothermic</b>. It gives out energy to the surroundings.</li></ul>
<p>The <b>bond energy</b> is the energy needed to break one mole of a particular bond. It is measured in <b>kJ/mol</b>. The same amount of energy is released when that bond forms.</p>
<div class="key"><b>Exam tip</b>Never say breaking bonds releases energy. Bonds hold atoms together, so energy must be put in to separate them.</div>
<p><b>Deciding if a reaction is exo- or endothermic</b></p>
<ul><li>If <b>more energy is released</b> making bonds than is needed to break bonds, the reaction is <b>exothermic</b>.</li><li>If <b>more energy is needed</b> to break bonds than is released making bonds, the reaction is <b>endothermic</b>.</li></ul>
{{B_BONDS}}
<h4>Calculating ΔH <i>(Extended only)</i></h4>
<p>Use this method every time:</p>
<ol><li>Draw out the molecules to see every bond.</li><li>Add up the energy to <b>break</b> all the bonds in the reactants.</li><li>Add up the energy <b>released</b> when all the bonds in the products form.</li><li>Calculate: <b>ΔH = energy in − energy out</b> (bonds broken − bonds made).</li></ol>
<table><tr><th>Bond</th><th>Energy (kJ/mol)</th></tr><tr><td>H–H</td><td>436</td></tr><tr><td>Cl–Cl</td><td>242</td></tr><tr><td>H–Cl</td><td>431</td></tr><tr><td>N≡N</td><td>945</td></tr><tr><td>N–H</td><td>391</td></tr></table>
<div class="ex"><b>Worked example</b>H~2~ + Cl~2~ → 2HCl.<br>Bonds broken: 436 + 242 = 678 kJ.<br>Bonds made: 2 × 431 = 862 kJ.<br>ΔH = 678 − 862 = <b>−184 kJ/mol</b>. Negative, so exothermic.</div>
<div class="ex"><b>Worked example</b>N~2~ + 3H~2~ → 2NH~3~.<br>Broken: 945 + (3 × 436) = 945 + 1308 = 2253 kJ.<br>Made: 6 × 391 (three N–H in each of two NH~3~) = 2346 kJ.<br>ΔH = 2253 − 2346 = <b>−93 kJ/mol</b>.</div>
<div class="key"><b>Exam tip</b>Count bonds carefully. Multiply the bond energy by the number of bonds, not just the number of molecules. Always show the sign of ΔH.</div>
<h4>Combustion of methane <i>(Extended only)</i></h4>
<p>CH~4~ + 2O~2~ → CO~2~ + 2H~2~O. Use C–H 413, O=O 498, C=O 805, O–H 464 kJ/mol.</p>
<div class="ex"><b>Worked example</b>Broken: 4 × 413 + 2 × 498 = 1652 + 996 = 2648 kJ.<br>Made: 2 × 805 + 4 × 464 = 1610 + 1856 = 3466 kJ.<br>ΔH = 2648 − 3466 = <b>−818 kJ/mol</b>.</div>
<h4>Working backwards <i>(Extended only)</i></h4>
<p>If ΔH is given you can find an unknown bond energy. For H~2~ + Br~2~ → 2HBr, ΔH = −103 kJ/mol, H–H = 436 and H–Br = 366 kJ/mol.</p>
<div class="ex"><b>Worked example</b>ΔH = broken − made, so −103 = (436 + x) − (2 × 366). Then −103 = 436 + x − 732, so x = −103 − 436 + 732 = <b>193 kJ/mol</b> for the Br–Br bond.</div>`,
I("Do the bond energies explain why some reactions give out energy and others take it in?",
`<p>Work with the bond energy data table.</p><ol><li>Draw the molecules in the reaction H~2~ + I~2~ → 2HI and list the bonds that break and form.</li><li>Calculate the energy in and the energy out using the table.</li><li>State whether the reaction is exothermic or endothermic.</li><li>Repeat with a second reaction of your choice and compare.</li></ol>`,
`<p><b>Bond audit.</b> For each reaction in the table, draw the structure of every molecule. Count each type of bond and write the total next to the bond energy.</p><p><b>Compare.</b> Which reactions release the most energy? Look at the bond types in the products to see why.</p><p><b>Check.</b> Swap your calculation with a partner. Check each other's bond counts, which is where most errors occur.</p>`,
null),
[["Explain, in terms of bonds, why a reaction is exothermic.","More energy is released making new bonds (1) than is taken in breaking the bonds in the reactants (1).",2],
["State whether breaking bonds is endothermic or exothermic.","Endothermic (1).",1],
["Calculate ΔH for H~2~ + Cl~2~ → 2HCl using H–H 436, Cl–Cl 242 and H–Cl 431 kJ/mol. (Extended)","Broken 436 + 242 = 678 (1). Made 2 × 431 = 862 (1). ΔH = −184 kJ/mol (1).",3],
["Calculate ΔH for N~2~ + 3H~2~ → 2NH~3~ using N≡N 945, H–H 436, N–H 391 kJ/mol. (Extended)","Broken 945 + 3 × 436 = 2253 (1). Made 6 × 391 = 2346 (1). ΔH = −93 kJ/mol (1).",3],
["The bond energy of H–H is 436 kJ/mol and H–Br is 366 kJ/mol. ΔH for H~2~ + Br~2~ → 2HBr is −103 kJ/mol. Calculate the Br–Br bond energy. (Extended)","−103 = 436 + x − 732 (1). x = 193 kJ/mol (1).",2],
["Calculate ΔH for CH~4~ + 2O~2~ → CO~2~ + 2H~2~O using C–H 413, O=O 498, C=O 805, O–H 464 kJ/mol. (Extended)","Broken 1652 + 996 = 2648 (1). Made 1610 + 1856 = 3466 (1). ΔH = −818 kJ/mol (1).",3]],
[M("Which statement about bonds is correct?",["Breaking bonds releases energy","Making bonds takes in energy","Breaking bonds takes in energy","Making bonds is endothermic"],2,"Energy must be supplied to break a bond."),
N("Bonds broken total 680 kJ and bonds made total 920 kJ. What is ΔH in kJ?",-240,"kJ","680 − 920 = −240."),
M("A reaction takes in more energy breaking bonds than it releases forming bonds. It is:",["Exothermic","Endothermic","Neutral","A catalyst"],1,"Net energy is taken in."),
N("How many N–H bonds are there in two molecules of NH~3~?",6,"","Each molecule has three."),
N("Bonds broken 1100 kJ, bonds made 950 kJ. What is ΔH in kJ?",150,"kJ","1100 − 950 = +150."),
T("What is the unit of bond energy?",["kJ/mol"],"Energy per mole of bonds."),
M("ΔH = energy in − energy out. Energy in corresponds to:",["Bonds made","Bonds broken","Activation energy only","The catalyst"],1,"Breaking bonds takes in energy.")],
[["Breaking bonds","Endothermic. Energy must be put in."],
["Making bonds","Exothermic. Energy is released."],
["Exothermic in terms of bonds","More energy released making bonds than needed to break bonds."],
["Bond energy","Energy to break one mole of a particular bond, in kJ/mol."],
["ΔH formula (Extended)","ΔH = energy to break bonds − energy released making bonds."],
["H~2~ + Cl~2~ → 2HCl (Extended)","ΔH = 678 − 862 = −184 kJ/mol."],
["N~2~ + 3H~2~ → 2NH~3~ (Extended)","ΔH = 2253 − 2346 = −93 kJ/mol."],
["Counting bonds","Multiply bond energy by the number of bonds, including all molecules."]]);
})();

/* ===== chunk 6: Topic 12 figures ===== */
(function(){
const FG=(w,h,inner,label,cap,mw)=>`<figure class="fig"${mw?` style="max-width:${mw}px"`:""}><svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${inner}</svg><figcaption>${cap}</figcaption></figure>`;
const TX=(x,y,t,o)=>{o=o||{};return `<text x="${x}" y="${y}" font-size="${o.s||11}" text-anchor="${o.a||"middle"}"${o.b?' font-weight="700"':""} fill="currentColor">${t}</text>`};
const TUBE=(x,col,top,label,sub)=>{
  const w=34,h=96,y0=26;
  let s=`<path d="M${x-w/2} ${y0}V${y0+h-14}Q${x-w/2} ${y0+h} ${x} ${y0+h}Q${x+w/2} ${y0+h} ${x+w/2} ${y0+h-14}V${y0}" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
  s+=`<path d="M${x-w/2+1.5} ${y0+30}H${x+w/2-1.5}V${y0+h-14}Q${x+w/2-1.5} ${y0+h-1.5} ${x} ${y0+h-1.5}Q${x-w/2+1.5} ${y0+h-1.5} ${x-w/2+1.5} ${y0+h-14}Z" fill="${top}" fill-opacity=".35"/>`;
  s+=`<path d="M${x-w/2+3} ${y0+h-32}Q${x} ${y0+h-42} ${x+w/2-3} ${y0+h-32}V${y0+h-14}Q${x+w/2-3} ${y0+h-3} ${x} ${y0+h-3}Q${x-w/2+3} ${y0+h-3} ${x-w/2+3} ${y0+h-14}Z" fill="${col}" stroke="currentColor" stroke-opacity=".35"/>`;
  s+=TX(x,y0+h+16,label,{b:1,s:12})+(sub?TX(x,y0+h+30,sub,{s:9.5}):"");return s};
/* precipitate colours with NaOH(aq) */
FIGS.B_PPT=()=>{
  const d=[["Al³⁺","#f4f4f0","white"],["Ca²⁺","#f4f4f0","white"],["Zn²⁺","#f4f4f0","white"],["Cr³⁺","#4d8a4a","green"],["Fe²⁺","#6b8f4e","green"],["Cu²⁺","#6fa8dc","light blue"],["Fe³⁺","#b4562b","red-brown"]];
  let s=TX(280,14,"Precipitate formed on adding sodium hydroxide solution",{b:1,s:12});
  d.forEach((c,i)=>{s+=TUBE(44+i*78,c[1],"#cfe3f2",c[0],c[2])});
  return FG(560,196,s,"Colours of metal hydroxide precipitates","Hydroxide precipitates: white (Al³⁺, Ca²⁺, Zn²⁺), green (Cr³⁺, Fe²⁺), light blue (Cu²⁺) and red-brown (Fe³⁺).","Seven test tubes showing the precipitate colour for each metal ion",660);
};
/* silver halide precipitates */
FIGS.B_HALIDE=()=>{
  const d=[["Cl⁻","#f4f4f0","white AgCl"],["Br⁻","#efe4b8","cream AgBr"],["I⁻","#e8d44a","yellow AgI"]];
  let s=TX(160,14,"Acidified silver nitrate solution",{b:1,s:12});
  d.forEach((c,i)=>{s+=TUBE(54+i*104,c[1],"#e8f1f8",c[0],c[2])});
  return FG(320,196,s,"Silver halide precipitate colours","Halide ions give silver halide precipitates: chloride is white, bromide cream and iodide yellow.","Three test tubes with white, cream and yellow precipitates",380);
};
/* flame test colours */
FIGS.B_FLAME=()=>{
  const d=[["Li⁺","#e53935","crimson red"],["Na⁺","#fbc02d","yellow"],["K⁺","#b388ff","lilac"],["Ca²⁺","#ef6c2f","orange-red"],["Cu²⁺","#2eb88a","blue-green"]];
  let s=TX(300,14,"Flame test colours",{b:1,s:12});
  d.forEach((c,i)=>{const x=60+i*120;
    s+=`<path d="M${x} 36C${x+22} 66 ${x+26} 92 ${x} 118C${x-26} 92 ${x-22} 66 ${x} 36Z" fill="${c[1]}" fill-opacity=".85"/><path d="M${x} 74C${x+10} 90 ${x+10} 104 ${x} 118C${x-10} 104 ${x-10} 90 ${x} 74Z" fill="#fff" fill-opacity=".45"/>`;
    s+=`<rect x="${x-12}" y="118" width="24" height="26" rx="3" fill="none" stroke="currentColor" stroke-opacity=".6"/>`+TX(x,164,c[0],{b:1,s:12})+TX(x,179,c[2],{s:10})});
  return FG(620,190,s,"Flame test colours for five metal ions","Flame tests: lithium crimson, sodium yellow, potassium lilac, calcium orange-red and copper blue-green.","Five flames in different colours",720);
};
})();

/* ===== chunk 7: Topic 12 lessons ===== */
(function(){
BLESS.L121=L("Testing for anions","Identifying carbonate, halide, nitrate and sulfate ions from their reactions.",
`<h4>Why we test for ions</h4>
<p>Chemists identify an unknown salt by finding its <b>cation</b> (positive ion) and its <b>anion</b> (negative ion) with simple <b>tests</b>. Each test gives a distinctive result: a gas, a coloured precipitate or a colour change.</p>
<p>Always carry out tests on a small sample of <b>solution</b> in a test tube, and use clean apparatus each time.</p>
<h4>Carbonate ions, CO~3~^2-^</h4>
<p>Add <b>dilute acid</b>. If the solution <b>fizzes</b>, bubble the gas through <b>limewater</b>. A <b>cloudy white (milky)</b> limewater shows <b>carbon dioxide</b>, so the sample contains carbonate.</p>
<div class="ex"><b>Worked example</b>Sodium carbonate + hydrochloric acid → sodium chloride + water + carbon dioxide. Na~2~CO~3~ + 2HCl → 2NaCl + H~2~O + CO~2~. The CO~2~ turns limewater milky.</div>
<h4>Halide ions: chloride, bromide, iodide</h4>
<p>Add <b>dilute nitric acid</b>, then <b>aqueous silver nitrate</b>. A precipitate forms. Its colour identifies the halide.</p>
{{B_HALIDE}}
<table><tr><th>Ion</th><th>Precipitate</th></tr><tr><td>Chloride, Cl^-^</td><td>White silver chloride, AgCl</td></tr><tr><td>Bromide, Br^-^</td><td>Cream silver bromide, AgBr</td></tr><tr><td>Iodide, I^-^</td><td>Yellow silver iodide, AgI</td></tr></table>
<div class="ex"><b>Worked example</b>Ionic equation for chloride: Ag^+^(aq) + Cl^-^(aq) → AgCl(s). Nitric acid is added first to remove carbonate ions, which would otherwise give a false precipitate with silver ions.</div>
<h4>Sulfate ions, SO~4~^2-^</h4>
<p>Add <b>dilute nitric acid</b>, then <b>aqueous barium nitrate</b>. A <b>white precipitate of barium sulfate</b> shows sulfate ions. Ba^2+^(aq) + SO~4~^2-^(aq) → BaSO~4~(s).</p>
<div class="key"><b>Exam tip</b>Always acidify first. Without acid, carbonate would also form a white precipitate with barium ions.</div>
<p><b>Nitrate ions, NO~3~^-^</b></p>
<p>Add <b>aqueous sodium hydroxide</b> and a piece of <b>aluminium foil</b>, then <b>warm gently</b>. Nitrate is reduced and <b>ammonia gas</b> is given off. It turns <b>damp red litmus paper blue</b>.</p>
<div class="key"><b>Exam tip</b>The nitrate test is the only anion test that gives off <b>ammonia</b>. The foil and warming are both needed.</div>
<h4>Summary table</h4>
<table><tr><th>Anion</th><th>Reagents</th><th>Positive result</th></tr><tr><td>Carbonate</td><td>Dilute acid</td><td>Fizzing; gas turns limewater milky</td></tr><tr><td>Chloride</td><td>HNO~3~, then AgNO~3~</td><td>White precipitate</td></tr><tr><td>Bromide</td><td>HNO~3~, then AgNO~3~</td><td>Cream precipitate</td></tr><tr><td>Iodide</td><td>HNO~3~, then AgNO~3~</td><td>Yellow precipitate</td></tr><tr><td>Sulfate</td><td>HNO~3~, then Ba(NO~3~)~2~</td><td>White precipitate</td></tr><tr><td>Nitrate</td><td>NaOH, Al foil, warm</td><td>Ammonia; damp red litmus turns blue</td></tr></table>`,
I("Can you work out which anion is in each unknown solution?",
`<p>Work in groups with four unknown solutions labelled A to D (sodium salts).</p><ol><li>Plan a test sequence using the table of anion tests. Decide which test to do first.</li><li>Carry out each test on a small sample and record every observation.</li><li>Identify each anion and write an ionic equation for any precipitate.</li><li>Check that you used nitric acid before silver nitrate and barium nitrate.</li></ol>`,
`<p><b>Plan.</b> Use half a test tube of each solution. Test with silver nitrate first. A precipitate rules out carbonate if the sample is acidified first.</p><p><b>Observe.</b> Record the colour of each precipitate in a table. Compare the cream and white precipitates against a known chloride and bromide.</p><p><b>Conclude.</b> Identify the four unknowns. Explain what you would do if two solutions gave a white precipitate with silver nitrate.</p>`,
null),
[["Describe the test for carbonate ions.","Add dilute acid (1). Bubble the gas given off through limewater (1). It turns milky / cloudy (1).",3],
["A solution gives a white precipitate when dilute nitric acid and silver nitrate are added. Name the ion.","Chloride (1).",1],
["State the colour of the precipitate formed with iodide ions in the silver nitrate test.","Yellow (1).",1],
["Describe the test for sulfate ions and the result.","Add dilute nitric acid then aqueous barium nitrate (1). White precipitate (1).",2],
["Describe how to test for nitrate ions.","Add sodium hydroxide and aluminium foil (1) and warm (1). Ammonia is given off which turns damp red litmus paper blue (1).",3],
["Explain why a solution is acidified with dilute nitric acid before adding silver nitrate.","To remove carbonate ions (1) which would give a precipitate with silver ions and cause a false positive (1).",2]],
[M("Which anion gives a cream precipitate with acidified silver nitrate?",["Chloride","Bromide","Iodide","Sulfate"],1,"AgBr is cream."),
M("Which reagent is used to test for sulfate ions?",["Silver nitrate","Barium nitrate","Limewater","Aluminium foil"],1,"Acidified barium nitrate gives white BaSO~4~."),
M("A gas that turns limewater milky is given off when acid is added. The ion is:",["Chloride","Nitrate","Carbonate","Sulfate"],2,"Carbonate releases CO~2~."),
T("What gas is given off in the test for nitrate ions?",["ammonia"],"Ammonia turns damp red litmus blue."),
M("Why is dilute nitric acid, not sulfuric acid, used to acidify before the silver nitrate test?",["Sulfuric acid is too weak","Sulfate would form a precipitate with silver ions","Nitric acid is cheaper","Silver nitrate is acidic"],1,"Silver sulfate is sparingly soluble, giving a false result."),
M("Which result shows iodide ions?",["White precipitate","Cream precipitate","Yellow precipitate","Blue solution"],2,"AgI is yellow."),
M("What does aluminium foil do in the nitrate test?",["Catalyses the reaction","Reduces nitrate to ammonia","Forms a precipitate","Cools the solution"],1,"Aluminium reduces nitrate in alkaline solution.")],
[["Carbonate test","Add dilute acid. CO~2~ turns limewater milky."],
["Halide test","Nitric acid then silver nitrate. White Cl^-^, cream Br^-^, yellow I^-^."],
["Sulfate test","Nitric acid then barium nitrate. White precipitate."],
["Nitrate test","NaOH and Al foil, warm. Ammonia turns damp red litmus blue."],
["Why acidify with nitric acid?","To remove carbonate ions that give false precipitates."],
["Silver chloride equation","Ag^+^(aq) + Cl^-^(aq) → AgCl(s)"],
["Barium sulfate equation","Ba^2+^(aq) + SO~4~^2-^(aq) → BaSO~4~(s)"],
["Colour of AgBr","Cream."]]);

BLESS.L122=L("Testing for cations and flame tests","Using sodium hydroxide, aqueous ammonia and flame tests to identify metal ions.",
`<h4>Cations with sodium hydroxide</h4>
<p>Most metal cations form an insoluble <b>metal hydroxide</b> when aqueous <b>sodium hydroxide</b> is added. The colour of the precipitate identifies many of them.</p>
{{B_PPT}}
<p>The ionic equation is the same pattern for each: M^n+^(aq) + nOH^-^(aq) → M(OH)~n~(s). For example Cu^2+^(aq) + 2OH^-^(aq) → Cu(OH)~2~(s).</p>
<h4>Adding excess sodium hydroxide</h4>
<p>Some precipitates <b>dissolve in excess</b> sodium hydroxide, which helps to tell similar ions apart.</p>
<table><tr><th>Cation</th><th>NaOH(aq), a few drops</th><th>NaOH(aq), excess</th></tr><tr><td>Aluminium, Al^3+^</td><td>White precipitate</td><td>Dissolves, colourless solution</td></tr><tr><td>Calcium, Ca^2+^</td><td>White precipitate</td><td>Insoluble</td></tr><tr><td>Chromium(III), Cr^3+^</td><td>Green precipitate</td><td>Dissolves, dark green solution</td></tr><tr><td>Copper(II), Cu^2+^</td><td>Light blue precipitate</td><td>Insoluble</td></tr><tr><td>Iron(II), Fe^2+^</td><td>Green precipitate</td><td>Insoluble</td></tr><tr><td>Iron(III), Fe^3+^</td><td>Red-brown precipitate</td><td>Insoluble</td></tr><tr><td>Zinc, Zn^2+^</td><td>White precipitate</td><td>Dissolves, colourless solution</td></tr></table>
<h4>Cations with aqueous ammonia</h4>
<p>Aqueous ammonia also gives hydroxide precipitates, but its behaviour in excess is different. This lets you separate ions that look the same with sodium hydroxide.</p>
<table><tr><th>Cation</th><th>NH~3~(aq), few drops</th><th>NH~3~(aq), excess</th></tr><tr><td>Al^3+^</td><td>White precipitate</td><td>Insoluble</td></tr><tr><td>Ca^2+^</td><td>No precipitate or very slight</td><td>—</td></tr><tr><td>Cr^3+^</td><td>Green precipitate</td><td>Insoluble</td></tr><tr><td>Cu^2+^</td><td>Light blue precipitate</td><td>Dissolves, dark blue solution</td></tr><tr><td>Fe^2+^</td><td>Green precipitate</td><td>Insoluble</td></tr><tr><td>Fe^3+^</td><td>Red-brown precipitate</td><td>Insoluble</td></tr><tr><td>Zn^2+^</td><td>White precipitate</td><td>Dissolves, colourless solution</td></tr></table>
<div class="key"><b>Exam tip</b>Aluminium and zinc both give white precipitates that dissolve in excess NaOH. Use ammonia to separate them: only the zinc precipitate dissolves in excess ammonia.</div>
<div class="ex"><b>Worked example</b>A solution gives a white precipitate with NaOH that dissolves in excess, and a white precipitate with ammonia that does not dissolve. The cation is aluminium, Al^3+^.</div>
<p><b>Ammonium ions, NH~4~^+^</b></p>
<p>Add <b>aqueous sodium hydroxide</b> and <b>warm</b>. Ammonia gas is given off and turns <b>damp red litmus paper blue</b>. NH~4~^+^ + OH^-^ → NH~3~ + H~2~O.</p>
<h4>Flame tests</h4>
<p>Some metal ions give a coloured flame. Dip a clean wire loop (or a damp splint) into the sample, then hold it in a blue Bunsen flame and note the colour.</p>
{{B_FLAME}}
<table><tr><th>Ion</th><th>Flame colour</th></tr><tr><td>Lithium, Li^+^</td><td>Red (crimson)</td></tr><tr><td>Sodium, Na^+^</td><td>Yellow</td></tr><tr><td>Potassium, K^+^</td><td>Lilac</td></tr><tr><td>Calcium, Ca^2+^</td><td>Orange-red</td></tr><tr><td>Copper(II), Cu^2+^</td><td>Blue-green</td></tr></table>
<div class="key"><b>Exam tip</b>Sodium's strong yellow can hide other colours, and calcium's orange-red is easily confused with lithium's red. Use other tests to confirm.</div>`,
I("Can you tell similar-looking metal ions apart?",
`<p>Work in pairs with the cation tables.</p><ol><li>Aluminium and zinc both give a white precipitate with NaOH that dissolves in excess. Plan a second test to tell them apart.</li><li>Do the same for calcium and aluminium (white precipitates with NaOH).</li><li>Copper(II) and iron(II) salts are both coloured. Plan tests that separate them.</li><li>Test your plan on unknown solutions provided.</li></ol>`,
`<p><b>Test.</b> Add NaOH dropwise to a spotting tile of each solution, then in excess. Repeat with aqueous ammonia. Record colours in a table.</p><p><b>Flame tests.</b> Test each solution with a clean wire loop. Dip the loop in dilute acid between samples.</p><p><b>Identify.</b> Use all the results together to name each cation. Explain which test was the best to separate zinc from aluminium.</p>`,
null),
[["State the colour of the precipitate formed when NaOH is added to a solution containing Fe^3+^ ions.","Red-brown (1).",1],
["A solution of a salt gives a light blue precipitate with NaOH. In excess ammonia the precipitate dissolves giving a dark blue solution. Name the cation.","Copper(II) (1).",1],
["Describe how you could tell a solution of zinc ions from a solution of aluminium ions.","Add aqueous ammonia (1). Zinc: white precipitate dissolves in excess (1). Aluminium: white precipitate does not dissolve in excess (1).",3],
["Describe the test for ammonium ions.","Add sodium hydroxide and warm (1). Ammonia is given off (1) which turns damp red litmus paper blue (1).",3],
["Give the flame test colours for lithium ions and potassium ions.","Lithium red (1), potassium lilac (1).",2],
["Write the ionic equation for the formation of the precipitate when sodium hydroxide is added to copper(II) sulfate solution.","Cu^2+^(aq) + 2OH^-^(aq) → Cu(OH)~2~(s) (1 for species, 1 for state symbols/balancing).",2]],
[M("Which cation gives a green precipitate that turns red-brown on standing?",["Iron(II)","Copper(II)","Zinc","Calcium"],0,"Fe^2+^ gives a green precipitate which oxidises. Iron(III) gives a red-brown one straight away."),
M("Which ion gives a lilac flame?",["Sodium","Potassium","Calcium","Lithium"],1,"Potassium is lilac."),
M("Excess aqueous ammonia dissolves the precipitate and gives a dark blue solution with:",["Zn^2+^","Al^3+^","Cu^2+^","Fe^3+^"],2,"Copper(II) forms a deep blue complex."),
T("Which gas is given off when ammonium compounds are warmed with sodium hydroxide?",["ammonia"],"It turns damp red litmus paper blue."),
M("Which cation forms a white precipitate with NaOH that does NOT dissolve in excess?",["Aluminium","Calcium","Zinc","Chromium(III)"],1,"Calcium hydroxide is insoluble in excess."),
M("A yellow flame colour shows:",["Sodium","Potassium","Calcium","Copper"],0,"Sodium gives a yellow flame."),
M("Which cation gives a red-brown precipitate?",["Fe^2+^","Fe^3+^","Cr^3+^","Cu^2+^"],1,"Iron(III) hydroxide is red-brown.")],
[["Cu^2+^ with NaOH","Light blue precipitate."],
["Fe^2+^ and Fe^3+^ with NaOH","Fe^2+^ green precipitate. Fe^3+^ red-brown precipitate."],
["Al^3+^, Zn^2+^ and NaOH","White precipitates that dissolve in excess NaOH."],
["Separating Al^3+^ from Zn^2+^","Excess ammonia dissolves the zinc precipitate only."],
["Test for NH~4~^+^","Warm with NaOH. Ammonia turns damp red litmus blue."],
["Lilac flame","Potassium."],
["Orange-red flame","Calcium."],
["Blue-green flame","Copper(II)."]]);

BLESS.L123=L("Testing for gases","Standard tests for hydrogen, oxygen, carbon dioxide, ammonia and chlorine.",
`<h4>Why gas tests matter</h4>
<p>Gases are often given off in reactions and in the ion tests. Each common gas has a simple test that you must know. Always say <b>what you do</b> and <b>what you observe</b>.</p>
<p><b>Hydrogen, H~2~</b></p>
<p>Hold a <b>lighted splint</b> at the mouth of the test tube. Hydrogen burns with a <b>squeaky pop</b>. The pop is a tiny explosion as the hydrogen reacts with oxygen in the air to make water.</p>
<div class="ex"><b>Worked example</b>Zinc + hydrochloric acid → zinc chloride + hydrogen. Zn + 2HCl → ZnCl~2~ + H~2~. Test the gas with a lighted splint and listen for the pop.</div>
<p><b>Oxygen, O~2~</b></p>
<p>Put a <b>glowing splint</b> into the gas. Oxygen <b>relights</b> the splint. Oxygen is needed for burning, so it makes the splint burst back into flame.</p>
<h4>Carbon dioxide, CO~2~</h4>
<p>Bubble the gas through <b>limewater</b> (calcium hydroxide solution). A <b>white precipitate</b> makes the limewater go <b>milky or cloudy</b>. CO~2~ + Ca(OH)~2~ → CaCO~3~ + H~2~O.</p>
<div class="key"><b>Exam tip</b>Limewater is clear to start with. State that it turns milky, not just "cloudy" or "changes colour". If too much CO~2~ is bubbled in, the precipitate redissolves.</div>
<h4>Ammonia, NH~3~</h4>
<p>Hold <b>damp red litmus paper</b> in the gas. Ammonia is the only common <b>alkaline gas</b>, so the paper turns <b>blue</b>. It also has a sharp, choking smell, but you should never sniff gases in a test.</p>
<p><b>Chlorine, Cl~2~</b></p>
<p>Hold <b>damp litmus paper</b> in the gas. Chlorine turns it <b>white (bleached)</b>. Chlorine may turn the paper red briefly first because it forms an acidic solution, and then it bleaches the paper. Chlorine is a <b>pale green, poisonous gas</b>.</p>
<p><b>Sulfur dioxide, SO~2~</b></p>
<p>Hold a piece of filter paper soaked in <b>acidified potassium manganate(VII)</b> in the gas. It turns from <b>purple to colourless</b>. SO~2~ is a choking, poisonous gas.</p>
<table><tr><th>Gas</th><th>Test</th><th>Positive result</th></tr><tr><td>Hydrogen</td><td>Lighted splint</td><td>Squeaky pop</td></tr><tr><td>Oxygen</td><td>Glowing splint</td><td>Relights</td></tr><tr><td>Carbon dioxide</td><td>Limewater</td><td>Turns milky</td></tr><tr><td>Ammonia</td><td>Damp red litmus paper</td><td>Turns blue</td></tr><tr><td>Chlorine</td><td>Damp litmus paper</td><td>Bleached white</td></tr><tr><td>Sulfur dioxide</td><td>Acidified KMnO~4~</td><td>Purple to colourless</td></tr></table>
<div class="key"><b>Exam tip</b>Learn each test as a pair: the reagent AND the result. A mark is lost for a result with no test.</div>`,
I("Can you identify an unknown gas from the way it behaves?",
`<p>Work in groups. Your teacher produces four gases in sealed tubes, labelled W to Z.</p><ol><li>Choose the order of tests that avoids wasting any gas.</li><li>Carry out each test and record exactly what you see.</li><li>Identify each gas and write the word equation for one reaction that makes it.</li><li>Explain which tests would also detect more than one gas.</li></ol>`,
`<p><b>Make the gases.</b> Hydrogen from magnesium and dilute acid, carbon dioxide from marble chips and acid, oxygen from hydrogen peroxide with manganese(IV) oxide. Collect each in a test tube and stopper it.</p><p><b>Test.</b> Apply the tests in the table. Write a full sentence for each result.</p><p><b>Check.</b> Why is damp litmus used and not dry? Discuss the role of water in the chlorine and ammonia tests.</p>`,
null),
[["Describe the test for hydrogen and the positive result.","Lighted splint (1) gives a squeaky pop (1).",2],
["Describe the test for oxygen.","Glowing splint (1) relights (1).",2],
["A gas turns limewater milky. Name the gas and the white precipitate.","Carbon dioxide (1). Calcium carbonate (1).",2],
["Describe the test for ammonia.","Damp red litmus paper (1) turns blue (1).",2],
["State what happens to damp litmus paper in chlorine gas.","It is bleached white (1).",1],
["Name the gas which turns acidified potassium manganate(VII) from purple to colourless.","Sulfur dioxide (1).",1]],
[M("A lighted splint gives a squeaky pop. The gas is:",["Oxygen","Hydrogen","Carbon dioxide","Chlorine"],1,"The pop is hydrogen burning."),
M("Which gas relights a glowing splint?",["Hydrogen","Nitrogen","Oxygen","Ammonia"],2,"Oxygen supports combustion."),
M("Which gas turns damp red litmus blue?",["Chlorine","Ammonia","Carbon dioxide","Hydrogen"],1,"Ammonia is alkaline."),
T("What is the name of the solution used to test for carbon dioxide?",["limewater","lime water"],"It turns milky."),
M("Which gas bleaches damp litmus paper?",["Chlorine","Oxygen","Sulfur dioxide","Hydrogen"],0,"Chlorine bleaches damp litmus."),
M("Limewater turns milky because it forms:",["Calcium hydroxide","Calcium carbonate","Calcium oxide","Calcium chloride"],1,"CO~2~ + Ca(OH)~2~ → CaCO~3~ + H~2~O."),
M("Acidified potassium manganate(VII) changes from purple to colourless in:",["CO~2~","SO~2~","H~2~","NH~3~"],1,"SO~2~ reduces the manganate(VII).")],
[["Test for hydrogen","Lighted splint: squeaky pop."],
["Test for oxygen","Glowing splint relights."],
["Test for carbon dioxide","Limewater turns milky."],
["Test for ammonia","Damp red litmus paper turns blue."],
["Test for chlorine","Damp litmus paper is bleached."],
["Test for sulfur dioxide","Acidified KMnO~4~ goes from purple to colourless."],
["Why does limewater go milky?","Calcium carbonate precipitate forms."],
["Colour of chlorine gas","Pale green."]]);
})();

SETL(4,[BLESS.L41,BLESS.L42,BLESS.L43,BLESS.L44]);
SETL(5,[BLESS.L51,BLESS.L52,BLESS.L53]);
SETL(12,["Apparatus, separation and purity",BLESS.L121,BLESS.L122,BLESS.L123]);
