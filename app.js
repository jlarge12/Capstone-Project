const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const dbConfig = require('./dbConfig'); 

const app = express();
const port = 3000;

// Use cors middleware
app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool(dbConfig);

// Set up a route to handle GET requests
app.get('/api/getUsers', (req, res) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting database connection:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Execute a query
    connection.query('SELECT * FROM users', (queryErr, results) => {
      // Release the connection back to the pool
      connection.release();

      if (queryErr) {
        console.error('Error executing query:', queryErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Send the results to the client
      res.json(results);
    });
  });
});

app.post('/api/addUser', (req, res) => {
  console.log(req.body)
  const { userId, name, email, points } = req.body;

  // Validate the data (add your own validation logic as needed)
  if (!userId || !name || !email || !points) {
    return res.status(400).json({ error: 'Invalid data. All fields are required.' });
  }

  // Insert the data into the database
  pool.query('INSERT INTO users (userId, name, email, points) VALUES (?, ?, ?, ?)', [userId, name, email, points], (err, results) => {
    if (err) {
      console.error('Error adding user to the database:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log('User added to the database:', results);
    res.json({ message: 'User added successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});