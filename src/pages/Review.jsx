import React, { useState, useEffect } from 'react';
import './Review.css';
import Instagram from '../assets/Instagram.svg';
import hero from '../assets/Hero.png';
import { useNavigate } from 'react-router-dom';
import { productAPI, reviewAPI, authAPI } from '../services/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';

const ProductCard = ({ product, onClick }) => {
  return (
    <motion.div 
      className="product-card" 
      onClick={onClick}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      style={{ opacity: 1 }}
    >
      <div className="icon-circles">
        <img src={product.logo || Instagram} alt="Product icon" />
      </div>
      <h3>{product.name.toUpperCase()}</h3>
      <p>by {product.user?.username || 'Unknown Vendor'}</p>
    </motion.div>
  );
};

const ReviewModal = ({ review, product, onClose }) => {
  return (
    <motion.div 
      className="review-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="review-modal-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>
        
        <div className="modal-product-info">
          <img src={product?.logo || product?.image_url || Instagram} alt={product?.name} className="modal-product-logo" />
          <div>
            <h3>{product?.name}</h3>
            <div className="modal-rating">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  fill={i < review.rating ? '#fbbf24' : 'none'}
                  color={i < review.rating ? '#fbbf24' : '#d1d5db'}
                />
              ))}
              <span className="rating-text">
                {review.rating === 5 ? 'Excellent' : 
                 review.rating === 4 ? 'Very Good' :
                 review.rating === 3 ? 'Good' :
                 review.rating === 2 ? 'Fair' : 'Poor'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="modal-review-content">
          <h4>{review.title}</h4>
          <p>{review.comment}</p>
          
          <div className="modal-review-details">
            {review.pros && (
              <div className="modal-pros">
                <h5>Pros</h5>
                <p>{review.pros}</p>
              </div>
            )}
            
            {review.cons && (
              <div className="modal-cons">
                <h5>Cons</h5>
                <p>{review.cons}</p>
              </div>
            )}
          </div>
          
          {review.recommendation !== undefined && (
            <div className={`modal-recommendation ${review.recommendation ? 'positive' : 'negative'}`}>
              {review.recommendation 
                ? "I recommend this product" 
                : "I do not recommend this product"}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Review = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const isAuthenticated = authAPI.isAuthenticated();
        if (!isAuthenticated) {
          toast.error('Please login to access reviews');
          navigate('/login');
          return;
        }
        
        const productsResponse = await productAPI.getAllProducts();
        const allProducts = productsResponse.data?.products?.filter(p => p.status === 'published') || [];
        setProducts(allProducts);
        setFilteredProducts(allProducts);
        
        const reviewsResponse = await reviewAPI.getUserReviews();
        const reviews = Array.isArray(reviewsResponse.data) ? reviewsResponse.data : [];
        setUserReviews(reviews);
        
        const reviewedProductIds = reviews.map(review => review.product_id);
        const needReview = allProducts.filter(product => !reviewedProductIds.includes(product.id));
        setPendingReviews(needReview);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load products and reviews');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [navigate]);
  
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
      return;
    }
    
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };
  
  const handleProductClick = (product) => {
    const existingReview = userReviews.find(review => review.product_id === product.id);
    
    if (existingReview) {
      setSelectedReview(existingReview);
      setSelectedProduct(product);
    } else {
      navigate(`/write-feedback?productId=${product.id}`);
    }
  };
  
  const closeModal = () => {
    setSelectedReview(null);
    setSelectedProduct(null);
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products and reviews...</p>
      </div>
    );
  }
  
  const containerAnimation = {
    hidden: { opacity: 1 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const childAnimation = {
    hidden: { opacity: 1 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div className="review-page" style={{ opacity: 1 }}>
      <section className="review-hero-section" style={{ opacity: 1 }}>
        <img src={hero} alt="" className="hero-background-review" />
        <div className="review-hero-content" style={{ opacity: 1 }}>
          <h1>Your feedback can make a BIG impact</h1>
          <div className="review-search-box">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </section>

      {searchTerm ? (
        <section className="products-section" style={{ opacity: 1 }}>
          <h2>Search Results</h2>
          <div className="products-grid" style={{ opacity: 1 }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={() => handleProductClick(product)}
                />
              ))
            ) : (
              <p>No products found matching "{searchTerm}"</p>
            )}
          </div>
        </section>
      ) : (
        <>
          {pendingReviews.length > 0 && (
            <section className="products-section" style={{ opacity: 1 }}>
              <h2>Products waiting for your review</h2>
              <div className="products-grid" style={{ opacity: 1 }}>
                {pendingReviews.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={() => navigate(`/write-feedback?productId=${product.id}`)}
                  />
                ))}
              </div>
            </section>
          )}

          {userReviews.length > 0 && (
            <section className="solutions-section" style={{ opacity: 1 }}>
              <h2>Your Reviews</h2>
              <div className="products-grid" style={{ opacity: 1 }}>
                {userReviews.map(review => {
                  const productData = review.product || products.find(p => p.id === review.product_id);
                  return productData ? (
                    <ProductCard 
                      key={review.id} 
                      product={productData}
                      onClick={() => {
                        setSelectedReview(review);
                        setSelectedProduct(productData);
                      }}
                    />
                  ) : null;
                })}
              </div>
            </section>
          )}

          {userReviews.length === 0 && pendingReviews.length === 0 && (
            <div className="no-reviews-message" style={{ opacity: 1 }}>
              <p>No products available for review yet. Check back later!</p>
            </div>
          )}
        </>
      )}
      
      {selectedReview && selectedProduct && (
        <ReviewModal 
          review={selectedReview} 
          product={selectedProduct} 
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Review;