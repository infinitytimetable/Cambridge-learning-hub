/* ===== Biology 0610, Topics 10 (Diseases and immunity), 11 (Gas exchange in humans), 12 (Respiration). Own notes, figures prefixed BE_ ===== */
const BE_FG=(vb,inner,cap,label,maxw)=>`<figure class="fig"${maxw?` style="max-width:${maxw}px"`:""}><svg viewBox="${vb}" role="img" aria-label="${label}">${inner}</svg><figcaption>${cap}</figcaption></figure>`;
const BE_T=(x,y,s,o)=>{o=o||{};return `<text x="${x}" y="${y}" font-size="${o.s||11}" text-anchor="${o.a||"middle"}"${o.b?' font-weight="700"':""}${o.i?' font-style="italic"':""} ${o.c?`style="fill:${o.c}"`:'fill="currentColor"'}>${s}</text>`};
const BE_ARR=(x1,y1,x2,y2,col,w)=>{const a=Math.atan2(y2-y1,x2-x1),h=7,c=col||"currentColor";
  return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="${w||2}" fill="none"/><path d="M${x2} ${y2}l${(-h*Math.cos(a-.45)).toFixed(1)} ${(-h*Math.sin(a-.45)).toFixed(1)}M${x2} ${y2}l${(-h*Math.cos(a+.45)).toFixed(1)} ${(-h*Math.sin(a+.45)).toFixed(1)}" stroke="${c}" stroke-width="${w||2}" fill="none" stroke-linecap="round"/>`};
const BE_BOX=(x,y,w,h,lines,o)=>{o=o||{};return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" ${o.f?`style="fill:${o.f}"`:'fill="none"'} stroke="currentColor" stroke-opacity=".6" stroke-width="1.4"/>`+lines.map((t,i)=>BE_T(x+w/2,y+h/2+4-(lines.length-1)*7+i*14,t,{s:o.s||11,b:i===0&&o.b})).join("")};

/* how pathogens are transmitted */
FIGS.BE_TRANS=()=>{
  let s=BE_BOX(10,10,190,34,["Direct contact"],{b:1,s:12,f:"var(--mint)"})+BE_BOX(220,10,190,34,["Indirect transmission"],{b:1,s:12,f:"var(--peach)"});
  const L=["blood and other body fluids","touching an infected person","sharing needles","sexual contact"],R=["contaminated surfaces","contaminated food and water","animals (for example mosquitoes)","droplets in the air"];
  L.forEach((t,i)=>{s+=`<circle cx="22" cy="${68+i*26}" r="3" style="fill:var(--accent)"/>`+BE_T(32,72+i*26,t,{a:"start",s:10.5})});
  R.forEach((t,i)=>{s+=`<circle cx="232" cy="${68+i*26}" r="3" style="fill:var(--amber)"/>`+BE_T(242,72+i*26,t,{a:"start",s:10.5})});
  s+=BE_T(105,178,"host to host, no go-between",{s:10,i:1})+BE_T(315,178,"via a surface, food, animal or air",{s:10,i:1});
  return BE_FG("0 0 420 186",s,"A transmissible disease passes from one host to another, either by direct contact or indirectly.","Two panels listing direct contact and indirect ways that pathogens are transmitted");
};

/* cholera mechanism */
FIGS.BE_CHOLERA=()=>{
  const b=(x,y,l,f)=>BE_BOX(x,y,180,46,l,{s:10.5,f:f});
  let s=b(10,10,["Drinking water","contaminated with bacteria"],"var(--peach)")+b(230,10,["Bacteria reach the","small intestine"])
   +b(230,86,["Toxin makes cells secrete","chloride ions (Cl^−^) into gut"])+b(10,86,["Water moves into the gut","by osmosis"])
   +b(10,162,["Watery diarrhoea"],"var(--peach)")+b(230,162,["Dehydration and loss","of ions from the blood"],"var(--peach)");
  s=s.replace(/Cl\^−\^/g,"Cl⁻");
  s+=BE_ARR(192,33,228,33)+BE_ARR(320,58,320,84)+BE_ARR(228,109,192,109)+BE_ARR(100,134,100,160)+BE_ARR(192,185,228,185);
  return BE_FG("0 0 420 216",s,"The cholera toxin starts a chain of events that ends in severe dehydration.","Flow chart of how cholera causes diarrhoea and dehydration");
};

/* body defences */
FIGS.BE_DEFENCE=()=>{
  let s=`<circle cx="26" cy="64" r="16" style="fill:var(--bad)" fill-opacity=".75" stroke="currentColor"/>`+BE_T(26,96,"pathogen",{s:10});
  const D=[["Skin","blocks","entry"],["Nose hairs","and mucus","trap germs"],["Stomach","acid","kills germs"],["White blood","cells","destroy germs"]];
  D.forEach((d,i)=>{const x=56+i*96;s+=BE_BOX(x,34,84,60,d,{b:1,s:10,f:i===3?"var(--mint)":""});if(i<3)s+=BE_ARR(x+85,64,x+95,64,"currentColor",1.6)});
  s+=BE_ARR(44,64,54,64,"currentColor",1.6);
  s+=BE_T(220,20,"Four lines of defence the body uses against pathogens",{s:11,b:1})+BE_T(220,118,"the first three stop pathogens entering or surviving; white blood cells deal with those that get in",{s:9.5,i:1});
  return BE_FG("0 0 440 126",s,"The body keeps most pathogens out. White blood cells are the defence inside the body.","A pathogen meeting skin, nose mucus, stomach acid and white blood cells in turn");
};

/* antigen and antibody */
FIGS.BE_ANTIBODY=()=>{
  let s=`<circle cx="70" cy="100" r="40" style="fill:var(--bad)" fill-opacity=".6" stroke="currentColor" stroke-width="1.5"/>`+BE_T(70,104,"pathogen",{s:10.5,b:1});
  s+=`<path d="M100 66 L118 66 L109 50 Z" style="fill:var(--amber)" stroke="currentColor" stroke-width="1.4"/>`+BE_T(122,48,"antigen",{a:"start",s:10.5,b:1})+BE_T(122,61,"(specific shape)",{a:"start",s:9.5,i:1});
  /* matching antibody */
  s+=`<path d="M240 190 L240 150 M240 150 L218 118 M240 150 L262 118" stroke="currentColor" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  s+=`<path d="M208 118 L214 108 L224 124 Z" style="fill:var(--accent)" stroke="currentColor" stroke-width="1.2"/>`;
  s+=BE_T(240,206,"antibody (a protein)",{s:10.5,b:1});
  s+=BE_T(250,28,"fits the antigen exactly:",{a:"start",s:10.5})+BE_T(250,41,"complementary shape",{a:"start",s:10.5,b:1});
  /* wrong antibody */
  s+=`<path d="M412 190 L412 160 M412 160 L400 138 M412 160 L424 138" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round" stroke-opacity=".55"/><rect x="393" y="128" width="14" height="10" style="fill:var(--accent)" fill-opacity=".5" stroke="currentColor" stroke-opacity=".6"/>`;
  s+=BE_T(436,206,"other antibody",{a:"end",s:10});
  s+=BE_ARR(150,90,208,112,"var(--good,#2a8)",1.8);
  s+=`<path d="M372 112 l12 12 M384 112 l-12 12" stroke="var(--bad)" stroke-width="2.5" stroke-linecap="round"/>`;
  s+=BE_T(396,86,"different shape:",{s:9.5,i:1})+BE_T(396,98,"does not bind",{s:9.5,i:1});
  return BE_FG("0 0 440 214",s,"Each antibody binds only to the antigen with a complementary shape. Binding destroys the pathogen directly or marks it for phagocytes.","A pathogen with a triangular antigen, a matching antibody that fits it, and a different antibody that does not fit");
};

/* vaccination graph */
FIGS.BE_VACC=()=>{
  let s=`<path d="M46 20 L46 150 L400 150" stroke="currentColor" stroke-width="1.6" fill="none"/>`;
  s+=`<path d="M60 148 C84 147 100 140 120 128 C140 118 156 134 190 146" stroke="var(--accent)" stroke-width="2.6" fill="none"/>`;
  s+=`<path d="M190 146 C198 146 204 120 214 70 C224 34 240 40 262 62 C290 88 330 120 392 142" stroke="var(--bad)" stroke-width="2.6" fill="none"/>`;
  s+=`<path d="M60 150 L60 156 M190 150 L190 156" stroke="currentColor" stroke-width="1.6"/>`;
  s+=BE_T(60,170,"1st dose",{s:10.5,b:1})+BE_T(190,170,"2nd dose or infection",{s:10.5,b:1});
  s+=BE_T(112,106,"slow and small",{s:10.5,c:"var(--accent)",b:1})+BE_T(112,119,"response",{s:10.5,c:"var(--accent)",b:1});
  s+=BE_T(340,34,"faster and bigger",{s:10.5,c:"var(--bad)",b:1})+BE_T(340,47,"response (memory cells)",{s:10.5,c:"var(--bad)",b:1});
  s+=`<text transform="translate(14 90) rotate(-90)" text-anchor="middle" font-size="10.5" fill="currentColor">antibody concentration</text>`+BE_T(225,190,"time",{s:10.5});
  return BE_FG("0 0 420 196",s,"Memory cells made after the first dose let the body respond faster and more strongly to the same pathogen later.","Graph of antibody concentration against time showing a small first response and a larger second response");
};

