document.addEventListener('appReady', () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.log('%c[DIAGNOSA] Fitur Suara: TIDAK AKTIF. Browser Anda tidak mendukung Web Speech API.', 'color: red; font-weight: bold; font-size: 14px;');
    } else {
        console.log('%c[DIAGNOSA] Fitur Suara: AKTIF. Browser Anda mendukung Web Speech API.', 'color: green; font-weight: bold; font-size: 14px;');
    }

    const searchTrigger = document.getElementById('search-input');
    if (!searchTrigger) return;

    let searchOverlay;

    const recognition = SpeechRecognition ? new SpeechRecognition() : null;
    if (recognition) {
        recognition.lang = 'id-ID';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            APP.showToast(`Anda berkata: "${transcript}"`, "success");
            processVoiceCommand(transcript);
        };
        recognition.onend = () => {
            const micBtn = document.getElementById('voice-search-btn-overlay');
            if (micBtn) micBtn.classList.remove('listening');
        };
        recognition.onerror = (event) => {
            APP.showToast(event.error === 'no-speech' ? "Tidak ada suara terdeteksi." : "Terjadi kesalahan.", "warning");
        };
    }

    const processVoiceCommand = (command) => {
        const searchInputOverlay = document.getElementById('search-input-overlay');
        if (!searchInputOverlay) return;
        if (command.includes('cari') || command.includes('temukan')) {
            const query = command.replace(/cari|temukan/g, '').trim();
            searchInputOverlay.value = query;
            searchInputOverlay.dispatchEvent(new Event('input'));
        } else if (command.includes('koleksi')) {
            window.location.hash = '#koleksi';
        } else if (command.includes('keranjang')) {
            window.location.hash = '#keranjang';
        } else if (command.includes('favorit')) {
            window.location.hash = '#favorit';
        } else if (command.includes('riwayat')) {
            window.location.hash = '#riwayat-pesanan';
        } else if (command.includes('beranda')) {
            window.location.hash = '#hero';
        }
    };

    const createSearchOverlay = () => {
        if (document.getElementById('search-overlay')) return;
        searchOverlay = document.createElement('div');
        searchOverlay.id = 'search-overlay';
        const micButtonHTML = recognition ? `<button id="voice-search-btn-overlay" class="voice-search-btn-overlay"><i class="fas fa-microphone"></i></button>` : '';
        searchOverlay.innerHTML = `
            <div class="search-modal">
                <button id="close-search-btn" class="close-search-btn">&times;</button>
                <div class="search-input-wrapper-overlay">
                    <i class="fas fa-search"></i>
                    <input type="text" id="search-input-overlay" placeholder="Ketik atau ucapkan perintah...">
                    ${micButtonHTML}
                </div>
                <div id="search-results-grid" class="search-results-grid"></div>
            </div>
        `;
        document.body.appendChild(searchOverlay);

        const inputOverlay = document.getElementById('search-input-overlay');
        document.getElementById('close-search-btn').onclick = closeSearch;
        searchOverlay.onclick = (e) => { if (e.target.id === 'search-overlay') closeSearch(); };
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearch(); });

        inputOverlay.addEventListener('input', () => {
            const query = inputOverlay.value.trim().toLowerCase();
            if (query.length > 1) {
                const results = products.filter(p => p.name.toLowerCase().includes(query) && !p.isReward);
                displayResults(results);
            } else {
                document.getElementById('search-results-grid').innerHTML = '';
            }
        });

        if (recognition) {
            const micBtn = document.getElementById('voice-search-btn-overlay');
            micBtn.addEventListener('click', () => {
                micBtn.classList.add('listening');
                APP.showToast("Mendengarkan...", "info");
                recognition.start();
            });
        }
    };

    const displayResults = (results) => {
        const resultsGrid = document.getElementById('search-results-grid');
        if (results.length > 0) {
            resultsGrid.innerHTML = results.map(product => `
                <div class="search-result-item" data-product-id="${product.id}">
                    <img src="${product.image[0]}" alt="${product.name}">
                    <div class="result-info">
                        <h4>${product.name}</h4>
                        <p>${APP.formatRupiah(product.basePrice)}</p>
                    </div>
                </div>
            `).join('');
            resultsGrid.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    closeSearch();
                    setTimeout(() => APP.openQuickViewModal(item.dataset.productId), 350);
                });
            });
        } else {
            resultsGrid.innerHTML = `<p class="no-results-search">Tidak ada hasil untuk pencarian Anda.</p>`;
        }
    };

    const openSearch = (e) => {
        e.preventDefault();
        if (!document.getElementById('search-overlay')) createSearchOverlay();
        document.body.classList.add('search-is-active');
        setTimeout(() => document.getElementById('search-input-overlay').focus(), 300);
    };

    const closeSearch = () => {
        document.body.classList.remove('search-is-active');
    };

    searchTrigger.addEventListener('focus', openSearch);
    searchTrigger.addEventListener('click', openSearch);
});