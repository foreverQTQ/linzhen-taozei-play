/*
 * 临阵讨贼离线缓存。
 * 首次联网打开后，访问过的脚本、图片、音频会自动保存；之后断网也能再次启动。
 */
// 每次正式大版本都更换缓存名，确保玩家重新打开网址时拿到最新代码和图片。
// release3修复苹果Safari可能长期命中旧首页的问题：页面导航改为联网优先，断网才读缓存。
const CACHE_NAME = 'linzhen-taozei-v0.5.1-release3';
const APP_SHELL = [
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

  // HTML页面必须“联网优先”。旧版把根地址永久放在缓存前面，苹果Safari会一直拿到旧入口，
  // 即使服务器已经发布新脚本也无法升级。联网成功后把最新页面保存为离线兜底；
  // 只有真正断网时才退回上一次成功打开的index.html。
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request, { cache: 'no-store' })
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy));
          }
          return response;
        })
        .catch(() => caches.match('./index.html')),
    );
    return;
  }

  // 图片、脚本和图标都带发布版本标记，适合缓存优先，减少重复下载流量。
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
        .catch(() => undefined);
    }),
  );
});
