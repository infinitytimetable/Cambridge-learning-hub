/* ===== Biology 9700/23 May/Jun 2023 (typed questions, redrawn diagrams): model answers written for this hub, not the official mark scheme ===== */
(function(){
const SRC=(q)=>"Cambridge 9700/23 May/Jun 2023, Q"+q+". Model answer written for this hub, not the official mark scheme.";
const add=(key,p)=>{AL_P[key]=(AL_P[key]||[]).concat([p])};
/* helpers (prefix QA4_) */
const QA4_M=n=>`<span style="white-space:nowrap;font-weight:600;margin-left:.5em">[${n}]</span>`;
const QA4_Q=(lab,txt,m,lvl)=>`<div style="padding-left:${(lvl||0)*1.7}em;margin:.6em 0;text-indent:0"><b>${lab}</b>&ensp;${txt}${m?QA4_M(m):""}</div>`;
const QA4_TD="border:1px solid currentColor;padding:.35em .6em;vertical-align:top;";
const QA4_TBL=(cap,head,rows,minh)=>`<div style="overflow-x:auto;margin:.6em 0"><table style="border-collapse:collapse;width:100%;max-width:640px"><caption style="text-align:center;font-weight:700;padding:.3em 0">${cap}</caption><thead><tr>${head.map(h=>`<th style="${QA4_TD}text-align:left">${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td style="${QA4_TD}${minh?"height:"+minh+"em;":""}">${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const QA4_IMG=(k,cap,alt,w)=>`<figure class="fig" style="max-width:${w||520}px"><img src="${ALQF4[k]}" alt="${alt.replace(/"/g,"&quot;")}" style="display:block;max-width:100%;height:auto;margin:0 auto;background:#fff;border-radius:6px"><figcaption>${cap}</figcaption></figure>`;
const QA4_SVG=(vb,minw,inner,cap,label)=>`<figure class="fig" style="max-width:760px"><div style="overflow-x:auto"><svg viewBox="${vb}" role="img" aria-label="${label.replace(/"/g,"&quot;")}" style="min-width:${minw}px;width:100%;height:auto">${inner}</svg></div><figcaption>${cap}</figcaption></figure>`;
const QA4_T=(x,y,s,o)=>{o=o||{};return `<text x="${x}" y="${y}" font-size="${o.s||12}" text-anchor="${o.a||"middle"}"${o.b?' font-weight="700"':""} fill="currentColor"${o.r?` transform="rotate(${o.r} ${x} ${y})"`:""}>${s}</text>`};
const QA4_L=(x1,y1,x2,y2,w,op)=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="currentColor" stroke-width="${w||1}" stroke-opacity="${op||1}" fill="none"/>`;
function QA4_smooth(p){let d=`M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`;for(let i=0;i<p.length-1;i++){const a=p[i-1]||p[i],b=p[i],c=p[i+1],e=p[i+2]||c;d+=`C${(b[0]+(c[0]-a[0])/6).toFixed(1)} ${(b[1]+(c[1]-a[1])/6).toFixed(1)} ${(c[0]-(e[0]-b[0])/6).toFixed(1)} ${(c[1]-(e[1]-b[1])/6).toFixed(1)} ${c[0].toFixed(1)} ${c[1].toFixed(1)}`}return d}
/* Fig. 2.1 */
function QA4_G21(){
  const X=y=>90+(y-1980)*20,Y=v=>260-(v-16000)*0.02;let s="";
  for(let i=0;i<=40;i++){const x=90+i*10,big=i%10===0,mid=i%5===0;s+=QA4_L(x,20,x,260,big?1.6:mid?.9:.5,big?.9:mid?.55:.3)}
  for(let v=16000;v<=28000;v+=200){const y=Y(v),big=v%2000===0,mid=v%1000===0;s+=QA4_L(90,y,490,y,big?1.6:mid?.9:.5,big?.9:mid?.55:.3)}
  for(let v=16000;v<=28000;v+=2000)s+=QA4_T(82,Y(v)+4,String(v).replace(/(\d+)(\d{3})/,"$1 $2"),{a:"end",s:11});
  for(let y=1980;y<=2000;y+=5)s+=QA4_T(X(y),277,y,{s:11});
  s+=QA4_T(290,294,"year",{s:11});s+=QA4_T(14,140,"number of reported cases of TB",{s:11,r:-90});
  const pts=[[1980,27750],[1980.5,27650],[1981,27400],[1981.3,26600],[1982,25400],[1982.5,24700],[1983,24000],[1983.5,23100],[1984,22250],[1984.5,22100],[1985,22200],[1985.5,22600],[1986.2,22750],[1986.9,22500],[1987.6,22370],[1988,22420],[1988.6,22850],[1989,23500],[1989.5,24800],[1990,25750],[1990.5,26100],[1991.2,26400],[1991.7,26650],[1992,26750],[1992.3,26400],[1992.6,25900],[1993,25200],[1993.6,24650],[1994,24300],[1994.5,23700],[1995,22850],[1995.5,22000],[1996,21250],[1996.7,20300],[1997.5,19000],[1998,18300],[1998.7,17800],[1999,17500],[1999.5,16800],[2000,16300]].map(p=>[X(p[0]),Y(p[1])]);
  s+=`<path d="${QA4_smooth(pts)}" fill="none" style="stroke:var(--accent)" stroke-width="2.6" stroke-linejoin="round"/>`;
  return QA4_SVG("0 0 520 300",430,s,"Fig. 2.1","Line graph of the number of reported cases of TB in the USA from 1980 to 2000. Vertical axis from 16 000 to 28 000 cases, horizontal axis years 1980 to 2000. The number falls from about 27 800 in 1980 to about 22 000 in 1984, stays near 22 000 to 22 800 until 1988, rises to a peak of about 26 700 in 1992, then falls steadily to about 16 300 in 2000.");
}
/* Fig. 3.2 */
function QA4_G32(){
  let s=`<path d="M60 250V20" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M60 250H410" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M60 12l-5 12h10zM418 250l-12-5v10z" fill="currentColor"/>`;
  s+=QA4_T(22,135,"rate of reaction",{s:12,r:-90})+QA4_T(235,283,"substrate concentration",{s:12});
  s+=`<path d="${QA4_smooth([[60,250],[97,180],[134,109],[150,89],[173,72],[205,60],[234,54],[280,49],[321,46],[360,45],[399,44]])}" fill="none" style="stroke:var(--accent)" stroke-width="2.6"/>`;
  return QA4_SVG("0 0 440 300",340,s,"Fig. 3.2","Graph of rate of reaction against substrate concentration for carbonic anhydrase. The curve rises steeply from the origin and levels off to a plateau at high substrate concentration.");
}
/* Fig. 6.1 nystose (coordinates follow the paper's drawing) */
function QA4_G61(){
  let s="";const H=(x,y,t,a)=>QA4_T(x,y,t,{a:a||"middle",s:30});
  const ln=(a,b,c,d)=>QA4_L(a,b,c,d,3);
  const ring=(dx,first)=>{let r="";const A=[298+dx,170],B=[255+dx,213],C=[255+dx,320],D=[300+dx,365],E=[375+dx,270];
    r+=ln(A[0],A[1],B[0],B[1])+ln(B[0],B[1],C[0],C[1])+ln(C[0],C[1],D[0],D[1])+ln(D[0],D[1],E[0]-14,E[1]+16)+ln(E[0]-9,E[1]-14,A[0],A[1]);
    r+=H(E[0],E[1]+10,"O");
    r+=ln(A[0],A[1],A[0]-16,A[1]-18)+H(A[0]-28,A[1]-30,"H")+ln(A[0],A[1],A[0]+26,A[1]-22)+H(A[0]+72,A[1]-30,"CH<tspan font-size='20' dy='8'>2</tspan><tspan dy='-8'>OH</tspan>");
    r+=ln(B[0],B[1],B[0]-32,B[1])+H(B[0]-62,B[1]+10,"HO")+ln(B[0],B[1],B[0]+22,B[1]+8)+H(B[0]+38,B[1]+22,"H");
    r+=ln(C[0],C[1],C[0]-30,C[1])+H(C[0]-52,C[1]+10,"H")+ln(C[0],C[1],C[0]+22,C[1]-14)+H(C[0]+50,C[1]-12,"OH");
    if(first)r+=ln(D[0],D[1],D[0]-30,D[1]+8)+H(D[0]-32,D[1]+22,"HOH<tspan font-size='20' dy='8'>2</tspan><tspan dy='-8'>C</tspan>","end");
    return r};
  s+=ring(0,true)+ring(270)+ring(540);
  for(let k=0;k<3;k++){const o=270*k,dx=300+o;
    s+=H(dx+88,375,"O")+ln(dx+14,365,dx+68,365);
    if(k<2){s+=ln(dx+108,365,dx+160,365)+H(dx+168,375,"CH<tspan font-size='20' dy='8'>2</tspan>","start")+ln(dx+232,365,dx+270,365)}
    else s+=ln(dx+108,365,1080,365)}
  /* glucose ring */
  const T=[1075,170],LT=[1020,213],LB=[1020,320],B=[1085,366],RB=[1135,320],RT=[1135,213];
  s+=ln(T[0],T[1],LT[0],LT[1])+ln(LT[0],LT[1],LB[0],LB[1])+ln(LB[0],LB[1],B[0],B[1])+ln(B[0]+10,B[1]-4,RB[0]-8,RB[1]+14)+H(RB[0]+2,RB[1]+8,"O")+ln(RB[0],RB[1]-18,RT[0],RT[1])+ln(RT[0],RT[1],T[0],T[1]);
  s+=ln(T[0],T[1],T[0]-14,T[1]-16)+H(T[0]-30,T[1]-28,"HO")+ln(T[0],T[1],T[0]+14,T[1]-16)+H(T[0]+34,T[1]-28,"H");
  s+=ln(LT[0],LT[1],LT[0]-30,LT[1])+H(LT[0]-48,LT[1]+10,"H")+ln(LT[0],LT[1],LT[0]+16,LT[1]+14)+H(LT[0]+42,LT[1]+36,"OH");
  s+=ln(RT[0],RT[1],RT[0]+30,RT[1])+H(RT[0]+86,RT[1]+10,"CH<tspan font-size='20' dy='8'>2</tspan><tspan dy='-8'>OH</tspan>")+ln(RT[0],RT[1],RT[0]-14,RT[1]+14)+H(RT[0]-30,RT[1]+30,"H");
  s+=ln(LB[0],LB[1],LB[0]-30,LB[1])+H(LB[0]-50,LB[1]+10,"HO")+ln(LB[0],LB[1],LB[0]+22,LB[1]-14)+H(LB[0]+42,LB[1]-12,"H");
  s+=ln(B[0],B[1],B[0]+20,B[1]+10)+H(B[0]+38,B[1]+22,"H");
  return QA4_SVG("130 100 1250 340",720,s,"Fig. 6.1","Structural formula of nystose: three five-membered fructose rings joined by O and CH2 links to a six-membered glucose ring at the right-hand end.");
}

/* ---------- Q1 ---------- */
add("T5",P("Stages of mitosis, DNA ligase and telomerase (Fig. 1.1)",11,
 `<p><b>1</b>&ensp;The cells in a tissue are often at different stages of the cell cycle.</p>`+
 QA4_Q("(a)","Fig. 1.1 shows cells at different stages of the cell cycle.",0,0)+
 QA4_IMG("f11","Fig. 1.1","Photomicrograph of dividing cells in different stages of the cell cycle, with four cells labelled A, B, C and D.",520)+
 QA4_Q("(i)","Identify the stages of mitosis occurring in the cells labelled <b>B</b> and <b>C</b> in Fig. 1.1.",2,1)+
 QA4_Q("(ii)","Describe the behaviour of the chromosomes in the stage of mitosis shown in cell <b>A</b> in Fig. 1.1.",3,1)+
 QA4_Q("(iii)","Cell <b>D</b> in Fig. 1.1 is in interphase.<br>Describe the role of DNA ligase in interphase.",3,1)+
 QA4_Q("(b)","Telomerase is an enzyme that is active during interphase in some cells. Telomerase helps to maintain telomeres present on chromosomes.",0,0)+
 QA4_Q("(i)","State the location of telomeres on a chromosome.",1,1)+
 QA4_Q("(ii)","Some people with a long lifespan have cells showing a higher than normal activity of telomerase.<br>Suggest why a long lifespan could result from a higher telomerase activity.",2,1),
 ["(a)(i) B: prophase (1); C: metaphase (1).", "(a)(ii) Cell A is in anaphase. The centromeres divide and the sister chromatids separate (1); the chromatids (now chromosomes) are pulled to opposite poles of the cell (1) by shortening of the spindle microtubules attached at the centromeres, so the chromosomes appear V-shaped with the centromere leading (1).", "(a)(iii) DNA ligase joins together Okazaki fragments on the lagging strand (1); it forms phosphodiester bonds between the sugar-phosphate backbones of adjacent fragments (1) so that the gaps are sealed and a continuous new strand is formed (1).", "(b)(i) At the ends of the chromosome (1).", "(b)(ii) Telomeres are not shortened (or are lengthened) at each cell division (1); so cells can divide more times before reaching the limit at which essential genes are lost and division stops, so tissues keep being replaced for longer (1)."],SRC(1)));
/* ---------- Q2 ---------- */
add("T6",P("Tuberculosis, HIV and the gas exchange system (Fig. 2.1)",11,
 `<p><b>2</b>&ensp;The number of cases of tuberculosis (TB) is affected by many biological, social and economic factors.</p>`+
 QA4_Q("(a)","The number of reported cases of TB in the USA between 1980 and 2000 is shown in Fig. 2.1.",0,0)+
 QA4_G21()+
 QA4_Q("(i)","Describe the trends shown in Fig. 2.1 between 1980 and 2000.",3,1)+
 QA4_Q("(ii)","The number of reported cases of TB between 1984 and 1992 in the USA may have been affected by an increase in the number of people infected with HIV.<br>Explain how an increase in the number of people infected with HIV could have affected the number of TB cases.",2,1)+
 QA4_Q("(b)","<i>Mycobacterium tuberculosis</i> is a species of bacterium that causes TB. Strains of <i>M. tuberculosis</i> have evolved resistance to some of the antibiotics used to treat the disease.<br>State <b>two</b> ways that the impact of antibiotic resistance can be reduced.",2,0)+
 QA4_Q("(c)","TB can affect every part of the human gas exchange system, including the trachea, bronchi and alveoli.",0,0)+
 QA4_Q("(i)","The cartilage in the bronchi can be damaged in some people with TB.<br>Suggest the effect that damage to cartilage may have on the bronchi.",1,1)+
 QA4_Q("(ii)","Table 2.1 shows four types of cell and three structures found in the gas exchange system.<br>Complete Table 2.1 to show the distribution of cell types in each structure of the gas exchange system.<br>Use a tick (✓) if the cell type is present in the structure and a cross (✗) if the cell type is not present.<br>Put a tick (✓) or a cross (✗) in every box.",3,1)+
 QA4_TBL("Table 2.1",["cell type","alveolus","bronchus","trachea"],[["ciliated epithelial cell","","",""],["goblet cell","","",""],["smooth muscle cell","","",""],["squamous epithelial cell","","",""]],1.6),
 ["(a)(i) Any three from: the number of cases falls from about 27 800 in 1980 to a minimum of about 22 000 in 1984; there is little change (about 22 000 to 22 800) from 1984 to 1988; the number then rises to a peak of about 26 700 in 1992; after 1992 there is a steady fall to about 16 300 in 2000; the overall change from 1980 to 2000 is a decrease of about 11 500 cases (3). Accept values within about 500 cases of those read from the graph.", "(a)(ii) HIV infects and destroys helper T cells, so the immune system is weakened (1); people with latent TB are more likely to develop active TB and people with HIV are more likely to be infected with TB, so the number of cases increases (1).", "(b) Any two from: complete the full course of antibiotics; use a combination of different antibiotics; use antibiotics only when necessary or only when prescribed; develop new antibiotics; isolate infected patients and screen contacts; improve hygiene and use vaccination (2).", "(c)(i) The bronchi may collapse or narrow, so the airflow into and out of the lungs is reduced (1).", "(c)(ii) Alveolus: squamous epithelial cell tick, ciliated, goblet and smooth muscle crosses. Bronchus: ciliated, goblet and smooth muscle ticks, squamous epithelial cross. Trachea: ciliated, goblet and smooth muscle ticks, squamous epithelial cross. Award 3 marks for all 12 boxes correct, 2 marks for 10 or 11 correct and 1 mark for 7 to 9 correct (3)."],SRC(2)));
/* ---------- Q3 ---------- */
add("T1",P("Blood cells, magnification and carbonic anhydrase (Fig. 3.1)",10,
 `<p><b>3</b>&ensp;Blood contains white blood cells and red blood cells.</p>`+
 QA4_Q("(a)","Fig. 3.1 is a photomicrograph showing different types of blood cell.",0,0)+
 QA4_IMG("f31","Fig. 3.1","Photomicrograph of blood cells: two white blood cells with lobed nuclei (left one labelled X), a white blood cell with a large round dark nucleus (labelled Y), many red blood cells, and a short line labelled Z across one red blood cell.",520)+
 QA4_Q("(i)","Identify cell <b>X</b> and cell <b>Y</b> in Fig. 3.1.",2,1)+
 QA4_Q("(ii)","The width of one of the cells in Fig. 3.1 is represented by the line <b>Z</b>.<br>The actual width of cell <b>Z</b> is 8 µm.<br>Calculate the magnification used to produce the image shown in Fig. 3.1.<br>Write down the formula you will use to make your calculation.<br><i>formula</i><br>magnification = ×",2,1)+
 QA4_Q("(b)","Carbonic anhydrase is an enzyme found in red blood cells.",0,0)+
 QA4_Q("(i)","Describe how carbonic anhydrase is involved in the release of oxygen from red blood cells at respiring tissues.",4,1)+
 QA4_Q("(ii)","Sulfonamide is a competitive inhibitor of carbonic anhydrase.<br>Fig. 3.2 shows the effect of increasing substrate concentration on the rate of the reaction catalysed by carbonic anhydrase.<br>Sketch a curve <b>on Fig. 3.2</b> to show the effect of sulfonamide on the rate of reaction catalysed by carbonic anhydrase.",2,1)+
 QA4_G32(),
 ["(a)(i) X: neutrophil (1); Y: lymphocyte (1).", "(a)(ii) Formula: magnification = image size ÷ actual size (1). The line Z measures about 12 mm = 12 000 µm, so 12 000 ÷ 8 = ×1500 (1). Accept a range of ×1400 to ×1600, depending on measurement.", "(b)(i) Carbon dioxide from respiring tissues diffuses into the red blood cells (1); carbonic anhydrase catalyses the reaction of carbon dioxide with water to form carbonic acid (1); the carbonic acid dissociates into hydrogen ions and hydrogencarbonate ions (1); the hydrogen ions bind to haemoglobin, which lowers its affinity for oxygen (Bohr shift), so oxyhaemoglobin releases oxygen (1).", "(b)(ii) A curve that lies below the original curve at low and moderate substrate concentrations (1) and rises to reach the same maximum rate (Vmax) at a higher substrate concentration (1)."],SRC(3)));
/* ---------- Q4 ---------- */
add("T2",P("Protein structure, introns and coeliac disease (gluten)",10,
 `<p><b>4</b>&ensp;Food crops such as barley and wheat contain gluten. Gluten contains two proteins, glutenin and gliadin.</p>`+
 QA4_Q("(a)(i)","Table 4.1 contains descriptions of the structures of glutenin and gliadin.<br>Complete Table 4.1 by writing the level of protein structure that applies to each description.",3,0)+
 QA4_TBL("Table 4.1",["description","level of protein structure"],[["a gliadin protein is a single polypeptide that forms a compact structure",""],["20% of the amino acids in a glutenin molecule are glycine",""],["gliadin and glutenin molecules contain regions of β-pleated sheets",""]],1.8)+
 QA4_Q("(ii)","Many genes in eukaryotic cells contain introns. The genes that code for gliadin do not contain introns.<br>Explain how a lack of introns in a gliadin gene affects the production of mRNA from the primary transcript.",1,1)+
 QA4_Q("(b)","Coeliac disease is a condition in which the immune system of a person responds to gluten in their diet.<br>In coeliac disease, there is a response to the presence of peptides (short chains of amino acids) that are produced as a result of gliadin digestion.",0,0)+
 QA4_Q("(i)","The gliadin peptides produced as result of digestion are often as large as 33 amino acids in length. Intestinal cells take up large numbers of these peptides at the same time.<br>Suggest and explain how gliadin peptides are transported into intestinal cells.",2,1)+
 QA4_Q("(ii)","The presence of gliadin causes the immune system of a person with coeliac disease to respond by producing anti-gliadin antibodies.<br>Describe the sequence of events that results in the immune system producing anti-gliadin antibodies.",4,1),
 ["(a)(i) A single polypeptide that forms a compact structure: tertiary (1); 20% of the amino acids are glycine: primary (1); regions of beta-pleated sheets: secondary (1).", "(a)(ii) There are no introns to be removed, so no splicing is needed and the primary transcript is already the mature mRNA (or mRNA is produced faster) (1).", "(b)(i) By endocytosis (1), because the peptides are too large to pass through channel or carrier proteins or to diffuse through the phospholipid bilayer (1).", "(b)(ii) A macrophage (antigen-presenting cell) engulfs gliadin and presents the antigen on its surface (1); a helper T cell with a complementary receptor binds to the antigen and is activated (1); the helper T cell releases cytokines that stimulate a B cell whose receptor is complementary to gliadin (1); the B cell divides by clonal expansion and differentiates into plasma cells, which secrete anti-gliadin antibodies (1)."],SRC(4)));
/* ---------- Q5 ---------- */
add("T6",P("Xylem, phloem and sucrose transport (Fig. 5.1)",10,
 `<p><b>5</b>&ensp;Phloem and xylem are specialised tissues involved in the transport of water, ions and assimilates in plants.</p>`+
 QA4_Q("(a)","A photomicrograph of a transverse section of a dicotyledonous stem is shown in Fig. 5.1.",0,0)+
 QA4_IMG("f51","Fig. 5.1","Photomicrograph of a transverse section of a dicotyledonous stem showing three vascular bundles, each with a dark crescent of tissue on the outside and large round thick-walled vessels on the inside, surrounded by large pale cells.",360)+
 QA4_Q("","Use label lines and labels to identify the phloem tissue <b>and</b> xylem tissue in Fig. 5.1.",2,1)+
 QA4_Q("(b)(i)","Describe how sucrose is transported in phloem sieve tubes from photosynthesising leaves to other parts of the plant.",4,0)+
 QA4_Q("(ii)","Cyanide ions (CN<sup>−</sup>) inhibit the activity of an enzyme involved in respiration.<br>Suggest why the treatment of photosynthesising leaves with CN<sup>−</sup> results in less sucrose being transported into phloem sieve tubes.",2,1)+
 QA4_Q("(c)","A student was asked to carry out semi-quantitative Benedict’s tests on two solutions.<ul style=\"margin:.3em 0\"><li>Solution <b>A</b> was extracted from the cytoplasm of cells in the mesophyll tissue of photosynthesising leaves.</li><li>Solution <b>B</b> was extracted from the phloem sap in phloem sieve tubes.</li></ul>The solutions were taken from the same plant, and other variables were standardised.<br>For each solution, the student measured the time taken for the first colour change to appear.<br>Suggest which of the two solutions, <b>A</b> or <b>B</b>, would change colour in the shortest time.<br>Explain your answer.",2,0),
 ["(a) Phloem: label line to the dark-stained tissue forming the outer crescent of a vascular bundle (1); xylem: label line to the large, thick-walled lignified vessels on the inner side of the bundle (1).", "(b)(i) Sucrose is actively loaded into the sieve tubes from the companion cells at the source (1); this lowers the water potential, so water enters from the xylem by osmosis (1); this produces a high hydrostatic (turgor) pressure at the source (1); sucrose flows by mass flow down the pressure gradient to the sink, where it is unloaded (1).", "(b)(ii) Cyanide inhibits an enzyme of respiration, so less ATP is produced (1); active loading of sucrose (by proton pumps and co-transport) needs ATP, so less sucrose is loaded (1).", "(c) Solution A (1), because the mesophyll cytoplasm contains reducing sugars such as glucose, which reduce Benedict's reagent, whereas phloem sap contains mostly sucrose, a non-reducing sugar that reacts only slowly or not at all (1)."],SRC(5)));
/* ---------- Q6 ---------- */
add("T2",P("Nystose, glycoproteins and the Golgi body (Fig. 6.1)",8,
 `<p><b>6</b>&ensp;Polysaccharides, such as glycogen, are composed of thousands of monomers. Oligosaccharides are carbohydrates that contain three to ten monomers in their chain.</p>`+
 QA4_Q("(a)","Nystose is one example of an oligosaccharide. The structure of nystose is shown in Fig. 6.1.",0,0)+
 QA4_G61()+
 QA4_Q("","State <b>three</b> differences between the structures of nystose and glycogen, <b>other</b> than the number of monomers in the molecules.",3,1)+
 QA4_Q("(b)","Cells use oligosaccharides to synthesise glycoproteins, which are transported to cell surface membranes.<br>Describe the roles of the rough endoplasmic reticulum and the Golgi body in synthesising glycoproteins.",4,0)+
 QA4_Q("(c)","State <b>one</b> role of glycoproteins in the cell surface membrane.",1,0),
 ["(a) Any three from: nystose contains fructose as well as glucose, whereas glycogen contains only glucose; nystose has three five-membered (furanose) rings as well as one six-membered (glucose) ring, whereas glycogen has only six-membered rings; nystose is unbranched, whereas glycogen has 1,6 branch points; nystose has different glycosidic bonds (such as 1,2 links), whereas glycogen has alpha-1,4 and alpha-1,6 glycosidic bonds(3).", "(b) Ribosomes on the rough endoplasmic reticulum make the polypeptide, which enters the lumen of the RER (1); the protein is folded and oligosaccharides are added to it (1); transport vesicles bud off from the RER and carry the glycoprotein to the Golgi body, where they fuse with it (1); the Golgi body modifies the glycoprotein further and packages it into vesicles that move to and fuse with the cell surface membrane (1).", "(c) Any one from: cell recognition (antigens); receptors for hormones or other signalling molecules; cell adhesion; stabilising the membrane by hydrogen bonding with water (1)."],SRC(6)));
})();
