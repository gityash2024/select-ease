import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';
import AuthContext from '../context/AuthContext';
import gsap from 'gsap';
import './Auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const { setIsLoading, setAuthState } = useContext(AuthContext);
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
    document.title = 'Sign Up | Select Ease';
    
    const tl = gsap.timeline();
    tl.fromTo('.auth-content', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
    tl.fromTo('.auth-form', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
    tl.fromTo('.auth-illustration', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6 }, "-=0.4");
    
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
    
    return () => {
      tl.kill();
    };
  }, [navigate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.username || !formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await authAPI.signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        is_vendor: formData.isVendor,
        is_admin: false
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      if (setAuthState) {
        setAuthState({
          isAuthenticated: true,
          user: response.data.user
        });
      }
      
      toast.success('Account created successfully!');
      
      gsap.to('.auth-container', {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          navigate('/');
        }
      });
      
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <img src="/assets/ai.png" alt="AI Background" className="bg-image" />
      </div>
      
      <div className="auth-header">
        <div className="auth-logo">LOGO</div>
        <div className="auth-nav">
          <a href="/" className="auth-nav-link">Home</a>
          <a href="/about-us" className="auth-nav-link">About us</a>
          <Link to="/login" className="auth-signup-btn">Sign in</Link>
        </div>
      </div>
      
      <div className="auth-main signup-main centered-auth">
        <div className="auth-content signup-content">
          <div className="auth-user-icon">
            <svg viewBox="0 0 24 24" width="40" height="40" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <h1 className="auth-title">Create Account</h1>
          
          <form className="auth-form signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                placeholder="Username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  autoComplete="given-name"
                  required
                />
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  autoComplete="family-name"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <input 
                type="email" 
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            
            <div className="form-group">
              <input 
                type="password" 
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
            
            <div className="form-group">
              <input 
                type="password" 
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
            
            <div className="form-check">
              <label className="vendor-checkbox">
                <input 
                  type="checkbox"
                  checked={formData.isVendor}
                  onChange={(e) => handleInputChange('isVendor', e.target.checked)}
                />
                <span className="checkbox-text">I want to register as a vendor</span>
              </label>
            </div>
            
            <button type="submit" className="login-btn">
              SIGN UP
            </button>
          </form>
          
          <div className="auth-redirect">
            <p>
              Already have an account? 
              <Link to="/login" className="auth-link">Sign In</Link>
            </p>
          </div>
        </div>
        
        <div className="auth-illustration">
          <div className="illustration-elements">
            <div className="illustration-mobile">
              <div className="mobile-screen">
                <div className="mobile-header"></div>
                <div className="mobile-user-icon"></div>
                <div className="mobile-form-1"></div>
                <div className="mobile-form-2"></div>
                <div className="mobile-btn"></div>
              </div>
            </div>
            <div className="illustration-leaf illustration-leaf-1"></div>
            <div className="illustration-leaf illustration-leaf-2"></div>
            <div className="illustration-circle illustration-circle-1"></div>
            <div className="illustration-circle illustration-circle-2"></div>
            <div className="illustration-circle illustration-circle-3"></div>
            <div className="illustration-plus illustration-plus-1"></div>
            <div className="illustration-plus illustration-plus-2"></div>
            <div className="illustration-lock"></div>
            <div className="illustration-person signup-person">
              <div className="person-body"></div>
              <div className="person-head"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;