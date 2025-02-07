import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, User, LogOut, Settings, UserCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';
import AuthContext from '../context/AuthContext';
import footerLogo from '../assets/navbar.svg';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { setIsLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    isVendor: false
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return false;
      }
      if (!formData.username || !formData.firstName || !formData.lastName) {
        toast.error('Please fill in all fields');
        return false;
      }
    }
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = isLogin 
        ? await authAPI.login({ email: formData.email, password: formData.password })
        : await authAPI.signup({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            is_vendor:true,
            is_admin: false
          });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      setShowAuthModal(false);
      toast.success(isLogin ? 'Login successful!' : 'Account created successfully!');
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        isVendor: false
      });
    } catch (error) {
      toast.error(error.response?.data?.error || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setShowProfileDropdown(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const AuthModal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={() => setShowAuthModal(false)}>
          <X size={24} />
        </button>
        <div className="modal-header">
          <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
          <p>{isLogin ? 'Sign in to continue' : 'Register to get started'}</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label>Username</label>
                <input 
                  type="text" 
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter username" 
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First name" 
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last name" 
                  />
                </div>
              </div>
            </>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email" 
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password" 
            />
          </div>
          
          {!isLogin && (
            <>
              <div className="form-group">
                <label>Confirm Password</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm password" 
                />
              </div>
              <div className="checkbox-group">
                <label>
                  <input 
                    type="checkbox"
                    name="isVendor"
                    checked={formData.isVendor}
                    onChange={handleInputChange}
                  />
                  <span>I want to register as a vendor</span>
                </label>
              </div>
            </>
          )}
          
          <button type="submit" className="auth-submit">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              className="toggle-auth" 
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={footerLogo} alt="Select Ease" />
        </Link>

        <div className="nav-links">
          <Link to="/testimonials" className="nav-link">About Us</Link>
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
                  
                    <button className="profile-menu-item" onClick={handleLogout}>
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => setShowAuthModal(true)} className="auth-btn">
              Sign In
            </button>
          )}
          <button onClick={() => navigate('/contact')} className="contact-btn">
            Contact Us
          </button>
        </div>
      </div>
      {showAuthModal && <AuthModal />}
    </nav>
  );
};

export default Navbar;