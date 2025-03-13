import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { productAPI, reviewAPI, authAPI } from '../services/api';
import { Star, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import hero from '../assets/Hero.png';
import './WriteFeedback.css';

const WriteFeedback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({
    title: '',
    comment: '',
    rating: 5,
    pros: '',
    cons: '',
    recommendation: true
  });

  // Get product ID from URL query params
  const params = new URLSearchParams(location.search);
  const productId = params.get('productId');

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = authAPI.isAuthenticated();
    if (!isAuthenticated) {
      toast.error('Please login to write a review');
      navigate('/login');
      return;
    }
    
    if (!productId) {
      toast.error('No product selected for review');
      navigate('/products');
      return;
    }
    
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getProductById(productId);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
      toast.error('Failed to fetch product details');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setReviewFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      const reviewData = {
        ...reviewFormData,
        product_id: productId
      };
      
      await reviewAPI.createReview(reviewData);
      toast.success('Review submitted successfully');
      
      // Navigate to product details page
      navigate(`/products/${productId}`);
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="write-feedback-loading">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="write-feedback-error">
        <h2>Error</h2>
        <p>Product not found</p>
        <button className="back-button" onClick={() => navigate('/products')}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="write-feedback-page">
      <div className="hero-section">
        <img src={hero} alt="" className="hero-background" />
        <div className="hero-container">
          <h1>Write a Review</h1>
        </div>
      </div>

      <div className="feedback-container">
        <div className="feedback-header">
          <button className="back-button" onClick={() => navigate(`/products/${productId}`)}>
            <ArrowLeft size={16} />
            Back to Product
          </button>
          <h2>Review for {product.name}</h2>
        </div>

        <div className="product-card">
          <div className="product-info">
            <img src={product.logo || product.image_url || hero} alt={product.name} className="product-logo" />
            <div>
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
            </div>
          </div>
        </div>

        <div className="review-form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Overall Rating</label>
              <div className="rating-input">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={32}
                    onClick={() => handleInputChange('rating', index + 1)}
                    fill={index < reviewFormData.rating ? '#fbbf24' : 'none'}
                    color={index < reviewFormData.rating ? '#fbbf24' : '#d1d5db'}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
                <span className="rating-text">
                  {reviewFormData.rating === 5 ? 'Excellent' : 
                   reviewFormData.rating === 4 ? 'Very Good' :
                   reviewFormData.rating === 3 ? 'Good' :
                   reviewFormData.rating === 2 ? 'Fair' : 'Poor'}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="title">Review Title</label>
              <input
                type="text"
                id="title"
                value={reviewFormData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Summarize your experience with this product"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="comment">Your Review</label>
              <textarea
                id="comment"
                value={reviewFormData.comment}
                onChange={(e) => handleInputChange('comment', e.target.value)}
                placeholder="Share your experience with this product. What do you like or dislike?"
                required
                rows={5}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="pros">Pros</label>
                <textarea
                  id="pros"
                  value={reviewFormData.pros}
                  onChange={(e) => handleInputChange('pros', e.target.value)}
                  placeholder="What did you like about this product?"
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cons">Cons</label>
                <textarea
                  id="cons"
                  value={reviewFormData.cons}
                  onChange={(e) => handleInputChange('cons', e.target.value)}
                  placeholder="What could be improved?"
                  rows={3}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Would you recommend this product?</label>
              <div className="recommendation-options">
                <button
                  type="button"
                  className={`recommendation-btn ${reviewFormData.recommendation ? 'selected' : ''}`}
                  onClick={() => handleInputChange('recommendation', true)}
                >
                  <CheckCircle size={20} />
                  Yes, I recommend this product
                </button>
                <button
                  type="button"
                  className={`recommendation-btn ${reviewFormData.recommendation === false ? 'selected' : ''}`}
                  onClick={() => handleInputChange('recommendation', false)}
                >
                  <XCircle size={20} />
                  No, I don't recommend this product
                </button>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate(`/products/${productId}`)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="submit-btn"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WriteFeedback;