import React, { useState, useEffect, useRef } from 'react';
import maintain from '../assets/maintain.png';
import list from '../assets/list.png';
import create from '../assets/create.png';
import booster from '../assets/booster.png';
import machine from '../assets/machine.png';
import aidata from '../assets/aidata.png';
import active from '../assets/active.png';
import HappyClients from '../assets/HappyClients.png';
import data from '../assets/data.png';
import hero from '../assets/Hero.png';
import './Vender.css';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Vendor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    organization: '',
    phone: '',
    website: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    // Fix focus issue for input fields in vendor form
    const fixFocusIssue = () => {
      const inputs = document.querySelectorAll('input');
      inputs.forEach(input => {
        input.addEventListener('blur', (e) => {
          // Force document body to get focus after input loses focus
          // This prevents the focus from getting "stuck" between fields
          setTimeout(() => {
            const activeEl = document.activeElement;
            if (activeEl && activeEl.tagName === 'INPUT') {
              // Another input was focused, do nothing
            } else {
              // No input focused, fix the bug
              document.body.focus();
            }
          }, 50);
        });
      });
    };

    fixFocusIssue();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      setLoading(true);
      
      // Add vendor flag to signup data
      const signupData = {
        ...formData,
        firstName: formData.username.split(' ')[0] || '',
        lastName: formData.username.split(' ')[1] || '',
        is_vendor: true
      };
      
      await authAPI.signup(signupData);
      toast.success('Vendor account created successfully! Please log in.');
      
      // Redirect to login or dashboard
      navigate('/');
      
    } catch (error) {
      console.error('Vendor registration error:', error);
      const errorMessage = error.response?.data?.error || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { number: "40+", text: "Happy Clients", icon: HappyClients },
    { number: "1500+", text: "Software & service categories", icon: list },
    { number: "10M+", text: "Active yearly buyers", icon: active }
  ];
  
  const services = [
    {
      title: "AI Data Analysis",
      description: "Power of Artificial Intelligence to Extract Valuable Insights from Complex Data Sets.",
      icon: aidata
    },
    {
      title: "Machine Learning",
      description: "Empowering Computers to Learn and Improve from Experience Without Explicit Programming.",
      icon: machine
    },
    {
      title: "Data Visualization",
      description: "Transforming Raw Data into Compelling Visual Representations.",
      icon: data
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Create FREE Listing",
      description: "Sign up as a vendor to get started with listing your products on SelectEase.",
      icon: create
    },
    {
      number: "02", 
      title: "List Your Product",
      description: "Add your products with detailed information to showcase them to potential customers.",
      icon: list
    },
    {
      number: "03",
      title: "Maintain Your Listing",
      description: "Keep your product information up-to-date and respond to customer reviews.",
      icon: maintain
    },
    {
      number: "04",
      title: "Boost Exposure with Us.",
      description: "Take advantage of our platform features to increase your product visibility.",
      icon: booster
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="vendor-page">
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img src={hero} alt="" className="hero-background" />
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Vendors
          </motion.h1>
        </div>
      </motion.div>

      <div className="container">
        <div className="main-content">
          <motion.div 
            className="split-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <motion.div 
              className="testimonial"
              variants={itemVariant}
            >
              <h2 className="testimonial-title">Hear From Our Customers</h2>
              <p className="testimonial-subtitle">Discover what our customers have to say about their experience with us!</p>
              
              <motion.div 
                className="review-card"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="quote-mark">"</div>
                <p className="review-text">Every new business and start-up, big or small, goes through the five stages of business growth. These phases include existence, survival, success, take-off, and resource maturity.</p>
                <div className="rating">★★★★★ <span>(1156)</span></div>
                <a href="#" className="read-more">Read More →</a>
              </motion.div>
            </motion.div>

            <motion.div 
              className="signup-form"
              variants={itemVariant}
              ref={formRef}
            >
              <h2 className="form-title">List Your Product - It's Free</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <label>Name*</label>
                    <input 
                      style={{ width: "95%" }}  
                      type="text" 
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Your Name" 
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Business Email*</label>
                    <input 
                      style={{ width: "95%" }} 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="business@gmail.com" 
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>Organization</label>
                    <input 
                      style={{ width: "95%" }} 
                      type="text" 
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Organization" 
                    />
                  </div>
                  <div className="form-field">
                    <label>Phone</label>
                    <input 
                      style={{ width: "95%" }} 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91" 
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>Website</label>
                    <input 
                      style={{ width: "95%" }} 
                      type="url" 
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="selectease.com" 
                    />
                  </div>
                  <div className="form-field">
                    <label>Password*</label>
                    <input 
                      style={{ width: "95%" }} 
                      type="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="********" 
                      required
                    />
                  </div>
                </div>

                <motion.button 
                  type="submit" 
                  className="next-button"
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loading ? 'Registering...' : 'Register as Vendor'}
                </motion.button>

                <div className="form-footer">
                  <p className="terms">By signing up you agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a></p>
                  <p className="login-link">Already have an account? <a href="#" onClick={() => navigate('/products')}>Login</a></p>
                </div>
              </form>
            </motion.div>
          </motion.div>

          <motion.div 
            className="stats-section"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="stat-item"
                variants={itemVariant}
                custom={index}
                whileHover={{ y: -5 }}
              >
                <div className="stat-icon-container">
                  <img src={stat.icon} alt={stat.text} className="stat-icon" />
                </div>
                <h3 className="stat-number">{stat.number}</h3>
                <p className="stat-text">{stat.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="estimate-outer">
        <motion.div 
          className="estimate-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="container">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Request A Free Estimate
            </motion.h2>
            <div className="tab-buttons">
              <button className="tab-button active">Custom Services</button>
              <button className="tab-button">Value Added Services</button>
            </div>

            <motion.div 
              className="services-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {services.map((service, index) => (
                <motion.div 
                  key={index} 
                  className="service-card"
                  variants={itemVariant}
                  custom={index}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                >
                  <div className="service-icon">
                    <img src={service.icon} alt={service.title} />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="container">
        <motion.div 
          className="steps-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            List Your Product & Boost Your Market Presence
          </motion.h2>
          <motion.div 
            className="steps-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="step-card"
                variants={itemVariant}
                custom={index}
                whileHover={{ y: -5 }}
              >
                <div className="step-line"></div>
                <img src={step.icon} alt={step.title} className="step-icon" />
                <h4 className="step-title">{step.title}</h4>
                <p className="step-description">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Vendor;