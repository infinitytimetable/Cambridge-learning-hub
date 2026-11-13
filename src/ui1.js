/* ui1.js - clock and date, full screen, show/hide tab panel, periodic table button */
(function(){
const $=(s,r)=>(r||document).querySelector(s);
const SETG=()=>(window.HUBSET&&HUBSET.get())||{ui:{clock:true,h24:true}};
/* ---- clock and date, top left ---- */
function clock(){
  const top=$(".top");if(!top)return;
  let c=$("#hclock");const on=(SETG().ui||{}).clock!==false;
  if(!on){if(c)c.remove();return}
  if(!c){c=document.createElement("div");c.id="hclock";c.setAttribute("aria-label","Clock and date");top.insertBefore(c,top.firstChild)}
  const d=new Date(),h24=(SETG().ui||{}).h24!==false;
  const t=d.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!h24});
  const dt=d.toLocaleDateString([],{weekday:"short",day:"numeric",month:"short",year:"numeric"});
  const h=`<b>${t}</b><span>${dt}</span>`;if(c.innerHTML!==h)c.innerHTML=h;
}
window.HUBCLOCK=clock;clock();setInterval(clock,10000);
/* ---- full screen + hide tabs ---- */
const top=$(".top");
function setTabs(h,save){
  document.body.classList.toggle("tabs-hidden",h);
  const b=$("#tabbtn");if(b){b.textContent=h?"Show tabs":"Hide tabs";b.setAttribute("aria-pressed",String(h))}
  if(save){try{localStorage.setItem("hubtabs",h?"1":"")}catch(e){}}
}
if(top&&!$("#fsbtn")){
  const anchor=$("#setbtn")||$("#pjbtn");
  const mk=(id,txt)=>{const b=document.createElement("button");b.id=id;b.type="button";b.className="theme dsp-btn";b.textContent=txt;return b};
  const tb=mk("tabbtn","Hide tabs");tb.onclick=()=>setTabs(!document.body.classList.contains("tabs-hidden"),1);
  (anchor?anchor.parentNode:top).insertBefore(tb,anchor?anchor.nextSibling:null);
  if(document.fullscreenEnabled||document.webkitFullscreenEnabled){
    const fb=mk("fsbtn","Full screen");
    const isFs=()=>document.fullscreenElement||document.webkitFullscreenElement;
    fb.onclick=()=>{try{if(isFs()){(document.exitFullscreen||document.webkitExitFullscreen).call(document)}else{const el=document.documentElement;(el.requestFullscreen||el.webkitRequestFullscreen).call(el)}}catch(e){}};
    const sync=()=>{fb.textContent=isFs()?"Exit full screen":"Full screen"};
    document.addEventListener("fullscreenchange",sync);document.addEventListener("webkitfullscreenchange",sync);
    tb.parentNode.insertBefore(fb,tb);
  }
  try{if(localStorage.getItem("hubtabs")==="1")setTabs(true)}catch(e){}
}
/* ---- periodic table button in Chemistry lessons ---- */
function ptShow(){
  if(typeof ASSESS_PT==="undefined")return;
  const o=document.createElement("div");o.className="pt-ov";o.setAttribute("role","dialog");o.setAttribute("aria-label","Periodic table");
  o.innerHTML=`<div class="pt-card"><div class="pt-bar"><button class="btn" type="button" id="pt-pj">Project</button><button class="btn pri" type="button" id="pt-x">Close</button></div><img src="${ASSESS_PT}" alt="The Periodic Table of Elements"></div>`;
  document.body.appendChild(o);
  const close=()=>{o.remove();document.removeEventListener("keydown",esc)};
  const esc=e=>{if(e.key==="Escape")close()};document.addEventListener("keydown",esc);
  o.addEventListener("click",e=>{if(e.target===o)close()});
  $("#pt-x",o).onclick=close;
  $("#pt-pj",o).onclick=()=>{if(window.PROJ)PROJ.showHTML(`<div style="text-align:center"><img src="${ASSESS_PT}" alt="Periodic table" style="max-width:100%;height:auto"></div>`)};
}
function ptBtn(){
  const hk=(location.hash.replace(/^#\/?/,"").split("/")[0]||"");const lg=($(".logo .cell small")||{}).textContent||"";const ck=/^(chem|bio|alevel)$/.test(hk)?hk:(lg==="0620"?"chem":"");if(ck!=="chem"||typeof ASSESS_PT==="undefined")return;
  const h=$(".deck-hero");if(!h||$("#ptbtn",h))return;
  const host=$(".meta2",h)||h;
  const b=document.createElement("button");b.id="ptbtn";b.type="button";b.className="btn";b.textContent="Periodic table";b.title="Show the Periodic Table";b.onclick=ptShow;
  host.appendChild(b);
}
const app=$("#app");if(app){new MutationObserver(ptBtn).observe(app,{childList:true,subtree:true});ptBtn()}
})();
