/* ===== Biology 9700 sections 2.1 and 2.2 (alevel_b.js): original diagrams from the supplied notes via ALF(); figures AL_21_NN and AL_22_NN ===== */
[
["AL_21_01","2.1_f01","The Benedict’s test for reducing sugars: the mixture is heated in a boiling water bath and the colour change observed.","Apparatus for the Benedict’s test: a test tube of sample and Benedict’s solution heated in a water bath over a Bunsen burner, with safety precautions"],
["AL_21_02","2.1_f02","The emulsion test for lipids: the food is shaken with ethanol, the ethanol is decanted into water and a milky emulsion shows lipid is present.","Four-step emulsion test: food sample in ethanol, shake, decant into a tube of water, observe a milky emulsion"],
["AL_21_03","2.1_f03","Making serial dilutions from a stock solution, either by doubling dilutions or to a desired range of concentrations.","Rows of test tubes showing doubling dilutions and a desired range of glucose concentrations, with a table of volumes of water and stock solution"],
["AL_21_04","2.1_f04","A colorimeter. It is calibrated with a blank, then the cuvette of sample is placed in the holder and the reading taken.","Colorimeter with a display reading absorbance, calibrate and measure buttons, the cuvette holder and a cuvette"],
["AL_21_05","2.1_f05","A calibration curve of absorbance against glucose concentration. The dashed lines show how an unknown concentration is read from its absorbance.","Graph of absorbance at 635 nm against glucose concentration in mmol per dm cubed with a straight line through the origin"],
["AL_21_06","2.1_f06","Reducing and non-reducing sugars: sucrose is the only non-reducing sugar you really need to know.","Table: reducing sugars are galactose, glucose, fructose and maltose; the non-reducing sugar is sucrose"]
].forEach(([n,k,c,a])=>{FIGS[n]=()=>ALF(k,c,a)});

const AL_L211=L("Tests for biological molecules","The Benedict’s, iodine, emulsion and biuret tests, and the modified Benedict’s test used to detect non-reducing sugars such as sucrose.",
`<h4>Testing for key biological molecules</h4>
<p>There are a number of tests that can be done quickly and easily in the laboratory to find out whether a sample contains one of the key biological molecules: <b>carbohydrates</b>, <b>proteins</b> and <b>lipids</b>.</p>
<p>These tests are <b>qualitative</b>. They tell you whether a molecule is present but do not give an exact value for how much is present. Only the Benedict’s test is described as <b>semi-quantitative</b> because the size of the colour change gives some idea of the amount.</p>
<table><tr><th>Molecule</th><th>Test reagent</th><th>Positive result</th><th>Negative result</th></tr>
<tr><td>Reducing sugar</td><td>Benedict’s reagent, heated</td><td>Green, yellow, orange or brick-red precipitate</td><td>Stays blue</td></tr>
<tr><td>Starch</td><td>Iodine in potassium iodide solution</td><td>Blue-black</td><td>Stays orange-brown</td></tr>
<tr><td>Lipid</td><td>Ethanol, then water (emulsion test)</td><td>Milky white emulsion</td><td>Stays clear</td></tr>
<tr><td>Protein</td><td>Biuret reagent (alkali + copper(II) sulfate)</td><td>Lilac or purple</td><td>Stays blue</td></tr></table>
<h4>The Benedict’s test for reducing sugars</h4>
<ol><li>Add Benedict’s reagent to a sample solution in a test tube. The reagent is blue because it contains copper(II) sulfate.</li><li>Heat the test tube in a water bath that has been brought to the boil, for a few minutes.</li><li>Observe any colour change.</li></ol>
<p>If a reducing sugar is present, the copper(II) ions are <b>reduced</b> to copper(I) oxide, which is insoluble in water, so a coloured <b>precipitate</b> forms. A positive result is a colour change somewhere along the scale from blue (no reducing sugar) through green, yellow and orange to brown or brick-red (a high concentration of reducing sugar).</p>
<p>The test is <b>semi-quantitative</b>: the further along the colour scale, the higher the concentration of reducing sugar.</p>
{{AL_21_01}}
<div class="key"><b>Safety</b>Handle the hot test tube with tongs, and wear safety goggles and heatproof gloves.</div>
<h4>The iodine test for starch</h4>
<p>Add a few drops of orange-brown <b>iodine in potassium iodide solution</b> to the sample. The iodine is dissolved in potassium iodide solution because iodine is not soluble in water.</p>
<p>If starch is present, iodide ions in the solution interact with the centre of the starch molecules and produce a complex with a distinctive <b>blue-black</b> colour. The test is useful in experiments to show that starch has been digested by an enzyme, because the blue-black colour disappears.</p>
<h4>The emulsion test for lipids</h4>
<p>Lipids are non-polar molecules that do not dissolve in water but do dissolve in organic solvents such as ethanol.</p>
<ol><li>Grind a solid food sample up first, then add ethanol to the sample in a test tube. Use a bung when shaking.</li><li>Decant the food and ethanol solution into a tube of water.</li><li>Observe the result.</li></ol>
<p>If lipid is present, a <b>milky white emulsion</b> forms. The more lipid there is, the more obvious the milky colour. If no lipid is present, the solution stays clear.</p>
{{AL_21_02}}
<h4>The biuret test for proteins</h4>
<p>The liquid sample is first made alkaline by adding sodium hydroxide or potassium hydroxide solution. A few drops of blue copper(II) sulfate solution are then added. (The <b>biuret reagent</b> contains an alkali and copper(II) sulfate.)</p>
<p>A colour change from blue to <b>lilac or purple</b> shows that protein is present. If there is no colour change, there is no protein. The colour change can be very subtle, so hold the test tubes against a white tile when making observations.</p>
<div class="key"><b>Exam tip</b>The biuret test only works if there are at least two peptide bonds in the molecules. If the sample contains only amino acids or dipeptides, the result will be negative.</div>
<h4>Testing for non-reducing sugars</h4>
<p>Sugars are classified as <b>reducing</b> or <b>non-reducing</b> depending on whether they can donate electrons. If a Benedict’s test shows that no reducing sugar is present, a modified version of the test can be used to find out whether a <b>non-reducing sugar</b> is present.</p>
<ol><li>Add dilute hydrochloric acid to the sample and heat it in a boiling water bath.</li><li>Neutralise the solution with sodium hydrogencarbonate. Use an indicator such as red litmus paper to see when it is neutralised, then add a little more sodium hydrogencarbonate because the conditions must be slightly alkaline for Benedict’s test to work.</li><li>Carry out the Benedict’s test as normal: add Benedict’s reagent and heat in a boiling water bath.</li></ol>
<p>If an orange-red precipitate forms, a non-reducing sugar was present.</p>
<p><b>Explanation:</b> the acid hydrolyses the glycosidic bonds in the disaccharide. The monosaccharides that result have an aldehyde or ketone group that can donate electrons to copper(II) sulfate, reducing the copper and allowing a precipitate to form.</p>
{{AL_21_06}}
<div class="ex"><b>Worked example</b>A sample gives a negative Benedict’s test. After boiling with dilute hydrochloric acid, neutralising and repeating the test, an orange-red precipitate forms. What does this show?<br>The sample contained a non-reducing sugar, such as sucrose. The acid hydrolysed the glycosidic bond, giving reducing monosaccharides.</div>`,
I("How can we show which biological molecules a food contains?",
`<ol><li>Write down what you already know about the colour changes for starch, reducing sugar, lipid and protein.</li><li>Predict which of these four molecules you would expect to find in egg white, vegetable oil, glucose solution and starch suspension.</li><li>Plan what you would do to test each sample and what controls you would use.</li><li>Decide how you would tell a positive result from a negative one.</li></ol>`,
`<p><b>Test the unknowns.</b> Your teacher gives you four unlabelled samples (for example glucose solution, starch suspension, egg white solution and vegetable oil) and a tube of distilled water as a control.</p><ol><li>Carry out all four tests on each sample and on the water. Use the same volumes each time.</li><li>Record the colours in a table with the results for each test.</li><li>Identify each sample from your results.</li><li>Add a fifth sample of sucrose solution. Which tests are positive? Carry out the modified test for non-reducing sugars and explain the change.</li></ol><p>Wear eye protection. Use tongs for hot tubes. Benedict’s reagent, hydrochloric acid and sodium hydroxide can irritate skin and eyes. Ethanol is flammable, so keep it away from the Bunsen burner.</p>`,
["https://phet.colorado.edu/","PhET Interactive Simulations (optional extra)"]),
[["Describe how you would test a sample of food for the presence of reducing sugar. State the positive result.","Add Benedict’s reagent to the sample (1) and heat in a boiling water bath for a few minutes (1). A green, yellow, orange or brick-red precipitate shows reducing sugar is present (1).",3],
["Explain why iodine is dissolved in potassium iodide solution for the starch test.","Iodine is not soluble in water (1), so it is dissolved in potassium iodide solution (1).",2],
["A sample gives a negative Benedict’s test. Describe how you would find out whether it contains a non-reducing sugar.","Heat with dilute hydrochloric acid (1) to hydrolyse the glycosidic bond (1). Neutralise with sodium hydrogencarbonate (1) and repeat the Benedict’s test (1). An orange-red precipitate shows a non-reducing sugar (1).",5],
["Explain why the biuret test does not give a positive result with a solution of a single amino acid.","The test needs at least two peptide bonds (1). An amino acid has no peptide bonds (1).",2],
["Describe the emulsion test for lipids and state what is observed when lipid is present.","Shake the sample with ethanol (1) and pour the ethanol into water (1). A milky white emulsion forms (1).",3]],
[M("Which reagent is used to test for starch?",["Benedict’s reagent","Iodine in potassium iodide solution","Biuret reagent","Ethanol"],1,"Iodine in potassium iodide gives a blue-black colour with starch."),
M("A positive biuret test is:",["Blue-black","Brick-red","Lilac or purple","Milky white"],2,"The blue reagent turns lilac or purple when protein is present."),
M("In the Benedict’s test, a precipitate forms because copper(II) ions are:",["Oxidised to copper(II) oxide","Reduced to copper(I) oxide","Neutralised","Dissolved"],1,"Copper(II) is reduced to insoluble copper(I) oxide."),
T("Name the sugar that is the main non-reducing sugar you need to know.",["sucrose"],"Sucrose."),
M("Why is hydrochloric acid added in the test for a non-reducing sugar?",["To neutralise the reagent","To hydrolyse the glycosidic bond","To make the sample alkaline","To act as an indicator"],1,"Acid hydrolysis releases reducing monosaccharides."),
M("Why is sodium hydrogencarbonate added before Benedict’s reagent in the non-reducing sugar test?",["To neutralise the acid and make conditions slightly alkaline","To remove starch","To oxidise the sugar","To cool the mixture"],0,"Benedict’s test needs slightly alkaline conditions."),
M("Which description fits the Benedict’s test?",["Qualitative only","Semi-quantitative","Fully quantitative","It cannot be used for sugars"],1,"The colour scale gives a rough idea of concentration."),
T("What colour does the emulsion test give when lipid is present?",["milky","cloudy","white","milky white"],"A milky white (cloudy) emulsion forms.")],
[["Benedict’s test: reagent and conditions","Benedict’s reagent added to the sample and heated in a boiling water bath."],
["Positive Benedict’s result","Colour scale from blue to green, yellow, orange, brick-red precipitate."],
["Why does Benedict’s reagent change colour?","Copper(II) sulfate is reduced to insoluble copper(I) oxide by a reducing sugar."],
["Iodine test: positive result","Blue-black colour shows starch."],
["Emulsion test for lipids","Shake with ethanol, pour into water. A milky emulsion shows lipid."],
["Biuret reagent contains","An alkali and copper(II) sulfate."],
["Biuret test: positive result","Blue to lilac or purple. Needs at least two peptide bonds."],
["How do you test for a non-reducing sugar?","Boil with dilute HCl, neutralise with sodium hydrogencarbonate, then do the Benedict’s test."],
["Why are qualitative tests described as qualitative?","They show whether a molecule is present but not how much."]]);

