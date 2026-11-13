/* ===== Biology 0610 Topics 15 (Drugs) and 16 (Reproduction); own wording; figure prefix BG_ ===== */
const BG_IM=(k,cap,alt)=>()=>BIF(k,cap,alt);
FIGS.BG_B1501=BG_IM("b15_f01","How antibiotics work: penicillin interferes with the building of the bacterial cell wall","Diagram of a bacterial cell with penicillin molecules and, later, the cell wall failing so the cell ruptures");
FIGS.BG_B1502=BG_IM("b15_f02","Antibiotic resistance: a population of gut bacteria, the antibiotic kills the non-resistant ones and the resistant ones multiply","Three-step diagram: a mixed bacterial population, antibiotic exposure killing non-resistant bacteria, then resistant bacteria multiplying, with a plasmid inset");
FIGS.BG_B1601=BG_IM("b16_f01","Binary fission in bacteria","Diagram of bacterial binary fission into two identical daughter cells");
FIGS.BG_B1602=BG_IM("b16_f02","Bulbs and tubers: underground food storage organs","Diagrams of a bulb and a potato tuber with labels");
FIGS.BG_B1603=BG_IM("b16_f03","A strawberry runner and its plantlet","Diagram of a runner linking a parent plant to a plantlet");
FIGS.BG_B1604=BG_IM("b16_f04","Haploid and diploid cells","Haploid cell with half the chromosomes of a diploid cell");
FIGS.BG_B1605=BG_IM("b16_f05","Structure of an insect-pollinated flower","Labelled diagram of an insect-pollinated flower");
FIGS.BG_B1606=BG_IM("b16_f06","A wind-pollinated flower","Labelled diagram of a wind-pollinated flower with anthers and feathery stigmas");
FIGS.BG_B1607=BG_IM("b16_f07","Pollen grains from three species","Three types of pollen grain, spiky, small and smooth, and winged");
FIGS.BG_B1608=BG_IM("b16_f08","Pollen nuclei travel down the pollen tube to fertilise the ovum","Pollen tube growing down the style into the ovule");
FIGS.BG_B1609=BG_IM("b16_f09","Investigating the conditions needed for germination","Four tubes of cress seeds with different conditions");
FIGS.BG_B1610=BG_IM("b16_f10","The pollen tube grows down the style","Pollen grain landing on the stigma and growing a tube");
FIGS.BG_B1611=BG_IM("b16_f11","Fertilisation: the ovule becomes a seed and the ovary a fruit","Pollen nucleus fusing with the ovum nucleus inside an ovule");
FIGS.BG_B1612=BG_IM("b16_f12","The male reproductive system","Labelled diagram of the male reproductive system");
FIGS.BG_B1613=BG_IM("b16_f13","The female reproductive system","Labelled diagram of the female reproductive system");
FIGS.BG_B1614=BG_IM("b16_f14","Fertilisation of the egg cell by a sperm","Sperm entering an egg cell with labelled parts");
FIGS.BG_B1615=BG_IM("b16_f15","A sperm cell and an egg cell compared","Labelled sperm cell and egg cell");
FIGS.BG_B1616=BG_IM("b16_f16","The fetus in the uterus","Labelled diagram of a fetus in the uterus");
FIGS.BG_B1617=BG_IM("b16_f17","The placenta","Labelled diagram of the placenta and blood vessels");
FIGS.BG_B1618=BG_IM("b16_f18","Female secondary sexual characteristics","Table of the effects of oestrogen");
FIGS.BG_B1619=BG_IM("b16_f19","Male secondary sexual characteristics","Table of the effects of testosterone");
FIGS.BG_B1620=BG_IM("b16_f20","Changes in the uterus lining during the menstrual cycle","Uterus lining over 28 days of the cycle");
FIGS.BG_B1621=BG_IM("b16_f21","FSH and LH during the menstrual cycle","Graph of FSH and LH levels with the uterus lining");
FIGS.BG_B1622=BG_IM("b16_f22","Oestrogen and progesterone during the menstrual cycle","Graph of oestrogen and progesterone levels with the uterus lining");
FIGS.BG_B1623=BG_IM("b16_f23","Where the menstrual cycle hormones are made and act","Body diagram showing hormone sites and targets");
FIGS.BG_B1624=BG_IM("b16_f24","How HIV infects lymphocytes","Four stages of HIV infecting a lymphocyte");
/* ================= TOPIC 15 DRUGS ================= */
const BG_L15=L("Drugs and antibiotics","What a drug is, how antibiotics work, why resistant bacteria such as MRSA appear and how resistance can be limited.",
`<h4>What is a drug?</h4>
<p>A <b>drug</b> is any substance taken into the body that <b>modifies or affects chemical reactions in the body</b>.</p>
<p>Some drugs are <b>medicinal drugs</b>, which are used to treat the symptoms or causes of a disease, for example <b>antibiotics</b>. The <b>liver</b> is the main site where the body breaks down (metabolises) drugs.</p>
<div class="key"><b>Exam tip</b>Use the full definition: a substance taken into the body that modifies or affects chemical reactions in the body. "Something that makes you better" is not enough.</div>
<h4>Antibiotics and how they work</h4>
<p><b>Antibiotics</b> are chemical substances made by certain fungi or bacteria that affect the working of bacterial cells, either by disrupting their structure or function or by preventing them from reproducing.</p>
<ul><li>Antibiotics are effective against <b>bacteria</b> but <b>not against viruses</b>.</li><li>They target processes and structures that are specific to bacterial (prokaryotic) cells, so they do not generally harm animal cells.</li></ul>
{{BG_B1501}}
<p>Penicillin, shown in the diagram, is an antibiotic that interferes with the building of the bacterial cell wall, so the cell ruptures and dies when it tries to grow.</p>
<h4>Antibiotic resistance and use (Extended)</h4>
<p>Commonly prescribed antibiotics are becoming less effective for a number of reasons:</p>
<ul><li>overuse, and being prescribed when not really necessary;</li><li>patients failing to complete the full course prescribed by a doctor;</li><li>large-scale use of antibiotics in farming to prevent disease when livestock are kept in close quarters, even when the animals are not sick.</li></ul>
<p>This has reduced the effectiveness of antibiotics and increased the incidence of <b>antibiotic resistance</b>. Resistant bacteria are commonly known as <b>superbugs</b>, and the most common is <b>MRSA</b>.</p>
<p>Resistance starts with a random <b>mutation</b> in one bacterium. When the antibiotic is used, the non-resistant bacteria die, the resistant ones survive and reproduce, and the whole population becomes resistant. This is natural selection.</p>
{{BG_B1502}}
<p>The diagram shows plasmids carrying antibiotic-resistance genes. Plasmids can be shared between bacteria of the same and of different species, which helps resistance to spread.</p>
<h4>How to prevent antibiotic resistance (Extended)</h4>
<p>Individuals can help to stop the incidence of antibiotic resistance increasing by:</p>
<ul><li>only taking antibiotics when absolutely essential;</li><li>making sure the entire course of antibiotics is completed, even if they feel better after a few days.</li></ul>
<div class="key"><b>Exam tip</b>Antibiotics kill bacteria but do not affect viruses. Colds and influenza are caused by viruses, so antibiotics cannot treat them.</div>
<h4>Misused drugs and addiction (context)</h4>
<p>This slide goes a little beyond what the 2026 to 2028 syllabus requires, but it helps you understand why drugs matter. Some drugs, including nicotine, alcohol and heroin, can cause <b>addiction</b>: the user feels a strong need to keep taking the drug and has withdrawal symptoms without it. Heroin slows the nervous system. Alcohol slows reactions and damages the liver with heavy use. Nicotine in tobacco is addictive, and the other substances in tobacco smoke cause lung disease.</p>`,
I("A patient has a sore throat. Should the doctor always prescribe an antibiotic?",
`<ol><li>Write what you think causes a sore throat and list what you would need to know before choosing a treatment.</li><li>Predict what happens to a bacterial population when an antibiotic is added.</li><li>Predict what would happen if the same antibiotic was used many times by many people.</li><li>Write a one-sentence rule for when antibiotics should be used.</li></ol>`,
`<p><b>Survival of the resistant (class model).</b> Use 100 beads in a bag: 95 white (not resistant) and 5 red (resistant). Round 1: remove 90 white beads at random to model the antibiotic (return the remaining beads). Now each remaining bead "divides": add one more of the same colour for every bead left. Repeat for three rounds. Record the percentage of red beads after each round and plot a line graph.</p><p><b>Analyse.</b> Explain why the red beads become the majority. Change the model to show a patient who stops the course too early.</p><p class="safe">Safety: no real bacteria are used. Do not put beads in mouths.</p>`),
[["Define a drug.","Any substance taken into the body (1) that modifies or affects chemical reactions in the body (1).",2],
["State why antibiotics are not used to treat influenza.","Influenza is caused by a virus (1) and antibiotics do not affect viruses (1).",2],
["Describe how a population of bacteria becomes resistant to an antibiotic.","A bacterium has a mutation that makes it resistant (1). The antibiotic kills non-resistant bacteria (1). The resistant bacterium survives and reproduces (1). It passes the resistance gene on, so the population is resistant (1).",4],
["Name a bacterium that is resistant to many antibiotics.","MRSA (1).",1],
["Explain why doctors should use antibiotics only when essential.","Using them less reduces selection of resistant bacteria (1), so antibiotics stay effective and resistant bacteria such as MRSA are less likely to develop (1).",2]],
[M("Which of these is caused by bacteria and treated with antibiotics?",["A cold","Influenza","A bacterial throat infection","Chickenpox"],2,"Antibiotics work only against bacteria."),
M("Which best defines a drug?",["Any food that gives energy","Any substance taken into the body that modifies chemical reactions in the body","Any medicine from a doctor","Any substance made by bacteria"],1,"This is the syllabus definition."),
T("Name the type of pathogen that antibiotics do not affect.",["virus","viruses"],"Antibiotics do not affect viruses."),
M("Antibiotic resistance first arises by:",["The patient stopping the course","A random mutation in a bacterium","The antibiotic changing the bacteria on purpose","Viruses attacking bacteria"],1,"Mutation gives the variation that selection acts on."),
T("What does MRSA stand for? Give the first word only.",["methicillin"],"Methicillin-resistant Staphylococcus aureus."),
N("One bacterium divides every 20 minutes. How many bacteria are there after 2 hours (starting from one)?",64,"","2 hours is 6 divisions, so the number doubles six times: 64."),
M("Which action best limits the development of resistant bacteria?",["Using antibiotics for every illness","Using antibiotics only when essential","Stopping a course when you feel better","Using the antibiotic of a friend"],1,"Less use means less selection pressure."),
T("Name one antibiotic.",["penicillin","amoxicillin","streptomycin","tetracycline","erythromycin"],"Penicillin is the best-known example.")],
[["Drug","Substance taken into the body that modifies or affects chemical reactions in the body."],
["Antibiotic","Drug that kills bacteria or stops them growing."],
["Do antibiotics work on viruses?","No. They only affect bacteria."],
["How does resistance arise?","Random mutation, then survival and reproduction of resistant bacteria."],
["MRSA","A bacterium resistant to many antibiotics, a problem in hospitals."],
["Why finish a course of antibiotics?","To kill all the bacteria so resistant ones are not left to multiply."],
["Why limit antibiotic use?","Less use means less selection for resistant bacteria."],
["Why can antibiotics harm bacteria but not human cells?","They target features bacteria have, such as the cell wall."]]);

