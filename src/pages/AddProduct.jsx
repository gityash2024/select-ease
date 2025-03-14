import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI, categoryAPI } from '../services/api';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import hero from '../assets/Hero.png';
import './ProductForm.css';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const StyledProductFormPage = styled(motion.div)`
  width: 100%;
`;

const StyledHeroSection = styled(motion.div)`
  position: relative;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255,255,240,0.2) 0%, rgba(230,255,255,0.2) 100%);
  margin-bottom: 40px;
  overflow: hidden;
`;

const StyledHeroBackground = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const StyledHeroContainer = styled(motion.div)`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
`;

const StyledHeroHeader = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledBackButton = styled(motion.button)`
  position: absolute;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }
`;

const StyledFormContainer = styled(motion.div)`
  max-width: 830px;
  margin: 0 auto 40px;
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledFormGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 500;
    color: #374151;
  }

  input, textarea, select {
    padding: 12px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus {
      outline: none;
      border-color: #026283;
      box-shadow: 0 0 0 2px rgba(2, 98, 131, 0.1);
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

const StyledFormActions = styled(motion.div)`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 16px;
`;

const StyledCancelBtn = styled(motion.button)`
  padding: 12px 24px;
  background: white;
  color: #4b5563;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f9fafb;
    color: #111827;
  }
`;

const StyledSubmitBtn = styled(motion.button)`
  padding: 12px 24px;
  background: #026283;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #015272;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const StyledUploadLoading = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
`;

const StyledSpinner = styled(motion.div)`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(2, 98, 131, 0.1);
  border-radius: 50%;
  border-top-color: #026283;
`;

const StyledImagePreview = styled(motion.div)`
  margin-top: 12px;
  
  img {
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
`;

const StyledLoadingContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

const StyledLoadingSpinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(2, 98, 131, 0.1);
  border-radius: 50%;
  border-top-color: #026283;
  margin-bottom: 20px;
`;

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    url: '',
    logo: '',
    image_url: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      toast('Please login to add a product', {
        icon: 'ℹ️',
      });
      navigate('/login');
    }
  }, [navigate]);
  
  useEffect(() => {
    fetchCategories();
  }, []);

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
      toast('Please login to add a product', {
        icon: 'ℹ️',
      });
      navigate('/login');
      return;
    }
    setLoading(true);
    try {
      await productAPI.createProduct(formData);
      toast.success('Product added successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to add product');
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
      setImageUploading(true);
      const response = await productAPI.uploadImage(formData);
      setFormData(prev => ({ ...prev, image_url: response.data.imageUrl }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setImageUploading(false);
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      setLogoUploading(true);
      const response = await productAPI.uploadImage(formData);
      setFormData(prev => ({ ...prev, logo: response.data.imageUrl }));
      toast.success('Logo uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload logo');
    } finally {
      setLogoUploading(false);
    }
  };

  if (!isAuthenticated && loading) {
    return (
      <StyledLoadingContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <StyledLoadingSpinner
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Checking authentication...
        </motion.p>
      </StyledLoadingContainer>
    );
  }

  return (
    <StyledProductFormPage
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <StyledHeroSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <StyledHeroBackground 
          src={hero} 
          alt="" 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7 }}
        />
        <StyledHeroContainer>
          <StyledHeroHeader>
            <StyledBackButton 
              onClick={() => navigate('/products')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <ArrowLeft size={20} />
              Back to Products
            </StyledBackButton>
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Add New Product
            </motion.h1>
          </StyledHeroHeader>
        </StyledHeroContainer>
      </StyledHeroSection>

      <StyledFormContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <StyledForm onSubmit={handleAddProduct}>
          <StyledFormGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <label>Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleFormInputChange('name', e.target.value)}
              required
              autoComplete="off"
              placeholder="Enter product name"
            />
          </StyledFormGroup>
          <StyledFormGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleFormInputChange('description', e.target.value)}
              required
              autoComplete="off"
              placeholder="Describe your product"
            />
          </StyledFormGroup>
          <StyledFormGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            <label>Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => handleFormInputChange('price', e.target.value)}
              required
              autoComplete="off"
              placeholder="Enter price"
            />
          </StyledFormGroup>
          <StyledFormGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
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
          </StyledFormGroup>
          <StyledFormGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.3 }}
          >
            <label>Website URL</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => handleFormInputChange('url', e.target.value)}
              autoComplete="url"
              placeholder="https://example.com"
            />
          </StyledFormGroup>
          <StyledFormGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.3 }}
          >
            <label>Product Image</label>
            <input
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              disabled={imageUploading}
            />
            <AnimatePresence>
              {imageUploading && (
                <StyledUploadLoading
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <StyledSpinner
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Uploading image...</span>
                  </StyledUploadLoading>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {formData.image_url && !imageUploading && (
                  <StyledImagePreview
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img 
                      src={formData.image_url} 
                      alt="Product Preview" 
                      width="100"
                      whileHover={{ scale: 1.05 }}
                    />
                  </StyledImagePreview>
                )}
              </AnimatePresence>
            </StyledFormGroup>
            <StyledFormGroup
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.3 }}
            >
              <label>Logo</label>
              <input
                type="file"
                onChange={handleLogoUpload}
                accept="image/*"
                disabled={logoUploading}
              />
              <AnimatePresence>
                {logoUploading && (
                  <StyledUploadLoading
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <StyledSpinner
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Uploading logo...</span>
                  </StyledUploadLoading>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {formData.logo && !logoUploading && (
                  <StyledImagePreview
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img 
                      src={formData.logo} 
                      alt="Logo Preview" 
                      width="100"
                      whileHover={{ scale: 1.05 }}
                    />
                  </StyledImagePreview>
                )}
              </AnimatePresence>
            </StyledFormGroup>
            <StyledFormActions
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.3 }}
            >
              <StyledCancelBtn 
                type="button" 
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </StyledCancelBtn>
              <StyledSubmitBtn 
                type="submit" 
                disabled={loading || imageUploading || logoUploading}
                whileHover={{ scale: loading || imageUploading || logoUploading ? 1 : 1.05 }}
                whileTap={{ scale: loading || imageUploading || logoUploading ? 1 : 0.95 }}
              >
                {loading ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Adding...
                  </motion.span>
                ) : (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Add Product
                  </motion.span>
                )}
              </StyledSubmitBtn>
            </StyledFormActions>
          </StyledForm>
        </StyledFormContainer>
      </StyledProductFormPage>
    );
  };
  
  export default AddProduct;