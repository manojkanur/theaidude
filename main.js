const initApp = () => {
  console.log('App Initializing...');

  // Navbar Scroll Effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
  });

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Video Facade
  document.querySelectorAll('.video-facade').forEach(facade => {
    facade.addEventListener('click', function () {
      const videoId = this.getAttribute('data-video-id');
      window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
    });
  });

  // Mobile Menu
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // Carousel Logic - Simplified & Robust
  const slides = document.querySelectorAll('.carousel-slide');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const carouselContainer = document.querySelector('.carousel-container');
  let currentSlide = 0;
  const slideInterval = 3000; // Faster interval for testing
  let autoPlay;

  console.log('Carousel Init: Found slides:', slides.length);

  function showSlide(index) {
    // Wrap index
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    currentSlide = index;
    console.log('Showing slide:', currentSlide);

    // Hide all
    slides.forEach(slide => {
      slide.classList.remove('active');
      slide.style.display = 'none';
    });

    // Show active
    if (slides[currentSlide]) {
      slides[currentSlide].classList.add('active');
      slides[currentSlide].style.display = 'flex';
    }
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startAutoPlay() {
    if (autoPlay) clearInterval(autoPlay);
    autoPlay = setInterval(nextSlide, slideInterval);
  }

  function resetInterval() {
    clearInterval(autoPlay);
    startAutoPlay();
  }

  if (slides.length > 0) {
    // Force initial state
    showSlide(0);
    startAutoPlay();

    if (nextBtn) {
      nextBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        nextSlide();
        resetInterval();
      };
    }

    if (prevBtn) {
      prevBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        prevSlide();
        resetInterval();
      };
    }

    // Touch Support
    let touchStartX = 0;
    let touchEndX = 0;

    if (carouselContainer) {
      carouselContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      carouselContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) nextSlide();
        if (touchEndX > touchStartX + 50) prevSlide();
        resetInterval();
      }, { passive: true });
    }
  }
};

// Robust Initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
