/* ===== Biology 9700, sections 2.3 (Proteins) and 2.4 (Water). Original diagrams from the supplied notes via ALF(). ===== */
const AC_SRC="Hub exam-style question (written for this hub), Topic 2";
const AC_TBL=(h,rows)=>`<table><tr>${h.map(x=>`<th>${x}</th>`).join("")}</tr>${rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</table>`;

/* ---- original diagrams (cropped from the supplied notes) ---- */
FIGS.AL_23_01=()=>ALF("2.3_f01","The generalised structure of an amino acid","Amino acid with a central carbon bonded to an amine group, a carboxyl group, a hydrogen atom and an R group");
FIGS.AL_23_02=()=>ALF("2.3_f02","Amino acids are bonded together by covalent peptide bonds to form a dipeptide in a condensation reaction","Two amino acids joining to make a dipeptide with a peptide bond and a molecule of water released");
FIGS.AL_23_03=()=>ALF("2.3_f03","The primary structure of a protein. The three-letter abbreviations indicate the specific amino acid (there are 20 commonly found in cells of living organisms)","A chain of amino acids labelled with three-letter abbreviations");
FIGS.AL_23_04=()=>ALF("2.3_f04","The secondary structure of a protein with the α-helix and β-pleated sheet shapes highlighted. The magnified regions illustrate how the hydrogen bonds form between the peptide bonds","Alpha helix and beta pleated sheet with hydrogen bonds between peptide bonds");
FIGS.AL_23_05=()=>ALF("2.3_f05","The tertiary structure of a protein with hydrogen bonds, ionic bonds, disulphide bonds and hydrophobic interactions formed between the R groups of the amino acids","Folded polypeptide showing hydrogen bonds, ionic bonds, disulphide bonds and hydrophobic interactions between R groups");
FIGS.AL_23_06=()=>ALF("2.3_f06","The quaternary structure of a protein. This is an example of haemoglobin which contains four subunits (polypeptide chains) working together to carry oxygen","Haemoglobin made of four polypeptide subunits");
FIGS.AL_23_07=()=>ALF("2.3_f07","Summary of bonds in proteins","Table showing which bonds occur at the primary, secondary and tertiary levels of protein structure");
FIGS.AL_23_08=()=>ALF("2.3_f08","The interactions that occur between the R groups of amino acids determine the shape and function of a protein. These interactions are found within tertiary structures of proteins","Interactions between R groups in a protein: disulphide, ionic, hydrogen and hydrophobic");
FIGS.AL_23_09=()=>ALF("2.3_f09","Globular and fibrous protein models illustrating the roughly spherical shape of globular proteins and the long, stranded shape of fibrous proteins","A compact globular protein beside a long stranded fibrous protein");
FIGS.AL_23_10=()=>ALF("2.3_f10","Comparison of globular and fibrous tertiary proteins","Table comparing globular and fibrous proteins for shape, amino acid sequence, function, examples and solubility");
FIGS.AL_23_11=()=>ALF("2.3_f11","The structure of haemoglobin showing the α-globin and β-globin subunits, and the prosthetic haem group with oxygen molecules bonded to form oxyhaemoglobin","Haemoglobin with two alpha globin and two beta globin subunits, each with a haem group binding oxygen");
FIGS.AL_23_12=()=>ALF("2.3_f12","Collagen is a fibrous structural protein formed by triple helix collagen molecules arranging into collagen fibrils and finally into collagen fibres which have high tensile strength","Three polypeptide chains forming a triple helix, then fibrils, then fibres");
FIGS.AL_23_13=()=>ALF("2.3_f13","Comparison between collagen and haemoglobin","Table comparing collagen and haemoglobin");
FIGS.AL_24_01=()=>ALF("2.4_f01","The covalent bonds of water make it a polar molecule","Water molecule with a partial negative charge on oxygen and partial positive charges on the two hydrogen atoms");
FIGS.AL_24_02=()=>ALF("2.4_f02","The polarity of water molecules allows hydrogen bonds to form between adjacent water molecules","Hydrogen bonds between the oxygen of one water molecule and a hydrogen of another");
FIGS.AL_24_03=()=>ALF("2.4_f03","Due to its polarity water is considered a universal solvent","Water molecules surrounding dissolved ions");