/* breathing system */
FIGS.BE_LUNGS=()=>{
  let s=`<path d="M60 90 C48 130 52 210 88 238 C120 256 170 240 184 212 C196 186 196 130 186 100 C170 70 80 56 60 90Z" style="fill:var(--bad)" fill-opacity=".2" stroke="currentColor" stroke-width="1.5"/>`;
  s+=`<path d="M360 90 C372 130 368 210 332 238 C300 256 250 240 236 212 C224 186 224 130 234 100 C250 70 340 56 360 90Z" style="fill:var(--bad)" fill-opacity=".2" stroke="currentColor" stroke-width="1.5"/>`;
  s+=`<rect x="203" y="28" width="14" height="86" rx="4" style="fill:var(--accent)" fill-opacity=".35" stroke="currentColor" stroke-width="1.5"/>`;
  for(let y=36;y<110;y+=9)s+=`<path d="M203 ${y} h14" stroke="currentColor" stroke-width="1.4"/>`;
  s+=`<path d="M210 114 L170 150 L150 186 M170 150 L186 192 M210 114 L250 150 L270 186 M250 150 L234 192" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  [[150,186],[186,192],[270,186],[234,192]].forEach(p=>{for(let k=0;k<3;k++)s+=`<circle cx="${p[0]+(k-1)*9}" cy="${p[1]+9+(k%2)*6}" r="5.5" style="fill:var(--amber)" fill-opacity=".8" stroke="currentColor" stroke-width="1"/>`});
  s+=`<path d="M64 262 Q210 214 356 262" stroke="currentColor" stroke-width="3" fill="none"/>`;
  s+=`<path d="M40 70 C20 130 30 210 70 262 M380 70 C400 130 390 210 350 262" stroke="currentColor" stroke-width="2" stroke-dasharray="5 4" fill="none" stroke-opacity=".6"/>`;
  s+=BE_T(210,20,"larynx",{s:10.5,b:1})+BE_T(262,62,"trachea (cartilage rings)",{a:"start",s:10.5})+`<path d="M218 62 L258 62" stroke="currentColor" stroke-width="1"/>`;
  s+=BE_T(300,128,"bronchus",{a:"start",s:10.5})+`<path d="M236 130 L296 126" stroke="currentColor" stroke-width="1"/>`;
  s+=BE_T(296,168,"bronchiole",{a:"start",s:10.5})+`<path d="M262 170 L292 166" stroke="currentColor" stroke-width="1"/>`;
  s+=BE_T(300,222,"alveoli",{a:"start",s:10.5})+`<path d="M278 202 L298 218" stroke="currentColor" stroke-width="1"/>`;
  s+=BE_T(8,22,"ribs and",{a:"start",s:10.5})+BE_T(8,35,"intercostal muscles",{a:"start",s:10.5});
  s+=BE_T(120,150,"lung",{s:10.5,b:1});
  s+=BE_T(210,282,"diaphragm",{s:10.5,b:1});
  return BE_FG("0 0 420 290",s,"Air passes through the larynx, trachea, bronchi and bronchioles to the alveoli. The ribs, intercostal muscles and diaphragm move air in and out.","Labelled diagram of the human breathing system showing larynx, trachea, bronchi, bronchioles, alveoli, lungs, ribs and diaphragm");
};

/* alveolus */
FIGS.BE_ALV=()=>{
  let s=`<circle cx="130" cy="110" r="76" style="fill:var(--mint)" fill-opacity=".55" stroke="currentColor" stroke-width="2"/>`;
  s+=`<path d="M214 40 C238 80 238 140 214 184" stroke="currentColor" stroke-width="2" fill="none"/><path d="M236 36 C262 80 262 144 236 188" stroke="currentColor" stroke-width="2" fill="none"/>`;
  s+=`<path d="M224 42 C246 82 246 142 224 186" style="stroke:var(--bad)" stroke-opacity=".25" stroke-width="22" fill="none"/>`;
  [[238,98],[244,120],[238,142]].forEach(p=>{s+=`<ellipse cx="${p[0]}" cy="${p[1]}" rx="8" ry="5" style="fill:var(--bad)" fill-opacity=".85"/>`});
  s+=BE_T(130,106,"air in the",{s:11,b:1})+BE_T(130,120,"alveolus",{s:11,b:1});
  s+=BE_ARR(196,64,250,64,"var(--accent)",2.4)+BE_T(190,56,"O₂",{s:11,b:1,c:"var(--accent)"});
  s+=BE_ARR(250,168,196,168,"var(--amber)",2.4)+BE_T(190,184,"CO₂",{s:11,b:1,c:"var(--amber)"});
  s+=BE_T(280,60,"capillary: good blood",{a:"start",s:10.5})+BE_T(280,73,"supply keeps the gradient",{a:"start",s:10.5});
  s+=BE_T(280,110,"wall one cell thick:",{a:"start",s:10.5})+BE_T(280,123,"short diffusion distance",{a:"start",s:10.5});
  s+=BE_T(280,172,"red blood cells carry",{a:"start",s:10.5})+BE_T(280,185,"oxygen away",{a:"start",s:10.5});
  s+=BE_T(130,208,"large surface area from millions of alveoli",{s:10.5,i:1});
  return BE_FG("0 0 420 216",s,"Oxygen diffuses from the air in the alveolus into the blood. Carbon dioxide diffuses from the blood into the alveolus.","An alveolus next to a capillary with arrows for oxygen entering the blood and carbon dioxide leaving");
};

/* goblet and ciliated cells */
FIGS.BE_CILIA=()=>{
  let s="";
  for(let i=0;i<6;i++){const x=40+i*58,g=i%2===1;
    if(g)s+=`<path d="M${x} 110 L${x+8} 90 C${x+8} 80 ${x+36} 80 ${x+36} 90 L${x+44} 110 L${x+44} 150 L${x} 150Z" style="fill:var(--amber)" fill-opacity=".6" stroke="currentColor" stroke-width="1.3"/>`;
    else{s+=`<rect x="${x}" y="100" width="44" height="50" rx="3" style="fill:var(--mint)" stroke="currentColor" stroke-width="1.3"/>`;for(let k=0;k<6;k++)s+=`<path d="M${x+5+k*7} 100 l${k%2?3:-3} -16" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`}}
  s+=`<rect x="30" y="52" width="352" height="12" rx="6" style="fill:var(--amber)" fill-opacity=".4"/>`;
  [[70,58],[140,58],[210,58],[300,58]].forEach(p=>{s+=`<circle cx="${p[0]}" cy="${p[1]}" r="3.4" style="fill:var(--bad)"/>`});
  s+=BE_ARR(150,36,330,36,"currentColor",2);
  s+=BE_T(240,26,"cilia sweep mucus up to the throat",{s:10.5,b:1});
  s+=BE_T(70,44,"trapped dust and bacteria",{s:9.5,i:1,a:"start"});
  s+=BE_T(70,174,"ciliated cell",{s:10.5,b:1})+BE_T(128,188,"goblet cell: makes mucus",{s:10.5,b:1,c:"var(--amber)"});
  return BE_FG("0 0 420 196",s,"Goblet cells make sticky mucus that traps particles and pathogens. Ciliated cells beat their cilia to move the mucus away from the lungs.","Row of ciliated cells and goblet cells with a layer of mucus carrying trapped particles upward");
};

/* ventilation */
FIGS.BE_VENT=()=>{
  const panel=(x,inh)=>{
    let s=`<rect x="${x}" y="30" width="170" height="110" rx="14" fill="none" stroke="currentColor" stroke-width="2"/>`;
    const ry=inh?44:34;
    s+=`<ellipse cx="${x+85}" cy="${inh?78:80}" rx="${inh?58:46}" ry="${ry}" style="fill:var(--bad)" fill-opacity=".25" stroke="currentColor" stroke-width="1.4"/>`;
    s+=inh?`<path d="M${x+4} 140 L${x+166} 140" stroke="var(--accent)" stroke-width="4"/>`:`<path d="M${x+4} 140 Q${x+85} 108 ${x+166} 140" stroke="var(--accent)" stroke-width="4" fill="none"/>`;
    s+=BE_T(x+85,86,inh?"larger lungs":"smaller lungs",{s:10.5});
    s+=inh?BE_ARR(x+14,100,x+14,64,"currentColor",2)+BE_ARR(x+156,100,x+156,64,"currentColor",2):BE_ARR(x+14,60,x+14,96,"currentColor",2)+BE_ARR(x+156,60,x+156,96,"currentColor",2);
    s+=inh?BE_ARR(x+85,176,x+85,148,"var(--accent)",2):BE_ARR(x+85,150,x+85,176,"var(--accent)",2);
    s+=BE_T(x+85,194,inh?"diaphragm contracts, flattens":"diaphragm relaxes, domes up",{s:10});
    return s};
  let s=panel(10,true)+panel(240,false);
  s+=BE_T(95,18,"Breathing in",{s:12,b:1})+BE_T(325,18,"Breathing out",{s:12,b:1});
  s+=BE_T(95,210,"ribs up and out: volume up, pressure down",{s:10})+BE_T(325,210,"ribs down and in: volume down, pressure up",{s:10});
  return BE_FG("0 0 420 218",s,"Changes in thorax volume change the pressure, and air moves from higher pressure to lower pressure.","Two side-by-side diagrams of the chest during breathing in and breathing out");
};

/* inspired vs expired air */
FIGS.BE_COMP=()=>{
  const rows=[["Oxygen",21,16],["Carbon dioxide",.04,4]];
  let s=BE_T(10,16,"Percentage of dry air that is oxygen or carbon dioxide",{a:"start",s:11,b:1});
  s+=`<path d="M110 26 V150 M110 150 H400" stroke="currentColor" stroke-width="1.4" fill="none"/>`;
  [0,5,10,15,20,25].forEach(v=>{const x=110+v*11.6;s+=`<path d="M${x} 150 v5" stroke="currentColor"/>`+BE_T(x,168,v+"",{s:9.5})});
  s+=BE_T(255,184,"percentage (%)",{s:10});
  rows.forEach((r,i)=>{const y=34+i*60;
    s+=BE_T(104,y+16,r[0],{a:"end",s:10.5,b:1});
    s+=`<rect x="110" y="${y}" width="${Math.max(2,r[1]*11.6)}" height="20" style="fill:var(--accent)" fill-opacity=".8"/>`+BE_T(116+r[1]*11.6,y+14,"inspired "+r[1]+"%",{a:"start",s:9.5});
    s+=`<rect x="110" y="${y+22}" width="${Math.max(2,r[2]*11.6)}" height="20" style="fill:var(--amber)" fill-opacity=".85"/>`+BE_T(116+r[2]*11.6,y+36,"expired "+(r[2]===16?"about 16":"about 4")+"%",{a:"start",s:9.5})});
  s+=BE_T(10,152,"Water vapour:",{a:"start",s:9.5,b:1});
  return BE_FG("0 0 420 192",s.replace(BE_T(10,152,"Water vapour:",{a:"start",s:9.5,b:1}),""),"Expired air has less oxygen, much more carbon dioxide and more water vapour than inspired air. Nitrogen stays about the same.","Bar chart comparing oxygen and carbon dioxide percentages in inspired and expired air");
};

/* exercise and breathing rate */
FIGS.BE_EXER=()=>{
  let s=`<path d="M50 20 V150 H400" stroke="currentColor" stroke-width="1.6" fill="none"/>`;
  s+=`<path d="M50 118 L130 118 L150 112 C170 70 190 52 230 50 L280 50 C310 52 330 84 350 106 C370 116 380 118 398 118" stroke="var(--accent)" stroke-width="2.8" fill="none"/>`;
  s+=`<path d="M135 150 V20 M280 150 V20" stroke="currentColor" stroke-dasharray="4 4" stroke-opacity=".6"/>`;
  s+=BE_T(90,36,"rest",{s:11,b:1})+BE_T(208,36,"exercise",{s:11,b:1})+BE_T(340,36,"recovery",{s:11,b:1});
  s+=BE_T(90,138,"15 per min",{s:10})+BE_T(232,74,"about 40 per min",{s:10})+
  `<text transform="translate(14 90) rotate(-90)" text-anchor="middle" font-size="10.5" fill="currentColor">breathing rate (breaths per minute)</text>`+BE_T(225,170,"time",{s:10.5});
  return BE_FG("0 0 420 178",s,"Breathing rate rises during exercise because carbon dioxide builds up in the blood, then returns to normal in recovery.","Graph of breathing rate against time showing a rise during exercise and a return to rest levels");
};

/* uses of energy */
FIGS.BE_USES=()=>{
  const L=["muscle contraction","protein synthesis","cell division"],R=["active transport","growth","nerve impulses"];
  let s=BE_BOX(150,84,120,52,["Energy","released by","respiration"],{b:1,s:11,f:"var(--mint)"});
  L.forEach((t,i)=>{s+=BE_BOX(8,14+i*68,122,40,[t],{s:10.5});s+=BE_ARR(150,110,132,34+i*68,"currentColor",1.4)});
  R.forEach((t,i)=>{s+=BE_BOX(290,14+i*68,122,40,[t],{s:10.5});s+=BE_ARR(270,110,288,34+i*68,"currentColor",1.4)});
  s+=BE_BOX(120,208,180,34,["constant body temperature"],{s:10.5});s+=BE_ARR(210,138,210,206,"currentColor",1.4);
  return BE_FG("0 0 420 250",s,"The energy released in respiration is used for many life processes, including keeping body temperature steady.","Respiration in the centre with seven uses of energy around it");
};

/* aerobic respiration */
FIGS.BE_AERO=()=>{
  let s=BE_BOX(8,30,92,50,["glucose","C₆H₁₂O₆"],{b:1,s:10.5})+BE_T(113,60,"+",{s:18,b:1})+BE_BOX(124,30,76,50,["oxygen","6O₂"],{b:1,s:10.5});
  s+=BE_ARR(206,55,244,55,"currentColor",2.4)+BE_T(225,44,"cells",{s:9.5,i:1});
  s+=BE_BOX(250,22,90,36,["carbon dioxide","6CO₂"],{b:1,s:10,f:"var(--peach)"})+BE_T(354,44,"+",{s:16,b:1})+BE_BOX(364,22,50,36,["water","6H₂O"],{b:1,s:9.5,f:"var(--peach)"});
  s+=BE_BOX(250,66,164,26,["+ energy released"],{b:1,s:11,f:"var(--mint)"});
  s+=BE_T(210,122,"Word equation: glucose + oxygen → carbon dioxide + water",{s:11});
  s+=BE_T(210,140,"Respiration happens in every living cell, all the time.",{s:10.5,i:1});
  return BE_FG("0 0 420 150",s,"Aerobic respiration uses oxygen to break down glucose and release energy.","Equation diagram for aerobic respiration");
};

/* yeast temperature investigation */
FIGS.BE_YEAST=()=>{
  let s=`<rect x="14" y="62" width="120" height="104" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 84 H132" stroke="var(--accent)" stroke-width="3" stroke-opacity=".6"/>`;
  s+=`<rect x="52" y="30" width="40" height="120" rx="8" style="fill:var(--amber)" fill-opacity=".35" stroke="currentColor" stroke-width="1.8"/>`;
  [[66,110],[76,98],[70,86],[80,120]].forEach(p=>s+=`<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="none" stroke="currentColor" stroke-width="1.2"/>`);
  s+=`<path d="M72 30 V14 H112" stroke="currentColor" stroke-width="2" fill="none"/><rect x="108" y="8" width="24" height="12" style="fill:var(--accent)" fill-opacity=".4" stroke="currentColor"/>`;
  s+=BE_T(72,176,"yeast + glucose",{s:9.5})+BE_T(72,188,"in a water bath",{s:9.5})+BE_T(140,34,"bubbles counted",{a:"start",s:9.5})+BE_T(140,46,"per minute",{a:"start",s:9.5});
  s+=`<path d="M230 24 V150 H416" stroke="currentColor" stroke-width="1.6" fill="none"/>`;
  s+=`<path d="M236 144 C270 140 300 120 332 62 C348 40 354 42 362 48 C376 62 386 122 408 146" stroke="var(--accent)" stroke-width="2.8" fill="none"/>`;
  s+=BE_T(330,34,"optimum",{s:10,b:1})+BE_T(420,60,"enzymes",{a:"end",s:9.5,i:1})+BE_T(420,72,"denatured",{a:"end",s:9.5,i:1});
  s+=`<text transform="translate(212 90) rotate(-90)" text-anchor="middle" font-size="10" fill="currentColor">rate of respiration</text>`+BE_T(322,170,"temperature (°C)",{s:10});
  return BE_FG("0 0 430 196",s,"Respiration in yeast speeds up as temperature rises to an optimum, then falls as enzymes denature.","Yeast respiration apparatus in a water bath and a graph of rate against temperature");
};

