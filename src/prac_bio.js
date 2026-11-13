/* ===== BIOLOGY 0610 practical investigations (PRAC_BIO) and set-up figures (FIGS.PB_*). Own wording. ===== */
const PB_fig=(vb,inner,cap,label,maxw)=>`<figure class="fig"${maxw?` style="max-width:${maxw}px"`:""}><svg viewBox="${vb}" role="img" aria-label="${label}">${inner}</svg><figcaption>${cap}</figcaption></figure>`;
const PB_t=(x,y,s,o)=>{o=o||{};return `<text x="${x}" y="${y}" font-size="${o.s||11}" text-anchor="${o.a||"middle"}"${o.b?' font-weight="700"':""}${o.i?' font-style="italic"':""} fill="${o.f||"currentColor"}">${s}</text>`};
const PB_r=(x,y,w,h,o)=>{o=o||{};return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx||0}" ${o.f?`style="fill:${o.f}"`:'fill="none"'} stroke="${o.s||"currentColor"}" stroke-width="${o.w||1.5}"${o.d?` stroke-dasharray="${o.d}"`:""}${o.op?` fill-opacity="${o.op}"`:""}/>`};
const PB_l=(x1,y1,x2,y2,o)=>{o=o||{};return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${o.s||"currentColor"}" stroke-width="${o.w||1.5}" fill="none"${o.d?` stroke-dasharray="${o.d}"`:""}${o.m?` marker-end="url(#${o.m})"`:""}/>`};
const PB_c=(x,y,r,o)=>{o=o||{};return `<circle cx="${x}" cy="${y}" r="${r}" ${o.f?`style="fill:${o.f}"`:'fill="none"'} stroke="${o.s||"currentColor"}" stroke-width="${o.w||1.5}"${o.op?` fill-opacity="${o.op}"`:""}/>`};
const PB_mk=(id,col)=>`<marker id="${id}" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="${col||"currentColor"}"/></marker>`;
const PB_AM="var(--amber,#F2A93B)",PB_AC="var(--accent)",PB_BD="var(--bad,#D9482B)",PB_GR="#3E8E41",PB_TAN="#D9B77E";

/* osmosis in potato cylinders */
FIGS.PB_OSMO=()=>PB_fig("0 0 440 210",
 [["Distilled<br>water",0],["0.2 mol/dm³",1],["0.4 mol/dm³",2],["0.6 mol/dm³",3]].map((b,i)=>{const x=20+i*104,lab=b[0].split("<br>");
  return PB_r(x,60,84,110,{rx:4})+PB_r(x+2,86,80,82,{f:"var(--accent)",op:.18,s:"none"})+PB_r(x+26,70,10,70,{f:PB_TAN,s:"currentColor",w:1})+PB_r(x+46,70,10,70,{f:PB_TAN,s:"currentColor",w:1})+PB_r(x+66,70,10,70,{f:PB_TAN,s:"currentColor",w:1})+PB_t(x+42,188,lab[0],{s:10.5,b:1})+(lab[1]?PB_t(x+42,201,lab[1],{s:10.5,b:1}):"")+PB_t(x+42,52,"Beaker "+"ABCD"[i],{s:10})}).join("")+
 PB_t(220,20,"Same-sized potato cylinders, same volume of solution, same time",{s:11.5,b:1}),
 "Four beakers each hold three potato cylinders in a different sucrose concentration. The cylinders are weighed before and after 30 minutes.","Set-up for the potato osmosis investigation");

/* pondweed oxygen */
FIGS.PB_POND=()=>PB_fig("0 0 440 230",PB_mk("pp1")+
 PB_c(46,92,22,{f:PB_AM,op:.5})+PB_t(46,96,"Lamp",{s:10,b:1})+[-30,0,30].map(a=>PB_l(70,92+a*.3,150,92+a,{s:PB_AM,w:1.3,d:"4 3"})).join("")+
 PB_r(168,100,120,100,{rx:5})+PB_r(170,126,116,72,{f:PB_AC,op:.15,s:"none"})+
 `<path d="M205 190L228 128L256 128L276 190" fill="none" stroke="currentColor" stroke-width="1.5"/>`+PB_r(232,70,20,64,{rx:2,f:"var(--bg,#fff)",op:.5})+
 `<path d="M222 190q-4-30 14-46M240 190q0-28 -2-50M256 190q6-30-4-46" stroke="${PB_GR}" stroke-width="2.5" fill="none"/>`+
 PB_c(242,112,3.5)+PB_c(245,98,3)+PB_c(240,86,2.5)+
 PB_l(46,222,168,222,{w:1.5})+PB_l(46,216,46,228,{w:1.5})+PB_l(168,216,168,228,{w:1.5})+PB_t(107,216,"distance d (cm)",{s:11,b:1})+
 PB_t(360,86,"Test tube collects gas",{s:10.5,a:"start"})+PB_l(354,86,258,92,{m:"pp1"})+PB_t(360,160,"Pondweed (Elodea)",{s:10.5,a:"start"})+PB_l(354,160,262,164,{m:"pp1"})+PB_t(360,200,"Beaker of water",{s:10.5,a:"start"})+PB_l(354,200,290,196,{m:"pp1"})+PB_t(360,122,"Bubbles of oxygen",{s:10.5,a:"start"})+PB_l(354,122,252,112,{m:"pp1"}),
 "The number of bubbles released in a fixed time is counted at different lamp distances. A water bath or a heat shield keeps the temperature constant.","Pondweed investigation set-up with a lamp at distance d");

/* potometer */
FIGS.PB_POTOM=()=>PB_fig("0 0 440 220",PB_mk("pt1")+
 `<path d="M60 150Q50 90 74 60M60 150Q70 100 96 80M60 150Q62 80 52 40" stroke="${PB_GR}" stroke-width="3" fill="none"/><ellipse cx="74" cy="56" rx="14" ry="8" style="fill:${PB_GR}" fill-opacity=".6"/><ellipse cx="102" cy="76" rx="14" ry="8" style="fill:${PB_GR}" fill-opacity=".6"/><ellipse cx="46" cy="38" rx="12" ry="7" style="fill:${PB_GR}" fill-opacity=".6"/>`+
 PB_r(50,150,22,24,{f:"currentColor",op:.25})+PB_t(60,194,"Bung",{s:10,b:1})+
 PB_l(61,174,61,200,{w:1.5})+PB_l(61,200,320,200,{w:1.5})+PB_l(61,184,320,184,{w:1.5})+
 PB_c(200,192,4.5,{f:PB_AC,op:.5,w:1.5})+PB_t(200,176,"air bubble",{s:10.5,b:1})+
 [0,1,2,3,4,5,6,7,8,9,10].map(i=>PB_l(110+i*20,205,110+i*20,i%5?210:214,{w:1})).join("")+PB_t(210,224,"scale (mm)",{s:10})+
 PB_r(320,160,70,56,{rx:4})+PB_r(322,176,66,38,{f:PB_AC,op:.18,s:"none"})+PB_t(355,152,"Water reservoir",{s:10.5,b:1})+PB_l(320,192,310,192,{w:1.5})+
 PB_t(110,110,"Shoot cut under water",{s:10.5,a:"start"})+PB_t(300,110,"Measure how far the bubble",{s:10.5,a:"start"})+PB_t(300,124,"moves in a set time",{s:10.5,a:"start"}),
 "As the shoot loses water by transpiration it pulls water along the capillary tube, so the air bubble moves towards the shoot. The distance moved is a measure of water uptake.","Potometer set-up");

/* catalase gas collection */
FIGS.PB_GAS=()=>PB_fig("0 0 440 220",PB_mk("gs1")+
 `<path d="M60 90L60 110L36 170Q32 182 44 182L112 182Q124 182 120 170L96 110L96 90Z" fill="none" stroke="currentColor" stroke-width="1.5"/>`+
 `<path d="M44 168L112 168L120 172Q124 182 112 182L44 182Q32 182 36 172Z" style="fill:var(--accent)" fill-opacity=".2"/>`+PB_c(70,176,4,{f:PB_TAN,w:1})+PB_c(86,174,3.5,{f:PB_TAN,w:1})+
 PB_r(58,80,40,12,{f:"currentColor",op:.25})+
 `<path d="M78 86L78 60L170 60L170 150" fill="none" stroke="currentColor" stroke-width="1.8"/>`+
 PB_r(150,130,100,70,{rx:4})+PB_r(152,150,96,48,{f:PB_AC,op:.18,s:"none"})+
 PB_r(176,70,32,118,{rx:3})+PB_r(178,110,28,76,{f:PB_AC,op:.18,s:"none"})+PB_c(192,122,2.5)+PB_c(196,134,2)+
 PB_t(76,208,"Conical flask",{s:10.5,b:1})+PB_t(76,40,"Hydrogen peroxide +",{s:10.5})+PB_t(76,53,"catalase source",{s:10.5})+
 PB_t(300,100,"Inverted measuring",{s:10.5,a:"start"})+PB_t(300,113,"cylinder full of water",{s:10.5,a:"start"})+PB_l(296,106,210,106,{m:"gs1"})+PB_t(300,176,"Water trough",{s:10.5,a:"start"})+PB_l(296,176,252,176,{m:"gs1"})+PB_t(300,138,"Oxygen collected",{s:10.5,a:"start"})+PB_l(296,134,206,132,{m:"gs1"}),
 "Catalase in the liver or potato breaks down hydrogen peroxide into water and oxygen. The oxygen is collected by displacement of water.","Apparatus for collecting oxygen from catalase and hydrogen peroxide");

/* Benedict's and food tests */
FIGS.PB_FOOD=()=>PB_fig("0 0 440 220",
 PB_r(30,110,130,90,{rx:5})+PB_r(32,128,126,70,{f:PB_AC,op:.15,s:"none"})+PB_t(95,214,"Water bath at 80 °C",{s:10.5,b:1})+
 [0,1,2].map(i=>{const x=50+i*38;return `<path d="M${x} 60L${x} 170Q${x+13} 186 ${x+26} 170L${x+26} 60" fill="none" stroke="currentColor" stroke-width="1.5"/>`+PB_r(x+1,118,24,52,{f:["#3B7DD8","#7CB342","#E0A31B"][i],op:.55,s:"none"})}).join("")+
 PB_l(150,50,150,170,{w:1.5})+PB_c(150,176,5,{f:PB_BD,op:.4})+PB_t(172,60,"Thermometer",{s:10.5,a:"start"})+
 PB_t(270,34,"Benedict's colour scale",{s:11.5,b:1})+
 [["#3B7DD8","blue: none"],["#7CB342","green: trace"],["#E0A31B","yellow/orange: some"],["#B5442A","brick red: lots"]].map((c,i)=>PB_r(215,48+i*34,24,24,{f:c[0],op:.8})+PB_t(248,65+i*34,c[1],{s:11,a:"start"})).join(""),
 "A reducing sugar test: add Benedict's solution to the food solution and heat in a water bath. The final colour shows how much reducing sugar is present.","Benedict's test with a water bath and colour scale");

/* agar cubes */
FIGS.PB_AGAR=()=>PB_fig("0 0 440 220",
 [[1,30],[2,60],[3,90]].map((c,i)=>{const x=40+i*130,s=c[1],y=150-s;return PB_r(x,y,s,s,{f:"#F4B6C8",op:.6})+PB_r(x+(c[0]*10-8)/1,y+(c[0]*10-8)/1,Math.max(0,s-(c[0]*20-16)),Math.max(0,s-(c[0]*20-16)),{f:"#FFFFFF",op:.8,s:"currentColor",w:1,d:"3 2"})+PB_t(x+s/2,172,c[0]+" cm cube",{s:11,b:1})+PB_t(x+s/2,186,"SA:V = "+(6*c[0]*c[0]/(c[0]*c[0]*c[0])).toFixed(0)+":1",{s:10.5})}).join("")+
 PB_t(220,22,"Pink agar cubes in dilute acid: the pink colour disappears from the outside inwards",{s:11}),
 "Agar cubes of different size are timed until the pink colour has gone. Larger cubes have a smaller surface area to volume ratio.","Agar cubes with different surface area to volume ratios");

/* respiration indicator tubes */
FIGS.PB_RESP=()=>PB_fig("0 0 440 220",
 [["A","germinating seeds",1],["B","no seeds",0],["C","boiled seeds",0]].map((c,i)=>{const x=40+i*130;return `<path d="M${x} 40L${x} 160Q${x+26} 186 ${x+52} 160L${x+52} 40" fill="none" stroke="currentColor" stroke-width="1.5"/>`+PB_r(x+1,138,50,24,{f:c[2]?"#E0A31B":"#C2485A",op:.5,s:"none"})+PB_r(x+8,100,36,5,{f:"currentColor",op:.4,w:1})+(c[2]?PB_c(x+18,94,5,{f:PB_TAN,w:1})+PB_c(x+32,95,5,{f:PB_TAN,w:1}):c[1]==="boiled seeds"?PB_c(x+18,94,5,{f:"#999",w:1})+PB_c(x+32,95,5,{f:"#999",w:1}):"")+PB_r(x-4,30,60,10,{f:"currentColor",op:.25})+PB_t(x+26,208,"Tube "+c[0],{s:11,b:1})+PB_t(x+26,22,c[1],{s:10.5})}).join("")+
 PB_t(330,100,"Gauze platform",{s:10.5,a:"start"})+PB_t(330,150,"Hydrogencarbonate",{s:10.5,a:"start"})+PB_t(330,163,"indicator",{s:10.5,a:"start"}),
 "Carbon dioxide from respiring seeds turns hydrogencarbonate indicator from red to yellow. The control tubes stay red.","Respiration investigation with hydrogencarbonate indicator");

/* yeast fermentation */
FIGS.PB_YEAST=()=>PB_fig("0 0 440 220",PB_mk("ye1")+
 PB_r(40,120,150,90,{rx:5})+PB_r(42,150,146,58,{f:PB_AC,op:.15,s:"none"})+
 `<path d="M90 60L90 190Q115 210 140 190L140 60" fill="none" stroke="currentColor" stroke-width="1.5"/>`+PB_r(91,150,48,42,{f:"#E8D9A0",op:.6,s:"none"})+PB_r(86,52,58,10,{f:"currentColor",op:.3})+
 `<path d="M114 56L114 26L300 26L300 140" fill="none" stroke="currentColor" stroke-width="1.8"/>`+
 `<path d="M270 100L270 190Q300 210 330 190L330 100" fill="none" stroke="currentColor" stroke-width="1.5"/>`+PB_r(271,150,58,42,{f:"#DCE6EA",op:.7,s:"none"})+PB_c(290,170,3)+PB_c(308,162,2.5)+PB_c(296,150,2)+
 PB_l(170,40,170,160,{w:1.5})+PB_c(170,166,5,{f:PB_BD,op:.4})+PB_t(178,50,"Thermometer",{s:10.5,a:"start"})+
 PB_t(114,224,"Yeast + sugar solution",{s:10.5,b:1})+PB_t(300,224,"Limewater",{s:10.5,b:1})+PB_t(110,112,"Water bath",{s:10.5,b:1})+PB_t(330,92,"CO₂ bubbles through limewater",{s:10.5,a:"end"}),
 "Yeast respires anaerobically in sugar solution. The bubbles of carbon dioxide are counted, or the limewater is timed until it turns milky.","Yeast fermentation set-up");

/* quadrats and transects */
FIGS.PB_QUAD=()=>PB_fig("0 0 440 200",PB_mk("qd1")+
 PB_r(10,40,420,120,{f:"#8DB36A",op:.18,s:"none"})+
 `<path d="M20 100L420 100" stroke="currentColor" stroke-width="2"/>`+
 [0,1,2,3,4].map(i=>{const x=50+i*78;return PB_r(x,70,44,44,{s:"currentColor",w:1.5})+PB_l(x+22,70,x+22,114,{w:.8})+PB_l(x,92,x+44,92,{w:.8})+PB_c(x+10,80,2.5,{f:PB_GR})+PB_c(x+32,84,2.5,{f:PB_GR})+PB_c(x+14,104,2.5,{f:PB_GR})+(i<3?PB_c(x+34,106,2.5,{f:PB_GR}):"")+PB_t(x+22,134,(i*5)+" m",{s:10.5,b:1})}).join("")+
 PB_t(220,24,"Transect from the hedge into the open field",{s:12,b:1})+PB_t(32,156,"Tape measure laid out along the transect",{s:10.5,a:"start"})+PB_t(300,186,"Quadrat placed at equal intervals",{s:10.5}),
 "A quadrat is placed at regular intervals along a line transect. The plants in each quadrat are counted or the percentage cover is estimated.","Line transect with quadrats");

/* celery in dye */
FIGS.PB_CELERY=()=>PB_fig("0 0 440 220",
 `<path d="M80 20q6 20 4 60M92 20q-2 30 2 60M104 20q6 14 4 60" stroke="${PB_GR}" stroke-width="5" fill="none"/>`+
 `<ellipse cx="82" cy="18" rx="22" ry="8" style="fill:${PB_GR}" fill-opacity=".6"/><ellipse cx="108" cy="16" rx="20" ry="8" style="fill:${PB_GR}" fill-opacity=".6"/>`+
 `<path d="M86 80L86 150" stroke="${PB_GR}" stroke-width="16" fill="none"/>`+PB_l(86,84,86,176,{s:PB_BD,w:3})+
 PB_r(40,130,100,76,{rx:4})+PB_r(42,150,96,54,{f:PB_BD,op:.35,s:"none"})+PB_t(90,218,"Beaker of dye solution",{s:10.5,b:1})+
 PB_c(300,100,48,{f:"#C9E5B5",op:.7})+[[0,-26],[22,-14],[22,14],[0,26],[-22,14],[-22,-14]].map(p=>PB_c(300+p[0],100+p[1],6,{f:PB_BD,op:.7,w:1})).join("")+
 PB_t(300,170,"Cross-section: stained xylem",{s:11,b:1})+PB_t(300,184,"vessels show where water travels",{s:10.5})+PB_t(300,40,"Cut the stalk and look",{s:11,b:1})+PB_t(300,54,"inside after several hours",{s:10.5}),
 "A celery stalk stands in coloured water. The dye rises in the xylem, so the stained strands show the route taken by water.","Celery stalk standing in dye with a stained cross-section");

/* tropism box */
FIGS.PB_TROP=()=>PB_fig("0 0 440 210",PB_mk("tr1",PB_AM)+
 PB_r(130,50,200,130,{rx:4})+PB_r(130,90,6,40,{f:"var(--bg,#fff)",s:"none"})+PB_l(130,90,130,130,{s:PB_AM,w:3})+
 [0,1,2].map(i=>PB_l(20,90+i*18,126,104+i*8,{s:PB_AM,w:1.5,m:"tr1",d:"5 3"})).join("")+PB_t(70,76,"Light from",{s:11,b:1})+PB_t(70,89,"one side only",{s:11,b:1})+
 [190,250,300].map(x=>`<path d="M${x} 180Q${x} 130 ${x-14} 100" stroke="${PB_GR}" stroke-width="4" fill="none"/>`).join("")+
 PB_t(230,200,"Seedling shoots bend towards the light (positive phototropism)",{s:11}),
 "Seedlings in a box with a small opening: the shoots grow towards the light. A second set on a klinostat or turned on their side shows geotropism.","Phototropism investigation in a box with one opening");

const PRAC_BIO=[];
const PB_SK={pl:'Planning',mm:'Manipulating and measuring',or:'Observing and recording',pd:'Presenting data',ae:'Analysing and evaluating'};

PRAC_BIO.push({id:'b-microscope-onion',unit:2,title:'Using a light microscope: onion epidermis and cheek cells',level:'Both',time:'80 min',
aim:'To prepare temporary slides, focus a light microscope, make a labelled drawing and calculate magnification.',
summary:'Learners stain and observe plant and animal cells, draw one cell with a ruler-measured line and calculate the magnification of the drawing.',
skills:[PB_SK.mm,PB_SK.or,PB_SK.ae],
apparatus:['Light microscope with x4, x10 and x40 objectives','2 microscope slides and 2 coverslips','Forceps and mounted needle','Dropper pipette','Filter paper or paper towel','Sharp pencil and 30 cm ruler','Clean cotton bud (for cheek cells, optional)'],
materials:[{item:'Onion bulb scale (inner layer)',amount:'1 piece about 1 cm square'},{item:'Iodine solution in potassium iodide (dilute)',amount:'5 cm³'},{item:'Methylene blue or dilute iodine (cheek cells)',amount:'2 cm³'},{item:'Distilled water',amount:'10 cm³'}],
hazards:[{hazard:'Iodine solution',risk:'Stains skin and clothing, harmful if swallowed',control:'Wear eye protection, wipe up spills, wash hands afterwards'},{hazard:'Glass slides and coverslips',risk:'Cuts from broken glass',control:'Handle carefully; broken glass to the teacher for disposal in the glass bin'},{hazard:'Cheek cells (optional)',risk:'Cross-contamination from body fluids',control:'Each learner uses only their own cotton bud and slide; discard in disinfectant. Teacher may replace with prepared slides.'}],
method:['Place one drop of water on a clean slide.','Use forceps to peel a very thin transparent layer from the inside curve of the onion scale and lay it flat in the drop of water.','Add one drop of dilute iodine solution on top of the tissue.','Hold a coverslip at 45° to the slide with the mounted needle supporting it, then lower it slowly to avoid trapping air bubbles.','Blot any excess liquid from the edges with filter paper.','Place the slide on the stage, start with the lowest power objective and focus using the coarse focus then the fine focus.','Move to the x10 and then the x40 objective, focusing only with the fine focus knob.','Choose one clear cell and make a large pencil drawing (at least 8 cm wide) showing the cell wall, cytoplasm and nucleus. Use sharp continuous lines and no shading.','Measure the width of your drawing in mm with a ruler and the actual cell width from the calculation in step 10.','Calculate magnification = drawing size ÷ actual size. If a scale bar is provided, measure it and use it. Record the objective lens power used.'],
variables:{independent:'Type of cell (plant or animal) or objective lens used',dependent:'Cell structures seen and size of drawing',controlled:['Thickness of tissue','Stain used','Same microscope']},
results:{columns:[{name:'Cell type'},{name:'Objective lens',unit:'x'},{name:'Drawn width',unit:'mm'},{name:'Actual width',unit:'µm'},{name:'Magnification',unit:'x',calc:'drawn width ÷ actual width (convert units)'}],rows:3,notes:'Include the labelled drawing with a title and the magnification written beneath it.'},
questions:[{q:'Why must the onion tissue be very thin?',a:'Light must pass through the specimen so that structures can be seen; thick tissue blocks light and cells overlap.',marks:2},{q:'State the purpose of the iodine solution.',a:'It stains the cell structures (the nucleus and cell wall), making them easier to see.',marks:1},{q:'Why is the coverslip lowered slowly at an angle?',a:'To avoid trapping air bubbles which would obscure the cells.',marks:1},{q:'A cell is drawn 45 mm wide. Its actual width is 90 µm. Calculate the magnification.',a:'45 mm = 45 000 µm; 45 000 ÷ 90 = ×500.',marks:2},{q:'Name two structures visible in onion cells that are not visible in cheek cells.',a:'Cell wall; large permanent vacuole (also chloroplasts are not in onion but are in leaf cells).',marks:2}],
evaluation:['Describe one source of error when measuring the cell width and suggest an improvement.','How could you improve the clarity of the drawing?','Why is it difficult to measure the actual size of a cell accurately under a light microscope?'],
teacher:{prep:['Cut onion scales into 1 cm squares just before the lesson; keep in water','Dilute iodine to a pale straw colour','Prepared slides as a backup','Check each microscope has a working lamp and clean lenses'],expected:'Onion cells appear as long rectangular cells in brick-like arrangement, nucleus stained brown-yellow near the cell wall. Typical cell length 200–400 µm. Cheek cells are small flattened and rounded with a central nucleus (about 50 µm).',disposal:['Slides and coverslips into a labelled sharps/glass container','Soak cotton buds in disinfectant before disposal','Wipe stage and lenses clean with lens tissue'],problems:['Bubbles under the coverslip: re-do the slide with slower lowering','Too many layers of onion: peel thinner','Learners using coarse focus at x40 risks breaking the slide','Drawings with shading or overlapping lines: model good style'],timing:'10 min set-up, 25 min onion slide, 20 min cheek cells or prepared slide, 25 min drawing and calculations.'},
exam:[{q:'A student viewed a plant cell under a microscope. The image of the cell was 60 mm long. The real length was 0.12 mm. Calculate the magnification.',marks:2,ms:['60 ÷ 0.12 (1)','×500 (1)']},{q:'Describe how to prepare a temporary slide of onion epidermis.',marks:4,ms:['Place a drop of water on the slide (1)','Peel thin layer of epidermis with forceps (1)','Add stain / iodine (1)','Lower coverslip at an angle to avoid air bubbles (1)']},{q:'Explain why the student should start observing with the lowest power objective.',marks:2,ms:['Larger field of view makes the specimen easier to find (1)','Reduces the risk of the lens hitting / breaking the slide (1)']}],diagram:''});

PRAC_BIO.push({id:'b-osmosis-potato',unit:3,title:'Osmosis in potato cylinders',level:'Both',time:'80 min',
aim:'To investigate the effect of sucrose concentration on the mass of potato tissue and to find the concentration at which there is no net water movement.',
summary:'Potato cylinders are placed in sucrose solutions of different concentration, and the percentage change in mass is plotted to find the isotonic point.',
skills:[PB_SK.pl,PB_SK.mm,PB_SK.or,PB_SK.pd,PB_SK.ae],
apparatus:['4 beakers or boiling tubes labelled A–D','Cork borer (7 mm) and white tile','Scalpel or knife','Top-pan balance (0.01 g)','Measuring cylinder 25 cm³','Paper towel','Ruler','Timer','Marker pen'],
materials:[{item:'Large potato',amount:'1 per group'},{item:'Distilled water',amount:'50 cm³'},{item:'Sucrose solution 0.2 mol/dm³',amount:'50 cm³'},{item:'Sucrose solution 0.4 mol/dm³',amount:'50 cm³'},{item:'Sucrose solution 0.6 mol/dm³',amount:'50 cm³'}],
hazards:[{hazard:'Cork borer and scalpel',risk:'Cuts to hands',control:'Cut away from the body on a tile; teacher demonstrates technique'},{hazard:'Spilt sucrose',risk:'Slippery floor',control:'Mop up spills immediately'}],
method:['Label four beakers A to D and add 20 cm³ of distilled water, 0.2, 0.4 and 0.6 mol/dm³ sucrose respectively.','Use the cork borer to cut 12 potato cylinders. Trim them all to 40 mm using the ruler.','Blot each cylinder dry and weigh three cylinders together. Record as initial mass for beaker A.','Repeat to make four groups of three cylinders, recording each initial mass.','Place each group into its beaker, making sure all the potato is covered.','Leave for 30 minutes (or longer if time allows), gently swirling every 10 minutes.','Remove the cylinders, blot dry with paper towel in the same way for each and reweigh.','Calculate the change in mass and percentage change = (final − initial) ÷ initial × 100.','Plot percentage change in mass against sucrose concentration. Where the line crosses zero is the concentration of the potato cell sap.'],
variables:{independent:'Sucrose concentration (mol/dm³)',dependent:'Percentage change in mass of potato cylinders',controlled:['Volume of solution','Time in solution','Temperature','Same potato and cylinder size','Number of cylinders','Method of blotting']},
results:{columns:[{name:'Sucrose concentration',unit:'mol/dm³'},{name:'Initial mass',unit:'g'},{name:'Final mass',unit:'g'},{name:'Change in mass',unit:'g',calc:'final − initial'},{name:'% change in mass',unit:'%',calc:'change ÷ initial × 100'}],rows:4,repeats:3,graph:{x:0,y:4,type:'line',xLabel:'Sucrose concentration (mol/dm³)',yLabel:'Percentage change in mass (%)'}},
questions:[{q:'Explain why the cylinders in distilled water gained mass.',a:'The water potential outside is higher than inside the cells, so water moved into the potato cells by osmosis.',marks:2},{q:'Explain why the cylinders in 0.6 mol/dm³ sucrose lost mass.',a:'The solution has a lower water potential than the cells, so water leaves the cells by osmosis down its concentration gradient.',marks:2},{q:'What does the point where the graph crosses 0% show?',a:'No net movement of water: the solution and the potato cell sap have the same water potential (isotonic).',marks:2},{q:'Why were percentage changes used instead of the change in mass?',a:'Starting masses differ, so percentages allow a fair comparison.',marks:1},{q:'State two ways of improving the reliability of the results.',a:'Repeat and calculate a mean; use more cylinders per beaker; use more concentrations.',marks:2}],
evaluation:['Identify the main sources of error in the method.','How could the precision of the isotonic point be improved?','Why might different potatoes give different results?'],
teacher:{prep:['Make 1.0 mol/dm³ sucrose stock (342 g per dm³) and dilute','Potatoes cut by learners; same potato for all groups','Provide spare cylinders'],expected:'Distilled water: about +15 to +25%. 0.2: +5 to +10%. 0.4: −5 to −12%. 0.6: −15 to −25%. Isotonic point about 0.25–0.35 mol/dm³.',disposal:['Solutions down the sink with water','Potato to compost or food waste'],problems:['Surface water not blotted equally','Cylinders of different length: check with a ruler','Time too short: extend to one hour or overnight'],timing:'20 min preparation, 30 min soaking (use the time for discussion), 30 min reweighing and calculation.'},
exam:[{q:'A student placed potato cylinders in sucrose solutions. Explain the results shown in a graph where mass increased in 0.1 mol/dm³ and decreased in 0.5 mol/dm³.',marks:4,ms:['Low concentration: water potential outside higher than inside (1)','Water enters cells by osmosis (1)','High concentration: water potential outside lower than inside (1)','Water leaves cells by osmosis so mass decreases (1)']},{q:'Name two variables to control in this investigation.',marks:2,ms:['Volume of solution / temperature (1)','Time in solution / size of cylinder (1)']},{q:'Describe how the student could find the concentration of the potato cell sap.',marks:2,ms:['Plot graph of % change against concentration (1)','Read concentration where line crosses 0% change (1)']}],diagram:'PB_OSMO'});

PRAC_BIO.push({id:'b-diffusion-agar',unit:3,title:'Diffusion and surface area to volume ratio using agar cubes',level:'Both',time:'80 min',
aim:'To investigate how the size of a cube affects the rate at which acid diffuses into agar.',
summary:'Cubes of agar containing alkali and indicator are timed in dilute acid until the colour disappears, linking diffusion distance with surface area to volume ratio.',
skills:[PB_SK.pl,PB_SK.mm,PB_SK.or,PB_SK.pd,PB_SK.ae],
apparatus:['Agar block containing phenolphthalein and dilute sodium hydroxide (pink)','Scalpel or knife and white tile','Ruler','3 beakers','Stopwatch','Forceps','Measuring cylinder 50 cm³'],
materials:[{item:'Dilute hydrochloric acid 0.1 mol/dm³',amount:'150 cm³'},{item:'Pink agar slab 3 cm thick',amount:'1 per group'}],
hazards:[{hazard:'Dilute hydrochloric acid (0.1 mol/dm³)',risk:'Low hazard; may irritate eyes',control:'Wear eye protection'},{hazard:'Sodium hydroxide in the agar (very dilute)',risk:'Irritant to eyes',control:'Wear eye protection, do not touch your face'},{hazard:'Scalpel',risk:'Cuts',control:'Cut on a tile, away from the body'}],
method:['Cut three cubes from the pink agar: 1 cm, 2 cm and 3 cm sides.','Place 50 cm³ dilute hydrochloric acid in each of three beakers.','Drop one cube into each beaker at the same time and start the stopwatch.','Gently turn each cube with forceps every 30 seconds.','Record the time taken for the pink colour to disappear completely.','Calculate the surface area (6 × side²) and volume (side³) of each cube and the SA:V ratio.','Plot time against SA:V ratio.'],
variables:{independent:'Side length of cube (SA:V ratio)',dependent:'Time for the pink colour to disappear',controlled:['Concentration and volume of acid','Temperature','Source of agar','Same method of timing']},
results:{columns:[{name:'Cube side',unit:'cm'},{name:'Surface area',unit:'cm²',calc:'6 × side²'},{name:'Volume',unit:'cm³',calc:'side³'},{name:'SA:V ratio',calc:'SA ÷ V'},{name:'Time for colour to vanish',unit:'s'}],rows:3,repeats:2,graph:{x:3,y:4,type:'scatter',xLabel:'Surface area to volume ratio',yLabel:'Time for colour to disappear (s)'}},
questions:[{q:'Calculate the SA:V ratio of a 2 cm cube.',a:'SA = 6 × 4 = 24 cm²; V = 8 cm³; ratio = 3:1.',marks:2},{q:'Explain why the small cube changed colour fastest.',a:'It has the largest SA:V ratio and a short diffusion distance to its centre.',marks:2},{q:'What type of movement is the acid taking into the agar?',a:'Diffusion down a concentration gradient.',marks:1},{q:'Relate the results to the need for specialised exchange surfaces in large organisms.',a:'Large organisms have small SA:V ratios, so diffusion alone is too slow; they need lungs, gills and circulatory systems.',marks:2},{q:'State one safety precaution.',a:'Wear eye protection.',marks:1}],
evaluation:['Suggest one source of error when judging that the pink colour has "just disappeared".','How could the experiment be made more quantitative?'],
teacher:{prep:['Make agar with 3 g agar powder in 200 cm³ water, add a few drops of phenolphthalein and dilute NaOH until pink, pour 3 cm deep','Cut cubes with a sharp blade; check sides carefully'],expected:'1 cm cube about 2–4 min, 2 cm about 8–14 min, 3 cm about 15–25 min.',disposal:['Agar into household waste; acid solutions down the sink with plenty of water'],problems:['Agar blocks too soft: refrigerate before cutting','End-point hard to judge: use a white tile as background'],timing:'Cube preparation 15 min, run 30 min, analysis 25 min.'},
exam:[{q:'A cube has sides of 3 cm. Calculate its surface area to volume ratio.',marks:2,ms:['SA 54 cm² and V 27 cm³ (1)','Ratio 2:1 (1)']},{q:'Explain why a small agar cube changes colour faster than a large cube.',marks:3,ms:['Larger SA:V ratio (1)','Shorter diffusion distance (1)','Faster diffusion of acid to the centre (1)']}],diagram:'PB_AGAR'});

PRAC_BIO.push({id:'b-food-tests',unit:4,title:'Food tests: starch, reducing sugars, protein and fats',level:'Both',time:'80 min',
aim:'To carry out standard food tests on unknown samples and identify the nutrients present.',
summary:'Learners test unknown food samples with iodine, Benedict\'s, biuret and ethanol emulsion tests and record colour changes.',
skills:[PB_SK.mm,PB_SK.or,PB_SK.pd,PB_SK.ae],
apparatus:['Test tubes in rack (at least 8)','Dropper pipettes','Water bath at 80 °C or beaker with kettle water','Thermometer','Test-tube holder','Spotting tile','Eye protection','Marker pen','Mortar and pestle for solid foods'],
materials:[{item:'Iodine solution',amount:'5 cm³'},{item:"Benedict's solution",amount:'10 cm³'},{item:'Biuret reagent (or dilute sodium hydroxide + 1% copper sulfate)',amount:'10 cm³'},{item:'Absolute ethanol',amount:'10 cm³'},{item:'Distilled water',amount:'50 cm³'},{item:'Food samples: glucose solution, starch suspension, egg white, vegetable oil, milk, fruit juice',amount:'5 cm³ each'}],
hazards:[{hazard:'Ethanol',risk:'Highly flammable',control:'No naked flames; use water baths from a kettle'},{hazard:"Benedict's solution",risk:'Irritant, harmful if swallowed',control:'Eye protection'},{hazard:'Biuret reagent (sodium hydroxide)',risk:'Corrosive to eyes and skin',control:'Eye protection, wash splashes with plenty of water'},{hazard:'Hot water bath',risk:'Scalds',control:'Use test-tube holders, keep the bath away from edges'},{hazard:'Food allergies',risk:'Allergic reaction',control:'Check allergies before using real foods (nuts, egg, milk); never taste in the laboratory'}],
method:['Starch test: place 2 cm³ of sample on a spotting tile and add 2 drops of iodine. Blue-black means starch is present.',"Reducing sugar test: add 2 cm³ sample and 2 cm³ Benedict's solution to a test tube. Heat in the 80 °C water bath for 3 minutes. Record the final colour.",'Protein test: add 2 cm³ sample and 2 cm³ biuret reagent. Mix and record the colour (blue = absent, purple = present).','Fat test: add 2 cm³ sample and 2 cm³ ethanol. Shake, then pour into 2 cm³ of water. A cloudy white emulsion means fat is present.','Repeat all four tests for each sample, labelling each tube clearly.','Test an unknown sample and write a conclusion about which nutrients it contains.'],
variables:{independent:'Food sample tested',dependent:'Colour or appearance after adding each reagent',controlled:['Volume of food sample','Volume of reagent','Temperature and time of heating']},
results:{columns:[{name:'Food sample'},{name:'Starch (iodine)'},{name:'Reducing sugar (Benedict\'s)'},{name:'Protein (biuret)'},{name:'Fat (ethanol)'}],rows:6,notes:'Record the colour seen and the conclusion for each test.'},
questions:[{q:'State the colour change for a positive starch test.',a:'Brown/orange iodine turns blue-black.',marks:1},{q:"Describe the colours seen in Benedict's test from none to a high amount of reducing sugar.",a:'Blue → green → yellow → orange → brick red.',marks:2},{q:'Why is a control (distilled water) tested?',a:'To show the reagent does not change colour by itself and to compare colours.',marks:1},{q:'A sample gave a purple colour with biuret. State what this shows.',a:'Protein is present.',marks:1},{q:'Explain why ethanol is not heated over a naked flame.',a:'It is flammable.',marks:1}],
evaluation:["Explain why Benedict's test is only semi-quantitative.",'How could you compare the sugar content of two foods more accurately?'],
teacher:{prep:['Make 5% glucose solution, 1% starch suspension (boil and cool), dilute egg white 1:10 with water, vegetable oil','Water baths at 80 °C from a kettle','Check allergy list'],expected:'Glucose: brick red Benedict\'s; starch: blue-black; egg white: purple biuret; oil: white emulsion; milk: protein, fat and reducing sugar (lactose) positive.',disposal:['Reagents into labelled waste bottle or flush with large amounts of water as school policy allows'],problems:['Insufficient heating: wait the full 3 minutes','Dirty tubes give false positives'],timing:'15 min introduction, 45 min tests, 20 min conclusions.'},
exam:[{q:'Describe how to test a food for the presence of reducing sugar.',marks:4,ms:["Add Benedict's solution (1)",'Heat in a water bath / hot water (1)','Heat for several minutes at about 80 °C (1)','Colour changes from blue to green/yellow/orange/brick red if sugar present (1)']},{q:'A food gave a blue-black colour with iodine and a purple colour with biuret. State what it contains.',marks:2,ms:['Starch (1)','Protein (1)']}],diagram:'PB_FOOD'});

PRAC_BIO.push({id:'b-vitamin-c-dcpip',unit:4,title:'Vitamin C content of fruit juices using DCPIP',level:'Extended',time:'80 min',
aim:'To compare the vitamin C content of different fruit juices by timing or counting drops that decolourise DCPIP.',
summary:'Fruit juice is added drop by drop to blue DCPIP until it becomes colourless; fewer drops mean more vitamin C.',
skills:[PB_SK.pl,PB_SK.mm,PB_SK.or,PB_SK.pd,PB_SK.ae],
apparatus:['Burette or 1 cm³ syringe','Small beaker or test tube','2 cm³ pipette','Stirring rod','White tile','Beakers for juices','Marker'],
materials:[{item:'DCPIP solution 0.1%',amount:'20 cm³'},{item:'Ascorbic acid 1% (standard)',amount:'10 cm³'},{item:'Fruit juices: orange, apple, lemon, blackcurrant',amount:'20 cm³ each'}],
hazards:[{hazard:'DCPIP',risk:'Stains skin and clothing',control:'Wear gloves/eye protection'},{hazard:'Fruit juice',risk:'Allergies',control:'Check class allergy list'}],
method:['Pipette 2 cm³ of DCPIP into a clean test tube.','Fill the burette with 1% ascorbic acid solution.','Add the ascorbic acid drop by drop, shaking after each drop, until the blue colour just disappears. Record the volume.','Repeat three times and calculate the mean volume of ascorbic acid solution needed (the standard).','Repeat steps 1–4 for each fruit juice (filter cloudy juices).','Calculate relative vitamin C content = (volume of standard ÷ volume of juice) × concentration of standard.'],
variables:{independent:'Type of fruit juice',dependent:'Volume of juice needed to decolourise DCPIP',controlled:['Volume of DCPIP','Concentration of DCPIP','Temperature','Same method of mixing','Same endpoint colour']},
results:{columns:[{name:'Solution'},{name:'Volume 1',unit:'cm³'},{name:'Volume 2',unit:'cm³'},{name:'Volume 3',unit:'cm³'},{name:'Mean volume',unit:'cm³'},{name:'Vitamin C',unit:'mg/cm³',calc:'volume of standard ÷ mean volume × 10'}],rows:5,graph:{x:0,y:5,type:'bar',xLabel:'Juice',yLabel:'Vitamin C content (mg/cm³)'}},
questions:[{q:'State the colour change when vitamin C is added to DCPIP.',a:'Blue to colourless.',marks:1},{q:'Why is a standard ascorbic acid solution used?',a:'It allows a calibration so that juice volumes can be converted to vitamin C concentration.',marks:2},{q:'Why does a juice that needs a smaller volume have more vitamin C?',a:'It contains a higher concentration of vitamin C, so less is needed to decolourise the same amount of DCPIP.',marks:2},{q:'Suggest why the same endpoint colour must be used each time.',a:'Judging the end-point is subjective; consistency ensures valid comparison.',marks:1},{q:'Why might heating a juice reduce the result?',a:'Vitamin C is destroyed by heat / is oxidised.',marks:1}],
evaluation:['Describe the main limitation in judging the end-point.','How could the effect of storage time on vitamin C be investigated?'],
teacher:{prep:['0.1% DCPIP: 0.1 g in 100 cm³ water, store dark','1% ascorbic acid: 1 g in 100 cm³ (freshly made)','Filter coloured juices through muslin'],expected:'Ascorbic acid (1%) about 0.5–1.0 cm³; orange juice about 1.0–2.0 cm³; apple juice more than 4 cm³.',disposal:['Down the sink with water; keep DCPIP away from clothing'],problems:['Old DCPIP: results drift','Coloured juices hide endpoint: dilute'],timing:'20 min set-up, 40 min tests, 20 min calculations.'},
exam:[{q:'State the chemical used in the test for vitamin C.',marks:1,ms:['DCPIP (1)']},{q:'Juice A required 2.0 cm³ and juice B 5.0 cm³ to decolourise the same volume of DCPIP. State which has more vitamin C and explain.',marks:2,ms:['Juice A (1)','Less volume needed so more concentrated vitamin C (1)']}],diagram:''});

PRAC_BIO.push({id:'b-catalase-peroxide',unit:5,title:'Catalase and hydrogen peroxide: rate of oxygen production',level:'Both',time:'80 min',
aim:'To investigate the effect of enzyme concentration or temperature on the rate of breakdown of hydrogen peroxide by catalase.',
summary:'Potato or liver catalase breaks down hydrogen peroxide; the volume of oxygen collected over time is measured and the rate calculated.',
skills:[PB_SK.pl,PB_SK.mm,PB_SK.or,PB_SK.pd,PB_SK.ae],
apparatus:['Conical flask 100 cm³ with one-hole bung and delivery tube','Measuring cylinder 100 cm³ or gas syringe','Trough or large bowl of water','Stopwatch','Measuring cylinder 25 cm³','Balance','Forceps','Mortar and pestle or grater','Water bath (for temperature version)'],
materials:[{item:'Hydrogen peroxide 10 volume (3%)',amount:'100 cm³'},{item:'Potato or fresh liver',amount:'20 g'},{item:'Buffer pH 7',amount:'20 cm³'},{item:'Distilled water',amount:'100 cm³'}],
hazards:[{hazard:'Hydrogen peroxide (3%)',risk:'Mild irritant, bleaches',control:'Wear eye protection; wash splashes off with water'},{hazard:'Raw liver',risk:'Bacteria',control:'Handle with forceps, wash hands, disinfect surfaces; use potato if preferred'},{hazard:'Glassware',risk:'Cuts',control:'Handle carefully'}],
method:['Set up the apparatus: fill a trough with water and invert a water-filled measuring cylinder over the end of the delivery tube.','Grate or crush potato and weigh 5 g portions.','Add 20 cm³ hydrogen peroxide to the flask.','Add the potato, immediately close the bung and start the stopwatch.','Record the volume of gas collected every 30 seconds for 5 minutes.','Repeat with different masses of potato (2, 5, 8, 10 g) or different temperatures of hydrogen peroxide (10, 20, 30, 40 °C).','Calculate the initial rate = volume ÷ time for the first minute, and plot rate against variable.'],
variables:{independent:'Mass of potato (enzyme concentration) or temperature',dependent:'Volume of oxygen produced per minute',controlled:['Volume and concentration of hydrogen peroxide','pH','Particle size of the potato','Time']},
results:{columns:[{name:'Mass of potato',unit:'g'},{name:'Volume at 1 min',unit:'cm³'},{name:'Volume at 3 min',unit:'cm³'},{name:'Volume at 5 min',unit:'cm³'},{name:'Initial rate',unit:'cm³/min',calc:'volume at 1 min ÷ 1'}],rows:5,graph:{x:0,y:4,type:'line',xLabel:'Mass of potato (g)',yLabel:'Initial rate (cm³/min)'}},
questions:[{q:'Write the word equation for the reaction.',a:'Hydrogen peroxide → water + oxygen (catalysed by catalase).',marks:2},{q:'Why do the bubbles slow down over time?',a:'Substrate (hydrogen peroxide) is used up, so the concentration falls.',marks:2},{q:'Why is potato ground up before use?',a:'It increases surface area so enzyme is released and the rate is faster.',marks:1},{q:'Explain the effect of temperature above 50 °C.',a:'The enzyme is denatured because its active site changes shape, so the substrate no longer fits.',marks:2},{q:'Why is gas collection by water displacement not perfectly accurate?',a:'Some oxygen dissolves in water; some is lost before the bung is placed.',marks:1}],
evaluation:['Suggest how to improve the accuracy of gas collection.','Why might the first reading be unreliable?'],
teacher:{prep:['Dilute 20-volume H₂O₂ 1:1 to make 10-volume, keep cold','Grate potato fresh each lesson','Water baths at the chosen temperatures'],expected:'5 g potato in 20 cm³ H₂O₂: 20–40 cm³ oxygen in 5 minutes. Rate increases with mass and temperature to about 35–40 °C then falls.',disposal:['Dilute peroxide down the sink with plenty of water; potato to food waste'],problems:['Foam rising into delivery tube: use a larger flask','Leaks at the bung: check seal'],timing:'20 min set-up, 40 min tests, 20 min graph.'},
exam:[{q:'Name the enzyme and the product that makes the gas in this reaction.',marks:2,ms:['Catalase (1)','Oxygen (1)']},{q:'Explain why the rate decreases above the optimum temperature.',marks:3,ms:['Enzyme denatured (1)','Active site changes shape (1)','Substrate no longer fits / fewer enzyme-substrate complexes (1)']},{q:'Describe how the student could measure the rate of reaction.',marks:2,ms:['Measure volume of gas collected in a set time (1)','Rate = volume ÷ time (1)']}],diagram:'PB_GAS'});

PRAC_BIO.push({id:'b-amylase-iodine',unit:5,title:'Amylase and starch: effect of temperature and pH',level:'Extended',time:'80 min',
aim:'To investigate how temperature or pH affects the time taken for amylase to digest starch.',
summary:'Samples of starch and amylase are mixed at set conditions, and iodine drops on a tile show the time at which starch has gone.',
skills:[PB_SK.pl,PB_SK.mm,PB_SK.or,PB_SK.pd,PB_SK.ae],
apparatus:['Water baths at 20, 30, 40, 50, 60 °C','Test tubes and rack','Spotting tile','Dropper pipettes','Stopwatch','Thermometer','Syringes 5 cm³','Buffer solutions pH 3, 5, 7, 9'],
materials:[{item:'Starch suspension 1%',amount:'100 cm³'},{item:'Amylase solution 1%',amount:'50 cm³'},{item:'Iodine solution',amount:'10 cm³'},{item:'Buffers pH 3–9',amount:'20 cm³ each'}],
hazards:[{hazard:'Iodine solution',risk:'Stains',control:'Eye protection'},{hazard:'Hot water baths',risk:'Scalds',control:'Use test-tube holders'},{hazard:'Amylase enzyme powder',risk:'May cause allergic reaction if inhaled',control:'Use prepared solutions; avoid raising dust'}],
method:['Place a drop of iodine in each well of a spotting tile.','Put 5 cm³ starch into a test tube and 2 cm³ amylase into another; place both in the water bath at 20 °C for 5 minutes.','Mix the two solutions and start the stopwatch.','Every 30 seconds, use a clean pipette to transfer one drop of the mixture to a fresh well of iodine.','Record the time at which iodine stays brown (no blue-black), meaning all starch is digested.','Repeat at 30, 40, 50 and 60 °C. For pH, repeat at 37 °C with 1 cm³ buffer added to the starch.','Calculate rate = 1 ÷ time (s⁻¹) and plot against temperature or pH.'],
variables:{independent:'Temperature (°C) or pH',dependent:'Time for starch to disappear',controlled:['Volume and concentration of starch','Volume and concentration of amylase','Volume of iodine drop','Method of sampling']},
results:{columns:[{name:'Temperature',unit:'°C'},{name:'Time for starch to disappear',unit:'s'},{name:'Rate',unit:'1/s',calc:'1 ÷ time'}],rows:5,repeats:2,graph:{x:0,y:2,type:'line',xLabel:'Temperature (°C)',yLabel:'Rate of reaction (1/s)'}},
questions:[{q:'Name the substrate and products.',a:'Substrate: starch; products: maltose (sugar).',marks:2},{q:'Why are the solutions kept at the temperature before mixing?',a:'So the reaction starts at the required temperature.',marks:1},{q:'Explain the shape of the graph at high temperature.',a:'Above the optimum the enzyme is denatured, so the rate drops to zero.',marks:2},{q:'State the optimum temperature from your results.',a:'About 40 °C (as found in your data).',marks:1},{q:'Why must a clean pipette be used each time?',a:'To avoid contamination carrying enzyme or starch to the tile.',marks:1}],
evaluation:['Why is it difficult to judge the exact end-point?','Suggest an improvement using a colorimeter.'],
teacher:{prep:['Cool boiled starch before use','Fresh amylase; label buffers','Check water baths'],expected:'Fast at 40 °C (1–3 min), slow at 20 °C (more than 10 min), no digestion at 60 °C. Optimum pH about 7.',disposal:['Down the sink with water'],problems:['Iodine tile contaminated','Enzyme inactive if old'],timing:'20 min preparation, 45 min tests, 15 min analysis.'},
exam:[{q:'Describe how to show that starch has been digested by amylase.',marks:3,ms:['Take samples at intervals (1)','Add to iodine (1)','Blue-black changes to brown / orange when starch is gone (1)']},{q:'Explain why digestion slows at low temperature.',marks:2,ms:['Molecules have less kinetic energy (1)','Fewer collisions between enzyme and substrate (1)']}],diagram:''});

PRAC_BIO.push({id:'b-leaf-starch',unit:6,title:'Photosynthesis: testing a leaf for starch',level:'Both',time:'80 min',
aim:'To show that light and chlorophyll are needed for photosynthesis by testing leaves for starch.',
summary:'A destarched plant leaf, partly covered or variegated, is boiled in ethanol and tested with iodine to show where starch has been made.',
skills:[PB_SK.mm,PB_SK.or,PB_SK.ae],
apparatus:['Beaker 250 cm³ (water bath)','Boiling tube','Forceps','Petri dish or white tile','Dropper','Heat source (electric hot plate or kettle)','Thermometer','Aluminium foil / black paper'],
materials:[{item:'Destarched potted plant (kept in dark 48 h) or geranium leaf with foil strip exposed to light 24 h',amount:'1 leaf per group'},{item:'Variegated leaf (e.g. Coleus)',amount:'1 per group'},{item:'Ethanol',amount:'20 cm³'},{item:'Iodine solution',amount:'5 cm³'}],
hazards:[{hazard:'Ethanol',risk:'Highly flammable',control:'Use an electric hot plate or heat water in a kettle; no naked flames'},{hazard:'Hot water',risk:'Scalds',control:'Use tongs, carry carefully'},{hazard:'Iodine solution',risk:'Staining',control:'Eye protection'}],
method:['Draw the leaf, shading green and white areas (variegated) or foil area.','Place the leaf in boiling water for 1 minute to kill it and soften the cell walls.','Turn off the heat. Place the leaf in a boiling tube of ethanol in the hot water bath until it is white (about 5–10 min).','Dip the leaf in warm water to soften it and spread it on a white tile.','Add iodine solution and observe for 2 minutes.','Draw the leaf again, showing the blue-black and brown areas.'],
variables:{independent:'Exposure of leaf area to light / presence of chlorophyll',dependent:'Blue-black (starch) colour of leaf area',controlled:['Same leaf','Time in light','Plant destarched']},
results:{columns:[{name:'Leaf area'},{name:'Colour after iodine'},{name:'Starch present? (yes/no)'}],rows:4,notes:'Include annotated drawings before and after.'},
questions:[{q:'Why was the plant kept in the dark beforehand?',a:'To use up existing starch (destarching) so any starch found was made during the investigation.',marks:2},{q:'Why was the leaf boiled in water?',a:'To kill the leaf, stop reactions and soften the cell membranes to let in iodine.',marks:2},{q:'Why is ethanol used?',a:'To remove chlorophyll so the colour change can be seen.',marks:1},{q:'What does a blue-black colour show?',a:'Starch is present, so photosynthesis had occurred.',marks:1},{q:'Explain the result for the white parts of a variegated leaf.',a:'No chlorophyll, so no photosynthesis, so no starch; iodine stays brown.',marks:2}],
evaluation:['Why is this test not a direct measure of the rate of photosynthesis?','Suggest a control for the foil experiment.'],
teacher:{prep:['Destarch plants 48 h in advance; foil on a leaf 24 h before test','Use water bath kettle for ethanol; no flames'],expected:'Green exposed area: blue-black; foil-covered area: brown; white areas of variegated leaf: brown.',disposal:['Ethanol into waste container; leaves to compost'],problems:['Leaf not decolourised: heat longer','Plant not properly destarched'],timing:'10 min set-up, 40 min test, 30 min discussion.'},
exam:[{q:'Describe the steps in testing a leaf for starch.',marks:4,ms:['Boil leaf in water (1)','Boil in ethanol in a water bath (1)','Rinse in water (1)','Add iodine; blue-black if starch present (1)']},{q:'State why ethanol must not be heated directly.',marks:1,ms:['Flammable (1)']}],diagram:''});

PRAC_BIO.push({id:'b-pondweed-light',unit:6,title:'Rate of photosynthesis: pondweed and light intensity',level:'Both',time:'80 min',
aim:'To investigate how light intensity (distance from a lamp) affects the rate of photosynthesis in pondweed.',
summary:'Bubbles of oxygen released from Elodea are counted in 1 minute at different distances from a lamp.',
skills:[PB_SK.pl,PB_SK.mm,PB_SK.or,PB_SK.pd,PB_SK.ae],
apparatus:['Elodea (pondweed) 10 cm piece','Lamp (LED preferred)','Large beaker of water or heat shield','Test tube','Metre rule','Stopwatch','Thermometer','Scissors'],
materials:[{item:'Sodium hydrogencarbonate solution 1%',amount:'250 cm³'},{item:'Pondweed',amount:'1 piece'}],
hazards:[{hazard:'Electric lamp',risk:'Heat, electric shock near water',control:'Keep wires and plugs away from water; use LED lamp'},{hazard:'Glass',risk:'Cuts',control:'Careful handling'}],
method:['Cut the stem of pondweed under water at an angle and place it upside down in a test tube of hydrogencarbonate solution.','Set the lamp 10 cm from the tube, with a beaker of water as heat shield in between.','Wait 2 minutes for the plant to adjust.','Count the bubbles released from the cut end in 1 minute.','Repeat at 20, 30, 40 and 50 cm. Take three readings at each distance.','Calculate the mean number of bubbles and plot against 1/distance² or distance.'],
variables:{independent:'Distance from lamp (cm)',dependent:'Bubbles produced per minute',controlled:['Temperature','Same pondweed','Hydrogencarbonate concentration','Lamp power']},
results:{columns:[{name:'Distance of lamp',unit:'cm'},{name:'Bubbles in 1 min (1)'},{name:'(2)'},{name:'(3)'},{name:'Mean bubbles',unit:'per min'}],rows:5,graph:{x:0,y:4,type:'line',xLabel:'Distance from lamp (cm)',yLabel:'Mean bubbles per minute'}},
questions:[{q:'Name the gas in the bubbles.',a:'Oxygen.',marks:1},{q:'Why is hydrogencarbonate added?',a:'It supplies carbon dioxide, so carbon dioxide is not limiting.',marks:1},{q:'Describe the relationship between distance and bubbles.',a:'As distance increases, light intensity falls, and the rate decreases.',marks:2},{q:'Why is a heat shield used?',a:'Heat from the lamp would raise temperature and change the rate by affecting enzymes.',marks:2},{q:'Suggest why the graph levels off at short distances.',a:'Another factor (carbon dioxide or temperature) becomes limiting.',marks:1}],
evaluation:['Describe one weakness of counting bubbles.','How can the volume of gas be measured instead?'],
teacher:{prep:['Pondweed illuminated 1 h before','Fresh 1% NaHCO₃ solution','Dim the room'],expected:'About 30–50 bubbles/min at 10 cm falling to 2–5 at 50 cm.',disposal:['Reuse pondweed; solution down the sink'],problems:['No bubbles: cut a fresh stem end','Variable bubble size: use a capillary tube or gas syringe'],timing:'15 min set-up, 40 min counting, 25 min graph.'},
exam:[{q:'State two factors that must be kept constant.',marks:2,ms:['Temperature (1)','Carbon dioxide concentration / size of pondweed (1)']},{q:'Explain why the rate decreases as the lamp is moved away.',marks:2,ms:['Light intensity decreases (1)','Light energy is limiting so less photosynthesis (1)']}],diagram:'PB_POND'});

PRAC_BIO.push({id:'b-transpiration-potometer',unit:8,title:'Transpiration: potometer and environmental factors',level:'Both',time:'80 min',
aim:'To measure the rate of water uptake by a shoot and investigate the effect of an environmental factor on transpiration.',
summary:'A potometer measures how far an air bubble moves as a leafy shoot takes up water, in still air, wind (fan) or humid conditions.',
skills:[PB_SK.pl,PB_SK.mm,PB_SK.or,PB_SK.pd,PB_SK.ae],
apparatus:['Potometer (capillary tube, rubber tubing, bung)','Leafy shoot','Basin of water','Ruler or scale','Stopwatch','Desk fan','Plastic bag','Vaseline'],
materials:[{item:'Fresh leafy shoot (e.g. Impatiens, privet)',amount:'1 per group'},{item:'Water',amount:'1 dm³'}],
hazards:[{hazard:'Glass capillary tubing',risk:'Cuts',control:'Handle carefully'},{hazard:'Electric fan',risk:'Shock near water',control:'Keep away from wet apparatus'}],
method:['Cut the shoot under water at an angle and keep the end under water.','Assemble the potometer under water, making sure there are no air bubbles in the tubing, then seal joints with Vaseline.','Remove from water and let the leaves dry. Introduce an air bubble into the capillary tube.','Mark the starting position of the bubble and record the distance moved in 5 minutes.','Repeat three times in still air.','Place the fan about 50 cm away and repeat (or enclose the shoot in a plastic bag to raise humidity).','Calculate mean distance moved per minute and compare conditions.'],
variables:{independent:'Wind speed (fan on/off) or humidity',dependent:'Distance moved by bubble in 5 minutes',controlled:['Same shoot','Temperature','Light intensity','Time']},
results:{columns:[{name:'Condition'},{name:'Distance 1',unit:'mm'},{name:'Distance 2',unit:'mm'},{name:'Distance 3',unit:'mm'},{name:'Mean rate',unit:'mm/min',calc:'mean ÷ 5'}],rows:3,graph:{x:0,y:4,type:'bar',xLabel:'Condition',yLabel:'Rate of water uptake (mm/min)'}},
questions:[{q:'Why is the shoot cut under water?',a:'To prevent air entering the xylem, which would break the water column.',marks:2},{q:'What does the movement of the bubble show?',a:'The volume of water taken up by the shoot, which is approximately equal to water lost by transpiration.',marks:2},{q:'Explain why the fan increases the rate.',a:'It removes water vapour from around the leaves, keeping a steep diffusion gradient.',marks:2},{q:'Why does water uptake not exactly equal transpiration?',a:'Some water is used for photosynthesis or stays in cells.',marks:1},{q:'Name the process by which water enters the root.',a:'Osmosis.',marks:1}],
evaluation:['Why is it difficult to ensure the apparatus is air-tight?','How could the rate be converted to a volume?'],
teacher:{prep:['Select leafy stems on the day','Check bubble at start; practise assembly under water'],expected:'Still air about 2–5 mm/min; with fan about 6–12 mm/min; in humid bag below 1 mm/min.',disposal:['Plants to compost'],problems:['Bubble stuck: re-form the bubble','Leaks from bung: reseal'],timing:'25 min assembly, 30 min readings, 25 min analysis.'},
exam:[{q:'Define transpiration.',marks:2,ms:['Loss of water vapour (1)','From leaves through stomata (1)']},{q:'Explain why a potometer is placed in a bright, warm and windy place to increase the rate.',marks:3,ms:['Light opens stomata (1)','Warmth increases evaporation (1)','Wind keeps diffusion gradient steep (1)']}],diagram:'PB_POTOM'});

PRAC_BIO.push({id:'b-stomata-peel',unit:8,title:'Stomata: leaf peel and counting',level:'Both',time:'40 min',
aim:'To make a nail-varnish leaf impression and count stomata on the upper and lower surfaces.',
summary:'A clear nail-varnish peel of leaf epidermis is viewed under the microscope and stomata per field of view are counted.',
skills:[PB_SK.mm,PB_SK.or,PB_SK.pd,PB_SK.ae],
apparatus:['Light microscope','Slide and coverslip','Clear sticky tape','Fine paintbrush','Forceps','Tally counter or paper'],
materials:[{item:'Clear nail varnish',amount:'1 small bottle per class'},{item:'Fresh leaf, e.g. Tradescantia or geranium',amount:'1 per group'}],
hazards:[{hazard:'Nail varnish',risk:'Flammable, irritant vapour',control:'Use in a ventilated room, no flames'}],
method:['Paint a small patch of clear varnish on the lower surface of the leaf and let it dry (5 minutes).','Press a piece of sticky tape over the patch, peel off, and mount on a slide.','Repeat on the upper surface.','View under x10 and x40. Count stomata in 5 different fields of view.','Calculate the mean number of stomata per field for each surface.','Draw two guard cells and the stoma.'],
variables:{independent:'Leaf surface (upper or lower)',dependent:'Number of stomata per field',controlled:['Same leaf','Objective lens','Area of field']},
results:{columns:[{name:'Field of view'},{name:'Stomata (upper)'},{name:'Stomata (lower)'}],rows:5,graph:{x:0,y:2,type:'bar',xLabel:'Field of view',yLabel:'Number of stomata'}},
questions:[{q:'Which surface had more stomata?',a:'The lower surface.',marks:1},{q:'Explain the advantage of this distribution.',a:'The lower surface is shaded and cooler so less water is lost by evaporation.',marks:2},{q:'Name the cells surrounding a stoma.',a:'Guard cells.',marks:1},{q:'Why were five fields counted?',a:'To get a mean and reduce the effect of random variation.',marks:1},{q:'State two functions of stomata.',a:'Allow carbon dioxide in and oxygen/water vapour out.',marks:2}],
evaluation:['Suggest why impressions could be inaccurate.'],
teacher:{prep:['Leaves fresh; test peel before the lesson'],expected:'Lower surface 10–30 stomata per x40 field; upper surface 0–5.',disposal:['Tape in the bin; leaves to compost'],problems:['Peel tears: use thinner varnish','Bubbles: press tape gently'],timing:'15 min preparation, 25 min counting.'},
exam:[{q:'Explain how guard cells control the opening of the stomata.',marks:3,ms:['Guard cells take in water and become turgid (1)','They bend, opening the pore (1)','Lose water, flaccid and close the pore (1)']}],diagram:''});

PRAC_BIO.push({id:'b-celery-xylem',unit:8,title:'Water transport in a celery stalk using dye',level:'Both',time:'40 min',
aim:'To show the pathway of water through a plant using a coloured dye and to identify the xylem.',
summary:'Celery stalks stand in food colouring; the dye rises up the xylem and stained vessels are seen in a cross-section.',
skills:[PB_SK.mm,PB_SK.or,PB_SK.ae],
apparatus:['Beaker 250 cm³','Scalpel/knife and tile','Ruler','Hand lens','Microscope (optional)'],
materials:[{item:'Celery stalk with leaves',amount:'1 per group'},{item:'Red or blue food colouring',amount:'10 cm³ in 200 cm³ water'}],
hazards:[{hazard:'Scalpel',risk:'Cuts',control:'Cut on a tile away from the body'},{hazard:'Food dye',risk:'Staining',control:'Wear a lab coat'}],
method:['Cut the base of a celery stalk and stand it in the dye solution.','Leave in a bright, warm place for 2–24 hours.','Measure the height the dye has risen on the outside of the stalk.','Cut thin transverse sections at intervals, look with a hand lens or microscope.','Draw the section showing stained strands (xylem).'],
variables:{independent:'Time in dye',dependent:'Height of dye',controlled:['Same stalk','Light and temperature']},
results:{columns:[{name:'Time',unit:'h'},{name:'Height of dye',unit:'cm'}],rows:5,graph:{x:0,y:1,type:'line',xLabel:'Time (h)',yLabel:'Height of dye (cm)'}},
questions:[{q:'Which tissue carries the dye?',a:'Xylem.',marks:1},{q:'What force moves the water upward?',a:'Transpiration pull from evaporation at the leaves.',marks:2},{q:'Why do the leaves become coloured?',a:'The dye reaches them with the transpiration stream.',marks:1},{q:'State two functions of xylem.',a:'Transport of water and mineral ions; support.',marks:2}],
evaluation:['Suggest how to measure the rate more accurately.'],
teacher:{prep:['Stand celery in water for 1 h before using'],expected:'Dye rises about 5–10 cm in 2 hours in warm light.',disposal:['Down the sink'],problems:['No movement: cut a fresh base'],timing:'10 min set-up, observe later, 20 min analysis.'},
exam:[{q:'Describe how you would show that water moves up the xylem.',marks:3,ms:['Place stem in coloured water (1)','Leave for time (1)','Cut section and see stained xylem (1)']}],diagram:'PB_CELERY'});

PRAC_BIO.push({id:'b-germination',unit:16,title:'Conditions needed for germination',level:'Both',time:'40 min',
aim:'To investigate the effect of water, oxygen and temperature on seed germination.',
summary:'Seeds are placed in different conditions and the number germinating is counted over several days.',
skills:[PB_SK.pl,PB_SK.mm,PB_SK.or,PB_SK.pd,PB_SK.ae],
apparatus:['5 boiling tubes or petri dishes','Cotton wool','Marker','Refrigerator, warm room (25 °C)','Boiled cooled water','Oil'],
materials:[{item:'Cress or mustard seeds',amount:'50'},{item:'Boiled and cooled water',amount:'100 cm³'},{item:'Cooking oil',amount:'5 cm³'}],
hazards:[{hazard:'Seeds',risk:'Allergy; mould',control:'Wash hands; do not eat seeds; dispose of mouldy seeds in sealed bags'}],
method:['Label five tubes: A (moist, warm, air), B (dry, warm), C (moist, cold), D (boiled water with oil layer, warm), E (moist in dark, warm).','Place 10 seeds on cotton wool in each tube and add water as required.','Leave for 5 days, checking daily.','Count seeds germinating per tube.','Calculate % germination.'],
variables:{independent:'Condition (water, temperature, oxygen)',dependent:'Percentage germinated',controlled:['Seed type','Number of seeds','Time']},
results:{columns:[{name:'Tube'},{name:'Condition'},{name:'Seeds germinated'},{name:'% germination',unit:'%',calc:'germinated ÷ 10 × 100'}],rows:5,graph:{x:0,y:3,type:'bar',xLabel:'Tube',yLabel:'% germination'}},
questions:[{q:'Which conditions are needed for germination?',a:'Water, oxygen and a suitable temperature.',marks:3},{q:'Why is light not necessary?',a:'Seeds have food stores and do not photosynthesise until leaves form.',marks:1},{q:'Why was the water boiled?',a:'To remove dissolved oxygen.',marks:1},{q:'Why were ten seeds used in each tube?',a:'To give reliable results.',marks:1}],
evaluation:['Describe how to improve the reliability.'],
teacher:{prep:['Start seeds 5 days before the analysis lesson'],expected:'A: 8–10 germinate; B, C, D: 0–2.',disposal:['Seeds in bin'],problems:['Seeds go mouldy'],timing:'20 min set-up, daily checks, 20 min analysis.'},
exam:[{q:'Explain why seeds in boiled water covered with oil did not germinate.',marks:2,ms:['No oxygen (1)','Needed for aerobic respiration (1)']}],diagram:''});

PRAC_BIO.push({id:'b-respiration-seeds',unit:12,title:'Respiration in germinating seeds using hydrogencarbonate indicator',level:'Both',time:'40 min',
aim:'To show that living organisms respire and release carbon dioxide.',
summary:'Germinating seeds, boiled seeds and an empty tube are compared using hydrogencarbonate indicator.',
skills:[PB_SK.mm,PB_SK.or,PB_SK.ae],
apparatus:['3 boiling tubes with bungs and gauze platform','Dropper','Timer','Marker'],
materials:[{item:'Hydrogencarbonate indicator',amount:'10 cm³'},{item:'Germinating peas',amount:'10'},{item:'Boiled and cooled peas',amount:'10'}],
hazards:[{hazard:'Hydrogencarbonate indicator',risk:'Low hazard',control:'Eye protection'}],
method:['Put 2 cm³ indicator in each tube.','Place seeds on the gauze above the indicator in tube A (live), boiled seeds in tube B, and none in C.','Seal and leave for 2–24 hours.','Record the colour of the indicator at intervals.'],
variables:{independent:'Live seeds, boiled seeds, no seeds',dependent:'Colour of indicator',controlled:['Volume of indicator','Number of seeds','Temperature']},
results:{columns:[{name:'Tube'},{name:'Colour at start'},{name:'Colour after 24 h'}],rows:3},
questions:[{q:'State the colour change for carbon dioxide.',a:'Red to yellow.',marks:1},{q:'Why are boiled seeds used?',a:'To show the effect is caused by living seeds.',marks:1},{q:'What is the purpose of the empty tube?',a:'Control for air and indicator alone.',marks:1},{q:'Write the word equation for aerobic respiration.',a:'Glucose + oxygen → carbon dioxide + water (+ energy).',marks:2}],
evaluation:['Suggest how to measure the rate more precisely.'],
teacher:{prep:['Soak peas 24–48 h; boil one batch'],expected:'Tube A turns yellow; B and C stay red.',disposal:['Seeds to bin'],problems:['Insufficient respiration: leave overnight'],timing:'15 min set-up, observe later.'},
exam:[{q:'Explain why the indicator in tube A turned yellow.',marks:2,ms:['Seeds respire and release CO₂ (1)','CO₂ makes the solution acidic (1)']}],diagram:'PB_RESP'});

PRAC_BIO.push({id:'b-yeast-fermentation',unit:12,title:'Anaerobic respiration in yeast: effect of temperature',level:'Both',time:'80 min',
aim:'To investigate the effect of temperature on the rate of fermentation by yeast.',
summary:'Yeast and sugar solution are held at different temperatures and bubbles of carbon dioxide are counted.',
skills:[PB_SK.pl,PB_SK.mm,PB_SK.or,PB_SK.pd,PB_SK.ae],
apparatus:['Boiling tubes','Delivery tubes','Water baths at 20, 30, 40, 50, 60 °C','Thermometer','Stopwatch','Measuring cylinder'],
materials:[{item:'Dried yeast',amount:'5 g'},{item:'Glucose solution 5%',amount:'100 cm³'},{item:'Limewater',amount:'20 cm³'}],
hazards:[{hazard:'Limewater',risk:'Irritant to eyes',control:'Eye protection'},{hazard:'Hot water',risk:'Scalds',control:'Use holders'}],
method:['Mix 1 g yeast with 10 cm³ glucose and pour into a boiling tube.','Place the tube in the water bath at 20 °C for 5 minutes.','Connect the delivery tube into limewater (or count bubbles through a water trap).','Count bubbles in 2 minutes.','Repeat at each temperature and calculate bubbles per minute.'],
variables:{independent:'Temperature (°C)',dependent:'Bubbles per minute',controlled:['Mass of yeast','Volume and concentration of glucose','Time']},
results:{columns:[{name:'Temperature',unit:'°C'},{name:'Bubbles in 2 min'},{name:'Bubbles per min',calc:'÷2'}],rows:5,graph:{x:0,y:2,type:'line',xLabel:'Temperature (°C)',yLabel:'Bubbles per minute'}},
questions:[{q:'Name the gas produced.',a:'Carbon dioxide.',marks:1},{q:'Write the word equation for anaerobic respiration in yeast.',a:'Glucose → ethanol + carbon dioxide (+ energy).',marks:2},{q:'Explain why the rate is highest at about 40 °C.',a:'Enzymes work best at the optimum; more kinetic energy.',marks:2},{q:'Why does the rate fall at 60 °C?',a:'Enzymes are denatured.',marks:1}],
evaluation:['Suggest how to improve counting of bubbles.'],
teacher:{prep:['Activate yeast in warm sugar solution 10 minutes before'],expected:'Peak around 35–45 °C; almost none at 60 °C.',disposal:['Down the sink'],problems:['Bubbles too fast to count'],timing:'20 min set-up, 40 min runs, 20 min analysis.'},
exam:[{q:'State one use of anaerobic respiration by yeast.',marks:1,ms:['Brewing / baking (1)']}],diagram:'PB_YEAST'});

PRAC_BIO.push({id:'b-pulse-exercise',unit:12,title:'Effect of exercise on pulse rate and breathing rate',level:'Both',time:'40 min',
aim:'To investigate the effect of exercise on heart rate and breathing rate and to measure recovery time.',
summary:'Learners record pulse and breathing rate at rest, after gentle exercise, and every minute during recovery.',
skills:[PB_SK.pl,PB_SK.mm,PB_SK.or,PB_SK.pd,PB_SK.ae],
apparatus:['Stopwatch','Step or space for stepping on the spot','Pen and paper'],
materials:[{item:'None',amount:'-'}],
hazards:[{hazard:'Exercise',risk:'Injury, breathlessness',control:'Voluntary participation only; learners with medical conditions or asthma opt out; gentle exercise only; stop if unwell'}],
method:['Sit still for 3 minutes. Find the pulse at the wrist and count for 30 seconds then double it; record resting pulse.','Count breaths in 1 minute (resting).','Step on the spot or step up and down for 2 minutes.','Immediately record the pulse and breath rate.','Record every minute until values return to resting.','Repeat for 4 minutes of exercise if the class agrees.'],
variables:{independent:'Exercise (rest, after exercise)',dependent:'Pulse and breathing rate',controlled:['Same person','Type of exercise','Same time of day']},
results:{columns:[{name:'Time after exercise',unit:'min'},{name:'Pulse',unit:'beats/min'},{name:'Breaths',unit:'per min'}],rows:6,graph:{x:0,y:1,type:'line',xLabel:'Time after exercise (min)',yLabel:'Pulse (beats/min)'}},
questions:[{q:'Explain why pulse increases during exercise.',a:'Muscles need more oxygen and glucose, and carbon dioxide must be removed.',marks:2},{q:'Why does breathing rate increase?',a:'To take in more oxygen and remove more carbon dioxide.',marks:2},{q:'Define recovery time.',a:'Time for pulse to return to its resting rate.',marks:1},{q:'Why are untrained people slower to recover?',a:'Their heart and lungs are less efficient.',marks:1}],
evaluation:['Suggest why the pulse count could be inaccurate.'],
teacher:{prep:['Briefing on pulse location; check medical forms'],expected:'Resting 65–80; after 2 min stepping 110–140; recovery 3–6 minutes.',disposal:['None'],problems:['Pulse hard to find: use the carotid with care or an app'],timing:'10 min briefing, 20 min data, 10 min discussion.'},
exam:[{q:'Describe how to measure pulse rate.',marks:2,ms:['Count pulse at wrist/neck for a fixed time (1)','Convert to beats per minute (1)']}],diagram:''});

PRAC_BIO.push({id:'b-reaction-ruler',unit:14,title:'Reaction time using the ruler-drop test',level:'Both',time:'40 min',
aim:'To measure reaction time and investigate the effect of practice or distraction.',
summary:'A ruler is dropped and caught; distance caught is converted to reaction time.',
skills:[PB_SK.pl,PB_SK.mm,PB_SK.or,PB_SK.pd,PB_SK.ae],
apparatus:['30 cm ruler','Table and chair','Stopwatch (optional)'],
materials:[{item:'None',amount:'-'}],
hazards:[{hazard:'Falling ruler',risk:'Minor',control:'Sit down; do not throw the ruler'}],
method:['Partner holds ruler vertically with zero level with thumb of catcher.','Drops it without warning.','Catcher closes finger and thumb; record the distance in cm.','Repeat 10 times with each hand.','Repeat while counting backwards (distraction).','Convert distance to time using a calibration table.'],
variables:{independent:'Hand or distraction',dependent:'Distance caught / time',controlled:['Same ruler','Same height','Same person']},
results:{columns:[{name:'Trial'},{name:'Distance (normal)',unit:'cm'},{name:'Distance (distracted)',unit:'cm'}],rows:10,graph:{x:0,y:1,type:'line',xLabel:'Trial',yLabel:'Distance caught (cm)'}},
questions:[{q:'Describe the reflex pathway for catching.',a:'Receptor in eye → sensory neurone → brain → motor neurone → muscle.',marks:3},{q:'Why is the test repeated?',a:'To calculate a mean.',marks:1},{q:'Why is reaction time longer with distraction?',a:'The brain processes more information.',marks:1}],
evaluation:['Suggest improvements in measuring reaction time.'],
teacher:{prep:['Print the calibration table'],expected:'Normal distance 10–20 cm; distracted 15–25 cm.',disposal:['None'],problems:['Anticipation by catcher'],timing:'15 min data, 15 min analysis.'},
exam:[{q:'State one factor that affects reaction time.',marks:1,ms:['Fatigue / alcohol / age (1)']}],diagram:''});

PRAC_BIO.push({id:'b-tropisms',unit:14,title:'Phototropism and geotropism in seedlings',level:'Extended',time:'80 min',
aim:'To investigate how light and gravity affect the growth of shoots and roots.',
summary:'Seedlings are grown in a box with a light source on one side and in horizontal tubes to observe bending.',
skills:[PB_SK.pl,PB_SK.mm,PB_SK.or,PB_SK.ae],
apparatus:['Cardboard box with window','Petri dishes with cotton wool','Cling film','Ruler','Protractor'],
materials:[{item:'Cress or mustard seeds',amount:'30'},{item:'Water',amount:'50 cm³'}],
hazards:[{hazard:'Seeds',risk:'Allergy',control:'Wash hands'}],
method:['Germinate seeds on moist cotton wool.','Place half of the seedlings in a dark box with one small window; the others in a dark box without a window.','Place a dish on its side so that seedlings are horizontal.','Leave for 3 days.','Measure the angle of curvature with a protractor.'],
variables:{independent:'Direction of light or gravity',dependent:'Angle of curvature',controlled:['Seeds','Temperature','Moisture']},
results:{columns:[{name:'Seedling'},{name:'Angle of bending',unit:'°'},{name:'Direction of bending'}],rows:6},
questions:[{q:'Define phototropism.',a:'Growth response of a plant to the direction of light.',marks:1},{q:'Explain how auxin causes bending.',a:'Auxin accumulates on the shaded side, causing more cell elongation there.',marks:3},{q:'Describe roots in a horizontal tube.',a:'Roots grow downwards (positive geotropism).',marks:1}],
evaluation:['Suggest how to measure the effect more accurately.'],
teacher:{prep:['Seedlings 3 days before'],expected:'Shoots bend towards light; roots bend downwards.',disposal:['Compost'],problems:['Seedlings dry'],timing:'30 min set-up, 3 days growth, 30 min measurement.'},
exam:[{q:'Explain the advantage of positive phototropism.',marks:2,ms:['Leaves receive more light (1)','More photosynthesis (1)']}],diagram:'PB_TROP'});

PRAC_BIO.push({id:'b-quadrat-transect',unit:19,title:'Sampling a habitat: quadrats and a line transect',level:'Both',time:'80 min',
aim:'To estimate the abundance and distribution of plants using quadrats along a transect.',
summary:'Quadrats are placed at regular intervals along a line to show how plant abundance changes across a gradient.',
skills:[PB_SK.pl,PB_SK.mm,PB_SK.or,PB_SK.pd,PB_SK.ae],
apparatus:['0.25 m² quadrat','30 m measuring tape','Identification key','Light meter (optional)','Clipboard'],
materials:[{item:'Local site with grass, shade and open areas',amount:'-'}],
hazards:[{hazard:'Outdoor work',risk:'Sun, insect stings, uneven ground',control:'Teacher risk assessment; sun protection; avoid hazardous plants; supervision'}],
method:['Lay out a 20 m tape from the hedge into the field.','Place a quadrat at 0 m, 2 m, 4 m... along the line.','Count the number of each species or estimate percentage cover in each quadrat.','Measure light intensity at each position.','Calculate the mean number per quadrat.','Plot a kite diagram or a line graph.'],
variables:{independent:'Distance along transect',dependent:'Abundance of a plant',controlled:['Quadrat size','Same observer','Time of day']},
results:{columns:[{name:'Distance',unit:'m'},{name:'Species A',unit:'count'},{name:'Species B',unit:'count'},{name:'Light',unit:'lux'}],rows:10,graph:{x:0,y:1,type:'line',xLabel:'Distance along transect (m)',yLabel:'Number per quadrat'}},
questions:[{q:'Why are quadrats placed randomly in an area sample?',a:'To avoid bias.',marks:1},{q:'Why is a transect used?',a:'To show change along an environmental gradient.',marks:2},{q:'Calculate population size: mean 6 plants per 0.25 m², area 100 m².',a:'6 ÷ 0.25 = 24 per m²; ×100 = 2400.',marks:2},{q:'Describe one limitation of sampling.',a:'May not represent the whole area.',marks:1}],
evaluation:['Suggest more quadrats and explain the effect.'],
teacher:{prep:['Visit the site beforehand; risk assessment'],expected:'Species distribution varies with light and trampling.',disposal:['Leave no litter'],problems:['Poor weather: simulate with a mock grid indoors'],timing:'20 min briefing, 45 min fieldwork, 15 min graph.'},
exam:[{q:'Describe how to estimate the population of daisies in a field.',marks:4,ms:['Use random quadrats (1)','Count the daisies in each (1)','Calculate mean (1)','Multiply by the area ÷ quadrat area (1)']}],diagram:'PB_QUAD'});

PRAC_BIO.push({id:'b-pitfall-pooter',unit:19,title:'Sampling ground invertebrates: pitfall traps and pooters',level:'Both',time:'80 min',
aim:'To sample and identify small invertebrates in two habitats and compare their diversity.',
summary:'Pitfall traps and pooters collect invertebrates, which are identified with a key and counted.',
skills:[PB_SK.pl,PB_SK.mm,PB_SK.or,PB_SK.ae],
apparatus:['Plastic cups','Trowel','Pooter','Identification chart','Hand lens','Petri dishes','Cover tiles'],
materials:[{item:'Cups buried flush with the ground',amount:'4 per site'}],
hazards:[{hazard:'Outdoor work',risk:'Stings or bites',control:'Supervised; wear gloves; avoid wasps; do not suck harmful material'},{hazard:'Animals',risk:'Harm to animals',control:'Handle gently and return to habitat'}],
method:['Bury 4 cups in each habitat and place cover.','Leave overnight.','Collect animals into petri dishes with a pooter.','Identify with a key and count.','Return animals to the site.','Calculate the number of species and the total number of animals.'],
variables:{independent:'Habitat',dependent:'Number and variety of invertebrates',controlled:['Number of traps','Time','Trap size']},
results:{columns:[{name:'Species'},{name:'Habitat A count'},{name:'Habitat B count'}],rows:8},
questions:[{q:'Why are animals returned after counting?',a:'Ethical treatment and conservation.',marks:1},{q:'Why is a cover placed above the trap?',a:'To keep out rain and give shelter.',marks:1},{q:'State one advantage of pitfall traps.',a:'Catch nocturnal ground animals.',marks:1}],
evaluation:['Suggest ways of improving the sample.'],
teacher:{prep:['Set traps the day before'],expected:'Woodland habitat usually has greater variety than a mown lawn.',disposal:['Release invertebrates at collection site'],problems:['Rain floods traps'],timing:'Set up one day before, 60 min analysis.'},
exam:[{q:'Describe how pitfall traps are used to sample ground animals.',marks:3,ms:['Bury container so rim is level with soil (1)','Leave for set time (1)','Count and identify catch (1)']}],diagram:''});

PRAC_BIO.push({id:'b-decay-lipase',unit:19,title:'Decay and enzymes: lipase and milk with indicator',level:'Extended',time:'80 min',
aim:'To investigate the effect of temperature on the digestion of fat by lipase using pH indicator.',
summary:'Milk with sodium carbonate and phenolphthalein is mixed with lipase; fatty acids lower the pH and the pink colour disappears.',
skills:[PB_SK.pl,PB_SK.mm,PB_SK.or,PB_SK.pd,PB_SK.ae],
apparatus:['Test tubes','Water baths at 20, 30, 40, 50 °C','Stopwatch','Syringes','Thermometer'],
materials:[{item:'Whole milk',amount:'25 cm³'},{item:'Sodium carbonate 0.05 mol/dm³',amount:'25 cm³'},{item:'Phenolphthalein indicator',amount:'2 cm³'},{item:'Lipase solution 5%',amount:'25 cm³'}],
hazards:[{hazard:'Phenolphthalein',risk:'Irritant',control:'Gloves/eye protection'},{hazard:'Sodium carbonate',risk:'Eye irritant',control:'Eye protection'}],
method:['Mix 5 cm³ milk, 7 cm³ sodium carbonate and 5 drops phenolphthalein to make pink.','Add 1 cm³ lipase and start the stopwatch.','Record the time for the pink colour to disappear.','Repeat at other temperatures.'],
variables:{independent:'Temperature (°C)',dependent:'Time for pink colour to disappear',controlled:['Volumes','Lipase concentration','pH indicator volume']},
results:{columns:[{name:'Temperature',unit:'°C'},{name:'Time',unit:'s'},{name:'Rate',unit:'1/s',calc:'1/time'}],rows:4,graph:{x:0,y:2,type:'line',xLabel:'Temperature (°C)',yLabel:'Rate (1/s)'}},
questions:[{q:'Why does the colour fade?',a:'Fatty acids released lower the pH.',marks:1},{q:'What does lipase digest?',a:'Fats into fatty acids and glycerol.',marks:2},{q:'Explain the effect of high temperature.',a:'Denaturation of lipase.',marks:2}],
evaluation:['Describe how to judge the end-point.'],
teacher:{prep:['Prepare indicator mixture','Water baths set up'],expected:'Fastest between 35–40 °C.',disposal:['Down the sink'],problems:['End-point judgement'],timing:'20 min set-up, 40 min runs, 20 min analysis.'},
exam:[{q:'State the products of fat digestion.',marks:2,ms:['Fatty acids (1)','Glycerol (1)']}],diagram:''});

PRAC_BIO.push({id:'b-antimicrobial-demo',unit:10,title:'Antimicrobial action and zone of inhibition (teacher demonstration / simulation)',level:'Extended',time:'40 min',
aim:'To interpret the effect of antiseptics or antibiotics on bacterial growth using pre-prepared plates or a simulation.',
summary:'Teacher-prepared plates with discs are examined (not opened) and zones of inhibition are measured; aseptic technique is described.',
skills:[PB_SK.or,PB_SK.pd,PB_SK.ae],
apparatus:['Sealed pre-prepared agar plates (or photographs)','Ruler (mm)','Marker'],
materials:[{item:'Sealed plates incubated by the teacher or technician at 25 °C',amount:'1 per group'}],
hazards:[{hazard:'Bacteria',risk:'Infection',control:'Plates are NOT opened by learners; sealed with tape; sterilised by autoclave afterwards; wash hands'},{hazard:'Antiseptic discs',risk:'Irritant',control:'Teacher handled'}],
method:['Observe the sealed plate and measure the diameter of each clear zone (mm).','Calculate area = πr².','Compare the zones for different antiseptics.','Describe aseptic techniques the teacher used.'],
variables:{independent:'Type or concentration of antiseptic',dependent:'Diameter of clear zone',controlled:['Agar thickness','Bacteria','Incubation time and temperature']},
results:{columns:[{name:'Disc'},{name:'Diameter of zone',unit:'mm'},{name:'Area',unit:'mm²',calc:'π × (d÷2)²'}],rows:4,graph:{x:0,y:2,type:'bar',xLabel:'Disc',yLabel:'Area of zone (mm²)'}},
questions:[{q:'What does the clear zone show?',a:'Bacteria did not grow because the agent killed or inhibited them.',marks:1},{q:'Why is the plate kept sealed?',a:'To prevent release of pathogens.',marks:1},{q:'Why must the plate be incubated below 30 °C in schools?',a:'To avoid growth of human pathogens.',marks:1},{q:'Which disc is most effective?',a:'The one with the largest zone.',marks:1}],
evaluation:['Suggest reasons for differences between plates.'],
teacher:{prep:['Plates prepared by qualified staff using CLEAPSS procedures; discs applied aseptically; sealed with two pieces of tape','Photographs as an alternative'],expected:'Zones 5–25 mm depending on agent.',disposal:['Autoclave or sterilise all plates unopened'],problems:['Contamination: discard'],timing:'20 min observation, 20 min analysis.'},
exam:[{q:'Explain why aseptic techniques are used.',marks:2,ms:['Prevent contamination by other microbes (1)','Prevent spread of pathogens to people (1)']}],diagram:''});

PRAC_BIO.push({id:'b-dna-extraction',unit:21,title:'Extracting DNA from fruit',level:'Extended',time:'40 min',
aim:'To extract visible DNA from strawberries or kiwi fruit.',
summary:'Fruit is mashed, detergent breaks membranes and cold ethanol precipitates DNA.',
skills:[PB_SK.mm,PB_SK.or,PB_SK.ae],
apparatus:['Zipper bag or mortar','Beaker','Filter funnel and muslin','Test tube','Glass rod'],
materials:[{item:'Strawberries',amount:'2'},{item:'Detergent + salt solution (10 cm³ detergent, 3 g salt, 90 cm³ water)',amount:'25 cm³'},{item:'Ice-cold ethanol',amount:'20 cm³'}],
hazards:[{hazard:'Ethanol',risk:'Flammable',control:'No flames; keep lid on'},{hazard:'Detergent',risk:'Irritant',control:'Eye protection'}],
method:['Mash strawberries in a bag.','Add detergent-salt solution and mix for 2 minutes.','Filter into a test tube.','Slowly pour cold ethanol down the side to form a layer.','Observe white stringy DNA at the interface.','Spool out with a glass rod.'],
variables:{independent:'Not applicable (qualitative)',dependent:'Amount of DNA seen',controlled:['Volume of fruit','Volumes of solutions']},
results:{columns:[{name:'Step'},{name:'Observation'}],rows:5},
questions:[{q:'State the function of detergent.',a:'Breaks cell membranes.',marks:1},{q:'Why is the ethanol cold?',a:'DNA precipitates better.',marks:1},{q:'Why are strawberries a good source?',a:'They are octoploid with large amounts of DNA.',marks:1}],
evaluation:['Describe how to improve the yield.'],
teacher:{prep:['Ethanol in freezer for 1 h'],expected:'White cloudy strands.',disposal:['Down the sink with water'],problems:['No DNA: too much detergent or warm ethanol'],timing:'10 min prep, 20 min practical.'},
exam:[{q:'Suggest why the detergent is added.',marks:2,ms:['Dissolves membranes (1)','Releases DNA (1)']}],diagram:''});
