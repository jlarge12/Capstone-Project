const addUserForm = document.getElementById('addUserForm');
    addUserForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const formData = {
        userId: document.getElementById('userId').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        activity: document.getElementById('activity').value,
      };
  
      fetch('http://localhost:3000/api/updateUser', {
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