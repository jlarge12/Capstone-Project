document.addEventListener('DOMContentLoaded', () => {
    checkAndDisplayWelcomeMessage();

    function checkAndDisplayWelcomeMessage() {
        const userName = sessionStorage.getItem('username');
    
        const message = document.getElementById('loggedInText');
    
        if (userName) {
            message.innerText = `Welcome, ${userName}!`;
        } else {
            message.innerText = 'Welcome, Guest';
        }
    }
});