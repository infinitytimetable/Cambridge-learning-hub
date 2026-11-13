/* ===== bio_h: Biology 0610 Topics 17 (Inheritance) and 18 (Variation and selection). Own wording. ===== */
const BH_FG=(vb,inner,cap,label,maxw)=>`<figure class="fig"${maxw?` style="max-width:${maxw}px"`:""}><svg viewBox="${vb}" role="img" aria-label="${label}">${inner}</svg><figcaption>${cap}</figcaption></figure>`;
const BH_T=(x,y,s,o)=>{o=o||{};return `<text x="${x}" y="${y}" font-size="${o.s||11}" text-anchor="${o.a||"middle"}"${o.b?' font-weight="700"':""}${o.i?' font-style="italic"':""} ${o.c?`style="fill:${o.c}"`:'fill="currentColor"'}>${s}</text>`};
const BH_ARR=(x1,y1,x2,y2,col,w)=>{const a=Math.atan2(y2-y1,x2-x1),h=7,c=col||"currentColor";
  return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="${w||2}" fill="none"/><path d="M${x2} ${y2}l${(-h*Math.cos(a-.45)).toFixed(1)} ${(-h*Math.sin(a-.45)).toFixed(1)}M${x2} ${y2}l${(-h*Math.cos(a+.45)).toFixed(1)} ${(-h*Math.sin(a+.45)).toFixed(1)}" stroke="${c}" stroke-width="${w||2}" fill="none" stroke-linecap="round"/>`};
const BH_BOX=(x,y,w,h,lines,o)=>{o=o||{};return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" ${o.f?`style="fill:${o.f}"`:'fill="none"'} stroke="currentColor" stroke-opacity=".6" stroke-width="1.4"/>`+lines.map((t,i)=>BH_T(x+w/2,y+h/2+4-(lines.length-1)*7+i*14,t,{s:o.s||11,b:i===0&&o.b})).join("")};
const BH_CIRC=(cx,cy,r,f)=>`<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:${f||"var(--mint)"}" stroke="currentColor" stroke-opacity=".6" stroke-width="1.4"/>`;
/* chromosome drawn as a rod (mode rod), a copied X (mode x) or a hollow rod (alt) */
const BH_CH=(x,y,h,col,mode,alt)=>{
  if(mode==="x")return `<path d="M${x-4} ${y-h/2}L${x+4} ${y+h/2}M${x+4} ${y-h/2}L${x-4} ${y+h/2}" stroke="${col}" stroke-width="4" stroke-linecap="round" fill="none"/>`;
  return alt?`<rect x="${x-2.5}" y="${y-h/2}" width="5" height="${h}" rx="2.5" fill="none" stroke="${col}" stroke-width="1.6"/>`:`<rect x="${x-2.5}" y="${y-h/2}" width="5" height="${h}" rx="2.5" style="fill:${col}"/>`};
const BH_A="var(--accent)",BH_B="var(--amber,#F2A93B)";


/* diploid and haploid */
FIGS.BH_PAIRS=()=>{let s="";
  const cols=[BH_A,BH_B,"var(--blu,#2F5D8A)"],hs=[38,28,46];
  s+=BH_CIRC(95,78,60)+BH_CIRC(265,78,60);
  [-28,0,28].forEach((dx,i)=>{s+=BH_CH(95+dx-4,78,hs[i],cols[i])+BH_CH(95+dx+4,78,hs[i],cols[i]);s+=BH_CH(265+dx,78,hs[i],cols[i])});
  s+=BH_ARR(162,78,198,78)+BH_T(180,68,"meiosis",{s:9.5,i:1});
  s+=BH_T(95,156,"Diploid nucleus (2n)",{b:1})+BH_T(95,170,"pairs of chromosomes",{s:9.5})+BH_T(95,183,"human: 23 pairs = 46",{s:9.5});
  s+=BH_T(265,156,"Haploid nucleus (n)",{b:1})+BH_T(265,170,"one of each type",{s:9.5})+BH_T(265,183,"human gamete: 23",{s:9.5});
  return BH_FG("0 0 360 190",s,"A diploid cell has two sets of chromosomes, so they occur in pairs. A haploid cell, such as a gamete, has one set.","Diploid cell with three pairs of chromosomes and haploid cell with three single chromosomes",460)};

/* protein synthesis */

/* selective breeding cycle */
FIGS.BH_SELBREED=()=>{let s="";
  s+=BH_BOX(10,14,150,48,["1 Choose parents","with desirable features"],{s:10.5,f:"var(--mint)",b:1})+BH_BOX(200,14,150,48,["2 Breed them","together"],{s:10.5,f:"var(--mint)",b:1});
  s+=BH_BOX(200,118,150,48,["3 Select the offspring","with the best features"],{s:10.5,f:"var(--mint)",b:1})+BH_BOX(10,118,150,48,["4 Repeat for many","generations"],{s:10.5,f:"var(--mint)",b:1});
  s+=BH_ARR(162,38,198,38)+BH_ARR(275,64,275,116)+BH_ARR(198,142,162,142)+BH_ARR(85,116,85,64);
  s+=BH_T(180,86,"Selective breeding",{b:1,s:11})+BH_T(180,101,"e.g. higher milk yield",{s:9.5});
  return BH_FG("0 0 360 176",s,"Artificial selection: humans choose which individuals breed, and repeat this over many generations.","Cycle diagram of selective breeding: choose parents, breed, select offspring, repeat",480)};


/* ---- original diagrams from the supplied notes ---- */
FIGS.BH_B1701=()=>BIF("b17_f01","Genes are short lengths of DNA that code for a protein. Genes are found on chromosomes.","Diagram: a cell nucleus contains chromosomes; each chromosome is a long strand of DNA wrapped around proteins, and the DNA double helix carries the genes");
FIGS.BH_B1702=()=>BIF("b17_f02","Sperm cells determine the sex of the offspring.","Diagram: male and female karyotypes, then sperm carrying either an X or a Y chromosome fertilising an egg that carries an X chromosome");
FIGS.BH_B1703=()=>BIF("b17_f03","Punnett square showing the inheritance of sex.","Punnett square with father XY and mother XX giving offspring XX, XX, XY and XY, a 1 to 1 ratio of girls to boys");
FIGS.BH_B1704=()=>BIF("b17_f04","Protein synthesis: DNA is copied into mRNA in the nucleus and the mRNA is read by a ribosome in the cytoplasm.","Flow diagram of protein synthesis: DNA unwinds, a gene is copied into mRNA, the mRNA leaves the nucleus through a nuclear pore and passes through a ribosome, which assembles amino acids into a protein");
FIGS.BH_B1705=()=>BIF("b17_f05","The triplet code of DNA (carried by mRNA) is read by the ribosome and amino acids are attached together in a specific sequence to form the protein.","Close-up of a ribosome reading mRNA codons, with tRNA molecules bringing amino acids that are joined by peptide bonds into a chain");
FIGS.BH_B1706=()=>BIF("b17_f06","Only the genes whose proteins the cell needs are transcribed and translated.","Diagram of gene expression: a gene in the nucleus is copied to mRNA, which moves to the cytoplasm where a ribosome makes the protein");
FIGS.BH_B1708=()=>BIF("b17_f08","The process of cell division by mitosis.","Sequence of cells showing chromosomes copying, lining up along the centre, being pulled apart, and the cell dividing into two identical daughter cells");
FIGS.BH_B1709=()=>BIF("b17_f09","The process of cell division by meiosis to produce haploid gamete cells.","Sequence of cells showing chromosomes copying, pairing and swapping sections, then two divisions giving four haploid daughter cells");
FIGS.BH_B1710=()=>BIF("b17_f10","Alleles of a gene can carry the same instructions or different instructions. An individual can only inherit two alleles for each gene.","Three chromosome pairs showing homozygous dominant, homozygous recessive and heterozygous alleles, beside a diploid cell");
FIGS.BH_B1711=()=>BIF("b17_f11","Genetic cross of a homozygous tall plant (TT) with a homozygous short plant (tt).","Punnett square for TT crossed with tt: all four offspring are Tt and all are tall");
FIGS.BH_B1712=()=>BIF("b17_f12","Genetic cross of two heterozygous tall plants (Tt x Tt).","Punnett square for Tt crossed with Tt: offspring TT, Tt, Tt and tt, giving three tall plants to one short plant");
FIGS.BH_B1713=()=>BIF("b17_f13","Genetic cross of a heterozygous tall plant with a short plant (Tt x tt).","Punnett square for Tt crossed with tt: offspring Tt, Tt, tt and tt, giving half tall and half short");
FIGS.BH_B1714=()=>BIF("b17_f14","A family pedigree chart.","Family tree over three generations: squares are males and circles are females, with affected and unaffected individuals marked by colour");
FIGS.BH_B1715=()=>BIF("b17_f15","A test cross: the tall plant of unknown genotype is crossed with a short plant.","Two Punnett squares: TT crossed with tt gives all tall offspring, while Tt crossed with tt gives half tall and half short");
FIGS.BH_B1716=()=>BIF("b17_f16","Punnett square showing the inheritance of blood group.","Punnett square for a group A parent (IA Io) crossed with a group B parent (IB Io), with the IoIo child highlighted as group O");
FIGS.BH_B1717=()=>BIF("b17_f17","Punnett square showing the inheritance of colour blindness, an X-linked condition.","Punnett square for a normal father (XN Y) and a carrier mother (XN Xn), with the colour blind son Xn Y highlighted");