/* ================= 2.3 PROTEINS ================= */
const AC_L231=L("Amino acids, peptide bonds and the four levels of protein structure","What amino acids are, how a peptide bond forms, and how primary, secondary, tertiary and quaternary structure build a protein.",
`<h4>Proteins and amino acids</h4>
<p>Proteins are <b>polymers</b> (and macromolecules) made of monomers called <b>amino acids</b>. The sequence, type and number of the amino acids in a protein decide its shape, and so its function.</p>
<p>Proteins are extremely important in cells because they form all of the following:</p>
<ul><li><b>Enzymes</b></li><li>Cell membrane proteins (for example carrier proteins)</li><li>Hormones</li><li>Immunoproteins (for example immunoglobulins)</li><li>Transport proteins (for example haemoglobin)</li><li>Structural proteins (for example keratin and collagen)</li><li>Contractile proteins (for example myosin)</li></ul>
<p>There are <b>20</b> amino acids found in proteins, common to all living organisms. The general structure of every amino acid is a central carbon atom bonded to:</p>
<ul><li>an <b>amine group</b> (-NH~2~)</li><li>a <b>carboxylic acid group</b> (-COOH)</li><li>a <b>hydrogen</b> atom</li><li>an <b>R group</b>. This is how each amino acid differs, and why amino acid properties differ (for example acidic or basic, polar or non-polar).</li></ul>
{{AL_23_01}}
<h4>The peptide bond</h4>
<p>To form a <b>peptide bond</b>, a hydroxyl (-OH) is lost from the carboxylic acid group of one amino acid and a hydrogen atom is lost from the amine group of another. The remaining carbon atom (with its double-bonded oxygen) of the first amino acid bonds to the nitrogen atom of the second.</p>
<p>This is a <b>condensation reaction</b>, so water is released. The molecule formed is a <b>dipeptide</b>. When many amino acids are joined by peptide bonds the molecule is a <b>polypeptide</b>. A protein may have one polypeptide chain or several chains interacting with each other.</p>
<p>In <b>hydrolysis</b> reactions, adding water breaks the peptide bonds and polypeptides are broken down into amino acids.</p>
{{AL_23_02}}
<div class="key"><b>Examiner tip</b>You will be expected to recognise whether an unfamiliar molecule is an amino acid or a protein, so look for the functional groups (amine and carboxyl). To find a peptide bond, look for nitrogen bonded to a carbon that has a double bond to an oxygen. The R group is not involved in forming a peptide bond.</div>
<h4>Four levels of protein structure</h4>
<p>There are four levels of structure. Three relate to a single polypeptide chain and the fourth relates to a protein that has two or more polypeptide chains. Polypeptides range from 3 amino acids (glutathione) to more than 34,000 amino acids (titin).</p>
<h4>Primary structure</h4>
<p>The <b>primary structure</b> is the sequence of amino acids bonded by covalent peptide bonds. The DNA of a cell determines the primary structure by instructing the cell to add certain amino acids, in specific quantities, in a certain sequence. This affects the shape, and therefore the function, of the protein.</p>
<p>The primary structure is specific to each protein. One alteration in the sequence of amino acids can affect the function of the protein.</p>
{{AL_23_03}}
<h4>Secondary structure</h4>
<p>The <b>secondary structure</b> occurs when the weakly negative nitrogen and oxygen atoms interact with the weakly positive hydrogen atoms to form <b>hydrogen bonds</b>. Two shapes can form:</p>
<ul><li><b>α-helix:</b> hydrogen bonds form between every fourth peptide bond.</li><li><b>β-pleated sheet:</b> the protein folds so that two parts of the chain run parallel, and hydrogen bonds form between the parallel peptide bonds.</li></ul>
<p>Most fibrous proteins have secondary structures (for example collagen and keratin). Secondary structure involves only hydrogen bonds between the amino group and the carboxyl group (the protein backbone). These hydrogen bonds can be broken by high temperatures and pH changes.</p>
{{AL_23_04}}
<h4>Tertiary structure</h4>
<p>Further folding of the secondary structure leads to extra bonds forming between the R groups (side chains):</p>
<ul><li><b>Hydrogen bonds</b> between R groups</li><li><b>Disulphide bonds</b> (only between cysteine amino acids)</li><li><b>Ionic bonds</b> (between charged R groups)</li><li>Weak <b>hydrophobic interactions</b> (between non-polar R groups)</li></ul>
<p>This structure is common in globular proteins.</p>
{{AL_23_05}}
<h4>Quaternary structure</h4>
<p>The <b>quaternary structure</b> occurs in proteins that have more than one polypeptide chain working together as one functional macromolecule, for example haemoglobin. Each polypeptide chain is called a <b>subunit</b> of the protein.</p>
{{AL_23_06}}
<h4>Summary of the bonds at each level</h4>
{{AL_23_07}}
<div class="key"><b>Examiner tip</b>Learn the difference between the four levels and which bonds belong to each. Remember that hydrogen bonds in tertiary structure are between R groups, whereas in secondary structure they form between the amino and carboxyl groups.</div>`,
I("How can a chain of only 20 different amino acids make so many different proteins?",
`<ol><li>Write down the three words that describe what can differ between two polypeptides built from the same 20 amino acids (hint: sequence, type and number).</li><li>Use a string of coloured beads to model a primary structure. Make a second chain from the same beads in a different order.</li><li>Predict what would happen to the final shape of the protein if one bead in the sequence were swapped.</li></ol>`,
`<p><b>Model activity.</b> Use two colours of paper clip or beads for different R groups. Build a dipeptide model: show where water is lost (condensation) and the new peptide bond. Then fold a longer chain so that hydrogen-bonding "partners" (matching coloured beads) touch, and show the helix and sheet as two different folds. Label the four levels of structure on a poster.</p><p><b>Evaluate.</b> Suggest what your model cannot show about real proteins (for example the strength of each type of bond).</p>`,
null),
[["Name the two functional groups found in every amino acid and state what else is bonded to the central carbon atom.","Amine group (-NH~2~) (1) and carboxyl (carboxylic acid) group (-COOH) (1). A hydrogen atom and an R group are also bonded to the central carbon (1).",3],
["Describe how a dipeptide is formed from two amino acids.","A condensation reaction (1). A hydroxyl (-OH) is lost from the carboxyl group of one amino acid and a hydrogen is lost from the amine group of the other (1). A peptide bond forms between the carbon and the nitrogen (1) and water is released (1).",4],
["Define the primary structure of a protein.","The sequence (order) of amino acids (1) in a polypeptide chain, joined by peptide bonds (1).",2],
["State the two shapes in the secondary structure of a protein and name the bond that holds them in shape.","α-helix and β-pleated sheet (1). Hydrogen bonds (1) between the amino and carboxyl groups of the backbone (1).",3],
["Name three types of bond or interaction between R groups in the tertiary structure.","Any three from: hydrogen bonds, ionic bonds, disulphide bonds, hydrophobic interactions (3).",3]],
[M("What is the monomer of a protein?",["Glucose","Fatty acid","Amino acid","Nucleotide"],2,"Proteins are polymers of amino acids."),
M("Which reaction joins two amino acids?",["Hydrolysis","Condensation","Oxidation","Reduction"],1,"Water is released as the peptide bond forms."),
M("Which bond forms between the carbon of one amino acid and the nitrogen of the next?",["Hydrogen bond","Ionic bond","Peptide bond","Disulphide bond"],2,"This is the covalent peptide bond."),
M("What decides the primary structure of a protein?",["The sequence of amino acids","The number of hydrogen bonds","The pH of the cell","The shape of the cell"],0,"The primary structure is the amino acid sequence."),
M("Which level of structure is held by hydrogen bonds between the amino and carboxyl groups of the backbone?",["Primary","Secondary","Tertiary","Quaternary"],1,"The α-helix and β-pleated sheet are secondary structures."),
M("Disulphide bonds form between the R groups of which amino acid?",["Glycine","Valine","Cysteine","Proline"],2,"Cysteine is the amino acid with a sulphur atom in its R group."),
M("A protein has four polypeptide chains. Which level of structure describes how they work together?",["Primary","Secondary","Tertiary","Quaternary"],3,"The quaternary structure involves more than one polypeptide chain."),
T("What term describes each polypeptide chain in a quaternary protein?",["subunit"],"Each chain is a subunit.")],
[["Amino acid","Monomer of proteins: central carbon bonded to an amine group, a carboxyl group, a hydrogen and an R group."],
["How many amino acids are found in proteins?","20."],
["Peptide bond","Covalent bond between the carbon of a carboxyl group and the nitrogen of an amine group; formed by condensation."],
["Dipeptide / polypeptide","Two amino acids joined / many amino acids joined by peptide bonds."],
["Primary structure","The sequence of amino acids joined by peptide bonds."],
["Secondary structure","α-helix or β-pleated sheet, held by hydrogen bonds between the amino and carboxyl groups of the backbone."],
["Tertiary structure","Further folding held by bonds between R groups: hydrogen, ionic, disulphide and hydrophobic interactions."],
["Quaternary structure","Two or more polypeptide chains (subunits) working together, e.g. haemoglobin."],
["What breaks peptide bonds?","Hydrolysis: the addition of water."]]);

