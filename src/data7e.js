/* ===== Group E: Topic 9 (Metals) and Topic 10 water and air lessons, rebuilt from the teacher's notes (own wording) ===== */
/* ---------- figure helpers (prefixed E_ to avoid clashes) ---------- */
const E_FG=(vb,inner,cap,label,maxw)=>`<figure class="fig"${maxw?` style="max-width:${maxw}px"`:""}><svg viewBox="${vb}" role="img" aria-label="${label}">${inner}</svg><figcaption>${cap}</figcaption></figure>`;
const E_T=(x,y,s,o)=>{o=o||{};return `<text x="${x}" y="${y}" font-size="${o.s||11}" text-anchor="${o.a||"middle"}"${o.b?' font-weight="700"':""}${o.i?' font-style="italic"':""} ${o.c?`style="fill:${o.c}"`:'fill="currentColor"'}>${s}</text>`};
const E_ARR=(x1,y1,x2,y2,col,w)=>{const a=Math.atan2(y2-y1,x2-x1),h=7,c=col||"currentColor";
  return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="${w||2}" fill="none"/><path d="M${x2} ${y2}l${(-h*Math.cos(a-.45)).toFixed(1)} ${(-h*Math.sin(a-.45)).toFixed(1)}M${x2} ${y2}l${(-h*Math.cos(a+.45)).toFixed(1)} ${(-h*Math.sin(a+.45)).toFixed(1)}" stroke="${c}" stroke-width="${w||2}" fill="none" stroke-linecap="round"/>`};
const E_BOX=(x,y,w,h,lines,o)=>{o=o||{};return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" ${o.f?`style="fill:${o.f}"`:'fill="none"'} stroke="currentColor" stroke-opacity=".6" stroke-width="1.4"/>`+lines.map((t,i)=>E_T(x+w/2,y+h/2+4-(lines.length-1)*7+i*14,t,{s:o.s||11,b:i===0&&o.b})).join("")};

/* alloy vs pure metal */
FIGS.E_ALLOY=()=>{
  const row=(x0,y,n,rs,col)=>rs.slice(0,n).map((r,i)=>`<circle cx="${x0+i*28+(rs.off?0:0)}" cy="${y}" r="${r}" style="fill:${col}" fill-opacity=".8" stroke="currentColor" stroke-opacity=".5"/>`).join("");
  let s="";
  const pure=[[12,12,12,12,12],[12,12,12,12,12],[12,12,12,12,12],[12,12,12,12,12]];
  pure.forEach((rs,j)=>{s+=row(34,28+j*28,5,rs,"var(--accent)")});
  const alloy=[[12,12,8,12,12],[12,17,12,12,8],[8,12,12,17,12],[12,12,12,8,12]];
  alloy.forEach((rs,j)=>{rs.forEach((r,i)=>{const big=r>12,small=r<12;s+=`<circle cx="${214+i*28+(j%2?3:-2)}" cy="${28+j*28+(i%2?2:-2)}" r="${r}" style="fill:${big?"var(--bad)":small?"var(--amber,#F2A93B)":"var(--accent)"}" fill-opacity=".85" stroke="currentColor" stroke-opacity=".5"/>`})});
  s+=E_T(90,152,"Pure metal",{b:1,s:12})+E_T(90,167,"same-sized atoms in neat layers",{s:10.5})+E_T(270,152,"Alloy",{b:1,s:12})+E_T(270,167,"different-sized atoms distort the layers",{s:10.5});
  s+=E_ARR(26,12,60,12,"currentColor",1.6)+E_T(80,16,"layers slide easily",{a:"start",s:10,i:1});
  s+=E_ARR(206,12,240,12,"var(--bad)",1.6)+E_T(260,16,"layers are blocked",{a:"start",s:10,i:1});
  return E_FG("0 0 360 176",s,"In a pure metal the layers slide over each other. In an alloy the different-sized atoms make sliding harder, so alloys are usually harder and stronger.","Particle diagram of a pure metal with regular layers next to an alloy with atoms of different sizes that distort the layers",520);
};

/* reactivity ladder (mode: series or extract) */
function E_LADDER(mode){
  const R=[["Potassium","K"],["Sodium","Na"],["Calcium","Ca"],["Magnesium","Mg"],["Aluminium","Al"],["Carbon","C",1],["Zinc","Zn"],["Iron","Fe"],["Hydrogen","H",1],["Copper","Cu"],["Silver","Ag"],["Gold","Au"]];
  const y0=26,h=22;let s=E_T(10,12,"Most reactive",{a:"start",s:11,b:1});
  R.forEach((r,i)=>{const y=y0+i*h,t=i/(R.length-1);
    s+=`<rect x="10" y="${y}" width="150" height="${h-3}" rx="4" ${r[2]?`fill="none" stroke="currentColor" stroke-dasharray="4 3" stroke-opacity=".6"`:`style="fill:var(--bad)" fill-opacity="${(0.85-0.75*t).toFixed(2)}"`}/>`;
    s+=E_T(18,y+h/2+1,`${r[0]} (${r[1]})`,{a:"start",s:11.5,i:r[2],b:!r[2]});
  });
  s+=E_T(10,y0+R.length*h+12,"Least reactive",{a:"start",s:11,b:1});
  const br=(a,b,label,col)=>{const ya=y0+a*h,yb=y0+(b+1)*h-3;let o=`<path d="M168 ${ya}H174V${yb}H168" fill="none" stroke="${col||"currentColor"}" stroke-width="1.8"/>`;
    const lines=label.split("|"),mid=(ya+yb)/2-(lines.length-1)*6;lines.forEach((l,k)=>{o+=E_T(182,mid+4+k*13,l,{a:"start",s:10.5})});return o};
  if(mode==="series"){
    s+=br(0,2,"react with cold water|(violently to gently)");
    s+=br(3,3,"reacts with steam");
    s+=br(4,4,"oxide layer: seems unreactive");
    s+=br(6,7,"react with steam and acid");
    s+=br(9,11,"no reaction with dilute|hydrochloric acid");
  }else{
    s+=br(0,4,"extracted by electrolysis|of the molten compound","var(--bad)");
    s+=br(6,7,"heated with carbon or|carbon monoxide","var(--accent)");
    s+=br(9,11,"found uncombined or|easy to extract");
  }
  return E_FG("0 0 400 310",s,mode==="series"?"The reactivity series. Carbon and hydrogen (dashed) are non-metals placed in the series for comparison.":"The method of extraction depends on position relative to carbon. Higher in the series means harder to extract.",mode==="series"?"The reactivity series of metals with how each group reacts":"The reactivity series showing which extraction method is used for each group of metals",480);
}
FIGS.E_SERIES=()=>E_LADDER("series");
FIGS.E_EXTRACT=()=>E_LADDER("extract");

/* rusting experiment */
FIGS.E_RUST=()=>{
  const tube=(cx,label1,label2,lines)=>{const x=cx-26;let o=`<path d="M${x} 30V150Q${x} 164 ${cx} 164Q${x+52} 164 ${x+52} 150V30" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="${x-3}" y="26" width="58" height="6" rx="2" style="fill:var(--surface2)" stroke="currentColor"/>`;return o+lines+E_T(cx,184,label1,{b:1,s:12})+E_T(cx,198,label2,{s:10.5})};
  const nail=(cx,y)=>`<path d="M${cx-10} ${y}L${cx+14} ${y+50}" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><circle cx="${cx-11}" cy="${y-1}" r="4" fill="currentColor"/>`;
  const water=(cx,y,h)=>`<rect x="${cx-24}" y="${y}" width="48" height="${h}" style="fill:var(--accent)" fill-opacity=".3"/>`;
  let s="";
  s+=tube(70,"1: air and water","rusts",water(70,76,80)+nail(70,92)+`<path d="M${70+6} 120l3 4M${70+10} 128l3 3" stroke="#B5532A" stroke-width="3" stroke-linecap="round"/>`+E_T(70,60,"air",{s:10,i:1}));
  s+=tube(200,"2: boiled water + oil","no rust",water(200,76,80)+`<rect x="176" y="68" width="48" height="8" fill="var(--amber,#F2A93B)" fill-opacity=".7"/>`+nail(200,96)+E_T(200,58,"air-free",{s:10,i:1})+E_T(244,72,"oil",{a:"start",s:10,i:1}));
  s+=tube(330,"3: dry air","no rust",`<rect x="${330-22}" y="132" width="44" height="22" fill="currentColor" fill-opacity=".25"/>`+nail(330,70)+E_T(330,126,"CaCl₂",{s:10})+E_T(330,52,"dry air",{s:10,i:1}));
  return E_FG("0 0 400 206",s,"Only the nail with both air (oxygen) and water rusts. Oil and boiled water remove air. Calcium chloride removes water vapour.","Three test tubes: nail in air and water rusts, nail in boiled water under oil does not rust, nail in dry air over calcium chloride does not rust",520);
};

