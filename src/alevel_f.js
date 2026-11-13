/* ===== Biology 9700 sections 5.1 and 5.2 (alevel_f.js): original diagrams from the supplied notes, figures AL_51_NN and AL_52_NN ===== */
FIGS.AL_51_01=()=>ALF("5.1_f01","DNA is coiled around histone proteins to make chromatin. A chromosome is made of tightly coiled chromatin.","Chromosome showing chromatids, chromatin, and DNA wrapped around histone proteins");
FIGS.AL_51_02=()=>ALF("5.1_f02","Simplified diagram of the structure of a chromosome: two chromatids joined at the centromere, telomeres at the ends, and genes along the DNA.","Chromosome labelled with chromatid, centromere, telomeres and DNA genes");
FIGS.AL_51_03=()=>ALF("5.1_f03","The structure of a chromosome before and after the S phase: one DNA molecule becomes two identical sister chromatids joined at the centromere.","Chromosome before and after DNA replication in S phase, showing histones, supercoiled DNA and sister chromatids");
FIGS.AL_51_04=()=>ALF("5.1_f04","The cell cycle. S = synthesis (of DNA); G = gap; M = mitosis.","Cell cycle pie chart showing G1, S, G2, mitosis and cytokinesis");
FIGS.AL_51_05=()=>ALF("5.1_f05","A telomere with multiple repeat sequences. One strand is rich in guanine (G) and the other in cytosine (C).","Chromosome end showing a telomere with repeated base sequence TTAGGG");
FIGS.AL_51_06=()=>ALF("5.1_f06","Stem cells can be totipotent, pluripotent or multipotent.","Zygote, blastocyst and tissues showing totipotent, pluripotent and multipotent stem cells");
FIGS.AL_51_07=()=>ALF("5.1_f07","Stages in the development of cancer (steps 1 to 4): a carcinogen causes an oncogene, the cell ignores signals to stop dividing and escapes the immune system.","First part of a flow diagram showing a carcinogen causing an oncogene and uncontrolled mitosis");
FIGS.AL_51_08=()=>ALF("5.1_f08","Stages in the development of cancer (steps 5 to 8): rapid mitosis, the tumour grows, gets a blood supply, and malignant cells spread by metastasis.","Second part of the flow diagram showing the tumour growing, gaining a blood supply and metastasis");
FIGS.AL_52_01=()=>ALF("5.2_f01","Prophase","Animal cell in prophase with labelled nuclear envelope, centrosomes, spindle fibres and chromosomes");
FIGS.AL_52_02=()=>ALF("5.2_f02","Metaphase","Animal cell in metaphase with chromosomes lined up on the spindle equator");
FIGS.AL_52_03=()=>ALF("5.2_f03","Anaphase","Animal cell in anaphase with chromatids pulled to opposite poles");
FIGS.AL_52_04=()=>ALF("5.2_f04","Telophase and cytokinesis","Animal cell in telophase with nuclear envelopes reforming and the cell dividing");
FIGS.AL_52_05=()=>ALF("5.2_f05","Micrograph showing a stained root tip. The root tip meristem lies just behind the protective root cap.","Stained root tip showing the root tip meristem and the root cap");
FIGS.AL_52_06=()=>ALF("5.2_f06","Micrograph showing a cell undergoing prophase (P).","Root tip cells with one cell labelled P for prophase");
FIGS.AL_52_07=()=>ALF("5.2_f07","Micrograph showing cells undergoing metaphase (M) and anaphase (A).","Root tip cells with labelled metaphase and anaphase cells");
FIGS.AL_52_08=()=>ALF("5.2_f08","Micrograph showing cells undergoing metaphase (M) and anaphase (A).","Second micrograph of root tip cells with labelled metaphase and anaphase cells");
FIGS.AL_52_09=()=>ALF("5.2_f09","Micrograph showing a cell undergoing anaphase (A).","Root tip micrograph with one cell labelled A for anaphase");

