const readlineSync = require('readline-sync');

// Initial balance
let balance = 1000;

function displayMenu() {
  console.log('\nATM Simulator');
  console.log('1. Check Balance');
  console.log('2. Withdraw');
  console.log('3. Deposit');
  console.log('4. Exit');
}

function checkBalance() {
  console.log(`Current Balance: ${balance} PLN`);
}

function withdraw() {
  const amount = parseFloat(readlineSync.question('Enter withdrawal amount: PLN'));
  if (isNaN(amount) || amount <= 0 || amount > balance) {
    console.log('Invalid withdrawal amount.');
  } else {
    balance -= amount;
    console.log(`Withdrawal successful. Remaining Balance: $${balance}`);
  }
}

function deposit() {
  const amount = parseFloat(readlineSync.question('Enter deposit amount: PLN '));
  if (isNaN(amount) || amount <= 0) {
    console.log('Invalid deposit amount.');
  } else {
    balance += amount;
    console.log(`Deposit successful. New Balance: $${balance}`);
  }
}

function startATM() {
  let choice;
  do {
    displayMenu();
    choice = readlineSync.question('Enter your choice (1-4): ');

    switch (choice) {
      case '1':
        checkBalance();
        break;
      case '2':
        withdraw();
        break;
      case '3':
        deposit();
        break;
      case '4':
        console.log('Exiting ATM. Goodbye!');
        break;
      default:
        console.log('Invalid choice. Please enter a number between 1 and 4.');
    }
  } while (choice !== '4');
}

startATM();