/* ---- original diagrams from the supplied notes (topic 18) ---- */
FIGS.BH_B1801=()=>BIF("b18_f01","Height is an example of continuous variation, which gives a smooth bell-shaped curve when plotted as a graph.","Histogram of the number of people in each height category with a smooth bell-shaped curve over it");
FIGS.BH_B1802=()=>BIF("b18_f02","Blood group is an example of discontinuous variation, which gives a step-shaped graph.","Bar chart of the percentage of the population in blood groups A, B, AB and O, with separate bars and no intermediates");
FIGS.BH_B1803=()=>BIF("b18_f03","Whether earlobes are attached (lobeless) or free (lobed) is an example of genetic variation.","Two ears side by side: one with a free lobe and one with an attached lobe");
FIGS.BH_B1804=()=>BIF("b18_f04","Adaptive features can be identified in images of unfamiliar organisms. This fennec fox has large ears, pale fur and furry feet.","Fennec fox labelled with large ears for heat loss and hearing, pale fur for camouflage in sand, and fur on the feet for protection from hot sand");
FIGS.BH_B1805=()=>BIF("b18_f05","Hydrophytes are adapted to live in wet conditions such as ponds.","Water plant with flat floating leaves labelled: large air spaces in leaves, flat leaves, stomata concentrated on the upper epidermis, and small roots");
FIGS.BH_B1806=()=>BIF("b18_f06","An example of a xerophyte adapted to live in extremely dry conditions such as deserts.","Cactus labelled: thick waxy cuticle, small needle-shaped leaves, thickened stem acting as a water reservoir, and a shallow extensive root system");
FIGS.BH_B1807=()=>BIF("b18_f07","Natural selection illustrated by snail shell colour.","Three panels of snails: a population with black and grey shells, a chance mutation giving a white shell, and later a population in which white-shelled snails are the majority");
FIGS.BH_B1808=()=>BIF("b18_f08","Another good example of natural selection is the evolution of the peppered moths.","Five steps showing light and dark peppered moths on tree bark: pollution darkens the trees, birds eat the more visible light moths, and dark moths become more common over time");
FIGS.BH_B1809=()=>BIF("b18_f09","The principles of natural selection show how antibiotic resistance in bacteria emerges.","Three steps: a population of bacteria with a few resistant ones, an antibiotic killing the non-resistant bacteria, and the resistant bacteria multiplying into a large population; plasmids can pass resistance genes between bacteria");
FIGS.BH_B1810=()=>BIF("b18_f10","Selective breeding in dogs.","A wolf with an arrow labelled selective breeding leading to many different breeds of dog");
FIGS.BH_B1811=()=>BIF("b18_f11","Selective breeding in crop plants.","Wild brassica in the centre with arrows to cabbage, cauliflower, broccoli, kale, kohlrabi and Brussels sprouts");


/* ================= TOPIC 17 ================= */
const BH_L1=L("Chromosomes, genes and proteins","What chromosomes, genes and alleles are, how sex is inherited, and how DNA controls the making of proteins.",
`<h4>Chromosomes, genes and alleles</h4>
<p><b>Inheritance</b> is the transmission of genetic information from generation to generation. <b>Chromosomes</b> are located in the nucleus of cells. They are thread-like structures of <b>DNA</b>, carrying genetic information in the form of genes.</p>
<p>A <b>gene</b> is a short length of DNA found on a chromosome that codes for a specific protein. This could be a structural protein such as collagen found in skin cells, an enzyme or a hormone. Genes control our characteristics because they code for proteins that play important roles in what our cells do.</p>
{{BH_B1701}}
<p><b>Alleles</b> are variations of the same gene. Humans have two copies of each chromosome (one from each parent), so they have two copies of each gene and therefore two alleles for each gene. The two alleles code for the same characteristic, but may code for different versions of it. For example, one allele for eye colour could code for brown eyes and the other for blue eyes.</p>
<div class="key"><b>Examiner tip</b>The Zoom model is always useful. Imagine a zoom lens that can zoom right out to look at a whole organism, or right in to individual molecules. Picture the chromosomes in the nucleus, then zoom in to the individual genes, and then to the bases that make up the DNA.</div>
<h4>XX and XY chromosomes</h4>
<p>Sex is determined by an entire chromosome pair, whereas most other characteristics are determined by just one gene or a number of genes. Females have the sex chromosomes <b>XX</b>. Males have the sex chromosomes <b>XY</b>.</p>
<p>Only a father can pass on a Y chromosome, so he determines the sex of the child. He produces around 250 million sperm cells during sexual intercourse, and of those:</p>
<ul><li>around half carry an X chromosome, and if one of these fertilises the egg, the fetus will be female;</li><li>the other half carry a Y chromosome, and if one of these fertilises the egg, the fetus will be male.</li></ul>
{{BH_B1702}}
<p>The inheritance of sex can be shown using a genetic diagram (a <b>Punnett square</b>), with the X and Y chromosomes taking the place of the alleles usually written in the boxes. The ratio of girls to boys is 1 : 1, so each baby has a 50% chance of being a boy and a 50% chance of being a girl.</p>
{{BH_B1703}}
<h4>DNA base sequence to amino acid sequence (Extended)</h4>
<p>The DNA code (a series of bases) is converted into proteins (a series of amino acids). Protein synthesis has two stages:</p>
<ul><li><b>transcription</b>: rewriting the base code of DNA into the bases of RNA;</li><li><b>translation</b>: using the RNA base sequence to build amino acids into a sequence in a protein.</li></ul>
<p>Therefore the sequence of bases in a gene determines the sequence of amino acids that make a specific protein. Different sequences of amino acids give different shapes and functions to protein molecules.</p>
<div class="key"><b>Examiner tip</b>It is easy to confuse sequences of bases (in DNA and RNA) with sequences of amino acids (in proteins). Be clear which large molecule you are referring to, and therefore which monomers make it up.</div>
<h4>Transcription and translation (Extended)</h4>
<p>Proteins are made by <b>ribosomes</b>, with the sequence of amino acids controlled by the sequence of bases in DNA. DNA cannot travel out of the nucleus to the ribosomes (it is far too big to pass through a nuclear pore), so the base code of each gene is transcribed onto an RNA molecule called <b>messenger RNA (mRNA)</b>.</p>
<ol><li>The mRNA moves out of the nucleus and attaches to a ribosome.</li><li>The ribosome 'reads' the code on the mRNA in groups of three bases.</li><li>Each <b>triplet</b> of bases codes for a specific amino acid.</li><li>In this way the ribosome translates the sequence of bases into the sequence of amino acids that makes up a protein.</li></ol>
{{BH_B1704}}
<p>Each <b>tRNA</b> molecule binds to, and carries, a single, specific amino acid from the cytoplasm to the ribosome for the assembly of the amino acid chain. Once the chain has been assembled, it is released from the ribosome so it can fold and form the final structure of the protein.</p>
{{BH_B1705}}
<h4>Control of gene expression (Extended)</h4>
<p><b>Expression</b> of a gene means whether that gene is transcribed and translated in a particular cell or not. Most genes are not expressed in a particular cell; they are 'switched off'. Only the genes whose proteins are vital to that cell's function are expressed ('switched on').</p>
{{BH_B1706}}
<p>In this way DNA controls cell function by controlling the production of proteins. The proteins may be enzymes, antibodies, or receptors for neurotransmitters. The other genes in a particular cell are not expressed because the cell only makes the specific proteins it needs.</p>
<h4>Haploid and diploid cells</h4>
<p>All humans have 23 different chromosomes in each cell. Human body cells, not including the gametes (sex cells), contain two copies of each chromosome, a total of 46. Nuclei with two sets of chromosomes are known as <b>diploid</b> nuclei.</p>
<p>The gametes (egg and sperm cells) have only one copy of each chromosome, a total of 23 in each cell. Nuclei with one set of unpaired chromosomes are known as <b>haploid</b> nuclei.</p>
{{BH_PAIRS}}
<div class="key"><b>Examiner tip</b>To remember the difference: <b>haploid = half</b> the normal number of chromosomes. You may be given information about a different species with a different chromosome number, so read exam questions carefully.</div>`,
I("If every cell in your body has the same DNA, why is a nerve cell so different from a muscle cell?",
`<ol><li>Write down what you already know about chromosomes, genes and DNA.</li><li>Predict how cells with identical DNA can end up with different shapes and jobs.</li><li>Draw a quick sketch to show how you think a gene leads to a protein.</li><li>Keep your sketch. You will improve it after the lesson.</li></ol>`,
`<p><b>Extract DNA from fruit.</b> Mash a few strawberries (or half a banana) in a bag with a little water, salt and washing-up liquid. Filter the mixture. Gently pour ice-cold ethanol down the side of the tube and watch the white, stringy DNA collect at the boundary. Explain why washing-up liquid is added.</p><p><b>Model the code.</b> Give each person a card with a sequence of letters (the mRNA bases). Use a key that gives a colour bead for each three-letter group. Build the protein chain and compare it with a partner who has a different sequence. What changes?</p><p><b>Sex ratio simulation.</b> Flip two coins labelled X and Y for 40 pretend babies. Record boys and girls. Combine class results and explain why the ratio is close to 1 : 1.</p><p class="safe">Safety: ethanol is flammable. Keep it away from flames and use a small volume.</p>`,
["https://learn.genetics.utah.edu/content/basics/","Explore genes and DNA at Genetic Science Learning Center"]),
[["Define a gene and an allele.","A gene is a short length of DNA that codes for a protein (1). An allele is a variation (version) of the same gene (1).",2],
["State the sex chromosomes of a human female and a human male.","Female XX (1). Male XY (1).",2],
["Explain why the chance of a baby being a boy is 50%.","All eggs carry X (1). Half of sperm carry X and half carry Y (1). A Y sperm gives a boy and each type is equally likely to fertilise the egg (1).",3],
["Describe how a gene is used to make a protein.","The gene is copied (transcribed) onto mRNA in the nucleus (1). The mRNA leaves the nucleus and attaches to a ribosome (1). The ribosome reads the mRNA in groups of three bases (triplets) (1) and each triplet codes for a specific amino acid, which is added to the chain (1).",4],
["Explain why a skin cell and a nerve cell have the same genes but different features.","Only some genes are expressed in each cell (1). Each cell makes only the proteins it needs (1).",2]],
[M("What is a chromosome made of?",["Protein only","DNA","Starch","Lipid"],1,"A chromosome is a thread-like structure of DNA."),
M("Which sex chromosomes does a human male have?",["XX","YY","XY","X only"],2,"Males are XY."),
N("How many chromosomes are in a normal human body cell?",46,"","Humans have 23 pairs, which is 46.",0),
M("What is an allele?",["A type of protein","A variation of the same gene","A part of a ribosome","A sex cell"],1,"Alleles are different versions of the same gene."),
M("Where is mRNA made?",["Ribosome","Cytoplasm","Nucleus","Cell membrane"],2,"mRNA is copied from the gene in the nucleus."),
N("How many bases in mRNA code for one amino acid?",3,"","The ribosome reads the code in triplets.",0),
T("Name the organelle where proteins are assembled from amino acids.",["ribosome"],"Ribosomes join amino acids."),
T("What term describes a nucleus with a single set of chromosomes?",["haploid"],"Haploid means one set.")],
[["Gene","A short length of DNA on a chromosome that codes for a specific protein."],
["Allele","A variation (version) of the same gene."],
["Human female / male sex chromosomes","XX for a female, XY for a male."],
["Diploid","Two sets of chromosomes, in pairs. Human: 46."],
["Haploid","One set of chromosomes. Human gamete: 23."],
["Transcription and translation","Transcription copies the DNA code onto mRNA. Translation uses mRNA to build the amino acid sequence."],
["Triplet","A group of three bases that codes for one amino acid."],
["Why do cells with the same genes differ?","Different genes are expressed, so different proteins are made."]]);