/* ---------- 5.1.1 and 5.1.2: chromosomes and the importance of mitosis ---------- */
const AL_L511=L("Chromosome structure and the importance of mitosis","What a eukaryotic chromosome is made of, how chromatids, sister chromatids and chromosomes differ, and why mitosis matters for growth, repair and asexual reproduction.",
`<h4>Chromosome structure</h4>
<p>In eukaryotic cells a chromosome is made of <b>one very long, condensed DNA molecule</b> associated with proteins. The main proteins are large, positively charged, globular proteins called <b>histones</b>. Their role is to organise and condense the DNA tightly so that it fits into the nucleus. Other proteins present are enzymes used in copying and repairing the DNA.</p>
<p>The tightly coiled combination of DNA and proteins is called <b>chromatin</b>. Chromatin is what chromatids, and therefore chromosomes, are made of.</p>
{{AL_51_01}}
<h4>Chromatids, centromeres and telomeres</h4>
<p>During interphase (S phase) the DNA replicates to create <b>two identical strands of DNA called chromatids</b>, joined together by a narrow region called the <b>centromere</b>. The two chromatids that make up the double structure of a chromosome are known as <b>sister chromatids</b>.</p>
<ul><li>Sister chromatids are identical (they contain the same genes). One chromatid goes into each daughter cell during mitosis, so the daughter cells are genetically identical.</li>
<li>Each chromatid is one very long, condensed DNA molecule made up of a series of <b>genes</b>.</li>
<li>The ends of the chromatids are sealed with protective structures called <b>telomeres</b>.</li></ul>
{{AL_51_02}}
<h4>Chromosomes before and after the S phase</h4>
{{AL_51_03}}
<div class="key"><b>Examiner tip</b>It is important to distinguish when the terms <b>chromatid</b>, <b>sister chromatids</b> and <b>chromosome</b> are used. Before the S phase a chromosome has one DNA molecule. After the S phase it consists of two sister chromatids, each with one DNA molecule.</div>
<h4>The importance of mitosis</h4>
<p>Mitosis is the process of <b>nuclear division</b> by which two genetically identical daughter nuclei are produced that are also genetically identical to the parent nucleus. It is fundamental to many biological processes.</p>
<table><tr><th>Process</th><th>How mitosis is involved</th></tr>
<tr><td>Growth of multicellular organisms</td><td>The two daughter cells are genetically identical (clones) and have the same number of chromosomes as the parent cell. A zygote divides by mitosis to grow into a multicellular organism. Growth may occur across the whole body or be confined to regions such as the meristems (growing points) of plants.</td></tr>
<tr><td>Replacement of cells and repair of tissues</td><td>Damaged tissues are repaired by mitosis followed by cell division. Dying cells are continually replaced by genetically identical cells, particularly rapidly in the skin and the lining of the gut. Some animals can regenerate body parts, for example zebrafish regenerate fins and axolotls regenerate legs and tails.</td></tr>
<tr><td>Asexual reproduction</td><td>A single parent produces genetically identical offspring. Unicellular organisms such as <i>Amoeba</i> divide to reproduce. In multicellular organisms new individuals grow from the parent by cell division and detach (bud off), for example budding in <i>Hydra</i> and yeast, and runners from strawberries.</td></tr></table>`,
I("How do the parts of a chromosome make sure that two identical copies of genetic information are made?",
`<ol><li>Predict why a very long DNA molecule needs proteins before it can fit in a nucleus.</li><li>Predict what would go wrong if the two chromatids were not identical.</li><li>Write down what you think the words centromere and telomere mean.</li></ol>`,
`<p><b>Model a chromosome.</b> Use two pieces of pipe cleaner or thick wool of the same colour and length for the two chromatids, and join them in the middle with a small piece of tape for the centromere.</p><ol><li>Label the chromatids, the centromere and the ends (telomeres).</li><li>Make a second model to show a chromosome <b>before</b> the S phase (one chromatid only) and compare it with the model after the S phase.</li><li>Pull the model apart at the centromere. Explain what you have modelled and how many DNA molecules each part contains.</li><li>State one way in which your model is not accurate (for example, histones are missing).</li></ol>`),
[["State what chromatin is made of.","DNA (1) and proteins / histones (1).",2],
["Explain the role of histones in a chromosome.","Histones are positively charged proteins that bind to DNA (1). They organise and condense / coil the DNA so it fits in the nucleus (1).",2],
["Describe how sister chromatids are formed and why they are identical.","DNA replicates in the S phase of interphase (1). Each chromatid is a copy of the original DNA molecule, so they contain the same genes (1).",2],
["Give three reasons why mitosis is important in a multicellular organism.","Growth (1), replacement of cells and repair of tissues (1), asexual reproduction (1).",3],
["Explain why it matters that the two chromatids of a chromosome are identical when mitosis occurs.","One chromatid goes into each daughter cell (1), so both daughter cells receive the same genetic information / are genetically identical (1).",2]],
[M("Chromatin is made of:",["DNA and histone proteins","RNA and lipids","Cellulose and DNA","Starch and protein"],0,"Chromatin is the tightly coiled combination of DNA and proteins."),
M("What joins two sister chromatids together?",["Telomere","Centromere","Histone","Spindle"],1,"The narrow region is the centromere."),
M("Which statement about histones is correct?",["They are negatively charged lipids","They are positively charged globular proteins","They copy DNA","They seal the ends of chromatids"],1,"Histones are large positively charged globular proteins."),
T("Name the part of a chromosome that protects the end of the DNA.",["telomere","telomeres"],"Telomeres seal the ends of the chromatids."),
M("A human cell nucleus before mitosis (after S phase) contains 46 chromosomes. How many chromatids are present?",["23","46","92","184"],2,"Each chromosome has two sister chromatids: 46 × 2 = 92."),
M("Which is an example of asexual reproduction involving mitosis?",["Runners of strawberries","Fertilisation of an egg","Pollination","Formation of gametes"],0,"Strawberry runners grow by mitosis from a single parent."),
T("What is a genetically identical copy of a cell called?",["clone","a clone"],"The daughter cells are clones."),
M("Which of these would NOT involve mitosis?",["Repair of skin","Growth of a root tip","Budding of Hydra","Making a different DNA sequence in each daughter cell"],3,"Mitosis makes genetically identical cells.")],
[["What is a chromosome made of in eukaryotic cells?","One very long, condensed DNA molecule associated with proteins (histones)."],
["What are histones?","Large, positively charged globular proteins that organise and condense DNA."],
["What is chromatin?","The tightly coiled combination of DNA and proteins that makes up chromatids and chromosomes."],
["What are sister chromatids?","Two identical chromatids (copies of the DNA) joined at the centromere."],
["When are sister chromatids formed?","During the S phase of interphase, when the DNA replicates."],
["What are telomeres?","Protective structures sealing the ends of chromatids."],
["Name three reasons mitosis is important.","Growth, replacement and repair of cells, asexual reproduction."],
["Where does growth occur in plants?","In meristems (growing points)."]]);

