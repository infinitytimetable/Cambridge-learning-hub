/* ===== Simulations A: Chemistry 0620 ===== */
SIM("particles","Particles: solid, liquid and gas",{chem:["1.1","1.2"]},"Heat or cool a substance and watch the particles change arrangement and movement.",S=>{
  const T=S.slider("Temperature",-40,160,20,1," °C"),sub=S.select("Substance",[["w","Water (melts 0, boils 100)"],["e","Ethanol (melts -114, boils 78)"],["x","Wax (melts 60, boils above 300)"]]);
  const N=64,P=Array.from({length:N},(_,i)=>({hx:230+(i%8)*32,hy:150+Math.floor(i/8)*29,x:230+(i%8)*32,y:150+Math.floor(i/8)*29,vx:S.rnd(-1,1),vy:S.rnd(-1,1)}));
  S.loop((dt,t)=>{const mp={w:0,e:-114,x:60}[sub.v],bp={w:100,e:78,x:320}[sub.v],st=T.v<mp?"solid":T.v<bp?"liquid":"gas",k=(T.v+60)/220;
    S.clear();S.rect(200,40,320,330,"#fff","#16252b",3);
    P.forEach(p=>{if(st==="solid"){p.x+=(p.hx-p.x)*.2+S.rnd(-1,1)*(1+k*3);p.y+=(p.hy-p.y)*.2+S.rnd(-1,1)*(1+k*3)}
      else if(st==="liquid"){p.x+=p.vx*(1+k*3)+S.rnd(-1,1);p.y+=p.vy*(1+k*2)+S.rnd(-1,1)+1.2;if(p.y<230){p.vy=Math.abs(p.vy)}if(Math.random()<.02){p.vx=S.rnd(-1,1);p.vy=S.rnd(-1,1)}}
      else{p.x+=p.vx*(5+k*8);p.y+=p.vy*(5+k*8)}
      if(p.x<214){p.x=214;p.vx=Math.abs(p.vx)}if(p.x>506){p.x=506;p.vx=-Math.abs(p.vx)}if(p.y<54){p.y=54;p.vy=Math.abs(p.vy)}if(p.y>356){p.y=356;p.vy=-Math.abs(p.vy)}
      S.circ(p.x,p.y,11,st==="solid"?"#5b8def":st==="liquid"?"#2fa3a3":"#e2854a","#16252b",1)});
    S.txt(st.toUpperCase(),100,80,22,"#0a6c74","center",1);S.txt({solid:"fixed positions",liquid:"close, random",gas:"far apart, fast"}[st],100,104,13,"#3d5560","center");
    S.txt("Melting point "+mp+" °C",610,80,13,"#3d5560","center");S.txt("Boiling point "+bp+" °C",610,100,13,"#3d5560","center");
    S.out(`State: <b>${st}</b>. ${st==="solid"?"Particles vibrate about fixed positions in a regular arrangement.":st==="liquid"?"Particles touch but move past each other, so a liquid flows and takes the shape of its container.":"Particles are far apart and move quickly and randomly in all directions."}`)});
  S.note("Ask: what happens to the movement of the particles as the temperature rises? Why does a gas fill the whole container?")});

SIM("gaslaw","Gas pressure, volume and temperature",{chem:["1.3"]},"Change the volume and temperature of a trapped gas and see the pressure change.",S=>{
  const V=S.slider("Volume",20,100,60,1," %"),T=S.slider("Temperature",100,600,300,10," K"),P=Array.from({length:50},()=>({x:S.rnd(70,300),y:S.rnd(70,330),a:S.rnd(0,7)}));let hits=0,shown=0,tt=0;
  S.loop(dt=>{const R=60+V.v*4.6,sp=Math.sqrt(T.v)*14;S.clear();S.rect(60,60,R-60,280,"#fff","#16252b",3);S.rect(R,50,18,300,"#8aa","#16252b");S.rect(R+18,190,620-R,20,"#bcc","#16252b");
    P.forEach(p=>{p.x+=Math.cos(p.a)*sp*dt;p.y+=Math.sin(p.a)*sp*dt;if(p.x<70){p.x=70;p.a=Math.PI-p.a;hits++}if(p.x>R-10){p.x=R-10;p.a=Math.PI-p.a;hits++}if(p.y<70){p.y=70;p.a=-p.a;hits++}if(p.y>330){p.y=330;p.a=-p.a;hits++}S.circ(p.x,p.y,7,"#e2854a","#16252b",1)});
    tt+=dt;if(tt>1){shown=hits;hits=0;tt=0}
    const pr=(T.v/300)*(60/V.v)*100;S.txt("Pressure",640,90,14,"#3d5560","center");S.txt(pr.toFixed(0)+" kPa",640,120,24,"#0a6c74","center",1);S.txt("Wall hits per second: "+shown,640,150,12,"#3d5560","center");
    S.out(`Pressure = <b>${pr.toFixed(0)} kPa</b>. ${V.v<60?"Smaller volume: particles hit the walls more often, so pressure is higher.":V.v>60?"Larger volume: fewer collisions with the walls each second, so pressure is lower.":""} ${T.v>300?"Higher temperature: particles move faster and hit the walls harder and more often.":T.v<300?"Lower temperature: particles move more slowly.":""}`)});
  S.note("Keep temperature fixed and halve the volume. What happens to the pressure?")});

