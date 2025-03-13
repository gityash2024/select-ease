import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { productAPI, categoryAPI } from '../services/api';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import hero from '../assets/Hero.png';
import './ProductForm.css';

const EditProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const productId = id || new URLSearchParams(location.search).get('id');
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    url: '',
    logo: '',
    image_url: '',
    status: 'pending'
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      toast('Please login to edit a product', {
        icon: 'ℹ️',
      });
      navigate('/login');
    }
  }, [navigate]);
  
  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    } else {
      navigate('/');
    }
    fetchCategories();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getProductById(productId);
      const product = response.data;
      
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category_id: product.category_id || '',
        url: product.url || '',
        logo: product.logo || '',
        image_url: product.image_url || '',
        status: product.status || 'pending'
      });
    } catch (error) {
      console.error('Error fetching product details:', error);
      toast.error('Failed to fetch product details');
      navigate('/');
    } finally {
      setLoading(false);
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

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast('Please login to update a product', {
        icon: 'ℹ️',
      });
      navigate('/login');
      return;
    }
    setLoading(true);
    try {
      await productAPI.updateProduct(productId, formData);
      toast.success('Product updated successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };
  
  const handleFormInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      setLoading(true);
      const response = await productAPI.uploadImage(formData);
      setFormData(prev => ({ ...prev, image_url: response.data.imageUrl }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      setLoading(true);
      const response = await productAPI.uploadImage(formData);
      setFormData(prev => ({ ...prev, logo: response.data.imageUrl }));
      toast.success('Logo uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload logo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-page">
      <div className="hero-section">
        <img src={hero} alt="" className="hero-background" />
        <div className="hero-container">
          <button onClick={() => navigate('/')} className="back-button">
            <ArrowLeft size={20} />
            Back to Products
          </button>
          <h1>Edit Product</h1>
        </div>
      </div>

      <div className="form-container">
        {loading && !formData.name ? (
          <div className="loading-indicator">Loading product details...</div>
        ) : (
          <form onSubmit={handleUpdateProduct}>
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
              <label>Product Image</label>
              <input
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
              />
              {formData.image_url && (
                <div className="image-preview">
                  <img src={formData.image_url} alt="Product Preview" width="100" />
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Logo</label>
              <input
                type="file"
                onChange={handleLogoUpload}
                accept="image/*"
              />
              {formData.logo && (
                <div className="image-preview">
                  <img src={formData.logo} alt="Logo Preview" width="100" />
                </div>
              )}
            </div>
            {isAuthenticated && (
              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleFormInputChange('status', e.target.value)}
                  autoComplete="off"
                >
                  <option value="pending">Pending</option>
                  <option value="published">Published</option>
                  <option value="denied">Denied</option>
                </select>
              </div>
            )}
            <div className="form-actions">
              <button type="button" onClick={() => navigate('/')} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Updating...' : 'Update Product'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProduct;