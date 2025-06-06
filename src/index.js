import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './firebase/AuthContext'; // ✅ Wrap with this

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);



