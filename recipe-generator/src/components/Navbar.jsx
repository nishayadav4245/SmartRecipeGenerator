import React, { useState } from 'react'
import { Home, Bookmark, Menu, X } from 'lucide-react'

const Navbar = ({ onNavigation, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavigation = (view) => {
    onNavigation(view)
    setIsMenuOpen(false) // Close mobile menu when navigating
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <Home className="navbar-icon" />
            <span className="navbar-title">Smart Recipe Generator</span>
          </div>

          <div className="navbar-menu">
            <button 
              className={`navbar-link ${currentView === 'home' ? 'active' : ''}`}
              onClick={() => handleNavigation('home')}
            >
              <Home className="navbar-link-icon" />
              Home
            </button>
            <button 
              className={`navbar-link ${currentView === 'saved' ? 'active' : ''}`}
              onClick={() => handleNavigation('saved')}
            >
              <Bookmark className="navbar-link-icon" />
              Saved Recipes
            </button>
          </div>



          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <button 
              className={`mobile-menu-link ${currentView === 'home' ? 'active' : ''}`}
              onClick={() => handleNavigation('home')}
            >
              <Home className="mobile-menu-icon" />
              Home
            </button>
            <button 
              className={`mobile-menu-link ${currentView === 'saved' ? 'active' : ''}`}
              onClick={() => handleNavigation('saved')}
            >
              <Bookmark className="mobile-menu-icon" />
              Saved Recipes
            </button>

          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar
