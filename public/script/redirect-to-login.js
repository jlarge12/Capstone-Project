document.addEventListener('DOMContentLoaded', () => {
    redirect_if_not_logged_in();

    function redirect_if_not_logged_in() {
        const userName = sessionStorage.getItem('username');

        const message = document.getElementById('loggedInText');
    
        if (userName) {
            message.innerText = `Welcome, ${userName}!`;
        } else {
            window.location.href = '../pages/login.html';
        }
    }
});