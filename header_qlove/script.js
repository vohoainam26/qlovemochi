// Hero Slider Logic
(() => {
  const slides = document.querySelectorAll('.slide');
  const flavorBtns = document.querySelectorAll('.flavor-btn');
  const prevBtn = document.querySelector('.arrow-prev');
  const nextBtn = document.querySelector('.arrow-next');
  const indicator = document.querySelector('.slider-indicator');
  const heroSlider = document.querySelector('.hero-slider');
  
  if (!slides.length) return;

  let currentIndex = 0;
  let isAnimating = false;
  let autoplayTimer;
  const AUTOPLAY_DELAY = 6000;
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function updateSlider(newIndex) {
    if (newIndex === currentIndex || isAnimating) return;
    isAnimating = true;

    const currentSlide = slides[currentIndex];
    const nextSlide = slides[newIndex];

    // Cleanup previous states
    slides.forEach(s => {
      s.classList.remove('previous');
      s.classList.remove('float'); // stop floating during transition
    });

    currentSlide.classList.remove('active');
    currentSlide.classList.add('previous');
    
    nextSlide.classList.add('active');

    // Update UI
    flavorBtns.forEach((btn, idx) => {
      btn.classList.toggle('active', idx === newIndex);
    });
    indicator.textContent = `0${newIndex + 1} / 0${slides.length}`;

    currentIndex = newIndex;

    // Reset animation lock
    setTimeout(() => {
      isAnimating = false;
      nextSlide.classList.add('float');
    }, 1200); // matches CSS transition duration
  }

  function nextSlide() {
    updateSlider((currentIndex + 1) % slides.length);
  }

  function prevSlide() {
    updateSlider((currentIndex - 1 + slides.length) % slides.length);
  }

  // Event Listeners
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });

  flavorBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      updateSlider(index);
      resetAutoplay();
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
      resetAutoplay();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
      resetAutoplay();
    }
  });

  // Swipe logic (Touch)
  let touchStartX = 0;
  let touchEndX = 0;
  
  heroSlider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    pauseAutoplay();
  }, { passive: true });

  heroSlider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoplay();
  }, { passive: true });

  function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) nextSlide();
    if (touchEndX > touchStartX + threshold) prevSlide();
  }

  // Autoplay functionality
  function startAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
  }

  function pauseAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  function resetAutoplay() {
    pauseAutoplay();
    startAutoplay();
  }

  // Hover to pause
  heroSlider.addEventListener('mouseenter', pauseAutoplay);
  heroSlider.addEventListener('mouseleave', startAutoplay);
  
  // Page visibility to pause
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseAutoplay();
    else startAutoplay();
  });

  
  const randomBtn = document.getElementById('randomBtn');
  if (randomBtn) {
    randomBtn.addEventListener('click', () => {
      if (slides.length > 1) {
        let randomIndex = Math.floor(Math.random() * slides.length);
        while (randomIndex === currentIndex) {
          randomIndex = Math.floor(Math.random() * slides.length);
        }
        pauseAutoplay();
        updateSlider(randomIndex);
        startAutoplay();
      }
    });
  }

  // Init
  slides[currentIndex].classList.add('float');
  startAutoplay();
})();
