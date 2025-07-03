document.addEventListener('DOMContentLoaded', () => {
    // Dummy Data Produk DENGAN PENAMBAHAN REVIEW
    const products = [
        {
            id: 'baju-001',
            name: 'Skeleton',
            image: 'Skeleton.jpg',
            description: 'T-Shirt paling nyaman dan bagus untuk dipakai setiap hari, cocok disemua musim.',
            basePrice: 95000,
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            color: 'putih',
            stock: 5,
            reviews: [
                { author: 'Muhammad Ricky', rating: 5, text: 'Kainnya adem banget, sablonnya rapi dan kualitasnya premium, keren juga desain nya bro', date: '2025-06-26' },
                { author: 'Citra Wulandari', rating: 5, text: 'Ukurannya pas sesuai size char dan warnanya juga putih bersih, tidak menerawang, inti nya baju nya okey recommended!', date: '2025-06-26' },
                { author: 'Bima Saputra', rating: 4, text: 'Bagus, sesuai ekspektasi, mungkin lain kali akan coba desain yang lain', date: '2025-06-26' }
            ]
        },
        {
            id: 'baju-002',
            name: 'Dog and éclipse',
            image: 'Dog.jpg',
            description: 'T-Shirt paling nyaman dan bagus untuk dipakai setiap hari, cocok disemua musim.',
            basePrice: 95000,
            sizes: ['XS','S', 'M', 'L', 'XL'],
            color: 'hitam',
            stock: 15,
            reviews: [
                { author: 'Dian Maulana Solihin', rating: 5, text: 'Asli bagus nih bahan nya adem banget', date: '2025-06-04' },
                { author: 'Eko Budianto', rating: 5, text: 'Bahan untuk baju nya sih nyaman dipakai seharian ya, sablonnya pun juga tahan lama setelah beberapa kali cuci', date: '2025-06-11' }
            ]
        },
        {
            id: 'baju-003',
            name: 'Travis Scott',
            image: 'Travis scoot.jpg',
            description: 'T-Shirt paling nyaman dan bagus untuk dipakai setiap hari, cocok disemua musim.',
            basePrice: 95000,
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            color: 'hitam',
            stock: 3,
            reviews: [
                { author: 'Fahmi Rizky Dermawan', rating: 5, text: 'Keren abis bro, fans nya Travis Scott wajib sih ini mah punya, kualitasnya juga mantap, kaga bikin kecewa dah beli di sini', date: '2025-06-24' }
            ]
        },
        {
            id: 'baju-004',
            name: 'Person',
            image: 'Person.jpg',
            description: 'T-Shirt paling nyaman dan bagus untuk dipakai setiap hari, cocok disemua musim.',
            basePrice: 95000,
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            color: 'hitam',
            stock: 25,
            reviews: [
                { author: 'Farhan Mahendra', rating: 4, text: 'Jujur bahan nya bagus banget, desain nya juga okey kalo menurut gua', date: '2025-06-24' }
            ]
        },
    ];

    // --- INFORMASI PENJUAL ---
    const sellerInfo = {
        name: "Luxuliver Official",
        address: "Jakarta Selatan, DKI Jakarta, Indonesia",
        phone: "+62 878-2084-3118",
        email: "info@luxuliver.com",
        instagram: "https://www.instagram.com/luxuliver",
        whatsappAdmin: "6287820843118"
    };

    // --- DATA PANDUAN UKURAN ---
    const sizeGuideData = [
        { size: 'XS', length: '66', width: '46', sleeve: '20' },
        { size: 'S', length: '68', width: '48', sleeve: '21' },
        { size: 'M', length: '72', width: '50', sleeve: '22' },
        { size: 'L', length: '74', width: '52', sleeve: '23' },
        { size: 'XL', length: '76', width: '54', sleeve: '24' }
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let orderCounter = parseInt(localStorage.getItem('orderCounter')) || 1000;
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let pendingOrder = null; // Variabel untuk menyimpan pesanan sementara

    // DOM Elements
    const body = document.body;
    const productList = document.getElementById('product-list');
    const blackClothingList = document.getElementById('black-clothing-list');
    const whiteClothingList = document.getElementById('white-clothing-list');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartCountSpan = document.getElementById('cart-count');
    const subtotalPriceSpan = document.getElementById('subtotal-price');
    const discountAmountSpan = document.getElementById('discount-amount');
    const totalPriceSpan = document.getElementById('total-price');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const noResultsMessage = document.getElementById('no-results-message');
    const noBlackClothingMessage = document.getElementById('no-black-clothing');
    const noWhiteClothingMessage = document.getElementById('no-white-clothing');
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
    const mainNav = document.getElementById('main-nav');
    
    // [BARU] Elemen Loading Screen
    const loadingScreen = document.getElementById('loading-screen');
    const loadingVideo = document.getElementById('loading-video');

    // Quick View Modal
    const quickViewModal = document.getElementById('quick-view-modal');
    const modalAddToCartBtn = document.getElementById('modal-add-to-cart-btn');
    const modalSizeOptions = document.getElementById('modal-size-options');
    
    // Size Guide Modal
    const sizeGuideModal = document.getElementById('size-guide-modal');
    const modalSizeGuideBtn = document.getElementById('modal-size-guide-btn');
    const sizeChartTableBody = document.getElementById('size-chart-table').querySelector('tbody');

    // Footer
    const sellerAddressSpan = document.getElementById('seller-address');
    const sellerPhoneSpan = document.getElementById('seller-phone');
    const sellerEmailSpan = document.getElementById('seller-email');
    const sellerPhoneLink = document.getElementById('seller-phone-link');
    const sellerEmailLink = document.getElementById('seller-email-link');

    // Favorites
    const favoriteCountSpan = document.getElementById('favorite-count');
    const favoriteProductsList = document.getElementById('favorite-products-list');
    const emptyFavoritesMessage = document.getElementById('empty-favorites-message');

    // Checkout Form (Multi-Langkah)
    const progressBar = document.getElementById('progress-bar');
    const checkoutSteps = document.querySelectorAll('.checkout-step');
    const prevStepBtn = document.getElementById('prev-step-btn');
    const nextStepBtn = document.getElementById('next-step-btn');
    const submitOrderBtn = document.getElementById('submit-order-btn');
    const finalOrderSummaryContainer = document.getElementById('final-order-summary');
    let currentStep = 1;

    // Confirmation Modals
    const confirmationModal = document.getElementById('confirmation-modal');
    const confirmMessage = document.getElementById('confirm-message');
    const confirmYesBtn = document.getElementById('confirm-yes');
    const confirmNoBtn = document.getElementById('confirm-no');
    
    const promoUpsellMessage = document.getElementById('promo-upsell-message');
    const whatsappConfirmationModal = document.getElementById('whatsapp-confirmation-modal');
    const whatsappConfirmYesBtn = document.getElementById('whatsapp-confirm-yes');
    const whatsappConfirmNoBtn = document.getElementById('whatsapp-confirm-no');
    
    // Elemen Riwayat Pesanan
    const orderHistoryList = document.getElementById('order-history-list');
    const emptyHistoryMessage = document.getElementById('empty-history-message');

    // --- Helper Functions ---
    const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);

    const getPriceBySize = (basePrice, size) => {
        if (size && size.toUpperCase() === 'XL') {
            return basePrice + 5000;
        }
        return basePrice;
    };
    
    const generateStarsHTML = (rating) => {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    };

    const showToast = (message, type = 'info') => {
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
        body.classList.remove('no-scroll');
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
        const shareData = {
            title: product.name,
            text: `Lihat T-Shirt keren "${product.name}" ini di Luxuliver Shop! Harga mulai ${formatRupiah(product.basePrice)}. ${product.description}`,
            url: window.location.href
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
                showToast('Produk berhasil dibagikan!', 'success');
            } else {
                navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`).then(() => {
                    showToast('Link produk disalin ke clipboard!', 'info');
                });
            }
        } catch (err) {
             if (err.name !== 'AbortError') {
                showToast('Gagal membagikan produk.', 'error');
            }
        }
    };
    
    const flyToCartAnimation = (startElement) => {
        const productImg = startElement.querySelector('img');
        if (!productImg) return;

        const startRect = productImg.getBoundingClientRect();
        const cartIcon = document.querySelector('#keranjang a');
        const endRect = cartIcon.getBoundingClientRect();

        const flyingClone = productImg.cloneNode(true);
        flyingClone.classList.add('flying-product-clone');
        
        flyingClone.style.left = `${startRect.left}px`;
        flyingClone.style.top = `${startRect.top}px`;
        flyingClone.style.width = `${startRect.width}px`;
        flyingClone.style.height = `${startRect.height}px`;
        flyingClone.style.opacity = '1';

        document.body.appendChild(flyingClone);
        
        requestAnimationFrame(() => {
            flyingClone.style.left = `${endRect.left + (endRect.width / 2) - 15}px`;
            flyingClone.style.top = `${endRect.top + (endRect.height / 2) - 15}px`;
            flyingClone.style.width = '30px';
            flyingClone.style.height = '30px';
            flyingClone.style.opacity = '0.5';
        });

        flyingClone.addEventListener('transitionend', () => {
            flyingClone.remove();
            cartIcon.classList.add('cart-pop-animation');
            cartIcon.addEventListener('animationend', () => {
                 cartIcon.classList.remove('cart-pop-animation');
            }, { once: true });
        }, { once: true });
    };

    const renderCart = () => {
        const { subtotal, totalItems, discount, total } = calculateCartTotals();

        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartSummary.style.display = 'none';
            checkoutFormContainer.style.display = 'none';
        } else {
            emptyCartMessage.style.display = 'none';
            cartSummary.style.display = 'block';
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.className = 'cart-item';
                cartItemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h4>${item.name} (${item.size})</h4>
                        <p>${formatRupiah(item.price)}</p>
                    </div>
                    <div class="quantity-controls">
                        <button class="decrease-quantity" data-cart-id="${item.cartId}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-quantity" data-cart-id="${item.cartId}">+</button>
                    </div>
                    <div class="item-price">${formatRupiah(item.price * item.quantity)}</div>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });
        }
        
        cartItemsContainer.querySelectorAll('.decrease-quantity').forEach(btn => btn.onclick = e => updateQuantity(e.target.dataset.cartId, -1));
        cartItemsContainer.querySelectorAll('.increase-quantity').forEach(btn => btn.onclick = e => updateQuantity(e.target.dataset.cartId, 1));
        
        if (totalItems > 0 && totalItems < 5) {
            const itemsNeeded = 5 - totalItems;
            promoUpsellMessage.textContent = `Tambah ${itemsNeeded} barang lagi untuk dapat diskon 2%!`;
            promoUpsellMessage.style.display = 'block';
        } else {
            promoUpsellMessage.style.display = 'none';
        }

        cartCountSpan.textContent = totalItems;
        subtotalPriceSpan.textContent = formatRupiah(subtotal);
        discountAmountSpan.textContent = `- ${formatRupiah(discount)}`;
        totalPriceSpan.textContent = formatRupiah(total);
        checkoutBtn.style.display = cart.length > 0 ? 'inline-flex' : 'none';
    };

    checkoutForm.addEventListener('submit', e => {
        e.preventDefault();
        if (!validateStep(3)) return;

        const customerPhoneInput = document.getElementById('customer-phone').value;
        if (!/^[0-9]{10,15}$/.test(customerPhoneInput)) {
            showToast("Nomor WhatsApp tidak valid (10-15 digit angka).", "error");
            return;
        }

        const { total, subtotal, discount, shippingDiscount } = calculateCartTotals();
        const orderId = `LXVR-${orderCounter}`;
        const formData = new FormData(checkoutForm);
        
        const shippingDiscountText = shippingDiscount > 0 ? `*Promo Ongkir (Jabodetabek):* -${formatRupiah(shippingDiscount)}\n` : '';

        let orderDetails = `*Order Baru dari Luxuliver Shop*\n\n` +
            `*ID Pesanan:* ${orderId}\n` +
            `*Nama:* ${formData.get('customer-name')}\n` +
            `*Telepon:* ${formData.get('customer-phone')}\n` +
            `*Alamat:* ${formData.get('customer-address')}\n` +
            `*Ekspedisi:* ${formData.get('expeditionMethod')}\n` +
            `*Pembayaran:* ${formData.get('paymentMethod')}\n\n` +
            `*Detail Pesanan:*\n` +
            cart.map(item => `- ${item.name} (${item.size}) x ${item.quantity} = ${formatRupiah(item.price * item.quantity)}`).join('\n') +
            `\n\n*Subtotal:* ${formatRupiah(subtotal)}\n` +
            `*Diskon Pembelian:* -${formatRupiah(discount)}\n` +
            shippingDiscountText +
            `*Total Pembayaran:* ${formatRupiah(total)}\n\n` +
            `Terima kasih! Detail biaya pengiriman (setelah promo) akan diinfokan oleh admin kami.`;

        pendingOrder = {
            orderId: orderId,
            date: new Date().toISOString(),
            items: [...cart],
            total: total
        };

        window.open(`https://wa.me/${sellerInfo.whatsappAdmin}?text=${encodeURIComponent(orderDetails)}`, '_blank');
        openModal(whatsappConfirmationModal);
    });

    whatsappConfirmYesBtn.addEventListener('click', () => {
        if (pendingOrder) {
            let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
            orderHistory.unshift(pendingOrder);
            localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
            
            orderCounter++;
            localStorage.setItem('orderCounter', orderCounter);

            cart = [];
            saveCart();
            renderCart();
            renderOrderHistory();

            checkoutForm.reset();
            checkoutFormContainer.style.display = 'none';
            cartSummary.style.display = 'block';
            
            closeModal(whatsappConfirmationModal);
            showToast("Pesanan Anda berhasil dikonfirmasi!", "success");

            pendingOrder = null;
        }
    });

    whatsappConfirmNoBtn.addEventListener('click', () => {
        pendingOrder = null;
        closeModal(whatsappConfirmationModal);
        showToast("Pesanan dibatalkan. Keranjang Anda tetap utuh.", "warning");
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
            </div>
        `).join('');
    };
    
    const createProductCardHTML = (product) => {
        const isFavorited = favorites.some(fav => fav.id === product.id);
        const price = getPriceBySize(product.basePrice, 'M');
        const lowStockLabel = product.stock <= 5 && product.stock > 0 ? `<div class="low-stock-badge">Stok Terbatas!</div>` : '';
        const outOfStockLabel = product.stock === 0 ? `<div class="out-of-stock-badge">Stok Habis</div>` : '';

        const totalReviews = product.reviews ? product.reviews.length : 0;
        let averageRating = 0;
        if (totalReviews > 0) {
            averageRating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;
        }

        const ratingHTML = `
            <div class="product-rating" title="${averageRating.toFixed(1)} dari 5 bintang">
                ${generateStarsHTML(Math.round(averageRating))}
                <span class="rating-count">(${totalReviews})</span>
            </div>`;

        return `
            <div class="product-card" data-product-id="${product.id}">
                ${lowStockLabel}
                ${outOfStockLabel}
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    ${ratingHTML}
                    <p class="price">${formatRupiah(price)}</p>
                    <div class="size-options">
                        ${product.sizes.map(size => `<span class="size-option" data-size="${size}">${size}</span>`).join('')}
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-primary add-to-cart" ${product.stock === 0 ? 'disabled' : ''}><i class="fas fa-shopping-cart"></i> ${product.stock === 0 ? 'Stok Habis' : 'Tambah'}</button>
                        <button class="btn quick-view-btn"><i class="fas fa-eye"></i></button>
                        <button class="btn add-to-favorite ${isFavorited ? 'favorited' : ''}"><i class="${isFavorited ? 'fas' : 'far'} fa-heart"></i></button>
                    </div>
                </div>
            </div>`;
    };


    const renderProducts = (productsToRender, container, noResultsEl) => {
        container.innerHTML = '';
        if (productsToRender.length === 0) {
            noResultsEl.style.display = 'block';
        } else {
            noResultsEl.style.display = 'none';
            productsToRender.forEach(product => {
                container.insertAdjacentHTML('beforeend', createProductCardHTML(product));
            });
        }
        container.querySelectorAll('.product-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 100}ms`;
        });
    };
    
    function attachProductCardListeners(container) {
        container.querySelectorAll('.product-card').forEach(card => {
            const productId = card.dataset.productId;

            card.querySelector('.size-options').addEventListener('click', e => {
                if(e.target.classList.contains('size-option')) {
                    const parent = e.target.parentElement;
                    parent.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
                    e.target.classList.add('selected');
                }
            });

            card.querySelector('.add-to-cart').addEventListener('click', () => {
                const product = products.find(p => p.id === productId);
                if (product.stock === 0) return;
                const selectedSizeEl = card.querySelector('.size-option.selected');
                if (!selectedSizeEl) {
                    showToast("Mohon pilih ukuran baju terlebih dahulu!", "warning");
                    return;
                }
                addToCart(productId, selectedSizeEl.dataset.size, card);
            });

            card.querySelector('.quick-view-btn').addEventListener('click', () => openQuickViewModal(productId));
            card.querySelector('.add-to-favorite').addEventListener('click', (e) => {
              toggleFavorite(productId, e.currentTarget);
            });
        });
    }

    const renderAllProductShowcases = (searchTerm = '') => {
        const initialLoad = !searchTerm;
        const allSections = ['#koleksi', '#baju-hitam', '#baju-putih', '#riwayat-pesanan', '.section-divider', '#favorit'];

        if(searchTerm) {
            allSections.forEach(sel => document.querySelectorAll(sel).forEach(el => el.style.display = 'none'));
            document.querySelector('#koleksi').style.display = 'block';
            document.querySelector('#koleksi h2').textContent = `Hasil Pencarian untuk "${searchTerm}"`;
        } else {
             allSections.forEach(sel => document.querySelectorAll(sel).forEach(el => el.style.display = 'block'));
            document.querySelector('#koleksi h2').textContent = "Semua Koleksi";
        }
        
        let filteredProducts = searchTerm
            ? products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
            : products;

        renderProducts(filteredProducts, productList, noResultsMessage);
        attachProductCardListeners(productList);

        if (initialLoad) {
            renderProducts(products.filter(p => p.color === 'hitam'), blackClothingList, noBlackClothingMessage);
            attachProductCardListeners(blackClothingList);
            renderProducts(products.filter(p => p.color === 'putih'), whiteClothingList, noWhiteClothingMessage);
            attachProductCardListeners(whiteClothingList);
        }
    };
    
    const saveCart = () => localStorage.setItem('cart', JSON.stringify(cart));
    
    const addToCart = (productId, size, triggerElement) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const cartItemIdentifier = `${productId}-${size}`;
        const existingItem = cart.find(item => item.cartId === cartItemIdentifier);
        
        const currentQuantityInCart = existingItem ? existingItem.quantity : 0;
        if (currentQuantityInCart >= product.stock) {
            showToast(`Stok ${product.name} (${size}) tidak mencukupi!`, "error");
            return;
        }

        const price = getPriceBySize(product.basePrice, size);

        if (existingItem) {
            existingItem.quantity++;
            showToast(`Kuantitas ${product.name} (${size}) diperbarui!`, "info");
        } else {
            cart.push({ ...product, price, size, quantity: 1, cartId: cartItemIdentifier });
            showToast(`${product.name} (${size}) ditambahkan!`, "success");
        }
        saveCart();
        renderCart();
        
        if (triggerElement) {
            flyToCartAnimation(triggerElement);
        }
    };

    const updateQuantity = (cartId, change) => {
        const itemIndex = cart.findIndex(item => item.cartId === cartId);
        if (itemIndex > -1) {
            const item = cart[itemIndex];
            
            if (change > 0 && item.quantity + change > item.stock) {
                 showToast(`Stok ${item.name} (${item.size}) tidak mencukupi!`, "error");
                 return;
            }

            if (item.quantity + change <= 0) {
                showConfirmationModal(`Hapus "${item.name} (${item.size})" dari keranjang?`, () => {
                    cart.splice(itemIndex, 1);
                    showToast(`"${item.name} (${item.size})" dihapus.`, "success");
                    saveCart();
                    renderCart();
                });
            } else {
                item.quantity += change;
                saveCart();
                renderCart();
            }
        }
    };

    const calculateCartTotals = () => {
        const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        const productDiscount = totalItems >= 5 ? subtotal * 0.02 : 0;

        let shippingDiscount = 0;
        const addressInput = document.getElementById('customer-address');
        if (cart.length > 0 && addressInput && addressInput.value) {
            const address = addressInput.value.toLowerCase();
            const addressParts = address.split(',');
            const jabodetabekCities = ['jakarta', 'bogor', 'depok', 'tangerang', 'bekasi'];
            
            const isJabodetabek = addressParts.some(part => {
                const trimmedPart = part.trim();
                return jabodetabekCities.some(city => 
                    trimmedPart === city || 
                    trimmedPart.startsWith(city + ' ') ||
                    trimmedPart.startsWith('kota ' + city) ||
                    trimmedPart.startsWith('kab ' + city) ||
                    trimmedPart.startsWith('kabupaten ' + city)
                );
            });

            if (isJabodetabek) {
                shippingDiscount = 2000;
            }
        }

        const total = subtotal - productDiscount - shippingDiscount;
        return { subtotal, totalItems, discount: productDiscount, shippingDiscount, total };
    };

    const saveFavorites = () => localStorage.setItem('favorites', JSON.stringify(favorites));

    const toggleFavorite = (productId, buttonElement) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const favoriteIndex = favorites.findIndex(item => item.id === productId);

        if (favoriteIndex > -1) {
            favorites.splice(favoriteIndex, 1);
            showToast(`"${product.name}" dihapus dari favorit.`, "info");
        } else {
            favorites.push({ id: product.id });
            showToast(`"${product.name}" ditambahkan ke favorit!`, "success");
        }
        saveFavorites();
        renderFavorites();
        updateAllFavoriteButtons();
    };
    
    const renderFavorites = () => {
        const favProducts = products.filter(p => favorites.some(fav => fav.id === p.id));
        favoriteProductsList.innerHTML = '';
        if (favProducts.length === 0) {
            emptyFavoritesMessage.style.display = 'block';
        } else {
            emptyFavoritesMessage.style.display = 'none';
            favProducts.forEach(product => {
                favoriteProductsList.insertAdjacentHTML('beforeend', createProductCardHTML(product));
            });
            attachProductCardListeners(favoriteProductsList);
        }
        favoriteCountSpan.textContent = favorites.length;
    };
    
    const updateAllFavoriteButtons = () => {
        document.querySelectorAll('.add-to-favorite').forEach(button => {
            const card = button.closest('.product-card, .modal-content');
            if (!card) return;
            const productId = card.dataset.productId || (card.querySelector('.modal-add-to-favorite') ? card.querySelector('.modal-add-to-favorite').dataset.id : null);
            if (!productId) return;
            const isFavorited = favorites.some(fav => fav.id === productId);
            button.classList.toggle('favorited', isFavorited);
            button.querySelector('i').className = `fa-heart ${isFavorited ? 'fas' : 'far'}`;
        });
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
                    <span class="review-date">${new Date(review.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</span>
                </div>
                <div class="review-rating">${generateStarsHTML(review.rating)}</div>
                <p class="review-text">${review.text}</p>
            </div>
        `).join('');
    };

    const openQuickViewModal = (productId) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const modalContent = quickViewModal.querySelector('.modal-content');
        modalContent.dataset.productId = productId;

        quickViewModal.querySelector('img').src = product.image;
        quickViewModal.querySelector('img').alt = product.name;
        document.getElementById('modal-product-name').textContent = product.name;
        document.getElementById('modal-product-description').textContent = product.description;
        
        const updateModalPrice = (size) => {
             document.getElementById('modal-product-price').textContent = formatRupiah(getPriceBySize(product.basePrice, size));
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
        
        modalAddToCartBtn.dataset.id = product.id;
        modalAddToCartBtn.disabled = product.stock === 0;
        modalAddToCartBtn.innerHTML = product.stock === 0 ? '<i class="fas fa-times-circle"></i> Stok Habis' : '<i class="fas fa-shopping-cart"></i> Tambah ke Keranjang';
        
        modalAddToCartBtn.onclick = () => {
            if (product.stock === 0) return;
            const selectedSizeEl = modalSizeOptions.querySelector('.size-option.selected');
            if (!selectedSizeEl) {
                showToast("Mohon pilih ukuran terlebih dahulu!", "warning");
                return;
            }
            addToCart(productId, selectedSizeEl.dataset.size, quickViewModal);
            closeModal(quickViewModal);
        };

        quickViewModal.querySelector('.modal-add-to-favorite').dataset.id = product.id;
        quickViewModal.querySelector('.modal-share-product-btn').onclick = () => shareProduct(product);
        
        renderReviews(product);

        updateAllFavoriteButtons();
        openModal(quickViewModal);
    };

    let confirmCallback = null;
    const showConfirmationModal = (message, callback) => {
        confirmMessage.textContent = message;
        confirmCallback = callback;
        openModal(confirmationModal);
    };

    const updateCheckoutUI = () => {
        progressBar.className = 'progress-bar';
        progressBar.classList.add(`step-${currentStep}`);
        document.querySelectorAll('.progress-step').forEach(step => {
            step.classList.toggle('active', parseInt(step.dataset.step) <= currentStep);
        });
        checkoutSteps.forEach(step => {
            step.classList.toggle('active', parseInt(step.dataset.step) === currentStep);
        });
        prevStepBtn.style.display = currentStep > 1 ? 'inline-flex' : 'none';
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
        
        if (!isValid) {
            showToast(`Mohon lengkapi semua data pada langkah ${stepNumber}.`, 'warning');
        }
        return isValid;
    };
    
    const renderFinalSummary = () => {
        const { subtotal, totalItems, discount, shippingDiscount, total } = calculateCartTotals();
        const formData = new FormData(checkoutForm);
        const expedition = formData.get('expeditionMethod') || 'Belum dipilih';
        const payment = formData.get('paymentMethod') || 'Belum dipilih';

        const shippingDiscountHTML = shippingDiscount > 0
            ? `<p><span>Promo Ongkir (Jabodetabek):</span> <span>- ${formatRupiah(shippingDiscount)}</span></p>`
            : '';

        finalOrderSummaryContainer.innerHTML = `
            <p><span>Total Barang:</span> <span>${totalItems} pcs</span></p>
            <p><span>Subtotal:</span> <span>${formatRupiah(subtotal)}</span></p>
            <p><span>Diskon Pembelian:</span> <span>-${formatRupiah(discount)}</span></p>
            ${shippingDiscountHTML}
            <hr style="border: none; border-top: 1px dashed var(--border-color); margin: 1rem 0;">
            <p><span>Ekspedisi:</span> <span>${expedition}</span></p>
            <p><span>Pembayaran:</span> <span>${payment}</span></p>
            <p class="total-row"><span>Total Akhir:</span> <span>${formatRupiah(total)}</span></p>
        `;
    }

    const renderOrderHistory = () => {
        const history = JSON.parse(localStorage.getItem('orderHistory')) || [];
        orderHistoryList.innerHTML = '';

        if (history.length === 0) {
            emptyHistoryMessage.style.display = 'block';
        } else {
            emptyHistoryMessage.style.display = 'none';
            history.forEach(order => {
                const orderDate = new Date(order.date).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                });
                const orderCard = document.createElement('div');
                orderCard.className = 'order-history-card';
                orderCard.innerHTML = `
                    <div class="order-history-header">
                        <h4>Pesanan: ${order.orderId}</h4>
                        <p>${orderDate}</p>
                    </div>
                    <div class="order-history-body">
                        <ul>
                            ${order.items.map(item => `<li>${item.name} (${item.size}) x ${item.quantity}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="order-history-footer">
                        <strong>Total: ${formatRupiah(order.total)}</strong>
                    </div>`;
                orderHistoryList.appendChild(orderCard);
            });
        }
    };

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            body.classList.remove('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    };

    const renderSearchSuggestions = (query) => {
        if (!query) {
            searchSuggestionsContainer.style.display = 'none';
            return;
        }

        const filteredProducts = products.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);

        if (filteredProducts.length > 0) {
            searchSuggestionsContainer.innerHTML = filteredProducts.map(product => `
                <div class="suggestion-item" data-product-name="${product.name}">
                    <img src="${product.image}" alt="${product.name}">
                    <span>${product.name}</span>
                </div>
            `).join('');

            searchSuggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    const productName = item.dataset.productName;
                    searchInput.value = productName;
                    searchSuggestionsContainer.style.display = 'none';
                    renderAllProductShowcases(productName);
                });
            });

            searchSuggestionsContainer.style.display = 'block';
        } else {
            searchSuggestionsContainer.style.display = 'none';
        }
    };

    const initializeNavigation = () => {
        const navLinks = mainNav.querySelectorAll('a');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                navLinks.forEach(l => l.classList.remove('active'));
                e.currentTarget.classList.add('active');
                if (e.currentTarget.getAttribute('href') === '#hero') {
                    e.preventDefault();
                    searchInput.value = '';
                    renderAllProductShowcases();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
    };

    // === [BARU] FUNGSI UNTUK MENGATUR BAR PROGRES SCROLL ===
    const handleScrollProgress = () => {
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (!progressBar) return;

        const totalScrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const currentScrollPosition = window.scrollY;
        
        if (totalScrollableHeight <= 0) {
            progressBar.style.width = '0%';
            return;
        }
        
        const scrollPercentage = (currentScrollPosition / totalScrollableHeight) * 100;
        
        progressBar.style.width = `${scrollPercentage}%`;
    };

    searchButton.addEventListener('click', () => {
        renderAllProductShowcases(searchInput.value.trim());
        searchSuggestionsContainer.style.display = 'none';
    });
    
    searchInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            renderAllProductShowcases(searchInput.value.trim());
            searchSuggestionsContainer.style.display = 'none';
        }
    });

    searchInput.addEventListener('input', () => {
        renderSearchSuggestions(searchInput.value.trim());
    });

    document.addEventListener('click', (e) => {
        const searchWrapper = document.querySelector('.search-input-wrapper');
        if (searchWrapper && !searchWrapper.contains(e.target)) {
            searchSuggestionsContainer.style.display = 'none';
        }
    });

    checkoutBtn.addEventListener('click', () => {
        checkoutFormContainer.style.display = 'block';
        cartSummary.style.display = 'none';
        checkoutBtn.style.display = 'none';
        currentStep = 1;
        updateCheckoutUI();
        checkoutFormContainer.scrollIntoView({ behavior: 'smooth' });
    });
    
    nextStepBtn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            currentStep++;
            if (currentStep === 3) renderFinalSummary();
            updateCheckoutUI();
        }
    });

    prevStepBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateCheckoutUI();
        }
    });

    quickViewModal.querySelector('.modal-add-to-favorite').addEventListener('click', e => {
        toggleFavorite(e.currentTarget.dataset.id, e.currentTarget);
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', e => {
            if (e.target === modal || e.target.classList.contains('close-button')) {
                closeModal(modal);
            }
        });
    });
    
    confirmYesBtn.addEventListener('click', () => {
        if (confirmCallback) confirmCallback();
        closeModal(confirmationModal);
    });
    confirmNoBtn.addEventListener('click', () => closeModal(confirmationModal));

    modalSizeGuideBtn.addEventListener('click', renderSizeGuide);

    window.addEventListener('scroll', () => {
        backToTopButton.classList.toggle('show', window.scrollY > 300);
        
        // Panggil fungsi untuk bar progres
        handleScrollProgress();
        
        document.querySelectorAll('section, footer').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9 && rect.bottom >= 0) {
                 el.classList.add('visible');
            }
        });
    });
    backToTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    darkModeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
        applyTheme(isDarkMode ? 'light' : 'dark');
    });

    const initializeApp = () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);

        handleScrollProgress();
        
        initializeNavigation();

        renderSkeletonLoaders(productList, 4);
        renderSkeletonLoaders(blackClothingList, 2);
        renderSkeletonLoaders(whiteClothingList, 2);
        
        setTimeout(() => {
            renderAllProductShowcases();
            renderCart();
            renderFavorites();
            renderOrderHistory();
            updateAllFavoriteButtons();

            currentYearSpan.textContent = new Date().getFullYear();
            if (sellerAddressSpan) sellerAddressSpan.textContent = sellerInfo.address;
            if (sellerPhoneSpan) sellerPhoneSpan.textContent = sellerInfo.phone;
            if (sellerEmailSpan) sellerEmailSpan.textContent = sellerInfo.email;
            if (sellerPhoneLink) sellerPhoneLink.href = `tel:${sellerInfo.phone}`;
            if (sellerEmailLink) sellerEmailLink.href = `mailto:${sellerInfo.email}`;
            
            document.querySelectorAll('section, footer').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.9 && rect.bottom >= 0) {
                    el.classList.add('visible');
                }
            });
            body.classList.remove('no-scroll');
        }, 1200);
    };

    // === [BARU] LOGIKA UNTUK LOADING SCREEN VIDEO ===
    const startApp = () => {
        // Hapus loading screen dengan efek fade-out
        if(loadingScreen) {
            loadingScreen.classList.add('hidden');
            
            // Hapus elemen dari DOM setelah transisi selesai agar tidak mengganggu
            loadingScreen.addEventListener('transitionend', () => {
                loadingScreen.style.display = 'none'; 
            }, { once: true });
        }
        
        // Panggil fungsi inisialisasi utama HANYA SETELAH video selesai
        initializeApp();
    };

    // Panggil startApp ketika video selesai diputar
    if (loadingVideo) {
        // Jika video bisa selesai diputar
        loadingVideo.addEventListener('ended', startApp);
        
        // Fallback: jika video gagal dimuat, langsung mulai aplikasi
        loadingVideo.addEventListener('error', () => {
            console.error("Video loading screen gagal dimuat.");
            startApp();
        });
    } else {
        // Fallback: jika elemen video tidak ada, langsung mulai aplikasi
        startApp();
    }
});