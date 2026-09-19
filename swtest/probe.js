// shared probe: runs in whichever document includes it, reports to parent
(function () {
  var out = { which: (window.__WHICH__ || 'unknown'), origin: location.origin, href: location.href.slice(0, 90) };
  try { out.eval = eval('40+2'); } catch (e) { out.eval = 'BLOCKED:' + String(e.message).slice(0, 70); }
  try { new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0])); out.wasm = 'WASM_OK'; }
  catch (e) { out.wasm = 'BLOCKED:' + String(e.message).slice(0, 80); }
  try { out.newFunction = new Function('return 7*6')(); } catch (e) { out.newFunction = 'BLOCKED'; }
  fetch(location.href, { cache: 'no-store' }).then(function (r) {
    out.csp = r.headers.get('content-security-policy');
    parent.postMessage(out, '*');
  }).catch(function () { out.csp = 'fetch-failed'; parent.postMessage(out, '*'); });
})();
