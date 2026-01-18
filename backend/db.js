// backend/db.js

const sqlite3 = require('sqlite3').verbose();

// Connect to an in-memory database for simplicity, or use a file-based database
// For a persistent database, replace ':memory:' with a file path e.g., 'expense-tracker.db'
const db = new sqlite3.Database('./expense-tracker.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Create the expenses table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            category TEXT NOT NULL,
            description TEXT,
            amount REAL NOT NULL
        )`, (err) => {
            if (err) {
                console.error('Error creating table', err.message);
            } else {
                console.log('Table "expenses" is ready.');
            }
        });
    }
});

module.exports = db;
