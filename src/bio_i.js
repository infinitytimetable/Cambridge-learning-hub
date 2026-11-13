/* ===== Biology 0610, Topics 19 and 20 (Organisms and their environment; Human influences on ecosystems). Own notes. Prefix BI_ ===== */
const BI_FG=(vb,inner,cap,label,maxw)=>`<figure class="fig"${maxw?` style="max-width:${maxw}px"`:""}><svg viewBox="${vb}" role="img" aria-label="${label}">${inner}</svg><figcaption>${cap}</figcaption></figure>`;
const BI_T=(x,y,s,o)=>{o=o||{};return `<text x="${x}" y="${y}" font-size="${o.s||11}" text-anchor="${o.a||"middle"}"${o.b?' font-weight="700"':""}${o.i?' font-style="italic"':""} ${o.c?`style="fill:${o.c}"`:'fill="currentColor"'}>${s}</text>`};
const BI_ARR=(x1,y1,x2,y2,col,w,dash)=>{const a=Math.atan2(y2-y1,x2-x1),h=7,c=col||"currentColor";
  return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="${w||2}" fill="none"${dash?' stroke-dasharray="4 3"':""}/><path d="M${x2} ${y2}l${(-h*Math.cos(a-.45)).toFixed(1)} ${(-h*Math.sin(a-.45)).toFixed(1)}M${x2} ${y2}l${(-h*Math.cos(a+.45)).toFixed(1)} ${(-h*Math.sin(a+.45)).toFixed(1)}" stroke="${c}" stroke-width="${w||2}" fill="none" stroke-linecap="round"/>`};
const BI_BOX=(x,y,w,h,lines,o)=>{o=o||{};return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" ${o.f?`style="fill:${o.f}" fill-opacity="${o.fo||.3}"`:'fill="none"'} stroke="currentColor" stroke-opacity=".6" stroke-width="1.4"/>`+lines.map((t,i)=>BI_T(x+w/2,y+h/2+4-(lines.length-1)*6.5+i*13,t,{s:o.s||11,b:i===0&&o.b})).join("")};

/* energy flow through a food chain */
FIGS.BI_ENERGY=()=>{
  let s=`<circle cx="30" cy="50" r="19" style="fill:var(--amber)" fill-opacity=".85"/>`+BI_T(30,86,"Sun",{s:11,b:1});
  const nm=[["Producer","grass"],["Primary","consumer"],["Secondary","consumer"],["Tertiary","consumer"]];
  nm.forEach((n,i)=>{const x=72+i*86;s+=BI_BOX(x,32,74,40,n,{s:10.5,b:1,f:i?"var(--amber)":"var(--accent)"});
    if(i)s+=BI_ARR(x-10,52,x,52);
    s+=BI_ARR(x+37,74,x+37,132,"var(--bad)",1.6,1)});
  s+=BI_ARR(50,50,70,50,"var(--amber)",2.2)+BI_T(46,22,"light energy",{s:10,i:1});
  s+=`<rect x="64" y="134" width="342" height="30" rx="6" style="fill:var(--bad)" fill-opacity=".18" stroke="currentColor" stroke-opacity=".4"/>`+BI_T(235,153,"heat lost to the surroundings at every level",{s:11,b:1});
  s+=BI_T(235,184,"Chemical energy passes along the chain. Less is left at each step.",{s:10.5,i:1});
  return BI_FG("0 0 420 192",s,"Energy enters as light, is stored as chemical energy by producers and passes along the chain. Most of it is lost as heat from respiration, so it never returns to the producers.","Food chain from the Sun to a producer and three consumers with heat lost at every level",520)};

/* a food web */
FIGS.BI_WEB=()=>{
  const P={grass:[90,184],shrub:[310,184],rabbit:[50,132],mouse:[200,132],caterpillar:[350,132],fox:[120,80],thrush:[350,80],owl:[240,28]};
  const lab={grass:"grass",shrub:"shrub",rabbit:"rabbit",mouse:"mouse",caterpillar:"caterpillar",fox:"fox",thrush:"thrush",owl:"owl"};
  let s="";const E=[["grass","rabbit"],["grass","mouse"],["shrub","mouse"],["shrub","caterpillar"],["rabbit","fox"],["mouse","fox"],["caterpillar","thrush"],["mouse","owl"],["thrush","owl"]];
  E.forEach(e=>{const a=P[e[0]],b=P[e[1]];const dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy),ux=dx/L,uy=dy/L;s+=BI_ARR(a[0]+ux*17,a[1]+uy*15,b[0]-ux*17,b[1]-uy*17,"currentColor",1.5)});
  Object.keys(P).forEach(k=>{const p=P[k],pr=k==="grass"||k==="shrub";s+=BI_BOX(p[0]-36,p[1]-13,72,26,[lab[k]],{s:11,b:1,f:pr?"var(--accent)":null})});
  s+=BI_T(10,216,"Arrows point to the organism that receives the energy.",{a:"start",s:10.5,i:1});
  return BI_FG("0 0 420 224",s,"Several food chains joined together. The mouse is eaten by both the fox and the owl, so removing it would affect several other populations.","Food web with grass and shrub as producers, rabbit mouse and caterpillar as primary consumers, and fox thrush and owl above them",520)};

/* pyramids */
FIGS.BI_PYR=()=>{
  const pan=[["Numbers","number of organisms",["10","100","1000","10 000"]],["Biomass","dry mass, g per m²",["1","8","60","500"]],["Energy","kJ per m² per year",["10","100","1000","10 000"]]];
  let s="";
  pan.forEach((p,i)=>{const cx=70+i*140;
    s+=BI_T(cx,16,p[0],{s:12,b:1})+BI_T(cx,30,p[1],{s:10,i:1});
    p[2].forEach((v,j)=>{const w=50+j*24,y=40+j*30;s+=`<rect x="${cx-w/2}" y="${y}" width="${w}" height="26" style="fill:${j===0?"var(--amber)":j===3?"var(--accent)":"var(--accent)"}" fill-opacity="${j===0?.75:.28+j*.14}" stroke="currentColor" stroke-opacity=".55"/>`+BI_T(cx,y+17,v,{s:10.5,b:1})});
    });
  s+=BI_T(10,178,"top of each pyramid: tertiary consumer, bottom: producer",{a:"start",s:10.5,i:1});
  return BI_FG("0 0 420 186",s,"Three ways to draw a food chain as a pyramid. Each level is drawn as a bar, with the producers at the base. The energy pyramid always narrows, because energy is lost at each step.","Three pyramids showing numbers biomass and energy at four trophic levels from producer at the base to tertiary consumer at the top",520)};

/* carbon cycle */
FIGS.BI_CARBON=()=>{
  let s=BI_BOX(125,6,170,34,["Carbon dioxide in the air"],{s:11,b:1,f:"var(--blu)"});
  s+=BI_BOX(8,100,100,38,["Plants","(producers)"],{s:11,b:1,f:"var(--accent)"})+BI_BOX(300,100,86,38,["Animals","(consumers)"],{s:10.5,b:1,f:"var(--amber)"});
  s+=BI_BOX(100,196,134,34,["Dead organisms","and waste"],{s:10.5,b:1})+BI_BOX(318,196,94,34,["Fossil fuels","(coal, oil, gas)"],{s:10,b:1,f:"var(--pur)"});
  s+=BI_ARR(120,41,44,98,"var(--good)",2)+BI_T(98,50,"photosynthesis",{a:"end",s:10,b:1});
  s+=BI_ARR(80,98,150,41,"var(--bad)",1.8)+BI_T(122,86,"respiration",{a:"start",s:10});
  s+=BI_ARR(330,98,268,41,"var(--bad)",1.8)+BI_T(334,76,"respiration",{a:"start",s:9.5});
  s+=BI_ARR(110,120,298,120,"currentColor",1.6)+BI_T(160,114,"feeding",{s:10,i:1});
  s+=BI_ARR(58,140,118,194,"currentColor",1.4)+BI_T(78,172,"death",{a:"end",s:10,i:1});
  s+=BI_ARR(342,140,222,194,"currentColor",1.4);
  s+=BI_ARR(210,194,210,42,"var(--bad)",1.8)+BI_T(204,158,"decomposition:",{a:"end",s:10})+BI_T(204,170,"decomposers respire",{a:"end",s:9.5});
  s+=BI_ARR(236,213,316,213,"currentColor",1.4,1)+BI_T(276,242,"millions of years",{s:9.5,i:1});
  s+=`<path d="M404 194V23" stroke="var(--bad)" stroke-width="1.8" fill="none"/>`+BI_ARR(404,23,298,23,"var(--bad)",1.8)+BI_T(400,170,"combustion",{a:"end",s:10,b:1});
  return BI_FG("0 0 420 250",s,"Green arrows take carbon dioxide out of the air. Red arrows put it back. Carbon is stored in organisms, in dead material and, for a very long time, in fossil fuels.","Carbon cycle showing photosynthesis, respiration, feeding, decomposition, fossil fuel formation and combustion",520)};

/* nitrogen cycle */
FIGS.BI_NITRO=()=>{
  let s=BI_BOX(125,4,170,32,["Nitrogen gas, N<tspan dy=\"3\" font-size=\"8\">2</tspan><tspan dy=\"-3\"> in the air</tspan>"],{s:11,b:1,f:"var(--blu)"});
  s+=BI_BOX(6,100,96,38,["Nitrate ions","in the soil"],{s:10.5,b:1})+BI_BOX(318,100,96,38,["Ammonium","ions in soil"],{s:10.5,b:1});
  s+=BI_BOX(6,172,96,38,["Plants","(proteins)"],{s:10.5,b:1,f:"var(--accent)"})+BI_BOX(318,172,96,38,["Animals","(proteins)"],{s:10.5,b:1,f:"var(--amber)"});
  s+=BI_BOX(150,214,120,34,["Dead organisms,","waste, urea"],{s:10,b:1});
  s+=BI_ARR(150,36,56,98,"var(--good)",1.8)+BI_T(4,50,"lightning and",{a:"start",s:9.5})+BI_T(4,62,"fixing bacteria",{a:"start",s:9.5});
  s+=BI_ARR(270,36,364,98,"var(--good)",1.8)+BI_T(416,50,"fixing",{a:"end",s:9.5})+BI_T(416,62,"bacteria",{a:"end",s:9.5});
  s+=BI_ARR(100,100,160,38,"var(--bad)",1.6,1)+BI_T(146,88,"denitrification",{a:"start",s:9.5,b:1});
  s+=BI_ARR(316,119,104,119,"var(--good)",1.8)+BI_T(210,112,"nitrification",{s:10,b:1})+BI_T(210,134,"(nitrifying bacteria)",{s:9.5,i:1});
  s+=BI_ARR(54,140,54,170,"currentColor",1.6)+BI_T(60,160,"absorbed",{a:"start",s:9.5});
  s+=BI_ARR(104,190,316,190,"currentColor",1.6)+BI_T(210,184,"feeding",{s:10,i:1});
  s+=BI_ARR(54,212,152,230,"currentColor",1.3)+BI_ARR(366,212,268,230,"currentColor",1.3);
  s+=BI_ARR(240,212,340,140,"var(--bad)",1.6)+BI_T(262,166,"decomposers",{a:"end",s:9.5});
  return BI_FG("0 0 420 252",s,"Bacteria drive most of the nitrogen cycle. Green arrows add usable nitrogen to the soil. Decomposers release ammonium ions from dead material, and denitrification (dashed) returns nitrogen to the air.","Nitrogen cycle with fixation, nitrification, absorption by plants, feeding, decomposition to ammonium and denitrification",520)};

