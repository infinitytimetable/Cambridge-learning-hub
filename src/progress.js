/* progress — Learner progress page (classes, marks, analysis, risk, interventions, export)

PROG.load()/PROG.get() -> store {v:1,settings:{passMark,watchMark,dropPts,weights:{bi,form,sum},academicYear},classes:[...],ui:{}}
  (persisted in localStorage 'hubprogress.v1'; PROG.save() writes it; PROG.cls(id) finds a class; PROG.sem(cls,year,semKey) -> {assess:[],marks:{}} (never null))
PROG.analyse(cls, yearKey, semKey, settings?) returns:
{
  settings:{passMark,watchMark,dropPts,weights},
  assess:[ {id,type:'bi'|'form'|'sum',name,short,date,max,topics:[{s,n}],           // in chronological order
            entered:n numeric marks, absent:n, missing:n, held:bool (>=1 numeric mark),
            mean:% | null, median:%, passRate:% (share of entered >= passMark), high:%, low:%, sd:% } ],
  learners:[ {id,name,ref,scores:{assessId:% | null}, raw:{assessId:number|'A'|null},
              byType:{bi:% | null,form:% | null,sum:% | null},   // mean % of that assessment type
              overall:% | null,                                    // weighted by settings.weights, re-normalised over types with data
              count:numberOfScoredAssessments, absent:n, missing:n,
              last:% | null, last3:% | null, earlier:% | null, drop:points (earlier - last3, or null if <4 results),
              slope:points per assessment (least squares, null if <3 results),
              rank:1.. | null, status:'critical'|'risk'|'watch'|'ontrack'|'nodata', reasons:[string],
              weakTopics:[{s,n,fails}] } ],
  summary:{n, withData, mean, median, sd, passRate, high, low, completion:% of expected marks entered,
           counts:{critical,risk,watch,ontrack,nodata}, bands:[10 counts for 0-9,10-19,...,90-100], byType:{bi,form,sum}},
  trend:[ {id,name,short,type,date,mean,median,passRate,n} ]  // same order as assess (only held assessments have non-null values)
}
Chart helpers (pure SVG strings; opts.static:true gives fixed light-theme hex colours for PNG export):
  PCH_line({labels,series:[{name,vals,color?,dash?}],min,max,ref:[{y,label,color}],w,h,static})
  PCH_bars({labels,vals,colors?,max,ref,w,h,static,fmt})   PCH_stack({segments:[{label,v,color}],w,static})
*/
const PROG=(function(){
  const KEY="hubprogress.v1";
  const DEF={passMark:50,watchMark:60,dropPts:15,weights:{bi:30,form:30,sum:40}};
  let data=null;
  function uid(p){return p+Math.random().toString(36).slice(2,7)+Date.now().toString(36).slice(-4)}
  function load(){
    let s=null;try{s=JSON.parse(localStorage.getItem(KEY))}catch(e){}
    if(!s||!Array.isArray(s.classes))s={v:1,settings:{},classes:[],ui:{}};
    s.settings=Object.assign({},DEF,{academicYear:String(new Date().getFullYear())},s.settings||{});
    s.settings.weights=Object.assign({},DEF.weights,s.settings.weights||{});
    s.ui=s.ui||{};
    s.classes.forEach(c=>{c.learners=c.learners||[];c.years=c.years||{};c.interventions=c.interventions||[]});
    data=s;return s;
  }
  function get(){return data||load()}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(get()));return true}catch(e){return false}}
  function cls(id){return get().classes.find(c=>c.id===id)||null}
  function sem(c,y,s){const Y=c&&c.years&&c.years[y];return(Y&&Y[s])||{assess:[],marks:{}}}
  function ensureSem(c,y,s){c.years[y]=c.years[y]||{};c.years[y][s]=c.years[y][s]||{assess:[],marks:{}};const m=c.years[y][s];m.assess=m.assess||[];m.marks=m.marks||{};return m}
  function ordered(a){
    if(a.length&&a.every(x=>x.date))return a.map((x,i)=>[x,i]).sort((p,q)=>p[0].date<q[0].date?-1:p[0].date>q[0].date?1:p[1]-q[1]).map(p=>p[0]);
    return a.slice();
  }
  const mean=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:null;
  function median(a){if(!a.length)return null;const b=a.slice().sort((x,y)=>x-y),m=b.length>>1;return b.length%2?b[m]:(b[m-1]+b[m])/2}
  function sd(a){if(a.length<2)return null;const m=mean(a);return Math.sqrt(a.reduce((s,x)=>s+(x-m)*(x-m),0)/(a.length-1))}
  const rd=v=>Math.round(v);
  function shortName(a,idx){
    if(a.type==="sum")return"Sum";
    const same=idx.filter(x=>x.type===a.type);const k=same.indexOf(a)+1;
    return(a.type==="bi"?"BT":"F")+k;
  }
  function analyse(c,y,s,st){
    st=Object.assign({},DEF,get().settings,st||{});
    const W=Object.assign({},DEF.weights,st.weights||{});
    const sm=sem(c,y,s),as=ordered(sm.assess||[]),marks=sm.marks||{};
    const pass=+st.passMark,watch=+st.watchMark,dropPts=+st.dropPts;
    const L=c.learners||[];
    const pctOf=(lid,a)=>{const v=(marks[lid]||{})[a.id];return(typeof v==="number"&&a.max>0)?v/a.max*100:null};
    const rawOf=(lid,a)=>{const v=(marks[lid]||{})[a.id];return v===undefined?null:v};
    const rows=as.map(a=>{
      const ps=[];let ab=0;
      L.forEach(l=>{const p=pctOf(l.id,a);if(p!=null)ps.push(p);else if(rawOf(l.id,a)==="A")ab++});
      const held=ps.length>0;
      return{id:a.id,type:a.type,name:a.name,short:shortName(a,as),date:a.date||"",max:a.max,topics:a.topics||[],
        entered:ps.length,absent:ab,missing:held?Math.max(0,L.length-ps.length-ab):0,held,
        mean:mean(ps),median:median(ps),passRate:ps.length?ps.filter(p=>p>=pass).length/ps.length*100:null,
        high:ps.length?Math.max(...ps):null,low:ps.length?Math.min(...ps):null,sd:sd(ps)};
    });
    const heldRows=rows.filter(r=>r.held);
    const learners=L.map(l=>{
      const scores={},raw={};const ent=[];const byT={bi:[],form:[],sum:[]};let ab=0,miss=0;const fails={};
      as.forEach((a,i)=>{
        const p=pctOf(l.id,a);scores[a.id]=p;raw[a.id]=rawOf(l.id,a);
        if(p!=null){ent.push(p);(byT[a.type]||(byT[a.type]=[])).push(p);
          if(p<pass)(a.topics||[]).forEach(t=>{const k=t.s+":"+t.n;fails[k]=(fails[k]||0)+1});}
        else if(rows[i].held){if(raw[a.id]==="A")ab++;else miss++}
      });
      const byType={};let num=0,den=0;
      ["bi","form","sum"].forEach(t=>{byType[t]=byT[t].length?mean(byT[t]):null;if(byType[t]!=null){num+=W[t]*byType[t];den+=W[t]}});
      const overall=den>0?num/den:null,k=ent.length;
      let last=k?ent[k-1]:null,last3=null,earlier=null,drop=null,slope=null;
      if(k>=1)last3=mean(ent.slice(-3));
      if(k>=4){earlier=mean(ent.slice(0,k-3));drop=earlier-last3}
      if(k>=3){const mx=(k-1)/2,my=mean(ent);let nu=0,de=0;ent.forEach((v,i)=>{nu+=(i-mx)*(v-my);de+=(i-mx)*(i-mx)});slope=de?nu/de:0}
      const reasons=[];let status="ontrack";
      if(k===0)status="nodata";
      else{
        const crit=[],risk=[],wat=[];
        const last2fail=k>=2&&ent[k-1]<pass&&ent[k-2]<pass;
        if(overall<pass-15)crit.push("Overall "+rd(overall)+"% is more than 15 points below the pass mark ("+pass+"%)");
        if(overall<pass&&drop!=null&&drop>=dropPts)crit.push("Below the pass mark and falling: recent results "+rd(last3)+"% against "+rd(earlier)+"% earlier");
        if(overall<pass&&last2fail)crit.push("Below the pass mark on the last two assessments");
        if(overall<pass)risk.push("Overall "+rd(overall)+"% is below the pass mark ("+pass+"%)");
        if(drop!=null&&drop>=dropPts)risk.push("Dropped "+rd(drop)+" points: recent results "+rd(last3)+"% against "+rd(earlier)+"% earlier");
        if(miss>=3)risk.push(miss+" assessments missed with no absence recorded");
        if(byType.sum!=null&&byType.sum<pass)risk.push("Summative assessment below the pass mark ("+rd(byType.sum)+"%)");
        if(overall<watch)wat.push("Overall "+rd(overall)+"% is below the watch level ("+watch+"%)");
        if(slope!=null&&k>=4&&slope<=-2)wat.push("Downward trend ("+slope.toFixed(1)+" points per assessment)");
        if(last<pass)wat.push("Latest result "+rd(last)+"% is below the pass mark");
        if(ab>=2)wat.push(ab+" absences from assessments");
        if(miss>=1&&miss<3)wat.push(miss+(miss===1?" assessment":" assessments")+" missed");
        status=crit.length?"critical":risk.length?"risk":wat.length?"watch":"ontrack";
        crit.concat(risk,wat).forEach(r=>reasons.push(r));
        if(status==="ontrack")reasons.push("Meeting expectations ("+rd(overall)+"%)");
      }
      const weakTopics=Object.keys(fails).map(q=>{const p=q.split(":");return{s:p[0],n:+p[1],fails:fails[q]}}).sort((a,b)=>b.fails-a.fails);
      return{id:l.id,name:l.name,ref:l.ref||"",scores,raw,byType,overall,count:k,absent:ab,missing:miss,last,last3,earlier,drop,slope,rank:null,status,reasons,weakTopics};
    });
    learners.filter(l=>l.overall!=null).sort((a,b)=>b.overall-a.overall).forEach((l,i,arr)=>{l.rank=i>0&&Math.abs(arr[i-1].overall-l.overall)<1e-9?arr[i-1].rank:i+1});
    const ov=learners.filter(l=>l.overall!=null).map(l=>l.overall);
    const counts={critical:0,risk:0,watch:0,ontrack:0,nodata:0};learners.forEach(l=>counts[l.status]++);
    const bands=new Array(10).fill(0);ov.forEach(v=>bands[Math.min(9,Math.max(0,Math.floor(v/10)))]++);
    const expected=L.length*heldRows.length,got=heldRows.reduce((s,r)=>s+r.entered+r.absent,0);
    const byType={};["bi","form","sum"].forEach(t=>{const a=rows.filter(r=>r.type===t&&r.mean!=null).map(r=>r.mean);byType[t]=a.length?mean(a):null});
    return{settings:{passMark:pass,watchMark:watch,dropPts,weights:W},assess:rows,learners,
      summary:{n:L.length,withData:ov.length,mean:mean(ov),median:median(ov),sd:sd(ov),passRate:ov.length?ov.filter(v=>v>=pass).length/ov.length*100:null,
        high:ov.length?Math.max(...ov):null,low:ov.length?Math.min(...ov):null,completion:expected?got/expected*100:null,counts,bands,byType},
      trend:rows.map(r=>({id:r.id,name:r.name,short:r.short,type:r.type,date:r.date,mean:r.mean,median:r.median,passRate:r.passRate,n:r.entered}))};
  }
  return{KEY,DEF,load,get,save,cls,sem,ensureSem,ordered,analyse,uid};
})();