const AC_L232=L("Protein shape: R group interactions, globular and fibrous proteins","How bonds between R groups fold a polypeptide, and how that gives globular and fibrous proteins their different properties.",
`<h4>Interactions and protein shape</h4>
<p>A polypeptide chain folds in a particular way because of the interactions between R groups. The three-dimensional configuration that forms is the <b>tertiary structure</b>. Each of the 20 amino acids has a unique R group, so many different interactions are possible. This gives a vast range of protein shapes, and therefore functions.</p>
{{AL_23_08}}
<h4>The bonds in a tertiary structure</h4>
<table><tr><th>Bond</th><th>Where it forms</th><th>Features</th></tr>
<tr><td>Disulphide</td><td>Between two cysteine R groups (the only amino acid with a sulphur atom available in its R group)</td><td>Strong covalent bond, the strongest in a protein but less frequent; helps stabilise proteins; also called a disulphide bridge; broken by reduction; common in proteins secreted from cells, e.g. insulin</td></tr>
<tr><td>Ionic</td><td>Between positively charged (amine, -NH~3~^+^) and negatively charged (carboxylic acid, -COO^-^) R groups</td><td>Stronger than hydrogen bonds but not common; broken by pH changes</td></tr>
<tr><td>Hydrogen</td><td>Between strongly polar R groups</td><td>The weakest bonds but the most common, as they form between a wide variety of R groups</td></tr>
<tr><td>Hydrophobic interactions</td><td>Between non-polar (hydrophobic) R groups in the interior of the protein</td><td>Weak interactions</td></tr></table>
<div class="key"><b>Examiner tip</b>You need to be able to say which bonds are found in a tertiary structure and recognise them in diagrams.</div>
<h4>Globular proteins</h4>
<p><b>Globular proteins</b> are compact, roughly spherical and soluble in water. They fold into a sphere because their non-polar hydrophobic R groups point towards the centre, away from the watery surroundings, while their polar hydrophilic R groups sit on the outside. Water molecules can surround the hydrophilic groups, so globular proteins are generally soluble.</p>
<p>Solubility lets them be easily transported around organisms and take part in metabolic reactions. The folding also gives each a specific shape, so enzymes can catalyse specific reactions and immunoglobulins can respond to specific antigens. Some globular proteins are <b>conjugated proteins</b> that contain a <b>prosthetic group</b>, for example haemoglobin, which contains haem.</p>
<h4>Fibrous proteins</h4>
<p><b>Fibrous proteins</b> are long strands of polypeptide chains with cross-linkages formed by hydrogen bonds. They have little or no tertiary structure. A large number of hydrophobic R groups makes them insoluble in water.</p>
<p>They have a limited range of amino acids and a highly repetitive sequence. This makes very organised, strong structures. Together with their insolubility, this suits them to structural roles, for example <b>keratin</b> (hair, nails, horns and feathers) and <b>collagen</b> (connective tissue in skin, tendons and ligaments).</p>
{{AL_23_09}}
<h4>Comparing globular and fibrous proteins</h4>
{{AL_23_10}}
<div class="key"><b>Examiner tip</b>To tell the two types apart, learn <b>SAFES</b>: Shape, Amino acid sequence, Function, Examples and Solubility.</div>`,
I("Why are some proteins soluble in water, such as those in egg white, while others, such as the keratin in hair, are not?",
`<ol><li>Look at the SAFES table. Write one sentence for each letter comparing globular and fibrous proteins.</li><li>Predict which type of protein would be easier to wash out of a cloth with water.</li></ol>`,
`<p><b>Model activity.</b> Draw a globular protein as a circle. Colour hydrophobic R groups in the centre and hydrophilic R groups on the outside. Then draw a fibrous protein as a long rope with repeated cross-links. Write beside each drawing what the arrangement does to solubility.</p><p><b>Extension.</b> Raw egg white proteins coagulate when heated. Suggest what happens to the bonds that hold the tertiary structure.</p>`,
null),
[["Name four types of bond or interaction between R groups in a tertiary structure.","Hydrogen bonds, ionic bonds, disulphide bonds, hydrophobic interactions (any four for 4).",4],
["State which amino acid forms disulphide bonds and explain why only this amino acid can.","Cysteine (1). Its R group contains a sulphur atom (1).",2],
["Explain why globular proteins are generally soluble in water.","Hydrophobic R groups point to the centre (1) and hydrophilic (polar) R groups are on the outside (1) so water molecules can surround them (1).",3],
["Describe two structural features of fibrous proteins that make them suitable for structural roles.","Any two from: long strands of polypeptide chains (1), cross-linkages by hydrogen bonds (1), repetitive amino acid sequence giving organised, strong structures (1), insoluble because of many hydrophobic R groups (1).",2],
["Give one example of a globular protein and one of a fibrous protein.","Globular: haemoglobin, an enzyme, insulin or immunoglobulin (1). Fibrous: collagen, keratin, myosin, actin or fibrin (1).",2]],
[M("Which bond is the strongest in a tertiary structure?",["Hydrogen bond","Ionic bond","Disulphide bond","Hydrophobic interaction"],2,"Disulphide bonds are strong covalent bonds."),
M("Which bond is the most common in a tertiary structure?",["Hydrogen bond","Ionic bond","Disulphide bond","Peptide bond"],0,"Hydrogen bonds form between many types of R group."),
M("Which bond is broken by changes in pH?",["Peptide bond","Ionic bond","Disulphide bond","Covalent bond in the backbone"],1,"Ionic bonds depend on the charge on R groups."),
M("Where are the hydrophobic R groups of a globular protein found?",["Outside the protein","In the centre of the protein","Only at the ends","In the cell membrane"],1,"They face away from the water."),
M("Which statement about fibrous proteins is correct?",["Roughly spherical and soluble","Long strands and generally insoluble","Irregular sequence and soluble","Functional and spherical"],1,"They are long, strong and insoluble."),
M("Which is an example of a fibrous protein?",["Insulin","Haemoglobin","Keratin","Amylase"],2,"Keratin forms hair and nails."),
T("What name is given to a non-protein group, such as haem, that is part of a conjugated protein?",["prosthetic"],"A prosthetic group."),
M("What does SAFES help you to compare?",["Types of lipid","Globular and fibrous proteins","Types of carbohydrate","Levels of protein structure"],1,"Shape, Amino acid sequence, Function, Examples and Solubility.")],
[["Disulphide bond","Strong covalent bond between two cysteine R groups; broken by reduction."],
["Ionic bond (protein)","Between oppositely charged R groups; broken by pH changes."],
["Hydrogen bond (tertiary)","Between polar R groups; the weakest but the most common."],
["Hydrophobic interactions","Weak interactions between non-polar R groups inside the protein."],
["Globular protein","Compact, roughly spherical, generally soluble; functional roles, e.g. enzymes, haemoglobin."],
["Fibrous protein","Long strands, repetitive sequence, generally insoluble; structural roles, e.g. collagen, keratin."],
["Conjugated protein","A protein with a prosthetic group, e.g. haemoglobin with haem."],
["SAFES","Shape, Amino acid sequence, Function, Examples, Solubility."]]);

