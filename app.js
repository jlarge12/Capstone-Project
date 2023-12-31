const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
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

app.post('/api/submitActivity', (req, res) => {
  const { userId, activity } = req.body;

  if (!userId || !activity) {
    return res.status(400).json({ error: 'Invalid data. All fields are required.' });
  }

  const activityPoints = {
    recycled_plastic: 5,
    took_the_bus: 3,
  };

  const points = activityPoints[activity];
  const updateSql = 'UPDATE users SET points = points + ? WHERE userId = ?';

  pool.query(updateSql, [points, userId], (err, results) => {
    if (err) {
      console.error('Error updating user points:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log('User ponts updated:', results);
    res.json({ message: 'User points updated successfully' });
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

app.post('/api/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: 'xxx@outlook.com', // auth for email account to send FROM
      pass: 'xxx'
    }
  });

  const mailOptions = {
    from: 'xxx@outlook.com', // must match auth user email
    to: 'xxx@outlook.com', // email address to send TO
    subject: 'New Message from Contact Form',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ success: true, message: 'Email sent successfully' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});