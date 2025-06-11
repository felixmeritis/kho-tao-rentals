// InfoSection.jsx - Informational section component
import React from 'react'

/**
 * InfoSection Component
 * Think of this as a "helpful tips" section, like having a travel guide
 * that explains how to use the comparison tool effectively
 */
function InfoSection() {
  return (
    <div className="info-section">
      <div className="info-card">
        {/* Info icon - like a lightbulb moment */}
        <div className="info-icon">💡</div>
        
        {/* Info content */}
        <div className="info-content">
          <h4>Smart Comparison</h4>
          <p>
            All calculations are automated. The best value for 28-day stays is highlighted 
            for easy comparison. Currency conversion happens automatically using current rates.
          </p>
        </div>
      </div>
    </div>
  )
}

export default InfoSection