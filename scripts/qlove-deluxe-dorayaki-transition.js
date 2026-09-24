(() => {
  const root = document.querySelector('#qlove-main');
  if (!root) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 680px)');
  let initialized = false;

  const handoffProgress = trigger => {
    const viewport = innerHeight || document.documentElement.clientHeight;
    const top = trigger.getBoundingClientRect().top;
    return Math.max(0, Math.min(1, (viewport * .92 - top) / Math.max(1, viewport * .74)));
  };

  const wrap = (section, modifier) => {
    const shell = document.createElement('div');
    shell.className = `qlove-chapter-handoff-shell qlove-chapter-handoff-shell--${modifier}`;
    section.before(shell);
    shell.append(section);
    return shell;
  };

  const nativeHandoff = (trigger, deluxeShell, dorayakiShell) => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const progress = handoffProgress(trigger);
      const rise = mobile.matches ? 58 : 100;
      const scale = mobile.matches ? .012 : .025;
      const retreat = mobile.matches ? 18 : 30;
      dorayakiShell.style.transform = `translate3d(0,${rise * (1 - progress)}px,0) scale(${1 + scale * (1 - progress)})`;
      dorayakiShell.style.opacity = String(.8 + .2 * progress);
      deluxeShell.style.transform = `translate3d(0,${-retreat * progress}px,0)`;
      deluxeShell.style.opacity = String(1 - .12 * progress);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule, { passive: true });
    update();
  };

  const init = () => {
    if (initialized) return true;
    const deluxe = root.querySelector('#deluxe-mochi');
    const dorayaki = root.querySelector('#dorayaki');
    if (!deluxe || !dorayaki) return false;

    initialized = true;
    const deluxeShell = wrap(deluxe, 'deluxe');
    const dorayakiShell = wrap(dorayaki, 'dorayaki');
    const trigger = document.createElement('div');
    trigger.className = 'qlove-chapter-handoff-trigger';
    trigger.setAttribute('aria-hidden', 'true');
    dorayakiShell.before(trigger);
    root.dataset.chapterHandoff = 'ready';

    if (reduce.matches) {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
          if (!entries.some(entry => entry.isIntersecting)) return;
          dorayakiShell.animate(
            [{ opacity: .94 }, { opacity: 1 }],
            { duration: 180, easing: 'ease-out', fill: 'both' }
          );
          observer.disconnect();
        }, { threshold: .04 });
        observer.observe(dorayakiShell);
      }
      return true;
    }

    const gsap = window.gsap;
    if (!gsap) {
      nativeHandoff(trigger, deluxeShell, dorayakiShell);
      return true;
    }

    const rise = mobile.matches ? 58 : 100;
    const startScale = mobile.matches ? 1.012 : 1.025;
    const retreat = mobile.matches ? -18 : -30;
    const timeline = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
      .fromTo(deluxeShell,
        { y: 0, opacity: 1 },
        { y: retreat, opacity: .88, force3D: true }, 0)
      .fromTo(dorayakiShell,
        { y: rise, scale: startScale, opacity: .8 },
        { y: 0, scale: 1, opacity: 1, force3D: true }, 0);
    const smoothProgress = gsap.quickTo(timeline, 'progress', {
      duration: .65,
      ease: 'power2.out'
    });
    let frame = 0;
    const update = (immediate = false) => {
      frame = 0;
      const progress = handoffProgress(trigger);
      if (immediate) timeline.progress(progress);
      else smoothProgress(progress);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(() => update(false));
    };
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule, { passive: true });
    update(true);
    return true;
  };

  if (!init()) {
    const observer = new MutationObserver(() => {
      if (init()) observer.disconnect();
    });
    observer.observe(root, { childList: true, subtree: true });
  }
})();
