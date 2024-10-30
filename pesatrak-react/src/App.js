// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute'; // Import the private route
import { auth } from './firebase'; // Ensure this path is correct based on your project structure

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsAuthenticated(!!user); // Set authenticated state based on user
        });

        return () => unsubscribe(); // Clean up subscription on unmount
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/dashboard" element={<PrivateRoute isAuthenticated={isAuthenticated}><Dashboard /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
