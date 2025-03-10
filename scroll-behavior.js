let lastScrollY = window.scrollY;
let ticking = false;

// Only run this script on lesson pages
if (document.querySelector('.lesson-layout')) {
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                const header = document.querySelector('header');
                const lessonLayout = document.querySelector('.lesson-layout');

                // Scrolling down
                if (currentScrollY > lastScrollY) {
                    header.classList.add('nav-hidden');
                    lessonLayout.classList.add('nav-hidden');
                }
                // Scrolling up
                else if (currentScrollY < lastScrollY) {
                    header.classList.remove('nav-hidden');
                    lessonLayout.classList.remove('nav-hidden');
                }

                lastScrollY = currentScrollY;
                ticking = false;
            });

            ticking = true;
        }
    });
}