const AL_L212=L("Semi-quantitative Benedict’s test and colorimetry","Estimating the concentration of a reducing sugar using standard solutions, serial dilutions, a colorimeter and a calibration curve.",
`<h4>A semi-quantitative Benedict’s test</h4>
<p>The Benedict’s test can be made <b>semi-quantitative</b> by comparing a sample of unknown concentration with <b>standard solutions</b> of known concentration of a reducing sugar such as glucose.</p>
<ol><li>Set up the standard solutions using a <b>serial dilution</b> of an existing stock solution.</li><li>Treat each solution in the same way: add the same volume of Benedict’s solution, and heat in a boiling water bath, ideally at the same temperature, for a set time (about 5 minutes).</li><li>Use an <b>excess</b> of Benedict’s solution so that there is more than enough copper(II) sulfate to react with any sugar present.</li><li>Record the colour for each known concentration after the set time.</li><li>Treat the unknown sample in exactly the same way and compare its colour with the standards to estimate the concentration of reducing sugar.</li></ol>
<h4>Alternatives to waiting a fixed time</h4>
<p>Instead of waiting a fixed time and comparing a range of colours, you can <b>time how long it takes for the first colour change</b> to occur (blue to green). The higher the concentration of reducing sugar in a sample, the less time it takes for a colour change to be seen.</p>
<p>To avoid the problem of different people interpreting colours differently, a <b>colorimeter</b> can be used to measure the absorbance or transmission of light through the solutions of known concentration, so that a calibration curve can be drawn.</p>
<h4>Serial dilutions</h4>
<p>A serial dilution is a series of dilutions made from a stock solution. The concentration decreases by the same amount or factor between each test tube.</p>
<ul><li><b>Doubling dilutions:</b> the concentration is halved between each test tube.</li><li><b>A desired range:</b> for example 0, 2, 4, 6, 8 and 10 mmol dm^-3^.</li></ul>
<p>Serial dilutions are made to create a standard against which unknown concentrations can be compared. The comparison can be visual, measured through a calibration (standard) curve, or measured using a colorimeter. They are used when counting bacteria or yeast populations, and when finding unknown glucose, starch or protein concentrations.</p>
{{AL_21_03}}
<div class="ex"><b>Worked example</b>You have a stock solution of glucose at 10 mmol dm^-3^ and need 5 cm^3^ of a 4 mmol dm^-3^ solution.<br>Volume of stock = (desired concentration ÷ concentration of stock) × volume wanted = (4 ÷ 10) × 5 = <b>2 cm^3^</b> of stock. Add 3 cm^3^ of distilled water to make 5 cm^3^.</div>
<h4>Using a colorimeter</h4>
<p>A colorimeter beams a specific wavelength (colour) of light through a sample and measures how much of the light is absorbed. The colour of light used should <b>contrast</b> with the colour of the solution. Benedict’s solution turns orange when sugar is present, so a <b>blue filter</b> is used: blue light is absorbed by an orange solution (orange light is reflected, giving the orange appearance).</p>
<p>The extent to which blue light is absorbed differs with the intensity of the orange colour. An orange-green solution absorbs less blue light than a brick-red one, so the <b>absorbance</b> gives a quantitative measure of the strength of the colour.</p>
<ul><li><b>Calibrate</b> the colorimeter before taking measurements: place a <b>blank</b> in the colorimeter and take a reference reading. It should read 0 (no light absorbed).</li><li>Repeat this step periodically while taking measurements to check that the blank still reads 0.</li></ul>
{{AL_21_04}}
<h4>Calibration (standard) curves</h4>
<p>Absorbance is plotted against the known concentrations to produce a <b>calibration curve</b>. The absorbance of the unknown sample is then measured and its concentration read from the graph.</p>
{{AL_21_05}}
<div class="ex"><b>Worked example</b>In the graph above, an unknown sample has an absorbance of about 1.1. Read across to the line and then down to the axis: the concentration of glucose is about 6.5 mmol dm^-3^.</div>
<div class="key"><b>Exam tip</b>Always state that the same volume of Benedict’s reagent, the same temperature and the same heating time are used for every solution, and that Benedict’s reagent is in excess.</div>`,
I("How can we measure the concentration of glucose in a solution?",
`<ol><li>Look at the calibration curve in the notes. What is plotted on each axis?</li><li>Explain in your own words why a series of known concentrations is needed.</li><li>Predict what the absorbance would be for a solution with no sugar at all.</li><li>List the variables you would need to keep the same for every tube.</li></ol>`,
`<p><b>Make a standard curve.</b> Make a 10 mmol dm^-3^ glucose stock. Prepare 5 cm^3^ of each of 0, 2, 4, 6, 8 and 10 mmol dm^-3^ by serial dilution.</p><ol><li>Add the same volume of Benedict’s reagent (in excess) to each tube and heat in a boiling water bath for 5 minutes.</li><li>Filter or allow the precipitate to settle, then measure absorbance with a colorimeter using a blue filter, after calibrating with a blank.</li><li>Plot absorbance against concentration and draw a line of best fit.</li><li>Measure an unknown solution and read its concentration from your graph.</li></ol><p>If no colorimeter is available, compare colours or time how long each tube takes to show the first change to green. Use tongs for hot tubes and wear eye protection.</p>`),
[["Explain why a blank is used to calibrate a colorimeter.","The blank is used to set the reading to zero absorbance (1) so that readings are due only to the sample (1).",2],
["Explain why a blue filter is used when measuring orange Benedict’s solution in a colorimeter.","Blue light is absorbed by an orange solution (1). The more intense the orange colour, the more blue light is absorbed (1).",2],
["Describe how serial dilutions are used to estimate the concentration of an unknown glucose solution.","Make standard solutions of known concentration by diluting a stock solution (1). Treat each, and the unknown, in the same way with Benedict’s reagent (1). Measure absorbance with a colorimeter (1). Plot a calibration curve and read the unknown concentration from it (1).",4],
["Calculate the volume of 20 mmol dm^-3^ glucose stock needed to make 10 cm^3^ of a 6 mmol dm^-3^ solution.","(6 ÷ 20) × 10 (1) = 3 cm^3^ (1).",2],
["State two variables that must be kept constant when comparing the colours of Benedict’s tests on different solutions.","Any two from: volume of Benedict’s reagent, volume of sample, temperature of the water bath, heating time (2).",2]],
[M("What is a serial dilution?",["A series of dilutions made from a stock solution","A series of heating steps","A single large dilution","A way of removing precipitate"],0,"The concentration falls by the same factor or amount each time."),
N("What volume of 10 mmol dm^-3^ stock is needed to make 5 cm^3^ of 6 mmol dm^-3^ solution?",3,"cm^3^","(6 ÷ 10) × 5 = 3 cm^3^.",0.05),
M("Which statement about a colorimeter is correct?",["It measures how much light is absorbed by a sample","It measures temperature","It heats the solution","It counts cells"],0,"It measures absorbance or transmission of light."),
M("A blank should read:",["100","0","1","The same as the sample"],1,"A blank sets the zero absorbance reference."),
M("As the concentration of reducing sugar rises, the time to the first colour change:",["Increases","Decreases","Stays the same","Cannot be measured"],1,"More sugar means a faster change from blue to green."),
T("What name is given to a graph of absorbance against known concentrations?",["calibration curve","standard curve","calibration graph"],"A calibration (standard) curve."),
M("Why must Benedict’s reagent be in excess in a semi-quantitative test?",["So the sugar is the limiting factor","So the solution stays hot","To make the solution acidic","To stop precipitate forming"],0,"The amount of colour then depends on the amount of sugar.")],
[["What is a standard solution?","A solution of known concentration used for comparison."],
["Doubling dilution","The concentration is halved between each test tube."],
["Formula for volume of stock needed","(desired concentration ÷ stock concentration) × volume wanted."],
["Why use a blue filter for orange solutions?","Blue light is absorbed by orange solutions."],
["How is a colorimeter calibrated?","Place a blank in it and set the reading to 0 absorbance."],
["What is a calibration curve?","A graph of absorbance against known concentrations, used to find unknown concentrations."],
["Alternative to colour comparison in Benedict’s test","Time how long the first colour change (blue to green) takes."],
["Why must Benedict’s reagent be in excess?","So that the amount of colour depends only on the amount of sugar."]]);

