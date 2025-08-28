document.addEventListener('DOMContentLoaded', () => {
    const collectionSection = document.getElementById('koleksi');
    if (!collectionSection) return;

    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'collection-controls';
    const filterUI = document.createElement('div');
    filterUI.className = 'live-filter-container';
    const sortingControls = document.querySelector('.sorting-controls-container');
    
    if (sortingControls) {
        controlsContainer.appendChild(filterUI);
        controlsContainer.appendChild(sortingControls);
    }
    collectionSection.querySelector('h2').after(controlsContainer);

    const createFilterDropdown = (filterType, title, options) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'custom-select-wrapper filter-select';

        let optionsHTML = '';
        for (const [text, value] of Object.entries(options)) {
            optionsHTML += `<div class="custom-select-option" data-value="${value}">${text}</div>`;
        }

        wrapper.innerHTML = `
            <div class="custom-select-trigger">
                <span>${title}:</span>
                <strong class="custom-select-value">${Object.keys(options)[0]}</strong>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="custom-select-options">${optionsHTML}</div>
        `;

        const trigger = wrapper.querySelector('.custom-select-trigger');
        trigger.addEventListener('click', () => {
            document.querySelectorAll('.custom-select-wrapper.open').forEach(openWrapper => {
                if (openWrapper !== wrapper) openWrapper.classList.remove('open');
            });
            wrapper.classList.toggle('open');
        });

        wrapper.querySelectorAll('.custom-select-option').forEach(option => {
            option.addEventListener('click', () => {
                const selectedValue = option.dataset.value;
                const selectedText = option.textContent;
                
                wrapper.querySelector('.custom-select-value').textContent = selectedText;
                wrapper.classList.remove('open');

                APP.updateFiltersAndRender({ [filterType]: selectedValue });
            });
        });
        return wrapper;
    };


    const filters = {
        availability: {
            title: 'Ketersediaan',
            options: { 'Semua': 'all', 'Ready Stock': 'ready', 'Pre-Order': 'preorder' }
        },
        design: {
            title: 'Desain',
            options: { 'Semua': 'all', 'Classy': 'classy', 'Abstrak': 'abstrak', 'Basic': 'basic' }
        },
        color: {
            title: 'Warna',
            options: { 'Semua': 'all', 'Hitam': 'hitam', 'Putih': 'putih' }
        }
    };
    
    for (const type in filters) {
        const dropdown = createFilterDropdown(type, filters[type].title, filters[type].options);
        filterUI.appendChild(dropdown);
    }

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.custom-select-wrapper')) {
            document.querySelectorAll('.custom-select-wrapper.open').forEach(wrapper => {
                wrapper.classList.remove('open');
            });
        }
    });

    const updateLiveFilterUI = () => {
        document.querySelectorAll('.filter-select').forEach(wrapper => {
            const filterType = wrapper.querySelector('.custom-select-option').dataset.type; 
            const currentFilterValue = APP.activeFilters[filterType];
            const activeOption = wrapper.querySelector(`.custom-select-option[data-value="${currentFilterValue}"]`);
            if (activeOption) {
                wrapper.querySelector('.custom-select-value').textContent = activeOption.textContent;
            }
        });
    };

    APP.updateLiveFilterUI = updateLiveFilterUI;
});