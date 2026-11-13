/* ===== Biology 0610, Topics 6 and 7: plant nutrition and human nutrition (own notes). Figure prefix BC_ ===== */
const BC_FG=(vb,inner,cap,label,maxw)=>`<figure class="fig"${maxw?` style="max-width:${maxw}px"`:""}><svg viewBox="${vb}" role="img" aria-label="${label}">${inner}</svg><figcaption>${cap}</figcaption></figure>`;
const BC_T=(x,y,s,o)=>{o=o||{};return `<text x="${x}" y="${y}" font-size="${o.s||11}" text-anchor="${o.a||"middle"}"${o.b?' font-weight="700"':""}${o.i?' font-style="italic"':""} ${o.c?`style="fill:${o.c}"`:'fill="currentColor"'}>${s}</text>`};
const BC_ARR=(x1,y1,x2,y2,col,w)=>{const a=Math.atan2(y2-y1,x2-x1),h=7,c=col||"currentColor";
  return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="${w||2}" fill="none"/><path d="M${x2} ${y2}l${(-h*Math.cos(a-.45)).toFixed(1)} ${(-h*Math.sin(a-.45)).toFixed(1)}M${x2} ${y2}l${(-h*Math.cos(a+.45)).toFixed(1)} ${(-h*Math.sin(a+.45)).toFixed(1)}" stroke="${c}" stroke-width="${w||2}" fill="none" stroke-linecap="round"/>`};
const BC_BOX=(x,y,w,h,lines,o)=>{o=o||{};return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" ${o.f?`style="fill:${o.f}"`:'fill="none"'} stroke="currentColor" stroke-opacity=".6" stroke-width="1.4"/>`+lines.map((t,i)=>BC_T(x+w/2,y+h/2+4-(lines.length-1)*7+i*14,t,{s:o.s||11,b:i===0&&o.b})).join("")};
const BC_LD=(x1,y1,x2,y2)=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="currentColor" stroke-opacity=".55" stroke-width="1" fill="none"/><circle cx="${x2}" cy="${y2}" r="1.8" fill="currentColor" fill-opacity=".7"/>`;

/* photosynthesis overview */
FIGS.BC_PHOTO=()=>{
  let s="";
  s+=`<circle cx="42" cy="38" r="15" style="fill:var(--amber,#F2A93B)"/>`;
  for(let i=0;i<8;i++){const a=i*Math.PI/4;s+=`<path d="M${(42+21*Math.cos(a)).toFixed(1)} ${(38+21*Math.sin(a)).toFixed(1)}L${(42+28*Math.cos(a)).toFixed(1)} ${(38+28*Math.sin(a)).toFixed(1)}" stroke="var(--amber,#F2A93B)" stroke-width="2.2" stroke-linecap="round"/>`}
  s+=BC_T(42,78,"light energy",{s:10.5});
  s+=BC_ARR(62,52,150,86,"var(--amber,#F2A93B)",2.4);
  s+=`<ellipse cx="215" cy="118" rx="82" ry="46" style="fill:var(--accent)" fill-opacity=".28" stroke="currentColor" stroke-opacity=".6" stroke-width="1.4"/>`;
  s+=`<path d="M135 118L295 118" stroke="currentColor" stroke-opacity=".3" stroke-width="1.2"/>`;
  s+=BC_T(215,108,"chlorophyll in",{s:10.5,b:1})+BC_T(215,136,"chloroplasts",{s:10.5,b:1});
  s+=BC_ARR(10,118,132,118);s+=BC_T(70,108,"carbon dioxide",{s:10.5})+BC_T(70,134,"(from the air)",{s:9.5,i:1});
  s+=BC_ARR(215,214,215,168);s+=BC_T(215,226,"water (from the soil, up the xylem)",{s:10.5});
  s+=BC_ARR(298,100,404,76);s+=BC_T(352,68,"glucose",{s:11,b:1});
  s+=BC_ARR(298,134,404,160);s+=BC_T(354,178,"oxygen",{s:11,b:1});
  return BC_FG("0 0 420 236",s,"Plants build glucose from carbon dioxide and water. Chlorophyll in the chloroplasts absorbs the light energy that drives the process.","Diagram of photosynthesis: carbon dioxide, water and light energy enter a leaf; glucose and oxygen leave",520);
};

/* variegated leaf starch test */
FIGS.BC_TESTS=()=>{
  const leaf=(cx,cy,outer,inner)=>`<ellipse cx="${cx}" cy="${cy}" rx="54" ry="32" style="fill:${outer}" stroke="currentColor" stroke-opacity=".6" stroke-width="1.4"/><ellipse cx="${cx}" cy="${cy}" rx="32" ry="17" style="fill:${inner}" stroke="currentColor" stroke-opacity=".35"/>`;
  let s="";
  s+=leaf(68,60,"var(--mint,#E6F2EE)","var(--good,#3BA86B)")+leaf(210,60,"var(--mint,#E6F2EE)","var(--mint,#E6F2EE)")+leaf(352,60,"#C98A3A","#2A2F7A");
  s+=BC_ARR(124,60,152,60)+BC_ARR(266,60,294,60);
  s+=BC_T(68,112,"1. Variegated leaf",{s:10.5,b:1})+BC_T(68,126,"green centre, white edge",{s:10})+BC_T(68,139,"(kept in light)",{s:10});
  s+=BC_T(210,112,"2. Boiled, then heated",{s:10.5,b:1})+BC_T(210,126,"in hot ethanol: all",{s:10})+BC_T(210,139,"colour removed",{s:10});
  s+=BC_T(352,112,"3. Iodine solution added",{s:10.5,b:1})+BC_T(352,126,"centre blue-black: starch",{s:10})+BC_T(352,139,"edge brown: no starch",{s:10});
  s+=BC_T(210,170,"Starch is only made where there is chlorophyll (and light and carbon dioxide).",{s:10.5,i:1});
  return BC_FG("0 0 420 180",s,"The white edge has no chlorophyll, so it makes no starch and stays brown with iodine. This shows chlorophyll is needed for photosynthesis.","Three stages of the starch test on a variegated leaf",520);
};

/* uses of glucose */
FIGS.BC_USES=()=>{
  let s=BC_BOX(150,84,120,38,["Glucose","made in photosynthesis"],{b:1,s:10.5,f:"color-mix(in srgb,var(--accent) 22%,transparent)"});
  const top=[["Starch","energy store",10],["Cellulose","builds cell walls",150],["Respiration","releases energy",290]];
  top.forEach(t=>{s+=BC_BOX(t[2],10,120,42,[t[0],t[1]],{b:1,s:10.5});s+=BC_ARR(210,84,t[2]+60,54,"currentColor",1.6)});
  s+=BC_BOX(50,150,140,42,["Sucrose","transported in the phloem"],{b:1,s:10.5})+BC_ARR(185,124,130,148,"currentColor",1.6);
  s+=BC_BOX(230,150,140,42,["Nectar","attracts insects to pollinate"],{b:1,s:10});s+=BC_ARR(235,124,290,148,"currentColor",1.6);
  s+=BC_T(210,218,"With mineral ions from the soil:",{s:10.5,i:1});
  s+=BC_BOX(10,226,196,42,["Nitrate ions","used to make amino acids"],{b:1,s:10.5})+BC_BOX(214,226,196,42,["Magnesium ions","used to make chlorophyll"],{b:1,s:10.5});
  return BC_FG("0 0 420 276",s,"Glucose is used, stored or converted straight away. Nitrate and magnesium ions are needed for the proteins and the chlorophyll the plant makes.","Flow diagram of the uses of glucose made in photosynthesis and the roles of nitrate and magnesium ions",520);
};

/* rate against light, CO2, temperature */
FIGS.BC_RATE=()=>{
  const panel=(ox,title,xl,kind)=>{
    let p=BC_T(ox+56,12,title,{s:10.5,b:1});
    p+=`<path d="M${ox} 24L${ox} 112L${ox+112} 112" stroke="currentColor" stroke-width="1.6" fill="none"/>`;
    const c=kind==="t"?`M${ox} 108C${ox+40} 100 ${ox+58} 34 ${ox+68} 30C${ox+80} 27 ${ox+92} 80 ${ox+106} 106`:`M${ox} 110C${ox+28} 52 ${ox+50} 36 ${ox+110} 33`;
    p+=`<path d="${c}" stroke="var(--accent)" stroke-width="2.6" fill="none"/>`;
    p+=BC_T(ox+56,127,xl,{s:10});
    if(kind==="t"){p+=`<path d="M${ox+68} 112L${ox+68} 30" stroke="currentColor" stroke-opacity=".35" stroke-dasharray="3 3"/>`+BC_T(ox+68,142,"optimum",{s:9.5,i:1})}
    return p};
  let s=panel(16,"Light intensity","light intensity","l")+panel(154,"Carbon dioxide","CO₂ concentration","c")+panel(292,"Temperature","temperature","t");
  s+=`<g transform="translate(5 68) rotate(-90)">${BC_T(0,0,"rate of photosynthesis",{s:9.5})}</g>`;
  s+=BC_T(210,164,"Rate rises, then levels off. Too hot and enzymes are denatured, so the rate drops.",{s:10,i:1});
  return BC_FG("0 0 420 172",s,"Typical results when one factor is changed and the others are kept constant.","Three graphs of rate of photosynthesis against light intensity, carbon dioxide concentration and temperature",520);
};

/* limiting factor graph */
FIGS.BC_LIMIT=()=>{
  let s=`<path d="M50 28L50 190L396 190" stroke="currentColor" stroke-width="1.6" fill="none"/>`;
  s+=`<path d="M50 190L170 134Q185 128 210 128L390 128" stroke="var(--bad)" stroke-width="2.6" fill="none"/>`;
  s+=`<path d="M50 190L250 97Q275 86 310 85L390 85" stroke="var(--accent)" stroke-width="2.6" fill="none"/>`;
  s+=BC_T(390,76,"high CO₂ concentration",{a:"end",s:10.5,b:1,c:"var(--accent)"})+BC_T(390,120,"low CO₂ concentration",{a:"end",s:10.5,b:1,c:"var(--bad)"});
  s+=BC_T(300,148,"flat part: CO₂ is now the limiting factor",{s:10,i:1});
  s+=BC_T(58,44,"Rising part: light is the limiting factor.",{a:"start",s:10.5,i:1})+BC_ARR(100,50,116,160,"currentColor",1.2);
  s+=BC_T(220,208,"light intensity",{s:10.5});
  s+=`<g transform="translate(14 110) rotate(-90)">${BC_T(0,0,"rate of photosynthesis",{s:10})}</g>`;
  return BC_FG("0 0 420 216",s,"The factor in shortest supply sets the rate. Raising CO₂ lifts the plateau, but only where light is no longer the limit.","Graph of photosynthesis rate against light intensity for low and high carbon dioxide, showing limiting factors",520);
};

/* hydrogencarbonate indicator */
FIGS.BC_HCO3=()=>{
  const tube=(x,col,plant,foil)=>{let t=`<path d="M${x} 20L${x} 98Q${x} 114 ${x+22} 114Q${x+44} 114 ${x+44} 98L${x+44} 20" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
    t+=`<path d="M${x+1.5} 56L${x+1.5} 98Q${x+1.5} 112 ${x+22} 112Q${x+42.5} 112 ${x+42.5} 98L${x+42.5} 56Z" style="fill:${col}" fill-opacity=".85"/>`;
    if(plant)t+=`<path d="M${x+22} 106C${x+14} 90 ${x+30} 82 ${x+20} 66M${x+22} 100C${x+32} 92 ${x+12} 80 ${x+26} 72" stroke="var(--good,#3BA86B)" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
    if(foil)t+=`<rect x="${x-3}" y="46" width="50" height="68" rx="6" style="fill:#7A8190" fill-opacity=".88"/>`+BC_T(x+22,84,"foil",{s:9.5,c:"#fff"});
    return t};
  let s=tube(14,"#E0552B",0,0)+BC_T(36,134,"Start",{b:1,s:10.5})+BC_T(36,147,"(red)",{s:10});
  s+=BC_ARR(70,72,108,72)+BC_T(89,62,"2–3 hours",{s:9.5,i:1});
  s+=tube(120,"#8E3B8E",1,0)+BC_T(142,134,"Pondweed, light",{b:1,s:10})+BC_T(142,147,"purple: CO₂ used up",{s:9.5});
  s+=tube(226,"#F4C20D",1,1)+BC_T(248,134,"Pondweed, dark",{b:1,s:10})+BC_T(248,147,"yellow: CO₂ made",{s:9.5});
  s+=tube(332,"#E0552B",0,0)+BC_T(354,134,"No plant, light",{b:1,s:10})+BC_T(354,147,"red: control",{s:9.5});
  return BC_FG("0 0 400 156",s,"Hydrogencarbonate indicator is red at normal CO₂ levels, purple when CO₂ falls and yellow when CO₂ rises.","Four test tubes with hydrogencarbonate indicator showing colour changes in light and dark",520);
};

/* leaf section */
FIGS.BC_LEAF=()=>{
  let s="";
  s+=`<rect x="10" y="22" width="290" height="4" rx="2" fill="currentColor" fill-opacity=".55"/>`;
  for(let i=0;i<10;i++)s+=`<rect x="${10+i*29}" y="27" width="29" height="18" style="fill:var(--accent)" fill-opacity=".12" stroke="currentColor" stroke-opacity=".5"/>`;
  for(let i=0;i<15;i++){const x=10+i*19.33;s+=`<rect x="${x.toFixed(1)}" y="46" width="19.3" height="58" rx="3" style="fill:var(--accent)" fill-opacity=".2" stroke="currentColor" stroke-opacity=".5"/>`;
    [52,62,72].forEach((y,k)=>{s+=`<ellipse cx="${(x+(k%2?12:7)).toFixed(1)}" cy="${y}" rx="3.2" ry="2" style="fill:var(--good,#3BA86B)"/>`})}
  for(let r=0;r<2;r++)for(let i=0;i<8;i++){const cx=22+i*36+(r?18:0);if(cx>290)continue;s+=`<ellipse cx="${cx}" cy="${r?150:124}" rx="14" ry="13" style="fill:var(--accent)" fill-opacity=".14" stroke="currentColor" stroke-opacity=".5"/>`}
  s+=`<circle cx="150" cy="136" r="23" style="fill:var(--bg,#fff)" stroke="currentColor" stroke-width="2"/>`;
  [[142,128],[150,125],[158,128]].forEach(p=>{s+=`<circle cx="${p[0]}" cy="${p[1]}" r="4.2" style="fill:var(--blu,#2F5D8A)"/>`});
  [[141,144],[150,147],[159,144]].forEach(p=>{s+=`<circle cx="${p[0]}" cy="${p[1]}" r="3.4" style="fill:var(--amber,#F2A93B)"/>`});
  for(let i=0;i<10;i++){if(i===7)continue;s+=`<rect x="${10+i*29}" y="168" width="29" height="17" style="fill:var(--accent)" fill-opacity=".12" stroke="currentColor" stroke-opacity=".5"/>`}
  s+=`<rect x="10" y="185" width="290" height="3" rx="1.5" fill="currentColor" fill-opacity=".45"/>`;
  [[218,176],[240,176]].forEach(p=>{s+=`<ellipse cx="${p[0]}" cy="${p[1]}" rx="9" ry="8.5" style="fill:var(--accent)" fill-opacity=".35" stroke="currentColor" stroke-opacity=".7"/><circle cx="${p[0]}" cy="${p[1]}" r="2.2" style="fill:var(--good,#3BA86B)"/>`});
  const L=(y,t,tx,ty,b)=>BC_LD(306,y-3,tx,ty)+BC_T(312,y,t,{a:"start",s:10.5,b:b});
  s+=L(14,"cuticle",260,24);s+=L(40,"upper epidermis",270,36);s+=L(58,"chloroplast",248,62);
  s+=L(84,"palisade mesophyll",276,84);s+=L(110,"vascular bundle",172,126);s+=BC_T(312,122,"(xylem above, phloem below)",{a:"start",s:9,i:1});
  s+=L(146,"spongy mesophyll",262,140);s+=L(162,"air space",247,138);s+=L(176,"lower epidermis",282,176);
  s+=L(192,"guard cell",244,180);s+=L(205,"stoma",229,176);
  return BC_FG("0 0 420 212",s,"Section through a dicotyledonous leaf. Most chloroplasts are in the palisade layer, near the light.","Labelled cross-section of a leaf",520);
};

/* stoma open and closed */
FIGS.BC_STOMA=()=>{
  const gc=(cx,cy,rx,ry)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" style="fill:var(--accent)" fill-opacity=".3" stroke="currentColor" stroke-width="1.5"/><circle cx="${cx-2}" cy="${cy-8}" r="2.4" style="fill:var(--good,#3BA86B)"/><circle cx="${cx+2}" cy="${cy+8}" r="2.4" style="fill:var(--good,#3BA86B)"/>`;
  let s=gc(68,60,17,36)+gc(114,60,17,36)+BC_T(91,20,"Open stoma",{b:1,s:11})+BC_T(91,114,"guard cells turgid (full of water)",{s:9.5});
  s+=BC_ARR(91,34,91,52,"var(--accent)",1.8)+BC_T(91,31,"",{s:9});
  s+=gc(300,60,17,36)+gc(334,60,17,36)+BC_T(317,20,"Closed stoma",{b:1,s:11})+BC_T(317,114,"guard cells flaccid (lose water)",{s:9.5});
  s+=BC_T(91,132,"CO₂ in; O₂ and water vapour out",{s:9.5,i:1})+BC_T(317,132,"little gas exchange or water loss",{s:9.5,i:1});
  return BC_FG("0 0 420 142",s,"Water entering or leaving the guard cells changes their shape, which opens or closes the stoma.","Guard cells with an open stoma and a closed stoma",520);
};

