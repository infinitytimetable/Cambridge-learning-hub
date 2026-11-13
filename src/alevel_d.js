/* ===== Biology 9700 Topic 3 Enzymes (alevel_d.js): sections 3.1 and 3.2. Diagrams are the originals from the supplied notes (ALF); figure keys AL_31_NN and AL_32_NN ===== */
(function(){
const F31=[
["3.1_f01","Intracellular and extracellular enzymes compared, with catalase and amylase as examples.","Table comparing intracellular enzymes such as catalase with extracellular enzymes such as amylase"],
["3.1_f02","The active site of an enzyme has a specific shape. When the substrate binds, an enzyme-substrate complex is formed.","Substrate approaching the active site of an enzyme, then the enzyme-substrate complex"],
["3.1_f03","Enzyme specificity: catalase can bind hydrogen peroxide because they are complementary in shape, whereas DNA polymerase cannot.","Hydrogen peroxide fitting the active site of catalase but not DNA polymerase"],
["3.1_f04","The temporary formation of an enzyme-substrate complex, followed by release of the products.","Three stages: substrate and active site, enzyme-substrate complex, products released"],
["3.1_f05","A catabolic reaction: one substrate is broken into two products.","Enzyme breaking one substrate molecule into two products"],
["3.1_f06","An anabolic reaction: two substrates are joined to make a single product.","Enzyme joining two substrate molecules into one product"],
["3.1_f07","Enzymes lower the activation energy of a reaction by providing an alternative energy pathway.","Energy profile graph showing a lower activation energy peak with a catalyst than without"],
["3.1_f08","The lock-and-key hypothesis: the substrate fits the rigid active site exactly.","Four stages of the lock-and-key model with a rigid active site"],
["3.1_f09","The induced-fit hypothesis: the active site changes shape (a conformational change) as the substrate binds.","Four stages of the induced-fit model showing the active site changing shape"],
["3.1_f10","Apparatus for measuring the rate of formation of a product: oxygen from potato catalase and hydrogen peroxide is collected in a measuring cylinder.","Conical flask with potato cubes and hydrogen peroxide, delivery tube to an inverted measuring cylinder over water"],
["3.1_f11","Measuring the rate of disappearance of a substrate: samples of the amylase and starch mixture are tested with iodine on a spotting tile at regular intervals.","Test tube of amylase and starch, pipette and spotting tile with iodine drops"],
["3.1_f12","Serial dilution of a 1% starch stock solution by a dilution factor of 10 at each step.","Row of test tubes from 1% starch down to 0.00001% starch, each ten times more dilute"]];
F31.forEach((f,i)=>{const n=String(i+1).padStart(2,"0");FIGS["AL_31_"+n]=()=>ALF(f[0],f[1],f[2])});
const F32=[
["3.2_f01","The effect of temperature on the rate of an enzyme-catalysed reaction (optimum about 35 degrees C in this example).","Bell-shaped graph of rate against temperature with an optimum near 35 degrees C and denaturation at high temperature"],
["3.2_f02","The effect of pH on the rate of reaction for three enzymes with different optimum pH values: pepsin pH 2, urease pH 7 and trypsin pH 8.","Three overlapping bell-shaped curves of rate against pH for pepsin, urease and trypsin"],
["3.2_f03","The effect of enzyme concentration on rate: a linear increase while there is enough substrate.","Straight line graph of rate against enzyme concentration"],
["3.2_f04","The effect of substrate concentration on rate when the amount of enzyme is fixed: the rate rises, then plateaus when the active sites are saturated.","Curve of rate against substrate concentration levelling off at saturation"],
["3.2_f05","Rate against substrate concentration for a normal enzyme, with a competitive inhibitor and with a non-competitive inhibitor.","Three curves: normal enzyme highest, competitive inhibitor reaching almost the same maximum, non-competitive inhibitor with a lower maximum"],
["3.2_f06","Initial rate against substrate concentration, showing Vmax, half Vmax and the Michaelis-Menten constant Km.","Hyperbolic graph with Vmax marked, half Vmax marked and Km read off the substrate axis"],
["3.2_f07","Competitive inhibition (the inhibitor occupies the active site) and non-competitive inhibition (the inhibitor binds at an alternative site and changes the shape of the active site).","Two panels showing a competitive inhibitor in the active site and a non-competitive inhibitor at an alternative binding site"],
["3.2_f08","End-product inhibition: the end-product of the pathway inhibits the first enzyme.","Pathway of substrate to product 1, product 2 and product 3 with an inhibition arrow from product 3 back to enzyme 1"],
["3.2_f09","Using immobilised lactase in alginate beads to make lactose-free milk.","Milk poured through a column of alginate beads containing lactase, giving lactose-free milk"],
["3.2_f10","Lactase breaks the disaccharide lactose into the monosaccharides glucose and galactose.","Lactose disaccharide split by lactase into glucose and galactose"]];
F32.forEach((f,i)=>{const n=String(i+1).padStart(2,"0");FIGS["AL_32_"+n]=()=>ALF(f[0],f[1],f[2])});
})();

