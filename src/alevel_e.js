/* ===== Biology 9700 topic 4 (alevel_e.js): 4.1 Cell membranes, 4.2 Movement into and out of cells.
   Diagrams are the originals from the supplied notes (al_img.js). Figure names: AL_41_NN and AL_42_NN; a _WIDE suffix places the picture full width below the notes. ===== */
const ALE_FIG=(sec,n,cap,alt,wide)=>{FIGS["AL_"+sec+"_"+n+(wide?"_WIDE":"")]=()=>ALF(sec[0]+"."+sec[1]+"_f"+n,cap,alt)};
/* 4.1 */
ALE_FIG("41","01","A phospholipid monolayer on water: heads in the water, tails pointing away.","Phospholipids on water with hydrophilic phosphate heads in the water and hydrophobic fatty acid tails sticking up");
ALE_FIG("41","02","A micelle, seen in cross section and in three dimensions.","Spherical micelle with heads facing outwards and tails inside",1);
ALE_FIG("41","03","A phospholipid bilayer: tails face inwards, heads face outwards.","Two layers of phospholipid molecules forming a sheet, shown flat and in three dimensions",1);
ALE_FIG("41","04","Membranes divide the cell into compartments (mitochondrion, lysosome, nucleus, cell surface membrane).","Animal cell with enlarged views of the membranes of a mitochondrion, lysosome, nuclear envelope and cell surface membrane",1);
ALE_FIG("41","05","Proteins scattered in the bilayer give the mosaic appearance. The structure of each protein decides where it sits.","Cell membrane with glycolipids, glycoproteins, cholesterol, phospholipids and transport proteins labelled",1);
ALE_FIG("41","06","An example of the labelled fluid mosaic diagram you could draw.","Fluid mosaic model with channel protein, glycolipid, glycoprotein, cholesterol, peripheral and integral proteins, and a phospholipid enlarged",1);
ALE_FIG("41","07","Components of the cell surface membrane and their roles.","Membrane with open carrier protein, glycolipid, glycoprotein, hormone receptor, closed carrier protein and cholesterol labelled",1);
ALE_FIG("41","08","The basic stages of a cell signalling pathway.","Flow chart: stimulus to receptor, transduction, transmission of message, target effector, response",1);
ALE_FIG("41","09","Ligands released by a sending cell bind only to the receptors of the target cell.","Sending cell, target cell with receptor and non-target cell without a receptor",1);