/* energy needs bar chart */
FIGS.BC_ENERGY=()=>{
  const d=[["Child, 10 years",8],["Adult woman, desk job",8.5],["Pregnant woman",9.5],["Adult man, desk job",10.5],["Adult man, manual work",14]];
  let s=BC_T(10,14,"Approximate daily energy needs (MJ per day)",{a:"start",s:11,b:1});
  d.forEach((r,i)=>{const y=26+i*28,w=r[1]*16;s+=BC_T(150,y+16,r[0],{a:"end",s:10.5})+`<rect x="158" y="${y}" width="${w}" height="20" rx="3" style="fill:var(--accent)" fill-opacity="${.45+i*.1}"/>`+BC_T(158+w+6,y+15,"≈ "+r[1],{a:"start",s:10.5,b:1})});
  s+=BC_T(10,176,"Values are rounded estimates for comparison. Real needs vary with size and lifestyle.",{a:"start",s:9.5,i:1});
  return BC_FG("0 0 420 184",s,"Energy needs depend on age, sex, activity level and whether a woman is pregnant or breast-feeding.","Bar chart of approximate daily energy needs of different people",520);
};

/* alimentary canal */
FIGS.BC_GUT=()=>{
  const o=130;
  let s="";
  s+=`<ellipse cx="${o+10}" cy="22" rx="16" ry="9" style="fill:var(--accent)" fill-opacity=".3" stroke="currentColor"/><ellipse cx="${o-14}" cy="30" rx="7" ry="5" style="fill:var(--amber,#F2A93B)" fill-opacity=".75"/><ellipse cx="${o+34}" cy="30" rx="7" ry="5" style="fill:var(--amber,#F2A93B)" fill-opacity=".75"/>`;
  s+=`<path d="M${o+10} 31L${o+10} 92" stroke="var(--accent)" stroke-width="9" stroke-linecap="round" fill="none"/>`;
  s+=`<ellipse cx="${o+22}" cy="112" rx="28" ry="17" transform="rotate(-25 ${o+22} 112)" style="fill:var(--accent)" fill-opacity=".4" stroke="currentColor" stroke-width="1.4"/>`;
  s+=`<ellipse cx="${o-24}" cy="100" rx="30" ry="16" style="fill:var(--bad)" fill-opacity=".45" stroke="currentColor" stroke-opacity=".7"/><ellipse cx="${o-6}" cy="120" rx="5" ry="8" style="fill:var(--good,#3BA86B)" stroke="currentColor" stroke-opacity=".7"/>`;
  s+=`<ellipse cx="${o+34}" cy="138" rx="26" ry="6" style="fill:var(--amber,#F2A93B)" fill-opacity=".75" stroke="currentColor" stroke-opacity=".7"/>`;
  s+=`<path d="M${o+66} 214L${o+66} 150L${o-20} 150L${o-20} 214" stroke="var(--amber,#F2A93B)" stroke-width="13" stroke-linejoin="round" stroke-opacity=".75" fill="none"/>`;
  let p=`M${o+14} 128`;const ys=[134,150,166,182,198];ys.forEach((y,i)=>{p+=` L${o+(i%2?40:-6)} ${y}`});p+=` L${o+20} 206`;
  s+=`<path d="${p}" stroke="var(--accent)" stroke-width="9" stroke-linejoin="round" stroke-linecap="round" fill="none"/>`;
  s+=`<path d="M${o-20} 214Q${o-20} 232 ${o+14} 234" stroke="var(--bad)" stroke-width="8" stroke-linecap="round" fill="none"/><circle cx="${o+18}" cy="236" r="5" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
  const R=(y,t,tx,ty,b)=>BC_LD(256,y-3,tx,ty)+BC_T(262,y,t,{a:"start",s:10.5,b:b});
  s+=R(20,"mouth",o+26,22);s+=R(36,"salivary glands",o+41,30);s+=R(62,"oesophagus",o+14,62);s+=R(104,"stomach",o+46,106);
  s+=R(138,"pancreas",o+58,138);s+=R(168,"small intestine",o+40,166);s+=BC_T(262,180,"(duodenum, then ileum)",{a:"start",s:9,i:1});
  s+=R(200,"large intestine (colon)",o+68,190);s+=R(222,"rectum",o-14,222);s+=R(238,"anus",o+24,236);
  const Lf=(y,t,tx,ty)=>`<path d="M86 ${y-3}L${tx} ${ty}" stroke="currentColor" stroke-opacity=".55" fill="none"/>`+BC_T(82,y,t,{a:"end",s:10.5});
  s+=Lf(84,"liver",o-30,96)+Lf(130,"gall bladder",o-10,122);
  return BC_FG("0 0 400 246",s,"The alimentary canal runs from mouth to anus. The liver, gall bladder, pancreas and salivary glands are associated organs: food does not pass through them.","Labelled diagram of the human digestive system",440);
};

/* tooth structure */
FIGS.BC_TEETH=()=>{
  let s=`<rect x="6" y="92" width="134" height="64" rx="8" fill="currentColor" fill-opacity=".1"/>`;
  s+=`<path d="M6 60Q30 52 42 66L42 156L6 156Z" style="fill:var(--bad)" fill-opacity=".28"/><path d="M140 60Q116 52 100 66L100 156L140 156Z" style="fill:var(--bad)" fill-opacity=".28"/>`;
  s+=`<path d="M40 20Q40 6 56 6L84 6Q100 6 100 20L98 70Q98 108 90 138Q86 150 81 138L73 92L69 92L61 138Q56 150 52 138Q42 108 42 70Z" style="fill:var(--accent)" fill-opacity=".18" stroke="currentColor" stroke-width="1.4"/>`;
  s+=`<path d="M42 64L40 20Q40 6 56 6L84 6Q100 6 100 20L98 64" fill="none" style="stroke:var(--accent)" stroke-width="5"/>`;
  s+=`<ellipse cx="70" cy="46" rx="14" ry="20" style="fill:var(--bad)" fill-opacity=".35"/><path d="M66 64L60 126M74 64L83 126" style="stroke:var(--bad)" stroke-width="2.6" fill="none"/>`;
  s+=`<path d="M45 96Q47 128 54 142M96 96Q94 128 87 142" style="stroke:var(--amber,#F2A93B)" stroke-width="3.5" fill="none"/>`;
  const R=(y,t,tx,ty)=>BC_LD(150,y-3,tx,ty)+BC_T(156,y,t,{a:"start",s:10.5});
  s+=R(14,"enamel (hardest tissue)",98,16)+R(40,"dentine",94,38)+R(66,"pulp cavity with nerves",74,50)+BC_T(156,78,"and blood vessels",{a:"start",s:10.5})+R(100,"cement (fixes root to bone)",93,110)+R(124,"gum",118,70)+R(150,"jawbone",126,128);
  s+=BC_T(70,172,"crown above gum, roots in bone",{s:9.5,i:1});
  return BC_FG("0 0 360 180",s,"A tooth has a hard enamel crown. The living pulp supplies it. The roots are embedded in the jawbone and surrounded by gum.","Labelled section through a human tooth",420);
};

/* tooth types */
FIGS.BC_TYPES=()=>{
  const sh=[["incisor","M-10 -38L10 -38L14 0L-14 0Z","cuts and bites"],["canine","M-12 -38L12 -38L10 -12L0 4L-10 -12Z","tears food"],["premolar","M-16 -38L16 -38L16 -10L8 -4L0 -10L-8 -4L-16 -10Z","crushes and grinds"],["molar","M-22 -38L22 -38L22 -10L14 -4L7 -10L0 -4L-7 -10L-14 -4L-22 -10Z","grinds food"]];
  let s="";
  sh.forEach((t,i)=>{const cx=55+i*103;s+=`<path transform="translate(${cx} 54)" d="${t[1]}" style="fill:var(--accent)" fill-opacity=".25" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`+BC_T(cx,76,t[0],{b:1,s:11})+BC_T(cx,91,t[2],{s:10})});
  return BC_FG("0 0 420 100",s,"Human teeth are specialised: front teeth cut and tear, back teeth grind.","Four types of human teeth and their functions",520);
};

/* enzyme activity against pH */
FIGS.BC_PH=()=>{
  const X=ph=>40+ph*25.4,curve=pk=>{let d="";for(let i=0;i<=140;i++){const ph=i/10,y=190-150*Math.exp(-Math.pow(ph-pk,2)/(2*1.15*1.15));d+=(i?"L":"M")+X(ph).toFixed(1)+" "+y.toFixed(1)}return d};
  let s=`<path d="M40 28L40 190L400 190" stroke="currentColor" stroke-width="1.6" fill="none"/>`;
  for(let p=0;p<=14;p+=2)s+=BC_T(X(p),204,String(p),{s:10})+`<path d="M${X(p)} 190L${X(p)} 194" stroke="currentColor"/>`;
  s+=`<path d="${curve(2)}" stroke="var(--bad)" stroke-width="2.6" fill="none"/><path d="${curve(7)}" stroke="var(--accent)" stroke-width="2.6" fill="none"/><path d="${curve(8.2)}" stroke="var(--amber,#E08A1E)" stroke-width="2.6" fill="none"/>`;
  s+=BC_T(X(2),34,"pepsin",{s:10.5,b:1,c:"var(--bad)"})+BC_T(X(7)-6,36,"amylase",{a:"end",s:10.5,b:1,c:"var(--accent)"})+BC_T(X(8.2)+6,36,"trypsin",{a:"start",s:10.5,b:1,c:"var(--amber,#E08A1E)"});
  s+=BC_T(220,222,"pH",{s:10.5,b:1})+BC_T(X(2),216,"",{s:9});
  s+=`<g transform="translate(12 110) rotate(-90)">${BC_T(0,0,"enzyme activity",{s:10})}</g>`;
  s+=BC_T(X(2),20,"stomach",{s:9.5,i:1})+BC_T(X(7.7),20,"small intestine",{s:9.5,i:1});
  return BC_FG("0 0 420 230",s,"Each enzyme works fastest at its own pH. Pepsin suits the acid stomach. Amylase and trypsin suit the neutral to alkaline small intestine.","Graph of enzyme activity against pH for pepsin, amylase and trypsin",520);
};

/* bile emulsification */
FIGS.BC_BILE=()=>{
  let s=`<circle cx="60" cy="66" r="34" style="fill:var(--amber,#F2A93B)" fill-opacity=".55" stroke="currentColor" stroke-width="1.4"/>`;
  s+=BC_T(60,124,"large fat droplet",{b:1,s:10.5})+BC_T(60,138,"small surface area",{s:10});
  s+=BC_ARR(104,66,160,66)+BC_T(132,50,"bile",{b:1,s:11})+BC_T(132,84,"(emulsifies)",{s:9.5,i:1});
  for(let r=0;r<3;r++)for(let c=0;c<3;c++)s+=`<circle cx="${204+c*23}" cy="${44+r*23}" r="9" style="fill:var(--amber,#F2A93B)" fill-opacity=".55" stroke="currentColor" stroke-width="1.2"/>`;
  s+=BC_T(227,124,"many small droplets",{b:1,s:10.5})+BC_T(227,138,"large surface area",{s:10});
  s+=BC_ARR(272,66,326,66)+BC_T(300,50,"lipase",{b:1,s:11});
  s+=BC_BOX(330,40,84,52,["fatty acids","+ glycerol"],{b:1,s:10.5});
  return BC_FG("0 0 420 148",s,"Bile does not digest fat. It breaks the fat into tiny droplets so that lipase has more surface to work on.","Bile emulsifying a large fat droplet into small droplets, then lipase producing fatty acids and glycerol",520);
};

/* villus */
FIGS.BC_VILLUS=()=>{
  let s="";
  s+=`<path d="M95 206L95 52Q95 28 130 28Q165 28 165 52L165 206" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
  s+=`<path d="M102 206L102 54Q102 36 130 36Q158 36 158 54L158 206" style="fill:var(--accent)" fill-opacity=".1" stroke="currentColor" stroke-opacity=".6" stroke-width="1.2"/>`;
  for(let y=64;y<200;y+=9){s+=`<path d="M95 ${y}L89 ${y}M165 ${y}L171 ${y}" stroke="currentColor" stroke-opacity=".6" stroke-width="1.4"/>`}
  s+=`<path d="M108 204L108 70M152 204L152 70" style="stroke:var(--bad)" stroke-width="3" fill="none"/>`;
  [80,108,136,164].forEach(y=>{s+=`<path d="M108 ${y}L152 ${y}" style="stroke:var(--bad)" stroke-width="2" fill="none"/>`});
  s+=`<path d="M123 204L123 62Q123 52 130 52Q137 52 137 62L137 204Z" style="fill:var(--amber,#F2A93B)" fill-opacity=".35" stroke="currentColor" stroke-opacity=".7" stroke-width="1.2"/>`;
  s+=BC_T(46,100,"digested",{s:10})+BC_T(46,113,"food in the",{s:10})+BC_T(46,126,"lumen",{s:10})+BC_ARR(70,112,92,112,"currentColor",1.6);
  const R=(y,t,tx,ty,b)=>BC_LD(204,y-3,tx,ty)+BC_T(210,y,t,{a:"start",s:10.5,b:b});
  s+=R(24,"microvilli: tiny folds that",92,64)+BC_T(210,37,"increase surface area",{a:"start",s:10.5});
  s+=R(74,"epithelium: one cell thick",158,80)+BC_T(210,87,"(short diffusion distance)",{a:"start",s:9.5,i:1});
  s+=R(120,"capillary network",152,120)+BC_T(210,133,"carries glucose, amino acids,",{a:"start",s:9.5})+BC_T(210,145,"vitamins, minerals to the blood",{a:"start",s:9.5});
  s+=R(176,"lacteal (lymph vessel)",130,170)+BC_T(210,189,"carries fatty acids and glycerol",{a:"start",s:9.5});
  return BC_FG("0 0 420 216",s,"Villi cover the lining of the small intestine. Together with the microvilli on each cell they give a very large surface for absorption.","Labelled diagram of an intestinal villus with capillaries and a lacteal",520);
};

