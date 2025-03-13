import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI, categoryAPI } from '../services/api';
import { Search, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import hero from '../assets/Hero.png';
import './ProductList.css';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState({ products: [], total: 0, page: 1, limit: 10, totalPages: 0 });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priceRange: '',
    status: ''
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, isAuthenticated]);
  
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = async (page) => {
    try {
      const response = await productAPI.getAllProducts(page);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        toast.error('Failed to fetch products');
      }
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    }
  };

  const handleAddClick = () => {
    if (!isAuthenticated) {
      toast('Please login to add a product', {
        icon: 'ℹ️',
      });
      navigate('/login');
    } else {
      navigate('/add-product');
    }
  };

  const toggleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(prev => prev.filter(id => id !== productId));
    } else {
      if (selectedProducts.length >= 5) {
        toast.error('You can compare a maximum of 5 products');
        return;
      }
      setSelectedProducts(prev => [...prev, productId]);
    }
  };

  const handleCompare = () => {
    if (selectedProducts.length < 2) {
      toast.error('Please select at least 2 products to compare');
      return;
    }
    
    navigate(`/comparison?products=${selectedProducts.join(',')}`);
  };

  const filteredProducts = Array.isArray(products.products) 
    ? products.products.filter(product => {
        return (
          product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          (!filters.category || product.category_id === parseInt(filters.category)) &&
          (!filters.status || product.status === filters.status)
        );
      })
    : [];

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= products.totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const EmptyState = () => (
    <div className="empty-state">
      <Package size={64} />
      <h3>No Products Found</h3>
      <p>Start by adding your first product or try a different search</p>
      <button onClick={handleAddClick} className="add-product-btn">
        Add Product
      </button>
    </div>
  );

  return (
    <div className="product-list-page">
      <div className="hero-section">
        <img src={hero} alt="" className="hero-background" />
        <div className="hero-container">
          <h1>Products</h1>
          <button onClick={handleAddClick} className="add-product-btn">
            Add Product
          </button>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-filter">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          />
        </div>

        <select
          value={filters.category}
          onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          className="filter-dropdown"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>

        {isAuthenticated && (
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="filter-dropdown"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="published">Published</option>
            <option value="denied">Denied</option>
          </select>
        )}
      </div>
      
      {selectedProducts.length > 0 && (
        <div className="comparison-bar">
          <div className="selected-count">
            {selectedProducts.length} products selected
          </div>
          <button 
            onClick={handleCompare}
            className="compare-button"
            disabled={selectedProducts.length < 2}
          >
            Compare Selected
          </button>
          <button 
            onClick={() => setSelectedProducts([])}
            className="clear-button"
          >
            Clear Selection
          </button>
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <>
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-card-inner">
                  <div 
                    className="product-image-container" 
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    <img 
                      src={product.image_url || product.logo || hero} 
                      alt={product.name} 
                      className="product-image" 
                    />
                  </div>
                  <div className="product-content" onClick={() => navigate(`/products/${product.id}`)}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="product-footer">
                      <span className="price">${product.price}</span>
                      {isAuthenticated && (
                        <span className={`status ${product.status}`}>{product.status}</span>
                      )}
                    </div>
                  </div>
                  <div className="compare-checkbox">
                    <input
                      type="checkbox"
                      id={`compare-${product.id}`}
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleProductSelection(product.id)}
                    />
                    <label htmlFor={`compare-${product.id}`}>Compare</label>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Previous
            </button>
            {renderPagination()}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, products.totalPages))}
              disabled={currentPage === products.totalPages}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default ProductList;