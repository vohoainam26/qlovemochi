(() => {
  const root = document.querySelector('#qlove-main');
  if (!root) return;
  // Inventory retains the authoritative Drive URL; the UI uses its local copy.
  // Render only the non-destructive, transparent-background product PNGs.
  const image = p => `/assets/qlove/products-cutout/${p.number}.png`;
  const group = (items, from, to) => items.filter(p => p.number >= from && p.number <= to);
  const shortSize = name => (name.match(/(\d+g)/i) || [''])[0];
  const card = (p, index = 0) => `<article class="qlove-card" style="--card-blob:${['#ffd3ba','#f49fbc','#e1f5ee','#eee4f3'][index % 4]}"><img src="${image(p)}" alt="${p.name}" loading="lazy" decoding="async" width="360" height="280"><h3>${p.name}</h3><p>${shortSize(p.name)}</p></article>`;
  const collection = (id, index, title, copy, items, extra = '') => `<section class="qlove-section qlove-collection ${extra}" id="${id}"><div class="qlove-collection__head"><p class="qlove-kicker">${String(index).padStart(2,'0')} / ${items.length} flavours</p><h2>${title}</h2><p>${copy}</p><span class="qlove-collection__count">${items.length} PRODUCTS</span></div><div class="qlove-grid">${items.map(card).join('')}</div></section>`;
  const deluxeOverviewLayout = [
    { x: 13, y: 24, scale: .91, rotate: -7, depth: 2, accent: '#d1dfc8' },
    { x: 34, y: 18, scale: 1.12, rotate: 5, depth: 5, accent: '#f5d5af' },
    { x: 59, y: 26, scale: .88, rotate: -4, depth: 1, accent: '#e7c2c4' },
    { x: 82, y: 18, scale: 1.05, rotate: 7, depth: 4, accent: '#d6d9eb' },
    { x: 92, y: 49, scale: .92, rotate: -6, depth: 2, accent: '#efd2b8' },
    { x: 69, y: 53, scale: 1.13, rotate: 4, depth: 6, accent: '#eee4c9' },
    { x: 43, y: 51, scale: .97, rotate: -5, depth: 3, accent: '#ebcbd7' },
    { x: 18, y: 55, scale: 1.06, rotate: 6, depth: 5, accent: '#ddc4bb' },
    { x: 34, y: 81, scale: .94, rotate: -4, depth: 2, accent: '#ecd4b9' },
    { x: 76, y: 82, scale: 1.03, rotate: 5, depth: 4, accent: '#d7dce5' }
  ];
  const deluxeFlavour = name => name.replace(/^QLove\s+/i, '').replace(/\s+Deluxe Mochi\s+\d+g\s+TWN$/i, '');
  const deluxeShowcase = items => `<section class="qlove-section qlove-deluxe-showcase" id="deluxe-mochi" data-mode="all" aria-labelledby="qlove-deluxe-title">
    <div class="qlove-deluxe-showcase__ambient" aria-hidden="true"></div>
    <div class="qlove-deluxe-showcase__header">
      <div class="qlove-deluxe-showcase__heading"><p class="qlove-kicker"></p><h2 id="qlove-deluxe-title">DELUXE<br>MOCHI</h2><p class="qlove-deluxe-showcase__weights-line">168g / 180g</p></div>
      <div class="qlove-deluxe-showcase__tools"><p class="qlove-deluxe-showcase__intro">Ten flavours. One deliciously different collection.</p><div class="qlove-deluxe-showcase__weight-controls" role="group" aria-label="Filter Deluxe Mochi by weight"><button type="button" data-weight="168" aria-pressed="false">168G</button><button type="button" data-weight="180" aria-pressed="false">180G</button><span class="qlove-deluxe-showcase__weight-indicator" aria-hidden="true"></span></div><p class="qlove-deluxe-showcase__instruction">Choose a weight, or pick a flavour below.</p></div>
    </div>
    <div class="qlove-deluxe-showcase__experience">
      <div class="qlove-deluxe-showcase__hero">
        <div class="qlove-deluxe-showcase__hero-stage"><span class="qlove-deluxe-showcase__hero-word" aria-hidden="true">DELUXE</span><img class="qlove-deluxe-showcase__hero-image" src="${image(items[0])}" alt="" width="1000" height="1000"><p class="qlove-deluxe-showcase__hero-empty">CHOOSE<br>A FLAVOUR</p></div>
        <div class="qlove-deluxe-showcase__hero-copy" aria-live="polite" hidden><p class="qlove-deluxe-showcase__hero-kicker">QLove Deluxe Mochi</p><h3 class="qlove-deluxe-showcase__hero-flavour"></h3><p class="qlove-deluxe-showcase__hero-fullname"></p><p class="qlove-deluxe-showcase__hero-weight"></p><span class="qlove-deluxe-showcase__hero-counter"></span></div>
      </div>
      <div class="qlove-deluxe-showcase__field" role="group" aria-label="Deluxe Mochi flavours">${items.map((product, index) => {
        const layout = deluxeOverviewLayout[index];
        const weight = shortSize(product.name).slice(0, -1);
        return `<button class="qlove-deluxe-showcase__product" type="button" data-number="${product.number}" data-weight="${weight}" data-accent="${layout.accent}" aria-label="${product.name}" aria-pressed="false" style="--overview-x:${layout.x}%;--overview-y:${layout.y}%;--overview-scale:${layout.scale};--overview-rotate:${layout.rotate}deg;--overview-depth:${layout.depth};--entrance-order:${index}"><span class="qlove-deluxe-showcase__product-visual"><img src="${image(product)}" alt="" loading="lazy" decoding="async" width="1000" height="1000"></span><span class="qlove-deluxe-showcase__product-label"><strong>${deluxeFlavour(product.name)}</strong><small>${weight}G</small></span></button>`;
      }).join('')}</div>
    </div>
    <div class="qlove-deluxe-showcase__footer"><span class="qlove-deluxe-showcase__status" aria-live="polite">10 FLAVOURS</span><span class="qlove-deluxe-showcase__footer-note">A little extra in every bite.</span></div>
  </section>`;
  const dorayakiScrollScenes = [
    { key: 'matcha', label: 'Matcha & Red Bean', display: 'MATCHA & RED BEAN', description: 'earthy \u00b7 creamy \u00b7 classic', background: '#dfe8c4', fill: '#4d6339', title: 'Matcha scene' },
    { key: 'boba', label: 'Boba Milk Tea', display: 'BOBA MILK TEA', description: 'milky \u00b7 chewy \u00b7 playful', background: '#d9edf1', fill: '#9f785e', title: 'Boba milk tea scene' },
    { key: 'redbean', label: 'Red Bean', display: 'RED BEAN', description: 'sweet \u00b7 smooth \u00b7 nostalgic', background: '#efd6d7', fill: '#7f2d2f', title: 'Red bean scene' },
    { key: 'strawberry', label: 'Strawberry', display: 'STRAWBERRY', description: 'fruity \u00b7 soft \u00b7 bright', background: '#f5d3dd', fill: '#c84f67', title: 'Strawberry scene' }
  ];
  const dorayakiShowcase = items => {
    const transparentImage = product => `/assets/qlove/products-cutout/${product.number}-transparent.png`;
    const flavours = dorayakiScrollScenes.map((scene, index) => ({
      ...scene,
      product: items.find(product => product.number === 72 + index) || items[index]
    }));
    const first = flavours[0];
    return `<section class="qlove-section qlove-dora-scroll" id="dorayaki" aria-labelledby="qlove-dora-title">
      <div class="qlove-dora-stage" id="qlove-dora-stage" style="--dora-background:${first.background};--dora-fill:${first.fill}">
        <div class="qlove-dora-flash" id="qlove-dora-flash" aria-hidden="true"></div>
        <header class="qlove-dora-header">
          <div><h2 id="qlove-dora-title">DORAYAKI</h2><p>One flavour at a time. Scroll to rotate through the collection.</p></div>
          <div class="qlove-dora-hint">Scroll through 4 flavours &darr;</div>
        </header>
        <div class="qlove-dora-main">
          <div class="qlove-dora-copy">
            <div class="qlove-dora-kicker">QLove Dorayaki</div>
            <h3 class="qlove-dora-flavour" id="qlove-dora-flavour">${first.display}</h3>
            <div class="qlove-dora-meta"><span class="qlove-dora-pill">165G</span><span id="qlove-dora-desc">${first.description}</span></div>
          </div>
          <div class="qlove-dora-visual">
            <div class="qlove-dora-wheel" id="qlove-dora-wheel" aria-hidden="true"><div class="qlove-dora-cut" id="qlove-dora-cut"></div></div>
            <div class="qlove-dora-packwrap">
              <img class="qlove-dora-pack" id="qlove-dora-pack" src="${transparentImage(first.product)}" alt="${first.product.name}" width="1000" height="1000" loading="eager" fetchpriority="high" decoding="async">
            </div>
          </div>
          <aside class="qlove-dora-side" aria-label="Dorayaki flavour progress">
            <div class="qlove-dora-progress" id="qlove-dora-progress">
              ${flavours.map(({ label, product }, index) => `<button class="${index === 0 ? 'active' : ''}" type="button" data-index="${index}" data-src="${transparentImage(product)}" data-alt="${product.name}" aria-label="Show ${label}"${index === 0 ? ' aria-current="step"' : ''}></button>`).join('')}
            </div>
            <div class="qlove-dora-steptitle" id="qlove-dora-steptitle">${first.title}</div>
            <p class="qlove-dora-stepcopy" id="qlove-dora-stepcopy">Each scroll beat rotates the dorayaki wheel 90&deg; and flips in the next flavour.</p>
          </aside>
        </div>
        <div class="qlove-dora-bar" aria-hidden="true"><span id="qlove-dora-bar-fill"></span></div>
      </div>
    </section>`;
  };
  const snowflakePresentation = [
    { key: 'yuzu', name: 'Yuzu', accent: '#dfc642', soft: '#fff5b8', description: 'Bright citrus freshness with a light, lively Snowflake character.' },
    { key: 'toffee', name: 'Toffee', accent: '#b98a61', soft: '#f2dfca', description: 'Smooth caramel-like sweetness with a soft and comforting finish.' },
    { key: 'strawberry', name: 'Strawberry', accent: '#e96f91', soft: '#f9ccda', description: 'A fruity, playful strawberry profile with a light creamy feel.' },
    { key: 'mango', name: 'Mango', accent: '#efa642', soft: '#ffe0a1', description: 'Tropical mango notes with a sunny, juicy and refreshing mood.' },
    { key: 'cookies-cream', name: 'Cookies & Cream', accent: '#637ca1', soft: '#dce5f0', description: 'A richer cookies-and-cream flavour that adds contrast to the light texture.' }
  ];
  const snowflakeLayout = [
    { stackX: -42, stackY: 12, stackR: -9, stackS: .91, depth: 1, fanX: '-17.5vw', fanY: '3vh', fanR: -11, focusX: '-12vw', focusY: '-2vh' },
    { stackX: -21, stackY: -2, stackR: -5, stackS: .96, depth: 2, fanX: '-11.5vw', fanY: '-5vh', fanR: -5, focusX: '-8vw', focusY: '-5vh' },
    { stackX: 0, stackY: -16, stackR: 0, stackS: 1, depth: 5, fanX: '0vw', fanY: '-11vh', fanR: 0, focusX: '0vw', focusY: '-11vh' },
    { stackX: 21, stackY: -1, stackR: 5, stackS: .96, depth: 3, fanX: '11.5vw', fanY: '-5vh', fanR: 5, focusX: '8vw', focusY: '-5vh' },
    { stackX: 42, stackY: 14, stackR: 9, stackS: .91, depth: 1, fanX: '17.5vw', fanY: '3vh', fanR: 11, focusX: '12vw', focusY: '-2vh' }
  ];
  const snowflakeShowcase = items => {
    const flavours = snowflakePresentation.map((presentation, index) => ({ ...presentation, product: items[index], layout: snowflakeLayout[index] }));
    const active = flavours[2];
    return `<section class="qlove-section qlove-snowflake-showcase" id="snowflake" data-layout="overview" data-active="${active.key}" style="--snowflake-accent:${active.accent};--snowflake-soft:${active.soft}" aria-labelledby="qlove-snowflake-title">
      <div class="qlove-snowflake-showcase__sticky">
        <div class="qlove-snowflake-showcase__frost" aria-hidden="true"></div>
        <header class="qlove-snowflake-showcase__header">
          <h2 id="qlove-snowflake-title">SNOW<br>FLAKE</h2>
          <p>Five light, colourful Snowflake Cake flavours.</p>
          <span>5 PRODUCTS</span>
        </header>
        <div class="qlove-snowflake-showcase__stage">
          <div class="qlove-snowflake-showcase__cluster" role="listbox" aria-label="Snowflake Cake flavours">${flavours.map(({ product, key, name, accent, soft, layout }, index) => `<button class="qlove-snowflake-showcase__product" id="qlove-snowflake-${key}" type="button" role="option" aria-selected="${index === 2}" aria-label="${name} Snowflake Cake, 60 grams" data-key="${key}" data-index="${index}" data-name="${name}" data-title="${product.name}" data-description="${snowflakePresentation[index].description}" data-accent="${accent}" data-soft="${soft}" style="--stack-x:${layout.stackX}px;--stack-y:${layout.stackY}px;--stack-r:${layout.stackR}deg;--stack-s:${layout.stackS};--stack-z:${layout.depth};--fan-x:${layout.fanX};--fan-y:${layout.fanY};--fan-r:${layout.fanR}deg;--focus-x:${layout.focusX};--focus-y:${layout.focusY};--product-accent:${accent};--product-soft:${soft}"><span class="qlove-snowflake-showcase__halo" aria-hidden="true"></span><img src="${image(product)}" alt="" loading="lazy" decoding="async" width="1000" height="1000"><span class="qlove-snowflake-showcase__label"><strong>${name}</strong><small>${String(index + 1).padStart(2, '0')}</small></span></button>`).join('')}</div>
          <p class="qlove-snowflake-showcase__gesture">SELECT A FLAVOUR &middot; CLICK TO FOCUS</p>
        </div>
        <aside class="qlove-snowflake-showcase__info" aria-live="polite" aria-atomic="true">
          <div class="qlove-snowflake-showcase__info-meta"><span class="qlove-snowflake-showcase__index">03 / 05</span><span>SNOWFLAKE CAKE &middot; 60G</span></div>
          <h3>${active.name}</h3>
          <p>${active.description}</p>
          <div class="qlove-snowflake-showcase__progress" aria-hidden="true"><i style="--snowflake-progress:60%"></i></div>
        </aside>
      </div>
    </section>`;
  };
  const pouchPalettes = ['#f0d5c7','#d6ebdf','#ddd2e6','#f6d1d9','#d6dcf2','#f2d1cb','#ead5b5','#d5e8dc','#e7cfdf','#f6dbb9','#d7e8d3','#dcd0ea','#efc4df','#f1c985'];
  const pouchTitles = ['PISTACHIO CHOCOLATE','STRAWBERRY MATCHA','BIRTHDAY CAKE','COOKIES & CREAM','STRAWBERRY CHEESECAKE','MANGO MATCHA','STRAWBERRY TIRAMISU','WATERMELON','RASPBERRY CHOCOLATE','SAKURA BLOSSOM','MATCHA LATTE','APPLE CINNAMON','BUBBLEGUM','MANGO CHILLI'];
  // Soft, very low-saturation ambient wash colours — one per Deluxe Pouch flavour
  const pouchAmbient = [
    '#ddd8c8', // 0  Pistachio Chocolate  → warm pistachio beige
    '#cdddd0', // 1  Strawberry Matcha    → soft sage with pink warmth
    '#cdd4e8', // 2  Birthday Cake        → pastel sky / lavender
    '#d6dae2', // 3  Cookies & Cream      → cool icy blue-grey
    '#ecdad8', // 4  Strawberry Cheesecake→ soft blush
    '#e2dcc4', // 5  Mango Matcha         → mango cream, green undertone
    '#e0cec8', // 6  Strawberry Tiramisu  → strawberry cocoa beige
    '#cee0cc', // 7  Watermelon           → pale watermelon green-pink
    '#d6ccd6', // 8  Raspberry Chocolate  → muted berry mauve
    '#ecccd8', // 9  Sakura Blossom       → soft sakura pink
    '#c8d6c4', // 10 Matcha Latte         → muted matcha green
    '#e4d6c4', // 11 Apple Cinnamon       → warm cinnamon beige
    '#e8cadf', // 12 Bubblegum            → playful pastel pink
    '#ead39f', // 13 Mango Chilli         → warm mango gold
  ];
  const pouchWallCard = (product, index) => `<article class="qlove-pouch-wall__card" tabindex="0" style="--pouch-bg:${pouchPalettes[index % pouchPalettes.length]};--pouch-ink:#2b2930;--card-index:${index % 4}"><div class="qlove-pouch-wall__media"><img class="qlove-pouch-wall__image qlove-pouch-wall__image--default" src="${image(product)}" alt="${product.name}" loading="lazy" decoding="async" draggable="false" width="1000" height="1000"><img class="qlove-pouch-wall__image qlove-pouch-wall__image--hover" src="/assets/products/deluxe-pouch-120g/pouch-${index + 1}.png" alt="" aria-hidden="true" loading="lazy" decoding="async" draggable="false" width="1000" height="1000"></div><div class="qlove-pouch-wall__info"><h3>${pouchTitles[index] || product.name}</h3><p>${shortSize(product.name)}</p></div></article>`;
  const pouchWall = items => `<section class="qlove-section qlove-pouch-wall" id="deluxe-pouch-120g" aria-labelledby="qlove-pouch-wall-title"><div class="qlove-pouch-wall__ambient" aria-hidden="true"></div><div class="qlove-pouch-wall__head"><p class="qlove-kicker">03 / ${items.length} FLAVOURS</p><h2 id="qlove-pouch-wall-title">DELUXE POUCH 120G</h2></div><div class="qlove-pouch-wall__carousel"><button class="qlove-pouch-wall__arrow qlove-pouch-wall__prev" type="button" aria-label="Previous flavour">←</button><div class="qlove-pouch-wall__viewport" tabindex="0" role="region" aria-label="Deluxe pouch flavours"><div class="qlove-pouch-wall__track">${items.map(pouchWallCard).join('')}</div></div><button class="qlove-pouch-wall__arrow qlove-pouch-wall__next" type="button" aria-label="Next flavour">→</button></div><div class="qlove-pouch-wall__status"><span class="qlove-pouch-wall__counter" aria-live="polite">01 / ${String(items.length).padStart(2, '0')}</span><i></i></div></section>`;
  // One frame for every Mini Mochi flavour; artwork pairs share the same layout.
  const miniPalettes = [
    { title: 'MANGO', bg: '#fbd273', ink: '#35251b' },
    { title: 'MATCHA', bg: '#b7d1a1', ink: '#264432' },
    { title: 'CHOCOLATE', bg: '#805548', ink: '#fff8ee' },
    { title: 'STRAWBERRY', bg: '#f3abc4', ink: '#572938' },
    { title: 'BLUEBERRY', bg: '#8f9bd4', ink: '#202d5d' },
    { title: 'LYCHEE', bg: '#f8cbd1', ink: '#673d49' },
    { title: 'PEANUT', bg: '#d9bd91', ink: '#513a26' },
    { title: 'TARO', bg: '#c8b6df', ink: '#433057' }
  ];
  const miniPanel = (product, index) => {
    const flavour = miniPalettes[index];
    const artwork = `/assets/qlove/Minimochi/${flavour.title}`;
    const maskId = `qlove-mini-reveal-${index}`;
    const origins = [
      [[.48, .68], [.22, .45], [.77, .29]],
      [[.53, .66], [.25, .50], [.73, .31]],
      [[.45, .70], [.29, .40], [.79, .35]]
    ][index % 3];
    return `<article class="qlove-mini-panel" style="--mini-bg:${flavour.bg};--mini-ink:${flavour.ink}" aria-label="${product.name}">
      <div class="qlove-mini-panel__media" aria-hidden="true">
        <img class="qlove-mini-panel__image qlove-mini-panel__image--default" src="${artwork}1.png" alt="" loading="lazy" decoding="async" width="1024" height="1536">
        <span class="qlove-mini-panel__hover-reveal"><img class="qlove-mini-panel__image qlove-mini-panel__image--hover" src="${artwork}2.png" alt="" loading="lazy" decoding="async" width="1024" height="1536"></span>
        <svg class="qlove-mini-panel__mask-defs" aria-hidden="true" focusable="false" width="0" height="0"><defs><filter id="${maskId}-soft" x="-15%" y="-15%" width="130%" height="130%"><feGaussianBlur stdDeviation="0.01"/></filter><mask id="${maskId}" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox" style="mask-type:alpha"><g filter="url(#${maskId}-soft)">${origins.map(([x, y]) => `<circle class="qlove-mini-panel__reveal-spot" cx="${x}" cy="${y}" r="0" fill="white"/>`).join('')}</g></mask></defs></svg>
      </div>
      <h3 class="qlove-mini-panel__title">${flavour.title}</h3>
    </article>`;
  };
  const miniShowcase = items => `<section class="qlove-section qlove-mini-showcase" id="mini-mochi" aria-labelledby="qlove-mini-title">
    <div class="qlove-mini-showcase__header">
      <div class="qlove-mini-showcase__heading-row">
        <h2 id="qlove-mini-title">MINI MOCHI</h2>
      </div>
      <p>Pick a flavour. Keep it playful.</p>
    </div>
    <div class="qlove-mini-showcase__viewport" role="region" aria-label="Mini Mochi flavours" tabindex="0">
      <div class="qlove-mini-showcase__track">${items.map(miniPanel).join('')}</div>
    </div>
    <div class="qlove-mini-showcase__controls">
      <button class="qlove-mini-showcase__arrow qlove-mini-showcase__prev" type="button" aria-label="Previous Mini Mochi flavour">&larr;</button>
      <span class="qlove-mini-showcase__counter" aria-live="polite">01 / 08</span>
      <button class="qlove-mini-showcase__arrow qlove-mini-showcase__next" type="button" aria-label="Next Mini Mochi flavour">&rarr;</button>
    </div>
  </section>`;
  const premiumFlavours = [
    { title: 'PEACH CUSTARD', bg: '#f8d5c4', accent: '#efb78e', ink: '#6a3434' },
    { title: 'CHOCO MINT', bg: '#cce7d7', accent: '#94c9b1', ink: '#28584d' },
    { title: 'PASSION FRUIT', bg: '#d9c4e5', accent: '#f2c477', ink: '#594069' },
    { title: 'COCONUT', bg: '#bce4e3', accent: '#f5f0d9', ink: '#245a60' },
    { title: 'GOLDEN FRUIT', bg: '#f8d47a', accent: '#f1a661', ink: '#71431d' }
  ];
  const premiumCard = (product, index) => {
    const flavour = premiumFlavours[index];
    return `<article class="qlove-extra-card" style="--extra-card-bg:${flavour.bg};--extra-card-accent:${flavour.accent};--extra-card-ink:${flavour.ink}" aria-label="${product.name}">
      <h3>${flavour.title}</h3>
      <img src="${image(product)}" alt="${product.name}" loading="lazy" decoding="async" width="1000" height="1000" style="position:absolute; top:57%; left:50%; transform:translate(-50%,-50%); width:85%; height:auto; max-height:75%;">
    </article>`;
  };
  const premiumJourney = items => `<section class="qlove-section qlove-extra-journey" id="extra-to-love" aria-labelledby="qlove-extra-title">
    <div class="qlove-extra-journey__stage">
      <div class="qlove-extra-journey__heading">
        <p class="qlove-kicker">PREMIUM FILLING MINI</p>
        <h2 id="qlove-extra-title">EXTRA <br>TO LOVE</h2>
        <p>Five playful mini flavours, each with a little extra inside.</p>
      </div>
      <div class="qlove-extra-journey__viewport" role="region" aria-label="Premium Filling Mini Mochi flavours" tabindex="0">
        <div class="qlove-extra-journey__track">${items.map(premiumCard).join('')}</div>
      </div>
      <div class="qlove-extra-journey__status" aria-label="Current flavour"><span class="qlove-extra-journey__counter" aria-live="polite">01 / 05</span><span class="qlove-extra-journey__progress"><i></i></span></div>
    </div>
  </section>`;
  const traditionalHover = {
    9: { file: 'matcha', accent: '#c8e3ae', soft: '#e8f3d9' },
    10: { file: 'peanut', accent: '#f7d39a', soft: '#fff1d5' },
    11: { file: 'red-bean', accent: '#e7b7b2', soft: '#f9e3df' },
    12: { file: 'boba-milk-tea', accent: '#d6b79a', soft: '#f3e7d9' },
    13: { file: 'pandan-coconut', accent: '#b9dec9', soft: '#e4f3e9' },
    14: { file: 'sesame', accent: '#d8d1db', soft: '#f1edf2' },
    15: { file: 'taro', accent: '#d7c0e8', soft: '#f0e7f7' }
  };
  const traditionalCard = p => {
    const hover = traditionalHover[p.number];
    const maskId = `qlove-traditional-wave-${p.number}`;
    return `<article class="qlove-card qlove-traditional-card" style="--traditional-accent:${hover.accent};--traditional-soft:${hover.soft}">
      <div class="qlove-traditional-card__media">
        <span class="qlove-traditional-card__mood" aria-hidden="true"></span>
        <img class="qlove-traditional-card__image qlove-traditional-card__image--default" src="${image(p)}" alt="${p.name}" loading="lazy" decoding="async" width="1000" height="1000">
        <img class="qlove-traditional-card__image qlove-traditional-card__image--hover" src="/assets/products/traditional-mochi/${hover.file}.png" alt="" aria-hidden="true" loading="lazy" decoding="async">
        <svg class="qlove-traditional-card__mask-defs" aria-hidden="true" focusable="false" width="0" height="0"><defs><filter id="${maskId}-soft" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="0.009"/></filter><mask id="${maskId}" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox" style="mask-type:alpha"><path class="qlove-traditional-card__wave" fill="white" filter="url(#${maskId}-soft)" d="M0 1.2 L1 1.2 L1 1.3 L0 1.3 Z"/></mask></defs></svg>
      </div>
      <h3>${p.name}</h3><p>${shortSize(p.name)}</p>
    </article>`;
  };
  const traditionalCollection = (traditional, mixed, double) => `
    <section class="qlove-traditional-scroll" id="traditional-mochi" data-progress="0">
      <div class="qlove-traditional-scroll__stage">
        <div class="qlove-traditional-scroll__grain" aria-hidden="true"></div>

        <div class="qlove-traditional-scroll__headline">
          <div class="kicker">QLOVE TRADITIONAL MOCHI</div>
          <h2>THE CLASSICS,<br>SEVEN WAYS.</h2>
          <p>Soft, chewy Japanese-style mochi in seven timeless flavours.</p>
        </div>

        <div class="qlove-traditional-scroll__products"></div>

        <div class="qlove-traditional-scroll__spot-copy" aria-live="polite">
          <div class="num">01 / 07</div>
          <h3>MATCHA</h3>
          <div class="descriptor">Earthy · Smooth · Classic</div>
          <div class="meta">
            <span class="pill">180G</span>
            <span class="pill">TWN</span>
            <span class="pill">TRADITIONAL MOCHI</span>
          </div>
        </div>

        <div class="qlove-traditional-scroll__final-title" aria-live="polite">
          <div class="small">The full collection</div>
          <h3>Seven classics.<br>Which one is yours?</h3>
          <p>Matcha · Peanut · Red Bean · Boba · Pandan · Sesame · Taro</p>
        </div>

        <div class="qlove-traditional-scroll__phase-badge" aria-hidden="true">STACK → FAN → SPOTLIGHT → LINEUP</div>

        <div class="qlove-traditional-scroll__rail" aria-hidden="true">
          <div class="qlove-traditional-scroll__rail-track"><div class="qlove-traditional-scroll__rail-fill"></div></div>
          <div class="qlove-traditional-scroll__rail-labels"></div>
        </div>
      </div>
    </section>
  `;
  const integratedProductMeta = {
    16:{label:'Creamy Lychee',accent:'#eca2b7',desc:'Floral lychee notes wrapped around a smooth creamy centre.',tags:['180G','FLORAL','CREAMY']},
    17:{label:'Creamy Mango',accent:'#f2a23a',desc:'Sunny mango flavour balanced by a mellow creamy filling.',tags:['180G','TROPICAL','SMOOTH']},
    18:{label:'Creamy Passion Fruit',accent:'#e0af35',desc:'Tangy passion fruit with a vivid fruit layer and silky finish.',tags:['180G','TANGY','SILKY']},
    19:{label:'Creamy Blueberry',accent:'#7775c8',desc:'Deep blueberry character with a soft and velvety cream core.',tags:['180G','BERRY','VELVETY']},
    20:{label:'Creamy Strawberry',accent:'#e96c7b',desc:'Familiar strawberry sweetness with a playful creamy centre.',tags:['180G','SWEET','PLAYFUL']},
    21:{label:'Creamy Hami Melon',accent:'#98c96f',desc:'Fresh hami melon notes with a mellow creamy finish.',tags:['180G','FRESH','MELLOW']},
    28:{label:'Traditional Mix',accent:'#e4b55d',desc:'Classic QLove favourites brought together in one shareable box.',tags:['180G','MIX','CLASSIC']},
    29:{label:'Fruity Mix',accent:'#ef7d8f',desc:'A bright fruit-forward assortment with a playful colourful mood.',tags:['180G','MIX','FRUITY']},
    30:{label:'Raspberry Custard',accent:'#d95c7c',desc:'Tart raspberry personality softened by a creamy custard finish.',tags:['168G','TART','CUSTARD']},
    31:{label:'Kiwi Custard',accent:'#80b45d',desc:'Fresh kiwi character with a smooth, softly zesty custard centre.',tags:['168G','FRESH','SMOOTH']},
    32:{label:'Lemon Custard',accent:'#e8ce4f',desc:'Clean citrus brightness balanced by a gentle custard profile.',tags:['168G','CITRUS','SOFT']},
    33:{label:'Milk',accent:'#e6d6c0',desc:'A soft milky pouch with a clean and gentle flavour profile.',tags:['120G','TRADITIONAL','MILKY']},
    34:{label:'Strawberry',accent:'#ea7188',desc:'Sweet strawberry character in a bright everyday standing pouch.',tags:['120G','TRADITIONAL','FRUITY']},
    35:{label:'Peanut',accent:'#d8984f',desc:'Nutty and roasted with a warm, comforting finish.',tags:['120G','TRADITIONAL','NUTTY']},
    36:{label:'Raspberry Custard',accent:'#d95d7e',desc:'Raspberry brightness balanced by a soft creamy note.',tags:['120G','TRADITIONAL','CREAMY']},
    37:{label:'Boba Milk Tea',accent:'#c9955e',desc:'Classic milk tea character with the soft, chewy mood of boba mochi.',tags:['120G','BOBA','CLASSIC']},
    38:{label:'Boba Brown Sugar',accent:'#8e5a3b',desc:'Brown sugar notes with caramel-like depth and a chewy finish.',tags:['120G','BOBA','CARAMEL']},
    39:{label:'Boba Creme Brulee',accent:'#e4b66a',desc:'Custardy sweetness with a gently toasted dessert-like nuance.',tags:['120G','BOBA','TOASTED']},
    40:{label:'Tropical Fruit Assorted',accent:'#f0a541',desc:'A mixed pouch built around bright, juicy tropical fruit notes.',tags:['120G','ASSORTED','TROPICAL']},
    41:{label:'Blossom Garden Assorted',accent:'#c988bb',desc:'A floral-fruity assortment with a softer decorative mood.',tags:['120G','ASSORTED','FLORAL']},
    42:{label:'Dubai Deluxe Mochi',accent:'#8da46e',desc:'A compact format with chocolate, pistachio and kunafa-inspired character.',tags:['45G','CHOCOLATE','PISTACHIO','KUNAFA']},
    43:{label:'Dubai Deluxe Mochi',accent:'#b39157',desc:'The larger hero format with a richer, more premium shelf presence.',tags:['168G','CHOCOLATE','PISTACHIO','KUNAFA']}
  };
  const integratedTransition = (type, count = 0) => {
    if (type === 'doors') return '<i class="qlove-motion-door qlove-motion-door--left"></i><i class="qlove-motion-door qlove-motion-door--right"></i>';
    if (type === 'cream') return `<i class="qlove-motion-cream-pool"></i><i class="qlove-motion-cream-wave"></i>${Array.from({length:count || 6},(_,i)=>`<i class="qlove-motion-cream-core" data-core="${i}"></i><i class="qlove-motion-cream-ribbon" data-ribbon="${i}"></i>`).join('')}`;
    if (type === 'pearls') return `<span class="qlove-motion-pearl-field">${Array.from({length:18},(_,i)=>`<i class="qlove-motion-pearl" style="--pearl-i:${i}"></i>`).join('')}</span>`;
    if (type === 'bands') return '<i class="qlove-motion-band qlove-motion-band--a"></i><i class="qlove-motion-band qlove-motion-band--b"></i>';
    if (type === 'greenwash') return '<i class="qlove-motion-green-wash"></i><i class="qlove-motion-gold-line"></i>';
    return '';
  };
  const pouchMixImages = {
    33: '/assets/POUCHMIX120G/3.png',
    34: '/assets/POUCHMIX120G/6.png',
    35: '/assets/POUCHMIX120G/1.png',
    36: '/assets/POUCHMIX120G/2.png',
    40: '/assets/POUCHMIX120G/4.png',
    41: '/assets/POUCHMIX120G/5.png'
  };
  const bobaImages = {
    37: '/assets/BOBA/2.png',
    38: '/assets/BOBA/3.png',
    39: '/assets/BOBA/1.png'
  };
  const integratedProductImage = (product, motion) => {
    if (motion === 'pouch') return pouchMixImages[product.number] || image(product);
    if (motion === 'boba') return bobaImages[product.number] || image(product);
    return image(product);
  };
  const integratedChapter = ({id,index,title,subtitle,motion,entry,exit,items,dark=false}) => `<section class="qlove-motion-chapter${dark?' is-dark':''}" id="${id}" data-motion="${motion}" data-entry="${entry}" data-exit="${exit}" aria-labelledby="${id}-title">
    <div class="qlove-motion-chapter__sticky">
      <div class="qlove-motion-chapter__background" aria-hidden="true"></div><div class="qlove-motion-chapter__grain" aria-hidden="true"></div>
      <header class="qlove-motion-chapter__head"><h2 id="${id}-title">${title}</h2><span>${subtitle}</span></header>
      <div class="qlove-motion-chapter__scene">
        <strong class="qlove-motion-chapter__ghost" aria-hidden="true">${motion.toUpperCase()}</strong>
        ${motion==='custard'?'<i class="qlove-motion-lens" aria-hidden="true"></i>':''}
        ${motion==='boba'?integratedTransition('pearls'):''}
        ${motion==='pouch'?'<i class="qlove-motion-shelf qlove-motion-shelf--a"></i><i class="qlove-motion-shelf qlove-motion-shelf--b"></i>':''}
        ${motion==='dubai'?'<i class="qlove-motion-base-gold" aria-hidden="true"></i>':''}
        <div class="qlove-motion-transition qlove-motion-transition--entry" aria-hidden="true">${integratedTransition(entry,items.length)}</div>
        <div class="qlove-motion-transition qlove-motion-transition--exit" aria-hidden="true">${integratedTransition(exit,items.length)}</div>
        <div class="qlove-motion-products" role="group" aria-label="${title} products">${items.map((product,i)=>{const meta=integratedProductMeta[product.number];return `<button class="qlove-motion-product" type="button" data-index="${i}" data-number="${product.number}" data-accent="${meta.accent}" data-name="${meta.label}" data-description="${meta.desc}" data-tags="${meta.tags.join('|')}" style="--product-accent:${meta.accent};--product-order:${i}" aria-label="Explore ${product.name}" aria-pressed="false"><span class="qlove-motion-product__glow" aria-hidden="true"></span><img src="${integratedProductImage(product,motion)}" alt="" loading="lazy" decoding="async" width="1000" height="1000"><span class="qlove-motion-product__label"><strong>${meta.label}</strong><small>${shortSize(product.name)}</small></span><span class="qlove-motion-product__cue">Click to explore</span></button>`}).join('')}</div>
        <div class="qlove-motion-flavour-bubbles" aria-hidden="true"></div>
      </div>
      <button class="qlove-motion-overlay" type="button" aria-label="Close product details" tabindex="-1"></button>
      <aside class="qlove-motion-panel" role="dialog" aria-modal="false" aria-hidden="true" aria-label="Product details"><button class="qlove-motion-panel__x" type="button" aria-label="Close product details">×</button><span class="qlove-motion-panel__count"></span><h3></h3><p></p><div class="qlove-motion-panel__tags"></div></aside>
      <p class="qlove-motion-chapter__hint">Hover to highlight · Click to explore</p>
    </div>
  </section>`;
  const dessertPlatterCollection = () => `<section class="qlove-section qlove-dessert-platter-embed" id="dessert-platter" aria-label="Dessert Platter interactive 3D showcase">
    <iframe class="qlove-dessert-platter-embed__frame" src="/demos/qlove_dessert_platter_FINAL_v2_ZOOM.html" title="QLove Dessert Platter interactive 3D showcase" loading="eager"></iframe>
  </section>`;
  const storyScene = (p, supportA, supportB, title, copy, colour, accent, ink) => ({p,supportA,supportB,title,copy,colour,accent,ink});
  fetch('/assets/qlove-products.json').then(r => r.ok ? r.json() : Promise.reject(new Error('Inventory unavailable'))).then(products => {
    const mini = group(products, 1, 8), traditional = group(products, 9, 15), double = group(products, 16, 21), deluxe = group(products, 22, 27), mixed = group(products, 28, 29), custard = group(products, 30, 32), standingTraditional = group(products, 33, 36), boba = group(products, 37, 39), assorted = group(products, 40, 41), dubai = group(products, 42, 43), premium = group(products, 44, 48), deluxe168 = group(products, 49, 52), dessert = group(products, 53, 64), party = group(products, 65, 66), snow = group(products, 67, 71), dora = group(products, 72, 75);
    const premiumOrder = [44, 46, 45, 47, 48].map(number => premium.find(product => product.number === number));
    const deluxeMochi = [...deluxe168, ...deluxe].filter(p => p.number !== 27);
    const traditionalFamily = [...traditional, ...mixed, ...double];
    const deluxePouch = [...dessert, ...party];
    const pouchMix = [...standingTraditional, ...assorted];
    const mix450 = products.filter(product => /450\s*g/i.test(product.name) && /mix/i.test(product.name));

  const extraMiniPanel = (product, index) => {
    const flavour = premiumFlavours[index];
    const maskId = `qlove-extra-reveal-${index}`;
    const origins = [
      [[.48, .68], [.22, .45], [.77, .29]],
      [[.53, .66], [.25, .50], [.73, .31]],
      [[.45, .70], [.29, .40], [.79, .35]]
    ][index % 3];
    return `<article class="qlove-mini-panel" style="--mini-bg:${flavour.bg};--mini-ink:${flavour.ink}" aria-label="${product.name}">
      <div class="qlove-mini-panel__media" aria-hidden="true">
        <img class="qlove-mini-panel__image qlove-mini-panel__image--default" src="${image(product)}" alt="" loading="lazy" decoding="async" width="1024" height="1536">
        <span class="qlove-mini-panel__hover-reveal"><img class="qlove-mini-panel__image qlove-mini-panel__image--hover" src="${image(product)}" alt="" loading="lazy" decoding="async" width="1024" height="1536" style="object-fit: contain; width: 108%; height: auto; top: 56%; left: 50%; transform: translate(-50%, -50%) scale(1.15) rotate(2deg); filter: drop-shadow(0 25px 25px rgba(0,0,0,0.2)) brightness(1.05);"></span>
        <svg class="qlove-mini-panel__mask-defs" aria-hidden="true" focusable="false" width="0" height="0"><defs><filter id="${maskId}-soft" x="-15%" y="-15%" width="130%" height="130%"><feGaussianBlur stdDeviation="0.01"/></filter><mask id="${maskId}" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox" style="mask-type:alpha"><g filter="url(#${maskId}-soft)">${origins.map(([x, y]) => `<circle class="qlove-mini-panel__reveal-spot" cx="${x}" cy="${y}" r="0" fill="white"/>`).join('')}</g></mask></defs></svg>
      </div>
      <div class="qlove-mini-panel__info">
        <h3 class="qlove-mini-panel__title">${flavour.title}</h3>

      </div>
    </article>`;
  };

  const extraMiniShowcase = items => `<section class="qlove-section qlove-mini-showcase" id="extra-to-love" aria-labelledby="qlove-extra-title">
    <div class="qlove-mini-showcase__header">
      <div class="qlove-mini-showcase__heading-row">
        <h2 id="qlove-extra-title">EXTRA TO LOVE</h2>
        <p class="qlove-kicker">PREMIUM FILLING MINI</p>
      </div>
      <p>Five playful mini flavours, each with a little extra inside.</p>
    </div>
    <div class="qlove-mini-showcase__viewport" role="region" aria-label="Extra To Love flavours" tabindex="0">
        <div class="qlove-mini-showcase__track">${items.map(extraMiniPanel).join('')}</div>
      </div>
      <div class="qlove-mini-showcase__controls">
        <button class="qlove-mini-showcase__arrow qlove-mini-showcase__prev" type="button" aria-label="Previous flavour">&larr;</button>
        <span class="qlove-mini-showcase__counter" aria-live="polite">01 / 05</span>
        <button class="qlove-mini-showcase__arrow qlove-mini-showcase__next" type="button" aria-label="Next flavour">&rarr;</button>
      </div>
    </div>
  </section>`;

  const premiumPouchCard = (product, index) => {
    const title = pouchTitles[index % pouchTitles.length] || product.name;
    const bg = pouchPalettes[index % pouchPalettes.length];
    return `<article class="qlove-extra-card qlove-pouch-card" style="--extra-card-bg:${bg};--extra-card-accent:#fff;--extra-card-ink:#2b2930" aria-label="${product.name}">
      <h3>${title}</h3>
      <div class="qlove-pouch-card__halo"></div>
      <img src="${image(product)}" alt="${product.name}" loading="lazy" decoding="async" width="1000" height="1000" style="position:absolute; top:56%; left:50%; transform:translate(-50%,-50%); width:80%; height:auto; max-height:70%;">
    </article>`;
  };

  const pouchJourney = (items) => `<section class="qlove-section qlove-extra-journey" id="deluxe-pouch-120g" aria-labelledby="qlove-pouch-journey-title">
    <div class="qlove-extra-journey__stage">
      <div class="qlove-extra-journey__heading">

        <h2 id="qlove-pouch-journey-title">DELUXE POUCH 120G</h2>
      </div>
      <div class="qlove-extra-journey__viewport" role="region" aria-label="Deluxe Pouch flavours" tabindex="0">
        <div class="qlove-extra-journey__track">${items.map(premiumPouchCard).join('')}</div>
      </div>
      <div class="qlove-extra-journey__status" aria-label="Current flavour"><span class="qlove-extra-journey__counter" aria-live="polite">01 / ${String(items.length).padStart(2,'0')}</span><span class="qlove-extra-journey__progress"><i></i></span></div>
    </div>
  </section>`;

    const series = [
      { id: 'mini-mochi', label: 'MINI 80g', products: mini, markup: miniShowcase(mini) },
      { id: 'extra-to-love', label: 'EXTRA TO LOVE', products: premiumOrder, markup: extraMiniShowcase(premiumOrder) },
      { id: 'deluxe-pouch-120g', label: 'DELUXE POUCH', products: deluxePouch, markup: pouchJourney(deluxePouch) },
      { id: 'deluxe-mochi', label: 'DELUXE MOCHI', products: deluxeMochi, markup: deluxeShowcase(deluxeMochi) },
      { id: 'dorayaki', label: 'DORAYAKI', products: dora, markup: dorayakiShowcase(dora) },
      { id: 'snowflake', label: 'SNOWFLAKE', products: snow, markup: snowflakeShowcase(snow) },
      { id: 'dessert-platter', label: 'DESSERT PLATTER', products: mix450, markup: dessertPlatterCollection() },
      { id: 'traditional-mochi', label: 'TRADITIONAL 180g', products: traditional, markup: traditionalCollection(traditional) },
      { id: 'mix-180g', label: 'MIX 180g', products: mixed, markup: integratedChapter({id:'mix-180g',index:10,title:'QLove Mix Mochi',subtitle:'Two assortments · one split story.',motion:'mix',entry:'none',exit:'doors',items:mixed}) },
      { id: 'double-filling', label: 'DOUBLE FILLING', products: double, markup: integratedChapter({id:'double-filling',index:11,title:'Double Filling',subtitle:'Six creamy centres in a slow flavour orbit.',motion:'double',entry:'doors',exit:'cream',items:double}) },
      { id: 'custard-168g', label: 'CUSTARD 168g', products: custard, markup: integratedChapter({id:'custard-168g',index:12,title:'Custard Mochi',subtitle:'Soft lens focus · three bright flavours.',motion:'custard',entry:'cream',exit:'pearls',items:custard}) },
      { id: 'boba-pouch-120g', label: 'BOBA POUCH', products: boba, markup: integratedChapter({id:'boba-pouch-120g',index:13,title:'Boba Standing Pouch',subtitle:'Gravity room · pearls in motion.',motion:'boba',entry:'pearls',exit:'bands',items:boba}) },
      { id: 'pouch-mix-120g', label: 'POUCH MIX', products: pouchMix, markup: integratedChapter({id:'pouch-mix-120g',index:14,title:'QLove Pouch Mix',subtitle:'Two moving shelves · six pouch personalities.',motion:'pouch',entry:'bands',exit:'greenwash',items:pouchMix}) },
      { id: 'dubai', label: 'DUBAI', products: dubai, markup: integratedChapter({id:'dubai',index:15,title:'Dubai Style',subtitle:'Chocolate · pistachio · kunafa.',motion:'dubai',entry:'greenwash',exit:'none',items:dubai,dark:true}) }
    ];
    const placedNumbers = series.flatMap(section => section.products.map(product => product.number));
    if (placedNumbers.length !== products.length || new Set(placedNumbers).size !== products.length) console.warn('QLove series inventory mismatch:', products.filter(product => !placedNumbers.includes(product.number)).map(product => product.number));
    const jumpNav = `<nav class="qlove-jump" aria-label="Collection jump">${series.map((section, index) => `<a href="#${section.id}"${index === 0 ? ' class="is-active" aria-current="location"' : ''}>${section.label}</a>`).join('')}</nav>`;
    const seriesMarkup = series.map(section => section.markup).join('');
    const scenes = [
      storyScene(mini[5], mini[2], mini[7], 'MINI MOCHI', 'Small format. Big QLove energy.', '#f49fbc', '#ffd3ba', '#1a1a1a'),
      storyScene(deluxe168[1], deluxe[0], deluxe[3], 'DELUXE MOCHI', 'Dessert mood, wrapped the QLove way.', '#805d93', '#ffd3ba', '#ffffff'),
      storyScene(double[1], double[4], double[0], 'DOUBLE FILLING', 'Twice the visual surprise.', '#ffd3ba', '#169873', '#1a1a1a'),
      storyScene(traditional[0], traditional[1], traditional[2], 'TRADITIONAL MOCHI', 'A classic shape, with QLove personality.', '#9ebd6e', '#e1f5ee', '#085041')
    ];
  const footerRetailWideLogos = [
    { name: 'HalfPrice', src: './assets/qlove/retail-logos/halfprice.jpg' },
    { name: 'COOP', src: './assets/qlove/retail-logos/coop.jpg' },
    { name: 'NORMA', src: './assets/qlove/retail-logos/norma.jpg' },
    { name: 'Makro', src: './assets/qlove/retail-logos/makro.jpg' },
    { name: 'Oki Doki', src: './assets/qlove/retail-logos/oki-doki.jpg' },
    { name: 'Candy Pop', src: './assets/qlove/retail-logos/candy-pop.jpg' },
    { name: 'Normal', src: './assets/qlove/retail-logos/normal.jpg' },
    { name: 'AliExpress Plaza', src: './assets/qlove/retail-logos/aliexpress-plaza.jpg' }
  ];

  const footerRetailSquareLogos = [
    { name: 'Han Food', src: './assets/qlove/retail-logos/han-food.jpg' },
    { name: 'Yatta', src: './assets/qlove/retail-logos/yatta.jpg' },
    { name: 'Miniso', src: './assets/qlove/retail-logos/miniso.jpg' },
    { name: 'Kaufland', src: './assets/qlove/retail-logos/kaufland.jpg' },
    { name: 'Modern Asia Market', src: './assets/qlove/retail-logos/modern-asia-market.jpg' }
  ];

  const footerRetailLogoGroup = (logos, { duplicate = false, shape = 'wide', repeats = 1 } = {}) => `
    <div class="qlove-unified-footer__logo-group qlove-unified-footer__logo-group--${shape}"${duplicate ? ' aria-hidden="true"' : ''}>
      ${Array.from({ length: repeats }, (_, repeatIndex) => `
        <div class="qlove-unified-footer__logo-set"${repeatIndex > 0 ? ' aria-hidden="true"' : ''}>
          ${logos.map((logo) => `
            <span class="qlove-unified-footer__logo-card">
              <img src="${logo.src}" alt="${duplicate || repeatIndex > 0 ? '' : logo.name}" loading="eager" decoding="async">
            </span>
          `).join('')}
        </div>
      `).join('')}
    </div>
  `;

  root.innerHTML = `
      <section id="qlove-intro-story" class="qlove-section qlove-intro-story" aria-labelledby="qlove-intro-title">
        <div class="qlove-intro-inner">
          <div class="qlove-banner-bg" aria-hidden="true">
            <div class="qlove-banner-bg-image"></div>
          </div>
          <div class="qlove-intro-content">
            <p class="qlove-intro-eyebrow">QLove Japanese Style</p>
            <h1 id="qlove-intro-title" class="qlove-intro-headline">
              <span class="qlove-intro-line-mask"><span class="qlove-intro-line qlove-intro-love">LOVE</span></span>
              <span class="qlove-intro-line-mask"><span class="qlove-intro-line qlove-intro-wrapped">WRAPPED</span></span>
              <span class="qlove-intro-line-mask"><span class="qlove-intro-line qlove-intro-mochi">IN MOCHI</span></span>
            </h1>
            <p class="qlove-intro-copy">Soft shapes. Playful flavours. A little moment of joy in every QLove.</p>
          </div>
          <div class="qlove-intro-product-world" aria-hidden="true">
            <div class="qlove-intro-portal"></div>
            <img class="qlove-intro-product qlove-intro-product--back" src="/assets/qlove/products-cutout/4.png" alt="" loading="eager" decoding="async">
            <img class="qlove-intro-product qlove-intro-product--front" src="${image(mini[0])}" alt="" loading="eager" decoding="async">
          </div>
        </div>
      </section>
      <section class="qlove-story" aria-label="QLove collection story"><div class="qlove-story__sticky" style="--story-bg:${scenes[0].colour};--story-accent:${scenes[0].accent};--story-ink:${scenes[0].ink}"><div class="qlove-story__wash"></div><div class="qlove-story__circle"></div><div class="qlove-story__word">MINI</div><div class="qlove-story__stage"><img class="qlove-story__support qlove-story__support--a" alt="" src="${image(scenes[0].supportA)}"><img class="qlove-story__pack" src="${image(scenes[0].p)}" alt="${scenes[0].p.name}" loading="eager"><img class="qlove-story__support qlove-story__support--b" alt="" src="${image(scenes[0].supportB)}"></div><div class="qlove-story__copy"><p>01 / 04</p><h2>MINI MOCHI</h2><span>Small format. Big QLove energy.</span></div><div class="qlove-story__progress"><i></i></div><div class="qlove-story__counter">01 — 04</div></div></section>
      <section class="qlove-section qlove-marquee" aria-label="Flavours"><div class="qlove-marquee__rail">QLOVE <img src="/assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly/imgi_10_687f9064b8430bc28a4e13a7_Marquecontainer-5.webp" class="marquee-mochi" alt="" loading="lazy"> QLOVE <img src="/assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly/imgi_11_687f9064674530dc18dbf725_Marquecontainer-9.webp" class="marquee-mochi" alt="" loading="lazy"> QLOVE <img src="/assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly/imgi_12_687f9064b4b584dbc359f6ee_Marquecontainer-3.webp" class="marquee-mochi" alt="" loading="lazy"> QLOVE <img src="/assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly/imgi_13_687f9064727e3f41f52ae4b1_Marquecontainer-2.webp" class="marquee-mochi" alt="" loading="lazy"> QLOVE <img src="/assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly/imgi_14_687f906403c932500173dd2a_Marquecontainer-10.webp" class="marquee-mochi" alt="" loading="lazy"> QLOVE <img src="/assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly/imgi_6_687f9065d602967ae01b1e6d_Marquecontainer-8.webp" class="marquee-mochi" alt="" loading="lazy"> QLOVE <img src="/assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly/imgi_7_687f90654e3272a2ec2dcac9_Marquecontainer-7.webp" class="marquee-mochi" alt="" loading="lazy"> QLOVE <img src="/assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly/imgi_8_687f9064941ff622f5fc204f_Marquecontainer-6.webp" class="marquee-mochi" alt="" loading="lazy"> QLOVE <img src="/assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly/imgi_9_687f9064cf83dbac28057097_Marquecontainer-4.webp" class="marquee-mochi" alt="" loading="lazy"> QLOVE <img src="/assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly/imgi_10_687f9064b8430bc28a4e13a7_Marquecontainer-5.webp" class="marquee-mochi" alt="" loading="lazy"> QLOVE <img src="/assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly/imgi_11_687f9064674530dc18dbf725_Marquecontainer-9.webp" class="marquee-mochi" alt="" loading="lazy"> QLOVE <img src="/assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly/imgi_12_687f9064b4b584dbc359f6ee_Marquecontainer-3.webp" class="marquee-mochi" alt="" loading="lazy"> QLOVE </div><img class="qlove-marquee__pack" src="${image(deluxe[2])}" alt="${deluxe[2].name}" loading="lazy"><div class="qlove-marquee__rail qlove-marquee__rail--reverse">QLOVE <img src="/assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly/imgi_9_687f9064cf83dbac28057097_Marquecontainer-4.webp" class="marquee-mochi" alt="" loading="lazy"> QLOVE <img src="/assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly/imgi_8_687f9064941ff622f5fc204f_Marquecontainer-6.webp" class="marquee-mochi" alt="" loading="lazy"> QLOVE <img src="/assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly/imgi_7_687f90654e3272a2ec2dcac9_Marquecontainer-7.webp" class="marquee-mochi" alt="" loading="lazy"> QLOVE <img src="/assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly/imgi_6_687f9065d602967ae01b1e6d_Marquecontainer-8.webp" class="marquee-mochi" alt="" loading="lazy"> QLOVE <img src="/assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly/imgi_14_687f906403c932500173dd2a_Marquecontainer-10.webp" class="marquee-mochi" alt="" loading="lazy"> QLOVE <img src="/assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly/imgi_13_687f9064727e3f41f52ae4b1_Marquecontainer-2.webp" class="marquee-mochi" alt="" loading="lazy"> QLOVE <img src="/assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly/imgi_12_687f9064b4b584dbc359f6ee_Marquecontainer-3.webp" class="marquee-mochi" alt="" loading="lazy"> QLOVE <img src="/assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly/imgi_11_687f9064674530dc18dbf725_Marquecontainer-9.webp" class="marquee-mochi" alt="" loading="lazy"> QLOVE <img src="/assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly/imgi_10_687f9064b8430bc28a4e13a7_Marquecontainer-5.webp" class="marquee-mochi" alt="" loading="lazy"> QLOVE <img src="/assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly/imgi_10_687f9064b8430bc28a4e13a7_Marquecontainer-5.webp" class="marquee-mochi" alt="" loading="lazy"> QLOVE <img src="/assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly/imgi_11_687f9064674530dc18dbf725_Marquecontainer-9.webp" class="marquee-mochi" alt="" loading="lazy"> QLOVE <img src="/assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly/imgi_12_687f9064b4b584dbc359f6ee_Marquecontainer-3.webp" class="marquee-mochi" alt="" loading="lazy"> QLOVE </div></section>
      ${jumpNav}
      ${seriesMarkup}
      <footer class="qlove-unified-footer" id="retail" aria-labelledby="qlove-footer-title">
        <div class="qlove-unified-footer__topbar">
          <span>QLove</span>
          <span class="qlove-unified-footer__topbar-note">Where to find us · Contact · Social</span>
        </div>
        <section class="qlove-unified-footer__hero">
          <div class="qlove-unified-footer__content">
            <p class="qlove-unified-footer__eyebrow">Where to find us / Get in touch</p>
            <h2 id="qlove-footer-title">QLove is <span>out there.</span><br>Come find us.</h2>
            <p class="qlove-unified-footer__copy">From specialty stores to major retail chains, QLove is growing across Europe. Explore our real store presence, find a retailer near you, or get in touch if you want to stock QLove.</p>
            <div class="qlove-unified-footer__actions">
              <a class="qlove-unified-footer__button is-primary" href="#qlove-footer-retail">Find a store</a>
              <a class="qlove-unified-footer__button" href="mailto:info@qlovemochi.com?subject=QLove%20Wholesale">Wholesale</a>
              <a class="qlove-unified-footer__button" href="mailto:info@qlovemochi.com">Contact us</a>
            </div>
          </div>
          <div class="qlove-unified-footer__visual">
            <figure class="qlove-unified-footer__photo">
              <img src="/assets/qlove-footer-store-presence.png" alt="QLove products displayed in a European retail store" loading="lazy" decoding="async">
            </figure>
            <div class="qlove-unified-footer__contact">
              <div>
                <small>Contact</small>
                <a class="qlove-unified-footer__mail" href="mailto:info@qlovemochi.com">info@qlovemochi.com</a>
              </div>
              <nav class="qlove-unified-footer__socials" aria-label="QLove social media">
                <a href="#" aria-label="Instagram">IG</a>
                <a href="#" aria-label="TikTok">TT</a>
                <a href="#" aria-label="Facebook">FB</a>
              </nav>
            </div>
          </div>
        </section>
        <div class="qlove-unified-footer__logo-marquees" id="qlove-footer-retail" aria-label="Where to find us">
          <div class="qlove-unified-footer__retail" aria-label="Retail partners">
            <div class="qlove-unified-footer__track">
              ${footerRetailLogoGroup(footerRetailWideLogos, { repeats: 2 })}
              ${footerRetailLogoGroup(footerRetailWideLogos, { duplicate: true, repeats: 2 })}
            </div>
          </div>
          <div class="qlove-unified-footer__retail qlove-unified-footer__retail--square qlove-unified-footer__retail--reverse" aria-label="Square retail partners">
            <div class="qlove-unified-footer__track">
              ${footerRetailLogoGroup(footerRetailSquareLogos, { shape: 'square', repeats: 5 })}
              ${footerRetailLogoGroup(footerRetailSquareLogos, { duplicate: true, shape: 'square', repeats: 5 })}
            </div>
          </div>
        </div>
        <div class="qlove-unified-footer__brandrow">
          <strong class="qlove-unified-footer__word" aria-label="QLove">QLove</strong>
          <div class="qlove-unified-footer__meta"><span>Taste a brighter world</span><span>Europe · Retail · Wholesale</span></div>
        </div>
        <div class="qlove-unified-footer__bottom">
          <span>© 2026 QLovemochi. All rights reserved.</span>
          <nav class="qlove-unified-footer__legal" aria-label="Legal"><a href="#">Privacy</a><a href="#">Cookies</a><a href="#">Terms</a></nav>
          <a class="qlove-unified-footer__back" href="#top" aria-label="Back to top">↑</a>
        </div>
      </footer>
      <section class="qlove-section qlove-retail" id="legacy-retail" hidden>
        <p class="qlove-kicker">Where to find us</p>
        <h2>QLove,<br>out in the world.</h2>

        <div class="qlove-retail__logos">
          <div class="logo-item"><img src="https://qlovemochi.com/wp-content/uploads/2026/09/HalfPrice.jpg" alt="HalfPrice" loading="lazy"></div>
          <div class="logo-item"><img src="https://qlovemochi.com/wp-content/uploads/2026/09/COOP.jpg" alt="COOP" loading="lazy"></div>
          <div class="logo-item"><img src="https://qlovemochi.com/wp-content/uploads/2026/09/NORMA.jpg" alt="NORMA" loading="lazy"></div>
          <div class="logo-item"><img src="https://qlovemochi.com/wp-content/uploads/2026/09/Makro.jpg" alt="Makro" loading="lazy"></div>
          <div class="logo-item"><img src="https://qlovemochi.com/wp-content/uploads/2026/09/OKI-DOKI.jpg" alt="OKI DOKI" loading="lazy"></div>
          <div class="logo-item"><img src="https://qlovemochi.com/wp-content/uploads/2026/09/Candy-Pop.jpg" alt="Candy Pop" loading="lazy"></div>
          <div class="logo-item"><img src="https://qlovemochi.com/wp-content/uploads/2026/09/Normal.jpg" alt="Normal" loading="lazy"></div>
          <div class="logo-item"><img src="https://qlovemochi.com/wp-content/uploads/2026/09/AliExpress-Plaza.jpg" alt="AliExpress Plaza" loading="lazy"></div>
          <div class="logo-item"><img src="https://qlovemochi.com/wp-content/uploads/2026/09/Han-Food.jpg" alt="Han Food" loading="lazy"></div>
          <div class="logo-item"><img src="https://qlovemochi.com/wp-content/uploads/2026/09/Yatta.jpg" alt="Yatta" loading="lazy"></div>
          <div class="logo-item"><img src="https://qlovemochi.com/wp-content/uploads/2026/09/Miniso.jpg" alt="Miniso" loading="lazy"></div>
          <div class="logo-item"><img src="https://qlovemochi.com/wp-content/uploads/2026/09/Kaufland.jpg" alt="Kaufland" loading="lazy"></div>
        </div>

        <div class="qlove-retail__presence">
          <h3>Real store presence</h3>
          <div class="qlove-retail__store-grid">
            <div class="qlove-retail__store-card">
              <div class="img-wrapper"><img src="https://qlovemochi.com/wp-content/uploads/2026/09/Spain.png" alt="AliExpress Spain" loading="lazy"></div>
              <div class="store-info"><strong>AliExpress</strong><span>Spain</span></div>
            </div>
            <div class="qlove-retail__store-card">
              <div class="img-wrapper"><img src="https://qlovemochi.com/wp-content/uploads/2026/09/Slovakia.png" alt="Kaufland Slovakia" loading="lazy"></div>
              <div class="store-info"><strong>Kaufland</strong><span>Slovakia</span></div>
            </div>
            <div class="qlove-retail__store-card">
              <div class="img-wrapper"><img src="https://qlovemochi.com/wp-content/uploads/2026/09/Germany.png" alt="Mam Supermarket Germany" loading="lazy"></div>
              <div class="store-info"><strong>Mam Supermarket</strong><span>Germany</span></div>
            </div>
            <div class="qlove-retail__store-card">
              <div class="img-wrapper"><img src="https://qlovemochi.com/wp-content/uploads/2026/09/Estonia.png" alt="Miniso Estonia" loading="lazy"></div>
              <div class="store-info"><strong>Miniso</strong><span>Estonia</span></div>
            </div>
            <div class="qlove-retail__store-card">
              <div class="img-wrapper"><img src="https://qlovemochi.com/wp-content/uploads/2026/09/Italy.png" alt="Miniso Italy" loading="lazy"></div>
              <div class="store-info"><strong>Miniso</strong><span>Italy</span></div>
            </div>
            <div class="qlove-retail__store-card">
              <div class="img-wrapper"><img src="https://qlovemochi.com/wp-content/uploads/2026/09/Spain-2.png" alt="Oki Doki Spain" loading="lazy"></div>
              <div class="store-info"><strong>Oki Doki</strong><span>Spain</span></div>
            </div>
            <div class="qlove-retail__store-card">
              <div class="img-wrapper"><img src="https://qlovemochi.com/wp-content/uploads/2026/09/Czech-Republic.png" alt="Sapa Czech Republic" loading="lazy"></div>
              <div class="store-info"><strong>Sapa</strong><span>Czech Republic</span></div>
            </div>
            <div class="qlove-retail__store-card">
              <div class="img-wrapper"><img src="https://qlovemochi.com/wp-content/uploads/2026/09/Netherlands.png" alt="Yatta! Netherlands" loading="lazy"></div>
              <div class="store-info"><strong>Yatta!</strong><span>Netherlands</span></div>
            </div>
          </div>
        </div>
      </section>
      <footer class="qlove-footer" hidden>
        <div class="qlove-footer__contact">
          <h2>Contact</h2>
          <a href="mailto:info@qlovemochi.com">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            <span>info@qlovemochi.com</span>
          </a>
        </div>
        <div class="qlove-footer__bottom">
          <div class="qlove-footer__copyright">© 2025 QLovemochi. All rights reserved.</div>
          <div class="qlove-footer__socials">
            <a href="#" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
            <a href="#" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
            <a href="#" aria-label="TikTok"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a3 3 0 0 1-3-3v11a7 7 0 1 1-7-7v3a4 4 0 0 0 4 4z"></path></svg></a>
          </div>
          <button class="qlove-footer__totop" aria-label="Back to top" onclick="window.scrollTo({top:0, behavior:'smooth'})">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
          </button>
        </div>
      </footer>`;
    root.querySelector('#legacy-retail')?.remove();
    root.querySelector('.qlove-footer[hidden]')?.remove();
    const mix450Image = root.querySelector('.qlove-mix-450__image');
    mix450Image?.addEventListener('error', () => {
      const attempt = Number(mix450Image.dataset.retry || '0') + 1;
      mix450Image.dataset.retry = String(attempt);
      if (attempt === 1) {
        mix450Image.src = '/assets/mix_450g.png';
      } else if (attempt === 2) {
        mix450Image.src = '/assets/mix_450g.png';
      } else {
        root.querySelector('.qlove-mix-450__fallback')?.removeAttribute('hidden');
      }
    });
    initQloveIntroTransition();
    initStory(scenes);
    initMiniShowcase();
    initMiniReveal();
    initPremiumJourney();
    initDeluxeShowcase(deluxeMochi);
    initDorayakiShowcase();
    initSnowflakeShowcase();
    initMix450Story();
    initTraditionalScroll(traditional);
    initPouchWall();
    initCategoryNav();
    initTraditionalHover();
    initReveals();
    if (new URLSearchParams(window.location.search).get('view') === 'main') {
      window.setTimeout(() => root.scrollIntoView({ behavior: 'auto', block: 'start' }), 250);
    }
  }).catch(error => { root.innerHTML = `<p style="padding:3rem">Unable to load the QLove product inventory.</p>`; console.error(error); });
    function initMiniShowcase() {
    root.querySelectorAll('.qlove-mini-showcase').forEach(section => {
      const hoverPreloads = [...section.querySelectorAll('.qlove-mini-panel__image--hover')].map(artwork => {
        const preload = new Image();
        preload.src = artwork.src;
        return preload.decode().catch(() => {});
      });
      Promise.all(hoverPreloads).catch(() => {});
      const viewport = section.querySelector('.qlove-mini-showcase__viewport');
      const panels = [...section.querySelectorAll('.qlove-mini-panel')];
      const prev = section.querySelector('.qlove-mini-showcase__prev');
      const next = section.querySelector('.qlove-mini-showcase__next');
      const counter = section.querySelector('.qlove-mini-showcase__counter');
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      let index = 2;
      let ticking = false;
      const visibleCount = () => Number(getComputedStyle(section).getPropertyValue('--visible-panels')) || 3;
      const maxIndex = () => Math.max(0, panels.length - visibleCount());
      const step = () => panels[1]?.offsetLeft - panels[0]?.offsetLeft || viewport.clientWidth;
      const updateControls = () => {
        counter.textContent = `${String(Math.min(index + 1, panels.length)).padStart(2, '0')} / ${String(panels.length).padStart(2, '0')}`;
        prev.disabled = index === 0;
        next.disabled = index === maxIndex();
      };
      const goTo = (target, smooth = true) => {
        index = Math.max(0, Math.min(maxIndex(), target));
        viewport.scrollTo({ left: index * step(), behavior: smooth && !reduceMotion.matches ? 'smooth' : 'auto' });
        updateControls();
      };
      prev.addEventListener('click', () => goTo(index - 1));
      next.addEventListener('click', () => goTo(index + 1));
      viewport.addEventListener('keydown', event => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        goTo(index + (event.key === 'ArrowRight' ? 1 : -1));
      });
      viewport.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          index = Math.round(viewport.scrollLeft / step());
          updateControls();
          ticking = false;
        });
      }, { passive: true });
      updateControls();
      setTimeout(() => goTo(0, false), 100);
    });
  }
  function initMiniReveal() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const clamp = value => Math.min(1, Math.max(0, value));
    const smooth = value => {
      const t = clamp(value);
      return t * t * (3 - 2 * t);
    };
    root.querySelectorAll('.qlove-mini-panel').forEach(panel => {
      const hoverReveal = panel.querySelector('.qlove-mini-panel__hover-reveal');
      const mask = panel.querySelector('mask');
      const spots = [...panel.querySelectorAll('.qlove-mini-panel__reveal-spot')];
      const state = { time: 0 };
      let tween;
      let frame;
      const render = () => {
        if (reducedMotion.matches) {
          hoverReveal.style.maskImage = 'none';
          hoverReveal.style.webkitMaskImage = 'none';
          hoverReveal.style.opacity = String(smooth(state.time / 160));
          return;
        }
        const maskReference = `url(#${mask.id})`;
        hoverReveal.style.maskImage = maskReference;
        hoverReveal.style.webkitMaskImage = maskReference;
        hoverReveal.style.opacity = '1';
        spots.forEach((spot, index) => {
          const delay = [35, 105, 175][index];
          const progress = smooth((state.time - delay) / (905 - delay));
          spot.setAttribute('r', String(1.18 * progress));
        });
      };
      const moveTo = active => {
        tween?.kill();
        if (frame) cancelAnimationFrame(frame);
        const target = active ? (reducedMotion.matches ? 160 : 1050) : 0;
        const start = state.time;
        const total = reducedMotion.matches ? 160 : active ? 1050 : 880;
        const duration = total * Math.abs(target - start) / (reducedMotion.matches ? 160 : 1050);
        if (!duration) return;
        if (window.gsap) {
          tween = window.gsap.to(state, { time: target, duration: duration / 1000, ease: 'none', onUpdate: render, onComplete: render });
          return;
        }
        const started = performance.now();
        const tick = now => {
          const progress = clamp((now - started) / duration);
          state.time = start + (target - start) * progress;
          render();
          if (progress < 1) frame = requestAnimationFrame(tick);
          else frame = null;
        };
        frame = requestAnimationFrame(tick);
      };
      panel.addEventListener('pointerenter', () => moveTo(true));
      panel.addEventListener('pointerleave', () => moveTo(false));
      render();
    });
  }
    function initPremiumJourney() {
    root.querySelectorAll('.qlove-extra-journey').forEach(section => {
      const stage = section.querySelector('.qlove-extra-journey__stage');
      if (!stage) return;
      const viewport = section.querySelector('.qlove-extra-journey__viewport');
      const track = section.querySelector('.qlove-extra-journey__track');
      const heading = section.querySelector('.qlove-extra-journey__heading');
      const cards = [...section.querySelectorAll('.qlove-extra-card')];
      const counter = section.querySelector('.qlove-extra-journey__counter');
      const progressBar = section.querySelector('.qlove-extra-journey__progress i');
      const desktop = window.matchMedia('(min-width: 901px) and (prefers-reduced-motion: no-preference)');
      const holdFraction = .06;
      const clamp = value => Math.min(1, Math.max(0, value));
      let geometry;
      let renderQueued = false;
      let measureQueued = false;
      const updateActive = (movement, progress) => {
        const firstCentre = cards[0].offsetLeft + cards[0].offsetWidth / 2;
        const focalPoint = firstCentre + (geometry.finalCentre - firstCentre) * movement;
        let active = 0;
        let closest = Infinity;
        cards.forEach((card, index) => {
          const centre = card.offsetLeft + card.offsetWidth / 2 - geometry.distance * movement;
          const distance = Math.abs(centre - focalPoint);
          if (distance < closest) { closest = distance; active = index; }
          const focus = 1 - clamp(distance / (viewport.clientWidth * .55));
          card.style.setProperty('--extra-scale', (.96 + .04 * focus).toFixed(3));
          card.style.setProperty('--extra-opacity', (.85 + .15 * focus).toFixed(3));
          card.style.setProperty('--extra-y', `${(8 * (1 - focus)).toFixed(1)}px`);
          card.style.setProperty('--extra-shadow', (.1 + .1 * focus).toFixed(3));
        });
        active = Math.max(0, Math.min(cards.length - 1, active));
        counter.textContent = `${String(active + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
        progressBar.style.width = `${Math.max((active + 1) / cards.length, clamp(progress)) * 100}%`;
        heading.style.opacity = '1';
      };
      const updateSwipeCounter = () => {
        if (desktop.matches) return;
        const step = cards[1]?.offsetLeft - cards[0]?.offsetLeft || viewport.clientWidth;
        const index = Math.min(cards.length - 1, Math.max(0, Math.round(viewport.scrollLeft / step)));
        counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
        progressBar.style.width = `${((index + 1) / cards.length) * 100}%`;
      };
      viewport.addEventListener('scroll', updateSwipeCounter, { passive: true });
      const render = () => {
        renderQueued = false;
        if (!desktop.matches || !geometry) return;
        const progress = clamp(-section.getBoundingClientRect().top / geometry.scrollRange);
        const movement = clamp(progress / (1 - holdFraction));
        track.style.transform = `translate3d(${-geometry.distance * movement}px, 0, 0)`;
        updateActive(movement, progress);
      };
      const queueRender = () => {
        if (renderQueued) return;
        renderQueued = true;
        requestAnimationFrame(render);
      };
      const measure = () => {
        measureQueued = false;
        if (!desktop.matches) {
          section.classList.remove('is-horizontal');
          section.style.removeProperty('height');
          track.style.removeProperty('transform');
          heading.style.removeProperty('opacity');
          cards.forEach(card => ['--extra-scale', '--extra-opacity', '--extra-y', '--extra-shadow'].forEach(name => card.style.removeProperty(name)));
          geometry = undefined;
          updateSwipeCounter();
          return;
        }
        section.classList.add('is-horizontal');
        const maxX = Math.max(0, track.scrollWidth - viewport.clientWidth);
        const last = cards.at(-1);
        const lastCentre = last.offsetLeft + last.offsetWidth / 2;
        const distance = Math.min(maxX, Math.max(0, lastCentre - viewport.clientWidth * .55));
        const scrollRange = Math.max(1, distance * .7 / (1 - holdFraction));
        section.style.height = `${Math.ceil(stage.offsetHeight + scrollRange)}px`;
        geometry = { distance, scrollRange: section.offsetHeight - stage.offsetHeight, finalCentre: lastCentre - distance };
        render();
      };
      const queueMeasure = () => {
        if (measureQueued) return;
        measureQueued = true;
        requestAnimationFrame(measure);
      };
      addEventListener('scroll', queueRender, { passive: true });
      addEventListener('resize', queueMeasure, { passive: true });
      desktop.addEventListener('change', queueMeasure);
      if ('ResizeObserver' in window) {
        const observer = new ResizeObserver(queueMeasure);
        observer.observe(viewport);
        observer.observe(track);
      }
      Promise.all([
        ...cards.map(card => card.querySelector('img').decode().catch(() => {})),
        document.fonts?.ready || Promise.resolve()
      ]).then(() => {
        queueMeasure();
        requestAnimationFrame(() => window.ScrollTrigger?.refresh());
      });
      queueMeasure();
    });
  }
  function initDeluxeShowcase(items) {
    const section = root.querySelector('#deluxe-mochi');
    if (!section) return;
    const field = section.querySelector('.qlove-deluxe-showcase__field');
    const buttons = [...field.querySelectorAll('.qlove-deluxe-showcase__product')];
    const weightButtons = [...section.querySelectorAll('.qlove-deluxe-showcase__weight-controls button')];
    const controls = section.querySelector('.qlove-deluxe-showcase__weight-controls');
    const heroStage = section.querySelector('.qlove-deluxe-showcase__hero-stage');
    const heroImage = section.querySelector('.qlove-deluxe-showcase__hero-image');
    const heroWord = section.querySelector('.qlove-deluxe-showcase__hero-word');
    const heroCopy = section.querySelector('.qlove-deluxe-showcase__hero-copy');
    const status = section.querySelector('.qlove-deluxe-showcase__status');
    const ambient = section.querySelector('.qlove-deluxe-showcase__ambient');
    const byNumber = new Map(items.map(product => [product.number, product]));
    const groups = {
      '168': buttons.filter(button => button.dataset.weight === '168'),
      '180': buttons.filter(button => button.dataset.weight === '180')
    };
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const tiltAllowed = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 901px)');
    let mode = 'all';
    let selectedProduct = null;
    let busy = false;
    let tiltFrame = 0;
    const flights = new Set();
    const motion = (element, frames, options) => {
      if (reduce.matches || !element.animate) return Promise.resolve();
      const animation = element.animate(frames, options);
      return animation.finished.catch(() => {}).finally(() => animation.cancel());
    };
    const enter = () => {
      if (section.classList.contains('is-entered')) return;
      section.classList.add('is-entered');
      setTimeout(() => section.classList.add('entrance-done'), reduce.matches ? 0 : 1250);
    };
    if (reduce.matches || !('IntersectionObserver' in window)) {
      section.classList.add('is-entered', 'entrance-done');
    } else {
      const observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        enter();
        observer.disconnect();
      }, { threshold: .12 });
      observer.observe(section);
    }
    const settleEntrance = () => {
      enter();
      section.classList.add('entrance-done');
    };
    const syncIndicator = () => {
      const active = weightButtons.find(button => button.dataset.weight === mode);
      if (!active) return;
      controls.style.setProperty('--indicator-x', `${active.offsetLeft}px`);
      controls.style.setProperty('--indicator-width', `${active.offsetWidth}px`);
    };
    const syncState = () => {
      section.dataset.mode = mode;
      weightButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.weight === mode)));
      buttons.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.number) === selectedProduct)));
      if (mode === 'all') {
        section.classList.remove('has-hero');
        heroImage.alt = '';
        heroCopy.hidden = true;
        heroWord.textContent = 'DELUXE';
        status.textContent = '10 FLAVOURS';
        ambient.style.backgroundColor = '#f9f5f0';
      } else {
        const group = groups[mode];
        const index = group.findIndex(button => Number(button.dataset.number) === selectedProduct);
        heroCopy.hidden = selectedProduct === null;
        if (selectedProduct === null) {
          section.classList.remove('has-hero');
          heroImage.alt = '';
          heroWord.textContent = 'DELUXE';
          ambient.style.backgroundColor = '#f9f5f0';
        }
        status.textContent = index < 0 ? `${String(group.length).padStart(2, '0')} FLAVOURS` : `${String(index + 1).padStart(2, '0')} / ${String(group.length).padStart(2, '0')}`;
      }
      syncIndicator();
    };
    const makeFlight = (src, rect) => {
      const clone = document.createElement('img');
      clone.className = 'qlove-deluxe-flight';
      clone.src = src;
      clone.alt = '';
      clone.setAttribute('aria-hidden', 'true');
      Object.assign(clone.style, {
        left: `${rect.left}px`, top: `${rect.top}px`,
        width: `${rect.width}px`, height: `${rect.height}px`,
        transformOrigin: 'top left'
      });
      document.body.append(clone);
      flights.add(clone);
      return clone;
    };
    const removeFlight = clone => { clone.remove(); flights.delete(clone); };
    const fly = (clone, from, to, duration = 620) => motion(clone, [
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${to.width / Math.max(1, from.width)}, ${to.height / Math.max(1, from.height)})`, opacity: 1 }
    ], { duration, easing: 'cubic-bezier(.2,.75,.2,1)', fill: 'forwards' });
    const flip = (button, first, duration = 650, fromOpacity = 1) => {
      if (reduce.matches || !first) return Promise.resolve();
      const last = button.getBoundingClientRect();
      if (!last.width || !last.height) return Promise.resolve();
      const finalOpacity = Number(getComputedStyle(button).opacity);
      button.style.transformOrigin = 'top left';
      return motion(button, [
        { transform: `translate(${first.left - last.left}px, ${first.top - last.top}px) scale(${first.width / last.width}, ${first.height / last.height})`, opacity: fromOpacity },
        { transform: 'none', opacity: finalOpacity }
      ], { duration, easing: 'cubic-bezier(.2,.75,.2,1)' }).finally(() => { button.style.transformOrigin = ''; });
    };
    const filterTo = async weight => {
      settleEntrance();
      const incoming = groups[weight];
      const outgoing = buttons.filter(button => button.dataset.weight !== weight);
      const first = new Map(incoming.map(button => [button, button.getBoundingClientRect()]));
      const exits = reduce.matches ? [] : outgoing.map(button => {
        const img = button.querySelector('img');
        const clone = makeFlight(img.src, img.getBoundingClientRect());
        const animation = motion(clone, [
          { opacity: 1, transform: 'translateY(0) scale(1)' },
          { opacity: 0, transform: 'translateY(-22px) scale(.78)' }
        ], { duration: 480, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' }).finally(() => removeFlight(clone));
        return animation;
      });
      mode = weight;
      selectedProduct = Number(incoming[0].dataset.number);
      const p = byNumber.get(selectedProduct);
      heroImage.src = image(p);
      heroImage.alt = p.name;
      heroCopy.hidden = false;
      updateHeroText(p, 0, incoming.length);
      ambient.style.backgroundColor = incoming[0].dataset.accent;
      syncState();
      section.classList.add('has-hero');
      const moves = incoming.map(button => flip(button, first.get(button)));
      const heroIn = motion(heroImage, [
        { opacity: 0, transform: 'translateY(15px) scale(0.9)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' }
      ], { duration: 400, delay: 200, fill: 'both', easing: 'ease-out' });
      const textIn = motion(heroCopy, [
        { opacity: 0, transform: 'translateY(15px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 400, delay: 250, fill: 'both', easing: 'ease-out' });
      await Promise.all([...exits, ...moves, heroIn, textIn]);
    };
    const switchWeight = async weight => {
      const previous = mode;
      const outgoing = groups[previous];
      const incoming = groups[weight];
      const oldHero = selectedProduct !== null && !reduce.matches
        ? makeFlight(heroImage.src, heroImage.getBoundingClientRect()) : null;
      const oldHeroExit = oldHero ? motion(oldHero, [
        { opacity: 1, transform: 'translateY(0) scale(1)' },
        { opacity: 0, transform: 'translateY(-18px) scale(.86)' }
      ], { duration: 360, fill: 'forwards', easing: 'ease-in-out' }).finally(() => removeFlight(oldHero)) : Promise.resolve();
      const exits = reduce.matches ? [] : outgoing.map(button => {
        const img = button.querySelector('img');
        const clone = makeFlight(img.src, img.getBoundingClientRect());
        return motion(clone, [
          { opacity: 1, transform: 'translateY(0) scale(1)' },
          { opacity: 0, transform: 'translateY(-20px) scale(.8)' }
        ], { duration: 460, fill: 'forwards', easing: 'ease-in-out' }).finally(() => removeFlight(clone));
      });
      // Measure the incoming products at their fixed overview positions without painting ALL mode.
      section.dataset.mode = 'all';
      const first = new Map(incoming.map(button => [button, button.getBoundingClientRect()]));
      section.dataset.mode = previous;
      mode = weight;
      selectedProduct = Number(incoming[0].dataset.number);
      const p = byNumber.get(selectedProduct);
      heroImage.src = image(p);
      heroImage.alt = p.name;
      heroCopy.hidden = false;
      updateHeroText(p, 0, incoming.length);
      ambient.style.backgroundColor = incoming[0].dataset.accent;
      syncState();
      section.classList.add('has-hero');
      const moves = incoming.map(button => flip(button, first.get(button), 650, 0));
      const heroIn = motion(heroImage, [
        { opacity: 0, transform: 'translateY(15px) scale(0.9)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' }
      ], { duration: 400, delay: 200, fill: 'both', easing: 'ease-out' });
      const textIn = motion(heroCopy, [
        { opacity: 0, transform: 'translateY(15px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 400, delay: 250, fill: 'both', easing: 'ease-out' });
      await Promise.all([...exits, oldHeroExit, ...moves, heroIn, textIn]);
    };
    const updateHeroText = (product, index, total) => {
      const flavour = deluxeFlavour(product.name);
      heroWord.textContent = flavour.split(' ')[0].toUpperCase();
      heroCopy.querySelector('.qlove-deluxe-showcase__hero-flavour').textContent = flavour;
      heroCopy.querySelector('.qlove-deluxe-showcase__hero-fullname').textContent = product.name;
      heroCopy.querySelector('.qlove-deluxe-showcase__hero-weight').textContent = shortSize(product.name).toUpperCase();
      heroCopy.querySelector('.qlove-deluxe-showcase__hero-counter').textContent = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    };
    const selectFromRail = async number => {
      if (selectedProduct === number) return;
      const product = byNumber.get(number);
      const button = buttons.find(item => Number(item.dataset.number) === number);
      const thumb = button.querySelector('img');
      const from = thumb.getBoundingClientRect();
      const oldHero = selectedProduct !== null;
      const oldRect = heroImage.getBoundingClientRect();
      const oldFlight = !reduce.matches && oldHero ? makeFlight(heroImage.src, oldRect) : null;
      const newFlight = !reduce.matches ? makeFlight(image(product), from) : null;
      const oldText = oldHero ? motion(heroCopy, [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(-15px)' }
      ], { duration: 180, fill: 'forwards', easing: 'ease-in' }) : Promise.resolve();
      heroImage.style.opacity = '0';
      if (newFlight) thumb.style.opacity = '0';
      const oldExit = oldFlight ? motion(oldFlight, [
        { opacity: 1, transform: 'translateY(0) scale(1) rotate(0deg)' },
        { opacity: 0, transform: 'translateY(-18px) scale(.88) rotate(-3deg)' }
      ], { duration: 350, fill: 'forwards', easing: 'ease-in-out' }) : Promise.resolve();
      await oldText;
      const group = groups[mode];
      const index = group.indexOf(button);
      selectedProduct = number;
      heroImage.src = image(product);
      heroImage.alt = product.name;
      heroCopy.hidden = false;
      updateHeroText(product, index, group.length);
      ambient.style.backgroundColor = button.dataset.accent;
      syncState();
      const destination = heroImage.getBoundingClientRect();
      if (newFlight) await newFlight.decode().catch(() => {});
      await Promise.all([newFlight ? fly(newFlight, from, destination, 650) : Promise.resolve(), oldExit]);
      if (oldFlight) removeFlight(oldFlight);
      if (newFlight) removeFlight(newFlight);
      thumb.style.opacity = '';
      heroImage.style.opacity = '';
      section.classList.add('has-hero');
      await motion(heroCopy, [
        { opacity: 0, transform: 'translateY(15px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: reduce.matches ? 0 : 280, easing: 'ease-out' });
    };
    const returnAll = async () => {
      if (mode === 'all') return;
      const visible = groups[mode];
      if (selectedProduct !== null && !reduce.matches) {
        const selected = buttons.find(button => Number(button.dataset.number) === selectedProduct);
        const from = heroImage.getBoundingClientRect();
        const thumb = selected.querySelector('img');
        const to = thumb.getBoundingClientRect();
        const clone = makeFlight(heroImage.src, from);
        heroImage.style.opacity = '0';
        thumb.style.opacity = '0';
        await fly(clone, from, to, 430);
        removeFlight(clone);
        heroImage.style.opacity = '';
        thumb.style.opacity = '';
      }
      const first = new Map(visible.map(button => [button, button.getBoundingClientRect()]));
      const returning = buttons.filter(button => button.dataset.weight !== mode);
      mode = 'all';
      selectedProduct = null;
      syncState();
      const moves = visible.map(button => flip(button, first.get(button), 620));
      const arrivals = returning.map(button => motion(button, [
        { opacity: 0, translate: '0 25px', scale: .82 },
        { opacity: 1, translate: '0 0', scale: 1 }
      ], { duration: 550, easing: 'cubic-bezier(.2,.75,.2,1)' }));
      await Promise.all([...moves, ...arrivals]);
    };
    const run = async action => {
      if (busy) return;
      busy = true;
      section.dataset.transitioning = 'true';
      try { await action(); }
      finally {
        flights.forEach(clone => clone.remove());
        flights.clear();
        buttons.forEach(button => { button.querySelector('img').style.opacity = ''; button.style.transformOrigin = ''; });
        heroImage.style.opacity = '';
        heroCopy.style.opacity = '';
        delete section.dataset.transitioning;
        busy = false;
      }
    };
    weightButtons.forEach(button => button.addEventListener('click', () => run(async () => {
      const target = button.dataset.weight;
      if (mode === target) await returnAll();
      else if (mode === 'all') await filterTo(target);
      else await switchWeight(target);
    })));
    buttons.forEach(button => button.addEventListener('click', () => run(async () => {
      const number = Number(button.dataset.number);
      if (mode === 'all') await filterTo(button.dataset.weight);
      await selectFromRail(number);
      if (matchMedia('(max-width: 600px)').matches) section.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'start' });
    })));
    field.addEventListener('keydown', event => {
      if (mode === 'all' || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;
      event.preventDefault();
      const group = groups[mode];
      const current = group.findIndex(button => Number(button.dataset.number) === selectedProduct);
      const focused = group.indexOf(document.activeElement);
      const index = Math.max(0, Math.min(group.length - 1, (current >= 0 ? current : focused >= 0 ? focused : 0) + (event.key === 'ArrowRight' ? 1 : -1)));
      group[index].focus();
      run(() => selectFromRail(Number(group[index].dataset.number)));
    });
    addEventListener('resize', syncIndicator, { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(syncIndicator).observe(controls);
    heroStage.addEventListener('pointermove', event => {
      if (!tiltAllowed.matches || reduce.matches || selectedProduct === null || tiltFrame) return;
      tiltFrame = requestAnimationFrame(() => {
        tiltFrame = 0;
        const rect = heroStage.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
        const y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
        heroStage.style.setProperty('--hero-tilt-x', `${-3 * y}deg`);
        heroStage.style.setProperty('--hero-tilt-y', `${4 * x}deg`);
      });
    });
    heroStage.addEventListener('pointerleave', () => {
      heroStage.style.setProperty('--hero-tilt-x', '0deg');
      heroStage.style.setProperty('--hero-tilt-y', '0deg');
    });
    syncState();
  }
  function initDorayakiShowcase() {
    const section = root.querySelector('.qlove-dora-scroll');
    if (!section) return;
    const stage = section.querySelector('.qlove-dora-stage');
    const wheel = section.querySelector('.qlove-dora-wheel');
    const cut = section.querySelector('.qlove-dora-cut');
    const pack = section.querySelector('.qlove-dora-pack');
    const flavour = section.querySelector('.qlove-dora-flavour');
    const description = section.querySelector('#qlove-dora-desc');
    const stepTitle = section.querySelector('.qlove-dora-steptitle');
    const stepCopy = section.querySelector('.qlove-dora-stepcopy');
    const bar = section.querySelector('.qlove-dora-bar span');
    const flash = section.querySelector('.qlove-dora-flash');
    const controls = [...section.querySelectorAll('.qlove-dora-progress button')];
    if (!stage || !wheel || !cut || !pack || !flavour || controls.length !== 4) return;

    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const scenes = dorayakiScrollScenes.map((scene, index) => ({
      ...scene,
      src: controls[index].dataset.src,
      alt: controls[index].dataset.alt
    }));
    scenes.forEach(scene => { const preload = new Image(); preload.src = scene.src; });

    let current = 0;
    let requested = 0;
    let busy = false;
    let scrollFrame = 0;
    let swapTimer = 0;
    let settleTimer = 0;

    const resetMotion = () => {
      pack.style.transform = 'rotateY(0deg) scale(1)';
      pack.style.opacity = '1';
      flavour.style.transform = 'translateY(0)';
      flavour.style.opacity = '1';
    };

    const applyScene = index => {
      const scene = scenes[index];
      stage.style.setProperty('--dora-background', scene.background);
      wheel.style.setProperty('--dora-rotation', `${index * 90}deg`);
      cut.style.setProperty('--dora-fill', scene.fill);
      if (pack.getAttribute('src') !== scene.src) pack.src = scene.src;
      pack.alt = scene.alt;
      flavour.textContent = scene.display;
      description.textContent = scene.description;
      stepTitle.textContent = scene.title;
      stepCopy.textContent = index === scenes.length - 1
        ? 'One more scroll and this section releases into the next series.'
        : 'Scroll again to rotate to the next flavour.';
      controls.forEach((control, controlIndex) => {
        const active = controlIndex === index;
        control.classList.toggle('active', active);
        if (active) control.setAttribute('aria-current', 'step');
        else control.removeAttribute('aria-current');
      });
      bar.style.width = `${(index + 1) * 25}%`;
      section.dataset.activeIndex = String(index);
    };

    const requestScene = target => {
      requested = Math.max(0, Math.min(scenes.length - 1, target));
      if (busy || requested === current) return;
      const direction = requested > current ? 1 : -1;
      const next = current + direction;
      busy = true;
      section.dataset.transitioning = 'true';
      clearTimeout(swapTimer);
      clearTimeout(settleTimer);
      pack.style.transform = `rotateY(${direction > 0 ? -78 : 78}deg) scale(.88)`;
      pack.style.opacity = '0';
      flavour.style.transform = `translateY(${direction > 0 ? -16 : 16}px)`;
      flavour.style.opacity = '0';
      flash.classList.remove('play');
      void flash.offsetWidth;
      flash.classList.add('play');

      const swapDelay = reduce.matches ? 1 : 240;
      swapTimer = window.setTimeout(() => {
        applyScene(next);
        current = next;
        pack.style.transform = `rotateY(${direction > 0 ? 68 : -68}deg) scale(.9)`;
        requestAnimationFrame(() => requestAnimationFrame(resetMotion));
      }, swapDelay);

      settleTimer = window.setTimeout(() => {
        busy = false;
        delete section.dataset.transitioning;
        resetMotion();
        if (requested !== current) requestScene(requested);
      }, reduce.matches ? 20 : 920);
    };

    const sync = () => {
      scrollFrame = 0;
      const rect = section.getBoundingClientRect();
      const total = Math.max(1, section.offsetHeight - innerHeight);
      const passed = Math.max(0, Math.min(total, -rect.top));
      const progress = passed / total;
      requestScene(Math.min(scenes.length - 1, Math.floor(progress * scenes.length)));
    };
    const scheduleSync = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(sync);
    };

    controls.forEach(control => control.addEventListener('click', () => {
      const index = Number(control.dataset.index);
      const sectionTop = scrollY + section.getBoundingClientRect().top;
      const total = Math.max(1, section.offsetHeight - innerHeight);
      scrollTo({ top: sectionTop + total * ((index + .1) / scenes.length), behavior: reduce.matches ? 'auto' : 'smooth' });
    }));
    addEventListener('scroll', scheduleSync, { passive: true });
    addEventListener('resize', scheduleSync, { passive: true });
    applyScene(0);
    resetMotion();
    sync();
  }
  function initSnowflakeShowcase() {
    const section = root.querySelector('.qlove-snowflake-showcase');
    if (!section) return;
    const products = [...section.querySelectorAll('.qlove-snowflake-showcase__product')];
    const info = section.querySelector('.qlove-snowflake-showcase__info');
    const indexLabel = info.querySelector('.qlove-snowflake-showcase__index');
    const title = info.querySelector('h3');
    const description = info.querySelector('p');
    const progress = info.querySelector('.qlove-snowflake-showcase__progress i');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = matchMedia('(max-width: 600px)');
    const tablet = matchMedia('(max-width: 900px)');
    let activeIndex = 2;
    let resizeFrame = 0;

    const slots = () => {
      if (mobile.matches) return {
    hero: { x: '0vw', y: '-11vh', scale: 1.38, rotate: 0 },
        secondary: [
        { x: '-20vw', y: '8vh', scale: .76, rotate: -3 },
        { x: '20vw', y: '8vh', scale: .76, rotate: 3 },
        { x: '-20vw', y: '21vh', scale: .76, rotate: 3 },
        { x: '20vw', y: '21vh', scale: .76, rotate: -3 }
        ]
      };
      if (tablet.matches) return {
    hero: { x: '-16vw', y: '-2vh', scale: 1.35, rotate: 0 },
        secondary: [
        { x: '7vw', y: '-12vh', scale: .72, rotate: -3 },
        { x: '22vw', y: '-12vh', scale: .72, rotate: 3 },
        { x: '7vw', y: '12vh', scale: .72, rotate: 3 },
        { x: '22vw', y: '12vh', scale: .72, rotate: -3 }
        ]
      };
      return {
    hero: { x: '-17vw', y: '-2vh', scale: 1.4, rotate: 0 },
        secondary: [
        { x: '5vw', y: '-13vh', scale: .72, rotate: -3 },
        { x: '17vw', y: '-13vh', scale: .72, rotate: 3 },
        { x: '5vw', y: '13vh', scale: .72, rotate: 3 },
        { x: '17vw', y: '13vh', scale: .72, rotate: -3 }
        ]
      };
    };
    const setSlot = (product, slot, role) => {
      product.dataset.role = role;
      product.style.setProperty('--slot-x', slot.x);
      product.style.setProperty('--slot-y', slot.y);
      product.style.setProperty('--slot-s', String(slot.scale));
      product.style.setProperty('--slot-r', `${slot.rotate}deg`);
    };
    const arrangeFocus = index => {
      const layout = slots();
      const secondary = products.filter((_, productIndex) => productIndex !== index);
      setSlot(products[index], layout.hero, 'hero');
      secondary.forEach((product, slotIndex) => setSlot(product, layout.secondary[slotIndex], 'secondary'));
    };
    const select = index => {
      const nextIndex = (index + products.length) % products.length;
      if (section.dataset.layout === 'focus' && nextIndex === activeIndex) return;
      activeIndex = nextIndex;
      const selected = products[activeIndex];
      arrangeFocus(activeIndex);
      products.forEach((product, productIndex) => {
        product.setAttribute('aria-selected', String(productIndex === activeIndex));
      });
      section.dataset.layout = 'focus';
      section.dataset.active = selected.dataset.key;
      section.style.setProperty('--snowflake-accent', selected.dataset.accent);
      section.style.setProperty('--snowflake-soft', selected.dataset.soft);
      indexLabel.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(products.length).padStart(2, '0')}`;
      title.textContent = selected.dataset.name;
      description.textContent = selected.dataset.description;
      progress.style.setProperty('--snowflake-progress', `${(activeIndex + 1) / products.length * 100}%`);
    };

    products.forEach((product, index) => {
      product.addEventListener('click', () => select(index));
      product.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const current = products.indexOf(event.currentTarget);
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? products.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + products.length) % products.length;
        products[next].focus();
      });
    });

    if (reduce.matches || !('IntersectionObserver' in window)) {
      section.classList.add('is-entered');
    } else {
      const observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        section.classList.add('is-entered');
        observer.disconnect();
      }, { threshold: .1 });
      observer.observe(section);
    }
    addEventListener('resize', () => {
      if (section.dataset.layout !== 'focus' || resizeFrame) return;
      resizeFrame = requestAnimationFrame(() => { resizeFrame = 0; arrangeFocus(activeIndex); });
    }, { passive: true });
  }
  function initMix450Story() {
    const section = root.querySelector('#mix-450g');
    if (!section) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const product = section.querySelector('.qlove-mix-450__product-wrap');
    const intro = section.querySelector('.qlove-mix-450__intro');
    const chapter = section.querySelector('.qlove-mix-450__chapter');
    const flavours = [...section.querySelectorAll('.qlove-mix-450__flavour')];
    const focus = section.querySelector('.qlove-mix-450__focus');
    const final = section.querySelector('.qlove-mix-450__final');
    let raf = 0;
    const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
    const ease = value => value * value * (3 - 2 * value);
    const setProgress = () => {
      raf = 0;
      const bounds = section.getBoundingClientRect();
      const range = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = reduce.matches ? 0.7 : clamp(-bounds.top / range);
      const introEnd = .12;
      const oneBoxStart = .22;
      const revealStart = .40;
      const focusStart = .46;
      section.dataset.progress = progress.toFixed(3);

      // One product element: glides slowly and gracefully from center to right side across 28% of scroll progress.
      const isMobile = window.innerWidth <= 600;
      const moveXProgress = isMobile ? 0 : ease(clamp((progress - introEnd) / .28));
      const productProgress = ease(clamp((progress - introEnd) / (1 - introEnd)));
      product.style.transform = progress <= introEnd
        ? 'translate(-50%,-50%)'
        : `translate(calc(-50% + ${moveXProgress * 17}vw), calc(-50% + ${productProgress * 8}vh)) scale(${1 - productProgress * .10})`;

      const introProgress = ease(clamp((progress - .06) / .16));
      intro.style.opacity = String(1 - introProgress);
      intro.style.visibility = progress < .24 ? 'visible' : 'hidden';
      intro.style.transform = `translateY(${-introProgress * 28}px)`;
      const scrollNote = section.querySelector('.qlove-mix-450__scroll-note');
      scrollNote.style.opacity = String(1 - ease(clamp(progress / .16)));
      scrollNote.style.visibility = progress < .17 ? 'visible' : 'hidden';

      const chapterProgress = ease(clamp((progress - oneBoxStart) / .16));
      chapter.style.opacity = String(chapterProgress * (progress < revealStart ? 1 : 0));
      chapter.style.visibility = progress >= oneBoxStart && progress < revealStart ? 'visible' : 'hidden';
      chapter.style.transform = `translateY(${(1 - chapterProgress) * 28}px)`;

      const markerProgress = clamp((progress - revealStart) / .10);
      const focusStepSpan = (1 - focusStart) / 3;
      flavours.forEach((item, index) => {
        const reveal = ease(clamp((markerProgress - index * .06) / .30));
        const isCurrentFocus = progress >= focusStart + index * focusStepSpan && (index === 2 ? progress <= 1 : progress < focusStart + (index + 1) * focusStepSpan);
        item.style.opacity = String(isCurrentFocus ? 1 : reveal * 0.45);
        item.style.visibility = progress >= revealStart ? 'visible' : 'hidden';
        item.classList.toggle('is-focus', isCurrentFocus);
      });

      const focusStep = Math.min(2, Math.max(0, Math.floor((progress - focusStart) / focusStepSpan)));
      const focusIndex = progress >= focusStart ? focusStep : 0;
      const focusVisible = progress >= focusStart;
      const focusData = [
        ['01 / 03', 'CHOCOLATE FUDGE BROWNIE', 'Rich. Soft. Indulgent.'],
        ['02 / 03', 'STRAWBERRY CHEESECAKE', 'Creamy. Fruity. Playful.'],
        ['03 / 03', 'COOKIES & CREAM', 'Creamy. Comforting. Familiar.']
      ][focusIndex];
      if (focus) {
        focus.querySelector('span').textContent = focusData[0];
        focus.querySelector('h3').textContent = focusData[1];
        focus.querySelector('p').textContent = focusData[2];
        focus.style.opacity = focusVisible ? String(ease(clamp((progress - focusStart) / .06))) : '0';
        focus.style.visibility = focusVisible ? 'visible' : 'hidden';
        focus.style.transform = `translateY(${(1 - ease(clamp((progress - focusStart) / .06))) * 20}px)`;
      }
    };
    const request = () => { if (!raf) raf = requestAnimationFrame(setProgress); };
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request, { passive: true });
    request();
  }

  function initCategoryNav() {
    const nav = root.querySelector('.qlove-jump');
    if (!nav) return;
    const links = [...nav.querySelectorAll('a[href^="#"]')];
    const targets = links.map(link => root.querySelector(link.getAttribute('href')));
    let ticking = false;
    let current = -1;
    const update = () => {
      ticking = false;
      const threshold = nav.getBoundingClientRect().bottom + 100;
      let active = 0;
      targets.forEach((target, i) => { if (target && target.getBoundingClientRect().top <= threshold) active = i; });
      links.forEach((link, i) => {
        link.classList.toggle('is-active', i === active);
        if (i === active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
      if (active !== current) {
        current = active;
        nav.scrollTo({ left: Math.max(0, links[active].offsetLeft - (nav.clientWidth - links[active].clientWidth) / 2), behavior: 'smooth' });
      }
    };
    links.forEach((link, index) => link.addEventListener('click', event => {
      event.preventDefault();
      const target = targets[index];
      if (!target) return;
      history.replaceState(null, '', `${location.pathname}${location.search}#${target.id}`);
      window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - nav.offsetHeight, behavior: 'smooth' });
    }));
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener('resize', update, { passive: true });
    update();
  }
  function initPouchWall() {
    const section = root.querySelector('#deluxe-pouch-120g');
    if (!section) return;
    const viewport = section.querySelector('.qlove-pouch-wall__viewport'); if (!viewport) return;
    const track = section.querySelector('.qlove-pouch-wall__track');
    const cards = [...section.querySelectorAll('.qlove-pouch-wall__card')];
    const prev = section.querySelector('.qlove-pouch-wall__prev');
    const next = section.querySelector('.qlove-pouch-wall__next');
    const counter = section.querySelector('.qlove-pouch-wall__counter');
    const ambient = section.querySelector('.qlove-pouch-wall__ambient');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = matchMedia('(min-width: 901px)');
    let index = 0;
    let frame;
    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    let dragMoved = false;
    let dragPointerId = null;
    cards.forEach(card => {
      const hoverImage = card.querySelector('.qlove-pouch-wall__image--hover');
      if (hoverImage) { const preload = new Image(); preload.src = hoverImage.src; }
      card.addEventListener('pointerenter', () => card.classList.add('is-hover'));
      card.addEventListener('pointerleave', () => card.classList.remove('is-hover'));
      card.addEventListener('focusin', () => card.classList.add('is-hover'));
      card.addEventListener('focusout', event => { if (!card.contains(event.relatedTarget)) card.classList.remove('is-hover'); });
    });
    const reveal = () => section.classList.add('is-visible');
    if (reduce.matches || !('IntersectionObserver' in window)) reveal();
    else { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { reveal(); observer.disconnect(); } }), { threshold: .12 }); observer.observe(section); }
    const clamp = value => Math.max(0, Math.min(1, value));
    const update = () => {
      frame = undefined;
      const centre = viewport.scrollLeft + viewport.clientWidth / 2;
      let closest = 0;
      let distance = Infinity;
      cards.forEach((card, cardIndex) => {
        const cardCentre = card.offsetLeft + card.offsetWidth / 2;
        const delta = Math.abs(cardCentre - centre);
        if (delta < distance) { distance = delta; closest = cardIndex; }
        const influenceRange = viewport.clientWidth * .46;
        const focus = 1 - clamp(delta / influenceRange);
        const emphasis = Math.pow(focus, 2);
        const scale = reduce.matches ? .92 + .08 * focus : (desktop.matches ? .70 + .55 * emphasis : .80 + .20 * emphasis);
        card.style.setProperty('--pouch-scale', scale.toFixed(3));
        card.style.setProperty('--pouch-opacity', (reduce.matches ? .8 + .2 * focus : .64 + .36 * Math.pow(focus, 1.2)).toFixed(3));
        card.style.setProperty('--pouch-y', `${(reduce.matches ? 0 : 8 - 20 * focus).toFixed(1)}px`);
        card.style.setProperty('--pouch-title-scale', (0.92 + 0.08 * focus).toFixed(3));
        card.style.setProperty('--pouch-title-opacity', (0.35 + 0.65 * focus).toFixed(3));
        card.style.setProperty('--pouch-label-opacity', (0.25 + 0.75 * focus).toFixed(3));
        card.style.setProperty('--pouch-z', String(Math.round(1 + focus * 4)));
      });
      index = Math.max(0, Math.min(cards.length - 1, closest));
      counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
      section.style.setProperty('--pouch-index', String(index));
      if (ambient) ambient.style.backgroundColor = pouchAmbient[index] || pouchAmbient[0];
      prev.disabled = index === 0;
      next.disabled = index === cards.length - 1;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const getNearestIndex = () => {
      const centre = viewport.scrollLeft + viewport.clientWidth / 2;
      let nearest = 0;
      let minDistance = Infinity;
      cards.forEach((card, cardIndex) => {
        const cardCentre = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCentre - centre);
        if (distance < minDistance) { minDistance = distance; nearest = cardIndex; }
      });
      return nearest;
    };
    const step = () => cards[1] ? cards[1].offsetLeft - cards[0].offsetLeft : viewport.clientWidth;
    const goTo = (target, smooth = true) => viewport.scrollTo({ left: Math.max(0, Math.min(viewport.scrollWidth - viewport.clientWidth, target * step())), behavior: smooth && !reduce.matches ? 'smooth' : 'auto' });
    prev.addEventListener('click', () => goTo(index - 1));
    next.addEventListener('click', () => goTo(index + 1));
    viewport.addEventListener('scroll', schedule, { passive: true });
    viewport.addEventListener('pointerdown', event => { if (event.button !== undefined && event.button !== 0) return; event.preventDefault(); dragging = true; dragMoved = false; dragPointerId = event.pointerId; startX = event.clientX; startScroll = viewport.scrollLeft; viewport.style.scrollSnapType = 'none'; viewport.setPointerCapture?.(event.pointerId); viewport.classList.add('is-dragging'); });
    viewport.addEventListener('pointermove', event => { if (!dragging || (dragPointerId !== null && event.pointerId !== dragPointerId)) return; event.preventDefault(); const delta = event.clientX - startX; if (Math.abs(delta) >= 5) dragMoved = true; viewport.scrollLeft = startScroll - delta; schedule(); });
    const endDrag = event => { if (!dragging) return; if (event?.pointerId != null && dragPointerId != null && event.pointerId !== dragPointerId) return; dragging = false; viewport.releasePointerCapture?.(dragPointerId); dragPointerId = null; viewport.classList.remove('is-dragging'); viewport.style.scrollSnapType = ''; index = getNearestIndex(); goTo(index); };
    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);
    viewport.addEventListener('keydown', event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); goTo(index + (event.key === 'ArrowRight' ? 1 : -1)); } });
    viewport.addEventListener('wheel', event => { if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return; viewport.scrollLeft += event.deltaX; }, { passive: true });
    addEventListener('resize', () => { goTo(index); schedule(); }, { passive: true });
    viewport.addEventListener('dragstart', event => event.preventDefault());
    update();
    requestAnimationFrame(() => { goTo(2, false); update(); });
  }

  function initTraditionalScroll(traditional) {
    const exp = root.querySelector('.qlove-traditional-scroll');
    if (!exp) return;
    const stage = exp.querySelector('.qlove-traditional-scroll__stage');
    const wrap = exp.querySelector('.qlove-traditional-scroll__products');
    const railFill = exp.querySelector('.qlove-traditional-scroll__rail-fill');
    const railLabels = exp.querySelector('.qlove-traditional-scroll__rail-labels');
    const headline = exp.querySelector('.qlove-traditional-scroll__headline');
    const spotCopy = exp.querySelector('.qlove-traditional-scroll__spot-copy');
    const spotNum = spotCopy ? spotCopy.querySelector('.num') : null;
    const spotName = spotCopy ? spotCopy.querySelector('h3') : null;
    const spotSub = spotCopy ? spotCopy.querySelector('.descriptor') : null;
    const finalTitle = exp.querySelector('.qlove-traditional-scroll__final-title');

    const traditionalData = [
      { name: 'MATCHA', full: 'Matcha Traditional Mochi', sub: 'Earthy · Smooth · Classic', accent: '#A8C95E' },
      { name: 'PEANUT', full: 'Peanut Traditional Mochi', sub: 'Nutty · Rich · Comforting', accent: '#F2A23A' },
      { name: 'RED BEAN', full: 'Red Bean Traditional Mochi', sub: 'Sweet · Tender · Authentic', accent: '#C84E59' },
      { name: 'BOBA', full: 'Boba Milk Tea Traditional Mochi', sub: 'Chewy · Aromatic · Trendy', accent: '#B38867' },
      { name: 'PANDAN', full: 'Coconut Pandan Traditional Mochi', sub: 'Fragrant · Tropical · Smooth', accent: '#6DBE91' },
      { name: 'SESAME', full: 'Sesame Traditional Mochi', sub: 'Nutty · Toasted · Deep', accent: '#696568' },
      { name: 'TARO', full: 'Taro Traditional Mochi', sub: 'Subtly Sweet · Velvet · Warm', accent: '#AA88BC' }
    ];

    if (wrap) wrap.innerHTML = '';
    if (railLabels) railLabels.innerHTML = '';

    const els = traditionalData.map((p, i) => {
      const prodObj = (traditional && traditional[i]) || {};
      const imgSrc = image(prodObj);
      const el = document.createElement('div');
      el.className = 'qlove-traditional-scroll__product';
      el.innerHTML = `<img src="${imgSrc}" alt="${p.full}" loading="lazy" decoding="async">`;
      if (wrap) wrap.appendChild(el);

      if (railLabels) {
        const label = document.createElement('span');
        label.textContent = p.name;
        railLabels.appendChild(label);
      }
      return el;
    });

    const labels = railLabels ? [...railLabels.children] : [];

    const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const lerp = (a, b, t) => a + (b - a) * t;
    const smooth = t => t * t * (3 - 2 * t);
    const map = (v, a, b, c, d) => c + (d - c) * clamp((v - a) / (b - a));

    let currentP = 0;
    let targetP = 0;

    function viewportProgress() {
      const rect = exp.getBoundingClientRect();
      const total = exp.offsetHeight - window.innerHeight;
      return total > 0 ? clamp(-rect.top / total) : 0;
    }

    function setProduct(el, x, y, scale, rotate, opacity = 1, blur = 0, z = 1) {
      if (!el) return;
      el.style.transform = `translate(-50%,-50%) translate(${x}px,${y}px) scale(${scale}) rotate(${rotate}deg)`;
      el.style.opacity = opacity;
      el.style.filter = blur ? `blur(${blur}px)` : 'none';
      el.style.zIndex = z;
    }

    function render(p) {
      if (railFill) railFill.style.width = `${p * 100}%`;

      const mobile = window.innerWidth < 760;
      const spreadW = mobile ? window.innerWidth * 0.62 : Math.min(window.innerWidth * 0.108, 170);
      const fanRise = mobile ? 22 : 46;

      // PHASES:
      // 0.00 – 0.28: Steady Prelude Intro (headline steady, stack centered)
      // 0.28 – 0.44: Fan Spread
      // 0.44 – 0.90: Flavour Spotlight (7 items)
      // 0.90 – 1.00: Final Lineup

      const introFade = 1 - smooth(map(p, .05, .15, 0, 1));
      if (headline) {
        headline.style.opacity = introFade;
        headline.style.transform = `translateX(-50%) translateY(${-24 * (1 - introFade)}px)`;
      }

      if (p < .20) {
        if (spotCopy) spotCopy.style.opacity = 0;
        if (finalTitle) finalTitle.style.opacity = 0;
        labels.forEach(l => l.classList.remove('active'));

        const spread = smooth(map(p, .08, .20, 0, 1));
        traditionalData.forEach((prod, i) => {
          const centered = i - 3;
          const sx = centered * (mobile ? 11 : 15);
          const sy = Math.abs(centered) * 6;
          const sr = centered * 4.5;

          const fx = centered * spreadW;
          const fy = -Math.abs(centered) * fanRise + (Math.abs(centered) * 6);
          const fr = centered * (mobile ? 3.5 : 5);

          const x = lerp(sx, fx, spread);
          const y = lerp(sy, fy, spread);
          const scale = lerp(1 - Math.abs(centered) * .025, mobile ? .82 : .78, spread);
          const rot = lerp(sr, fr, spread);
          setProduct(els[i], x, y, scale, rot, 1, 0, 10 - Math.abs(centered));
        });
        if (stage) stage.style.setProperty('--accent', '#A8C95E');
      } else if (p < .90) {
        if (finalTitle) finalTitle.style.opacity = 0;
        const q = map(p, .20, .90, 0, 1);
        const exact = q * 6;
        const active = Math.round(exact);
        const local = exact - active;

        traditionalData.forEach((prod, i) => {
          const delta = i - exact;
          const activeDist = Math.abs(i - exact);

          let x, y, scale, opacity, rotate, blur;
          if (mobile) {
            x = delta * window.innerWidth * .66;
            y = -50 - Math.min(activeDist, 2) * 8;
            scale = 1.12 - Math.min(activeDist, 1) * .32;
          } else {
            x = window.innerWidth * .20 + delta * Math.min(window.innerWidth * .18, 255);
            y = 12 + Math.min(activeDist, 2) * 12;
            scale = 1.16 - Math.min(activeDist, 1) * .36;
          }
          opacity = 1 - Math.min(activeDist, 1) * .67;
          rotate = clamp(delta, -2, 2) * 2.2;
          blur = Math.max(0, activeDist - .35) * 1.8;
          setProduct(els[i], x, y, scale, rotate, opacity, blur, 20 - Math.round(activeDist));
        });

        const idx = clamp(active, 0, 6);
        const prod = traditionalData[idx];
        if (stage) stage.style.setProperty('--accent', prod.accent);
        if (spotNum) spotNum.textContent = String(idx + 1).padStart(2, '0') + ' / 07';
        if (spotName) spotName.textContent = prod.name;
        if (spotSub) spotSub.textContent = prod.sub;
        if (spotCopy) {
          spotCopy.style.opacity = smooth(map(p, .21, .26, 0, 1));
          spotCopy.style.transform = mobile ? 'none' : `translateY(${-46 + local * 2}%)`;
        }

        labels.forEach((l, i) => l.classList.toggle('active', i === idx));
      } else {
        if (spotCopy) spotCopy.style.opacity = 0;
        if (finalTitle) finalTitle.style.opacity = smooth(map(p, .91, .96, 0, 1));
        labels.forEach(l => l.classList.remove('active'));

        if (stage) stage.style.setProperty('--accent', '#E9B7D4');

        traditionalData.forEach((prod, i) => {
          const centered = i - 3;
          const lineGap = mobile ? window.innerWidth * .25 : Math.min(window.innerWidth * .115, 170);
          const x = centered * lineGap;
          const y = mobile ? 55 + Math.abs(centered) * 7 : 92;
          const scale = mobile ? .54 : .64;
          setProduct(els[i], x, y, scale, 0, 1, 0, 10);
        });
      }
    }

    let animFrame = null;
    function tick() {
      targetP = viewportProgress();
      const diff = targetP - currentP;
      if (Math.abs(diff) > 0.0001) {
        currentP += diff * 0.06;
      } else {
        currentP = targetP;
      }
      render(currentP);
      animFrame = requestAnimationFrame(tick);
    }

    tick();
  }

  function initTraditionalHover() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    root.querySelectorAll('.qlove-traditional-card').forEach(card => {
      const defaultImage = card.querySelector('.qlove-traditional-card__image--default');
      const hoverImage = card.querySelector('.qlove-traditional-card__image--hover');
      const mood = card.querySelector('.qlove-traditional-card__mood');
      const mask = card.querySelector('mask');
      const wave = card.querySelector('.qlove-traditional-card__wave');
      const maskReference = `url(#${mask.id})`;
      const state = { progress: 0 };
      let tween;
      let frame;
      const render = () => {
        const progress = Math.min(1, Math.max(0, state.progress));
        if (reducedMotion.matches) {
          hoverImage.style.maskImage = 'none';
          hoverImage.style.webkitMaskImage = 'none';
          hoverImage.style.opacity = String(progress);
          defaultImage.style.opacity = String(1 - progress);
          mood.style.opacity = String(progress * .8);
          return;
        }
        hoverImage.style.maskImage = maskReference;
        hoverImage.style.webkitMaskImage = maskReference;
        const level = 1.08 - 1.16 * progress;
        const amplitude = .018 + .012 * Math.sin(Math.PI * progress);
        const points = Array.from({ length: 25 }, (_, index) => {
          const x = index / 24;
          const y = level + amplitude * Math.sin(Math.PI * 2 * (1.35 * x - .32 * progress))
            + .006 * Math.sin(Math.PI * 2 * (2.6 * x + .17 * progress));
          return `${x.toFixed(3)} ${y.toFixed(3)}`;
        });
        wave.setAttribute('d', `M ${points.join(' L ')} L 1 1.3 L 0 1.3 Z`);
        hoverImage.style.opacity = String(Math.min(1, progress * 4));
        defaultImage.style.opacity = String(1 - Math.min(1, Math.max(0, (progress - .88) / .12)));
        mood.style.opacity = String(progress * .8);
      };
      const moveTo = target => {
        tween?.kill();
        if (frame) cancelAnimationFrame(frame);
        const start = state.progress;
        const duration = (reducedMotion.matches ? 160 : 760) * Math.abs(target - start);
        if (!duration) return;
        if (window.gsap) {
          tween = window.gsap.to(state, { progress: target, duration: duration / 1000, ease: 'sine.inOut', onUpdate: render, onComplete: render });
          return;
        }
        const started = performance.now();
        const tick = now => {
          const t = Math.min(1, (now - started) / duration);
          const eased = t * t * (3 - 2 * t);
          state.progress = start + (target - start) * eased;
          render();
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      };
      card.addEventListener('pointerenter', () => moveTo(1));
      card.addEventListener('pointerleave', () => moveTo(0));
      render();
    });
  }
  function initQloveIntroTransition() {
    const intro = document.querySelector('#qlove-intro-story');
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!intro) return;
    if (!gsap || !ScrollTrigger) {
      initQloveIntroFallback(intro);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const header = document.querySelector('header.hero-slider');
    const headerMotion = header ? header.querySelectorAll('.hero-nav, .slide.active .slide-text, .slide.active .slide-product, .slide.active .slide-info, .slide.active .slide-decorations, .slider-ui') : [];
    const inner = intro.querySelector('.qlove-intro-inner');
    const portal = intro.querySelector('.qlove-intro-portal');
    const product = intro.querySelector('.qlove-intro-product--front');
    const backProduct = intro.querySelector('.qlove-intro-product--back');
    const eyebrow = intro.querySelector('.qlove-intro-eyebrow');
    const lines = intro.querySelectorAll('.qlove-intro-line');
    const copy = intro.querySelector('.qlove-intro-copy');
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set([inner, portal, product, backProduct, eyebrow, ...lines, copy], { clearProps: 'all' });
    });
    media.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
      gsap.set(inner, { yPercent: 10 });
      gsap.set(product, { x: 175, y: 110, rotation: 8, scale: 0.78, autoAlpha: 0 });
      gsap.set(backProduct, { x: 130, y: 90, rotation: 6, scale: 0.8, autoAlpha: 0 });
      gsap.set(portal, { scale: 0.45, rotation: 5, autoAlpha: 0, transformOrigin: '50% 50%' });
      gsap.set(eyebrow, { y: 15, autoAlpha: 0 });
      gsap.set(lines, { yPercent: 110 });
      gsap.set(copy, { y: 24, autoAlpha: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: intro,
          start: 'top bottom',
          end: 'top top',
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
      if (headerMotion.length) timeline.to(headerMotion, { y: -58, autoAlpha: 0.3, ease: 'none', duration: 0.25 }, 0);
      timeline
        .to(inner, { yPercent: 0, ease: 'none', duration: 0.45 }, 0.2)
        .to(backProduct, { x: 0, y: 0, rotation: -3, scale: 1, autoAlpha: 1, ease: 'none', duration: 0.3 }, 0.18)
        .to(product, { x: 0, y: 0, rotation: -1, scale: 1, autoAlpha: 1, ease: 'none', duration: 0.28 }, 0.18)
        .to(portal, { scale: 1, rotation: -3, autoAlpha: 1, ease: 'none', duration: 0.32 }, 0.4)
        .to(eyebrow, { y: 0, autoAlpha: 1, ease: 'none', duration: 0.1 }, 0.65)
        .to(lines, { yPercent: 0, ease: 'none', stagger: 0.07, duration: 0.16 }, 0.7)
        .to(copy, { y: 0, autoAlpha: 1, ease: 'none', duration: 0.12 }, 0.88);

      const idle = gsap.to(product, {
        y: -5,
        rotation: 0.5,
        duration: 5.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        paused: true
      });
      ScrollTrigger.create({
        trigger: intro,
        start: 'top top',
        onEnter: () => idle.play(),
        onLeaveBack: () => idle.pause(0),
        onLeave: () => idle.pause(),
        onEnterBack: () => idle.play()
      });
    });
    media.add('(prefers-reduced-motion: no-preference) and (max-width: 767px)', () => {
      gsap.set([eyebrow, copy], { y: 18, autoAlpha: 0 });
      gsap.set(lines, { yPercent: 110 });
      gsap.set(product, { y: 46, rotation: 5, scale: 0.86, autoAlpha: 0 });
      gsap.set(backProduct, { y: 54, rotation: 4, scale: 0.86, autoAlpha: 0 });
      gsap.set(portal, { scale: 0.7, autoAlpha: 0 });
      gsap.timeline({
        scrollTrigger: { trigger: intro, start: 'top 82%', end: 'top 24%', scrub: 0.7 }
      })
        .to(portal, { scale: 1, autoAlpha: 1, ease: 'none', duration: 0.35 }, 0)
        .to(backProduct, { y: 0, rotation: -3, scale: 1, autoAlpha: 1, ease: 'none', duration: 0.45 }, 0.08)
        .to(product, { y: 0, rotation: 0, scale: 1, autoAlpha: 1, ease: 'none', duration: 0.45 }, 0.08)
        .to(eyebrow, { y: 0, autoAlpha: 1, ease: 'none', duration: 0.12 }, 0.35)
        .to(lines, { yPercent: 0, stagger: 0.07, ease: 'none', duration: 0.18 }, 0.44)
        .to(copy, { y: 0, autoAlpha: 1, ease: 'none', duration: 0.14 }, 0.78);
    });
  }
  function initQloveIntroFallback(intro) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const header = document.querySelector('header.hero-slider');
    const headerMotion = header ? header.querySelectorAll('.hero-nav, .slide.active .slide-text, .slide.active .slide-product, .slide.active .slide-info, .slide.active .slide-decorations, .slider-ui') : [];
    const inner = intro.querySelector('.qlove-intro-inner');
    const portal = intro.querySelector('.qlove-intro-portal');
    const product = intro.querySelector('.qlove-intro-product--front');
    const backProduct = intro.querySelector('.qlove-intro-product--back');
    const eyebrow = intro.querySelector('.qlove-intro-eyebrow');
    const lines = [...intro.querySelectorAll('.qlove-intro-line')];
    const copy = intro.querySelector('.qlove-intro-copy');
    let pending = false;
    const render = () => {
      pending = false;
      const rect = intro.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / innerHeight));
      const smooth = value => Math.max(0, Math.min(1, value));
      const productProgress = smooth((progress - .18) / .28);
      const portalProgress = smooth((progress - .4) / .32);
      headerMotion.forEach(element => { element.style.transform = `translate3d(0,${-58 * smooth(progress / .25)}px,0)`; element.style.opacity = String(1 - .7 * smooth(progress / .25)); });
      inner.style.transform = `translate3d(0,${10 * (1 - smooth(progress / .45))}%,0)`;
      portal.style.transform = `scale(${.45 + .55 * portalProgress}) rotate(${5 - 8 * portalProgress}deg)`;
      portal.style.opacity = String(portalProgress);
      product.style.transform = `translate(-50%,-50%) translate3d(${175 * (1 - productProgress)}px,${110 * (1 - productProgress)}px,0) rotate(${8 - 9 * productProgress}deg) scale(${.78 + .22 * productProgress})`;
      product.style.opacity = String(productProgress);
      backProduct.style.transform = `translate(-50%,-50%) translate3d(${130 * (1 - productProgress)}px,${90 * (1 - productProgress)}px,0) rotate(${6 - 9 * productProgress}deg) scale(${.8 + .2 * productProgress})`;
      backProduct.style.opacity = String(productProgress);
      eyebrow.style.transform = `translate3d(0,${15 * (1 - smooth((progress - .65) / .1))}px,0)`;
      eyebrow.style.opacity = String(smooth((progress - .65) / .1));
      lines.forEach((line, index) => { const lineProgress = smooth((progress - (.7 + index * .07)) / .16); line.style.transform = `translate3d(0,${110 * (1 - lineProgress)}%,0)`; });
      copy.style.transform = `translate3d(0,${24 * (1 - smooth((progress - .88) / .12))}px,0)`;
      copy.style.opacity = String(smooth((progress - .88) / .12));
    };
    addEventListener('scroll', () => { if (!pending) { pending = true; requestAnimationFrame(render); } }, { passive: true });
    addEventListener('resize', render, { passive: true });
    render();
  }
  function initStory(scenes) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const story = root.querySelector('.qlove-story'); if (!story || reduce) return;
    const sticky = story.querySelector('.qlove-story__sticky'), pack = story.querySelector('.qlove-story__pack'), a = story.querySelector('.qlove-story__support--a'), b = story.querySelector('.qlove-story__support--b'), word = story.querySelector('.qlove-story__word'), copy = story.querySelector('.qlove-story__copy'), circle = story.querySelector('.qlove-story__circle'), progress = story.querySelector('.qlove-story__progress i'), counter = story.querySelector('.qlove-story__counter');
    const sceneCount = scenes.length;
    const preloads = [...new Set(scenes.flatMap(scene => [scene.p, scene.supportA, scene.supportB]).map(image))].map(src => {
      const img = new Image();
      img.src = src;
      return img;
    });
    let sceneIndex = -1, ticking = false;
    const paint = index => {
      const s = scenes[index];
      sticky.style.setProperty('--story-bg', s.colour);
      sticky.style.setProperty('--story-accent', s.accent);
      sticky.style.setProperty('--story-ink', s.ink);
      pack.src = image(s.p);
      pack.alt = s.p.name;
      a.src = image(s.supportA);
      b.src = image(s.supportB);
      word.textContent = s.title.split(' ')[0];
      copy.innerHTML = `<p>0${index + 1} / 04</p><h2>${s.title}</h2><span>${s.copy}</span>`;
      counter.textContent = `0${index + 1} — 04`;
      progress.style.width = `${(index + 1) * 25}%`;
      circle.animate([{ transform: 'translate(-50%,-50%) scale(0)' }, { transform: 'translate(-50%,-50%) scale(6)' }], { duration: 520, easing: 'cubic-bezier(.4,0,.2,1)' });
    };
    const update = () => {
      ticking = false;
      const rect = story.getBoundingClientRect();
      const range = Math.max(1, story.offsetHeight - innerHeight);
      const p = Math.min(1, Math.max(0, -rect.top / range));
      const index = Math.min(sceneCount - 1, Math.floor(p * sceneCount));
      if (index !== sceneIndex) { sceneIndex = index; paint(index); }
      const local = Math.min(1, p * sceneCount - index);
      const enter = Math.min(1, local / .12);
      pack.style.transform = `translateY(${18 * (1 - enter) - 15 * local}px) scale(${.82 + .18 * enter}) rotate(${(local - .5) * 2}deg)`;
      word.style.transform = `translateX(${local * 2 - 1}%)`;
      a.style.transform = `translateY(${local * 10}px) rotate(${-9 + local * 2}deg)`;
      b.style.transform = `translateY(${-local * 10}px) rotate(${9 - local * 2}deg)`;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener('resize', update, { passive: true });
    paint(0);
    update();
    Promise.all(preloads.map(img => img.decode().catch(() => {}))).then(() => {
      update();
      window.ScrollTrigger?.refresh();
    });
  }
  function initReveals() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.animate(
        [{ opacity: 0, transform: 'translateY(28px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 480, delay: (Number(entry.target.dataset.i) || 0) * 55, fill: 'both', easing: 'cubic-bezier(.2,.8,.2,1)' }
      );
      observer.unobserve(entry.target);
    }), { threshold: .15 });
    root.querySelectorAll('.qlove-card').forEach((card, index) => {
      // Preserve the shared-card reveal rhythm after removing the former four-card Dorayaki grid.
      card.dataset.i = (index + 14) % 8;
      observer.observe(card);
    });
  }
})();