/* ---------- 5.1.3: the cell cycle ---------- */
const AL_L512=L("The cell cycle","The regulated sequence of events between one cell division and the next: interphase (G1, S, G2), mitosis and cytokinesis, and what happens in each phase.",
`<h4>The three phases of the cell cycle</h4>
<p>Mitosis is part of a precisely controlled process known as the <b>cell cycle</b>. The cell cycle is the regulated sequence of events that occurs between one cell division and the next. It has three phases: <b>interphase</b>, <b>nuclear division (mitosis)</b> and <b>cell division (cytokinesis)</b>.</p>
<ul><li>The length of the cell cycle varies with environmental conditions, the cell type and the organism. For example, onion root tip cells divide about once every 20 hours, but human intestine epithelial cells divide about once every 10 hours.</li>
<li>The move from one phase to the next is triggered by chemical signals called <b>cyclins</b>.</li></ul>
{{AL_51_04}}
<h4>Interphase</h4>
<p>During interphase the cell increases in mass and size and carries out its normal functions, for example synthesising proteins and replicating its DNA ready for mitosis. <b>Interphase = G<sub>1</sub> + S + G<sub>2</sub></b>.</p>
<table><tr><th>Phase</th><th>What happens</th></tr>
<tr><td>G<sub>1</sub> (gap 1)</td><td>Follows the previous cell division. A signal is received at some point telling the cell to divide again. Cells make the RNA, enzymes and other proteins required for growth.</td></tr>
<tr><td>S (synthesis)</td><td>The DNA in the nucleus replicates, so each chromosome consists of two identical sister chromatids. The S phase is relatively short.</td></tr>
<tr><td>G<sub>2</sub> (gap 2)</td><td>The cell continues to grow. The new DNA is checked and any errors are usually repaired. Other preparations for division are made, for example production of tubulin protein, which is used to make microtubules for the mitotic spindle.</td></tr></table>
<h4>Mitosis and cytokinesis</h4>
<ul><li><b>Nuclear division (M phase):</b> follows interphase. Cell growth stops during the M phase.</li>
<li><b>Cytokinesis:</b> follows the M phase. Once the nucleus has divided into two genetically identical nuclei, the whole cell divides and one nucleus moves into each cell, creating two genetically identical daughter cells. In animal cells cytokinesis involves constriction of the cytoplasm between the two nuclei. In plant cells a new cell wall is formed.</li></ul>
<div class="key"><b>Examiner tip</b>Know the order of the phases and what specifically happens in each. Interphase is itself made up of three stages (G<sub>1</sub>, S and G<sub>2</sub>). An exam question may ask during which stage a cell would be producing the most mRNA and explain why. The answer is G<sub>1</sub>, because protein synthesis is occurring and mRNA is made by transcription, the first part of protein synthesis.</div>`,
I("How can we tell what stage of the cell cycle a cell is in?",
`<ol><li>Look at the cell cycle diagram. Write the order of the phases starting from G<sub>1</sub>.</li><li>Predict what happens to the amount of DNA in a cell during each phase.</li><li>Predict which phase takes the longest in most cells.</li></ol>`,
`<p><b>Sketch the DNA graph.</b> A cell has 10 units of DNA in G<sub>1</sub>.</p><ol><li>Draw axes for DNA amount against time for one complete cell cycle and label G<sub>1</sub>, S, G<sub>2</sub>, mitosis and cytokinesis.</li><li>Sketch what happens to the amount of DNA, giving values.</li><li>Explain each change in your graph using the words replicate and daughter nuclei.</li><li>Swap with a partner and check each other's graphs.</li></ol>`),
[["Name the three phases of the cell cycle.","Interphase (1), nuclear division / mitosis (1), cell division / cytokinesis (1).",3],
["State what happens to the DNA during the S phase.","The DNA replicates / is copied / synthesised (1) so each chromosome has two identical sister chromatids (1).",2],
["State two things that happen in G2.","Any two from: cell continues to grow, new DNA is checked, errors repaired, tubulin / microtubules for the spindle made (2).",2],
["Name the chemical signals that trigger the move from one phase to the next.","Cyclins (1).",1],
["Describe the difference between cytokinesis in an animal cell and in a plant cell.","Animal: constriction of the cytoplasm between the two nuclei (1). Plant: a new cell wall is formed (1).",2]],
[M("Which phase of the cell cycle is the 'synthesis' phase?",["G1","S","G2","M"],1,"S stands for synthesis of DNA."),
M("During which phase would a cell make the most mRNA for growth proteins?",["G1","S","M","Cytokinesis"],0,"Protein synthesis and mRNA production occur in G1."),
T("What are the chemical signals that control the cell cycle called?",["cyclins","cyclin"],"Cyclins."),
M("Interphase is made up of:",["G1, S and M","G1, S and G2","S, G2 and M","G1, M and cytokinesis"],1,"Interphase = G1 + S + G2."),
M("Tubulin is made in G2 because it is needed to make:",["The cell wall","The mitotic spindle microtubules","Histones","Telomeres"],1,"Tubulin forms microtubules of the spindle."),
M("Which phase of the cell cycle is relatively short?",["G1","S","Interphase overall","Mitosis is longer than interphase"],1,"The S phase is relatively short."),
M("What happens in plant cells during cytokinesis?",["Constriction of cytoplasm","A new cell wall forms","DNA replicates","Spindle forms"],1,"Plant cells form a new cell wall."),
M("Onion root tip cells divide about once every:",["10 hours","20 hours","2 hours","100 hours"],1,"About 20 hours, compared with about 10 hours for human gut epithelial cells.")],
[["What are the three phases of the cell cycle?","Interphase, nuclear division (mitosis), cell division (cytokinesis)."],
["What is interphase made of?","G1, S and G2."],
["What happens in G1?","The cell grows and makes RNA, enzymes and other proteins."],
["What happens in the S phase?","DNA replicates, so each chromosome has two sister chromatids."],
["What happens in G2?","The cell grows, the new DNA is checked and errors are repaired, and tubulin is made for the spindle."],
["What triggers movement between phases?","Chemical signals called cyclins."],
["What happens to growth during the M phase?","Cell growth stops."],
["What does cytokinesis involve in animal and plant cells?","Animal: cytoplasm constricts between nuclei. Plant: a new cell wall forms."]]);

