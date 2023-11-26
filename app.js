const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const dbConfig = require('./dbConfig'); 

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool(dbConfig);

app.get('/api/getUsers', (req, res) => {
    pool.query('SELECT * FROM users', (queryErr, results) => {
      if (queryErr) {
        console.error('Error executing query:', queryErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.json(results);
    });
});

app.post('/api/updateUser', (req, res) => {
  const { userId, name, email, activity } = req.body;

  if (!userId || !name || !email || !activity) {
    return res.status(400).json({ error: 'Invalid data. All fields are required.' });
  }

  const activityPoints = {
    recycled_plastic: 5,
    took_the_bus: 3,
  };

  const points = activityPoints[activity];

  const sql = `
    INSERT INTO users (userId, name, email, points)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    email = VALUES(email),
    points = points + VALUES(points)
  `;

  pool.query(sql, [userId, name, email, points], (err, results) => {
    if (err) {
      console.error('Error adding user to the database:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log('User added to the database:', results);
    res.json({ message: 'User added successfully' });
  });
});

app.post('/api/resetLeaderboard', (req, res) => {
  const sql = 'DELETE FROM users';

  pool.query(sql, (err, results) => {
    if (err) {
      console.error('Error resetting leaderboard:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log('Leaderboard reset successfully');
    res.json({ message: 'Leaderboard reset successfully' });
  });
});

app.post('/api/signup', (req, res) => {
  const { fullName, userId, email, password } = req.body;

  const hashedPassword = require('crypto').createHash('sha256').update(password).digest('hex');
  const initialPoints = 0;

  const sql = 'INSERT INTO users (name, userId, email, password, points) VALUES (?, ?, ?, ?, ?)';
  pool.query(sql, [fullName, userId, email, hashedPassword, initialPoints], (err, results) => {
    if (err) {
      console.error('Error signing up:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log('User signed up successfully');
    res.json({ message: 'User signed up successfully' });
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Validate input (add more validation as needed)

  // Check login credentials against the database
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  const hashedPassword = require('crypto').createHash('sha256').update(password).digest('hex');

  pool.query(sql, [email, hashedPassword], (err, results) => {
    if (err) {
      console.error('Error logging in:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length > 0) {
      const user = results[0];
      res.json({ success: true, user: { 
        name: user.name,
        userId: user.userId,
        email: user.email,
        points: user.points
      }});
    } else {
      res.json({ success: false });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});