/* =================== TOPIC 6: PLANT NUTRITION =================== */
const BC_L61=L("Photosynthesis: making food from light","How plants build carbohydrates from carbon dioxide and water, what happens to the glucose, and how to test leaves for starch.",
`<h4>Photosynthesis: the process</h4>
<p><b>Photosynthesis</b> is the process by which plants make carbohydrates from simple raw materials, using energy from light. The raw materials are carbon dioxide from the air and water from the soil. Plants are producers: nearly every food chain starts with the glucose they make.</p>
{{BC_PHOTO}}
<ul><li>Carbon dioxide enters the leaf by diffusion through the stomata.</li><li>Water is taken up by the roots and carried to the leaf in the xylem.</li><li>Oxygen is a by-product. It leaves through the stomata or is used by the plant in respiration.</li></ul>
<h4>The word equation and chlorophyll</h4>
<p><b>carbon dioxide + water → glucose + oxygen</b><br>(in the presence of light and chlorophyll)</p>
<p><b>Chlorophyll</b> is a green pigment found in <b>chloroplasts</b>. It absorbs light and transfers that energy into chemical energy stored in the carbohydrates the plant makes. Without chlorophyll or light, the reaction cannot happen.</p>
<div class="key"><b>Exam tip</b>Light and chlorophyll are not reactants. Write them above the arrow as conditions, not on the left-hand side.</div>
<h4>The balanced chemical equation (Extended)</h4>
<p><b>6CO~2~ + 6H~2~O → C~6~H~12~O~6~ + 6O~2~</b></p>
<p>Check the atoms: 6 carbon, 12 hydrogen and 18 oxygen on each side. Six molecules of carbon dioxide are needed to make one molecule of glucose.</p>
<div class="ex"><b>Worked example</b>How many molecules of oxygen are released when 3 molecules of glucose are made?<br>Each glucose needs 6 O~2~ released, so 3 × 6 = 18 molecules of oxygen.</div>
<h4>What happens to the glucose?</h4>
<p>The plant uses, stores or converts the glucose it makes.</p>
{{BC_USES}}
<ul><li><b>Starch</b> is an insoluble energy store, kept in leaves, stems, roots and seeds.</li><li><b>Cellulose</b> is built into cell walls.</li><li><b>Respiration</b> uses glucose to release energy for growth and other processes.</li><li><b>Sucrose</b> is the soluble form carried in the phloem to growing parts and storage organs.</li><li><b>Nectar</b> is a sugary liquid that attracts insects for pollination.</li></ul>
<h4>Nitrate and magnesium ions</h4>
<p>Glucose is only the start. Plants also need mineral ions from the soil.</p>
<ul><li><b>Nitrate ions</b> supply nitrogen. Plants combine glucose with nitrogen to make <b>amino acids</b>, which are joined to make proteins. Without nitrate, growth is stunted and older leaves turn yellow.</li><li><b>Magnesium ions</b> are needed to make <b>chlorophyll</b>. Without magnesium the leaves turn yellow because chlorophyll cannot be made.</li></ul>
<h4>Investigating what photosynthesis needs</h4>
<p>Starch is made from the glucose produced, so a leaf that has photosynthesised contains starch. The <b>starch test</b> is used to show where photosynthesis has happened.</p>
<ol><li>Destarch the plant by leaving it in the dark for 24 to 48 hours.</li><li>Set up the test and a control, then leave in the light for several hours.</li><li>Remove a leaf and dip it in boiling water for about a minute. This kills the cells and softens the leaf.</li><li>Heat the leaf in hot ethanol in a water bath with the Bunsen burner off. This removes the chlorophyll so the colour change is easy to see.</li><li>Rinse in water, spread on a white tile and add iodine solution. <b>Blue-black means starch is present.</b> Orange-brown means no starch.</li></ol>
{{BC_TESTS}}
<table><tr><th>Factor tested</th><th>Test set-up</th><th>Control</th></tr>
<tr><td>Chlorophyll</td><td>Variegated leaf (green and white)</td><td>The green part of the same leaf</td></tr>
<tr><td>Light</td><td>Part of a leaf covered with black paper or foil</td><td>The uncovered part of the same leaf</td></tr>
<tr><td>Carbon dioxide</td><td>Plant in a sealed bag or jar with soda lime or potassium hydroxide, which absorbs CO~2~</td><td>Identical plant with no CO~2~ absorber</td></tr></table>
<div class="key"><b>Exam tip</b>A control changes only the factor being tested. Everything else, such as the plant, leaf age, time and temperature, stays the same.</div>`,
I("A white-edged leaf is boiled, bleached in ethanol and tested with iodine. Why is only the green part blue-black, and what does that tell you?",
`<ol><li>Look at the starting leaf. Write down which parts you expect to contain chlorophyll.</li><li>Predict the iodine result for the green and the white areas. Explain your reasoning using the word equation.</li><li>List the variables that must be kept the same if you also test the need for light.</li><li>Write a hypothesis you could test with this leaf.</li></ol>`,
`<p><b>Starch test on a leaf.</b> Use a geranium or Coleus plant that has been in the light. Dip a leaf in boiling water for 1 minute (teacher supervised), then heat it in ethanol in a hot water bath. Rinse and add iodine solution. Sketch and colour what you see.</p><p><b>Is light needed?</b> Cover part of a destarched leaf on a living plant with black paper, leave in bright light for a day, then test. Explain where starch was made.</p><p><b>Where does the glucose go?</b> Test a potato, a slice of leaf and a piece of celery with iodine. Record which store starch and suggest why.</p><p class="safe">Safety: ethanol is highly flammable, so use a hot water bath with all flames off. Boiling water scalds. Wear eye protection.</p>`),
[["Write the word equation for photosynthesis.","carbon dioxide + water (1) → glucose + oxygen (1), in the presence of light and chlorophyll (1).",3],
["State the role of chlorophyll in photosynthesis.","It absorbs light energy (1) and transfers it into chemical energy in carbohydrates (1).",2],
["Name two ways a plant uses the glucose it makes.","Any two from: respiration; converted to starch for storage; cellulose for cell walls; sucrose for transport; nectar (1 mark each, maximum two).",2],
["Explain why a plant lacking magnesium ions has yellow leaves.","Magnesium ions are needed to make chlorophyll (1). Without chlorophyll the leaves cannot be green and photosynthesise less (1).",2],
["Describe how to test a leaf for starch.","Boil the leaf in water (1). Heat in hot ethanol to remove chlorophyll (1). Rinse in water, then add iodine solution (1). Blue-black shows starch is present (1).",4]],
[M("Which pair are the raw materials of photosynthesis?",["Oxygen and glucose","Carbon dioxide and water","Starch and oxygen","Water and nitrate"],1,"Carbon dioxide and water are used to make glucose."),
M("What colour does iodine solution turn when starch is present?",["Orange-brown","Colourless","Blue-black","Red"],2,"Blue-black means starch."),
M("Why is a leaf heated in ethanol before testing with iodine?",["To kill it","To remove chlorophyll","To make starch","To add oxygen"],1,"Removing the green colour makes the iodine colour easy to see."),
M("Which sugar is transported in the phloem?",["Glucose","Maltose","Sucrose","Cellulose"],2,"Sucrose is the transport sugar."),
M("Which ions are needed to make amino acids?",["Magnesium ions","Nitrate ions","Calcium ions","Iron ions"],1,"Nitrate supplies nitrogen."),
N("How many molecules of oxygen are released when 5 molecules of glucose are made?",30,"molecules","5 × 6 = 30 molecules of oxygen."),
T("What is the green pigment in chloroplasts called?",["chlorophyll"],"Chlorophyll absorbs light energy."),
M("What is the by-product of photosynthesis?",["Carbon dioxide","Nitrogen","Oxygen","Starch"],2,"Oxygen is released.")],
[["Word equation for photosynthesis","Carbon dioxide + water → glucose + oxygen, with light and chlorophyll."],
["Balanced equation (Extended)","6CO~2~ + 6H~2~O → C~6~H~12~O~6~ + 6O~2~"],
["What is chlorophyll?","A green pigment in chloroplasts that absorbs light energy."],
["Why is starch stored?","It is an insoluble energy store."],
["Which sugar is carried in the phloem?","Sucrose."],
["Use of nitrate ions","To make amino acids (and so proteins)."],
["Use of magnesium ions","To make chlorophyll."],
["Starch test result","Blue-black with iodine means starch is present."]]);

