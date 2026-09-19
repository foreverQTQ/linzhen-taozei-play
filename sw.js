/*
 * 临阵讨贼离线缓存。
 * 首次联网打开后，访问过的脚本、图片、音频会自动保存；之后断网也能再次启动。
 */
// 每次正式大版本都更换缓存名，确保玩家重新打开网址时拿到最新代码和图片。
// release2用于清理首个v0.5.1公网包缓存，避免旧1024动作图与新128像素分帧规则混用。
const CACHE_NAME = 'linzhen-taozei-v0.5.1-release2';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/icons/app-icon-192.png',
  './assets/icons/app-icon-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(key => key.startsWith('linzhen-taozei-') && key !== CACHE_NAME)
        .map(key => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request)
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => request.mode === 'navigate' ? caches.match('./index.html') : undefined);
    }),
  );
});
