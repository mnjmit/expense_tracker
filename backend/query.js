
// backend/query.js
const db = require('./db');

// Get the SQL query from the command-line arguments.
// Example usage: node query.js "SELECT * FROM expenses"
const query = process.argv[2];

if (!query) {
    console.error('Please provide a SQL query as an argument.');
    // Close the db connection before exiting
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
        process.exit(1);
    });
} else {
    // Execute the query
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error executing query:', err.message);
        } else {
            // Pretty-print the results
            console.log(JSON.stringify(rows, null, 2));
        }

        // Close the database connection
        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Closed the database connection.');
        });
    });
}
