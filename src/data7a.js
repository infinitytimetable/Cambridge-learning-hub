/* ===== GROUP A: Topic 1 (states, gas pressure, diffusion), Topic 2 (giant structures, metallic bonding), Topic 3 (the mole and calculations) ===== */
(function(){
const fig=(vb,inner,cap,label,maxw)=>`<figure class="fig"${maxw?` style="max-width:${maxw}px"`:""}><svg viewBox="${vb}" role="img" aria-label="${label}">${inner}</svg><figcaption>${cap}</figcaption></figure>`;
const AC="style=\"fill:var(--accent)\"",BD="style=\"fill:var(--bad)\"";
const txt=(x,y,s,o)=>`<text x="${x}" y="${y}" ${o&&o.a?`text-anchor="${o.a}"`:""} font-size="${(o&&o.s)||11}" ${o&&o.b?'font-weight="700"':""} fill="${(o&&o.f)||"currentColor"}">${s}</text>`;
const arrowDef=(id,col)=>`<marker id="${id}" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L8 4L0 8z" fill="${col}"/></marker>`;

/* ---------- Topic 1 figures ---------- */
FIGS.A_STATECHANGE=()=>fig("0 0 440 190",`<defs>${arrowDef("sc1","var(--bad)")}${arrowDef("sc2","var(--accent)")}</defs>
${[[20,"Solid"],[170,"Liquid"],[320,"Gas"]].map(b=>`<rect x="${b[0]}" y="64" width="100" height="56" rx="10" fill="none" stroke="currentColor" stroke-width="1.6"/>${txt(b[0]+50,98,b[1],{a:"middle",s:16,b:1})}`).join("")}
<path d="M124 78H164" stroke="var(--bad)" stroke-width="2.4" marker-end="url(#sc1)"/><path d="M274 78H314" stroke="var(--bad)" stroke-width="2.4" marker-end="url(#sc1)"/>
<path d="M164 106H124" stroke="var(--accent)" stroke-width="2.4" marker-end="url(#sc2)"/><path d="M314 106H274" stroke="var(--accent)" stroke-width="2.4" marker-end="url(#sc2)"/>
${txt(144,60,"melting",{a:"middle",s:12})}${txt(294,44,"boiling",{a:"middle",s:12})}${txt(294,58,"evaporation",{a:"middle",s:12})}
${txt(144,134,"freezing",{a:"middle",s:12})}${txt(294,134,"condensation",{a:"middle",s:12})}
<path d="M20 168H420" stroke="currentColor" stroke-width="1.2" marker-end="url(#sc1)"/>${txt(20,184,"Red arrows: particles gain energy (heating). Teal arrows: particles lose energy (cooling).",{s:11})}
${txt(70,18,"Strong forces",{a:"middle",s:11})}${txt(220,18,"Weaker forces",{a:"middle",s:11})}${txt(370,18,"Almost no forces",{a:"middle",s:11})}`,"The five changes of state and the direction of energy transfer","Changes of state. Heating moves right, cooling moves left","Changes of state between solid, liquid and gas",460);
FIGS.A_COOL=()=>fig("0 0 360 210",`<path d="M52 12V176H346" fill="none" stroke="currentColor" stroke-width="1.5"/>${txt(14,100,"Temperature",{a:"middle"}).replace("<text ",'<text transform="rotate(-90 14 100)" ')}${txt(200,200,"Time (cooling at a steady rate)",{a:"middle"})}
<path d="M60 24L120 66H174L226 124H280L324 160" fill="none" style="stroke:var(--accent)" stroke-width="3" stroke-linejoin="round"/>
${txt(64,20,"gas",{})}${txt(124,56,"gas + liquid",{})}${txt(178,100,"liquid",{})}${txt(232,114,"liquid + solid",{})}${txt(286,150,"solid",{})}
${txt(48,69,"b.p.",{a:"end"})}${txt(48,127,"m.p.",{a:"end"})}`,"Condensing and freezing are the flat sections. The curve is the mirror image of the heating curve.","Cooling curve of a pure substance","Cooling curve with two flat sections at the boiling point and melting point");
const parts=(pts,r,col)=>pts.map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="${r||5}" style="fill:${col||"var(--accent)"}"/>`).join("");
FIGS.A_PUMP=()=>fig("0 0 440 170",`<rect x="20" y="30" width="170" height="80" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="190" y="22" width="8" height="96" fill="currentColor"/><path d="M198 70H240" stroke="currentColor" stroke-width="5"/>
${parts([[44,50],[80,92],[110,44],[140,80],[168,52],[60,70],[130,98]])}
<rect x="270" y="30" width="70" height="80" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="340" y="22" width="8" height="96" fill="currentColor"/><path d="M348 70H390" stroke="currentColor" stroke-width="5"/>
${parts([[286,46],[312,44],[326,62],[290,70],[310,84],[326,98],[290,96]])}
${txt(105,134,"Large volume",{a:"middle",s:13,b:1})}${txt(105,150,"fewer collisions: lower pressure",{a:"middle",s:11})}
${txt(305,134,"Small volume",{a:"middle",s:13,b:1})}${txt(305,150,"more collisions: higher pressure",{a:"middle",s:11})}`,"Same number of particles in both cylinders. Pushing in the piston increases the pressure.","Gas in a pump","Two gas cylinders: the smaller volume has the same particles closer together");
FIGS.A_TEMPVOL=()=>{
  const ar=(x,y,dx,dy)=>`<path d="M${x} ${y}l${dx} ${dy}" stroke="var(--bad)" stroke-width="1.8" marker-end="url(#tv)"/>`;
  return fig("0 0 440 214",`<defs>${arrowDef("tv","var(--bad)")}</defs>
<circle cx="110" cy="86" r="56" fill="none" stroke="currentColor" stroke-width="1.6"/>${parts([[84,70],[124,58],[140,98],[96,110],[116,86]])}${ar(84,70,12,-8)}${ar(124,58,10,10)}${ar(140,98,-12,6)}${ar(96,110,-8,-10)}${ar(116,86,10,6)}
<circle cx="330" cy="92" r="82" fill="none" stroke="currentColor" stroke-width="1.6"/>${parts([[290,60],[350,48],[380,108],[300,130],[336,92]])}${ar(290,60,30,-18)}${ar(350,48,24,24)}${ar(380,108,-30,12)}${ar(300,130,-22,-26)}${ar(336,92,28,14)}
${txt(110,160,"Cool gas: small volume",{a:"middle",s:12,b:1})}${txt(110,176,"slow particles",{a:"middle",s:11})}${txt(330,190,"Hot gas: large volume",{a:"middle",s:12,b:1})}`,"Heating a gas in a flexible container: the faster particles hit the walls harder and more often, so the container gets bigger.","Gas at two temperatures","A gas in a flexible container at low and high temperature");
};
FIGS.A_KMNO4=()=>{
  const bk=(x,fill,extra)=>`<path d="M${x} 24V130Q${x} 140 ${x+10} 140H${x+90}Q${x+100} 140 ${x+100} 130V24" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="${x+2}" y="50" width="96" height="88" rx="3" style="fill:${fill}"/>${extra}`;
  return fig("0 0 400 190",`${bk(14,"rgba(120,160,220,.22)",`<rect x="${14+42}" y="126" width="16" height="10" style="fill:#6b2f93"/>`)}
${bk(150,"rgba(120,160,220,.22)",`<ellipse cx="${150+50}" cy="104" rx="34" ry="30" style="fill:#6b2f93;fill-opacity:.45"/><rect x="${150+42}" y="126" width="16" height="10" style="fill:#6b2f93"/>`)}
${bk(286,"rgba(107,47,147,.32)","")}
${txt(64,164,"Start",{a:"middle",s:12,b:1})}${txt(64,180,"crystal in water",{a:"middle",s:11})}${txt(200,164,"After a while",{a:"middle",s:12,b:1})}${txt(200,180,"particles spreading",{a:"middle",s:11})}${txt(336,164,"After some hours",{a:"middle",s:12,b:1})}${txt(336,180,"evenly mixed",{a:"middle",s:11})}`,"Potassium manganate(VII) diffusing in water. No stirring is needed.","Diffusion of potassium manganate(VII) in water","Three beakers showing purple colour spreading through water over time",520);
};
FIGS.A_BROMINE=()=>{
  const jar=(x,top,bot,pts,pc)=>`<rect x="${x}" y="14" width="80" height="70" fill="none" stroke="currentColor" stroke-width="1.6" style="fill:${top}"/><rect x="${x}" y="84" width="80" height="70" fill="none" stroke="currentColor" stroke-width="1.6" style="fill:${bot}"/>${pts}`;
  const br="rgba(200,102,27,.5)",pl="rgba(200,102,27,.18)";
  return fig("0 0 400 190",`${jar(40,"none",br,parts([[60,104],[90,128],[116,100],[70,138],[104,134]],4,"#C8661B"))}${jar(240,pl,pl,parts([[260,34],[290,60],[316,36],[268,110],[300,100],[312,136],[270,140],[286,40]],4,"#C8661B"))}
${txt(80,176,"Start",{a:"middle",s:12,b:1})}${txt(280,176,"After about 5 minutes",{a:"middle",s:12,b:1})}${txt(80,10,"air (colourless)",{a:"middle",s:10})}`,"Bromine vapour and air mix completely on their own.","Diffusion of bromine gas","Two gas jars: bromine in the lower jar at the start, spread through both jars later",480);
};
FIGS.A_NH3HCL=()=>fig("0 0 440 170",`<defs>${arrowDef("nh","var(--accent)")}${arrowDef("hc","var(--bad)")}</defs>
<rect x="30" y="54" width="380" height="34" rx="4" fill="none" stroke="currentColor" stroke-width="1.6"/>
<rect x="18" y="58" width="14" height="26" rx="4" style="fill:var(--accent);fill-opacity:.4"/><rect x="408" y="58" width="14" height="26" rx="4" style="fill:var(--bad);fill-opacity:.4"/>
${txt(4,38,"cotton wool with",{s:10})}${txt(4,50,"conc. ammonia",{s:10})}${txt(436,38,"cotton wool with",{a:"end",s:10})}${txt(436,50,"conc. HCl",{a:"end",s:10})}
<ellipse cx="258" cy="71" rx="10" ry="15" style="fill:#fff;stroke:currentColor"/>${txt(258,114,"white ring of NH₄Cl",{a:"middle",s:12,b:1})}
<path d="M34 130H254" stroke="var(--accent)" stroke-width="2.2" marker-end="url(#nh)"/><path d="M406 150H262" stroke="var(--bad)" stroke-width="2.2" marker-end="url(#hc)"/>
${txt(144,124,"NH₃ (Mr 17) travels further",{a:"middle",s:11})}${txt(334,166,"HCl (Mr 36.5) travels less far",{a:"middle",s:11})}`,"Ammonia particles are lighter, so they diffuse faster. The ring forms nearer the HCl end.","Ammonia and hydrogen chloride in a glass tube","A glass tube with a white ring of ammonium chloride closer to the hydrogen chloride end",520);
globalThis.A_H={fig,txt,arrowDef,parts};
})();

/* ===== Topic 1 lessons (rebuilt from the teacher's notes, own wording) ===== */
(function(){
const t1=[
L("Solids, liquids and gases","The kinetic particle model and how it explains the properties of the three states.",
`<h4>The kinetic particle model</h4>
<p>All matter is made of tiny <b>particles</b> (atoms, molecules or ions) that are never still. The <b>kinetic theory</b> uses this idea to explain why solids, liquids and gases behave so differently.</p>
<p>What changes from one state to another is <b>how the particles are arranged</b>, <b>how they move</b> and <b>how much energy they have</b>.</p>
{{STATES}}
<h4>Solids, liquids and gases compared</h4>
<table><tr><th></th><th>Solid</th><th>Liquid</th><th>Gas</th></tr>
<tr><td>Arrangement</td><td>Regular pattern</td><td>Random</td><td>Random</td></tr>
<tr><td>Movement</td><td>Vibrate about fixed positions</td><td>Move around and slide past each other</td><td>Move quickly in all directions</td></tr>
<tr><td>Closeness</td><td>Very close</td><td>Close</td><td>Far apart</td></tr>
<tr><td>Density</td><td>High</td><td>Medium</td><td>Very low</td></tr>
<tr><td>Energy of particles</td><td>Lowest</td><td>Greater</td><td>Highest</td></tr></table>
<div class="key"><b>Exam tip</b>When you compare states, always talk about three things: arrangement, movement and energy. Say what the particles do, not just what the substance looks like.</div>
<h4>Explaining the properties</h4>
<table><tr><th>Property</th><th>Particle explanation</th></tr>
<tr><td>A solid keeps its shape</td><td>Particles are locked in position by strong attractions and can only vibrate.</td></tr>
<tr><td>A liquid flows and takes the shape of its container</td><td>Particles are still touching, but they can slide past one another.</td></tr>
<tr><td>A gas fills any container</td><td>Particles are far apart, with almost no attraction, and move in every direction.</td></tr>
<tr><td>Gases can be compressed</td><td>There is a lot of empty space between the particles, so they can be pushed closer.</td></tr>
<tr><td>Solids and liquids cannot be compressed</td><td>The particles are already touching.</td></tr></table>
<h4>Density and the exception of water</h4>
<p>Solids are usually denser than liquids because their particles pack closer together. Water is the well-known exception: ice floats because its particles are held in an open arrangement, so ice is less dense than liquid water. Gases have very low density because their particles are so far apart. Gas particles at room temperature move at several hundred metres per second.</p>`,
I("Why can you pour a liquid but not a solid, and squeeze a gas but not a liquid?",
`<ol><li>Write down three things you can do with a gas that you cannot do with a solid.</li><li>Draw a particle diagram for each state in a box of the same size. Use 12 particles in each box.</li><li>Use your diagrams to explain each of the three differences you wrote down.</li><li>Swap diagrams with a partner and check that every state shows the correct spacing, arrangement and movement.</li></ol>`,
`<p><b>Syringe test.</b> Use a sealed syringe full of air and another full of water. Push the plunger on each. Record what happens and explain it using particle ideas.</p><p><b>Human particle model.</b> Learners act as particles: tightly packed and vibrating (solid), loosely touching and shuffling (liquid), spread out and walking fast in random directions (gas). Others observe and describe the model.</p><p><b>Model evaluation.</b> Write two ways the human model is a good representation and one way it is not (for example, real particles are not alive and do not choose where to go).</p>`,
["https://phet.colorado.edu/en/simulations/states-of-matter","PhET: States of Matter simulation"]),
[["Describe the arrangement and movement of particles in a solid.","Particles are closely packed in a regular pattern (1) and vibrate about fixed positions (1).",2],
["Describe the arrangement and movement of particles in a liquid.","Particles are close together in a random arrangement (1) and move around, sliding past each other (1).",2],
["Explain why a gas can be compressed but a liquid cannot.","In a gas the particles are far apart with a lot of empty space (1). In a liquid the particles are already touching, so there is no space to push them into (1).",2],
["Explain why a solid has a fixed shape.","The particles are held in fixed positions by strong forces (1) and can only vibrate, not move around (1).",2],
["Put solid, liquid and gas in order of increasing energy of their particles.","Solid, liquid, gas (1).",1]],
[M("Which statement describes the particles in a liquid?",["Regular arrangement, vibrating in position","Random arrangement, close together, able to slide past each other","Random arrangement, far apart, moving quickly","Regular arrangement, far apart"],1,"Liquid particles touch but are not in a pattern, and they can move past each other."),
M("Which state has particles with the highest energy?",["Solid","Liquid","Gas","They all have the same energy"],2,"Gas particles move fastest, so they have the most kinetic energy."),
M("Why can a liquid take the shape of its container?",["Its particles are far apart","Its particles slide past each other","Its particles are in a regular pattern","Its particles do not move"],1,"The particles can move past each other, so the liquid flows."),
M("Which is the exception, being less dense as a solid than as a liquid?",["Iron","Water","Carbon dioxide","Oxygen"],1,"Ice is less dense than liquid water."),
T("Name the theory that explains the properties of solids, liquids and gases in terms of moving particles.",["kinetic"],"The kinetic (particle) theory."),
M("Why are gases easy to compress?",["The particles are in a regular pattern","The particles are heavy","There is a lot of empty space between the particles","The particles do not move"],2,"Gas particles are far apart, so there is space to push them closer."),
M("Which state has the lowest density?",["Solid","Liquid","Gas","They have equal density"],2,"The particles of a gas are very far apart.")],
[["Particles in a solid","Close together, regular pattern, vibrating about fixed positions."],
["Particles in a liquid","Close together, random arrangement, moving and sliding past each other."],
["Particles in a gas","Far apart, random arrangement, moving quickly in all directions."],
["Why do gases compress?","There is a lot of empty space between the particles."],
["Which state has the highest particle energy?","Gas."],
["What is the exception to solids being denser than liquids?","Water: ice is less dense than liquid water."],
["What does kinetic theory say matter is made of?","Tiny particles in constant motion."],
["Three things to describe in a states question","Arrangement, movement and energy of the particles."]]),

L("Changes of state and heating curves","Melting, freezing, boiling, evaporation and condensation, and what heating and cooling curves show.",
`<h4>The changes of state</h4>
<p>A substance changes state when particles gain or lose enough energy to change how they are arranged and how they move. The changes are reversible, so exam questions often show them with the arrow ⇌.</p>
{{A_STATECHANGE}}
<div class="key"><b>Exam tip</b>Check which direction the question asks about. Melting and freezing are opposites, as are boiling and condensing.</div>
<h4>Melting and freezing</h4>
<ul><li><b>Melting</b> (solid to liquid): heat energy makes the particles vibrate more until they can move around. It happens at the <b>melting point</b>.</li><li><b>Freezing</b> (liquid to solid): the liquid loses energy until the particles lock into a regular pattern.</li><li>For a pure substance the melting point and freezing point are the <b>same temperature</b>. For water it is 0 °C.</li></ul>
<h4>Boiling, evaporation and condensation</h4>
<table><tr><th></th><th>Boiling</th><th>Evaporation</th></tr><tr><td>Where</td><td>Throughout the liquid (bubbles form)</td><td>At the surface only</td></tr><tr><td>Temperature</td><td>At the boiling point only</td><td>Over a range of temperatures, below the boiling point</td></tr><tr><td>Why</td><td>All particles have enough energy to escape</td><td>The fastest surface particles escape</td></tr></table>
<p>Evaporation is faster when the liquid is warmer and when it has a bigger surface area.</p>
<p><b>Condensation</b> (gas to liquid) happens when a gas is cooled. The particles lose energy, so when they collide they no longer bounce apart and they stick together instead. It occurs over a range of temperatures.</p>
<h4>Heating curves <i>(Extended only)</i></h4>
<p>When a substance is heated, its particles gain energy and the temperature rises. During a change of state the temperature stays constant, which shows as a flat section on the curve.</p>
{{CURVE}}
<h4>Why the temperature stays flat <i>(Extended only)</i></h4>
<p>Temperature measures the average kinetic energy of the particles. During melting or boiling the energy supplied is used to <b>overcome the attractions between particles</b>, not to speed them up. So the temperature does not change until the change of state is complete.</p>
{{A_COOL}}
<p>A cooling curve is the mirror image of a heating curve. The flat sections are condensing and freezing, where energy is given out as attractions form.</p>`,
I("Why does a puddle dry up on a cool day when the water never reaches its boiling point?",
`<ol><li>List all the factors you think could make a puddle dry faster.</li><li>Pick two factors and write a prediction for each, such as 'a bigger surface area makes evaporation faster'.</li><li>Explain your predictions in terms of the energy of surface particles.</li><li>Say what is different about boiling, and why boiling needs a particular temperature.</li></ol>`,
`<p><b>Evaporation race.</b> Put 5 cm^3^ of water on each of three identical dishes: one in the sun or near a warm place, one in a cool place, one with a larger surface area. Weigh each every 10 minutes. Plot the mass lost against time.</p><p><b>Cooling curve.</b> Warm stearic acid (or another solid your teacher provides) in a water bath until it melts, then let it cool while recording the temperature each 30 seconds. Plot the curve and find the freezing point from the flat section.</p><p><b>Explain the plateau.</b> Write a 3-sentence explanation of why the temperature does not fall while the substance is solidifying, in terms of energy and particles.</p><p class="safe">Safety: wear eye protection, and handle hot water baths and hot glassware carefully.</p>`,
["https://phet.colorado.edu/en/simulations/states-of-matter","PhET: States of Matter simulation"]),
[["Name the change of state when a liquid becomes a solid.","Freezing (1).",1],
["State two differences between boiling and evaporation.","Boiling happens throughout the liquid but evaporation only at the surface (1). Boiling happens only at the boiling point, but evaporation happens over a range of temperatures (1).",2],
["Explain what happens to gas particles when a gas condenses.","The particles lose energy (1) so they can no longer bounce away from each other and stick together as a liquid (1).",2],
["Explain why the temperature stays constant while a solid is melting. (Extended)","The energy supplied is used to overcome the attractions between particles (1), not to increase their kinetic energy, so the temperature does not rise (1).",2],
["Suggest two ways to make a liquid evaporate faster.","Warm it (1). Increase its surface area (1).",2]],
[M("Which change of state requires energy to be taken in?",["Condensing","Freezing","Melting","Solidifying"],2,"Melting needs heat energy so the particles can move."),
M("Evaporation differs from boiling because evaporation",["happens throughout the liquid","happens only at the surface","needs the boiling point to be reached","forms bubbles"],1,"Evaporation happens at the surface, below the boiling point."),
T("What name is given to the temperature at which a solid changes to a liquid?",["melting point","m.p."],"The melting point."),
M("A flat section on a heating curve means that",["the heater is switched off","the substance is changing state","the particles have stopped moving","the substance is pure water only"],1,"The energy goes into overcoming attractions during a change of state."),
M("The melting point of a pure substance is the same as its",["boiling point","freezing point","evaporation temperature","condensing point"],1,"Melting and freezing happen at the same temperature."),
M("What happens to the particles when a gas is cooled?",["They gain energy","They stop moving","They lose energy and group together","They become smaller"],2,"They lose energy, so they stick together as a liquid.")],
[["Melting","Solid to liquid. Heat energy is taken in."],
["Freezing","Liquid to solid. Same temperature as melting for a pure substance."],
["Boiling vs evaporation","Boiling: throughout the liquid at the boiling point. Evaporation: at the surface, at any temperature below it."],
["Condensation","Gas to liquid on cooling. Particles lose energy and stick together."],
["Why are heating curves flat at a change of state? (Extended)","Energy overcomes attractions between particles instead of raising the temperature."],
["What does the arrow ⇌ mean?","The change can go in both directions."],
["Two ways to speed up evaporation","Warmer liquid and larger surface area."],
["What is a cooling curve? (Extended)","The mirror image of a heating curve, with flat sections for condensing and freezing."]]),

L("Gas pressure, volume and temperature","How changing the temperature or volume of a gas changes its pressure, explained with moving particles.",
`<h4>Gas volume and pressure</h4>
<p>The volume of a gas changes easily when its temperature or pressure changes. Two everyday examples show this:</p>
<ul><li>A <b>hot-air balloon</b> rises because heating the air makes it expand. The same mass of gas takes up more space, so its density falls.</li><li>A <b>bicycle pump</b> works because pushing in the piston squeezes the same amount of air into less space, so the pressure rises.</li></ul>
{{A_PUMP}}
<h4>How gas pressure is made <i>(Extended only)</i></h4>
<p>Gas particles move randomly and constantly. Gas pressure is produced when the particles <b>collide with the inside walls</b> of the container. Each collision pushes on the wall. Many collisions every second add up to a steady pressure.</p>
<h4>Temperature and volume <i>(Extended only)</i></h4>
<p>Heating a gas gives its particles more kinetic energy, so they move faster and spread out. In a flexible container such as a balloon they push the walls outwards, so the volume rises. In a rigid container the volume cannot change, so the pressure rises instead because the faster particles hit the walls harder and more often.</p>
{{A_TEMPVOL}}
<div class="key"><b>Exam tip</b>Particles <i>spread out</i> when heated. It is the gas (the material) that <i>expands</i>. If you write that particles expand, you will lose the mark.</div>
<h4>Pressure and volume <i>(Extended only)</i></h4>
<p>Pressure depends on how many particles are in a given volume. When a gas is compressed, the same number of particles are squeezed into a smaller volume. They hit the walls <b>more frequently</b>, so the pressure goes up. If the volume is made larger, the opposite happens.</p>
<div class="ex"><b>Worked example</b>A syringe contains 50 cm^3^ of air. The plunger is pushed in to make the volume 25 cm^3^ at constant temperature. The pressure rises because the particles collide with the walls twice as often.</div>
<p>If the pressure inside a closed container becomes too high, the container may leak or burst. This is why aerosol cans carry a warning not to heat them.</p>`,
I("Why does a sealed can of gas become dangerous if it is heated?",
`<ol><li>Draw a particle diagram of gas in a rigid can at 20 °C and at 100 °C.</li><li>Add arrows to show how fast the particles move in each diagram.</li><li>Write a short explanation that links temperature, speed, number of collisions and pressure.</li><li>Predict what would happen to a balloon instead of a can, and explain the difference.</li></ol>`,
`<p><b>Balloon on a flask.</b> Stretch a balloon over the neck of a flask. Stand the flask in hot water, then in iced water. Record what happens to the balloon each time and explain each result.</p><p><b>Syringe and pressure.</b> Use a sealed syringe attached to a pressure sensor, if available. Record the pressure for different volumes. Plot pressure against volume and describe the pattern.</p><p><b>Teach-back.</b> In pairs, one learner explains how a bicycle pump works using particle ideas; the other checks that all of these words appear: particles, collisions, walls, volume, frequently.</p>`,
["https://phet.colorado.edu/en/simulations/gas-properties","PhET: Gas Properties simulation"]),
[["Explain why the pressure of a gas rises when its volume is reduced at constant temperature. (Extended)","The same number of particles are in a smaller volume (1), so they collide with the walls more frequently (1).",2],
["Explain how gas particles produce pressure in a closed container. (Extended)","The particles collide with the walls of the container (1). The many collisions exert a force on each area of the wall (1).",2],
["A balloon gets bigger when it is warmed. Explain why, using the idea of particles. (Extended)","The particles gain energy and move faster (1), spread out and collide with the balloon wall harder and more often, pushing it outwards (1).",2],
["Explain why a hot-air balloon rises. (Extended)","Heating the air makes it expand (1), so its density falls and it floats up in the colder, denser air (1).",2],
["State why a bicycle pump becomes harder to push when the air is squeezed.","Reducing the volume increases the pressure (1).",1]],
[M("What causes the pressure of a gas in a container?",["Particles attracting each other","Particles colliding with the container walls","Particles sticking to the walls","Particles becoming heavier"],1,"Collisions with the walls create the pressure."),
M("A gas in a rigid container is heated. Its pressure increases because the particles",["get bigger","move faster and hit the walls harder and more often","become heavier","stop moving"],1,"Faster particles collide with the walls more often and with more force."),
M("What happens when a fixed amount of gas is compressed at constant temperature?",["Pressure falls","Pressure rises","The particles get smaller","The particles stop moving"],1,"The same particles in a smaller space collide more often."),
M("Which word should be used for particles when a gas is heated?",["expand","spread out","grow","melt"],1,"Particles spread out. The material expands."),
T("What name is given to the force of a gas on each unit area of its container?",["pressure"],"Pressure."),
M("Why does a hot-air balloon float?",["The hot air is denser","The hot air is less dense than the cooler air outside","The hot air is heavier","The balloon cools down"],1,"Heated air expands and its density falls.")],
[["What causes gas pressure?","Particles colliding with the walls of the container."],
["Heating a gas in a flexible container","Particles move faster and spread out, so the volume increases."],
["Compressing a gas","Same particles in a smaller volume: more frequent collisions, so pressure increases."],
["Why does a hot-air balloon rise?","The air expands when heated, so its density falls."],
["Particles or material: expand?","The material expands; the particles spread out."],
["What can happen if a gas container is overheated?","The pressure becomes too high and the container may leak or burst."],
["Why can a bicycle pump inflate a tyre?","Compression gives high pressure that pushes air into the tyre."],
["Number of particles when volume changes at fixed amount","It stays the same; only the number per unit volume changes."]]),

L("Diffusion","How particles spread out by random motion, and why lighter gases diffuse faster.",
`<h4>What is diffusion?</h4>
<p><b>Diffusion</b> is the movement of particles from a region of <b>higher concentration</b> to a region of <b>lower concentration</b>. It happens because particles move randomly. Eventually the particles are spread evenly through the available space.</p>
<ul><li>It happens in gases and liquids, because their particles move.</li><li>It needs no energy input and no stirring.</li><li>It happens faster when the temperature is higher, because the particles have more kinetic energy.</li></ul>
<h4>Diffusion in liquids</h4>
<p>A crystal of potassium manganate(VII), KMnO~4~, placed in water slowly colours the whole liquid purple. The purple particles move from where they are crowded (near the crystal) to where there are fewer of them. After some hours the colour is the same everywhere.</p>
{{A_KMNO4}}
<h4>Diffusion in gases</h4>
<p>Diffusion is faster in gases than in liquids, because gas particles have more energy and move faster. In the bromine experiment, orange-brown bromine vapour in a lower gas jar spreads upwards into the air above. After a few minutes it is evenly spread through both jars. The air also mixes with the bromine, but you cannot see this because air is colourless.</p>
{{A_BROMINE}}
<div class="key"><b>Exam tip</b>In a diffusion answer, mention (1) areas of high and low concentration and (2) the random movement or energy of the particles.</div>
<h4>Diffusion and relative molecular mass <i>(Extended only)</i></h4>
<p>At the same temperature, lighter gas particles move faster than heavier ones. So a gas with a <b>lower relative molecular mass (M~r~)</b> diffuses faster and travels further in the same time.</p>
<h4>Ammonia and hydrogen chloride <i>(Extended only)</i></h4>
<p>Cotton wool soaked in ammonia solution is placed at one end of a glass tube, and cotton wool soaked in hydrochloric acid at the other end. The gases diffuse towards each other and react to form white solid ammonium chloride: NH~3~(g) + HCl(g) → NH~4~Cl(s).</p>
<p>Ammonia (M~r~ = 17) is lighter than hydrogen chloride (M~r~ = 36.5), so it travels faster and further. The white ring forms <b>closer to the hydrogen chloride end</b>.</p>
{{A_NH3HCL}}`,
I("Why does the smell of perfume reach the back of the room, and how could you make it arrive faster?",
`<ol><li>Write down everything you know about what happens when someone opens a bottle of perfume at the front of a room.</li><li>Draw a particle diagram showing perfume particles at the start and after two minutes.</li><li>Predict how the time changes if the room is warmer, and explain your prediction with particle ideas.</li><li>Predict whether a heavier perfume molecule or a lighter one would arrive first, and justify it.</li></ol>`,
`<p><b>Diffusion in water.</b> Add a small crystal of potassium manganate(VII) to a beaker of still water. Make a drawing every 5 minutes. Repeat in warm water to compare the speed.</p><p><b>Diffusion of ammonia and hydrogen chloride.</b> Teacher demonstration in a fume cupboard: set up the tube with cotton wool soaked in concentrated ammonia and concentrated hydrochloric acid at the two ends. Measure where the white ring forms and calculate the ratio of the distances.</p><p><b>Explain the ring.</b> Use the relative molecular masses of NH~3~ and HCl to explain why the ring is not in the middle of the tube.</p><p class="safe">Safety: ammonia and hydrochloric acid are corrosive and give off irritating fumes. Use only with teacher supervision, in a fume cupboard, with eye protection.</p>`,
["https://phet.colorado.edu/en/simulations/diffusion","PhET: Diffusion simulation"]),
[["Define diffusion.","The net movement of particles from a region of higher concentration (1) to a region of lower concentration, due to random motion (1).",2],
["Explain why diffusion is faster in gases than in liquids.","Gas particles have more energy and move faster than liquid particles (1), and there is more space between them (1).",2],
["State and explain the effect of increasing the temperature on the rate of diffusion.","It increases (1) because the particles have more kinetic energy and move faster (1).",2],
["Ammonia (M~r~ = 17) and hydrogen chloride (M~r~ = 36.5) diffuse along a tube. Explain why the white ring of ammonium chloride forms closer to the hydrogen chloride end. (Extended)","Ammonia has a lower relative molecular mass (1), so its particles move faster and travel further in the same time (1).",2],
["Suggest why the colour of KMnO~4~ in water spreads without stirring.","The particles are moving randomly all the time (1) and spread from high to low concentration (1).",2]],
[M("Diffusion is the movement of particles from",["low to high concentration","high to low concentration","cold to hot","solid to liquid"],1,"Particles spread from high concentration to low concentration."),
M("Which gas diffuses fastest at the same temperature?",["Chlorine (M~r~ 71)","Oxygen (M~r~ 32)","Methane (M~r~ 16)","Carbon dioxide (M~r~ 44)"],2,"The gas with the lowest M~r~ diffuses fastest."),
M("Why does diffusion happen faster at higher temperatures?",["Particles are heavier","Particles have more energy and move faster","There are more particles","The particles are bigger"],1,"More kinetic energy means faster movement."),
T("What colour is bromine gas?",["orange","brown","red"],"Orange-brown."),
M("Diffusion in solids is almost impossible because",["the particles are heavy","the particles only vibrate in fixed positions","solids have no particles","solids are cold"],1,"Solid particles cannot move around."),
M("In the ammonia and hydrogen chloride experiment, the white ring forms",["in the middle of the tube","closer to the ammonia end","closer to the hydrogen chloride end","at both ends"],2,"Ammonia travels faster and further, so they meet nearer the HCl end.")],
[["Define diffusion","Net movement of particles from high concentration to low concentration, by random motion."],
["Does diffusion need energy input?","No. The particles are already moving."],
["Which diffuses faster, a gas or a liquid?","A gas. Its particles have more energy."],
["How does temperature affect diffusion?","Higher temperature gives faster diffusion."],
["How does M~r~ affect diffusion? (Extended)","Lower M~r~ means faster diffusion."],
["Ammonia and HCl: where is the ring? (Extended)","Closer to the HCl end, because HCl particles are heavier and slower."],
["Equation for the white ring (Extended)","NH~3~(g) + HCl(g) → NH~4~Cl(s)"],
["Two ideas to include in a diffusion answer","High and low concentration, and the random movement or energy of the particles."]])
];
SETL(1,t1);
})();

/* ===== Topic 2 figures: giant structures ===== */
(function(){
const {fig,txt,arrowDef}=globalThis.A_H;
const C="stroke=\"currentColor\"";
const atom=(x,y,r,fill,label,lc)=>`<circle cx="${x}" cy="${y}" r="${r}" style="fill:${fill}" stroke="currentColor" stroke-opacity=".6"/>${label?txt(x,y+4,label,{a:"middle",s:r>9?12:10,b:1,f:lc||"#fff"}):""}`;
const bond=(a,b,w,dash)=>`<path d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}" ${C} stroke-width="${w||2.4}"${dash?' stroke-dasharray="5 4" stroke-opacity=".55"':""}/>`;
FIGS.A_DIAMOND=()=>{
  const c=[170,104],n=[[170,36],[96,150],[244,150],[226,64]],o=[[[128,22],[210,16]],[[44,134],[72,196]],[[270,196],[300,128]],[[290,38],[266,22]]];
  let s=bond(c,n[3],2.4,true)+n.slice(0,3).map(p=>bond(c,p)).join("")+bond(n[3],c,2.4,true);
  n.forEach((p,i)=>o[i].forEach(q=>{s+=bond(p,q,2,true)+`<circle cx="${q[0]}" cy="${q[1]}" r="5" style="fill:var(--accent)" fill-opacity=".45"/>`}));
  s+=n.map(p=>atom(p[0],p[1],11,"var(--accent)","C")).join("")+atom(c[0],c[1],13,"var(--bad)","C");
  s+=txt(170,222,"Red carbon: bonded to four others (tetrahedral)",{a:"middle",s:11});
  return fig("0 0 340 232",s,"Diamond: every carbon atom forms four strong covalent bonds in a rigid 3D network.","Diamond structure","A central carbon atom joined to four carbon atoms in a tetrahedral arrangement, with further bonds continuing outwards",420);
};
FIGS.A_GRAPHITE=()=>{
  const r=22,hexv=(cx,cy)=>[0,1,2,3,4,5].map(k=>{const a=(30+60*k)*Math.PI/180;return[cx+r*Math.cos(a),cy+r*Math.sin(a)]});
  const w=r*Math.sqrt(3),cent=[];for(let i=0;i<3;i++)cent.push([30+i*w,30]);for(let i=0;i<2;i++)cent.push([30+w/2+i*w,30+1.5*r]);
  const layer=(ty)=>{let g=`<g transform="matrix(1 0 .7 .55 20 ${ty})" fill="none">`;
    cent.forEach(c=>{const v=hexv(c[0],c[1]);g+=`<path d="M${v.map(p=>p[0].toFixed(1)+" "+p[1].toFixed(1)).join("L")}Z" stroke="currentColor" stroke-width="1.8" vector-effect="non-scaling-stroke"/>`;v.forEach(p=>{g+=`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.6" style="fill:var(--accent)" stroke="none"/>`})});return g+"</g>"};
  let s=layer(150)+layer(20);
  [[110,120],[160,110],[210,120],[140,100]].forEach(p=>{s+=`<path d="M${p[0]} ${p[1]-2}V${p[1]+50}" ${C} stroke-width="1.4" stroke-dasharray="4 4" stroke-opacity=".7"/>`});
  [[90,118],[125,134],[165,126],[200,138],[230,122],[150,150],[110,150],[185,112]].forEach(p=>{s+=`<circle cx="${p[0]}" cy="${p[1]}" r="3.4" style="fill:var(--bad)"/>`});
  s+=txt(296,60,"Strong covalent bonds",{s:12,b:1})+txt(296,76,"inside each layer",{s:12})+txt(296,126,"Weak forces between",{s:12,b:1})+txt(296,142,"the layers (dashed)",{s:12})+txt(296,182,"Red dots: delocalised",{s:12,f:"var(--bad)"})+txt(296,198,"electrons",{s:12,f:"var(--bad)"});
  return fig("0 0 460 250",s,"Graphite: layers of carbon hexagons. Each carbon has three bonds, so one electron per atom is delocalised.","Graphite structure","Two layers of hexagonal carbon rings, with weak forces between the layers and delocalised electrons between them",540);
};
FIGS.A_SIO2=()=>{
  const si=[[150,86],[60,156],[240,156]],o=[[150,34],[104,120],[196,120],[104,170]];
  let s="";
  const link=(a,b)=>{s+=bond(a,b,2.2)};
  const Oc=[[105,121],[195,121],[150,36],[150,136],[60,100],[240,100],[60,206],[240,206]];
  link(si[0],[105,121]);link(si[0],[195,121]);link(si[0],[150,36]);link(si[0],[150,136]);
  link([105,121],si[1]);link([195,121],si[2]);link([150,36],[150,8]);link([150,136],[150,176]);
  link(si[1],[60,100]);link(si[1],[60,206]);link(si[1],[22,156]);link(si[2],[240,100]);link(si[2],[240,206]);link(si[2],[278,156]);
  s+=[[105,121],[195,121],[150,36],[150,136]].map(p=>atom(p[0],p[1],9,"var(--bad)","O")).join("");
  s+=[[60,100],[60,206],[240,100],[240,206]].map(p=>atom(p[0],p[1],8,"var(--bad)","O")).join("");
  s+=si.map((p,i)=>atom(p[0],p[1],i?12:14,"var(--accent)","Si")).join("");
  s+=txt(150,232,"Each Si is bonded to 4 O. Each O is bonded to 2 Si.",{a:"middle",s:11});
  return fig("0 0 300 240",s,"Silicon(IV) oxide: a giant covalent lattice with the formula SiO₂ (one Si for every two O atoms).","Silicon(IV) oxide structure","A silicon atom bonded to four oxygen atoms, each oxygen shared with another silicon, in a continuing network",400);
};
const ionGrid=(x0,y0,rows,cols,dx,dy,off)=>{let s="";for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const x=x0+c*dx+(off&&off[r]||0),y=y0+r*dy;s+=`<circle cx="${x}" cy="${y}" r="13" style="fill:var(--accent)"/>${txt(x,y+4.5,"+",{a:"middle",s:14,b:1,f:"var(--accent-ink)"})}`}return s};
FIGS.A_METAL=()=>{
  let s=`<rect x="14" y="14" width="292" height="142" rx="8" fill="none" ${C} stroke-opacity=".3"/>`;
  const dots=[];for(let c=0;c<4;c++){for(let r=0;r<2;r++)dots.push([73+54*c,62+44*r]);}[[73,40],[181,40],[127,84],[235,84],[73,128],[235,128]].forEach(p=>dots.push(p));
  s+=ionGrid(46,40,3,5,54,44);
  s+=dots.map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="3.2" style="fill:var(--bad)"/>`).join("");
  s+=txt(160,176,"Blue-green: positive metal ions in a regular lattice",{a:"middle",s:11})+txt(160,191,"Red dots: delocalised electrons moving freely between them",{a:"middle",s:11});
  return fig("0 0 320 200",s,"A metal: a lattice of positive ions held together by a sea of delocalised electrons.","Metallic bonding","A regular lattice of positive ions with small negative electrons moving between them",460);
};
FIGS.A_SLIDE=()=>{
  const half=(x0,off,lab)=>`<rect x="${x0}" y="10" width="178" height="124" rx="8" fill="none" ${C} stroke-opacity=".3"/>`+ionGrid(x0+22,38,3,4,40,38,[0,off,0])+txt(x0+89,152,lab,{a:"middle",s:12,b:1});
  const s=`<defs>${arrowDef("sl","var(--bad)")}</defs>${half(6,0,"Before: layers lined up")}${half(236,14,"After force: a layer slid")}<path d="M196 74H228" stroke="var(--bad)" stroke-width="2.6" marker-end="url(#sl)"/>${txt(212,64,"force",{a:"middle",s:11,f:"var(--bad)"})}${txt(210,184,"The electron sea still holds the ions together.",{a:"middle",s:11})}`;
  return fig("0 0 420 192",s,"Malleable and ductile: layers of ions slide over each other without the metal breaking.","Why metals can be shaped","Two grids of positive ions; in the second one a middle layer has slid sideways by half an ion",540);
};
})();

/* ===== Topic 2: giant structures and metals (own wording) ===== */
(function(){
const t2=[
L("Giant covalent structures","Diamond, graphite and silicon(IV) oxide: how a network of covalent bonds explains hardness, conduction and high melting points.",
`<h4>What is a giant covalent structure?</h4>
<p>In a simple molecule a handful of atoms share electrons and then stop. In a <b>giant covalent structure</b> the sharing carries on in every direction, so a whole crystal is one enormous network of atoms joined by <b>strong covalent bonds</b>. Another name is a <b>macromolecule</b>.</p>
<p>The same element can build different structures. Different forms of one element in the same state are called <b>allotropes</b>. Carbon has two important giant allotropes: <b>diamond</b> and <b>graphite</b>. Both are made only of carbon atoms, yet they behave very differently because the atoms are joined up differently.</p>
<div class="key"><b>Exam tip</b>Giant covalent substances are <i>not</i> made of small molecules. Do not write about "molecules" or "intermolecular forces" for diamond.</div>
<h4>Diamond</h4>
<p>Every carbon atom in diamond forms <b>four</b> covalent bonds to four other carbon atoms. The four neighbours sit at the corners of a tetrahedron, and the pattern repeats through the whole crystal.</p>
{{A_DIAMOND}}
<ul><li>All the outer electrons are used in bonds, so there are <b>no free electrons</b>. Diamond does <b>not conduct</b> electricity.</li><li>Many strong bonds have to be broken to melt it, so the melting point is <b>very high</b> (above 3500 °C).</li><li>The rigid network resists scratching, so diamond is <b>extremely hard</b>.</li></ul>
<h4>Graphite</h4>
<p>Each carbon atom in graphite forms only <b>three</b> covalent bonds. The atoms form flat sheets of joined hexagons. The sheets are stacked on top of each other with only <b>weak forces</b> between them.</p>
{{A_GRAPHITE}}
<p>The fourth outer electron on every carbon atom is not used in a bond. These electrons are <b>delocalised</b>, which means they can drift along the layers. This is why graphite <b>conducts electricity</b>, unusual for a non-metal. The weak forces between layers let them <b>slide</b>, so graphite is soft and slippery.</p>
<h4>Properties and uses compared</h4>
<table><tr><th></th><th>Diamond</th><th>Graphite</th></tr><tr><td>Bonds per carbon</td><td>4</td><td>3</td></tr><tr><td>Structure</td><td>3D rigid network</td><td>Layers of hexagons</td></tr><tr><td>Hardness</td><td>Extremely hard</td><td>Soft, layers slide</td></tr><tr><td>Conducts electricity?</td><td>No</td><td>Yes, along the layers</td></tr><tr><td>Uses</td><td>Cutting and drilling tools, jewellery</td><td>Pencil leads, lubricant, electrodes</td></tr></table>
<div class="key"><b>Exam tip</b>"Hard" and "strong" are not the same. Graphite layers are held by very strong bonds, yet graphite is soft because the <i>layers</i> slip. Name the weak forces between layers when you explain this.</div>
<h4>Silicon(IV) oxide <i>(Extended only)</i></h4>
<p>Silicon(IV) oxide, SiO~2~, is the main substance in sand and quartz. Its structure copies diamond, but with two elements. Each silicon atom is bonded to <b>four</b> oxygen atoms, and each oxygen atom is bonded to <b>two</b> silicon atoms. That is why the formula works out as SiO~2~.</p>
{{A_SIO2}}
<p>Like diamond it is hard, has a very high melting point (about 1700 °C) and does not conduct, because every electron is held in a bond.</p>
<h4>Linking structure to properties <i>(Extended only)</i></h4>
<p>For any explanation question, work through three steps: name the structure, name the particles or forces involved, then state the effect. A full-mark answer for diamond reads: "Diamond has a giant covalent structure. Each carbon forms four strong covalent bonds, so a large amount of energy is needed to break them. This gives a very high melting point."</p>
<div class="ex"><b>Worked example</b>Explain why graphite conducts but diamond does not.<br>Graphite: each carbon uses three outer electrons in bonds, leaving one <b>delocalised electron</b> free to move between layers and carry charge.<br>Diamond: all four outer electrons are in bonds, so no electrons are free to move.</div>`,
I("Two forms of carbon, one is a gem and the other writes on paper. What is going on?",
`<p>Use the table of properties as evidence.</p><ol><li>List two ways in which diamond and graphite are alike and two ways in which they differ.</li><li>Predict, using the number of bonds each carbon makes, why one conducts and the other does not.</li><li>Explain why you could not use graphite as a drill tip even though its bonds are strong.</li></ol>`,
`<p><b>Build the networks.</b> Using marshmallows (or plasticine balls) and cocktail sticks, build a section of diamond so that each atom has four sticks. Then build a layer of graphite hexagons with three sticks per atom and stack two layers loosely.</p><p><b>Feel the difference.</b> Slide the two graphite layers across one another, then try to shear the diamond model. Record which one gives way and what that tells you about the forces involved.</p><p><b>Test conduction.</b> Connect a pencil lead (graphite) into a simple circuit with a battery and bulb. Predict first, then watch the bulb.</p><p class="safe">Safety: use low-voltage cells only. Cocktail sticks are sharp, so take care.</p>`,
null),
[["State what is meant by the term allotrope.","Different forms (1) of the same element in the same physical state (1).",2],
["Describe the structure of diamond.","Each carbon atom is bonded to four other carbon atoms (1) by strong covalent bonds (1) in a giant 3D network / tetrahedral arrangement (1).",3],
["Explain why diamond has a very high melting point.","It has a giant covalent structure (1) with many strong covalent bonds (1) that need a large amount of energy to break (1).",3],
["Explain why graphite is used as a lubricant.","Graphite has layers of carbon atoms (1) held together by weak forces (1) so the layers slide over each other easily (1).",3],
["Explain why graphite conducts electricity but diamond does not.","In graphite each carbon forms three bonds, leaving one delocalised electron (1) that can move and carry charge (1). In diamond all four outer electrons are in bonds so none are free (1).",3],
["Describe the structure of silicon(IV) oxide and explain why its formula is SiO~2~. (Extended)","Giant covalent structure like diamond (1). Each silicon is bonded to four oxygen atoms and each oxygen to two silicon atoms (1), giving a 1 : 2 ratio (1).",3]],
[M("How many covalent bonds does each carbon atom form in diamond?",["2","3","4","6"],2,"Each carbon uses all four outer electrons in four bonds."),
M("Which statement about graphite is correct?",["It has no free electrons","It conducts because of delocalised electrons","It is hard because of ionic bonds","Every carbon is bonded to four others"],1,"One electron per carbon is delocalised."),
M("Different forms of the same element are called",["isotopes","allotropes","compounds","alloys"],1,"Diamond and graphite are allotropes of carbon."),
T("Name the type of structure found in diamond and silicon(IV) oxide.",["giant covalent","macromolecular","giant molecular","giant covalent structure"],"Both have a giant covalent structure."),
M("Why is diamond used on the tips of drills?",["It conducts electricity","It is extremely hard","It has layers that slide","It is a good lubricant"],1,"The rigid network of strong bonds makes it extremely hard."),
M("Why are the layers in graphite able to slide?",["Covalent bonds between layers are very weak","Forces between layers are weak","Layers are held by ionic bonds","Electrons are missing"],1,"Only weak forces act between the layers."),
M("In silicon(IV) oxide, how many oxygen atoms is each silicon atom bonded to?",["1","2","3","4"],3,"Each silicon is bonded to four oxygen atoms. (Extended)"),
M("Which substance does NOT contain small molecules?",["Water","Carbon dioxide","Diamond","Methane"],2,"Diamond is a giant structure.")],
[["Giant covalent structure","A huge network of atoms joined by strong covalent bonds."],
["Allotropes","Different forms of the same element in the same state, e.g. diamond and graphite."],
["Why is diamond hard?","Each carbon has four strong bonds in a rigid 3D network."],
["Why does graphite conduct?","One delocalised electron per carbon moves along the layers."],
["Why is graphite slippery?","Weak forces between layers let them slide."],
["Bonds per carbon in diamond / graphite","4 / 3."],
["Structure of SiO~2~ (Extended)","Like diamond: each Si bonded to four O, each O to two Si."],
["Uses of graphite","Pencil leads, lubricant, electrodes."]]),

L("Metallic bonding and comparing structures","The sea of electrons, why metals conduct and bend, and a side-by-side summary of all four structure types.",
`<h4>Metals in a nutshell</h4>
<p>Metals share a set of physical properties: they conduct heat and electricity, they are <b>malleable</b> (can be hammered into shape) and <b>ductile</b> (can be drawn into wires), they are usually shiny, strong and have high melting points. A pure metal is soft compared to an <b>alloy</b>, which is a mixture of a metal with one or more other elements. The next sections explain why metals behave this way.</p>
<h4>The metallic bond <i>(Extended only)</i></h4>
<p>A metal atom has few outer electrons and holds them loosely. In a solid metal the atoms let these electrons go. The result is a regular lattice of <b>positive metal ions</b> surrounded by a <b>sea of delocalised electrons</b> that move freely through the whole structure.</p>
{{A_METAL}}
<p>The <b>metallic bond</b> is the strong electrostatic attraction between the positive ions and the delocalised electrons.</p>
<div class="key"><b>Exam tip</b>The moving charge carriers in a metal are <b>electrons</b>, not ions. In an ionic compound it is the other way round: the ions move when molten or dissolved.</div>
<h4>Explaining the properties <i>(Extended only)</i></h4>
<ul><li><b>Electrical conductivity:</b> the free electrons flow through the metal and carry charge.</li><li><b>Thermal conductivity:</b> the free electrons pass energy quickly from one part of the metal to another.</li><li><b>High melting point:</b> the attraction between ions and electrons is strong, so a lot of energy is needed to separate them. Melting points are generally high, but they vary with the metal.</li></ul>
<h4>Why metals bend instead of shattering</h4>
<p>When a force pushes on a metal, whole layers of ions can <b>slide</b> over one another. The electron sea moves with them and keeps holding the ions together, so the bond is never lost and the metal changes shape without breaking.</p>
{{A_SLIDE}}
<p>An ionic crystal behaves differently. If a layer shifts, ions of the same charge end up side by side, they repel, and the crystal splits. Ionic solids are <b>brittle</b>.</p>
<h4>Alloys are harder than pure metals</h4>
<p>In an alloy, atoms of other elements (with different sizes) sit among the metal atoms. They break up the regular layers, so the layers can no longer slide so easily. The alloy is therefore <b>harder and stronger</b> than the pure metal. Steel, an alloy of iron with a little carbon, is a good example.</p>
<h4>The four structures compared</h4>
<table><tr><th>Structure</th><th>Examples</th><th>Melting point</th><th>Conducts electricity?</th><th>Reason</th></tr>
<tr><td>Giant ionic</td><td>NaCl, MgO</td><td>High</td><td>Only when molten or dissolved</td><td>Strong attraction between oppositely charged ions; ions free to move only in liquid or solution</td></tr>
<tr><td>Simple molecular</td><td>H~2~O, CO~2~, CH~4~, I~2~</td><td>Low</td><td>No</td><td>Weak forces between molecules are overcome; no ions or free electrons</td></tr>
<tr><td>Giant covalent</td><td>Diamond, graphite, SiO~2~</td><td>Very high</td><td>Graphite only</td><td>Many strong covalent bonds; graphite has delocalised electrons</td></tr>
<tr><td>Metallic</td><td>Cu, Fe, Mg</td><td>Usually high</td><td>Yes (solid and liquid)</td><td>Sea of delocalised electrons</td></tr></table>
<div class="ex"><b>Worked example</b>Substance P melts at 1085 °C, conducts as a solid and as a liquid, and does not dissolve in water. The solid conducts, so it has free electrons: it is <b>metallic</b>. If it were ionic it would only conduct once molten.</div>`,
I("Can you identify a structure type from test results alone?",
`<p>Four unknown substances were tested. Decide the structure of each and justify it with the evidence.</p><div class="tw"><table><tr><th></th><th>Melting point</th><th>Solid conducts?</th><th>Molten conducts?</th><th>Soluble in water?</th></tr><tr><td>A</td><td>801 °C</td><td>No</td><td>Yes</td><td>Yes</td></tr><tr><td>B</td><td>1085 °C</td><td>Yes</td><td>Yes</td><td>No</td></tr><tr><td>C</td><td>113 °C</td><td>No</td><td>No</td><td>No</td></tr><tr><td>D</td><td>3550 °C</td><td>No</td><td>Does not melt easily</td><td>No</td></tr></table></div><ol><li>Name the structure of each substance.</li><li>Give the single piece of evidence that decided each one.</li><li>Suggest one real substance that could match each.</li></ol>`,
`<p><b>Conductivity tester.</b> Build a simple circuit (battery, bulb, two electrodes). Test salt crystals, sugar crystals, a pencil lead, a copper wire and salt solution. Predict first, then record whether the bulb lights, and sort the results by structure type.</p><p><b>Bend or break?</b> Try bending a thin copper wire and then gently pressing a salt crystal between two spatulas. Describe each result and link it to ions sliding or repelling.</p><p class="safe">Safety: low-voltage battery only. Wear eye protection when crushing crystals.</p>`,
null),
[["Describe the bonding in a metal.","Positive metal ions in a lattice (1) surrounded by delocalised electrons (1); strong electrostatic attraction between them (1).",3],
["Explain why metals conduct electricity. (Extended)","They contain delocalised electrons (1) that are free to move through the structure and carry charge (1).",2],
["Explain why metals can be hammered into shape without breaking.","Layers of positive ions can slide over each other (1) while the electron sea keeps holding them together (1).",2],
["Explain why an alloy is harder than a pure metal.","Atoms of different sizes are present (1) which disrupt the regular layers so they cannot slide easily (1).",2],
["Compare the electrical conductivity of sodium chloride and copper, in the solid state and when molten.","Copper conducts in both states because of delocalised electrons (1). Sodium chloride does not conduct as a solid because the ions cannot move (1) but conducts when molten because the ions are free to move (1).",3],
["Explain why simple molecular substances have low melting points.","Weak forces between molecules (1) are overcome; covalent bonds do not break (1).",2]],
[M("Which particles carry charge in a metal?",["Positive ions","Negative ions","Delocalised electrons","Neutrons"],2,"Free electrons carry the charge."),
M("Which conducts when molten but not when solid?",["Copper","Sodium chloride","Diamond","Iodine"],1,"Ions are free to move only when molten."),
M("Why are alloys harder than pure metals?",["They contain more electrons","Different-sized atoms stop layers sliding","They have ionic bonds","They have weak forces"],1,"The regular layers are disrupted."),
M("Which substance has simple covalent molecules?",["Sodium chloride","Magnesium","Carbon dioxide","Silicon(IV) oxide"],2,"CO~2~ is made of small molecules."),
T("What word describes a metal that can be hammered into sheets?",["malleable"],"Malleable."),
M("A solid does not conduct, melts at 3550 °C and does not dissolve. It is most likely",["ionic","metallic","simple molecular","giant covalent"],3,"Very high melting point and no conduction point to a giant covalent structure."),
M("Why is an ionic crystal brittle?",["Layers slide easily","Like ions line up and repel when layers shift","The electrons escape","It has weak bonds inside"],1,"Shifted layers put like charges next to each other."),
M("What is the metallic bond?",["Shared pair of electrons","Attraction between positive ions and delocalised electrons","Attraction between molecules","Transfer of electrons"],1,"Electrostatic attraction between ions and the electron sea.")],
[["Metallic bond","Attraction between positive metal ions and delocalised electrons."],
["Why do metals conduct?","Delocalised electrons are free to move and carry charge."],
["Malleable","Can be hammered into shape."],
["Ductile","Can be drawn into wires."],
["Alloy","A mixture of a metal with other elements."],
["Why are alloys harder?","Different-sized atoms disrupt layers so they cannot slide."],
["Brittle","Shatters when hit. Ionic crystals are brittle."],
["Which structure conducts when molten but not solid?","Giant ionic."]])
];
SETL(2,["Atomic structure and isotopes","Ions and ionic bonding","Simple molecules and covalent bonds",...t2]);
})();

/* ===== Topic 3 figure + lessons 1-2 (own wording) ===== */
(function(){
const {fig,txt}=globalThis.A_H;
const AC='style="stroke:currentColor;fill:none"';
const tri=(x,y,top,bl,br,col)=>{
  let s=`<path d="M${x} ${y+90}L${x+55} ${y}L${x+110} ${y+90}Z" ${AC} stroke-width="2.2"/><path d="M${x+27} ${y+45}H${x+83}" ${AC} stroke-width="2"/><path d="M${x+55} ${y+45}V${y+90}" ${AC} stroke-width="2"/>`;
  s+=txt(x+55,y-3,top,{a:"middle",s:13,b:1,f:col});
  s+=txt(x+34,y+75,bl,{a:"middle",s:13,b:1})+txt(x+78,y+75,br,{a:"middle",s:13,b:1});
  return s;
};
FIGS.A_MOLETRI=()=>fig("0 0 500 160",
  tri(20,12,"mass","moles","Mr","var(--accent)")+txt(75,138,"mass = moles × Mr",{a:"middle",s:11})+
  tri(190,12,"volume","moles","24","var(--accent)")+txt(245,138,"volume (dm³) = moles × 24",{a:"middle",s:11})+
  tri(360,12,"moles","conc","vol","var(--accent)")+txt(415,138,"moles = conc × volume (dm³)",{a:"middle",s:11}),
  "Cover the quantity you want. If the two left in the bottom row are side by side, multiply; if one is above the other, divide.","Three formula triangles",
  "Formula triangles linking mass, moles and Mr, gas volume and moles, and concentration, moles and volume",560);

const t3=[
L("The mole and the Avogadro constant","What a mole is, how to find molar mass, and how to move between mass, moles and number of particles.",
`<h4>Counting atoms by weighing</h4>
<p>Atoms are far too small to count one by one, so chemists count them in huge batches. One batch is called a <b>mole</b> (symbol <b>mol</b>). A mole of any substance contains <b>6.02 × 10^23^</b> particles. This number is the <b>Avogadro constant</b>.</p>
<p>The particles can be atoms, molecules, ions or formula units, so always say which you mean.</p>
<ul><li>1 mol of sodium, Na, holds 6.02 × 10^23^ <b>atoms</b>.</li><li>1 mol of hydrogen, H~2~, holds 6.02 × 10^23^ <b>molecules</b> (that is 2 × 6.02 × 10^23^ atoms).</li><li>1 mol of sodium chloride, NaCl, holds 6.02 × 10^23^ <b>formula units</b>.</li></ul>
<div class="key"><b>Exam tip</b>You do not have to remember the Avogadro constant, but you must know that it is the number of particles in one mole and be able to use it.</div>
<h4>Molar mass: the link to the balance</h4>
<p>The <b>molar mass</b> is the mass of one mole, in g/mol. It is the same number as the relative atomic mass (for an element) or the relative formula mass M~r~ (for a compound). Weigh out the molar mass of any substance and you have exactly one mole of it.</p>
<table><tr><th>Substance</th><th>Working</th><th>Molar mass</th></tr><tr><td>Mg</td><td>A~r~</td><td>24 g/mol</td></tr><tr><td>H~2~O</td><td>2 × 1 + 16</td><td>18 g/mol</td></tr><tr><td>CO~2~</td><td>12 + 2 × 16</td><td>44 g/mol</td></tr><tr><td>CaCO~3~</td><td>40 + 12 + 3 × 16</td><td>100 g/mol</td></tr><tr><td>Al~2~O~3~</td><td>2 × 27 + 3 × 16</td><td>102 g/mol</td></tr></table>
<h4>Moles, mass and M~r~</h4>
<p>Moles, mass and molar mass are tied together by one equation. Rearrange it for whatever is missing.</p>
<div class="key"><b>Key equation</b>moles = mass (g) ÷ M~r~<br>mass (g) = moles × M~r~<br>M~r~ = mass (g) ÷ moles</div>
{{A_MOLETRI}}
<div class="ex"><b>Worked example</b>(a) Mass of 0.40 mol of magnesium: 0.40 × 24 = <b>9.6 g</b>.<br>(b) Moles in 5.3 g of sodium carbonate, Na~2~CO~3~ (M~r~ = 106): 5.3 ÷ 106 = <b>0.050 mol</b>.<br>(c) Mass of 2.5 mol of sulfuric acid, H~2~SO~4~ (M~r~ = 98): 2.5 × 98 = <b>245 g</b>.</div>
<h4>From moles to number of particles</h4>
<p>To count particles, multiply the number of moles by the Avogadro constant. To count a particular kind of atom or ion, first multiply by how many of them there are in one formula.</p>
<div class="key"><b>Key equation</b>number of particles = moles × 6.02 × 10^23^</div>
<div class="ex"><b>Worked example</b>How many oxide ions are in 0.20 mol of aluminium oxide, Al~2~O~3~?<br>Each formula unit contains 3 oxide ions, so moles of O^2−^ = 0.20 × 3 = 0.60 mol.<br>Number = 0.60 × 6.02 × 10^23^ = <b>3.6 × 10^23^</b> ions.</div>
<div class="ex"><b>Worked example</b>How many atoms are in 9.0 g of water (M~r~ = 18)?<br>Moles = 9.0 ÷ 18 = 0.50 mol. Molecules = 0.50 × 6.02 × 10^23^ = 3.01 × 10^23^.<br>Each molecule has 3 atoms, so atoms = 3 × 3.01 × 10^23^ = <b>9.0 × 10^23^</b>.</div>
<h4>A routine for any mole question</h4>
<ol><li>Write down what you are given and what you must find.</li><li>Work out the M~r~ if a mass is involved.</li><li>Turn the given quantity into <b>moles</b>. Moles are the central currency.</li><li>Convert moles into the quantity asked for.</li><li>Check units and give a sensible number of significant figures.</li></ol>
<div class="key"><b>Exam tip</b>Show every step. If the final number is wrong, working can still earn marks.</div>`,
I("Could you hold a mole in your hands?",
`<p>Think about how a mole links the invisible to the visible.</p><ol><li>Calculate the M~r~ of water, sodium chloride, sucrose (C~12~H~22~O~11~) and sodium hydrogencarbonate (NaHCO~3~).</li><li>Find the mass of 0.10 mol of each.</li><li>Predict which sample will look largest and which smallest, and explain why equal numbers of particles can have very different masses.</li></ol>`,
`<p><b>Mole display.</b> Weigh 0.10 mol of each substance: water 1.8 g, salt 5.85 g, sucrose 34.2 g and baking soda 8.4 g. Place each in a labelled cup and photograph the line-up.</p><p><b>Compare.</b> Record the mass and appearance of each sample. Discuss why the numbers of particles are equal while the masses and volumes are not.</p><p><b>Scale it.</b> Work out roughly how many grains of salt would be in your 0.10 mol sample if each grain holds about 10^18^ formula units.</p><p class="safe">Safety: do not taste anything used in a science practical.</p>`,
null),
[["State what is meant by one mole of a substance.","The amount of substance (1) containing 6.02 × 10^23^ particles / the Avogadro constant number of particles (1).",2],
["Calculate the mass of 0.30 mol of aluminium oxide, Al~2~O~3~.","M~r~ = 102 (1); 0.30 × 102 = 30.6 g (1).",2],
["Calculate the number of moles in 4.9 g of sulfuric acid, H~2~SO~4~.","M~r~ = 98 (1); 4.9 ÷ 98 = 0.050 mol (1).",2],
["Calculate the number of molecules in 0.25 mol of carbon dioxide.","0.25 × 6.02 × 10^23^ (1) = 1.5 × 10^23^ (1).",2],
["Calculate the number of hydrogen atoms in 0.10 mol of ammonia, NH~3~.","Each molecule has 3 H atoms so 0.30 mol of H atoms (1); 0.30 × 6.02 × 10^23^ (1) = 1.8 × 10^23^ (1).",3],
["Calculate the mass of 3.01 × 10^23^ molecules of oxygen, O~2~.","Moles = 3.01 × 10^23^ ÷ 6.02 × 10^23^ = 0.50 mol (1); M~r~ = 32 (1); mass = 16 g (1).",3]],
[N("How many moles are in 49 g of sulfuric acid (M~r~ = 98)?",0.5,"mol","49 ÷ 98 = 0.5."),
N("What is the mass of 0.50 mol of sodium hydroxide, NaOH (M~r~ = 40)?",20,"g","0.50 × 40 = 20 g."),
M("Which sample contains the most particles?",["1 mol of hydrogen molecules","1 mol of carbon dioxide molecules","1 mol of sodium atoms","They all contain the same number"],3,"One mole of any substance has the same number of particles."),
M("What is the M~r~ of calcium hydroxide, Ca(OH)~2~?",["57","58","74","114"],2,"40 + 2 × (16 + 1) = 74."),
N("How many moles of oxygen atoms are in 2 mol of carbon dioxide?",4,"mol","Each CO~2~ has 2 O atoms."),
T("What is the name given to the number 6.02 × 10^23^?",["avogadro","avogadro constant","avogadro's constant","avogadro number"],"The Avogadro constant."),
N("What is the mass of 0.20 mol of calcium carbonate (M~r~ = 100)?",20,"g","0.20 × 100 = 20 g."),
M("What is the mass of one mole of water molecules?",["2 g","16 g","18 g","6.02 g"],2,"2 × 1 + 16 = 18 g.")],
[["Mole","The amount of substance containing 6.02 × 10^23^ particles."],
["Avogadro constant","6.02 × 10^23^ particles per mole."],
["Molar mass","Mass of one mole in g/mol, equal in number to A~r~ or M~r~."],
["moles formula","moles = mass ÷ M~r~"],
["mass formula","mass = moles × M~r~"],
["particles formula","particles = moles × 6.02 × 10^23^"],
["Particles in one formula unit","Count them first: moles of ions = moles of compound × ions per formula."],
["Why show working?","Method marks are awarded even if the final answer is wrong."]]),

L("Gas volumes, reacting masses and limiting reactants","Molar gas volume, using equations to find masses and volumes, and deciding which reactant runs out first.",
`<h4>Equal moles, equal volumes</h4>
<p><b>Avogadro's law</b> says that equal volumes of different gases, measured at the same temperature and pressure, contain the same number of molecules. So one mole of hydrogen takes up exactly the same space as one mole of methane or carbon dioxide.</p>
<p>At <b>room temperature and pressure (RTP)</b>, which means 20 °C and 1 atmosphere, one mole of any gas occupies <b>24 dm^3^</b>, which is <b>24 000 cm^3^</b>. This is the <b>molar gas volume</b>.</p>
<div class="key"><b>Key equation</b>volume (dm^3^) = moles × 24<br>volume (cm^3^) = moles × 24 000<br>moles of gas = volume (dm^3^) ÷ 24 &nbsp;or&nbsp; volume (cm^3^) ÷ 24 000</div>
<h4>Converting between moles, mass and volume</h4>
<div class="ex"><b>Worked example</b>What volume does 8.8 g of carbon dioxide occupy at RTP?<br>Moles = 8.8 ÷ 44 = 0.20 mol. Volume = 0.20 × 24 = <b>4.8 dm^3^</b>.</div>
<div class="ex"><b>Worked example</b>600 cm^3^ of oxygen is collected at RTP. How many moles is this?<br>Moles = 600 ÷ 24 000 = <b>0.025 mol</b>. Use 24 000 because the volume is in cm^3^.</div>
<div class="key"><b>Exam tip</b>Check the unit of volume before you divide. Using 24 with a cm^3^ value gives an answer 1000 times too big.</div>
<h4>Using an equation to find masses</h4>
<p>A balanced equation gives the <b>mole ratio</b> of the substances. The method is always the same: <b>mass → moles → (ratio) → moles → mass</b>.</p>
<div class="ex"><b>Worked example</b>2Mg + O~2~ → 2MgO. What mass of magnesium oxide forms when 3.6 g of magnesium burns?<br>Moles Mg = 3.6 ÷ 24 = 0.15. Ratio Mg : MgO = 2 : 2, so 0.15 mol MgO.<br>Mass = 0.15 × 40 = <b>6.0 g</b>.</div>
<div class="ex"><b>Worked example</b>2Al~2~O~3~ → 4Al + 3O~2~. What mass of aluminium comes from 20.4 g of aluminium oxide?<br>Moles Al~2~O~3~ = 20.4 ÷ 102 = 0.20. Ratio 2 : 4 = 1 : 2, so moles Al = 0.40.<br>Mass = 0.40 × 27 = <b>10.8 g</b>.</div>
<h4>Using an equation to find gas volumes</h4>
<div class="ex"><b>Worked example</b>CaCO~3~ + 2HCl → CaCl~2~ + H~2~O + CO~2~. What volume of carbon dioxide forms from 10 g of calcium carbonate and excess acid?<br>Moles CaCO~3~ = 10 ÷ 100 = 0.10. Ratio 1 : 1, so 0.10 mol CO~2~. Volume = 0.10 × 24 = <b>2.4 dm^3^</b>.</div>
<p>Working backwards is just as easy. To make 28 g of iron from Fe~2~O~3~ + 3CO → 2Fe + 3CO~2~: moles Fe = 28 ÷ 56 = 0.50; the ratio Fe~2~O~3~ : Fe is 1 : 2, so 0.25 mol of Fe~2~O~3~ is needed, a mass of 0.25 × 160 = <b>40 g</b>.</p>
<h4>Gas volumes straight from the equation <i>(Extended only)</i></h4>
<p>Because equal moles of gas have equal volumes, the ratio of gas <b>volumes</b> in an equation is the same as the ratio of moles, as long as all gases are measured at the same temperature and pressure. No molar volume is needed.</p>
<div class="ex"><b>Worked example</b>C~3~H~8~ + 5O~2~ → 3CO~2~ + 4H~2~O. 20 cm^3^ of propane is burned. Oxygen needed = 5 × 20 = <b>100 cm^3^</b>. Carbon dioxide formed = 3 × 20 = <b>60 cm^3^</b> (the water is a liquid at RTP, so it is not counted).</div>
<h4>Limiting reactants</h4>
<p>A reaction stops when one reactant has been completely used up. That reactant is the <b>limiting reactant</b>, and it decides how much product can form. A reactant that is left over is in <b>excess</b>.</p>
<ol><li>Convert the mass of each reactant to moles.</li><li>Use the equation ratio to find how much of one reactant the other would need.</li><li>Compare: the one with too little is limiting.</li><li>Do the product calculation from the <b>limiting</b> reactant only.</li></ol>
<div class="ex"><b>Worked example</b>1.3 g of zinc reacts with 3.65 g of hydrogen chloride. Zn + 2HCl → ZnCl~2~ + H~2~<br>Moles Zn = 1.3 ÷ 65 = 0.020. Moles HCl = 3.65 ÷ 36.5 = 0.100.<br>0.020 mol Zn needs 2 × 0.020 = 0.040 mol HCl. There is 0.100 mol, so HCl is in excess and <b>zinc is limiting</b>.<br>H~2~ formed = 0.020 mol, volume = 0.020 × 24 = <b>0.48 dm^3^</b>.</div>
<div class="key"><b>Exam tip</b>Never calculate the product from the reactant in excess. It gives an answer that is too large.</div>`,
I("If you double the reactant, do you always double the product?",
`<p>Use the Reactants, Products and Leftovers simulation (or the equation below) to explore.</p><ol><li>For 2H~2~ + O~2~ → 2H~2~O, predict the amount of water made from 4 molecules of hydrogen and 3 molecules of oxygen. Which reactant is left over, and how many molecules?</li><li>Repeat for 6 molecules of hydrogen and 3 molecules of oxygen.</li><li>State the rule that decides how much product forms.</li></ol>`,
`<p><b>Fizz and measure.</b> Add a known mass of magnesium ribbon (for example 0.12 g) to an excess of dilute hydrochloric acid in a flask connected to a gas syringe. Record the volume of hydrogen collected, then compare with your calculated value (0.12 g Mg = 0.005 mol gives 0.12 dm^3^, which is 120 cm^3^).</p><p><b>Limiting reactant.</b> Repeat using a bigger piece of magnesium with only a little acid, so the acid runs out. Explain why the volume of gas stops increasing.</p><p class="safe">Safety: wear eye protection. Hydrogen is flammable, so keep flames away.</p>`,
["https://phet.colorado.edu/en/simulations/reactants-products-and-leftovers","PhET: Reactants, Products and Leftovers simulation"]),
[["State the volume of one mole of any gas at room temperature and pressure.","24 dm^3^ (1) (or 24 000 cm^3^).",1],
["Calculate the volume of 0.30 mol of hydrogen at RTP.","0.30 × 24 (1) = 7.2 dm^3^ (1).",2],
["Calculate the number of moles in 360 cm^3^ of a gas at RTP.","360 ÷ 24 000 (1) = 0.015 mol (1).",2],
["Calculate the volume of 4.4 g of carbon dioxide at RTP.","M~r~ = 44 (1); moles = 0.10 (1); volume = 2.4 dm^3^ (1).",3],
["0.48 g of magnesium reacts with excess hydrochloric acid: Mg + 2HCl → MgCl~2~ + H~2~. Calculate the volume of hydrogen formed at RTP.","Moles Mg = 0.48 ÷ 24 = 0.020 (1); moles H~2~ = 0.020 (1); volume = 0.020 × 24 = 0.48 dm^3^ (1).",3],
["1.3 g of zinc reacts with 3.65 g of hydrogen chloride: Zn + 2HCl → ZnCl~2~ + H~2~. Show that zinc is the limiting reactant and calculate the volume of hydrogen formed.","Moles Zn = 0.020 and moles HCl = 0.100 (1); 0.020 mol Zn needs 0.040 mol HCl, so HCl is in excess (1); hydrogen = 0.020 mol (1); volume = 0.48 dm^3^ (1).",4]],
[N("What volume does 2.5 mol of a gas occupy at RTP?",60,"dm^3^","2.5 × 24 = 60."),
N("How many moles are in 120 cm^3^ of a gas at RTP?",0.005,"mol","120 ÷ 24 000 = 0.005.",0.0001),
M("Which gas takes up the largest volume at RTP (1 mol of each)?",["Hydrogen","Carbon dioxide","Chlorine","They all take up the same volume"],3,"Equal moles of any gas have equal volume."),
N("10 g of CaCO~3~ reacts with excess acid. What volume of CO~2~ forms at RTP?",2.4,"dm^3^","0.10 mol × 24 = 2.4.",0.01),
M("What mass of MgO forms when 2.4 g of magnesium burns? (2Mg + O~2~ → 2MgO)",["2.4 g","3.2 g","4.0 g","4.8 g"],2,"0.10 mol Mg gives 0.10 mol MgO = 4.0 g."),
N("What mass of aluminium forms from 20.4 g of Al~2~O~3~? (2Al~2~O~3~ → 4Al + 3O~2~)",10.8,"g","0.20 mol Al~2~O~3~ gives 0.40 mol Al = 10.8 g.",0.05),
M("0.15 mol of Mg is mixed with 0.10 mol of O~2~ (2Mg + O~2~ → 2MgO). Which is the limiting reactant?",["Mg","O~2~","Both","Neither"],0,"0.15 mol Mg needs only 0.075 mol O~2~, so O~2~ is in excess."),
T("What name is given to a reactant that is left over at the end of a reaction?",["excess","in excess"],"It is the excess reactant.")],
[["Molar gas volume at RTP","24 dm^3^ or 24 000 cm^3^ per mole."],
["RTP","Room temperature and pressure: 20 °C and 1 atmosphere."],
["Avogadro's law","Equal volumes of gases at the same temperature and pressure contain equal numbers of molecules."],
["Mole route in equation questions","mass → moles → ratio → moles → mass or volume."],
["Limiting reactant","The reactant that is used up first and decides the amount of product."],
["Excess reactant","The reactant left over when the reaction stops."],
["Gas volume ratio (Extended)","Volumes of gases in the equation are in the same ratio as the moles."],
["Which reactant do you use for the product calculation?","The limiting reactant."]])
];
globalThis.A_T3=t3;
})();

/* ===== Topic 3 lessons 3-4 and SETL ===== */
(function(){
const t3=globalThis.A_T3;
t3.push(
L("Concentration and titration calculations","Concentration in g/dm^3 and mol/dm^3, converting units, and finding unknown concentrations or volumes from titration results.",
`<h4>Solutions and concentration</h4>
<p>A <b>solute</b> dissolves in a <b>solvent</b> to make a <b>solution</b>. <b>Concentration</b> tells you how much solute is dissolved in a fixed volume of solution: the more solute per unit volume, the more concentrated the solution.</p>
<p>The usual volume unit is the <b>cubic decimetre, dm^3^</b>, which equals 1000 cm^3^ and is the same as one litre. Concentration is therefore measured in <b>g/dm^3^</b> or <b>mol/dm^3^</b>.</p>
<div class="key"><b>Unit conversion</b>cm^3^ ÷ 1000 = dm^3^<br>dm^3^ × 1000 = cm^3^</div>
<h4>Concentration in g/dm^3^</h4>
<div class="key"><b>Key equation</b>concentration (g/dm^3^) = mass of solute (g) ÷ volume (dm^3^)</div>
<div class="ex"><b>Worked example</b>8.0 g of copper(II) sulfate is dissolved to make 2.0 dm^3^ of solution. Concentration = 8.0 ÷ 2.0 = <b>4.0 g/dm^3^</b>.</div>
<h4>Concentration in mol/dm^3^ <i>(Extended only)</i></h4>
<p>Chemists prefer moles per dm^3^ because equations work in moles.</p>
<div class="key"><b>Key equation</b>concentration (mol/dm^3^) = moles ÷ volume (dm^3^)<br>moles = concentration × volume (dm^3^)</div>
<div class="ex"><b>Worked example</b>6.0 g of sodium hydroxide (M~r~ = 40) is dissolved to make 250 cm^3^ of solution.<br>Moles = 6.0 ÷ 40 = 0.15. Volume = 250 ÷ 1000 = 0.25 dm^3^.<br>Concentration = 0.15 ÷ 0.25 = <b>0.60 mol/dm^3^</b>.</div>
<div class="ex"><b>Worked example</b>How many moles are in 200 cm^3^ of a solution of concentration 0.25 mol/dm^3^?<br>Moles = 0.25 × 0.200 = <b>0.050 mol</b>.</div>
<h4>Switching between g/dm^3^ and mol/dm^3^ <i>(Extended only)</i></h4>
<p>To change g/dm^3^ into mol/dm^3^, <b>divide by M~r~</b>. To go the other way, <b>multiply by M~r~</b>.</p>
<div class="ex"><b>Worked example</b>A solution of sulfuric acid (M~r~ = 98) has a concentration of 49 g/dm^3^. In mol/dm^3^ this is 49 ÷ 98 = <b>0.50 mol/dm^3^</b>.<br>A 0.40 mol/dm^3^ solution of sodium chloride (M~r~ = 58.5) holds 0.40 × 58.5 = 23.4 g/dm^3^, so 250 cm^3^ contains 23.4 × 0.25 = <b>5.85 g</b> of NaCl.</div>
<div class="key"><b>Exam tip</b>Always convert cm^3^ to dm^3^ <i>before</i> you use a concentration equation. This is the most common lost mark in this topic.</div>
<h4>Titration calculations <i>(Extended only)</i></h4>
<p>A <b>titration</b> finds out how much of one solution reacts exactly with another. You measure the volume of the solution in the burette at the end-point (the <b>titre</b>), then use the equation to find the unknown. The steps are the same every time.</p>
<ol><li>Write the balanced equation.</li><li>Find the moles of the solution whose concentration and volume you know: <b>moles = concentration × volume (dm^3^)</b>.</li><li>Use the <b>mole ratio</b> from the equation to find moles of the other substance.</li><li>Find the unknown: concentration = moles ÷ volume, or volume = moles ÷ concentration.</li></ol>
<div class="ex"><b>Worked example (1 : 1)</b>25.0 cm^3^ of sodium hydroxide of concentration 0.080 mol/dm^3^ is neutralised by 20.0 cm^3^ of hydrochloric acid. NaOH + HCl → NaCl + H~2~O<br>Moles NaOH = 0.0250 × 0.080 = 0.00200. Ratio 1 : 1, so moles HCl = 0.00200.<br>Concentration HCl = 0.00200 ÷ 0.0200 = <b>0.10 mol/dm^3^</b>.</div>
<div class="ex"><b>Worked example (1 : 2)</b>25.0 cm^3^ of 0.10 mol/dm^3^ sodium hydroxide needs 20.0 cm^3^ of sulfuric acid. 2NaOH + H~2~SO~4~ → Na~2~SO~4~ + 2H~2~O<br>Moles NaOH = 0.0250 × 0.10 = 0.00250. The ratio NaOH : H~2~SO~4~ is 2 : 1, so moles acid = 0.00125.<br>Concentration = 0.00125 ÷ 0.0200 = <b>0.0625 mol/dm^3^</b>.</div>
<div class="ex"><b>Worked example (finding a volume)</b>What volume of 0.50 mol/dm^3^ hydrochloric acid neutralises 20.0 cm^3^ of 0.10 mol/dm^3^ calcium hydroxide? Ca(OH)~2~ + 2HCl → CaCl~2~ + 2H~2~O<br>Moles Ca(OH)~2~ = 0.0200 × 0.10 = 0.0020. Moles HCl = 2 × 0.0020 = 0.0040.<br>Volume = 0.0040 ÷ 0.50 = 0.0080 dm^3^ = <b>8.0 cm^3^</b>.</div>`,
I("How can a colour change tell you the concentration of an unknown acid?",
`<p>Plan before you measure.</p><ol><li>A student has 25.0 cm^3^ of sodium hydroxide of known concentration 0.10 mol/dm^3^. State what else must be measured to find the concentration of the acid that neutralises it.</li><li>Describe how you would know when the end-point has been reached.</li><li>Explain why repeating the titration until two titres agree improves the answer.</li></ol>`,
`<p><b>Simulate a titration.</b> Use the Molarity simulation to see how changing the amount of solute or the volume of solution changes the concentration. Record three sets of settings and check each value with the equation concentration = moles ÷ volume.</p><p><b>Practical option.</b> If a laboratory is available, titrate 25.0 cm^3^ of 0.10 mol/dm^3^ NaOH with hydrochloric acid of unknown concentration using methyl orange. Repeat until two titres agree within 0.10 cm^3^, then calculate the acid concentration.</p><p class="safe">Safety: eye protection is essential. Rinse spills with plenty of water.</p>`,
["https://phet.colorado.edu/en/simulations/molarity","PhET: Molarity simulation"]),
[["A solution contains 8 g of sodium hydroxide in 2 dm^3^ of solution. Calculate the concentration in g/dm^3^.","8 ÷ 2 (1) = 4 g/dm^3^ (1).",2],
["Calculate the number of moles of solute in 250 cm^3^ of a solution of concentration 0.40 mol/dm^3^.","250 cm^3^ = 0.25 dm^3^ (1); 0.40 × 0.25 = 0.10 mol (1).",2],
["6.0 g of sodium hydroxide, NaOH, is dissolved to make 250 cm^3^ of solution. Calculate its concentration in mol/dm^3^.","Moles = 6.0 ÷ 40 = 0.15 (1); volume = 0.25 dm^3^ (1); 0.15 ÷ 0.25 = 0.60 mol/dm^3^ (1).",3],
["A solution of sulfuric acid has a concentration of 49 g/dm^3^. Calculate the concentration in mol/dm^3^.","M~r~ = 98 (1); 49 ÷ 98 = 0.50 mol/dm^3^ (1).",2],
["25.0 cm^3^ of 0.080 mol/dm^3^ NaOH is neutralised by 20.0 cm^3^ of HCl. Calculate the concentration of the HCl.","Moles NaOH = 0.0250 × 0.080 = 0.00200 (1); moles HCl = 0.00200 (1); 0.00200 ÷ 0.0200 (1) = 0.10 mol/dm^3^ (1).",4],
["25.0 cm^3^ of 0.10 mol/dm^3^ NaOH is neutralised by 20.0 cm^3^ of sulfuric acid: 2NaOH + H~2~SO~4~ → Na~2~SO~4~ + 2H~2~O. Calculate the concentration of the acid.","Moles NaOH = 0.00250 (1); ratio 2 : 1 so moles acid = 0.00125 (1); 0.00125 ÷ 0.0200 (1) = 0.0625 mol/dm^3^ (1).",4]],
[N("0.5 mol of a solute is dissolved to make 250 cm^3^ of solution. What is the concentration in mol/dm^3^?",2,"mol/dm^3^","0.5 ÷ 0.25 = 2."),
N("How many grams of NaCl (M~r~ = 58.5) are in 250 cm^3^ of a 0.40 mol/dm^3^ solution?",5.85,"g","0.40 × 0.25 × 58.5 = 5.85.",0.01),
M("75 cm^3^ is the same as",["0.0075 dm^3^","0.075 dm^3^","0.75 dm^3^","75 000 dm^3^"],1,"Divide cm^3^ by 1000."),
N("What volume of 0.50 mol/dm^3^ HCl neutralises 20.0 cm^3^ of 0.10 mol/dm^3^ Ca(OH)~2~? (Ca(OH)~2~ + 2HCl → CaCl~2~ + 2H~2~O)",8,"cm^3^","0.0020 × 2 = 0.0040 mol; 0.0040 ÷ 0.50 = 0.0080 dm^3^.",0.05),
N("How many moles of HCl are in 20 cm^3^ of a 0.50 mol/dm^3^ solution?",0.01,"mol","0.50 × 0.020 = 0.010.",0.0005),
M("A solution of sodium hydroxide has a concentration of 20 g/dm^3^. What is this in mol/dm^3^? (M~r~ = 40)",["0.2","0.5","2","800"],1,"20 ÷ 40 = 0.5."),
T("What is the name of the volume of solution added from the burette at the end-point of a titration?",["titre"],"The titre."),
M("In a titration the mole ratio from the equation is used to",["find the end-point colour","compare the moles of the two reactants","measure the volume","calculate M~r~"],1,"The ratio links the moles of the known and unknown solutions.")],
[["Concentration (g/dm^3^)","mass of solute ÷ volume in dm^3^."],
["Concentration (mol/dm^3^)","moles ÷ volume in dm^3^."],
["moles from concentration","moles = concentration × volume (dm^3^)."],
["cm^3^ to dm^3^","Divide by 1000."],
["g/dm^3^ to mol/dm^3^","Divide by M~r~."],
["Titre","The volume of solution added at the end-point of a titration."],
["Titration steps","Equation, moles of known, ratio, then unknown."],
["Biggest slip in these questions","Forgetting to convert cm^3^ to dm^3^."]]),

L("Formulae, yield and purity calculations","Empirical and molecular formulae, hydrated salts, percentage composition, percentage yield and percentage purity.",
`<h4>Empirical formulae <i>(Extended only)</i></h4>
<p>The <b>empirical formula</b> is the simplest whole-number ratio of atoms of each element in a compound. To find it from masses or percentages, use a table: write the element, the mass (or %), the A~r~, the moles (mass ÷ A~r~), and then divide every mole value by the smallest.</p>
<div class="ex"><b>Worked example</b>A hydrocarbon contains 2.4 g of carbon and 0.4 g of hydrogen.<br>C: 2.4 ÷ 12 = 0.2 mol. H: 0.4 ÷ 1 = 0.4 mol.<br>Divide by 0.2: C = 1, H = 2. Empirical formula = <b>CH~2~</b>.</div>
<div class="ex"><b>Worked example</b>An iron oxide contains 70% iron and 30% oxygen by mass.<br>Fe: 70 ÷ 56 = 1.25. O: 30 ÷ 16 = 1.875.<br>Divide by 1.25: Fe = 1, O = 1.5. Multiply both by 2 to get whole numbers: Fe = 2, O = 3. Empirical formula = <b>Fe~2~O~3~</b>.</div>
<div class="key"><b>Exam tip</b>If the ratio ends in .5, double everything. Do not round 1.5 to 2.</div>
<h4>Molecular formulae <i>(Extended only)</i></h4>
<p>The <b>molecular formula</b> shows the actual number of atoms in one molecule. It is a whole-number multiple of the empirical formula. Find the multiple <b>n</b> with n = M~r~ of the compound ÷ mass of the empirical formula.</p>
<div class="ex"><b>Worked example</b>A compound has the empirical formula CH~2~ and M~r~ = 70.<br>Mass of CH~2~ = 14. n = 70 ÷ 14 = 5.<br>Molecular formula = <b>C~5~H~10~</b>.</div>
<h4>Hydrated salts <i>(Extended only)</i></h4>
<p>Some crystals contain <b>water of crystallisation</b>, written after a dot, for example CuSO~4~·5H~2~O. To find the number of water molecules, x, heat the crystals until the mass stops changing, then treat the salt and water like two "elements" in an empirical formula table.</p>
<div class="ex"><b>Worked example</b>12.3 g of hydrated magnesium sulfate, MgSO~4~·xH~2~O, loses all its water on heating and leaves 6.0 g of MgSO~4~.<br>Mass of water = 12.3 − 6.0 = 6.3 g.<br>Moles MgSO~4~ = 6.0 ÷ 120 = 0.050. Moles H~2~O = 6.3 ÷ 18 = 0.35.<br>Ratio = 0.35 ÷ 0.050 = 7, so the formula is <b>MgSO~4~·7H~2~O</b>.</div>
<h4>Percentage composition <i>(Extended only)</i></h4>
<p>The percentage of an element in a compound shows how much of its mass comes from that element.</p>
<div class="key"><b>Key equation</b>% of an element = (A~r~ × number of atoms of the element) ÷ M~r~ of the compound × 100</div>
<div class="ex"><b>Worked example</b>Percentage of nitrogen in ammonium sulfate, (NH~4~)~2~SO~4~.<br>M~r~ = 2 × (14 + 4) + 32 + 64 = 132. Mass of N = 2 × 14 = 28.<br>% N = 28 ÷ 132 × 100 = <b>21.2%</b>.</div>
<div class="key"><b>Exam tip</b>Use the <i>total</i> mass of the element. In ammonium sulfate there are two nitrogen atoms, and counting only one loses the mark.</div>
<h4>Percentage yield <i>(Extended only)</i></h4>
<p>The <b>theoretical yield</b> is the most product the equation says you could make. The <b>actual yield</b> is what you really collect. In practice you never get 100% because of incomplete or reversible reactions, product lost during filtering or transferring, and side reactions.</p>
<div class="key"><b>Key equation</b>percentage yield = actual yield ÷ theoretical yield × 100</div>
<div class="ex"><b>Worked example</b>25 g of calcium carbonate is heated: CaCO~3~ → CaO + CO~2~. Moles CaCO~3~ = 25 ÷ 100 = 0.25, so the theoretical yield of CaO = 0.25 × 56 = 14.0 g. If 11.2 g is collected, % yield = 11.2 ÷ 14.0 × 100 = <b>80%</b>.</div>
<div class="key"><b>Exam tip</b>A yield above 100% means the fraction was upside down.</div>
<h4>Percentage purity <i>(Extended only)</i></h4>
<p>A sample is <b>pure</b> if nothing else is mixed with it. Samples often contain unreacted material or other impurities.</p>
<div class="key"><b>Key equation</b>percentage purity = mass of pure substance ÷ total mass of sample × 100</div>
<div class="ex"><b>Worked example</b>A 4.0 g sample of a product contains 3.6 g of the pure compound. Purity = 3.6 ÷ 4.0 × 100 = <b>90%</b>.</div>
<div class="ex"><b>Worked example</b>12.5 g of impure limestone gives 2.4 dm^3^ of carbon dioxide at RTP with excess acid. Moles CO~2~ = 2.4 ÷ 24 = 0.10, so 0.10 mol CaCO~3~ reacted, a mass of 10 g. Purity = 10 ÷ 12.5 × 100 = <b>80%</b>.</div>`,
I("Why can a chemist never quite make 100% of what the equation predicts?",
`<p>Think about what happens to a product between the reaction vessel and the sample bottle.</p><ol><li>List four places where product could be lost in a preparation of a salt (reaction, filtering, crystallising, drying).</li><li>For each, suggest how a careful chemist could reduce the loss.</li><li>Explain why a very high percentage yield matters to a company making fertiliser.</li></ol>`,
`<p><b>Heat and weigh.</b> Weigh a crucible, add hydrated copper(II) sulfate crystals, and weigh again. Heat gently until the blue colour has gone, cool, and reweigh. Repeat heating until the mass is constant. Calculate the moles of salt and of water and find x.</p><p><b>Yield hunt.</b> Prepare copper(II) sulfate crystals from copper(II) oxide and dilute sulfuric acid. Calculate the theoretical yield first, then the percentage yield, and list where you think material was lost.</p><p class="safe">Safety: wear eye protection and heat carefully. Copper(II) sulfate is harmful.</p>`,
null),
[["A hydrocarbon contains 2.4 g of carbon and 0.4 g of hydrogen. Calculate its empirical formula.","C: 2.4 ÷ 12 = 0.2 and H: 0.4 ÷ 1 = 0.4 (1); ratio 1 : 2 (1); CH~2~ (1).",3],
["A compound contains 70% iron and 30% oxygen by mass. Calculate its empirical formula.","Fe: 70 ÷ 56 = 1.25 and O: 30 ÷ 16 = 1.875 (1); ratio 1 : 1.5 (1); multiply by 2 to give 2 : 3 (1); Fe~2~O~3~ (1).",4],
["The empirical formula of a compound is CH~2~ and its M~r~ is 42. Deduce the molecular formula.","Mass of CH~2~ = 14 (1); 42 ÷ 14 = 3 so C~3~H~6~ (1).",2],
["12.3 g of hydrated magnesium sulfate, MgSO~4~·xH~2~O, gives 6.0 g of anhydrous MgSO~4~ on heating. Calculate x.","Water = 6.3 g (1); moles MgSO~4~ = 6.0 ÷ 120 = 0.050 (1); moles H~2~O = 6.3 ÷ 18 = 0.35 (1); x = 7 (1).",4],
["25 g of calcium carbonate gives a theoretical yield of 14.0 g of calcium oxide. 11.2 g is collected. Calculate the percentage yield.","11.2 ÷ 14.0 (1) × 100 = 80% (1).",2],
["Calculate the percentage by mass of nitrogen in ammonium sulfate, (NH~4~)~2~SO~4~.","M~r~ = 132 (1); mass of N = 28 (1); 28 ÷ 132 × 100 = 21.2% (1).",3]],
[M("What is the empirical formula of C~6~H~12~O~6~?",["CHO","CH~2~O","C~2~H~4~O~2~","C~3~H~6~O~3~"],1,"Divide each number by 6."),
N("The empirical formula is CH~2~O (mass 30) and M~r~ = 180. What is the multiplier n?",6,"","180 ÷ 30 = 6."),
N("The theoretical yield is 9.0 g and 7.2 g is collected. What is the percentage yield?",80,"%","7.2 ÷ 9.0 × 100 = 80."),
N("What is the percentage by mass of copper in copper(II) oxide, CuO? (A~r~ Cu = 64)",80,"%","64 ÷ 80 × 100 = 80."),
N("A 4.0 g sample contains 3.6 g of pure compound. What is the percentage purity?",90,"%","3.6 ÷ 4.0 × 100 = 90."),
N("Calculate the percentage by mass of carbon in ethanol, C~2~H~5~OH. Give your answer to 1 decimal place.",52.2,"%","24 ÷ 46 × 100 = 52.2.",0.1),
T("What name is given to the water that is part of the structure of a crystal?",["water of crystallisation","crystallisation","water of crystallization","crystallization"],"Water of crystallisation."),
M("Which is a reason why the percentage yield is less than 100%?",["The reaction was reversible","The equation was balanced","The reactants were pure","Mass is conserved"],0,"Reversible reactions never go to completion, so some reactants remain.")],
[["Empirical formula","The simplest whole-number ratio of atoms in a compound."],
["Molecular formula","The actual number of atoms of each element in a molecule."],
["Finding the multiple n","n = M~r~ of compound ÷ mass of the empirical formula."],
["Water of crystallisation","Water held in the structure of a crystal, as in CuSO~4~·5H~2~O."],
["Percentage composition","(A~r~ × atoms) ÷ M~r~ × 100."],
["Percentage yield","actual ÷ theoretical × 100."],
["Percentage purity","mass of pure substance ÷ total mass × 100."],
["Why is yield below 100%?","Reversible reactions, losses on transfer or filtering, side reactions."]])
);
SETL(3,["Formulae","Writing equations","Relative masses and reacting masses",...t3]);
})();