/* ---------- 5.1.4 and 5.1.5: telomeres and stem cells ---------- */
const AL_L513=L("Telomeres and stem cells","How telomeres protect genes during DNA replication, and how stem cells differ in their potency.",
`<h4>The significance of telomeres</h4>
<p>The ends of the chromatids are sealed with protective structures called <b>telomeres</b>. They are made of <b>non-coding DNA</b> (DNA that does not contain genes) with short base sequences repeated many times (multiple repeat sequences). In telomeres one strand is rich in the base guanine (G) and the other strand is rich in the complementary base cytosine (C).</p>
{{AL_51_05}}
<h4>Why telomeres are needed</h4>
<ul><li>The copying enzyme responsible for DNA replication cannot run right to the very end of the DNA molecule and stops a little short of the end.</li>
<li>If this end part contained an important gene, that genetic information would be lost during replication, and a little more would be lost in each later division.</li>
<li>Telomeres act as a <b>buffer region of non-essential DNA</b> so no important coding sections near the ends are left out of replication. No genes are lost during cell division (loss of vital genes can even result in cell death) and the cell can continue to replicate.</li>
<li>Most cells have an enzyme called <b>telomerase</b> that adds bases to the telomeres to top them up.</li>
<li>Some cells (generally specialised cells) do not have telomerase, so after a certain number of divisions the cell dies. This has been connected with the ageing process.</li></ul>
<div class="key"><b>Examiner tip</b>Telomeres are made of the same nucleotides as coding DNA, but their base sequences are non-coding: they do not code for proteins.</div>
<h4>The significance of stem cells</h4>
<p>A <b>stem cell</b> is a cell that can divide (by mitosis) an unlimited number of times. Each new cell has the potential to remain a stem cell or to develop into a specialised cell such as a blood cell or a muscle cell, by a process called <b>differentiation</b>. The ability of stem cells to differentiate into more specialised cell types is known as <b>potency</b>.</p>
{{AL_51_06}}
<table><tr><th>Type of potency</th><th>Description</th></tr>
<tr><td>Totipotent</td><td>Can differentiate into any cell type found in an embryo as well as extra-embryonic cells (the cells that make up the placenta). The zygote is totipotent, as are embryonic cells up to the 16-cell stage of human embryo development.</td></tr>
<tr><td>Pluripotent</td><td>Embryonic stem cells that can differentiate into any cell type found in an embryo but not into extra-embryonic cells (the placenta).</td></tr>
<tr><td>Multipotent</td><td>Adult stem cells that have lost some of the potency of embryonic stem cells and are no longer pluripotent. They can produce only a limited range of cell types.</td></tr></table>
<h4>Multipotent adult stem cells</h4>
<ul><li>As tissues and organs develop, cells become more specialised. Most adult cells gradually lose the ability to divide.</li>
<li>Small numbers of adult stem cells remain to produce new cells for growth, cell replacement and tissue repair. They can divide an unlimited number of times but are <b>multipotent</b>.</li>
<li>For example, stem cells in bone marrow can only differentiate into blood cells (red blood cells, monocytes, neutrophils and lymphocytes). Adult stem cells are found in the bone marrow, skin, gut, heart and brain.</li>
<li>Research is being carried out on <b>stem cell therapy</b>: introducing adult stem cells into damaged tissue to treat diseases (for example leukaemia) and injuries (for example skin burns).</li></ul>
<div class="key"><b>Examiner tip</b>Learn the three levels of potency and the range of cell types for each. Adult stem cells can still divide any number of times, but they can form only a limited range of specialised cells because they have already partly differentiated.</div>`,
I("Why do some cells stop dividing while stem cells keep going?",
`<ol><li>Predict what would happen to a cell's genes if each replication lost a little DNA from the ends.</li><li>Predict which cells in your body need to divide many times.</li><li>Write down what you think the word potency means.</li></ol>`,
`<p><b>Telomere shortening model.</b> Write a gene sequence on a strip of paper (for example ten letters), with a block of repeated TTAGGG at each end.</p><ol><li>Cut off a small piece from each end to model one round of replication that stops short of the end. Repeat several times.</li><li>Count how many repeats remain after each cut and note when the first gene would be damaged.</li><li>Add 'telomerase' by taping on extra repeats and describe what difference it makes.</li><li>Explain why this matters for cells without telomerase and link it to ageing.</li></ol><p>Then sort the following into totipotent, pluripotent or multipotent: zygote, 8-cell embryo, inner mass of blastocyst, bone marrow stem cell.</p>`),
[["State what telomeres are made of and describe how their DNA sequence is arranged.","Non-coding DNA (1) with short base sequences repeated many times (1).",2],
["Explain why telomeres are needed at the ends of chromatids.","The enzyme copying DNA cannot reach the very end (1) so the telomere acts as a buffer of non-essential DNA (1) and no genes are lost (1).",3],
["Explain why a cell without telomerase can divide only a limited number of times.","Telomeres get shorter with each division (1) until genes would be lost (1) and the cell dies (1).",3],
["Distinguish between a totipotent and a pluripotent stem cell.","Totipotent can differentiate into any cell type including extra-embryonic / placenta cells (1). Pluripotent can form any embryo cell type but not placenta cells (1).",2],
["Explain why bone marrow stem cells are described as multipotent.","They can divide an unlimited number of times (1) but can only differentiate into a limited range of cell types / blood cells (1).",2]],
[M("What is the function of telomerase?",["It copies DNA","It adds bases to telomeres","It makes histones","It destroys cancer cells"],1,"Telomerase tops up the telomeres."),
M("Telomeres contain:",["Genes for proteins","Non-coding repeated DNA","RNA","Histones only"],1,"They are non-coding multiple repeat sequences."),
M("The zygote is:",["Totipotent","Pluripotent","Multipotent","Not a stem cell"],0,"A zygote can form any embryonic and extra-embryonic cell."),
M("Which cells can form blood cells only?",["Totipotent cells","Pluripotent cells","Bone marrow stem cells","Zygotes"],2,"Bone marrow stem cells are multipotent."),
T("What is the term for the ability of stem cells to form specialised cell types?",["potency"],"Potency."),
M("Cells that lack telomerase and cannot top up telomeres are linked to:",["Ageing","Faster mitosis","Photosynthesis","Higher potency"],0,"Loss of telomere length is connected with ageing."),
M("Which cells make up the placenta?",["Extra-embryonic cells","Multipotent cells","Bone marrow cells","Nerve cells"],0,"Totipotent cells can form extra-embryonic cells such as the placenta."),
M("Stem cell therapy introduces adult stem cells to:",["Damaged tissue","The nucleus","The cell wall","Healthy tissue only"],0,"Used to treat diseases such as leukaemia and injuries such as burns.")],
[["What are telomeres made of?","Non-coding DNA with short base sequences repeated many times."],
["Why are telomeres needed?","The DNA copying enzyme stops short of the end, so telomeres buffer against loss of genes."],
["What does telomerase do?","Adds bases to telomeres."],
["What is a stem cell?","A cell that can divide by mitosis an unlimited number of times."],
["What is potency?","The ability of stem cells to differentiate into more specialised cell types."],
["Which cells are totipotent?","The zygote and embryonic cells up to the 16-cell stage."],
["What is a pluripotent stem cell?","An embryonic cell that can form any embryo cell type but not extra-embryonic (placenta) cells."],
["What is a multipotent stem cell?","An adult stem cell that can form only a limited range of cell types."]]);