const BH_L2=L("Mitosis, meiosis and stem cells","How cells divide to make identical cells for growth and repair, and how gametes are made with half the chromosomes.",
`<h4>Mitosis: the basics (Extended)</h4>
<p>Most body cells have two copies of each chromosome, so they are <b>diploid</b>. When cells divide their chromosomes double beforehand. This ensures that when the cell splits in two, each new cell still has two copies of each chromosome (it is still diploid).</p>
<p>This type of cell division is used for growth, repair of damaged tissues, replacement of cells and asexual reproduction. It is called <b>mitosis</b>, defined as nuclear division giving rise to <b>genetically identical</b> cells.</p>
{{BH_B1708}}
<p><b>The process of mitosis</b></p>
<ul><li>Just before mitosis, each chromosome in the nucleus copies itself exactly (forming X-shaped chromosomes).</li><li>The chromosomes line up along the centre of the cell, where cell fibres pull them apart.</li><li>The cell divides into two; each new cell has a copy of each of the chromosomes.</li></ul>
<h4>Why mitosis is important and when it occurs (Extended)</h4>
<p>All the cells in the body (excluding gametes) are produced by mitosis of the zygote.</p>
<ul><li><b>Growth:</b> mitosis produces new cells, for example when a zygote divides to form an embryo.</li><li><b>Repair:</b> to replace damaged or dead cells.</li><li><b>Asexual reproduction:</b> mitosis produces offspring that are genetically identical to the parent.</li></ul>
<h4>Mitosis and stem cells (Extended)</h4>
<p>Many tissues in the human body contain a small number of unspecialised cells called <b>stem cells</b>. Stem cells divide by mitosis to produce new daughter cells that can become specialised for specific functions.</p>
<p>All stem cells originate from the zygote, which divides several times by mitosis to form a ball of unspecialised cells (roughly 150 to 200, depending on the exact stage), all of which are embryonic stem cells. These cells are initially identical, but begin to <b>differentiate</b> as the fetus develops, gradually forming the recognisable specialised tissues and features of the body.</p>
<h4>Meiosis (Extended)</h4>
<p><b>Meiosis</b> is a type of nuclear division that gives rise to cells that are genetically different. It is involved in the production of gametes (sex cells). The number of chromosomes must be halved when gametes are formed, otherwise there would be double the number of chromosomes after they join at fertilisation in the zygote.</p>
<p>This halving is why meiosis is described as a <b>reduction division</b>: the chromosome number is halved from diploid to haploid, resulting in genetically different cells. Meiosis starts with the chromosomes doubling themselves (as in mitosis) and lining up in the centre of the cell. The cell then divides twice, so only one copy of each chromosome passes to each daughter cell. Because there is a double division, each cell division by meiosis produces <b>four</b> haploid cells.</p>
{{BH_B1709}}
<ul><li>Each chromosome makes identical copies of itself (forming X-shaped chromosomes).</li><li><b>First division:</b> the chromosomes pair up along the centre of the cell, recombination occurs, and then cell fibres pull the pairs apart. Each new cell has one of each recombinant chromosome pair.</li><li><b>Second division:</b> the chromosomes line up and fibres pull them apart (as with mitosis).</li><li>A total of four haploid daughter cells are produced.</li></ul>
<p><b>Why meiosis is important:</b> it produces the gametes (sperm cells and egg cells, pollen grains and ovum), and it increases genetic variation. Meiosis forms new combinations of maternal and paternal chromosomes every time a gamete is made, so when gametes fuse randomly at fertilisation each offspring will be different from any others.</p>
<h4>Differences between mitosis and meiosis (Extended)</h4>
<table><tr><th>Mitosis</th><th>Meiosis</th></tr>
<tr><td>Two daughter cells produced</td><td>Four daughter cells produced</td></tr>
<tr><td>Daughter cells are diploid</td><td>Daughter cells are haploid</td></tr>
<tr><td>Daughter cells are genetically identical to each other and to the parent cell</td><td>Daughter cells are genetically different from each other and the parent cell</td></tr>
<tr><td>One cell division occurs</td><td>Two cell divisions occur</td></tr></table>
<div class="key"><b>Examiner tip</b>Questions on cell division often ask for differences between mitosis and meiosis. Learn two or three and be specific when giving your answer. You should also know the reasons for each type of cell division and the types of cell where each happens.</div>`,
I("A cut on your knee heals in days, yet sperm cells have only half the chromosomes of a skin cell. Which kinds of cell division are involved in each?",
`<ol><li>List the places in the body where cells are being made right now.</li><li>Decide which of these places need identical cells and which need different cells.</li><li>Suggest what would go wrong if sperm cells were made by mitosis.</li><li>Write your idea as a one-sentence prediction.</li></ol>`,
`<p><b>Model the chromosome number.</b> Use pairs of pipe cleaners in two colours as chromosomes (2n = 4). Act out mitosis: copy each one, then share the copies equally. Count the chromosomes in each daughter cell.</p><p><b>Act out meiosis.</b> Start with the same four pipe cleaners. Separate each pair so each gamete gets one of each colour. Repeat several times with different pairings and note how many different combinations appear.</p><p><b>Look at dividing cells.</b> Examine a prepared slide of an onion root tip under the microscope. Count cells that appear to be dividing and estimate the proportion. Explain why root tips are chosen.</p>`,
["https://learn.genetics.utah.edu/content/basics/","Explore genes and cell division at Genetic Science Learning Center"]),
[["State two uses of mitosis in a human.","Any two from: growth, repair, replacement of cells (1 each) (2).",2],
["Describe what happens to the chromosomes before and during mitosis.","They are copied exactly before mitosis (1). During mitosis the copies separate (1) so each daughter cell has the same number (1).",3],
["State where meiosis occurs in a human male.","In the testes (1).",1],
["Explain why meiosis must halve the chromosome number.","Gametes fuse at fertilisation (1). If they were diploid the number would double in each generation (1). Halving keeps it constant (1).",3],
["Describe one way in which a stem cell differs from a muscle cell.","A stem cell is unspecialised (1) and can divide to make cells that become specialised (1).",2]],
[M("Mitosis produces cells that are",["genetically different","genetically identical","haploid","gametes"],1,"Mitosis gives identical daughter cells."),
M("Which process produces gametes?",["Mitosis","Meiosis","Fertilisation","Osmosis"],1,"Gametes are made by meiosis."),
N("A human body cell divides by meiosis. How many chromosomes are in each gamete?",23,"","Half of 46 is 23.",0),
M("Which is NOT a use of mitosis?",["Growth","Repair","Making gametes","Asexual reproduction"],2,"Gametes come from meiosis."),
M("How many cells does one meiosis division produce?",["1","2","4","8"],2,"Four haploid cells."),
M("What happens to the chromosomes before mitosis?",["They are halved","They are copied exactly","They are lost","They are shuffled"],1,"They are replicated."),
T("What type of cell is unspecialised and divides to make specialised cells?",["stem cell","stem"],"Stem cells."),
T("What term describes cells with half the normal chromosome number?",["haploid"],"Haploid.")],
[["Mitosis","Division giving two genetically identical cells."],
["Meiosis","Reduction division giving four genetically different haploid cells."],
["Uses of mitosis","Growth, repair, replacement and asexual reproduction."],
["Stem cell","Unspecialised cell that divides and can become specialised."],
["Gamete","A sex cell: sperm or egg. It is haploid."],
["Fertilisation","Two haploid gametes fuse to make a diploid zygote."],
["Reduction division","Meiosis, where the chromosome number is halved."],
["Chromosome number in mitosis","Stays the same as the parent."]]);