/* ===================== 3.1 ENZYMES ===================== */
const AL_L311=L("Enzymes and how they act","Enzymes as biological catalysts and globular proteins, intracellular and extracellular enzymes, the active site and enzyme-substrate complex, catabolic and anabolic reactions, and activation energy.",
`<h4>Enzymes as proteins</h4>
<p><b>Enzymes</b> are <b>biological catalysts</b>. They are biological because they work in living systems, and they are catalysts because they speed up chemical reactions without being used up or changed. Enzymes are also <b>globular proteins</b>. The part that matters most is the <b>active site</b>, the region where the substrate binds.</p>
<ul><li>Virtually every metabolic reaction in a living organism is catalysed by an enzyme, so enzymes are essential for life.</li><li>Metabolic pathways are controlled by enzymes working in a cascade of reactions, where the product of one reaction becomes the substrate of the next.</li></ul>
<div class="key"><b>Examiner tip</b>Enzymes are proteins. Anything that can denature a protein, such as extremes of heat or pH, will also denature an enzyme and stop it working.</div>
<h4>Intracellular and extracellular enzymes</h4>
<p>Enzymes can be <b>intracellular</b> (produced and working inside the cell) or <b>extracellular</b> (secreted by cells and catalysing reactions outside them).</p>
{{AL_31_01}}
<ul><li><b>Catalase</b> is intracellular. Hydrogen peroxide is a harmful by-product of many metabolic reactions, and catalase converts it into water and oxygen before it can damage cells or tissues.</li><li><b>Amylase</b> is extracellular. Macromolecules such as starch are too large to enter cells, so they are digested outside by secreted enzymes. Amylase hydrolyses starch into simple sugars. It is secreted by the salivary glands (digestion in the mouth) and by the pancreas (digestion in the small intestine).</li></ul>
<h4>The active site and the enzyme-substrate complex</h4>
<p>An enzyme has an <b>active site</b> with a specific shape that fits a specific <b>substrate</b>. When the substrate binds, an <b>enzyme-substrate complex</b> is formed.</p>
{{AL_31_02}}
<ul><li>Substrates must collide with the active site at the correct orientation and with enough speed for a reaction to happen.</li><li>Extremes of heat or pH change the shape of the active site so the substrate can no longer bind. This is called <b>denaturation</b>.</li></ul>
<h4>Why enzymes are specific</h4>
<p>The <b>specificity</b> of an enzyme comes from the complementary shape of its active site and its substrate. The shape of the active site is set by the complex <b>tertiary structure</b> of the protein:</p>
<ul><li>proteins are chains of amino acids held together by peptide bonds;</li><li>the order of the amino acids determines the shape of the enzyme;</li><li>if the order changes, the three-dimensional shape changes.</li></ul>
{{AL_31_03}}
<p>The enzyme-substrate complex only exists temporarily. The enzyme catalyses the reaction and the products are released, leaving the enzyme free to act again.</p>
{{AL_31_04}}
<div class="key"><b>Examiner tip</b>Enzymes and their substrates are highly specific to each other. This is known as enzyme-substrate specificity.</div>
<h4>Catabolic and anabolic reactions</h4>
<p><b>Catabolic reactions</b> break down complex molecules into simpler products. A single substrate is drawn into the active site and broken apart into two or more molecules. Examples: cellular respiration and hydrolysis reactions.</p>
{{AL_31_05}}
<p><b>Anabolic reactions</b> build complex molecules from simpler ones. Two or more substrates are drawn into the active site, bonds form between them and a single product is released. Examples: protein synthesis and photosynthesis.</p>
{{AL_31_06}}
<h4>Enzymes lower the activation energy</h4>
<p>All chemical reactions involve energy changes. For a reaction to proceed the substrate must gain enough <b>activation energy</b> to become just unstable enough for products to form. Enzymes influence the stability of bonds in the reactants. Destabilising the bonds makes the substrate more reactive, so the enzyme provides an <b>alternative energy pathway</b> with a lower activation energy.</p>
{{AL_31_07}}
<div class="ex"><b>Worked example</b>Explain why a reaction goes faster when an enzyme is present.<br>The enzyme binds the substrate at its active site and forms an enzyme-substrate complex. This destabilises bonds in the substrate, so the activation energy is lower. More substrate molecules have enough energy to react, so the rate of reaction increases.</div>`,
I("How does the shape of an active site decide which substrate an enzyme can use?",
`<ol><li>Cut a set of card shapes: three enzyme "active site" shapes and five substrate shapes, only some of which fit.</li><li>Try each substrate against each active site and record which fit exactly.</li><li>Use your results to write a definition of enzyme specificity.</li><li>Explain what would happen to the fit if the active site changed shape. Link your answer to denaturation.</li></ol>`,
`<p><b>Where does the activation energy go?</b> Place hydrogen peroxide solution in two test tubes. Add a little manganese(IV) oxide (an inorganic catalyst) to one, and a small piece of fresh liver or potato (catalase) to the other. Add nothing to a third tube as a control. Observe for two minutes.</p><ol><li>Record how quickly each tube produces bubbles.</li><li>Test the gas with a glowing splint and name it.</li><li>Explain how a catalyst speeds up the reaction in terms of activation energy.</li><li>State one difference between the inorganic catalyst and the enzyme.</li></ol>`),
[["Define the term enzyme.","A biological catalyst (1) that speeds up a reaction without being used up or changed (1). Globular protein also accepted.",2],
["State the difference between an intracellular and an extracellular enzyme. Give one example of each.","Intracellular enzymes work inside the cell (1), e.g. catalase (1). Extracellular enzymes are secreted and work outside the cell (1), e.g. amylase (1).",4],
["Explain why an enzyme is specific to one substrate.","The active site has a specific shape (1) that is complementary to the shape of the substrate (1). The shape comes from the tertiary structure, set by the order of amino acids (1).",3],
["Distinguish between catabolic and anabolic reactions, with one example of each.","Catabolic: breaks down larger molecules into smaller ones (1), e.g. respiration or hydrolysis (1). Anabolic: builds larger molecules from smaller ones (1), e.g. protein synthesis or photosynthesis (1).",4],
["Explain how an enzyme speeds up a reaction.","The enzyme forms an enzyme-substrate complex (1) which destabilises bonds in the substrate (1). This lowers the activation energy (1) by providing an alternative energy pathway (1).",4]],
[M("Enzymes are best described as:",["Biological catalysts that are globular proteins","Lipids that store energy","Carbohydrates that form cell walls","Nucleic acids that carry information"],0,"Enzymes are biological catalysts and globular proteins."),
M("Catalase is an example of:",["An extracellular enzyme","An intracellular enzyme","A hormone","A structural protein"],1,"Catalase works inside cells to break down hydrogen peroxide."),
T("What name is given to the region of an enzyme where the substrate binds?",["active site"],"The active site."),
M("Which reaction is anabolic?",["Respiration","Hydrolysis of starch","Protein synthesis","Digestion of lipid"],2,"Protein synthesis builds large molecules from small ones."),
M("The specific shape of an active site is determined by:",["The tertiary structure of the protein","The temperature of the cell","The size of the substrate only","The pH of the cytoplasm"],0,"Tertiary structure, set by the amino acid sequence."),
M("What does an enzyme do to the activation energy of a reaction?",["Raises it","Lowers it","Removes the need for it","Does not change it"],1,"Enzymes lower activation energy."),
M("Which enzyme breaks down hydrogen peroxide?",["Amylase","Catalase","DNA polymerase","Lactase"],1,"Catalase breaks it into water and oxygen."),
T("What term describes the change in shape of an active site caused by extremes of heat or pH?",["denaturation","denatured"],"Denaturation.")],
[["What is an enzyme?","A biological catalyst that is a globular protein."],
["What is the active site?","The region of an enzyme where the substrate binds."],
["Intracellular enzyme example","Catalase, which breaks hydrogen peroxide down into water and oxygen inside cells."],
["Extracellular enzyme example","Amylase, secreted by salivary glands and the pancreas to digest starch outside cells."],
["What forms when a substrate binds to an enzyme?","An enzyme-substrate complex."],
["What gives an enzyme its specificity?","The complementary shape of the active site, set by the tertiary structure of the protein."],
["Catabolic reaction","Breakdown of complex molecules into simpler products, e.g. respiration and hydrolysis."],
["Anabolic reaction","Building of complex molecules from simpler ones, e.g. protein synthesis and photosynthesis."],
["What is activation energy?","The energy needed for the substrate to become just unstable enough for a reaction to occur."],
["How do enzymes lower activation energy?","By destabilising bonds in the substrate, giving an alternative energy pathway."]]);

