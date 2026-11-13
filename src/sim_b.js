/* ===== Simulations B: Biology (0610 and shared with 9700) ===== */
SIM("osmosis","Osmosis in cells",{bio:["3.2"],alevel:["4.5","4.8"]},"Put a plant or animal cell in solutions of different concentration and see which way water moves.",S=>{
  const K=S.select("Cell",[["p","Plant cell (potato)"],["a","Animal cell (red blood cell)"]]),C=S.slider("Sucrose solution outside",0,1,0.3,0.05," mol/dm³");let r=1;const iso=.3,chg=c=>Math.max(-30,(iso-c)*55);
  S.loop((dt,t)=>{const d=iso-C.v,target=1+Math.max(-.32,Math.min(.3,d*.9));r+=(target-r)*dt*2;S.clear();S.rect(30,40,330,320,"#eaf4fb","#16252b",2);const cx=195,cy=200;
    for(let i=0;i<Math.round(C.v*40);i++)S.circ(45+((i*97)%300),55+((i*53)%290),3,"#d98a00");
    if(K.v==="p"){S.rect(cx-95,cy-80,190,160,"#dff0d0","#3d7a2a",6);const w=85*Math.min(1,r),h=70*Math.min(1,r);S.g.beginPath();S.g.ellipse(cx,cy,w,h,0,0,7);S.g.fillStyle="#bfe3f2";S.g.fill();S.g.strokeStyle="#16252b";S.g.lineWidth=2;S.g.stroke();S.txt("vacuole",cx,cy+4,12,null,"center")}
    else{const burst=C.v<.1;if(burst){for(let i=0;i<9;i++)S.circ(cx+Math.cos(i)*70,cy+Math.sin(i*2)*60,8,"#e58a8a")}else{S.g.beginPath();S.g.ellipse(cx,cy,80*r,(d<0?52:70)*r,0,0,7);S.g.fillStyle="#d9482b";S.g.fill();S.g.strokeStyle="#16252b";S.g.lineWidth=2;S.g.stroke()}}
    const n=Math.round(Math.abs(d)*10);for(let i=0;i<n;i++){const a=i/n*6.283+t*.3,r1=d>0?150:95,r2=d>0?105:140;S.arrow(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1*.85,cx+Math.cos(a)*r2,cy+Math.sin(a)*r2*.85,"#3b82c4",2)}
    S.plot({x:440,y:60,w:250,h:250},{xmin:0,xmax:1,ymin:-30,ymax:20,xl:"Sucrose concentration / mol/dm³",yl:"Change in mass / %"},[{f:chg},{f:()=>0,c:"#9bb",w:1,dash:[4,4]}],[{x:C.v,y:chg(C.v)}]);
    const st=Math.abs(d)<.03?"no net movement of water (same water potential inside and outside)":d>0?"water enters the cell by osmosis":"water leaves the cell by osmosis";
    S.out(`${st.charAt(0).toUpperCase()+st.slice(1)}. ${K.v==="p"?(d>.03?"The cell becomes <b>turgid</b>; the cell wall stops it bursting.":d<-.2?"The cell is <b>plasmolysed</b>: the membrane pulls away from the cell wall.":d<-.03?"The cell becomes <b>flaccid</b>.":""):(C.v<.1?"The animal cell <b>bursts</b> (lysis): it has no cell wall.":d<-.03?"The cell shrinks and becomes <b>crenated</b>.":"")}`)});
  S.note("Water moves from a region of higher water potential (dilute solution) to lower water potential through a partially permeable membrane. Where does the graph cross zero, and what does that tell us?")});

