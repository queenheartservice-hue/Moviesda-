const CACHE_NAME = "moviesda-v1";

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll([
      "https://moviedatamilnetflix.blogspot.com/p/body-text-align-center.html"
    ]))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request).catch(() =>
      caches.match(e.request)
    )
  );
});