/* ---------- SVG charts ---------- */
function PCH_pal(st){
  return st?{ink:"#10252F",muted:"#4D6573",line:"#CFDBE2",accent:"#0A6C74",good:"#17794A",bad:"#B3261E",warn:"#B7791F",bg:"#FFFFFF",c2:"#7A4EAB"}
    :{ink:"var(--ink)",muted:"var(--muted)",line:"var(--line)",accent:"var(--accent)",good:"var(--good)",bad:"var(--bad)",warn:"var(--warn)",bg:"var(--surface)",c2:"#8E5BC9"};
}
function PCH_e(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
function PCH_cut(s,n){s=String(s);return s.length>n?s.slice(0,n-1)+"…":s}
function PCH_line(o){
  const p=PCH_pal(o.static),W=o.w||640,n=o.labels.length,rot=n>6;
  const named=o.series.filter(s=>s.name).length>1||(o.ref&&o.ref.length);
  const L=42,R=44,T=14,B=rot?66:34,leg=named?26:0,H=o.h||280;
  const pw=W-L-R,ph=H-T-B-leg,min=o.min==null?0:o.min,max=o.max==null?100:o.max;
  const X=i=>L+(n<2?pw/2:i*pw/(n-1)),Y=v=>T+ph-(Math.min(max,Math.max(min,v))-min)/(max-min)*ph;
  let g="";
  for(let k=0;k<=4;k++){const v=min+(max-min)*k/4,y=Y(v);g+=`<line x1="${L}" x2="${W-R}" y1="${y}" y2="${y}" stroke="${p.line}" stroke-width="1"/><text x="${L-6}" y="${y+4}" text-anchor="end" font-size="11" fill="${p.muted}">${Math.round(v)}</text>`}
  o.labels.forEach((lb,i)=>{const x=X(i),y=T+ph+16;
    g+=rot?`<text x="${x}" y="${y}" text-anchor="end" font-size="11" fill="${p.muted}" transform="rotate(-40 ${x} ${y})">${PCH_e(PCH_cut(lb,16))}</text>`
          :`<text x="${x}" y="${y}" text-anchor="middle" font-size="11" fill="${p.muted}">${PCH_e(PCH_cut(lb,12))}</text>`});
  (o.ref||[]).forEach(r=>{const y=Y(r.y),c=r.color?(p[r.color]||r.color):p.bad;
    g+=`<line x1="${L}" x2="${W-R}" y1="${y}" y2="${y}" stroke="${c}" stroke-width="1.5" stroke-dasharray="6 4"/><text x="${W-R+4}" y="${y+4}" font-size="11" font-weight="700" fill="${c}">${PCH_e(r.label||"")}</text>`});
  const cols=[p.accent,p.c2,p.warn,p.good,p.bad];
  o.series.forEach((s,si)=>{
    const c=s.color?(p[s.color]||s.color):cols[si%cols.length];let d="",pen=false;
    s.vals.forEach((v,i)=>{if(v==null||isNaN(v)){pen=false;return}d+=(pen?"L":"M")+X(i).toFixed(1)+" "+Y(v).toFixed(1)+" ";pen=true});
    g+=`<path d="${d}" fill="none" stroke="${c}" stroke-width="${s.w||2.5}"${s.dash?' stroke-dasharray="6 4"':''} stroke-linejoin="round" stroke-linecap="round"/>`;
    s.vals.forEach((v,i)=>{if(v==null||isNaN(v))return;g+=`<circle cx="${X(i).toFixed(1)}" cy="${Y(v).toFixed(1)}" r="${s.dash?3:4}" fill="${s.dash?p.bg:c}" stroke="${c}" stroke-width="2"><title>${PCH_e((s.name?s.name+" – ":"")+o.labels[i]+": "+Math.round(v*10)/10+(o.unit==null?"%":o.unit))}</title></circle>`});
  });
  if(named){let lx=L,ly=H-8;o.series.forEach((s,si)=>{if(!s.name)return;const c=s.color?(p[s.color]||s.color):cols[si%cols.length];
    g+=`<line x1="${lx}" x2="${lx+22}" y1="${ly-4}" y2="${ly-4}" stroke="${c}" stroke-width="3"${s.dash?' stroke-dasharray="5 3"':''}/><text x="${lx+28}" y="${ly}" font-size="12" fill="${p.ink}">${PCH_e(s.name)}</text>`;lx+=36+s.name.length*7})}
  return`<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="${PCH_e(o.title||"Line chart")}" style="max-width:100%;height:auto;display:block" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">${o.title?`<title>${PCH_e(o.title)}</title>`:""}${g}</svg>`;
}
function PCH_bars(o){
  const p=PCH_pal(o.static),W=o.w||640,n=o.labels.length,H=o.h||250,rot=n>7;
  const L=42,R=44,T=20,B=rot?64:34,pw=W-L-R,ph=H-T-B;
  const vals=o.vals.map(v=>v==null?null:+v);
  const mx=o.max!=null?o.max:Math.max(1,...vals.filter(v=>v!=null));
  const Y=v=>T+ph-Math.min(mx,Math.max(0,v))/mx*ph;
  const fmt=o.fmt||(v=>Math.round(v*10)/10);
  let g="";
  for(let k=0;k<=4;k++){const v=mx*k/4,y=Y(v);g+=`<line x1="${L}" x2="${W-R}" y1="${y}" y2="${y}" stroke="${p.line}"/><text x="${L-6}" y="${y+4}" text-anchor="end" font-size="11" fill="${p.muted}">${Math.round(v*10)/10}</text>`}
  const bw=pw/n,pad=Math.min(14,bw*.2);
  vals.forEach((v,i)=>{
    const x=L+i*bw+pad/2,w=bw-pad,cx=x+w/2;
    const c=o.colors&&o.colors[i]?(p[o.colors[i]]||o.colors[i]):p.accent;
    if(v!=null){const y=Y(v);g+=`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${Math.max(0,T+ph-y).toFixed(1)}" rx="3" fill="${c}"><title>${PCH_e(o.labels[i]+": "+fmt(v)+(o.unit||""))}</title></rect><text x="${cx.toFixed(1)}" y="${(y-4).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="${p.ink}">${fmt(v)}</text>`}
    const ly=T+ph+16;
    g+=rot?`<text x="${cx.toFixed(1)}" y="${ly}" text-anchor="end" font-size="11" fill="${p.muted}" transform="rotate(-40 ${cx.toFixed(1)} ${ly})">${PCH_e(PCH_cut(o.labels[i],16))}</text>`
          :`<text x="${cx.toFixed(1)}" y="${ly}" text-anchor="middle" font-size="11" fill="${p.muted}">${PCH_e(PCH_cut(o.labels[i],14))}</text>`;
  });
  (o.ref||[]).forEach(r=>{const y=Y(r.y),c=r.color?(p[r.color]||r.color):p.bad;g+=`<line x1="${L}" x2="${W-R}" y1="${y}" y2="${y}" stroke="${c}" stroke-width="1.5" stroke-dasharray="6 4"/><text x="${W-R+4}" y="${y+4}" font-size="11" font-weight="700" fill="${c}">${PCH_e(r.label||"")}</text>`});
  return`<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="${PCH_e(o.title||"Bar chart")}" style="max-width:100%;height:auto;display:block" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">${o.title?`<title>${PCH_e(o.title)}</title>`:""}${g}</svg>`;
}
function PCH_stack(o){
  const p=PCH_pal(o.static),W=o.w||640,tot=o.segments.reduce((s,x)=>s+x.v,0)||1,H=64;
  let x=0,g="",ly=0,lx=0;
  o.segments.forEach(s=>{const c=p[s.color]||s.color,w=s.v/tot*W;
    if(s.v>0){g+=`<rect x="${x.toFixed(1)}" y="0" width="${w.toFixed(1)}" height="26" fill="${c}"><title>${PCH_e(s.label+": "+s.v)}</title></rect>`;
      if(w>22)g+=`<text x="${(x+w/2).toFixed(1)}" y="18" text-anchor="middle" font-size="13" font-weight="700" fill="${o.static?"#fff":"var(--bg)"}">${s.v}</text>`}
    x+=w});
  o.segments.forEach(s=>{const c=p[s.color]||s.color;g+=`<rect x="${lx}" y="${40}" width="12" height="12" rx="2" fill="${c}"/><text x="${lx+17}" y="${51}" font-size="12" fill="${p.ink}">${PCH_e(s.label)} (${s.v})</text>`;lx+=26+(s.label.length+4)*7});
  return`<svg viewBox="0 0 ${Math.max(W,lx)} ${H}" width="100%" role="img" aria-label="${PCH_e(o.title||"Status distribution")}" style="max-width:100%;height:auto;display:block" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">${g}</svg>`;
}

/* ---------- UI ---------- */
let PG_A=null,PG_env=null,PG_S=null,PG_timer=null;
const PG_STATUS={critical:{l:"Critical",ic:"▲▲",c:"bad"},risk:{l:"At risk",ic:"▲",c:"warn"},watch:{l:"Watch",ic:"●",c:"watch"},ontrack:{l:"On track",ic:"✓",c:"good"},nodata:{l:"No data",ic:"–",c:"none"}};
const PG_TYPE={bi:"Bi-weekly test",form:"Formative assessment",sum:"Summative assessment"};
const PG_ITYPES=["Extra practice","Revision session","Small-group support","Peer tutoring","Catch-up assessment","Parent/guardian contact","Pastoral / counselling","Practical catch-up","Other"];
const PG_e=PCH_e;
const PG_r=v=>v==null?"–":Math.round(v)+"%";
const PG_r1=v=>v==null?"–":(Math.round(v*10)/10)+"%";
function PG_css(){
  if(document.getElementById("pg-css"))return;
  const st=document.createElement("style");st.id="pg-css";
  const u="var(--u,1px)";
  st.textContent=`
.pg{max-width:1500px;margin:0 auto}
.pg h2{font:700 calc(22*${u}) var(--f-display);margin:22px 0 10px}
.pg h3{font:700 calc(17*${u}) var(--f-display);margin:0 0 8px}
.pg-bar{display:flex;flex-wrap:wrap;gap:10px;align-items:flex-end;margin:6px 0 14px}
.pg-bar label{display:flex;flex-direction:column;gap:3px;font:600 calc(12*${u}) var(--f-body);color:var(--muted)}
.pg select,.pg input[type=text],.pg input[type=number],.pg input[type=date],.pg textarea{font:500 calc(15*${u}) var(--f-body);min-height:42px;padding:6px 10px;border-radius:9px;border:1px solid var(--line);background:var(--surface);color:var(--ink);box-sizing:border-box}
.pg textarea{width:100%;min-height:100px}
.pg-seg{display:inline-flex;border:1px solid var(--line);border-radius:9px;overflow:hidden}
.pg-seg button{font:600 calc(15*${u}) var(--f-body);min-height:42px;padding:6px 16px;border:0;background:var(--surface);color:var(--ink);cursor:pointer}
.pg-seg button[aria-pressed=true]{background:var(--ink);color:var(--bg)}
.pg-tabs{display:flex;gap:4px;overflow-x:auto;border-bottom:2px solid var(--line);margin:8px 0 16px}
.pg-tabs button{font:700 calc(15*${u}) var(--f-body);min-height:44px;padding:8px 16px;border:0;background:none;color:var(--muted);cursor:pointer;border-bottom:3px solid transparent;margin-bottom:-2px;white-space:nowrap}
.pg-tabs button[aria-selected=true]{color:var(--accent);border-bottom-color:var(--accent)}
.pg-card{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:14px 16px;box-shadow:var(--shadow);margin-bottom:14px}
.pg-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:14px}
.pg-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-bottom:14px}
.pg-kpi{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:10px 14px}
.pg-kpi b{display:block;font:800 calc(28*${u}) var(--f-display);line-height:1.1}
.pg-kpi span{font:600 calc(13*${u}) var(--f-body);color:var(--muted)}
.pg-tw{overflow-x:auto;border:1px solid var(--line);border-radius:10px;background:var(--surface)}
.pg table{border-collapse:collapse;width:100%;font:500 calc(14*${u}) var(--f-body)}
.pg th,.pg td{padding:6px 9px;border-bottom:1px solid var(--line);text-align:left;vertical-align:middle}
.pg th{background:var(--surface2);font-weight:700;position:sticky;top:0;white-space:nowrap}
.pg td.n,.pg th.n{text-align:center}
.pg-grid-t th:first-child,.pg-grid-t td:first-child{position:sticky;left:0;background:var(--surface);z-index:1;min-width:160px}
.pg-grid-t th:first-child{background:var(--surface2);z-index:2}
.pg-grid-t input{width:62px;text-align:center;min-height:36px;padding:2px 4px}
.pg-grid-t input.bad{border-color:var(--bad);background:var(--bad-bg)}
.pg-grid-t input.abs{background:var(--surface2);font-style:italic}
.pg-grid-t .bi{box-shadow:inset 0 3px 0 var(--accent)}.pg-grid-t .form{box-shadow:inset 0 3px 0 #8E5BC9}.pg-grid-t .sum{box-shadow:inset 0 3px 0 var(--bad)}
.pg-chip{display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:3px 11px;font:700 calc(13*${u}) var(--f-body);white-space:nowrap}
.pg-chip.bad{background:var(--bad-bg);color:var(--bad)}.pg-chip.warn{background:var(--warn-bg);color:var(--warn)}.pg-chip.good{background:var(--good-bg);color:var(--good)}.pg-chip.watch{background:var(--surface2);color:var(--ink);border:1px solid var(--line)}.pg-chip.none{background:var(--surface2);color:var(--muted)}
.pg-row{cursor:pointer}.pg-row:hover td{background:var(--surface2)}.pg-row.sel td{background:var(--surface2);box-shadow:inset 3px 0 0 var(--accent)}
.pg-muted{color:var(--muted)}.pg-sm{font-size:calc(13*${u})}
.pg-h0{background:var(--bad-bg);color:var(--bad)}.pg-h1{background:var(--warn-bg);color:var(--warn)}.pg-h2{background:var(--surface2)}.pg-h3{background:var(--good-bg);color:var(--good);font-weight:700}
.pg-hm td,.pg-hm th{text-align:center;padding:5px 7px}.pg-hm td:first-child,.pg-hm th:first-child{text-align:left}
.pg-modal{position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:flex-start;justify-content:center;padding:4vh 12px;overflow:auto;z-index:100}
.pg-dlg{background:var(--surface);color:var(--ink);border-radius:14px;padding:18px 20px;width:min(720px,100%);box-shadow:0 20px 60px rgba(0,0,0,.4)}
.pg-dlg label{display:flex;flex-direction:column;gap:3px;font:600 calc(13*${u}) var(--f-body);color:var(--muted);margin-bottom:10px}
.pg-dlg label input,.pg-dlg label select,.pg-dlg label textarea{width:100%}
.pg-f2{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0 12px}
.pg-acts{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.pg-toast{position:fixed;bottom:18px;left:50%;transform:translateX(-50%);background:var(--ink);color:var(--bg);padding:10px 18px;border-radius:10px;z-index:200;font:600 calc(15*${u}) var(--f-body);max-width:90vw}
.pg-empty{text-align:center;padding:30px 14px}
.pg-int{border-left:5px solid var(--accent)}.pg-int.over{border-left-color:var(--bad)}.pg-int.done{border-left-color:var(--good);opacity:.85}
.pg ul.pg-l{margin:6px 0;padding-left:20px}.pg ul.pg-l li{margin:3px 0}
.pg-top{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:6px}
.pg-tp{display:inline-flex;align-items:center;gap:4px;background:var(--surface2);border-radius:999px;padding:2px 4px 2px 10px;margin:2px 4px 2px 0;font-size:calc(13*${u})}
.pg-tp button{border:0;background:none;color:var(--muted);cursor:pointer;font-size:16px;min-width:28px;min-height:28px}
@media print{.pg-tabs,.pg-bar,.pg-acts{display:none}}
`;
  document.head.appendChild(st);
}
function PG_toast(m){
  clearTimeout(PG_timer);let t=document.getElementById("pg-toast");
  if(!t){t=document.createElement("div");t.id="pg-toast";t.className="pg-toast";t.setAttribute("role","status");document.body.appendChild(t)}
  t.textContent=m;PG_timer=setTimeout(()=>{t.remove()},3800);
}
function PG_save(){if(!PROG.save())PG_toast("Could not save: browser storage is full or blocked. Export a backup from the Export tab.")}
function PG_cls(){return PROG.cls(PG_S.cid)}
function PG_an(c){c=c||PG_cls();return c?PROG.analyse(c,PG_S.y,PG_S.s):null}
function PG_ui(){const st=PROG.get();st.ui={cid:PG_S.cid,y:PG_S.y,s:PG_S.s,tab:PG_S.tab};PROG.save()}
function PG_years(){
  const st=PROG.get(),set=new Set([st.settings.academicYear,PG_S.y]);
  st.classes.forEach(c=>Object.keys(c.years).forEach(y=>set.add(y)));
  const nums=[...set].filter(y=>/^\d{4}$/.test(y)).map(Number);
  if(nums.length){set.add(String(Math.min(...nums)-1));set.add(String(Math.max(...nums)+1))}
  return[...set].sort();
}
function PG_units(s){const x=(typeof SUBJ!=="undefined"&&SUBJ[s]&&SUBJ[s].units)||[];return x}
function PG_uname(s,n){const u=PG_units(s).find(u=>u.n===n);return u?(u.name||u.t||("Topic "+n)):("Topic "+n)}
function PG_sname(s){if(s==="alevel")return"A Level Bio";return(typeof SUBJ!=="undefined"&&SUBJ[s]&&(SUBJ[s].short||SUBJ[s].name))||s}
function PG_href(r){
  if(!r)return"";
  const s=r.s||"chem";
  switch(r.kind){case"lesson":return"#"+s+"/l"+r.n+"-"+r.l;case"quiz":return"#"+s+"/q"+r.n;case"topic":return"#"+s+"/u"+r.n;case"papers":return"#"+s+"/papers";case"cards":return"#"+s+"/cards";case"practical":return"#"+s+"/practicals";default:return""}
}
function PG_resLabel(r){
  if(!r)return"";
  if(r.label)return r.label;
  const nm=r.n?PG_uname(r.s||"chem",r.n):"";
  switch(r.kind){case"lesson":return"Lesson: "+nm;case"quiz":return"Topical quiz: "+nm;case"topic":return"Topic: "+nm;case"papers":return"Exam questions";case"cards":return"Flashcards";case"practical":return"Practicals";default:return"Custom"}
}
function PG_chip(st){const m=PG_STATUS[st]||PG_STATUS.nodata;return`<span class="pg-chip ${m.c}"><span aria-hidden="true">${m.ic}</span>${m.l}</span>`}
function PG_num(s){return(s==null||s==="")?null:+s}
function PG_topicLabel(t){return PG_sname(t.s)+" "+t.n+": "+PG_uname(t.s,t.n)}
function PG_subjectKeys(c){return c&&(c.subject==="chem"||c.subject==="bio"||c.subject==="alevel")?[c.subject]:["chem","bio","alevel"]}

/* ----- demo ----- */
function PG_demo(){
  const names=["Amara Okafor","Brian Mwale","Chipo Banda","Daniel Phiri","Esther Zulu","Farai Moyo","Grace Tembo","Hassan Ali","Ivy Chanda","James Mulenga","Kudzai Ncube","Lindiwe Dube","Moses Sakala","Naledi Khumalo","Oliver Kunda","Precious Lungu","Quinn Mutale","Ruth Nkhoma","Sam Daka","Thandi Mbewe","Uchenna Eze","Violet Simbeye","Wesley Chama","Zanele Ndlovu"];
  let seed=20260;const rnd=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};
  const noise=()=>(rnd()+rnd()+rnd()-1.5)*14;
  const learners=names.map((n,i)=>({id:PROG.uid("L"),name:n}));
  const order=[["bi",20],["bi",20],["form",40],["bi",20],["bi",20],["bi",20],["bi",20],["form",40],["bi",20],["bi",20],["sum",100]];
  const topics=[1,2,3,3,4,5,6,7,8,9,12];
  const start=new Date(Date.UTC(2026,0,12));
  let bn=0,fn=0;
  const assess=order.map((o,i)=>{
    const d=new Date(start.getTime()+i*10*864e5).toISOString().slice(0,10);
    const name=o[0]==="bi"?"Bi-weekly test "+(++bn):o[0]==="form"?"Formative assessment "+(++fn):"Summative assessment";
    const tp=PG_units("chem")[0]?(o[0]==="sum"?[1,2,3,4,5,6].map(n=>({s:"chem",n})):[{s:"chem",n:topics[i]}]):[];
    return{id:PROG.uid("A"),type:o[0],name,date:d,max:o[1],topics:tp};
  });
  const marks={};
  learners.forEach((l,i)=>{
    let ab=35+rnd()*55,tr=(rnd()-.5)*3;
    if(i===2){ab=42;tr=-2.8}  if(i===6){ab=70;tr=-3.6}  if(i===9){ab=33;tr=0.4}  if(i===14){ab=38;tr=-1.2}  if(i===19){ab=48;tr=2.4}  if(i===21){ab=62;tr=-1.5}
    marks[l.id]={};
    assess.slice(0,7).forEach((a,k)=>{
      if((i===4&&k===3)||(i===11&&k===5)){marks[l.id][a.id]="A";return}
      if(i===14&&(k===1||k===4||k===5||k===6))return;
      let p=Math.max(5,Math.min(98,ab+tr*k+noise()));
      marks[l.id][a.id]=Math.round(p/100*a.max*2)/2;
    });
  });
  return{id:PROG.uid("C"),name:"Demo – Chemistry 10A",subject:"chem",yearGroup:"Grade 10",demo:true,learners,
    years:{[PG_S.y]:{sem1:{assess,marks},sem2:{assess:[],marks:{}}}},interventions:[]};
}
function PG_defaultAssess(){
  const seq=["bi","bi","form","bi","bi","bi","bi","form","bi","bi","sum"];let b=0,f=0;
  return seq.map(t=>({id:PROG.uid("A"),type:t,name:t==="bi"?"Bi-weekly test "+(++b):t==="form"?"Formative assessment "+(++f):"Summative assessment",date:"",max:t==="sum"?100:t==="form"?40:20,topics:[]}));
}

