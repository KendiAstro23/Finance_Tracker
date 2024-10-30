// src/components/Auth.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Auth = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true); // State to toggle between login and signup
  const navigate = useNavigate();

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true); // Set the authenticated state to true
      navigate('/dashboard'); // Redirect to the dashboard after successful login
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true); // Set the authenticated state to true
      navigate('/dashboard'); // Redirect to the dashboard after successful signup
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div>
      {/* Toggle between Login and Signup */}
      <div>
        <button onClick={() => setIsLoginMode(true)}>Login</button>
        <button onClick={() => setIsLoginMode(false)}>Sign Up</button>
      </div>

      {/* Login or Signup Form */}
      <form onSubmit={isLoginMode ? handleLogin : handleSignup}>
        <h2>{isLoginMode ? 'Login' : 'Sign Up'}</h2>
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
        <button type="submit">{isLoginMode ? 'Login' : 'Sign Up'}</button>
      </form>
    </div>
  );
};

export default Auth;
