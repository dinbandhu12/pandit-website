import { Link } from 'react-router-dom'
import { Home, Settings, LogOut } from 'lucide-react'

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-primary-600" />
            <span className="text-xl font-semibold text-gray-900">Blog</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/blog-posts-admin" 
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  <Settings className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/blog-posts-admin" 
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 