const AC_L233=L("Haemoglobin and collagen","How the structure of haemoglobin (globular) and collagen (fibrous) relates to their functions.",
`<h4>Haemoglobin: structure</h4>
<p><b>Haemoglobin</b> is a globular protein that carries oxygen in vast quantities in red blood cells. It has a <b>quaternary structure</b> because it has four polypeptide chains (subunits): two <b>α-globin</b> and two <b>β-globin</b> chains. Each subunit has a <b>prosthetic haem group</b>.</p>
<p>The four subunits are held together by bonds between them and are arranged so that hydrophobic R groups face inwards (helping preserve the three-dimensional spherical shape) and hydrophilic R groups face outwards (helping maintain solubility).</p>
<p>The arrangement of R groups is important to function. A change in the amino acid sequence of the subunits can change the properties of haemoglobin. In <b>sickle cell anaemia</b>, a base substitution causes the amino acid <b>valine</b> (non-polar) to replace <b>glutamic acid</b> (polar), making haemoglobin less soluble.</p>
<p>The haem group contains an <b>iron(II) ion (Fe^2+^)</b> which can combine reversibly with an oxygen molecule to form <b>oxyhaemoglobin</b>, which is bright red. Each haemoglobin molecule has four haem groups, so it can carry <b>four oxygen molecules</b> (eight oxygen atoms).</p>
{{AL_23_11}}
<h4>Haemoglobin: function</h4>
<p>Haemoglobin binds oxygen in the lungs and transports it to tissues for use in aerobic metabolic pathways. Oxygen is not very soluble in water but haemoglobin is, so oxygen is carried much more efficiently when bound to haemoglobin.</p>
<p>The haem group (and Fe^2+^) lets small molecules such as oxygen bind easily. As each oxygen molecule binds it alters the quaternary structure (through changes in tertiary structure), giving haemoglobin a <b>higher affinity</b> for the next oxygen molecule, which then binds more easily. The iron(II) ion also lets oxygen bind <b>reversibly</b>, because none of the amino acids in the polypeptide chains is well suited to binding oxygen.</p>
{{AL_23_06}}
<div class="key"><b>Examiner tip</b>You need to know the structure of haemoglobin and how it relates to its function (transporting oxygen).</div>
<h4>Collagen: where it is found</h4>
<p><b>Collagen</b> is the most common structural protein in vertebrates. It is a component of connective tissue and forms tendons, cartilage, ligaments, bones, teeth, skin, the walls of blood vessels and the cornea of the eye. It is an insoluble fibrous protein.</p>
<h4>Collagen: structure</h4>
<ul><li>Three polypeptide chains are held closely together by hydrogen bonds to form a <b>triple helix</b> (tropocollagen).</li><li>Each chain is a helix (not an α-helix, as it is less tightly wound) of about 1000 amino acids. <b>Glycine</b>, proline and hydroxyproline are the most common.</li><li>Almost every third amino acid is <b>glycine</b>, the smallest amino acid, whose R group is a single hydrogen atom. Glycine tends to be on the inside, so the three chains can pack closely into a tight triple helix.</li><li>As well as hydrogen bonds between the three chains, <b>covalent cross-links</b> form between R groups of amino acids in neighbouring triple helices lying parallel. These hold collagen molecules together to form <b>fibrils</b>.</li><li>The molecules are positioned in a fibril with <b>staggered ends</b>, which gives the striped (striated) pattern seen in electron micrographs.</li><li>Many fibrils arranged together form <b>collagen fibres</b>, positioned in line with the forces they resist.</li></ul>
{{AL_23_12}}
<h4>Collagen: structure and function</h4>
<ul><li>The many hydrogen bonds in the triple helix give great <b>tensile strength</b>, so collagen can withstand large pulling forces without stretching or breaking.</li><li>The staggered ends of the molecules within fibrils add strength.</li><li>Collagen is stable because the high proportion of proline and hydroxyproline gives more stability as their R groups repel each other.</li><li>The molecules are so long that they take too long to dissolve, so collagen is <b>insoluble</b> in water.</li><li>It is a flexible structural protein that forms connective tissues.</li></ul>
<h4>Comparing collagen and haemoglobin</h4>
{{AL_23_13}}
<div class="key"><b>Examiner tip</b>Understand how collagen's function relates to its structure, and know the differences between haemoglobin and collagen. The table is built on the letters of <b>NOT MAPS</b>: Number of chains, Outline (shape), Type of protein, Main function, Amino acid variation, Prosthetic group, Solubility.</div>`,
I("How does a change of one amino acid in haemoglobin cause sickle cell anaemia?",
`<ol><li>State the function of haemoglobin and the type of protein it is.</li><li>Write down what you know about the solubility of globular proteins and why it matters.</li><li>Predict the effect on solubility of replacing a polar R group with a non-polar one.</li></ol>`,
`<p><b>Data task.</b> Compare the two amino acid sequences shown below (one letter each) and find the single difference: normal β-globin begins Val-His-Leu-Thr-Pro-<b>Glu</b>-Glu-Lys; sickle cell β-globin begins Val-His-Leu-Thr-Pro-<b>Val</b>-Glu-Lys. State the amino acid change and explain the effect on the R groups and on the solubility of the protein.</p><p><b>Model activity.</b> Make a NOT MAPS poster comparing collagen and haemoglobin using the table in the notes.</p>`,
null),
[["Describe the quaternary structure of haemoglobin.","Four polypeptide chains (subunits) (1): two α-globin and two β-globin (1), each with a prosthetic haem group (1).",3],
["Explain why haemoglobin is soluble in water.","It is a globular protein with hydrophilic R groups on the outside (1) so water molecules can surround it (1).",2],
["Describe how the iron ion in haem allows oxygen to be carried and released.","Each haem group contains an Fe^2+^ ion (1) which combines reversibly with an oxygen molecule (1) forming oxyhaemoglobin (1).",3],
["Explain how a base substitution can cause sickle cell anaemia.","A base substitution changes the amino acid sequence (1): valine (non-polar) replaces glutamic acid (polar) (1) so the haemoglobin is less soluble (1).",3],
["Explain how the structure of collagen makes it suitable for its function in tendons.","Three polypeptide chains form a triple helix held by hydrogen bonds (1). Covalent cross-links between molecules form fibrils with staggered ends (1) giving high tensile strength (1). It is insoluble (1).",4]],
[M("How many polypeptide chains does a haemoglobin molecule contain?",["1","2","3","4"],3,"Two α-globin and two β-globin."),
M("Which ion is in the haem group?",["Fe^2+^","Fe^3+^","Mg^2+^","Ca^2+^"],0,"Haem contains an iron(II) ion."),
M("How many oxygen molecules can one haemoglobin molecule carry?",["1","2","4","8"],2,"There is one haem group per subunit, so four oxygen molecules (eight atoms)."),
M("In sickle cell anaemia, which amino acid replaces glutamic acid?",["Glycine","Valine","Cysteine","Proline"],1,"Valine is non-polar and glutamic acid is polar."),
M("Which amino acid occurs at almost every third position in collagen?",["Cysteine","Valine","Glycine","Glutamic acid"],2,"Glycine is the smallest amino acid."),
M("How many polypeptide chains form a collagen triple helix?",["2","3","4","6"],1,"Three chains form tropocollagen."),
M("Collagen is insoluble mainly because",["it contains a haem group","its molecules are very long and have many hydrophobic R groups","it has four subunits","it is an enzyme"],1,"Long, repetitive molecules do not dissolve in water."),
T("What name is given to a molecule of haemoglobin combined with oxygen?",["oxyhaemoglobin"],"Oxyhaemoglobin is bright red.")],
[["Haemoglobin","Globular protein in red blood cells with four subunits (2 α-globin, 2 β-globin), each with a haem group; carries oxygen."],
["Haem group","Prosthetic group containing an Fe^2+^ ion that binds oxygen reversibly."],
["Oxyhaemoglobin","Haemoglobin combined with oxygen; bright red."],
["Cause of sickle cell anaemia","Base substitution: valine (non-polar) replaces glutamic acid (polar), making haemoglobin less soluble."],
["Collagen","Fibrous structural protein: triple helix of three polypeptide chains held by hydrogen bonds, with covalent cross-links forming fibrils and fibres."],
["Why is every third amino acid in collagen glycine?","Glycine is the smallest amino acid, so the three chains pack closely into a tight helix."],
["Why is collagen strong?","Hydrogen bonds in the triple helix, covalent cross-links and staggered ends give high tensile strength."],
["NOT MAPS","Number of chains, Outline, Type of protein, Main function, Amino acid variation, Prosthetic group, Solubility."]]);

