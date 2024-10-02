document.addEventListener("DOMContentLoaded", () => {
    loadSavedData();

    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            saveData();
            clearForm();
        }
    });

    document.getElementById('dob').addEventListener('input', validateDOB);
});

/**
 * Validates form inputs and displays custom error messages.
 */
function validateForm() {
    const dobInput = document.getElementById('dob');
    if (!validateDOB()) {
        alert('Date of birth must be between 18 and 55 years.');
        return false;
    }

    const terms = document.getElementById('terms');
    if (!terms.checked) {
        alert('You must accept the terms.');
        return false;
    }
    return true;
}

/**
 * Validates the Date of Birth input to ensure age is between 18 and 55.
 */
function validateDOB() {
    const dob = new Date(document.getElementById('dob').value);
    if (isNaN(dob)) return false;  // Invalid date

    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    // Adjust age if the birth month/day hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    if (age < 18 || age > 55) {
        return false;
    }

    return true;
}

/**
 * Saves the form data to localStorage and adds the user to the table.
 */
function saveData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('terms').checked ? 'Yes' : 'No';

    const user = { name, email, password, dob, termsAccepted };

    // Save to localStorage
    localStorage.setItem(email, JSON.stringify(user));

    // Add user to table
    addUserToTable(user);
}

/**
 * Adds a user to the table dynamically.
 */
function addUserToTable(user) {
    const table = document.getElementById('userTable');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.dob}</td>
        <td>${user.termsAccepted}</td>
    `;
    table.appendChild(row);
}

/**
 * Clears form inputs after successful submission.
 */
function clearForm() {
    document.getElementById('registrationForm').reset();
}

/**
 * Loads saved users from localStorage on page load and adds them to the table.
 */
function loadSavedData() {
    for (let i = 0; i < localStorage.length; i++) {
        const user = JSON.parse(localStorage.getItem(localStorage.key(i)));
        addUserToTable(user);
    }
}
