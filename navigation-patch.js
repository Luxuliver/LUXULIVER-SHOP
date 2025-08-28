document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll('#main-nav a, .sidebar-menu a');
    const bundleSection = document.getElementById('penawaran-paket');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        
        if (href && href.startsWith('#') && href !== '#penawaran-paket') {
            
            link.addEventListener('click', () => {

                if (bundleSection) {
                    bundleSection.style.display = 'none';
                }
            });
        }
    });
});