/* ================= 2.4 WATER ================= */
const AC_L241=L("Water molecules and hydrogen bonds","Why water is a polar molecule and how hydrogen bonds form between water molecules.",
`<h4>Why water matters</h4>
<p>Water is of great biological importance. It is the medium in which all metabolic reactions take place in cells, and between 70% and 95% of the mass of a cell is water. As 71% of the Earth's surface is covered in water, it is also a major habitat for organisms.</p>
<h4>Water is a polar molecule</h4>
<p>Water is made of hydrogen and oxygen. One atom of oxygen combines with two atoms of hydrogen by sharing electrons, so they are <b>covalently bonded</b>.</p>
<p>The molecule as a whole is electrically neutral, but the electrons are shared <b>unevenly</b>. The oxygen atom attracts the electrons more strongly than the hydrogen atoms do. This gives a weak negative charge (δ-) on the oxygen atom and weak positive charges (δ+) on the hydrogen atoms, and the molecule is asymmetrical in shape.</p>
<p>This separation of charge, caused by the unequal sharing of electrons in the covalent bonds, is a <b>dipole</b>. A molecule with one end negatively charged and one end positively charged is a <b>polar molecule</b>. Water is a polar molecule.</p>
{{AL_24_01}}
<h4>Hydrogen bonds between water molecules</h4>
<p>Because water is polar, <b>hydrogen bonds</b> form between the positively charged and negatively charged regions of neighbouring water molecules. A single hydrogen bond is weak, so when there are few they constantly break and reform. When large numbers are present together they form a strong structure.</p>
{{AL_24_02}}
<div class="key"><b>Examiner tip</b>Know where the hydrogen bonds form: between the oxygen of one water molecule and a hydrogen atom of another. Do not confuse them with the covalent bonds between the atoms inside a water molecule.</div>
<h4>Properties that come from hydrogen bonding</h4>
<p>Hydrogen bonds contribute to many properties of water that make it so important to living organisms:</p>
<ul><li>an excellent <b>solvent</b>: many substances dissolve in water</li><li>a relatively high <b>specific heat capacity</b></li><li>a relatively high <b>latent heat of vaporisation</b></li><li>water is <b>less dense when it is a solid</b></li><li>high <b>surface tension</b> and <b>cohesion</b></li><li>it acts as a <b>reagent</b></li></ul>
<p>The first three are explained in the next lesson.</p>`,
I("What makes water behave so differently from other small molecules?",
`<ol><li>Draw a water molecule and show the oxygen and hydrogen atoms.</li><li>Predict which end of the molecule is slightly negative and why.</li><li>List three things water does for living organisms that you already know.</li></ol>`,
`<p><b>Model activity.</b> Use paper cut-outs of water molecules (a large oxygen with δ- and two small hydrogens with δ+). Arrange several so that the positive and negative regions of neighbours attract, and mark the hydrogen bonds with dotted lines. Then mark the covalent bonds with solid lines.</p><p><b>Demonstration.</b> Float a paper clip on water and observe the surface. Link what you see to hydrogen bonding between molecules at the surface.</p>`,
null),
[["Explain why a water molecule is polar.","Electrons are shared unevenly in the covalent bonds (1) because oxygen attracts the electrons more strongly than hydrogen (1) giving a δ- charge on oxygen and δ+ on hydrogen (1).",3],
["State what is meant by a dipole.","A separation of charge (1) with one end of the molecule slightly negative and the other slightly positive (1).",2],
["Describe where hydrogen bonds form between water molecules.","Between the oxygen atom of one molecule (δ-) (1) and a hydrogen atom of another molecule (δ+) (1).",2],
["Explain why individual hydrogen bonds are described as weak, but water still has a strong structure.","Each bond is weak, so they constantly break and reform (1) but there are very large numbers of them (1) so together they form a strong structure (1).",3],
["State two properties of water that depend on hydrogen bonding.","Any two from: solvent, high specific heat capacity, high latent heat of vaporisation, less dense as a solid, high surface tension and cohesion (2).",2]],
[M("What type of bond joins hydrogen and oxygen atoms inside a water molecule?",["Hydrogen bond","Ionic bond","Covalent bond","Peptide bond"],2,"The atoms share electrons."),
M("Which part of a water molecule is slightly negative?",["Hydrogen atoms","Oxygen atom","Both hydrogens","The whole molecule"],1,"Oxygen attracts the shared electrons more strongly."),
M("Hydrogen bonds in water form between",["two hydrogen atoms","oxygen of one molecule and hydrogen of another","two oxygen atoms","atoms in the same molecule"],1,"They link neighbouring molecules."),
T("What word describes a molecule with one slightly positive end and one slightly negative end?",["polar"],"Water is a polar molecule."),
M("Approximately what percentage of the mass of a cell is water?",["10 to 20%","30 to 40%","70 to 95%","100%"],2,"Water is the major component of cells."),
M("Which is NOT a property of water caused by hydrogen bonding?",["High specific heat capacity","Cohesion","Being a good solvent for non-polar substances","High latent heat of vaporisation"],2,"Non-polar substances do not dissolve well in water.")],
[["Polar molecule","A molecule with one slightly positive and one slightly negative end (a dipole)."],
["Why is water polar?","Oxygen attracts the shared electrons more strongly than hydrogen, giving δ- on oxygen and δ+ on hydrogen."],
["Hydrogen bond (water)","Weak attraction between the δ+ hydrogen of one water molecule and the δ- oxygen of another."],
["Dipole","A separation of charge caused by unequal sharing of electrons."],
["Percentage of a cell that is water","70% to 95%."],
["Properties of water linked to hydrogen bonds","Solvent, high specific heat capacity, high latent heat of vaporisation, less dense as a solid, surface tension and cohesion, reagent."]]);

