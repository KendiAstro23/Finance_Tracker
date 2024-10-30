// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth'; // Optional helper hook

const PrivateRoute = ({ children }) => {
    const [user] = useAuthState(auth); // Hook to get current user

    return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