/* ---------- 5.1.6: tumours ---------- */
const AL_L514=L("How tumours form","Why precisely controlled mitosis matters: how mutations in genes that control cell division lead to tumours, the difference between benign and malignant tumours, and metastasis.",
`<h4>Uncontrolled mitosis</h4>
<p>Cancers show how important it is that cell division is precisely controlled, because cancers arise from <b>uncontrolled mitosis</b>. Cancerous cells divide repeatedly and uncontrollably, forming a <b>tumour</b> (an irregular mass of cells).</p>
<ul><li>Cancers start when changes occur in the genes that control cell division. A change in any gene is called a <b>mutation</b>. A mutated gene that causes cancer is called an <b>oncogene</b>.</li>
<li>Mutations are common and do not lead to cancer most of the time. Most mutations either result in early cell death or in the cell being destroyed by the body's immune system. As most cells are easily replaced, this usually has no harmful effect.</li>
<li>The mutations that produce cancerous cells do <b>not</b> lead to early cell death or destruction by the immune system, so the harmful mutation is passed on to all of that cell's descendants.</li>
<li>A typical tumour contains around a thousand million cancerous cells by the time it is detected.</li></ul>
<h4>Carcinogens</h4>
<p>A <b>carcinogen</b> is any agent that may cause cancer, for example UV light, tar in tobacco smoke and X-rays. An agent that causes cancer is described as <b>carcinogenic</b>.</p>
<div class="key"><b>Examiner tip</b>Know examples of carcinogens. Some viruses (oncoviruses) cause cancer and can therefore also be described as carcinogens.</div>
<h4>Stages in the development of cancer</h4>
{{AL_51_07}}
{{AL_51_08}}
<h4>Benign and malignant tumours</h4>
<table><tr><th>Benign tumour</th><th>Malignant tumour</th></tr>
<tr><td>Does not spread from its original site (for example warts).</td><td>Spreads through the body, invading and destroying other tissues, and causes cancer.</td></tr>
<tr><td>Does not cause cancer.</td><td>Interferes with the normal functioning of the organ or tissue in which it grows, for example by blocking the intestines, lungs or blood vessels.</td></tr></table>
<h4>Metastasis</h4>
<p>Malignant tumour cells can break off the tumour and travel through the blood and / or lymphatic system to form <b>secondary growths</b> in other parts of the body. The spreading of cancers in this way is called <b>metastasis</b>. It is very dangerous because secondary cancers can be very difficult to detect, locate and remove.</p>`,
I("What goes wrong in the cell cycle in cancer?",
`<ol><li>Write down what you already know about causes of cancer.</li><li>Predict what would happen if a cell ignored the signals that tell it to stop dividing.</li><li>List agents you think can damage DNA.</li></ol>`,
`<p><b>Number sequence and explain.</b> Use the cancer development diagram. Cut the eight stages apart (or list them) and put them in order.</p><ol><li>Write one sentence for each stage using the words mutation, oncogene, mitosis, immune system, metastasis.</li><li>Colour the steps where the cell escapes a safeguard.</li><li>Make a two-column table comparing benign and malignant tumours.</li><li>Explain why a malignant tumour is more dangerous than a benign tumour.</li></ol>`),
[["Define the term carcinogen and give two examples.","An agent that may cause cancer (1). Any two from UV light, tar in tobacco smoke, X-rays, asbestos, some viruses (1).",2],
["Explain what is meant by an oncogene.","A mutated / changed gene (1) that controls cell division and causes cancer (1).",2],
["Explain why most mutations do not lead to cancer.","Most result in early cell death (1) or the cell is destroyed by the immune system (1).",2],
["Describe two differences between a benign and a malignant tumour.","Benign does not spread but malignant spreads to other tissues (1). Benign does not cause cancer but malignant does / invades and destroys tissue (1).",2],
["Describe metastasis and explain why it is dangerous.","Cells break off a malignant tumour and spread in blood / lymph to form secondary growths (1). It is difficult to detect, locate and remove them (1).",2]],
[M("An agent that may cause cancer is called a:",["Carcinogen","Oncogene","Stem cell","Telomere"],0,"Carcinogens may cause cancer."),
M("A mutated gene that causes cancer is a(n):",["Oncogene","Histone","Cyclin","Chromatid"],0,"It is an oncogene."),
M("A tumour that does not spread from its original site is:",["Malignant","Benign","Metastatic","Secondary"],1,"Benign tumours do not spread (for example warts)."),
T("What is the spread of cancer cells to form secondary growths called?",["metastasis"],"Metastasis."),
M("Which is an example of a carcinogen?",["UV light","Glucose","Oxygen","Water"],0,"UV light, tar and X-rays are carcinogens."),
M("Cancer arises because of:",["Controlled mitosis","Uncontrolled mitosis","Meiosis only","Lack of cell division"],1,"Cancers arise from uncontrolled mitosis."),
M("Malignant tumour cells spread via the:",["Blood and lymphatic system","Nervous system only","Xylem","Cell wall"],0,"They travel in blood and / or lymph."),
M("A typical tumour at detection contains about:",["A thousand cells","A million cells","A thousand million cells","One cell"],2,"Around a thousand million cancerous cells.")],
[["What is a tumour?","An irregular mass of cells formed by uncontrolled mitosis."],
["What is a mutation?","A change in a gene."],
["What is an oncogene?","A mutated gene that causes cancer."],
["What is a carcinogen?","An agent that may cause cancer (for example UV light, tar in tobacco smoke, X-rays)."],
["What are oncoviruses?","Viruses that cause cancer."],
["What is a benign tumour?","A tumour that does not spread from its original site and does not cause cancer."],
["What is a malignant tumour?","A tumour that spreads, invading and destroying other tissues, and causes cancer."],
["What is metastasis?","The spread of cancer cells to form secondary growths elsewhere in the body."]]);