/* sigmoid growth curve */
FIGS.BI_SIGMOID=()=>{
  const x0=44,y0=150,w=350,h=120;let pts=[];
  for(let i=0;i<=40;i++){const t=i/40*0.72,v=1/(1+Math.exp(-14*(t-.3)));pts.push([x0+t*w/.9,y0-v*h*.85])}
  const last=pts[pts.length-1];
  for(let i=1;i<=6;i++)pts.push([last[0]+i*10,last[1]+i*i*1.1+i*2]);
  let s=`<path d="M${x0} 14V${y0}H${x0+w+10}" stroke="currentColor" fill="none" stroke-width="1.6"/>`+BI_T(x0+w/2,y0+30,"Time",{s:11,b:1})+`<text x="12" y="${y0/2+10}" font-size="11" font-weight="700" text-anchor="middle" transform="rotate(-90 12 ${y0/2+10})" fill="currentColor">Population size</text>`;
  s+=`<path d="M${pts.map(p=>p[0].toFixed(1)+" "+p[1].toFixed(1)).join("L")}" stroke="var(--accent)" stroke-width="3" fill="none"/>`;
  [102,219,324].forEach(a=>{s+=`<path d="M${a} 20V${y0}" stroke="currentColor" stroke-opacity=".35" stroke-dasharray="4 3"/>`});
  s+=BI_T(73,28,"lag",{s:10.5,b:1})+BI_T(160,28,"exponential",{s:10.5,b:1})+BI_T(160,40,"(log)",{s:10,i:1})+BI_T(271,28,"stationary",{s:10.5,b:1})+BI_T(362,28,"death",{s:10.5,b:1});
  return BI_FG("0 0 420 190",s,"A population in an environment with limited resources. Growth is slow at first, then rapid, then levels off as limiting factors act, and may finally fall.","Sigmoid population growth curve with lag, exponential, stationary and death phases",520)};

/* quadrat sampling */
FIGS.BI_QUAD=()=>{
  const r=rng(7),Q=[[40,18,4],[150,50,6],[250,16,3],[78,100,5],[300,96,7]];
  let s=`<rect x="6" y="6" width="400" height="186" rx="8" style="fill:var(--good-bg)" stroke="currentColor" stroke-opacity=".5"/>`;
  const dot=(x,y)=>`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" style="fill:var(--amber)" stroke="currentColor" stroke-opacity=".5" stroke-width=".7"/>`;
  Q.forEach((q,i)=>{s+=`<rect x="${q[0]}" y="${q[1]}" width="56" height="56" fill="none" stroke="currentColor" stroke-width="2"/>`;
    for(let k=0;k<q[2];k++)s+=dot(q[0]+7+r()*42,q[1]+7+r()*42);
    s+=BI_T(q[0]+28,q[1]+72,"Q"+(i+1)+": "+q[2],{s:10.5,b:1})});
  for(let k=0;k<16;k++){const x=16+r()*380,y=14+r()*170;if(!Q.some(q=>x>q[0]-6&&x<q[0]+62&&y>q[1]-6&&y<q[1]+78))s+=dot(x,y)}
  s+=BI_T(10,212,"mean = (4 + 6 + 3 + 5 + 7) ÷ 5 = 5 per quadrat",{a:"start",s:11,b:1});
  s+=BI_T(10,228,"Each quadrat is 1 m². Field area 400 m², so the estimate is 5 × 400 = 2000 plants.",{a:"start",s:10.5,i:1});
  return BI_FG("0 0 420 236",s,"Quadrats are placed at random positions. The plants in each are counted, the mean is found, and it is scaled up to the whole area.","Field with five square quadrats each containing counted plants and the working for the population estimate",520)};

/* energy to humans */
FIGS.BI_FOODEFF=()=>{
  let s=BI_T(10,16,"Humans eat the crop",{a:"start",s:12,b:1});
  s+=BI_BOX(10,24,200,32,["Crop plants: 1000 kJ"],{s:11,b:1,f:"var(--accent)"})+BI_ARR(212,40,250,40,"currentColor",2)+BI_BOX(252,24,70,32,["Human","about 100 kJ"],{s:10,b:1,f:"var(--amber)"});
  s+=BI_T(10,92,"Humans eat livestock fed on the crop",{a:"start",s:12,b:1});
  s+=BI_BOX(10,100,200,32,["Crop plants: 1000 kJ"],{s:11,b:1,f:"var(--accent)"})+BI_ARR(212,116,226,116,"currentColor",2)+BI_BOX(228,100,70,32,["Cattle","about 100 kJ"],{s:10,b:1,f:"var(--pur)"})+BI_ARR(300,116,314,116,"currentColor",2)+BI_BOX(316,100,50,32,["Human","about 10 kJ"],{s:9.5,b:1,f:"var(--amber)"});
  s+=BI_T(10,154,"Each extra link loses energy as heat and in waste, so",{a:"start",s:10.5,i:1})+BI_T(10,168,"more people can be fed from the crop directly.",{a:"start",s:10.5,i:1});
  return BI_FG("0 0 420 176",s,"Illustrative figures. Because a food chain loses energy at every step, eating crop plants directly is more energy efficient than eating livestock fed on those crops.","Comparison of energy reaching humans from eating crops directly and from eating livestock",520)};

/* yield against fertiliser */
FIGS.BI_YIELD=()=>{
  const x0=48,y0=150;let pts=[];for(let i=0;i<=30;i++){const t=i/30;pts.push([x0+t*320,y0-(1-Math.exp(-3.2*t))*118-4])}
  let s=`<path d="M${x0} 14V${y0}H392" stroke="currentColor" fill="none" stroke-width="1.6"/>`+BI_T(x0+170,y0+30,"Amount of fertiliser added",{s:11,b:1})+`<text x="14" y="86" font-size="11" font-weight="700" text-anchor="middle" transform="rotate(-90 14 86)" fill="currentColor">Crop yield</text>`;
  s+=`<path d="M${pts.map(p=>p[0].toFixed(1)+" "+p[1].toFixed(1)).join("L")}" stroke="var(--accent)" stroke-width="3" fill="none"/>`;
  s+=BI_T(70,128,"big gain per unit",{a:"start",s:10,i:1})+BI_T(300,56,"extra fertiliser gives little gain",{s:10,i:1})+BI_T(300,68,"and may pollute water",{s:10,i:1});
  return BI_FG("0 0 420 186",s,"Adding fertiliser raises yield only until another factor, such as water or light, becomes limiting. Beyond that point the extra fertiliser is wasted and runs off into water.","Graph of crop yield rising steeply then levelling off as more fertiliser is added",520)};

/* deforestation effects */
FIGS.BI_DEFOR=()=>{
  let s=BI_BOX(140,86,140,44,["Deforestation","trees cut or burnt"],{s:11,b:1,f:"var(--bad)"});
  const B=[[6,6,"Less biodiversity","species lost, extinction"],[214,6,"Soil loss","roots no longer hold soil"],[6,150,"Flooding","less water taken up and held"],[214,150,"More CO~2~ in air","less photosynthesis, burning"]];
  B.forEach((b,i)=>{s+=BI_BOX(b[0],b[1],200,50,[b[2].replace("~2~","<tspan dy=\"3\" font-size=\"8\">2</tspan><tspan dy=\"-3\">")+(b[2].includes("~")?"</tspan>":""),b[3]],{s:10.5,b:1});});
  s+=BI_ARR(176,86,106,58,"currentColor",1.6)+BI_ARR(244,86,314,58,"currentColor",1.6)+BI_ARR(176,130,106,150,"currentColor",1.6)+BI_ARR(244,130,314,150,"currentColor",1.6);
  return BI_FG("0 0 420 210",s,"Removing forest has several linked effects. Fewer trees means less habitat, less soil protection and less carbon dioxide taken from the air.","Deforestation at the centre with four effects: less biodiversity, soil loss, flooding and more carbon dioxide",520)};

/* eutrophication chain */
FIGS.BI_EUTRO=()=>{
  const st=[["1. Fertiliser or","sewage runs into water"],["2. More nitrate and","other ions in the water"],["3. Producers (algae)","grow very quickly"],["4. Producers die:","more dead material"],["5. Decomposers respire","aerobically, use oxygen"],["6. Dissolved oxygen","falls: fish and others die"]].map(r=>r.map(t=>t.replace("O~2~","oxygen")));
  let s="";st.forEach((r,i)=>{const row=i<3?0:1,col=i<3?i:2-(i-3),x=6+col*140,y=10+row*74;
    s+=BI_BOX(x,y,128,50,r,{s:10,b:1,f:i===5?"var(--bad)":i===2?"var(--accent)":null});
    if(i<2)s+=BI_ARR(x+130,y+25,x+140,y+25);if(i>2&&i<5)s+=BI_ARR(x-2,y+25,x-12,y+25)});
  s+=BI_ARR(350,62,350,82,"currentColor",1.8);
  return BI_FG("0 0 420 140",s,"Eutrophication. The key idea is that the oxygen is used up by the decomposers, not by the fertiliser itself.","Six step chain of eutrophication from fertiliser runoff to fish deaths")};

/* enhanced greenhouse effect */
FIGS.BI_GHE=()=>{
  let s=`<rect x="0" y="150" width="420" height="30" style="fill:var(--accent)" fill-opacity=".35"/>`+BI_T(210,170,"Earth's surface",{s:11,b:1});
  s+=`<rect x="0" y="50" width="420" height="22" style="fill:var(--blu)" fill-opacity=".2"/>`+BI_T(290,65,"greenhouse gases: carbon dioxide, methane",{s:10.5,b:1});
  s+=`<circle cx="30" cy="22" r="15" style="fill:var(--amber)" fill-opacity=".9"/>`;
  s+=BI_ARR(48,32,100,148,"var(--amber)",2.2)+BI_T(112,100,"sunlight arrives",{a:"start",s:10,b:1});
  s+=BI_ARR(230,148,230,74,"var(--bad)",2)+BI_T(224,124,"heat leaves Earth",{a:"end",s:10});
  s+=BI_ARR(230,48,230,6,"var(--bad)",1.6)+BI_T(236,22,"some escapes to space",{a:"start",s:10});
  s+=BI_ARR(330,74,330,146,"var(--bad)",2.4)+BI_T(336,106,"heat trapped and",{a:"start",s:10,b:1})+BI_T(336,118,"sent back: warming",{a:"start",s:10,b:1});
  return BI_FG("0 0 420 186",s,"Greenhouse gases absorb some of the heat leaving the Earth and send it back down. More carbon dioxide and methane means more heat is trapped: the enhanced greenhouse effect.","Diagram of sunlight reaching the Earth and heat being trapped by a layer of greenhouse gases",520)};

/* sustainable and unsustainable fishing */
FIGS.BI_FISH=()=>{
  const x0=48,y0=150;
  let s=`<path d="M${x0} 14V${y0}H392" stroke="currentColor" fill="none" stroke-width="1.6"/>`+BI_T(x0+170,y0+30,"Time (years)",{s:11,b:1})+`<text x="14" y="86" font-size="11" font-weight="700" text-anchor="middle" transform="rotate(-90 14 86)" fill="currentColor">Fish stock</text>`;
  let a=[],b=[];for(let i=0;i<=30;i++){const t=i/30,x=x0+t*330;a.push([x,50+Math.sin(t*14)*5]);b.push([x,50+Math.pow(t,1.5)*92-Math.sin(t*12)*3])}
  s+=`<path d="M${a.map(p=>p[0].toFixed(1)+" "+p[1].toFixed(1)).join("L")}" stroke="var(--good)" stroke-width="3" fill="none"/>`+`<path d="M${b.map(p=>p[0].toFixed(1)+" "+p[1].toFixed(1)).join("L")}" stroke="var(--bad)" stroke-width="3" fill="none"/>`;
  s+=BI_T(250,38,"quotas, closed seasons, mesh size: stock stays steady",{s:10,b:1,c:"var(--good)"})+BI_T(230,142,"overfishing: stock collapses",{s:10,b:1,c:"var(--bad)"});
  return BI_FG("0 0 420 186",s,"Fish are a renewable resource only if they are caught no faster than the population can replace them.","Graph comparing a steady fish stock under quotas with a collapsing stock under overfishing",520)};

/* reduced genetic variation risk */
FIGS.BI_RISK=()=>{
  const st=[["Habitat loss, hunting,","pollution, introduced species"],["Population size","falls a lot"],["Less genetic variation","in the survivors"],["Poorer chance of adapting","to disease or change"],["Higher risk of","extinction"]];
  let s="";st.forEach((r,i)=>{const y=6+i*42;s+=BI_BOX(60,y,300,28,r.length===2?[r[0]+" "+r[1]]:r,{s:10.5,b:1,f:i===4?"var(--bad)":null});if(i<4)s+=BI_ARR(210,y+29,210,y+41,"currentColor",1.8)});
  return BI_FG("0 0 420 212",s,"A small population has fewer different alleles. If a new disease or a change in climate arrives, there may be no individuals able to survive it.","Chain from threats to small population to low genetic variation to extinction risk",520)};

