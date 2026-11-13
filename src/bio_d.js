/* ===== Biology 0610, topics 8 and 9: transport in plants and animals (prefix BD_) ===== */
const BD_FG=(vb,inner,cap,label,maxw)=>`<figure class="fig"${maxw?` style="max-width:${maxw}px"`:""}><svg viewBox="${vb}" role="img" aria-label="${label}">${inner}</svg><figcaption>${cap}</figcaption></figure>`;
const BD_T=(x,y,s,o)=>{o=o||{};return `<text x="${x}" y="${y}" font-size="${o.s||11}" text-anchor="${o.a||"middle"}"${o.b?' font-weight="700"':""}${o.i?' font-style="italic"':""} ${o.c?`style="fill:${o.c}"`:'fill="currentColor"'}>${s}</text>`};
const BD_ARR=(x1,y1,x2,y2,col,w)=>{const a=Math.atan2(y2-y1,x2-x1),h=7,c=col||"currentColor";
  return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="${w||2}" fill="none"/><path d="M${x2} ${y2}l${(-h*Math.cos(a-.45)).toFixed(1)} ${(-h*Math.sin(a-.45)).toFixed(1)}M${x2} ${y2}l${(-h*Math.cos(a+.45)).toFixed(1)} ${(-h*Math.sin(a+.45)).toFixed(1)}" stroke="${c}" stroke-width="${w||2}" fill="none" stroke-linecap="round"/>`};
const BD_BOX=(x,y,w,h,lines,o)=>{o=o||{};return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" ${o.f?`style="fill:${o.f}"`:'fill="none"'} ${o.fo?`fill-opacity="${o.fo}"`:""} stroke="currentColor" stroke-opacity=".6" stroke-width="1.4"/>`+lines.map((t,i)=>BD_T(x+w/2,y+h/2+4-(lines.length-1)*7+i*14,t,{s:o.s||11,b:i===0&&o.b})).join("")};
const BD_LN=(x1,y1,x2,y2,col,w,dash)=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${col||"currentColor"}" stroke-opacity="${col?1:.55}" stroke-width="${w||1}" fill="none"${dash?` stroke-dasharray="${dash}"`:""}/>`;
const BD_X="var(--blu)",BD_P="var(--amber)",BD_R="var(--bad)";

/* three sections showing where xylem and phloem sit */
FIGS.BD_SECT=()=>{
  let s="";
  /* root */
  s+=`<circle cx="70" cy="66" r="52" fill="none" stroke="currentColor" stroke-opacity=".6" stroke-width="1.6"/><circle cx="70" cy="66" r="30" fill="none" stroke="currentColor" stroke-opacity=".3"/>`;
  s+=`<path d="M70 42L74 62L94 66L74 70L70 90L66 70L46 66L66 62Z" style="fill:${BD_X}" fill-opacity=".85"/>`;
  [[70,50],[88,66],[70,82],[52,66]].forEach(p=>{s+=`<circle cx="${p[0]+(p[0]===70?(p[1]<66?7:-7):0)*0+0}" cy="${p[1]}" r="0"/>`});
  [[84,52],[84,80],[56,80],[56,52]].forEach(p=>{s+=`<circle cx="${p[0]}" cy="${p[1]}" r="6" style="fill:${BD_P}" fill-opacity=".9"/>`});
  s+=BD_T(70,134,"Root",{b:1,s:12})+BD_T(70,149,"xylem in a star at the centre",{s:10})+BD_T(70,162,"phloem between the arms",{s:10});
  /* stem */
  s+=`<circle cx="210" cy="66" r="52" fill="none" stroke="currentColor" stroke-opacity=".6" stroke-width="1.6"/>`;
  for(let i=0;i<7;i++){const a=i*Math.PI*2/7-Math.PI/2,cx=210+Math.cos(a)*32,cy=66+Math.sin(a)*32,ox=210+Math.cos(a)*40,oy=66+Math.sin(a)*40;
    s+=`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="6" style="fill:${BD_X}" fill-opacity=".85"/><circle cx="${ox.toFixed(1)}" cy="${oy.toFixed(1)}" r="5" style="fill:${BD_P}" fill-opacity=".9"/>`}
  s+=BD_T(210,134,"Stem",{b:1,s:12})+BD_T(210,149,"ring of bundles near the edge",{s:10})+BD_T(210,162,"xylem inside, phloem outside",{s:10});
  /* leaf */
  s+=`<path d="M290 46Q350 34 410 46L410 86Q350 98 290 86Z" fill="none" stroke="currentColor" stroke-opacity=".6" stroke-width="1.6"/>`;
  s+=`<circle cx="350" cy="58" r="7" style="fill:${BD_X}" fill-opacity=".85"/><circle cx="350" cy="75" r="6" style="fill:${BD_P}" fill-opacity=".9"/>`;
  s+=BD_T(350,134,"Leaf (midrib)",{b:1,s:12})+BD_T(350,149,"xylem above the phloem",{s:10})+BD_T(350,162,"(towards the upper surface)",{s:10});
  s+=`<circle cx="150" cy="184" r="6" style="fill:${BD_X}" fill-opacity=".85"/>`+BD_T(160,188,"xylem",{a:"start",s:10.5})+`<circle cx="220" cy="184" r="6" style="fill:${BD_P}" fill-opacity=".9"/>`+BD_T(230,188,"phloem",{a:"start",s:10.5});
  return BD_FG("0 0 420 194",s,"Xylem (blue) and phloem (amber) in sections of a root, stem and leaf of a non-woody dicotyledonous plant. Sections are drawn schematically.","Schematic cross sections of a root, stem and leaf showing the position of xylem and phloem",520);
};

/* xylem vessel structure */

/* root hair cell */

/* water pathway */
FIGS.BD_PATH=()=>{
  const st=[["Soil water","water is in contact with the root hair cells"],["Root hair cells","water enters by osmosis"],["Root cortex cells","water moves across the root"],["Xylem","water is carried up the root and stem"],["Mesophyll cells in the leaf","water leaves the xylem and enters the leaf cells"],["Air spaces and stomata","water vapour escapes: transpiration"]];
  let s="";st.forEach((r,i)=>{const y=6+i*40;s+=BD_BOX(10,y,150,28,[r[0]],{b:1,s:11,f:i===3?"var(--blubg)":"var(--mint)"})+BD_T(172,y+18,r[1],{a:"start",s:10.5});if(i<5)s+=BD_ARR(85,y+29,85,y+39,"currentColor",1.8)});
  return BD_FG("0 0 420 240",s,"The route taken by water from the soil to the air. Only the xylem is a long-distance tube; every other stage is cell to cell.","Flow chart of water moving from soil through root hair cells, root cortex, xylem and leaf mesophyll cells out through stomata",520);
};

/* leaf section transpiration */

/* factors bar chart (relative rates, illustrative) */
FIGS.BD_FACT=()=>{
  const d=[["Cool, still, humid air",1],["Warm, still air",3],["Warm and windy",5],["Hot, windy and dry",8]];
  let s=BD_T(10,14,"Relative rate of transpiration (illustrative values)",{a:"start",s:12,b:1});
  d.forEach((r,i)=>{const y=28+i*34,w=r[1]*30;s+=BD_T(10,y+17,r[0],{a:"start",s:10.5})+`<rect x="150" y="${y}" width="${w}" height="24" rx="3" style="fill:var(--accent)" fill-opacity="${.45+i*.15}"/>`+BD_T(154+w,y+17,String(r[1]),{a:"start",s:11,b:1})});
  s+=BD_T(10,172,"Higher temperature, more wind and lower humidity all increase the rate.",{a:"start",s:10.5,i:1});
  return BD_FG("0 0 420 180",s,"Warmer air, moving air and drier air all increase the rate of transpiration. The numbers are relative, not measured values.","Bar chart of relative transpiration rate in four conditions from cool still humid air to hot windy dry air",520);
};

/* potometer */

/* turgid and flaccid cells */

/* sources and sinks */
FIGS.BD_SOURCE=()=>{
  let s=`<path d="M210 176L210 36" stroke="currentColor" stroke-opacity=".6" stroke-width="5" fill="none"/>`;
  s+=`<ellipse cx="160" cy="60" rx="38" ry="14" style="fill:var(--good)" fill-opacity=".6" stroke="currentColor" stroke-opacity=".5" transform="rotate(-14 160 60)"/><ellipse cx="262" cy="80" rx="38" ry="14" style="fill:var(--good)" fill-opacity=".6" stroke="currentColor" stroke-opacity=".5" transform="rotate(14 262 80)"/>`;
  s+=`<ellipse cx="210" cy="26" rx="14" ry="9" style="fill:var(--good)" fill-opacity=".35" stroke="currentColor" stroke-opacity=".5"/>`;
  s+=`<circle cx="250" cy="124" r="14" style="fill:var(--red)" fill-opacity=".7" stroke="currentColor" stroke-opacity=".6"/><path d="M210 120L236 124" stroke="currentColor" stroke-opacity=".6" stroke-width="3"/>`;
  s+=`<ellipse cx="210" cy="190" rx="30" ry="9" style="fill:var(--amber)" fill-opacity=".5" stroke="currentColor" stroke-opacity=".6"/>`;
  s+=BD_ARR(194,76,194,104,BD_P,3)+BD_ARR(226,100,226,128,BD_P,3)+BD_ARR(204,46,204,34,BD_P,3)+BD_ARR(196,140,196,178,BD_P,3);
  s+=BD_T(14,104,"SOURCE",{a:"start",s:12,b:1,c:"var(--accent)"})+BD_T(14,118,"mature leaves make",{a:"start",s:10.5})+BD_T(14,131,"sucrose by photosynthesis",{a:"start",s:10.5});
  s+=BD_T(300,22,"SINK: growing shoot tip",{a:"start",s:10.5,b:1});
  s+=BD_T(276,128,"SINK: fruit and seeds",{a:"start",s:10.5,b:1});
  s+=BD_T(14,170,"SINK: root and storage",{a:"start",s:10.5,b:1})+BD_T(14,184,"organs (store starch)",{a:"start",s:10.5,b:1});
  s+=BD_T(300,162,"amber arrows: sucrose and",{a:"start",s:10})+BD_T(300,175,"amino acids in the phloem",{a:"start",s:10});
  return BD_FG("0 0 420 204",s,"Sucrose and amino acids move in the phloem from the source (where they are made or released) to sinks (where they are used or stored), up or down the plant.","Plant diagram with leaves as the source and growing tip, fruit and roots as sinks with arrows showing flow in the phloem",520);
};

/* source and sink swap */
FIGS.BD_SEASON=()=>{
  let s=BD_T(105,16,"Early spring",{b:1,s:12})+BD_T(315,16,"Summer",{b:1,s:12});
  s+=BD_BOX(20,30,150,34,["Potato tuber","SOURCE (releases sucrose)"],{s:10.5,b:1,f:"var(--peach)"})+BD_ARR(95,66,95,96,BD_P,3)+BD_BOX(20,98,150,34,["Young shoots","SINK (growing)"],{s:10.5,b:1,f:"var(--mint)"});
  s+=BD_BOX(230,30,150,34,["Mature leaves","SOURCE (photosynthesis)"],{s:10.5,b:1,f:"var(--mint)"})+BD_ARR(305,66,305,96,BD_P,3)+BD_BOX(230,98,150,34,["Potato tuber","SINK (stores starch)"],{s:10.5,b:1,f:"var(--peach)"});
  s+=BD_T(210,160,"The tuber is a sink in summer and a source in spring.",{s:10.5,i:1});
  return BD_FG("0 0 420 170",s,"A storage organ can be a sink at one time of year and a source at another. Leaves are usually sources, but young leaves can be sinks.","Two panels showing a potato tuber acting as a source in spring and a sink in summer",520);
};

/* single and double circulation */

/* heart structure */

/* heartbeat stages */
FIGS.BD_BEAT=()=>{
  const st=[["1. Atria contract","Blood is squeezed into the ventricles. The atrioventricular valves are open."],["2. Ventricles contract","The atrioventricular valves shut (lub). Semilunar valves open. Blood leaves in the arteries."],["3. Heart relaxes","Semilunar valves shut (dub). Blood flows into the atria from the veins."]];
  let s="";st.forEach((r,i)=>{const y=6+i*58;s+=BD_BOX(10,y,120,46,[r[0]],{b:1,s:11,f:"var(--peach)"})+BD_T(142,y+20,r[1].split(". ")[0]+".",{a:"start",s:10.5})+BD_T(142,y+35,r[1].split(". ").slice(1).join(". "),{a:"start",s:10.5});if(i<2)s+=BD_ARR(70,y+47,70,y+57,"currentColor",1.8)});
  return BD_FG("0 0 420 184",s,"One heartbeat is a cycle of contraction and relaxation. Valves make sure blood only flows one way.","Three step flow chart of the heartbeat: atria contract, ventricles contract, heart relaxes",520);
};