const AL_L312=L("Lock and key, induced fit and measuring enzyme activity","The lock-and-key and induced-fit hypotheses, measuring the rate of product formation (catalase) and substrate disappearance (amylase), and using colorimetry and serial dilutions.",
`<h4>The lock-and-key hypothesis</h4>
<p>Enzymes are globular proteins, so the shape of the whole enzyme, including its active site, is determined by its tertiary structure and is highly specific. In the 1890s <b>Emil Fischer</b> described the first model of enzyme action. He suggested that enzyme and substrate are <b>rigid structures</b> that fit together very precisely, like a key in a lock. This is the <b>lock-and-key hypothesis</b>.</p>
{{AL_31_08}}
<h4>The induced-fit hypothesis</h4>
<p>Advances in molecular science led to a modified model, the <b>induced-fit hypothesis</b>. It is similar to lock-and-key, but the enzyme and its active site (and sometimes the substrate) can <b>change shape slightly</b> as the substrate enters. These shape changes are called <b>conformational changes</b>. They give an ideal binding arrangement between enzyme and substrate and so maximise the ability of the enzyme to catalyse the reaction.</p>
{{AL_31_09}}
<table><tr><th></th><th>Lock-and-key</th><th>Induced fit</th></tr>
<tr><td>Active site</td><td>Rigid, fixed shape</td><td>Flexible, changes shape on binding</td></tr>
<tr><td>Fit of substrate</td><td>Exact fit from the start</td><td>Not a perfect fit until binding changes the active site</td></tr>
<tr><td>Status today</td><td>The earlier model (Fischer, 1890s)</td><td>The current accepted model</td></tr></table>
<div class="key"><b>Examiner tip</b>Our current understanding of enzyme-substrate interactions is based on the induced-fit hypothesis.</div>
<h4>Measuring enzyme activity</h4>
<p>The progress of an enzyme-catalysed reaction can be followed in two ways:</p>
<ul><li>measuring the <b>rate of formation of a product</b> (catalase);</li><li>measuring the <b>rate of disappearance of a substrate</b> (amylase).</li></ul>
<h4>Investigating catalase activity</h4>
<p>Hydrogen peroxide is a common but toxic by-product of metabolism, so it must be broken down quickly. <b>Catalase</b>, found in the cells of most organisms, breaks it down into water and oxygen. Hydrogen peroxide and catalase are combined and the <b>volume of oxygen</b> produced in a set time is measured. The rate of reaction can then be calculated.</p>
{{AL_31_10}}
<div class="ex"><b>Worked example</b>A potato catalase reaction collects 18 cm^3^ of oxygen in 60 seconds.<br>Rate = volume of oxygen / time = 18 / 60 = 0.30 cm^3^ s^-1^.</div>
<h4>Investigating amylase activity</h4>
<p><b>Amylase</b> is a digestive enzyme that hydrolyses starch into maltose and glucose. It works best at pH 7 and 37 degrees C. Amylase and starch are mixed, and the mixture is tested for starch at regular time intervals. A sample is taken at each interval and added to <b>iodine in potassium iodide solution</b>, which gives a blue-black colour with starch. The time taken for the starch to disappear (no blue-black colour) is measured. The investigation can be repeated at different pH values or temperatures and the rates compared.</p>
{{AL_31_11}}
<h4>Colorimetry to measure enzyme activity</h4>
<p>A <b>colorimeter</b> measures how much light is absorbed (absorbance) or how much passes through a substance (transmission). It can be used for any enzyme reaction involving a colour change. As the starch-iodine colour breaks down, transmission increases and absorbance decreases, and this is used to measure the rate of reaction. The method:</p>
<ol><li><b>Calibrate</b> the colorimeter. A weak iodine solution can be used to set the end point (100% transmission).</li><li>Make a <b>stock solution</b> of starch of known concentration, then make a range of concentrations by <b>serial dilution</b>.</li><li>Switch on the <b>red filter</b> to maximise the percentage transmission or absorbance readings.</li><li>Measure the percentage absorbance or transmission of each concentration.</li><li>Plot a <b>calibration graph</b> of starch concentration (x-axis) against percentage absorbance or transmission (y-axis).</li></ol>
{{AL_31_12}}
<div class="ex"><b>Worked example</b>1 cm^3^ of 1% starch is added to 9 cm^3^ of water. The new concentration is 1 / 10 = 0.1%. Repeating the step gives 0.01%, then 0.001%. Each solution is ten times less concentrated than the one before (a dilution factor of 10).</div>`,
I("How can we measure how fast an enzyme works?",
`<ol><li>Write down two measurements you could take to follow an enzyme-catalysed reaction: one for a product and one for a substrate.</li><li>For catalase and hydrogen peroxide, state what you would measure and with which apparatus.</li><li>For amylase and starch, state what you would test for, with which reagent, and what colour shows that starch is still present.</li><li>Explain why measuring the time for starch to disappear gives only a rough rate, and how colorimetry improves on this.</li></ol>`,
`<p><b>Starch disappearance with amylase.</b> Mix 5 cm^3^ of 1% starch with 2 cm^3^ of 1% amylase in a test tube at room temperature. Start a stopwatch. Every 30 seconds put one drop of the mixture into a well of a spotting tile containing a drop of iodine solution.</p><ol><li>Record the colour in each well and the time at which the iodine stays orange-brown.</li><li>Calculate the rate as 1 / time (s^-1^).</li><li>Repeat with the tube in a water bath at 40 degrees C and compare the rates.</li><li>Suggest two variables you must control to make the comparison fair.</li></ol>`),
[["State two differences between the lock-and-key hypothesis and the induced-fit hypothesis.","Any two from: lock-and-key has a rigid active site but induced fit has a flexible one that changes shape (a conformational change); lock-and-key substrate fits exactly from the start but in induced fit it fits more closely after binding; lock-and-key is the older model and induced fit is the current model (2).",2],
["Which hypothesis is currently accepted, and why does the conformational change help the enzyme?","The induced-fit hypothesis (1). The conformational change gives an ideal binding arrangement (1) which maximises the ability of the enzyme to catalyse the reaction (1).",3],
["A catalase experiment collects 24 cm^3^ of oxygen in 80 seconds. Calculate the rate of reaction.","Rate = 24 / 80 (1) = 0.30 cm^3^ s^-1^ (1).",2],
["Describe how the rate of the amylase and starch reaction can be measured using iodine.","Mix amylase and starch and start a timer (1). Take samples at regular intervals and add to iodine in potassium iodide (1). Starch gives a blue-black colour (1). Record the time at which the blue-black colour no longer appears (1).",4],
["A 1% starch stock is diluted by taking 1 cm^3^ and adding 9 cm^3^ of water, three times in a row. Calculate the final concentration and explain the use of a calibration graph in colorimetry.","First dilution 0.1%, second 0.01%, third 0.001% (1). The calibration graph of starch concentration against absorbance or transmission (1) is used to read the starch concentration from a colorimeter reading during the reaction (1).",3]],
[M("Who proposed the lock-and-key hypothesis?",["Michaelis","Fischer","Watson","Krebs"],1,"Emil Fischer in the 1890s."),
M("In the induced-fit hypothesis the active site:",["Is rigid","Changes shape slightly when the substrate binds","Is destroyed by the substrate","Does not exist"],1,"A conformational change occurs."),
N("An enzyme reaction produces 30 cm^3^ of gas in 120 s. What is the rate in cm^3^ s^-1^?",0.25,"cm^3^ s^-1^","30 divided by 120 is 0.25.",0.01),
T("Which reagent is used to test for starch?",["iodine"],"Iodine in potassium iodide solution."),
M("What colour shows starch is present with iodine solution?",["Orange-brown","Blue-black","Red","Green"],1,"Starch gives a blue-black colour."),
M("In a colorimeter, as starch is broken down the transmission:",["Decreases","Increases","Stays the same","Becomes zero"],1,"Less colour means more light passes through."),
N("1 cm^3^ of stock is added to 9 cm^3^ of water. By what factor is the solution diluted?",10,"","Total volume 10 cm^3^, so the dilution factor is 10."),
M("Which enzyme breaks hydrogen peroxide into water and oxygen?",["Amylase","Catalase","Lipase","Protease"],1,"Catalase.")],
[["Lock-and-key hypothesis","Enzyme and substrate are rigid and fit exactly, like a key in a lock (Fischer, 1890s)."],
["Induced-fit hypothesis","The enzyme and active site change shape slightly as the substrate binds, giving an ideal fit."],
["Conformational change","A change in shape of the enzyme or active site on binding the substrate."],
["How is catalase activity measured?","By the volume of oxygen collected in a set time."],
["How is amylase activity measured?","By the time taken for starch to disappear, tested with iodine in potassium iodide."],
["What does a colorimeter measure?","The absorbance or transmission of light through a solution."],
["Why use a red filter in colorimetry?","To maximise the percentage transmission or absorbance readings for the iodine-starch colour."],
["What is a serial dilution?","A series of solutions made by repeated dilution by the same factor, e.g. a factor of 10."],
["What is plotted on a calibration graph?","Concentration (x-axis) against percentage absorbance or transmission (y-axis)."]]);

