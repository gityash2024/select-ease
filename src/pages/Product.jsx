import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI, reviewAPI, authAPI } from '../services/api';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import hero from '../assets/Hero.png';
import link from '../assets/link.png';
import github from '../assets/github.png';
import Facebook from '../assets/Facebook.svg';
import Twitter from '../assets/Twitter.svg';
import Instagram from '../assets/Instagram.svg';
import Youtube from '../assets/Youtube.svg';
import Linkedin from '../assets/Linkedin.svg';
import makers_1 from '../assets/makers_1.png';
import makers_2 from '../assets/makers_2.png';
import makers_3 from '../assets/makers_3.png';
import project from '../assets/project.png';
import software from '../assets/software.png';
import crm from '../assets/crm.png';
import { Star, CheckCircle, XCircle, Clock, Send, MessageSquare } from 'lucide-react';

const ProductPage = styled(motion.div)`
  width: 100%;
`;

const HeroSection = styled(motion.div)`
  position: relative;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255,255,240,0.2) 0%, rgba(230,255,255,0.2) 100%) !important;
  z-index: 1;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

const HeroBackground = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const HeroContainer = styled(motion.div)`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 32px !important;
  position: relative;
  z-index: 2;
  color: #003750;
  text-align: center;
  margin: 0;
`;

const ProductContainer = styled(motion.div)`
  max-width: 1200px;
  margin: -60px auto 0;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const ProductHeader = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

const ProductInfo = styled(motion.div)`
  display: flex;
  gap: 24px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const ProductLogo = styled(motion.img)`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  object-fit: cover;
`;

const ProductTitle = styled(motion.div)`
  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #111827;
    margin: 0 0 4px 0;
  }

  p {
    color: #6b7280;
    font-size: 16px;
    margin: 0 0 8px 0;
    line-height: 1.5;
  }
`;

const Ratings = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #6b7280;
  font-size: 14px;
`;

const Stars = styled(motion.span)`
  display: flex;
  color: #fbbf24;
`;

const Dot = styled.span`
  color: #d1d5db;
`;

const ActionButtons = styled(motion.div)`
  display: flex;
  gap: 12px;
`;

const FollowButton = styled(motion.button)`
  padding: 8px 24px;
  background: #026283;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #015272;
  }
`;

const VisitButton = styled(motion.button)`
  padding: 8px 24px;
  background: white;
  color: #026283;
  border: 1px solid #026283;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
  }
`;

const ProductNav = styled(motion.div)`
  background: white;
  border-radius: 12px;
  margin-bottom: 24px;
  padding: 0 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const NavTabs = styled.div`
  display: flex;
  gap: 32px;
  overflow-x: auto;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const NavButton = styled.button`
  padding: 16px 8px;
  background: none;
  border: none;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  white-space: nowrap;

  &.active {
    color: #026283;
  }

  &.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: #026283;
  }
`;

const ProductContent = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Section = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #111827;
    margin: 0 0 16px 0;
  }
`;

const UseButtons = styled(motion.div)`
  display: flex;
  gap: 12px;
`;

const UseButton = styled(motion.button)`
  padding: 8px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.outline ? 'white' : '#026283'};
  color: ${props => props.outline ? '#026283' : 'white'};
  border: ${props => props.outline ? '1px solid #026283' : 'none'};

  &:hover {
    background: ${props => props.outline ? '#f8fafc' : '#015272'};
  }
`;

const AboutText = styled(motion.p)`
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 24px 0;
`;

const Tags = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

const Tag = styled(motion.span)`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(2, 98, 131, 0.1);
  color: #026283;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
`;

const TagIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const FeatureImages = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureImage = styled(motion.img)`
  width: 100%;
  border-radius: 8px;
  aspect-ratio: 16/9;
  object-fit: cover;
`;

const ReviewsHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const WriteReviewButton = styled(motion.button)`
  padding: 8px 16px;
  background: #026283;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #015272;
  }
