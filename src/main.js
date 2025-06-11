// main.js - Main application entry point
import './style.css';
import { renderTable, initializeEventListeners } from './ui.js';

/**
 * Initialize the application when the page loads
 * Think of this as the "startup sequence" for your app
 * Like turning on all the systems in a car when you start it
 */
function initializeApp() {
  // Set up all the button clicks and form submissions
  initializeEventListeners();

  // Show the initial data in the table
  renderTable();
}

// Wait for the page to fully load before starting
// Like waiting for all the ingredients to be ready before cooking
document.addEventListener('DOMContentLoaded', initializeApp);
