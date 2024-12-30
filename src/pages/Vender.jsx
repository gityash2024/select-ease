import React from 'react';
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

const Vendor = () => {
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
      description: "Adipiscing bibendum est ultricies integer. Magnis dis parturient montes nascetur ridiculus mus mauris",
      icon: create
    },
    {
      number: "02", 
      title: "List Your Product",
      description: "Adipiscing bibendum est ultricies integer. Magnis dis parturient montes nascetur ridiculus mus mauris",
      icon: list
    },
    {
      number: "03",
      title: "Maintain Your Listing",
      description: "Adipiscing bibendum est ultricies integer. Magnis dis parturient montes nascetur ridiculus mus mauris",
      icon: maintain
    },
    {
      number: "04",
      title: "Boost Exposure with Us.",
      description: "Adipiscing bibendum est ultricies integer. Magnis dis parturient montes nascetur ridiculus mus mauris",
      icon: booster
    }
  ];

  return (
    <div className="vendor-page">
      <div className="hero-section">
        <img src={hero} alt="" className="hero-background" />
        <div className="container">
          <h1>Vendors</h1>
        </div>
      </div>

      <div className="container">
        <div className="main-content">
          <div className="split-section">
            <div className="testimonial">
              <h2 className="testimonial-title">Hear From Our Customers</h2>
              <p className="testimonial-subtitle">Discover what our customers have to say about their experience with us!</p>
              
              <div className="review-card">
                <div className="quote-mark">"</div>
                <p className="review-text">Every new business and start-up, big or small, goes through the five stages of business growth. These phases include existence, survival, success, take-off, and resource maturity.</p>
                <div className="rating">★★★★★ <span>(1156)</span></div>
                <a href="#" className="read-more">Read More →</a>
              </div>
            </div>

            <div className="signup-form">
              <h2 className="form-title">List Your Product - It's Free</h2>
              <form>
                <div className="form-row">
                  <div className="form-field">
                    <label>Name</label>
                    <input style={{ width: "95%" }}  type="text" placeholder="Select-Ease" />
                  </div>
                  <div className="form-field">
                    <label>Business Email</label>
                    <input style={{ width: "95%" }} type="email" placeholder="business@gmail.com" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>Organization</label>
                    <input style={{ width: "95%" }} type="text" placeholder="Organization" />
                  </div>
                  <div className="form-field">
                    <label>Phone</label>
                    <input style={{ width: "95%" }} type="tel" placeholder="+91" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>Website</label>
                    <input style={{ width: "95%" }} type="url" placeholder="selectease.com" />
                  </div>
                  <div className="form-field">
                    <label>Password</label>
                    <input style={{ width: "95%" }} type="password" placeholder="********" />
                  </div>
                </div>

                <button type="submit" className="next-button">Next</button>

                <div className="form-footer">
                  <p className="terms">By signing up you agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a></p>
                  <p className="login-link">Already have an account? <a href="#">Login</a></p>
                </div>
              </form>
            </div>
          </div>

          <div className="stats-section">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-icon-container">
                  <img src={stat.icon} alt={stat.text} className="stat-icon" />
                </div>
                <h3 className="stat-number">{stat.number}</h3>
                <p className="stat-text">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="estimate-outer">
        <div className="estimate-section">
          <div className="container">
            <h2 className="section-title">Request A Free Estimate</h2>
            <div className="tab-buttons">
              <button className="tab-button active">Custom Services</button>
              <button className="tab-button">Value Added Services</button>
            </div>

            <div className="services-grid">
              {services.map((service, index) => (
                <div key={index} className="service-card">
                  <div className="service-icon">
                    <img src={service.icon} alt={service.title} />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="steps-section">
          <h2 className="section-title">List Your Product & Boost Your Market Presence</h2>
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-line"></div>
                {/* <div className="step-number">{step.number}</div> */}
                <img src={step.icon} alt={step.title} className="step-icon" />
                <h4 className="step-title">{step.title}</h4>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vendor;