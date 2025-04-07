// Purpose: Handle user sign-up form submission, validation with field-specific hints, and table updates

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signUpForm');
    const tableBody = document.getElementById('userTableBody');

    // Check if elements exist
    if (!form) {
        console.error('Form with id "signUpForm" not found in the DOM.');
        return;
    }
    if (!tableBody) {
        console.error('Table body with id "userTableBody" not found in the DOM.');
        return;
    }

    // Load existing users into the table
    let users = [];
    try {
        users = JSON.parse(localStorage.getItem('users')) || [];
        console.log('Loaded users from localStorage:', users);
    } catch (e) {
        console.error('Error parsing users from localStorage:', e);
    }
    users.forEach(user => {
        addUserToTable(user);
    });

    // Validation functions returning error messages
    function validateSignUp() {
        let isValid = true;

        const fname = document.getElementById("fname").value;
        const fnameHint = document.getElementById("fnameHint");
        if (!fname.match(/^[A-Za-z]{2,}$/)) {
            fnameHint.textContent = "Must be 2+ letters, no numbers/special chars.";
            isValid = false;
        } else {
            fnameHint.textContent = "";
        }

        const mname = document.getElementById("mname").value;
        const mnameHint = document.getElementById("mnameHint");
        if (!mname.match(/^[A-Za-z]{2,}$/)) {
            mnameHint.textContent = "Must be 2+ letters, no numbers/special chars.";
            isValid = false;
        } else {
            mnameHint.textContent = "";
        }

        const lname = document.getElementById("lname").value;
        const lnameHint = document.getElementById("lnameHint");
        if (!lname.match(/^[A-Za-z]{2,}$/)) {
            lnameHint.textContent = "Must be 2+ letters, no numbers/special chars.";
            isValid = false;
        } else {
            lnameHint.textContent = "";
        }

        const email = document.getElementById("email").value;
        const emailHint = document.getElementById("emailHint");
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            emailHint.textContent = "Enter a valid email (e.g., user@domain.com).";
            isValid = false;
        } else {
            emailHint.textContent = "";
        }

        const phone = document.getElementById("phone").value;
        const phoneHint = document.getElementById("phoneHint");
        if (!phone.match(/^\d{10}$/)) {
            phoneHint.textContent = "Must be a 10-digit number (e.g., 1234567890).";
            isValid = false;
        } else {
            phoneHint.textContent = "";
        }

        const address = document.getElementById("address").value;
        const addressHint = document.getElementById("addressHint");
        if (address.trim().length < 5) {
            addressHint.textContent = "Must be at least 5 characters long.";
            isValid = false;
        } else {
            addressHint.textContent = "";
        }

        const password = document.getElementById("password").value;
        const passwordHint = document.getElementById("passwordHint");
        if (!password.match(/^(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/)) {
            passwordHint.textContent = "8+ chars with 1 number and 1 special char.";
            isValid = false;
        } else {
            passwordHint.textContent = "";
        }

        const accountType = document.getElementById("select").value;
        const selectHint = document.getElementById("selectHint");
        if (accountType === "" || accountType === "Select Account Type") {
            selectHint.textContent = "Select a valid account type (Manga/Manuwha).";
            isValid = false;
        } else {
            selectHint.textContent = "";
        }

        return isValid;
    }

    // Form submission with validation and table update functions changed to use Django API

    // Inside static/js/user-signup.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signUpForm');
    const tableBody = document.getElementById('userTableBody');

    if (!form || !tableBody) {
        console.error('Form or table missing, fam.');
        return;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // No page reload, we got this.

        // Grab the form inputs
        const fname = document.getElementById('fname').value;
        const mname = document.getElementById('mname').value;
        const lname = document.getElementById('lname').value;
        const selectaccnt = document.getElementById('select').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const password = document.getElementById('password').value;

        const userData = {
            fname, mname, lname, accountType: selectaccnt, email, phone, address, password
        };

        // Send it to Django’s API endpoint
        fetch('/api/signup/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log('User signed up:', data);
                addUserToTable(userData); // update the table with the new user
                form.reset(); // Clear the form
            } else {
                console.error('Signup failed:', data.message);
            }
        })
        .catch(error => console.error('Fetch error:', error));
    });

    function addUserToTable(user) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${user.fname}</td><td>${user.email}</td><td>${user.phone}</td>`;
        tableBody.appendChild(row);
    }
});
});