/* heart rate during exercise */
FIGS.BD_HRATE=()=>{
  const pts=[[0,70],[2,70],[3,100],[4,125],[5,140],[6,150],[7,120],[8,100],[9,88],[10,80],[12,73],[14,70]];
  const X=t=>46+t*24,Y=b=>150-(b-50)*1.05;
  let s=`<rect x="${X(2)}" y="14" width="${X(6)-X(2)}" height="136" style="fill:var(--amber)" fill-opacity=".18"/>`;
  s+=BD_LN(46,14,46,150,"currentColor",1.4)+BD_LN(46,150,386,150,"currentColor",1.4);
  [60,80,100,120,140,160].forEach(b=>{s+=BD_T(40,Y(b)+4,String(b),{a:"end",s:9.5})+BD_LN(46,Y(b),386,Y(b),"currentColor",.5,"2 4")});
  for(let t=0;t<=14;t+=2)s+=BD_T(X(t),164,String(t),{s:9.5});
  s+=`<polyline points="${pts.map(p=>X(p[0])+","+Y(p[1])).join(" ")}" fill="none" style="stroke:var(--bad)" stroke-width="2.6"/>`;
  pts.forEach(p=>{s+=`<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="2.6" style="fill:var(--bad)"/>`});
  s+=BD_T(X(4),28,"exercise",{s:10.5,b:1})+BD_T(220,178,"time (minutes)",{s:10.5});
  s+=`<text x="12" y="84" font-size="10.5" fill="currentColor" text-anchor="middle" transform="rotate(-90 12 84)">heart rate (beats per minute)</text>`;
  return BD_FG("0 0 420 184",s,"Heart rate rises when exercise starts, peaks, then falls back to the resting rate during recovery. The shaded band is the period of exercise.","Line graph of heart rate in beats per minute against time before, during and after exercise",520);
};

/* artery, vein, capillary */
FIGS.BD_VESSELS=()=>{
  let s="";
  s+=`<circle cx="70" cy="70" r="46" style="fill:var(--accent)" fill-opacity=".3" stroke="currentColor" stroke-width="2"/><circle cx="70" cy="70" r="46" fill="none" stroke="currentColor" stroke-width="7" stroke-opacity=".5"/><circle cx="70" cy="70" r="14" style="fill:${BD_R}" fill-opacity=".6" stroke="currentColor"/>`;
  s+=BD_T(70,134,"Artery",{b:1,s:12})+BD_T(70,148,"thick muscular wall",{s:10})+BD_T(70,160,"narrow lumen, no valves",{s:10});
  s+=`<circle cx="210" cy="70" r="40" style="fill:var(--accent)" fill-opacity=".3" stroke="currentColor" stroke-width="2"/><circle cx="210" cy="70" r="31" style="fill:${BD_X}" fill-opacity=".35" stroke="currentColor"/>`;
  s+=BD_T(210,134,"Vein",{b:1,s:12})+BD_T(210,148,"thin wall, wide lumen",{s:10})+BD_T(210,160,"valves prevent backflow",{s:10});
  s+=`<circle cx="350" cy="70" r="14" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="350" cy="70" r="9" style="fill:${BD_R}" fill-opacity=".5"/>`;
  s+=BD_T(350,134,"Capillary",{b:1,s:12})+BD_T(350,148,"wall one cell thick",{s:10})+BD_T(350,160,"very narrow lumen",{s:10});
    return BD_FG("0 0 420 168",s,"Cross sections of the three kinds of blood vessel. Arteries have the thickest walls, veins the widest lumen, and capillaries are the narrowest.","Cross sections of an artery, a vein and a capillary showing wall thickness and lumen size",520);
};

/* main vessels */

/* blood cells */
FIGS.BD_BLOOD=()=>{
  let s="";
  s+=`<ellipse cx="55" cy="60" rx="34" ry="34" style="fill:${BD_R}" fill-opacity=".55" stroke="currentColor" stroke-width="1.6"/><ellipse cx="55" cy="60" rx="14" ry="14" style="fill:${BD_R}" fill-opacity=".25"/>`;
  s+=BD_T(55,114,"Red blood cell",{b:1,s:10.5})+BD_T(55,127,"biconcave disc, no nucleus",{s:9.5})+BD_T(55,139,"haemoglobin",{s:9.5});
  s+=`<path d="M150 30Q190 14 214 44Q232 76 202 96Q168 110 146 84Q124 52 150 30Z" style="fill:var(--surface2)" stroke="currentColor" stroke-width="1.6"/><path d="M164 52Q178 44 190 56Q196 70 184 80Q170 84 162 72Z" style="fill:var(--pur)" fill-opacity=".6" stroke="currentColor"/>`;
  s+=BD_T(180,114,"Phagocyte",{b:1,s:10.5})+BD_T(180,127,"large lobed nucleus",{s:9.5})+BD_T(180,139,"engulfs pathogens",{s:9.5});
  s+=`<circle cx="290" cy="60" r="30" style="fill:var(--surface2)" stroke="currentColor" stroke-width="1.6"/><circle cx="290" cy="60" r="22" style="fill:var(--pur)" fill-opacity=".6" stroke="currentColor"/>`;
  s+=BD_T(290,114,"Lymphocyte",{b:1,s:10.5})+BD_T(290,127,"large round nucleus",{s:9.5})+BD_T(290,139,"makes antibodies",{s:9.5});
  [[366,40],[386,66],[370,84],[396,34]].forEach(p=>{s+=`<ellipse cx="${p[0]}" cy="${p[1]}" rx="8" ry="5" style="fill:var(--amber)" fill-opacity=".8" stroke="currentColor"/>`});
  s+=BD_T(376,114,"Platelets",{b:1,s:10.5})+BD_T(376,127,"cell fragments",{s:9.5})+BD_T(376,139,"help clotting",{s:9.5});
  return BD_FG("0 0 420 148",s,"The solid components of blood. All of them are carried in the liquid plasma.","Drawings of a red blood cell, a phagocyte, a lymphocyte and platelets with their features",520);
};

/* clotting */
FIGS.BD_CLOT=()=>{
  let s=BD_BOX(10,10,110,50,["Fibrinogen","soluble protein","in the plasma"],{s:10,b:1,f:"var(--mint)"});
  s+=BD_ARR(122,35,176,35,"currentColor",2)+BD_T(150,26,"clotting",{s:9.5,i:1})+BD_T(150,49,"starts",{s:9.5,i:1});
  s+=BD_BOX(178,10,110,50,["Fibrin","insoluble threads"],{s:10,b:1,f:"var(--peach)"});
  for(let i=0;i<6;i++)s+=BD_LN(305+i*16,14,300+i*16+40,66,"currentColor",1.4)+BD_LN(300+i*16,66,330+i*16,14,"currentColor",1.4);
  [[330,34],[360,50],[345,22]].forEach(p=>{s+=`<circle cx="${p[0]}" cy="${p[1]}" r="6" style="fill:${BD_R}" fill-opacity=".7"/>`});
  s+=BD_T(210,86,"The fibrin mesh traps red blood cells and platelets and forms a clot.",{s:10.5});
  s+=BD_T(210,102,"The clot dries to a scab: it stops blood loss and keeps pathogens out.",{s:10.5,i:1});
  return BD_FG("0 0 420 112",s,"Clotting turns soluble fibrinogen into an insoluble mesh of fibrin that seals the wound.","Diagram showing fibrinogen turning into a mesh of fibrin that traps red blood cells to form a clot",520);
};