/* blast furnace */
FIGS.E_BLAST=()=>{
  let s=`<defs><linearGradient id="e_bf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F2A93B" stop-opacity=".15"/><stop offset="1" stop-color="#D9482B" stop-opacity=".6"/></linearGradient></defs>`;
  s+=`<path d="M130 40H230L252 210L262 290H98L108 210Z" fill="url(#e_bf)" stroke="currentColor" stroke-width="2"/>`;
  s+=`<path d="M108 262H252" stroke="currentColor" stroke-opacity=".5" stroke-dasharray="4 3"/><rect x="109" y="272" width="142" height="16" style="fill:var(--accent)" fill-opacity=".45"/><rect x="104" y="256" width="152" height="16" fill="currentColor" fill-opacity=".14"/>`;
  s+=E_T(180,268,"molten slag",{s:10})+E_T(180,283,"molten iron",{s:10,b:1});
  s+=E_ARR(180,6,180,38,"currentColor",2)+E_T(180,4,"",{})+E_T(246,14,"iron ore (haematite),",{a:"start",s:10.5})+E_T(246,27,"coke and limestone in",{a:"start",s:10.5});
  s+=E_ARR(250,52,300,36,"var(--bad)",1.6)+E_T(304,34,"waste gases",{a:"start",s:10.5});
  s+=E_ARR(40,214,100,222,"var(--bad)",2.2)+E_ARR(40,244,102,240,"var(--bad)",2.2)+E_T(36,206,"hot air in",{a:"start",s:11,b:1});
  s+=E_ARR(262,280,314,280,"currentColor",1.8)+E_T(318,284,"tap-off",{a:"start",s:10.5});
  s+=E_T(180,62,"cooler",{s:10,i:1})+E_T(180,238,"hottest",{s:10,i:1});
  /* reactions */
  const L=(y,x,t)=>`<path d="M${x} ${y}H${x+14}" stroke="currentColor" stroke-opacity=".5"/>`;
  s+=E_T(268,100,"CaCO₃ → CaO + CO₂",{a:"start",s:10.5})+E_T(268,114,"Fe₂O₃ + 3CO → 2Fe + 3CO₂",{a:"start",s:10.5,b:1});
  s+=E_T(268,170,"CO₂ + C → 2CO",{a:"start",s:10.5})+E_T(268,184,"CaO + SiO₂ → CaSiO₃ (slag)",{a:"start",s:10.5});
  s+=E_T(268,232,"C + O₂ → CO₂ (heat)",{a:"start",s:10.5,b:1});
  s+=`<path d="M236 100H264M242 170H264M250 232H264" stroke="currentColor" stroke-opacity=".5"/>`;
  return E_FG("0 0 480 300",s,"The blast furnace. Carbon monoxide made from coke reduces iron(III) oxide. Limestone removes sandy impurities as slag.","Diagram of a blast furnace with raw materials entering at the top, hot air at the bottom, and molten slag and iron collecting at the base",560);
};

/* aluminium electrolysis cell */
FIGS.E_ALCELL=()=>{
  let s=`<rect x="90" y="60" width="240" height="130" rx="4" fill="none" stroke="currentColor" stroke-width="3"/>`;
  s+=`<rect x="96" y="66" width="228" height="118" fill="currentColor" fill-opacity=".18"/>`;
  s+=`<rect x="104" y="80" width="212" height="94" style="fill:var(--bad)" fill-opacity=".22"/>`;
  s+=`<rect x="104" y="156" width="212" height="18" style="fill:var(--accent)" fill-opacity=".55"/>`;
  s+=[130,190,250].map(x=>`<rect x="${x}" y="28" width="38" height="92" fill="currentColor" fill-opacity=".7"/>`).join("");
  s+=`<path d="M149 28V10H269V28" fill="none" stroke="currentColor" stroke-width="2"/><path d="M96 120V14H60" fill="none" stroke="currentColor" stroke-width="2"/>`;
  s+=E_T(209,6,"+ (anodes)",{s:11,b:1})+E_T(56,10,"− (cathode)",{a:"end",s:11,b:1});
  s+=[142,202,262].map(x=>`<circle cx="${x}" cy="130" r="2.6" fill="currentColor" fill-opacity=".8"/><circle cx="${x+10}" cy="140" r="2.6" fill="currentColor" fill-opacity=".8"/>`).join("");
  s+=E_T(338,50,"graphite anodes:",{a:"start",s:10.5})+E_T(338,63,"O²⁻ → O₂ + 4e⁻",{a:"start",s:10.5,b:1})+E_T(338,76,"oxygen burns the carbon",{a:"start",s:10})+E_T(338,88,"anodes, giving CO₂",{a:"start",s:10});
  s+=E_T(338,128,"molten Al₂O₃ dissolved",{a:"start",s:10.5})+E_T(338,141,"in molten cryolite",{a:"start",s:10.5});
  s+=E_T(338,172,"molten aluminium collects:",{a:"start",s:10.5})+E_T(338,185,"Al³⁺ + 3e⁻ → Al",{a:"start",s:10.5,b:1});
  s+=E_T(209,210,"steel container with graphite lining (the cathode)",{s:10.5,i:1});
  s+=`<path d="M330 176H350" stroke="currentColor" stroke-opacity=".5"/>`;
  return E_FG("0 0 520 220",s,"Electrolysis of aluminium oxide. Aluminium forms at the lined cathode. The graphite anodes wear away and must be replaced.","Diagram of an electrolysis cell for aluminium with graphite anodes at the top, molten electrolyte, and molten aluminium collecting at the lined bottom",600);
};

/* water tests */
FIGS.E_WATERTEST=()=>{
  const sw=(x,y,col,label)=>`<rect x="${x}" y="${y}" width="70" height="46" rx="6" style="fill:${col}" stroke="currentColor" stroke-opacity=".6"/>`+E_T(x+35,y+64,label,{s:10.5});
  let s=E_T(125,16,"Copper(II) sulfate",{b:1,s:12})+sw(20,28,"#FFFFFF","anhydrous: white")+E_ARR(98,50,152,50,"var(--accent)",2.2)+E_T(125,43,"+ water",{s:10.5,i:1})+sw(158,28,"#3C84D4","hydrated: blue");
  s+=E_T(425,16,"Cobalt(II) chloride",{b:1,s:12})+sw(320,28,"#3E6FD0","anhydrous: blue")+E_ARR(398,50,452,50,"var(--accent)",2.2)+E_T(425,43,"+ water",{s:10.5,i:1})+sw(458,28,"#F2A7C0","hydrated: pink");
  return E_FG("0 0 560 118",s,"Two tests for water. Both anhydrous solids change colour when water is added. Neither test shows that the water is pure.","Colour changes: white anhydrous copper sulfate turns blue, blue anhydrous cobalt chloride turns pink in the presence of water",600);
};

/* water treatment flow */
FIGS.E_TREAT=()=>{
  const box=(x,y,t1,t2,hl)=>E_BOX(x,y,118,56,[t1,t2],{b:1,s:10.5,f:hl?"var(--surface2)":undefined});
  let s=box(8,10,"River or lake","(untreated)")+E_ARR(128,38,150,38)+box(152,10,"1 Sedimentation","solids settle",1)+E_ARR(272,38,294,38)+box(296,10,"2 Sand + gravel","filter small solids",1);
  s+=`<path d="M355 68V92H69V108" fill="none" stroke="currentColor" stroke-width="2"/><path d="M69 108l-5 -8h10z" fill="currentColor"/>`;
  s+=box(8,112,"3 Carbon filter","removes taste, smell",1)+E_ARR(128,140,150,140)+box(152,112,"4 Chlorination","kills microbes",1)+E_ARR(272,140,294,140)+box(296,112,"Safe to drink","(treated water)");
  return E_FG("0 0 420 176",s,"Water treatment in four steps. Each stage removes a different type of impurity.","Flow diagram of water treatment from sedimentation to sand and gravel filtration, carbon filtering and chlorination",520);
};

