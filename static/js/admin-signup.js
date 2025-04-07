document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login');
    
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Mock data for demonstration (replace with actual authentication in production)
        const mockAdmin = {
            email: 'U@mail.com',
            password: 'Iamgod' // In reality, this would be hashed
        };

        if (email === mockAdmin.email && password === mockAdmin.password) {
            alert('Admin login successful!');
            // Set some form of session or token for authentication (mock here using localStorage)
            localStorage.setItem('currentAdmin', JSON.stringify({ email: email }));
            // Redirect to admin home page
            window.location.href = 'admin_home.html';
        } else {
            alert('Invalid admin email or password.');
        }

        // Clear form fields after submission
        loginForm.reset();
    });
});