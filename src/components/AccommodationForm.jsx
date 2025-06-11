// AccommodationForm.jsx - Form for adding new accommodations
import React, { useState } from 'react'
import { useAccommodations } from '../context/AccommodationContext'

/**
 * AccommodationForm Component
 * Think of this as a "rental application form" that guests fill out
 * It collects all the information we need to compare accommodations
 */
function AccommodationForm() {
  // Get the addAccommodation function from our context
  // Like having access to add entries to our shared notebook
  const { addAccommodation } = useAccommodations()

  // Form state - like having a draft form that we fill out before submitting
  const [formData, setFormData] = useState({
    name: '',
    totalPrice: '',
    currency: 'EUR',
    totalDays: '',
    notes: ''
  })

  // Button state for visual feedback
  const [buttonState, setButtonState] = useState({
    text: 'Add Accommodation',
    icon: '+',
    disabled: false,
    className: ''
  })

  /**
   * Handle input changes
   * Like updating your draft form as you type
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear any error styling when user starts typing
    e.target.style.borderColor = ''
    e.target.style.boxShadow = ''
  }

  /**
   * Validate form data
   * Like double-checking your application before submitting
   */
  const validateForm = () => {
    const errors = []
    
    if (!formData.name.trim()) {
      highlightError('propertyName', 'Property name is required')
      errors.push('name')
    }
    
    const price = parseFloat(formData.totalPrice)
    if (!price || price <= 0) {
      highlightError('totalPrice', 'Please enter a valid price')
      errors.push('price')
    }
    
    const days = parseInt(formData.totalDays)
    if (!days || days <= 0) {
      highlightError('totalDays', 'Please enter valid number of days')
      errors.push('days')
    }
    
    return errors.length === 0
  }

  /**
   * Highlight form errors with modern styling
   * Like a helpful assistant pointing out mistakes
   */
  const highlightError = (inputId, message) => {
    const input = document.getElementById(inputId)
    if (input) {
      input.style.borderColor = '#ef4444'
      input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)'
      
      // Shake animation for attention
      const inputGroup = input.closest('.input-group')
      if (inputGroup) {
        inputGroup.style.animation = 'shake 0.5s ease-in-out'
        setTimeout(() => {
          inputGroup.style.animation = ''
        }, 500)
      }
    }
  }

  /**
   * Show success feedback with smooth animations
   * Like celebrating when you successfully submit a form
   */
  const showSuccess = () => {
    setButtonState({
      text: 'Added!',
      icon: '✅',
      disabled: true,
      className: 'success-animation'
    })

    // Reset form
    setTimeout(() => {
      setFormData({
        name: '',
        totalPrice: '',
        currency: 'EUR',
        totalDays: '',
        notes: ''
      })
      
      setButtonState({
        text: 'Add Accommodation',
        icon: '+',
        disabled: false,
        className: ''
      })
    }, 1000)
  }

  /**
   * Handle form submission
   * Like processing a completed rental application
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      // Show loading state
      setButtonState({
        text: 'Adding...',
        icon: '⏳',
        disabled: true,
        className: ''
      })

      // Simulate async operation for smooth UX
      setTimeout(() => {
        addAccommodation({
          name: formData.name.trim(),
          totalPrice: parseFloat(formData.totalPrice),
          currency: formData.currency,
          totalDays: parseInt(formData.totalDays),
          notes: formData.notes.trim()
        })

        showSuccess()
      }, 300)

    } catch (error) {
      // Error feedback
      setButtonState({
        text: 'Error',
        icon: '❌',
        disabled: true,
        className: ''
      })

      setTimeout(() => {
        setButtonState({
          text: 'Add Accommodation',
          icon: '+',
          disabled: false,
          className: ''
        })
      }, 2000)
    }
  }

  /**
   * Handle Enter key submission
   * Like allowing users to quickly submit with keyboard
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <div className="add-section">
      <div className="section-header">
        <h3>✨ Add New Accommodation</h3>
        <p className="section-subtitle">Compare prices and find your perfect stay</p>
      </div>
      
      <form className="modern-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Property Name Input */}
          <div className="input-group">
            <label htmlFor="propertyName">Property Name</label>
            <input
              type="text"
              id="propertyName"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter property name"
              required
            />
          </div>
          
          {/* Total Price Input */}
          <div className="input-group">
            <label htmlFor="totalPrice">Total Price</label>
            <input
              type="number"
              id="totalPrice"
              name="totalPrice"
              value={formData.totalPrice}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>
          
          {/* Currency Selection */}
          <div className="input-group">
            <label htmlFor="currency">Currency</label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              className="modern-select"
            >
              <option value="EUR">EUR (€)</option>
              <option value="THB">THB (฿)</option>
            </select>
          </div>
          
          {/* Stay Duration Input */}
          <div className="input-group">
            <label htmlFor="totalDays">Stay Duration</label>
            <input
              type="number"
              id="totalDays"
              name="totalDays"
              value={formData.totalDays}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Days"
              min="1"
              required
            />
          </div>
          
          {/* Notes Input */}
          <div className="input-group full-width">
            <label htmlFor="notes">Notes (Optional)</label>
            <input
              type="text"
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Add any additional notes"
            />
          </div>
        </div>
        
        {/* Submit Button */}
        <button 
          type="submit" 
          className={`primary-button ${buttonState.className}`}
          disabled={buttonState.disabled}
        >
          <span className="button-icon">{buttonState.icon}</span>
          {buttonState.text}
        </button>
      </form>
    </div>
  )
}

export default AccommodationForm