const descriptionInput = document.querySelector('#description');
const amountInput = document.querySelector('#amount');
const typeSelect = document.querySelector('#type');
const addButton = document.querySelector('button');

const transactionList = document.querySelector('.transaction-list');

const transactions = [];

function addTransaction() {

    console.log('AddTransaction executou');
 // Get input values
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;
 // validate inputs
    if (!description || isNaN(amount) || amount <= 0 || !type) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
 // Create transaction object
    const transaction = {
        id: transactions.length + 1,
        description,
        amount,
        type,
        date: new Date(),
    };
 // add transaction to transactions array
    transactions.push(transaction);
    renderTransactions();
    console.log('Transação adicionada:', transaction);
 // Update transaction list

 clearInputs();
}

function renderTransactions() {
 transactionList.innerHTML = '';
    transactions.forEach(transaction =>  {
        const transactionItem = document.createElement('div');
            transactionItem.className = 'transaction-card';

        const descriptionElement = document.createElement('h3');
        const amountElement = document.createElement('p');
        const typeElement = document.createElement('p');
        const dateElement = document.createElement('p');

        descriptionElement.innerText = transaction.description;
        amountElement.innerText = `R$ ${transaction.amount.toFixed(2)}`;
        typeElement.innerText = transaction.type;
        dateElement.innerText = transaction.date.toLocaleDateString();

        transactionItem.appendChild(descriptionElement);
        transactionItem.appendChild(amountElement);
        transactionItem.appendChild(typeElement);
        transactionItem.appendChild(dateElement);
        transactionList.appendChild(transactionItem);
        });
}

function clearInputs() {
    descriptionInput.value = '';
    amountInput.value = '';
    typeSelect.value = '';
}

addButton.addEventListener("click", addTransaction);