import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import footerLogo from '../assets/navbar.svg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const navigate = useNavigate();

  const handleDisabledLink = (e) => {
    e.preventDefault();
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={footerLogo} alt="Select Ease" />
        </Link>

        <div className="nav-links">
   
          <Link to="/testimonials" className="nav-link">About Us</Link>

          <Link to="/school" className="nav-link">Categories</Link>

          <Link to="/products" className="nav-link">Add a Product</Link>
          <Link to="/reviews" className="nav-link">Write a Review</Link>
          <Link to="/blogs" className="nav-link">Blog</Link>
        </div>

        <div className="nav-actions">
          <div className="search-box">
            <input type="text" placeholder="Search..." />
          </div>
          <button onClick={() => navigate('/contact')} className="contact-btn">Contact Us</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