const BH_L3=L("Monohybrid inheritance","How alleles are passed on, how to use genetic diagrams, and how to construct Punnett squares, read pedigrees and run a test cross.",
`<h4>Inheritance: definitions</h4>
<p><b>Inheritance</b> is the transmission of genetic information from one generation to the next. A <b>gene</b> is a short length of DNA found on a chromosome that codes for a particular characteristic. <b>Alleles</b> are versions, or forms, of a gene. Chromosomes exist in matching pairs, so individuals have two copies of each gene and therefore two alleles of each gene. One is inherited from the mother and the other from the father.</p>
<ul><li>The observable characteristics of an organism are called the <b>phenotype</b>.</li><li>The combination of alleles that control each characteristic is called the <b>genotype</b>.</li><li>A <b>dominant</b> allele only needs to be inherited from one parent for the characteristic to show in the phenotype.</li><li>A <b>recessive</b> allele needs to be inherited from both parents for the characteristic to show. If there is only one recessive allele, it stays hidden and the dominant characteristic shows.</li></ul>
<p>If the two alleles of a gene are the same, the individual is <b>homozygous</b> ('homo-' means 'the same'): either homozygous dominant (two copies of the dominant allele) or homozygous recessive. If the two alleles are different, the individual is <b>heterozygous</b> ('hetero-' means 'different'). In genetic diagrams the dominant allele is given a capital letter and the recessive allele is the lower case version of the same letter.</p>
{{BH_B1710}}
<p>It is not always possible to determine the genotype from the phenotype. A phenotype associated with a dominant allele is seen in both a homozygous dominant and a heterozygous genotype.</p>
<ul><li>Two individuals that are identically homozygous for a characteristic produce offspring with exactly the same genotype and phenotype as the parents. This is <b>pure-breeding</b>.</li><li>A heterozygous individual can pass on different alleles each time it breeds, so it can produce offspring with a different genotype and phenotype from the parents. Heterozygous individuals are <b>not</b> pure-breeding.</li></ul>
<h4>Genetic diagrams: worked examples</h4>
<p><b>Monohybrid inheritance</b> is the inheritance of characteristics controlled by a single gene (mono = one). A <b>Punnett square</b> shows the possible combinations of alleles in the offspring, from which the ratio of these combinations can be worked out.</p>
<div class="ex"><b>Worked example 1</b>The height of pea plants is controlled by a single gene with two alleles. The tall allele is dominant (T) and the short allele is recessive (t). Show the offspring when a homozygous short plant is bred with a homozygous tall plant, and the probability that any offspring will be tall.<br>The parents are homozygous, so tall = TT and short = tt. All offspring are Tt, so the probability that they are tall = 100%.</div>
{{BH_B1711}}
<div class="ex"><b>Worked example 2</b>Two of the offspring from the first cross are bred together. Show the offspring and the probability that any will be short.<br>The offspring from the first cross are all Tt. The offspring genotypes are TT, Tt, Tt, tt, so the phenotypes are 3 tall : 1 short. The probability that they are short = 25%.</div>
{{BH_B1712}}
<div class="ex"><b>Worked example 3</b>Show the results of crossing a heterozygous plant with a short plant, and the probability of the offspring being short.<br>The heterozygous parent is Tt and the short parent is tt. The offspring genotypes are Tt, Tt, tt, tt, so the phenotypes are 2 tall : 2 short. The probability that they are short = 50%.</div>
{{BH_B1713}}
<h4>Constructing Punnett squares</h4>
<p>You may be asked to give the ratio of different allele combinations in the offspring, to calculate the percentage chance of offspring showing a characteristic, or just to give the phenotypes of the offspring.</p>
<ol><li>Decide the letter used for each allele. An exam question may give it. If not, choose a relevant letter, for example E and e for eye colour.</li><li>Write down the parental genotypes.</li><li>Work out the gametes produced by each parent and add them to the Punnett square headings.</li><li>Fill in the middle four squares to work out the possible genetic combinations in the offspring.</li><li>Show clearly which individuals show each phenotype, for example with labels or colour coding.</li></ol>
<div class="key"><b>Examiner tip</b>If you choose your own letters, pick a letter whose capital and lower case forms look clearly different, so the examiner is left in no doubt which allele is dominant. C and c look alike when written by hand, whereas A and a do not.</div>
<h4>Pedigree diagrams</h4>
<p>Family <b>pedigree diagrams</b> are used to trace the pattern of inheritance of a specific characteristic (usually a disease) through the generations of a family. They can be used to work out the probability that someone in the family will inherit a genetic disorder.</p>
{{BH_B1714}}
<ul><li>Males are shown by squares and females by circles.</li><li>Affected individuals and unaffected individuals are shown in different colours (see the key).</li><li>Horizontal lines between a male and a female show that they have produced children, shown underneath the couple.</li></ul>
<p>This pedigree shows that every generation has affected individuals, that one family group has no affected parents or children, and that the other two families have one affected parent and affected children as well. If two unaffected parents have an affected child, the allele must be recessive.</p>
<h4>Identifying an unknown genotype: test cross (Extended)</h4>
<p>Breeders can use a <b>test cross</b> to find the genotype of an organism showing the dominant phenotype. The unknown individual is crossed with an individual showing the recessive phenotype, which must be homozygous recessive. The ratio of phenotypes in the offspring shows whether the unknown individual is homozygous dominant or heterozygous.</p>
<div class="ex"><b>Worked example</b>A plant breeder has a tall plant of unknown genotype. Show how to find out whether it is homozygous dominant or heterozygous.<br>The short plant must be tt. The tall parent could be TT or Tt, so two Punnett squares are needed. A homozygous tall parent gives offspring that are all Tt, so all tall. A heterozygous tall parent gives Tt or tt offspring, so 50% tall and 50% short. The presence of any short offspring shows that the unknown parent is heterozygous.</div>
{{BH_B1715}}`,
I("Two brown-eyed parents have a blue-eyed child. How is this possible?",
`<ol><li>Write what you know about dominant and recessive alleles.</li><li>Decide which allele is dominant if two brown-eyed parents can have a blue-eyed child.</li><li>List the possible genotypes of both parents and the child.</li><li>Predict the proportion of their children that would have blue eyes.</li></ol>`,
`<p><b>Coin-flip genetics.</b> Work in pairs. Each person has two coins labelled with alleles (heads = dominant A, tails = recessive a), to represent a heterozygous parent. Both flip once to give a gamete. Record the offspring genotype. Repeat 40 times and compare your results with the 1 : 2 : 1 prediction.</p><p><b>Class survey.</b> Record whether classmates can roll their tongue or have attached earlobes. Do not assume which allele is dominant for each feature without evidence.</p><p><b>Pedigree puzzle.</b> Use the pedigree provided by your teacher. Work out the genotype of each person and mark carriers.</p>`,
["https://phet.colorado.edu/","Browse PhET interactive simulations"]),
[["Define the terms homozygous and heterozygous.","Homozygous: two identical alleles (1). Heterozygous: two different alleles (1).",2],
["In pea plants tall (T) is dominant to short (t). Complete a genetic diagram for Tt × Tt and state the phenotype ratio.","Gametes T, t and T, t (1). Offspring TT, Tt, Tt, tt (1). 3 tall : 1 short (1).",3],
["Two parents without a disease have a child with the disease. Explain what this shows.","The allele for the disease is recessive (1). Both parents are heterozygous carriers (1).",2],
["Describe how a test cross identifies an unknown genotype.","Cross the individual with a homozygous recessive (1). If any offspring show the recessive phenotype it is heterozygous (1). If all show the dominant phenotype it is homozygous dominant (1).",3],
["Explain why a heterozygous individual is not pure-breeding.","It can pass on either allele (1) so offspring can have a different genotype and phenotype from the parents (1).",2]],
[M("What is the genotype of an organism?",["Its appearance","Its alleles","Its cell number","Its sex"],1,"Genotype means the alleles present."),
M("Which cross gives a 1 : 1 ratio?",["Tt × Tt","TT × tt","Tt × tt","TT × TT"],2,"Heterozygous × homozygous recessive gives half Tt and half tt."),
N("In a cross of Tt × Tt, what percentage of offspring are expected to be tt?",25,"%","One of the four boxes is tt.",0),
M("A homozygous dominant parent is crossed with a homozygous recessive parent. The offspring are",["all heterozygous","half homozygous","all homozygous recessive","3 : 1 dominant to recessive"],0,"All are Tt."),
M("In a pedigree diagram, a circle shows",["a male","a female","an affected individual","a carrier"],1,"Males are squares and females are circles."),
M("A tall plant is crossed with a short plant and some of the offspring are short. The tall parent is",["TT","Tt","tt","impossible to tell"],1,"Short offspring (tt) need a t allele from each parent, so the tall parent is Tt."),
T("What type of cross is used to find an unknown genotype?",["test cross","testcross"],"A test cross with a homozygous recessive."),
T("What word describes an individual with two identical alleles of a gene?",["homozygous"],"Homozygous.")],
[["Genotype","The combination of alleles that controls a characteristic."],
["Phenotype","The observable characteristics of an organism."],
["Homozygous","Two identical alleles of a gene."],
["Heterozygous","Two different alleles of a gene."],
["Dominant allele","Only needs to be inherited from one parent to show in the phenotype."],
["Pure-breeding","Two identical homozygous parents always give offspring like themselves."],
["Test cross","Cross with a homozygous recessive to find an unknown genotype."],
["Monohybrid inheritance","Inheritance of a characteristic controlled by a single gene."]]);

