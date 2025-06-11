// AccommodationContext.jsx - Centralized state management

import React, { createContext, useContext, useState } from 'react'

// Exchange rate constant - like a currency calculator
export const EXCHANGE_RATE = 37.65 // EUR to THB

/**
 * React Context for managing accommodation data
 * Think of this as a "shared bulletin board" where all components
 * can post and read accommodation information
 */
const AccommodationContext = createContext()

// Custom hook to use the accommodation context
// Like having a special key to access our shared bulletin board
export const useAccommodations = () => {
  const context = useContext(AccommodationContext)
  if (!context) {
    throw new Error('useAccommodations must be used within an AccommodationProvider')
  }
  return context
}

/**
 * Calculate all the rates and prices for an accommodation
 * Think of this like a currency calculator that also figures out daily costs
 */
export function calculateRates(totalPrice, currency, totalDays) {
  let dailyRateEUR, dailyRateTHB, totalPriceEUR, totalPriceTHB
  
  // It's like converting money at an airport exchange counter
  if (currency === "EUR") {
    // If the price is in Euros, calculate THB equivalent
    dailyRateEUR = totalPrice / totalDays
    dailyRateTHB = dailyRateEUR * EXCHANGE_RATE
    totalPriceEUR = totalPrice
    totalPriceTHB = totalPrice * EXCHANGE_RATE
  } else { // THB
    // If the price is in Thai Baht, calculate EUR equivalent
    dailyRateTHB = totalPrice / totalDays
    dailyRateEUR = dailyRateTHB / EXCHANGE_RATE
    totalPriceTHB = totalPrice
    totalPriceEUR = totalPrice / EXCHANGE_RATE
  }
  
  // Calculate what it would cost for a standard 28-day month
  // Like asking "If I stayed here for a whole month, what would it cost?"
  const total28DaysTHB = dailyRateTHB * 28
  const total28DaysEUR = dailyRateEUR * 28
  
  return {
    dailyRateEUR,
    dailyRateTHB,
    totalPriceEUR,
    totalPriceTHB,
    total28DaysTHB,
    total28DaysEUR
  }
}

/**
 * Format currency amounts nicely for display
 * Like having a cashier that always gives you a neat receipt
 */
export function formatCurrency(amount, currency) {
  if (currency === "THB") {
    return "฿" + amount.toLocaleString('en-US', {
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0
    })
  } else {
    return "€" + amount.toLocaleString('en-US', {
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2
    })
  }
}

/**
 * AccommodationProvider Component
 * Think of this as the "manager" of our shared bulletin board
 * It provides all the data and functions to modify that data
 */
export function AccommodationProvider({ children }) {
  // Initial sample data - like having some example rental listings already posted
  const [accommodations, setAccommodations] = useState([
    {
      id: 1,
      name: "Current Place",
      totalPrice: 67,
      currency: "EUR",
      totalDays: 9,
      notes: "Current accommodation"
    },
    {
      id: 2,
      name: "Kho Tao Heights",
      totalPrice: 1500,
      currency: "THB",
      totalDays: 1,
      notes: "Daily rate option"
    }
  ])

  /**
   * Add a new accommodation to our list
   * Like adding a new rental option to your comparison spreadsheet
   */
  const addAccommodation = (accommodationData) => {
    const newAccommodation = {
      id: Date.now(), // Simple ID generation - like giving each listing a unique reference number
      ...accommodationData
    }
    setAccommodations(prev => [...prev, newAccommodation])
  }

  /**
   * Remove an accommodation from our list
   * Like crossing out a rental option you don't want anymore
   */
  const deleteAccommodation = (id) => {
    setAccommodations(prev => prev.filter(acc => acc.id !== id))
  }

  /**
   * Find which accommodation gives you the best deal for 28 days
   * Like a smart shopper comparing prices at different stores
   */
  const findBestValue = () => {
    let bestValue = null
    let lowestCost = Infinity // Start with "infinitely expensive"
    
    accommodations.forEach((acc) => {
      const rates = calculateRates(acc.totalPrice, acc.currency, acc.totalDays)
      // If this place costs less for 28 days, it's our new winner
      if (rates.total28DaysEUR < lowestCost) {
        lowestCost = rates.total28DaysEUR
        bestValue = acc.id
      }
    })
    
    return bestValue
  }

  // Package up all our data and functions to share with components
  const value = {
    accommodations,
    addAccommodation,
    deleteAccommodation,
    findBestValue,
    calculateRates,
    formatCurrency,
    EXCHANGE_RATE
  }

  return (
    <AccommodationContext.Provider value={value}>
      {children}
    </AccommodationContext.Provider>
  )
}