/* air composition and fractional distillation order */
FIGS.E_AIR=()=>{
  let s=E_T(10,14,"Clean dry air by volume",{a:"start",s:12,b:1});
  s+=`<rect x="10" y="22" width="296" height="30" style="fill:var(--accent)" fill-opacity=".75"/><rect x="306" y="22" width="80" height="30" style="fill:var(--bad)" fill-opacity=".7"/><rect x="386" y="22" width="4" height="30" fill="currentColor"/>`;
  s+=E_T(158,42,"nitrogen 78%",{s:12,b:1,c:"var(--accent-ink)"})+E_T(346,42,"oxygen 21%",{s:11.5,b:1,c:"var(--accent-ink)"});
  s+=E_T(10,70,"about 1%: argon (0.9%), carbon dioxide (0.04%) and traces of other gases",{a:"start",s:10.5,i:1});
  s+=E_T(10,104,"Fractional distillation: gases boil off in this order",{a:"start",s:12,b:1});
  const g=[["Nitrogen","−196 °C"],["Argon","−186 °C"],["Oxygen","−183 °C"]];
  g.forEach((r,i)=>{const x=10+i*140;s+=E_BOX(x,114,120,46,[r[0],"boils at "+r[1]],{b:1,s:10.5});if(i<2)s+=E_ARR(x+122,137,x+138,137)});
  s+=E_T(200,178,"lowest boiling point comes off first",{s:10.5,i:1});
  return E_FG("0 0 420 186",s,"Air is cooled until liquid, then warmed slowly. Each gas boils off at its own temperature and is collected separately.","Bar showing air is 78 percent nitrogen and 21 percent oxygen, and the order in which gases boil off from liquid air",520);
};

/* eutrophication chain */
FIGS.E_EUTRO=()=>{
  const st=["Fertiliser or sewage runs into a river or lake","Nitrates and phosphates make algae grow fast (algal bloom)","The bloom blocks light, so underwater plants die","Bacteria decompose the dead plants and use up the dissolved oxygen","Fish and other water animals die (eutrophication)"];
  let s="";st.forEach((t,i)=>{const y=6+i*62,w=i===4?"var(--bad)":undefined;
    s+=`<rect x="8" y="${y}" width="300" height="42" rx="8" ${i===4?`style="fill:var(--bad)" fill-opacity=".25"`:'fill="none"'} stroke="currentColor" stroke-opacity=".6" stroke-width="1.4"/>`;
    s+=`<circle cx="30" cy="${y+21}" r="11" style="fill:var(--accent)"/>`+E_T(30,y+26,String(i+1),{s:12,b:1,c:"var(--accent-ink)"});
    const words=t.split(" "),l1=[],l2=[];let n=0;words.forEach(w=>{if(n+w.length<=34&&!l2.length){l1.push(w);n+=w.length+1}else l2.push(w)});
    s+=E_T(48,y+(l2.length?18:25),l1.join(" "),{a:"start",s:10.5})+(l2.length?E_T(48,y+32,l2.join(" "),{a:"start",s:10.5}):"");
    if(i<4)s+=E_ARR(158,y+44,158,y+60,"currentColor",1.8)});
  return E_FG("0 0 316 322",s,"Eutrophication: how too many nutrients in water can end with the death of fish.","Five step chain from fertiliser run-off to algal bloom, plant death, oxygen depletion and fish death",420);
};

/* ===== Lesson 9.1: Properties, uses and alloys of metals ===== */
const E_L91=L("Properties, uses and alloys of metals","Physical and chemical properties of metals, why they are used as they are, and how alloys differ from pure metals.",
`<h4>Metals and non-metals</h4>
<p>Most of the elements in the Periodic Table are <b>metals</b>. A few elements, the <b>metalloids</b>, show some properties of both types. The metallic character of the elements fades as you move from left to right across a period.</p>
<table><tr><th>Property</th><th>Metals</th><th>Non-metals</th></tr>
<tr><td>Conduct heat and electricity</td><td>Good conductors</td><td>Poor conductors (graphite is an exception)</td></tr>
<tr><td>Strength and shape</td><td>Malleable (can be hammered into shape) and ductile (can be drawn into wires)</td><td>Brittle when solid, so they break up</td></tr>
<tr><td>Melting and boiling points</td><td>Usually high</td><td>Usually low. Many are gases at room temperature.</td></tr>
<tr><td>Appearance</td><td>Shiny when polished</td><td>Dull</td></tr></table>
<div class="key"><b>Exam tip</b>Diamond and silicon(IV) oxide are non-metals with very high melting points. Group I metals are soft and have low melting points. Learn the exceptions as well as the rules.</div>
<h4>Why metals behave like this</h4>
<p>A metal is a lattice of positive ions surrounded by <b>delocalised electrons</b> that are free to move. This <b>metallic bond</b> explains the properties.</p>
<ul><li><b>Conductivity:</b> the free electrons carry charge and thermal energy through the metal.</li><li><b>Malleable and ductile:</b> the layers of ions can slide over each other without breaking the bonding, because the electrons still hold the ions together.</li><li><b>High melting points:</b> the attraction between the positive ions and the electron sea is strong, so a lot of energy is needed to overcome it.</li></ul>
<p>Non-metals do not conduct because all their electrons are held in covalent bonds. Simple molecular non-metals melt easily because only weak forces between molecules are overcome.</p>
<h4>Chemical properties of metals</h4>
<p>The chemistry of a metal can be studied through its reactions with <b>water</b>, <b>dilute acid</b> and <b>oxygen</b>. Compare how fast each reaction goes and you can rank the metals in a reactivity series (see the next lesson).</p>
<table><tr><th>Reaction</th><th>General equation</th><th>Example</th></tr>
<tr><td>Metal + cold water</td><td>metal hydroxide + hydrogen</td><td>Ca(s) + 2H~2~O(l) → Ca(OH)~2~(aq) + H~2~(g)</td></tr>
<tr><td>Metal + steam</td><td>metal oxide + hydrogen</td><td>Mg(s) + H~2~O(g) → MgO(s) + H~2~(g)</td></tr>
<tr><td>Metal + dilute acid</td><td>salt + hydrogen</td><td>Fe(s) + 2HCl(aq) → FeCl~2~(aq) + H~2~(g)</td></tr>
<tr><td>Metal + oxygen</td><td>metal oxide</td><td>2Cu(s) + O~2~(g) → 2CuO(s)</td></tr></table>
<p>Unreactive metals such as gold and platinum do not react with oxygen. Reactive metals such as sodium react quickly. Copper and iron react much more slowly.</p>
<h4>Uses of aluminium and copper</h4>
<p>A metal is chosen for a job because its <b>properties</b> match what the job needs.</p>
<table><tr><th>Metal</th><th>Use</th><th>Property that makes it suitable</th></tr>
<tr><td rowspan="3">Aluminium</td><td>Aeroplane bodies</td><td>Low density and strong for its weight</td></tr>
<tr><td>Overhead power cables</td><td>Good electrical conductor and low density</td></tr>
<tr><td>Food cans</td><td>Non-toxic and resists corrosion, even with acidic foods</td></tr>
<tr><td rowspan="3">Copper</td><td>Electrical wiring</td><td>Very good conductor and ductile</td></tr>
<tr><td>Pots and pans</td><td>Good conductor of heat, unreactive and malleable</td></tr>
<tr><td>Water pipes</td><td>Unreactive with water, non-toxic and malleable</td></tr></table>
<p>Aluminium is a reactive metal, yet it resists corrosion. It is covered by a thin, tough layer of aluminium oxide that stops the metal underneath reacting further.</p>
<h4>Alloys</h4>
<p>An <b>alloy</b> is a <b>mixture</b> of a metal with one or more other elements. Most alloys contain more than one metal. Some include a non-metal such as carbon.</p>
<table><tr><th>Alloy</th><th>Made from</th><th>Properties and uses</th></tr>
<tr><td>Brass</td><td>Copper and zinc</td><td>Stronger than either metal. Musical instruments, ornaments, door handles.</td></tr>
<tr><td>Stainless steel</td><td>Iron with chromium, nickel and carbon</td><td>Hard and resists rusting. Cutlery, sinks, chemical plants.</td></tr>
<tr><td>Aluminium alloy</td><td>Aluminium with copper, manganese and silicon</td><td>Stronger but still low density. Aircraft bodies.</td></tr>
<tr><td>Iron with tungsten</td><td>Iron and tungsten</td><td>Very hard and keeps its strength at high temperatures. Cutting tools.</td></tr></table>
<div class="key"><b>Exam tip</b>An alloy is a mixture. Its elements are not chemically combined, so an alloy is <b>not</b> a compound.</div>
<h4>The structure of an alloy</h4>
<p>A pure metal has atoms of one size packed in neat layers. In an alloy the atoms are <b>different sizes</b>, so the regular arrangement is disturbed.</p>
{{E_ALLOY}}
<div class="key"><b>Exam tip</b>When asked to pick the particle diagram of an alloy, choose the one with unevenly sized particles and distorted rows.</div>
<h4>Explaining the properties of alloys <i>(Extended only)</i></h4>
<p>In a pure metal, identical ions in regular layers slide over each other easily. In an alloy, atoms of other sizes sit in the layers and <b>block the sliding</b>. More force is needed to distort the structure, so alloys are usually <b>harder and stronger</b> than the pure metals they are made from.</p>
<div class="ex"><b>Worked example</b>Explain why brass is harder than pure copper.<br>Brass contains zinc atoms, which are a different size from copper atoms (1). The different-sized atoms distort the layers (1), so the layers cannot slide over each other as easily (1).</div>`,
I("Why might a metal that is brilliant when pure be a poor choice for a bridge, and how could an alloy fix it?",
`<ol><li>List three properties a metal needs to be used in (a) a bridge, (b) a saucepan and (c) an overhead power cable.</li><li>For each job, choose from iron, copper, aluminium and stainless steel and justify your choice with at least two properties.</li><li>Predict what an alloy does to the hardness of a pure metal and say why, using the idea of layers of atoms.</li><li>Suggest one disadvantage of using an alloy instead of a pure metal.</li></ol>`,
`<p><b>Model the layers.</b> Use a tray of identical marbles (or beads) to represent a pure metal. Tilt the tray so the layers slide. Now replace several marbles with larger and smaller ones and tilt again. Describe the difference.</p><p><b>Bend test.</b> Compare how easily you can bend a copper wire, a thin brass rod and a steel nail of similar size. Rank them for hardness and explain your ranking.</p><p><b>Conductivity test.</b> Use a battery, bulb and crocodile clips to test strips of copper, aluminium, iron and a non-metal (carbon). Record the brightness of the bulb.</p><p class="safe">Safety: do not bend metals hard enough to snap them. Wear eye protection and keep hands clear of cut ends.</p>`,
["https://phet.colorado.edu/en/simulations/conductivity","PhET: Conductivity (Resistance in a Wire) simulation"]),
[["State three physical properties of a typical metal.","Any three: good conductor of heat (1), good conductor of electricity (1), malleable (1), ductile (1), high melting point (1), shiny (1).",3],
["Explain why metals are good conductors of electricity.","Metals contain delocalised (free) electrons (1) which can move through the structure and carry charge (1).",2],
["Explain why metals can be hammered into shape without breaking.","Layers of positive ions can slide over each other (1) while the electrons still hold the ions together (1).",2],
["Aluminium is used to make food cans and aeroplane bodies. Give one property that makes it suitable for each use.","Food cans: resists corrosion / non-toxic (1). Aeroplane: low density (1).",2],
["State what is meant by an alloy and give one example with its use.","A mixture of a metal with other elements (1). Example: brass in musical instruments or stainless steel in cutlery (1).",2],
["Explain why an alloy is harder than the pure metal. (Extended)","Atoms of different sizes are present (1). They disrupt the regular layers (1) so the layers cannot slide as easily (1).",3]],
[M("Which property of copper makes it suitable for electrical wiring?",["High density","Good conductor and ductile","Low melting point","Brittle"],1,"It carries current well and can be drawn into wires."),
M("Which statement about an alloy is correct?",["It is a compound","It is a mixture","It is always a pure element","It has no metals in it"],1,"The elements are mixed, not chemically combined."),
M("Which diagram best represents an alloy?",["Rows of identical atoms","Rows of atoms of different sizes with distorted layers","Pairs of atoms joined by bonds","Atoms scattered randomly far apart"],1,"Different-sized atoms distort the layers."),
T("Name the alloy of copper and zinc.",["brass"],"Brass."),
M("Why is aluminium useful in aircraft?",["High density","Low density and resistant to corrosion","It is a very good insulator","It melts easily"],1,"Low density and an oxide layer that protects it."),
M("Which is a property of a non-metal such as sulfur?",["Malleable","Good electrical conductor","Brittle when solid","Shiny and ductile"],2,"Solid non-metals are brittle."),
N("How many metals does brass contain?",2,"","Copper and zinc."),
T("What name is given to the electrons that move freely through a metal lattice?",["delocalised","free"],"Delocalised electrons.")],
[["Define malleable and ductile","Malleable: can be hammered into shape. Ductile: can be drawn into wires."],
["Why do metals conduct?","They have delocalised electrons that are free to move and carry charge."],
["Why do metals have high melting points?","Strong attraction between positive ions and delocalised electrons needs lots of energy to overcome."],
["What is an alloy?","A mixture of a metal with other elements. It is not a compound."],
["Brass is made from","Copper and zinc."],
["Stainless steel is made from","Iron with chromium, nickel and carbon."],
["Why is aluminium used in aircraft?","Low density, strong when alloyed, resists corrosion."],
["Why are alloys harder than pure metals? (Extended)","Different-sized atoms distort the layers so they cannot slide easily."]]);