/* ----- rendering ----- */
function PG_render(keep){
  const y0=window.scrollY;
  const st=PROG.get(),c=PG_cls();
  let h=`<div class="pg"><h1 class="ltitle">Learner progress</h1><p class="lsum">Record results by class, see who needs help, and assign interventions. Data stays on this device; export a backup regularly.</p>`;
  if(!st.classes.length){
    h+=`<div class="pg-card pg-empty"><h3>No classes yet</h3><p class="pg-muted">Create a class and add learners, or load a demo class to see how the page works.</p><div class="pg-acts" style="justify-content:center"><button class="btn pri" data-act="new-class">Create a class</button><button class="btn" data-act="demo">Load demo class</button><button class="btn" data-act="restore">Restore from backup</button></div></div>`;
  }else{
    if(!c){PG_S.cid=st.classes[0].id}
    const cc=PG_cls();
    h+=`<div class="pg-bar"><label>Class<select data-ch="class" aria-label="Class">${st.classes.map(k=>`<option value="${k.id}"${k.id===cc.id?" selected":""}>${PG_e(k.name)}</option>`).join("")}</select></label>
<label>Academic year<select data-ch="year" aria-label="Academic year">${PG_years().map(y=>`<option${y===PG_S.y?" selected":""}>${y}</option>`).join("")}</select></label>
<div class="pg-seg" role="group" aria-label="Semester"><button data-act="sem" data-v="sem1" aria-pressed="${PG_S.s==="sem1"}">Semester 1</button><button data-act="sem" data-v="sem2" aria-pressed="${PG_S.s==="sem2"}">Semester 2</button></div>
<button class="btn sm" data-act="new-class">+ New class</button><button class="btn sm" data-act="edit-class">Class details</button><button class="btn sm" data-act="settings">Settings</button></div>`;
    h+=`<div class="pg-tabs" role="tablist">${[["overview","Overview"],["marks","Marks"],["learners","Learners"],["trends","Trends"],["interventions","Interventions"],["export","Export"]].map(t=>`<button role="tab" data-act="tab" data-v="${t[0]}" aria-selected="${PG_S.tab===t[0]}">${t[1]}</button>`).join("")}</div>`;
    const an=PG_an(cc);
    h+=({overview:PG_tOverview,marks:PG_tMarks,learners:PG_tLearners,trends:PG_tTrends,interventions:PG_tInterv,export:PG_tExport}[PG_S.tab]||PG_tOverview)(cc,an);
  }
  h+=`</div>`+(PG_S.modal?PG_S.modal():"");
  PG_A.innerHTML=h;
  if(keep)window.scrollTo(0,y0);
}
function PG_kpi(v,l){return`<div class="pg-kpi"><b>${v}</b><span>${l}</span></div>`}
function PG_noAssess(c,an,msg){
  if(an.assess.length)return"";
  return`<div class="pg-card pg-empty"><h3>No assessments set up for ${PG_e(PG_S.y)} – Semester ${PG_S.s==="sem1"?1:2}</h3><p class="pg-muted">${msg||"Each semester has 8 bi-weekly tests, 2 formative assessments and 1 summative assessment."}</p><div class="pg-acts" style="justify-content:center"><button class="btn pri" data-act="setup-assess">Set up the standard semester (8 + 2 + 1)</button>${PG_prevSemOffer(c)}</div></div>`;
}
function PG_prevSemOffer(c){
  const prev=PG_S.s==="sem2"?PROG.sem(c,PG_S.y,"sem1"):null;
  return prev&&prev.assess.length?`<button class="btn" data-act="copy-assess">Copy assessment plan from Semester 1</button>`:"";
}
function PG_tOverview(c,an){
  const s=an.summary,st=an.settings;
  if(!c.learners.length)return`<div class="pg-card pg-empty"><h3>No learners in ${PG_e(c.name)}</h3><div class="pg-acts" style="justify-content:center"><button class="btn pri" data-act="add-learners">Add learners</button></div></div>`;
  let h=PG_noAssess(c,an);
  if(!s.withData&&an.assess.length)h+=`<div class="pg-card"><p>No marks have been entered yet. Open the <b>Marks</b> tab to start.</p></div>`;
  h+=`<div class="pg-kpis">${PG_kpi(s.n,"Learners")}${PG_kpi(PG_r1(s.mean),"Class average (weighted)")}${PG_kpi(PG_r1(s.median),"Median")}${PG_kpi(PG_r(s.passRate),"Above pass mark ("+st.passMark+"%)")}${PG_kpi(s.counts.critical+s.counts.risk,"Critical or at risk")}${PG_kpi(PG_r(s.completion),"Marks captured")}</div>`;
  if(!s.withData)return h;
  h+=`<div class="pg-grid"><div class="pg-card"><h3>Learner status</h3>${PCH_stack({segments:[{label:"Critical",v:s.counts.critical,color:"bad"},{label:"At risk",v:s.counts.risk,color:"warn"},{label:"Watch",v:s.counts.watch,color:"c2"},{label:"On track",v:s.counts.ontrack,color:"good"},{label:"No data",v:s.counts.nodata,color:"muted"}],title:"Learner status distribution"})}
<p class="pg-muted pg-sm">Critical: far below the pass mark, or below it and falling. At risk: below the pass mark, a sharp drop, or several missed assessments. Watch: early warning signs.</p></div>
<div class="pg-card"><h3>Class average by assessment</h3>${PCH_line({labels:an.trend.map(t=>t.short),series:[{name:"Class mean",vals:an.trend.map(t=>t.mean)},{name:"Median",vals:an.trend.map(t=>t.median),dash:true}],ref:[{y:st.passMark,label:"Pass "+st.passMark}],title:"Class average by assessment"})}</div></div>`;
  const att=an.learners.filter(l=>l.status==="critical"||l.status==="risk").sort((a,b)=>(a.status===b.status?0:a.status==="critical"?-1:1)||(a.overall-b.overall));
  h+=`<div class="pg-card"><h3>Needs attention (${att.length})</h3>`;
  if(!att.length)h+=`<p class="pg-muted">No learners are currently flagged critical or at risk.</p>`;
  else h+=`<div class="pg-tw"><table><thead><tr><th>Learner</th><th class="n">Overall</th><th>Status</th><th>Why</th><th>Plan</th></tr></thead><tbody>${att.slice(0,12).map(l=>{const n=c.interventions.filter(i=>i.learnerId===l.id&&i.status!=="done").length;return`<tr><td><b>${PG_e(l.name)}</b></td><td class="n">${PG_r(l.overall)}</td><td>${PG_chip(l.status)}</td><td class="pg-sm">${PG_e(l.reasons.slice(0,2).join("; "))}</td><td><button class="btn sm" data-act="open-learner" data-id="${l.id}">${n?n+" open":"Assign"}</button></td></tr>`}).join("")}</tbody></table></div>${att.length>12?`<p class="pg-muted pg-sm">Showing 12 of ${att.length}. See the Learners tab for everyone.</p>`:""}<div class="pg-acts"><button class="btn pri" data-act="suggest-all">Suggest interventions for flagged learners</button></div>`;
  h+=`</div><div class="pg-grid"><div class="pg-card"><h3>Distribution of overall results</h3>${PCH_bars({labels:["0–9","10–19","20–29","30–39","40–49","50–59","60–69","70–79","80–89","90–100"],vals:s.bands,colors:s.bands.map((_,i)=>i*10+9<st.passMark?"bad":"accent"),title:"Distribution of overall results",unit:" learners",fmt:v=>v})}</div>`;
  const held=an.assess.filter(a=>a.held);
  if(held.length){const best=held.slice().sort((a,b)=>b.mean-a.mean)[0],worst=held.slice().sort((a,b)=>a.mean-b.mean)[0];
    h+=`<div class="pg-card"><h3>Assessment highlights</h3><ul class="pg-l"><li>Strongest: <b>${PG_e(best.name)}</b> – mean ${PG_r1(best.mean)}</li><li>Weakest: <b>${PG_e(worst.name)}</b> – mean ${PG_r1(worst.mean)}, pass rate ${PG_r(worst.passRate)}</li><li>Average by type: bi-weekly ${PG_r(s.byType.bi)}, formative ${PG_r(s.byType.form)}, summative ${PG_r(s.byType.sum)}</li><li>Weights used: bi-weekly ${st.weights.bi}%, formative ${st.weights.form}%, summative ${st.weights.sum}%</li></ul>${PG_weakTopicsHtml(c,an)}</div>`;}
  return h+`</div>`;
}
function PG_classWeak(an){
  const m={};
  an.learners.forEach(l=>l.weakTopics.forEach(t=>{const k=t.s+":"+t.n;m[k]=m[k]||{s:t.s,n:t.n,learners:0};m[k].learners++}));
  return Object.values(m).sort((a,b)=>b.learners-a.learners);
}
function PG_weakTopicsHtml(c,an){
  const w=PG_classWeak(an).slice(0,5);
  if(!w.length)return"";
  return`<h3 style="margin-top:12px">Topics to reteach</h3><ul class="pg-l">${w.map(t=>`<li>${PG_e(PG_sname(t.s))} ${t.n}: <a href="#${t.s}/u${t.n}">${PG_e(PG_uname(t.s,t.n))}</a> – ${t.learners} ${t.learners===1?"learner":"learners"} below pass mark</li>`).join("")}</ul>`;
}
function PG_tMarks(c,an){
  const sm=PROG.sem(c,PG_S.y,PG_S.s);
  if(!c.learners.length)return`<div class="pg-card pg-empty"><h3>Add learners first</h3><button class="btn pri" data-act="add-learners">Add learners</button></div>`;
  if(!an.assess.length)return PG_noAssess(c,an);
  const ord=an.assess;
  let h=`<div class="pg-acts" style="margin:0 0 10px"><button class="btn sm" data-act="paste">Paste marks from a spreadsheet</button><button class="btn sm" data-act="edit-assess">${PG_S.editA?"Hide assessment details":"Edit assessments"}</button><button class="btn sm" data-act="add-assess">+ Add assessment</button><button class="btn sm" data-act="add-learners">Add learners</button></div>
<p class="pg-muted pg-sm">Type the mark out of the maximum shown. Type <b>A</b> for absent (an absence is not counted as zero). Leave blank if not yet marked. Press Enter to move down a column.</p>`;
  if(PG_S.editA)h+=PG_assessEditor(c,ord);
  h+=`<div class="pg-tw" style="max-height:72vh"><table class="pg-grid-t"><thead><tr><th>Learner</th>${ord.map(a=>`<th class="n ${a.type}" title="${PG_e(a.name+" · "+PG_TYPE[a.type])}">${PG_e(a.short)}<div class="pg-sm pg-muted" style="font-weight:500">/${a.max}${a.date?" · "+PG_e(a.date.slice(5)):""}</div></th>`).join("")}<th class="n">Overall</th></tr></thead><tbody>`;
  an.learners.forEach(l=>{
    h+=`<tr><td><b>${PG_e(l.name)}</b></td>${ord.map(a=>{
      const v=(sm.marks[l.id]||{})[a.id];
      const vv=v==null?"":v==="A"?"A":v;
      return`<td class="n"><input type="text" inputmode="decimal" autocomplete="off" value="${PG_e(vv)}" data-mk="${l.id}|${a.id}" aria-label="${PG_e(l.name+", "+a.name)}"${v==="A"?' class="abs"':""}></td>`}).join("")}<td class="n" data-ov="${l.id}">${PG_r(l.overall)}</td></tr>`;
  });
  h+=`</tbody><tfoot><tr><th>Class mean</th>${ord.map(a=>`<th class="n" data-cm="${a.id}">${PG_r(a.mean)}</th>`).join("")}<th class="n" data-cmo>${PG_r(an.summary.mean)}</th></tr></tfoot></table></div>`;
  return h;
}
function PG_assessEditor(c,ord){
  const sm=PROG.sem(c,PG_S.y,PG_S.s);
  const keys=PG_subjectKeys(c);
  const opts=keys.map(k=>`<optgroup label="${PG_e(PG_sname(k))}">${PG_units(k).map(u=>`<option value="${k}:${u.n}">${u.n}. ${PG_e(u.name||u.t||"")}</option>`).join("")}</optgroup>`).join("");
  return`<div class="pg-card"><h3>Assessments for this semester</h3><div class="pg-tw"><table><thead><tr><th>Name</th><th>Type</th><th>Date</th><th>Max</th><th>Topics assessed</th><th></th></tr></thead><tbody>${sm.assess.map(a=>`<tr><td><input type="text" value="${PG_e(a.name)}" data-af="name|${a.id}" style="min-width:170px"></td><td><select data-af="type|${a.id}">${Object.keys(PG_TYPE).map(t=>`<option value="${t}"${a.type===t?" selected":""}>${PG_TYPE[t]}</option>`).join("")}</select></td><td><input type="date" value="${PG_e(a.date||"")}" data-af="date|${a.id}"></td><td><input type="number" min="1" value="${a.max}" data-af="max|${a.id}" style="width:80px"></td><td>${(a.topics||[]).map((t,i)=>`<span class="pg-tp">${PG_e(PG_topicLabel(t))}<button data-act="rm-topic" data-id="${a.id}" data-i="${i}" aria-label="Remove topic">×</button></span>`).join("")}<select data-af="topic|${a.id}" aria-label="Add topic"><option value="">+ topic…</option>${opts}</select></td><td><button class="btn sm" data-act="del-assess" data-id="${a.id}">Delete</button></td></tr>`).join("")}</tbody></table></div><p class="pg-muted pg-sm">Topics link a weak result to hub lessons and quizzes when interventions are suggested. Dates also set the order of the trend charts.</p></div>`;
}
function PG_tLearners(c,an){
  if(!c.learners.length)return`<div class="pg-card pg-empty"><h3>No learners yet</h3><button class="btn pri" data-act="add-learners">Add learners</button></div>`;
  const f=PG_S.fi;
  let rows=an.learners.slice();
  if(f!=="all")rows=rows.filter(l=>f==="flag"?(l.status==="critical"||l.status==="risk"):l.status===f);
  rows.sort((a,b)=>(PG_S.sortBy==="name"?a.name.localeCompare(b.name):((a.overall==null)-(b.overall==null))||(a.overall-b.overall)));
  let h=`<div class="pg-bar"><div class="chips" style="margin:0">${[["all","All"],["flag","Critical + at risk"],["critical","Critical"],["risk","At risk"],["watch","Watch"],["ontrack","On track"]].map(x=>`<button class="chip" data-act="filt" data-v="${x[0]}" aria-pressed="${f===x[0]}">${x[1]}</button>`).join("")}</div>
<label>Sort<select data-ch="sort"><option value="low"${PG_S.sortBy!=="name"?" selected":""}>Lowest overall first</option><option value="name"${PG_S.sortBy==="name"?" selected":""}>Name A–Z</option></select></label><button class="btn sm" data-act="add-learners">Add learners</button></div>`;
  h+=`<div class="pg-tw"><table><thead><tr><th>Learner</th><th class="n">Rank</th><th class="n">Overall</th><th class="n">Bi-weekly</th><th class="n">Formative</th><th class="n">Summative</th><th class="n">Trend</th><th>Status</th></tr></thead><tbody>${rows.map(l=>{
    const tr=l.slope==null?"–":l.slope>=1.5?"▲ rising":l.slope<=-1.5?"▼ falling":"► steady";
    return`<tr class="pg-row${PG_S.lid===l.id?" sel":""}" data-act="open-learner" data-id="${l.id}" tabindex="0"><td><b>${PG_e(l.name)}</b></td><td class="n">${l.rank||"–"}</td><td class="n"><b>${PG_r(l.overall)}</b></td><td class="n">${PG_r(l.byType.bi)}</td><td class="n">${PG_r(l.byType.form)}</td><td class="n">${PG_r(l.byType.sum)}</td><td class="n">${tr}</td><td>${PG_chip(l.status)}</td></tr>`}).join("")||`<tr><td colspan="8" class="pg-muted">No learners match this filter.</td></tr>`}</tbody></table></div>`;
  const L=an.learners.find(l=>l.id===PG_S.lid);
  if(L)h+=PG_learnerDetail(c,an,L);
  return h;
}
function PG_learnerDetail(c,an,L){
  const lrn=c.learners.find(l=>l.id===L.id);
  const ints=c.interventions.filter(i=>i.learnerId===L.id);
  const held=an.assess.filter(a=>a.held);
  let h=`<div class="pg-card" id="pg-detail" style="margin-top:16px"><div class="pg-top" style="justify-content:space-between;align-items:center"><h3 style="margin:0">${PG_e(L.name)} ${PG_chip(L.status)}</h3><button class="btn sm" data-act="close-learner">Close</button></div>
<div class="pg-kpis" style="margin-top:10px">${PG_kpi(PG_r1(L.overall),"Overall")}${PG_kpi(L.rank?L.rank+" / "+an.summary.withData:"–","Class rank")}${PG_kpi(PG_r(L.last3),"Last 3 results")}${PG_kpi(L.slope==null?"–":(L.slope>0?"+":"")+L.slope.toFixed(1),"Trend (pts per assessment)")}</div>
<ul class="pg-l">${L.reasons.map(r=>`<li>${PG_e(r)}</li>`).join("")}</ul>`;
  if(held.length)h+=PCH_line({labels:held.map(a=>a.short),series:[{name:L.name,vals:held.map(a=>L.scores[a.id])},{name:"Class mean",vals:held.map(a=>a.mean),dash:true,color:"muted"}],ref:[{y:an.settings.passMark,label:"Pass "+an.settings.passMark}],title:"Results for "+L.name});
  h+=`<div class="pg-tw" style="margin-top:10px"><table><thead><tr><th>Assessment</th><th class="n">Mark</th><th class="n">%</th><th class="n">Class mean</th><th class="n">Difference</th></tr></thead><tbody>${held.map(a=>{const p=L.scores[a.id],r=L.raw[a.id];const d=p==null?null:p-a.mean;return`<tr><td>${PG_e(a.name)}</td><td class="n">${typeof r==="number"?r+" / "+a.max:r==="A"?"Absent":"Missing"}</td><td class="n">${PG_r(p)}</td><td class="n">${PG_r(a.mean)}</td><td class="n" style="color:${d==null?"inherit":d<0?"var(--bad)":"var(--good)"}">${d==null?"–":(d>0?"+":"")+Math.round(d)}</td></tr>`}).join("")}</tbody></table></div>`;
  if(L.weakTopics.length)h+=`<h3 style="margin-top:12px">Topics below the pass mark</h3><ul class="pg-l">${L.weakTopics.map(t=>`<li>${PG_e(PG_sname(t.s))} ${t.n}: <a href="#${t.s}/u${t.n}">${PG_e(PG_uname(t.s,t.n))}</a> (${t.fails} ${t.fails===1?"assessment":"assessments"}) · <a href="#${t.s}/q${t.n}">topic quiz</a></li>`).join("")}</ul>`;
  h+=`<h3 style="margin-top:12px">Interventions (${ints.length})</h3>${ints.length?ints.map(i=>PG_intCard(c,i,true)).join(""):`<p class="pg-muted">None assigned.</p>`}
<label style="display:block;margin-top:10px"><span class="pg-muted pg-sm" style="font-weight:600">Teacher notes</span><textarea data-ch="lnote" data-id="${L.id}" style="min-height:70px">${PG_e(lrn.notes||"")}</textarea></label>
<div class="pg-acts"><button class="btn pri" data-act="new-int" data-id="${L.id}">Assign intervention</button><button class="btn" data-act="suggest-one" data-id="${L.id}">Suggest interventions</button><button class="btn sm" data-act="rename-learner" data-id="${L.id}">Rename</button><button class="btn sm" data-act="rm-learner" data-id="${L.id}">Remove learner</button></div></div>`;
  return h;
}
function PG_tTrends(c,an){
  const s=an.summary,st=an.settings;
  if(!s.withData)return PG_noAssess(c,an)||`<div class="pg-card"><p>Enter some marks to see trends.</p></div>`;
  const held=an.assess.filter(a=>a.held);
  let h=`<div class="pg-grid"><div class="pg-card"><h3>Class mean, median and pass rate</h3>${PCH_line({labels:held.map(a=>a.short),series:[{name:"Mean %",vals:held.map(a=>a.mean)},{name:"Median %",vals:held.map(a=>a.median),dash:true},{name:"Pass rate %",vals:held.map(a=>a.passRate),color:"good"}],ref:[{y:st.passMark,label:"Pass "+st.passMark}],title:"Class trend"})}</div>
<div class="pg-card"><h3>Average by assessment type</h3>${PCH_bars({labels:["Bi-weekly","Formative","Summative"],vals:[s.byType.bi,s.byType.form,s.byType.sum],colors:["accent","c2","bad"],max:100,ref:[{y:st.passMark,label:"Pass"}],title:"Average by assessment type",unit:"%"})}</div></div>`;
  h+=`<div class="pg-grid"><div class="pg-card"><h3>Status counts</h3>${PCH_stack({segments:[{label:"Critical",v:s.counts.critical,color:"bad"},{label:"At risk",v:s.counts.risk,color:"warn"},{label:"Watch",v:s.counts.watch,color:"c2"},{label:"On track",v:s.counts.ontrack,color:"good"}],title:"Status counts"})}<h3 style="margin-top:14px">Movers</h3>${PG_movers(an)}</div>
<div class="pg-card"><h3>Distribution of overall results</h3>${PCH_bars({labels:["0–9","10–19","20–29","30–39","40–49","50–59","60–69","70–79","80–89","90–100"],vals:s.bands,colors:s.bands.map((_,i)=>i*10+9<st.passMark?"bad":"accent"),title:"Distribution",fmt:v=>v})}</div></div>`;
  const other=PG_S.s==="sem2"?"sem1":"sem2";
  const oa=PROG.analyse(c,PG_S.y,other);
  if(oa.summary.withData){h+=`<div class="pg-card"><h3>Semester comparison</h3>${PCH_bars({labels:["Semester 1","Semester 2"],vals:[PG_S.s==="sem1"?s.mean:oa.summary.mean,PG_S.s==="sem2"?s.mean:oa.summary.mean],max:100,colors:["accent","c2"],ref:[{y:st.passMark,label:"Pass"}],title:"Semester comparison",unit:"%",h:220})}<p class="pg-muted pg-sm">Pass rate: Semester 1 ${PG_r(PG_S.s==="sem1"?s.passRate:oa.summary.passRate)}, Semester 2 ${PG_r(PG_S.s==="sem2"?s.passRate:oa.summary.passRate)}.</p></div>`}
  const all=PROG.get().classes.map(k=>({k,a:PROG.analyse(k,PG_S.y,PG_S.s)})).filter(x=>x.a.summary.withData);
  if(all.length>1)h+=`<div class="pg-card"><h3>Compare classes (${PG_e(PG_S.y)} semester ${PG_S.s==="sem1"?1:2})</h3>${PCH_bars({labels:all.map(x=>x.k.name),vals:all.map(x=>x.a.summary.mean),colors:all.map(x=>x.k.id===c.id?"accent":"muted"),max:100,ref:[{y:st.passMark,label:"Pass"}],title:"Class comparison",unit:"%"})}</div>`;
  h+=`<div class="pg-card"><h3>Assessment statistics</h3><div class="pg-tw"><table><thead><tr><th>Assessment</th><th>Type</th><th class="n">Marked</th><th class="n">Absent</th><th class="n">Mean</th><th class="n">Median</th><th class="n">Pass rate</th><th class="n">High</th><th class="n">Low</th></tr></thead><tbody>${an.assess.map(a=>`<tr><td>${PG_e(a.name)}</td><td>${PG_TYPE[a.type]}</td><td class="n">${a.entered}</td><td class="n">${a.absent}</td><td class="n">${PG_r(a.mean)}</td><td class="n">${PG_r(a.median)}</td><td class="n">${PG_r(a.passRate)}</td><td class="n">${PG_r(a.high)}</td><td class="n">${PG_r(a.low)}</td></tr>`).join("")}</tbody></table></div></div>`;
  const tier=p=>p==null?"":p<st.passMark?"pg-h0":p<st.watchMark?"pg-h1":p>=80?"pg-h3":"pg-h2";
  h+=`<div class="pg-card"><h3>Heat map: every learner, every assessment</h3><div class="pg-tw"><table class="pg-hm"><thead><tr><th>Learner</th>${held.map(a=>`<th title="${PG_e(a.name)}">${PG_e(a.short)}</th>`).join("")}<th>Overall</th></tr></thead><tbody>${an.learners.slice().sort((a,b)=>(a.overall==null)-(b.overall==null)||a.overall-b.overall).map(l=>`<tr><td>${PG_e(l.name)}</td>${held.map(a=>{const p=l.scores[a.id];return`<td class="${tier(p)}">${p==null?(l.raw[a.id]==="A"?"A":"·"):Math.round(p)}</td>`}).join("")}<td class="${tier(l.overall)}">${PG_r(l.overall)}</td></tr>`).join("")}</tbody></table></div><p class="pg-muted pg-sm">Red: below ${st.passMark}%. Amber: below ${st.watchMark}%. Green: 80% or above. A = absent, · = not recorded.</p></div>`;
  return h;
}
function PG_movers(an){
  const ls=an.learners.filter(l=>l.drop!=null);
  const dn=ls.slice().sort((a,b)=>b.drop-a.drop).filter(l=>l.drop>=5).slice(0,4);
  const up=ls.slice().sort((a,b)=>a.drop-b.drop).filter(l=>l.drop<=-5).slice(0,4);
  const li=(l,sg)=>`<li>${PG_e(l.name)}: ${PG_r(l.earlier)} → ${PG_r(l.last3)} (${sg}${Math.abs(Math.round(l.drop))})</li>`;
  return`<p class="pg-sm" style="margin:0"><b>Falling</b> (earlier results vs last 3)</p><ul class="pg-l">${dn.map(l=>li(l,"−")).join("")||"<li class='pg-muted'>None</li>"}</ul><p class="pg-sm" style="margin:0"><b>Improving</b></p><ul class="pg-l">${up.map(l=>li(l,"+")).join("")||"<li class='pg-muted'>None</li>"}</ul>`;
}
function PG_intCard(c,i,compact){
  const lr=c.learners.find(l=>l.id===i.learnerId);
  const over=i.status!=="done"&&i.due&&i.due<new Date().toISOString().slice(0,10);
  const href=PG_href(i.resource);
  return`<div class="pg-card pg-int ${over?"over":""} ${i.status==="done"?"done":""}"><div class="pg-top" style="justify-content:space-between"><div><b>${PG_e(i.title)}</b>${compact?"":` – ${PG_e(lr?lr.name:"(removed learner)")}`}<div class="pg-muted pg-sm">${PG_e(i.type)}${i.due?" · due "+PG_e(i.due):""}${over?" · <b style='color:var(--bad)'>overdue</b>":""}${i.before!=null?" · result "+PG_r(i.before)+(i.after!=null?" → "+PG_r(i.after):""):""}</div></div>
<div><select data-ch="int-status" data-id="${i.id}" aria-label="Status">${["assigned","in progress","done"].map(s=>`<option${i.status===s?" selected":""}>${s}</option>`).join("")}</select></div></div>
${i.resource&&href?`<p style="margin:6px 0"><a href="${href}">${PG_e(PG_resLabel(i.resource))} →</a></p>`:i.resource&&i.resource.label?`<p style="margin:6px 0">${PG_e(i.resource.label)}</p>`:""}
${i.note?`<p class="pg-sm" style="margin:6px 0">${PG_e(i.note)}</p>`:""}
<div class="pg-acts" style="margin-top:6px"><button class="btn sm" data-act="edit-int" data-id="${i.id}">Edit</button><button class="btn sm" data-act="del-int" data-id="${i.id}">Delete</button></div></div>`;
}
function PG_tInterv(c,an){
  const f=PG_S.iflt,ints=c.interventions.filter(i=>f==="all"||(f==="open"?i.status!=="done":i.status==="done"));
  const open=c.interventions.filter(i=>i.status!=="done").length,done=c.interventions.length-open;
  const today=new Date().toISOString().slice(0,10),over=c.interventions.filter(i=>i.status!=="done"&&i.due&&i.due<today).length;
  let h=`<div class="pg-kpis">${PG_kpi(open,"Open")}${PG_kpi(over,"Overdue")}${PG_kpi(done,"Completed")}${PG_kpi(PG_r(PG_improved(c,an)),"Of completed: improved since assigned")}</div>
<div class="pg-bar"><div class="chips" style="margin:0">${[["open","Open"],["done","Completed"],["all","All"]].map(x=>`<button class="chip" data-act="iflt" data-v="${x[0]}" aria-pressed="${f===x[0]}">${x[1]}</button>`).join("")}</div><button class="btn pri sm" data-act="suggest-all">Suggest for flagged learners</button><button class="btn sm" data-act="new-int">+ Assign manually</button></div>`;
  h+=ints.length?ints.slice().sort((a,b)=>(a.due||"9999").localeCompare(b.due||"9999")).map(i=>PG_intCard(c,i,false)).join(""):`<div class="pg-card pg-empty"><p class="pg-muted">No interventions here yet. Use <b>Suggest for flagged learners</b> to draft extra work from each learner's weak topics, linked to hub lessons, quizzes and exam questions.</p></div>`;
  return h;
}
function PG_improved(c,an){
  const d=c.interventions.filter(i=>i.status==="done"&&i.before!=null&&i.after!=null);
  return d.length?d.filter(i=>i.after>i.before).length/d.length*100:null;
}
function PG_tExport(c,an){
  const hasRep=typeof PROGREPORT!=="undefined"&&PROGREPORT&&typeof PROGREPORT.build==="function";
  return`<div class="pg-card"><h3>Class report</h3><p class="pg-muted">A report for ${PG_e(c.name)}, ${PG_e(PG_S.y)} Semester ${PG_S.s==="sem1"?1:2}: summary, charts, assessment statistics, learners flagged and the intervention plan.</p>
<label style="display:flex;gap:8px;align-items:center;margin:6px 0"><input type="checkbox" id="pg-o-names" checked style="width:22px;height:22px"> Include learner names</label>
<label style="display:flex;gap:8px;align-items:center;margin:6px 0"><input type="checkbox" id="pg-o-int" checked style="width:22px;height:22px"> Include intervention plan</label>
<div class="pg-acts"><button class="btn pri" data-act="report" data-v="pdf"${hasRep?"":" disabled"}>Export PDF</button><button class="btn pri" data-act="report" data-v="docx"${hasRep?"":" disabled"}>Export Word</button></div>${hasRep?"":`<p class="pg-sm" style="color:var(--warn)">The report builder is not available in this build.</p>`}</div>
<div class="pg-card"><h3>Data</h3><div class="pg-acts" style="margin-top:0"><button class="btn" data-act="csv-marks">Marks (CSV)</button><button class="btn" data-act="csv-analysis">Analysis (CSV)</button><button class="btn" data-act="backup">Backup all classes (JSON)</button><button class="btn" data-act="restore">Restore from backup</button></div>
<p class="pg-muted pg-sm">Learner names are stored only in this browser on this device. Backups are plain files: keep them somewhere secure and follow your school's data protection policy.</p></div>
${c.demo?`<div class="pg-card"><h3>Demo class</h3><p class="pg-muted">This class is made-up sample data.</p><button class="btn" data-act="del-class" data-id="${c.id}">Remove demo class</button></div>`:""}`;
}

