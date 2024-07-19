document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('predictionForm');
    const resultDiv = document.getElementById('result');
    const periodInput = document.getElementById('periodNumber');
    const loginForm = document.getElementById('loginForm');
    const loginResultDiv = document.getElementById('loginResult');
    const userPasswordInput = document.getElementById('userPassword');
    const loginButton = loginForm.querySelector('button'); // Get the login button

    let usedPeriodNumbers = new Set();
    let currentPassword = '6340'; // Initial password
    let isLoggedIn = false; // Track login status

    // Handle login
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const enteredPassword = userPasswordInput.value.trim();
      
      if (enteredPassword !== currentPassword) {
        loginResultDiv.textContent = 'Incorrect password. Please try again.';
        return;
      }

      loginResultDiv.textContent = 'Login successful!';
      currentPassword = updatePassword(currentPassword); // Update password
      userPasswordInput.value = ''; // Clear password field

      // Hide password field and login button after successful login
      isLoggedIn = true;
      document.getElementById('predictionForm').style.display = 'block';
      loginForm.style.display = 'none'; // Hide the login form
    });

    // Handle prediction
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      
      if (!isLoggedIn) {
        resultDiv.textContent = 'Please log in first.';
        return;
      }
      
      const periodNumber = periodInput.value.trim();
      
      if (!periodNumber) {
        resultDiv.textContent = 'Please enter a period number.';
        return;
      }
  
      if (usedPeriodNumbers.has(periodNumber)) {
        resultDiv.textContent = 'This period number has already been used. Please enter a different period number.';
        return;
      }
  
      usedPeriodNumbers.add(periodNumber);
  
      const bigSmall = Math.random() < 0.5 ? 'Big' : 'Small';
      const color = Math.random() < 0.5 ? 'Red' : 'Green';
  
      resultDiv.innerHTML = `
        <p>Period Number: ${periodNumber}</p>
        <p>Prediction: ${bigSmall}</p>
        <p>Color: ${color}</p>
      `;
    });

    // Function to update password
    function updatePassword(currentPassword) {
      let passwordList = currentPassword.split('');
      let lastDigit = parseInt(passwordList[passwordList.length - 1]);
      let newLastDigit = (lastDigit + 1) % 10; // Loop back to 0 after 9
      passwordList[passwordList.length - 1] = newLastDigit.toString();
      return passwordList.join('');
    }
  });