const BG_Q15=[
M("Antibiotics are used to treat infections caused by:",["Viruses","Bacteria","Fungi only","Parasites in food"],1,"They act on bacteria."),
M("Which is a drug?",["Water","Caffeine","Glucose","Fibre"],1,"Caffeine changes how the body works."),
T("What word describes bacteria that antibiotics no longer kill?",["resistant","resistance"],"Resistant."),
M("Which process produces resistant bacteria in a population?",["Artificial selection by farmers","Natural selection","Photosynthesis","Osmosis"],1,"Resistant bacteria survive and reproduce."),
N("A population of 5 resistant bacteria doubles three times. How many are there?",40,"","5 x 2 x 2 x 2 = 40."),
M("Why are antibiotics not given for a cold?",["Colds are caused by fungi","Colds are caused by viruses","Colds are not infectious","Antibiotics are too expensive"],1,"Antibiotics have no effect on viruses."),
T("Name the hospital bacterium resistant to many antibiotics (four letters).",["mrsa"],"MRSA."),
M("What is the best advice about an antibiotic prescription?",["Stop when you feel better","Finish the full course","Share it","Take it only at night"],1,"Finishing the course kills all the bacteria.")];

const BG_PP15=[
P("Antibiotics and infection",5,"<p>A doctor prescribes an antibiotic for a patient with a bacterial infection.</p><ol type='a'><li>State what is meant by the term <b>drug</b>. [2]</li><li>State why the antibiotic does not harm the patient's own cells. [1]</li><li>The patient's friend has a cold and asks for the same antibiotic. Explain why it would not help. [2]</li></ol>",["(a) A substance taken into the body (1) that modifies or affects chemical reactions in the body (1).","(b) Antibiotics target structures found in bacteria, such as the cell wall, that human cells do not have (1).","(c) A cold is caused by a virus (1) and antibiotics do not affect viruses (1)."],"Hub exam-style question (written for this hub), Topic 15"),
P("Growth of a resistant population",6,"<p>A student modelled antibiotic resistance. The table shows the number of bacteria in a flask.</p><table><tr><th>Stage</th><th>Resistant</th><th>Not resistant</th></tr><tr><td>Start</td><td>2</td><td>98</td></tr><tr><td>After antibiotic added</td><td>2</td><td>0</td></tr><tr><td>After regrowth</td><td>50</td><td>0</td></tr></table><ol type='a'><li>Calculate the percentage of resistant bacteria at the start. [1]</li><li>Explain why the number of non-resistant bacteria fell to zero. [1]</li><li>Explain why the number of resistant bacteria increased after the antibiotic was added. [2]</li><li>Suggest how doctors can reduce the chance of resistant bacteria such as MRSA developing. [2]</li></ol>",["(a) 2% (1).","(b) The antibiotic killed them (1).","(c) The resistant bacteria survived (1) and reproduced / passed on the resistance gene without competition (1).","(d) Use antibiotics only when essential (1). Do not prescribe them for viral infections / make sure patients finish the course (1)."],"Hub exam-style question (written for this hub), Topic 15"),
P("Explaining the spread of MRSA",4,"<p>MRSA is a bacterium that is resistant to many antibiotics. Explain how MRSA became common in hospitals. [4]</p>",["Antibiotics are used a lot in hospitals (1). A random mutation made some bacteria resistant (1). The non-resistant bacteria were killed but the resistant ones survived and reproduced (1). The gene for resistance was passed to offspring so the resistant population increased (1)."],"Hub exam-style question (written for this hub), Topic 15"),
P("Misuse of antibiotics",3,"<p>Some people stop taking an antibiotic as soon as they feel better.</p><ol type='a'><li>Suggest why this is a problem for the patient. [1]</li><li>Explain why it is also a problem for other people. [2]</li></ol>",["(a) Some bacteria may survive and the infection can return (1).","(b) Survivors may be resistant bacteria (1) which can spread to others and be harder to treat (1)."],"Hub exam-style question (written for this hub), Topic 15")];
BSET(15,[BG_L15],BG_Q15,BG_PP15);

