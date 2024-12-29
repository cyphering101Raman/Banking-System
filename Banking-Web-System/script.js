// Load accounts from local storage (if exists)
let accounts = [];
try {
  const data = localStorage.getItem('accounts');
  if (data) {
    accounts = JSON.parse(data);
  }
} catch (error) {
  console.error("Error loading accounts from local storage:", error);
}

function showAccountForm() {
  document.getElementById("accountForm").style.display = "block";
  document.getElementById("transactionForm").style.display = "none";
  document.getElementById("balanceForm").style.display = "none";
  document.getElementById("deleteForm").style.display = "none";
}

function showTransactionForm() {
  document.getElementById("accountForm").style.display = "none";
  document.getElementById("transactionForm").style.display = "block";
  document.getElementById("balanceForm").style.display = "none";
  document.getElementById("deleteForm").style.display = "none";
}

function showBalanceForm() {
  document.getElementById("accountForm").style.display = "none";
  document.getElementById("transactionForm").style.display = "none";
  document.getElementById("balanceForm").style.display = "block";
  document.getElementById("deleteForm").style.display = "none";
}

function showDeleteForm() {
  document.getElementById("accountForm").style.display = "none";
  document.getElementById("transactionForm").style.display = "none";
  document.getElementById("balanceForm").style.display = "none";
  document.getElementById("deleteForm").style.display = "block";
}

function createAccount() {
  const accountNumber = document.getElementById("accountNumber").value;
  const accountType = document.getElementById("accountType").value;
  const customerName = document.getElementById("customerName").value;
  const initialBalance = parseFloat(document.getElementById("initialBalance").value);

  if (!accountNumber || !accountType || !customerName || isNaN(initialBalance) || initialBalance < 0) {
    displayError("Please fill in all fields correctly and ensure initial balance is non-negative.");
    return;
  }

  if (accounts.some(acc => acc.accountNumber === accountNumber)) {
    displayError("Account number already exists.");
    return;
  }

  const newAccount = {
    accountNumber: accountNumber,
    accountType: accountType,
    customerName: customerName,
    balance: initialBalance
  };

  accounts.push(newAccount);
  saveData();
  displaySuccess("Account created successfully!");
  clearAccountForm();
}

function performTransaction() {
  const accountNumber = document.getElementById("transactionAccountNumber").value;
  const transactionType = document.getElementById("transactionType").value;
  const amount = parseFloat(document.getElementById("transactionAmount").value);

  if (isNaN(amount) || amount <= 0) {
    displayError("Please enter a valid amount.");
    return;
  }

  const accountIndex = accounts.findIndex(acc => acc.accountNumber === accountNumber);

  if (accountIndex === -1) {
    displayError("Account not found.");
    return;
  }

  if (transactionType === "deposit") {
    accounts[accountIndex].balance += amount;
  } else if (transactionType === "withdraw") {
    if (amount > accounts[accountIndex].balance) {
      displayError("Insufficient funds.");
      return;
    }
    accounts[accountIndex].balance -= amount;
  }

  saveData();
  displaySuccess("Transaction successful.");
  clearTransactionForm();
}

function checkBalance() {
  const accountNumber = document.getElementById("balanceAccountNumber").value;
  const account = accounts.find(acc => acc.accountNumber === accountNumber);

  if (!account) {
    displayError("Account not found.");
  } else {
    displayResult(`
      Account Number: ${account.accountNumber}<br>
      Customer Name: ${account.customerName}<br>
      Balance: $${account.balance}
    `);
  }
}

function deleteAccount() {
  const accountNumber = document.getElementById("deleteAccountNumber").value;

  const index = accounts.findIndex(acc => acc.accountNumber === accountNumber);
  if (index !== -1) {
    accounts.splice(index, 1);
    saveData();
    displaySuccess("Account deleted successfully.");
  } else {
    displayError("Account not found.");
  }

  document.getElementById("deleteAccountNumber").value = "";
}

function saveData() {
  try {
    localStorage.setItem('accounts', JSON.stringify(accounts));
  } catch (error) {
    console.error("Error saving data to local storage:", error);
  }
}

function displayError(message) {
  document.getElementById("results").innerHTML = `<p style="color: red;">${message}</p>`;
}

function displaySuccess(message) {
  document.getElementById("results").innerHTML = `<p style="color: green;">${message}</p>`;
}

function displayResult(message) {
  document.getElementById("results").innerHTML = message;
}

function clearAccountForm() {
  document.getElementById("accountNumber").value = "";
  document.getElementById("accountType").value = "Savings"; // Reset select
  document.getElementById("customerName").value = "";
  document.getElementById("initialBalance").value = "";
}

function clearTransactionForm() {
  document.getElementById("transactionAccountNumber").value = "";
  document.getElementById("transactionType").value = "deposit"; // Reset select
  document.getElementById("transactionAmount").value = "";
}
