const express = require('express');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: 'Ardthian',
    port: 5943, // Default port for PostgreSQL
  });

  app.get('/api/data', async (req, res) => {
    try {
      const client = await pool.connect();
      const query = 'SELECT * FROM public.student';
      const result = await client.query(query);
      res.json(result.rows);
      client.release();
    } catch (err) {
      console.error('Error:', err.stack);
      res.status(500).json({ error: 'Something went wrong.' });
    }
  });