/* ================= TOPIC 16 REPRODUCTION ================= */
const BG_L161=L("Asexual and sexual reproduction","Reproduction with one parent or two, why the offspring are identical or varied, and the advantages and disadvantages of each.",
`<h4>Asexual reproduction</h4>
<p><b>Asexual reproduction</b> is a process resulting in <b>genetically identical offspring from one parent</b>. It does not involve sex cells or fertilisation. Only one parent is needed, so there is no fusion of gametes and no mixing of genetic information. The offspring are genetically identical to the parent and to each other (<b>clones</b>).</p>
<p><b>Bacteria</b> reproduce asexually by <b>binary fission</b>, which produces two genetically identical daughter cells from the division of one parent cell.</p>
{{BG_B1601}}
<h4>Examples of asexual reproduction in plants</h4>
<p>Plants can reproduce asexually using <b>bulbs and tubers</b>. These are underground food storage organs from which budding can occur, producing new plants that are genetically identical to the parent plant.</p>
{{BG_B1602}}
<p>Some plants, such as strawberry plants, grow side shoots called <b>runners</b> that carry tiny plantlets. The plantlets grow roots and develop into separate plants that are identical to the parent.</p>
{{BG_B1603}}
<h4>Advantages and disadvantages of asexual reproduction (Extended)</h4>
<table><tr><th>Species type</th><th>Advantages</th><th>Disadvantages</th></tr>
<tr><td rowspan="4"><b>Wild species</b></td><td>Rapid population growth</td><td>Limited genetic variation in the population: offspring are genetically identical to their parents</td></tr>
<tr><td>Can exploit suitable environments quickly</td><td>Vulnerable to habitat changes such as temperature changes, droughts or new predators</td></tr>
<tr><td>More time and energy efficient</td><td>Disease is likely to affect the whole population as there is no genetic variation</td></tr>
<tr><td>Reproduction is completed much faster than sexual reproduction</td><td>No recombination of genes means evolution is slow</td></tr>
<tr><td rowspan="4"><b>Crop plants</b></td><td>Crops can be produced with desired characteristics, e.g. high yield, disease resistance, drought resistance</td><td>Crops will not adapt to changes in climate if produced asexually</td></tr>
<tr><td>Crops can be produced with uniform characteristics, necessary for commercial sale</td><td>The process requires human input and management</td></tr>
<tr><td>Production of crops can be faster</td><td>If a diseased parent plant is used, the offspring will also be diseased</td></tr>
<tr><td>The cost of production is less than investing in seeds</td><td>Vulnerability to disease or pests may result in big financial losses for the farmer</td></tr></table>
<h4>Sexual reproduction: gametes and zygotes</h4>
<p><b>Sexual reproduction</b> is a process involving the <b>fusion of the nuclei of two gametes</b> (sex cells) to form a <b>zygote</b> (fertilised egg cell) and the production of offspring that are <b>genetically different</b> from each other. <b>Fertilisation</b> is the fusion of gamete nuclei. As each gamete comes from a different parent, there is variation in the offspring.</p>
<p>A <b>gamete</b> is a sex cell: in animals the sperm and ovum, in plants the pollen nucleus and ovum. Gametes contain <b>half the number of chromosomes</b> of other body cells, so they have a <b>haploid</b> nucleus. They contain one copy of each chromosome rather than two. In humans a body cell has 46 chromosomes but each gamete has 23. When the male and female gametes fuse, the zygote contains the full 46, half from the father and half from the mother, so the zygote has a <b>diploid</b> nucleus.</p>
<h4>Haploid and diploid cells (Extended)</h4>
<ul><li>The nuclei of gametes are <b>haploid</b>: half the number of chromosomes of a normal body cell (23 in humans).</li><li>The nucleus of a zygote is <b>diploid</b>: the same number of chromosomes as a normal body cell (23 pairs in humans).</li><li>The zygote stays diploid as it grows into an embryo and then a fetus during pregnancy.</li></ul>
{{BG_B1604}}
<h4>Advantages and disadvantages of sexual reproduction (Extended)</h4>
<div class="key"><b>Advantages</b><br>It increases genetic variation within a population. This variation gives the population a better chance of adapting to a changing environment. A population with more variation is less likely to be wiped out by a single disease, since some individuals may be resistant.</div>
<div class="key"><b>Disadvantages</b><br>Finding a mate costs time and energy. Individuals that are isolated from others may struggle to find a mate at all.</div>
<p>Many <b>crop plants</b> reproduce sexually. The advantage is that variation is increased, so a variant may be produced that copes better with weather changes or gives a significantly higher yield. The disadvantage is that the variation may produce offspring that are less successful than the parent plant at growing well or producing a good harvest.</p>`,
I("Why do all the plants grown from potato tubers look alike, while plants grown from seeds differ?",
`<ol><li>Write down two ways in which a cutting from a plant differs from a seed in how it is produced.</li><li>Predict whether the offspring from each method will be identical.</li><li>Decide what you will measure to compare variation, for example height or leaf area.</li><li>Predict which method would give a more uniform crop and which would give a better chance of a new useful feature.</li></ol>`,
`<p><b>Compare clones and seedlings.</b> Take 10 cuttings of one spider plant or Tradescantia and sow 10 seeds from one packet (for example cress or marigold). Grow both under the same light and water. After 10 to 14 days measure the height or leaf length of each plant. Calculate the range and mean for each group.</p><p><b>Interpret.</b> Which group shows more variation? Explain using the words genetically identical and genetically different. If seeds are not available, use the data table supplied by your teacher.</p><p class="safe">Safety: wash hands after handling plants and compost.</p>`),
[["Define asexual reproduction.","The production of genetically identical offspring (1) from one parent (1).",2],
["Give two examples of asexual reproduction.","Any two from: bacteria binary fission, strawberry runners, potato tubers, bulbs (1 each).",2],
["Define fertilisation.","The fusion of the nuclei (1) of gametes (1).",2],
["Give one advantage and one disadvantage of sexual reproduction in a wild population.","Advantage: variation, so some may survive a change or disease (1). Disadvantage: needs two parents / slower / uses more energy (1).",2],
["Explain why a farmer might use asexual reproduction to grow a crop of potatoes.","All plants are identical to the parent with the same good features (1), so the crop is uniform and predictable (1).",2]],
[M("Asexual reproduction produces offspring that are:",["Genetically different","Genetically identical to the parent","Haploid","Made from two gametes"],1,"Only one parent and no fusion of gametes."),
M("Which is an example of asexual reproduction?",["Pollination","Strawberry runners","Fertilisation","Meiosis"],1,"Runners produce clones."),
T("Name the cell formed when the nuclei of two gametes fuse.",["zygote"],"The zygote."),
N("A human gamete has 23 chromosomes. How many are in the zygote?",46,"","Two gametes fuse: 23 + 23 = 46."),
M("Gametes are:",["Diploid","Haploid","Identical to body cells","Made by mitosis"],1,"Gametes have half the usual chromosome number."),
M("A disadvantage of asexual reproduction in the wild is:",["Fast spread","Lack of variation","Needs two parents","Slow growth"],1,"One disease could kill all the clones."),
M("An advantage of sexual reproduction for a wild population is:",["Offspring are clones","Variation helps survival when conditions change","Only one parent needed","It is faster"],1,"Variation gives some individuals a chance to survive."),
T("Name the type of nucleus that has two sets of chromosomes.",["diploid"],"Diploid.")],
[["Asexual reproduction","One parent produces genetically identical offspring."],
["Sexual reproduction","Fusion of the nuclei of two gametes gives genetically different offspring."],
["Fertilisation","Fusion of the nuclei of gametes."],
["Zygote","The cell formed by fertilisation."],
["Haploid","One set of chromosomes, as in gametes."],
["Diploid","Two sets of chromosomes, as in a zygote."],
["Advantage of asexual reproduction for crops","Uniform plants with the same good features."],
["Advantage of sexual reproduction in the wild","Variation, so some offspring may survive change or disease."]]);