SIM("enzyme","Enzymes: temperature and pH",{bio:["5.1","5.2"],alevel:["3.1","3.2","3.3"]},"Change temperature and pH and watch the active site and the rate of reaction.",S=>{
  const E={amy:["Salivary amylase",37,7],pep:["Pepsin (stomach)",37,2],try:["Trypsin (small intestine)",37,8.5],thermo:["Enzyme from hot-spring bacteria",75,7]};
  const K=S.select("Enzyme",Object.keys(E).map(k=>[k,E[k][0]])),T=S.slider("Temperature",0,100,37,1," °C"),PH=S.slider("pH",1,12,7,0.5);
  const fT=(t,o)=>t<=o?Math.pow(2,(t-o)/10):Math.max(0,1-Math.pow((t-o)/14,2)),fP=(p,o)=>Math.exp(-Math.pow((p-o)/1.4,2));let ph=0;
  S.loop(dt=>{const e=E[K.v],rt=fT(T.v,e[1]),rp=fP(PH.v,e[2]),rate=rt*rp,den=T.v>e[1]+6||Math.abs(PH.v-e[2])>2.2;ph=(ph+dt*(.3+rate*1.5))%1;S.clear();
    const cx=170,cy=200,w=den?.45:1;S.g.beginPath();S.g.arc(cx,cy,85,.5,5.78);S.g.lineTo(cx+30,cy-22*w);S.g.lineTo(cx+30+(den?18:0),cy+22*w);S.g.closePath();S.g.fillStyle="#9fd4c8";S.g.fill();S.g.strokeStyle="#16252b";S.g.lineWidth=2;S.g.stroke();S.txt("enzyme",cx-30,cy+5,14,null,"center",1);S.txt("active site",cx+20,cy-95,11,"#3d5560");S.ln(cx+34,cy-90,cx+34,cy-26,"#9bb",1);
    const sx=den?330-((ph*60)%60):330-ph*245;if(!den||ph<.5){S.g.beginPath();S.g.moveTo(Math.max(sx,cx+32),cy-20);S.g.lineTo(Math.max(sx,cx+32)+44,cy-20);S.g.lineTo(Math.max(sx,cx+32)+44,cy+20);S.g.lineTo(Math.max(sx,cx+32),cy+20);S.g.closePath();S.g.fillStyle="#f3b35a";S.g.fill();S.g.stroke()}
    S.txt(den?"substrate no longer fits":"substrate",290,cy+44,11,"#3d5560","center");
    S.plot({x:400,y:30,w:290,h:140},{xmin:0,xmax:100,ymin:0,ymax:1,xl:"Temperature / °C",yl:"Rate"},[{f:t=>fT(t,e[1])*rp}],[{x:T.v,y:rate}]);
    S.plot({x:400,y:225,w:290,h:120},{xmin:1,xmax:12,ymin:0,ymax:1,xl:"pH",yl:"Rate"},[{f:p=>fP(p,e[2])*rt}],[{x:PH.v,y:rate}]);
    S.out(`Relative rate: <b>${(rate*100).toFixed(0)}%</b>. Optimum: ${e[1]} °C and pH ${e[2]}. ${den?"<b>Denatured</b>: the shape of the active site has changed, so the substrate no longer fits.":T.v<e[1]-10?"Low temperature: less kinetic energy, so fewer successful collisions. The enzyme is not denatured.":"Enzyme and substrate collide often and form enzyme-substrate complexes."}`)});
  S.note("Ask: why does the rate fall quickly above the optimum temperature but slowly below it? Use the words kinetic energy, collisions, active site and denatured.")});

