import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore

const MAX_SPENDING_LIMIT = 1000; // Example limit

const Dashboard = () => {
    const [spendingData, setSpendingData] = useState([]);
    const [product, setProduct] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const user = auth.currentUser; // Get the current authenticated user
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSpendingData = async () => {
            if (user) {
                const q = query(collection(db, "spendingEntries"), where("userId", "==", user.uid));
                const querySnapshot = await getDocs(q);
                const entries = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSpendingData(entries);
            }
        };
        fetchSpendingData();
    }, [user]);

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
            userId: user.uid // Store userId with the entry
        };

        try {
            const docRef = await addDoc(collection(db, "spendingEntries"), newEntry);
            setSpendingData((prevData) => [...prevData, { id: docRef.id, ...newEntry }]); // Include id from Firestore
            setProduct('');
            setAmount('');
            setDate('');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    // Function to handle deletion of an entry
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "spendingEntries", id)); // Delete the document from Firestore
            setSpendingData(spendingData.filter(entry => entry.id !== id)); // Update state to remove the deleted entry
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/'); // Redirect to login after logout
    };

    return (
        <div className="dashboard-container">
            <div className="top-bar">
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>

            <div className="spending-form">
                <h2>Your Spending Limit: Ksh {MAX_SPENDING_LIMIT}</h2>

                <h2>Add Spending</h2>
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
            </div>

            <h3>Spending Entries</h3>
            <ul>
                {spendingData.map((entry) => (
                    <li key={entry.id}>
                        {entry.date} - {entry.product}: Ksh {entry.amount}
                        <button onClick={() => handleDelete(entry.id)} style={{ marginLeft: '10px', color: 'red' }}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            {/* Button to navigate to the spending graphs page */}
            <button onClick={() => navigate('/graphs')} className="view-graphs-button">
                View Spending Graphs
            </button>
        </div>
    );
};

export default Dashboard;