/* anaerobic respiration */
FIGS.BE_ANAER=()=>{
  let s=BE_T(210,16,"Anaerobic respiration: no oxygen used",{s:12,b:1});
  s+=BE_T(10,44,"Yeast",{a:"start",s:11,b:1})+BE_BOX(60,28,80,32,["glucose"],{s:10.5})+BE_ARR(142,44,176,44)+BE_BOX(180,28,70,32,["ethanol"],{s:10.5,f:"var(--peach)"})+BE_T(262,48,"+",{s:15,b:1})+BE_BOX(274,28,92,32,["carbon dioxide"],{s:10,f:"var(--peach)"});
  s+=BE_T(10,102,"Muscle",{a:"start",s:11,b:1})+BE_BOX(60,86,80,32,["glucose"],{s:10.5})+BE_ARR(142,102,176,102)+BE_BOX(180,86,90,32,["lactic acid"],{s:10.5,f:"var(--peach)"});
  s+=BE_T(10,150,"Much less energy is released per glucose than in aerobic respiration.",{a:"start",s:10.5,i:1});
  return BE_FG("0 0 420 160",s,"Yeast makes ethanol and carbon dioxide. Muscle cells make lactic acid. Both release much less energy than aerobic respiration.","Two flow diagrams for anaerobic respiration in yeast and in muscle");
};

/* oxygen debt */
FIGS.BE_DEBT=()=>{
  let s=`<path d="M50 20 V150 H400" stroke="currentColor" stroke-width="1.6" fill="none"/>`;
  s+=`<path d="M135 150 V20 M240 150 V20" stroke="currentColor" stroke-dasharray="4 4" stroke-opacity=".6"/>`;
  s+=`<path d="M135 60 L240 60" stroke="var(--bad)" stroke-width="2" stroke-dasharray="6 4"/>`;
  s+=`<path d="M240 118 C262 96 300 112 332 112 C340 112 350 112 360 118 L240 118Z" style="fill:var(--amber)" fill-opacity=".45"/>`;
  s+=`<path d="M50 118 L135 118 C150 112 160 100 190 92 L240 90 C262 90 276 108 300 112 C324 116 350 118 396 118" stroke="var(--accent)" stroke-width="2.8" fill="none"/>`;
  s+=BE_T(92,36,"rest",{s:11,b:1})+BE_T(188,36,"vigorous exercise",{s:11,b:1})+BE_T(320,36,"recovery",{s:11,b:1});
  s+=BE_T(188,54,"oxygen needed",{s:9.5,c:"var(--bad)"})+BE_T(200,114,"oxygen taken in",{s:9.5,c:"var(--accent)"});
  s+=BE_T(312,138,"oxygen debt repaid",{s:9.5,b:1});
  s+=`<text transform="translate(14 90) rotate(-90)" text-anchor="middle" font-size="10.5" fill="currentColor">oxygen uptake</text>`+BE_T(225,170,"time",{s:10.5});
  return BE_FG("0 0 420 178",s,"During vigorous exercise oxygen uptake cannot meet demand, so an oxygen debt builds up. Extra oxygen taken in afterwards repays it.","Graph of oxygen uptake over time showing the oxygen debt during exercise and its repayment during recovery");
};

