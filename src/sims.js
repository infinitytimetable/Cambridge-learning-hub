/* ===== Simulations (master hub): toolkit, registry and page. Each simulation is registered with SIM(id,title,lessons,description,run) ===== */
const SIMS={};
function SIM(id,t,forL,d,run){SIMS[id]={id,t,for:forL,d,run}}
function simsFor(sub,no){return Object.values(SIMS).filter(s=>(s.for[sub]||[]).includes(String(no)))}
function simMount(host,id){
  const def=SIMS[id];if(!def)return()=>{};
  const D=host.ownerDocument,Wn=D.defaultView||window;
  const el=(t,css,txt)=>{const e=D.createElement(t);if(css)e.style.cssText=css;if(txt!=null)e.textContent=txt;return e};
  host.innerHTML="";
  const BTN="font:inherit;font-weight:600;padding:8px 14px;border-radius:99px;border:2px solid #0a6c74;cursor:pointer;min-height:38px;";
  const wrap=el("div","background:#fff;color:#16252b;border:2px solid #0a6c74;border-radius:14px;padding:12px;max-width:1180px;margin:0 auto;font:15px/1.35 system-ui,Segoe UI,Arial,sans-serif;display:flex;flex-wrap:wrap;gap:14px;align-items:flex-start;box-sizing:border-box;overflow:auto");
  const left=el("div","flex:1 1 520px;min-width:0"),right=el("div","flex:1 1 250px;max-width:340px;min-width:230px;display:flex;flex-direction:column;gap:10px");
  const cv=el("canvas","width:100%;height:auto;display:block;border-radius:10px;background:#f6fafb;touch-action:none");cv.width=1440;cv.height=800;
  cv.setAttribute("role","img");cv.setAttribute("aria-label",def.t+" simulation");
  const out=el("div","margin-top:8px;font-weight:600;min-height:1.4em");out.setAttribute("aria-live","polite");
  const note=el("div","margin-top:6px;font-size:14px;color:#3d5560");
  const rec=el("div","margin-top:10px");
  const bar=el("div","display:flex;flex-wrap:wrap;gap:6px");
  const ctl=el("div","display:flex;flex-direction:column;gap:10px;background:#f1f7f8;border-radius:12px;padding:10px");
  const chal=el("div","");
  left.append(cv,out,note,rec);right.append(bar,ctl,chal);wrap.append(left,right);host.appendChild(wrap);
  const g=cv.getContext("2d");g.setTransform(2,0,0,2,0,0);
  let alive=true,raf=0,gen=0,speed=1,paused=false;
  const tb=(label,fn,pri)=>{const b=el("button",BTN+(pri?"background:#0a6c74;color:#fff":"background:#fff;color:#0a6c74"),label);b.type="button";b.onclick=fn;bar.appendChild(b);return b};
  const S={cv,g,W:720,H:400,D,
    group(label){const d=el("div","font-weight:700;font-size:13px;letter-spacing:.03em;text-transform:uppercase;color:#0a6c74;border-top:1px solid #cfe0e2;padding-top:8px;margin-top:2px",label);ctl.appendChild(d);return{show:v=>{d.style.display=v?"block":"none"}}},
    slider(label,min,max,val,step,unit){const o={v:val},l=el("label","display:block"),top=el("div","display:flex;justify-content:space-between;gap:8px"),s=el("input","width:100%;height:28px;margin:0;accent-color:#0a6c74"),r=el("b");
      s.type="range";s.min=min;s.max=max;s.step=step||1;s.value=val;const sh=()=>{r.textContent=(+s.value)+(unit||"")};
      s.oninput=()=>{o.v=+s.value;sh();if(o.on)o.on(o.v)};sh();const nm=el("span","",label);top.append(nm,r);l.append(top,s);ctl.appendChild(l);o.set=v=>{s.value=v;o.v=+v;sh()};o.label=t=>{nm.textContent=t};o.show=v=>{l.style.display=v?"block":"none"};o.range=(a,b)=>{s.min=a;s.max=b};return o},
    select(label,opts,val){const o={v:val==null?(Array.isArray(opts[0])?opts[0][0]:opts[0]):val},l=el("label","display:block"),s=el("select","font:inherit;padding:6px;width:100%;min-height:36px;border-radius:8px;border:1px solid #8aa");
      opts.forEach(x=>{const op=el("option");op.value=Array.isArray(x)?x[0]:x;op.textContent=Array.isArray(x)?x[1]:x;s.appendChild(op)});s.value=o.v;
      s.onchange=()=>{o.v=s.value;if(o.on)o.on(o.v)};const fill=list=>{s.innerHTML="";list.forEach(x=>{const op=el("option");op.value=Array.isArray(x)?x[0]:x;op.textContent=Array.isArray(x)?x[1]:x;s.appendChild(op)})};l.append(el("div","",label),s);ctl.appendChild(l);o.set=v=>{s.value=v;o.v=s.value};o.options=list=>{fill(list);o.v=s.value};o.show=v=>{l.style.display=v?"block":"none"};return o},
    check(label,val){const o={v:!!val},l=el("label","display:flex;align-items:center;gap:8px;min-height:30px"),c=el("input","width:20px;height:20px;accent-color:#0a6c74");c.type="checkbox";c.checked=!!val;c.onchange=()=>{o.v=c.checked;if(o.on)o.on(o.v)};l.append(c,el("span","",label));ctl.appendChild(l);o.set=v=>{c.checked=!!v;o.v=!!v};o.show=v=>{l.style.display=v?"flex":"none"};return o},
    button(label,fn){const b=el("button",BTN+"background:#0a6c74;color:#fff",label);b.type="button";b.onclick=fn;ctl.appendChild(b);return b},
    out(h){out.innerHTML=h},note(h){note.innerHTML=h},
    /* record(cols,fn): adds a results table. fn returns one row of values */
    record(cols,fn){rec.innerHTML="";const rows=[],box=el("div","overflow-x:auto"),tbl=el("table","border-collapse:collapse;font-size:13px;width:100%"),bb=el("div","display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px");
      const draw=()=>{tbl.innerHTML="<tr>"+cols.map(c=>`<th style="border:1px solid #9bb;padding:3px 6px;background:#e7f1f2;text-align:left">${c}</th>`).join("")+"</tr>"+rows.map(r=>"<tr>"+r.map(v=>`<td style="border:1px solid #9bb;padding:3px 6px">${v}</td>`).join("")+"</tr>").join("")};
      const mk=(t,f,p)=>{const b=el("button",BTN+"min-height:32px;padding:5px 12px;"+(p?"background:#0a6c74;color:#fff":"background:#fff;color:#0a6c74"),t);b.type="button";b.onclick=f;bb.appendChild(b)};
      mk("Record this reading",()=>{const r=fn();if(!r)return;rows.push(r.map(v=>typeof v==="number"?+v.toFixed(2):v));if(rows.length>40)rows.shift();draw()},1);mk("Clear table",()=>{rows.length=0;draw()});
      mk("Download CSV",()=>{const csv="﻿"+[cols].concat(rows).map(r=>r.map(v=>'"'+String(v).replace(/<[^>]+>/g,"").replace(/"/g,'""')+'"').join(",")).join("\r\n"),a=D.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download=id+"-results.csv";D.body.appendChild(a);a.click();a.remove()});
      box.appendChild(tbl);rec.append(el("div","font-weight:700;margin-bottom:4px","Results table"),bb,box);draw();S.rows=rows},
    /* challenge([[question,answer],...]) */
    challenge(list){chal.innerHTML="";let k=0;const box=el("div","background:#fff7e0;border:1px solid #e0c36a;border-radius:12px;padding:10px"),q=el("div","font-weight:600"),a=el("div","margin-top:6px;color:#0a5c2e;font-weight:600"),row=el("div","display:flex;gap:6px;margin-top:8px;flex-wrap:wrap");
      const show=()=>{q.textContent=`Challenge ${k+1} of ${list.length}: ${list[k][0]}`;a.textContent=""};
      const mk=(t,f)=>{const b=el("button",BTN+"min-height:32px;padding:5px 12px;background:#fff;color:#0a6c74",t);b.type="button";b.onclick=f;row.appendChild(b)};
      mk("Show answer",()=>{a.textContent=list[k][1]});mk("Next challenge",()=>{k=(k+1)%list.length;show()});box.append(q,a,row);chal.appendChild(box);show()},
    clear(c){g.fillStyle=c||"#f6fafb";g.fillRect(0,0,720,400)},
    circ(x,y,r,f,s,w){g.beginPath();g.arc(x,y,Math.max(0,r),0,7);if(f){g.fillStyle=f;g.fill()}if(s){g.strokeStyle=s;g.lineWidth=w||1.5;g.stroke()}},
    rect(x,y,w,h,f,s,lw){if(f){g.fillStyle=f;g.fillRect(x,y,w,h)}if(s){g.strokeStyle=s;g.lineWidth=lw||1.5;g.strokeRect(x,y,w,h)}},
    rrect(x,y,w,h,r,f,s,lw){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath();if(f){g.fillStyle=f;g.fill()}if(s){g.strokeStyle=s;g.lineWidth=lw||1.5;g.stroke()}},
    ell(x,y,rx,ry,f,s,lw,rot){g.beginPath();g.ellipse(x,y,Math.max(0,rx),Math.max(0,ry),rot||0,0,7);if(f){g.fillStyle=f;g.fill()}if(s){g.strokeStyle=s;g.lineWidth=lw||1.5;g.stroke()}},
    poly(pts,f,s,lw){g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();if(f){g.fillStyle=f;g.fill()}if(s){g.strokeStyle=s;g.lineWidth=lw||1.5;g.stroke()}},
    ln(x1,y1,x2,y2,c,w,dash){g.beginPath();g.setLineDash(dash||[]);g.moveTo(x1,y1);g.lineTo(x2,y2);g.strokeStyle=c||"#16252b";g.lineWidth=w||1.5;g.stroke();g.setLineDash([])},
    txt(s,x,y,size,c,al,b){g.font=(b?"700 ":"")+(size||14)+"px system-ui,Segoe UI,Arial";g.fillStyle=c||"#16252b";g.textAlign=al||"left";g.fillText(s,x,y)},
    arrow(x1,y1,x2,y2,c,w){S.ln(x1,y1,x2,y2,c,w||2);const a=Math.atan2(y2-y1,x2-x1);g.beginPath();g.moveTo(x2,y2);g.lineTo(x2-9*Math.cos(a-.4),y2-9*Math.sin(a-.4));g.lineTo(x2-9*Math.cos(a+.4),y2-9*Math.sin(a+.4));g.closePath();g.fillStyle=c||"#16252b";g.fill()},
    bar(x,y,w,h,frac,c,label){S.rect(x,y,w,h,"#fff","#16252b");S.rect(x,y+h*(1-Math.max(0,Math.min(1,frac))),w,h*Math.max(0,Math.min(1,frac)),c||"#2fa3a3");if(label)S.txt(label,x+w/2,y+h+15,11,"#3d5560","center")},
    legend(x,y,items){items.forEach((it,i)=>{S.rect(x,y+i*18-9,14,10,it[1]);S.txt(it[0],x+20,y+i*18,12)})},
    plot(b,o,series,marks){const X=v=>b.x+(v-o.xmin)/(o.xmax-o.xmin)*b.w,Y=v=>b.y+b.h-(v-o.ymin)/(o.ymax-o.ymin)*b.h;
      S.rect(b.x,b.y,b.w,b.h,"#fff","#9bb");S.txt(o.xl||"",b.x+b.w/2,b.y+b.h+30,13,"#3d5560","center");
      g.save();g.translate(b.x-34,b.y+b.h/2);g.rotate(-Math.PI/2);S.txt(o.yl||"",0,0,13,"#3d5560","center");g.restore();
      for(let i=0;i<=4;i++){const xv=o.xmin+(o.xmax-o.xmin)*i/4,yv=o.ymin+(o.ymax-o.ymin)*i/4,f=v=>Math.abs(v)>=100?Math.round(v):+v.toFixed(Math.abs(v)<1?2:1);
        S.txt(String(f(xv)),X(xv),b.y+b.h+14,11,"#3d5560","center");S.txt(String(f(yv)),b.x-5,Y(yv)+4,11,"#3d5560","right");S.ln(X(xv),b.y,X(xv),b.y+b.h,"#e3eced",1);S.ln(b.x,Y(yv),b.x+b.w,Y(yv),"#e3eced",1)}
      g.save();g.beginPath();g.rect(b.x,b.y,b.w,b.h);g.clip();
      (series||[]).forEach(s=>{g.beginPath();g.setLineDash(s.dash||[]);let first=true;const pts=s.pts||Array.from({length:121},(_,i)=>{const x=o.xmin+(o.xmax-o.xmin)*i/120;return[x,s.f(x)]});
        pts.forEach(p=>{if(p[1]==null||isNaN(p[1])){first=true;return}const px=X(p[0]),py=Y(p[1]);if(first){g.moveTo(px,py);first=false}else g.lineTo(px,py)});g.strokeStyle=s.c||"#0a6c74";g.lineWidth=s.w||2.5;g.stroke();g.setLineDash([])});
      (marks||[]).forEach(m=>S.circ(X(m.x),Y(m.y),m.r||6,m.c||"#d9482b","#fff",2));g.restore();return{X,Y}},
    loop(fn){const my=gen;let last=0;const step=t=>{if(!alive||my!==gen||!cv.isConnected)return;const dt=paused?0:Math.min(.05,last?(t-last)/1000:.016)*speed;last=t;try{fn(dt,t/1000)}catch(e){console.error(e);return}raf=Wn.requestAnimationFrame(step)};raf=Wn.requestAnimationFrame(step)},
    pointer(fn){S._ptr=fn},
    rnd:(a,b)=>a+Math.random()*(b-a)};
  const ph=e=>{if(!S._ptr)return;const r=cv.getBoundingClientRect();S._ptr((e.clientX-r.left)*720/r.width,(e.clientY-r.top)*400/r.height,e.type)};
  cv.addEventListener("pointerdown",ph);cv.addEventListener("pointermove",ph);cv.addEventListener("pointerup",ph);
  const start=()=>{gen++;ctl.innerHTML="";rec.innerHTML="";chal.innerHTML="";out.innerHTML="";note.innerHTML="";S._ptr=null;paused=false;pb.textContent="Pause";g.setTransform(2,0,0,2,0,0);
    try{def.run(S)}catch(e){console.error(e);out.textContent="This simulation could not start."}};
  const pb=tb("Pause",()=>{paused=!paused;pb.textContent=paused?"Play":"Pause"},1);
  tb("Reset",start);
  const sp=el("select",BTN+"background:#fff;color:#0a6c74;padding:6px 8px");[["0.25","¼ speed"],["0.5","½ speed"],["1","Normal speed"],["2","2× speed"],["4","4× speed"]].forEach(x=>{const o=el("option","",x[1]);o.value=x[0];sp.appendChild(o)});sp.value="1";sp.onchange=()=>{speed=+sp.value};sp.setAttribute("aria-label","Speed");bar.appendChild(sp);
  tb("Full screen",()=>{try{if(D.fullscreenElement)D.exitFullscreen();else wrap.requestFullscreen()}catch(e){}});
  start();
  return()=>{alive=false;try{Wn.cancelAnimationFrame(raf)}catch(e){}};
}
/* page: list of simulations for the current subject */
function SIMUI(app,env,openId){
  const sub=env.subKey,list=Object.values(SIMS).filter(s=>s.for[sub]);
  const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");
  app.innerHTML=`<section class="hero"><div class="eyebrow">Teacher hub</div><h1>Simulations</h1><p>Interactive models for the ideas learners cannot see. Open one here or from the Explore and Explain stage of its lesson, then show it on the projector.</p></section>
<div id="simstage"></div><div class="grid" id="simgrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;margin-top:16px">${list.map(s=>`<article class="card" style="padding:14px"><h3 style="margin:0 0 6px">${esc(s.t)}</h3><p class="meta" style="margin:0 0 6px">Lesson ${s.for[sub].join(", ")}</p><p style="margin:0 0 10px">${esc(s.d)}</p><button class="btn pri sm" type="button" data-sim="${s.id}">Open</button> <button class="btn sm" type="button" data-simp="${s.id}">Project</button></article>`).join("")||"<p>No simulations for this subject yet.</p>"}</div>`;
  let stop=null;
  const open=id=>{if(stop)stop();const st=app.querySelector("#simstage");st.innerHTML=`<div class="row" style="justify-content:space-between;align-items:center;margin:14px 0 8px"><h2 style="margin:0">${esc(SIMS[id].t)}</h2><span><button class="btn sm" type="button" id="simpj">Project</button> <button class="btn sm" type="button" id="simx">Close</button></span></div><div id="simhost"></div>`;
    stop=simMount(st.querySelector("#simhost"),id);st.querySelector("#simx").onclick=()=>{if(stop)stop();st.innerHTML=""};st.querySelector("#simpj").onclick=()=>simProject(id);st.scrollIntoView({behavior:"smooth",block:"start"})};
  app.querySelectorAll("[data-sim]").forEach(b=>b.onclick=()=>open(b.dataset.sim));
  app.querySelectorAll("[data-simp]").forEach(b=>b.onclick=()=>simProject(b.dataset.simp));
  if(openId&&SIMS[openId])open(openId);
}
function simProject(id){if(typeof PROJ==="undefined"||!SIMS[id])return;PROJ.show("sim:"+id,el=>{el.innerHTML=`<h1 style="margin:0 0 10px">${SIMS[id].t}</h1><div></div>`;simMount(el.lastElementChild,id)})}
