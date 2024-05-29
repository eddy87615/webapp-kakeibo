const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/src/AppContext.jsx',
  '/src/index.css',
  '/src/App.jsx',
  '/manifest.json',
  '/o0350035012647143728.webp',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache).catch((error) => {
        console.error('Failed to add resources to cache:', error);
        urlsToCache.forEach(async (url) => {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              console.error(`Failed to fetch ${url}: ${response.statusText}`);
            }
          } catch (fetchError) {
            console.error(`Failed to fetch ${url}: ${fetchError.message}`);
          }
        });
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
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
