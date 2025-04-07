document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const query = searchInput.value;
        if (query) {
            alert(`Searching for: ${query}`);
            // Here, you'd typically redirect to a search results page or update content dynamically
        }
    });

    const menuToggle = document.getElementById('menuBtn');
    const sideMenu = document.getElementById('side-menu');
    
    if (!menuToggle || !sideMenu) {
        console.error("Menu toggle or side menu not found in the DOM.");
        return;
    }
    
    console.log("Menu toggle and side menu elements found.");
    
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent immediate closing of the menu
        console.log("Menu toggle clicked.");
        sideMenu.classList.toggle('active');
        if (sideMenu.classList.contains('active')) {
            console.log("Menu is now active.");
        } else {
            console.log("Menu is now hidden.");
        }
    });
    
    // Close menu when clicking outside of it
    document.addEventListener('click', (e) => {
        if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            sideMenu.classList.remove('active');
            console.log("Menu closed because clicked outside.");
        }
    });
    
    // Prevent menu from closing when clicking inside the menu or on the toggle button
    sideMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});