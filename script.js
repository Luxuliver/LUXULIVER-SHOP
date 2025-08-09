document.addEventListener('DOMContentLoaded', () => {

    const getLocalStorageItem = (key, defaultValue) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error(`Error parsing localStorage key "${key}":`, e);
            return defaultValue;
        }
    };

    let cart = getLocalStorageItem('cart', []);
    let favorites = getLocalStorageItem('favorites', []);
    let savedForLater = getLocalStorageItem('savedForLater', []);
    let recentlyViewed = getLocalStorageItem('recentlyViewed', []);
    let comparisonList = getLocalStorageItem('comparisonList', []);
    let currentRatingFilter = 0;
const MAX_COMPARISON_ITEMS = 2;

 const tourSteps = [
    {
        element: '#sidebar-toggle-btn',
        title: 'Buka Menu & Filter',
        intro: 'Klik di sini untuk membuka menu navigasi, melihat koleksi, mengatur filter pencarian produk, dan mengakses fitur lainnya.',
        position: 'right'
    },
    {
        element: '.search-input-wrapper',
        title: 'Pencarian Produk',
        intro: 'Ketik nama produk yang ingin Anda cari di sini untuk menemukan koleksi favorit Anda dengan cepat.',
        position: 'bottom'
    },
    {
        element: '.product-card:first-child .add-to-cart',
        title: 'Tambah ke Keranjang',
        intro: 'Pilih ukuran, lalu klik tombol ini untuk menambahkan produk ke keranjang belanja Anda.',
        position: 'bottom'
    },
    {
        element: 'header nav a[href="#keranjang"]',
        title: 'Lihat Keranjang',
        intro: 'Semua produk yang Anda pilih akan terkumpul di sini. Klik untuk melihat detail dan melanjutkan ke pembayaran.',
        position: 'bottom'
    },
    {
        element: '#auth-nav-item',
        title: 'Akun Anda',
        intro: 'Masuk atau daftar untuk menyimpan favorit, melihat riwayat pesanan, dan mendapatkan poin loyalty.',
        position: 'left'
    }
];

 let userLoyaltyPoints = getLocalStorageItem('userLoyaltyPoints', 0);
const loyaltyTiers = [
    { points: 500, message: 'loyalty_tier_500_message', class: 'loyalty-tier-500' },
    { points: 1000, message: 'loyalty_tier_1000_message', class: 'loyalty-tier-1000' },
    { points: 1500, message: 'loyalty_tier_1500_message', class: 'loyalty-tier-1500' }
];
   
   
    const photoGalleryImages = [
    { src: 'A1.jpg', title: 'Stillight' },
    { src: 'B1.jpg', title: 'Stillight' },
    { src: 'C1.jpg', title: 'Stillight' }
];

    let orderCounter = parseInt(localStorage.getItem('orderCounter')) || 1000;
    let pendingOrder = null;
    let currentLanguage = localStorage.getItem('language') || 'id';
    const MAX_RECENTLY_VIEWED = 6;

    let activeFilters = {
        availability: 'all',
        color: 'all',
        design: 'all'
    };


const body = document.body;
const productList = document.getElementById('product-list');
const cartItemsContainer = document.getElementById('cart-items-container');
const currentLoyaltyPointsSpan = document.getElementById('current-loyalty-points'); 
const loyaltyNextTierDiv = document.getElementById('loyalty-next-tier'); 
const loyaltyTiersContainer = document.getElementById('loyalty-tiers-container');
const emptyLoyaltyMessage = document.getElementById('empty-loyalty-message'); 
const cartCountSpan = document.getElementById('cart-count');
const subtotalPriceSpan = document.getElementById('subtotal-price');
const discountAmountSpan = document.getElementById('discount-amount');
const totalPriceSpan = document.getElementById('total-price');
const emptyCartMessage = document.getElementById('empty-cart-message');
const noResultsMessage = document.getElementById('no-results-message');
const checkoutBtn = document.getElementById('checkout-btn');
const cartSummary = document.getElementById('cart-summary');
const checkoutFormContainer = document.getElementById('checkout-form-container');
const checkoutForm = document.getElementById('checkout-form');
const currentYearSpan = document.getElementById('current-year');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchSuggestionsContainer = document.getElementById('search-suggestions-container');
const backToTopButton = document.getElementById('back-to-top');
const toastContainer = document.getElementById('toast-container');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const loadingScreen = document.getElementById('loading-screen');
const loadingVideo = document.getElementById('loading-video');
const quickViewModal = document.getElementById('quick-view-modal');
const modalSizeOptions = document.getElementById('modal-size-options');
const sizeGuideModal = document.getElementById('size-guide-modal');
const modalSizeGuideBtn = document.getElementById('modal-size-guide-btn');
const sizeChartTableBody = document.getElementById('size-chart-table').querySelector('tbody');
const sellerAddressSpan = document.getElementById('seller-address');
const sellerPhoneSpan = document.getElementById('seller-phone');
const sellerEmailSpan = document.getElementById('seller-email');
const sellerPhoneLink = document.getElementById('seller-phone-link');
const sellerEmailLink = document.getElementById('seller-email-link');
const favoriteCountSpan = document.getElementById('favorite-count');
const favoriteProductsList = document.getElementById('favorite-products-list');
const emptyFavoritesMessage = document.getElementById('empty-favorites-message');
const progressBar = document.getElementById('progress-bar');
const checkoutSteps = document.querySelectorAll('.checkout-step');
const prevStepBtn = document.getElementById('prev-step-btn');
const nextStepBtn = document.getElementById('next-step-btn');
const submitOrderBtn = document.getElementById('submit-order-btn');
const finalOrderSummaryContainer = document.getElementById('final-order-summary');
let currentStep = 1;
const confirmationModal = document.getElementById('confirmation-modal');
const confirmMessage = document.getElementById('confirm-message');
const confirmYesBtn = document.getElementById('confirm-yes');
const confirmNoBtn = document.getElementById('confirm-no');
const promoUpsellMessage = document.getElementById('promo-upsell-message');
const whatsappConfirmationModal = document.getElementById('whatsapp-confirmation-modal');
const whatsappConfirmYesBtn = document.getElementById('whatsapp-confirm-yes');
const whatsappConfirmNoBtn = document.getElementById('whatsapp-confirm-no');
const orderHistoryList = document.getElementById('order-history-list');
const emptyHistoryMessage = document.getElementById('empty-history-message');
const allReviewsList = document.getElementById('all-reviews-list');
const emptyAllReviewsMessage = document.getElementById('empty-all-reviews-message');

const sidebar = document.getElementById('sidebar');
const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const resetFiltersBtn = document.getElementById('reset-filters-btn');
const videoGalleryBtn = document.getElementById('video-gallery-btn');
const videoGalleryModal = document.getElementById('video-gallery-modal');
const languageToggleButtons = document.getElementById('language-toggle-buttons');
const cartCountSidebar = document.getElementById('cart-count-sidebar');
const favoriteCountSidebar = document.getElementById('favorite-count-sidebar');
const useSavedAddressBtn = document.getElementById('use-saved-address-btn');
const savedForLaterContainer = document.getElementById('saved-for-later-container');
const savedForLaterSection = document.getElementById('saved-for-later-section');
const recentlyViewedContainer = document.getElementById('recently-viewed-container');
const emptyRecentlyViewedMessage = document.getElementById('empty-recently-viewed-message');
const sidebarSubmenus = document.querySelectorAll('.sidebar-submenu');

const notificationSidebarBtn = document.getElementById('notification-sidebar-btn');
const notificationModal = document.getElementById('notification-modal');
const notificationListContainer = document.getElementById('notification-list');
const notificationTabs = document.querySelector('.notification-tabs');
const emptyNotificationMessage = document.getElementById('empty-notification-message');
const comparisonTray = document.getElementById('comparison-tray');
const sortProductsDropdown = document.getElementById('sort-products-dropdown');

const comparisonItemsContainer = document.getElementById('comparison-items');
const compareNowBtn = document.getElementById('compare-now-btn');
const clearComparisonBtn = document.getElementById('clear-comparison-btn');
const comparisonModal = document.getElementById('comparison-modal');
const comparisonTableContainer = document.getElementById('comparison-table-container');
const profileModal = document.getElementById('profile-modal');
const profileSidebarBtn = document.getElementById('profile-sidebar-btn');


const addToCart = (productId, size, quantity, triggerElement) => {
    if (!isAuthenticated()) {
        openModal(document.getElementById('auth-modal'));
        return;
    }
    
    if (checkoutFormContainer.style.display === 'block') {
        showToast('checkout_in_progress_warning', 'warning');
        return;
    }
    const product = products.find(p => p.id === productId);
    if (!product || quantity <= 0) return;
    const cartItemIdentifier = `${productId}-${size}`;
    const existingItem = cart.find(item => item.cartId === cartItemIdentifier);
    const totalStock = product.stock;
    const currentQtyInCart = existingItem ? existingItem.quantity : 0;
    if (currentQtyInCart + quantity > totalStock) {
        showToast('toast_stock_not_enough', "error", { name: product.name, size: size });
        return;
    }

    const effectiveBasePrice = product.isPromo ? product.promoPrice : product.basePrice;

    const price = getPriceBySize(effectiveBasePrice, size);

    if (existingItem) {
        existingItem.quantity += quantity;
        showToast('toast_quantity_updated', 'info', { name: product.name, size: size });
    } else {
 
        cart.push({ ...product, price, size, quantity, cartId: cartItemIdentifier });
    }
    showToast('toast_added_to_cart', 'success', { name: product.name, size: size, qty: quantity });
    saveCart();
    refreshAllCartViews();
    if (triggerElement) flyToCartAnimation(triggerElement);
};

