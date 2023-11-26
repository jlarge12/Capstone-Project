
function submitSignUp() {
    const fullName = document.getElementById('fullName').value;
    const userId = document.getElementById('userId').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullName, userId, email, password }),
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message + "! Please login.");
      window.location.href = '../pages/login.html';
    })
    .catch(error => console.error('Error signing up:', error));
 }