AL_L["4.1"]=[
L("The fluid mosaic model","Why membranes are partially permeable bilayers, how phospholipids behave in water, and why the membrane is called fluid and mosaic.",
`<h4>Membranes in cells</h4>
<p>Membranes are found in all cells. The <b>cell surface membrane</b> encloses the cell and separates the inside from the outside. <b>Intracellular membranes</b> form compartments inside the cell, such as the nucleus, mitochondria and rough endoplasmic reticulum (RER).</p>
<ul><li>Membranes separate different areas and <b>control the exchange</b> of material across them.</li><li>They act as an <b>interface for communication</b> between cells and their surroundings.</li><li>They are <b>partially permeable</b>. Substances cross by diffusion, osmosis and active transport.</li><li>A cell membrane is a bilayer of phospholipids about <b>7 nm</b> wide, just visible in an electron microscope at very high magnification.</li></ul>
<p>The <b>fluid mosaic model</b> was first outlined in <b>1972</b>. It explains how biological molecules are arranged in membranes and helps to explain passive and active movement across the membrane, cell-to-cell interactions and cell signalling.</p>
{{AL_41_04_WIDE}}
<h4>Phospholipids in water</h4>
<p>A phospholipid has two distinct regions: a <b>polar (hydrophilic) phosphate head</b> that is soluble in water and two <b>non-polar (hydrophobic) fatty acid tails</b> that are insoluble in water. How it behaves depends on how the phospholipids are mixed with water.</p>
<table><tr><th>Arrangement</th><th>How it forms</th></tr>
<tr><td><b>Monolayer</b></td><td>Spread over the surface of water: heads in the water, tails sticking up away from it</td></tr>
<tr><td><b>Micelle</b></td><td>Mixed or shaken with water: a sphere with heads facing out to the water and tails facing in towards each other</td></tr>
<tr><td><b>Bilayer</b></td><td>Two-layered sheets: tails face inwards, heads face outwards. This is the basic structure of the cell membrane</td></tr></table>
{{AL_41_01}}
{{AL_41_02_WIDE}}
{{AL_41_03_WIDE}}
<h4>Compartments from bilayers</h4>
<p>Bilayers can form <b>compartments</b>. The bilayer around a cell forms the cell surface membrane and sets the boundary of the cell. Inside the cell, membrane-bound compartments give organelles their basic structure, so that different processes can be specialised in different places.</p>
<div class="ex"><b>Example</b>A lysosome (animal cells) holds many hydrolytic enzymes that can break down many kinds of biomolecule. They must be kept inside a membrane, otherwise they would break down most of the cell's own components.</div>
<h4>Why it is called the fluid mosaic model</h4>
<p>Cell membranes contain <b>proteins</b> as well as phospholipids. Intrinsic (integral) proteins are embedded in the bilayer, with their position set by their hydrophilic and hydrophobic regions. Extrinsic (peripheral) proteins sit on the surface.</p>
<table><tr><th>Word</th><th>Meaning</th></tr>
<tr><td><b>Fluid</b></td><td>Phospholipids and proteins can move around by diffusion. Phospholipids mainly move sideways within their own layer. Proteins move about within the bilayer a bit like icebergs in the sea, although some are fixed in position.</td></tr>
<tr><td><b>Mosaic</b></td><td>The scattered pattern of proteins in the phospholipid bilayer looks like a mosaic when viewed from above.</td></tr></table>
{{AL_41_05_WIDE}}
<h4>Drawing the fluid mosaic model</h4>
<div class="key"><b>Examiner tip</b>You must know how to draw and label the fluid mosaic model, and be able to describe why the membrane is called the fluid mosaic model.</div>
{{AL_41_06_WIDE}}`,
I("Why do phospholipids form a bilayer in water?",
`<ol><li>Look at the drawing of a phospholipid with its head and two tails. Mark which end likes water and which end avoids it.</li><li>Predict what a crowd of these molecules would do if they were tipped into a beaker of water.</li><li>Draw your prediction as a cross section, showing where the heads and tails would point.</li><li>Decide what would happen if the tails were in contact with water on both sides of a sheet.</li></ol>`,
`<p><b>Model a bilayer.</b> Use two colours of Plasticine or bead to make about 20 phospholipid models (a round head and two tails).</p><ol><li>Arrange them on a sheet of paper labelled "water" at the top and bottom so that the tails never touch water.</li><li>Photograph the arrangement and label heads, tails and the hydrophobic core.</li><li>Add 4 larger bead "proteins" and place two of them so that they span the whole bilayer.</li><li>Explain which regions of an intrinsic protein must be hydrophobic and which hydrophilic.</li></ol>`),
[["State two roles of membranes in cells.","Any two from (1 each): separate the cell from its surroundings; form compartments inside the cell; control exchange of substances; act as an interface for communication.",2],
["Describe how phospholipids are arranged in a bilayer.","Two layers of phospholipid molecules (1); hydrophilic phosphate heads face outwards towards water (1); hydrophobic fatty acid tails face inwards, towards each other (1).",3],
["Explain why the membrane is described as fluid.","Phospholipids can move (by diffusion) within their layer (1); proteins can also move about within the bilayer (1).",2],
["Explain why the membrane is described as a mosaic.","The proteins are scattered through the bilayer (1) giving a pattern that looks like a mosaic from above (1).",2],
["Suggest why lysosomes are surrounded by a membrane.","The membrane keeps the hydrolytic enzymes inside the lysosome (1) so they cannot break down the rest of the cell (1).",2]],
[M("About how wide is a phospholipid bilayer?",["0.7 nm","7 nm","70 nm","7 micrometres"],1,"A bilayer is about 7 nm wide."),
M("In a phospholipid bilayer the fatty acid tails are",["hydrophilic and face outwards","hydrophobic and face inwards","hydrophilic and face inwards","hydrophobic and face outwards"],1,"Non-polar tails face each other, away from water."),
M("A sphere of phospholipids with tails pointing in is a",["monolayer","bilayer","micelle","vesicle only"],2,"This is a micelle."),
M("Which description matches intrinsic proteins?",["Found only on the outer surface","Embedded in the bilayer","Always fixed in position","Made only of carbohydrate"],1,"Intrinsic (integral) proteins are embedded in the membrane."),
M("Why is the membrane called a mosaic?",["Phospholipids can move","Proteins are scattered through it","It has two layers","It contains cholesterol"],1,"The scattered proteins resemble a mosaic."),
T("In which year was the fluid mosaic model first outlined?",["1972"],"1972."),
T("What word describes a membrane that lets some substances through but not others?",["partially permeable","selectively permeable","semi-permeable","semipermeable"],"Partially permeable.")],
[["What is the fluid mosaic model?","A model of the membrane as a phospholipid bilayer in which proteins are scattered and can move; first outlined in 1972."],
["Which part of a phospholipid is hydrophilic?","The polar phosphate head."],
["Which part of a phospholipid is hydrophobic?","The two non-polar fatty acid tails."],
["What is a micelle?","A sphere of phospholipids with heads facing out to the water and tails facing in."],
["What is a phospholipid monolayer?","A single layer on the surface of water with heads in the water and tails sticking up."],
["Give two features that make a membrane 'fluid'.","Phospholipids move sideways within their layer; proteins move about in the bilayer."],
["Distinguish intrinsic from extrinsic proteins.","Intrinsic (integral) proteins are embedded in the bilayer; extrinsic (peripheral) proteins are on the surface."],
["How wide is a cell membrane?","About 7 nm."]]),

L("Components of the cell surface membrane","Phospholipids, cholesterol, glycolipids, glycoproteins and proteins: where each sits and what each does, and what changes membrane fluidity.",
`<h4>Types of molecule in a cell membrane</h4>
<p>The cell membranes of all organisms generally have a similar structure. They contain three types of lipid and two types of protein.</p>
<table><tr><th>Type</th><th>Molecules</th></tr>
<tr><td><b>Lipids</b></td><td>Phospholipids, cholesterol, glycolipids (lipids with carbohydrate chains)</td></tr>
<tr><td><b>Proteins</b></td><td>Glycoproteins (proteins with carbohydrate chains) and other proteins, e.g. transport proteins</td></tr></table>
{{AL_41_07_WIDE}}
<div class="key"><b>Examiner tip</b>Make sure you can draw and label all of these on a diagram of the fluid mosaic model. An annotated diagram can also be used to state the function of each structure.</div>
<h4>Where each component sits</h4>
<ul><li><b>Phospholipids</b> form a bilayer. The tails point in towards the interior and the heads point out to the surface. Individual molecules move around within their own layer by diffusion.</li>
<li><b>Cholesterol</b> also has a hydrophilic head and a hydrophobic tail. It fits between phospholipids, orientated the same way (head out, tail in). It is <b>absent from prokaryote membranes</b>.</li>
<li><b>Glycolipids</b> have carbohydrate chains that project into the fluid around the cell. They are found on the <b>outer</b> monolayer.</li>
<li><b>Glycoproteins</b> also have carbohydrate chains projecting outwards, on the <b>outer</b> monolayer.</li>
<li><b>Intrinsic (integral) proteins</b> are embedded in the membrane, in the inner or outer monolayer. Most span the whole membrane and are called <b>transmembrane proteins</b>.</li>
<li><b>Extrinsic (peripheral) proteins</b> are on the inner or outer surface.</li></ul>
<h4>Functions of phospholipids and cholesterol</h4>
<p><b>Phospholipids</b> form the basic structure of the membrane. The hydrophobic tails make a core that is a barrier to most water-soluble substances, because non-polar tails stop polar molecules and ions crossing. Sugars, amino acids and proteins cannot leak out, and unwanted water-soluble molecules cannot get in.</p>
<p>Phospholipids can also be chemically modified to act as <b>signalling molecules</b>. They can move within the bilayer to activate other molecules such as enzymes, or be hydrolysed to release smaller water-soluble molecules that bind to specific receptors in the cytoplasm.</p>
<p><b>Cholesterol</b> regulates the fluidity of the membrane.</p>
<ul><li>It sits between phospholipids and stops them packing too closely together at low temperatures, so the membrane does not freeze and fracture.</li><li>It interacts with the hydrophobic tails at higher temperatures, stabilising the membrane and stopping it becoming too fluid.</li><li>It contributes to impermeability to ions and increases the mechanical strength and stability of the membrane. Without it, membranes would break down and cells would burst.</li></ul>
<h4>Glycolipids, glycoproteins and proteins</h4>
<p>The carbohydrate chains of glycolipids and glycoproteins lie on the outer surface, so they can act as <b>receptor molecules</b> and bind certain substances at the cell surface. There are three main receptor types:</p>
<ul><li>signalling receptors for hormones and neurotransmitters</li><li>receptors involved in endocytosis</li><li>receptors involved in cell adhesion and stabilisation (the carbohydrate part forms hydrogen bonds with water molecules around the cell)</li></ul>
<p>Some act as <b>cell markers or antigens</b> for cell-to-cell recognition. For example, the ABO blood group antigens are glycolipids and glycoproteins that differ slightly in their carbohydrate chains.</p>
<p><b>Transport proteins</b> create hydrophilic channels that let ions and polar molecules cross the membrane. There are two types, <b>channel (pore) proteins</b> and <b>carrier proteins</b>. Each is specific to a particular ion or molecule, so the cell controls which substances enter or leave.</p>
<h4>What changes membrane fluidity?</h4>
<table><tr><th>Membrane is LESS fluid when</th><th>Membrane is MORE fluid when</th></tr>
<tr><td>There is a higher proportion of <b>saturated</b> fatty acid chains: the chains pack tightly, so there are many intermolecular forces between them</td><td>There is a higher proportion of <b>unsaturated</b> fatty acid chains: the chains are bent, so they pack less tightly, with fewer intermolecular forces</td></tr>
<tr><td>The temperature is <b>lower</b>: molecules have less energy, move less freely and are more closely packed</td><td>The temperature is <b>higher</b>: molecules have more energy and move more freely</td></tr></table>`,
I("What would happen if a cell membrane had no cholesterol?",
`<ol><li>Think of a membrane in a cold place and in a hot place. How might the phospholipids pack in each case?</li><li>Write what the membrane would be like if the phospholipids packed too tightly, and what it would be like if they were too free to move.</li><li>Suggest what a molecule that sits between the phospholipids could do to keep the membrane stable in both cases.</li></ol>`,
`<p><b>Sort the components.</b> Cut out labels for phospholipid, cholesterol, glycolipid, glycoprotein, channel protein, carrier protein, extrinsic protein and receptor.</p><ol><li>Place each label on a large blank membrane drawing in the correct position (outer layer, inner layer or spanning).</li><li>Add a second label for the function of each.</li><li>Colour carbohydrate chains red and decide which side of the membrane they must be on.</li><li>Check your diagram against the labelled diagram in the notes.</li></ol>`),
[["State the three types of lipid found in cell membranes.","Phospholipids (1); cholesterol (1); glycolipids (1).",3],
["Explain how cholesterol regulates the fluidity of the membrane.","At low temperatures it stops phospholipids packing too closely so the membrane does not freeze or fracture (1); at higher temperatures it stabilises the membrane by binding to the tails and stops it becoming too fluid (1).",2],
["Explain why the membrane is a barrier to ions and polar molecules.","The membrane has a hydrophobic core of fatty acid tails (1) which are non-polar so ions and polar molecules cannot pass through (1).",2],
["Describe two functions of glycoproteins and glycolipids.","Any two from (1 each): act as receptors for hormones or neurotransmitters; receptors for endocytosis; cell adhesion and stabilisation; cell markers or antigens for cell recognition.",2],
["Explain how a membrane with more unsaturated fatty acids differs in fluidity from one with more saturated fatty acids.","Unsaturated chains are bent so pack less tightly (1) with fewer intermolecular forces (1) so the membrane is more fluid (1).",3]],
[M("Which molecule is absent from prokaryote membranes?",["Phospholipid","Cholesterol","Glycoprotein","Protein"],1,"Cholesterol is absent in prokaryotes."),
M("Carbohydrate chains of glycoproteins project",["into the cytoplasm","out into the fluid surrounding the cell","into the hydrophobic core","into the nucleus"],1,"They project from the outer monolayer."),
M("Which makes a membrane less fluid?",["More unsaturated fatty acids","Higher temperature","More saturated fatty acids","Fewer saturated fatty acids"],2,"Saturated chains pack tightly."),
M("Proteins that span the whole membrane are called",["peripheral proteins","transmembrane proteins","glycolipids","micelles"],1,"Most intrinsic proteins are transmembrane."),
M("The ABO blood group antigens are",["cholesterol molecules","glycolipids and glycoproteins","phospholipids","channel proteins"],1,"The carbohydrate chains differ slightly."),
T("Name the two types of transport protein.",["channel and carrier","carrier and channel"],"Channel (pore) proteins and carrier proteins."),
T("What term describes lipids with carbohydrate chains attached?",["glycolipid","glycolipids"],"Glycolipids.")],
[["Name three types of lipid in membranes.","Phospholipids, cholesterol, glycolipids."],
["What is a glycoprotein?","A protein with carbohydrate chains attached; sits on the outer surface."],
["Role of cholesterol?","Regulates fluidity: stops packing too closely when cold, stops over-fluidity when warm; adds strength."],
["What are transmembrane proteins?","Intrinsic proteins that span the whole membrane."],
["Effect of saturated fatty acids on fluidity?","Straight chains pack tightly so the membrane is less fluid."],
["Effect of raising temperature on fluidity?","Molecules have more energy and move more freely so the membrane is more fluid."],
["Role of glycolipids and glycoproteins in recognition?","They act as cell markers or antigens, e.g. ABO blood group antigens."],
["Why can ions not cross the bilayer directly?","The hydrophobic tails in the core are non-polar and repel charged particles."]]),

L("Cell signalling","How cells send and receive messages, the stages of a signalling pathway, and how ligands bind to receptors on target cells.",
`<h4>What is cell signalling?</h4>
<p>Cell signalling is the process by which <b>messages are sent to cells</b>. It allows multicellular organisms to control and coordinate their bodies and respond to the environment. Signalling pathways coordinate the activities of cells, even when they are a long way apart.</p>
<h4>Stages of a signalling pathway</h4>
<ol><li>A stimulus or signal is received by a <b>receptor</b>.</li><li>The signal is converted into a message that can be passed on. This is <b>transduction</b>.</li><li>The message is <b>transmitted</b> to a target (effector).</li><li>An appropriate <b>response</b> is made.</li></ol>
{{AL_41_08_WIDE}}
<h4>Role of the cell surface membrane</h4>
<p>Messages must cross barriers such as cell surface membranes, so membranes are very important in signalling pathways. The membrane controls which molecules, including signalling molecules, can move between the inside and the outside of the cell. Signalling molecules are usually very small so that they are easily transported, and they typically need to cross or interact with cell membranes.</p>
<h4>Ligands and receptors</h4>
<p>Signalling molecules are often called <b>ligands</b>. Their stages are:</p>
<ol><li>The ligand is secreted from a sending cell into the extracellular space.</li><li>It is transported through the extracellular space to the target cell.</li><li>It binds to a surface receptor on the target cell that is specific to that ligand. These receptors are formed from glycolipids and glycoproteins.</li><li>The message is relayed through a chain of chemical messengers inside the cell, triggering a response.</li></ol>
{{AL_41_09_WIDE}}
<div class="key"><b>Key idea</b>A non-target cell has no receptor for the ligand, so it does not respond. Specific receptors let one signal reach only the cells that should respond.</div>`,
I("How does a hormone reach only the right cells?",
`<ol><li>A hormone is released into the blood and reaches every cell in the body, but only some cells respond.</li><li>Write down a possible reason why a liver cell responds to insulin while a skin cell may not.</li><li>Predict what the surface of a responding cell has that a non-responding cell lacks.</li></ol>`,
`<p><b>Act out signalling.</b> In groups of five, one student is the sending cell, one is a target cell holding a card with a "receptor" shape cut out, and one is a non-target cell with a different shape.</p><ol><li>The sending cell throws several shaped "ligand" cards across the room.</li><li>Each cell tries to fit the ligands into their receptor shape.</li><li>Record which cells could receive the signal and what each did next (response).</li><li>Label the stages receptor, transduction, transmission, target and response on a flow chart.</li></ol>`),
[["List the four basic stages of a cell signalling pathway.","Signal received by a receptor (1); transduction (1); message transmitted to a target or effector (1); response made (1).",4],
["Explain what is meant by transduction.","Conversion of the signal (1) into a message that can be passed on (1).",2],
["State what is meant by a ligand.","A signalling molecule (1) that binds to a specific receptor on a target cell (1).",2],
["Explain why a non-target cell does not respond to a ligand.","It has no receptor (1) that is specific to the ligand, so the ligand cannot bind (1).",2],
["State the molecules that form cell surface receptors.","Glycolipids (1) and glycoproteins (1).",2]],
[M("What is the conversion of a signal into a message called?",["Transmission","Transduction","Translation","Transpiration"],1,"Transduction."),
M("Signalling molecules are often called",["effectors","ligands","antigens","vesicles"],1,"Ligands."),
M("Cell surface receptors are formed from",["phospholipids","glycolipids and glycoproteins","cholesterol","cellulose"],1,"The carbohydrate chains act as receptors."),
M("A non-target cell does not respond because it",["has no membrane","lacks the specific receptor","is too small","has too many ligands"],1,"No receptor, no binding."),
T("What name is given to the part of the pathway that makes the response?",["target","effector","target (effector)"],"The target (effector)."),
T("Which type of molecule is secreted by the sending cell and binds to receptors?",["ligand","ligands"],"A ligand.")],
[["What is cell signalling?","The process by which messages are sent to cells so that the body is controlled and coordinated."],
["What is transduction?","Converting a signal into a message that can be passed on."],
["What is a ligand?","A signalling molecule that binds to a specific receptor."],
["Where are ligand receptors found?","On the surface of the target cell, formed from glycolipids and glycoproteins."],
["Why does the membrane matter in signalling?","It controls which signalling molecules can cross between the inside and outside of the cell."],
["Four stages of signalling?","Receptor, transduction, transmission to target (effector), response."]])
];
AL_Q["4.1"]=[
M("Which describes the arrangement of phospholipids in a cell membrane?",["A single layer with tails outwards","Two layers with tails inwards","A sphere with tails outwards","Two layers with heads inwards"],1,"A bilayer has hydrophobic tails inwards."),
M("Cholesterol in the membrane",["is found only in prokaryotes","regulates fluidity","forms receptors","forms channels"],1,"It regulates fluidity."),
M("Which is NOT a feature of the fluid mosaic model?",["Phospholipids can move sideways","Proteins are scattered in the bilayer","The membrane is a rigid sheet","Carbohydrate chains project outwards"],2,"The membrane is fluid, not rigid."),
M("Signalling molecules that bind to receptors are called",["ligands","effectors","micelles","antigens"],0,"Ligands."),
N("Approximately how wide (in nm) is a phospholipid bilayer?",7,"nm","About 7 nm.",1),
T("Name the term for lipids with carbohydrate chains attached.",["glycolipid","glycolipids"],"Glycolipids."),
T("Name the process that converts a signal into a message that can be passed on.",["transduction"],"Transduction.")
];
AL_P["4.1"]=[
P("Membrane structure",7,"<p>The diagram in the notes shows the structure of a cell surface membrane.</p><ol type='a'><li>Describe how the molecules in the membrane are arranged so that the membrane is a barrier to ions. [3]</li><li>Explain why the membrane is described as <b>fluid</b>. [2]</li><li>State two functions of cholesterol in the membrane. [2]</li></ol>",
["(a) The phospholipids form a bilayer (1); the hydrophobic fatty acid tails form a core in the middle (1); the tails are non-polar so charged ions cannot pass through (1).","(b) Phospholipids can move (by diffusion) within their own layer (1); proteins can also move about in the bilayer (1).","(c) Regulates fluidity (1); stops phospholipids packing too tightly at low temperatures or becoming too fluid at high temperatures, or increases mechanical strength and stability (1)."],"Hub exam-style question (written for this hub), Topic 4"),
P("Membrane fluidity",5,"<p>A scientist compares two membranes. Membrane <b>X</b> has mostly saturated fatty acid tails. Membrane <b>Y</b> has mostly unsaturated fatty acid tails.</p><ol type='a'><li>State which membrane is more fluid at 20 &deg;C. [1]</li><li>Explain your answer to (a). [2]</li><li>Describe the effect of increasing the temperature on the fluidity of membrane X. [2]</li></ol>",
["(a) Y (1).","(b) Unsaturated chains are bent so do not pack tightly (1); fewer intermolecular forces between chains (1).","(c) Molecules have more energy and move more freely (1) so the membrane becomes more fluid (1)."],"Hub exam-style question (written for this hub), Topic 4"),
P("Cell signalling",6,"<p>Insulin is a hormone released into the blood by cells in the pancreas. It affects liver cells but does not affect red blood cells.</p><ol type='a'><li>Name the term used for a signalling molecule such as insulin. [1]</li><li>Explain why liver cells respond to insulin but red blood cells do not. [2]</li><li>Name the type of molecule that forms the receptor on the surface of the target cell. [2]</li><li>State the term for the stage in which the signal is converted into a message that can be passed on. [1]</li></ol>",
["(a) Ligand (1).","(b) Liver cells have receptors specific to insulin (1); red blood cells do not have this receptor so the ligand cannot bind (1).","(c) Glycoproteins (1) and glycolipids (1).","(d) Transduction (1)."],"Hub exam-style question (written for this hub), Topic 4")
];

