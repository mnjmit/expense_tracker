// backend/db.js
require('dotenv').config();
const { Pool } = require('pg');

// Create a new pool of connections, using the connection string from the .env file
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Function to create the table
const createTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS expenses (
      id SERIAL PRIMARY KEY,
      date DATE NOT NULL,
      category VARCHAR(255) NOT NULL,
      description TEXT,
      amount NUMERIC(10, 2) NOT NULL
    );
  `;
  try {
    const res = await pool.query(queryText);
    console.log('Table "expenses" is ready.');
  } catch (err) {
    console.error('Error creating table', err.stack);
  }
};

// Connect to the database and create the table if it doesn't exist
pool.connect()
  .then(client => {
    console.log('Connected to the PostgreSQL database.');
    client.release();
    createTable();
  })
  .catch(err => console.error('Error connecting to the database', err.stack));

// Export the pool for querying
module.exports = {
  query: (text, params) => pool.query(text, params),
};