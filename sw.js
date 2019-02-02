self.addEventListener('install', evt=>{
const urlsToCach = [
    '/',
    '/css/styles.css',
    '/js/',
    '/js/main.js',
    '/js/restaurant_info.js',
    'js/dbhelper.js'
];

    evt.waitUntil(
        caches.open('v1').then(cache=> cache.addAll(urlsToCach))
    );

});


self.addEventListener('fetch', evt=> {
});