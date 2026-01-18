// backend/routes/expenses.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// --- API Endpoints for Expenses ---

// GET /expenses - Get all expenses
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM expenses ORDER BY date DESC');
    res.json({ message: 'success', data: rows });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST /expenses - Add a new expense
router.post('/', async (req, res) => {
  const { date, category, description, amount } = req.body;

  // Simple validation
  if (!date || !category || amount === undefined || amount === null) {
    return res.status(400).json({ error: 'Missing required fields: date, category, amount' });
  }

  const sql = 'INSERT INTO expenses (date, category, description, amount) VALUES ($1, $2, $3, $4) RETURNING *';
  const params = [date, category, description, amount];

  try {
    const { rows } = await db.query(sql, params);
    res.status(201).json({ message: 'success', data: rows[0] });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE /expenses/:id - Delete an expense
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM expenses WHERE id = $1';

  try {
    const result = await db.query(sql, [id]);
    // Check if any row was deleted
    if (result.rowCount === 0) {
      res.status(404).json({ message: `Expense with id ${id} not found` });
    } else {
      res.json({ message: `Expense with id ${id} deleted successfully` });
    }
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;