AL_L["3.1"]=[AL_L311,AL_L312];
AL_Q["3.1"]=[
M("Which of these best describes an enzyme?",["A lipid that stores energy","A biological catalyst that is a globular protein","A nucleic acid","A carbohydrate used in cell walls"],1,"Enzymes are globular protein catalysts."),
M("Amylase is secreted by the salivary glands and the pancreas. It is therefore:",["Intracellular","Extracellular","Non-specific","An anabolic enzyme only"],1,"It works outside the cells that make it."),
M("Which reaction is catabolic?",["Photosynthesis","Protein synthesis","Hydrolysis","Joining two amino acids"],2,"Hydrolysis breaks molecules down."),
T("What name is given to the energy needed for a substrate to become unstable enough to react?",["activation energy"],"Activation energy."),
M("The current accepted model of enzyme action is:",["Lock and key","Induced fit","Fluid mosaic","Sliding filament"],1,"Induced fit."),
N("A catalase reaction produces 45 cm^3^ of oxygen in 90 s. What is the rate in cm^3^ s^-1^?",0.5,"cm^3^ s^-1^","45 / 90 = 0.5.",0.01),
T("Name the reagent used to detect starch.",["iodine"],"Iodine in potassium iodide solution.")];
AL_P["3.1"]=[
P("Enzyme action",6,"<p>Enzymes are biological catalysts.</p><ol type='a'><li>Describe how the induced-fit hypothesis differs from the lock-and-key hypothesis. [2]</li><li>Explain why an enzyme can only catalyse one type of reaction. [2]</li><li>Define <b>activation energy</b> and state how an enzyme affects it. [2]</li></ol>",
["(a) In lock-and-key the active site is rigid and fits the substrate exactly (1). In induced fit the active site changes shape when the substrate binds (1).","(b) The active site has a specific shape (1) that is complementary to only one substrate (1).","(c) The energy needed for the substrate to become unstable enough to react (1). The enzyme lowers it (1)."],"Hub exam-style question (written for this hub), Topic 3"),
P("Catalase investigation",6,"<p>A student investigates catalase in potato. Potato cubes are added to hydrogen peroxide in a conical flask and the oxygen produced is collected in a measuring cylinder over water. The student collects 27 cm<sup>3</sup> of oxygen in 90 seconds.</p><ol type='a'><li>Calculate the rate of reaction. Show your working. [2]</li><li>Explain why the volume of oxygen can be used to measure enzyme activity. [2]</li><li>State two variables the student must keep constant. [2]</li></ol>",
["(a) Rate = 27 / 90 (1) = 0.30 cm<sup>3</sup> s<sup>-1</sup> (1).","(b) Oxygen is a product of the reaction (1) so the volume made in a set time shows how fast the enzyme is working (1).","(c) Any two from: temperature, pH, volume or concentration of hydrogen peroxide, mass or surface area of potato (2)."],"Hub exam-style question (written for this hub), Topic 3"),
P("Starch, amylase and colorimetry",6,"<p>A technician makes a calibration curve for a colorimeter using a 1% starch stock solution. She adds 1 cm<sup>3</sup> of stock to 9 cm<sup>3</sup> of water, then repeats this dilution on each new solution.</p><ol type='a'><li>State the concentration of starch after the third dilution. [1]</li><li>Explain why a red filter is used in the colorimeter. [1]</li><li>Describe how the calibration graph is used to follow the breakdown of starch by amylase. [2]</li><li>Describe a simpler method that could be used to measure the rate of the reaction without a colorimeter. [2]</li></ol>",
["(a) 0.001% (1).","(b) To maximise the percentage transmission or absorbance readings (1).","(c) Measure the absorbance or transmission of the reaction mixture at intervals (1) and use the graph to read off the starch concentration at each time (1).","(d) Take samples at regular intervals and test with iodine solution (1). Record the time for the blue-black colour to disappear (1)."],"Hub exam-style question (written for this hub), Topic 3")];