SIM("photosynthesis","Limiting factors in photosynthesis",{bio:["6.2"],alevel:["13.2"]},"Change light, carbon dioxide and temperature for a piece of pondweed and count the oxygen bubbles.",S=>{
  const L=S.slider("Light intensity",0,100,40,1," %"),C=S.slider("Carbon dioxide",0,0.2,0.04,0.01," %"),T=S.slider("Temperature",5,50,25,1," °C");
  const fT=t=>t<=30?Math.pow(2,(t-30)/10):Math.max(0,1-Math.pow((t-30)/14,2)),rate=(l,c,t)=>Math.min(l/60,c/.1,1)*fT(t)*100;let B=[],acc=0;
  S.loop(dt=>{const r=rate(L.v,C.v,T.v);S.clear();S.rect(60,60,150,300,"#dff1f6","#16252b",3);S.g.strokeStyle="#2f7a3a";S.g.lineWidth=7;S.g.beginPath();S.g.moveTo(135,355);S.g.bezierCurveTo(110,280,160,220,135,150);S.g.stroke();for(let i=0;i<7;i++)S.g.fillRect(118+(i%2)*20,180+i*24,16,6);
    S.circ(300,90,26+L.v/8,`rgba(250,200,40,${.25+L.v/140})`);S.txt("lamp",300,95,12,null,"center");
    acc+=dt*r/40;while(acc>1){acc--;B.push({x:135+S.rnd(-8,8),y:150})}B.forEach(b=>b.y-=70*dt);B=B.filter(b=>b.y>64);B.forEach(b=>S.circ(b.x,b.y,4,"#fff","#3b82c4"));
    S.plot({x:400,y:50,w:290,h:260},{xmin:0,xmax:100,ymin:0,ymax:100,xl:"Light intensity / %",yl:"Rate of photosynthesis"},[{f:l=>rate(l,C.v,T.v)},{f:l=>rate(l,.2,30),c:"#9bb",dash:[5,5],w:1.5}],[{x:L.v,y:r}]);
    const lim=T.v>38?"temperature (enzymes are being denatured)":L.v/60<=Math.min(C.v/.1,1)&&L.v<60?"light intensity":C.v<.1?"carbon dioxide concentration":"temperature (or another factor such as chlorophyll)";
    S.out(`Rate: <b>${r.toFixed(0)}</b> (about ${Math.round(r/40*60)} bubbles per minute). Limiting factor now: <b>${lim}</b>.`)});
  S.note("The dashed line shows the best possible conditions. Raise the light until the curve levels off, then ask: what must be limiting now, and how could we test it?")});

SIM("potometer","Transpiration and the potometer",{bio:["8.2"],alevel:["7.2"]},"Change wind, light, humidity and temperature and measure how fast the bubble moves.",S=>{
  const W=S.slider("Wind speed",0,10,2,1," m/s"),L=S.slider("Light",0,100,60,5," %"),Hm=S.slider("Humidity",20,100,50,5," %"),T=S.slider("Temperature",10,40,25,1," °C");let x=640,t=0;S.button("Reset bubble",()=>{x=640;t=0});
  S.loop(dt=>{const r=(.4+L.v/100*1.2)*(1+W.v*.14)*(1.1-Hm.v/100)*(.5+T.v/40)*9;if(x>200){x-=r*dt;t+=dt}S.clear();
    S.rect(120,250,560,14,"#eaf4fb","#16252b",2);for(let i=0;i<=22;i++){S.ln(200+i*20,264,200+i*20,i%5?270:276);if(i%5===0)S.txt(String(i*5),200+i*20,290,10,null,"center")}S.txt("scale / mm",440,308,11,"#3d5560","center");
    S.rect(100,230,30,60,"#dff1f6","#16252b",2);S.ln(115,230,115,110,"#2f7a3a",6);[[-40,140],[38,125],[-36,180],[40,170],[0,90]].forEach(p=>{S.g.beginPath();S.g.ellipse(115+p[0],p[1],26,12,p[0]<0?.5:-.5,0,7);S.g.fillStyle="#4fa35a";S.g.fill()});
    S.rect(x,251,16,12,"#fff","#16252b",1);S.txt("air bubble",x+8,244,10,null,"center");
    for(let i=0;i<Math.round(r/3);i++)S.arrow(150+i*14,120-(Date.now()/40+i*17)%50,156+i*14,100-(Date.now()/40+i*17)%50,"#3b82c4",1.5);
    const moved=(640-x)/4;S.out(`Bubble moved <b>${moved.toFixed(0)} mm</b> in ${t.toFixed(0)} s. Rate of water uptake = <b>${t>1?(moved/t*60).toFixed(0):"…"} mm per minute</b>.`)});
  S.note("Change one factor at a time. Wind and low humidity keep a steep water vapour gradient; light opens the stomata; warmth gives water molecules more kinetic energy.")});