SIM("diffusion","Diffusion",{chem:["1.4"],bio:["3.1"],alevel:["4.4"]},"Remove the barrier and watch two sets of particles spread until they are evenly mixed.",S=>{
  const T=S.slider("Temperature",0,80,20,1," °C"),M=S.select("Red particles",[["1","same mass as blue"],["4","four times heavier"]]);let open=false,t0=0,P=[];
  const reset=()=>{open=false;t0=0;P=[];for(let i=0;i<45;i++){P.push({x:S.rnd(70,340),y:S.rnd(70,290),a:S.rnd(0,7),c:0});P.push({x:S.rnd(380,650),y:S.rnd(70,290),a:S.rnd(0,7),c:1})}};reset();
  S.button("Remove barrier",()=>{open=true});S.button("Reset",reset);
  S.loop(dt=>{S.clear();S.rect(60,60,600,240,"#fff","#16252b",3);if(!open)S.rect(356,60,8,240,"#16252b");else t0+=dt;
    let lb=0,lr=0;P.forEach(p=>{const sp=(60+T.v*2.2)/(p.c?Math.sqrt(+M.v):1);if(Math.random()<.05)p.a+=S.rnd(-1.5,1.5);p.x+=Math.cos(p.a)*sp*dt;p.y+=Math.sin(p.a)*sp*dt;
      const lo=!open&&p.c?380:70,hi=!open&&!p.c?340:650;if(p.x<lo){p.x=lo;p.a=Math.PI-p.a}if(p.x>hi){p.x=hi;p.a=Math.PI-p.a}if(p.y<70){p.y=70;p.a=-p.a}if(p.y>290){p.y=290;p.a=-p.a}
      if(p.x<360)p.c?lr++:lb++;S.circ(p.x,p.y,7,p.c?"#d9482b":"#3b82c4","#16252b",1)});
    S.txt(`Left side: ${lb} blue, ${lr} red`,60,335,14);S.txt(`Right side: ${45-lb} blue, ${45-lr} red`,660,335,14,null,"right");S.txt("Time: "+t0.toFixed(0)+" s",360,335,14,"#0a6c74","center",1);
    S.out(open?(Math.abs(lb-22)<5&&Math.abs(lr-22)<5?"The particles are now evenly spread. They keep moving, but there is no net movement.":"Net movement is from the region of higher concentration to the region of lower concentration."):"Each colour is concentrated on one side. Remove the barrier to start diffusion.")});
  S.note("Compare how long mixing takes at 0 °C and 80 °C, and with heavier red particles. Diffusion is faster at higher temperature and for lighter particles.")});

