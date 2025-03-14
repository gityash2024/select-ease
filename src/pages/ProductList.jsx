import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI, categoryAPI } from '../services/api';
import { Search, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import hero from '../assets/Hero.png';
import './ProductList.css';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const StyledProductListPage = styled(motion.div)`
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
`;

const StyledAddProductBtn = styled(motion.button)`
  background: #026283;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #015272;
  }
`;

const StyledFiltersSection = styled(motion.div)`
display: flex;
flex-wrap: wrap;
gap: 16px;
margin-bottom: 24px;
max-width: 1200px;
margin: 0 auto 24px;
padding: 0 20px;
`;

const StyledSearchFilter = styled(motion.div)`
display: flex;
align-items: center;
background: white;
border-radius: 8px;
padding: 8px 16px;
flex: 1;
min-width: 250px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

input {
  border: none;
  outline: none;
  width: 100%;
  margin-left: 8px;
  font-size: 14px;
}
`;

const StyledFilterDropdown = styled(motion.select)`
padding: 8px 16px;
border-radius: 8px;
border: 1px solid #e5e7eb;
background: white;
font-size: 14px;
cursor: pointer;
min-width: 150px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const StyledComparisonBar = styled(motion.div)`
display: flex;
align-items: center;
gap: 16px;
padding: 12px 20px;
background: #f8fafc;
border-radius: 8px;
margin: 0 auto 24px;
max-width: 1200px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const StyledSelectedCount = styled.div`
flex: 1;
font-weight: 500;
color: #4b5563;
`;

const StyledCompareButton = styled(motion.button)`
background: #026283;
color: white;
border: none;
border-radius: 8px;
padding: 8px 16px;
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

const StyledClearButton = styled(motion.button)`
background: white;
color: #4b5563;
border: 1px solid #e5e7eb;
border-radius: 8px;
padding: 8px 16px;
font-weight: 500;
cursor: pointer;
transition: all 0.2s;

&:hover {
  background: #f9fafb;
  color: #1f2937;
}
`;

const StyledProductsGrid = styled(motion.div)`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
gap: 24px;
max-width: 1200px;
margin: 0 auto;
padding: 0 20px;
`;

const StyledProductCard = styled(motion.div)`
background: white;
border-radius: 12px;
overflow: hidden;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
transition: all 0.3s ease;
`;

const StyledProductCardInner = styled.div`
display: flex;
flex-direction: column;
height: 100%;
`;

const StyledProductImageContainer = styled.div`
width: 100%;
height: 180px;
overflow: hidden;
cursor: pointer;
`;

const StyledProductImage = styled(motion.img)`
width: 100%;
height: 100%;
object-fit: cover;
transition: transform 0.5s ease;
`;

const StyledProductContent = styled.div`
padding: 16px;
flex: 1;
cursor: pointer;

h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #111827;
}

p {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
`;

const StyledProductFooter = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`;

const StyledPrice = styled.span`
font-weight: 600;
color: #026283;
`;

const StyledStatus = styled.span`
font-size: 12px;
padding: 4px 8px;
border-radius: 20px;

&.pending {
  background: #fff7ed;
  color: #ea580c;
}

&.published {
  background: #ecfdf5;
  color: #059669;
}

&.denied {
  background: #fef2f2;
  color: #dc2626;
}
`;

const StyledCompareCheckbox = styled(motion.div)`
padding: 8px 16px;
border-top: 1px solid #f3f4f6;
display: flex;
align-items: center;

input {
  margin-right: 8px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

label {
  font-size: 14px;
  color: #4b5563;
  cursor: pointer;
}
`;

const StyledPagination = styled(motion.div)`
display: flex;
justify-content: center;
gap: 8px;
margin: 40px auto;
max-width: 1200px;
`;

const StyledPaginationBtn = styled(motion.button)`
padding: 8px 12px;
border: 1px solid #e5e7eb;
background: white;
border-radius: 8px;
cursor: pointer;
transition: all 0.2s;

&:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #d1d5db;
}

&:disabled {
  color: #9ca3af;
  cursor: not-allowed;
}

&.active {
  background: #026283;
  color: white;
  border-color: #026283;
}
`;

const StyledEmptyState = styled(motion.div)`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;
padding: 80px 20px;
max-width: 500px;
margin: 0 auto;

h3 {
  margin: 24px 0 8px;
  color: #111827;
  font-size: 20px;
}

p {
  color: #6b7280;
  margin-bottom: 24px;
}
`;

const StyledLoadingContainer = styled(motion.div)`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 400px;
`;

const StyledLoadingSpinner = styled(motion.div)`
width: 40px;
height: 40px;
border: 4px solid rgba(2, 98, 131, 0.1);
border-radius: 50%;
border-top-color: #026283;
margin-bottom: 16px;
`;

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
    setLoading(true);
    const response = await productAPI.getAllProducts(page);
    setProducts(response.data);
  } catch (error) {
    console.error('Error fetching products:', error);
    if (error.response?.status === 401) {
      navigate('/login');
    } else {
      toast.error('Failed to fetch products');
    }
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
      <StyledPaginationBtn
        key={i}
        onClick={() => setCurrentPage(i)}
        className={currentPage === i ? 'active' : ''}
        whileHover={{ scale: currentPage !== i ? 1.05 : 1 }}
        whileTap={{ scale: 0.95 }}
      >
        {i}
      </StyledPaginationBtn>
    );
  }
  return pages;
};

