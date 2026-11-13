/* ===== Group G: Topic 12 experimental techniques, rebuilt from the teacher's notes (own wording) ===== */
const G_FG=(vb,inner,cap,label,maxw)=>`<figure class="fig"${maxw?` style="max-width:${maxw}px"`:""}><svg viewBox="${vb}" role="img" aria-label="${label}">${inner}</svg><figcaption>${cap}</figcaption></figure>`;
const G_T=(x,y,s,o)=>{o=o||{};return `<text x="${x}" y="${y}" font-size="${o.s||11}" text-anchor="${o.a||"middle"}"${o.b?' font-weight="700"':""}${o.i?' font-style="italic"':""} ${o.c?`style="fill:${o.c}"`:'fill="currentColor"'}>${s}</text>`};
const G_ARR=(x1,y1,x2,y2,col,w)=>{const a=Math.atan2(y2-y1,x2-x1),h=7,c=col||"currentColor";
  return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="${w||1.6}" fill="none"/><path d="M${x2} ${y2}l${(-h*Math.cos(a-.45)).toFixed(1)} ${(-h*Math.sin(a-.45)).toFixed(1)}M${x2} ${y2}l${(-h*Math.cos(a+.45)).toFixed(1)} ${(-h*Math.sin(a+.45)).toFixed(1)}" stroke="${c}" stroke-width="${w||1.6}" fill="none" stroke-linecap="round"/>`};
const G_LINE='fill="none" stroke="currentColor" stroke-width="1.6"';

/* chromatogram */
FIGS.G_CHROMA=()=>{
  let s=`<rect x="30" y="10" width="250" height="180" rx="3" style="fill:var(--mint,#E6F2EE)" fill-opacity=".5" stroke="currentColor" stroke-opacity=".6"/>`;
  s+=`<path d="M30 160H280" stroke="currentColor" stroke-width="1.4"/>`;
  s+=`<path d="M30 34H280" stroke="currentColor" stroke-width="1.4" stroke-dasharray="5 4"/>`;
  s+=G_T(286,38,"solvent front",{a:"start",s:10.5})+G_T(286,164,"pencil",{a:"start",s:10.5})+G_T(286,176,"baseline",{a:"start",s:10.5});
  const lanes=[[70,"Brown ink",[["#7A4A2A",150],["#7A4A2A",112],["#7A4A2A",80]]],[130,"Red",[["#D9482B",112]]],[190,"Yellow",[["#E8B422",80]]],[250,"Blue",[["#2F5D8A",150]]]];
  lanes.forEach(l=>{s+=`<circle cx="${l[0]}" cy="160" r="3" fill="currentColor" fill-opacity=".5"/>`;
    l[2].forEach(sp=>{s+=`<ellipse cx="${l[0]}" cy="${sp[1]}" rx="11" ry="6" style="fill:${sp[0]}" fill-opacity=".85"/>`});
    s+=G_T(l[0],184,l[1],{s:10})});
  s+=G_T(155,22,"Chromatogram (paper)",{b:1,s:11});
  return G_FG("0 0 380 196",s,"The brown ink separates into three spots. Its spots line up with the red, yellow and blue references, so it contains those three colours. Blue travelled least, so it is least soluble in the solvent.","Chromatogram: brown ink separated into red, yellow and blue spots that line up with the reference lanes",440)};

/* distillation apparatus */
function G_DIST(frac){
  const top=frac?44:62;
  let s="";
  s+=`<circle cx="70" cy="146" r="34" ${G_LINE}/>`;
  s+=`<path d="M62 ${frac?112:112}V${top}h16V112" ${G_LINE}/>`;
  s+=`<path d="M40 150a30 30 0 0 0 60 0" style="fill:#7FB2E6" fill-opacity=".45" stroke="none"/>`;
  if(frac){for(let y=54;y<108;y+=9){s+=`<circle cx="${y%18?66:74}" cy="${y}" r="2.6" fill="currentColor" fill-opacity=".5"/>`}}
  s+=`<path d="M70 ${top-26}V${frac?top+14:top+14}" stroke="currentColor" stroke-width="2.4"/><circle cx="70" cy="${frac?top+16:top+16}" r="3" style="fill:var(--bad,#D9482B)"/>`;
  s+=`<path d="M78 ${top+6}H150" ${G_LINE}/>`;
  s+=`<g transform="rotate(22 150 ${top+6})"><rect x="150" y="${top-2}" width="140" height="16" rx="3" ${G_LINE}/><path d="M150 ${top+6}H290" stroke="currentColor" stroke-width="1.2"/></g>`;
  const ex=150+140*Math.cos(22*Math.PI/180),ey=top+6+140*Math.sin(22*Math.PI/180);
  s+=`<path d="M${ex.toFixed(0)} ${(ey+4).toFixed(0)}V${(ey+22).toFixed(0)}" stroke="currentColor" stroke-width="1.4" stroke-dasharray="3 3"/>`;
  s+=`<path d="M${(ex-24).toFixed(0)} ${(ey+30).toFixed(0)}v44h50v-44" ${G_LINE}/><path d="M${(ex-22).toFixed(0)} ${(ey+58).toFixed(0)}h46v14h-46z" style="fill:#7FB2E6" fill-opacity=".55" stroke="none"/>`;
  s+=`<rect x="34" y="184" width="72" height="10" rx="3" style="fill:var(--amber,#F2A93B)" fill-opacity=".7"/>`;
  s+=G_T(70,206,"heat",{s:10.5});
  s+=G_T(6,frac?20:36,"thermometer",{a:"start",s:10.5});
  s+=G_T(frac?54:44,frac?66:96,frac?"beads":"mixture",{a:"end",s:10.5});
  s+=G_T(160,top-14,"water out",{a:"start",s:10.5})+G_T(ex-8,ey+12,"water in",{a:"end",s:10.5});
  s+=G_T(ex+30,ey+70,"distillate",{a:"start",s:10.5});
  s+=G_T(262,top+20,"condenser",{s:10.5,b:1});
  return G_FG("0 0 390 216",s,frac?"Fractional distillation: the beads in the column give vapour many surfaces to condense on and re-evaporate. The liquid with the lower boiling point reaches the top and the thermometer first.":"Simple distillation: the solution boils, the vapour passes into the condenser, cools and runs into the beaker as pure liquid. The dissolved solid stays in the flask.",frac?"Fractional distillation apparatus with column, thermometer, condenser and receiver":"Simple distillation apparatus with flask, thermometer, condenser and receiver",460)}
FIGS.G_DIST=()=>G_DIST(false);
FIGS.G_FRAC=()=>G_DIST(true);

/* filtration */
FIGS.G_FILT=()=>{
  let s=`<path d="M70 40L170 40L130 100V120H110V100Z" ${G_LINE}/>`;
  s+=`<path d="M76 44L164 44L128 98H112Z" style="fill:#fff" fill-opacity=".5" stroke="currentColor" stroke-opacity=".5"/>`;
  s+=`<path d="M92 56l56 0l-6 12h-44z" style="fill:#C9A66B" fill-opacity=".85"/>`;
  s+=`<path d="M90 140v46h60v-46" ${G_LINE}/><path d="M92 168h56v16h-56z" style="fill:#7FB2E6" fill-opacity=".55" stroke="none"/>`;
  s+=`<path d="M120 124v10" stroke="#7FB2E6" stroke-width="2" stroke-dasharray="3 3"/>`;
  s+=`<path d="M190 20l-30 14" stroke="currentColor" stroke-width="1.4" fill="none"/>`;
  s+=G_T(196,20,"mixture poured in",{a:"start",s:10.5})+G_T(196,64,"residue: solid stays on the paper",{a:"start",s:10.5})+G_T(196,110,"filter paper in funnel",{a:"start",s:10.5})+G_T(166,170,"filtrate",{a:"start",s:10.5});
  s+=G_ARR(194,60,150,62,"currentColor",1.2)+G_ARR(194,106,140,92,"currentColor",1.2);
  return G_FG("0 0 400 196",s,"Filtration separates an insoluble solid (residue) from a liquid (filtrate).","Filtration: funnel with filter paper, residue on paper and filtrate in beaker",400)};

/* titration set-up */
FIGS.G_TITR=()=>{
  let s=`<rect x="40" y="188" width="150" height="8" rx="2" ${G_LINE}/>`;
  s+=`<path d="M50 188V16" stroke="currentColor" stroke-width="4"/><path d="M50 40H122" stroke="currentColor" stroke-width="3"/>`;
  s+=`<rect x="122" y="14" width="16" height="104" rx="2" ${G_LINE}/><rect x="124" y="46" width="12" height="70" style="fill:#7FB2E6" fill-opacity=".5"/>`;
  s+=`<path d="M122 36h16M122 56h16M122 76h16M122 96h16" stroke="currentColor" stroke-width="1"/>`;
  s+=`<path d="M118 126h24" stroke="currentColor" stroke-width="3"/><path d="M130 118v22" stroke="currentColor" stroke-width="3"/>`;
  s+=`<path d="M130 140v14" stroke="currentColor" stroke-width="1.6" stroke-dasharray="3 3"/>`;
  s+=`<rect x="70" y="182" width="120" height="8" style="fill:#fff" stroke="currentColor"/>`;
  s+=`<path d="M122 164h16l16 18h-48z" ${G_LINE}/><path d="M112 180h36" stroke="none"/><path d="M104 182l16-18h20l16 18z" style="fill:#F4C9B8" fill-opacity=".8" stroke="none"/>`;
  s+=G_T(154,30,"burette: acid, read the scale",{a:"start",s:10.5})+G_T(154,31+14,"from top to bottom",{a:"start",s:10.5});
  s+=G_T(154,124,"tap",{a:"start",s:10.5})+G_T(160,164,"conical flask:",{a:"start",s:10.5})+G_T(160,177,"25.0 cm³ alkali + indicator",{a:"start",s:10.5});
  s+=G_T(198,198,"white tile",{a:"start",s:10.5});
  s+=G_T(56,112,"clamp stand",{a:"start",s:10.5});
  return G_FG("0 0 380 206",s,"Swirl the flask while running acid in from the burette. Stop when one drop changes the colour of the indicator.","Titration apparatus: burette above a conical flask on a white tile, held by a clamp stand",420)};

/* gas collection */
FIGS.G_GAS=()=>{
  let s=`<path d="M30 80l10 60a14 14 0 0 0 14 12h36a14 14 0 0 0 14 -12l10 -60z" ${G_LINE}/><path d="M42 124h68l-2 18a10 10 0 0 1 -10 10h-44a10 10 0 0 1 -10 -10z" style="fill:#7FB2E6" fill-opacity=".5" stroke="none"/>`;
  s+=`<path d="M60 80V60M90 80V60" ${G_LINE}/><path d="M75 62H150" ${G_LINE}/>`;
  s+=`<rect x="150" y="48" width="100" height="26" rx="3" ${G_LINE}/><path d="M250 61h24" ${G_LINE}/><rect x="274" y="54" width="8" height="14" fill="currentColor"/><rect x="170" y="50" width="12" height="22" style="fill:var(--accent)" fill-opacity=".7"/>`;
  s+=G_T(150,38,"gas syringe: plunger pushed out",{a:"start",s:10.5})+G_T(150,90,"by the gas, read the volume",{a:"start",s:10.5});
  s+=G_T(70,176,"gas syringe",{b:1,s:11.5});
  s+=`<path d="M300 100h90v70h-90z" ${G_LINE}/><path d="M302 124h86v44h-86z" style="fill:#7FB2E6" fill-opacity=".45" stroke="none"/>`;
  s+=`<path d="M330 40v104h26V40" ${G_LINE}/><path d="M332 76h22v68h-22z" style="fill:#7FB2E6" fill-opacity=".5"/><path d="M332 70h22" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2"/>`;
  s+=`<path d="M298 62C320 62 330 80 330 130" stroke="#aaa" fill="none" stroke-dasharray="3 3"/>`;
  s+=G_T(345,32,"gas pushes",{s:10});s+=G_T(345,182,"collection over water",{b:1,s:11.5});
  return G_FG("0 0 400 190",s,"Left: a gas syringe measures volume directly and keeps the gas dry. Right: displacement of water uses an inverted measuring cylinder, but it fails for gases that dissolve in water.","Two ways to collect a gas: a gas syringe and displacement of water in an upturned measuring cylinder",460)};

