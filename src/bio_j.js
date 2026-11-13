/* ===== Topic 21: Biotechnology and genetic modification (Biology 0610), original notes ===== */
const BJ_FG=(vb,inner,cap,label,maxw)=>`<figure class="fig"${maxw?` style="max-width:${maxw}px"`:""}><svg viewBox="${vb}" role="img" aria-label="${label}">${inner}</svg><figcaption>${cap}</figcaption></figure>`;
const BJ_T=(x,y,s,o)=>{o=o||{};return `<text x="${x}" y="${y}" font-size="${o.s||11}" text-anchor="${o.a||"middle"}"${o.b?' font-weight="700"':""}${o.i?' font-style="italic"':""} ${o.c?`style="fill:${o.c}"`:'fill="currentColor"'}>${s}</text>`};
const BJ_ARR=(x1,y1,x2,y2,col,w)=>{const a=Math.atan2(y2-y1,x2-x1),h=7,c=col||"currentColor";
  return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="${w||2}" fill="none"/><path d="M${x2} ${y2}l${(-h*Math.cos(a-.45)).toFixed(1)} ${(-h*Math.sin(a-.45)).toFixed(1)}M${x2} ${y2}l${(-h*Math.cos(a+.45)).toFixed(1)} ${(-h*Math.sin(a+.45)).toFixed(1)}" stroke="${c}" stroke-width="${w||2}" fill="none" stroke-linecap="round"/>`};
const BJ_BOX=(x,y,w,h,lines,o)=>{o=o||{};return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" ${o.f?`style="fill:${o.f}"`:'fill="none"'} stroke="currentColor" stroke-opacity=".6" stroke-width="1.4"/>`+lines.map((t,i)=>BJ_T(x+w/2,y+h/2+4-(lines.length-1)*7+i*14,t,{s:o.s||11,b:i===0&&o.b})).join("")};

/* bacterial cell */
FIGS.BJ_CELL=()=>{
  let s=`<path d="M110 30C60 30 40 60 40 90s20 60 70 60h140c50 0 70-30 70-60s-20-60-70-60z" style="fill:var(--mint)" stroke="currentColor" stroke-width="2.4"/>`;
  s+=`<path d="M120 38C75 38 52 62 52 90s23 52 68 52h130c45 0 68-24 68-52s-23-52-68-52z" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.2"/>`;
  s+=`<path d="M130 70c20-22 50-8 40 14s-40 36-20 50 60-6 50-30 30-40 46-18" fill="none" stroke="var(--accent)" stroke-width="3"/>`;
  s+=`<circle cx="238" cy="112" r="9" fill="none" stroke="var(--red)" stroke-width="2.4"/><circle cx="104" cy="112" r="7" fill="none" stroke="var(--red)" stroke-width="2.4"/><circle cx="196" cy="58" r="8" fill="none" stroke="var(--red)" stroke-width="2.4"/>`;
  s+=`<path d="M320 90c14-14 22 14 36 0s22 14 34 0" fill="none" stroke="currentColor" stroke-width="2"/>`;
  s+=BJ_T(8,18,"cell wall",{a:"start",s:10.5})+`<path d="M52 20L66 38" stroke="currentColor" stroke-width="1"/>`;
  s+=BJ_T(8,172,"cytoplasm",{a:"start",s:10.5})+`<path d="M52 164L84 118" stroke="currentColor" stroke-width="1"/>`;
  s+=BJ_T(150,18,"circular DNA (no nucleus)",{a:"start",s:10.5,c:"var(--accent)",b:1})+`<path d="M180 22L168 52" stroke="currentColor" stroke-width="1"/>`;
  s+=BJ_T(250,172,"plasmids",{a:"start",s:10.5,c:"var(--red)",b:1})+`<path d="M262 160L242 122" stroke="currentColor" stroke-width="1"/>`;
  s+=BJ_T(372,76,"flagellum",{s:10.5})+BJ_T(300,172,"",{});
  return BJ_FG("0 0 400 184",s,"A bacterial cell has no nucleus. Its DNA is a single loop plus small extra rings called plasmids, which can carry genes from one cell to another.","Bacterial cell with cell wall, cytoplasm, circular DNA, plasmids and a flagellum",480)};

