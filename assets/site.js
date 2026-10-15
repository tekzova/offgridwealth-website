/* offgridwealth.in — small behaviours. The page is complete without this file. */

/* ===== Download links: change them here, and every button on every page follows. ===== */
var OGW_DOWNLOADS = {
  windows: 'downloads/OffGridWealth_3.0.0_x64-setup.exe',   // put the installer in /downloads on the server
  android: 'https://play.google.com/store/apps/details?id=com.tekzova.offgridwealth',
  msstore: 'https://apps.microsoft.com/search?query=OffGridWealth'   // replace with the Store listing URL (apps.microsoft.com/detail/...) once published
};

(function () {
  'use strict';
  var root = (document.querySelector('meta[name="ogw-root"]') || { content: '' }).content;

  // download buttons
  [].forEach.call(document.querySelectorAll('[data-dl]'), function (a) {
    var u = OGW_DOWNLOADS[a.getAttribute('data-dl')]; if (!u) return;
    a.href = /^https?:/.test(u) ? u : root + u;
    if (/^https?:/.test(u)) { a.target = '_blank'; a.rel = 'noopener'; }
  });

  // drawer
  var mb = document.querySelector('.menu-btn'), dr = document.querySelector('.drawer');
  if (mb && dr) mb.addEventListener('click', function () {
    var o = dr.classList.toggle('open'); mb.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : '';
  });

  // tabs (feature tour)
  [].forEach.call(document.querySelectorAll('[role="tablist"]'), function (tl) {
    var tabs = [].slice.call(tl.querySelectorAll('[role="tab"]'));
    function sel(t, focus) {
      tabs.forEach(function (x) {
        var on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1;
        var p = document.getElementById(x.getAttribute('aria-controls')); if (p) p.hidden = !on;
      });
      if (focus) t.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { sel(t); });
      t.addEventListener('keydown', function (e) {
        var k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (k) { e.preventDefault(); sel(tabs[(i + k + tabs.length) % tabs.length], true); }
      });
    });
  });

  // lightbox for screenshots
  var lb = document.createElement('div'); lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Screenshot');
  lb.innerHTML = '<img alt=""><button type="button" aria-label="Close">×</button>'; document.body.appendChild(lb);
  var li = lb.querySelector('img'), lastFocus = null;
  function close() { lb.classList.remove('open'); document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
  lb.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && lb.classList.contains('open')) close(); });
  [].forEach.call(document.querySelectorAll('.shot-btn'), function (b) {
    b.addEventListener('click', function () {
      var im = b.querySelector('img'); lastFocus = b; li.src = im.currentSrc || im.src; li.alt = im.alt;
      lb.classList.add('open'); document.body.style.overflow = 'hidden'; lb.querySelector('button').focus();
    });
  });

  // phone: download bar appears once the hero is out of view
  var bar = document.querySelector('.mbar'), hero = document.querySelector('.hero, .page-hero'), closing = document.querySelector('.closing');
  if (bar && hero && 'IntersectionObserver' in window) {
    var heroOut = false, endIn = false;
    function upd() { bar.classList.toggle('show', heroOut && !endIn); }
    new IntersectionObserver(function (e) { heroOut = !e[0].isIntersecting; upd(); }).observe(hero);
    if (closing) new IntersectionObserver(function (e) { endIn = e[0].isIntersecting; upd(); }).observe(closing);
  }

  var y = document.getElementById('yr'); if (y) y.textContent = new Date().getFullYear();
})();
