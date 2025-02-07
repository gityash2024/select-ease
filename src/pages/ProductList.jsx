import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI, categoryAPI, authAPI } from '../services/api';
import { X, User, Search, Filter, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import hero from '../assets/Hero.png';
import './ProductList.css';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState({ products: [], total: 0, page: 1, limit: 10, totalPages: 0 });
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priceRange: '',
    status: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    url: '',
    logo: ''
  });

  const [authData, setAuthData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    isVendor: false
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchProducts(currentPage);
      fetchCategories();
    } else {
      setShowAuthModal(true);
    }
  }, [currentPage, isAuthenticated]);

  const fetchProducts = async (page) => {
    if (!isAuthenticated) return;
    try {
      const response = await productAPI.getAllProducts(page);
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to fetch products');
    }
  };

  const fetchCategories = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await categoryAPI.getAllCategories();
      setCategories(response.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setLoading(true);
    try {
      await productAPI.createProduct(formData);
      toast.success('Product added successfully');
      setShowAddModal(false);
      fetchProducts(1);
      setCurrentPage(1);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      if (isLogin) {
        response = await authAPI.login({
          email: authData.email,
          password: authData.password
        });
      } else {
        if (authData.password !== authData.confirmPassword) {
          toast.error('Passwords do not match');
          setLoading(false);
          return;
        }
        response = await authAPI.signup({
          username: authData.username,
          email: authData.email,
          password: authData.password,
          firstName: authData.firstName,
          lastName: authData.lastName,
          is_vendor: authData.isVendor,
          is_admin: false
        });
      }

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setShowAuthModal(false);
        setIsAuthenticated(true);
        toast.success(isLogin ? 'Login successful!' : 'Account created successfully!');
      } else {
        toast.error('Authentication failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      setShowAddModal(true);
    }
  };

  const filteredProducts = products.products?.filter(product => {
    return (
      product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      (!filters.category || product.category_id === parseInt(filters.category)) &&
      (!filters.status || product.status === filters.status)
    );
  });

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

      {isAuthenticated && (
        <>
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
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>

            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="published">Published</option>
              <option value="denied">Denied</option>
            </select>
          </div>

          {filteredProducts?.length > 0 ? (
            <>
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <div key={product.id} className="product-card" onClick={() => navigate(`/products/${product.id}`)}>
                    <img src={product.logo || hero} alt={product.name} className="product-image" />
                    <div className="product-content">
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <div className="product-footer">
                        <span className="price">${product.price}</span>
                        <span className={`status ${product.status}`}>{product.status}</span>
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
        </>
      )}

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowAddModal(false)}>
              <X size={24} />
            </button>
            <h2>Add New Product</h2>
            <form onSubmit={handleAddProduct}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Website URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Logo URL</label>
                <input
                  type="url"
                  value={formData.logo}
                  onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
                />
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Adding...' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}

      {showAuthModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowAuthModal(false)}>
              <X size={24} />
            </button>
            <div className="modal-header">
              <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
              <p>{isLogin ? 'Sign in to continue' : 'Register to get started'}</p>
            </div>
            
            <form className="auth-form" onSubmit={handleAuthSubmit}>
              {!isLogin && (
                <>
                  <div className="form-group">
                    <label>Username</label>
                    <input 
                      type="text" 
                      name="username"
                      placeholder="Enter username"
                      value={authData.username}
                      onChange={(e) => setAuthData(prev => ({ ...prev, username: e.target.value }))}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input 
                        type="text" 
                        name="firstName"
                        placeholder="First name"
                        value={authData.firstName}
                        onChange={(e) => setAuthData(prev => ({ ...prev, firstName: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input 
                        type="text" 
                        name="lastName"
                        placeholder="Last name"
                        value={authData.lastName}
                        onChange={(e) => setAuthData(prev => ({ ...prev, lastName: e.target.value }))}
                      />
                    </div>
                  </div>
                </>
              )}
              
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Enter email"
                  value={authData.email}
                  onChange={(e) => setAuthData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  name="password"
                  placeholder="Enter password"
                  value={authData.password}
                  onChange={(e) => setAuthData(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>
              
              {!isLogin && (
                <>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input 
                      type="password" 
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={authData.confirmPassword}
                      onChange={(e) => setAuthData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    />
                  </div>
                  <div className="checkbox-group">
                    <label>
                      <input 
                        type="checkbox"
                        name="isVendor"
                        checked={authData.isVendor}
                        onChange={(e) => setAuthData(prev => ({ ...prev, isVendor: e.target.checked }))}
                      />
                      <span>I want to register as a vendor</span>
                    </label>
                  </div>
                </>
              )}
              
              <button type="submit" className="auth-submit">
                {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  className="toggle-auth" 
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;