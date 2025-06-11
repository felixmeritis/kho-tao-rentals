// AccommodationTable.jsx - Table for displaying and comparing accommodations
import React, { useState } from 'react'
import { useAccommodations } from '../context/AccommodationContext'

/**
 * AccommodationTable Component
 * Think of this as a "comparison spreadsheet" that automatically
 * calculates and highlights the best deals for you
 */
function AccommodationTable() {
  // Get data and functions from our context
  const { 
    accommodations, 
    deleteAccommodation, 
    findBestValue, 
    calculateRates, 
    formatCurrency, 
    EXCHANGE_RATE 
  } = useAccommodations()

  // Animation state for smooth loading
  const [isLoading, setIsLoading] = useState(false)

  // Find the best value accommodation ID
  const bestValueId = findBestValue()

  /**
   * Handle deleting accommodation with modern confirmation
   * Like asking "Are you sure?" before removing a rental option
   */
  const handleDelete = (id, name) => {
    // Modern confirmation - in a real app, you might use a custom modal
    if (window.confirm(`Delete "${name}"?\n\nThis action cannot be undone.`)) {
      // Add visual feedback
      setIsLoading(true)
      
      setTimeout(() => {
        deleteAccommodation(id)
        setIsLoading(false)
      }, 300)
    }
  }

  /**
   * Render individual table row
   * Like creating a single line in your comparison spreadsheet
   */
  const renderTableRow = (accommodation, index) => {
    const rates = calculateRates(
      accommodation.totalPrice, 
      accommodation.currency, 
      accommodation.totalDays
    )
    
    const isBestValue = accommodation.id === bestValueId
    
    return (
      <tr 
        key={accommodation.id} 
        className={isBestValue ? 'best-value' : ''}
        style={{
          opacity: isLoading ? '0.7' : '1',
          transform: isLoading ? 'scale(0.98)' : 'scale(1)',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Property Name */}
        <td className="property-name">
          <div className="property-name-wrapper">
            <span className="property-icon">🏨</span>
            {accommodation.name}
          </div>
        </td>
        
        {/* Stay Duration */}
        <td>
          <span className="duration-badge">
            {accommodation.totalDays} day{accommodation.totalDays > 1 ? 's' : ''}
          </span>
        </td>
        
        {/* Daily Rate in THB */}
        <td className="price-column">
          {formatCurrency(rates.dailyRateTHB, 'THB')}/day
        </td>
        
        {/* Daily Rate in EUR */}
        <td className="price-column">
          {formatCurrency(rates.dailyRateEUR, 'EUR')}/day
        </td>
        
        {/* Total in THB */}
        <td className="price-column">
          {formatCurrency(rates.totalPriceTHB, 'THB')}
        </td>
        
        {/* Total in EUR */}
        <td className="price-column">
          {formatCurrency(rates.totalPriceEUR, 'EUR')}
        </td>
        
        {/* 28-Day Total in THB */}
        <td className="price-column">
          <strong>{formatCurrency(rates.total28DaysTHB, 'THB')}</strong>
        </td>
        
        {/* 28-Day Total in EUR */}
        <td className="price-column">
          <strong>{formatCurrency(rates.total28DaysEUR, 'EUR')}</strong>
        </td>
        
        {/* Notes */}
        <td>
          <span className="notes-text">
            {accommodation.notes || '—'}
          </span>
        </td>
        
        {/* Actions */}
        <td>
          <button
            className="delete-btn modern-delete-btn"
            onClick={() => handleDelete(accommodation.id, accommodation.name)}
            title="Delete accommodation"
            aria-label={`Delete ${accommodation.name}`}
          >
            🗑️
          </button>
        </td>
      </tr>
    )
  }

  return (
    <div className="results-section">
      <div className="section-header">
        <h3>📊 Comparison Results</h3>
        
        {/* Exchange Rate Badge */}
        <div className="exchange-rate-badge">
          1 EUR = <span id="exchangeRate">{EXCHANGE_RATE}</span> THB
        </div>
      </div>
      
      <div className="table-wrapper">
        <div className="table-container">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Stay Duration</th>
                <th>Daily Rate (฿)</th>
                <th>Daily Rate (€)</th>
                <th>Total (฿)</th>
                <th>Total (€)</th>
                <th>28-Day Total (฿)</th>
                <th>28-Day Total (€)</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className={isLoading ? 'loading' : ''}>
              {accommodations.length === 0 ? (
                // Empty state - like showing "No results found"
                <tr>
                  <td colSpan="10" style={{ 
                    textAlign: 'center', 
                    padding: '3rem',
                    color: 'var(--text-muted)',
                    fontStyle: 'italic'
                  }}>
                    No accommodations added yet. Use the form above to add your first option! 🏖️
                  </td>
                </tr>
              ) : (
                accommodations.map(renderTableRow)
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AccommodationTable