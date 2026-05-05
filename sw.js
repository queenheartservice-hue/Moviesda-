const CACHE_NAME = "moviesda-v1";
const OFFLINE_URL = "/offline.html";
const START_URL = self.location.origin + "/p/body-text-align-center.html";

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        OFFLINE_URL,
        START_URL
      ]);
    })
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          return response;
        })
        .catch(async () => {
          const cache = await caches.open(CACHE_NAME);
          return await cache.match(OFFLINE_URL);
        })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
