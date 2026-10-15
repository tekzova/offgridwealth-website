/* OffGridWealth concept film — a 40-second story told in SVG.
   Mount: <div class="film" data-film></div>.  ?rec in the URL plays once, full size, for recording.
   Motion is transform/opacity/stroke only. With reduced motion the film does not autoplay;
   the step buttons still move through it. */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var ICON = (document.querySelector('meta[name="ogw-root"]') || { content: '' }).content + 'assets/icon-192.png';

  var CHIPS = [
    ['MF', 'Fund CAS', 'in your email', '#F3C969'],
    ['FD', 'FDs', 'two banks', '#7FA6CF'],
    ['PPF', 'PPF', 'post office', '#D9A441'],
    ['EPF', 'EPF', 'EPFO portal', '#7FA6CF'],
    ['\u20b9', 'Shares', 'demat account', '#F3C969'],
    ['NPS', 'NPS', 'CRA website', '#D9A441'],
    ['Ins', 'Policies', 'in the cupboard', '#7FA6CF'],
    ['Au', 'Gold, SGBs', 'bank locker', '#F3C969'],
    ['EMI', 'Home loan', 'every month', '#E36B5A'],
    ['Fam', 'Spouse\u2019s MF', 'another PAN', '#F3C969']
  ];
  // scene 1: scattered
  var POS0 = [[34, 34], [300, 20], [590, 44], [70, 150], [330, 128], [606, 160], [40, 268], [580, 280], [300, 246], [330, 356]];
  // scene 2: lined up under "their server"
  var POS1 = []; for (var k = 0; k < 10; k++) POS1.push([14 + (k % 5) * 156, 262 + Math.floor(k / 5) * 64]);

  // scene 3: parked either side of the device
  var POS2 = []; for (var k2 = 0; k2 < 10; k2++) POS2.push([k2 < 5 ? 70 : 580, 34 + (k2 % 5) * 76]);

  var SCENES = [
    { d: 6500, cap: 'Your money lives in ten different places — and not one of them shows you the whole picture.' },
    { d: 7500, cap: 'Most money apps fix that by asking for your <b>PAN, OTP and email access</b> — then keep your financial life on their server.' },
    { d: 5500, cap: '<b>OffGridWealth</b> cuts the cord. It reads your statements on your own phone or PC. Nothing is uploaded.' },
    { d: 8000, cap: 'In seconds, one honest picture: every fund, deposit, policy and loan — for the whole family.' },
    { d: 8000, cap: 'Then it works like a planner: goals, retirement, tax-season reports and a straight answer on that policy.' },
    { d: 6500, cap: 'Download it free. <b>Every feature is unlocked for 14 days.</b>' }
  ];

  function daysToMarch31() {
    var n = new Date(), y = n.getMonth() > 2 || (n.getMonth() === 2 && n.getDate() > 31) ? n.getFullYear() + 1 : n.getFullYear();
    var end = new Date(y, 2, 31); return { days: Math.max(0, Math.ceil((end - n) / 864e5)), fy: (y - 1) + '–' + String(y).slice(2) };
  }
  function inr(n) { var s = String(Math.round(n)), last3 = s.slice(-3), rest = s.slice(0, -3); return '₹' + (rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' : '') + last3; }

  function svg() {
    var t = daysToMarch31();
    var chips = CHIPS.map(function (c, i) {
      return '<g class="chip" data-i="' + i + '" style="transform:translate(' + POS0[i][0] + 'px,' + POS0[i][1] + 'px);opacity:0">' +
        '<g class="drift" style="animation-delay:-' + (i * .7) + 's"><rect width="150" height="50" rx="11" fill="#fff"/>' +
        '<rect x="8" y="9" width="32" height="32" rx="8" fill="' + c[3] + '"/>' +
        '<text x="24" y="29.5" text-anchor="middle" font-size="' + (c[0].length > 2 ? 10.5 : 13) + '" font-weight="800" fill="#0F2238">' + c[0] + '</text>' +
        '<text x="48" y="23" font-size="15.5" font-weight="750" fill="#15263C">' + c[1] + '</text>' +
        '<text x="48" y="40" font-size="12.5" fill="#5A6B82">' + c[2] + '</text></g></g>';
    }).join('');
    var lines = POS1.map(function (p, i) {
      return '<path class="draw" style="transition-delay:' + (i * 0.08) + 's" d="M' + (p[0] + 75) + ' ' + p[1] + ' C ' + (p[0] + 75) + ' 190, 400 210, 400 136" fill="none" stroke="#E36B5A" stroke-width="1.6" stroke-dasharray="4 5" pathLength="1000"/>';
    }).join('');
    var tokens = [['PAN', 250], ['OTP', 340], ['Email access', 430], ['Mobile no.', 550]].map(function (t, i) {
      var w = t[0].length * 7.4 + 22;
      return '<g class="tok" style="transform:translate(' + t[1] + 'px,236px);opacity:0;transition:transform 2.4s ' + (0.6 + i * 0.35) + 's cubic-bezier(.5,0,.3,1), opacity .4s ' + (0.6 + i * 0.35) + 's">' +
        '<rect width="' + w + '" height="24" rx="12" fill="#3A1F2A" stroke="#E36B5A"/><text x="' + w / 2 + '" y="16.5" text-anchor="middle" font-size="12" font-weight="700" fill="#FFB2A6">' + t[0] + '</text></g>';
    }).join('');
    var bars = [52, 38, 30, 22, 14].map(function (h, i) {
      return '<rect class="grow" style="transition-delay:' + (0.9 + i * .12) + 's" x="' + (334 + i * 28) + '" y="' + (398 - h) + '" width="18" height="' + h + '" rx="4" fill="' + ['#F3C969', '#7FA6CF', '#BFD6EC', '#D9A441', '#7FA6CF'][i] + '"/>';
    }).join('');
    var health = [0, 1, 2, 3, 4, 5].map(function (i) {
      return '<g class="pop" style="transition-delay:' + (1.2 + i * .15) + 's"><rect x="' + (328 + i * 24.5) + '" y="296" width="20" height="20" rx="6" fill="' + (i === 3 ? '#F2C14E' : '#1E9E62') + '"/>' +
        '<path d="M' + (333 + i * 24.5) + ' 306 l3.5 3.5 6.5-7" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>';
    }).join('');
    // donut: 4 segments on r=26 (circumference 163.4)
    var seg = [[0.55, '#F3C969'], [0.2, '#7FA6D1'], [0.15, '#D9A441'], [0.1, '#BFD6EC']], acc = 0, C = 2 * Math.PI * 26;
    var donut = seg.map(function (s, i) {
      var d = '<circle class="ring" data-len="' + (s[0] * C - 2) + '" cx="362" cy="240" r="26" fill="none" stroke="' + s[1] + '" stroke-width="13" stroke-dasharray="' + (s[0] * C - 2) + ' ' + C + '" stroke-dashoffset="' + (s[0] * C - 2) + '" transform="rotate(' + (-90 + acc * 360) + ' 362 240)" style="transition-delay:' + (0.6 + i * .25) + 's"/>';
      acc += s[0]; return d;
    }).join('');
    var rings = [['Retirement', 0.86, 392], ['Child’s education', 0.41, 524], ['House loan-free', 0.83, 656]].map(function (g, i) {
      var c2 = 2 * Math.PI * 28;
      return '<circle cx="' + g[2] + '" cy="92" r="28" fill="none" stroke="#27446A" stroke-width="8"/>' +
        '<circle class="ring" data-len="' + (g[1] * c2) + '" cx="' + g[2] + '" cy="92" r="28" fill="none" stroke="' + (g[1] > .6 ? '#F3C969' : '#D9A441') + '" stroke-width="8" stroke-linecap="round" stroke-dasharray="' + (g[1] * c2) + ' ' + c2 + '" stroke-dashoffset="' + (g[1] * c2) + '" transform="rotate(-90 ' + g[2] + ' 92)" style="transition-delay:' + (0.5 + i * .3) + 's"/>' +
        '<text x="' + g[2] + '" y="97" text-anchor="middle" font-size="14" font-weight="800" fill="#fff">' + Math.round(g[1] * 100) + '%</text>' +
        '<text x="' + g[2] + '" y="138" text-anchor="middle" font-size="11.5" fill="#A9BBD1">' + g[0] + '</text>';
    }).join('');

    return '' +
      '<svg class="f" viewBox="0 0 800 520" role="img" aria-label="Animated story: scattered statements, apps that upload your data, and OffGridWealth keeping everything on your own device">' +
      '<defs><pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#7FA6CF" stroke-opacity=".07"/></pattern>' +
      '<radialGradient id="glow" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="#F3C969" stop-opacity=".18"/><stop offset="1" stop-color="#F3C969" stop-opacity="0"/></radialGradient></defs>' +
      '<rect width="800" height="520" fill="#0B1E33"/><rect width="800" height="520" fill="url(#g)"/>' +
      // scene 2-3: their server
      '<g class="sc" data-s="1 2" id="srv" style="transition:opacity .7s ease">' +
        '<g class="srvbox"><rect x="310" y="36" width="180" height="100" rx="16" fill="#1C2A3F" stroke="#E36B5A" stroke-width="1.5"/>' +
        '<rect x="334" y="58" width="132" height="14" rx="4" fill="#2A3B55"/><rect x="334" y="80" width="132" height="14" rx="4" fill="#2A3B55"/><rect x="334" y="102" width="132" height="14" rx="4" fill="#2A3B55"/>' +
        '<circle class="pulse" cx="450" cy="65" r="3.5" fill="#E36B5A"/><circle class="pulse" cx="450" cy="87" r="3.5" fill="#E36B5A" style="animation-delay:.4s"/><circle class="pulse" cx="450" cy="109" r="3.5" fill="#E36B5A" style="animation-delay:.8s"/>' +
        '<text x="400" y="26" text-anchor="middle" font-size="13" font-weight="700" fill="#FF9A8B">Their server</text></g>' +
        '<g class="fade" id="srvx"><path class="draw" d="M296 22 L504 150 M504 22 L296 150" stroke="#D9A441" stroke-width="6" stroke-linecap="round" pathLength="1000"/>' +
        '<rect x="300" y="160" width="200" height="30" rx="15" fill="#D9A441"/><text x="400" y="180" text-anchor="middle" font-size="14" font-weight="800" fill="#1B1206">No server. No account.</text></g>' +
      '</g>' +
      '<g class="sc" data-s="1" id="lines">' + lines + tokens + '</g>' +
      // device
      '<g class="sc" data-s="2 3 4" id="dev" style="transition:opacity .7s, transform 1s cubic-bezier(.6,.05,.2,1)">' +
        '<circle cx="400" cy="230" r="230" fill="url(#glow)"/>' +
        '<rect x="308" y="24" width="184" height="404" rx="28" fill="#0A1322" stroke="#33465F" stroke-width="2"/>' +
        '<rect x="316" y="32" width="168" height="388" rx="21" fill="#F4F7FB"/>' +
        '<path d="M316 53 a21 21 0 0 1 21 -21 h126 a21 21 0 0 1 21 21 v13 h-168z" fill="#0F2238"/>' +
        '<image href="' + ICON + '" x="326" y="40" width="18" height="18"/>' +
        '<text x="349" y="54" font-size="11" font-weight="800" fill="#fff">OffGrid<tspan fill="#F3C969">Wealth</tspan></text>' +
        '<g class="sc" data-s="2" id="lock"><rect x="380" y="180" width="40" height="34" rx="7" fill="#0F2238"/><path d="M388 180 v-9 a12 12 0 0 1 24 0 v9" fill="none" stroke="#0F2238" stroke-width="5"/><circle cx="400" cy="195" r="4" fill="#F3C969"/><rect x="398.5" y="196" width="3" height="9" rx="1.5" fill="#F3C969"/>' +
          '<text x="400" y="240" text-anchor="middle" font-size="12" font-weight="700" fill="#15263C">Stays on this device</text></g>' +
        '<g class="sc" data-s="3 4" id="dash">' +
          '<rect x="324" y="74" width="152" height="74" rx="11" fill="#183251"/>' +
          '<text x="334" y="92" font-size="9.5" fill="#A9BBD1">Net worth, all assets</text>' +
          '<text x="334" y="117" font-size="19" font-weight="800" fill="#fff" id="nw">₹0</text>' +
          '<text x="334" y="137" font-size="10" fill="#F3C969" font-weight="700">XIRR 18.0% a year</text>' +
          '<text x="324" y="170" font-size="9.5" font-weight="700" fill="#4D5F76">Where it is</text>' +
          donut +
          '<g font-size="9" fill="#4D5F76"><text x="402" y="222">Funds 55%</text><text x="402" y="236">Property 20%</text><text x="402" y="250">Retirals 15%</text><text x="402" y="264">Cash 10%</text></g>' +
          '<text x="324" y="290" font-size="9.5" font-weight="700" fill="#4D5F76">Money health</text>' + health +
          '<text x="324" y="336" font-size="9.5" font-weight="700" fill="#4D5F76">Family</text>' + bars +
        '</g>' +
      '</g>' +
      '<g id="chips">' + chips + '</g>' +
      // scene 5: planner cards
      '<g class="sc" data-s="4" id="plan">' +
        '<g class="pop" style="transition-delay:.3s"><rect x="336" y="30" width="444" height="124" rx="14" fill="#183251"/><text x="352" y="52" font-size="12" font-weight="700" fill="#EAF1F9">Goals</text>' + rings + '</g>' +
        '<g class="pop" style="transition-delay:1.2s"><rect x="336" y="166" width="216" height="138" rx="14" fill="#183251"/><text x="352" y="188" font-size="12" font-weight="700" fill="#EAF1F9">Retirement</text>' +
          '<text x="352" y="208" font-size="15" font-weight="800" fill="#F3C969">On track at 58</text>' +
          '<path class="draw" d="M352 290 C 390 285, 410 270, 440 255 S 500 222, 536 214" fill="none" stroke="#D9A441" stroke-width="3" pathLength="1000" style="transition-delay:1.6s"/>' +
          '<path d="M352 292 H536" stroke="#27446A"/></g>' +
        '<g class="pop" style="transition-delay:2s"><rect x="564" y="166" width="216" height="138" rx="14" fill="#183251"/><text x="580" y="188" font-size="12" font-weight="700" fill="#EAF1F9">Tax year ' + t.fy + '</text>' +
          '<text x="580" y="226" font-size="30" font-weight="800" fill="#fff">' + t.days + '</text><text x="580" y="244" font-size="11" fill="#A9BBD1">days to 31 March</text>' +
          '<text x="580" y="272" font-size="11" fill="#A9BBD1">Tax-free gains left</text><text x="580" y="290" font-size="14" font-weight="800" fill="#F3C969">₹1,25,000</text></g>' +
        '<g class="pop" style="transition-delay:2.8s"><rect x="336" y="316" width="444" height="96" rx="14" fill="#183251"/><text x="352" y="338" font-size="12" font-weight="700" fill="#EAF1F9">Policy check: the endowment plan you were offered</text>' +
          '<text x="352" y="364" font-size="11.5" fill="#A9BBD1">The policy earns</text><rect x="500" y="354" width="117" height="12" rx="4" fill="#E36B5A"/><text x="625" y="365" font-size="12" font-weight="800" fill="#fff">5.8% a year</text>' +
          '<text x="352" y="392" font-size="11.5" fill="#A9BBD1">Term plan + index fund</text><rect x="500" y="382" width="190" height="12" rx="4" fill="#F3C969"/><text x="698" y="393" font-size="12" font-weight="800" fill="#fff">9.4%</text></g>' +
      '</g>' +
      // scene 6: end card
      '<g class="sc" data-s="5" id="end">' +
        '<circle cx="400" cy="200" r="260" fill="url(#glow)"/>' +
        '<image class="pop" href="' + ICON + '" x="345" y="56" width="110" height="110"/>' +
        '<text x="400" y="222" text-anchor="middle" font-size="44" font-weight="800" fill="#fff" style="font-variation-settings:\'wdth\' 116">OffGrid<tspan fill="#F3C969">Wealth</tspan></text>' +
        '<text x="400" y="258" text-anchor="middle" font-size="18" fill="#A9BBD1">Your Wealth. Your Data. Your Privacy.</text>' +
        '<rect x="232" y="290" width="336" height="44" rx="22" fill="#D9A441"/><text x="400" y="318" text-anchor="middle" font-size="16" font-weight="800" fill="#1B1206">Free download — 14 days, all features</text>' +
        '<text x="400" y="368" text-anchor="middle" font-size="14" fill="#A9BBD1">Android phones and Windows PCs • offgridwealth.in</text>' +
      '</g>' +
      '</svg>';
  }

  function Film(root) {
    var rec = /[?&]rec\b/.test(location.search);
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.innerHTML = '<div class="film-stage">' + svg() + '<div class="cap" aria-live="off"></div></div>' +
      '<div class="film-bar"><button class="film-play" type="button" aria-label="Pause the story"></button><div class="film-steps">' +
      SCENES.map(function (s, i) { return '<button type="button"><i></i><span>Part ' + (i + 1) + ' of ' + SCENES.length + '</span></button>'; }).join('') +
      '</div><span class="film-time">0:00</span></div>';
    var S = root.querySelector('svg'), cap = root.querySelector('.cap'), play = root.querySelector('.film-play'),
      steps = [].slice.call(root.querySelectorAll('.film-steps button')), time = root.querySelector('.film-time'),
      chips = [].slice.call(S.querySelectorAll('.chip')), nw = S.querySelector('#nw');
    var cur = -1, t0 = 0, paused = reduce && !rec, visible = true, raf = 0, counter = 0, total = SCENES.reduce(function (a, s) { return a + s.d; }, 0);
    var ICONS = { play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>', pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="4" width="5" height="16" rx="1.5"/><rect x="14" y="4" width="5" height="16" rx="1.5"/></svg>' };

    function rings(on) { [].forEach.call(S.querySelectorAll('.ring'), function (r) { r.style.strokeDashoffset = on(r) ? 0 : r.getAttribute('data-len'); }); }
    function show(i) {
      cur = i;
      [].forEach.call(S.querySelectorAll('.sc'), function (g) { g.classList.toggle('on', g.getAttribute('data-s').split(' ').indexOf(String(i)) > -1); });
      var srv = S.querySelector('#srv'), dev = S.querySelector('#dev');
      clearTimeout(Film._t);
      if (i === 2) {
        dev.classList.remove('on'); S.querySelector('#lock').classList.remove('on');
        Film._t = setTimeout(function () { if (cur !== 2) return; srv.classList.remove('on'); dev.classList.add('on'); S.querySelector('#lock').classList.add('on'); }, 2100);
      }
      S.querySelector('#srvx').classList.toggle('on', i === 2);
      S.querySelector('#srvx .draw').classList.toggle('on', i === 2);
      S.querySelector('.srvbox').style.opacity = i === 2 ? .3 : 1;
      [].forEach.call(S.querySelectorAll('.tok'), function (t, k) {
        var x = t.style.transform.match(/translate\(([\d.]+)px/)[1];
        t.style.transform = 'translate(' + x + 'px,' + (i === 1 ? 140 : 236) + 'px)'; t.style.opacity = i === 1 ? 1 : 0;
      });
      chips.forEach(function (c, k) {
        var p = i === 0 ? POS0[k] : i === 1 ? POS1[k] : POS2[k];
        c.style.transitionDelay = (i === 0 ? k * 0.12 : i >= 3 ? k * 0.06 : 0) + 's';
        if (i <= 2) { c.style.transform = 'translate(' + p[0] + 'px,' + p[1] + 'px)'; c.style.opacity = i === 2 ? .55 : 1; }
        else { c.style.transform = 'translate(' + 325 + 'px,' + 190 + 'px) scale(.3)'; c.style.opacity = 0; }
        if (i === 5) c.style.transform = 'translate(325px,190px) scale(.3)';
      });
      S.querySelector('#dev').style.transform = i === 4 ? 'translate(-176px,0)' : '';
      rings(function (r) { var inPlan = r.closest('#plan'); return inPlan ? i === 4 : i === 3 || i === 4; });
      clearInterval(counter);
      if (i === 3) {
        var start = Date.now(), target = 27528343; nw.textContent = '₹0';
        counter = setInterval(function () { var f = Math.min(1, (Date.now() - start) / 1800); nw.textContent = inr(target * (1 - Math.pow(1 - f, 3))); if (f >= 1) clearInterval(counter); }, 40);
      } else if (i === 4) nw.textContent = inr(27528343); else nw.textContent = '₹0';
      cap.innerHTML = SCENES[i].cap;
      steps.forEach(function (b, k) { b.classList.toggle('done', k < i); b.querySelector('i').style.width = k < i ? '100%' : '0'; b.setAttribute('aria-current', k === i ? 'step' : 'false'); });
    }
    function elapsedBefore(i) { var a = 0; for (var k = 0; k < i; k++) a += SCENES[k].d; return a; }
    function tick() {
      raf = requestAnimationFrame(tick);
      if (paused || !visible) return;
      var e = Date.now() - t0, i = 0, a = 0;
      if (e >= total) { if (rec) { cancelAnimationFrame(raf); window.__filmDone = true; return; } t0 = Date.now(); e = 0; }
      while (i < SCENES.length - 1 && e >= a + SCENES[i].d) { a += SCENES[i].d; i++; }
      if (i !== cur) show(i);
      steps[i].querySelector('i').style.width = Math.min(100, (e - a) / SCENES[i].d * 100) + '%';
      var s = Math.floor(e / 1000); time.textContent = Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2);
    }
    function setPaused(p) { paused = p; play.innerHTML = p ? ICONS.play : ICONS.pause; play.setAttribute('aria-label', p ? 'Play the story' : 'Pause the story'); }
    var last = Date.now();
    setInterval(function () { var n = Date.now(); if (paused || !visible) t0 += n - last; last = n; }, 100);
    play.addEventListener('click', function () { if (paused && cur === SCENES.length - 1 && reduce) { t0 = Date.now(); show(0); } setPaused(!paused); });
    steps.forEach(function (b, k) { b.addEventListener('click', function () { t0 = Date.now() - elapsedBefore(k); show(k); }); });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(root);
    document.addEventListener('visibilitychange', function () { visible = !document.hidden; });
    setPaused(paused);
    if (rec) root.querySelector('.film-bar').style.display = 'none';
    t0 = Date.now();
    if (paused) { root.classList.add('reduced'); show(3); t0 = Date.now() - elapsedBefore(3); }
    else show(0);
    if (paused) { /* no RAF loop needed until played */ }
    tick();
    root.__film = { show: show, pause: setPaused, restart: function () { t0 = Date.now(); show(0); setPaused(false); } };
  }
  function init() { [].forEach.call(document.querySelectorAll('[data-film]'), Film); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
