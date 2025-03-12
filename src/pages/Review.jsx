// Review.jsx
import React, { useState, useEffect } from 'react';
import './Review.css';
import Instagram from '../assets/Instagram.svg';
import hero from '../assets/Hero.png';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div 
      className="product-card" 
      style={{cursor:"pointer"}} 
      onClick={() => navigate(`/write-feedback?productId=${product.id}`)}
    >
      <div className="icon-circles">
        <img src={Instagram} alt="Product icon" />
      </div>
      <h3>{product.name.toUpperCase()}</h3>
      <p>by {product.user?.username || 'Unknown Vendor'}</p>
    </div>
  )
};

const Review = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productAPI.getAllProducts();
        const publishedProducts = response.data?.products?.filter(p => p.status === 'published');
        setProducts(publishedProducts);
        setFilteredProducts(publishedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
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
  
  if (loading) {
    return <div className="loading">Loading products...</div>;
  }
  
  // Split products into popular and other categories (this is a simple implementation)
  // In a real app, you might have a popularity score or featured flag
  const popularProducts = products.slice(0, 8); // First 8 products as popular
  const otherProducts = products.slice(8); // Rest of the products
  
  return (
    <div className="review-page">
      <section className="review-hero-section">
        <img src={hero} alt="" className="hero-background" />
        <div className="review-hero-content">
          <h1>Your feedback can make a BIG impact</h1>
          <div className="review-search-box">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </section>

      {searchTerm ? (
        <section className="products-section">
          <h2>Search Results</h2>
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products found matching "{searchTerm}"</p>
            )}
          </div>
        </section>
      ) : (
        <>
          <section className="products-section">
            <h2>Here are some popular products to review</h2>
            <div className="products-grid">
              {popularProducts.length > 0 ? (
                popularProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p>No popular products available yet</p>
              )}
            </div>
          </section>

          {otherProducts.length > 0 && (
            <section className="solutions-section">
              <h2>Select the other solutions you use, and then click to start a review:</h2>
              <div className="products-grid">
                {otherProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default Review;