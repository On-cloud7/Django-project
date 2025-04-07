function logout() {
    // Assuming you have a logout functionality that updates the user's status
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    users = users.map(u => u.email === currentUser.email ? { ...u, loggedIn: false } : u);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.removeItem('currentUser');
    window.location.href = 'admin-signin.html';
}

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('currentAdmin')) {
        window.location.href = 'admin-signin.html'; // Redirect if not logged in
    }

    // Fetch users from localStorage
    let users = [];
    try {
        users = JSON.parse(localStorage.getItem('users')) || [];
    } catch (e) {
        console.error('Error parsing users from localStorage:', e);
    }
    
    // Filter for logged-in users
    let loggedInUsers = users.filter(user => user.loggedIn === true);
    let signedUpUsers = users;

    // Display logged-in users
    const loggedInUserList = document.getElementById('userList');
    if (loggedInUserList) {
        loggedInUserList.innerHTML = '';
        loggedInUsers.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.email} (Logged In)`;
            loggedInUserList.appendChild(li);
        });
    }

    // Display signed-up users
    const signedUpUserList = document.getElementById('signedUpUserList');
    if (signedUpUserList) {
        signedUpUserList.innerHTML = '';
        signedUpUsers.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.email;
            signedUpUserList.appendChild(li);
        });
    }

    // For book count, since we don't have a direct reference to actual book data, we'll mock it:
    let bookCount = localStorage.getItem('bookCount') || 0;

    // Display book count
    const bookCountElement = document.getElementById('bookCount');
    if (bookCountElement) {
        bookCountElement.textContent = bookCount;
    }
});