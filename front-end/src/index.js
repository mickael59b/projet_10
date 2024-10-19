// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './assets/css/main.css'; // Si tu as un fichier CSS global

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