FIGS.BD_XYLEM=()=>{
  let s=`<rect x="30" y="14" width="56" height="150" fill="none" stroke="currentColor" stroke-width="5"/>`;
  for(let y=24;y<160;y+=16)s+=BD_LN(30,y,42,y,BD_X,3.5)+BD_LN(74,y,86,y,BD_X,3.5);
  s+=BD_ARR(58,150,58,30,BD_X,2.5);
  s+=BD_LN(36,36,150,30,"currentColor",1)+BD_T(156,34,"Thick wall strengthened with lignin:",{a:"start",s:10.5,b:1})+BD_T(156,48,"strong, waterproof, and supports the plant",{a:"start",s:10.5});
  s+=BD_LN(60,92,150,92,"currentColor",1)+BD_T(156,88,"Empty lumen (no cell contents):",{a:"start",s:10.5,b:1})+BD_T(156,102,"water flows through without obstruction",{a:"start",s:10.5});
  s+=BD_LN(60,140,150,148,"currentColor",1)+BD_T(156,146,"No cross walls between cells:",{a:"start",s:10.5,b:1})+BD_T(156,160,"cells joined end to end make a long tube",{a:"start",s:10.5});
  s+=BD_T(58,180,"one xylem vessel",{s:10,i:1});
  return BD_FG("0 0 420 188",s,"A xylem vessel is a long, hollow tube made of dead cells whose end walls have broken down. The lignin rings in the walls give strength so the tube does not collapse.","Diagram of a xylem vessel with lignin thickened walls, no cell contents and no cross walls",520);
};
FIGS.BD_ROOTHAIR=()=>{
  let s="";
  [[18,30],[40,70],[22,110],[60,22],[52,128],[88,140],[92,20],[14,150]].forEach(p=>{s+=`<circle cx="${p[0]}" cy="${p[1]}" r="9" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-dasharray="2 3"/>`});
  s+=BD_T(10,176,"dotted circles: soil particles with a thin film of water",{s:9.5,i:1,a:"start"});
  s+=`<rect x="290" y="10" width="110" height="150" rx="4" style="fill:var(--mint)"/>`;
  s+=BD_T(345,26,"root surface",{s:10,i:1})+BD_T(345,150,"root cortex cells",{s:10,i:1});
  s+=`<path d="M290 70L150 74Q100 80 100 90Q100 100 150 106L290 110Z" style="fill:var(--accent)" fill-opacity=".25" stroke="currentColor" stroke-width="1.8"/>`;
  s+=`<ellipse cx="270" cy="90" rx="9" ry="11" style="fill:var(--amber)" fill-opacity=".8" stroke="currentColor"/>`;
  s+=`<ellipse cx="190" cy="90" rx="52" ry="9" fill="none" stroke="currentColor" stroke-opacity=".6" stroke-dasharray="3 3"/>`;
  s+=BD_ARR(60,52,112,80,BD_X,2)+BD_T(10,44,"water in by",{a:"start",s:10.5,b:1})+BD_T(10,57,"osmosis",{a:"start",s:10.5,b:1});
  s+=BD_ARR(80,124,118,104,BD_P,2)+BD_T(10,138,"ions in by",{a:"start",s:10.5,b:1})+BD_T(10,151,"active transport",{a:"start",s:10.5,b:1});
  s+=BD_LN(190,74,200,36,"currentColor",1)+BD_T(150,22,"long, thin extension:",{a:"start",s:10.5,b:1})+BD_T(150,35,"large surface area",{a:"start",s:10.5});
  s+=BD_LN(270,79,296,56,"currentColor",1)+BD_T(296,52,"nucleus",{a:"start",s:10.5});
  s+=BD_LN(200,98,236,128,"currentColor",1)+BD_T(150,140,"vacuole with sugars and",{a:"start",s:10.5})+BD_T(150,153,"ions (low water potential)",{a:"start",s:10.5});
  return BD_FG("0 0 420 184",s,"A root hair cell. Its long extension gives a huge surface area for taking in water and mineral ions from the soil.","Diagram of a root hair cell reaching into soil, with labels for surface area, nucleus, vacuole, water uptake and ion uptake",520);
};
FIGS.BD_TRANSP=()=>{
  const num=(x,y,n)=>`<circle cx="${x}" cy="${y}" r="9" style="fill:var(--accent)"/>`+BD_T(x,y+4,String(n),{s:11,b:1,c:"var(--accent-ink)"});
  let s=`<rect x="10" y="16" width="250" height="9" style="fill:var(--mint)" stroke="currentColor" stroke-opacity=".5"/>`;
  s+=`<rect x="10" y="150" width="104" height="9" style="fill:var(--mint)" stroke="currentColor" stroke-opacity=".5"/><rect x="146" y="150" width="114" height="9" style="fill:var(--mint)" stroke="currentColor" stroke-opacity=".5"/>`;
  for(let i=0;i<5;i++)s+=`<ellipse cx="${46+i*50}" cy="48" rx="13" ry="20" style="fill:var(--accent)" fill-opacity=".4" stroke="currentColor" stroke-opacity=".5"/>`;
  [[78,100],[160,98],[228,104],[104,126],[200,130]].forEach(p=>{s+=`<ellipse cx="${p[0]}" cy="${p[1]}" rx="20" ry="12" style="fill:var(--accent)" fill-opacity=".3" stroke="currentColor" stroke-opacity=".5"/>`});
  s+=`<ellipse cx="119" cy="152" rx="9" ry="8" style="fill:var(--accent)" fill-opacity=".75" stroke="currentColor"/><ellipse cx="141" cy="152" rx="9" ry="8" style="fill:var(--accent)" fill-opacity=".75" stroke="currentColor"/>`;
  s+=`<circle cx="26" cy="100" r="12" style="fill:${BD_X}" fill-opacity=".85"/>`;
  s+=BD_ARR(39,100,54,100,BD_X,2.2)+BD_ARR(150,114,134,134,BD_X,1.8)+BD_ARR(130,140,130,176,"currentColor",2.2);
  s+=num(44,84,1)+num(176,118,2)+num(150,168,3);
  s+=BD_T(135,12,"upper epidermis",{s:10,i:1})+BD_T(130,190,"lower epidermis with a stoma",{s:10,i:1});
  s+=BD_T(272,24,"1  Water from the xylem",{a:"start",s:10.5,b:1})+BD_T(284,38,"wets the mesophyll cell walls.",{a:"start",s:10.5});
  s+=BD_T(272,66,"2  Water evaporates from the",{a:"start",s:10.5,b:1})+BD_T(284,80,"cell surfaces into the air spaces.",{a:"start",s:10.5});
  s+=BD_T(272,108,"3  Water vapour diffuses out",{a:"start",s:10.5,b:1})+BD_T(284,122,"through the stomata.",{a:"start",s:10.5});
  s+=BD_T(272,152,"Blue: xylem and water.",{a:"start",s:10,i:1})+BD_T(272,165,"Green: mesophyll cells.",{a:"start",s:10,i:1});
  return BD_FG("0 0 420 196",s,"Transpiration: water leaves the xylem, wets the cell walls of the mesophyll cells, evaporates into the air spaces and diffuses out through the stomata.","Section through a leaf showing water from the xylem evaporating from mesophyll cells into air spaces and diffusing out through a stoma",520);
};
FIGS.BD_POTO=()=>{
  let s=`<path d="M320 118L320 176L404 176L404 118" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="321" y="138" width="82" height="37" style="fill:${BD_X}" fill-opacity=".25"/>`;
  s+=`<path d="M64 76L64 100L350 100L350 154" fill="none" stroke="currentColor" stroke-opacity=".6" stroke-width="6" stroke-linejoin="round"/>`;
  s+=`<path d="M110 100L346 100" stroke="${BD_X}" stroke-opacity=".5" stroke-width="3"/>`;
  s+=`<ellipse cx="226" cy="100" rx="9" ry="3" fill="currentColor"/>`;
  for(let x=130;x<=330;x+=20)s+=BD_LN(x,106,x,112,"currentColor",1);
  s+=`<path d="M64 76L64 34M64 56Q40 44 38 26M64 50Q90 44 94 24M64 66Q42 64 32 56M64 62Q88 62 96 54" fill="none" stroke="var(--good)" stroke-width="2.4"/>`;
  s+=`<ellipse cx="38" cy="30" rx="14" ry="8" style="fill:var(--good)" fill-opacity=".7"/><ellipse cx="94" cy="28" rx="14" ry="8" style="fill:var(--good)" fill-opacity=".7"/>`;
  s+=`<rect x="54" y="74" width="20" height="8" rx="2" fill="currentColor" fill-opacity=".6"/>`;
  s+=BD_T(110,16,"leafy shoot cut under water",{a:"start",s:10.5,b:1})+BD_LN(98,22,108,16,"currentColor",1);
  s+=BD_LN(76,78,118,54,"currentColor",1)+BD_T(122,52,"airtight seal around the stem",{a:"start",s:10.5});
  s+=BD_T(226,84,"air bubble",{s:10.5,b:1})+BD_LN(226,88,226,97,"currentColor",1);
  s+=BD_ARR(240,128,150,128,"currentColor",2)+BD_T(150,144,"bubble moves towards the shoot",{a:"start",s:10.5});
  s+=BD_T(226,164,"capillary tube with a scale",{s:10.5});
  s+=BD_T(362,192,"beaker of water",{s:10.5});
  return BD_FG("0 0 420 200",s,"A potometer. As the shoot loses water by transpiration it pulls water along the tube and the air bubble moves. The distance moved in a set time shows the rate of water uptake.","Diagram of a potometer with a leafy shoot sealed into a capillary tube containing an air bubble and a scale",520)
};
FIGS.BD_WILT=()=>{
  let s=BD_T(105,16,"Plenty of water: turgid",{b:1,s:11.5})+BD_T(315,16,"Water shortage: flaccid",{b:1,s:11.5});
  s+=`<rect x="45" y="26" width="120" height="80" rx="12" fill="none" stroke="currentColor" stroke-width="4"/><rect x="52" y="33" width="106" height="66" rx="9" style="fill:var(--accent)" fill-opacity=".3"/>`;
  s+=BD_T(105,70,"vacuole full",{s:10.5})+BD_T(105,120,"cell pressed against the wall",{s:10});
  s+=`<rect x="255" y="26" width="120" height="80" rx="12" fill="none" stroke="currentColor" stroke-width="4"/><rect x="278" y="48" width="74" height="38" rx="14" style="fill:var(--accent)" fill-opacity=".3"/>`;
  s+=BD_T(315,70,"vacuole shrunk",{s:10.5})+BD_T(315,120,"membrane pulls away from the wall",{s:10});
  s+=`<path d="M40 178L40 144M40 154Q22 148 16 138M40 152Q58 144 66 136" fill="none" stroke="var(--good)" stroke-width="2.6"/>`;
  s+=BD_T(76,158,"stem and leaves",{a:"start",s:10.5})+BD_T(76,171,"held upright",{a:"start",s:10.5});
  s+=`<path d="M250 178L250 156Q252 146 266 144Q276 146 280 158M250 166Q236 168 230 178M250 162Q266 160 272 170" fill="none" stroke="var(--good)" stroke-width="2.6"/>`;
  s+=BD_T(290,158,"plant droops",{a:"start",s:10.5})+BD_T(290,171,"(wilts)",{a:"start",s:10.5});
  return BD_FG("0 0 420 184",s,"When water loss is faster than water uptake the cells lose turgor, the plant loses support and wilts.","Two plant cells compared: a turgid cell with a full vacuole and a flaccid cell with a shrunken vacuole, and an upright plant versus a wilted plant",520);
};
FIGS.BD_DOUBLE=()=>{
  let s=BD_T(100,14,"Fish: single circulation",{b:1,s:11.5})+BD_T(315,14,"Mammal: double circulation",{b:1,s:11.5});
  s+=BD_BOX(55,24,80,26,["Gills"],{b:1,f:"var(--mint)"})+BD_BOX(55,96,80,34,["Heart","(one pump)"],{b:1,s:10.5,f:"var(--peach)"})+BD_BOX(55,166,80,26,["Body"],{b:1,f:"var(--mint)"});
  s+=BD_ARR(95,96,95,52,BD_X,2.4);
  s+=`<path d="M135 37L168 37L168 179" fill="none" stroke="${BD_R}" stroke-width="2.4"/>`+BD_ARR(168,179,137,179,BD_R,2.4);
  s+=`<path d="M55 179L26 179L26 113" fill="none" stroke="${BD_X}" stroke-width="2.4"/>`+BD_ARR(26,113,53,113,BD_X,2.4);
  s+=BD_T(102,76,"deoxygenated",{a:"start",s:9.5})+BD_T(174,100,"oxygenated,",{a:"start",s:9.5})+BD_T(174,112,"lower pressure",{a:"start",s:9.5});
  s+=BD_BOX(270,24,90,26,["Lungs"],{b:1,f:"var(--mint)"})+BD_BOX(240,92,150,34,[""],{f:"var(--peach)"});
  s+=BD_LN(315,92,315,126,"currentColor",1.6)+BD_T(278,113,"right side",{s:10.5,b:1})+BD_T(353,113,"left side",{s:10.5,b:1});
  s+=BD_BOX(270,166,90,26,["Body"],{b:1,f:"var(--mint)"});
  s+=BD_ARR(285,92,285,52,BD_X,2.4)+BD_ARR(345,52,345,90,BD_R,2.4)+BD_ARR(345,128,345,164,BD_R,2.4)+BD_ARR(285,164,285,130,BD_X,2.4);
  s+=BD_T(278,72,"to lungs",{a:"end",s:9.5})+BD_T(352,72,"from lungs",{a:"start",s:9.5})+BD_T(352,150,"to body",{a:"start",s:9.5})+BD_T(278,148,"from body",{a:"end",s:9.5});
  s+=BD_T(210,210,"blue = deoxygenated blood, red = oxygenated blood",{s:10,i:1});
  return BD_FG("0 0 420 218",s,"In a fish blood passes through the heart once per circuit. In a mammal blood passes through the heart twice: once on the way to the lungs and once on the way to the body.","Two flow diagrams comparing the single circulation of a fish with the double circulation of a mammal",520);
};
FIGS.BD_HEART=()=>{
  let s=`<path d="M160 20L160 84" stroke="${BD_X}" stroke-opacity=".7" stroke-width="22" fill="none"/>`;
  s+=`<rect x="140" y="82" width="62" height="52" rx="14" style="fill:${BD_X}" fill-opacity=".28" stroke="currentColor" stroke-width="2"/><rect x="236" y="82" width="62" height="52" rx="14" style="fill:${BD_R}" fill-opacity=".28" stroke="currentColor" stroke-width="2"/>`;
  s+=`<path d="M128 146Q128 236 205 238L205 144Z" style="fill:${BD_X}" fill-opacity=".28" stroke="currentColor" stroke-width="3"/><path d="M215 144L215 238Q312 236 308 146Z" style="fill:${BD_R}" fill-opacity=".28" stroke="currentColor" stroke-width="9"/>`;
  s+=`<path d="M210 140L210 238" stroke="currentColor" stroke-width="5"/>`;
  s+=`<path d="M224 148L224 76Q224 34 264 34L346 34" fill="none" stroke="${BD_R}" stroke-opacity=".7" stroke-width="18"/>`;
  s+=`<path d="M134 150Q96 144 96 104L96 40" fill="none" stroke="${BD_X}" stroke-opacity=".7" stroke-width="16"/>`;
  s+=`<path d="M298 108L346 108L346 66" fill="none" stroke="${BD_R}" stroke-opacity=".7" stroke-width="14"/>`;
  s+=`<path d="M152 138L172 152L194 138" fill="none" stroke="currentColor" stroke-width="3"/><path d="M246 138L266 152L288 138" fill="none" stroke="currentColor" stroke-width="3"/>`;
  s+=`<path d="M216 152L224 160L232 152Z" fill="currentColor"/><path d="M122 150L130 158L138 150Z" fill="currentColor"/>`;
  s+=`<path d="M296 152Q330 170 318 226" fill="none" style="stroke:var(--red)" stroke-width="2.4"/>`;
  s+=BD_T(10,22,"vena cava",{a:"start",s:10.5,b:1})+BD_T(10,35,"(from the body)",{a:"start",s:10})+BD_LN(86,26,148,40,"currentColor",1);
  s+=BD_T(10,70,"pulmonary artery",{a:"start",s:10.5,b:1})+BD_T(10,83,"(to the lungs)",{a:"start",s:10});
  s+=BD_T(10,112,"right atrium",{a:"start",s:10.5,b:1})+BD_LN(74,108,140,108,"currentColor",1);
  s+=BD_T(10,176,"atrioventricular",{a:"start",s:10.5,b:1})+BD_T(10,189,"valve",{a:"start",s:10.5,b:1})+BD_LN(66,184,166,148,"currentColor",1);
  s+=BD_T(10,222,"right ventricle",{a:"start",s:10.5,b:1})+BD_T(10,235,"(thin wall)",{a:"start",s:10})+BD_LN(76,222,150,214,"currentColor",1);
  s+=BD_T(352,34,"aorta",{a:"start",s:10.5,b:1})+BD_T(352,47,"(to the body)",{a:"start",s:10});
  s+=BD_T(352,86,"pulmonary vein",{a:"start",s:10.5,b:1})+BD_T(352,99,"(from the lungs)",{a:"start",s:10});
  s+=BD_T(352,130,"left atrium",{a:"start",s:10.5,b:1})+BD_LN(298,118,350,128,"currentColor",1);
  s+=BD_T(334,172,"left ventricle",{a:"start",s:10.5,b:1})+BD_T(334,185,"(thick wall)",{a:"start",s:10});
  s+=BD_T(340,206,"coronary artery",{a:"start",s:10.5,b:1})+BD_LN(320,214,338,208,"currentColor",1);
  s+=BD_T(210,254,"septum",{s:10.5,b:1});
  s+=BD_T(210,268,"dark triangles: semilunar valves at the start of the aorta and pulmonary artery",{s:9.5,i:1});
  return BD_FG("0 0 420 276",s,"The mammalian heart seen from the front: the left side is drawn on the right. Blue is deoxygenated blood and red is oxygenated blood.","Labelled diagram of the heart showing four chambers, the septum, valves, major vessels and a coronary artery",520);
};
FIGS.BD_ORGANS=()=>{
  let s=BD_BOX(170,8,100,44,["Heart"],{b:1,s:12,f:"var(--peach)"});
  s+=BD_BOX(10,10,80,40,["Lungs"],{b:1,f:"var(--mint)"});
  s+=BD_ARR(170,22,92,22,BD_X,2.2)+BD_ARR(92,40,170,40,BD_R,2.2);
  s+=BD_T(131,16,"pulmonary artery",{s:9.5})+BD_T(131,57,"pulmonary vein",{s:9.5});
  s+=BD_LN(190,52,190,226,BD_X,4)+BD_LN(250,52,250,226,BD_R,4);
  s+=BD_T(190,242,"vena cava",{a:"end",s:10.5,b:1})+BD_T(250,242,"aorta",{a:"start",s:10.5,b:1});
  s+=BD_BOX(310,62,90,36,["Kidney"],{b:1,f:"var(--mint)"});
  s+=BD_ARR(250,72,308,72,BD_R,2)+BD_ARR(308,88,192,88,BD_X,2);
  s+=BD_T(284,64,"renal artery",{s:9.5})+BD_T(284,106,"renal vein",{s:9.5});
  s+=BD_BOX(310,132,90,36,["Liver"],{b:1,f:"var(--mint)"});
  s+=BD_ARR(250,142,308,142,BD_R,2)+BD_ARR(308,160,192,160,BD_X,2);
  s+=BD_T(284,134,"hepatic artery",{s:9.5})+BD_T(284,178,"hepatic vein",{s:9.5});
  s+=BD_BOX(310,204,90,28,["Gut"],{b:1,f:"var(--mint)"})+BD_ARR(355,204,355,170,"var(--pur)",2.4);
  s+=BD_T(362,188,"hepatic",{a:"start",s:9.5})+BD_T(362,199,"portal vein",{a:"start",s:9.5});
  s+=BD_T(14,100,"to and from the",{a:"start",s:9.5,i:1})+BD_T(14,112,"head, arms and",{a:"start",s:9.5,i:1})+BD_T(14,124,"legs",{a:"start",s:9.5,i:1});
  return BD_FG("0 0 420 250",s,"The main blood vessels. Red lines carry oxygenated blood and blue lines carry deoxygenated blood. The hepatic portal vein (purple) carries blood rich in digested food from the gut to the liver.","Schematic of main blood vessels between the heart, lungs, kidney and liver, including the hepatic portal vein from the gut",520);
};