SIM("atom","Build an atom",{chem:["2.1"]},"Add protons, neutrons and electrons to build atoms, ions and isotopes of the first 20 elements.",S=>{
  const EL="H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca".split(" "),NM="Hydrogen Helium Lithium Beryllium Boron Carbon Nitrogen Oxygen Fluorine Neon Sodium Magnesium Aluminium Silicon Phosphorus Sulfur Chlorine Argon Potassium Calcium".split(" ");
  let p=6,n=6,e=6;const b=(l,f)=>S.button(l,()=>{f();p=Math.max(1,Math.min(20,p));n=Math.max(0,Math.min(24,n));e=Math.max(0,Math.min(20,e));draw()});
  b("+ proton",()=>p++);b("- proton",()=>p--);b("+ neutron",()=>n++);b("- neutron",()=>n--);b("+ electron",()=>e++);b("- electron",()=>e--);
  function draw(){S.clear();const cx=250,cy=200;[45,85,125,165].forEach(r=>S.circ(cx,cy,r,null,"#9bb",1.5));
    for(let i=0;i<p+n;i++){const a=i*2.4,r=Math.sqrt(i)*4.6;S.circ(cx+Math.cos(a)*r,cy+Math.sin(a)*r,6,i%2&&i<2*Math.min(p,n)||i>=2*Math.min(p,n)&&n>p?"#8a97a0":"#d9482b","#16252b",1)}
    let left=e;[2,8,8,2].forEach((cap,s)=>{const k=Math.min(cap,left);left-=k;for(let i=0;i<k;i++){const a=i/k*6.283-1.57;S.circ(cx+Math.cos(a)*(45+s*40),cy+Math.sin(a)*(45+s*40),6,"#3b82c4","#16252b",1)}});
    const q=p-e,cfg=[2,8,8,2].map((c,s)=>{const used=[2,8,8,2].slice(0,s).reduce((a,x)=>a+x,0);return Math.max(0,Math.min(c,e-used))}).filter(x=>x>0).join(",");
    S.txt(NM[p-1],560,90,26,"#0a6c74","center",1);S.txt(String(p+n),505,150,20,null,"right");S.txt(String(p),505,180,20,null,"right");S.txt(EL[p-1],510,178,56,null,"left",1);S.txt(q?((Math.abs(q)>1?Math.abs(q):"")+(q>0?"+":"−")):"",510+(EL[p-1].length*36),140,24);
    S.txt("Protons (red): "+p,470,240,15);S.txt("Neutrons (grey): "+n,470,262,15);S.txt("Electrons (blue): "+e,470,284,15);S.txt("Electron arrangement: "+(cfg||"none"),470,306,15);
    S.out(`${NM[p-1]}-${p+n}: proton number ${p}, nucleon number ${p+n}. ${q===0?"It is a neutral atom.":"It is an ion with a charge of "+(q>0?"+":"")+q+"."} Changing neutrons makes a different isotope of the same element.`)}
  draw();S.note("Build chlorine-35 and chlorine-37. What is the same and what is different? Then remove an electron from sodium to make Na⁺.")});

SIM("bonding","Bonding: ionic, covalent and metallic",{chem:["2.2","2.3","2.5"]},"Watch electrons transfer, share or move freely in three kinds of bonding.",S=>{
  const K=S.select("Example",[["nacl","Ionic: sodium + chlorine"],["mgo","Ionic: magnesium + oxygen"],["hcl","Covalent: hydrogen chloride"],["h2o","Covalent: water"],["met","Metallic: a metal lattice"]]);let ph=0,go=false;
  K.on=()=>{ph=0;go=false};S.button("Bond / replay",()=>{ph=0;go=true});
  const sea=Array.from({length:26},()=>({x:S.rnd(180,540),y:S.rnd(90,310),a:S.rnd(0,7)}));
  const atom=(x,y,r,sym,ne,col,skip)=>{S.circ(x,y,r,"#fff","#16252b",2);S.txt(sym,x,y+7,20,col,"center",1);for(let i=0;i<ne;i++){if(skip&&i<skip)continue;const a=i/Math.max(ne,1)*6.283-1.57;S.circ(x+Math.cos(a)*r,y+Math.sin(a)*r,6,col,"#16252b",1)}};
  S.loop(dt=>{if(go)ph=Math.min(1,ph+dt*.5);S.clear();const k=K.v;
    if(k==="nacl"||k==="mgo"){const n=k==="nacl"?1:2,a=k==="nacl"?["Na","Cl",7]:["Mg","O",6];atom(230,200,60,a[0],n,"#d9482b",ph>0?n:0);atom(490,200,60,a[1],a[2],"#3b82c4");
      for(let i=0;i<n;i++){const x=230+60+ph*(490-60-290-14)+0,y=200-14+i*28-ph*0;if(ph>0)S.circ(290+ph*126,y,6,"#d9482b","#16252b",1)}
      if(ph>=1){S.txt(a[0]+(n>1?"²⁺":"⁺"),230,120,22,"#d9482b","center",1);S.txt(a[1]+(n>1?"²⁻":"⁻"),490,120,22,"#3b82c4","center",1);S.txt("strong electrostatic attraction",360,330,15,"#0a6c74","center",1)}
      S.out(ph>=1?`The metal atom has lost ${n} electron${n>1?"s":""} and the non-metal has gained ${n>1?"them":"it"}. Oppositely charged ions attract: this is an ionic bond.`:`The metal has ${n} outer electron${n>1?"s":""}. The non-metal needs ${n} more for a full outer shell. Press Bond.`)}
    else if(k==="hcl"||k==="h2o"){const d=130-ph*52;
      if(k==="hcl"){atom(360-d,200,40,"H",1,"#d9482b");atom(360+d-10,200,62,"Cl",7,"#3b82c4")}else{atom(360,200,62,"O",6,"#3b82c4");atom(360-d-20,240,40,"H",1,"#d9482b");atom(360+d+20,240,40,"H",1,"#d9482b")}
      if(ph>=1)S.txt("shared pair"+(k==="h2o"?"s":"")+" of electrons",360,340,15,"#0a6c74","center",1);
      S.out(ph>=1?"The shells overlap and each shared pair of electrons is one covalent bond. Each atom now has a full outer shell.":"Both atoms are non-metals and both need electrons, so they share. Press Bond.")}
    else{for(let i=0;i<5;i++)for(let j=0;j<3;j++){S.circ(210+i*75,120+j*80,26,"#f3c9a5","#16252b",2);S.txt("+",210+i*75,128+j*80,24,"#d9482b","center",1)}
      sea.forEach(e=>{if(Math.random()<.05)e.a+=S.rnd(-1,1);e.x+=Math.cos(e.a)*80*dt;e.y+=Math.sin(e.a)*80*dt;if(e.x<170||e.x>550)e.a=Math.PI-e.a;if(e.y<80||e.y>320)e.a=-e.a;e.x=Math.max(170,Math.min(550,e.x));e.y=Math.max(80,Math.min(320,e.y));S.circ(e.x,e.y,5,"#3b82c4","#16252b",1)});
      S.out("Positive metal ions in a giant lattice are held together by a sea of delocalised electrons. The moving electrons explain why metals conduct electricity.")}});
  S.note("Ask: which electrons are involved in bonding? Why do ionic compounds have high melting points?")});