const BG_L162=L("Sexual reproduction in plants","Structure of insect-pollinated and wind-pollinated flowers, pollination, fertilisation and the conditions seeds need to germinate.",
`<h4>Insect-pollinated flowers</h4>
<p>Flowers are the reproductive organs of plants. Their role is to enable the plant sex cells (gametes) to come together in fertilisation. The <b>male gametes</b> are found in <b>pollen grains</b> and the <b>female gametes</b> are in <b>ovules</b>. <b>Pollination</b> is the transfer of pollen from the male part of a flower to the female part. It can be carried out by insects or by wind.</p>
<p>An insect-pollinated flower has sepals, petals, stamens (anthers on filaments) and a carpel (stigma, style, ovary containing ovules). It is adapted so that insects collect pollen from the male parts and easily transfer it to the female parts of another flower.</p>
{{BG_B1605}}
<table><tr><th>Structure</th><th>Description</th></tr>
<tr><td>Sepal</td><td>Protects the unopened flower</td></tr>
<tr><td>Petals</td><td>Brightly coloured in insect-pollinated flowers to attract insects</td></tr>
<tr><td>Anther</td><td>Produces and releases pollen</td></tr>
<tr><td>Filament</td><td>Provides support to the anther</td></tr>
<tr><td>Stigma</td><td>Sticky top of the female part of the flower, which collects pollen grains</td></tr>
<tr><td>Style</td><td>A tube that connects the stigma and the ovary</td></tr>
<tr><td>Ovary</td><td>Contains the ovules</td></tr>
<tr><td>Ovule</td><td>Structure inside the ovary that contains the female gamete</td></tr></table>
<h4>Wind-pollinated flowers</h4>
<p>Wind-pollinated flowers are adapted so that the wind can easily catch pollen grains and carry them to the stigmas of other flowers. The anthers and stigmas hang <b>outside</b> the flower so that pollen can easily be blown away by the wind and easily caught by the stigmas of other flowers.</p>
{{BG_B1606}}
<h4>Pollen grains and pollination</h4>
<p>The pollen of different types of flower is adapted to aid pollination.</p>
<ul><li><b>Insect-pollinated</b> flowers produce larger, heavier pollen grains that often have spikes or hooks on the outside so that they stick to insects.</li><li><b>Wind-pollinated</b> flowers produce small, lightweight pollen grains that can be caught and carried easily by the wind.</li></ul>
{{BG_B1607}}
<div class="key"><b>Worked example.</b> Which pollen grains are involved in insect pollination? Grain 1 is large with spikes: too heavy for the wind, and the spikes catch on the bodies of insects. Grain 2 is small and smooth: light enough to be carried by the wind. Grain 3 has wing-like structures that catch the wind easily. <b>Answer: B, 1 only.</b></div>
<table><tr><th>Feature</th><th>Insect-pollinated flower</th><th>Wind-pollinated flower</th></tr>
<tr><td>Petals</td><td>Large and brightly coloured to attract insects</td><td>Small and dull, often green or brown</td></tr>
<tr><td>Scent and nectar</td><td>Produced, to encourage insects to visit the flower and push past the stamens to get to the nectar</td><td>Not produced; this would be a waste of energy</td></tr>
<tr><td>Anthers</td><td>Held on stiff filaments within the flower so that they brush against insects</td><td>Held on long filaments outside the flower to release pollen grains easily into the wind</td></tr>
<tr><td>Stigma</td><td>Sticky stigmas within the flower catch pollen grains when insects brush past</td><td>Feathery stigmas outside the flower catch airborne pollen grains</td></tr></table>
<h4>Pollination and fertilisation; the pollen tube (Extended)</h4>
<p><b>Pollination</b> is the transfer of pollen grains from an anther to a stigma. <b>Fertilisation</b> is the fusion of a pollen nucleus with an ovum nucleus. After pollination, the pollen nuclei travel to the ovule and fuse with the female gamete.</p>
{{BG_B1608}}
<div class="key"><b>Examiner tip.</b> It is easy to confuse pollination and fertilisation. Pollination is the transfer of pollen. Fertilisation is the fusion of gametes.</div>
<p>After pollination (Extended):</p>
<ul><li>A <b>pollen tube</b> grows from the pollen grain down the style until it reaches the ovary.</li><li>The nuclei from the pollen travel down the tube.</li><li>The nuclei enter the ovule and fuse with the nucleus of the female gamete (fertilisation).</li><li>After fertilisation the ovules develop into <b>seeds</b> and the ovary develops into a <b>fruit</b>.</li></ul>
{{BG_B1610}}
{{BG_B1611}}
<div class="key"><b>Examiner tip.</b> It is the <b>nucleus</b> of the pollen grain that travels down the pollen tube in the style for fertilisation, not the pollen grain itself. Be specific with key words.</div>
<h4>Factors affecting germination of seeds</h4>
<p><b>Germination</b> is the start of growth in the seed. Three factors are needed.</p>
<ul><li><b>Water</b> allows the seed to swell and the enzymes in the embryo to start working so that growth can occur.</li><li><b>Oxygen</b> so that energy can be released (by respiration) for germination.</li><li><b>Warmth</b>: germination improves as temperature rises (up to a maximum) because the reactions are controlled by enzymes.</li></ul>
<p>Carbon dioxide is not necessary for germination but does not inhibit it, so it makes no difference whether it is present or not.</p>
<p><b>Investigating germination.</b> Set up four boiling tubes each with 10 cress seeds on cotton wool. Tubes A, B and C are kept at 20 °C and tube D is placed in a fridge at 4 °C. After a period of time, compare the number of germinated seeds in each tube.</p>
{{BG_B1609}}
<table><tr><th>Test tube</th><th>Factor being tested</th><th>Seeds germinated</th></tr>
<tr><td>A</td><td>Water (moisture)</td><td>No</td></tr>
<tr><td>B</td><td>Control (all factors present)</td><td>Yes</td></tr>
<tr><td>C</td><td>Oxygen</td><td>No</td></tr>
<tr><td>D</td><td>Warm temperature</td><td>No</td></tr></table>
<p>The results show that all three factors are required: if any one is missing the seeds cannot germinate.</p>
<h4>Self-pollination and cross-pollination (Extended)</h4>
<p><b>Cross-pollination</b> is the transfer of pollen from one plant to the stigma of another plant of the same species. It is how most plants are pollinated, as it improves genetic variation. Occasionally pollen lands on its own stigma or on another flower of the same plant: this is <b>self-pollination</b>.</p>
<ul><li>Self-pollination <b>reduces genetic variety</b> of the offspring, as all the gametes come from the same parent.</li><li>Lack of variation is a disadvantage if conditions change, as it is less likely that any offspring will have adaptations that suit the new conditions.</li><li>Cross-pollination relies on the presence of pollinators. This can be a problem if they are missing, for example the fall in bee numbers matters because bees pollinate many food crops. This does not apply to wind-pollinated plants.</li></ul>`,
I("Which conditions does a seed really need before it will start to grow?",
`<ol><li>List everything a seed could be exposed to in soil, for example water, air, warmth and light.</li><li>Predict which of these a seed needs to germinate.</li><li>Design a fair test with five tubes. Decide which variable you will change in each tube and what you will keep the same.</li><li>Decide how you will measure germination.</li></ol>`,
`<p><b>Germination investigation.</b> Set up five boiling tubes or petri dishes with 10 cress or mustard seeds each on cotton wool. (1) Damp cotton wool, room temperature, light: control. (2) Dry cotton wool. (3) Seeds covered with boiled, cooled water and a layer of oil (little oxygen). (4) Damp, in a fridge at about 5 °C. (5) Damp, in a dark cupboard. Record the number of seeds germinated each day for a week.</p><p><b>Dissect a flower.</b> Use a lily or similar large flower. Identify and sketch the sepals, petals, stamens and carpel. Cut across the ovary and count the ovules.</p><p class="safe">Safety: wash hands after handling seeds and soil. Do not eat the seeds or flowers. Use scalpels only as directed.</p>`),
[["Name the part of the flower that makes pollen and the part that receives it.","Anther makes pollen (1); stigma receives pollen (1).",2],
["Define pollination.","Transfer of pollen grains (1) from an anther to a stigma (1).",2],
["State two features of a wind-pollinated flower.","Any two from: small dull petals, anthers hanging outside, large feathery stigma, no nectar, smooth light pollen (1 each).",2],
["Describe how the pollen tube helps fertilisation.","It grows from the pollen grain down the style (1) into the ovule (1) carrying the male nucleus, which fuses with the egg nucleus (1).",3],
["State three conditions needed for seeds to germinate and explain the need for oxygen.","Water, oxygen, suitable temperature (1). Oxygen is needed for aerobic respiration (1) to release energy for growth (1).",3]],
[M("Which part of a flower becomes the fruit?",["Ovule","Ovary","Stigma","Anther"],1,"The ovary develops into the fruit."),
M("Which part of the flower makes pollen?",["Stigma","Style","Anther","Ovule"],2,"The anther makes pollen grains."),
T("What is the name of the sticky part of the carpel that receives pollen?",["stigma"],"The stigma."),
M("A feature of a wind-pollinated flower is:",["Brightly coloured petals","Feathery stigma outside the flower","Nectar","Sticky pollen"],1,"A feathery stigma catches pollen from the air."),
M("Fertilisation in plants is:",["Transfer of pollen to a stigma","Fusion of a pollen nucleus with an ovule nucleus","Seed dispersal","Growth of the root"],1,"This is the definition from the syllabus."),
M("Which is NOT needed for most seeds to germinate?",["Water","Oxygen","Light","Suitable temperature"],2,"Most seeds do not need light."),
N("An ovary contains 6 ovules. If every ovule is fertilised, how many seeds can form?",6,"","One seed forms from each fertilised ovule."),
T("Name the structure that grows from a pollen grain down the style.",["pollen tube"],"The pollen tube.")],
[["Anther","Makes pollen grains."],
["Stigma","Receives pollen."],
["Ovary","Contains ovules; becomes the fruit."],
["Pollination","Transfer of pollen from an anther to a stigma."],
["Self-pollination","Pollen transferred to a stigma on the same plant."],
["Cross-pollination","Pollen transferred to a stigma on a different plant of the same species."],
["Conditions for germination","Water, oxygen and a suitable temperature."],
["Role of the pollen tube","Carries the male nucleus to the ovule for fertilisation."]]);

