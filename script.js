document.addEventListener('DOMContentLoaded', () => {
    // Dummy Data Produk
    const products = [
        {
            id: 'baju-001',
            name: 'Skeleton',
            image: 'Skeleton.jpg', // Pastikan gambar ini ada di folder Anda
            description: 'T-Shirt paling nyaman dan bagus untuk dipakai setiap hari, cocok disemua musim.',
            basePrice: 95000,
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            color: 'putih'
        },
        {
            id: 'baju-002',
            name: 'Dog and éclipse',
            image: 'Dog.jpg', // Pastikan gambar ini ada di folder Anda
            description: 'T-Shirt paling nyaman dan bagus untuk dipakai setiap hari, cocok disemua musim.',
            basePrice: 95000,
            sizes: ['XS','S', 'M', 'L', 'XL'],
            color: 'hitam'
        },
        {
            id: 'baju-003',
            name: 'Travis Scoot',
            image: 'Travis scoot.jpg', // Pastikan gambar ini ada di folder Anda
            description: 'T-Shirt paling nyaman dan bagus untuk dipakai setiap hari, cocok disemua musim.',
            basePrice: 95000,
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            color: 'hitam'
        },
        {
            id: 'baju-004',
            name: 'Person',
            image: 'Person.jpg', // Pastikan gambar ini ada di folder Anda
            description: 'T-Shirt paling nyaman dan bagus untuk dipakai setiap hari, cocok disemua musim.',
            basePrice: 95000,
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            color: 'hitam'
        },
        // Tambahkan produk lain sesuai kebutuhan Anda
    ];

    // --- INFORMASI PENJUAL ---
    const sellerInfo = {
        name: "Luxuliver Official",
        address: "Jakarta Selatan, DKI Jakarta, Indonesia",
        phone: "+62 852-1819-7546", // Nomor telepon untuk ditampilkan
        email: "info@luxuliver.com",
        instagram: "https://www.instagram.com/luxuliver", // Link Ig
        whatsappAdmin: "6287871420482" // Nomor WhatsApp admin untuk order (tanpa + dan spasi)
    };
    // --- AKHIR INFORMASI PENJUAL ---

    // NEW: DATA PANDUAN UKURAN
    const sizeGuideData = [
        { size: 'XS', length: '66', chest: '92', sleeve: '20' },
        { size: 'S', length: '68', chest: '96', sleeve: '21' },
        { size: 'M', length: '72', chest: '100', sleeve: '22' },
        { size: 'L', length: '74', chest: '104', sleeve: '23' },
        { size: 'XL', length: '76', chest: '108', sleeve: '24' }
    ];
    // --- AKHIR DATA PANDUAN UKURAN ---

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let orderCounter = parseInt(localStorage.getItem('orderCounter')) || 1000;
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []; 

    // DOM Elements
    const body = document.body;
    const productList = document.getElementById('product-list');
    const blackClothingList = document.getElementById('black-clothing-list');
    const whiteClothingList = document.getElementById('white-clothing-list');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountSpan = document.getElementById('cart-count');
    const subtotalPriceSpan = document.getElementById('subtotal-price');
    const discountAmountSpan = document.getElementById('discount-amount');
    const totalPriceSpan = document.getElementById('total-price');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const noResultsMessage = document.getElementById('no-results-message');
    const noBlackClothingMessage = document.getElementById('no-black-clothing');
    const noWhiteClothingMessage = document.getElementById('no-white-clothing');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutFormContainer = document.getElementById('checkout-form-container');
    const checkoutForm = document.getElementById('checkout-form');
    const currentYearSpan = document.getElementById('current-year');

    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    const backToTopButton = document.getElementById('back-to-top');

    // Quick View Modal Elements
    const quickViewModal = document.getElementById('quick-view-modal');
    const closeModalButton = quickViewModal.querySelector('.close-button');
    const modalBody = quickViewModal.querySelector('.modal-body');
    const modalAddToCartBtn = document.getElementById('modal-add-to-cart-btn');
    const modalSizeOptions = document.getElementById('modal-size-options');
    // NEW: Size Guide Modal Elements
    const sizeGuideModal = document.getElementById('size-guide-modal');
    const closeSizeGuideModalButton = sizeGuideModal.querySelector('.close-button');
    const modalSizeGuideBtn = document.getElementById('modal-size-guide-btn');
    const sizeChartTableBody = document.getElementById('size-chart-table').querySelector('tbody');

    // Footer contact info elements
    const sellerAddressSpan = document.getElementById('seller-address');
    const sellerPhoneSpan = document.getElementById('seller-phone');
    const sellerEmailSpan = document.getElementById('seller-email');

    // Favorit DOM Elements
    const favoriteCountSpan = document.getElementById('favorite-count');
    const favoriteProductsList = document.getElementById('favorite-products-list');
    const emptyFavoritesMessage = document.getElementById('empty-favorites-message');

    const expeditionMethodSelect = document.getElementById('expedition-method');
    const expeditionImageDisplay = document.getElementById('expedition-image-display');

// Variabel untuk Metode Pembayaran BARU
const paymentMethodSelect = document.getElementById('payment-method');
const paymentImageDisplay = document.getElementById('payment-image-display');

    // NEW: Elemen untuk Confirmation Modal
    const confirmationModal = document.getElementById('confirmation-modal');
    const confirmMessage = document.getElementById('confirm-message');
    const confirmYesBtn = document.getElementById('confirm-yes');
    const confirmNoBtn = document.getElementById('confirm-no');

    // NEW: Elemen untuk Toast/Snackbar Container (akan dibuat dan ditambahkan ke body)
    const toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);

    // --- Fungsi Bantuan ---
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
    };

    const getPriceBySize = (basePrice, size) => {
        if (size && size.toUpperCase() === 'XL') {
            return basePrice + 5000; // Contoh: Harga +5000 untuk ukuran XL
        }
        return basePrice;
    };

    // NEW: Fungsi untuk menampilkan Toast/Snackbar Notification
    const showToast = (message, type = 'info') => {
        const toast = document.createElement('div');
        toast.classList.add('toast-notification', type); // Tambahkan kelas 'info', 'success', 'error', 'warning'
        toast.textContent = message;
        toastContainer.appendChild(toast);

        // Paksa reflow untuk animasi (penting untuk CSS transition)
        void toast.offsetWidth; 
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            // Hapus toast dari DOM setelah animasi selesai
            toast.addEventListener('transitionend', () => toast.remove());
        }, 3000); // Notifikasi akan hilang setelah 3 detik
    };

    // NEW: Fungsi untuk merender dan menampilkan tabel panduan ukuran
    const renderSizeGuide = () => {
        sizeChartTableBody.innerHTML = ''; // Kosongkan tabel
        sizeGuideData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.size}</td>
                <td>${item.length}</td>
                <td>${item.chest}</td>
                <td>${item.sleeve}</td>
            `;
            sizeChartTableBody.appendChild(row);
        });
        sizeGuideModal.style.display = 'block';
        body.classList.add('no-scroll');
    };

    // NEW: Fungsi untuk membagikan produk
    const shareProduct = async (product) => {
        const shareData = {
            title: product.name,
            text: `Lihat T-Shirt keren "${product.name}" ini di Luxuliver Shop! Harga mulai ${formatRupiah(product.basePrice)}. ${product.description}`,
            url: window.location.origin + window.location.pathname + `#product-${product.id}` // Link ke bagian produk di halaman
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                showToast('Produk berhasil dibagikan!', 'success');
            } else {
                // Fallback for browsers that don't support Web Share API
                const productUrl = `${window.location.origin}${window.location.pathname}#product-${product.id}`;
                navigator.clipboard.writeText(shareData.text + '\n' + productUrl).then(() => {
                    showToast('Detail produk dan link telah disalin ke clipboard! Anda bisa menempelkannya ke mana saja.', 'info');
                }).catch(err => {
                    console.error('Gagal menyalin:', err);
                    showToast('Gagal menyalin detail produk.', 'error');
                });
            }
        } catch (err) {
            console.error('Error sharing:', err);
            // Ini bisa terjadi jika user membatalkan share
            if (err.name !== 'AbortError') {
                showToast('Gagal membagikan produk.', 'error');
            }
        }
    };

    // --- Render Skeleton Loader ---
    const renderSkeletonLoaders = (containerElement, count) => {
        containerElement.innerHTML = ''; // Clear existing content
        for (let i = 0; i < count; i++) {
            const skeletonCard = document.createElement('div');
            skeletonCard.classList.add('skeleton-card');
            skeletonCard.innerHTML = `
                <div class="skeleton-image"></div>
                <div class="skeleton-info">
                    <div class="skeleton-text skeleton-text-lg"></div>
                    <div class="skeleton-text skeleton-text-sm"></div>
                    <div class="skeleton-text skeleton-text-xs"></div>
                    <div class="skeleton-button"></div>
                </div>
            `;
            containerElement.appendChild(skeletonCard);
        }
    };

    // --- Render Produk (Fungsi yang lebih fleksibel untuk berbagai etalase) ---
    const renderProductsInContainer = (productsToRender, containerElement, noResultsElement, initialLoad = false) => {
        // Tampilkan skeleton jika ini bukan pemanggilan ulang (misal setelah search)
        if (!initialLoad && productsToRender.length > 0) {
             const skeletonCount = Math.min(productsToRender.length, 8); // Max 8 skeletons
             renderSkeletonLoaders(containerElement, skeletonCount);
        }
       
        // Simulasikan loading data dengan setTimeout
        setTimeout(() => {
            containerElement.innerHTML = ''; // Hapus skeleton loader
            if (productsToRender.length === 0) {
                noResultsElement.style.display = 'block';
                if (containerElement === productList) {
                    noResultsElement.textContent = "Produk tidak ditemukan.";
                } else if (containerElement === blackClothingList) {
                    noResultsElement.textContent = "Belum ada koleksi baju hitam saat ini.";
                } else if (containerElement === whiteClothingList) {
                    noResultsElement.textContent = "Belum ada koleksi baju putih saat ini.";
                }
            } else {
                noResultsElement.style.display = 'none';
                productsToRender.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');
                    productCard.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <div class="product-info">
                            <h3>${product.name}</h3>
                            <p class="price">${formatRupiah(getPriceBySize(product.basePrice, 'M'))}</p>
                            <div class="size-options" data-product-id="${product.id}">
                                ${product.sizes.map(size => `<span class="size-option" data-size="${size}">${size}</span>`).join('')}
                            </div>
                            <div class="product-actions">
                                <button class="btn add-to-cart" data-id="${product.id}"><i class="fas fa-shopping-cart"></i> Tambah ke Keranjang</button>
                                <button class="btn quick-view-btn" data-id="${product.id}"><i class="fas fa-eye"></i> Quick View</button>
                                <button class="btn add-to-favorite" data-id="${product.id}"><i class="far fa-heart"></i></button>
                            </div>
                        </div>
                    `;
                    containerElement.appendChild(productCard);
                });
            // Event Listener untuk Metode Ekspedisi
expeditionMethodSelect.addEventListener('change', () => {
    const selectedOption = expeditionMethodSelect.options[expeditionMethodSelect.selectedIndex];
    const imageUrl = selectedOption.dataset.image;

    if (imageUrl) {
        expeditionImageDisplay.innerHTML = `<img src="${imageUrl}" alt="Logo Ekspedisi" style="max-width: 100px; margin-top: 10px; display: block;">`;
    } else {
        expeditionImageDisplay.innerHTML = '';
    }
});

// Event Listener untuk Metode Pembayaran BARU
paymentMethodSelect.addEventListener('change', () => {
    const selectedOption = paymentMethodSelect.options[paymentMethodSelect.selectedIndex];
    const imageUrl = selectedOption.dataset.image;

    if (imageUrl) {
        paymentImageDisplay.innerHTML = `<img src="${imageUrl}" alt="Logo Pembayaran" style="max-width: 100px; margin-top: 10px; display: block;">`;
    } else {
        paymentImageDisplay.innerHTML = '';
    }
});

                // Event listener untuk pilihan ukuran
                containerElement.querySelectorAll('.size-option').forEach(option => {
                    option.addEventListener('click', (e) => {
                        const parentSizes = e.target.closest('.product-card').querySelector('.size-options');
                        parentSizes.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
                        e.target.classList.add('selected');
                    });
                });

                // Event listener untuk tombol Add to Cart
                containerElement.querySelectorAll('.add-to-cart').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const productId = e.target.dataset.id;
                        const selectedSizeElement = e.target.closest('.product-card').querySelector('.size-option.selected');

                        if (!selectedSizeElement) {
                            showToast("Mohon pilih ukuran baju terlebih dahulu!", "warning");
                            return;
                        }
                        const selectedSize = selectedSizeElement.dataset.size;
                        addToCart(productId, selectedSize);

                        // Feedback visual tombol "Ditambahkan!"
                        const originalText = button.textContent;
                        button.textContent = "✅ Ditambahkan!";
                        button.classList.add('added');
                        button.disabled = true;

                        setTimeout(() => {
                            button.textContent = originalText;
                            button.classList.remove('added');
                            button.disabled = false;
                        }, 1500);
                    });
                });

                // Event listener untuk tombol Quick View
                containerElement.querySelectorAll('.quick-view-btn').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const productId = e.target.dataset.id;
                        openQuickViewModal(productId);
                    });
                });

                // Event listener untuk tombol Favorit
                containerElement.querySelectorAll('.add-to-favorite').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const productId = e.target.dataset.id || e.target.closest('button').dataset.id;
                        toggleFavorite(productId, e.target.closest('button'));
                    });
                });

                // --- BAGIAN INI DIHAPUS (TOMBOL BAGIKAN DI KARTU PRODUK UTAMA) ---
                // containerElement.querySelectorAll('.share-product-btn').forEach(button => {
                //     button.addEventListener('click', (e) => {
                //         const productId = e.target.dataset.id || e.target.closest('button').dataset.id;
                //         const productToShare = products.find(p => p.id === productId);
                //         if (productToShare) {
                //             shareProduct(productToShare);
                //         }
                //     });
                // });
            }
            updateFavoriteButtons(); // Pastikan tombol favorit diperbarui setelah render
        }, initialLoad ? 0 : 700); // Waktu loading simulasi
    };

    // --- Fungsi Utama Render Etalase ---
    const renderAllProductShowcases = (searchTerm = '') => {
        let filteredProducts = products;

        const allCollectionsTitle = document.querySelector('#koleksi h2');

        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                product.description.toLowerCase().includes(lowerCaseSearchTerm)
            );
            document.getElementById('baju-hitam').style.display = 'none';
            document.getElementById('baju-putih').style.display = 'none';
            allCollectionsTitle.textContent = `Hasil Pencarian untuk "${searchTerm}"`;
        } else {
            document.getElementById('baju-hitam').style.display = 'block';
            document.getElementById('baju-putih').style.display = 'block';
            allCollectionsTitle.textContent = "Semua Koleksi";
        }

        renderProductsInContainer(filteredProducts, productList, noResultsMessage);

        if (!searchTerm) {
            const blackClothing = products.filter(p => p.color && p.color.toLowerCase() === 'hitam');
            renderProductsInContainer(blackClothing, blackClothingList, noBlackClothingMessage);
        } else {
            blackClothingList.innerHTML = '';
            noBlackClothingMessage.style.display = 'none';
        }

        if (!searchTerm) {
            const whiteClothing = products.filter(p => p.color && p.color.toLowerCase() === 'putih');
            renderProductsInContainer(whiteClothing, whiteClothingList, noWhiteClothingMessage);
        } else {
            whiteClothingList.innerHTML = '';
            noWhiteClothingMessage.style.display = 'none';
        }
    };

    // --- Event Listener Pencarian ---
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        renderAllProductShowcases(searchTerm);
    });
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            renderAllProductShowcases(searchTerm);
        }
    });

    // --- Keranjang Belanja ---
    const addToCart = (productId, size) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const price = getPriceBySize(product.basePrice, size);
        const existingItemIndex = cart.findIndex(item => item.id === productId && item.size === size);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity++;
            showToast(`Kuantitas ${product.name} (${size}) diperbarui di keranjang!`, "info");
        } else {
            cart.push({ id: product.id, name: product.name, image: product.image, price: price, size: size, quantity: 1 });
            showToast(`${product.name} (${size}) ditambahkan ke keranjang!`, "success");
        }
        saveCart();
        renderCart();
    };

    const updateQuantity = (productId, size, change) => {
        const itemIndex = cart.findIndex(item => item.id === productId && item.size === size);
        if (itemIndex > -1) {
            if (cart[itemIndex].quantity + change <= 0) {
                // NEW: Tampilkan modal konfirmasi sebelum menghapus
                showConfirmationModal(`Anda yakin ingin menghapus "${cart[itemIndex].name} (${cart[itemIndex].size})" dari keranjang?`, () => {
                    const removedItemName = cart[itemIndex].name; // Simpan nama sebelum dihapus
                    const removedItemSize = cart[itemIndex].size; // Simpan ukuran sebelum dihapus
                    cart.splice(itemIndex, 1);
                    saveCart();
                    renderCart();
                    showToast(`"${removedItemName} (${removedItemSize})" berhasil dihapus dari keranjang.`, "success");
                });
            } else {
                cart[itemIndex].quantity += change;
                saveCart();
                renderCart();
                showToast(`Kuantitas "${cart[itemIndex].name} (${cart[itemIndex].size})" diubah.`, "info");
            }
        }
    };

    const calculateCartTotals = () => {
        let subtotal = 0;
        let totalItems = 0;
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
            totalItems += item.quantity;
        });

        let discount = 0;
        if (totalItems >= 5) {
            discount = subtotal * 0.02; // Diskon 2% jika 5 item atau lebih
        }

        const total = subtotal - discount;
        return { subtotal, discount, total, totalItems };
    };

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const renderCart = () => {
        cartItemsContainer.innerHTML = '';
        const { subtotal, discount, total, totalItems } = calculateCartTotals();

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            checkoutBtn.style.display = 'none'; // Sembunyikan tombol checkout
            checkoutFormContainer.style.display = 'none'; // Sembunyikan form checkout
        } else {
            emptyCartMessage.style.display = 'none';
            checkoutBtn.style.display = 'block'; // Tampilkan tombol checkout
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h4>${item.name} (${item.size})</h4>
                        <p>${formatRupiah(item.price)}</p>
                    </div>
                    <div class="quantity-controls">
                        <button class="decrease-quantity" data-id="${item.id}" data-size="${item.size}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-quantity" data-id="${item.id}" data-size="${item.size}">+</button>
                    </div>
                    <div class="item-price">${formatRupiah(item.price * item.quantity)}</div>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });

            // Event listeners untuk tombol quantity
            cartItemsContainer.querySelectorAll('.decrease-quantity').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = e.target.dataset.id;
                    const size = e.target.dataset.size;
                    updateQuantity(productId, size, -1);
                });
            });

            cartItemsContainer.querySelectorAll('.increase-quantity').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = e.target.dataset.id;
                    const size = e.target.dataset.size;
                    updateQuantity(productId, size, 1);
                });
            });
        }

        cartCountSpan.textContent = totalItems;
        subtotalPriceSpan.textContent = formatRupiah(subtotal);
        discountAmountSpan.textContent = formatRupiah(discount);
        totalPriceSpan.textContent = formatRupiah(total);
    };

    // --- Checkout Form ---
    checkoutBtn.addEventListener('click', () => {
        checkoutFormContainer.style.display = 'block';
        checkoutBtn.style.display = 'none'; // Sembunyikan tombol checkout setelah form muncul
        // Gulir ke form checkout
        checkoutFormContainer.scrollIntoView({ behavior: 'smooth' });
    });

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const customerName = document.getElementById('customer-name').value;
        const customerPhone = document.getElementById('customer-phone').value;
        const customerAddress = document.getElementById('customer-address').value;
        const expeditionMethod = expeditionMethodSelect.value;
        const paymentMethod = paymentMethodSelect.value; 

        // VALIDASI NOMOR TELEPON: Antara 10 sampai 15 digit angka saja
        const phoneRegex = /^[0-9]{10,15}$/; 
        if (!phoneRegex.test(customerPhone)) {
            showToast("Nomor WhatsApp tidak valid. Harap masukkan antara 10 hingga 15 digit angka saja.", "error");
            return;
        }
        
        const { total } = calculateCartTotals();
        const orderId = `LXVR-${orderCounter++}`; // Buat ID pesanan unik
        localStorage.setItem('orderCounter', orderCounter); // Simpan counter baru

        let orderDetails = `*Order Baru dari Luxuliver Shop*\n\n`;
        orderDetails += `*ID Pesanan:* ${orderId}\n`;
        orderDetails += `*Nama Pelanggan:* ${customerName}\n`;
        orderDetails += `*Telepon:* ${customerPhone}\n`;
        orderDetails += `*Alamat:* ${customerAddress}\n`;
        orderDetails += `*Metode Ekspedisi:* ${expeditionMethod.toUpperCase().replace('-', ' ')}\n`;
        orderDetails += `*Metode Pembayaran:* ${paymentMethod.toUpperCase().replace(/_/g, ' ')}\n\n`;
        orderDetails += `*Detail Pesanan:*\n`;

        cart.forEach(item => {
            orderDetails += `- ${item.name} (${item.size}) x ${item.quantity} = ${formatRupiah(item.price * item.quantity)}\n`;
        });

        orderDetails += `\n*Total Pembayaran:* ${formatRupiah(total)}\n\n`;
        orderDetails += `Terima kasih atas kepercayaan Anda berbelanja di Luxuliver dan untuk biaya pengiriman detailnya akan diinformasikan langsung oleh admin kami sesuai lokasi Anda!`;

        const whatsappUrl = `https://wa.me/${sellerInfo.whatsappAdmin}?text=${encodeURIComponent(orderDetails)}`;
        window.open(whatsappUrl, '_blank');

        // Reset keranjang setelah pesanan
        cart = [];
        saveCart();
        renderCart();
        checkoutForm.reset();
        checkoutFormContainer.style.display = 'none'; // Sembunyikan form kembali
        showToast("Pesanan Anda telah berhasil dibuat! Kami akan menghubungi Anda melalui WhatsApp.", "success");
    });


    // --- Quick View Modal Logic ---
    const openQuickViewModal = (productId) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        // Populate modal content
        modalBody.querySelector('img').src = product.image;
        modalBody.querySelector('img').alt = product.name;
        document.getElementById('modal-product-name').textContent = product.name;
        document.getElementById('modal-product-description').textContent = product.description;
        document.getElementById('modal-product-price').textContent = formatRupiah(getPriceBySize(product.basePrice, 'M')); // Default size M for display
        modalAddToCartBtn.dataset.id = product.id; // Set product ID for ATC button

        // Render size options in modal
        modalSizeOptions.innerHTML = product.sizes.map(size => `<span class="size-option" data-size="${size}">${size}</span>`).join('');
        // Add event listeners for size options in modal
        modalSizeOptions.querySelectorAll('.size-option').forEach(option => {
            option.addEventListener('click', (e) => {
                modalSizeOptions.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
                e.target.classList.add('selected');
                // Update price in modal based on selected size
                document.getElementById('modal-product-price').textContent = formatRupiah(getPriceBySize(product.basePrice, e.target.dataset.size));
            });
        });

        // Set default selected size to M if available, otherwise first size
        const defaultSizeOption = modalSizeOptions.querySelector('.size-option[data-size="M"]') || modalSizeOptions.querySelector('.size-option');
        if (defaultSizeOption) {
            defaultSizeOption.classList.add('selected');
            // Ensure modal price reflects default selected size
            document.getElementById('modal-product-price').textContent = formatRupiah(getPriceBySize(product.basePrice, defaultSizeOption.dataset.size));
        }

        // Set product ID for modal's Add to Favorite button
        const modalAddtoFavoriteBtn = quickViewModal.querySelector('.modal-add-to-favorite');
        modalAddtoFavoriteBtn.dataset.id = product.id;
        // Update its state
        updateFavoriteButtons(); // Call this to set the correct class and icon

        // Set product ID for modal's Share Product button
        const modalShareProductBtn = quickViewModal.querySelector('.modal-share-product-btn');
        modalShareProductBtn.dataset.id = product.id;
        modalShareProductBtn.onclick = () => shareProduct(product); // Pasang event listener langsung

        quickViewModal.classList.add('show');
        body.classList.add('no-scroll'); // Prevent body scroll
    };

    // Event Listener untuk tombol Tutup Modal Quick View
    closeModalButton.addEventListener('click', () => {
        quickViewModal.style.display = 'none';
        body.classList.remove('no-scroll');
    });

    // NEW: Event Listener untuk tombol "Panduan Ukuran" di dalam Quick View Modal
    if (modalSizeGuideBtn) {
        modalSizeGuideBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Mencegah modal quick view tertutup
            renderSizeGuide(); // Panggil fungsi untuk menampilkan panduan ukuran
        });
    }

    // NEW: Event Listener untuk tombol Tutup Modal Panduan Ukuran
    if (closeSizeGuideModalButton) {
        closeSizeGuideModalButton.addEventListener('click', () => {
            sizeGuideModal.style.display = 'none';
            body.classList.remove('no-scroll');
        });
    }

    // NEW: Tutup modal panduan ukuran jika klik di luar area modal
    window.addEventListener('click', (event) => {
        if (event.target === sizeGuideModal) {
            sizeGuideModal.style.display = 'none';
            body.classList.remove('no-scroll');
        }
    });

    window.addEventListener('click', (e) => {
        if (e.target === quickViewModal) {
            quickViewModal.classList.remove('show');
            body.classList.remove('no-scroll');
        }
    });

    // Event listener for Add to Cart button within modal
    modalAddToCartBtn.addEventListener('click', (e) => {
        const productId = e.target.dataset.id;
        const selectedSizeElement = modalSizeOptions.querySelector('.size-option.selected');

        if (!selectedSizeElement) {
            showToast("Mohon pilih ukuran baju terlebih dahulu!", "warning");
            return;
        }
        const selectedSize = selectedSizeElement.dataset.size;
        addToCart(productId, selectedSize);

        // Feedback visual tombol "Ditambahkan!"
        const originalText = modalAddToCartBtn.textContent;
        modalAddToCartBtn.textContent = "✅ Ditambahkan!";
        modalAddToCartBtn.classList.add('added');
        modalAddToCartBtn.disabled = true;

        setTimeout(() => {
            modalAddToCartBtn.textContent = originalText;
            modalAddToCartBtn.classList.remove('added');
            modalAddToCartBtn.disabled = false;
        }, 1500);
    });

    // Event listener for Add to Favorite button within modal
    quickViewModal.querySelector('.modal-add-to-favorite').addEventListener('click', (e) => {
        const modalProductId = e.target.dataset.id || e.target.closest('button').dataset.id;
        toggleFavorite(modalProductId, e.target.closest('button'));
    });


    // --- BACK TO TOP BUTTON ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Skeleton Loader Animation & Scroll Reveal ---
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight * 0.75) { // Atur 75% dari tinggi viewport
                section.classList.add('visible');
            } else {
                section.classList.remove('visible'); // Hapus saat tidak terlihat lagi
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Panggil sekali saat load untuk elemen yang sudah terlihat


    // --- FUNGSI UNTUK FAVORIT ---
    const saveFavorites = () => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    const toggleFavorite = (productId, buttonElement = null) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const favoriteIndex = favorites.findIndex(item => item.id === productId);

        if (favoriteIndex > -1) {
            // Remove from favorites
            favorites.splice(favoriteIndex, 1);
            showToast(`"${product.name}" dihapus dari favorit.`, "info");
            if (buttonElement) {
                buttonElement.classList.remove('favorited');
                buttonElement.querySelector('i').classList.remove('fas');
                buttonElement.querySelector('i').classList.add('far');
            }
        } else {
            // Add to favorites
            // Simpan detail produk yang relevan untuk menampilkan di daftar favorit
            favorites.push({ id: product.id, name: product.name, image: product.image, basePrice: product.basePrice, sizes: product.sizes }); 
            showToast(`"${product.name}" ditambahkan ke favorit!`, "success");
            if (buttonElement) {
                buttonElement.classList.add('favorited');
                buttonElement.querySelector('i').classList.remove('far');
                buttonElement.querySelector('i').classList.add('fas');
            }
        }
        saveFavorites();
        renderFavorites(); // Panggil ini untuk memperbarui tampilan daftar favorit
        updateFavoriteButtons(); // Panggil ini untuk memastikan semua tombol terupdate
    };

    const renderFavorites = () => {
        favoriteProductsList.innerHTML = '';
        if (favorites.length === 0) {
            emptyFavoritesMessage.style.display = 'block';
        } else {
            emptyFavoritesMessage.style.display = 'none';
            favorites.forEach(favProduct => {
                const product = products.find(p => p.id === favProduct.id); // Dapatkan detail lengkap produk
                if (!product) return; // Lewati jika produk tidak ditemukan di data asli

                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="price">${formatRupiah(product.basePrice)}</p>
                        <div class="size-options" data-product-id="${product.id}">
                            ${product.sizes.map(size => `<span class="size-option" data-size="${size}">${size}</span>`).join('')}
                        </div>
                        <div class="product-actions">
                            <button class="btn add-to-cart" data-id="${product.id}"><i class="fas fa-shopping-cart"></i> Tambah ke Keranjang</button>
                            <button class="btn quick-view-btn" data-id="${product.id}"><i class="fas fa-eye"></i> Quick View</button>
                            <button class="btn remove-from-favorite btn-danger" data-id="${product.id}"><i class="fas fa-heart-broken"></i> Hapus</button>
                            <button class="btn share-product-btn" data-id="${product.id}"><i class="fas fa-share-alt"></i> Bagikan</button>
                        </div>
                    </div>
                `;
                favoriteProductsList.appendChild(productCard);
            });

            // Event listener untuk tombol "Tambah ke Keranjang" di daftar favorit (gunakan ukuran M sebagai default jika tidak ada pilihan)
            favoriteProductsList.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = e.target.dataset.id;
                    const productElement = e.target.closest('.product-card');
                    const selectedSizeElement = productElement.querySelector('.size-option.selected');
                    let selectedSize = 'M'; // Default

                    // Pastikan `product` di scope ini adalah produk yang sesuai
                    const currentProduct = products.find(p => p.id === productId);

                    if (selectedSizeElement) {
                        selectedSize = selectedSizeElement.dataset.size;
                    } else if (currentProduct && currentProduct.sizes && currentProduct.sizes.length > 0) {
                        selectedSize = currentProduct.sizes[0]; // Ambil ukuran pertama jika tidak ada yang dipilih
                    }
                    
                    addToCart(productId, selectedSize);
                });
            });
            
            // Event listener untuk pilihan ukuran di daftar favorit
            favoriteProductsList.querySelectorAll('.size-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    const parentSizes = e.target.closest('.product-card').querySelector('.size-options');
                    parentSizes.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
                    e.target.classList.add('selected');
                });
            });


            // Event listener untuk tombol Quick View di daftar favorit
            favoriteProductsList.querySelectorAll('.quick-view-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = e.target.dataset.id;
                    openQuickViewModal(productId);
                });
            });

            // Event listener untuk tombol "Hapus dari Favorit"
            favoriteProductsList.querySelectorAll('.remove-from-favorite').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = e.target.dataset.id;
                    toggleFavorite(productId); // Ini akan menghapus dan memperbarui tampilan
                });
            });

            // Event listener untuk tombol Bagikan Produk di daftar favorit
            favoriteProductsList.querySelectorAll('.share-product-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = e.target.dataset.id || e.target.closest('button').dataset.id;
                    const productToShare = products.find(p => p.id === productId);
                    if (productToShare) {
                        shareProduct(productToShare);
                    }
                });
            });
        }
        favoriteCountSpan.textContent = favorites.length;
    };

    const updateFavoriteButtons = () => {
        // Update tombol favorit di daftar produk utama dan koleksi
        document.querySelectorAll('.add-to-favorite').forEach(button => {
            const productId = button.dataset.id;
            if (favorites.some(fav => fav.id === productId)) {
                button.classList.add('favorited');
                button.querySelector('i').classList.remove('far');
                button.querySelector('i').classList.add('fas');
            } else {
                button.classList.remove('favorited');
                button.querySelector('i').classList.remove('fas');
                button.querySelector('i').classList.add('far');
            }
        });
        // Lakukan hal yang sama untuk tombol di modal quick view jika modal terbuka
        const modalFavButton = quickViewModal.querySelector('.modal-add-to-favorite');
        if (modalFavButton) {
            const productId = modalFavButton.dataset.id;
            if (favorites.some(fav => fav.id === productId)) {
                modalFavButton.classList.add('favorited');
                modalFavButton.querySelector('i').classList.remove('far');
                modalFavButton.querySelector('i').classList.add('fas');
            } else {
                modalFavButton.classList.remove('favorited');
                modalFavButton.querySelector('i').classList.remove('fas');
                modalFavButton.querySelector('i').classList.add('far');
            }
        }
    };
    // AKHIR FUNGSI UNTUK FAVORIT

    // NEW: Fungsi untuk menampilkan Confirmation Modal
    let confirmCallback = null; // Callback saat user klik 'Ya'
    const showConfirmationModal = (message, callback) => {
        confirmMessage.textContent = message;
        confirmationModal.classList.add('show');
        body.classList.add('no-scroll'); // Mencegah scroll di body
        confirmCallback = callback;
    };

    confirmYesBtn.addEventListener('click', () => {
        if (confirmCallback) {
            confirmCallback(); // Jalankan callback (fungsi penghapusan item)
        }
        confirmationModal.classList.remove('show');
        body.classList.remove('no-scroll');
        confirmCallback = null; // Reset callback
    });

    confirmNoBtn.addEventListener('click', () => {
        confirmationModal.classList.remove('show');
        body.classList.remove('no-scroll');
        confirmCallback = null; // Reset callback
        showToast("Penghapusan dibatalkan.", "info"); // Memberi tahu pengguna bahwa aksi dibatalkan
    });

    // Menutup modal jika klik di luar area konten modal
    window.addEventListener('click', (e) => {
        if (e.target === confirmationModal) {
            confirmationModal.classList.remove('show');
            body.classList.remove('no-scroll');
            confirmCallback = null;
        }
    });

    // --- Inisialisasi Aplikasi ---
    const initializeApp = () => {
        // Tampilkan skeleton saat inisialisasi
        renderSkeletonLoaders(productList, 8); // Tampilkan 8 skeleton di koleksi utama
        renderSkeletonLoaders(blackClothingList, 2); // 2 di baju hitam
        renderSkeletonLoaders(whiteClothingList, 2); // 2 di baju putih

        // Kemudian baru render produk asli setelah sedikit delay
        setTimeout(() => {
            renderAllProductShowcases(false); // Render semua produk tanpa filter awal
            renderCart(); // Ini akan mengatur visibility form checkout
            renderFavorites(); // Merender favorit saat load
            currentYearSpan.textContent = new Date().getFullYear();

            // Update informasi penjual di footer
            sellerAddressSpan.textContent = sellerInfo.address;
            sellerPhoneSpan.textContent = sellerInfo.phone;
            sellerEmailSpan.textContent = sellerInfo.email;

            // Update link Instagram di header dan footer
            document.querySelector('nav ul li a[href*="instagram.com"]').href = sellerInfo.instagram;
            document.querySelector('footer a[href*="instagram.com"]').href = sellerInfo.instagram;

            // Hapus kelas no-scroll dari body setelah semua konten dimuat
            body.classList.remove('no-scroll');
        }, 1500); // Penundaan 1.5 detik untuk simulasi loading awal
    };

    initializeApp();
});