SIM("cardiac","The heart and the cardiac cycle",{bio:["9.1"],alevel:["8.3"]},"Follow the pressure in the left atrium, left ventricle and aorta through one heartbeat and see when the valves open and close.",S=>{
  const HR=S.slider("Heart rate",50,150,75,5," bpm"),run=S.check("Run",true);let u=0;
  const lv=x=>x<.1?2+x*30:x<.15?5+(x-.1)*1500:x<.32?80+40*Math.sin((x-.15)/.17*2.2):x<.4?112-(x-.32)*1362:x<.45?3:2+(x-.45)*3,la=x=>x<.1?4+Math.sin(x/.1*Math.PI)*4:x<.4?3+(x-.1)*20:x<.45?9-(x-.4)*100:3+(x-.45)*2;
  const aoF=x=>x>=.15&&x<.32?lv(x)-1:x<.15?87.6-x*50.8:112-(x-.32)*50.8;
  S.loop(dt=>{if(run.v)u=(u+dt*HR.v/60*.8)%.8;const x=u,av=la(x)>lv(x),sl=lv(x)>aoF(x),sys=x>=.1&&x<.4;S.clear();
    const P=S.plot({x:60,y:30,w:380,h:290},{xmin:0,xmax:.8,ymin:0,ymax:130,xl:"Time / s (one cycle at 75 bpm)",yl:"Pressure / mmHg"},[{f:lv,c:"#d9482b"},{f:aoF,c:"#3b82c4"},{f:la,c:"#2f9e63"}]);S.ln(P.X(x),30,P.X(x),320,"#16252b",1.5,[4,3]);
    S.txt("left ventricle",70,46,12,"#d9482b");S.txt("aorta",170,46,12,"#3b82c4");S.txt("left atrium",220,46,12,"#2f9e63");
    const cx=570,cy=170,k=sys?.82:1,ka=x<.1?.8:1;S.g.beginPath();S.g.ellipse(cx,cy-70,48*ka,34*ka,0,0,7);S.g.fillStyle="#f2b8b0";S.g.fill();S.g.strokeStyle="#16252b";S.g.lineWidth=2;S.g.stroke();S.txt("atrium",cx,cy-66,12,null,"center");
    S.g.beginPath();S.g.moveTo(cx-60*k,cy-25);S.g.lineTo(cx+60*k,cy-25);S.g.lineTo(cx,cy+105*k);S.g.closePath();S.g.fillStyle="#e2776b";S.g.fill();S.g.stroke();S.txt("ventricle",cx,cy+20,12,"#fff","center",1);
    S.rect(cx+40,cy-150,26,90,"#f2b8b0","#16252b");S.txt("aorta",cx+53,cy-158,11,null,"center");
    S.txt("Atrioventricular valve: "+(av?"OPEN":"closed"),cx,cy+135,13,av?"#2f9e63":"#3d5560","center",av);S.txt("Semilunar valve: "+(sl?"OPEN":"closed"),cx,cy+156,13,sl?"#2f9e63":"#3d5560","center",sl);
    S.out(`<b>${x<.1?"Atrial systole":x<.4?"Ventricular systole":"Diastole"}</b>: ${x<.1?"atria contract and push blood into the ventricles.":x<.15?"ventricles start to contract; the atrioventricular valve closes (first heart sound).":x<.32?"ventricle pressure is above aorta pressure, so the semilunar valve opens and blood leaves the heart.":x<.4?"ventricles relax; the semilunar valve closes (second heart sound).":"heart muscle relaxes and the chambers fill with blood from the veins."}`)});
  S.note("Untick Run to stop at any moment. Ask: what makes each valve open or close? (A difference in pressure on its two sides.)")});