const BH_L3B=L("Codominance and sex-linked inheritance","How both alleles can show in the phenotype, how ABO blood groups are inherited, and why some conditions are more common in males.",
`<h4>Codominance (Extended)</h4>
<p><b>Codominance</b> occurs when both alleles in a heterozygous organism contribute to the phenotype. The inheritance of blood group is an example. There are three alleles of the gene that governs blood group:</p>
<ul><li>alleles I^A^ and I^B^ are codominant;</li><li>both I^A^ and I^B^ are dominant to I^o^.</li></ul>
<p>I represents the gene and the superscript A, B and o represent the alleles. I^A^ results in the production of antigen A in the blood, I^B^ results in the production of antigen B, and I^o^ results in no antigens being produced.</p>
<h4>Blood group genotypes and phenotypes (Extended)</h4>
<p>As only two alleles can be inherited by an individual (one from the mother, one from the father), the three alleles combine to give the following genotypes and phenotypes:</p>
<table><tr><th>Genotype</th><th>Phenotype</th></tr>
<tr><td>I^A^I^A^ or I^A^I^o^</td><td>A</td></tr>
<tr><td>I^B^I^B^ or I^B^I^o^</td><td>B</td></tr>
<tr><td>I^A^I^B^</td><td>AB</td></tr>
<tr><td>I^o^I^o^</td><td>O</td></tr></table>
<div class="ex"><b>Worked example</b>Show how a parent with blood group A and a parent with blood group B can produce offspring with blood group O.<br>The parent with group A must be I^A^I^o^ and the parent with group B must be I^B^I^o^. These are the only possible genotypes (rather than both being homozygous), because the child must have inherited an allele for group O from each parent. Parents with these blood groups have a 25% chance of producing a child with blood group O.</div>
{{BH_B1716}}
<h4>Sex-linked characteristics (Extended)</h4>
<p>Alleles on the same chromosome are said to be <b>linked</b>. When the alleles that control a characteristic are found on the sex chromosomes, the inheritance is described as <b>sex linked</b>. In almost all cases the alleles are on the X chromosome, as the Y chromosome is much smaller.</p>
<ul><li>Because males have only one X chromosome, they are much more likely to show sex-linked recessive conditions such as red-green colour blindness and haemophilia.</li><li>Females have two copies of the X chromosome, so they are likely to inherit one dominant allele that masks the effect of the recessive allele.</li><li>A female with one recessive allele masked in this way is a <b>carrier</b>. She does not have the condition, but she has a 50% chance of passing the allele on to her offspring. If that offspring is a male, he will have the condition.</li></ul>
<h4>Colour blindness cross (Extended)</h4>
<p>This Punnett square shows a cross between a normal male and a female who is a carrier for colour blindness.</p>
{{BH_B1717}}
<p>In this cross there is a 25% chance of producing a male who is colour blind, a 25% chance of a female carrier, a 25% chance of a normal female and a 25% chance of a normal male.</p>
<div class="key"><b>Examiner tip</b>Write the sex-linked alleles as superscripts on the X chromosome, for example X^N^ and X^n^, and always put the Y chromosome in the male's genotype with no allele on it.</div>`,
I("Why are more men than women red-green colour blind?",
`<ol><li>Write what you know about X and Y chromosomes.</li><li>Predict what happens when a gene is on the X chromosome but there is no matching gene on the Y.</li><li>Predict whether a woman or a man is more likely to show a recessive X-linked condition.</li><li>Check your prediction after the lesson.</li></ol>`,
`<p><b>Blood group puzzle.</b> Give each person a card showing a genotype (IAIA, IAIo, IBIB, IBIo, IAIB or IoIo). Find a partner and work out the possible blood groups of your children. Which pairings could give a child with group O?</p><p><b>Colour vision test.</b> If your teacher has Ishihara-style plates, test a few volunteers. Do not make anyone feel singled out. Compare the proportion of boys and girls who find the plates difficult with the class data supplied.</p><p><b>Punnett practice.</b> Construct a Punnett square for a carrier mother and a normal father. Mark the genotype and phenotype of each child.</p>`,
["https://phet.colorado.edu/","Browse PhET interactive simulations"]),
[["State what is meant by codominance.","Both alleles (1) in a heterozygote contribute to the phenotype (1).",2],
["State the possible genotypes of a person with blood group A.","I^A^I^A^ (1) or I^A^I^o^ (1).",2],
["A group A parent (I^A^I^o^) and a group B parent (I^B^I^o^) have a child. State the probability that the child has group O and explain why it can happen.","25% (1 in 4) (1). The child must inherit I^o^ from each parent (1) so both parents must be heterozygous (1).",3],
["Explain why red-green colour blindness is more common in males than in females.","The allele is recessive and on the X chromosome (1). Males have only one X so one copy of the allele causes the condition (1). Females have two X chromosomes and the dominant allele masks the recessive one (1).",3],
["A normal male and a carrier female have children. State the chance of a colour blind son.","25% (1).",1]],
[M("Which genotype gives blood group AB?",["I^A^I^A^","I^A^I^o^","I^A^I^B^","I^o^I^o^"],2,"I^A^ and I^B^ are codominant, so both are expressed."),
M("Which genotype gives blood group O?",["I^A^I^o^","I^B^I^o^","I^A^I^B^","I^o^I^o^"],3,"Group O needs two copies of I^o^."),
M("Colour blindness is more common in men because",["the allele is on the Y chromosome","men have only one X chromosome","men have more X chromosomes","it is dominant"],1,"One copy of the allele on the X is enough in men."),
N("A carrier mother and a normal father have children. What percentage of all their children are expected to be colour blind sons?",25,"%","One of the four boxes is X^n^Y.",0),
M("A female with one recessive allele that is masked by a dominant allele is called a",["donor","carrier","mutant","gamete"],1,"She is a carrier."),
M("Which blood group parents can have a child with group O?",["AB and AB","A (I^A^I^A^) and B (I^B^I^B^)","A (I^A^I^o^) and B (I^B^I^o^)","AB and O"],2,"Each parent must carry an I^o^ allele."),
T("What word describes two alleles that are both expressed in the heterozygote?",["codominant","codominance"],"Codominance."),
T("What is the name for the inheritance of genes found on the sex chromosomes?",["sex-linked","sex linked","sex linkage"],"Sex-linked inheritance.")],
[["Codominance","Both alleles in a heterozygote contribute to the phenotype."],
["ABO blood group alleles","I^A^ and I^B^ are codominant and both are dominant to I^o^."],
["Group A genotypes","I^A^I^A^ or I^A^I^o^."],
["Group O genotype","I^o^I^o^."],
["Sex-linked","Gene on a sex chromosome, usually the X, e.g. red-green colour blindness."],
["Carrier","A female with one masked recessive allele. She has a 50% chance of passing it on."],
["Why are males more often affected?","They have only one X chromosome so one recessive allele shows."],
["Carrier mother × normal father","25% colour blind son, 25% carrier daughter, 25% normal son, 25% normal daughter."]]);


/* ================= TOPIC 18 ================= */
const BH_L4=L("Variation and mutation","The differences between individuals of a species, what causes them, and how mutation creates new alleles.",
`<h4>What is variation?</h4>
<p><b>Variation</b> is defined as differences between individuals of the same species. <b>Phenotypic variation</b> is the difference in features between individuals of the same species. Some of these differences are caused by differences in genes, which is <b>genetic variation</b>.</p>
<p>Phenotypic variation can be divided into two types, depending on how you group the measurements:</p>
<ul><li><b>Continuous variation</b> is when there are very many small degrees of difference for a characteristic between individuals. They can be arranged in order and usually measured on a scale. Examples include height, mass and finger length, where there are many 'in-between' groups.</li><li><b>Discontinuous variation</b> is when there are distinct differences for a characteristic. For example, people are blood group A, B, AB or O; are male or female; or can roll their tongue or not. There are no 'in-betweens'.</li></ul>
<p>When graphs of these data are plotted, continuous variation gives a smooth <b>bell curve</b> (the result of all the small degrees of difference), whereas discontinuous variation gives a <b>step-like</b> shape.</p>
{{BH_B1801}}
{{BH_B1802}}
<h4>Genetic and environmental variation</h4>
<p>Phenotypic variation can be caused in two main ways: it can be <b>genetic</b>, controlled entirely by genes, or <b>environmental</b>, caused entirely by the environment in which the organism lives.</p>
<p><b>Genetic variation.</b> Examples in humans include blood group, eye colour, gender, the ability to roll the tongue and whether earlobes are free or fixed.</p>
{{BH_B1803}}
<p><b>Environmental variation.</b> Characteristics of all species can be affected by environmental factors such as climate, diet, accidents, culture and lifestyle. Here 'environmental' simply means 'outside of the organism'. Examples include:</p>
<ul><li>an accident may lead to scarring on the body;</li><li>eating too much and not leading an active lifestyle will cause weight gain;</li><li>being raised in a certain country will cause you to speak a certain language with a certain accent;</li><li>a plant in the shade of a big tree will grow taller to reach more light.</li></ul>
<h4>Genetic and environmental causes</h4>
<p>Discontinuous variation is usually caused by genetic variation alone. Continuous features often vary because of a combination of genetic and environmental causes. For example, tall parents pass genes for height to their children, so their children have the genetic potential to be tall. However, if their diet is poor they will not grow very well, so the environment also has an impact on their height.</p>
<table><tr><th></th><th>Continuous variation</th><th>Discontinuous variation</th></tr>
<tr><td>Groups</td><td>Many small degrees of difference, with in-betweens</td><td>Distinct groups, no in-betweens</td></tr>
<tr><td>Graph shape</td><td>Smooth bell curve</td><td>Step-like</td></tr>
<tr><td>Examples</td><td>Height, mass, finger length</td><td>Blood group, tongue rolling, sex</td></tr>
<tr><td>Cause</td><td>Genes and the environment</td><td>Usually genes alone</td></tr></table>
<h4>Mutation</h4>
<p><b>Mutations</b> are genetic changes. Most mutations have no effect on the phenotype, as the protein that a mutated gene produces may work just as well as the protein from the non-mutated gene. Rarely, a mutation leads to a new allele and so a new phenotype, and most of these have a small effect on the organism. Occasionally the new allele gives the individual a survival advantage over other members of the species. For example, a bird develops a mutation that changes its feather colours, which makes it more attractive to birds of the opposite sex. It breeds more often and has more chances of passing the mutated phenotype to the next generation.</p>
<p>Mutations can also lead to harmful changes with dramatic effects, for example sickle cell anaemia in humans. Mutations happen spontaneously and continuously, but their frequency can be increased by exposure to:</p>
<ul><li><b>ionising radiation</b> (for example gamma rays and X-rays), which can damage bonds and cause changes in base sequences;</li><li>some <b>non-ionising radiation</b> (for example ultraviolet), which can also damage bonds and change base sequences;</li><li>certain <b>chemicals</b>, for example tar in tobacco.</li></ul>
<p>Increased rates of mutation can cause cells to become cancerous, which is why the above are linked to increased incidence of different types of cancer.</p>
<h4>Sources of genetic variation (Extended)</h4>
<p>Genetic variation in populations can be caused by a variety of sources:</p>
<ul><li><b>mutations:</b> random genetic changes to the base sequence of DNA, forming new alleles;</li><li><b>meiosis:</b> new allele combinations form through segregation;</li><li><b>random mating:</b> which partnerships form for sexual reproduction;</li><li><b>random fertilisation:</b> which sperm and egg combinations occur during sexual reproduction.</li></ul>`,
I("How alike are you and your classmates, and how much of that is inherited?",
`<ol><li>List five ways in which people in your class differ.</li><li>Sort the differences into those with a range of values and those with only a few categories.</li><li>Decide for each one whether it is caused by genes, the environment or both.</li><li>Write a prediction about which type of variation is easier to change.</li></ol>`,
`<p><b>Continuous variation.</b> Measure the hand span (or the length of 30 leaves of one species). Group the results into classes and draw a histogram. Describe the shape.</p><p><b>Discontinuous variation.</b> Count how many students can roll their tongue or have attached earlobes (use class data supplied). Draw a bar chart.</p><p><b>Compare.</b> Explain why the two graphs have different shapes. Suggest how the environment might change the first measurement.</p>`,
["https://phet.colorado.edu/","Browse PhET interactive simulations"]),
[["Define variation.","Differences between individuals of the same species (1).",1],
["Describe the difference between continuous and discontinuous variation.","Continuous: very many small degrees of difference with in-between values (1). Discontinuous: distinct groups with no in-betweens (1).",2],
["Explain why height shows continuous variation while blood group shows discontinuous variation.","Height is affected by genes and the environment (1) so there are many in-between values (1). Blood group is controlled by genes only (1) and has a limited number of groups (1).",4],
["State two things that increase the rate of mutation.","Ionising radiation (1). Certain chemicals (1).",2],
["State four sources of genetic variation in a population.","Mutation (1). Meiosis (1). Random mating (1). Random fertilisation (1).",4]],
[M("Which of these shows discontinuous variation?",["Height","Body mass","ABO blood group","Finger length"],2,"Blood groups are separate categories."),
M("Continuous variation is usually caused by",["genes only","the environment only","genes and the environment","mutation only"],2,"Both contribute."),
M("What shape of graph does continuous variation give?",["A bell curve","A step-like graph","A straight line","A pie chart"],0,"Many small differences give a smooth bell curve."),
M("What is a mutation?",["A change in the environment","A genetic change","A change in diet","A type of gamete"],1,"A genetic change."),
M("Which is NOT a source of genetic variation?",["Mutation","Random fertilisation","Meiosis","Eating a better diet"],3,"Diet does not change genes."),
N("Pea seeds are either round or wrinkled. How many distinct phenotypes does this feature have?",2,"","Round and wrinkled only, so it is discontinuous.",0),
T("Name the type of radiation that can increase the mutation rate, such as X-rays.",["ionising","ionizing"],"Ionising radiation."),
T("What word describes variation caused by factors outside the organism, such as diet?",["environmental"],"Environmental variation.")],
[["Variation","Differences between individuals of the same species."],
["Continuous variation","Very many small degrees of difference; a bell curve when plotted."],
["Discontinuous variation","Distinct groups with no in-betweens; a step-like graph."],
["Genetic variation","Variation caused by differences in genes."],
["Environmental variation","Variation caused by factors outside the organism, e.g. diet and climate."],
["Mutation","A genetic change; the source of new alleles."],
["Causes of mutation","Ionising radiation, ultraviolet and some chemicals, e.g. tar in tobacco."],
["Sources of genetic variation","Mutation, meiosis, random mating and random fertilisation."]]);

