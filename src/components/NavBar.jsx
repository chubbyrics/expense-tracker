import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { useAuth } from '../context/AuthContext';
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const navigate = useNavigate();
  const { 
    currentUser, 
    isAuthenticated, 
    logout,
    loading 
  } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        await logout();
        navigate("/");
        setIsMobileMenuOpen(false); // Close menu after logout
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    if (windowWidth <= 992) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 992) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return <div className="navbar-loading">Loading...</div>;
  }

  return (
    <nav className="navbar light">
      <div className="navbar-container">
        <NavLink to="/" className="logo" onClick={closeMobileMenu}>
          Expense<span>Tracker</span>
        </NavLink>

        {/* Hamburger Menu Button - Mobile Only */}
        <button 
          className="hamburger-menu mobile-only" 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <ul className={`nav-list ${isMobileMenuOpen ? "active" : ""}`}>
          <li>
            <NavLink 
              to="/" 
              end 
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={closeMobileMenu}
            >
              Home
            </NavLink>
          </li>

          {!isAuthenticated ? (
            <>
              <li>
                <NavLink 
                  to="/signup" 
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink 
                  to="/dashboard" 
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/add" 
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  Add Expense
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/view" 
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  View Expenses
                </NavLink>
              </li>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="logout-btn"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;