/* ================= TOPIC 8: TRANSPORT IN PLANTS ================= */
const BD_L81=L("Xylem, phloem and water uptake","The two transport tissues, where they sit in a plant, root hair cells and the route water takes from soil to leaf.",
`<h4>Two transport tissues</h4>
<p>A plant is too big for diffusion alone to move materials around, so it has two kinds of tube. They run together in <b>vascular bundles</b> from the roots to the leaves.</p>
<table><tr><th>Tissue</th><th>What it transports</th><th>Other job</th></tr>
<tr><td><b>Xylem</b></td><td>Water and mineral ions, from the roots upwards</td><td>Supports the plant</td></tr>
<tr><td><b>Phloem</b></td><td>Sucrose and amino acids (made in leaves) to where they are needed</td><td>None</td></tr></table>
<div class="key"><b>Exam tip</b>Xylem carries <b>water</b>; phloem carries <b>sugar</b>. Do not write that phloem "carries food" without naming sucrose and amino acids.</div>
<h4>Where xylem and phloem are found</h4>
<p>In sections of a non-woody dicotyledonous plant, the two tissues are always side by side. Their positions differ in each organ.</p>
{{BD_SECT}}
<ul><li><b>Root:</b> xylem forms a star shape in the centre, with the phloem between the arms. This gives a strong core that resists being pulled as the plant sways.</li><li><b>Stem:</b> the xylem and phloem are in bundles arranged in a ring near the outside. The xylem is on the inner side of each bundle.</li><li><b>Leaf:</b> the bundles form the veins. Xylem is on the upper side and phloem on the lower side.</li></ul>
<h4>Xylem vessels: structure fits function (Extended)</h4>
<p>Xylem vessels are long, hollow tubes built from cells that have died and lost their contents. Three features help them carry water up tall plants.</p>
{{BD_XYLEM}}
<ul><li><b>Thick walls with lignin.</b> Lignin is strong and waterproof. It stops the vessel collapsing and holds the plant upright.</li><li><b>No cell contents.</b> There is no cytoplasm or nucleus to block the flow of water.</li><li><b>No cross walls.</b> The cells are joined end to end and the end walls have broken down, so each vessel is one long continuous tube.</li></ul>
<h4>Root hair cells</h4>
<p>Root hair cells are cells on the surface of young roots. Each has a long, thin extension that reaches between soil particles. Their <b>function</b> is to absorb water and mineral ions from the soil.</p>
{{BD_ROOTHAIR}}
<p>The extension gives the cell a <b>large surface area</b>, so more water and mineral ions can be absorbed every second. Water enters by osmosis because the cell sap has a lower water potential than the soil water. Mineral ions are usually at a lower concentration in the soil than in the cell, so they are taken in by <b>active transport</b>, which uses energy from respiration.</p>
<h4>The route taken by water</h4>
<p>Water follows the same pathway in every plant.</p>
{{BD_PATH}}
<p>The order to remember is: <b>root hair cells, root cortex cells, xylem, mesophyll cells</b>. Water leaves the leaf as vapour through the stomata. The pull that moves water up the xylem is explained in the next lesson.</p>
<h4>Investigating the pathway with a stain</h4>
<p>To show where water travels, stand a freshly cut stem (celery or a white flower) in water containing a dye such as eosin or red food colouring. After some hours the dye is carried upwards and stains the xylem.</p>
<ul><li>Cut a thin <b>transverse</b> section of the stem. The stained spots are the xylem in each bundle.</li><li>Cut a <b>longitudinal</b> section. The stained xylem forms long continuous strips.</li><li>Only the xylem is stained, so water is carried in the xylem and not in the phloem.</li></ul>
<div class="ex"><b>Worked example</b>A white carnation stands in blue ink for 24 hours. The petal veins turn blue.<br>Explain why. The ink is dissolved in the water. Water is carried up the stem in the xylem and into the veins of the petals, so the veins turn blue.</div>`,
I("How does a tall tree get water from the soil to its highest leaf?",
`<ol><li>Write down what you already know about how plants take in water.</li><li>Sketch a tree and mark where you think water enters and where it leaves.</li><li>List the tissues and cells the water must pass through. Which ones are cells and which are tubes?</li><li>Write one question about how the water is moved upwards without a heart.</li></ol>`,
`<p><b>Where does the water go? (stain investigation).</b> Stand a stalk of celery with its leaves in a beaker of water with red food colouring. Leave it for 3 to 24 hours.</p><ol><li>Predict which part of the stem will be stained.</li><li>Cut a thin transverse slice of the stem near the base and look at it with a hand lens or a microscope. Draw and label the stained tissue.</li><li>Cut along the stem to find how far the dye has travelled. Measure the height and calculate the speed in cm per hour.</li><li>Cut a section of the leaf. Where does the stain end?</li></ol><p><b>Extension:</b> repeat with a stem cut at different times of day or with the leaves removed. Does the dye move faster with or without leaves? Explain.</p>`,
["https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-biology-0610/","Cambridge IGCSE Biology 0610 syllabus page"]),
[["State the function of xylem and name the substances that phloem transports.","Xylem transports water and mineral ions (1) and supports the plant (1). Phloem transports sucrose (1) and amino acids (1).",4],
["Describe how a root hair cell is adapted for taking in water and mineral ions.","It has a long, thin extension (1) that gives a large surface area (1). Water enters by osmosis and ions by active transport / the vacuole has a low water potential (1).",3],
["Put these in the order that water passes through them: xylem, root cortex cells, mesophyll cells, root hair cells.","Root hair cells, root cortex cells, xylem, mesophyll cells (2). Award 1 mark if only one pair is in the wrong order.",2],
["Extended: Explain how the structure of a xylem vessel suits its function.","Thick walls with lignin are strong, so the vessel does not collapse and supports the plant (1). No cell contents, so water flows freely (1). No cross walls, so the cells form a long continuous tube (1).",3],
["A white flower stands in red dye for a day. Describe and explain what you would see.","The veins in the petals are red (1). The dye is carried in the water (1) in the xylem (1).",3]],
[M("Which tissue carries water up a plant?",["Phloem","Xylem","Epidermis","Cortex"],1,"Xylem carries water and mineral ions upwards."),
M("Which substances are carried in the phloem?",["Water and mineral ions","Sucrose and amino acids","Oxygen and carbon dioxide","Starch and protein"],1,"Phloem carries sucrose and amino acids."),
M("In a root section, where is the xylem?",["In a ring near the edge","In the centre in a star shape","Only on the lower side","Scattered at random"],1,"In roots the xylem is a star at the centre."),
M("What is the main function of a root hair cell?",["Photosynthesis","Absorbing water and mineral ions","Making sucrose","Storing starch"],1,"Root hair cells absorb water and ions from the soil."),
M("Why do root hair cells have a long extension?",["To make food","To give a large surface area","To hold the plant up","To keep water out"],1,"A large surface area increases uptake."),
T("Name the substance in xylem walls that makes them strong and waterproof.",["lignin"],"Lignin."),
M("Which is the correct order of the pathway of water?",["Xylem, root hair cell, mesophyll, cortex","Root hair cell, cortex, xylem, mesophyll","Cortex, root hair cell, xylem, mesophyll","Mesophyll, xylem, cortex, root hair cell"],1,"Root hair cells, root cortex cells, xylem, mesophyll cells."),
M("Extended: Which feature of xylem vessels lets water flow easily?",["Cross walls","Living cytoplasm","No cell contents and no end walls","Thin walls"],2,"They are empty tubes with no cross walls.")],
[["Function of xylem","Transports water and mineral ions and supports the plant."],
["Function of phloem","Transports sucrose and amino acids."],
["Position of xylem in a root","In the centre, in a star shape."],
["Function of a root hair cell","Absorbs water and mineral ions from the soil."],
["Why are root hairs long and thin?","They give a large surface area for uptake."],
["Pathway of water","Root hair cells, root cortex cells, xylem, mesophyll cells."],
["Extended: three features of xylem vessels","Thick lignin walls; no cell contents; no cross walls."],
["How can the xylem be shown with a stain?","A cut stem in coloured water: the dye stains the xylem."]]);

