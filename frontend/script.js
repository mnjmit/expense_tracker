// frontend/script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element References ---
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalToday = document.getElementById('total-today');
    const totalMonth = document.getElementById('total-month');
    const dateInput = document.getElementById('date');

    // --- API Base URL ---
    // This should point to your backend server.
    const API_URL = 'https://expense-tracker-kqi8.onrender.com/expenses';

    // --- Pre-fill Date Input ---
    // Set the date input to today's date by default for user convenience.
    dateInput.valueAsDate = new Date();

    // --- Main Function to Fetch and Render Expenses ---
    async function fetchAndRenderExpenses() {
        try {
            // 1. Fetch data from the backend
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            const expenses = result.data;

            // 2. Clear the current list
            expenseList.innerHTML = '';

            // 3. Populate the table with expenses
            expenses.forEach(expense => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${new Date(expense.date).toLocaleDateString()}</td>
                    <td>${escapeHTML(expense.category)}</td>
                    <td>${escapeHTML(expense.description)}</td>
                    <td>$${parseFloat(expense.amount).toFixed(2)}</td>
                    <td><button class="delete-btn" data-id="${expense.id}">Delete</button></td>
                `;
                expenseList.appendChild(row);
            });

            // 4. Calculate and display totals
            calculateTotals(expenses);

        } catch (error) {
            console.error("Could not fetch expenses:", error);
            expenseList.innerHTML = '<tr><td colspan="5">Failed to load expenses. Is the backend server running?</td></tr>';
        }
    }

    // --- Form Submission Handler ---
    expenseForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission

        // 1. Get form data
        const formData = {
            date: document.getElementById('date').value,
            category: document.getElementById('category').value.trim(),
            description: document.getElementById('description').value.trim(),
            amount: parseFloat(document.getElementById('amount').value)
        };

        // 2. Simple validation
        if (!formData.date || !formData.category || isNaN(formData.amount)) {
            alert('Please fill in all required fields.');
            return;
        }

        // 3. Send data to the backend
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // 4. Reset form and refresh the list
            expenseForm.reset();
            dateInput.valueAsDate = new Date(); // Reset date to today
            await fetchAndRenderExpenses();

        } catch (error) {
            console.error('Could not add expense:', error);
            alert('Failed to add expense. Please try again.');
        }
    });

    // --- Deletion Handler (using Event Delegation) ---
    expenseList.addEventListener('click', async (e) => {
        // Check if a delete button was clicked
        if (e.target.classList.contains('delete-btn')) {
            const expenseId = e.target.getAttribute('data-id');

            // Confirm before deleting
            if (!confirm('Are you sure you want to delete this expense?')) {
                return;
            }

            try {
                const response = await fetch(`${API_URL}/${expenseId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Refresh the list to show the item has been removed
                await fetchAndRenderExpenses();

            } catch (error) {
                console.error('Could not delete expense:', error);
                alert('Failed to delete expense. Please try again.');
            }
        }
    });

    // --- Helper Functions ---

    /**
     * Calculates and displays the total expenses for today and the current month.
     * @param {Array} expenses - The array of expense objects.
     */
    function calculateTotals(expenses) {
        const now = new Date();
        const todayStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
        const currentMonth = now.getMonth(); // 0-11
        const currentYear = now.getFullYear();

        let dailyTotal = 0;
        let monthlyTotal = 0;

        expenses.forEach(expense => {
            const expenseDate = new Date(expense.date);
            // The date from the DB might include time, so compare just the date part.
            const expenseDateStr = expense.date.split('T')[0];

            // Calculate today's total
            if (expenseDateStr === todayStr) {
                dailyTotal += expense.amount;
            }

            // Calculate this month's total
            if (expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear) {
                monthlyTotal += expense.amount;
            }
        });

        totalToday.textContent = `$${dailyTotal.toFixed(2)}`;
        totalMonth.textContent = `$${monthlyTotal.toFixed(2)}`;
    }

    /**
     * A simple utility to escape HTML to prevent XSS attacks.
     * @param {string} str - The string to escape.
     * @returns {string} The escaped string.
     */
    function escapeHTML(str) {
        if (str === null || str === undefined) return '';
        return str.replace(/[&<>"']/g, function (match) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            }[match];
        });
    }

    // --- Initial Load ---
    // Fetch and display expenses when the page first loads.
    fetchAndRenderExpenses();
});
