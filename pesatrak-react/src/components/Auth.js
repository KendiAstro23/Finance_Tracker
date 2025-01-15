// src/components/Auth.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
//import './Auth.css'; 

const Auth = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                setIsAuthenticated(true); // Set authentication state
                navigate('/dashboard'); // Redirect to dashboard on successful login
            } catch (error) {
                console.error("Login Error: ", error);
                alert("Login failed. Please check your credentials."); // Alert on login failure
            }
        } else {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                setIsAuthenticated(true); // Set authentication state
                navigate('/dashboard'); // Redirect to dashboard after sign-up
            } catch (error) {
                console.error("Sign Up Error: ", error);
                alert("Sign Up failed. Please try again."); // Alert on sign-up failure
            }
        }
    };

    return (
        <div className="auth-container">
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                Switch to {isLogin ? 'Sign Up' : 'Login'}
            </button>
        </div>
    );
};

export default Auth;
