/**
 * emoTIC - Service Worker Oficial (v15)
 * Soporta funcionamiento 100% offline de los juegos de emociones y recursos multimedia.
 */

const CACHE_NAME = "emotic-v15";

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./service-worker.js",
  "./css/main.css",
  "./css/worlds.css",
  "./css/games.css",
  "./css/teacher.css",
  "./css/accessibility.css",
  "./js/app.js",
  "./js/db.js",
  "./js/sound.js",
  "./js/navigation.js",
  "./js/guide.js",
  "./js/games.js",
  "./js/teacher.js",
  "./js/library.js",
  "./js/pwa.js",
  "./data/curriculum.js",
  "./data/activities.js",
  "./data/library-data.js",
  "./assets/illustrations/gato.svg",
  "./assets/illustrations/gato-alegria.png",
  "./assets/illustrations/gato-tristeza.png",
  "./assets/illustrations/gato-enojo.png",
  "./assets/illustrations/gato-miedo.png",
  "./assets/illustrations/gato-asco.png",
  "./assets/illustrations/gato-sorpresa.png",
  "./assets/illustrations/gato-avatar.png",
  "./assets/illustrations/gatos-emociones.png",
  "./assets/illustrations/gato-tristeza.svg",
  "./assets/illustrations/gato-enojo.svg",
  "./assets/illustrations/gato-miedo.svg",
  "./assets/illustrations/gato-asco.svg",
  "./assets/illustrations/gato-sorpresa.svg",
  "./assets/illustrations/lumi.svg",
  "./assets/illustrations/globito.png",
  "./assets/illustrations/globito.svg",
  "./assets/illustrations/nino-nina.svg",
  "./assets/illustrations/heroe-heroina.svg",
  "./assets/illustrations/heroina-avatar.svg",
  "./assets/illustrations/heroe-avatar.svg",
  "./assets/illustrations/timo.svg",
  "./assets/illustrations/cuy.svg",
  "./assets/illustrations/avatar-explorador.svg",
  "./assets/illustrations/avatar-exploradora.svg",
  "./assets/illustrations/avatar-fantastico.svg",
  "./assets/illustrations/nina-home.svg",
  "./assets/illustrations/nino-home.svg",
  "./assets/illustrations/avatar-display-nina.svg",
  "./assets/illustrations/avatar-display-nino.svg",
  "./assets/illustrations/gina.svg",
  "./assets/illustrations/jatron.svg",
  "./assets/illustrations/dino.svg",
  "./assets/illustrations/ayuda.svg",
  "./assets/illustrations/lola-lalo.svg",
  "./assets/icons/icon-192.svg",
  "./assets/icons/icon-512.svg",
  "./emotic-logo.png"
];

// Instalación: Cachear todos los recursos esenciales locales e instalar inmediatamente
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[emoTIC SW v11] Pre-cacheando recursos educativos...");
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn("[emoTIC SW v7] Algunos recursos no pudieron precachearse:", err);
      });
    })
  );
});

// Activación: Limpieza rigurosa de versiones previas y reclamación inmediata de clientes
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[emoTIC SW v5] Limpiando versión previa de caché:", key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Intercepción de peticiones:
// 1. Para navegación HTML (documentos): Network-First para ver cambios al instante, con fallback a caché offline.
// 2. Para otros recursos: Stale-While-Revalidate / Cache-First con fallback a red.
self.addEventListener("fetch", (event) => {
  if (!event.request.url.startsWith("http")) return;

  const isNavigationOrHtml = event.request.mode === "navigate" || 
    (event.request.headers.get("accept") && event.request.headers.get("accept").includes("text/html"));

  if (isNavigationOrHtml) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request).then((res) => res || caches.match("./index.html"));
        })
    );
    return;
  }

  // Para otros activos (CSS, JS, imágenes, fuentes): Cache-First con actualización en segundo plano
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === "basic") {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
