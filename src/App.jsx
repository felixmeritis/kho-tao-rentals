// App.jsx - Main application component
import React from 'react'
import Header from './components/Header'
import AccommodationForm from './components/AccommodationForm'
import AccommodationTable from './components/AccommodationTable'
import InfoSection from './components/InfoSection'
import { AccommodationProvider } from './context/AccommodationContext'

/**
 * Main App Component
 * Think of this as the "floor plan" of our house
 * It arranges all the rooms (components) in the right order
 */
function App() {
  return (
    <AccommodationProvider>
      <div id="app">
        {/* Modern Header - like the entrance of our house */}
        <Header />

        {/* Main Content Card - the main living area moved to the left */}
        <div className='w-full flex justify-start bg-red'>
          <div className="main-card max-w-2xl">
            <div className="card-content">
              {/* Form Section - where users input new accommodations */}
              <AccommodationForm />
          
              {/* Table Section - where we display and compare accommodations */}
              <AccommodationTable />
          
              {/* Info Section - helpful tips and information */}
              <InfoSection />
            </div>
          </div>
        </div>
      </div>
    </AccommodationProvider>
  )
}
