/* ===== Group H: Topic 10 air quality, climate, photosynthesis, fertilisers (own wording) ===== */
const H_FG=(vb,inner,cap,label,maxw)=>`<figure class="fig"${maxw?` style="max-width:${maxw}px"`:""}><svg viewBox="${vb}" role="img" aria-label="${label}">${inner}</svg><figcaption>${cap}</figcaption></figure>`;
const H_T=(x,y,s,o)=>{o=o||{};return `<text x="${x}" y="${y}" font-size="${o.s||11}" text-anchor="${o.a||"middle"}"${o.b?' font-weight="700"':""}${o.i?' font-style="italic"':""} ${o.c?`style="fill:${o.c}"`:'fill="currentColor"'}>${s}</text>`};
const H_ARR=(x1,y1,x2,y2,col,w)=>{const a=Math.atan2(y2-y1,x2-x1),h=7,c=col||"currentColor";
  return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="${w||2}" fill="none"/><path d="M${x2} ${y2}l${(-h*Math.cos(a-.45)).toFixed(1)} ${(-h*Math.sin(a-.45)).toFixed(1)}M${x2} ${y2}l${(-h*Math.cos(a+.45)).toFixed(1)} ${(-h*Math.sin(a+.45)).toFixed(1)}" stroke="${c}" stroke-width="${w||2}" fill="none"/>`};
const H_BOX=(x,y,w,h,lines,f)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" ${f?`style="fill:${f}"`:'fill="none"'} stroke="currentColor" stroke-opacity=".6" stroke-width="1.4"/>`+lines.map((s,i)=>H_T(x+w/2,y+h/2+4-(lines.length-1)*7+i*14,s,{s:11})).join("");

FIGS.H_GHE=()=>{
  let s=`<circle cx="40" cy="38" r="20" style="fill:var(--amber)"/>`+H_T(40,74,"Sun",{s:11});
  s+=`<rect x="0" y="92" width="360" height="30" style="fill:var(--mint)" stroke="none"/><rect x="0" y="122" width="360" height="28" style="fill:var(--accent)" fill-opacity=".55"/>`+H_T(180,141,"Earth's surface",{b:1,s:11});
  s+=`<rect x="0" y="48" width="360" height="30" fill="currentColor" fill-opacity=".07"/>`+H_T(300,66,"greenhouse gases (CO~2~, CH~4~)",{s:10}).replace("~2~","₂").replace("~4~","₄");
  s+=H_ARR(70,50,150,118,"var(--amber)",2.2)+H_T(86,86,"sunlight",{s:10,a:"start",c:"var(--amber)"});
  s+=H_ARR(190,120,240,60,"var(--bad)",2)+H_ARR(250,60,215,118,"var(--bad)",2)+H_ARR(265,120,330,10,"currentColor",1.6);
  s+=H_T(262,100,"re-emitted",{s:10,a:"start",c:"var(--bad)"}).replace("x=\"262\"","x=\"268\"");
  s+=H_T(338,22,"lost to space",{s:10,a:"end"});
  return H_FG("0 0 360 152",s,"Infrared radiation from the warm surface is absorbed by greenhouse gases and sent back in all directions, so less escapes to space.","Greenhouse effect diagram",420)};

FIGS.H_CCONV=()=>{
  let s=H_BOX(10,40,70,50,["Exhaust","gases in"],"var(--mint)")+H_ARR(80,65,110,65)+
  `<rect x="110" y="30" width="140" height="70" rx="10" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
  for(let i=0;i<7;i++)s+=`<path d="M${122+i*18} 36V94" stroke="var(--amber)" stroke-width="5" opacity=".8"/>`;
  s+=H_T(180,22,"Honeycomb of Pt / Rh",{b:1,s:11})+H_ARR(250,65,280,65)+H_BOX(280,40,72,50,["Harmless","gases out"],"var(--mint)");
  s+=H_T(60,115,"CO, NO, C~x~H~y~",{s:10}).replace("~x~","").replace("~y~","")+H_T(316,115,"CO₂, N₂, H₂O",{s:10})+H_T(180,125,"2CO + 2NO → 2CO₂ + N₂",{b:1,s:12});
  return H_FG("0 0 362 135",s,"The large surface area of the honeycomb lets the metal catalysts convert pollutants quickly.","Catalytic converter diagram",440)};

FIGS.H_SCRUB=()=>{
  let s=`<rect x="120" y="14" width="120" height="110" rx="10" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
  [[150,40],[180,40],[210,40]].forEach(p=>s+=`<path d="M${p[0]} ${p[1]}l-4 14M${p[0]+8} ${p[1]}l-4 14" stroke="var(--blu)" stroke-width="2"/>`);
  s+=H_T(180,34,"lime slurry spray (CaO / CaCO₃)",{s:9.5})+H_ARR(10,100,118,100,"var(--bad)",2.2)+H_T(64,90,"waste gas",{s:10})+H_T(64,118,"SO₂",{s:10,b:1,c:"var(--bad)"})+H_ARR(242,100,350,100,"var(--accent)",2.2)+H_T(298,90,"cleaned gas",{s:10})+H_T(180,112,"SO₂ + CaO → CaSO₃",{s:10,b:1});
  s+=H_T(180,138,"90–95% of SO₂ removed",{s:10,i:1});
  return H_FG("0 0 360 145",s,"A scrubber in a coal-fired power station: the gas meets a spray of calcium compounds that trap sulfur dioxide.","Flue gas scrubber diagram",440)};

FIGS.H_CARBON=()=>{
  let s=H_BOX(120,6,120,34,["CO₂ in the air"],"var(--mint)")+H_BOX(8,100,100,40,["Plants","(and algae)"],"var(--mint)")+H_BOX(130,100,100,40,["Animals"],"var(--mint)")+H_BOX(252,100,100,40,["Fossil fuels","coal, oil, gas"],"var(--peach)")+H_BOX(130,162,100,30,["Dead matter, decay"],"");
  s+=H_ARR(140,40,70,98,"var(--accent)",2)+H_T(52,64,"photosynthesis",{s:9.5,a:"start",c:"var(--accent)"}).replace('x="52"','x="12"');
  s+=H_ARR(58,100,125,40,"currentColor",1.4);
  s+=H_ARR(180,100,180,42,"currentColor",1.4)+H_T(186,75,"respiration",{s:9.5,a:"start"});
  s+=H_ARR(300,100,236,38,"var(--bad)",2)+H_T(300,76,"combustion",{s:9.5,a:"start",c:"var(--bad)"});
  s+=H_ARR(60,140,130,172,"currentColor",1.2)+H_ARR(180,140,180,160,"currentColor",1.2)+H_ARR(230,172,300,142,"currentColor",1.2)+H_T(268,168,"over millions of years",{s:9,a:"start",i:1}).replace('x="268"','x="236"').replace('y="168"','y="188"');
  return H_FG("0 0 360 198",s,"Carbon moves between the air, living things and fossil fuels. Photosynthesis removes CO₂; respiration and burning return it.","Carbon cycle diagram",440)};

FIGS.H_EUTRO=()=>{
  const st=[["1","Fertiliser","runs into river"],["2","Algae","grow rapidly"],["3","Light blocked,","plants die"],["4","Bacteria use","up oxygen"],["5","Fish and","animals die"]];
  let s="";st.forEach((a,i)=>{s+=H_BOX(4+i*71,16,64,56,[a[1],a[2]],i==4?"var(--peach)":"var(--mint)");s+=H_T(36+i*71,12,a[0],{b:1,s:10});if(i<4)s+=H_ARR(68+i*71,44,75+i*71,44,"currentColor",1.6)});
  return H_FG("0 0 360 84",s,"The chain of events in eutrophication, from nutrient run-off to dead aquatic life.","Eutrophication chain",440)};

const H_L1=L("Greenhouse gases and climate change","Where carbon dioxide, methane and the other air pollutants come from, and how the greenhouse effect leads to global warming.",
`<h4>Air pollutants: sources and effects</h4>
<p>Human activity adds gases and particles to the air. The table links each pollutant to where it comes from and what harm it does.</p>
<div class="tw"><table><tr><th>Pollutant</th><th>Source</th><th>Harmful effect</th></tr>
<tr><td>Carbon dioxide, CO~2~</td><td>Complete combustion of fuels, e.g. CH~4~ + 2O~2~ → CO~2~ + 2H~2~O</td><td>Global warming</td></tr>
<tr><td>Carbon monoxide, CO</td><td>Incomplete combustion, e.g. C~8~H~18~ + 10O~2~ → 5CO + 3CO~2~ + 9H~2~O</td><td>Toxic: binds to haemoglobin so blood carries less oxygen</td></tr>
<tr><td>Particulates (soot, C)</td><td>Incomplete combustion, e.g. CH~4~ + O~2~ → C + 2H~2~O</td><td>Breathing problems and cancer</td></tr>
<tr><td>Methane, CH~4~</td><td>Animal digestion, rotting plants, swamps, rice fields, landfill</td><td>Global warming</td></tr>
<tr><td>Oxides of nitrogen</td><td>Nitrogen and oxygen react at high temperature (engines, furnaces, lightning); soil bacteria</td><td>Photochemical smog and acid rain; irritate lungs, eyes and throat</td></tr>
<tr><td>Sulfur dioxide, SO~2~</td><td>Burning fuels that contain sulfur: S + O~2~ → SO~2~</td><td>Acid rain</td></tr></table></div>
<div class="key"><b>Exam tip</b>Plenty of air: complete combustion gives CO~2~ and H~2~O. Too little air (incomplete): CO, H~2~O and sometimes soot.</div>
<h4>The greenhouse effect</h4>
<p>The Sun's radiation reaches the Earth and warms the surface. The surface sends the energy back out as <b>infrared (thermal) radiation</b>. Some of it escapes to space. Greenhouse gases such as carbon dioxide and methane absorb part of it and re-emit it in every direction, including back to the surface. This keeps the planet warm: the <b>greenhouse effect</b>.</p>
{{H_GHE}}
<h4>Extended: the enhanced greenhouse effect</h4>
<p>Human activities raise the concentration of greenhouse gases. More infrared is trapped, so the average temperature of the Earth rises. This is <b>global warming</b>, and the extra trapping is the <b>enhanced greenhouse effect</b>.</p>
<h4>Consequences of global warming</h4>
<ul><li>Climate change: shifting weather patterns, more droughts and floods.</li><li>Melting glaciers and ice raise sea levels, flooding low-lying countries.</li><li>Habitats are lost, so some species become extinct.</li><li>Species move to new areas that suit them better.</li><li>Warmer conditions help some diseases spread.</li></ul>
<div class="ex"><b>Worked example</b>Explain why too little oxygen during burning is dangerous.<br>Incomplete combustion makes carbon monoxide. CO combines with haemoglobin in red blood cells, so less oxygen is carried round the body.</div>`,
I("Is the greenhouse effect good or bad?","<ol><li>Without any greenhouse gases the Earth's average temperature would be about −18 °C. It is about 15 °C. What does this tell you?</li><li>Explain why the problem is the <i>enhanced</i> greenhouse effect.</li><li>Rank the six pollutants by how many people they could affect. Justify your order.</li></ol>",
`<p><b>Data task.</b> Plot the CO~2~ and temperature data your teacher gives you against year. Describe the pattern and say why a pattern alone does not prove a cause.</p><p><b>Bottle model.</b> Put a thermometer in each of two clear bottles, one filled with air and one with CO~2~ (from vinegar and baking soda). Shine a lamp on both for 15 minutes, taking readings each minute. Evaluate how well the model matches the real atmosphere.</p><p class="safe">Safety: eye protection; do not seal a bottle while gas is still being made.</p>`),
[["Name the gas formed by incomplete combustion that is toxic and state how it harms the body.","Carbon monoxide (1). It combines with haemoglobin so the blood carries less oxygen (1).",2],
["Give two sources of methane.","Any two: digestion in animals; rotting vegetation; swamps; rice fields; landfill (2).",2],
["Explain how nitrogen oxides form in a car engine.","Nitrogen and oxygen from air react (1) at the high temperature inside the engine (1).",2],
["Describe the greenhouse effect.","Surface emits infrared (1). Greenhouse gases absorb some of it (1) and re-emit it in all directions, including back to Earth, keeping it warm (1).",3],
["Extended: explain how burning fossil fuels causes global warming.","Burning releases CO~2~ (1). More greenhouse gas absorbs and re-emits more infrared (1). Less escapes to space so the average temperature rises (1).",3],
["State two consequences of global warming.","Any two: rising sea levels and flooding; habitat loss and extinction; migration of species; spread of disease; climate change (2).",2]],
[M("Which gas is produced by incomplete combustion?",["Carbon dioxide","Carbon monoxide","Methane","Nitrogen"],1,"Not enough oxygen gives CO."),
M("Which is a greenhouse gas?",["Argon","Nitrogen","Methane","Oxygen"],2,"CH~4~ and CO~2~ absorb infrared."),
M("Soot is also called",["particulates","smog","slurry","residue"],0,"Carbon particles are particulates."),
M("Which source produces methane?",["Car engines","Rice fields","Lightning","Power-station scrubbers"],1,"Bacteria in waterlogged soil make methane."),
M("Radiation re-emitted by the Earth's surface is mainly",["ultraviolet","infrared","X-rays","visible light"],1,"Warm surfaces emit infrared."),
T("What name is given to the rise in average temperature of the Earth?",["global warming"],"Global warming."),
M("Which is a consequence of global warming?",["Falling sea levels","Melting ice and flooding","Less disease","Cooler summers"],1,"Melting ice raises sea level."),
T("Which pollutant forms when nitrogen reacts with oxygen at high temperature?",["oxides of nitrogen","nitrogen oxides","nox","no2","nitrogen dioxide","nitrogen monoxide"],"Oxides of nitrogen.")],
[["Why is carbon monoxide toxic?","It binds to haemoglobin so blood carries less oxygen."],
["Products of complete combustion of a hydrocarbon","Carbon dioxide and water."],
["Products of incomplete combustion","Carbon monoxide, water and sometimes carbon (soot)."],
["Sources of methane","Animals, rotting plants, swamps, rice fields, landfill."],
["Two greenhouse gases","Carbon dioxide and methane."],
["What is the greenhouse effect?","Greenhouse gases absorb and re-emit infrared, keeping Earth warm."],
["What is global warming?","Rise in the Earth's average temperature from more greenhouse gases."],
["Two effects of global warming","Sea-level rise and flooding; habitat loss and species moving."]]);

const H_L2=L("Reducing environmental effects","Practical ways to cut carbon dioxide, methane, acid-rain gases and car exhaust pollution, including catalytic converters.",
`<h4>Acid rain</h4>
<p>Sulfur dioxide and oxides of nitrogen dissolve in rain to make acidic solutions. Acid rain corrodes metal structures, dissolves carbonate rock in buildings and statues, harms water life and damages crops and water supplies. Cutting these gases cuts acid rain.</p>
<h4>Cutting carbon dioxide</h4>
<ul><li>Use hydrogen and renewable energy (solar, wind) instead of fossil fuels.</li><li>Use fuel-efficient vehicles, such as electric and hybrid cars; use public transport and car-sharing.</li><li>Recycle and reuse products made from crude oil.</li><li>Save household energy (lights off, efficient appliances).</li><li>Stop deforestation and plant trees, since trees take in CO~2~ by photosynthesis.</li></ul>
<h4>Cutting methane</h4>
<p>Methane is made during digestion in farm animals, so keeping fewer livestock reduces emissions.</p>
<h4>Cutting sulfur dioxide</h4>
<p>The main method is to use fuels with little sulfur. In coal-fired power stations the waste gas passes through a scrubbing chamber. A wet slurry of <b>calcium oxide and calcium carbonate</b> is sprayed through it. The calcium compounds react with SO~2~ to make <b>calcium sulfate</b>. A scrubber removes 90–95% of the SO~2~.</p>
{{H_SCRUB}}
<div class="key"><b>Exam tip</b>You only need the examples given above. Say "low-sulfur fuel" and "scrubbing with calcium compounds" for SO~2~.</div>
<h4>Extended: catalytic converters</h4>
<p>In engines nitrogen and oxygen react at high pressure and temperature to make NO and NO~2~. Exhaust gas also contains CO and unburnt hydrocarbons. A <b>catalytic converter</b> in the exhaust makes these harmless. Its transition metal catalysts, <b>platinum and rhodium</b>, are spread over a honeycomb to give a large surface area. Redox reactions take place:</p>
<ul><li>CO is <b>oxidised</b> to CO~2~: 2CO + O~2~ → 2CO~2~</li><li>Oxides of nitrogen are <b>reduced</b> to N~2~: 2NO → N~2~ + O~2~ and 2NO~2~ → N~2~ + 2O~2~</li><li>Overall: 2NO + 2CO → N~2~ + 2CO~2~</li><li>Hydrocarbons are oxidised: C~8~H~18~ + 12½O~2~ → 8CO~2~ + 9H~2~O</li></ul>
{{H_CCONV}}
<div class="ex"><b>Worked example</b>Why is the catalyst in a converter spread over a honeycomb?<br>The honeycomb gives a very large surface area, so more gas touches the catalyst and reacts faster.</div>`,
I("Which action would cut the most pollution for your town?","<ol><li>List the measures in the notes and say which gas each reduces.</li><li>Choose the three you think are most realistic for your town. Give a cost or drawback for each.</li><li>Decide how you would test whether the measures work.</li></ol>",
`<p><b>Decision matrix.</b> In groups, score each measure (1–5) for effectiveness, cost and ease. Total the scores and defend your top choice.</p><p><b>Scrubber model.</b> Bubble the gas from a small amount of burning sulfur in a fume cupboard through limewater (teacher demonstration). Observe and explain the cloudy result.</p><p class="safe">Safety: SO~2~ is toxic; fume cupboard only, teacher demonstration, eye protection.</p>`),
[["Name the two gases mainly responsible for acid rain.","Sulfur dioxide (1) and oxides of nitrogen (1).",2],
["State two ways of reducing carbon dioxide emissions.","Any two: renewable energy; electric or hybrid cars; public transport; save energy; plant trees (2).",2],
["Describe how sulfur dioxide is removed from power-station waste gases.","Gases pass through a scrubber (1) sprayed with a slurry of calcium oxide and calcium carbonate (1) forming calcium sulfate (1).",3],
["Extended: write the overall equation for NO and CO in a catalytic converter.","2NO + 2CO → N~2~ + 2CO~2~ (2).",2],
["Extended: name two metals used in catalytic converters and explain why they are on a honeycomb.","Platinum and rhodium (1). Large surface area (1).",2],
["Extended: explain why the change from CO to CO~2~ is oxidation.","CO gains oxygen (1) to form CO~2~ (1).",2]],
[M("Which fuel property most reduces SO~2~ emissions?",["Low sulfur content","High density","Low boiling point","High carbon content"],0,"Less sulfur gives less SO~2~."),
M("Calcium sulfate forms in a scrubber from SO~2~ and",["calcium compounds","sodium chloride","water only","carbon"],0,"CaO or CaCO~3~ slurry traps SO~2~."),
M("Planting trees reduces CO~2~ because trees",["respire","photosynthesise","burn","decompose"],1,"Photosynthesis takes in CO~2~."),
M("Why reduce livestock farming?",["It lowers methane","It lowers SO~2~","It lowers NO","It lowers noble gases"],0,"Animals produce methane when digesting."),
M("In a catalytic converter NO is",["oxidised","reduced","neutralised","distilled"],1,"NO loses oxygen to become N~2~."),
T("Name one metal used as a catalyst in a catalytic converter.",["platinum","rhodium"],"Platinum or rhodium."),
M("What does the honeycomb do?",["Heats the gas","Gives a large surface area","Filters soot only","Stores CO~2~"],1,"More area means faster reaction."),
N("How many CO~2~ molecules form when 2 molecules of CO react in 2NO + 2CO → N~2~ + 2CO~2~?",2,"","2CO give 2CO~2~.")],
[["Cause of acid rain","SO~2~ and oxides of nitrogen dissolving in rain."],
["How is SO~2~ reduced?","Low-sulfur fuel; scrubbing with calcium oxide/carbonate."],
["Product of scrubbing SO~2~","Calcium sulfate."],
["How can methane emissions fall?","Keep fewer livestock."],
["Why plant trees?","Photosynthesis removes CO~2~ from the air."],
["Metals in a catalytic converter","Platinum and rhodium on a honeycomb."],
["Overall converter equation","2NO + 2CO → N~2~ + 2CO~2~"],
["Oxidation or reduction: CO → CO~2~?","Oxidation (gains oxygen)."]]);

const H_L3=L("Photosynthesis and the carbon cycle","How plants capture energy and carbon dioxide, and how carbon moves between the air, living things and fuels.",
`<h4>Photosynthesis</h4>
<p>Green plants make glucose from <b>carbon dioxide and water</b>, releasing <b>oxygen</b>. The reaction needs light energy, absorbed by <b>chlorophyll</b> in chloroplasts. Because energy is taken in from the surroundings, photosynthesis is <b>endothermic</b>.</p>
<div class="key"><b>Word equation</b>carbon dioxide + water → glucose + oxygen (in light, with chlorophyll)</div>
<h4>Extended: symbol equation</h4>
<p>6CO~2~ + 6H~2~O → C~6~H~12~O~6~ + 6O~2~</p>
<div class="ex"><b>Worked example</b>How many molecules of oxygen form from 12 molecules of carbon dioxide?<br>The ratio CO~2~ : O~2~ is 6 : 6, so 12 CO~2~ give 12 O~2~.</div>
<h4>The carbon cycle</h4>
<p>Photosynthesis <b>removes</b> CO~2~ from the air. Respiration (plants and animals), combustion of fuels and decay <b>return</b> it. Over a long time, buried dead matter forms fossil fuels, which store carbon until they are burned. Burning fossil fuels adds CO~2~ faster than plants can absorb it, so levels in the air rise.</p>
{{H_CARBON}}
<h4>Why trees matter</h4>
<p>Forests take in CO~2~. Cutting them down (deforestation) and burning them both lowers uptake and adds CO~2~, so planting trees helps reduce global warming.</p>`,
I("Where does the carbon in a tree come from?","<ol><li>Write down what you think the mass of a tree is made from.</li><li>Use the photosynthesis equation to decide which reactant supplies the carbon.</li><li>Draw a flow diagram for one carbon atom starting in the air, becoming part of a plant, then an animal, then returning to the air.</li></ol>",
`<p><b>Pondweed test.</b> Place pondweed in water with a little sodium hydrogencarbonate under a funnel and test tube. Move a lamp closer and count bubbles per minute at each distance. Describe the link between light and the rate of photosynthesis. Test the gas collected with a glowing splint.</p><p class="safe">Safety: keep mains lamp away from water; eye protection.</p>`),
[["State the word equation for photosynthesis.","Carbon dioxide + water → glucose + oxygen (2).",2],
["Name the substance in chloroplasts that absorbs light.","Chlorophyll (1).",1],
["Explain why photosynthesis is endothermic.","It takes in energy (1) from light (1).",2],
["Extended: write the balanced symbol equation for photosynthesis.","6CO~2~ + 6H~2~O → C~6~H~12~O~6~ + 6O~2~ (2).",2],
["Name two processes that return carbon dioxide to the air.","Any two: respiration; combustion; decay (2).",2],
["Explain why deforestation increases CO~2~ in the air.","Fewer trees so less photosynthesis (1); burning or rotting felled trees releases CO~2~ (1).",2]],
[M("Photosynthesis needs",["light and chlorophyll","heat only","oxygen and glucose","nitrogen"],0,"Light energy is absorbed by chlorophyll."),
M("Which is a product of photosynthesis?",["Carbon dioxide","Glucose","Water only","Methane"],1,"Glucose and oxygen form."),
M("Photosynthesis is",["exothermic","endothermic","a neutralisation","a displacement"],1,"Energy is absorbed."),
T("Name the green pigment in chloroplasts.",["chlorophyll"],"Chlorophyll."),
M("Which process removes CO~2~ from the air?",["Combustion","Respiration","Photosynthesis","Decay"],2,"Plants take it in."),
N("In 6CO~2~ + 6H~2~O → C~6~H~12~O~6~ + 6O~2~, how many molecules of O~2~ form from 18 molecules of CO~2~?",18,"","Ratio CO~2~ : O~2~ is 1 : 1."),
M("Fossil fuels formed from",["buried dead organisms","volcanic gas","limestone","sea salt"],0,"Dead matter was buried over millions of years."),
M("Burning fossil fuels",["removes CO~2~","adds CO~2~","adds oxygen","has no effect on air"],1,"Combustion releases CO~2~.")],
[["Word equation for photosynthesis","Carbon dioxide + water → glucose + oxygen."],
["Symbol equation (Extended)","6CO~2~ + 6H~2~O → C~6~H~12~O~6~ + 6O~2~"],
["What absorbs light in plants?","Chlorophyll in chloroplasts."],
["Is photosynthesis endothermic?","Yes, it absorbs energy from light."],
["Which processes put CO~2~ into the air?","Respiration, combustion, decay."],
["Which process takes CO~2~ out of the air?","Photosynthesis."],
["How are fossil fuels formed?","From dead organisms buried over millions of years."],
["Why plant trees?","They absorb CO~2~ by photosynthesis."]]);

const H_L4=L("Fertilisers","Why crops need nitrogen, phosphorus and potassium, how ammonium nitrate is made and how fertiliser run-off causes eutrophication.",
`<h4>Why plants need fertilisers</h4>
<p>Crops take nutrients out of the soil. To replace them farmers add fertilisers. The three main elements are <b>nitrogen (N), phosphorus (P) and potassium (K)</b>. NPK fertilisers contain compounds of all three, such as ammonium and nitrate salts.</p>
<h4>Making ammonium nitrate</h4>
<p>Ammonia (from the Haber process) is neutralised with nitric acid: NH~3~ + HNO~3~ → NH~4~NO~3~. Ammonium nitrate is rich in nitrogen. Ammonium salts give off ammonia gas when warmed with an alkali, which can be used as a test.</p>
<h4>Eutrophication</h4>
<p>When rain washes extra fertiliser into rivers and lakes, nutrients build up. Algae multiply into a bloom, cutting off light. Plants below die. Bacteria that decompose the dead material use up dissolved oxygen, so fish and other animals die.</p>
{{H_EUTRO}}
<div class="key"><b>Exam tip</b>Put the stages in order and mention <i>oxygen</i> running out. Say "algal bloom" and "decomposers use up oxygen".</div>
<div class="ex"><b>Worked example</b>Calculate the percentage of nitrogen in NH~4~NO~3~ (A~r~: N 14, H 1, O 16).<br>M~r~ = 14 + 4 + 14 + 48 = 80. Two N atoms = 28. 28 ÷ 80 × 100 = <b>35%</b>.</div>`,
I("How can a farmer get high yields without harming the river?","<ol><li>List what a crop takes from soil and what a fertiliser supplies.</li><li>Trace how nutrients get from the field to the river.</li><li>Suggest ways to reduce run-off and test one idea.</li></ol>",
`<p><b>Algae model.</b> Set up three jars of pond water with no fertiliser, a little, and a lot. Keep in light for two weeks and compare the green colour. Explain what this models.</p><p><b>Test for ammonium.</b> Warm a solid ammonium salt with sodium hydroxide solution and test the gas with damp red litmus (teacher demonstration).</p><p class="safe">Safety: eye protection; fume cupboard for ammonia; wash hands after pond water.</p>`),
[["State what N, P and K stand for in NPK fertilisers.","Nitrogen (1), phosphorus (1), potassium (1).",3],
["Write the equation for making ammonium nitrate from ammonia.","NH~3~ + HNO~3~ → NH~4~NO~3~ (2).",2],
["Describe how fertiliser causes eutrophication.","Run-off enters water (1); algal bloom (1); light blocked, plants die (1); bacteria use up oxygen (1); animals die (1).",5],
["Calculate the percentage of nitrogen in NH~4~NO~3~ (A~r~: N 14, H 1, O 16).","M~r~ = 80 (1); 28 ÷ 80 × 100 = 35% (1).",2]],
[M("Which element is NOT in NPK?",["Nitrogen","Phosphorus","Potassium","Sulfur"],3,"NPK is nitrogen, phosphorus, potassium."),
M("Ammonium nitrate forms from",["NH~3~ and HNO~3~","NaOH and HCl","N~2~ and O~2~","NH~3~ and HCl"],0,"Ammonia neutralises nitric acid."),
T("What is the name of the process caused by excess fertiliser in water?",["eutroph"],"Eutrophication."),
M("Fish die in eutrophication mainly because",["water gets too cold","oxygen runs out","algae poison them directly","there is too much light"],1,"Decomposers use up oxygen."),
N("What is the M~r~ of NH~4~NO~3~?",80,"","14+4+14+48."),
M("Ammonium salts + alkali on warming give",["hydrogen","ammonia","chlorine","carbon dioxide"],1,"Ammonia gas is released."),
M("Algal bloom blocks",["oxygen","light","carbon","nitrogen"],1,"Dense algae shade the water."),
N("What is the percentage of nitrogen in NH~4~NO~3~?",35,"%","28/80×100.")],
[["What do N, P and K stand for?","Nitrogen, phosphorus, potassium."],
["Equation for ammonium nitrate","NH~3~ + HNO~3~ → NH~4~NO~3~"],
["Test for ammonium ions","Warm with alkali; ammonia turns damp red litmus blue."],
["What is eutrophication?","Fertiliser run-off causing algal bloom and oxygen depletion."],
["Why do plants below algae die?","The algae block light."],
["Why do fish die?","Bacteria decomposing dead plants use up oxygen."],
["Percentage N in ammonium nitrate","35%."],
["Source of ammonia for fertilisers","The Haber process."]]);

SETL(10,["Water and water pollution","Air and air pollution",H_L1,H_L2,H_L3,H_L4]);