SIM("glucose","Blood glucose control",{bio:["14.4"],alevel:["14.1"]},"Give the person a meal or exercise and watch insulin and glucagon return blood glucose to normal.",S=>{
  const dia=S.check("Type 1 diabetes (no insulin made)",false);let g=90,ins=10,glu=10,t=0,G=[],I=[],U=[];S.button("Eat a meal",()=>{g+=55});S.button("Exercise",()=>{g-=30});S.button("Inject insulin",()=>{ins+=45});
  S.loop(dt=>{const d=dt*6;t+=d;const it=dia.v?0:Math.max(0,(g-90)*1.4),gt=Math.max(0,(85-g)*1.6);ins+=(it+8*(!dia.v)-ins)*d*.25;if(dia.v)ins=Math.max(0,ins-d*1.5);glu+=(gt+8-glu)*d*.25;
    g+=(-(ins-8)*.045*(g/90)+(glu-8)*.05+(dia.v?.25:0)-(g>180?(g-180)*.01:0))*d;g=Math.max(35,Math.min(320,g));
    G.push([t,g]);I.push([t,ins]);U.push([t,glu]);if(G.length>700){G.shift();I.shift();U.shift()}const x0=G[0][0],x1=Math.max(x0+120,t);S.clear();
    S.plot({x:60,y:30,w:620,h:160},{xmin:x0,xmax:x1,ymin:40,ymax:260,xl:"",yl:"Glucose / mg per 100 cm³"},[{pts:G,c:"#d9482b"},{f:()=>90,c:"#9bb",dash:[5,5],w:1}]);
    S.plot({x:60,y:225,w:620,h:120},{xmin:x0,xmax:x1,ymin:0,ymax:90,xl:"Time",yl:"Hormone level"},[{pts:I,c:"#3b82c4"},{pts:U,c:"#2f9e63"}]);S.txt("insulin",70,240,12,"#3b82c4");S.txt("glucagon",130,240,12,"#2f9e63");
    S.out(`Blood glucose: <b>${g.toFixed(0)}</b> (set point about 90). ${g>110?(dia.v&&ins<12?"High, and no insulin is being made, so it stays high. Inject insulin.":"High: the pancreas secretes <b>insulin</b>; the liver and muscles take up glucose and store it as glycogen."):g<75?"Low: the pancreas secretes <b>glucagon</b>; the liver converts glycogen to glucose.":"Within the normal range."} This is negative feedback.`)});
  S.note("Ask learners to predict the graph before each button. With diabetes ticked, why does glucose stay high after a meal?")});

SIM("reflex","The reflex arc",{bio:["14.1"]},"Follow a nerve impulse from receptor to effector when a hand touches a hot object.",S=>{
  const N=[[90,300,"Receptor","in the skin detects heat"],[250,170,"Sensory neurone","carries the impulse to the spinal cord"],[400,110,"Relay neurone","in the spinal cord"],[550,170,"Motor neurone","carries the impulse to the effector"],[640,300,"Effector","muscle contracts and pulls the hand away"]];let p=-1;S.button("Touch the hot object",()=>{p=0});
  S.loop(dt=>{if(p>=0&&p<4)p=Math.min(4,p+dt*.9);S.clear();S.rect(330,60,140,110,"#f7e7c6","#16252b",2);S.txt("spinal cord",400,160,12,"#7a5a1c","center");
    for(let i=0;i<4;i++)S.ln(N[i][0],N[i][1],N[i+1][0],N[i+1][1],"#9bb",6);
    N.forEach((n,i)=>{const on=p>=i;S.circ(n[0],n[1],16,on?"#f3b35a":"#fff","#16252b",2);S.txt(n[2],n[0],n[1]+(i===2?-24:i===0?-26:36),13,on?"#0a6c74":"#16252b","center",on)});
    if(p>=0&&p<4){const i=Math.floor(p),f=p-i,a=N[i],b=N[Math.min(4,i+1)];S.circ(a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,8,"#d9482b","#fff",2)}
    S.txt("hot object",90,372,12,"#d9482b","center",1);S.circ(90,345,9,"#d9482b");S.txt(p>=4?"hand pulled away":"",640,350,13,"#0a6c74","center",1);S.txt("synapse",325,125,10,"#3d5560");S.txt("synapse",480,125,10,"#3d5560");
    const i=p<0?-1:Math.min(4,Math.floor(p+.05));S.out(i<0?"Stimulus → receptor → sensory neurone → relay neurone → motor neurone → effector → response.":`<b>${N[i][2]}</b>: ${N[i][3]}.${p>=4?" The response is fast and automatic because the brain is not needed to decide.":""}`)});
  S.note("Ask: why is a reflex faster than a voluntary action? Where are the synapses, and what crosses them?")});