AL_L["2.1"]=[AL_L211,AL_L212];
AL_Q["2.1"]=[
M("Which of these is a reducing sugar?",["Sucrose","Starch","Glucose","Cellulose"],2,"Glucose, fructose, maltose and galactose are reducing sugars."),
M("A sample turns blue-black with iodine solution. It contains:",["Protein","Lipid","Starch","Reducing sugar"],2,"Iodine gives a blue-black colour with starch."),
T("Which test reagent is blue before the test and turns lilac or purple with protein?",["biuret","biuret reagent","biuret test"],"The biuret reagent."),
M("Why must acid hydrolysis be done before testing for sucrose with Benedict’s reagent?",["Sucrose is a reducing sugar","Hydrolysis breaks sucrose into reducing monosaccharides","Acid makes Benedict’s solution blue","Sucrose is a protein"],1,"Sucrose is non-reducing until it is hydrolysed."),
M("A solution of 20 mmol dm^-3^ is diluted by doubling dilution three times. What is the final concentration?",["10","5","2.5","1.25"],2,"20 → 10 → 5 → 2.5 mmol dm^-3^."),
N("Calculate the volume of 8 mmol dm^-3^ stock needed to make 10 cm^3^ of 2 mmol dm^-3^ solution.",2.5,"cm^3^","(2 ÷ 8) × 10 = 2.5 cm^3^.",0.05),
M("In a colorimeter, a more intense orange solution will:",["Absorb more blue light","Absorb less blue light","Absorb no light","Reflect blue light"],0,"More intense orange means more blue light is absorbed."),
T("What name is given to a test that shows whether a substance is present but not how much?",["qualitative"],"A qualitative test.")];
AL_P["2.1"]=[
P("Testing a food sample",7,"<p>A student was given a sample of a liquid food and carried out the following tests.</p><table><tr><th>Test</th><th>Result</th></tr><tr><td>Benedict’s test</td><td>Stayed blue</td></tr><tr><td>Boil with dilute hydrochloric acid, neutralise, then Benedict’s test</td><td>Brick-red precipitate</td></tr><tr><td>Biuret test</td><td>Stayed blue</td></tr></table><ol type='a'><li>State what the first result shows about the sample. [1]</li><li>Explain the result of the second test. [3]</li><li>The student then repeated the second test but forgot to add sodium hydrogencarbonate. Suggest the effect on the result and explain why. [2]</li><li>State the conclusion from the biuret test. [1]</li></ol>",
["(a) There is no reducing sugar present (1).","(b) The sample contains a non-reducing sugar such as sucrose (1). The acid hydrolysed the glycosidic bond (1) to give reducing monosaccharides that reduced copper(II) ions to copper(I) oxide (1).","(c) There would probably be no precipitate / a false negative (1) because Benedict’s test needs slightly alkaline conditions (1).","(d) No protein is present (1)."],"Hub exam-style question (written for this hub), Topic 2"),
P("Estimating glucose concentration",8,"<p>A student made a series of glucose solutions by serial dilution from a 10 mmol dm^-3^ stock. Each was heated with an excess of Benedict’s reagent and the absorbance measured in a colorimeter.</p><table><tr><th>Glucose concentration / mmol dm^-3^</th><th>0</th><th>2</th><th>4</th><th>6</th><th>8</th><th>10</th></tr><tr><td>Absorbance / arbitrary units</td><td>0.0</td><td>0.4</td><td>0.8</td><td>1.2</td><td>1.6</td><td>2.0</td></tr></table><ol type='a'><li>Calculate the volume of stock solution needed to make 5 cm^3^ of the 6 mmol dm^-3^ solution. [2]</li><li>An unknown sample gave an absorbance of 1.4. Use the data to estimate its glucose concentration. [2]</li><li>Explain why a blank was used to calibrate the colorimeter. [2]</li><li>Suggest one way of reducing the effect of human error in judging the colour of the solutions. [1]</li><li>Explain why Benedict’s reagent was added in excess. [1]</li></ol>",
["(a) (6 ÷ 10) × 5 (1) = 3 cm^3^ (1).","(b) The data show absorbance = 0.2 × concentration (1), so 1.4 corresponds to 7 mmol dm^-3^ (1).","(c) To set the zero reading (1) so that absorbance is due only to the coloured precipitate / sample (1).","(d) Use a colorimeter to measure absorbance instead of judging colour by eye (1).","(e) So that the amount of colour depends only on the sugar concentration (1)."],"Hub exam-style question (written for this hub), Topic 2"),
P("Lipid and protein tests",5,"<ol type='a'><li>Describe how you would carry out the emulsion test for lipids on a sample of nuts. [3]</li><li>State two reasons why the biuret test could give a negative result with a sample that does contain protein. [2]</li></ol>",
["(a) Crush / grind the nuts and shake with ethanol (1). Pour the liquid into water (1). A milky white emulsion shows lipid is present (1).","(b) Any two from: the protein is too dilute; the protein has been broken down to amino acids or dipeptides, so there are fewer than two peptide bonds; the colour change was too subtle to see against the background (2)."],"Hub exam-style question (written for this hub), Topic 2")
];

