// app.js
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Add a new expense
function addExpense(amount, description, category) {
  expenses.push({ amount: parseFloat(amount), description, category });
  localStorage.setItem('expenses', JSON.stringify(expenses));
  updateUI();
}

// Delete an expense by index
function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  updateUI();
}

// Calculate total spending by category
function calculateTotals() {
  const totals = {};
  expenses.forEach((expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
  });
  return totals;
}

// Update the user interface
function updateUI() {
  displayExpenses();
}

// Display the expense list
function displayExpenses() {
  const expenseList = document.getElementById('expense-list');
  expenseList.innerHTML = ''; // Clear the list
  expenses.forEach((expense, index) => {
    const listItem = document.createElement('div');
    listItem.className = 'expense-item';
    listItem.innerHTML = `
      <span>${expense.description}</span>
      <span>${expense.category}</span>
      <span>$${expense.amount.toFixed(2)}</span>
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    expenseList.appendChild(listItem);
  });
}

// Handle form submission
document.getElementById('expense-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;

  if (amount && description && category) {
    addExpense(amount, description, category);
    document.getElementById('expense-form').reset();
  }
});

// Initialize UI on page load
document.addEventListener('DOMContentLoaded', () => {
  updateUI();
});
