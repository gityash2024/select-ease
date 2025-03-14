import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { productAPI, reviewAPI, authAPI } from '../services/api';
import { Star, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import hero from '../assets/Hero.png';
import './WriteFeedback.css';
import { motion, AnimatePresence } from 'framer-motion';

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
      navigate('/reviews');
      return;
    }
    
    fetchProductDetails();
  }, [productId, navigate]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getProductById(productId);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
      toast.error('Failed to fetch product details');
      navigate('/reviews');
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
      navigate(`/reviews`);
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (loading) {
    return (
      <motion.div 
        className="write-feedback-loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Loading product details...
        </motion.p>
      </motion.div>
    );
  }

  if (!product) {
    return (
      <motion.div 
        className="write-feedback-error"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h2>Error</h2>
        <p>Product not found</p>
        <motion.button 
          className="back-button" 
          onClick={() => navigate('/products')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Products
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="write-feedback-page"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <motion.div 
        className="hero-section"
        variants={fadeIn}
      >
        <motion.img 
          src={hero} 
          alt="" 
          className="hero-background"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7 }}
        />
        <motion.div 
          className="hero-container"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1>Write a Review</h1>
        </motion.div>
      </motion.div>

      <motion.div 
        className="feedback-container"
        variants={fadeIn}
        transition={{ delay: 0.3 }}
      >
        <motion.div 
          className="feedback-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <motion.button 
            className="back-button" 
            onClick={() => navigate('/reviews')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={16} />
            Back to Reviews
          </motion.button>
          <h2>Review for {product.name}</h2>
        </motion.div>

        <motion.div 
          className="product-card-review"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <div className="product-info">
            <motion.img 
              src={product.logo || product.image_url || hero} 
              alt={product.name} 
              className="product-logo"
              whileHover={{ scale: 1.1 }}
            />
            <div>
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="review-form-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <form onSubmit={handleSubmit}>
            <motion.div 
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              <label>Your Overall Rating</label>
              <div className="rating-input">
                {[...Array(5)].map((_, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Star
                      size={32}
                      onClick={() => handleInputChange('rating', index + 1)}
                      fill={index < reviewFormData.rating ? '#fbbf24' : 'none'}
                      color={index < reviewFormData.rating ? '#fbbf24' : '#d1d5db'}
                      style={{ cursor: 'pointer' }}
                    />
                  </motion.div>
                ))}
                <span className="rating-text">
                  {reviewFormData.rating === 5 ? 'Excellent' : 
                   reviewFormData.rating === 4 ? 'Very Good' :
                   reviewFormData.rating === 3 ? 'Good' :
                   reviewFormData.rating === 2 ? 'Fair' : 'Poor'}
                </span>
              </div>
            </motion.div>

            <motion.div 
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            >
              <label htmlFor="title">Review Title</label>
              <input
                type="text"
                id="title"
                value={reviewFormData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Summarize your experience with this product"
                required
              />
            </motion.div>

            <motion.div 
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.3 }}
            >
              <label htmlFor="comment">Your Review</label>
              <textarea
                id="comment"
                value={reviewFormData.comment}
                onChange={(e) => handleInputChange('comment', e.target.value)}
                placeholder="Share your experience with this product. What do you like or dislike?"
                required
                rows={5}
              />
            </motion.div>

            <motion.div 
              className="form-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.3 }}
            >
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
            </motion.div>

            <motion.div 
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.3 }}
            >
              <label>Would you recommend this product?</label>
              <div className="recommendation-options">
                <motion.button
                  type="button"
                  className={`recommendation-btn ${reviewFormData.recommendation ? 'selected' : ''}`}
                  onClick={() => handleInputChange('recommendation', true)}
                  whileHover={{ scale: reviewFormData.recommendation ? 1 : 1.05 }}
                  whileTap={{ scale: reviewFormData.recommendation ? 1 : 0.95 }}
                >
                  <CheckCircle size={20} />
                  Yes, I recommend this product
                </motion.button>
                <motion.button
                  type="button"
                  className={`recommendation-btn ${reviewFormData.recommendation === false ? 'selected' : ''}`}
                  onClick={() => handleInputChange('recommendation', false)}
                  whileHover={{ scale: reviewFormData.recommendation === false ? 1 : 1.05 }}
                  whileTap={{ scale: reviewFormData.recommendation === false ? 1 : 0.95 }}
                >
                  <XCircle size={20} />
                  No, I don't recommend this product
                </motion.button>
              </div>
            </motion.div>

            <motion.div 
              className="form-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.3 }}
            >
              <motion.button
                type="button"
                className="cancel-btn"
                onClick={() => navigate(`/reviews`)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                className="submit-btn"
                disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.05 }}
                whileTap={{ scale: submitting ? 1 : 0.95 }}
              >
                {submitting ? (
                  <span className="submitting-text">
                    <motion.span
                      className="dot"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                    />
                    Submitting...
                  </span>
                ) : 'Submit Review'}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WriteFeedback;