const BD_L82=L("Transpiration","Why plants lose water, how water is pulled up the xylem, the factors that change the rate, and why plants wilt.",
`<h4>What is transpiration?</h4>
<p><b>Transpiration</b> is the loss of water vapour from the leaves of a plant. Water that reaches the leaf in the xylem does not all stay there.</p>
{{BD_TRANSP}}
<ol><li>Water evaporates from the wet surfaces of the mesophyll cells into the air spaces of the leaf.</li><li>The water vapour diffuses through the air spaces and out of the leaf through the <b>stomata</b>.</li></ol>
<p>Most stomata are on the lower surface of the leaf. Some water loss is unavoidable because the stomata must open to let carbon dioxide in for photosynthesis.</p>
<h4>Why leaves lose water so quickly (Extended)</h4>
<ul><li>The mesophyll cells are surrounded by <b>interconnecting air spaces</b>. They give a very large internal surface area from which water can evaporate.</li><li>The leaf has many stomata, and when they are wide open there are many pores for the vapour to leave. The <b>size and number of stomata</b> affect the rate of water vapour loss.</li></ul>
<h4>How water moves up the xylem (Extended)</h4>
<p>Water is pulled up the xylem by <b>transpiration pull</b>.</p>
<ol><li>Water evaporates from the mesophyll cells and leaves through the stomata.</li><li>Water from the xylem replaces it, so the water in the xylem is pulled upwards.</li><li>The water forms an unbroken column in the xylem. Water molecules are attracted to each other (<b>cohesion</b>), so as one molecule is pulled up it pulls the next one behind it.</li></ol>
<div class="key"><b>Exam tip</b>The energy for this pull comes from the Sun, which drives evaporation. The plant does not pump the water upwards with energy from respiration.</div>
<h4>Factors that change the rate of transpiration</h4>
{{BD_FACT}}
<table><tr><th>Factor</th><th>Effect on rate</th><th>Explanation (Extended)</th></tr>
<tr><td>Higher temperature</td><td>Increases</td><td>Water evaporates faster and vapour molecules diffuse faster</td></tr>
<tr><td>Greater wind speed</td><td>Increases</td><td>Moving air carries water vapour away from the leaf, keeping the concentration gradient steep</td></tr>
<tr><td>Higher humidity</td><td>Decreases</td><td>The air already contains water vapour, so the concentration gradient between the leaf and the air is smaller</td></tr></table>
<h4>Measuring water uptake with a potometer</h4>
<p>A potometer measures how fast a shoot takes up water. Because nearly all the water taken up is lost by transpiration, the uptake is a good estimate of the transpiration rate.</p>
{{BD_POTO}}
<ul><li>Cut the shoot <b>under water</b> and set up the apparatus under water so no air enters the xylem.</li><li>Make the joints airtight and dry the leaves.</li><li>Record how far the bubble moves in a set time. <b>Rate = distance moved ÷ time</b>.</li><li>Change one factor at a time (such as using a fan) and keep other variables constant: same shoot, light, temperature.</li></ul>
<div class="ex"><b>Worked example</b>The bubble moves 48 mm in 8 minutes.<br>Rate = 48 ÷ 8 = 6 mm per minute.</div>
<h4>Wilting (Extended)</h4>
<p>Wilting happens when a plant loses water faster than its roots can take it up.</p>
{{BD_WILT}}
<ol><li>The cells lose water and their vacuoles shrink.</li><li>The cells lose turgor pressure and become <b>flaccid</b>.</li><li>Without the pressure of water to support them, the soft stems and leaves droop.</li></ol>
<p>Wilting reduces the surface exposed to the Sun and the stomata close, so less water is lost. When the plant is watered, the cells take up water and become turgid again.</p>`,
I("Why do plants wilt on a hot, windy day, and why do they recover at night?",
`<ol><li>Recall a time you saw a wilted plant. What was the weather like?</li><li>Predict what happens to the water in a leaf on a hot, windy day.</li><li>List the factors that may change how fast a leaf loses water. Predict the effect of each.</li><li>Write a question you could test using a potometer.</li></ol>`,
`<p><b>Investigate transpiration.</b> Set up a potometer (or a weighed shoot in a measuring cylinder with oil on the water). Record the bubble position (or the mass) every minute for 10 minutes.</p><ol><li>Measure the rate in normal classroom conditions.</li><li>Change one factor: blow a fan across the leaves, use a lamp to warm the shoot, or put a clear plastic bag over the leaves (humid air).</li><li>Record the distance moved for each condition and calculate the rate in mm per minute.</li><li>Plot a bar chart and explain the results using the idea of the concentration gradient of water vapour.</li></ol><p><b>Evaluate:</b> how could you make the results more reliable? (Repeat, use the same leaf area, wait for the readings to settle.)</p>`,
["https://phet.colorado.edu/","PhET simulations (search for diffusion and osmosis)"]),
[["Define transpiration.","The loss of water (1) as water vapour from the leaves (1).",2],
["Describe the route taken by water vapour as it leaves a leaf.","Water evaporates from the surface of the mesophyll cells (1) into the air spaces (1) and diffuses out through the stomata (1).",3],
["A potometer bubble moves 48 mm in 8 minutes. Calculate the rate in mm per minute.","48 ÷ 8 (1) = 6 mm per minute (1).",2],
["Extended: Explain the effect on transpiration rate of (a) a rise in temperature, (b) strong wind and (c) high humidity.","Higher temperature: faster evaporation and diffusion so the rate increases (1). Wind: removes water vapour from near the stomata so the concentration gradient stays steep and the rate increases (1). High humidity: the gradient is smaller so the rate decreases (1).",3],
["Extended: Explain how transpiration pull moves water up the xylem.","Water evaporates from the leaf and leaves through stomata (1). This pulls water up the xylem (1) as a continuous column held together by attraction between water molecules (1).",3],
["Extended: Explain why a plant wilts on a hot, dry day.","Water is lost by transpiration faster than it is taken up (1). The cells lose water and become flaccid, so they lose turgor (1). The stem and leaves lose support and droop (1).",3]],
[M("What is transpiration?",["Loss of water vapour from leaves","Uptake of water by roots","Movement of sucrose in phloem","Evaporation from the soil"],0,"Transpiration is the loss of water vapour from leaves."),
M("Where does water vapour leave the leaf?",["Through the cuticle only","Through the stomata","Through the xylem","Through the root hairs"],1,"The vapour diffuses out through the stomata."),
M("Which change decreases the rate of transpiration?",["Higher temperature","Stronger wind","Higher humidity","Lower humidity"],2,"High humidity reduces the concentration gradient."),
N("A bubble in a potometer moves 30 mm in 5 minutes. What is the rate in mm per minute?",6,"mm per minute","30 ÷ 5 = 6."),
M("Why is the shoot in a potometer cut under water?",["To make it grow","To stop air entering the xylem","To keep the leaves cool","To add minerals"],1,"Air would break the water column."),
M("Extended: What holds the column of water together in the xylem?",["Lignin","Cohesion between water molecules","Stomata","Osmosis in the root"],1,"Water molecules attract each other (cohesion)."),
M("Extended: What happens to cells in a wilted plant?",["They become turgid","They become flaccid","They burst","They make more water"],1,"The cells lose water and become flaccid."),
M("Which instrument measures the rate of water uptake by a shoot?",["Thermometer","Potometer","Microscope","Syringe"],1,"A potometer.")],
[["Define transpiration","Loss of water vapour from the leaves."],
["Path of water vapour out of the leaf","Evaporates from mesophyll cells into air spaces, then diffuses out through the stomata."],
["Extended: why is the water loss rapid?","Large internal surface area from air spaces; many stomata."],
["Extended: what is transpiration pull?","Evaporation from leaves pulls a column of water up the xylem."],
["Effect of wind on transpiration","Increases the rate by removing water vapour near the stomata."],
["Effect of humidity on transpiration","Higher humidity reduces the rate."],
["Rate from a potometer","Distance moved by the bubble ÷ time."],
["Extended: why does a plant wilt?","Water loss exceeds uptake, so the cells become flaccid and lose support."]]);

const BD_L83=L("Translocation","How sucrose and amino acids move in the phloem from sources to sinks, and why one organ can be a source at one time and a sink at another.",
`<h4>What the phloem carries</h4>
<p>Leaves make <b>sucrose</b> by photosynthesis and <b>amino acids</b> by combining sugars with nitrate ions. These are carried in the phloem to the parts of the plant that need them. The tissue is made of living cells, unlike the xylem.</p>
<table><tr><th></th><th>Xylem</th><th>Phloem</th></tr>
<tr><td>Transports</td><td>Water and mineral ions</td><td>Sucrose and amino acids</td></tr>
<tr><td>Direction</td><td>Upwards from roots to leaves</td><td>Up and down, from sources to sinks</td></tr>
<tr><td>Other function</td><td>Supports the plant</td><td>None</td></tr></table>
<h4>Translocation (Extended)</h4>
<p><b>Translocation</b> is the movement of sucrose and amino acids in the phloem from sources to sinks.</p>
<h4>Sources and sinks (Extended)</h4>
{{BD_SOURCE}}
<ul><li>A <b>source</b> is a part of the plant that releases sucrose or amino acids. Mature green leaves are the main sources because they photosynthesise.</li><li>A <b>sink</b> is a part of the plant that uses or stores sucrose or amino acids. Growing shoot tips, young leaves, developing fruits and seeds, and roots are sinks.</li><li>Sucrose and amino acids can travel up or down the plant, because the sinks are found at the top and the bottom. This is why the phloem carries materials in both directions.</li></ul>
<div class="key"><b>Exam tip</b>"Source" and "sink" describe what a part of the plant is doing, not what the part is. Always write what is released or used.</div>
<h4>A source at one time, a sink at another (Extended)</h4>
{{BD_SEASON}}
<p>Storage organs such as potato tubers, bulbs and tap roots change role during the year.</p>
<ul><li>In summer, the leaves are sources and the tuber is a <b>sink</b>: sucrose is delivered and converted to starch for storage.</li><li>In spring, the tuber is a <b>source</b>: the stored carbohydrate is released as sucrose to the growing shoots, which are sinks.</li><li>A young leaf is a sink while it grows and becomes a source once it is mature enough to photosynthesise more than it uses.</li></ul>
<div class="ex"><b>Worked example</b>Classify each as source or sink: (1) a mature leaf in summer, (2) a developing fruit, (3) a growing root tip.<br>(1) source; (2) sink (stores sucrose); (3) sink (uses sucrose for growth and respiration).</div>`,
I("Why does a potato tuber grow fat in summer but shrink when it sprouts in spring?",
`<ol><li>Think about where a potato plant gets its carbohydrate. List the places it is made and the places it is stored.</li><li>Draw a flow diagram for summer and another for spring, with arrows showing where sucrose moves.</li><li>Use the words source and sink to label each box.</li><li>Predict what would happen if the phloem near the base of a stem were cut.</li></ol>`,
`<p><b>Source and sink modelling.</b> Work in groups of five. Use coloured counters (sucrose) and cups labelled <b>leaf, shoot tip, fruit, root, tuber</b>.</p><ol><li>Start with all the counters in the leaf cup. Move them to the sink cups to represent summer. Record how many go to each sink.</li><li>Now rearrange for spring: the tuber cup starts full and the shoot tip cup empty. Show the flow.</li><li>Change the season again. Predict how the flow changes if the plant is covered and cannot photosynthesise.</li><li>Present your flow diagram and use the correct vocabulary: source, sink, sucrose, amino acids, phloem.</li></ol><p><b>Data task:</b> a student measures the mass of a potato tuber through the year. Sketch the graph you expect and explain each part using sources and sinks.</p>`),
[["Extended: Define translocation.","The movement of sucrose and amino acids (1) in the phloem (1) from sources to sinks (1).",3],
["Extended: State the meaning of source and of sink.","Source: part that releases sucrose or amino acids (1). Sink: part that uses or stores sucrose or amino acids (1).",2],
["Extended: Classify as source or sink: mature leaf in summer, developing fruit, growing root tip, potato tuber in spring.","Source (1), sink (1), sink (1), source (1).",4],
["Extended: Explain why a potato tuber can be a sink in summer and a source in spring.","In summer it takes in sucrose and stores it as starch (1). In spring it releases sucrose to the growing shoots (1) so it changes role depending on the needs of the plant (1).",3],
["State two differences between xylem and phloem.","Xylem carries water and mineral ions but phloem carries sucrose and amino acids (1). Xylem carries upwards only but phloem carries materials both up and down (1). Accept xylem supports the plant but phloem does not as an alternative.",2]],
[M("Which substances are moved by translocation?",["Water and mineral ions","Sucrose and amino acids","Oxygen and carbon dioxide","Starch and glucose only"],1,"Translocation moves sucrose and amino acids."),
M("Extended: In which tissue does translocation occur?",["Xylem","Phloem","Epidermis","Palisade layer"],1,"Translocation is in the phloem."),
M("Extended: What is a sink?",["A part that releases sucrose","A part that uses or stores sucrose","A tube that carries water","A part that makes chlorophyll"],1,"A sink uses or stores sucrose or amino acids."),
M("Extended: Which part is usually a source?",["Growing root tip","Mature green leaf","Developing fruit","Young shoot tip"],1,"Mature leaves photosynthesise."),
M("Extended: A potato tuber in spring is a...",["Source","Sink","Xylem vessel","Stoma"],0,"The tuber releases stored sucrose to the growing shoots."),
M("Extended: Which part is a sink?",["Mature leaf in summer","Developing seed","Chloroplast","Palisade cell"],1,"Seeds use and store sucrose."),
M("Extended: In which direction does the phloem carry materials?",["Up only","Down only","Both up and down","Sideways only"],2,"Sinks are above and below the sources."),
T("Extended: Name the process of moving sucrose and amino acids in the phloem.",["translocation"],"Translocation.")],
[["Substances carried in phloem","Sucrose and amino acids."],
["Extended: translocation","Movement of sucrose and amino acids in the phloem from sources to sinks."],
["Extended: source","A part of the plant that releases sucrose or amino acids."],
["Extended: sink","A part of the plant that uses or stores sucrose or amino acids."],
["Example of a source","Mature green leaf."],
["Examples of sinks","Growing shoot tips, roots, fruits, seeds."],
["Extended: why can a tuber be a source and a sink?","It stores sucrose in summer (sink) and releases it in spring (source)."],
["Phloem direction","Up and down the plant."]]);

