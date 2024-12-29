package com.example.bankingsystem;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Bank bank = new Bank(); 

        while (true) {
            System.out.println("\nBanking System Menu");
            System.out.println("1. Add Account");
            System.out.println("2. Deposit");
            System.out.println("3. Withdraw");
            System.out.println("4. Check Balance");
            System.out.println("5. Calculate Interest");
            System.out.println("6. Exit");
            System.out.print("Enter your choice: ");

            try {
                int choice = scanner.nextInt();
                scanner.nextLine(); // Consume the newline character

                if (choice == 1) {
                    System.out.print("Enter account number: ");
                    String accountNumber = scanner.nextLine();

                    // Check if account already exists
                    if (bank.getAccount(accountNumber) != null) {
                        System.out.println("Account already exists.");
                    } else {
                        System.out.print("Enter account type (S for Savings, C for Current): ");
                        String accountType = scanner.nextLine().toUpperCase();

                        System.out.print("Enter customer name: ");
                        String customerName = scanner.nextLine();

                        System.out.print("Enter customer address: ");
                        String customerAddress = scanner.nextLine();

                        System.out.print("Enter customer contact: ");
                        String customerContact = scanner.nextLine();

                        Customer customer = new Customer(customerName, customerAddress, customerContact);

                        if (accountType.equals("S")) {
                            System.out.print("Enter initial balance: ");
                            double initialBalance = scanner.nextDouble();
                            scanner.nextLine(); // Consume newline

                            System.out.print("Enter interest rate: ");
                            double interestRate = scanner.nextDouble();
                            scanner.nextLine(); // Consume newline

                            SavingsAccount savingsAccount = new SavingsAccount(accountNumber, customer, initialBalance, interestRate);
                            bank.addAccount(savingsAccount);
                            System.out.println("Savings Account created successfully.");
                        } else if (accountType.equals("C")) {
                            System.out.print("Enter initial balance: ");
                            double initialBalance = scanner.nextDouble();
                            scanner.nextLine(); // Consume newline

                            System.out.print("Enter overdraft limit: ");
                            double overdraftLimit = scanner.nextDouble();
                            scanner.nextLine(); // Consume newline

                            CurrentAccount currentAccount = new CurrentAccount(accountNumber, customer, initialBalance, overdraftLimit);
                            bank.addAccount(currentAccount);
                            System.out.println("Current Account created successfully.");
                        } else {
                            System.out.println("Invalid account type.");
                        }
                    }
                } else if (choice == 2) {
                    System.out.print("Enter account number: ");
                    String accountNumber = scanner.nextLine();
                    System.out.print("Enter amount to deposit: ");
                    double amount = scanner.nextDouble();
                    scanner.nextLine(); // Consume newline
                    Account account = bank.getAccount(accountNumber);
                    if (account != null) {
                        account.deposit(amount);
                        System.out.println("Deposited: $" + amount);
                    } else {
                        System.out.println("Account not found.");
                    }
                } else if (choice == 3) {
                    System.out.print("Enter account number: ");
                    String accountNumber = scanner.nextLine();
                    System.out.print("Enter amount to withdraw: ");
                    double amount = scanner.nextDouble();
                    scanner.nextLine(); // Consume newline
                    Account account = bank.getAccount(accountNumber);
                    if (account != null) {
                        account.withdraw(amount);
                        System.out.println("Withdrawn: $" + amount);
                    } else {
                        System.out.println("Account not found.");
                    }
                } else if (choice == 4) {
                    System.out.print("Enter account number: ");
                    String accountNumber = scanner.nextLine();
                    Account account = bank.getAccount(accountNumber);
                    if (account != null) {
                        System.out.println("Current Balance: $" + account.getBalance());
                    } else {
                        System.out.println("Account not found.");
                    }
                } else if (choice == 5) {
                    System.out.print("Enter account number: ");
                    String accountNumber = scanner.nextLine();
                    Account account = bank.getAccount(accountNumber);
                    if (account != null) {
                        double interest = account.calculateInterest();
                        System.out.println("Calculated Interest: $" + interest);
                    } else {
                        System.out.println("Account not found.");
                    }
                } else if (choice == 6) {
                    System.out.println("Exiting...");
                    break;
                } else {
                    System.out.println("Invalid choice.");
                }
            } catch (Exception e) {
                System.out.println("Invalid input. Please enter valid values.");
                scanner.nextLine(); // Consume the invalid input
            }
        }

        scanner.close();
    }
}