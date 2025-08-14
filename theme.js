document.addEventListener('DOMContentLoaded', () => {
    const colorPickers = document.querySelectorAll('#theme-controls-container input[type="color"]');
    const saveButton = document.getElementById('save-theme-btn');
    const resetButton = document.getElementById('reset-theme-btn');
    const root = document.documentElement;

    function applyTheme(theme) {
        for (const variable in theme) {
            
            root.style.setProperty(variable, theme[variable]);

            const picker = document.querySelector(`[data-variable="${variable}"]`);
            if (picker) {
                picker.value = theme[variable];
            }
        }
    }

    const savedThemeJSON = localStorage.getItem('userCustomTheme');
    if (savedThemeJSON) {
        const savedTheme = JSON.parse(savedThemeJSON);
        applyTheme(savedTheme);
    }

    colorPickers.forEach(picker => {
        picker.addEventListener('input', (event) => {
            const variableName = event.target.dataset.variable;
            const newValue = event.target.value;
            root.style.setProperty(variableName, newValue);
        });
    });

    saveButton.addEventListener('click', () => {
        const currentTheme = {};
        colorPickers.forEach(picker => {
            const variableName = picker.dataset.variable;
            const value = picker.value;
            currentTheme[variableName] = value;
        });

        localStorage.setItem('userCustomTheme', JSON.stringify(currentTheme));
        alert('Tema kustom Anda telah disimpan!');
    });

    resetButton.addEventListener('click', () => {
        localStorage.removeItem('userCustomTheme');
        root.style.cssText = '';
        window.location.reload();
    });
});