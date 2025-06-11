// Header.jsx - Modern header component
import React from 'react'

/**
 * Header Component
 * Think of this as the "welcome sign" at the entrance of our app
 * It shows the brand and sets the tone for the entire experience
 */
function Header() {
  return (
    <header className="modern-header">
      <div className="header-content">
        {/* Logo section - like a business sign */}
        <div className="logo-section">
          <div className="logo-icon">🏝️</div>
          <h1>Kho Tao Stays</h1>
        </div>
        
        {/* Subtitle with marketing message */}
        <div className="header-subtitle">
          Decentralized Comparison,<br />
          <span className="gradient-text">Limitless Possibilities</span>
        </div>
      </div>
    </header>
  )
}

export default Header