const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        obj.innerHTML = formatRupiah(currentValue);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

    const formatNotificationTimestamp = (isoString) => {
        const now = new Date();
        const notificationDate = new Date(isoString);
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        const notificationDay = new Date(notificationDate.getFullYear(), notificationDate.getMonth(), notificationDate.getDate());
        const timeString = notificationDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

        if (notificationDay.getTime() === today.getTime()) return `Hari ini, ${timeString}`;
        if (notificationDay.getTime() === yesterday.getTime()) return `Kemarin, ${timeString}`;
        return notificationDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const renderNotifications = (filter = 'all') => {
        notificationListContainer.innerHTML = '';
        const filteredNotifications = notificationsData.filter(notif => filter === 'all' || notif.category === filter)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        emptyNotificationMessage.style.display = filteredNotifications.length === 0 ? 'block' : 'none';
        notificationListContainer.style.display = filteredNotifications.length === 0 ? 'none' : 'block';

        filteredNotifications.forEach(notif => {
            const notifElement = document.createElement('div');
            notifElement.className = `notification-item category-${notif.category}`;
            const titleText = translations[currentLanguage][notif.title] || notif.title;
            const descriptionText = translations[currentLanguage][notif.description] || notif.description;
            notifElement.innerHTML = `
                <div class="notification-icon"><i class="${notif.icon}"></i></div>
                <div class="notification-content">
                    <div class="notification-header">
                        <h4 class="notification-title">${titleText}</h4>
                        <span class="notification-timestamp">${formatNotificationTimestamp(notif.timestamp)}</span>
                    </div>
                    <p class="notification-description">${descriptionText}</p>
                </div>`;
            notificationListContainer.appendChild(notifElement);
        });
    };

    const refreshAllCartViews = () => {
        renderCart();
        if (checkoutFormContainer.style.display === 'block' && currentStep === 3) {
            renderFinalSummary();
        }
    };

    const showQuantitySelector = (container, product, onConfirm) => {
        if (container.classList.contains('quantity-selector-active')) return;
        container.classList.add('quantity-selector-active');
        const originalButtons = Array.from(container.children);
        originalButtons.forEach(btn => btn.style.display = 'none');
        let quantity = 1;
        const selectorContainer = document.createElement('div');
        selectorContainer.className = 'quantity-selector-ui';
        selectorContainer.style.width = '100%';
        const topRow = document.createElement('div');
        topRow.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:15px;margin-bottom:10px;';
        const btnDecrease = document.createElement('button');
        btnDecrease.textContent = '-';
        const quantityDisplay = document.createElement('strong');
        quantityDisplay.textContent = quantity;
        const btnIncrease = document.createElement('button');
        btnIncrease.textContent = '+';
        const bottomRow = document.createElement('div');
        bottomRow.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:10px;';
        const btnConfirm = document.createElement('button');
        btnConfirm.innerHTML = `<i class="fas fa-check"></i> ${translations[currentLanguage].add_to_cart}`;
        const btnCancel = document.createElement('button');
        btnCancel.textContent = translations[currentLanguage].confirm_no;
        quantityDisplay.style.cssText = 'font-size:1.4rem;min-width:30px;text-align:center;';
        [btnDecrease, btnIncrease].forEach(btn => {
            btn.className = 'btn btn-secondary';
            btn.style.cssText = 'padding:10px;line-height:1;min-width:45px;border-radius:50%;';
        });
        btnConfirm.className = 'btn btn-primary';
        btnCancel.className = 'btn btn-secondary';
        const cleanup = () => {
            selectorContainer.remove();
            originalButtons.forEach(btn => btn.style.display = '');
            container.classList.remove('quantity-selector-active');
        };
        btnDecrease.onclick = () => { if (quantity > 1) quantityDisplay.textContent = --quantity; };
        btnIncrease.onclick = () => { if (quantity < product.stock) quantityDisplay.textContent = ++quantity; };
        btnConfirm.onclick = () => { onConfirm(quantity); cleanup(); };
        btnCancel.onclick = cleanup;
        topRow.append(btnDecrease, quantityDisplay, btnIncrease);
        bottomRow.append(btnCancel, btnConfirm);
        selectorContainer.append(topRow, bottomRow);
        container.appendChild(selectorContainer);
    };


    const renderCart = () => {
        const oldTotalSpan = document.getElementById('total-price');
        const oldTotalValue = parseInt(oldTotalSpan.textContent.replace(/[^0-9]/g, '')) || 0;
        const { subtotal, totalItems, discount, total } = calculateCartTotals();
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'flex'; 
            cartSummary.style.display = 'none';
            checkoutFormContainer.style.display = 'none';
            cartItemsContainer.style.display = 'none';
        } else {
            emptyCartMessage.style.display = 'none';
            cartItemsContainer.style.display = 'block';
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.className = 'cart-item';
                cartItemDiv.innerHTML = `
                   <img src="${item.image[0]}" alt="${item.name}">

                    <div class="item-details">
                        <h4>${item.name} (${item.size})</h4>
                        <p>Harga: ${formatRupiah(item.price)}</p>
                        <p>Jumlah: <strong>${item.quantity}</strong></p>
                        <button class="btn-utility save-for-later-btn" data-cart-id="${item.cartId}" style="padding: 5px 10px; font-size: 0.9rem; margin-top: 10px;">
                            <i class="far fa-bookmark"></i> <span data-lang-key="button_save_for_later">${translations[currentLanguage].button_save_for_later}</span>
                        </button>
                    </div>
                    <div class="item-price">${formatRupiah(item.price * item.quantity)}</div>
                    <button class="btn btn-danger remove-from-cart-btn" data-cart-id="${item.cartId}" title="Hapus item" style="padding: 10px 15px; min-width: 45px;">
                        <i class="fas fa-trash-alt"></i>
                    </button>`;
                cartItemsContainer.appendChild(cartItemDiv);
            });
            if (checkoutFormContainer.style.display !== 'block') {
                cartSummary.style.display = 'block';
            }
        }

        cartItemsContainer.querySelectorAll('.remove-from-cart-btn').forEach(btn => {
            btn.onclick = e => {
                const cartId = e.currentTarget.dataset.cartId;
                const item = cart.find(i => i.cartId === cartId);
                if (item) {
                    showConfirmationModal(
                        translations[currentLanguage].confirm_remove_from_cart(item.name, item.size),
                        () => {
                            cart = cart.filter(cartItem => cartItem.cartId !== cartId);
                            saveCart();
                            refreshAllCartViews();
                            showToast('toast_removed_from_cart', 'info', { name: item.name, size: item.size });
                        }
                    );
                }
            };
        });

        cartItemsContainer.querySelectorAll('.save-for-later-btn').forEach(btn => {
            btn.onclick = e => moveToSavedForLater(e.currentTarget.dataset.cartId);
        });

        if (totalItems > 0 && totalItems < 5) {
            promoUpsellMessage.textContent = translations[currentLanguage].promo_upsell(5 - totalItems);
            promoUpsellMessage.style.display = 'block';
        } else {
            promoUpsellMessage.style.display = 'none';
        }

        cartCountSpan.textContent = totalItems;
        cartCountSidebar.textContent = totalItems;
        subtotalPriceSpan.textContent = formatRupiah(subtotal);
        discountAmountSpan.textContent = `- ${formatRupiah(discount)}`;
        animateValue(totalPriceSpan, oldTotalValue, total, 500);
        renderSavedForLater();
    };

    function attachProductCardListeners(container) {
        container.querySelectorAll('.product-card').forEach(card => {
            const productId = card.dataset.productId;
            const product = products.find(p => p.id === productId);
            card.querySelector('.size-options').addEventListener('click', e => {
                if (e.target.classList.contains('size-option')) {
                    e.target.parentElement.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
                    e.target.classList.add('selected');
                }
            });
            const addToCartBtn = card.querySelector('.add-to-cart');
            const actionsContainer = card.querySelector('.product-actions');
            addToCartBtn.addEventListener('click', () => {
                if (checkoutFormContainer.style.display === 'block') {
                    showToast('checkout_in_progress_warning', 'warning');
                    return;
                }
                if (actionsContainer.classList.contains('quantity-selector-active') || product.stock === 0) return;
                const selectedSizeEl = card.querySelector('.size-option.selected');
                if (!selectedSizeEl) {
                    showToast('toast_select_size', 'warning');
                    return;
                }
                showQuantitySelector(actionsContainer, product, (quantity) => {
                    addToCart(productId, selectedSizeEl.dataset.size, quantity, card);
                });
            });
            card.querySelector('.quick-view-btn').addEventListener('click', () => openQuickViewModal(productId));
            card.querySelector('.add-to-favorite').addEventListener('click', e => toggleFavorite(productId, e.currentTarget));
                card.querySelector('.compare-btn').addEventListener('click', () => {
   
    toggleCompare(productId); 
});
            
        });
}

    const renderRecommendations = (currentProduct) => {
        const recommendationsContainer = document.getElementById('modal-recommendations');
        const recommendationsGrid = document.getElementById('modal-recommendations-grid');

        if (!currentProduct || !currentProduct.design) {
            recommendationsContainer.style.display = 'none';
            return;
        }

        const recommendedProducts = products.filter(p =>
            p.design === currentProduct.design && p.id !== currentProduct.id
        ).slice(0, 3);

        if (recommendedProducts.length === 0) {
            recommendationsContainer.style.display = 'none';
            return;
        }

        recommendationsGrid.innerHTML = '';
        recommendedProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'recommendation-card';
            card.dataset.productId = product.id;
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="recommendation-card-info">
                    <h5>${product.name}</h5>
                </div>
            `;
            card.addEventListener('click', () => {
                closeModal(quickViewModal);
                setTimeout(() => openQuickViewModal(product.id), 300);
            });
            recommendationsGrid.appendChild(card);
        });

        recommendationsContainer.style.display = 'block';
    };

    const openQuickViewModal = (productId) => {
    if (!isAuthenticated()) {
        openModal(document.getElementById('auth-modal'));
        return;
    }

    recentlyViewed = recentlyViewed.filter(id => id !== productId);
    recentlyViewed.unshift(productId);
    if (recentlyViewed.length > MAX_RECENTLY_VIEWED) recentlyViewed.length = MAX_RECENTLY_VIEWED;
    
    saveCurrentUserSession(); 
    renderRecentlyViewed();
        
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modalContent = quickViewModal.querySelector('.modal-content');
    modalContent.dataset.productId = productId;
    
    const mainImage = document.getElementById('modal-main-image');
    const thumbnailsContainer = document.getElementById('modal-thumbnails');

    mainImage.src = product.image[0];
    mainImage.alt = product.name;
    thumbnailsContainer.innerHTML = ''; 

    if (product.image.length > 1) {
        product.image.forEach((imgSrc, index) => {
            const thumb = document.createElement('img');
            thumb.src = imgSrc;
            thumb.alt = `${product.name} thumbnail ${index + 1}`;
            thumb.className = 'thumbnail-img';
            if (index === 0) {
                thumb.classList.add('active');
            }
            thumb.addEventListener('click', () => {
                mainImage.src = imgSrc;
                thumbnailsContainer.querySelectorAll('.thumbnail-img').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
            thumbnailsContainer.appendChild(thumb);
        });
        thumbnailsContainer.style.display = 'grid';
    } else {
        thumbnailsContainer.style.display = 'none';
    }

    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-description').textContent = product.description;
    
    const updateModalPrice = (size) => {
    const modalPriceElement = document.getElementById('modal-product-price');
    
    if (product.isPromo) {
      
        const originalPrice = getPriceBySize(product.basePrice, size);
        const promotionalPrice = getPriceBySize(product.promoPrice, size);
      
        modalPriceElement.innerHTML = `
            <span class="price has-promo">${formatRupiah(originalPrice)}</span>
            <span class="promo-price">${formatRupiah(promotionalPrice)}</span>
        `;
    } else {
      
        const normalPrice = getPriceBySize(product.basePrice, size);
        modalPriceElement.innerHTML = `<span class="price">${formatRupiah(normalPrice)}</span>`;
    }
};
    

    modalSizeOptions.innerHTML = product.sizes.map(size => `<span class="size-option" data-size="${size}">${size}</span>`).join('');
    modalSizeOptions.querySelectorAll('.size-option').forEach(option => {
        option.addEventListener('click', e => {
            modalSizeOptions.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
            e.target.classList.add('selected');
            updateModalPrice(e.target.dataset.size);
        });
    });

    const defaultSizeOption = modalSizeOptions.querySelector('.size-option[data-size="M"]') || modalSizeOptions.querySelector('.size-option');
    if (defaultSizeOption) {
        defaultSizeOption.classList.add('selected');
        updateModalPrice(defaultSizeOption.dataset.size);
    }

    const modalActionsContainer = quickViewModal.querySelector('.modal-buttons-group');
    modalActionsContainer.innerHTML = `
        <button class="btn btn-primary" id="modal-add-to-cart-btn"><i class="fas fa-shopping-cart"></i> <span>${translations[currentLanguage].add_to_cart}</span></button>
        <button class="btn add-to-favorite modal-add-to-favorite"><i class="far fa-heart"></i></button>`;
    const newModalAddToCartBtn = modalActionsContainer.querySelector('#modal-add-to-cart-btn');
    newModalAddToCartBtn.disabled = product.stock === 0;
    newModalAddToCartBtn.addEventListener('click', () => {
        if (checkoutFormContainer.style.display === 'block') {
            showToast('checkout_in_progress_warning', 'warning');
            return;
        }
        if (modalActionsContainer.classList.contains('quantity-selector-active') || product.stock === 0) return;
        const selectedSizeEl = modalSizeOptions.querySelector('.size-option.selected');
        if (!selectedSizeEl) {
            showToast("toast_select_size", "warning");
            return;
        }
        showQuantitySelector(modalActionsContainer, product, (quantity) => {
            addToCart(productId, selectedSizeEl.dataset.size, quantity, quickViewModal);
            closeModal(quickViewModal);
        });
    });
    modalActionsContainer.querySelector('.modal-add-to-favorite').addEventListener('click', e => toggleFavorite(productId, e.currentTarget));
    quickViewModal.querySelector('.modal-share-product-btn').onclick = () => shareProduct(product);
    renderReviews(product);
    renderRecommendations(product);
    
    openModal(quickViewModal);
    updateAllFavoriteButtons();
};

    const moveToSavedForLater = (cartId) => {
        const itemIndex = cart.findIndex(item => item.cartId === cartId);
        if (itemIndex > -1) {
            const item = cart[itemIndex];
            savedForLater.push(item);
            cart.splice(itemIndex, 1);
            saveCart();
            saveSavedForLater();
            refreshAllCartViews();
            showToast('toast_moved_to_saved', 'info', { name: item.name, size: item.size });
        }
    };

    const moveToCart = (cartId) => {
        if (checkoutFormContainer.style.display === 'block') {
            showToast('checkout_in_progress_warning', 'warning');
            return;
        }
        const itemIndex = savedForLater.findIndex(item => item.cartId === cartId);
        if (itemIndex > -1) {
            const item = savedForLater[itemIndex];
            addToCart(item.id, item.size, item.quantity, null);
            savedForLater.splice(itemIndex, 1);
            saveSavedForLater();
            showToast('toast_moved_to_cart', 'success', { name: item.name, size: item.size });
        }
    };

    const renderRadioOptions = (containerId, optionsData, inputName) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (containerId === 'expedition-method') {
        container.innerHTML = '';
        container.classList.add('definitive-shipping-hub');

        const slider = document.createElement('div');
        slider.className = 'selection-highlight-slider';
        container.appendChild(slider);

        container.innerHTML += optionsData.map((option, index) => `
            <label for="${option.id}" class="definitive-shipping-option">
                <input type="radio" id="${option.id}" name="${inputName}" value="${option.name}" ${index === 0 ? 'checked' : ''} required>
                <div class="shipping-content">
                    <div class="logo-and-details">
                        <div class="shipping-logo-wrapper">
                            <img src="${option.logo}" alt="${option.name} logo">
                        </div>
                        <div class="shipping-details">
                            <span class="shipping-name">${option.name}</span>
                            <span class="shipping-service">${option.service}</span>
                        </div>
                    </div>
                    <div class="shipping-price">
                        <span class="price-label">Biaya</span>
                        <span class="price-value">${option.price}</span>
                    </div>
                    <div class="shipping-estimate">
                        </div>
                </div>
            </label>
        `).join('');

        const updateSlider = (instant = false) => {
            const sliderEl = container.querySelector('.selection-highlight-slider');
            const selectedRadio = container.querySelector('input[type="radio"]:checked');
            if (!selectedRadio) {
                sliderEl.style.opacity = '0';
                return;
            };
            sliderEl.style.opacity = '1';
            const selectedLabel = selectedRadio.closest('label');

            if (instant) {
                sliderEl.style.transition = 'none';
            } else {
                sliderEl.style.transition = 'top 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
            }

            sliderEl.style.height = `${selectedLabel.offsetHeight}px`;
            sliderEl.style.top = `${selectedLabel.offsetTop}px`;

            if (instant) {
               
                setTimeout(() => sliderEl.style.transition = '', 50);
            }
        };

        container.addEventListener('click', (e) => {
            if (e.target.closest('.definitive-shipping-option')) {
                setTimeout(() => updateSlider(false), 50);
            }
        });

       
        setTimeout(() => updateSlider(true), 100);

    } else {
         container.innerHTML = optionsData.map(option => `
        <div class="radio-option">
            <input type="radio" id="${option.id}" name="${inputName}" value="${option.name}" required>
            <label for="${option.id}" class="radio-tile">
                <img src="${option.logo}" alt="${option.name} logo">
                <div class="radio-tile-info">
                    <span class="radio-tile-name">${option.name}</span>
                    ${option.description ? `<span class="radio-tile-desc">${option.description}</span>` : ''}
                </div>
            </label>
        </div>`).join('');
        const firstRadioPayment = container.querySelector('input[type="radio"]');
        if (firstRadioPayment) firstRadioPayment.checked = true;
    }
};
   const updateShippingEstimates = () => {
    const address = document.getElementById('customer-address').value.toLowerCase();
    const shippingOptions = document.querySelectorAll('.definitive-shipping-option');

    shippingOptions.forEach(option => {
        const estimateElement = option.querySelector('.shipping-estimate');
        if (!estimateElement) return;

        if (!address.trim()) {
           
            estimateElement.innerHTML = `<span class="estimate-placeholder">Isi alamat di Langkah 1</span>`;
        } else {
           
            estimateElement.innerHTML = `<div class="spinner"></div><span>Menghitung...</span>`;

           
            setTimeout(() => {

    const lowerCaseAddress = address.toLowerCase();

    const addressParts = lowerCaseAddress.split(',');

    const cityAndProvinceString = addressParts.length > 1 ? addressParts.slice(1).join(' ') : lowerCaseAddress;

    const jabodetabek = ['jakarta', 'bogor', 'depok', 'tangerang', 'bekasi'];

    const isJabodetabek = jabodetabek.some(city => cityAndProvinceString.includes(city));

    const newEstimate = isJabodetabek ? '1-4 Hari Kerja' : '3-7 Hari Kerja';

    estimateElement.innerHTML = `<i class="far fa-clock"></i><span>${newEstimate}</span>`;
}, 1500);
        }
    });
};

    const renderRecentlyViewed = () => {
    const gridContainer = document.getElementById('recently-viewed-grid');
    const emptyMessage = document.getElementById('empty-recently-viewed-message-main');
    
    if (!gridContainer || !emptyMessage) return;

    
    const viewedProducts = recentlyViewed.map(id => products.find(p => p.id === id)).filter(p => p);

    if (viewedProducts.length === 0) {
        gridContainer.innerHTML = '';
        gridContainer.style.display = 'none';
        emptyMessage.style.display = 'flex';
    } else {
        emptyMessage.style.display = 'none';
        gridContainer.style.display = 'grid';
        
        gridContainer.innerHTML = viewedProducts.map(product => createProductCardHTML(product)).join('');
        
        attachProductCardListeners(gridContainer);
    }
};

    const getPriceBySize = (basePrice, size) => size && size.toUpperCase() === 'XL' ? basePrice + 5000 : basePrice;

    const generateStarsHTML = (rating) => {
        let stars = '';
        for (let i = 1; i <= 5; i++) stars += `<i class="${i <= rating ? 'fas' : 'far'} fa-star"></i>`;
        return stars;
    };

    const showToast = (messageKey, type = 'info', context = {}) => {
        let message = translations[currentLanguage][messageKey];
        if (typeof message === 'function') message = message(context.name, context.size, context.qty);
        if (context.itemsNeeded) message = translations[currentLanguage][messageKey](context.itemsNeeded);
        if (context.step) message = translations[currentLanguage][messageKey](context.step);
        if (context.orderId) message = translations[currentLanguage][messageKey](context.orderId);
        const toast = document.createElement('div');
        toast.className = `toast-notification ${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => toast.remove());
        }, 3000);
    };

    const openModal = (modalElement) => {
        modalElement.classList.add('show');
        body.classList.add('no-scroll');
    };

    const closeModal = (modalElement) => {
        modalElement.classList.remove('show');
        if (modalElement.id === 'video-gallery-modal') {
            modalElement.querySelectorAll('video').forEach(video => {
                video.pause();
                video.currentTime = 0;
            });
        }
        if (!body.classList.contains('sidebar-open')) body.classList.remove('no-scroll');
    };

    const renderSizeGuide = () => {
        sizeChartTableBody.innerHTML = '';
        sizeGuideData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${item.size}</td><td>${item.length}</td><td>${item.width}</td><td>${item.sleeve}</td>`;
            sizeChartTableBody.appendChild(row);
        });
        openModal(sizeGuideModal);
    };

    const shareProduct = async (product) => {
        const shareData = { title: product.name, text: `Lihat T-Shirt keren "${product.name}" ini di Luxuliver Shop! Harga mulai ${formatRupiah(product.basePrice)}. ${product.description}`, url: window.location.href };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
                showToast('toast_product_shared', 'success');
            } else {
                navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`).then(() => showToast('toast_link_copied', 'info'));
            }
        } catch (err) {
            if (err.name !== 'AbortError') showToast('toast_share_failed', 'error');
        }
    };

    const flyToCartAnimation = (startElement) => {
        const productImg = startElement.querySelector('img');
        if (!productImg) return;
        const startRect = productImg.getBoundingClientRect();
        const cartIcon = document.querySelector('#keranjang a, #cart-count-sidebar');
        const endRect = cartIcon.getBoundingClientRect();
        const flyingClone = productImg.cloneNode(true);
        flyingClone.className = 'flying-product-clone';
        Object.assign(flyingClone.style, { left: `${startRect.left}px`, top: `${startRect.top}px`, width: `${startRect.width}px`, height: `${startRect.height}px`, opacity: '1' });
        document.body.appendChild(flyingClone);
        requestAnimationFrame(() => {
            Object.assign(flyingClone.style, { left: `${endRect.left + (endRect.width / 2) - 15}px`, top: `${endRect.top + (endRect.height / 2) - 15}px`, width: '30px', height: '30px', opacity: '0.5' });
        });
        flyingClone.addEventListener('transitionend', () => {
            flyingClone.remove();
            cartIcon.classList.add('cart-pop-animation');
            cartIcon.addEventListener('animationend', () => cartIcon.classList.remove('cart-pop-animation'), { once: true });
        }, { once: true });
    };

    const saveAddress = () => {
        const addressData = { name: document.getElementById('customer-name').value, phone: document.getElementById('customer-phone').value, address: document.getElementById('customer-address').value };
        if (addressData.name && addressData.phone && addressData.address) localStorage.setItem('savedAddress', JSON.stringify(addressData));
    };
    
   