const BH_L4B=L("Adaptive features, hydrophytes and xerophytes","Inherited features that help organisms survive, and how plants cope with very wet and very dry conditions.",
`<h4>Adaptations and fitness</h4>
<p><b>Adaptive features</b> are defined as inherited features that help an organism to survive and reproduce in its environment. You may be asked to describe the adaptive features of an organism using information provided, for example from images or data.</p>
{{BH_B1804}}
<p>The fennec fox lives in the desert. Its large ears allow efficient heat loss and give excellent hearing, its pale fur camouflages it against the sand, and the fur on its feet protects them from hot sand.</p>
<h4>Worked example: adaptations from data</h4>
<p>The table gives the urine concentration of several mammal species and the environments in which they live.</p>
<table><tr><th>Species</th><th>Environment</th><th>Urine concentration (milliosmoles/L)</th></tr>
<tr><td>Human</td><td>Temperate</td><td>1450</td></tr>
<tr><td>Beaver</td><td>Fresh water</td><td>480</td></tr>
<tr><td>Dolphin</td><td>Salt water</td><td>1500</td></tr>
<tr><td>Gerbil</td><td>Desert</td><td>5400</td></tr></table>
<div class="ex"><b>Suggest and explain one way in which gerbils are adapted to their environment.</b><br>Gerbils produce very concentrated urine. This allows them to conserve water by excreting less water in their urine.<br>The table shows that gerbils live in a desert and that their urine is around four times more concentrated than that of some of the other mammals. Concentrated urine means gerbils do not lose much water when they excrete urea, which lets them conserve water in an environment where water may be difficult to replace.</div>
<h4>Hydrophytes (Extended)</h4>
<p><b>Hydrophytes</b> are plants adapted to live in extremely wet conditions. Common adaptations include:</p>
<ul><li><b>large air spaces in their leaves</b> for flotation, to keep the leaves close to the surface of the water where there is more light for photosynthesis;</li><li><b>small roots</b>, as they can also extract nutrients from the surrounding water through their tissues;</li><li><b>stomata</b> that are usually open all the time and mainly on the upper epidermis of the leaf, where they can exchange gases much more easily with the air.</li></ul>
{{BH_B1805}}
<h4>Xerophytes (Extended)</h4>
<p><b>Xerophytes</b> are plants adapted to live in extremely dry conditions. Common adaptations include:</p>
<ul><li><b>thick waxy cuticle:</b> cuts down water loss in two ways, as a barrier to evaporation and because the shiny surface reflects heat, which lowers the temperature of the leaf;</li><li><b>sunken stomata:</b> stomata may be sunk in pits in the epidermis, where trapped moist air lengthens the diffusion pathway and reduces the evaporation rate;</li><li><b>leaf rolled</b> with the stomata inside and an inner surface covered in hairs: this traps moist air and prevents air movement across the stomata, which reduces transpiration;</li><li><b>small leaves:</b> many xerophytes have small, needle-shaped leaves, which reduce the surface area and therefore the evaporating surface;</li><li><b>extensive shallow roots</b> for the quick absorption of large quantities of water when it rains, or <b>deep roots</b> to reach deep water tables;</li><li><b>thickened leaves or stems</b> that contain cells that store water.</li></ul>
{{BH_B1806}}`,
I("How can an animal or plant survive where water is hard to find, or where it is everywhere?",
`<ol><li>Name an animal and a plant that live in a desert.</li><li>List features you think help each one survive.</li><li>Do the same for a plant that lives in a pond.</li><li>Predict how the pond plant and the desert plant will differ.</li></ol>`,
`<p><b>Adaptation detective.</b> Look at pictures of unfamiliar organisms supplied by your teacher. For each one, list the adaptive features you can see and say what each feature does.</p><p><b>Leaf surfaces.</b> Look at a prepared slide or a peel of leaf epidermis. Count stomata on the upper and lower surfaces of a water lily leaf and a leaf from a land plant. Explain any difference.</p><p><b>Water loss model.</b> Wrap identical damp paper towels in foil, with and without a gap, and leave them in a warm place. Compare mass lost. Link your result to the waxy cuticle of a xerophyte.</p>`,
["https://phet.colorado.edu/","Browse PhET interactive simulations"]),
[["Define the term adaptive feature.","An inherited feature (1) that helps an organism to survive and reproduce in its environment (1).",2],
["The gerbil has urine with a concentration of 5400 milliosmoles/L, compared with 1450 for humans. Suggest how this helps the gerbil.","Gerbil urine is more concentrated (1) so it loses less water when excreting urea (1) which conserves water in the desert (1).",3],
["State two adaptations of a hydrophyte and explain one of them.","Large air spaces in the leaves (1) and stomata on the upper epidermis (1). Air spaces make the leaves float near the surface where there is more light (1).",3],
["Explain how a thick waxy cuticle helps a xerophyte.","It is a barrier to evaporation (1) and the shiny surface reflects heat (1).",2],
["Explain how sunken stomata and a rolled leaf reduce water loss.","Moist air is trapped around the stomata (1) which lengthens the diffusion pathway and reduces evaporation (1). A rolled leaf with hairs stops air moving across the stomata (1) which reduces transpiration (1).",4]],
[M("Which feature is typical of a hydrophyte?",["Thick waxy cuticle","Large air spaces in the leaves","Sunken stomata","Rolled leaves"],1,"Air spaces help it float near the light."),
M("Which feature is typical of a xerophyte?",["Stomata on the upper epidermis","Thin cuticle","Needle-shaped leaves","Large air spaces"],2,"Small needle-shaped leaves reduce surface area."),
M("In a hydrophyte, stomata are mainly on the",["lower epidermis","upper epidermis","roots","stem only"],1,"They are on the upper surface, in contact with air."),
M("Why do sunken stomata reduce water loss?",["They trap moist air","They open wider","They close at night only","They make the leaf thicker"],0,"Trapped moist air lengthens the diffusion pathway."),
M("A cactus stores water in its",["thickened stem","leaves","flowers","seeds"],0,"The thickened stem is a water reservoir."),
N("Gerbil urine is 5400 milliosmoles/L and human urine is 1450. About how many times more concentrated is gerbil urine? (nearest whole number)",4,"","5400 ÷ 1450 is about 3.7, so about 4.",0),
T("What word describes an inherited feature that helps survival?",["adaptive","adaptation"],"An adaptive feature."),
T("What name is given to plants adapted to live in very dry conditions?",["xerophyte","xerophytes"],"Xerophytes.")],
[["Adaptive feature","An inherited feature that helps an organism survive and reproduce in its environment."],
["Hydrophyte","A plant adapted to wet conditions, e.g. a water lily."],
["Hydrophyte features","Large air spaces for flotation, small roots, stomata on the upper epidermis."],
["Xerophyte","A plant adapted to very dry conditions, e.g. a cactus."],
["Thick waxy cuticle","Barrier to evaporation; shiny surface reflects heat."],
["Sunken stomata","Trap moist air, lengthen the diffusion pathway, reduce evaporation."],
["Needle-shaped leaves","Reduce the surface area for water loss."],
["Xerophyte roots and stems","Extensive shallow or deep roots; thickened stems or leaves store water."]]);

