/* ===== Group F: Topic 11 (Organic chemistry) lessons, rebuilt from the teacher's notes (own wording) ===== */
const F_SUBS="₀₁₂₃₄₅₆₇₈₉";
const F_U=s=>String(s).replace(/~(\d+)~/g,(m,d)=>d.split("").map(c=>F_SUBS[+c]).join(""));
const F_T=(x,y,s,o)=>{o=o||{};return `<text x="${x}" y="${y}" font-size="${o.s||11}" text-anchor="${o.a||"middle"}"${o.b?' font-weight="700"':""}${o.i?' font-style="italic"':""} ${o.c?`style="fill:${o.c}"`:'fill="currentColor"'}>${F_U(s)}</text>`};
const F_FG=(vb,inner,cap,label,maxw)=>`<figure class="fig"${maxw?` style="max-width:${maxw}px"`:""}><svg viewBox="${vb}" role="img" aria-label="${label}">${inner}</svg><figcaption>${cap}</figcaption></figure>`;
const F_ARR=(x1,y1,x2,y2,col,w)=>{const a=Math.atan2(y2-y1,x2-x1),h=7,c=col||"currentColor";
  return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="${w||2}" fill="none"/><path d="M${x2} ${y2}l${(-h*Math.cos(a-.45)).toFixed(1)} ${(-h*Math.sin(a-.45)).toFixed(1)}M${x2} ${y2}l${(-h*Math.cos(a+.45)).toFixed(1)} ${(-h*Math.sin(a+.45)).toFixed(1)}" stroke="${c}" stroke-width="${w||2}" fill="none"/>`};
const F_BOX=(x,y,w,h,lines,o)=>{o=o||{};const n=lines.length,ty=y+h/2-(n-1)*7+4;return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" ${o.f?`style="fill:${o.f}"`:'fill="none"'} stroke="currentColor" stroke-opacity=".6" stroke-width="1.4"/>`+lines.map((l,i)=>F_T(x+w/2,ty+i*14,l,{s:o.s||11,b:i==0&&!o.nb})).join("")};
const F_CAP=(html,cap)=>html.replace("</figure>",`<figcaption>${cap}</figcaption></figure>`);
const F_DF=(chain,eL,eR,label,cap)=>F_CAP(DF(chain,eL,eR,label),cap);
const F_H2=[["C","H","H"],["C","H","H"]];

/* displayed formulae of the four main families */
FIGS.F_FAM=()=>`<div class="figs">`+
 F_DF(F_H2,"H","H","Displayed formula of ethane","Ethane (alkane): C–C only")+
 F_DF([["C","H","H",2],["C","H","H"]],null,null,"Displayed formula of ethene","Ethene (alkene): C=C")+
 F_DF([["C","H","H"],["C","H",["O","H"]]],"H","H","Displayed formula of ethanol","Ethanol (alcohol): –OH")+
 F_DF([["C","H","H"],["C","=O",["O","H"]]],"H",null,"Displayed formula of ethanoic acid","Ethanoic acid: –COOH")+`</div>`;

/* structural isomers */
FIGS.F_ISO=()=>`<div class="figs">`+
 F_DF([["C","H","H"],["C","H","H"],["C","H","H"],["C","H","H"]],"H","H","Displayed formula of butane","Butane")+
 F_DF([["C","H","H"],["C","CH3","H"],["C","H","H"]],"H","H","Displayed formula of methylpropane","Methylpropane")+
 F_DF([["C","H","H",2],["C","H",null],["C","H","H"],["C","H","H"]],null,"H","Displayed formula of but-1-ene","But-1-ene")+
 F_DF([["C","H","H"],["C","H",null,2],["C","H",null],["C","H","H"]],"H","H","Displayed formula of but-2-ene","But-2-ene")+`</div>`;

/* fractionating column */
FIGS.F_FRAC=()=>{
  const fr=[["Refinery gas","heating, cooking"],["Gasoline","petrol for cars"],["Naphtha","chemicals"],["Kerosene","jet fuel"],["Diesel","diesel engines"],["Fuel oil","ships, heating"],["Lubricating oil","lubricants, waxes"],["Bitumen","road surfaces"]];
  let s=`<defs><linearGradient id="fgrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--blu)"/><stop offset="1" style="stop-color:var(--red)"/></linearGradient></defs>`;
  s+=`<rect x="150" y="8" width="70" height="214" rx="8" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="132" y="8" width="10" height="214" rx="3" fill="url(#fgrad)"/>`;
  fr.forEach((f,i)=>{const y=26+i*26;s+=`<path d="M150 ${y}H220" stroke="currentColor" stroke-opacity=".35"/><path d="M220 ${y}H236" stroke="currentColor" stroke-width="1.4"/>`+F_T(242,y+4,f[0],{a:"start",b:1,s:11})+F_T(330,y+4,f[1],{a:"start",s:9.5,i:1})});
  s+=F_T(6,22,"cooler: top",{a:"start",s:10.5,b:1,c:"var(--blu)"})+F_T(6,36,"small molecules",{a:"start",s:10})+F_T(6,49,"low boiling point",{a:"start",s:10})+F_T(6,62,"runny, volatile",{a:"start",s:10});
  s+=F_T(6,176,"large molecules",{a:"start",s:10})+F_T(6,189,"high boiling point",{a:"start",s:10})+F_T(6,202,"thick, not volatile",{a:"start",s:10})+F_T(6,216,"hotter: bottom",{a:"start",s:10.5,b:1,c:"var(--red)"});
  s+=F_T(6,114,"Crude oil",{a:"start",s:11,b:1})+F_T(6,127,"heated, vapour in",{a:"start",s:10})+F_ARR(100,134,148,142,"currentColor",1.8);
  return F_FG("0 0 420 232",s,"Fractional distillation: fractions with the lowest boiling points leave at the cooler top, the largest molecules condense at the hot bottom.","Fractionating column with eight fractions from refinery gas at the top to bitumen at the bottom",460);
};

/* substitution */
FIGS.F_SUBST=()=>`<div class="figs">`+
 F_DF([["C","H","H"]],"H","H","Displayed formula of methane","Methane, CH₄")+
 F_DF([["C","H","H"]],"Cl","H","Displayed formula of chloromethane","Chloromethane, CH₃Cl (one H replaced by Cl, in UV light)")+`</div>`;

/* cracking */
FIGS.F_CRACK=()=>{let s="";
  s+=F_BOX(8,52,92,46,["Decane","C~10~H~22~"],{f:"var(--mint)"});
  s+=F_ARR(106,75,176,75,"currentColor",2)+F_T(141,64,"600–700 °C",{s:10})+F_T(141,94,"hot catalyst",{s:10})+F_T(141,106,"alumina or silica",{s:9.5});
  s+=F_BOX(184,10,168,48,["Octane, C~8~H~18~","shorter alkane: petrol"],{f:"var(--mint)"});
  s+=F_T(268,80,"+",{s:18,b:1});
  s+=F_BOX(184,92,168,48,["Ethene, C~2~H~4~","alkene: polymers, ethanol"],{f:"var(--peach)"});
  return F_FG("0 0 360 150",s,"Cracking splits a long, less useful alkane into a shorter alkane and an alkene. The split is random, so the products vary.","Decane cracked into octane and ethene",420);};

/* addition reactions */
FIGS.F_ADD=()=>{let s="";
  const rows=[["CH~2~=CH~2~ + Br~2~","bromine water","CH~2~BrCH~2~Br","1,2-dibromoethane"],["CH~2~=CH~2~ + H~2~","nickel catalyst","CH~3~CH~3~","ethane"],["CH~2~=CH~2~ + H~2~O(g)","acid catalyst","CH~3~CH~2~OH","ethanol"]];
  rows.forEach((r,i)=>{const y=30+i*58;s+=F_T(8,y,r[0],{a:"start",s:12,b:1})+F_ARR(150,y-4,206,y-4,"currentColor",2)+F_T(178,y-12,r[1],{s:9.5})+F_T(214,y,r[2],{a:"start",s:12,b:1,c:"var(--accent)"})+F_T(214,y+14,r[3],{a:"start",s:10,i:1})});
  return F_FG("0 0 360 176",s,"Ethene adds bromine, hydrogen or steam across its C=C bond. Each reaction gives a single product.","Three addition reactions of ethene",420);};