const BG_L163=L("Sexual reproduction in humans","The male and female reproductive systems, gametes, fertilisation, development of the fetus and the role of the placenta.",
`<h4>The male reproductive system</h4>
{{BG_B1612}}
<table><tr><th>Structure</th><th>Function</th></tr>
<tr><td>Prostate gland</td><td>Produces a fluid that mixes with sperm cells to form semen</td></tr>
<tr><td>Sperm duct</td><td>Sperm pass through it to be mixed with fluids produced by the glands before passing into the urethra for ejaculation</td></tr>
<tr><td>Urethra</td><td>Tube running down the centre of the penis that can carry out urine or semen; a ring of muscle in the urethra prevents the urine and semen from mixing</td></tr>
<tr><td>Testis</td><td>Contained within a bag of skin (scrotum); produces sperm (the male gamete) and the hormone testosterone</td></tr>
<tr><td>Scrotum</td><td>Sac supporting the testes outside the body so that sperm are kept slightly below body temperature</td></tr>
<tr><td>Penis</td><td>Passes urine out of the body from the bladder and allows semen to pass into the vagina of a woman during sexual intercourse</td></tr></table>
<h4>The female reproductive system</h4>
{{BG_B1613}}
<table><tr><th>Structure</th><th>Function</th></tr>
<tr><td>Oviduct</td><td>Connects the ovary to the uterus; lined with ciliated cells to push the released ovum along it. Fertilisation occurs here</td></tr>
<tr><td>Ovary</td><td>Contains ova (female gametes), which mature and develop when hormones are released</td></tr>
<tr><td>Uterus</td><td>Muscular bag with a soft lining where the fertilised egg (zygote) is implanted to develop into a fetus</td></tr>
<tr><td>Cervix</td><td>Ring of muscle at the lower end of the uterus that keeps the developing fetus in place during pregnancy</td></tr>
<tr><td>Vagina</td><td>Muscular tube leading to the inside of the woman's body, where the penis enters during sexual intercourse and sperm are deposited</td></tr></table>
<h4>Gametes and fertilisation</h4>
<p><b>Fertilisation</b> is the fusion of the nuclei from a male gamete (sperm cell) and a female gamete (egg cell). It occurs in the oviducts. Gametes have adaptations that increase the chances of fertilisation and of successful development of an embryo.</p>
{{BG_B1614}}
<h4>Adaptations of gametes (Extended)</h4>
{{BG_B1615}}
<table><tr><th>Gamete</th><th>Adaptive feature</th><th>Function</th></tr>
<tr><td rowspan="3"><b>Sperm</b></td><td>Has a flagellum (tail)</td><td>Allows the sperm to swim towards the egg</td></tr>
<tr><td>Contains enzymes in the head region (acrosome)</td><td>To digest a route into the egg for fertilisation</td></tr>
<tr><td>Contains many mitochondria</td><td>To provide energy for movement of the flagellum</td></tr>
<tr><td rowspan="2"><b>Egg</b></td><td>Cytoplasm contains a store of energy</td><td>To provide energy for cell division in the developing zygote after fertilisation</td></tr>
<tr><td>Jelly-like coating that changes after fertilisation</td><td>To make an impenetrable barrier after fertilisation, preventing more sperm entering the egg</td></tr></table>
<table><tr><th>Feature</th><th>Sperm</th><th>Egg</th></tr>
<tr><td>Size</td><td>Very small (45 µm)</td><td>Large (0.15 mm)</td></tr>
<tr><td>Structure</td><td>Head region, flagellum, many structural adaptations</td><td>Round cell with few structural adaptations, covered in a jelly coating</td></tr>
<tr><td>Motility</td><td>Capable of locomotion</td><td>Not capable of locomotion</td></tr>
<tr><td>Numbers</td><td>Produced every day in huge numbers (around 100 million per day)</td><td>Thousands of immature eggs in each ovary, but only one is released each month</td></tr></table>
<h4>Pregnancy: growth and development of the fetus</h4>
<p>After fertilisation in the oviduct, the zygote travels towards the uterus, dividing repeatedly to form a ball of cells called an <b>embryo</b>. In the uterus the embryo embeds itself in the thick lining (<b>implantation</b>) and continues to grow and develop.</p>
<p>The gestation period for humans is 9 months. Major development of organs takes place in the first 12 weeks, when the embryo gets nutrients from the mother by diffusion through the uterus lining. After this the organs are all in place, the placenta has formed and the embryo is called a <b>fetus</b>. The remaining time is used by the fetus to grow bigger.</p>
<ul><li>The fetus is surrounded by an <b>amniotic sac</b> containing <b>amniotic fluid</b> (made from the mother's blood plasma), which protects it by cushioning it from bumps to the mother's abdomen.</li><li>The <b>umbilical cord</b> joins the fetus's blood supply to the placenta for exchange of nutrients and removal of waste products.</li></ul>
{{BG_B1616}}
<h4>The placenta and umbilical cord (Extended)</h4>
<p>During gestation the fetus gains <b>glucose, amino acids, fats, water and oxygen</b> from the mother's blood. The two bloods flow opposite each other and never mix in the placenta. The fetus's blood connects to and from the placenta by the umbilical cord. The mother's blood also absorbs waste from the fetus's blood, such as <b>carbon dioxide and urea</b>, so that they do not build up to dangerous levels.</p>
<p>All molecules cross the placenta by <b>diffusion</b>, down concentration gradients. The placenta is adapted for this by a <b>large surface area</b> and a <b>thin wall</b>.</p>
{{BG_B1617}}
<p>The placenta acts as a barrier to toxins and pathogens, but not all are stopped, which depends partly on the size of the molecule. Some viruses (for example rubella) and molecules such as nicotine can pass across, which is why pregnant women are advised not to smoke.</p>
<div class="key"><b>Examiner tip.</b> Learn at least two specific substances that move in each direction across the placenta. Non-specific answers such as 'waste products' and 'nutrients' will not get marks.</div>`,
I("How does a fetus get everything it needs if it is surrounded by fluid inside its mother?",
`<ol><li>List what a growing fetus needs and what waste it must lose.</li><li>Decide where the fetus could obtain and lose these substances.</li><li>Predict why the blood of the mother and fetus must be close but not mixed.</li><li>Suggest why it matters what a pregnant woman eats, drinks and smokes.</li></ol>`,
`<p><b>Sort and build.</b> Use the cut-out set (or draw your own) to place the parts of both reproductive systems on a blank outline. Write the function of each part on a label.</p><p><b>Model the placenta.</b> Cut a pasta-like strip of absorbent paper to represent the placenta and place two coloured water layers on either side. Add a drop of food dye to the "mother" side and watch it spread across the membrane (diffusion). Discuss what the model shows about substances that cross and why the blood does not mix.</p><p><b>Data task.</b> Compare average birth masses of babies born to mothers who did and did not smoke (data supplied). Describe the pattern and suggest how smoking affects the fetus.</p><p class="safe">Safety: food colouring can stain. Wear a lab coat and wash hands.</p>`),
[["Name the part of the male reproductive system that makes sperm and give one function of the scrotum.","Testes make sperm (1). Scrotum holds the testes outside the body at a lower temperature for sperm production (1).",2],
["State the function of the oviduct.","It carries the egg to the uterus (1); fertilisation takes place here (1).",2],
["Describe two ways in which a sperm differs from an egg cell.","Any two from: sperm is smaller; sperm has a tail and swims, egg cannot move by itself; sperm are made in millions, egg usually one per month; egg has food stores (1 each).",2],
["Explain how a sperm is adapted to its function.","Flagellum for swimming (1); many mitochondria release energy for swimming (1); acrosome has enzymes to digest the jelly coat (1).",3],
["Describe how the placenta allows exchange between mother and fetus and state one harmful substance that can cross it.","Oxygen and nutrients diffuse from the mother's blood to the fetal blood (1). Carbon dioxide and urea diffuse from the fetal blood to the mother's blood (1). Harmful substance, for example nicotine, alcohol or the rubella virus (1).",3]],
[M("Where does sperm production take place?",["Prostate gland","Testis","Sperm duct","Urethra"],1,"Sperm are made in the testes."),
M("What is the function of the amniotic fluid?",["Supplies oxygen","Protects the fetus from knocks","Digests food","Makes hormones"],1,"The fluid cushions the fetus."),
T("Name the structure that joins the fetus to the placenta.",["umbilical cord"],"The umbilical cord."),
M("Which part of the sperm contains enzymes that digest the egg's jelly coat?",["Tail","Mitochondria","Acrosome","Middle piece"],2,"The acrosome holds the enzymes."),
M("Which substance passes from the fetus to the mother across the placenta?",["Oxygen","Glucose","Urea","Amino acids"],2,"Urea is an excretory product."),
M("The embryo implants into the:",["Oviduct","Cervix","Lining of the uterus","Ovary"],2,"Implantation is into the uterus lining."),
T("Name the structure in the female that carries the egg from the ovary to the uterus.",["oviduct","fallopian tube"],"The oviduct."),
M("Which is a difference between sperm and egg cells?",["Sperm are larger","Sperm are motile","Sperm contain energy stores","Sperm have a jelly coat"],1,"Sperm swim; eggs cannot move on their own.")],
[["Function of the testes","Make sperm and testosterone."],
["Function of the prostate gland","Adds fluid to sperm to make semen."],
["Where does fertilisation usually happen?","In the oviduct."],
["Adaptations of a sperm","Flagellum, many mitochondria, acrosome enzymes."],
["Adaptations of an egg cell","Energy stores and a jelly coat that changes at fertilisation."],
["Role of the placenta","Exchange of oxygen, nutrients and wastes between mother's and fetal blood."],
["Function of the amniotic fluid","Cushions and protects the fetus."],
["Can harmful substances cross the placenta?","Yes: some pathogens and toxins can."]]);

