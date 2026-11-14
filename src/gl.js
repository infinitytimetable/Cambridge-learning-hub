/* ===== Glossary links (all hubs): clickable key words in the notes and the Glossary, the Key terms box, jump to the notes ===== */
const GL=(function(){
"use strict";
const esc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const F=s=>String(s==null?"":s).replace(/~([^~<>]+)~/g,"<sub>$1</sub>").replace(/\^([^\^<>]+)\^/g,"<sup>$1</sup>");
const plain=h=>{const d=document.createElement("div");d.innerHTML=F(h);return d.textContent.replace(/\s+/g," ").trim()};
const IDX={};
function secsOf(l){const parts=String(l.notes||"").split(/<h4>/),o=[];if(parts[0].trim())o.push(parts[0]);parts.slice(1).forEach(p=>o.push(p));return o.map(plain)}
/* one entry per term: meaning, home lesson and the part of the notes where it is explained */
function index(sub){
  if(IDX[sub])return IDX[sub];
  const map=new Map();
  try{(SUBJ[sub].units||[]).forEach(u=>u.lessons.forEach((l,j)=>{
    const key=l.key||(u.n+"-"+(j+1)),no=l.no||(u.n+"."+(j+1));let secs=null;
    const add=(t,d)=>{const tp=plain(t);if(!tp||tp.length<3||tp.length>40||/[?]/.test(tp))return;const k=tp.toLowerCase();if(map.has(k))return;
      secs=secs||secsOf(l);let part=0;const re=new RegExp("\\b"+tp.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","i");const i=secs.findIndex(s=>re.test(s));if(i>=0)part=i;
      map.set(k,{t:tp,html:t,d,key,no,lt:plain(l.t),u:u.n,part})};
    (l.pairs||[]).forEach(p=>add(p[0],p[1]));
    (l.words||[]).forEach(w=>add(w[0].charAt(0).toUpperCase()+w[0].slice(1),w[1]));
  }))}catch(e){}
  const list=[...map.values()].sort((a,b)=>b.t.length-a.t.length);
  return(IDX[sub]={map,list});
}
function find(sub,term){return index(sub).map.get(String(term).toLowerCase())||null}
/* jump to the notes: open the lesson in Explore & Explain at the right part */
function goNotes(sub,e){try{sessionStorage.setItem("x4goto",JSON.stringify({key:e.key,part:e.part,term:e.t}))}catch(x){}
  const h="#"+sub+"/l"+e.key;if(location.hash===h){window.dispatchEvent(new HashChangeEvent("hashchange"))}else location.hash=h}
/* pop-up card next to a word */
const STOP=new Set("water,energy,cell,cells,heat,light,food,blood,air,gas,gases,liquid,solid,mass,volume,rate,temperature,time,size,area,force,salt,sugar,plant,plants,animal,animals,organism,organisms,energy transfer,heart,leaf,leaves,root,roots,soil,carbon".split(","));
let pop=null;
function close(){if(pop){pop.remove();pop=null}}
function card(anchor,sub,e,curKey,onGo){
  close();pop=document.createElement("div");pop.className="gl-pop";pop.setAttribute("role","dialog");pop.setAttribute("aria-label","Meaning of "+e.t);
  const same=curKey&&curKey===e.key;
  pop.innerHTML=`<div class="gl-h"><b>${F(esc(e.t))}</b><button type="button" class="gl-x" aria-label="Close">✕</button></div><p>${F(e.d)}</p><div class="gl-f"><span class="gl-m">Lesson ${esc(e.no)}: ${esc(e.lt)}</span><button type="button" class="btn sm pri gl-go">${same?"Show it in these notes":"Go to the notes"}</button></div>`;
  document.body.appendChild(pop);
  const r=anchor.getBoundingClientRect(),pw=Math.min(360,innerWidth-24);pop.style.width=pw+"px";
  let x=Math.min(innerWidth-pw-12,Math.max(12,r.left+r.width/2-pw/2)),y=r.bottom+8;
  if(y+pop.offsetHeight>innerHeight-10)y=Math.max(10,r.top-pop.offsetHeight-8);
  pop.style.left=x+"px";pop.style.top=y+"px";
  pop.querySelector(".gl-x").onclick=close;
  pop.querySelector(".gl-go").onclick=()=>{close();if(onGo)onGo();goNotes(sub,e)};
  setTimeout(()=>pop&&pop.querySelector(".gl-go").focus(),20);
}
document.addEventListener("click",ev=>{if(pop&&!pop.contains(ev.target)&&!ev.target.closest(".gl-w,.gl-t,.gl-gt"))close()});
document.addEventListener("keydown",ev=>{if(ev.key==="Escape")close()});
addEventListener("hashchange",close);
/* underline the first use of each glossary word inside an element */
function wrap(root,sub,curKey){
  if(!root||root.dataset.glDone)return;root.dataset.glDone="1";
  const IX=index(sub);if(!IX.list.length)return;
  const own=new Map();if(curKey){IX.list.forEach(e=>{if(e.key===curKey)own.set(e.t.toLowerCase(),e)})}
  const list=IX.list.filter(e=>!STOP.has(e.t.toLowerCase())||own.has(e.t.toLowerCase()));
  const seen=new Set();
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const p=n.parentElement;if(!p||!n.nodeValue.trim())return NodeFilter.FILTER_REJECT;if(p.closest("button,a,svg,figure,figcaption,h2,h3,.x4cover,.gl-w,script,style,table th,.sl-top"))return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT}});
  const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  let made=0;
  for(const n of nodes){
    if(made>=40)break;
    let txt=n.nodeValue,low=txt.toLowerCase(),hit=null;
    for(const e of list){const k=e.t.toLowerCase();if(seen.has(k))continue;const i=low.indexOf(k);if(i<0)continue;
      const b=i?low[i-1]:" ",a=low[i+k.length]||" ";if(/[a-z0-9]/.test(b)||/[a-z0-9]/.test(a))continue;if(!hit||i<hit.i)hit={i,e,k}}
    if(!hit)continue;
    seen.add(hit.k);made++;
    const before=txt.slice(0,hit.i),word=txt.slice(hit.i,hit.i+hit.k.length),after=txt.slice(hit.i+hit.k.length);
    const btn=document.createElement("button");btn.type="button";btn.className="gl-w";btn.textContent=word;btn.dataset.gl=hit.k;btn.title="Tap for the meaning";
    const frag=document.createDocumentFragment();if(before)frag.appendChild(document.createTextNode(before));frag.appendChild(btn);
    const rest=document.createTextNode(after);frag.appendChild(rest);n.parentNode.replaceChild(frag,n);
    if(after.trim())nodes.splice(nodes.indexOf(n)+1,0,rest);
  }
  root.addEventListener("click",ev=>{const b=ev.target.closest(".gl-w");if(!b)return;ev.preventDefault();ev.stopPropagation();const e=own.get(b.dataset.gl)||find(sub,b.dataset.gl);if(e)card(b,sub,e,curKey)});
}
/* Key terms box: words first, tap to show the meaning */
function terms(l){const out=[],seen=new Set();(l.pairs||[]).forEach(p=>{const t=plain(p[0]);if(t&&!seen.has(t.toLowerCase())&&!/[?]/.test(t)){seen.add(t.toLowerCase());out.push([p[0],p[1]])}});
  (l.words||[]).forEach(w=>{const t=w[0].charAt(0).toUpperCase()+w[0].slice(1);if(!seen.has(t.toLowerCase())){seen.add(t.toLowerCase());out.push([t,w[1]])}});return out.slice(0,12)}
