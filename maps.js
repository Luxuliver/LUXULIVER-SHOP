document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('interactive-map-container');
    if (!mapContainer) return;

    const obfuscatedCityData = 'W3sibmFtZSI6Ikpha2FydGEiLCJ0b3AiOiI2NSUiLCJsZWZ0IjoiMzAlIn0seyJuYW1lIjoiU3VyYWJheWEiLCJ0b3AiOiI3OCUiLCJsZWZ0IjoiNTglIn0seyJuYW1lIjoiQmFuZHVuZyIsInRvcCI6IjcwJSIsImxlZnQiOiIzNSUifSx7Im5hbWUiOiJNZWRhbiIsInRvcCI6IjIwJSIsImxlZnQiOiIxMCUifSx7Im5hbWUiOiJNYWthc3NhciIsInRvcCI6IjY4JSIsImxlZnQiOiI4MCUifSx7Im5hbWUiOiJTZW1hcmFuZyIsInRvcCI6IjcxJSIsImxlZnQiOiI0OCUifSx7Im5hbWUiOiJQYWxlbWJhbmciLCJ0b3AiOiI1NSUiLCJsZWZ0IjoiMjUlIn0seyJuYW1lIjoiWW9neWFrYXJ0YSIsInRvcCI6Ijc1JSIsImxlZnQiOiI0NiUifSx7Im5hbWUiOiJEZW5wYXNhciIsInRvcCI6Ijg1JSIsImxlZnQiOiI2NSUifSx7Im5hbWUiOiJCYW5qYXJtYXNpbiIsInRvcCI6IjU4JSIsImxlZnQiOiI2NSUifV0=';

    function decodeCities(encodedData) {
        try {
            const jsonString = atob(encodedData); 
            return JSON.parse(jsonString);
        } catch (e) {
            console.error("Gagal mendekode data kota:", e);
            return []; 
        }
    }

    const cities = decodeCities(obfuscatedCityData);

    const productData = products.map(p => ({
        name: p.name,
        image: p.image[0]
    }));

    function showRandomNotification() {
        if (cities.length === 0) return;

        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        const randomProduct = productData[Math.floor(Math.random() * productData.length)];

        const notification = document.createElement('div');
        notification.className = 'map-notification';
        
        notification.style.top = randomCity.top;
        notification.style.left = randomCity.left;

        notification.innerHTML = `
            <img src="${randomProduct.image}" alt="${randomProduct.name}">
            <div>Koleksi <em>${randomProduct.name}</em><br>sedang dalam perjalanan ke <strong>${randomCity.name}</strong>.</div>
        `;
        
        const existingNotif = mapContainer.querySelector('.map-notification');
        if (existingNotif) {
            existingNotif.remove();
        }

        mapContainer.appendChild(notification);
    }

    setInterval(showRandomNotification, 30000); 
    showRandomNotification();
});