const BD_Q8=[M("Which is a function of xylem?",["Carrying sucrose","Carrying water and mineral ions","Making amino acids","Absorbing light"],1,"Xylem carries water and mineral ions."),
M("Which substances does phloem transport?",["Water and ions","Sucrose and amino acids","Starch and lipids","Oxygen and carbon dioxide"],1,"Sucrose and amino acids."),
M("Root hair cells increase water uptake because they...",["are green","have a large surface area","contain chloroplasts","have thick walls"],1,"They have a large surface area."),
M("Water leaves the leaf as vapour through the...",["xylem","stomata","phloem","root hair"],1,"Through the stomata."),
M("Which change increases the rate of transpiration?",["Higher humidity","Lower temperature","Increased wind speed","Closing the stomata"],2,"Moving air removes water vapour from the leaf surface."),
N("A bubble in a potometer moves 36 mm in 4 minutes. What is the rate in mm per minute?",9,"mm per minute","36 ÷ 4 = 9."),
M("Extended: What is a sink?",["A part that releases sucrose","A part that uses or stores sucrose","The xylem","A stoma"],1,"A sink uses or stores sucrose or amino acids."),
T("Name the cells that wilt when they lose water and become soft (lose turgor).",["flaccid"],"Flaccid cells.")];

const BD_P8=[
P("Root hair cells and the route of water",8,"<p>Water enters a plant through the roots and leaves it through the leaves.</p><ol type='a'><li>Name the cells through which water enters the root from the soil. [1]</li><li>Explain how the shape of these cells helps them to absorb water and mineral ions. [2]</li><li>(i) Name the tissue that carries water up the stem. [1]<br>(ii) State one substance other than water that is carried by this tissue, and one other function of the tissue. [2]</li><li>Water reaches the mesophyll cells in the leaf. Describe how the water then leaves the leaf. [2]</li></ol>",
["(a) Root hair cells (1).","(b) The cell has a long, thin extension (1) that gives a large surface area for taking in water and mineral ions (1).","(c)(i) Xylem (1).","(c)(ii) Mineral ions (1); it supports the plant (1).","(d) The water evaporates from the surface of the mesophyll cells into the air spaces (1) and diffuses out through the stomata as water vapour (1)."],"Hub exam-style question (written for this hub), Topic 8"),
P("Potometer investigation",7,"<p>A student used a potometer to compare the rate of water uptake of a leafy shoot in still air and with a fan blowing across the leaves. The distance moved by the air bubble in 10 minutes is shown in the table.</p>"+TBL(["Condition","Distance moved by bubble in 10 minutes / mm"],[["Still air","25"],["Fan on","60"]],360)+"<ol type='a'><li>Calculate the rate of movement of the bubble in each condition, in mm per minute. [2]</li><li>Explain why the rate was greater when the fan was on. [2]</li><li>State <b>two</b> variables that the student should keep the same. [2]</li><li>The shoot was cut under water. Suggest why. [1]</li></ol>",
["(a) Still air: 25 ÷ 10 = 2.5 mm per minute (1); fan on: 60 ÷ 10 = 6.0 mm per minute (1).","(b) The fan blows away water vapour from near the stomata (1) so the concentration gradient is steeper and transpiration is faster (1).","(c) Any two of: same shoot or leaf area; same temperature; same light intensity; same humidity (1)(1).","(d) To stop air entering the xylem and breaking the column of water (1)."],"Hub exam-style question (written for this hub), Topic 8"),
P("Transpiration and the xylem (Extended)",10,"<ol type='a'><li>Describe what is meant by transpiration. [2]</li><li>Explain how the structure of a leaf allows water vapour to be lost rapidly when the stomata are open. [2]</li><li>Explain how transpiration pull moves water up the xylem. [3]</li><li>Explain why a plant wilts on a hot, dry day. [3]</li></ol>",
["(a) The loss of water vapour (1) from the leaves (1).","(b) The mesophyll cells are surrounded by interconnecting air spaces that give a large internal surface area for evaporation (1); there are many stomata through which the vapour can diffuse out (1).","(c) Water evaporates from the mesophyll cells and leaves through the stomata (1); this pulls water up the xylem as a continuous column (1) held together by attraction between water molecules (1).","(d) Water is lost by transpiration faster than it is absorbed (1); the cells lose water, their vacuoles shrink and they become flaccid (1); the stem and leaves lose support and droop (1)."],"Hub exam-style question (written for this hub), Topic 8"),
P("Translocation and storage (Extended)",6,"<ol type='a'><li>Name <b>two</b> substances that are transported in the phloem. [2]</li><li>State what is meant by a <b>source</b> and a <b>sink</b>. [2]</li><li>A potato tuber stores starch. State whether the tuber is a source or a sink in (i) summer and (ii) spring. Give a reason for each. [2]</li></ol>",
["(a) Sucrose (1); amino acids (1).","(b) A source is a part of the plant that releases sucrose or amino acids (1); a sink is a part that uses or stores them (1).","(c) Sink in summer because it takes in sucrose and stores it as starch; source in spring because it releases sucrose to the growing shoots (1) for both correct with reasons (1)."],"Hub exam-style question (written for this hub), Topic 8")
];
BSET(8,[BD_L81,BD_L82,BD_L83],BD_Q8,BD_P8);

/* ================= TOPIC 9: TRANSPORT IN ANIMALS ================= */
const BD_L91=L("Circulatory systems and the heart","Single and double circulation, the structure and action of the heart, monitoring it, the effect of exercise and coronary heart disease.",
`<h4>The circulatory system</h4>
<p>Large animals need a transport system because diffusion is too slow to move oxygen and nutrients to every cell. The <b>circulatory system</b> is a system of blood vessels with a <b>pump</b> (the heart) and <b>valves</b> that make sure blood flows in one direction only.</p>
<ul><li><b>Arteries</b> carry blood away from the heart.</li><li><b>Veins</b> carry blood back to the heart.</li><li><b>Capillaries</b> link arteries to veins and exchange materials with the body cells.</li></ul>
<h4>Single and double circulation (Extended)</h4>
{{BD_DOUBLE}}
<ul><li><b>Fish (single circulation).</b> The heart pumps deoxygenated blood to the gills, where it picks up oxygen. The blood then goes straight on to the body and returns to the heart. The blood passes through the heart <b>once</b> in each circuit.</li><li><b>Mammal (double circulation).</b> The right side of the heart pumps deoxygenated blood to the lungs. It returns to the left side of the heart, which pumps it to the body. The blood passes through the heart <b>twice</b> in each circuit.</li></ul>
<h4>Why a double circulation is an advantage (Extended)</h4>
<ul><li>Blood loses pressure when it passes through the narrow capillaries of the lungs. Returning it to the heart means it can be pumped again at <b>high pressure</b> to the body, so oxygen and nutrients are delivered quickly.</li><li>The blood going to the lungs can be pumped at a <b>lower pressure</b>, which protects the delicate lung capillaries.</li><li>Oxygenated and deoxygenated blood are kept separate, so the blood delivered to the tissues is fully loaded with oxygen. This suits active animals with a high demand for energy.</li></ul>
<h4>Structure of the mammalian heart</h4>
<p>The heart is a muscular organ that pumps blood. Its main structures are:</p>
{{BD_HEART}}
<ul><li>the <b>muscular wall</b> made of cardiac muscle, and the <b>septum</b> that divides the left and right sides;</li><li>two upper chambers, the <b>atria</b> (left and right atrium), which receive blood;</li><li>two lower chambers, the <b>ventricles</b>, which pump blood out;</li><li>one-way <b>valves</b> that prevent backflow;</li><li>the <b>coronary arteries</b> on the surface, which supply the heart muscle with oxygenated blood.</li></ul>
<p>Blood is pumped <b>away</b> from the heart in arteries (aorta and pulmonary artery) and returns to the heart in veins (vena cava and pulmonary vein).</p>
<h4>Valves, walls and the septum (Extended)</h4>
<ul><li><b>Atrioventricular valves</b> lie between the atria and ventricles. <b>Semilunar valves</b> lie at the start of the aorta and the pulmonary artery.</li><li>The <b>left ventricle</b> has a much thicker muscle wall than the right. It pumps blood to the whole body at high pressure, but the right ventricle only has to pump blood a short distance to the lungs.</li><li>The <b>atria</b> have thinner walls than the ventricles because they only push blood a short distance into the ventricles.</li><li>The <b>septum</b> stops oxygenated blood on the left mixing with deoxygenated blood on the right.</li></ul>
<h4>How the heart pumps blood (Extended)</h4>
{{BD_BEAT}}
<h4>Monitoring the heart</h4>
<p>Heart activity can be monitored in three ways.</p>
<ul><li><b>Pulse rate:</b> counted at the wrist or neck as the number of beats per minute.</li><li><b>Electrocardiogram (ECG):</b> a trace of the electrical activity of the heart.</li><li><b>Listening to the sounds of the valves closing</b> with a stethoscope.</li></ul>
<h4>Exercise and heart rate</h4>
{{BD_HRATE}}
<p>The heart rate rises when you exercise and falls back to the resting rate when you stop. To investigate, take the pulse at rest, exercise (for example step-ups) for a set time, then take the pulse every minute until it returns to normal. Keep the type, intensity and duration of exercise the same.</p>
<p><b>Extended: why does it rise?</b> During exercise the muscles respire faster. They need more oxygen and glucose and produce more carbon dioxide. A faster heartbeat sends blood to the muscles more quickly, delivering more oxygen and glucose and removing carbon dioxide. The rate stays high for a while after exercise because the body must pay back the oxygen it has been short of and remove waste products.</p>
<h4>Coronary heart disease</h4>
<p>The heart muscle needs its own blood supply from the <b>coronary arteries</b>. <b>Coronary heart disease</b> happens when these arteries become <b>blocked</b> by fatty deposits. The heart muscle then gets less oxygen, which can cause chest pain or a heart attack.</p>
<ul><li><b>Risk factors:</b> a diet high in saturated fat and salt, lack of exercise, stress, smoking, genetic predisposition, age (risk rises with age) and sex (men are at higher risk).</li><li><b>Reducing the risk:</b> eat a balanced diet that is low in saturated fats, take regular exercise, avoid smoking and manage stress.</li></ul>
<div class="key"><b>Exam tip</b>Do not say "the heart muscle gets blocked". It is the <b>coronary arteries</b> that are blocked.</div>`,
I("Why does your heart beat faster when you run?",
`<ol><li>Feel your pulse at your wrist for 15 seconds. Calculate beats per minute.</li><li>Write down what you think is happening to your muscles and your breathing when you run.</li><li>Predict what will happen to your pulse after a minute of exercise, and how long it will take to return to normal.</li><li>Write a question about the heart that you would like to test.</li></ol>`,
`<p><b>Investigate heart rate and exercise.</b> Work in pairs: one performs the exercise and one times and records.</p><ol><li>Sit quietly for 3 minutes. Count the pulse for 30 seconds and calculate the resting rate in beats per minute.</li><li>Do step-ups on a low step for 2 minutes at a steady pace.</li><li>Count the pulse immediately, then every minute for 8 minutes. Record the results in a table.</li><li>Plot a line graph of heart rate against time. Mark the period of exercise.</li><li>Describe the shape of the graph. How long was the recovery time?</li></ol><p><b>Evaluate:</b> list the variables you controlled. How could you compare people who exercise regularly with people who do not? Why must you not push anyone who feels unwell?</p><p>Safety: stop if you feel dizzy or unwell. Do not take part if you have a health condition that limits exercise.</p>`,
["https://phet.colorado.edu/","PhET simulations"]),
[["Describe the double circulation of a mammal.","Blood flows from the right side of the heart to the lungs (1), returns to the left side of the heart (1), is pumped to the body and returns to the right side (1).",3],
["Extended: Explain two advantages of a double circulation.","Blood returns to the heart to be pumped again at high pressure after the lungs, so it reaches the body quickly (1). Blood goes to the lungs at lower pressure, which avoids damaging the capillaries (1).",2],
["Extended: Explain why the wall of the left ventricle is thicker than the wall of the right ventricle.","The left ventricle pumps blood to the whole body, which needs high pressure (1). The right ventricle only pumps blood to the lungs, so lower pressure is enough (1). A thicker muscle wall contracts with more force (1).",3],
["State the function of the septum, of the valves and of the coronary arteries.","Septum: keeps oxygenated and deoxygenated blood apart (1). Valves: stop blood flowing backwards (1). Coronary arteries: supply the heart muscle with blood containing oxygen and glucose (1).",3],
["Extended: Explain why heart rate increases during exercise.","The muscles respire faster (1) and need more oxygen and glucose and produce more carbon dioxide (1). A faster heart rate delivers more blood to the muscles and removes the carbon dioxide (1).",3],
["Describe how coronary heart disease develops.","Fatty deposits build up in the coronary arteries (1) and block or narrow them (1) so the heart muscle gets less oxygen (1).",3],
["State three risk factors for coronary heart disease.","Any three of: diet high in saturated fat; lack of exercise; stress; smoking; genetic predisposition; age; sex (1 each).",3]],
[M("Which blood vessels carry blood away from the heart?",["Veins","Arteries","Capillaries","Lymph vessels"],1,"Arteries carry blood away from the heart."),
M("Extended: How many times does blood pass through the heart in one circuit of a fish?",["Once","Twice","Three times","Four times"],0,"A fish has a single circulation."),
M("Extended: Which advantage does a double circulation give?",["Blood reaches the body at high pressure","Blood avoids the heart","There are no valves","Blood does not need oxygen"],0,"The blood is pumped again after the lungs."),
M("Which chamber has the thickest muscle wall?",["Right atrium","Left atrium","Right ventricle","Left ventricle"],3,"It pumps blood around the whole body."),
M("What is the function of the coronary arteries?",["Carry blood to the lungs","Supply the heart muscle with blood","Carry blood to the kidney","Join the atria"],1,"They supply the heart muscle."),
N("A pulse of 18 beats is counted in 15 seconds. How many beats per minute?",72,"beats per minute","18 × 4 = 72."),
M("Which is a risk factor for coronary heart disease?",["Eating a balanced diet","Regular exercise","Smoking","Sleeping eight hours"],2,"Smoking increases the risk."),
M("Extended: What stops oxygenated and deoxygenated blood mixing in the heart?",["The valves","The septum","The aorta","The coronary artery"],1,"The septum separates the two sides.")],
[["Function of the heart","Pumps blood around the body."],
["Artery vs vein","Arteries carry blood away from the heart; veins carry blood back."],
["Extended: single circulation","Blood passes through the heart once in each circuit (fish)."],
["Extended: double circulation","Blood passes through the heart twice in each circuit (mammal)."],
["Why is the left ventricle wall thicker?","It pumps blood to the whole body at high pressure."],
["Function of the septum","Separates oxygenated and deoxygenated blood."],
["Three ways to monitor the heart","ECG, pulse rate, listening to the heart sounds."],
["What is coronary heart disease?","Blockage of the coronary arteries by fatty deposits."],
["Name four risk factors for CHD","Diet, lack of exercise, stress, smoking (also genes, age, sex)."],
["Extended: why does heart rate rise in exercise?","Muscles respire faster and need more oxygen and glucose delivered, with carbon dioxide removed."]]);

