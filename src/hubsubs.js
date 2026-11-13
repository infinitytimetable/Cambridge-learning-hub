/* ===== hub edition: remove subjects that are not part of this hub ===== */
Object.keys(SUBJ).forEach(k=>{if(!HUB.subs.includes(k))delete SUBJ[k]});