const BC_L62=L("Limiting factors and photosynthesis investigations","How light, carbon dioxide and temperature change the rate of photosynthesis, and how to measure it.",
`<h4>Measuring the rate of photosynthesis</h4>
<p>The rate of photosynthesis can be measured with a water plant such as Elodea or Cabomba. In bright light it gives off bubbles of oxygen. Count the bubbles per minute, or collect the gas in a capillary tube or gas syringe and measure its volume. More bubbles per minute means a faster rate.</p>
<ul><li><b>Light intensity:</b> move a lamp closer or further away and measure the distance. Light intensity falls quickly with distance, so a lamp twice as far away gives about one quarter the intensity.</li><li><b>Carbon dioxide concentration:</b> add different amounts of sodium hydrogencarbonate to the water.</li><li><b>Temperature:</b> use water baths at different temperatures. A beaker of water between lamp and plant stops the lamp heating the plant.</li></ul>
<div class="key"><b>Exam tip</b>Change only one factor at a time and keep the others constant. Repeat each reading and calculate a mean.</div>
<h4>The effect of light, carbon dioxide and temperature</h4>
{{BC_RATE}}
<ul><li><b>Light intensity:</b> rate rises as light increases, then levels off. Chlorophyll can only absorb so much light.</li><li><b>Carbon dioxide:</b> rate rises as concentration increases, then levels off.</li><li><b>Temperature:</b> rate rises as enzymes work faster. Above the optimum, around 35 to 40 °C, the enzymes are denatured and the rate falls.</li></ul>
<h4>Limiting factors (Extended)</h4>
<p>A <b>limiting factor</b> is the factor in shortest supply, so it controls the rate. Increasing a factor that is not limiting makes no difference.</p>
{{BC_LIMIT}}
<table><tr><th>Situation</th><th>Likely limiting factor</th><th>Why</th></tr>
<tr><td>Dim forest floor</td><td>Light intensity</td><td>Little light reaches the leaves</td></tr>
<tr><td>Cold winter day with bright sun</td><td>Temperature</td><td>Enzymes work slowly in the cold</td></tr>
<tr><td>Bright, warm, crowded greenhouse</td><td>Carbon dioxide</td><td>The plants use CO~2~ faster than it enters</td></tr>
<tr><td>Night</td><td>Light intensity</td><td>No light: photosynthesis stops</td></tr></table>
<p>Growers use this idea. In a greenhouse they supply extra light, heat and carbon dioxide so no factor limits the rate for long.</p>
<h4>Gas exchange in an aquatic plant</h4>
<p><b>Hydrogencarbonate indicator</b> shows changes in carbon dioxide concentration. It is red at normal levels, <b>yellow</b> when CO~2~ rises and <b>purple</b> when CO~2~ falls.</p>
{{BC_HCO3}}
<ul><li><b>In the light</b>, the pondweed photosynthesises faster than it respires. It uses up CO~2~, so the indicator goes purple.</li><li><b>In the dark</b>, there is no photosynthesis but respiration continues. CO~2~ is added to the water, so the indicator goes yellow.</li><li>The tube with no plant stays red. It is the control and shows the colour change is caused by the plant.</li></ul>`,
I("Why does a pondweed give off fewer bubbles when the lamp is moved further away, and why does the rate stop rising if you keep moving it closer?",
`<ol><li>Predict the pattern of results as the lamp distance changes. Sketch a graph.</li><li>Explain your prediction using the idea of a limiting factor.</li><li>Choose two variables to keep constant and say how you would control them.</li><li>Decide how many repeats you will do and why.</li></ol>`,
`<p><b>Pondweed investigation.</b> Place a piece of Elodea in a beaker of water with a little sodium hydrogencarbonate. Put a lamp at 10, 20, 30, 40 and 50 cm. Count bubbles in 1 minute at each distance, repeat three times and calculate the mean. Plot rate against distance (or against 1 ÷ distance²).</p><p><b>Indicator tubes.</b> Set up four tubes with hydrogencarbonate indicator: pondweed in light, pondweed in foil, no plant in light, and a sealed tube with a plant in dim light. Record the colours after 2 hours and explain each.</p><p><b>Greenhouse planner.</b> Design the conditions for a tomato greenhouse and justify each choice using limiting factors.</p><p class="safe">Safety: keep water away from electrical equipment and use a lamp that does not get very hot.</p>`),
[["State three factors that can limit the rate of photosynthesis.","Light intensity (1), carbon dioxide concentration (1), temperature (1).",3],
["Describe how the rate of photosynthesis of pondweed can be measured.","Count the bubbles of oxygen released in a set time (1), or measure the volume of gas collected (1).",2],
["A graph of rate against light intensity levels off. Suggest why.","Another factor has become limiting (1), such as carbon dioxide or temperature (1).",2],
["Explain why the rate of photosynthesis falls above about 40 °C.","Enzymes are denatured (1). The reactions can no longer be catalysed (1).",2],
["A tube of hydrogencarbonate indicator with pondweed in the dark turns yellow. Explain.","No photosynthesis in the dark (1). The plant respires and releases CO~2~ (1), so the CO~2~ concentration rises and the indicator goes yellow (1).",3]],
[M("What is a limiting factor?",["The factor in shortest supply that controls the rate","The factor that is always temperature","A product of the reaction","A control variable"],0,"The factor in shortest supply sets the rate."),
M("Hydrogencarbonate indicator is purple. What does this show?",["High CO~2~","Low CO~2~","No water","Acid conditions"],1,"Purple means low CO~2~."),
M("Why is a beaker of water placed between the lamp and the pondweed?",["To add CO~2~","To absorb heat so temperature stays constant","To increase light","To stop bubbles"],1,"It stops the lamp heating the plant."),
M("In a warm, bright greenhouse, which factor is most likely limiting?",["Light","Temperature","Carbon dioxide","Chlorophyll"],2,"Plants use CO~2~ quickly in good conditions."),
M("What happens to the rate of photosynthesis when temperature is above the optimum?",["It rises","It stays the same","It falls","It doubles"],2,"Enzymes are denatured."),
N("A lamp is moved from 10 cm to 20 cm away. By what factor does light intensity fall (inverse square law)?",4,"times lower","Distance doubles, so intensity falls by 2² = 4."),
T("Name the gas given off as bubbles by pondweed in bright light.",["oxygen"],"Oxygen."),
M("A tube with no plant stays red. What is its purpose?",["Control","Repeat","Test for light","Add CO~2~"],0,"It shows that the plant causes the colour change.")],
[["Limiting factor","The factor in shortest supply that controls the rate."],
["Three factors affecting photosynthesis","Light intensity, CO~2~ concentration and temperature."],
["Why does the rate fall at high temperature?","Enzymes are denatured."],
["Hydrogencarbonate indicator colours","Red normal CO~2~, yellow high CO~2~, purple low CO~2~."],
["Pondweed in light turns indicator…","Purple: CO~2~ used up in photosynthesis."],
["Pondweed in dark turns indicator…","Yellow: CO~2~ released by respiration."],
["How can rate be measured?","Count oxygen bubbles per minute or measure gas volume."],
["Why do growers use greenhouses?","To control light, heat and CO~2~ so none limits the rate."]]);

