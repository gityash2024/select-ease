import React from 'react';
import footerLogo from '../assets/header.svg';
import './Footer.css';
import { FaFacebook } from 'react-icons/fa';
import { BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs';
import { LiaLinkedin } from 'react-icons/lia';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section logo-section">
            <img src={footerLogo} alt="Select ease" className="footer-logo" />
            <p className="footer-description">
              Select Ease helps you make informed decisions with our comprehensive product analyses and reviews.
            </p>
          </div>

          <div className="footer-section links-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about-us">About Us</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/blogs">Blog</a></li>
            </ul>
          </div>

          <div className="footer-section contact-section">
            <h3 className="footer-heading">Contact Information</h3>
            <div className="contact-info">
              <p onClick={() => window.open('tel:+918949299038')} style={{ cursor: 'pointer' }}>+91 89492 99038</p>
            </div>
          </div>

          <div className="footer-section social-section">
            <h3 className="footer-heading"></h3>
            <div className="social-icons">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer"><BsTwitter /></a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><BsInstagram /></a>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"><BsYoutube /></a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><LiaLinkedin /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">Copyright © 2024. All rights reserved.</p>
          <div className="bottom-links">
            <a href="/terms-and-conditions">Terms of Service</a>
            <a href="/privacy-policy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;