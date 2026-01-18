# Daily Expense Tracker

A simple, beginner-friendly, full-stack application to track daily expenses. It features a Node.js backend API and a clean, responsive frontend built with vanilla HTML, CSS, and JavaScript.

## 🎯 Features
- **Add Expenses**: Easily add new expenses with date, category, description, and amount.
- **View Expenses**: See all your expenses in a neatly organized table.
- **Delete Expenses**: Remove entries you no longer need.
- **Track Totals**: Automatically view total expenses for the current day and the current month.
- **API-Based**: The frontend and backend are decoupled, communicating via a RESTful API.

---

## 🧱 Tech Stack
- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: SQLite

---

## 🚀 How to Run the Project

You need to have **Node.js** and **npm** installed on your machine.

### 1. Backend Setup

First, set up and start the backend server.

**a. Navigate to the backend directory:**
```bash
cd backend
```

**b. Install dependencies:**
This command reads the `package.json` file and installs the required libraries (Express, CORS, and SQLite3).
```bash
npm install
```

**c. Start the server:**
This command runs the `server.js` file, which starts the API server. By default, it will be available at `http://localhost:3000`.
```bash
npm start
```
You should see a message in the terminal: `Backend server is running on http://localhost:3000`. Leave this terminal window open.

---

### 2. Frontend Setup

Next, open the frontend in your web browser.

**a. Open the `index.html` file:**
Navigate to the `frontend` directory in your file explorer.
```
expense-tracker/
└── frontend/
    └── index.html  <-- Double-click this file
```
Simply double-click the `index.html` file to open it in your default web browser (like Chrome, Firefox, or Edge).

**b. That's it!**
The application should now be running. The frontend will automatically connect to the backend server you started in the previous step.

---

## 📝 Sample Data and Usage

Once the application is running, you can start adding expenses.

**Example: Add a new expense**
1. **Date**: The date field is pre-filled with today's date, but you can change it.
2. **Category**: `Food`
3. **Description**: `Coffee with a friend`
4. **Amount**: `4.50`
5. Click **"Add Expense"**.

The new expense will appear in the table below, and the "Today's Total" and "This Month's Total" will update automatically.

You can delete any expense by clicking the red **"Delete"** button in its corresponding row.

#this is a change to make new commit