/* Original diagrams from the supplied revision notes replace redrawn versions */
FIGS.BI_ENERGY=()=>BIF("b19_f01","Energy flows from the Sun to the grass, the mouse and the owl, with a transfer at each step.","Sun, grass, mouse and owl food chain with energy transfer arrows");
FIGS.BI_WEB=()=>BIF("b19_f02","A food web shows the interdependence of organisms.","Food web linking grass, earthworm, caterpillar, rabbit, mouse, frog, sparrow, fox and hawk");
FIGS.BI_PYR1=()=>BIF("b19_f04","A pyramid of numbers: one owl, some voles, lots of grass plants.","Pyramid of numbers with grass at the base, voles and one owl");
FIGS.BI_PYR2=()=>BIF("b19_f05","Pyramids of numbers are not always pyramid-shaped: one oak tree supports many insects.","Pyramid of numbers with a very narrow base for one oak tree");
FIGS.BI_PYR3=()=>BIF("b19_f06","A pyramid of biomass narrows at every level: clover, snail, thrush, sparrowhawk.","Pyramid of biomass for clover, snail, thrush and sparrowhawk");
FIGS.BI_CHAIN2=()=>BIF("b19_f03","A food chain shows the transfer of energy: grass, mouse, owl.","Grass to mouse to owl food chain with energy arrows");
FIGS.BI_ELOSS=()=>BIF("b19_f07","About 10% of the energy at one level is available to the next. The rest is lost as heat and in undigested materials.","Producer to tertiary consumer arrows with 90 percent of energy lost at each step");
FIGS.BI_EPYR=()=>BIF("b19_f08","A pyramid of energy: 1 000 000 J of sunlight gives 10 000 J in producers, 1 000 J, 100 J and 10 J.","Pyramid of energy with values from producers to tertiary consumers");
FIGS.BI_CARBON=()=>BIF("b19_f09","The carbon cycle.","Carbon cycle showing photosynthesis, respiration, feeding, decomposition, fossilisation and combustion");
FIGS.BI_NITRO=()=>BIF("b19_f10","The nitrogen cycle involves nitrogen fixation, decomposition, nitrification and denitrification.","Nitrogen cycle with fixation, nitrification, denitrification and uptake by plants");
FIGS.BI_SIGMOID=()=>BIF("b19_f11","A typical growth curve for a population in an enclosed environment: lag, exponential, stationary and death phases.","Sigmoid population growth curve with four phases");
FIGS.BI_YIELD=()=>BIF("b20_f01","Modern agricultural processes allow much larger areas of land to be cultivated for crop plants.","Agriculture with machines, drones, soil sensors and water management");
FIGS.BI_PALM=()=>BIF("b20_f02","Palm oil is often grown in a monoculture. Production has increased rapidly over the last 30 years.","Line graph of palm oil production for Indonesia, Malaysia and the rest of the world from 1991 to 2018");
FIGS.BI_EUTRO=()=>BIF("b20_f03","Sequence of events causing eutrophication in lakes and rivers.","Eutrophication sequence from fertiliser run-off to algal bloom, decomposers and death of fish");
FIGS.BI_GHE=()=>BIF("b20_f04","The natural and the enhanced greenhouse effect.","Earth with natural and enhanced greenhouse effect side by side");
FIGS.BI_FOREST=()=>BIF("b20_f05","Managing forests sustainably: only old trees are cut, new trees are planted, and the forest is monitored.","Sustainable forestry with replanting, monitoring and guided tourists");
FIGS.BI_FISH=()=>BIF("b20_f06","Ways of controlling fishing to make it more sustainable.","Fishing controls including quotas, mesh sizes, sonar limits and outlawed gillnets");

/* ================= TOPIC 19 ================= */
const BI_L191=L("Energy flow, food chains, food webs and pyramids","How energy enters and passes through ecosystems, how to read food chains and webs, and how pyramids show the loss of energy.",
`<h4>The Sun and the flow of energy</h4>
<p>The <b>Sun is the principal source of energy</b> for nearly all living things. Producers capture a small part of the light that reaches them and use it in photosynthesis. The energy is then stored in the plant as <b>chemical energy</b> in glucose, starch, fats and proteins.</p>
<p>When an animal eats a plant, some of that chemical energy passes into the animal. When a second animal eats the first, some passes on again. At every stage organisms use energy for movement, growth, keeping warm and making new cells, and in doing so they <b>release heat</b>. That heat leaves the organisms and ends up in the environment.</p>
{{BI_ENERGY}}
<div class="key"><b>Exam tip</b>Energy <b>flows</b> one way through an ecosystem: Sun, producers, consumers, environment. It is not recycled. Nutrients such as carbon and nitrogen are recycled instead.</div>
<h4>Food chains and trophic levels</h4>
<p>A <b>food chain</b> shows the transfer of energy from one organism to the next, starting with a <b>producer</b>. The source of all energy in a food chain is <b>light energy from the Sun</b>. The <b>arrows</b> show the transfer of energy from one trophic level to the next, and energy is passed on from one organism to another by <b>ingestion</b> (eating).</p>
<table><tr><th>Term</th><th>Definition</th><th>Example</th></tr>
<tr><td>Producer</td><td>Organism that produces its own organic nutrients, usually using energy from sunlight. Plants are producers because they carry out photosynthesis to make glucose</td><td>Grass</td></tr>
<tr><td>Consumer</td><td>Organism that gets its energy by feeding on other organisms. Consumers are classed as primary, secondary, tertiary and quaternary according to their position in a food chain</td><td>Mouse, barn owl</td></tr>
<tr><td>Herbivore</td><td>Animal that gets its energy by eating plants</td><td>Rabbit</td></tr>
<tr><td>Carnivore</td><td>Animal that gets its energy by eating other animals</td><td>Fox</td></tr>
<tr><td>Decomposer</td><td>Organism that gets its energy from dead or waste organic material</td><td>Fungi, many bacteria</td></tr></table>
<p>A <b>trophic level</b> is the position of an organism in a food chain, food web or pyramid. Producers are the first level, then <b>primary consumers</b>, <b>secondary consumers</b>, <b>tertiary consumers</b> and <b>quaternary consumers</b>.</p>
<p><b>In the food chain grass → mouse → barn owl:</b></p>
<table><tr><th>Position in food chain</th><th>Organism</th><th>Explanation</th></tr>
<tr><td>Producer</td><td>Grass</td><td>Makes its own food using energy from sunlight in photosynthesis</td></tr>
<tr><td>Primary consumer</td><td>Mouse</td><td>Eats the producer</td></tr>
<tr><td>Secondary consumer</td><td>Barn owl</td><td>Eats the primary consumer</td></tr></table>
<div class="ex"><b>Worked example</b>grass → grasshopper → frog → snake → hawk<br>Grass is the producer. Grasshopper is the primary consumer, frog the secondary consumer, snake the tertiary consumer and hawk the quaternary consumer. The grasshopper is a herbivore; the frog, snake and hawk are carnivores.</div>
<h4>Food webs</h4>
<p>A <b>food web</b> is a network of interconnected food chains. Food webs are a <b>more realistic</b> way of showing the connections between organisms in an ecosystem, because animals rarely live on just one type of food. They give more information about the transfer of energy within the ecosystem.</p>
{{BI_WEB}}
<p><b>Example from the food web above: if the population of earthworms decreased</b></p>
<ul><li>the population of <b>grass plants would increase</b>, as there are fewer species feeding on them;</li><li>the populations of <b>frogs and mice would decrease significantly</b>, as earthworms are their only food source;</li><li>the population of <b>sparrows would decrease slightly</b>, as they eat earthworms but also have another food source to rely on (caterpillars).</li></ul>
<p>Most changes in populations of animals and plants happen as a result of <b>human impact</b>: either by <b>overharvesting</b> of food species (taking a food species faster than it can reproduce) or by the <b>introduction of foreign species</b> to a habitat, for example cane toads in Australia. Because organisms are interdependent, these changes can have <b>long-lasting knock-on effects</b> on organisms throughout a food chain or web.</p>
<div class="key"><b>Examiner tip</b>Questions about interdependence in food webs are common and easy to gain marks on if you answer them fully. Do not say an animal or plant would "die out", as this is unlikely. Use the words <b>increase</b> or <b>decrease</b> and always give your reason for the change in population.</div>
<h4>Pyramids of numbers</h4>
<p>A <b>pyramid of numbers</b> shows how many organisms are present at each level of a food chain. The <b>width of the box</b> shows the number of organisms at that trophic level. For the food chain grass → mouse → barn owl:</p>
{{BI_CHAIN2}}
{{BI_PYR1}}
<p>A pyramid of numbers does not always have to be pyramid-shaped, because the <b>size of the organism</b> is also important. One large organism, like the oak tree below, contains enough energy to support many smaller organisms.</p>
{{BI_PYR2}}
<p><b>Rules to remember when drawing a pyramid of numbers</b></p>
<ul><li>The trophic levels <b>cannot be changed</b>: they must stay in the same order as in the food chain, with producers on the bottom, then primary consumers, secondary consumers, tertiary consumers.</li><li>Each bar should be <b>labelled</b> with its trophic level.</li><li>If graph paper is provided, the pyramid should be <b>drawn to scale</b>.</li><li>Generally, the larger an individual organism is, the fewer individuals there will be.</li></ul>
<h4>Pyramids of biomass</h4>
<p>A <b>pyramid of biomass</b> shows how much living matter is present at each trophic level. Biomass is often measured as the <b>dry mass</b> of an organism, once the water has been removed from the tissues. Pyramids of biomass are <b>always pyramid-shaped</b>, whatever the pyramid of numbers looks like, because the mass of organisms decreases as you go up a food chain.</p>
{{BI_PYR3}}
<p>It can be better to use a pyramid of biomass than a pyramid of numbers because:</p>
<ul><li>it takes into account the <b>size of the organisms</b> at each level, so it gives a more accurate picture of the living matter in an ecosystem;</li><li><b>energy is stored in biomass</b>, so biomass is an approximate representation of the energy available at each level.</li></ul>
<div class="key"><b>Examiner tip</b>Pyramids of numbers can be any shape, so learn the rules for drawing them, as unusual shapes are common in the exam. Pyramids of biomass are generally pyramid-shaped and simpler to sketch. Some ecosystems, such as aquatic ones, may show an inverted pyramid, but this is very unlikely in an exam.</div>
<h4>Pyramids of energy (Extended)</h4>
<p>The transfer of stored energy in food chains is <b>not efficient</b>, and energy is lost to the environment between each trophic level. Not all of the stored energy consumed by an organism goes into making new tissue that can be eaten. Energy is instead lost through:</p>
<ul><li><b>excretion</b> of metabolic waste, for example urine, which is removed from the organism;</li><li><b>movement</b>;</li><li><b>heat</b> released in respiration.</li></ul>
<p>Few organisms eat or digest an entire organism, so energy stored in the uneaten or undigested parts is not passed on:</p>
<ul><li>energy in <b>uneaten parts</b>, such as the roots of plants or the bones of animals, does not enter the consumer's body at all;</li><li><b>undigested waste (faeces)</b> is removed from the body and provides food for decomposers.</li></ul>
<p>Only around <b>10%</b> of the energy stored at each trophic level is available to the next. This inefficient transfer explains why <b>food chains are rarely more than five organisms long</b>: the final consumer would have to eat a huge number of organisms in the levels below it to get the energy it needs, which is unlikely to be possible.</p>
{{BI_ELOSS}}
<p>The energy stored at each trophic level can be shown in a <b>pyramid of energy</b>.</p>
{{BI_EPYR}}
<p>Pyramids of energy can have advantages over pyramids of biomass because they <b>highlight the energy lost</b> at each trophic level, and because different organisms may not store the same amount of energy in their biomass, so pyramids of energy allow <b>more accurate comparisons</b>.</p>
<div class="ex"><b>Worked example</b>A herbivore gains 12 000 kJ of energy from plants. A carnivore that eats it gains 1 200 kJ.<br>Efficiency = energy transferred ÷ energy available × 100 = 1 200 ÷ 12 000 × 100 = <b>10%</b>.</div>
<h4>Energy transfer in a human food chain (Extended)</h4>
<p>Humans are <b>omnivores</b>, obtaining energy from both plants and animals, which gives a choice of what to eat. These choices affect how land is used and what is grown. Compare two food chains involving humans:</p>
<p style="text-align:center"><b>wheat → cow → human</b> &nbsp;&nbsp; <b>wheat → human</b></p>
<p>If humans eat the wheat, much more energy is available to them than if they eat the cows that eat the wheat. Energy transfer between levels is not efficient, so <b>the greater the number of trophic levels, the greater the energy loss</b> between the producer and the final consumer. More energy is lost between the wheat and the human in the chain with the cow. Therefore it is <b>more energy efficient for humans to be herbivores rather than carnivores</b>.</p>
<p>In reality the situation is more complex: animals are often fed on plants humans cannot eat (for example grass) or that are too widely spread for humans to collect (for example algae in the ocean, which feed the fish that humans eat).</p>
<div class="key"><b>Examiner tip</b>Read the question carefully and tailor your answer to the organism asked about. For example, plants do not produce urine or faeces, so you could not give these as ways in which plants transfer energy to the environment.</div>`,
I("If one species disappeared from a food web, who would notice first, and who would be affected most?",
`<ol><li>Write down a food chain that you think exists in your school grounds or in a nearby pond, with at least four organisms.</li><li>Predict what would happen to every organism in your chain if the second organism disappeared.</li><li>Draw your prediction using arrows. Decide which organisms would increase and which would decrease.</li><li>Write one question you would need to answer to check your prediction, for example "Does the predator have any other food?".</li></ol>`,
`<p><b>Build a food web with wool.</b> Give each student in a group an organism card from one habitat (for example a pond: algae, water plants, snail, tadpole, small fish, heron, dragonfly larva). Stand in a circle. Pass a ball of wool from each organism to the organism that eats it, holding the wool tight. You now have a web.</p><p>The teacher removes one organism. Everyone who feels a tug has been affected. Record who was affected and say whether their population would rise or fall.</p><p><b>Pyramid of numbers.</b> In a playground or field, count the plants in a 1 m² quadrat and the small animals you find in it. Draw a pyramid of numbers and then explain why a pyramid of biomass would be a better picture.</p>`),
[["Describe how energy passes through a food chain, starting at the Sun.","The Sun provides light energy (1). Producers use it in photosynthesis and store it as chemical energy (1). The energy passes to consumers when they feed (1). At each stage energy is lost as heat to the environment (1).",4],
["The food chain is: grass → locust → lizard → hawk. Name the producer and the secondary consumer.","Producer: grass (1). Secondary consumer: lizard (1).",2],
["State the difference between a food chain and a food web.","A chain shows one path of energy transfer (1). A web is a network of interconnected food chains (1).",2],
["Explain why a pyramid of biomass is more useful than a pyramid of numbers.","Numbers ignore the size of organisms (1), so the shape can be odd, for example one tree with many insects (1). Biomass compares the mass at each level so the shape is more reliable (1).",3],
["Explain, in terms of energy loss, why food chains rarely have more than five trophic levels. (Extended)","Only about 10% of energy passes to the next level (1). Energy is lost as heat from respiration, in faeces, in waste and in parts not eaten (1). Very little energy is left to support another level after four or five (1).",3]],
[M("What is the principal source of energy for ecosystems?",["Plants","The Sun","Decomposers","Soil"],1,"Light from the Sun is captured by producers."),
M("What does an arrow in a food chain mean?",["Eats","Is eaten by","Lives with","Competes with"],1,"Arrows point in the direction of energy transfer, so they mean is eaten by."),
M("In the chain plant → insect → frog → snake, which is the tertiary consumer?",["Insect","Frog","Snake","Plant"],2,"Insect is primary, frog secondary, snake tertiary."),
T("Name the group of organisms that gets energy from dead or waste material.",["decomposer"],"Decomposers such as fungi and bacteria."),
M("Which is always pyramid-shaped?",["Pyramid of numbers","Pyramid of biomass","Pyramid of energy","None of them"],2,"Energy is lost at each transfer so the pyramid of energy always narrows."),
N("A primary consumer has 8000 kJ of energy available. A secondary consumer gains 800 kJ. What is the percentage transfer?",10,"%","800 ÷ 8000 × 100 = 10%.",0.1),
M("Which is a reason for energy loss between trophic levels?",["Photosynthesis","Respiration","Digestion in plants","Nitrogen fixation"],1,"Respiration releases heat."),
M("Why is it more energy efficient for humans to eat crops than livestock?",["Crops are bigger","Fewer energy-losing steps","Livestock have no energy","Crops contain no water"],1,"Eating the crop removes one trophic level where energy would be lost.")],
[["Producer","Organism that makes its own organic nutrients, usually by photosynthesis."],
["Consumer","Organism that gets energy by feeding on other organisms."],
["Decomposer","Gets energy from dead or waste organic material."],
["Food chain","Shows the transfer of energy from one organism to the next, starting with a producer."],
["Food web","Network of interconnected food chains."],
["Trophic level","Position of an organism in a food chain, web or pyramid."],
["Why pyramids of energy narrow (Extended)","Energy is lost as heat, in waste and in uneaten parts at each transfer."],
["Why chains have few levels (Extended)","Too little energy is left after four or five transfers."],
["Energy and eating crops (Extended)","Eating crops directly loses less energy than eating livestock fed on them."]]);

