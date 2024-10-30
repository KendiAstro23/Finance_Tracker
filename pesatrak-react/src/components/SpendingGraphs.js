import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    AreaChart,
    Area,
    ResponsiveContainer,
} from 'recharts'; 
import { db, auth } from '../firebase';
import '../styles/graphs.css';

const SpendingGraphs = () => {
    const [spendingData, setSpendingData] = useState([]);
    const [cumulativeSpending, setCumulativeSpending] = useState([]);

    useEffect(() => {
        const fetchSpendingData = async () => {
            const user = auth.currentUser; // Get the current authenticated user
            if (user) {
                const q = query(collection(db, 'spendingEntries'), where('userId', '==', user.uid));
                const querySnapshot = await getDocs(q);
                const entries = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSpendingData(entries);

                // Calculate cumulative spending
                const cumulativeData = entries.reduce((acc, entry) => {
                    const lastAmount = acc.length > 0 ? acc[acc.length - 1].amount : 0;
                    acc.push({ date: entry.date, amount: lastAmount + entry.amount });
                    return acc;
                }, []);
                setCumulativeSpending(cumulativeData);
            }
        };
        fetchSpendingData();
    }, []);

    // Create a data structure to hold product spending per date
    const getProductSpendingData = () => {
        const productNames = [...new Set(spendingData.map(entry => entry.product))]; // Unique product names
        const dateSet = [...new Set(spendingData.map(entry => entry.date))]; // Unique dates

        return dateSet.map(date => {
            const dataPoint = { date };
            productNames.forEach(product => {
                const totalAmount = spendingData
                    .filter(entry => entry.product === product && entry.date === date)
                    .reduce((sum, entry) => sum + entry.amount, 0); // Sum amounts for the specific date and product
                dataPoint[product] = totalAmount || 0; // Set amount or 0 if none
            });
            return dataPoint;
        });
    };

    const productSpendingData = getProductSpendingData();
    const productNames = [...new Set(spendingData.map(entry => entry.product))]; // Define productNames here

    // Custom label for the Bar component
    const renderLabel = ({ x, y, value }) => (
        <text x={x + 10} y={y + 20} fill="#fff" fontWeight="bold" fontSize={12}>
            {value}
        </text>
    );

    return (
        <div className="graph-container"> {/* Apply the graph-container class */}
            <h2 className="graph-title">Daily Spending by Product</h2>
            <ResponsiveContainer width="100%" height={500}> {/* Ensure width is 100% */}
                <BarChart data={productSpendingData} margin={{ top: 20, right: 50, left: 50, bottom: 20 }}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    {productNames.map((product, index) => (
                        <Bar
                            key={index}
                            dataKey={product} // Reference the amount by product name directly
                            fill="#8884d8" // Same color for all bars
                            label={renderLabel} // Display product name inside the bar
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
    
            <h2 className="graph-title">Cumulative Spending</h2>
            <ResponsiveContainer width="100%" height={500}> {/* Ensure width is 100% */}
                <AreaChart data={cumulativeSpending} margin={{ top: 20, right: 50, left: 50, bottom: 20 }}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#8884d8"
                        fill="rgba(136, 132, 216, 0.5)"
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );    
};

export default SpendingGraphs;
