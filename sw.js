const VERSION='1.8.5';
const SHELL=`clipnest-shell-${VERSION}`;
const BRAND='clipnest-google-brand-icons-v2';
const SHELL_ASSETS=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./icon-1024.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(SHELL).then(c=>c.addAll(SHELL_ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('clipnest-shell-')&&k!==SHELL).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  // Google Favicons: cache-first, then refresh silently in background. This avoids logo blinking on re-renders.
  if(url.hostname==='www.google.com' && url.pathname.startsWith('/s2/favicons')){
    e.respondWith((async()=>{
      const cache=await caches.open(BRAND);
      const hit=await cache.match(req);
      if(hit){e.waitUntil(fetch(req).then(r=>{if(r&&r.ok||r.type==='opaque')return cache.put(req,r.clone())}).catch(()=>{}));return hit}
      try{const r=await fetch(req);if(r&&(r.ok||r.type==='opaque'))await cache.put(req,r.clone());return r}catch{return new Response('',{status:504})}
    })());
    return;
  }
  if(req.mode==='navigate'){
    e.respondWith(fetch(req).then(r=>{const clone=r.clone();caches.open(SHELL).then(c=>c.put('./index.html',clone));return r}).catch(()=>caches.match('./index.html')));
    return;
  }
  if(url.origin===self.location.origin){
    e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(r=>{const clone=r.clone();caches.open(SHELL).then(c=>c.put(req,clone));return r})));
  }
});