/* ===================== 3.2 FACTORS ===================== */
const AL_L321=L("Temperature, pH and concentration","How temperature, pH, enzyme concentration and substrate concentration affect the rate of enzyme-catalysed reactions, including denaturation, buffers and Vmax.",
`<h4>Rate and temperature</h4>
<p>Every enzyme has an <b>optimum temperature</b>, the temperature at which it catalyses a reaction at the maximum rate.</p>
<p><b>Lower temperatures</b> slow or prevent reactions: molecules move more slowly, there are fewer successful collisions between substrate and active site, enzyme-substrate complexes form less often, and collisions have less energy so bonds are less likely to be formed or broken.</p>
<p><b>Higher temperatures</b> speed reactions up: molecules move faster, there are more frequent successful collisions, more enzyme-substrate complexes form, and collisions have more energy.</p>
<p>As the temperature keeps rising, the rate <b>drops sharply</b> because the enzyme <b>denatures</b>. Hydrogen bonds and other bonds holding the enzyme in its precise shape break. The tertiary structure changes, the active site is permanently damaged and the substrate can no longer bind. Very few human enzymes work above 50 degrees C, and even temperatures above 40 degrees C denature many, because body temperature is about 37 degrees C.</p>
{{AL_32_01}}
<div class="key"><b>Examiner tip</b>When explaining how temperature affects rate, always say how it affects the speed of the molecules (enzyme and substrate) and therefore the number of successful collisions.</div>
<h4>Rate and pH</h4>
<p>Every enzyme has an <b>optimum pH</b>, and enzymes are denatured at extremes of pH. Hydrogen and ionic bonds hold the tertiary structure together. Excess H^+^ ions (acidic) or OH^-^ ions (alkaline) break these bonds, which alters the shape of the active site. Enzyme-substrate complexes form less easily and eventually not at all, and the enzyme is completely denatured.</p>
<p>Where an enzyme works indicates its optimum. Pepsin works in the stomach at about pH 2, so its optimum is pH 2.</p>
{{AL_32_02}}
<p>To investigate pH, use <b>buffer solutions</b>. Each buffer has a specific pH and keeps that pH even if the reaction would otherwise change it. Add the same measured volume of each buffer to the reaction mixture.</p>
<div class="key"><b>Examiner tip</b>Temperature affects both the speed of the molecules (collision rate) and can denature enzymes. pH does not affect collision rate. It only disrupts the ability of the substrate to bind, reducing successful collisions until the active site changes shape so much that none can occur.</div>
<h4>Rate and enzyme concentration</h4>
<p>The higher the enzyme concentration, the more active sites are available and the more likely enzyme-substrate complexes are to form. As long as there is enough substrate, the <b>initial rate increases linearly</b> with enzyme concentration. If substrate is limited, further increases in enzyme concentration will not increase the rate because the substrate becomes the <b>limiting factor</b>.</p>
{{AL_32_03}}
<h4>Rate and substrate concentration</h4>
<p>As substrate concentration increases, the chance of forming enzyme-substrate complexes increases, so the rate rises. If the enzyme concentration is fixed, there comes a point when all the active sites are <b>saturated</b>. Extra substrate molecules have nowhere to bind, so the rate <b>plateaus</b>.</p>
{{AL_32_04}}
<div class="key"><b>Examiner tip</b>At saturation the substrate molecules are effectively queuing for an active site. The enzyme is working at its maximum possible rate, <b>V~max~</b> (velocity).</div>
<h4>Summary of the four factors</h4>
<table><tr><th>Factor</th><th>Effect on rate</th><th>Explanation</th></tr>
<tr><td>Temperature</td><td>Rises to an optimum, then falls sharply</td><td>More kinetic energy and collisions; high temperature denatures</td></tr>
<tr><td>pH</td><td>Maximum at the optimum, falls on either side</td><td>H^+^ or OH^-^ ions break bonds and change the active site</td></tr>
<tr><td>Enzyme concentration</td><td>Linear increase while substrate is in excess</td><td>More active sites; substrate becomes limiting</td></tr>
<tr><td>Substrate concentration</td><td>Increases then plateaus (V~max~)</td><td>Active sites become saturated</td></tr></table>`,
I("Which factor limits the rate of an enzyme reaction?",
`<ol><li>Sketch the four graphs: rate against temperature, pH, enzyme concentration and substrate concentration.</li><li>On each graph mark where the rate rises, where it levels off and where it falls.</li><li>For each part of each graph, write what is limiting the rate.</li><li>Choose the graph where the shape changes if you keep adding more of the variable, and explain why.</li></ol>`,
`<p><b>Effect of temperature on amylase.</b> Set up water baths at 10, 20, 30, 40, 50 and 60 degrees C. Place tubes of 5 cm^3^ starch and tubes of 2 cm^3^ amylase in each bath for five minutes. Mix them and test samples with iodine every 30 seconds.</p><ol><li>Record the time for starch to disappear at each temperature and calculate rate = 1 / time.</li><li>Plot rate against temperature and mark the optimum.</li><li>Explain the shape of the graph at high temperature.</li><li>State two control variables and one safety precaution.</li></ol>`),
[["Describe and explain the effect of increasing temperature from 10 degrees C to 30 degrees C on the rate of an enzyme-catalysed reaction.","The rate increases (1). Molecules move faster / have more kinetic energy (1) so there are more frequent successful collisions between substrate and active sites (1) and more enzyme-substrate complexes form (1).",4],
["Explain why the rate falls sharply above the optimum temperature.","The enzyme denatures (1). Hydrogen bonds holding the tertiary structure break (1), the shape of the active site changes (1) and the substrate can no longer bind (1).",4],
["Explain how a pH far from the optimum stops an enzyme working.","Excess H^+^ or OH^-^ ions break hydrogen and ionic bonds (1). This changes the tertiary structure and the shape of the active site (1). Enzyme-substrate complexes can no longer form (1).",3],
["Why are buffer solutions used when investigating the effect of pH?","They keep the pH constant (1) even if the reaction would otherwise change it (1).",2],
["Explain the shape of a graph of rate against substrate concentration when enzyme concentration is fixed.","Rate increases at first because more substrate means more collisions and enzyme-substrate complexes (1). It then plateaus because all active sites are saturated (1) and the enzyme is working at Vmax (1).",3]],
[M("The temperature at which an enzyme works at its maximum rate is its:",["Denaturation point","Optimum temperature","Activation temperature","Saturation point"],1,"Optimum temperature."),
M("Which bonds are broken by high temperature in an enzyme?",["Hydrogen bonds","Peptide bonds only","Covalent bonds in water","Ionic bonds in salt"],0,"Hydrogen bonds hold the tertiary structure."),
N("Pepsin works in the stomach. Its approximate optimum pH is:",2,"","Stomach acid gives pH 2.",0.1),
M("What is the purpose of a buffer solution?",["To change the pH","To maintain a specific pH","To denature the enzyme","To speed up the reaction"],1,"Buffers maintain pH."),
M("As enzyme concentration increases with plenty of substrate, the initial rate:",["Falls","Increases linearly","Stays the same","Plateaus immediately"],1,"More active sites means a linear increase."),
M("Why does the rate plateau at high substrate concentration?",["The enzyme is denatured","All active sites are saturated","The temperature falls","The pH changes"],1,"Active sites are saturated."),
T("What symbol is given to the maximum rate of an enzyme-catalysed reaction?",["vmax","v max","v(max)"],"Vmax."),
M("Which factor does NOT change the collision rate between enzyme and substrate?",["Temperature","pH","Both change collision rate","Neither"],1,"pH disrupts binding rather than collision rate.")],
[["What is the optimum temperature?","The temperature at which an enzyme catalyses a reaction at the maximum rate."],
["Why does rate increase as temperature rises towards the optimum?","Molecules move faster, so there are more frequent and more energetic successful collisions."],
["What happens to an enzyme above its optimum temperature?","Bonds holding the tertiary structure break, the active site changes shape and the enzyme denatures."],
["Why does pH affect enzymes?","H^+^ and OH^-^ ions break hydrogen and ionic bonds, changing the shape of the active site."],
["What is a buffer solution?","A solution that holds a specific pH even when the reaction would change it."],
["Enzyme concentration and rate","Initial rate increases linearly if substrate is in excess."],
["Substrate concentration and rate","Rate increases, then plateaus when active sites are saturated."],
["What is Vmax?","The maximum rate of reaction at saturating substrate concentration."],
["Pepsin optimum pH","About pH 2, matching the acid in the stomach."]]);