const loadSavedAddress = () => {
    const userProfile = getLocalStorageItem('luxuliverUser', null);
    if (userProfile && userProfile.address) {
        document.getElementById('customer-name').value = userProfile.name;
        document.getElementById('customer-phone').value = userProfile.phone;
        document.getElementById('customer-address').value = userProfile.address;
        showToast('toast_address_loaded', 'success');
    }
};

    const renderSavedForLater = () => {
        savedForLaterContainer.innerHTML = '';
        if (savedForLater.length > 0) {
            savedForLaterSection.style.display = 'block';
            savedForLater.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h4>${item.name} (${item.size})</h4>
                        <p>${formatRupiah(item.price)}</p>
                    </div>
                    <div class="item-actions" style="margin-left: auto; display:flex; gap: 10px;">
                         <button class="btn btn-secondary move-to-cart-btn" data-cart-id="${item.cartId}"><span data-lang-key="button_move_to_cart">${translations[currentLanguage].button_move_to_cart}</span></button>
                        <button class="btn btn-danger remove-from-saved-btn" data-cart-id="${item.cartId}"><i class="fas fa-trash"></i></button>
                    </div>`;
                savedForLaterContainer.appendChild(itemDiv);
            });
            savedForLaterContainer.querySelectorAll('.move-to-cart-btn').forEach(btn => btn.onclick = e => moveToCart(e.currentTarget.dataset.cartId));
            savedForLaterContainer.querySelectorAll('.remove-from-saved-btn').forEach(btn => {
                btn.onclick = e => {
                    const cartIdToRemove = e.currentTarget.dataset.cartId;
                    const item = savedForLater.find(i => i.cartId === cartIdToRemove);
                    if (!item) return;
                    showConfirmationModal(translations[currentLanguage].confirm_remove_from_cart(item.name, item.size), () => {
                        savedForLater = savedForLater.filter(i => i.cartId !== cartIdToRemove);
                        saveSavedForLater();
                        renderSavedForLater();
                        showToast('toast_removed_from_cart', 'info', { name: item.name, size: item.size });
                    });
                };
            });
        } else {
            savedForLaterSection.style.display = 'none';
        }
    }
    const saveSavedForLater = () => localStorage.setItem('savedForLater', JSON.stringify(savedForLater));



checkoutForm.addEventListener('submit', e => {
    e.preventDefault(); 

    if (!validateStep(3)) {
        
        return;
    }

    const customerPhoneInput = document.getElementById('customer-phone').value;
    
    if (!/^[0-9]{10,15}$/.test(customerPhoneInput)) {
        showToast("toast_invalid_whatsapp", "error");
        return; 
    }

    const { total, subtotal, discount, shippingDiscount } = calculateCartTotals();
    const orderId = `LXVR-${orderCounter}`;
    const formData = new FormData(checkoutForm);
    const customerNotes = formData.get('customer-notes').trim();
    const notesText = customerNotes ? `*Catatan:* ${customerNotes}\n` : '';
    const shippingDiscountText = shippingDiscount > 0 ? `*Promo Ongkir (Jabodetabek):* -${formatRupiah(shippingDiscount)}\n` : '';

    let orderDetails = `*Order Baru dari Luxuliver Shop*\n\n` +
        `*ID Pesanan:* ${orderId}\n` +
        `*Nama:* ${formData.get('customer-name')}\n*Telepon:* ${formData.get('customer-phone')}\n*Alamat:* ${formData.get('customer-address')}\n` +
        notesText + `*Ekspedisi:* ${formData.get('expeditionMethod')}\n*Pembayaran:* ${formData.get('paymentMethod')}\n\n*Detail Pesanan:*\n` +
        cart.map(item => `- ${item.name} (${item.size}) x ${item.quantity} = ${formatRupiah(item.price * item.quantity)}`).join('\n') + `\n\n*Subtotal:* ${formatRupiah(subtotal)}\n` +
        `*Diskon Pembelian:* -${formatRupiah(discount)}\n` + shippingDiscountText + `*Total Pembayaran:* ${formatRupiah(total)}\n\n` + `Terima kasih! Detail biaya pengiriman (setelah promo) akan diinfokan oleh admin kami.`;

    pendingOrder = { orderId, date: new Date().toISOString(), items: [...cart], total };
    window.open(`https://wa.me/${sellerInfo.whatsappAdmin}?text=${encodeURIComponent(orderDetails)}`, '_blank');
    openModal(whatsappConfirmationModal);
});