const BD_L92=L("Blood vessels","Arteries, veins and capillaries: how their structure fits their jobs, and the main vessels that serve the heart, lungs, kidneys and liver.",
`<h4>Three kinds of blood vessel</h4>
{{BD_VESSELS}}
<table><tr><th>Vessel</th><th>Wall</th><th>Lumen</th><th>Valves</th><th>Carries blood</th></tr>
<tr><td>Artery</td><td>Thick, muscular and elastic</td><td>Narrow</td><td>No</td><td>Away from the heart</td></tr>
<tr><td>Vein</td><td>Thin</td><td>Wide</td><td>Yes</td><td>Towards the heart</td></tr>
<tr><td>Capillary</td><td>One cell thick</td><td>Very narrow</td><td>No</td><td>Through the tissues</td></tr></table>
<div class="key"><b>Exam tip</b>Do not say arteries carry oxygenated blood and veins carry deoxygenated blood. The pulmonary artery carries deoxygenated blood and the pulmonary vein carries oxygenated blood. Say "away from" and "towards" the heart.</div>
<h4>Structure and blood pressure (Extended)</h4>
<ul><li><b>Arteries</b> carry blood at high pressure straight from the heart. They have thick, muscular and elastic walls that withstand the pressure and stretch and recoil with each heartbeat. The narrow lumen helps keep the pressure high.</li><li><b>Veins</b> carry blood at low pressure back to the heart, so their walls are thinner. The wide lumen reduces resistance to the flow, and the <b>valves</b> stop the blood flowing backwards.</li></ul>
<h4>Capillaries</h4>
<p>Capillaries form dense networks in all the tissues. Their function is the <b>exchange of materials</b> between the blood and the body cells: oxygen and nutrients leave the blood while carbon dioxide and other wastes enter.</p>
<p><b>Extended:</b> capillaries are adapted for exchange.</p>
<ul><li>The wall is <b>one cell thick</b>, so the diffusion distance is very short.</li><li>The wall is permeable to small molecules.</li><li>The lumen is very narrow, so red blood cells move slowly in single file, giving time for exchange.</li><li>There are huge numbers of capillaries, giving a large surface area.</li></ul>
<h4>Main blood vessels to and from the heart, lungs and kidneys</h4>
{{BD_ORGANS}}
<table><tr><th>Organ</th><th>Vessel</th><th>Where it goes</th></tr>
<tr><td rowspan="4">Heart</td><td>Vena cava</td><td>Brings deoxygenated blood from the body to the heart</td></tr>
<tr><td>Aorta</td><td>Takes oxygenated blood from the heart to the body</td></tr>
<tr><td>Pulmonary artery</td><td>Takes deoxygenated blood from the heart to the lungs</td></tr>
<tr><td>Pulmonary vein</td><td>Brings oxygenated blood from the lungs to the heart</td></tr>
<tr><td>Kidney</td><td>Renal artery and renal vein</td><td>Take blood to and away from the kidney</td></tr></table>
<h4>Vessels of the liver (Extended)</h4>
<ul><li>The <b>hepatic artery</b> brings oxygenated blood to the liver from the aorta.</li><li>The <b>hepatic portal vein</b> brings blood from the small intestine, rich in digested food, to the liver.</li><li>The <b>hepatic vein</b> carries blood from the liver to the vena cava.</li></ul>
<div class="ex"><b>Worked example</b>Name the blood vessel that carries blood from the small intestine to the liver.<br>The hepatic portal vein. It brings the products of digestion to the liver for processing.</div>`,
I("Why can you feel a pulse in an artery but not in a vein?",
`<ol><li>Find your pulse at your wrist and note where you feel it.</li><li>Predict what is different about the walls of the vessel that you can feel pulsing.</li><li>Write down what you know about blood pressure in arteries and in veins.</li><li>Suggest why veins need valves but arteries do not.</li></ol>`,
`<p><b>Compare the vessels.</b> Use prepared slides or photomicrographs of an artery and a vein in cross section.</p><ol><li>Draw each vessel and label the lumen and wall.</li><li>Measure the lumen diameter and wall thickness with a ruler or scale. A student measures an artery with lumen 4.0 mm and wall 1.0 mm, and a vein with lumen 5.0 mm and wall 0.5 mm. Calculate wall thickness ÷ lumen diameter for each. Which is thicker relative to its lumen?</li><li>Use rubber tubing (thick and thin) and a water pump or syringe to model high and low pressure. Which tubing bulges more?</li><li>Write a table that links each feature to the pressure it must withstand.</li></ol><p><b>Extension:</b> find a video of valves in a vein and describe how they work.</p>`),
[["Describe two ways in which the structure of an artery differs from that of a vein.","The artery wall is thicker (1) and its lumen is narrower (1). Veins also have valves but arteries do not (accept as an alternative to either point).",2],
["State the function of capillaries.","Exchange of materials between the blood and the cells (1), for example oxygen and nutrients out and carbon dioxide in (1).",2],
["Name the vessel that carries blood (a) from the heart to the lungs, (b) from the lungs to the heart, (c) to the kidney.","Pulmonary artery (1), pulmonary vein (1), renal artery (1).",3],
["Extended: Explain how the structure of an artery is related to the pressure of the blood it carries.","The thick muscular and elastic wall withstands the high pressure (1) and can stretch and recoil with each heartbeat (1). The narrow lumen helps to keep the pressure high (1).",3],
["Extended: Explain how capillaries are adapted for exchange.","The wall is one cell thick so diffusion distance is short (1). The wall is permeable to small molecules (1). A large network gives a large surface area (1).",3],
["Extended: Name the three blood vessels to and from the liver and state what the hepatic portal vein carries.","Hepatic artery (1), hepatic vein (1), hepatic portal vein carrying blood from the small intestine with digested food (1).",3]],
[M("Which vessel has valves?",["Artery","Vein","Capillary","Aorta"],1,"Veins have valves to prevent backflow."),
M("Which vessel has walls one cell thick?",["Artery","Vein","Capillary","Vena cava"],2,"Capillaries."),
M("Which vessel carries oxygenated blood from the lungs to the heart?",["Aorta","Pulmonary artery","Pulmonary vein","Vena cava"],2,"The pulmonary vein."),
M("Which vessel carries blood from the heart to the body?",["Vena cava","Aorta","Hepatic vein","Renal vein"],1,"The aorta."),
M("Extended: Why do arteries have thick elastic walls?",["To carry blood slowly","To withstand high pressure","To exchange gases","To store blood"],1,"Blood is at high pressure."),
M("Extended: Why do veins have valves?",["To increase pressure","To stop backflow of blood","To store oxygen","To make blood clot"],1,"Pressure is low so valves keep the flow one way."),
M("Extended: Which vessel brings digested food from the gut to the liver?",["Hepatic vein","Hepatic artery","Hepatic portal vein","Renal vein"],2,"The hepatic portal vein."),
T("Name the vessel that carries blood away from the kidney.",["renal vein"],"The renal vein.")],
[["Artery wall and lumen","Thick muscular wall, narrow lumen."],
["Vein wall, lumen and valves","Thin wall, wide lumen, with valves."],
["Capillary wall","One cell thick."],
["Function of capillaries","Exchange of materials with the cells."],
["Vena cava","Brings blood from the body to the heart."],
["Aorta","Carries blood from the heart to the body."],
["Pulmonary artery and vein","To the lungs (deoxygenated); from the lungs (oxygenated)."],
["Renal artery and vein","Take blood to and from the kidney."],
["Extended: hepatic portal vein","Carries blood from the gut to the liver."],
["Extended: hepatic artery and vein","Hepatic artery brings blood to the liver; hepatic vein takes it away."]]);

