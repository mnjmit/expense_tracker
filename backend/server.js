// backend/server.js

const express = require('express');
const cors = require('cors');
const expenseRoutes = require('./routes/expenses');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---

// Enable Cross-Origin Resource Sharing (CORS)
// This allows the frontend (running on a different origin) to make requests to this backend.
app.use(cors());

// Enable parsing of JSON request bodies
// This is necessary to handle POST requests that send data in JSON format.
app.use(express.json());

// --- API Routes ---

// Mount the expense-related routes under the /expenses path
app.use('/expenses', expenseRoutes);

// --- Server Startup ---

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});