[
["AL_22_01","2.2_f01","The key biological molecules: monomers and polymers of lipids, nucleic acids, proteins, carbohydrates, and water.","Diagram of inorganic water and the organic molecules lipid, nucleic acid, protein and carbohydrate, with their monomers and polymers labelled"],
["AL_22_02","2.2_f02","The key biological molecules for living organisms are found in all living things.","Diagram of examples of organisms containing the key biological molecules"],
["AL_22_03","2.2_f03","Types of carbohydrate: monosaccharide, disaccharide and polysaccharide, with definitions, examples and functions.","Table comparing monosaccharides, disaccharides and polysaccharides"],
["AL_22_04","2.2_f04","Straight-chain and ring structural formulae of alpha and beta glucose. The OH on carbon 1 is below the ring in alpha glucose and above the ring in beta glucose.","Structural formulae of alpha-glucose and beta-glucose rings with the OH group on carbon 1 highlighted"],
["AL_22_05","2.2_f05","Different polysaccharides are formed from the two isomers of glucose.","Table showing starch and glycogen are made from alpha glucose and cellulose from beta glucose"],
["AL_22_06","2.2_f06","Different types of covalent bonds: a single bond shares one pair of electrons and a double bond shares two pairs.","Outer orbital diagrams of single bond between two hydrogen atoms and a double bond between two carbon atoms"],
["AL_22_07","2.2_f07","Condensation: monomers join by covalent bonds, forming a polymer and removing water.","Written and symbolic equations showing monomers joining to form a polymer with water removed"],
["AL_22_08","2.2_f08","Hydrolysis: water is added to break covalent bonds and release monomers.","Written and symbolic equations showing a polymer splitting into monomers when water is added"],
["AL_22_09","2.2_f09","Covalent bonds in organic molecules: glycosidic in carbohydrates, peptide in proteins, ester in lipids and phosphodiester in nucleic acids.","Table of organic molecules, the covalent bond each contains and a diagram of the bond"],
["AL_22_10","2.2_f10","OIL RIG: oxidation is loss of electrons and reduction is gain of electrons.","The mnemonic OIL RIG for oxidation is loss and reduction is gain of electrons"],
["AL_22_11","2.2_f11","Condensation of two alpha-glucose molecules forms maltose with an alpha-1,4 glycosidic bond, and water.","Two alpha glucose rings joining by condensation to form maltose and a water molecule, with the glycosidic bond highlighted"],
["AL_22_12","2.2_f12","Condensation of alpha-glucose and beta-fructose forms sucrose, with a glycosidic bond, and water.","Alpha glucose and beta fructose joining by condensation to form sucrose and water"],
["AL_22_13","2.2_f13","Glycosidic bonds in a polysaccharide (amylopectin): 1,4 bonds in the chain and 1,6 bonds at the branch.","Part of an amylopectin molecule with 1,4 glycosidic bonds along the chain and a 1,6 glycosidic bond at a branch"],
["AL_22_14","2.2_f14","Types of glycosidic bond: maltose alpha 1,4; sucrose alpha 1,2; cellulose beta 1,4; amylose alpha 1,4; amylopectin alpha 1,4 and alpha 1,6.","Table of sugars and the type of glycosidic bond each contains"],
["AL_22_15","2.2_f15","Hydrolysis of maltose: adding water breaks the glycosidic bond and gives two alpha-glucose molecules.","Maltose reacting with water in hydrolysis to give two alpha glucose molecules"],
["AL_22_16","2.2_f16","Hydrolysis of sucrose: adding water breaks the glycosidic bond and gives glucose and fructose.","Sucrose reacting with water in hydrolysis to give alpha glucose and beta fructose"],
["AL_22_17","2.2_f17","Amylose: an unbranched helix of alpha-glucose with 1,4 glycosidic bonds, stabilised by hydrogen bonds.","Helical chain of alpha glucose molecules forming amylose with 1,4 glycosidic bonds"],
["AL_22_18","2.2_f18","Amylopectin: branched, with 1,4 and 1,6 glycosidic bonds and many terminal glucose molecules.","Branched amylopectin molecule with 1,6 glycosidic bonds at the branch points and terminal glucose molecules"],
["AL_22_19","2.2_f19","Glycogen: more highly branched than amylopectin, so there are more terminal glucose molecules.","Highly branched glycogen molecule with 1,4 and 1,6 glycosidic bonds"],
["AL_22_20","2.2_f20","Summary of storage polysaccharides: amylose, amylopectin and glycogen compared.","Table comparing monomer, branching, helical shape, glycosidic bonds and source for amylose, amylopectin and glycogen"],
["AL_22_21","2.2_f21","To form a 1,4 glycosidic bond between two beta-glucose molecules, one must be inverted (rotated 180 degrees) relative to the next.","Two beta glucose molecules, the second inverted, to form cellulose"],
["AL_22_22","2.2_f22","Parallel chains of beta-glucose in cellulose are held together by many hydrogen bonds, giving it strength.","Two parallel cellulose chains linked by hydrogen bonds between hydroxyl groups"],
["AL_22_23","2.2_f23","From cellulose chains to microfibrils, macrofibrils and fibres in the plant cell wall. Hydrogen bonds contribute to its strength.","Plant cell wall structure from cell to cellulose fibres, macrofibril, microfibril and cellulose molecules"],
["AL_22_24","2.2_f24","Fatty acids: a saturated fatty acid (stearic acid) and a monounsaturated fatty acid (oleic acid) with the methyl group, hydrocarbon chain and carboxyl group labelled.","Structures of stearic acid with no double bonds and oleic acid with one double bond"],
["AL_22_25","2.2_f25","A polyunsaturated fatty acid (linoleic acid) has more than one C=C double bond in its hydrocarbon chain.","Structure of linoleic acid with two double bonds"],
["AL_22_26","2.2_f26","A triglyceride: glycerol with three fatty acids joined by ester bonds. Three water molecules are released.","Glycerol and three fatty acids condensing to form a triglyceride and three water molecules"],
["AL_22_27","2.2_f27","Esterification: glycerol and three fatty acids join by condensation, forming ester bonds and releasing 3H~2~O.","Block diagram of glycerol plus three fatty acids forming a triglyceride with three ester bonds"],
["AL_22_28","2.2_f28","Phospholipid structure: a hydrophilic phosphate head and two hydrophobic fatty acid tails attached to glycerol.","Structure of a phospholipid with phosphate head, glycerol and two fatty acid tails"],
["AL_22_29","2.2_f29","In water, phospholipids form monolayers or bilayers because of their hydrophobic tails and hydrophilic heads.","Phospholipid monolayer and bilayer in water with hydrophobic core and hydrophilic heads"],
["AL_22_30","2.2_f30","Phospholipids compared with triglycerides.","Table comparing phospholipid and triglyceride on number of fatty acid tails, phosphate, polarity, water released and function"]
].forEach(([n,k,c,a])=>{FIGS[n]=()=>ALF(k,c.replace(/~2~/g,"₂"),a)});

const AL_L221=L("Biological molecules, monomers and polymers","The key biological molecules, why carbon is so important, monomers, polymers and macromolecules, and the two forms of glucose.",
`<h4>Biological molecules: key terms</h4>
<p>The key molecules required to build the structures that enable organisms to function are <b>carbohydrates</b>, <b>proteins</b>, <b>lipids</b>, <b>nucleic acids</b> and <b>water</b>.</p>
{{AL_22_01}}
{{AL_22_02}}
<p>Carbohydrates, proteins, lipids and nucleic acids all contain the elements <b>carbon (C)</b> and <b>hydrogen (H)</b>, which makes them <b>organic</b> compounds. Water is inorganic.</p>
<h4>Why carbon is so important</h4>
<ul><li>Each carbon atom can form <b>four covalent bonds</b>. Covalent bonds are strong and need a large input of energy to break, so the compounds are very stable.</li><li>Carbon atoms can bond to form straight chains, branched chains or rings.</li><li>Carbon compounds can form small single subunits (<b>monomers</b>) that bond with many repeating subunits to form large molecules (<b>polymers</b>) by a process called <b>polymerisation</b>.</li></ul>
<h4>Monomers, polymers and macromolecules</h4>
<p><b>Macromolecules</b> are very large molecules that contain 1000 or more atoms, so they have a high molecular mass. Polymers can be macromolecules, but not all macromolecules are polymers, because the subunits of a polymer have to be the same repeating units. A triglyceride, for example, is a macromolecule that is not a polymer.</p>
<div class="key"><b>Exam tip</b>When discussing monomers and polymers, give the definition but also name specific examples. For example, for nucleic acids the monomer is a nucleotide.</div>
<h4>Carbohydrates</h4>
<p>Carbohydrates are one of the main carbon-based compounds in living organisms. All contain carbon, hydrogen and oxygen. Hydrogen and oxygen are always present in the ratio 2:1 (as in water, H~2~O, which is where the word ‘hydrate’ comes from), so carbohydrates can be represented by the formula <b>C~x~(H~2~O)~y~</b>.</p>
<p>The three types of carbohydrate are <b>monosaccharides</b>, <b>disaccharides</b> and <b>polysaccharides</b>.</p>
{{AL_22_03}}
<h4>The two forms of glucose</h4>
<p>Glucose has the molecular formula <b>C~6~H~12~O~6~</b>. It is the most common monosaccharide and is of central importance to most forms of life. Monosaccharides can be classified by the number of carbon atoms: <b>trioses</b> (3C, for example glyceraldehyde), <b>pentoses</b> (5C, for example ribose) and <b>hexoses</b> (6C, for example glucose).</p>
<p>Glucose exists in two structurally different forms, <b>alpha (α) glucose</b> and <b>beta (β) glucose</b>, so it is an <b>isomer</b>. This structural difference leads to different functions in the carbohydrates made from them.</p>
{{AL_22_04}}
<p>Different polysaccharides are formed from the two isomers of glucose.</p>
{{AL_22_05}}
<div class="key"><b>Exam tip</b>You must be able to recognise and draw the isomers α-glucose and β-glucose. In α-glucose the OH on carbon 1 is below the ring. In β-glucose it is above the ring.</div>`,
I("How are large biological molecules built from small ones?",
`<ol><li>List the five key biological molecules from the notes.</li><li>For each organic one, write its monomer and the polymer it forms (use the first diagram).</li><li>Explain why carbon is able to form so many different compounds.</li><li>Write one question about glucose isomers you would like answered.</li></ol>`,
`<p><b>Model the molecules.</b> Use two colours of paper clips, beads or modelling kit pieces for monomers.</p><ol><li>Make a short chain of identical monomers and call it a polymer. Name a real example (for example starch from glucose).</li><li>Make a chain of different monomers. Explain why this is not a polymer in the sense used in the notes.</li><li>Use a molecular model kit (or sketches) to build α-glucose and β-glucose. Show how they differ only at carbon 1.</li><li>Count the carbon, hydrogen and oxygen atoms and check the formula C~6~H~12~O~6~.</li></ol>`),
[["State the elements present in all carbohydrates.","Carbon, hydrogen and oxygen (1).",1],
["Explain why carbon is important in organic compounds. Give two reasons.","It forms four covalent bonds, which are strong and make compounds stable (1). It can bond to form chains, branches or rings (1).",2],
["Distinguish between a monomer and a polymer, and give one example of each for carbohydrates.","A monomer is a small single subunit (1) and a polymer is many repeating monomers joined together (1). For example glucose is a monomer (1) and starch is a polymer (1).",4],
["State the general formula of a carbohydrate and explain the name ‘hydrate’.","C~x~(H~2~O)~y~ (1). Hydrogen and oxygen are in the ratio 2:1, as in water (1).",2],
["Describe how α-glucose differs from β-glucose.","They are isomers with the same formula (1). The OH group on carbon 1 is below the ring in α-glucose and above the ring in β-glucose (1).",2]],
[M("Which of these molecules is inorganic?",["Glucose","Protein","Water","Lipid"],2,"Water does not contain carbon in the way organic molecules do."),
M("How many covalent bonds can a carbon atom form?",["Two","Three","Four","Six"],2,"Four covalent bonds."),
T("What is the term for a very large molecule containing 1000 or more atoms?",["macromolecule"],"A macromolecule."),
M("Which of these is a hexose?",["Ribose","Glucose","Glyceraldehyde","Sucrose"],1,"Glucose has six carbons."),
M("Glucose has the molecular formula:",["C~6~H~12~O~6~","C~12~H~22~O~11~","C~6~H~6~O~6~","CH~2~O"],0,"C~6~H~12~O~6~."),
M("Which carbohydrate is made from β-glucose?",["Starch","Glycogen","Cellulose","Maltose"],2,"Cellulose is made from β-glucose."),
T("What name is given to molecules with the same formula but different structures, such as α- and β-glucose?",["isomers","isomer"],"Isomers."),
M("What is the monomer of a nucleic acid?",["Amino acid","Nucleotide","Glucose","Fatty acid"],1,"A nucleotide.")],
[["Four elements in organic molecules","Carbon and hydrogen are in all; most also contain oxygen, and proteins contain nitrogen."],
["Why is carbon important?","It forms four strong covalent bonds and can form chains, branches and rings."],
["Define polymerisation","Joining many monomers together to form a polymer."],
["Define macromolecule","A very large molecule containing 1000 or more atoms."],
["Formula of glucose","C~6~H~12~O~6~"],
["Three types of carbohydrate","Monosaccharides, disaccharides and polysaccharides."],
["α-glucose versus β-glucose","They are isomers: OH on carbon 1 is below the ring in α, above the ring in β."],
["Which polysaccharides are made from β-glucose?","Cellulose (starch and glycogen are made from α-glucose)."]]);

