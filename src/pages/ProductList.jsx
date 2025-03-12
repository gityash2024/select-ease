import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI, categoryAPI } from '../services/api';
import { X, User, Search, Filter, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import hero from '../assets/Hero.png';
import './ProductList.css';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState({ products: [], total: 0, page: 1, limit: 10, totalPages: 0 });
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);  
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

  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.info('Please login to add a product');
      navigate('/login');
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
  
  const handleFormInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddClick = () => {
    if (!isAuthenticated) {
      toast.info('Please login to add a product');
      navigate('/login');
    } else {
      setShowAddModal(true);
    }
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
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="published">Published</option>
            <option value="denied">Denied</option>
          </select>
        )}
      </div>

      {filteredProducts.length > 0 ? (
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
                    {isAuthenticated && (
                      <span className={`status ${product.status}`}>{product.status}</span>
                    )}
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
                  onChange={(e) => handleFormInputChange('name', e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleFormInputChange('description', e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleFormInputChange('price', e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={formData.category_id}
                  onChange={(e) => handleFormInputChange('category_id', e.target.value)}
                  required
                  autoComplete="off"
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
                  onChange={(e) => handleFormInputChange('url', e.target.value)}
                  autoComplete="url"
                />
              </div>
              <div className="form-group">
                <label>Logo URL</label>
                <input
                  type="url"
                  value={formData.logo}
                  onChange={(e) => handleFormInputChange('logo', e.target.value)}
                  autoComplete="off"
                />
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Adding...' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;