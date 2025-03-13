import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI, reviewAPI, authAPI } from '../services/api';
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
import { Star, CheckCircle, XCircle, Clock, Send, MessageSquare } from 'lucide-react';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({
    title: '',
    comment: '',
    rating: 5,
    pros: '',
    cons: '',
    recommendation: true
  });

  useEffect(() => {
    setIsAuthenticated(authAPI.isAuthenticated());
    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    if (product) {
      fetchProductReviews();
    }
  }, [product]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getProductById(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
      toast.error('Failed to fetch product details');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchProductReviews = async () => {
    if (!product) return;
    
    setReviewsLoading(true);
    try {
      const response = await reviewAPI.getProductReviews(product.id);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching product reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleFollow = () => {
    if (!isAuthenticated) {
      toast.error('Please login to follow products');
      return;
    }
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? 'Unfollowed successfully' : 'Followed successfully');
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to submit a review');
      navigate('/login');
      return;
    }
    
    try {
      const reviewData = {
        ...reviewFormData,
        product_id: product.id
      };
      
      await reviewAPI.createReview(reviewData);
      toast.success('Review submitted successfully');
      setShowReviewForm(false);
      setReviewFormData({
        title: '',
        comment: '',
        rating: 5,
        pros: '',
        cons: '',
        recommendation: true
      });
      
      // Refresh reviews
      fetchProductReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    }
  };

  const handleReviewInputChange = (field, value) => {
    setReviewFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  // Calculate average rating
  const averageRating = product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : 0;

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
                <span className="stars">
                  {[...Array(5)].map((_, index) => (
                    <Star 
                      key={index}
                      size={16}
                      fill={index < Math.round(averageRating) ? '#fbbf24' : 'none'}
                      color={index < Math.round(averageRating) ? '#fbbf24' : '#d1d5db'}
                    />
                  ))}
                </span>
                <span className="reviews-count">{reviews.length} Reviews</span>
                <span className="dot">•</span>
                <span className="followers-count">Followers</span>
              </div>
            </div>
          </div>
          <div className="action-buttons">
            <button className="follow-btn" onClick={handleFollow}>
              {isFollowing ? 'Following' : 'Follow'}
            </button>
            {product.url && (
              <button className="visit-btn" onClick={() => window.open(product.url, '_blank')}>
                Visit Website
              </button>
            )}
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
              className={activeTab === 'reviews' ? 'active' : ''} 
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({reviews.length})
            </button>
            <button 
              className={activeTab === 'features' ? 'active' : ''} 
              onClick={() => setActiveTab('features')}
            >
              Features
            </button>
            <button 
              className={activeTab === 'pricing' ? 'active' : ''} 
              onClick={() => setActiveTab('pricing')}
            >
              Pricing
            </button>
          </div>
        </div>

        <div className="product-content">
          <div className="main-content">
            {activeTab === 'overview' && (
              <>
                <div className="use-section">
                  <h3>Do you use {product.name}?</h3>
                  <div className="use-buttons">
                    <button 
                      className="use-btn" 
                      onClick={() => setShowReviewForm(true)}
                    >
                      I use this
                    </button>
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
                    <img src={product.image_url || product.logo || project} alt="Feature" />
                    <img src={software} alt="Feature" />
                    <img src={crm} alt="Feature" />
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'reviews' && (
              <div className="reviews-section">
                <div className="reviews-header">
                  <h3>Product Reviews</h3>
                  <button 
                    className="write-review-btn" 
                    onClick={() => setShowReviewForm(true)}
                  >
                    Write a Review
                  </button>
                </div>
                
                {reviewsLoading ? (
                  <div className="loading-reviews">Loading reviews...</div>
                ) : reviews.length > 0 ? (
                  <div className="reviews-list">
                    {reviews.map(review => (
                      <div key={review.id} className="review-card">
                        <div className="review-header">
                          <div className="reviewer-info">
                            <span className="reviewer-name">
                              {review.user?.username || review.user?.firstName || 'Anonymous'}
                            </span>
                            <span className="review-date">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="review-rating">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16}
                                fill={i < review.rating ? '#fbbf24' : 'none'}
                                color={i < review.rating ? '#fbbf24' : '#d1d5db'}
                              />
                            ))}
                          </div>
                        </div>
                        <h4 className="review-title">{review.title}</h4>
                        <p className="review-content">{review.comment}</p>
                        
                        {(review.pros || review.cons) && (
                          <div className="review-details">
                            {review.pros && (
                              <div className="review-pros">
                                <h5>Pros</h5>
                                <p>{review.pros}</p>
                              </div>
                            )}
                            {review.cons && (
                              <div className="review-cons">
                                <h5>Cons</h5>
                                <p>{review.cons}</p>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {review.recommendation !== null && (
                          <div className="recommendation">
                            {review.recommendation ? (
                              <div className="recommends">
                                <CheckCircle size={16} color="#10b981" />
                                <span>Recommends this product</span>
                              </div>
                            ) : (
                              <div className="does-not-recommend">
                                <XCircle size={16} color="#ef4444" />
                                <span>Does not recommend this product</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-reviews">
                    <p>No reviews yet. Be the first to review this product!</p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'features' && (
              <div className="features-section">
                <h3>Features</h3>
                <div className="features-list">
                  <div className="feature-item">
                    <CheckCircle size={20} color="#10b981" />
                    <span>User-friendly interface</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle size={20} color="#10b981" />
                    <span>Advanced analytics</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle size={20} color="#10b981" />
                    <span>Real-time collaboration</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle size={20} color="#10b981" />
                    <span>Cloud storage</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle size={20} color="#10b981" />
                    <span>Mobile compatibility</span>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'pricing' && (
              <div className="pricing-section">
                <h3>Pricing Plans</h3>
                <div className="pricing-plans">
                  <div className="pricing-plan">
                    <h4>Basic</h4>
                    <div className="plan-price">${product.price / 2}/month</div>
                    <ul className="plan-features">
                      <li>Basic features</li>
                      <li>1 user</li>
                      <li>5GB storage</li>
                      <li>Email support</li>
                    </ul>
                    <button className="plan-btn">Choose Plan</button>
                  </div>
                  <div className="pricing-plan popular">
                    <div className="popular-tag">Popular</div>
                    <h4>Professional</h4>
                    <div className="plan-price">${product.price}/month</div>
                    <ul className="plan-features">
                      <li>All Basic features</li>
                      <li>5 users</li>
                      <li>20GB storage</li>
                      <li>Priority support</li>
                      <li>Advanced analytics</li>
                    </ul>
                    <button className="plan-btn">Choose Plan</button>
                  </div>
                  <div className="pricing-plan">
                    <h4>Enterprise</h4>
                    <div className="plan-price">${product.price * 2}/month</div>
                    <ul className="plan-features">
                      <li>All Professional features</li>
                      <li>Unlimited users</li>
                      <li>100GB storage</li>
                      <li>24/7 dedicated support</li>
                      <li>Custom integrations</li>
                    </ul>
                    <button className="plan-btn">Contact Sales</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="sidebar">
            <div className="info-card">
              <h4>Product status</h4>
              <p>{product.status}</p>
            </div>

            {product.url && (
              <div className="info-card">
                <h4>Links</h4>
                <div className="link-item">
                  <img src={link} alt="Website" />
                  <a href={product.url} target="_blank" rel="noopener noreferrer">
                    {product.url}
                  </a>
                </div>
              </div>
            )}

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
              </div>
            </div>
          </div>
        </div>
      </div>

      {showReviewForm && (
        <div className="modal-overlay">
          <div className="modal-content review-form-modal">
            <button className="modal-close" onClick={() => setShowReviewForm(false)}>
              <XCircle size={24} />
            </button>
            <h2>Write a Review for {product.name}</h2>
            <form onSubmit={handleSubmitReview}>
              <div className="form-group">
                <label>Rating</label>
                <div className="rating-input">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={32}
                      onClick={() => handleReviewInputChange('rating', index + 1)}
                      fill={index < reviewFormData.rating ? '#fbbf24' : 'none'}
                      color={index < reviewFormData.rating ? '#fbbf24' : '#d1d5db'}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={reviewFormData.title}
                  onChange={(e) => handleReviewInputChange('title', e.target.value)}
                  placeholder="Summarize your experience"
                  required
                />
              </div>
              <div className="form-group">
                <label>Review</label>
                <textarea
                  value={reviewFormData.comment}
                  onChange={(e) => handleReviewInputChange('comment', e.target.value)}
                  placeholder="Share your experience with this product"
                  required
                  rows={5}
                />
              </div>
              <div className="form-group">
                <label>Pros</label>
                <textarea
                  value={reviewFormData.pros}
                  onChange={(e) => handleReviewInputChange('pros', e.target.value)}
                  placeholder="What did you like about this product?"
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Cons</label>
                <textarea
                  value={reviewFormData.cons}
                  onChange={(e) => handleReviewInputChange('cons', e.target.value)}
                  placeholder="What could be improved?"
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Would you recommend this product?</label>
                <div className="recommendation-input">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="recommendation"
                      checked={reviewFormData.recommendation === true}
                      onChange={() => handleReviewInputChange('recommendation', true)}
                    />
                    Yes, I would recommend this
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="recommendation"
                      checked={reviewFormData.recommendation === false}
                      onChange={() => handleReviewInputChange('recommendation', false)}
                    />
                    No, I would not recommend this
                  </label>
                </div>
              </div>
              <button type="submit" className="submit-btn">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;