SIM("genetics","Genetic crosses and Punnett squares",{bio:["17.3","17.4"],alevel:["16.2"]},"Choose a cross, read the Punnett square, then breed offspring and compare the numbers with the expected ratio.",S=>{
  const X={mono:{n:"Monohybrid: Tt × Tt (tall is dominant)",a:["T","t"],b:["T","t"],ph:g=>/T/.test(g)?"tall":"short"},test:{n:"Test cross: Tt × tt",a:["T","t"],b:["t","t"],ph:g=>/T/.test(g)?"tall":"short"},
    co:{n:"Codominance: blood groups Iᴬi × Iᴮi",a:["Iᴬ","i"],b:["Iᴮ","i"],ph:g=>/Iᴬ/.test(g)&&/Iᴮ/.test(g)?"group AB":/Iᴬ/.test(g)?"group A":/Iᴮ/.test(g)?"group B":"group O"},
    sex:{n:"Sex linkage: carrier mother XᴴXʰ × normal father XᴴY",a:["Xᴴ","Xʰ"],b:["Xᴴ","Y"],ph:g=>/Y/.test(g)?(/Xʰ/.test(g)?"haemophiliac male":"normal male"):(/Xʰ/.test(g)?"carrier female":"normal female")},
    di:{n:"Dihybrid: RrYy × RrYy (round, yellow dominant)",a:["RY","Ry","rY","ry"],b:["RY","Ry","rY","ry"],ph:g=>(/R/.test(g)?"round":"wrinkled")+" "+(/Y/.test(g)?"yellow":"green")}};
  const K=S.select("Cross",Object.keys(X).map(k=>[k,X[k].n])),N=S.select("Offspring to breed",["20","100","400","1600"],"100");let cnt=null;K.on=()=>{cnt=null;draw()};
  const pr=(x,y)=>(x===x.toLowerCase()&&y!==y.toLowerCase())||x==="i"?y+x:x+y,comb=(a,b)=>a.length>1&&/^[A-Za-z]{2}$/.test(a)?pr(a[0],b[0])+pr(a[1],b[1]):pr(a,b);
  S.button("Breed offspring",()=>{const x=X[K.v];cnt={};for(let i=0;i<+N.v;i++){const p=x.ph(comb(x.a[Math.floor(Math.random()*x.a.length)],x.b[Math.floor(Math.random()*x.b.length)]));cnt[p]=(cnt[p]||0)+1}draw()});
  function draw(){const x=X[K.v],n=x.a.length,cs=n>2?58:92,ox=70,oy=70;S.clear();const exp={};
    x.b.forEach((b,j)=>S.txt(b,ox+cs*(j+1)+cs/2,oy+cs/2+6,n>2?15:20,"#3b82c4","center",1));x.a.forEach((a,i)=>S.txt(a,ox+cs/2,oy+cs*(i+1)+cs/2+6,n>2?15:20,"#d9482b","center",1));
    x.a.forEach((a,i)=>x.b.forEach((b,j)=>{const g=comb(a,b),p=x.ph(g);exp[p]=(exp[p]||0)+1;S.rect(ox+cs*(j+1),oy+cs*(i+1),cs,cs,"#fff","#16252b");S.txt(g,ox+cs*(j+1)+cs/2,oy+cs*(i+1)+cs/2-2,n>2?13:18,null,"center",1);S.txt(p,ox+cs*(j+1)+cs/2,oy+cs*(i+1)+cs/2+16,n>2?8:11,"#3d5560","center")}));
    S.txt("gametes of parent 2 →",ox+cs,oy+18,12,"#3b82c4");S.txt("parent 1 ↓",ox-8,oy+cs-6,12,"#d9482b");S.txt("Expected",470,60,16,"#0a6c74","left",1);const tot=n*x.b.length,ks=Object.keys(exp);let chi=0;
    ks.forEach((k,i)=>{S.txt(`${k}: ${exp[k]} in ${tot}`,470,86+i*22,13);if(cnt){const E=exp[k]/tot*+N.v,O=cnt[k]||0;chi+=(O-E)*(O-E)/E}});
    if(cnt){S.txt("Observed ("+N.v+" offspring)",470,200,16,"#0a6c74","left",1);ks.forEach((k,i)=>S.txt(`${k}: ${cnt[k]||0}  (expected ${(exp[k]/tot*+N.v).toFixed(1)})`,470,226+i*22,13));
      const crit=[0,3.84,5.99,7.82][ks.length-1];S.txt(`χ² = ${chi.toFixed(2)}, ${ks.length-1} degree${ks.length>2?"s":""} of freedom`,470,236+ks.length*22,13,null,"left",1);S.txt(`critical value (p = 0.05) = ${crit}`,470,256+ks.length*22,13);
      S.out(chi<crit?"χ² is below the critical value: the difference from the expected ratio is due to chance.":"χ² is above the critical value: the difference is significant (this happens by chance about 1 time in 20). Breed again.")}
    else S.out("Ratio of phenotypes expected: "+ks.map(k=>exp[k]).join(" : ")+" ("+ks.join(" : ")+"). Press Breed offspring to compare real numbers with this ratio.")}
  draw();S.note("Breed 20 and then 1600 offspring. Ask: why are small samples further from the expected ratio? A Level: use the chi-squared value to decide.")});

