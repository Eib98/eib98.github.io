// Synthesize the document entirely inside the SW. Such a response never traverses the
// network stack, so Electron's webRequest.onHeadersReceived should never observe it and
// the client's "script-src * 'unsafe-inline'" injection should not be applied.
var DOC = '<!doctype html><html><body>' +
  '<script>window.__WHICH__="sw-SYNTHESIZED";<\/script>' +
  '<script src="probe.js"><\/script>' +
  '</body></html>';

self.addEventListener('install', function (e) { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  var u = new URL(e.request.url);
  if (u.pathname.indexOf('/swtest/synth.html') !== -1) {
    e.respondWith(new Response(DOC, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    }));
  }
});