whatsappConfirmYesBtn.addEventListener('click', () => {
    if (pendingOrder) {
        
        let currentUser = getLocalStorageItem('luxuliverCurrentUser');
        if (!currentUser) return; 

        
        let pointsEarned = 0;
        pendingOrder.items.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (product && product.points) { 
                pointsEarned += (product.points * item.quantity); 
            }
        });
        userLoyaltyPoints += pointsEarned; 
        localStorage.setItem('userLoyaltyPoints', userLoyaltyPoints); 
        updateLoyaltyPremiumVisuals(); 

        const formData = new FormData(checkoutForm);

        
        if (!currentUser.history) currentUser.history = [];
        currentUser.history.unshift(pendingOrder);
        
        
        currentUser.name = formData.get('customer-name');
        currentUser.phone = formData.get('customer-phone');
        currentUser.address = formData.get('customer-address');

        
        localStorage.setItem('luxuliverCurrentUser', JSON.stringify(currentUser));

        
        let accounts = getLocalStorageItem('luxuliverAccounts', []);
        const accountIndex = accounts.findIndex(acc => acc.phone === currentUser.phone);
        if (accountIndex !== -1) {
            accounts[accountIndex] = currentUser; 
            localStorage.setItem('luxuliverAccounts', JSON.stringify(accounts));
        }

       
        localStorage.removeItem('luxuliverUser');

        
        orderCounter++;
        localStorage.setItem('orderCounter', orderCounter.toString());

        cart = [];
        saveCart();
        refreshAllCartViews();
        renderOrderHistory();
        checkoutForm.reset();
        closeModal(whatsappConfirmationModal);
        showToast("toast_order_confirmed", "success");
        pendingOrder = null;
        renderLoyaltySection(); 
    }
});

    whatsappConfirmNoBtn.addEventListener('click', () => {
        pendingOrder = null;
        closeModal(whatsappConfirmationModal);
        showToast("toast_order_cancelled", "warning");
    });

    const renderSkeletonLoaders = (container, count) => {
        container.innerHTML = Array(count).fill(0).map(() => `
            <div class="skeleton-card">
                <div class="skeleton-image"></div>
                <div class="skeleton-info">
                    <div class="skeleton-text skeleton-text-lg"></div>
                    <div class="skeleton-text skeleton-text-sm"></div>
                    <div class="skeleton-text-xs"></div>
                    <div class="skeleton-button-group">
                        <div class="skeleton-button-main"></div>
                        <div class="skeleton-button-secondary"></div>
                        <div class="skeleton-button-secondary"></div>
                    </div>
                </div>
            </div>`).join('');
    };

    const createProductCardHTML = (product) => {
    const isFavorited = favorites.some(fav => fav.id === product.id);
    const price = getPriceBySize(product.basePrice, 'M');
    
    const isSoldOut = product.stock === 0;

    const priceHTML = product.isPromo
        ? `<p class="price has-promo">${formatRupiah(product.basePrice)}</p>
           <p class="promo-price">${formatRupiah(product.promoPrice)}</p>`
        : `<p class="price">${formatRupiah(price)}</p>`;

    const preOrderBadge = product.status === 'preorder' && !isSoldOut ? `<div class="pre-order-badge">Pre-Order</div>` : '';
    const lowStockLabel = !isSoldOut && product.stock <= 5 ? `<div class="low-stock-badge">${translations[currentLanguage].stock_limited}</div>` : '';
    
    const outOfStockLabel = isSoldOut ? `<div class="out-of-stock-badge">${translations[currentLanguage].sold_out_badge}</div>` : '';
    
    const totalReviews = product.reviews ? product.reviews.length : 0;
    const averageRating = totalReviews > 0 ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews : 0;
    const ratingHTML = `<div class="product-rating" title="${averageRating.toFixed(1)} dari 5 bintang">${generateStarsHTML(Math.round(averageRating))}<span class="rating-count">(${totalReviews})</span></div>`;
    
    return `
<div class="product-card" data-product-id="${product.id}">
    ${preOrderBadge}${lowStockLabel}${outOfStockLabel}
    <div class="product-image-container"><img src="${product.image[0]}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.src='placeholder.jpg';"></div>

        <div class="product-info">
            <h3>${product.name}</h3>
            ${ratingHTML}
            ${priceHTML}
            <div class="size-options">${product.sizes.map(size => `<span class="size-option" data-size="${size}">${size}</span>`).join('')}</div>
            <div class="product-actions">
                <button class="btn btn-primary add-to-cart" ${isSoldOut ? 'disabled' : ''}>
                    <i class="fas fa-shopping-cart"></i> <span>${isSoldOut ? translations[currentLanguage].sold_out_badge : translations[currentLanguage].add_button}</span>
                </button>
                
                <button class="btn quick-view-btn" title="Lihat Cepat" ${isSoldOut ? 'disabled' : ''}>
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn add-to-favorite ${isFavorited ? 'favorited' : ''}" title="Favorit" ${isSoldOut ? 'disabled' : ''}>
                    <i class="${isFavorited ? 'fas' : 'far'} fa-heart"></i>
                </button>
                <button class="btn compare-btn" title="Bandingkan" ${isSoldOut ? 'disabled' : ''}>
                    <i class="fas fa-layer-group"></i>
                </button>
            </div>
        </div>
    </div>`;
};
    
    const createFavoriteCardHTMLLuxury = (product) => {
    const price = getPriceBySize(product.basePrice, 'M');
    return `
    <div class="favorite-card-luxury" data-product-id="${product.id}">
        <div class="favorite-card-image">
            <img src="${product.image[0]}" alt="${product.name}" loading="lazy">

             <div class="favorite-card-image-overlay"></div>
        </div>
        <div class="favorite-card-content">
            <div class="favorite-card-header">
                <h3>${product.name}</h3>
                <button class="btn-remove-favorite" title="Remove from Favorites"><i class="fas fa-times"></i></button>
            </div>
            <p class="favorite-card-description">${product.description}</p>
            <div class="favorite-card-footer">
                <span class="price">${formatRupiah(price)}</span>
                <button class="btn btn-primary btn-add-to-cart-fav"><i class="fas fa-shopping-cart"></i> <span>${translations[currentLanguage].add_to_cart}</span></button>
            </div>
        </div>
    </div>
    `;
};

    const renderProducts = (productsToRender, container, noResultsEl) => {
        container.innerHTML = '';
        noResultsEl.style.display = productsToRender.length === 0 ? 'block' : 'none';
        productsToRender.forEach(product => container.insertAdjacentHTML('beforeend', createProductCardHTML(product)));
        attachProductCardListeners(container);
    };
    
    const renderAllProductShowcases = (searchTerm = '') => {
    if (searchTerm) {
        activeFilters = { availability: 'all', color: 'all', design: 'all' };
        updateFilterUI();
        searchInput.value = searchTerm;
    }
    let filteredProducts = [...products];
    filteredProducts = filteredProducts.filter(p => p.status !== 'archived' && p.stock > 0);
    
    const currentSearchTerm = searchInput.value.trim().toLowerCase();
    if (currentSearchTerm) filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(currentSearchTerm));
    if (activeFilters.availability === 'ready') {
        filteredProducts = filteredProducts.filter(p => p.status !== 'preorder' && p.stock > 0);
    } else if (activeFilters.availability === 'preorder') {
        filteredProducts = filteredProducts.filter(p => p.status === 'preorder');
    }
    if (activeFilters.color !== 'all') filteredProducts = filteredProducts.filter(p => p.color === activeFilters.color);
    if (activeFilters.design !== 'all') filteredProducts = filteredProducts.filter(p => p.design === activeFilters.design);
    if (activeFilters.promo) {
    filteredProducts = filteredProducts.filter(p => p.isPromo === true);
}


    const sortDropdown = document.getElementById('sort-products-dropdown');
    if (sortDropdown) { 
        const sortValue = sortDropdown.value;
        if (sortValue === 'popularity') {
            filteredProducts.sort((a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0));
        } else if (sortValue === 'price-asc') {
            filteredProducts.sort((a, b) => getPriceBySize(a.basePrice, 'M') - getPriceBySize(b.basePrice, 'M'));
        } else if (sortValue === 'price-desc') {
            filteredProducts.sort((a, b) => getPriceBySize(b.basePrice, 'M') - getPriceBySize(a.basePrice, 'M'));
        }
    }


    const container = productList;
    const visibleProductIds = new Set(filteredProducts.map(p => p.id));

    Array.from(container.children).forEach(card => {
        if (!visibleProductIds.has(card.dataset.productId) && !card.classList.contains('hidden')) card.classList.add('hidden');
    });

    setTimeout(() => {
        renderProducts(filteredProducts, container, noResultsMessage);
        requestAnimationFrame(() => {
            container.querySelectorAll('.product-card').forEach(card => {
                card.classList.remove('visible');
                void card.offsetWidth;
                card.classList.add('visible');
            });
        });
    }, 500);

    const isFilterOrSearchActive = activeFilters.availability !== 'all' 
                                 || activeFilters.color !== 'all' 
                                 || activeFilters.design !== 'all' 
                                 || activeFilters.promo 
                                 || currentSearchTerm;
                                 
    const showAllBtn = document.getElementById('show-all-products-btn');
    if (showAllBtn) {
        showAllBtn.style.display = isFilterOrSearchActive ? 'flex' : 'none';
    }

    const kolekasiH2 = document.querySelector('#koleksi h2');
    if (isFilterOrSearchActive) {
        let titleParts = [];
        if (activeFilters.availability === 'in_stock') titleParts.push(translations[currentLanguage].sidebar_in_stock);
        if (activeFilters.color !== 'all') titleParts.push(`${translations[currentLanguage].sidebar_color} ${translations[currentLanguage]['color_' + activeFilters.color]}`);
        if (activeFilters.design !== 'all') titleParts.push(`${translations[currentLanguage].sidebar_design} ${translations[currentLanguage]['design_' + activeFilters.design]}`);
        if (currentSearchTerm) titleParts.push(`Pencarian "${searchInput.value.trim()}"`);
        kolekasiH2.textContent = titleParts.join(' & ').replace(/&/g, 'dan');
    } else {
        kolekasiH2.textContent = translations[currentLanguage].all_collections_title;
    }

    document.querySelectorAll('section, footer, .product-card:not(.visible)').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9 && rect.bottom >= 0) el.classList.add('visible');
    });
};

    const saveCart = () => {
        if (isAuthenticated()) {
            saveCurrentUserSession();
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    };

const calculateCartTotals = () => {
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const productDiscount = totalItems >= 5 ? subtotal * 0.01 : 0;
    let shippingDiscount = 0;
    let shippingDiscountLabel = '';
    const addressInput = document.getElementById('customer-address');

    if (cart.length > 0 && addressInput && addressInput.value) {
        const address = addressInput.value.toLowerCase();
        const addressParts = address.split(',').map(part => part.trim()).filter(part => part.length > 0);

        let discountFound = false;
        const jabodetabekCities = ['jakarta', 'bogor', 'depok', 'tangerang', 'bekasi'];

        const streetPrefixes = ['jl', 'jalan', 'gg', 'gang'];

        for (const part of [...addressParts].reverse()) {
            
            const isStreet = streetPrefixes.some(prefix => part.startsWith(prefix + '.') || part.startsWith(prefix + ' '));
            if (isStreet) {
                continue;
            }

            for (const discount of shippingDiscounts) {
                const cityRegex = new RegExp('\\b' + discount.city.toLowerCase() + '\\b');
                if (cityRegex.test(part)) {
                    shippingDiscount = discount.discountAmount;
                    shippingDiscountLabel = `Promo Ongkir ${discount.city}`;
                    discountFound = true;
                    break;
                }
            }
            if (discountFound) break;

            for (const city of jabodetabekCities) {
                const cityRegex = new RegExp('\\b' + city + '\\b');
                if (cityRegex.test(part)) {
                    shippingDiscount = 1000;
                    shippingDiscountLabel = 'Promo Ongkir (Jabodetabek)';
                    discountFound = true;
                    break;
                }
            }
            if (discountFound) break;
        }
    }

    const total = subtotal - productDiscount - shippingDiscount;
    return { subtotal, totalItems, discount: productDiscount, shippingDiscount, shippingDiscountLabel, total };
};

    const saveFavorites = () => {
        if (isAuthenticated()) {
            saveCurrentUserSession();
        } else {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    };

    const toggleFavorite = (productId, buttonElement) => {
        if (!isAuthenticated()) {
        openModal(document.getElementById('auth-modal'));
        return;
    }
        
         const product = products.find(p => p.id === productId);
        if (!product) return;
        const favoriteIndex = favorites.findIndex(item => item.id === productId);
        if (favoriteIndex > -1) {
            favorites.splice(favoriteIndex, 1);
            showToast('toast_removed_from_favorites', 'info', { name: product.name });
        } else {
            favorites.push({ id: product.id });
            showToast('toast_added_to_favorites', 'success', { name: product.name });
        }
        saveFavorites();
        renderFavorites();
        updateAllFavoriteButtons();
    };
    
    const renderFavorites = () => {
    const favProducts = products.filter(p => favorites.some(fav => fav.id === p.id));
    favoriteProductsList.innerHTML = '';
    emptyFavoritesMessage.style.display = favProducts.length === 0 ? 'flex' : 'none'; 

    if (favProducts.length > 0) {
        favoriteProductsList.classList.remove('product-grid');
        favoriteProductsList.classList.add('favorite-luxury-list');
    } else {
        favoriteProductsList.className = 'product-grid';
    }

    favProducts.forEach(product => {
        favoriteProductsList.insertAdjacentHTML('beforeend', createFavoriteCardHTMLLuxury(product));
    });


    favoriteProductsList.querySelectorAll('.favorite-card-luxury').forEach(card => {
        const productId = card.dataset.productId;

        
        card.querySelector('.btn-remove-favorite').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(productId, null);
        });

        card.querySelector('.btn-add-to-cart-fav').addEventListener('click', () => {
            openQuickViewModal(productId);
        });

        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                openQuickViewModal(productId);
            }
        });
    });

   if (favoriteCountSpan) favoriteCountSpan.textContent = favorites.length; 
    favoriteCountSidebar.textContent = favorites.length;
};

    const updateAllFavoriteButtons = () => {
        document.querySelectorAll('.add-to-favorite').forEach(button => {
            const card = button.closest('.product-card, .modal-content');
            if (!card) return;
            const productId = card.dataset.productId || (card.querySelector('.modal-add-to-favorite')?.dataset.id);
            if (!productId) return;
            const isFavorited = favorites.some(fav => fav.id === productId);
            button.classList.toggle('favorited', isFavorited);
            button.querySelector('i').className = `fa-heart ${isFavorited ? 'fas' : 'far'}`;
        });
    };

    const renderPhotoGallery = () => {
        const photoGalleryModal = document.getElementById('photo-gallery-modal');
        const photoGrid = document.getElementById('photo-gallery-grid');
        if (!photoGalleryModal || !photoGrid) return;

        photoGrid.innerHTML = ''; 

        photoGalleryImages.forEach(image => {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            photoItem.innerHTML = `
                <img src="${image.src}" alt="${image.title}" loading="lazy">
                <h4>${image.title}</h4>
            `;
            photoGrid.appendChild(photoItem);
        });

        openModal(photoGalleryModal);
    };
    
    const renderReviews = (product) => {
        const reviewsContainer = document.getElementById('modal-reviews-list-container');
        const reviewsSummary = document.querySelector('.reviews-summary');
        const noReviewsMessage = document.getElementById('modal-no-reviews');
        if (!product.reviews || product.reviews.length === 0) {
            reviewsSummary.style.display = 'none';
            reviewsContainer.innerHTML = '';
            noReviewsMessage.style.display = 'block';
            return;
        }
        reviewsSummary.style.display = 'block';
        noReviewsMessage.style.display = 'none';
        const totalReviews = product.reviews.length;
        const averageRating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;
        document.getElementById('modal-average-rating-value').textContent = averageRating.toFixed(1);
        document.getElementById('modal-total-reviews').textContent = totalReviews;
        document.getElementById('modal-average-rating-stars').innerHTML = generateStarsHTML(Math.round(averageRating));
        reviewsContainer.innerHTML = product.reviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <strong class="review-author">${review.author}</strong>
                <span class="review-date">${new Date(review.date + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</span>
            </div>
            <div class="review-rating">${generateStarsHTML(review.rating)}</div>
            <p class="review-text">${review.text}</p>
        </div>`).join('');
};

    let confirmCallback = null;
    const showConfirmationModal = (message, callback) => {
        confirmMessage.textContent = message;
        confirmCallback = callback;
        openModal(confirmationModal);
    };

    const transitionToCartView = () => {
        checkoutFormContainer.classList.add('section-fade-out');
        setTimeout(() => {
            checkoutFormContainer.style.display = 'none';
            checkoutFormContainer.classList.remove('section-fade-out');
            renderCart();
            renderSavedForLater();
            document.getElementById('keranjang').scrollIntoView({ behavior: 'smooth' });
        }, 400);
    };

    const updateCheckoutUI = () => {
        progressBar.className = `progress-bar step-${currentStep}`;
        document.querySelectorAll('.progress-step').forEach(step => step.classList.toggle('active', parseInt(step.dataset.step) <= currentStep));
        checkoutSteps.forEach(step => step.classList.toggle('active', parseInt(step.dataset.step) === currentStep));
        prevStepBtn.style.display = 'inline-flex';
        nextStepBtn.style.display = currentStep < 3 ? 'inline-flex' : 'none';
        submitOrderBtn.style.display = currentStep === 3 ? 'inline-flex' : 'none';
    };

    const validateStep = (stepNumber) => {
        const stepDiv = document.querySelector(`.checkout-step[data-step="${stepNumber}"]`);
        const inputs = stepDiv.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        for (const input of inputs) {
            if (input.type === 'radio') {
                const radioGroup = stepDiv.querySelectorAll(`input[name="${input.name}"]`);
                if (![...radioGroup].some(r => r.checked)) {
                    isValid = false;
                    break;
                }
            } else if (!input.value.trim()) {
                isValid = false;
                break;
            }
        }
        if (!isValid) showToast('toast_step_not_complete', 'warning', { step: stepNumber });
        return isValid;
    };
    
    const renderFinalSummary = () => {
 
    const { subtotal, totalItems, discount, shippingDiscount, shippingDiscountLabel, total } = calculateCartTotals();
    const formData = new FormData(checkoutForm);

    const customerName = formData.get('customer-name') || 'Belum diisi';
    const customerPhone = formData.get('customer-phone') || 'Belum diisi';
    const customerAddress = formData.get('customer-address') || 'Belum diisi';
    const expedition = formData.get('expeditionMethod') || 'Belum dipilih';
    const payment = formData.get('paymentMethod') || 'Belum dipilih';

    const shippingDiscountHTML = shippingDiscount > 0 ? `
        <div class="finance-line">
            <span class="label">${shippingDiscountLabel}</span>
            <span class="amount">- ${formatRupiah(shippingDiscount)}</span>
        </div>` : '';

    const itemsHTML = cart.map(item => `
    <div class="summary-product-item">
        <div class="image-container"><img src="${item.image[0]}" alt="${item.name}"></div>
        <div class="details">
                <div class="name">${item.name}</div>
                <div class="qty-size">${item.quantity}x, Ukuran: ${item.size}</div>
            </div>
            <div class="price">${formatRupiah(item.price * item.quantity)}</div>
        </div>
    `).join('');

    finalOrderSummaryContainer.innerHTML = `
    <div class="luxury-summary-container">
        <h3 class="luxury-summary-header">Ringkasan Pesanan Anda</h3>

        <div class="summary-section">
            <h5 class="summary-section-title"><i class="fas fa-user-check"></i> Detail Penerima & Pengiriman</h5>
            <div class="summary-customer-details">
                <div class="summary-detail-item">
                    <span class="label">Nama Penerima</span>
                    <span class="value">${customerName}</span>
                </div>
                <div class="summary-detail-item">
                    <span class="label">Nomor WhatsApp</span>
                    <span class="value">${customerPhone}</span>
                </div>
                <div class="summary-detail-item">
                    <span class="label">Ekspedisi</span>
                    <span class="value">${expedition}</span>
                </div>
                <div class="summary-detail-item">
                    <span class="label">Metode Pembayaran</span>
                    <span class="value">${payment}</span>
                </div>
            </div>
        </div>

        <div class="summary-section">
            <h5 class="summary-section-title"><i class="fas fa-box-open"></i> Produk Dipesan (${totalItems} item)</h5>
            <div class="summary-product-list">
                ${itemsHTML}
            </div>
        </div>

        <div class="summary-finance-details">
            <div class="finance-line">
                <span class="label">Subtotal</span>
                <span class="amount">${formatRupiah(subtotal)}</span>
            </div>
            <div class="finance-line">
                <span class="label">Diskon</span>
                <span class="amount">- ${formatRupiah(discount)}</span>
            </div>
            ${shippingDiscountHTML}
        </div>

        <div class="summary-grand-total-wrapper">
            <span class="total-label">Total Tagihan</span>
            <span class="total-amount">${formatRupiah(total)}</span>
        </div>
        
        <p class="summary-footer-note">Terima kasih telah berbelanja di <strong>Luxuliver</strong></p>
    </div>
    `;
};
   
   
   const renderOrderHistory = () => {
    const userProfile = getLocalStorageItem('luxuliverCurrentUser', null); 
   
    const history = userProfile ? userProfile.history || [] : [];


    const returnedOrderIds = JSON.parse(localStorage.getItem('returnedOrderIds')) || [];

    orderHistoryList.innerHTML = '';
    emptyHistoryMessage.style.display = history.length === 0 ? 'block' : 'none';

    history.forEach(order => {
        const orderDate = new Date(order.date);
        const currentDate = new Date();
        const timeDiff = currentDate.getTime() - orderDate.getTime();
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        let returnButtonHTML = '';

   
        if (returnedOrderIds.includes(order.orderId)) {

            returnButtonHTML = `
                <button class="btn btn-secondary" disabled title="Permintaan pengembalian untuk pesanan ini sudah dikirim.">
                    <i class="fas fa-check-circle"></i> Permintaan Terkirim
                </button>
            `;
        } else if (dayDiff <= 15) {

            returnButtonHTML = `
                <button class="btn btn-secondary request-return-btn" data-order-id="${order.orderId}" data-order-items='${JSON.stringify(order.items)}'>
                    <i class="fas fa-undo-alt"></i> Ajukan Pengembalian
                </button>
            `;
        } else {

            returnButtonHTML = `
                <button class="btn btn-secondary" disabled title="Batas waktu pengembalian telah berakhir">
                    <i class="fas fa-times-circle"></i> Batas Pengembalian Habis
                </button>
            `;
        }
        
        const displayDate = orderDate.toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        const orderCard = document.createElement('div');
        orderCard.className = 'ultra-luxury-order';
        orderCard.tabIndex = 0; 

        orderCard.innerHTML = `
            <div class="order-summary-header">
                <div class="order-identity">
                    <h3 class="order-receipt-id">${order.orderId}</h3>
                    <p class="order-date">${displayDate} WIB</p>
                </div>
                <div class="order-summary-info">
                    <div class="grand-total-display">
                        <span class="total-label">Total</span>
                        <span class="total-amount">${formatRupiah(order.total)}</span>
                    </div>
                    <div class="status-tag delivered">
                        <i class="fas fa-check-circle"></i>
                        <span>${translations[currentLanguage].history_status_completed}</span>
                    </div>
                </div>
                <i class="fas fa-chevron-down expand-chevron"></i>
            </div>
            
            <div class="order-expandable-content">
                <div class="order-content-panel">
                    <hr class="ultra-fine-separator">
                    <div class="collection-details">
                        <h4 class="content-title">Koleksi yang Dipesan (${order.items.length})</h4>
                        <ul class="collection-item-list">
                            ${order.items.map(item => `
                                <li class="collection-item">
                                  <img src="${item.image[0]}" alt="${item.name}" class="collection-item-image">

                                    <div class="collection-item-info">
                                        <p class="item-name">${item.name} (${item.size})</p>
                                        <p class="item-meta">Kuantitas: ${item.quantity}</p>
                                    </div>
                                    <p class="item-price">${formatRupiah(item.price * item.quantity)}</p>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    <hr class="ultra-fine-separator">
                    <div class="order-actions-ultra">
                        <button class="btn btn-secondary track-order-btn">
                            <i class="fas fa-truck"></i> ${translations[currentLanguage].history_track_order}
                        </button>
                        ${returnButtonHTML} 
                        <button class="btn btn-primary buy-again-btn">
                            <i class="fas fa-redo-alt"></i> ${translations[currentLanguage].history_buy_again}
                        </button>
                    </div>
                </div>
            </div>
        `;

        orderCard.querySelector('.order-summary-header').addEventListener('click', () => {
            orderCard.classList.toggle('expanded');
        });

        orderCard.querySelector('.track-order-btn').onclick = (e) => {
            e.stopPropagation();
            window.open('https://cekresi.com/', '_blank');
        };

        orderCard.querySelector('.buy-again-btn').addEventListener('click', (e) => {
            e.stopPropagation(); 
            if (checkoutFormContainer.style.display === 'block') {
                showToast('checkout_in_progress_warning', 'warning');
                return;
            }
            let itemsAddedCount = 0;
            order.items.forEach(item => {
                const product = products.find(p => p.id === item.id);
                if (product && product.stock >= item.quantity) {
                    addToCart(item.id, item.size, item.quantity, null);
                    itemsAddedCount++;
                } else {
                    showToast('toast_stock_not_enough', "error", { name: item.name, size: item.size });
                }
            });
            if (itemsAddedCount > 0) {
                showToast('toast_order_rebought', 'success', { orderId: order.orderId });
                document.getElementById('keranjang').scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        orderHistoryList.appendChild(orderCard);
    });
};

 const renderAllReviews = () => {
        const allReviews = [];
        products.forEach(product => {
            if (product.reviews && product.reviews.length > 0) {
                product.reviews.forEach(review => {
                    allReviews.push({ ...review, productName: product.name, productImage: product.image[0] });

                });
            }
        });
        const filteredReviews = currentRatingFilter === 0
            ? allReviews
            : allReviews.filter(review => review.rating === currentRatingFilter);

        filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (filteredReviews.length === 0) {
            if (currentRatingFilter > 0) {
                 emptyAllReviewsMessage.textContent = `Tidak ada ulasan dengan rating ${currentRatingFilter} bintang.`;
            } else {
                 emptyAllReviewsMessage.textContent = "Belum ada ulasan yang diberikan.";
            }
            emptyAllReviewsMessage.style.display = 'block';
            allReviewsList.innerHTML = '';
            return;
        }
        emptyAllReviewsMessage.style.display = 'none';
        allReviewsList.innerHTML = filteredReviews.map(review => {
            const reviewDate = new Date(review.date + 'T00:00:00').toLocaleDateString('id-ID', {
                day: 'numeric', month: 'long', year: 'numeric'
            });
            return `
                <div class="review-card">
                    <img src="${review.productImage}" alt="${review.productName}" class="review-card-product-img">
                    <div class="review-card-content">
                         <p class="review-card-product-name">Ulasan untuk: <strong>${review.productName}</strong></p>
                        <div class="review-item">
                            <div class="review-header">
                                <strong class="review-author">${review.author}</strong>
                                <span class="review-date">${reviewDate}</span>
                            </div>
                            <div class="review-rating">${generateStarsHTML(review.rating)}</div>
                            <p class="review-text">${review.text}</p>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    };
    
    const handleProfileUpdate = (e) => {
        e.preventDefault();
        const currentUser = getLocalStorageItem('luxuliverCurrentUser');
        if (!currentUser) return;

        const newName = document.getElementById('profile-name').value;
        const newAddress = document.getElementById('profile-address').value;

        currentUser.name = newName;
        currentUser.address = newAddress;

        let accounts = getLocalStorageItem('luxuliverAccounts', []);
        const accountIndex = accounts.findIndex(acc => acc.phone === currentUser.phone);
        if (accountIndex !== -1) {
            accounts[accountIndex].name = newName;
            accounts[accountIndex].address = newAddress;
        }
        
        localStorage.setItem('luxuliverCurrentUser', JSON.stringify(currentUser));
        localStorage.setItem('luxuliverAccounts', JSON.stringify(accounts));

        showToast('toast_profile_updated', 'success');
        updateAuthStateUI(); 
        closeModal(profileModal);
    };
const handleChangePassword = (e) => {
        e.preventDefault();
        const currentUser = getLocalStorageItem('luxuliverCurrentUser');
        if (!currentUser) return;

        const oldPassword = document.getElementById('old-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmNewPassword = document.getElementById('confirm-new-password').value;
        const errorMsg = document.getElementById('change-password-error-msg');

        if (oldPassword !== currentUser.password) {
            errorMsg.textContent = translations[currentLanguage].toast_old_password_wrong;
            errorMsg.style.display = 'block';
            return;
        }

        if (newPassword !== confirmNewPassword || !newPassword) {
            errorMsg.textContent = translations[currentLanguage].toast_password_not_match;
            errorMsg.style.display = 'block';
            return;
        }
        
        currentUser.password = newPassword;

        let accounts = getLocalStorageItem('luxuliverAccounts', []);
        const accountIndex = accounts.findIndex(acc => acc.phone === currentUser.phone);
        if (accountIndex !== -1) {
            accounts[accountIndex].password = newPassword;
        }

        localStorage.setItem('luxuliverCurrentUser', JSON.stringify(currentUser));
        localStorage.setItem('luxuliverAccounts', JSON.stringify(accounts));

        showToast('toast_password_changed', 'success');
        document.getElementById('change-password-form').reset();
        errorMsg.style.display = 'none';
        closeModal(profileModal);
    };


 const renderLoyaltySection = () => {
    if (!currentLoyaltyPointsSpan) return;

    currentLoyaltyPointsSpan.textContent = userLoyaltyPoints;
    loyaltyTiersContainer.innerHTML = '';
    emptyLoyaltyMessage.style.display = 'none'; 

    let nextTierInfo = null;
    let allUnlocked = true;

    loyaltyTiers.forEach(tier => {
        const tierCard = document.createElement('div');
        tierCard.className = 'loyalty-tier-card';
        let tierStatusText = '';
        let unlockedMessage = '';
        let tierClass = '';

        if (userLoyaltyPoints >= tier.points) {
            tierClass = 'unlocked-card';
            tierStatusText = translations[currentLanguage].loyalty_tier_unlocked;
            unlockedMessage = translations[currentLanguage][tier.message];
        } else {
            tierClass = 'locked-card';
            tierStatusText = translations[currentLanguage].loyalty_tier_locked;
            if (!nextTierInfo) { 
                nextTierInfo = {
                    pointsNeeded: tier.points - userLoyaltyPoints,
                    tierName: translations[currentLanguage][`${tier.class}_title`]
                };
            }
            allUnlocked = false;
        }

        tierCard.classList.add(tierClass);
        tierCard.innerHTML = `
            <h3>${translations[currentLanguage][`${tier.class}_title`]}</h3>
            <div class="points-threshold">${tier.points} Poin</div>
            <p>${unlockedMessage}</p>
            <span class="tier-status ${tierClass === 'unlocked-card' ? 'unlocked' : 'locked'}">${tierStatusText}</span>
        `;
        loyaltyTiersContainer.appendChild(tierCard);
    });

    if (allUnlocked) {
        loyaltyNextTierDiv.textContent = translations[currentLanguage].loyalty_next_tier_unlocked_all;
    } else if (nextTierInfo) {
        loyaltyNextTierDiv.textContent = translations[currentLanguage].loyalty_next_tier_progress(nextTierInfo.pointsNeeded, nextTierInfo.tierName);
    } else {
        loyaltyNextTierDiv.textContent = '';
    }

    if (userLoyaltyPoints === 0 && loyaltyTiers.length > 0) {
        emptyLoyaltyMessage.style.display = 'block';
        loyaltyTiersContainer.style.display = 'none';
        loyaltyNextTierDiv.style.display = 'none';
    } else {
        emptyLoyaltyMessage.style.display = 'none';
        loyaltyTiersContainer.style.display = 'grid';
        loyaltyNextTierDiv.style.display = 'block';
    }
};

const renderArchive = () => {
    const archiveContainer = document.getElementById('archive-list');
    const emptyArchiveMessage = document.getElementById('empty-archive-message');
    if (!archiveContainer || !emptyArchiveMessage) return;

    const archivedProducts = products.filter(p => p.status === 'archived');

    if (archivedProducts.length === 0) {
        emptyArchiveMessage.style.display = 'flex';
        archiveContainer.style.display = 'none';
        return;
    }
    
    emptyArchiveMessage.style.display = 'none';
    archiveContainer.style.display = 'grid'; 
    archiveContainer.innerHTML = '';

    let ownedProductIds = new Set(); 
    if (isAuthenticated()) {
        const currentUser = getLocalStorageItem('luxuliverCurrentUser');
        if (currentUser.history && currentUser.history.length > 0) {
            currentUser.history.forEach(order => {
                order.items.forEach(item => {
                    ownedProductIds.add(item.id);
                });
            });
        }
    }

    archivedProducts.forEach(product => {
        const isOwned = ownedProductIds.has(product.id);
        
       
        const cardHTML = `
            <div class="archive-card ${isOwned ? 'is-owned' : ''}">
                <div class="archive-card-image-container">
                    <img src="${product.image}" alt="${product.name}" class="archive-card-image">
                </div>
                <div class="archive-card-info">
                    <h3 class="archive-card-name">${product.name}</h3>
                    <p class="archive-card-description">${product.description}</p>
                </div>
            </div>
        `;
        archiveContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
};

const renderSoldOutPage = () => {
    const soldOutContainer = document.getElementById('sold-out-grid');
    const emptySoldOutMessage = document.getElementById('empty-sold-out-message');
    const soldOutCta = document.getElementById('sold-out-cta-container');

    if (!soldOutContainer || !emptySoldOutMessage || !soldOutCta) return;

    const soldOutProducts = products.filter(p => p.stock === 0 && p.status !== 'archived');

    if (soldOutProducts.length === 0) {
        emptySoldOutMessage.style.display = 'flex';
        soldOutContainer.style.display = 'none';
        soldOutCta.style.display = 'none';
        return;
    }

    emptySoldOutMessage.style.display = 'none';
    soldOutContainer.style.display = 'block';
    soldOutCta.style.display = 'block';
    soldOutContainer.innerHTML = '';

    soldOutProducts.forEach(product => {
        const cardHTML = `
            <div class="sold-out-card">
                <div class="sold-out-card-image-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="sold-out-card-image">
                </div>
                <div class="sold-out-card-info">
                    <span class="sold-out-card-status" data-lang-key="sold_out_badge">${translations[currentLanguage].sold_out_badge}</span>
                    <h3 class="sold-out-card-name">${product.name}</h3>
                    <p class="sold-out-card-description">${product.description}</p>
                    <div class="sold-out-card-meta">
                        <span>Dirilis: <strong>Musim Semi 2025</strong></span>
                        <span>Desain: <strong>${product.design.charAt(0).toUpperCase() + product.design.slice(1)}</strong></span>
                    </div>
                </div>
            </div>
        `;
        soldOutContainer.insertAdjacentHTML('beforeend', cardHTML);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.sold-out-card').forEach(card => {
        observer.observe(card);
    });
};

 const renderNewCollection = () => {
    const newCollectionGrid = document.getElementById('new-collection-grid');
    const emptyMessage = document.getElementById('empty-new-collection-message');

    if (!newCollectionGrid || !emptyMessage) return;


    const today = new Date();
    
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    today.setHours(23, 59, 59, 999); 
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const newProducts = products.filter(p => {
        if (!p.dateAdded) return false;
        const addedDate = new Date(p.dateAdded);
        
        return addedDate >= thirtyDaysAgo && addedDate <= today && p.stock > 0 && p.status !== 'archived';
    });
    
    newProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

    if (newProducts.length === 0) {
        newCollectionGrid.style.display = 'none';
        emptyMessage.style.display = 'flex';
    } else {
        newCollectionGrid.style.display = 'grid';
        emptyMessage.style.display = 'none';
        newCollectionGrid.innerHTML = newProducts.map(product => createProductCardHTML(product)).join('');
        attachProductCardListeners(newCollectionGrid);
    }
};

 const updateLoyaltyPremiumVisuals = () => {
    document.body.classList.remove('loyalty-tier-500', 'loyalty-tier-1000', 'loyalty-tier-1500');

    if (userLoyaltyPoints >= 1500) {
        document.body.classList.add('loyalty-tier-1500');
    } else if (userLoyaltyPoints >= 1000) {
        document.body.classList.add('loyalty-tier-1000');
    } else if (userLoyaltyPoints >= 500) {
        document.body.classList.add('loyalty-tier-500');
    }
};

const saveComparisonList = () => {
        if (isAuthenticated()) {
            saveCurrentUserSession();
        } else {
            localStorage.setItem('comparisonList', JSON.stringify(comparisonList));
        }
    };


const toggleCompare = (productId) => {
    if (!isAuthenticated()) {
        openModal(document.getElementById('auth-modal'));
        return;
    }
    
    const productIndex = comparisonList.indexOf(productId);

    if (productIndex > -1) {

        comparisonList.splice(productIndex, 1);
    } else {

        if (comparisonList.length >= MAX_COMPARISON_ITEMS) {
            showToast('toast_max_compare_items', 'warning');
            return;
        }
        comparisonList.push(productId);
    }
    
    saveComparisonList();
    renderComparisonTray();
    updateAllCompareButtons();
};


const updateAllCompareButtons = () => {
    document.querySelectorAll('.compare-btn').forEach(button => {
        const productId = button.closest('.product-card').dataset.productId;
        const isSelected = comparisonList.includes(productId);
        button.classList.toggle('selected', isSelected);
        
        button.querySelector('i').className = isSelected ? 'fas fa-check' : 'fas fa-layer-group';
    });
};



const renderComparisonTray = () => {
    if (comparisonList.length === 0) {
        comparisonTray.classList.remove('show');
        return;
    }

    comparisonItemsContainer.innerHTML = '';
    comparisonList.forEach(productId => {
        const product = products.find(p => p.id === productId);
        if (product) {
            const itemEl = document.createElement('div');
            itemEl.className = 'comparison-item';
            itemEl.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <span>${product.name}</span>
                <button class="remove-comparison-item" data-product-id="${productId}" title="Hapus">&times;</button>
            `;
            comparisonItemsContainer.appendChild(itemEl);
        }
    });


    comparisonItemsContainer.querySelectorAll('.remove-comparison-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            toggleCompare(e.currentTarget.dataset.productId);
        });
    });


    compareNowBtn.disabled = comparisonList.length < 2;
    compareNowBtn.textContent = `${translations[currentLanguage].compare_now} (${comparisonList.length})`;

    comparisonTray.classList.add('show');
};


const renderComparisonModal = () => {
    const productsToCompare = comparisonList.map(id => products.find(p => p.id === id)).filter(p => p);

    let tableHTML = '<table class="comparison-table">';

    tableHTML += '<thead><tr><th class="attribute-header">Produk</th>';
    productsToCompare.forEach(product => {
        tableHTML += `
            <th>
                <div class="product-header">
                    <img src="${product.image}" alt="${product.name}">
                    <p>${product.name}</p>
                    
                    <button class="btn btn-primary btn-sm btn-select-option" data-product-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Pilih Opsi
                    </button>
                    </div>
            </th>`;
    });
    tableHTML += '</tr></thead>';


    tableHTML += '<tbody>';
    const attributes = [
        { key: 'price', label: 'Harga' },
        { key: 'design', label: 'Desain' },
        { key: 'color', label: 'Warna' },
        { key: 'stock', label: 'Ketersediaan' },
        { key: 'rating', label: 'Rating' }
    ];

    attributes.forEach(attr => {
        tableHTML += `<tr><td class="attribute-header">${attr.label}</td>`;
        productsToCompare.forEach(product => {
            let value = '';
            switch (attr.key) {
                case 'price':
                    value = formatRupiah(getPriceBySize(product.basePrice, 'M'));
                    break;
                case 'design':
                    value = product.design;
                    break;
                case 'color':
                    value = product.color;
                    break;
                case 'stock':
                    value = product.stock > 0 ? (product.status === 'preorder' ? 'Pre-Order' : 'Tersedia') : 'Habis';
                    break;
                case 'rating':
                    const totalReviews = product.reviews ? product.reviews.length : 0;
                    const avgRating = totalReviews > 0 ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews : 0;
                    value = `<div class="rating-cell">${generateStarsHTML(Math.round(avgRating))} (${avgRating.toFixed(1)})</div>`;
                    break;
            }
            tableHTML += `<td class="text-capitalize">${value}</td>`;
        });
        tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';

    comparisonTableContainer.innerHTML = tableHTML;
    

    comparisonTableContainer.querySelectorAll('.btn-select-option').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.currentTarget.dataset.productId;
            
            closeModal(comparisonModal);
            
            setTimeout(() => {
                openQuickViewModal(productId);
            }, 300); 
        });
    });
    
    openModal(comparisonModal);
};



    const applyTheme = (theme) => {
    body.classList.toggle('dark-mode', theme === 'dark');
};

    const renderSearchSuggestions = (query) => {
        if (!query) {
            searchSuggestionsContainer.style.display = 'none';
            return;
        }
        const filteredProducts = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
        if (filteredProducts.length > 0) {
            searchSuggestionsContainer.innerHTML = filteredProducts.map(product => `
                <div class="suggestion-item" data-product-name="${product.name}">
                    <img src="${product.image[0]}" alt="${product.name}">
                    <span>${product.name}</span>
                </div>`).join('');
            searchSuggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    searchInput.value = item.dataset.productName;
                    searchSuggestionsContainer.style.display = 'none';
                    renderAllProductShowcases(item.dataset.productName);
                });
            });
            searchSuggestionsContainer.style.display = 'block';
        } else {
            searchSuggestionsContainer.style.display = 'none';
        }
    };
    

