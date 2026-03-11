// Service Worker para PWA
const CACHE_NAME = 'rugby-attendance-v1';
const urlsToCache = [
  './',
  './index.html',
  './app.js',
  './styles.css',
  './logo-fuengirola.png',
  './manifest.json'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar peticiones de red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - devolver respuesta del cache
        if (response) {
          return response;
        }
        // Si no está en cache, hacer petición de red
        return fetch(event.request);
      }
    )
  );
});
