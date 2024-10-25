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
const { Pool } = require('pg');

const router = express.Router();
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// Endpoint to write data to the bounty table
router.post('/bounty', async (req, res) => {
  const { priority, task } = req.body; // Assuming you're sending priority and task in the body
  try {
    const result = await pool.query(
      'INSERT INTO bounty (priority, task) VALUES ($1, $2) RETURNING *',
      [priority, task]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to read data from the bounty table
router.get('/bounty', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bounty');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;