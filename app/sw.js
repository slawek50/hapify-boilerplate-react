// @flow weak
/* eslint-disable no-console */
/* eslint no-restricted-globals: "off" */

import fetch from 'isomorphic-fetch';

const DEBUG = false;

// When the user navigates to your site,
// the browser tries to redownload the script file that defined the service
// worker in the background.
// If there is even a byte's difference in the service worker file compared
// to what it currently has, it considers it 'new'.
const { assets } = global.serviceWorkerOption;

const CACHE_NAME = new Date().toISOString();

const assetsToCache = assets.map((path) => new URL(path, global.location).toString());

// When the service worker is first added to a computer.
self.addEventListener('install', (event) => {
  // Perform install steps.
  if (DEBUG) {
    console.log('[SW] Install event');
  }

  // Add core website files to cache during serviceworker installation.
  event.waitUntil(
    global.caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(assetsToCache))
      .then(() => {
        if (DEBUG) {
          console.log('Cached assets: main', assetsToCache);
        }
      })
      .catch((error) => {
        console.error(error);
        throw error;
      }),
  );
});

// After the install event.
self.addEventListener('activate', (event) => {
  if (DEBUG) {
    console.log('[SW] Activate event');
  }

  // Clean the caches
  event.waitUntil(
    global.caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        // Delete the caches that are not the current one.
        if (cacheName.indexOf(CACHE_NAME) === 0) {
          return null;
        }

        return global.caches.delete(cacheName);
      }),
    )),
  );
});

self.addEventListener('message', (event) => {
  switch (event.data.action) {
  case 'skipWaiting':
    if (self.skipWaiting) {
      self.skipWaiting();
      self.clients.claim();
    }
    break;
  default:
    break;
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Ignore not GET request and API request
  if (request.method !== 'GET' || request.url.indexOf(`${global.location.origin}/api` === 0)
    || (assetsToCache.indexOf(request.url) === -1 // Requested URL dont match the cache
      && request.url !== `${global.location.origin}/`)) { // Requested URL is not the base URL
    if (DEBUG) {
      console.log(`[SW] Ignore request ${request.url}`);
    }
    return;
  }

  const requestUrl = new URL(request.url);

  // Ignore difference origin.
  if (requestUrl.origin !== window.location.origin) {
    if (DEBUG) {
      console.log(`[SW] Ignore difference origin ${requestUrl.origin}`);
    }
    return;
  }

  // Load and cache known assets.
  const fetchResult = fetch(request)
  .then((responseNetwork) => {
    if (!responseNetwork || !responseNetwork.ok) {
      if (DEBUG) {
        console.log(
          `[SW] URL [${requestUrl.toString()}] wrong responseNetwork: ${responseNetwork.status} ${responseNetwork.type}`,
        );
      }

      return responseNetwork;
    }

    if (DEBUG) {
      console.log(`[SW] URL ${requestUrl.href} fetched`);
    }

    const responseCache = responseNetwork.clone();

    global.caches
    .open(CACHE_NAME)
    .then((cache) => cache.put(request, responseCache))
    .then(() => {
      if (DEBUG) {
        console.log(`[SW] Cache asset: ${requestUrl.href}`);
      }
    });

    return responseNetwork;
  })
  .catch(() => {
    // User is landing on our page.
    if (event.request.mode === 'navigate') {
      return global.caches.match('./');
    }

    return global.caches.match(request).then((response) => {
      if (response) {
        if (DEBUG) {
          console.log(`[SW] fetch URL ${requestUrl.href} from cache`);
        }

        return response;
      }

      return null;
    });
  });

  event.respondWith(fetchResult);
});