const showMainContentSection = (targetId) => {
    document.body.classList.remove('single-section-view');

    const homePageSections = ['#koleksi', '#faq'];

    
    const allSections = ['#koleksi', '#keranjang', '#favorit', '#riwayat-pesanan', '#arsip', '#koleksi-habis', '#ulasan', '#loyalty-points', '#terakhir-dilihat', '#koleksi-baru'];

    const dividers = document.querySelectorAll('.section-divider');
    const searchSection = document.getElementById('search-section');
    const heroSection = document.getElementById('hero');
    const footer = document.querySelector('footer');


    [heroSection, searchSection, footer, ...dividers, ...allSections.map(sel => document.querySelector(sel))].forEach(el => {
        if (el) el.style.display = 'none';
    });

    if (targetId === '#hero') {

        [searchSection, footer].forEach(el => {
            if(el) el.style.display = 'block';
        });
        if(heroSection) heroSection.style.display = 'flex';

        homePageSections.forEach(sel => {
            const el = document.querySelector(sel);
            if (el) el.style.display = 'block';
        });

        dividers.forEach(divider => divider.style.display = 'block');

    } else {
       
        document.body.classList.add('single-section-view');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
           
            targetElement.style.display = 'block';
        }


        if (targetId === '#ulasan') {
            renderAllReviews();
        } else if (targetId === '#loyalty-points') { 
            renderLoyaltySection();
        } else if (targetId === '#arsip') {
            renderArchive();
        } else if (targetId === '#koleksi-habis') { 
            renderSoldOutPage();                    
        } else if (targetId === '#terakhir-dilihat') {
            renderRecentlyViewed();
        }
        
        else if (targetId === '#koleksi-baru') {
            renderNewCollection();
        }
    }
};

 const initializeNavigation = () => {
    document.querySelectorAll('#main-nav a, .sidebar-menu a, .back-to-collection-btn').forEach(link => {
        link.addEventListener('click', e => {

            const href = e.currentTarget.getAttribute('href'); 


            const gatedHeaderLinks = ['#koleksi', '#keranjang'];
            if (link.closest('#main-nav') && gatedHeaderLinks.includes(href) && !isAuthenticated()) {
                e.preventDefault();
                openModal(document.getElementById('auth-modal'));
                return; 
            }


            if (href && href.startsWith('#')) {
                e.preventDefault();

                const targetElement = document.querySelector(href);
                if (targetElement) {
                    showMainContentSection(href);
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
               
                document.querySelectorAll('#main-nav a, .sidebar-menu a').forEach(l => l.classList.remove('active'));
                document.querySelectorAll(`a[href="${href}"]`).forEach(l => l.classList.add('active'));
               
                if (document.body.classList.contains('sidebar-open')) {
                    toggleSidebar();
                }
            }
        });
    });
};


    const handleScrollProgress = () => {
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (!progressBar) return;
        const totalScrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        progressBar.style.width = totalScrollableHeight <= 0 ? '0%' : `${(window.scrollY / totalScrollableHeight) * 100}%`;
    };

    const toggleSidebar = () => {
        body.classList.toggle('sidebar-open');
        body.classList.toggle('no-scroll', body.classList.contains('sidebar-open'));
        if (body.classList.contains('sidebar-open')) {
            renderSoldOutCollection();
        }
    };

    const updateResetButtonVisibility = () => {
        if (resetFiltersBtn) {
            resetFiltersBtn.style.display = Object.values(activeFilters).some(v => v !== 'all') ? 'block' : 'none';
        }
    };

const updateFilterUI = () => {
    document.querySelectorAll('#sidebar .sidebar-filter').forEach(link => {
        const filterType = link.dataset.filterType;
        const filterValue = link.dataset.filterValue;
        if (filterType) {
            link.classList.toggle('active', activeFilters[filterType] === filterValue);
        }
    });
};

    const initializeSidebar = () => {
        sidebarToggleBtn.addEventListener('click', toggleSidebar);
        sidebarCloseBtn.addEventListener('click', toggleSidebar);
        sidebarOverlay.addEventListener('click', toggleSidebar);
        document.querySelectorAll('.sidebar-category-toggle').forEach(toggle => {
            toggle.addEventListener('click', e => {
                e.preventDefault();
                toggle.parentElement.classList.toggle('open');
            });
        });
        
        sidebarSubmenus.forEach(submenu => {
    submenu.addEventListener('click', e => {
        const target = e.target.closest('.sidebar-filter');
        if (!target) return;
        e.preventDefault();
        activeFilters[target.dataset.filterType] = target.dataset.filterValue; 

        searchInput.value = '';
        renderAllProductShowcases();
        updateFilterUI();
        updateResetButtonVisibility();
        setTimeout(toggleSidebar, 200);
    });
});
        resetFiltersBtn.addEventListener('click', () => {
            activeFilters = { availability: 'all', color: 'all', design: 'all' };
            searchInput.value = '';
            updateFilterUI();
            renderAllProductShowcases();
            updateResetButtonVisibility();
            setTimeout(toggleSidebar, 200);
        });
        
        const highlightVideosBtn = document.getElementById('highlight-videos-btn');
        const highlightPhotosBtn = document.getElementById('highlight-photos-btn');

        if (highlightVideosBtn) {
            highlightVideosBtn.addEventListener('click', e => {
                e.preventDefault();
                toggleSidebar();
                setTimeout(() => {
                    openModal(videoGalleryModal);
                    videoGalleryModal.querySelectorAll('video').forEach(video => {
                        video.play().catch(error => console.error("Error attempting to autoplay video:", error));
                    });
                }, 300);
            });
        }

        if (highlightPhotosBtn) {
            highlightPhotosBtn.addEventListener('click', e => {
                e.preventDefault();
                toggleSidebar();
                setTimeout(() => {
                    renderPhotoGallery();
                }, 300);
            });
        };
      }
    
   
const updateDynamicModals = (lang) => {
    const langData = translations[lang];

    const fitFareModal = document.getElementById('fit-fare-modal');
    if (fitFareModal) {
        fitFareModal.querySelector('#fit-fare-choices h3').textContent = langData.fit_fare_title;
        fitFareModal.querySelector('[data-target-view="ongkir"] span').textContent = langData.fit_fare_shipping_option;
        fitFareModal.querySelector('[data-target-view="pria"] span').textContent = langData.fit_fare_men_option;
        fitFareModal.querySelector('[data-target-view="wanita"] span').textContent = langData.fit_fare_women_option;
        
        const ongkirView = fitFareModal.querySelector('#fit-fare-view-ongkir');
        ongkirView.querySelector('h3').textContent = langData.fit_fare_shipping_title;
        const ongkirList = ongkirView.querySelectorAll('li');
        ongkirList[0].innerHTML = `<strong>Jabodetabek:</strong><br>${langData.fit_fare_shipping_jabodetabek.split(': ')[1]}`;
        ongkirList[1].innerHTML = `<strong>Pulau Jawa (Luar Jabodetabek):</strong><br>${langData.fit_fare_shipping_java.split(': ')[1]}`;
        ongkirList[2].innerHTML = `<strong>Luar Pulau Jawa:</strong><br>${langData.fit_fare_shipping_outside_java.split(': ')[1]}`;
        ongkirView.querySelector('.fit-fare-disclaimer').textContent = langData.fit_fare_disclaimer;

        const priaView = fitFareModal.querySelector('#fit-fare-view-pria');
        priaView.querySelector('h3').textContent = langData.fit_fare_men_title;
        priaView.querySelector('.fit-fare-disclaimer').textContent = langData.fit_fare_disclaimer;
        
        const wanitaView = fitFareModal.querySelector('#fit-fare-view-wanita');
        wanitaView.querySelector('h3').textContent = langData.fit_fare_women_title;
        wanitaView.querySelector('.fit-fare-disclaimer').textContent = langData.fit_fare_disclaimer;
    }

   
    const blogModal = document.getElementById('blog-modal');
    if (blogModal) {
        blogModal.querySelector('h3').textContent = langData.blog_modal_title;
        blogModal.querySelector('p').textContent = langData.blog_modal_subtitle;
        const articleLinks = blogModal.querySelectorAll('.article-link');
        articleLinks[0].querySelector('h4').textContent = langData.article1_title;
        articleLinks[0].querySelector('p').textContent = langData.article1_desc;
        articleLinks[1].querySelector('h4').textContent = langData.article2_title;
        articleLinks[1].querySelector('p').textContent = langData.article2_desc;
        articleLinks[2].querySelector('h4').textContent = langData.article3_title;
        articleLinks[2].querySelector('p').textContent = langData.article3_desc;
    }

    const populateArticle = (articleId, contentKey) => {
        const articleModal = document.getElementById(articleId);
        if (articleModal && langData[contentKey]) {
            const content = langData[contentKey];
            articleModal.querySelector('h2').textContent = content.h2;
            const articleContent = articleModal.querySelector('.article-content');
            Object.keys(content).forEach(key => {
                const element = articleContent.querySelector(`[data-content-key="${key}"]`);
                if(element) {
                   if (key === 'ul1' || key === 'ul2' || key === 'table') {
                        element.innerHTML = content[key];
                    } else {
                        element.innerHTML = content[key]; 
                    }
                }
            });
        }
    };
    
    const updateFullArticle = (modalId, content) => {
        const modal = document.getElementById(modalId);
        if (!modal || !content) return;
        const article = modal.querySelector('.article-content');
        article.innerHTML = `
            <h2>${content.h2}</h2>
            <p>${content.p1}</p>
            <h4>${content.h4_1}</h4><p>${content.p2}</p>
            <h4>${content.h4_2}</h4><p>${content.p3}</p>
            <h4>${content.h4_3}</h4><p>${content.p4}</p>
            <h4>${content.h4_4}</h4><p>${content.p5}</p>
            <h4>${content.h4_5}</h4><p>${content.p6}</p>
            <h4>${content.h4_6}</h4><p>${content.p7}</p>
            <h4>${content.h4_7}</h4><p>${content.p8}</p>
            <p>${content.p9}</p>
        `;
        if (content.ul1) {
            const h4_1 = article.querySelector('h4:nth-of-type(1)');
            h4_1.insertAdjacentHTML('afterend', `<ul>${content.ul1}</ul>`);
            h4_1.nextElementSibling.nextElementSibling.remove();
        }
         if (content.table) {
            const h4_3 = article.querySelector('h4:nth-of-type(3)');
            h4_3.insertAdjacentHTML('afterend', content.table);
            h4_3.nextElementSibling.nextElementSibling.remove();
        }
    }
    
    updateFullArticle('article1-modal', langData.article1_content);
   
    const article2 = document.getElementById('article2-modal')?.querySelector('.article-content');
    if(article2) article2.innerHTML = `<h2>${langData.article2_content.h2}</h2><p>${langData.article2_content.p1}</p><h4>${langData.article2_content.h4_1}</h4><p>${langData.article2_content.p2}</p><ul>${langData.article2_content.ul1}</ul><h4>${langData.article2_content.h4_2}</h4><p>${langData.article2_content.p3}</p><ul>${langData.article2_content.ul2}</ul><h4>${langData.article2_content.h4_3}</h4><p>${langData.article2_content.p4}</p><p>${langData.article2_content.p5}</p>`;
    const article3 = document.getElementById('article3-modal')?.querySelector('.article-content');
    if(article3) article3.innerHTML = `<h2>${langData.article3_content.h2}</h2><p>${langData.article3_content.p1}</p><h4>${langData.article3_content.h4_1}</h4><p>${langData.article3_content.p2}</p><h4>${langData.article3_content.h4_2}</h4><p>${langData.article3_content.p3}</p><ul>${langData.article3_content.ul1}</ul><h4>${langData.article3_content.h4_3}</h4><p>${langData.article3_content.p4}</p>${langData.article3_content.table}<h4>${langData.article3_content.h4_4}</h4><p>${langData.article3_content.p5}</p><p>${langData.article3_content.p6}</p>`;

    document.querySelectorAll('.article-back-btn').forEach(btn => {
        btn.innerHTML = `<i class="fas fa-arrow-left"></i> ${langData.article_back_button}`;
    });
};

    const setLanguage = (lang) => {
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.dataset.langKey;
            if (translations[lang]?.[key] && typeof translations[lang][key] !== 'function') {
                if (el.matches('.faq-question span, .policy-content p, .policy-content h3, .footer-section .social-media span, .recommendations-title')) {
                    el.innerHTML = translations[lang][key];
                } else {
                    const icon = el.querySelector('i');
                    const textNode = [...el.childNodes].find(node => node.nodeType === 3 && node.textContent.trim());
                    if (textNode) textNode.textContent = ` ${translations[lang][key]} `;
                    else if (el.querySelector('span[data-lang-key]')) el.querySelector('span[data-lang-key]').textContent = translations[lang][key];
                    else {
                        el.innerHTML = translations[lang][key];
                        if (icon) el.prepend(icon);
                    }
                }
            }
        });
        document.querySelectorAll('[data-lang-key-placeholder]').forEach(el => {
            const key = el.dataset.langKeyPlaceholder;
            if (translations[lang]?.[key]) el.placeholder = translations[lang][key];
        });
        languageToggleButtons.querySelectorAll('.lang-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
        renderAllProductShowcases();
        refreshAllCartViews();
        renderFavorites();
        renderRecentlyViewed();
        renderOrderHistory();
        updateDynamicModals(lang); 
    };

    const initializeFAQ = () => {
        document.querySelectorAll('.faq-question').forEach(q => q.addEventListener('click', () => q.parentElement.classList.toggle('active')));
    };

   
    const initializeAllModalTriggers = () => {
        document.addEventListener('click', e => {
            const trigger = e.target.closest('[data-modal-target]');
            if (!trigger) return;

            e.preventDefault();

           
            if (trigger.dataset.closeCurrent === 'true') {
                const currentModal = trigger.closest('.modal');
                if (currentModal) {
                    closeModal(currentModal);
                }
            }

            const modalId = trigger.dataset.modalTarget;
            const modal = document.getElementById(modalId);

            if (modal) {
                if (body.classList.contains('sidebar-open')) {
                    toggleSidebar();
                }
                
               
                setTimeout(() => {
                    if (modal.id === 'size-guide-modal') {
                        renderSizeGuide();
                    } else {
                        openModal(modal);
                    }
                }, 250);
            }
        });
    };

    const initializeNotifications = () => {
        notificationSidebarBtn?.addEventListener('click', e => {
            e.preventDefault();
            renderNotifications('all');
            notificationTabs?.querySelectorAll('.notification-tab-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.filter === 'all');
            });
            openModal(notificationModal);
            if (body.classList.contains('sidebar-open')) {
                toggleSidebar();
            }
        });

        notificationTabs?.addEventListener('click', e => {
            const target = e.target.closest('.notification-tab-btn');
            if (target) {
                notificationTabs.querySelectorAll('.notification-tab-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                target.classList.add('active');
                renderNotifications(target.dataset.filter);
            }
        });
    };

    function applyRippleEffect() {
        document.addEventListener('click', function(e) {
            const target = e.target.closest('.btn');
            if (target) {
                target.querySelector(".ripple")?.remove();
                const rect = target.getBoundingClientRect();
                const ripple = document.createElement('span');
                const diameter = Math.max(target.clientWidth, target.clientHeight);
                const radius = diameter / 2;
                Object.assign(ripple.style, { width: `${diameter}px`, height: `${diameter}px`, left: `${e.clientX - rect.left - radius}px`, top: `${e.clientY - rect.top - radius}px` });
                ripple.classList.add('ripple');
                target.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            }
        });
    }

    function implementSharedElementTransition(startElement, targetModal, onTransitionEndCallback) {
        const startRect = startElement.getBoundingClientRect();
        const clone = startElement.cloneNode(true);
        clone.classList.add('shared-element-clone');
        Object.assign(clone.style, { top: `${startRect.top}px`, left: `${startRect.left}px`, width: `${startRect.width}px`, height: `${startRect.height}px` });
        document.body.appendChild(clone);
        targetModal.style.transition = 'none';
        targetModal.classList.add('show');
        const modalImage = targetModal.querySelector('.modal-body img');
        const modalContent = targetModal.querySelector('.modal-content');
        modalContent.style.opacity = '0';
        modalImage.style.opacity = '0';
        const endRect = modalImage.getBoundingClientRect();
        const reverseAnimation = () => {
            const currentStartRect = startElement.getBoundingClientRect();
            Object.assign(clone.style, { transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)', top: `${currentStartRect.top}px`, left: `${currentStartRect.left}px`, width: `${currentStartRect.width}px`, height: `${currentStartRect.height}px`, borderRadius: 'var(--border-radius-base)', opacity: '1' });
            modalContent.style.transition = 'opacity 0.3s ease-out';
            modalContent.style.opacity = '0';
            clone.addEventListener('transitionend', () => {
                clone.remove();
                targetModal.classList.remove('show');
                targetModal.style.transition = '';
                document.body.classList.remove('no-scroll');
                targetModal.removeEventListener('click', closeListener);
            }, { once: true });
        };
        const closeListener = e => { if (e.target === targetModal || e.target.classList.contains('close-button')) reverseAnimation(); };
        targetModal.addEventListener('click', closeListener);
        requestAnimationFrame(() => Object.assign(clone.style, { top: `${endRect.top}px`, left: `${endRect.left}px`, width: `${endRect.width}px`, height: `${endRect.height}px`, borderRadius: '0' }));
        clone.addEventListener('transitionend', () => {
            modalImage.style.opacity = '1';
            modalContent.style.transition = 'opacity 0.4s ease-in';
            modalContent.style.opacity = '1';
            clone.style.opacity = '0';
            if (onTransitionEndCallback) onTransitionEndCallback();
        }, { once: true });
        document.body.classList.add('no-scroll');
    }

   const handleSearchAction = (e) => {
    e.preventDefault();
    if (!isAuthenticated()) {
        openModal(document.getElementById('auth-modal'));
    } else {
        renderAllProductShowcases(searchInput.value.trim());
        searchSuggestionsContainer.style.display = 'none';
    }
};

searchButton.addEventListener('click', handleSearchAction);

searchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        handleSearchAction(e);
    }
});

