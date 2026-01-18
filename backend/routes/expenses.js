// backend/routes/expenses.js

const express = require('express');
const router = express.Router();
const db = require('../db');

// --- API Endpoints for Expenses ---

// GET /expenses - Get all expenses
// Retrieves all expenses from the database, ordered by date descending.
router.get('/', (req, res) => {
    const sql = "SELECT * FROM expenses ORDER BY date DESC";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// POST /expenses - Add a new expense
// Adds a new expense record to the database.
router.post('/', (req, res) => {
    const { date, category, description, amount } = req.body;
    // Simple validation
    if (!date || !category || amount === undefined || amount === null) {
        res.status(400).json({ error: 'Missing required fields: date, category, amount' });
        return;
    }

    const sql = 'INSERT INTO expenses (date, category, description, amount) VALUES (?, ?, ?, ?)';
    const params = [date, category, description, amount];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // Return the newly created expense with its ID
        res.status(201).json({
            message: 'success',
            data: { id: this.lastID, ...req.body }
        });
    });
});

// DELETE /expenses/:id - Delete an expense
// Deletes an expense record by its ID.
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM expenses WHERE id = ?';

    db.run(sql, id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // Check if any row was deleted
        if (this.changes === 0) {
            res.status(404).json({ message: `Expense with id ${id} not found` });
        } else {
            res.json({ message: `Expense with id ${id} deleted successfully` });
        }
    });
});

module.exports = router;
