/* ===== BIOLOGY 0610 group B: Topic 3 (movement into and out of cells), Topic 4 (biological molecules), Topic 5 (enzymes). Own wording. ===== */
const BB_fig=(vb,inner,cap,label,maxw)=>`<figure class="fig"${maxw?` style="max-width:${maxw}px"`:""}><svg viewBox="${vb}" role="img" aria-label="${label}">${inner}</svg><figcaption>${cap}</figcaption></figure>`;
const BB_t=(x,y,s,o)=>{o=o||{};return `<text x="${x}" y="${y}" font-size="${o.s||11}" text-anchor="${o.a||"middle"}"${o.b?' font-weight="700"':""}${o.i?' font-style="italic"':""} fill="${o.f||"currentColor"}">${s}</text>`};
const BB_def=(id,col)=>`<marker id="${id}" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="${col}"/></marker>`;
const BB_dots=(pts,r,col)=>pts.map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="${r||4}" style="fill:${col||"var(--accent)"}"/>`).join("");
const BB_ln=(x1,y1,x2,y2,col,w,mk)=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${col||"currentColor"}" stroke-width="${w||2}" fill="none"${mk?` marker-end="url(#${mk})"`:""}/>`;

/* ---------- Topic 3 figures ---------- */
FIGS.BB_DIFF=()=>BB_fig("0 0 440 200",`<defs>${BB_def("bd1","currentColor")}</defs>
<rect x="14" y="40" width="190" height="110" rx="6" fill="none" stroke="currentColor" stroke-width="1.5"/>
<rect x="236" y="40" width="190" height="110" rx="6" fill="none" stroke="currentColor" stroke-width="1.5"/>
${BB_dots([[26,54],[40,72],[30,94],[52,60],[44,112],[34,134],[60,86],[56,122],[70,70],[24,116],[66,140],[76,102]],5)}
${BB_dots([[250,58],[290,54],[330,76],[372,62],[266,96],[306,110],[348,102],[400,86],[270,134],[326,138],[380,126],[408,58]],5)}
${BB_ln(110,94,170,94,"currentColor",2.5,"bd1")}
${BB_t(109,28,"Start: crowded on the left",{s:11,b:1})}${BB_t(331,28,"Later: evenly spread",{s:11,b:1})}
${BB_t(220,172,"Particles move randomly, but more move from left to right",{s:10})}${BB_t(220,186,"than right to left, so there is a net movement down the gradient.",{s:10})}`,"Diffusion: the particles spread out until they are evenly distributed.","Particles spreading from a crowded region on the left until they are evenly spread","");
FIGS.BB_MEMB=()=>BB_fig("0 0 440 220",`<defs>${BB_def("bm1","var(--accent)")}${BB_def("bm2","var(--bad)")}</defs>
<rect x="0" y="94" width="440" height="32" style="fill:var(--accent)" fill-opacity=".18"/>
${[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].map(i=>`<circle cx="${12+i*22}" cy="110" r="9" fill="none" stroke="currentColor" stroke-width="1.3"/>`).join("")}
${BB_t(60,16,"Outside the cell",{b:1,s:12})}${BB_t(220,212,"Inside the cell",{b:1,s:12})}
${BB_ln(110,40,110,88,"var(--accent)",2.8,"bm1")}${BB_t(110,36,"oxygen diffuses in",{s:11}).replace('y="36"','y="34"')}
${BB_t(110,160,"used in respiration",{s:10})}
${BB_ln(330,180,330,134,"var(--bad)",2.8,"bm2").replace('M330 180L330 134','M330 132L330 46')}
${BB_t(330,34,"carbon dioxide diffuses out",{s:11})}${BB_t(330,152,"made in respiration",{s:10})}
${BB_t(220,82,"cell membrane (partially permeable)",{s:10.5,b:1})}`,"Gases such as oxygen and carbon dioxide cross the cell membrane by diffusion, down their concentration gradients.","Oxygen diffusing into a cell and carbon dioxide diffusing out through the membrane","");
FIGS.BB_FACT=()=>BB_fig("0 0 440 200",`<defs>${BB_def("bf1","currentColor")}</defs>
${[["Temperature",14],["Conc. gradient",116],["Surface area",218],["Distance",320]].map(f=>`<rect x="${f[1]}" y="20" width="106" height="28" rx="6" fill="none" stroke="currentColor" stroke-width="1.5"/>${BB_t(f[1]+53,38,f[0],{s:11,b:1})}`).join("")}
${[14,116,218,320].map(x=>BB_ln(x+53,50,x+53,84,"currentColor",2,"bf1")).join("")}
${[14,116,218,320].map(x=>`<rect x="${x}" y="86" width="106" height="28" rx="6" style="fill:var(--accent)" fill-opacity=".22" stroke="currentColor" stroke-width="1.2"/>${BB_t(x+53,104,"rate of diffusion up",{s:10})}`).join("")}
${[[67,"higher: particles","move faster"],[169,"steeper gradient:","faster net movement"],[271,"larger area:","more particles cross"],[373,"shorter distance:","less far to travel"]].map(f=>BB_t(f[0],136,f[1],{s:10})+BB_t(f[0],149,f[2],{s:10})).join("")}
${BB_t(220,184,"Each of the four factors makes the rate of diffusion go up.",{s:11,i:1})}`,"The four factors you need to know for the diffusion investigation.","Four factors that increase the rate of diffusion","");
FIGS.BB_OSM=()=>BB_fig("0 0 440 230",`<defs>${BB_def("bo1","var(--accent)")}</defs>
<rect x="30" y="34" width="380" height="130" rx="8" fill="none" stroke="currentColor" stroke-width="1.6"/>
<path d="M220 34V164" stroke="currentColor" stroke-width="3" stroke-dasharray="5 4"/>
${BB_dots([[60,60],[90,100],[120,70],[150,130],[180,90],[80,140],[130,110],[190,150],[160,52],[100,48]],3.5,"var(--accent)")}
${BB_dots([[250,60],[290,100],[330,80],[380,130],[260,140],[320,150],[360,60],[290,56]],3.5,"var(--accent)")}
${BB_dots([[270,86],[340,106],[300,128],[370,92]],8,"var(--bad)")}
${BB_ln(190,84,250,84,"var(--accent)",3,"bo1")}
${BB_t(125,24,"Dilute solution",{b:1,s:12})}${BB_t(325,24,"Concentrated solution",{b:1,s:12})}
${BB_t(125,184,"High water potential",{s:11})}${BB_t(325,184,"Low water potential",{s:11})}
${BB_t(220,206,"Dashed line: partially permeable membrane.",{s:10})}${BB_t(220,220,"Small water molecules (teal) pass through; large solute molecules (red) cannot.",{s:10})}`,"Osmosis: water moves from high water potential to low water potential through a partially permeable membrane.","Water molecules crossing a partially permeable membrane from the dilute side to the concentrated side","");
FIGS.BB_PLANTCELL=()=>{const cell=(cx,kind)=>{const w=kind==="plas"?{rx:44,ry:34}:kind==="turg"?{rx:56,ry:44}:{rx:50,ry:38};
 const wall=`<rect x="${cx-60}" y="40" width="120" height="96" rx="${kind==="turg"?18:12}" fill="none" stroke="currentColor" stroke-width="${kind==="turg"?4.5:3}"/>`;
 const mem=kind==="turg"?`<rect x="${cx-56}" y="44" width="112" height="88" rx="16" style="fill:var(--accent)" fill-opacity=".25" stroke="var(--accent)" stroke-width="1.5"/>`
  :kind==="flac"?`<path d="M${cx-52} 54Q${cx} 46 ${cx+52} 54Q${cx+42} 88 ${cx+52} 124Q${cx} 130 ${cx-52} 124Q${cx-40} 88 ${cx-52} 54Z" style="fill:var(--accent)" fill-opacity=".2" stroke="var(--accent)" stroke-width="1.5"/>`
  :`<ellipse cx="${cx}" cy="88" rx="30" ry="34" style="fill:var(--accent)" fill-opacity=".2" stroke="var(--accent)" stroke-width="1.5"/>`;
 return wall+mem};
 return BB_fig("0 0 440 210",`${cell(75,"turg")}${cell(220,"flac")}${cell(365,"plas")}
${BB_t(75,26,"Turgid",{b:1,s:12})}${BB_t(220,26,"Flaccid",{b:1,s:12})}${BB_t(365,26,"Plasmolysed",{b:1,s:12})}
${BB_t(75,156,"in pure water",{s:11})}${BB_t(75,170,"cell full, wall pushed out",{s:10})}${BB_t(75,184,"turgor pressure high",{s:10})}
${BB_t(220,156,"in solution of equal strength",{s:11})}${BB_t(220,170,"no net movement",{s:10})}${BB_t(220,184,"cell limp, soft",{s:10})}
${BB_t(365,156,"in concentrated solution",{s:11})}${BB_t(365,170,"membrane pulls away from wall",{s:10})}${BB_t(365,184,"water has left the vacuole",{s:10})}`,"Plant cells in solutions of different concentrations. The cell wall stops a turgid cell from bursting.","A turgid cell, a flaccid cell and a plasmolysed cell drawn side by side","")};
FIGS.BB_POTATO=()=>BB_fig("0 0 440 230",`<path d="M64 14V190H410" fill="none" stroke="currentColor" stroke-width="1.5"/>
<path d="M64 102H410" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4"/>
${[0,.2,.4,.6,.8,1.0].map((v,i)=>`<path d="M${64+i*62} 190v5" stroke="currentColor"/>${BB_t(64+i*62,208,v.toFixed(1),{s:10.5})}`).join("")}
${[-20,-10,0,10,20].map(v=>`<path d="M59 ${190-(v+25)*3.6}h5" stroke="currentColor"/>${BB_t(54,194-(v+25)*3.6,v,{s:10,a:"end"})}`).join("")}
<path d="M64 38C130 52 190 90 236 126S340 168 374 176" fill="none" style="stroke:var(--accent)" stroke-width="3"/>
${[[64,38],[126,52],[188,88],[250,134],[312,160],[374,176]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="4.5" style="fill:var(--accent)"/>`).join("")}
${BB_dots([[224,102]],6,"var(--bad)")}<path d="M224 102V190" stroke="var(--bad)" stroke-width="1.4" stroke-dasharray="3 3"/>
${BB_t(300,90,"no change in mass (crossing point)",{s:10,a:"start"})}
${BB_t(237,226,"Sucrose concentration (mol/dm³)",{s:11})}${BB_t(14,100,"Change in mass (%)",{s:11}).replace("<text ",'<text transform="rotate(-90 14 100)" ')}`,"The point where the curve crosses zero shows the concentration of the solution that matches the potato cells.","Percentage change in mass of potato cylinders against sucrose concentration","");
FIGS.BB_ACTIVE=()=>BB_fig("0 0 440 230",`<defs>${BB_def("ba1","var(--accent)")}</defs>
<rect x="0" y="92" width="440" height="40" style="fill:var(--accent)" fill-opacity=".15"/>
${[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].map(i=>i>=8&&i<=11?"":`<circle cx="${12+i*22}" cy="112" r="9" fill="none" stroke="currentColor" stroke-width="1.3"/>`).join("")}
<path d="M186 90C186 90 186 112 200 124C214 136 226 136 240 124C254 112 254 90 254 90L244 90C244 106 240 112 232 118C226 122 214 122 208 118C200 112 196 106 196 90Z" fill="none" stroke="var(--bad)" stroke-width="2.2"/>
${BB_t(150,164,"protein carrier",{a:"end",s:11,b:1})}${BB_ln(152,160,196,126,"currentColor",1.2)}
${BB_dots([[120,40],[150,60],[96,64],[176,36],[210,52],[260,48],[300,70],[330,40]],5)}
${BB_dots([[226,92]],5.5,"var(--bad)")}
${BB_ln(226,70,226,156,"var(--accent)",3,"ba1")}
${BB_dots([[280,178],[330,196],[360,170],[390,200]],5)}
${BB_t(70,22,"LOW concentration of ions (outside)",{a:"start",b:1,s:11})}${BB_t(70,216,"HIGH concentration of ions (inside)",{a:"start",b:1,s:11})}
${BB_t(380,76,"energy from respiration",{s:10.5,b:1,f:"var(--accent)"})}${BB_ln(330,80,252,102,"var(--accent)",1.4)}`,"In active transport a protein carrier uses energy from respiration to move ions from low concentration to high concentration.","An ion carried through a membrane protein against its concentration gradient","");
FIGS.BB_ROOT=()=>BB_fig("0 0 440 210",`<defs>${BB_def("br1","var(--accent)")}</defs>
<rect x="0" y="0" width="440" height="210" fill="none"/>
<path d="M10 30H170V180H10Z" style="fill:var(--bad)" fill-opacity=".07" stroke="none"/>
${BB_t(90,22,"Soil water: few ions",{s:11,b:1})}
${BB_dots([[40,60],[110,52],[70,96],[140,84],[30,130],[100,140],[150,168],[60,170]],4)}
<rect x="180" y="52" width="250" height="108" rx="40" fill="none" stroke="currentColor" stroke-width="3.5"/>
<rect x="188" y="60" width="234" height="92" rx="34" style="fill:var(--accent)" fill-opacity=".1" stroke="currentColor" stroke-width="1.4"/>
${BB_t(305,22,"Root hair cell",{s:12,b:1})}${BB_t(305,36,"(many mitochondria)",{s:10})}
${[[250,84],[270,88],[330,84],[352,92],[288,128],[318,124],[372,126],[260,122],[390,100]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="4" style="fill:var(--accent)"/>`).join("")}
${[[220,106],[236,134]].map(p=>`<ellipse cx="${p[0]}" cy="${p[1]}" rx="9" ry="5" style="fill:var(--bad)" fill-opacity=".7"/>`).join("")}
${BB_ln(150,100,196,100,"var(--accent)",3,"br1")}
${BB_t(305,186,"Many ions inside: ions still move in, by active transport",{s:10.5})}
${BB_t(180,176,"cell wall",{s:9.5,a:"end"}).replace("<text ","<text opacity='0' ")}`,"A root hair cell takes up mineral ions by active transport even though the soil solution is more dilute.","Root hair cell with a high concentration of ions inside and a low concentration in the soil water","");
/* ---------- Topic 3 lessons ---------- */
const BB_L31=L("Diffusion","How particles spread from high to low concentration, and the factors that change how fast it happens.",
`<h4>What diffusion is</h4>
<p><b>Diffusion</b> is the net movement of particles from a region of their <b>higher concentration</b> to a region of their <b>lower concentration</b>. The particles move <b>down a concentration gradient</b> as a result of their random movement.</p>
{{BB_DIFF}}
<div class="key"><b>Exam tip</b>Say <b>net</b> movement. Particles move in every direction, but more move down the gradient than up it. Diffusion stops being a net movement when the particles are evenly spread.</div>
<h4>Where the energy comes from</h4>
<p>Diffusion is a <b>passive</b> process. The cell does not use any energy from respiration. The energy comes from the <b>kinetic energy</b> of the random movement of the molecules and ions themselves.</p>
<h4>Diffusion in living organisms</h4>
<p>Some substances move into and out of cells by diffusion through the cell membrane. Small molecules pass through easily.</p>
{{BB_MEMB}}
<ul><li><b>Gases:</b> oxygen diffuses into cells for respiration and carbon dioxide diffuses out. In plants, carbon dioxide diffuses in for photosynthesis and oxygen diffuses out.</li><li><b>Solutes:</b> digested food molecules such as glucose diffuse from the small intestine into the blood, and urea diffuses from cells into the blood to be excreted.</li></ul>
<h4>Factors that affect the rate of diffusion</h4>
<p>You need to know four factors. A faster rate means more particles move in a given time.</p>
{{BB_FACT}}
<table><tr><th>Factor</th><th>Effect on the rate</th><th>Why</th></tr>
<tr><td>Surface area</td><td>Larger area, faster diffusion</td><td>More particles can cross at once</td></tr>
<tr><td>Temperature</td><td>Higher temperature, faster diffusion</td><td>Particles have more kinetic energy and move faster</td></tr>
<tr><td>Concentration gradient</td><td>Steeper gradient, faster diffusion</td><td>Bigger difference means a bigger net movement</td></tr>
<tr><td>Distance</td><td>Shorter distance, faster diffusion</td><td>Particles have less far to travel</td></tr></table>
<h4>Investigating diffusion</h4>
<p>You can test these factors with agar jelly that contains a pH indicator. Cubes of different sizes are placed in dilute acid and timed until the colour change reaches the centre. A smaller cube changes colour sooner because acid has a shorter distance to travel and the cube has a larger surface area compared with its volume. Repeating the experiment at different temperatures or with different acid concentrations tests the other factors.</p>`,
I("Why does the smell of perfume spread across a room even when the air is still?",
`<ol><li>Write down what you already know about how a smell travels from one side of a room to the other.</li><li>Predict how long a smell will take to be noticed by a person 1 m away and 5 m away. Write down your reasoning.</li><li>Draw a particle diagram of a room before and after a perfume bottle is opened.</li><li>List the factors that might change how quickly the smell spreads.</li></ol>`,
`<p><b>Investigation: size of agar cubes.</b> Cut agar jelly (made with Universal indicator and a little alkali so it is purple) into cubes with sides of 0.5 cm, 1 cm and 2 cm. Place one cube in each beaker of dilute hydrochloric acid and time how long each takes to turn completely red. Calculate the surface area to volume ratio of each cube and plot time against ratio.</p><p><b>Variation.</b> Repeat with the acid at 20 °C and 40 °C using 1 cm cubes to test temperature. Control the other variables.</p><p><b>Evaluate.</b> Suggest why measuring the colour change at the centre is hard and how you could make the end point clearer.</p>`,
null),
[["Define diffusion.","The net movement of particles from a region of higher concentration to a region of lower concentration (1), down a concentration gradient as a result of random movement (1).",2],
["State where the energy for diffusion comes from.","The kinetic energy of the random movement of the molecules or ions (1).",1],
["Name two substances that move into or out of cells by diffusion.","Any two from: oxygen, carbon dioxide, glucose, urea, water (2). Allow other suitable solutes.",2],
["A student places agar cubes of different sizes in acid. Explain why the smallest cube changes colour fastest.","It has a larger surface area compared with its volume (1) and the acid has a shorter distance to travel to reach the centre (1).",2],
["Describe how a steeper concentration gradient affects the rate of diffusion and explain why.","The rate increases (1) because there is a bigger difference between the two regions, so a greater net movement of particles occurs (1).",2]],
[M("Diffusion is the net movement of particles",["from low to high concentration using energy","from high to low concentration","only through a membrane","only in liquids"],1,"Diffusion is movement down a concentration gradient and does not need energy from respiration."),
M("What provides the energy for diffusion?",["Respiration","The kinetic energy of the particles","Light energy","ATP from mitochondria"],1,"Particles move randomly because of their own kinetic energy."),
M("Which change would slow the rate of diffusion?",["Increasing the temperature","Increasing the surface area","Reducing the concentration gradient","Reducing the distance"],2,"A smaller gradient gives a smaller net movement."),
M("Which gas diffuses out of a respiring cell?",["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"],2,"Carbon dioxide is made in respiration and diffuses out."),
T("Name the type of movement that does not use energy from respiration and moves substances down a concentration gradient.",["diffusion"],"Diffusion is passive."),
M("A cube has sides of 1 cm. What is its surface area?",["1 cm²","4 cm²","6 cm²","12 cm²"],2,"Six faces, each 1 cm × 1 cm."),
N("A cube has sides of 2 cm. Calculate its surface area to volume ratio (as a number to 1 s.f. with the form x : 1).",3,":1","Surface area = 6 × 4 = 24 cm²; volume = 8 cm³; 24 ÷ 8 = 3.",0),
M("Why does a higher temperature increase the rate of diffusion?",["Particles move more slowly","Particles have more kinetic energy and move faster","The membrane gets thinner","The concentration gradient disappears"],1,"More kinetic energy gives faster random movement.")].map(x=>x),
[["Diffusion","Net movement of particles from high to low concentration, down a concentration gradient."],
["Source of energy for diffusion","Kinetic energy of random movement of the particles."],
["Is diffusion active or passive?","Passive: it does not use energy from respiration."],
["Four factors affecting diffusion rate","Surface area, temperature, concentration gradient, distance."],
["Gases that diffuse in a respiring cell","Oxygen in, carbon dioxide out."],
["Why is a small cube faster in the agar experiment?","Larger surface area compared with volume, shorter distance to the centre."],
["Surface area of a cube with side 3 cm","6 × 9 = 54 cm²."],
["Concentration gradient","The difference in concentration between two regions."]]);

const BB_L32=L("Osmosis","How water moves across partially permeable membranes, and what it does to plant and animal cells.",
`<h4>Water as a solvent</h4>
<p>Water is the <b>solvent</b> in living organisms. Many substances dissolve in it, so it can carry them around. In <b>digestion</b> it dissolves enzymes and food molecules, in <b>excretion</b> it dissolves urea to form urine, and in <b>transport</b> it forms the liquid part of blood and the sap in plants.</p>
<h4>What osmosis is</h4>
<p>Water molecules can pass through <b>partially permeable membranes</b> by <b>osmosis</b>. Water moves into and out of cells by osmosis through the cell membrane. A partially permeable membrane lets small molecules such as water through but blocks larger ones such as sugars.</p>
<h4>Osmosis and water potential (Extended)</h4>
<p><b>Osmosis</b> is the net movement of water molecules from a region of <b>higher water potential</b> (a dilute solution) to a region of <b>lower water potential</b> (a concentrated solution), through a partially permeable membrane.</p>
{{BB_OSM}}
<div class="key"><b>Exam tip</b>Pure water has the highest water potential. The more solute dissolved in a solution, the lower its water potential. Never say that water moves "to where there is more solute" without mentioning water potential.</div>
<h4>Plant cells in different solutions</h4>
<p>Plant cells have a strong cell wall. Water entering by osmosis makes the vacuole swell and press on the wall. Plants are <b>supported</b> by the pressure of the water inside their cells pressing outwards on the cell walls.</p>
{{BB_PLANTCELL}}
<table><tr><th>Cell in</th><th>What happens</th><th>Cell is</th></tr>
<tr><td>Dilute solution or pure water</td><td>Water enters by osmosis. The vacuole swells and pushes the membrane against the wall.</td><td><b>Turgid</b>, with high <b>turgor pressure</b></td></tr>
<tr><td>Solution of the same concentration</td><td>No net movement of water.</td><td>Starts to go limp</td></tr>
<tr><td>Concentrated solution</td><td>Water leaves the vacuole by osmosis. The cytoplasm shrinks and the membrane pulls away from the wall.</td><td><b>Plasmolysed</b>; a plant tissue that has lost turgor is <b>flaccid</b></td></tr></table>
<h4>Animal cells (Extended)</h4>
<p>Animal cells have no cell wall. In a very dilute solution, water enters and the cell can swell and burst. In a concentrated solution, water leaves and the cell shrinks and shrivels. This is why the water potential of body fluids such as blood plasma is carefully controlled.</p>
<h4>Investigating osmosis</h4>
<p><b>Dialysis tubing:</b> a bag containing sugar solution is placed in water. Water enters the bag by osmosis, so the bag becomes firm and its mass increases.</p>
<p><b>Potato cylinders:</b> equal-sized cylinders are weighed, placed in sucrose solutions of different concentrations for a set time, dried and reweighed. Cylinders gain mass in dilute solutions and lose mass in concentrated ones.</p>
{{BB_POTATO}}
<p>Calculate the <b>percentage change in mass</b> as (final mass − initial mass) ÷ initial mass × 100. The concentration at which the line crosses zero is where the solution has the same water potential as the potato cells.</p>
<h4>Why osmosis matters (Extended)</h4>
<p>Root hair cells take in water by osmosis because the cell sap has a lower water potential than the soil water. Plants lose turgor and wilt when they lose more water than they take up. Osmosis also moves water into and out of the cells of animals, so it affects how tissues are kept healthy.</p>`,
I("What happens to a chip left in water, and to a chip left in salty water?",
`<ol><li>Predict what will happen to the mass and firmness of a potato chip placed in pure water and one placed in strong salt solution.</li><li>Use the words <i>water potential</i> in your explanation. If you are not sure of the word, write what you think it means and check later.</li><li>Draw a labelled particle diagram of water and solute on either side of a partially permeable membrane.</li><li>Write one question about osmosis that you would like to answer by experiment.</li></ol>`,
`<p><b>Investigation: potato cylinders.</b> Use a cork borer to cut six cylinders of the same length from one potato. Blot and weigh each. Place one cylinder in each of sucrose solutions of 0, 0.2, 0.4, 0.6, 0.8 and 1.0 mol/dm³ for 30 minutes. Remove, blot dry and reweigh. Calculate the percentage change in mass and plot a graph.</p><p><b>Analyse.</b> Use the graph to estimate the concentration where there is no change in mass. Explain what this tells you about the potato cells.</p><p><b>Evaluate.</b> List two sources of error and how you would reduce them (for example blotting equally, using the same potato, repeating the experiment).</p>`,
["https://phet.colorado.edu/en/simulations/diffusion","PhET: Diffusion simulation (extension for membranes)"]),
[["State what is meant by a partially permeable membrane.","A membrane that lets some molecules pass through (such as water) but not others (such as larger solute molecules) (1).",1],
["Describe osmosis in terms of water potential.","Net movement of water molecules from a region of higher water potential (1) to a region of lower water potential (1) through a partially permeable membrane (1).",3],
["A plant cell is placed in concentrated sugar solution. Describe what happens to the cell. Use the word plasmolysis.","Water leaves the vacuole by osmosis (1), the cytoplasm shrinks and the cell membrane pulls away from the cell wall (1). This is plasmolysis (1).",3],
["Explain why a plant stem is firm when its cells are turgid.","Water enters the cells by osmosis (1) and presses outwards on the cell walls with turgor pressure (1), supporting the plant (1).",3],
["Potato cylinder A loses mass in solution X. Explain what this shows about the water potential of X.","The potato lost water by osmosis (1), so solution X has a lower water potential than the cell contents (1).",2]],
[M("Osmosis is the net movement of",["solute from high to low concentration","water from high to low water potential","water from low to high water potential","solute using energy"],1,"Water moves down its water potential gradient."),
M("A plant cell in pure water becomes",["flaccid","plasmolysed","turgid","burst"],2,"Water enters, the vacuole swells and the cell becomes turgid. The wall prevents bursting."),
M("What is plasmolysis?",["A cell bursting","The membrane pulling away from the cell wall","A cell gaining water","A cell dividing"],1,"The cell loses water and the membrane pulls away from the wall."),
M("Which solution has the highest water potential?",["10% sugar","5% sugar","1% sugar","Pure water"],3,"Pure water has the highest water potential."),
N("A potato cylinder has a mass of 4.0 g and after 30 minutes in a solution its mass is 3.4 g. Calculate the percentage change in mass (give a negative number for a decrease).",-15,"%","(3.4 − 4.0) ÷ 4.0 × 100 = −15%.",0.5),
M("Why does an animal cell burst in pure water but a plant cell does not?",["Animal cells have no nucleus","Animal cells have no cell wall","Plant cells have no membrane","Animal cells have no cytoplasm"],1,"The cell wall resists the pressure of the swollen cell."),
T("What is the name given to the pressure of water pressing outwards on the cell wall?",["turgor"],"Turgor pressure."),
M("What would you expect when a potato cylinder is in a solution with the same water potential as its cells?",["A big gain in mass","A big loss in mass","No change in mass","The cylinder dissolves"],2,"There is no net movement of water.")],
[["Osmosis","Net movement of water from higher to lower water potential through a partially permeable membrane."],
["Turgid","A plant cell full of water with the membrane pressing against the wall."],
["Turgor pressure","Pressure of water inside the cell pressing outwards on the cell wall."],
["Plasmolysis","The cell membrane pulling away from the cell wall after water loss."],
["Flaccid","A plant tissue that has lost water and turgor so it is limp."],
["What highest water potential means","Pure water; the more solute, the lower the water potential."],
["Percentage change in mass","(final − initial) ÷ initial × 100."],
["Why are plants supported?","Turgid cells press outwards on their walls."]]);

const BB_L33=L("Active transport","How cells move substances against a concentration gradient using energy and protein carriers.",
`<h4>What active transport is</h4>
<p><b>Active transport</b> is the movement of particles through a cell membrane from a region of <b>lower concentration</b> to a region of <b>higher concentration</b>, which is <b>against a concentration gradient</b>. It needs <b>energy from respiration</b>.</p>
{{BB_ACTIVE}}
<div class="key"><b>Exam tip</b>Diffusion goes down the gradient and needs no energy. Active transport goes against the gradient and needs energy from respiration. Learn this contrast as a pair.</div>
<h4>Protein carriers (Extended)</h4>
<p>During active transport <b>protein carriers</b> in the membrane pick up a molecule or ion on one side and release it on the other side. Each carrier fits one type of particle, and the cell must supply energy to make the carrier change shape.</p>
<h4>Why active transport is important (Extended)</h4>
<p>Cells often need to take in substances that are scarce outside or keep them at a higher concentration inside than outside. Examples are <b>ion uptake by root hairs</b> and the uptake of glucose by the cells that line the small intestine when the glucose concentration in the gut is low.</p>
{{BB_ROOT}}
<ul><li><b>Root hair cells:</b> the soil water contains few mineral ions such as nitrate. The cells absorb these ions against the gradient by active transport.</li><li><b>Respiration is required:</b> a root hair cell has many mitochondria. Anything that stops respiration, such as a lack of oxygen or a poison, stops ion uptake.</li></ul>
<h4>Comparing diffusion, osmosis and active transport</h4>
<table><tr><th></th><th>Diffusion</th><th>Osmosis</th><th>Active transport</th></tr>
<tr><td>What moves</td><td>Any particles</td><td>Water only</td><td>Molecules or ions</td></tr>
<tr><td>Direction</td><td>High to low concentration</td><td>High to low water potential</td><td>Low to high concentration</td></tr>
<tr><td>Energy from respiration needed?</td><td>No</td><td>No</td><td>Yes</td></tr>
<tr><td>Membrane protein needed?</td><td>Not always</td><td>Not always</td><td>Yes: carrier proteins</td></tr></table>`,
I("Why do root hair cells need oxygen even though they take in water by osmosis?",
`<ol><li>List three substances a plant must take from the soil. Write whether each is likely to be more or less concentrated in the soil than in the root cell.</li><li>Predict what would happen to ion uptake if the soil became waterlogged with no oxygen.</li><li>Sketch a membrane with a carrier protein and add arrows showing the direction of movement against the gradient.</li></ol>`,
`<p><b>Data analysis.</b> A student measures ion uptake by root slices in different conditions: (A) with oxygen at 20 °C, (B) without oxygen at 20 °C, (C) with oxygen at 5 °C. Predict which has the fastest uptake and which has the slowest. Explain using respiration.</p><p><b>Card sort.</b> Cut out statements about diffusion, osmosis and active transport. Sort them into a three-column table and check each one against the notes.</p><p><b>Think like a scientist.</b> Cyanide poisons respiration. What would it do to ion uptake in roots, and why?</p>`,
null),
[["State what is meant by active transport.","Movement of particles through a membrane from lower to higher concentration (1), against the concentration gradient, using energy from respiration (1).",2],
["State two differences between diffusion and active transport.","Diffusion is down the gradient and active transport is against it (1). Diffusion does not need energy from respiration but active transport does (1). Also accept: active transport uses protein carriers.",2],
["Explain why root hair cells contain many mitochondria.","Mitochondria carry out respiration, releasing energy (1) for active transport of mineral ions into the cell (1).",2],
["Describe the role of protein carriers in active transport.","They pick up molecules or ions on one side of the membrane (1) and carry them across to the other side using energy (1).",2],
["Explain why a root hair cell takes in nitrate ions by active transport rather than diffusion.","The nitrate concentration is lower in the soil than in the cell (1), so diffusion would move ions out, not in; active transport moves them against the gradient (1).",2]],
[M("Active transport moves particles",["down a concentration gradient","against a concentration gradient","only water","without any carrier"],1,"It moves particles from low to high concentration."),
M("What supplies the energy for active transport?",["Sunlight","Kinetic energy of molecules","Respiration","The cell wall"],2,"Energy is released in respiration."),
M("Which structures in the membrane carry out active transport?",["Lipid molecules","Protein carriers","Cellulose fibres","Ribosomes"],1,"Carrier proteins move ions or molecules across."),
M("Why does waterlogged soil reduce ion uptake in roots?",["Too much water enters","Less oxygen means less respiration and less energy","The ions are too concentrated","Roots stop osmosis"],1,"No oxygen means little aerobic respiration, so little energy is available."),
T("Name the organelle that releases energy that is used for active transport.",["mitochondri"],"Mitochondria carry out aerobic respiration."),
M("Which is an example of active transport?",["Oxygen entering a cell","Water moving into a root hair by osmosis","Mineral ion uptake by root hair cells","Carbon dioxide leaving a cell"],2,"Ion uptake against the gradient needs energy."),
M("Which cell would you expect to have the most mitochondria?",["A cell that carries out little active transport","A root hair cell","A cell wall","A red blood cell"],1,"Root hair cells need energy for ion uptake."),
M("Why is diffusion not enough for a root hair cell to absorb nitrate when soil levels are low?",["Nitrate cannot dissolve","Diffusion moves ions out of the cell","Diffusion needs light","Nitrate is too large"],1,"Diffusion goes down the gradient, which is outwards when the soil is more dilute.")],
[["Active transport","Movement from low to high concentration using energy from respiration."],
["Direction of active transport","Against the concentration gradient."],
["What moves substances during active transport?","Protein carriers in the membrane."],
["Example of active transport in plants","Mineral ion uptake by root hair cells."],
["Why root hair cells have many mitochondria","To release energy by respiration for active transport."],
["Diffusion vs active transport energy","Diffusion: no energy needed. Active transport: energy from respiration."],
["What happens to active transport without oxygen?","It slows or stops because less energy is released."],
["Another example in animals","Glucose uptake by cells lining the small intestine."]]);

/* ---------- Topic 4 figures ---------- */
FIGS.BB_POLY=()=>BB_fig("0 0 440 250",`<defs>${BB_def("bp1","currentColor")}</defs>
${BB_t(14,18,"Many glucose molecules",{a:"start",b:1,s:11})}
${[0,1,2,3,4,5].map(i=>`<circle cx="${30+i*26}" cy="44" r="10" style="fill:var(--accent)" fill-opacity=".8"/>`).join("")}
${BB_ln(200,44,248,44,"currentColor",2.4,"bp1")}
${[0,1,2,3,4,5].map(i=>`<circle cx="${262+i*28}" cy="44" r="10" style="fill:var(--accent)" fill-opacity=".8"/>${i<5?BB_ln(272+i*28,44,280+i*28,44,"currentColor",3):""}`).join("")}
${BB_t(342,70,"starch, glycogen or cellulose",{s:10.5})}
${BB_t(14,100,"Many amino acids",{a:"start",b:1,s:11})}
${[0,1,2,3,4,5].map(i=>`<rect x="${20+i*26}" y="112" width="20" height="20" rx="${i%2?10:3}" style="fill:${["var(--accent)","var(--amber,#F2A93B)","var(--bad)"][i%3]}" fill-opacity=".8"/>`).join("")}
${BB_ln(200,122,248,122,"currentColor",2.4,"bp1")}
${[0,1,2,3,4,5].map(i=>`<rect x="${252+i*28}" y="112" width="20" height="20" rx="${i%2?10:3}" style="fill:${["var(--accent)","var(--amber,#F2A93B)","var(--bad)"][i%3]}" fill-opacity=".8"/>${i<5?BB_ln(272+i*28,122,280+i*28,122,"currentColor",3):""}`).join("")}
${BB_t(342,150,"protein",{s:10.5})}
${BB_t(14,178,"Glycerol + 3 fatty acids",{a:"start",b:1,s:11})}
<rect x="24" y="192" width="14" height="42" rx="3" style="fill:var(--accent)" fill-opacity=".85"/>
${[0,1,2].map(i=>`<rect x="42" y="${194+i*14}" width="${58}" height="8" rx="4" style="fill:var(--amber,#F2A93B)"/>`).join("")}
${BB_ln(200,212,248,212,"currentColor",2.4,"bp1")}
<rect x="262" y="192" width="14" height="42" rx="3" style="fill:var(--accent)" fill-opacity=".85"/>
${[0,1,2].map(i=>`<rect x="280" y="${194+i*14}" width="96" height="8" rx="4" style="fill:var(--amber,#F2A93B)"/>`).join("")}
${BB_t(396,208,"fat or oil",{s:10.5,a:"middle"})}
${BB_t(63,245,"glycerol (teal)",{s:9.5,a:"start"}).replace('x="63"','x="22"')}${BB_t(160,245,"fatty acids (orange)",{s:9.5,a:"start"})}`,"Large biological molecules are made from many small molecules joined together.","Small molecules joined to make starch, protein and fat","");
FIGS.BB_TESTS=()=>{const rows=[["Starch","iodine solution","#C9902B","#1B1B3A"],["Reducing sugar","Benedict's solution, heat","#3E7FC6","#C8472B"],["Protein","biuret solution","#6FA3D8","#7B4FA0"],["Fat or oil","ethanol, then water","#EDEDED","#F7F7F2"],["Vitamin C","DCPIP","#2C5FA0","#E8E8E8"]];
 const pos=["blue-black","brick-red precipitate","purple or violet","cloudy white emulsion","DCPIP decolourised"];
 return BB_fig("0 0 440 250",`<defs>${BB_def("bt1","currentColor")}</defs>
${BB_t(70,18,"Test for",{b:1,s:11})}${BB_t(190,18,"Start colour",{b:1,s:11})}${BB_t(380,18,"Positive result",{b:1,s:11})}
${rows.map((r,i)=>{const y=34+i*42;return `<rect x="8" y="${y}" width="424" height="36" rx="6" fill="none" stroke="currentColor" stroke-opacity=".35"/>
${BB_t(14,y+16,r[0],{a:"start",b:1,s:11})}${BB_t(14,y+29,r[1],{a:"start",s:9.5})}
<rect x="170" y="${y+6}" width="24" height="24" rx="12" fill="${r[2]}" stroke="currentColor" stroke-opacity=".5"/>${BB_ln(200,y+18,246,y+18,"currentColor",1.6,"bt1")}
<rect x="256" y="${y+6}" width="24" height="24" rx="12" fill="${r[3]}" stroke="currentColor" stroke-opacity=".5"/>${BB_t(290,y+22,pos[i],{a:"start",s:10.5})}`}).join("")}`,"Food tests: the colour of the reagent before the test and the colour that shows a positive result.","Five food tests with the start colour and positive colour for each","")};
FIGS.BB_DNA=()=>{const N=9;let s="";const col={A:"#D9482B",T:"#F2A93B",C:"#2F5D8A",G:"#0E7C66"};const seq=[["A","T"],["C","G"],["G","C"],["T","A"],["A","T"],["C","G"],["T","A"],["G","C"],["A","T"]];
 const xl=(i)=>150+Math.sin(i*.7)*34,xr=(i)=>150-Math.sin(i*.7)*34;
 let pl="",pr="";for(let i=0;i<=N*8;i++){const y=14+i*(190/(N*8));const x1=150+Math.sin(y/190*N*2.2)*38,x2=150-Math.sin(y/190*N*2.2)*38;pl+=(i?"L":"M")+x1.toFixed(1)+" "+y.toFixed(1);pr+=(i?"L":"M")+x2.toFixed(1)+" "+y.toFixed(1)}
 s+=`<path d="${pl}" fill="none" stroke="currentColor" stroke-width="3" stroke-opacity=".85"/><path d="${pr}" fill="none" stroke="currentColor" stroke-width="3" stroke-opacity=".5"/>`;
 seq.forEach((b,i)=>{const y=26+i*21,hw=38*Math.sin(y/190*N*2.2);const x1=150+hw,x2=150-hw;const mid=150;
  s+=`<path d="M${x1.toFixed(1)} ${y}L${mid} ${y}" stroke="${col[b[0]]}" stroke-width="5"/><path d="M${mid} ${y}L${x2.toFixed(1)} ${y}" stroke="${col[b[1]]}" stroke-width="5"/>`});
 s+=BB_t(300,40,"Two strands coiled together",{a:"start",s:11,b:1})+BB_t(300,54,"to make a double helix",{a:"start",s:11,b:1});
 s+=`<rect x="300" y="82" width="12" height="12" rx="2" fill="${col.A}"/>${BB_t(318,92,"A pairs with T",{a:"start",s:11})}<rect x="300" y="102" width="12" height="12" rx="2" fill="${col.T}"/>${BB_t(318,112,"T pairs with A",{a:"start",s:11})}<rect x="300" y="122" width="12" height="12" rx="2" fill="${col.C}"/>${BB_t(318,132,"C pairs with G",{a:"start",s:11})}<rect x="300" y="142" width="12" height="12" rx="2" fill="${col.G}"/>${BB_t(318,152,"G pairs with C",{a:"start",s:11})}`;
 s+=BB_t(300,180,"Coloured rungs = bonds",{a:"start",s:10.5,i:1})+BB_t(300,193,"between pairs of bases",{a:"start",s:10.5,i:1});
 return BB_fig("0 0 440 220",s,"Part of a DNA molecule. The order of the bases carries the genetic code.","A double helix with coloured rungs joining bases A to T and C to G","")};
FIGS.BB_BASEPAIR=()=>BB_fig("0 0 440 170",`<defs>${BB_def("bb1","currentColor")}</defs>
${BB_t(220,18,"Complementary base pairing",{b:1,s:12})}
<rect x="34" y="40" width="46" height="34" rx="6" style="fill:#D9482B" fill-opacity=".85"/>${BB_t(57,63,"A",{s:16,b:1,f:"#fff"})}
<rect x="150" y="40" width="46" height="34" rx="6" style="fill:#F2A93B"/>${BB_t(173,63,"T",{s:16,b:1,f:"#1b1b1b"})}
${BB_ln(84,57,146,57,"currentColor",2.4).replace('d="','stroke-dasharray="5 4" d="')}
<rect x="244" y="40" width="46" height="34" rx="6" style="fill:#2F5D8A"/>${BB_t(267,63,"C",{s:16,b:1,f:"#fff"})}
<rect x="360" y="40" width="46" height="34" rx="6" style="fill:#0E7C66"/>${BB_t(383,63,"G",{s:16,b:1,f:"#fff"})}
${BB_ln(294,57,356,57,"currentColor",2.4).replace('d="','stroke-dasharray="5 4" d="')}
${BB_t(115,92,"bonds hold the pair together",{s:10})}${BB_t(325,92,"bonds hold the pair together",{s:10})}
${BB_t(220,124,"If one strand reads  A C G T T A",{s:12})}${BB_t(220,144,"the other strand reads  T G C A A T",{s:12,b:1})}`,"The bases always pair in the same way, so each strand is the complement of the other.","Base pairs A with T and C with G, joined by bonds","");

/* ---------- Topic 4 lessons ---------- */
const BB_L41=L("Carbohydrates, fats, proteins and the food tests","The elements in food molecules, how big molecules are built from small ones, and how to test for them.",
`<h4>Elements in carbohydrates, fats and proteins</h4>
<p>Living things are built from a small number of elements. The three main food molecules contain:</p>
<table><tr><th>Molecule</th><th>Elements</th></tr>
<tr><td>Carbohydrates</td><td>Carbon, hydrogen and oxygen</td></tr>
<tr><td>Fats and oils</td><td>Carbon, hydrogen and oxygen</td></tr>
<tr><td>Proteins</td><td>Carbon, hydrogen, oxygen and nitrogen (and sometimes sulfur)</td></tr></table>
<div class="key"><b>Exam tip</b>The element that proteins have and carbohydrates and fats do not is <b>nitrogen</b>.</div>
<h4>Large molecules from small molecules</h4>
<p>Many large biological molecules are made by joining a lot of small molecules end to end.</p>
{{BB_POLY}}
<table><tr><th>Large molecule</th><th>Made from</th></tr>
<tr><td><b>Starch</b> (energy store in plants)</td><td>Many <b>glucose</b> molecules</td></tr>
<tr><td><b>Glycogen</b> (energy store in animals and fungi)</td><td>Many <b>glucose</b> molecules</td></tr>
<tr><td><b>Cellulose</b> (plant cell walls)</td><td>Many <b>glucose</b> molecules</td></tr>
<tr><td><b>Proteins</b></td><td>Chains of <b>amino acids</b></td></tr>
<tr><td><b>Fats and oils</b></td><td>One <b>glycerol</b> and three <b>fatty acids</b></td></tr></table>
<h4>The food tests</h4>
<p>You must know all five tests and the colour changes.</p>
{{BB_TESTS}}
<table><tr><th>Test</th><th>Method</th><th>Positive result</th></tr>
<tr><td>Starch: iodine</td><td>Add a few drops of iodine solution to the food</td><td>Yellow-brown changes to <b>blue-black</b></td></tr>
<tr><td>Reducing sugar: Benedict's</td><td>Add Benedict's solution to a liquid sample and heat in a water bath of about 80 °C for a few minutes</td><td>Blue changes to green, yellow, orange then <b>brick-red</b> as the amount of sugar increases</td></tr>
<tr><td>Protein: biuret</td><td>Add biuret solution to the sample (or add sodium hydroxide, then a few drops of dilute copper sulfate)</td><td>Blue changes to <b>purple</b> (violet)</td></tr>
<tr><td>Fat or oil: ethanol emulsion</td><td>Shake the sample with ethanol, pour into water</td><td>A <b>cloudy white emulsion</b> forms</td></tr>
<tr><td>Vitamin C: DCPIP</td><td>Add the sample drop by drop to blue DCPIP solution</td><td>The <b>blue colour disappears</b> (decolourised). More vitamin C means fewer drops needed</td></tr></table>
<p>Safety: wear eye protection, handle hot water baths carefully and keep ethanol away from flames.</p>`,
I("How can you find out what is in a food without tasting it?",
`<ol><li>Choose four foods (for example bread, milk, egg white, a fruit juice). Predict which of starch, reducing sugar, protein, fat and vitamin C each contains.</li><li>Write the reagent you will use for each food molecule. Record the start and positive colours in a table.</li><li>Explain why you should keep a control (a test with water) for each reagent.</li></ol>`,
`<p><b>Food-testing investigation.</b> Carry out all five tests on samples of bread, milk, egg white, glucose solution, vegetable oil, and orange juice. Record the results in a table. Which food contains the most of each molecule?</p><p><b>Vitamin C comparison.</b> Add each juice drop by drop to 1 cm³ of DCPIP until it just turns colourless. Record the volume used. Rank the juices by vitamin C content (the smallest volume has the most). Keep the volumes and concentration of DCPIP the same.</p><p><b>Evaluate.</b> Suggest why Benedict's test gives only a rough idea of how much reducing sugar there is.</p>`,
null),
[["Name the elements found in carbohydrates.","Carbon, hydrogen and oxygen (1).",1],
["Name the small molecules that join together to form a protein.","Amino acids (1).",1],
["Describe how you would test a food for starch and state a positive result.","Add iodine solution (1). Blue-black colour shows starch is present (1).",2],
["Describe the Benedict's test for reducing sugars.","Add Benedict's solution to the sample and heat in a water bath (1). Blue changes to green, yellow, orange or brick-red if reducing sugar is present (1).",2],
["A student adds orange juice to blue DCPIP. The blue colour disappears after 5 drops. Explain what this shows.","The juice contains vitamin C (1), which decolourises DCPIP (1).",2]],
[M("Which element is present in proteins but not in carbohydrates?",["Carbon","Hydrogen","Oxygen","Nitrogen"],3,"Proteins contain nitrogen."),
M("Starch, glycogen and cellulose are all made from",["amino acids","fatty acids","glucose","glycerol"],2,"All three are polymers of glucose."),
M("The biuret test turns what colour with protein?",["Brick-red","Blue-black","Purple","Cloudy white"],2,"Biuret gives a purple colour with protein."),
M("A food gives a blue-black colour with iodine. It contains",["fat","starch","protein","vitamin C"],1,"Iodine turns blue-black with starch."),
T("What is the name of the solution that is decolourised by vitamin C?",["dcpip"],"DCPIP is blue and loses its colour with vitamin C."),
M("Which test gives a cloudy white emulsion?",["Benedict's","Ethanol emulsion","Biuret","Iodine"],1,"Ethanol emulsion test for fats and oils."),
M("A fat molecule is made from",["glucose","amino acids","glycerol and fatty acids","starch"],2,"Fat is one glycerol with three fatty acids."),
M("Why is Benedict's solution heated?",["To make it dissolve","To allow the reaction with reducing sugars","To kill bacteria","To remove protein"],1,"The reaction needs heat.")],
[["Elements in carbohydrates","Carbon, hydrogen and oxygen."],
["Elements in proteins","Carbon, hydrogen, oxygen and nitrogen."],
["Starch is made from","Many glucose molecules."],
["A fat is made from","Glycerol and fatty acids."],
["Iodine test positive result","Blue-black (starch)."],
["Benedict's test positive result","Brick-red after heating (reducing sugar)."],
["Biuret positive result","Purple (protein)."],
["DCPIP positive result","Blue decolourised (vitamin C)."]]);

const BB_L42=L("DNA structure","The double helix, the bases, and the rule for how they pair.",
`<h4>DNA is a long molecule that stores information (Extended)</h4>
<p><b>DNA</b> is the chemical that carries genetic information in a cell. It is a very long molecule made of two strands. The order of the chemicals along it holds the instructions for building proteins.</p>
{{BB_DNA}}
<h4>The structure of the molecule (Extended)</h4>
<ul><li>There are <b>two strands</b> coiled together to form a <b>double helix</b>.</li><li>Each strand contains chemicals called <b>bases</b>. There are four different bases, shortened to <b>A, T, C and G</b>.</li><li><b>Bonds between pairs of bases</b> hold the two strands together, like the rungs of a twisted ladder.</li></ul>
<h4>Base pairing (Extended)</h4>
<p>The bases always pair up in the same way: <b>A with T</b>, and <b>C with G</b>. Full names of the bases are not required. Because of this rule, if you know the order of bases on one strand you can work out the order on the other strand.</p>
{{BB_BASEPAIR}}
<div class="key"><b>Exam tip</b>Do not say that the bonds are between the two strands in general. Say <b>between pairs of bases</b>, and always give the pairs A-T and C-G.</div>
<h4>Worked example (Extended)</h4>
<p>One strand of DNA has the base sequence <b>A A C G T T</b>. The matching strand is found by swapping each base for its partner: A→T, A→T, C→G, G→C, T→A, T→A. So the second strand reads <b>T T G C A A</b>.</p>
<h4>Why DNA matters</h4>
<p>The sequence of bases in a section of DNA (a gene) codes for the order of amino acids in a protein. You will meet this again in the topic on inheritance. For now, remember that the shape of the molecule and the rule for base pairing are what let DNA be copied accurately.</p>`,
I("How can a molecule only four letters long carry the instructions for a whole organism?",
`<ol><li>Write the word BIOLOGY. How many different letters does it use? How many are repeated?</li><li>Suppose a code uses only four letters. Write a three-letter and a six-letter code word using them.</li><li>Explain why the order of the letters matters as much as which letters are present.</li></ol>`,
`<p><b>Model the DNA molecule.</b> Use paper strips or sweets: four colours for A, T, C and G. Build a ladder of 8 base pairs using the pairing rule. Give a partner one strand only and ask them to build the other.</p><p><b>Extraction in the lab (optional).</b> Mash a strawberry in a bag with washing-up liquid and salt solution, filter, then layer cold ethanol on top to see strands of DNA appear. Explain why ethanol makes DNA visible.</p><p><b>Evaluate.</b> List two ways your paper model is accurate and two ways it is not.</p>`,
null),
[["Describe the structure of a DNA molecule.","Two strands (1) coiled together in a double helix (1). Each strand has bases (1). Pairs of bases are bonded together (1).",4],
["State which base pairs with A and which pairs with C.","A pairs with T (1) and C pairs with G (1).",2],
["One strand of DNA has the sequence G G A T C. Write the sequence on the other strand.","C C T A G (2). Award 1 if one or two errors.",2],
["Explain why the two strands of DNA are held together in a regular way.","Bonds form between pairs of bases (1) and the bases always pair in the same way, A-T and C-G (1).",2]],
[M("DNA has the shape of a",["single helix","double helix","sphere","flat sheet"],1,"Two strands coiled together make the double helix."),
M("Which pairs of bases occur in DNA?",["A with C and T with G","A with T and C with G","A with G and C with T","A with A and C with C"],1,"The bases always pair A-T and C-G."),
M("What holds the two strands of DNA together?",["Cellulose fibres","Bonds between pairs of bases","Protein carriers","Hydrogen peroxide"],1,"Bonds between the paired bases."),
T("What is the base that pairs with G?",["c","cytosine"],"G always pairs with C."),
M("The sequence of bases on one strand is T A C. What is the sequence on the other strand?",["A T G","A U G","T A C","G C A"],0,"T→A, A→T, C→G."),
M("The chemical units that make up each strand are called",["bases","proteins","amino acids","enzymes"],0,"Each strand contains bases (A, T, C, G)."),
M("How many different bases are in DNA?",["2","3","4","20"],2,"A, T, C and G."),
M("Where is DNA found in a cell?",["Only in the cell wall","In the nucleus","Only in vacuoles","In the cell membrane only"],1,"DNA is mainly found in the nucleus.")],
[["DNA shape","Double helix: two strands coiled together."],
["What each DNA strand contains","Chemicals called bases."],
["What holds DNA strands together","Bonds between pairs of bases."],
["Base pairing rule","A with T, C with G."],
["Strand complementary to ATTC","TAAG."],
["Four bases in DNA","A, T, C and G."],
["What carries genetic information in a cell?","DNA."],
["Why do the strands match?","Bases always pair in the same way."]]);

/* ---------- Topic 5 figures ---------- */
const BB_enz=(x,y,fill)=>`<path transform="translate(${x} ${y})" d="M0 0H44L56 18L68 0H112V60H0Z" style="fill:${fill||"var(--accent)"}" fill-opacity=".75" stroke="currentColor" stroke-width="1.6"/>`;
const BB_sub=(x,y,fill)=>`<path transform="translate(${x} ${y})" d="M0 0H24L12 18Z" style="fill:${fill||"var(--bad)"}" stroke="currentColor" stroke-width="1.4"/>`;
FIGS.BB_LOCK=()=>BB_fig("0 0 440 230",`<defs>${BB_def("bl1","currentColor")}</defs>
${BB_t(70,18,"1. Enzyme and substrate",{b:1,s:10.5})}${BB_t(220,18,"2. Enzyme-substrate complex",{b:1,s:10.5})}${BB_t(370,18,"3. Products released",{b:1,s:10.5})}
${BB_enz(14,86)}${BB_sub(46,40)}${BB_ln(58,66,58,84,"currentColor",1.6,"bl1")}
${BB_t(70,166,"active site",{s:10})}${BB_ln(70,170,70,148,"currentColor",1)}
${BB_enz(164,86)}${BB_sub(196,86)}
${BB_t(220,166,"substrate fits the active site",{s:10})}${BB_t(220,180,"(complementary shape)",{s:10})}
${BB_enz(314,86)}
<path transform="translate(335 34)" d="M0 0H10L5 12Z" style="fill:var(--bad)" stroke="currentColor" stroke-width="1.2"/>
<path transform="translate(366 34)" d="M0 0H10L5 12Z" style="fill:var(--bad)" stroke="currentColor" stroke-width="1.2"/>
${BB_t(370,166,"enzyme is unchanged",{s:10})}${BB_t(370,180,"and can be used again",{s:10})}
${BB_ln(128,116,158,116,"currentColor",2,"bl1")}${BB_ln(278,116,308,116,"currentColor",2,"bl1")}
${BB_t(220,212,"Substrate (red) is broken down into two products (smaller red pieces).",{s:10,i:1})}`,"Lock and key model of enzyme action.","The substrate fits the active site, forms a complex and is split into products while the enzyme is unchanged","");
FIGS.BB_SPEC=()=>BB_fig("0 0 440 160",`<defs>${BB_def("bs1","var(--bad)")}</defs>
${BB_enz(30,60)}<path transform="translate(60 12)" d="M0 0H26L13 26Z" style="fill:#7B4FA0" stroke="currentColor" stroke-width="1.4"/>
${BB_ln(73,42,73,52,"var(--bad)",2.4,"bs1")}
${BB_t(86,146,"Wrong shape: does not fit,",{s:10.5})}${BB_t(86,158,"no reaction",{s:10.5})}
${BB_enz(250,60)}${BB_sub(282,60)}${BB_t(306,146,"Right shape: fits, reaction occurs",{s:10.5})}`,"Each enzyme is specific: only a substrate with a complementary shape fits the active site.","One substrate that does not fit an enzyme and one that does","");
FIGS.BB_TEMP=()=>BB_fig("0 0 440 240",`<path d="M64 14V196H410" fill="none" stroke="currentColor" stroke-width="1.5"/>
<path d="M64 196C100 192 130 176 160 130C180 100 196 62 206 44C212 34 220 34 226 50C240 90 254 150 268 196" fill="none" style="stroke:var(--accent)" stroke-width="3.2"/>
<path d="M214 40V196" stroke="currentColor" stroke-dasharray="4 4"/>
${[0,20,40,60].map((v,i)=>`<path d="M${64+i*80} 196v5" stroke="currentColor"/>${BB_t(64+i*80,212,v,{s:10})}`).join("")}
${BB_t(214,28,"optimum (about 37 °C)",{s:10.5,b:1})}
${BB_t(237,232,"Temperature (°C)",{s:11})}${BB_t(14,100,"Rate of reaction",{s:11}).replace("<text ",'<text transform="rotate(-90 14 100)" ')}
${BB_t(76,70,"Rate rises as kinetic",{s:10,a:"start"})}${BB_t(76,83,"energy increases",{s:10,a:"start"})}
${BB_t(280,100,"Above the optimum the",{s:10,a:"start"})}${BB_t(280,113,"enzyme is denatured,",{s:10,a:"start"})}${BB_t(280,126,"rate falls to zero",{s:10,a:"start"})}`,"Enzyme activity against temperature. The optimum for human enzymes is about 37 °C.","A bell-shaped rate curve with an optimum, rising slowly then falling steeply above it","");
FIGS.BB_PH=()=>BB_fig("0 0 440 250",`<path d="M64 14V196H410" fill="none" stroke="currentColor" stroke-width="1.5"/>
<path d="M64 130C72 80 82 44 90 38C100 34 108 60 120 130C126 170 134 192 150 196" fill="none" style="stroke:var(--bad)" stroke-width="3"/>
<path d="M150 196C170 196 182 170 196 100C204 56 212 38 220 38C230 38 238 56 246 100C256 150 266 190 290 196" fill="none" style="stroke:var(--accent)" stroke-width="3"/>
${[1,3,5,7,9,11,13].map((v,i)=>`<path d="M${64+i*52} 196v5" stroke="currentColor"/>${BB_t(64+i*52,212,v,{s:10})}`).join("")}
${BB_t(124,26,"pepsin (stomach)",{s:10.5,b:1,f:"var(--bad)"})}${BB_t(290,26,"amylase (mouth)",{s:10.5,b:1,f:"var(--accent)"})}
${BB_t(14,100,"Rate of reaction",{s:11}).replace("<text ",'<text transform="rotate(-90 14 100)" ')}${BB_t(237,238,"pH",{s:11,b:1})}`,"Each enzyme has its own optimum pH: about 2 for pepsin and about 7 for amylase.","Two bell-shaped curves of enzyme activity against pH, one peaking at pH 2 and one at pH 7","");
/* ---------- Topic 5 lessons ---------- */
const BB_L51=L("Enzymes and the lock and key model","What enzymes are, why living things need them, and how the active site works.",
`<h4>Catalysts and enzymes</h4>
<p>A <b>catalyst</b> is a substance that <b>increases the rate of a chemical reaction</b> and is <b>not changed</b> by the reaction. <b>Enzymes</b> are <b>proteins</b> that function as <b>biological catalysts</b>. They are involved in <b>all metabolic reactions</b>, which are the chemical reactions that happen in living organisms.</p>
<h4>Why enzymes are important</h4>
<p>The reactions of life would happen far too slowly at body temperature to keep an organism alive. Enzymes speed them up so that the reactions needed to survive, such as digesting food and releasing energy, happen quickly enough to sustain life. Because enzymes are not changed, a small amount can work again and again.</p>
<h4>How an enzyme works</h4>
<p>Each enzyme has a region called the <b>active site</b>. The shape of the active site is <b>complementary</b> to the shape of its <b>substrate</b>. The substrate fits into the active site, the reaction happens, and the <b>products</b> leave.</p>
{{BB_LOCK}}
<h4>The enzyme-substrate complex (Extended)</h4>
<p>When the substrate binds to the active site, the two form an <b>enzyme-substrate complex</b>. While bound, the substrate is changed into the <b>product</b>. The products leave and the enzyme is free to take another substrate molecule.</p>
<div class="key"><b>Exam tip</b>Use the exact words: <b>active site</b>, <b>substrate</b>, <b>enzyme-substrate complex</b>, <b>product</b>, <b>complementary</b>. Do not say the enzyme "gets used up" or "is killed".</div>
<h4>Specificity (Extended)</h4>
<p>Enzymes are <b>specific</b>: each enzyme works on only one substrate (or one type of substrate). This is because only that substrate has a shape that is complementary to the active site, so it fits.</p>
{{BB_SPEC}}
<table><tr><th>Enzyme</th><th>Substrate</th><th>Products</th></tr>
<tr><td>Amylase</td><td>Starch</td><td>Maltose (then glucose)</td></tr>
<tr><td>Protease</td><td>Protein</td><td>Amino acids</td></tr>
<tr><td>Lipase</td><td>Fats and oils</td><td>Fatty acids and glycerol</td></tr>
<tr><td>Catalase</td><td>Hydrogen peroxide</td><td>Water and oxygen</td></tr></table>`,
I("Why do we need enzymes if the reactions in our cells could happen without them?",
`<ol><li>Write down what you think "catalyst" means. Name any catalyst you know from school.</li><li>Predict how fast a reaction in your body would go with no enzyme. How could you test this using hydrogen peroxide?</li><li>Draw a lock and key diagram using a real key and lock or paper shapes.</li></ol>`,
`<p><b>Catalase investigation.</b> Add 5 cm³ hydrogen peroxide to four test tubes. Add a small piece of liver, potato, manganese(IV) oxide and sand to different tubes. Observe and record bubbles of oxygen. Which materials contain a catalyst?</p><p><b>Lock and key model.</b> Make a card model of an enzyme with an active site. Cut different substrate shapes and test which fit. Explain specificity.</p><p><b>Evaluate.</b> Write two things the lock and key model explains well and one thing it does not show (for example, that the enzyme is a three-dimensional protein that is flexible).</p>`,
null),
[["State what is meant by a catalyst.","A substance that increases the rate of a chemical reaction (1) and is not changed by the reaction (1).",2],
["Name the type of molecule that all enzymes are.","Proteins (1).",1],
["Describe how an enzyme works using the terms active site and substrate.","The substrate fits into the active site (1) because they have complementary shapes (1). The substrate is changed into products and released (1).",3],
["Explain why an enzyme that digests starch cannot digest protein.","Enzymes are specific (1). The shape of the protein does not fit the active site of the starch-digesting enzyme (1).",2],
["Explain why enzymes are important in living organisms.","They speed up metabolic reactions (1) so that the reactions needed to sustain life happen fast enough (1).",2]],
[M("Enzymes are made of",["carbohydrate","protein","fat","nucleic acid"],1,"All enzymes are proteins."),
M("What happens to an enzyme at the end of a reaction?",["It is used up","It is changed into the product","It is unchanged","It becomes the substrate"],2,"Catalysts are not changed."),
M("The part of the enzyme where the substrate binds is the",["active site","nucleus","membrane","vacuole"],0,"The active site has a complementary shape."),
M("Enzymes are specific because",["they work at any pH","only one shape of substrate fits the active site","they are alive","they are large"],1,"Complementary shapes explain specificity."),
T("What do we call the substance that an enzyme acts on?",["substrate"],"The substrate fits the active site."),
M("Which enzyme breaks down hydrogen peroxide?",["Amylase","Lipase","Catalase","Protease"],2,"Catalase gives water and oxygen."),
M("What are the products when protease breaks down protein?",["Glucose","Fatty acids","Amino acids","Glycerol"],2,"Proteins are digested to amino acids."),
M("What does the enzyme-substrate complex form between?",["Two enzymes","The enzyme and the substrate","The substrate and product","Two products"],1,"The substrate temporarily binds to the active site.")],
[["Catalyst","Increases the rate of a reaction and is not changed."],
["Enzyme","A protein that acts as a biological catalyst."],
["Active site","The region of an enzyme where the substrate binds."],
["Substrate","The substance an enzyme acts on."],
["Why are enzymes specific?","The active site shape is complementary to only one substrate."],
["Enzyme-substrate complex","The enzyme and substrate bound together."],
["What does amylase digest?","Starch to maltose."],
["What does catalase break down?","Hydrogen peroxide to water and oxygen."]]);

const BB_L52=L("Temperature, pH and enzyme activity","How changes in temperature and pH affect the rate of enzyme-controlled reactions, and what denaturation is.",
`<h4>Effect of temperature</h4>
<p>As temperature rises, the rate of an enzyme-controlled reaction increases up to an <b>optimum temperature</b>, which is about 37 °C for human enzymes. Above the optimum the rate falls quickly and the reaction stops. The enzyme becomes <b>denatured</b>.</p>
{{BB_TEMP}}
<div class="key"><b>Exam tip</b>Never say that high temperature "kills" an enzyme. Enzymes are not alive. Say that the enzyme is <b>denatured</b>.</div>
<h4>Explaining the temperature effect (Extended)</h4>
<ul><li><b>Below the optimum:</b> the molecules have little <b>kinetic energy</b>, so enzyme and substrate collide infrequently. As the temperature rises, the frequency of <b>effective collisions</b> between substrate and active site increases, so the rate increases.</li><li><b>Above the optimum:</b> the enzyme molecule vibrates so much that its bonds break and the <b>shape</b> of the active site changes. The substrate no longer <b>fits</b>. The enzyme is permanently <b>denatured</b>, so the rate falls to zero.</li></ul>
<h4>Effect of pH</h4>
<p>Each enzyme has an optimum pH. Most work best near pH 7, but some do not. Pepsin in the stomach works best at about pH 2. A pH that is too high or too low reduces the activity and can denature the enzyme.</p>
{{BB_PH}}
<h4>Explaining the pH effect (Extended)</h4>
<p>Changing the pH alters the charges on the enzyme molecule and the bonds that hold its shape. This changes the shape of the active site, so the substrate no longer fits and the enzyme is denatured.</p>
<h4>Investigating enzyme activity</h4>
<p><b>Amylase and starch:</b> mix amylase and starch at a chosen temperature or pH. Every 30 seconds, take a drop of the mixture and add it to iodine solution on a spotting tile. The time taken for the iodine to stay yellow-brown shows when all the starch is digested. A shorter time means a faster reaction.</p>
<p><b>Variables:</b> change only one factor (temperature or pH). Keep the enzyme volume and concentration, the substrate concentration and the time between samples the same. Use a water bath for temperature control and buffers for pH.</p>
<table><tr><th>Temperature (°C)</th><th>Time for starch to disappear (s)</th><th>Rate (1 ÷ time, per s)</th></tr>
<tr><td>10</td><td>240</td><td>0.0042</td></tr><tr><td>20</td><td>120</td><td>0.0083</td></tr><tr><td>35</td><td>40</td><td>0.025</td></tr><tr><td>50</td><td>never</td><td>0</td></tr></table>`,
I("Why do we get a high temperature when we are ill, and why can a very high fever be dangerous?",
`<ol><li>Write what you think happens to the proteins in your body when it gets too hot.</li><li>Predict how the rate of an enzyme reaction changes as the temperature rises from 0 °C to 70 °C. Sketch a graph.</li><li>Write down what you would measure and what you would keep the same in an experiment to test this.</li></ol>`,
`<p><b>Investigation: amylase and temperature.</b> Prepare water baths at 10, 20, 30, 40, 50 and 60 °C. Put 5 cm³ of 1% starch and 1 cm³ of amylase in separate tubes in each bath to reach the temperature. Mix and test a drop with iodine every 30 seconds. Record the time when the colour no longer turns blue-black. Plot rate (1 ÷ time) against temperature.</p><p><b>Investigation: pH.</b> Repeat at 35 °C using buffer solutions of pH 3, 5, 7, 9 and 11.</p><p><b>Evaluate.</b> Explain the shape of your graph using the words kinetic energy, active site and denatured. List two ways to improve accuracy.</p>`,
["https://phet.colorado.edu/","PhET simulations (search for reaction and rate ideas)"]),
[["Name the term for the temperature at which an enzyme works best.","Optimum temperature (1).",1],
["Describe how the rate of an enzyme reaction changes as the temperature increases from 0 °C to 60 °C.","Rate increases (1) to a maximum at the optimum temperature (1) then decreases quickly (1).",3],
["Explain why an enzyme stops working at 80 °C.","The high temperature breaks bonds in the enzyme (1) and changes the shape of the active site (1). The substrate no longer fits so the enzyme is denatured (1).",3],
["A student finds starch disappears in 30 s at 35 °C and 120 s at 15 °C. Calculate the rate (1 ÷ time) at each temperature.","35 °C: 1 ÷ 30 = 0.033 /s (1). 15 °C: 1 ÷ 120 = 0.0083 /s (1).",2],
["Explain why pepsin works best at pH 2 but amylase works best at about pH 7.","Each enzyme has an active site of different shape and the shape is only right at its own optimum pH (1). Pepsin works in the acidic stomach and amylase in the near-neutral mouth (1).",2]],
[M("What is the optimum temperature for most human enzymes?",["0 °C","20 °C","37 °C","70 °C"],2,"Body temperature is about 37 °C."),
M("Which word describes an enzyme that has permanently changed shape?",["Digested","Denatured","Dissolved","Diffused"],1,"Denaturation changes the active site."),
M("Why does the rate increase as temperature rises towards the optimum?",["The enzyme grows larger","Molecules have more kinetic energy so there are more effective collisions","The substrate becomes a catalyst","The pH changes"],1,"More kinetic energy gives more successful collisions."),
M("Why does a denatured enzyme stop working?",["The substrate is used up","The active site shape has changed so the substrate does not fit","There is too much product","It dissolves"],1,"The substrate no longer fits."),
M("Pepsin has an optimum pH of about",["2","7","9","12"],0,"Pepsin works in acid conditions in the stomach."),
N("Starch is digested in 40 s. Calculate the rate in per second, using rate = 1 ÷ time.",0.025,"/s","1 ÷ 40 = 0.025.",0.0005),
T("What is the name of the solution used to test for starch in an enzyme experiment?",["iodine"],"Iodine turns blue-black with starch."),
M("In an investigation of how pH affects amylase, which should be kept constant?",["The pH","The temperature and volume of enzyme","Nothing: all can change","Only the colour of iodine"],1,"Only the pH (independent variable) should change.")],
[["Optimum temperature","The temperature at which an enzyme works fastest."],
["Denaturation","Permanent change in shape of the active site, so the substrate no longer fits."],
["Effect of high temperature on enzymes","Bonds break and the active site changes shape: enzyme is denatured."],
["Why does the rate increase below the optimum?","More kinetic energy gives more effective collisions."],
["Optimum pH of pepsin","About pH 2."],
["Optimum pH of amylase","About pH 7."],
["How to calculate rate from time","Rate = 1 ÷ time."],
["Test to show starch has gone","Iodine solution stays yellow-brown."]]);

/* ---------- topic quizzes and exam-style questions ---------- */
const BB_SRC="Hub exam-style question (written for this hub), Topic ";
const BB_TBL=(h,rows)=>`<div class="tw"><table><tr>${h.map(x=>`<th>${x}</th>`).join("")}</tr>${rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</table></div>`;

const BB_Q3=[
M("Which statement about diffusion is correct?",["It needs energy from respiration","It moves particles from low to high concentration","It is the net movement of particles down a concentration gradient","It only happens in liquids"],2,"Diffusion is passive and moves particles down the gradient."),
M("Which factor does NOT increase the rate of diffusion?",["Higher temperature","Larger surface area","Shorter distance","Smaller concentration gradient"],3,"A smaller gradient reduces the rate."),
M("Osmosis is the movement of",["water through a partially permeable membrane","solute through any membrane","oxygen into a cell","ions using energy"],0,"Osmosis is the diffusion of water across a partially permeable membrane."),
M("A plant cell that is full of water and firm is described as",["flaccid","turgid","plasmolysed","dead"],1,"Turgid cells have high turgor pressure."),
M("A red blood cell is placed in pure water. What is most likely to happen?",["It shrinks","It stays the same","It swells and may burst","It becomes turgid"],2,"Water enters by osmosis and the cell has no wall."),
M("Active transport differs from diffusion because it",["moves particles down the gradient","needs energy from respiration","does not use membranes","moves only water"],1,"It is against the gradient and needs energy."),
N("A cube of side 4 cm. Calculate its surface area in cm².",96,"cm²","6 × 4 × 4 = 96.",0),
T("What is the name for the loss of water from a plant cell so that the membrane pulls away from the wall?",["plasmolysis","plasmolysed"],"This is plasmolysis.")];
const BB_P3=[
P("Potato cylinders in sucrose solutions",6,"<p>A student cut four potato cylinders, each with an initial mass of 5.0 g. Each was placed in a different concentration of sucrose solution for 30 minutes, then dried and weighed.</p>"+BB_TBL(["Sucrose concentration (mol/dm³)","Final mass (g)"],[["0.0","5.8"],["0.2","5.4"],["0.4","5.0"],["0.6","4.5"]])+"<ol type='a'><li>Calculate the percentage change in mass of the cylinder in 0.0 mol/dm³ sucrose. Show your working. [1]</li><li>State the concentration of sucrose solution that has the same water potential as the potato cells. [1]</li><li>Explain why the cylinder in 0.6 mol/dm³ sucrose lost mass. [2]</li><li>The cylinders were dried with a paper towel before weighing. Explain why. [1]</li><li>Suggest one way to make the results more reliable. [1]</li></ol>",
["(a) (5.8 − 5.0) ÷ 5.0 × 100 = +16% (1).","(b) 0.4 mol/dm³ (1): no change in mass.","(c) Water left the potato cells by osmosis (1) because the solution had a lower water potential than the cells (1).","(d) Remove surface solution so that the mass measured is only the potato (1).","(e) Repeat the experiment and calculate a mean (1). Allow use more cylinders."],BB_SRC+"3"),
P("Agar cubes and diffusion",5,"<p>Agar cubes containing an indicator were placed in dilute acid. The time for the acid to turn the whole cube red was recorded.</p>"+BB_TBL(["Side of cube (cm)","Time to turn red (s)"],[["1","40"],["2","150"],["3","330"]])+"<ol type='a'><li>Calculate the surface area to volume ratio of the 3 cm cube. [2]</li><li>Describe how the surface area to volume ratio changes as the cube gets larger. [1]</li><li>Explain why the larger cube takes longer to change colour. [2]</li></ol>",
["(a) Surface area = 6 × 9 = 54 cm² (1); volume = 27 cm³; ratio 54 ÷ 27 = 2 (1): 2 : 1.","(b) The ratio decreases (1).","(c) The acid has further to travel to reach the centre (1) and there is a smaller surface area for each unit of volume (1)."],BB_SRC+"3"),
P("Active transport in root hair cells",5,"<p>A root hair cell absorbs nitrate ions from the soil. The concentration of nitrate is higher inside the cell than in the soil water.</p><ol type='a'><li>Name the process by which the cell absorbs the nitrate ions. [1]</li><li>Explain why diffusion cannot move nitrate ions into the cell in this case. [1]</li><li>State what is needed for this process that is not needed for diffusion. [1]</li><li>Suggest why a root hair cell contains many mitochondria. [2]</li></ol>",
["(a) Active transport (1).","(b) Diffusion moves ions down a gradient, which is out of the cell (1).","(c) Energy from respiration (1).","(d) Mitochondria release energy by respiration (1) which is used for active transport of ions (1)."],BB_SRC+"3"),
P("Diffusion, osmosis and active transport",5,"<p>Complete the table by writing <b>diffusion</b>, <b>osmosis</b> or <b>active transport</b> in the empty boxes, or a word or phrase to complete each description. [5]</p>"+BB_TBL(["Process","Description"],[["...... [1]","Net movement of water from higher to lower water potential through a partially permeable membrane"],["Diffusion","Movement of particles from a ...... concentration to a ...... concentration [2]"],["...... [1]","Movement of ions against a concentration gradient using energy from ...... [1]"]]),
["Osmosis (1).","Diffusion: higher (1) to lower (1).","Active transport (1); energy from respiration (1).","Award each missing word or phrase as listed."],BB_SRC+"3"),
P("Plant cells in a concentrated solution",5,"<p>Onion epidermis cells were placed in concentrated salt solution and viewed under a microscope. The cell membranes had pulled away from the cell walls.</p><ol type='a'><li>Name this effect. [1]</li><li>Explain, using water potential, why this happened. [3]</li><li>State what would happen to the cells if they were then placed in pure water. [1]</li></ol>",
["(a) Plasmolysis (1).","(b) The salt solution has a lower water potential than the cell contents (1). Water moves out of the cell by osmosis (1) through the partially permeable membrane, so the cytoplasm shrinks (1).","(c) They would take in water and become turgid (1)."],BB_SRC+"3")];

const BB_Q4=[
M("Which element is found in proteins but not in fats?",["Carbon","Hydrogen","Oxygen","Nitrogen"],3,"Proteins contain nitrogen."),
M("Which test is used for reducing sugars?",["Iodine","Benedict's","Biuret","Ethanol emulsion"],1,"Benedict's solution and heat."),
M("A solution gives a purple colour with biuret. It contains",["starch","protein","fat","glucose"],1,"Biuret turns purple with protein."),
M("Glycogen is made from",["amino acids","glycerol","glucose","fatty acids"],2,"Glycogen is a polymer of glucose."),
M("A and T are an example of",["a pair of amino acids","a base pair","a fatty acid","two enzymes"],1,"A and T pair in DNA."),
T("What is the test for starch?",["iodine"],"Iodine solution turns blue-black."),
M("Which molecule is made of glycerol and fatty acids?",["Protein","Starch","Fat","Cellulose"],2,"A fat is made of one glycerol and three fatty acids."),
M("What does the DNA double helix consist of?",["One strand of bases","Two strands joined by pairs of bases","Three strands","Two proteins"],1,"Two strands coiled together.")];
const BB_P4=[
P("Food test results",6,"<p>A student carried out four tests on food <b>X</b>.</p>"+BB_TBL(["Test","Result"],[["Iodine solution","Stayed yellow-brown"],["Benedict's solution, heated","Blue changed to brick-red"],["Biuret solution","Stayed blue"],["Ethanol then water","Clear: no emulsion"]])+"<ol type='a'><li>State which food molecule is present in X. [1]</li><li>State the three food molecules that the results show are absent from X. [3]</li><li>Describe the colour change that would show protein is present with biuret. [1]</li><li>Name the substance in the DCPIP test that shows vitamin C is present. [1]</li></ol>",
["(a) A reducing sugar (1).","(b) Starch (1), protein (1), fat or oil (1).","(c) Blue to purple (1).","(d) DCPIP is decolourised by vitamin C (1): the blue colour disappears."],BB_SRC+"4"),
P("Building blocks of large molecules",6,"<p>Complete the table. [6]</p>"+BB_TBL(["Large molecule","Small molecules it is made from","Elements present"],[["Starch","...... [1]","C, H, O"],["Protein","...... [1]","C, H, O and ...... [1]"],["Fat","glycerol and ...... [1]","C, H, ...... [1]"],["Cellulose","...... [1]","C, H, O"]]),
["Glucose (1).","Amino acids (1); nitrogen (1).","Fatty acids (1); O (1).","Glucose (1).","Fat row: second blank is oxygen."],BB_SRC+"4"),
P("Vitamin C in fruit juices",6,"<p>The vitamin C content of three juices was compared using DCPIP. The number of drops of juice needed to remove the blue colour from 1 cm³ of DCPIP was recorded.</p>"+BB_TBL(["Juice","Drops needed"],[["A","12"],["B","5"],["C","20"]])+"<ol type='a'><li>State which juice contains the most vitamin C. [1]</li><li>Explain your answer. [1]</li><li>State two variables that should be kept the same. [2]</li><li>Suggest how the student could make the results more reliable. [1]</li><li>A fourth juice D needed 4 drops, 4 drops and 7 drops in three repeats. Calculate the mean number of drops. [1]</li></ol>",
["(a) B (1).","(b) It needed the fewest drops to decolourise DCPIP (1).","(c) Volume of DCPIP (1); concentration of DCPIP (1). Allow size of drops.","(d) Repeat and calculate a mean (1).","(e) (4 + 4 + 7) ÷ 3 = 5 drops (1)."],BB_SRC+"4"),
P("DNA structure",5,"<p>The diagram in the lesson shows part of a DNA molecule. One strand has the sequence of bases A T G C C A.</p><ol type='a'><li>State the shape of a DNA molecule. [1]</li><li>Write the sequence of bases on the other strand. [2]</li><li>State what holds the two strands together. [1]</li><li>State the name of the units that make up each strand. [1]</li></ol>",
["(a) Double helix (1).","(b) T A C G G T (2). Award 1 mark if one error.","(c) Bonds between pairs of bases (1).","(d) Bases (1). Accept nucleotides."],BB_SRC+"4"),
P("Testing for reducing sugar",5,"<p>A student is given a clear solution that may contain glucose.</p><ol type='a'><li>Describe how to test the solution for a reducing sugar. [3]</li><li>State the final colour that shows a lot of reducing sugar is present. [1]</li><li>Name the apparatus used to keep the mixture hot safely. [1]</li></ol>",
["(a) Add Benedict's solution to the solution (1). Heat in a water bath (1) for several minutes (1).","(b) Brick-red (1).","(c) A water bath (1). Accept a beaker of hot water."],BB_SRC+"4")];

const BB_Q5=[
M("An enzyme is",["a carbohydrate that speeds up reactions","a protein that acts as a biological catalyst","a fat that stores energy","a nucleic acid"],1,"Enzymes are protein catalysts."),
M("The substrate fits into the enzyme's",["active site","nucleus","cell wall","membrane"],0,"The active site is complementary to the substrate."),
M("At temperatures above the optimum, an enzyme",["works faster","is denatured","is made bigger","becomes a substrate"],1,"The shape of the active site is changed."),
M("Which enzyme digests starch?",["Lipase","Amylase","Protease","Pepsin"],1,"Amylase digests starch."),
M("Which graph shape shows rate against temperature for an enzyme?",["Straight line upwards","Rises to a peak then falls","Falls then rises","Flat line"],1,"Rate increases to the optimum, then falls."),
N("An enzyme digests starch in 25 s. Calculate the rate (1 ÷ time) in per second.",0.04,"/s","1 ÷ 25 = 0.04.",0.0005),
T("What is the term for the shape of the active site matching the shape of the substrate?",["complementary"],"Complementary shapes."),
M("Pepsin works best in the stomach because",["it has an optimum pH of about 2","it works at 100 °C","it is a lipid","it digests starch"],0,"Pepsin has an acidic optimum pH.")];
const BB_P5=[
P("Effect of temperature on an enzyme",7,"<p>The graph data show the rate of an enzyme reaction at different temperatures.</p>"+BB_TBL(["Temperature (°C)","Rate (mg per minute)"],[["10","2"],["20","4"],["30","8"],["40","12"],["50","5"],["60","0"]])+"<ol type='a'><li>State the optimum temperature from the data. [1]</li><li>Describe how the rate changes between 10 °C and 40 °C. [2]</li><li>Explain why the rate falls between 40 °C and 50 °C. [3]</li><li>Explain why the rate is zero at 60 °C. [1]</li></ol>",
["(a) 40 °C (1).","(b) The rate increases (1) from 2 to 12 mg per minute, accept doubling at each step (1).","(c) The enzyme begins to be denatured (1). The shape of the active site changes (1) so fewer substrate molecules fit (1).","(d) The enzyme is fully denatured so no substrate fits (1)."],BB_SRC+"5"),
P("Lock and key model",5,"<p>Enzyme X digests only substrate Y.</p><ol type='a'><li>Name the part of the enzyme where substrate Y binds. [1]</li><li>Explain why enzyme X cannot digest substrate Z. [2]</li><li>State what is formed when substrate Y is digested. [1]</li><li>State what happens to the enzyme at the end of the reaction. [1]</li></ol>",
["(a) Active site (1).","(b) The shape of Z is not complementary to the active site (1) so it does not fit (1).","(c) Products (1).","(d) It is unchanged and can be used again (1)."],BB_SRC+"5"),
P("Amylase and pH",6,"<p>The time for amylase to digest starch at different pH values at 35 °C was measured.</p>"+BB_TBL(["pH","Time for starch to disappear (s)"],[["3","No digestion"],["5","90"],["7","30"],["9","100"]])+"<ol type='a'><li>State the optimum pH from the results. [1]</li><li>Calculate the rate of reaction at pH 7 using rate = 1 ÷ time. Give your answer to 3 decimal places. [1]</li><li>Describe how you would show that all the starch has been digested. [2]</li><li>Explain why there is no digestion at pH 3. [2]</li></ol>",
["(a) pH 7 (1).","(b) 1 ÷ 30 = 0.033 /s (1).","(c) Take a sample and add iodine solution (1). The colour stays yellow-brown, not blue-black (1).","(d) The low pH changes the shape of the active site (1) so the substrate does not fit and the enzyme is denatured (1)."],BB_SRC+"5"),
P("Catalase and hydrogen peroxide",5,"<p>A student added a piece of liver to hydrogen peroxide and collected the gas.</p><ol type='a'><li>Name the enzyme in liver that breaks down hydrogen peroxide. [1]</li><li>Name the two products. [2]</li><li>Describe a test for the gas. [2]</li></ol>",
["(a) Catalase (1).","(b) Water (1) and oxygen (1).","(c) Insert a glowing splint (1). It relights if oxygen is present (1)."],BB_SRC+"5"),
P("Why enzymes are needed",4,"<p>Enzymes are involved in all metabolic reactions.</p><ol type='a'><li>State what is meant by a biological catalyst. [2]</li><li>Explain why the human body needs enzymes. [2]</li></ol>",
["(a) Increases the rate of a reaction in a living organism (1) and is not changed (1).","(b) Without enzymes reactions would be too slow (1) to sustain life (1)."],BB_SRC+"5")];

BSET(3,[BB_L31,BB_L32,BB_L33],BB_Q3,BB_P3);
BSET(4,[BB_L41,BB_L42],BB_Q4,BB_P4);
BSET(5,[BB_L51,BB_L52],BB_Q5,BB_P5);
