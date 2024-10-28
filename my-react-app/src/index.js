import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';  // This is needed

// Remove reportWebVitals if not used
// import reportWebVitals from './reportWebVitals';

// Render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you do not use reportWebVitals, remove this
// reportWebVitals();
