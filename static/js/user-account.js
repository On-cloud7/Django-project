document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.loggedIn) {
        window.location.href = 'user-signin.html';
        return;
    }

    // Display user data
    document.getElementById('userFirstName').textContent = currentUser.fname;
    document.getElementById('fname').textContent = currentUser.fname;
    document.getElementById('mname').textContent = currentUser.mname || 'N/A';
    document.getElementById('lname').textContent = currentUser.lname || 'N/A';
    document.getElementById('accountType').textContent = currentUser.accountType || 'N/A';
    document.getElementById('email').textContent = currentUser.email;
    document.getElementById('phone').textContent = currentUser.phone;
    document.getElementById('address').textContent = currentUser.address;

    // Logout functionality
    const logoutButtons = [document.getElementById('logoutBtn'), document.getElementById('footerLogoutBtn')];
    logoutButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            users = users.map(u => u.email === currentUser.email ? { ...u, loggedIn: false } : u);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.removeItem('currentUser');
            localStorage.removeItem('rememberedUser');
            window.location.href = 'user-signin.html';
        });
    });

    // Optional: Redirect "Account" button to stay on this page (or handle differently)
    document.getElementById('accountBtn').addEventListener('click', () => {
        window.location.href = 'user-account.html'; // Already here, but keeps consistency
    });
});