/* ================= TOPIC 10 ================= */
const BE_L101=L("Pathogens, transmission and control of disease","What pathogens are, how they pass from host to host, how we control their spread, and how cholera causes illness.",
`<h4>Pathogens and transmissible diseases</h4>
<p>A <b>pathogen</b> is an organism that causes disease. Bacteria, viruses, fungi and some single-celled organisms can all be pathogens.</p>
<p>A <b>transmissible disease</b> is one in which the pathogen can be passed from one host to another. A cold, flu, cholera and HIV are transmissible. A disease caused by a faulty gene or by a poor diet is not.</p>
<div class="key"><b>Key words</b>Pathogen = the disease-causing organism. Transmissible = the pathogen can pass between hosts. Do not call the disease itself a pathogen.</div>
<h4>How pathogens are transmitted</h4>
<p>Pathogens spread in two main ways.</p>
{{BE_TRANS}}
<ul><li><b>Direct contact:</b> the pathogen passes straight from an infected person to another, including through blood and other body fluids. HIV spreads this way, for example when needles are shared.</li>
<li><b>Indirect transmission:</b> the pathogen passes through something in between: contaminated surfaces, food or water, animals, or the air. Animals that carry a pathogen from host to host include mosquitoes, which carry the malaria parasite. Flu viruses travel in tiny droplets in the air when people cough and sneeze.</li></ul>
<h4>Controlling the spread of disease</h4>
<p>Many diseases can be controlled without any medicine, simply by stopping pathogens reaching a new host.</p>
<table><tr><th>Control measure</th><th>How it reduces the spread</th></tr>
<tr><td>Clean water supply</td><td>Water is treated so it does not contain pathogens such as the cholera bacterium.</td></tr>
<tr><td>Hygienic food preparation</td><td>Washing hands, keeping raw and cooked food apart, cooking food thoroughly and storing it cold stop pathogens reaching and growing in food.</td></tr>
<tr><td>Good personal hygiene</td><td>Washing hands, covering the mouth when coughing and washing wounds remove or block pathogens.</td></tr>
<tr><td>Waste disposal</td><td>Rubbish and faeces are removed so they cannot attract animals that carry pathogens or contaminate water.</td></tr>
<tr><td>Sewage treatment</td><td>Sewage is treated before release so the pathogens it contains do not reach drinking water. You do not need to know the stages.</td></tr></table>
<h4>Cholera (Extended)</h4>
<p>Cholera is caused by a <b>bacterium</b> that is transmitted in <b>contaminated water</b>. When the bacteria reach the small intestine they make a <b>toxin</b>. The toxin makes the cells lining the intestine <b>secrete chloride ions</b> into the gut. Water then moves into the gut from the blood <b>by osmosis</b>.</p>
{{BE_CHOLERA}}
<p>The result is <b>watery diarrhoea</b>. The patient loses water and ions from the blood, so becomes <b>dehydrated</b>. This can be fatal, which is why a clean water supply and treated sewage are so important. Patients are treated by replacing the lost water and ions.</p>
<div class="ex"><b>Worked example</b>Explain why people with cholera become dehydrated.<br>The toxin makes cells secrete chloride ions into the gut (1). Water moves into the gut by osmosis (1). This water is lost as diarrhoea, so the body loses water and ions (1).</div>`,
I("How could a disease spread through a whole school, and which simple actions would stop it?",
`<ol><li>Choose a transmissible disease such as flu or a stomach bug. Name its pathogen type.</li><li>List every way the pathogen could pass between two students: direct and indirect.</li><li>For each route, suggest one action that would break the chain.</li><li>Decide which single action you think would be most effective, and give a reason.</li></ol>`,
`<p><b>Spreading a "pathogen" model.</b> Give each student a cup of clear liquid. One cup contains a little sodium hydroxide solution (the "pathogen"); the teacher knows who has it. Students swap a small amount of liquid with three different people, then add a drop of phenolphthalein. Pink cups show who was infected.</p><ol><li>Record who was infected after each round of swapping.</li><li>Work backwards to find the first host.</li><li>Repeat with a rule that stops one route (for example, no swapping with the same person twice) and compare the spread.</li></ol>`,
["https://phet.colorado.edu/en/simulations/gene-expression-basics","PhET: Gene Expression Basics (optional extension on how cells make proteins such as toxins)"]),
[["Define the terms pathogen and transmissible disease.","A pathogen is a disease-causing organism (1). A transmissible disease is one where the pathogen can be passed from one host to another (1).",2],
["Describe two ways in which a pathogen can be transmitted indirectly.","Any two: from contaminated surfaces; food or water; animals; the air (2).",2],
["Explain how a clean water supply helps to control the spread of disease.","Treated water does not contain pathogens (1) so people cannot be infected by drinking it (1).",2],
["Describe two ways in which hygienic food preparation reduces the spread of disease.","Any two: washing hands; keeping raw and cooked food separate; cooking food thoroughly; storing food cold; clean surfaces (2).",2],
["Explain how the cholera bacterium causes diarrhoea. (Extended)","The bacterium makes a toxin (1) that causes secretion of chloride ions into the small intestine (1). Water moves into the gut by osmosis (1) causing diarrhoea (1).",4]],
[M("What is a pathogen?",["A type of medicine","A disease-causing organism","A white blood cell","A harmless microbe"],1,"A pathogen causes disease."),
M("Which is an example of direct transmission?",["Drinking contaminated water","Breathing in droplets","Sharing needles that contain infected blood","Eating undercooked food"],2,"Blood and body fluids pass the pathogen directly from one person to another."),
M("Which disease is transmitted in contaminated water?",["Influenza","Cholera","Malaria","HIV"],1,"The cholera bacterium is spread in contaminated water."),
M("Which is NOT a way of controlling the spread of disease?",["Sewage treatment","Waste disposal","Washing hands","Eating more protein"],3,"Eating more protein does not stop pathogens spreading."),
T("What do cholera bacteria produce that causes the symptoms?",["toxin"],"The toxin makes cells secrete chloride ions."),
M("What moves into the gut by osmosis in cholera?",["Glucose","Water","Oxygen","Antibodies"],1,"Water follows the chloride ions into the gut."),
M("A mosquito carries a pathogen from person to person. This is",["direct transmission","indirect transmission by an animal","a non-transmissible disease","a body defence"],1,"The animal is the go-between."),
M("Why is dehydration dangerous in cholera?",["The blood becomes too watery","The body loses water and ions from the blood","The body makes too many antibodies","The gut stops absorbing oxygen"],1,"Water and ions are lost in diarrhoea.")],
[["Pathogen","A disease-causing organism."],
["Transmissible disease","A disease whose pathogen can pass from one host to another."],
["Direct transmission","Passing a pathogen straight from host to host, for example through blood or body fluids."],
["Indirect transmission","Spread by contaminated surfaces, food, animals or air."],
["Four ways to control the spread of disease","Clean water, hygienic food preparation, personal hygiene, waste disposal and sewage treatment."],
["Cause and transmission of cholera","A bacterium, transmitted in contaminated water."],
["What does the cholera toxin do?","Makes the gut secrete chloride ions."],
["Why does cholera cause dehydration?","Water moves into the gut by osmosis and is lost as diarrhoea, along with ions."]]);

const BE_L102=L("Body defences and immunity","How the body keeps pathogens out, how antibodies work, and how vaccination gives long-term protection.",
`<h4>Body defences</h4>
<p>Most pathogens never make us ill because the body has several defences.</p>
{{BE_DEFENCE}}
<ul><li><b>Skin:</b> a barrier that stops most pathogens getting in.</li><li><b>Hairs in the nose and mucus:</b> trap dust and pathogens in the air we breathe.</li><li><b>Stomach acid:</b> kills most pathogens that are swallowed in food or mucus.</li><li><b>White blood cells:</b> destroy pathogens that get into the body. Some engulf and digest them (phagocytes). Others make antibodies.</li></ul>
<h4>Antigens and antibodies (Extended)</h4>
<p>Every pathogen has its own <b>antigens</b>: molecules on its surface with a specific shape. White blood cells called <b>lymphocytes</b> respond by making <b>antibodies</b>, which are <b>proteins</b>.</p>
{{BE_ANTIBODY}}
<p>An antibody has a shape that is <b>complementary</b> to one antigen only, so each antibody is specific to its pathogen. When it binds, it can <b>destroy the pathogen directly</b> or <b>mark it so that phagocytes destroy it</b>.</p>
<h4>Active immunity and vaccination (Extended)</h4>
<p><b>Active immunity</b> is defence against a pathogen by antibodies that the body makes itself. It is gained after an <b>infection</b> by the pathogen, or by <b>vaccination</b>.</p>
<ol><li>A vaccine puts <b>weakened pathogens or their antigens</b> into the body.</li><li>The antigens <b>stimulate an immune response</b>: lymphocytes make antibodies.</li><li><b>Memory cells</b> are produced. If the real pathogen enters later, they make antibodies very quickly, giving <b>long-term immunity</b>.</li></ol>
{{BE_VACC}}
<p>Vaccination controls the spread of disease. If a large proportion of people are immune, the pathogen finds few hosts to infect, so it passes on much less often, which also protects people who cannot be vaccinated.</p>
<h4>Passive immunity (Extended)</h4>
<p><b>Passive immunity</b> is short-term defence by antibodies that come from another individual. A baby receives antibodies from its mother <b>across the placenta</b> and in <b>breast milk</b>. Breast-feeding is important because it supplies antibodies while the baby's own immune system is still developing.</p>
<table><tr><th></th><th>Active immunity</th><th>Passive immunity</th></tr>
<tr><td>Antibodies made by</td><td>the person's own lymphocytes</td><td>another individual</td></tr>
<tr><td>Memory cells</td><td>produced</td><td>not produced</td></tr>
<tr><td>How long it lasts</td><td>long term</td><td>short term</td></tr>
<tr><td>Examples</td><td>after infection; vaccination</td><td>placenta; breast milk</td></tr></table>
<div class="key"><b>Exam tip</b>Say that antibodies have a shape complementary to the antigen. Do not say the antibody "kills" without saying how, and do not say vaccines contain antibodies.</div>`,
I("Why can you catch a cold many times but chickenpox usually only once?",
`<ol><li>Write what you already know about how the body fights a pathogen the first time.</li><li>Predict what is different the second time you meet the same pathogen.</li><li>Draw a quick graph of antibody level against time for a first and a second infection.</li><li>Suggest why a cold virus can still make you ill again.</li></ol>`,
`<p><b>Lock-and-key antibody model.</b> Cut out card pathogens with different shaped antigens (triangle, square, circle, star). Cut out several antibodies, each with a notch that fits one shape only.</p><ol><li>Match each antibody to the pathogen it can bind.</li><li>Record which antibodies could not bind to any antigen and explain why.</li><li>Act out a vaccination: introduce a "weakened pathogen", then show how memory cells would respond to the real one.</li></ol>`,
["https://www.cdc.gov/vaccines/index.html","CDC: how vaccines work (reading support)"]),
[["State two body defences against pathogens.","Any two: skin; hairs in the nose; mucus; stomach acid; white blood cells (2).",2],
["Explain how stomach acid helps to protect the body.","The acid kills pathogens (1) that are swallowed in food or mucus (1).",2],
["Describe what an antibody is and how it destroys a pathogen. (Extended)","A protein (1) with a shape complementary to the antigen (1) that binds to the antigen and destroys the pathogen directly or marks it for phagocytes (1).",3],
["Outline how vaccination gives long-term immunity. (Extended)","Weakened pathogens or antigens are put into the body (1). Antigens stimulate lymphocytes to make antibodies (1). Memory cells are produced (1) which respond quickly if the pathogen returns (1).",4],
["Give two differences between active and passive immunity. (Extended)","Active: own antibodies, long term, memory cells made. Passive: antibodies from another person, short term, no memory cells. Any two (2).",2]],
[M("Which is a body defence against pathogens?",["Insulin","Stomach acid","Chlorophyll","Urea"],1,"Stomach acid kills pathogens."),
M("What do phagocytes do?",["Make antibodies","Engulf and digest pathogens","Carry oxygen","Make mucus"],1,"Phagocytes engulf and digest pathogens."),
M("Antibodies are",["lipids","carbohydrates","proteins","salts"],2,"Antibodies are proteins."),
M("Why is each antibody specific?",["It is very large","It has a shape complementary to one antigen","It is made in the liver","It is made of fat"],1,"Complementary shape fits one antigen only."),
T("Name the cells that remain after vaccination and make antibodies quickly if the pathogen returns.",["memory cells","memory cell"],"Memory cells give long-term immunity."),
M("Which gives passive immunity?",["A vaccination","Having chickenpox","Antibodies in breast milk","A white blood cell"],2,"Breast milk contains antibodies from the mother."),
M("Which is true of passive immunity?",["Memory cells are produced","It lasts a short time","It is always gained by vaccination","The body makes the antibodies itself"],1,"It is short term and no memory cells are made."),
M("What does a vaccine contain?",["Antibodies","Weakened pathogens or their antigens","Phagocytes","Antibiotics"],1,"The antigens stimulate the immune response.")],
[["Four body defences","Skin, nose hairs and mucus, stomach acid, white blood cells."],
["Antigen","A molecule on a pathogen with a specific shape."],
["Antibody","A protein made by lymphocytes that binds to a specific antigen."],
["How do antibodies help?","They destroy pathogens directly or mark them for phagocytes."],
["Active immunity","Defence by antibodies the body makes itself, after infection or vaccination."],
["Vaccination","Weakened pathogens or antigens stimulate lymphocytes and memory cells form."],
["Passive immunity","Short-term defence from antibodies from another person, with no memory cells."],
["Why is breast-feeding important?","It supplies antibodies to the baby: passive immunity."]]);

