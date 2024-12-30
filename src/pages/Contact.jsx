// Contact.jsx
import React, { useState } from 'react';
import './Contact.css';
import hero from '../assets/Hero.png';
import Icon from '../assets/Icon.png';
import Icon1 from '../assets/Icon1.png';
import Icon2 from '../assets/Icon2.png';
import Icon4 from '../assets/Icon3.png';
import map from '../assets/map.png';

const Contact = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      question: "Why should I choose TaskFlow?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      question: "Do I need to change banks?",
      answer: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      question: "How can I order equipment?",
      answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      question: "Do you offer volume discounts?",
      answer: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      question: "How does signing up work?",
      answer: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="contact-page">
      <section className="contact-hero-section">
        <img src={hero} alt="" className="contact-hero-background" />
        <h1>Contact Us</h1>
      </section>

      <div className="contact-content">
        <div className="form-map-container">
          <div className="form-section">
            <h2>Get in Touch</h2>
            <form>
              <div className="input-row">
                <div className="input-group">
                  <label className="input-label">First Name</label>
                  <input type="text" placeholder="First Name" />
                </div>
                <div className="input-group">
                  <label className="input-label">Last Name</label>
                  <input type="text" placeholder="Last Name" />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Email</label>
                <input type="email" placeholder="Email" />
              </div>
              <div className="contact-input-group">
                <label className="input-label">Message</label>
                <textarea placeholder="Message"></textarea>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="map-container">
            <img src={map} alt="Map" className="map-image" />
          </div>
        </div>

        <div className="contact-info">
          <div className="info-card">
            <div className="icon-circle">
              <img src={Icon} alt="Instagram" />
            </div>
            <h3>@FIND YOUR DRESS</h3>
            <p>Follow us on instagram</p>
          </div>
          <div className="info-card">
            <div className="icon-circle">
              <img src={Icon1} alt="Location" />
            </div>
            <h3>ADDRESS</h3>
            <p>2464 Royal Ln. Mesa, New Jersey 45463</p>
          </div>
          <div className="info-card">
            <div className="icon-circle">
              <img src={Icon2} alt="Phone" />
            </div>
            <h3>PHONE</h3>
            <p>310-437-2766</p>
            <p>310-437-2766</p>
          </div>
          <div className="info-card">
            <div className="icon-circle">
              <img src={Icon4} alt="Email" />
            </div>
            <h3>EMAIL</h3>
            <p>hello@example.com</p>
            <p>hello123@example.com</p>
          </div>
        </div>

        <div className="faq-section">
          <div className="faq-content">
            <h2>Frequently Asked Questions</h2>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.!</p>
            <button className="get-started">Get Started</button>
          </div>
          <div className="faq-questions">
            {faqItems.map((item, index) => (
              <div 
                className={`faq-item ${activeIndex === index ? 'active' : ''}`} 
                key={index}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">
                  <span>{item.question}</span>
                  <span className="arrow">▼</span>
                </div>
                <div className="faq-answer">
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;