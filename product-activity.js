document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('quick-view-modal');
    if (!modal) return;

    let viewersInterval = null; 

    const clearActivityTimers = () => {
        clearInterval(viewersInterval);
        const existingFeed = document.getElementById('product-activity-feed');
        if (existingFeed) existingFeed.remove();
    };

    const startActivityFeed = () => {
        clearActivityTimers(); 
        
        const infoContainer = modal.querySelector('.modal-product-info');
        if (!infoContainer) return;

        const feedContainer = document.createElement('div');
        feedContainer.id = 'product-activity-feed';
        const priceElement = infoContainer.querySelector('#modal-product-price');
        if (priceElement) {
            priceElement.after(feedContainer);
        }

        const viewersElement = document.createElement('div');
        viewersElement.className = 'activity-notification';
        feedContainer.appendChild(viewersElement);

        const updateViewers = () => {
            const randomViewers = Math.floor(Math.random() * 10) + 3;
            viewersElement.innerHTML = `Ada <strong>${randomViewers} orang</strong> sedang melihat produk ini.`;
            viewersElement.classList.add('visible');
        };
        
        updateViewers();
        viewersInterval = setInterval(updateViewers, 6500); 
    };

    new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'class') {
                const isModalOpen = mutation.target.classList.contains('show');
                if (isModalOpen) {
                    startActivityFeed();
                } else {
                    clearActivityTimers();
                }
            }
        });
    }).observe(modal, { attributes: true });
});