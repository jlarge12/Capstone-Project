const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Use cors middleware
app.use(cors());

// Sample data to send to the client
const responseData = { message: 'Hello from the server!' };

// Set up a route to handle GET requests
app.get('/api/data', (req, res) => {
  res.json(responseData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});