SIM("titration","Virtual titration",{chem:["3.6","12.2"]},"Add sodium hydroxide from a burette to an acid of unknown concentration and find the end-point.",S=>{
  let ca=+(S.rnd(.06,.14)).toFixed(3),v=0,pts=[[0,0]],shown=false;const cb=.1,pH=v=>{const na=ca*25,nb=cb*v,tot=25+v;if(Math.abs(na-nb)<1e-9)return 7;return na>nb?-Math.log10((na-nb)/tot):14+Math.log10((nb-na)/tot)};
  const add=x=>{v=Math.min(50,+(v+x).toFixed(2));pts.push([v,pH(v)]);draw()};
  S.button("Add 1.0 cm³",()=>add(1));S.button("Add 0.1 cm³",()=>add(.1));S.button("Show the working",()=>{shown=true;draw()});S.button("New acid",()=>{ca=+(S.rnd(.06,.14)).toFixed(3);v=0;pts=[[0,pH(0)]];shown=false;draw()});
  function draw(){S.clear();const ph=pH(v),pink=ph>8.2;S.rect(95,30,30,220,"#fff","#16252b",2);S.rect(96,31+v/50*218,28,219-v/50*218,"#cfe3f5");for(let i=0;i<=10;i++){S.ln(125,31+i*21.8,133,31+i*21.8);S.txt(String(i*5),137,35+i*21.8,10)}
    S.ln(110,250,110,275,"#16252b",3);S.g.beginPath();S.g.moveTo(92,290);S.g.lineTo(128,290);S.g.lineTo(165,370);S.g.lineTo(55,370);S.g.closePath();S.g.fillStyle=pink?"#f4a8c8":"#f2f6f7";S.g.fill();S.g.strokeStyle="#16252b";S.g.lineWidth=2;S.g.stroke();
    S.txt("0.100 mol/dm³ NaOH",30,20,12);S.txt("25.0 cm³ HCl + phenolphthalein",20,392,12);
    S.plot({x:290,y:40,w:380,h:290},{xmin:0,xmax:50,ymin:0,ymax:14,xl:"Volume of NaOH added / cm³",yl:"pH"},[{pts}],[{x:v,y:ph}]);
    const eq=ca*25/cb;S.out(`Burette reading: <b>${v.toFixed(2)} cm³</b> · indicator: <b>${pink?"pink":"colourless"}</b>`+(shown?`<br>End-point = ${eq.toFixed(2)} cm³. Moles NaOH = 0.100 × ${eq.toFixed(2)}/1000 = ${(eq/1e4).toFixed(5)} mol = moles HCl (1:1). Concentration of HCl = ${(eq/1e4).toFixed(5)} ÷ 0.0250 = <b>${ca.toFixed(3)} mol/dm³</b>.`:""))}
  pts=[[0,pH(0)]];draw();S.note("Add 1.0 cm³ at a time until you are close to the colour change, then switch to 0.1 cm³ steps for an accurate end-point. Calculate the concentration before you show the working.")});

