const CACHE_NAME = 'prombez-v3'; // Версия обновлена, чтобы сбросить старый кеш
const urlsToCache = [
  'index.html',
  'manifest.json',
  'tests-config.js',        // ✅ ВАЖНО: конфиг грузится скриптом, должен быть в кеше
  'questions_b211.json',
  'questions_b26.json',
  'questions_b28.json',     
  'icons/icon-152x152.png',
  'icons/icon-167x167.png',
  'icons/icon-180x180.png',
  'icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  console.log('Service Worker устанавливается...');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кеш открыт, кешируем файлы...');
        return Promise.allSettled(
          urlsToCache.map(url => cache.add(url).catch(err => console.warn(`Не закеширован: ${url}`, err)))
        );
      })
      .then(() => console.log('Service Worker установлен'))
      .catch(err => console.error('Ошибка установки SW:', err))
  );
});

self.addEventListener('fetch', event => {
  // Не кешируем запросы с ?t= (обновление вопросов)
  if (event.request.url.includes('?t=')) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const url = new URL(event.request.url);
          // Кешируем только наши файлы или статику
          if (urlsToCache.includes(url.pathname.substring(1)) || 
              event.request.url.match(/\.(png|jpg|jpeg|svg|ico|json|js|css)$/)) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
        }
        return networkResponse;
      }).catch(() => new Response(`
        <html><body style="font-family:sans-serif;padding:40px;text-align:center;background:#1e3c5c;color:white;">
          <h1>📡 Нет подключения</h1>
          <p>Проверьте интернет или обновите страницу после появления сети.</p>
        </body></html>`, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
      );
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker активируется...');
  event.waitUntil(
    caches.keys().then(cacheNames => 
      Promise.all(cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