/* genetic modification flow */
FIGS.BJ_GM=()=>{
  const st=[["1","Cut the human insulin gene out of human DNA","with a restriction enzyme (leaves sticky ends)"],["2","Cut a bacterial plasmid with the same enzyme","so it has matching sticky ends"],["3","Join the gene into the plasmid","DNA ligase seals it: a recombinant plasmid"],["4","Put the recombinant plasmid into bacteria","the bacteria are now genetically modified"],["5","Let the bacteria multiply in a fermenter","each new cell carries the gene"],["6","Bacteria make (express) human insulin","the protein is collected and purified"]];
  let s="";
  st.forEach((r,i)=>{const y=6+i*52;
    s+=`<rect x="8" y="${y}" width="344" height="40" rx="8" style="fill:${i%2?"var(--mint)":"var(--peach)"}" stroke="currentColor" stroke-opacity=".5" stroke-width="1.3"/>`;
    s+=`<circle cx="28" cy="${y+20}" r="11" style="fill:var(--accent)"/>`+BJ_T(28,y+24.5,r[0],{s:12,b:1,c:"#fff"});
    s+=BJ_T(46,y+17,r[1],{a:"start",s:11,b:1})+BJ_T(46,y+31,r[2],{a:"start",s:10,i:1});
    if(i<5)s+=BJ_ARR(180,y+40,180,y+52,"currentColor",1.8)});
  return BJ_FG("0 0 360 318",s,"The steps in making human insulin using bacteria.","Six numbered steps from cutting the insulin gene to collecting insulin made by bacteria",520)};

/* original Save My Exams diagrams */
const BJ_C=["Yeast anaerobic respiration to make ethanol for biofuel","Carbon dioxide from yeast makes bread dough rise","Lactase turns milk into lactose-free milk","Penicillin from Penicillium stops bacterial growth","An industrial fermenter","Restriction enzymes cut DNA to leave sticky ends","DNA ligase joins two pieces of DNA"];
BJ_C.forEach((c,i)=>{const k="b21_f0"+(i+1);FIGS["BJ_B210"+(i+1)]=()=>BIF(k,c,c)});

