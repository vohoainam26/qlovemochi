// Hero slider logic. Kept self-contained so the rest of the catalogue can load independently.
(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const flavorBtns = [...document.querySelectorAll('.flavor-btn')];
  const prevBtn = document.querySelector('.arrow-prev');
  const nextBtn = document.querySelector('.arrow-next');
  const pauseBtn = document.querySelector('.slider-pause');
  const indicator = document.querySelector('.slider-indicator');
  const heroSlider = document.querySelector('.hero-slider');

  if (!slides.length || !heroSlider) return;

  heroSlider.tabIndex = heroSlider.tabIndex < 0 ? 0 : heroSlider.tabIndex;

  let currentIndex = 0;
  let isAnimating = false;
  let autoplayTimer = 0;
  let isAutoplayPaused = false;
  const AUTOPLAY_DELAY = 6000;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const loadSlideAssets = index => {
    [slides[index], flavorBtns[index]].filter(Boolean).forEach(container => {
      container.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        delete img.dataset.src;
      });
    });
  };

  const preloadNextSlide = () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    const schedule = window.requestIdleCallback || (callback => window.setTimeout(callback, 900));
    schedule(() => loadSlideAssets(nextIndex), { timeout: 1800 });
  };

  const pauseAutoplay = () => {
    if (autoplayTimer) window.clearInterval(autoplayTimer);
    autoplayTimer = 0;
  };

  const startAutoplay = () => {
    pauseAutoplay();
    if (isAutoplayPaused || reduceMotion.matches || document.hidden) return;
    autoplayTimer = window.setInterval(nextSlide, AUTOPLAY_DELAY);
  };

  const resetAutoplay = () => {
    if (!isAutoplayPaused) startAutoplay();
  };

  const setAutoplayPaused = paused => {
    isAutoplayPaused = paused;
    pauseBtn?.setAttribute('aria-pressed', String(paused));
    if (pauseBtn) {
      pauseBtn.textContent = paused ? 'Play' : 'Pause';
      pauseBtn.setAttribute('aria-label', paused ? 'Resume automatic slide rotation' : 'Pause automatic slide rotation');
    }
    if (paused) pauseAutoplay();
    else startAutoplay();
  };

  function updateSlider(newIndex) {
    if (newIndex === currentIndex || isAnimating) return;
    isAnimating = true;

    const currentSlide = slides[currentIndex];
    const nextSlideElement = slides[newIndex];
    const mochiImages = [
      '/assets/optimized/random/mini.webp',
      '/assets/optimized/random/pouch.webp',
      '/assets/optimized/random/snowflake.webp',
      '/assets/optimized/random/dorayaki.webp',
      '/assets/optimized/random/double-filling.webp',
      '/assets/optimized/random/boba.webp',
      '/assets/optimized/random/custard.webp'
    ];
    const randomBtnImg = document.querySelector('.random-btn-img');
    if (randomBtnImg) randomBtnImg.src = mochiImages[newIndex];

    slides.forEach(slide => slide.classList.remove('previous', 'float'));
    loadSlideAssets(newIndex);
    currentSlide.classList.remove('active');
    currentSlide.classList.add('previous');
    nextSlideElement.classList.add('active');

    flavorBtns.forEach((button, index) => {
      button.classList.toggle('active', index === newIndex);
      button.setAttribute('aria-current', index === newIndex ? 'true' : 'false');
    });
    if (indicator) indicator.textContent = `0${newIndex + 1} / 0${slides.length}`;

    currentIndex = newIndex;
    preloadNextSlide();
    window.setTimeout(() => {
      isAnimating = false;
      nextSlideElement.classList.add('float');
    }, reduceMotion.matches ? 0 : 1200);
  }

  function nextSlide() {
    updateSlider((currentIndex + 1) % slides.length);
  }

  function prevSlide() {
    updateSlider((currentIndex - 1 + slides.length) % slides.length);
  }

  nextBtn?.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
  prevBtn?.addEventListener('click', () => { prevSlide(); resetAutoplay(); });
  pauseBtn?.addEventListener('click', () => setAutoplayPaused(!isAutoplayPaused));
  flavorBtns.forEach((button, index) => button.addEventListener('click', () => {
    updateSlider(index);
    resetAutoplay();
  }));

  heroSlider.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.target.matches('input, textarea, select')) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextSlide();
      resetAutoplay();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prevSlide();
      resetAutoplay();
    }
  });

  let touchStartX = 0;
  heroSlider.addEventListener('touchstart', event => {
    touchStartX = event.changedTouches[0].screenX;
    pauseAutoplay();
  }, { passive: true });
  heroSlider.addEventListener('touchend', event => {
    const touchEndX = event.changedTouches[0].screenX;
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) nextSlide();
    if (touchEndX > touchStartX + threshold) prevSlide();
    resetAutoplay();
  }, { passive: true });

  heroSlider.addEventListener('mouseenter', pauseAutoplay);
  heroSlider.addEventListener('mouseleave', startAutoplay);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseAutoplay();
    else startAutoplay();
  });
  reduceMotion.addEventListener?.('change', () => startAutoplay());

  // When returning from the catalogue, settle on the complete hero only after
  // upward scrolling has stopped. This avoids the previous continuous snap
  // while ensuring the visitor never lands on a cropped banner.
  let previousScrollY = window.scrollY;
  let heroSettleTimer = 0;
  let isSettlingHero = false;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const isMovingUp = currentScrollY < previousScrollY - 1;
    previousScrollY = currentScrollY;
    window.clearTimeout(heroSettleTimer);

    if (!isMovingUp || isSettlingHero || currentScrollY <= 2 || currentScrollY >= heroSlider.offsetHeight) return;
    heroSettleTimer = window.setTimeout(() => {
      const heroHeight = heroSlider.offsetHeight;
      if (isSettlingHero || window.scrollY <= 2 || window.scrollY >= heroHeight) return;
      isSettlingHero = true;
      window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      window.setTimeout(() => { isSettlingHero = false; }, reduceMotion.matches ? 0 : 550);
    }, 140);
  }, { passive: true });

  const randomBtn = document.getElementById('randomBtn');
  randomBtn?.addEventListener('click', () => {
    if (slides.length < 2) return;
    let randomIndex = Math.floor(Math.random() * slides.length);
    while (randomIndex === currentIndex) randomIndex = Math.floor(Math.random() * slides.length);
    updateSlider(randomIndex);
    resetAutoplay();
  });

  loadSlideAssets(currentIndex);
  flavorBtns[0]?.setAttribute('aria-current', 'true');
  slides[currentIndex].classList.add('float');
  preloadNextSlide();
  startAutoplay();
})();
