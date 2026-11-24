/* My Teaching Hub (Android): saves exported files (PDF, Word, PowerPoint, backups) through the app. */
(function(){
  if(window.__lotsAndroid)return;window.__lotsAndroid=1;
  var A=window.LOTSANDROID;if(!A)return;
  var MIME={pdf:"application/pdf",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",pptx:"application/vnd.openxmlformats-officedocument.presentationml.presentation",xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",json:"application/json",csv:"text/csv",txt:"text/plain",html:"text/html",png:"image/png",jpg:"image/jpeg",zip:"application/zip"};
  function guess(n){var e=(String(n).split(".").pop()||"").toLowerCase();return MIME[e]||"application/octet-stream"}
  function send(name,blob){
    return new Promise(function(res){
      var mime=(blob.type&&blob.type!=="application/octet-stream")?blob.type:guess(name);
      A.begin(String(name||"file"),mime);
      var CH=3*1024*1024,i=0;
      function next(){
        if(i>=blob.size){res(A.end()==="ok");return}
        blob.slice(i,i+CH).arrayBuffer().then(function(ab){
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
  window.LOTS_APP={android:true,version:A.version()};
})();
