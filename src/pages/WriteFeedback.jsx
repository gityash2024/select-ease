import React, { useState, useEffect } from 'react';
import './WriteFeedback.css';
import hero from '../assets/Hero.png';
import saleforce from '../assets/saleforce.png';
import gogle from '../assets/gogle.png';
import lnik from '../assets/lnik.png';
import fack from '../assets/fack.png';
import Guidelines from '../assets/Guidelines.png';
import Guidelines1 from '../assets/Guidelines1.png';
import Guidelines2 from '../assets/Guidelines2.png';
import Guidelines3 from '../assets/Guidelines3.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { productAPI, reviewAPI } from '../services/api';
import toast from 'react-hot-toast';

const WriteFeedback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    jobTitle: '',
    companySize: '',
    usageDuration: '',
    title: '',
    comment: '',
    termsAccepted: false
  });
  
  const [ratings, setRatings] = useState({
    overall: 0,
    features: 0,
    ease: 0,
    value: 0
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Get product ID from query parameters
        const searchParams = new URLSearchParams(location.search);
        const productId = searchParams.get('productId');
        
        if (!productId) {
          toast.error('Product ID not provided');
          navigate('/reviews');
          return;
        }
        
        const response = await productAPI.getProductById(productId);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product details');
        navigate('/reviews');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [location.search, navigate]);

  const handleRating = (category, value) => {
    setRatings(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (ratings.overall === 0) {
      toast.error('Please provide an overall rating');
      return;
    }
    
    if (!formData.title.trim() || !formData.comment.trim()) {
      toast.error('Please provide a title and review comment');
      return;
    }
    
    if (!formData.termsAccepted) {
      toast.error('Please accept the terms and conditions');
      return;
    }
    
    try {
      setSubmitting(true);
      
      const reviewData = {
        productId: product.id,
        rating: ratings.overall,
        comment: formData.comment,
        title: formData.title
      };
      
      await reviewAPI.createReview(reviewData);
      toast.success('Review submitted successfully!');
      navigate('/reviews');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const RatingStars = ({ category, value }) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRating(category, star)}
            style={{ color: star <= value ? '#FDB241' : '#D1D5DB', cursor: 'pointer' }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }
  
  if (!product) {
    return <div className="not-found">Product not found</div>;
  }

  return (
    <div className="write-feedback">
      <section className="write-hero-section">
        <img src={hero} alt="" className="write-hero-background" />
        <h1>Your feedback can make a BIG impact</h1>
      </section>

      <section className="review-section">
        <div className="review-header">
          <img src={saleforce} alt="Product logo" className="company-logo" />
          <div>
            <h2>Write Review for {product.name}</h2>
            <p>{product.description}</p>
          </div>
        </div>

        <div className="auth-buttons">
          <button className="google-btn">
            <img src={gogle} alt="Google" />
            Sign in with Google
          </button>
          <button className="linkedin-btn">
            <img src={lnik} alt="LinkedIn" />
            Sign in with LinkedIn
          </button>
          <button className="facebook-btn">
            <img src={fack} alt="Facebook" />
            Login with Facebook
          </button>
        </div>

        <form className="review-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name" 
              />
            </div>
            <div className="form-group">
              <label>Business Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Business Email Address" 
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Organization Name</label>
              <input 
                type="text" 
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                placeholder="Organization Name" 
              />
            </div>
            <div className="form-group">
              <label>Job Title</label>
              <input 
                type="text" 
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                placeholder="Job Title" 
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Company Size</label>
              <select 
                name="companySize"
                value={formData.companySize}
                onChange={handleInputChange}
              >
                <option value="" disabled>Please select</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501+">501+ employees</option>
              </select>
            </div>
            <div className="form-group">
              <label>How long have you used this product?</label>
              <select 
                name="usageDuration"
                value={formData.usageDuration}
                onChange={handleInputChange}
              >
                <option value="" disabled>Please select</option>
                <option value="less-6">Less than 6 months</option>
                <option value="6-12">6-12 months</option>
                <option value="1-2">1-2 years</option>
                <option value="2+">More than 2 years</option>
              </select>
            </div>
          </div>

          <div className="rating-section">
            <div className="rating-group">
              <label>Overall Rating</label>
              <RatingStars category="overall" value={ratings.overall} />
            </div>
            <div className="rating-group">
              <label>Features</label>
              <RatingStars category="features" value={ratings.features} />
            </div>
            <div className="rating-group">
              <label>Ease of use</label>
              <RatingStars category="ease" value={ratings.ease} />
            </div>
            <div className="rating-group">
              <label>Value for money</label>
              <RatingStars category="value" value={ratings.value} />
            </div>
          </div>

          <div className="form-group">
            <label>Title of Review</label>
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Describe your experience in a short sentence." 
            />
          </div>

          <div className="form-group">
            <label>Your Review</label>
            <textarea 
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              placeholder={`${product.name} is`}
            ></textarea>
          </div>

          <div className="form-checkbox">
            <input 
              type="checkbox" 
              id="terms" 
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleInputChange}
            />
            <label htmlFor="terms">
              I certify that my feedback is based on my experience with this product. By submitting, I agree to the terms of use and privacy policy of SelectEase.
            </label>
          </div>

          <button 
            type="submit" 
            className="next-btn" 
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>

        <div className="guidelines">
          <h3>Review Guidelines</h3>
          <div className="guidelines-grid">
            <div className="guideline-card">
              <img src={Guidelines} alt="No Incomplete Information" />
              <p>No Incomplete Information</p>
            </div>
            <div className="guideline-card">
              <img src={Guidelines1} alt="No Self-Promotional Activity" />
              <p>No Self-Promotional Activity</p>
            </div>
            <div className="guideline-card">
              <img src={Guidelines2} alt="No Hateful Language" />
              <p>No Hateful or Disparaging Language</p>
            </div>
            <div className="guideline-card">
              <img src={Guidelines3} alt="No Fake Names" />
              <p>No Use of Fake Names or Spam Content.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WriteFeedback;