const addUserForm = document.getElementById('addUserForm');
    addUserForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const formData = {
        userId: sessionStorage.getItem('userId'),
        activity: document.getElementById('activity').value,
      };
  
      fetch('http://localhost:3000/api/submitActivity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('User data updated:', data);
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
    });