const AL_L322=L("Inhibitors, Vmax and the Michaelis-Menten constant","Competitive and non-competitive reversible inhibitors, their effect on rate, Vmax and Km, enzyme affinity, and end-product inhibition.",
`<h4>Types of enzyme inhibitor</h4>
<p>An enzyme's activity can be reduced or stopped, temporarily, by a <b>reversible inhibitor</b>. There are two types:</p>
<ul><li><b>Competitive inhibitors</b> have a similar shape to the substrate and <b>compete for the active site</b>.</li><li><b>Non-competitive inhibitors</b> bind to the enzyme at an <b>alternative site</b>, which alters the shape of the active site so the substrate cannot bind.</li></ul>
{{AL_32_07}}
<p>Both types slow down or stop enzyme activity.</p>
<h4>Effect of inhibitor concentration</h4>
<p>Increasing the concentration of an inhibitor reduces the rate of reaction, and the reaction eventually stops if the concentration keeps increasing.</p>
<ul><li>For a <b>competitive</b> inhibitor, increasing the <b>substrate concentration</b> can raise the rate again, because more substrate molecules are more likely to collide with enzymes and form enzyme-substrate complexes.</li><li>For a <b>non-competitive</b> inhibitor, increasing the substrate concentration <b>cannot</b> restore the rate, because the shape of the active site remains changed.</li></ul>
{{AL_32_05}}
<div class="key"><b>Examiner tip</b>A competitive inhibitor lowers the initial rate by occupying some active sites, but eventually the same maximum amount of product forms (the maximal rate is not affected). A non-competitive inhibitor lowers both the initial rate and the maximal rate.</div>
<h4>V~max~ and the Michaelis-Menten constant</h4>
<p>The <b>Michaelis-Menten model</b> describes the kinetics of enzyme-catalysed reactions (kinetics is the study of how different variables affect reaction rates). The rate is measured at different substrate concentrations. Two values describe the reaction:</p>
<ul><li><b>V~max~</b>, the maximum rate (maximal velocity) at saturating substrate concentration;</li><li><b>K~m~</b>, the <b>Michaelis-Menten constant</b>, the substrate concentration at which the enzyme works at <b>half V~max~</b>.</li></ul>
{{AL_32_06}}
<p>At K~m~, half of the active sites are occupied by substrate. The higher the affinity of the enzyme for its substrate, the lower the substrate concentration needed for this, so there is an <b>inverse relationship</b> between K~m~ and affinity:</p>
<table><tr><th>K~m~</th><th>Affinity for the substrate</th></tr><tr><td>Low K~m~</td><td>High affinity (half V~max~ is reached at a low substrate concentration)</td></tr><tr><td>High K~m~</td><td>Low affinity</td></tr></table>
<div class="key"><b>Examiner tip</b>Make sure you can identify V~max~ and K~m~ on a graph. Find V~max~ on the plateau, halve it, then read across to the curve and down to the substrate axis for K~m~.</div>
<div class="ex"><b>Worked example</b>Enzyme A reaches a V~max~ of 40 units. Half of this is 20 units, reached at a substrate concentration of 2 mmol dm^-3^. Enzyme B has the same V~max~ but reaches 20 units at 8 mmol dm^-3^.<br>K~m~ of A = 2 mmol dm^-3^ and K~m~ of B = 8 mmol dm^-3^. Enzyme A has the lower K~m~, so it has the higher affinity for the substrate.</div>
<h4>End-product inhibition</h4>
<p>Reversible inhibitors can act as <b>regulators</b> in metabolic pathways. Metabolic reactions must be tightly controlled so that no enzyme runs out of control and makes more and more of a product. This can be done using the end-product of a sequence of reactions as a <b>non-competitive reversible inhibitor</b>:</p>
{{AL_32_08}}
<ol><li>The enzyme converts substrate to product, and the sequence continues to the end-product.</li><li>The end-product binds to an alternative site on the first enzyme, changing the shape of the active site so that no more enzyme-substrate complexes form.</li><li>The end-product then detaches and can be used elsewhere. The active site re-forms and the enzyme becomes active again.</li><li>When product levels fall, the enzyme starts catalysing again, in a continuous feedback loop.</li></ol>
<p>This process is called <b>end-product inhibition</b>.</p>`,
I("How do inhibitors change the shape of the rate graph?",
`<ol><li>On the same axes, sketch rate against substrate concentration for a normal enzyme, an enzyme with a competitive inhibitor and an enzyme with a non-competitive inhibitor.</li><li>Label Vmax on each curve.</li><li>Explain why the competitive inhibitor curve can reach the same Vmax but the non-competitive one cannot.</li><li>Describe how the active site changes in each case, using the diagram of inhibition.</li></ol>`,
`<p><b>Model competition with counters.</b> Work in pairs. One person is the enzyme (a hand with a gap), blue counters are substrate and red counters are inhibitor. In 20 seconds, pick up counters that fit the gap one at a time and count the blue counters collected.</p><ol><li>Repeat with 5, 10 and 20 blue counters and no red counters.</li><li>Repeat with 10 red counters added. This models a competitive inhibitor. Record the blue counters collected at each substrate level.</li><li>Plot rate against substrate number for both sets and comment on Vmax.</li><li>Explain how you would model a non-competitive inhibitor with this activity.</li></ol>`),
[["Describe how a competitive inhibitor reduces the rate of an enzyme-catalysed reaction.","It has a similar shape to the substrate (1) and binds to the active site (1), so fewer substrate molecules can bind and fewer enzyme-substrate complexes form (1).",3],
["Describe how a non-competitive inhibitor reduces the rate.","It binds at an alternative site (1), changing the shape of the active site (1) so the substrate cannot bind (1).",3],
["Explain why increasing substrate concentration reduces the effect of a competitive inhibitor but not a non-competitive inhibitor.","More substrate molecules compete more successfully for the active site (1), so the competitive inhibitor is outcompeted (1). A non-competitive inhibitor does not occupy the active site, and the active site stays altered (1).",3],
["Define Km and state what a low Km shows.","Km is the substrate concentration at which the enzyme works at half Vmax (1). A low Km shows a high affinity for the substrate (1).",2],
["Explain how end-product inhibition controls a metabolic pathway.","The end-product acts as a non-competitive inhibitor of the first enzyme (1). It binds to an alternative site and changes the active site (1) so less product is made. When the end-product level falls it detaches and the enzyme works again (1).",3]],
[M("A competitive inhibitor:",["Binds to an alternative site","Has a similar shape to the substrate","Increases Vmax","Denatures the enzyme permanently"],1,"It competes for the active site."),
M("Which inhibitor lowers the maximal rate of reaction?",["Competitive","Non-competitive","Both reduce Vmax equally","Neither"],1,"Non-competitive inhibitors lower Vmax."),
M("Km is the substrate concentration at which the rate is:",["Vmax","Half Vmax","Zero","Double Vmax"],1,"Half Vmax."),
M("An enzyme with a low Km has:",["Low affinity","High affinity","No active site","Reached Vmax"],1,"Low Km means high affinity."),
T("What name is given to the control of a pathway by its final product inhibiting an earlier enzyme?",["end-product inhibition","end product inhibition","feedback inhibition"],"End-product inhibition."),
M("Increasing substrate concentration can overcome which type of inhibition?",["Competitive","Non-competitive","Both","Neither"],0,"The substrate outcompetes the inhibitor."),
M("A reversible inhibitor:",["Permanently destroys the enzyme","Can detach from the enzyme","Is a substrate","Is a coenzyme"],1,"Reversible inhibition is temporary."),
N("Vmax is 30 units. At what rate is Km read from the graph?",15,"units","Km is the substrate concentration at half Vmax, so the rate is 15.",0.1)],
[["What is a reversible inhibitor?","A molecule that temporarily reduces or stops enzyme activity."],
["Competitive inhibitor","Similar shape to the substrate; competes for the active site."],
["Non-competitive inhibitor","Binds at an alternative site and changes the shape of the active site."],
["Can more substrate reverse a competitive inhibitor?","Yes, more substrate molecules outcompete the inhibitor."],
["Can more substrate reverse a non-competitive inhibitor?","No, the active site stays altered."],
["Define Vmax","The maximum rate of reaction at saturating substrate concentration."],
["Define Km","The substrate concentration at which the enzyme works at half Vmax (the Michaelis-Menten constant)."],
["What does a low Km mean?","High affinity of the enzyme for its substrate."],
["What is end-product inhibition?","The end-product of a pathway acts as a non-competitive reversible inhibitor of an earlier enzyme, giving negative feedback."]]);

