import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { reviewAPI, authAPI } from '../services/api';
import { Star, Edit, Trash2, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import hero from '../assets/Hero.png';
import './UserReviews.css';

const UserReviews = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = authAPI.isAuthenticated();
    if (!isAuthenticated) {
      toast.error('Please login to view your reviews');
      navigate('/login');
      return;
    }
    
    fetchUserReviews();
  }, []);

  const fetchUserReviews = async () => {
    try {
      setLoading(true);
      const response = await reviewAPI.getUserReviews();
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching user reviews:', error);
      toast.error('Failed to fetch your reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (review) => {
    setSelectedReview(review);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteReview = async () => {
    try {
      await reviewAPI.deleteReview(selectedReview.id);
      toast.success('Review deleted successfully');
      setIsDeleteModalOpen(false);
      
      // Refresh reviews
      fetchUserReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    }
  };

  const handleEditReview = (review) => {
    navigate(`/write-feedback?productId=${review.product_id}&reviewId=${review.id}`);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="user-reviews-loading">
        <div className="loading-spinner"></div>
        <p>Loading your reviews...</p>
      </div>
    );
  }

  return (
    <div className="user-reviews-page">
      <div className="hero-section">
        <img src={hero} alt="" className="hero-background" />
        <div className="hero-container">
          <h1>My Reviews</h1>
        </div>
      </div>

      <div className="user-reviews-container">
        <div className="reviews-header">
          <h2>Your Reviews</h2>
          <button 
            className="add-review-btn"
            onClick={() => navigate('/reviews')}
          >
            Write New Review
          </button>
        </div>

        {reviews.length === 0 ? (
          <div className="no-reviews">
            <p>You haven't written any reviews yet.</p>
            <button 
              className="start-reviewing-btn"
              onClick={() => navigate('/reviews')}
            >
              Start Reviewing
            </button>
          </div>
        ) : (
          <div className="reviews-list">
            {reviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="product-info">
                    <img 
                      src={review.product?.image_url || review.product?.logo || hero} 
                      alt={review.product?.name} 
                      className="product-image" 
                    />
                    <div>
                      <h3>{review.product?.name || 'Unknown Product'}</h3>
                      <div className="rating">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            size={16}
                            fill={index < review.rating ? '#fbbf24' : 'none'}
                            color={index < review.rating ? '#fbbf24' : '#d1d5db'}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="review-date">
                    {formatDate(review.createdAt)}
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
                
                <div className="review-actions">
                  <button 
                    className="edit-review-btn"
                    onClick={() => handleEditReview(review)}
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button 
                    className="delete-review-btn"
                    onClick={() => handleDeleteClick(review)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                  <button 
                    className="view-product-btn"
                    onClick={() => navigate(`/products/${review.product_id}`)}
                  >
                    View Product
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content delete-modal">
            <h2>Delete Review</h2>
            <p>
              Are you sure you want to delete your review for "{selectedReview.product?.name}"?
              This action cannot be undone.
            </p>
            
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="delete-btn"
                onClick={handleDeleteReview}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserReviews;