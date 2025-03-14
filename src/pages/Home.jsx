import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { productAPI, reviewAPI, blogAPI, categoryAPI } from '../services/api';
import toast from 'react-hot-toast';
import hero from '../assets/Hero.png';
import seo from '../assets/SE0.png';
import seo_2 from '../assets/SE02.png';
import seo_3 from '../assets/SE03.png';
import python from '../assets/python.png';
import oracl from '../assets/oracl.png';
import boat from '../assets/boat.png';
import categories_1 from '../assets/categories_1.png';
import categories_2 from '../assets/categories_2.png';
import categories_3 from '../assets/categories_3.png';
import product_1 from '../assets/product_1.png';
import product_2 from '../assets/product_2.png';
import product_3 from '../assets/product_3.png';
import product_4 from '../assets/product_4.png';
import bamboohr from '../assets/bamboohr.svg';
import avatar1 from '../assets/Photo.svg';
import avatar2 from '../assets/Photo.svg';
import waitlist from '../assets/waitlist.svg';
import review_1 from '../assets/review_1.png';
import review_2 from '../assets/review_2.png';
import Corexta_start from '../assets/Corexta_start.png';
import Comparison_1 from '../assets/Comparison_1.png';
import Comparison_2 from '../assets/Comparison_2.png';
import Comparison_3 from '../assets/Comparison_3.png';
import Comparison_4 from '../assets/Comparison_4.png';
import Comparison_5 from '../assets/Comparison_5.png';
import Comparison_6 from '../assets/Comparison_6.png';
import Comparison_7 from '../assets/Comparison_7.png';
import Comparison_8 from '../assets/Comparison_8.png';
import Comparison_9 from '../assets/Comparison_9.png';
import howItWorks from '../assets/how-it-works.svg';
import SalesAnalytics from '../assets/SalesAnalytics.svg';
import ProductsAnalytics from '../assets/ProductsAnalytics.svg';
import CustomersAnalytics from '../assets/CustomersAnalytics.svg';
import testimonials_1 from '../assets/Photo1.png';
import testimonials_2 from '../assets/Photo2.png';
import herarform from '../assets/herarform.png';
import Photo from '../assets/Photo.svg';
import reviewsBg from '../assets/blue bg.png'; 
import { IoIosSearch } from "react-icons/io";
import { ArrowRight, Star } from 'lucide-react';

const Section = styled.section`
  width: 100%;
  padding: ${props => props.padding || '20px 0'};
  background: ${props => props.background || 'white'};
`;

const HeroSection = styled(motion.section)`
  padding: 40px 0 80px;
  position: relative;
  text-align: center;
  
  .contact-hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
`;

const ContentWrapper = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
  overflow-x: hidden;
`;

const Container = styled(motion.div)`
  width: 100%;
  overflow-x: hidden;
`;

const Title = styled(motion.h1)`
  font-size: 56px;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 40px;
  max-width: 830px;
  margin-left: auto;
  margin-right: auto;
  color: black; 
  font-family: outfit;
`;

const BoldSpan = styled.span`
  font-weight: 700; 
`;

const SearchContainer = styled(motion.div)`
  display: flex;
  align-items: stretch;
  width: 100%;
  max-width: 500px;
  margin: 0 auto 40px;
  background: white;
  border-radius: 999px;
  border: 1px solid #E5E7EB;
  overflow: hidden;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 48px;
  padding: 0 20px;
  border: none;
  font-size: 16px;
  background: white;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: #111827;
  }
`;

const SearchButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center; 
  gap: 10px;
  padding: 16px 32px; 
  background: #026283;
  color: white;
  border: none;
  border-radius: 0px; 
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap; 

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: #005472; 
  }
`;