const BE_Q10=[
M("A disease-causing organism is called a",["host","pathogen","vaccine","antibody"],1,"A pathogen causes disease."),
M("Which is an indirect way of spreading a pathogen?",["Contact with blood","Contaminated food","Contact with body fluids","Touching an infected person"],1,"Contaminated food is an indirect route."),
M("Which is a physical barrier against pathogens?",["Skin","Antibodies","Memory cells","Vaccines"],0,"Skin blocks pathogens."),
T("Name the type of cell that engulfs and digests pathogens.",["phagocyte","white blood cell"],"Phagocytes engulf pathogens."),
M("Cholera is spread mainly by",["the air","contaminated water","mosquitoes","blood"],1,"Cholera bacteria are spread in contaminated water."),
M("Memory cells are made during",["passive immunity only","active immunity","digestion","breathing"],1,"Active immunity makes memory cells."),
M("Antibodies have a shape that is",["identical to the pathogen","complementary to an antigen","random","the same for every pathogen"],1,"They fit one specific antigen."),
M("Which gives a baby passive immunity?",["Vaccination","Breast milk","Memory cells","Antibiotics"],1,"Antibodies pass in breast milk.")];
const BE_P10=[
P("Spreading disease and keeping clean",6,"<p>A school canteen had an outbreak of a stomach disease caused by bacteria.</p><ol type='a'><li>State what is meant by a <b>pathogen</b>. [1]</li><li>Describe <b>two</b> ways in which the bacteria could have passed from one student to another through the canteen. [2]</li><li>Explain how hygienic food preparation helps to stop the spread of the disease. [2]</li><li>State <b>one</b> other way of controlling the spread of disease in the school. [1]</li></ol>",
["(a) A disease-causing organism (1).","(b) Any two: contaminated food; contaminated surfaces; contaminated water; direct contact with infected students (2).","(c) Bacteria are not transferred to the food from hands, surfaces or raw food (1) and cooking or cold storage kills or stops bacteria multiplying (1).","(d) Good personal hygiene, for example washing hands (1)."],"Hub exam-style question (written for this hub), Topic 10"),
P("Cholera",5,"<p>Cholera is a disease caused by a bacterium.</p><ol type='a'><li>State how the cholera bacterium is transmitted. [1]</li><li>The bacterium makes a toxin in the small intestine. Explain how the toxin leads to diarrhoea. [3]</li><li>State <b>one</b> reason why people with cholera become dehydrated. [1]</li></ol>",
["(a) In contaminated water (1).","(b) The toxin causes chloride ions to be secreted into the gut (1). Water moves into the gut by osmosis (1) from the blood, giving watery diarrhoea (1).","(c) Water and ions are lost from the blood in the diarrhoea (1)."],"Hub exam-style question (written for this hub), Topic 10"),
P("Antibodies",6,"<p>The diagram shows an antibody next to a pathogen with an antigen of a particular shape.</p>"+FIGS.BE_ANTIBODY()+"<ol type='a'><li>State what an antibody is made of. [1]</li><li>Explain why this antibody will not bind to the antigens of other pathogens. [2]</li><li>Describe <b>two</b> ways in which antibodies help to destroy pathogens. [2]</li><li>State the name of the cells that make antibodies. [1]</li></ol>",
["(a) Protein (1).","(b) The antibody has a shape complementary to this antigen only (1) so it cannot fit the different shapes of other antigens (1).","(c) Antibodies bind to the pathogen and destroy it directly (1). They mark the pathogen so phagocytes destroy it (1).","(d) Lymphocytes (1)."],"Hub exam-style question (written for this hub), Topic 10"),
P("Vaccination and immunity",7,"<p>A child is given a vaccine against measles.</p><ol type='a'><li>Describe what a vaccine contains. [1]</li><li>Outline how vaccination protects the child from measles in the future. [3]</li><li>A newborn baby has some immunity to measles because the mother was immune. Explain how the baby gained this immunity. [2]</li><li>State why the immunity in (c) lasts only a short time. [1]</li></ol>",
["(a) Weakened pathogens or their antigens (1).","(b) The antigens stimulate lymphocytes to make antibodies (1). Memory cells are produced (1) which make antibodies quickly if the real pathogen enters (1).","(c) Antibodies passed from the mother across the placenta (1) and in breast milk (1).","(d) The baby did not make the antibodies or memory cells itself, so the antibodies are broken down and not replaced (1)."],"Hub exam-style question (written for this hub), Topic 10"),
P("Comparing active and passive immunity",5,"<p>The table below compares two types of immunity.</p><table><tr><th></th><th>Type A</th><th>Type B</th></tr><tr><td>Source of antibodies</td><td>Made by the person's own cells</td><td>From another person</td></tr><tr><td>Memory cells made?</td><td>Yes</td><td>No</td></tr></table><ol type='a'><li>Identify type A and type B. [2]</li><li>Give <b>one</b> example of how a person can gain each type. [2]</li><li>State which type lasts longer. [1]</li></ol>",
["(a) A is active immunity (1). B is passive immunity (1).","(b) Active: vaccination or infection (1). Passive: antibodies from breast milk or across the placenta (1).","(c) Type A / active immunity (1)."],"Hub exam-style question (written for this hub), Topic 10")];
BSET(10,[BE_L101,BE_L102],BE_Q10,BE_P10);

/* ================= TOPIC 11 ================= */
const BE_L111=L("The breathing system and gas exchange","The parts of the breathing system, why the alveoli are good gas exchange surfaces, and how the lungs are protected.",
`<h4>Features of a gas exchange surface</h4>
<p>Gas exchange is the movement of oxygen into the blood and carbon dioxide out of it. It happens by diffusion, so a good gas exchange surface has four features.</p>
<ul><li><b>Large surface area</b> so many molecules can cross at once.</li><li><b>Thin surface</b> so the diffusion distance is short.</li><li><b>Good blood supply</b> to carry gases away and keep the concentration gradient steep.</li><li><b>Good ventilation with air</b> so fresh air keeps the gradient high.</li></ul>
<h4>Parts of the breathing system</h4>
{{BE_LUNGS}}
<p>Air enters through the nose or mouth and passes down the <b>larynx</b>, the <b>trachea</b> and the two <b>bronchi</b>. Each bronchus divides into smaller <b>bronchioles</b> that end in tiny air sacs called <b>alveoli</b>. Each alveolus is wrapped in <b>capillaries</b>. The lungs sit inside the chest, protected by the <b>ribs</b>. <b>Intercostal muscles</b> lie between the ribs, and the <b>diaphragm</b> is a sheet of muscle below the lungs.</p>
<p><b>(Extended)</b> There are two sets of intercostal muscles: the <b>external</b> and <b>internal</b> intercostal muscles. The trachea is held open by rings of <b>cartilage</b>, which stop it collapsing when you breathe in.</p>
<h4>Gas exchange in the alveoli</h4>
{{BE_ALV}}
<p>Oxygen diffuses from the air in the alveolus into the blood. Carbon dioxide diffuses from the blood into the air in the alveolus and is breathed out. The alveoli have all four features of a good gas exchange surface:</p>
<table><tr><th>Feature</th><th>In the alveoli</th></tr>
<tr><td>Large surface area</td><td>Millions of tiny alveoli in each lung.</td></tr>
<tr><td>Thin surface</td><td>The wall of an alveolus and the wall of a capillary are each one cell thick.</td></tr>
<tr><td>Good blood supply</td><td>A dense network of capillaries brings blood low in oxygen and takes oxygen away.</td></tr>
<tr><td>Good ventilation</td><td>Breathing replaces the air, keeping oxygen high and carbon dioxide low inside the alveoli.</td></tr></table>
<h4>Protecting the breathing system (Extended)</h4>
<p>The air we breathe contains dust and pathogens. The lining of the trachea and bronchi has two types of cell that deal with them.</p>
{{BE_CILIA}}
<ul><li><b>Goblet cells</b> make sticky <b>mucus</b> that traps particles and pathogens.</li><li><b>Ciliated cells</b> have tiny hair-like cilia that beat and move the mucus up towards the throat, where it is swallowed.</li></ul>
<p>Smoke from tobacco damages the cilia, so mucus and trapped particles stay in the airways and can lead to coughing and infections.</p>
<div class="key"><b>Exam tip</b>Gas exchange happens in the alveoli, not in the bronchi or bronchioles. Always link a feature to its job: "thin wall, so a short diffusion distance".</div>`,
I("Why are the lungs spongy and full of tiny sacs instead of being two large balloons?",
`<ol><li>Imagine a lung that is one large balloon. Predict how much oxygen could cross its surface.</li><li>Predict what happens to the surface area if the balloon is replaced by hundreds of tiny balloons of the same total volume.</li><li>Write your ideas about why a thin wall and many capillaries also matter.</li><li>Decide how you could test your idea with a model.</li></ol>`,
`<p><b>Surface area model.</b> Use sugar cubes (or plasticine cubes) as "lungs". Compare one large cube with the same volume cut into many small cubes.</p><ol><li>Measure the length of each side and calculate the surface area of the large cube.</li><li>Calculate the total surface area of eight small cubes of half the side length.</li><li>Dissolve one large cube and eight small cubes in the same volume of water and time them.</li><li>Write a conclusion linking surface area to the speed of gas exchange.</li></ol><p>Optional: look at a prepared slide or photograph of lung tissue and draw an alveolus.</p>`,
["https://www.biodigital.com/","BioDigital: explore a 3D model of the human respiratory system (free account may be needed)"]),
[["State four features of a gas exchange surface.","Large surface area (1), thin surface (1), good blood supply (1), good ventilation with air (1).",4],
["Name the part of the breathing system that carries air from the larynx to the bronchi.","Trachea (1).",1],
["Explain how alveoli are adapted for gas exchange.","Many alveoli give a large surface area (1). Thin walls give a short diffusion distance (1). Many capillaries give a good blood supply (1).",3],
["State the function of the cartilage in the trachea. (Extended)","Keeps the trachea open / stops it collapsing (1).",1],
["Describe how goblet cells and ciliated cells protect the lungs. (Extended)","Goblet cells make mucus (1) that traps particles and pathogens (1). Ciliated cells move the mucus away from the lungs (1).",3]],
[M("Where does gas exchange take place in the lungs?",["Trachea","Bronchi","Alveoli","Larynx"],2,"The alveoli are the gas exchange surface."),
M("Which feature gives the alveoli a large surface area?",["Thin walls","Having very many tiny air sacs","Blood vessels","Mucus"],1,"Millions of alveoli."),
M("What are the tubes that divide from the trachea called?",["Alveoli","Bronchi","Capillaries","Cartilage"],1,"The trachea divides into two bronchi."),
M("What keeps the trachea open? (Extended)",["Cilia","Cartilage rings","Goblet cells","Alveoli"],1,"Cartilage rings."),
M("What do goblet cells make?",["Mucus","Cilia","Oxygen","Antibodies"],0,"Mucus traps particles."),
M("What do cilia do?",["Make mucus","Move mucus along the airway","Absorb oxygen","Squeeze the lungs"],1,"They beat and sweep the mucus."),
M("Why is a good blood supply important at the alveoli?",["To warm the air","To carry gases away and keep the concentration gradient steep","To make mucus","To strengthen the walls"],1,"The gradient keeps diffusion going."),
T("Name the small tubes that carry air to the alveoli.",["bronchioles","bronchiole"],"Bronchioles lead to the alveoli.")],
[["Four features of a gas exchange surface","Large surface area, thin, good blood supply, good ventilation."],
["Path of air to the alveoli","Larynx, trachea, bronchi, bronchioles, alveoli."],
["Where does gas exchange happen?","In the alveoli, by diffusion."],
["How thin is an alveolus wall?","One cell thick."],
["Function of cartilage in the trachea","Keeps the trachea open."],
["Goblet cells","Make mucus that traps particles and pathogens."],
["Ciliated cells","Cilia move the mucus away from the lungs."],
["Effect of tobacco smoke on cilia","Damages them so mucus and particles stay in the airways."]]);

