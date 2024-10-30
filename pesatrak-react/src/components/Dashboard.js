// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore
import { useAuth } from '../context/AuthContext'; // Import the Auth context

const MAX_SPENDING_LIMIT = 1000; // Example limit

const Dashboard = () => {
    const { currentUser } = useAuth(); // Get the current authenticated user from context
    const [spendingData, setSpendingData] = useState([]);
    const [product, setProduct] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSpendingData = async () => {
            if (currentUser) {
                const q = query(collection(db, "spendingEntries"), where("userId", "==", currentUser.uid));
                const querySnapshot = await getDocs(q);
                const entries = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSpendingData(entries);
            }
        };
        fetchSpendingData();
    }, [currentUser]);

    const handleAddSpending = async (e) => {
        e.preventDefault();
        if (!product || !amount || !date) {
            alert('Please fill in all fields');
            return;
        }

        const newEntry = {
            date,
            product,
            amount: parseFloat(amount),
            userId: currentUser.uid // Store userId with the entry
        };

        try {
            await addDoc(collection(db, "spendingEntries"), newEntry);
            setSpendingData((prevData) => [...prevData, newEntry]);
            setProduct('');
            setAmount('');
            setDate('');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/'); // Redirect to login after logout
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>

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
                {spendingData.map((entry) => (
                    <li key={entry.id}>
                        {entry.date} - {entry.product}: ${entry.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