searchInput.addEventListener('focus', (e) => {
    if (!isAuthenticated()) {
        e.preventDefault();
        searchInput.blur();
        openModal(document.getElementById('auth-modal'));
    }
});

const exploreCollectionsBtn = document.getElementById('explore-collections-btn');
if (exploreCollectionsBtn) {
    
    exploreCollectionsBtn.addEventListener('click', (e) => {
        if (!isAuthenticated()) {
            e.preventDefault(); 
            openModal(document.getElementById('auth-modal'));
        }
    });
}

searchInput.addEventListener('input', () => renderSearchSuggestions(searchInput.value.trim()));

document.addEventListener('click', e => {
    if (!e.target.closest('.search-input-wrapper')) searchSuggestionsContainer.style.display = 'none';
});

if(profileSidebarBtn) {
    profileSidebarBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (isAuthenticated()) {
            const currentUser = getLocalStorageItem('luxuliverCurrentUser');
            document.getElementById('profile-name').value = currentUser.name || '';
            document.getElementById('profile-address').value = currentUser.address || '';
            
            document.getElementById('profile-info-error-msg').style.display = 'none';
            document.getElementById('change-password-error-msg').style.display = 'none';
            document.getElementById('change-password-form').reset();

            openModal(profileModal);
        } else {
            openModal(document.getElementById('auth-modal'));
        }
    });
}
    
    document.getElementById('profile-info-form')?.addEventListener('submit', handleProfileUpdate);
    document.getElementById('change-password-form')?.addEventListener('submit', handleChangePassword);


    checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showToast('empty_cart', 'warning');
        return;
    }

    let stockSufficient = true;
    const insufficientItems = [];
    cart.forEach(item => {
        const productInDB = products.find(p => p.id === item.id);
        if (!productInDB || productInDB.stock < item.quantity) {
            stockSufficient = false;
            insufficientItems.push(`${item.name} (${item.size})`);
        }
    });

    if (!stockSufficient) {
        showToast(`Maaf, stok untuk item berikut tidak mencukupi: ${insufficientItems.join(', ')}. Mohon perbarui keranjang Anda.`, 'error');
        return; 
    }


    const elementsToHide = [cartSummary, cartItemsContainer, emptyCartMessage, savedForLaterSection];
    elementsToHide.forEach(el => el?.classList.add('section-fade-out'));
    setTimeout(() => {
        elementsToHide.forEach(el => {
            if (el) {
                el.style.display = 'none';
                el.classList.remove('section-fade-out');
            }
        });
        checkoutFormContainer.style.display = 'block';
        Object.assign(checkoutFormContainer.style, { opacity: '1', transform: 'none' });
        currentStep = 1;
        updateCheckoutUI();
        

        if (isAuthenticated()) {
            const currentUser = getLocalStorageItem('luxuliverCurrentUser');
            if (currentUser) {
                document.getElementById('customer-name').value = currentUser.name || '';
                document.getElementById('customer-phone').value = currentUser.phone || '';
                document.getElementById('customer-address').value = currentUser.address || '';
            }

            useSavedAddressBtn.style.display = 'none';
        } else {

            useSavedAddressBtn.style.display = localStorage.getItem('savedAddress') ? 'inline-flex' : 'none';
        }



        checkoutFormContainer.scrollIntoView({ behavior: 'smooth' });
    }, 400);
});

nextStepBtn.addEventListener('click', () => {
    if (validateStep(currentStep)) {
        currentStep++;
        if (currentStep === 2) {
            updateShippingEstimates();
        }
        if (currentStep === 3) {
            renderFinalSummary();
        }
        updateCheckoutUI();
    }
});


prevStepBtn.addEventListener('click', () => {
    if (currentStep === 1) {
        transitionToCartView();
    } else {
        currentStep--;
        if (currentStep === 2) {
            
            updateShippingEstimates();
        }
        updateCheckoutUI();
    }
});

    const paymentMethodContainer = document.getElementById('payment-method');
