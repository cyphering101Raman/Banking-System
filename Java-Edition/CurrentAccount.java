package com.example.bankingsystem;

public class CurrentAccount extends Account {
    private double overdraftLimit;

    public CurrentAccount(String accountNumber, Customer accountHolder, double initialBalance, double overdraftLimit) {
        super(accountNumber, accountHolder, initialBalance);
        this.overdraftLimit = overdraftLimit;
    }

    @Override
    public double calculateInterest() {
        // Simplified: No interest on Current Accounts
        return 0.0;
    }

    @Override
    public void withdraw(double amount) {
        if (amount > 0 && (super.getBalance() + overdraftLimit) >= amount) { 
            super.withdraw(amount); 
        } else {
            System.out.println("Insufficient funds or withdrawal exceeds overdraft limit.");
        }
    }

    // Getter for overdraft limit
    public double getOverdraftLimit() {
        return overdraftLimit;
    }
}