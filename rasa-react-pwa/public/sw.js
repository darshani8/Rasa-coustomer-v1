// Minimal service worker: precache the app shell, serve navigations offline,
// and cache CDN fonts/images at runtime (stale-while-revalidate).
const VERSION = 'rasa-v1'
const SHELL = ['/', '/index.html', '/manifest.webmanifest', '/icons/icon-192.png', '/icons/icon-512.png']

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (e) => {
  const { request } = e
  if (request.method !== 'GET') return
  const url = new URL(request.url)

  // SPA navigations -> app shell fallback
  if (request.mode === 'navigate') {
    e.respondWith(fetch(request).catch(() => caches.match('/index.html')))
    return
  }

  const isCdn = /fonts\.(googleapis|gstatic)\.com|images\.unsplash\.com|loremflickr\.com/.test(url.host)
  const sameOrigin = url.origin === self.location.origin

  if (isCdn || sameOrigin) {
    // stale-while-revalidate
    e.respondWith(
      caches.open(VERSION).then((cache) =>
        cache.match(request).then((cached) => {
          const network = fetch(request)
            .then((res) => {
              if (res && res.status === 200) cache.put(request, res.clone())
              return res
            })
            .catch(() => cached)
          return cached || network
        })
      )
    )
  }
})