/* ===== Lesson 9.2: Reactivity series and corrosion ===== */
const E_L92=L("The reactivity series and corrosion","Ranking metals by their reactions, displacement, why aluminium seems unreactive, and how iron rusts and is protected.",
`<h4>The reactivity series</h4>
<p>If you watch how metals react with water and acid, you can put them in order of <b>reactivity</b>: the more vigorous the reaction, the more reactive the metal. The two non-metals <b>carbon</b> and <b>hydrogen</b> are included because they are used to extract metals and because metals above hydrogen react with acids.</p>
{{E_SERIES}}
<div class="key"><b>Memory aid</b>"<b>P</b>lease <b>s</b>end <b>c</b>ats, <b>m</b>onkeys <b>a</b>nd <b>c</b>ute <b>z</b>ebras <b>i</b>nto <b>h</b>ot <b>c</b>ountries <b>s</b>igned <b>G</b>ordon" gives K, Na, Ca, Mg, Al, C, Zn, Fe, H, Cu, Ag, Au.</div>
<h4>Reactions with water and steam</h4>
<p>Potassium, sodium and calcium react with <b>cold water</b> to give a metal hydroxide and hydrogen. Potassium is the most violent, then sodium, then calcium. Magnesium hardly reacts with cold water but reacts with <b>steam</b> to give a metal oxide and hydrogen.</p>
<table><tr><th>Metal</th><th>Observation</th><th>Equation</th></tr>
<tr><td>Potassium</td><td>Violent, lilac flame</td><td>2K(s) + 2H~2~O(l) → 2KOH(aq) + H~2~(g)</td></tr>
<tr><td>Sodium</td><td>Fast fizzing, melts into a ball</td><td>2Na(s) + 2H~2~O(l) → 2NaOH(aq) + H~2~(g)</td></tr>
<tr><td>Calcium</td><td>Steady fizzing, solution turns cloudy</td><td>Ca(s) + 2H~2~O(l) → Ca(OH)~2~(aq) + H~2~(g)</td></tr>
<tr><td>Magnesium</td><td>With steam: burns with a bright white flame</td><td>Mg(s) + H~2~O(g) → MgO(s) + H~2~(g)</td></tr></table>
<h4>Reactions with dilute hydrochloric acid</h4>
<p>Metals above hydrogen react with dilute acid to give a <b>salt and hydrogen</b>. Metals below hydrogen do not. The more reactive the metal, the more vigorous the fizzing.</p>
<div class="ex"><b>Worked example</b>Mg(s) + 2HCl(aq) → MgCl~2~(aq) + H~2~(g)  (fast fizzing)<br>Zn(s) + 2HCl(aq) → ZnCl~2~(aq) + H~2~(g)  (moderate fizzing)<br>Fe(s) + 2HCl(aq) → FeCl~2~(aq) + H~2~(g)  (slow fizzing)<br>Cu, Ag, Au + dilute HCl → no reaction</div>
<p>Potassium and sodium react explosively with acids, so these tests are never done in school.</p>
<h4>Deducing an order of reactivity</h4>
<p>Compare the vigour of the reaction (speed of bubbling, how quickly the metal disappears) or the <b>temperature rise</b>. A bigger temperature rise means a more reactive metal. If two metals do not react with water, compare them using dilute acid.</p>
<div class="ex"><b>Worked example</b>Metals A, B and C were added to dilute hydrochloric acid. A: very fast bubbles and a large temperature rise. B: slow bubbles, small rise. C: no reaction. Order of reactivity: A &gt; B &gt; C.</div>
<h4>Why does aluminium seem unreactive?</h4>
<p>Aluminium is high in the series, yet it does not react with water, and it reacts only slowly with dilute acid. The reason is a very thin, tough layer of <b>aluminium oxide</b> that forms in air. The layer stops water and acid touching the metal underneath, so aluminium behaves as if it were unreactive.</p>
<h4>Explaining reactivity and displacement <i>(Extended only)</i></h4>
<p>A metal reacts by <b>losing electrons</b> to form a positive ion. The easier it loses electrons, the more reactive it is. This is why reactive metals are good reducing agents.</p>
<p>In a <b>displacement reaction</b> a more reactive metal pushes a less reactive metal out of a solution of its salt. The more reactive metal loses electrons and the ions of the less reactive metal gain them (reduction: gain of electrons).</p>
<div class="ex"><b>Worked example</b>Mg(s) + CuSO~4~(aq) → MgSO~4~(aq) + Cu(s)<br>The blue solution fades to colourless and pink-brown copper coats the magnesium.<br>Ionic: Mg + Cu^2+^ → Mg^2+^ + Cu</div>
<table><tr><th>Mixture</th><th>Result</th><th>What it shows</th></tr>
<tr><td>Mg + FeSO~4~(aq)</td><td>Fe formed</td><td>Mg more reactive than Fe</td></tr>
<tr><td>Zn + FeCl~2~(aq)</td><td>Fe formed</td><td>Zn more reactive than Fe</td></tr>
<tr><td>Fe + AgNO~3~(aq)</td><td>Ag formed</td><td>Fe more reactive than Ag</td></tr>
<tr><td>Cu + FeCl~2~(aq)</td><td>No reaction</td><td>Cu less reactive than Fe</td></tr>
<tr><td>Ag + CuSO~4~(aq)</td><td>No reaction</td><td>Ag less reactive than Cu</td></tr></table>
<p>Putting the results together gives Mg &gt; Zn &gt; Fe &gt; Cu &gt; Ag.</p>
<div class="key"><b>Thermal stability</b>The more reactive the metal, the more stable its carbonate is to heat. Copper(II) carbonate breaks down easily (green to black): CuCO~3~ → CuO + CO~2~. Sodium and potassium carbonates do not decompose with a Bunsen burner.</div>
<h4>Rusting of iron</h4>
<p><b>Rusting</b> is the reaction of iron with <b>both oxygen and water</b> to form hydrated iron(III) oxide, a reddish-brown solid. Iron is oxidised. Steel is mostly iron, so it rusts too.</p>
<p style="margin:0">iron + water + oxygen → hydrated iron(III) oxide</p>
{{E_RUST}}
<div class="key"><b>Exam tip</b>Only iron and steel <b>rust</b>. Other metals <b>corrode</b>, for example copper turning green. Use the right word.</div>
<h4>Preventing rust</h4>
<p><b>Barrier methods</b> keep oxygen and water away from the iron: paint, oil, grease or a plastic coating. If the coating is scratched, the iron is exposed again and rusts.</p>
<p><b>Sacrificial protection <i>(Extended only)</i>:</b> a more reactive metal is connected to the iron. It is oxidised instead, so the iron is protected. Zinc blocks bolted to steel ship hulls work this way: Zn → Zn^2+^ + 2e^−^. The zinc must be replaced before it is used up.</p>
<p><b>Galvanising <i>(Extended only)</i>:</b> iron is coated with zinc, by dipping in molten zinc or by electroplating. The zinc is a barrier. If it is scratched, the zinc still corrodes first because it is more reactive, so the iron is still protected.</p>
<div class="key"><b>Exam tip</b>A metal is suitable for sacrificial protection only if it is <b>higher</b> than iron in the reactivity series. Copper would make the iron rust faster.</div>`,
I("How can you work out the order of four unknown metals using only a test tube, acid and salt solutions?",
`<ol><li>Look at the data your teacher gives you for metals W, X, Y and Z (reaction with dilute acid and with each other's salt solution). Place them in order.</li><li>Explain which observation was most useful for deciding each position.</li><li>Predict whether Y would displace Z from a solution of Z sulfate and explain.</li><li>Suggest what you would test next to place a fifth metal in your order.</li></ol>`,
`<p><b>Reactivity race.</b> Place equal small pieces of magnesium, zinc, iron and copper into separate test tubes with the same volume of dilute hydrochloric acid. Time the first bubbles, count bubbles in 30 seconds and measure the temperature rise. Rank the metals.</p><p><b>Displacement grid.</b> Add small pieces of Mg, Zn, Fe and Cu to solutions of their sulfates in a spotting tile. Record where a new metal forms. Write an equation for each reaction that happens.</p><p><b>Rusting investigation.</b> Set up nails in (1) air and water, (2) boiled water with a layer of oil, (3) dry air with calcium chloride, (4) a nail wrapped with magnesium ribbon in water. Predict, then observe over a week.</p><p class="safe">Safety: eye protection. Hydrogen is flammable, so keep flames away. Never use potassium or sodium for this activity. Copper sulfate is harmful to the eyes.</p>`,
["https://phet.colorado.edu/en/simulations/build-an-atom","PhET: Build an Atom simulation (to review why atoms lose electrons)"]),
[["Write the reactivity series from potassium to gold, including carbon and hydrogen.","K, Na, Ca, Mg, Al, C, Zn, Fe, H, Cu, Ag, Au (2 for all correct, 1 for at most one pair swapped).",2],
["Write a balanced equation for sodium reacting with cold water. Include state symbols.","2Na(s) + 2H~2~O(l) → 2NaOH(aq) + H~2~(g) (2). Award 1 if formulae are right but not balanced.",2],
["Describe what you would see when magnesium is added to dilute hydrochloric acid.","Bubbles / fizzing (1); the magnesium gets smaller and disappears; the tube gets warm (1).",2],
["Explain why aluminium does not react with water even though it is above zinc in the reactivity series.","A thin layer of aluminium oxide forms on the surface (1) which stops water reaching the metal (1).",2],
["State the two substances needed for iron to rust and name the product.","Oxygen (1) and water (1); hydrated iron(III) oxide (1).",3],
["Explain how zinc protects a steel ship from rusting. (Extended)","Zinc is more reactive than iron (1). Zinc loses electrons (is oxidised) in preference to iron (1) so the iron is protected (1).",3]],
[M("Which metal does not react with dilute hydrochloric acid?",["Zinc","Magnesium","Copper","Iron"],2,"Copper is below hydrogen in the series."),
M("Which pair will produce a reaction?",["Cu + ZnSO~4~(aq)","Zn + CuSO~4~(aq)","Ag + CuSO~4~(aq)","Cu + MgSO~4~(aq)"],1,"Zinc is more reactive than copper and displaces it."),
T("Name the gas given off when zinc reacts with dilute hydrochloric acid.",["hydrogen"],"Hydrogen."),
M("Which is needed for iron to rust?",["Oxygen only","Water only","Oxygen and water","Carbon dioxide"],2,"Both oxygen and water."),
M("Why is zinc used for sacrificial protection of iron?",["It is less reactive than iron","It is more reactive than iron","It does not corrode","It is a good insulator"],1,"It loses electrons more easily than iron."),
M("Magnesium reacts with steam to form",["magnesium hydroxide and hydrogen","magnesium oxide and hydrogen","magnesium oxide and oxygen","magnesium and hydrogen"],1,"Metal + steam gives a metal oxide and hydrogen."),
N("How many metals in the reactivity series are above carbon (K, Na, Ca, Mg, Al)?",5,"","Five metals lie above carbon."),
T("What word describes the corrosion of iron?",["rust"],"Rusting.")],
[["Order of the top four metals","Potassium, sodium, calcium, magnesium."],
["Metal + dilute acid gives","A salt and hydrogen."],
["Metal + steam gives","A metal oxide and hydrogen."],
["Why does aluminium seem unreactive?","A thin oxide layer protects it."],
["Displacement","A more reactive metal replaces a less reactive metal in a solution of its salt."],
["Conditions for rusting","Oxygen and water."],
["Sacrificial protection (Extended)","A more reactive metal is oxidised instead of iron, e.g. zinc blocks on ships."],
["Galvanising (Extended)","Coating iron with zinc: barrier, and sacrificial protection if scratched."]]);

