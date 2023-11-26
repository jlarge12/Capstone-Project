function submitLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Validate input fields (add more validation as needed)
  
    // Send a POST request to the server to check login credentials
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert(`Welcome, ${data.user.name}!`);
        sessionStorage.setItem('username', data.user.name)
        sessionStorage.setItem('userId', data.user.userId)
        sessionStorage.setItem('userEmail', data.user.email)
        sessionStorage.setItem('userPoints', data.user.points)

        // Redirect to the user's dashboard or perform additional actions as needed
        window.location.href = '../pages/home.html';
      } else {
        alert('Invalid email or password. Please try again.');
      }
    })
    .catch(error => console.error('Error logging in:', error));
}