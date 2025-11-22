document.addEventListener('DOMContentLoaded', () => {
  // Navbar Scroll Effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Intersection Observer for Fade-in Animation
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

  // Smooth Scrolling for Navigation Links
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

  // Video Facade Handler
  document.querySelectorAll('.video-facade').forEach(facade => {
    facade.addEventListener('click', function () {
      const videoId = this.getAttribute('data-video-id');
      window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
    });
  });

  // Mobile Menu Toggle
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

    // Close mobile menu when a link is clicked
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

  // Carousel Logic - Robust Implementation
  const slides = document.querySelectorAll('.carousel-slide');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const carouselContainer = document.querySelector('.carousel-container');
  let currentSlide = 0;
  const slideInterval = 5000;
  let autoPlay;

  console.log('Carousel Init: Found slides:', slides.length);

  function showSlide(index) {
    console.log('Showing slide:', index);

    // Hide all slides first
    slides.forEach(slide => {
      slide.classList.remove('active');
      slide.style.display = 'none'; // Explicitly hide
    });

    // Calculate valid index
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    // Show active slide
    const activeSlide = slides[currentSlide];
    if (activeSlide) {
      activeSlide.classList.add('active');
      activeSlide.style.display = 'flex'; // Explicitly show
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
    // Initial State
    showSlide(0);
    startAutoPlay();

    // Event Listeners
    if (nextBtn) {
      nextBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Stop bubbling
        console.log('Next clicked');
        nextSlide();
        resetInterval();
      };
    } else {
      console.error('Next button not found');
    }

    if (prevBtn) {
      prevBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Prev clicked');
        prevSlide();
        resetInterval();
      };
    } else {
      console.error('Prev button not found');
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
        handleSwipe();
        resetInterval();
      }, { passive: true });
    }

    function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
        nextSlide();
      }
      if (touchEndX > touchStartX + 50) {
        prevSlide();
      }
    }
  } else {
    console.error('No slides found');
  }
});