SIM("limiting","Limiting reactant",{chem:["3.5"]},"Mix different amounts of hydrogen and oxygen and see which reactant runs out first.",S=>{
  const H=S.slider("H₂ molecules",0,12,6,1),O=S.slider("O₂ molecules",0,8,2,1);const draw=()=>{S.clear();const w=Math.min(Math.floor(H.v/2),O.v),lh=H.v-2*w,lo=O.v-w;
    const mol=(x,y,t)=>{if(t==="h"){S.circ(x-6,y,7,"#fff","#16252b");S.circ(x+6,y,7,"#fff","#16252b")}else if(t==="o"){S.circ(x-8,y,10,"#d9482b","#16252b");S.circ(x+8,y,10,"#d9482b","#16252b")}else{S.circ(x,y,10,"#d9482b","#16252b");S.circ(x-11,y+8,7,"#fff","#16252b");S.circ(x+11,y+8,7,"#fff","#16252b")}};
    S.txt("Before",170,40,18,"#0a6c74","center",1);S.txt("After",540,40,18,"#0a6c74","center",1);S.arrow(320,200,400,200,"#16252b",3);S.txt("2H₂ + O₂ → 2H₂O",360,180,15,null,"center",1);
    for(let i=0;i<H.v;i++)mol(60+(i%6)*40,90+Math.floor(i/6)*40,"h");for(let i=0;i<O.v;i++)mol(60+(i%4)*56,220+Math.floor(i/4)*44,"o");
    for(let i=0;i<2*w;i++)mol(440+(i%6)*42,90+Math.floor(i/6)*44,"w");for(let i=0;i<lh;i++)mol(440+(i%6)*40,260+Math.floor(i/6)*36,"h");for(let i=0;i<lo;i++)mol(440+(i%4)*56,330,"o");
    S.out(`Water formed: <b>${2*w} molecules</b>. Left over: ${lh} H₂ and ${lo} O₂. ${H.v===0||O.v===0?"No reaction: one reactant is missing.":lh===0&&lo===0?"Exact amounts: neither reactant is in excess.":lh===0?"<b>Hydrogen is the limiting reactant</b>; oxygen is in excess.":"<b>Oxygen is the limiting reactant</b>; hydrogen is in excess."}`)};
  H.on=O.on=draw;draw();S.note("The reactant that is used up first limits how much product forms. Predict the result for 8 H₂ and 3 O₂ before you set the sliders.")});

SIM("electrolysis","Electrolysis",{chem:["4.1","4.2"]},"Choose an electrolyte and electrodes, then watch the ions move and see what forms at each electrode.",S=>{
  const E={pbbr:{n:"Molten lead(II) bromide",cat:["Pb²⁺"],an:["Br⁻"],c:"Lead (grey metal)",a:"Bromine (red-brown gas)",ce:"Pb²⁺ + 2e⁻ → Pb",ae:"2Br⁻ → Br₂ + 2e⁻"},
    nacl:{n:"Concentrated aqueous sodium chloride",cat:["Na⁺","H⁺"],an:["Cl⁻","OH⁻"],c:"Hydrogen gas",a:"Chlorine gas",ce:"2H⁺ + 2e⁻ → H₂",ae:"2Cl⁻ → Cl₂ + 2e⁻"},
    h2so4:{n:"Dilute sulfuric acid",cat:["H⁺"],an:["SO₄²⁻","OH⁻"],c:"Hydrogen gas",a:"Oxygen gas",ce:"2H⁺ + 2e⁻ → H₂",ae:"4OH⁻ → O₂ + 2H₂O + 4e⁻"},
    cuc:{n:"Aqueous copper(II) sulfate, carbon electrodes",cat:["Cu²⁺","H⁺"],an:["SO₄²⁻","OH⁻"],c:"Copper (pink-brown solid)",a:"Oxygen gas",ce:"Cu²⁺ + 2e⁻ → Cu",ae:"4OH⁻ → O₂ + 2H₂O + 4e⁻"},
    cucu:{n:"Aqueous copper(II) sulfate, copper electrodes",cat:["Cu²⁺","H⁺"],an:["SO₄²⁻","OH⁻"],c:"Copper is deposited (cathode gains mass)",a:"Copper anode dissolves (loses mass)",ce:"Cu²⁺ + 2e⁻ → Cu",ae:"Cu → Cu²⁺ + 2e⁻"}};
  const K=S.select("Electrolyte",Object.keys(E).map(k=>[k,E[k].n])),on=S.check("Switch on",false);let I=[];const mk=()=>{const e=E[K.v];I=[];for(let i=0;i<22;i++){const pos=i%2===0,l=pos?e.cat:e.an;I.push({x:S.rnd(240,480),y:S.rnd(190,330),pos,t:l[i%4<2?0:l.length-1]})}};K.on=mk;mk();
  S.loop(dt=>{const e=E[K.v];S.clear();S.rect(200,160,320,200,"#e4f1f8","#16252b",3);S.rect(245,90,22,230,"#555","#16252b");S.rect(453,90,22,230,"#555","#16252b");
    S.ln(256,90,256,50);S.ln(464,90,464,50);S.ln(256,50,330,50);S.ln(390,50,464,50);S.ln(330,35,330,65,"#16252b",2);S.ln(345,42,345,58,"#16252b",4);S.ln(375,35,375,65,"#16252b",2);S.ln(390,42,390,58,"#16252b",4);
    S.txt("cathode (−)",256,382,13,"#3b82c4","center",1);S.txt("anode (+)",464,382,13,"#d9482b","center",1);
    I.forEach(i=>{const tx=i.pos?270:450;if(on.v){i.x+=Math.sign(tx-i.x)*26*dt;if(Math.abs(i.x-tx)<3){i.x=S.rnd(300,420);i.y=S.rnd(190,330)}}i.x+=S.rnd(-.6,.6);i.y+=S.rnd(-.6,.6);i.y=Math.max(180,Math.min(340,i.y));
      S.circ(i.x,i.y,13,i.pos?"#fbd9c9":"#cfe0f7","#16252b",1);S.txt(i.t,i.x,i.y+4,10,null,"center")});
    if(on.v){for(let b=0;b<3;b++){S.circ(238,300-((Date.now()/14+b*70)%130),4,null,"#3b82c4");S.circ(482,300-((Date.now()/14+b*60)%130),4,null,"#d9482b")}}
    S.out(on.v?`<b>Cathode:</b> ${e.c}. ${e.ce}<br><b>Anode:</b> ${e.a}. ${e.ae}`:"Switch on the power supply. Positive ions (cations) move to the cathode; negative ions (anions) move to the anode.")});
  S.note("Ask: why does hydrogen form instead of sodium in the aqueous solution? Reduction happens at the cathode and oxidation at the anode.")});

