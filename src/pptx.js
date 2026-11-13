/* ===== PowerPoint export (deck layout kept). Uses the inlined PptxGenJS + JSZip globals. ===== */
const PPX=(function(){
"use strict";
/* ---------- palette (light deck theme) ---------- */
const C={DK:"0B3D3A",DK2:"13514D",ACC:"0E7C66",MINT:"E6F2EE",MINTLINE:"BFDCD3",AMBER:"F2A93B",RED:"D9482B",PEACH:"FFF4EE",PEACHLINE:"F4C9B8",PUR:"6B4C9A",PURBG:"F3EEF9",PURLINE:"D6C8E8",BLU:"2F5D8A",BLUBG:"EDF3F9",BLULINE:"C5D6E8",INK:"1B2A2F",MUTED:"5C6B70",BG:"F2F6F4",WHITE:"FFFFFF",LINE:"D9E2E0"};
const HF="Cambria",BF="Calibri";
const W=13.333,H=7.5,MX=0.5,CW=W-2*MX,CY=1.6,CB=6.62;   // content area top/bottom
const STAGES=[["engage","Engage"],["explain","Explore & Explain"],["practise","Practise"],["reflect","Reflect"]];
const LIGHTVARS="--bg:#F2F6F4;--surface:#FFFFFF;--surface2:#E6F2EE;--ink:#1B2A2F;--muted:#5C6B70;--line:#D9E2E0;--accent:#0E7C66;--accent-ink:#FFFFFF;--good:#17794A;--good-bg:#DCF2E6;--bad:#B3261E;--bad-bg:#FBE2E0;--warn-bg:#FFF1CF;--warn:#7A5600;--dk:#0B3D3A;--dk2:#13514D;--mint:#E6F2EE;--mintline:#BFDCD3;--amber:#F2A93B;--red:#D9482B;--peach:#FFF4EE;--peach2:#FFE3D8;--peachline:#F4C9B8;--pur:#6B4C9A;--purbg:#F3EEF9;--purline:#D6C8E8;--blu:#2F5D8A;--blubg:#EDF3F9;--bluline:#C5D6E8;";

/* ---------- markup helpers ---------- */
const F=s=>String(s==null?"":s).replace(/~([^~<>]+)~/g,"<sub>$1</sub>").replace(/\^([^\^<>]+)\^/g,"<sup>$1</sup>");
const dom=h=>{const d=document.createElement("div");d.innerHTML=h;return d};
const plain=h=>dom(F(h)).textContent.replace(/\s+/g," ").trim();
function inl(node,st,out){
  node.childNodes.forEach(n=>{
    if(n.nodeType===3){const t=n.textContent.replace(/\s+/g," ");if(t)out.push(Object.assign({t},st))}
    else if(n.nodeType===1){const tg=n.tagName;
      if(tg==="BR")out.push({br:1});
      else if(tg==="B"||tg==="STRONG")inl(n,Object.assign({},st,{b:1}),out);
      else if(tg==="I"||tg==="EM")inl(n,Object.assign({},st,{i:1}),out);
      else if(tg==="SUB")inl(n,Object.assign({},st,{sub:1}),out);
      else if(tg==="SUP")inl(n,Object.assign({},st,{sup:1}),out);
      else if(tg==="A")inl(n,Object.assign({},st,{link:n.getAttribute("href")}),out);
      else if(/^(P|DIV|UL|OL|LI|H[1-6])$/.test(tg)){inl(n,st,out);out.push({br:1})}
      else if(tg==="STYLE"||tg==="SCRIPT"||tg==="SVG"){}
      else inl(n,st,out);
    }
  });
  return out;
}
function tidy(runs){
  // drop leading/trailing spaces and breaks, collapse double breaks
  const r=runs.slice();
  while(r.length&&(r[0].br||(r[0].t!=null&&!r[0].t.trim())))r.shift();
  while(r.length&&(r[r.length-1].br||(r[r.length-1].t!=null&&!r[r.length-1].t.trim())))r.pop();
  if(r.length&&r[0].t)r[0]=Object.assign({},r[0],{t:r[0].t.replace(/^\s+/,"")});
  if(r.length&&r[r.length-1].t){const k=r.length-1;r[k]=Object.assign({},r[k],{t:r[k].t.replace(/\s+$/,"")})}
  const o=[];r.forEach(x=>{if(x.br&&o.length&&o[o.length-1].br)return;o.push(x)});
  return o;
}
const runsOf=(html,st)=>tidy(inl(dom(F(html)),st||{},[]));
const rtext=runs=>runs.map(r=>r.br?"\n":r.t).join("");

/* ---------- HTML to blocks ---------- */
function blocksOf(root){
  const out=[];let pend=[];
  const flush=()=>{const r=tidy(pend);pend=[];if(r.length)out.push({k:"p",runs:r})};
  function listItems(list,lvl){
    const ord=list.tagName==="OL";let n=0;
    [...list.children].forEach(li=>{
      if(li.tagName!=="LI")return;
      n++;const sub=[],clone=li.cloneNode(true);
      [...clone.querySelectorAll("ul,ol")].forEach(x=>{if(x.parentNode===clone){sub.push(x);x.remove()}});
      const runs=tidy(inl(clone,{},[]));
      out.push({k:"li",runs,ord,n,lvl,list:list});
      sub.forEach(s=>listItems(s,lvl+1));
    });
  }
  function walk(el){
    el.childNodes.forEach(n=>{
      if(n.nodeType===3){const t=n.textContent.replace(/\s+/g," ");if(t.trim()||pend.length)pend.push({t});return}
      if(n.nodeType!==1)return;
      const tg=n.tagName;
      if(/^(B|STRONG|I|EM|SUB|SUP|A|SPAN|CODE|BR)$/.test(tg)){const tmp=document.createElement("div");tmp.appendChild(n.cloneNode(true));pend=pend.concat(inl(tmp,{},[]));return}
      flush();
      if(tg==="P"||/^H[1-6]$/.test(tg)){const r=tidy(inl(n,/^H/.test(tg)?{b:1}:{},[]));if(r.length)out.push({k:"p",runs:r});return}
      if(tg==="UL"||tg==="OL"){listItems(n,0);return}
      if(tg==="TABLE"){
        const rows=[];n.querySelectorAll("tr").forEach(tr=>{const row=[];[...tr.children].forEach(c=>{if(/^(TD|TH)$/.test(c.tagName))row.push({runs:tidy(inl(c,c.tagName==="TH"?{b:1}:{},[])),th:c.tagName==="TH",span:+(c.getAttribute("colspan")||1)})});if(row.length)rows.push(row)});
        if(rows.length)out.push({k:"tbl",rows});return}
      if(tg==="DIV"&&/\b(key|ex)\b/.test(n.className)){
        const kind=/\bex\b/.test(n.className)?"ex":"key";const kids=[...n.childNodes];let title="";
        const fb=kids.find(x=>!(x.nodeType===3&&!x.textContent.trim()));
        if(fb&&fb.nodeType===1&&fb.tagName==="B"){title=fb.textContent.trim();fb.remove()}
        const body=blocksOf(n);
        out.push({k:"box",kind,title,body});return}
      if(tg==="FIGURE"||tg==="SVG"||tg==="STYLE"||tg==="SCRIPT")return;
      walk(n);
    });
  }
  walk(root);flush();return out;
}

/* ---------- measurement ---------- */
const LH=1.22;
function lineCount(text,w,fs,bold){
  const cpl=Math.max(4,Math.floor(w*72/(fs*0.47*(bold?1.07:1))));let lines=0;
  String(text).split("\n").forEach(para=>{
    let cur=0,n=1;
    para.split(/\s+/).filter(Boolean).forEach(word=>{const L=word.length;
      if(L>cpl){n+=Math.floor(L/cpl)}
      if(cur===0)cur=Math.min(L,cpl);else if(cur+1+L<=cpl)cur+=1+L;else{n++;cur=Math.min(L,cpl)}});
    lines+=n;
  });
  return Math.max(1,lines);
}
const hasBold=runs=>runs.length&&runs.filter(r=>r.b).length>runs.length*0.6;
const gapOf=fs=>fs*0.42/72;
function pH(b,w,fs){const iw=b.k==="li"?w-0.3-0.28*b.lvl:w;return lineCount(rtext(b.runs),iw,fs,hasBold(b.runs))*fs*LH/72+gapOf(fs)}
function tblFs(fs){return Math.max(11,Math.min(16,fs-2))}
function tblCols(b,w){
  const nc=Math.max(...b.rows.map(r=>r.reduce((a,c)=>a+c.span,0)));
  const mx=new Array(nc).fill(4);
  b.rows.forEach(r=>{let ci=0;r.forEach(c=>{if(c.span===1)mx[ci]=Math.max(mx[ci],Math.min(46,Math.max(...rtext(c.runs).split(/\s+/).map(x=>x.length),Math.sqrt(rtext(c.runs).length)*3.2)));ci+=c.span})});
  const tot=mx.reduce((a,x)=>a+x,0);return mx.map(x=>w*x/tot);
}
function tblRowH(row,cols,fs){
  let ci=0,mxl=1;
  row.forEach(c=>{const cw=cols.slice(ci,ci+c.span).reduce((a,x)=>a+x,0);ci+=c.span;mxl=Math.max(mxl,lineCount(rtext(c.runs),cw-0.16,fs,c.th))});
  return mxl*fs*LH/72+0.14;
}
function tblH(b,w,fs){const f=tblFs(fs),cols=tblCols(b,w);return b.rows.reduce((a,r)=>a+tblRowH(r,cols,f),0)+0.12}
function boxH(b,w,fs){
  const iw=w-0.5;let h=0.26;
  if(b.title)h+=fs*LH/72+0.04;
  b.body.forEach(x=>{h+=x.k==="tbl"?tblH(x,iw,fs-1):pH(x,iw,fs-1)});
  return h+0.1;
}
function blockH(b,w,fs){return b.k==="tbl"?tblH(b,w,fs):b.k==="box"?boxH(b,w,fs)+0.14:pH(b,w,fs)}

/* ---------- pagination of blocks ---------- */
function paginate(blocks,w,Hh,fs){
  const pages=[[]];let used=0;
  const cur=()=>pages[pages.length-1];
  for(let bi=0;bi<blocks.length;bi++){
    const b=blocks[bi],hh=blockH(b,w,fs);
    if(used+hh<=Hh+1e-6||(!cur().length&&b.k!=="tbl")){cur().push(b);used+=hh;continue}
    if(b.k==="tbl"&&b.rows.length>1){
      const f=tblFs(fs),cols=tblCols(b,w),hdr=b.rows[0][0].th?b.rows[0]:null,hh0=hdr?tblRowH(hdr,cols,f):0;
      let rows=hdr?b.rows.slice(1):b.rows.slice();
      let first=true;
      while(rows.length){
        let room=Hh-used-0.12-(hdr?hh0:0),take=0,acc=0;
        while(take<rows.length&&acc+tblRowH(rows[take],cols,f)<=room){acc+=tblRowH(rows[take],cols,f);take++}
        if(take===0){if(cur().length){pages.push([]);used=0;continue}take=1}
        const chunk=(hdr?[hdr]:[]).concat(rows.slice(0,take));
        cur().push({k:"tbl",rows:chunk,cols:cols});used+=tblH({rows:chunk},w,fs);
        rows=rows.slice(take);
        if(rows.length){pages.push([]);used=0}
        first=false;
      }
      continue;
    }
    pages.push([b]);used=hh;
  }
  return pages.filter(p=>p.length);
}
function chooseFs(blocks,w,Hh,list){
  for(const fs of list){const p=paginate(blocks,w,Hh,fs);if(p.length<=1)return{fs,pages:p.length?p:[[]]}}
  const fs=list[list.length-1]+ (list.length>1?1:0);
  return{fs:Math.max(fs,14),pages:paginate(blocks,w,Hh,Math.max(fs,14))};
}

/* ---------- pptx text runs ---------- */
function toRuns(runs,base,para){
  // para: {bullet, indentLevel, spaceAfter}
  const arr=[];
  runs.forEach((r,i)=>{
    if(r.br){if(arr.length)arr[arr.length-1].options.softBreakBefore=false;arr.push({text:"",options:{breakLine:true}});return}
    const o=Object.assign({},base);
    if(r.b)o.bold=true;if(r.i)o.italic=true;
    if(r.sub)o.subscript=true;if(r.sup)o.superscript=true;
    if(r.link)o.hyperlink={url:r.link};
    arr.push({text:r.t,options:o});
  });
  if(!arr.length)arr.push({text:" ",options:Object.assign({},base)});
  if(para){Object.assign(arr[0].options,para)}
  arr[arr.length-1].options.breakLine=true;
  return arr;
}

/* ---------- figures: SVG to PNG ---------- */
const figCache={};
async function rasterFig(name){
  if(figCache[name])return figCache[name];
  let html="";try{html=typeof FIGS!=="undefined"&&FIGS[name]?FIGS[name]():""}catch(e){html=""}
  if(!html){return(figCache[name]=[])}
  const host=document.createElement("div");
  host.setAttribute("style","position:fixed;left:-20000px;top:0;width:900px;visibility:hidden;pointer-events:none;color:#1B2A2F;background:#fff;font-family:Calibri,Carlito,Arial,sans-serif;"+LIGHTVARS);
  host.setAttribute("data-theme","light");
  host.innerHTML=html;document.body.appendChild(host);
  const out=[];
  try{
    const svgs=[...host.querySelectorAll("svg")];
    for(const im of [...host.querySelectorAll("img")]){
      const fc=im.closest("figure")&&im.closest("figure").querySelector("figcaption");
      const capRuns=fc?tidy(inl(fc,{},[])):[];
      im.loading="eager";await new Promise(res=>{if(im.complete&&im.naturalWidth)res();else{im.onload=res;im.onerror=res;setTimeout(res,3000)}});
      if(im.naturalWidth){const c=document.createElement("canvas");c.width=im.naturalWidth;c.height=im.naturalHeight;const x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0);
        out.push({data:c.toDataURL("image/jpeg",.85),w:im.naturalWidth,h:im.naturalHeight,cap:capRuns,alt:im.getAttribute("alt")||name})}
    }
    const PROPS=["fill","fill-opacity","stroke","stroke-width","stroke-opacity","stroke-dasharray","stroke-linecap","stroke-linejoin","opacity","font-size","font-weight","font-style","text-anchor","dominant-baseline","letter-spacing","stop-color","stop-opacity","paint-order","text-decoration"];
    for(const svg of svgs){
      const fig=svg.closest("figure");let cap="";
      const fc=fig&&fig.querySelector("figcaption");
      const capRuns=fc?tidy(inl(fc,{},[])):[];
      [svg,...svg.querySelectorAll("*")].forEach(el=>{
        const cs=getComputedStyle(el);
        PROPS.forEach(p=>{const v=cs.getPropertyValue(p);if(v)el.style.setProperty(p,v)});
        if(/^(text|tspan)$/i.test(el.tagName))el.style.setProperty("font-family","Calibri, Carlito, Arial, sans-serif");
      });
      const vb=(svg.getAttribute("viewBox")||"").trim().split(/[\s,]+/).map(Number);
      let vw=vb[2],vh=vb[3];
      if(!(vw>0&&vh>0)){const bb=svg.getBoundingClientRect();vw=bb.width||300;vh=bb.height||200}
      const sc=Math.min(3,Math.max(1.5,1500/vw));
      svg.setAttribute("width",Math.round(vw*sc));svg.setAttribute("height",Math.round(vh*sc));
      svg.setAttribute("xmlns","http://www.w3.org/2000/svg");
      svg.style.removeProperty("max-width");
      const xml=new XMLSerializer().serializeToString(svg);
      const url="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(xml);
      const img=new Image();
      await new Promise((res,rej)=>{img.onload=res;img.onerror=()=>rej(new Error("svg load failed: "+name));img.src=url});
      const cv=document.createElement("canvas");cv.width=Math.round(vw*sc);cv.height=Math.round(vh*sc);
      const cx=cv.getContext("2d");cx.drawImage(img,0,0,cv.width,cv.height);
      out.push({data:cv.toDataURL("image/png"),w:vw,h:vh,cap:capRuns,alt:(svg.getAttribute("aria-label")||plain(rtext(capRuns))||name)});
    }
  }catch(e){console.warn("figure failed",name,e)}
  host.remove();
  return(figCache[name]=out);
}

/* ---------- slide scaffolding ---------- */
const THEMES={
  std:{bg:C.BG,pill:C.ACC,title:C.DK,line:C.MINTLINE,accent:C.ACC},
  ext:{bg:C.PURBG,pill:C.PUR,title:C.PUR,line:C.PURLINE,accent:C.PUR},
  ibl:{bg:C.PEACH,pill:C.RED,title:C.DK,line:C.PEACHLINE,accent:C.RED},
  sq:{bg:C.WHITE,pill:C.BLU,title:C.BLU,line:C.BLULINE,accent:C.BLU},
  ms:{bg:C.PURBG,pill:C.PUR,title:C.PUR,line:C.PURLINE,accent:C.PUR}
};
function titleFs(text,w,list,hmax){
  for(const fs of list){if(lineCount(text,w,fs,true)*fs*1.18/72<=hmax)return fs}
  return list[list.length-1];
}
function frame(pres,cx,o){
  const th=THEMES[o.theme||"std"];
  const s=pres.addSlide();s.background={color:th.bg};
  s.addShape("rect",{x:0,y:0,w:W,h:0.14,fill:{color:th.pill},line:{type:"none"}});
  const pw=Math.min(5.5,0.42+o.pill.length*0.115);
  s.addShape("roundRect",{x:MX,y:0.34,w:pw,h:0.34,fill:{color:th.pill},line:{type:"none"},rectRadius:0.17});
  s.addText(o.pill,{x:MX,y:0.34,w:pw,h:0.34,fontFace:BF,fontSize:12,bold:true,color:C.WHITE,align:"center",valign:"middle",margin:0});
  s.addText(cx.tag,{x:MX+pw+0.2,y:0.34,w:W-2*MX-pw-0.2,h:0.34,fontFace:BF,fontSize:11,color:C.MUTED,align:"right",valign:"middle",margin:0});
  if(o.title){
    const tt=plain(o.title),fs=titleFs(tt,CW,[30,26,24,22],0.82);
    s.addText(toRuns(runsOf(o.title,{}),{fontFace:HF,fontSize:fs,bold:true,color:th.title}),{x:MX,y:0.74,w:CW,h:0.84,valign:"middle",margin:0});
  }
  if(o.foot)s.addText(o.foot,{x:MX,y:6.7,w:CW,h:0.3,fontFace:BF,fontSize:12,italic:true,color:C.MUTED,valign:"middle",margin:0});
  s.addShape("line",{x:MX,y:7.06,w:CW,h:0,line:{color:th.line,width:0.75}});
  s.addText(cx.footer,{x:MX,y:7.1,w:CW-1.2,h:0.3,fontFace:BF,fontSize:10,color:C.MUTED,valign:"middle",margin:0});
  s.slideNumber={x:W-MX-1,y:7.1,w:1,h:0.3,fontFace:BF,fontSize:10,color:C.MUTED,align:"right"};
  if(o.notes)s.addNotes(o.notes);
  return s;
}

/* ---------- block drawing ---------- */
function drawBlocks(s,blocks,x,y0,w,fs,th){
  let y=y0,group=[];
  const flush=()=>{
    if(!group.length)return;
    const arr=[];let hh=0,liStart=null;
    group.forEach((b,i)=>{
      const base={fontFace:BF,fontSize:fs,color:C.INK};
      const para={paraSpaceAfter:fs*0.42};
      if(b.k==="li"){
        if(b.ord){if(!(group[i-1]&&group[i-1].k==="li"&&group[i-1].list===b.list))liStart=b.n;para.bullet={type:"number",indent:20,numberStartAt:liStart}}
        else para.bullet={indent:20};
        if(b.lvl)para.indentLevel=b.lvl;
      }
      arr.push(...toRuns(b.runs,base,para));
      hh+=pH(b,w,fs);
    });
    s.addText(arr,{x,y,w,h:Math.max(0.3,hh),valign:"top",margin:0,fit:"none"});
    y+=hh;group=[];
  };
  blocks.forEach(b=>{
    if(b.k==="p"||b.k==="li"){group.push(b);return}
    flush();
    if(b.k==="box"){
      const bh=boxH(b,w,fs),kc=b.kind==="ex"?C.RED:C.ACC,fill=b.kind==="ex"?C.PEACH:C.MINT,ln=b.kind==="ex"?C.PEACHLINE:C.MINTLINE;
      s.addShape("roundRect",{x,y,w,h:bh,fill:{color:fill},line:{color:ln,width:1},rectRadius:0.08});
      s.addShape("rect",{x,y:y+0.05,w:0.07,h:bh-0.1,fill:{color:kc},line:{type:"none"}});
      const arr=[];
      if(b.title)arr.push({text:b.title,options:{fontFace:BF,fontSize:fs,bold:true,color:kc,breakLine:true,paraSpaceAfter:3}});
      b.body.forEach(bb=>{if(bb.k==="p"||bb.k==="li")arr.push(...toRuns(bb.runs,{fontFace:BF,fontSize:fs-1,color:C.INK},{paraSpaceAfter:(fs-1)*0.3}))});
      if(arr.length)s.addText(arr,{x:x+0.22,y:y+0.13,w:w-0.4,h:bh-0.26,valign:"top",margin:0});
      b.body.filter(bb=>bb.k==="tbl").forEach(t=>{drawTable(s,t,x+0.22,y+bh-0.2-tblH(t,w-0.5,fs-1),w-0.5,fs-1)});
      y+=bh+0.14;return;
    }
    if(b.k==="tbl"){y+=drawTable(s,b,x,y,w,fs)+0.0;return}
  });
  flush();
  return y-y0;
}
function drawTable(s,b,x,y,w,fs){
  const f=tblFs(fs),cols=b.cols&&Math.abs(b.cols.reduce((a,c)=>a+c,0)-w)<0.01?b.cols:tblCols(b,w);
  const nc=cols.length;
  const rows=b.rows.map((row,ri)=>{
    const cells=[];
    row.forEach(c=>{
      const hdr=c.th;
      const o={fontFace:BF,fontSize:f,color:hdr?C.WHITE:C.INK};
      const opt={fill:{color:hdr?C.DK2:(ri%2?"F7FAF9":C.WHITE)},valign:"middle",margin:[0.04,0.08,0.04,0.08],border:[{type:"solid",color:C.MINTLINE,pt:0.75},{type:"solid",color:C.MINTLINE,pt:0.75},{type:"solid",color:C.MINTLINE,pt:0.75},{type:"solid",color:C.MINTLINE,pt:0.75}]};
      if(c.span>1)opt.colspan=c.span;
      const rr=c.runs.length?c.runs:[{t:" "}];
      cells.push({text:toRuns(rr,o).map(t=>{t.options.breakLine=false;return t}),options:opt});
    });
    return cells;
  });
  const hh=tblH(b,w,fs);
  s.addTable(rows,{x,y,w,colW:cols,rowH:b.rows.map(r=>tblRowH(r,cols,f)),autoPage:false});
  return hh;
}

/* ---------- figures on a slide ---------- */
function figFit(fg,cw,ch){
  let w=cw,h=cw*fg.h/fg.w;if(h>ch){h=ch;w=ch*fg.w/fg.h}return{w,h};
}
function capH(fg,w){const t=rtext(fg.cap);return t?lineCount(t,w,11,false)*11*1.2/72+0.1:0}
function drawFigs(s,figs,x,y,cw,ch){
  // stack figs vertically within cw x ch; returns nothing
  const n=figs.length;let cy=y;
  const caps=figs.map(f=>capH(f,cw));
  const avail=ch-caps.reduce((a,c)=>a+c,0)-0.12*(n-1);
  const nat=figs.map(f=>cw*f.h/f.w),totNat=nat.reduce((a,c)=>a+c,0);
  const k=Math.min(1,avail/totNat);
  figs.forEach((f,i)=>{
    const w=cw*k,h=nat[i]*k,ix=x+(cw-w)/2;
    s.addImage({data:f.data,x:ix,y:cy,w,h,altText:f.alt||"Diagram"});
    cy+=h;
    if(caps[i]){s.addText(toRuns(f.cap,{fontFace:BF,fontSize:11,italic:true,color:C.MUTED}),{x,y:cy+0.03,w:cw,h:caps[i]-0.05,align:"center",valign:"top",margin:0});cy+=caps[i]}
    cy+=0.12;
  });
}
function stackHeight(figs,cw){return figs.reduce((a,f)=>a+cw*f.h/f.w+capH(f,cw),0)+0.12*(figs.length-1)}

/* ---------- steps (numbered circles) ---------- */
function parseSteps(html){
  const d=dom(F(html));const ol=d.querySelector("ol,ul");let lead=[],items=[];
  if(ol){[...d.children].forEach(c=>{if(c===ol)return;if(c.tagName==="P"&&!items.length&&(c.compareDocumentPosition(ol)&4)){const r=tidy(inl(c,{},[]));if(r.length)lead.push({k:"p",runs:r})}});
    items=[...ol.children].map(li=>tidy(inl(li,{},[])))}
  else items=[...d.children].map(c=>tidy(inl(c,{},[]))).filter(r=>r.length);
  if(!items.length){const r=tidy(inl(d,{},[]));if(r.length)items=[r]}
  return{lead,items};
}
function stepH(runs,w,fs){return Math.max(0.5,lineCount(rtext(runs),w-0.7,fs,false)*fs*LH/72+0.16)}
function stepPages(st,w,Hh,list){
  for(const fs of list){
    let used=st.lead.reduce((a,b)=>a+pH(b,w,fs),0),ok=true;
    st.items.forEach(r=>used+=stepH(r,w,fs)+0.08);
    if(used<=Hh)return{fs,pages:[st.items.map((r,i)=>i)]};
  }
  const fs=list[list.length-1];const pages=[[]];let used=st.lead.reduce((a,b)=>a+pH(b,w,fs),0);
  st.items.forEach((r,i)=>{const hh=stepH(r,w,fs)+0.08;if(used+hh>Hh&&pages[pages.length-1].length){pages.push([]);used=0}pages[pages.length-1].push(i);used+=hh});
  return{fs,pages};
}
function drawSteps(s,st,idxs,x,y0,w,fs,th,firstPage){
  let y=y0;
  if(firstPage&&st.lead.length){y+=drawBlocks(s,st.lead,x,y,w,fs,th)}
  idxs.forEach(i=>{
    const r=st.items[i],hh=stepH(r,w,fs);
    s.addShape("ellipse",{x,y:y+0.04,w:0.42,h:0.42,fill:{color:th.accent},line:{type:"none"}});
    s.addText(String(i+1),{x,y:y+0.04,w:0.42,h:0.42,fontFace:BF,fontSize:15,bold:true,color:C.WHITE,align:"center",valign:"middle",margin:0});
    s.addText(toRuns(r,{fontFace:BF,fontSize:fs,color:C.INK}),{x:x+0.62,y:y+0.04,w:w-0.62,h:hh-0.04,valign:"top",margin:0});
    y+=hh+0.08;
  });
}
function sideBox(s,x,y,w,title,runsOrText,fs,th,extra){
  const runs=typeof runsOrText==="string"?[{t:runsOrText}]:runsOrText;
  const lines=lineCount(rtext(runs),w-0.4,fs,false),hh=Math.max(1.0,0.5+lines*fs*LH/72+0.2+(extra||0));
  s.addShape("roundRect",{x,y,w,h:hh,fill:{color:C.WHITE},line:{color:th.line,width:1},rectRadius:0.08});
  s.addText(title.toUpperCase(),{x:x+0.2,y:y+0.1,w:w-0.4,h:0.3,fontFace:BF,fontSize:11,bold:true,color:th.accent,margin:0,charSpacing:1});
  s.addText(toRuns(runs,{fontFace:BF,fontSize:fs,color:C.INK}),{x:x+0.2,y:y+0.44,w:w-0.4,h:hh-0.54,valign:"top",margin:0});
  return hh;
}

/* ---------- generic card grid ---------- */
function gridPlan(items,cols,w,gap,Hh,fsList,hFn){
  const cw=(w-gap*(cols-1))/cols;
  const build=fs=>{
    const pages=[[]];let used=0;const rows=[];
    for(let i=0;i<items.length;i+=cols){rows.push(items.slice(i,i+cols).map((it,j)=>({it,i:i+j})))}
    rows.forEach(r=>{const rh=Math.max(...r.map(c=>hFn(c.it,fs,cw)));
      const pg=pages[pages.length-1];
      if(used+rh>Hh&&pg.length){pages.push([]);used=0}
      pages[pages.length-1].push({cells:r,h:rh});used+=rh+gap});
    return{fs,pages,cw};
  };
  const plans=fsList.map(build);
  const minP=plans[plans.length-1].pages.length;
  return plans.find(p=>p.pages.length<=minP)||plans[plans.length-1];
}
function drawGrid(s,plan,pageIdx,x,y0,gap,cols,drawCard){
  let y=y0;
  plan.pages[pageIdx].forEach(r=>{
    r.cells.forEach((c,j)=>drawCard(s,c.it,c.i,x+j*(plan.cw+gap),y,plan.cw,r.h,plan.fs));
    y+=r.h+gap;
  });
}

/* ---------- note section split (same as app.js) ---------- */
function splitNotes(l){
  const parts=String(l.notes||"").split(/<h4>/),out=[];
  if(parts[0].trim())out.push({title:l.t,body:parts[0],ext:false});
  parts.slice(1).forEach(p=>{const i=p.indexOf("</h4>");let t=p.slice(0,i);const ext=/extended/i.test(t);
    t=t.replace(/<i>\s*\(?[^<]*Extended[^<]*\)?\s*<\/i>/i,"").replace(/\s*\(Extended( only)?\)/i,"").trim();
    out.push({title:t,body:p.slice(i+5),ext})});
  return out;
}
const FIGWIDE=k=>/^COV_(SINGLE|MULTI)$/.test(k)||/_WIDE$/.test(k);
function figsOf(body){const f=[];const text=body.replace(/\{\{(\w+)\}\}/g,(m,k)=>{f.push(k);return ""});return{text,f}}

/* ---------- build one lesson into a deck ---------- */
async function buildLesson(pres,l,u,SUB,opts){
  opts=opts||{};
  const idx=Math.max(0,u.lessons.indexOf(l)),no=l.no||(u.n+"."+(idx+1));
  const cx={tag:"Lesson "+no+" | "+plain(l.t),footer:(SUB.title||(SUB.level+" "+SUB.name+" "+SUB.code))+"  |  Topic "+u.n+": "+plain(u.name)};
  const secs=splitNotes(l);
  const core=secs.filter(s=>!s.ext),ext=secs.filter(s=>s.ext);
  const ibl=l.ibl||{q:l.t,task:"",act:""};

  /* ---- title slide ---- */
  {
    const s=pres.addSlide();s.background={color:C.DK};
    s.addShape("rect",{x:0,y:0,w:0.28,h:H,fill:{color:C.AMBER},line:{type:"none"}});
    s.addText(("Lesson "+no+"  ·  Topic "+u.n+": "+plain(u.name)).toUpperCase(),{x:0.9,y:0.7,w:11.5,h:0.4,fontFace:BF,fontSize:14,bold:true,color:C.MINTLINE,margin:0,charSpacing:2});
    const ttxt=plain(l.t),tfs=titleFs(ttxt,11.5,[48,42,38,34],2.1);
    s.addText(toRuns(runsOf(l.t),{fontFace:HF,fontSize:tfs,bold:true,color:C.WHITE}),{x:0.9,y:1.3,w:11.5,h:2.2,valign:"middle",margin:0});
    const sfs=lineCount(plain(l.sum),11.2,22,false)>3?19:22;
    s.addText(toRuns(runsOf(l.sum),{fontFace:BF,fontSize:sfs,color:C.MINT}),{x:0.9,y:3.65,w:11.2,h:1.5,valign:"top",margin:0});
    // stage pills
    STAGES.forEach((st,i)=>{const px=0.9+i*2.3;
      s.addShape("roundRect",{x:px,y:5.55,w:2.1,h:0.55,fill:{color:C.DK2},line:{color:"2B6B66",width:1},rectRadius:0.27});
      s.addShape("ellipse",{x:px+0.1,y:5.65,w:0.35,h:0.35,fill:{color:C.AMBER},line:{type:"none"}});
      s.addText(String(i+1),{x:px+0.1,y:5.65,w:0.35,h:0.35,fontFace:BF,fontSize:13,bold:true,color:C.DK,align:"center",valign:"middle",margin:0});
      s.addText(st[1],{x:px+0.52,y:5.55,w:1.5,h:0.55,fontFace:BF,fontSize:16,bold:true,color:C.WHITE,valign:"middle",margin:0});
    });
    s.addText((SUB.title||SUB.name)+"  |  Cambridge",{x:0.9,y:6.6,w:11.5,h:0.4,fontFace:BF,fontSize:14,color:C.MINTLINE,margin:0});
    s.addNotes("Title slide. Share the lesson focus: "+plain(l.sum)+" The five stages are Engage, Explore, Explain, Practise and Reflect.");
  }

  /* ---- Engage: objectives ---- */
  {
    const objs=secs.filter(sc=>sc.title!==l.t||secs.length===1);
    const items=objs.map((sc,n)=>({title:runsOf(sc.title,{}),ext:sc.ext,n:n+1}));
    const hFn=(it,fs,cw)=>Math.max(0.7,lineCount(rtext(it.title),cw-1.0,fs,false)*fs*LH/72+0.3);
    const plan=gridPlan(items,2,CW,0.2,CB-CY-0.78,[20,18,16,15],hFn);
    for(let pi=0;pi<plan.pages.length;pi++){
      const s=frame(pres,cx,{theme:"std",pill:"Engage | Learning objectives",title:"What you will learn",foot:"Core ideas are for everyone. Extended (Supplement) ideas are for Extended candidates.",notes:"Read the objectives with the class. Ask learners to traffic-light their confidence on each before the lesson starts, then again at the end."});
      s.addText(toRuns(runsOf(l.sum+" By the end of this lesson you should be able to explain each idea below."),{fontFace:BF,fontSize:16,color:C.INK}),{x:MX,y:CY-0.05,w:CW,h:0.62,valign:"top",margin:0});
      drawGrid(s,plan,pi,MX,CY+0.7,0.2,2,(sl,it,i,x,y,w,h,fs)=>{
        const ex=it.ext;
        sl.addShape("roundRect",{x,y,w,h,fill:{color:ex?C.PURBG:C.WHITE},line:{color:ex?C.PURLINE:C.MINTLINE,width:1},rectRadius:0.08});
        const pl=ex?1.0:0.5;
        sl.addShape("roundRect",{x:x+0.15,y:y+h/2-0.17,w:pl,h:0.34,fill:{color:ex?C.PUR:C.ACC},line:{type:"none"},rectRadius:0.17});
        sl.addText(ex?"Ext.":String(it.n),{x:x+0.15,y:y+h/2-0.17,w:pl,h:0.34,fontFace:BF,fontSize:12,bold:true,color:C.WHITE,align:"center",valign:"middle",margin:0});
        sl.addText(toRuns(it.title,{fontFace:BF,fontSize:fs,color:C.INK}),{x:x+0.3+pl,y:y+0.08,w:w-0.45-pl,h:h-0.16,valign:"middle",margin:0});
      });
    }
  }

  /* ---- Engage: success criteria ---- */
  {
    const mk=(arr)=>arr.map(sc=>`I can explain and use the ideas in “${plain(sc.title)}”.`);
    const coreC=mk(core.filter(sc=>sc.title!==l.t||secs.length===1)).concat(["I can score at least 80% on the practice questions at the end of the lesson."]);
    const extC=mk(ext).concat(ext.length?[]:[SUB.keyIdea||"I can explain my answers using the key ideas of this topic."]).concat(["I can answer exam-style questions on this topic and use the mark scheme to improve."]);
    const colW=(CW-0.3)/2,avail=CB-CY-0.78;
    let fs=18;
    const hOf=(arr,f)=>0.75+arr.reduce((a,t)=>a+lineCount("☐ "+t,colW-0.5,f,false)*f*LH/72+0.14,0);
    while(fs>13&&Math.max(hOf(coreC,fs),hOf(extC,fs))>avail)fs--;
    const s=frame(pres,cx,{theme:"std",pill:"Engage | Success criteria",title:"How we will know we have got there",foot:"Traffic-light yourself now, then again at the end of the lesson.",notes:"Learners self-assess against these criteria at the start (red, amber, green) and revisit at the plenary."});
    [["Core: I can …",coreC,C.ACC,C.WHITE,C.MINTLINE],["Extended (Supplement): I can …",extC,C.PUR,C.PURBG,C.PURLINE]].forEach((cb,j)=>{
      const x=MX+j*(colW+0.3),hh=Math.max(hOf(cb[1],fs),2.2);
      s.addShape("roundRect",{x,y:CY,w:colW,h:Math.min(hh,avail),fill:{color:cb[3]},line:{color:cb[4],width:1.25},rectRadius:0.08});
      s.addText(cb[0],{x:x+0.25,y:CY+0.12,w:colW-0.5,h:0.4,fontFace:HF,fontSize:20,bold:true,color:cb[2],margin:0});
      const arr=[];cb[1].forEach(t=>arr.push({text:"☐  "+t,options:{fontFace:BF,fontSize:fs,color:C.INK,breakLine:true,paraSpaceAfter:fs*0.5}}));
      s.addText(arr,{x:x+0.25,y:CY+0.62,w:colW-0.5,h:Math.min(hh,avail)-0.7,valign:"top",margin:0});
    });
  }

  /* ---- IBL helper ---- */
  async function iblSlides(pill,title,html,sideFn,foot,notes){
    const st=parseSteps(html||"");
    const th=THEMES.ibl;
    const lw=8.0,sw=CW-lw-0.35,avail=CB-CY;
    const plan=stepPages(st,lw,avail,[20,18,16,14]);
    plan.pages.forEach((idxs,pi)=>{
      const s=frame(pres,cx,{theme:"ibl",pill,title:pi?title+" (continued)":title,foot,notes});
      drawSteps(s,st,idxs,MX,CY,lw,plan.fs,th,pi===0);
      if(pi===0)sideFn(s,MX+lw+0.35,CY,sw,th);
    });
  }
  await iblSlides("IBL | Engage",F(ibl.q),ibl.task,(s,x,y,w,th)=>{
    const hh=sideBox(s,x,y,w,"Evidence to keep","Write your thinking here before you read the notes. We return to it in the plenary.",16,th,1.6);
    s.addShape("roundRect",{x:x+0.2,y:y+hh-1.7,w:w-0.4,h:1.5,fill:{color:C.PEACH},line:{color:C.PEACHLINE,width:1,dashType:"dash"},rectRadius:0.06});
    s.addText("Your working",{x:x+0.3,y:y+hh-1.65,w:w-0.6,h:0.3,fontFace:BF,fontSize:11,italic:true,color:C.MUTED,margin:0});
  },"Inquiry-based learning: ask, predict, test and explain before the teacher confirms.","Starter: wonder first. Give learners 3 to 5 minutes to write predictions and questions on paper or whiteboards before any notes are shown. Collect ideas and do not confirm answers yet.");

  /* ---- Explore ---- */
  await iblSlides("IBL | Explore","Activity: investigate it yourself",ibl.act,(s,x,y,w,th)=>{
    let yy=y;
    if(ibl.link&&ibl.link[0]){
      const lines=lineCount(String(ibl.link[1]||ibl.link[0]),w-0.4,15,false),hh=0.55+lines*15*LH/72+0.25;
      s.addShape("roundRect",{x,y:yy,w,h:hh,fill:{color:C.WHITE},line:{color:th.line,width:1},rectRadius:0.08});
      s.addText("TRY IT ONLINE",{x:x+0.2,y:yy+0.1,w:w-0.4,h:0.3,fontFace:BF,fontSize:11,bold:true,color:th.accent,margin:0,charSpacing:1});
      s.addText([{text:String(ibl.link[1]||ibl.link[0]),options:{fontFace:BF,fontSize:15,color:C.ACC,underline:{style:"sng"},hyperlink:{url:String(ibl.link[0])}}}],{x:x+0.2,y:yy+0.44,w:w-0.4,h:hh-0.5,valign:"top",margin:0});
      yy+=hh+0.2;
    }
    sideBox(s,x,yy,w,"Safety","Follow your teacher’s instructions. "+(SUB.safety||"Wear eye protection and never taste chemicals."),15,th);
  },"Do the activity first, then check your findings against the notes.","Run the activity before the notes. Circulate and prompt with 'What do you notice?' and 'What would change if...?'. Capture observations on the board and return to them in Explain.");

  /* ---- Explain ---- */
  for(let si=0;si<secs.length;si++){
    const sc=secs[si],fg=figsOf(sc.body),theme=sc.ext?"ext":"std";
    const solo=fg.f.filter(k=>!FIGWIDE(k)),wide=fg.f.filter(k=>FIGWIDE(k));
    const root=dom(F(fg.text));const blocks=blocksOf(root);
    let soloFigs=[],wideFigs=[];
    for(const k of solo)soloFigs.push(...await rasterFig(k));
    for(const k of wide)wideFigs.push(...await rasterFig(k));
    const hasSide=soloFigs.length>0&&blocks.length>0;
    const tw=hasSide?7.3:CW,fx=MX+7.6,fw=CW-7.6,avail=CB-CY;
    const ch=chooseFs(blocks,tw,avail,[20,18,17,16,15]);
    let pages=ch.pages;if(!blocks.length)pages=[];
    const title=F(sc.title),pill=sc.ext?"Notes | Extended":"Notes";
    const noteTxt=(sc.ext?"Extended (Supplement) content. ":"")+"Teaching prompt: ask learners to explain this idea in their own words before you reveal each point. Link back to what they found in the Explore activity.";
    const total=Math.max(pages.length,1);
    const queue=soloFigs.slice();
    for(let pi=0;pi<total;pi++){
      const s=frame(pres,cx,{theme,pill,title:pi?title+" (continued)":title,foot:"Part "+(si+1)+" of "+secs.length+(total>1?"  ("+(pi+1)+"/"+total+")":""),notes:noteTxt});
      if(pages[pi])drawBlocks(s,pages[pi],MX,CY,tw,ch.fs,THEMES[theme]);
      if(hasSide&&queue.length){
        const take=[];while(queue.length){const t=take.concat([queue[0]]);if(take.length&&stackHeight(t,fw)>avail)break;take.push(queue.shift());if(stackHeight(take,fw)>avail*1.3)break}
        drawFigs(s,take,fx,CY,fw,avail);
      }
    }
    // figures that did not fit beside the text (or text-less sections)
    const rest=hasSide?queue:soloFigs;
    const figSlides=[];
    if(!hasSide&&soloFigs.length){
      // figure-only slides: up to two per slide side by side
      for(let i=0;i<soloFigs.length;i+=2)figSlides.push(soloFigs.slice(i,i+2));
    }else if(rest.length){for(let i=0;i<rest.length;i+=2)figSlides.push(rest.slice(i,i+2))}
    wideFigs.forEach(f=>figSlides.push([f]));
    figSlides.forEach((grp,gi)=>{
      const s=frame(pres,cx,{theme,pill,title:title+(total>=1&&(blocks.length||gi)?" (diagram)":""),foot:"Part "+(si+1)+" of "+secs.length,notes:"Diagram slide. Ask learners to label or explain the diagram from memory first."});
      const n=grp.length,gw=(CW-0.4*(n-1))/n;
      grp.forEach((f,j)=>drawFigs(s,[f],MX+j*(gw+0.4),CY,gw,CB-CY));
    });
  }

  /* ---- Practise: worksheet ---- */
  const ws=l.ws||[];
  {
    const tot=ws.reduce((a,q)=>a+(q[2]||0),0);
    const items=ws.map((q,n)=>({n:n+1,runs:runsOf(q[0],{b:1}),marks:q[2]}));
    const hFn=(it,fs,cw)=>lineCount(rtext(it.runs),cw-0.9,fs,true)*fs*LH/72+0.34;
    if(items.length){
      const plan=gridPlan(items,2,CW,0.2,CB-CY,[20,18,16,15,14],hFn);
      for(let pi=0;pi<plan.pages.length;pi++){
        const s=frame(pres,cx,{theme:"sq",pill:"Worksheet | Structured",title:plain(l.t)+": worksheet ("+tot+" marks)"+(pi?" (continued)":""),foot:"Write your answers on paper first, then open the mark scheme.",notes:"Learners answer on paper or mini whiteboards. Allow 10 to 15 minutes, then reveal the mark scheme slides and let learners mark their own work in a different colour."});
        drawGrid(s,plan,pi,MX,CY,0.2,2,(sl,it,i,x,y,w,h,fs)=>{
          sl.addShape("roundRect",{x,y,w,h,fill:{color:C.BLUBG},line:{color:C.BLULINE,width:1},rectRadius:0.08});
          sl.addText(String(it.n),{x:x+0.15,y:y+0.12,w:0.45,h:0.35,fontFace:BF,fontSize:15,bold:true,color:C.BLU,margin:0});
          sl.addText(toRuns(it.runs,{fontFace:BF,fontSize:fs,color:C.INK}),{x:x+0.6,y:y+0.12,w:w-1.3,h:h-0.2,valign:"top",margin:0});
          sl.addText("["+it.marks+"]",{x:x+w-0.75,y:y+0.12,w:0.6,h:0.35,fontFace:BF,fontSize:14,bold:true,color:C.BLU,align:"right",margin:0});
        });
      }
      // mark scheme
      const mi=ws.map((q,n)=>({n:n+1,marks:q[2],blocks:blocksOf(dom(F(q[1])))}));
      const mh=(it,fs,cw)=>0.55+it.blocks.reduce((a,b)=>a+blockH(b,cw-0.3,fs),0);
      const mplan=gridPlan(mi,2,CW,0.2,CB-CY,[18,16,15,14,13],mh);
      for(let pi=0;pi<mplan.pages.length;pi++){
        const s=frame(pres,cx,{theme:"ms",pill:"Mark scheme",title:"Worksheet mark scheme"+(pi?" (continued)":""),foot:"One mark for each point in brackets. Mark your own work in a different colour.",notes:"Reveal after learners have attempted the worksheet. Model how to award marks point by point."});
        drawGrid(s,mplan,pi,MX,CY,0.2,2,(sl,it,i,x,y,w,h,fs)=>{
          sl.addShape("roundRect",{x,y,w,h,fill:{color:C.WHITE},line:{color:C.PURLINE,width:1},rectRadius:0.08});
          sl.addText("Q"+it.n+"  ["+it.marks+"]",{x:x+0.15,y:y+0.08,w:w-0.3,h:0.35,fontFace:BF,fontSize:15,bold:true,color:C.PUR,margin:0});
          drawBlocks(sl,it.blocks,x+0.15,y+0.5,w-0.3,fs,THEMES.ms);
        });
      }
    }
  }

  /* ---- Practise: practice questions ---- */
  const pr=l.pr||[];
  if(pr.length){
    const qi=pr.map((q,n)=>{
      let opts=[];if(q.t==="mcq")opts=q.o.map((o,j)=>[{t:String.fromCharCode(65+j)+"  ",b:1}].concat(runsOf(o)));
      else if(q.t==="num")opts=[[{t:"Answer"}].concat(q.u?[{t:" in "}].concat(runsOf(q.u)):[]).concat([{t:":  ________"}])];
      else opts=[[{t:"Answer:  ________"}]];
      return{n:n+1,q:runsOf(q.q,{b:1}),opts,raw:q};
    });
    const hFn=(it,fs,cw)=>lineCount(rtext(it.q),cw-0.4,fs,true)*fs*LH/72+it.opts.reduce((a,o)=>a+lineCount(rtext(o),cw-0.7,fs-1,false)*(fs-1)*LH/72+0.04,0)+0.36;
    const plan=gridPlan(qi,2,CW,0.2,CB-CY,[18,16,15,14,13],hFn);
    for(let pi=0;pi<plan.pages.length;pi++){
      const s=frame(pres,cx,{theme:"sq",pill:"Practice | Quick questions",title:"Quick questions"+(pi?" (continued)":""),foot:"Choose an option or work out the answer, then check on the next slides.",notes:"Use as a quick whole-class retrieval task: mini whiteboards up, then reveal the answer slides."});
      drawGrid(s,plan,pi,MX,CY,0.2,2,(sl,it,i,x,y,w,h,fs)=>{
        sl.addShape("roundRect",{x,y,w,h,fill:{color:C.WHITE},line:{color:C.BLULINE,width:1},rectRadius:0.08});
        const qh=lineCount(rtext(it.q),w-0.4,fs,true)*fs*LH/72;
        sl.addText(toRuns([{t:it.n+".  ",b:1}].concat(it.q),{fontFace:BF,fontSize:fs,color:C.INK}),{x:x+0.15,y:y+0.12,w:w-0.3,h:qh+0.05,valign:"top",margin:0});
        const arr=[];it.opts.forEach(o=>arr.push(...toRuns(o,{fontFace:BF,fontSize:fs-1,color:C.INK},{paraSpaceAfter:3})));
        sl.addText(arr,{x:x+0.35,y:y+0.2+qh,w:w-0.55,h:h-qh-0.25,valign:"top",margin:0});
      });
    }
    // answers
    const ai=qi.map(it=>{
      const q=it.raw;let ans=[];
      if(q.t==="mcq")ans=[{t:String.fromCharCode(65+q.a)+"  "}].concat(runsOf(q.o[q.a]));
      else if(q.t==="num")ans=runsOf(String(q.a)+(q.u?" "+q.u:""));
      else ans=runsOf(q.a.join(" / "));
      return{n:it.n,q:it.q,ans,exp:q.e?runsOf(q.e,{}):[]};
    });
    const ah=(it,fs,cw)=>lineCount(rtext(it.ans)+" "+rtext(it.exp),cw-0.4,fs,false)*fs*LH/72+0.5;
    const aplan=gridPlan(ai,2,CW,0.2,CB-CY,[18,16,15,14,13],ah);
    for(let pi=0;pi<aplan.pages.length;pi++){
      const s=frame(pres,cx,{theme:"ms",pill:"Practice | Answers",title:"Quick questions: answers"+(pi?" (continued)":""),foot:"Ask learners to explain why each answer is right before you show the reason.",notes:"Reveal answers one at a time and ask a learner to justify before showing the explanation."});
      drawGrid(s,aplan,pi,MX,CY,0.2,2,(sl,it,i,x,y,w,h,fs)=>{
        sl.addShape("roundRect",{x,y,w,h,fill:{color:C.WHITE},line:{color:C.PURLINE,width:1},rectRadius:0.08});
        const arr=[{text:it.n+".  ",options:{bold:true,color:C.PUR,fontFace:BF,fontSize:fs}}];
        it.ans.forEach(r=>arr.push(...toRuns([r],{fontFace:BF,fontSize:fs,color:C.DK}).map(t=>{t.options.breakLine=false;t.options.bold=true;return t})));
        arr[arr.length-1].options.breakLine=true;arr[arr.length-1].options.paraSpaceAfter=4;
        if(it.exp.length)arr.push(...toRuns(it.exp,{fontFace:BF,fontSize:fs-1,color:C.MUTED,italic:true}));
        sl.addText(arr,{x:x+0.15,y:y+0.12,w:w-0.3,h:h-0.2,valign:"top",margin:0});
      });
    }
  }

  /* ---- Practise: past paper pointer ---- */
  if(!opts.noPast){
    const cnt=(u.pp||[]).length;
    if(cnt){
      const s=frame(pres,cx,{theme:"sq",pill:"Past paper | Topic questions",title:"Exam-style questions: Topic "+u.n,foot:"",notes:"Open the Exam questions page in the hub for the self-marking questions on this topic."});
      s.addShape("roundRect",{x:2.2,y:2.4,w:8.9,h:3.0,fill:{color:C.BLUBG},line:{color:C.BLULINE,width:1},rectRadius:0.1});
      s.addText([{text:cnt+" questions on ",options:{fontFace:BF,fontSize:24,color:C.INK}},{text:plain(u.name),options:{fontFace:BF,fontSize:24,bold:true,color:C.BLU,breakLine:true}},{text:"with a self-marking mark scheme.",options:{fontFace:BF,fontSize:24,color:C.INK,breakLine:true,paraSpaceAfter:14}},{text:"Open the Exam questions page in the hub and choose Topic "+u.n+".",options:{fontFace:BF,fontSize:18,italic:true,color:C.MUTED}}],{x:2.6,y:2.6,w:8.1,h:2.6,align:"center",valign:"middle",margin:0});
    }
  }

  /* ---- Reflect: flashcards ---- */
  const cards=(l.cards||[]).map((c,n)=>({n:n+1,term:runsOf(c[0],{b:1}),def:runsOf(c[1],{})}));
  if(cards.length){
    const hFn=(it,fs,cw)=>lineCount(rtext(it.term),cw-0.4,fs+2,true)*(fs+2)*LH/72+lineCount(rtext(it.def),cw-0.4,fs,false)*fs*LH/72+0.5;
    const plan=gridPlan(cards,2,CW,0.2,CB-CY,[20,18,16,15,14],hFn);
    // equalise card heights per page for a neat grid
    plan.pages.forEach(pg=>{const mx=Math.max(...pg.map(r=>r.h));pg.forEach(r=>r.h=Math.max(r.h,Math.min(mx,(CB-CY)/Math.max(1,pg.length)-0.2)))});
    for(let pi=0;pi<plan.pages.length;pi++){
      const s=frame(pres,cx,{theme:"sq",pill:"Reflect | Flashcards",title:"Test yourself"+(plan.pages.length>1?" ("+(pi+1)+"/"+plan.pages.length+")":""),foot:"Cover the right-hand side, say the answer, then check.",notes:"Pairs quiz each other: one reads the term, the other answers from memory. Swap after each card."});
      drawGrid(s,plan,pi,MX,CY,0.2,2,(sl,it,i,x,y,w,h,fs)=>{
        sl.addShape("roundRect",{x,y,w,h,fill:{color:C.WHITE},line:{color:C.BLULINE,width:1},rectRadius:0.08});
        sl.addShape("rect",{x,y:y+0.1,w:0.08,h:h-0.2,fill:{color:C.BLU},line:{type:"none"}});
        sl.addText(toRuns(it.term,{fontFace:HF,fontSize:fs+2,color:C.BLU}),{x:x+0.25,y:y+0.1,w:w-0.4,h:h*0.38,valign:"top",margin:0});
        sl.addText(toRuns(it.def,{fontFace:BF,fontSize:fs,color:C.INK}),{x:x+0.25,y:y+0.1+h*0.38,w:w-0.4,h:h*0.58,valign:"top",margin:0});
      });
    }
  }

  /* ---- Reflect: plenary ---- */
  {
    const nxt=u.lessons[idx+1];
    const steps={lead:[],items:[
      runsOf("<b>Answer your own question.</b> Go back to your Engage working. Which parts of “"+F(ibl.q)+"” can you now answer using evidence from the notes?"),
      runsOf("<b>3-2-1.</b> Write 3 key facts, 2 connections between ideas and 1 question you would like to investigate next."),
      runsOf("<b>Concept map.</b> Link the key words from this lesson with arrows and a verb on every link."),
      runsOf("<b>Self-assess.</b> Mark the worksheet with the mark scheme, then redo every lost mark in a different colour.")]};
    const th=THEMES.ibl,lw=8.0,sw=CW-lw-0.35;
    const plan=stepPages(steps,lw,CB-CY,[20,18,16]);
    plan.pages.forEach((idxs,pi)=>{
      const s=frame(pres,cx,{theme:"ibl",pill:"IBL | Evaluate",title:"Plenary: exit ticket"+(pi?" (continued)":""),foot:"Inquiry-based learning: ask, predict, test and explain before the teacher confirms.",notes:"Exit ticket: learners choose one or two tasks. Collect 3-2-1 responses as they leave and use them to plan the next lesson."});
      drawSteps(s,steps,idxs,MX,CY,lw,plan.fs,th,pi===0);
      if(pi===0){let yy=CY;
        if(nxt)yy+=sideBox(s,MX+lw+0.35,yy,sw,"Next lesson",plain(nxt.t),16,th)+0.2;
        sideBox(s,MX+lw+0.35,yy,sw,"Bring","Your concept map and your corrected answers.",16,th);}
    });
  }
}

/* ---------- deck creation and output ---------- */
function newDeck(title,SUB){
  const pres=new PptxGenJS();
  pres.layout="LAYOUT_WIDE";
  pres.title=title;pres.author="Cambridge Learning Hub";pres.company="";pres.subject=(SUB&&SUB.title)||"";
  return pres;
}
function fixXml(xml){
  // PptxGenJS 4 writes a paragraph-properties element for every text run; only the first one in a paragraph is valid.
  return xml.replace(/<a:p>([\s\S]*?)<\/a:p>/g,(m,inner)=>{
    let seen=false;
    inner=inner.replace(/<a:pPr\b[^>]*?\/>|<a:pPr\b[^>]*?>[\s\S]*?<\/a:pPr>/g,x=>{if(seen)return "";seen=true;return x});
    return "<a:p>"+inner+"</a:p>";
  });
}
async function finish(pres){
  const buf=await pres.write({outputType:"arraybuffer"});
  const zip=await JSZip.loadAsync(buf);
  const names=Object.keys(zip.files).filter(n=>/^ppt\/(slides|notesSlides)\/[^/]+\.xml$/.test(n));
  for(const n of names){const x=await zip.file(n).async("string");const y=fixXml(x);if(y!==x)zip.file(n,y)}
  return zip.generateAsync({type:"blob",compression:"DEFLATE",mimeType:"application/vnd.openxmlformats-officedocument.presentationml.presentation"});
}
const safe=s=>String(s).replace(/[\\/:*?"<>|~^]+/g,"").replace(/\s+/g," ").trim().slice(0,110);
function subjName(SUB){return SUB?((SUB.name||"")+" "+(SUB.code||"")).trim():"Lesson"}

async function lesson(l,u,SUB){
  SUB=SUB||{};
  for(const k in figCache)delete figCache[k];
  const pres=newDeck(plain(l.t),SUB);
  await buildLesson(pres,l,u,SUB);
  const idx=Math.max(0,u.lessons.indexOf(l));
  const data=await finish(pres);
  return{filename:safe(subjName(SUB)+" T"+u.n+" L"+(idx+1)+" "+plain(l.t))+".pptx",data};
}
async function topic(u,SUB){
  SUB=SUB||{};
  for(const k in figCache)delete figCache[k];
  const pres=newDeck(plain(u.name),SUB);
  // topic title slide
  {
    const s=pres.addSlide();s.background={color:C.DK};
    s.addShape("rect",{x:0,y:0,w:0.28,h:H,fill:{color:C.AMBER},line:{type:"none"}});
    s.addShape("ellipse",{x:0.9,y:0.8,w:1.3,h:1.3,fill:{color:C.ACC},line:{type:"none"}});
    s.addText(String(u.n),{x:0.9,y:0.8,w:1.3,h:1.3,fontFace:HF,fontSize:44,bold:true,color:C.WHITE,align:"center",valign:"middle",margin:0});
    s.addText(((SUB.title||SUB.name||"")+"  |  Topic "+u.n).toUpperCase(),{x:2.5,y:0.85,w:10,h:0.4,fontFace:BF,fontSize:14,bold:true,color:C.MINTLINE,margin:0,charSpacing:2});
    const tt=plain(u.name),fs=titleFs(tt,10,[44,38,34,30],1.4);
    s.addText(toRuns(runsOf(u.name),{fontFace:HF,fontSize:fs,bold:true,color:C.WHITE}),{x:2.5,y:1.25,w:10,h:1.5,valign:"middle",margin:0});
    s.addText(toRuns(runsOf(u.blurb||""),{fontFace:BF,fontSize:20,color:C.MINT}),{x:0.9,y:2.95,w:11.5,h:0.9,valign:"top",margin:0});
    const arr=[];u.lessons.forEach((l,i)=>arr.push({text:(u.n+"."+(i+1))+"   "+plain(l.t),options:{fontFace:BF,fontSize:u.lessons.length>6?16:18,color:C.WHITE,breakLine:true,paraSpaceAfter:5}}));
    s.addText(arr,{x:0.9,y:3.95,w:11.5,h:2.9,valign:"top",margin:0});
    s.addNotes("Topic overview. Lessons in this deck: "+u.lessons.map(l=>plain(l.t)).join("; ")+".");
  }
  for(let i=0;i<u.lessons.length;i++)await buildLesson(pres,u.lessons[i],u,SUB,{noPast:i<u.lessons.length-1});
  const data=await finish(pres);
  return{filename:safe(subjName(SUB)+" T"+u.n+" "+plain(u.name))+".pptx",data};
}
return{lesson,topic,_fixXml:fixXml};
})();
async function exportLessonPPTX(l,u,SUB){return PPX.lesson(l,u,SUB)}
async function exportTopicPPTX(u,SUB){return PPX.topic(u,SUB)}
