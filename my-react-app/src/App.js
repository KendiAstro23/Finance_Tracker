import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

function App() {
  const [transactions, setTransactions] = useState([
    { date: '2024-10-01', amount: 1500, category: 'Groceries' },
    { date: '2024-10-03', amount: 2000, category: 'Transport' },
    { date: '2024-10-05', amount: 1200, category: 'Entertainment' },
    { date: '2024-10-07', amount: 1800, category: 'Utilities' },
  ]);
  const [totalSpending, setTotalSpending] = useState(0);
  const [cumulativeSpending, setCumulativeSpending] = useState(0);
  const dailyChartRef = useRef(null);
  const cumulativeChartRef = useRef(null);
  let dailyChart, cumulativeChart;

  useEffect(() => {
    updateSpending();
    renderCharts();
  }, [transactions]);

  // Function to update total and cumulative spending
  const updateSpending = () => {
    const total = transactions.reduce((total, transaction) => total + transaction.amount, 0);
    setTotalSpending(total);
    setCumulativeSpending(total); // For simplicity, assume cumulative is the same
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const date = event.target.transactionDate.value;
    const amount = parseFloat(event.target.transactionAmount.value);
    const category = event.target.transactionCategory.value;

    if (date && !isNaN(amount) && category) {
      setTransactions([...transactions, { date, amount, category }]);
      event.target.reset();
    }
  };

  // Function to render charts using Chart.js
  const renderCharts = () => {
    const dates = transactions.map(t => t.date);
    const amounts = transactions.map(t => t.amount);
    const cumulativeAmounts = amounts.reduce((acc, curr, index) => {
      acc.push((acc[index - 1] || 0) + curr);
      return acc;
    }, []);

    if (!dailyChart) {
      dailyChart = new Chart(dailyChartRef.current, {
        type: 'bar',
        data: {
          labels: dates,
          datasets: [{
            label: 'Daily Spending',
            data: amounts,
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
          }
        }
      });
    } else {
      dailyChart.data.labels = dates;
      dailyChart.data.datasets[0].data = amounts;
      dailyChart.update();
    }

    if (!cumulativeChart) {
      cumulativeChart = new Chart(cumulativeChartRef.current, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: 'Cumulative Spending',
            data: cumulativeAmounts,
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
          }
        }
      });
    } else {
      cumulativeChart.data.labels = dates;
      cumulativeChart.data.datasets[0].data = cumulativeAmounts;
      cumulativeChart.update();
    }
  };

  return (
    <div className="container">
      <header>
        <h1>PESATRAK</h1>
        <h2>Your Financial Tracker</h2>
      </header>

      <main>
        <section className="metrics">
          <div className="metric">
            <h3>Total Spending</h3>
            <p>{`KES ${totalSpending}`}</p>
          </div>
          <div className="metric">
            <h3>Cumulative Spending</h3>
            <p>{`KES ${cumulativeSpending}`}</p>
          </div>
        </section>

        <section className="transactions">
          <h3>Recent Transactions</h3>
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index}>
                {`${transaction.date}: KES ${transaction.amount} - ${transaction.category}`}
              </li>
            ))}
          </ul>

          <h3>Add New Transaction</h3>
          <form id="transactionForm" onSubmit={handleSubmit}>
            <input type="text" id="transactionDate" name="transactionDate" placeholder="YYYY-MM-DD" required />
            <input type="number" id="transactionAmount" name="transactionAmount" placeholder="Amount" required />
            <input type="text" id="transactionCategory" name="transactionCategory" placeholder="Category" required />
            <button type="submit">Add Transaction</button>
          </form>
        </section>

        <section className="charts">
          <h3>Spending Charts</h3>
          <canvas id="dailyChart" ref={dailyChartRef}></canvas>
          <canvas id="cumulativeChart" ref={cumulativeChartRef}></canvas>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 PESATRAK. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