const AL_L222=L("Covalent bonds, condensation and hydrolysis","How covalent bonds join monomers in polymers, and the condensation and hydrolysis reactions that make and break them.",
`<h4>Covalent bonds in polymers</h4>
<p>A <b>covalent bond</b> is the sharing of two or more electrons between two atoms. The electrons can be shared equally, forming a <b>non-polar</b> covalent bond, or unequally, forming a <b>polar</b> covalent bond in which one atom is more electronegative (δ^-^).</p>
<p>Each atom forms a certain number of covalent bonds depending on the number of free electrons in its outer orbital. For example, H forms 1 bond and C forms 4 bonds. Covalent bonds are very stable because high energies are required to break them.</p>
<p>Multiple pairs of electrons can be shared, forming <b>double bonds</b> (for example C=C in unsaturated fats) or triple bonds.</p>
{{AL_22_06}}
<p>When two monomers are close enough that their outer orbitals overlap, their electrons are shared and a covalent bond forms. If more monomers are added, polymerisation occurs (and a macromolecule forms).</p>
<h4>Condensation</h4>
<p>Condensation is also known as <b>dehydration synthesis</b> (‘to put together while losing water’). A condensation reaction occurs when monomers combine by covalent bonds to form polymers (polymerisation) or macromolecules (lipids), and <b>water is removed</b>.</p>
{{AL_22_07}}
<h4>Hydrolysis</h4>
<p>Hydrolysis means ‘lyse’ (to break) and ‘hydro’ (with water). In the hydrolysis of polymers, <b>covalent bonds are broken when water is added</b>.</p>
{{AL_22_08}}
<h4>Covalent bonds in organic molecules</h4>
<table><tr><th>Organic molecule</th><th>Covalent bond</th></tr><tr><td>Carbohydrates</td><td>Glycosidic</td></tr><tr><td>Proteins</td><td>Peptide</td></tr><tr><td>Lipids</td><td>Ester</td></tr><tr><td>Nucleic acids</td><td>Phosphodiester</td></tr></table>
{{AL_22_09}}
<div class="key"><b>Exam tip</b>You must be able to recognise and identify the location of the covalent bonds in the molecules. These molecules may be unfamiliar to you.</div>`,
I("What happens to water when polymers are made and broken down?",
`<ol><li>Look at the two diagrams of condensation and hydrolysis. Describe what happens to the water in each.</li><li>Predict what would happen to a polymer if water was added in the presence of the right enzyme.</li><li>Predict where in your own body hydrolysis happens.</li></ol>`,
`<p><b>Model the reactions.</b> Use paper shapes (triangles for monomers) and blue circles for water.</p><ol><li>Join three monomers with tape. Remove a water circle each time you add a monomer. How many waters are removed for three monomers?</li><li>Break the polymer apart. Add a water circle at each break. How many waters are added to break three monomers apart?</li><li>Work out a general rule: for a chain of n monomers, how many covalent bonds and water molecules are involved?</li></ol>`),
[["State what is meant by a condensation reaction.","Monomers join by covalent bonds (1) and water is removed (1).",2],
["State what is meant by hydrolysis.","Covalent bonds are broken (1) by the addition of water (1).",2],
["Name the covalent bond in a carbohydrate, a protein and a lipid.","Glycosidic (1), peptide (1), ester (1).",3],
["Explain why covalent bonds make biological polymers stable.","Covalent bonds are strong (1) and a large input of energy is required to break them (1).",2],
["A polymer is made of 5 monomers. State how many water molecules are removed when it forms.","Four (1), because four bonds form between five monomers (1).",2]],
[M("What is removed in a condensation reaction?",["Carbon dioxide","Water","Oxygen","Hydrogen ions only"],1,"Water is removed."),
M("In hydrolysis, covalent bonds are broken by:",["Adding water","Removing water","Heating only","Adding salt"],0,"Hydrolysis uses water."),
T("Name the covalent bond in a lipid between glycerol and a fatty acid.",["ester","ester bond"],"An ester bond."),
M("The covalent bond in a protein is a:",["Glycosidic bond","Peptide bond","Ester bond","Hydrogen bond"],1,"Peptide bond."),
M("A double covalent bond involves sharing:",["One electron","Two electrons","Four electrons","Six electrons"],2,"Two pairs of electrons are shared."),
M("How many covalent bonds does carbon usually form?",["1","2","3","4"],3,"Four."),
M("Another name for condensation is:",["Dehydration synthesis","Hydrolysis","Oxidation","Polarisation"],0,"Dehydration synthesis."),
M("Which bond joins nucleotides?",["Glycosidic","Peptide","Ester","Phosphodiester"],3,"Phosphodiester bonds.")],
[["Covalent bond","The sharing of two or more electrons between two atoms."],
["Non-polar versus polar covalent bond","Electrons shared equally (non-polar) or unequally (polar)."],
["Condensation reaction","Monomers join by covalent bonds and water is removed."],
["Hydrolysis reaction","Water is added to break covalent bonds."],
["Bond in carbohydrates","Glycosidic."],
["Bond in proteins","Peptide."],
["Bond in lipids","Ester."],
["Bond in nucleic acids","Phosphodiester."]]);

const AL_L223=L("Reducing sugars and the glycosidic bond","Reducing and non-reducing sugars, how glycosidic bonds form by condensation, and how they are broken by hydrolysis.",
`<h4>Reducing and non-reducing sugars</h4>
<p>Sugars are classified as reducing or non-reducing depending on their ability to donate electrons.</p>
<ul><li><b>Reducing sugars</b> can donate electrons (the carbonyl group becomes oxidised), so the sugar is the <b>reducing agent</b>. They reduce soluble copper sulfate to insoluble brick-red copper oxide in the Benedict’s test. Examples: glucose, fructose and maltose.</li><li><b>Non-reducing sugars</b> cannot donate electrons, so they cannot be oxidised. To detect them they must first be hydrolysed to break the disaccharide into its two monosaccharides before a Benedict’s test is carried out. Example: sucrose.</li></ul>
{{AL_22_10}}
<div class="key"><b>Exam tip</b>Become familiar with the OIL RIG mnemonic: Oxidation Is Loss of electrons and Reduction Is Gain of electrons.</div>
<h4>What is a glycosidic bond?</h4>
<p>To make monosaccharides more suitable for transport and storage, and to have less influence on a cell’s osmolarity, they are bonded together to form disaccharides and polysaccharides.</p>
<p>Disaccharides and polysaccharides are formed when two hydroxyl (–OH) groups on different saccharides interact to form a strong covalent bond, the <b>glycosidic bond</b> (the oxygen link that holds the two molecules together). Every glycosidic bond results in <b>one water molecule</b> being removed, so glycosidic bonds are formed by condensation.</p>
<p>Each glycosidic bond is catalysed by enzymes specific to which OH groups are interacting. Because there are many different monosaccharides, different types of glycosidic bond form. Maltose has an α-1,4 glycosidic bond and sucrose has an α-1,2 glycosidic bond.</p>
<h4>Glycosidic bonds in maltose, sucrose and polysaccharides</h4>
{{AL_22_11}}
{{AL_22_12}}
{{AL_22_13}}
{{AL_22_14}}
<div class="key"><b>Exam tip</b>Make sure you can identify where the glycosidic bond is in a carbohydrate.</div>
<h4>Breaking the glycosidic bond</h4>
<p>Disaccharides and polysaccharides are broken down in <b>hydrolysis</b> reactions. These are catalysed by enzymes that are different from those used in condensation reactions. Examples include the digestion of food in the alimentary canal and the breakdown of stored carbohydrates in muscle and liver cells for use in cellular respiration.</p>
{{AL_22_15}}
<p>Sucrose is a non-reducing sugar, so it gives a negative result in a Benedict’s test. When sucrose is heated with hydrochloric acid, this provides the water that hydrolyses the glycosidic bond, giving two monosaccharides (glucose and fructose) that give a positive Benedict’s test.</p>
{{AL_22_16}}
<div class="key"><b>Exam tip</b>Disaccharides hydrolyse to two monosaccharides, whereas polysaccharides must undergo many hydrolytic reactions until they form monosaccharides.</div>`,
I("Why does sucrose need to be heated with acid before it gives a positive Benedict’s test?",
`<ol><li>Look at the structure of sucrose and say where the glycosidic bond is.</li><li>Explain what an enzyme or an acid does to that bond.</li><li>Predict the result of a Benedict’s test on sucrose before and after acid hydrolysis.</li></ol>`,
`<p><b>Test sucrose.</b> Compare glucose solution, sucrose solution and sucrose that has been boiled with dilute hydrochloric acid.</p><ol><li>Carry out a Benedict’s test on glucose and on sucrose. Record the colours.</li><li>Boil a sample of sucrose with a few drops of dilute hydrochloric acid for 2 minutes. Cool, then neutralise with sodium hydrogencarbonate until fizzing stops and add a little extra.</li><li>Repeat the Benedict’s test. Explain the change using the words glycosidic bond, hydrolysis and reducing sugar.</li></ol><p>Wear eye protection and use tongs for hot tubes.</p>`),
[["Explain why sucrose is called a non-reducing sugar.","It cannot donate electrons (1) so it cannot reduce copper(II) sulfate / gives a negative Benedict’s test (1).",2],
["State the monosaccharides formed when sucrose is hydrolysed.","Glucose (1) and fructose (1).",2],
["Describe how a glycosidic bond forms between two monosaccharides.","Two hydroxyl groups interact (1) in a condensation reaction (1) and a molecule of water is removed (1). An oxygen link between the two sugars forms (1).",4],
["State the type of glycosidic bond in maltose and in cellulose.","Maltose has α-1,4 (1) and cellulose has β-1,4 (1).",2],
["Explain how heating with hydrochloric acid affects the result of a Benedict’s test on sucrose.","Acid provides water that hydrolyses the glycosidic bond (1), giving glucose and fructose, which are reducing sugars (1). So the result changes from negative to positive (1).",3]],
[M("Which sugar is non-reducing?",["Glucose","Fructose","Maltose","Sucrose"],3,"Sucrose is the non-reducing sugar to know."),
M("A glycosidic bond forms by:",["Hydrolysis","Condensation","Oxidation","Evaporation"],1,"Condensation releases one water molecule."),
T("Which glycosidic bond is found in maltose? Answer in the form alpha-1,4 (use ‘1,4’).",["1,4"],"Maltose has an α-1,4 glycosidic bond."),
M("What does OIL RIG help you remember?",["Oxidation is loss, reduction is gain of electrons","Oxygen is liquid, reduction is gas","Only in lipids","Order of monosaccharides"],0,"Oxidation Is Loss, Reduction Is Gain."),
M("Sucrose is made from:",["Glucose + glucose","Glucose + fructose","Fructose + fructose","Glucose + galactose"],1,"α-glucose and β-fructose."),
M("To hydrolyse a polysaccharide to monosaccharides you need:",["One hydrolysis","Many hydrolysis reactions","No water","Removal of water"],1,"One for each glycosidic bond."),
M("How many water molecules are released when a glycosidic bond forms?",["0","1","2","3"],1,"One."),
M("In the Benedict’s test, a reducing sugar acts as:",["An oxidising agent","A reducing agent","A catalyst","An indicator"],1,"It donates electrons to copper(II).")],
[["Reducing sugar","A sugar that can donate electrons; gives a positive Benedict’s test (glucose, fructose, maltose)."],
["Non-reducing sugar","A sugar that cannot donate electrons (sucrose). Must be hydrolysed before a positive Benedict’s test."],
["OIL RIG","Oxidation Is Loss of electrons, Reduction Is Gain."],
["Glycosidic bond","A covalent bond between two sugars, formed by condensation."],
["Bond in maltose","α-1,4 glycosidic bond."],
["Bond in sucrose","α-1,2 glycosidic bond."],
["Bond in cellulose","β-1,4 glycosidic bond."],
["What does hydrolysis of sucrose give?","Glucose and fructose."]]);

