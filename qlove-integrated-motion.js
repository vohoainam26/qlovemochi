(() => {
  const root = document.querySelector('#qlove-main');
  if (!root) return;

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const lerp = (a, b, amount) => a + (b - a) * amount;
  const smooth = value => value * value * (3 - 2 * value);
  const phase = (progress, from, to) => clamp((progress - from) / (to - from));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', e => {
    mouseX = (e.clientX / innerWidth - 0.5) * 2;
    mouseY = (e.clientY / innerHeight - 0.5) * 2;
  });

  const initialize = () => {
    const nodes = [...root.querySelectorAll('.qlove-motion-chapter')];
    if (!nodes.length || nodes.some(node => node.dataset.motionReady === 'true')) return false;

    const chapters = nodes.map(section => {
      section.dataset.motionReady = 'true';
      const products = [...section.querySelectorAll('.qlove-motion-product')];
      const panel = section.querySelector('.qlove-motion-panel');
      const overlay = section.querySelector('.qlove-motion-overlay');
      const bubbles = section.querySelector('.qlove-motion-flavour-bubbles');
      const head = section.querySelector('.qlove-motion-chapter__head');
      const closeButtons = [
        section.querySelector('.qlove-motion-panel__x'),
        section.querySelector('.qlove-motion-panel__close')
      ].filter(Boolean);
      let active = -1;
      let returnFocus = null;

      const renderPanel = index => {
        const product = products[index];
        if (!product) return;
        const tags = (product.dataset.tags || '').split('|').filter(Boolean);
        panel.querySelector('.qlove-motion-panel__count').textContent =
          `${String(index + 1).padStart(2, '0')} / ${String(products.length).padStart(2, '0')}`;
        panel.querySelector('h3').textContent = product.dataset.name || '';
        panel.querySelector('p').textContent = product.dataset.description || '';
        panel.querySelector('.qlove-motion-panel__tags').innerHTML =
          tags.map(tag => `<span>${tag}</span>`).join('');
        panel.style.setProperty('--panel-accent', product.dataset.accent || '#211d1a');
        bubbles.innerHTML = tags.slice(1, 4).map((tag, bubbleIndex) => {
          const offsets = [[-170, -94], [-35, -150], [92, -84]];
          const [x, y] = offsets[bubbleIndex];
          return `<span style="--bubble-x:${x}px;--bubble-y:${y}px">${tag}</span>`;
        }).join('');
      };

      const open = index => {
        active = index;
        returnFocus = products[index];
        renderPanel(index);
        section.classList.add('is-focused');
        panel.classList.add('is-open');
        panel.setAttribute('aria-hidden', 'false');
        overlay.tabIndex = 0;
        products.forEach((product, productIndex) => {
          product.classList.toggle('is-selected', productIndex === active);
          product.classList.toggle('is-dim', productIndex !== active);
          product.setAttribute('aria-pressed', String(productIndex === active));
        });
        requestAnimationFrame(() => panel.querySelector('.qlove-motion-panel__x')?.focus({ preventScroll: true }));
      };

      const close = (restore = true) => {
        active = -1;
        section.classList.remove('is-focused');
        panel.classList.remove('is-open');
        panel.setAttribute('aria-hidden', 'true');
        overlay.tabIndex = -1;
        bubbles.innerHTML = '';
        products.forEach(product => {
          product.classList.remove('is-selected', 'is-dim');
          product.setAttribute('aria-pressed', 'false');
        });
        if (restore) returnFocus?.focus({ preventScroll: true });
      };

      products.forEach((product, index) => product.addEventListener('click', () => open(index)));
      closeButtons.forEach(button => button.addEventListener('click', () => close()));
      overlay.addEventListener('click', () => close());
      panel.querySelector('.qlove-motion-panel__next')?.addEventListener('click', () => open((active + 1) % products.length));

      panel.addEventListener('keydown', event => {
        if (event.key === 'Tab') {
          const focusable = [...panel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')];
          if (!focusable.length) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      });

      return {
        section,
        products,
        panel,
        overlay,
        bubbles,
        head,
        motion: section.dataset.motion,
        entry: section.dataset.entry,
        exit: section.dataset.exit,
        get active() { return active; },
        open,
        close
      };
    });

    const place = (element, x, y, scale, rotate = 0, z = 0, opacity = 1, tiltX = 0, tiltY = 0) => {
      element.style.transform =
        `translate(-50%,-50%) translate3d(${x}px,${y}px,${z}px) scale(${scale}) rotate(${rotate}deg) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      element.style.opacity = String(opacity);
      element.style.zIndex = String(Math.round(20 + z));
    };

    const updateDoors = (layer, amount, entering) => {
      if (!layer) return;
      const left = layer.querySelector('.qlove-motion-door--left');
      const right = layer.querySelector('.qlove-motion-door--right');
      if (!left || !right) return;
      const travel = entering ? amount : 1 - amount;
      left.style.transform = `translateX(${-travel * 101}%)`;
      right.style.transform = `translateX(${travel * 101}%)`;
      layer.style.opacity = String(entering ? 1 - amount : amount);
    };

    const updateCream = (layer, amount, entering, viewportWidth) => {
      if (!layer) return;
      const progress = entering ? 1 - amount : amount;
      const pool = layer.querySelector('.qlove-motion-cream-pool');
      const wave = layer.querySelector('.qlove-motion-cream-wave');
      const positions = [[-180,-55],[0,-70],[180,-55],[-180,92],[0,110],[180,92]];
      layer.querySelectorAll('.qlove-motion-cream-core').forEach((core, index) => {
        const [originX, originY] = positions[index % positions.length];
        const merge = smooth(clamp((progress - .3) / .55));
        const x = lerp(originX, 0, merge);
        const y = lerp(originY, 22, merge);
        core.style.opacity = String(progress * (1 - phase(progress, .78, 1)));
        core.style.transform = `translate(-50%,-50%) translate(${x}px,${y}px) scale(${phase(progress, .05, .45)})`;
      });
      layer.querySelectorAll('.qlove-motion-cream-ribbon').forEach((ribbon, index) => {
        const [originX, originY] = positions[index % positions.length];
        const distance = Math.hypot(originX, originY);
        const angle = Math.atan2(-originY, -originX) * 180 / Math.PI;
        const ribbonProgress = smooth(phase(progress, .2, .68));
        ribbon.style.left = `calc(50% + ${originX}px)`;
        ribbon.style.top = `calc(58% + ${originY}px)`;
        ribbon.style.width = `${distance}px`;
        ribbon.style.opacity = String(ribbonProgress * (1 - phase(progress, .82, 1)));
        ribbon.style.transform = `rotate(${angle}deg) scaleX(${ribbonProgress})`;
      });
      if (pool) {
        const grow = smooth(phase(progress, .38, 1));
        const size = Math.min(viewportWidth * .46, 620) * grow;
        pool.style.width = pool.style.height = `${size}px`;
        pool.style.opacity = String(grow);
      }
      if (wave) {
        const waveProgress = smooth(phase(progress, .55, 1));
        wave.style.opacity = String(waveProgress);
        wave.style.transform = `translate(-50%,0) scaleY(${.2 + waveProgress * .85})`;
      }
      layer.style.opacity = String(entering ? 1 - amount : amount);
    };

    const updatePearls = (layer, amount, entering, time) => {
      if (!layer) return;
      const progress = entering ? 1 - amount : amount;
      layer.querySelectorAll('.qlove-motion-pearl').forEach((pearl, index) => {
        const baseX = (index * 37) % 92 + 4;
        const baseY = (index * 53) % 82 + 8;
        const direction = index % 2 ? 1 : -1;
        const x = Math.sin(time * .7 + index) * 24 + direction * progress * 30;
        const y = (entering ? -progress : progress) * innerHeight * .55 + Math.cos(time * .55 + index) * 22;
        pearl.style.left = `${baseX}%`;
        pearl.style.top = `${baseY}%`;
        pearl.style.width = pearl.style.height = `${14 + (index % 5) * 5}px`;
        pearl.style.opacity = String(.16 + progress * .62);
        pearl.style.transform = `translate(${x}px,${y}px) scale(${.72 + progress * .55})`;
      });
      layer.style.opacity = String(entering ? 1 - amount : amount);
    };

    const updateBands = (layer, amount, entering) => {
      if (!layer) return;
      const progress = entering ? 1 - amount : amount;
      layer.querySelectorAll('.qlove-motion-band').forEach((band, index) => {
        const direction = index % 2 ? -1 : 1;
        band.style.transform = `rotate(-8deg) translateX(${direction * (progress - .5) * 320}px) scaleY(${.65 + progress * .7})`;
      });
      layer.style.opacity = String(entering ? 1 - amount : amount);
    };

    const updateGreenWash = (layer, amount, entering) => {
      if (!layer) return;
      const progress = entering ? 1 - amount : amount;
      const wash = layer.querySelector('.qlove-motion-green-wash');
      const gold = layer.querySelector('.qlove-motion-gold-line');
      if (wash) wash.style.opacity = String(progress);
      if (gold) gold.style.width = `${progress * 88}vw`;
      layer.style.opacity = String(entering ? 1 - amount : amount);
    };

    let raf = 0;
    const render = timeStamp => {
      const time = timeStamp * .001;
      const viewportWidth = innerWidth;
      const viewportHeight = innerHeight;
      const mobile = viewportWidth < 700;
      const lowHeight = viewportHeight <= 800 && !mobile;

      chapters.forEach(chapter => {
        const rect = chapter.section.getBoundingClientRect();
        if (rect.bottom < -viewportHeight || rect.top > viewportHeight * 2) return;
        const range = Math.max(1, chapter.section.offsetHeight - viewportHeight);
        const progress = reduce.matches ? .5 : clamp(-rect.top / range);
        const intro = smooth(phase(progress, 0, .2));
        const mid = smooth(phase(progress, .18, .74));
        const outro = smooth(phase(progress, .72, 1));
        const motionTime = reduce.matches ? 0 : time;
        chapter.section.style.setProperty('--chapter-progress', progress.toFixed(4));

        const entryLayer = chapter.section.querySelector('.qlove-motion-transition--entry');
        const exitLayer = chapter.section.querySelector('.qlove-motion-transition--exit');
        if (chapter.entry === 'doors') updateDoors(entryLayer, intro, true);
        if (chapter.entry === 'cream') updateCream(entryLayer, intro, true, viewportWidth);
        if (chapter.entry === 'pearls') updatePearls(entryLayer, intro, true, motionTime);
        if (chapter.entry === 'bands') updateBands(entryLayer, intro, true);
        if (chapter.entry === 'greenwash') updateGreenWash(entryLayer, intro, true);
        if (chapter.exit === 'doors') updateDoors(exitLayer, outro, false);
        if (chapter.exit === 'cream') updateCream(exitLayer, outro, false, viewportWidth);
        if (chapter.exit === 'pearls') updatePearls(exitLayer, outro, false, motionTime);
        if (chapter.exit === 'bands') updateBands(exitLayer, outro, false);
        if (chapter.exit === 'greenwash') updateGreenWash(exitLayer, outro, false);

        const active = chapter.active;
        const products = chapter.products;
        const selectedX = mobile ? 0 : -Math.min(viewportWidth * .17, 240);

        if (chapter.motion === 'mix') {
          products.forEach((product, index) => {
            if (active >= 0) {
              if (index === active) place(product, selectedX, mobile ? -4 : -18, mobile ? 1.45 : 1.68, 0, 46, 1, -mouseY * 12, mouseX * 12);
              else place(product, mobile ? 98 : 205, 82, mobile ? .68 : .76, 7, -20, .22);
              return;
            }
            const side = index === 0 ? -1 : 1;
            const spread = (mobile ? 54 : 70) + mid * Math.min(viewportWidth * .15, 195);
            const baseScale = mobile ? 1.25 : 1.42;
            place(product, side * spread, (mobile ? 4 : -12) + (index ? 18 : -10), baseScale - outro * .12, side * (2 + outro * 7), index ? 8 : 10, 1 - outro * .16);
          });
        }

        if (chapter.motion === 'double') {
          const radiusX = mobile ? 102 : Math.min(viewportWidth * (.15 + mid * .048), 300);
          const radiusY = mobile ? 92 : Math.min(viewportHeight * .125, 132);
          products.forEach((product, index) => {
            const label = product.querySelector('.qlove-motion-product__label');
            if (active >= 0) {
              if (label) label.style.opacity = index === active ? '1' : '.28';
              if (index === active) place(product, selectedX, mobile ? -2 : -16, mobile ? 1.35 : 1.52, 0, 48, 1, -mouseY * 12, mouseX * 12);
              else {
                const col = index % 3 - 1;
                place(product, col * (mobile ? 68 : 108) + (mobile ? 0 : -125), (index < 3 ? -1 : 1) * 96 + 30, mobile ? .62 : .7, (index - active) * 2, -18, .22);
              }
              return;
            }
            const angle = index * Math.PI * 2 / products.length + mid * 1.18 + motionTime * .055;
            let x = Math.cos(angle) * radiusX;
            let y = Math.sin(angle) * radiusY + (lowHeight ? 30 : 34);
            const depth = (Math.sin(angle) + 1) / 2;
            if (label) label.style.opacity = String(.08 + smooth(phase(depth, .28, .72)) * .92);
            let scale = (mobile ? .7 : .76) + depth * (mobile ? .38 : .49);
            let rotate = Math.cos(angle) * 3;
            if (outro > 0) {
              const settleX = (index % 3 - 1) * (mobile ? 82 : 145);
              const settleY = (index < 3 ? -1 : 1) * (mobile ? 57 : 66) + 30;
              const settle = smooth(phase(outro, 0, .45));
              x = lerp(x, settleX, settle);
              y = lerp(y, settleY, settle);
              scale = lerp(scale, mobile ? .6 : .64, settle);
              const merge = smooth(phase(outro, .4, 1));
              x = lerp(x, 0, merge);
              y = lerp(y, 32, merge);
              scale = lerp(scale, .2, merge);
            }
            place(product, x, y, scale, rotate, Math.round(scale * 20), 1 - outro * .88);
          });
        }

        if (chapter.motion === 'custard') {
          const lens = chapter.section.querySelector('.qlove-motion-lens');
          const targets = mobile ? [[-82,68],[0,-48],[82,68]] : [[-204,64],[0,-58],[204,64]];
          const lensIndex = active >= 0 ? active : Math.min(2, Math.floor(mid * 3));
          products.forEach((product, index) => {
            if (active >= 0) {
              if (index === active) place(product, selectedX, mobile ? -2 : -16, mobile ? 1.4 : 1.55, 0, 45, 1, -mouseY * 12, mouseX * 12);
              else place(product, (index < active ? -1 : 1) * (mobile ? 86 : 165) + (mobile ? 0 : -115), 88, mobile ? .68 : .76, (index - active) * 4, -12, .22);
              return;
            }
            const [targetX, targetY] = targets[index];
            const rise = intro;
            const settledScale = mobile ? (index === 1 ? 1.16 : .94) : (index === 1 ? 1.33 : 1.04);
            place(product, lerp(0, targetX, rise), lerp(210, targetY, rise), lerp(.52, settledScale, rise), (index - 1) * 3, index === 1 ? 20 : 8, rise * (1 - outro * .25));
          });
          if (lens) {
            const target = targets[lensIndex];
            lens.style.left = `calc(50% + ${target[0]}px)`;
            lens.style.top = `calc(58% + ${target[1]}px)`;
            lens.style.width = lens.style.height = active >= 0 ? (mobile ? '48vw' : '31vw') : (mobile ? '34vw' : '18vw');
            lens.style.setProperty('--lens-accent', products[lensIndex]?.dataset.accent || '#d95c7c');
            lens.style.opacity = String(.16 + intro * .14);
          }
        }

        if (chapter.motion === 'boba') {
          const field = chapter.section.querySelector('.qlove-motion-chapter__scene > .qlove-motion-pearl-field');
          field?.querySelectorAll('.qlove-motion-pearl').forEach((pearl, index) => {
            const x = (index * 37) % 92 + 4;
            const y = (index * 53) % 80 + 10;
            pearl.style.left = `${x}%`;
            pearl.style.top = `${y}%`;
            pearl.style.width = pearl.style.height = `${13 + (index % 5) * 5}px`;
            pearl.style.opacity = String(active >= 0 ? .25 : .12 + mid * .22);
            if (active >= 0) {
              const angle = index * Math.PI * 2 / 18 + motionTime * .35;
              pearl.style.left = '43%';
              pearl.style.top = '58%';
              pearl.style.transform = `translate(${Math.cos(angle) * (90 + index % 3 * 16)}px,${Math.sin(angle) * (62 + index % 4 * 10)}px)`;
            } else {
              const pX = mouseX * (10 + (index % 5) * 6);
              const pY = mouseY * (10 + (index % 5) * 6);
              pearl.style.transform = `translate(${Math.sin(motionTime * .6 + index) * 18 + pX}px,${Math.cos(motionTime * .48 + index) * 28 + outro * 32 + pY}px)`;
            }
          });
          products.forEach((product, index) => {
            if (active >= 0) {
              if (index === active) place(product, selectedX, mobile ? -2 : -16, mobile ? 1.42 : 1.58, 0, 46, 1, -mouseY * 12, mouseX * 12);
              else place(product, (index < active ? -1 : 1) * (mobile ? 88 : 162) + (mobile ? 0 : -110), 86, mobile ? .7 : .78, (index - active) * 5, -15, .22);
              return;
            }
            const x = (index - 1) * (mobile ? 92 : Math.min(viewportWidth * .18, 270));
            const y = (index === 1 ? -24 : 20) + Math.sin(motionTime * .7 + index) * (reduce.matches ? 0 : 8) - outro * 14;
            const scale = mobile ? (index === 1 ? 1.18 : .98) : (index === 1 ? 1.34 : 1.08);
            place(product, x, y, scale, Math.sin(motionTime * .42 + index) * (reduce.matches ? 0 : 3), index === 1 ? 18 : 8, 1);
          });
        }

        if (chapter.motion === 'pouch') {
          const shelfA = chapter.section.querySelector('.qlove-motion-shelf--a');
          const shelfB = chapter.section.querySelector('.qlove-motion-shelf--b');
          const drift = (mid - .5) * (mobile ? 54 : 150);
          if (shelfA) shelfA.style.transform = `rotate(-8deg) translateX(${drift}px)`;
          if (shelfB) shelfB.style.transform = `rotate(-8deg) translateX(${-drift}px)`;
          products.forEach((product, index) => {
            if (active >= 0) {
              if (index === active) place(product, selectedX, mobile ? -2 : -16, mobile ? 1.35 : 1.46, 0, 46, 1, -mouseY * 12, mouseX * 12);
              else {
                const row = index < 3 ? -1 : 1;
                const col = index % 3 - 1;
                place(product, col * (mobile ? 68 : 106) + (mobile ? 0 : -120), row * 88 + 24, mobile ? .62 : .72, row * 3, -18, .22);
              }
              return;
            }
            const row = index < 3 ? 0 : 1;
            const col = index % 3;
            const x = (col - 1) * (mobile ? 92 : Math.min(viewportWidth * .205, 295)) + (row === 0 ? drift : -drift);
            const y = row === 0 ? (mobile ? -72 : -68) : (mobile ? 104 : 108);
            const assorted = index >= 4;
            const spotlight = smooth(phase(outro, .18, .82));
            const baseScale = mobile ? .96 : 1.05;
            const scale = baseScale + (assorted ? spotlight * .17 : -spotlight * .18);
            const opacity = assorted ? 1 : 1 - spotlight * .45;
            place(product, x, y, scale, -6 + row * 2, assorted ? 16 : 7, opacity);
          });
        }

        if (chapter.motion === 'dubai') {
          const gold = chapter.section.querySelector('.qlove-motion-base-gold');
          if (gold) gold.style.width = active >= 0 ? '82vw' : `${34 + mid * 18}vw`;
          products.forEach((product, index) => {
            if (active >= 0) {
              if (index === active) place(product, selectedX, mobile ? -4 : -20, mobile ? (index === 0 ? 1.28 : 1.38) : (index === 0 ? 1.54 : 1.56), 0, 48, 1, -mouseY * 12, mouseX * 12);
              else place(product, mobile ? 96 : 150, 92, mobile ? .68 : .82, 6, -20, .22);
              return;
            }
            const side = index === 0 ? -1 : 1;
            const spacing = mobile ? 76 : Math.min(viewportWidth * .15, 208);
            const scale = mobile ? (index === 0 ? 1.02 : 1.18) : (index === 0 ? 1.28 : 1.3);
            place(product, side * spacing, index === 0 ? 4 : -20, scale, side * 2, index === 0 ? 12 : 18, intro);
          });
        }
      });

      raf = requestAnimationFrame(render);
    };

    const closeOpenPanel = () => {
      const openChapter = chapters.find(chapter => chapter.active >= 0);
      if (openChapter) openChapter.close();
    };
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeOpenPanel();
    });
    raf = requestAnimationFrame(render);
    window.addEventListener('pagehide', () => cancelAnimationFrame(raf), { once: true });
    return true;
  };

  if (!initialize()) {
    const observer = new MutationObserver(() => {
      if (initialize()) observer.disconnect();
    });
    observer.observe(root, { childList: true, subtree: true });
  }
})();
