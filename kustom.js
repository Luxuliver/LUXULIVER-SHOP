document.addEventListener('DOMContentLoaded', () => {
    const customPackageBtn = document.getElementById('custom-package-btn');
    if (!customPackageBtn) return;

    const modal = document.getElementById('custom-package-modal');
    const step1 = document.getElementById('pk-step-1');
    const step2 = document.getElementById('pk-step-2');
    const step2Title = document.getElementById('pk-step-2-title');
    const productGrid = document.getElementById('pk-product-selection-grid');
    const priceDisplay = document.querySelector('.pk-price-display strong');
    const addToCartBtn = document.getElementById('pk-add-to-cart-btn');
    const sizeModal = document.getElementById('pk-size-modal');
    const sizeModalContent = document.getElementById('pk-size-modal-content');

    const packagePrices = { 2: 190000, 3: 285000, 4: 380000 };
    let packageType = 0;
    let productsToSelect = 0;
    let selectedProducts = [];
    let currentBasePrice = 0;

    const openSizeSelectionModal = (product) => {
        return new Promise((resolve, reject) => {
            let selectedSize = null;
            sizeModalContent.innerHTML = `
                <img src="${product.image[0]}" alt="${product.name}" class="pk-size-product-image">
                <h3 class="pk-size-product-name">${product.name}</h3>
                <p class="pk-size-modal-prompt">Pilih ukuran yang Anda inginkan:</p>
                <div class="pk-size-options-container">
                    ${product.sizes.map(size => `<button class="pk-size-option-btn" data-size="${size}">${size}</button>`).join('')}
                </div>
                <button id="pk-size-confirm-btn" class="btn btn-primary pk-size-confirm-btn" disabled>Konfirmasi Ukuran</button>
            `;
            const sizeButtons = sizeModalContent.querySelectorAll('.pk-size-option-btn');
            const confirmBtn = document.getElementById('pk-size-confirm-btn');

            sizeButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    sizeButtons.forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    selectedSize = btn.dataset.size;
                    confirmBtn.disabled = false;
                });
            });
            confirmBtn.onclick = () => {
                APP.closeModal(sizeModal);
                resolve(selectedSize);
            };
            const closeModalHandler = (e) => {
                if (e.target === sizeModal || e.target.closest('.close-button')) {
                    reject('cancelled');
                    sizeModal.removeEventListener('click', closeModalHandler);
                }
            };
            sizeModal.addEventListener('click', closeModalHandler);
            APP.openModal(sizeModal);
        });
    };

    const updatePrice = () => {

    const xlCount = selectedProducts.filter(p => p.chosenSize === 'XL').length;
    
    const extraChargeForXL = xlCount * 5000;

    let finalPrice = currentBasePrice + extraChargeForXL;

    priceDisplay.textContent = APP.formatRupiah(finalPrice);
    return finalPrice;
};

    const handleProductSelection = async (product, cardElement) => {
        try {
            const chosenSize = await openSizeSelectionModal(product);
            selectedProducts.push({ ...product, chosenSize: chosenSize.toUpperCase() });
            cardElement.classList.add('selected');
            updatePrice();
            updateStep2Title();
            if (selectedProducts.length === productsToSelect) {
                addToCartBtn.disabled = false;
                APP.showToast('Semua produk telah dipilih. Paket siap ditambahkan.', 'info');
            }
        } catch (error) {
            if (error === 'cancelled') {
                APP.showToast('Pemilihan ukuran dibatalkan.', 'warning');
            }
        }
    };

    const renderProductChoices = () => {
        const availableProducts = products.filter(p => (p.design === 'abstrak' || p.design === 'basic') && p.stock > 0);
        productGrid.innerHTML = '';
        if (availableProducts.length === 0) {
            productGrid.innerHTML = `<p class="info-message">Tidak ada produk Basic atau Abstrak yang tersedia.</p>`;
            return;
        }
        availableProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'pk-product-card';
            card.dataset.productId = product.id;
            card.innerHTML = `
                <div class="pk-image-container"><img src="${product.image[0]}" alt="${product.name}"></div>
                <div class="pk-product-card-info"><h4>${product.name}</h4><span class="pk-product-design">${product.design}</span></div>
                <div class="pk-selection-badge"><i class="fas fa-check"></i></div>
            `;
            card.addEventListener('click', () => handleProductSelection(product, card));
            productGrid.appendChild(card);
        });
    };

    const updateStep2Title = () => {
        const currentStep = selectedProducts.length + 1;
        step2Title.textContent = currentStep <= productsToSelect ? `Pilih Produk ${currentStep} dari ${productsToSelect}` : `Paket Anda Siap!`;
    };

    const handlePackageTypeSelection = (count) => {
        packageType = count;
        productsToSelect = count;
        currentBasePrice = packagePrices[count];
        step1.classList.remove('active');
        step2.classList.add('active');
        updatePrice(); 
        renderProductChoices();
        updateStep2Title();
    };


const handleAddToCart = () => {
    if (selectedProducts.length !== productsToSelect) return;
    const finalPrice = updatePrice();
    const customPackageItem = {
        id: `custom-pkg-${Date.now()}`,
        cartId: `custom-pkg-${Date.now()}`,
        name: `Paket Kustom (${selectedProducts.map(p => `${p.name} (${p.chosenSize})`).join(', ')})`,
        image: ['costum.jpg'],
        price: finalPrice,
        quantity: 1,
        size: `${productsToSelect} Items`,
        isCustomPackage: true, 
        isBundle: true, 
        stock: 1
    };
    
    const success = APP.addPackageToCart(customPackageItem);
    if (success) {
        APP.closeModal(modal);
    }
};

    const resetState = () => {
        packageType = 0;
        productsToSelect = 0;
        selectedProducts = [];
        currentBasePrice = 0;
        priceDisplay.textContent = APP.formatRupiah(0);
        addToCartBtn.disabled = true;
    };

    const openCustomPackageModal = () => {
        resetState();
        step1.classList.add('active');
        step2.classList.remove('active');
        APP.openModal(modal);
    };

    customPackageBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openCustomPackageModal();
        if (document.body.classList.contains('sidebar-open')) {
            document.getElementById('sidebar-close-btn').click();
        }
    });

    step1.querySelectorAll('.pk-type-btn').forEach(btn => {
        btn.addEventListener('click', () => handlePackageTypeSelection(parseInt(btn.dataset.count)));
    });

    addToCartBtn.addEventListener('click', handleAddToCart);
});