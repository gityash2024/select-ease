import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import toast from 'react-hot-toast';
import hero from '../assets/Hero.png';
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
import project from '../assets/project.png';
import software from '../assets/software.png';
import crm from '../assets/crm.png';
import './Product.css';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await productAPI.getProductById(id);
      setProduct(response.data);
    } catch (error) {
      toast.error('Failed to fetch product details');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      toast.error('Please login to follow products');
      return;
    }
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? 'Unfollowed successfully' : 'Followed successfully');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-page">
      <div className="hero-section">
        <img src={hero} alt="" className="hero-background" />
        <div className="hero-container">
          <h1>Products</h1>
        </div>
      </div>

      <div className="product-container">
        <div className="product-header">
          <div className="product-info">
            <img src={product.logo || hero} alt={product.name} className="product-logo" />
            <div className="product-title">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div className="ratings">
                <span className="stars">★★★★★</span>
                <span className="reviews-count">1156 Reviews</span>
                <span className="dot">•</span>
                <span className="followers-count">1156 Followers</span>
              </div>
            </div>
          </div>
          <div className="action-buttons">
            <button className="follow-btn" onClick={handleFollow}>
              {isFollowing ? 'Following' : 'Follow'}
            </button>
            <button className="visit-btn" onClick={() => window.open(product.url, '_blank')}>
              Visit Website
            </button>
          </div>
        </div>

        <div className="product-nav">
          <div className="nav-tabs">
            <button 
              className={activeTab === 'overview' ? 'active' : ''} 
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={activeTab === 'launches' ? 'active' : ''} 
              onClick={() => setActiveTab('launches')}
            >
              Launches
            </button>
            <button 
              className={activeTab === 'reviews' ? 'active' : ''} 
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
            <button 
              className={activeTab === 'team' ? 'active' : ''} 
              onClick={() => setActiveTab('team')}
            >
              Team
            </button>
            <button 
              className={activeTab === 'more' ? 'active' : ''} 
              onClick={() => setActiveTab('more')}
            >
              More
            </button>
          </div>
        </div>

        <div className="product-content">
          <div className="main-content">
            <div className="use-section">
              <h3>Do you use {product.name}?</h3>
              <div className="use-buttons">
                <button className="use-btn">I use this</button>
                <button className="use-btn outline">I use something else</button>
              </div>
            </div>

            <div className="about-section">
              <h3>What is {product.name}?</h3>
              <p>{product.description}</p>

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
                <img src={product.logo || project} alt="Feature" />
                <img src={software} alt="Feature" />
                <img src={crm} alt="Feature" />
              </div>

              <div className="launch-section">
                <h3>Recent launches</h3>
                <div className="launch-content">
                  <p>{product.description}</p>
                  <span className="launch-date">3 days ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="sidebar">
            <div className="info-card">
              <h4>Product status</h4>
              <p>{product.status}</p>
            </div>

            <div className="info-card">
              <h4>Links</h4>
              <div className="link-item">
                <img src={link} alt="Website" />
                <a href={product.url} target="_blank" rel="noopener noreferrer">
                  {product.url}
                </a>
              </div>
              <div className="link-item">
                <img src={github} alt="Github" />
                <a href="#" target="_blank" rel="noopener noreferrer">Github</a>
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
              <p>${product.price} (with a free trial or plan)</p>
            </div>

            <div className="info-card-2">
              <h4>Makers</h4>
              <div className="makers-avatars">
                <img src={makers_1} alt="Maker" />
                <img src={makers_2} alt="Maker" />
                <img src={makers_3} alt="Maker" />
                <img src={makers_3} alt="Maker" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;