AL_L["5.1"]=[AL_L511,AL_L512,AL_L513,AL_L514];
AL_Q["5.1"]=[
M("Which structure holds two sister chromatids together?",["Centromere","Telomere","Histone","Spindle fibre"],0,"The centromere."),
M("A cell in G1 has 46 chromosomes. How many DNA molecules does it have?",["23","46","92","184"],1,"One DNA molecule per chromosome before S phase."),
M("A human cell has 46 chromosomes. In G2 how many DNA molecules?",["23","46","92","184"],2,"After S phase each chromosome has two sister chromatids: 92 DNA molecules."),
T("Which phase of interphase follows the S phase?",["g2","g 2","gap 2","g<sub>2</sub>"],"G2 follows S."),
M("Telomerase is an enzyme that:",["Adds bases to the ends of chromosomes","Cuts DNA","Makes spindle fibres","Causes cancer"],0,"It tops up telomeres."),
M("Which cells are totipotent?",["Zygote","Bone marrow stem cell","Skin cell","Red blood cell"],0,"The zygote is totipotent."),
M("Which statement about malignant tumours is correct?",["They never spread","They can metastasise","They have no mitosis","They contain no DNA"],1,"Malignant tumours spread by metastasis."),
M("Mitosis produces cells that are:",["Genetically identical","Genetically different","Haploid","Always stem cells"],0,"Identical to each other and to the parent.")];
AL_P["5.1"]=[
P("Chromosome structure",7,"<p>The diagram in the notes shows a chromosome before and after the S phase.</p><ol type='a'><li>State what a chromosome is made of in a eukaryotic cell. [2]</li><li>Describe the role of histones. [2]</li><li>Describe what happens to a chromosome during the S phase. [2]</li><li>Name the structure that joins the two chromatids. [1]</li></ol>",
["(a) DNA (1) and proteins / histones (1).","(b) Positively charged proteins that bind DNA (1) and condense / organise it so it fits in the nucleus (1).","(c) The DNA replicates (1) to form two identical sister chromatids (1).","(d) Centromere (1)."],"Hub exam-style question (written for this hub), Topic 5"),
P("The cell cycle",7,"<p>The table shows the mean amount of DNA in a nucleus of a cell during one cell cycle.</p><table><tr><th>Time (hours)</th><th>0</th><th>3</th><th>6</th><th>8</th><th>10</th><th>12</th><th>14</th><th>16</th></tr><tr><td>DNA (arbitrary units)</td><td>10</td><td>10</td><td>10</td><td>15</td><td>20</td><td>20</td><td>20</td><td>10</td></tr></table><ol type='a'><li>Name the phase of the cell cycle between 6 and 10 hours and give the evidence from the table. [2]</li><li>Explain why the amount of DNA falls from 20 to 10 units between 14 and 16 hours. [2]</li><li>State two events that occur in G<sub>2</sub>. [2]</li><li>Name the chemical signals that control the move from one phase to the next. [1]</li></ol>",
["(a) S phase (1). The DNA amount rises / doubles from 10 to 20 units (1).","(b) The nucleus divides by mitosis (1) so each daughter nucleus gets one set / half of the DNA (1).","(c) Any two from: cell continues to grow, new DNA is checked, errors repaired, tubulin made for the spindle (2).","(d) Cyclins (1)."],"Hub exam-style question (written for this hub), Topic 5"),
P("Stem cells, telomeres and tumours",8,"<p>Stem cells and telomeres are important in cell division.</p><ol type='a'><li>Explain why telomeres are needed at the ends of chromosomes. [2]</li><li>Suggest why a specialised cell without telomerase can divide only a limited number of times. [2]</li><li>Compare totipotent and multipotent stem cells. [2]</li><li>Describe how a mutation in a gene can lead to a malignant tumour that spreads to other organs. [2]</li></ol>",
["(a) The DNA copying enzyme stops short of the end (1) so telomeres act as a buffer and no genes are lost (1).","(b) Telomeres become shorter with each division (1) until genes are lost / the cell dies (1).","(c) Totipotent cells can form any cell type including the placenta (1) whereas multipotent cells can form only a limited range of cell types (1).","(d) A mutated gene / oncogene causes uncontrolled mitosis (1). Malignant cells break off and spread in blood / lymph (metastasis) forming secondary growths (1)."],"Hub exam-style question (written for this hub), Topic 5"),
P("Cancer and its development",6,"<p>The notes describe the stages in the development of cancer.</p><ol type='a'><li>Define the term carcinogen and give two examples. [2]</li><li>Explain why most mutations do not lead to cancer. [2]</li><li>State two differences between a benign tumour and a malignant tumour. [2]</li></ol>",
["(a) An agent that may cause cancer (1). Any two from UV light, tar in tobacco smoke, X-rays, asbestos, oncoviruses (1).","(b) Most cause early cell death (1) or the cell is destroyed by the immune system (1).","(c) Benign tumours do not spread / malignant tumours spread (1). Benign tumours do not cause cancer / malignant ones invade and destroy other tissues (1)."],"Hub exam-style question (written for this hub), Topic 5")];

/* ---------- 5.2.1: the stages of mitosis ---------- */
const AL_L521=L("The stages of mitosis","The four stages of mitosis (prophase, metaphase, anaphase, telophase), what happens to the chromosomes, spindle and nuclear envelope at each stage, and how to remember the order.",
`<h4>Mitosis: the four stages</h4>
<p>Mitosis is nuclear division by which two genetically identical daughter nuclei are produced, with the same number of chromosomes as the parent nucleus. Although mitosis is one continuous process, it is divided into four main stages: <b>prophase, metaphase, anaphase and telophase</b> (remember <b>PMAT</b>).</p>
<p>Humans have 46 chromosomes, but the diagrams show an animal cell with only four chromosomes for simplicity. The different colours show that half of the chromosomes come from the female parent and half from the male parent.</p>
<h4>Prophase</h4>
<ul><li>Chromosomes condense and become visible when stained.</li>
<li>Each chromosome consists of two identical <b>sister chromatids</b> (each containing one DNA molecule) joined at the centromere.</li>
<li>The two centrosomes (replicated in G<sub>2</sub>, just before prophase) move towards opposite poles of the nucleus.</li>
<li>Spindle fibres (protein microtubules) begin to emerge from the centrosomes (a centrosome consists of two centrioles in animal cells).</li>
<li>The nuclear envelope breaks down into small vesicles.</li></ul>
{{AL_52_01}}
<h4>Metaphase</h4>
<ul><li>Centrosomes reach opposite poles and spindle fibres continue to extend.</li>
<li>Chromosomes line up at the <b>equator</b> of the spindle (the metaphase plate), equidistant from the two poles.</li>
<li>Spindle fibres reach the chromosomes and attach to the centromeres. Each sister chromatid is attached to a spindle fibre originating from opposite poles.</li></ul>
{{AL_52_02}}
<h4>Anaphase</h4>
<ul><li>The sister chromatids separate at the centromere (the centromere divides in two).</li>
<li>The spindle fibres begin to shorten.</li>
<li>The separated sister chromatids (now called chromosomes) are pulled to opposite poles by the spindle fibres.</li></ul>
{{AL_52_03}}
<h4>Telophase</h4>
<ul><li>Chromosomes arrive at opposite poles and begin to decondense.</li>
<li>Nuclear envelopes begin to reform around each set of chromosomes.</li>
<li>The spindle fibres break down.</li>
<li>Cytokinesis then divides the cell. The centrosome will replicate itself during interphase before the next division.</li></ul>
{{AL_52_04}}
<div class="key"><b>Exam tip</b>Learn the four stages and what is happening to the DNA molecules at each (one chromatid contains one DNA molecule). Before mitosis, after the S phase, a human parent cell nucleus contains <b>92 DNA molecules</b>: the 46 molecules replicated to form sister chromatids. This ensures each daughter cell is diploid (46 chromosomes) after mitosis. Read the question carefully, because only human diploid cells have 46 chromosomes.</div>`,
I("How do chromosomes behave during mitosis so that two identical nuclei are formed?",
`<ol><li>Write the four stages in order. Use PMAT to help.</li><li>Predict what the spindle fibres do.</li><li>Predict how many chromosomes each daughter cell should receive.</li></ol>`,
`<p><b>Model mitosis with four chromosomes.</b> Use pipe cleaners (two colours, long and short pairs) and string for spindle fibres. A cell with four chromosomes (2n = 4).</p><ol><li>Make four chromosomes each with two chromatids (as after the S phase).</li><li>Place them for prophase, metaphase, anaphase and telophase on a large circle drawn on paper. Photograph or draw each stage.</li><li>At each stage record how many chromosomes, chromatids and DNA molecules there are.</li><li>Explain why the two daughter cells are genetically identical.</li></ol>`),
[["State the four stages of mitosis in order.","Prophase (1), metaphase (1), anaphase (1), telophase (1).",4],
["Describe what happens to the nuclear envelope during prophase and telophase.","It breaks down into small vesicles in prophase (1) and reforms around each set of chromosomes in telophase (1).",2],
["Describe the position of the chromosomes and the attachment of spindle fibres in metaphase.","Chromosomes line up at the equator / metaphase plate (1). Spindle fibres attach to the centromeres, one chromatid to each pole (1).",2],
["Describe what happens in anaphase.","Centromeres divide / sister chromatids separate (1). Spindle fibres shorten (1) and pull chromatids / chromosomes to opposite poles (1).",3],
["A human cell nucleus has 46 chromosomes. State the number of DNA molecules in the nucleus at prophase and explain your answer.","92 (1). The DNA replicated in the S phase so each chromosome has two chromatids, each with one DNA molecule (1).",2]],
[M("In which stage do chromosomes line up at the equator of the spindle?",["Prophase","Metaphase","Anaphase","Telophase"],1,"Metaphase."),
M("In which stage do the sister chromatids separate?",["Prophase","Metaphase","Anaphase","Telophase"],2,"Anaphase."),
M("The nuclear envelope reforms during:",["Prophase","Metaphase","Anaphase","Telophase"],3,"Telophase."),
T("Which stage of mitosis does the letter P in PMAT stand for?",["prophase"],"Prophase, metaphase, anaphase, telophase."),
M("Spindle fibres are made of:",["Protein microtubules","Cellulose","DNA","Lipid"],0,"Protein microtubules."),
N("A human cell has 46 chromosomes. How many DNA molecules are in the nucleus after the S phase and before mitosis?",92,"","46 × 2 = 92.",0),
M("Chromosomes begin to decondense in:",["Prophase","Metaphase","Anaphase","Telophase"],3,"Telophase."),
M("To which part of a chromosome do spindle fibres attach?",["Telomere","Centromere","Histone","Nucleolus"],1,"The centromere.")],
[["What are the four stages of mitosis?","Prophase, metaphase, anaphase, telophase (PMAT)."],
["What happens in prophase?","Chromosomes condense; centrosomes move to the poles; spindle forms; nuclear envelope breaks down."],
["What happens in metaphase?","Chromosomes line up at the equator; spindle fibres attach to the centromeres."],
["What happens in anaphase?","Centromeres divide; spindle fibres shorten and pull sister chromatids to opposite poles."],
["What happens in telophase?","Chromosomes decondense; nuclear envelopes reform; spindle breaks down."],
["What is a centrosome made of in animal cells?","Two centrioles."],
["What is the metaphase plate?","The equator of the spindle where chromosomes line up."],
["How many DNA molecules are in a human nucleus after S phase?","92."]]);

