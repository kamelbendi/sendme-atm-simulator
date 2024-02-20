const readlineSync = require('readline-sync');
const axios = require('axios');
const { apiUrl } = require('./api-urls');



function displayMenu() {
  console.log('\n ----- ATM Simulator -------------');
  console.log('1. Check Balance');
  console.log('2. Withdraw');
  console.log('3. Deposit');
  console.log('4. Exit');
}

async function checkBalance() {
  let cardNumber, pin, choice;
  do {
    cardNumber = readlineSync.question('Enter your card number: (type "exit" to quit)  ');
    if (cardNumber === 'exit') {
      startATM();
    }

    if (cardNumber.length !== 16) {
      console.log('Invalid card number. Please enter a 16-digit card number.');
    }

  } while (cardNumber.length !== 16);

  do {
    pin = readlineSync.question('Enter your PIN: (type "exit" to quit): ');

    if (pin === 'exit') {
      startATM();
    }

    if (pin.length !== 6) {
      console.log('Invalid PIN. Please enter a 6-digit PIN.');
    }

  } while (pin.length !== 6);
  
  await axios.post(apiUrl.getBalance, { cardNumber, pin })
    .then(response => {
      console.log(`Your balance is: $${response.data.balance}`);
    })
    .catch(error => {
      console.log('Error fetching balance. Please try again later.');
      
    }
  );
    do {
      choice = readlineSync.question('type: type "exit" to quit: ');
      if (choice === 'exit') {
        startATM();
      }

    } while (choice !== 'exit');
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
  } while (parseInt(choice) && parseInt(choice) > 5);
}

startATM();