const BC_L63=L("Leaf structure and adaptations","How the structure of a leaf is adapted for photosynthesis.",
`<h4>Why leaves are thin and flat</h4>
<p>Most leaves have a <b>large surface area</b> and are <b>thin</b>.</p>
<ul><li>A large surface area catches more light for photosynthesis.</li><li>A thin leaf means carbon dioxide has only a short distance to diffuse to the cells, and light reaches all the layers.</li></ul>
<h4>Inside a leaf</h4>
{{BC_LEAF}}
<table><tr><th>Structure</th><th>What it is</th></tr>
<tr><td>Cuticle</td><td>Waxy waterproof layer on the outside</td></tr>
<tr><td>Upper and lower epidermis</td><td>Single layers of cells that protect the leaf</td></tr>
<tr><td>Palisade mesophyll</td><td>Tall cells packed closely under the upper epidermis</td></tr>
<tr><td>Spongy mesophyll</td><td>Rounded cells with air spaces between them</td></tr>
<tr><td>Stomata and guard cells</td><td>Pores, mostly on the lower surface, each surrounded by two guard cells</td></tr>
<tr><td>Vascular bundles</td><td>Veins containing xylem and phloem</td></tr></table>
<h4>How each structure helps photosynthesis</h4>
<table><tr><th>Structure</th><th>Adaptation</th></tr>
<tr><td>Cuticle</td><td>Waterproof, so it reduces water loss by evaporation</td></tr>
<tr><td>Upper epidermis</td><td>Thin and transparent, so light passes through to the cells below</td></tr>
<tr><td>Palisade mesophyll</td><td>Many chloroplasts, and placed at the top where light is strongest; most photosynthesis happens here</td></tr>
<tr><td>Spongy mesophyll</td><td>Air spaces let carbon dioxide and oxygen diffuse through the leaf; cells also contain chloroplasts</td></tr>
<tr><td>Stomata</td><td>Let carbon dioxide in and oxygen out; guard cells open and close them</td></tr>
<tr><td>Xylem</td><td>Brings water for photosynthesis and supports the leaf</td></tr>
<tr><td>Phloem</td><td>Carries sucrose away from the leaf</td></tr></table>
<h4>Guard cells and stomata</h4>
<p>Each stoma is a pore between two guard cells. In the light, guard cells take in water and become turgid, so they bend apart and the stoma opens. When water is short they lose water, become flaccid and the stoma closes, which reduces water loss.</p>
{{BC_STOMA}}
<div class="key"><b>Exam tip</b>When asked how a feature is adapted, link three things: the feature, what it does, and why that helps photosynthesis.</div>
<div class="ex"><b>Worked example</b>Explain why palisade cells contain more chloroplasts than spongy mesophyll cells.<br>They are near the top of the leaf where most light arrives, so more chloroplasts there absorb more light for photosynthesis.</div>`,
I("Why is a leaf shaped like a thin, flat sheet, and how is each layer designed for its job?",
`<ol><li>List what a leaf needs for photosynthesis and where each requirement comes from.</li><li>Predict which layer of a leaf should contain the most chloroplasts and explain why.</li><li>Predict whether stomata are more common on the upper or lower surface and give a reason.</li><li>Write down a question you could answer by looking at a leaf under the microscope.</li></ol>`,
`<p><b>Peel and look.</b> Peel a thin layer of lower epidermis from a leaf (such as Tradescantia or lettuce), mount it in water and observe under the microscope. Draw two guard cells and the stoma between them, and estimate how many stomata are in one field of view.</p><p><b>Stomata count.</b> Paint clear nail varnish on the upper and lower surfaces of a leaf. When dry, peel it off with sticky tape, mount it on a slide and count stomata per field of view for each surface.</p><p><b>Leaf model.</b> Use coloured card or modelling clay to build a leaf section and label how each layer is adapted.</p><p class="safe">Safety: handle slides and coverslips carefully and wash your hands after handling plants.</p>`),
[["State two features of a leaf that make it well adapted for photosynthesis.","Any two from: large surface area; thin; contains chloroplasts; stomata for gas exchange; air spaces; veins supply water (1 mark each, maximum two).",2],
["Explain how the thinness of a leaf helps photosynthesis.","Carbon dioxide has a short diffusion distance to cells (1). Light can penetrate to all cells (1).",2],
["Describe the function of the palisade mesophyll.","Most photosynthesis happens here (1) because it has many chloroplasts and is near the top of the leaf where light is strong (1).",2],
["Explain how the air spaces in the spongy mesophyll help photosynthesis.","They let carbon dioxide diffuse to the photosynthesising cells (1) and let oxygen diffuse out (1).",2],
["Describe how guard cells open a stoma.","They take in water and become turgid (1). Their shape changes and they bend apart, opening the pore (1).",2]],
[M("Which layer of a leaf contains most chloroplasts?",["Upper epidermis","Palisade mesophyll","Lower epidermis","Cuticle"],1,"Palisade cells are packed with chloroplasts."),
M("What is the function of the cuticle?",["Absorb light","Reduce water loss","Transport sucrose","Make chlorophyll"],1,"It is waxy and waterproof."),
M("Which tissue carries sucrose away from a leaf?",["Xylem","Phloem","Palisade","Epidermis"],1,"Phloem transports sucrose."),
M("Why are the cells of the upper epidermis transparent?",["To store starch","To let light reach the mesophyll","To open stomata","To make water"],1,"Light must reach the palisade cells."),
M("What happens to guard cells when they lose water?",["They become turgid and the stoma opens","They become flaccid and the stoma closes","They burst","They make chlorophyll"],1,"Flaccid guard cells close the stoma."),
T("Name the tiny pores in a leaf where gases enter and leave.",["stomata","stoma"],"Stomata."),
M("Why are there air spaces in the spongy mesophyll?",["To store water","To allow gases to diffuse","To hold chlorophyll","To support the leaf"],1,"Gases diffuse through the air spaces."),
M("Which tissue brings water to the leaf?",["Phloem","Xylem","Cuticle","Guard cell"],1,"Xylem carries water.")],
[["Why are leaves thin?","Short diffusion distance for CO~2~ and light reaches all cells."],
["Function of the cuticle","Waterproof layer that reduces water loss."],
["Where is most photosynthesis?","In the palisade mesophyll."],
["Role of the spongy mesophyll air spaces","Allow gases to diffuse through the leaf."],
["What are stomata?","Pores for gas exchange, controlled by guard cells."],
["How does a stoma open?","Guard cells take in water, become turgid and bend apart."],
["Function of xylem in a leaf","Brings water and supports."],
["Function of phloem in a leaf","Carries sucrose away."]]);

