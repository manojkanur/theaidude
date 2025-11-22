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

  // Carousel Logic - SIMPLIFIED
  const slides = document.querySelectorAll('.carousel-slide');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  let currentSlide = 0;
  const totalSlides = slides.length;

  console.log('=== CAROUSEL DEBUG ===');
  console.log('Total slides found:', totalSlides);

  function showSlide(n) {
    console.log('showSlide called with:', n);

    // Remove active from all
    slides.forEach((slide, index) => {
      slide.classList.remove('active');
      console.log('Removed active from slide', index);
    });

    // Wrap around
    if (n >= totalSlides) currentSlide = 0;
    else if (n < 0) currentSlide = totalSlides - 1;
    else currentSlide = n;

    // Add active to current
    slides[currentSlide].classList.add('active');
    console.log('Added active to slide', currentSlide);
  }

  function nextSlide() {
    console.log('Next slide clicked');
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    console.log('Prev slide clicked');
    showSlide(currentSlide - 1);
  }

  if (totalSlides > 0) {
    console.log('Starting carousel...');

    // Auto advance every 3 seconds
    const autoPlay = setInterval(() => {
      console.log('Auto advancing...');
      nextSlide();
    }, 3000);

    // Button clicks
    if (nextBtn) {
      nextBtn.onclick = (e) => {
        e.preventDefault();
        nextSlide();
      };
      console.log('Next button attached');
    } else {
      console.error('Next button NOT found');
    }

    if (prevBtn) {
      prevBtn.onclick = (e) => {
        e.preventDefault();
        prevSlide();
      };
      console.log('Prev button attached');
    } else {
      console.error('Prev button NOT found');
    }
  } else {
    console.error('NO SLIDES FOUND!');
  }
};

// Robust Initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