/* 4.2 */
ALE_FIG("42","01","Diffusion across the cell membrane: net movement from higher to lower concentration over time.","Molecules crossing a membrane from the extracellular fluid, where they are at higher concentration, into the cytoplasm",1);
ALE_FIG("42","02","Factors affecting the rate of diffusion.","Table of factors: concentration gradient, temperature, surface area and properties of molecules or ions",1);
ALE_FIG("42","03","A gated channel protein, open and closed.","Channel protein with sodium ions passing when open and blocked when closed");
ALE_FIG("42","04","A carrier protein changes shape during facilitated diffusion.","Carrier protein binding a polar molecule on the high concentration side and releasing it on the low concentration side",1);
ALE_FIG("42","05","A partially permeable membrane lets small water molecules through but not large solute molecules.","Membrane with pores: water molecules pass through, large solute molecules cannot");
ALE_FIG("42","06","How osmosis works: water moves from the dilute solution (higher water potential) into the concentrated solution (lower water potential).","Two sugar solutions separated by a partially permeable membrane with net movement of water towards the concentrated side",1);
ALE_FIG("42","07","A carrier protein changing shape during active transport, using energy from ATP.","Carrier protein moving a molecule from low to high concentration",1);
ALE_FIG("42","08","Phagocytosis of a bacterium by a phagocyte (white blood cell).","Bacterium engulfed into a phagocytic vacuole, digested by lysosome enzymes and the remains removed by exocytosis",1);
ALE_FIG("42","09","Exocytosis: a secretory vesicle from the Golgi body fuses with the cell surface membrane and releases its product.","Golgi body producing secretory vesicles that fuse with the cell surface membrane",1);
ALE_FIG("42","10","Normal and plasmolysed red onion cells (artistic impression of light micrographs).","Red onion epidermis cells, normal and plasmolysed",1);
ALE_FIG("42","11","Setting up Visking tubing containing starch and glucose in water, with the Benedict's and iodine tests.","Visking tubing in a boiling tube of water with Benedict's test for glucose and iodine test for starch",1);
ALE_FIG("42","12","Agar cubes of different sizes in hydrochloric acid: the indicator changes colour as acid diffuses in.","Three boiling tubes with agar cubes of 0.5 cm, 1 cm and 2 cm sides in hydrochloric acid",1);
ALE_FIG("42","13","As size increases, the surface area to volume ratio decreases.","Cubes of side 1 cm, 2 cm and 3 cm with surface area, volume and SA:V ratios 6:1, 3:1 and 2:1",1);
ALE_FIG("42","14","Calculating surface area, volume and SA:V for a cube, cuboid and cylinder, with worked examples.","Table of formulae and worked examples for cube, cuboid and cylinder",1);
ALE_FIG("42","15","Agar method, steps 1 and 2: cut the cubes, then calculate surface area, volume and ratio.","Cubes A, B and C of agar cut with scalpel and ruler and a table of SA, volume and ratio",1);
ALE_FIG("42","16","Agar method, steps 3 and 4: place the cubes in acid and time how long they take to go colourless.","Agar cubes in boiling tubes of acid and a stopwatch",1);
ALE_FIG("42","17","Agar analysis: calculate the rate (1 divided by time), plot rate against SA:V and write a conclusion.","Table of times and rates for cubes A, B and C, a graph of rate of diffusion against SA:V ratio and a written conclusion",1);
ALE_FIG("42","18","Rate of diffusion is calculated before the graph is drawn.","Note reminding students to calculate rates before plotting",1);
ALE_FIG("42","19","Osmosis method, steps 1 and 2: cut potato cylinders with a cork borer and trim them to the same length.","Cork borer, potato cylinders, scalpel and ruler",1);
ALE_FIG("42","20","Osmosis method, step 3: measure the mass of each cylinder and record the results in a table.","Top pan balance and an empty table for sucrose concentration, initial mass, final mass, change and percentage change",1);
ALE_FIG("42","21","Osmosis method, steps 4 to 6: add 10 cm^3 of solution to each tube, add a cylinder, leave for a set time, then blot dry and re-measure.","Row of five boiling tubes of different sucrose concentrations containing potato cylinders in a water bath",1);
ALE_FIG("42","22","Osmosis analysis: calculate percentage change in mass for each cylinder.","Results table and formula for percentage change in mass",1);
ALE_FIG("42","23","Plot percentage change in mass against sucrose concentration. Where the line crosses the x-axis, there is no net movement of water.","Graph of percentage change in mass against sucrose concentration crossing zero at about 0.4 mol per dm cubed",1);
ALE_FIG("42","24","Osmosis of water into a plant cell placed in pure water or a solution of higher water potential.","Plant cell in water with water moving into the vacuole",1);
ALE_FIG("42","25","Plasmolysis: water leaves the cell and the protoplast pulls away from the cell wall.","Three stages: turgid cell, plasmolysis in progress and fully plasmolysed cell",1);
ALE_FIG("42","26","Effect of osmosis on animal cells (red blood cells) in hypertonic, isotonic and hypotonic solutions.","Red blood cells shrivelled in hypertonic solution, normal in isotonic and swollen or bursting in hypotonic",1);
ALE_FIG("42","27","Comparison of osmosis in plant and animal cells.","Table comparing plant and animal cells for membrane, cell wall and response to lower or higher water potential",1);

