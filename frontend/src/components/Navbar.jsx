import { Link, useNavigate } from 'react-router-dom'
import { Home, Settings, LogOut, Phone, Menu, X } from 'lucide-react'
import { useState } from 'react'

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕉️</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">Hindi North Indian Pandits</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className="text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium"
            >
              Services
            </Link>
            <Link 
              to="/gallery" 
              className="text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium"
            >
              Gallery
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium"
            >
              Contact
            </Link>
            
            {/* Contact Button */}
            <a 
              href="tel:+919102416476"
              className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">Call Now</span>
            </a>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/admin" 
                  className="flex items-center space-x-1 text-gray-600 hover:text-orange-600 transition-colors duration-200"
                >
                  <Settings className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/admin/login" 
                className="text-gray-600 hover:text-orange-600 transition-colors duration-200"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-orange-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className="text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/gallery" 
                className="text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              <a 
                href="tel:+919102416476"
                className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">Call Now</span>
              </a>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/admin" 
                    className="flex items-center space-x-1 text-gray-600 hover:text-orange-600 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link 
                  to="/admin/login" 
                  className="text-gray-600 hover:text-orange-600 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 