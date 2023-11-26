document.addEventListener('DOMContentLoaded', () => {
    checkAndDisplayWelcomeMessage();

    function checkAndDisplayWelcomeMessage() {
        // Retrieve user details from session storage
        const userName = sessionStorage.getItem('username');
    
        // Get the welcomeMessage element
        const message = document.getElementById('loggedInText');
    
        if (userName) {
        // User is logged in
        message.innerText = `Welcome, ${userName}!`;
        } else {
        // User is not logged in
        message.innerText = 'Welcome, Guest';
        }
    }
});