/* alcohols displayed */
FIGS.F_ALC=()=>`<div class="figs">`+
 F_DF([["C","H",["O","H"]]],"H","H","Displayed formula of methanol","Methanol, CH₃OH")+
 F_DF([["C","H","H"],["C","H",["O","H"]]],"H","H","Displayed formula of ethanol","Ethanol, C₂H₅OH")+
 F_DF([["C","H","H"],["C","H","H"],["C","H",["O","H"]]],"H","H","Displayed formula of propan-1-ol","Propan-1-ol: OH on carbon 1")+
 F_DF([["C","H","H"],["C","H",["O","H"]],["C","H","H"]],"H","H","Displayed formula of propan-2-ol","Propan-2-ol: OH on carbon 2")+`</div>`;

/* two routes to ethanol */
FIGS.F_ETOH=()=>{let s="";
  s+=F_T(8,18,"Hydration of ethene",{a:"start",b:1,s:12,c:"var(--accent)"});
  s+=F_BOX(8,28,90,36,["Ethene + steam"],{nb:1});s+=F_ARR(104,46,196,46,"currentColor",2)+F_T(150,36,"300 °C, 60 atm",{s:9.5})+F_T(150,60,"H₃PO₄ catalyst",{s:9.5})+F_BOX(202,28,150,36,["Pure ethanol (continuous)"],{nb:1});
  s+=F_T(8,100,"Fermentation of glucose",{a:"start",b:1,s:12,c:"var(--pur)"});
  s+=F_BOX(8,110,90,36,["Glucose + yeast"],{nb:1});s+=F_ARR(104,128,196,128,"currentColor",2)+F_T(150,118,"25–35 °C",{s:9.5})+F_T(150,142,"no oxygen",{s:9.5})+F_BOX(202,110,150,36,["Dilute ethanol + CO₂ (batch)"],{nb:1});
  return F_FG("0 0 360 158",s,"Two ways to make ethanol. Hydration is fast and gives pure ethanol from a non-renewable source. Fermentation is slow, uses renewable sugar and makes a dilute solution.","Hydration of ethene versus fermentation of glucose",420);};

/* esterification */
FIGS.F_ESTER=()=>{let s="";const ac="var(--purbg)",al="var(--mint)";
  s+=F_BOX(4,22,96,44,["Ethanoic acid","CH₃COOH"],{f:ac})+F_T(110,48,"+",{s:18,b:1})+F_BOX(120,22,96,44,["Ethanol","C₂H₅OH"],{f:al});
  s+=F_T(256,30,"conc. H₂SO₄",{s:9.5})+F_T(256,80,"catalyst",{s:9.5})+`<path d="M230 40H282" stroke="currentColor" stroke-width="2"/><path d="M276 34l8 6-8 6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M230 52H282" stroke="currentColor" stroke-width="2"/><path d="M236 46l-8 6 8 6" fill="none" stroke="currentColor" stroke-width="2"/>`;
  s+=`<rect x="292" y="22" width="104" height="44" rx="7" style="fill:var(--purbg)"/><rect x="348" y="22" width="48" height="44" rx="7" style="fill:var(--mint)"/><rect x="292" y="22" width="104" height="44" rx="7" fill="none" stroke="currentColor" stroke-opacity=".6" stroke-width="1.4"/>`+F_T(319,48,"CH₃COO",{s:10.5,b:1})+F_T(372,48,"C₂H₅",{s:10.5,b:1});
  s+=F_T(344,82,"+ water",{s:10.5,b:1})+F_T(344,96,"ethyl ethanoate",{s:10,i:1});
  s+=F_T(4,118,"Name = alcohol part first (ethyl), then acid part (ethanoate).",{a:"start",s:10.5});
  s+=F_T(4,134,"The formula is written the other way round: acid part first.",{a:"start",s:10.5,i:1});
  return F_FG("0 0 400 142",s,"Esterification: an acid and an alcohol join, losing water. The reaction is reversible.","Ethanoic acid and ethanol forming ethyl ethanoate and water",460);};

