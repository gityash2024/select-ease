import React from 'react';
import footerLogo from '../assets/Header.png';
import './Footer.css';
import { FaFacebook } from 'react-icons/fa';
import { BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs';
import { LiaLinkedin } from 'react-icons/lia';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo and Description Section */}
          <div className="footer-section logo-section">
            <img src={footerLogo} alt="Select ease" className="footer-logo" />
            <p className="footer-description">
              Real Estate Masters Vacant lots, agricultural land, development sites. Real Estate Masters
              Vacant lots, agricultural land, development sites.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section links-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about-us">About Us</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/blogs">Blog</a></li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div className="footer-section contact-section">
            <h3 className="footer-heading">Contact Information</h3>
            <div className="contact-info">
              <p>3891 Ranchview Dr, Richardson,</p>
              <p>California 62639</p>
              <p>hello@example.com</p>
              <p>(239) 555-0108</p>
            </div>
          </div>

          {/* Social Media Links Section */}
          <div className="footer-section social-section">
            <h3 className="footer-heading">Social Media Links</h3>
            <ul className="footer-links">
              <li><a href="https://www.facebook.com/" target="_blank"><FaFacebook /></a></li>
              <li><a href="https://www.twitter.com/" target="_blank"><BsTwitter /></a></li>
              <li><a href="https://www.youtube.com/" target="_blank"><BsYoutube/></a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
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