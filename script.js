const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const typeSelect = document.querySelector("#type");
const addButton = document.querySelector("button");

const transactionList = document.querySelector(".transaction-list");

const transactions = [];

function addTransaction() {
  // Get input values
  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);
  const type = typeSelect.value;
  // validate inputs
  if (!description || isNaN(amount) || amount <= 0 || !type) {
    alert("Por favor, preencha todos os campos.");
    return;
  }
  // Create transaction object
  const transaction = {
    id: crypto.randomUUID(),
    description,
    amount,
    type,
    date: new Date(),
  };
  // add transaction to transactions array
  transactions.push(transaction);
  renderTransactions();
  console.log("Transação adicionada:", transaction);

  updateSummary();

  saveTransactions();

  clearInputs();
}

// Update transaction list
function renderTransactions() {
  transactionList.innerHTML = "";
  transactions.forEach(transaction => {
    const transactionItem = document.createElement("div");
    transactionItem.className = "transaction-card";

    const descriptionElement = document.createElement("h3");
    const amountElement = document.createElement("p");
    const typeElement = document.createElement("p");
    const dateElement = document.createElement("p");
    const deleteButton = document.createElement("button");

    descriptionElement.innerText = transaction.description;
    amountElement.innerText = transaction.amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    typeElement.innerText = transaction.type === "income" ? "Receita" : "Despesa";
    dateElement.innerText = transaction.date.toLocaleDateString();
    deleteButton.innerText = "Excluir";

    transactionItem.appendChild(descriptionElement);
    transactionItem.appendChild(amountElement);
    transactionItem.appendChild(typeElement);
    transactionItem.appendChild(dateElement);
    transactionItem.appendChild(deleteButton);
    transactionList.appendChild(transactionItem);

    deleteButton.addEventListener("click", function () {
      const transactionIndex = transactions.findIndex(
        (t) => t.id === transaction.id,
      );

      transactions.splice(transactionIndex, 1);

      renderTransactions();
      updateSummary();
      saveTransactions();
    });
  });
}

function updateSummary() {
  const incomes = transactions.filter((t) => t.type === "income");
  const expenses = transactions.filter((t) => t.type === "expense");

  let totalIncome = 0;
  let totalExpense = 0;

  incomes.forEach((income) => {
    totalIncome += income.amount;
  });

  expenses.forEach((expense) => {
    totalExpense += expense.amount;
  });

  const balance = totalIncome - totalExpense;

  const incomeElement = document.querySelector("#total-income");
  const expenseElement = document.querySelector("#total-expense");
  const balanceElement = document.querySelector("#balance");

  incomeElement.innerText = totalIncome.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
  expenseElement.innerText = totalExpense.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
  balanceElement.innerText = balance.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function loadTransactions() {
  const savedTransactions = localStorage.getItem("transactions");

  const parsedTransactions = savedTransactions
    ? JSON.parse(savedTransactions)
    : [];

  parsedTransactions.forEach((transaction) => {
    transaction.date = new Date(transaction.date);
  });

  transactions.forEach((transaction) => {
    transaction.date = new Date(transaction.date);
  });
  transactions.push(...parsedTransactions);
}

function clearInputs() {
  descriptionInput.value = "";
  amountInput.value = "";
  typeSelect.value = "";
}

loadTransactions();
renderTransactions();
updateSummary();

addButton.addEventListener("click", addTransaction);