/* =================== TOPIC 7: HUMAN NUTRITION =================== */
const BC_L71=L("Diet and nutrients","What a balanced diet contains, why each nutrient matters, and what goes wrong when one is missing.",
`<h4>A balanced diet</h4>
<p>A <b>balanced diet</b> contains all the nutrients the body needs, in the right amounts, together with enough energy. The main groups are carbohydrates, fats and oils, proteins, vitamins, mineral ions, fibre and water.</p>
<h4>Nutrients, sources and uses</h4>
<table><tr><th>Nutrient</th><th>Good sources</th><th>Why the body needs it</th></tr>
<tr><td>Carbohydrates</td><td>Bread, rice, potatoes, pasta</td><td>Main source of energy</td></tr>
<tr><td>Fats and oils</td><td>Butter, cooking oil, nuts, oily fish</td><td>Energy store, insulation under the skin and protection of organs</td></tr>
<tr><td>Proteins</td><td>Meat, fish, eggs, beans, milk</td><td>Growth and repair of cells and tissues</td></tr>
<tr><td>Vitamin C</td><td>Citrus fruits, blackcurrants, peppers</td><td>Keeps the skin, gums and blood vessels healthy</td></tr>
<tr><td>Vitamin D</td><td>Oily fish, egg yolk, milk; also made in skin in sunlight</td><td>Helps the body absorb calcium so bones and teeth harden</td></tr>
<tr><td>Calcium</td><td>Milk, cheese, green vegetables</td><td>Strong bones and teeth</td></tr>
<tr><td>Iron</td><td>Red meat, liver, spinach</td><td>Makes haemoglobin in red blood cells</td></tr>
<tr><td>Fibre (roughage)</td><td>Wholegrain cereals, vegetables, fruit</td><td>Adds bulk so food moves through the gut by peristalsis; prevents constipation</td></tr>
<tr><td>Water</td><td>Drinks and foods</td><td>Solvent for reactions; transports substances in blood; needed in all cells</td></tr></table>
<div class="key"><b>Exam tip</b>Fibre is not digested or absorbed. Its role is to keep food moving, not to give energy.</div>
<h4>Energy needs</h4>
<p>Energy needs are not the same for everyone.</p>
{{BC_ENERGY}}
<ul><li><b>Age:</b> growing children and teenagers need a lot of energy for their size.</li><li><b>Activity level:</b> manual workers and athletes use more energy.</li><li><b>Sex:</b> men generally need more energy than women of the same age because they usually have more muscle.</li><li><b>Pregnancy and breast-feeding</b> raise a woman's needs.</li></ul>
<p>If energy intake is higher than needed, the extra is stored as fat. If it is too low, the body breaks down its stores and the person loses mass.</p>
<h4>Deficiency diseases: scurvy and rickets</h4>
<table><tr><th>Disease</th><th>Cause</th><th>Symptoms</th><th>Prevention</th></tr>
<tr><td>Scurvy</td><td>Lack of vitamin C</td><td>Bleeding gums, slow healing of wounds, tiredness</td><td>Eat fresh fruit and vegetables</td></tr>
<tr><td>Rickets</td><td>Lack of vitamin D (so calcium is poorly absorbed)</td><td>Soft, weak bones that bend, mostly in children</td><td>Eat vitamin D foods, get safe sunlight, enough calcium</td></tr></table>
<div class="ex"><b>Worked example</b>Why can a child who gets little sunlight develop rickets even if they eat calcium?<br>Vitamin D helps calcium to be absorbed. Without it, too little calcium reaches the bones, so they stay soft.</div>`,
I("Why do a teenage athlete, a pregnant woman and an office worker not eat the same diet?",
`<ol><li>Write down everything you ate yesterday and sort it into nutrient groups.</li><li>Predict which group is missing or too large in your diet.</li><li>Choose two people with different energy needs and predict whose needs are bigger. Explain why.</li><li>List three foods that would prevent scurvy or rickets.</li></ol>`,
`<p><b>Food label detective.</b> Collect labels from five foods. Record energy, protein, carbohydrate, fat and fibre per 100 g. Rank them by energy and discuss which would suit an athlete and which would suit an office worker.</p><p><b>Menu planning.</b> Plan a day of meals for a 15-year-old athlete that covers all seven nutrient groups. Check each group is present and estimate energy.</p><p><b>Case study.</b> Sailors on long voyages once got scurvy. Research how this was cured and explain the link to vitamin C.</p><p class="safe">Safety: do not taste any food in the laboratory. Check for allergies before handling food packaging that may contain nuts.</p>`),
[["Describe what is meant by a balanced diet.","A diet containing all the nutrients (1) in the correct amounts for the person's needs (1).",2],
["State the importance of calcium and iron in the diet.","Calcium for strong bones and teeth (1). Iron for making haemoglobin (1).",2],
["Name the deficiency disease caused by a lack of vitamin C and state one symptom.","Scurvy (1). Bleeding gums or slow healing of wounds (1).",2],
["Explain why vitamin D is needed to prevent rickets.","Vitamin D helps absorb calcium (1). Without it bones do not harden and become soft and bend (1).",2],
["Suggest why a manual worker needs more energy than an office worker.","Muscles use more energy during physical activity (1), so more energy must be taken in from food (1).",2]],
[M("Which nutrient is the main source of energy?",["Protein","Carbohydrate","Water","Fibre"],1,"Carbohydrates are the main energy source."),
M("Which nutrient is needed for growth and repair?",["Fats","Fibre","Protein","Vitamin D"],2,"Protein builds and repairs tissues."),
M("Lack of vitamin C causes…",["Rickets","Scurvy","Anaemia","Obesity"],1,"Scurvy."),
M("Lack of vitamin D causes…",["Scurvy","Rickets","Constipation","Scurvy and anaemia"],1,"Rickets."),
M("What is the role of fibre?",["Provides energy","Builds muscle","Helps food move through the gut","Makes haemoglobin"],2,"It adds bulk for peristalsis."),
M("Which mineral ion is needed to make haemoglobin?",["Calcium","Iron","Sodium","Magnesium"],1,"Iron."),
T("Name the vitamin that is made in the skin in sunlight.",["vitamin d","d"],"Vitamin D."),
M("Which person needs the most energy?",["Child","Pregnant woman","Adult desk worker","Manual labourer"],3,"Heavy physical work needs most energy.")],
[["Balanced diet","All nutrients in the right amounts for the person's needs."],
["Source and use of carbohydrate","Bread, rice, potatoes: energy."],
["Source and use of protein","Meat, fish, beans: growth and repair."],
["Cause of scurvy","Lack of vitamin C."],
["Cause of rickets","Lack of vitamin D (poor calcium absorption)."],
["Why is calcium needed?","Strong bones and teeth."],
["Why is iron needed?","To make haemoglobin."],
["Why is fibre needed?","Adds bulk so food moves through the gut."]]);

const BC_L72=L("The digestive system and physical digestion","The organs of the alimentary canal, the stages of nutrition, teeth and the churning action of the stomach.",
`<h4>The stages of nutrition</h4>
<ul><li><b>Ingestion:</b> taking food and drink into the body through the mouth.</li><li><b>Digestion:</b> breaking food down into small molecules.</li><li><b>Absorption:</b> moving digested nutrients from the intestine into the blood.</li><li><b>Assimilation:</b> using the nutrients in cells, for example to build new tissue or release energy.</li><li><b>Egestion:</b> removing undigested food as faeces through the anus.</li></ul>
<div class="key"><b>Exam tip</b>Egestion removes food that was never absorbed. Excretion removes waste made by cells. They are different words.</div>
<h4>The alimentary canal and associated organs</h4>
{{BC_GUT}}
<table><tr><th>Organ</th><th>Function</th></tr>
<tr><td>Mouth</td><td>Ingestion; teeth break up food; saliva starts starch digestion</td></tr>
<tr><td>Salivary glands</td><td>Make saliva containing amylase</td></tr>
<tr><td>Oesophagus</td><td>Carries food to the stomach by peristalsis</td></tr>
<tr><td>Stomach</td><td>Churns food; makes acid and pepsin to digest protein</td></tr>
<tr><td>Liver</td><td>Makes bile</td></tr>
<tr><td>Gall bladder</td><td>Stores bile</td></tr>
<tr><td>Pancreas</td><td>Makes digestive enzymes (amylase, protease, lipase)</td></tr>
<tr><td>Small intestine (duodenum and ileum)</td><td>Final digestion and absorption of nutrients</td></tr>
<tr><td>Large intestine (colon and rectum)</td><td>Absorbs water; the rectum stores faeces</td></tr>
<tr><td>Anus</td><td>Egestion of faeces</td></tr></table>
<h4>Physical digestion</h4>
<p><b>Physical digestion</b> breaks food into smaller pieces without changing the chemical structure of the food molecules. It increases the surface area of the food, so enzymes can work on it more quickly in chemical digestion.</p>
<h4>Types of teeth</h4>
{{BC_TYPES}}
<ul><li><b>Incisors:</b> chisel-shaped, at the front, for cutting and biting.</li><li><b>Canines:</b> pointed, for tearing food.</li><li><b>Premolars and molars:</b> broad with bumps (cusps), for crushing and grinding.</li></ul>
<h4>Structure of a tooth</h4>
{{BC_TEETH}}
<ul><li><b>Enamel:</b> the hardest tissue in the body, protects the crown.</li><li><b>Dentine:</b> softer bone-like layer under the enamel.</li><li><b>Pulp cavity:</b> contains nerves and blood vessels that keep the tooth alive and sensitive.</li><li><b>Cement:</b> attaches the root to the jawbone.</li><li>The tooth is embedded in the <b>jawbone</b> and surrounded by the <b>gum</b>.</li></ul>
<h4>The stomach and physical digestion</h4>
<p>The muscular wall of the stomach contracts and relaxes to <b>churn</b> the food. This mixes it with gastric juice and breaks it into smaller pieces, which is another example of physical digestion.</p>
<h4>Bile and emulsification (Extended)</h4>
<p>Bile is made in the liver, stored in the gall bladder and released into the duodenum. It <b>emulsifies</b> fats and oils, breaking large droplets into many small ones. This does not change the fat chemically, but the large surface area lets lipase work faster.</p>
{{BC_BILE}}`,
I("Where does a sandwich go after you swallow it, and what happens to it at each stage?",
`<ol><li>Draw a flow chart from mouth to anus and predict what happens at each organ.</li><li>Decide which organs food passes through and which are only associated organs.</li><li>Predict why teeth come in different shapes.</li><li>Write one question about digestion that you want answered.</li></ol>`,
`<p><b>Tooth detective.</b> Examine models or diagrams of human teeth. Identify incisors, canines, premolars and molars, and match each to its function. Compare with the teeth of a herbivore and a carnivore.</p><p><b>Digestive system model.</b> Use string or a long tube to build a 7-metre model of the alimentary canal (about the real length). Label each organ at an appropriate position.</p><p><b>Physical digestion demonstration.</b> Add equal amounts of whole and crushed sugar lumps to warm water and time how long each takes to dissolve. Explain what this shows about surface area.</p><p class="safe">Safety: do not eat or drink in the laboratory. Wash hands after handling models.</p>`),
[["Name the five stages of nutrition.","Ingestion (1), digestion (1), absorption (1), assimilation (1), egestion (1).",5],
["State the function of the liver and the gall bladder in digestion.","The liver makes bile (1). The gall bladder stores bile (1).",2],
["Describe the functions of incisors and molars.","Incisors cut and bite food (1). Molars crush and grind food (1).",2],
["Describe what physical digestion is and why it is important.","Breakdown of food into smaller pieces without chemical change (1). It increases the surface area for enzymes (1).",2],
["State the function of enamel and pulp in a tooth.","Enamel protects the tooth (hard covering) (1). Pulp contains nerves and blood vessels (1).",2]],
[M("Which organ makes bile?",["Gall bladder","Pancreas","Liver","Stomach"],2,"The liver makes bile."),
M("Which term means the removal of undigested food?",["Excretion","Egestion","Absorption","Assimilation"],1,"Egestion."),
M("Which tooth is used for tearing food?",["Incisor","Canine","Premolar","Molar"],1,"Canines tear."),
M("Which part of a tooth is the hardest?",["Dentine","Pulp","Enamel","Cement"],2,"Enamel."),
M("Which organ stores bile?",["Liver","Gall bladder","Pancreas","Duodenum"],1,"The gall bladder stores bile."),
M("Which organ does not food pass through?",["Oesophagus","Stomach","Pancreas","Ileum"],2,"The pancreas is an associated organ."),
M("Bile helps digestion by…",["Digesting protein","Emulsifying fats","Making acid","Absorbing water"],1,"Bile breaks fat into small droplets."),
T("What is the movement of food by muscular contraction called?",["peristalsis"],"Peristalsis moves food along the gut.")],
[["Ingestion","Taking food into the body."],
["Assimilation","Using absorbed nutrients in the cells."],
["Egestion","Removal of undigested food as faeces."],
["Physical digestion","Breaking food into smaller pieces without chemical change."],
["Function of incisors","Cutting and biting."],
["Function of molars","Crushing and grinding."],
["Where are nerves and blood vessels in a tooth?","In the pulp cavity."],
["Role of bile (Extended)","Emulsifies fats, increasing surface area for lipase."]]);

