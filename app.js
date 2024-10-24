const fs = require('fs');
const { Pool } = require('pg');

// Read the password from the secret file
const password = fs.readFileSync(process.env.POSTGRES_PASSWORD, 'utf8').trim();

// Construct the database URL
const dbUser  = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

const connectionString = `postgres://${dbUser }:${password}@${dbHost}:${dbPort}/${dbName}`;

const pool = new Pool({
  connectionString: connectionString,
});

// Your existing connection logic...
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