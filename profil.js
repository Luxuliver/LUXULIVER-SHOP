document.addEventListener('DOMContentLoaded', function () {

    const getLocalStorageItem = (key, defaultValue) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            return defaultValue;
        }
    };

    const isAuthenticated = () => getLocalStorageItem('luxuliverCurrentUser', null) !== null;

    const showToast = (message, type = 'info') => {
        const c = document.getElementById('toast-container');
        if (!c) return;

        const t = document.createElement('div');
        t.className = `toast-notification ${type}`;
        t.textContent = message;
        c.appendChild(t);

        setTimeout(() => t.classList.add('show'), 10);
        setTimeout(() => {
            t.classList.remove('show');
            t.addEventListener('transitionend', () => t.remove());
        }, 3000);
    };

    if (!isAuthenticated()) {
        alert("Anda harus login untuk mengakses halaman ini.");
        window.location.href = 'index.html';
        return;
    }

    let currentUser = getLocalStorageItem('luxuliverCurrentUser');

    const renderWishlist = () => {
                const wishlistContainer = document.getElementById('wishlist-container');
                wishlistContainer.innerHTML = '';
                const wishlistIds = currentUser.favorites || [];

                if (wishlistIds.length === 0) {
                    wishlistContainer.innerHTML = '<p class="info-message" style="grid-column: 1 / -1;">Koleksi impian Anda masih kosong.</p>';
                    return;
                }

                
                const wishlistProducts = wishlistIds
                    .map(fav => products.find(p => p.id === fav.id))
                    .filter(p => p)
                    .slice(0, 9);

                wishlistProducts.forEach(product => {
                    const itemHTML = `
                        <div class="wishlist-item">
                            <a href="#" data-product-id="${product.id}" class="view-product-btn">
                                <img src="${product.image[0]}" alt="${product.name}" class="wishlist-item-img">
                            </a>
                        </div>
                    `;
                    wishlistContainer.insertAdjacentHTML('beforeend', itemHTML);
                });
            };

    const renderAllDashboardComponents = () => {
        currentUser = getLocalStorageItem('luxuliverCurrentUser');
        if (!currentUser) return;

        // Header & Sidebar Info
        document.getElementById('greeting-message').textContent = `Halo, ${currentUser.name.split(' ')[0]}`;
        document.getElementById('profile-user-name').textContent = currentUser.name;
        document.getElementById('profile-user-phone').textContent = currentUser.phone;
        document.getElementById('profile-initials').textContent = currentUser.name
            .split(' ')
            .map(n => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();

        document.getElementById('profile-name').value = currentUser.name || '';
        document.getElementById('profile-address').value = currentUser.address || '';

        const points = currentUser.loyaltyPoints || 0;
        const tiers = { gold: 1500, silver: 1000, bronze: 500 };

        let currentTier = 'Dasar';
        if (points >= tiers.gold) {
            currentTier = 'Emas';
        } else if (points >= tiers.silver) {
            currentTier = 'Perak';
        } else if (points >= tiers.bronze) {
            currentTier = 'Perunggu';
        }

        document.getElementById('header-loyalty-tier').textContent = `Tier ${currentTier}`;
        document.getElementById('loyalty-points-display').textContent = points.toLocaleString('id-ID');

        let activityFeed = [];

        (currentUser.history || []).forEach(order =>
            activityFeed.push({
                date: new Date(order.date),
                type: 'purchase',
                text: `Menyelesaikan <strong>Pesanan #${order.orderId}</strong>`
            })
        );

        (currentUser.favorites || []).forEach(fav => {
            const p = products.find(p => p.id === fav.id);
            if (p) {
                activityFeed.push({
                    date: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 10))),
                    type: 'favorite',
                    text: `Menambahkan <strong>${p.name}</strong> ke favorit`
                });
            }
        });

        activityFeed.sort((a, b) => b.date - a.date);

        document.getElementById('activity-feed-container').innerHTML =
            activityFeed
                .slice(0, 4)
                .map(item => {
                    return `
                        <li class="activity-item">
                            <div class="activity-icon ${item.type}">
                                <i class="fas ${item.type === 'purchase' ? 'fa-receipt' : 'fa-heart'}"></i>
                            </div>
                            <p class="activity-text">${item.text}</p>
                        </li>`;
                })
                .join('') || '<li><p>Belum ada aktivitas.</p></li>';

        renderWishlist();
    };

    const navLinks = document.querySelectorAll('.profile-nav-link');
    const views = document.querySelectorAll('.view-pane');

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            views.forEach(v => v.classList.remove('active'));

            link.classList.add('active');
            document.getElementById(link.dataset.target).classList.add('active');
        });
    });

    document.getElementById('profile-info-form').addEventListener('submit', function (e) {
        e.preventDefault();

        currentUser.name = document.getElementById('profile-name').value;
        currentUser.address = document.getElementById('profile-address').value;

        let accounts = getLocalStorageItem('luxuliverAccounts', []);
        const i = accounts.findIndex(acc => acc.phone === currentUser.phone);

        if (i !== -1) {
            accounts[i].name = currentUser.name;
            accounts[i].address = currentUser.address;
        }

        localStorage.setItem('luxuliverCurrentUser', JSON.stringify(currentUser));
        localStorage.setItem('luxuliverAccounts', JSON.stringify(accounts));

        renderAllDashboardComponents();
        showToast('Profil berhasil diperbarui!', 'success');
    });

    document.getElementById('change-password-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const op = document.getElementById('old-password').value;
        const np = document.getElementById('new-password').value;
        const em = document.getElementById('change-password-error-msg');

        if (op !== currentUser.password) {
            em.textContent = "Password lama salah.";
            em.style.display = 'block';
            return;
        }

        if (!np || np.length < 1) {
            em.textContent = "Password baru tidak boleh kosong.";
            em.style.display = 'block';
            return;
        }

        currentUser.password = np;

        let accounts = getLocalStorageItem('luxuliverAccounts', []);
        const i = accounts.findIndex(acc => acc.phone === currentUser.phone);

        if (i !== -1) {
            accounts[i].password = np;
        }

        localStorage.setItem('luxuliverCurrentUser', JSON.stringify(currentUser));
        localStorage.setItem('luxuliverAccounts', JSON.stringify(accounts));

        showToast('Password berhasil diubah!', 'success');
        this.reset();
        em.style.display = 'none';
    });

    document.addEventListener('click', e => {
        const btn = e.target.closest('.view-product-btn');
        if (btn) {
            e.preventDefault();
            sessionStorage.setItem('openQuickViewFor', btn.dataset.productId);
            window.location.href = 'index.html';
        }
    });

    // --- Render Awal ---
    renderAllDashboardComponents();
});