const AL_L323=L("Immobilised and free enzymes","What immobilised enzymes are, their advantages over free enzymes, and the use of immobilised lactase in alginate beads to make lactose-free milk.",
`<h4>Free and immobilised enzymes</h4>
<p>Enzymes can be added to solutions, in which case they are <b>free</b>, or they can be <b>immobilised</b>. Immobilised enzymes are <b>bound to an inert, stationary, insoluble material</b> such as <b>alginate</b>. The substrate is passed over the immobilised enzyme and the product is collected.</p>
<h4>Advantages of immobilised enzymes</h4>
<table><tr><th>Advantage</th><th>Why it matters</th></tr>
<tr><td>Product is uncontaminated</td><td>There is no enzyme in the product, so no extra processing or filtering is needed</td></tr>
<tr><td>Enzyme can be reused many times</td><td>Efficient and cost-effective, because enzymes are expensive</td></tr>
<tr><td>Greater tolerance of temperature and pH changes</td><td>Immobilisation often makes enzymes more stable</td></tr></table>
<h4>Making lactose-free milk</h4>
<p>Milk is a valuable source of protein, fat and the carbohydrate <b>lactose</b>. About 5 to 10% of the UK population are lactose intolerant. Lactose is a disaccharide that is broken down into <b>glucose</b> and <b>galactose</b>.</p>
{{AL_32_10}}
<p>The enzyme <b>lactase</b> is immobilised in alginate beads packed into a column. Milk is run through the column and the lactase hydrolyses lactose to glucose and galactose, which can be easily absorbed by people who are lactose intolerant. The milk can also be used to make other lactose-free dairy products.</p>
{{AL_32_09}}
<div class="key"><b>Examiner tip</b>For "advantages of immobilised enzymes" give specific reasons: reuse of the enzyme, a product free of enzyme, and greater stability to temperature and pH. Do not simply write "they work better".</div>
<div class="ex"><b>Worked example</b>Why is lactase immobilised in a column rather than added directly to the milk?<br>If the lactase were free, it would end up in the milk and could not be recovered. Immobilised lactase stays in the beads, so the milk is not contaminated, the lactase can be reused many times and it is more stable.</div>`,
I("Should a dairy use free or immobilised lactase?",
`<ol><li>List the advantages of immobilised enzymes from the notes.</li><li>Think of any disadvantage a manufacturer might see (for example, the cost of setting up the beads or slower access of substrate to the enzyme).</li><li>Decide which method you would recommend to a dairy making lactose-free milk every day and justify your decision.</li></ol>`,
`<p><b>Making alginate beads (teacher-led).</b> Mix sodium alginate solution with a lactase solution. Using a syringe, drip the mixture into calcium chloride solution so that beads form. Rinse the beads and pack them in a syringe barrel with cotton wool at the bottom.</p><ol><li>Pass milk or lactose solution through the column and collect the liquid.</li><li>Test samples with a glucose test strip and compare with the original milk.</li><li>State why the beads can be washed and reused.</li><li>Suggest why the flow rate affects the amount of lactose converted.</li></ol>`),
[["State what is meant by an immobilised enzyme.","An enzyme that has been bound to an inert, insoluble, stationary material such as alginate (1).",1],
["Give three advantages of using immobilised enzymes in industry.","Any three from: product is not contaminated with enzyme, no need to filter or process the product, the enzyme can be reused, cost-effective as enzymes are expensive, greater tolerance of temperature and pH changes (3).",3],
["Describe how lactose-free milk is made using immobilised lactase.","Lactase is immobilised in alginate beads (1) in a column (1). Milk is passed through the beads (1). Lactase hydrolyses lactose into glucose and galactose (1).",4],
["Explain why lactose-free milk can be consumed by lactose-intolerant people.","The lactose has been broken down into glucose and galactose (1), which are monosaccharides that can be easily absorbed (1).",2]],
[M("Which material is commonly used to immobilise enzymes?",["Alginate","Starch","Cellulose","Glycogen"],0,"Alginate beads."),
M("Lactase breaks lactose into:",["Glucose and fructose","Glucose and galactose","Two glucose molecules","Maltose"],1,"Glucose and galactose."),
M("One advantage of immobilised enzymes is that they:",["Contaminate the product","Can be reused","Are destroyed by heat","Cannot bind substrate"],1,"They can be reused."),
T("Name the disaccharide found in milk.",["lactose"],"Lactose."),
M("Which statement about immobilised enzymes is correct?",["They are free in solution","They are bound to an insoluble inert material","They are only used in the body","They are always inhibitors"],1,"They are bound to an inert, insoluble support."),
M("Why is the product from an immobilised enzyme column uncontaminated?",["The enzyme stays in the column","The enzyme is destroyed","The product is boiled","The enzyme is a substrate"],0,"The enzyme remains in the beads.")],
[["What is an immobilised enzyme?","An enzyme bound to an inert, stationary, insoluble material such as alginate."],
["Advantage 1 of immobilised enzymes","The product is not contaminated with enzyme."],
["Advantage 2 of immobilised enzymes","The enzyme can be reused, which is cost-effective."],
["Advantage 3 of immobilised enzymes","Greater tolerance of temperature and pH changes."],
["What does lactase do?","Hydrolyses lactose to glucose and galactose."],
["How is lactose-free milk made?","Milk is passed through a column of alginate beads containing immobilised lactase."],
["Lactose is a ...","Disaccharide in milk."],
["Why can lactose-intolerant people drink lactose-free milk?","Lactose has already been broken down into easily absorbed monosaccharides."]]);