const EmptyState = () => (
  <StyledEmptyState
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Package 
      size={64} 
      color="#9ca3af"
      opacity={0.5}
    />
    <h3>No Products Found</h3>
    <p>Start by adding your first product or try a different search</p>
    <StyledAddProductBtn
      onClick={handleAddClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Add Product
    </StyledAddProductBtn>
  </StyledEmptyState>
);

if (loading && currentPage === 1) {
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Loading products...
      </motion.p>
    </StyledLoadingContainer>
  );
}

return (
  <StyledProductListPage
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
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Products
        </motion.h1>
        <StyledAddProductBtn
          onClick={handleAddClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Add Product
        </StyledAddProductBtn>
      </StyledHeroContainer>
    </StyledHeroSection>

    <StyledFiltersSection
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <StyledSearchFilter
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        whileHover={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" }}
      >
        <Search size={20} />
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
        />
      </StyledSearchFilter>

      <StyledFilterDropdown
        value={filters.category}
        onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        whileHover={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" }}
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </StyledFilterDropdown>

      {isAuthenticated && (
        <StyledFilterDropdown
          value={filters.status}
          onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
          whileHover={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" }}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="published">Published</option>
          <option value="denied">Denied</option>
        </StyledFilterDropdown>
      )}
    </StyledFiltersSection>
    
    <AnimatePresence>
      {selectedProducts.length > 0 && (
        <StyledComparisonBar
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <StyledSelectedCount>
            {selectedProducts.length} products selected
          </StyledSelectedCount>
          <StyledCompareButton 
            onClick={handleCompare}
            disabled={selectedProducts.length < 2}
            whileHover={{ scale: selectedProducts.length >= 2 ? 1.05 : 1 }}
            whileTap={{ scale: selectedProducts.length >= 2 ? 0.95 : 1 }}
          >
            Compare Selected
          </StyledCompareButton>
          <StyledClearButton 
            onClick={() => setSelectedProducts([])}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear Selection
          </StyledClearButton>
        </StyledComparisonBar>
      )}
    </AnimatePresence>

    {filteredProducts.length > 0 ? (
      <>
        <StyledProductsGrid
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {filteredProducts.map((product, index) => (
            <StyledProductCard
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index % 10), duration: 0.3 }}
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
            >
              <StyledProductCardInner>
                <StyledProductImageContainer 
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  <StyledProductImage 
                    src={product.image_url || product.logo || hero} 
                    alt={product.name}
                    whileHover={{ scale: 1.1 }}
                  />
                </StyledProductImageContainer>
                <StyledProductContent onClick={() => navigate(`/products/${product.id}`)}>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <StyledProductFooter>
                    <StyledPrice>${product.price}</StyledPrice>
                    {isAuthenticated && (
                      <StyledStatus className={product.status}>{product.status}</StyledStatus>
                    )}
                  </StyledProductFooter>
                </StyledProductContent>
                <StyledCompareCheckbox
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + 0.1 * (index % 10), duration: 0.3 }}
                >
                  <input
                    type="checkbox"
                    id={`compare-${product.id}`}
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleProductSelection(product.id)}
                  />
                  <label htmlFor={`compare-${product.id}`}>Compare</label>
                </StyledCompareCheckbox>
              </StyledProductCardInner>
            </StyledProductCard>
          ))}
        </StyledProductsGrid>
        <StyledPagination
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.3 }}
        >
          <StyledPaginationBtn
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            whileHover={{ scale: currentPage !== 1 ? 1.05 : 1 }}
            whileTap={{ scale: currentPage !== 1 ? 0.95 : 1 }}
          >
            Previous
          </StyledPaginationBtn>
          {renderPagination()}
          <StyledPaginationBtn
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, products.totalPages))}
            disabled={currentPage === products.totalPages}
            whileHover={{ scale: currentPage !== products.totalPages ? 1.05 : 1 }}
            whileTap={{ scale: currentPage !== products.totalPages ? 0.95 : 1 }}
          >
            Next
          </StyledPaginationBtn>
        </StyledPagination>
      </>
    ) : (
      <EmptyState />
    )}
  </StyledProductListPage>
);
};

export default ProductList;