const BI_L192=L("The carbon and nitrogen cycles","How carbon and nitrogen are recycled between the air, soil and living things.",
`<h4>Why nutrients must be recycled</h4>
<p>Energy flows through an ecosystem, but nutrients such as carbon and nitrogen are <b>not endless resources</b>. There is a <b>finite amount</b> of each element on the planet, so they must be <b>recycled</b> to allow new organisms to be made and to grow.</p>
<h4>The carbon cycle</h4>
<ul><li>Carbon is taken out of the atmosphere as <b>carbon dioxide</b> by plants, to be used in <b>photosynthesis</b>.</li><li>It is passed on to animals (and microorganisms) by <b>feeding</b>.</li><li>It is returned to the atmosphere as carbon dioxide by plants, animals and microorganisms as a result of <b>respiration</b>. When organisms die or produce waste, decomposers feed on the material and release carbon dioxide by respiration.</li><li>If animals and plants die in conditions where decomposing microorganisms are not present, the carbon in their bodies can be converted, over <b>millions of years and under significant pressure</b>, into <b>fossil fuels</b>.</li><li>When fossil fuels are burned (<b>combustion</b>), the carbon combines with oxygen and carbon dioxide is released into the atmosphere.</li></ul>
{{BI_CARBON}}
<p><b>Human impact.</b> Increased use of fossil fuels is contributing to an increase in the carbon dioxide content of the atmosphere. In addition, mass <b>deforestation</b> is reducing the number of producers available to take carbon dioxide out of the atmosphere by photosynthesis. The problem is made worse because in many parts of the world forests are cleared for the <b>land</b> rather than for the trees, and the trees are <b>burnt down</b>, releasing even more carbon dioxide. This is linked to climate change and is explored in Topic 20.</p>
<div class="key"><b>Examiner tip</b>The main points of the carbon cycle are straightforward: carbon is taken out of the atmosphere by <b>photosynthesis</b>; passed on to animals and decomposers by <b>feeding</b>; returned by <b>respiration</b> in plants, animals and decomposing microorganisms; and also returned, in increasing amounts, by <b>combustion</b> of fossil fuels. You should be able to identify what each arrow represents in any diagram of the carbon cycle. Plants both remove CO~2~ (photosynthesis) and release it (respiration).</div>
<h4>The nitrogen cycle (Extended)</h4>
<p>Nitrogen is needed to make <b>proteins</b>. Nitrogen gas (N~2~) makes up most of the air, but it cannot easily be broken down, so plants and animals cannot use it directly. Two ways in which nitrogen gas is converted into a usable form are:</p>
<ul><li><b>Nitrogen-fixing bacteria</b> convert nitrogen gas into <b>ammonium compounds</b>, which can then be converted to usable nitrates. These bacteria can be <b>free-living in the soil</b> or live in the <b>root nodules</b> of some plants (for example legumes).</li><li><b>Lightning</b> can split the bond between the two nitrogen atoms, turning them into nitrogen oxides (N~2~O and NO~2~) that <b>dissolve in rainwater</b> and leach into the soil.</li></ul>
<p>The rest of the cycle:</p>
<ul><li>Plants absorb nitrogen from the soil as <b>nitrates</b> and use it to build <b>proteins</b>.</li><li>Animals eat the plants and get the nitrogen they need from plant proteins. It is passed up the food chain when secondary consumers eat primary consumers.</li><li><b>Waste</b> (urine and faeces) sends nitrogen back into the soil as ammonium compounds. For example, the <b>urea</b> in urine contains nitrogen. (Urea is made in the liver by deamination of excess amino acids.)</li><li>The bodies of dead plants and animals decay and the proteins in them are broken down into <b>ammonium compounds by decomposers</b>.</li><li>Plants cannot absorb ammonium compounds, so <b>nitrifying bacteria</b> convert them to <b>nitrites and then to nitrates</b>, which plants can absorb. The cycle goes on.</li><li><b>Denitrifying bacteria</b> take nitrates out of the soil and convert them back into nitrogen gas. This <b>reduces soil fertility</b> and is bad for plant growth.</li></ul>
{{BI_NITRO}}
<div class="key"><b>Exam tip</b>Denitrifying bacteria are <b>anaerobic</b>, so aerating the soil, for example by reducing waterlogging and turning over the soil when ploughing, reduces the rate of denitrification.</div>
<h4>Roles of microorganisms (Extended)</h4>
<table><tr><th>Process</th><th>Role of the microorganisms</th></tr>
<tr><td>Decomposition</td><td>Break down proteins in dead material and waste into ammonium compounds</td></tr>
<tr><td>Nitrification</td><td>Convert ammonium compounds to nitrites and then nitrates</td></tr>
<tr><td>Nitrogen fixation</td><td>Convert nitrogen gas to ammonium compounds that can become nitrates</td></tr>
<tr><td>Denitrification</td><td>Convert nitrates to nitrogen gas, reducing soil fertility</td></tr></table>`,
I("Where does the carbon in your body come from, and where will it go?",
`<ol><li>Choose one carbon atom in a glucose molecule in a bowl of rice you ate today.</li><li>Trace a possible path for that atom back to the air, using the words photosynthesis, feeding and respiration.</li><li>Then trace the path forwards: where might it go after it leaves your body in your breath or waste?</li><li>Compare your path with a partner's. Find one stage that was different and say why both paths could be correct.</li></ol>`,
`<p><b>Carbon cycle game.</b> Set up stations around the room labelled air, plant, animal, dead material, fossil fuels. At each station place a die with the possible next steps written on its faces (for example at "plant": photosynthesis stays in plant, eaten by animal, dies, respiration to air). Each student starts at air as a carbon atom, rolls at each station and records the process that moves them. After 10 moves, plot the paths and count how many times each process occurred.</p><p><b>Respiration of soil organisms.</b> Place equal masses of moist soil in two sealed jars, with a small beaker of limewater in each. Sterilise one by heating. Leave for two days and compare the limewater. Explain the result using decomposers and carbon dioxide.</p>`),
[["Name the process that removes carbon dioxide from the air and the process that returns it.","Photosynthesis removes it (1). Respiration (accept combustion or decomposition) returns it (1).",2],
["Describe how carbon from a dead plant could return to the air.","Decomposers feed on the dead plant (1). They respire and release carbon dioxide (1).",2],
["Explain how the burning of fossil fuels affects the carbon cycle.","Fossil fuels contain carbon stored for millions of years (1). Combustion releases it as carbon dioxide (1). This adds carbon dioxide to the air faster than it is removed (1).",3],
["State two ways in which nitrogen gas can be fixed. (Extended)","Lightning (1) and nitrogen-fixing bacteria (1).",2],
["Describe the roles of nitrifying and denitrifying bacteria. (Extended)","Nitrifying bacteria change ammonium ions to nitrate ions (1). Denitrifying bacteria change nitrate ions to nitrogen gas (1).",2]],
[M("Which process removes carbon dioxide from the air?",["Respiration","Combustion","Photosynthesis","Decomposition"],2,"Photosynthesis uses carbon dioxide."),
M("Which organisms release carbon dioxide when dead material decays?",["Producers","Decomposers","Herbivores only","Viruses"],1,"Decomposers respire."),
M("How are fossil fuels formed?",["By lightning","From dead organisms buried over millions of years","By photosynthesis in the soil","By nitrification"],1,"They form from dead organisms that were buried and not fully decomposed."),
T("Name the process that releases stored carbon from coal or oil as carbon dioxide.",["combustion","burning"],"Combustion."),
M("In which form do plants absorb nitrogen? (Extended)",["Nitrogen gas","Ammonia gas","Nitrate ions","Urea"],2,"Plants absorb nitrate ions from the soil."),
M("What is deamination? (Extended)",["Making amino acids","Breaking down excess amino acids to make urea","Absorbing nitrates","Fixing nitrogen"],1,"The liver removes the nitrogen part of excess amino acids and makes urea."),
M("Which process converts ammonium ions to nitrate ions? (Extended)",["Denitrification","Nitrogen fixation","Nitrification","Deamination"],2,"Nitrification by nitrifying bacteria."),
T("Name the process by which bacteria change nitrates to nitrogen gas. (Extended)",["denitrification"],"Denitrification.")],
[["Carbon cycle: removal of CO~2~","Photosynthesis."],
["Carbon cycle: return of CO~2~","Respiration, decomposition and combustion."],
["How are fossil fuels formed?","Dead organisms buried and not fully decomposed over millions of years."],
["Nitrogen fixation (Extended)","Nitrogen gas converted to usable compounds by lightning or bacteria."],
["Nitrification (Extended)","Ammonium ions converted to nitrate ions by bacteria."],
["Denitrification (Extended)","Nitrate ions converted to nitrogen gas by bacteria."],
["Deamination (Extended)","Liver breaks down excess amino acids and makes urea."],
["Why plants need nitrate (Extended)","To make amino acids and proteins."]]);

