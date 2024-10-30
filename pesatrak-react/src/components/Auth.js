// src/components/Auth.js
import React, { useState } from 'react';
import { auth } from '../firebase'; // Adjust the path if necessary
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Auth = ({ setIsAuthenticated }) => {
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSignup) {
            // Handle signup
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                setIsAuthenticated(true);
                navigate('/dashboard'); // Redirect to dashboard after signup
            } catch (error) {
                alert(error.message);
            }
        } else {
            // Handle login
            try {
                await signInWithEmailAndPassword(auth, email, password);
                setIsAuthenticated(true);
                navigate('/dashboard'); // Redirect to dashboard after login
            } catch (error) {
                alert(error.message);
            }
        }
    };

    return (
        <div>
            <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
            </form>
            <button onClick={() => setIsSignup(!isSignup)}>
                Switch to {isSignup ? 'Login' : 'Sign Up'}
            </button>
        </div>
    );
};

export default Auth;