/* ---------- 5.2.2: observing mitosis ---------- */
const AL_L522=L("Observing mitosis in root tips","Using root tip meristems and the squash technique to see mitosis, identifying the stages from micrographs, and calculating a mitotic index.",
`<h4>Mitosis in root tips</h4>
<p>Growth in plants occurs in specific regions called <b>meristems</b>. The root tip meristem, found just behind the protective root cap, contains a zone of cell division with cells undergoing mitosis. Pre-prepared slides of root tips can be studied, or temporary slides can be made using the <b>squash technique</b>: the root tips are stained and then gently squashed, spreading the cells out into a thin sheet so individual dividing cells are clearly seen.</p>
{{AL_52_05}}
<h4>Method</h4>
<ol><li>Garlic or onion (<i>Allium cepa</i>) root tips are most commonly used. The bulbs can be encouraged to grow roots by suspending them over water for a week or two.</li>
<li>Remove the tips of the roots (about 1 cm) and place them in a suitable stain, for example warm, acidified acetic orcein, which stains chromosomes deep purple.</li>
<li>Gently squash the stained root tip on a glass slide using a blunt instrument, for example the handle of a mounting needle.</li>
<li>Observe under the microscope. Drawings can be annotated to show the different stages of mitosis.</li></ol>
<h4>Analysis: identifying the stages</h4>
<p>Look for the features that identify each stage: condensed chromosomes with no clear nuclear envelope (prophase), chromosomes lined up across the middle of the cell (metaphase), V-shaped chromatids pulled to opposite poles (anaphase).</p>
{{AL_52_06}}
{{AL_52_07}}
{{AL_52_08}}
{{AL_52_09}}
<div class="key"><b>Exam tip</b>You must be able to recognise each mitotic stage from micrographs and explain <b>why</b> the cell is in the stage you have chosen, using the position and shape of the chromosomes.</div>
<h4>Counting cells: the mitotic index (extension)</h4>
<p>The notes do not cover this calculation, but it is part of the practical work in the syllabus. The proportion of cells seen in each stage reflects how long that stage lasts, so counting cells gives a measure of how fast tissue is dividing.</p>
<p><b>Mitotic index = number of cells in mitosis ÷ total number of cells observed</b></p>
<div class="ex"><b>Worked example</b>In a field of view 200 cells are counted. 40 cells are in prophase, metaphase, anaphase or telophase and 160 are in interphase.<br>Mitotic index = 40 ÷ 200 = 0.2 (or 20%). Interphase is the longest stage because most cells (160 of 200) are in interphase.</div>`,
I("How can we recognise the stages of mitosis in real cells?",
`<ol><li>Write down the features that identify each stage.</li><li>Predict which stage you will see most often in a root tip and explain why.</li><li>Predict where in the root the dividing cells will be found.</li></ol>`,
`<p><b>Root tip squash (follow your teacher's safety instructions).</b> Use an onion bulb grown over water, or prepared slides.</p><ol><li>Cut about 1 cm from a root tip, stain it (acetic orcein) and squash it on a slide under a coverslip.</li><li>Find a cell in each stage of mitosis and make labelled drawings.</li><li>Count 100 cells in a field of view and tally the stage of each.</li><li>Calculate the mitotic index. Pool the class data and explain any differences.</li></ol><p>Acetic orcein and acids are hazardous. Wear eye protection and avoid skin contact.</p>`),
[["Explain why the root tip is used to observe mitosis.","The root tip meristem (1) contains actively dividing cells (1).",2],
["Describe how the squash technique helps you see individual cells.","The stained root tip is gently squashed (1) spreading the cells into a thin sheet / one layer (1).",2],
["Name a stain used to show chromosomes in root tips and state the colour of the chromosomes.","Acetic orcein (1) deep purple (1).",2],
["A student counts 150 cells in a root tip. 30 are in mitosis. Calculate the mitotic index.","30 ÷ 150 (1) = 0.2 (1).",2],
["Describe how you would recognise a cell in anaphase in a micrograph.","Sister chromatids / chromosomes separated (1) and moving / pulled to opposite poles (1).",2]],
[M("In which part of a root does mitosis mainly occur?",["Root cap","Meristem","Root hair zone","Xylem"],1,"The root tip meristem."),
M("Which stain is used in the root tip squash?",["Acetic orcein","Iodine","Benedict's solution","Biuret"],0,"Acetic orcein stains chromosomes deep purple."),
M("Why are the root tips squashed?",["To kill the cells","To spread cells into a thin layer","To make chromosomes","To stain them blue"],1,"A thin sheet lets individual cells be seen."),
N("In a root tip 200 cells are counted and 50 are in mitosis. What is the mitotic index?",0.25,"","50 ÷ 200 = 0.25.",0),
M("A cell has chromosomes lined up across its middle. The stage is:",["Prophase","Metaphase","Anaphase","Telophase"],1,"Metaphase."),
M("Most cells in a root tip are seen in:",["Prophase","Interphase","Anaphase","Telophase"],1,"Interphase is the longest stage."),
T("Name the plant growth regions where cell division occurs.",["meristem","meristems"],"Meristems."),
M("The root tip meristem lies:",["At the root cap","Just behind the root cap","In the leaf","Near the stem"],1,"Just behind the protective root cap.")],
[["What is a meristem?","A region of a plant where cell division occurs (growing point)."],
["Where is the root tip meristem?","Just behind the protective root cap."],
["What plant is commonly used to observe mitosis?","Onion or garlic (Allium cepa) root tips."],
["What does acetic orcein do?","Stains chromosomes deep purple."],
["Why do you squash the root tip?","To spread the cells into a thin sheet so individual cells can be seen."],
["How do you recognise metaphase?","Chromosomes lined up at the equator of the cell."],
["How do you recognise anaphase?","Sister chromatids separated and moving to opposite poles."],
["What is the mitotic index?","Cells in mitosis divided by the total number of cells counted."]]);

