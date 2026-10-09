import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const assetFolder = join(root, 'assets', 'qlove', 'mini-mochi-scenes');
const output = join(root, 'demos', 'standalone', 'qlove-mini-and-extra-to-love-standalone.html');

const flavours = {
  mini: [
    ['MANGO', 'TROPICAL MANGO 80G', '#fbd273', '#35251b'],
    ['MATCHA LATTE', 'MATCHA LATTE 80G', '#b7d1a1', '#264432'],
    ['INTENSE CHOCOLATE', 'INTENSE CHOCOLATE 80G', '#805548', '#fff8ee'],
    ['SAKURA STRAWBERRY', 'SAKURA STRAWBERRY 80G', '#f3abc4', '#572938'],
    ['WILD BLUEBERRY', 'WILD BLUEBERRY 80G', '#8f9bd4', '#202d5d'],
    ['EXOTIC LYCHEE', 'EXOTIC LYCHEE 80G', '#f8cbd1', '#673d49'],
    ['PEANUT BUTTER', 'PEANUT BUTTER 80G', '#d9bd91', '#513a26'],
    ['VELVET TARO', 'VELVET TARO 80G', '#c8b6df', '#433057']
  ],
  extra: [
    ['PEACH CUSTARD', 'PEACH CUSTARD  80G', '#f8d5c4', '#6a3434'],
    ['CHOCO MINT COOKIE', 'CHOCO MINT COOKIE  80G', '#cce7d7', '#28584d'],
    ['TROPICAL PASSION', 'TROPICAL PASSION  80G', '#d9c4e5', '#594069'],
    ['EXOTIC COCONUT', 'EXOTIC COCONUT 80G', '#bce4e3', '#245a60'],
    ['GOLDEN FRUIT', 'GOLDEN FRUIT 80G', '#f8d47a', '#71431d']
  ]
};

const embedded = {};
Object.values(flavours).flat().forEach(([, file]) => {
  [1, 2].forEach(variant => {
    const filename = `${file}${variant}.png`;
    embedded[filename] = `data:image/png;base64,${readFileSync(join(assetFolder, filename)).toString('base64')}`;
  });
});