const BI_L193=L("Populations, communities and ecosystems","Key ecology terms, what controls population growth, the sigmoid growth curve and how to estimate a population with quadrats.",
`<h4>Population, community and ecosystem</h4>
<ul><li>A <b>population</b> is a group of organisms of <b>one species</b>, living in the <b>same area</b> at the <b>same time</b>.</li><li>A <b>community</b> is <b>all of the populations</b> of different species living in an ecosystem.</li><li>An <b>ecosystem</b> is a unit that contains the community of organisms <b>and their environment</b>, interacting together.</li></ul>
<div class="ex"><b>Worked example</b>In a pond: all the frogs form a population. Frogs, fish, snails, algae and bacteria together are the community. The community plus the water, light, temperature and dissolved gases make the ecosystem.</div>
<h4>Population growth</h4>
<p>All living organisms <b>compete</b> with each other for food, water and living space. Those that are best adapted to their environment generally increase their populations at the expense of those less well adapted. Population growth in most organisms is controlled by three factors:</p>
<table><tr><th>Factor</th><th>Effect on the population</th></tr>
<tr><td>Food supply</td><td>More food allows more survival and breeding. A shortage slows growth</td></tr>
<tr><td>Predation</td><td>Predators reduce prey numbers. Predator numbers rise when prey is plentiful</td></tr>
<tr><td>Disease</td><td>Spreads faster in crowded populations and kills individuals</td></tr></table>
<p>Competition for food, water and space is what links these factors: the more crowded a population becomes, the stronger the competition.</p>
<h4>The population growth curve (Extended)</h4>
<p>If the growth of microorganisms in a fermenter is measured over time, the population growth looks like a curve shaped a little like an "S". It is called a <b>sigmoid growth curve</b> and has four distinct phases.</p>
{{BI_SIGMOID}}
<ul><li><b>Lag phase:</b> organisms are adapting to the environment before they can reproduce. There are also very few organisms, so reproduction does not produce large numbers of offspring.</li><li><b>Log (exponential) phase:</b> food supply is abundant, the birth rate is rapid and the death rate is low. Growth is exponential and is limited only by the number of new individuals that can be produced.</li><li><b>Stationary phase:</b> the population levels out because a factor in the environment, such as a nutrient, becomes limited as it is not being replenished. The birth rate and death rate are equal and stay so until the nutrient is replenished or becomes severely limited.</li><li><b>Death phase:</b> the population decreases because the death rate is now greater than the birth rate. This is usually because food supply is short, or because metabolic wastes produced by the population have built up to toxic levels.</li></ul>
<div class="key"><b>Exam tip</b>When you describe a graph, name the phase, say what the line is doing, and use numbers from the axes if the question gives them. Explain each phase in terms of birth rate and death rate.</div>
<p>Organisms in a <b>natural environment</b> are unlikely to follow a sigmoid curve exactly, because they are affected by many other factors, including changing <b>temperature or light</b>, <b>disease</b>, <b>immigration</b> (individuals moving into the area) and <b>emigration</b> (individuals moving out of the area).</p>
<h4>Estimating a population with quadrats</h4>
<p>It is usually impossible to count every organism, so we <b>sample</b>. A <b>quadrat</b> is a square frame of known area, usually 1 m². For plants or slow-moving animals:</p>
<ol><li>Place the quadrat at <b>random positions</b>, for example using random coordinates from a measuring tape, so the sample is not biased.</li><li>Count the organisms in the quadrat. Repeat many times.</li><li>Find the <b>mean number per quadrat</b>.</li><li>Estimated population = mean per quadrat × (total area ÷ area of one quadrat).</li></ol>
{{BI_QUAD}}
<p>The more quadrats you use, the more reliable the estimate. Counting in different habitats or at different distances from a feature, such as along a path, lets you compare how a factor affects distribution.</p>`,
I("Why do populations not grow forever?",
`<ol><li>Imagine one pair of rabbits placed on an island with plenty of grass and no predators. Predict how their numbers will change over 20 years and sketch a graph.</li><li>List the things that might slow the growth. Which would act first?</li><li>Compare your graph with a partner's and agree names for each part.</li><li>Write one sentence for each part explaining the cause using births, deaths and limiting factors.</li></ol>`,
`<p><b>Yeast population.</b> Mix a small amount of yeast with sugar solution in a flask at about 30 °C. Every 10 minutes take a drop and count the yeast cells in a set area using a microscope slide with a grid. Plot cell count against time. Identify the phases.</p><p><b>Quadrat survey.</b> Choose a lawn or field. Use random coordinates from a random-number table to place 10 quadrats. Count a plant such as daisies in each. Calculate the mean per quadrat and the estimated population of the whole area. Repeat with 20 quadrats and discuss how the estimate changed.</p>`),
[["Define the term population.","A group of organisms of one species (1), living in the same area at the same time (1).",2],
["State two factors that limit the growth of a population.","Any two from: food supply, competition, predation, disease (2).",2],
["Name the phases A, B and C in a sigmoid growth curve in which A is slow growth, B is rapid growth and C is levelling off.","A lag (1), B exponential or log (1), C stationary (1).",3],
["Explain why the population stops growing in the stationary phase. (Extended)","A limiting factor such as food or space becomes scarce (1). Births are equal to deaths (1). Competition, predation or disease increase (1).",3],
["A student places eight 1 m² quadrats and counts 6, 4, 8, 5, 7, 6, 4 and 8 plants. The area of the field is 500 m². Calculate the estimated population.","Total = 48 (1). Mean = 6 (1). 6 × 500 = 3000 (1).",3]],
[M("What is a community?",["All the organisms of one species in an area","All the populations in an ecosystem","The living and non-living parts of an area","A group of animals"],1,"A community is all the populations of different species in an ecosystem."),
M("Which factor does NOT affect the growth rate of a population?",["Predation","Disease","Food supply","Colour of the soil"],3,"Food supply, competition, predation and disease are the four factors."),
M("Which phase of the sigmoid curve has the fastest increase?",["Lag","Exponential","Stationary","Death"],1,"The exponential or log phase."),
M("In the stationary phase, births are...",["Much greater than deaths","Equal to deaths","Zero","Less than deaths"],1,"The population size stays constant."),
N("A quadrat of area 1 m² has a mean of 12 plants. Estimate the population in an area of 150 m².",1800,"plants","12 × 150 = 1800.",1),
T("Name the type of factor, such as food supply, that restricts population growth.",["limiting factor","limiting"],"A limiting factor."),
M("Why are quadrats placed randomly?",["To save time","To avoid bias","To count fewer plants","To mark the area"],1,"Random placement gives a fair sample."),
M("Which best explains the lag phase? (Extended)",["Many predators","Few reproducing individuals","No food","Disease"],1,"A small number of individuals can produce only a few offspring.")],
[["Population","Group of one species living in the same area at the same time."],
["Community","All of the populations of different species in an ecosystem."],
["Ecosystem","Community of organisms and their environment interacting together."],
["Factors that control population growth","Food supply, predation and disease (organisms also compete for food, water and space)."],
["Phases of the sigmoid curve","Lag, exponential (log), stationary, death."],
["Limiting factor (Extended)","A factor in short supply that stops the population growing further."],
["Estimating population size","Mean per quadrat × total area ÷ quadrat area."],
["Why random quadrats?","To avoid bias in the sample."]]);

