// In-memory data structure to store accounts (for this simple example)
let accounts = [];

function showAccountForm() {
    // Hide other forms and show the account form
    document.getElementById("accountForm").style.display = "block";
    document.getElementById("transactionForm").style.display = "none";
    document.getElementById("balanceForm").style.display = "none";
}

function showTransactionForm() {
    // Hide other forms and show the transaction form
    document.getElementById("accountForm").style.display = "none";
    document.getElementById("transactionForm").style.display = "block";
    document.getElementById("balanceForm").style.display = "none";
}

function showBalanceForm() {
    // Hide other forms and show the balance form
    document.getElementById("accountForm").style.display = "none";
    document.getElementById("transactionForm").style.display = "none";
    document.getElementById("balanceForm").style.display = "block";
}

function createAccount() {
    const accountNumber = document.getElementById("accountNumber").value;
    const accountType = document.getElementById("accountType").value;
    const customerName = document.getElementById("customerName").value;
    const initialBalance = parseFloat(document.getElementById("initialBalance").value);

    // Basic input validation
    if (!accountNumber || !accountType || !customerName || isNaN(initialBalance) || initialBalance < 0) {
        displayError("Please fill in all fields correctly and ensure initial balance is non-negative.");
        return;
    }

    // Check for duplicate account number
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
    displaySuccess("Account created successfully!");

    // Clear input fields
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

    const account = accounts.find(acc => acc.accountNumber === accountNumber);

    if (!account) {
        displayError("Account not found.");
        return;
    }

    if (transactionType === "deposit") {
        account.balance += amount;
    } else if (transactionType === "withdraw") {
        if (amount > account.balance) {
            displayError("Insufficient funds.");
            return;
        }
        account.balance -= amount;
    }

    displaySuccess("Transaction successful.");

    // Clear input fields
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
            Balance: $₹{account.balance}
        `);
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