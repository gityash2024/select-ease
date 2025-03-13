import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, User, LogOut, Settings, UserCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';
import AuthContext from '../context/AuthContext';
import footerLogo from '../assets/navbar.svg';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { setIsLoading, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowLogoutModal(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setShowProfileDropdown(false);
    setShowLogoutModal(false);
    
    if (setAuthState) {
      setAuthState({
        isAuthenticated: false,
        user: null
      });
    }
    
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src={footerLogo} alt="Select Ease" />
          </Link>

          <div className="nav-links">
            <Link to="/about-us" className="nav-link">About Us</Link>
            <Link to="/categories" className="nav-link">Categories</Link>
            <Link to="/products" className="nav-link">Add a Product</Link>
            <Link to="/reviews" className="nav-link">Write a Review</Link>
            <Link to="/blogs" className="nav-link">Blog</Link>
          </div>

          <div className="nav-actions">
            <div className="search-box">
              <input type="text" placeholder="Search..." />
            </div>
            {user ? (
              <div className="profile-section" onMouseEnter={() => setShowProfileDropdown(true)} onMouseLeave={() => setShowProfileDropdown(false)}>
                <button className="profile-btn">
                  <UserCircle size={24} />
                </button>
                {showProfileDropdown && (
                  <div className="profile-dropdown">
                    <div className="profile-header">
                      <UserCircle size={40} />
                      <div className="profile-info">
                        <p className="profile-name">{user.firstName} {user.lastName}</p>
                        <p className="profile-email">{user.email}</p>
                      </div>
                    </div>
                    <div className="profile-menu">
                      <button className="profile-menu-item" onClick={() => setShowLogoutModal(true)}>
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <button onClick={() => navigate('/login')} className="contact-btn-2">
                 Log In / Sign Up                </button>
              </div>
            )}
            <button onClick={() => navigate('/contact')} className="contact-btn">
              Contact Us
            </button>
          </div>
        </div>
      </nav>

      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-content logout-modal" ref={modalRef}>
            <button className="modal-close" onClick={() => setShowLogoutModal(false)}>
              <X size={20} />
            </button>
            <div className="modal-header">
              <h2>Logout Confirmation</h2>
              <p>Are you sure you want to logout from your account?</p>
            </div>
            <div className="logout-actions">
              <button className="cancel-btn" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </button>
              <button className="logout-confirm-btn" onClick={handleLogout}>
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;