SIM("selection","Natural selection: peppered moths",{bio:["18.3"],alevel:["17.2"]},"Change the colour of the tree bark and watch predators change the moth population over generations.",S=>{
  const B=S.slider("Bark darkness",0,100,20,5," %"),auto=S.check("Run generations",false);let dark=.2,gen=0,pts=[[0,20]],M=[],acc=0;
  const mk=()=>{M=Array.from({length:40},(_,i)=>({x:S.rnd(40,330),y:S.rnd(50,340),d:i<Math.round(dark*40)}))};mk();
  const next=()=>{const b=B.v/100,sD=.35+.6*b,sL=.35+.6*(1-b),w=dark*sD+(1-dark)*sL;dark=dark*sD/w;dark=Math.max(.02,Math.min(.98,dark+S.rnd(-.02,.02)));gen++;pts.push([gen,dark*100]);mk()};
  S.button("Next generation",next);S.button("Reset",()=>{dark=.2;gen=0;pts=[[0,20]];mk()});
  S.loop(dt=>{if(auto.v){acc+=dt;if(acc>.7&&gen<60){acc=0;next()}}S.clear();const sh=Math.round(225-B.v*1.7);S.rect(30,40,320,320,`rgb(${sh},${sh-10},${sh-25})`,"#16252b",2);
    M.forEach(m=>{const c=m.d?"#3a342e":"#e9e2d3";S.g.beginPath();S.g.moveTo(m.x,m.y);S.g.lineTo(m.x-11,m.y-8);S.g.lineTo(m.x-9,m.y+7);S.g.closePath();S.g.moveTo(m.x,m.y);S.g.lineTo(m.x+11,m.y-8);S.g.lineTo(m.x+9,m.y+7);S.g.closePath();S.g.fillStyle=c;S.g.fill();S.g.strokeStyle="#55504a";S.g.lineWidth=.6;S.g.stroke()});
    S.plot({x:430,y:50,w:260,h:260},{xmin:0,xmax:Math.max(20,gen),ymin:0,ymax:100,xl:"Generation",yl:"Dark moths / %"},[{pts}]);
    S.out(`Generation ${gen}: <b>${(dark*100).toFixed(0)}% dark</b>, ${(100-dark*100).toFixed(0)}% pale. ${B.v>55?"On dark bark the pale moths are easier for birds to see, so more dark moths survive and pass on their alleles.":B.v<45?"On pale bark the dark moths are easier to see, so more pale moths survive and reproduce.":"Neither colour has a clear advantage."}`)});
  S.note("Start with pale bark, then darken it (pollution) and run 20 generations. Ask learners to explain the change using variation, survival, reproduction and alleles.")});

