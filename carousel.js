// CAROUSEL - ISOLATED SCRIPT
(function () {
    console.log('🎠 Carousel script loaded');

    const slides = document.querySelectorAll('.carousel-slide');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');

    console.log('Found slides:', slides.length);
    console.log('Next button:', nextBtn);
    console.log('Prev button:', prevBtn);

    if (slides.length === 0) {
        console.error('❌ NO SLIDES FOUND!');
        return;
    }

    let currentIndex = 0;

    function showSlide(index) {
        // Remove active from all
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
        }

        // Wrap around
        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }

        // Add active to current
        slides[currentIndex].classList.add('active');
        console.log('✅ Showing slide', currentIndex);
    }

    function next() {
        console.log('➡️ Next');
        showSlide(currentIndex + 1);
    }

    function prev() {
        console.log('⬅️ Prev');
        showSlide(currentIndex - 1);
    }

    // Auto play
    console.log('⏰ Starting auto-play (3 seconds)');
    setInterval(next, 3000);

    // Buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', next);
        console.log('✅ Next button ready');
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prev);
        console.log('✅ Prev button ready');
    }

    console.log('🎠 Carousel initialized!');
})();