if (paymentMethodContainer) {
    paymentMethodContainer.addEventListener('click', (e) => {
        if (e.target.closest('.radio-option')) {
            if (currentStep === 3) {
                renderFinalSummary();
            }
        }
    });
}

    quickViewModal.querySelector('.modal-add-to-favorite').addEventListener('click', e => toggleFavorite(e.currentTarget.dataset.id, e.currentTarget));
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', e => {
            if (!modal.querySelector('.shared-element-clone') && (e.target === modal || e.target.classList.contains('close-button'))) closeModal(modal);
        });
    });

    confirmYesBtn.addEventListener('click', () => {
        if (confirmCallback) confirmCallback();
        closeModal(confirmationModal);
    });
    confirmNoBtn.addEventListener('click', () => closeModal(confirmationModal));
    modalSizeGuideBtn.addEventListener('click', renderSizeGuide);
    
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
       backToTopButton.classList.toggle('show', window.scrollY > 300);
        handleScrollProgress();
        document.querySelectorAll('section, footer, .product-card:not(.visible)').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.85) el.classList.add('visible');
        });
    });

    backToTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    darkModeToggle.addEventListener('click', () => applyTheme(body.classList.contains('dark-mode') ? 'light' : 'dark'));
    languageToggleButtons.addEventListener('click', e => {
        const target = e.target.closest('.lang-btn');
        if (target) setLanguage(target.dataset.lang);
    });
    useSavedAddressBtn.addEventListener('click', loadSavedAddress);
    compareNowBtn.addEventListener('click', () => {
        if (comparisonList.length >= 2) {
            renderComparisonModal();
        }
    });

    clearComparisonBtn.addEventListener('click', () => {
        comparisonList = [];
        saveComparisonList();
        renderComparisonTray();
        updateAllCompareButtons();
        showToast('Daftar perbandingan dibersihkan.', 'info');
    });
    
    
    function initializeAccessibilityPanel() {

    const toggleBtn = document.getElementById('a11y-sidebar-btn');
    const panel = document.getElementById('a11y-panel');
    const closeBtn = document.getElementById('a11y-panel-close-btn');
    const readingGuideElement = document.getElementById('reading-guide');


    let prefs = getLocalStorageItem('a11yPrefs', { 
        fontSizeMultiplier: 1.0, 
        highContrast: false,
        readableFont: false,     
        underlineLinks: false,    
        reduceMotion: false,      
        readingGuide: false      
    });


    const applyPrefs = () => {
        
        document.documentElement.style.fontSize = `${16 * prefs.fontSizeMultiplier}px`;
        
       
        document.body.classList.toggle('high-contrast', prefs.highContrast);
        document.body.classList.toggle('readable-font', prefs.readableFont);
        document.body.classList.toggle('underline-links', prefs.underlineLinks);
        document.body.classList.toggle('reduce-motion', prefs.reduceMotion);
        document.body.classList.toggle('reading-guide-active', prefs.readingGuide);


        panel.querySelector('[data-action="toggle-contrast"]').checked = prefs.highContrast;
        panel.querySelector('[data-action="toggle-readable-font"]').checked = prefs.readableFont;
        panel.querySelector('[data-action="toggle-underline-links"]').checked = prefs.underlineLinks;
        panel.querySelector('[data-action="toggle-reduce-motion"]').checked = prefs.reduceMotion;
        panel.querySelector('[data-action="toggle-reading-guide"]').checked = prefs.readingGuide;
    };


    const savePrefs = () => {
        localStorage.setItem('a11yPrefs', JSON.stringify(prefs));
    };


    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        panel.classList.toggle('open');
    });


    closeBtn.addEventListener('click', () => {
        panel.classList.remove('open');
    });

    
    panel.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        if (!action) return;

        switch (action) {
            case 'font-increase':
                prefs.fontSizeMultiplier = Math.min(1.5, prefs.fontSizeMultiplier * 1.1);
                break;
            case 'font-decrease':
                prefs.fontSizeMultiplier = Math.max(0.8, prefs.fontSizeMultiplier * 0.9);
                break;
            case 'font-reset':
                prefs.fontSizeMultiplier = 1.0;
                break;
            case 'toggle-contrast':
                prefs.highContrast = e.target.checked;
                break;
            case 'toggle-readable-font': 
                prefs.readableFont = e.target.checked;
                break;
            case 'toggle-underline-links': 
                prefs.underlineLinks = e.target.checked;
                break;
            case 'toggle-reduce-motion': 
                prefs.reduceMotion = e.target.checked;
                break;
            case 'toggle-reading-guide': 
                prefs.readingGuide = e.target.checked;
                break;
        }
        
        applyPrefs();
        savePrefs();
    });
    

    document.addEventListener('mousemove', (e) => {
        if (prefs.readingGuide && readingGuideElement) {

            window.requestAnimationFrame(() => {
                readingGuideElement.style.top = `${e.clientY}px`;
            });
        }
    });


    applyPrefs();
}

 const initializeReviewFilters = () => {
        const filterContainer = document.getElementById('review-filter-container');
        if (!filterContainer) return;

        filterContainer.addEventListener('click', (e) => {
            const target = e.target.closest('.rating-filter-btn');
            if (!target) return;

            currentRatingFilter = parseInt(target.dataset.rating, 10);

            filterContainer.querySelectorAll('.rating-filter-btn').forEach(btn => btn.classList.remove('active'));
            target.classList.add('active');

            renderAllReviews();
        });
    };
    
    
    const authModal = document.getElementById('auth-modal');
    const authActionBtn = document.getElementById('auth-action-btn');
    const authNavItem = document.getElementById('auth-nav-item');

    const isAuthenticated = () => {
        return getLocalStorageItem('luxuliverCurrentUser', null) !== null;
    };

    const saveCurrentUserSession = () => {
        if (!isAuthenticated()) return;

        const currentUser = getLocalStorageItem('luxuliverCurrentUser', null);
        if (currentUser) {
            let accounts = getLocalStorageItem('luxuliverAccounts', []);
            const accountIndex = accounts.findIndex(acc => acc.phone === currentUser.phone);

            currentUser.cart = cart;
            currentUser.favorites = favorites;
            currentUser.comparisonList = comparisonList;
            currentUser.loyaltyPoints = userLoyaltyPoints;
            currentUser.recentlyViewed = recentlyViewed;

            localStorage.setItem('luxuliverCurrentUser', JSON.stringify(currentUser));

            if (accountIndex !== -1) {
                accounts[accountIndex] = currentUser;
                localStorage.setItem('luxuliverAccounts', JSON.stringify(accounts));
            }
        }
    };
    
    const migrateGuestDataToUser = (user) => {
        const guestCart = getLocalStorageItem('cart', []);
        if (guestCart.length > 0) {
            user.cart = [...new Map([...(user.cart || []), ...guestCart].map(item => [item.cartId, item])).values()];
        }
        user.favorites = [...new Set([...(user.favorites || []), ...getLocalStorageItem('favorites', [])])];
        user.comparisonList = [...new Set([...(user.comparisonList || []), ...getLocalStorageItem('comparisonList', [])])];
        user.recentlyViewed = [...new Set([...(user.recentlyViewed || []), ...getLocalStorageItem('recentlyViewed', [])])];

        ['cart', 'favorites', 'comparisonList', 'recentlyViewed'].forEach(key => localStorage.removeItem(key));
    };
    
    const loadUserData = (user) => {
    cart = user.cart || [];
    favorites = user.favorites || [];
    comparisonList = user.comparisonList || [];
    userLoyaltyPoints = user.loyaltyPoints || 0;
    localStorage.setItem('userLoyaltyPoints', userLoyaltyPoints); 
    recentlyViewed = user.recentlyViewed || [];
};

    const handleRegistration = (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const phone = document.getElementById('register-phone').value;
        const address = document.getElementById('register-address').value;
        const password = document.getElementById('register-password').value;
        const errorMsg = document.getElementById('register-error-msg');

        let accounts = getLocalStorageItem('luxuliverAccounts', []);
        if (accounts.some(acc => acc.phone === phone)) {
            errorMsg.textContent = translations[currentLanguage].toast_register_fail;
            errorMsg.style.display = 'block';
            return;
        }

        const newUser = {
            name, phone, address, password,
            history: [], cart: [], favorites: [], comparisonList: [], loyaltyPoints: 0, recentlyViewed: []
        };
        
        migrateGuestDataToUser(newUser);
        accounts.push(newUser);
        localStorage.setItem('luxuliverAccounts', JSON.stringify(accounts));
        localStorage.setItem('luxuliverCurrentUser', JSON.stringify(newUser));
        
        loadUserData(newUser);
        closeModal(authModal);
        updateAuthStateUI();
        showToast('toast_register_success', 'success');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const phone = document.getElementById('login-phone').value;
        const password = document.getElementById('login-password').value;
        const errorMsg = document.getElementById('login-error-msg');
        
        const accounts = getLocalStorageItem('luxuliverAccounts', []);
        const user = accounts.find(acc => acc.phone === phone && acc.password === password);

        if (user) {
            migrateGuestDataToUser(user);
            localStorage.setItem('luxuliverCurrentUser', JSON.stringify(user));
            
            const accountIndex = accounts.findIndex(acc => acc.phone === phone);
            accounts[accountIndex] = user;
            localStorage.setItem('luxuliverAccounts', JSON.stringify(accounts));

            loadUserData(user);
            closeModal(authModal);
            updateAuthStateUI();
            showToast('toast_login_success', 'success', { name: user.name });
        } else {
            errorMsg.textContent = translations[currentLanguage].toast_login_fail;
            errorMsg.style.display = 'block';
        }
    };
    
    const handleLogout = () => {
    
    localStorage.removeItem('luxuliverCurrentUser');
    
    cart = [];
    favorites = [];
    comparisonList = [];
    userLoyaltyPoints = 0;
    recentlyViewed = [];
    savedForLater = []; 
    
    localStorage.removeItem('userLoyaltyPoints');
    localStorage.removeItem('cart');
    localStorage.removeItem('favorites');
    localStorage.removeItem('comparisonList');
    localStorage.removeItem('recentlyViewed');
    localStorage.removeItem('savedForLater');
    
    showToast('toast_logout_success', 'info');
    updateAuthStateUI();
    
    window.location.reload(); 
};

    const updateAuthStateUI = () => {
        const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
        const userSpecificMenus = ['#riwayat-pesanan', '#ulasan', '#loyalty-points', '#arsip'];

        if (isAuthenticated()) {
            sidebarToggleBtn.style.display = 'block';
            const user = getLocalStorageItem('luxuliverCurrentUser');
            
           
            authNavItem.innerHTML = `
                <div class="user-menu">
                    <a href="#" id="auth-action-btn">${translations[currentLanguage].nav_hello(user.name)} <i class="fas fa-chevron-down"></i></a>
                    <div class="user-dropdown">
                        <a href="#" id="profile-dropdown-btn">
                            <i class="fas fa-user-cog"></i> <span data-lang-key="nav_profile">${translations[currentLanguage].nav_profile}</span>
                        </a>
                        <a href="#" id="logout-btn">
                            <i class="fas fa-sign-out-alt"></i> <span data-lang-key="nav_logout">${translations[currentLanguage].nav_logout}</span>
                        </a>
                    </div>
                </div>`;

           
            document.getElementById('logout-btn').addEventListener('click', (e) => { 
                e.preventDefault(); 
                handleLogout(); 
            });


            document.getElementById('profile-dropdown-btn').addEventListener('click', (e) => {
                e.preventDefault();

                const currentUser = getLocalStorageItem('luxuliverCurrentUser');
                document.getElementById('profile-name').value = currentUser.name || '';
                document.getElementById('profile-address').value = currentUser.address || '';
                
                document.getElementById('profile-info-error-msg').style.display = 'none';
                document.getElementById('change-password-error-msg').style.display = 'none';
                document.getElementById('change-password-form').reset();

                openModal(profileModal);
            });

            userSpecificMenus.forEach(selector => {
                const linkElement = document.querySelector(`a[href="${selector}"]`);
                if (linkElement) linkElement.parentElement.style.display = 'block';
            });
        } else {
            sidebarToggleBtn.style.display = 'none';
            authNavItem.innerHTML = `<a href="#" id="auth-action-btn" data-lang-key="nav_login"><i class="fas fa-user-circle"></i> ${translations[currentLanguage].nav_login}</a>`;
            userSpecificMenus.forEach(selector => {
                const linkElement = document.querySelector(`a[href="${selector}"]`);
                if (linkElement) linkElement.parentElement.style.display = 'none';
            });
        }
        
        document.getElementById('auth-action-btn').addEventListener('click', (e) => {
            e.preventDefault();
            if (!isAuthenticated()) {
                openModal(authModal);
            }
        });

        renderCart();
        renderFavorites();
        renderOrderHistory();
        renderComparisonTray();
        renderLoyaltySection();
        updateLoyaltyPremiumVisuals();
        renderRecentlyViewed();
        updateAllFavoriteButtons();
        updateAllCompareButtons();
    };

    const initAuthModal = () => {
        const tabs = authModal.querySelectorAll('.auth-tab-btn');
        const contents = authModal.querySelectorAll('.auth-tab-content');
        const forgotPasswordLink = document.getElementById('forgot-password-link');
        const forgotPasswordModal = document.getElementById('forgot-password-modal');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                authModal.querySelector(`#${tab.dataset.tab}-tab-content`).classList.add('active');
                authModal.querySelectorAll('.auth-error-msg').forEach(msg => {
                    msg.style.display = 'none';
                    msg.textContent = '';
                });
            });
        });
        
        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', (e) => {
                e.preventDefault();
                closeModal(authModal);
                setTimeout(() => {
                    openModal(forgotPasswordModal);
                }, 350);
            });
        }
        
        const understandResetBtn = document.getElementById('understand-reset-btn');
        if(understandResetBtn) {
            understandResetBtn.addEventListener('click', () => {
                closeModal(forgotPasswordModal);
            });
        }

        document.getElementById('login-form').addEventListener('submit', handleLogin);
        document.getElementById('register-form').addEventListener('submit', handleRegistration);
    };

initAuthModal();

const promoBajuBtn = document.getElementById('promo-baju-btn');
const diskonOngkirBtn = document.getElementById('diskon-ongkir-btn');

if (promoBajuBtn) {
    promoBajuBtn.addEventListener('click', (e) => {
        e.preventDefault();
      
        activeFilters = {
            availability: 'all',
            color: 'all',
            design: 'all',
            promo: true 
        };

        if (body.classList.contains('sidebar-open')) {
            toggleSidebar();
        }
        setTimeout(() => {
            document.getElementById('koleksi').scrollIntoView({ behavior: 'smooth' });
            renderAllProductShowcases();
        }, 300);
    });
}

if (diskonOngkirBtn) {
    diskonOngkirBtn.addEventListener('click', (e) => {
        e.preventDefault();
        renderShippingDiscountsModal();
        if (body.classList.contains('sidebar-open')) {
            toggleSidebar();
        }
    });
}

const renderShippingDiscountsModal = () => {
    const modal = document.getElementById('shipping-discount-modal');
    const listContainer = document.getElementById('shipping-discount-list');
    
    if (!modal || !listContainer) return;

    listContainer.innerHTML = '';

    shippingDiscounts.forEach(discount => {
        const card = document.createElement('div');
        card.className = 'shipping-discount-card';
        card.style.background = discount.bgColor;

        card.innerHTML = `
            <div class="icon-wrapper">
                <i class="${discount.icon}"></i>
            </div>
            <div class="details">
                <h4>Diskon Ongkir ${discount.city}</h4>
                <p>${discount.message}</p>
            </div>
        `;
        listContainer.appendChild(card);
    });

    openModal(modal);
};

   const showAllProductsBtn = document.getElementById('show-all-products-btn');
if (showAllProductsBtn) {
    showAllProductsBtn.addEventListener('click', () => {
     
        activeFilters = {
            availability: 'all',
            color: 'all',
            design: 'all',
            promo: false
        };
        
        searchInput.value = '';
        renderAllProductShowcases();
        updateFilterUI();
        updateResetButtonVisibility();
    });
}

let currentTourStep = 0;
let isTourActive = false;

const startTourBtn = document.getElementById('start-tour-btn');
const tourOverlay = document.getElementById('tour-overlay');
const tourHighlightBox = document.getElementById('tour-highlight-box');
const tourTooltip = document.getElementById('tour-tooltip');
const tourTitle = document.getElementById('tour-title');
const tourIntro = document.getElementById('tour-intro');
const tourStepCounter = document.getElementById('tour-step-counter');
const tourSkipBtn = document.getElementById('tour-skip-btn');
const tourPrevBtn = document.getElementById('tour-prev-btn');
const tourNextBtn = document.getElementById('tour-next-btn');

function showTourStep(stepIndex) {
    if (stepIndex < 0 || stepIndex >= tourSteps.length) {
        endTour();
        return;
    }

    tourTooltip.classList.remove('show');
    currentTourStep = stepIndex;
    const step = tourSteps[stepIndex];
    const targetElement = document.querySelector(step.element);

    if (!targetElement) {
        showTourStep(stepIndex + 1);
        return;
    }

    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

    let scrollTimeout;
    const scrollEndListener = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            window.removeEventListener('scroll', scrollEndListener);
            
            tourOverlay.classList.add('show');
            const rect = targetElement.getBoundingClientRect();

            tourHighlightBox.style.width = `${rect.width + 12}px`;
            tourHighlightBox.style.height = `${rect.height + 12}px`;
            tourHighlightBox.style.top = `${rect.top - 6}px`;
            tourHighlightBox.style.left = `${rect.left - 6}px`;
            tourTitle.textContent = step.title;
            tourIntro.innerHTML = step.intro; 
            tourStepCounter.textContent = `${stepIndex + 1} / ${tourSteps.length}`;

            positionTooltip(targetElement, step.position || 'auto');

            tourPrevBtn.style.display = stepIndex === 0 ? 'none' : 'inline-flex';
            tourNextBtn.textContent = (stepIndex === tourSteps.length - 1) ? 'Selesai' : 'Lanjut';

            requestAnimationFrame(() => {
                tourTooltip.classList.add('show');
            });
            
            setTimeout(() => tourOverlay.classList.remove('show'), 1500);

        }, 150);
    };
    window.addEventListener('scroll', scrollEndListener);
    scrollEndListener(); 
}

function positionTooltip(targetElement, preferredPosition = 'auto') {
    const targetRect = targetElement.getBoundingClientRect();
    const tooltipEl = tourTooltip;
    const spacing = 15;

    tooltipEl.style.top = `-9999px`;
    tooltipEl.style.left = `-9999px`;
    tooltipEl.style.visibility = 'hidden';
    tooltipEl.style.display = 'flex';
    const tooltipRect = tooltipEl.getBoundingClientRect();
    tooltipEl.style.display = '';
    tooltipEl.style.visibility = '';

    const positions = ['bottom', 'top', 'right', 'left'];
    let bestPosition = preferredPosition;

    if (preferredPosition === 'auto') {
        const space = {
            top: targetRect.top - spacing,
            bottom: window.innerHeight - targetRect.bottom - spacing,
            left: targetRect.left - spacing,
            right: window.innerWidth - targetRect.right - spacing
        };

        let bestFit = 'bottom';
        if (space.bottom < tooltipRect.height) {
            if (space.top > space.bottom) bestFit = 'top';
            if (space.right > tooltipRect.width && space.right > space.top && space.right > space.bottom) bestFit = 'right';
            if (space.left > tooltipRect.width && space.left > space.right && space.left > space.top && space.left > space.bottom) bestFit = 'left';
        }
        bestPosition = bestFit;
    }
    
    tooltipEl.dataset.placement = bestPosition;
    let top, left;

    switch (bestPosition) {
        case 'top':
            top = targetRect.top - tooltipRect.height - spacing;
            left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
            break;
        case 'left':
            top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
            left = targetRect.left - tooltipRect.width - spacing;
            break;
        case 'right':
            top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
            left = targetRect.right + spacing;
            break;
        case 'bottom':
        default:
            top = targetRect.bottom + spacing;
            left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
            break;
    }

    left = Math.max(10, Math.min(left, window.innerWidth - tooltipRect.width - 10));
    top = Math.max(10, Math.min(top, window.innerHeight - tooltipRect.height - 10));

    tooltipEl.style.top = `${top}px`;
    tooltipEl.style.left = `${left}px`;
}

function startTour() {
    if (body.classList.contains('sidebar-open')) {
        toggleSidebar();
    }
    document.body.classList.add('tour-active');
    isTourActive = true;
    tourOverlay.style.display = 'block';
    showTourStep(0);
}

function endTour() {
    document.body.classList.remove('tour-active');
    isTourActive = false;
    tourOverlay.style.display = 'none';
    tourTooltip.classList.remove('show');
}

