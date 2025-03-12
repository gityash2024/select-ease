import React, { useState, useEffect } from 'react';
import './Comparison.css';
import styled from 'styled-components';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Star, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:3000/api';

const ComparisonContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const ProductSelectionContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const SelectionTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #444;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const ProductCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 0.75rem;
`;

const ProductName = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const ProductPrice = styled.p`
  font-weight: 600;
  color: #026283;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-top: 0.75rem;
  cursor: pointer;
  
  input {
    margin-right: 0.5rem;
  }
`;

const CompareButton = styled.button`
  background-color: #026283;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  margin-top: 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #01516e;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ComparisonTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
  background-color: #f9fafb;
  &:first-child {
    width: 180px;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  
  &:not(:first-child) {
    text-align: center;
  }
`;

const FeatureCell = styled(TableCell)`
  font-weight: 500;
  background-color: #f9fafb;
`;

const StarRating = styled.div`
  display: flex;
  justify-content: center;
  color: #f59e0b;
`;

const Comparison = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      if (response.data && response.data.products) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    }
  };
  
  const handleProductSelection = (product) => {
    if (selectedProducts.some(p => p.id === product.id)) {
      // Remove if already selected
      setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
    } else {
      // Add if not selected and less than 5 products are selected
      if (selectedProducts.length < 5) {
        setSelectedProducts([...selectedProducts, product]);
      } else {
        toast.error('You can compare a maximum of 5 products');
      }
    }
  };
  
  const handleCompare = () => {
    if (selectedProducts.length < 2) {
      toast.error('Please select at least 2 products to compare');
      return;
    }
    setShowComparison(true);
  };
  
  const isChecked = (productId) => {
    return selectedProducts.some(p => p.id === productId);
  };
  
  const renderRating = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={16} 
          fill={i < Math.floor(rating) ? '#f59e0b' : 'none'} 
          stroke={i < Math.floor(rating) ? '#f59e0b' : '#d1d5db'}
        />
      );
    }
    return <StarRating>{stars}</StarRating>;
  };
  
  const renderYesNo = (value) => {
    return value ? 
      <Check size={18} color="#10b981" /> : 
      <X size={18} color="#ef4444" />;
  };

  return (
    <ComparisonContainer>
      <Title>Product Comparison</Title>
      
      <ProductSelectionContainer>
        <SelectionTitle>Select up to 5 products to compare</SelectionTitle>
        <ProductGrid>
          {products.map(product => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard>
                <ProductImage 
                  src={product.image_url || 'https://via.placeholder.com/200x140?text=No+Image'} 
                  alt={product.name} 
                />
                <ProductName>{product.name}</ProductName>
                <ProductPrice>${product.price}</ProductPrice>
                <CheckboxLabel>
                  <input 
                    type="checkbox" 
                    checked={isChecked(product.id)}
                    onChange={() => handleProductSelection(product)}
                  />
                  Compare
                </CheckboxLabel>
              </ProductCard>
            </motion.div>
          ))}
        </ProductGrid>
        
        <CompareButton 
          onClick={handleCompare} 
          disabled={selectedProducts.length < 2}
        >
          Compare {selectedProducts.length > 0 ? `(${selectedProducts.length})` : ''}
        </CompareButton>
      </ProductSelectionContainer>
      
      {showComparison && selectedProducts.length >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ComparisonTable>
            <thead>
              <tr>
                <TableHeader>Product</TableHeader>
                {selectedProducts.map(product => (
                  <TableHeader key={product.id}>{product.name}</TableHeader>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <FeatureCell>Image</FeatureCell>
                {selectedProducts.map(product => (
                  <TableCell key={product.id}>
                    <ProductImage 
                      src={product.image_url || 'https://via.placeholder.com/200x140?text=No+Image'} 
                      alt={product.name}
                      style={{ width: '100px', height: '100px' }}
                    />
                  </TableCell>
                ))}
              </tr>
              <tr>
                <FeatureCell>Price</FeatureCell>
                {selectedProducts.map(product => (
                  <TableCell key={product.id}>${product.price}</TableCell>
                ))}
              </tr>
              <tr>
                <FeatureCell>Rating</FeatureCell>
                {selectedProducts.map(product => (
                  <TableCell key={product.id}>
                    {renderRating(product.rating || 0)}
                  </TableCell>
                ))}
              </tr>
              <tr>
                <FeatureCell>Category</FeatureCell>
                {selectedProducts.map(product => (
                  <TableCell key={product.id}>{product.category?.name || 'N/A'}</TableCell>
                ))}
              </tr>
              <tr>
                <FeatureCell>In Stock</FeatureCell>
                {selectedProducts.map(product => (
                  <TableCell key={product.id}>
                    {renderYesNo(product.in_stock)}
                  </TableCell>
                ))}
              </tr>
              <tr>
                <FeatureCell>Description</FeatureCell>
                {selectedProducts.map(product => (
                  <TableCell key={product.id}>{product.description || 'No description available'}</TableCell>
                ))}
              </tr>
            </tbody>
          </ComparisonTable>
        </motion.div>
      )}
    </ComparisonContainer>
  );
};

export default Comparison;