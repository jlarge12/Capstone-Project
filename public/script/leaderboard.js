document.addEventListener('DOMContentLoaded', () => {
    fetchData();

    function fetchData() {
      fetch('http://localhost:3000/api/getUsers')
        .then(response => response.json())
        .then(data => displayData(data))
        .catch(error => console.error('Error fetching data:', error));
    }

    function displayData(users) {
      const tableBody = document.getElementById('userTableBody');

      tableBody.innerHTML = '';

      if (sortField === 'name') {
        users.sort((a, b) => sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
      } else if (sortField === 'points') {
        users.sort((a, b) => sortOrder === 'asc' ? a.points - b.points : b.points - a.points);
      }

      users.forEach(user => {
        const row = tableBody.insertRow();

        const userIdCell = row.insertCell(0);
        userIdCell.textContent = user.userId;

        const nameCell = row.insertCell(1);
        nameCell.textContent = user.name;

        const emailCell = row.insertCell(2);
        emailCell.textContent = user.email;

        const pointsCell = row.insertCell(3);
        pointsCell.textContent = user.points;
      });
    }

    let sortOrder = 'asc';
    let sortField = 'points';

    window.changeSortOption = function() {
      const sortOption = document.getElementById('sortOption').value;

      if (sortOption) {
        const [field, order] = sortOption.split('-');
        sortOrder = order;
        sortField = field;
        fetchData();
      }
    }
    
    window.resetLeaderboard = function() {
      if (confirm('Are you sure you want to reset the leaderboard? This will clear all user data.')) {
        fetch('http://localhost:3000/api/resetLeaderboard', {
          method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
          alert(data.message);
          fetchData(); // Refresh the table after resetting
        })
        .catch(error => console.error('Error resetting leaderboard:', error));
      }
    };
  });