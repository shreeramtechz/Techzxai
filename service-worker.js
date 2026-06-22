/* ==========================================================================
   Techzx AI Hub — service-worker.js
   Provides basic offline support by caching core app files (app shell).
   Bump CACHE_NAME whenever you update styles.css / script.js / data.js
   so returning visitors get the fresh version instead of a stale cache.
   ========================================================================== */

const CACHE_NAME = "techzx-ai-hub-v1";

const CORE_ASSETS = [
  "index.html",
  "ai-tools.html",
  "prompts.html",
  "wallpapers.html",
  "resources.html",
  "about.html",
  "contact.html",
  "privacy.html",
  "terms.html",
  "styles.css",
  "script.js",
  "data.js",
  "manifest.json"
];

/* Install: pre-cache the app shell */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

/* Activate: clean up old caches */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

/* Fetch: cache-first for app shell files, network-first for everything else
   (so wallpaper images / external API calls always try the network first) */
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only handle GET requests from our own origin for the app shell strategy
  if (event.request.method !== "GET") return;

  const isCoreAsset = CORE_ASSETS.some((asset) => url.pathname.endsWith(asset)) || url.pathname === "/" ;

  if (isCoreAsset) {
    // Cache-first
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return (
          cached ||
          fetch(event.request)
            .then((response) => {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
              return response;
            })
            .catch(() => caches.match("index.html"))
        );
      })
    );
  } else {
    // Network-first (falls back to cache if offline)
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  }
});
