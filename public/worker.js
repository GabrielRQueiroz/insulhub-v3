const CACHE_NAME = 'insulhub-cache';
const urlsToCache = ['index.html', 'offline.html'];

// ? Installs SW
self.addEventListener('install', (event) => {
	event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
});

// ? Listens for request
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches
			.match(event.request)
			.then(() => fetch(event.request))
			.catch(() => caches.match('offline.html'))
	);
});

// ? Activates the SW
self.addEventListener('activate', (event) => {
	const cacheWhitelist = [];
	cacheWhitelist.push(CACHE_NAME);

	event.waitUntil(
		caches.keys().then((cacheNames) =>
			Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhitelist.includes(cacheName)) {
						return caches.delete(cacheName);
					}
				})
			)
		)
	);
});