const BE_L112=L("Breathing, air and exercise","How the ribs and diaphragm ventilate the lungs, how inspired and expired air differ, and how exercise changes breathing.",
`<h4>Ventilation of the lungs (Extended)</h4>
<p>The lungs have no muscles of their own. Air moves in and out because muscles change the <b>volume of the thorax</b> and so the <b>pressure</b> inside it.</p>
{{BE_VENT}}
<table><tr><th></th><th>Breathing in</th><th>Breathing out</th></tr>
<tr><td>External intercostal muscles</td><td>contract</td><td>relax</td></tr>
<tr><td>Ribs</td><td>move up and out</td><td>move down and in</td></tr>
<tr><td>Diaphragm</td><td>contracts and flattens</td><td>relaxes and domes upwards</td></tr>
<tr><td>Volume of thorax</td><td>increases</td><td>decreases</td></tr>
<tr><td>Pressure in thorax</td><td>falls below atmospheric</td><td>rises above atmospheric</td></tr>
<tr><td>Air movement</td><td>into the lungs</td><td>out of the lungs</td></tr></table>
<p>During hard exercise the <b>internal intercostal muscles</b> also contract to push the ribs down and in faster, forcing more air out.</p>
<h4>Inspired and expired air</h4>
<p>Air breathed in (inspired) and air breathed out (expired) are different mixtures. Nitrogen hardly changes, so the differences are in three substances.</p>
{{BE_COMP}}
<table><tr><th></th><th>Inspired air</th><th>Expired air</th></tr>
<tr><td>Oxygen</td><td>about 21%</td><td>about 16%</td></tr>
<tr><td>Carbon dioxide</td><td>about 0.04%</td><td>about 4%</td></tr>
<tr><td>Water vapour</td><td>variable, usually less</td><td>more (saturated)</td></tr></table>
<p><b>(Extended) Why are they different?</b> Oxygen is taken into the blood at the alveoli and used in respiration. Carbon dioxide is made in respiration and diffuses out into the alveoli. Water vapour is added as water evaporates from the moist lining of the lungs.</p>
<p><b>Investigating the difference.</b> Limewater turns <b>milky</b> when carbon dioxide is bubbled through it. Breathing out through limewater turns it milky much faster than pumping in air, showing expired air contains more carbon dioxide. Hydrogencarbonate indicator also shows it: it changes from red or orange to <b>yellow</b> as carbon dioxide concentration rises.</p>
<h4>Exercise and breathing</h4>
<p>During exercise the breathing rate and depth both increase. You can investigate this by counting breaths per minute at rest and after exercise, then timing how long it takes to return to the resting rate.</p>
{{BE_EXER}}
<p><b>(Extended)</b> Muscles respire faster during exercise and make more carbon dioxide. The carbon dioxide concentration in the blood rises and is <b>detected by the brain</b>, which sends signals to the breathing muscles. The result is a <b>faster rate and greater depth</b> of breathing, which removes carbon dioxide and supplies more oxygen.</p>
<div class="ex"><b>Worked example</b>A student counts 14 breaths in one minute at rest and 34 breaths per minute after running. By how much has the rate increased?<br>34 − 14 = 20 breaths per minute (1). As a percentage: 20 ÷ 14 × 100 = 143% (1).</div>`,
I("What changes in your breath after you run, and how could you prove it?",
`<ol><li>Predict what will happen to your breathing rate and depth during exercise and in recovery.</li><li>Predict what will be different between the air you breathe in and out.</li><li>Decide how you could show the difference in carbon dioxide using limewater.</li><li>List the variables you would need to control for a fair test.</li></ol>`,
`<p><b>Investigation 1: breathing rate and exercise.</b> Work in pairs.</p><ol><li>Sit still for two minutes, then count your breaths for one minute (the resting rate).</li><li>Run on the spot for two minutes. Count your breaths for one minute straight afterwards.</li><li>Count again every two minutes until your rate returns to normal. Record all values in a table and plot a graph.</li></ol><p><b>Investigation 2: inspired and expired air.</b> Set up two boiling tubes of limewater with a tube through each bung. Breathe in through tube A (air bubbles through the limewater) and out through tube B. Time how long each takes to turn milky. Use a clean mouthpiece for each student.</p>`,
["https://phet.colorado.edu/","PhET simulations (browse for a respiration or exercise simulation your teacher recommends)"]),
[["Describe how breathing in is brought about. (Extended)","External intercostal muscles contract and the ribs move up and out (1). The diaphragm contracts and flattens (1). The volume of the thorax increases (1) so the pressure falls and air flows in (1).",4],
["State two differences between inspired and expired air.","Any two from: less oxygen, more carbon dioxide, more water vapour (2).",2],
["Explain why expired air contains more carbon dioxide than inspired air. (Extended)","Carbon dioxide is produced in respiration (1) and diffuses from the blood into the alveoli (1).",2],
["Describe how limewater shows the difference in carbon dioxide between inspired and expired air.","Limewater turns milky (1) faster with expired air (1) because it contains more carbon dioxide.",2],
["Explain why breathing rate increases during exercise. (Extended)","The muscles respire faster and make more carbon dioxide (1). The carbon dioxide concentration in the blood increases (1) and is detected by the brain (1) which increases the rate and depth of breathing (1).",4]],
[M("What happens to the diaphragm when you breathe in? (Extended)",["It relaxes and domes upwards","It contracts and flattens","It moves out","It stays the same"],1,"The diaphragm flattens."),
M("When you breathe in, the pressure inside the thorax",["increases","decreases","stays the same","is higher than atmospheric"],1,"Volume rises so pressure falls. (Extended)"),
N("About what percentage of expired air is carbon dioxide?",4,"%","Expired air has about 4% carbon dioxide."),
M("Which gas has about the same percentage in inspired and expired air?",["Oxygen","Carbon dioxide","Nitrogen","Water vapour"],2,"Nitrogen is not used by the body."),
M("What does limewater turn when carbon dioxide is added?",["Blue","Milky","Green","Colourless"],1,"Limewater goes milky."),
M("Hydrogencarbonate indicator changes to which colour as carbon dioxide increases?",["Purple","Blue","Yellow","Colourless"],2,"It goes yellow."),
M("What is detected by the brain to increase breathing rate during exercise? (Extended)",["Low oxygen","High carbon dioxide in the blood","High blood pressure","Low temperature"],1,"Carbon dioxide concentration rises."),
N("A student breathes 15 times per minute at rest and 36 times per minute after exercise. How many more breaths per minute is this?",21,"breaths per minute","36 − 15 = 21.")],
[["Breathing in: ribs and diaphragm","Ribs move up and out, diaphragm contracts and flattens, volume rises, pressure falls."],
["Breathing out: ribs and diaphragm","Ribs move down and in, diaphragm relaxes and domes, volume falls, pressure rises."],
["Oxygen in inspired and expired air","About 21% in, about 16% out."],
["Carbon dioxide in inspired and expired air","About 0.04% in, about 4% out."],
["Test for carbon dioxide","Limewater turns milky."],
["Hydrogencarbonate indicator and carbon dioxide","Red or orange turns yellow when carbon dioxide rises."],
["Effect of exercise on breathing","Rate and depth increase."],
["Why does exercise change breathing? (Extended)","More carbon dioxide in the blood is detected by the brain."]]);

const BE_Q11=[
M("Which is a feature of the alveoli?",["Thick walls","Very small surface area","Wall one cell thick","No blood supply"],2,"Thin walls give a short diffusion distance."),
M("Which structure holds the trachea open? (Extended)",["Cartilage","Cilia","Mucus","Alveoli"],0,"Cartilage rings."),
M("During breathing in, the diaphragm",["relaxes","contracts and flattens","domes upwards","moves sideways"],1,"The diaphragm contracts and flattens. (Extended)"),
M("Compared with inspired air, expired air has",["more oxygen","less carbon dioxide","more carbon dioxide","less water vapour"],2,"Expired air has more carbon dioxide."),
T("Name the solution that turns milky with carbon dioxide.",["limewater","lime water"],"Limewater."),
M("What do goblet cells do?",["Beat to move mucus","Make mucus","Absorb oxygen","Contract the ribs"],1,"They make mucus."),
M("What happens to the breathing rate during exercise?",["Decreases","Stays the same","Increases","Stops"],2,"The breathing rate and depth increase."),
M("Which gas diffuses out of the blood into the alveoli?",["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"],2,"Carbon dioxide leaves the blood.")];
const BE_P11=[
P("The breathing system",6,"<p>The diagram shows the human breathing system.</p>"+FIGS.BE_LUNGS()+"<ol type='a'><li>Name the part that carries air from the larynx into the chest. [1]</li><li>Name the tiny air sacs where gas exchange takes place. [1]</li><li>State <b>two</b> features of the air sacs that make them efficient gas exchange surfaces. [2]</li><li>Describe how oxygen passes from the air sacs to the blood. [2]</li></ol>",
["(a) Trachea (1).","(b) Alveoli (1).","(c) Any two: large surface area; thin walls; good blood supply; good ventilation (2).","(d) Oxygen diffuses (1) from the air in the alveolus, where its concentration is high, into the blood in the capillary (1)."],"Hub exam-style question (written for this hub), Topic 11"),
P("Breathing in and out",7,"<p>(Extended) Muscles produce changes in the chest that cause ventilation of the lungs.</p><ol type='a'><li>Describe what happens to the ribs, the intercostal muscles and the diaphragm when a person breathes in. [3]</li><li>Explain how these changes cause air to enter the lungs. [2]</li><li>State what happens to the volume of the thorax when a person breathes out. [1]</li><li>State the type of muscle that contracts to force air out quickly during exercise. [1]</li></ol>",
["(a) The external intercostal muscles contract (1) and the ribs move up and out (1). The diaphragm contracts and flattens (1).","(b) The volume of the thorax increases (1) so the pressure falls below atmospheric and air flows in (1).","(c) It decreases (1).","(d) Internal intercostal muscles (1)."],"Hub exam-style question (written for this hub), Topic 11"),
P("Inspired and expired air",6,"<p>A student compared inspired and expired air.</p><table><tr><th>Gas</th><th>Inspired air (%)</th><th>Expired air (%)</th></tr><tr><td>Oxygen</td><td>21</td><td>16</td></tr><tr><td>Carbon dioxide</td><td>0.04</td><td>4</td></tr></table><ol type='a'><li>Calculate the decrease in the percentage of oxygen. [1]</li><li>Explain why expired air contains more carbon dioxide than inspired air. [2]</li><li>The student breathed out through limewater. Describe the result and explain what it shows. [2]</li><li>State <b>one</b> other difference between inspired and expired air. [1]</li></ol>",
["(a) 21 − 16 = 5 (%) (1).","(b) Carbon dioxide is made in respiration (1) and diffuses from the blood into the alveoli to be breathed out (1).","(c) The limewater turns milky (1) showing carbon dioxide is present in expired air (1).","(d) Expired air contains more water vapour (1)."],"Hub exam-style question (written for this hub), Topic 11"),
P("Exercise and breathing rate",6,"<p>A student measured her breathing rate at rest and during exercise.</p><table><tr><th>Activity</th><th>Breaths per minute</th></tr><tr><td>Resting</td><td>14</td></tr><tr><td>Jogging</td><td>28</td></tr><tr><td>Sprinting</td><td>44</td></tr></table><ol type='a'><li>Calculate how many times greater the breathing rate is when sprinting than when resting. Give your answer to 1 decimal place. [2]</li><li>State <b>one</b> other change in breathing during exercise. [1]</li><li>Explain how exercise leads to the change in breathing rate. (Extended) [3]</li></ol>",
["(a) 44 ÷ 14 (1) = 3.1 (times) (1).","(b) Breathing becomes deeper (1).","(c) Muscles respire faster and produce more carbon dioxide (1). The carbon dioxide level in the blood rises and is detected by the brain (1) which increases the rate and depth of breathing (1)."],"Hub exam-style question (written for this hub), Topic 11"),
P("Protecting the lungs",5,"<p>(Extended) The lining of the trachea contains goblet cells and ciliated cells.</p><ol type='a'><li>Describe the function of the goblet cells. [2]</li><li>Describe how ciliated cells help to protect the lungs. [2]</li><li>Suggest why smokers cough more than non-smokers. [1]</li></ol>",
["(a) They make mucus (1) that traps particles and pathogens (1).","(b) The cilia beat (1) and move the mucus with trapped particles away from the lungs (1).","(c) Smoke damages the cilia so mucus and particles collect in the airways (1)."],"Hub exam-style question (written for this hub), Topic 11")];
BSET(11,[BE_L111,BE_L112],BE_Q11,BE_P11);

