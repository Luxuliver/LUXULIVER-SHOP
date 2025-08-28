document.addEventListener('DOMContentLoaded', () => {

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
    const footerToggles = document.querySelectorAll('.footer-toggle');

    footerToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const parent = toggle.parentElement; 
            parent.classList.toggle('active');
        });
    });
});