const BC_L73=L("Chemical digestion and absorption","Digestive enzymes, where they work, the role of acid and bile, and how the small intestine absorbs food.",
`<h4>Chemical digestion</h4>
<p><b>Chemical digestion</b> breaks down large, insoluble molecules into small, soluble molecules using enzymes. The small molecules can pass through the wall of the small intestine into the blood, but the large molecules cannot.</p>
<h4>The digestive enzymes</h4>
<table><tr><th>Enzyme</th><th>Substrate → product</th><th>Made in</th><th>Works in</th></tr>
<tr><td><b>Amylase</b></td><td>Starch → simple reducing sugars</td><td>Salivary glands and pancreas</td><td>Mouth and small intestine</td></tr>
<tr><td><b>Protease</b></td><td>Protein → amino acids</td><td>Stomach and pancreas</td><td>Stomach and small intestine</td></tr>
<tr><td><b>Lipase</b></td><td>Fats and oils → fatty acids and glycerol</td><td>Pancreas</td><td>Small intestine</td></tr></table>
<div class="key"><b>Exam tip</b>Name the product as well as the enzyme. Protease makes amino acids, not "protein".</div>
<h4>Hydrochloric acid in the stomach</h4>
<p>The stomach makes hydrochloric acid in gastric juice. It <b>kills harmful microorganisms</b> in food and gives the <b>acidic pH</b> in which stomach protease works best.</p>
<h4>Digestion of starch and protein in detail (Extended)</h4>
<ul><li><b>Starch:</b> amylase breaks starch into <b>maltose</b>. Maltase, on the membranes of the cells lining the small intestine, then breaks maltose into <b>glucose</b>.</li><li><b>Protein:</b> <b>pepsin</b> works in the acid conditions of the stomach. <b>Trypsin</b> works in the alkaline conditions of the small intestine.</li></ul>
{{BC_PH}}
<p><b>Bile</b> is alkaline. It <b>neutralises</b> the acidic mixture of food and gastric juice entering the duodenum, giving a suitable pH for the pancreatic enzymes to work.</p>
<h4>Absorption in the small intestine</h4>
<p>The small intestine is where nutrients are <b>absorbed</b>. Most water is also absorbed here, and the rest is absorbed in the colon. Undigested material becomes faeces.</p>
<h4>The villus (Extended)</h4>
{{BC_VILLUS}}
<ul><li><b>Villi and microvilli</b> greatly increase the internal surface area, so more nutrients can be absorbed quickly.</li><li>The wall is <b>one cell thick</b>, so the diffusion distance is short.</li><li>A network of <b>capillaries</b> carries absorbed glucose, amino acids, minerals and water-soluble vitamins in the blood to the liver and around the body.</li><li>A <b>lacteal</b> carries fatty acids and glycerol, which are absorbed into the lymph.</li></ul>
<div class="ex"><b>Worked example</b>Explain why starch must be digested before it can be absorbed.<br>Starch is a large insoluble molecule that cannot pass through the wall of the intestine. Digestion converts it into small soluble glucose molecules that can be absorbed into the blood.</div>`,
I("Why must a bite of bread be digested before the body can use it?",
`<ol><li>Predict what size molecules can pass through the intestine wall.</li><li>Suggest what must happen to starch, protein and fat before absorption.</li><li>Predict the effect of removing the pancreas on digestion.</li><li>Write a hypothesis about how pH affects an enzyme in the gut.</li></ol>`,
`<p><b>Starch and amylase.</b> Mix starch solution with saliva (or amylase solution) in a warm water bath. Every minute, add a drop to iodine solution on a spotting tile until it stays orange-brown. Record the time. Repeat with boiled enzyme and with acid added.</p><p><b>Visking tubing gut model.</b> Fill Visking tubing with starch and glucose solution, place in water and test the water for starch (iodine) and glucose (Benedict's) after 20 minutes. Explain which molecules pass through and link this to absorption.</p><p><b>Milk and lipase.</b> Add lipase to milk with sodium carbonate and phenolphthalein. Time the pink colour to disappear as fatty acids form. Compare with and without bile salts.</p><p class="safe">Safety: wear eye protection. Benedict's solution must be heated in a hot water bath, not boiled directly. Do not drink anything in the laboratory.</p>`),
[["State the products of digestion by amylase, protease and lipase.","Amylase: simple reducing sugars (1). Protease: amino acids (1). Lipase: fatty acids and glycerol (1).",3],
["State two functions of hydrochloric acid in the stomach.","Kills harmful microorganisms (1). Gives the acidic pH for protease to work (1).",2],
["Explain why bile is released into the duodenum.","It neutralises acid from the stomach (1) and gives an alkaline pH for enzymes in the small intestine (1).",2],
["Describe how a villus is adapted for absorption.","Large surface area from villi and microvilli (1). Thin wall of one cell (1). Capillaries carry away absorbed nutrients (1). Lacteal absorbs fats (1).",4],
["Name the region where most water is absorbed.","Small intestine (1).",1]],
[M("Where is amylase made?",["Stomach","Liver","Salivary glands and pancreas","Gall bladder"],2,"Salivary glands and pancreas."),
M("Which enzyme digests fats?",["Amylase","Lipase","Protease","Maltase"],1,"Lipase."),
M("What are the products of protein digestion?",["Fatty acids","Glucose","Amino acids","Maltose"],2,"Amino acids."),
M("Pepsin works best in…",["Alkaline conditions","Acid conditions","Neutral conditions","Boiling water"],1,"The stomach is acidic."),
M("Which vessel in a villus absorbs fatty acids and glycerol?",["Capillary","Lacteal","Vein","Artery"],1,"The lacteal."),
M("What is maltose broken down into?",["Fatty acids","Glucose","Amino acids","Glycerol"],1,"Maltase makes glucose."),
T("Name the enzyme that digests starch.",["amylase"],"Amylase."),
M("Which feature makes absorption in the small intestine fast?",["Thick wall","Few villi","Large surface area","No blood supply"],2,"Villi and microvilli give a large surface area.")],
[["Chemical digestion","Breaking large insoluble molecules into small soluble ones using enzymes."],
["Amylase: substrate and product","Starch → simple sugars (maltose, Extended)."],
["Protease: substrate and product","Protein → amino acids."],
["Lipase: substrate and product","Fats and oils → fatty acids and glycerol."],
["Role of stomach acid","Kills microorganisms; gives acid pH for pepsin."],
["Role of bile (alkaline)","Neutralises acid, emulsifies fats."],
["What does a lacteal absorb?","Fatty acids and glycerol."],
["Why are villi useful?","Large surface area for absorption."]]);

