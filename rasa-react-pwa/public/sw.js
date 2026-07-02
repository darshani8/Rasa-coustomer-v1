// Rasa service worker — app-shell + runtime caching for offline use.
const CACHE = 'rasa-v1';
// Derive the deploy base from the SW's own path (it is served at <base>sw.js) so a sub-path deploy
// (e.g. GitHub Pages /repo/) resolves the shell correctly instead of assuming the domain root.
const BASE = self.location.pathname.replace(/sw\.js$/, '');
const SHELL = [BASE, BASE + 'index.html', BASE + 'manifest.webmanifest', BASE + 'icons/icon-192.png', BASE + 'icons/icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // API traffic is NEVER cached — serving a stale cached API response would freeze "live" data
  // (positions, order status) on a same-origin deploy. Match both a root-mounted API ('/api/…') and
  // one under the deploy base ('<base>api/…') so a sub-path deploy isn't quietly re-frozen. Let it
  // always hit the network.
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith(BASE + 'api/')) return;

  // Navigations: network-first, fall back to cached shell (offline-friendly SPA).
  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(BASE + 'index.html', copy));
        return res;
      }).catch(() => caches.match(BASE + 'index.html'))
    );
    return;
  }

  // Fonts, images, assets: cache-first, then network (and cache the result).
  e.respondWith(
    caches.match(request).then((cached) => cached || fetch(request).then((res) => {
      if (res.ok && (url.origin === location.origin || url.host.includes('fonts') || url.host.includes('unsplash'))) {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(request, copy));
      }
      return res;
    }).catch(() => cached))
  );
});