const BD_L93=L("Blood","The components of blood, the roles of red cells and haemoglobin, white cells, platelets and clotting, and what plasma carries.",
`<h4>Components of blood</h4>
<p>Blood is a tissue made of four components: <b>red blood cells</b>, <b>white blood cells</b>, <b>platelets</b> and the liquid <b>plasma</b>.</p>
{{BD_BLOOD}}
<h4>Red blood cells and haemoglobin</h4>
<p>Red blood cells transport <b>oxygen</b>. They contain the red pigment <b>haemoglobin</b>, which combines with oxygen in the lungs to form oxyhaemoglobin. In the tissues the oxygen is released.</p>
<ul><li>Red cells are <b>biconcave discs</b>, which give a large surface area for taking up oxygen.</li><li>They have no nucleus, so there is more space for haemoglobin.</li></ul>
<h4>White blood cells</h4>
<p>White blood cells help to defend the body against pathogens. They carry out <b>phagocytosis</b> and make <b>antibodies</b>. Two types are named in the syllabus.</p>
<ul><li><b>Phagocytes</b> (Extended: identify them by their large, lobed nucleus) <b>engulf pathogens</b> and digest them: this is phagocytosis.</li><li><b>Lymphocytes</b> (Extended: identify them by their large, round nucleus) <b>produce antibodies</b> that destroy pathogens.</li></ul>
<h4>Platelets and blood clotting</h4>
<p>Platelets are small fragments of cells. They help the blood to clot at a wound. A clot has two roles: it prevents <b>loss of blood</b> and prevents the <b>entry of pathogens</b>.</p>
<h4>How a clot forms (Extended)</h4>
{{BD_CLOT}}
<p>At a wound, the soluble plasma protein <b>fibrinogen</b> is converted to insoluble <b>fibrin</b>. The fibrin forms a mesh of fibres across the wound that traps red blood cells and platelets. The clot hardens into a scab.</p>
<h4>Plasma</h4>
<p>Plasma is the pale yellow liquid that makes up just over half of the blood. It transports the following.</p>
<table><tr><th>Substance carried</th><th>From</th><th>To</th></tr>
<tr><td>Blood cells</td><td>Made in the bone marrow</td><td>Around the body</td></tr>
<tr><td>Ions and nutrients (glucose, amino acids)</td><td>Gut, liver</td><td>All cells</td></tr>
<tr><td>Urea</td><td>Liver</td><td>Kidneys</td></tr>
<tr><td>Hormones</td><td>Glands</td><td>Target organs</td></tr>
<tr><td>Carbon dioxide</td><td>Respiring cells</td><td>Lungs</td></tr></table>
<div class="ex"><b>Worked example</b>Name two functions of white blood cells.<br>Phagocytosis, which is engulfing and digesting pathogens, and antibody production by lymphocytes.</div>`,
I("What is blood made of, and what does each part do?",
`<ol><li>Write down everything you know about blood.</li><li>Predict what you would see if blood was left to settle in a tube.</li><li>List parts of blood and guess a job for each.</li><li>Write a question about how blood stops a cut bleeding.</li></ol>`,
`<p><b>Model blood.</b> In a clear bottle, mix about 55 cm³ of pale yellow liquid (plasma, for example dilute yellow food dye), 44 red beads, 1 white bead and a few tiny sequins or flakes (platelets).</p><ol><li>Observe and record how many of each there are. Which part is the most plentiful?</li><li>Match each part of the model to the real component. State a job for each.</li><li>Examine a prepared slide or photomicrograph of blood. Draw one red cell, one phagocyte and one lymphocyte. Label the nucleus where it is present.</li><li>Calculate the ratio of red cells to white cells from your counts of the photomicrograph.</li></ol><p><b>Evaluate:</b> list two ways the model is like blood and two ways it is not.</p>`),
[["List the four components of blood.","Red blood cells, white blood cells, platelets, plasma (2). Award 1 mark for two or three correct.",2],
["State the function of red blood cells and explain the role of haemoglobin.","Transport oxygen (1). Haemoglobin combines with oxygen in the lungs (1) and releases it in the tissues (1).",3],
["State two functions of white blood cells.","Phagocytosis (1) and antibody production (1).",2],
["Extended: Describe how phagocytes and lymphocytes protect the body.","Phagocytes engulf pathogens (1) and digest them (1). Lymphocytes produce antibodies (1).",3],
["State two roles of blood clotting.","Prevents the loss of blood (1) and prevents the entry of pathogens (1).",2],
["Extended: Describe how a blood clot forms.","Soluble fibrinogen is converted to insoluble fibrin (1) which forms a mesh of fibres (1) that traps blood cells to seal the wound (1).",3],
["State three substances that are transported in plasma.","Any three of: blood cells, ions, nutrients (glucose, amino acids), urea, hormones, carbon dioxide (1 each).",3]],
[M("Which component of blood carries oxygen?",["Plasma","Platelets","Red blood cells","White blood cells"],2,"Red blood cells contain haemoglobin."),
M("What is the name of the pigment in red blood cells?",["Chlorophyll","Haemoglobin","Fibrin","Amylase"],1,"Haemoglobin."),
M("What do platelets help to do?",["Carry oxygen","Make antibodies","Clot the blood","Carry urea"],2,"Platelets help the blood to clot."),
M("Extended: Which white blood cell makes antibodies?",["Phagocyte","Lymphocyte","Platelet","Red blood cell"],1,"Lymphocytes make antibodies."),
M("Extended: Which cell carries out phagocytosis?",["Lymphocyte","Red blood cell","Phagocyte","Platelet"],2,"Phagocytes engulf pathogens."),
M("Extended: Which change happens during clotting?",["Fibrin becomes fibrinogen","Fibrinogen becomes fibrin","Haemoglobin becomes fibrin","Plasma becomes platelets"],1,"Fibrinogen is converted to fibrin."),
M("Which substance is carried from the liver to the kidneys in plasma?",["Urea","Oxygen","Haemoglobin","Platelets"],0,"Urea is carried to the kidneys."),
T("Name the liquid part of blood.",["plasma"],"Plasma.")],
[["Four components of blood","Red blood cells, white blood cells, platelets, plasma."],
["Function of red blood cells","Transport oxygen."],
["Role of haemoglobin","Combines with oxygen in the lungs and releases it in the tissues."],
["Function of white blood cells","Phagocytosis and antibody production."],
["Extended: phagocyte","Engulfs pathogens (phagocytosis); large lobed nucleus."],
["Extended: lymphocyte","Produces antibodies; large round nucleus."],
["Function of platelets","Help the blood to clot."],
["Two roles of clotting","Prevents blood loss and the entry of pathogens."],
["Extended: how a clot forms","Fibrinogen is converted to fibrin, forming a mesh."],
["What does plasma transport?","Blood cells, ions, nutrients, urea, hormones, carbon dioxide."]]);

const BD_Q9=[M("Which blood vessels carry blood towards the heart?",["Arteries","Veins","Capillaries","Aortas"],1,"Veins."),
M("Extended: What is the advantage of a double circulation?",["Blood does not reach the lungs","Blood is pumped to the body at high pressure","The heart has no valves","Blood needs less oxygen"],1,"Blood is pumped twice, so it reaches the body at high pressure."),
M("Which chamber pumps blood to the whole body?",["Right atrium","Left atrium","Right ventricle","Left ventricle"],3,"The left ventricle."),
N("A pulse of 21 beats is counted in 15 seconds. What is the heart rate in beats per minute?",84,"beats per minute","21 × 4 = 84."),
M("What do capillaries do?",["Pump blood","Exchange materials with cells","Store blood","Carry blood at high pressure"],1,"They exchange materials."),
M("Which component of blood helps it to clot?",["Red blood cells","Platelets","Plasma","Haemoglobin"],1,"Platelets."),
M("Extended: Which vessel carries blood from the small intestine to the liver?",["Hepatic vein","Renal artery","Hepatic portal vein","Aorta"],2,"The hepatic portal vein."),
T("Name the disease caused by blockage of the coronary arteries.",["coronary heart disease","chd"],"Coronary heart disease.")];

const BD_P9=[
P("Structure and function of the heart",8,"<ol type='a'><li>Name the chamber of the heart that pumps blood to the lungs. [1]</li><li>Name the vessel that brings oxygenated blood from the lungs to the heart. [1]</li><li>Explain why the septum is important. [2]</li><li>Explain why the wall of the left ventricle is thicker than the wall of the right ventricle. [2]</li><li>Describe the function of the valves in the heart. [2]</li></ol>",
["(a) Right ventricle (1).","(b) Pulmonary vein (1).","(c) The septum separates the left side (oxygenated blood) from the right side (deoxygenated blood) (1) so the two kinds of blood do not mix and blood sent to the body is fully oxygenated (1).","(d) The left ventricle pumps blood to the whole body, which needs high pressure (1); the right ventricle only pumps blood to the lungs, so lower pressure is needed (1).","(e) The valves allow blood to flow in one direction only (1) and close to prevent blood flowing backwards (1)."],"Hub exam-style question (written for this hub), Topic 9"),
P("Single and double circulation",6,"<ol type='a'><li>Describe the single circulation of a fish. [3]</li><li>A mammal has a double circulation. State what is meant by this. [1]</li><li>Explain <b>two</b> advantages of a double circulation. [2]</li></ol>",
["(a) The heart pumps deoxygenated blood to the gills (1) where it takes up oxygen; the blood then goes directly to the body (1) and returns to the heart (1).","(b) The blood passes through the heart twice in each complete circuit (1).","(c) Blood returns to the heart after the lungs so it can be pumped to the body at high pressure (1); oxygenated and deoxygenated blood are kept separate / blood goes to the lungs at lower pressure, protecting the capillaries (1)."],"Hub exam-style question (written for this hub), Topic 9"),
P("Exercise and heart rate",7,"<p>A student measured her heart rate at rest and during different activities.</p>"+TBL(["Activity","Heart rate / beats per minute"],[["At rest","72"],["Jogging","128"],["Fast running","165"],["5 minutes after running","90"]],360)+"<ol type='a'><li>State the heart rate when the student was jogging. [1]</li><li>Calculate the percentage increase in heart rate from rest to fast running. Give your answer to the nearest whole number. [2]</li><li>Explain why the heart rate increases during exercise. [3]</li><li>Suggest why the heart rate is still above the resting rate 5 minutes after exercise. [1]</li></ol>",
["(a) 128 beats per minute (1).","(b) (165 − 72) ÷ 72 × 100 (1) = 129% (1).","(c) The muscles respire faster (1) and need more oxygen and glucose, and make more carbon dioxide (1); a faster heart rate delivers these and removes carbon dioxide more quickly (1).","(d) The body is still paying back the oxygen debt / removing waste products from the muscles (1)."],"Hub exam-style question (written for this hub), Topic 9"),
P("Blood vessels",6,"<ol type='a'><li>Name the blood vessel that carries blood from the heart to the lungs. [1]</li><li>State <b>two</b> differences between the structure of an artery and the structure of a vein. [2]</li><li>Explain how the structure of a capillary is adapted for the exchange of materials. [2]</li><li>Name the blood vessel that carries digested food from the small intestine to the liver. [1]</li></ol>",
["(a) Pulmonary artery (1).","(b) The artery has a thicker wall (1); the artery has a narrower lumen / the vein has valves (1).","(c) The wall is one cell thick so the diffusion distance is short (1); there are many capillaries with a large surface area / the wall is permeable (1).","(d) Hepatic portal vein (1)."],"Hub exam-style question (written for this hub), Topic 9"),
P("Components of blood",8,"<ol type='a'><li>Name the component of blood that contains haemoglobin. [1]</li><li>State the function of haemoglobin. [1]</li><li>Describe how phagocytes and lymphocytes help to defend the body against pathogens. [3]</li><li>Describe how a blood clot forms and explain why clotting is important. [3]</li></ol>",
["(a) Red blood cells (1).","(b) It combines with oxygen to transport it (1).","(c) Phagocytes engulf and digest pathogens (1); lymphocytes produce antibodies (1) that destroy pathogens (1).","(d) Fibrinogen is converted to fibrin (1) which forms a mesh that traps blood cells (1); the clot prevents loss of blood and the entry of pathogens (1)."],"Hub exam-style question (written for this hub), Topic 9"),
P("Coronary heart disease",6,"<ol type='a'><li>Describe what is meant by coronary heart disease. [2]</li><li>State <b>three</b> risk factors for coronary heart disease. [3]</li><li>Suggest <b>one</b> way in which a person can reduce the risk of developing the disease. [1]</li></ol>",
["(a) The coronary arteries become blocked or narrowed (1) so the heart muscle receives less oxygen (1).","(b) Any three of: diet high in saturated fat or salt; lack of exercise; stress; smoking; genetic predisposition; age; sex (1)(1)(1).","(c) Any one of: eat a balanced diet with less saturated fat; take regular exercise; do not smoke (1)."],"Hub exam-style question (written for this hub), Topic 9")
];
BSET(9,[BD_L91,BD_L92,BD_L93],BD_Q9,BD_P9);
