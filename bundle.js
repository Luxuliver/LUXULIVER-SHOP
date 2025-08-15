document.addEventListener('DOMContentLoaded', () => {

    function renderBundlePage() {
        const container = document.getElementById('bundle-products-grid');
        if (!container) return;

        const bundleProducts = products.filter(p => p.isBundle === true);

        if (bundleProducts.length > 0) {
            container.innerHTML = bundleProducts.map(product => {
                
                return `
                    <div class="product-card" data-product-id="${product.id}">
                        <div class="product-image-container">
                            <img src="${product.image[0]}" alt="${product.name}" loading="lazy">
                        </div>
                        <div class="product-info">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <p class="price">${APP.formatRupiah(product.basePrice)}</p>
                            <div class="size-options">
                                ${product.sizes.map(size => `<span class="size-option" data-size="${size}">${size}</span>`).join('')}
                            </div>
                            <div class="product-actions">
                                <button class="btn btn-primary add-to-cart">
                                    <i class="fas fa-shopping-cart"></i> <span>Beli Paket</span>
                                </button>
                                </div>
                        </div>
                    </div>
                `;
            }).join('');

            container.querySelectorAll('.product-card').forEach(card => {
                const productId = card.dataset.productId;
                if (!productId) return;

                const addToCartBtn = card.querySelector('.add-to-cart');
                if (addToCartBtn) {
                    addToCartBtn.addEventListener('click', () => {
                        const selectedSizeEl = card.querySelector('.size-option.selected');
                        if (!selectedSizeEl) {
                            APP.showToast('toast_select_size', 'warning');
                            return;
                        }
                        const size = selectedSizeEl.dataset.size;
                        APP.addToCart(productId, size, 1, card);
                    });
                }
                

                const sizeOptions = card.querySelector('.size-options');
                if (sizeOptions) {
                    sizeOptions.addEventListener('click', e => {
                        if (e.target.classList.contains('size-option')) {
                            sizeOptions.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
                            e.target.classList.add('selected');
                        }
                    });
                }
            });

        } else {
            container.innerHTML = '<p class="info-message">Saat ini tidak ada penawaran paket spesial.</p>';
        }
    }

    const bundleLink = document.querySelector('a[href="#penawaran-paket"]');
    if (bundleLink) {
        bundleLink.addEventListener('click', () => {
            renderBundlePage();
        });
    }

    document.body.addEventListener('favoritesUpdated', () => {
        const container = document.getElementById('bundle-products-grid');
        if (!container) return;

        container.querySelectorAll('.product-card').forEach(card => {
            const productId = card.dataset.productId;
            const favButton = card.querySelector('.add-to-favorite');
            if (favButton) {
                const isFavorited = APP.favorites.some(fav => fav.id === productId);
                favButton.classList.toggle('favorited', isFavorited);
                favButton.querySelector('i').className = `fa-heart ${isFavorited ? 'fas' : 'far'}`;
            }
        });
    });
});