const BJ_L1=L("Biotechnology: bacteria, yeast and enzymes","Why bacteria are useful, how yeast makes biofuel and bread, and how enzymes are used in juice, washing powders and lactose-free milk.",
`<h4>Why bacteria are useful in biotechnology</h4>
<p><b>Biotechnology</b> means using living organisms, or parts of them such as enzymes, to make foods and other useful substances. The most common microorganisms used are bacteria, for two main reasons.</p>
<ul><li>They can make <b>complex molecules</b>. For example, certain bacteria added to milk make enzymes that turn it into yoghurt.</li><li>They have a <b>rapid reproduction rate</b>, so the amount of chemical they make can increase quickly.</li></ul>
{{BJ_CELL}}
<h4>Plasmids and ethics (Extended)</h4>
<p>Bacteria have two further benefits in biotechnology.</p>
<ul><li>There are <b>few ethical considerations</b> in growing them in large numbers in the laboratory.</li><li>They possess <b>plasmids</b>, an ideal way of transferring DNA from one cell to another during genetic manipulation.</li></ul>
<div class="key"><b>Exam tip</b>Always link the feature to the benefit. "Reproduce quickly" means a lot of product is made in a short time.</div>
<h4>Biofuels</h4>
<p>Yeast is a single-celled fungus that uses sugar as food. Its <b>anaerobic respiration</b> produces <b>ethanol and carbon dioxide</b> and releases energy for the cell. The ethanol can be used as a <b>biofuel</b>. In countries such as Brazil, biofuel is partly replacing petrol in vehicles.</p>
{{BJ_B2101}}
<p>Biofuel production using yeast:</p>
<ol><li>Plant material is broken up into small pieces and mixed with yeast.</li><li>The yeast uses the plant material as a substrate in anaerobic respiration and makes ethanol.</li><li>The liquid is separated from the solids and water is removed, leaving a concentrated ethanol solution.</li><li>The ethanol is blended with petrol or used on its own as a fuel.</li></ol>
<p>Waste parts of crops, such as stalks or outer leaves, can be used, but crops may also be grown just for ethanol. This causes <b>concern that less land is available for local people to grow food crops</b>.</p>
<h4>Bread</h4>
<p>Yeast respires anaerobically if it has plenty of sugar, even when oxygen is available. In bread-making the yeast is mixed with flour and water and produces <b>carbon dioxide</b>. The gas is caught in the dough and makes the bread <b>rise</b>.</p>
{{BJ_B2102}}
<ul><li>A warm place lets the enzymes in yeast work quickly, but too hot denatures them.</li><li>Word equation: <b>glucose → ethanol + carbon dioxide</b>.</li></ul>
<h4>Fruit juice production</h4>
<p>Squeezing fruit does not break open all the cells, so a lot of juice is lost. Adding the enzyme <b>pectinase</b> to chopped fruit breaks down <b>pectin</b> in plant cell walls. The cell walls break more easily, so <b>more juice</b> is squeezed out. Large polysaccharides such as pectin make juice cloudy, so once they are broken into smaller molecules the juice is also <b>clearer</b>.</p>
<h4>Biological washing powders</h4>
<p>Stains are organic molecules: oil from skin, protein from blood, and fat and protein from food. Soap alone needs hot water, time and effort. <b>Biological washing powders</b> contain enzymes similar to digestive enzymes (proteases, lipases, amylases) that break down large molecules. Advantages:</p>
<ul><li>They quickly break large, insoluble molecules such as fats and proteins into smaller <b>soluble</b> ones that dissolve in the washing water.</li><li>They work at <b>lower temperatures</b>, so less energy and money is used to heat the water.</li><li>They can be used on <b>delicate fabrics</b> that cannot be washed hot.</li></ul>
<table><tr><th>Enzyme</th><th>Use</th><th>How it helps</th></tr>
<tr><td>Pectinase</td><td>Fruit juice</td><td>Breaks down pectin; more, clearer juice.</td></tr>
<tr><td>Protease, lipase, amylase</td><td>Biological washing powder</td><td>Break down protein, fat and starch stains.</td></tr>
<tr><td>Lactase (Extended)</td><td>Lactose-free milk</td><td>Splits lactose into glucose and galactose.</td></tr></table>
<h4>Lactose intolerance and lactase (Extended)</h4>
<p><b>Lactose</b> is the sugar in milk. Human babies make the enzyme <b>lactase</b>, which breaks lactose down. In some areas of the world many people lose this ability as they get older and become <b>lactose intolerant</b>. They react badly to milk, cheese and yoghurt, with <b>nausea, flatulence and diarrhoea</b>, because their digestive system is upset by the lactose.</p>
<p>Milk can be made <b>lactose free</b> by adding lactase and leaving it to stand while the enzyme breaks down the lactose.</p>
{{BJ_B2103}}
`,
I("Yeast, bacteria and enzymes make bread, juice and medicines. How do we get the best results from living things in a factory?",
`<ol><li>List five products in a supermarket that are made with the help of yeast, bacteria, fungi or enzymes.</li><li>For each product, decide whether the microorganism is alive in the final product.</li><li>Predict what conditions a factory would need to control to grow bacteria quickly.</li><li>Suggest what could go wrong if the temperature or pH drifted away from the optimum.</li></ol>`,
`<p><b>Yeast and carbon dioxide.</b> Mix 5 g of dried yeast, 5 g of sugar and 50 cm³ of warm water (about 35 °C) in a flask and attach a delivery tube to a test tube of limewater. Record how long the limewater takes to turn milky. Repeat with no sugar, with cold water and with water at about 70 °C. Explain the differences.</p><p><b>Balloon bread.</b> Put yeast, sugar and warm water in a bottle and stretch a balloon over the neck. Measure the balloon width every 5 minutes for 30 minutes and plot a graph.</p><p><b>Washing powder test.</b> Stain white cotton with egg yolk or custard. Wash equal pieces in water with biological powder, non-biological powder and no powder at 20 °C, 40 °C and 60 °C. Compare how clean each piece is and explain the pattern.</p><p><b>Pectinase and juice.</b> Mash apple pieces and add pectinase to one beaker and water to another. After 20 minutes filter both and measure the volume of juice. Explain the result.</p><p class="safe">Safety: wear eye protection and wash hands after handling yeast and enzyme powders. Do not breathe in powder dust. Do not taste any of the products.</p>`,
undefined),
[["State two reasons why bacteria are useful in biotechnology.","Reproduce rapidly (1). Make complex molecules such as proteins / enzymes (1).",2],
["Write the word equation for anaerobic respiration in yeast.","Glucose → ethanol + carbon dioxide (2).",2],
["Explain why bread dough rises when yeast is added and the dough is left in a warm place.","Yeast respires anaerobically and releases carbon dioxide (1). The gas forms bubbles in the dough (1). Warmth speeds up the enzyme-controlled reactions in yeast (1).",3],
["Describe how pectinase is used in fruit juice production.","Pectinase breaks down pectin in plant cell walls (1) so more juice is released and the juice is clearer (1).",2],
["Biological washing powders work well at 40 °C but not at 80 °C. Explain why.","At 40 °C the enzymes work near their optimum temperature (1). At 80 °C the enzymes are denatured (1) because their shape changes and the active site no longer fits the stain (1).",3],
["Give two advantages of using a biological washing powder rather than soap alone.","Any two: breaks large insoluble molecules into small soluble ones (1); works at lower temperatures so saves energy (1); suitable for delicate fabrics (1).",2],
["Explain why a person who is lactose intolerant can drink lactose-free milk. (Extended)","Lactase has been added to the milk (1) which breaks down lactose into glucose and galactose (1).",2],
["Describe one concern about growing crops to make biofuel.","Less land is available for local people to grow food crops (1).",1]],
[M("Which gas makes bread dough rise?",["Oxygen","Carbon dioxide","Ethanol","Hydrogen"],1,"Yeast releases carbon dioxide, which makes bubbles in the dough."),
M("Which enzyme is used to make lactose-free milk?",["Amylase","Pectinase","Lactase","Protease"],2,"Lactase splits lactose into glucose and galactose."),
T("Name the type of respiration yeast carries out in the absence of oxygen.",["anaerobic"],"Anaerobic respiration."),
M("Which is a feature of plasmids?",["They contain the whole genome","They are rings of DNA separate from the main chromosome","They are found in the nucleus","They are made of protein"],1,"Plasmids are small rings of DNA."),
M("Why is pectinase added to crushed fruit?",["To kill bacteria","To add sugar","To break down cell walls and release more juice","To make the juice sweeter"],2,"Pectinase breaks down pectin in cell walls.")],
[["Two reasons bacteria are useful","Rapid reproduction and ability to make complex molecules."],
["Word equation for anaerobic respiration in yeast","Glucose → ethanol + carbon dioxide."],
["Why does dough rise?","Yeast makes carbon dioxide, which forms bubbles."],
["Role of pectinase in juice making","Breaks down pectin in cell walls so more juice is released."],
["Why do biological washing powders work at low temperatures?","Enzymes work best at about 30 to 40 °C and denature when too hot."],
["What does lactase do? (Extended)","Splits lactose into glucose and galactose."],
["What is a plasmid? (Extended)","A small ring of DNA separate from the main bacterial chromosome."]]);