/* ----- modals ----- */
function PG_modal(inner){return`<div class="pg-modal" data-act="mbg"><div class="pg-dlg" role="dialog" aria-modal="true">${inner}</div></div>`}
function PG_closeModal(){PG_S.modal=null;PG_render(true)}
function PG_mClass(edit){
  const c=edit?PG_cls():null;
  return()=>PG_modal(`<h3>${c?"Class details":"New class"}</h3><div class="pg-f2"><label>Class name<input type="text" id="pg-cn" value="${PG_e(c?c.name:"")}" placeholder="e.g. 10A Chemistry"></label><label>Subject<select id="pg-cs">${[["chem","Chemistry"],["bio","Biology 0610"],["alevel","Biology 9700"],["other","Other / mixed"]].map(x=>`<option value="${x[0]}"${c&&c.subject===x[0]?" selected":""}>${x[1]}</option>`).join("")}</select></label><label>Year group<input type="text" id="pg-cy" value="${PG_e(c?c.yearGroup||"":"")}" placeholder="e.g. Grade 10"></label></div>
${c?"":`<label>Learner names (optional, one per line)<textarea id="pg-cl" placeholder="Paste a class list"></textarea></label>`}
<div class="pg-acts"><button class="btn pri" data-act="save-class" data-edit="${c?1:0}">${c?"Save":"Create class"}</button>${c?`<button class="btn" data-act="del-class" data-id="${c.id}">Delete class</button>`:""}<button class="btn" data-act="close">Cancel</button></div>`);
}
function PG_mSettings(){
  return()=>{const s=PROG.get().settings;return PG_modal(`<h3>Settings (apply to all classes)</h3><div class="pg-f2"><label>Pass mark %<input type="number" id="pg-s-pass" min="0" max="100" value="${s.passMark}"></label><label>Watch level % (warning below this)<input type="number" id="pg-s-watch" min="0" max="100" value="${s.watchMark}"></label><label>Sharp drop (points)<input type="number" id="pg-s-drop" min="1" max="100" value="${s.dropPts}"></label><label>Current academic year<input type="text" id="pg-s-year" value="${PG_e(s.academicYear)}"></label></div>
<h3 style="margin-top:6px">Weights for the overall result</h3><div class="pg-f2"><label>Bi-weekly tests %<input type="number" id="pg-w-bi" min="0" max="100" value="${s.weights.bi}"></label><label>Formative %<input type="number" id="pg-w-form" min="0" max="100" value="${s.weights.form}"></label><label>Summative %<input type="number" id="pg-w-sum" min="0" max="100" value="${s.weights.sum}"></label></div>
<p class="pg-muted pg-sm">Weights are re-balanced automatically when a type has no results yet. Defaults: 30 / 30 / 40.</p><div class="pg-acts"><button class="btn pri" data-act="save-settings">Save</button><button class="btn" data-act="close">Cancel</button></div>`)};
}
function PG_mConfirm(msg,act,id){return()=>PG_modal(`<h3>Please confirm</h3><p>${PG_e(msg)}</p><div class="pg-acts"><button class="btn pri" data-act="${act}" data-id="${id||""}" data-ok="1">Yes, continue</button><button class="btn" data-act="close">Cancel</button></div>`)}
function PG_mLearners(){return()=>PG_modal(`<h3>Add learners</h3><label>One name per line (paste a class list)<textarea id="pg-nl" placeholder="Amara Okafor&#10;Brian Mwale"></textarea></label><div class="pg-acts"><button class="btn pri" data-act="save-learners">Add</button><button class="btn" data-act="close">Cancel</button></div>`)}
function PG_mName(id){const l=PG_cls().learners.find(x=>x.id===id);return()=>PG_modal(`<h3>Rename learner</h3><label>Name<input type="text" id="pg-rn" value="${PG_e(l.name)}"></label><div class="pg-acts"><button class="btn pri" data-act="save-name" data-id="${id}">Save</button><button class="btn" data-act="close">Cancel</button></div>`)}
function PG_mPaste(){
  const an=PG_an();
  return()=>PG_modal(`<h3>Paste marks</h3><p class="pg-muted pg-sm">Copy cells from Excel or Sheets in the same learner order as the Marks grid (${an.learners.length} rows). Each column goes to the next assessment from the one chosen. Use A for absent. Blank cells are skipped.</p><label>Start at assessment<select id="pg-pa">${an.assess.map(a=>`<option value="${a.id}">${PG_e(a.name)} (/${a.max})</option>`).join("")}</select></label><label>Marks<textarea id="pg-pt" placeholder="14&#9;17&#10;9&#9;A"></textarea></label><div class="pg-acts"><button class="btn pri" data-act="do-paste">Apply</button><button class="btn" data-act="close">Cancel</button></div>`);
}
function PG_resOptions(s,n,sel){
  const u=PG_units(s).find(x=>x.n===n);if(!u)return"";
  let o=`<option value="topic">Topic page</option><option value="quiz">Topical quiz</option><option value="papers">Exam questions</option><option value="cards">Flashcards</option><option value="practical">Practicals</option>`;
  (u.lessons||[]).forEach((l,i)=>{o+=`<option value="lesson:${i+1}">Lesson ${i+1}: ${PG_e(l.t||l.title||"")}</option>`});
  return o.replace(`value="${sel}"`,`value="${sel}" selected`);
}
function PG_mInt(learnerId,editId){
  const c=PG_cls(),ex=editId?c.interventions.find(i=>i.id===editId):null;
  const lid=ex?ex.learnerId:learnerId||"";
  const r=ex&&ex.resource&&ex.resource.kind!=="custom"?ex.resource:null;
  const s0=r?r.s:PG_subjectKeys(c)[0],n0=r?r.n:(PG_units(s0)[0]||{}).n;
  const sel=r?(r.kind==="lesson"?"lesson:"+r.l:r.kind):"topic";
  const today=new Date(Date.now()+14*864e5).toISOString().slice(0,10);
  return()=>PG_modal(`<h3>${ex?"Edit":"Assign"} intervention</h3><div class="pg-f2"><label>Learner<select id="pg-i-l">${c.learners.map(l=>`<option value="${l.id}"${l.id===lid?" selected":""}>${PG_e(l.name)}</option>`).join("")}</select></label><label>Type<select id="pg-i-t">${PG_ITYPES.map(t=>`<option${ex&&ex.type===t?" selected":""}>${t}</option>`).join("")}</select></label></div>
<label>Title<input type="text" id="pg-i-title" value="${PG_e(ex?ex.title:"")}" placeholder="e.g. Redo the Atoms quiz and review lesson notes"></label>
<div class="pg-f2"><label>Hub resource: subject<select id="pg-i-s" data-ch="int-s">${["chem","bio","alevel"].map(k=>`<option value="${k}"${s0===k?" selected":""}>${PG_e(PG_sname(k))}</option>`).join("")}<option value="none"${ex&&!r?" selected":""}>No hub resource</option></select></label><label>Topic<select id="pg-i-n" data-ch="int-n">${PG_units(s0).map(u=>`<option value="${u.n}"${u.n===n0?" selected":""}>${u.n}. ${PG_e(u.name||u.t||"")}</option>`).join("")}</select></label></div>
<label>Resource<select id="pg-i-r">${PG_resOptions(s0,n0,sel)}</select></label>
<div class="pg-f2"><label>Due date<input type="date" id="pg-i-d" value="${PG_e(ex?ex.due||"":today)}"></label><label>Status<select id="pg-i-st">${["assigned","in progress","done"].map(x=>`<option${ex&&ex.status===x?" selected":""}>${x}</option>`).join("")}</select></label></div>
<label>Notes for the learner / teacher<textarea id="pg-i-note" style="min-height:70px">${PG_e(ex?ex.note||"":"")}</textarea></label>
<div class="pg-acts"><button class="btn pri" data-act="save-int" data-id="${editId||""}">Save</button><button class="btn" data-act="close">Cancel</button></div>`);
}
function PG_suggest(c,an,L){
  const out=[],S=an.settings;
  const subj=PG_subjectKeys(c)[0];
  L.weakTopics.slice(0,2).forEach(t=>{
    const nm=PG_uname(t.s,t.n);
    out.push({type:"Extra practice",title:"Retake the topical quiz: "+nm,resource:{s:t.s,kind:"quiz",n:t.n},note:"Below the pass mark in "+t.fails+(t.fails===1?" assessment":" assessments")+" covering this topic. Complete the quiz, then correct errors."});
    out.push({type:"Revision session",title:"Review the notes: "+nm,resource:{s:t.s,kind:"topic",n:t.n},note:"Work through the lesson pages and make a one-page summary."});
  });
  if(!L.weakTopics.length&&(L.status==="critical"||L.status==="risk"||L.status==="watch"))
    out.push({type:"Extra practice",title:"Exam-style questions on recent topics",resource:{s:subj,kind:"papers"},note:"Topics are not recorded for the assessments. Attempt topical questions chosen by the teacher."});
  if(L.missing>0)out.push({type:"Catch-up assessment",title:"Sit the missed assessment"+(L.missing>1?"s":""),resource:null,note:L.missing+" result(s) missing with no absence recorded."});
  if(L.status==="critical"||(L.drop!=null&&L.drop>=S.dropPts))out.push({type:"Parent/guardian contact",title:"Check-in with the learner and parent/guardian",resource:null,note:L.reasons[0]||""});
  if(L.status==="critical")out.push({type:"Small-group support",title:"Weekly small-group revision session",resource:{s:subj,kind:"cards"},note:"Short sessions on core ideas using flashcards, then review progress in four weeks."});
  return out.slice(0,5);
}
function PG_mSuggest(ids){
  const c=PG_cls(),an=PG_an(c);
  const ls=ids?an.learners.filter(l=>ids.includes(l.id)):an.learners.filter(l=>l.status==="critical"||l.status==="risk");
  let n=0;
  const body=ls.map(L=>{
    const existing=c.interventions.filter(i=>i.learnerId===L.id&&i.status!=="done").map(i=>i.title);
    const sg=PG_suggest(c,an,L).filter(x=>!existing.includes(x.title));
    return`<div class="pg-card" style="margin-bottom:8px"><b>${PG_e(L.name)}</b> ${PG_chip(L.status)} <span class="pg-muted pg-sm">${PG_r(L.overall)}</span>${sg.length?sg.map(x=>{const k=n++;return`<label style="flex-direction:row;gap:10px;align-items:flex-start;margin:6px 0 0;color:var(--ink);font-weight:500"><input type="checkbox" data-sg="${L.id}|${k}" checked style="width:22px;height:22px;flex:none"><span><b>${PG_e(x.title)}</b><br><span class="pg-muted pg-sm">${PG_e(x.type)}${x.resource?" · "+PG_e(PG_resLabel(x.resource)):""}</span></span></label>`}).join(""):`<p class="pg-muted pg-sm" style="margin:6px 0 0">Nothing new to suggest (open interventions already exist).</p>`}</div>`}).join("");
  PG_S.sug=ls.map(L=>{const existing=c.interventions.filter(i=>i.learnerId===L.id&&i.status!=="done").map(i=>i.title);return{id:L.id,items:PG_suggest(c,an,L).filter(x=>!existing.includes(x.title))}});
  return()=>PG_modal(`<h3>Suggested interventions</h3><p class="pg-muted pg-sm">Drafted from each learner's results and weak topics. Untick any you do not want. Due date is set two weeks ahead and can be edited later.</p>${body||"<p class='pg-muted'>No flagged learners.</p>"}<div class="pg-acts"><button class="btn pri" data-act="assign-sug">Assign selected</button><button class="btn" data-act="close">Cancel</button></div>`);
}

