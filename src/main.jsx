// main.js - React application entry point
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'
/**
 * Initialize the React application
 * Think of this as the "ignition switch" for your React app
 * Like starting the engine that powers everything
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
