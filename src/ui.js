// ui.js - Modern UI management with sleek interactions

import { 
  accommodations, 
  calculateRates, 
  formatCurrency, 
  findBestValue, 
  addAccommodation, 
  deleteAccommodation,
  EXCHANGE_RATE 
} from './accommodation.js';

/**
 * Render the accommodation table with modern animations
 * Think of this like updating a high-tech display board - 
 * smooth, fast, and visually appealing
 */
export function renderTable() {
  const tbody = document.getElementById('tableBody');
  
  // Add loading state for smooth transitions
  tbody.classList.add('loading');
  
  // Clear with a slight delay for smooth animation
  setTimeout(() => {
    tbody.innerHTML = '';
    tbody.classList.remove('loading');
    
    const bestValueIndex = findBestValue();
    
    accommodations.forEach((acc, index) => {
      const rates = calculateRates(acc.totalPrice, acc.currency, acc.totalDays);
      const row = document.createElement('tr');
      
      // Highlight the best deal with modern styling
      if (index === bestValueIndex) {
        row.classList.add('best-value');
      }
      
      // Add entrance animation
      row.style.opacity = '0';
      row.style.transform = 'translateY(20px)';
      
      // Build the table row with modern design elements
      row.innerHTML = `
        <td class="property-name">
          <div class="property-name-wrapper">
            <span class="property-icon">🏨</span>
            ${acc.name}
          </div>
        </td>
        <td>
          <span class="duration-badge">${acc.totalDays} day${acc.totalDays > 1 ? 's' : ''}</span>
        </td>
        <td class="price-column">${formatCurrency(rates.dailyRateTHB, 'THB')}/day</td>
        <td class="price-column">${formatCurrency(rates.dailyRateEUR, 'EUR')}/day</td>
        <td class="price-column">${formatCurrency(rates.totalPriceTHB, 'THB')}</td>
        <td class="price-column">${formatCurrency(rates.totalPriceEUR, 'EUR')}</td>
        <td class="price-column">
          <strong>${formatCurrency(rates.total28DaysTHB, 'THB')}</strong>
        </td>
        <td class="price-column">
          <strong>${formatCurrency(rates.total28DaysEUR, 'EUR')}</strong>
        </td>
        <td>
          <span class="notes-text">${acc.notes || '—'}</span>
        </td>
        <td>
          <button class="delete-btn modern-delete-btn" onclick="window.handleDelete(${index})" title="Delete accommodation">
            🗑️
          </button>
        </td>
      `;
      
      tbody.appendChild(row);
      
      // Animate row entrance
      setTimeout(() => {
        row.style.transition = 'all 0.4s ease';
        row.style.opacity = '1';
        row.style.transform = 'translateY(0)';
      }, index * 100); // Stagger the animations
    });
  }, 150);
}

/**
 * Handle adding a new accommodation with modern validation and feedback
 */
export function handleAddAccommodation() {
  const button = document.getElementById('addBtn');
  const form = document.querySelector('.modern-form');
  
  // Get form values
  const name = document.getElementById('propertyName').value.trim();
  const totalPrice = parseFloat(document.getElementById('totalPrice').value);
  const currency = document.getElementById('currency').value;
  const totalDays = parseInt(document.getElementById('totalDays').value);
  const notes = document.getElementById('notes').value.trim() || '';
  
  // Modern validation with visual feedback
  if (!validateForm(name, totalPrice, totalDays)) {
    return;
  }
  
  try {
    // Add loading state to button
    button.disabled = true;
    button.innerHTML = '<span class="button-icon">⏳</span>Adding...';
    button.style.background = 'rgba(59, 130, 246, 0.6)';
    
    // Simulate async operation for smooth UX
    setTimeout(() => {
      addAccommodation(name, totalPrice, currency, totalDays, notes);
      
      // Success feedback
      button.innerHTML = '<span class="button-icon">✅</span>Added!';
      button.classList.add('success-animation');
      form.classList.add('success-animation');
      
      // Clear form and reset button
      setTimeout(() => {
        clearForm();
        renderTable();
        resetButton(button);
        form.classList.remove('success-animation');
      }, 1000);
      
    }, 300);
    
  } catch (error) {
    // Error feedback
    button.innerHTML = '<span class="button-icon">❌</span>Error';
    button.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
    
    showErrorMessage(error.message);
    
    setTimeout(() => resetButton(button), 2000);
  }
}

/**
 * Modern form validation with visual feedback
 */