const html = String.raw`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="QLove Mini Mochi and Extra To Love product showcase.">
  <title>QLove — Mini Mochi & Extra To Love</title>
  <style>
    :root { --ink:#211d1a; --paper:#faf8f4; --border:rgba(33,29,26,.14); font-family: Poppins, Arial, sans-serif; color:var(--ink); background:var(--paper); }
    * { box-sizing:border-box; }
    body { margin:0; overflow-x:hidden; }
    .showcase { position:relative; padding:clamp(38px,4vw,64px) 6vw clamp(52px,5vw,76px); background:linear-gradient(rgba(255,255,255,.70),rgba(255,255,255,.70)), radial-gradient(circle at 75% 32%,rgba(255,214,196,.40),transparent 31%), #f8f7f4; isolation:isolate; }
    .showcase + .showcase { padding-top:clamp(44px,5vw,74px); background:linear-gradient(rgba(255,255,255,.72),rgba(255,255,255,.72)), radial-gradient(circle at 22% 65%,rgba(218,198,234,.35),transparent 34%), #faf8f5; }
    .heading { margin:0 auto clamp(20px,2.2vw,30px); max-width:1440px; }
    .heading__row { display:flex; align-items:baseline; flex-wrap:wrap; column-gap:clamp(18px,2.5vw,38px); row-gap:6px; }
    h1 { margin:0; font-size:clamp(3rem,5.3vw,5.9rem); font-weight:900; line-height:.91; letter-spacing:-.085em; }
    .kicker { margin:0; font-size:clamp(.72rem,1vw,.95rem); font-weight:800; letter-spacing:.14em; text-transform:uppercase; }
    .heading > p:last-child { margin:10px 0 0; color:#746d66; font-size:clamp(.92rem,1.15vw,1.08rem); }
    .carousel { position:relative; max-width:1440px; margin:0 auto; }
    .viewport { overflow-x:auto; overflow-y:hidden; scroll-snap-type:x mandatory; scrollbar-width:none; -webkit-overflow-scrolling:touch; outline:none; }
    .viewport::-webkit-scrollbar { display:none; }
    .viewport:focus-visible { outline:3px solid #805d93; outline-offset:5px; }
    .track { display:flex; gap:18px; }
    .panel { position:relative; flex:0 0 calc(33.333333% - 12px); min-width:0; aspect-ratio:.84; overflow:hidden; border-radius:20px; background:var(--card-bg); color:var(--card-ink); box-shadow:0 14px 34px rgba(40,24,36,.11); scroll-snap-align:start; isolation:isolate; cursor:pointer; }
    .media, .photo, .reveal { position:absolute; inset:0; }
    .media { overflow:hidden; pointer-events:none; }
    .photo { display:block; width:100%; height:100%; max-width:none; object-fit:cover; object-position:center; }
    .reveal { z-index:2; opacity:0; }
    .panel__title { position:absolute; z-index:3; top:6%; right:7%; left:7%; margin:0; font-size:clamp(1.55rem,3vw,4.35rem); font-weight:900; line-height:.95; letter-spacing:-.075em; }
    .panel__number { position:absolute; z-index:3; right:7%; bottom:6%; margin:0; font-size:.68rem; font-weight:900; letter-spacing:.14em; opacity:.72; }
    .arrow { position:absolute; z-index:5; top:50%; display:grid; place-items:center; width:48px; height:48px; padding:0; border:1px solid #d7ced1; border-radius:50%; background:#fff; color:#281c20; font:600 1.4rem/1 Arial,sans-serif; cursor:pointer; transform:translateY(-50%); box-shadow:0 7px 18px rgba(33,29,26,.10); transition:transform .25s ease,background .25s ease,opacity .25s ease; }
    .arrow--previous { left:clamp(10px,2vw,20px); }
    .arrow--next { right:clamp(10px,2vw,20px); }
    .arrow:not(:disabled):hover { background:#fce7ee; transform:translateY(calc(-50% - 2px)); }
    .arrow:disabled { cursor:default; opacity:.38; }
    .arrow:focus-visible { outline:3px solid #805d93; outline-offset:3px; }
    .status { display:flex; align-items:center; justify-content:center; gap:14px; margin:20px 0 0; font-size:.74rem; font-weight:800; letter-spacing:.12em; }
    .status i { display:block; width:96px; height:2px; overflow:hidden; background:#ddd6d2; }
    .status i::after { display:block; width:var(--progress,0%); height:100%; background:var(--ink); content:""; transition:width .35s ease; }
    @media (max-width:1100px) { .panel { flex-basis:calc(50% - 9px); } }
    @media (max-width:680px) { .showcase { padding:38px 6vw 52px; } .panel { flex-basis:100%; aspect-ratio:.9; } .track { gap:14px; } h1 { font-size:clamp(2.7rem,11vw,3.55rem); } .panel__title { font-size:clamp(2rem,9vw,3.3rem); } .arrow { width:44px; height:44px; } }
    @media (prefers-reduced-motion:reduce) { *,*::before,*::after { scroll-behavior:auto !important; transition-duration:.01ms !important; animation-duration:.01ms !important; } }
  </style>
</head>
<body>
  <main id="app"></main>
  <script>
    const assets = __ASSET_PAYLOAD__;
    const series = __SERIES_PAYLOAD__;
    const app = document.querySelector('#app');
    const label = value => value.replace(/ 80G$/, '').replace(/  /g, ' ');
    const panelMarkup = (item, index, sectionId) => {
      const maskId = sectionId + '-reveal-' + index;
      const origins = [[[.48,.68],[.22,.45],[.77,.29]], [[.53,.66],[.25,.50],[.73,.31]], [[.45,.70],[.29,.40],[.79,.35]]][index % 3];
      const one = assets[item.file + '1.png'];
      const two = assets[item.file + '2.png'];
      return '<article class="panel" style="--card-bg:' + item.bg + ';--card-ink:' + item.ink + '" aria-label="' + item.title + ' QLove Mini Mochi">'
        + '<div class="media"><img class="photo" src="' + one + '" alt="' + item.title + ' QLove Mini Mochi product pack" width="1024" height="1536">'
        + '<span class="reveal"><img class="photo" src="' + two + '" alt="" aria-hidden="true" width="1024" height="1536"></span>'
        + '<svg aria-hidden="true" focusable="false" width="0" height="0"><defs><filter id="' + maskId + '-soft" x="-15%" y="-15%" width="130%" height="130%"><feGaussianBlur stdDeviation=".01"/></filter><mask id="' + maskId + '" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox" style="mask-type:alpha"><g filter="url(#' + maskId + '-soft)">' + origins.map(([x,y]) => '<circle class="reveal-spot" cx="' + x + '" cy="' + y + '" r="0" fill="white"/>').join('') + '</g></mask></defs></svg></div>'
        + '<h2 class="panel__title">' + item.title + '</h2><p class="panel__number">' + String(index + 1).padStart(2,'0') + '</p></article>';
    };
    const showcaseMarkup = (item, serial) => '<section class="showcase" id="' + item.id + '"><header class="heading"><div class="heading__row"><h1>' + item.name + '</h1><p class="kicker">' + item.kicker + '</p></div><p>' + item.copy + '</p></header><div class="carousel"><button class="arrow arrow--previous" type="button" aria-label="Previous flavour">←</button><div class="viewport" role="region" aria-label="' + item.name + ' flavours" tabindex="0"><div class="track">' + item.items.map((flavour,index) => panelMarkup(flavour,index,item.id)).join('') + '</div></div><button class="arrow arrow--next" type="button" aria-label="Next flavour">→</button></div><div class="status"><span>01 / ' + String(item.items.length).padStart(2,'0') + '</span><i></i></div></section>';
    app.innerHTML = series.map(showcaseMarkup).join('');

    document.querySelectorAll('.showcase').forEach(section => {
      const viewport = section.querySelector('.viewport'); const panels = [...section.querySelectorAll('.panel')];
      const previous = section.querySelector('.arrow--previous'); const next = section.querySelector('.arrow--next');
      const counter = section.querySelector('.status span'); const progress = section.querySelector('.status i');
      const reduce = matchMedia('(prefers-reduced-motion: reduce)'); let index = 0; let ticking = false;
      const visible = () => innerWidth <= 680 ? 1 : innerWidth <= 1100 ? 2 : 3;
      const maxIndex = () => Math.max(0, panels.length - visible());
      const step = () => panels[1] ? panels[1].offsetLeft - panels[0].offsetLeft : viewport.clientWidth;
      const update = () => { index = Math.max(0, Math.min(maxIndex(), index)); previous.disabled = index === 0; next.disabled = index === maxIndex(); counter.textContent = String(Math.min(index + 1, panels.length)).padStart(2,'0') + ' / ' + String(panels.length).padStart(2,'0'); progress.style.setProperty('--progress', ((index + 1) / Math.max(1, maxIndex() + 1) * 100) + '%'); };
      const goTo = (target, smooth = true) => { index = Math.max(0, Math.min(maxIndex(), target)); viewport.scrollTo({left:index * step(),behavior:smooth && !reduce.matches ? 'smooth' : 'auto'}); update(); };
      previous.addEventListener('click', () => goTo(index - 1)); next.addEventListener('click', () => goTo(index + 1));
      viewport.addEventListener('keydown', event => { if (!['ArrowLeft','ArrowRight'].includes(event.key)) return; event.preventDefault(); goTo(index + (event.key === 'ArrowRight' ? 1 : -1)); });
      viewport.addEventListener('scroll', () => { if (ticking) return; ticking = true; requestAnimationFrame(() => { index = Math.round(viewport.scrollLeft / step()); update(); ticking = false; }); }, {passive:true});
      addEventListener('resize', () => goTo(index,false), {passive:true}); update();
    });

    if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
    const clamp = value => Math.min(1, Math.max(0, value));
    const ease = value => { const t = clamp(value); return t * t * (3 - 2 * t); };
    document.querySelectorAll('.panel').forEach(panel => {
      const reveal = panel.querySelector('.reveal'); const mask = panel.querySelector('mask'); const spots = [...panel.querySelectorAll('.reveal-spot')];
      const state = { time:0 }; let raf; const revealDuration = 1500; const hideDuration = 1250;
      const render = () => { const reference = 'url(#' + mask.id + ')'; reveal.style.maskImage = reference; reveal.style.webkitMaskImage = reference; reveal.style.opacity = '1'; spots.forEach((spot,index) => { const delay = [55,165,275][index]; spot.setAttribute('r', String(1.18 * ease((state.time - delay) / (revealDuration - delay)))); }); };
      const move = active => { cancelAnimationFrame(raf); const start = state.time; const target = active ? revealDuration : 0; const duration = (active ? revealDuration : hideDuration) * Math.abs(target - start) / revealDuration; if (!duration) return; const began = performance.now(); const frame = now => { const t = clamp((now - began) / duration); state.time = start + (target - start) * t; render(); if (t < 1) raf = requestAnimationFrame(frame); }; raf = requestAnimationFrame(frame); };
      panel.addEventListener('pointerenter', () => move(true)); panel.addEventListener('pointerleave', () => move(false)); render();
    });
    }
  </script>
</body>
</html>`;

writeFileSync(output, html
  .replace('__ASSET_PAYLOAD__', JSON.stringify(embedded))
  .replace('__SERIES_PAYLOAD__', JSON.stringify([
    { id: 'mini-mochi', name: 'MINI MOCHI', kicker: 'MINI 80G', copy: 'Pick a flavour. Keep it playful.', items: flavours.mini.map(([title, file, bg, ink]) => ({ title, file, bg, ink })) },
    { id: 'extra-to-love', name: 'EXTRA TO LOVE', kicker: 'PREMIUM FILLING MINI', copy: 'Five playful mini flavours, each with a little extra inside.', items: flavours.extra.map(([title, file, bg, ink]) => ({ title, file, bg, ink })) }
  ])));

console.log(`Created ${output}`);
