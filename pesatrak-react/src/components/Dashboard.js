import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import AlertNotification from './AlertNotification';

const MAX_SPENDING_LIMIT = 20000;

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    // Fetch transactions from backend
    const fetchTransactions = async () => {
      const response = await axios.get('/api/transactions');
      setTransactions(response.data);
      // Calculate cumulative spending
      checkSpendingLimit(response.data);
    };
    fetchTransactions();
  }, []);

  const checkSpendingLimit = (transactions) => {
    const totalSpent = transactions.reduce((acc, trans) => acc + trans.amount, 0);
    if (totalSpent > MAX_SPENDING_LIMIT) {
      setAlert('You have exceeded your spending limit!');
    }
  };

  // Process data for charts
  const dailyData = transactions.map(trans => ({
    date: trans.date,
    amount: trans.amount,
  }));

  return (
    <div>
      {alert && <AlertNotification message={alert} />}
      <h2>Spending Overview</h2>
      <LineChart width={600} height={300} data={dailyData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default Dashboard;