SIM("energyprofile","Reaction pathway and activation energy",{chem:["5.2"]},"Change the activation energy and add a catalyst to an exothermic or endothermic reaction.",S=>{
  const K=S.select("Reaction",[["exo","Exothermic"],["endo","Endothermic"]]),Ea=S.slider("Activation energy",40,200,120,5," kJ/mol"),cat=S.check("Add a catalyst",false);
  const draw=()=>{S.clear();const r=K.v==="exo"?260:300,p=K.v==="exo"?320:230,X0=110,X1=610,peak=e=>r-e*1.05;
    const curve=(e,c,d)=>{S.g.beginPath();S.g.setLineDash(d||[]);for(let i=0;i<=100;i++){const u=i/100,x=X0+u*(X1-X0);let y;if(u<.25)y=r;else if(u>.75)y=p;else{const v=(u-.25)/.5,base=r+(p-r)*v,h=Math.sin(v*Math.PI);y=base-(base-peak(e))*h*(v<.5?1:(1)) }if(i)S.g.lineTo(x,y);else S.g.moveTo(x,y)}S.g.strokeStyle=c;S.g.lineWidth=3;S.g.stroke();S.g.setLineDash([])};
    S.ln(80,30,80,360,"#16252b",2);S.ln(80,360,660,360,"#16252b",2);S.txt("Energy",74,22,13,"#3d5560","center");S.txt("Progress of reaction",370,385,13,"#3d5560","center");
    curve(Ea.v,"#0a6c74");if(cat.v)curve(Ea.v*.55,"#d9482b",[7,5]);S.txt("reactants",120,r-8,13);S.txt("products",555,p-8,13);
    S.arrow(200,r,200,peak(Ea.v)+2,"#0a6c74");S.txt("Ea = "+Ea.v,206,(r+peak(Ea.v))/2,13,"#0a6c74");if(cat.v)S.txt("with catalyst: Ea = "+Math.round(Ea.v*.55),380,peak(Ea.v*.55)-10,13,"#d9482b","center");
    S.arrow(640,r,640,p,"#16252b");S.txt("ΔH",646,(r+p)/2,13);S.ln(110,r,640,r,"#9bb",1,[4,4]);
    S.out(`${K.v==="exo"?"Exothermic: products have less energy than reactants, so energy is given out (ΔH is negative).":"Endothermic: products have more energy than reactants, so energy is taken in (ΔH is positive)."} ${cat.v?"The catalyst gives a different pathway with a lower activation energy; ΔH does not change.":""}`)};
  K.on=Ea.on=cat.on=draw;draw();S.note("Activation energy is the minimum energy that colliding particles must have to react. Ask: does a catalyst change the energy of the reactants or products?")});

