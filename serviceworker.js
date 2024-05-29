const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/src/index.css',
  '/src/App.jsx',
  '/src/App.css',
  '/src/components/CalendarBtn.jsx',
  '/src/components/CalendarBtn.css',
  '/src/components/CalendarPage.jsx',
  '/src/components/Header.css',
  '/src/components/HeaderBtn.jsx',
  '/src/components/Home.css',
  '/src/components/Home.jsx',
  '/src/components/InputForm.css',
  '/src/components/InputForm.jsx',
  '/src/components/Receive.css',
  '/src/components/Receive.jsx',
  '/src/components/ReceiveContainer.css',
  '/src/components/ReceiveContainer.jsx',
  '/src/AppContext.jsx',
  '/public/o0350035012647143728.webp',
  '/manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  // 过滤掉不支持的协议请求
  if (
    event.request.url.startsWith('chrome-extension://') ||
    event.request.url.startsWith('chrome://')
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== 'basic'
          ) {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          return caches.match('/index.html');
        });
    })
  );
});
