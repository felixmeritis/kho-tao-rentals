// accommodation.js - Accommodation data management and calculations

export const EXCHANGE_RATE = 37.65; // EUR to THB

// Think of this as our "storage box" for all accommodation data
// Like keeping rental brochures organized in a filing cabinet
export let accommodations = [
  {
    name: "Current Place",
    totalPrice: 67,
    currency: "EUR",
    totalDays: 9,
    notes: "Current accommodation"
  },
  {
    name: "Kho Tao Heights",
    totalPrice: 1500,
    currency: "THB",
    totalDays: 1,
    notes: "Daily rate option"
  }
];

/**
 * Calculate all the rates and prices for an accommodation
 * Think of this like a currency calculator that also figures out daily costs
 * 
 * @param {number} totalPrice - The total price you pay
 * @param {string} currency - Either "EUR" or "THB"
 * @param {number} totalDays - How many days the price covers
 * @returns {object} All the calculated rates and totals
 */
export function calculateRates(totalPrice, currency, totalDays) {
  let dailyRateEUR, dailyRateTHB, totalPriceEUR, totalPriceTHB;
  
  // It's like converting money at an airport exchange counter
  if (currency === "EUR") {
    // If the price is in Euros, calculate THB equivalent
    dailyRateEUR = totalPrice / totalDays;
    dailyRateTHB = dailyRateEUR * EXCHANGE_RATE;
    totalPriceEUR = totalPrice;
    totalPriceTHB = totalPrice * EXCHANGE_RATE;
  } else { // THB
    // If the price is in Thai Baht, calculate EUR equivalent
    dailyRateTHB = totalPrice / totalDays;
    dailyRateEUR = dailyRateTHB / EXCHANGE_RATE;
    totalPriceTHB = totalPrice;
    totalPriceEUR = totalPrice / EXCHANGE_RATE;
  }
  
  // Calculate what it would cost for a standard 28-day month
  // Like asking "If I stayed here for a whole month, what would it cost?"
  const total28DaysTHB = dailyRateTHB * 28;
  const total28DaysEUR = dailyRateEUR * 28;
  
  return {
    dailyRateEUR,
    dailyRateTHB,
    totalPriceEUR,
    totalPriceTHB,
    total28DaysTHB,
    total28DaysEUR
  };
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
    });
  } else {
    return "€" + amount.toLocaleString('en-US', {
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2
    });
  }
}

/**
 * Find which accommodation gives you the best deal for 28 days
 * Like a smart shopper comparing prices at different stores
 */
export function findBestValue() {
  let bestValue = null;
  let lowestCost = Infinity; // Start with "infinitely expensive"
  
  accommodations.forEach((acc, index) => {
    const rates = calculateRates(acc.totalPrice, acc.currency, acc.totalDays);
    // If this place costs less for 28 days, it's our new winner
    if (rates.total28DaysEUR < lowestCost) {
      lowestCost = rates.total28DaysEUR;
      bestValue = index;
    }
  });
  
  return bestValue;
}

/**
 * Add a new accommodation to our list
 * Like adding a new rental option to your comparison spreadsheet
 */
export function addAccommodation(name, totalPrice, currency, totalDays, notes = '') {
  if (!name || !totalPrice || !totalDays) {
    throw new Error('Please fill in all required fields');
  }
  
  accommodations.push({
    name,
    totalPrice,
    currency,
    totalDays,
    notes
  });
}

/**
 * Remove an accommodation from our list
 * Like crossing out a rental option you don't want anymore
 */
export function deleteAccommodation(index) {
  if (index >= 0 && index < accommodations.length) {
    accommodations.splice(index, 1);
  }
}