`;

const ReviewsList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ReviewCard = styled(motion.div)`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const ReviewerInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewerName = styled.span`
  font-weight: 500;
  color: #111827;
`;

const ReviewDate = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

const ReviewRating = styled.div`
  display: flex;
  color: #fbbf24;
`;

const ReviewTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #111827;
`;

const ReviewContent = styled.p`
  color: #4b5563;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const ReviewDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ReviewPros = styled.div`
  padding: 12px;
  border-radius: 8px;
  background: rgba(16, 185, 129, 0.1);

  h5 {
    margin: 0 0 8px 0;
    font-size: 14px;
    font-weight: 500;
    color: #059669;
  }

  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
  }
`;

const ReviewCons = styled.div`
  padding: 12px;
  border-radius: 8px;
  background: rgba(239, 68, 68, 0.1);

  h5 {
    margin: 0 0 8px 0;
    font-size: 14px;
    font-weight: 500;
    color: #dc2626;
  }

  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
  }
`;

const Recommendation = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-top: 12px;
`;

const Recommends = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #10b981;
`;

const DoesNotRecommend = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ef4444;
`;

const FeaturesList = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #4b5563;
`;

const PricingPlans = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const PricingPlan = styled(motion.div)`
  border: 1px solid ${props => props.popular ? '#026283' : '#e5e7eb'};
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: ${props => props.popular ? '0 4px 12px rgba(2, 98, 131, 0.1)' : 'none'};
`;

const PopularTag = styled(motion.div)`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #026283;
  color: white;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 12px;
`;

const PlanTitle = styled.h4`
  font-size: 18px;
  margin: 0 0 12px 0;
  color: #111827;
  text-align: center;
`;

const PlanPrice = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #026283;
  text-align: center;
  margin-bottom: 24px;
`;

const PlanFeatures = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 24px 0;
  flex: 1;

  li {
    padding: 8px 0;
    border-bottom: 1px solid #f3f4f6;
    color: #4b5563;
    display: flex;
    align-items: center;
    gap: 8px;

    &::before {
      content: '✓';
      color: #10b981;
    }
  }
`;

const PlanButton = styled(motion.button)`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.popular ? '#026283' : 'white'};
  color: ${props => props.popular ? 'white' : '#026283'};
  border: ${props => props.popular ? 'none' : '1px solid #026283'};

  &:hover {
    background: ${props => props.popular ? '#015272' : '#f8fafc'};
  }
`;

const Sidebar = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 1024px) {
    order: -1;
  }
`;

const InfoCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    margin: 0 0 12px 0;
  }

  p {
    color: #6b7280;
    margin: 0;
  }
`;

const InfoCard2 = styled(InfoCard)`
  margin-bottom: 20px;
`;

const LinkItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;

  img {
    width: 20px;
    height: 20px;
  }

  a {
    color: #026283;
    text-decoration: none;
    font-size: 14px;
    word-break: break-all;
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 12px;

  a {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: #f3f4f6;
    transition: background 0.2s ease;

    &:hover {
      background: #e5e7eb;
    }
  }
`;

const MakersAvatars = styled(motion.div)`
  display: flex;
  margin-top: 12px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid white;
    margin-left: -12px;

    &:first-child {
      margin-left: 0;
    }
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 10px;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 15px;
  width: 100%;
  max-width: 600px;
  position: relative;
  overflow: hidden;
`;

const ReviewFormModal = styled(motion.div)`
  max-width: 700px;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  width: 90%;
  overflow-x: hidden;
  background: white;
  border-radius: 12px;
  padding: 15px;
  position: relative;
`;

const ModalClose = styled(motion.button)`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalTitle = styled(motion.h2)`
  margin-top: 0;
  margin-bottom: 10px;
  color: #111827;
  font-size: 20px;
  font-weight: 600;
