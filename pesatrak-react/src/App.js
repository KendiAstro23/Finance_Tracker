import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
    <Router>
        <Routes>
            <Route path="/" element={<Login />} /> {/* Default route */}
            <Route path="/signup" element={<Signup />} /> {/* Signup route */}
            <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard route */}
                </Routes>
            </Router>
    <Footer /> 
</div>
  );
}

export default App;