const AL_L224=L("Starch, glycogen and cellulose","The structures and functions of the polysaccharides starch (amylose and amylopectin), glycogen and cellulose.",
`<h4>Starch and glycogen: structures and functions</h4>
<p>Starch and glycogen are <b>polysaccharides</b>: macromolecules that are polymers formed by many monosaccharides joined by glycosidic bonds in condensation reactions. The chains may be branched or unbranched, folded (making the molecule compact, ideal for storage, as in starch and glycogen), straight (suitable for building cellular structures such as cellulose) or coiled.</p>
<p>Starch and glycogen are <b>storage polysaccharides</b> because they are:</p>
<ul><li><b>Compact</b>, so large quantities can be stored.</li><li><b>Insoluble</b>, so they have no osmotic effect. Glucose would lower the water potential of a cell, causing water to move into the cell, so cells would need thicker cell walls (plants) or would burst (animal cells).</li></ul>
<h4>Starch</h4>
<p>Starch is the storage polysaccharide of plants. It is stored as granules in plastids such as chloroplasts. Because starch has many monomers, it takes longer to digest than glucose. Starch is made of two different polysaccharides.</p>
<p><b>Amylose</b> (10–30% of starch) is an unbranched helix-shaped chain with 1,4 glycosidic bonds between α-glucose molecules. The helix makes it compact and more resistant to digestion.</p>
{{AL_22_17}}
<p><b>Amylopectin</b> (70–90% of starch) has 1,4 glycosidic bonds between α-glucose molecules and also 1,6 glycosidic bonds, which create a branched molecule. The branches give many terminal glucose molecules that can be easily hydrolysed for use in cellular respiration or added to for storage.</p>
{{AL_22_18}}
<h4>Glycogen</h4>
<p>Glycogen is the storage polysaccharide of animals and fungi. It is highly branched and not coiled. Liver and muscle cells have a high concentration of glycogen, present as visible granules, because their rate of respiration is high (animals are mobile).</p>
<p>Glycogen is more branched than amylopectin, making it more compact, which helps animals store more glucose. The branching also gives more free ends where glucose molecules can be added or removed, allowing condensation and hydrolysis reactions to occur more rapidly, so glucose can be stored or released quickly.</p>
{{AL_22_19}}
{{AL_22_20}}
<div class="key"><b>Exam tip</b>Be clear about the differences between starch (amylose and amylopectin) and glycogen.</div>
<h4>Cellulose: structure</h4>
<p>Cellulose is a polysaccharide that is a polymer of long chains of <b>β-glucose</b> joined by <b>1,4 glycosidic bonds</b>. Because β-glucose is an isomer of α-glucose, to form the 1,4 glycosidic bonds consecutive β-glucose molecules must be <b>rotated 180°</b> to each other.</p>
{{AL_22_21}}
<p>Because of this inversion, many <b>hydrogen bonds</b> form between the long parallel chains, giving cellulose its strength.</p>
{{AL_22_22}}
<h4>Cellulose: function</h4>
<ul><li>Cellulose is the main structural component of cell walls. Its strength comes from the many hydrogen bonds between the parallel chains of microfibrils.</li><li>Its high tensile strength allows it to be stretched without breaking, so cell walls can withstand turgor pressure.</li><li>Cellulose fibres and other molecules (for example lignin) form a matrix which increases the strength of the cell wall and provides support to the plant.</li><li>Cellulose fibres are freely permeable, allowing water and solutes to reach and leave the cell surface membrane.</li><li>Few organisms have the enzyme cellulase to hydrolyse cellulose, so it is a source of fibre.</li></ul>
{{AL_22_23}}
<div class="key"><b>Exam tip</b>Learn the monomer for cellulose (β-glucose), the arrangement of the glycosidic bond (dependent on the position of the OH group on carbon 1 and 4) and that cellulose exists in parallel chains bonded by many hydrogen bonds, giving it high mechanical strength.</div>`,
I("How does the structure of a polysaccharide match its job?",
`<ol><li>Sort starch, glycogen and cellulose into storage and structural polysaccharides.</li><li>For each, write the monomer, type of glycosidic bond and whether it is branched.</li><li>Predict which one would be most rapidly hydrolysed and explain why.</li></ol>`,
`<p><b>Test for starch and observe cellulose.</b></p><ol><li>Add iodine solution to a slice of potato and to a piece of cotton wool or filter paper. Record the colours. Which polysaccharide is present in each?</li><li>Stretch a strip of paper (cellulose) and a strip of cling film. Compare how strongly each resists pulling.</li><li>Use bead models: make a branched chain (amylopectin) and a straight chain (cellulose). Count the number of free ends. Why does more branching help rapid release of glucose?</li></ol><p>Wear eye protection. Iodine stains skin and clothing.</p>`),
[["State two reasons why starch is a good storage molecule.","It is compact (1) and insoluble, so it has no osmotic effect (1).",2],
["Compare the structure of amylose and amylopectin.","Both are made from α-glucose with 1,4 glycosidic bonds (1). Amylose is an unbranched helix (1). Amylopectin also has 1,6 glycosidic bonds (1) so is branched (1).",4],
["Explain why glycogen is better suited than starch to storage in animals.","Glycogen is more highly branched (1) so more compact (1) and has more free ends (1), so glucose can be added or removed more quickly for respiration (1).",4],
["Describe the structure of cellulose.","Long chains of β-glucose (1) joined by 1,4 glycosidic bonds (1), with alternate molecules rotated by 180° (1). Parallel chains are joined by many hydrogen bonds (1).",4],
["Explain how the structure of cellulose makes it suitable for plant cell walls.","Many hydrogen bonds between parallel chains give high tensile strength (1) so the wall resists turgor pressure (1). Fibres are freely permeable (1).",3]],
[M("Which polysaccharide is the storage molecule in animals?",["Starch","Glycogen","Cellulose","Amylose"],1,"Glycogen."),
M("What proportion of starch is amylopectin?",["10–30%","70–90%","50%","100%"],1,"About 70–90% is amylopectin."),
M("Which glycosidic bonds form the branch points in amylopectin?",["1,4","1,6","1,2","β-1,4"],1,"1,6 bonds at the branch points."),
M("Amylose has a:",["Branched structure","Helical structure","Ring of 6 glucose","Flat sheet"],1,"Amylose is an unbranched helix."),
T("What is the monomer of cellulose?",["beta glucose","β-glucose","beta-glucose","b-glucose"],"β-glucose."),
M("The strength of cellulose comes from:",["Ionic bonds","Many hydrogen bonds between parallel chains","Peptide bonds","Branching"],1,"Hydrogen bonds between parallel chains."),
M("Why do storage polysaccharides not affect water potential?",["They are soluble","They are insoluble","They are small","They are liquid"],1,"Insoluble molecules have no osmotic effect."),
M("Which enzyme hydrolyses cellulose?",["Amylase","Cellulase","Lipase","Protease"],1,"Few organisms make cellulase.")],
[["Storage polysaccharide in plants","Starch (amylose and amylopectin), stored in plastids."],
["Storage polysaccharide in animals and fungi","Glycogen."],
["Amylose","Unbranched helix of α-glucose, 1,4 bonds; about 10–30% of starch."],
["Amylopectin","Branched; 1,4 and 1,6 bonds; about 70–90% of starch."],
["Why is glycogen more compact than amylopectin?","It is more highly branched."],
["Cellulose monomer and bond","β-glucose with 1,4 glycosidic bonds."],
["Why are β-glucose molecules inverted in cellulose?","To form 1,4 glycosidic bonds between consecutive β-glucose units."],
["Why is cellulose strong?","Many hydrogen bonds between parallel chains."]]);

