import React from 'react';
import footerLogo from '../assets/Header.png';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        {/* Logo and Description Section */}
        <div className="footer-main-content">
          <div className="logo-section">
            <img src={footerLogo} alt="Select ease" className="footer-logo" />
            <p className="footer-description">
              Real Estate Masters Vacant lots, agricultural land, development sites. Real Estate Masters 
              Vacant lots, agricultural land, development sites.
            </p>
          </div>

          <div className="vertical-line"></div>

          {/* Quick Links Section */}
          <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about-us">About Us</a></li>
              <li><a href="/properties">Properties</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>

          <div className="vertical-line"></div>

          {/* Contact Information Section */}
          <div className="footer-section">
            <h3 className="footer-heading">Contact Information</h3>
            <div className="contact-info">
              <div className="address-block">
                <p>3659 Ranchview Dr,</p>
                <p>Richardson, California 22639</p>
              </div>
              <div className="contact-details">
                <p className="email">hello@example.com</p>
                <p className="phone">(239) 555-0108</p>
              </div>
            </div>
          </div>

          <div className="vertical-line"></div>

          {/* Social Media Links Section */}
          <div className="footer-section">
            <h3 className="footer-heading">Social Media Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about-us">About Us</a></li>
              <li><a href="/properties">Properties</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="copyright">Copyright © 2024. All rights reserved.</p>
          <div className="bottom-links">
            <a href="/terms">Terms of Service</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;