function validateForm(name, totalPrice, totalDays) {
  const errors = [];
  
  if (!name) {
    highlightError('propertyName', 'Property name is required');
    errors.push('name');
  }
  
  if (!totalPrice || totalPrice <= 0) {
    highlightError('totalPrice', 'Please enter a valid price');
    errors.push('price');
  }
  
  if (!totalDays || totalDays <= 0) {
    highlightError('totalDays', 'Please enter valid number of days');
    errors.push('days');
  }
  
  return errors.length === 0;
}

/**
 * Highlight form errors with modern styling
 */
function highlightError(inputId, message) {
  const input = document.getElementById(inputId);
  const inputGroup = input.closest('.input-group');
  
  input.style.borderColor = '#ef4444';
  input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
  
  // Remove error styling after user starts typing
  input.addEventListener('input', function() {
    input.style.borderColor = '';
    input.style.boxShadow = '';
  }, { once: true });
  
  // Shake animation for attention
  inputGroup.style.animation = 'shake 0.5s ease-in-out';
  setTimeout(() => {
    inputGroup.style.animation = '';
  }, 500);
}

/**
 * Show error message with modern toast notification
 */
function showErrorMessage(message) {
  // Create toast notification
  const toast = document.createElement('div');
  toast.className = 'error-toast';
  toast.innerHTML = `
    <span class="toast-icon">⚠️</span>
    <span class="toast-message">${message}</span>
  `;
  
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => toast.classList.add('show'), 100);
  
  // Remove after delay
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
}

/**
 * Reset button to original state
 */
function resetButton(button) {
  button.disabled = false;
  button.innerHTML = '<span class="button-icon">+</span>Add Accommodation';
  button.style.background = '';
  button.classList.remove('success-animation');
}

/**
 * Clear form with smooth animations
 */
function clearForm() {
  const inputs = document.querySelectorAll('.modern-form input, .modern-form select');
  inputs.forEach((input, index) => {
    setTimeout(() => {
      input.style.transform = 'scale(0.95)';
      input.style.opacity = '0.7';
      
      setTimeout(() => {
        input.value = '';
        input.style.transform = 'scale(1)';
        input.style.opacity = '1';
      }, 100);
    }, index * 50);
  });
}

/**
 * Handle deleting accommodation with modern confirmation
 */
export function handleDeleteAccommodation(index) {
  const accommodation = accommodations[index];
  
  // Modern confirmation dialog
  if (showModernConfirm(`Delete "${accommodation.name}"?`, 'This action cannot be undone.')) {
    // Add delete animation
    const row = document.querySelector(`#accommodationTable tbody tr:nth-child(${index + 1})`);
    if (row) {
      row.style.transform = 'translateX(-100%)';
      row.style.opacity = '0';
      
      setTimeout(() => {
        deleteAccommodation(index);
        renderTable();
      }, 300);
    } else {
      deleteAccommodation(index);
      renderTable();
    }
  }
}

/**
 * Modern confirmation dialog (could be enhanced with a custom modal)
 */
function showModernConfirm(title, message) {
  return confirm(`${title}\n\n${message}`);
}

/**
 * Initialize event listeners with modern enhancements
 */
export function initializeEventListeners() {
  // Update exchange rate with animation
  const exchangeRateElement = document.getElementById('exchangeRate');
  exchangeRateElement.textContent = EXCHANGE_RATE;
  
  // Add subtle animation to exchange rate
  setInterval(() => {
    exchangeRateElement.style.transform = 'scale(1.05)';
    setTimeout(() => {
      exchangeRateElement.style.transform = 'scale(1)';
    }, 200);
  }, 30000); // Pulse every 30 seconds
  
  // Connect add button with enhanced feedback
  const addBtn = document.getElementById('addBtn');
  addBtn.addEventListener('click', handleAddAccommodation);
  
  // Enhanced Enter key support
  const inputs = document.querySelectorAll('input, select');
  inputs.forEach(input => {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleAddAccommodation();
      }
    });
    
    // Add focus animations
    input.addEventListener('focus', function() {
      this.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
      this.style.transform = 'scale(1)';
    });
  });
  
  // Make delete function globally available
  window.handleDelete = handleDeleteAccommodation;
  
  // Add smooth scrolling to table
  const tableContainer = document.querySelector('.table-container');
  if (tableContainer) {
    tableContainer.style.scrollBehavior = 'smooth';
  }
  
  // Initialize page with welcome animation
  setTimeout(() => {
    document.querySelector('.main-card').style.animation = 'slideInUp 0.8s ease-out';
  }, 100);
}