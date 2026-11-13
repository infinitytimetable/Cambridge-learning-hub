/* ===== Biology 9700 past paper 9700/21 May/Jun 2023 (alevel_q3.js): questions typed in full, line diagrams and graph redrawn as SVG, micrographs/photo/plant drawing kept as small crops (al_qf3.js); model answers written for this hub ===== */
(()=>{
const SRC=q=>"Cambridge 9700/21 May/Jun 2023, Q"+q+". Model answer written for this hub, not the official mark scheme.";
const add=(k,p)=>{AL_P[k]=(AL_P[k]||[]).concat([p])};
/* helpers (prefix QA3_) */
const QA3_IMG=(k,cap,alt,w)=>`<figure class="fig" style="max-width:${w||520}px"><img src="${ALQF3[k]}" alt="${alt}" style="display:block;width:100%;height:auto;background:#fff;border-radius:6px"><figcaption>${cap}</figcaption></figure>`;
const QA3_FG=(vb,inner,cap,label,w,minw)=>{const sv=`<svg viewBox="${vb}" role="img" aria-label="${label}"${minw?` style="min-width:${minw}px"`:""}>${inner}</svg>`;return `<figure class="fig" style="max-width:${w||520}px">${minw?`<div style="overflow-x:auto">${sv}</div>`:sv}<figcaption>${cap}</figcaption></figure>`};
const QA3_Q=(n,t)=>`<p style="margin:.2em 0 .7em"><b>${n}</b>&nbsp; ${t}</p>`;
const QA3_P=(l,t,m,ind)=>`<p style="margin:.55em 0 .55em ${ind||0}em;overflow:hidden">${m?`<span style="float:right;font-weight:700;margin-left:1em">[${m}]</span>`:""}<b>${l}</b>&nbsp; ${t}</p>`;
const QA3_T=(x,y,s,o)=>{o=o||{};return `<text x="${x}" y="${y}" font-size="${o.s||14}" text-anchor="${o.a||"middle"}" dominant-baseline="central"${o.b?' font-weight="700"':""}${o.r?` transform="rotate(${o.r} ${x} ${y})"`:""} fill="currentColor">${s}</text>`};
const QA3_L=(x1,y1,x2,y2,w)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="${w||1.4}" stroke-linecap="round"/>`;
const QA3_PA=(d,w,f)=>`<path d="${d}" fill="${f||"none"}" stroke="currentColor" stroke-width="${w||1.6}" stroke-linejoin="round" stroke-linecap="round"/>`;
const QA3_CI=(x,y,r,f,w)=>`<circle cx="${x}" cy="${y}" r="${r}" ${f==="x"?"fill=\"currentColor\"":`style="fill:${f||"var(--surface,#fff)"}"`} stroke="currentColor" stroke-width="${w||1.4}"/>`;
const QA3_AR=(x1,y1,x2,y2,w,hl)=>{w=w||1.6;hl=hl||9;const a=Math.atan2(y2-y1,x2-x1),c=Math.cos(a),s=Math.sin(a),bx=x2-hl*c,by=y2-hl*s;return QA3_L(x1,y1,bx,by,w)+`<polygon points="${x2},${y2} ${(bx-hl*.4*s).toFixed(1)},${(by+hl*.4*c).toFixed(1)} ${(bx+hl*.4*s).toFixed(1)},${(by-hl*.4*c).toFixed(1)}" fill="currentColor"/>`};
const QA3_TUBE=(d,w)=>`<path d="${d}" fill="none" stroke="currentColor" stroke-width="${w||9}" stroke-linecap="round"/><path d="${d}" fill="none" style="stroke:var(--surface,#fff)" stroke-width="${(w||9)-3}" stroke-linecap="round"/>`;
const QA3_SUB=(a,b,c)=>`${a}<tspan dy="3" font-size="70%">${b}</tspan>${c?`<tspan dy="-3">${c}</tspan>`:""}`;
const QA3_SUP=(a,b)=>`${a}<tspan dy="-5" font-size="70%">${b}</tspan>`;

/* Fig. 1.2 vesicles and vacuole (drawn in paper units, then scaled) */
const QA3_VES=(x,y,t)=>{let s=QA3_CI(x,y,11,null,1.5);const P={d:[[-5,-4],[2,-6],[6,-1],[-2,0],[-5,4],[3,5],[0,-3]],t:[[-5,-4],[2,-5],[5,0],[-4,2],[1,5],[-1,-1]],s:[[-5,-5],[1,-5],[5,-1],[-4,0],[0,2],[4,5],[-5,5]]}[t];P.forEach(([a,b])=>{s+=t==="d"?`<circle cx="${x+a}" cy="${y+b}" r="1.7" fill="currentColor"/>`:t==="t"?`<polygon points="${x+a},${y+b-3} ${x+a+3},${y+b+2.5} ${x+a-3},${y+b+2.5}" fill="currentColor"/>`:`<rect x="${x+a-2.2}" y="${y+b-2.2}" width="4.4" height="4.4" fill="currentColor"/>`});return s};
const QA3_RER=(x,y,rot,len)=>{let s=`<g transform="translate(${x} ${y}) rotate(${rot})">`;[-17,0,17].forEach(o=>{s+=`<rect x="${-len/2}" y="${o-5}" width="${len}" height="10" rx="5" fill="none" stroke="currentColor" stroke-width="1.5"/>`});for(let i=-len/2+4;i<len/2;i+=10){s+=`<circle cx="${i}" cy="-27" r="2.4" fill="currentColor"/><circle cx="${i+4}" cy="27" r="2.4" fill="currentColor"/>`}return s+`</g>`};
const QA3_F12=()=>{
 let s=`<g transform="scale(.75) translate(-88 -198)">`;
 s+=QA3_PA("M218,236 C330,212 520,214 606,264")+QA3_PA("M218,248 C330,224 520,226 606,276");
 s+=QA3_PA("M395,242 C393,254 417,254 415,242 C412,233 398,233 395,242Z",1.4,"var(--surface,#fff)");
 [[388,210],[421,214],[369,225],[404,230]].forEach(([a,b])=>{s+=`<circle cx="${a}" cy="${b}" r="2.2" fill="currentColor"/>`});
 s+=QA3_T(424,246,"X",{s:24,b:1,a:"start"});
 s+=QA3_AR(413,256,430,278,1.5,10)+QA3_VES(440,292,"d")+QA3_AR(445,307,416,336,1.5,10);
 s+=QA3_PA("M360,376 C356,362 370,356 380,358 C384,344 402,342 405,356 C420,350 430,362 421,374 C428,388 411,396 404,391 C400,404 386,404 384,392 C372,396 358,390 360,376Z",1.5,"var(--surface,#fff)");
 [[390,370],[402,373],[396,382]].forEach(([a,b])=>{s+=`<circle cx="${a}" cy="${b}" r="1.8" fill="currentColor"/>`});
 s+=QA3_L(600,340,432,370,1.1)+QA3_T(601,322,"multi-vesicular",{s:21,a:"start"})+QA3_T(601,346,"body",{s:21,a:"start"});
 s+=QA3_AR(441,405,498,445,1.5,10)+QA3_VES(417,427,"d")+QA3_VES(439,449,"d")+QA3_VES(470,463,"d");
 /* vacuole */
 s+=QA3_PA("M522,420 C560,380 622,388 628,432 C634,480 626,522 612,560 C604,584 572,588 556,584 C537,592 518,584 530,566 C492,548 478,536 502,526 C522,517 512,496 509,470 C507,442 514,428 522,420Z",1.6,"var(--surface,#fff)");
 [[527,476],[541,474],[523,490],[535,484],[557,487]].forEach(([a,b])=>{s+=`<circle cx="${a}" cy="${b}" r="2" fill="currentColor"/>`});
 [[520,515],[531,517],[526,526],[508,531],[536,531]].forEach(([a,b])=>{s+=`<polygon points="${a},${b-4} ${a+4},${b+3} ${a-4},${b+3}" fill="currentColor"/>`});
 [[535,550],[546,553],[557,549],[541,562],[548,563]].forEach(([a,b])=>{s+=`<rect x="${a-2.5}" y="${b-2.5}" width="5" height="5" fill="currentColor"/>`});
 s+=QA3_L(612,520,658,540,1.1)+QA3_T(660,538,"vacuole",{s:21,a:"start"});
 /* ER */
 s+=QA3_RER(293,340,-30,120)+QA3_RER(262,490,-64,96);
 s+=QA3_L(192,360,248,360,1.1)+QA3_T(96,344,"rough",{s:21,a:"start"})+QA3_T(96,364,"endoplasmic",{s:21,a:"start"})+QA3_T(96,384,"reticulum",{s:21,a:"start"});
 s+=QA3_L(192,282,241,258,1.1)+QA3_T(108,283,"cell surface",{s:21,a:"start"})+QA3_T(108,303,"membrane",{s:21,a:"start"});
 /* vesicles from ER and Golgi */
 s+=QA3_AR(258,396,282,406,1.5,10)+QA3_VES(308,404,"t")+QA3_AR(320,422,332,448,1.5,10)+QA3_VES(342,466,"t");
 s+=QA3_AR(333,513,356,528,1.5,10)+QA3_VES(352,518,"t");
 s+=QA3_AR(231,548,254,566,1.5,10)+QA3_VES(272,566,"s")+QA3_AR(285,612,312,616,1.5,10)+QA3_VES(301,597,"s");
 /* Golgi */
 for(let i=0;i<6;i++)s+=QA3_TUBE(`M${346+i*15},548 C${338+i*15},590 ${350+i*15},628 ${378+i*13},660`,8);
 s+=QA3_L(310,628,336,666,1.1)+QA3_T(258,672,"Golgi body",{s:21,a:"start"});
 s+=QA3_AR(422,540,466,530,1.5,10)+QA3_VES(452,556,"t");
 s+=QA3_VES(436,652,"s")+QA3_AR(452,676,502,654,1.5,10)+QA3_VES(497,628,"s");
 /* key */
 s+=QA3_T(700,398,"Key",{s:21,a:"start"})+`<polygon points="685,418 679,428 691,428" fill="currentColor"/>`+QA3_T(700,424,"protein folded",{s:21,a:"start"})+QA3_T(700,445,"correctly",{s:21,a:"start"});
 s+=`<rect x="680" y="462" width="10" height="10" fill="currentColor"/>`+QA3_T(700,468,"protein <tspan font-weight=\"700\">not</tspan>",{s:21,a:"start"})+QA3_T(700,489,"folded correctly",{s:21,a:"start"});
 s+=`</g>`;
 return QA3_FG("0 0 565 375",s,"Fig. 1.2","Diagram of vesicle movement in a plant cell. At X on the cell surface membrane a small pit pinches off a vesicle that carries material to a multi-vesicular body and on to the vacuole. Vesicles carrying correctly folded proteins (triangles) and incorrectly folded proteins (squares) leave the rough endoplasmic reticulum, pass to the Golgi body, and vesicles from the Golgi body fuse with the large vacuole. The key shows triangles as protein folded correctly and squares as protein not folded correctly.",560,400);
};

/* Fig. 2.1 glycogen and cellulose structures */
const QA3_CH2OH=(x,y)=>`<text x="${x}" y="${y}" font-size="14" text-anchor="middle" dominant-baseline="central" fill="currentColor">CH<tspan dy="3" font-size="10">2</tspan><tspan dy="-3">OH</tspan></text>`;
const QA3_RING=(cx,cy,f,o)=>{o=o||{};const X=x=>+(cx+x).toFixed(1),Y=y=>+(cy+y*f).toFixed(1),R=(x,y)=>X(x)+","+Y(y);
 let s=`<path d="M${R(18,-26)} L${R(-25,-26)} L${R(-49,0)} L${R(-25,26)} L${R(25,26)} L${R(49,0)} L${R(30,-20)}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>`;
 s+=QA3_T(X(25),Y(-26),"O",{s:14});
 s+=QA3_L(X(-25),Y(-26),X(-25),Y(-35),1.2)+(o.ch2?`<text x="${X(-25)}" y="${Y(-45)}" font-size="14" text-anchor="middle" dominant-baseline="central" fill="currentColor">CH<tspan dy="3" font-size="10">2</tspan></text>`:QA3_CH2OH(X(-25),Y(-45)));
 s+=QA3_L(X(-25),Y(-26),X(-25),Y(-19),1.2)+QA3_T(X(-25),Y(-10),"H");
 s+=QA3_L(X(25),Y(26),X(25),Y(34),1.2)+QA3_T(X(25),Y(45),"OH");
 s+=QA3_L(X(25),Y(26),X(25),Y(19),1.2)+QA3_T(X(25),Y(10),"H");
 s+=QA3_L(X(-25),Y(26),X(-25),Y(19),1.2)+QA3_T(X(-25),Y(10),"OH");
 s+=QA3_L(X(-25),Y(26),X(-25),Y(34),1.2)+QA3_T(X(-25),Y(45),"H");
 if(o.s1){s+=QA3_L(cx+49,cy,cx+49,cy+24*o.s1,1.2)}
 if(o.h1){s+=QA3_L(cx+49,cy,cx+49,cy-12*o.h1,1.2)+QA3_T(cx+49,cy-22*o.h1,"H")}
 if(o.s4){s+=QA3_L(cx-49,cy,cx-49,cy+24*o.s4,1.2)}
 if(o.h4){s+=QA3_L(cx-49,cy,cx-49,cy-12*o.h4,1.2)+QA3_T(cx-49,cy-22*o.h4,"H")}
 return s};
const QA3_BR=(x1,x2,y)=>{const m=(x1+x2)/2;return QA3_L(x1,y,m-8,y,1.2)+QA3_L(m+8,y,x2,y,1.2)+QA3_T(m,y,"O")};
const QA3_DASH=(x1,x2,y)=>`<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="currentColor" stroke-width="1.4" stroke-dasharray="4 3"/>`;
const QA3_F21=()=>{
 let s="";
 /* glycogen */
 s+=QA3_RING(120,250,1,{s1:1,s4:1,h1:1,h4:1})+QA3_RING(268,250,1,{s1:1,s4:1,h1:1,h4:1,ch2:1})+QA3_RING(416,250,1,{s1:1,s4:1,h1:1,h4:1});
 s+=QA3_BR(169,219,274)+QA3_BR(317,367,274);
 s+=QA3_T(50,274,"O")+QA3_L(71,274,58,274,1.2)+QA3_DASH(14,42,274);
 s+=QA3_T(486,274,"O")+QA3_L(465,274,478,274,1.2)+QA3_DASH(494,536,274);
 /* branch ring */
 s+=QA3_RING(149,125,1,{s4:1,h4:1,h1:1});
 s+=QA3_T(78,149,"O")+QA3_L(100,149,87,149,1.2)+QA3_DASH(30,70,149);
 s+=QA3_L(198,125,208,143,1.2)+QA3_T(214,152,"O")+QA3_L(219,160,236,192,1.2);
 s+=QA3_L(243,224,243,215,1.2);
 s+=QA3_T(268,330,"glycogen",{s:15});
 /* cellulose */
 const cy=420;
 s+=QA3_RING(105,cy,-1,{s1:1,s4:-1,h1:1,h4:-1})+QA3_RING(253,cy,1,{s1:-1,s4:1,h1:-1,h4:1})+QA3_RING(401,cy,-1,{s1:1,s4:-1,h1:1,h4:-1})+QA3_RING(549,cy,1,{s4:1,h4:1});
 s+=QA3_BR(154,204,cy+24)+QA3_BR(302,352,cy-24)+QA3_BR(450,500,cy+24);
 s+=QA3_T(36,cy-24,"O")+QA3_L(56,cy,56,cy-24,1.2)+QA3_L(56,cy-24,48,cy-24,1.2)+QA3_DASH(6,26,cy-24);
 s+=QA3_DASH(600,634,cy);
 s+=QA3_T(330,498,"cellulose",{s:15});
 return QA3_FG("0 60 640 455",s,"Fig. 2.1","Structural formulae of small regions of a glycogen molecule and a cellulose molecule. Glycogen: three glucose rings joined by oxygen links between carbon 1 and carbon 4, all with the CH2OH group on the same side of the ring, and a fourth glucose ring joined by an oxygen and a CH2 group from carbon 1 to carbon 6 of the middle ring, forming a branch. Cellulose: a straight chain of four glucose rings joined by oxygen links, with every alternate ring inverted.",640,450);
};
/* Fig. 2.2 glycogen branched chains of hexagons */
const QA3_HEX=(x,y)=>{let p="";for(let i=0;i<6;i++){const a=Math.PI/3*i+Math.PI/6;p+=(i?"L":"M")+(x+5.2*Math.cos(a)).toFixed(1)+","+(y+5.2*Math.sin(a)).toFixed(1)}return `<path d="${p}Z" style="fill:var(--surface,#fff)" stroke="currentColor" stroke-width="1.3"/>`};
const QA3_CHAIN=(pts,step)=>{step=step||11.5;let s="",line="",seg=[];pts.forEach((p,i)=>{line+=(i?"L":"M")+p[0]+","+p[1]});s+=`<path d="${line}" fill="none" stroke="currentColor" stroke-width="1.2"/>`;let carry=0;for(let i=0;i<pts.length-1;i++){const [x1,y1]=pts[i],[x2,y2]=pts[i+1],d=Math.hypot(x2-x1,y2-y1);let t=carry;while(t<=d){seg.push([x1+(x2-x1)*t/d,y1+(y2-y1)*t/d]);t+=step}carry=t-d}seg.forEach(p=>{s+=QA3_HEX(p[0],p[1])});return s};
const QA3_F22=()=>{
 const C=[
  [[8,213],[30,232],[55,245],[90,248],[145,249],[175,236],[200,230],[260,230],[300,210],[320,192]],
  [[73,50],[85,82],[100,108],[115,135],[118,170],[130,195],[140,222],[145,249]],
  [[128,10],[128,28],[128,43],[127,60],[112,78],[100,108]],
  [[115,75],[140,90],[160,110],[172,122]],
  [[172,38],[180,53],[188,68],[195,85],[197,105],[197,140],[195,160],[180,185],[175,205],[172,222],[175,236]],
  [[200,112],[215,105],[230,110],[244,118]],
  [[235,40],[235,55],[234,70],[233,86],[244,118]],
  [[263,98],[263,115],[270,147],[282,165],[280,190],[267,210],[262,230]],
  [[305,98],[300,118],[290,145],[282,165]],
  [[251,162],[245,180],[230,193],[215,185],[200,175],[196,160]],
  [[45,190],[55,202],[70,212],[85,220],[98,230],[110,246]],
  [[30,132],[43,147],[53,158],[65,170],[82,172],[98,174],[115,175]]
 ];
 let s=`<g transform="translate(14 6)">`;C.forEach(c=>{s+=QA3_CHAIN(c)});s+=`</g>`;
 return QA3_FG("0 0 360 272",s,"Fig. 2.2","Diagram of part of a glycogen molecule: many short chains of glucose units (hexagons) joined end to end, with numerous side branches coming off a main chain, so the molecule is highly branched and has many free ends.","380");
};

/* Fig. 3.2 graph */
const QA3_F32=()=>{
 const x0=74,y0=272,kx=1.68,ky=24,X=v=>+(x0+v*kx).toFixed(1),Y=v=>+(y0-v*ky).toFixed(1);
 const pts=[[0,0],[12.5,.9],[25,2.8],[50,5.6],[100,8.3],[150,8.9],[200,9],[250,9]];
 let s="";
 for(let v=0;v<=250;v+=50)s+=`<line x1="${X(v)}" y1="${Y(0)}" x2="${X(v)}" y2="${Y(10)}" stroke="currentColor" stroke-opacity=".18"/>`+QA3_T(X(v),Y(0)+19,v,{s:17});
 for(let v=0;v<=10;v++)s+=`<line x1="${X(0)}" y1="${Y(v)}" x2="${X(250)}" y2="${Y(v)}" stroke="currentColor" stroke-opacity=".18"/>`+QA3_T(X(0)-9,Y(v),v,{s:17,a:"end"});
 s+=`<rect x="${X(0)}" y="${Y(10)}" width="${X(250)-X(0)}" height="${Y(0)-Y(10)}" fill="none" stroke="currentColor" stroke-width="1.5"/>`;
 let d=`M${X(pts[0][0])},${Y(pts[0][1])}`;
 for(let i=0;i<pts.length-1;i++){const p0=pts[Math.max(i-1,0)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(i+2,pts.length-1)];
  const c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];
  d+=` C${X(c1[0])},${Y(Math.min(c1[1],9))} ${X(c2[0])},${Y(Math.min(c2[1],9))} ${X(p2[0])},${Y(p2[1])}`}
 s+=`<path d="${d}" fill="none" stroke="var(--accent)" stroke-width="2.2"/>`;
 pts.forEach(p=>{s+=`<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="4.2" style="fill:var(--surface,#fff)" stroke="currentColor" stroke-width="1.3"/><circle cx="${X(p[0])}" cy="${Y(p[1])}" r="1.2" fill="currentColor"/>`});
 s+=`<text x="${X(125)}" y="${Y(0)+50}" font-size="17" text-anchor="middle" fill="currentColor">concentration of glucose / μmol dm<tspan dy="-5" font-size="12">−3</tspan></text>`;
 s+=`<g transform="rotate(-90 22 ${Y(5)})"><text x="22" y="${Y(5)}" font-size="16" text-anchor="middle" fill="currentColor">rate of uptake of glucose / μmol min<tspan dy="-5" font-size="12">−1</tspan><tspan dy="5"> g</tspan><tspan dy="-5" font-size="12">−1</tspan></text></g>`;
 return QA3_FG("0 0 520 340",s,"Fig. 3.2","Graph of rate of uptake of glucose in micromoles per minute per gram against concentration of glucose in micromoles per cubic decimetre, from 0 to 250. The curve rises steeply from 0 at 0, through about 2.8 at 25 and 5.6 at 50, then flattens: 8.3 at 100, 8.9 at 150, and a plateau of 9 at 200 and 250.",520);
};
/* Fig. 3.3 macrophage membrane protein */
const QA3_F33=()=>{
 let s="";
 [106,120,134,148,162,218,232,246,260,274].forEach(x=>{
  s+=QA3_CI(x,150,4.5,null,1.2)+QA3_CI(x,196,4.5,null,1.2);
  [-2.6,2.6].forEach(o=>{s+=QA3_L(x+o,155,x+o,172,1.1)+QA3_L(x+o,191,x+o,174,1.1)})});
 const prot=m=>{const X=x=>m?380-x:x;let d=`M${X(180)},22 V42 C${X(180)},52 ${X(152)},52 ${X(150)},66 C${X(148)},78 ${X(164)},80 ${X(180)},82 C${X(180)},88 ${X(150)},90 ${X(148)},106 C${X(147)},120 ${X(164)},126 ${X(180)},128 V150`;
  let z=`M${X(180)},152`;for(let i=0;i<9;i++)z+=` L${X(i%2?177:183)},${152+(i+1)*4.6}`;z+=` L${X(180)},194`;
  const tail=`M${X(180)},194 C${X(180)},208 ${X(172)},216 ${X(175)},234`;
  return QA3_PA(d,1.5)+QA3_PA(z,1.2)+QA3_PA(tail,1.5)};
 s+=prot(0)+prot(1);
 s+=QA3_L(255,34,194,60,1.1)+QA3_T(260,26,"antigen-binding",{s:15,a:"start"})+QA3_T(260,44,"region",{s:15,a:"start"});
 s+=QA3_L(108,205,160,224,1.1)+QA3_T(102,204,"cytoplasm",{s:15,a:"end"});
 return QA3_FG("0 0 380 250",s,"Fig. 3.3","Diagram of a protein in the cell surface membrane of a macrophage. Two chains span the phospholipid bilayer, each with lobed domains outside the membrane; the gap between the two chains at the top is labelled antigen-binding region. The side of the membrane with the protein tails is the cytoplasm.",380);
};

