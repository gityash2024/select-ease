import React from 'react';
import './Product.css';
import hero from '../assets/Hero.png';
import corexta from '../assets/corexta.png';
import project from '../assets/project.png';
import software from '../assets/software.png';
import crm from '../assets/crm.png';
import link from '../assets/link.png';
import github from '../assets/github.png';
import Facebook from '../assets/Facebook.svg';
import Twitter from '../assets/Twitter.svg';
import Instagram from '../assets/Instagram.svg';
import Youtube from '../assets/Youtube.svg';
import Linkedin from '../assets/Linkedin.svg';
import makers_1 from '../assets/makers_1.png';
import makers_2 from '../assets/makers_2.png';
import makers_3 from '../assets/makers_3.png';
import Corexta_start from '../assets/Corexta_start.png';
import Corexta_1 from '../assets/Corexta_1.png';
import Corexta_2 from '../assets/Corexta_2.png';
import Corexta_3 from '../assets/Corexta_3.png';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const navigate = useNavigate();

  return (
    <div className="product-page">
 <div className="hero-section">
        <img src={hero} alt="" className="hero-background" />
        <div className="hero-container">
          <h1>Products</h1>
          <button 
            onClick={() => navigate('/vendor')} 
            className="add-product-btn"
          >
            Add Product
          </button>
        </div>
      </div>

      <div className="product-container">
        <div className="product-header">
          <div className="product-info">
            <img src={Corexta_start} alt="Corexta" className="product-logo" />
            <div className="product-title">
              <h2>Corexta</h2>
              <p>All-in-One Agency Management platform</p>
              <div className="ratings">
                <span className="stars">★★★★★</span>
                <span className="reviews-count">1156 Reviews</span>
                <span className="dot">•</span>
                <span className="followers-count">1156 Followers</span>
              </div>
            </div>
          </div>
          <div className="action-buttons">
            <button className="follow-btn">Follow</button>
            <button className="visit-btn">Visit Website</button>
          </div>
        </div>

        <div className="product-nav">
          <div className="nav-tabs">
            <button className="active">Overview</button>
            <button>Launches</button>
            <button>Reviews</button>
            <button>Team</button>
            <button>More</button>
          </div>
        </div>

        <div className="product-content">
          <div className="main-content">
            <div className="use-section">
              <h3>Do you use Corexta?</h3>
              <div className="use-buttons">
                <button className="use-btn">I use this</button>
                <button className="use-btn outline">I use something else</button>
              </div>
            </div>

            <div className="about-section">
              <h3>What is Corexta?</h3>
              <p>
                Manage your agency with our all-in-one platform. Manage projects, clients, HR, 
                Payroll, Asset and finances seamlessly. Scale your business and drive success 
                with our comprehensive suite of features
              </p>

              <div className="tags">
                <span className="tag">
                  <img src={project} alt="" className="tag-icon" />
                  Project management software
                </span>
                <span className="tag">
                  <img src={software} alt="" className="tag-icon" />
                  Team collaboration software
                </span>
                <span className="tag">
                  <img src={crm} alt="" className="tag-icon" />
                  CRM software
                </span>
              </div>

              <div className="feature-images">
                <img src={project} alt="Feature" />
                <img src={software} alt="Feature" />
                <img src={crm} alt="Feature" />
              </div>

              <div className="launch-section">
                <h3>Recent launches</h3>
                <div className="launch-content">
                  <p>
                    Manage your agency with our all-in-one platform. Manage projects, clients, HR, 
                    Payroll, Asset and finances seamlessly. Scale your business and drive success 
                    with our comprehensive suite of features
                  </p>
                  <span className="launch-date">3 days ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="sidebar">
            <div className="info-card">
              <h4>Product status</h4>
              <p>Claimed</p>
            </div>

            <div className="info-card">
              <h4>Links</h4>
              <div className="link-item">
                <img src={link} alt="Website" />
                <a href="https://corexta.com">corexta.com</a>
              </div>
              <div className="link-item">
                <img src={github} alt="Github" />
                <a href="#">Github</a>
              </div>
            </div>

            <div className="info-card">
              <h4>Social</h4>
              <div className="social-links">
                <a href="#"><img src={Facebook} alt="Facebook" /></a>
                <a href="#"><img src={Twitter} alt="Twitter" /></a>
                <a href="#"><img src={Instagram} alt="Instagram" /></a>
                <a href="#"><img src={Youtube} alt="Youtube" /></a>
                <a href="#"><img src={Linkedin} alt="LinkedIn" /></a>
              </div>
            </div>

            <div className="info-card">
              <h4>Pricing</h4>
              <p>Paid (with a free trial or plan)</p>
            </div>

            <div className="info-card-2 ">
              <h4>Makers</h4>
              <div className="makers-avatars">
                <img src={makers_1} alt="Maker" />
                <img src={makers_2} alt="Maker" />
                <img src={makers_3} alt="Maker" />
                <img src={makers_3} alt="Maker" />
                {/* <a href="#" className="view-all">View All</a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

