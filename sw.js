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
        caches.open('v1').then(cache => cache.addAll(urlsToCach))
    );

});


self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request)
            .then(response => response || fetch(evt.request))
            .catch(err=>console.log(err))

    )
});