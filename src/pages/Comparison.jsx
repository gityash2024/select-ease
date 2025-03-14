import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { productAPI, categoryAPI } from '../services/api';
import './Comparison.css';
import { Star, Check, X, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import hero from '../assets/Hero.png';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const StyledComparisonPage = styled(motion.div)`
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
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
`;

const StyledComparisonContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const StyledComparisonHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const StyledBackButton = styled(motion.button)`
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

const StyledComparisonTableContainer = styled(motion.div)`
  border-radius: 12px;
  background: white;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  overflow-x: auto;
`;

const StyledComparisonTable = styled(motion.table)`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 16px;
    text-align: center;
    border-bottom: 1px solid #f3f4f6;
  }

  th {
    background: #f9fafb;
    font-weight: 600;
    color: #111827;
  }

  td {
    color: #4b5563;
  }

  th.feature-column, td.feature-name {
    text-align: left;
    font-weight: 500;
    color: #111827;
    background: #f9fafb;
    position: sticky;
    left: 0;
    z-index: 10;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background: #f9fafb;
  }

  tr:hover td.feature-name {
    background: #f3f4f6;
  }
`;

const StyledProductHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  h3 {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: #111827;
  }
`;

const StyledProductLogo = styled(motion.img)`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
`;

const StyledProductImage = styled(motion.img)`
  width: 160px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
`;

const StyledComparisonStars = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const StyledRatingValue = styled.span`
  margin-left: 4px;
  font-size: 14px;
  color: #6b7280;
`;

const StyledStatusBadge = styled.span`
  display: inline-block;
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

const StyledDescriptionCell = styled.td`
  max-width: 200px;
  white-space: normal;
  font-size: 14px;
`;

const StyledWebsiteLink = styled(motion.a)`
  color: #026283;
  text-decoration: none;
  display: inline-block;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const StyledNaText = styled.span`
  color: #9ca3af;
  font-style: italic;
`;

const StyledProductActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledViewBtn = styled(motion.button)`
  background: #026283;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #015272;
  }
`;

