// Static value to be updated
const STATIC_VERSION = 'rest-v7';

// Things to do when service worker gets installed
self.addEventListener('install', evt => {
    // URLs that will be cached
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
    
    // Create the URLs cache
    evt.waitUntil(
        caches.open(STATIC_VERSION).then(cache => cache.addAll(urlsToCach))
    );

});

// Things to do when Service Worker gets activated
self.addEventListener('activate', evt=> {

    evt.waitUntil (
        // Clean OLD cache
        // Return a promise with all cache names
        caches.keys().then(cacheNames =>{
            // Promise.all because we will be returning an array of promises
            return Promise.all(
            cacheNames.filter( cacheName=>{
                // Filtering by prefix because the same App can have more than one Service Worker
                return cacheName.startsWith('rest-') && cacheName != STATIC_VERSION;
            }).map(cacheName => {
                // caches.delete return a Promise
                return caches.delete(cacheName);
            }));
        })
    )
})


self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request)
            // If there is a matching cache return cache else fetch.
            .then(response => response || fetch(evt.request))
            .catch(err=>console.log(err))

    )
});