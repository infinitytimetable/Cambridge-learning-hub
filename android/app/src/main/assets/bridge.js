/* My Teaching Hub (Android): saves exported files (PDF, Word, PowerPoint, backups) through the app. */
(function(){
  if(window.__lotsAndroid)return;window.__lotsAndroid=1;
  var A=window.LOTSANDROID;if(!A)return;
  var MIME={pdf:"application/pdf",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",pptx:"application/vnd.openxmlformats-officedocument.presentationml.presentation",xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",json:"application/json",csv:"text/csv",txt:"text/plain",html:"text/html",png:"image/png",jpg:"image/jpeg",zip:"application/zip"};
  function guess(n){var e=(String(n).split(".").pop()||"").toLowerCase();return MIME[e]||"application/octet-stream"}
  function readAB(b){if(b.arrayBuffer)return b.arrayBuffer();return new Promise(function(ok,no){var r=new FileReader();r.onload=function(){ok(r.result)};r.onerror=no;r.readAsArrayBuffer(b)})}
  function send(name,blob){
    return new Promise(function(res){
      var mime=(blob.type&&blob.type!=="application/octet-stream")?blob.type:guess(name);
      A.begin(String(name||"file"),mime);
      var CH=3*1024*1024,i=0;
      function next(){
        if(i>=blob.size){res(A.end()==="ok");return}
        readAB(blob.slice(i,i+CH)).then(function(ab){
          var b=new Uint8Array(ab),s="";for(var j=0;j<b.length;j+=0x8000)s+=String.fromCharCode.apply(null,b.subarray(j,j+0x8000));
          A.chunk(btoa(s));i+=CH;next();
        }).catch(function(){A.end();res(false)});
      }
      next();
    });
  }
  var SAVE={save:function(name,data){var blob=data instanceof Blob?data:new Blob([data]);return send(name,blob)}};
  try{Object.defineProperty(window,"HUBSAVE",{configurable:false,get:function(){return SAVE},set:function(){}})}catch(e){window.HUBSAVE=SAVE}
  function grab(a){var n=a.download||"file",h=a.href;fetch(h).then(function(r){return r.blob()}).then(function(b){send(n,b)})}
  var oc=HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click=function(){if(this.hasAttribute("download")&&/^(blob:|data:)/.test(this.href)){grab(this);return}return oc.call(this)};
  document.addEventListener("click",function(e){var a=e.target&&e.target.closest&&e.target.closest("a[download]");if(a&&/^(blob:|data:)/.test(a.href)){e.preventDefault();grab(a)}},true);
  /* printing: window.print() on the page, and the pop-up pages the hub writes for worksheets and packs */
  window.print=function(){A.printPage(document.title||"My Teaching Hub")};
  var ow=window.open;
  window.open=function(url,name,feat){
    if(name==="lots_projector")return null;              // the projector uses its full-screen view instead
    var u=String(url||"");
    if(u&&u!=="about:blank"){try{A.openUrl(new URL(u,location.href).href)}catch(e){}return null}
    var fr=document.createElement("iframe");
    fr.style.cssText="position:fixed;left:-10000px;top:0;width:1100px;height:800px;border:0;visibility:hidden";
    (document.body||document.documentElement).appendChild(fr);
    var w=fr.contentWindow,d=w.document,shown=false;
    function html(){return "<!doctype html>"+d.documentElement.outerHTML}
    function show(p){if(shown){if(p)A.printDoc();return}shown=true;A.showDoc(html(),d.title||"My Teaching Hub",!!p);setTimeout(function(){fr.remove()},4000)}
    var dc=d.close.bind(d);d.close=function(){dc();setTimeout(function(){show(false)},350)};
    w.print=function(){show(true)};w.close=function(){};w.focus=function(){};
    return w;
  };
  window.LOTS_APP={android:true,version:A.version()};
})();
