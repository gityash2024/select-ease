import React, { useState } from 'react';
import './Contact.css';
import hero from '../assets/Hero.png';
import map from '../assets/map.png';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactInfoSection = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 40px auto;
  gap: 20px;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InfoCard = styled(motion.div)`
  flex: 1;
  text-align: center;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const IconCircle = styled(motion.div)`
  width: 64px;
  height: 64px;
  background: #026283;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;

  svg {
    color: white;
    width: 28px;
    height: 28px;
  }
`;

const CardTitle = styled.h3`
  margin: 16px 0 8px;
  color: #111827;
  font-size: 18px;
  font-weight: 600;
`;

const CardText = styled.p`
  color: #6B7280;
  font-size: 14px;
  line-height: 1.5;
  margin: 4px 0;
`;

const SuccessToast = ({ message }) => (
  <motion.div 
    className="toast"
    initial={{ x: 100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 100, opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <CheckCircle size={18} />
      <span>{message}</span>
    </div>
  </motion.div>
);

const Contact = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, here you would send data to backend
      console.log('Form submitted:', formData);
      
      // Show success toast using react-hot-toast library
      toast.success('Message sent successfully!');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="contact-page"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <motion.section 
        className="contact-hero-section"
        variants={fadeIn}
      >
        <motion.img 
          src={hero} 
          alt="" 
          className="contact-hero-background"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7 }}
        />
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Contact Us
        </motion.h1>
      </motion.section>

      <motion.div 
        className="contact-content"
        variants={staggerChildren}
      >
        <motion.div 
          className="form-map-container"
          variants={fadeIn}
        >
          <motion.div 
            className="form-section"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2>Get in Touch</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-row">
                <div className="input-group">
                  <label className="input-label">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    placeholder="First Name" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? 'input-error' : ''}
                  />
                  {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                </div>
                <div className="input-group">
                  <label className="input-label">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    placeholder="Last Name" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? 'input-error' : ''}
                  />
                  {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Email</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>
              <div className="contact-input-group">
                <label className="input-label">Message</label>
                <textarea 
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={errors.message ? 'input-error' : ''}
                ></textarea>
                {errors.message && <div className="error-message">{errors.message}</div>}
              </div>
              <div className="submit-button-container">
                <button type="submit">Submit</button>
              </div>
            </form>
          </motion.div>
          <motion.div 
            className="map-container"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <img src={map} alt="Map" className="map-image" />
          </motion.div>
        </motion.div>

        <ContactInfoSection
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          <InfoCard
            variants={fadeIn}
            whileHover={{ y: -8, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
          >
            <IconCircle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
            >
              <Instagram />
            </IconCircle>
            <CardTitle>@FIND YOUR DRESS</CardTitle>
            <CardText>Follow us on instagram</CardText>
          </InfoCard>

          <InfoCard
            variants={fadeIn}
            whileHover={{ y: -8, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
          >
            <IconCircle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
            >
              <MapPin />
            </IconCircle>
            <CardTitle>ADDRESS</CardTitle>
            <CardText>2464 Royal Ln. Mesa, New Jersey 45463</CardText>
          </InfoCard>

          <InfoCard
            variants={fadeIn}
            whileHover={{ y: -8, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
          >
            <IconCircle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
            >
              <Phone />
            </IconCircle>
            <CardTitle>PHONE</CardTitle>
            <CardText>310-437-2766</CardText>
            <CardText>310-437-2766</CardText>
          </InfoCard>

          <InfoCard
            variants={fadeIn}
            whileHover={{ y: -8, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
          >
            <IconCircle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.7 }}
            >
              <Mail />
            </IconCircle>
            <CardTitle>EMAIL</CardTitle>
            <CardText>hello@example.com</CardText>
            <CardText>hello123@example.com</CardText>
          </InfoCard>
        </ContactInfoSection>

        <motion.div 
          className="faq-section"
          variants={fadeIn}
          transition={{ delay: 0.8 }}
        >
          <motion.div 
            className="faq-content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <h2>Frequently Asked Questions</h2>
            <p>Sed ut perspiciatis unde omnis iste natus error <br />sit voluptatem accusantium.</p>
            <motion.button 
              className="get-started"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </motion.div>
          <motion.div 
            className="faq-questions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            {faqItems.map((item, index) => (
              <motion.div 
                className={`faq-item ${activeIndex === index ? 'active' : ''}`} 
                key={index}
                onClick={() => toggleFAQ(index)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1, duration: 0.3 }}
                whileHover={{ boxShadow: "0 4px 8px rgba(0,0,0,0.05)" }}
              >
                <div className="faq-question">
                  <span>{item.question}</span>
                  <motion.span 
                    className="arrow"
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ▼
                  </motion.span>
                </div>
                <motion.div 
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: activeIndex === index ? 'auto' : 0,
                    opacity: activeIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.answer}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Toast container for success messages */}
      <AnimatePresence>
        {showToast && (
          <div className="toast-container">
            <SuccessToast message="Your message has been sent successfully!" />
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Contact;