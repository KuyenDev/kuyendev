/**
 * KUYÉNDEV · Service Worker v1.0.0
 * Estudio Tecnológico · Osorno, Chile
 * Provee funcionamiento offline, caché resiliente y soporte PWA nativo
 */

const CACHE_NAME = 'kuyendev-pwa-v1.0.0';

// Recursos críticos para arranque instantáneo y navegación offline
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/styles.css',
  '/js/script.js',
  '/icons/favicon.ico',
  '/icons/favicon-32x32.png',
  '/icons/favicon-16x16.png',
  '/icons/apple-touch-icon.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-192.png',
  '/icons/icon-maskable-512.png',
  '/images/logo-kuyendev-horizontal.webp',
  '/images/logo-kuyendev-horizontal.png',
  '/images/logo-kuyendev-isotipo.webp',
  '/images/logo-kuyendev-isotipo.png',
  '/pages/desarrollo-web.html',
  '/pages/planes-web.html',
  '/pages/servicios-informaticos.html',
  '/pages/empresas.html',
  '/pages/noticias.html',
  '/pages/nosotros.html',
  '/pages/contacto.html',
  '/404.html'
];

// Instalación: Precargar shell de la aplicación
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Aviso durante precaché:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activación: Limpieza automática de versiones antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategia Network-First con Fallback a Caché (Prioriza contenido fresco)
self.addEventListener('fetch', (event) => {
  // Ignorar métodos no GET
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Manejar únicamente peticiones del mismo origen
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Si la respuesta es exitosa (200), almacenar copia actualizada
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(async () => {
        // En caso de corte de red u offline, responder desde la caché
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }

        // Si la petición es para un documento HTML navegable y no hay caché exacta, servir index
        if (event.request.headers.get('accept')?.includes('text/html')) {
          const fallback = await caches.match('/index.html');
          if (fallback) return fallback;
        }
      })
  );
});