/* ---------------- Lesson 1: measuring ---------------- */
const G_L1=L("Measuring time, temperature, mass and volume","Choosing the right apparatus, using it correctly and planning a fair experiment.",
`<h4>Time, temperature and mass</h4>
<p><b>Time</b> is measured with a stopwatch, in seconds or minutes. Be careful with the display: 1:30 means 1 minute 30 seconds, which is <b>90 seconds</b> or 1.5 minutes, not 1.30 minutes. If all your intervals are under a minute, record seconds.</p>
<p><b>Temperature</b> is measured in °C with a thermometer or a digital temperature probe. A lab thermometer reads to about 0.5 or 1 °C. A probe often reads to 0.1 °C and can log readings automatically.</p>
<p><b>Mass</b> is measured on a digital balance, usually in grams (1 kg = 1000 g). Press <b>tare</b> to set it to zero before use and wait for the reading to settle before you write it down.</p>
<h4>Measuring the volume of a liquid</h4>
<p>Choose the apparatus by the accuracy you need.</p>
<table><tr><th>Apparatus</th><th>Use</th><th>Accuracy</th></tr>
<tr><td>Burette</td><td>Variable volume, 0 to 50 cm^3^ (titrations)</td><td>Most accurate for variable volumes. 0.00 is at the top, so the scale reads downwards.</td></tr>
<tr><td>Volumetric pipette</td><td>One fixed volume, usually 10 or 25 cm^3^</td><td>Most accurate for a fixed volume. The bottom of the meniscus sits on the mark. Use a pipette filler.</td></tr>
<tr><td>Measuring cylinder</td><td>Approximate volumes, 10 cm^3^ to 1 dm^3^</td><td>Least accurate. Good when a rough amount is enough.</td></tr></table>
<p>1 cm^3^ is the same as 1 ml. Always read the volume with your eye level with the bottom of the meniscus.</p>
<h4>Measuring the volume of a gas</h4>
<p>When a reaction makes a gas you can collect it in a <b>gas syringe</b> or by <b>displacement of water</b> in an upturned measuring cylinder. The syringe is more precise and keeps the gas dry. Displacement of water cannot be used for a gas that dissolves in water. A coloured gas that is denser than air can be collected in an upright gas jar.</p>
{{G_GAS}}
<h4>Advantages and disadvantages of apparatus</h4>
<table><tr><th>Apparatus</th><th>Advantage</th><th>Disadvantage</th></tr>
<tr><td>Temperature probe</td><td>More precise, easy to repeat, can log over a long time</td><td>Can be corroded by some chemicals, costs more</td></tr>
<tr><td>Volumetric pipette</td><td>Very accurate fixed volume</td><td>Only one volume, harder to use</td></tr>
<tr><td>Gas syringe</td><td>Easy to set up, keeps gas dry</td><td>Can stick, limited volume, fragile and expensive</td></tr>
<tr><td>Microscale experiment</td><td>Less waste, saves energy, safer</td><td>Hard to see what is happening, products are hard to separate</td></tr></table>
<h4>Planning a good experiment</h4>
<p>Ask yourself these questions before you start. Is the apparatus suitable for what I am measuring? Will it finish in a sensible time? Will I get enough results to see a pattern? Can I repeat it to check reliability? Is the range of results wide enough? Are the amounts safe and not wasteful?</p>
<div class="key"><b>Exam tip</b>When an exam asks you to "suggest an improvement", name a better piece of apparatus and say why, for example "use a burette instead of a measuring cylinder because it is more accurate".</div>`,
I("Which piece of apparatus should you pick, and how sure can you be of your measurement?",
`<ol><li>You are given 20 cm^3^ of water. Measure it with a beaker, a measuring cylinder and a burette.</li><li>Record each volume. Which result do you trust most, and why?</li><li>List the apparatus you could use to measure a fixed 25 cm^3^ and decide which is best.</li><li>Write one sentence explaining how you decide which apparatus to use.</li></ol>`,
`<p><b>Reading scales.</b> Practise reading a burette set at several different levels. Record each reading to the nearest 0.05 cm^3^ and check with a partner.</p><p><b>Gas collection.</b> React magnesium ribbon with dilute hydrochloric acid and collect the hydrogen in a gas syringe, then repeat collecting over water. Compare how easy each method is and the volumes you get.</p><p><b>Thermometer or probe.</b> Cool hot water and record the temperature every minute with a thermometer and then a probe. Which gives a smoother curve?</p><p class="safe">Safety: wear eye protection. Hydrogen is flammable, so keep naked flames away. Take care with glass apparatus.</p>`),
[["A stopwatch reads 2:15. State the time in seconds.","135 seconds (2 min × 60 + 15) (1).",1],
["Name the apparatus that gives the most accurate fixed volume of 25 cm^3^ of a liquid.","Volumetric pipette (1).",1],
["Name the apparatus used to add a variable volume of acid drop by drop and state how its scale is read.","Burette (1). Scale starts at 0.00 at the top and is read downwards (1).",2],
["State why a gas syringe is better than collecting over water for measuring hydrogen volume.","It is more precise (1). It keeps the gas dry / no gas is lost by dissolving (1).",2],
["Give two reasons why a temperature probe may be better than a thermometer.","More precise (reads to 0.1 °C) (1). Can record automatically over a long time / easy repeat readings (1).",2],
["A student weighs a dish on a balance without taring it. Describe the mistake this causes.","The mass of the dish is included in the reading (1) so the mass of the sample is too large (1).",2]],
[M("What is the best apparatus for measuring a fixed volume of 25 cm^3^ accurately?",["Beaker","Measuring cylinder","Volumetric pipette","Burette"],2,"A volumetric pipette gives one very accurate volume."),
M("A stopwatch shows 1:30. What time should be recorded in minutes?",["1.30","1.5","1.3","90"],1,"90 seconds = 1.5 minutes."),
N("Convert 3 minutes 20 seconds to seconds.",200,"s","3 × 60 + 20 = 200 s."),
M("Which gas cannot be collected by displacement of water?",["Hydrogen","Oxygen","Ammonia","Nitrogen"],2,"Ammonia is very soluble in water."),
M("Where is the zero on a burette scale?",["At the bottom","At the top","In the middle","There is no zero"],1,"The scale reads downwards from 0.00 at the top."),
T("What word describes setting a balance to zero before adding a sample?",["tare","taring","tared"],"This is called taring."),
M("Which apparatus is least accurate for measuring volume?",["Burette","Volumetric pipette","Measuring cylinder","Gas syringe"],2,"Measuring cylinders are used for approximate volumes."),
M("Which is a disadvantage of microscale experiments?",["More waste","Less safe","Hard to see what is happening","Uses more energy"],2,"The tiny amounts are hard to observe.")],
[["How do you record 1 min 30 s?","90 seconds (or 1.5 min), not 1.30."],
["Most accurate apparatus for a fixed volume","Volumetric pipette."],
["Most accurate apparatus for a variable volume","Burette."],
["Apparatus for approximate volumes","Measuring cylinder."],
["Why tare a balance?","To set the reading to zero so the container is not counted."],
["Two ways to collect a gas","Gas syringe or displacement of water."],
["When can a gas not be collected over water?","When it dissolves in water, for example ammonia."],
["Where do you read the meniscus?","At the bottom of the curve, with your eye level."]]);