/* Fig. 4.1 replication fork */
const QA3_F41=()=>{
 let s="";const D=21.5,A=17.5,ca=Math.cos(A*Math.PI/180);
 const up=["G","G","C","A","G","A","T","T","G","C","C","T","G","C","T","G","A","G","G"],upn=["A","A","C","G","G","A","C","G","A","C","T","C","C"];
 const lo=["C","C","G","T","C","T","A","A","A","C","G","G","A","C","G","A","C","T","C","C"],lon=["G","A","T","T","T","G","C","C","T","G","C","T","G","A"];
 const tick=(x,a,b)=>QA3_L(x,a,x,b,1.1);
 const sq=(x,y,dx)=>`<path d="M${x},${y} l${dx*3},-5 l${dx*3},10 l${dx*3},-10 l${dx*3},10" fill="none" stroke="currentColor" stroke-width="1.3"/>`;
 /* stem */
 const Ty=150,By=206;
 s+=QA3_L(50,Ty,150,Ty)+QA3_L(50,By,150,By);
 ["A","A","C","A"].forEach((c,i)=>{const x=75+i*21.5;s+=tick(x,Ty,Ty+7)+QA3_T(x,Ty+16,c)});
 ["T","T","G","T"].forEach((c,i)=>{const x=75+i*21.5;s+=tick(x,By,By-7)+QA3_T(x,By-16,c)});
 s+=QA3_T(36,Ty,"5'",{s:15,a:"end"})+QA3_T(36,By,"3'",{s:15,a:"end"});
 /* upper arm */
 let g=`<g transform="translate(150 ${Ty}) rotate(${-A})">`;
 const L1=10+D*18+16;
 g+=QA3_L(0,0,L1,0)+sq(L1,0,1);
 up.forEach((c,i)=>{const x=10+i*D;g+=tick(x,0,7)+QA3_T(x,17,c)});
 g+=`<ellipse cx="${10+D*6.4}" cy="26" rx="25" ry="34" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-opacity=".5"/>`;
 upn.forEach((c,i)=>{const x=10+(i+6)*D;g+=QA3_T(x,36,c)});
 g+=QA3_L(10+6*D-9,52,10+18*D+16,52)+QA3_L(10+6*D-9,52,10+6*D-9,45)+sq(10+18*D+16,52,1);
 upn.forEach((c,i)=>{const x=10+(i+6)*D;g+=QA3_L(x,52,x,45,1.1)});
 g+=QA3_AR(150,-20,70,-20,1.6,10);
 g+=`</g>`;s+=g;
 /* lower arm */
 g=`<g transform="translate(150 ${By}) rotate(${A})">`;
 g+=QA3_L(0,0,L1,0)+sq(L1,0,1);
 lo.forEach((c,i)=>{const x=10+i*D;g+=tick(x,0,-7)+QA3_T(x,-17,c)});
 g+=QA3_L(10+4*D-9,-52,10+17*D+10,-52)+QA3_L(10+17*D+10,-52,10+17*D+10,-45);
 lon.forEach((c,i)=>{const x=10+(i+4)*D;g+=QA3_L(x,-52,x,-45,1.1)+QA3_T(x,-36,c)});
 g+=`<ellipse cx="${10+D*18.2}" cy="-26" rx="25" ry="34" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-opacity=".5"/>`;
 g+=QA3_AR(330,24,400,24,1.6,10);
 g+=`</g>`;s+=g;
 const ux=150+(L1+16)*ca+4,uy=Ty-(L1+16)*Math.sin(A*Math.PI/180);
 s+=QA3_T(ux+4,uy-6,"3'",{s:15,a:"start"});
 s+=QA3_T(150+(L1+16)*ca+8,By+(L1+16)*Math.sin(A*Math.PI/180)+8,"5'",{s:15,a:"start"});
 s+=QA3_T(235,32,"DNA",{s:15,a:"start"})+QA3_T(235,50,"polymerase",{s:15,a:"start"})+QA3_L(265,58,272,92,1.1);
 s+=QA3_T(520,222,"DNA",{s:15,a:"start"})+QA3_T(520,240,"polymerase",{s:15,a:"start"})+QA3_L(560,250,553,288,1.1);
 return QA3_FG("0 0 640 365",s,"Fig. 4.1","Diagram of a replication fork on human chromosome 11. On the left the two parent strands are still paired: 5' AACA over 3' TTGT. They separate into two arms. On the upper arm the parent strand 5' GGCAGATTGCCTGCTGAGG 3' is being copied by DNA polymerase, with new bases AACGGACGACTCC added; an arrow points back towards the fork. On the lower arm the parent strand CCGTCTAAACGGACGACTCC 5' is copied by a second DNA polymerase, with new bases GATTTGCCTGCTGA added; an arrow points away from the fork.",640,450);
};
/* Fig. 4.2 chromosome at metaphase */
const QA3_F42=()=>{
 let s="";
 const arm=(dx,sy)=>`M${130-3},115 C121,${115-35*sy} ${130+dx-8},${115-70*sy} ${130+dx-6},${115-97*sy} Q${130+dx},${115-108*sy} ${130+dx+6},${115-97*sy} C${130+dx+8},${115-70*sy} ${130+3},${115-35*sy} ${130+3},115 Z`;
 [[-16,1],[16,1],[-16,-1],[16,-1]].forEach(([dx,sy])=>{s+=QA3_PA(arm(dx,sy),1.4,"var(--surface,#fff)")});
 [[8,98],[8,106],[8,114]].forEach(([a,b])=>{s+=QA3_L(a,b,130,115,1.2)});
 [[252,92],[252,100],[252,108]].forEach(([a,b])=>{s+=QA3_L(a,b,130,115,1.2)});
 s+=QA3_CI(130,115,6,null,1.5);
 s+=QA3_L(196,52,134,111,1)+QA3_T(204,46,"A",{s:17,b:1});
 s+=QA3_L(34,156,64,110,1)+QA3_T(27,164,"B",{s:17,b:1});
 return QA3_FG("0 0 260 235",s,"Fig. 4.2","Diagram of chromosome 11 at metaphase: two sister chromatids joined at a small circular centromere, giving an X shape with two arms pointing up and two pointing down. Thin lines run from the left and from the right into the centromere. A points to the centromere and B points to one of the thin lines on the left.",260);
};
/* Fig. 4.3 cell to complete */
const QA3_F43=()=>{
 let s=QA3_PA("M240,22 C360,22 458,64 458,128 C458,192 360,236 240,236 C120,236 22,192 22,128 C22,64 120,22 240,22Z",1.8);
 const cyl=(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-4" y="-8" width="8" height="16" rx="3" style="fill:var(--surface,#fff)" stroke="currentColor" stroke-width="1.3"/></g>`;
 s+=cyl(44,138,-5)+cyl(60,150,85)+cyl(410,128,-40)+cyl(424,144,50);
 s+=QA3_L(108,42,152,31,1)+QA3_T(60,12,"cell surface",{s:15,a:"start"})+QA3_T(60,29,"membrane",{s:15,a:"start"});
 return QA3_FG("0 0 480 250",s,"Fig. 4.3","An empty oval cell with its cell surface membrane labelled. Two small cylindrical centrioles lie near the left end of the cell and two near the right end. The student completes the figure by drawing chromosome 11 in anaphase.","480");
};

/* Fig. 5.2 events in a capillary */
const QA3_F52=()=>{
 let s=`<g transform="scale(.86) translate(-76 -148)">`;
 const F=18;
 const T=(x,y,t,o)=>QA3_T(x,y,t,Object.assign({s:F},o||{}));
 const CO2=(x,y,o)=>`<text x="${x}" y="${y}" font-size="${F}" text-anchor="${(o&&o.a)||"middle"}" dominant-baseline="central" fill="currentColor">CO<tspan dy="4" font-size="13">2</tspan></text>`;
 const O2=(x,y)=>`<text x="${x}" y="${y}" font-size="${F}" text-anchor="middle" dominant-baseline="central" fill="currentColor">O<tspan dy="4" font-size="13">2</tspan></text>`;
 const HCO3=(x,y,a)=>`<text x="${x}" y="${y}" font-size="${F}" text-anchor="${a||"middle"}" dominant-baseline="central" fill="currentColor">HCO<tspan dy="4" font-size="14">3</tspan><tspan dy="-12" font-size="14">−</tspan></text>`;
 /* tissue cells and capillary wall */
 s+=QA3_PA("M170,175 H253 V322 Q258,336 247,345 Q258,356 253,368 V480 H170",1.6)+QA3_PA("M796,175 H712 V322 Q707,336 718,345 Q707,356 712,368 V480 H796",1.6);
 [[303,320],[645,662]].forEach(([a,b])=>{[[175,286],[312,414],[430,480]].forEach(([y1,y2])=>{s+=QA3_L(a,y1,a,y2,1.6)+QA3_L(b,y1,b,y2,1.6)})});
 /* red blood cell */
 s+=QA3_PA("M388,252 C388,206 420,186 458,186 H505 C546,186 552,214 548,236 C544,262 530,282 548,322 C562,362 548,412 500,436 C470,446 420,442 395,420 C374,400 378,360 395,335 C412,308 388,288 388,252Z",1.8,"var(--surface,#fff)");
 s+=QA3_L(485,183,512,168,1.1)+T(512,162,"red blood cell",{a:"start"});
 s+=T(560,194,"H<tspan dy='4' font-size='14'>2</tspan><tspan dy='-4'>O</tspan>").replace("<text","<text");
 s+=QA3_AR(578,201,512,211,1.6,11);
 s+=`<text x="412" y="216" font-size="${F}" dominant-baseline="central" fill="currentColor">CO<tspan dy="4" font-size="13">2</tspan><tspan dy="-4"> + H</tspan><tspan dy="4" font-size="13">2</tspan><tspan dy="-4">O</tspan></text>`;
 s+=QA3_AR(452,232,452,283,1.4,10)+T(460,242,"carbonic",{a:"start"})+T(460,262,"anhydrase",{a:"start"});
 s+=`<text x="427" y="298" font-size="${F}" dominant-baseline="central" fill="currentColor">H<tspan dy="4" font-size="13">2</tspan><tspan dy="-4">CO</tspan><tspan dy="4" font-size="14">3</tspan></text>`;
 s+=QA3_AR(446,312,432,358,1.4,10)+QA3_AR(458,312,488,350,1.4,10);
 s+=`<text x="427" y="372" font-size="${F}" dominant-baseline="central" fill="currentColor">H<tspan dy="-7" font-size="14">+</tspan></text>`+HCO3(482,364,"start").replace('x="482"','x="476"');
 s+=QA3_AR(540,366,582,388,1.4,10)+HCO3(582,398,"start").replace('x="582"','x="584"');
 s+=O2(450,402)+QA3_AR(466,408,553,432,1.5,11)+QA3_AR(437,410,380,426,1.5,11)+O2(366,432);
 s+=O2(572,442);
 /* left side */
 s+=CO2(186,232)+QA3_AR(214,238,340,303,1.5,11)+CO2(190,306)+QA3_AR(224,308,342,308,1.5,11)+CO2(366,306);
 s+=QA3_AR(382,296,420,226,1.5,11);
 s+=O2(203,358)+QA3_AR(348,422,226,365,1.5,11)+O2(213,430)+QA3_AR(350,430,236,430,1.5,11);
 s+=T(82,312,"cells of",{a:"start"})+T(82,332,"respiring",{a:"start"})+T(82,352,"tissue",{a:"start"})+QA3_L(139,308,190,278,1.1)+QA3_L(125,352,180,392,1.1);
 /* right side */
 s+=CO2(808,238)+QA3_AR(790,238,606,238,1.5,11)+CO2(808,310)+QA3_AR(790,310,606,310,1.5,11);
 s+=O2(808,430)+QA3_AR(606,430,786,430,1.5,11)+O2(808,470)+QA3_AR(592,444,786,466,1.5,11);
 s+=`</g>`;
 return QA3_FG("0 0 650 300",s,"Fig. 5.2","Diagram of a capillary in respiring tissue with a red blood cell in the lumen. Carbon dioxide diffuses from the respiring tissue cells into the capillary and into the red blood cell, where carbon dioxide and water, catalysed by carbonic anhydrase, form carbonic acid, which dissociates into hydrogen ions and hydrogencarbonate ions. Hydrogencarbonate ions leave the red blood cell. Oxygen leaves the red blood cell and diffuses to the tissue cells on the left, and also on to the right. More carbon dioxide arrives from tissue cells on the right.",650,440);
};

const QA3_TD="border:1px solid var(--line,#ccc);padding:6px 10px;text-align:left;vertical-align:top";
const QA3_TBL=(cap,head,rows)=>`<table style="border-collapse:collapse;margin:.6em 0;max-width:100%"><caption style="caption-side:top;text-align:center;font-weight:700;padding:4px 0">${cap}</caption><tr>${head.map(h=>`<th style="${QA3_TD};background:var(--surface2,#eee)">${h}</th>`).join("")}</tr>${rows.map(r=>`<tr>${r.map(c=>`<td style="${QA3_TD};height:34px;min-width:90px">${c}</td>`).join("")}</tr>`).join("")}</table>`;
const I=1.6,J=3.2;
/* Q1 */
add("T1",P("Plant stem cell micrograph, vacuoles and lysosomes",11,
 QA3_Q("1","Fig. 1.1 is a transmission electron micrograph of a cell from the stem of sago pondweed, <i>Stuckenia pectinata</i>.")
 +QA3_IMG("f11","Fig. 1.1","Transmission electron micrograph of a plant stem cell at magnification ×2500, with structures labelled A to G, the cell wall and an air space.",520)
 +QA3_P("(a)(i)","State the evidence from Fig. 1.1 that shows that the cell is from the stem of <i>S. pectinata</i> and not from the mesophyll of a leaf.",1,0)
 +QA3_P("(ii)","Complete each row in Table 1.1 to identify a cell structure shown in Fig. 1.1 that carries out the function listed.",4,I)
 +QA3_TBL("Table 1.1",["function","name of cell structure","letter on Fig. 1.1"],[["gas exchange","",""],["production of subunits of ribosomes","",""],["active transport of ions","",""],["aerobic respiration","",""]])
 +QA3_P("(b)","Plant vacuoles develop when vesicles fuse together. The vacuoles increase in size as more vesicles fuse.",0,0)
 +`<p style="margin:.5em 0 .5em 0">Fig. 1.2 shows the movement of vesicles within a plant cell during the development of a vacuole.</p>`
 +QA3_F12()
 +QA3_P("(i)","Name the process that is occurring at <b>X</b>.",1,I)
 +QA3_P("(ii)","Some of the vesicles formed by the Golgi body pass to the vacuole. These vesicles contain proteins that have been folded correctly and some that have <b>not</b> folded into their correct shapes. The proteins that have <b>not</b> folded correctly pass to the vacuole where they are broken down.<br>Explain how proteins that have <b>not</b> folded correctly are broken down in the vacuole.",3,I)
 +QA3_P("(c)","Small vacuoles in <i>S. pectinata</i> may have roles similar to lysosomes in animal cells.<br>Describe the role of lysosomes in animal cells in defence against pathogens.",2,0)
 +`<p style="text-align:right;font-weight:700">[Total: 11]</p>`,
 ["(a)(i) No chloroplasts (or very few) are visible (1); a mesophyll cell would contain many chloroplasts. The plastid D is a colourless amyloplast or leucoplast.",
  "(a)(ii) Gas exchange: cell surface membrane, A or G (1). Production of ribosome subunits: nucleolus, C (1). Active transport of ions: tonoplast, F (1); accept cell surface membrane, A or G. Aerobic respiration: mitochondrion, E (1).",
  "(b)(i) Endocytosis (1); accept pinocytosis or receptor-mediated endocytosis.",
  "(b)(ii) Vesicles from the Golgi body fuse with the vacuole membrane (1). The vacuole contains proteases or hydrolytic enzymes (1) that hydrolyse the peptide bonds in the proteins, forming amino acids (1).",
  "(c) Lysosomes fuse with the phagocytic vacuole containing the engulfed pathogen (1) and release hydrolytic enzymes, for example lysozyme or protease, that digest the pathogen (1)."],
 SRC(1)+" Check parts (a)(i) and (a)(ii) against the official mark scheme."));
/* Q2 */
add("T2",P("Glycogen and cellulose",9,
 QA3_Q("2","Glycogen and cellulose are polymers.")
 +`<p style="margin:.5em 0">Fig. 2.1 shows small, representative regions of a glycogen molecule and a cellulose molecule.</p>`
 +QA3_F21()
 +QA3_P("(a)","Describe <b>three</b> ways, <b>visible in Fig. 2.1</b>, in which the molecule of glycogen differs from the molecule of cellulose.<br>1 …<br>2 …<br>3 …",3,0)
 +QA3_P("(b)","Glycogen is found in the form of granules in mammalian liver and muscle cells. Fig. 2.2 is a diagram of part of a molecule of glycogen isolated from a glycogen granule.",0,0)
 +QA3_F22()
 +`<p style="margin:.5em 0;overflow:hidden"><span style="float:right;font-weight:700;margin-left:1em">[3]</span>Explain how the structure of glycogen is related to its function in cells.</p>`
 +QA3_P("(c)","Explain how the arrangement of cellulose molecules in plant cell walls is related to their function.",3,0)
 +`<p style="text-align:right;font-weight:700">[Total: 9]</p>`,
 ["(a) Any three from: glycogen is branched (it has a CH~2~ group linking a branch ring at carbon 6), cellulose is a straight, unbranched chain (1); glycogen has 1,6 glycosidic bonds as well as 1,4 bonds, cellulose has only 1,4 bonds (1); in glycogen all the glucose units are the same way up, in cellulose alternate glucose units are inverted (1); glycogen is made of α-glucose (OH on carbon 1 below the ring), cellulose of β-glucose (1).",
  "(b) Glycogen is branched, so there are many free ends (1) where enzymes can hydrolyse the glycosidic bonds quickly to release glucose for respiration (1). It is a large, compact molecule that is insoluble (1), so it can store a lot of glucose without affecting water potential or diffusing out of the cell.",
  "(c) Cellulose molecules are long, straight chains that are joined side by side by many hydrogen bonds, forming microfibrils (1). The microfibrils are arranged in layers at different angles, forming a mesh (1) with high tensile strength, which resists the pressure of water entering the cell so the cell does not burst (1)."],
 SRC(2)));
/* Q3 */
add("T4",P("Hexose transporters in grapevine fruits, and antigen presentation",10,
 QA3_Q("3","Fig. 3.1 shows some fruits (grapes) of the grapevine, <i>Vitis vinifera</i>.")
 +QA3_IMG("f31","Fig. 3.1","Photograph of a bunch of grapes on a grapevine.",230)
 +`<p style="margin:.5em 0">Sucrose is transported in the phloem of the grapevine to the fruits. In the fruits, sucrose is hydrolysed by the enzyme sucrase, which is found in cell walls. The glucose and fructose produced by the hydrolysis of sucrose pass through membrane proteins, known as hexose transporters, into the cytoplasm of the fruit cells.</p>`
 +QA3_P("(a)","State why membrane proteins are required for the movement of molecules, such as glucose, across cell surface membranes into cells.",1,0)
 +`<p style="margin:.5em 0">Researchers investigated one type of hexose transporter, known as VvHT1, which is found in the fruit cells of <i>V. vinifera</i>. They used a mutant strain of yeast that has very few hexose transporters in its cell surface membranes to investigate the properties of VvHT1. The researchers inserted molecules of VvHT1 into the cell surface membranes of the mutant strain of yeast.</p>`
 +`<ul style="margin:.4em 0"><li>Equal volumes of mutant yeast cells with VvHT1 were kept in eight different concentrations of glucose solution.</li><li>The rate of uptake of glucose by the yeast cells in each solution was determined.</li><li>All the solutions were kept at the same temperature and pH.</li></ul>`
 +`<p style="margin:.5em 0">The results are shown in Fig. 3.2.</p>`
 +QA3_F32()
 +QA3_P("(b)(i)","The researchers concluded that VvHT1 is responsible for the facilitated diffusion of glucose into the cells.<br>Explain how the results in Fig. 3.2 provide evidence to support this conclusion.",2,0)
 +QA3_P("(ii)","The researchers thought that grapevines could be modified to have more hexose transporters to increase the size and quality of grapes.<br>Explain why increasing the number of hexose transporters could be commercially important to growers of grapevines.",2,I)
 +QA3_P("(c)","Fig. 3.3 is a diagram of a protein in the cell surface membrane of a macrophage from a mouse.<br>Macrophages use these proteins in antigen presentation. Non-self antigens bind to the proteins and are involved in the activation of specific T-lymphocytes during the immune response.",0,0)
 +QA3_F33()
 +QA3_P("(i)","State what is meant by a non-self antigen.",1,I)
 +QA3_P("(ii)","Some pathogens enter human cells. Macrophages partially digest these pathogens and present antigens to T-lymphocytes during immune responses.<br>With reference to Fig. 3.3, explain how T-lymphocytes respond to infection by a specific type of pathogen.",4,I)
 +`<p style="text-align:right;font-weight:700">[Total: 10]</p>`,
 ["(a) Glucose is polar or hydrophilic and cannot pass through the hydrophobic centre of the phospholipid bilayer (1).",
  "(b)(i) The rate of uptake rises as the concentration of glucose increases, from 0 to about 5.6 μmol min^−1^ g^−1^ at 50 μmol dm^−3^, then levels off at about 9 μmol min^−1^ g^−1^ from 200 μmol dm^−3^ (1) because all the transporter proteins (VvHT1) are in use, so the rate is limited by the number of transporters (1). Simple diffusion would keep increasing in proportion to the concentration gradient.",
  "(b)(ii) More transporters allow faster uptake of glucose and fructose into the fruit cells (1), so the fruits become sweeter or larger and can be sold at a higher price (1).",
  "(c)(i) A molecule, usually a protein, that is not part of the organism's own cells and triggers an immune response (1).",
  "(c)(ii) Any four from: the macrophage presents the pathogen antigen in the antigen-binding region of its surface protein (1); a T-lymphocyte with a complementary receptor binds to the antigen (1); the T-lymphocyte is activated (1); it divides by mitosis to form a clone of cells (1); T-helper cells release cytokines that stimulate B-lymphocytes or cytotoxic T-cells (1); cytotoxic T-cells kill infected cells, and memory cells are formed (1)."],
 SRC(3)));
/* Q4 */
add("T5",P("Gene, DNA replication and chromosome 11 in mitosis",13,
 QA3_Q("4","The gene for the enzyme catalase is on chromosome 11 in humans.")
 +QA3_P("(a)","Explain the meaning of the term <i>gene</i>.",2,0)
 +QA3_P("(b)","Two enzymes, DNA polymerase and DNA ligase, are involved in the replication of DNA.<br>Fig. 4.1 shows the replication of part of human chromosome 11 by DNA polymerase. The arrows show the direction of synthesis of the new polynucleotides by DNA polymerase.",0,0)
 +QA3_F41()
 +QA3_P("(i)","Describe the roles of DNA polymerase and DNA ligase in the replication of DNA.",5,I)
 +QA3_P("(ii)","State the name of the stage of interphase in the cell cycle when DNA replication occurs.",1,I)
 +QA3_P("(c)","Fig. 4.2 is a diagram of chromosome 11 at metaphase of mitosis.",0,0)
 +QA3_F42()
 +QA3_P("(i)","State the names <b>and</b> functions of structures <b>A</b> and <b>B</b>.<br>structure <b>A</b> …<br>function …<br>structure <b>B</b> …<br>function …",2,I)
 +QA3_P("(ii)","Complete Fig. 4.3 to show what happens to chromosome 11 in anaphase, so that the daughter nuclei are genetically identical.",3,I)
 +QA3_F43()
 +`<p style="text-align:right;font-weight:700">[Total: 13]</p>`,
 ["(a) A length of DNA (1) that codes for a polypeptide or a functional RNA, as a sequence of bases (1).",
  "(b)(i) Any five from: DNA polymerase adds nucleotides to the 3' end of the growing strand (1); it works only in the 5' to 3' direction (1); it uses the exposed template strand and complementary base pairing (1); it forms phosphodiester bonds between nucleotides (1); in Fig. 4.1 the lower arrow points away from the fork (leading strand, made continuously), whereas the upper arrow points towards the fork, so that strand is made in short fragments (lagging strand) (1); DNA ligase joins the fragments together (1) by forming phosphodiester bonds in the sugar-phosphate backbone (1).",
  "(b)(ii) S phase, or synthesis phase (1).",
  "(c)(i) A is the centromere, which holds the two sister chromatids together and is where spindle microtubules attach (1). B is a spindle microtubule, which pulls the chromatids to opposite poles (1).",
  "(c)(ii) The two sister chromatids have separated, so one chromatid (now a chromosome) is drawn at each pole (1); each is the same size and shape as the other, so the daughter nuclei are genetically identical (1); each is drawn with its centromere towards the pole and its arms trailing behind (V or J shape), with spindle microtubules attached to the centromere (1)."],
 SRC(4)+" Part (c)(ii) is a drawing: mark it against the official scheme."));
/* Q5 and Q6 */
add("T6",P("Capillary structure, carbon dioxide transport and the chloride shift",11,
 QA3_Q("5","Fig. 5.1 is a longitudinal section of a capillary in muscle tissue as viewed with a transmission electron microscope.")
 +QA3_IMG("f51","Fig. 5.1","Transmission electron micrograph of a longitudinal section of a capillary in muscle tissue, magnification ×2000, with cells inside the capillary.",520)
 +QA3_P("(a)","State the evidence, visible in Fig. 5.1, that identifies the cells inside the capillary as red blood cells.",2,0)
 +QA3_P("(b)","Explain how the structure of the capillary wall is related to its functions.",3,0)
 +QA3_P("(c)","Fig. 5.2 is a diagram showing some of the events that occur as blood flows through a capillary in a respiring tissue.",0,0)
 +QA3_F52()
 +QA3_P("(i)","An increase in respiration results in an increase in the carbon dioxide concentration in the blood and the release of more oxygen from red blood cells to tissues.<br>Explain how an increase in carbon dioxide in the blood leads to the release of more oxygen from red blood cells.",4,I)
 +QA3_P("(ii)","Chloride ions are a constituent of blood plasma. The concentration of chloride ions in the plasma of deoxygenated blood is between 2–4 mmol dm<sup>–3</sup> lower than in the plasma of oxygenated blood.<br>Explain why the concentration of chloride ions in the blood plasma of deoxygenated blood is lower than in the plasma of oxygenated blood.",2,I)
 +`<p style="text-align:right;font-weight:700">[Total: 11]</p>`,
 ["(a) The cells have no nucleus (1) and are biconcave discs, with a pale centre when seen in section (1).",
  "(b) Any three from: the wall is one cell thick (1), giving a short diffusion distance (1); the cells are flattened or very thin (1); there are gaps or pores between the endothelial cells that let plasma and tissue fluid leave the blood (1); the lumen is very narrow, so red blood cells pass slowly, close to the wall (1).",
  "(c)(i) Any four from: carbon dioxide enters the red blood cell (1); carbonic anhydrase catalyses the formation of carbonic acid (1), which dissociates into H^+^ and HCO~3~^−^ (1); H^+^ ions bind to haemoglobin (1) and change its shape or reduce its affinity for oxygen (1); the oxyhaemoglobin dissociation curve shifts to the right, the Bohr effect (1), so more oxygen is released at the same partial pressure.",
  "(c)(ii) Hydrogencarbonate ions leave the red blood cell by facilitated diffusion (Fig. 5.2) (1), and chloride ions move into the red blood cell to balance the charge, the chloride shift (1), so there are fewer chloride ions in the plasma."],
 SRC(5)));
add("T6",P("Water movement from soil to atmosphere",6,
 QA3_Q("6","Fig. 6.1 is a diagram showing the passage of water through the tissues of a flowering plant from the soil to the atmosphere. The arrows show the direction of water movement.")
 +QA3_IMG("f61","Fig. 6.1","Diagram of water moving through a flowering plant from soil particles into a root, up the xylem in the stem to a leaf, with structures X and Y labelled.",540)
 +QA3_P("(a)","The structure labelled <b>X</b> is part of the symplast pathway. State the name of structure <b>X</b>.",1,0)
 +QA3_P("(b)","The structure labelled <b>Y</b> in the cell wall is a barrier to the apoplast pathway. State the name of structure <b>Y</b>.",1,0)
 +QA3_P("(c)","With reference to Fig. 6.1, complete the statements about the movement of water in the flowering plant.<br>Water moves from the soil solution to the cytoplasm of root hair cells by …<br>Water moves from the xylem in the root to the leaf by …<br>Water moves from mesophyll cell walls to intercellular air spaces by …<br>Water vapour moves from intercellular air spaces to the atmosphere outside the leaf by …",4,0)
 +`<p style="text-align:right;font-weight:700">[Total: 6]</p>`,
 ["(a) Plasmodesma, or plasmodesmata (1).",
  "(b) Casparian strip (1).",
  "(c) Osmosis (1); mass flow, by transpiration pull (1); evaporation (1); diffusion (1)."],
 SRC(6)));
})();