const BJ_L2=L("Fermenters, penicillin and mycoprotein (Extended)","How penicillin was discovered, how a fermenter is controlled, and how mycoprotein is made from a fungus.",
`<h4>Penicillin production (Extended)</h4>
<p><b>Penicillin</b> was the first antibiotic. It was discovered in <b>1928 by Alexander Fleming</b>, who noticed that bacteria left in a Petri dish had been killed by the naturally occurring <i>Penicillium</i> mould. The mould makes a chemical that stops it being infected by certain bacteria. The chemical was isolated and named penicillin.</p>
{{BJ_B2104}}
<p>Methods have since been developed to make penicillin on a large scale in an <b>industrial fermenter</b>.</p>
<h4>Industrial fermenters (Extended)</h4>
<p>Fermenters are containers used to grow ("culture") microorganisms such as bacteria and fungi in large amounts. They are used to make genetically modified bacteria and the <i>Penicillium</i> mould that makes penicillin. The advantage is that conditions can be carefully controlled to produce large quantities of exactly the right microorganism.</p>
{{BJ_B2105}}
<table><tr><th>Condition</th><th>Why and how it is controlled</th></tr>
<tr><td>Aseptic precautions</td><td>The fermenter is cleaned with steam to kill microorganisms and prevent contamination, so only the desired microorganisms grow.</td></tr>
<tr><td>Nutrients</td><td>Needed for respiration, which releases energy for growth and reproduction.</td></tr>
<tr><td>Optimum temperature</td><td>Monitored with probes and kept constant with a water jacket. This gives the best enzyme activity and prevents denaturation.</td></tr>
<tr><td>Optimum pH</td><td>Monitored with a probe and adjusted with acids and alkalis.</td></tr>
<tr><td>Oxygenation</td><td>Oxygen is needed for aerobic respiration.</td></tr>
<tr><td>Agitation</td><td>Stirring paddles spread temperature, pH, nutrients and oxygen evenly through the fermenter.</td></tr>
<tr><td>Waste</td><td>The contents are filtered to remove waste made by the microorganisms.</td></tr></table>
<div class="key"><b>Exam tip</b>When you explain a fermenter condition, name the enzyme or respiration effect. "Too hot denatures the enzymes" scores. "It is bad for the bacteria" does not.</div>
<h4>Mycoprotein: food from a fungus (Extended)</h4>
<ul><li>The fungus <i>Fusarium</i> is grown on an industrial scale in fermenters kept at the optimum pH and temperature.</li><li>It is grown in <b>aerobic</b> conditions (supplied with oxygen) and given <b>glucose syrup</b> as food, so it can respire.</li><li>The fungus grows and multiplies. The fungal biomass is then harvested and purified to give <b>mycoprotein</b>.</li><li>Mycoprotein is a protein-rich food suitable for vegetarians, for example in Quorn<sup>TM</sup> products.</li></ul>
<p>Genetically modified bacteria grown in fermenters also make human insulin. This is covered in the next lesson.</p>`,
I("Why must a factory growing microorganisms control conditions much more carefully than a kitchen making bread?",
`<ol><li>List what a microorganism needs in order to grow quickly.</li><li>Predict what would happen to a culture if a different microorganism got in.</li><li>Suggest why stirring is needed in a large tank but not in a small flask.</li><li>Decide which condition you would check first if the product stopped forming.</li></ol>`,
`<p><b>Model fermenter.</b> Set up three flasks of yeast, sugar and warm water, each with a balloon on the neck. Keep them at 20 °C, 35 °C and 70 °C and measure the balloon width every 5 minutes. Explain which is the optimum temperature and why.</p><p><b>Aseptic technique.</b> Discuss why industrial fermenters are steam cleaned. Compare two nutrient agar plates, one opened to the air for 10 minutes and one kept sealed (observe only, then dispose of the sealed plates unopened).</p><p class="safe">Safety: do not open any plate that has grown cultures. Wash hands after handling yeast.</p>`,
undefined),
[["State the name of the scientist who discovered penicillin and the year. (Extended)","Alexander Fleming (1) in 1928 (1).",2],
["Describe how Fleming noticed that Penicillium makes a useful chemical. (Extended)","Bacteria in a Petri dish had been killed (1) by Penicillium mould growing near them (1).",2],
["Explain why a fermenter has a water jacket. (Extended)","Respiration by the microorganisms releases heat (1). Cooling water removes it so the temperature stays at the optimum for the enzymes (1).",2],
["Explain why a fermenter is cleaned with steam before use. (Extended)","To kill microorganisms (1) so that only the desired microorganism grows / no contamination (1).",2],
["Explain why stirring paddles are used in a fermenter. (Extended)","They spread temperature, pH, nutrients and oxygen evenly (1) so all the microorganisms have the best conditions (1).",2],
["Describe how mycoprotein is produced. (Extended)","Fusarium is grown in a fermenter (1) with oxygen and glucose syrup (1) at the optimum pH and temperature (1); the biomass is harvested and purified (1).",4]],
[T("Name the fungus that is grown in fermenters to make penicillin.",["penicillium"],"<i>Penicillium</i>."),
M("Why are sterile conditions needed in a fermenter?",["To make the culture warmer","To stop other microorganisms competing with the culture or spoiling the product","To add oxygen","To make the pH higher"],1,"Contamination would compete with or spoil the culture."),
M("Which food product is made from the fungus Fusarium?",["Penicillin","Mycoprotein","Insulin","Ethanol"],1,"Mycoprotein is a meat substitute made from the fungus."),
M("What is the job of the stirring paddles in a fermenter?",["To kill microorganisms","To spread temperature, pH, nutrients and oxygen evenly","To remove oxygen","To make waste"],1,"Agitation spreads conditions evenly."),
M("Which food source is given to Fusarium in a fermenter?",["Starch paste","Glucose syrup","Lactose","Pectin"],1,"Glucose syrup is the food source.")],
[["Who discovered penicillin and when? (Extended)","Alexander Fleming in 1928."],
["Name three conditions controlled in a fermenter (Extended)","Temperature, pH, oxygen, nutrients, agitation, waste removal and aseptic precautions."],
["What is mycoprotein? (Extended)","A protein-rich food made from the fungus Fusarium, suitable for vegetarians (Quorn)."],
["Why is a water jacket used? (Extended)","To keep the temperature at the optimum for enzymes."],
["Why are aseptic precautions used? (Extended)","To kill microorganisms with steam so only the desired microorganism grows."]]);

