let transactions = [];
let balance = 0;

const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const balanceEl = document.getElementById('balance');
const transactionListEl = document.getElementById('transaction-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);

  if (!description || isNaN(amount)) {
    alert('Please enter valid content.');
    return;
  }

  const transaction = { id: Date.now(), description, amount };
  transactions.push(transaction);
  balance += amount;

  updateUI();
  saveToLocalStorage();

  descriptionInput.value = '';
  amountInput.value = '';
});

function updateUI() {
  balanceEl.textContent = `₩${balance.toLocaleString()}`;

  transactionListEl.innerHTML = '';
  transactions.forEach((t) => {
    const li = document.createElement('li');
    li.textContent = `${t.description}: ₩${t.amount.toLocaleString()}`;
    
    if (t.amount >= 0) {
      li.classList.add('positive');
    } else {
      li.classList.add('negative');
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.onclick = () => deleteTransaction(t.id);
    li.appendChild(deleteBtn);

    transactionListEl.appendChild(li);
  });
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  balance = transactions.reduce((acc, t) => acc + t.amount, 0);
  updateUI();
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
  localStorage.setItem('balance', balance);
}

window.addEventListener('DOMContentLoaded', () => {
  const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
  transactions = storedTransactions;
  balance = parseFloat(localStorage.getItem('balance')) || 0;
  updateUI();
});  