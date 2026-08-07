const descriptionInput = document.querySelector('#description');
const amountInput = document.querySelector('#amount');
const typeSelect = document.querySelector('#type');
const addButton = document.querySelector('button');

const transactionList = document.querySelector('.transaction-list');

const transactions = [ 
{
    description: 'Exemplo de transação',
    amount: 100,
    type: 'income',
    date: new Date(),
    id: 1,
}

];