const ImagesSection = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 0px;
  padding: 0 20px;
  box-sizing: border-box;
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  width: calc(33.33% - 16px);
  
  img {
    width: 100%;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  .icon {
    position: absolute;
    top: -30px;
    width: 40px;
    height: 40px;
    padding: 2px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .python {
    left:-80%;
    transform: translateX(-50%);
  }

  .oracle {
    left: 60%;
    transform: translateX(-50%);
  }

  .boat {
    left: 180%;
    transform: translateX(-50%);
  }
`;

const Dot = styled(motion.div)`
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${props => props.color};
  ${props => props.position};
  z-index: 2;
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: ${props => props.columns};
  gap: ${props => props.gap || '24px'};
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  color:#383B46;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
  border: 1px solid #E0E0E0; 
  transition: transform 0.2s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const CardImage = styled(motion.img)`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled(motion.div)`
  padding: 20px;
  h3 {
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 8px;
    color:#383B46;
  }
  p {
    font-size: 14px;
    color: #666;
    margin-bottom: 16px;
  }
  a {
    color: #006B8F;
    text-decoration: none;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ReviewsWrapper = styled(motion.section)`
  background-color: #003750;
  position: relative;
  padding: 80px 0;
  
  &:after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.backgroundImage});
    background-repeat: no-repeat;
    background-position: right bottom;
    opacity: 0.1;
    pointer-events: none;
  }
`;

const ReviewHeading = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 48px;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SectionTitle = styled(motion.h2)`
  color: ${props => props.color || '#111827'};
  font-size: 42px;
  font-weight: 700;
  line-height: 1.2;
  max-width: 600px;
  margin: 0 0 32px 0;
  padding: ${props => props.padding || '0'};
`;

const ReviewAllButton = styled(motion.button)`
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const ReviewCardsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SoftwareReviewCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 32px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  .quote-icon {
    font-size: 32px;
    color: #333;
    margin-bottom: 16px;
  }

  .quote-text {
    font-size: 16px;
    line-height: 1.6;
    color: #333;
    margin-bottom: 24px;
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
  }

  .stars {
    color: #FFD700;
    font-size: 20px;
    letter-spacing: 2px;
    display: flex;
  }

  .rating-count {
    color: #666;
    font-size: 14px;
  }

  .read-more {
    color: #026283;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    font-size: 16px;

    &:hover span {
      transform: translateX(4px);
    }
  }
`;

const ComparisonTable = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ComparisonItem = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

const CompanyGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  span {
    font-size: 14px;
    color: #333;
  }
`;

const VsText = styled.div`
  color: #6B7280;
  font-size: 14px;
`;

const HowItWorksSection = styled(motion.section)`
  background: #003750;
  color: white;
  padding: 40px 0;
`;

const Content = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FeatureItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  
  .icon-wrapper {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #026283;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
      width: 20px;
      height: 20px;
    }
  }
  
  .text {
    h3 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 4px;
      color: white;
    }
    
    p {
      color: rgba(255, 255, 255, 0.8);
      font-size: 14px;
      line-height: 1.4;
    }
  }
`;

const ExploreButton = styled(motion.button)`
  display: inline-block;
  margin-top: 24px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const TestimonialsSection = styled(motion.section)`
  padding: 60px 20px;
  background: white;
  text-align: center;
`;

const TestimonialDivider = styled.div`
  width: 100%; 
  width: 440px; 
  height: 1px; 
  background-color: #1111111A;
  margin: 20px auto; 
  
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const TestimonialsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 48px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    padding: 0 24px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const TestimonialCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 40px;
  text-align: left;
  border: 1px solid #E5E7EB;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }
  
  .quote-icon {
    color: #006B8F;
    font-size: 48px;
    line-height: 1;
    margin-bottom: 16px;
    font-family: serif;
  }
  
  .quote-text {
    color: #383B46;
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 24px;
    font-weight: 400;
  }
  
  .author {
    display: flex;
    align-items: center;
    gap: 12px;
    
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
    
    .info {
      h4 {
        font-size: 16px;
        font-weight: 500;
        color: #383B46;
        margin-bottom: 4px;
      }
      
      p {
        font-size: 14px;
        color: #6B7280;
        font-weight: 400;
      }
    }
  }
`;

const WaitlistBanner = styled(motion.div)`
  background: #003750;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  height: 240px;

  .image-section {
    flex: 1;
    height: 100%;
    position: relative;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content-section {
    flex: 1;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: #003750;
    
    h2 {
      font-size: 32px;
      color: white;
      margin-bottom: 24px;
      font-weight: 600;
      text-align: left;
    }

    .input-group {
      display: flex;
      width: 100%;
      gap: 12px;
      
      input {
        flex: 1;
        padding: 12px 16px;
        border-radius: 6px;
        border: none;
        background: white;
        font-size: 14px;
        
        &::placeholder {
          color: #6B7280;
        }
      }
      
      button {
        padding: 12px 24px;
        background: white;
        color: #003750;
        border: none;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
        white-space: nowrap;
        transition: background 0.2s, transform 0.2s;
        
        &:hover {
          background: #f9fafb;
          transform: scale(1.05);
        }
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    
    .image-section {
      height: 240px;
    }
    
    .content-section {
      padding: 24px;
      
      h2 {
        font-size: 24px;
        margin-bottom: 16px;
      }
      
      .input-group {
        flex-direction: column;
        
        button {
          width: 100%;
        }
      }
    }
  }
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
`;

const LoadingSpinner = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(2, 98, 131, 0.1);
  border-radius: 50%;
  border-top-color: #026283;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const productsResponse = await productAPI.getAllProducts();
        const allProducts = productsResponse.data?.products || [];
        setProducts(allProducts.filter(p => p.status === 'published').slice(0, 4));
        
        const reviewsResponse = await reviewAPI.getAllReviews();
        setReviews(Array.isArray(reviewsResponse.data) ? reviewsResponse.data.slice(0, 4) : []);
        
        const blogsResponse = await blogAPI.getAllBlogs();
        setBlogs(blogsResponse.data?.blogs || []);
        
        const categoriesResponse = await categoryAPI.getAllCategories();
        setCategories(categoriesResponse.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
    }
  };
  
  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            fill={i < Math.floor(rating) ? '#FDB241' : 'none'}
            color={i < Math.floor(rating) ? '#FDB241' : '#d1d5db'}
          />
        ))}
      </div>
    );
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
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Loading content...
        </motion.p>
      </LoadingContainer>
    );
  }

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img src={hero} alt="" className="contact-hero-background" />

        <ContentWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Title
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Find the <BoldSpan>Best AI Tools</BoldSpan> with <BoldSpan>Expert Reviews</BoldSpan> and <BoldSpan>Comparisons</BoldSpan>.
          </Title>

          <SearchContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <SearchInput 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <SearchButton
              onClick={handleSearch}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IoIosSearch />Search
            </SearchButton>
          </SearchContainer>

          <ImagesSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ImageWrapper
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Dot 
                color="#FF6B6B" 
                position="top: -35px; left: -160px;" 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              />
              <motion.img 
                src={seo} 
                alt="SEO Tool"
                whileHover={{ scale: 1.05 }}
              />
            </ImageWrapper>

            <ImageWrapper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <motion.img 
                src={seo_2} 
                alt="AI Interface"
                whileHover={{ scale: 1.05 }}
              />
              <motion.img 
                className="icon python" 
                src={python} 
                alt="Python"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                whileHover={{ scale: 1.2 }}
              />
              <motion.img 
                className="icon oracle" 
                src={oracl} 
                alt="Oracle"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                whileHover={{ scale: 1.2 }}
              />
              <motion.img 
                className="icon boat" 
                src={boat} 
                alt="Boat"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                whileHover={{ scale: 1.2 }}
              />
            </ImageWrapper>

            <ImageWrapper
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Dot 
                color="#FF6B6B" 
                position="bottom: 110px; right: -90px;" 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              />
              <motion.img 
                src={seo_3} 
                alt="Model Directory"
                whileHover={{ scale: 1.05 }}
              />
            </ImageWrapper>
          </ImagesSection>
        </ContentWrapper>
      </HeroSection>

      <Section>
        <ContentWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SectionTitle
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Featured Categories
          </SectionTitle>
          <Grid 
            columns="repeat(3, 1fr)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {(categories.length > 0 ? categories.slice(0, 3) : [
              { id: 1, name: "AI Tools", image: categories_1 },
              { id: 2, name: "Data Analytics", image: categories_2 },
              { id: 3, name: "Machine Learning", image: categories_3 }
            ]).map((category, i) => (
              <Card 
                key={category.id || i}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
                onClick={() => navigate(`/products?category=${category.id}`)}
              >
                <CardImage 
                  src={category.image || [categories_1, categories_2, categories_3][i % 3]} 
                  alt={category.name}
                  whileHover={{ scale: 1.05 }}
                />
                <CardContent>
                  <h3>{category.name}</h3>
                  <p>Explore products in this category</p>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    navigate(`/products?category=${category.id}`);
                  }}>
                    Explore Categories <ArrowRight size={14} />
                  </a>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </ContentWrapper>
      </Section>

      <Section>
        <ContentWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <SectionTitle
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Top Rated Products
          </SectionTitle>
          <Grid 
            columns="repeat(4, 1fr)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {(products.length > 0 ? products : [
              { id: 1, name: "Meta AI", image: product_1, description: "Powerful AI assistant for everyday tasks" },
              { id: 2, name: "Data Explorer", image: product_2, description: "Visualize complex data with ease" },
              { id: 3, name: "Code Generator", image: product_3, description: "AI-powered code suggestions" },
              { id: 4, name: "Neural Engine", image: product_4, description: "Advanced neural network tool" }
            ]).map((product, i) => (
              <Card 
                key={product.id || i}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + (i * 0.1) }}
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <CardImage 
                  src={product.image_url || product.logo || [product_1, product_2, product_3, product_4][i % 4]} 
                  alt={product.name}
                  whileHover={{ scale: 1.05 }}
                />
                <CardContent>
                  <h3>{product.name}</h3>
                  <p>{product.description?.substring(0, 50) || "Explore this product"}{product.description?.length > 50 ? "..." : ""}</p>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    navigate(`/products/${product.id}`);
                  }}>
                    View Product <ArrowRight size={14} />
                  </a>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </ContentWrapper>
      </Section>
      
      <ReviewsWrapper
        backgroundImage={reviewsBg}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <ContentWrapper>
          <ReviewHeading
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <SectionTitle color="white">
              Top {Math.min(8, products.length)} Most Reviewed Software of {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}
            </SectionTitle>
            <ReviewAllButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
            >
              All Review
            </ReviewAllButton>
          </ReviewHeading>
          
          <ReviewCardsGrid
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            {(reviews.length > 0 ? reviews.slice(0, 2) : [
              { id: 1, title: "Great tool", comment: "Every new business and start-up, big or small, goes through the five stages of business growth. These phases include existence, survival, success, take-off, and resource maturity.", rating: 5, product_id: 1 },
              { id: 2, title: "Highly recommended", comment: "Every new business and start-up, big or small, goes through the five stages of business growth. These phases include existence, survival, success, take-off, and resource maturity.", rating: 5, product_id: 2 }
            ]).map((review, index) => {
              const reviewProduct = products.find(p => p.id === review.product_id) || {};
              
              return (
                <SoftwareReviewCard
                  key={review.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.1 + (index * 0.1) }}
                  onClick={() => navigate(`/products/${review.product_id}`)}
                >
                  <div className="quote-icon">❝</div>
                  <p className="quote-text">
                    "{review.comment || "Every new business and start-up, big or small, goes through the five stages of business growth. These phases include existence, survival, success, take-off, and resource maturity."}"
                  </p>
                  <div className="rating">
                    {renderStars(review.rating || 5)}
                    <span className="rating-count">({review.rating_count || 1156})</span>
                  </div>
                  <a href="#" className="read-more" onClick={(e) => {
                    e.preventDefault();
                    navigate(`/products/${review.product_id}`);
                  }}>
                    Read More <span>→</span>
                  </a>
                </SoftwareReviewCard>
              );
            })}
          </ReviewCardsGrid>
        </ContentWrapper>
      </ReviewsWrapper>

      <Section>
        <ContentWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <SectionTitle
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            Comparison Tables
          </SectionTitle>
          <ComparisonTable
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            {products.length >= 2 ? (
              [...Array(Math.min(9, products.length))].map((_, i) => {
                const idx1 = i % products.length;
                const idx2 = (i + 1) % products.length;
                
                return (
                  <ComparisonItem
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.4 + (i * 0.1) }}
                    onClick={() => {
                      const ids = [products[idx1].id, products[idx2].id].join(',');
                      navigate(`/comparison?products=${ids}`);
                    }}
                  >
                    <CompanyGroup>
                      <img src={products[idx1].logo || products[idx1].image_url || [Comparison_1, Comparison_3, Comparison_5, Comparison_7][i % 4]} alt={products[idx1].name} />
                      <span>{products[idx1].name}</span>
                    </CompanyGroup>
                    <VsText>vs</VsText>
                    <CompanyGroup>
                      <img src={products[idx2].logo || products[idx2].image_url || [Comparison_2, Comparison_4, Comparison_6, Comparison_8][i % 4]} alt={products[idx2].name} />
                      <span>{products[idx2].name}</span>
                    </CompanyGroup>
                  </ComparisonItem>
                );
              })
            ) : (
              [...Array(9)].map((_, i) => (
                <ComparisonItem
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.4 + (i * 0.1) }}
                >
                  <CompanyGroup>
                    <img src={[Comparison_1, Comparison_3, Comparison_5, Comparison_7, Comparison_9][i % 5]} alt="Company 1" />
                    <span>Company A</span>
                  </CompanyGroup>
                  <VsText>vs</VsText>
                  <CompanyGroup>
                    <img src={[Comparison_2, Comparison_4, Comparison_6, Comparison_8, Comparison_1][i % 5]} alt="Company 2" />
                    <span>Company B</span>
                  </CompanyGroup>
                </ComparisonItem>
              ))
            )}
          </ComparisonTable>
        </ContentWrapper>
      </Section>

      <HowItWorksSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <ContentWrapper>
          <Content
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          >
            <div>
              <SectionTitle 
                color="white"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.7 }}
              >
                How It Works
              </SectionTitle>
              <FeatureList
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.8 }}
              >
                <FeatureItem
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 1.9 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="icon-wrapper">
                    <img src={SalesAnalytics} alt="Sales Analytics" />
                  </div>
                  <div className="text">
                    <h3>Sales Analytics:</h3>
                    <p>Trends to Drive Informed Decisions and Optimize Performance.</p>
                  </div>
                </FeatureItem>

                <FeatureItem
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 2.0 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="icon-wrapper">
                    <img src={ProductsAnalytics} alt="Products Analytics" />
                  </div>
                  <div className="text">
                    <h3>Products Analytics:</h3>
                    <p>Unleashing Insights to Enhance Offerings, Maximize Impact, and Delight Customers.</p>
                  </div>
                </FeatureItem>

                <FeatureItem
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 2.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="icon-wrapper">
                    <img src={CustomersAnalytics} alt="Customers Analytics" />
                  </div>
                  <div className="text">
                    <h3>Customers Analytics:</h3>
                    <p>Preferences for Exceptional Customer Experiences and Lasting Relationships.</p>
                  </div>
                </FeatureItem>
              </FeatureList>
              <ExploreButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 2.2 }}
                onClick={() => navigate('/products')}
              >
                Explore All Tools
              </ExploreButton>
            </div>

            <motion.img 
              src={howItWorks} 
              alt="How it works"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 2.0 }}
              whileHover={{ scale: 1.03 }}
              style={{
                width: '100%',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
              }}
            />
          </Content>
        </ContentWrapper>
      </HowItWorksSection>

      <TestimonialsSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2.0 }}
      >
        <ContentWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.1 }}
        >
          <SectionTitle 
            style={{ textAlign: 'center' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.2 }}
          >
            Testimonials
          </SectionTitle>
          <TestimonialsGrid
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.3 }}
          >
            <TestimonialCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 2.4 }}
            >
              <div className="quote-icon">❝</div>
              <p className="quote-text">
                "Every new business and start-up, big or small, goes through the five stages of business growth. These phases include existence, survival, success, take-off, and resource maturity."
              </p>
              <div className="author">
                <img src={testimonials_1} alt="Devon Lane" />
                <div className="info">
                  <TestimonialDivider />
                  <h4>Devon Lane</h4>
                  <p>Founder of Brilex</p>
                </div>
              </div>
            </TestimonialCard>

            <TestimonialCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 2.5 }}
            >
              <div className="quote-icon">❝</div>
              <p className="quote-text">
                "Business growth is a point a business reaches where it expands and requires more avenues to generate a profit. This can happen when a company increases revenue."
              </p>
              <div className="author">
                <img src={testimonials_2} alt="Robert Fox" />
                <div className="info">
                  <TestimonialDivider />
                  <h4>Robert Fox</h4>
                  <p>Manager of Miro</p>
                </div>
              </div>
            </TestimonialCard>
          </TestimonialsGrid>
        </ContentWrapper>
      </TestimonialsSection>

      <Section>
        <ContentWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.3 }}
        >
          <SectionTitle
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.4 }}
          >
            Blog Highlights
          </SectionTitle>
          <Grid 
            columns="repeat(3, 1fr)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.5 }}
          >
            {(blogs.length > 0 ? blogs.slice(0, 3) : [
              { id: 1, title: "Meta AI", summary: "Lorem ipsum dolor sit amet consectetur. Semper ornare viverra voluptat.", image_url: categories_1 },
              { id: 2, title: "Product Analytics", summary: "Lorem ipsum dolor sit amet consectetur. Semper ornare viverra voluptat.", image_url: categories_2 },
              { id: 3, title: "Growth Strategies", summary: "Lorem ipsum dolor sit amet consectetur. Semper ornare viverra voluptat.", image_url: categories_3 }
            ]).map((blog, i) => (
              <Card 
                key={blog.id || i}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 2.5 + (i * 0.1) }}
                onClick={() => navigate(`/blog-details/${blog.id}`)}
              >
                <CardImage 
                  src={blog.image_url || [categories_1, categories_2, categories_3][i % 3]} 
                  alt={blog.title}
                  whileHover={{ scale: 1.05 }}
                />
                <CardContent>
                  <h3>{blog.title}</h3>
                  <p>{blog.summary?.substring(0, 80) || "Lorem ipsum dolor sit amet consectetur."}{blog.summary?.length > 80 ? "..." : ""}</p>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    navigate(`/blog-details/${blog.id}`);
                  }}>
                    Read More <ArrowRight size={14} />
                  </a>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </ContentWrapper>
      </Section>

      <Section>
        <ContentWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.6 }}
        >
          <WaitlistBanner
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 2.7 }}
            whileHover={{ boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
          >
            <div className="image-section">
              <motion.img 
                src={waitlist} 
                alt="Person wearing VR headset"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <div className="content-section">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.8 }}
              >
                Join 569 more people in the waitlist
              </motion.h2>
              <motion.div 
                className="input-group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.9 }}
              >
                <input type="email" placeholder="Your work email address" />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join the waitlist
                </motion.button>
              </motion.div>
            </div>
          </WaitlistBanner>
        </ContentWrapper>
      </Section>
    </Container>
  );
};

export default Home;