const AC_L242=L("The roles of water in living organisms","How polarity and hydrogen bonding make water a solvent, a stable habitat and a coolant.",
`<h4>Why water's properties matter</h4>
<p>Water has many essential roles in living organisms because of two things: the <b>polarity</b> of its molecules and the <b>number of hydrogen bonds</b> between them.</p>
<h4>Solvent</h4>
<p>Water is polar, so many ionic compounds (for example sodium chloride) and polar covalent substances (for example glucose) dissolve in it.</p>
<ul><li>Chemical reactions can occur in cells, because dissolved solutes are more reactive when they are free to move about.</li><li>Metabolites can be transported efficiently, except non-polar molecules, which are hydrophobic.</li></ul>
{{AL_24_03}}
<h4>High specific heat capacity</h4>
<p>The <b>specific heat capacity</b> of a substance is the amount of thermal energy needed to raise the temperature of 1 kg of the substance by 1 °C. For water it is <b>4200 J/kg °C</b>.</p>
<p>It is high because of the many hydrogen bonds. It takes a lot of thermal energy to break these bonds, and a lot is released when they form, so the temperature of water does not change greatly. This is an advantage because it:</p>
<ul><li>provides suitable habitats</li><li>allows constant temperatures to be kept within bodies and cells, so enzymes stay near their optimum temperature</li></ul>
<p>A large increase in energy is needed to raise the temperature of water.</p>
<h4>High latent heat of vaporisation</h4>
<p>To change from liquid to gas, water must absorb a large amount of thermal energy to break the hydrogen bonds and evaporate. This is an advantage because only a little water has to evaporate from the surface of an organism to lose a great amount of heat energy. It provides a <b>cooling effect</b>, for example transpiration from leaves or evaporation of sweat from the skin.</p>
<h4>Other properties in the notes' list</h4>
<ul><li><b>Less dense as a solid:</b> in ice the hydrogen bonds hold molecules apart in a lattice, so ice floats. Water under the ice stays liquid, which keeps aquatic habitats available.</li><li><b>Surface tension and cohesion:</b> hydrogen bonds hold water molecules together. This helps water move up in columns inside plants and lets small organisms walk on a water surface.</li><li><b>Reagent:</b> water takes part in reactions such as hydrolysis, and it is a reactant in photosynthesis.</li></ul>
<h4>Summary table</h4>
<table><tr><th>Property</th><th>Role in living organisms</th><th>Reason</th></tr>
<tr><td>Solvent</td><td>Allows chemical reactions to occur; transport medium</td><td>Polarity of water</td></tr>
<tr><td>High specific heat capacity</td><td>Allows water to be a suitable habitat; optimal temperature maintained within cells and bodies</td><td>Presence of many hydrogen bonds</td></tr>
<tr><td>High latent heat of vaporisation</td><td>Coolant</td><td>Presence of many hydrogen bonds</td></tr></table>
<div class="key"><b>Examiner tip</b>When you discuss the role of water in living organisms, always give the <b>why</b>, linked to its properties. For example, water is an excellent solvent <b>because</b> of the polar nature of water molecules.</div>`,
I("Why does sweating cool you down?",
`<ol><li>Write down what happens to sweat on your skin on a hot day.</li><li>Predict whether cooling would be more or less effective if water had a lower latent heat of vaporisation.</li></ol>`,
`<p><b>Investigation.</b> Wrap the bulbs of two thermometers in cotton wool. Dip one in water and keep one dry. Fan both and record the temperature every 30 seconds for five minutes. Explain the difference using latent heat of vaporisation.</p><p><b>Extension.</b> Heat equal masses of water and cooking oil on the same heater for two minutes and compare the temperature rise. Explain what this shows about specific heat capacity.</p>`,
null),
[["Explain why water is a good solvent.","Water molecules are polar (1) so they surround and attract charged ions and polar molecules (1) so they dissolve.",2],
["Define specific heat capacity.","The thermal energy needed to raise the temperature (1) of 1 kg of a substance by 1 °C (1).",2],
["Explain how the high specific heat capacity of water benefits organisms.","Many hydrogen bonds need a lot of energy to break (1) so the temperature changes only slightly (1) giving stable habitats and keeping cell temperatures near the optimum for enzymes (1).",3],
["Explain how the high latent heat of vaporisation of water helps a human to cool down.","Sweat evaporates from the skin (1). A large amount of thermal energy is needed to break the hydrogen bonds (1) so a lot of heat is lost from the body for a small amount of water (1).",3],
["State the link between hydrogen bonds and the properties of water that you need in an answer.","Many hydrogen bonds between water molecules (1) cause high specific heat capacity and high latent heat of vaporisation (1).",2]],
[M("Water is an excellent solvent because",["it is a polar molecule","it is cold","it contains covalent bonds only","it is a liquid"],0,"Polar water molecules surround ions and polar molecules."),
M("What is the specific heat capacity of water?",["420 J/kg °C","4200 J/kg °C","42 000 J/kg °C","1 J/kg °C"],1,"The value given in the notes is 4200 J/kg °C."),
M("A high specific heat capacity helps organisms because it",["lets them freeze easily","keeps temperatures stable","makes water less dense","speeds up evaporation"],1,"The temperature of water changes slowly."),
M("Which property explains the cooling effect of sweat?",["High latent heat of vaporisation","High density","High melting point","Low surface tension"],0,"A lot of energy is needed to evaporate water."),
T("Which type of bond between water molecules causes its high specific heat capacity?",["hydrogen"],"Hydrogen bonds."),
M("Which substance would NOT dissolve easily in water?",["Sodium chloride","Glucose","Non-polar molecules","Polar covalent molecules"],2,"Hydrophobic molecules do not dissolve.")],
[["Solvent role of water","Polar water dissolves ions and polar molecules so reactions occur and substances are transported."],
["Specific heat capacity","Energy needed to raise the temperature of 1 kg of a substance by 1 °C; for water 4200 J/kg °C."],
["Why is water's specific heat capacity high?","Many hydrogen bonds must be broken, so the temperature rises slowly."],
["Latent heat of vaporisation","Energy absorbed to change a liquid to a gas; high in water because hydrogen bonds must be broken."],
["Cooling effect of water","A little evaporation (sweat, transpiration) removes a lot of heat."],
["Exam tip for water","Always give the reason: link the property to polarity or hydrogen bonds."]]);