/* ---------------- Lesson 2: solutions and titration ---------------- */
const G_L2=L("Solutions and acid–base titrations","The vocabulary of solutions, how to carry out a titration and how to calculate a concentration.",
`<h4>Words used to describe solutions</h4>
<table><tr><th>Word</th><th>Meaning</th><th>Example</th></tr>
<tr><td>Solute</td><td>The substance that dissolves</td><td>Salt in seawater</td></tr>
<tr><td>Solvent</td><td>The liquid that the solute dissolves in</td><td>Water in seawater</td></tr>
<tr><td>Solution</td><td>Solute and solvent mixed together</td><td>Seawater</td></tr>
<tr><td>Saturated solution</td><td>Holds the most solute it can at that temperature</td><td>The Dead Sea</td></tr>
<tr><td>Soluble / insoluble</td><td>Will / will not dissolve</td><td>Salt / sand in water</td></tr>
<tr><td>Filtrate</td><td>Liquid that passes through a filter</td><td>Coffee in the cup</td></tr>
<tr><td>Residue</td><td>What is left behind after filtering or evaporating</td><td>Coffee grounds</td></tr></table>
<h4>What a titration does</h4>
<p>A titration finds out exactly how much of one solution reacts with a fixed volume of another. You use it to find an unknown concentration or to prepare a salt. The point where the reaction is just complete is the <b>end-point</b>, shown by a sharp colour change of an <b>indicator</b> after one drop.</p>
{{G_TITR}}
<h4>Method</h4>
<ol><li>Use a pipette and filler to put exactly 25.0 cm^3^ of alkali in a conical flask. Add a few drops of indicator. Stand it on a white tile.</li><li>Rinse and fill the burette with acid through a funnel. Run a little through the tip to remove air. Remove the funnel. Note the starting reading.</li><li>Do a <b>rough titration</b>: run the acid in quickly, swirling, until the colour changes. Record the volume.</li><li>Repeat with fresh alkali. Near the rough end-point add the acid <b>drop by drop</b>.</li><li>Record the volume to the nearest 0.05 cm^3^.</li><li>Repeat until you get two <b>concordant</b> results, which are within 0.1 cm^3^ of each other. Average those.</li></ol>
<table><tr><th></th><th>Rough</th><th>Titre 1</th><th>Titre 2</th></tr><tr><td>Final reading / cm^3^</td><td>23.4</td><td>22.9</td><td>23.0</td></tr><tr><td>First reading / cm^3^</td><td>0.0</td><td>0.2</td><td>0.2</td></tr><tr><td>Titre / cm^3^</td><td>23.4</td><td>22.7</td><td>22.8</td></tr></table>
<p>Titre 1 and titre 2 are concordant, so the mean titre is (22.7 + 22.8) ÷ 2 = <b>22.75 cm^3^</b>. The rough result is not used.</p>
<div class="key"><b>Exam tip</b>Common errors are leaving the funnel in the burette, not removing air from the tip, not swirling, and adding acid too fast near the end-point.</div>
<h4>Calculating a concentration</h4>
<p>Use these steps. Amount (mol) = concentration (mol/dm^3^) × volume (dm^3^). Divide cm^3^ by 1000 to get dm^3^.</p>
<div class="ex"><b>Worked example</b>25.0 cm^3^ of 0.100 mol/dm^3^ NaOH is neutralised by 20.0 cm^3^ of sulfuric acid. Find the concentration of the acid.<br>2NaOH + H~2~SO~4~ → Na~2~SO~4~ + 2H~2~O<br>1. Moles NaOH = 0.100 × 25.0/1000 = 0.00250 mol<br>2. Ratio NaOH : H~2~SO~4~ = 2 : 1, so moles H~2~SO~4~ = 0.00125 mol<br>3. Concentration = 0.00125 ÷ (20.0/1000) = <b>0.0625 mol/dm^3^</b></div>
<h4>Choosing an indicator <i>(Extended only)</i></h4>
<p>Titrations of strong acids and strong alkalis work with methyl orange or phenolphthalein. For a more precise end-point the indicator should change colour sharply when one drop of excess is added. Always say which colour change you expect, for example phenolphthalein goes from pink in the alkali to colourless at the end-point.</p>`,
I("How can you find the concentration of an acid you cannot see inside?",
`<ol><li>Imagine two clear solutions. One is alkali of known concentration, the other is an unknown acid. How could you tell when they have exactly reacted?</li><li>Design a method. What do you need to measure, and with what apparatus?</li><li>Why do you need to repeat the experiment?</li><li>Write down the steps you will use to turn your result into a concentration.</li></ol>`,
`<p><b>Titration practical.</b> Titrate 25.0 cm^3^ of 0.100 mol/dm^3^ sodium hydroxide against dilute hydrochloric acid using methyl orange. Do one rough and at least two accurate runs. Calculate the concentration of the acid.</p><p><b>Spot the error.</b> Your teacher sets up a faulty titration (funnel left in burette, air bubble in the tip). Find three mistakes and explain the effect of each.</p><p><b>Class results.</b> Collect everyone's concordant titres and compare. Why do they differ slightly?</p><p class="safe">Safety: wear eye protection. Dilute acids and alkalis are irritants. Wipe up spills.</p>`),
[["Define the terms solute, solvent and solution.","Solute is the substance that dissolves (1). Solvent is the liquid it dissolves in (1). Solution is the mixture of the two (1).",3],
["Explain what is meant by concordant titres.","Results that are within 0.1 cm^3^ of each other (1).",1],
["State why a rough titration is done first.","To find the approximate end-point (1) so that the accurate runs can add acid drop by drop near it (1).",2],
["Calculate the mean titre of 24.10, 24.20 and 24.90 cm^3^ using only the concordant results.","Concordant results are 24.10 and 24.20 (1). Mean = 24.15 cm^3^ (1).",2],
["20.0 cm^3^ of 0.200 mol/dm^3^ HCl neutralises 25.0 cm^3^ of NaOH. Calculate the concentration of the NaOH.","Moles HCl = 0.200 × 0.0200 = 0.00400 (1). Ratio 1 : 1 so moles NaOH = 0.00400 (1). Concentration = 0.00400 ÷ 0.0250 = 0.160 mol/dm^3^ (1).",3],
["Name two errors that make a burette reading wrong.","Funnel left in the burette (1). Air bubble in the tip / reading from the wrong place on the meniscus (1).",2]],
[M("What is the liquid that a solute dissolves in called?",["Solute","Solvent","Residue","Filtrate"],1,"The solvent."),
M("What are concordant titres?",["Titres within 0.1 cm^3^","The largest titres","Titres of exactly 25 cm^3^","The rough titres"],0,"Concordant results are within 0.1 cm^3^."),
N("What is the mean of the concordant titres 22.70 and 22.80 cm^3^?",22.75,"cm³","(22.70 + 22.80) ÷ 2 = 22.75.",0.01),
N("How many moles are in 25.0 cm^3^ of 0.100 mol/dm^3^ solution?",0.0025,"mol","0.100 × 0.0250 = 0.00250 mol.",0.00001),
N("Moles of H~2~SO~4~ that react with 0.00250 mol NaOH (2NaOH + H~2~SO~4~ → ...)?",0.00125,"mol","The ratio NaOH : H~2~SO~4~ is 2 : 1.",0.00001),
N("0.00125 mol of acid is in 20.0 cm^3^. What is the concentration?",0.0625,"mol/dm³","0.00125 ÷ 0.0200 = 0.0625.",0.0005),
N("22.5 cm^3^ of 0.200 mol/dm^3^ HCl neutralises 25.0 cm^3^ NaOH (1 : 1). Find the NaOH concentration.",0.18,"mol/dm³","Moles HCl = 0.200 × 0.0225 = 0.00450. Concentration = 0.00450 ÷ 0.0250 = 0.18.",0.002),
T("What do we call a solution holding the maximum solute at a given temperature?",["saturated"],"A saturated solution."),
M("Why is the burette tip filled before titrating?",["To make it look neat","To remove air bubbles","To cool the acid","To clean the flask"],1,"Air in the tip would give a false reading.")],
[["Solute","The substance that dissolves."],
["Solvent","The liquid in which the solute dissolves."],
["Saturated solution","The most solute that can dissolve at that temperature."],
["Filtrate and residue","Filtrate passes through a filter; residue stays behind."],
["Concordant titres","Results within 0.1 cm^3^."],
["End-point","The point where one drop gives a sharp indicator colour change."],
["Moles from concentration","n = c × V (V in dm^3^ = cm^3^ ÷ 1000)."],
["Why do a rough titration?","To find the approximate end-point."]]);

