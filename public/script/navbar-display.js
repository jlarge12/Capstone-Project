document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();

    function updateNavbar() {
        const isLoggedIn = sessionStorage.getItem('username') !== null;
      
        const homeLink = document.getElementById('homeLink');
        const sustainabilityFormLink = document.getElementById('sustainabilityFormLink');
        const leaderboardLink = document.getElementById('leaderboardLink');
        const loginLink = document.getElementById('loginLink');
        const signupLink = document.getElementById('signupLink');
        const logoutLink = document.getElementById('logoutLink');
        const contactUsLink = document.getElementById('contactUsLink');
      
        if (isLoggedIn) {
          homeLink.style.display = 'inline-block';
          sustainabilityFormLink.style.display = 'inline-block';
          leaderboardLink.style.display = 'inline-block';
          loginLink.style.display = 'none';
          signupLink.style.display = 'none';
          logoutLink.style.display = 'inline-block';
          contactUsLink.style.display = 'inline-block';
        } else {
          homeLink.style.display = 'inline-block';
          sustainabilityFormLink.style.display = 'none';
          leaderboardLink.style.display = 'inline-block';
          loginLink.style.display = 'inline-block';
          signupLink.style.display = 'inline-block';
          logoutLink.style.display = 'none';
          contactUsLink.style.display = 'inline-block';
        }
      }
});

function logout() {
    sessionStorage.clear();
  
    alert('Logged out successfully');
  
    window.location.href = 'home.html';
}