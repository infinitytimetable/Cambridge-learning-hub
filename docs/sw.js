/* LOTS Cambridge Learning Hub: keeps the hubs on the device so they open offline.
   The saved copy opens first; a fresh copy is checked in the background and used next time. */
const CACHE="lots-hub-v1";
self.addEventListener("install",e=>{self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;
  const u=new URL(r.url);
  const own=u.origin===location.origin,font=/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);
  if(!own&&!font)return;
  e.respondWith((async()=>{
    const c=await caches.open(CACHE),key=own?u.origin+u.pathname:r;
    const hit=await c.match(key);
    const fresh=fetch(r,own?{cache:"no-cache"}:{}).then(res=>{if(res&&(res.ok||res.type==="opaque"))c.put(key,res.clone());return res}).catch(()=>null);
    if(hit){e.waitUntil(fresh);return hit}
    return (await fresh)||new Response("You are offline and this page has not been saved yet. Open it once with internet first.",{status:503,headers:{"Content-Type":"text/plain"}});
  })());
});
