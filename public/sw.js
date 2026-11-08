/*
 * Service Worker for The World Tipiṭaka Edition (PWA)
 * https://tipitaka2500.github.io
 */

const CACHE_NAME = 'tipitaka2500-v3.3.0';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/guide.html',
  '/toc.html',
  '/about.html',
  '/offline.html',
  '/site.webmanifest',
  '/images/logo48.png',
  '/images/logo128.png',
  '/images/icon-192.png',
  '/images/icon-512.png',
  '/images/apple-touch-icon.png',
  '/images/tipitaka-volumes.webp',
  '/images/cc-zero.svg'
];

// Pre-cache core application shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Clean up previous cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Runtime caching & offline routing
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Ignore cross-origin requests
  if (url.origin !== self.location.origin) return;

  // 1. Navigation requests (HTML pages) -> Network-First with Cache & Offline Fallback
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const resClone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(req, resClone);
            });
          }
          return networkRes;
        })
        .catch(() => {
          return caches.match(req).then((cachedRes) => {
            if (cachedRes) return cachedRes;
            return caches.match('/offline.html');
          });
        })
    );
    return;
  }

  // 2. Data shards (/data/dpd/*.json and search indices) -> Cache-First with Network Update
  if (url.pathname.startsWith('/data/')) {
    event.respondWith(
      caches.match(req).then((cachedRes) => {
        const fetchPromise = fetch(req)
          .then((networkRes) => {
            if (networkRes && networkRes.status === 200) {
              const resClone = networkRes.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(req, resClone);
              });
            }
            return networkRes;
          })
          .catch(() => cachedRes);

        return cachedRes || fetchPromise;
      })
    );
    return;
  }

  // 3. Static assets (fonts, styles, scripts, images) -> Cache-First with Network Fallback
  event.respondWith(
    caches.match(req).then((cachedRes) => {
      if (cachedRes) return cachedRes;

      return fetch(req).then((networkRes) => {
        if (networkRes && networkRes.status === 200) {
          const resClone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, resClone);
          });
        }
        return networkRes;
      });
    })
  );
});