SIM("rate","Collision theory and rate of reaction",{chem:["6.2"]},"Change temperature and concentration and see how often particles collide with enough energy to react.",S=>{
  const T=S.slider("Temperature",10,90,30,1," °C"),C=S.slider("Concentration",10,50,25,1," particles"),cat=S.check("Catalyst",false);let P=[],pts=[[0,0]],t=0,made=0;
  const reset=()=>{P=[];for(let i=0;i<C.v*2;i++)P.push({x:S.rnd(40,340),y:S.rnd(40,340),a:S.rnd(0,7),k:i%2,e:Math.random()});pts=[[0,0]];t=0;made=0};reset();C.on=reset;S.button("Restart",reset);
  S.loop(dt=>{S.clear();S.rect(30,30,320,320,"#fff","#16252b",3);const sp=60+T.v*2.4,thr=(cat.v?.45:.8)-T.v/400;t+=dt;
    P.forEach(p=>{if(p.k===2)return;p.x+=Math.cos(p.a)*sp*dt;p.y+=Math.sin(p.a)*sp*dt;if(p.x<40||p.x>340){p.a=Math.PI-p.a;p.x=Math.max(40,Math.min(340,p.x))}if(p.y<40||p.y>340){p.a=-p.a;p.y=Math.max(40,Math.min(340,p.y))}});
    for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const a=P[i],b=P[j];if(a.k===2||b.k===2||a.k===b.k)continue;if(Math.abs(a.x-b.x)<13&&Math.abs(a.y-b.y)<13){if(Math.random()>thr){a.k=b.k=2;made++}else{a.a+=Math.PI;b.a+=Math.PI;a.x+=Math.cos(a.a)*8;b.x+=Math.cos(b.a)*8}}}
    P.forEach(p=>{if(p.k===2)return;S.circ(p.x,p.y,7,p.k?"#d9482b":"#3b82c4","#16252b",1)});
    if(t-pts[pts.length-1][0]>.25&&t<40)pts.push([t,made]);
    S.plot({x:420,y:40,w:270,h:270},{xmin:0,xmax:40,ymin:0,ymax:C.v,xl:"Time / s",yl:"Product formed"},[{pts}]);
    const half=pts.find(p=>p[1]>=C.v/2);S.out(`Product formed: <b>${made}</b> of ${C.v}. ${half?"Time to form half the product: <b>"+half[0].toFixed(1)+" s</b>.":""} Only collisions with enough energy (at least the activation energy) are successful.`)});
  S.note("Run it at 20 °C and 80 °C and compare the time for half the product. Then explain the result using the frequency and energy of collisions.")});

SIM("equilibrium","Equilibrium and Le Chatelier (Haber process)",{chem:["6.5","6.6"]},"Change the temperature and pressure for N₂ + 3H₂ ⇌ 2NH₃ and see the yield of ammonia move.",S=>{
  const T=S.slider("Temperature",200,600,450,10," °C"),P=S.slider("Pressure",25,400,200,5," atm"),y=(t,p)=>100/(1+Math.exp((t-(350+110*Math.log10(p/200)))/88));
  const draw=()=>{S.clear();const Y=y(T.v,P.v);S.txt("N₂(g) + 3H₂(g) ⇌ 2NH₃(g)     forward reaction is exothermic",360,34,16,null,"center",1);
    S.rect(80,70,90,260,"#fff","#16252b",2);S.rect(80,70+260*(1-Y/100),90,260*Y/100,"#2fa3a3");S.txt("Yield of ammonia",125,352,13,"#3d5560","center");S.txt(Y.toFixed(0)+" %",125,62,20,"#0a6c74","center",1);
    S.plot({x:290,y:80,w:380,h:240},{xmin:200,xmax:600,ymin:0,ymax:100,xl:"Temperature / °C",yl:"Yield / %"},[{f:t=>y(t,P.v)},{f:t=>y(t,100),c:"#9bb",dash:[5,5],w:1.5}],[{x:T.v,y:Y}]);
    S.txt("dashed line: 100 atm",560,100,11,"#3d5560");const rate=T.v<350?"slow":T.v<500?"moderate":"fast";
    S.out(`Yield <b>${Y.toFixed(0)}%</b>, rate of reaction: <b>${rate}</b>. Raising temperature favours the endothermic (reverse) direction, so yield falls. Raising pressure favours the side with fewer gas molecules (4 → 2), so yield rises.`)};
  T.on=P.on=draw;draw();S.note("Industry uses about 450 °C, 200 atm and an iron catalyst. Ask: why not use 200 °C if the yield is higher? (The rate would be too slow: it is a compromise.)")});

