/**
 * This service worker provides caching of requests to flats and patches.
 * Note: Once the cache populated, it is *not* refreshed. The assumption is that
 * the contents of the deutex tree on the server will not change.
 */

const CACHE_VERSION = 1;

const CURRENT_CACHES = {
  patches: 'images-cache-v' + CACHE_VERSION
}

self.addEventListener('activate', event => {
  let expectedCacheNames = Object.keys(CURRENT_CACHES).map(key => CURRENT_CACHES[key]);

  // Delete any unneeded caches.
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        if (expectedCacheNames.indexOf(cacheName) === -1) {
          console.log('Deleting outdated cache: ', cacheName);
          return caches.delete(cacheName);
        }
      })
    ))
  )
});

self.addEventListener('fetch', event => {
  console.log('Handling request for ', event.request.url);

  if (event.request.url.indexOf('/flats/') > -1 || event.request.url.indexOf('/patches/') > -1) {
    event.respondWith(
      caches.open(CURRENT_CACHES.patches).then(cache => {
        return cache.match(event.request).then(response => {
          if (response) {
            return response;
          }

        console.log(
          'No response for %s found in cache. About to fetch from network...', event.request.url);

          return fetch(event.request.clone()).then(response => {
            console.log('Network response for %s is: %O', event.request.url, response);

            if (
              response.status < 400 &&
              response.headers.has('content-type') &&
              response.headers.get('content-type').match(/^image\//i)
            ) {
              console.log('Caching response to ', event.request.url);
              cache.put(event.request, response.clone());
            }
            else {
              console.log('Not caching response to ', event.request.url);
            }

            return response;
          });
        });
      }).catch(error => {
        console.error('Error in fetch handler: ', error);
        throw error;
      })
    )
  }
});