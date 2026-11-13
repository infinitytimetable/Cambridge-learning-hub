/* ===== Group C: Topic 6 Chemical reactions (rates, equilibrium, redox), rebuilt from the teacher's notes in own wording ===== */
/* ---------- figure helpers and rate figures ---------- */
const C6={
  FG:(vb,inner,cap,label,mw)=>`<figure class="fig"${mw?` style="max-width:${mw}px"`:""}><svg viewBox="${vb}" role="img" aria-label="${label}">${inner}</svg><figcaption>${cap}</figcaption></figure>`,
  TX:(x,y,t,o)=>{o=o||{};return `<text x="${x}" y="${y}" font-size="${o.s||11.5}" text-anchor="${o.a||"middle"}"${o.b?' font-weight="700"':""}${o.c?` style="fill:${o.c}"`:' fill="currentColor"'}${o.r?` transform="rotate(${o.r} ${x} ${y})"`:""}>${t}</text>`},
  AX:(x0,y0,x1,y1,xl,yl)=>`<path d="M${x0} ${y1}V${y0}M${x0} ${y1}H${x1}" fill="none" stroke="currentColor" stroke-width="1.5"/>`+C6.TX((x0+x1)/2,y1+24,xl,{s:11})+C6.TX(x0-30,(y0+y1)/2,yl,{s:11,r:-90}),
  ARW:(x1,y1,x2,y2,c)=>{const a=Math.atan2(y2-y1,x2-x1),h=7,k=c||"currentColor";return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${k}" stroke-width="2" fill="none"/><path d="M${x2} ${y2}l${(-h*Math.cos(a-.45)).toFixed(1)} ${(-h*Math.sin(a-.45)).toFixed(1)}M${x2} ${y2}l${(-h*Math.cos(a+.45)).toFixed(1)} ${(-h*Math.sin(a+.45)).toFixed(1)}" stroke="${k}" stroke-width="2" fill="none" stroke-linecap="round"/>`},
  BOX:(x,y,w,h,lines,o)=>{o=o||{};return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" style="fill:${o.f||"var(--surface2)"}" stroke="currentColor" stroke-opacity=".6" stroke-width="1.4"/>`+lines.map((t,i)=>C6.TX(x+w/2,y+h/2-(lines.length-1)*7+4+i*14,t,{s:o.s||11,b:i===0&&o.b})).join("")},
  FLASK:(cx,top,liq)=>{const y1=top+30,y2=top+85,hw=y=>8+(y-y1)*28/(y2-y1);const ly=top+60;return (liq?`<polygon points="${cx-hw(ly)},${ly} ${cx+hw(ly)},${ly} ${cx+36},${y2} ${cx-36},${y2}" style="fill:var(--accent)" fill-opacity=".35"/>`:"")+`<path d="M${cx-8} ${top}V${y1}L${cx-36} ${y2}H${cx+36}L${cx+8} ${y1}V${top}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`}
};
FIGS.C_APP=()=>{const {TX,FLASK}=C6;
  let s=FLASK(60,56,1)+`<rect x="50" y="48" width="20" height="10" rx="2" fill="currentColor" fill-opacity=".5"/><path d="M60 48V34H150" fill="none" stroke="currentColor" stroke-width="1.6"/>`
   +`<rect x="150" y="22" width="72" height="26" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="186" y="25" width="6" height="20" style="fill:var(--accent)"/><path d="M192 35H236M236 26V44" stroke="currentColor" stroke-width="1.6"/>`
   +TX(110,172,"Gas syringe",{b:1})+TX(110,187,"gas volume against time",{s:10.5});
  s+=FLASK(330,56,1)+`<rect x="320" y="48" width="20" height="10" rx="5" fill="#fff" stroke="currentColor"/>`+`<rect x="268" y="148" width="124" height="28" rx="5" style="fill:var(--surface2)" stroke="currentColor" stroke-width="1.5"/><rect x="312" y="154" width="36" height="16" rx="3" fill="#10252F"/>`+TX(330,166,"g",{s:11,c:"#8fe8c0",b:1})+TX(330,12,"cotton wool in neck",{s:10.5})+TX(330,192,"Loss in mass",{b:1});
  s+=FLASK(470,56,1)+`<rect x="460" y="48" width="20" height="10" rx="2" fill="currentColor" fill-opacity=".5"/><path d="M470 48V34H500V172H575V128" fill="none" stroke="currentColor" stroke-width="1.6"/>`
   +`<rect x="520" y="120" width="130" height="56" rx="3" style="fill:var(--accent)" fill-opacity=".25" stroke="currentColor" stroke-width="1.4"/><rect x="562" y="52" width="26" height="100" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="563" y="116" width="24" height="35" style="fill:var(--accent)" fill-opacity=".4"/>`
   +TX(585,192,"Inverted measuring cylinder",{b:1,s:11});
  return C6.FG("0 0 660 202",s,"Three ways of following a reaction that makes a gas","Apparatus: gas syringe, flask on a balance with cotton wool, and an inverted measuring cylinder over water",760)};
FIGS.C_RATEGRAPH=()=>{const {TX,AX}=C6;
  let s=AX(50,20,330,170,"Time / s","Volume of gas / cm³")+`<path d="M50 170Q100 40 330 40" fill="none" style="stroke:var(--accent)" stroke-width="3"/>`
   +`<path d="M40 168L160 23" stroke="var(--bad)" stroke-width="1.8" stroke-dasharray="6 4" fill="none"/><path d="M40 168H160V23" stroke="currentColor" stroke-width="1.2" fill="none" stroke-opacity=".7"/>`
   +`<circle cx="77" cy="123" r="4" style="fill:var(--bad)"/>`+TX(100,184,"Δx",{b:1})+TX(172,100,"Δy",{b:1,a:"start"})+TX(205,128,"Rate = Δy ÷ Δx",{a:"start",c:"var(--bad)",b:1,s:12})+TX(205,144,"gradient of the tangent",{a:"start",s:10.5})
   +TX(262,86,"curve levels off:",{s:10.5})+TX(262,100,"reaction has stopped",{s:10.5});
  return C6.FG("0 0 390 200",s,"The steeper the tangent, the faster the reaction at that moment. The curve is steepest at the start.","Graph of gas volume against time with a tangent drawn to find the rate",480)};
FIGS.C_FACT=()=>{const {TX,AX}=C6;
  let s=AX(50,20,330,170,"Time","Total product")+`<path d="M50 39H330" stroke="currentColor" stroke-opacity=".4" stroke-dasharray="5 4"/>`
   +`<path d="M50 170Q85 38 330 38" fill="none" style="stroke:var(--bad)" stroke-width="3"/><path d="M50 170Q190 38 330 40" fill="none" style="stroke:var(--accent)" stroke-width="3"/>`
   +TX(72,24,"faster conditions",{a:"start",c:"var(--bad)",b:1,s:11.5})+TX(72,38,"steeper start",{a:"start",s:10.5})
   +TX(225,138,"slower conditions",{a:"start",c:"var(--accent)",b:1,s:11.5})+TX(225,152,"gentler start",{a:"start",s:10.5})+TX(346,24,"same final amount of product",{a:"end",s:10.5});
  return C6.FG("0 0 390 200",s,"A faster reaction has a steeper graph but makes the same total product, if the amount of limiting reactant is unchanged.","Two reaction graphs: the faster one is steeper and levels off sooner, with the same final amount of product",480)};
FIGS.C_CUBES=()=>{const {TX}=C6;
  let s=`<rect x="30" y="30" width="96" height="96" style="fill:var(--accent)" fill-opacity=".5" stroke="currentColor" stroke-width="1.6"/>`+TX(78,82,"2 cm",{b:1})
   +[0,1].map(i=>[0,1].map(j=>`<rect x="${190+i*54}" y="${30+j*54}" width="46" height="46" style="fill:var(--bad)" fill-opacity=".45" stroke="currentColor" stroke-width="1.6"/>`).join("")).join("")
   +TX(78,150,"1 cube of side 2 cm",{s:11})+TX(78,166,"6 × (2 × 2) = 24 cm²",{b:1,s:11.5})+TX(244,150,"8 cubes of side 1 cm",{s:11})+TX(244,166,"8 × 6 × (1 × 1) = 48 cm²",{b:1,s:11.5});
  return C6.FG("0 0 330 180",s,"Cutting a solid into smaller pieces doubles the surface area here. Same mass, more exposed surface.","A 2 cm cube with surface area 24 square centimetres and the same cube cut into eight 1 cm cubes with surface area 48 square centimetres",420)};
FIGS.C_COLL=()=>{const {TX}=C6,r=rng(5);
  const box=(x,n,lab)=>{let t=`<rect x="${x}" y="10" width="130" height="110" rx="6" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.5"/>`;
    for(let i=0;i<n;i++)t+=`<circle cx="${(x+14+r()*102).toFixed(0)}" cy="${(24+r()*82).toFixed(0)}" r="6" style="fill:${i%2?"var(--bad)":"var(--accent)"}"/>`;
    return t+TX(x+65,138,lab,{b:1,s:11.5})};
  const s=box(10,5,"Low concentration")+box(170,12,"High concentration")+C6.ARW(145,64,165,64);
  return C6.FG("0 0 310 166",s,"More particles per unit volume means more collisions per second. For a gas, higher pressure packs the same particles into a smaller volume.","Two boxes of particles: few particles at low concentration and many particles at high concentration","")};
FIGS.C_SUCC=()=>{const {TX,ARW}=C6;
  const panel=(x,ok)=>{let t=`<circle cx="${x+34}" cy="60" r="16" style="fill:var(--accent)"/><circle cx="${x+120}" cy="60" r="16" style="fill:var(--bad)"/>`+ARW(x+4,60,x+16,60)+ARW(x+150,60,x+138,60);
    if(ok)t+=`<path d="M${x+60} 40l10 10-10 10M${x+94} 40l-10 10 10 10" fill="none" stroke="currentColor" stroke-width="2"/>`+TX(x+77,100,"enough energy",{b:1,s:11.5})+TX(x+77,115,"and correct orientation",{s:10.5})+TX(x+77,134,"successful: atoms rearrange",{s:10.5,c:"var(--accent)",b:1});
    else t+=ARW(x+60,34,x+48,26)+ARW(x+94,34,x+106,26)+TX(x+77,100,"too little energy",{b:1,s:11.5})+TX(x+77,115,"or wrong orientation",{s:10.5})+TX(x+77,134,"unsuccessful: they bounce off",{s:10.5,c:"var(--bad)",b:1});
    return t};
  return C6.FG("0 0 370 150",panel(0,1)+panel(190,0),"Only collisions with at least the activation energy lead to a reaction.","Two collision diagrams: a successful collision with enough energy and an unsuccessful collision that bounces apart",520)};
FIGS.C_EA=()=>{const {TX,AX,ARW}=C6;
  let s=AX(44,12,340,176,"Progress of reaction","Energy")+`<path d="M52 110H100C125 110 130 30 170 30S215 140 240 140H330" fill="none" style="stroke:var(--bad)" stroke-width="3"/><path d="M52 110H100C118 110 124 66 170 66S218 140 240 140H330" fill="none" style="stroke:var(--accent)" stroke-width="3"/>`
   +TX(56,102,"Reactants",{a:"start",s:11})+TX(246,134,"Products",{a:"start",s:11})+TX(190,26,"Eₐ without catalyst",{a:"start",c:"var(--bad)",b:1,s:11})+TX(190,62,"Eₐ with catalyst (lower)",{a:"start",c:"var(--accent)",b:1,s:11})
   +`<path d="M156 110V32" stroke="var(--bad)" stroke-width="1.4" fill="none" stroke-dasharray="4 3"/><path d="M176 110V68" stroke="var(--accent)" stroke-width="1.4" fill="none" stroke-dasharray="4 3"/>`;
  return C6.FG("0 0 360 206",s,"A catalyst gives the reaction a different route with a lower activation energy. The reactants and products stay at the same energy.","Energy profile with two peaks: a high peak without a catalyst and a lower peak with a catalyst",480)};

/* ---------- Lesson 6.1 ---------- */
const C6_L1=L("Chemical change and measuring rates","Telling physical and chemical changes apart, ways of following a reaction, and reading and calculating rates from graphs.",
`<h4>Physical and chemical changes</h4>
<p>In a <b>physical change</b> no new substance forms. The particles are rearranged or separated, but each substance is still the same chemical. Physical changes are usually easy to reverse.</p>
<p>In a <b>chemical change</b> (a reaction) new substances form with different properties from the reactants. Most chemical changes are hard to reverse.</p>
<table><tr><th>Physical change</th><th>Chemical change</th></tr>
<tr><td>Melting ice, boiling water</td><td>Magnesium burning in air</td></tr>
<tr><td>Dissolving sugar in water</td><td>Iron rusting</td></tr>
<tr><td>Mixing sand and iron filings</td><td>Zinc reacting with acid</td></tr>
<tr><td>No new substance</td><td>New substance with new properties</td></tr></table>
<h4>Signs that a reaction has happened</h4>
<ul><li><b>Colour change.</b> Orange-brown copper added to colourless silver nitrate solution gets coated with silver, and the solution turns blue. A halide ion test also gives a colour change as a pale precipitate forms.</li><li><b>Temperature change.</b> Exothermic reactions warm up the surroundings, for example calcium oxide with water, or sodium with water. Endothermic reactions cool the surroundings, for example photosynthesis (which absorbs light energy) and the cold packs that use ammonium chloride dissolving in water.</li><li><b>Effervescence.</b> Fizzing shows a gas forming, as when an alkali metal reacts with water to give hydrogen: metal + water → metal hydroxide + hydrogen.</li><li><b>Other clues:</b> light given out, a smell, or a change in pH.</li></ul>
<div class="key"><b>Exam tip</b>A colour change or fizzing is a <i>sign</i>, not proof. Describe what you see, then say which new substance it suggests.</div>
<h4>What do we mean by rate?</h4>
<p>The <b>rate of reaction</b> tells you how quickly reactants are used up or products are made. To measure it you need a property that changes steadily as the reaction goes on, such as mass, gas volume or colour. The change in that property is taken as proportional to the change in amount of reactant or product.</p>
<p>Fast reactions can be hard to time while they run, so you may only measure the total time taken and calculate an average rate. Slower reactions let you take readings during the reaction, which gives you more data to plot.</p>
<h4>Ways of following a reaction</h4>
{{C_APP}}
<table><tr><th>Method</th><th>What you measure</th><th>Good for</th></tr>
<tr><td>Gas syringe</td><td>Volume of gas made</td><td>Any reaction that makes a gas</td></tr>
<tr><td>Inverted measuring cylinder</td><td>Volume of gas made</td><td>Cheap, common equipment</td></tr>
<tr><td>Flask on a balance</td><td>Mass lost as gas escapes</td><td>Heavier gases such as carbon dioxide</td></tr>
<tr><td>Time for a mark to vanish</td><td>Time for cloudiness to hide a cross</td><td>Reactions that make a precipitate</td></tr></table>
<p>The mass-loss method does not work well for hydrogen. Its molecules are so light that the mass lost is too small to measure on a normal balance.</p>
<h4>Reading a rate graph</h4>
<p>Plot the measured quantity (such as volume of gas) against time.</p>
{{C_RATEGRAPH}}
<ul><li>The graph is steepest at the <b>start</b>, because that is when the reactants are most concentrated and collide most often.</li><li>It gets less steep as the reactants are used up and the rate falls.</li><li>It goes <b>flat</b> when at least one reactant has run out. The rate is now zero.</li><li>If you plot the amount of <i>reactant</i> instead, the line falls steeply at first and then flattens.</li></ul>
<p>The total amount of product depends on the <b>limiting reactant</b>. More of the limiting reactant means more product. Extra of a reactant that is already in excess changes nothing.</p>
<h4>Calculating a rate</h4>
<p><b>Mean rate</b> = amount of product (or reactant used) ÷ time taken. For a rate at a particular moment, draw a <b>tangent</b> to the curve at that point, then find the gradient: <b>rate = change in y ÷ change in x</b>.</p>
<div class="ex"><b>Worked example</b>A tangent to a gas volume curve at 20 s rises by 24 cm^3^ over a horizontal distance of 40 s.<br>Rate = 24 ÷ 40 = <b>0.60 cm^3^/s</b>.<br>Mean rate for a reaction that made 40 cm^3^ in 20 s: 40 ÷ 20 = 2.0 cm^3^/s.</div>
<div class="key"><b>Exam tip</b>Always give the unit with a rate, such as cm^3^/s or g/min. Show the triangle you used on the graph.</div>`,
I("How can you measure the rate of a reaction when nothing obvious changes with time?",
`<ol><li>For each reaction, choose a property you could measure to follow it: (a) magnesium with hydrochloric acid, (b) marble chips with acid, (c) sodium thiosulfate with acid.</li><li>Sketch the graph you expect for each. Label where the rate is fastest and where the reaction stops.</li><li>Decide which method would not work for hydrogen gas and explain why.</li><li>Predict what happens to the graph if you use twice as much of the reactant that is in excess.</li></ol>`,
`<p><b>Marble chips on a balance.</b> Put 50 cm<sup>3</sup> of dilute hydrochloric acid in a conical flask on a balance. Add 5 g of marble chips, plug the neck with cotton wool and start the clock. Record the mass every 30 seconds for 5 minutes. Calculate the mass lost at each reading.</p><p><b>Plot and analyse.</b> Plot mass lost against time. Draw a tangent at 60 seconds and find the rate in g/s. Compare it with the rate at 180 seconds.</p><p><b>Evaluate.</b> Suggest why the cotton wool matters and why your results would differ if you used a bigger flask or a faster-reacting solid.</p><p class="safe">Safety: wear eye protection and keep the flask away from the edge of the bench.</p>`,
["https://phet.colorado.edu/en/simulations/reactions-and-rates","PhET: Reactions and Rates simulation"]),
[["State two differences between a physical change and a chemical change.","Physical: no new substance forms (1) and it is usually easy to reverse (1). Chemical: a new substance forms (1) and it is usually hard to reverse (1). Award any two.",2],
["Orange-brown copper is added to colourless silver nitrate solution. Describe two observations that show a reaction takes place.","The solid changes to a silver colour (1). The solution changes from colourless to blue (1).",2],
["Describe how to follow the reaction between magnesium and dilute acid by collecting gas. Name the apparatus.","Use a gas syringe or an inverted measuring cylinder over water (1). Record the volume of gas at regular time intervals (1).",2],
["Explain why the mass-loss method is not suitable for following a reaction that produces hydrogen.","Hydrogen has a very small relative formula mass (1), so the mass lost is too small to measure accurately (1).",2],
["A reaction makes 54 cm^3^ of gas in 18 s. Calculate the mean rate, with a unit.","54 ÷ 18 (1) = 3.0 cm^3^/s (1).",2],
["Explain why a graph of gas volume against time becomes horizontal.","One of the reactants has been used up (1), so the reaction stops and no more gas is made (1).",2]],
[M("Which observation is a sign of a chemical reaction?",["Ice becomes water","Sugar dissolves in water","Effervescence when a metal is added to acid","Water boils"],2,"Fizzing shows a new gas forming."),
M("Which method is best for following a reaction that makes a precipitate?",["Gas syringe","Time for a cross to disappear","Mass loss on a balance","Measuring the pH"],1,"The solution becomes cloudy and hides a mark."),
N("A reaction makes 36 cm^3^ of gas in 12 s. What is the mean rate in cm^3^/s?",3,"cm^3^/s","36 ÷ 12 = 3."),
N("A tangent to a curve rises by 18 cm^3^ over 30 s. What is the rate in cm^3^/s?",0.6,"cm^3^/s","18 ÷ 30 = 0.6.",0.01),
T("What word describes the reactant that runs out first and decides how much product forms?",["limiting"],"The limiting reactant."),
M("At which point on a gas volume against time graph is the rate highest?",["At the end","In the middle","At the start","The rate is constant"],2,"The reactants are at their highest concentration at the start."),
M("Which reaction is endothermic?",["Calcium oxide with water","Sodium with water","Photosynthesis","Magnesium burning"],2,"Photosynthesis absorbs light energy."),
N("The mass of a flask falls from 150.00 g to 149.20 g in 80 s. What is the mean rate of mass loss in g/s?",0.01,"g/s","0.80 ÷ 80 = 0.010.",0.0005)],
[["Physical change","No new substance forms; usually easy to reverse (for example melting)."],
["Chemical change","New substances form; usually hard to reverse."],
["Four signs of a chemical reaction","Colour change, temperature change, effervescence, and also light, smell or pH change."],
["Define rate of reaction","How quickly reactants are used up or products are formed."],
["How do you find the rate at a point on a curve?","Draw a tangent and calculate its gradient: change in y ÷ change in x."],
["Why is the graph steepest at the start?","Reactants are most concentrated, so collisions are most frequent."],
["Why does the graph go flat?","A reactant has run out, so the rate is zero."],
["Why is mass loss unsuitable for hydrogen?","Hydrogen has a very small M~r~, so the mass lost is too small to measure."]]);

/* ---------- Lesson 6.2 ---------- */
const C6_L2=L("Factors affecting rate and collision theory","How concentration, pressure, surface area, temperature and catalysts change a rate, and how collision theory explains each one.",
`<h4>The four factors</h4>
<p>You can change the speed of a reaction by changing one of four things. Industry cares about this because a faster reaction means more product made per day, so the process is more efficient.</p>
<table><tr><th>Factor</th><th>Change that speeds the reaction up</th></tr>
<tr><td>Concentration of a solution</td><td>Use a more concentrated solution</td></tr>
<tr><td>Pressure of a gas</td><td>Increase the pressure</td></tr>
<tr><td>Surface area of a solid</td><td>Use smaller pieces or powder</td></tr>
<tr><td>Temperature</td><td>Heat the reactants</td></tr>
<tr><td>Catalyst</td><td>Add a suitable catalyst</td></tr></table>
<h4>What the graphs look like</h4>
<p>If you plot product against time, each of these changes gives the same pattern compared with the slower reaction: a <b>steeper start</b> and a line that <b>goes flat sooner</b>. The final amount of product is the same, because the amount of limiting reactant has not changed.</p>
{{C_FACT}}
<p>Surface area is the factor students find hardest to picture. When a solid is cut up, new faces are exposed to the other reactant.</p>
{{C_CUBES}}
<div class="key"><b>Safety link</b>Flour, coal dust and sawdust can explode in the air. The tiny particles have a huge surface area, so the reaction with oxygen is extremely fast.</div>
<h4>Collision theory <i>(Extended only)</i></h4>
<p>For two particles to react, three things are needed. They must <b>collide</b>. They must collide with at least a minimum energy, the <b>activation energy</b> (E~a~), enough to break bonds. And they must meet in a suitable orientation.</p>
{{C_SUCC}}
<p>The <b>rate</b> depends on how many <i>successful</i> collisions happen each second. That number goes up if:</p>
<ul><li>there are more particles in each unit of volume,</li><li>particles collide more often because they are moving faster,</li><li>a greater proportion of the collisions have energy of at least E~a~ (more kinetic energy, or a lower E~a~).</li></ul>
<h4>Concentration, pressure and surface area <i>(Extended only)</i></h4>
<p>These three factors change <b>how often</b> particles collide. They do not change the energy of the collisions.</p>
{{C_COLL}}
<ul><li><b>Higher concentration:</b> more particles in the same volume, so more collisions per second, so more successful collisions per second.</li><li><b>Higher pressure (gases):</b> the same particles squeezed into a smaller volume, so the effect is the same as a higher concentration.</li><li><b>Larger surface area:</b> more of the solid is exposed to the other reactant, so more collisions per second.</li></ul>
<div class="key"><b>Exam tip</b>Say "more particles <i>per unit volume</i>", not just "more particles". Doubling the number of particles in a given volume doubles the collision rate.</div>
<h4>Temperature <i>(Extended only)</i></h4>
<p>Heating gives particles more kinetic energy. Two things happen: they collide <b>more often</b>, and a <b>larger proportion</b> of collisions have at least the activation energy. A small rise in temperature therefore has a large effect. As a rough rule for solutions and gases, the rate doubles for every 10 °C rise.</p>
<div class="ex"><b>Worked example</b>A reaction takes 120 s at 20 °C. Estimate the time at 40 °C.<br>40 °C is two steps of 10 °C above 20 °C, so the rate doubles twice (× 4).<br>Time = 120 ÷ 4 = <b>30 s</b>.</div>
<div class="key"><b>Exam tip</b>Temperature is the only one of these factors that changes the <i>energy</i> of collisions. The energy effect is more important than the frequency effect.</div>
<h4>Catalysts and enzymes</h4>
<p>A <b>catalyst</b> speeds up a reaction but is not used up. Its mass is the same at the end, and it does not appear in the equation. It works by giving the reaction a different route with a <b>lower activation energy</b>. <i>(Extended: more particles then have enough energy, so more collisions are successful.)</i></p>
{{C_EA}}
<ul><li>Iron, in bead form for a large surface area, catalyses the Haber process.</li><li>Manganese(IV) oxide catalyses the breakdown of hydrogen peroxide into water and oxygen.</li><li><b>Enzymes</b> are biological catalysts. Each works best in a particular temperature range and pH.</li><li>Light also speeds up a few reactions, such as photosynthesis and the darkening of silver bromide in photography.</li></ul>`,
I("Why does a small rise in temperature speed up a reaction by much more than a small rise in concentration?",
`<ol><li>An effervescent tablet takes 80 s to dissolve at 20 °C. Use the rule that the rate doubles every 10 °C to predict the time at 30, 40 and 50 °C. Draw a graph of time against temperature.</li><li>Now suppose you double the concentration of an acid instead. How does the number of collisions per second change?</li><li>Write two sentences to explain the difference. One must mention <i>frequency</i> of collisions and the other <i>energy</i> of collisions.</li><li>Why does a catalyst help in a different way from both?</li></ol>`,
`<p><b>Tablets and temperature.</b> Drop one effervescent tablet into 100 cm<sup>3</sup> of water at about 5 °C, 20 °C and 40 °C. Time how long each takes to stop fizzing. Use the same size of tablet each time.</p><p><b>Lumps against powder.</b> Compare the time for a lump of marble and the same mass of powdered marble to react with the same acid. Record the gas volume or mass lost after 2 minutes.</p><p><b>Catalyst test.</b> Add a spatula of manganese(IV) oxide to hydrogen peroxide solution and compare with a tube that has no oxide. Test the gas with a glowing splint. Filter, dry and weigh the oxide to show it is not used up.</p><p class="safe">Safety: eye protection. Hydrogen peroxide solution can bleach skin; use dilute solution and wash spills.</p>`,
["https://phet.colorado.edu/en/simulations/reactions-and-rates","PhET: Reactions and Rates simulation"]),
[["State four factors that change the rate of a reaction.","Concentration (or pressure) (1), surface area (1), temperature (1), catalyst (1).",4],
["A 3 cm cube is cut into 27 cubes of side 1 cm. Calculate the total surface area before and after.","Before: 6 × (3 × 3) = 54 cm^2^ (1). After: 27 × 6 × (1 × 1) = 162 cm^2^ (1).",2],
["Explain, using collision theory, why increasing the concentration of an acid increases the rate. (Extended)","More particles per unit volume (1), so more collisions per second (1), so more successful collisions per second (1).",3],
["Explain why a small increase in temperature causes a large increase in rate. (Extended)","Particles move faster so collisions are more frequent (1). More particles have at least the activation energy (1), so a greater proportion of collisions are successful (1).",3],
["A reaction takes 120 s at 20 °C. Estimate the time at 40 °C using the rule that the rate doubles every 10 °C. (Extended)","Rate doubles twice, so × 4 (1). 120 ÷ 4 = 30 s (1).",2],
["Describe how a catalyst increases the rate. State what happens to the mass of the catalyst.","It provides a different pathway with a lower activation energy (1). The mass is unchanged / it is not used up (1).",2]],
[M("Which change increases the rate of a reaction between zinc and acid?",["Using larger pieces of zinc","Cooling the acid","Using a more concentrated acid","Using less acid at the same concentration"],2,"More particles per unit volume means more collisions."),
M("A graph of product against time for a faster reaction compared with a slower one has",["a steeper start and the same final amount","a gentler start and more product","a steeper start and more product","the same start and less product"],0,"The amount of limiting reactant is unchanged."),
M("What is the activation energy? (Extended)",["The energy released in a reaction","The energy of all the particles","The minimum energy needed for a collision to lead to a reaction","The energy of the catalyst"],2,"It is the minimum energy needed to break the bonds."),
N("A cube of side 2 cm is cut into 8 cubes of side 1 cm. What is the total surface area of the 8 small cubes in cm^2^?",48,"cm^2^","8 × 6 × 1 = 48."),
T("Name the biological catalysts found in living things.",["enzyme"],"Enzymes."),
M("Which factor changes the energy of the colliding particles? (Extended)",["Concentration","Pressure","Surface area","Temperature"],3,"Only temperature changes the kinetic energy."),
N("The rate doubles for every 10 °C rise. A reaction takes 160 s at 20 °C. How many seconds does it take at 40 °C? (Extended)",40,"s","Two doublings: 160 ÷ 4 = 40.",0.5),
M("Why does a catalyst increase the rate? (Extended)",["It raises the temperature","It lowers the activation energy","It increases the surface area","It makes more reactant"],1,"More collisions have enough energy to react.")],
[["Four factors affecting rate","Concentration (or pressure), surface area, temperature and a catalyst."],
["Graph of a faster reaction","Steeper at the start, levels off sooner, same final amount of product."],
["Collision theory (Extended)","Particles must collide with at least the activation energy (and the right orientation) to react."],
["Why does a higher concentration speed up a reaction? (Extended)","More particles per unit volume, so more collisions per second."],
["Why does a higher temperature speed up a reaction? (Extended)","More frequent collisions and a larger proportion with energy at least E~a~."],
["Rule of thumb for temperature","The rate roughly doubles for every 10 °C rise."],
["What does a catalyst do?","Gives a different route with a lower activation energy; not used up."],
["What is an enzyme?","A biological catalyst that works best at a particular temperature and pH."]]);

/* ---------- Lesson 6.3 ---------- */
FIGS.C_CROSS=()=>{const {TX,ARW}=C6;
  let s=`<path d="M110 50V80L70 140H190L150 80V50" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><polygon points="97,100 163,100 190,140 70,140" style="fill:var(--accent)" fill-opacity=".25"/>`
   +`<rect x="30" y="146" width="200" height="8" fill="currentColor" fill-opacity=".25"/><path d="M118 142l24 8M142 142l-24 8" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`
   +`<path d="M95 28q35 -22 70 0q-35 22 -70 0z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="130" cy="28" r="5" fill="currentColor"/>`+ARW(130,38,130,62)
   +TX(130,176,"Look from above. Stop the clock when the cross can no longer be seen.",{s:10.5})+TX(262,100,"sulfur forms,",{a:"start",s:10.5})+TX(262,114,"solution turns cloudy",{a:"start",s:10.5});
  return C6.FG("0 0 400 186",s,"The disappearing cross method for sodium thiosulfate and dilute hydrochloric acid.","Flask of cloudy solution on a paper marked with a cross, viewed from above",480)};
const C6_L3=L("Investigating rates and interpreting data","Four classic rate experiments, how to evaluate methods, and how to read and sketch rate graphs.",
`<h4>Planning a fair test</h4>
<p>To compare rates you change <b>one</b> factor (the independent variable), measure a result (the dependent variable) and keep everything else the same (control variables). Repeat the experiment and calculate a mean to reduce random error.</p>
<table><tr><th>Experiment</th><th>Change</th><th>Keep the same</th></tr>
<tr><td>Concentration</td><td>Concentration of the solution</td><td>Volumes, temperature, same size cross</td></tr>
<tr><td>Surface area</td><td>Size of the solid pieces</td><td>Total mass, acid volume and concentration, temperature</td></tr>
<tr><td>Temperature</td><td>Temperature of the acid</td><td>Mass and size of metal, acid volume and concentration</td></tr>
<tr><td>Catalyst</td><td>With or without catalyst</td><td>Volume and concentration of the reactant, temperature</td></tr></table>
<h4>Concentration: the disappearing cross</h4>
<p>Sodium thiosulfate solution reacts with dilute hydrochloric acid to form a fine yellow precipitate of sulfur. The solution turns cloudy.</p>
{{C_CROSS}}
<ol><li>Put 50 cm^3^ of sodium thiosulfate solution in a flask over a cross drawn on paper.</li><li>Add 5 cm^3^ of acid and start the stopwatch at once.</li><li>Look down through the solution. Stop the clock when the cross can no longer be seen.</li><li>Repeat with more dilute solutions made by mixing the thiosulfate with water.</li></ol>
<p>Result: the more concentrated the solution, the shorter the time, so the faster the rate. A shorter time means a faster rate, so rate is proportional to 1 ÷ time.</p>
<h4>Surface area and temperature</h4>
<p><b>Surface area.</b> Add acid to a flask and connect it to an upturned measuring cylinder in a trough of water. Drop in magnesium ribbon, replace the bung quickly and measure the volume of hydrogen collected in a fixed time. Repeat using shorter pieces of ribbon. Use the <i>same total mass</i> each time. The smaller pieces make gas faster.</p>
<p><b>Temperature.</b> Warm the acid to a set temperature in a water bath, pour it into a flask, add a strip of magnesium and time how long the metal takes to disappear. Repeat at other temperatures. The hotter the acid, the shorter the time.</p>
<h4>Catalysts and mass loss</h4>
<p><b>Catalyst.</b> Put hydrogen peroxide solution in a flask connected to an upturned measuring cylinder. Add manganese(IV) oxide, replace the bung and measure the oxygen collected in a fixed time. Repeat without the oxide. With the catalyst the gas is made much faster.</p>
<p><b>Mass loss.</b> If a gas escapes from an open flask on a balance, the mass falls. A loose plug of cotton wool lets the gas out but stops spray leaving the flask. This only works well for gases with a large relative formula mass, such as carbon dioxide. A gas syringe is another way to collect gas.</p>
<h4>Evaluating the methods <i>(Extended only)</i></h4>
<table><tr><th>Method</th><th>Advantages</th><th>Disadvantages</th></tr>
<tr><td>Disappearing cross</td><td>Simple, no special equipment</td><td>Different people judge "gone" at different cloudiness; equipment easily contaminated</td></tr>
<tr><td>Gas syringe</td><td>Works for any gas; collects only the gas from the reaction; easy to set up</td><td>Fragile, expensive, can stick; limited volume; gas can escape before the bung goes in</td></tr>
<tr><td>Inverted measuring cylinder</td><td>Uses common equipment; works for any gas</td><td>Hard to read upside down, bubbles get in the way, delivery tube can slip out, gas lost while bunging</td></tr>
<tr><td>Mass loss</td><td>Easy to set up with common equipment</td><td>Unsuitable for gases of low relative mass</td></tr></table>
<h4>Interpreting results and sketching curves</h4>
<p>On a rate graph the first reading is the fastest because the reactants are most concentrated. The line then gets flatter, and it is horizontal when a reactant has run out. When you draw several runs on one grid, compare the <b>initial gradients</b> for rate and the <b>final heights</b> for the amount of product.</p>
<div class="ex"><b>Worked example</b>25 cm^3^ of 0.1 mol/dm^3^ hydrogen peroxide gives oxygen with manganese(IV) oxide as catalyst. Sketch the curve for 25 cm^3^ of 0.2 mol/dm^3^ hydrogen peroxide with the same catalyst and temperature.<br>1. Twice as concentrated, so the rate is faster: <b>steeper initial gradient</b>.<br>2. Twice as many H~2~O~2~ particles, so <b>twice as much oxygen</b>: 2H~2~O~2~ → 2H~2~O + O~2~. Moles of H~2~O~2~ = 0.025 × 0.1 = 0.0025, giving 0.00125 mol O~2~ = 30 cm^3^ (at 24 dm^3^/mol). With 0.2 mol/dm^3^ the volume is <b>60 cm^3^</b>.<br>3. The curve starts steeper and levels off at 60 cm^3^, double the original.</div>
<div class="key"><b>Exam tip</b>If you add more of the reactant that is already in <i>excess</i>, the amount of product does not change. Only the limiting reactant controls the total.</div>`,
I("Which experiment gives the most trustworthy comparison of reaction rates?",
`<ol><li>Choose one factor from concentration, surface area, temperature or catalyst. Write down the independent, dependent and three control variables.</li><li>Pick the measuring method that best suits your reaction (cross, gas syringe, mass loss). Justify your choice in one sentence.</li><li>List two sources of error in your method and suggest how to reduce each.</li><li>Predict the shape of your results graph and label where the rate is greatest.</li></ol>`,
`<p><b>Disappearing cross.</b> Make 50 cm<sup>3</sup> samples of sodium thiosulfate solution at five concentrations by diluting with water. Add 5 cm<sup>3</sup> of dilute hydrochloric acid and time how long the cross takes to vanish. Plot time (y) against concentration, then plot 1 ÷ time against concentration.</p><p><b>Magnesium and temperature.</b> Heat dilute hydrochloric acid to 20, 30, 40 and 50 °C in a water bath. Time how long a 2 cm strip of magnesium ribbon takes to disappear. Calculate the rate as 1 ÷ time.</p><p><b>Evaluate.</b> Swap results with another group who used a different method. Whose data were more reliable? Which error was biggest?</p><p class="safe">Safety: eye protection. Sodium thiosulfate with acid forms a little sulfur dioxide; use small volumes in a ventilated room and rinse the flask promptly.</p>`,
null),
[["List the control variables when comparing the rate of magnesium with acid at different temperatures.","Mass or length of magnesium (1), volume of acid (1), concentration of acid (1). Award any two.",2],
["In the disappearing cross experiment the times were 40 s at 0.10 mol/dm^3^ and 20 s at 0.20 mol/dm^3^. Explain what this shows about the rate.","Doubling the concentration halves the time (1), so the rate doubles (1).",2],
["Suggest why the same total mass of magnesium must be used when comparing surface areas.","The amount of reactant affects the volume of gas, so the mass must be the same to make it a fair test (1).",1],
["State one advantage and one disadvantage of using a gas syringe. (Extended)","Advantage: all the gas collected comes from the reaction / works for any gas (1). Disadvantage: fragile, expensive or can stick (1).",2],
["The experiment on 25 cm^3^ of 0.1 mol/dm^3^ H~2~O~2~ gave 30 cm^3^ of oxygen. Predict the volume with 25 cm^3^ of 0.2 mol/dm^3^ H~2~O~2~ and explain. (Extended)","60 cm^3^ (1) because there are twice as many hydrogen peroxide particles (twice the moles), so twice as much oxygen forms (1).",2],
["Explain why a loose plug of cotton wool is used in the mass-loss method.","It lets gas escape (1) but stops liquid spraying out and being lost (1).",2]],
[M("In the disappearing cross experiment the rate is faster when",["the time is longer","the time is shorter","the cross is bigger","the flask is larger"],1,"A shorter time means a faster rate."),
M("In a fair test comparing surface areas of magnesium, which must be kept the same?",["The size of the pieces","The total mass of magnesium","The time taken","The gas volume"],1,"The mass of reactant has to be constant."),
M("Which method is unsuitable for following the production of hydrogen?",["Gas syringe","Inverted measuring cylinder","Mass loss on a balance","Collecting over water"],2,"Hydrogen is too light for the mass loss to be measurable."),
T("Which solid acts as a catalyst for the decomposition of hydrogen peroxide?",["manganese"],"Manganese(IV) oxide."),
N("A reaction takes 50 s. What is the rate as 1000 ÷ time (in units of 1/1000 s)?",20,"","1000 ÷ 50 = 20."),
M("Compared with the original, a reaction with twice the concentration of the limiting reactant gives",["the same amount of product","twice the amount of product","half the amount of product","no product"],1,"Twice as many limiting particles make twice the product."),
M("Why can the disappearing cross method be unreliable?",["It needs a balance","People judge the end point differently","It only works at low temperature","It collects gas"],1,"Different people decide the cross has gone at different times."),
N("How many dm^3^ of oxygen form from 0.005 mol of O~2~ at r.t.p. (24 dm^3^/mol)?",0.12,"dm^3^","0.005 × 24 = 0.12.",0.001)],
[["Control variables","Factors kept the same so only the independent variable affects the result."],
["Disappearing cross reaction","Sodium thiosulfate + hydrochloric acid makes a sulfur precipitate that hides a cross."],
["Link between time and rate","Shorter time means faster rate; rate is proportional to 1 ÷ time."],
["Why use the same total mass in a surface area test?","So the amount of reactant is the same and the test is fair."],
["Catalyst experiment","Hydrogen peroxide with manganese(IV) oxide: oxygen forms faster."],
["Why is cotton wool used in mass-loss experiments?","Lets gas out but stops liquid spraying out."],
["Disadvantage of a gas syringe (Extended)","Fragile and expensive; it can stick and has a limited volume."],
["Doubling the concentration of the limiting reactant","Steeper start and double the final amount of product."]]);

/* ---------- Lesson 6.4 ---------- */
FIGS.C_HYD=()=>{const {TX,ARW}=C6;
  const crystals=(cx,cy,col)=>[0,1,2,3,4].map(i=>`<polygon points="${cx-26+i*11},${cy+12} ${cx-21+i*11},${cy-6} ${cx-12+i*11},${cy+12}" fill="${col}" stroke="currentColor" stroke-opacity=".5"/>`).join("");
  const row=(y,hydCol,anCol,hydT,anT,hydS,anS)=>`<rect x="20" y="${y}" width="110" height="62" rx="8" style="fill:var(--surface2)" stroke="currentColor" stroke-opacity=".4"/><rect x="350" y="${y}" width="110" height="62" rx="8" style="fill:var(--surface2)" stroke="currentColor" stroke-opacity=".4"/>`
    +crystals(75,y+30,hydCol)+crystals(405,y+30,anCol)+TX(75,y+56,hydT,{s:10.5,b:1})+TX(405,y+56,anT,{s:10.5,b:1})
    +ARW(138,y+20,342,y+20,"var(--bad)")+TX(240,y+12,"heat (endothermic)",{s:10.5,c:"var(--bad)",b:1})
    +ARW(342,y+44,138,y+44,"var(--accent)")+TX(240,y+60,"add water (exothermic)",{s:10.5,c:"var(--accent)",b:1})
    +TX(75,y-6,hydS,{s:10.5})+TX(405,y-6,anS,{s:10.5});
  const s=row(22,"#2E7DD1","#ffffff","CuSO₄·5H₂O","CuSO₄","hydrated: blue crystals","anhydrous: white powder")+row(122,"#E58AA6","#2F6FD0","CoCl₂·6H₂O","CoCl₂","hydrated: pink crystals","anhydrous: blue crystals");
  return C6.FG("0 0 480 196",s,"Heating removes the water of crystallisation. Adding water reverses the change. The colour changes are used as tests for water.","Hydrated and anhydrous copper(II) sulfate and cobalt(II) chloride with their colours and the reversible change",560)};
const C6_L4=L("Reversible reactions","Reactions that can go both ways, energy changes in each direction, and hydrated salts as tests for water.",
`<h4>Complete and reversible reactions</h4>
<p>In many reactions the reactants are used up and the reaction stops. These reactions go to <b>completion</b>. In a <b>reversible reaction</b> the products can themselves react, or break down, to re-form the reactants. The reaction can go in both directions:</p>
<ul><li>the <b>forward reaction</b> makes the products,</li><li>the <b>reverse reaction</b> remakes the reactants.</li></ul>
<p>The two-way arrow <b>⇌</b> replaces the single arrow in the equation. For example, in the Haber process: N~2~ + 3H~2~ ⇌ 2NH~3~.</p>
<h4>Energy changes in both directions</h4>
<p>If the forward reaction is exothermic, the reverse reaction is endothermic. The amount of heat transferred is the same in each direction, but one gives energy out and the other takes it in.</p>
<div class="ex"><b>Worked example</b>N~2~ + 3H~2~ ⇌ 2NH~3~ has ΔH = −92 kJ/mol for the forward reaction.<br>Forward: exothermic, 92 kJ released.<br>Reverse (ammonia breaking down): endothermic, 92 kJ absorbed.</div>
<h4>Hydrated and anhydrous salts</h4>
<p>Many salts crystallise with water molecules built into the crystal. This is called <b>water of crystallisation</b>. It sets the shape and colour of the crystals. A salt with this water is <b>hydrated</b>. After the water has been removed it is <b>anhydrous</b>.</p>
{{C_HYD}}
<table><tr><th></th><th>Copper(II) sulfate</th><th>Cobalt(II) chloride</th></tr>
<tr><td>Hydrated</td><td>CuSO~4~·5H~2~O, blue crystals<br>(copper(II) sulfate-5-water)</td><td>CoCl~2~·6H~2~O, pink crystals<br>(cobalt(II) chloride-6-water)</td></tr>
<tr><td>Anhydrous</td><td>CuSO~4~, white powder</td><td>CoCl~2~, blue crystals</td></tr>
<tr><td>Equation</td><td>CuSO~4~·5H~2~O ⇌ CuSO~4~ + 5H~2~O</td><td>CoCl~2~·6H~2~O ⇌ CoCl~2~ + 6H~2~O</td></tr></table>
<p>Heating drives the water off, which is <b>endothermic</b>. Adding water to the anhydrous salt is strongly <b>exothermic</b>, and you can feel the test tube get warm.</p>
<h4>Using hydration as a chemical test for water</h4>
<p>Both changes can detect water:</p>
<ul><li>Anhydrous copper(II) sulfate: <b>white to blue</b>.</li><li>Anhydrous cobalt(II) chloride (or paper soaked in it): <b>blue to pink</b>.</li></ul>
<div class="key"><b>Exam tip</b>These tests show that water is <i>present</i>. They do not prove the water is pure, because other mixtures containing water give the same result. Learn both colour changes in the right direction.</div>
<h4>How much water is in a hydrated salt?</h4>
<p>You can use relative formula masses to work out how much water is lost on heating.</p>
<div class="ex"><b>Worked example</b>M~r~ of CuSO~4~·5H~2~O = 64 + 32 + (4 × 16) + 5 × (2 + 16) = 160 + 90 = 250.<br>Percentage water = 90 ÷ 250 × 100 = <b>36%</b>.<br>If 25.0 g of the hydrated salt is heated until the colour is white, the anhydrous salt left is 160 ÷ 250 × 25.0 = <b>16.0 g</b>, and 9.0 g of water is lost.</div>
<p>To be sure all the water has gone, the usual method is to heat, cool, weigh and heat again until the mass stops changing.</p>`,
I("Is the change from blue copper sulfate crystals to white powder really reversible?",
`<ol><li>Predict what you would see if you heat blue copper(II) sulfate crystals gently in a test tube.</li><li>Predict what happens when you add a few drops of water to the cooled white powder, and whether the tube gets hotter or colder.</li><li>Explain your prediction using the words forward, reverse, exothermic and endothermic.</li><li>How could you show that no mass is lost overall when you heat and rehydrate a salt?</li></ol>`,
`<p><b>Heat and rehydrate.</b> Heat a few crystals of blue copper(II) sulfate in a dry test tube until they turn white. Look for droplets of water on the cooler part of the tube. Let the tube cool, then add 2 to 3 drops of water and feel the tube. Record the colours and temperature change.</p><p><b>Water detector.</b> Test water, ethanol, a wet leaf and a dry crystal of salt with cobalt chloride paper or anhydrous copper(II) sulfate. Which are positive? What does a positive result tell you, and what does it not tell you?</p><p><b>Water content.</b> Weigh a crucible, add about 2 g of hydrated copper(II) sulfate and reweigh. Heat gently, cool, and reweigh. Repeat until the mass is constant. Calculate the percentage of water and compare with 36%.</p><p class="safe">Safety: eye protection. Copper(II) sulfate is harmful and cobalt(II) chloride is toxic. Use small quantities and do not touch the hot tube.</p>`,
null),
[["State what the symbol ⇌ means.","The reaction is reversible: it can go in both directions (1).",1],
["The forward reaction of a reversible reaction is exothermic. State the energy change of the reverse reaction.","Endothermic (1), with the same amount of energy transferred (1).",2],
["Describe the colour changes when hydrated cobalt(II) chloride is heated and when water is then added.","Pink to blue on heating (1). Blue to pink when water is added (1).",2],
["Write the equation for the dehydration of hydrated copper(II) sulfate.","CuSO~4~·5H~2~O ⇌ CuSO~4~ + 5H~2~O (1).",1],
["Calculate the percentage of water in CuSO~4~·5H~2~O. (A~r~: Cu = 64, S = 32, O = 16, H = 1)","M~r~ = 250 (1). 90 ÷ 250 × 100 = 36% (1).",2],
["Describe a chemical test for water and state what a positive result is.","Add anhydrous copper(II) sulfate (1). It turns from white to blue (1).",2]],
[M("What does water of crystallisation mean?",["Water used to dissolve a salt","Water chemically built into the crystal structure","Water formed when a salt burns","Water of the solvent"],1,"It is water held within the crystal."),
M("What is the colour of anhydrous cobalt(II) chloride?",["Pink","Blue","White","Green"],1,"It is blue. The hydrated form is pink."),
T("What name is given to a salt that contains water of crystallisation?",["hydrated"],"A hydrated salt."),
M("When water is added to anhydrous copper(II) sulfate the reaction is",["endothermic and white to blue","exothermic and white to blue","exothermic and blue to white","endothermic and blue to white"],1,"Hydration gives out heat and the colour becomes blue."),
N("What is the M~r~ of CuSO~4~·5H~2~O? (A~r~: Cu = 64, S = 32, O = 16, H = 1)",250,"","160 + 90 = 250."),
N("What mass of anhydrous CuSO~4~ is left after 25.0 g of CuSO~4~·5H~2~O is fully dehydrated?",16,"g","160 ÷ 250 × 25.0 = 16.0.",0.05),
M("If the forward reaction in a reversible reaction is endothermic, the reverse reaction is",["also endothermic","exothermic","neither","impossible"],1,"The reverse reaction transfers the same energy in the opposite direction.")],
[["Reversible reaction","The products can react to re-form the reactants; shown by ⇌."],
["Energy in forward and reverse","If one direction is exothermic, the other is endothermic, with the same amount of energy."],
["Hydrated copper(II) sulfate","CuSO~4~·5H~2~O, blue crystals."],
["Anhydrous copper(II) sulfate","CuSO~4~, white powder."],
["Test for water with copper(II) sulfate","White anhydrous copper(II) sulfate turns blue."],
["Test for water with cobalt chloride","Blue turns pink."],
["What is water of crystallisation?","Water that is part of the crystal structure of a hydrated salt."],
["Does the water test prove the liquid is pure water?","No. It only shows that water is present."]]);

/* ---------- Lesson 6.5 ---------- */
FIGS.C_EQGRAPH=()=>{const {TX,AX}=C6;
  let s=AX(50,20,330,170,"Time","Rate of reaction")
   +`<path d="M50 40Q110 60 190 110H330" fill="none" style="stroke:var(--bad)" stroke-width="3"/>`
   +`<path d="M50 168Q110 160 190 112H330" fill="none" style="stroke:var(--accent)" stroke-width="3"/>`
   +`<path d="M190 20V170" stroke="currentColor" stroke-dasharray="5 4" stroke-opacity=".6"/>`
   +TX(100,34,"forward reaction",{s:11,c:"var(--bad)",b:1})+TX(100,152,"reverse reaction",{s:11,c:"var(--accent)",b:1})
   +TX(260,100,"equilibrium: the two rates are equal",{s:10.5})+TX(190,14,"equilibrium reached",{s:10.5,b:1});
  return C6.FG("0 0 390 200",s,"The forward rate falls as reactants are used up. The reverse rate rises as products build up. At equilibrium the rates are equal.","Graph of forward and reverse reaction rates meeting at equilibrium",480)};
const C6_L5=L("Equilibrium and Le Chatelier's principle","What dynamic equilibrium means and how changes in conditions shift its position (Extended).",
`<h4>Dynamic equilibrium <i>(Extended only)</i></h4>
<p>Put a reversible reaction in a <b>closed system</b>, where nothing can enter or leave. At first only the forward reaction goes, and it is fast. As products form, the reverse reaction starts. Eventually the two rates become equal. This state is <b>dynamic equilibrium</b>.</p>
{{C_EQGRAPH}}
<ul><li><b>Dynamic</b>: both reactions carry on all the time.</li><li><b>Equilibrium</b>: the rates are equal, so the concentrations of reactants and products stay <b>constant</b>.</li></ul>
<div class="key"><b>Common mistake</b>Constant does not mean equal. The amounts of reactants and products at equilibrium are usually different. It also does not mean the reactions have stopped.</div>
<h4>Position of equilibrium <i>(Extended only)</i></h4>
<p>The <b>position of equilibrium</b> tells you how much product there is compared with reactant. If it lies to the <b>right</b>, the mixture contains mostly products. If it lies to the <b>left</b>, mostly reactants. Changing the conditions can shift the position.</p>
<h4>Le Chatelier's principle <i>(Extended only)</i></h4>
<p>This principle lets you predict the shift. <b>If a change is made to a system at equilibrium, the position moves in the direction that opposes the change.</b> The system tries to cancel out what you did.</p>
<h4>Changing temperature <i>(Extended only)</i></h4>
<p>If the temperature is raised, the system opposes the change by absorbing heat, so the equilibrium moves in the <b>endothermic</b> direction. If the temperature is lowered, it moves in the <b>exothermic</b> direction to release heat.</p>
<div class="ex"><b>Worked example</b>N~2~ + 3H~2~ ⇌ 2NH~3~, forward reaction exothermic.<br>Raise the temperature: shifts left (endothermic direction), so less ammonia.<br>Lower the temperature: shifts right, so more ammonia.</div>
<h4>Changing pressure <i>(Extended only)</i></h4>
<p>Pressure only matters when gases are involved. Higher pressure favours the side with <b>fewer gas molecules</b> (the smaller number in the balanced equation), because that lowers the pressure. Lower pressure favours the side with more gas molecules. If both sides have the same number, pressure has no effect on the position.</p>
<div class="ex"><b>Worked example</b>N~2~ + 3H~2~ ⇌ 2NH~3~: 4 molecules of gas on the left, 2 on the right. High pressure shifts right and gives more ammonia.<br>2NO~2~ ⇌ N~2~O~4~ (brown to colourless): 2 on the left, 1 on the right. High pressure shifts right and the brown colour fades.</div>
<h4>Changing concentration <i>(Extended only)</i></h4>
<p>Adding more of a reactant makes the system use some of it up, so the position shifts <b>right</b> (away from the added chemical). Adding more product shifts it left. Removing a product pulls the position right, which is why products are often removed as they form.</p>
<div class="ex"><b>Worked example</b>ICl + Cl~2~ ⇌ ICl~3~. Adding more Cl~2~ shifts the position right, so more ICl~3~ forms. Removing ICl~3~ has the same effect.</div>
<h4>Catalysts and rate <i>(Extended only)</i></h4>
<p>A catalyst speeds up the forward and reverse reactions by the same amount. It does <b>not</b> change the position of equilibrium or the yield. It only means that equilibrium is reached sooner.</p>
<table><tr><th>Change</th><th>Effect on position</th></tr><tr><td>Increase temperature</td><td>Moves in the endothermic direction</td></tr><tr><td>Increase pressure</td><td>Moves to the side with fewer gas molecules</td></tr><tr><td>Increase concentration of a reactant</td><td>Moves to the right (products)</td></tr><tr><td>Add a catalyst</td><td>No change; equilibrium is reached faster</td></tr></table>`,
I("How can we push a reversible reaction towards more product?",
`<ol><li>Pick the equilibrium 2NO~2~ ⇌ N~2~O~4~, with the forward reaction exothermic.</li><li>For heating, cooling, increasing pressure and adding more NO~2~, predict the direction of shift.</li><li>Use the colour (brown NO~2~, colourless N~2~O~4~) to say what you would see.</li><li>Write a rule that links each change to the shift using Le Chatelier's principle.</li></ol>`,
`<p><b>Predict first.</b> Copy a four-row table (change, shift left or right, colour change, reason). Complete it before any demonstration.</p><p><b>Sealed syringe demonstration.</b> A teacher compresses and releases a sealed syringe of NO~2~/N~2~O~4~ gas. Note the immediate darkening, then the slow fading as the position shifts. Explain both stages.</p><p><b>Temperature test.</b> Compare the colour of sealed tubes in hot and cold water. Which direction is endothermic? Does your table match what you saw?</p><p><b>Explain it.</b> Write three sentences using the words rate, position, forward, reverse and opposes.</p><p class="safe">Safety: NO~2~ is toxic. This is a teacher demonstration with sealed, pre-made tubes only.</p>`,
null),
[["State two features of a system at dynamic equilibrium.","Forward and reverse reactions continue at the same rate (1). Concentrations of reactants and products stay constant (1).",2],
["Explain why the equilibrium in N~2~ + 3H~2~ ⇌ 2NH~3~ moves right when pressure is increased.","There are fewer gas molecules on the right (1: 2 against 4). The system opposes the increase in pressure (1).",2],
["The forward reaction is exothermic. State the effect of increasing the temperature on the amount of product, with a reason.","Less product (1). The equilibrium moves in the endothermic (reverse) direction (1).",2],
["State the effect of a catalyst on the position of equilibrium and on the time taken to reach it.","No effect on the position (1). Equilibrium is reached sooner (1).",2],
["Explain why a closed system is needed for equilibrium.","Nothing can enter or leave (1), so the products cannot escape and the reverse reaction can occur (1).",2],
["In ICl + Cl~2~ ⇌ ICl~3~, suggest what happens to the amount of ICl~3~ when more Cl~2~ is added. Explain.","More ICl~3~ forms (1). The position moves right to use up the extra Cl~2~ (1).",2]],
[M("At dynamic equilibrium",["the reactions have stopped","the forward and reverse rates are equal","the amounts of reactants and products are equal","only the forward reaction occurs"],1,"Both reactions continue at equal rates."),
M("What does a catalyst do to a system at equilibrium?",["Moves the position to the right","Moves the position to the left","Speeds up both reactions equally","Stops the reverse reaction"],2,"The position is unchanged."),
M("Increasing the pressure favours the side with",["more gas molecules","fewer gas molecules","more solids","higher temperature"],1,"The system opposes the increase."),
M("The forward reaction is exothermic. Lowering the temperature",["shifts left","shifts right","has no effect","stops the reaction"],1,"The exothermic direction is favoured."),
M("2NO~2~ ⇌ N~2~O~4~. High pressure makes the mixture",["darker brown","lighter brown/paler","blue","unchanged in colour"],1,"The position moves to the colourless N~2~O~4~ side."),
T("What is the name of the principle used to predict how equilibrium shifts?",["le chatelier","chatelier"],"Le Chatelier's principle."),
M("In N~2~ + 3H~2~ ⇌ 2NH~3~, removing ammonia as it forms causes",["the position to move left","the position to move right","no change","the catalyst to fail"],1,"The system makes more product to replace it.")],
[["Dynamic equilibrium","Forward and reverse reactions occur at equal rates in a closed system, so concentrations are constant."],
["Closed system","Nothing can enter or leave."],
["Le Chatelier's principle","A change to a system in equilibrium makes the position shift to oppose the change."],
["Higher temperature","Shifts in the endothermic direction."],
["Higher pressure","Shifts to the side with fewer gas molecules."],
["More reactant added","Shifts right, towards products."],
["Catalyst and equilibrium","No effect on position; equilibrium is reached sooner."],
["Constant concentrations means","Not equal concentrations and not stopped reactions."]]);

/* ---------- Lesson 6.6 ---------- */
FIGS.C_HABER=()=>{const {TX,ARW,BOX}=C6;
  let s=BOX(10,20,90,42,["Nitrogen","from air"])+BOX(10,100,90,42,["Hydrogen","from methane"])
   +ARW(100,41,150,70)+ARW(100,121,150,92)+BOX(150,52,120,50,["Compressor","about 200 atm"],{b:1})
   +ARW(270,77,300,77)+BOX(300,40,120,74,["Reactor","iron catalyst","450 °C"],{b:1,f:"var(--accent-soft, var(--surface2))"})
   +ARW(420,77,450,77)+BOX(450,52,100,50,["Cooler","NH₃ liquefies"],{b:1})
   +ARW(550,77,580,77)+BOX(580,52,70,50,["Liquid","ammonia"],{b:1})
   +`<path d="M500 102V150H360V114" fill="none" style="stroke:var(--bad)" stroke-width="2"/><path d="M360 114l-5 8h10z" style="fill:var(--bad)"/>`
   +TX(430,168,"unreacted N₂ and H₂ recycled",{s:11,c:"var(--bad)",b:1});
  return C6.FG("0 0 660 180",s,"The Haber process. About 15 to 20% of the gases react on each pass, so the unreacted gases are recycled.","Flow diagram of the Haber process with recycling of unreacted gases",760)};
FIGS.C_CONTACT=()=>{const {TX,ARW,BOX}=C6;
  let s=BOX(10,20,80,40,["Sulfur","S"])+ARW(90,40,120,40)+BOX(120,20,110,40,["Burn in air","S + O₂ → SO₂"],{s:10.5})
   +ARW(230,40,260,40)+BOX(260,10,170,60,["Converter","V₂O₅ catalyst","450 °C, 2 atm"],{b:1})
   +ARW(430,40,460,40)+BOX(460,20,100,40,["SO₃ made","2SO₂ + O₂ ⇌ 2SO₃"],{s:10})
   +ARW(510,60,510,100)+BOX(430,100,160,40,["Absorb in H₂SO₄","gives oleum H₂S₂O₇"],{s:10.5})
   +ARW(510,140,510,170)+BOX(430,170,160,34,["Add water","gives H₂SO₄"],{s:10.5});
  return C6.FG("0 0 610 210",s,"The Contact process makes sulfuric acid in stages.","Flow diagram of the Contact process from sulfur to sulfuric acid",700)};
const C6_L6=L("The Haber and Contact processes","Applying equilibrium ideas to make ammonia and sulfuric acid (Extended).",
`<h4>Why these processes matter <i>(Extended only)</i></h4>
<p>Two of the most important industrial processes are reversible. <b>Ammonia</b> is made by the Haber process, mostly for fertilisers. <b>Sulfuric acid</b> is made by the Contact process and is used in fertilisers, detergents, paints and batteries. In both, the conditions are a compromise between a good <b>yield</b> and a fast <b>rate</b>.</p>
<h4>The Haber process: the reaction <i>(Extended only)</i></h4>
<p>N~2~(g) + 3H~2~(g) ⇌ 2NH~3~(g), ΔH = −92 kJ/mol (forward exothermic).</p>
<ul><li>Nitrogen comes from the <b>air</b> (fractional distillation of liquid air).</li><li>Hydrogen comes from <b>methane</b> (natural gas) reacting with steam.</li></ul>
<h4>The Haber process: stages <i>(Extended only)</i></h4>
{{C_HABER}}
<ol><li>The gases are mixed in a 1 : 3 ratio and <b>compressed</b> to about 200 atm (20 000 kPa).</li><li>They pass over an <b>iron catalyst</b> at about 450 °C.</li><li>Ammonia forms; only a fraction of the gases react.</li><li>The mixture is <b>cooled</b>. Ammonia has a higher boiling point and <b>liquefies</b>, so it is removed.</li><li>Unreacted nitrogen and hydrogen are <b>recycled</b> to the reactor.</li></ol>
<h4>Explaining the Haber conditions <i>(Extended only)</i></h4>
<table><tr><th>Condition</th><th>Reason</th></tr>
<tr><td>High pressure (about 200 atm)</td><td>Fewer gas molecules on the right, so the yield goes up. Very high pressure needs expensive equipment and is dangerous.</td></tr>
<tr><td>Temperature 450 °C</td><td>Forward reaction is exothermic, so a low temperature would give more ammonia, but the rate would be too slow. 450 °C is a <b>compromise</b>.</td></tr>
<tr><td>Iron catalyst</td><td>Increases the rate without changing the yield, so the temperature can be lower than otherwise.</td></tr></table>
<h4>The Contact process: stages <i>(Extended only)</i></h4>
{{C_CONTACT}}
<ol><li>Sulfur is burned in air: S + O~2~ → SO~2~. (SO~2~ can also be made by roasting sulfide ores.)</li><li>SO~2~ and oxygen pass over a <b>vanadium(V) oxide</b> catalyst: 2SO~2~ + O~2~ ⇌ 2SO~3~ (exothermic).</li><li>SO~3~ is absorbed in concentrated sulfuric acid to form <b>oleum</b>: SO~3~ + H~2~SO~4~ → H~2~S~2~O~7~.</li><li>Oleum is added carefully to water: H~2~S~2~O~7~ + H~2~O → 2H~2~SO~4~.</li></ol>
<h4>Explaining the Contact conditions <i>(Extended only)</i></h4>
<p>The conditions are 450 °C, 2 atm and V~2~O~5~. The forward reaction is exothermic, so a lower temperature would increase the yield but be too slow, hence the compromise. There are fewer gas molecules on the right, but the yield is already about <b>96%</b> at 2 atm, so high pressure is not worth the cost and danger. SO~3~ is not added directly to water because the reaction is violent and makes a mist of acid.</p>
<div class="key"><b>Exam tip</b>When asked to justify conditions, give the direction for the yield, then the problem with the rate or cost, then call it a compromise.</div>`,
I("Why do industries not use the highest yield conditions?",
`<ol><li>For the Haber process, list the conditions that would give the highest yield.</li><li>Explain why each is not used in practice.</li><li>Repeat the process for the Contact process.</li><li>Summarise what a compromise condition means.</li></ol>`,
`<p><b>Yield versus rate.</b> Copy a two-column table. In one column write the best condition for yield, in the other for rate. Use temperature, pressure and catalyst for both processes.</p><p><b>Flow diagram.</b> Redraw the Haber process as a flow chart with stages, conditions and recycling. Label each arrow with the reason.</p><p><b>Pitch it.</b> Write a 60 second explanation for a company manager of why 450 °C is used, using the terms exothermic, rate and yield.</p>`,
null),
[["State the raw materials for the Haber process and where each comes from.","Nitrogen from air (1). Hydrogen from methane/natural gas (1).",2],
["State the catalyst and temperature used in the Haber process.","Iron (1). About 450 °C (1).",2],
["Explain why a very low temperature is not used in the Haber process.","The rate would be too slow (1), even though the yield would be higher (1).",2],
["Explain how the unreacted gases in the Haber process are dealt with.","Ammonia is cooled and liquefied and removed (1). Nitrogen and hydrogen are recycled (1).",2],
["Write the equation for the reaction in the converter of the Contact process.","2SO~2~ + O~2~ ⇌ 2SO~3~ (1).",1],
["State the catalyst used in the Contact process and explain why SO~3~ is not added directly to water.","Vanadium(V) oxide (1). The reaction is violent and produces an acid mist (1).",2]],
[M("What is the catalyst in the Haber process?",["Platinum","Iron","Vanadium(V) oxide","Nickel"],1,"Iron."),
M("What is the catalyst in the Contact process?",["Iron","Nickel","Vanadium(V) oxide","Manganese(IV) oxide"],2,"Vanadium(V) oxide."),
N("About what temperature, in °C, is used in the Haber process?",450,"°C","450 °C is a compromise.",20),
M("Why is the Haber process pressure not made much higher?",["The yield would fall","The equipment would be expensive and dangerous","The catalyst would stop working","The rate would drop"],1,"High pressure costs more and is dangerous."),
T("What is the name of the compound H~2~S~2~O~7~?",["oleum"],"Oleum."),
M("In the Haber process ammonia is separated by",["filtering","cooling it until it is liquid","adding water","heating"],1,"Its boiling point is higher than that of nitrogen or hydrogen."),
M("Which statement about the Contact process conditions is correct?",["It uses very high pressure","It uses a compromise temperature of about 450 °C","It uses no catalyst","It is endothermic forward"],1,"450 °C balances rate and yield.")],
[["Haber equation","N~2~ + 3H~2~ ⇌ 2NH~3~"],
["Haber conditions","About 450 °C, 200 atm, iron catalyst."],
["Haber raw materials","Nitrogen from air, hydrogen from methane."],
["Why recycle in the Haber process?","Only a small fraction reacts per pass; recycling uses all the gas."],
["Contact equation","2SO~2~ + O~2~ ⇌ 2SO~3~"],
["Contact conditions","450 °C, 2 atm, vanadium(V) oxide."],
["What is oleum?","H~2~S~2~O~7~, made by absorbing SO~3~ in sulfuric acid."],
["Compromise condition","A condition that balances a good yield against a fast rate and low cost."]]);

/* ---------- Lesson 6.7 ---------- */
FIGS.C_REDOX=()=>{const {TX,ARW}=C6;
  let s=`<rect x="20" y="30" width="190" height="90" rx="10" style="fill:var(--surface2)" stroke="currentColor" stroke-opacity=".5"/><rect x="290" y="30" width="190" height="90" rx="10" style="fill:var(--surface2)" stroke="currentColor" stroke-opacity=".5"/>`
   +TX(115,56,"Oxidation",{b:1,s:14,c:"var(--bad)"})+TX(115,78,"gains oxygen",{s:11.5})+TX(115,96,"loses electrons",{s:11.5})+TX(115,114,"oxidation number rises",{s:11.5})
   +TX(385,56,"Reduction",{b:1,s:14,c:"var(--accent)"})+TX(385,78,"loses oxygen",{s:11.5})+TX(385,96,"gains electrons",{s:11.5})+TX(385,114,"oxidation number falls",{s:11.5})
   +ARW(212,66,288,66,"currentColor")+ARW(288,86,212,86,"currentColor")+TX(250,58,"e⁻",{s:11})
   +TX(250,150,"OIL RIG: Oxidation Is Loss, Reduction Is Gain (of electrons)",{b:1,s:12});
  return C6.FG("0 0 500 164",s,"Oxidation and reduction always occur together in a redox reaction.","Summary of oxidation and reduction in terms of oxygen, electrons and oxidation number",600)};
FIGS.C_OXNUM=()=>{const {TX}=C6;
  const line=[-3,-2,-1,0,1,2,3].map((n,i)=>{const x=40+i*70;return `<path d="M${x} 56V70" stroke="currentColor"/>`+TX(x,86,(n>0?"+":n<0?"−":"")+Math.abs(n),{s:12,b:n===0})}).join("");
  let s=`<path d="M25 63H460" stroke="currentColor" stroke-width="2"/>`+line+`<path d="M110 40H320" stroke="var(--bad)" stroke-width="2" fill="none" style="stroke:var(--bad)"/><path d="M320 40l-7-4v8z" style="fill:var(--bad)"/>`
   +TX(215,28,"oxidation: number increases",{s:11,c:"var(--bad)",b:1})
   +`<path d="M390 100H180" stroke="var(--accent)" stroke-width="2" fill="none" style="stroke:var(--accent)"/><path d="M180 100l7-4v8z" style="fill:var(--accent)"/>`
   +TX(285,118,"reduction: number decreases",{s:11,c:"var(--accent)",b:1});
  return C6.FG("0 0 490 130",s,"Oxidation numbers on a number line","Number line showing oxidation as an increase and reduction as a decrease in oxidation number",560)};
const C6_X1=L("Oxidation, reduction and oxidation numbers","Three definitions of redox: oxygen, electrons and oxidation numbers (Extended for numbers).",
`<h4>Oxidation and reduction with oxygen</h4>
<p>The oldest definition links redox to oxygen:</p>
<ul><li><b>Oxidation</b> is gain of oxygen.</li><li><b>Reduction</b> is loss of oxygen.</li></ul>
<p>Magnesium burning in air is oxidation: 2Mg + O~2~ → 2MgO. Copper(II) oxide heated in hydrogen is reduction of the oxide: CuO + H~2~ → Cu + H~2~O. In this second reaction the hydrogen has been oxidised, because it gained oxygen to make water.</p>
{{C_REDOX}}
<h4>Redox: both at once</h4>
<p>In CuO + H~2~ → Cu + H~2~O, CuO loses oxygen (reduced) while H~2~ gains oxygen (oxidised). A reaction in which both happen is a <b>redox reaction</b>. One substance cannot be oxidised unless another is reduced.</p>
<h4>Oxidation and reduction with electrons</h4>
<p>Many redox reactions have no oxygen at all, so a wider definition uses electrons:</p>
<ul><li><b>Oxidation</b> is loss of electrons.</li><li><b>Reduction</b> is gain of electrons.</li></ul>
<p>A memory aid is <b>OIL RIG</b>: Oxidation Is Loss, Reduction Is Gain.</p>
<h4>Half-equations</h4>
<p>Showing the electrons in separate <b>half-equations</b> makes it clear what is happening.</p>
<div class="ex"><b>Worked example</b>Fe + Cu^2+^ → Fe^2+^ + Cu<br>Iron: Fe → Fe^2+^ + 2e^−^ (oxidation, loses electrons)<br>Copper ions: Cu^2+^ + 2e^−^ → Cu (reduction, gains electrons)<br>Electrons lost equal electrons gained.</div>
<p>Half-equations also help in electrolysis. At the cathode, ions gain electrons (reduction), and at the anode, they lose electrons (oxidation).</p>
<h4>Roman numerals in names</h4>
<p>Some metals form more than one ion, so the name carries the charge as a Roman numeral: iron(II) is Fe^2+^ and iron(III) is Fe^3+^. Changing iron(II) to iron(III) is oxidation, because the ion loses one electron: Fe^2+^ → Fe^3+^ + e^−^.</p>
<h4>Oxidation numbers <i>(Extended only)</i></h4>
<p>The <b>oxidation number</b> shows how many electrons an atom has gained or lost compared with the free atom. Rules:</p>
<ul><li>Atoms in an element (Fe, O~2~, Cl~2~) have oxidation number <b>0</b>.</li><li>A simple ion has an oxidation number equal to its charge: Na^+^ is +1, Cl^−^ is −1.</li><li>Oxygen is usually <b>−2</b>. Hydrogen is usually <b>+1</b>.</li><li>The numbers in a compound add up to <b>0</b>. In an ion they add up to the ion's charge.</li></ul>
{{C_OXNUM}}
<h4>Using oxidation numbers <i>(Extended only)</i></h4>
<p>Oxidation: the number <b>increases</b>. Reduction: the number <b>decreases</b>.</p>
<div class="ex"><b>Worked example 1</b>Find S in SO~2~: S + 2(−2) = 0, so S = +4.<br>Find S in SO~3~: S + 3(−2) = 0, so S = +6.<br>In 2SO~2~ + O~2~ → 2SO~3~, sulfur goes from +4 to +6, so it is oxidised.</div>
<div class="ex"><b>Worked example 2</b>Find Mn in MnO~4~^−^: Mn + 4(−2) = −1, so Mn = +7.<br>In Mn^2+^ the number is +2. Going from MnO~4~^−^ to Mn^2+^ the number falls from +7 to +2, so it is reduced.</div>`,
I("How can we tell what has been oxidised and what has been reduced?",
`<ol><li>Write the half-equations for iron nails reacting with copper(II) sulfate solution.</li><li>Predict the colour changes of the solution and the nail.</li><li>Identify which species is oxidised and which is reduced using electrons.</li><li>Check your answer using oxidation numbers.</li></ol>`,
`<p><b>Displacement.</b> Place a clean iron nail in copper(II) sulfate solution for 10 minutes. Observe the colour of the solution and the surface of the nail. Write the ionic equation and half-equations.</p><p><b>Sort the changes.</b> Make cards for: Mg → Mg^2+^, Cl~2~ → 2Cl^−^, Fe^2+^ → Fe^3+^, MnO~4~^−^ → Mn^2+^, SO~2~ → SO~3~. Sort into oxidation or reduction and justify each.</p><p><b>Teach it.</b> Create a one-page poster of OIL RIG with one example for oxygen, electrons and oxidation numbers.</p>`,
null),
[["State the meaning of oxidation in terms of electrons.","Loss of electrons (1).",1],
["In CuO + H~2~ → Cu + H~2~O, state which substance is oxidised and give a reason.","Hydrogen (1) because it gains oxygen (1).",2],
["Write the half-equation for the oxidation of iron to iron(II) ions.","Fe → Fe^2+^ + 2e^−^ (1).",1],
["Explain why Fe^2+^ → Fe^3+^ + e^−^ is oxidation.","Fe^2+^ loses an electron (1).",1],
["(Extended) Calculate the oxidation number of sulfur in SO~3~ and state the change in 2SO~2~ + O~2~ → 2SO~3~.","S in SO~3~ = +6 (1). S changes from +4 to +6, so it is oxidised (1).",2],
["(Extended) State the oxidation number of Mn in MnO~4~^−^.","+7 (1).",1]],
[M("OIL RIG stands for",["Oxidation Is Loss, Reduction Is Gain","Oxygen Is Lost, Reduction Is Gain","Oxidation Is Gain, Reduction Is Loss","Only Ions Lose"],0,"Of electrons."),
M("Reduction is",["gain of oxygen","loss of electrons","gain of electrons","increase in oxidation number"],2,"Reduction is gain of electrons."),
M("In Fe + Cu^2+^ → Fe^2+^ + Cu, iron is",["reduced","oxidised","neither","a spectator"],1,"Iron loses electrons."),
N("What is the oxidation number of oxygen in most compounds?",-2,"","Usually −2."),
N("What is the oxidation number of S in SO~2~?",4,"","S + 2(−2) = 0."),
N("What is the oxidation number of Mn in MnO~4~^−^?",7,"","Mn + 4(−2) = −1."),
M("A reaction in which oxidation and reduction both occur is called",["redox","displacement only","neutralisation","precipitation"],0,"Redox.")],
[["Oxidation (oxygen)","Gain of oxygen."],["Reduction (oxygen)","Loss of oxygen."],["Oxidation (electrons)","Loss of electrons."],["Reduction (electrons)","Gain of electrons."],["OIL RIG","Oxidation Is Loss, Reduction Is Gain of electrons."],["Redox reaction","A reaction where reduction and oxidation both occur."],["Oxidation number of an element","0."],["Oxidation number change in redox (Extended)","Increase = oxidation, decrease = reduction."]]);

/* ---------- Lesson 6.8 ---------- */
const C6_X2=L("Oxidising and reducing agents","Which substance causes redox, and how colour changes show it.",
`<h4>Agents in redox reactions</h4>
<p>An <b>oxidising agent</b> oxidises another substance. To do this it takes electrons from it, so the oxidising agent is itself <b>reduced</b>. A <b>reducing agent</b> reduces another substance by giving electrons, so the reducing agent is itself <b>oxidised</b>.</p>
<div class="key"><b>Common mistake</b>The agent is the substance that causes the change, so it is the opposite of what happens to it. The oxidising agent is reduced.</div>
<h4>Identifying the agents</h4>
<div class="ex"><b>Worked example 1</b>CuO + H~2~ → Cu + H~2~O<br>CuO loses oxygen (reduced), so CuO is the <b>oxidising agent</b>.<br>H~2~ gains oxygen (oxidised), so H~2~ is the <b>reducing agent</b>.</div>
<div class="ex"><b>Worked example 2</b>Fe + Br~2~ → FeBr~2~, or Fe + Br~2~ → Fe^2+^ + 2Br^−^<br>Fe loses electrons, so Fe is the reducing agent.<br>Br~2~ gains electrons, so Br~2~ is the oxidising agent.</div>
<h4>Common oxidising agents</h4>
<p>Oxygen, chlorine, bromine and other halogens, and <b>acidified potassium manganate(VII)</b> are common oxidising agents.</p>
<h4>Common reducing agents</h4>
<p>Hydrogen, carbon, carbon monoxide, reactive metals such as magnesium, and <b>potassium iodide</b> solution are common reducing agents.</p>
<h4>Colour tests for redox</h4>
<table><tr><th>Test reagent</th><th>What it shows</th><th>Colour change</th></tr>
<tr><td>Acidified KMnO~4~</td><td>Tests for a reducing agent (it is an oxidising agent)</td><td>Purple → <b>colourless</b></td></tr>
<tr><td>Potassium iodide solution</td><td>Tests for an oxidising agent (it is a reducing agent)</td><td>Colourless → <b>brown</b> (iodine formed)</td></tr></table>
<p>The reaction of chlorine with potassium iodide shows the iodide being oxidised: Cl~2~ + 2KI → 2KCl + I~2~. Half-equations: 2I^−^ → I~2~ + 2e^−^ (oxidation) and Cl~2~ + 2e^−^ → 2Cl^−^ (reduction). Chlorine is the oxidising agent and iodide is the reducing agent.</p>
<div class="key"><b>Exam tip</b>Write: purple to colourless for KMnO~4~ and colourless to brown for KI. If you are asked to name the oxidising agent, name the substance, not the process.</div>
<h4>Redox in everyday life</h4>
<p>Rusting and burning are both oxidation. Metal extraction in the blast furnace is the reduction of iron oxide by carbon monoxide. Electrolysis and the cells in batteries rely on redox reactions that involve electrons moving along a circuit.</p>`,
I("Can colour changes help us identify oxidising and reducing agents?",
`<ol><li>Decide which of potassium iodide and potassium manganate(VII) is the oxidising agent in a test.</li><li>Predict the colour change when each is added to a reducing or oxidising solution.</li><li>Test unknown solutions and record the observations.</li><li>Identify the unknowns as oxidising or reducing agents.</li></ol>`,
`<p><b>Reducing agent test.</b> Add a few drops of acidified potassium manganate(VII) to 2 cm³ of sulfur dioxide solution (or iron(II) sulfate) and to 2 cm³ of water as a control. Record colour changes.</p><p><b>Oxidising agent test.</b> Add potassium iodide solution to chlorine water (or dilute hydrogen peroxide with acid) and to water as a control. Record colour changes and write half-equations.</p><p><b>Identify the agent.</b> For three equations supplied, label the oxidising agent and reducing agent and give a reason.</p><p class="safe">Safety: eye protection; KMnO~4~ stains and is an oxidiser; chlorine water must be used in a fume cupboard.</p>`,
null),
[["Define oxidising agent.","A substance that oxidises another substance (1), by accepting electrons and being reduced itself (1).",2],
["In CuO + H~2~ → Cu + H~2~O, identify the reducing agent and give a reason.","Hydrogen (1) because it gains oxygen/is oxidised (1).",2],
["State the colour change when acidified potassium manganate(VII) reacts with a reducing agent.","Purple (1) to colourless (1).",2],
["Describe a test for an oxidising agent.","Add potassium iodide solution (1). It turns colourless to brown (1).",2],
["For Cl~2~ + 2KI → 2KCl + I~2~, write the half-equation for the oxidation.","2I^−^ → I~2~ + 2e^−^ (1).",1]],
[M("An oxidising agent",["loses electrons","is oxidised","gains electrons and is reduced","gains hydrogen only"],2,"It takes electrons from another substance."),
M("Which is a common reducing agent?",["Chlorine","Hydrogen","Oxygen","Bromine"],1,"Hydrogen."),
M("Acidified KMnO~4~ changes from",["colourless to purple","purple to colourless","pale green to blue","brown to colourless"],1,"A reducing agent turns it colourless."),
M("The colour change of KI with an oxidising agent is",["colourless to brown","brown to colourless","purple to colourless","blue to pink"],0,"Iodine forms."),
M("In Fe + Br~2~ → FeBr~2~ the oxidising agent is",["Fe","Br~2~","FeBr~2~","none"],1,"Br~2~ gains electrons."),
T("In CuO + H~2~ → Cu + H~2~O, which substance is the oxidising agent?",["cuo","copper(ii) oxide","copper oxide","copper(ii)oxide"],"CuO is reduced, so it is the oxidising agent.")],
[["Oxidising agent","Gains electrons and is reduced; oxidises another substance."],["Reducing agent","Loses electrons and is oxidised; reduces another substance."],["Test for a reducing agent","Acidified KMnO~4~ turns from purple to colourless."],["Test for an oxidising agent","KI solution turns from colourless to brown."],["Examples of oxidising agents","Oxygen, chlorine, bromine, acidified KMnO~4~."],["Examples of reducing agents","Hydrogen, carbon, CO, reactive metals, KI."],["Is the oxidising agent oxidised?","No; it is reduced."],["Cl~2~ + 2KI","Cl~2~ is the oxidising agent, KI the reducing agent; I~2~ is formed."]]);

SETL(6,[C6_L1,C6_L2,C6_L3,C6_L4,C6_L5,C6_L6,C6_X1,C6_X2]);
