/* ===== Biology 9700 past paper 9700/22 Feb/Mar 2023 (typed questions with redrawn diagrams; photographs cropped; model answers written for this hub) ===== */
(function(){
/* ---- helpers (prefix QA2_) ---- */
const QA2_m=n=>`<span style="float:right;margin-left:12px;font-weight:700">[${n}]</span>`;
const QA2_fig=(vb,inner,cap,label,maxw)=>`<figure class="fig"${maxw?` style="max-width:${maxw}px"`:""}><svg viewBox="${vb}" role="img" aria-label="${label}">${inner}</svg><figcaption>${cap}</figcaption></figure>`;
const QA2_img=(k,cap,alt)=>`<figure class="fig alimg" style="max-width:560px"><img src="${ALQF2[k]}" alt="${alt}"><figcaption>${cap}</figcaption></figure>`;
const QA2_t=(x,y,s,o)=>{o=o||{};return `<text x="${x}" y="${y}" font-size="${o.s||12}" text-anchor="${o.a||"middle"}"${o.b?' font-weight="700"':""}${o.i?' font-style="italic"':""} fill="currentColor">${s}</text>`};
const QA2_ln=(x1,y1,x2,y2,w)=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="currentColor" stroke-width="${w||1.2}" fill="none"/>`;
const QA2_arr=(x1,y1,x2,y2)=>{const a=Math.atan2(y2-y1,x2-x1),h=8;return QA2_ln(x1,y1,x2,y2,1.3)+`<path d="M${x2} ${y2}L${(x2-h*Math.cos(a-.4)).toFixed(1)} ${(y2-h*Math.sin(a-.4)).toFixed(1)}L${(x2-h*Math.cos(a+.4)).toFixed(1)} ${(y2-h*Math.sin(a+.4)).toFixed(1)}Z" fill="currentColor"/>`};
const QA2_rng=s=>()=>{s=(s*9301+49297)%233280;return s/233280};
/* Fig. 2.1 dipeptide of two cysteine molecules */
function QA2_cys(){
  let s="";const T=(x,y,t,o)=>s+=QA2_t(x,y,t,Object.assign({s:15},o||{}));
  T(20,69,"H",{});s+=QA2_ln(32,65,50,65,1.4);T(58,69,"O");s+=QA2_ln(64,62,76,74);
  T(78,89,"C");s+=QA2_ln(86,85,106,85);T(96,116,"O");s+=QA2_ln(72,92,66,104)+QA2_ln(76,94,70,106);
  T(112,89,"C");s+=QA2_ln(112,76,112,64);T(112,58,"CH",{});T(130,63,"2",{s:10});s+=QA2_ln(112,52,112,38);T(112,30,"SH");
  s+=QA2_ln(112,96,112,108);T(112,120,"H");
  s+=QA2_ln(120,85,138,85);T(146,89,"N");s+=QA2_ln(146,96,146,108);T(146,120,"H");
  s+=QA2_ln(154,85,166,85);T(174,89,"C");s+=QA2_ln(172,76,172,62)+QA2_ln(176,76,176,62);T(174,54,"O");
  s+=QA2_ln(182,85,200,85);T(208,89,"C");s+=QA2_ln(208,76,208,64);T(208,58,"H");
  s+=QA2_ln(208,96,208,108);T(214,120,"CH");T(236,125,"2",{s:10});s+=QA2_ln(214,126,214,142);T(214,154,"SH");
  s+=QA2_ln(216,85,232,85);T(242,89,"N");s+=QA2_ln(250,82,262,70);T(270,68,"H");s+=QA2_ln(250,92,262,102);T(270,108,"H");
  return QA2_fig("0 0 300 170",s,"Fig. 2.1","Structure of a dipeptide made of two cysteine molecules: HO-C(=O)-CH(CH2SH)-NH-C(=O)-CH(CH2SH)-NH2",420);
}
/* Fig. 3.1 phloem tissue, schematic redraw */
function QA2_phloem(){
  const r=QA2_rng(11);let s="";
  const cell=(cx,cy,rx,ry,fill)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill||"none"}" stroke="currentColor" stroke-width="1.2"/>`;
  [[118,64,22,15],[150,48,22,14],[186,54,18,16],[96,92,17,13],[100,122,14,11],[132,128,16,12],[168,142,14,12],[205,136,16,14],[236,118,15,13],[198,96,14,12],[222,92,13,11],[150,160,16,12],[262,70,13,12],[250,150,14,11],[178,108,10,9]].forEach(c=>s+=cell(c[0],c[1],c[2],c[3],""));
  // large empty ground cells
  s+=cell(262,48,40,32)+cell(110,172,46,40);
  // X: empty sieve tube element (cut between sieve plates)
  s+=cell(138,95,28,22);
  // Y: sieve plate with many pores
  const pores=(cx,cy,rx,ry,n)=>{let p=cell(cx,cy,rx,ry);for(let i=0;i<n;i++){const a=r()*6.283,d=Math.sqrt(r())*.84,x=cx+Math.cos(a)*rx*d,y=cy+Math.sin(a)*ry*d,w=2.2+r()*2.6,h=2.2+r()*2.4;p+=`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${w.toFixed(1)}" ry="${h.toFixed(1)}" fill="none" stroke="currentColor" stroke-width=".9"/>`}return p};
  s+=pores(135,128,30,24,60);
  s+=pores(235,112,28,24,55);
  // companion cells (shaded) with nuclei
  const cc=(x,y)=>`<ellipse cx="${x}" cy="${y}" rx="9" ry="6" transform="rotate(-30 ${x} ${y})" fill="currentColor" fill-opacity=".22" stroke="currentColor" stroke-width="1.1"/><circle cx="${x-1}" cy="${y}" r="2.6" fill="currentColor"/>`;
  s+=cc(168,92)+cc(198,76)+cc(120,152)+cc(215,150);
  s+=QA2_ln(176,32,166,86,1)+QA2_t(176,26,"companion cell");
  s+=QA2_ln(40,52,112,92,1)+QA2_t(32,56,"X",{b:1,a:"end"});
  s+=QA2_ln(40,104,106,124,1)+QA2_t(32,108,"Y",{b:1,a:"end"});
  return QA2_fig("0 0 330 220",s,"Fig. 3.1","Schematic of phloem in transverse section: X is a sieve tube element that looks empty, Y is a sieve tube element showing a sieve plate with many pores, and shaded companion cells with nuclei lie beside them",400);
}
/* Fig. 5.1 ECMO machine and heart */
function QA2_ecmo(){
  let s="";const box=(x,y,w,h,l1,l2)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="currentColor" stroke-width="1.3"/>`+(l2?QA2_t(x+w/2,y+h/2-3,l1,{s:12})+QA2_t(x+w/2,y+h/2+11,l2,{s:12}):QA2_t(x+w/2,y+h/2+4,l1,{s:12}));
  s+=`<rect x="137" y="63" width="191" height="314" fill="none" stroke="currentColor" stroke-width="1.5"/>`;
  s+=box(193,87,80,43,"artificial","pump")+box(157,198,150,45,"oxygenator")+box(193,310,80,43,"heater");
  s+=QA2_arr(232,15,232,86)+QA2_arr(232,130,232,197)+QA2_arr(232,243,232,309)+QA2_arr(232,377,232,420);
  s+=QA2_t(55,193,"ECMO",{s:12})+QA2_t(55,207,"machine",{s:12})+QA2_ln(88,200,137,222,1);
  // heart (unlabelled, as in the paper)
  const h="color:inherit";
  s+=`<path d="M496 160C484 175 486 215 498 232C506 244 522 262 541 276C562 292 590 296 612 280C640 260 652 214 640 180C632 162 620 152 604 148C590 144 578 150 570 156C552 146 520 140 508 150Z" fill="none" stroke="currentColor" stroke-width="1.4"/>`;
  s+=`<path d="M570 156C570 130 566 112 580 98C592 86 608 90 626 78C640 70 654 74 668 66" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M586 150C588 130 590 118 602 110C614 104 624 100 640 96" fill="none" stroke="currentColor" stroke-width="1.4"/>`;
  s+=`<path d="M514 100L514 160M530 100L530 160" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M514 260L514 346M530 244L530 346" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M514 346L530 346M514 100L530 100" fill="none" stroke="currentColor" stroke-width="1.4"/>`;
  s+=`<path d="M650 118C660 112 668 126 664 138C660 148 650 152 642 148" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M572 170C566 200 560 226 566 256M606 190C612 214 618 236 614 258" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity=".6"/>`;
  return QA2_fig("0 0 700 440",s,"Fig. 5.1","Diagram of an ECMO machine containing an artificial pump, an oxygenator and a heater joined by arrows, with an unlabelled drawing of a heart and its large vessels beside it",560);
}
/* Fig. 6.1 graph: percentage of maximum collagenase activity against pH */
function QA2_graph(){
  const X0=105,Y0=20,W=270,H=250,px=p=>X0+(p-4)*W/6,py=v=>Y0+H-v*H/100;let s="";
  for(let i=0;i<=60;i++)s+=`<path d="M${px(4+i/10).toFixed(1)} ${Y0}V${Y0+H}" stroke="currentColor" stroke-opacity="${i%10?.22:.55}" stroke-width="${i%10?.5:.9}"/>`;
  for(let i=0;i<=50;i++)s+=`<path d="M${X0} ${py(i*2).toFixed(1)}H${X0+W}" stroke="currentColor" stroke-opacity="${i%10?.22:.55}" stroke-width="${i%10?.5:.9}"/>`;
  s+=`<path d="M${X0} ${Y0}V${Y0+H}H${X0+W}" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
  for(let v=0;v<=100;v+=20)s+=QA2_t(X0-8,py(v)+4,v,{a:"end",s:12});
  for(let p=4;p<=10;p++)s+=QA2_t(px(p),Y0+H+18,p.toFixed(1),{s:12});
  s+=QA2_t(px(7),Y0+H+40,"pH",{s:13});
  s+=QA2_t(48,Y0+H/2-12,"percentage",{s:12})+QA2_t(48,Y0+H/2+3,"of maximum",{s:12})+QA2_t(48,Y0+H/2+18,"activity",{s:12});
  const pts=[[5.0,20],[5.36,23.4],[5.78,29],[5.99,36],[6.2,46.3],[6.42,59],[6.63,72.5],[6.84,86],[7.05,95],[7.36,100],[7.52,97],[7.64,87],[7.73,71.7],[7.81,58],[7.9,48],[8.0,38],[8.11,30],[8.24,22.5],[8.41,16.6],[8.66,13],[9.0,12]].map(p=>[px(p[0]),py(p[1])]);
  let d=`M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for(let i=0;i<pts.length-1;i++){const p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||p2;
    d+=`C${(p1[0]+(p2[0]-p0[0])/6).toFixed(1)} ${(p1[1]+(p2[1]-p0[1])/6).toFixed(1)} ${(p2[0]-(p3[0]-p1[0])/6).toFixed(1)} ${(p2[1]-(p3[1]-p1[1])/6).toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`}
  s+=`<path d="${d}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>`;
  return QA2_fig("0 0 400 320",s,"Fig. 6.1","Graph of percentage of maximum collagenase activity against pH from 4.0 to 10.0: the curve starts at about 20% at pH 5.0, rises to 100% at about pH 7.4, then falls steeply to about 38% at pH 8.0 and levels at about 12% by pH 9.0",460);
}
const QA2_tbl=(head,rows)=>`<table>${head?`<thead><tr>${head.map(h=>`<th>${h}</th>`).join("")}</tr></thead>`:""}<tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
/* ---- question text ---- */
const QA2_Q1=()=>`<p><b>(a)</b> Table 1.1 lists cell structures that can be found in eukaryotic cells or prokaryotic cells. Some of these cell structures can be found in both types of cell.</p>
<p>Complete the table using a tick (✓) to show that the cell structure can be present in a particular type of cell and a cross (✗) to show that the cell structure <b>cannot</b> be present.</p>
<p>Put a tick or a cross in every box.</p><p>The top row has been completed for you.</p>
<p style="text-align:center"><b>Table 1.1</b></p>
<div style="overflow-x:auto">${QA2_tbl(["cell structure","eukaryotic cells","prokaryotic cells"],[["nucleus","✓","✗"],["Golgi body","&nbsp;","&nbsp;"],["circular DNA","&nbsp;","&nbsp;"],["70S ribosome","&nbsp;","&nbsp;"]])}</div>${QA2_m(2)}<div style="clear:both"></div>
<p><b>(b)</b> All cells have a cell surface membrane. Fig. 1.1 shows a transmission electron micrograph of part of <b>two</b> adjacent animal cells, cell 1 and cell 2.</p>
${QA2_img("F11","Fig. 1.1","Transmission electron micrograph (×300 000) of part of two adjacent animal cells, cell 1 and cell 2, with a box labelled R drawn round the region where their two cell surface membranes lie side by side")}
<p>In the space provided, draw a diagram of the region in the box labelled <b>R</b> on Fig. 1.1. Your diagram should show the four dark lines.</p>
<p>Label the diagram to identify what is shown by the dark lines and each of the three spaces between them.</p>
<p><i>(Draw your diagram on paper or on the board.)</i> ${QA2_m(3)}</p><div style="clear:both"></div>
<p><b>(c)</b> Mitogens are short chains of amino acids that function as cell-signalling molecules. Mitogens are released from secretory cells and travel in the blood to target cells, where the mitogens bind to cell surface receptors. The target cells respond by progressing from the G1 phase to the S phase of the mitotic cell cycle.</p>
<p><b>(i)</b> Outline what happens in the G1 phase and S phase of the mitotic cell cycle.</p>
<p style="margin-left:1.2em">G1 phase …<br>S phase … ${QA2_m(2)}</p><div style="clear:both"></div>
<p><b>(ii)</b> As a result of mutation, the production and release of mitogens into the blood can be greatly increased.</p>
<p>Suggest a possible consequence for target cells of increased concentrations of mitogens in the blood. ${QA2_m(1)}</p><div style="clear:both"></div>`;
const QA2_Q2=()=>`<p><b>(a)</b> Cysteine is an amino acid containing sulfur. Fig. 2.1 shows the structure of the molecule formed by joining two cysteine molecules together.</p>
${QA2_cys()}
<p>Draw a circle around an R-group in the molecule shown in Fig. 2.1. ${QA2_m(1)}</p><div style="clear:both"></div>
<p><b>(b)</b> Goblet cells in the human gas exchange system produce proteins called mucins.</p>
<p><b>(i)</b> The ends of mucin molecules contain many cysteine residues. Mucin strands are formed by joining the ends of mucin molecules together through covalent bonds between R-groups.</p>
<p>State the name of these covalent bonds. ${QA2_m(1)}</p><div style="clear:both"></div>
<p><b>(ii)</b> Mucin strands are transported out of the goblet cells and then absorb water to form mucus.</p>
<p>Suggest <b>and</b> explain how mucin strands are transported out of the goblet cells. ${QA2_m(3)}</p><div style="clear:both"></div>
<p>Cystic fibrosis is a genetic disease caused by a mutation in the human <i>CFTR</i> gene. This results in mucus that is thicker than normal.</p>
<p><b>(c)</b> Suggest how thicker mucus interferes with the maintenance of healthy gas exchange surfaces in the lungs. ${QA2_m(2)}</p><div style="clear:both"></div>
<p><b>(d)</b> Row 1 and row 2 of Table 2.1 show the DNA base sequences of part of the normal <i>CFTR</i> allele and the same part of a mutated <i>CFTR</i> allele. The base sequences shown are for the DNA strands used in the synthesis of RNA. When Table 2.1 is completed, row 3 will show the base sequence of the RNA synthesised from the same part of the mutated <i>CFTR</i> allele.</p>
<p style="text-align:center"><b>Table 2.1</b></p>
<div style="overflow-x:auto"><table><tbody>
<tr><td>1</td><td>DNA base sequence of part of the normal <i>CFTR</i> allele</td>${"TAGTAGAAACCA".split("").map(b=>`<td style="text-align:center">${b}</td>`).join("")}</tr>
<tr><td>2</td><td>DNA base sequence of part of the mutated <i>CFTR</i> allele</td>${"TAGTAACCACAA".split("").map(b=>`<td style="text-align:center">${b}</td>`).join("")}</tr>
<tr><td>3</td><td>RNA base sequence synthesised from the mutated <i>CFTR</i> allele</td>${"x".repeat(12).split("").map(()=>`<td style="min-width:1.4em">&nbsp;</td>`).join("")}</tr></tbody></table></div>
<p><b>(i)</b> The difference between the DNA base sequence in row 1 and the DNA base sequence in row 2 of Table 2.1 is caused by a single gene mutation.</p>
<p>State the name of this type of gene mutation. ${QA2_m(1)}</p><div style="clear:both"></div>
<p><b>(ii)</b> Row 1 and row 2 in Table 2.1 show the DNA strands used in the synthesis of RNA.</p>
<p>State the term used to describe the DNA strand that is used in the synthesis of RNA. ${QA2_m(1)}</p><div style="clear:both"></div>
<p><b>(iii)</b> Complete Table 2.1 to show the missing bases in row 3. ${QA2_m(1)}</p><div style="clear:both"></div>
<p><b>(iv)</b> The normal <i>CFTR</i> allele is approximately 189 000 base pairs in length. The CFTR polypeptide consists of only 1480 amino acids.</p>
<p>Explain the reasons for this difference between the number of base pairs and the number of amino acids. ${QA2_m(3)}</p><div style="clear:both"></div>`;
const QA2_Q3=()=>`<p><b>(a)</b> Fig. 3.1 is a diagram of an area of phloem tissue from a transverse section through the stem of a squash plant, <i>Cucurbita pepo</i>.</p>
${QA2_phloem()}
<p><b>(i)</b> Cell <b>X</b> and cell <b>Y</b> in Fig. 3.1 are sieve tube elements.</p>
<p>Explain why cell <b>X</b> and cell <b>Y</b> have very different appearances in this transverse section. ${QA2_m(2)}</p><div style="clear:both"></div>
<p><b>(ii)</b> Sucrose is formed from the glucose synthesised by mesophyll cells in the leaves of <i>C. pepo</i>.</p>
<p>Explain how companion cells are involved in the transfer of sucrose into phloem sieve tubes. ${QA2_m(4)}</p><div style="clear:both"></div>
<p><b>(b)</b> Hydrogen bonding is important in the movement of water in xylem.</p>
<p><b>(i)</b> Explain how hydrogen bonding occurs between two water molecules. ${QA2_m(2)}</p><div style="clear:both"></div>
<p><b>(ii)</b> Outline how hydrogen bonding is involved in water transport in the xylem of a plant stem. ${QA2_m(3)}</p><div style="clear:both"></div>
<p><b>(iii)</b> Hydrogen bonding between water molecules gives water a relatively high latent heat of vaporisation.</p>
<p>Suggest why it is important to plants that water has a high latent heat of vaporisation. ${QA2_m(2)}</p><div style="clear:both"></div>`;
const QA2_Q4=()=>`<p>Tuberculosis (TB), influenza and polio are examples of infectious diseases.</p>
<p><b>(a) (i)</b> Explain what is meant by an infectious disease. ${QA2_m(2)}</p><div style="clear:both"></div>
<p><b>(ii)</b> Name a species of organism that causes TB. ${QA2_m(1)}</p><div style="clear:both"></div>
<p><b>(b)</b> Immunity can be described as artificial or natural and passive or active.</p>
<p>Name the type of immunity that a mother gives to her baby through breast milk. ${QA2_m(1)}</p><div style="clear:both"></div>
<p><b>(c)</b> The influenza virus can mutate frequently to produce different strains of the virus. A new vaccine is often necessary to stimulate the production of new antibodies to these new strains.</p>
<p>Explain why different antibodies need to be produced to give immunity to these new strains. ${QA2_m(3)}</p><div style="clear:both"></div>
<p><b>(d)</b> Polio is a serious viral disease affecting young children. In 1996, polio caused paralysis in more than 75 000 children across Africa. A long-term vaccination programme allowed the World Health Organization (WHO) to declare that Africa was largely free of polio in 2020.</p>
<p><b>(i)</b> Explain how vaccination programmes can help to control the spread of infectious diseases, such as polio. ${QA2_m(3)}</p><div style="clear:both"></div>
<p><b>(ii)</b> Antibiotics, such as penicillin, do not help to prevent the spread of viral diseases, such as polio.</p>
<p>Explain why penicillin is not effective against viruses. ${QA2_m(1)}</p><div style="clear:both"></div>`;
const QA2_Q5=()=>`<p>Pneumonia is a severe lung disease that can interfere with gas exchange. A person with pneumonia can be connected to an ECMO machine. This machine performs the gas exchange functions of the lungs.</p>
<p>A cannula (tube) is inserted into the right atrium and this takes blood to the ECMO machine. In the ECMO machine, blood is passed firstly to an artificial pump and then to an oxygenator, where gas exchange occurs. The blood is then warmed and returns by another cannula to the vena cava.</p>
<p><b>(a)</b> Complete Fig. 5.1 to show how the ECMO machine is connected to the right atrium and to the vena cava. Use a single line to represent each cannula.</p>
${QA2_ecmo()}
<p>${QA2_m(1)}</p><div style="clear:both"></div>
<p><b>(b)</b> In the oxygenator, a partially permeable membrane separates the blood from air that has been enriched with extra oxygen.</p>
<p><b>(i)</b> State the name of a structure in the gas exchange system that has the same function as the partially permeable membrane of the oxygenator. ${QA2_m(1)}</p><div style="clear:both"></div>
<p><b>(ii)</b> In the oxygenator, blood and oxygen-enriched air flow in opposite directions.</p>
<p>Suggest <b>and</b> explain how the oxygenator carries out the functions of gas exchange that normally occur in the lungs. ${QA2_m(3)}</p><div style="clear:both"></div>
<p><b>(c)</b> Fig. 5.2 is a photomicrograph showing a transverse section of part of the human aorta.</p>
${QA2_img("F52","Fig. 5.2","Photomicrograph (×16) of a transverse section of part of the human aorta, with the tunica media and the tunica externa labelled")}
<p>Explain how the structure of the tunica media in Fig. 5.2 is different from the structure of the tunica media in a muscular artery <b>and</b> relate the difference to the function of the aorta. ${QA2_m(3)}</p><div style="clear:both"></div>
<p><b>(d)</b> Some biologists investigated the transport of carbon dioxide in the blood of <i>Caiman latirostris</i>, a type of reptile.</p>
<p>The biologists found that when <i>C. latirostris</i> respires:</p>
<ul><li>most of the carbon dioxide is converted into hydrogencarbonate ions in red blood cells</li><li>the hydrogencarbonate ions combine with haemoglobin inside the red blood cells</li><li>the hydrogencarbonate ions remain combined with haemoglobin until the blood reaches the lungs.</li></ul>
<p><b>(i)</b> Explain why the physiology of <i>C. latirostris</i> requires carbonic anhydrase. ${QA2_m(1)}</p><div style="clear:both"></div>
<p><b>(ii)</b> Explain why the physiology of <i>C. latirostris</i> does not require the chloride shift. ${QA2_m(1)}</p><div style="clear:both"></div>`;
const QA2_Q6=()=>`<p><b>(a)</b> Collagen is the most common structural protein in vertebrates. Collagen provides the skin with flexibility and strength.</p>
<p>Explain how the structure of a collagen fibre provides the skin with strength. ${QA2_m(3)}</p><div style="clear:both"></div>
<p><b>(b)</b> The enzyme collagenase breaks down collagen. Collagenase has several important medical uses, such as in the treatment of burnt skin.</p>
<p>Scientists investigated the effect of pH on the activity of collagenase at 37 °C.</p>
<p>The results of their investigation are shown in Fig. 6.1.</p>
${QA2_graph()}
<p>Explain why the activity of collagenase is lower at pH 8.0 than at the optimum pH. ${QA2_m(2)}</p><div style="clear:both"></div>`;
const SRC=n=>"Cambridge 9700/22 Feb/Mar 2023, Q"+n+". Model answer written for this hub, not the official mark scheme.";
const add=(k,p)=>{AL_P[k]=(AL_P[k]||[]).concat([p])};
add("T1",P("Prokaryotic and eukaryotic cells, cell surface membrane and the cell cycle",8,
 QA2_Q1(),
 ["(a) Golgi body: tick for eukaryotic cells, cross for prokaryotic cells (1). Circular DNA: tick for both (found in mitochondria and chloroplasts of eukaryotes as well as in prokaryotes) and 70S ribosome: tick for both (mitochondria and chloroplasts contain 70S ribosomes) (1).",
  "(b) A diagram of four parallel lines with three spaces between them (1). The dark lines are the hydrophilic phosphate heads of the phospholipids of the two cell surface membranes (two lines for the membrane of cell 1 and two for the membrane of cell 2) (1). The space between the first and second lines and between the third and fourth lines is the hydrophobic fatty acid tails (inside each membrane) and the middle space is the gap between the two cells (1).",
  "(c)(i) G1: the cell grows or makes proteins and organelles, ready for DNA replication (1). S: DNA is replicated (1).",
  "(c)(ii) Target cells divide too often or without control, which can form a tumour or cancer (1)."],SRC(1)));
add("T2",P("Cysteine, mucins, cystic fibrosis and the CFTR gene",13,
 QA2_Q2(),
 ["(a) A circle round the CH~2~SH group on either cysteine (the side chain, not part of the C, N and O backbone) (1).",
  "(b)(i) Disulfide (disulphide) bonds (1).",
  "(b)(ii) Mucin is made on the rough endoplasmic reticulum, modified in the Golgi body and packaged into vesicles (1). Vesicles are moved along the cytoskeleton (microtubules), using energy from ATP (1). The vesicles fuse with the cell surface membrane and release the mucin by exocytosis (1).",
  "(c) Thick mucus cannot be moved away by cilia, so it builds up and blocks airways or traps pathogens (1). More infection or damage, or a thicker barrier, so the diffusion distance increases and gas exchange is reduced (1).",
  "(d)(i) Deletion (of three bases; the sequence after the deletion has moved up) (1).",
  "(d)(ii) The template strand (also called the antisense or non-coding strand) (1).",
  "(d)(iii) A U C A U U G G U G U U (all twelve bases correct, because each DNA base is paired with its complementary RNA base and U replaces T) (1).",
  "(d)(iv) Three bases (a triplet) code for one amino acid, so 1480 amino acids need only about 4440 bases (1). The gene contains introns or non-coding DNA (1) that are transcribed but removed from the pre-mRNA by splicing, so the mature mRNA is much shorter than the gene (1)."],SRC(2)));
add("T6",P("Phloem loading and the movement of water in xylem",13,
 QA2_Q3(),
 ["(a)(i) The section was cut at different levels along the sieve tube elements (1). Y is cut through a sieve plate and shows the many pores, whereas X is cut through the lumen between sieve plates and so looks empty (1).",
  "(a)(ii) Companion cells have many mitochondria that make ATP (1). ATP is used by proton pumps to move H^+^ out of the companion cell into the cell wall (1). H^+^ then moves back into the companion cell down its gradient through a co-transporter protein, bringing sucrose with it (co-transport) (1). Sucrose then passes into the sieve tube element through plasmodesmata (1).",
  "(b)(i) Water molecules are polar, with a slightly negative oxygen and slightly positive hydrogen atoms (1). A hydrogen atom of one molecule is attracted to the oxygen atom of another molecule, and this attraction is a hydrogen bond (1).",
  "(b)(ii) Hydrogen bonds between water molecules cause cohesion (1). Water is pulled up the xylem as a continuous column under tension, because transpiration pulls on it and the molecules stay together (1). Adhesion between water and the walls of the xylem vessels also helps to hold the column up (1).",
  "(b)(iii) A large amount of heat energy is needed to evaporate water, so transpiration cools the leaf (1). This prevents overheating and denaturing of enzymes in the leaf (1)."],SRC(3)));
add("T6",P("Infectious disease, immunity, vaccination and antibiotics",11,
 QA2_Q4(),
 ["(a)(i) A disease caused by a pathogen (1) that can be passed from one host to another (transmitted) (1).",
  "(a)(ii) Mycobacterium tuberculosis (or Mycobacterium bovis) (1).",
  "(b) Natural passive immunity (1).",
  "(c) The mutation changes the shape of the antigens on the virus (1). Existing antibodies have variable regions that are not complementary to the new antigen, so they cannot bind (1). B cells have to make new, specific antibodies (1).",
  "(d)(i) Vaccinated people become immune and cannot pass on the pathogen (1). So fewer people are infected and the pathogen has fewer hosts, which reduces transmission (1). If enough people are vaccinated there is herd immunity, which also protects unvaccinated people (1).",
  "(d)(ii) Penicillin works by stopping bacteria from making their cell walls (1); viruses do not have cell walls (or do not have the bacterial enzymes that penicillin targets), so penicillin has no target in a virus (mark scheme: one reason)."],SRC(4)));
add("T6",P("ECMO, the gas exchange system, the aorta and carbon dioxide transport",10,
 QA2_Q5(),
 ["(a) One line from the right atrium to the arrow entering the top of the ECMO machine, and one line from the arrow leaving the bottom of the machine to the vena cava (1).",
  "(b)(i) The alveolar wall (alveolar epithelium and capillary endothelium) (1).",
  "(b)(ii) Oxygen diffuses from the oxygen-enriched air into the blood and carbon dioxide diffuses from the blood into the air (1). Flow in opposite directions (counter-current) keeps a concentration gradient along the whole membrane (1). The membrane is thin and has a large surface area, so diffusion is fast (1).",
  "(c) The tunica media of the aorta has more elastic fibres (elastin) and less smooth muscle than a muscular artery (1). The aorta receives blood at high pressure straight from the heart and the elastic fibres stretch (1) then recoil, which smooths out the pressure and keeps blood flowing (1).",
  "(d)(i) Carbonic anhydrase is needed to catalyse the reaction of carbon dioxide with water to form carbonic acid, which dissociates to hydrogencarbonate ions in the red blood cells (1).",
  "(d)(ii) The hydrogencarbonate ions stay in the red blood cells, so there is no need for chloride ions to move in to balance the charge (1)."],SRC(5)));
add("T2",P("Collagen structure and the effect of pH on collagenase",5,
 QA2_Q6(),
 ["(a) Collagen molecules have three polypeptide chains wound together in a triple helix (1). Hydrogen bonds hold the chains together, and glycine, the smallest amino acid, lets the chains pack tightly (1). Covalent cross-links join collagen molecules side by side into fibres, giving strength (1).",
  "(b) The change in H^+^ concentration changes the charges on R-groups, so ionic and hydrogen bonds in the enzyme break and the shape of the active site changes (1). Fewer substrate molecules fit the active site, so fewer enzyme-substrate complexes form and the rate is lower (1)."],SRC(6)));
})();
