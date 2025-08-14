document.addEventListener('DOMContentLoaded', () => {

    const mainNavLinks = document.querySelectorAll('#main-nav a, .sidebar-menu a');
    const allSections = document.querySelectorAll('main > section');

    const showPageFunction = (targetId) => {
        allSections.forEach(section => {
            section.style.display = 'none';
        });
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.style.display = 'block';

            setTimeout(() => targetElement.classList.add('section-fade-in'), 50);
        }
    };

    mainNavLinks.forEach(link => {
        const targetId = link.getAttribute('href');
        
        if (targetId && targetId.startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const currentActiveSection = document.querySelector('main > section[style*="block"]');
                
                if (currentActiveSection) {

                    currentActiveSection.classList.remove('section-fade-in');

                    currentActiveSection.classList.add('section-fade-out');

                    setTimeout(() => {
                        currentActiveSection.classList.remove('section-fade-out');
                        showPageFunction(targetId);
                    }, 400); 
                } else {

                    showPageFunction(targetId);
                }

                mainNavLinks.forEach(l => l.classList.remove('active'));
                document.querySelectorAll(`a[href="${targetId}"]`).forEach(l => l.classList.add('active'));
            });
        }
    });

    const totalPriceEl = document.getElementById('total-price');
    if (totalPriceEl) {
        const observer = new MutationObserver((mutations) => {
            for (let mutation of mutations) {
                if (mutation.type === 'childList') {
                    totalPriceEl.classList.add('highlight-animation');
                   
                    totalPriceEl.addEventListener('animationend', () => {
                        totalPriceEl.classList.remove('highlight-animation');
                    }, { once: true });
                }
            }
        });

        observer.observe(totalPriceEl, { childList: true });
    }
});