const AL_L225=L("Triglycerides","The structure of fatty acids and triglycerides, esterification, and how the structure of triglycerides suits their functions.",
`<h4>Lipids</h4>
<p>Lipids are macromolecules that contain carbon, hydrogen and oxygen, but unlike carbohydrates they contain a lower proportion of oxygen. They are <b>non-polar</b> and <b>hydrophobic</b> (insoluble in water). The different types are:</p>
<ul><li>fats and oils (composed mainly of triglycerides)</li><li>phospholipids</li><li>steroids and waxes (considered lipids because they are hydrophobic and so insoluble in water).</li></ul>
<h4>Triglycerides: fatty acids</h4>
<p>Triglycerides are non-polar, hydrophobic molecules. The monomers are <b>glycerol</b> and <b>fatty acids</b>. Glycerol is an alcohol (an organic molecule that contains a hydroxyl group bonded to a carbon atom). A fatty acid has a <b>methyl group</b> at one end of a hydrocarbon chain (typically 4 to 24 carbons long) and a <b>carboxyl group</b> at the other.</p>
<p>Fatty acids vary in two ways: the <b>length</b> of the hydrocarbon chain, and whether they are <b>saturated</b> (mainly in animal fats) or <b>unsaturated</b> (mainly in vegetable oils, although there are exceptions such as coconut and palm oil). Unsaturated fatty acids can be monounsaturated or polyunsaturated.</p>
<ul><li>If H atoms are on the same side of the double bond, the fatty acid is <b>cis</b> and is metabolised by enzymes.</li><li>If H atoms are on opposite sides of the double bond, it is a <b>trans</b> fatty acid. Trans fatty acids cannot form enzyme–substrate complexes, so they are not metabolised and are linked with coronary heart disease.</li></ul>
{{AL_22_24}}
{{AL_22_25}}
<h4>Forming a triglyceride: esterification</h4>
<p>Triglycerides are formed by <b>esterification</b>. An <b>ester bond</b> forms when the hydroxyl group of glycerol bonds with the carboxyl group of a fatty acid. For each ester bond formed, a water molecule is released. So for one triglyceride to form, <b>three water molecules</b> are released.</p>
{{AL_22_26}}
{{AL_22_27}}
<div class="key"><b>Exam tip</b>Make sure you are familiar with the structure of a triglyceride and that you can recognise whether the fatty acids are saturated or unsaturated.</div>
<h4>Triglycerides: structure and function</h4>
<p>The long hydrocarbon chains contain many C–H bonds and little oxygen, so triglycerides are <b>highly reduced</b>. When they are oxidised in cellular respiration, the bonds break and release energy used to make ATP.</p>
<ul><li><b>Energy store:</b> triglycerides store more energy per gram than carbohydrates and proteins (37 kJ compared with 17 kJ). As they are hydrophobic they do not cause osmotic water uptake in cells, so more can be stored. Plants store oils in seeds and fruits, which are generally liquid at room temperature because double bonds add kinks to the fatty acid chains. Mammals store triglycerides as oil droplets in adipose tissue, for example hibernating bears.</li><li><b>Metabolic water:</b> oxidation of C–H bonds releases large numbers of water molecules during respiration. Desert animals retain this water if there is no liquid water to drink, and bird and reptile embryos in shells also use it.</li><li><b>Insulation:</b> triglycerides form part of the myelin sheath around nerve fibres, increasing the speed of nerve impulses, and adipose tissue below the skin insulates against heat loss (for example whale blubber).</li><li><b>Buoyancy:</b> fat tissue has a low density so animals float more easily.</li><li><b>Protection:</b> adipose tissue protects organs from damage.</li></ul>
<div class="key"><b>Exam tip</b>It is common to be asked why triglycerides are energy reserves: they store more energy per gram because of their long hydrocarbon chains.</div>`,
I("Why do animals and plants store energy as lipids as well as carbohydrates?",
`<ol><li>Compare the energy stored per gram in fats (37 kJ) and carbohydrates (17 kJ).</li><li>Explain what ‘hydrophobic’ means and why this matters for storage.</li><li>Think of three examples of animals that rely on fat stores or insulation.</li></ol>`,
`<p><b>Investigate insulation.</b> Fill two small beakers with warm water. Wrap one in a thick layer of vegetable fat (for example solid cooking fat in a plastic bag) and leave the other without.</p><ol><li>Measure the temperature of each beaker every 2 minutes for 20 minutes.</li><li>Plot both sets of results on one graph.</li><li>Explain the result using the term insulation. Suggest what controls you need.</li></ol><p>Take care with hot water. Wash hands after handling fat.</p>`),
[["Describe the structure of a triglyceride.","One glycerol molecule (1) joined to three fatty acids (1) by ester bonds (1).",3],
["State how many water molecules are released when one triglyceride is formed.","Three (1).",1],
["Distinguish between a saturated and an unsaturated fatty acid.","A saturated fatty acid has no C=C double bonds (1). An unsaturated fatty acid has one or more C=C double bonds (1).",2],
["Explain why triglycerides store more energy per gram than carbohydrates.","They have long hydrocarbon chains with many C–H bonds (1) and little oxygen / highly reduced (1), so more energy is released when oxidised (1).",3],
["Describe two other functions of triglycerides in mammals, apart from energy storage.","Any two from: insulation against heat loss (adipose tissue), insulation of nerve fibres (myelin sheath), buoyancy, protection of organs, metabolic water (2).",2]],
[M("Which bond joins glycerol to a fatty acid?",["Peptide","Glycosidic","Ester","Hydrogen"],2,"Ester bond."),
M("How many fatty acids are in a triglyceride?",["1","2","3","4"],2,"Three."),
M("Which energy value per gram is correct for triglycerides?",["17 kJ","37 kJ","4 kJ","9 kJ"],1,"37 kJ per gram compared with 17 kJ for carbohydrates and proteins."),
T("What name is given to the process of forming an ester bond?",["esterification","esterification reaction"],"Esterification."),
M("A fatty acid with one double bond is:",["Saturated","Monounsaturated","Polyunsaturated","Trans only"],1,"Monounsaturated."),
M("Which type of fatty acid is linked with coronary heart disease?",["Cis","Trans","Saturated only","Omega"],1,"Trans fatty acids."),
M("Metabolic water is released when:",["Triglycerides are oxidised","Glucose is made","Proteins are digested","Fats are stored"],0,"Oxidation of C–H bonds produces water."),
M("Why are plant oils liquid at room temperature?",["Double bonds add kinks to chains","They contain no carbon","They have no fatty acids","They are very short"],0,"Kinks stop the chains packing closely.")],
[["Monomers of a triglyceride","Glycerol and fatty acids."],
["Bond in a triglyceride","Ester bond."],
["Number of water molecules released forming a triglyceride","Three."],
["Saturated fatty acid","No C=C double bonds (mainly animal fats)."],
["Unsaturated fatty acid","One or more C=C double bonds (mainly vegetable oils)."],
["Trans fatty acids","H atoms on opposite sides of the double bond; not metabolised; linked with CHD."],
["Why do triglycerides store more energy per gram?","Long hydrocarbon chains with many C–H bonds (highly reduced): 37 kJ vs 17 kJ."],
["Name three functions of triglycerides apart from energy storage","Insulation, buoyancy, protection, metabolic water."]]);

