/* ===== Install as an app: one button that does the right thing on each device ===== */
(function(){
  const T=typeof HUB!=="undefined"&&HUB.teacher;
  const PAGES="https://infinitytimetable.github.io/Cambridge-learning-hub/";
  const APK=PAGES+"app/My-Teaching-Hub.apk";
  const WIN="https://github.com/infinitytimetable/Cambridge-learning-hub/releases/latest";
  const ONLINE=T?PAGES+"teacher-061e86/":(typeof HUB!=="undefined"&&HUB.mode==="alevel"?PAGES+"alevel/":PAGES+"igcse/");
  let dp=null,btn=null;
  const ua=navigator.userAgent||"";
  const isIOS=/iPad|iPhone|iPod/.test(ua)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
  const isAndroid=/Android/i.test(ua);
  const standalone=()=>{try{return matchMedia("(display-mode: standalone)").matches||navigator.standalone===true||!!window.LOTS_APP}catch(e){return false}};
  const desktopApp=()=>{try{return !!(window.DESK&&DESK.on)}catch(e){return false}};
  addEventListener("beforeinstallprompt",e=>{e.preventDefault();dp=e;paint()});
  addEventListener("appinstalled",()=>{dp=null;if(btn)btn.remove()});
  function paint(){if(btn)btn.hidden=standalone()||desktopApp()||!(dp||T||isIOS||isAndroid||location.protocol==="file:")}
  function dialog(){
    const ov=document.createElement("div");ov.className="x4ov";
    const online=location.protocol==="https:";
    const opt=(title,text,href,label,dl)=>`<div class="nxrow"><div><b>${title}</b><span class="mute">${text}</span></div>${href?`<a class="btn pri" href="${href}" ${dl?'download':'target="_blank" rel="noopener"'}>${label}</a>`:""}</div>`;
    let h="";
    if(isAndroid){
      if(T)h+=opt("Android app (Promethean boards, tablets, phones)","Downloads the app file (about 47 MB). Open it when it finishes and tap Install. It works without internet after that.",APK,"Download the app",true);
      h+=opt("Install from Chrome",online?"Tap ⋮ at the top right, then Install app (or Add to Home screen).":"Open the online hub in Chrome, wait for it to load, then tap ⋮ → Install app.",online?"":ONLINE,"Open the online hub");
      if(T)h+=opt("Board with no Wi-Fi","Download the app on a computer or phone, copy the .apk file to a USB stick, plug it into the board and open it in Files.","","");
    }else if(isIOS){
      h+=opt("iPhone or iPad",online?"Tap the Share button (square with an arrow) in Safari, then Add to Home Screen.":"Open the online hub in Safari, tap Share, then Add to Home Screen.",online?"":ONLINE,"Open the online hub");
    }else{
      if(T)h+=opt("Windows computer","Full teacher app with your content folder, saving to folders and automatic updates. Download the setup, unzip it and run LOTS-Hub-Setup.",WIN,"Download Windows setup");
      h+=opt("Install from Chrome or Edge",online?"Click the install icon at the right end of the address bar (a screen with a down arrow), or open the ⋮ menu and choose Install.":"Open the online hub in Chrome or Edge, then click the install icon in the address bar.",online?"":ONLINE,"Open the online hub");
      if(T)h+=opt("Promethean board (Android)","Download the Android app and copy it to the board with a USB stick.",APK,"Download Android app",true);
    }
    ov.innerHTML=`<div class="x4dlg" role="dialog" aria-label="Install as an app" style="max-width:640px"><div class="x4dlg-h"><h2>Install ${T?"My Teaching Hub":"the hub"} as an app</h2><button class="btn sm" type="button" data-close>Close</button></div>${h}</div>`;
    document.body.appendChild(ov);
    const close=()=>ov.remove();ov.querySelector("[data-close]").onclick=close;ov.addEventListener("click",e=>{if(e.target===ov)close()});
  }
  async function go(){
    if(dp){try{dp.prompt();const c=await dp.userChoice;if(c&&c.outcome==="accepted"){dp=null;btn.remove();return}}catch(e){}dp=null;}
    dialog();
  }
  function init(){
    const h=document.querySelector("header.top");if(!h||document.getElementById("instbtn"))return;
    btn=document.createElement("button");btn.id="instbtn";btn.type="button";btn.className="theme dsp-btn";btn.innerHTML='<span aria-hidden="true">⤓</span> Install app';btn.title="Install as an app on this device";
    btn.onclick=go;const ref=document.getElementById("mnbtn");h.insertBefore(btn,ref||null);paint();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>setTimeout(init,50));else setTimeout(init,50);
})();
