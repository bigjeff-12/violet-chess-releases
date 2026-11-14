const CACHE = "bjc-b3a775d2c3ba";
const FILES = ["./","apple-touch-icon.png","assets/mobile-BBIvknQd.css","assets/mobile-DQ_2aE8T.js","assets/openings-BP90xieq.js","engine/LICENSE-GPL-3.0.txt","engine/stockfish-19-lite-single.js","engine/stockfish-19-lite-single.wasm","icon-192.png","icon-512.png","icon-maskable-512.png","manifest.webmanifest"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request)),
  );
});