/* ---------------- Lesson 3: chromatography ---------------- */
const G_L3=L("Paper chromatography and Rf values","Separating mixtures of coloured substances, reading chromatograms and calculating Rf.",
`<h4>How paper chromatography works</h4>
<p>Chromatography separates substances in a mixture and helps to identify them. The substances have different <b>solubilities</b> in the solvent.</p>
<ol><li>Draw a <b>pencil</b> line near the bottom of the paper. Ink would dissolve and run, but pencil does not.</li><li>Place small spots of each sample on the line.</li><li>Stand the paper in a solvent (often water, sometimes ethanol) so that the solvent level is <b>below</b> the pencil line.</li><li>The solvent rises up the paper by capillary action and carries the substances with it.</li><li>The more soluble a substance, the further it travels. Remove the paper before the solvent reaches the top and mark the solvent front.</li></ol>
{{G_CHROMA}}
<h4>Reading a chromatogram</h4>
<ul><li>A <b>pure</b> substance gives <b>one</b> spot.</li><li>A <b>mixture</b> gives <b>more than one</b> spot.</li><li>Spots that are level with each other (at the same height) are the same substance.</li><li>Run known substances alongside as <b>references</b> to identify unknown spots.</li></ul>
<p>In the chromatogram above the brown ink is a mixture because it makes three spots. It contains red, yellow and blue because each spot lines up with a pure reference lane.</p>
<div class="key"><b>Exam tip</b>Exam chromatograms are black and white. Decide whether two substances match by checking that their spots are at the same height.</div>
<h4>Locating agents <i>(Extended only)</i></h4>
<p>Colourless substances such as amino acids or sugars cannot be seen on the paper. After the run, the paper is treated with a <b>locating agent</b>, which reacts with the substances to give coloured spots you can see.</p>
<h4>Retention factor, Rf <i>(Extended only)</i></h4>
<p>Rf = distance moved by the substance ÷ distance moved by the solvent. Measure both from the baseline. Rf is a ratio, so it has <b>no units</b>, and it is always <b>less than 1</b>. For a given substance and solvent Rf is always the same, so unknown spots can be identified by comparing their Rf values with data tables. If the solvent changes, the Rf changes.</p>
<div class="ex"><b>Worked example</b>The solvent front moved 6.0 cm. A spot moved 3.0 cm.<br>Rf = 3.0 ÷ 6.0 = <b>0.50</b></div>
<div class="key"><b>Exam tip</b>Measure with a ruler to the centre of the spot and from the baseline, not from the bottom of the paper. Mark schemes accept only a narrow range.</div>`,
I("How can we tell what colours are hidden inside a black ink?",
`<ol><li>Look at a black felt-tip pen mark. Is it one colour or several? Predict how you could find out.</li><li>Think about what the ink needs to be able to move through the paper.</li><li>Why must the start line be drawn in pencil, and why must the solvent be below the line?</li><li>Write a prediction for the number of coloured spots in black ink.</li></ol>`,
`<p><b>Ink chromatography.</b> Separate the colours in black, brown and green felt-tip pens on chromatography paper using water. Mark the solvent front. Compare the pens.</p><p><b>Crime scene.</b> Compare a ransom-note ink with ink from four suspects' pens. Which pen matches?</p><p><b>Calculate Rf.</b> Measure the distances for one spot and calculate its Rf. Try a different solvent such as a water–ethanol mix and see what changes.</p><p class="safe">Safety: wear eye protection. Ethanol is flammable, so keep it away from flames.</p>`),
[["Explain why the start line is drawn in pencil.","Pencil does not dissolve in the solvent (1), ink would run up the paper with the sample (1).",2],
["Explain why the solvent level must be below the start line.","Otherwise the samples would dissolve into the solvent (1) instead of rising up the paper (1).",2],
["A chromatogram of a dye shows three spots. State what this tells you.","The dye is a mixture (1) of at least three substances (1).",2],
["State why a locating agent is used.","Colourless substances (e.g. amino acids) cannot be seen (1), the agent reacts to give coloured spots (1).",2],
["A substance travelled 4.5 cm while the solvent travelled 6.0 cm. Calculate Rf.","Rf = distance moved by substance ÷ distance moved by solvent (1) = 4.5 ÷ 6.0 = 0.75 (1).",2],
["State why Rf has no units and is always below 1.","It is a ratio of two distances (1). The substance cannot travel further than the solvent (1).",2]],
[M("Why do some substances travel further up the paper?",["They are heavier","They are more soluble in the solvent","They are darker","They were added first"],1,"More soluble substances are carried further."),
M("How many spots does a pure substance give?",["One","Two","Three","None"],0,"A pure substance gives one spot."),
N("A spot moved 3.0 cm and the solvent moved 6.0 cm. What is Rf?",0.5,"","3.0 ÷ 6.0 = 0.5.",0.005),
N("A spot moved 2.4 cm and the solvent moved 9.6 cm. What is Rf?",0.25,"","2.4 ÷ 9.6 = 0.25.",0.005),
N("The solvent moved 8.0 cm. A spot has Rf = 0.35. How far did it move?",2.8,"cm","0.35 × 8.0 = 2.8 cm.",0.05),
T("What is the name of the substance used to make colourless spots visible?",["locating agent","locating"],"A locating agent."),
M("Why are known substances run alongside the unknown?",["To check the paper","To act as references for matching","To change the solvent","To speed up the run"],1,"Spots at the same height are the same substance."),
M("What is the effect of changing the solvent on Rf?",["No change","Rf changes","Rf becomes 1","Rf becomes zero"],1,"Rf depends on the solvent used.")],
[["Why use a pencil line?","Pencil does not dissolve or run in the solvent."],
["What carries the solvent up the paper?","Capillary action."],
["What does one spot mean?","The substance is pure."],
["What does more than one spot mean?","The sample is a mixture."],
["What is a locating agent?","A chemical that reacts with colourless spots to make them visible."],
["Rf formula","Distance moved by substance ÷ distance moved by solvent."],
["Rf units and range","No units; always less than 1."],
["How do you match two spots?","They are at the same height under the same conditions."]]);