AL_L["4.2"]=[
L("Diffusion and facilitated diffusion","How substances cross membranes by diffusion, the factors that affect its rate, and how channel and carrier proteins help substances that cannot cross the bilayer.",
`<h4>Diffusion across the cell membrane</h4>
<p><b>Diffusion</b> is the net movement, as a result of the random motion of its molecules or ions, of a substance from a region of its higher concentration to a region of its lower concentration. The molecules or ions move <b>down a concentration gradient</b>. The random movement comes from their natural kinetic energy.</p>
{{AL_42_01_WIDE}}
<p>Given enough time, diffusion produces an <b>equilibrium</b>, where molecules or ions are evenly spread throughout the volume.</p>
<h4>Factors that affect the rate of diffusion</h4>
<table><tr><th>Factor</th><th>How it affects the rate</th></tr>
<tr><td><b>Steepness of concentration gradient</b></td><td>A bigger difference in concentration means a bigger difference in the numbers crossing in each direction, so diffusion is faster</td></tr>
<tr><td><b>Temperature</b></td><td>Higher temperature gives more kinetic energy, so molecules and ions move faster and diffusion is faster</td></tr>
<tr><td><b>Surface area</b></td><td>A larger surface area lets more molecules cross at any one moment. Membranes can be folded to increase it (microvilli in the intestine, cristae in mitochondria). As a cell grows, its SA:V ratio falls and diffusion across the cell slows because the distance becomes too great</td></tr>
<tr><td><b>Properties of molecules or ions</b></td><td>Large molecules diffuse more slowly than small ones. Uncharged and non-polar molecules diffuse directly across the bilayer. Non-polar molecules diffuse faster than polar ones because they dissolve in the non-polar bilayer</td></tr></table>
{{AL_42_02_WIDE}}
<h4>Facilitated diffusion</h4>
<p>Some substances cannot diffuse through the phospholipid bilayer. These include <b>large polar molecules</b> such as glucose and amino acids, and <b>ions</b> such as Na^+^ and Cl^-^. They cross only with the help of proteins. This is <b>facilitated diffusion</b>. Two types of protein are involved, and both are highly specific, allowing only one type of molecule or ion through.</p>
<h4>Channel proteins</h4>
<p>Channel proteins are <b>water-filled pores</b>. They let charged substances such as ions diffuse through the membrane. Most are <b>gated</b>: part of the protein on the inside surface of the membrane can move to open or close the pore, so the channel controls the exchange of ions.</p>
{{AL_42_03}}
<h4>Carrier proteins</h4>
<p>Unlike channel proteins, which have a fixed shape, <b>carrier proteins switch between two shapes</b>. The binding site is open to one side of the membrane first, then open to the other side when the protein changes shape. Net diffusion is down the concentration gradient, from the side with more of the molecule to the side with less.</p>
{{AL_42_04_WIDE}}
<div class="key"><b>Examiner tip</b>Movement from high to low concentration is diffusion. If it needs the help of a protein (for example because the particle is charged and cannot pass directly through the bilayer) it is facilitated diffusion.</div>`,
I("Why can glucose not simply slip through the membrane?",
`<ol><li>Glucose is a large polar molecule. Decide whether it would pass easily through the hydrophobic core of a bilayer.</li><li>Write two other types of particle that might also struggle to cross.</li><li>Suggest what the membrane needs to contain so that glucose can still get into cells.</li></ol>`,
`<p><b>Model diffusion.</b> Place a drop of food colouring in a beaker of cold water and in a beaker of warm water.</p><ol><li>Time how long the colour takes to spread evenly in each.</li><li>Record the result and explain it using kinetic energy.</li><li>Repeat with a very large drop and a small drop to test concentration gradient.</li><li>List which factors you changed and which you kept the same.</li></ol>`),
[["Define diffusion.","The net movement of molecules or ions (1) from a region of higher concentration to a region of lower concentration (1) as a result of random movement (1).",3],
["State two factors that increase the rate of diffusion across a membrane and explain each.","Any two factors (1 each) each with an explanation (1 each), e.g. steeper concentration gradient because a greater difference in the numbers moving each way; higher temperature because molecules have more kinetic energy and move faster. Accept surface area.",4],
["Explain why glucose cannot diffuse directly through the phospholipid bilayer.","Glucose is a large (1) polar molecule so cannot pass through the non-polar hydrophobic core (1).",2],
["Describe how a carrier protein differs from a channel protein.","Carrier proteins change shape to move the molecule across (1); channel proteins have a fixed shape and form water-filled pores (1).",2],
["Explain why a large cell has a problem with diffusion.","As size increases, the SA:V ratio decreases (1) so the distance for diffusion is too great or the surface is too small for the volume (1).",2]],
[M("Which particle needs a protein to cross the membrane by diffusion?",["Oxygen","Carbon dioxide","Sodium ion","A non-polar lipid"],2,"Ions cannot cross the hydrophobic core."),
M("Which statement about channel proteins is correct?",["They change shape","They use ATP","They are water-filled pores","They are not specific"],2,"Channel proteins are water-filled pores."),
M("Raising temperature increases diffusion rate because",["the gradient is steeper","molecules have more kinetic energy","the surface area is larger","molecules become smaller"],1,"More kinetic energy."),
M("Diffusion that needs a protein but no ATP is",["osmosis","active transport","facilitated diffusion","endocytosis"],2,"Facilitated diffusion."),
M("Non-polar molecules diffuse faster than polar ones because they",["are larger","dissolve in the non-polar bilayer","use carrier proteins","need ATP"],1,"They are soluble in the bilayer."),
T("What is the state called when particles are evenly spread?",["equilibrium"],"Equilibrium."),
T("Which type of channel protein can open and close?",["gated","gated channel"],"Gated.")],
[["Define diffusion.","Net movement of molecules or ions from higher to lower concentration due to random motion."],
["Name four factors affecting rate of diffusion.","Concentration gradient, temperature, surface area, properties of molecules or ions."],
["Which substances need facilitated diffusion?","Large polar molecules (glucose, amino acids) and ions (Na^+^, Cl^-^)."],
["What is a channel protein?","A water-filled pore that lets ions through; most are gated."],
["What is a carrier protein?","A protein that changes shape to move a specific molecule or ion across the membrane."],
["Does facilitated diffusion use ATP?","No, it moves substances down a concentration gradient."],
["Why do cells fold their membranes?","To increase surface area for faster exchange, e.g. microvilli and cristae."]]),

L("Osmosis and water potential","Osmosis, water potential, and what happens to plant and animal cells in solutions of different water potential.",
`<h4>The process of osmosis</h4>
<p>All cells are surrounded by a partially permeable membrane. Water can move in and out of cells by <b>osmosis</b>. The membrane lets small molecules like water through but not larger solute molecules.</p>
{{AL_42_05}}
<p>Osmosis is the net movement of water molecules from a region of <b>higher water potential</b> (dilute solution) to a region of <b>lower water potential</b> (concentrated solution) through a partially permeable membrane. <b>Water potential</b> describes the tendency of water to move out of a solution. The term avoids confusion between the concentration of water and the concentration of a solution.</p>
{{AL_42_06_WIDE}}
<p>A dilute solution has a high water potential and a concentrated solution has a low water potential. <b>Pure water at atmospheric pressure has a water potential of 0 kPa</b>, so any solution with solutes has a water potential below 0 kPa, a negative value.</p>
<div class="key"><b>Examiner tip</b>Water can cross the bilayer because water molecules are small, even though they are polar. The more negative the water potential, the lower it is (further from pure water at 0 kPa).</div>
<h4>Osmosis in plant cells</h4>
<p>If a plant cell is placed in pure water or a dilute solution, water enters the vacuole by osmosis because the solution has a higher water potential than the cell. The volume of the cell increases and the expanding protoplast pushes against the cell wall. Pressure builds up, but the inelastic cell wall stops the cell bursting. The pressure created by the cell wall also stops too much water entering.</p>
<p>A cell fully inflated with water is rigid and firm: <b>fully turgid</b>. Turgid cells give support and strength, holding the plant upright with its leaves out to catch sunlight. Without enough water, cells are no longer turgid and the plant wilts.</p>
{{AL_42_24_WIDE}}
<h4>Plasmolysis</h4>
<p>If a plant cell is placed in a solution of lower water potential than the cell (such as concentrated sucrose), water leaves the vacuole by osmosis. The volume of the cell decreases, the protoplast shrinks and no longer presses on the cell wall, and then begins to pull away from the wall. This is <b>plasmolysis</b>.</p>
{{AL_42_25_WIDE}}
<div class="key"><b>Examiner tip</b>Plant cell membranes are partially permeable bilayers, but cell walls are made of cellulose and are freely permeable. In a plasmolysed cell the external solution is in the gap between wall and protoplast: it is not an empty space. Pure water is 0 kPa so all solutions have negative water potentials.</div>
<h4>Osmosis in animal cells</h4>
<p>Animal cells also gain and lose water by osmosis, but they have no supporting cell wall, so the effects are more severe.</p>
<table><tr><th>Environment</th><th>Meaning</th><th>Effect on the animal cell</th></tr>
<tr><td><b>Hypertonic</b></td><td>Solution outside has a higher solute concentration (lower water potential) than the cell</td><td>Water leaves by osmosis; the cell shrinks and shrivels</td></tr>
<tr><td><b>Isotonic</b></td><td>Same solute concentration as the cell</td><td>Water moves in and out at the same rate; no net movement; no change</td></tr>
<tr><td><b>Hypotonic</b></td><td>Solution outside has a lower solute concentration (higher water potential) than the cell</td><td>Water enters until the membrane stretches too far and the cell bursts (cytolysis)</td></tr></table>
{{AL_42_26_WIDE}}
<div class="key"><b>Examiner tip</b>Animal cells do not plasmolyse because they have no cell wall. Plasmolysis only occurs in plant cells. This is why the water potential inside animal bodies must be kept constant.</div>
<h4>Comparing plant and animal cells</h4>
{{AL_42_27_WIDE}}`,
I("What happens to a cell in different solutions?",
`<ol><li>A red blood cell and a plant cell are each placed in pure water. Predict what happens to each.</li><li>Write which of them might burst and explain why the other might not.</li><li>Predict what would happen to both cells in very concentrated salt solution.</li></ol>`,
`<p><b>Observe plasmolysis.</b> Peel a thin epidermal strip from a red onion and mount it in water. Observe under the microscope.</p><ol><li>Replace the water with 0.5 mol/dm^3^ sucrose solution using filter paper.</li><li>Observe and draw a few cells before and after, labelling cell wall, protoplast and vacuole.</li><li>Replace the sucrose with distilled water and observe again.</li><li>Explain what happened using the term water potential.</li></ol>`),
[["Define osmosis using the term water potential.","Net movement of water molecules (1) from a region of higher water potential to a region of lower water potential (1) through a partially permeable membrane (1).",3],
["State the water potential of pure water at atmospheric pressure.","0 kPa (1).",1],
["Explain why a plant cell in pure water does not burst.","Water enters by osmosis and the protoplast expands (1) but the inelastic cell wall resists it, so pressure builds up (1) and prevents more water entering (1).",3],
["Describe what is seen when a plant cell is plasmolysed.","The protoplast has shrunk (1) and pulled away from the cell wall (1).",2],
["Explain why an animal cell placed in pure water bursts.","Water enters by osmosis as pure water has a higher water potential (1); there is no cell wall to withstand the pressure (1) so the membrane stretches too far (1).",3]],
[M("Pure water at atmospheric pressure has a water potential of",["100 kPa","0 kPa","-100 kPa","1 kPa"],1,"0 kPa."),
M("A solution with more solute has",["a higher water potential","a lower water potential","the same water potential as pure water","a positive water potential"],1,"More solute lowers water potential."),
M("A plant cell fully inflated with water is",["flaccid","plasmolysed","turgid","lysed"],2,"Turgid."),
M("Animal cells in a hypotonic solution",["shrink","burst","plasmolyse","do not change"],1,"They gain water until they burst (cytolysis)."),
M("Which cells can plasmolyse?",["Animal cells only","Plant cells only","Both","Neither"],1,"Only cells with a cell wall."),
T("What is the term for bursting of an animal cell by osmosis?",["cytolysis","lysis"],"Cytolysis."),
T("What do you call a solution with the same solute concentration as the cell?",["isotonic"],"Isotonic.")],
[["Define osmosis.","Net movement of water from higher to lower water potential through a partially permeable membrane."],
["What is water potential of pure water?","0 kPa."],
["What is a turgid cell?","A plant cell fully inflated with water, rigid and firm."],
["What is plasmolysis?","Protoplast shrinks and pulls away from the cell wall as water leaves by osmosis."],
["What happens to an animal cell in a hypotonic solution?","It gains water and bursts (cytolysis)."],
["What happens to an animal cell in a hypertonic solution?","It loses water and shrivels."],
["Why can plant cells resist bursting?","The inelastic cellulose cell wall resists expansion."],
["Is the cell wall partially permeable?","No, it is freely permeable; the cell membrane is partially permeable."]]),

L("Active transport, endocytosis and exocytosis","Movement against a concentration gradient using ATP, and bulk transport of large materials into and out of cells.",
`<h4>Active transport</h4>
<p><b>Active transport</b> is the movement of molecules and ions through a cell membrane from a region of <b>lower concentration to a region of higher concentration</b> using energy from respiration. It needs <b>carrier proteins</b>, each specific for a particular molecule or ion.</p>
<p>Facilitated diffusion also uses carrier proteins, but active transport is different because it requires energy. The energy makes the carrier protein change shape and move the molecule or ion across. It comes from <b>ATP</b> (adenosine triphosphate) made in respiration.</p>
{{AL_42_07_WIDE}}
<p>Active transport is important in:</p>
<ul><li>reabsorbing useful molecules and ions into the blood after filtration in the kidney tubules</li><li>absorbing some products of digestion from the digestive tract</li><li>loading sugar from photosynthesising leaf cells into the phloem for transport around the plant</li><li>loading inorganic ions from the soil into root hairs</li></ul>
<div class="key"><b>Examiner tip</b>Do not confuse carrier proteins and channel proteins. Active transport needs carrier proteins, which change shape, not channel proteins.</div>
<h4>Bulk transport</h4>
<p>Diffusion, osmosis and active transport move individual molecules or ions. <b>Bulk transport</b> moves larger quantities, such as large molecules (proteins, polysaccharides), parts of cells or whole cells such as bacteria. <b>Bulk transport into cells is endocytosis</b> and <b>bulk transport out is exocytosis</b>. Both need energy, so they are forms of active transport.</p>
<h4>Endocytosis</h4>
<p>In endocytosis the cell surface membrane engulfs material, forming a small sac (endocytic vacuole) around it. There are two forms:</p>
<ul><li><b>Phagocytosis</b> is the bulk intake of <b>solid</b> material. Cells that specialise in it are phagocytes. The vacuoles are phagocytic vacuoles. An example is a white blood cell engulfing bacteria.</li><li><b>Pinocytosis</b> is the bulk intake of <b>liquids</b>. If the vesicle formed is extremely small, the process is micropinocytosis.</li></ul>
{{AL_42_08_WIDE}}
<h4>Exocytosis</h4>
<p>Exocytosis is the removal of materials from cells (the reverse of endocytosis). Substances such as enzymes, hormones or cell wall building materials are packaged into <b>secretory vesicles</b> formed from the <b>Golgi body</b>. The vesicles travel to the cell surface membrane, fuse with it and release their contents. An example is the secretion of digestive enzymes from pancreatic cells.</p>
{{AL_42_09_WIDE}}
<div class="key"><b>Examiner tip</b>Active transport, endocytosis and exocytosis all use ATP from respiration. Name the process: say exocytosis for bulk transport out of a cell, and endocytosis (better, phagocytosis, pinocytosis or micropinocytosis) for bulk transport in. "Bulk transport" alone is not specific enough.</div>`,
I("Why do cells sometimes work against a concentration gradient?",
`<ol><li>Root hair cells take in mineral ions from soil that may contain fewer ions than the cell. Decide whether diffusion could do this.</li><li>Write down what the cell must supply to move ions into a region where they are already more concentrated.</li><li>Predict what would happen to ion uptake if respiration in the root were poisoned.</li></ol>`,
`<p><b>Card sort.</b> Make cards for diffusion, facilitated diffusion, osmosis, active transport, endocytosis and exocytosis.</p><ol><li>Add columns for: uses a protein, needs ATP, direction relative to the concentration gradient, and what is moved.</li><li>Fill in the grid.</li><li>Choose the one process that moves a whole bacterium and the one that releases an enzyme.</li><li>Check your table against the notes.</li></ol>`),
[["Define active transport.","Movement of molecules or ions across a membrane from lower to higher concentration (1) using energy from respiration (ATP) (1) and carrier proteins (1).",3],
["State two differences between active transport and facilitated diffusion.","Active transport is against the concentration gradient, facilitated diffusion is down it (1); active transport needs ATP, facilitated diffusion does not (1).",2],
["Name two places where active transport occurs.","Any two from (1 each): kidney tubule reabsorption; absorption of digestion products; loading sugar into phloem; loading ions into root hairs.",2],
["Distinguish phagocytosis from pinocytosis.","Phagocytosis is bulk intake of solids (1); pinocytosis is bulk intake of liquids (1).",2],
["Describe how a digestive enzyme is secreted from a pancreatic cell.","Packaged into secretory vesicles formed from the Golgi body (1); vesicles move to the cell surface membrane (1) and fuse with it (1) releasing the contents by exocytosis (1).",4]],
[M("Active transport requires",["channel proteins and no energy","carrier proteins and ATP","only a concentration gradient","a cell wall"],1,"Carrier proteins and ATP."),
M("Which process takes bacteria into a white blood cell?",["Osmosis","Exocytosis","Phagocytosis","Diffusion"],2,"Phagocytosis."),
M("Vesicles for exocytosis come from the",["nucleus","Golgi body","ribosome","cell wall"],1,"Secretory vesicles form at the Golgi body."),
M("Bulk intake of liquids is",["phagocytosis","pinocytosis","exocytosis","osmosis"],1,"Pinocytosis."),
M("Which is NOT an example of active transport?",["Ion uptake into root hairs","Sugar loading into phloem","Water entering a cell by osmosis","Reabsorption in kidney tubules"],2,"Osmosis is passive."),
T("What molecule provides the energy for active transport?",["atp","adenosine triphosphate"],"ATP."),
T("What is the name for bulk transport out of a cell?",["exocytosis"],"Exocytosis.")],
[["Define active transport.","Movement from lower to higher concentration using ATP and carrier proteins."],
["What is endocytosis?","Bulk transport into the cell by engulfing material in a vacuole."],
["What is exocytosis?","Bulk transport out of the cell by vesicles fusing with the membrane."],
["Phagocytosis vs pinocytosis?","Phagocytosis takes in solids; pinocytosis takes in liquids."],
["Where do secretory vesicles come from?","The Golgi body."],
["Give two examples of active transport.","Ion uptake in root hairs; sugar loading into phloem; kidney reabsorption."],
["Which proteins are used in active transport?","Carrier proteins that change shape using energy from ATP."]]),

L("Surface area to volume ratio","How SA:V changes with size, how to calculate it for cubes, cuboids and cylinders, and an agar cube investigation of diffusion.",
`<h4>Principles of SA:V</h4>
<p>Surface area and volume are both important in the exchange of materials. The <b>surface area</b> is the total area exposed to the environment. The <b>volume</b> is the total space inside the organism.</p>
<p>As an organism or cell gets larger, its surface area : volume ratio <b>decreases</b>, because volume increases much more rapidly than surface area. When volume is greater and the surface area proportionately smaller, diffusion takes longer and is less effective. The greater the SA:V ratio, the faster the rate of diffusion.</p>
{{AL_42_13_WIDE}}
<div class="ex"><b>Worked example</b>1 cm cube: surface area 6 x 1 x 1 = 6 cm^2^; volume 1 cm^3^; ratio 6:1. 2 cm cube: surface area 24 cm^2^; volume 8 cm^3^; ratio 3:1. 3 cm cube: surface area 54 cm^2^; volume 27 cm^3^; ratio 2:1.</div>
<h4>Calculating SA:V for different shapes</h4>
<p>You are expected to calculate SA:V for a <b>cube, cuboid or cylinder</b> and explain how increasing size affects it. The calculation differs for different shapes.</p>
{{AL_42_14_WIDE}}
<table><tr><th>Shape</th><th>Surface area</th><th>Volume</th></tr>
<tr><td>Cube (side l)</td><td>6 x l^2^</td><td>l^3^</td></tr>
<tr><td>Cuboid</td><td>2(lh + lw + hw)</td><td>l x w x h</td></tr>
<tr><td>Cylinder</td><td>2&pi;r^2^ + 2&pi;rh</td><td>&pi;r^2^h</td></tr></table>
<div class="key"><b>Examiner tip</b>When a cube gets bigger, volume goes up faster than surface area because volume is cubed and surface area is squared.</div>
<h4>Investigating SA:V with agar</h4>
<p>The effect of SA:V on diffusion can be investigated by timing diffusion through agar cubes of different sizes.</p>
{{AL_42_12_WIDE}}
<ol><li><b>Prepare the agar.</b> Make coloured agar, for example purple agar from very dilute sodium hydroxide and Universal Indicator (or Universal Indicator alone). Cut cubes of 0.5 x 0.5 x 0.5 cm, 1 x 1 x 1 cm and 2 x 2 x 2 cm.</li><li><b>Calculate</b> the surface area, volume and SA:V of each cube and record them.</li><li><b>Place</b> each cube in a boiling tube containing the <b>same volume</b> of dilute hydrochloric acid. The acid must have a higher molarity than the sodium hydroxide so its diffusion shows as a colour change.</li><li><b>Measure</b> either the time for the indicator to change colour completely, or the distance the acid has travelled in a given time (e.g. 5 minutes).</li></ol>
{{AL_42_15_WIDE}}
{{AL_42_16_WIDE}}
<h4>Analysing the agar results</h4>
<p>Convert the times to rates: <b>rate = 1 / time taken</b>. Then plot rate of diffusion against SA:V ratio. In the notes' example, cube A (0.5 cm sides, ratio 12:1) took 176 s, a rate of 0.0057 s^-1^; cube B (1 cm, 6:1) took 259 s, 0.0039 s^-1^; cube C (2 cm, 3:1) took 384 s, 1/384 = 0.0026 s^-1^.</p>
{{AL_42_17_WIDE}}
{{AL_42_18_WIDE}}
<p><b>Conclusion:</b> as the SA:V ratio of the agar cube increases, the rate of diffusion also increases. Cube C had the smallest SA:V (3:1) and the lowest rate (0.0026 s^-1^), while cube A had the largest SA:V (12:1) and rate (0.0057 s^-1^).</p>`,
I("Why are small cells better at exchange?",
`<ol><li>Work out the surface area and volume of a 1 cm cube and a 3 cm cube.</li><li>Divide to find each SA:V ratio and say which is greater.</li><li>Suggest why a large organism needs a gas exchange system but a single-celled organism does not.</li></ol>`,
`<p><b>Agar cubes.</b> Cut cubes of 0.5 cm, 1 cm and 2 cm from agar containing Universal Indicator and alkali, and place in equal volumes of dilute acid.</p><ol><li>Calculate SA, volume and SA:V for each cube before starting.</li><li>Time how long each takes to go colourless and repeat to check reliability.</li><li>Calculate rate = 1/time and plot rate against SA:V.</li><li>Write a conclusion that quotes figures from your results.</li></ol>`),
[["Calculate the SA:V ratio of a cube with sides of 2 cm.","Surface area = 6 x 4 = 24 cm^2^ (1); volume = 8 cm^3^ (1); ratio 3:1 (1).",3],
["Explain why the SA:V ratio decreases as a cell gets larger.","Volume increases faster than surface area (1) because volume depends on length cubed and surface area on length squared (1).",2],
["Calculate the SA:V ratio of a cylinder with radius 2 cm and height 6 cm. Give the ratio to two decimal places in the form x:1.","SA = 2&pi;r^2^ + 2&pi;rh = 32&pi; (1); V = &pi;r^2^h = 24&pi; (1); ratio = 1.33:1 (1).",3],
["A cube takes 384 s to turn colourless. Calculate the rate of diffusion.","Rate = 1/time (1) = 0.0026 s^-1^ (1).",2],
["Explain the effect of increasing SA:V on the rate of diffusion in the agar investigation.","The greater the SA:V ratio the faster the rate of diffusion (1) because more surface per unit volume for diffusion and shorter distance to centre (1).",2]],
[N("What is the SA:V of a 2 cm cube (as a number before :1)?",3,"","Surface area 24, volume 8, ratio 3:1.",0.01),
N("What is the volume of a 3 cm cube in cm^3?",27,"cm^3^","3 x 3 x 3 = 27.",0.01),
M("As a cell gets larger, its SA:V ratio",["increases","decreases","stays the same","becomes zero"],1,"It decreases."),
M("Rate of diffusion in the agar investigation is calculated as",["time x volume","1 / time taken","time / volume","SA x time"],1,"Rate = 1/time."),
M("Why must the acid have a higher molarity than the sodium hydroxide?",["To make the agar purple","So its diffusion can be seen by a colour change","So it does not diffuse","To increase SA"],1,"So that the indicator changes."),
T("What happens to SA:V as organism size increases? (one word)",["decreases","decrease","falls"],"It decreases."),
T("Write the formula for the volume of a cylinder.",["pi r^2 h","πr^2h","pi*r^2*h","πr²h"],"Volume = &pi;r^2^h.")],
[["How does SA:V change as size increases?","It decreases because volume increases faster than surface area."],
["SA and volume of 1 cm cube?","6 cm^2^ and 1 cm^3^; ratio 6:1."],
["Surface area of a cube?","6 x l^2^."],
["Volume of a cylinder?","&pi;r^2^h."],
["Surface area of a cylinder?","2&pi;r^2^ + 2&pi;rh."],
["How do you convert time to rate?","Rate = 1 / time taken."],
["Expected result of the agar investigation?","Rate of diffusion increases as SA:V ratio increases."]]),

L("Investigating transport: beetroot, Visking tubing and potato","Practical methods for membrane permeability, diffusion through Visking tubing, plasmolysis and estimating the water potential of potato tissue.",
`<h4>Permeability of beetroot membranes</h4>
<p>The permeability of cell membranes can be affected by environmental factors such as chemicals or temperature. This can be investigated with beetroot. Pieces cut with a cork borer are placed in water at different temperatures or in different alcohol concentrations.</p>
<p>The red pigment is normally inside the large central vacuole. If membrane permeability increases, the pigment leaks out by diffusion from the high concentration in the vacuoles to the low concentration outside. Normally the partially permeable membranes prevent this. High enough temperatures or alcohol concentrations damage the membrane and disrupt its structure. The colour of the surrounding solution can be measured qualitatively, or quantitatively with a colorimeter or a set of colour standards.</p>
<h4>Plasmolysis in epidermal strips</h4>
<p>Plasmolysis is evidence of osmosis in plant cells. Epidermal strips are placed in a range of molarities of sucrose or sodium chloride solutions. Plants with coloured sap such as red onion bulbs, rhubarb petioles and red cabbage make observations easier. Plasmolysis may take several minutes to occur.</p>
{{AL_42_10_WIDE}}
<h4>Diffusion through Visking tubing</h4>
<p><b>Visking tubing</b> (dialysis tubing) is a non-living partially permeable membrane made of cellulose. Its pores are small enough to stop large molecules such as starch and sucrose but let small molecules such as glucose through by diffusion.</p>
<ol><li>Fill a section of tubing with a mixture of starch and glucose solutions.</li><li>Suspend it in a boiling tube of water for a set time.</li><li>Test the water outside at regular intervals for starch (iodine) and glucose (Benedict's).</li></ol>
<p>The results should show that glucose, but not starch, diffuses out. To make it more quantitative, estimate the glucose in the water at each time interval using the semi-quantitative Benedict's test (a separate tube for each interval), compared with colour standards or a colorimeter. A graph could show how the rate of diffusion changes with the concentration gradient.</p>
{{AL_42_11_WIDE}}
<h4>Estimating water potential in potato tissue</h4>
<p>Immersing plant tissue in solutions of different water potential lets you estimate the water potential of the tissue itself. Cylinders of potato are placed in sucrose solutions of increasing concentration (at least five concentrations).</p>
<ol><li>Cut potato cylinders of the same diameter with a cork borer and trim them to the same length with a scalpel and ruler.</li><li>Blot dry and measure the initial mass of each cylinder.</li><li>Measure 10 cm^3^ of each solution into labelled boiling tubes, one of which is distilled water.</li><li>Add one cylinder to each tube and leave for a set time (e.g. 30 minutes), usually in a water bath at around 30 &deg;C.</li><li>Remove, blot dry and measure the final mass and length.</li></ol>
{{AL_42_19_WIDE}}
{{AL_42_20_WIDE}}
{{AL_42_21_WIDE}}
<div class="key"><b>Controlled variables</b>Cylinder diameter and length, volume of solution, time, temperature. Mention repeats, as they help to show reliability.</div>
<h4>Analysing the potato results</h4>
<p>Calculate the <b>percentage change in mass</b> for each cylinder: (final mass - initial mass) / initial mass x 100. For example, for 0.25 mol/dm^3^: (5.42 - 5.32) / 5.32 x 100 = 1.9%.</p>
{{AL_42_22_WIDE}}
<p>Plot percentage change in mass against sucrose concentration. The point where the line of best fit <b>crosses the x-axis</b> is the concentration of sucrose that has the same water potential as the potato cells, because there is no net movement of water and no change in mass.</p>
{{AL_42_23_WIDE}}
<h4>Interpreting the results</h4>
<ul><li>A <b>positive</b> percentage change means the potato gained water by osmosis: the solution had a higher water potential than the potato. The cells become turgid and the cylinder feels hard.</li><li>A <b>negative</b> percentage change means the solution had a lower water potential. The cylinder in the strongest sucrose loses the most mass and feels floppy (flaccid). Under a microscope, its cells might be plasmolysed.</li></ul>
<div class="key"><b>Examiner tip</b>Osmosis experiments are common. For an unfamiliar one, work out where the higher water potential is and explain which way water moves. Mention the variables controlled and the repeats.</div>`,
I("How could you find the water potential of a potato?",
`<ol><li>Potato cylinders are placed in water and in very strong sugar solution. Predict what happens to the mass of each.</li><li>Suggest what result you would expect for a solution that matches the potato exactly.</li><li>Write down how you could use a graph to find that solution.</li></ol>`,
`<p><b>Potato practical.</b> Prepare five solutions of sucrose (0, 0.25, 0.50, 0.75, 1.00 mol/dm^3^).</p><ol><li>Cut five cylinders of equal length, blot dry and record initial mass.</li><li>Leave each in 10 cm^3^ of a solution for 30 minutes, then blot dry and weigh again.</li><li>Calculate percentage change in mass for each.</li><li>Plot a graph and read the intercept on the x-axis. State what it shows and name two sources of error.</li></ol>`),
[["Explain why beetroot pigment leaks out at high temperature.","High temperature damages the membrane (1) increasing its permeability (1) so pigment diffuses out of the vacuole from high to low concentration (1).",3],
["A potato cylinder has an initial mass of 5.32 g and a final mass of 5.42 g. Calculate the percentage change in mass.","(5.42 - 5.32) / 5.32 x 100 (1) = 1.9% (1).",2],
["Explain how a graph of percentage change in mass against sucrose concentration shows the water potential of the potato.","Where the line crosses the x-axis there is no change in mass (1) so no net movement of water, so the solution has the same water potential as the potato (1).",2],
["Describe what the Visking tubing experiment shows about the sizes of glucose and starch molecules.","Glucose diffuses out (1) but starch does not (1) so glucose molecules are small enough to pass through the pores and starch molecules are too large (1).",3],
["State two variables that must be controlled in the potato investigation.","Any two (1 each): length or diameter of cylinders; volume of solution; time; temperature.",2]],
[M("Where is the red pigment in beetroot cells?",["Cell wall","Vacuole","Nucleus","Ribosomes"],1,"In the large central vacuole."),
M("Visking tubing is",["a living membrane","a non-living partially permeable membrane","impermeable","freely permeable to starch"],1,"It is non-living and partially permeable."),
M("A potato cylinder that gains mass was in a solution with",["higher water potential than the potato","lower water potential than the potato","exactly the same water potential","no water"],0,"Water entered by osmosis."),
N("Initial mass 5.30 g, final mass 5.80 g. What is the percentage change (1 d.p.)?",9.4,"%","(0.50 / 5.30) x 100 = 9.4%.",0.1),
M("Which test shows starch outside the Visking tubing?",["Benedict's","Iodine solution","Biuret","Emulsion"],1,"Iodine turns blue-black with starch."),
T("What is the term for a cell whose protoplast has pulled away from the cell wall?",["plasmolysed","plasmolysis"],"Plasmolysed."),
T("What test is used for glucose outside the tubing?",["benedict's","benedicts","benedict"],"Benedict's test.")],
[["Why does beetroot pigment leak out when heated?","The membrane is damaged so permeability increases."],
["What is Visking tubing?","A non-living partially permeable cellulose membrane."],
["Which molecules pass through Visking tubing?","Small molecules such as glucose, but not large ones like starch."],
["Percentage change in mass formula?","(final mass - initial mass) / initial mass x 100."],
["What does the x-intercept show on the potato graph?","The concentration of sucrose with the same water potential as the potato."],
["What happens to a potato in a lower water potential solution?","It loses water, loses mass and becomes flaccid."],
["Two variables to control in the potato experiment?","Cylinder size, solution volume, time, temperature."],
["Why are repeats done?","To show reliability."]])
];
AL_Q["4.2"]=[
M("Which process moves water from high to low water potential?",["Diffusion of solute","Osmosis","Active transport","Phagocytosis"],1,"Osmosis."),
M("A plant cell in a solution of lower water potential will",["become turgid","plasmolyse","burst","divide"],1,"Water leaves; protoplast pulls away."),
M("Which feature distinguishes active transport from facilitated diffusion?",["Uses carrier proteins","Needs ATP","Is specific","Crosses a membrane"],1,"Active transport needs ATP."),
M("Bulk transport out of a cell is",["endocytosis","exocytosis","osmosis","diffusion"],1,"Exocytosis."),
N("A 2 cm cube has a surface area of 24 cm^2^ and a volume of 8 cm^3^. What is the SA:V ratio (x:1)?",3,"","24 / 8 = 3.",0.01),
T("Name the cell structure that stops a plant cell bursting.",["cell wall"],"The cell wall."),
T("What is the water potential of pure water in kPa?",["0"],"0 kPa."),
M("Where does the exocytosis vesicle come from?",["Nucleus","Golgi body","Mitochondrion","Cell wall"],1,"Golgi body.")
];
AL_P["4.2"]=[
P("Osmosis in potato",7,"<p>Cylinders of potato of the same size were placed in sucrose solutions for 30 minutes. The mass of each was measured before and after.</p><table><tr><th>Sucrose (mol/dm<sup>3</sup>)</th><th>Initial mass (g)</th><th>Final mass (g)</th></tr><tr><td>0.00</td><td>5.30</td><td>5.80</td></tr><tr><td>0.25</td><td>5.32</td><td>5.42</td></tr><tr><td>0.50</td><td>5.29</td><td>5.24</td></tr><tr><td>1.00</td><td>5.29</td><td>5.02</td></tr></table><ol type='a'><li>Calculate the percentage change in mass for 0.50 mol/dm<sup>3</sup> sucrose. [2]</li><li>Explain the change in mass of the cylinder in distilled water. [3]</li><li>Describe how the results could be used to estimate the water potential of the potato. [2]</li></ol>",
["(a) (5.24 - 5.29) / 5.29 x 100 (1) = -0.9% (1).","(b) The solution has a higher water potential than the potato (1) so water enters by osmosis (1) so mass increases (1).","(c) Plot percentage change against concentration (1); read where the line crosses the x-axis (no change in mass) (1)."],"Hub exam-style question (written for this hub), Topic 4"),
P("Surface area to volume ratio",6,"<p>Three agar cubes with sides of 1 cm, 2 cm and 3 cm were placed in acid. The time for the indicator to change colour was measured.</p><ol type='a'><li>Calculate the SA:V ratio of the 3 cm cube. [2]</li><li>Predict which cube changes colour fastest and explain why. [2]</li><li>The 2 cm cube took 100 s to change colour. Calculate the rate of diffusion. [2]</li></ol>",
["(a) Surface area 6 x 9 = 54 cm^2^ and volume 27 cm^3^ (1); ratio 2:1 (1).","(b) 1 cm cube (1) because it has the largest SA:V ratio so shorter diffusion distance to the centre (1).","(c) Rate = 1/time (1) = 0.01 s^-1^ (1)."],"Hub exam-style question (written for this hub), Topic 4"),
P("Types of transport",7,"<p>A pancreatic cell secretes enzymes. A root hair cell takes up nitrate ions from soil with a lower concentration than the cell.</p><ol type='a'><li>Name the process by which pancreatic enzymes are released from the cell. [1]</li><li>Describe how this process works. [3]</li><li>Name the type of transport that moves nitrate ions into the root hair cell and state two features of this process. [3]</li></ol>",
["(a) Exocytosis (1).","(b) Enzymes are packaged into secretory vesicles from the Golgi body (1); vesicles move to and fuse with the cell surface membrane (1); contents released outside the cell (1).","(c) Active transport (1); uses ATP from respiration (1); uses carrier proteins against the concentration gradient (1)."],"Hub exam-style question (written for this hub), Topic 4"),
P("Osmosis and cell types",6,"<p>A red blood cell and a plant cell are each placed in distilled water.</p><ol type='a'><li>Explain why the red blood cell may burst. [3]</li><li>Explain why the plant cell does not burst. [3]</li></ol>",
["(a) Distilled water has a higher water potential than the cell (1); water enters by osmosis (1); there is no cell wall to resist the pressure so the membrane stretches and the cell bursts (1).","(b) Water enters by osmosis (1); the cell wall resists the expanding protoplast, building up pressure (1); this stops more water entering so the cell becomes turgid (1)."],"Hub exam-style question (written for this hub), Topic 4")
];
