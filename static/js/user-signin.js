document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login');
    
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.querySelector('input[type="checkbox"]').checked;

        // Retrieve users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email);

        if (user && user.password === password) { // In reality, compare hashed passwords
            alert('Login successful!');
            user.loggedIn = true;
            let updatedUsers = users.map(u => u.email === email ? { ...u, loggedIn: true } : u);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            localStorage.setItem('currentUser', JSON.stringify(user));
            if (rememberMe) {
                localStorage.setItem('rememberedUser', JSON.stringify({ email: user.email }));
            }
            window.location.href = 'user-account.html'; // Redirect to user-specific account page
        } else {
            alert('Invalid email or password.');
        }

        loginForm.reset();
    });
});