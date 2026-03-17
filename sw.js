const CACHE_NAME = 'prombez-v2'; // Увеличили версию для обновления
const urlsToCache = [
  'index.html',
  'manifest.json',
  'questions_b211.json',
  'questions_b26.json',
  'icons/icon-152x152.png',
  'icons/icon-167x167.png',
  'icons/icon-180x180.png',
  'icons/icon-512x512.png'
  // splash.png убрал
];

// Установка Service Worker и кеширование файлов
self.addEventListener('install', event => {
  console.log('Service Worker устанавливается...');
  self.skipWaiting(); // Немедленно активируем новый service worker
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кеш открыт, кешируем файлы...');
        // Кешируем все файлы, но не прерываем установку при ошибке
        return Promise.allSettled(
          urlsToCache.map(url => {
            return cache.add(url).catch(err => {
              console.warn(`Не удалось закешировать ${url}:`, err);
              // Продолжаем выполнение даже если файл не закешировался
            });
          })
        );
      })
      .then(() => {
        console.log('Service Worker установлен');
      })
      .catch(err => {
        console.error('Ошибка при установке Service Worker:', err);
      })
  );
});

// Перехват запросов и возврат из кеша
self.addEventListener('fetch', event => {
  // Не кешируем запросы с параметром t (для обновления)
  if (event.request.url.includes('?t=') || event.request.url.includes('t=')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Стратегия: сначала кеш, потом сеть
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          // Нашли в кеше - возвращаем
          return response;
        }
        
        // Нет в кеше - грузим из сети
        return fetch(event.request).then(networkResponse => {
          // Проверяем, нужно ли кешировать этот запрос
          if (networkResponse && networkResponse.status === 200) {
            // Кешируем только файлы из нашего списка или изображения
            const url = new URL(event.request.url);
            if (urlsToCache.includes(url.pathname.substring(1)) || 
                event.request.url.match(/\.(png|jpg|jpeg|svg|ico|json)$/)) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, responseToCache);
              });
            }
          }
          return networkResponse;
        }).catch(err => {
          console.log('Ошибка загрузки:', err);
          // Можно вернуть офлайн-страницу
          return new Response('Нет подключения к интернету');
        });
      })
  );
});

// Очистка старого кеша при активации нового
self.addEventListener('activate', event => {
  console.log('Service Worker активируется...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Удаляем все старые кеши, кроме текущего
          if (cacheName !== CACHE_NAME) {
            console.log('Удаляем старый кеш:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker активирован, кеш очищен');
      // Немедленно захватываем контроль над всеми открытыми страницами
      return self.clients.claim();
    })
  );
});

// Обработка сообщений от страницы (для ручного обновления)
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Обработка ошибок
self.addEventListener('error', event => {
  console.error('Ошибка в Service Worker:', event.error);
});