/* ===== Biology 9700 past paper 9700/21 Oct/Nov 2022 (alevel_q1.js): questions typed in full, line diagrams and the graph redrawn as SVG, micrographs and the DNA structure kept as small crops (al_qf1.js); model answers written for this hub ===== */
(()=>{
const SRC=q=>"Cambridge 9700/21 Oct/Nov 2022, Q"+q+". Model answer written for this hub, not the official mark scheme.";
const add=(k,p)=>{AL_P[k]=(AL_P[k]||[]).concat([p])};
/* helpers (prefix QA1_) */
const QA1_IMG=(k,cap,alt,w)=>`<figure class="fig" style="max-width:${w||520}px"><img src="${ALQF1[k]}" alt="${alt}" style="display:block;width:100%;height:auto;background:#fff;border-radius:6px"><figcaption>${cap}</figcaption></figure>`;
const QA1_FG=(vb,inner,cap,label,w)=>`<figure class="fig" style="max-width:${w||520}px"><svg viewBox="${vb}" role="img" aria-label="${label}">${inner}</svg><figcaption>${cap}</figcaption></figure>`;
const QA1_Q=(n,t)=>`<p style="margin:.2em 0 .7em"><b>${n}</b>&nbsp; ${t}</p>`;
const QA1_P=(l,t,m,ind)=>`<p style="margin:.55em 0 .55em ${ind||0}em;overflow:hidden">${m?`<span style="float:right;font-weight:700;margin-left:1em">[${m}]</span>`:""}<b>${l}</b>&nbsp; ${t}</p>`;
const QA1_T=(x,y,s,o)=>{o=o||{};return `<text x="${x}" y="${y}" font-size="${o.s||26}" text-anchor="${o.a||"middle"}"${o.b?' font-weight="700"':""}${o.r?` transform="rotate(${o.r} ${x} ${y})"`:""} fill="currentColor">${s}</text>`};
/* a vessel drawn as an open tube (outline, white inside) */
const QA1_TUBE=d=>`<path d="${d}" fill="none" stroke="currentColor" stroke-width="17" stroke-linejoin="round" stroke-linecap="butt"/><path d="${d}" fill="none" style="stroke:var(--surface,#fff)" stroke-width="10" stroke-linejoin="round" stroke-linecap="butt"/>`;
const QA1_AR=(x,y,deg)=>`<polygon points="0,0 -24,-17 -24,17" transform="translate(${x} ${y}) rotate(${deg})" style="fill:var(--surface,#fff)" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>`;
const QA1_BX=(x,y,w,h,lines)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" style="fill:var(--surface,#fff)" stroke="currentColor" stroke-width="3"/>`+lines.map((t,i)=>QA1_T(x+w/2,y+h/2+9-(lines.length-1)*13+i*26,t,{s:26})).join("");

/* Fig. 2.1 circulatory system */
const QA1_CIRC=()=>{
  let s="";
  [ "M290,40 H170 V218 H255 L338,290", "M170,732 V232", "M170,480 H335", "M170,660 H335", "M170,727 H298",
    "M600,40 V735", "M480,40 H600", "M600,480 H438", "M600,598 H470", "M600,660 H438", "M600,727 H470",
    "M410,300 V262 Q410,225 480,225 H600", "M385,540 V500", "M385,300 L330,200 H215 V120 H333", "M441,118 H555 V250 L432,305"
  ].forEach(d=>{s+=QA1_TUBE(d)});
  s+=`<path d="M345,300 C325,330 335,385 380,402 Q398,415 418,402 C452,382 458,335 440,302 Q420,292 400,305 Q385,290 360,296 Z" style="fill:var(--surface,#fff)" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><path d="M398,300 V405" stroke="currentColor" stroke-width="5" fill="none"/>`;
  s+=QA1_AR(170,125,90)+QA1_AR(170,345,-90)+QA1_AR(170,575,-90)+QA1_AR(600,105,-90)+QA1_AR(600,395,90)+QA1_AR(600,595,90)
   +QA1_AR(486,40,180)+QA1_AR(445,480,180)+QA1_AR(477,598,180)+QA1_AR(445,660,180)+QA1_AR(477,727,180)+QA1_AR(385,515,-90)
   +QA1_AR(325,120,0)+QA1_AR(555,170,90)+QA1_AR(490,225,0);
  s+=QA1_BX(290,20,190,40,["head and arms"])+QA1_BX(333,98,108,42,["lungs"])+QA1_BX(335,462,100,36,["liver"])+QA1_BX(298,560,172,56,["stomach and","intestines"])+QA1_BX(335,636,100,36,["kidneys"])+QA1_BX(298,700,172,56,["lower body","and legs"]);
  s+=`<path d="M62,283 H343" stroke="currentColor" stroke-width="2" fill="none"/><path d="M412,255 H690" stroke="currentColor" stroke-width="2" fill="none"/>`+QA1_T(40,292,"Q",{s:30,b:1})+QA1_T(712,264,"R",{s:30,b:1});
  return QA1_FG("20 0 720 780",s,"Fig. 2.1","Simplified diagram of the human circulatory system: heart in the centre, lungs above it, and head and arms, liver, stomach and intestines, kidneys and lower body and legs arranged around it. Blood vessel Q enters the heart from the body on the left. Blood vessel R leaves the heart on the right towards the body.",560);
};
/* Fig. 2.2 shark antibody */
const QA1_SHARK=()=>{
  let s=QA1_TUBE("M50,20 L93,128 V262")+QA1_TUBE("M150,20 L107,128 V262");
  s+=`<path d="M93,185 H107 M93,205 H107" stroke="currentColor" stroke-width="3" fill="none"/>`;
  return QA1_FG("0 0 200 280",s,"Fig. 2.2","Structure of a shark antibody molecule: two long polypeptide chains forming a Y shape, joined by two short links in the stem.",240);
};
/* Fig. 4.1 virosome */
const QA1_VIRO=()=>{
  let s="",C=[330,235],R1=140,R2=162;
  const pt=(a,r)=>[(C[0]+r*Math.cos(a)).toFixed(1),(C[1]+r*Math.sin(a)).toFixed(1)];
  for(let k=0;k<120;k++){const a=k*Math.PI/60,o=pt(a,R2),i=pt(a,R1),o2=pt(a,R2-5),i2=pt(a,R1+5);
    s+=`<circle cx="${o[0]}" cy="${o[1]}" r="3.4" style="fill:var(--surface,#fff)" stroke="currentColor" stroke-width="1"/><circle cx="${i[0]}" cy="${i[1]}" r="3.4" style="fill:var(--surface,#fff)" stroke="currentColor" stroke-width="1"/>`;
    const m1=pt(a,(R2+R1)/2+4),m2=pt(a,(R2+R1)/2-4);
    s+=`<path d="M${o2[0]} ${o2[1]}L${m1[0]} ${m1[1]}M${i2[0]} ${i2[1]}L${m2[0]} ${m2[1]}" stroke="currentColor" stroke-width="1" fill="none"/>`;}
  for(let k=0;k<36;k++){const a=k*Math.PI/18+.05,deg=a*180/Math.PI;
    if(k%3===0){const p0=pt(a,R2+2),p1=pt(a,R2+52),h=pt(a,R2+62);
      s+=`<path d="M${p0[0]} ${p0[1]}L${p1[0]} ${p1[1]}" stroke="#7d7d7d" stroke-width="7" stroke-linecap="round"/><ellipse cx="${h[0]}" cy="${h[1]}" rx="9" ry="24" transform="rotate(${(deg+90).toFixed(1)} ${h[0]} ${h[1]})" fill="#b9b9b9" stroke="#333" stroke-width="2"/>`;}
    else{const c=pt(a,R2+4);s+=`<rect x="${(c[0]-8).toFixed(1)}" y="${(c[1]-24).toFixed(1)}" width="16" height="48" rx="8" transform="rotate(${(deg+90).toFixed(1)} ${c[0]} ${c[1]})" fill="#6c6c6c" stroke="#222" stroke-width="2"/>`;}}
  const hs=pt(-0.05,R2+62);
  s+=`<path d="M470,38 L${(+pt(0.05*0-0.78,R2+50)[0]).toFixed(0)},${(+pt(-0.78,R2+50)[1]).toFixed(0)}" stroke="currentColor" stroke-width="1.5" fill="none"/>`;
  s+=QA1_T(478,32,"glycoprotein",{a:"start",s:22})+QA1_T(478,58,"haemagglutinin",{a:"start",s:22});
  s+=`<path d="M470,150 L330,235" stroke="currentColor" stroke-width="1.5" fill="none"/>`+QA1_T(480,152,"central area",{a:"start",s:22});
  s+=QA1_T(6,342,"phospholipid",{a:"start",s:22})+QA1_T(6,368,"bilayer",{a:"start",s:22})+`<path d="M90,330 L${pt(2.62,R1+10)[0]},${pt(2.62,R1+10)[1]}" stroke="currentColor" stroke-width="1.5" fill="none"/>`;
  s+=`<path d="M470,330 L${pt(0.78,R2+8)[0]},${pt(0.78,R2+8)[1]}" stroke="currentColor" stroke-width="1.5" fill="none"/>`+QA1_T(478,332,"glycoprotein",{a:"start",s:22})+QA1_T(478,358,"neuraminidase",{a:"start",s:22})+QA1_T(478,384,"enzyme",{a:"start",s:22});
  return QA1_FG("0 0 640 480",s,"Fig. 4.1","Diagram of a section through a virosome: a ring made of a phospholipid bilayer, with light grey T-shaped haemagglutinin glycoproteins and dark grey neuraminidase enzyme glycoproteins passing through it, and an empty central area inside the ring.",560);
};
/* Fig. 6.2 graph: left axis percentage of cells in mitosis (dashed, crosses), right axis anaphase to metaphase ratio (solid, circles) */
const QA1_GRAPH=()=>{
  const X0=92,X1=472,Y0=420,Y1=60,xs=v=>X0+v*(X1-X0)/50,yl=v=>Y0-v*(Y0-Y1)/50,yr=r=>Y0-(r-0.05)/0.25*(Y0-Y1);
  let s="";
  for(let v=0;v<=50;v++){const ma=v%10===0;s+=`<path d="M${xs(v)} ${Y1}V${Y0}M${X0} ${yl(v)}H${X1}" stroke="currentColor" stroke-opacity="${ma?.45:.13}" stroke-width="${ma?1.2:.6}" fill="none"/>`}
  s+=`<rect x="${X0}" y="${Y1}" width="${X1-X0}" height="${Y0-Y1}" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
  for(let v=0;v<=50;v+=10){s+=QA1_T(xs(v),Y0+22,v,{s:15})+QA1_T(X0-8,yl(v)+5,v,{s:15,a:"end"})}
  for(let k=0;k<6;k++){s+=QA1_T(X1+8,yl(k*10)+5,(0.05+k*0.05).toFixed(2),{s:15,a:"start"})}
  s+=QA1_T((X0+X1)/2,Y0+52,"concentration of Paclitaxel / nmol dm<tspan dy='-5' font-size='11'>–3</tspan>",{s:15});
  s+=QA1_T(28,(Y0+Y1)/2,"percentage of cells in",{s:14,r:-90})+QA1_T(46,(Y0+Y1)/2,"stages of mitosis",{s:14,r:-90});
  s+=QA1_T(560,(Y0+Y1)/2+40,"ratio of the number of cells",{s:14,r:-90})+QA1_T(578,(Y0+Y1)/2+40,"in anaphase to cells in metaphase",{s:14,r:-90});
  const pd=[[5,5],[10,6],[20,18],[30,28],[50,38]],ps=[[5,.25],[10,.18],[20,.14],[30,.11],[50,.07]];
  s+=`<polyline points="${pd.map(p=>xs(p[0])+","+yl(p[1])).join(" ")}" fill="none" stroke="currentColor" stroke-width="2.4" stroke-dasharray="6 4"/>`;
  pd.forEach(p=>{const x=xs(p[0]),y=yl(p[1]);s+=`<path d="M${x-4} ${y-4}l8 8m0 -8l-8 8" stroke="currentColor" stroke-width="2"/>`});
  s+=`<polyline points="${ps.map(p=>xs(p[0])+","+yr(p[1])).join(" ")}" fill="none" stroke="currentColor" stroke-width="2.4"/>`;
  ps.forEach(p=>{s+=`<circle cx="${xs(p[0])}" cy="${yr(p[1])}" r="4.2" style="fill:var(--surface,#fff)" stroke="currentColor" stroke-width="2"/>`});
  s+=QA1_T(92,22,"Key",{a:"start",s:15,b:1})+`<path d="M130,16H168" stroke="currentColor" stroke-width="2.4" stroke-dasharray="6 4"/>`+QA1_T(176,21,"percentage of cells in stages of mitosis",{a:"start",s:14})
   +`<path d="M130,38H168" stroke="currentColor" stroke-width="2.4"/>`+QA1_T(176,43,"ratio of the number of cells in anaphase to cells in metaphase",{a:"start",s:14});
  return QA1_FG("0 0 600 500",s,"Fig. 6.2","Graph of percentage of cells in stages of mitosis (dashed line, left axis, 0 to 50) and the ratio of cells in anaphase to cells in metaphase (solid line, right axis, 0.05 to 0.30) against concentration of Paclitaxel from 0 to 50 nanomoles per cubic decimetre. The percentage rises from 5 at 5 to 6 at 10, 18 at 20, 28 at 30 and 38 at 50. The ratio falls from 0.25 at 5 to 0.18 at 10, 0.14 at 20, 0.11 at 30 and 0.07 at 50.",600);
};

/* Q1 */
add("T1",P("Liver cell organelles and electron microscopy (Fig. 1.1)",8,
 QA1_Q("1","<b>(a)</b> Fig. 1.1 is a transmission electron micrograph showing a section of a human liver cell.")
 +QA1_IMG("f11","Fig. 1.1","Transmission electron micrograph of a section of a human liver cell, with organelle A labelled on a rounded structure with folded internal membranes and organelle B labelled on stacked membranes studded with small dots.",480)
 +QA1_P("(i)","Name organelles <b>A</b> and <b>B</b> shown in Fig. 1.1.",2,1)
 +QA1_P("(ii)","In liver cells, enzymes are attached to the membrane of smooth endoplasmic reticulum.<br>With reference to the functions of smooth endoplasmic reticulum, suggest the advantages of having enzymes attached to the membrane rather than free in the lumen.",3,1)
 +QA1_P("(b)","Explain the advantages of using a transmission electron microscope compared with a light microscope when viewing a liver cell.",3),
[ "(a)(i) A: mitochondrion (1).",
  "(a)(i) B: rough endoplasmic reticulum / RER (1).",
  "(a)(ii) Enzymes are held in a fixed position, close together and in the correct orientation, so the product of one reaction passes straight to the next enzyme in a pathway (1).",
  "(a)(ii) The membrane gives a large surface area so many enzymes can be attached and more reactions can happen at once (1).",
  "(a)(ii) Lipid-soluble / hydrophobic substrates (e.g. lipids, steroids, some drugs) are in the membrane so they meet the enzyme easily; or the enzymes are not diluted or lost in the lumen (1).",
  "(b) Higher resolution (1).",
  "(b) Because electrons have a much shorter wavelength than light, so structures that are very close together can be distinguished (1).",
  "(b) Higher useful magnification, so the ultrastructure (ribosomes, membranes, cristae, nuclear envelope) can be seen (1)."],
 SRC(1)));

/* Q2 */
add("T6",P("Circulatory system and antibodies (Figs 2.1 and 2.2)",12,
 QA1_Q("2","Fig. 2.1 is a simplified diagram of the human circulatory system.")+QA1_CIRC()
 +QA1_P("(a)(i)","State why the human circulatory system is described as a closed, double circulation.",2)
 +QA1_P("(ii)","Identify blood vessel <b>Q</b> and blood vessel <b>R</b>, shown in Fig. 2.1.",1,1.4)
 +QA1_P("(iii)","Blood leaving the heart passes through valves before it enters blood vessel <b>R</b>.<br>Describe the differences between the structure of blood vessel <b>Q</b> and the structure of blood vessel <b>R</b>. Do <b>not</b> refer to valves in your answer.",3,1.4)
 +QA1_P("(b)","Blood plasma plays an important role in the transport of molecules such as antibodies.<br>Scientists discovered that some of the antibodies in the blood plasma of sharks have a different structure to the antibodies found in human blood plasma.<br>Fig. 2.2 shows the structure of an antibody molecule found in the blood plasma of a shark.")
 +QA1_SHARK()
 +QA1_P("(i)","State how the quaternary structure of a human antibody molecule differs from the quaternary structure of the shark antibody molecule shown in Fig. 2.2.",1,1.4)
 +QA1_P("(ii)","Human antibodies are used in the treatment of some forms of cancer. However, the antibodies injected into the bloodstream can only reach a small percentage of the cancer cells that form the cancerous tumour.<br>Shark antibodies are smaller than human antibodies. Scientists are researching the possibility of injecting shark antibodies into the bloodstream to treat cancerous tumours in humans.<br>Suggest how using the smaller shark antibodies may be more effective in reaching a greater percentage of cancer cells than human antibodies and lead to greater success at treating cancer.",2,1.4)
 +QA1_P("(iii)","Antibodies can also be used in the prevention of infectious diseases.<br>Explain how injection of antibodies into the bloodstream can protect a person from disease after infection by a pathogen.",3,1.4),
[ "(a)(i) Closed: blood stays inside blood vessels and does not leave the vessels to bathe the tissues (1).",
  "(a)(i) Double: blood passes through the heart twice in one complete circuit (one circuit to the lungs, a second to the rest of the body) (1).",
  "(a)(ii) Q: vena cava (vein bringing blood from the body to the right atrium) and R: aorta (1). Both are needed.",
  "(a)(iii) R has a thicker wall than Q (1).",
  "(a)(iii) R has more elastic tissue / elastic fibres, to stretch and recoil and maintain pressure (1).",
  "(a)(iii) R has more smooth muscle / collagen, or Q has the wider lumen relative to wall thickness (1).",
  "(b)(i) The human antibody has four polypeptide chains (two heavy and two light) whereas the shark antibody has two polypeptide chains (1).",
  "(b)(ii) Smaller antibodies can pass out of capillaries and diffuse deeper into the tumour tissue (1).",
  "(b)(ii) So they reach and bind to more cancer cells, which can then be destroyed (1).",
  "(b)(iii) Antibodies bind to antigens on the pathogen (1).",
  "(b)(iii) Agglutination (clumping) of pathogens, or neutralising toxins or blocking attachment to host cells (1).",
  "(b)(iii) The pathogens are then easier for phagocytes to engulf and destroy (1)."],
 SRC(2)));

/* Q3 */
add("T2",P("Carbonic anhydrase, DNA structure and mutation (Fig. 3.1)",12,
 QA1_Q("3","Carbonic anhydrase is a globular protein found in red blood cells.")
 +QA1_P("(a)(i)","Explain why this protein is described as globular.",2)
 +QA1_P("(ii)","State the function of carbonic anhydrase in red blood cells.",2,1.4)
 +QA1_P("(b)","A protein such as carbonic anhydrase is coded for by a gene. A gene forms part of a DNA molecule.<br>Fig. 3.1 is a diagram of a small section of a DNA molecule.")
 +QA1_IMG("f31","Fig. 3.1","Structural diagram of a short section of a DNA double helix drawn as two antiparallel strands with sugar-phosphate backbones, base pairs joined by dashed hydrogen bonds, 5 prime and 3 prime ends marked, and one base, labelled X, enclosed in a box on the right-hand strand.",460)
 +QA1_P("(i)","Identify the base <b>X</b> and state the evidence in Fig. 3.1 that supports this identification.",3,1.4)
 +QA1_P("(ii)","The section of the DNA molecule in Fig. 3.1 is part of a gene coding for a polypeptide.<br>Base <b>X</b>, shown in Fig. 3.1, is located in an exon on the strand of DNA that is transcribed during protein synthesis. A mutation that results in the deletion of base <b>X</b> will affect the polypeptide produced.<br>Explain how this deletion may affect the polypeptide produced during protein synthesis.",4,1.4)
 +QA1_P("(iii)","Gene mutations can occur in either introns or exons.<br>Suggest the effect of a gene mutation in an intron.",1,1.4),
[ "(a)(i) The polypeptide is folded into a compact, roughly spherical shape (1).",
  "(a)(i) Hydrophobic R groups are on the inside and hydrophilic R groups on the outside, so it is soluble (1).",
  "(a)(ii) Catalyses the reaction between carbon dioxide and water (1).",
  "(a)(ii) To form carbonic acid (H~2~CO~3~), which dissociates into hydrogen ions and hydrogencarbonate ions (1).",
  "(b)(i) Base X is guanine (1).",
  "(b)(i) Evidence: X forms three hydrogen bonds (1).",
  "(b)(i) Evidence: it pairs with cytosine on the other strand, or it has a double-ring structure (purine) pairing with a single-ring pyrimidine (1).",
  "(b)(ii) Deleting a base causes a frameshift mutation (1).",
  "(b)(ii) The reading frame moves, so all the triplets / codons after the deletion change (1).",
  "(b)(ii) Different amino acids are coded for, so the primary structure changes from that point (1).",
  "(b)(ii) A stop codon may appear earlier or later, so the polypeptide is shorter or longer; the tertiary structure and function (e.g. active site) change (1).",
  "(b)(iii) Probably no effect on the polypeptide, because introns are removed (spliced out) from the pre-mRNA and are not translated (1)."],
 SRC(3)));

/* Q4 */
add("T4",P("Virosomes, phospholipid bilayers and influenza (Fig. 4.1)",8,
 QA1_Q("4","<b>(a)</b> Scientists have produced structures known as virosomes, which are used in certain vaccines. Virosomes do <b>not</b> cause disease.<br>Fig. 4.1 is a diagram of a section through a virosome used in some vaccinations to protect against the virus which causes influenza.")+QA1_VIRO()
 +QA1_P("(i)","State the differences between the structure of a virosome and a virus.",2,1)
 +QA1_P("(ii)","Explain how the structure of the virosome shown in Fig. 4.1 suggests that the central area of the virosome is aqueous.",2,1)
 +QA1_P("(b)","The glycoproteins haemagglutinin and neuraminidase are found in the influenza virus and in the virosomes used in a vaccine against the influenza virus.<br>Haemagglutinin binds to a receptor in the cell surface membrane of phagocytes.<br>Suggest why haemagglutinin is present in virosomes used in the vaccine for influenza.",2)
 +QA1_P("(c)","Different strains of the influenza virus have formed as a result of mutations. Each strain of the virus contains the enzyme neuraminidase. Neuraminidase helps the virus to leave host cells after the virus has replicated. In each strain of the influenza virus, the primary structure of the active site of the neuraminidase enzyme remains unchanged.<br>Suggest why the primary structure of the active site of neuraminidase remains unchanged in each strain of the influenza virus.",2),
[ "(a)(i) The virosome has no nucleic acid / genetic material (1).",
  "(a)(i) The virosome has no capsid / protein coat (accept: it cannot replicate / is not infectious) (1).",
  "(a)(ii) The hydrophilic phosphate heads of the phospholipids face the central area (1).",
  "(a)(ii) Hydrophilic heads are attracted to water, so the central area must contain water / be aqueous (1).",
  "(b) Haemagglutinin binds to receptors on phagocytes so the virosome is taken in by endocytosis / phagocytosis (1).",
  "(b) It acts as an antigen, so the phagocytes present it and trigger an immune response / memory cells form (1).",
  "(c) The primary structure determines the shape of the active site (1).",
  "(c) A change would stop the substrate binding, so the virus could not leave host cells and spread; such mutations would be selected against (1)."],
 SRC(4)));

/* Q5 */
add("T6",P("Water transport, xylem development and infectious disease (Fig. 5.1)",13,
 QA1_Q("5","<b>(a)</b> When water molecules enter a plant through the roots, the molecules cross the cortex and enter the xylem tissue to be transported to other parts of the plant.<br>There are two pathways that water can take when crossing the root to the xylem tissue.<br>Complete Table 5.1 with information about the two pathways.")
 +`<p style="text-align:center;font-weight:700;margin:.4em 0">Table 5.1</p><table style="border-collapse:collapse;width:100%;max-width:560px;margin:0 auto 6px"><tr><th style="border:1px solid currentColor;padding:6px">name of pathway</th><th style="border:1px solid currentColor;padding:6px">outline of pathway</th></tr><tr><td style="border:1px solid currentColor;padding:14px 6px;width:45%"></td><td style="border:1px solid currentColor;padding:6px;text-align:center">movement of water from cell to cell through plasmodesmata</td></tr><tr><td style="border:1px solid currentColor;padding:14px 6px"></td><td style="border:1px solid currentColor;padding:14px 6px"></td></tr></table><div style="text-align:right;font-weight:700">[2]</div>`
 +QA1_P("(b)","Fig. 5.1 is a photomicrograph of a transverse section through the stem of a flowering plant.<br>On Fig. 5.1, draw a label line and the letter <b>T</b> to identify xylem tissue.",1)
 +QA1_IMG("f51","Fig. 5.1","Photomicrograph of a transverse section through the stem of a flowering plant, showing a ring of vascular bundles around a central region of large pith cells, inside an outer layer of epidermis.",440)
 +QA1_P("(c)","Scientists have studied the process of cell death that occurs during the development of the cells that become mature xylem vessel elements.<br>During this development, the tonoplast ruptures (bursts) and releases hydrolytic enzymes contained in the vacuole into the cytoplasm.")
 +QA1_P("(i)","Name an organelle found in animal cells that has a similar function to the vacuole in the developing xylem vessel elements.",1,1.4)
 +QA1_P("(ii)","The rupture of the tonoplast during development of xylem vessel elements is due to changes in permeability of the tonoplast.<br>Suggest how the permeability of the tonoplast changes and explain how this change could result in the rupture of the tonoplast.",3,1.4)
 +QA1_P("(iii)","During development of the xylem vessel elements the pH of the cytoplasm decreases. This change in pH activates enzymes in the cytoplasm that cause organelles to swell.<br>Suggest how a change in pH of the cytoplasm can activate enzymes.",2,1.4)
 +QA1_P("(d)","Some insects are vectors of disease.")
 +QA1_P("(i)","When an insect feeds on the xylem fluid it can act as a vector of plant diseases such as Pierce’s disease. This bacterial disease affects many fruit trees causing the leaves to turn brown and drop from the plant, resulting in much less fruit being produced.<br>Explain why Pierce’s disease can be described as an infectious disease.",2,1.4)
 +QA1_P("(ii)","Malaria is another infectious disease that also involves an insect vector.<br>State the type of organism that causes malaria and name one organism that causes malaria in humans.",2,1.4),
[ "(a) The pathway with water moving from cell to cell through plasmodesmata is the symplast(ic) pathway (1).",
  "(a) The other pathway is the apoplast(ic) pathway: water moves through the cell walls and intercellular spaces without entering the cytoplasm (1). Both name and outline are needed.",
  "(b) A label line and T drawn to one of the large, empty-looking vessels in the inner part of a vascular bundle (1).",
  "(c)(i) Lysosome (1).",
  "(c)(ii) Permeability to water and/or solutes increases (1).",
  "(c)(ii) More water enters the vacuole by osmosis (solutes lowering its water potential) (1).",
  "(c)(ii) The vacuole swells, the pressure rises and the tonoplast stretches beyond its limit and bursts (1).",
  "(c)(iii) The change in H^+^ concentration alters the ionic and hydrogen bonds in the enzyme (1).",
  "(c)(iii) So the tertiary structure / shape of the active site changes and the substrate can now bind: the enzyme becomes active (1).",
  "(d)(i) It is caused by a pathogen (a bacterium) (1).",
  "(d)(i) It can be transmitted from one plant to another (by the insect vector) (1).",
  "(d)(ii) Type of organism: protoctist / protist (1).",
  "(d)(ii) Name: Plasmodium (accept P. falciparum, P. vivax, P. ovale or P. malariae) (1)."],
 SRC(5)));

/* Q6 */
add("T5",P("Mitosis in plant cells and the effect of Paclitaxel (Figs 6.1 and 6.2)",7,
 QA1_Q("6","<b>(a)</b> Fig. 6.1 is a photomicrograph of plant cells in stages of the mitotic cell cycle.")
 +QA1_IMG("f61","Fig. 6.1","Photomicrograph of plant cells in different stages of the mitotic cell cycle. Cell Q is labelled and contains two separate groups of dark chromosomes at opposite ends of the cell.",480)
 +QA1_P("(i)","Name the stage of mitosis shown in cell <b>Q</b>.",1,1)
 +QA1_P("(ii)","Outline the roles of mitosis in a healthy plant.",2,1)
 +QA1_P("(b)","Uncontrolled mitosis can cause cancer in humans. Paclitaxel is a drug used in the treatment of some forms of cancer.<br>Researchers investigated the effect of Paclitaxel on the mitotic cell cycle of cancer cells.<ul style='margin:.3em 0 .3em 1.2em'><li>The cancer cells were grown for two days and then divided into groups.</li><li>Each group was treated with a different concentration of Paclitaxel.</li></ul>After 28 hours (one cell cycle):<ul style='margin:.3em 0 .3em 1.2em'><li>the percentage of cells in stages of mitosis was calculated</li><li>the ratio of the number of cells in anaphase to the number of cells in metaphase was determined.</li></ul>The results of the investigation are shown in Fig. 6.2.")
 +QA1_GRAPH()
 +QA1_P("","With reference to Fig. 6.2, describe the results and suggest an explanation for the effect of Paclitaxel on the mitotic cell cycle.",4),
[ "(a)(i) Anaphase (1).",
  "(a)(ii) Growth: an increase in cell number (1).",
  "(a)(ii) Replacement of old or damaged cells / repair; or asexual reproduction (vegetative propagation) (1).",
  "(b) The percentage of cells in mitosis increases as the Paclitaxel concentration increases (1).",
  "(b) The ratio of anaphase to metaphase cells decreases as the concentration increases (1).",
  "(b) Data quote, e.g. percentage in mitosis rises from about 5% at 5 nmol dm^−3^ to about 38% at 50 nmol dm^−3^, or the ratio falls from about 0.25 at 5 nmol dm^−3^ to about 0.07 at 50 nmol dm^−3^ (1).",
  "(b) Explanation: Paclitaxel stops cells passing from metaphase into anaphase, e.g. by preventing the spindle fibres (microtubules) working so sister chromatids cannot be pulled apart; cells are stuck in metaphase, so mitosis is arrested and fewer cells divide (1)."],
 SRC(6)));
})();