/* poly(ethene) */
FIGS.F_POLY=()=>{let s="";const ln=(a,b,c,d,w)=>`<path d="M${a} ${b}L${c} ${d}" stroke="currentColor" stroke-width="${w||1.6}"/>`,at=(x,y,t)=>F_T(x,y+5,t,{s:15});
  /* monomer */
  s+=at(38,70,"C")+at(92,70,"C")+ln(50,67,80,67)+ln(50,73,80,73)+at(38,30,"H")+ln(38,40,38,58)+at(38,110,"H")+ln(38,82,38,100)+at(92,30,"H")+ln(92,40,92,58)+at(92,110,"H")+ln(92,82,92,100);
  s+=F_ARR(120,70,158,70,"currentColor",2)+F_T(139,58,"n",{s:13,i:1,b:1})+F_T(65,136,"ethene (monomer)",{s:10.5});
  /* repeat unit */
  s+=`<path d="M184 22H176V118H184" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M322 22H330V118H322" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
  s+=ln(160,70,200,70)+at(214,70,"C")+ln(226,70,266,70)+at(278,70,"C")+ln(290,70,342,70)+at(214,30,"H")+ln(214,40,214,58)+at(214,110,"H")+ln(214,82,214,100)+at(278,30,"H")+ln(278,40,278,58)+at(278,110,"H")+ln(278,82,278,100);
  s+=F_T(338,122,"n",{s:13,i:1,b:1})+F_T(246,136,"repeat unit",{s:10.5});
  return F_FG("0 0 360 146",s,"The C=C of each monomer becomes C–C. The bonds that stick out of the brackets join one repeat unit to the next.","Many ethene molecules forming poly(ethene) with the repeat unit in brackets",440);};

/* block diagrams of condensation polymers */
function F_BLOCKS(unitA,unitB,nameA,nameB,l1,l2,cap,label){
  let s="",x=8;const bw=54,bh=30,y=24,ca="var(--mint)",cb="var(--purbg)";
  const seq=[[nameA,ca],[l1],[nameB,cb],[l2],[nameA,ca],[l1],[nameB,cb]];
  seq.forEach(it=>{if(it.length==2){s+=`<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="5" style="fill:${it[1]}" stroke="currentColor" stroke-opacity=".6"/>`+F_T(x+bw/2,y+19,it[0],{s:10.5,b:1});x+=bw}else{s+=`<path d="M${x} ${y+bh/2}h30" stroke="currentColor" stroke-width="1.6"/>`+F_T(x+15,y+bh/2-5,it[0],{s:9.5,b:1,c:"var(--accent)"});x+=30}});
  s+=F_T(8,88,unitA,{a:"start",s:10.5})+F_T(8,103,unitB,{a:"start",s:10.5})+F_T(8,118,"Each link formed releases one molecule of water.",{a:"start",s:10.5,i:1});
  return F_FG("0 0 "+(x+8)+" 126",s,cap,label,440);
}
FIGS.F_NYLON=()=>F_BLOCKS("Green block: dicarboxylic acid, HOOC–[ ]–COOH","Purple block: diamine, H₂N–[ ]–NH₂","acid","amine","CONH","NHCO","Nylon is a polyamide. Acid and amine blocks alternate and are joined by amide links.","Section of nylon drawn as alternating blocks joined by amide links");
FIGS.F_PET=()=>F_BLOCKS("Green block: dicarboxylic acid, HOOC–[ ]–COOH","Purple block: diol, HO–[ ]–OH","acid","diol","COO","OCO","PET is a polyester. Acid and diol blocks alternate and are joined by ester links.","Section of PET drawn as alternating blocks joined by ester links");
FIGS.F_PROT=()=>{let s="",x=8;const bw=40,bh=30,y=20;
  for(let i=0;i<4;i++){s+=`<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="5" style="fill:${i%2?"var(--purbg)":"var(--mint)"}" stroke="currentColor" stroke-opacity=".6"/>`+F_T(x+bw/2,y+19,"R"+(i+1),{s:11,b:1});x+=bw;if(i<3){s+=`<path d="M${x} ${y+15}h40" stroke="currentColor" stroke-width="1.6"/>`+F_T(x+20,y+10,"CONH",{s:9.5,b:1,c:"var(--accent)"});x+=40}}
  s+=F_T(8,76,"Each block is an amino acid,",{a:"start",s:10.5})+F_T(8,90,"H₂N–CH(R)–COOH, with its own side chain R.",{a:"start",s:10.5})+F_T(8,106,"Links between blocks: peptide (amide) links.",{a:"start",s:10.5,i:1});
  return F_FG("0 0 "+(x+8)+" 114",s,"A section of protein: amino acids joined by peptide links, losing one water per link.","Protein drawn as amino acid blocks joined by peptide links",440);};

/* ====================== LESSONS ====================== */
const F_L1=L("Organic formulae, homologous series and naming","Carbon compounds, the four ways to write a formula, functional groups, general formulae, isomers and the naming rules.",
`<h4>What is organic chemistry?</h4>
<p>Organic compounds are compounds of <b>carbon</b>. By convention, carbon dioxide, carbon monoxide and metal carbonates are left out. A <b>hydrocarbon</b> contains hydrogen and carbon atoms only. Because carbon forms four covalent bonds and bonds strongly to other carbons, it builds an enormous number of different molecules.</p>
<h4>Ways of writing a formula</h4>
<ul><li><b>Molecular formula:</b> the actual number of each atom, for example C~2~H~6~O.</li><li><b>General formula:</b> a rule that fits a whole family, such as C~n~H~2n+2~.</li><li><b>Displayed formula:</b> every atom and every bond is drawn.</li></ul>
{{F_FAM}}
<p>Each carbon in a displayed formula must have exactly four bonds. A quick check is the best way to catch a missing hydrogen.</p>
<h4>Structural formulae <i>(Extended only)</i></h4>
<p>A structural formula shows just enough to make the structure clear and leaves out most single bonds. Double and triple bonds are always shown. Identical groups are bracketed and side groups sit in brackets.</p>
<ul><li>Butane: CH~3~CH~2~CH~2~CH~3~</li><li>Methylpropane: CH~3~CH(CH~3~)CH~3~</li><li>But-1-ene: CH~2~=CHCH~2~CH~3~</li></ul>
<h4>Homologous series and functional groups</h4>
<p>A <b>homologous series</b> is a family of compounds with the same <b>functional group</b>, the group of atoms that decides how the compounds react.</p>
<table><tr><th>Family</th><th>Functional group</th><th>Name ends</th><th>General formula</th></tr>
<tr><td>Alkane</td><td>C–C only</td><td>–ane</td><td>C~n~H~2n+2~</td></tr>
<tr><td>Alkene</td><td>C=C</td><td>–ene</td><td>C~n~H~2n~</td></tr>
<tr><td>Alcohol</td><td>–OH</td><td>–anol</td><td>C~n~H~2n+1~OH</td></tr>
<tr><td>Carboxylic acid</td><td>–COOH</td><td>–anoic acid</td><td>C~n~H~2n+1~COOH</td></tr>
<tr><td>Ester</td><td>–COO–</td><td>–yl …–anoate</td><td>(not required)</td></tr></table>
<div class="ex"><b>Worked example</b>An alcohol has 5 carbon atoms. Hydrogens in the chain = 2 × 5 + 1 = 11, plus the one in –OH. Formula: C~5~H~11~OH.<br>An alkene with 10 carbons has 2 × 10 = 20 hydrogens: C~10~H~20~.</div>
<h4>Features of a homologous series <i>(Extended only)</i></h4>
<ul><li>The same general formula and functional group.</li><li>Similar chemical properties.</li><li>A steady change in physical properties such as boiling point (ethanol 78 °C, propanol 97 °C).</li><li>Each member differs from the next by one CH~2~.</li></ul>
<h4>Saturated and unsaturated</h4>
<p><b>Saturated</b> compounds have only single C–C bonds (alkanes). <b>Unsaturated</b> compounds have at least one C=C double bond (alkenes).</p>
<div class="key"><b>Memory trick</b>Saturated = Single bonds only. Unsaturated = doUble bond present.</div>
<h4>Structural isomers <i>(Extended only)</i></h4>
<p>Structural isomers have the <b>same molecular formula</b> but <b>different structural formulae</b>. C~4~H~10~ has two isomers and C~4~H~8~ (alkenes) has the straight-chain pair below, as well as methylpropene.</p>
{{F_ISO}}
<h4>Naming organic compounds</h4>
<p>A name has a <b>stem</b> (number of carbons in the longest chain) and an <b>ending</b> (the functional group).</p>
<table><tr><th>Carbons</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr><tr><td>Stem</td><td>meth</td><td>eth</td><td>prop</td><td>but</td><td>pent</td><td>hex</td></tr></table>
<p>Examples: propene (3 C, C=C), pentanol (5 C, –OH), butanoic acid (4 C, –COOH).</p>
<h4>Numbering and esters <i>(Extended only)</i></h4>
<ul><li>When the group can sit on more than one carbon, a number says which: propan-1-ol, propan-2-ol, but-1-ene, but-2-ene. Number from the end that gives the lowest number.</li><li>Carboxylic acids need no number because the –COOH carbon is always carbon 1.</li><li>An <b>ester</b> is named from the alcohol (–yl) first and the acid (–oate) second: methyl ethanoate, ethyl ethanoate.</li></ul>
<div class="key"><b>Exam tip</b>Ethene is the first alkene because you need two carbons to make C=C. There is no methene.</div>`,
I("How can a few simple rules describe thousands of carbon compounds?",
`<ol><li>Using molecular model kits, build every molecule you can with the formula C~4~H~10~ and C~4~H~8~. How many different structures can you make?</li><li>For each molecule draw the displayed formula and check that every carbon has four bonds.</li><li>Sort your molecules into those with only single bonds and those with a double bond.</li><li>Write the name of each one using the stem and ending rules.</li></ol>`,
`<p><b>Pattern hunt.</b> Build methane, ethane, propane and butane. Complete a table of carbons, hydrogens and CH~2~ differences. Use the table to predict the formula of the alkane with 8 carbons, then check against C~n~H~2n+2~.</p><p><b>Family sort.</b> Cut out 12 cards of formulae and names (for example CH~3~CH~2~OH, ethanoic acid, propene). Group them by functional group and annotate the group in colour.</p>`,
["https://phet.colorado.edu/en/simulations/build-a-molecule","PhET: Build a Molecule simulation"]),
[["State the general formula of the alkanes and use it to give the formula of the alkane with 6 carbon atoms.","C~n~H~2n+2~ (1). C~6~H~14~ (1).",2],
["Draw the displayed formula of ethene and state why it is unsaturated.","Two carbons joined by C=C, each with two hydrogens (1). It contains a carbon–carbon double bond (1).",2],
["Give the formula of the alcohol with 4 carbon atoms.","C~4~H~9~OH (1).",1],
["Name the compound CH~3~CH~2~CH~2~COOH.","Butanoic acid (1).",1],
["Explain what is meant by structural isomers. (Extended)","Same molecular formula (1) but different structural formulae (1).",2],
["Draw and name two isomers of C~4~H~10~. (Extended)","Butane, straight chain of four carbons (1). Methylpropane, a three-carbon chain with a CH~3~ side group (1). Both with correct displayed formulae (1).",3]],
[M("Which general formula is correct for the alkenes?",["C~n~H~2n+2~","C~n~H~2n~","C~n~H~2n+1~OH","C~n~H~n~"],1,"Alkenes are C~n~H~2n~."),
M("What is a hydrocarbon?",["Any compound containing carbon","A compound containing hydrogen and carbon only","A compound of carbon and oxygen","A compound with a double bond"],1,"Only hydrogen and carbon atoms."),
N("How many hydrogen atoms are in an alkane with 8 carbon atoms?",18,"","2 × 8 + 2 = 18."),
N("How many hydrogen atoms are in an alkene with 10 carbon atoms?",20,"","C~10~H~20~."),
M("What is the name ending of an alcohol?",["–ane","–ene","–anol","–anoic acid"],2,"Alcohols end in –anol."),
T("What is the stem for a 3-carbon chain?",["prop"],"Prop."),
M("Which is a saturated compound?",["Ethene","Propene","Propane","But-1-ene"],2,"Propane has only single bonds."),
M("Which pair are structural isomers?",["Ethane and ethene","Butane and methylpropane","Propane and propene","Ethanol and methanol"],1,"Both are C~4~H~10~.")],
[["What is a hydrocarbon?","A compound containing only hydrogen and carbon."],
["General formula of alkanes","C~n~H~2n+2~"],
["General formula of alkenes","C~n~H~2n~"],
["General formula of alcohols","C~n~H~2n+1~OH"],
["Functional group of a carboxylic acid","–COOH"],
["Saturated or unsaturated?","Saturated: single bonds only. Unsaturated: has a C=C double bond."],
["Stems for 1 to 6 carbons","meth, eth, prop, but, pent, hex"],
["Structural isomers","Same molecular formula, different structural formulae."],
["Difference between neighbours in a homologous series","One CH~2~ group."]]);

const F_L2=L("Fossil fuels and fractional distillation","Crude oil as a mixture of hydrocarbons, how fractional distillation separates it and why the fractions behave differently.",
`<h4>Fossil fuels</h4>
<p>A <b>fuel</b> is a substance that releases heat when it burns. The common fossil fuels are <b>coal, natural gas and petroleum</b>. Natural gas is mainly <b>methane, CH~4~</b>, a hydrocarbon. The heat can be used directly or turned into electricity.</p>
<h4>Petroleum (crude oil)</h4>
<p>Petroleum is a thick, sticky, black liquid trapped under porous rock under land and sea. It is a <b>mixture of hydrocarbons</b>, most of them alkanes. As a mixture it is not very useful, but each part of it, called a <b>fraction</b>, is.</p>
<h4>Fractional distillation</h4>
<p>Each fraction contains hydrocarbons with similar chain lengths and so similar boiling points. They are separated in a fractionating column that is <b>hot at the bottom and cool at the top</b>.</p>
<ol><li>Crude oil is heated and vaporises.</li><li>The vapours enter the column.</li><li>Fractions with high boiling points condense low down.</li><li>Fractions with low boiling points rise further and condense near the top.</li></ol>
{{F_FRAC}}
<h4>Trends going down the column</h4>
<p>The longer the carbon chain, the stronger the forces between the molecules. This means that going <b>down</b> the column:</p>
<ul><li>boiling point <b>increases</b>,</li><li>viscosity (thickness) <b>increases</b>,</li><li>volatility (how easily it vaporises) <b>decreases</b>.</li></ul>
<table><tr><th>Fraction</th><th>Carbon atoms</th><th>Boiling range / °C</th></tr>
<tr><td>Refinery gas</td><td>1–4</td><td>below 25</td></tr><tr><td>Gasoline (petrol)</td><td>4–12</td><td>40–100</td></tr><tr><td>Naphtha</td><td>7–14</td><td>90–150</td></tr><tr><td>Kerosene</td><td>12–16</td><td>150–240</td></tr><tr><td>Diesel</td><td>14–18</td><td>220–300</td></tr><tr><td>Fuel oil</td><td>19–25</td><td>250–320</td></tr><tr><td>Lubricating oil</td><td>20–40</td><td>300–350</td></tr><tr><td>Bitumen</td><td>over 70</td><td>over 350</td></tr></table>
<div class="key"><b>Exam tip</b>Learn one use for every fraction and be able to describe the trend in boiling point, viscosity and volatility. Explain the trend with the strength of the forces between molecules.</div>`,
I("Why does one dark liquid give us petrol, jet fuel and road surfaces?",
`<ol><li>Look at samples or photographs of petrol, kerosene, diesel and bitumen. Rank them by how easily they flow.</li><li>Predict the order of boiling points, then the order of chain lengths.</li><li>Use the fractionating column diagram to say where each would leave the tower.</li><li>Explain your ranking in terms of forces between molecules.</li></ol>`,
`<p><b>Synthetic crude oil demo.</b> Your teacher heats a safe synthetic crude oil and collects fractions at different temperature ranges. Compare colour, thickness and how easily each burns.</p><p><b>Viscosity race.</b> Time a ball bearing falling through different oils (or a viscosity model with syrup, oil and water) and relate speed to molecule size.</p>`,
["https://phet.colorado.edu/en/simulations/states-of-matter","PhET: States of Matter simulation"]),
[["Define the term hydrocarbon.","A compound containing hydrogen and carbon only (1).",1],
["Name the main compound in natural gas and give its formula.","Methane (1), CH~4~ (1).",2],
["Explain why petroleum can be separated by fractional distillation.","The hydrocarbons have different boiling points (1) because their chain lengths differ (1).",2],
["Describe how the temperature changes along a fractionating column and where the fraction with the highest boiling points leaves.","Hotter at the bottom and cooler at the top (1). The highest boiling point fraction leaves at the bottom (1).",2],
["State the trend in viscosity going down the column and explain it.","Viscosity increases (1). Longer molecules have stronger attractions between them (1).",2],
["Give one use for each of bitumen and kerosene.","Bitumen: road surfaces (1). Kerosene: jet fuel (1).",2]],
[M("Which fraction has the highest boiling point?",["Refinery gas","Gasoline","Diesel","Bitumen"],3,"Bitumen has the longest chains."),
M("Which fraction is used for road surfaces?",["Kerosene","Bitumen","Naphtha","Diesel"],1,"Bitumen."),
M("Going down the column, volatility…",["increases","decreases","stays the same","is not linked to chain length"],1,"Larger molecules are less volatile."),
T("Name the fraction used as jet fuel.",["kerosene","paraffin"],"Kerosene."),
M("Why do larger molecules have higher boiling points?",["They contain more oxygen","They have stronger attractions between molecules","They have weaker bonds","They are more reactive"],1,"Intermolecular attraction increases with size."),
M("Where does the column have the lowest temperature?",["Bottom","Middle","Top","It is the same everywhere"],2,"Cool at the top."),
T("Which fraction is the raw material for making many chemicals?",["naphtha"],"Naphtha."),
M("What is petroleum?",["A pure compound","A mixture of hydrocarbons","A mixture of metals","An alkene"],1,"It is a mixture of hydrocarbons.")],
[["Three fossil fuels","Coal, natural gas and petroleum."],
["Main compound in natural gas","Methane, CH~4~."],
["What is a fraction?","A group of hydrocarbons with similar boiling points."],
["Where do high boiling point fractions leave the column?","Near the bottom, where it is hottest."],
["Trend in viscosity down the column","Increases."],
["Trend in volatility down the column","Decreases."],
["Use of gasoline","Petrol for cars."],
["Use of naphtha","Raw material for making chemicals."],
["Use of bitumen","Road surfaces."]]);

const F_L3=L("Alkanes","The alkane family, complete combustion and the substitution reaction with chlorine.",
`<h4>What is an alkane?</h4>
<p>Alkanes are <b>saturated hydrocarbons</b>. They contain only single carbon–carbon bonds, so no more atoms can be added to them. The bonds are covalent because only non-metals are involved. The general formula is <b>C~n~H~2n+2~</b>.</p>
<table><tr><th>Name</th><th>Formula</th><th>Structural formula</th></tr>
<tr><td>Methane</td><td>CH~4~</td><td>CH~4~</td></tr><tr><td>Ethane</td><td>C~2~H~6~</td><td>CH~3~CH~3~</td></tr><tr><td>Propane</td><td>C~3~H~8~</td><td>CH~3~CH~2~CH~3~</td></tr><tr><td>Butane</td><td>C~4~H~10~</td><td>CH~3~CH~2~CH~2~CH~3~</td></tr><tr><td>Pentane</td><td>C~5~H~12~</td><td>CH~3~CH~2~CH~2~CH~2~CH~3~</td></tr></table>
<div class="key"><b>Core or Extended?</b>Core students name and draw methane and ethane. Extended students need all five.</div>
<p>Alkanes are colourless, and their physical properties (such as boiling point) change gradually as the chain gets longer. They are fairly unreactive, but they <b>burn</b>, can be <b>cracked</b> and react with <b>halogens in the presence of light</b>.</p>
<h4>Combustion</h4>
<p>With plenty of oxygen, an alkane burns completely to give carbon dioxide and water.</p>
<div class="ex"><b>Equations</b>CH~4~ + 2O~2~ → CO~2~ + 2H~2~O<br>C~2~H~6~ + 3½O~2~ → 2CO~2~ + 3H~2~O<br>C~3~H~8~ + 5O~2~ → 3CO~2~ + 4H~2~O<br>C~4~H~10~ + 6½O~2~ → 4CO~2~ + 5H~2~O</div>
<p>If the oxygen supply is poor, combustion is <b>incomplete</b> and carbon monoxide or carbon (soot) forms as well: CH~4~ + O~2~ → C + 2H~2~O. Carbon monoxide is toxic because it stops the blood carrying oxygen.</p>
<h4>Substitution with halogens <i>(Extended only)</i></h4>
<p>In a substitution reaction one atom is swapped for another. Alkanes react with chlorine or bromine in <b>ultraviolet light</b> (sunlight is a source). The light supplies the activation energy, so this is a <b>photochemical reaction</b>.</p>
<div class="ex"><b>Equation</b>CH~4~ + Cl~2~ → CH~3~Cl + HCl (UV light)</div>
{{F_SUBST}}
<p>One hydrogen is replaced by one chlorine. With more chlorine and more light, further hydrogens can be replaced. You are expected to draw the product of <b>mono</b>substitution, where only one hydrogen is replaced.</p>
<div class="key"><b>Exam tip</b>Without UV light there is no reaction. State the conditions every time.</div>`,
I("Why do alkanes make good fuels but poor reactants?",
`<ol><li>Use the formulae of methane to butane to predict the number of oxygen molecules needed to burn each.</li><li>Draw the displayed formulae and count the C–H bonds that must break.</li><li>Explain why alkanes do not react with bromine water or acids, but do burn.</li><li>Write a short paragraph to justify using propane or butane as a cooking fuel.</li></ol>`,
`<p><b>Burning in different oxygen supplies.</b> Burn a small candle (alkane wax) in a covered jar and in an open jar. Compare the flame and the soot. Relate the observations to complete and incomplete combustion.</p><p><b>Limewater test.</b> Burn a Bunsen flame under an inverted funnel connected to limewater. What shows that carbon dioxide forms?</p>`,
["https://phet.colorado.edu/en/simulations/reactants-products-and-leftovers","PhET: Reactants, Products and Leftovers simulation"]),
[["State what is meant by saturated.","Contains only single bonds between carbon atoms / no C=C (1).",1],
["Write the general formula of the alkanes and name the alkane with 3 carbon atoms.","C~n~H~2n+2~ (1), propane (1).",2],
["Write a balanced equation for the complete combustion of propane.","C~3~H~8~ + 5O~2~ → 3CO~2~ + 4H~2~O (2).",2],
["Name two products of the incomplete combustion of methane that are not formed in complete combustion.","Carbon monoxide (1) and carbon / soot (1).",2],
["Describe the conditions for the reaction between methane and chlorine. (Extended)","Ultraviolet light / sunlight (1).",1],
["Write an equation for methane reacting with chlorine to give a monosubstituted product. (Extended)","CH~4~ + Cl~2~ → CH~3~Cl + HCl (2).",2]],
[M("Which is the formula of butane?",["C~4~H~8~","C~4~H~10~","C~4~H~12~","C~5~H~12~"],1,"C~n~H~2n+2~ with n = 4."),
M("What are the products of complete combustion of an alkane?",["CO and H~2~O","CO~2~ and H~2~O","C and H~2~","CO~2~ and H~2~"],1,"Carbon dioxide and water."),
N("How many O~2~ molecules are needed to burn one propane molecule, C~3~H~8~, completely?",5,"","C~3~H~8~ + 5O~2~ → 3CO~2~ + 4H~2~O."),
N("A gas burner burns 50 cm³ of methane completely. What volume of carbon dioxide forms at the same conditions?",50,"cm³","One mole of CH~4~ gives one mole of CO~2~, so the volumes are equal."),
M("What does UV light do in the reaction of methane with chlorine?",["Acts as a catalyst for polymerisation","Provides the activation energy","Cools the mixture","Removes hydrogen"],1,"It supplies the activation energy."),
T("What is the product, apart from hydrogen chloride, when one hydrogen of methane is replaced by chlorine? (name)",["chloromethane"],"Chloromethane, CH~3~Cl."),
M("Why is carbon monoxide dangerous?",["It is acidic","It stops blood carrying oxygen","It is explosive","It is a greenhouse gas"],1,"It combines with haemoglobin."),
M("An alkane has 12 hydrogen atoms. How many carbons does it have?",["4","5","6","12"],1,"2n + 2 = 12 so n = 5.")],
[["General formula of alkanes","C~n~H~2n+2~"],
["Why are alkanes saturated?","They contain only single C–C bonds."],
["Products of complete combustion","Carbon dioxide and water."],
["Products of incomplete combustion","Carbon monoxide and/or carbon, plus water."],
["Equation: burning methane","CH~4~ + 2O~2~ → CO~2~ + 2H~2~O"],
["What is substitution?","One atom is swapped for another."],
["Condition for alkane + chlorine","Ultraviolet light."],
["Equation: methane + chlorine","CH~4~ + Cl~2~ → CH~3~Cl + HCl"]]);

const F_L4=L("Alkenes and addition reactions","Making alkenes by cracking, testing for them and the addition reactions of ethene.",
`<h4>What is an alkene?</h4>
<p>Alkenes are <b>unsaturated hydrocarbons</b> with at least one <b>C=C</b> double bond. The general formula is <b>C~n~H~2n~</b>. The first four are ethene (C~2~H~4~), propene (C~3~H~6~), but-1-ene (C~4~H~8~) and pent-1-ene (C~5~H~10~).</p>
<p>The double bond can open up so that new atoms can attach to each carbon. This makes alkenes much <b>more reactive</b> than alkanes.</p>
<h4>Catalytic cracking</h4>
<p>Refineries make more long-chain hydrocarbons than they can sell. <b>Cracking</b> turns long chains into shorter, more useful ones, together with alkenes and sometimes hydrogen.</p>
<ul><li>The hydrocarbon is vaporised at about <b>600–700 °C</b>.</li><li>The vapour passes over a hot powdered <b>alumina or silica</b> catalyst.</li><li>Covalent bonds break at the catalyst surface (thermal decomposition). The break is random, so a mixture of shorter alkanes and alkenes forms.</li></ul>
{{F_CRACK}}
<p>The alkenes are raw materials for <b>polymers</b>, and the hydrogen can be used to make ammonia. Kerosene and diesel are often cracked to make extra petrol.</p>
<h4>Testing for an alkene</h4>
<p>Shake the sample with orange <b>bromine water</b>.</p>
<ul><li>Alkane: stays orange.</li><li>Alkene: turns <b>colourless</b>, because the bromine adds across the C=C.</li></ul>
<div class="key"><b>Exam tip</b>Write colourless, not "clear". Clear means see-through, and orange bromine water is also clear.</div>
<h4>Addition reactions <i>(Extended only)</i></h4>
<p>In an addition reaction atoms from a small molecule add across the C=C. The double bond becomes a single bond, and <b>only one product</b> forms.</p>
{{F_ADD}}
<ul><li><b>Bromine:</b> ethene + bromine → 1,2-dibromoethane. This is the test above. The product is saturated.</li><li><b>Hydrogen:</b> ethene + hydrogen → ethane, using a <b>nickel catalyst</b>.</li><li><b>Steam:</b> ethene + steam → ethanol, using an acid catalyst. This is called <b>hydration</b>.</li></ul>
<div class="ex"><b>Check</b>Propene + hydrogen → propane. Propene + steam → propanol. Draw each product so every carbon has four bonds.</div>`,
I("How can you prove a mystery liquid contains a double bond?",
`<ol><li>You have two colourless liquids, one is hexane and one is hex-1-ene. Plan a test that will tell them apart.</li><li>Predict what you will see with each liquid and write the reason.</li><li>Carry out your test (teacher approval first) and record your results in a table.</li><li>Explain, with the idea of addition, why the colour change occurs.</li></ol>`,
`<p><b>Bromine water test.</b> In a fume cupboard, add 1 cm³ bromine water to 1 cm³ of each hydrocarbon, stopper and shake. Record the colour before and after.</p><p><b>Modelling cracking.</b> Use model kits to build decane. Break it into octane and ethene and count the atoms on each side to prove the equation balances.</p>`,
["https://phet.colorado.edu/en/simulations/build-a-molecule","PhET: Build a Molecule simulation"]),
[["Give the general formula of the alkenes and name the functional group.","C~n~H~2n~ (1), C=C double bond (1).",2],
["State the conditions for catalytic cracking.","600–700 °C (1) and an alumina or silica catalyst (1).",2],
["Give two reasons why cracking is carried out.","To make shorter, more useful hydrocarbons such as petrol (1) and to make alkenes for polymers (1).",2],
["Describe how bromine water distinguishes ethene from ethane.","Ethene turns it from orange to colourless (1). Ethane leaves it orange (1).",2],
["Write equations for the reactions of ethene with hydrogen and with steam. (Extended)","C~2~H~4~ + H~2~ → C~2~H~6~ (1). C~2~H~4~ + H~2~O → C~2~H~5~OH (1).",2],
["Explain why ethene is more reactive than ethane. (Extended)","Ethene has a C=C double bond (1) that can break open so that other atoms can add on (1).",2]],
[M("Which test distinguishes an alkene from an alkane?",["Limewater","Bromine water","Damp litmus","Lighted splint"],1,"Bromine water is decolourised by alkenes."),
M("What is the colour change when ethene is bubbled through bromine water?",["Colourless to orange","Orange to colourless","Green to blue","Brown to clear"],1,"Orange to colourless."),
M("What catalyst is used in the hydrogenation of ethene?",["Iron","Nickel","Platinum","Silica"],1,"Nickel."),
T("What is the name of the reaction of an alkene with steam?",["hydration"],"Hydration."),
M("Which are the products of cracking decane, C~10~H~22~?",["Octane and ethene","Octane only","Decene and water","Ethene and ethane"],0,"C~10~H~22~ → C~8~H~18~ + C~2~H~4~."),
N("How many hydrogen atoms are in pent-1-ene, C~5~H~n~?",10,"","C~n~H~2n~ so 10."),
M("Why is the product of an addition reaction a single molecule?",["Atoms add across C=C","Water is removed","Bonds break at random","A catalyst changes it"],0,"The reactants simply join."),
M("What are the cracking conditions?",["100 °C, no catalyst","600–700 °C, alumina or silica","20 °C, nickel","300 °C, 60 atm"],1,"Hot catalyst of alumina or silica.")],
[["General formula of alkenes","C~n~H~2n~"],
["Why are alkenes unsaturated?","They contain a C=C double bond."],
["Conditions for catalytic cracking","About 600–700 °C with an alumina or silica catalyst."],
["Products of cracking","Shorter alkanes, alkenes and sometimes hydrogen."],
["Test for an alkene","Bromine water goes from orange to colourless."],
["Ethene + hydrogen","Ethane, with a nickel catalyst."],
["Ethene + steam","Ethanol, with an acid catalyst (hydration)."],
["What is an addition reaction?","Atoms add across C=C, giving one product."]]);

const F_L5=L("Alcohols and making ethanol","The alcohol family, uses of ethanol and the two methods of manufacture compared.",
`<h4>The alcohol family</h4>
<p>All alcohols contain the hydroxyl group, <b>–OH</b>. The general formula is <b>C~n~H~2n+1~OH</b>, and each member differs from the next by one CH~2~.</p>
{{F_ALC}}
<table><tr><th>Name</th><th>Formula</th></tr><tr><td>Methanol</td><td>CH~3~OH</td></tr><tr><td>Ethanol</td><td>C~2~H~5~OH (CH~3~CH~2~OH)</td></tr><tr><td>Propanol</td><td>C~3~H~7~OH</td></tr></table>
<p>Propanol has two isomers, propan-1-ol and propan-2-ol, depending on which carbon carries the –OH <i>(Extended)</i>.</p>
<h4>Ethanol: uses and combustion</h4>
<p>Ethanol is the alcohol in wine and beer. It is also used as a <b>fuel</b> and as a <b>solvent</b>. It burns completely in plenty of oxygen:</p>
<div class="ex"><b>Equation</b>C~2~H~5~OH + 3O~2~ → 2CO~2~ + 3H~2~O</div>
<h4>Manufacture 1: hydration of ethene</h4>
<p>Ethene and steam pass over a phosphoric acid catalyst at about <b>300 °C</b> and <b>60 atm</b>. The ethanol leaves as a gas and is condensed. Equation: C~2~H~4~ + H~2~O → C~2~H~5~OH.</p>
<h4>Manufacture 2: fermentation</h4>
<p>Sugar or starch is dissolved in water and yeast is added. The mixture stays at <b>25–35 °C</b> with <b>no oxygen</b> for a few days. Enzymes in yeast turn the sugar into glucose and then respire it anaerobically:</p>
<div class="ex"><b>Equation</b>C~6~H~12~O~6~ → 2C~2~H~5~OH + 2CO~2~</div>
<ul><li>Too cold: the reaction is too slow. Too hot: the enzymes denature.</li><li>Yeast die once the ethanol reaches about 15%, so the vessel is emptied and restarted. It is a <b>batch process</b>.</li></ul>
{{F_ETOH}}
<h4>Comparing the two methods <i>(Extended only)</i></h4>
<table><tr><th></th><th>Hydration of ethene</th><th>Fermentation</th></tr>
<tr><td>Equipment</td><td>Complex</td><td>Simple</td></tr>
<tr><td>Raw material</td><td>Non-renewable (crude oil)</td><td>Renewable (sugar cane)</td></tr>
<tr><td>Type of process</td><td>Continuous</td><td>Batch</td></tr>
<tr><td>Speed</td><td>Fast</td><td>Very slow (days)</td></tr>
<tr><td>Product</td><td>Pure ethanol</td><td>Dilute solution, needs further processing</td></tr>
<tr><td>Atmosphere</td><td>No CO~2~ from the reaction, but fuel is burned to keep it hot</td><td>CO~2~ is released</td></tr>
<tr><td>Conditions</td><td>High temperature and pressure: costly</td><td>Low temperature</td></tr></table>`,
I("Is it better to make ethanol from oil or from sugar?",
`<ol><li>List the raw material, conditions and product for each method.</li><li>Decide which factors you would weigh: cost, speed, purity, renewability, carbon dioxide.</li><li>Score each method against each factor and justify your scores.</li><li>Write a recommendation for a fuel company in a country with no oil but plenty of sugar cane.</li></ol>`,
`<p><b>Fermentation in a bottle.</b> Mix sugar, warm water and yeast in a flask fitted with a delivery tube into limewater. Observe the gas. Test at 5, 30 and 60 °C and compare the rate of bubbling.</p><p><b>Burning alcohols.</b> Burn small spirit burners of methanol, ethanol and propanol (teacher demonstration) and compare the heating of 100 cm³ water.</p>`,
["https://phet.colorado.edu/en/simulations/reactions-and-rates","PhET: Reactions and Rates simulation"]),
[["State the functional group of the alcohols and the general formula.","–OH (1), C~n~H~2n+1~OH (1).",2],
["Write the equation for the complete combustion of ethanol.","C~2~H~5~OH + 3O~2~ → 2CO~2~ + 3H~2~O (2).",2],
["Give the conditions for the manufacture of ethanol from ethene.","Steam (1), phosphoric acid catalyst (1), about 300 °C and 60 atm (1).",3],
["Describe how ethanol is made by fermentation.","Dissolve sugar in water and add yeast (1). Keep at 25–35 °C (1) without oxygen (1).",3],
["Explain why the temperature must be controlled during fermentation.","Too low and the reaction is too slow (1). Too high and the enzymes denature (1).",2],
["Give two advantages of fermentation over hydration. (Extended)","Renewable raw material (1), simple equipment / low temperature (1).",2]],
[M("What is the functional group of an alcohol?",["–COOH","–OH","C=C","–COO–"],1,"Hydroxyl."),
N("How many hydrogen atoms are in the molecular formula of butanol, C~4~H~9~OH?",10,"","9 + 1 = 10."),
M("What are the products of fermentation of glucose?",["Ethene and water","Ethanol and carbon dioxide","Ethanoic acid and water","Methane and water"],1,"Ethanol and carbon dioxide."),
M("Why is fermentation a batch process?",["Yeast are killed by the ethanol","It needs steam","It is fast","It needs high pressure"],0,"Yeast die at about 15% ethanol."),
T("Name the catalyst used when ethene is hydrated to ethanol.",["phosphoric acid"],"Phosphoric acid."),
M("Which statement about hydration of ethene is correct? (Extended)",["It gives dilute ethanol","It is a batch process","It is fast and gives pure ethanol","It uses renewable resources"],2,"Fast, continuous and pure."),
M("Which is an isomer of propan-1-ol?",["Propanal","Propan-2-ol","Propene","Propanoic acid"],1,"Same formula, –OH on carbon 2."),
M("Which is the best temperature for fermentation?",["5 °C","30 °C","70 °C","300 °C"],1,"25–35 °C.")],
[["General formula of alcohols","C~n~H~2n+1~OH"],
["Uses of ethanol","Fuel and solvent, and in alcoholic drinks."],
["Hydration conditions","Steam, phosphoric acid catalyst, about 300 °C, 60 atm."],
["Fermentation conditions","Yeast, 25–35 °C, no oxygen."],
["Equation for fermentation","C~6~H~12~O~6~ → 2C~2~H~5~OH + 2CO~2~"],
["Why is fermentation a batch process?","Yeast die at about 15% ethanol."],
["Fermentation: renewable?","Yes, from sugar cane."],
["Hydration: product","Pure ethanol, made continuously."]]);

const F_L6=L("Carboxylic acids and esters","Reactions of carboxylic acids, making ethanoic acid and the formation and naming of esters.",
`<h4>Carboxylic acids</h4>
<p>Carboxylic acids contain the <b>–COOH</b> group and behave like other acids. Their names end in <b>–anoic acid</b>: methanoic acid (HCOOH), ethanoic acid (CH~3~COOH), propanoic acid (CH~3~CH~2~COOH). The general formula is C~n~H~2n+1~COOH.</p>
<h4>Reactions of carboxylic acids</h4>
<p>The salts they form end in <b>–anoate</b>: methanoate, ethanoate, propanoate.</p>
<table><tr><th>Reacts with</th><th>Products</th><th>Example</th></tr>
<tr><td>Metal</td><td>Salt + hydrogen</td><td>2CH~3~COOH + Mg → (CH~3~COO)~2~Mg + H~2~</td></tr>
<tr><td>Base (hydroxide)</td><td>Salt + water</td><td>CH~3~COOH + KOH → CH~3~COOK + H~2~O</td></tr>
<tr><td>Carbonate</td><td>Salt + water + carbon dioxide</td><td>2CH~3~COOH + K~2~CO~3~ → 2CH~3~COOK + H~2~O + CO~2~</td></tr></table>
<div class="key"><b>Exam tip</b>Name the salt carefully: magnesium ethanoate, potassium ethanoate. Learn their formulae too.</div>
<h4>Making ethanoic acid <i>(Extended only)</i></h4>
<p>Ethanol is <b>oxidised</b> to ethanoic acid in two ways.</p>
<ul><li><b>Microbial oxidation.</b> Bacteria (acetobacter) in the air use oxygen to oxidise the ethanol in wine left open: C~2~H~5~OH + O~2~ → CH~3~COOH + H~2~O. The result is vinegar.</li><li><b>Chemical oxidation.</b> Ethanol is heated with acidified potassium manganate(VII) under <b>reflux</b>. A condenser on top of the flask stops the volatile alcohol escaping. The equation is CH~3~CH~2~OH + 2[O] → CH~3~COOH + H~2~O, and the solution turns from <b>purple to colourless</b>.</li></ul>
<h4>Esterification <i>(Extended only)</i></h4>
<p>Carboxylic acids react with alcohols to make <b>esters</b>, which contain –COO–. Esters are sweet-smelling oily liquids used in perfumes and food flavourings. A few drops of concentrated sulfuric acid act as the catalyst, and a molecule of water forms.</p>
<div class="ex"><b>Equation</b>CH~3~COOH + C~2~H~5~OH ⇌ CH~3~COOC~2~H~5~ + H~2~O</div>
{{F_ESTER}}
<h4>Naming esters <i>(Extended only)</i></h4>
<p>The first part comes from the <b>alcohol</b> and ends in <b>–yl</b>. The second part comes from the <b>acid</b> and ends in <b>–oate</b>. The name reads in the opposite order to the structure you draw.</p>
<table><tr><th>Ester</th><th>Made from</th></tr><tr><td>Propyl methanoate</td><td>Propanol and methanoic acid</td></tr><tr><td>Methyl butanoate</td><td>Methanol and butanoic acid</td></tr><tr><td>Ethyl propanoate</td><td>Ethanol and propanoic acid</td></tr></table>`,
I("What makes vinegar sour and fruit sweet-smelling, and how are the two linked?",
`<ol><li>Taste-safe test: use pH paper to compare ethanoic acid (vinegar) with hydrochloric acid of similar concentration.</li><li>Predict what will happen when each is added to magnesium and sodium carbonate.</li><li>Record observations and write word and symbol equations.</li><li>Explain why ethanoic acid is classed as a weak acid.</li></ol>`,
`<p><b>Acid reactions.</b> Add ethanoic acid to magnesium ribbon (test the gas with a lit splint) and to sodium carbonate (test with limewater).</p><p><b>Making an ester.</b> Your teacher warms ethanol, ethanoic acid and a few drops of concentrated sulfuric acid, then pours the mixture into water. Waft to detect the smell and compare with a perfume or sweet flavour.</p>`,
["https://phet.colorado.edu/en/simulations/acid-base-solutions","PhET: Acid-Base Solutions simulation"]),
[["Write the formula of ethanoic acid and name its functional group.","CH~3~COOH (1), –COOH / carboxyl (1).",2],
["Name the salt formed when ethanoic acid reacts with magnesium and give the other product.","Magnesium ethanoate (1) and hydrogen (1).",2],
["Write the equation for ethanoic acid reacting with potassium hydroxide.","CH~3~COOH + KOH → CH~3~COOK + H~2~O (2).",2],
["State the colour change when ethanol is oxidised by acidified potassium manganate(VII). (Extended)","Purple (1) to colourless (1).",2],
["Explain why reflux is used. (Extended)","Ethanol is volatile / has a low boiling point (1) and the condenser returns vapour to the flask (1).",2],
["Name the ester made from propanol and ethanoic acid and give the catalyst. (Extended)","Propyl ethanoate (1), concentrated sulfuric acid (1).",2]],
[M("What is the functional group of a carboxylic acid?",["–OH","–COOH","–COO–","C=O only"],1,"–COOH."),
T("What is the name of the salt CH~3~COONa?",["sodium ethanoate"],"Sodium ethanoate."),
M("Ethanoic acid reacts with sodium carbonate to give…",["salt + hydrogen","salt + water","salt + water + carbon dioxide","ester + water"],2,"Typical acid + carbonate."),
M("What organism oxidises ethanol in open wine?",["Yeast","Acetobacter","Algae","Virus"],1,"Acetobacter makes ethanoic acid."),
M("Which ester is made from ethanol and ethanoic acid?",["Methyl ethanoate","Ethyl ethanoate","Ethyl methanoate","Ethanoyl ethanol"],1,"Alcohol part first: ethyl ethanoate."),
M("What is the catalyst in esterification?",["Nickel","Concentrated sulfuric acid","Silica","Iron"],1,"A few drops of concentrated H~2~SO~4~."),
T("What is released along with the ester in esterification?",["water"],"Water."),
M("Which ester is made from methanol and butanoic acid?",["Butyl methanoate","Methyl butanoate","Methyl propanoate","Butyl butanoate"],1,"Methyl butanoate.")],
[["Name ending of carboxylic acid","–anoic acid"],
["Ethanoic acid formula","CH~3~COOH"],
["Acid + metal","Salt + hydrogen."],
["Acid + carbonate","Salt + water + carbon dioxide."],
["Salts of carboxylic acids end…","–anoate"],
["Oxidation of ethanol by KMnO~4~ colour change","Purple to colourless."],
["Why use reflux?","Stops volatile liquids escaping."],
["Ester functional group","–COO–"],
["How to name an ester","Alcohol part (–yl) first, acid part (–oate) second."]]);

const F_L7=L("Polymers and plastics","Addition and condensation polymers, drawing repeat units, proteins and the disposal of plastics.",
`<h4>Polymers: the basics</h4>
<p>A <b>polymer</b> is a very large molecule built from many small molecules called <b>monomers</b>, all joined by covalent bonds. Examples are poly(ethene), PVC and nylon.</p>
<h4>Addition polymerisation</h4>
<p>Poly(ethene) forms from ethene monomers. The C=C of each monomer breaks and the monomers join in a long chain. Only the polymer forms, with nothing else given off.</p>
{{F_POLY}}
<h4>Drawing repeat units <i>(Extended only)</i></h4>
<p>Addition polymers come from monomers that contain a C=C. Name the polymer with <b>poly-</b> and the monomer in brackets: poly(propene).</p>
<ol><li>Draw the monomer with the C=C in the middle and any other groups above and below.</li><li>Change C=C to C–C.</li><li>Add a continuation bond at each end, sticking out of the brackets.</li><li>Put a small <b>n</b> after the bracket.</li></ol>
<table><tr><th>Monomer</th><th>Repeat unit</th></tr><tr><td>Ethene CH~2~=CH~2~</td><td>–[CH~2~–CH~2~]~n~–</td></tr><tr><td>Propene CH~2~=CHCH~3~</td><td>–[CH~2~–CH(CH~3~)]~n~–</td></tr><tr><td>Chloroethene CH~2~=CHCl</td><td>–[CH~2~–CHCl]~n~– (PVC)</td></tr></table>
<p>To go backwards, take one repeat unit, change C–C to C=C and remove the continuation bonds. Draw only one monomer.</p>
<h4>Condensation polymerisation <i>(Extended only)</i></h4>
<p>Condensation polymers form when two different monomers with a functional group at <b>each end</b> join and lose a small molecule, usually <b>water</b>, at every link. Addition polymers give only the polymer. Condensation polymers give the polymer <b>and water</b>.</p>
<p><b>Nylon</b> is a polyamide. A dicarboxylic acid (–COOH at both ends) reacts with a diamine (–NH~2~ at both ends), forming an <b>amide link</b>.</p>
{{F_NYLON}}
<p><b>PET</b> (polyethylene terephthalate, sold as terylene) is a polyester. A dicarboxylic acid reacts with a diol (–OH at both ends), forming an <b>ester link</b>.</p>
{{F_PET}}
<div class="key"><b>Exam tip</b>Draw the blocks only. The link reverses direction between neighbours (COO then OCO), a bit like a mirror image. Do not repeat the same link twice.</div>
<h4>Proteins <i>(Extended only)</i></h4>
<p>Proteins are natural condensation polymers (polyamides). Their monomers are <b>amino acids</b>, each with an –NH~2~ and a –COOH, joined by amide links known as <b>peptide links</b>. There are twenty common amino acids, differing in the side chain R. A protein has between about 60 and 600 amino acids in a particular order.</p>
{{F_PROT}}
<h4>Plastics and their disposal</h4>
<p>Many polymers are unreactive, so they are <b>non-biodegradable</b>: microorganisms cannot break them down.</p>
<ul><li><b>Landfill:</b> takes up valuable land and fills quickly.</li><li><b>Incineration:</b> releases heat but also carbon dioxide. PVC releases toxic hydrogen chloride and incomplete burning gives carbon monoxide.</li><li><b>Oceans:</b> plastic waste builds up and harms marine life.</li></ul>
<h4>Recycling PET <i>(Extended only)</i></h4>
<p>Harsh conditions often damage monomers, but PET is easy to take apart. Enzymes from microbes, or a solvent with a catalyst and gentle heating, split it back into its two monomers. These can be purified and made into new PET, saving raw materials and energy and cutting the carbon footprint.</p>`,
I("What should we do with plastic after we have used it?",
`<ol><li>Collect ten plastic items and sort them by type (use the recycling symbols).</li><li>For each, say how long it will last in landfill and why.</li><li>Evaluate landfill, incineration and recycling using a table of advantages and disadvantages.</li><li>Present a plan to reduce plastic waste in your school.</li></ol>`,
`<p><b>Polymer chain model.</b> Use paper clips or pop-beads as monomers. Join them to make a polymer, then use two colours to represent alternating monomers in a condensation polymer. Count the "water molecules" removed for each link.</p><p><b>Biodegradation test.</b> Bury samples of paper, cotton, starch bioplastic and polythene in compost. Inspect weekly and record which change.</p>`,
["https://phet.colorado.edu/en/simulations/build-a-molecule","PhET: Build a Molecule simulation"]),
[["Define the term monomer.","A small molecule (1) that joins with many others to form a polymer (1).",2],
["Name the polymer made from ethene and write the repeat unit.","Poly(ethene) (1). –[CH~2~–CH~2~]~n~– (1).",2],
["State what is different in the products of addition and condensation polymerisation. (Extended)","Addition gives only the polymer (1). Condensation also gives water / a small molecule (1).",2],
["Name the type of link in nylon and the two monomer types. (Extended)","Amide link (1). Dicarboxylic acid and diamine (1).",2],
["Draw the repeat unit of poly(propene) from propene. (Extended)","–[CH~2~–CH(CH~3~)]~n~– with continuation bonds (1) and n (1).",2],
["Give two problems caused by disposing of plastics.","Landfill fills up / takes up land (1). Burning produces CO~2~ / toxic gases such as HCl (1).",2]],
[M("What is the monomer of poly(ethene)?",["Ethane","Ethene","Ethanol","Ethanoic acid"],1,"Ethene."),
M("What is the name of the link in a protein?",["Ester","Peptide","Ionic","Hydrogen"],1,"Amide, called peptide."),
M("What small molecule is released in condensation polymerisation to make PET?",["Hydrogen","Carbon dioxide","Water","Ammonia"],2,"One water per ester link."),
T("What is the name of the polymer made from chloroethene?",["pvc","polyvinylchloride","poly(chloroethene)","poly(vinyl chloride)"],"PVC, poly(chloroethene)."),
M("Why are most plastics a disposal problem?",["They are reactive","They are non-biodegradable","They dissolve in water","They are brittle"],1,"Microorganisms cannot break them down."),
M("Which monomers make nylon?",["Diol and diamine","Dicarboxylic acid and diamine","Dicarboxylic acid and diol","Two alkenes"],1,"Acid plus amine gives amide."),
M("Which toxic gas forms when PVC is burned?",["Hydrogen chloride","Hydrogen","Nitrogen","Argon"],0,"HCl."),
M("How can PET be recycled? (Extended)",["Burn it","Break it back to monomers","Bury it","Dissolve in water"],1,"Enzymes or a solvent with catalyst give monomers.")],
[["What is a polymer?","A large molecule made from many monomers."],
["Addition polymerisation","The C=C breaks and monomers join. Only the polymer forms."],
["Condensation polymerisation","Two monomers join, losing a small molecule such as water."],
["Nylon link and type","Amide link, a polyamide."],
["PET link and type","Ester link, a polyester."],
["Monomer of a protein","Amino acids."],
["Why are plastics hard to dispose of?","They are non-biodegradable."],
["PET recycling","Depolymerise to monomers with enzymes or catalyst, then re-polymerise."]]);

SETL(11,[F_L1,F_L2,F_L3,F_L4,F_L5,F_L6,F_L7]);
