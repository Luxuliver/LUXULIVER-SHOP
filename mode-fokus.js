document.addEventListener('DOMContentLoaded', () => {
    const focusToggleButton = document.getElementById('focus-mode-toggle');
    const body = document.body;

    if (localStorage.getItem('focusModeActive') === 'true') {
        body.classList.add('focus-mode-active');
    }

    focusToggleButton.addEventListener('click', () => {

        body.classList.toggle('focus-mode-active');

        if (body.classList.contains('focus-mode-active')) {
            localStorage.setItem('focusModeActive', 'true');
            document.getElementById('koleksi').scrollIntoView({ behavior: 'smooth' });
        } else {
            localStorage.removeItem('focusModeActive');
        }
    });
});