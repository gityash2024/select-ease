import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { productAPI, categoryAPI } from '../services/api';
import './Comparison.css';
import { Star, Check, X, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import hero from '../assets/Hero.png';

const Comparison = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryAPI.getAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();

    // Get product IDs from URL query params
    const params = new URLSearchParams(location.search);
    const productIds = params.get('products')?.split(',') || [];

    if (productIds.length < 2) {
      toast.error('Please select at least 2 products to compare');
      navigate('/products');
      return;
    }

    fetchProductsForComparison(productIds);
  }, [location.search]);

  const fetchProductsForComparison = async (productIds) => {
    try {
      setLoading(true);
      const response = await productAPI.compareProducts(productIds);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products for comparison:', error);
      toast.error('Failed to fetch comparison data');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'N/A';
  };

  const renderRating = (rating) => {
    return (
      <div className="comparison-stars">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            fill={index < Math.round(rating) ? '#fbbf24' : 'none'}
            color={index < Math.round(rating) ? '#fbbf24' : '#d1d5db'}
          />
        ))}
        <span className="rating-value">({rating})</span>
      </div>
    );
  };

  const renderYesNo = (value) => {
    if (value === true) {
      return <Check size={20} color="#10b981" />;
    } else if (value === false) {
      return <X size={20} color="#ef4444" />;
    } else {
      return <span className="na-text">N/A</span>;
    }
  };

  if (loading) {
    return (
      <div className="comparison-loading">
        <div className="loading-spinner"></div>
        <p>Loading comparison data...</p>
      </div>
    );
  }

  if (products.length < 2) {
    return (
      <div className="comparison-error">
        <h2>Comparison Error</h2>
        <p>Not enough products to compare. Please select at least 2 products.</p>
        <button className="back-button" onClick={() => navigate('/products')}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="comparison-page">
      <div className="hero-section">
        <img src={hero} alt="" className="hero-background" />
        <div className="hero-container">
          <h1>Product Comparison</h1>
        </div>
      </div>

      <div className="comparison-container">
        <div className="comparison-header">
          <button className="back-button" onClick={() => navigate('/products')}>
            <ArrowLeft size={16} />
            Back to Products
          </button>
          <h2>Comparing {products.length} Products</h2>
        </div>

        <div className="comparison-table-container">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="feature-column">Feature</th>
                {products.map((product) => (
                  <th key={product.id} className="product-column">
                    <div className="product-header">
                      <img 
                        src={product.logo || product.image_url || hero} 
                        alt={product.name} 
                        className="product-logo" 
                      />
                      <h3>{product.name}</h3>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="feature-name">Image</td>
                {products.map((product) => (
                  <td key={product.id}>
                    <img 
                      src={product.image_url || product.logo || hero} 
                      alt={product.name} 
                      className="product-image" 
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="feature-name">Price</td>
                {products.map((product) => (
                  <td key={product.id}>${product.price}</td>
                ))}
              </tr>
              <tr>
                <td className="feature-name">Rating</td>
                {products.map((product) => (
                  <td key={product.id}>
                    {renderRating(product.averageRating || product.rating || 0)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="feature-name">Category</td>
                {products.map((product) => (
                  <td key={product.id}>{getCategoryName(product.category_id)}</td>
                ))}
              </tr>
              <tr>
                <td className="feature-name">In Stock</td>
                {products.map((product) => (
                  <td key={product.id}>{renderYesNo(product.in_stock)}</td>
                ))}
              </tr>
              <tr>
                <td className="feature-name">Status</td>
                {products.map((product) => (
                  <td key={product.id}>
                    <span className={`status-badge ${product.status}`}>
                      {product.status}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="feature-name description-row">Description</td>
                {products.map((product) => (
                  <td key={product.id} className="description-cell">
                    {product.description}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="feature-name">Website</td>
                {products.map((product) => (
                  <td key={product.id}>
                    {product.url ? (
                      <a 
                        href={product.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="website-link"
                      >
                        Visit Website
                      </a>
                    ) : (
                      <span className="na-text">N/A</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="feature-name">Actions</td>
                {products.map((product) => (
                  <td key={product.id}>
                    <div className="product-actions">
                      <button 
                        className="view-btn" 
                        onClick={() => navigate(`/products/${product.id}`)}
                      >
                        View Details
                      </button>
                      <button 
                        className="review-btn" 
                        onClick={() => navigate(`/write-feedback?productId=${product.id}`)}
                      >
                        Write Review
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Comparison;