const BJ_L3=L("Genetic modification","What genetic modification is, examples including golden rice, how bacteria make a human protein, and the benefits and risks of GM crops.",
`<h4>What is genetic modification?</h4>
<p><b>Genetic modification</b> is changing the genetic material of an organism by <b>removing, changing or inserting individual genes</b> from another organism. The organism that receives the genes is <b>genetically modified</b>, or <b>transgenic</b>. Its DNA, which now contains DNA from another organism, is called <b>recombinant DNA</b>.</p>
<h4>Examples of genetic modification</h4>
<ul><li><b>Human insulin.</b> The human insulin gene has been inserted into bacteria, which make human insulin that is collected and purified to treat people with diabetes.</li><li><b>Insect resistance.</b> Crops such as soya, maize and rice contain a gene from a bacterium that makes a poison which kills insect pests such as caterpillars.</li><li><b>Herbicide resistance.</b> Crops can survive a herbicide (a chemical that kills plants), so spraying kills the weeds but not the crop.</li><li><b>Extra vitamins.</b> <b>Golden rice</b> contains genes from another plant and a bacterium that make the grains produce a chemical that the body turns into <b>vitamin A</b>. This could help prevent deficiency diseases in some parts of the world.</li></ul>
<h4>Making a human protein in bacteria (Extended)</h4>
<p>The same method is used to make human insulin or any other human protein.</p>
{{BJ_GM}}
<ul><li><b>Isolating the gene.</b> The gene is located in the original organism, for example the human insulin gene. <b>Restriction enzymes</b> cut it out and leave <b>sticky ends</b>: short sections of unpaired bases.</li><li><b>Cutting the plasmid.</b> A bacterial plasmid (a circle of DNA inside the cell) is cut by the <b>same restriction enzyme</b>, leaving corresponding sticky ends.</li></ul>
{{BJ_B2106}}
<ul><li><b>Joining.</b> <b>DNA ligase</b> joins the plasmid and the gene. If two pieces of DNA have matching sticky ends, ligase links them into one unbroken molecule.</li></ul>
{{BJ_B2107}}
<ul><li><b>Insertion.</b> The genetically engineered (recombinant) plasmid is put into a bacterial cell.</li><li><b>Multiplication and expression.</b> When the bacteria reproduce, the plasmids are copied too, so the recombinant plasmid spreads quickly. All the bacteria express the gene and make the human protein.</li><li><b>Large scale.</b> The bacteria are placed in a fermenter to reproduce quickly in controlled conditions and make large quantities of the protein.</li></ul>
<div class="key"><b>Exam tip</b>Name both enzymes and say what each does. Restriction enzyme: cuts DNA and leaves sticky ends. Ligase: joins DNA pieces together.</div>
<h4>Why bacteria are useful for genetic engineering (Extended)</h4>
<ul><li>They have the <b>same genetic code</b> as the organisms the genes come from, so they can "read" it and make the same proteins.</li><li>There are <b>no ethical concerns</b> about growing and manipulating them, unlike animals, which can feel pain and distress.</li><li>Their <b>plasmids</b>, separate from the main chromosome, are easy to remove, change and put back inside the cells.</li></ul>
<h4>GM crops: advantages and disadvantages (Extended)</h4>
<table><tr><th>Advantages</th><th>Disadvantages</th></tr>
<tr><td>Less herbicide and pesticide used, which is better for the environment</td><td>Seeds cost more, so smaller, poorer farmers cannot compete with larger farms</td></tr>
<tr><td>Cheaper and less time-consuming for farmers</td><td>Greater dependency on certain chemicals, such as the herbicides the crops resist, often made by the seed companies and more expensive</td></tr>
<tr><td>Increased yields because crops do not compete with weeds or suffer pest damage</td><td>Inserted genes may pass to wild plants by pollination, for example weeds gaining herbicide resistance</td></tr>
<tr><td></td><td>Reduced biodiversity because fewer plant species survive herbicide use, affecting insects and insect-eating birds</td></tr>
<tr><td></td><td>Some research shows GM plants do not grow as well as non-GM plants</td></tr></table>
<p>To discuss a GM crop, give a balanced answer with at least one advantage and one disadvantage, and name the crop.</p>`,
I("Should the food in our shops be allowed to come from genetically modified crops?",
`<ol><li>Write down what you already know about GM food and where you heard it.</li><li>List two ways a gene could help a crop and one way it could harm the environment.</li><li>Decide who is affected by the decision: farmers, shoppers, wildlife and people who are short of food.</li><li>State what evidence you would need before changing your view.</li></ol>`,
`<p><b>Plasmid model.</b> Use paper or card strips: a loop of coloured paper for a plasmid and a strip for a gene. Cut each with a zigzag pair of cuts so the ends fit together only one way. Join them with tape (ligase) and explain why a different cut would not fit.</p><p><b>Class debate.</b> Split the class into farmers, a seed company, an environmental group and a health agency. Each group prepares a 90-second argument about GM maize using a data card. Vote before and after the debate.</p><p><b>Data analysis.</b> Study a table of yield per hectare and pesticide use for GM and non-GM maize. Calculate the percentage change in yield and describe what the data do and do not show.</p><p class="safe">Safety: this is a paper and discussion activity. No living GM organisms are needed.</p>`,
undefined),
[["Describe what is meant by genetic modification.","Changing the genetic material of an organism (1) by removing, changing or inserting individual genes (1).",2],
["State two examples of genetic modification in crop plants.","Any two: herbicide resistance (1), insect resistance (1), improved nutrition such as vitamin A in rice (1).",2],
["Name the enzyme that cuts DNA to leave sticky ends. (Extended)","Restriction enzyme (1).",1],
["Describe the role of DNA ligase. (Extended)","It joins the human gene into the plasmid (1) by joining the DNA strands to make a recombinant plasmid (1).",2],
["Explain why the plasmid and the human gene must be cut with the same restriction enzyme. (Extended)","The same enzyme leaves matching sticky ends (1). The sticky ends are complementary so they can pair up (1).",2],
["Give one advantage and one disadvantage of growing GM maize. (Extended)","Advantage: resists insect pests so higher yield or less insecticide used (1). Disadvantage: the gene may spread to wild plants or harm other insects (1).",2]],
[M("What is a recombinant plasmid?",["A plasmid with no DNA","A plasmid containing DNA from another organism","A bacterial nucleus","A restriction enzyme"],1,"It has a new gene joined into it."),
M("Which enzyme joins pieces of DNA together?",["Restriction enzyme","Amylase","DNA ligase","Protease"],2,"DNA ligase makes the join."),
T("What name is given to the single-stranded ends left when a restriction enzyme cuts DNA?",["sticky ends","sticky end"],"Sticky ends."),
M("Which crop (golden rice) has been modified to make vitamin A?",["Maize","Rice","Soya","Wheat"],1,"This rice helps to prevent vitamin A deficiency."),
M("Why can bacteria make human insulin?",["Bacteria have a human nucleus","They use the inserted human gene to make the protein","Bacteria are human cells","Insulin is not a protein"],1,"The gene is expressed in the bacteria."),
M("Which is a disadvantage of GM crops?",["Higher yield","Genes may spread to wild relatives","Less pesticide use","More vitamins"],1,"Gene spread is an environmental concern."),
T("Name the type of microorganism that is genetically modified to make human insulin.",["bacteria","bacterium","bacterial"],"Bacteria."),
M("What is the first step in making human insulin in bacteria?",["Insert plasmid into bacteria","Cut the insulin gene from human DNA with a restriction enzyme","Collect insulin","Grow bacteria in a fermenter"],1,"The gene must be isolated first.")],
[["Define genetic modification","Changing an organism's genetic material by removing, changing or inserting genes."],
["Example of a GM crop with herbicide resistance","Soya."],
["Example of an insect-resistant GM crop","Maize."],
["Why was rice genetically modified?","To make grains that contain a chemical the body turns into vitamin A (golden rice)."],
["Role of restriction enzymes (Extended)","Cut DNA at specific places, leaving sticky ends."],
["Role of DNA ligase (Extended)","Joins DNA strands to make the recombinant plasmid."],
["What is a recombinant plasmid? (Extended)","A plasmid with a gene from another organism inserted."],
["Why use bacteria to make insulin? (Extended)","Fast reproduction, plasmids and few ethical concerns."],
["One advantage and one disadvantage of GM crops (Extended)","Higher yield; possible gene spread to wild plants."]]);