/* ===== Lesson 9.3: Extraction of metals ===== */
const E_L93=L("Extraction of metals","Ores, why extraction is reduction, the blast furnace for iron and the electrolysis of aluminium oxide.",
`<h4>Ores and extraction</h4>
<p>Most metals are found in the Earth's crust as compounds, mixed in rocks. A rock that contains enough of a metal compound to make extraction worthwhile is called an <b>ore</b>. Many ores are <b>oxides</b>: haematite is the main ore of iron (Fe~2~O~3~) and bauxite is the main ore of aluminium (Al~2~O~3~).</p>
<p>To get the metal, oxygen must be removed from the oxide. Removing oxygen is <b>reduction</b>, so extracting a metal from its oxide is a reduction process.</p>
<p>A few very unreactive metals, such as gold and platinum, are found as the uncombined element. They are called <b>native metals</b>.</p>
<h4>Reactivity decides the method</h4>
<p>The higher a metal is in the reactivity series, the harder it is to separate from its compounds and the more energy is needed.</p>
{{E_EXTRACT}}
<ul><li><b>Above carbon:</b> carbon cannot remove the oxygen, so the molten compound is split by <b>electrolysis</b>. This needs a lot of electricity and is expensive. Example: aluminium.</li><li><b>Below carbon:</b> the oxide is heated with <b>carbon or carbon monoxide</b>, which take the oxygen away. Example: iron in the blast furnace.</li><li><b>Very unreactive:</b> found uncombined or needing little processing.</li></ul>
<div class="key"><b>Exam tip</b>Use the series to answer "how would this metal be extracted?" Zinc and iron are below carbon. Aluminium, magnesium and everything above it need electrolysis.</div>
<h4>Iron from haematite: the blast furnace</h4>
<p>The raw materials are <b>iron ore</b> (haematite), <b>coke</b> (almost pure carbon) and <b>limestone</b>. They are fed in at the top. <b>Hot air</b> is blown in near the bottom. A modern furnace makes about 10 000 tonnes of iron a day.</p>
{{E_BLAST}}
<ul><li><b>Zone 1 (bottom):</b> coke burns in the hot air to make carbon dioxide. This reaction is exothermic and heats the furnace.</li><li><b>Zone 2:</b> carbon dioxide reacts with more coke to make carbon monoxide, the main reducing agent.</li><li><b>Zone 3:</b> carbon monoxide reduces iron(III) oxide to iron. The molten iron runs to the bottom and is tapped off.</li></ul>
<h4>The role of limestone</h4>
<p>Iron ore contains sand (silicon dioxide). Limestone removes it. The limestone breaks down on heating to give calcium oxide. Calcium oxide is a base and reacts with the acidic silicon dioxide to make <b>calcium silicate</b>, called <b>slag</b>. The slag melts, floats on the molten iron and is tapped off separately.</p>
<table><tr><th>Stage</th><th>Word equation</th></tr>
<tr><td>Coke burns</td><td>carbon + oxygen → carbon dioxide</td></tr>
<tr><td>Carbon monoxide forms</td><td>carbon + carbon dioxide → carbon monoxide</td></tr>
<tr><td>Iron forms</td><td>iron(III) oxide + carbon monoxide → iron + carbon dioxide</td></tr>
<tr><td>Limestone decomposes</td><td>calcium carbonate → calcium oxide + carbon dioxide</td></tr>
<tr><td>Slag forms</td><td>calcium oxide + silicon dioxide → calcium silicate</td></tr></table>
<h4>Equations for the blast furnace <i>(Extended only)</i></h4>
<div class="ex"><b>Symbol equations</b>C(s) + O~2~(g) → CO~2~(g)<br>CO~2~(g) + C(s) → 2CO(g)<br>Fe~2~O~3~(s) + 3CO(g) → 2Fe(s) + 3CO~2~(g)<br>CaCO~3~(s) → CaO(s) + CO~2~(g)<br>CaO(s) + SiO~2~(s) → CaSiO~3~(l)</div>
<div class="key"><b>Exam tip</b>Iron(III) oxide is <b>reduced</b> (it loses oxygen). Carbon monoxide is <b>oxidised</b> (it gains oxygen). Core candidates need the word equations only.</div>
<h4>Aluminium from bauxite</h4>
<p>Aluminium is above carbon in the series, so it cannot be extracted by heating with carbon. The ore, bauxite, is first purified to give <b>aluminium oxide</b>, which is then <b>electrolysed</b>.</p>
<p>The cell is a steel container lined with graphite. The lining is the <b>cathode (negative)</b>. Large graphite blocks dipped into the liquid are the <b>anodes (positive)</b>.</p>
<h4>The electrolysis cell <i>(Extended only)</i></h4>
<p>Aluminium oxide melts at over 2000 °C. This would cost far too much energy, so it is dissolved in molten <b>cryolite</b>, which gives a mixture with a much lower melting point.</p>
{{E_ALCELL}}
<table><tr><th>Electrode</th><th>What happens</th><th>Half-equation</th></tr>
<tr><td>Cathode (−)</td><td>Aluminium ions gain electrons (reduction). Molten aluminium sinks and is siphoned off.</td><td>Al^3+^ + 3e^−^ → Al</td></tr>
<tr><td>Anode (+)</td><td>Oxide ions lose electrons (oxidation). Oxygen forms.</td><td>2O^2−^ → O~2~ + 4e^−^</td></tr></table>
<p>Overall: 2Al~2~O~3~ → 4Al + 3O~2~. The hot oxygen reacts with the graphite anodes: C + O~2~ → CO~2~. The anodes wear away and must be replaced regularly. Large amounts of electricity are needed, which is the main cost.</p>
<div class="key"><b>Exam tip</b>OIL RIG: Oxidation Is Loss of electrons, Reduction Is Gain. Positive ions go to the cathode and gain electrons.</div>
<h4>Using metals wisely</h4>
<p>Ores are a limited resource and extraction uses energy. <b>Recycling</b> metals such as iron and aluminium saves ore, saves energy (recycling aluminium needs far less electricity than extracting it) and reduces waste sent to landfill.</p>`,
I("Why is aluminium so much more expensive to produce from its ore than iron is, even though bauxite is plentiful?",
`<ol><li>Write down the position of iron and aluminium relative to carbon in the reactivity series.</li><li>Predict which extraction method each metal needs and why.</li><li>List all the energy costs in each process (heating, electricity, making raw materials).</li><li>Decide which metals are the most important to recycle and justify your choice.</li></ol>`,
`<p><b>Reduce copper oxide with carbon.</b> Mix copper(II) oxide powder with carbon powder and heat strongly in a crucible or hard-glass tube. Describe the colour change and test for carbon dioxide with limewater. Write the equation.</p><p><b>Build the furnace.</b> Using cards for the raw materials, products and reactions, assemble a blast furnace diagram on a poster. Place each equation at the correct height and label which substance is oxidised and which is reduced.</p><p><b>Class demonstration.</b> Watch the electrolysis of molten lead(II) bromide in a fume cupboard as a model for the extraction of a reactive metal.</p><p class="safe">Safety: heating powders and the electrolysis of molten salts are teacher-led, with eye protection and a fume cupboard. Lead compounds are toxic.</p>`,
["https://phet.colorado.edu/en/simulations/reactants-products-and-leftovers","PhET: Reactants, Products and Leftovers simulation"]),
[["State what is meant by an ore and name the main ore of iron.","A rock containing enough of a metal compound to make extraction worthwhile (1). Haematite (1).",2],
["Explain why extracting a metal from its oxide is a reduction process.","Oxygen is removed from the oxide (1), which is reduction (1).",2],
["Name the raw materials used in a blast furnace and state the purpose of limestone.","Iron ore, coke, limestone and hot air (1). Limestone removes silicon dioxide impurities as slag (1).",2],
["Write the equation for the main reduction reaction in the blast furnace. (Extended)","Fe~2~O~3~ + 3CO → 2Fe + 3CO~2~ (2). Award 1 if unbalanced.",2],
["Explain why aluminium cannot be extracted from aluminium oxide by heating with carbon.","Aluminium is more reactive than carbon (1) so carbon cannot remove the oxygen from aluminium oxide (1).",2],
["Describe what happens at each electrode when aluminium oxide is electrolysed. (Extended)","Cathode: Al^3+^ gain electrons to form aluminium (1). Anode: O^2−^ lose electrons to form oxygen (1). The oxygen reacts with the graphite anode to make CO~2~ (1).",3]],
[M("Which metal is extracted by electrolysis of its molten compound?",["Iron","Zinc","Aluminium","Copper"],2,"Aluminium is above carbon in the series."),
M("What is the main reducing agent in the blast furnace?",["Coke","Carbon monoxide","Limestone","Hot air"],1,"Carbon monoxide removes oxygen from the iron oxide."),
M("Why is limestone added to the blast furnace?",["To burn as fuel","To remove silicon dioxide as slag","To reduce iron oxide","To cool the furnace"],1,"It forms calcium silicate, the slag."),
T("What is the name of the main ore of aluminium?",["bauxite"],"Bauxite."),
M("Why are the graphite anodes replaced regularly?",["They melt","They react with the oxygen formed","They dissolve in cryolite","They gain electrons"],1,"Carbon burns to make carbon dioxide."),
M("Which metal is found uncombined as a native metal?",["Sodium","Aluminium","Gold","Iron"],2,"Gold is very unreactive."),
N("Balance Fe~2~O~3~ + __CO → 2Fe + 3CO~2~. How many CO are needed?",3,"","3CO provides the three oxygen atoms."),
T("Which type of process is the removal of oxygen from a metal oxide?",["reduction"],"Reduction.")],
[["What is an ore?","A rock containing enough metal compound to be worth extracting."],
["Why is extraction from oxides reduction?","Oxygen is removed."],
["Metals above carbon are extracted by","Electrolysis of the molten compound."],
["Metals below carbon are extracted by","Heating with carbon or carbon monoxide."],
["Raw materials of the blast furnace","Haematite, coke, limestone, hot air."],
["What is slag?","Calcium silicate, formed from calcium oxide and silicon dioxide."],
["Why is Al~2~O~3~ dissolved in cryolite? (Extended)","To lower the melting point and save energy."],
["Half-equations in the Al cell (Extended)","Cathode: Al^3+^ + 3e^−^ → Al. Anode: 2O^2−^ → O~2~ + 4e^−^."]]);

