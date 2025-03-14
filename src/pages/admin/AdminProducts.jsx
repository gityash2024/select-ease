import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Plus, Edit, Trash, Search, Package, Clock, User, X, Image, Link as LinkIcon, DollarSign, Tag } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { productAPI, categoryAPI } from '../../services/api';
import adminAPI from './adminApi';
import ProductDetailModal from '../ProductDetailModal';

const API_URL = 'https://select-ease-backend-1.onrender.com/api';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
};
const Spinner = styled.div`
  border: 3px solid rgba(0, 0, 0, 0.1);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border-top-color: #026283;
  animation: spin 1s ease-in-out infinite;
  margin-left: 10px;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const UploadWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;
const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #111827;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #026283;
  color: white;
  border: none;
  
  &:hover {
    background-color: #015272;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  background-color: white;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 0.5rem;
  outline: none;
  font-size: 0.95rem;
`;

const SearchIcon = styled(Search)`
  color: #6b7280;
`;

const ProductsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ProductCard = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &.pending-own-product {
    opacity: 0.7;
    position: relative;
  }
  
  &.pending-own-product::after {
    content: "Pending Review";
    position: absolute;
    top: 0;
    right: 0;
    background-color: #f59e0b;
    color: white;
    padding: 4px 8px;
    font-size: 12px;
    border-bottom-left-radius: 8px;
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 180px;
  background-color: #f3f4f6;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductContent = styled.div`
  padding: 1.25rem;
  cursor: pointer;
`;

const ProductTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: #111827;
  cursor: pointer;
`;

const ProductDescription = styled.p`
  margin: 0 0 1.25rem 0;
  color: #374151;
  font-size: 0.95rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: pointer;
  height: 4.5em; /* Set a fixed height for 3 lines of text */
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
`;

const ProductLogo = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  font-size: 0.85rem;
  color: #6b7280;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ProductStatus = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 1rem;
  
  &.published {
    background-color: #dcfce7;
    color: #166534;
  }
  
  &.pending {
    background-color: #fef3c7;
    color: #92400e;
  }
  
  &.denied {
    background-color: #fee2e2;
    color: #991b1b;
  }
`;

const ProductActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ActionButtonSmall = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.edit {
    background-color: #f3f4f6;
    color: #1f2937;
    border: 1px solid #e5e7eb;
    
    &:hover {
      background-color: #e5e7eb;
    }
  }
  
  &.delete {
    background-color: #fef2f2;
    color: #ef4444;
    border: 1px solid #fee2e2;
    
    &:hover {
      background-color: #fee2e2;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const EmptyStateTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #111827;
`;

const EmptyStateDescription = styled.p`
  color: #6b7280;
  margin-bottom: 1.5rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  background-color: ${props => props.active ? '#026283' : 'white'};
  color: ${props => props.active ? 'white' : '#374151'};
  cursor: pointer;
  
  &:hover:not(:disabled) {
    background-color: ${props => props.active ? '#015272' : '#f3f4f6'};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: #111827;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: #111827;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
  overflow-x: hidden;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1.25rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.95rem;
  width: 100%;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #026283;
    box-shadow: 0 0 0 2px rgba(2, 98, 131, 0.1);
  }
  
  &[type="file"] {
    padding: 0.5rem;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.95rem;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #026283;
    box-shadow: 0 0 0 2px rgba(2, 98, 131, 0.1);
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.95rem;
  width: 100%;
  resize: vertical;
  min-height: 120px;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #026283;
    box-shadow: 0 0 0 2px rgba(2, 98, 131, 0.1);
  }
`;

const ImagePreview = styled.div`
  margin-top: 0.5rem;
  width: 100px;
  height: 100px;
  border-radius: 4px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  background-color: #f9fafb;
`;

const CancelButton = styled.button`
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: white;
  color: #374151;
  border: 1px solid #d1d5db;
  
  &:hover {
    background-color: #f3f4f6;
  }
`;

const SaveButton = styled.button`
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #026283;
  color: white;
  border: none;
  
  &:hover {
    background-color: #015272;
  }
  
  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const ConfirmDialog = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  padding: 1.5rem;
`;

const ConfirmTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: #111827;
`;

const ConfirmText = styled.p`
  margin: 0 0 1.5rem 0;
  color: #6b7280;
`;

const ConfirmButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const DetailOverlay = styled(ModalOverlay)`
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isLogoUploading, setIsLogoUploading] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    status: 'pending',
    url: '',
    logo: '',
    image_url: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    const user = adminAPI.admin.getCurrentUser();
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getCategoryName(product.category_id)?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
    setCurrentPage(1);
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      const response = await adminAPI.products.getAll();
      if (response.data && response.data.products) {
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAllCategories();
      if (response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Uncategorized';
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category_id: product.category_id || '',
        status: product.status || 'pending',
        url: product.url || '',
        logo: product.logo || '',
        image_url: product.image_url || ''
      });
    } else {
      setCurrentProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category_id: '',
        status: 'pending',
        url: '',
        logo: '',
        image_url: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setCurrentProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category_id: '',
        status: 'pending',
        url: '',
        logo: '',
        image_url: ''
      });
    }, 300);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.price || !formData.category_id) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const processedFormData = {
      ...formData,
      price: parseFloat(formData.price),
      category_id: parseInt(formData.category_id, 10)
    };
    
    setIsSubmitting(true);
    try {
      if (currentProduct) {
        await adminAPI.products.update(currentProduct.id, processedFormData);
        toast.success('Product updated successfully');
      } else {
        await adminAPI.products.create(processedFormData);
        toast.success('Product created successfully');
      }
      
      handleCloseModal();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(error.response?.data?.message || 'Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleOpenConfirm = (product, e) => {
    e.stopPropagation();
    setCurrentProduct(product);
    setIsConfirmOpen(true);
  };

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
    setTimeout(() => setCurrentProduct(null), 300);
  };

  const handleDelete = async () => {
    if (!currentProduct) return;

    try {
      await adminAPI.products.delete(currentProduct.id);
      toast.success('Product deleted successfully');
      handleCloseConfirm();
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setIsImageUploading(true);
    try {
      const response = await adminAPI.products.uploadImage(formData);
      setFormData(prev => ({ ...prev, image_url: response.data.imageUrl }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
      console.error('Upload error:', error);
    } finally {
      setIsImageUploading(false);
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setIsLogoUploading(true);
    try {
      const response = await adminAPI.products.uploadImage(formData);
      setFormData(prev => ({ ...prev, logo: response.data.imageUrl }));
      toast.success('Logo uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload logo');
      console.error('Upload error:', error);
    } finally {
      setIsLogoUploading(false);
    }
  };

  const handleEditClick = (product, e) => {
    e.stopPropagation();
    handleOpenModal(product);
  };

  const isVendorProduct = (product) => {
    return currentUser && 
           currentUser.is_vendor && 
           !currentUser.is_admin && 
           product.user_id === currentUser.id &&
           product.status !== 'published';
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <PageHeader>
        <Title><Package size={24} /> Manage Products</Title>
        <ActionButton onClick={() => handleOpenModal()}>
          <Plus size={18} /> Add New Product
        </ActionButton>
      </PageHeader>

      <SearchContainer>
        <SearchIcon size={20} />
        <SearchInput
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>

      {currentProducts.length > 0 ? (
        <>
          <ProductsGrid
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            initial="hidden"
            animate="visible"
          >
            {currentProducts.map(product => (
              <ProductCard 
                key={product.id} 
                variants={fadeIn} 
                onClick={() => handleCardClick(product)}
                className={isVendorProduct(product) ? 'pending-own-product' : ''}
              >
                <ProductImage>
                  <img
                    src={product.image_url || 'https://via.placeholder.com/300x180?text=Product+Image'}
                    alt={product.name}
                  />
                  {product.logo && (
                    <ProductLogo>
                      <img src={product.logo} alt={`${product.name} logo`} />
                    </ProductLogo>
                  )}
                </ProductImage>
                <ProductContent>
                  <ProductStatus className={product.status || 'pending'}>
                    {product.status?.charAt(0).toUpperCase() + product.status?.slice(1) || 'Pending'}
                  </ProductStatus>
                  <ProductTitle>{product.name}</ProductTitle>
                  <ProductMeta>
                    <MetaItem>
                      <DollarSign size={14} />
                      {parseFloat(product.price).toFixed(2)}
                    </MetaItem>
                    <MetaItem>
                      <Tag size={14} />
                      {getCategoryName(product.category_id)}
                    </MetaItem>
                  </ProductMeta>
                  <ProductDescription>
                    {product.description?.substring(0, 120) + (product.description?.length > 120 ? '...' : '')}
                  </ProductDescription>
                  <ProductActions>
                    <ActionButtonSmall
                      className="edit"
                      onClick={(e) => handleEditClick(product, e)}
                    >
                      <Edit size={16} /> Edit
                    </ActionButtonSmall>
                    <ActionButtonSmall
                      className="delete"
                      onClick={(e) => handleOpenConfirm(product, e)}
                    >
                      <Trash size={16} /> Delete
                    </ActionButtonSmall>
                  </ProductActions>
                </ProductContent>
              </ProductCard>
            ))}
          </ProductsGrid>

          {totalPages > 1 && (
            <Pagination>
              <PaginationButton
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </PaginationButton>

              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationButton
                  key={index}
                  active={currentPage === index + 1}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </PaginationButton>
              ))}

              <PaginationButton
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </PaginationButton>
            </Pagination>
          )}
        </>
      ) : (
        <EmptyState>
          <EmptyStateTitle>No products found</EmptyStateTitle>
          <EmptyStateDescription>
            {searchTerm
              ? `No products matching "${searchTerm}". Try a different search term or clear the search.`
              : 'Get started by creating your first product.'}
          </EmptyStateDescription>
          <ActionButton onClick={() => handleOpenModal()}>
            <Plus size={18} /> Create Your First Product
          </ActionButton>
        </EmptyState>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ModalHeader>
                <ModalTitle>{currentProduct ? 'Edit Product' : 'Add New Product'}</ModalTitle>
                <CloseButton onClick={handleCloseModal}>
                  <X size={24} />
                </CloseButton>
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label><Package size={16} /> Product Name</Label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter product name"
                      required
                    />
                  </FormGroup>

                  <FormRow>
                    <FormGroup>
                      <Label><DollarSign size={16} /> Price</Label>
                      <Input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label><Tag size={16} /> Category</Label>
                      <Select
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </Select>
                    </FormGroup>
                  </FormRow>

                  <FormGroup>
                    <Label><LinkIcon size={16} /> Website URL</Label>
                    <Input
                      type="url"
                      name="url"
                      value={formData.url}
                      onChange={handleInputChange}
                      placeholder="https://example.com"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label><Image size={16} /> Product Image</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isImageUploading}
                    />
                    {isImageUploading && (
                      <UploadWrapper>
                        <span>Uploading...</span>
                        <Spinner />
                      </UploadWrapper>
                    )}
                    {formData.image_url && !isImageUploading && (
                      <ImagePreview>
                        <img src={formData.image_url} alt="Product" />
                      </ImagePreview>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label><Image size={16} /> Product Logo</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      disabled={isLogoUploading}
                    />
                    {isLogoUploading && (
                      <UploadWrapper>
                        <span>Uploading...</span>
                        <Spinner />
                      </UploadWrapper>
                    )}
                    {formData.logo && !isLogoUploading && (
                      <ImagePreview>
                        <img src={formData.logo} alt="Logo" />
                      </ImagePreview>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label><Package size={16} /> Status</Label>
                    <Select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="pending">Pending</option>
                      <option value="published">Published</option>
                      <option value="denied">Denied</option>
                    </Select>
                  </FormGroup>

                  <FormGroup>
                    <Label><Package size={16} /> Description</Label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter product description"
                      rows={4}
                      required
                    />
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <CancelButton type="button" onClick={handleCloseModal}>
                  Cancel
                </CancelButton>
                <SaveButton type="button" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : (currentProduct ? 'Update Product' : 'Create Product')}
                </SaveButton>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isConfirmOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ConfirmDialog
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ConfirmTitle>Delete Product</ConfirmTitle>
              <ConfirmText>
                Are you sure you want to delete "{currentProduct?.name}"? This action cannot be undone.
              </ConfirmText>
              <ConfirmButtons>
                <CancelButton onClick={handleCloseConfirm}>
                  Cancel
                </CancelButton>
                <ActionButtonSmall
                  className="delete"
                  onClick={handleDelete}
                  style={{ backgroundColor: '#ef4444', color: 'white', borderColor: '#ef4444' }}
                >
                  <Trash size={16} /> Delete
                </ActionButtonSmall>
              </ConfirmButtons>
            </ConfirmDialog>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {showDetailModal && selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setShowDetailModal(false)}
        />
      )}
    </div>
  );
};

export default AdminProducts;