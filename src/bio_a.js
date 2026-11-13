/* ===== Biology 0610 topics 1 and 2 (bio_a.js): figures prefixed BA_ ===== */
const BA_FG=(vb,inner,cap,label,maxw)=>`<figure class="fig"${maxw?` style="max-width:${maxw}px"`:""}><svg viewBox="${vb}" role="img" aria-label="${label}">${inner}</svg><figcaption>${cap}</figcaption></figure>`;
const BA_T=(x,y,s,o)=>{o=o||{};return `<text x="${x}" y="${y}" font-size="${o.s||11}" text-anchor="${o.a||"middle"}"${o.b?' font-weight="700"':""}${o.i?' font-style="italic"':""} ${o.c?`style="fill:${o.c}"`:'fill="currentColor"'}>${s}</text>`};
const BA_ARR=(x1,y1,x2,y2,col,w)=>{const a=Math.atan2(y2-y1,x2-x1),h=7,c=col||"currentColor";
  return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="${w||2}" fill="none"/><path d="M${x2} ${y2}l${(-h*Math.cos(a-.45)).toFixed(1)} ${(-h*Math.sin(a-.45)).toFixed(1)}M${x2} ${y2}l${(-h*Math.cos(a+.45)).toFixed(1)} ${(-h*Math.sin(a+.45)).toFixed(1)}" stroke="${c}" stroke-width="${w||2}" fill="none" stroke-linecap="round"/>`};
const BA_LN=(x1,y1,x2,y2,w)=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="currentColor" stroke-opacity=".7" stroke-width="${w||1}" fill="none"/>`;
/* box with centred lines of text; o.f fill colour, o.s font size, o.b bold first line */
const BA_BOX=(x,y,w,h,lines,o)=>{o=o||{};const s=o.s||10,n=lines.length,lh=s+3,y0=y+h/2-(n-1)*lh/2+s*.35;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" ${o.f?`style="fill:${o.f}" fill-opacity="${o.fo||.25}"`:'fill="none"'} stroke="currentColor" stroke-opacity=".55" stroke-width="1.3"/>`+lines.map((t,i)=>BA_T(x+w/2,(y0+i*lh).toFixed(1),t,{s:s,b:o.b&&i===0})).join("")};

/* ---- 1.1 seven life processes ---- */
FIGS.BA_MRS=()=>{
  const d=[["Movement",["change of position","or place by the","organism or a part"]],["Respiration",["chemical reactions","that release energy","in cells"]],["Sensitivity",["detect and respond","to changes inside","or outside"]],["Growth",["permanent increase","in size and","dry mass"]],["Reproduction",["processes that make","more of the same","kind of organism"]],["Excretion",["removal of waste","products of","metabolism"]],["Nutrition",["taking in materials","for energy, growth","and development"]]];
  const col=["var(--accent)","var(--amber)","var(--pur)","var(--good)","var(--blu)","var(--red)","var(--accent)"];
  let s="";
  d.forEach((r,i)=>{const row=i<4?0:1,k=row?i-4:i,x=row?58+k*112:4+k*104,y=row?112:8;
    s+=BA_BOX(x,y,100,92,[r[0]].concat(r[1]),{f:col[i],b:1,s:9.5});});
  return BA_FG("0 0 420 212",s,"The seven characteristics of living organisms. Remember them as MRS GREN.","Seven boxes naming and defining movement, respiration, sensitivity, growth, reproduction, excretion and nutrition",520);
};
FIGS.BA_GROW=()=>{
  let s=`<path d="M52 20V150H300" stroke="currentColor" stroke-width="1.6" fill="none"/>`+BA_T(176,176,"Time (days)",{s:11})+`<text x="14" y="88" font-size="11" text-anchor="middle" transform="rotate(-90 14 88)" fill="currentColor">Mass</text>`;
  s+=`<path d="M52 128L90 120L128 112L166 98L204 84L242 68L290 52" stroke="var(--accent)" stroke-width="3" fill="none" stroke-linejoin="round"/>`;
  s+=`<path d="M52 108L90 92L128 100L166 66L204 78L242 44L290 30" stroke="var(--amber)" stroke-width="3" fill="none" stroke-dasharray="6 4" stroke-linejoin="round"/>`;
  s+=BA_T(296,56,"dry mass",{a:"start",s:10.5,b:1,c:"var(--accent)"})+BA_T(296,34,"fresh mass",{a:"start",s:10.5,b:1,c:"#B77A12"});
  s+=BA_T(170,12,"Dry mass rises steadily. Fresh mass wobbles with water content.",{s:10.5,i:1});
  return BA_FG("0 0 380 184",s,"Dry mass is the better measure of growth because water content changes from hour to hour.","Graph of a steadily rising dry mass line and a wobbling fresh mass line against time",460);
};

/* ---- 1.2 classification ---- */
FIGS.BA_BINOM=()=>{
  let s=BA_T(210,24,"The binomial system: two parts, genus then species",{s:12,b:1});
  const rows=[["Panthera","leo","lion"],["Panthera","tigris","tiger"],["Felis","catus","domestic cat"],["Homo","sapiens","human"]];
  rows.forEach((r,i)=>{const y=40+i*38;
    s+=`<rect x="20" y="${y}" width="380" height="30" rx="7" fill="none" stroke="currentColor" stroke-opacity=".4"/>`;
    s+=BA_T(40,y+20,r[0],{a:"start",s:13,i:1,b:1,c:"var(--accent)"})+BA_T(130,y+20,r[1],{a:"start",s:13,i:1,b:1,c:"#B77A12"})+BA_T(380,y+20,r[2],{a:"end",s:11});});
  s+=BA_T(40,208,"genus",{a:"start",s:10.5,b:1,c:"var(--accent)"})+BA_T(130,208,"species",{a:"start",s:10.5,b:1,c:"#B77A12"});
  s+=BA_T(400,208,"Capital letter for the genus, lower case for the species",{a:"end",s:10,i:1}).replace("font-size=\"10\"","font-size=\"9\"");
  return BA_FG("0 0 420 218",s,"Lions and tigers share the genus Panthera but are different species. The scientific name is written in italics.","Four scientific names split into genus and species")  ;
};
FIGS.BA_KEY=()=>{
  const B=(x,y,w,h,t,f)=>BA_BOX(x,y,w,h,t,{f:f,s:9.5,fo:.28});
  let s=B(135,6,150,34,["Does it have legs?"],"var(--blu)");
  s+=BA_ARR(160,40,90,70)+BA_T(110,52,"no",{s:10,b:1,a:"end"})+BA_ARR(260,40,330,70)+BA_T(310,52,"yes",{s:10,b:1,a:"start"});
  s+=B(20,70,140,34,["Does it have a shell?"],"var(--blu)")+B(250,70,160,34,["How many legs?"],"var(--blu)");
  s+=BA_ARR(50,104,32,140)+BA_T(34,122,"no",{s:10,b:1,a:"end"})+BA_ARR(130,104,148,140)+BA_T(146,122,"yes",{s:10,b:1,a:"start"});
  s+=B(2,140,74,34,["earthworm"],"var(--good)")+B(104,140,74,34,["snail"],"var(--good)");
  s+=BA_ARR(280,104,262,140)+BA_T(266,122,"six",{s:10,b:1,a:"end"})+BA_ARR(380,104,398,140)+BA_T(396,122,"eight",{s:10,b:1,a:"start"});
  s+=B(226,140,74,34,["ant"],"var(--good)")+B(354,140,64,34,["spider"],"var(--good)");
  return BA_FG("0 0 420 184",s,"A dichotomous key is a series of paired questions. Each question has two answers and each answer leads on to the next question or to a name.","Flow chart of a dichotomous key separating earthworm, snail, ant and spider",520);
};
FIGS.BA_TREE=()=>{
  let s=`<g stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round">`;
  s+=`<path d="M30 100H80M80 60V140M80 60H150M80 140H110M110 110V170M110 110H190M110 170H190"/>`;
  s+=`<path d="M150 60H210M190 110V90M190 90H230M190 110V130M190 130H230M190 170H260"/></g>`;
  s+=BA_T(268,64,"mouse",{a:"start",s:11.5})+BA_T(236,94,"human",{a:"start",s:11.5})+BA_T(236,134,"chimpanzee",{a:"start",s:11.5})+BA_T(266,174,"gorilla",{a:"start",s:11.5});
  s+=`<path d="M212 60H258" stroke="currentColor" stroke-width="2.4"/>`;
  s+=BA_T(6,80,"common",{a:"start",s:9.5,i:1})+BA_T(6,92,"ancestor",{a:"start",s:9.5,i:1})+BA_T(20,200,"Branch points show shared ancestors. Closer branches mean more similar DNA base sequences.",{a:"start",s:10,i:1});
  return BA_FG("0 0 420 212",s,"A simple family tree. The more recent the shared ancestor, the more similar the DNA base sequences of two species.","Evolutionary tree showing human and chimpanzee closest, then gorilla, then mouse",520);
};

/* ---- 1.3 features of organisms ---- */
FIGS.BA_KINGDOMS=()=>{
  const k=[["Animals",["many cells, no cell walls","no chloroplasts","feed on other organisms","nervous coordination"],"var(--red)"],
  ["Plants",["many cells, cellulose walls","chloroplasts with chlorophyll","make food by photosynthesis","store starch or sucrose"],"var(--good)"],
  ["Fungi",["walls of chitin, no chlorophyll","feed by absorbing nutrients","most have hyphae (threads)","yeast is single-celled"],"var(--amber)"],
  ["Prokaryotes",["single-celled, no nucleus","DNA free in the cytoplasm","cell wall, small ribosomes","for example bacteria"],"var(--blu)"],
  ["Protoctists",["mostly single-celled","have a nucleus","some photosynthesise (algae)","some cause disease"],"var(--pur)"]];
  let s="";
  k.forEach((r,i)=>{const row=i<3?0:1,c=row?i-3:i,x=row?64+c*152:4+c*152,y=row?110:6;
    s+=BA_BOX(x,y,148,98,[r[0]].concat(r[1]),{f:r[2],b:1,s:9,fo:.22});});
  return BA_FG("0 0 460 214",s,"The five kingdoms and the main features used to tell them apart.","Five boxes giving the main features of animals, plants, fungi, prokaryotes and protoctists",560);
};
FIGS.BA_ARTHRO=()=>{
  const body=(cx,cy,rx,ry,col)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" style="fill:${col}" fill-opacity=".45" stroke="currentColor" stroke-opacity=".7" stroke-width="1.3"/>`;
  const legs=(cx,cy,n,len,sp,sl)=>{let o="";for(let i=0;i<n;i++){const x=cx+(i-(n-1)/2)*sp;o+=`<path d="M${x} ${cy-4}l${-sl} ${-len}M${x} ${cy+4}l${-sl} ${len}" stroke="currentColor" stroke-width="1.3" fill="none"/>`}return o};
  let s="";
  /* insect */
  s+=legs(55,60,3,22,13,5)+body(30,60,14,10,"var(--good)")+body(55,60,12,9,"var(--good)")+body(84,60,18,10,"var(--good)")+`<path d="M22 52L14 36M30 51L26 34" stroke="currentColor" fill="none"/>`;
  s+=BA_T(55,112,"Insect",{s:11,b:1})+BA_T(55,126,"3 pairs of legs",{s:9.5})+BA_T(55,138,"3 body regions",{s:9.5})+BA_T(55,150,"usually wings",{s:9.5});
  /* arachnid */
  s+=legs(180,60,4,22,10,5)+body(165,60,16,13,"var(--red)")+body(197,60,17,14,"var(--red)");
  s+=BA_T(180,112,"Arachnid",{s:11,b:1})+BA_T(180,126,"4 pairs of legs",{s:9.5})+BA_T(180,138,"2 body regions",{s:9.5})+BA_T(180,150,"no antennae",{s:9.5});
  /* myriapod */
  let m="";for(let i=0;i<8;i++){m+=body(262+i*11,60,7,8,"var(--amber)")+`<path d="M${262+i*11} 52v-14M${262+i*11} 68v14" stroke="currentColor" stroke-width="1.2" fill="none"/>`}
  s+=m+BA_T(305,112,"Myriapod",{s:11,b:1})+BA_T(305,126,"many body segments",{s:9.5})+BA_T(305,138,"1 or 2 pairs of legs",{s:9.5})+BA_T(305,150,"on each segment",{s:9.5});
  /* crustacean */
  s+=legs(412,60,5,22,8,3)+body(400,60,22,14,"var(--blu)")+body(432,60,12,9,"var(--blu)")+`<path d="M380 54L366 40M380 62L362 66" stroke="currentColor" fill="none"/>`;
  s+=BA_T(412,112,"Crustacean",{s:11,b:1})+BA_T(412,126,"more than 4 pairs of legs",{s:9.5})+BA_T(412,138,"2 pairs of antennae",{s:9.5})+BA_T(412,150,"hard outer shell",{s:9.5});
  return BA_FG("20 0 460 160",s,"Simplified plan views of the four groups of arthropods. All arthropods have jointed legs and an exoskeleton.","Simplified drawings of an insect, an arachnid, a myriapod and a crustacean with their features",600);
};
FIGS.BA_VIRUS=()=>{
  let s=`<polygon points="110,30 160,45 185,90 165,140 115,155 65,140 45,90 65,45" style="fill:var(--accent)" fill-opacity=".25" stroke="currentColor" stroke-width="2.4"/>`;
  s+=`<path d="M100 70c20 -10 40 10 20 25c-18 14 -10 28 12 22c10 -3 18 4 8 14" stroke="var(--red)" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  s+=BA_LN(185,60,250,40)+BA_T(256,44,"protein coat",{a:"start",s:11,b:1})+BA_T(256,57,"protects the genetic material",{a:"start",s:9.5});
  s+=BA_LN(132,110,250,110)+BA_T(256,114,"genetic material",{a:"start",s:11,b:1})+BA_T(256,127,"DNA or RNA",{a:"start",s:9.5});
  s+=BA_T(110,178,"No nucleus, cytoplasm or cell membrane. It cannot respire or grow.",{s:10,i:1,a:"start"}).replace('x="110"','x="10"');
  return BA_FG("0 0 420 190",s,"A virus is only a protein coat around genetic material. It can reproduce only inside a host cell.","Diagram of a virus with a protein coat surrounding a strand of genetic material",520);
};

/* ---- 2.1 cells ---- */
FIGS.BA_ANIMAL=()=>{
  let s=`<ellipse cx="170" cy="120" rx="130" ry="92" style="fill:var(--accent)" fill-opacity=".14" stroke="currentColor" stroke-width="2.4"/>`;
  s+=`<circle cx="165" cy="112" r="30" style="fill:var(--pur)" fill-opacity=".45" stroke="currentColor" stroke-width="1.6"/><circle cx="170" cy="108" r="8" style="fill:var(--pur)" fill-opacity=".8"/>`;
  s+=`<ellipse cx="240" cy="150" rx="17" ry="9" style="fill:var(--amber)" fill-opacity=".6" stroke="currentColor"/><path d="M228 150q5-6 8 0t8 0t6 0" stroke="currentColor" fill="none" stroke-width="1"/>`;
  s+=`<ellipse cx="105" cy="160" rx="15" ry="8" style="fill:var(--amber)" fill-opacity=".6" stroke="currentColor"/><path d="M95 160q5-6 8 0t8 0t5 0" stroke="currentColor" fill="none" stroke-width="1"/>`;
  s+=`<ellipse cx="225" cy="86" rx="14" ry="10" fill="var(--bg,#fff)" fill-opacity=".8" stroke="currentColor" stroke-width="1.2"/>`;
  [[205,150],[130,92],[95,115],[250,112],[200,176],[140,172],[268,128],[120,135]].forEach(p=>{s+=`<circle cx="${p[0]}" cy="${p[1]}" r="2.6" fill="currentColor"/>`});
  const lab=(x1,y1,x2,y2,t,sub)=>BA_LN(x1,y1,x2,y2)+BA_T(x2+(x2>200?6:-6),y2+4,t,{a:x2>200?"start":"end",s:11,b:1});
  s+=lab(172,100,330,52,"nucleus")+lab(240,150,330,166,"mitochondrion")+lab(140,92,40,40,"cytoplasm")+lab(105,160,40,196,"mitochondrion").replace(/>mitochondrion/,">mitochondrion");
  s+=lab(300,128,340,108,"cell membrane")+lab(205,150,330,196,"ribosomes")+lab(225,86,340,80,"vacuole");
  return BA_FG("-80 0 520 220",s,"A generalised animal cell. There is no cell wall and no chloroplast. Vacuoles, if present, are small and temporary.","Animal cell showing nucleus, cytoplasm, cell membrane, mitochondria, ribosomes and a small vacuole",560);
};
FIGS.BA_PLANT=()=>{
  let s=`<rect x="40" y="20" width="250" height="190" rx="14" style="fill:var(--good)" fill-opacity=".1" stroke="currentColor" stroke-width="4"/>`;
  s+=`<rect x="47" y="27" width="236" height="176" rx="10" fill="none" stroke="currentColor" stroke-opacity=".6" stroke-width="1.4"/>`;
  s+=`<ellipse cx="190" cy="125" rx="68" ry="55" style="fill:var(--blu)" fill-opacity=".18" stroke="currentColor" stroke-opacity=".7" stroke-dasharray="4 3"/>`;
  s+=`<circle cx="92" cy="170" r="22" style="fill:var(--pur)" fill-opacity=".45" stroke="currentColor" stroke-width="1.6"/><circle cx="96" cy="166" r="6" style="fill:var(--pur)" fill-opacity=".85"/>`;
  [[85,60],[130,48],[250,170],[258,66]].forEach(p=>{s+=`<ellipse cx="${p[0]}" cy="${p[1]}" rx="15" ry="9" style="fill:var(--good)" fill-opacity=".75" stroke="currentColor" stroke-width="1.1"/><path d="M${p[0]-9} ${p[1]}h18" stroke="currentColor" stroke-opacity=".5"/>`});
  s+=`<ellipse cx="62" cy="108" rx="11" ry="6" style="fill:var(--amber)" fill-opacity=".6" stroke="currentColor"/>`;
  [[135,100],[120,150],[160,190],[75,140],[150,75],[270,115]].forEach(p=>{s+=`<circle cx="${p[0]}" cy="${p[1]}" r="2.6" fill="currentColor"/>`});
  const lab=(x1,y1,x2,y2,t)=>BA_LN(x1,y1,x2,y2)+BA_T(x2+(x2>200?6:-6),y2+4,t,{a:x2>200?"start":"end",s:11,b:1});
  s+=lab(290,32,330,28,"cell wall")+lab(283,95,330,92,"cell membrane")+lab(255,125,330,124,"large vacuole")+lab(258,66,330,60,"chloroplast")+lab(96,166,30,200,"nucleus").replace(/text-anchor="end"/,'text-anchor="end"');
  s+=lab(62,108,30,100,"mitochondrion")+lab(135,100,30,60,"cytoplasm")+lab(120,150,30,150,"ribosomes");
  return BA_FG("-80 0 550 222",s,"A generalised plant cell. It has a cellulose cell wall, chloroplasts and a large permanent vacuole.","Plant cell showing cell wall, membrane, large vacuole, chloroplasts, nucleus, mitochondrion and ribosomes",600);
};
FIGS.BA_BACT=()=>{
  let s=`<rect x="50" y="40" width="270" height="140" rx="70" fill="none" stroke="currentColor" stroke-width="5"/>`;
  s+=`<rect x="58" y="48" width="254" height="124" rx="62" style="fill:var(--accent)" fill-opacity=".12" stroke="currentColor" stroke-opacity=".6" stroke-width="1.6"/>`;
  s+=`<path d="M130 110c0-30 40-40 60-20c20 20 -5 45 -25 40c-20 -5 -15 30 5 20c25 -10 45 -35 20 -50c-20 -12 -60 0 -60 30z" stroke="var(--red)" stroke-width="3" fill="none"/>`;
  s+=`<circle cx="245" cy="95" r="9" fill="none" stroke="var(--pur)" stroke-width="2.6"/><circle cx="262" cy="125" r="7" fill="none" stroke="var(--pur)" stroke-width="2.6"/>`;
  [[110,80],[96,115],[150,150],[215,150],[225,70],[285,105],[130,60],[190,62]].forEach(p=>{s+=`<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="currentColor"/>`});
  const lab=(x1,y1,x2,y2,t)=>BA_LN(x1,y1,x2,y2)+BA_T(x2+(x2>200?6:-6),y2+4,t,{a:x2>200?"start":"end",s:11,b:1});
  s+=lab(318,70,350,40,"cell wall")+lab(312,110,350,92,"cell membrane")+lab(262,120,350,144,"plasmid")+lab(160,100,40,32,"circular DNA")+lab(96,115,40,120,"ribosomes")+lab(140,150,40,184,"cytoplasm");
  return BA_FG("-70 0 520 206",s,"A bacterial cell. The DNA is a loop lying free in the cytoplasm, not inside a nucleus. Small rings of DNA called plasmids may also be present.","Bacterial cell with cell wall, membrane, cytoplasm, ribosomes, circular DNA and plasmids",560);
};

/* ---- 2.1 levels and specialised cells ---- */
FIGS.BA_LEVELS=()=>{
  const L=[["Cell","palisade cell","muscle cell"],["Tissue","palisade tissue","muscle tissue"],["Organ","leaf","stomach"],["Organ system","shoot system","digestive system"],["Organism","plant","human"]];
  let s="";
  L.forEach((r,i)=>{const x=6+i*82;s+=BA_BOX(x,10,66,40,[r[0]],{f:"var(--accent)",b:1,s:10,fo:.2});
    s+=BA_T(x+33,72,r[1],{s:9})+BA_T(x+33,100,r[2],{s:9});if(i<4)s+=BA_ARR(x+67,30,x+82,30,"currentColor",1.8)});
  s+=BA_T(2,60,"plant:",{a:"start",s:9,i:1,c:"var(--good)"}).replace('x="2"','x="6"')+BA_T(6,88,"animal:",{a:"start",s:9,i:1,c:"var(--red)"});
  s+=BA_T(210,128,"Each level is made of many of the level before it.",{s:10.5,i:1});
  return BA_FG("0 0 420 138",s,"Levels of organisation from a single cell up to the whole organism, with a plant and an animal example.","Five boxes from cell to tissue, organ, organ system and organism with examples",520);
};
FIGS.BA_SPEC1=()=>{
  let s="";
  /* ciliated */
  s+=`<rect x="26" y="70" width="46" height="76" rx="8" style="fill:var(--accent)" fill-opacity=".22" stroke="currentColor" stroke-width="1.6"/><circle cx="49" cy="116" r="11" style="fill:var(--pur)" fill-opacity=".55" stroke="currentColor"/>`;
  for(let i=0;i<7;i++)s+=`<path d="M${30+i*6.5} 70v-20" stroke="currentColor" stroke-width="1.8"/>`;
  s+=BA_T(49,32,"Ciliated cell",{s:11,b:1})+BA_T(49,166,"cilia move",{s:9.5})+BA_T(49,178,"mucus along",{s:9.5});
  /* root hair */
  s+=`<path d="M170 140V92H182V54Q182 40 190 40Q198 40 198 54V92H210V140z" style="fill:var(--good)" fill-opacity=".22" stroke="currentColor" stroke-width="1.6"/><circle cx="190" cy="118" r="9" style="fill:var(--pur)" fill-opacity=".55" stroke="currentColor"/>`;
  s+=BA_T(190,30,"Root hair cell",{s:11,b:1})+BA_T(190,166,"long hair: large",{s:9.5})+BA_T(190,178,"surface area",{s:9.5});
  /* palisade */
  s+=`<rect x="290" y="46" width="44" height="100" rx="8" style="fill:var(--good)" fill-opacity=".2" stroke="currentColor" stroke-width="1.6"/>`;
  [[300,60],[322,66],[302,84],[324,92],[300,108],[322,116],[310,134]].forEach(p=>{s+=`<ellipse cx="${p[0]}" cy="${p[1]}" rx="6" ry="3.6" style="fill:var(--good)" fill-opacity=".8"/>`});
  s+=BA_T(312,32,"Palisade cell",{s:11,b:1})+BA_T(312,166,"many chloroplasts",{s:9.5})+BA_T(312,178,"for photosynthesis",{s:9.5});
  return BA_FG("0 0 360 186",s,"Three specialised cells: ciliated cell (trachea), root hair cell (root) and palisade mesophyll cell (leaf).","Drawings of a ciliated cell, a root hair cell and a palisade mesophyll cell",480);
};
FIGS.BA_SPEC2=()=>{
  let s="";
  /* neurone */
  s+=`<circle cx="52" cy="70" r="16" style="fill:var(--amber)" fill-opacity=".45" stroke="currentColor" stroke-width="1.6"/><circle cx="52" cy="70" r="5" style="fill:var(--pur)" fill-opacity=".7"/>`;
  s+=`<path d="M40 60L22 44M38 72L16 76M44 83L28 100M64 70H200" stroke="currentColor" stroke-width="2" fill="none"/>`;
  s+=BA_T(110,36,"Neurone",{s:11,b:1})+BA_T(110,104,"long fibre carries",{s:9.5})+BA_T(110,116,"electrical impulses",{s:9.5});
  /* red blood cell */
  s+=`<ellipse cx="270" cy="70" rx="30" ry="30" style="fill:var(--red)" fill-opacity=".45" stroke="currentColor" stroke-width="1.6"/><ellipse cx="270" cy="70" rx="12" ry="12" style="fill:var(--red)" fill-opacity=".25" stroke="currentColor" stroke-opacity=".5"/>`;
  s+=BA_T(270,26,"Red blood cell",{s:11,b:1})+BA_T(270,116,"no nucleus, disc shape",{s:9.5})+BA_T(270,128,"carries oxygen",{s:9.5});
  /* sperm */
  s+=`<ellipse cx="360" cy="190" rx="14" ry="9" style="fill:var(--pur)" fill-opacity=".5" stroke="currentColor" stroke-width="1.5"/><path d="M374 190H392" stroke="currentColor" stroke-width="5"/><path d="M392 190q14 -10 28 0t28 0t28 0" stroke="currentColor" stroke-width="2" fill="none"/>`;
  s+=BA_T(380,168,"Sperm cell",{s:11,b:1})+BA_T(380,222,"tail swims; head carries DNA",{s:9.5});
  /* egg */
  s+=`<circle cx="110" cy="200" r="34" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-dasharray="3 3"/><circle cx="110" cy="200" r="26" style="fill:var(--amber)" fill-opacity=".25" stroke="currentColor" stroke-width="1.6"/><circle cx="110" cy="200" r="7" style="fill:var(--pur)" fill-opacity=".7"/>`;
  s+=BA_T(110,152,"Egg cell",{s:11,b:1})+BA_T(110,248,"large, food store",{s:9.5})+BA_T(110,260,"fertilised by a sperm",{s:9.5});
  return BA_FG("0 0 480 270",s,"Four more specialised cells: neurone, red blood cell, egg cell and sperm cell.","Drawings of a neurone, a red blood cell, an egg cell and a sperm cell",560);
};

/* ---- 2.2 size of specimens ---- */
FIGS.BA_MAG=()=>{
  let s=`<path d="M170 20L270 190H70z" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M110 120H230M170 120V190" stroke="currentColor" stroke-width="2.4"/>`;
  s+=BA_T(170,90,"I",{s:26,b:1,c:"var(--accent)"})+BA_T(120,170,"A",{s:24,b:1,c:"#B77A12"})+BA_T(222,170,"M",{s:24,b:1,c:"var(--red)"});
  s+=BA_T(300,64,"I = image size",{a:"start",s:11.5,b:1})+BA_T(300,84,"A = actual size",{a:"start",s:11.5,b:1})+BA_T(300,104,"M = magnification",{a:"start",s:11.5,b:1});
  s+=BA_T(300,134,"M = I ÷ A",{a:"start",s:11.5})+BA_T(300,152,"I = M × A",{a:"start",s:11.5})+BA_T(300,170,"A = I ÷ M",{a:"start",s:11.5});
  return BA_FG("0 0 440 202",s,"Cover the quantity you want and read off the calculation. Image and actual size must be in the same units.","Formula triangle for magnification with image size on top and actual size and magnification below",460);
};
FIGS.BA_SCALE=()=>{
  let s=`<ellipse cx="150" cy="82" rx="102" ry="50" style="fill:var(--accent)" fill-opacity=".18" stroke="currentColor" stroke-width="2.2"/><circle cx="170" cy="78" r="18" style="fill:var(--pur)" fill-opacity=".45" stroke="currentColor"/>`;
  s+=`<path d="M48 82H252M48 74v16M252 74v16" stroke="var(--red)" stroke-width="2" fill="none"/>`;
  s+=BA_T(150,70,"image length = 45 mm",{s:10.5,b:1,c:"var(--red)"}).replace('y="70"','y="108"');
  s+=`<rect x="30" y="150" width="240" height="22" fill="none" stroke="currentColor"/>`;
  for(let i=0;i<=24;i++){const x=30+i*10;s+=`<path d="M${x} 150v${i%5===0?12:7}" stroke="currentColor"/>`}
  [0,10,20,30,40].forEach((v,i)=>{s+=BA_T(30+i*60,186,v+" mm",{s:9})});
  s+=BA_T(150,22,"Magnification ×900",{s:12,b:1})+BA_T(150,202,"ruler scale (image units, mm)",{s:9.5,i:1});
  return BA_FG("0 0 300 208",s,"Measure the image with a ruler, then divide by the magnification: 45 ÷ 900 = 0.05 mm, which is 50 μm.","A cell drawing with a measured length of 45 millimetres under a ruler and a magnification of times 900",380);
};
FIGS.BA_UNITS=()=>{
  let s=BA_BOX(20,30,110,46,["millimetre","mm"],{f:"var(--accent)",b:1,s:11})+BA_BOX(250,30,110,46,["micrometre","μm"],{f:"var(--amber)",b:1,s:11});
  s+=BA_ARR(132,44,248,44,"var(--accent)",2.4)+BA_T(190,38,"× 1000",{s:12,b:1})+BA_ARR(248,64,132,64,"var(--red)",2.4)+BA_T(190,86,"÷ 1000",{s:12,b:1});
  s+=BA_T(190,112,"1 mm = 1000 μm      1 μm = 0.001 mm",{s:11.5});
  s+=BA_T(190,18,"mm to μm: multiply. μm to mm: divide.",{s:10.5,i:1});
  return BA_FG("0 0 380 122",s,"To change a larger unit to a smaller one the number gets bigger, so multiply.","Arrows showing multiply by 1000 from millimetres to micrometres and divide by 1000 back",440);
};

/* ================= TOPIC 1 ================= */
const BA_L11=L("Characteristics of living organisms","The seven things all living organisms do, with the exact meaning of each term, and how to tell living things from non-living things.",
`<h4>The seven characteristics of living organisms</h4>
<p>Every living organism, from a bacterium to a blue whale, carries out the same seven life processes. A helpful memory aid is <b>MRS GREN</b>. You must be able to give a precise definition of each one.</p>
{{BA_MRS}}
<table><tr><th>Characteristic</th><th>Definition you should learn</th></tr>
<tr><td><b>M</b>ovement</td><td>An action by an organism or part of an organism that causes a change of position or place</td></tr>
<tr><td><b>R</b>espiration</td><td>The chemical reactions in cells that break down nutrient molecules and release energy for metabolism</td></tr>
<tr><td><b>S</b>ensitivity</td><td>The ability to detect and respond to changes in the internal or external environment</td></tr>
<tr><td><b>G</b>rowth</td><td>A permanent increase in size and dry mass</td></tr>
<tr><td><b>R</b>eproduction</td><td>The processes that make more of the same kind of organism</td></tr>
<tr><td><b>E</b>xcretion</td><td>The removal of the waste products of metabolism and substances in excess of requirements</td></tr>
<tr><td><b>N</b>utrition</td><td>The taking in of materials for energy, growth and development</td></tr></table>
<div class="key"><b>Exam tip</b>Respiration is a chemical reaction inside cells. It is not the same as breathing. Do not write "breathing" when a question asks about respiration.</div>
<h4>Movement and sensitivity</h4>
<p><b>Movement</b> does not have to mean walking or swimming. A plant that cannot move its whole body can still move a part of itself, for example a sunflower head turning or a leaf folding. Movement is a change of position or place.</p>
<p><b>Sensitivity</b> means detecting a change (a stimulus) and responding to it. The change can be outside the body, such as light or a hot surface, or inside the body, such as a rise in blood glucose. A pupil getting smaller in bright light is sensitivity. Roots growing downwards is sensitivity too.</p>
<h4>Respiration and nutrition</h4>
<p>Cells need energy for metabolism, which is the sum of all the chemical reactions in the body. <b>Respiration</b> releases that energy from nutrient molecules such as glucose. Nutrition is how the organism obtains those materials.</p>
<ul><li><b>Animals</b> take in food and digest it.</li><li><b>Green plants</b> make their own food by photosynthesis. They take in water, mineral ions and carbon dioxide.</li></ul>
<p>Nutrients provide the energy that respiration releases and the materials needed for growth and development.</p>
<h4>Growth and reproduction</h4>
<p><b>Growth</b> is a permanent increase in size <i>and</i> dry mass. The word "permanent" matters. A person who drinks a litre of water gets heavier for a while but has not grown. Scientists use dry mass, the mass left after all water has been removed, because fresh mass changes with the amount of water in the tissues.</p>
{{BA_GROW}}
<p><b>Reproduction</b> makes more of the same kind of organism. Without it a species would die out when its individuals die.</p>
<h4>Excretion</h4>
<p>Metabolism makes waste products that would be harmful if they built up. <b>Excretion</b> removes them, together with substances in excess of requirements. Examples: carbon dioxide from respiration is removed through the lungs, and urea is removed in urine.</p>
<div class="key"><b>Exam tip</b>Egestion (getting rid of undigested food as faeces) is not excretion because faeces were never made inside the cells by metabolism.</div>
<div class="ex"><b>Worked example</b>A car moves, uses fuel and gives off waste gases. Why is it not alive?<br>It does not grow, reproduce, or show sensitivity in the way living things do, and it does not carry out respiration in cells. Fuel burning in an engine is not the chemical reactions of respiration in cells.</div>`,
I("How can you tell whether something is alive?",
`<ol><li>Look at the list of items your teacher gives you: a seed, a pebble, a candle flame, a robot, a mushroom and a car.</li><li>For each item, decide which of the seven characteristics it shows. Use a table with MRS GREN down the side.</li><li>Decide which items are alive and which are not, and write a one-sentence reason for each.</li><li>Find an item that was hard to decide. Explain what evidence you would need to decide.</li></ol>`,
`<p><b>Is a seed alive?</b> Place germinating peas in one vacuum flask and boiled, cooled peas in a second flask. Put a thermometer in each and plug the neck with cotton wool. Record the temperature of each flask every ten minutes and then again after a day.</p><ol><li>Predict which flask warms up and say why.</li><li>Write which life process causes the temperature change.</li><li>State why the boiled peas make a good control.</li><li>Suggest how you could test for the gas given off using limewater.</li></ol>`,
["https://www.bbc.co.uk/bitesize/topics/zn77hyc","BBC Bitesize: Characteristics of living things (optional extra reading)"]),
[["List the seven characteristics of living organisms.","Movement, respiration, sensitivity, growth, reproduction, excretion, nutrition (7 marks, one for each).",7],
["Define growth.","A permanent (1) increase in size and dry mass (1).",2],
["State the difference between excretion and egestion.","Excretion removes waste made by metabolism in cells (1). Egestion removes undigested food that never entered cells (1).",2],
["A scientist measures the growth of a seedling. Explain why dry mass is a better measure than fresh mass.","Fresh mass changes with the amount of water in the plant (1). Dry mass shows the permanent increase in the amount of living material (1).",2],
["A student says a burning candle is alive because it uses oxygen, gives off waste and grows smaller then larger. State two reasons why the candle is not alive.","Any two from: it does not respire in cells, it does not reproduce, it does not show sensitivity, it does not grow by increasing dry mass (2).",2]],
[M("Which term describes a permanent increase in size and dry mass?",["Movement","Growth","Excretion","Nutrition"],1,"That is the definition of growth."),
M("Which process releases energy from nutrient molecules in cells?",["Breathing","Respiration","Excretion","Digestion"],1,"Respiration releases energy for metabolism."),
M("Which is an example of sensitivity?",["A tree getting taller","A pupil getting smaller in bright light","Urea leaving in urine","A seed making a copy of itself"],1,"Detecting a change and responding is sensitivity."),
M("Which is excretion?",["Removing faeces","Removing carbon dioxide from the lungs","Taking in food","A plant turning towards light"],1,"Carbon dioxide is a waste product of metabolism."),
T("Name the characteristic of living organisms that makes more of the same kind of organism.",["reproduction"],"Reproduction."),
T("What name is given to the sum of all the chemical reactions in the body?",["metabolism"],"Metabolism."),
N("How many characteristics of living organisms are listed in MRS GREN?",7,"","Seven: movement, respiration, sensitivity, growth, reproduction, excretion and nutrition."),
M("Why is dry mass used when measuring growth?",["Dry mass is easier to measure","Fresh mass changes with water content","Plants have no fresh mass","Dry mass includes the water"],1,"Water content varies, so fresh mass is not a reliable measure of growth.")],
[["What does MRS GREN stand for?","Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition."],
["Define movement.","An action by an organism or part of an organism causing a change of position or place."],
["Define respiration.","The chemical reactions in cells that break down nutrient molecules and release energy for metabolism."],
["Define sensitivity.","The ability to detect and respond to changes in the internal or external environment."],
["Define growth.","A permanent increase in size and dry mass."],
["Define reproduction.","The processes that make more of the same kind of organism."],
["Define excretion.","Removal of the waste products of metabolism and substances in excess of requirements."],
["Define nutrition.","Taking in of materials for energy, growth and development."],
["Why is egestion not excretion?","Faeces are undigested food that never entered cells, so they are not products of metabolism."]]);

const BA_L12=L("Classification","Grouping organisms by shared features, what a species is, the binomial naming system, dichotomous keys, and how DNA evidence reflects evolutionary relationships.",
`<h4>Why organisms are classified</h4>
<p>There are millions of different kinds of living organisms. Scientists sort them into groups using the features that they share. This makes it easier to study them, to identify an unknown organism and to see how organisms are related.</p>
<p>The basic unit of classification is the <b>species</b>. A species is a group of organisms that can reproduce to produce <b>fertile offspring</b>. A horse and a donkey can mate, but their offspring (a mule) is sterile, so horses and donkeys are different species.</p>
<h4>The binomial system of naming</h4>
<p>Common names vary from place to place, and one name can mean different animals in different countries. So scientists use an internationally agreed <b>binomial system</b>. The scientific name has two parts: the <b>genus</b> (a group of closely related species) and the <b>species</b>. For example, humans are <i>Homo sapiens</i>.</p>
{{BA_BINOM}}
<ul><li>The genus starts with a capital letter and the species with a lower case letter.</li><li>The name is printed in italics. When you write it by hand, underline each word separately.</li><li>Lions and tigers are in the same genus (<i>Panthera</i>) because they are closely related.</li></ul>
<h4>Dichotomous keys</h4>
<p>A <b>dichotomous key</b> is a tool for identifying organisms. "Dichotomous" means "branching into two". At each step you are given a pair of statements or a question with two answers, and each answer takes you to the next step or to the name of the organism.</p>
{{BA_KEY}}
<p><b>To build a key:</b></p>
<ol><li>Choose a feature you can see clearly and that splits the group into two, for example "has legs" or "does not have legs".</li><li>Use features that are definite (number of legs) not vague ones (large or small).</li><li>Repeat on each group until every organism has its own name at the end of a branch.</li></ol>
<div class="key"><b>Exam tip</b>Always use features that you can observe on the organism. Avoid features such as "dangerous" or "lives in water" if you cannot see them.</div>
<h4>Classification and evolutionary relationships <i>(Extended only)</i></h4>
<p>Modern classification systems aim to reflect <b>evolutionary relationships</b>. Organisms that share a more recent common ancestor are placed closer together.</p>
<p>The sequence of bases in <b>DNA</b> is used to classify organisms. Organisms that share a more recent ancestor have base sequences in their DNA that are <b>more similar</b> than organisms that share only a distant ancestor. This is a more reliable method than comparing only the way organisms look, because unrelated organisms can look alike.</p>
{{BA_TREE}}
<div class="ex"><b>Worked example</b>Species X and species Y have DNA that is 98% similar. Species X and species Z have DNA that is 85% similar. Which two are more closely related?<br>X and Y, because their base sequences are more similar, which shows they share a more recent common ancestor.</div>`,
I("How can we name and identify unknown organisms so everyone agrees?",
`<ol><li>Choose six objects from the classroom bag, such as leaves, shells, pasta shapes or seeds.</li><li>Write down three features of each that someone else could check without asking you.</li><li>Pick the feature that splits your six objects most evenly into two groups.</li><li>Decide how you would continue splitting each group until all six are separated.</li></ol>`,
`<p><b>Build and test a key.</b> Working in pairs, make a dichotomous key for six local invertebrates or six leaves collected from the school grounds. Take care to wash your hands after handling soil or animals, and return organisms where you found them.</p><ol><li>Write the key in a table with Step, Question and Go to.</li><li>Swap keys with another pair and use their key to identify their specimens.</li><li>Note any step that was unclear and rewrite it so it is definite.</li></ol>`,
["https://www.bbc.co.uk/bitesize/topics/zjbx9j6","BBC Bitesize: Classification (optional extra reading)"]),
[["Define the term species.","A group of organisms (1) that can reproduce to produce fertile offspring (1).",2],
["The scientific name of the domestic dog is Canis familiaris. State the genus and the species.","Genus: Canis (1). Species: familiaris (1).",2],
["State two rules for writing a scientific name.","Any two: two parts, genus then species (1); genus has a capital letter (1); species has a lower case letter (1); written in italics or underlined (1).",2],
["Describe how a dichotomous key is used to identify an organism.","Answer a series of paired questions about observable features (1). Each answer leads to the next question or to a name (1).",2],
["(Extended) Explain how DNA base sequences can be used to show how closely two species are related.","More similar base sequences (1) show a more recent common ancestor (1) so the species are more closely related (1).",3]],
[M("A mule is the offspring of a horse and a donkey and is sterile. What does this show?",["Horses and donkeys are the same species","Horses and donkeys are different species","Mules are plants","Mules are a genus"],1,"Different species cannot produce fertile offspring."),
M("Which is the correct way to write a scientific name?",["homo Sapiens","Homo sapiens","HOMO SAPIENS","homo sapiens"],1,"Genus has a capital letter and the species does not."),
T("What name is given to the two-part naming system used by scientists?",["binomial"],"Binomial system."),
M("What is a dichotomous key?",["A list of all species","A series of paired questions used to identify organisms","A family tree","A table of DNA"],1,"Each step has two choices."),
T("Which group is made of closely related species and gives the first part of a scientific name?",["genus"],"The genus."),
M("(Extended) Two species share a recent common ancestor. Their DNA base sequences will be:",["Very different","More similar","Identical","Unrelated"],1,"More recent ancestor means more similar DNA."),
N("How many parts are in a binomial name?",2,"","Genus and species."),
M("Why is a species defined by fertile offspring?",["Fertile offspring show the organisms can interbreed","All species can breed","Fertile means large","It shows the organism is a plant"],0,"Only members of the same species can produce fertile offspring.")],
[["Define a species.","A group of organisms that can reproduce to produce fertile offspring."],
["What is the binomial system?","An internationally agreed way of naming species using two parts, the genus and the species."],
["How is a scientific name written?","Italics (or underlined by hand), genus with a capital letter, species with a lower case letter."],
["What is a dichotomous key?","A key made of paired statements or questions used to identify organisms."],
["Why use features that can be seen in a key?","So anyone can check them and get the same answer."],
["(Extended) What do classification systems aim to reflect?","Evolutionary relationships."],
["(Extended) How is DNA used in classification?","Species with more similar base sequences share a more recent ancestor."],
["Why can a mule not be classed as a species?","It is sterile, so it cannot reproduce to produce fertile offspring."]]);

const BA_L13=L("Features of organisms","The features used to place organisms into kingdoms and groups: animals and plants, vertebrates and arthropods, the five kingdoms, ferns, flowering plants and viruses.",
`<h4>Animals and plants</h4>
<p>The two kingdoms you must know well are the animal kingdom and the plant kingdom.</p>
<table><tr><th>Feature</th><th>Animals</th><th>Plants</th></tr>
<tr><td>Number of cells</td><td>Many cells (multicellular)</td><td>Many cells (multicellular)</td></tr>
<tr><td>Cell wall</td><td>No</td><td>Yes, made of cellulose</td></tr>
<tr><td>Chloroplasts</td><td>No</td><td>Yes, so they can make their own food by photosynthesis</td></tr>
<tr><td>Nutrition</td><td>Feed on other organisms</td><td>Make their own food</td></tr>
<tr><td>Food store</td><td>Glycogen</td><td>Starch (and sucrose)</td></tr>
<tr><td>Movement</td><td>Most can move from place to place</td><td>Cannot move from place to place</td></tr></table>
<h4>Vertebrates</h4>
<p>Animals with a backbone are <b>vertebrates</b>. There are five main groups.</p>
<table><tr><th>Group</th><th>Main features</th></tr>
<tr><td>Mammals</td><td>Body covered in hair or fur; young develop in the uterus and feed on milk from mammary glands; external ears (pinna) in most</td></tr>
<tr><td>Birds</td><td>Feathers; wings; a beak with no teeth; lay eggs with hard shells</td></tr>
<tr><td>Reptiles</td><td>Dry, scaly skin; lay eggs with soft, leathery shells on land; body temperature changes with the surroundings</td></tr>
<tr><td>Amphibians</td><td>Moist, smooth skin without scales; lay soft eggs (spawn) in water; young (tadpoles) live in water and adults live mostly on land</td></tr>
<tr><td>Fish</td><td>Scales; fins; gills for gas exchange; lay soft eggs in water</td></tr></table>
<h4>Arthropods</h4>
<p>Arthropods have jointed legs and a hard outer covering called an exoskeleton. The four groups you must know are insects, arachnids, myriapods and crustaceans.</p>
{{BA_ARTHRO}}
<div class="key"><b>Exam tip</b>Count the legs and the body regions. A spider has eight legs and two body regions, so it is an arachnid not an insect.</div>
<h4>The five kingdoms <i>(Extended only)</i></h4>
<p>All organisms can be placed into one of five kingdoms: animal, plant, fungus, prokaryote and protoctist.</p>
{{BA_KINGDOMS}}
<p><b>Fungi</b> have cell walls made of chitin, not cellulose, and have no chloroplasts. They feed by releasing enzymes and absorbing the digested food. Most are made of threads called hyphae. Yeast is a single-celled fungus.</p>
<h4>Ferns and flowering plants <i>(Extended only)</i></h4>
<p>The plant kingdom can be divided into groups. You need to know <b>ferns</b> and <b>flowering plants</b>. Flowering plants are split into <b>monocotyledons</b> and <b>dicotyledons</b>.</p>
<table><tr><th>Group</th><th>Features</th></tr>
<tr><td>Ferns</td><td>Have roots, stems and leaves (fronds); no flowers; reproduce by spores</td></tr>
<tr><td>Flowering plants</td><td>Have roots, stems and leaves; make flowers and reproduce by seeds that form inside the fruit</td></tr>
<tr><td>Monocotyledons</td><td>One seed leaf (cotyledon); leaves are long and narrow with parallel veins (for example grass, maize)</td></tr>
<tr><td>Dicotyledons</td><td>Two seed leaves; leaves are broad with a network of veins (for example bean, oak)</td></tr></table>
<h4>Viruses <i>(Extended only)</i></h4>
<p>Viruses are not placed in any of the five kingdoms. A virus is much smaller than a bacterium. It has just two parts: a <b>protein coat</b> and <b>genetic material</b> (DNA or RNA). Viruses can reproduce only inside the cells of a host.</p>
{{BA_VIRUS}}`,
I("What features would you use to decide where an organism belongs?",
`<ol><li>Look at the photographs of eight animals your teacher gives you.</li><li>Decide whether each is a vertebrate or an invertebrate and write the single feature you used.</li><li>Sort the vertebrates into the five groups and write the two most useful features for each group.</li><li>Choose one animal that does not fit neatly and explain why.</li></ol>`,
`<p><b>Hunt for arthropods.</b> Examine pooter or pitfall samples or large photographs of small animals. Use a hand lens. Do not touch living animals with bare hands and wash your hands afterwards.</p><ol><li>For each animal count the pairs of legs and the body regions.</li><li>Place it in insect, arachnid, myriapod or crustacean.</li><li>Record your results in a table and write the feature that decided each one.</li><li>Draw one organism and label the features that show its group.</li></ol>`,
["https://www.bbc.co.uk/bitesize/topics/z9hs34j","BBC Bitesize: Classification of living things (optional extra reading)"]),
[["State two features that animal cells have and plant cells do not.","Any two: animals feed on other organisms (1), no cell wall (1), no chloroplasts (1).",2],
["Name the group of vertebrates with dry, scaly skin and leathery eggs.","Reptiles (1).",1],
["A spider has eight legs and two body regions. Name its group and give one more feature of the group.","Arachnid (1). No antennae or hard shell (1).",2],
["(Extended) State two features of a fungus.","Any two: cell wall made of chitin (1), no chloroplasts (1), feeds by absorbing nutrients (1), body made of hyphae (1).",2],
["(Extended) Describe the structure of a virus.","A protein coat (1) surrounding genetic material (1).",2]],
[M("Which group of vertebrates has feathers and lays hard-shelled eggs?",["Mammals","Birds","Reptiles","Fish"],1,"Birds."),
M("An animal has six legs and three body regions. It is:",["An arachnid","An insect","A crustacean","A myriapod"],1,"Three pairs of legs and three regions."),
T("Name the group of vertebrates that has moist skin and lays its eggs in water.",["amphibian","amphibians"],"Amphibians."),
M("Which feature do ALL plants have?",["Cell wall made of cellulose","Hair","Feathers","Spores only"],0,"Plant cells have cellulose cell walls."),
M("(Extended) What is the cell wall of a fungus made of?",["Cellulose","Chitin","Protein","Starch"],1,"Chitin."),
M("(Extended) A leaf has parallel veins. The plant is most likely:",["A dicotyledon","A monocotyledon","A fern","A moss"],1,"Monocots have parallel veins."),
N("How many pairs of legs does an insect have?",3,"","An insect has three pairs of legs."),
T("(Extended) Name the two parts of a virus.",["protein coat and genetic material","protein and dna","coat"],"A protein coat and genetic material.")],
[["Name the five groups of vertebrates.","Mammals, birds, reptiles, amphibians and fish."],
["Name the four groups of arthropods.","Insects, arachnids, myriapods and crustaceans."],
["Features of insects","Three pairs of legs, three body regions, usually wings."],
["Features of arachnids","Four pairs of legs, two body regions, no antennae."],
["Features of mammals","Hair or fur, mammary glands, young develop in the uterus."],
["(Extended) The five kingdoms","Animal, plant, fungus, prokaryote and protoctist."],
["(Extended) Monocotyledon features","One seed leaf, narrow leaves with parallel veins."],
["(Extended) Dicotyledon features","Two seed leaves, broad leaves with network of veins."],
["(Extended) Features of a virus","Protein coat and genetic material only."]]);

const BA_Q1=[
M("Which of these is NOT a characteristic of living organisms?",["Nutrition","Excretion","Dissolving","Sensitivity"],2,"Dissolving is not one of the seven characteristics."),
T("What is the name for the removal of waste products of metabolism?",["excretion"],"Excretion."),
M("What is the scientific name of humans?",["Homo sapiens","Homo Sapiens","homo sapiens","Sapiens homo"],0,"Genus with a capital, species in lower case."),
M("A bird has which feature?",["Fur","Feathers","Scales","Moist skin"],1,"Birds have feathers."),
N("How many pairs of legs does a spider have?",4,"","Arachnids have four pairs of legs."),
M("Which group is a crustacean?",["Spider","Housefly","Crab","Millipede"],2,"A crab is a crustacean."),
M("(Extended) The cell wall of a fungus is made of:",["Cellulose","Chitin","Protein","Glycogen"],1,"Chitin."),
M("(Extended) Which pair are more closely related?",["Two species whose DNA is 99% similar","Two species whose DNA is 70% similar","Two with different shapes","Two in different habitats"],0,"More similar DNA means a more recent ancestor.")];

const BA_PP1=[
P("Characteristics of living organisms",5,"<p>All living organisms show the same characteristics.</p><ol type='a'><li>Define the term <b>growth</b>. [2]</li><li>A seed is placed on damp cotton wool. It develops a root that grows downwards. Name the characteristic of living organisms shown by the root growing downwards. [1]</li><li>Explain the difference between excretion and egestion. [2]</li></ol>",
["(a) A permanent (1) increase in size and dry mass (1).","(b) Sensitivity (1).","(c) Excretion is the removal of waste made by metabolism (1). Egestion is the removal of undigested food (1)."],"Hub exam-style question (written for this hub), Topic 1"),
P("Scientific names and species",5,"<p>The scientific names of three animals are: <i>Panthera leo</i> (lion), <i>Panthera tigris</i> (tiger) and <i>Felis catus</i> (domestic cat).</p><ol type='a'><li>State the name of the system used to give scientific names. [1]</li><li>State the genus of the lion. [1]</li><li>Explain which two animals are most closely related. [2]</li><li>Give one reason why scientists use scientific names rather than common names. [1]</li></ol>",
["(a) Binomial system (1).","(b) Panthera (1).","(c) Lion and tiger (1) because they are in the same genus (1).","(d) Scientific names are internationally agreed so everyone uses the same name (1)."],"Hub exam-style question (written for this hub), Topic 1"),
P("Dichotomous key",6,"<p>A key is used to identify four animals.</p><ol><li>Does the animal have legs? If yes go to 2. If no go to 3.</li><li>Does the animal have six legs? If yes it is an <b>ant</b>. If no it is a <b>spider</b>.</li><li>Does the animal have a shell? If yes it is a <b>snail</b>. If no it is an <b>earthworm</b>.</li></ol><ol type='a'><li>Use the key to identify an animal with no legs and no shell. [1]</li><li>Use the key to identify an animal with eight legs. [1]</li><li>Describe how a dichotomous key works. [2]</li><li>A student adds a fifth animal, a beetle, to the key. State where it would be added and one question that would separate it from the ant. [2]</li></ol>",
["(a) Earthworm (1).","(b) Spider (1).","(c) A series of paired questions (1) each with two answers that lead to the next question or a name (1).","(d) After the statement 'six legs' (1). For example 'Does it have hard wing cases?' (1)."],"Hub exam-style question (written for this hub), Topic 1"),
P("Vertebrates and arthropods",7,"<p>A student examines three animals.</p><table><tr><th>Animal</th><th>Features</th></tr><tr><td>A</td><td>Feathers, wings, hard-shelled eggs</td></tr><tr><td>B</td><td>Three body regions, three pairs of legs, antennae</td></tr><tr><td>C</td><td>Moist skin, eggs laid in water, adult has four legs</td></tr></table><ol type='a'><li>Name the group each animal belongs to. [3]</li><li>State one more feature of animal B's group that is visible on the outside of the animal. [1]</li><li>(Extended) Describe the structure of a virus and explain why viruses are not placed in a kingdom with these animals. [3]</li></ol>",
["(a) A bird (1), B insect (1), C amphibian (1).","(b) Usually has wings, or a hard outer covering (exoskeleton) (1).","(c) A protein coat (1) around genetic material (1). A virus is not made of cells and cannot carry out the life processes by itself (1)."],"Hub exam-style question (written for this hub), Topic 1")];


/* ================= TOPIC 2 ================= */
const BA_L21=L("Cell structure","The structure and function of the parts of plant, animal and bacterial cells, and how to compare them.",
`<h4>Animal and plant cells</h4>
<p>All living organisms are made of cells, and new cells are produced by the division of existing cells. Cells are far too small to see without a microscope, but they have a common set of parts that you need to be able to recognise and explain.</p>
{{BA_ANIMAL}}
<h4>What each part does</h4>
<table><tr><th>Structure</th><th>Function</th><th>In animal cell</th><th>In plant cell</th></tr>
<tr><td>Cell membrane</td><td>Controls what enters and leaves the cell</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Cytoplasm</td><td>Jelly-like liquid where most chemical reactions take place</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Nucleus</td><td>Contains the DNA and controls the activities of the cell</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Mitochondria</td><td>Release energy by aerobic respiration</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Ribosomes</td><td>Make proteins (protein synthesis)</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Cell wall</td><td>Made of cellulose; supports and protects the cell and stops it bursting</td><td>No</td><td>Yes</td></tr>
<tr><td>Chloroplasts</td><td>Contain chlorophyll and carry out photosynthesis</td><td>No</td><td>Yes (green parts)</td></tr>
<tr><td>Vacuole</td><td>Stores cell sap (a solution of sugars, salts and water); pressure of the sap supports the cell</td><td>Small, temporary</td><td>Large, permanent</td></tr></table>
{{BA_PLANT}}
<div class="key"><b>Exam tip</b>The cell wall is outside the cell membrane. The membrane controls movement of substances. The cell wall is fully permeable and does not control anything.</div>
<h4>Comparing plant and animal cells</h4>
<p>Both have a nucleus, cytoplasm, cell membrane, mitochondria and ribosomes. Only plant cells have a <b>cell wall</b>, <b>chloroplasts</b> and a large permanent <b>vacuole</b>. This is why plants can make food by photosynthesis and keep their shape, while animal cells are often irregular.</p>
<h4>Bacterial cells</h4>
<p>Bacteria are single-celled organisms with a simpler structure. A bacterial cell has a cell wall, cell membrane, cytoplasm and ribosomes. It has <b>no nucleus</b>. Its DNA is a single <b>circular chromosome</b> lying free in the cytoplasm, and it often has extra small rings of DNA called <b>plasmids</b>.</p>
{{BA_BACT}}
<table><tr><th>Feature</th><th>Plant cell</th><th>Animal cell</th><th>Bacterial cell</th></tr>
<tr><td>Nucleus</td><td>Yes</td><td>Yes</td><td>No, circular DNA in cytoplasm</td></tr>
<tr><td>Cell wall</td><td>Cellulose</td><td>No</td><td>Yes (not cellulose)</td></tr>
<tr><td>Chloroplasts</td><td>Yes</td><td>No</td><td>No</td></tr>
<tr><td>Plasmids</td><td>No</td><td>No</td><td>Often present</td></tr></table>
<h4>Identifying cells in images</h4>
<p>In diagrams and microscope images, look first for the cell wall and chloroplasts to spot a plant cell, and for a membrane without a wall to spot an animal cell. A cell with no clear nucleus but a loop or ring of DNA is bacterial.</p>
<div class="ex"><b>Worked example</b>A cell has a nucleus, a cell wall and chloroplasts. What type of cell is it, and what do the chloroplasts do?<br>It is a plant cell. The chloroplasts contain chlorophyll and carry out photosynthesis.</div>`,
I("What are cells made of, and how do the parts help the cell?",
`<ol><li>Look at a diagram of a plant cell and an animal cell. List every part you can name.</li><li>Predict the job of each part from its name or shape and write your idea beside it.</li><li>Check your predictions against the notes. Mark any that were wrong.</li><li>Write one question about the cell you cannot yet answer.</li></ol>`,
`<p><b>Look at onion cells.</b> Peel a thin layer from the inside of an onion scale with forceps. Place it on a slide in a drop of iodine solution and lower a cover slip at an angle to avoid trapping bubbles. Focus on low power first.</p><ol><li>Draw three cells using a pencil with a clear outline and label the cell wall, nucleus and cytoplasm.</li><li>Cheek cells (only with teacher approval): swab inside the cheek, smear on a slide and stain with methylene blue. Compare with onion.</li><li>List two differences you see between the two types of cell.</li><li>Explain why chloroplasts are not seen in onion bulb cells.</li></ol><p>Wear eye protection. Iodine and methylene blue stain skin and clothes.</p>`,
["https://phet.colorado.edu/","PhET Interactive Simulations (optional extra)"]),
[["Name the part of a cell that contains DNA and controls its activities.","Nucleus (1).",1],
["State the function of mitochondria.","They release energy (1) by aerobic respiration (1).",2],
["State three structures found in plant cells but not in animal cells.","Cell wall (1), chloroplasts (1), large permanent vacuole (1).",3],
["Describe the structure of a bacterial cell, limited to the DNA.","The DNA is a circular loop (1) in the cytoplasm, not in a nucleus (1). There may also be plasmids (1).",3],
["State the function of ribosomes and of the cell wall in plant cells.","Ribosomes make proteins (1). The cell wall supports the cell and stops it bursting (1).",2]],
[M("Which structure controls what enters and leaves a cell?",["Cell wall","Cell membrane","Vacuole","Nucleus"],1,"The cell membrane."),
M("Where does photosynthesis take place?",["Mitochondria","Chloroplasts","Ribosomes","Nucleus"],1,"Chloroplasts contain chlorophyll."),
T("What is the cell wall of a plant cell made of?",["cellulose"],"Cellulose."),
M("Which structure is found in bacterial cells but NOT in animal cells?",["Ribosomes","Cell wall","Cytoplasm","Cell membrane"],1,"Animal cells have no wall."),
M("Plasmids are:",["Organelles that make proteins","Small rings of DNA","Cell walls","Parts of the nucleus"],1,"Small circular DNA molecules."),
T("What name is given to the solution stored in the vacuole of a plant cell?",["cell sap","sap"],"Cell sap."),
M("Which of these is made at ribosomes?",["Starch","Protein","Water","Cellulose"],1,"Ribosomes make proteins."),
M("A cell has no nucleus. Its DNA is a circular loop. The cell is:",["A plant cell","An animal cell","A bacterial cell","A virus"],2,"Bacterial cells have circular DNA free in the cytoplasm.")],
[["Function of the nucleus","Contains DNA and controls the activities of the cell."],
["Function of mitochondria","Release energy by aerobic respiration."],
["Function of ribosomes","Make proteins."],
["Function of the cell membrane","Controls what enters and leaves the cell."],
["Function of chloroplasts","Photosynthesis (contain chlorophyll)."],
["Function of the cell wall","Made of cellulose; supports the cell and stops it bursting."],
["Function of the vacuole","Stores cell sap; its pressure supports the cell."],
["What is a plasmid?","A small ring of DNA found in bacteria."],
["Where is the DNA in a bacterial cell?","A circular loop free in the cytoplasm."]]);

const BA_L22=L("Levels of organisation and specialised cells","How specialised cells are adapted to their jobs, and how cells, tissues, organs, organ systems and organisms fit together.",
`<h4>Specialised cells</h4>
<p>New cells are made from existing cells by division. As a multicellular organism develops, its cells become <b>specialised</b>: each type has a structure that suits its function. You need to know six examples.</p>
{{BA_SPEC1}}
{{BA_SPEC2}}
<table><tr><th>Cell</th><th>Function</th><th>How it is adapted</th></tr>
<tr><td>Ciliated cell</td><td>Moves mucus in the trachea and bronchi</td><td>Hair-like cilia that beat to sweep mucus and trapped particles upwards</td></tr>
<tr><td>Root hair cell</td><td>Absorption of water and mineral ions</td><td>Long, thin extension that gives a large surface area</td></tr>
<tr><td>Palisade mesophyll cell</td><td>Photosynthesis</td><td>Tall shape and many chloroplasts, packed near the top of the leaf</td></tr>
<tr><td>Neurone</td><td>Conducts electrical impulses</td><td>Very long fibre and branched endings</td></tr>
<tr><td>Red blood cell</td><td>Transports oxygen</td><td>No nucleus and a biconcave disc shape that gives a large surface area and room for haemoglobin</td></tr>
<tr><td>Sperm and egg cells (gametes)</td><td>Reproduction</td><td>Sperm: tail to swim. Egg: large food store and a jelly coat that changes after fertilisation</td></tr></table>
<div class="key"><b>Exam tip</b>When you explain an adaptation, link the feature to the function. "It has a long extension, which gives a large surface area for absorbing water" earns more than just "it has a long extension".</div>
<h4>Levels of organisation</h4>
<p>Cells are the smallest units of living things. Organisms are built in levels.</p>
{{BA_LEVELS}}
<ul><li>A <b>cell</b> is the basic unit of living organisms.</li><li>A <b>tissue</b> is a group of similar cells that work together to do the same job, for example muscle tissue or palisade tissue.</li><li>An <b>organ</b> is a group of different tissues working together as a structure with a particular function, for example the stomach or a leaf.</li><li>An <b>organ system</b> is a group of organs that work together to carry out a major function, for example the digestive system.</li><li>An <b>organism</b> is a whole living thing made of one or more organ systems.</li></ul>
<div class="ex"><b>Worked example</b>The heart is made of cardiac muscle tissue, blood vessels and nerves. Which level of organisation is the heart?<br>An organ, because it is made of several tissues working together.</div>`,
I("How does the shape of a cell help it do its job?",
`<ol><li>Look at the pictures of a root hair cell, a red blood cell and a neurone.</li><li>For each cell write what you think the cell has to do.</li><li>Choose one feature of each cell and explain how it helps.</li><li>Predict what would happen if the cell did not have that feature.</li></ol>`,
`<p><b>Observe and annotate.</b> Use prepared slides or good photographs of at least three specialised cells.</p><ol><li>Draw each cell at the same size and note the magnification.</li><li>Label the features that help with its job.</li><li>Create a table: cell, function, adaptation, how it helps.</li><li>Make a model of one specialised cell using craft materials and explain it to a partner.</li></ol>`,
["https://phet.colorado.edu/","PhET Interactive Simulations (optional extra)"]),
[["State the function of a root hair cell.","Absorption of water and mineral ions (1).",1],
["Describe how a red blood cell is adapted to carry oxygen.","No nucleus so more room for haemoglobin (1). Biconcave disc gives a large surface area (1).",2],
["Name the specialised cell that moves mucus in the trachea.","Ciliated cell (1).",1],
["Define the terms tissue and organ.","Tissue: a group of similar cells (1) with the same function (1). Organ: a group of different tissues (1) working together for a function (1).",4],
["Put these in order from smallest to largest: organ system, cell, organ, tissue.","Cell (1), tissue (1), organ (1), organ system (1).",4]],
[M("Which cell has cilia?",["Palisade cell","Ciliated cell","Red blood cell","Sperm cell"],1,"Ciliated cells have cilia."),
M("Which cell is specialised for conducting electrical impulses?",["Neurone","Root hair","Egg","Red blood cell"],0,"Neurones carry impulses."),
T("Name the cell that absorbs water from the soil.",["root hair cell","root hair"],"Root hair cell."),
M("A group of similar cells that do the same job is called:",["An organ","A tissue","An organism","A system"],1,"Tissue."),
M("The stomach is an example of:",["A tissue","An organ","An organ system","A cell"],1,"An organ."),
M("Why is a palisade cell full of chloroplasts?",["For respiration","For photosynthesis","To make proteins","For movement"],1,"Chloroplasts carry out photosynthesis."),
M("Which has no nucleus?",["Neurone","Mature red blood cell","Egg cell","Sperm cell"],1,"Red blood cells have no nucleus."),
M("The digestive system is an example of:",["An organ","A tissue","An organ system","A cell"],2,"An organ system.")],
[["Function of a ciliated cell","Moves mucus in the trachea and bronchi."],
["Function of a root hair cell","Absorption of water and mineral ions."],
["Function of a palisade mesophyll cell","Photosynthesis."],
["Function of a neurone","Conducts electrical impulses."],
["Function of a red blood cell","Transports oxygen."],
["Function of sperm and egg cells","Reproduction."],
["Define tissue","A group of similar cells working together to do the same job."],
["Define organ","A group of different tissues working together as a structure with a function."],
["Define organ system","A group of organs working together to carry out a major function."]]);

const BA_L23=L("Size of specimens","Using the magnification formula, calculating actual and image sizes, and converting between millimetres and micrometres.",
`<h4>Magnification</h4>
<p>Many biological structures are too small to see with the naked eye, so drawings and photographs are enlarged. <b>Magnification</b> tells you how many times larger the image is than the real object.</p>
<div class="key"><b>Formula</b>magnification = image size ÷ actual size</div>
{{BA_MAG}}
<p>The image size and actual size must be in the <b>same units</b> before you divide. The magnification has no unit, but you write it with a times sign, for example ×400.</p>
<h4>Worked calculations</h4>
<div class="ex"><b>Worked example 1: finding the magnification</b>A drawing of a cell is 36 mm long. The actual cell is 0.04 mm long. What is the magnification?<br>Magnification = 36 ÷ 0.04 = <b>×900</b>.</div>
<div class="ex"><b>Worked example 2: finding the actual size</b>A photograph of a leaf cell is 45 mm wide and the magnification is ×900. What is the actual width?<br>Actual size = image size ÷ magnification = 45 ÷ 900 = <b>0.05 mm</b>.</div>
{{BA_SCALE}}
<div class="ex"><b>Worked example 3: finding the image size</b>A cell with an actual length of 0.02 mm is drawn at ×500. What is the length of the drawing?<br>Image size = 0.02 × 500 = <b>10 mm</b>.</div>
<h4>Measuring the image</h4>
<ol><li>Use a ruler and measure the longest dimension of the structure in millimetres.</li><li>Measure from edge to edge in a straight line.</li><li>If a scale bar is given, measure the bar and use it to work out the scale.</li></ol>
<div class="key"><b>Exam tip</b>Set out your working: write the formula, put in the numbers with units, then give the answer. Marks are given for working even if the final answer is wrong.</div>
<h4>Converting between millimetres and micrometres <i>(Extended only)</i></h4>
<p>Cells are often measured in <b>micrometres</b> (μm). There are 1000 micrometres in one millimetre.</p>
{{BA_UNITS}}
<ul><li>To change mm to μm: multiply by 1000. For example, 0.05 mm = 50 μm.</li><li>To change μm to mm: divide by 1000. For example, 250 μm = 0.25 mm.</li></ul>
<div class="ex"><b>Worked example 4</b>A student measures an image as 24 mm and the actual size as 60 μm. What is the magnification?<br>Convert 60 μm to mm: 60 ÷ 1000 = 0.06 mm. Magnification = 24 ÷ 0.06 = <b>×400</b>.</div>`,
I("How can we work out the real size of something we can only see enlarged?",
`<ol><li>Look at a photograph of a cell with a scale bar.</li><li>Measure the scale bar and the cell in millimetres.</li><li>Predict the real size of the cell using the scale bar.</li><li>Check by calculating with the magnification formula.</li></ol>`,
`<p><b>Measure real cells.</b> Use a printed image of onion cells where the magnification is stated.</p><ol><li>Measure the length of five cells with a ruler in mm.</li><li>Calculate the actual length of each cell using the formula and convert it to micrometres.</li><li>Find the mean size and range.</li><li>Draw one cell at ×200 and check your drawing is the correct size.</li></ol>`,
["https://phet.colorado.edu/","PhET Interactive Simulations (optional extra)"]),
[["State the formula used to calculate magnification.","Magnification = image size ÷ actual size (1).",1],
["A drawing of a cell is 54 mm long and the actual cell is 0.06 mm long. Calculate the magnification.","54 ÷ 0.06 (1) = ×900 (1).",2],
["A cell is 0.04 mm across. A student draws it at ×750. Calculate the width of the drawing in mm.","0.04 × 750 (1) = 30 mm (1).",2],
["(Extended) Convert 0.08 mm to micrometres.","0.08 × 1000 (1) = 80 μm (1).",2],
["(Extended) An image is 36 mm. The magnification is ×600. Calculate the actual size in μm.","36 ÷ 600 = 0.06 mm (1) = 60 μm (1).",2]],
[M("What is the formula for magnification?",["Actual size ÷ image size","Image size ÷ actual size","Image size × actual size","Actual size − image size"],1,"M = I ÷ A."),
N("An image is 60 mm and the actual size is 0.1 mm. What is the magnification?",600,"","60 ÷ 0.1 = 600.",0),
N("A cell is 0.05 mm. The drawing is ×400. What is the drawing length in mm?",20,"mm","0.05 × 400 = 20.",0),
N("An image of 30 mm is magnified ×500. What is the actual size in mm?",0.06,"mm","30 ÷ 500 = 0.06.",0.001),
N("(Extended) Convert 0.2 mm to μm.",200,"μm","0.2 × 1000 = 200.",0),
N("(Extended) Convert 450 μm to mm.",0.45,"mm","450 ÷ 1000 = 0.45.",0.001),
M("Which statement is true?",["Magnification has units of mm","Image and actual size must have the same units","You multiply to find magnification","μm is larger than mm"],1,"Use the same units for the calculation."),
T("What is the symbol for micrometre?",["μm","um"],"μm.")],
[["Magnification formula","Image size ÷ actual size."],
["How do you find actual size?","Image size ÷ magnification."],
["How do you find image size?","Actual size × magnification."],
["Does magnification have units?","No, but it is written ×."],
["Why must units be the same?","Otherwise the ratio is wrong."],
["1 mm = ? μm (Extended)","1000 μm."],
["mm to μm (Extended)","Multiply by 1000."],
["μm to mm (Extended)","Divide by 1000."]]);

const BA_Q2=[
M("Which part of a plant cell is made of cellulose?",["Cell membrane","Cell wall","Nucleus","Vacuole"],1,"The cell wall."),
M("Where is aerobic respiration carried out in a cell?",["Ribosomes","Mitochondria","Nucleus","Cell wall"],1,"Mitochondria."),
T("Name the structure that makes proteins in a cell.",["ribosome","ribosomes"],"Ribosomes."),
M("A bacterial cell differs from an animal cell because it has:",["A nucleus","Circular DNA and a cell wall","Mitochondria in the nucleus","Chloroplasts"],1,"Bacteria have circular DNA free in the cytoplasm and a cell wall."),
M("A group of similar cells working together is a:",["Organ","Tissue","System","Organism"],1,"A tissue."),
N("A cell is 0.04 mm long. A drawing of it is 24 mm long. What is the magnification?",600,"","24 ÷ 0.04 = 600.",0),
M("(Extended) 0.5 mm is the same as:",["5 μm","50 μm","500 μm","5000 μm"],2,"0.5 × 1000 = 500 μm."),
M("Which cell is adapted for absorption by a long extension?",["Root hair cell","Neurone","Red blood cell","Palisade cell"],0,"Root hair cells absorb water and ions.")];

const BA_PP2=[
P("Plant and animal cells",7,"<p>Plant cells and animal cells have some structures in common and some that are different.</p><ol type='a'><li>Name two structures found in both cells. [2]</li><li>Name two structures found only in the plant cell. [2]</li><li>State the function of the mitochondria. [1]</li><li>The plant cell is a palisade cell. Explain why it has many chloroplasts. [2]</li></ol>",
["(a) Any two from nucleus, cell membrane, cytoplasm, mitochondria, ribosomes (2).","(b) Any two from cell wall, chloroplasts, large permanent vacuole (2).","(c) Aerobic respiration, which releases energy (1).","(d) Chloroplasts carry out photosynthesis (1) so the cell can make glucose (1)."],"Hub exam-style question (written for this hub), Topic 2"),
P("Bacterial cell",5,"<p>A bacterial cell has a cell wall, cell membrane, cytoplasm and ribosomes.</p><ol type='a'><li>State where the DNA is found in a bacterial cell. [1]</li><li>State the shape of the main DNA molecule in a bacterial cell. [1]</li><li>Name the small rings of DNA that can pass between bacteria. [1]</li><li>Describe two differences between a bacterial cell and a plant cell. [2]</li></ol>",
["(a) Free in the cytoplasm (1).","(b) Circular (1).","(c) Plasmids (1).","(d) Any two from: bacteria have no nucleus, no chloroplasts, a cell wall not made of cellulose, plasmids, no mitochondria (2)."],"Hub exam-style question (written for this hub), Topic 2"),
P("Specialised cells and organisation",8,"<p>Cells are specialised for particular jobs.</p><ol type='a'><li>Name the cell that has cilia and state its function. [2]</li><li>Describe how a root hair cell is adapted to absorb water. [2]</li><li>Describe how a red blood cell is adapted to transport oxygen. [2]</li><li>The stomach is made of muscle tissue and other tissues. Name the level of organisation of the stomach and state how it differs from a tissue. [2]</li></ol>",
["(a) Ciliated cell (1). Moves mucus in the trachea and bronchi (1).","(b) Long thin extension (1) gives a large surface area (1).","(c) No nucleus (1) and a biconcave shape for more room for haemoglobin and large surface area (1).","(d) Organ (1). It is made of several different tissues working together (1)."],"Hub exam-style question (written for this hub), Topic 2"),
P("Magnification",7,"<p>A student draws a cell seen with a microscope. The drawing is 45 mm long. The actual cell is 0.05 mm long.</p><ol type='a'><li>State the formula for magnification. [1]</li><li>Calculate the magnification of the drawing. [2]</li><li>(Extended) Convert 0.05 mm to micrometres. [1]</li><li>The student draws another cell with an actual length of 80 μm at the same magnification. Calculate the length of the drawing in mm. [3]</li></ol>",
["(a) Magnification = image size ÷ actual size (1).","(b) 45 ÷ 0.05 (1) = ×900 (1).","(c) 50 μm (1).","(d) 80 μm = 0.08 mm (1). 0.08 × 900 (1) = 72 mm (1)."],"Hub exam-style question (written for this hub), Topic 2")];

BSET(1,[BA_L11,BA_L12,BA_L13],BA_Q1,BA_PP1);
BSET(2,[BA_L21,BA_L22,BA_L23],BA_Q2,BA_PP2);