/* ===== Lesson 10.1: Water and water pollution ===== */
const E_L101=L("Water and water pollution","Tests for water, pure and distilled water, substances in natural water, water treatment, and fertilisers and eutrophication.",
`<h4>Chemical tests for water</h4>
<p>Water is detected using an <b>anhydrous</b> compound (one with no water of crystallisation) that changes colour when water joins it.</p>
{{E_WATERTEST}}
<table><tr><th>Test substance</th><th>Without water</th><th>With water</th></tr>
<tr><td>Copper(II) sulfate</td><td>White (anhydrous, CuSO~4~)</td><td>Blue (hydrated, CuSO~4~·5H~2~O)</td></tr>
<tr><td>Cobalt(II) chloride</td><td>Blue (anhydrous, CoCl~2~)</td><td>Pink (hydrated, CoCl~2~·6H~2~O)</td></tr></table>
<p>Cobalt chloride is usually used as test paper: blue paper turns pink when it touches water.</p>
<div class="ex"><b>Equations <i>(Extended only)</i></b>CuSO~4~(s) + 5H~2~O(l) ⇌ CuSO~4~·5H~2~O(s)<br>CoCl~2~(s) + 6H~2~O(l) ⇌ CoCl~2~·6H~2~O(s)</div>
<div class="key"><b>Exam tip</b>These tests show that water is <i>present</i>. They do not show that it is <i>pure</i>. Use melting point and boiling point to test purity.</div>
<h4>Pure water and distilled water</h4>
<p>A pure substance melts and boils at one sharp temperature. Pure water melts at <b>0 °C</b> and boils at <b>100 °C</b> (at normal pressure). A mixture melts and boils over a range of temperatures.</p>
<ul><li>Impurities <b>raise</b> the boiling point, so impure water boils above 100 °C.</li><li>Impurities <b>lower</b> the melting point, so impure water melts below 0 °C.</li></ul>
<p><b>Distilled water</b> is made by boiling water and condensing the steam. Most dissolved impurities stay behind. It is used in practical work instead of tap water because dissolved ions in tap water could interfere with reactions and spoil results.</p>
<h4>Water from natural sources</h4>
<p>People use water at home (drinking, cooking, washing and gardening), in farming (animals and crops) and in industry (as a solvent, a coolant and as steam to generate electricity). The water comes from lakes, rivers and <b>groundwater</b>. A rock that stores water underground is an <b>aquifer</b>.</p>
<p>Water from these sources is not pure. Rain washes substances into it, some natural and many from human activity. It may contain:</p>
<ul><li>dissolved oxygen</li><li>metal ions such as Ca^2+^, Mg^2+^, Na^+^ and K^+^</li><li>plastics and sewage</li><li>harmful microbes</li><li>nitrates and phosphates from fertilisers and detergents</li></ul>
<div class="key"><b>Exam tip</b>"Natural water" does not mean "clean water". It usually needs treating before we can drink it.</div>
<h4>Helpful and harmful substances</h4>
<table><tr><th>Substance</th><th>Effect</th></tr>
<tr><td>Dissolved oxygen</td><td>Helpful: fish and other aquatic life need it to respire.</td></tr>
<tr><td>Calcium and magnesium compounds</td><td>Helpful: minerals needed for bones, teeth and healthy plants.</td></tr>
<tr><td>Lead, arsenic, mercury and aluminium compounds</td><td>Harmful: toxic to people and animals.</td></tr>
<tr><td>Plastics</td><td>Harmful: animals get trapped, or starve with stomachs full of plastic.</td></tr>
<tr><td>Sewage</td><td>Harmful: carries microbes that cause disease.</td></tr>
<tr><td>Nitrates and phosphates</td><td>Harmful in excess: cause eutrophication (see below).</td></tr></table>
<div class="key"><b>Exam tip</b>Metal compounds can be helpful or harmful. It depends on the metal.</div>
<h4>Water treatment</h4>
<p>Untreated water holds insoluble impurities (soil, plant matter) and soluble ones. Treatment for drinking water has these stages:</p>
{{E_TREAT}}
<ol><li><b>Sedimentation and filtration.</b> Water stands in large tanks so that mud and sand sink. It then passes through beds of sand and gravel to remove smaller solids.</li><li><b>Carbon filtration.</b> Charcoal (carbon) removes unpleasant tastes and smells.</li><li><b>Chlorination.</b> Microbes are too small to be filtered out, so a small amount of chlorine is added to kill them. This prevents diseases such as cholera and typhoid.</li></ol>
<div class="key"><b>Exam tip</b>Exam questions often ask for the <i>purpose</i> of each stage. Sand: remove solids. Carbon: remove taste and smell. Chlorine: kill microbes.</div>
<h4>Fertilisers and eutrophication</h4>
<p>Plants need nitrogen (N), phosphorus (P) and potassium (K). <b>NPK fertilisers</b> supply them as soluble ions.</p>
<table><tr><th>Element</th><th>Soluble source</th><th>Helps plants to</th></tr>
<tr><td>Nitrogen</td><td>Ammonium ions NH~4~^+^, nitrate ions NO~3~^−^</td><td>Make chlorophyll and protein, and grow healthy leaves</td></tr>
<tr><td>Phosphorus</td><td>Phosphate ions PO~4~^3−^</td><td>Grow healthy roots</td></tr>
<tr><td>Potassium</td><td>Potassium ions K^+^</td><td>Grow fruit and flowers</td></tr></table>
<p>Examples of fertilisers: ammonium nitrate NH~4~NO~3~, ammonium phosphate (NH~4~)~3~PO~4~ and potassium nitrate KNO~3~. Potassium nitrate supplies two of the three elements, and ammonium phosphate supplies two. The best fertiliser for a job contains the most of the elements the plants need.</p>
<p>If too much fertiliser washes into a river or lake, nutrients build up and cause <b>eutrophication</b>.</p>
{{E_EUTRO}}`,
I("Is clear water always safe to drink?",
`<ol><li>Look at three water samples your teacher provides (tap, pond and distilled). Write down what you can see, smell and measure (appearance, pH, temperature).</li><li>Predict which sample is purest and write what evidence would prove it.</li><li>Decide which stage of water treatment would deal with each problem: mud, bad taste, microbes.</li><li>Explain why chlorine is added even to water that looks clear.</li></ol>`,
`<p><b>Test for water.</b> Add a few drops of water to white anhydrous copper(II) sulfate and to blue cobalt chloride paper. Then test ethanol and a sample of cooking oil. Record which tests are positive.</p><p><b>Make a filter.</b> Cut the bottom off a plastic bottle. Pack it with layers of cotton wool, fine sand, charcoal and gravel. Pour muddy water through and compare before and after. Explain what each layer removes.</p><p><b>Distil.</b> Heat salty water in a flask with a condenser and collect the distillate. Test both samples with silver nitrate solution. Predict first, then explain.</p><p class="safe">Safety: never drink water from experiments. Wash hands afterwards. Copper(II) sulfate is harmful and cobalt compounds are toxic, so wear eye protection and handle test papers with care.</p>`,
["https://phet.colorado.edu/en/simulations/sugar-and-salt-solutions","PhET: Sugar and Salt Solutions simulation"]),
[["Describe the colour change when water is added to anhydrous copper(II) sulfate.","White (1) to blue (1).",2],
["State the boiling point of pure water and explain how impurities change it.","100 °C (1). Impurities raise the boiling point (1).",2],
["Give two reasons why distilled water, rather than tap water, is used in experiments.","Tap water contains dissolved ions or impurities (1) which could affect the results of reactions (1).",2],
["Describe the purpose of each stage in the treatment of drinking water.","Sedimentation / sand filter removes solids (1). Carbon removes taste and smell (1). Chlorine kills microbes (1).",3],
["Name two substances in natural water that are harmful and state a harm caused by each.","Any two with effects: sewage, disease-causing microbes (1); lead, toxic (1); plastics, harms animals (1); nitrates, eutrophication (1). Maximum 2 marks.",2],
["Explain how fertiliser run-off can lead to the death of fish.","Nitrates and phosphates cause rapid algae growth (1). Algae block light so plants die (1). Bacteria decomposing the dead plants use up oxygen (1) so fish cannot respire (1).",4]],
[M("What is the colour of anhydrous cobalt(II) chloride?",["Pink","White","Blue","Green"],2,"Anhydrous cobalt chloride is blue and turns pink with water."),
M("Which stage of water treatment kills microbes?",["Sedimentation","Sand filtration","Carbon filtration","Chlorination"],3,"Chlorine kills bacteria."),
T("What is the name for a rock that stores water underground?",["aquifer"],"An aquifer."),
M("Impure water compared with pure water",["boils below 100 °C","boils above 100 °C","freezes above 0 °C","has a sharp boiling point"],1,"Impurities raise the boiling point."),
M("Which ion in a fertiliser supplies nitrogen?",["K^+^","PO~4~^3−^","NO~3~^−^","Cl^−^"],2,"Nitrate and ammonium ions supply nitrogen."),
M("Which compound supplies both nitrogen and potassium?",["Ammonium nitrate","Potassium nitrate","Ammonium phosphate","Potassium chloride"],1,"KNO~3~ contains K and N."),
T("What is the term for too many nutrients in water causing oxygen depletion?",["eutroph"],"Eutrophication."),
M("Which substance in natural water is essential for fish?",["Lead ions","Sewage","Dissolved oxygen","Plastics"],2,"Fish need dissolved oxygen.")],
[["Test for water (copper)","Anhydrous copper(II) sulfate turns white to blue."],
["Test for water (cobalt)","Anhydrous cobalt(II) chloride turns blue to pink."],
["Melting and boiling point of pure water","0 °C and 100 °C."],
["How do impurities change the boiling point?","Raise it. They lower the melting point."],
["Why use distilled water in the lab?","It has fewer dissolved impurities, so results are not affected."],
["Stages of water treatment","Sedimentation and filtration, carbon filter, chlorination."],
["What do NPK fertilisers contain?","Nitrogen, phosphorus and potassium as soluble ions."],
["What is eutrophication?","Nutrient run-off causes algal bloom, loss of oxygen and death of aquatic animals."]]);

