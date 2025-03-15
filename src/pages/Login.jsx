import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';
import AuthContext from '../context/AuthContext';
import gsap from 'gsap';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoading, setAuthState } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    document.title = 'Login | Select Ease';
    
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
      const response = await authAPI.login({ 
        email: formData.email, 
        password: formData.password 
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      if (setAuthState) {
        setAuthState({
          isAuthenticated: true,
          user: response.data.user
        });
      }
      
      toast.success('Login successful!');
      
      gsap.to('.auth-container', {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          navigate('/');
        }
      });
      
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed. Please check your credentials.');
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
          <Link to="/signup" className="auth-signup-btn">Sign up</Link>
        </div>
      </div>
      
      <div className="auth-main centered-auth">
        <div className="auth-content">
          <div className="auth-user-icon">
            <svg viewBox="0 0 24 24" width="40" height="40" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <h1 className="auth-title">User Log in</h1>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                placeholder="User ID"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            
            <div className="form-group">
              <input 
                type="password" 
                placeholder="••••••"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            
            <button type="submit" className="login-btn">
              LOGIN
            </button>
          </form>
          
          <div className="auth-redirect">
            <p>
              Don't have an account? 
              <Link to="/signup" className="auth-link">Sign Up</Link>
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
            <div className="illustration-person">
              <div className="person-body"></div>
              <div className="person-head"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;