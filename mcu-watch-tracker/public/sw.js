/*
 * Offline support for MCU Watch Tracker.
 *
 * - Pages: network first, falling back to the cached copy (so the app opens offline).
 * - Hashed build assets, fonts and icons: cache first — their URLs change when they do.
 * Progress itself lives in localStorage and never touches the network.
 */
const CACHE = "mcu-tracker-v1";
const PRECACHE = [
  "/",
  "/manifest.webmanifest",
  "/icons/app-icon-192.png",
  "/icons/app-icon-512.png",
  "/icons/brand-mark.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

function isImmutableAsset(url) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    /\.(?:woff2?|png|svg|ico)$/.test(url.pathname)
  );
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    const cached = (await cache.match(request)) ?? (await cache.match("/"));
    if (cached) return cached;
    throw new Error("offline and not cached");
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
  } else if (isImmutableAsset(url)) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});
