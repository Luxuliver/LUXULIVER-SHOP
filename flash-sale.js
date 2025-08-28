document.addEventListener('DOMContentLoaded', () => {
    
    const initializeTimers = () => {

        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const productId = card.dataset.productId;
            const productData = products.find(p => p.id === productId);

            if (productData && productData.flashSaleEndDate) {
                const endDate = new Date(productData.flashSaleEndDate).getTime();
                
                const timerContainer = document.createElement('div');
                timerContainer.className = 'flash-sale-timer';
                
                const productInfo = card.querySelector('.product-info .price');
                if (productInfo) {
                    productInfo.insertAdjacentElement('afterend', timerContainer);
                }

                const timerInterval = setInterval(() => {
                    const now = new Date().getTime();
                    const distance = endDate - now;

                    if (distance < 0) {
                        clearInterval(timerInterval);
                        timerContainer.innerHTML = "Penawaran Berakhir";
                        return;
                    }

                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    timerContainer.innerHTML = `
                        <span>Berakhir dalam:</span>
                        <strong>${days}h : ${hours}j : ${minutes}m : ${seconds}d</strong>
                    `;
                }, 1000);
            }
        });
    };

    initializeTimers();
    
    const productList = document.getElementById('product-list');
    if(productList) {
        const observer = new MutationObserver((mutations) => {

            if(document.querySelector('.flash-sale-timer') == null){
                 initializeTimers();
            }
        });
        observer.observe(productList, { childList: true });
    }
});