AL_L["5.2"]=[AL_L521,AL_L522];
AL_Q["5.2"]=[
M("What is the correct order of the stages of mitosis?",["Prophase, anaphase, metaphase, telophase","Prophase, metaphase, anaphase, telophase","Metaphase, prophase, anaphase, telophase","Telophase, prophase, metaphase, anaphase"],1,"PMAT."),
M("What separates at the centromere in anaphase?",["Sister chromatids","Homologous chromosomes","Centrosomes","Spindle fibres"],0,"Sister chromatids separate."),
M("What happens to the nuclear envelope in prophase?",["It breaks down","It reforms","It doubles","It thickens"],0,"It breaks down into small vesicles."),
T("What is the metaphase plate also called?",["equator","the equator","spindle equator"],"The equator of the spindle."),
N("A cell has 46 chromosomes. How many chromosomes does each daughter nucleus have after mitosis?",46,"","Mitosis keeps the chromosome number the same.",0),
M("Which stain colours chromosomes purple in a root tip?",["Acetic orcein","Iodine","Methylene blue","Eosin"],0,"Acetic orcein."),
N("30 cells in mitosis out of 120 observed. Mitotic index?",0.25,"","30 ÷ 120 = 0.25.",0),
M("In telophase:",["Chromosomes line up","Nuclear envelopes reform","Chromosomes condense","Centromeres divide"],1,"Nuclear envelopes reform around each set of chromosomes.")];
AL_P["5.2"]=[
P("Stages of mitosis",8,"<p>Mitosis has four main stages.</p><ol type='a'><li>Name the stages in the correct order. [2]</li><li>State what happens to the nuclear envelope in prophase. [1]</li><li>Describe the behaviour of the chromosomes in metaphase and anaphase. [3]</li><li>A human cell has 46 chromosomes. State the number of DNA molecules in the nucleus in prophase and explain your answer. [2]</li></ol>",
["(a) Prophase, metaphase, anaphase, telophase (2). Deduct 1 for each error.","(b) It breaks down into vesicles (1).","(c) Metaphase: chromosomes line up at the equator attached to spindle fibres at the centromeres (1). Anaphase: centromeres divide / sister chromatids separate (1) and are pulled to opposite poles by shortening spindle fibres (1).","(d) 92 (1) because DNA replicated in S phase so each chromosome has two chromatids (1)."],"Hub exam-style question (written for this hub), Topic 5"),
P("Root tip counts and mitotic index",7,"<p>A student prepared a root tip squash and counted the cells in a field of view.</p><table><tr><th>Stage</th><th>Interphase</th><th>Prophase</th><th>Metaphase</th><th>Anaphase</th><th>Telophase</th></tr><tr><td>Number of cells</td><td>160</td><td>24</td><td>6</td><td>4</td><td>6</td></tr></table><ol type='a'><li>Calculate the total number of cells counted and the mitotic index. [2]</li><li>State which stage of the cell cycle lasts longest and explain your answer. [2]</li><li>Explain why the student used a root tip rather than part of the mature root. [2]</li><li>Name a stain suitable for showing the chromosomes. [1]</li></ol>",
["(a) 200 (1) and 40 ÷ 200 = 0.2 (1).","(b) Interphase (1) because most of the cells (160 of 200) are in that stage (1).","(c) The root tip contains the meristem (1) where cells are actively dividing by mitosis (1).","(d) Acetic orcein (1)."],"Hub exam-style question (written for this hub), Topic 5"),
P("Magnification and describing mitosis",8,"<p>A student drew an anaphase cell from a micrograph. The drawing is 60 mm long. The actual length of the cell is 20 μm.</p><ol type='a'><li>Calculate the magnification of the drawing. [3]</li><li>Describe how the chromosomes behave from the end of prophase to the end of anaphase. [3]</li><li>Explain why the two daughter cells are genetically identical to each other. [2]</li></ol>",
["(a) 60 mm = 60 000 μm (1). 60 000 ÷ 20 (1) = ×3000 (1).","(b) Chromosomes line up at the equator (1), centromeres divide and sister chromatids separate (1), pulled to opposite poles by spindle fibres (1).","(c) DNA replicated in S phase to make identical sister chromatids (1) and one chromatid from each pair went to each daughter cell (1)."],"Hub exam-style question (written for this hub), Topic 5")];