const BG_L164=L("Sex hormones, the menstrual cycle and STIs","How sex hormones control puberty and the menstrual cycle, and how sexually transmitted infections such as HIV spread and are controlled.",
`<h4>Secondary sexual characteristics</h4>
<p><b>Secondary sexual characteristics</b> are the changes that occur during <b>puberty</b> as children become adolescents. <b>Primary</b> sexual characteristics are present during development in the uterus and are the differences in reproductive organs between males and females. Secondary characteristics are controlled by the release of hormones: <b>oestrogen in girls</b> and <b>testosterone in boys</b>.</p>
<p>Some changes occur in both boys and girls, including growth of the sexual organs and growth of body hair. Emotional changes also occur because of the increased hormone levels, such as more interest in sex and increased mood swings.</p>
{{BG_B1618}}
{{BG_B1619}}
<h4>The menstrual cycle</h4>
<ul><li>It starts in early adolescence in girls (around age 12) and is controlled by hormones.</li><li>The average cycle is <b>28 days</b> long.</li><li><b>Ovulation</b> (release of an egg) occurs about halfway through the cycle (day 14) and the egg then travels down the oviduct to the uterus.</li><li>Failure to fertilise the egg causes <b>menstruation</b> (a period), the breakdown of the thickened lining of the uterus. It lasts around 5 to 7 days and signals the start of the next cycle.</li><li>After menstruation the lining starts to thicken again in preparation for possible implantation in the next cycle.</li></ul>
{{BG_B1620}}
<h4>Hormones of the menstrual cycle: FSH and LH (Extended)</h4>
<p>The cycle is controlled by hormones from the ovary and from the <b>pituitary gland</b> in the brain.</p>
<ul><li><b>FSH</b> (follicle-stimulating hormone) is released by the pituitary gland. It causes an egg to start maturing in the ovary and stimulates the ovaries to release oestrogen.</li><li>The pituitary is stimulated to release <b>LH</b> (luteinising hormone) when oestrogen reaches its peak.</li><li>LH causes <b>ovulation</b> and stimulates the ovary to produce progesterone.</li></ul>
{{BG_B1621}}
<h4>Oestrogen, progesterone and how the four interact (Extended)</h4>
<ul><li><b>Oestrogen</b> rises from day 1 to peak just before day 14. It causes the uterine wall to thicken and the egg to mature, and inhibits production of FSH.</li><li><b>Progesterone</b> stays low from day 1 to 14 and rises once ovulation has occurred. It thickens and maintains the uterine lining. A fall in progesterone causes the lining to break down (menstruation).</li></ul>
{{BG_B1622}}
<ol><li>The pituitary gland produces FSH, which stimulates development of a follicle in the ovary.</li><li>An egg develops in the follicle, and the follicle produces oestrogen.</li><li>Oestrogen causes growth and repair of the uterus lining and inhibits FSH.</li><li>When oestrogen is high enough it stimulates LH release, which causes ovulation (around day 14).</li><li>The follicle becomes the <b>corpus luteum</b> and produces progesterone, which maintains the uterus lining.</li><li>If there is no pregnancy, progesterone levels drop and the lining breaks down and leaves through the vagina (a period).</li><li>If pregnancy occurs the corpus luteum keeps producing progesterone, which prevents the lining breaking down, until the placenta has developed. The placenta then secretes progesterone throughout the pregnancy.</li></ol>
{{BG_B1623}}
<h4>STIs and HIV/AIDS</h4>
<p>Unprotected sexual intercourse can transfer pathogens in body fluids. Infections passed on this way are <b>sexually transmitted infections (STIs)</b>. An example is <b>HIV</b> (human immunodeficiency virus), the virus that usually leads to <b>AIDS</b> (acquired immunodeficiency syndrome). HIV can also spread by sharing needles with an infected person, by blood transfusions with infected blood, from mother to fetus through the placenta and from mother to baby in breast milk.</p>
<p><b>How HIV affects the immune system.</b> Soon after infection people often have mild flu-like symptoms, which pass, and for a time they may not know they are infected. The virus infects a type of <b>lymphocyte</b>. Normally lymphocytes seek out and destroy pathogens, producing antibodies. HIV avoids being recognised by repeatedly changing its protein coat. It uses the lymphocyte's machinery to multiply, which reduces the number of lymphocytes and of antibodies that can be made. The body can no longer fight infections, eventually leading to AIDS.</p>
{{BG_B1624}}
<h4>Controlling the spread of STIs</h4>
<ul><li>Limit the number of sexual partners.</li><li>Do not have unprotected sex: always use a condom.</li><li>Get tested if unprotected sex or sex with multiple partners has occurred.</li><li>Raise awareness through education programmes.</li></ul>`,
I("What does the menstrual cycle graph tell us about how hormones work together?",
`<ol><li>Look at the hormone graph and name the hormone that peaks just before ovulation.</li><li>Predict what would happen to the uterus lining if progesterone fell on day 18.</li><li>Predict why progesterone stays high during pregnancy.</li><li>Write two questions the graph does not answer.</li></ol>`,
`<p><b>Cycle calendar.</b> Use a 28-day strip of paper. Mark the period, ovulation, and the days when the lining is thick. Add the hormones from the graph above the correct days and explain the order of events in two sentences.</p><p><b>Data analysis.</b> Use the table of data supplied by your teacher (day, oestrogen, progesterone) to plot a graph and answer questions about when ovulation occurs.</p><p><b>Spread of an infection.</b> Class game: each student has a sealed cup of clear liquid, one with a drop of sodium hydroxide solution as the "infection". Students exchange liquid in pairs three times. Test all cups with phenolphthalein indicator (with the teacher). Trace back who was infected first and discuss how control measures such as testing and condoms would break the chain.</p><p class="safe">Safety: teacher handles the sodium hydroxide solution (dilute); wear eye protection. No real pathogens are used.</p>`),
[["Name the hormone that causes the development of male secondary sexual characteristics and the organ that makes it.","Testosterone (1); testes (1).",2],
["State what happens to the uterus lining on days 1 to 5 of the cycle.","It breaks down (1) and leaves through the vagina (1).",2],
["State the day of ovulation in a 28-day cycle and what happens at ovulation.","About day 14 (1). An egg is released from the ovary (1).",2],
["Describe the roles of FSH and progesterone in the menstrual cycle.","FSH causes an egg to mature / stimulates oestrogen production (1). Progesterone maintains the thick uterus lining (1).",2],
["State three ways in which HIV is transmitted and two ways the spread of HIV can be controlled.","Any three from: sexual contact, shared needles, infected blood, mother to baby (3). Any two from: condoms, testing and treatment, clean needles, screening blood (2).",5]],
[M("Which hormone is made in the testes?",["Oestrogen","Testosterone","Progesterone","FSH"],1,"Testosterone comes from the testes."),
M("Ovulation happens at about day:",["1","7","14","28"],2,"In a 28-day cycle ovulation is around day 14."),
T("Name the hormone that keeps the uterus lining thick after ovulation.",["progesterone"],"Progesterone."),
M("Which hormone triggers ovulation?",["FSH","LH","Progesterone","Testosterone"],1,"The LH surge triggers ovulation."),
M("Which is a way HIV is passed on?",["Shaking hands","Sharing needles","Sharing a cup","Coughing"],1,"HIV passes through body fluids such as blood."),
T("What does AIDS stand for? Give the first word.",["acquired"],"Acquired immune deficiency syndrome."),
N("In a regular 28-day cycle an egg is released on day 14. How many days after ovulation does the cycle end?",14,"days","28 - 14 = 14 days."),
M("Which part of the body makes progesterone and oestrogen in pregnancy?",["Placenta","Pancreas","Liver","Stomach"],0,"The placenta makes both hormones in pregnancy.")],
[["Testosterone","Male sex hormone made in the testes."],
["Oestrogen","Female sex hormone from the ovaries; repairs the lining."],
["Ovulation","Release of an egg from the ovary, about day 14."],
["FSH","Stimulates egg maturation and oestrogen production."],
["LH","Causes ovulation."],
["Progesterone","Keeps the uterus lining thick."],
["HIV","Virus that infects white blood cells and may lead to AIDS."],
["Control of STIs","Condoms, testing and treatment, screening blood, clean needles."]]);

