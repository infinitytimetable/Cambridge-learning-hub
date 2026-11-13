/* ===== HUBDOC: shared document export (docx, pdf, svg to png, csv). Global JSZip is provided by the inlined PptxGenJS bundle. ===== */
const HUBDOC=(function(){
"use strict";
const TONE={info:{f:"E6F2EE",b:"0E7C66"},warn:{f:"FFF1D6",b:"F2A93B"},risk:{f:"FBE3DE",b:"D9482B"},good:{f:"E1F3E8",b:"2E9E5B"}};
const ROWT={bad:"FBE3DE",warn:"FFF1D6",good:"E1F3E8"};
let CAM=null;
const TEAL="0B3D3A",HEADF="E6F2EE",ZEBRA="F5F8F7",GRID="BFC9C6";
const gridC=()=>CAM?"000000":GRID,headF=()=>CAM?"FFFFFF":HEADF,headC=()=>CAM?"000000":TEAL;
const esc=s=>String(s==null?"":s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
/* inline markup -> runs: **bold**, ~sub~, ^sup^, newline */
const PUA={"\uf0ae":"\u2192","\uf0ac":"\u2190","\uf0b4":"\u00d7","\uf0b0":"\u00b0","\uf0b7":"\u2022","\uf06d":"\u03bc","\uf061":"\u03b1","\uf062":"\u03b2","\uf044":"\u0394","\uf020":" ","\uf0a3":"\u2264","\uf0b3":"\u2265","\uf0b1":"\u00b1","\uf0a5":"\u221e","\uf067":"\u03b3","\uf064":"\u03b4","\uf06c":"\u03bb","\uf070":"\u03c0","\uf0b8":"\u00f7","\uf0ba":"=","\uf0d7":"\u00b7"};
const cleanTxt=t=>String(t==null?"":t).replace(/[\uf000-\uf0ff]/g,c=>PUA[c]!=null?PUA[c]:"").replace(/\u25cf/g,"\u2022").replace(/\u2011/g,"-");
function parse(text,base){
  base=base||{};const out=[];let b=!!base.b,i=!!base.i,sub=false,sup=false;
  cleanTxt(text).split(/(\*\*|~|\^|\n)/).forEach(tok=>{
    if(tok==="**")b=!b;else if(tok==="~"){sub=!sub;sup=false}else if(tok==="^"){sup=!sup;sub=false}
    else if(tok==="\n")out.push({br:1});
    else if(tok)out.push({t:tok,b,i,sub,sup});
  });
  return out;
}
const dataBytes=u=>{const m=/^data:([^;,]+)(;base64)?,(.*)$/.exec(u);if(!m)return null;const bin=m[2]?atob(m[3]):decodeURIComponent(m[3]);const a=new Uint8Array(bin.length);for(let k=0;k<bin.length;k++)a[k]=bin.charCodeAt(k);return{mime:m[1],bytes:a}};
const loadImg=u=>new Promise((res,rej)=>{const im=new Image();im.onload=()=>res(im);im.onerror=()=>rej(new Error("image load failed"));im.src=u});

/* ---------------- csv ---------------- */
function csv(rows){
  return "﻿"+rows.map(r=>r.map(v=>{const s=v==null?"":String(v);return /[",\r\n]|^\s|\s$/.test(s)?'"'+s.replace(/"/g,'""')+'"':s}).join(",")).join("\r\n");
}

/* ---------------- svg -> png ---------------- */
const SVGPROPS=["fill","stroke","stroke-width","stroke-dasharray","stroke-linecap","stroke-linejoin","fill-opacity","stroke-opacity","opacity","color","font-family","font-size","font-weight","font-style","text-anchor","dominant-baseline","letter-spacing"];
async function svgToPng(src,widthPx){
  let svg;
  if(typeof src==="string"){const t=document.createElement("div");t.innerHTML=src;svg=t.querySelector("svg");if(!svg)throw new Error("no svg")}else svg=src;
  const root=document.documentElement,prev=root.getAttribute("data-theme");
  const host=document.createElement("div");host.style.cssText="position:fixed;left:-99999px;top:0;width:900px;color:#10252F;background:#fff";
  const clone=svg.cloneNode(true);host.appendChild(clone);
  root.setAttribute("data-theme","light");document.body.appendChild(host);
  let xml,w,h;
  try{
    const vb=(clone.getAttribute("viewBox")||"").split(/[\s,]+/).map(Number);
    w=vb.length===4?vb[2]:(parseFloat(clone.getAttribute("width"))||300);h=vb.length===4?vb[3]:(parseFloat(clone.getAttribute("height"))||150);
    const els=[clone].concat(Array.from(clone.querySelectorAll("*")));
    const orig=[svg].concat(Array.from(svg.querySelectorAll("*")));
    els.forEach(el=>{
      const cs=getComputedStyle(el);let st=el.getAttribute("style")||"";
      st=st.replace(/var\([^)]*\)/g,"");
      SVGPROPS.forEach(p=>{const v=cs.getPropertyValue(p);if(v)st+=";"+p+":"+v});
      el.setAttribute("style",st);
    });
    clone.setAttribute("xmlns","http://www.w3.org/2000/svg");clone.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink");
    clone.setAttribute("width",w);clone.setAttribute("height",h);
    xml=new XMLSerializer().serializeToString(clone);
  }finally{host.remove();if(prev==null)root.removeAttribute("data-theme");else root.setAttribute("data-theme",prev)}
  const outW=widthPx||w,sc=outW/w,outH=h*sc,k=2;
  const im=await loadImg("data:image/svg+xml;charset=utf-8,"+encodeURIComponent(xml));
  const c=document.createElement("canvas");c.width=Math.round(outW*k);c.height=Math.round(outH*k);
  const g=c.getContext("2d");g.fillStyle="#fff";g.fillRect(0,0,c.width,c.height);g.drawImage(im,0,0,c.width,c.height);
  return{dataUrl:c.toDataURL("image/png"),w:Math.round(outW),h:Math.round(outH)};
}

/* ================= DOCX ================= */
const NS='xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"';
function dxRuns(text,o){
  o=o||{};
  return parse(text,{b:o.b,i:o.i}).map(r=>{
    if(r.br)return "<w:r><w:br/></w:r>";
    let pr="";if(r.b)pr+="<w:b/>";if(r.i)pr+="<w:i/>";if(o.color)pr+=`<w:color w:val="${o.color}"/>`;if(o.sz)pr+=`<w:sz w:val="${o.sz}"/><w:szCs w:val="${o.sz}"/>`;
    if(r.sub)pr+='<w:vertAlign w:val="subscript"/>';else if(r.sup)pr+='<w:vertAlign w:val="superscript"/>';
    return `<w:r>${pr?"<w:rPr>"+pr+"</w:rPr>":""}<w:t xml:space="preserve">${esc(r.t)}</w:t></w:r>`;
  }).join("");
}
function dxP(text,o){
  o=o||{};let pr="";
  if(o.style)pr+=`<w:pStyle w:val="${o.style}"/>`;if(o.keep)pr+="<w:keepNext/>";
  if(o.num)pr+=`<w:numPr><w:ilvl w:val="0"/><w:numId w:val="${o.num}"/></w:numPr>`;
  if(o.top)pr+=`<w:pBdr><w:top w:val="single" w:sz="6" w:space="2" w:color="444444"/></w:pBdr>`;
  if(o.bottom)pr+=`<w:pBdr><w:bottom w:val="single" w:sz="8" w:space="4" w:color="${TEAL}"/></w:pBdr>`;
  if(o.before!=null||o.after!=null)pr+=`<w:spacing w:before="${o.before||0}" w:after="${o.after==null?100:o.after}"/>`;
  if(o.ind)pr+=`<w:ind w:left="${o.ind}"/>`;
  if(o.align)pr+=`<w:jc w:val="${o.align==="center"?"center":o.align==="right"?"right":"left"}"/>`;
  return `<w:p>${pr?"<w:pPr>"+pr+"</w:pPr>":""}${text===""?"":dxRuns(text,o)}</w:p>`;
}
function dxCell(w,inner,o){
  o=o||{};
  let pr=`<w:tcW w:w="${w}" w:type="dxa"/>`;
  if(o.span)pr+=`<w:gridSpan w:val="${o.span}"/>`;
  if(o.borders)pr+=o.borders;
  if(o.fill)pr+=`<w:shd w:val="clear" w:color="auto" w:fill="${o.fill}"/>`;
  pr+=`<w:tcMar><w:top w:w="${o.mt==null?60:o.mt}" w:type="dxa"/><w:left w:w="${o.ml==null?90:o.ml}" w:type="dxa"/><w:bottom w:w="${o.mt==null?60:o.mt}" w:type="dxa"/><w:right w:w="90" w:type="dxa"/></w:tcMar>`;
  return `<w:tc><w:tcPr>${pr}</w:tcPr>${inner||dxP("")}</w:tc>`;
}
const bd=(c,sz)=>["top","left","bottom","right"].map(s=>`<w:${s} w:val="single" w:sz="${sz||4}" w:color="${c}"/>`).join("");
function dxTbl(widths,rowsXml,o){
  o=o||{};const tot=widths.reduce((a,b)=>a+b,0);
  const borders=o.noBorder?'<w:tblBorders><w:top w:val="nil"/><w:left w:val="nil"/><w:bottom w:val="nil"/><w:right w:val="nil"/><w:insideH w:val="nil"/><w:insideV w:val="nil"/></w:tblBorders>':`<w:tblBorders>${bd(gridC())}<w:insideH w:val="single" w:sz="4" w:color="${gridC()}"/><w:insideV w:val="single" w:sz="4" w:color="${gridC()}"/></w:tblBorders>`;
  return `<w:tbl><w:tblPr><w:tblW w:w="${tot}" w:type="dxa"/>${borders}<w:tblLayout w:type="fixed"/></w:tblPr><w:tblGrid>${widths.map(w=>`<w:gridCol w:w="${w}"/>`).join("")}</w:tblGrid>${rowsXml}</w:tbl>${dxP("",{after:80})}`;
}
function scaleW(rel,total){const s=rel.reduce((a,b)=>a+b,0)||1;const w=rel.map(r=>Math.max(300,Math.floor(r/s*total)));w[w.length-1]+=total-w.reduce((a,b)=>a+b,0);return w}
async function toDocx(model){
  CAM=model.cam||null;if(CAM&&!model.font)model.font="Arial";
  const land=model.orientation==="landscape",PW=land?16838:11906,PH=land?11906:16838,M=1134,CW=PW-2*M;
  const media=[],rels=[];let numId=100;const nums=[];
  async function imgXml(b,W){
    const d=dataBytes(b.dataUrl);if(!d)return "";
    const ext=/jpe?g/.test(d.mime)?"jpeg":"png",id="rIdImg"+(media.length+1),name="image"+(media.length+1)+"."+(ext==="jpeg"?"jpg":"png");
    media.push({name,bytes:d.bytes,ext});rels.push(`<Relationship Id="${id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${name}"/>`);
    const ind=b.indent||0,nat=(b.w||600)*9525,maxW=Math.min(W*635*((b.widthPct||100)/100),(W-ind)*635);let cx=Math.min(nat,maxW);if(b.widthPct)cx=maxW;const cy=Math.round(cx*((b.h||400)/(b.w||600)));cx=Math.round(cx);
    const pic=`<w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${cx}" cy="${cy}"/><wp:docPr id="${media.length}" name="${name}"/><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="${media.length}" name="${name}"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${id}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r>`;
    return `<w:p><w:pPr><w:keepNext/><w:spacing w:before="80" w:after="120"/>${b.align==="left"?(ind?`<w:ind w:left="${ind}"/>`:""):'<w:jc w:val="center"/>'}</w:pPr>${pic}</w:p>`+(b.caption?dxP(b.caption,{i:1,sz:18,color:"555555",align:"center",after:160}):"");
  }
  async function blk(b,W){
    switch(b.t){
      case "h":return dxP(b.text,{style:"Heading"+(b.l||1),keep:1});
      case "p":return dxP(b.text,{keep:b.keep,b:b.bold,i:b.italic,sz:b.size?Math.round(b.size*2):0,color:b.color&&String(b.color).replace("#",""),align:b.align,after:b.after==null?100:b.after,before:b.before,ind:b.indent});
      case "q":{const lv=b.lvl||0,left=567*(lv+1),lab=b.label==null?"":String(b.label);
        const tabs=`<w:tabs><w:tab w:val="left" w:pos="${left}"/>${b.marks!=null?`<w:tab w:val="right" w:pos="${W}"/>`:""}</w:tabs>`;
        const ind=b.cont?`<w:ind w:left="${left}"/>`:`<w:ind w:left="${left}" w:hanging="567"/>`;
        return `<w:p><w:pPr>${b.nokeep?"":"<w:keepNext/>"}${tabs}<w:spacing w:before="${b.before==null?(lv?100:260):b.before}" w:after="${b.after==null?60:b.after}"/>${ind}</w:pPr>${lab?dxRuns("**"+lab+"**")+"<w:r><w:tab/></w:r>":""}${dxRuns(b.text||"")}${b.marks!=null?"<w:r><w:tab/></w:r>"+dxRuns("**["+b.marks+"]**"):""}</w:p>`}
      case "ul":return (b.items||[]).map(t=>dxP(t,{num:1,after:40})).join("")+dxP("",{after:60});
      case "ol":{const id=numId++;nums.push(id);return (b.items||[]).map(t=>dxP(t,{num:id,after:40})).join("")+dxP("",{after:60})}
      case "pb":return '<w:p><w:r><w:br w:type="page"/></w:r></w:p>';
      case "band":return `<w:p><w:pPr><w:keepNext/><w:shd w:val="clear" w:color="auto" w:fill="${b.fill||TEAL}"/><w:spacing w:before="${b.before==null?160:b.before}" w:after="${b.after==null?120:b.after}"/><w:ind w:left="60" w:right="60"/></w:pPr>${dxRuns(b.text,{b:1,color:b.color||"FFFFFF",sz:Math.round((b.size||13)*2)})}</w:p>`;
      case "lines":{let o="";const ln=b.n||3,ind=b.indent||0;for(let k=0;k<ln;k++){const mk=b.marks!=null&&k===ln-1;o+=`<w:p><w:pPr><w:keepNext w:val="${mk?0:1}"/><w:keepLines/><w:tabs><w:tab w:val="right" w:leader="${b.leader||"dot"}" w:pos="${mk?W-620:W}"/>${mk?`<w:tab w:val="right" w:pos="${W}"/>`:""}</w:tabs><w:spacing w:before="${b.gap==null?280:b.gap}" w:after="0"/>${ind?`<w:ind w:left="${ind}"/>`:""}</w:pPr><w:r><w:tab/></w:r>${mk?"<w:r><w:tab/></w:r>"+dxRuns("**["+b.marks+"]**"):""}</w:p>`}return o}
      case "img":return await imgXml(b,W);
      case "kv":{const w=scaleW([30,70],W);return dxTbl(w,(b.pairs||[]).map(([k,v])=>`<w:tr><w:trPr><w:cantSplit/></w:trPr>${dxCell(w[0],dxP(k,{b:1,after:0}),{fill:headF()})}${dxCell(w[1],dxP(v,{after:0}))}</w:tr>`).join(""))}
      case "box":{const t0=TONE[b.tone||"info"]||TONE.info,t={f:b.fill||t0.f,b:b.bar||t0.b};let inner="";if(b.title)inner+=dxP(b.title,{b:1,after:60,color:t.b});if(b.text)inner+=dxP(b.text,{after:60});(b.items||[]).forEach(x=>inner+=dxP("•  "+x,{after:40}));
        return dxTbl([W],`<w:tr><w:trPr><w:cantSplit/></w:trPr>${dxCell(W,inner,{fill:t.f,ml:160,borders:`<w:tcBorders><w:top w:val="nil"/><w:bottom w:val="nil"/><w:right w:val="nil"/><w:left w:val="single" w:sz="36" w:color="${t.b}"/></w:tcBorders>`})}</w:tr>`,{noBorder:1})}
      case "sig":{const n=(b.labels||[]).length||1,w=scaleW(new Array(n).fill(1),W);return dxP("",{after:300})+dxTbl(w,`<w:tr>${(b.labels||[""]).map((l,k)=>dxCell(w[k],dxP("",{after:400})+dxP(l,{top:1,sz:18,color:"444444",after:0}),{ml:0})).join("")}</w:tr>`,{noBorder:1})}
      case "cols":{const w=scaleW([1,1],W),cells=[];for(let k=0;k<2;k++){let inner="";for(const x of (b.cols[k]||[]))inner+=await blk(x,Math.floor(W/2)-200);cells.push(dxCell(w[k],inner+dxP("",{after:0})))}return dxTbl(w,`<w:tr>${cells.join("")}</w:tr>`,{noBorder:1})}
      case "table":{
        const nc=(b.head||b.rows[0]||[]).length||1,w=scaleW(b.widths&&b.widths.length===nc?b.widths:new Array(nc).fill(1),W),sz=Math.round((b.fontSize||9)*2);let x="";
        const tones={};(b.tone||[]).forEach(([r,t])=>tones[r]=ROWT[t]);
        const cellP=(c,k,o)=>Array.isArray(c)?c.map(t=>/^§/.test(t)?dxP(t.slice(1),Object.assign({},o,{b:1,color:b.accent||TEAL,after:20})):/^• /.test(t)?dxP(t.slice(2),Object.assign({num:1,after:30},o)):dxP(t,Object.assign({after:30},o))).join(""):dxP(c==null?"":c,Object.assign({after:0},o));
        const hf=b.headFill||headF(),hc=b.headColor||headC(),bd2=b.gridColor?`<w:tcBorders>${bd(b.gridColor)}</w:tcBorders>`:"";
        if(b.head)x+=`<w:tr><w:trPr><w:cantSplit/><w:tblHeader/></w:trPr>${b.head.map((h,k)=>dxCell(w[k],dxP(h,{b:1,sz:b.headSize||sz,after:0,color:hc,align:b.headAlign}),{fill:hf,borders:bd2,mt:b.headPad})).join("")}</w:tr>`;
        b.rows.forEach((r,ri)=>{const fill=tones[ri]||b.rowFill||(b.zebra&&(ri+(b.zebraOdd?1:0))%2?(b.zebraFill||ZEBRA):"");x+=`<w:tr><w:trPr>${b.splitRows?"":"<w:cantSplit/>"}</w:trPr>${r.map((c,k)=>dxCell(w[k],cellP(c,k,{sz,b:b.firstColBold&&k===0?1:0,align:b.colAlign&&b.colAlign[k]}),{fill,borders:bd2})).join("")}</w:tr>`});
        return dxTbl(w,x)}
      default:return "";
    }
  }
  let body="";
  if(model.title)body+=dxP(model.title,{style:"Title"});
  if(model.subtitle)body+=dxP(model.subtitle,{style:"Subtitle"});
  for(const b of model.blocks||[])body+=await blk(b,CW);
  const sect=`<w:sectPr>${CAM?'<w:headerReference w:type="default" r:id="rIdHead"/><w:headerReference w:type="first" r:id="rIdHead0"/><w:footerReference w:type="first" r:id="rIdFoot0"/>':""}<w:footerReference w:type="default" r:id="rIdFoot"/><w:pgSz w:w="${PW}" w:h="${PH}"${land?' w:orient="landscape"':""}/><w:pgMar w:top="${M}" w:right="${M}" w:bottom="${M}" w:left="${M}" w:header="567" w:footer="567" w:gutter="0"/>${CAM?"<w:titlePg/>":""}</w:sectPr>`;
  const doc=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document ${NS}><w:body>${body}${sect}</w:body></w:document>`;
  const fld=(c,t)=>`<w:r><w:rPr><w:sz w:val="16"/><w:color w:val="666666"/></w:rPr><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:instrText xml:space="preserve"> ${c} </w:instrText></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:rPr><w:sz w:val="16"/><w:color w:val="666666"/></w:rPr><w:t>${t}</w:t></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:fldChar w:fldCharType="end"/></w:r>`;
  const tr=t=>`<w:r><w:rPr><w:sz w:val="16"/><w:color w:val="666666"/></w:rPr><w:t xml:space="preserve">${esc(t)}</w:t></w:r>`;
  const XH='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
  const camFld=(t)=>`<w:r><w:rPr><w:sz w:val="20"/></w:rPr><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:rPr><w:sz w:val="20"/></w:rPr><w:instrText xml:space="preserve"> ${t} </w:instrText></w:r><w:r><w:rPr><w:sz w:val="20"/></w:rPr><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:rPr><w:sz w:val="20"/></w:rPr><w:t>1</w:t></w:r><w:r><w:rPr><w:sz w:val="20"/></w:rPr><w:fldChar w:fldCharType="end"/></w:r>`;
  const head=CAM?`${XH}<w:hdr ${NS}><w:p><w:pPr><w:jc w:val="center"/></w:pPr>${camFld("PAGE")}</w:p></w:hdr>`:"";
  const head0=CAM?`${XH}<w:hdr ${NS}><w:p/></w:hdr>`:"",foot0=CAM?`${XH}<w:ftr ${NS}><w:p/></w:ftr>`:"";
  const ctr=CAM?Math.round(CW/2):0,cr=r=>`<w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:t xml:space="preserve">${esc(r)}</w:t></w:r>`;
  const turn=CAM?`<w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:instrText xml:space="preserve"> IF </w:instrText></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:instrText xml:space="preserve"> PAGE </w:instrText></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:t>1</w:t></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:fldChar w:fldCharType="end"/></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:instrText xml:space="preserve"> &lt; </w:instrText></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:instrText xml:space="preserve"> NUMPAGES </w:instrText></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:t>2</w:t></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:fldChar w:fldCharType="end"/></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:instrText xml:space="preserve"> "[Turn over" "" </w:instrText></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:t>[Turn over</w:t></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:fldChar w:fldCharType="end"/></w:r>`:"";
  const foot=CAM?`${XH}<w:ftr ${NS}><w:p><w:pPr><w:tabs><w:tab w:val="center" w:pos="${ctr}"/><w:tab w:val="right" w:pos="${CW}"/></w:tabs></w:pPr>${cr(CAM.left||"")}<w:r><w:tab/></w:r>${cr(CAM.mid||"")}<w:r><w:tab/></w:r>${turn}</w:p></w:ftr>`:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:ftr ${NS}><w:p><w:pPr><w:pBdr><w:top w:val="single" w:sz="4" w:space="4" w:color="BFC9C6"/></w:pBdr><w:tabs><w:tab w:val="right" w:pos="${CW}"/></w:tabs></w:pPr>${tr(model.footer||model.title||"")}<w:r><w:tab/></w:r>${tr("Page ")}${fld("PAGE","1")}${tr(" of ")}${fld("NUMPAGES","1")}</w:p></w:ftr>`;
  const lvl=(fmt,txt)=>`<w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="${fmt}"/><w:lvlText w:val="${txt}"/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="500" w:hanging="320"/></w:pPr></w:lvl>`;
  const numbering=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:numbering ${NS}><w:abstractNum w:abstractNumId="0"><w:multiLevelType w:val="singleLevel"/>${lvl("bullet","•")}</w:abstractNum><w:abstractNum w:abstractNumId="1"><w:multiLevelType w:val="singleLevel"/>${lvl("decimal","%1.")}</w:abstractNum><w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>${nums.map(n=>`<w:num w:numId="${n}"><w:abstractNumId w:val="1"/><w:lvlOverride w:ilvl="0"><w:startOverride w:val="1"/></w:lvlOverride></w:num>`).join("")}</w:numbering>`;
  const hs=(id,n,sz,before)=>`<w:style w:type="paragraph" w:styleId="${id}"><w:name w:val="${n}"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="${before}" w:after="100"/></w:pPr><w:rPr><w:b/><w:color w:val="${headC()}"/><w:sz w:val="${sz}"/><w:szCs w:val="${sz}"/></w:rPr></w:style>`;
  const styles=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles ${NS}><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="${model.font||"Calibri"}" w:hAnsi="${model.font||"Calibri"}" w:cs="${model.font||"Calibri"}" w:eastAsia="${model.font||"Calibri"}"/><w:sz w:val="22"/><w:szCs w:val="22"/><w:lang w:val="en-GB"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="100" w:line="264" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>${hs("Heading1","heading 1",32,320)}${hs("Heading2","heading 2",26,240)}${hs("Heading3","heading 3",23,200)}<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="12" w:space="4" w:color="0E7C66"/></w:pBdr><w:spacing w:after="120"/></w:pPr><w:rPr><w:b/><w:color w:val="${TEAL}"/><w:sz w:val="44"/><w:szCs w:val="44"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Subtitle"><w:name w:val="Subtitle"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:after="200"/></w:pPr><w:rPr><w:color w:val="555555"/><w:sz w:val="26"/><w:szCs w:val="26"/></w:rPr></w:style></w:styles>`;
  const ct=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Default Extension="jpg" ContentType="image/jpeg"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/><Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>${CAM?'<Override PartName="/word/footer0.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/><Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/><Override PartName="/word/header0.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/>':""}<Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/></Types>`;
  const R="http://schemas.openxmlformats.org/officeDocument/2006/relationships";
  const zip=new JSZip();
  zip.file("[Content_Types].xml",ct);
  zip.file("_rels/.rels",`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="${R}/officeDocument" Target="word/document.xml"/></Relationships>`);
  zip.file("word/document.xml",doc);zip.file("word/styles.xml",styles);zip.file("word/numbering.xml",numbering);zip.file("word/footer1.xml",foot);if(CAM){zip.file("word/footer0.xml",foot0);zip.file("word/header1.xml",head);zip.file("word/header0.xml",head0)}
  zip.file("word/settings.xml",`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:settings ${NS}><w:defaultTabStop w:val="720"/></w:settings>`);
  zip.file("word/_rels/document.xml.rels",`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rIdSt" Type="${R}/styles" Target="styles.xml"/><Relationship Id="rIdNum" Type="${R}/numbering" Target="numbering.xml"/><Relationship Id="rIdSet" Type="${R}/settings" Target="settings.xml"/><Relationship Id="rIdFoot" Type="${R}/footer" Target="footer1.xml"/>${CAM?`<Relationship Id="rIdFoot0" Type="${R}/footer" Target="footer0.xml"/><Relationship Id="rIdHead" Type="${R}/header" Target="header1.xml"/><Relationship Id="rIdHead0" Type="${R}/header" Target="header0.xml"/>`:""}${rels.join("")}</Relationships>`);
  media.forEach(m=>zip.file("word/media/"+m.name,m.bytes));
  return zip.generateAsync({type:"blob",compression:"DEFLATE",mimeType:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"});
}

/* ================= PDF ================= */
const WR="278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584,350,556,350,222,556,333,1000,556,556,333,1000,667,333,1000,350,611,350,350,222,222,333,333,350,556,1000,333,1000,500,333,944,350,500,667,278,333,556,556,556,556,260,556,333,737,370,556,584,333,737,333,400,584,333,333,333,556,537,278,333,333,365,556,834,834,834,611,667,667,667,667,667,667,1000,722,667,667,667,667,278,278,278,278,722,722,778,778,778,778,778,584,778,722,722,722,722,667,667,611,556,556,556,556,556,556,889,500,556,556,556,556,278,278,278,278,556,556,556,556,556,556,556,584,611,556,556,556,556,500,556,500".split(",").map(Number);
const WB="278,333,474,556,556,889,722,238,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,333,333,584,584,584,611,975,722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,667,778,722,667,611,722,667,944,667,667,611,333,278,333,584,556,333,556,611,556,611,556,333,611,611,278,278,556,278,889,611,611,611,611,389,556,333,611,556,778,556,556,500,389,280,389,584,350,556,350,278,556,500,1000,556,556,333,1000,667,333,1000,350,611,350,350,278,278,500,500,350,556,1000,333,1000,556,333,944,350,500,667,278,333,556,556,556,556,280,556,333,737,370,556,584,333,737,333,400,584,333,333,333,611,556,278,333,333,365,556,834,834,834,611,722,722,722,722,722,722,1000,722,667,667,667,667,278,278,278,278,722,722,778,778,778,778,778,584,778,722,722,722,722,667,667,611,556,556,556,556,556,556,889,556,556,556,556,556,278,278,278,278,611,611,611,611,611,611,611,584,611,611,611,611,611,556,611,556".split(",").map(Number);
const CP={0x20AC:128,0x201A:130,0x0192:131,0x201E:132,0x2026:133,0x2020:134,0x2021:135,0x02C6:136,0x2030:137,0x0160:138,0x2039:139,0x0152:140,0x017D:142,0x2018:145,0x2019:146,0x201C:147,0x201D:148,0x2022:149,0x2013:150,0x2014:151,0x02DC:152,0x2122:153,0x0161:154,0x203A:155,0x0153:156,0x017E:158,0x0178:159};
const REPL={"→":"->","←":"<-","↔":"<->","⇌":"<=>","⇒":"=>","≥":">=","≤":"<=","≠":"!=","≈":"~","−":"-","★":"*","✓":"v","✔":"v","✗":"x","✘":"x","☐":"[ ]","☑":"[x]","☒":"[x]","α":"alpha","β":"beta","γ":"gamma","Δ":"Delta","δ":"delta","λ":"lambda","μ":"µ","π":"pi","Σ":"Sum","ρ":"rho","θ":"theta","ω":"omega","Ω":"ohm","σ":"sigma","∞":"inf","≡":"=","∆":"Delta","∑":"Sum","′":"'","√":"sqrt","→":"->"," ":" "," ":" "," ":" ","−":"-"};
const SUBSET={"₀":"0","₁":"1","₂":"2","₃":"3","₄":"4","₅":"5","₆":"6","₇":"7","₈":"8","₉":"9","₊":"+","₋":"-"},SUPSET={"⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","⁺":"+","⁻":"-"};
function pdfRuns(text,base){
  const out=[];
  parse(text,base).forEach(r=>{
    if(r.br){out.push(r);return}
    let cur="",mode=null;const push=()=>{if(cur)out.push(Object.assign({},r,{t:cur,sub:mode==="sub"||(r.sub&&!mode),sup:mode==="sup"||(r.sup&&!mode)}));cur=""};
    for(const ch of r.t){const m=SUBSET[ch]?"sub":SUPSET[ch]?"sup":null,c=m==="sub"?SUBSET[ch]:m==="sup"?SUPSET[ch]:ch;if(m!==mode){push();mode=m}cur+=c}
    push();
  });
  return out;
}
const toCode=ch=>{const c=ch.codePointAt(0);if(c>=32&&c<127)return c;if(c>=160&&c<=255)return c;if(CP[c])return CP[c];if(c===9)return 32;return 63};
function winStr(s){let o="";for(const ch of String(s)){const t=REPL[ch];if(t!=null)o+=t;else o+=ch}return o}
const cw=(code,bold)=>((bold?WB:WR)[code-32])||556;
function strW(s,bold,size){let w=0;for(const ch of winStr(s))w+=cw(toCode(ch),bold);return w*size/1000}
function pdfLit(s){let o="(";for(const ch of winStr(s)){const c=toCode(ch);if(c===40||c===41||c===92)o+="\\"+String.fromCharCode(c);else if(c<32||c>126)o+="\\"+("00"+c.toString(8)).slice(-3);else o+=String.fromCharCode(c)}return o+")"}
const rgb=h=>{h=String(h||"000000").replace("#","");return [0,2,4].map(k=>(parseInt(h.substr(k,2),16)/255).toFixed(3)).join(" ")};
const FONT=(b,i)=>b?(i?"F4":"F2"):(i?"F3":"F1");

/* layout runs into lines of segments */
function layout(text,width,o){
  o=o||{};const size=o.size||10,runs=pdfRuns(text,{b:o.bold,i:o.italic}),lines=[];
  let cur={segs:[],w:0,mx:size};const flush=()=>{lines.push(cur);cur={segs:[],w:0,mx:size}};
  const add=(t,r)=>{const sz=(r.sub||r.sup)?size*0.7:size,w=strW(t,r.b,sz);
    if(cur.segs.length&&cur.segs[cur.segs.length-1].r===r&&cur.segs[cur.segs.length-1].sz===sz){cur.segs[cur.segs.length-1].t+=t;cur.segs[cur.segs.length-1].w+=w}
    else cur.segs.push({t,w,r,sz});cur.w+=w};
  runs.forEach(r=>{
    if(r.br){flush();return}
    r.t.split(/(\s+)/).forEach(tok=>{
      if(!tok)return;const sz=(r.sub||r.sup)?size*0.7:size,w=strW(tok,r.b,sz);
      if(/^\s+$/.test(tok)){if(cur.segs.length)add(" ",r);return}
      if(cur.w+w>width&&cur.segs.length){while(cur.segs.length&&/^\s*$/.test(cur.segs[cur.segs.length-1].t))cur.segs.pop();flush()}
      if(w>width){let piece="";for(const ch of tok){if(strW(piece+ch,r.b,sz)>width&&piece){add(piece,r);flush();piece=""}piece+=ch}if(piece)add(piece,r)}else add(tok,r);
    });
  });
  if(cur.segs.length||!lines.length)flush();
  lines.forEach(l=>{while(l.segs.length&&/^\s+$/.test(l.segs[l.segs.length-1].t)){l.w-=l.segs[l.segs.length-1].w;l.segs.pop()}});
  return lines;
}
async function jpegOf(dataUrl){
  const im=await loadImg(dataUrl),c=document.createElement("canvas");c.width=im.naturalWidth||im.width;c.height=im.naturalHeight||im.height;
  const g=c.getContext("2d");g.fillStyle="#fff";g.fillRect(0,0,c.width,c.height);g.drawImage(im,0,0);
  return{bytes:dataBytes(c.toDataURL("image/jpeg",0.92)).bytes,pw:c.width,ph:c.height};
}
async function pdfImg(dataUrl){
  try{const im=await loadImg(dataUrl),c=document.createElement("canvas");c.width=im.naturalWidth||im.width;c.height=im.naturalHeight||im.height;
    const g=c.getContext("2d");g.fillStyle="#fff";g.fillRect(0,0,c.width,c.height);g.drawImage(im,0,0);
    const px=g.getImageData(0,0,c.width,c.height).data,rgb3=new Uint8Array(c.width*c.height*3);
    for(let i=0,k=0;i<px.length;i+=4){rgb3[k++]=px[i];rgb3[k++]=px[i+1];rgb3[k++]=px[i+2]}
    const z=await deflate(rgb3);if(z)return{bytes:z,pw:c.width,ph:c.height,flate:true}}catch(e){}
  return jpegOf(dataUrl);
}
async function deflate(u8){
  if(typeof CompressionStream==="undefined")return null;
  try{const cs=new CompressionStream("deflate"),st=new Blob([u8]).stream().pipeThrough(cs);return new Uint8Array(await new Response(st).arrayBuffer())}catch(e){return null}
}
async function toPdf(model){
  CAM=model.cam||null;
  const land=model.orientation==="landscape",PW=land?841.89:595.28,PH=land?595.28:841.89,MX=48,MT=50,MB=46,CW=PW-2*MX;
  const pages=[],images=[];let pg,cy;
  const newPage=()=>{pg={ops:[],img:{}};pages.push(pg);cy=MT};
  const room=()=>PH-MB-cy;
  const ensure=h=>{if(h>room()&&cy>MT+1)newPage()};
  const Y=v=>(PH-v).toFixed(2);
  const rect=(x,y,w,h,fill,stroke,lw)=>{pg.ops.push(`${fill?rgb(fill)+" rg ":""}${stroke?rgb(stroke)+" RG "+(lw||0.5)+" w ":""}${x.toFixed(2)} ${Y(y+h)} ${w.toFixed(2)} ${h.toFixed(2)} re ${fill&&stroke?"B":fill?"f":"S"}`)};
  const line=(x1,y1,x2,y2,c,lw)=>pg.ops.push(`${rgb(c)} RG ${lw||0.5} w ${x1.toFixed(2)} ${Y(y1)} m ${x2.toFixed(2)} ${Y(y2)} l S`);
  function drawLine(l,x,top,width,o){
    const base=top+l.mx*0.95;let sx=x;if(o.align==="center")sx=x+(width-l.w)/2;else if(o.align==="right")sx=x+width-l.w;
    l.segs.forEach(s=>{const rise=s.r.sub?-o.size*0.18:s.r.sup?o.size*0.38:0;
      pg.ops.push(`BT /${FONT(s.r.b,s.r.i)} ${s.sz.toFixed(2)} Tf ${rgb(o.color)} rg ${rise?rise.toFixed(2)+" Ts ":""}${sx.toFixed(2)} ${Y(base)} Td ${pdfLit(s.t)} Tj ${rise?"0 Ts ":""}ET`);sx+=s.w});
  }
  const LH=1.32;
  function para(text,x,width,o){
    o=Object.assign({size:10,color:"10252F"},o);const ls=layout(text,width,o),lh=o.size*LH;
    for(const l of ls){ensure(lh);drawLine(l,x,cy,width,o);cy+=lh}
    return ls.length;
  }
  function heading(text,lvl){
    const size=[0,17,13.5,11.5][lvl]||11.5;ensure(size*LH*2+8);cy+=lvl===1?10:7;
    para(text,MX,CW,{size,bold:true,color:CAM?"000000":TEAL});
    if(lvl===1&&!CAM){line(MX,cy+1,MX+CW,cy+1,"0E7C66",0.8);cy+=5}else if(lvl===1)cy+=3;else cy+=2;
  }
  function list(items,ordered,x,width){
    items.forEach((t,k)=>{const lab=ordered?(k+1)+".":"•",ind=ordered?18:14,ls=layout(t,width-ind,{size:10}),lh=10*LH;
      ls.forEach((l,j)=>{ensure(lh);if(j===0)drawLine(layout(lab,ind,{size:10})[0],x+2,cy,ind,{size:10,color:"10252F"});drawLine(l,x+ind,cy,width-ind,{size:10,color:"10252F"});cy+=lh});cy+=2});cy+=4;
  }
  async function image(b,x,width){
    const j=await pdfImg(b.dataUrl),id=images.length;images.push(j);const ind=(b.indent||0)/20;
    const nat=(b.w||j.pw/2)*0.75;let w=b.widthPct?width*b.widthPct/100:Math.min(nat,width),h=w*j.ph/j.pw;if(w>width-ind){w=width-ind;h=w*j.ph/j.pw}
    const maxH=PH-MT-MB-24;if(h>maxH){w*=maxH/h;h=maxH}
    ensure(h+(b.caption?16:4));pg.img["Im"+id]=1;
    const ix=b.align==="left"?x+ind:x+(width-w)/2;pg.ops.push(`q ${w.toFixed(2)} 0 0 ${h.toFixed(2)} ${ix.toFixed(2)} ${Y(cy+h)} cm /Im${id} Do Q`);cy+=h+4;
    if(b.caption){para(b.caption,x,width,{size:8.5,italic:true,align:"center",color:"555555"});cy+=4}
  }
  function table(b,x,width){
    const nc=(b.head||b.rows[0]||[]).length||1,rel=b.widths&&b.widths.length===nc?b.widths:new Array(nc).fill(1),sr=rel.reduce((a,c)=>a+c,0),cws=rel.map(r=>r/sr*width),fs=b.fontSize||8.5,pad=4,lh=fs*LH,tones={};
    (b.tone||[]).forEach(([r,t])=>tones[r]=ROWT[t]);
    const mk=(cells,bold)=>cells.map((c,k)=>{
      if(!Array.isArray(c))return layout(c==null?"":String(c),cws[k]-2*pad,{size:fs,bold:bold||(b.firstColBold&&k===0)});
      let out=[];c.forEach(t=>{const hd=/^§/.test(t),bl=/^• /.test(t),ls=layout(hd?t.slice(1):bl?t.slice(2):t,cws[k]-2*pad-(bl?10:0),{size:fs,bold:bold||hd});ls.forEach((l,j)=>{l.ind=bl?10:0;l.bul=bl&&j===0;l.hd=hd;out.push(l)})});return out.length?out:layout("",10,{size:fs})});
    const hdr=b.head?mk(b.head,true):null;
    const rowH=ls=>Math.max(...ls.map(a=>a.length))*lh+2*pad-2;
    const draw=(ls,fill,bold)=>{
      const h=rowH(ls);let cx=x;
      ls.forEach((cl,k)=>{rect(cx,cy,cws[k],h,fill||null,b.gridColor||gridC(),0.5);cl.forEach((l,j)=>{const ind=l.ind||0,col=bold?(b.headColor||headC()):l.hd?(b.accent||TEAL):"10252F";if(l.bul)drawLine(layout("•",8,{size:fs})[0],cx+pad,cy+pad-1+j*lh,8,{size:fs,color:col});drawLine(l,cx+pad+ind,cy+pad-1+j*lh,cws[k]-2*pad-ind,{size:fs,color:col,align:bold&&b.headAlign==="center"?"center":undefined})});cx+=cws[k]});
      cy+=h;
    };
    const HF=b.headFill||headF();
    if(hdr){ensure(rowH(hdr)+rowH(mk(b.rows[0]||[""]))*(b.rows.length?1:0));draw(hdr,HF,true)}
    b.rows.forEach((r,ri)=>{
      const ls=mk(r),h=rowH(ls);
      if(h>room()){newPage();if(hdr)draw(hdr,HF,true)}
      draw(ls,tones[ri]||b.rowFill||(b.zebra&&(ri+(b.zebraOdd?1:0))%2?(b.zebraFill||ZEBRA):null));
    });
    cy+=8;
  }
  async function blk(b,x,width){
    switch(b.t){
      case "h":heading(b.text,b.l||1);break;
      case "p":{const pi=(b.indent||0)/20;if(b.before)cy+=b.before/20;para(b.text,x+pi,width-pi,{size:b.size||10,bold:b.bold,italic:b.italic,color:b.color||"10252F",align:b.align});cy+=b.after==null?5:b.after/20;break}
      case "q":{const lv=b.lvl||0,left=28.35*(lv+1),lab=b.label==null?"":String(b.label),sz=10.5,lh=sz*LH,mw=b.marks!=null?30:0,ls=layout(b.text||"",width-left-mw,{size:sz});
        cy+=b.before==null?(lv?5:13):b.before/20;ensure(Math.max(lh*Math.min(ls.length,3)+4,b.need||0));
        ls.forEach((l,j)=>{ensure(lh);if(j===0&&lab)drawLine(layout(lab,left,{size:sz,bold:true})[0],x+(b.cont?left:left-28.35),cy,left,{size:sz,color:"10252F"});drawLine(l,x+left,cy,width-left-mw,{size:sz,color:"10252F"});
          if(j===ls.length-1&&b.marks!=null)drawLine(layout("["+b.marks+"]",40,{size:sz,bold:true})[0],x+width-strW("["+b.marks+"]",true,sz),cy,40,{size:sz,color:"10252F"});cy+=lh});
        cy+=3;break}
      case "ul":list(b.items||[],false,x,width);break;
      case "ol":list(b.items||[],true,x,width);break;
      case "pb":newPage();break;
      case "band":{const sz=b.size||13,h=sz*LH+10;ensure(h+10);cy+=b.before==null?8:b.before/20*1;rect(x,cy,width,h,b.fill||TEAL,null);drawLine(layout(b.text,width-12,{size:sz,bold:true})[0],x+6,cy+5,width-12,{size:sz,color:b.color||"FFFFFF"});cy+=h+6;break}
      case "lines":{const ln=b.n||3,gap=(b.gap==null?280:b.gap)/20+12,ix=x+(b.indent||0)/20;for(let k=0;k<ln;k++){ensure(gap+(k<ln-1?gap:0)*(CAM&&k===0?0:0));cy+=gap;const mk=b.marks!=null&&k===ln-1,ex=x+width-(mk?30:0);pg.ops.push(CAM?`[0.8 2.6] 0 d 1 J ${rgb("000000")} RG 0.8 w ${ix.toFixed(2)} ${Y(cy)} m ${ex.toFixed(2)} ${Y(cy)} l S [] 0 d 0 J`:`[1 2.2] 0 d ${rgb("777777")} RG 0.6 w ${ix.toFixed(2)} ${Y(cy)} m ${ex.toFixed(2)} ${Y(cy)} l S [] 0 d`);
        if(mk)drawLine(layout("["+b.marks+"]",40,{size:10.5,bold:true})[0],x+width-strW("["+b.marks+"]",true,10.5),cy-11,40,{size:10.5,color:"10252F"})}cy+=4;break}
      case "img":await image(b,x,width);break;
      case "table":table(b,x,width);break;
      case "kv":table({rows:(b.pairs||[]).map(p=>[p[0],p[1]]),widths:[30,70],fontSize:9.5},x,width);break;
      case "box":{
        const t0=TONE[b.tone||"info"]||TONE.info,t={f:b.fill||t0.f,b:b.bar||t0.b},iw=width-22;let ls=[];
        const parts=[];if(b.title)parts.push({ls:layout(b.title,iw,{size:10,bold:true}),o:{size:10,color:t.b}});
        if(b.text)parts.push({ls:layout(b.text,iw,{size:10}),o:{size:10,color:"10252F"}});
        (b.items||[]).forEach(it=>parts.push({ls:layout("•  "+it,iw,{size:10}),o:{size:10,color:"10252F"}}));
        const h=parts.reduce((a,p)=>a+p.ls.length*10*LH,0)+14;ensure(Math.min(h,PH-MT-MB));
        rect(x,cy,width,h,t.f,null);rect(x,cy,4,h,t.b,null);let yy=cy+7;
        parts.forEach(p=>p.ls.forEach(l=>{drawLine(l,x+14,yy,iw,p.o);yy+=10*LH}));cy+=h+8;break}
      case "sig":{const n=(b.labels||[""]).length||1,w=width/n;ensure(50);cy+=28;(b.labels||[""]).forEach((l,k)=>{line(x+k*w+4,cy,x+(k+1)*w-14,cy,"444444",0.7);const ls=layout(l,w-20,{size:8.5});drawLine(ls[0],x+k*w+4,cy+3,w-20,{size:8.5,color:"444444"})});cy+=26;break}
      case "cols":{const w=(width-16)/2,top=cy;let end=cy;const startPage=pages.length;
        for(let k=0;k<2;k++){cy=top;if(pages.length!==startPage&&k===1){}for(const c of b.cols[k]||[])await blk(c,x+k*(w+16),w);end=Math.max(end,cy)}cy=end;break}
    }
  }
  newPage();
  if(model.title){para(model.title,MX,CW,{size:21,bold:true,color:TEAL});line(MX,cy+2,MX+CW,cy+2,"0E7C66",1.4);cy+=10}
  if(model.subtitle){para(model.subtitle,MX,CW,{size:11.5,color:"555555"});cy+=6}
  for(const b of model.blocks||[])await blk(b,MX,CW);
  /* footers */
  const N=pages.length;
  pages.forEach((p,i)=>{pg=p;
    if(CAM){
      if(i>0){const t=String(i+1),l=layout(t,60,{size:10})[0];drawLine(l,PW/2-30,26,60,{size:10,color:"000000",align:"center"})}
      if(i>0){const fy=PH-MB+12,a=layout(CAM.left||"",CW/3,{size:7.5})[0],c=layout(CAM.mid||"",CW/3,{size:7.5})[0];
        drawLine(a,MX,fy,CW/3,{size:7.5,color:"000000"});drawLine(c,MX+CW/3,fy,CW/3,{size:7.5,color:"000000",align:"center"});
        if(i<N-1)drawLine(layout("[Turn over",CW/3,{size:7.5})[0],MX+2*CW/3,fy,CW/3,{size:7.5,color:"000000",align:"right"})}
      return}
    line(MX,PH-MB+10,PW-MX,PH-MB+10,GRID,0.5);
    const f=layout(String(model.footer||model.title||""),CW-90,{size:8})[0];drawLine(f,MX,PH-MB+14,CW-90,{size:8,color:"666666"});
    const t="Page "+(i+1)+" of "+N;drawLine(layout(t,90,{size:8})[0],PW-MX-90,PH-MB+14,90,{size:8,color:"666666",align:"right"})});
  /* assemble */
  const enc=new TextEncoder(),parts=[];let off=0;const offs=[];
  const put=u=>{parts.push(u);off+=u.length},ps=s=>put(Uint8Array.from(s,ch=>ch.charCodeAt(0)&255));
  const nImg=images.length,fontIds=[3,4,5,6],infoId=7,imgBase=8,pgBase=imgBase+nImg;
  const obj=(id,fn)=>{offs[id]=off;ps(id+" 0 obj\n");fn();ps("\nendobj\n")};
  ps("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
  obj(1,()=>ps("<< /Type /Catalog /Pages 2 0 R >>"));
  obj(2,()=>ps("<< /Type /Pages /Count "+N+" /Kids ["+pages.map((_,i)=>(pgBase+i*2+1)+" 0 R").join(" ")+"] >>"));
  ["Helvetica","Helvetica-Bold","Helvetica-Oblique","Helvetica-BoldOblique"].forEach((n,k)=>obj(fontIds[k],()=>ps("<< /Type /Font /Subtype /Type1 /BaseFont /"+n+" /Encoding /WinAnsiEncoding >>")));
  obj(infoId,()=>ps("<< /Title "+pdfLit(model.title||"Document")+" /Producer (Cambridge Learning Hub) >>"));
  images.forEach((j,k)=>obj(imgBase+k,()=>{ps("<< /Type /XObject /Subtype /Image /Width "+j.pw+" /Height "+j.ph+" /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /"+(j.flate?"FlateDecode":"DCTDecode")+" /Length "+j.bytes.length+" >>\nstream\n");put(j.bytes);ps("\nendstream")}));
  for(let i=0;i<N;i++){
    const raw=enc.encode(pages[i].ops.join("\n")),z=await deflate(raw),data=z||raw;
    obj(pgBase+i*2,()=>{ps("<< /Length "+data.length+(z?" /Filter /FlateDecode":"")+" >>\nstream\n");put(data);ps("\nendstream")});
    const xo=Object.keys(pages[i].img).map(k=>"/"+k+" "+(imgBase+(+k.slice(2)))+" 0 R").join(" ");
    obj(pgBase+i*2+1,()=>ps("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 "+PW.toFixed(2)+" "+PH.toFixed(2)+"] /Contents "+(pgBase+i*2)+" 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R /F4 6 0 R >>"+(xo?" /XObject << "+xo+" >>":"")+" >> >>"));
  }
  const total=pgBase+N*2,xref=off;
  ps("xref\n0 "+total+"\n0000000000 65535 f \n");
  for(let id=1;id<total;id++)ps(("0000000000"+offs[id]).slice(-10)+" 00000 n \n");
  ps("trailer\n<< /Size "+total+" /Root 1 0 R /Info "+infoId+" 0 R >>\nstartxref\n"+xref+"\n%%EOF");
  return new Blob(parts,{type:"application/pdf"});
}

return{docx:toDocx,pdf:toPdf,svgToPng,csv,parse};
})();