const AL_L226=L("Phospholipids","The structure of phospholipids and their role in cell membranes, compared with triglycerides.",
`<h4>The structure of a phospholipid</h4>
<p>Phospholipids are a type of lipid, so they are formed from the monomers glycerol and fatty acids. Unlike triglycerides, there are only <b>two fatty acids</b> bonded to the glycerol molecule in a phospholipid, because one has been replaced by a <b>phosphate</b> group (PO~4~^3-^).</p>
<ul><li>The phosphate is polar, so it is soluble in water (<b>hydrophilic</b>).</li><li>The fatty acid ‘tails’ are non-polar, so they are insoluble in water (<b>hydrophobic</b>).</li></ul>
{{AL_22_28}}
<p>Phospholipids are <b>amphipathic</b>: they have both hydrophobic and hydrophilic parts. As a result, phospholipid molecules form monolayers or bilayers in water.</p>
{{AL_22_29}}
<h4>The role of phospholipids</h4>
<ul><li>They are the main component (building block) of <b>cell membranes</b>.</li><li>The hydrophobic fatty acid tails create a <b>hydrophobic core</b> when a bilayer forms. This acts as a barrier to water-soluble molecules.</li><li>The hydrophilic phosphate heads form hydrogen bonds with water, so the membrane can be used to compartmentalise. This enables cells to organise specific roles into organelles, helping efficiency.</li><li>The composition of phospholipids contributes to the <b>fluidity</b> of the membrane. Mainly saturated fatty acid tails make a membrane less fluid, and mainly unsaturated tails make it more fluid.</li><li>Phospholipids control membrane protein orientation. Weak hydrophobic interactions between phospholipids and membrane proteins hold the proteins within the membrane but still allow movement within the layer.</li></ul>
<h4>Phospholipids and triglycerides compared</h4>
{{AL_22_30}}
<div class="key"><b>Exam tip</b>Make sure you know the difference between phospholipids and triglycerides.</div>`,
I("Why do phospholipids arrange themselves into a bilayer in water?",
`<ol><li>Draw a phospholipid and label the hydrophilic head and hydrophobic tails.</li><li>Predict how many layers they would form in water, and which parts face the water.</li><li>Explain how this arrangement acts as a barrier.</li></ol>`,
`<p><b>Model a bilayer.</b> Use a drop of vegetable oil on water and add a drop of washing-up liquid (a model of an amphipathic molecule).</p><ol><li>Add a drop of oil to a dish of water and observe. Then add a drop of washing-up liquid and observe what changes.</li><li>Use pins or pipe cleaners with a bead head to model the arrangement of heads and tails in water.</li><li>Describe how your model shows a hydrophobic core.</li></ol><p>This is only a model. Real phospholipids are not detergents.</p>`),
[["State two ways in which a phospholipid differs from a triglyceride.","A phospholipid has two fatty acids and a triglyceride has three (1). A phospholipid has a phosphate head (1).",2],
["Explain what is meant by amphipathic.","Having both a hydrophilic part and a hydrophobic part (1).",1],
["Explain why phospholipids form a bilayer in water.","Hydrophilic heads face the water (1) and hydrophobic tails face each other away from the water (1), forming a hydrophobic core (1).",3],
["Explain how the fatty acid composition affects membrane fluidity.","Saturated tails make the membrane less fluid (1) and unsaturated tails make it more fluid (1).",2],
["Describe three roles of phospholipids in cell membranes.","They form a hydrophobic core that acts as a barrier to water-soluble molecules (1). They compartmentalise cells into organelles (1). They hold membrane proteins in place while allowing movement (1).",3]],
[M("A phospholipid has:",["One fatty acid","Two fatty acids and a phosphate","Three fatty acids","No glycerol"],1,"Two fatty acid tails and a phosphate head on glycerol."),
M("The head of a phospholipid is:",["Hydrophobic","Hydrophilic","Non-polar","Uncharged and insoluble"],1,"The phosphate head is hydrophilic."),
T("What word describes a molecule with both hydrophobic and hydrophilic parts?",["amphipathic","amphiphilic"],"Amphipathic."),
M("Unsaturated fatty acid tails make a membrane:",["Less fluid","More fluid","Rigid","Impermeable"],1,"More fluid."),
M("How many water molecules are released when forming a phospholipid?",["1","2","3","4"],2,"Three condensation reactions: two ester bonds with fatty acids and one with the phosphate."),
M("The core of a phospholipid bilayer is:",["Hydrophilic","Hydrophobic","Aqueous","Charged"],1,"Tails make a hydrophobic core."),
M("Which function is typical of phospholipids rather than triglycerides?",["Energy storage","Cell membrane component","Insulation","Buoyancy"],1,"Cell membrane component."),
M("Phospholipid heads form hydrogen bonds with:",["Fatty acid tails","Water","Other phospholipid tails","Cellulose"],1,"With water.")],
[["Phospholipid structure","Glycerol, two fatty acid tails and a phosphate head."],
["Which part of a phospholipid is hydrophilic?","The phosphate head."],
["Which part is hydrophobic?","The fatty acid tails."],
["Amphipathic","Having both hydrophilic and hydrophobic parts."],
["What do phospholipids form in water?","Monolayers or bilayers."],
["Effect of unsaturated tails on fluidity","More fluid membrane."],
["Phospholipid versus triglyceride: fatty acids","Two versus three."],
["Main role of phospholipids","Building block of cell membranes."]]);

AL_L["2.2"]=[AL_L221,AL_L222,AL_L223,AL_L224,AL_L225,AL_L226];
AL_Q["2.2"]=[
M("Which of these is a polysaccharide?",["Maltose","Glycogen","Sucrose","Glucose"],1,"Glycogen."),
M("Which bond forms between two glucose molecules in maltose?",["Peptide","α-1,4 glycosidic","β-1,4 glycosidic","Ester"],1,"α-1,4 glycosidic bond."),
T("Name the storage polysaccharide found in the liver and muscles.",["glycogen"],"Glycogen."),
M("Which feature makes glycogen suitable for fast release of glucose?",["It is a helix","Many branches give many free ends","It is soluble","It is made from β-glucose"],1,"Many free ends."),
M("A triglyceride is formed from:",["Glycerol and three fatty acids","Glycerol and two fatty acids","Glucose and fatty acids","Amino acids"],0,"Glycerol and three fatty acids."),
M("Which is NOT a role of triglycerides?",["Energy store","Insulation","Cell membrane bilayer","Buoyancy"],2,"Phospholipids form the bilayer."),
M("The strength of cellulose is due to:",["Many hydrogen bonds between chains","Ionic bonds","Branching","Peptide bonds"],0,"Hydrogen bonds between parallel chains."),
M("Which molecule is amphipathic?",["Triglyceride","Phospholipid","Starch","Cellulose"],1,"Phospholipids have a hydrophilic head and hydrophobic tails.")];
AL_P["2.2"]=[
P("Polysaccharide structure and function",9,"<p>Starch, glycogen and cellulose are all polysaccharides made from glucose.</p><ol type='a'><li>State two ways in which the structure of amylopectin differs from that of amylose. [2]</li><li>Explain why starch is a suitable storage molecule in plant cells. [2]</li><li>Explain why glycogen is more suitable than starch as a store of glucose in a muscle cell. [3]</li><li>Explain how the structure of cellulose makes it suitable for a plant cell wall. [2]</li></ol>",
["(a) Amylopectin is branched but amylose is not (1). Amylopectin has 1,6 glycosidic bonds as well as 1,4 / amylose is a helix (1).","(b) Insoluble so no osmotic effect on water potential (1). Compact so large amounts can be stored (1).","(c) Glycogen is more highly branched (1) so has more free ends for glucose to be added or removed (1) so glucose can be released quickly for respiration (1).","(d) Many hydrogen bonds between parallel chains of β-glucose (1) give high tensile strength to resist turgor pressure (1)."],"Hub exam-style question (written for this hub), Topic 2"),
P("Glycosidic bonds and hydrolysis",7,"<p>Sucrose is a disaccharide made from α-glucose and β-fructose.</p><ol type='a'><li>Name the type of reaction that joins two monosaccharides and name the bond formed. [2]</li><li>State what is released in this reaction. [1]</li><li>Sucrose is heated with dilute hydrochloric acid. Describe and explain the effect on the result of a Benedict’s test. [3]</li><li>State the type of glycosidic bond in sucrose. [1]</li></ol>",
["(a) Condensation (1) and glycosidic bond (1).","(b) Water (1).","(c) Before heating the result is negative as sucrose is non-reducing (1). After heating the acid hydrolyses the glycosidic bond (1) so glucose and fructose, which are reducing sugars, give a positive result (1).","(d) α-1,2 glycosidic bond (1)."],"Hub exam-style question (written for this hub), Topic 2"),
P("Triglycerides and phospholipids",8,"<ol type='a'><li>Describe how a triglyceride is formed from glycerol and fatty acids. [3]</li><li>Explain why triglycerides release more energy per gram than carbohydrates when respired. [2]</li><li>State two differences between a phospholipid and a triglyceride. [2]</li><li>Explain why phospholipids form a bilayer in water. [1]</li></ol>",
["(a) Glycerol and three fatty acids join (1) by condensation reactions with the removal of three water molecules (1) forming ester bonds (1).","(b) Triglycerides have more C–H bonds / long hydrocarbon chains and are more reduced (1) so more energy is released on oxidation (1).","(c) Phospholipids have two fatty acids but triglycerides have three (1). Phospholipids have a phosphate head (1).","(d) The hydrophilic heads face water while the hydrophobic tails face away from water (1)."],"Hub exam-style question (written for this hub), Topic 2"),
P("Fatty acids",6,"<p>The structures of two fatty acids are shown: stearic acid has no double bonds and oleic acid has one double bond between carbon atoms in its hydrocarbon chain.</p><ol type='a'><li>State which fatty acid is saturated and give a reason. [2]</li><li>Explain how the double bond in oleic acid affects the properties of oils made from it. [2]</li><li>State one health risk linked with trans fatty acids. [1]</li><li>State the functional group at the end of a fatty acid that forms the ester bond. [1]</li></ol>",
["(a) Stearic acid (1) because it has no C=C double bonds (1).","(b) The double bond causes a kink in the chain (1) so the molecules do not pack closely and the oil is liquid at room temperature (1).","(c) Coronary heart disease (1).","(d) The carboxyl group (1)."],"Hub exam-style question (written for this hub), Topic 2")
];
