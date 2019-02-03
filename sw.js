const STATIC_VERSION = 'rest-v7';

self.addEventListener('install', evt => {
    const urlsToCach = [
        '/',
        'css/styles.css',
        'js/',
        'js/main.js',
        'js/restaurant_info.js',
        'js/dbhelper.js',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
        '/restaurant.html'
    ];

    evt.waitUntil(
        caches.open(STATIC_VERSION).then(cache => cache.addAll(urlsToCach))
    );

});

self.addEventListener('activate', evt=> {
    evt.waitUntil (
        caches.keys().then(cacheNames =>{
            return Promise.all(
            cacheNames.filter( cacheName=>{
                return cacheName.startsWith('rest-') && cacheName != STATIC_VERSION;
            }).map(cacheName => {
                return caches.delete(cacheName);
            }));
        })
    )
})


self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request)
            .then(response => response || fetch(evt.request))
            .catch(err=>console.log(err))

    )
});