/* Animated explainers for the six feature areas.
   <div class="xp" data-xp="track"></div>  → a looping 9-second SVG that plays while on screen.
   CSS keyframes only (transform / opacity / stroke-dashoffset); paused when off screen;
   under reduced motion the final frame is shown. */
(function () {
  'use strict';
  var G = '#F3C969', G2 = '#D9A441', B = '#7FA6CF', P = '#BFD6EC', N = '#0F2238', N2 = '#183251', N3 = '#27446A', W = '#EAF1F9', M = '#A9BBD1', OK = '#3DBE86', BAD = '#E36B5A';
  var D = 9; // seconds per loop
  function kf(name, body) { return '@keyframes ' + name + '{' + body + '}'; }
  function st(id, css) { return '<style>' + css.replace(/\.play \.k/g, '\u0001').replace(/(^|[^.#\w])\.k(?![\w-])/g, '$1#' + id + ' .k').replace(/\u0001/g, '#' + id + '.play .k') + '</style>'; }
  function wrap(id, inner, label) {
    return '<svg id="' + id + '" class="xpsvg" viewBox="0 0 640 400" role="img" aria-label="' + label + '"><rect width="640" height="400" rx="18" fill="' + N + '"/>' + inner + '</svg>';
  }
  var base = '.k{animation-duration:' + D + 's;animation-iteration-count:infinite;animation-timing-function:ease-in-out;animation-play-state:paused}.k:not(circle){transform-box:fill-box}.play .k{animation-play-state:running}';

  var X = {};

  /* 1 TRACK — statements fly in, one number rolls up, donut draws */
  X.track = function (id) {
    var docs = [['CAS', 'Mutual funds'], ['FD', 'Deposits'], ['EPF', 'Provident fund'], ['₹', 'Shares'], ['NPS', 'Pension']];
    var chips = docs.map(function (d, i) {
      return '<g class="k c' + i + '" style="animation-name:' + id + 'c' + i + '"><rect x="20" y="' + (40 + i * 66) + '" width="150" height="48" rx="10" fill="#fff"/><rect x="28" y="' + (48 + i * 66) + '" width="32" height="32" rx="8" fill="' + [G, B, P, G2, B][i] + '"/><text x="44" y="' + (69 + i * 66) + '" text-anchor="middle" font-size="' + (d[0].length > 2 ? 10 : 12) + '" font-weight="800" fill="' + N + '">' + d[0] + '</text><text x="68" y="' + (70 + i * 66) + '" font-size="14" font-weight="700" fill="' + N + '">' + d[1] + '</text></g>';
    }).join('');
    var css = base + docs.map(function (d, i) {
      var t0 = 10 + i * 8, t1 = t0 + 12;
      return kf(id + 'c' + i, '0%,' + t0 + '%{transform:translate(0,0);opacity:1}' + t1 + '%,100%{transform:translate(' + (200) + 'px,' + (150 - i * 66) + 'px) scale(.2);opacity:0}');
    }).join('') +
      kf(id + 'n0', '0%,20%{opacity:1}24%,100%{opacity:0}') + kf(id + 'n1', '0%,22%{opacity:0}26%,54%{opacity:1}58%,100%{opacity:0}') + kf(id + 'n2', '0%,56%{opacity:0}60%,100%{opacity:1}') + kf(id + 'left', '0%,58%{opacity:0}66%,100%{opacity:1}') +
      kf(id + 'd', '0%,50%{stroke-dashoffset:260}78%,100%{stroke-dashoffset:0}') + kf(id + 'fam', '0%,70%{transform:scaleY(0)}85%,100%{transform:scaleY(1)}') + kf(id + 'lbl', '0%,74%{opacity:0}82%,100%{opacity:1}');
    var inner = st(id, css) + chips +
      '<g class="k" style="animation-name:' + id + 'left"><text x="20" y="150" font-size="13" fill="' + M + '">5 statements read</text><text x="20" y="172" font-size="13" fill="' + M + '">on this device</text><text x="20" y="206" font-size="15" fill="' + G + '" font-weight="800">0 uploaded</text><text x="20" y="240" font-size="12" fill="' + M + '">No login. No server.</text></g>' +
      '<rect x="250" y="40" width="370" height="320" rx="16" fill="' + N2 + '" stroke="' + N3 + '"/>' +
      '<text x="274" y="76" font-size="12" fill="' + M + '" font-weight="700">NET WORTH — WHOLE FAMILY</text>' +
      '<text class="k" style="animation-name:' + id + 'n0" x="274" y="118" font-size="34" font-weight="800" fill="' + W + '">₹0</text>' +
      '<text class="k" style="animation-name:' + id + 'n1" x="274" y="118" font-size="34" font-weight="800" fill="' + W + '">₹1,60,96,935</text>' +
      '<text class="k" style="animation-name:' + id + 'n2" x="274" y="118" font-size="34" font-weight="800" fill="' + W + '">₹2,75,28,343</text>' +
      '<text x="274" y="142" font-size="13" fill="' + G + '" font-weight="700">XIRR 18.0% a year · 23 kinds of holding</text>' +
      '<circle cx="330" cy="240" r="42" fill="none" stroke="' + N3 + '" stroke-width="18"/>' +
      '<circle class="k" style="animation-name:' + id + 'd" cx="330" cy="240" r="42" fill="none" stroke="' + G + '" stroke-width="18" stroke-dasharray="145 260" stroke-dashoffset="260" transform="rotate(-90 330 240)"/>' +
      '<circle class="k" style="animation-name:' + id + 'd;animation-delay:.3s" cx="330" cy="240" r="42" fill="none" stroke="' + B + '" stroke-width="18" stroke-dasharray="52 260" stroke-dashoffset="260" transform="rotate(108 330 240)"/>' +
      '<circle class="k" style="animation-name:' + id + 'd;animation-delay:.6s" cx="330" cy="240" r="42" fill="none" stroke="' + P + '" stroke-width="18" stroke-dasharray="40 260" stroke-dashoffset="260" transform="rotate(180 330 240)"/>' +
      '<circle class="k" style="animation-name:' + id + 'd;animation-delay:.9s" cx="330" cy="240" r="42" fill="none" stroke="' + G2 + '" stroke-width="18" stroke-dasharray="26 260" stroke-dashoffset="260" transform="rotate(236 330 240)"/>' +
      '<g class="k" style="animation-name:' + id + 'lbl" font-size="12" fill="' + M + '"><text x="392" y="214">Funds 55%</text><text x="392" y="234">Property 20%</text><text x="392" y="254">Retirals 15%</text><text x="392" y="274">Cash 10%</text><text x="392" y="300" fill="' + BAD + '">Loans −₹17.5 L</text></g>' +
      '<text x="274" y="318" font-size="12" fill="' + M + '" font-weight="700">BY MEMBER</text>' +
      '<rect class="k" style="animation-name:' + id + 'fam;transform-origin:bottom" x="274" y="326" width="120" height="18" rx="4" fill="' + G + '"/><rect class="k" style="animation-name:' + id + 'fam;animation-delay:.2s;transform-origin:bottom" x="402" y="326" width="100" height="18" rx="4" fill="' + B + '"/><rect class="k" style="animation-name:' + id + 'fam;animation-delay:.4s;transform-origin:bottom" x="510" y="326" width="60" height="18" rx="4" fill="' + P + '"/>' +
      '<g class="k" style="animation-name:' + id + 'lbl" font-size="11" fill="' + N + '" font-weight="700"><text x="280" y="339">You</text><text x="408" y="339">Spouse</text><text x="516" y="339">Parent</text></g>';
    return wrap(id, inner, 'Statements from five places flow into one family net worth number');
  };

  /* 2 PLAN — move the slider, the goal fills and the date comes closer */
  X.plan = function (id) {
    var css = base + kf(id + 'knob', '0%,20%{transform:translate(0,0)}45%,100%{transform:translate(150px,0)}') + kf(id + 'fill', '0%,20%{transform:scaleX(0)}45%,100%{transform:scaleX(1)}') +
      kf(id + 'ring', '0%,20%{stroke-dashoffset:150}55%,100%{stroke-dashoffset:46}') +
      kf(id + 'a0', '0%,22%{opacity:1}30%,100%{opacity:0}') + kf(id + 'a1', '0%,28%{opacity:0}36%,100%{opacity:1}') +
      kf(id + 'y0', '0%,30%{opacity:1}40%,100%{opacity:0}') + kf(id + 'y1', '0%,38%{opacity:0}48%,100%{opacity:1}') +
      kf(id + 'tag', '0%,50%{transform:scale(.6);opacity:0}60%,100%{transform:scale(1);opacity:1}') + kf(id + 'line', '0%,20%{stroke-dashoffset:600}65%,100%{stroke-dashoffset:0}');
    var inner = st(id, css) +
      '<text x="30" y="46" font-size="13" fill="' + M + '" font-weight="700">GOAL · DAUGHTER’S EDUCATION · ₹25 L TODAY</text>' +
      '<circle cx="110" cy="150" r="56" fill="none" stroke="' + N3 + '" stroke-width="14"/>' +
      '<circle class="k" style="animation-name:' + id + 'ring" cx="110" cy="150" r="56" fill="none" stroke="' + G + '" stroke-width="14" stroke-linecap="round" stroke-dasharray="352 352" stroke-dashoffset="150" transform="rotate(-90 110 150)"/>' +
      '<text class="k" style="animation-name:' + id + 'a0" x="110" y="158" text-anchor="middle" font-size="26" font-weight="800" fill="' + W + '">41%</text>' +
      '<text class="k" style="animation-name:' + id + 'a1" x="110" y="158" text-anchor="middle" font-size="26" font-weight="800" fill="' + W + '">On track</text>' +
      '<text x="200" y="110" font-size="14" fill="' + M + '">Reached in</text>' +
      '<text class="k" style="animation-name:' + id + 'y0" x="200" y="150" font-size="36" font-weight="800" fill="' + BAD + '">2041</text>' +
      '<text class="k" style="animation-name:' + id + 'y1" x="200" y="150" font-size="36" font-weight="800" fill="' + OK + '">2037</text>' +
      '<text class="k" style="animation-name:' + id + 'y0" x="200" y="176" font-size="13" fill="' + BAD + '">3 years late for college</text>' +
      '<text class="k" style="animation-name:' + id + 'y1" x="200" y="176" font-size="13" fill="' + OK + '">1 year before college</text>' +
      '<text x="30" y="246" font-size="13" fill="' + M + '" font-weight="700">WHAT IF I ADD MORE EACH MONTH?</text>' +
      '<rect x="30" y="268" width="320" height="8" rx="4" fill="' + N3 + '"/>' +
      '<rect class="k" style="animation-name:' + id + 'fill;transform-origin:left" x="30" y="268" width="150" height="8" rx="4" fill="' + G + '"/>' +
      '<g class="k" style="animation-name:' + id + 'knob"><circle cx="30" cy="272" r="14" fill="#fff" stroke="' + G2 + '" stroke-width="3"/></g>' +
      '<text class="k" style="animation-name:' + id + 'a0" x="30" y="310" font-size="15" fill="' + W + '">₹4,500 a month now</text>' +
      '<text class="k" style="animation-name:' + id + 'a1" x="30" y="310" font-size="15" fill="' + W + '">₹4,500 <tspan fill="' + G + '" font-weight="800">+ ₹3,000</tspan> a month</text>' +
      // chart
      '<rect x="380" y="70" width="230" height="260" rx="12" fill="' + N2 + '"/><text x="396" y="94" font-size="12" fill="' + M + '" font-weight="700">PLAN VS ACTUAL</text>' +
      '<path d="M396 300 H596" stroke="' + N3 + '"/><path d="M396 300 V110" stroke="' + N3 + '"/>' +
      '<path d="M396 296 C 450 280, 500 230, 596 140" fill="none" stroke="' + N3 + '" stroke-width="2" stroke-dasharray="4 4"/>' +
      '<path class="k" style="animation-name:' + id + 'line" d="M396 296 C 440 288, 480 262, 520 236 S 580 170, 596 128" fill="none" stroke="' + G + '" stroke-width="3" stroke-dasharray="600" stroke-dashoffset="600" pathLength="600"/>' +
      '<g class="k" style="animation-name:' + id + 'tag"><rect x="486" y="104" width="110" height="24" rx="12" fill="' + OK + '"/><text x="541" y="121" text-anchor="middle" font-size="12" font-weight="800" fill="#fff">Ahead of plan</text></g>' +
      '<text x="396" y="322" font-size="11" fill="' + M + '">today</text><text x="560" y="322" font-size="11" fill="' + M + '">2037</text>';
    return wrap(id, inner, 'Moving the what-if slider fills the goal ring and brings the finish date forward');
  };

  /* 3 CHECK — your fund against the index with the same money, same dates */
  X.check = function (id) {
    var css = base + kf(id + 'you', '0%,8%{stroke-dashoffset:700}60%,100%{stroke-dashoffset:0}') + kf(id + 'idx', '0%,8%{stroke-dashoffset:700}60%,100%{stroke-dashoffset:0}') +
      kf(id + 'v', '0%,62%{transform:scale(.6);opacity:0}70%,100%{transform:scale(1);opacity:1}') +
      kf(id + 'h0', '0%,10%{opacity:0}14%,100%{opacity:1}') + kf(id + 'h1', '0%,20%{opacity:0}24%,100%{opacity:1}') + kf(id + 'h2', '0%,30%{opacity:0}34%,100%{opacity:1}') + kf(id + 'h3', '0%,40%{opacity:0}44%,100%{opacity:1}') + kf(id + 'h4', '0%,50%{opacity:0}54%,100%{opacity:1}') + kf(id + 'h5', '0%,60%{opacity:0}64%,100%{opacity:1}') +
      kf(id + 'dot', '0%,8%{opacity:0}12%,100%{opacity:1}');
    var checks = [['Emergency fund', '7.1 months', OK], ['Life cover', '₹1.6 Cr', OK], ['Health cover', '₹75 L', OK], ['Mix vs target', '63% / 50%', BAD], ['Loan EMIs', '15%', OK], ['Savings rate', '35%', OK]];
    var hc = checks.map(function (c, i) {
      var x = 30 + (i % 3) * 112, y = 290 + Math.floor(i / 3) * 52;
      return '<g class="k" style="animation-name:' + id + 'h' + i + '"><rect x="' + x + '" y="' + y + '" width="104" height="44" rx="8" fill="' + N2 + '"/><circle cx="' + (x + 12) + '" cy="' + (y + 14) + '" r="4" fill="' + c[2] + '"/><text x="' + (x + 22) + '" y="' + (y + 18) + '" font-size="10" fill="' + M + '">' + c[0] + '</text><text x="' + (x + 10) + '" y="' + (y + 36) + '" font-size="13" font-weight="800" fill="' + W + '">' + c[1] + '</text></g>';
    }).join('');
    var buys = [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { return '<circle class="k" style="animation-name:' + id + 'dot;animation-delay:' + (i * .4) + 's" cx="' + (60 + i * 36) + '" cy="212" r="4" fill="' + G + '"/>'; }).join('');
    var inner = st(id, css) +
      '<text x="30" y="40" font-size="13" fill="' + M + '" font-weight="700">FUND HEALTH · SAME MONEY, SAME DATES</text>' +
      '<rect x="30" y="56" width="580" height="190" rx="12" fill="' + N2 + '"/>' +
      '<path d="M60 212 H590" stroke="' + N3 + '"/>' + buys + '<text x="60" y="236" font-size="11" fill="' + M + '">every SIP you actually made →</text>' +
      '<path class="k" style="animation-name:' + id + 'idx" d="M60 206 C 150 196, 240 184, 320 160 S 480 108, 590 82" fill="none" stroke="' + P + '" stroke-width="3" stroke-dasharray="700" stroke-dashoffset="700" pathLength="700"/>' +
      '<path class="k" style="animation-name:' + id + 'you" d="M60 206 C 150 200, 240 194, 320 178 S 480 150, 590 126" fill="none" stroke="' + G + '" stroke-width="3" stroke-dasharray="700" stroke-dashoffset="700" pathLength="700"/>' +
      '<text x="468" y="76" font-size="12" fill="' + P + '" font-weight="700">Nifty Midcap 150 · 17.9%</text><text x="470" y="148" font-size="12" fill="' + G + '" font-weight="700">Your fund · -0.6%</text>' +
      '<g class="k" style="animation-name:' + id + 'v"><rect x="300" y="64" width="170" height="26" rx="13" fill="' + G2 + '"/><text x="385" y="82" text-anchor="middle" font-size="12" font-weight="800" fill="' + N + '">Trailing its index — review</text></g>' +
      '<text x="30" y="276" font-size="13" fill="' + M + '" font-weight="700">MONEY HEALTH · THE MOMENT YOU OPEN THE APP</text>' + hc +
      '<g transform="translate(372,300)"><rect width="238" height="86" rx="10" fill="' + N2 + '"/><text x="14" y="22" font-size="11" fill="' + M + '" font-weight="700">WHAT TO DO NEXT</text><circle cx="20" cy="42" r="4" fill="' + BAD + '"/><text x="30" y="46" font-size="12" fill="' + W + '">Premium overdue — mark paid</text><circle cx="20" cy="66" r="4" fill="' + G2 + '"/><text x="30" y="70" font-size="12" fill="' + W + '">Equity 63% vs target 50%</text></g>';
    return wrap(id, inner, 'Your fund drawn against the same money put into its index, plus six money-health checks');
  };

  /* 4 TAX — sales split into lots, short and long term, into the ITR columns */
  X.tax = function (id) {
    var rows = [['10/06/2025', '10/06/2024', '1,81,715', '2,19,160', 'LT'], ['11/06/2025', '12/09/2024', '94,180', '1,07,440', 'ST'], ['11/06/2025', '12/11/2024', '1,05,660', '1,19,320', 'ST'], ['15/02/2026', '20/01/2025', '2,16,010', '2,52,270', 'LT']];
    var css = base + rows.map(function (r, i) { var t = 10 + i * 9; return kf(id + 'r' + i, '0%,' + t + '%{transform:translate(-24px,0);opacity:0}' + (t + 6) + '%,100%{transform:translate(0,0);opacity:1}'); }).join('') +
      kf(id + 'tot', '0%,50%{opacity:0}58%,100%{opacity:1}') + kf(id + 'bar', '0%,60%{transform:scaleX(0)}80%,100%{transform:scaleX(1)}') + kf(id + 'days', '0%,2%{opacity:0}8%,100%{opacity:1}');
    var tr = rows.map(function (r, i) {
      var y = 118 + i * 30, c = r[4] === 'LT' ? B : G2;
      return '<g class="k" style="animation-name:' + id + 'r' + i + '"><text x="40" y="' + y + '" font-size="12" fill="' + W + '">' + r[0] + '</text><text x="138" y="' + y + '" font-size="12" fill="' + M + '">' + r[1] + '</text><text x="262" y="' + y + '" font-size="12" fill="' + M + '" text-anchor="end">' + r[2] + '</text><text x="352" y="' + y + '" font-size="12" fill="' + W + '" text-anchor="end">' + r[3] + '</text><rect x="366" y="' + (y - 12) + '" width="26" height="16" rx="4" fill="' + c + '"/><text x="379" y="' + y + '" font-size="10" font-weight="800" fill="' + N + '" text-anchor="middle">' + r[4] + '</text></g>';
    }).join('');
    var inner = st(id, css) +
      '<text x="30" y="40" font-size="13" fill="' + M + '" font-weight="700">CAPITAL GAINS · ITR FORMAT · FY 2025–26</text>' +
      '<rect x="30" y="56" width="380" height="300" rx="12" fill="' + N2 + '"/>' +
      '<g font-size="10" fill="' + M + '" font-weight="700"><text x="40" y="84">SALE DATE</text><text x="138" y="84">BOUGHT</text><text x="262" y="84" text-anchor="end">COST</text><text x="352" y="84" text-anchor="end">SALE</text><text x="366" y="84">TERM</text></g><path d="M40 92 H400" stroke="' + N3 + '"/>' + tr +
      '<g class="k" style="animation-name:' + id + 'tot"><path d="M40 246 H400" stroke="' + N3 + '"/><text x="40" y="272" font-size="12" fill="' + G2 + '" font-weight="700">Short-term gain</text><text x="352" y="272" font-size="13" fill="' + W + '" font-weight="800" text-anchor="end">₹26,920</text><text x="40" y="296" font-size="12" fill="' + B + '" font-weight="700">Long-term gain</text><text x="352" y="296" font-size="13" fill="' + W + '" font-weight="800" text-anchor="end">₹73,705</text><text x="40" y="332" font-size="11" fill="' + M + '">First-in first-out, from your own transactions. Every lot, every date.</text></g>' +
      '<rect x="430" y="56" width="180" height="140" rx="12" fill="' + N2 + '"/><text x="446" y="80" font-size="11" fill="' + M + '" font-weight="700">TAX YEAR ENDS 31 MARCH</text>' +
      '<text class="k" style="animation-name:' + id + 'days" x="446" y="130" font-size="44" font-weight="800" fill="' + W + '">174</text><text x="446" y="150" font-size="12" fill="' + M + '">days left</text>' +
      '<text x="446" y="178" font-size="11" fill="' + G + '" font-weight="700">₹1,25,000 tax-free left</text>' +
      '<rect x="430" y="212" width="180" height="144" rx="12" fill="' + N2 + '"/><text x="446" y="236" font-size="11" fill="' + M + '" font-weight="700">80C USED THIS YEAR</text>' +
      '<rect x="446" y="250" width="148" height="12" rx="6" fill="' + N3 + '"/><rect class="k" style="animation-name:' + id + 'bar;transform-origin:left" x="446" y="250" width="148" height="12" rx="6" fill="' + G + '"/><text x="446" y="282" font-size="13" fill="' + W + '" font-weight="800">₹1,50,000 of ₹1,50,000</text>' +
      '<text x="446" y="310" font-size="11" fill="' + M + '" font-weight="700">80CCD(1B) · NPS</text><rect x="446" y="318" width="148" height="12" rx="6" fill="' + N3 + '"/><rect class="k" style="animation-name:' + id + 'bar;animation-delay:.3s;transform-origin:left" x="446" y="318" width="0" height="12" rx="6" fill="' + G2 + '"/><text x="446" y="346" font-size="12" fill="' + W + '">₹0 of ₹50,000 — room left</text>';
    return wrap(id, inner, 'Sales split into lots with short- and long-term gains, a countdown to 31 March and the 80C limit used');
  };

  /* 5 PROTECT — what the policy earns against the alternatives */
  X.protect = function (id) {
    var alts = [['The endowment plan', 5.8, BAD], ['Bank FD, after tax', 6.6, P], ['PPF', 7.1, B], ['Term plan + index fund', 9.4, G]];
    var css = base + alts.map(function (a, i) { var t = 12 + i * 10; return kf(id + 'b' + i, '0%,' + t + '%{transform:scaleX(0)}' + (t + 14) + '%,100%{transform:scaleX(1)}') + kf(id + 't' + i, '0%,' + (t + 10) + '%{opacity:0}' + (t + 16) + '%,100%{opacity:1}'); }).join('') +
      kf(id + 'cov', '0%,60%{opacity:0}68%,100%{opacity:1}') + kf(id + 'bell', '0%,70%{transform:rotate(0)}74%{transform:rotate(14deg)}78%{transform:rotate(-12deg)}82%,100%{transform:rotate(0)}') + kf(id + 'sh', '0%,5%{stroke-dashoffset:400}40%,100%{stroke-dashoffset:0}');
    var bars = alts.map(function (a, i) {
      var y = 96 + i * 54, w = a[1] / 10 * 290;
      return '<text x="30" y="' + (y - 6) + '" font-size="12" fill="' + M + '">' + a[0] + '</text><rect x="30" y="' + y + '" width="290" height="18" rx="6" fill="' + N3 + '"/><rect class="k" style="animation-name:' + id + 'b' + i + ';transform-origin:left" x="30" y="' + y + '" width="' + w + '" height="18" rx="6" fill="' + a[2] + '"/><text class="k" style="animation-name:' + id + 't' + i + '" x="' + (38 + w) + '" y="' + (y + 14) + '" font-size="13" font-weight="800" fill="' + W + '">' + a[1].toFixed(1) + '% a year</text>';
    }).join('');
    var inner = st(id, css) +
      '<text x="30" y="40" font-size="13" fill="' + M + '" font-weight="700">POLICY CHECK · ₷48,000 A YEAR FOR 25 YEARS, SAME DATES</text>' +
      '<text x="30" y="66" font-size="14" fill="' + W + '">“LIC New Jeevan Anand” as offered — what does it really earn?</text>' + bars +
      '<g class="k" style="animation-name:' + id + 'cov"><text x="30" y="332" font-size="12" fill="' + M + '">Life cover that comes with it:</text><text x="30" y="352" font-size="13" fill="' + W + '">policy ₷10 L · term plan <tspan fill="' + G + '" font-weight="800">₷1.5 Cr</tspan> for the same money</text></g>' +
      // shield + bell on the right
      '<rect x="410" y="56" width="200" height="170" rx="12" fill="' + N2 + '"/><text x="426" y="80" font-size="11" fill="' + M + '" font-weight="700">COVER CHECK</text>' +
      '<path class="k" style="animation-name:' + id + 'sh" d="M510 96 l40 14 v34 c0 26 -18 44 -40 52 c-22 -8 -40 -26 -40 -52 v-34 z" fill="none" stroke="' + G + '" stroke-width="4" stroke-dasharray="400" stroke-dashoffset="400" pathLength="400"/>' +
      '<text x="510" y="150" text-anchor="middle" font-size="12" fill="' + W + '">Need ₷1.7 Cr</text><text x="510" y="168" text-anchor="middle" font-size="12" fill="' + OK + '" font-weight="800">Have ₷1.6 Cr</text>' +
      '<text x="426" y="212" font-size="11" fill="' + M + '">Health: ₷75 L · suggested ₷10 L + top-up</text>' +
      '<rect x="410" y="242" width="200" height="114" rx="12" fill="' + N2 + '"/><text x="426" y="266" font-size="11" fill="' + M + '" font-weight="700">PREMIUM DUE</text>' +
      '<g class="k" style="animation-name:' + id + 'bell;transform-origin:50% 20%"><path d="M580 262 c-10 0 -16 8 -16 18 v10 l-6 8 h44 l-6 -8 v-10 c0 -10 -6 -18 -16 -18z" fill="' + G + '"/><circle cx="580" cy="302" r="4" fill="' + G + '"/></g>' +
      '<text x="426" y="296" font-size="13" fill="' + W + '" font-weight="700">Star Health · ₷38,000</text><text x="426" y="316" font-size="12" fill="' + BAD + '">overdue by 4 days</text><rect x="426" y="326" width="96" height="20" rx="10" fill="' + N3 + '"/><text x="474" y="340" text-anchor="middle" font-size="11" fill="' + W + '">Add to calendar</text>';
    return wrap(id, inner, 'The yearly return of an endowment policy against FD, PPF and a term plan plus index fund, with the cover check and a premium reminder');
  };

  /* 6 LEARN — tap a word, the glossary opens */
  X.learn = function (id) {
    var css = base + kf(id + 'cur', '0%,14%{transform:translate(120px,70px);opacity:0}18%{opacity:1}34%{transform:translate(0,0);opacity:1}38%{transform:translate(0,0) scale(.85)}42%,70%{transform:translate(0,0) scale(1);opacity:1}76%,100%{opacity:0}') +
      kf(id + 'card', '0%,40%{transform:translate(0,16px);opacity:0}48%,88%{transform:translate(0,0);opacity:1}96%,100%{opacity:0}') + kf(id + 'hl', '0%,36%{opacity:0}42%,100%{opacity:1}');
    var inner = st(id, css) +
      '<rect x="30" y="30" width="580" height="340" rx="14" fill="#FBFAF6"/>' +
      '<text x="56" y="70" font-size="11" fill="#8A7A58" font-weight="700">CHAPTER 3 · MUTUAL FUNDS</text>' +
      '<text x="56" y="100" font-size="20" font-weight="800" fill="' + N + '" style="font-variation-settings:\'wdth\' 112">How do I know what my fund really earned?</text>' +
      '<g font-size="14" fill="#2B3A4E"><text x="56" y="136">The statement shows the value today. It does not show the return,</text><text x="56" y="160">because your money went in on many different dates. The number</text><text x="56" y="184">that allows for that is called <tspan id="' + id + 'w" fill="' + G2 + '" font-weight="700" text-decoration="underline">XIRR</tspan>. Think of it as the interest rate</text><text x="56" y="208">a bank would have had to pay you for the same result.</text></g>' +
      '<rect class="k" style="animation-name:' + id + 'hl" x="274" y="170" width="46" height="20" rx="4" fill="' + G + '" opacity="0"/>' +
      '<text x="56" y="256" font-size="14" fill="#2B3A4E">In a nutshell: compare XIRR, not absolute gain, when two funds</text><text x="56" y="280" font-size="14" fill="#2B3A4E">were bought on different dates.</text>' +
      // cursor (hand)
      '<g class="k" style="animation-name:' + id + 'cur"><path d="M300 184 l0 -16 a4 4 0 0 1 8 0 l0 10 l10 2 l8 2 a6 6 0 0 1 5 6 l-2 14 a8 8 0 0 1 -8 7 l-12 0 a8 8 0 0 1 -7 -4 l-8 -12 a4 4 0 0 1 6 -5 z" fill="#fff" stroke="' + N + '" stroke-width="2" stroke-linejoin="round"/></g>' +
      // glossary card
      '<g class="k" style="animation-name:' + id + 'card"><rect x="300" y="196" width="296" height="160" rx="12" fill="' + N + '"/><rect x="300" y="196" width="296" height="6" rx="3" fill="' + G + '"/>' +
      '<text x="318" y="226" font-size="15" font-weight="800" fill="' + W + '">XIRR</text><text x="360" y="226" font-size="11" fill="' + M + '">in the glossary · 173 terms</text>' +
      '<text x="318" y="252" font-size="12" fill="' + M + '" font-weight="700">In simple words</text><text x="318" y="270" font-size="12" fill="' + W + '">The yearly return on money that went in at different times.</text>' +
      '<text x="318" y="296" font-size="12" fill="' + M + '" font-weight="700">Example</text><text x="318" y="314" font-size="12" fill="' + W + '">₷5,000 a month for 5 years → ₷4.1 L today = 12.3% XIRR.</text>' +
      '<text x="318" y="340" font-size="12" fill="' + G + '" font-weight="700">What to do: compare it with the index, same dates →</text></g>';
    return wrap(id, inner, 'Tapping an underlined word in the Investor Guide opens its glossary entry with a rupee example');
  };

  function init() {
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var els = [].slice.call(document.querySelectorAll('[data-xp]'));
    els.forEach(function (el, i) {
      var k = el.getAttribute('data-xp'); if (!X[k]) return;
      el.innerHTML = X[k]('xp' + i + k);
      if (reduce) { el.querySelector('svg').classList.add('end'); }
    });
    if (reduce) return;
    if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.firstChild && el.firstChild.classList.add('play'); }); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { var s = e.target.querySelector('svg'); if (s) s.classList.toggle('play', e.isIntersecting); }); }, { threshold: .25 });
    els.forEach(function (el) { io.observe(el); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