function keyTermsHTML(l){const t=terms(l);if(!t.length)return "";
  return `<div class="gl-kt">${t.map((x,i)=>`<div class="gl-k"><button type="button" class="gl-t" aria-expanded="false" data-kt="${i}">${F(x[0])}</button><p hidden>${F(x[1])}</p></div>`).join("")}</div><div class="row" style="gap:8px;margin-top:10px;flex-wrap:wrap"><button type="button" class="btn sm" data-ktall>Show all meanings</button><span class="meta">Say what each word means, then tap it to check.</span></div>`}
function bindKeyTerms(root){if(!root)return;root.addEventListener("click",ev=>{const b=ev.target.closest(".gl-t");if(b){const p=b.nextElementSibling;p.hidden=!p.hidden;b.setAttribute("aria-expanded",String(!p.hidden));b.classList.toggle("on",!p.hidden);return}
  const a=ev.target.closest("[data-ktall]");if(a){const ps=[...root.querySelectorAll(".gl-k p")],show=ps.some(p=>p.hidden);ps.forEach(p=>p.hidden=!show);root.querySelectorAll(".gl-t").forEach(x=>{x.setAttribute("aria-expanded",String(show));x.classList.toggle("on",show)});a.textContent=show?"Hide all meanings":"Show all meanings"}})}
/* the lesson asked for by "Go to the notes" */
function pending(key){try{const g=JSON.parse(sessionStorage.getItem("x4goto")||"null");if(g&&g.key===key)return g}catch(e){}return null}
function clearPending(){try{sessionStorage.removeItem("x4goto")}catch(e){}}
function flash(root,term){if(!root||!term)return;const k=String(term).toLowerCase();let el=[...root.querySelectorAll(".gl-w")].find(b=>b.dataset.gl===k);
  if(!el){const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);while(w.nextNode()){const n=w.currentNode,i=n.nodeValue.toLowerCase().indexOf(k);if(i>=0){const m=document.createElement("mark");m.className="gl-mark";const r=document.createRange();r.setStart(n,i);r.setEnd(n,i+k.length);try{r.surroundContents(m);el=m}catch(e){}break}}}
  if(el){el.classList.add("gl-flash");setTimeout(()=>el.scrollIntoView({block:"center",behavior:"smooth"}),150);setTimeout(()=>el.classList.remove("gl-flash"),4000)}}
return{index,find,card,wrap,keyTermsHTML,bindKeyTerms,terms,pending,clearPending,flash,goNotes,close};
})();
window.GL=GL;