/* ---------------- Lesson 4: separation techniques ---------------- */
const G_L4=L("Separation techniques and purity","Choosing between filtration, crystallisation and distillation, and testing whether a substance is pure.",
`<h4>Choosing a method</h4>
<p>The method you choose depends on a difference in physical properties of the substances: solubility, boiling point or particle size. First decide what is in the mixture, then decide which property is different.</p>
<table><tr><th>Mixture</th><th>Method</th></tr>
<tr><td>Insoluble solid and liquid</td><td>Filtration (or centrifuging)</td></tr>
<tr><td>Dissolved solid in a solution</td><td>Evaporation or crystallisation</td></tr>
<tr><td>Pure liquid from a solution</td><td>Simple distillation</td></tr>
<tr><td>Mixture of miscible liquids</td><td>Fractional distillation</td></tr>
<tr><td>Coloured substances</td><td>Chromatography</td></tr></table>
<h4>Filtration</h4>
<p>Filtration separates an undissolved solid from a liquid. The mixture is poured through filter paper in a funnel. The liquid passes through as the <b>filtrate</b> and the solid is left as the <b>residue</b>. To separate sand and salt, add water: salt dissolves, sand does not. Filter, then crystallise the filtrate.</p>
{{G_FILT}}
<h4>Crystallisation</h4>
<p>Use crystallisation to get a solid from a solution, especially when it is more soluble in hot water than in cold, such as copper(II) sulfate.</p>
<ol><li>Heat the solution to evaporate about half the water. Do not boil it dry.</li><li>Test whether it is saturated: dip in a cold, clean glass rod. If crystals form on the rod, the solution is saturated.</li><li>Leave the saturated solution to <b>cool slowly</b>. Crystals form as the solubility falls.</li><li>Filter off the crystals, wash them with a little cold distilled water, then dry them between filter papers or in a warm oven.</li></ol>
<div class="key"><b>Exam tip</b>Say that no more than about half the solution is boiled off. Heating to dryness can spoil the crystals.</div>
<h4>Simple distillation</h4>
<p>Simple distillation separates a pure liquid from a solution, such as water from salt water. The solution is heated, the water evaporates, and the vapour passes into the condenser where it cools and condenses to pure water. The solid stays in the flask.</p>
{{G_DIST}}
<h4>Fractional distillation</h4>
<p>Fractional distillation separates liquids that mix, such as ethanol (boiling point 78 °C) and water (100 °C). The mixture is heated and the ethanol evaporates first. In the column the vapour condenses on beads and re-evaporates repeatedly, so only the lowest boiling liquid reaches the top. It is collected at about 78 °C. When the temperature rises towards 100 °C, stop heating. An electric heater is safer than a flame for flammable liquids.</p>
{{G_FRAC}}
<p>Industry uses the same idea in huge columns to separate crude oil and liquid air. Gas mixtures can be separated by cooling until they liquefy and then using fractional distillation.</p>
<h4>Assessing purity</h4>
<p>A <b>pure</b> substance melts and boils at one sharp temperature (water: 0 °C and 100 °C). A <b>mixture</b> melts and boils over a range. Impurities generally <b>lower</b> the melting point and <b>raise</b> the boiling point. Comparing a measured value to a data table identifies an unknown pure substance, and the closer the value, the purer the sample.</p>
<div class="ex"><b>Worked example</b>A student has calcium sulfate (insoluble) and magnesium chloride (soluble) mixed with water. To get magnesium chloride crystals: <b>filter</b> to remove the calcium sulfate, then <b>crystallise</b> the filtrate.</div>`,
I("How would you get pure water, salt and sand back from a bucket of muddy sea water?",
`<ol><li>List what is in the mixture: which parts dissolve and which do not.</li><li>Plan the steps in order. What is separated first?</li><li>Which property does each step use?</li><li>Draw a flow chart of your plan.</li></ol>`,
`<p><b>Sand, salt and water.</b> Separate a mixture of sand and salt. Dissolve in water, filter, then crystallise the filtrate. Weigh both products and calculate the percentage recovered.</p><p><b>Grow crystals.</b> Make a saturated copper(II) sulfate solution, test it with a glass rod, and leave it to cool slowly. Compare the crystals from fast and slow cooling.</p><p><b>Distil it.</b> Distil coloured salt water. Test the distillate with silver nitrate to show no chloride remains.</p><p class="safe">Safety: wear eye protection. Keep flammable liquids away from flames and use an electric heater. Hot glass looks like cold glass.</p>`),
[["Describe how to separate sand from a mixture of sand and salt.","Add water to dissolve the salt (1). Filter (1). The sand is the residue (1).",3],
["Describe how to obtain salt crystals from the filtrate in the question above.","Heat to evaporate part of the water to give a saturated solution (1). Leave to cool slowly so crystals form (1). Filter, wash and dry them (1).",3],
["State one way to test whether a solution is saturated.","Dip a cold glass rod in (1), crystals form on it (1).",2],
["Name the method for obtaining pure water from salt water and describe what happens in the condenser.","Simple distillation (1). The vapour cools and condenses to liquid (1).",2],
["Ethanol boils at 78 °C and water at 100 °C. Explain how they are separated.","Fractional distillation (1). Ethanol evaporates first (1) and is collected at about 78 °C (1).",3],
["A solid melts over the range 70 to 78 °C. State what this shows and what a pure compound would do.","It is impure / a mixture (1). A pure compound melts at one sharp temperature (1).",2]],
[M("Which method separates an insoluble solid from a liquid?",["Filtration","Distillation","Chromatography","Evaporation to dryness"],0,"The solid cannot pass through the filter paper."),
M("What is the solid left on the filter paper called?",["Filtrate","Residue","Solvent","Distillate"],1,"The residue."),
M("Which method separates two liquids that mix and have different boiling points?",["Filtration","Crystallisation","Fractional distillation","Decanting"],2,"Fractional distillation."),
M("What is collected from simple distillation of salt water?",["Salt","Pure water","Sand","Salt water"],1,"The water condenses as the distillate."),
T("Name the property that differs when separating ethanol from water by distillation.",["boiling point","boiling points"],"Boiling point."),
M("A pure substance melts...",["Over a wide range","At a sharp temperature","Never","Below zero"],1,"A pure substance has a sharp melting point."),
M("What effect do impurities have on the melting point?",["Raise it","Lower it","No effect","Make it exactly 100 °C"],1,"Impurities lower the melting point."),
M("What should be done to hot saturated copper sulfate solution to form crystals?",["Boil to dryness","Cool slowly","Add sand","Shake it"],1,"Slow cooling gives better crystals.")],
[["What is filtration used for?","Separating an insoluble solid from a liquid."],
["Residue and filtrate","Residue stays on the paper; filtrate goes through."],
["Why cool a saturated solution slowly?","Crystals form as solubility falls."],
["What is simple distillation used for?","Getting a pure liquid from a solution."],
["Fractional distillation separates...","Miscible liquids with different boiling points."],
["Temperature of ethanol in fractional distillation","About 78 °C."],
["Pure substance melting point","Sharp, single temperature."],
["Effect of impurities","Lower melting point, higher boiling point."]]);

SETL(12,[G_L1,G_L2,G_L3,G_L4,"Testing for anions","Testing for cations and flame tests","Testing for gases"]);