/* ================= TOPIC 12 ================= */
const BE_L121=L("Energy and aerobic respiration","Why living things need energy, how aerobic respiration releases it, and how temperature affects respiration in yeast.",
`<h4>Why organisms need energy</h4>
<p>Every living cell needs a constant supply of energy. This energy comes from the chemical reactions of respiration. Uses of energy include:</p>
{{BE_USES}}
<ul><li><b>muscle contraction</b> for movement</li><li><b>protein synthesis</b>, building proteins from amino acids</li><li><b>cell division</b> and <b>growth</b></li><li><b>active transport</b> of substances across cell membranes</li><li>the passage of <b>nerve impulses</b></li><li>maintaining a <b>constant body temperature</b> in mammals and birds</li></ul>
<div class="key"><b>Exam tip</b>Respiration is not the same as breathing. Breathing moves air in and out of the lungs. Respiration is the chemical reaction in cells that releases energy from food. Energy is released, not "made".</div>
<h4>Aerobic respiration</h4>
<p><b>Aerobic respiration</b> is the chemical reactions in cells that use <b>oxygen</b> to break down nutrient molecules, such as glucose, to release energy.</p>
{{BE_AERO}}
<p><b>Word equation:</b> glucose + oxygen → carbon dioxide + water</p>
<p><b>(Extended) Balanced chemical equation:</b> C~6~H~12~O~6~ + 6O~2~ → 6CO~2~ + 6H~2~O</p>
<p>Count the atoms to check the equation: 6 carbon, 12 hydrogen and 18 oxygen on each side. Aerobic respiration happens all the time in every living cell, in plants as well as animals. Some of the energy is released as <b>heat</b>, which helps to keep mammals and birds warm.</p>
<h4>Investigating respiration in yeast</h4>
<p>Yeast is a single-celled fungus that respires in a glucose solution. Its respiration makes carbon dioxide, which can be measured as bubbles.</p>
{{BE_YEAST}}
<ol><li>Mix yeast and glucose solution in a test tube and attach a delivery tube to a second tube of water, or use hydrogencarbonate indicator in the tube.</li><li>Stand the tube in a water bath at a set temperature, such as 10, 20, 30, 40 and 50 °C.</li><li>Count the bubbles of gas in one minute, or time how long the hydrogencarbonate indicator takes to turn from red to yellow.</li><li>Repeat each temperature and calculate a mean.</li></ol>
<p><b>Control variables:</b> same volume and concentration of glucose, same mass of yeast, same time. <b>Result:</b> respiration rate increases as temperature rises up to an optimum around 40 °C, then falls because the enzymes that control respiration are <b>denatured</b>.</p>
<div class="ex"><b>Worked example</b>Bubbles in one minute at 30 °C were 24, 26 and 22. Calculate the mean.<br>(24 + 26 + 22) ÷ 3 = 24 bubbles per minute (1).</div>`,
I("How can you show that a tiny organism like yeast is respiring, and what would speed it up?",
`<ol><li>Write what you think a respiring organism takes in and gives out.</li><li>Predict how you could detect each product of respiration in yeast.</li><li>Predict how changing the temperature will change the rate of respiration, and explain why.</li><li>Choose the independent, dependent and control variables for your investigation.</li></ol>`,
`<p><b>Yeast and temperature.</b> Set up five water baths at 10, 20, 30, 40 and 60 °C. In each test tube put 5 cm<sup>3</sup> of 5% glucose solution and 1 g of dried yeast, stir, and cover the surface with a thin layer of oil if you want to count bubbles rather than measure gas volume. Place a tube in each bath.</p><ol><li>After 5 minutes count the bubbles produced in 1 minute, or measure the volume of gas in a gas syringe.</li><li>Repeat three times for each temperature and calculate the mean.</li><li>Plot a graph of mean rate against temperature.</li><li>Describe the pattern and explain the drop at the highest temperature.</li></ol><p>Safety: do not use water hotter than 60 °C; wash hands after handling yeast.</p>`,
["https://phet.colorado.edu/","PhET simulations: search the library for respiration or enzymes simulations"]),
[["State three uses of energy in living organisms.","Any three: muscle contraction; protein synthesis; cell division; active transport; growth; passage of nerve impulses; constant body temperature (3).",3],
["Define aerobic respiration.","Chemical reactions in cells (1) that use oxygen to break down nutrient molecules (1) to release energy (1).",3],
["Write the word equation for aerobic respiration.","Glucose + oxygen (1) → carbon dioxide + water (1).",2],
["Write the balanced chemical equation for aerobic respiration. (Extended)","C~6~H~12~O~6~ + 6O~2~ → 6CO~2~ + 6H~2~O (2).",2],
["Describe how you would investigate the effect of temperature on respiration in yeast.","Mix yeast and glucose and place in water baths at different temperatures (1). Measure bubbles or gas volume in a set time (1). Keep other variables the same (1). Repeat and calculate means (1).",4]],
[M("What is the word equation for aerobic respiration?",["Glucose → ethanol + carbon dioxide","Glucose + oxygen → carbon dioxide + water","Carbon dioxide + water → glucose + oxygen","Glucose → lactic acid"],1,"Aerobic respiration uses oxygen."),
M("Which is NOT a use of energy from respiration?",["Muscle contraction","Protein synthesis","Making oxygen","Cell division"],2,"Respiration does not make oxygen."),
M("In respiration, energy is",["made","released","destroyed","used up as oxygen"],1,"Energy is released from glucose."),
N("How many molecules of oxygen react with one molecule of glucose in aerobic respiration? (Extended)",6,"molecules","C6H12O6 + 6O2 → 6CO2 + 6H2O."),
T("Name the type of organism often used to investigate the effect of temperature on respiration.",["yeast"],"Yeast respires in a glucose solution."),
M("Why does respiration rate in yeast fall at very high temperature?",["Glucose runs out","Enzymes are denatured","Oxygen is used up","Yeast stops being a fungus"],1,"High temperature denatures enzymes."),
M("Which gas is produced when yeast respires?",["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"],2,"Carbon dioxide."),
N("Counts of bubbles per minute were 20, 24 and 28. What is the mean?",24,"bubbles per minute","(20 + 24 + 28) ÷ 3 = 24.")],
[["Define respiration","Chemical reactions in cells that release energy from nutrient molecules."],
["Four uses of energy in the body","Muscle contraction, protein synthesis, growth, active transport (also cell division, nerve impulses, body temperature)."],
["Word equation for aerobic respiration","Glucose + oxygen → carbon dioxide + water."],
["Balanced equation for aerobic respiration","C~6~H~12~O~6~ + 6O~2~ → 6CO~2~ + 6H~2~O."],
["Respiration or breathing: which releases energy?","Respiration."],
["Gas made by respiring yeast","Carbon dioxide."],
["Optimum temperature trend in yeast","Rate rises to an optimum, then falls as enzymes denature."],
["Hydrogencarbonate indicator in respiration","Turns from red or orange to yellow as carbon dioxide builds up."]]);