const BH_L5=L("Natural selection and adaptation","How the best adapted individuals survive and pass on their alleles, and how this leads to adaptation, evolution and antibiotic resistance.",
`<h4>Natural selection</h4>
<p>In any environment, the individuals with the best adaptive features are the ones most likely to survive and reproduce. This results in <b>natural selection</b>:</p>
<ol><li>Individuals in a species show a range of <b>variation</b> caused by differences in genes.</li><li>When organisms reproduce, they produce <b>more offspring</b> than the environment is able to support.</li><li>This leads to competition for food and other resources, which results in a <b>struggle for survival</b>.</li><li>Individuals with characteristics most suited to the environment have a higher chance of survival and more chances to reproduce.</li><li>The alleles for these characteristics are therefore passed to their offspring at a higher rate than those for characteristics less suited to survival.</li><li>In the next generation there will be a greater number of individuals with the better adapted variations.</li></ol>
<p>This theory of natural selection was put forward by Charles Darwin and became known as 'survival of the fittest'.</p>
<h4>An example of natural selection: snails</h4>
{{BH_B1807}}
<ul><li>Within the population of snails there is variation in shell colour. The normal shell colours of this species are black or grey (first picture).</li><li>Chance mutations lead to a small number of snails, or one snail, having a white shell (second picture, where there are fewer white-shelled snails than black or grey ones).</li><li>The white-shelled snails survive longer. This is 'survival of the fittest': some organisms succeed in the competitive struggle for survival against other members of their population.</li><li>They survive longer because they are better camouflaged, so they are less likely to be seen by predators and eaten.</li><li>As they survive longer they get more opportunities to reproduce, so the allele for white shells is passed on more frequently than the alleles for black or grey shells.</li><li>Over generations this is repeated until the majority of snails in the population have white shells.</li></ul>
<h4>Another example: peppered moths</h4>
{{BH_B1808}}
<ol><li>There is variation within the peppered moth population. Light moths outnumber dark moths.</li><li>Pollution leads to darker bark on the trees. This environmental change benefits the dark moths, which now have the ability to camouflage against the bark.</li><li>Dark moths are now more likely to survive and reproduce, passing on their alleles for a dark phenotype to their offspring.</li><li>Light moths are now more likely to be eaten by birds, and less likely to reproduce.</li><li>Over time there is a gradual increase in the proportion of dark moths.</li></ol>
<div class="key"><b>Examiner tip</b>You cannot be familiar with every example of natural selection, but they all follow the same sequence. Within a species there is always variation and chance mutation, so some individuals develop a phenotype that gives them a survival advantage. They live longer, breed more and are more likely to pass on their genes. Repeated over generations, the new phenotype becomes the norm. It is the concept you have to understand, not the specific example.</div>
<h4>Adaptation by natural selection (Extended)</h4>
<p>If the environment does not change, selection does not change. If the environment changes, or a chance mutation produces a new allele, selection might favour individuals with different characteristics or with the new allele. The individuals that survive and reproduce then have a different set of alleles to pass on to their offspring. Over time this changes the characteristics of the species, which is <b>evolution</b>.</p>
<p><b>Evolution</b> is defined as the change in adaptive features of a population over time as a result of natural selection. Natural selection results in <b>adaptation</b>: over generations, the features that are better adapted to the environment become more common. This means populations become better suited to their environment.</p>
<h4>Antibiotic resistance in bacteria (Extended)</h4>
<p>A good example of this is the development of antibiotic resistance by bacteria.</p>
{{BH_B1809}}
<ol><li>In a population of bacteria, some may have antibiotic resistance.</li><li>When exposed to an antibiotic, the bacteria causing illness are killed, as well as healthy gut bacteria. The resistant bacteria survive.</li><li>With reduced competition for nutrients, the antibiotic-resistant bacteria multiply, forming a larger population that is difficult to control.</li></ol>
<p>Plasmids with antibiotic-resistance genes can be shared between bacteria of the same and different species.</p>`,
I("How could a few resistant bacteria cause an infection that medicines can no longer treat?",
`<ol><li>Write what you know about bacteria and antibiotics.</li><li>Suggest what would happen if a patient stopped taking antibiotics too early.</li><li>Predict what the next generation of bacteria would be like.</li><li>Draw a flow chart to show your idea.</li></ol>`,
`<p><b>Bead selection model.</b> Scatter 100 beads (50 white, 50 coloured) on a patterned cloth. Act as predators for 20 seconds and remove as many as you can. Count what is left. The survivors reproduce: add one bead of the same colour for each survivor. Repeat three times and graph the proportions.</p><p><b>Peppered moth model.</b> Cut out light and dark paper moths and scatter them on light and dark backgrounds. Let a partner 'predate' for 15 seconds on each. Which colour survives best on each background? What would happen if the background changed?</p><p><b>Debate.</b> Should farmers use antibiotics on healthy animals? Use evidence about resistance to argue.</p>`,
["https://phet.colorado.edu/","Browse PhET interactive simulations"]),
[["Describe how natural selection takes place.","Variation within the species (1). More offspring are produced than the environment can support (1) so there is a struggle for survival (1). Better adapted individuals survive and reproduce (1) and pass on their alleles (1).",5],
["Explain how antibiotic resistant bacteria arise.","Some bacteria have a resistance allele (from a mutation) (1). The antibiotic kills the non-resistant bacteria (1). The resistant bacteria survive and reproduce (1) and pass on the allele (1).",4],
["Use the peppered moth example to explain natural selection.","Pollution darkens the bark so dark moths are better camouflaged (1). Dark moths are more likely to survive and reproduce (1). They pass on the allele for dark colour (1). The proportion of dark moths increases over time (1).",4],
["Define evolution.","The change in adaptive features of a population over time (1) as a result of natural selection (1).",2],
["State what is meant by the term adaptation.","Over generations (1) features that are better adapted to the environment become more common (1).",2]],
[M("In natural selection, which individuals are more likely to reproduce?",["The largest","Those best adapted","The oldest","Those with most mutations"],1,"The better adapted."),
M("Why does a struggle for survival occur?",["Organisms make more offspring than the environment can support","Organisms never reproduce","There is no variation","Alleles never change"],0,"Resources are limited."),
M("In the snail example, white-shelled snails survive longer because they are",["larger","better camouflaged","faster","older"],1,"Predators see them less easily."),
M("Antibiotic resistance in bacteria arises from",["the antibiotic changing the bacteria","a random mutation","bacteria learning","a poor diet"],1,"Mutation makes the allele."),
M("Who put forward the theory of natural selection?",["Gregor Mendel","Charles Darwin","Louis Pasteur","Robert Hooke"],1,"Charles Darwin."),
M("What can carry antibiotic-resistance genes between bacteria?",["Plasmids","Ribosomes","Mitochondria","Chloroplasts"],0,"Plasmids can be shared between bacteria."),
T("What is the change in adaptive features of a population over time, due to natural selection?",["evolution"],"Evolution."),
T("What type of organism develops resistance to antibiotics?",["bacteria","bacterium"],"Bacteria.")],
[["Natural selection","Better adapted individuals survive, reproduce and pass on their alleles."],
["Struggle for survival","Competition for food and other resources, as more offspring are produced than the environment can support."],
["Survival of the fittest","Some organisms succeed in the competitive struggle against others in their population."],
["Steps of natural selection","Variation, many offspring, struggle for survival, survival of the best adapted, alleles passed on."],
["Evolution","The change in adaptive features of a population over time as a result of natural selection."],
["Adaptation","Over generations, features better suited to the environment become more common."],
["Antibiotic resistance","Resistant bacteria survive the antibiotic, reproduce and form a large population."],
["Peppered moths","Dark bark favours dark moths, so the proportion of dark moths rises."]]);

const BH_L5B=L("Selective breeding","How humans choose which animals and plants breed, and how this compares with natural selection.",
`<h4>Selective breeding</h4>
<p><b>Selective breeding</b> (artificial selection) means selecting individuals with desirable characteristics and breeding them together. The process does not stop there, because not all of the offspring will show the desired characteristics. Offspring that do show them are selected and bred together.</p>
{{BH_SELBREED}}
<p>This has to be repeated for many successive generations before you can say you have a 'new breed' that reliably shows the selected characteristics in all offspring.</p>
<h4>Selective breeding in domesticated animals</h4>
<p>An example is dog breeders, who select which dogs can mate together to increase the likelihood of puppies with desirable characteristics, for example coat colour. This has given rise to the many recognisable dog breeds of today. They are all the same species (<i>Canis familiaris</i>) and all descended from one breed.</p>
{{BH_B1810}}
<h4>Selective breeding in crop plants</h4>
<p>Plants are selectively bred by humans for the development of many characteristics, including:</p>
<ul><li>disease resistance in food crops;</li><li>increased crop yield;</li><li>hardiness to weather conditions (for example drought tolerance);</li><li>better tasting fruits.</li></ul>
<p>Wild brassica has been selectively bred in multiple ways. It has given rise to cauliflower, cabbage, broccoli, Brussels sprouts, kale and kohlrabi.</p>
{{BH_B1811}}
<h4>Artificial and natural selection compared (Extended)</h4>
<table><tr><th>Natural selection</th><th>Artificial selection</th></tr>
<tr><td>Occurs naturally</td><td>Only occurs when humans intervene</td></tr>
<tr><td>Results in populations with features that are better adapted to their environment and survival</td><td>Results in populations with features that are useful to humans and not necessarily to the survival of the individual</td></tr>
<tr><td>Usually takes a long time to occur</td><td>Takes less time, as only individuals with the desired features are allowed to reproduce</td></tr></table>`,
I("The cabbage, broccoli and kale on your plate all come from one wild plant. How can that be?",
`<ol><li>Name three vegetables you know that look very different.</li><li>Suggest how people could have produced such different plants from one ancestor.</li><li>Predict how many generations this might take.</li><li>Check your prediction after the lesson.</li></ol>`,
`<p><b>Breed the best plant.</b> Using a table of 10 pretend wheat plants with scores for yield and disease resistance, choose parents and use dice to decide offspring scores. Do three generations. Did the average score rise?</p><p><b>Dog breeds.</b> Choose two dog breeds. List the features that people selected for in each and say how selection could have produced them.</p><p><b>Compare.</b> Draw a table comparing selective breeding of dairy cattle with natural selection of a wild population.</p>`,
["https://phet.colorado.edu/","Browse PhET interactive simulations"]),
[["Describe how selective breeding could produce cows that give more milk.","Select cows with high milk yield and breed them (1). Select offspring with high yield and breed from them (1). Repeat over many generations (1).",3],
["State two characteristics for which crop plants are selectively bred.","Disease resistance (1). Increased yield (1). (Hardiness to weather and better tasting fruits are also accepted.)",2],
["State two differences between natural and artificial selection.","Natural occurs naturally but artificial only when humans intervene (1). Natural gives features better adapted to survival but artificial gives features useful to humans (1).",2],
["Explain why selective breeding must be repeated for many generations.","Not all offspring show the desired characteristics (1) so those that do are selected and bred again (1) until all offspring reliably show them (1).",3],
["Name the wild plant from which cabbage and broccoli were bred.","Wild brassica (1).",1]],
[M("Who decides which organisms breed in artificial selection?",["The environment","Predators","Humans","Disease"],2,"Humans choose."),
M("Which is a crop plant produced by selective breeding of wild brassica?",["Wheat","Cauliflower","Potato","Rice"],1,"Cauliflower, cabbage, broccoli, kale, kohlrabi and Brussels sprouts."),
M("Which step is NOT part of selective breeding?",["Choose parents with desired features","Breed them together","Select the best offspring and breed again","Wait for the environment to select the survivors"],3,"That is natural selection."),
M("All dog breeds belong to",["different species","one species","three species","no species"],1,"They are all one species, Canis familiaris."),
M("Compared with natural selection, artificial selection usually takes",["less time","more time","exactly the same time","no time"],0,"Only chosen individuals are allowed to reproduce."),
N("In a cross of Tt × tt, what percentage of offspring are expected to show the recessive phenotype?",50,"%","Half are tt.",0),
T("What is the term for humans selecting which individuals breed?",["selective breeding","artificial selection"],"Selective breeding."),
T("Name the wild plant that gave rise to cabbage, kale and broccoli.",["brassica","wild brassica"],"Wild brassica.")],
[["Selective breeding","Humans choose which individuals breed to get desired features."],
["Steps of selective breeding","Select parents, breed, select offspring with the desired features, repeat for many generations."],
["Dog breeds","Many breeds, one species, all descended from one breed."],
["Crop characteristics","Disease resistance, increased yield, hardiness, better tasting fruits."],
["Wild brassica","Gave cauliflower, cabbage, broccoli, Brussels sprouts, kale and kohlrabi."],
["Natural selection vs artificial","The environment chooses vs humans choose."],
["Artificial selection features","Useful to humans, not necessarily to the survival of the individual."],
["Speed of selection","Artificial is quicker; natural usually takes a long time."]]);