const BG_Q16=[
M("Asexual reproduction needs:",["Two parents","One parent","Gametes","Fertilisation"],1,"Only one parent."),
T("Name the part of the flower that makes pollen.",["anther"],"The anther."),
M("Which is an adaptation of a wind-pollinated flower?",["Large coloured petals","Nectar","Feathery stigma outside","Scent"],2,"It catches airborne pollen."),
N("A pollen grain nucleus has 10 chromosomes. How many are in the zygote after fertilisation?",20,"","The egg nucleus also has 10: 10 + 10 = 20."),
M("Where does fertilisation usually occur in a woman?",["Uterus","Oviduct","Vagina","Cervix"],1,"The oviduct."),
M("The placenta allows:",["Mixing of the mother's and fetal blood","Exchange of substances by diffusion","Digestion","Breathing in the fetus"],1,"The bloods stay separate."),
T("Name the hormone from the testes that develops male secondary sexual characteristics.",["testosterone"],"Testosterone."),
M("Which can pass across the placenta?",["Red blood cells","The rubella virus","Large proteins only","None"],1,"Some pathogens and toxins cross the placenta.")];

const BG_PP16=[
P("Parts of a flower",6,"<p>The diagram of a flower is not shown. Answer the following questions about an insect-pollinated flower.</p><ol type='a'><li>Name the part that makes pollen and the part that receives pollen. [2]</li><li>State <b>two</b> features that show the flower is insect-pollinated. [2]</li><li>Describe what happens in fertilisation in a flower. [2]</li></ol>",["(a) Anther makes pollen (1); stigma receives pollen (1).","(b) Any two from: large coloured petals, scent, nectar, sticky pollen, anthers and stigma inside the flower (2).","(c) A pollen tube grows down the style to the ovule (1) and the pollen nucleus fuses with the nucleus of the egg in the ovule (1)."],"Hub exam-style question (written for this hub), Topic 16"),
P("Cloning and crop production",5,"<p>A farmer grows potatoes from tubers, not from seeds.</p><ol type='a'><li>State why plants grown from tubers are genetically identical. [1]</li><li>Give <b>one</b> advantage of this for the farmer. [1]</li><li>Give <b>one</b> disadvantage of this method. [1]</li><li>Explain why sexual reproduction might be better for a wild population of plants. [2]</li></ol>",["(a) They come from one parent by asexual reproduction / mitosis (1).","(b) All have the same good features / uniform crop (1).","(c) A single disease could kill all the plants / no variation (1).","(d) It produces variation (1) so some offspring may survive a disease or a change in conditions (1)."],"Hub exam-style question (written for this hub), Topic 16"),
P("Germination of seeds",6,"<p>A student set up three tubes of cress seeds. Tube A had damp cotton wool at 20 °C. Tube B had dry cotton wool at 20 °C. Tube C had damp cotton wool at 4 °C. All were kept in the same light.</p><ol type='a'><li>State which tubes the student would expect to show germination after one week. [1]</li><li>Explain why seeds in Tube B do not germinate. [1]</li><li>Explain why seeds in Tube C germinate slowly or not at all. [2]</li><li>State <b>one</b> other condition needed for germination that is not changed in this experiment. [1]</li><li>Name the process in the seed that needs this condition to release energy. [1]</li></ol>",["(a) Tube A (1).","(b) There is no water (1).","(c) The temperature is too low (1) so enzymes work slowly / reactions are too slow (1).","(d) Oxygen (1).","(e) Aerobic respiration (1)."],"Hub exam-style question (written for this hub), Topic 16"),
P("Human fertilisation and development",7,"<p>Sperm and egg cells are specialised gametes.</p><ol type='a'><li>State <b>two</b> differences between a sperm and an egg cell. [2]</li><li>Explain how the structure of a sperm helps it to fertilise an egg. [3]</li><li>After fertilisation the embryo implants in the uterus. Describe the function of the placenta. [2]</li></ol>",["(a) Any two from: sperm is smaller; sperm can swim but egg cannot; sperm are made in millions but eggs one per month; egg has food stores (2).","(b) Tail / flagellum lets it swim (1); mitochondria release energy for swimming (1); acrosome enzymes digest the egg's jelly coat to allow entry (1).","(c) Exchange of oxygen and nutrients from mother's blood to fetal blood (1) and carbon dioxide and urea from fetus to mother (1)."],"Hub exam-style question (written for this hub), Topic 16"),
P("The menstrual cycle",6,"<p>The menstrual cycle lasts 28 days.</p><ol type='a'><li>State the day on which ovulation is most likely to occur. [1]</li><li>Name the hormone that keeps the lining of the uterus thick. [1]</li><li>Explain what happens to the uterus lining if the egg is not fertilised. [2]</li><li>Explain why periods stop during pregnancy. [2]</li></ol>",["(a) Day 14 (1).","(b) Progesterone (1).","(c) The level of progesterone falls (1) so the lining breaks down and leaves the body (1).","(d) The placenta / ovary keeps the progesterone level high (1) so the lining is maintained (1)."],"Hub exam-style question (written for this hub), Topic 16")];
BSET(16,[BG_L161,BG_L162,BG_L163,BG_L164],BG_Q16,BG_PP16);