/* ================= TOPIC 20 ================= */
const BI_L201=L("Human food supply: farming and its effects","How humans increase food production and the advantages and disadvantages of monocultures and intensive livestock farming.",
`<h4>Intensive food production</h4>
<p>Making food production more <b>intensive</b> means producing food more efficiently from a <b>finite amount of land</b> and other resources. Modern technology has increased food supply substantially:</p>
<table><tr><th>Method</th><th>How it helps</th></tr>
<tr><td>Agricultural machinery</td><td>Has replaced human labour and improved efficiency, because much larger areas of land can be farmed</td></tr>
<tr><td>Chemical fertilisers</td><td>Improve yields by increasing the availability of soil nutrients, so plants grow larger and produce more fruit</td></tr>
<tr><td>Insecticides</td><td>Kill unwanted insects, so there is less damage to plants</td></tr>
<tr><td>Herbicides</td><td>Kill weeds, so there is reduced competition from other plant species</td></tr>
<tr><td>Selective breeding</td><td>Produces breeds of animal and crop varieties that reliably give high yields</td></tr></table>
{{BI_YIELD}}
<div class="key"><b>Exam tip</b>Name the method, then say what it does to the crop or animal. For example "herbicides kill weeds, so there is less competition for water and light" earns more than "herbicides help crops".</div>
<h4>Intensive livestock farming</h4>
<p>Intensive farming of livestock <b>increases energy efficiency</b> by reducing the energy inputs in relation to yield. It does this by:</p>
<ul><li>keeping livestock in a <b>small area</b>, so animals put less energy into movement and can use it for growth;</li><li>feeding animals on <b>high-energy foods</b>, so more energy is gained per unit of food digested;</li><li>regularly giving <b>medication such as antibiotics</b> as a preventative measure against disease;</li><li>keeping animals in <b>artificially warm</b> environments, so they use less energy regulating body temperature.</li></ul>
<table><tr><th>Advantages</th><th>Disadvantages</th></tr>
<tr><td>Less land is required to produce large amounts of food</td><td>Ethical issues: cruel treatment of animals in intensive farms</td></tr>
<tr><td>Food can be produced all year round in controlled environments</td><td>Natural habitats may be destroyed to maximise the land available for keeping livestock</td></tr>
<tr><td>The cost of production is lower, so food can be sold more cheaply</td><td>Ecological issues (see below)</td></tr></table>
<p><b>Ecological issues with intensive livestock farming:</b></p>
<ul><li><b>Reduced biodiversity</b> where large areas are used to graze cattle, because only grass is grown and in effect it becomes a monoculture;</li><li><b>overgrazing</b> can lead to <b>soil erosion</b>;</li><li>large numbers of cattle produce large amounts of <b>methane</b>, a greenhouse gas;</li><li>waste excreted by livestock can be <b>washed into waterways</b>, causing water pollution.</li></ul>
{{BI_FOODEFF}}
<p>Notice the link with Topic 19: feeding crops to livestock adds an extra trophic level, so less food energy reaches humans than if they ate the crops directly.</p>
<h4>Monocultures</h4>
<p><b>Monoculture</b> farming means that only one type of crop is grown on an area of farmland, for example trees for palm oil grown in the Indonesian rainforest.</p>
{{BI_PALM}}
<table><tr><th>Advantages</th><th>Disadvantages</th></tr>
<tr><td>Allows the use of <b>specialised machinery</b> for planting, weeding and harvesting, giving increased efficiency and reduced labour costs</td><td>Monocultures <b>reduce biodiversity</b>: only one variety of plant is grown, so it provides food for few herbivore species, which in turn cannot support more than a few predator species</td></tr>
<tr><td>Farmers can <b>optimise conditions</b> for that specific crop, giving higher yields</td><td><b>Pest populations increase</b>: farming a crop repeatedly over large areas gives an ample food supply for any pest that feeds on it</td></tr>
<tr><td></td><td>Spraying insecticides leads to <b>pollution by pesticides</b> and to <b>pesticide resistance</b>: where the same chemical is used repeatedly, pests may become resistant to it, reducing its effectiveness</td></tr></table>`,
I("Is it better to farm one crop on a huge field or many different crops on smaller fields?",
`<ol><li>Make two lists: the benefits to a farmer of growing a single crop, and the benefits of growing several crops.</li><li>List what each field type provides for wild animals and plants.</li><li>Choose which type of farm you would run and write two sentences justifying your choice with biological ideas.</li><li>Swap with a partner who chose the opposite and answer their strongest argument.</li></ol>`,
`<p><b>Fertiliser and plant growth.</b> Grow seedlings (for example cress or wheat) in pots with equal soil. Give each pot a different mass or concentration of fertiliser solution, including none. Keep light and water constant. After two weeks measure mean height and dry mass. Plot a graph. Decide where extra fertiliser stops giving extra growth.</p><p><b>Weed competition.</b> Sow two trays of lettuce seeds. In one, add weed seeds as well. Compare growth after two weeks and discuss how herbicides could improve yield.</p>`),
[["State two ways in which humans have increased crop yields.","Any two from: machinery, chemical fertilisers, insecticides, herbicides, selective breeding (2).",2],
["Describe how herbicides improve crop yield.","They kill weeds (1), which reduces competition for light, water and nutrients (1).",2],
["Give two disadvantages of growing crops in large monocultures.","Any two from: pests and disease spread quickly (1); loss of habitats and biodiversity (1); more fertiliser or pesticide needed (1); pollution of water by chemicals (1).",2],
["Describe two advantages of intensive livestock production.","Any two from: animals grow faster (1); less land is needed or lower cost (1); less energy lost in movement or keeping warm (1); more food produced (1).",2],
["Explain why more people could be fed from an area of land if they ate crops instead of livestock.","Energy is lost at each trophic level (1). Feeding crops to livestock adds an extra step (1) so less energy reaches humans (1).",3]],
[M("Which is a method of increasing food production?",["Deforestation only","Selective breeding","Burning crops","Using less land"],1,"Selective breeding is one of five methods in the syllabus."),
M("What do insecticides do?",["Kill weeds","Kill insect pests","Add nitrate","Cut down trees"],1,"They kill insects that damage crops."),
M("Which is a disadvantage of monoculture?",["Can use machines","Disease spreads quickly","Uniform crop","Cheaper to grow"],1,"A pathogen can spread fast through genetically similar plants in a large area."),
M("Which is a disadvantage of intensive livestock farming?",["Faster growth","Disease spreads easily","Less land needed","Cheaper food"],1,"Overcrowding helps disease to spread."),
T("Name the type of chemical used to kill weeds.",["herbicide"],"Herbicide."),
M("Why do fertilisers increase crop yields?",["They kill pests","They supply mineral ions for growth","They give light","They remove water"],1,"They supply nitrates and other mineral ions."),
M("Which statement about energy is correct?",["Eating crops loses more energy than eating livestock","Eating livestock adds an extra energy-losing step","Livestock make energy","Energy is not lost in food chains"],1,"An extra trophic level means more energy is lost."),
M("What is a monoculture?",["Many crops in one field","A single crop species over a large area","A mixed farm","A forest"],1,"One crop species grown over a large area.")],
[["Five ways to increase food production","Machinery, fertilisers, insecticides, herbicides, selective breeding."],
["Insecticide","Chemical that kills insect pests."],
["Herbicide","Chemical that kills weeds."],
["Monoculture","Large area growing one crop species."],
["Disadvantage of monoculture","Disease spreads quickly; loss of biodiversity."],
["Intensive livestock production","Many animals kept in small spaces, fed high-energy food."],
["Disadvantage of intensive farming","Disease spreads; welfare concerns; waste pollution."],
["Crops or livestock for energy?","Eating crops wastes less energy."]]);

const BI_L202=L("Habitat destruction and pollution","Why habitats are destroyed, the effects of deforestation, and how sewage, fertiliser, plastics and greenhouse gases harm ecosystems.",
`<h4>Biodiversity and human pressures</h4>
<p><b>Biodiversity</b> is the number of different species that live in a particular area. Human activities have tended to force biodiversity downwards, whereas <b>high biodiversity is needed for stable ecosystems</b>. <b>Habitat destruction</b> by humans is a major downward pressure on biodiversity.</p>
<p>The increasing human population is destroying many habitats, from rainforest to woodland to marine. Many habitats are destroyed to make space for other economic activities, or by pollution from these activities. This <b>interrupts food chains and webs</b>, so more species may die because their prey is gone.</p>
<h4>Reasons for habitat destruction</h4>
<table><tr><th>Reason</th><th>Explanation</th></tr>
<tr><td>Clearing land for farming and housing</td><td>Crops, livestock and homes all take up a large amount of space. With an increasing population and demand for food, more land is needed, so habitats such as forests are cleared (<b>deforestation</b>)</td></tr>
<tr><td>Extraction of natural resources</td><td>Resources such as wood, stone and metals must be gathered to make products. Many trees are cut down, destroying forest habitats, and some extraction, for example <b>mining</b>, takes up a large amount of space because the land must be cleared first</td></tr>
<tr><td>Marine pollution</td><td>Oil spills and other waste pollute the oceans and kill sea life. <b>Eutrophication</b> can occur when fertilisers from intensively farmed fields enter waterways, causing a huge decrease in biodiversity because most aquatic species die from lack of oxygen</td></tr></table>
<h4>Deforestation</h4>
<p><b>Deforestation</b> is the clearing of trees, usually on a large scale. If trees are replaced by replanting it can be a sustainable practice. However, trees are generally cleared so that the land can be used differently (building, grazing cattle, planting monocultures such as palm oil plantations), so it is <b>not sustainable</b>. As tree cover decreases, the effects on the environment get worse, and deforestation is a particularly severe example of habitat destruction.</p>
{{BI_DEFOR}}
<table><tr><th>Effect</th><th>Consequence</th></tr>
<tr><td>Extinction and loss of biodiversity</td><td>Forest habitats, especially tropical rainforests, have a huge range of biodiversity. As habitat is destroyed, large numbers of plant and animal species are lost. Many are found only in these areas, so they become extinct</td></tr>
<tr><td>Soil erosion</td><td>Tree roots help to stabilise the soil and stop rain eroding it. Trees take up nutrients and minerals through their roots. Without trees, nutrients and minerals stay unused in the soil and are washed into rivers and lakes by rain (<b>leaching</b>). This loss of soil nutrients is permanent and makes it very difficult for forest trees to regrow, even if the land is not used for crops or cattle</td></tr>
<tr><td>Flooding</td><td>Without trees the topsoil is loose and unstable and is easily washed away by rain, increasing the risk of <b>flash flooding and landslides</b></td></tr>
<tr><td>Increased carbon dioxide in the atmosphere</td><td>Trees take in carbon dioxide in photosynthesis and release oxygen. Removing many trees means less carbon dioxide is removed from the air. Cleared trees are often <b>burned</b> rather than cut down, which releases carbon dioxide (combustion), further increasing carbon dioxide levels and contributing to global warming</td></tr></table>
<h4>Untreated sewage and excess fertiliser</h4>
<p>Human activities have led to the pollution of <b>land, water and air</b>. Pollution comes from many sources, including industry and manufacturing, waste and discarded rubbish, chemicals from farming, nuclear fall-out and untreated sewage.</p>
<table><tr><th>Pollutant</th><th>Source / cause</th><th>Effect</th></tr>
<tr><td>Untreated sewage</td><td>Lack of sewage treatment (poor infrastructure or funding) means sewage enters rivers or streams</td><td>Increases bacteria, which reduces oxygen in the water and kills aquatic life. This process is known as eutrophication</td></tr>
<tr><td>Fertilisers</td><td>Run-off from farmland when used in excess</td><td>Causes algal blooms, then bacteria feed, then oxygen depletion and death of aquatic organisms. Another case of eutrophication</td></tr>
<tr><td>Methane</td><td>Released by cattle farming, rice paddies and landfills</td><td>Potent greenhouse gas that contributes to climate change</td></tr>
<tr><td>Carbon dioxide</td><td>Produced by burning fossil fuels or trees (land clearance)</td><td>Also a greenhouse gas, contributing to global warming and climate change</td></tr></table>
<h4>Eutrophication (Extended)</h4>
<ol><li>Run-off of fertiliser from farmland enters the water and causes increased growth of algae and water plants.</li><li>The resulting <b>algal bloom</b> blocks sunlight, so water plants on the bottom start to die, as does the algae when competition for nutrients becomes too intense.</li><li>As water plants and algae die in greater numbers, <b>decomposing bacteria increase</b> in number and use up the dissolved oxygen by respiring <b>aerobically</b>.</li><li>There is less oxygen dissolved in the water, so aquatic organisms such as fish and insects may be unable to breathe and die.</li></ol>
{{BI_EUTRO}}
<div class="key"><b>Exam tip</b>Do not say that the algae "use up the oxygen" or that the fertiliser "kills the fish". The decomposers' aerobic respiration is the step that removes the oxygen.</div>
<h4>Plastic pollution</h4>
<p>Plastics have a large negative impact on land and water habitats because they are <b>non-biodegradable</b>.</p>
<p><b>In marine habitats:</b></p>
<ul><li>animals often try to eat plastic or become caught in it, leading to injuries and death;</li><li>as the plastic breaks down it can release <b>toxins</b> that affect marine organisms;</li><li>once broken into very small particles it is commonly ingested by animals and <b>enters the food chain</b>.</li></ul>
<p><b>On land:</b></p>
<ul><li>plastic is generally disposed of by <b>burying in landfills</b>;</li><li>as it breaks down it releases toxins into the surrounding soil, so the land is no good for growing crops or grazing animals and can only be built on several decades after burial.</li></ul>
<h4>Air pollution: methane and carbon dioxide</h4>
<p>Both methane and carbon dioxide <b>insulate the Earth</b> and act as a "blanket" in the atmosphere. Higher levels of both gases have led to <b>global warming and climate change</b>. Human activity has increased both:</p>
<ul><li>burning fossil fuels increases carbon dioxide;</li><li>keeping livestock generates methane;</li><li>global warming melts the <b>permafrost</b> in sub-polar regions, which releases even more trapped methane into the atmosphere.</li></ul>
{{BI_GHE}}`,
I("What is the real cost of cleared land?",
`<ol><li>Look at a photograph or map of a deforested area and a nearby forest. List five differences you can see.</li><li>For each difference, name a species or process that could be affected.</li><li>Decide who benefits from the clearing and who loses. Write down an argument for the clearing and an argument against it.</li><li>Suggest one action that could reduce the harm while still providing land for food.</li></ol>`,
`<p><b>Eutrophication model.</b> Fill three beakers with pond water. Add a different amount of fertiliser solution to two of them, and none to the third (control). Place in the light for 10 days. Observe colour and cloudiness each day and measure the dissolved oxygen with a sensor if available. Explain what you see.</p><p><b>Soil erosion model.</b> Fill two trays with soil; plant grass in one. Tilt both and pour the same volume of water over the top. Collect the run-off and compare how much soil it carries. Link to deforestation.</p>`),
[["State three reasons for the destruction of habitats.","Any three from: housing (1); crop production (1); livestock production (1); extraction of natural resources (1); pollution (1).",3],
["Describe two effects of deforestation.","Any two from: reduced biodiversity or extinction (1); soil loss (1); flooding (1); more carbon dioxide in the air (1).",2],
["Explain why deforestation increases the concentration of carbon dioxide in the air.","Fewer trees take in carbon dioxide for photosynthesis (1). Burning or decomposition of the trees releases carbon dioxide (1).",2],
["Explain how excess fertiliser in a river can cause fish to die. (Extended)","Nitrates increase and algae grow faster (1). The algae die and are decomposed (1). Decomposers respire aerobically and use up dissolved oxygen (1). Fish die from lack of oxygen (1).",4],
["Describe the harm that non-biodegradable plastics cause in the sea.","Animals swallow plastic or get tangled (1) which can kill them or block their gut (1). Plastic does not decay so it persists and enters food chains (1).",3]],
[M("What is biodiversity?",["Number of organisms","Number of different species in an area","Size of an ecosystem","Number of habitats"],1,"Biodiversity is the number of different species."),
M("Which is an effect of deforestation?",["More soil protected","Less flooding","Loss of soil","Fewer species lost"],2,"Without roots, soil is washed away."),
M("Which gas is released by cattle and landfill sites?",["Oxygen","Methane","Nitrogen","Argon"],1,"Methane is a greenhouse gas."),
M("Which is a greenhouse gas?",["Oxygen","Nitrogen","Carbon dioxide","Argon"],2,"Carbon dioxide traps heat."),
M("In eutrophication, which organisms use up the dissolved oxygen? (Extended)",["Fish","Decomposers","Algae in daylight","Plants"],1,"Decomposers respire aerobically."),
T("Name the term for plastics that microorganisms cannot break down.",["non-biodegradable","nonbiodegradable","non biodegradable"],"Non-biodegradable."),
M("What does untreated sewage contain that harms rivers?",["Only oxygen","Ions and bacteria","Only water","Argon"],1,"It contains nitrates and microorganisms that decompose organic matter."),
M("The enhanced greenhouse effect leads to...",["Cooling","Climate change","More oxygen","Less methane"],1,"More heat is trapped, causing global warming and climate change.")],
[["Biodiversity","Number of different species in an area."],
["Reasons for habitat destruction","Housing, farming, extraction of resources, pollution."],
["Effects of deforestation","Less biodiversity, soil loss, flooding, more CO~2~."],
["Eutrophication step 1 (Extended)","Increase in nitrate and other ions."],
["Eutrophication step 5 (Extended)","Decomposers' aerobic respiration lowers dissolved oxygen, so fish die."],
["Non-biodegradable plastic","Cannot be broken down by microorganisms."],
["Sources of methane","Cattle, rice paddies, landfill and decomposition of waste."],
["Enhanced greenhouse effect","More CO~2~ and methane trap more heat, causing climate change."]]);

