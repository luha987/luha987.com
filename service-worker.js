const CACHE_NAME = 'Animeku-v1';
var urlsToCache = [
  "/",
  "/index.html",
  "/nav.html",
  "/manifest.json",
  "/donghua/donghua1.png",
  "/donghua/donghua2.jpeg",
  "/donghua/donghua3.jpeg",
  "/donghua/donghua4.jpeg",
  "/donghua/donghua5.jpeg",
  "/movie/movie1.jpeg",
  "/movie/movie2.jpeg",
  "/movie/movie3.jpeg",
  "/wibu/wibu1.jpeg",
  "/wibu/wibu2.jpeg",
  "/wibu/wibu3.jpeg",
  "/wibu/wibu4.jpeg",
  "/wibu/wibu5.jpeg",
  "/materialize/pages/home.html",
  "/materialize/pages/anime-donghua.html",
  "/materialize/pages/anime-movie.html",
  "/materialize/pages/anime-wibu.html",
  "/materialize/pages/contact.html",
  "/materialize/css/materialize.css",
  "/materialize/css/materialize.min.css",
  "/materialize/js/materialize.min.js",
  "/materialize/js/materialize.js",
  "/materialize/js/nav.js",
  "/materialize/js/rsw.js",
  "/192.png",
  "/512.png",
  "/favicon.ico",
  "/README.md",
  "/LICENSE"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

 // Menambahkan cache storage
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

 // Delete cache storage
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});