AL_L["2.3"]=[AC_L231,AC_L232,AC_L233];
AL_L["2.4"]=[AC_L241,AC_L242];

AL_Q["2.3"]=[
M("Which statement about the peptide bond is correct?",["It is a hydrogen bond between R groups","It forms by condensation between a carboxyl group and an amine group","It forms by hydrolysis","It only forms in fibrous proteins"],1,"Water is released as the carbon bonds to the nitrogen."),
M("Which bond is found at the primary structure of a protein?",["Hydrogen bond","Disulphide bond","Peptide bond","Ionic bond"],2,"The primary structure is held together by peptide bonds only."),
M("Which levels of structure contain hydrogen bonds?",["Primary only","Primary and secondary","Secondary and tertiary","Quaternary only"],2,"Secondary and tertiary structures both have hydrogen bonds (backbone and R groups)."),
M("Which is NOT a feature of a globular protein?",["Compact and roughly spherical","Hydrophilic R groups on the outside","Generally insoluble in water","Often has a functional role"],2,"Globular proteins are generally soluble."),
M("Collagen has high tensile strength mainly because",["it has a haem group","hydrogen bonds hold three chains in a triple helix and cross-links form fibrils","it is soluble","it contains disulphide bridges only"],1,"The triple helix and cross-links give strength."),
M("How many amino acids are commonly found in proteins?",["10","20","30","64"],1,"There are 20."),
M("What is a prosthetic group?",["A hydrophobic R group","A non-protein part of a conjugated protein","A disulphide bridge","A peptide bond"],1,"For example haem in haemoglobin."),
T("What type of reaction breaks a peptide bond?",["hydrolysis"],"Water is added to break the bond.")];
AL_Q["2.4"]=[
M("Which property of water makes it a good solvent for ions?",["Polarity","Density","Colour","Low boiling point"],0,"The δ+ and δ- regions attract ions."),
M("Why does water need much energy to heat up?",["Because it has few bonds","Because of many hydrogen bonds","Because it is dense","Because it is colourless"],1,"Hydrogen bonds must be broken."),
M("Which bonds form between neighbouring water molecules?",["Ionic","Peptide","Hydrogen","Disulphide"],2,"They form between δ+ hydrogen and δ- oxygen."),
M("How does sweating cool the body?",["Water has a high latent heat of vaporisation","Water has a low specific heat capacity","Water is non-polar","Salts in sweat absorb light"],0,"Evaporation removes a lot of heat."),
T("Which type of charge separation exists in a water molecule?",["dipole"],"Water is a dipole."),
M("Which property is NOT directly due to hydrogen bonding?",["Cohesion","High specific heat capacity","Water being colourless","High latent heat of vaporisation"],2,"Colour is unrelated.")];