const BE_L122=L("Anaerobic respiration and oxygen debt","How cells release energy without oxygen in yeast and muscles, and how the body repays an oxygen debt after hard exercise.",
`<h4>Anaerobic respiration</h4>
<p><b>Anaerobic respiration</b> is the chemical reactions in cells that break down nutrient molecules to release energy <b>without using oxygen</b>. It releases <b>much less energy per glucose molecule</b> than aerobic respiration, because the glucose is only partly broken down.</p>
{{BE_ANAER}}
<h4>Anaerobic respiration in yeast</h4>
<p>Yeast respires anaerobically when there is no oxygen. It makes ethanol (alcohol) and carbon dioxide.</p>
<p><b>Word equation:</b> glucose → alcohol + carbon dioxide</p>
<p><b>(Extended) Balanced equation:</b> C~6~H~12~O~6~ → 2C~2~H~5~OH + 2CO~2~</p>
<p>This is the reaction used in brewing and in baking, where the carbon dioxide makes bread dough rise.</p>
<h4>Anaerobic respiration in muscles</h4>
<p>During vigorous exercise the blood cannot deliver oxygen to the muscles fast enough. The muscle cells make extra energy by anaerobic respiration.</p>
<p><b>Word equation:</b> glucose → lactic acid</p>
<p>No carbon dioxide is made, and lactic acid collects in the muscles and blood.</p>
<h4>Oxygen debt (Extended)</h4>
<p>The lactic acid that builds up in the muscles and blood during vigorous exercise causes an <b>oxygen debt</b>: the extra oxygen needed afterwards to remove the lactic acid.</p>
{{BE_DEBT}}
<p>After exercise the debt is repaid in three ways:</p>
<ul><li>The <b>heart rate stays fast</b> so blood carries lactic acid from the muscles to the liver.</li><li>The <b>breathing stays deeper and faster</b> to supply oxygen.</li><li>In the liver, lactic acid is broken down by <b>aerobic respiration</b>.</li></ul>
<table><tr><th></th><th>Aerobic</th><th>Anaerobic: yeast</th><th>Anaerobic: muscle</th></tr>
<tr><td>Oxygen needed?</td><td>yes</td><td>no</td><td>no</td></tr>
<tr><td>Products</td><td>carbon dioxide and water</td><td>ethanol and carbon dioxide</td><td>lactic acid</td></tr>
<tr><td>Energy released per glucose</td><td>much more</td><td>much less</td><td>much less</td></tr></table>
<div class="key"><b>Exam tip</b>Do not write "no energy" for anaerobic respiration: it releases less energy, not none. Lactic acid is made in muscles; ethanol is made in yeast.</div>`,
I("Why do your legs burn and your breathing stay fast after a sprint, even after you stop?",
`<ol><li>Write what you think is happening inside your leg muscles at the end of a sprint.</li><li>Suggest why you keep breathing hard after you have stopped.</li><li>Predict what your heart rate would do during recovery and why.</li><li>Draw a rough graph of oxygen uptake before, during and after the sprint.</li></ol>`,
`<p><b>Anaerobic yeast.</b> Boil glucose solution, cool it and add yeast. Pour a layer of oil on top to keep air out. Connect a delivery tube to a test tube of limewater.</p><ol><li>Leave the apparatus in a warm place for 30 minutes.</li><li>Record what happens to the limewater and the smell of the mixture.</li><li>Run a control without yeast.</li><li>Explain your results using the word equation.</li></ol><p><b>Muscle fatigue.</b> Hold a heavy book at arm's length for as long as possible. Record the time and how the arm feels. Discuss the role of lactic acid.</p>`,
["https://phet.colorado.edu/","PhET simulations: look for a simulation your teacher recommends on energy in the body"]),
[["Define anaerobic respiration.","Chemical reactions in cells that break down nutrient molecules (1) to release energy without using oxygen (1).",2],
["Write the word equation for anaerobic respiration in yeast.","Glucose → alcohol (1) + carbon dioxide (1).",2],
["Write the word equation for anaerobic respiration in muscles.","Glucose → lactic acid (1).",1],
["Compare the energy released by aerobic and anaerobic respiration.","Anaerobic respiration releases much less energy per glucose molecule (1) than aerobic respiration (1).",2],
["Explain how the oxygen debt is removed after exercise. (Extended)","The heart rate stays fast to carry lactic acid to the liver (1). Breathing stays faster and deeper to supply oxygen (1). Lactic acid is broken down by aerobic respiration in the liver (1).",3]],
[M("Which products are made by anaerobic respiration in yeast?",["Lactic acid","Ethanol and carbon dioxide","Water and carbon dioxide","Oxygen and water"],1,"Yeast makes ethanol and carbon dioxide."),
M("Which product is made by anaerobic respiration in muscles?",["Ethanol","Lactic acid","Carbon dioxide","Glucose"],1,"Lactic acid."),
M("Compared with aerobic respiration, anaerobic respiration releases",["more energy","the same energy","much less energy","no energy"],2,"Much less energy per glucose."),
M("What is an oxygen debt? (Extended)",["Too much oxygen in the blood","The extra oxygen needed to remove lactic acid","A shortage of glucose","The oxygen needed for digestion"],1,"The extra oxygen to break down lactic acid."),
M("Where is lactic acid broken down? (Extended)",["Heart","Liver","Lungs","Stomach"],1,"Lactic acid is carried to the liver."),
T("Name the gas produced when yeast respires anaerobically that makes bread rise.",["carbon dioxide","co2","co~2~"],"Carbon dioxide."),
M("Which is the balanced equation for anaerobic respiration in yeast? (Extended)",["C6H12O6 → 2C2H5OH + 2CO2","C6H12O6 + 6O2 → 6CO2 + 6H2O","C6H12O6 → 2C3H6O3","6CO2 + 6H2O → C6H12O6 + 6O2"],0,"Glucose gives two ethanol and two carbon dioxide."),
M("After vigorous exercise the heart rate stays high because (Extended)",["the muscles are cold","blood must carry lactic acid to the liver","the lungs are damaged","glucose is stored"],1,"Lactic acid is carried to the liver.")],
[["Define anaerobic respiration","Chemical reactions in cells that release energy from nutrient molecules without using oxygen."],
["Energy from anaerobic respiration","Much less per glucose than aerobic respiration."],
["Word equation: anaerobic respiration in yeast","Glucose → alcohol + carbon dioxide."],
["Word equation: anaerobic respiration in muscles","Glucose → lactic acid."],
["Balanced equation in yeast (Extended)","C~6~H~12~O~6~ → 2C~2~H~5~OH + 2CO~2~."],
["What is an oxygen debt? (Extended)","The extra oxygen needed after exercise to break down lactic acid."],
["How is the oxygen debt removed? (Extended)","Fast heart rate carries lactic acid to the liver; deep, fast breathing supplies oxygen; aerobic respiration of lactic acid in the liver."],
["Why does bread dough rise?","Yeast respires and makes carbon dioxide."]]);

const BE_Q12=[
M("Which of these is a use of energy in the body?",["Photosynthesis","Active transport","Transpiration","Digestion of fat"],1,"Active transport uses energy."),
M("Which is the word equation for aerobic respiration?",["Glucose → lactic acid","Glucose + oxygen → carbon dioxide + water","Glucose → ethanol + carbon dioxide","Carbon dioxide + water → glucose"],1,"Aerobic respiration uses oxygen."),
N("How many molecules of carbon dioxide are produced per glucose molecule in aerobic respiration? (Extended)",6,"molecules","6CO2."),
M("Which gas is given out by yeast during anaerobic respiration?",["Oxygen","Carbon dioxide","Hydrogen","Nitrogen"],1,"Carbon dioxide."),
M("Which substance builds up in muscles during vigorous exercise?",["Ethanol","Lactic acid","Glucose","Oxygen"],1,"Lactic acid."),
T("Name the organ where lactic acid is broken down after exercise. (Extended)",["liver"],"The liver."),
M("Why does the rate of respiration in yeast fall above the optimum temperature?",["Not enough glucose","Enzymes are denatured","Carbon dioxide dissolves","Oxygen is used up"],1,"Enzymes are denatured."),
M("Anaerobic respiration releases",["more energy than aerobic","no energy","much less energy than aerobic","the same energy as aerobic"],2,"Much less energy per glucose.")];
const BE_P12=[
P("Respiration and energy",6,"<p>All living organisms respire.</p><ol type='a'><li>State what is meant by <b>aerobic respiration</b>. [2]</li><li>Write the word equation for aerobic respiration. [2]</li><li>State <b>two</b> uses of the energy released by respiration. [2]</li></ol>",
["(a) Chemical reactions in cells that use oxygen to break down nutrient molecules (1) to release energy (1).","(b) Glucose + oxygen (1) → carbon dioxide + water (1).","(c) Any two: muscle contraction; protein synthesis; cell division; active transport; growth; nerve impulses; keeping body temperature constant (2)."],"Hub exam-style question (written for this hub), Topic 12"),
P("Balanced equation",3,"<p>(Extended) The equation for aerobic respiration can be written using chemical symbols.</p><ol type='a'><li>Write the balanced chemical equation for aerobic respiration. [2]</li><li>State how many molecules of oxygen are needed to respire one molecule of glucose. [1]</li></ol>",
["(a) C~6~H~12~O~6~ + 6O~2~ → 6CO~2~ + 6H~2~O: correct reactants and products (1) correctly balanced (1).","(b) 6 (1)."],"Hub exam-style question (written for this hub), Topic 12"),
P("Yeast and temperature",8,"<p>A student investigated respiration in yeast at different temperatures. She counted bubbles of gas produced in one minute.</p><table><tr><th>Temperature (°C)</th><th>10</th><th>20</th><th>30</th><th>40</th><th>60</th></tr><tr><td>Bubbles per minute</td><td>4</td><td>12</td><td>26</td><td>38</td><td>3</td></tr></table><ol type='a'><li>Name the gas in the bubbles. [1]</li><li>Describe the pattern shown by the results. [2]</li><li>Explain the result at 60 °C. [2]</li><li>State <b>two</b> variables the student should keep the same. [2]</li><li>Suggest how she could make her results more reliable. [1]</li></ol>",
["(a) Carbon dioxide (1).","(b) The number of bubbles increases as the temperature increases from 10 to 40 °C (1) then drops sharply at 60 °C (1).","(c) The enzymes are denatured at the high temperature (1) so respiration slows or stops (1).","(d) Any two: volume of glucose solution; mass or concentration of yeast; time the bubbles are counted (2).","(e) Repeat each temperature and calculate a mean (1)."],"Hub exam-style question (written for this hub), Topic 12"),
P("Anaerobic respiration",6,"<p>Anaerobic respiration happens in yeast and in muscles.</p><ol type='a'><li>State what is meant by anaerobic respiration. [1]</li><li>Write the word equation for anaerobic respiration in yeast. [2]</li><li>Write the word equation for anaerobic respiration in muscles. [1]</li><li>Compare the energy released by anaerobic and aerobic respiration. [1]</li><li>State one use of anaerobic respiration in yeast. [1]</li></ol>",
["(a) Release of energy from nutrient molecules without using oxygen (1).","(b) Glucose → alcohol (1) + carbon dioxide (1).","(c) Glucose → lactic acid (1).","(d) Anaerobic respiration releases much less energy per glucose (1).","(e) Making bread rise or brewing (1)."],"Hub exam-style question (written for this hub), Topic 12"),
P("Oxygen debt",6,"<p>(Extended) A student sprints 400 metres. Afterwards she breathes heavily for several minutes.</p><ol type='a'><li>Name the substance that builds up in her muscles during the sprint. [1]</li><li>Explain why this substance builds up. [2]</li><li>Describe how the oxygen debt is removed after the sprint. [3]</li></ol>",
["(a) Lactic acid (1).","(b) The muscles needed more energy than aerobic respiration could supply because oxygen delivery was too slow (1) so they respired anaerobically (1).","(c) Fast heart rate continues to carry lactic acid to the liver (1). Faster and deeper breathing supplies oxygen (1) for aerobic respiration of lactic acid in the liver (1)."],"Hub exam-style question (written for this hub), Topic 12")];
BSET(12,[BE_L121,BE_L122],BE_Q12,BE_P12);
