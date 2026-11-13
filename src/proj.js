/* ---------- projector: a second window (or full-screen overlay) that shows whatever "Project" is pressed on ---------- */
const PROJ=(function(){
  let win=null,cur=null,zoom=1.35,ov=null,timer=0,stepFn=null;
  const CSS=`html,body{margin:0;min-height:100%}body.pjbody{background:var(--bg,#fff);color:var(--ink,#10252F)}
#pj-bar{position:sticky;top:0;z-index:20;display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:6px 12px;background:#10252F;color:#fff;font:600 14px/1.2 system-ui,sans-serif}
#pj-bar b{margin-right:auto;font-weight:700;letter-spacing:.02em}
#pj-bar button{font:600 13px system-ui,sans-serif;padding:6px 12px;border-radius:8px;border:1px solid #ffffff55;background:#ffffff18;color:#fff;cursor:pointer}
#pj-bar button:hover{background:#ffffff33}
#pj-stage{padding:22px clamp(14px,3vw,48px) 60px;transform-origin:0 0}
#pj-nav button{position:fixed;bottom:18px;z-index:18;width:64px;height:64px;border-radius:50%;border:2px solid #ffffff88;background:#10252Fd9;color:#fff;font:700 38px/1 system-ui,sans-serif;cursor:pointer;opacity:.75;box-shadow:0 4px 16px #0006}#pj-nav button:hover{opacity:1}#pj-pv2{left:18px}#pj-nx2{right:18px}
#pj-blank{position:fixed;inset:0;background:#000;z-index:15;display:none}
.pjbody.blank #pj-blank{display:block}
.pjstage .pjb{display:none!important}
.pj-wait{display:grid;place-items:center;min-height:60vh;text-align:center;opacity:.7;font-size:28px}
.pj-ov{position:fixed;inset:0;z-index:9999;overflow:auto;background:var(--bg,#fff);color:var(--ink,#10252F)}`;
  const alive=()=>!!(win&&!win.closed);
  const doc=()=>alive()?win.document:ov?document:null;
  const root=()=>{const d=doc();return d?d.getElementById("pj-stage"):null};
  function styles(){return Array.from(document.querySelectorAll('style:not([data-pj]),link[rel="stylesheet"]')).map(n=>n.outerHTML).join("")}
  function mirrorAttrs(d){
    if(d===document)return;
    [["documentElement",document.documentElement],["body",document.body]].forEach(([k,src])=>{
      const dst=k==="body"?d.body:d.documentElement;
      Array.from(dst.attributes).forEach(a=>{if(!(k==="body"&&a.name==="class"))dst.removeAttribute(a.name)});
      Array.from(src.attributes).forEach(a=>{if(k==="body"&&a.name==="class")return;dst.setAttribute(a.name,a.value)});
    });
    d.body.classList.add("pjbody");
  }
  function barHTML(){return `<div id="pj-bar"><b>LOTS Projector</b><span id="pj-zl">${Math.round(zoom*100)}%</span><button type="button" id="pj-zm" aria-label="Smaller">A−</button><button type="button" id="pj-zp" aria-label="Larger">A+</button><button type="button" id="pj-pv" aria-label="Previous item">◀ Previous</button><button type="button" id="pj-nx" aria-label="Next item">Next ▶</button><button type="button" id="pj-bl">Blank</button><button type="button" id="pj-fs">Full screen</button><button type="button" id="pj-x">${alive()?"Close":"Close projector"}</button></div><div id="pj-nav"><button type="button" id="pj-pv2" aria-label="Previous item">‹</button><button type="button" id="pj-nx2" aria-label="Next item">›</button></div><div id="pj-blank"></div><div id="pj-stage" class="pjstage"></div>`}
  function wire(d){
    const g=id=>d.getElementById(id);
    g("pj-zm").onclick=()=>setZoom(zoom-.1);g("pj-zp").onclick=()=>setZoom(zoom+.1);
    g("pj-bl").onclick=()=>blank();
    const stp=n=>{if(stepFn)stepFn(n)};g("pj-pv").onclick=g("pj-pv2").onclick=()=>stp(-1);g("pj-nx").onclick=g("pj-nx2").onclick=()=>stp(1);
    d.addEventListener("keydown",e=>{if(e.key==="ArrowRight"||e.key==="PageDown"){e.preventDefault();stp(1)}else if(e.key==="ArrowLeft"||e.key==="PageUp"){e.preventDefault();stp(-1)}});
    g("pj-fs").onclick=()=>{try{(d.fullscreenElement?d.exitFullscreen():d.documentElement.requestFullscreen())}catch(e){}};
    g("pj-x").onclick=()=>close();
    d.addEventListener("keydown",e=>{if(e.key==="Escape"&&d===document)close()});
  }
  function setZoom(z){zoom=Math.max(.7,Math.min(3,Math.round(z*100)/100));const d=doc();if(!d)return;const s=root();if(s)s.style.zoom=zoom;const l=d.getElementById("pj-zl");if(l)l.textContent=Math.round(zoom*100)+"%"}
  function blank(on){const d=doc();if(!d)return;d.body.classList.toggle("blank",on===undefined?!d.body.classList.contains("blank"):on)}
  function open(){
    if(alive()){try{win.focus()}catch(e){}return true}
    if(ov)return true;
    let w=null;
    try{w=window.open("","lots_projector","width=1280,height=720,menubar=no,toolbar=no,location=no,status=no")}catch(e){w=null}
    if(w){
      try{
        const d=w.document;
        d.open();d.write(`<!doctype html><html><head><meta charset="utf-8"><title>LOTS Projector</title>${styles()}<style data-pj>${CSS}</style></head><body>${barHTML().replace("Close projector","Close")}</body></html>`);d.close();
        win=w;mirrorAttrs(d);wire(d);
        const s=d.getElementById("pj-stage");s.style.zoom=zoom;s.innerHTML=`<div class="pj-wait">Projector ready.<br>Press Project on any lesson item.</div>`;
        clearInterval(timer);timer=setInterval(()=>{if(!alive()){clearInterval(timer);win=null;cur=null;status()}},1000);
        status();return true;
      }catch(e){try{w.close()}catch(_){}win=null}
    }
    /* pop-ups blocked or not reachable: full-screen overlay on this page instead */
    ov=document.createElement("div");ov.className="pj-ov";ov.innerHTML=`<style data-pj>${CSS}</style>`+barHTML().replace("Close projector","Close");
    document.body.appendChild(ov);document.body.classList.add("pjbody");wire(document);
    const s=root();s.style.zoom=zoom;s.innerHTML=`<div class="pj-wait">Full-screen presenter (this browser blocked the second window).<br>Press Project on any lesson item.</div>`;
    status();return true;
  }
  function close(){
    if(alive()){try{win.close()}catch(e){}}
    win=null;clearInterval(timer);
    if(ov){ov.remove();ov=null;document.body.classList.remove("pjbody")}
    cur=null;status();
  }
  function paint(keepScroll){
    const d=doc(),s=root();if(!d||!s||!cur)return;
    const y=keepScroll?(alive()?win.scrollY:ov.scrollTop):0;
    mirrorAttrs(d);d.body.classList.remove("blank");
    s.style.zoom=zoom;s.innerHTML="";
    const w=d.createElement("div");w.className="pj-item";
    if(cur.vars)w.setAttribute("style",cur.vars);
    s.appendChild(w);
    try{cur.render(w)}catch(e){w.textContent="Could not project this item."}
    if(alive())win.scrollTo(0,y);else if(ov)ov.scrollTop=y;
  }
  /* kind: a key so that live items (flashcards, quiz) can be refreshed; render(el): fills el, may mount interactive code */
  function show(key,render,vars){
    if(!doc())open();
    cur={key,render,vars:vars||""};paint(false);status();
  }
  function refresh(key){if(cur&&cur.key===key&&doc())paint(true)}
  function showHTML(html,vars){show("html",el=>{el.innerHTML=html},vars)}
  function showNode(node){
    /* static copy of an element on this page: strips ids, inputs' state, and project buttons */
    const c=node.cloneNode(true);
    c.querySelectorAll(".pjb,script").forEach(x=>x.remove());
    c.querySelectorAll("[id]").forEach(x=>x.removeAttribute("id"));
    const cs=getComputedStyle(node),vars=["--c","--on","--accent"].map(v=>{const x=cs.getPropertyValue(v);return x?v+":"+x:""}).filter(Boolean).join(";");
    showHTML(c.outerHTML,vars);
  }
  const cbs=[];
  function status(){cbs.forEach(f=>{try{f()}catch(e){}})}
  return {setStep:f=>{stepFn=f},open,close,show,showHTML,showNode,refresh,blank,status,on:f=>cbs.push(f),get active(){return !!doc()},get doc(){return doc()},get zoom(){return zoom}};
})();
