const CACHE_NAME = 'prombez-v3';
const ASSETS = ['index.html', 'manifest.json', 'questions_b211.json', 'questions_b26.json'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS).catch(()=>{})));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('?t=')) { e.respondWith(fetch(e.request)); return; }
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request).catch(() => 
      new Response('<html><body style="font-family:sans-serif;padding:40px;text-align:center;background:#1e3c5c;color:white;"><h1>📡 Нет подключения</h1><p>Проверьте интернет или обновите страницу после появления сети.</p></body></html>', { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
    ))
  );
});