const BHQ="Hub exam-style question (written for this hub), Topic ";
BSET(17,[BH_L1,BH_L2,BH_L3,BH_L3B],
[M("Chromosomes are made mainly of",["protein","DNA","carbohydrate","fat"],1,"One long DNA molecule."),
M("A gene is",["a sex cell","a length of DNA that codes for a protein","a type of chromosome","a copy of mRNA"],1,"That is the definition."),
N("How many pairs of chromosomes are in a human diploid cell?",23,"","46 chromosomes make 23 pairs.",0),
M("Which chromosomes does a human female have?",["XY","XX","YY","X"],1,"Females are XX."),
M("Which process produces genetically identical cells?",["Meiosis","Mitosis","Fertilisation","Mutation"],1,"Mitosis."),
M("An organism with the genotype Tt is",["homozygous dominant","homozygous recessive","heterozygous","pure-breeding"],2,"Two different alleles."),
N("Two heterozygous parents (Aa × Aa) have 80 offspring. How many are expected to show the recessive phenotype?",20,"","One quarter of 80 is 20.",0),
T("What does mRNA carry from the nucleus to the ribosome?",["copy of the gene","code","genetic information","instructions","message","gene"],"mRNA is a copy of a gene.")],
[P("Chromosomes, gametes and fertilisation",6,"<p>A human skin cell contains 46 chromosomes.</p><ol type='a'><li>State the number of chromosomes in a human sperm cell. [1]</li><li>Define the term <b>gene</b>. [2]</li><li>State the name of the type of cell division that produces sperm cells. [1]</li><li>Explain why sperm cells must have half the number of chromosomes of a skin cell. [2]</li></ol>",
["(a) 23 (1).","(b) A length of DNA (1) that codes for a protein (1).","(c) Meiosis (1).","(d) The sperm fuses with an egg at fertilisation (1), so the zygote has the full diploid number. Without halving, the number would double each generation (1)."],BHQ+"17"),
P("How a protein is made",5,"<ol type='a'><li>State where in a cell a gene is found. [1]</li><li>Describe how the information in a gene is used to make a protein. [4]</li></ol>",
["(a) In the nucleus (1).","(b) A copy of the gene, mRNA, is made in the nucleus (1). The mRNA moves to the cytoplasm and passes through a ribosome (1). The ribosome joins amino acids together (1) in an order determined by the sequence of bases in the mRNA (1)."],BHQ+"17"),
P("Inheritance of sex",5,"<ol type='a'><li>Draw a genetic diagram to show how the sex of a baby is inherited. Include the parents' genotypes, the gametes and the offspring. [3]</li><li>A couple already have two daughters. State the probability that their third child is a girl. [1]</li><li>Explain your answer to <b>(b)</b>. [1]</li></ol>",
["(a) Parents XX and XY (1). Gametes X, X and X, Y (1). Offspring XX, XX, XY, XY (1).","(b) 50% (or 1 in 2) (1).","(c) Each fertilisation is independent, and an X sperm and a Y sperm are equally likely to fertilise the egg (1)."],BHQ+"17"),
P("Tall and short pea plants",8,"<p>In pea plants, the allele for tall stems (T) is dominant to the allele for short stems (t). A tall plant was crossed with a short plant. Half of the offspring were tall and half were short.</p><ol type='a'><li>State the genotype of the short parent. [1]</li><li>Deduce the genotype of the tall parent. [1]</li><li>Draw a genetic diagram to show the cross. [3]</li><li>State the term for a cross used to find an unknown genotype. [1]</li><li>The cross produces 60 offspring. Calculate the number of tall plants expected. [2]</li></ol>",
["(a) tt (1).","(b) Tt (1), because short offspring must have received a t allele from each parent.","(c) Gametes T and t from the tall parent and t from the short parent (1). Offspring Tt and tt (1). 1 tall : 1 short (1).","(d) Test cross (1).","(e) 60 ÷ 2 (1) = 30 (1)."],BHQ+"17"),
P("ABO blood groups",6,"<p>The gene for ABO blood group has three alleles: I^A^, I^B^ and I^o^. A man with blood group A (genotype I^A^I^o^) and a woman with blood group B (genotype I^B^I^o^) have a child.</p><ol type='a'><li>State the term used when both I^A^ and I^B^ are expressed in a person with blood group AB. [1]</li><li>Draw a genetic diagram to show the possible genotypes of the child. [3]</li><li>State the probability that the child has blood group O. [1]</li><li>State all the blood groups the child could have. [1]</li></ol>",
["(a) Codominance (1).","(b) Gametes I^A^, I^o^ and I^B^, I^o^ (1). Offspring I^A^I^B^, I^A^I^o^, I^B^I^o^, I^o^I^o^ (1). All four boxes correct (1).","(c) 25% (1 in 4) (1).","(d) A, B, AB and O (1)."],BHQ+"17")]);

BSET(18,[BH_L4,BH_L4B,BH_L5,BH_L5B],
[M("Variation means",["differences between individuals of a species","the same features in a species","changes in the weather","a type of gamete"],0,"Variation is difference."),
M("Which shows continuous variation?",["Blood group","Seed shape in peas","Body mass","Seed colour in peas"],2,"Body mass has a range."),
M("Discontinuous variation is usually caused by",["genes only","the environment only","both equally","mutation only"],0,"Genes only."),
M("Which can increase the rate of mutation?",["Ionising radiation","Vitamins","Exercise","Sleep"],0,"Radiation and some chemicals."),
M("An inherited feature that helps an organism survive is called",["an adaptive feature","a habit","a mutation","a gamete"],0,"Adaptive feature."),
N("In a population of 200 bacteria, 6 are resistant to an antibiotic. After the antibiotic kills all the others, how many bacteria are left to reproduce?",6,"","Only the resistant ones survive.",0),
M("Which is a feature of a xerophyte?",["Stomata on the upper surface","Large air spaces","Thick waxy cuticle","Thin cuticle"],2,"Reduces water loss."),
T("What is the term for humans choosing which organisms breed?",["selective breeding","artificial selection"],"Selective breeding.")],
[P("Types of variation",5,"<ol type='a'><li>Define the term <b>variation</b>. [1]</li><li>State which of height and ABO blood group shows continuous variation. [1]</li><li>Explain why one of these shows continuous variation and the other shows discontinuous variation. [2]</li><li>State one environmental factor that can affect a person's height. [1]</li></ol>",
["(a) Differences between individuals of the same species (1).","(b) Height (1).","(c) Height is affected by genes and the environment, giving a range of values (1). Blood group is controlled by genes only and has a limited number of groups with no intermediates (1).","(d) Diet (nutrition) (1)."],BHQ+"18"),
P("Mutation",4,"<ol type='a'><li>Describe what is meant by a gene mutation. [2]</li><li>State two factors that increase the rate of mutation. [2]</li></ol>",
["(a) A random change (1) in the sequence of bases in DNA (1).","(b) Ionising radiation (1). Some chemicals (1)."],BHQ+"18"),
P("Antibiotic resistance",6,"<ol type='a'><li>Explain how a population of antibiotic resistant bacteria develops. [4]</li><li>Suggest two ways to slow the development of antibiotic resistance. [2]</li></ol>",
["(a) A mutation gives a bacterium resistance (1). The antibiotic kills the non-resistant bacteria (1). The resistant bacterium survives and reproduces (1). It passes on the resistance allele so the proportion of resistant bacteria increases (1).","(b) Only use antibiotics when necessary (1). Always finish the full course (1)."],BHQ+"18"),
P("Selective breeding of cattle",6,"<p>A farmer wants cattle that produce more milk.</p><ol type='a'><li>Describe how selective breeding could be used to produce cattle with a higher milk yield. [4]</li><li>State one difference between natural selection and selective breeding. [1]</li><li>Suggest one disadvantage of selective breeding. [1]</li></ol>",
["(a) Choose cows with the highest milk yield and breed them with bulls from high-yielding mothers (1). Select the offspring with the highest yield (1). Breed from these (1). Repeat over many generations (1).","(b) In natural selection the environment selects but in selective breeding humans select (1).","(c) It reduces genetic variation, so a disease could affect all the animals (1)."],BHQ+"18"),
P("Adaptive features of a cactus",5,"<ol type='a'><li>Define the term <b>adaptive feature</b>. [2]</li><li>A cactus is a xerophyte. Explain how three features of a xerophyte help it to survive. [3]</li></ol>",
["(a) An inherited feature (1) that helps an organism survive and reproduce in its environment (1).","(b) A thick waxy cuticle reduces water loss by evaporation (1). Stomata sunken in pits trap humid air so less water vapour diffuses out (1). Few stomata or spines (or a rolled leaf) reduce the surface area for water loss (1)."],BHQ+"18")]);
