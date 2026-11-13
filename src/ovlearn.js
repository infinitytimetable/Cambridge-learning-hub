/* ovlearn.js - learner's read-only Curriculum Overview: every syllabus objective by topic, a self-check tick for each, progress bars and links to the lesson that teaches it. */
function OVLEARN(app,env){
  const sk=env.subKey,SUB=env.SUB;
  const DATA=(typeof OBJ!=="undefined"&&OBJ[sk])||[];
  const KEY="hubovl.v1."+sk;
  const esc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  let st={done:{},ext:true,open:""};
  try{st=Object.assign(st,JSON.parse(localStorage.getItem(KEY)||"{}"))}catch(e){}
  const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}};
  const where={};
  const M=(typeof SYL!=="undefined"&&SYL[sk])||{};
  Object.keys(M).forEach(k=>M[k].forEach(o=>{(where[o[0]]=where[o[0]]||[]).push(k)}));
  const hasExt=DATA.some(t=>t.subs.some(s=>s.obj.some(o=>o[2])));
  const extName=sk==="alevel"?"A Level only":"Supplement";
  function view(o){return st.ext||!o[2]}
  function count(t){let n=0,d=0;t.subs.forEach(s=>s.obj.forEach(o=>{if(view(o)){n++;if(st.done[o[0]])d++}}));return[d,n]}
  function draw(){
    let D=0,N=0;DATA.forEach(t=>{const c=count(t);D+=c[0];N+=c[1]});
    app.innerHTML=`<h1 class="ltitle">Curriculum overview</h1><p class="lsum">Everything the ${esc(SUB.title)} syllabus asks you to know, topic by topic. Tick an objective when you can do it without help. Tap the lesson number to open the lesson that teaches it. Your ticks are saved on this device.</p>
<div class="ovl-top"><div class="ovl-bar" role="progressbar" aria-valuenow="${N?Math.round(100*D/N):0}" aria-valuemin="0" aria-valuemax="100"><i style="width:${N?100*D/N:0}%"></i></div><b>${D} of ${N} objectives ticked</b>${hasExt?`<label class="ovl-x"><input type="checkbox" id="ovl-ext"${st.ext?" checked":""}> Show ${esc(extName)} objectives</label>`:""}</div>
${DATA.map(t=>{const c=count(t);const op=st.open===t.t?" open":"";return `<details class="ovl-t" data-t="${esc(t.t)}"${op}><summary><span class="ovl-n">${esc(t.t)}</span><span class="ovl-nm">${esc(t.name)}</span><span class="ovl-p">${c[0]}/${c[1]}</span></summary>${t.subs.map(s=>{const os=s.obj.filter(view);if(!os.length)return"";return `<h3 class="ovl-s">${esc(s.n)} ${esc(s.name)}</h3><ul class="ovl-l">${os.map(o=>`<li><label><input type="checkbox" data-o="${esc(o[0])}"${st.done[o[0]]?" checked":""}><span><b>${esc(o[0])}</b> ${esc(o[1])}${o[2]?` <em class="sylx">${esc(extName)}</em>`:""}</span></label>${(where[o[0]]||[]).slice(0,3).map(k=>`<a class="ovl-ln" href="#l${k.replace(".","-")}">Lesson ${k}</a>`).join("")}</li>`).join("")}</ul>`}).join("")}</details>`}).join("")}`;
  }
  draw();
  app.addEventListener("change",function h(e){
    if(!app.querySelector(".ovl-top")){app.removeEventListener("change",h);return}
    const t=e.target;
    if(t.id==="ovl-ext"){st.ext=t.checked;save();draw();return}
    if(t.dataset&&t.dataset.o){if(t.checked)st.done[t.dataset.o]=1;else delete st.done[t.dataset.o];save();
      const det=t.closest("details"),all=[...det.querySelectorAll("input[data-o]")];det.querySelector(".ovl-p").textContent=all.filter(x=>x.checked).length+"/"+all.length;
      let D=0,N=0;DATA.forEach(tt=>{const c=count(tt);D+=c[0];N+=c[1]});app.querySelector(".ovl-top b").textContent=D+" of "+N+" objectives ticked";app.querySelector(".ovl-bar i").style.width=(N?100*D/N:0)+"%"}
  });
  app.addEventListener("toggle",e=>{const d=e.target;if(d.classList&&d.classList.contains("ovl-t")&&d.open)st.open=d.dataset.t},true);
}