AL_P["2.3"]=[
P("Amino acids and peptide bonds",6,
`<p>The diagram shows two amino acids with R groups R~1~ and R~2~ joining together.</p><ol type='a'><li>Name the two functional groups that react when a peptide bond forms. [2]</li><li>State the name of the reaction and the small molecule released. [2]</li><li>Name the type of reaction used to break the peptide bond and state what must be added. [2]</li></ol>`,
["(a) Carboxyl group (1) and amine group (1).","(b) Condensation (1) and water (1).","(c) Hydrolysis (1) by adding water (1)."],AC_SRC+", 2.3"),
P("Levels of protein structure",7,
`<p>A student described a protein as having an α-helix held by hydrogen bonds, and disulphide bonds between R groups.</p><ol type='a'><li>State the level of structure that contains an α-helix. [1]</li><li>State between which parts of the polypeptide the hydrogen bonds form in this level. [1]</li><li>Name the amino acid that forms disulphide bonds and explain why only this amino acid can. [2]</li><li>Explain why changing one amino acid in the primary structure may change the function of the protein. [3]</li></ol>`,
["(a) Secondary (1).","(b) Between the amino and carboxyl groups of the polypeptide backbone (1).","(c) Cysteine (1) because its R group contains sulphur (1).","(d) The sequence changes the R groups available (1), so different bonds form in tertiary structure (1) changing the 3D shape and function (1)."],AC_SRC+", 2.3"),
P("Globular and fibrous proteins",6,
`<p>Insulin and collagen are both proteins.</p><ol type='a'><li>State which is globular and which is fibrous. [1]</li><li>Explain why globular proteins are generally soluble in water. [2]</li><li>Describe three features of the structure of collagen that give it high tensile strength. [3]</li></ol>`,
["(a) Insulin is globular and collagen is fibrous (1).","(b) Hydrophilic R groups are on the outside (1) so water molecules can surround them (1).","(c) Any three from: three chains in a triple helix, hydrogen bonds between chains, covalent cross-links between molecules, staggered ends in fibrils, glycine allows tight packing, proline and hydroxyproline give stability (3)."],AC_SRC+", 2.3"),
P("Haemoglobin",7,
`<p>Haemoglobin is a globular protein found in red blood cells.</p><ol type='a'><li>State the number and type of polypeptide chains in haemoglobin. [2]</li><li>Describe the role of the haem group. [2]</li><li>Haemoglobin molecules from a person with sickle cell anaemia have valine in place of glutamic acid in a β-globin chain. Explain the effect of this change on haemoglobin. [3]</li></ol>`,
["(a) Four (1): two α-globin and two β-globin (1).","(b) Contains an iron(II) ion (1) that binds oxygen reversibly (1).","(c) Valine is non-polar and glutamic acid is polar (1) so the arrangement of R groups changes (1) and haemoglobin becomes less soluble (1)."],AC_SRC+", 2.3")];

AL_P["2.4"]=[
P("Polarity of water",6,
`<ol type='a'><li>Explain why a water molecule is a dipole. [2]</li><li>Name the type of bond that forms between neighbouring water molecules. [1]</li><li>Describe where this bond forms. [2]</li><li>Explain why water dissolves sodium chloride. [1]</li></ol>`,
["(a) Oxygen attracts electrons more than hydrogen (1) so oxygen is δ- and hydrogen is δ+ (1).","(b) Hydrogen bond (1).","(c) Between the δ+ hydrogen of one molecule (1) and the δ- oxygen of another (1).","(d) Water molecules are polar so they surround the ions (1)."],AC_SRC+", 2.4"),
P("Thermal properties of water",6,
`<p>Water has a specific heat capacity of 4200 J/kg °C.</p><ol type='a'><li>Define specific heat capacity. [2]</li><li>Calculate the energy needed to raise the temperature of 2 kg of water by 5 °C. Show your working. [2]</li><li>Explain why this property is important to aquatic organisms. [2]</li></ol>`,
["(a) The energy needed to raise the temperature (1) of 1 kg of a substance by 1 °C (1).","(b) 2 × 4200 × 5 (1) = 42 000 J (1).","(c) Water temperature changes only slowly (1) giving a stable habitat (1)."],AC_SRC+", 2.4"),
P("Water as a coolant",4,
`<p>Sweating helps mammals to lose heat.</p><ol type='a'><li>Name the property of water that makes sweating effective. [1]</li><li>Explain how sweating cools the body. [3]</li></ol>`,
["(a) High latent heat of vaporisation (1).","(b) Sweat evaporates from the skin (1), taking a large amount of heat energy to break hydrogen bonds (1) so heat is lost from the body (1)."],AC_SRC+", 2.4")];
