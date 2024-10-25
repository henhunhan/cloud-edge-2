// const fs = require('fs'); // This line can be removed if not used elsewhere
// const { Pool } = require('pg');

// // Use environment variables for database connection
// const pool = new Pool({
//   user: process.env.DB_USER,       // Should be 'myhunter'
//   password: process.env.DB_PASSWORD, // Should be 'esketit'
//   host: process.env.DB_HOST,       // Should be 'postgres'
//   port: process.env.DB_PORT,       // Should be '5432'
//   database: process.env.DB_NAME,   // Should be 'mydatabase'
// });

// const checkConnection = async () => {
//   try {
//     const client = await pool.connect();
//     console.log('Connected to PostgreSQL database!');

//     const res = await client.query('SELECT NOW() AS current_time');
//     console.log('Current time from PostgreSQL:', res.rows[0].current_time);
//     client.release();
//   } catch (err) {
//     console.error('Error connecting to the database:', err);
//   }
// };

// checkConnection();
const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./API'); // Import your API routes
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use your API routes
app.use('/api', apiRoutes);

// Serve the HTML interface
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});