/* ----- actions ----- */
function PG_val(id){const e=document.getElementById(id);return e?e.value:""}
function PG_parseMark(s,max){
  s=String(s).trim();
  if(s==="")return{v:null};
  if(/^(a|abs|absent)$/i.test(s))return{v:"A"};
  const n=parseFloat(s.replace(",","."));
  if(!isFinite(n)||n<0||n>max||!/^-?[\d.,]+$/.test(s))return{err:true};
  return{v:n};
}
function PG_setMark(c,lid,aid,v){
  const sm=PROG.ensureSem(c,PG_S.y,PG_S.s);sm.marks[lid]=sm.marks[lid]||{};
  if(v==null)delete sm.marks[lid][aid];else sm.marks[lid][aid]=v;
}
function PG_refreshGrid(){
  const c=PG_cls(),an=PG_an(c);
  an.learners.forEach(l=>{const e=PG_A.querySelector(`[data-ov="${l.id}"]`);if(e)e.textContent=PG_r(l.overall)});
  an.assess.forEach(a=>{const e=PG_A.querySelector(`[data-cm="${a.id}"]`);if(e)e.textContent=PG_r(a.mean)});
  const e=PG_A.querySelector("[data-cmo]");if(e)e.textContent=PG_r(an.summary.mean);
}
function PG_download(name,data){return PG_env.saveFile(name,data)}
function PG_csv(rows){return rows.map(r=>r.map(v=>{v=v==null?"":String(v);return/[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v}).join(",")).join("\r\n")}
function PG_fname(c,suffix,ext){return(c.name.replace(/[^\w\-]+/g,"_")+"_"+PG_S.y+"_S"+(PG_S.s==="sem1"?1:2)+"_"+suffix+"."+ext).replace(/_+/g,"_")}
function PG_expandSem(c){
  const sm=PROG.ensureSem(c,PG_S.y,PG_S.s);
  return sm;
}
const PG_ACT={
  "new-class":()=>{PG_S.modal=PG_mClass(false);PG_render(true)},
  "edit-class":()=>{PG_S.modal=PG_mClass(true);PG_render(true)},
  settings:()=>{PG_S.modal=PG_mSettings();PG_render(true)},
  close:()=>PG_closeModal(),
  demo:()=>{const c=PG_demo();PROG.get().classes.push(c);PG_S.cid=c.id;PG_S.tab="overview";PG_save();PG_ui();PG_render();PG_toast("Demo class loaded. Remove it from the Export tab when you are done.")},
  sem:el=>{PG_S.s=el.dataset.v;PG_ui();PG_render(true)},
  tab:el=>{PG_S.tab=el.dataset.v;PG_ui();PG_render()},
  "save-class":el=>{
    const name=PG_val("pg-cn").trim();if(!name){PG_toast("Enter a class name");return}
    const st=PROG.get();
    if(el.dataset.edit==="1"){const c=PG_cls();c.name=name;c.subject=PG_val("pg-cs");c.yearGroup=PG_val("pg-cy").trim()}
    else{
      const names=PG_val("pg-cl").split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
      const c={id:PROG.uid("C"),name,subject:PG_val("pg-cs"),yearGroup:PG_val("pg-cy").trim(),learners:names.map(n=>({id:PROG.uid("L"),name:n})),years:{},interventions:[]};
      st.classes.push(c);PG_S.cid=c.id;
    }
    PG_S.modal=null;PG_save();PG_ui();PG_render();
  },
  "del-class":el=>{
    if(!el.dataset.ok){PG_S.modal=PG_mConfirm("Delete this class and all its marks and interventions? This cannot be undone. Export a backup first if unsure.","del-class",el.dataset.id);PG_render(true);return}
    const st=PROG.get();st.classes=st.classes.filter(c=>c.id!==el.dataset.id);PG_S.cid=st.classes[0]?st.classes[0].id:null;PG_S.modal=null;PG_S.lid=null;PG_save();PG_ui();PG_render();
  },
  "save-settings":()=>{
    const s=PROG.get().settings,n=id=>Math.max(0,Math.min(100,+PG_val(id)||0));
    s.passMark=n("pg-s-pass");s.watchMark=Math.max(s.passMark,n("pg-s-watch"));s.dropPts=Math.max(1,+PG_val("pg-s-drop")||15);
    const y=PG_val("pg-s-year").trim();if(y)s.academicYear=y;
    const w={bi:n("pg-w-bi"),form:n("pg-w-form"),sum:n("pg-w-sum")};
    if(w.bi+w.form+w.sum<=0){PG_toast("At least one weight must be above zero");return}
    s.weights=w;PG_S.modal=null;PG_save();PG_render(true);
  },
  "setup-assess":()=>{const c=PG_cls(),sm=PG_expandSem(c);sm.assess=PG_defaultAssess();PG_save();PG_render(true)},
  "copy-assess":()=>{const c=PG_cls(),src=PROG.sem(c,PG_S.y,"sem1"),sm=PG_expandSem(c);sm.assess=src.assess.map(a=>Object.assign({},a,{id:PROG.uid("A"),date:"",topics:(a.topics||[]).slice()}));PG_save();PG_render(true)},
  "add-assess":()=>{const c=PG_cls(),sm=PG_expandSem(c);const n=sm.assess.filter(a=>a.type==="bi").length+1;sm.assess.push({id:PROG.uid("A"),type:"bi",name:"Bi-weekly test "+n,date:"",max:20,topics:[]});PG_S.editA=true;PG_save();PG_render(true)},
  "edit-assess":()=>{PG_S.editA=!PG_S.editA;PG_render(true)},
  "del-assess":el=>{
    if(!el.dataset.ok){PG_S.modal=PG_mConfirm("Delete this assessment and all marks entered for it?","del-assess",el.dataset.id);PG_render(true);return}
    const c=PG_cls(),sm=PG_expandSem(c);sm.assess=sm.assess.filter(a=>a.id!==el.dataset.id);Object.keys(sm.marks).forEach(l=>delete sm.marks[l][el.dataset.id]);PG_S.modal=null;PG_save();PG_render(true);
  },
  "rm-topic":el=>{const c=PG_cls(),a=PG_expandSem(c).assess.find(x=>x.id===el.dataset.id);a.topics.splice(+el.dataset.i,1);PG_save();PG_render(true)},
  "add-learners":()=>{PG_S.modal=PG_mLearners();PG_render(true)},
  "save-learners":()=>{
    const c=PG_cls(),names=PG_val("pg-nl").split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
    if(!names.length){PG_toast("Enter at least one name");return}
    names.forEach(n=>c.learners.push({id:PROG.uid("L"),name:n}));PG_S.modal=null;PG_save();PG_render(true);PG_toast(names.length+" learner(s) added");
  },
  "rename-learner":el=>{PG_S.modal=PG_mName(el.dataset.id);PG_render(true)},
  "save-name":el=>{const l=PG_cls().learners.find(x=>x.id===el.dataset.id),n=PG_val("pg-rn").trim();if(n){l.name=n;PG_S.modal=null;PG_save();PG_render(true)}},
  "rm-learner":el=>{
    if(!el.dataset.ok){PG_S.modal=PG_mConfirm("Remove this learner and their marks and interventions from the class?","rm-learner",el.dataset.id);PG_render(true);return}
    const c=PG_cls(),id=el.dataset.id;c.learners=c.learners.filter(l=>l.id!==id);c.interventions=c.interventions.filter(i=>i.learnerId!==id);
    Object.values(c.years).forEach(Y=>Object.values(Y).forEach(sm=>{if(sm.marks)delete sm.marks[id]}));
    PG_S.lid=null;PG_S.modal=null;PG_save();PG_render(true);
  },
  "open-learner":el=>{PG_S.lid=el.dataset.id;PG_S.tab="learners";PG_render();const d=document.getElementById("pg-detail");if(d)d.scrollIntoView({block:"start"})},
  "close-learner":()=>{PG_S.lid=null;PG_render(true)},
  filt:el=>{PG_S.fi=el.dataset.v;PG_render(true)},
  iflt:el=>{PG_S.iflt=el.dataset.v;PG_render(true)},
  paste:()=>{PG_S.modal=PG_mPaste();PG_render(true)},
  "do-paste":()=>{
    const c=PG_cls(),an=PG_an(c),ord=an.assess,start=ord.findIndex(a=>a.id===PG_val("pg-pa"));
    const lines=PG_val("pg-pt").split(/\r?\n/).filter((l,i,a)=>!(i===a.length-1&&l===""));
    let ok=0,bad=0;
    lines.slice(0,an.learners.length).forEach((ln,ri)=>{
      ln.split(/\t|;/).forEach((cell,ci)=>{
        const a=ord[start+ci];if(!a)return;
        const r=PG_parseMark(cell,a.max);
        if(r.err){bad++;return}
        if(r.v==null)return;
        PG_setMark(c,an.learners[ri].id,a.id,r.v);ok++;
      });
    });
    PG_S.modal=null;PG_save();PG_render(true);PG_toast(ok+" marks applied"+(bad?", "+bad+" invalid skipped":""));
  },
  "new-int":el=>{PG_S.modal=PG_mInt(el.dataset.id||"");PG_render(true)},
  "edit-int":el=>{PG_S.modal=PG_mInt("",el.dataset.id);PG_render(true)},
  "del-int":el=>{const c=PG_cls();c.interventions=c.interventions.filter(i=>i.id!==el.dataset.id);PG_save();PG_render(true)},
  "save-int":el=>{
    const c=PG_cls(),an=PG_an(c);
    const lid=PG_val("pg-i-l");if(!lid){PG_toast("Choose a learner");return}
    const title=PG_val("pg-i-title").trim();if(!title){PG_toast("Enter a title");return}
    const s=PG_val("pg-i-s"),n=+PG_val("pg-i-n"),rv=PG_val("pg-i-r");
    let resource=null;
    if(s!=="none"){const lp=rv.startsWith("lesson:");resource={s,kind:lp?"lesson":rv,n,l:lp?+rv.split(":")[1]:undefined};if(!/lesson|quiz|topic/.test(resource.kind))delete resource.n;resource.label=PG_resLabelFor(resource)}
    const L=an.learners.find(l=>l.id===lid);
    const rec={learnerId:lid,type:PG_val("pg-i-t"),title,resource,due:PG_val("pg-i-d"),status:PG_val("pg-i-st"),note:PG_val("pg-i-note").trim()};
    if(el.dataset.id){const i=c.interventions.find(x=>x.id===el.dataset.id);const was=i.status;Object.assign(i,rec);if(rec.status==="done"&&was!=="done")i.after=L?L.overall:null}
    else{rec.id=PROG.uid("I");rec.created=new Date().toISOString().slice(0,10);rec.before=L?L.overall:null;if(rec.status==="done")rec.after=rec.before;c.interventions.push(rec)}
    PG_S.modal=null;PG_save();PG_render(true);
  },
  "suggest-one":el=>{PG_S.modal=PG_mSuggest([el.dataset.id]);PG_render(true)},
  "suggest-all":()=>{PG_S.modal=PG_mSuggest(null);PG_render(true)},
  "assign-sug":()=>{
    const c=PG_cls(),an=PG_an(c),due=new Date(Date.now()+14*864e5).toISOString().slice(0,10),today=new Date().toISOString().slice(0,10);let k=0;
    (PG_S.sug||[]).forEach(g=>{
      const L=an.learners.find(l=>l.id===g.id);
      g.items.forEach((x,j)=>{
        const cb=PG_A.querySelector(`[data-sg="${g.id}|${PG_S.sug.slice(0,PG_S.sug.indexOf(g)).reduce((s,q)=>s+q.items.length,0)+j}"]`);
        if(cb&&cb.checked){c.interventions.push({id:PROG.uid("I"),learnerId:g.id,type:x.type,title:x.title,resource:x.resource?Object.assign({},x.resource,{label:PG_resLabelFor(x.resource)}):null,due,status:"assigned",note:x.note,created:today,before:L?L.overall:null});k++}
      });
    });
    PG_S.modal=null;PG_S.sug=null;PG_save();PG_S.tab="interventions";PG_render();PG_toast(k+" intervention(s) assigned");
  },
  backup:()=>{PG_download("learner-progress-backup-"+new Date().toISOString().slice(0,10)+".json",JSON.stringify(PROG.get(),null,1)).then(()=>{}).catch(()=>{})},
  restore:()=>{
    const f=document.createElement("input");f.type="file";f.accept=".json,application/json";
    f.onchange=()=>{const file=f.files[0];if(!file)return;const r=new FileReader();r.onload=()=>{
      try{const d=JSON.parse(r.result);if(!d||!Array.isArray(d.classes))throw 0;
        const cur=PROG.get();const have=new Set(cur.classes.map(c=>c.id));let add=0;
        d.classes.forEach(c=>{if(!have.has(c.id)){cur.classes.push(c);add++}else{const i=cur.classes.findIndex(x=>x.id===c.id);cur.classes[i]=c;add++}});
        if(d.settings)cur.settings=Object.assign({},cur.settings,d.settings);
        PROG.load&&0;PG_save();PG_S.cid=PG_S.cid||(cur.classes[0]&&cur.classes[0].id);PG_render();PG_toast(add+" class(es) restored");
      }catch(e){PG_toast("That file is not a valid progress backup")}};r.readAsText(file)};
    f.click();
  },
  "csv-marks":()=>{
    const c=PG_cls(),an=PG_an(c),sm=PROG.sem(c,PG_S.y,PG_S.s);
    const rows=[["Learner"].concat(an.assess.map(a=>a.name+" (/"+a.max+")"))];
    an.learners.forEach(l=>rows.push([l.name].concat(an.assess.map(a=>{const v=(sm.marks[l.id]||{})[a.id];return v==null?"":v}))));
    PG_download(PG_fname(c,"marks","csv"),"﻿"+PG_csv(rows));
  },
  "csv-analysis":()=>{
    const c=PG_cls(),an=PG_an(c);
    const rows=[["Learner","Rank","Overall %","Bi-weekly %","Formative %","Summative %","Last 3 %","Trend (pts/assessment)","Status","Reasons"]];
    an.learners.forEach(l=>rows.push([l.name,l.rank||"",l.overall==null?"":l.overall.toFixed(1),l.byType.bi==null?"":l.byType.bi.toFixed(1),l.byType.form==null?"":l.byType.form.toFixed(1),l.byType.sum==null?"":l.byType.sum.toFixed(1),l.last3==null?"":l.last3.toFixed(1),l.slope==null?"":l.slope.toFixed(2),PG_STATUS[l.status].l,l.reasons.join("; ")]));
    PG_download(PG_fname(c,"analysis","csv"),"﻿"+PG_csv(rows));
  },
  report:async el=>{
    if(typeof PROGREPORT==="undefined"||!PROGREPORT.build){PG_toast("Report builder not available");return}
    const c=PG_cls(),fmt=el.dataset.v,old=el.textContent;
    const nm=document.getElementById("pg-o-names"),it=document.getElementById("pg-o-int");
    const opts={format:fmt,names:nm?nm.checked:true,interventions:it?it.checked:true};
    el.disabled=true;el.textContent="Building…";
    try{
      const res=await PROGREPORT.build(c.id,PG_S.y,PG_S.s,opts);
      const name=(res&&res.filename)||PG_fname(c,"report",fmt==="pdf"?"pdf":"docx");
      await PG_download(name,res&&res.data!==undefined?res.data:res);
    }catch(e){if(!(e&&e.code==="declined"))PG_toast("Could not build the report: "+((e&&e.message)||e))}
    el.disabled=false;el.textContent=old;
  },
  mbg:(el,ev)=>{if(ev.target===el)PG_closeModal()}
};
function PG_resLabelFor(r){
  const nm=r.n?PG_uname(r.s,r.n):"";
  switch(r.kind){case"lesson":{const u=PG_units(r.s).find(x=>x.n===r.n),l=u&&u.lessons[r.l-1];return"Lesson: "+(l?(l.t||l.title):nm)}case"quiz":return"Topical quiz: "+nm;case"topic":return"Topic: "+nm;case"papers":return"Exam questions";case"cards":return"Flashcards";case"practical":return"Practicals";default:return""}
}
function PG_onClick(ev){
  const el=ev.target.closest("[data-act]");if(!el||!PG_A.contains(el))return;
  const a=PG_ACT[el.dataset.act];if(!a)return;
  if(el.tagName==="A")return;
  if(el.dataset.act==="mbg"&&ev.target!==el)return;
  ev.stopPropagation();a(el,ev);
}
function PG_onChange(ev){
  const t=ev.target;
  if(t.dataset.mk){
    const[lid,aid]=t.dataset.mk.split("|"),c=PG_cls(),a=PROG.sem(c,PG_S.y,PG_S.s).assess.find(x=>x.id===aid);
    const r=PG_parseMark(t.value,a.max);
    if(r.err){t.classList.add("bad");t.title="Enter 0 to "+a.max+" or A";PG_toast("Mark must be between 0 and "+a.max+", or A for absent");return}
    t.classList.remove("bad");t.title="";t.classList.toggle("abs",r.v==="A");
    if(r.v==="A")t.value="A";
    PG_setMark(c,lid,aid,r.v);PG_save();PG_refreshGrid();return;
  }
  if(t.dataset.af){
    const[f,id]=t.dataset.af.split("|"),c=PG_cls(),a=PROG.ensureSem(c,PG_S.y,PG_S.s).assess.find(x=>x.id===id);
    if(f==="name")a.name=t.value.trim()||a.name;
    else if(f==="type")a.type=t.value;
    else if(f==="date")a.date=t.value;
    else if(f==="max"){const m=+t.value;if(m>0)a.max=m;else{t.value=a.max}}
    else if(f==="topic"&&t.value){const[s,n]=t.value.split(":");a.topics=a.topics||[];if(!a.topics.some(x=>x.s===s&&x.n===+n))a.topics.push({s,n:+n})}
    PG_save();PG_render(true);return;
  }
  const ch=t.dataset.ch;if(!ch)return;
  if(ch==="class"){PG_S.cid=t.value;PG_S.lid=null;PG_ui();PG_render()}
  else if(ch==="year"){PG_S.y=t.value;PG_ui();PG_render()}
  else if(ch==="sort"){PG_S.sortBy=t.value;PG_render(true)}
  else if(ch==="lnote"){const l=PG_cls().learners.find(x=>x.id===t.dataset.id);l.notes=t.value;PG_save()}
  else if(ch==="int-status"){const c=PG_cls(),i=c.interventions.find(x=>x.id===t.dataset.id),was=i.status;i.status=t.value;
    if(t.value==="done"&&was!=="done"){const L=PG_an(c).learners.find(l=>l.id===i.learnerId);i.after=L?L.overall:null}
    if(t.value!=="done")delete i.after;PG_save();PG_render(true)}
  else if(ch==="int-s"){
    const s=t.value,n=document.getElementById("pg-i-n"),r=document.getElementById("pg-i-r");
    if(s==="none"){n.innerHTML="";r.innerHTML="";return}
    n.innerHTML=PG_units(s).map(u=>`<option value="${u.n}">${u.n}. ${PG_e(u.name||u.t||"")}</option>`).join("");
    r.innerHTML=PG_resOptions(s,+n.value,"topic");
  }
  else if(ch==="int-n"){document.getElementById("pg-i-r").innerHTML=PG_resOptions(PG_val("pg-i-s"),+t.value,"topic")}
}
function PG_onKey(ev){
  const t=ev.target;
  if(t.dataset&&t.dataset.mk&&ev.key==="Enter"){
    ev.preventDefault();t.blur();
    const tr=t.closest("tr").nextElementSibling;
    if(tr){const i=[...t.closest("tr").children].indexOf(t.closest("td"));const nx=tr.children[i]&&tr.children[i].querySelector("input");if(nx){nx.focus();nx.select()}}
  }else if(t.classList&&t.classList.contains("pg-row")&&(ev.key==="Enter"||ev.key===" ")){ev.preventDefault();t.click()}
  else if(ev.key==="Escape"&&PG_S.modal)PG_closeModal();
}
function PROGUI(app,env){
  PG_css();PG_A=app;PG_env=env;
  const st=PROG.load();
  const ui=st.ui||{};
  PG_S={cid:ui.cid||(st.classes[0]&&st.classes[0].id)||null,y:ui.y||st.settings.academicYear,s:ui.s||"sem1",tab:ui.tab||"overview",lid:null,fi:"all",iflt:"open",sortBy:"low",modal:null,editA:false,sug:null};
  if(!PROG.cls(PG_S.cid))PG_S.cid=st.classes[0]?st.classes[0].id:null;
  app.onclick=PG_onClick;app.onchange=PG_onChange;app.onkeydown=PG_onKey;
  PG_render();
}