const StyledReviewBtn = styled(motion.button)`
  background: white;
  color: #026283;
  border: 1px solid #026283;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f0f9ff;
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

const StyledComparisonError = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 20px;
  max-width: 500px;
  margin: 0 auto;
  
  h2 {
    margin: 0 0 16px;
    color: #111827;
    font-size: 24px;
  }
  
  p {
    color: #6b7280;
    margin: 0 0 24px;
  }
`;

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
      <StyledComparisonStars>
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            fill={index < Math.round(rating) ? '#fbbf24' : 'none'}
            color={index < Math.round(rating) ? '#fbbf24' : '#d1d5db'}
          />
        ))}
        <StyledRatingValue>({rating})</StyledRatingValue>
      </StyledComparisonStars>
    );
  };

  const renderYesNo = (value) => {
    if (value === true) {
      return <Check size={20} color="#10b981" />;
    } else if (value === false) {
      return <X size={20} color="#ef4444" />;
    } else {
      return <StyledNaText>N/A</StyledNaText>;
    }
  };

  if (loading) {
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
          Loading comparison data...
        </motion.p>
      </StyledLoadingContainer>
    );
  }

  if (products.length < 2) {
    return (
      <StyledComparisonError
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Comparison Error</h2>
        <p>Not enough products to compare. Please select at least 2 products.</p>
        <StyledBackButton 
          onClick={() => navigate('/products')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Products
        </StyledBackButton>
      </StyledComparisonError>
    );
  }

  return (
    <StyledComparisonPage
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
            Product Comparison
          </motion.h1>
        </StyledHeroContainer>
      </StyledHeroSection>

      <StyledComparisonContainer
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <StyledComparisonHeader
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <StyledBackButton 
            onClick={() => navigate('/products')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={16} />
            Back to Products
          </StyledBackButton>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            Comparing {products.length} Products
          </motion.h2>
        </StyledComparisonHeader>

        <StyledComparisonTableContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <StyledComparisonTable>
            <thead>
              <tr>
                <th className="feature-column">Feature</th>
                {products.map((product, index) => (
                  <motion.th 
                    key={product.id} 
                    className="product-column"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                  >
                    <StyledProductHeader>
                      <StyledProductLogo 
                        src={product.logo || product.image_url || hero} 
                        alt={product.name}
                        whileHover={{ scale: 1.1 }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                      />
                      <h3>{product.name}</h3>
                    </StyledProductHeader>
                  </motion.th>
                ))}
              </tr>
            </thead>
            <tbody>
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.3 }}
              >
                <td className="feature-name">Image</td>
                {products.map((product, index) => (
                  <motion.td 
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.0 + index * 0.1, duration: 0.3 }}
                  >
                    <StyledProductImage 
                      src={product.image_url || product.logo || hero} 
                      alt={product.name}
                      whileHover={{ scale: 1.05 }}
                    />
                  </motion.td>
                ))}
              </motion.tr>
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.3 }}
              >
                <td className="feature-name">Price</td>
                {products.map((product, index) => (
                  <motion.td 
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.3 }}
                  >
                    ${product.price}
                  </motion.td>
                ))}
              </motion.tr>
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.3 }}
              >
                <td className="feature-name">Rating</td>
                {products.map((product, index) => (
                  <motion.td 
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 + index * 0.1, duration: 0.3 }}
                  >
                    {renderRating(product.averageRating || product.rating || 0)}
                  </motion.td>
                ))}
              </motion.tr>
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.3 }}
              >
                <td className="feature-name">Category</td>
                {products.map((product, index) => (
                  <motion.td 
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 + index * 0.1, duration: 0.3 }}
                  >
                    {getCategoryName(product.category_id)}
                  </motion.td>
                ))}
              </motion.tr>
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7, duration: 0.3 }}
              >
                <td className="feature-name">In Stock</td>
                {products.map((product, index) => (
                  <motion.td 
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 + index * 0.1, duration: 0.3 }}
                  >
                    {renderYesNo(product.in_stock)}
                  </motion.td>
                ))}
              </motion.tr>
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.9, duration: 0.3 }}
              >
                <td className="feature-name">Status</td>
                {products.map((product, index) => (
                  <motion.td 
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.0 + index * 0.1, duration: 0.3 }}
                  >
                    <StyledStatusBadge className={product.status}>
                      {product.status}
                    </StyledStatusBadge>
                  </motion.td>
                ))}
              </motion.tr>
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.1, duration: 0.3 }}
              >
                <td className="feature-name description-row">Description</td>
                {products.map((product, index) => (
                  <StyledDescriptionCell 
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2 + index * 0.1, duration: 0.3 }}
                  >
                    {product.description}
                  </StyledDescriptionCell>
                ))}
              </motion.tr>
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.3, duration: 0.3 }}
              >
                <td className="feature-name">Website</td>
                {products.map((product, index) => (
                  <motion.td 
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.4 + index * 0.1, duration: 0.3 }}
                  >
                    {product.url ? (
                      <StyledWebsiteLink 
                        href={product.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                      >
                        Visit Website
                      </StyledWebsiteLink>
                    ) : (
                      <StyledNaText>N/A</StyledNaText>
                    )}
                  </motion.td>
                ))}
              </motion.tr>
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.3 }}
              >
                <td className="feature-name">Actions</td>
                {products.map((product, index) => (
                  <motion.td 
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.6 + index * 0.1, duration: 0.3 }}
                  >
                    <StyledProductActions>
                      <StyledViewBtn 
                        onClick={() => navigate(`/products/${product.id}`)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Details
                      </StyledViewBtn>
                      <StyledReviewBtn 
                        onClick={() => navigate(`/write-feedback?productId=${product.id}`)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Write Review
                      </StyledReviewBtn>
                    </StyledProductActions>
                  </motion.td>
                ))}
              </motion.tr>
            </tbody>
          </StyledComparisonTable>
        </StyledComparisonTableContainer>
      </StyledComparisonContainer>
    </StyledComparisonPage>
  );
};

export default Comparison;