`;

const FormGroup = styled.div`
  margin-bottom: 8px;

  label {
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
    color: #374151;
    font-size: 14px;
  }

  input[type="text"],
  textarea {
    width: 98%;
    padding: 8px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-size: 14px;
  }

  textarea {
    resize: vertical;
    max-height: 60px;
    min-height: 40px;
    height: 40px;
  }
`;

const RatingInput = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 0;
`;

const RecommendationInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 13px;

  input {
    width: 16px;
    height: 16px;
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 8px;
  background: #026283;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 5px;

  &:hover {
    background: #015272;
  }
`;

const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding-right: 0;
  overflow-x: hidden;
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

const LoadingSpinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(2, 98, 131, 0.1);
  border-radius: 50%;
  border-top-color: #026283;
  margin-bottom: 20px;
`;

const LoadingText = styled(motion.p)`
  color: #026283;
  font-size: 18px;
  font-weight: 500;
`;

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({
    title: '',
    comment: '',
    rating: 5,
    pros: '',
    cons: '',
    recommendation: true
  });

  useEffect(() => {
    setIsAuthenticated(authAPI.isAuthenticated());
    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    if (product) {
      fetchProductReviews();
    }
  }, [product]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getProductById(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
      toast.error('Failed to fetch product details');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchProductReviews = async () => {
    if (!product) return;
    
    setReviewsLoading(true);
    try {
      const response = await reviewAPI.getProductReviews(product.id);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching product reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleFollow = () => {
    if (!isAuthenticated) {
      toast.error('Please login to follow products');
      return;
    }
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? 'Unfollowed successfully' : 'Followed successfully');
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to submit a review');
      navigate('/login');
      return;
    }
    
    try {
      const reviewData = {
        ...reviewFormData,
        product_id: product.id
      };
      
      await reviewAPI.createReview(reviewData);
      toast.success('Review submitted successfully');
      setShowReviewForm(false);
      setReviewFormData({
        title: '',
        comment: '',
        rating: 5,
        pros: '',
        cons: '',
        recommendation: true
      });
      
      fetchProductReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    }
  };

  const handleReviewInputChange = (field, value) => {
    setReviewFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <LoadingContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <LoadingSpinner
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <LoadingText
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Loading product details...
        </LoadingText>
      </LoadingContainer>
    );
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  const averageRating = product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : 0;

  return (
    <ProductPage 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroBackground 
          src={hero} 
          alt="" 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7 }}
        />
        <HeroContainer>
          <HeroTitle
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Products
          </HeroTitle>
        </HeroContainer>
      </HeroSection>

      <ProductContainer
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <ProductHeader
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <ProductInfo>
            <ProductLogo 
              src={product.logo || hero} 
              alt={product.name}
              whileHover={{ scale: 1.05 }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            />
            <ProductTitle
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <Ratings>
                <Stars
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                >
                  {[...Array(5)].map((_, index) => (
                    <Star 
                      key={index}
                      size={16}
                      fill={index < Math.round(averageRating) ? '#fbbf24' : 'none'}
                      color={index < Math.round(averageRating) ? '#fbbf24' : '#d1d5db'}
                    />
                  ))}
                </Stars>
                <span>{reviews.length} Reviews</span>
                <Dot>•</Dot>
                <span>Followers</span>
              </Ratings>
            </ProductTitle>
          </ProductInfo>
          <ActionButtons
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            <FollowButton 
              onClick={handleFollow}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </FollowButton>
            {product.url && (
              <VisitButton 
                onClick={() => window.open(product.url, '_blank')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >Visit Website
              </VisitButton>
            )}
          </ActionButtons>
        </ProductHeader>

        <ProductNav
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <NavTabs>
            <NavButton 
              className={activeTab === 'overview' ? 'active' : ''} 
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </NavButton>
            <NavButton 
              className={activeTab === 'reviews' ? 'active' : ''} 
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({reviews.length})
            </NavButton>
            <NavButton 
              className={activeTab === 'features' ? 'active' : ''} 
              onClick={() => setActiveTab('features')}
            >
              Features
            </NavButton>
            <NavButton 
              className={activeTab === 'pricing' ? 'active' : ''} 
              onClick={() => setActiveTab('pricing')}
            >
              Pricing
            </NavButton>
          </NavTabs>
        </ProductNav>

        <ProductContent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <MainContent>
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <h3>Do you use {product.name}?</h3>
                    <UseButtons>
                      <UseButton 
                        onClick={() => setShowReviewForm(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        I use this
                      </UseButton>
                      <UseButton 
                        outline
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        I use something else
                      </UseButton>
                    </UseButtons>
                  </Section>

                  <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <h3>What is {product.name}?</h3>
                    <AboutText
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                    >
                      {product.description}
                    </AboutText>

                    <Tags
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      <Tag
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.2 }}
                      >
                        <TagIcon src={project} alt="" />
                        Project management software
                      </Tag>
                      <Tag
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.2 }}
                      >
                        <TagIcon src={software} alt="" />
                        Team collaboration software
                      </Tag>
                      <Tag
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7, duration: 0.2 }}
                      >
                        <TagIcon src={crm} alt="" />
                        CRM software
                      </Tag>
                    </Tags>

                    <FeatureImages
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.3 }}
                    >
                      <FeatureImage 
                        src={product.image_url || product.logo || project} 
                        alt="Feature" 
                        whileHover={{ scale: 1.03 }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9, duration: 0.3 }}
                      />
                      <FeatureImage 
                        src={software} 
                        alt="Feature" 
                        whileHover={{ scale: 1.03 }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.0, duration: 0.3 }}
                      />
                      <FeatureImage 
                        src={crm} 
                        alt="Feature" 
                        whileHover={{ scale: 1.03 }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.1, duration: 0.3 }}
                      />
                    </FeatureImages>
                  </Section>
                </motion.div>
              )}
              
              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Section>
                    <ReviewsHeader
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                    >
                      <h3>Product Reviews</h3>
                      <WriteReviewButton 
                        onClick={() => setShowReviewForm(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Write a Review
                      </WriteReviewButton>
                    </ReviewsHeader>
                    
                    {reviewsLoading ? (
                      <LoadingContainer
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <LoadingSpinner
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <LoadingText>Loading reviews...</LoadingText>
                      </LoadingContainer>
                    ) : reviews.length > 0 ? (
                      <ReviewsList
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                      >
                        {reviews.map((review, index) => (
                          <ReviewCard 
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.3 }}
                            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                          >
                            <ReviewHeader>
                              <ReviewerInfo>
                                <ReviewerName>
                                  {review.user?.username || review.user?.firstName || 'Anonymous'}
                                </ReviewerName>
                                <ReviewDate>
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </ReviewDate>
                              </ReviewerInfo>
                              <ReviewRating>
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={16}
                                    fill={i < review.rating ? '#fbbf24' : 'none'}
                                    color={i < review.rating ? '#fbbf24' : '#d1d5db'}
                                  />
                                ))}
                              </ReviewRating>
                            </ReviewHeader>
                            <ReviewTitle>{review.title}</ReviewTitle>
                            <ReviewContent>{review.comment}</ReviewContent>
                            
                            {(review.pros || review.cons) && (
                              <ReviewDetails>
                                {review.pros && (
                                  <ReviewPros>
                                    <h5>Pros</h5>
                                    <p>{review.pros}</p>
                                  </ReviewPros>
                                )}
                                {review.cons && (
                                  <ReviewCons>
                                    <h5>Cons</h5>
                                    <p>{review.cons}</p>
                                  </ReviewCons>
                                )}
                              </ReviewDetails>
                            )}
                            
                            {review.recommendation !== null && (
                              <Recommendation>
                                {review.recommendation ? (
                                  <Recommends>
                                    <CheckCircle size={16} color="#10b981" />
                                    <span>Recommends this product</span>
                                  </Recommends>
                                ) : (
                                  <DoesNotRecommend>
                                    <XCircle size={16} color="#ef4444" />
                                    <span>Does not recommend this product</span>
                                  </DoesNotRecommend>
                                )}
                              </Recommendation>
                            )}
                          </ReviewCard>
                        ))}
                      </ReviewsList>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                      >
                        <p>No reviews yet. Be the first to review this product!</p>
                      </motion.div>
                    )}
                  </Section>
                </motion.div>
              )}
              
              {activeTab === 'features' && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Section>
                    <h3>Features</h3>
                    <FeaturesList
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      <FeatureItem
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                        whileHover={{ x: 5 }}
                      >
                        <CheckCircle size={20} color="#10b981" />
                        <span>User-friendly interface</span>
                      </FeatureItem>
                      <FeatureItem
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                        whileHover={{ x: 5 }}
                      >
                        <CheckCircle size={20} color="#10b981" />
                        <span>Advanced analytics</span>
                      </FeatureItem>
                      <FeatureItem
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                        whileHover={{ x: 5 }}
                      >
                        <CheckCircle size={20} color="#10b981" />
                        <span>Real-time collaboration</span>
                      </FeatureItem>
                      <FeatureItem
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                        whileHover={{ x: 5 }}
                      >
                        <CheckCircle size={20} color="#10b981" />
                        <span>Cloud storage</span>
                      </FeatureItem>
                      <FeatureItem
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7, duration: 0.3 }}
                        whileHover={{ x: 5 }}
                      >
                        <CheckCircle size={20} color="#10b981" />
                        <span>Mobile compatibility</span>
                      </FeatureItem>
                    </FeaturesList>
                  </Section>
                </motion.div>
              )}
              
              {activeTab === 'pricing' && (
                <motion.div
                  key="pricing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Section>
                    <h3>Pricing Plans</h3>
                    <PricingPlans
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      <PricingPlan
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                        whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                      >
                        <PlanTitle>Basic</PlanTitle>
                        <PlanPrice>${product.price / 2}/month</PlanPrice>
                        <PlanFeatures>
                          <li>Basic features</li>
                          <li>1 user</li>
                          <li>5GB storage</li>
                          <li>Email support</li>
                        </PlanFeatures>
                        <PlanButton
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Choose Plan
                        </PlanButton>
                      </PricingPlan>
                      <PricingPlan 
                        popular
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                        whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(2, 98, 131, 0.2)" }}
                      >
                        <PopularTag
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.3 }}
                        >
                          Popular
                        </PopularTag>
                        <PlanTitle>Professional</PlanTitle>
                        <PlanPrice>${product.price}/month</PlanPrice>
                        <PlanFeatures>
                          <li>All Basic features</li>
                          <li>5 users</li>
                          <li>20GB storage</li>
                          <li>Priority support</li>
                          <li>Advanced analytics</li>
                        </PlanFeatures>
                        <PlanButton 
                          popular
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Choose Plan
                        </PlanButton>
                      </PricingPlan>
                      <PricingPlan
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                        whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                      >
                        <PlanTitle>Enterprise</PlanTitle>
                        <PlanPrice>${product.price * 2}/month</PlanPrice>
                        <PlanFeatures>
                          <li>All Professional features</li>
                          <li>Unlimited users</li>
                          <li>100GB storage</li>
                          <li>24/7 dedicated support</li>
                          <li>Custom integrations</li>
                        </PlanFeatures>
                        <PlanButton
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Contact Sales
                        </PlanButton>
                      </PricingPlan>
                    </PricingPlans>
                  </Section>
                </motion.div>
              )}
            </AnimatePresence>
          </MainContent>

          <Sidebar
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <InfoCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}
            >
              <h4>Product status</h4>
              <p>{product.status}</p>
            </InfoCard>

            {product.url && (
              <InfoCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.3 }}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}
              >
                <h4>Links</h4>
                <LinkItem
                  whileHover={{ x: 5 }}
                >
                  <img src={link} alt="Website" />
                  <a href={product.url} target="_blank" rel="noopener noreferrer">
                    {product.url}
                  </a>
                </LinkItem>
              </InfoCard>
            )}

            <InfoCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.3 }}
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}
            >
              <h4>Social</h4>
              <SocialLinks>
                <motion.a 
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img src={Facebook} alt="Facebook" />
                </motion.a>
                <motion.a 
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img src={Twitter} alt="Twitter" />
                </motion.a>
                <motion.a 
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img src={Instagram} alt="Instagram" />
                </motion.a>
                <motion.a 
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img src={Youtube} alt="Youtube" />
                </motion.a>
                <motion.a 
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img src={Linkedin} alt="LinkedIn" />
                </motion.a>
              </SocialLinks>
            </InfoCard>

            <InfoCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.3 }}
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}
            >
              <h4>Pricing</h4>
              <p>${product.price} (with a free trial or plan)</p>
            </InfoCard>

            <InfoCard2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.3 }}
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}
            >
              <h4>Makers</h4>
              <MakersAvatars
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.3 }}
              >
                <motion.img 
                  src={makers_1} 
                  alt="Maker"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.3 }}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                />
                <motion.img 
                  src={makers_2} 
                  alt="Maker"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.3 }}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                />
                <motion.img 
                  src={makers_3} 
                  alt="Maker"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.3 }}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                />
              </MakersAvatars>
            </InfoCard2>
          </Sidebar>
        </ProductContent>
      </ProductContainer>

      <AnimatePresence>
        {showReviewForm && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ReviewFormModal
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ModalClose 
                onClick={() => setShowReviewForm(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <XCircle size={24} />
              </ModalClose>
              <ModalTitle
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                Write a Review for {product.name}
              </ModalTitle>
              <ReviewForm onSubmit={handleSubmitReview}>
                <FormGroup>
                  <label>Rating</label>
                  <RatingInput>
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={32}
                        onClick={() => handleReviewInputChange('rating', index + 1)}
                        fill={index < reviewFormData.rating ? '#fbbf24' : 'none'}
                        color={index < reviewFormData.rating ? '#fbbf24' : '#d1d5db'}
                        style={{ cursor: 'pointer' }}
                      />
                    ))}
                  </RatingInput>
                </FormGroup>
                <FormGroup>
                  <label>Title</label>
                  <input
                    type="text"
                    value={reviewFormData.title}
                    onChange={(e) => handleReviewInputChange('title', e.target.value)}
                    placeholder="Summarize your experience"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Review</label>
                  <textarea
                    value={reviewFormData.comment}
                    onChange={(e) => handleReviewInputChange('comment', e.target.value)}
                    placeholder="Share your experience with this product"
                    required
                    rows={2}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Pros</label>
                  <textarea
                    value={reviewFormData.pros}
                    onChange={(e) => handleReviewInputChange('pros', e.target.value)}
                    placeholder="What did you like about this product?"
                    rows={2}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Cons</label>
                  <textarea
                    value={reviewFormData.cons}
                    onChange={(e) => handleReviewInputChange('cons', e.target.value)}
                    placeholder="What could be improved?"
                    rows={2}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Would you recommend this product?</label>
                  <RecommendationInput>
                    <RadioLabel>
                      <input
                        type="radio"
                        name="recommendation"
                        checked={reviewFormData.recommendation === true}
                        onChange={() => handleReviewInputChange('recommendation', true)}
                      />
                      Yes, I would recommend this
                    </RadioLabel>
                    <RadioLabel>
                      <input
                        type="radio"
                        name="recommendation"
                        checked={reviewFormData.recommendation === false}
                        onChange={() => handleReviewInputChange('recommendation', false)}
                      />
                      No, I would not recommend this
                    </RadioLabel>
                  </RecommendationInput>
                </FormGroup>
                <SubmitButton 
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit Review
                </SubmitButton>
              </ReviewForm>
            </ReviewFormModal>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </ProductPage>
  );
};

export default Product;