SIM("ph","pH scale, strong and weak acids",{chem:["7.2"]},"Move along the pH scale and compare how strong and weak acids ionise.",S=>{
  const pH=S.slider("pH",0,14,7,1),K=S.select("Acid particles view",[["s","Strong acid (hydrochloric)"],["w","Weak acid (ethanoic)"]]);
  const col=["#d7191c","#e2442a","#ec6c3a","#f59a4c","#fbc463","#fde68a","#e9ef8f","#9fd47a","#5ab873","#3a9d8c","#3c7fb5","#4563a8","#4e4c9a","#56408c","#5c357f"],ex=["battery acid","stomach acid","lemon juice","vinegar","tomato","black coffee","milk","pure water","sea water","baking soda","soap","ammonia solution","washing soda","oven cleaner","drain cleaner"];
  const draw=()=>{S.clear();for(let i=0;i<=14;i++){S.rect(40+i*43,40,43,56,col[i],i===pH.v?"#16252b":null,4);S.txt(String(i),61+i*43,76,16,i<4||i>9?"#fff":"#16252b","center",1)}
    S.txt("acidic",120,120,13,"#3d5560","center");S.txt("neutral",363,120,13,"#3d5560","center");S.txt("alkaline",600,120,13,"#3d5560","center");
    S.txt(`pH ${pH.v}: ${ex[pH.v]}`,40,160,18,"#0a6c74","left",1);S.txt(`[H⁺] = 1 × 10^-${pH.v} mol/dm³`,40,186,14);S.txt(pH.v<7?"More H⁺ than OH⁻":pH.v>7?"More OH⁻ than H⁺":"H⁺ and OH⁻ are equal",40,208,14);
    S.rect(330,150,350,220,"#fff","#16252b",2);const strong=K.v==="s";for(let i=0;i<20;i++){const x=360+(i%5)*66,y=185+Math.floor(i/5)*48,split=strong||i%10===3;
      if(split){S.circ(x-12,y,7,"#d9482b","#16252b",1);S.txt("H⁺",x-12,y-11,10,null,"center");S.circ(x+14,y,11,"#3b82c4","#16252b",1);S.txt(strong?"Cl⁻":"A⁻",x+14,y+4,9,"#fff","center")}else{S.circ(x-6,y,7,"#d9482b","#16252b",1);S.circ(x+8,y,11,"#3b82c4","#16252b",1);S.txt("HA",x+2,y-14,10,null,"center")}}
    S.out(strong?"A strong acid is completely ionised in water: every molecule releases an H⁺ ion.":"A weak acid is only partially ionised: most molecules stay whole, so there are fewer H⁺ ions and the pH is higher at the same concentration.")};
  pH.on=K.on=draw;draw();S.note("Each step down the pH scale means ten times more hydrogen ions. Ask: how many times more acidic is pH 2 than pH 4?")});

SIM("fractional","Fractional distillation of petroleum",{chem:["11.2"]},"Choose a hydrocarbon by chain length and watch where it condenses in the fractionating column.",S=>{
  const F=[["Refinery gas",1,4,"below 25 °C","bottled gas for heating and cooking",60],["Gasoline (petrol)",5,10,"40 to 100 °C","fuel for cars",110],["Naphtha",8,12,"80 to 180 °C","making chemicals",160],["Kerosene (paraffin)",11,15,"160 to 250 °C","jet fuel",210],["Diesel oil (gas oil)",15,19,"220 to 350 °C","fuel for diesel engines",260],["Fuel oil",20,30,"above 350 °C","fuel for ships and heating",310],["Bitumen",31,60,"above 400 °C","surfacing roads",350]];
  const C=S.slider("Carbon atoms in the chain",1,50,8,1);let y=360,tg=0;const pick=()=>F.find(f=>C.v>=f[1]&&C.v<=f[2])||F[6];C.on=()=>{y=360};
  S.loop(dt=>{const f=pick();tg=f[5];y+=(tg-y)*Math.min(1,dt*1.6);S.clear();S.rect(250,40,150,330,"#fff","#16252b",3);const grd=S.g.createLinearGradient(0,40,0,370);grd.addColorStop(0,"#cfe7f7");grd.addColorStop(1,"#f7c9a5");S.g.fillStyle=grd;S.g.fillRect(252,42,146,326);
    F.forEach(x=>{S.ln(400,x[5],470,x[5],"#16252b",3);S.txt(x[0],478,x[5]+4,13,x===f?"#0a6c74":"#16252b","left",x===f)});S.txt("cool (top)",245,56,12,"#3d5560","right");S.txt("hot (bottom)",245,364,12,"#3d5560","right");
    S.arrow(170,345,250,345,"#16252b",3);S.txt("heated crude oil",90,335,12);S.circ(325,y,12,"#d9482b","#16252b");S.txt("C"+C.v,325,y+4,10,"#fff","center",1);
    S.out(`C${C.v}H${2*C.v+2} is in <b>${f[0]}</b>: boiling range ${f[3]}, used as ${f[4]}. ${C.v<12?"Short chains: low boiling point, runny and easy to ignite.":"Long chains: high boiling point, viscous and harder to ignite."}`)});
  S.note("Ask: why do the smaller molecules rise higher? Link boiling point to the strength of the forces between molecules.")});
