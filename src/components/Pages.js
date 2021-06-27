import React, { useState } from 'react'
import About from './About'
import Cards from './Cards'
// import Page from './Page';

import HomePage from './HomePage'
import NavBar from './NavBar'

export default function Pages() {
  const [page, setPage] = useState('about') //=> ["about", f(){}]

  function renderPage() {
    switch (page) {
      case 'about':
        return <About />

      case 'cards':
        return <Cards />

      case 'decks':
        return <Decks />

      default:
        return <HomePage />
    }
  }

  return (
    <div>
      <Navbar />
      <div>
        {/* {<Page page={page} />} */}
        {renderPage()}
      </div>
    </div>
  )
}
