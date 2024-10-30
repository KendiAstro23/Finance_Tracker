// src/components/Auth.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import './Auth.css'; // Make sure you import your CSS file

const Auth = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                setIsAuthenticated(true);
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                setIsAuthenticated(true);
            } catch (error) {
                console.error(error);
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