/* ===== Lesson 10.2: Air and air pollution ===== */
const E_L102=L("Air and air pollution","The composition of clean air, separating the gases, common pollutants and how pollution is reduced.",
`<h4>The composition of clean, dry air</h4>
<p>Clean dry air is a mixture of gases. About <b>78% is nitrogen</b> and <b>21% is oxygen</b>. The last 1% is mostly argon (about 0.9%) and carbon dioxide (about 0.04%), with traces of other noble gases.</p>
{{E_AIR}}
<ul><li><b>Nitrogen:</b> making ammonia and fertilisers; packaging that keeps food fresh.</li><li><b>Oxygen:</b> breathing in hospitals, steel-making, welding.</li><li><b>Argon:</b> filament lamps, where an unreactive gas stops the filament burning away.</li></ul>
<h4>Separating the gases in air</h4>
<p>Air is separated by <b>fractional distillation</b>. The air is cooled and compressed until it becomes liquid. The liquid air is then warmed slowly in a fractionating column. Each gas boils off at its own boiling point and is collected: <b>nitrogen first</b> (−196 °C), then argon (−186 °C), then oxygen (−183 °C).</p>
<div class="key"><b>Exam tip</b>The gas with the lowest boiling point leaves first. Do not mix this up with "most reactive".</div>
<h4>Air pollutants and where they come from</h4>
<table><tr><th>Pollutant</th><th>Source</th><th>Effect</th></tr>
<tr><td>Carbon monoxide, CO</td><td>Incomplete combustion of fuels</td><td>Toxic: reduces the oxygen carried in the blood</td></tr>
<tr><td>Sulfur dioxide, SO~2~</td><td>Burning fossil fuels that contain sulfur</td><td>Acid rain and breathing problems</td></tr>
<tr><td>Nitrogen oxides, NO~x~</td><td>Car engines: nitrogen and oxygen react at high temperature</td><td>Acid rain and breathing problems</td></tr>
<tr><td>Unburnt hydrocarbons</td><td>Incomplete combustion of petrol and diesel</td><td>Smog</td></tr>
<tr><td>Carbon dioxide and methane</td><td>Burning fuels; cattle, rice fields and landfill</td><td>Greenhouse gases that cause global warming</td></tr></table>
<p><b>Acid rain</b> forms when sulfur dioxide and nitrogen oxides dissolve in rain. It damages limestone buildings, kills trees and harms life in lakes.</p>
<h4>Reducing air pollution</h4>
<ul><li><b>Catalytic converters</b> in car exhausts contain platinum or rhodium. They convert harmful gases into harmless ones: 2CO + 2NO → 2CO~2~ + N~2~.</li><li><b>Flue gas desulfurisation</b> in power stations passes the waste gas through calcium oxide or calcium carbonate, which reacts with sulfur dioxide and removes it.</li><li>Use fuels with the sulfur removed, and burn fuel completely with enough air.</li></ul>
<div class="ex"><b>Worked example</b>Which of CO, CO~2~, CH~4~, NO~2~ and SO~2~ diffuses fastest?<br>Methane, CH~4~, because it has the lowest relative molecular mass (16). Lighter molecules move faster.</div>`,
I("Where do the pollutants in the air near a busy road come from, and how could the air be made cleaner?",
`<ol><li>List every pollutant that could be found near a busy road and name its source.</li><li>Match each pollutant to its harmful effect (on people, buildings or the environment).</li><li>Predict what a catalytic converter does to each pollutant.</li><li>Suggest one change that would reduce each pollutant and one drawback of that change.</li></ol>`,
`<p><b>Oxygen in air.</b> Wet some steel wool, push it to the bottom of a test tube, invert the tube in a beaker of water and leave for a day. Measure how far the water rises. Calculate the percentage of oxygen used and compare with 21%.</p><p><b>Acid rain model.</b> Burn a very small amount of sulfur in a gas jar in a fume cupboard and add water and universal indicator. Describe the colour change and explain what it shows.</p><p><b>Mapping pollutants.</b> Use a map of your school. Mark the likely sources of pollutants and the places where each would have most effect. Propose two improvements.</p><p class="safe">Safety: sulfur dioxide is toxic. This is a teacher demonstration in a fume cupboard only. Wear eye protection.</p>`),
[["State the approximate percentages of nitrogen and oxygen in clean dry air.","Nitrogen 78% (1), oxygen 21% (1).",2],
["Describe how nitrogen and oxygen are separated from liquid air.","Fractional distillation (1). Liquid air is warmed (1). Nitrogen boils off first because it has the lower boiling point (1).",3],
["Name the source of carbon monoxide and state one harmful effect.","Incomplete combustion of fuels (1). It is toxic: it reduces oxygen carried by the blood (1).",2],
["Explain how nitrogen oxides form in a car engine.","Nitrogen and oxygen from the air react (1) at the high temperature in the engine (1).",2],
["Write the equation for the removal of CO and NO in a catalytic converter.","2CO + 2NO → 2CO~2~ + N~2~ (2).",2],
["Describe how sulfur dioxide is removed from the waste gases of a power station.","Flue gas desulfurisation (1) using calcium oxide or calcium carbonate (1).",2]],
[M("Which gas boils off first when liquid air is warmed?",["Oxygen","Argon","Nitrogen","Carbon dioxide"],2,"Nitrogen has the lowest boiling point."),
M("About what percentage of dry air is oxygen?",["12%","21%","50%","78%"],1,"Oxygen is about 21%."),
T("Name the toxic gas produced by incomplete combustion.",["carbon monoxide"],"Carbon monoxide."),
M("Which pollutant mainly causes acid rain?",["Argon","Sulfur dioxide","Methane","Water vapour"],1,"SO~2~ dissolves in rain to form acids."),
M("Which gas diffuses fastest?",["CO~2~","NO~2~","CH~4~","SO~2~"],2,"CH~4~ has the lowest relative molecular mass."),
M("What does a catalytic converter do?",["Removes carbon dioxide","Turns CO and NO into CO~2~ and N~2~","Adds oxygen to petrol","Cools the exhaust"],1,"It changes harmful gases into harmless ones."),
N("What is the approximate percentage of gases in air other than nitrogen and oxygen?",1,"%","About 1%, mainly argon."),
T("Name the gas used in filament lamps because it is unreactive.",["argon"],"Argon.")],
[["Percentage of nitrogen in air","About 78%."],
["Percentage of oxygen in air","About 21%."],
["How are the gases in air separated?","Fractional distillation of liquid air."],
["Source of nitrogen oxides in a car engine","Nitrogen and oxygen react at high temperature."],
["Harm caused by carbon monoxide","Toxic: reduces the oxygen the blood can carry."],
["What does a catalytic converter do?","Changes CO, NO and hydrocarbons into CO~2~, N~2~ and H~2~O."],
["How is SO~2~ removed from power-station gases?","Flue gas desulfurisation with calcium oxide or carbonate."],
["Cause of acid rain","SO~2~ and NO~x~ dissolving in rain."]]);

SETL(9,[E_L91,E_L92,E_L93]);
SETL(10,[E_L101,E_L102,"Climate, carbon cycle and fertilisers"]);
