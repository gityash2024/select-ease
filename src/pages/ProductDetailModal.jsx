import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaStar, FaStarHalfAlt, FaRegStar, FaExternalLinkAlt } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: #111827;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f3f4f6;
    color: #111827;
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductImage = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }
`;

const ProductLogo = styled.div`
  margin-top: 1.5rem;
  
  img {
    height: 50px;
    object-fit: contain;
  }
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PriceBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Price = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: #026283;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StarContainer = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const RatingText = styled.span`
  color: #6b7280;
  font-size: 0.95rem;
`;

const CategoryTag = styled.span`
  display: inline-block;
  background-color: #e1f5fe;
  color: #0277bd;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  margin-top: 0.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: #111827;
`;

const Description = styled.p`
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
`;

const FeaturesList = styled.ul`
  padding-left: 1.5rem;
  margin: 0;
  color: #4b5563;
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const StockIndicator = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: ${props => props.inStock ? '#dcfce7' : '#fee2e2'};
  color: ${props => props.inStock ? '#166534' : '#991b1b'};
`;

const ExternalLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background-color: #026283;
  color: white;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #024d63;
  }
  
  svg {
    font-size: 0.875rem;
  }
`;

const ReviewsSection = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReviewItem = styled.div`
  padding: 1.25rem;
  border-radius: 8px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

const ReviewerName = styled.span`
  font-weight: 600;
  color: #111827;
`;

const ReviewContent = styled.p`
  margin: 0;
  color: #4b5563;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #e5e7eb;
    border-radius: 50%;
    border-top-color: #026283;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const NoImagePlaceholder = styled.div`
  width: 100%;
  height: 300px;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-weight: 500;
  border-radius: 8px;
`;

const ProductDetailModal = ({ product, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    if (!product) return;
    
    setLoading(true);
    setTimeout(() => {
      setProductDetails(product);
      setLoading(false);
    }, 300);
  }, [product]);

  if (!product) return null;
  
  const displayProduct = productDetails || product;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const ratingNum = parseFloat(rating) || 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= ratingNum) {
        stars.push(<FaStar key={i} size={18} />);
      } else if (i - 0.5 <= ratingNum) {
        stars.push(<FaStarHalfAlt key={i} size={18} />);
      } else {
        stars.push(<FaRegStar key={i} size={18} />);
      }
    }
    
    return stars;
  };

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{displayProduct.name}</ModalTitle>
          <CloseButton onClick={onClose}>
            <MdClose />
          </CloseButton>
        </ModalHeader>
        
        {loading ? (
          <LoadingSpinner>
            <div className="spinner"></div>
          </LoadingSpinner>
        ) : (
          <ModalBody>
            <ProductGrid>
              <ImageSection>
                <ProductImage>
                  {displayProduct.image_url ? (
                    <img src={displayProduct.image_url} alt={displayProduct.name} />
                  ) : (
                    <NoImagePlaceholder>No image available</NoImagePlaceholder>
                  )}
                </ProductImage>
                
                {displayProduct.logo && (
                  <ProductLogo>
                    <img src={displayProduct.logo} alt="Product logo" />
                  </ProductLogo>
                )}
              </ImageSection>
              
              <DetailsSection>
                <PriceBlock>
                  <Price>{formatPrice(displayProduct.price)}</Price>
                  
                  <RatingContainer>
                    <StarContainer>
                      {renderStars(displayProduct.rating || displayProduct.averageRating || 0)}
                    </StarContainer>
                    <RatingText>
                      {displayProduct.rating || displayProduct.averageRating || "0"} rating
                    </RatingText>
                  </RatingContainer>
                  
                  {displayProduct.category && (
                    <CategoryTag>{displayProduct.category.name}</CategoryTag>
                  )}
                </PriceBlock>
                
                <div>
                  <SectionTitle>Description</SectionTitle>
                  <Description>{displayProduct.description}</Description>
                </div>
                
                {displayProduct.features && (
                  <div>
                    <SectionTitle>Features</SectionTitle>
                    <FeaturesList>
                      {typeof displayProduct.features === 'object' && Array.isArray(displayProduct.features) ? (
                        displayProduct.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))
                      ) : typeof displayProduct.features === 'object' ? (
                        Object.entries(displayProduct.features).map(([key, value]) => (
                          <li key={key}>
                            <strong>{key}:</strong> {value}
                          </li>
                        ))
                      ) : (
                        <li>{JSON.stringify(displayProduct.features)}</li>
                      )}
                    </FeaturesList>
                  </div>
                )}
                
                <StockIndicator inStock={displayProduct.in_stock}>
                  {displayProduct.in_stock ? 'In Stock' : 'Out of Stock'}
                </StockIndicator>
                
                {displayProduct.url && (
                  <div>
                    <ExternalLink href={displayProduct.url} target="_blank" rel="noopener noreferrer">
                      Visit Website <FaExternalLinkAlt />
                    </ExternalLink>
                  </div>
                )}
              </DetailsSection>
            </ProductGrid>
            
            {displayProduct.reviews && displayProduct.reviews.length > 0 && (
              <ReviewsSection>
                <SectionTitle>Customer Reviews</SectionTitle>
                <ReviewList>
                  {displayProduct.reviews.map((review) => (
                    <ReviewItem key={review.id}>
                      <ReviewHeader>
                        <StarContainer>
                          {renderStars(review.rating)}
                        </StarContainer>
                        <ReviewerName>
                          {review.user ? `${review.user.firstName || ''} ${review.user.lastName || ''}` : 'Anonymous'}
                        </ReviewerName>
                      </ReviewHeader>
                      {review.content && <ReviewContent>{review.content}</ReviewContent>}
                    </ReviewItem>
                  ))}
                </ReviewList>
              </ReviewsSection>
            )}
          </ModalBody>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ProductDetailModal;