/* =================== QUIZZES AND EXAM-STYLE QUESTIONS =================== */
const BC_SRC="Hub exam-style question (written for this hub), ";
const BC_Q6=[
M("Which equation correctly summarises photosynthesis?",["glucose + oxygen → carbon dioxide + water","carbon dioxide + water → glucose + oxygen","carbon dioxide + oxygen → glucose + water","water + glucose → carbon dioxide + oxygen"],1,"Carbon dioxide and water are the raw materials; glucose and oxygen are made."),
M("In which structures does photosynthesis take place?",["Mitochondria","Nuclei","Chloroplasts","Vacuoles"],2,"Chloroplasts contain chlorophyll."),
T("Name the sugar that is transported in the phloem.",["sucrose"],"Sucrose."),
N("In 6CO~2~ + 6H~2~O → C~6~H~12~O~6~ + 6O~2~, how many molecules of oxygen are made when 2 molecules of glucose are made?",12,"molecules","Each glucose comes with 6 O~2~, so 2 × 6 = 12."),
M("A variegated leaf is tested for starch. What colour is the white area after adding iodine?",["Blue-black","Orange-brown","Green","Colourless"],1,"No chlorophyll, so no starch."),
M("The rate of photosynthesis stops increasing as light intensity rises. What is the best explanation?",["Light intensity is always the limiting factor","Another factor is now limiting","Chlorophyll has been used up","Oxygen is too high"],1,"A different factor such as CO~2~ or temperature has become limiting."),
M("Where are most stomata found in a typical leaf?",["Upper epidermis","Lower epidermis","Palisade layer","Xylem"],1,"The lower surface is cooler, so less water is lost."),
M("Why do plants need nitrate ions?",["To make chlorophyll","To make amino acids","To make cellulose","To make starch"],1,"Nitrate supplies nitrogen for amino acids.")];
const BC_Q7=[
M("Which nutrient is needed to make haemoglobin?",["Calcium","Iron","Vitamin C","Fibre"],1,"Iron."),
M("Which deficiency causes rickets?",["Vitamin C","Vitamin D","Iron","Protein"],1,"Vitamin D (and so poor calcium absorption)."),
T("Name the process by which digested food moves into the blood.",["absorption"],"Absorption."),
M("Which organ stores bile?",["Liver","Pancreas","Gall bladder","Stomach"],2,"Gall bladder."),
M("Which enzyme digests protein in the stomach?",["Amylase","Pepsin","Lipase","Maltase"],1,"Pepsin."),
M("What does the lacteal absorb?",["Glucose","Amino acids","Fatty acids and glycerol","Water"],2,"Fats go into the lymph via the lacteal."),
M("The pulp cavity of a tooth contains…",["Enamel","Dentine","Nerves and blood vessels","Cement"],2,"The living part of the tooth."),
N("A man with a desk job needs about 10.5 MJ per day and a manual worker about 14 MJ. What is the difference?",3.5,"MJ","14 − 10.5 = 3.5 MJ.")];

const BC_PP6=[
P("Photosynthesis equation and the starch test",6,"<p>Photosynthesis takes place in the leaves of plants.</p><ol type='a'><li>Complete the word equation for photosynthesis.<br>carbon dioxide + ................ → ................ + oxygen [2]</li><li>Name the green pigment needed for photosynthesis. [1]</li><li>Describe how a leaf is tested for starch. [3]</li></ol>",["(a) water (1); glucose (1).","(b) chlorophyll (1).","(c) The leaf is boiled in water (1). It is heated in ethanol to remove the chlorophyll (1). Iodine solution is added and a blue-black colour shows starch is present (1)."],BC_SRC+"Topic 6"),
P("Light intensity and the rate of photosynthesis",7,"<p>A student investigated the effect of the distance of a lamp on the number of bubbles of gas given off per minute by pondweed.</p>"+TBL(["Distance of lamp (cm)","Bubbles per minute"],[[10,60],[20,38],[30,22],[40,14],[50,9]],340)+"<ol type='a'><li>State the independent variable in this investigation. [1]</li><li>Describe the trend shown by the results. [2]</li><li>State two variables that should be kept constant. [2]</li><li>Calculate the percentage decrease in bubbles per minute when the lamp moves from 10 cm to 50 cm. [2]</li></ol>",["(a) The distance of the lamp from the pondweed (1).","(b) As the lamp moves further away the number of bubbles per minute decreases (1). The rate falls quickly at first and then more slowly (1).","(c) Any two from: temperature of the water; mass or length of pondweed; same pondweed; carbon dioxide concentration; time over which bubbles are counted (2).","(d) (60 − 9) ÷ 60 × 100 (1) = 85% (1)."],BC_SRC+"Topic 6"),
P("Limiting factors in a greenhouse",5,"<p>A grower measured the rate of photosynthesis of tomato plants at different light intensities at two carbon dioxide concentrations. The temperature was kept constant at 25 °C.</p>"+TBL(["Light intensity (units)","Rate at 0.04% CO₂","Rate at 0.1% CO₂"],[[0,0,0],[20,10,10],[40,20,20],[60,22,30],[80,22,38],[100,22,40]],420)+"<ol type='a'><li>State the rate of photosynthesis at 0.04% carbon dioxide and light intensity 40. [1]</li><li>At 0.04% carbon dioxide the rate does not increase above light intensity 60. Name the limiting factor and explain your answer. [2]</li><li>Suggest why the rate at 0.1% carbon dioxide levels off at the highest light intensities. [1]</li><li>Calculate how much the rate increases at light intensity 100 when the carbon dioxide concentration is raised from 0.04% to 0.1%. [1]</li></ol>",["(a) 20 (1).","(b) Carbon dioxide concentration (1), because increasing it to 0.1% gave a higher rate at the same light intensity (1).","(c) Another factor, such as temperature, has become limiting (1).","(d) 40 − 22 = 18 (1)."],BC_SRC+"Topic 6"),
P("Leaf structure",6,"<p>The diagram in your notes shows a section through a leaf of a dicotyledonous plant.</p><ol type='a'><li>Name the layer of the leaf where most photosynthesis takes place. [1]</li><li>Explain two ways in which the cells of this layer are adapted for photosynthesis. [2]</li><li>Explain how the structure of the spongy mesophyll layer helps photosynthesis. [2]</li><li>State the function of the phloem in a leaf. [1]</li></ol>",["(a) Palisade mesophyll (1).","(b) They contain many chloroplasts to absorb light (1). They are tall and closely packed, close to the upper surface where the light is strongest (1).","(c) It has air spaces between the cells (1) that allow carbon dioxide to diffuse to the photosynthesising cells and oxygen to leave (1).","(d) To carry sucrose away from the leaf (1)."],BC_SRC+"Topic 6"),
P("Hydrogencarbonate indicator",5,"<p>Four test tubes were set up with hydrogencarbonate indicator solution, which is red at normal carbon dioxide levels. Tube A: pondweed in the light. Tube B: pondweed wrapped in foil. Tube C: no pondweed in the light. After three hours the colours were compared.</p><ol type='a'><li>State the colour of the indicator in tube B. [1]</li><li>Explain the colour of the indicator in tube A. [2]</li><li>State the purpose of tube C. [1]</li><li>Explain why tube B was wrapped in foil. [1]</li></ol>",["(a) Yellow (1).","(b) Purple (1) because photosynthesis used up carbon dioxide faster than respiration released it (1).","(c) It is a control to show that the colour change is caused by the pondweed (1).","(d) To keep the plant in the dark so only respiration happens, to show the effect of light (1)."],BC_SRC+"Topic 6")];

const BC_PP7=[
P("Nutrients and deficiency diseases",6,"<p>A balanced diet contains a number of different nutrients.</p><ol type='a'><li>State one good source of protein. [1]</li><li>State why iron is needed in the diet. [1]</li><li>Name the disease caused by a lack of vitamin C and state one symptom. [2]</li><li>Explain why fibre is needed in the diet. [2]</li></ol>",["(a) Any one from: meat; fish; eggs; beans; milk (1).","(b) To make haemoglobin (1).","(c) Scurvy (1); bleeding gums or slow healing of wounds (1).","(d) It adds bulk to the food (1) so food moves through the gut by peristalsis and constipation is prevented (1)."],BC_SRC+"Topic 7"),
P("Energy needs",5,"<p>The table shows the approximate energy needs of four adults.</p>"+TBL(["Person","Energy needed per day (kJ)"],[["Office worker (man)",10500],["Office worker (woman)",8500],["Pregnant woman, office worker",9500],["Farm labourer (man)",15000]],360)+"<ol type='a'><li>Calculate how much more energy the farm labourer needs than the male office worker. [1]</li><li>Explain why the farm labourer needs more energy. [2]</li><li>Suggest why the pregnant woman needs more energy than the other woman. [1]</li><li>State what happens to energy taken in food that is not used. [1]</li></ol>",["(a) 15 000 − 10 500 = 4500 kJ (1).","(b) The labourer's muscles are more active (1) so more energy is released by respiration and must be supplied by food (1).","(c) Energy is needed for the growth of the baby (1).","(d) It is stored as fat (1)."],BC_SRC+"Topic 7"),
P("The digestive system",7,"<p>The digestive system includes the liver, gall bladder, stomach and small intestine.</p><ol type='a'><li>Name the organ that (i) makes bile [1] (ii) stores bile [1]</li><li>Describe the role of bile in digestion. [2]</li><li>State two functions of the stomach in digestion. [2]</li><li>Define the term <b>egestion</b>. [1]</li></ol>",["(a)(i) Liver (1). (ii) Gall bladder (1).","(b) Bile emulsifies fats into small droplets, increasing the surface area for lipase (1). Bile is alkaline and neutralises the acid from the stomach (1).","(c) The stomach churns the food (1) and makes acid and protease enzyme to digest protein (1).","(d) The removal of undigested food from the body as faeces (1)."],BC_SRC+"Topic 7"),
P("Teeth",6,"<p>Human teeth help in the physical digestion of food.</p><ol type='a'><li>Name the type of tooth used for cutting food. [1]</li><li>Name the hard outer covering of the crown of a tooth. [1]</li><li>State which part of a tooth contains nerves and blood vessels. [1]</li><li>Explain why humans have teeth of different shapes. [2]</li><li>Describe what is meant by physical digestion. [1]</li></ol>",["(a) Incisor (1).","(b) Enamel (1).","(c) The pulp cavity (1).","(d) Each type does a different job (1): incisors cut, canines tear and premolars and molars crush and grind (1).","(e) Breakdown of food into smaller pieces without chemical change (1)."],BC_SRC+"Topic 7"),
P("Enzymes and the small intestine",8,"<p>Digestive enzymes break down large molecules into small molecules that can be absorbed.</p><ol type='a'><li>State the substrate of amylase. [1]</li><li>State the product of protease digestion. [1]</li><li>State where lipase is made. [1]</li><li>Pepsin works best at about pH 2 and trypsin at about pH 8. Explain why this suits where each enzyme works. [2]</li><li>Describe three ways a villus is adapted for absorption. [3]</li></ol>",["(a) Starch (1).","(b) Amino acids (1).","(c) The pancreas (1).","(d) Pepsin works in the acidic stomach (1). Trypsin works in the alkaline small intestine after bile has neutralised the acid (1).","(e) Any three from: villi and microvilli give a large surface area; the wall is one cell thick for a short diffusion distance; capillaries carry nutrients away to maintain a concentration gradient; lacteal absorbs fatty acids and glycerol (3)."],BC_SRC+"Topic 7")];

BSET(6,[BC_L61,BC_L62,BC_L63],BC_Q6,BC_PP6);
BSET(7,[BC_L71,BC_L72,BC_L73],BC_Q7,BC_PP7);