const BI_L203=L("Conservation","Sustainable resources, why species become endangered, and how forests, fish stocks and endangered species are conserved.",
`<h4>Sustainable use of resources</h4>
<p>Humans use many resources from the Earth. Some, such as food, water and wood, are <b>sustainable resources</b>. A sustainable resource is one that is <b>produced as rapidly as it is removed</b> from the environment, so that it does not run out.</p>
<ul><li>Some resources, such as <b>fossil fuels</b> (coal, oil and natural gas), are <b>non-renewable</b>: what is used cannot be replaced. They need to be conserved by reducing the amount humans use and finding sustainable replacements.</li><li>Fossil fuels are being used as an energy source in increasing amounts. They are also the <b>raw materials</b> for many products: almost all plastics start with oil.</li><li>Products made from paper, plastic, glass or metal can be <b>reused and recycled</b>, which reduces waste and the raw materials and energy needed to make new products.</li><li>Some resources, such as <b>forests and fish stocks</b>, can be maintained so that they can be harvested sustainably and will not run out.</li></ul>
<h4>Sustainable development (Extended)</h4>
<p><b>Sustainable development</b> is development that provides for the needs of an increasing human population <b>without harming the environment</b>. When resources are managed sustainably, <b>conflicting demands</b> must be balanced, for example:</p>
<ul><li>local people using the resources in their immediate environment, against large companies making money from resources such as forests and fish;</li><li>the needs of humans for resources, against the needs of the animals and plants where the resources are taken (preventing loss of habitat and extinction);</li><li>what current populations need, against what future populations might need. Harvesting all the fish needed now might lead to overfishing and deplete stocks for future generations.</li></ul>
<p>For development to be sustainable, people need to <b>cooperate at local, national and international levels</b> in planning and managing resources.</p>
<h4>Sustaining forests (Extended)</h4>
<ul><li>Forests are needed to produce paper products and to provide timber. Much of the world's paper is now made from forests that <b>replant similar trees</b> when mature trees are cut, ensuring an adequate supply in future.</li><li><b>Tropical hardwoods</b> such as teak and mahogany take many years to regrow but are highly desirable for furniture. Using them is more sustainable now that schemes such as the <b>Forest Stewardship Council</b> monitor logging companies and track the wood produced.</li><li><b>Education</b> makes logging companies aware of sustainable practices and consumers aware of the importance of buying products from sustainable sources.</li></ul>
{{BI_FOREST}}
<h4>Sustaining fish stocks (Extended)</h4>
<ul><li><b>Controlling the size of fish caught</b>, to ensure enough fish of a suitable age remain for breeding.</li><li><b>Controlling the time of year</b> certain fish can be caught, to prevent large-scale depletion when fish gather in large numbers to breed.</li><li><b>Restocking:</b> breeding fish and keeping the offspring until they are large enough to survive in their natural habitat, then releasing them.</li><li><b>Educating</b> fishermen about local and international laws, and consumers about fish that are not produced sustainably so they can avoid buying them.</li></ul>
{{BI_FISH}}
<h4>Endangered species</h4>
<p>An <b>endangered species</b> is at risk of becoming <b>extinct</b>. A species becomes endangered when its population falls below a critical level because of:</p>
<ul><li>hunting;</li><li>climate change;</li><li>pollution;</li><li>loss of habitat;</li><li>introduction of <b>non-native species</b> that outcompete native species.</li></ul>
<p>Endangered species can be helped by <b>conservation measures</b>:</p>
<ul><li><b>education programmes</b>;</li><li><b>captive breeding programmes</b>;</li><li><b>monitoring and legal protection</b> of the species and of their habitats;</li><li><b>seed banks</b> as a conservation measure for plants: seeds of endangered plants are carefully stored so new plants can be grown in future.</li></ul>
<p>A species may be at risk of extinction if there is <b>not enough genetic variation</b> in the population. Random changes in the environment may quickly cause extinction because the remaining organisms are all very similar and may not have the adaptations to survive such changes.</p>
<p>There are <b>moral, cultural and scientific reasons</b> for conservation programmes, including:</p>
<ul><li>reducing extinction rates of plant and animal species;</li><li>keeping damage to food chains and webs to a minimum and protecting vulnerable ecosystems such as rainforests;</li><li>protecting our future food supply, maintaining nutrient cycles and keeping possible sources of future medical drugs and fuels.</li></ul>
<h4>Reasons for conservation (Extended)</h4>
<ul><li>Maintaining or increasing <b>biodiversity</b>, which allows ecosystems to remain stable.</li><li><b>Reducing extinction</b>, which helps to retain iconic species and maintain biodiversity.</li><li>Protecting <b>vulnerable ecosystems</b> that would otherwise be quickly lost to human activity.</li><li>Maintaining <b>ecosystem functions</b>:<ul><li><b>nutrient cycling</b>, for example carbon cycling, to limit the impact on climate change;</li><li><b>resource provision</b>: <b>food</b> (enough for the population), <b>drugs</b> (plants for plant-based remedies), <b>fuel</b> (for activities such as cooking) and <b>genes</b> (so the gene pool stays wide and variety exists in all species).</li></ul></li></ul>
<h4>Conservation techniques (Extended)</h4>
<p>Certain techniques are used in captive breeding programmes to maintain biodiversity.</p>
<ul><li><b>Artificial insemination (AI)</b> involves inserting sperm from a male into the reproductive tract of a female, for example using a syringe. Sperm can be transported around the world between zoos for use in AI, reducing the need to transport animals.</li><li><b>In vitro fertilisation (IVF)</b> involves using sperm to fertilise egg cells in a laboratory. The fertilised egg cell can then be implanted into a female for development. This allows gametes with <b>known alleles</b> to be used, ensuring the next generation remains genetically diverse.</li></ul>
<h4>Risks to a species (Extended)</h4>
<p>If its population size decreases, a species has <b>reduced genetic variation</b>. This makes it <b>more susceptible to environmental change</b>.</p>
{{BI_RISK}}`,
I("Is it worth spending money to save a species most people have never seen?",
`<ol><li>Choose an endangered species from a news article or a zoo information board.</li><li>List what has caused its decline using the six causes in the notes.</li><li>Decide which conservation methods (reserve, captive breeding, seed bank, education, quotas) would work best, and explain why.</li><li>Write one benefit and one cost of your plan for people living nearby.</li></ol>`,
`<p><b>Fishing simulation.</b> Place 50 beads (fish) in a tray. Each round, "fish" for a number of beads with a spoon, then add one new bead for every two left behind (breeding). Repeat for 8 rounds with unlimited fishing, then repeat with a quota of 5 per round. Plot the number of fish against rounds and compare.</p><p><b>Seed bank.</b> Store seeds of a fast-germinating plant (such as cress) in a cool dry place and in a warm damp place for two weeks. Compare germination rates and explain why seed banks use cold, dry conditions.</p>`),
[["Define the term sustainable resource.","A resource that is produced as rapidly as it is removed (1) so that it does not run out (1).",2],
["State three reasons why species become endangered.","Any three from: climate change, habitat destruction, hunting, overharvesting, pollution, introduced species (3).",3],
["Describe how captive breeding programmes help to conserve an endangered species.","Animals are bred in a protected place (1) and the offspring can be released into the wild (1), which increases the numbers (1).",3],
["Explain how fish stocks can be conserved by using controlled mesh sizes and quotas. (Extended)","Large mesh lets young fish escape (1) so they can grow and breed (1). Quotas limit the mass caught (1) so the stock is not overfished (1).",4],
["Explain why a small population is at greater risk of extinction. (Extended)","There is less genetic variation (1). A disease or environmental change may kill all individuals (1) because none has an advantageous allele (1).",3]],
[M("What is a sustainable resource?",["Used up quickly","Produced as fast as it is removed","Non-renewable","Imported"],1,"It is produced as rapidly as it is removed."),
M("Which is a cause of endangerment?",["Education","Introduced species","Seed banks","Quotas"],1,"Introduced species can eat or outcompete native species."),
M("What is stored in a seed bank?",["Eggs","Seeds","Fossils","Embryos"],1,"Seeds are stored cold and dry."),
T("Name the technique of placing sperm into a female without mating.",["artificial insemination","ai"],"Artificial insemination."),
M("Which method conserves fish stocks? (Extended)",["Smaller mesh","No quotas","Closed seasons","Fishing in breeding areas"],2,"Closed seasons let fish breed."),
M("Which is a reason for conservation programmes? (Extended)",["Increase extinction","Maintain biodiversity","Reduce nutrient cycling","Remove protected areas"],1,"Conservation maintains or increases biodiversity."),
M("What happens to genetic variation when a population becomes very small? (Extended)",["Increases","Stays the same","Decreases","Becomes zero immediately"],2,"Fewer individuals means fewer alleles."),
M("Which is an example of overharvesting?",["Planting a tree for every tree cut","Catching more fish than can breed","Using a quota","Closing a fishing season"],1,"Taking more than the population can replace.")],
[["Sustainable resource","Produced as rapidly as it is removed."],
["Endangered","At risk of becoming extinct."],
["Six causes of endangerment","Climate change, habitat destruction, hunting, overharvesting, pollution, introduced species."],
["Captive breeding","Breeding species in zoos or sanctuaries, then releasing them."],
["Seed bank","Stores seeds cold and dry so plants can be regrown."],
["Fish conservation (Extended)","Closed seasons, protected areas, net types and mesh size, quotas, monitoring."],
["AI and IVF (Extended)","Artificial insemination and in vitro fertilisation increase offspring in captive breeding."],
["Small population risk (Extended)","Less genetic variation, so greater risk of extinction."]]);