function initializeTour() {
    startTourBtn.addEventListener('click', (e) => {
        e.preventDefault();
        startTour();
    });

    tourSkipBtn.addEventListener('click', endTour);

    tourNextBtn.addEventListener('click', () => {
        showTourStep(currentTourStep + 1);
    });

    tourPrevBtn.addEventListener('click', () => {
        showTourStep(currentTourStep - 1);
    });
    
    window.addEventListener('resize', () => {
        if (isTourActive) {
            showTourStep(currentTourStep);
        }
    });
}
    
    const initializeApp = () => {
        if (isAuthenticated()) {
            const currentUser = getLocalStorageItem('luxuliverCurrentUser');
            if (currentUser) {
                loadUserData(currentUser); 
            }
        }
    updateAuthStateUI();
    applyTheme(localStorage.getItem('theme') || 'light');
    handleScrollProgress();
    initializeNavigation();
    initializeSidebar();
    initializeFAQ();
    initializeAllModalTriggers();
    initializeNotifications();
    initializeReviewFilters();
    renderRadioOptions('expedition-method', expeditionMethods, 'expeditionMethod');
    renderRadioOptions('payment-method', paymentMethods, 'paymentMethod');
    renderSkeletonLoaders(productList, 6);
    updateResetButtonVisibility();
    applyRippleEffect();
    renderComparisonTray();
    updateAllCompareButtons();
    initializeTour(); 
    

const footer = document.querySelector('footer');
if (footer) {
    footer.addEventListener('click', (e) => {
        const link = e.target.closest('a');


        if (link && !isAuthenticated()) {
            

            e.preventDefault(); 
            

            e.stopPropagation();


            openModal(document.getElementById('auth-modal'));
        }
    });
}

    setTimeout(() => {
        setLanguage(localStorage.getItem('language') || 'id');
        renderRecentlyViewed();
        renderOrderHistory();
        updateAllFavoriteButtons();
        currentYearSpan.textContent = new Date().getFullYear().toString();
        if (sellerAddressSpan) sellerAddressSpan.textContent = sellerInfo.address;
        if (sellerPhoneSpan) sellerPhoneSpan.textContent = sellerInfo.phone;
        if (sellerEmailSpan) sellerEmailSpan.textContent = sellerInfo.email;
        const sellerAddressLink = document.getElementById('seller-address-link');
        if (sellerAddressLink) {
            const encodedAddress = encodeURIComponent(sellerInfo.address);
            sellerAddressLink.href = `https://maps.google.com/?q=${encodedAddress}`;
        }
        if (sellerPhoneLink) {
            const phoneNumber = sellerInfo.phone.replace(/[\s-]/g, '');
            sellerPhoneLink.href = `tel:${phoneNumber}`;
        }
        if (sellerEmailLink) {sellerEmailLink.href = `mailto:${sellerInfo.email}`;
        }
        document.querySelectorAll('section, footer, .product-card:not(.visible)').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add('visible');
        });
        body.classList.remove('no-scroll');
        updateLoyaltyPremiumVisuals(); 
        renderLoyaltySection(); 
        initializeAccessibilityPanel();
        showMainContentSection('#hero');
        
    }, 1200);
  };


orderHistoryList.addEventListener('click', function(e) {
    const returnBtn = e.target.closest('.request-return-btn');
    if (!returnBtn) return;

    const orderId = returnBtn.dataset.orderId;
    const items = returnBtn.dataset.orderItems; 

    const continueBtn = document.getElementById('confirm-return-continue');
    continueBtn.dataset.orderId = orderId; 
    continueBtn.dataset.orderItems = items;

    openModal(document.getElementById('return-confirmation-modal'));
});

const returnConfirmationModal = document.getElementById('return-confirmation-modal');
if (returnConfirmationModal) {
    const continueBtn = document.getElementById('confirm-return-continue');
    const cancelBtn = document.getElementById('confirm-return-cancel');
    const closeBtn = returnConfirmationModal.querySelector('.close-button');

    continueBtn.addEventListener('click', function() {
        closeModal(returnConfirmationModal);


        const orderId = this.dataset.orderId;
        const items = JSON.parse(this.dataset.orderItems);

        const returnModal = document.getElementById('return-request-modal');
        const returnOrderIdSpan = document.getElementById('return-order-id');
        const returnProductListDiv = document.getElementById('return-product-list');

        returnOrderIdSpan.textContent = orderId;

        returnProductListDiv.innerHTML = items.map(item => `
            <div class="return-product-item">
                <input type="checkbox" id="return-${item.cartId}" name="return-product" value="${item.cartId}">
                <label for="return-${item.cartId}">
                    <img src="${item.image}" alt="${item.name}">
                    <span>${item.name} (${item.size}) - ${item.quantity}x</span>
                </label>
            </div>
        `).join('');

        openModal(returnModal);
    });

    cancelBtn.addEventListener('click', () => closeModal(returnConfirmationModal));
    closeBtn.addEventListener('click', () => closeModal(returnConfirmationModal));
}

    
    
      const returnForm = document.getElementById('return-form');
    if(returnForm) {
        returnForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const selectedProductsCheckboxes = document.querySelectorAll('input[name="return-product"]:checked');
            const reasonSelect = document.getElementById('return-reason');
            const otherReasonTextarea = document.getElementById('other-reason-text');
            const fileInput = document.getElementById('return-proof-upload');
            const orderId = document.getElementById('return-order-id').textContent;

            if (selectedProductsCheckboxes.length === 0) {
                showToast('Mohon pilih setidaknya satu produk.', 'warning');
                return;
            }
            if (!reasonSelect.value) {
                showToast('Mohon pilih alasan pengembalian.', 'warning');
                return;
            }

            let reasonText = reasonSelect.options[reasonSelect.selectedIndex].text;

            if (reasonSelect.value === 'lainnya') {
                const otherReason = otherReasonTextarea.value.trim();
                const wordCount = otherReason.split(' ').filter(word => word.length > 0).length;
                if (wordCount < 3) {
                    showToast('Mohon jelaskan alasan Anda dengan lebih detail (minimal 3 kata).', 'warning');
                    return;
                }
                reasonText = `Lainnya: ${otherReason}`;
            }

            if (fileInput.files.length === 0) {
                showToast('Mohon unggah foto atau video sebagai bukti.', 'warning');
                return;
            }

            let returnedOrderIds = JSON.parse(localStorage.getItem('returnedOrderIds')) || [];
            if (!returnedOrderIds.includes(orderId)) {
                returnedOrderIds.push(orderId);
                localStorage.setItem('returnedOrderIds', JSON.stringify(returnedOrderIds));
            }

            const selectedProductNames = Array.from(selectedProductsCheckboxes).map(checkbox => {
                const label = document.querySelector(`label[for="${checkbox.id}"]`);
                return label ? label.textContent.trim() : 'Produk tidak dikenal';
            });
            const proofText = `Ya (mohon kirimkan file bukti "${fileInput.files[0].name}" secara manual di chat ini setelah pesan terkirim).`;

            const returnMessage = `*Permintaan Pengembalian Barang*\n\n` +
                `*ID Pesanan:* ${orderId}\n\n` +
                `*Produk yang ingin dikembalikan:*\n- ${selectedProductNames.join('\n- ')}\n\n` +
                `*Alasan Pengembalian:* ${reasonText}\n\n` +
                `*Bukti Foto/Video:* ${proofText}\n\n` +
                `Mohon segera diproses. Terima kasih.`;

            const whatsappUrl = `https://wa.me/${sellerInfo.whatsappAdmin}?text=${encodeURIComponent(returnMessage)}`;
            window.open(whatsappUrl, '_blank');
            
            closeModal(document.getElementById('return-request-modal'));
            showToast('Permintaan pengembalian telah disiapkan untuk dikirim via WhatsApp.', 'success');
            returnForm.reset();
            document.getElementById('other-reason-container').style.display = 'none';
            document.getElementById('return-file-name').textContent = '';

            renderOrderHistory();

        });
    }
    
    const fileUploadInput = document.getElementById('return-proof-upload');
    if(fileUploadInput) {
        fileUploadInput.addEventListener('change', function() {
            const fileNameDisplay = document.getElementById('return-file-name');
            if (this.files.length > 0) {
                fileNameDisplay.textContent = this.files[0].name;
            } else {
                fileNameDisplay.textContent = '';
            }
        });
    }

    const startApp = () => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            loadingScreen.addEventListener('transitionend', () => { loadingScreen.style.display = 'none'; }, { once: true });
        }
        initializeApp();
    };

    if (loadingVideo) {
        loadingVideo.addEventListener('ended', startApp);
        loadingVideo.addEventListener('error', () => {
            console.error("Video loading screen gagal dimuat.");
            startApp();
        });
    } else {
        startApp();
    }
    
        const formGroups = document.querySelectorAll('.luxury-form-group');

    const updateIconVisibility = (formGroup) => {
        const input = formGroup.querySelector('.form-input');
        const icon = formGroup.querySelector('.form-icon');
        if (!input || !icon) return;

        const isFocused = document.activeElement === input;
        const hasValue = input.value.trim() !== '';

        if (isFocused || hasValue) {
            icon.classList.add('hidden');
        } else {
            icon.classList.remove('hidden');
        }
    };

    formGroups.forEach(group => {
        const input = group.querySelector('.form-input');
        if (input) {
            input.addEventListener('focus', () => updateIconVisibility(group));
            input.addEventListener('blur', () => updateIconVisibility(group));
            input.addEventListener('input', () => updateIconVisibility(group));
            

            updateIconVisibility(group); 
        }
    });

   
    const liveChatToggle = document.getElementById('live-chat-toggle');
    const liveChatModal = document.getElementById('live-chat-modal');
    const chatTabBtns = document.querySelectorAll('.chat-tab-btn');
    const chatTabContents = document.querySelectorAll('.chat-tab-content');
    const faqSearchInput = document.getElementById('faq-search');
    const faqItems = document.querySelectorAll('.faq-item-chat');
    const faqNotFound = document.querySelector('.faq-not-found');
    const contactAdminFromFaq = document.getElementById('contact-admin-from-faq');
    const whatsappAdminBtn = document.getElementById('whatsapp-admin-btn');
    const emailAdminBtn = document.getElementById('email-admin-btn');
    const quickContactForm = document.getElementById('quick-contact-form');


    if (liveChatToggle) {
        liveChatToggle.addEventListener('click', (e) => {
            e.preventDefault();
            if (document.body.classList.contains('sidebar-open')) {
                toggleSidebar();
            }
            setTimeout(() => {
                openModal(liveChatModal);
            }, 350);
        });
    }

    
    chatTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            chatTabBtns.forEach(b => b.classList.remove('active'));
            chatTabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.querySelector(`[data-tab="${targetTab}"].chat-tab-content`).classList.add('active');
        });
    });


    if (faqSearchInput) {
        faqSearchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            let hasResults = false;

            faqItems.forEach(item => {
                const keywords = item.dataset.keywords.toLowerCase();
                const questionText = item.querySelector('.faq-question-chat span').textContent.toLowerCase();
                const answerText = item.querySelector('.faq-answer-chat p').textContent.toLowerCase();
                
                const isMatch = keywords.includes(searchTerm) || 
                               questionText.includes(searchTerm) || 
                               answerText.includes(searchTerm);
                
                if (isMatch || searchTerm === '') {
                    item.style.display = 'block';
                    hasResults = true;
                } else {
                    item.style.display = 'none';
                }
            });

            if (faqNotFound) {
                faqNotFound.style.display = (!hasResults && searchTerm !== '') ? 'block' : 'none';
            }
        });
    }


    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question-chat');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });


    if (contactAdminFromFaq) {
        contactAdminFromFaq.addEventListener('click', () => {
            chatTabBtns.forEach(b => b.classList.remove('active'));
            chatTabContents.forEach(c => c.classList.remove('active'));
            document.querySelector('[data-tab="admin"]').classList.add('active');
            document.querySelector('[data-tab="admin"].chat-tab-content').classList.add('active');
        });
    }

    if (whatsappAdminBtn) {
        whatsappAdminBtn.addEventListener('click', () => {
            const message = "Halo, saya ingin bertanya tentang produk Luxuliver. Mohon bantuannya.";
            const whatsappUrl = `https://wa.me/6287820843118??text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    if (emailAdminBtn) {
        emailAdminBtn.addEventListener('click', () => {
            const subject = "Pertanyaan tentang Luxuliver";
            const body = "Halo,\n\nSaya ingin bertanya tentang:\n\n\nTerima kasih.";
            const emailUrl = `mailto:luxuliver@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.open(emailUrl, '_blank');
        });
    }

    if (quickContactForm) {
        quickContactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('quick-name').value;
            const topic = document.getElementById('quick-topic').value;
            const message = document.getElementById('quick-message').value;
            
            if (!name || !topic || !message) {
                showToast('Mohon lengkapi semua field', 'error');
                return;
            }
            
            const topicLabels = {
                'order': 'Pertanyaan Pesanan',
                'product': 'Informasi Produk',
                'shipping': 'Pengiriman',
                'return': 'Pengembalian',
                'other': 'Lainnya'
            };
            
            const whatsappMessage = `Halo, saya ${name}.\n\nTopik: ${topicLabels[topic]}\n\nPesan: ${message}\n\nMohon bantuannya. Terima kasih.`;
            const whatsappUrl = `https://wa.me/6287820843118?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
            quickContactForm.reset();
            showToast('Pesan telah disiapkan di WhatsApp', 'success');
        });
    }



    const liveChatCloseBtn = liveChatModal?.querySelector('.close-button');
if (liveChatCloseBtn) {
    liveChatCloseBtn.addEventListener('click', () => {
        closeModal(liveChatModal); 
    });
}


    if (liveChatModal) {
    liveChatModal.addEventListener('click', (e) => {
        if (e.target === liveChatModal) {
            closeModal(liveChatModal); 
        }
    });
}
    
    
    const wrapper = document.querySelector('.custom-select-wrapper');
    if (wrapper) {
        const trigger = wrapper.querySelector('.custom-select-trigger');
        const valueDisplay = wrapper.querySelector('#custom-select-value');
        const optionsContainer = wrapper.querySelector('.custom-select-options');
        const originalSelect = wrapper.querySelector('.original-select');

        if (originalSelect && optionsContainer) {
            Array.from(originalSelect.options).forEach(option => {
                const customOption = document.createElement('div');
                customOption.classList.add('custom-select-option');
                customOption.textContent = option.textContent;
                customOption.dataset.value = option.value;
                if (option.selected) {
                    customOption.classList.add('selected');
                    if(valueDisplay) valueDisplay.textContent = option.textContent;
                }
                optionsContainer.appendChild(customOption);
            });
        }

        const customOptions = optionsContainer ? optionsContainer.querySelectorAll('.custom-select-option') : [];

        if(trigger) {
            trigger.addEventListener('click', (e) => {
                if (!isAuthenticated()) {
                    e.preventDefault();
                    openModal(document.getElementById('auth-modal'));
                    return;
                }
                wrapper.classList.toggle('open');
            });
        }

        customOptions.forEach(option => {
            option.addEventListener('click', () => {
                if (option.classList.contains('selected')) {
                    wrapper.classList.remove('open');
                    return;
                }

                customOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                if(valueDisplay) valueDisplay.textContent = option.textContent;


                if(originalSelect) originalSelect.value = option.dataset.value;

                renderAllProductShowcases(searchInput.value.trim());

                wrapper.classList.remove('open');
            });
        });


        document.addEventListener('click', (e) => {
            if (wrapper && !wrapper.contains(e.target)) {
                wrapper.classList.remove('open');
            }
        });
    }
    

const logoutMenuItem = document.getElementById('logout-menu-item');

if (logoutMenuItem) {
    const userProfile = getLocalStorageItem('luxuliverUser', null);

    if (userProfile) {
        logoutMenuItem.style.display = 'block';
    }

    const logoutBtn = logoutMenuItem.querySelector('#logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const confirmationMessage = 'Semua data sesi Anda (Keranjang, Favorit, Riwayat Pesanan, Poin Loyalty) akan dihapus dari peramban ini. Yakin ingin logout?';

            showConfirmationModal(confirmationMessage, () => {

                const userSessionKeys = [
                    'luxuliverUser',
                    'cart',
                    'favorites',
                    'savedForLater',
                    'recentlyViewed',
                    'comparisonList',
                    'userLoyaltyPoints' 
                ];

                userSessionKeys.forEach(key => localStorage.removeItem(key));

                window.location.reload();
            });
        });
    }
}

    const fitFareModal = document.getElementById('fit-fare-modal');
    if (fitFareModal) {
        const choiceButtons = fitFareModal.querySelectorAll('.fit-fare-choice-btn');
        const backButtons = fitFareModal.querySelectorAll('.fit-fare-back-btn');
        const views = fitFareModal.querySelectorAll('.fit-fare-view');
        const choicesView = document.getElementById('fit-fare-choices');

        const showView = (targetId) => {
            views.forEach(view => view.classList.remove('active'));
            const targetView = document.getElementById(`fit-fare-view-${targetId}`);
            if (targetView) {
                targetView.classList.add('active');
            } else if (targetId === 'choices') {
                choicesView.classList.add('active');
            }
        };

        choiceButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetViewId = button.dataset.targetView;
                showView(targetViewId);
            });
        });

        backButtons.forEach(button => {
            button.addEventListener('click', () => {
                showView('choices');
            });
        });

       
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class' && fitFareModal.classList.contains('show')) {
                    showView('choices');
                }
            });
        });
        observer.observe(fitFareModal, { attributes: true });
    }

});