AL_L["3.2"]=[AL_L321,AL_L322,AL_L323];
AL_Q["3.2"]=[
M("An enzyme works at its fastest rate at its:",["Minimum temperature","Optimum temperature","Boiling point","Freezing point"],1,"The optimum temperature."),
M("High temperature causes denaturation because:",["Substrate evaporates","Bonds holding the tertiary structure break","Peptide bonds form","Enzymes become smaller"],1,"Hydrogen bonds break."),
M("Which graph feature shows saturation?",["A straight line","A plateau","A peak then fall","A downward line"],1,"The rate plateaus."),
M("A non-competitive inhibitor binds:",["At the active site","At an alternative site","To the substrate","To the product"],1,"At an alternative binding site."),
M("An enzyme has a low Km. It has:",["Low affinity","High affinity","Low Vmax only","No specificity"],1,"Low Km means high affinity."),
T("What is the name for the maximum rate of an enzyme-catalysed reaction?",["vmax","v max"],"Vmax."),
M("Which is an advantage of immobilised enzymes?",["They contaminate the product","They can be reused","They need more filtering","They are more expensive each time"],1,"They can be reused."),
N("Vmax is 50 units. What rate corresponds to Km?",25,"units","Half Vmax.",0.1)];
AL_P["3.2"]=[
P("Effect of temperature",6,"<p>A student measures the rate of an enzyme-catalysed reaction at different temperatures.</p><table><tr><th>Temperature / &deg;C</th><th>10</th><th>20</th><th>30</th><th>40</th><th>50</th><th>60</th></tr><tr><td>Rate / arbitrary units</td><td>2</td><td>5</td><td>10</td><td>16</td><td>6</td><td>0</td></tr></table><ol type='a'><li>State the optimum temperature from the data. [1]</li><li>Describe the change in rate from 10 &deg;C to 40 &deg;C and explain it. [3]</li><li>Explain the decrease in rate between 40 &deg;C and 60 &deg;C. [2]</li></ol>",
["(a) 40 &deg;C (1).","(b) Rate increases (1) because molecules move faster / have more kinetic energy (1) so there are more successful collisions between enzyme and substrate (1).","(c) The enzyme denatures (1) as hydrogen bonds break and the active site changes shape so the substrate cannot bind (1)."],"Hub exam-style question (written for this hub), Topic 3"),
P("pH and enzyme concentration",5,"<p>Three enzymes have different optimum pH values: pepsin pH 2, urease pH 7 and trypsin pH 8.</p><ol type='a'><li>Explain why pepsin works best at pH 2. [1]</li><li>Explain why pepsin is denatured at pH 8. [2]</li><li>Describe the effect of increasing enzyme concentration on the initial rate, with excess substrate, and explain the effect. [2]</li></ol>",
["(a) Pepsin works in the stomach, where the acid gives pH 2 (1).","(b) OH<sup>-</sup> ions break hydrogen and ionic bonds (1) which changes the shape of the active site so substrate cannot bind (1).","(c) Rate increases linearly (1) because there are more active sites available to form enzyme-substrate complexes (1)."],"Hub exam-style question (written for this hub), Topic 3"),
P("Vmax and Km",5,"<p>The initial rate of an enzyme-catalysed reaction was measured at different substrate concentrations for two enzymes, X and Y.</p><table><tr><th>Substrate / mmol dm<sup>-3</sup></th><th>2</th><th>4</th><th>8</th><th>16</th><th>32</th></tr><tr><td>Rate of X / units</td><td>10</td><td>16</td><td>20</td><td>24</td><td>24</td></tr><tr><td>Rate of Y / units</td><td>4</td><td>8</td><td>14</td><td>20</td><td>24</td></tr></table><ol type='a'><li>State the Vmax of enzyme X. [1]</li><li>Calculate half Vmax and use the data to estimate Km for enzyme X. [2]</li><li>State, with a reason, which enzyme has the higher affinity for the substrate. [2]</li></ol>",
["(a) 24 units (1).","(b) Half Vmax = 12 (1) and Km is about 2.5 to 3 mmol dm<sup>-3</sup> (the rate of 12 is reached between 2 and 4) (1).","(c) Enzyme X (1) because it reaches half Vmax at a lower substrate concentration / lower Km (1)."],"Hub exam-style question (written for this hub), Topic 3"),
P("Inhibitors and immobilised enzymes",6,"<p>An inhibitor is added to an enzyme-catalysed reaction.</p><ol type='a'><li>Describe how a competitive inhibitor differs from a non-competitive inhibitor in how it binds to the enzyme. [2]</li><li>Explain why adding more substrate overcomes competitive inhibition but not non-competitive inhibition. [2]</li><li>Lactase can be immobilised in alginate beads. State two advantages of using immobilised lactase to make lactose-free milk. [2]</li></ol>",
["(a) Competitive binds at the active site (1). Non-competitive binds at an alternative site and changes the shape of the active site (1).","(b) More substrate outcompetes the competitive inhibitor for the active site (1). A non-competitive inhibitor does not use the active site, so more substrate cannot restore the active site shape (1).","(c) Any two from: milk is not contaminated with enzyme, enzyme can be reused, greater tolerance of temperature and pH (2)."],"Hub exam-style question (written for this hub), Topic 3")];