/* ================= quizzes and exam-style questions ================= */
const BI_SRC=n=>"Hub exam-style question (written for this hub), Topic "+n;
const BI_TBL=(h,rows)=>`<div class="tw"><table><tr>${h.map(x=>`<th>${x}</th>`).join("")}</tr>${rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</table></div>`;

BSET(19,[BI_L191,BI_L192,BI_L193],
[M("Which of these is a producer?",["Rabbit","Fungus","Grass","Fox"],2,"Grass makes its own organic nutrients by photosynthesis."),
M("What happens to most of the energy that a herbivore takes in?",["It is stored as new growth","It is lost to the environment as heat and waste","It becomes carbon dioxide only","It goes back to plants"],1,"Most is lost as heat from respiration, in waste and in uneaten parts."),
M("A tertiary consumer is a...",["Plant","Herbivore","Carnivore that eats secondary consumers","Decomposer"],2,"Tertiary consumers eat secondary consumers."),
T("Name the type of pyramid that shows the energy passing through each trophic level.",["energy","pyramid of energy"],"A pyramid of energy."),
N("A producer fixes 50 000 kJ. 10% passes to the primary consumer. How much energy is that?",5000,"kJ","10% of 50 000 = 5 000.",1),
M("Which process in the carbon cycle puts carbon dioxide into the air from fossil fuels?",["Photosynthesis","Respiration only","Combustion","Feeding"],2,"Burning fossil fuels is combustion."),
M("Which of these is NOT one of the four phases of the sigmoid growth curve?",["Lag","Exponential","Stationary","Evaporation"],3,"The phases are lag, exponential, stationary and death."),
M("Why does a pyramid of biomass usually have a better shape than a pyramid of numbers?",["It counts the organisms","It takes the mass of organisms into account","It ignores the producers","It shows time"],1,"Biomass allows for different sizes of organism.")],
[P("Grassland food web",8,"<p>The table shows what each organism eats.</p>"+BI_TBL(["Organism","Eats"],[["Grasshopper","Grass"],["Mouse","Grass"],["Frog","Grasshopper"],["Snake","Frog and mouse"],["Hawk","Snake and mouse"]])+"<ol type='a'><li>Write down a food chain of four organisms from the table. [2]</li><li>(i) Name the producer. [1]<br>(ii) Name one secondary consumer in your chain. [1]</li><li>All the grasshoppers are killed by an insecticide. Predict what happens to the number of frogs and explain your answer. [2]</li><li>The frogs also die. Suggest why the snake population might not fall very much. [1]</li><li>State the original source of the energy in this food web. [1]</li></ol>",
["(a) grass → grasshopper → frog → snake (2): award 1 for a correct order of three organisms and 1 for four in the correct order with arrows in the right direction.","(b)(i) grass (1).","(b)(ii) frog (1), or the snake if the chain is grass, mouse, snake.","(c) The number of frogs falls (1) because they have less food (1).","(d) The snake can eat mice instead (1).","(e) the Sun or sunlight (1)."],BI_SRC(19)),
P("Energy transfer (Extended)",6,"<p>In a lake, the energy in the producers is 20 000 kJ per m² per year. The primary consumers hold 2 000 kJ and the secondary consumers hold 180 kJ.</p><ol type='a'><li>Calculate the percentage of energy transferred from the primary consumers to the secondary consumers. Show your working. [2]</li><li>Explain two reasons why not all the energy in the producers passes to the primary consumers. [2]</li><li>Explain why food chains rarely have more than five trophic levels. [1]</li><li>State the percentage of energy transferred from producers to primary consumers. [1]</li></ol>",
["(a) 180 ÷ 2000 × 100 (1) = 9% (1).","(b) Some parts of the producers are not eaten (1). Energy is lost as heat in respiration or the producers use some for their own growth (1).","(c) Too little energy remains after several transfers to support more levels (1).","(d) 10% (1)."],BI_SRC(19)),
P("Carbon and nitrogen cycles",7,"<ol type='a'><li>The carbon cycle shows how carbon dioxide moves between organisms and the air.<br>(i) Name the process by which plants remove carbon dioxide from the air. [1]<br>(ii) Name the process by which animals return carbon dioxide to the air. [1]</li><li>Describe how burning coal affects the concentration of carbon dioxide in the air. [3]</li><li>The nitrogen cycle (Extended).<br>(i) State the form in which plants absorb nitrogen from the soil. [1]<br>(ii) State the role of nitrifying bacteria. [1]</li></ol>",
["(a)(i) photosynthesis (1).","(a)(ii) respiration (1).","(b) Coal contains carbon stored for millions of years (1). Burning is combustion and releases the carbon as carbon dioxide (1). The concentration of carbon dioxide in the air increases (1).","(c)(i) nitrate ions (1).","(c)(ii) They change ammonium ions into nitrate ions (1)."],BI_SRC(19)),
P("Bacterial population growth",8,"<p>A small number of bacteria was added to a flask of nutrient broth. The table shows the population over 12 hours.</p>"+BI_TBL(["Time / hours","0","2","4","6","8","10","12"],[["Population / millions","2","3","12","60","150","200","200"]])+"<ol type='a'><li>Name the phase of growth between 0 and 2 hours. [1]</li><li>Name the phase between 4 and 8 hours. [1]</li><li>Calculate the increase in population between 4 and 6 hours. [1]</li><li>Describe the population between 10 and 12 hours. [1]</li><li>Explain why the population stopped increasing. [3]</li><li>The experiment continued for another day. Suggest one reason why the population then fell. [1]</li></ol>",
["(a) lag (phase) (1).","(b) exponential or log (phase) (1).","(c) 60 − 12 = 48 million (1).","(d) it stays constant at 200 million (1).","(e) A limiting factor such as food or space has become scarce (1). Births are equal to deaths (1). Waste, competition or disease increased (1).","(f) Food ran out or toxic waste built up (1)."],BI_SRC(19)),
P("Sampling with quadrats",6,"<p>A student estimated the number of daisies in a field of area 400 m². Five 1 m² quadrats were placed in the field. The counts were 4, 7, 6, 3 and 5.</p><ol type='a'><li>Explain why the quadrats should be placed at random. [1]</li><li>Calculate the mean number of daisies per quadrat. Show your working. [2]</li><li>Estimate the number of daisies in the field. [2]</li><li>Suggest one way to make the estimate more reliable. [1]</li></ol>",
["(a) To avoid bias in the sample (1).","(b) (4 + 7 + 6 + 3 + 5) ÷ 5 (1) = 5 (1).","(c) 5 × 400 (1) = 2000 (1).","(d) Use more quadrats (1)."],BI_SRC(19))]);

BSET(20,[BI_L201,BI_L202,BI_L203],
[M("Which of these increases crop yield by reducing competition from weeds?",["Insecticide","Herbicide","Fertiliser","Combine harvester"],1,"Herbicides kill weeds."),
M("Which is a disadvantage of a large monoculture?",["Machines can be used","Pests spread quickly","Food is cheap","Uniform crop"],1,"Pests and disease spread through the whole crop."),
T("Name the term for the number of different species in an area.",["biodiversity"],"Biodiversity."),
M("Which gas is added to the air when forests are burned?",["Oxygen","Nitrogen","Carbon dioxide","Argon"],2,"Burning releases carbon dioxide."),
M("What is the effect of too much fertiliser in a river?",["More oxygen","Algae grow quickly and oxygen later falls","Fish grow bigger","The river dries up"],1,"This leads to eutrophication."),
M("Which is a conservation method for fish stocks?",["Fishing with small mesh nets","Closed seasons","No limit on catch","Fishing near breeding sites"],1,"Closed seasons allow fish to breed."),
M("What is stored in a seed bank?",["Seeds in cold dry conditions","Seedlings in warm water","Pollen in water","Fruit"],0,"Seeds stored cold and dry stay alive for a long time."),
M("Which could cause a species to become extinct?",["Seed banks","Introduced predators","Quotas","Education"],1,"Introduced species can eat or outcompete native species.")],
[P("Farming methods",6,"<ol type='a'><li>State two ways in which farmers can increase the yield of a crop. [2]</li><li>Explain how insecticides improve the quality and yield of a crop. [2]</li><li>Describe two disadvantages of growing a large monoculture. [2]</li></ol>",
["(a) Any two from: use machinery, use chemical fertilisers, use insecticides, use herbicides, selective breeding (2): 1 each.","(b) Insecticides kill insect pests (1) that would otherwise eat or damage the crop (1).","(c) Any two from: pests and disease spread quickly; loss of habitats or biodiversity; more fertiliser or chemicals needed (2): 1 each."],BI_SRC(20)),
P("Deforestation",7,"<ol type='a'><li>State what is meant by the term biodiversity. [1]</li><li>Describe three undesirable effects of deforestation. [3]</li><li>Explain how deforestation increases the amount of carbon dioxide in the air. [2]</li><li>Suggest one way of reducing the damage caused by cutting down forests. [1]</li></ol>",
["(a) The number of different species in an area (1).","(b) Any three from: reduced biodiversity or extinction; loss of soil; flooding; more carbon dioxide in the air (3): 1 each.","(c) There are fewer trees to take in carbon dioxide by photosynthesis (1). Burning or decay of the trees releases carbon dioxide (1).","(d) Any one from: replanting, protected areas, quotas, education (1)."],BI_SRC(20)),
P("Eutrophication in a lake (Extended)",8,"<p>The table shows the concentration of nitrate and dissolved oxygen in a lake near a farm.</p>"+BI_TBL(["Month","Jan","Mar","May","Jul","Sep"],[["Nitrate / mg per dm³","2","3","9","12","8"],["Dissolved oxygen / mg per dm³","9","9","7","4","3"]])+"<ol type='a'><li>Describe the change in the nitrate concentration between March and July. [1]</li><li>Describe the trend in the dissolved oxygen concentration. [1]</li><li>Explain why the dissolved oxygen concentration fell between May and September. [4]</li><li>Suggest the source of the extra nitrate. [1]</li><li>State one effect of the low oxygen concentration on the animals in the lake. [1]</li></ol>",
["(a) It increased from 3 to 12 mg per dm³ (1).","(b) It fell from 9 to 3 mg per dm³ (1).","(c) Nitrate increases the growth of algae (1). The algae die and are decomposed (1). Decomposers respire aerobically and use up oxygen (1). More decomposers means more oxygen is used (1).","(d) fertiliser from the farm (1).","(e) Fish or other animals die (1)."],BI_SRC(20)),
P("Conservation",8,"<ol type='a'><li>State what is meant by a sustainable resource. [1]</li><li>State two methods used to conserve fish stocks. [2]</li><li>Explain why controlling the mesh size of nets helps conserve fish stocks. [2]</li><li>Describe how a seed bank helps conserve an endangered plant species. [2]</li><li>State one reason why a species may become endangered. [1]</li></ol>",
["(a) A resource that is produced as rapidly as it is removed so it does not run out (1).","(b) Any two from: quotas, closed seasons, protected areas, controlled net types or mesh size, monitoring, education (2): 1 each.","(c) Large mesh lets young fish escape (1) so they can grow and breed (1).","(d) Seeds are stored in cold, dry conditions (1). They can be grown again if the wild population is lost (1).","(e) Any one from: climate change, habitat destruction, hunting, overharvesting, pollution, introduced species (1)."],BI_SRC(20))]);
