// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
  // Get the form element by its ID
  const form = document.getElementById('loginForm');

  // Check if the form exists
  if (!form) {
    console.error('Form with id "loginForm" not found in the DOM.');
    return;
  }

  // Add an event listener for the form's submit event
  form.addEventListener('submit', validateLoginForm);
});

// Function to validate the login form
function validateLoginForm(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'admin' && password === 'admin123') {
    console.log('Login successful!');
    // Set login state
    localStorage.setItem('loggedIn', true);
    // Redirect to index page
    window.location.href = 'index.html';
  } else {
    displayErrorMessage('Invalid username or password!');
  }
}


// Function to display error messages
function displayErrorMessage(message) {
  let errorMessage = document.getElementById('error-message');

  // Create an error message element if it doesn't exist
  if (!errorMessage) {
    errorMessage = document.createElement('div');
    errorMessage.id = 'error-message';
    errorMessage.style.color = 'red';
    errorMessage.style.textAlign = 'center';
    errorMessage.style.marginTop = '10px';
    document.querySelector('form').appendChild(errorMessage);
  }

  // Update the error message content
  errorMessage.textContent = message;
}

function logout() {
  // Clear login state
  localStorage.removeItem('loggedIn');
  // Redirect to login page
  window.location.href = 'login.html';
}