SIM("foodweb","Food web: remove an organism",{bio:["19.1"]},"Click an organism to remove it and watch the populations of the others change.",S=>{
  const N=[["Grass",360,340,[]],["Grasshopper",170,250,[0]],["Rabbit",360,250,[0]],["Mouse",550,250,[0]],["Lizard",120,150,[1]],["Snake",330,150,[1,3]],["Fox",520,150,[2,3]],["Hawk",330,50,[4,5,2]]];let pop=N.map(()=>1),gone=N.map(()=>false);S.button("Reset",()=>{pop=N.map(()=>1);gone=N.map(()=>false)});
  S.pointer((x,y,t)=>{if(t!=="pointerdown")return;N.forEach((n,i)=>{if(Math.hypot(x-n[1],y-n[2])<36)gone[i]=!gone[i]})});
  S.loop(dt=>{N.forEach((n,i)=>{let tg;if(gone[i])tg=0;else{const food=n[3].length?n[3].reduce((a,j)=>a+pop[j],0)/n[3].length:1,preds=N.map((m,j)=>m[3].includes(i)?j:-1).filter(j=>j>=0),pp=preds.length?preds.reduce((a,j)=>a+pop[j],0)/preds.length:1;tg=Math.max(0,Math.min(2.2,food*(1.6-.6*pp)))}pop[i]+=(tg-pop[i])*dt*.5});
    S.clear();N.forEach((n,i)=>n[3].forEach(j=>{const dx=n[1]-N[j][1],dy=n[2]-N[j][2],L=Math.hypot(dx,dy);S.arrow(N[j][1]+dx/L*36,N[j][2]+dy/L*36,n[1]-dx/L*38,n[2]-dy/L*38,"#7d989c",2)}));
    N.forEach((n,i)=>{const r=10+Math.sqrt(Math.max(0,pop[i]))*22;S.circ(n[1],n[2],r,gone[i]?"#eee":pop[i]>1.15?"#bfe6c4":pop[i]<.85?"#f6c8be":"#fff","#16252b",2);S.txt(n[0],n[1],n[2]+4,12,gone[i]?"#999":"#16252b","center",1)});
    const up=N.filter((n,i)=>!gone[i]&&pop[i]>1.15).map(n=>n[0]),dn=N.filter((n,i)=>!gone[i]&&pop[i]<.85).map(n=>n[0]);
    S.out(gone.some(Boolean)?`Removed: ${N.filter((n,i)=>gone[i]).map(n=>n[0]).join(", ")}. Increasing: <b>${up.join(", ")||"none"}</b>. Decreasing: <b>${dn.join(", ")||"none"}</b>.`:"Arrows show the direction of energy transfer. Click any organism to remove it from the food web.")});
  S.note("Before removing an organism, ask learners to predict which populations rise and which fall, with a reason for each.")});
