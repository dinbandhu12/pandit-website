import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import PostEditor from './pages/PostEditor';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/post/:id" element={<BlogPost />} />
            <Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <AdminPanel />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/blog-posts-admin" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <AdminPanel />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/edit/:id" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <PostEditor />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/new" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <PostEditor />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
