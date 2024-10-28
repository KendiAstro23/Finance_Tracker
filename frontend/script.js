// Sample Data
let transactions = [
    { date: '2024-10-01', amount: 1500, category: 'Groceries' },
    { date: '2024-10-03', amount: 2000, category: 'Transport' },
    { date: '2024-10-05', amount: 1200, category: 'Entertainment' },
    { date: '2024-10-07', amount: 1800, category: 'Utilities' },
];

// Function to update total and cumulative spending
function updateSpending() {
    let totalSpending = transactions.reduce((total, transaction) => total + transaction.amount, 0);
    let cumulativeSpending = totalSpending; // For simplicity, assume cumulative is the same
    
    document.getElementById('totalSpending').textContent = `KES ${totalSpending}`;
    document.getElementById('cumulativeSpending').textContent = `KES ${cumulativeSpending}`;
}

// Function to render recent transactions
function renderTransactions() {
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = ''; // Clear previous transactions

    transactions.forEach(transaction => {
        let li = document.createElement('li');
        li.textContent = `${transaction.date}: KES ${transaction.amount} - ${transaction.category}`;
        transactionList.appendChild(li);
    });
}

// Function to update charts
function updateCharts() {
    const dates = transactions.map(t => t.date);
    const amounts = transactions.map(t => t.amount);
    const cumulativeAmounts = amounts.reduce((acc, curr, index) => {
        acc.push((acc[index - 1] || 0) + curr);
        return acc;
    }, []);

    // Daily Spending Chart
    dailyChart.data.labels = dates;
    dailyChart.data.datasets[0].data = amounts;
    dailyChart.update();

    // Cumulative Spending Chart
    cumulativeChart.data.labels = dates;
    cumulativeChart.data.datasets[0].data = cumulativeAmounts;
    cumulativeChart.update();
}

// Event Listener for Adding New Transactions
document.getElementById('transactionForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission from reloading the page

    const date = document.getElementById('transactionDate').value;
    const amount = parseFloat(document.getElementById('transactionAmount').value);
    const category = document.getElementById('transactionCategory').value;

    if (date && !isNaN(amount) && category) {
        transactions.push({ date, amount, category });

        // Clear form fields
        document.getElementById('transactionDate').value = '';
        document.getElementById('transactionAmount').value = '';
        document.getElementById('transactionCategory').value = '';

        // Update UI and Charts
        updateSpending();
        renderTransactions();
        updateCharts();
    }
});

// Set up charts with interactivity
const dailyChartContext = document.getElementById('dailyChart').getContext('2d');
const cumulativeChartContext = document.getElementById('cumulativeChart').getContext('2d');

// Daily Spending Chart
const dailyChart = new Chart(dailyChartContext, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Daily Spending',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        onClick: (event, elements) => {
            if (elements.length) {
                const index = elements[0].index;
                const transaction = transactions[index];
                alert(`Date: ${transaction.date}\nAmount: KES ${transaction.amount}\nCategory: ${transaction.category}`);
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `KES ${context.raw}`;
                    }
                }
            }
        }
    }
});

// Cumulative Spending Chart
const cumulativeChart = new Chart(cumulativeChartContext, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Cumulative Spending',
            data: [],
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)',
            tension: 0.1
        }]
    },
    options: {
        onClick: (event, elements) => {
            if (elements.length) {
                const index = elements[0].index;
                const transaction = transactions[index];
                alert(`Date: ${transaction.date}\nAmount: KES ${transaction.amount}\nCategory: ${transaction.category}`);
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `KES ${context.raw}`;
                    }
                }
            }
        }
    }
});

// Initial render
updateSpending();
renderTransactions();
updateCharts();

