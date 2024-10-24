const { Pool } = require('pg');

// Use environment variables for database connection
const pool = new Pool({
  user: process.env.DB_USER,       // Should be 'myhunter'
  password: process.env.DB_PASSWORD, // Should be 'esketit'
  host: process.env.DB_HOST,       // Should be 'postgres'
  port: process.env.DB_PORT,       // Should be '5432'
  database: process.env.DB_NAME,   // Should be 'mydatabase'
});

const checkConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL database!');

    const res = await client.query('SELECT NOW() AS current_time');
    console.log('Current time from PostgreSQL:', res.rows[0].current_time);
    client.release();
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
};

checkConnection();