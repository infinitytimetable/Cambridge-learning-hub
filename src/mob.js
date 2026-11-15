/* ===== Phones: compact header, the buttons sit behind a Menu button ===== */
(function(){
  function init(){
    const h=document.querySelector("header.top");if(!h||document.getElementById("mnbtn"))return;
    const b=document.createElement("button");b.id="mnbtn";b.type="button";b.className="theme";b.setAttribute("aria-expanded","false");b.setAttribute("aria-label","Menu");
    b.innerHTML='<span aria-hidden="true">☰</span> Menu';h.appendChild(b);
    const set=o=>{h.classList.toggle("mopen",o);b.setAttribute("aria-expanded",String(o));b.firstChild.textContent=o?"✕":"☰"};
    b.addEventListener("click",e=>{e.stopPropagation();set(!h.classList.contains("mopen"))});
    h.addEventListener("click",e=>{if(e.target.closest(".dsp-btn"))setTimeout(()=>set(false),0)});
    document.addEventListener("click",e=>{if(h.classList.contains("mopen")&&!h.contains(e.target))set(false)});
    addEventListener("hashchange",()=>set(false));
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>setTimeout(init,0));else setTimeout(init,0);
})();