BSET(21,[BJ_L1,BJ_L2,BJ_L3],
[M("Why are bacteria useful in biotechnology?",["They have a nucleus","They reproduce rapidly and make complex molecules","They cannot respire","They only live in soil"],1,"Rapid reproduction and complex molecules."),
M("What is made when yeast respires anaerobically?",["Oxygen and water","Ethanol and carbon dioxide","Lactic acid","Glucose"],1,"Ethanol and carbon dioxide."),
T("Which enzyme is used to make lactose-free milk?",["lactase"],"Lactase."),
M("Which enzyme helps to release more juice from fruit?",["Lipase","Pectinase","Protease","Amylase"],1,"Pectinase breaks down pectin."),
M("Which condition is not normally controlled in a fermenter?",["Temperature","pH","Day length","Oxygen"],2,"Day length is irrelevant."),
M("What cuts DNA at a specific base sequence?",["Ligase","Restriction enzyme","Amylase","Plasmid"],1,"Restriction enzymes cut at specific places."),
M("What is genetic modification?",["Selecting parents with useful features","Changing an organism's genes by inserting, removing or changing them","Cloning plants by cuttings","Mixing two foods"],1,"Direct changes to genetic material."),
T("Name the fungus used to make mycoprotein. (Extended)",["fusarium"],"<i>Fusarium</i>.")],
[P("Yeast and bread",6,"<p>A baker adds yeast to bread dough and leaves it in a warm place.</p><ol type='a'><li>Name the type of respiration that yeast carries out when there is no oxygen. [1]</li><li>Name the gas that makes the dough rise. [1]</li><li>Write the word equation for this type of respiration in yeast. [2]</li><li>Explain why the dough is left in a warm place before baking. [2]</li></ol>",
["(a) Anaerobic respiration (1).","(b) Carbon dioxide (1).","(c) Glucose (1) → ethanol + carbon dioxide (1).","(d) Warmth increases the rate of the enzyme-controlled reactions in yeast (1) so carbon dioxide is made faster and the dough rises sooner (1)."],"Hub exam-style question (written for this hub), Topic 21"),
P("Fermenter conditions",7,"<p>Penicillin is made by growing a fungus in a large fermenter. The fungus respires aerobically and releases heat.</p><ol type='a'><li>Name the fungus used to make penicillin. [1]</li><li>Explain why the temperature in the fermenter must be controlled. [2]</li><li>State how the temperature is kept constant. [1]</li><li>Sterile air is bubbled through the fermenter. Explain why air is needed and why it must be sterile. [2]</li><li>State one other condition that is controlled in a fermenter. [1]</li></ol>",
["(a) <i>Penicillium</i> (1).","(b) Enzymes work best at their optimum temperature (1); too high a temperature denatures the enzymes, too low slows the reactions (1).","(c) A water jacket / cooling water removes the heat (1).","(d) Oxygen is needed for aerobic respiration (1); sterile so that other microorganisms do not compete for nutrients or contaminate the product (1).","(e) Any one: pH, nutrient supply, waste products (1)."],"Hub exam-style question (written for this hub), Topic 21"),
P("Biological washing powder investigation",6,"<p>A student tested a biological washing powder. Equal pieces of cloth stained with egg were washed at different temperatures. The time taken for the stain to disappear was recorded.</p><table><tr><th>Temperature / °C</th><th>20</th><th>30</th><th>40</th><th>50</th><th>60</th></tr><tr><td>Time for stain to disappear / minutes</td><td>18</td><td>8</td><td>5</td><td>12</td><td>stain not removed</td></tr></table><ol type='a'><li>Describe the pattern in the results. [2]</li><li>Explain the result at 60 °C. [2]</li><li>Name the type of enzyme in the powder that breaks down egg. [1]</li><li>State one advantage of using a biological powder at 40 °C instead of a non-biological powder at 90 °C. [1]</li></ol>",
["(a) The time decreases as the temperature rises from 20 to 40 °C (1); above 40 °C the time increases and at 60 °C the stain was not removed (1).","(b) At 60 °C the enzymes are denatured (1) because the active site changes shape and no longer fits the substrate (1).","(c) Protease (1).","(d) It uses less energy / is cheaper or gentler on the fabric (1)."],"Hub exam-style question (written for this hub), Topic 21"),
P("Making human insulin by genetic modification",8,"<p>Human insulin can be made by bacteria that contain the human insulin gene.</p><ol type='a'><li>Name the enzyme used to cut the insulin gene out of human DNA. [1]</li><li>The cut DNA has sticky ends. Explain what is meant by sticky ends and why they are useful. [2]</li><li>Name the enzyme that joins the gene into the bacterial plasmid. [1]</li><li>Name the structure formed when the gene is joined into the plasmid. [1]</li><li>Give two reasons why bacteria are used to make insulin. [2]</li><li>Explain how the bacteria make human insulin after taking up the plasmid. [1]</li></ol>",
["(a) Restriction enzyme (1).","(b) Short single-stranded ends of unpaired bases (1) which are complementary to the ends of the cut plasmid, so the gene can pair with it (1).","(c) DNA ligase (1).","(d) A recombinant plasmid (1).","(e) Any two from: reproduce rapidly; contain plasmids; few ethical concerns; can make complex molecules / proteins (2).","(f) The bacteria use the human gene to make the protein (the gene is expressed) (1)."],"Hub exam-style question (written for this hub), Topic 21"),
P("GM crops",6,"<p>Maize has been genetically modified to contain a gene from a bacterium that makes a protein poisonous to insect pests.</p><ol type='a'><li>Describe what is meant by genetic modification. [2]</li><li>Explain one benefit to a farmer of growing this maize. [2]</li><li>Suggest two possible disadvantages of growing GM crops. [2]</li></ol>",
["(a) Changing the genetic material of an organism (1) by inserting, removing or changing genes (1).","(b) Insect pests that eat the plant die (1) so there is less crop loss / higher yield or less insecticide is needed (1).","(c) Any two from: genes may spread to wild plants; harm to harmless insects / loss of biodiversity; seeds are expensive; long-term health effects not known (2)."],"Hub exam-style question (written for this hub), Topic 21")]);
