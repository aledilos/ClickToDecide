const CACHE_NAME = 'decision-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// Installa il service worker e inizia a memorizzare le risorse nella cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Attivazione del service worker: elimina le versioni precedenti della cache
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Eliminando la vecchia cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Gestisce le richieste della rete: cerca nella cache prima di fare una richiesta alla rete
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request).catch(() => {
                return caches.match('/index.html'); // Fallback offline
            });
        })
    );
});
