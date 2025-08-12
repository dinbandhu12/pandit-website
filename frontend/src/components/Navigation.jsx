import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Phone, Menu, X } from 'lucide-react'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-saffron to-sacred-red rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">🕉️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-saffron to-sacred-red bg-clip-text text-transparent">
                Hindi North Indian Pandits
              </h1>
              <p className="text-xs text-gray-500">Bangalore</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-saffron transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className="text-gray-700 hover:text-saffron transition-colors duration-200 font-medium"
            >
              Services
            </Link>
            <Link 
              to="/blog" 
              className="text-gray-700 hover:text-saffron transition-colors duration-200 font-medium"
            >
              Blog
            </Link>
            <Link 
              to="/gallery" 
              className="text-gray-700 hover:text-saffron transition-colors duration-200 font-medium"
            >
              Gallery
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-saffron transition-colors duration-200 font-medium"
            >
              Contact
            </Link>
            
            {/* Contact Button */}
            <Button 
              className="bg-gradient-to-r from-saffron to-sacred-red hover:opacity-90 text-white shadow-lg"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-gray-700 hover:text-saffron"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-saffron transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className="text-gray-700 hover:text-saffron transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/blog" 
                className="text-gray-700 hover:text-saffron transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/gallery" 
                className="text-gray-700 hover:text-saffron transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-saffron transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              <div className="px-4 pt-2">
                <Button 
                  className="w-full bg-gradient-to-r from-saffron to-sacred-red hover:opacity-90 text-white shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
