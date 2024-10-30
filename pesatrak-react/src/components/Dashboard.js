// src/components/Dashboard.js

import React, { useState } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from 'recharts';

const MAX_SPENDING_LIMIT = 1000; // Example limit

const Dashboard = () => {
  const [spendingData, setSpendingData] = useState([]);
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleAddSpending = (e) => {
    e.preventDefault();
    if (!product || !amount || !date) {
      alert('Please fill in all fields');
      return;
    }

    const newEntry = {
      date,
      product,
      amount: parseFloat(amount),
    };

    setSpendingData((prevData) => [...prevData, newEntry]);
    setProduct('');
    setAmount('');
    setDate('');
  };

  // Calculate cumulative spending
  const cumulativeData = spendingData.reduce((acc, curr) => {
    const dateKey = curr.date;
    if (!acc[dateKey]) {
      acc[dateKey] = { date: dateKey, amount: 0 };
    }
    acc[dateKey].amount += curr.amount;
    return acc;
  }, {});

  const cumulativeSpending = Object.values(cumulativeData).reduce(
    (acc, curr) => {
      const previousAmount = acc.length ? acc[acc.length - 1].amount : 0;
      acc.push({ date: curr.date, amount: previousAmount + curr.amount });
      return acc;
    },
    []
  );

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Your Spending Limit: ${MAX_SPENDING_LIMIT}</h2>

      {/* Input Form for Daily Spending */}
      <form onSubmit={handleAddSpending}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Product"
          required
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
        />
        <button type="submit">Add Spending</button>
      </form>

      {/* Displaying spending entries for reference */}
      <h3>Spending Entries</h3>
      <ul>
        {spendingData.map((entry, index) => (
          <li key={index}>
            {entry.date} - {entry.product}: ${entry.amount}
          </li>
        ))}
      </ul>

      {/* Graph for Daily Spending (Bar Chart) */}
      <h2>Daily Spending</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={spendingData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#AFEEEE" />
        </BarChart>
      </ResponsiveContainer>

      {/* Highlighted Area Graph for Cumulative Spending */}
      <h2>Cumulative Spending (Highlighted Area Graph)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={cumulativeSpending}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            fill="rgba(136, 132, 216, 0.5)" // Semi-transparent fill
            strokeWidth={2} // Stroke width for the line
            activeDot={{ r: 8 }} // Highlight active dots
          />
        </AreaChart>
      </ResponsiveContainer>

    </div>
  );
};

export default Dashboard;
