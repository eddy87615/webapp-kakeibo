const CACHE_NAME = 'my-cache-v22';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/72.png',
  '/96.png',
  '/128.png',
  '/144.png',
  '/152.png',
  '/192.png',
  '/384.png',
  '/512.png',
  '/screen01.png',
  '/screen02.png',
  '/logo.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
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
      .then(() => {
        self.skipWaiting();
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
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
