// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth'; // Import your combined Auth component
import Dashboard from './components/Dashboard';
import SpendingGraphs from './components/SpendingGraphs'; // Import the SpendingGraphs component
import './App.css';
import PrivateRoute from './components/PrivateRoute'; // Import the private route
import { AuthProvider } from './context/AuthContext'; 

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // State for authentication

    return (
      <AuthProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Auth setIsAuthenticated={setIsAuthenticated} />} /> {/* Pass the prop */}
                <Route 
                    path="/dashboard" 
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}> {/* Use isAuthenticated here */}
                            <Dashboard />
                        </PrivateRoute>
                    } 
                />
                {/* New Route for Spending Graphs */}
                <Route 
                    path="/graphs" 
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}> {/* Use private route for authenticated users */}
                            <SpendingGraphs />
                        </PrivateRoute>
                    } 
                />
            </Routes>
        </Router>
      </AuthProvider>  
    );    
}

export default App;
