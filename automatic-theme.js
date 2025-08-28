document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
        localStorage.setItem('theme', theme);
    }

    function checkTimeAndSetTheme() {
        const currentHour = new Date().getHours(); 
        if (currentHour >= 5 && currentHour < 21) {
            applyTheme('light');
        } 
        else {
            applyTheme('dark');
        }
    }

    setInterval(checkTimeAndSetTheme, 60000);
    checkTimeAndSetTheme();

});