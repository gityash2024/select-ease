import React, { useState, useEffect,useRef } from 'react';
import styled from 'styled-components';
import { color, motion } from 'framer-motion';
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
import QuicksmartAI from '../assets/QuicksmartAI.png';
import NapkinAI from '../assets/NapkinAI.png';
import HiavaAI from '../assets/HiavaAI.png';
import ScogoAI from '../assets/ScogoAI.png';
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
import salesautomation from '../assets/salesautomation.png';
import coversationbot from '../assets/coversationbot.png';
import creativetool from '../assets/creativetool.png';
import documentation from '../assets/documentation.png';
import { image } from 'framer-motion/client';
import napkinlogo2 from '../assets/napkinlogo2.png';
import caption from '../assets/caption.svg';
import invideo from '../assets/invideo.svg';
import amplify from '../assets/amplify.svg';
import zrika from '../assets/zrika.svg';
import ava from '../assets/ava.svg';
import quick from '../assets/quick.svg';
import lowtouch from '../assets/lowtouch.svg';
import scogologo from '../assets/scogologo.png';

const Section = styled.section`
  width: 100%;
  padding: ${props => props.padding || '15px 0'};
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
  overflow: visible;
  position: relative;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 48px;
  padding: 0 20px;
  border: none;
  font-size: 16px;
  background: white;
  border-radius: 999px 0 0 999px;
  
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
  border-radius: 0 999px 999px 0; 
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

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-top: 8px;
  z-index: 100;
  padding: 20px;
  border: 1px solid #E5E7EB;
`;

// const Section = styled.div`
//   margin-bottom: 20px;
  
//   &:last-child {
//     margin-bottom: 0;
//   }
// `;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #111827;
`;

const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CategoryItem = styled.div`
  padding: 8px 16px;
  background: #F3F4F6;
  border-radius: 999px;
  font-size: 14px;
  cursor: pointer;
  color: #111827;
  transition: background 0.2s;
  
  &:hover {
    background: #E5E7EB;
  }
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ProductItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background: #F3F4F6;
  border-radius: 999px;
  font-size: 14px;
  cursor: pointer;
  color: #111827;
  transition: background 0.2s;
  
  &:hover {
    background: #E5E7EB;
  }
`;

const SearchIcon = styled.span`
  display: flex;
  align-items: center;
  margin-right: 8px;
  
  svg {
    width: 16px;
    height: 16px;
    color: #6B7280;
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
    left: -80%;
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

// const CategorySliderSectionSection = styled.div`
//   padding-top: 60px;
//   padding-bottom:50px;  
//   background-color: white;
//   display: flex; 
//   align-items: center; 
//   justify-content: space-between; 
// `;

const CategorySliderTitle = styled.h2`
  font-size: 32px;
  color: #383B46;
  margin-bottom: 20px;
  margin-left:60px;
  font-weight:400;
`;

// const CategorySliderContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin-right:30px;
// `;

// const SliderArrowButton = styled.button`
//   background-color: #E1E1E1;
//   border: none;
//   border-radius: 50%;
//   width: 40px;
//   height: 40px;
//   font-size: 1.2rem;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: black;
//   margin: 0 5px;
// `;

// const CategoryList = styled.div`
//   display: flex;
//   overflow: hidden;
//   margin: 0 10px;
// `;

// const CategoryButton = styled.button`
//   background-color: #E1E1E1;
//   border: none;
//   border-radius: 20px;
//   padding: 8px 15px;
//   margin: 0 5px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
//   color: black;

//   &:hover {
//     background-color: #e0e0e0;
//   }
// `;
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


const UniqueDiscoveryContainer = styled(motion.div)`
  display: flex;
  gap: 40px;
  margin-top: 30px;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;

  }
`;

const UniqueCategoryLists = styled.div`
  min-width: 220px;
  
  @media (max-width: 768px) {
    min-width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 10px;
   
  }
  
  select {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
    font-size: 14px;
    color: #333;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position: right 10px center;
  }
`;

const UniqueCategoryTab = styled.div`
  color: black;
  padding: 10px 20px;
  border-radius: 30px;
  margin-bottom: 10px;
  font-weight: ${(props) => (props.active ? '600' : '500')};
  border: ${(props) => (props.active ? '2px solid #026283' : 'none')};
  background-color: ${(props) => (props.active ? '#E8FFFF' : 'transparent')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? '#E8FFFF' : '#f0f0f0')};
    border-color: #026283;
    transform: translateX(5px);
  }
  
  @media (max-width: 768px) {
    margin-bottom: 0;
    font-size: 0.9rem;
    padding: 8px 16px;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const UniqueSoftwareGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  flex: 1;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-left: 50px;
  }
`;

const UniqueSoftwareCard = styled(motion.div)`
  background-color: white;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-in-out, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 576px) {
    padding: 15px;
  }
`;

const UniqueSoftwareIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 15px;
  border-radius: 50%;
  background-color: ${(props) => props.bg || '#ccc'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  
  ${UniqueSoftwareCard}:hover & {
    transform: scale(1.1);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* Ensure the image fits well inside the circular container */
  }
`;

const UniqueRatingStars = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const UniqueRatingBadge = styled.span`
  background-color: #026283;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.85rem;
  margin-right: 6px;
  font-weight: 600;
`;

const UniqueReviewCount = styled.span`
  font-size: 0.85rem;
  color: #666;
`;

const UniqueSoftwareName = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
`;

// Update UniqueContentWrapper to have max-width and center alignment
const UniqueContentWrapper = styled(motion.div)`
  background-color: white;
  padding: 15px 40px;
  margin: 15px auto;
  max-width: 1200px;
  
  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

// Update UniqueSectionTitle to match ProductsTitle styling
const UniqueSectionTitle = styled(motion.h2)`
  font-size: 28px;
  font-weight: 500;
  color: #333;
  margin-bottom: 24px;
  text-align: left;
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 16px;
  }
`;

const ReviewsWrapper = styled(motion.section)`
  background-color: #003750;
  position: relative;
  padding: 40px 0;
  margin: 15px 0;
  
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

// Update SectionTitle to match ProductsTitle styling
// const SectionTitle = styled(motion.h2)`
//   color: ${props => props.color || '#333'};
//   font-size: 28px;
//   font-weight: 500;
//   line-height: 1.2;
//   max-width: 600px;
//   margin: 0 0 24px 0;
//   padding: ${props => props.padding || '0'};
  
//   @media (max-width: 768px) {
//     font-size: 22px;
//     margin-bottom: 16px;
//   }
// `;

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

const ExploreSection = styled(motion.section)`
  padding: 40px;
  background-color: #f9f9f9; 
`;

const SectionTitl = styled.h2`
  font-size: 24px;
  margin-bottom: 30px;
  color: #333;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const ProductCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
  color: #026283;
`;

const CategoryLink = styled.a`
  font-size: 14px;
  color:#026283;
  text-decoration: underline;
  display: block;
  margin-bottom: 5px;
`;

const CompanyName = styled.p`
  font-size: 14px;
  color: #666;
  margin: 5px 0;
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
  padding: 30px 0;
  margin: 15px 0;
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
const RegisterSection = styled(motion.section)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: auto;
  background: white;
  padding: 40px 60px;
  gap: 40px;
  box-sizing: border-box;
  max-width: 1200px;
  margin: 15px auto;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    padding: 30px;
    gap: 30px;
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    gap: 20px;
  }
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  background: white;
  color: #00264d;

  h2 {
    font-size: 40px;
    font-weight: 500;
    margin-bottom: 12px;
    font-family: Outfit;
  }

  p {
    font-size: 24px;
    color: #555;
    font-family: Outfit;
    font-weight: 300;
  }

  span {
    color: #026283;
    font-weight: 500;
    font-family: Outfit;
  }
  
  @media (max-width: 992px) {
    padding: 20px 0;
    
    h2 {
      font-size: 32px;
    }
    
    p {
      font-size: 18px;
    }
  }
  
  @media (max-width: 576px) {
    h2 {
      font-size: 28px;
    }
    
    p {
      font-size: 16px;
    }
  }
`;

const FormSection = styled.div`
  background-color: #00264d;
  color: white;
  padding: 40px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Titles = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 30px;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 15px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 5px;
    width: 80%;
  }
`;

const InputField = styled.div`
  margin-bottom: 20px;
  flex: 1;

  label {
    display: block;
    font-size: 0.85rem;
    margin-bottom: 6px;
    color: #cfd8dc;
  }

  input {
    width: 90%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background-color: #003366;
    color: white;
    font-size: 0.95rem;

    &:focus {
      outline: 2px solid #007bff;
    }

    &::placeholder {
      color: #a8b3c1;
    }
  }
  
  @media (max-width: 576px) {
    input {
      padding: 10px;
      font-size: 0.9rem;
    }
  }
`;

const NextButton = styled.button`
  margin-top: 20px;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #005bb5;
  }
`;

const LoginLink = styled.p`
  margin-top: 15px;
  font-size: 0.9rem;
  text-align: center;

  span {
    color: #007bff;
    cursor: pointer;
  }
`;

const TermsText = styled.p`
  font-size: 0.75rem;
  text-align: center;
  color: #aaa;
  margin-top: 10px;
`;

const TestimonialsSection = styled(motion.section)`
  padding: 30px 20px;
  background: white;
  text-align: center;
  margin: 15px 0;
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
const CategoriesSection = styled(motion.section)`
  padding: 40px;
  background-color: #f9f9f9;
  display: flex;
`;

const CategoriesList = styled.div`
  flex: 1;
  max-width: 200px;
  padding-right: 20px;
`;

// const CategoryItem = styled.div`
//   padding: 10px;
//   cursor: pointer;
//   border-radius: 8px;
//   margin-bottom: 10px;
//   background-color: ${(props) => (props.selected ? '#e0f2fe' : 'transparent')};
//   color: ${(props) => (props.selected ? '#007bff' : '#333')};
//   font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
// `;

const CardsGrid = styled.div`
  flex: 3;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const Cards = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const CardTitl = styled.h3`
  font-size: 16px;
  margin-top: 10px;
`;

// const Rating = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 10px 0;
// `;

const RatingStar = styled.span`
  color: gold;
  font-size: 18px;
`;

const RatingCount = styled.span`
  margin-left: 5px;
  font-size: 14px;
  color: #666;
`;

// const CategorySliderSection = styled(motion.section)`
//   padding: 24px 40px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   max-width: 1200px;
//   margin: 0 auto;
//   background: white;
//   flex-wrap: wrap;
//   gap: 16px;
  
//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: flex-start;
//   }
// `;

// const CategoryTitle = styled.h2`
//   font-size: 24px;
//   font-weight: 500;
//   color: #333;
//   margin: 0;
// `;

// const CategorySliderContainer = styled.div`
//   display: flex;
//   align-items: center;
//   flex-wrap: nowrap;
// `;

// const SliderArrowButton = styled.button`
//   background-color: #333;
//   color: white;
//   border: none;
//   border-radius: 50%;
//   width: 36px;
//   height: 36px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   margin: 0 12px;
//   transition: all 0.2s ease;
  
//   &:hover {
//     background-color: #555;
//     transform: scale(1.05);
//   }
  
//   &:active {
//     transform: scale(0.95);
//   }
// `;

// const CategoryList = styled.div`
//   display: flex;
//   gap: 12px;
//   overflow-x: auto;
//   scrollbar-width: none;
  
//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;

// const CategoryButton = styled.button`
//   background-color: #f5f5f5;
//   border: none;
//   border-radius: 999px;
//   padding: 12px 20px;
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   cursor: pointer;
//   transition: all 0.2s;
  
//   .circle {
//     width: 24px;
//     height: 24px;
//     border-radius: 50%;
//     background-color: ${props => props.color || '#026283'};
//     flex-shrink: 0;
//   }
  
//   span {
//     font-size: 16px;
//     font-weight: 500;
//     white-space: nowrap;
//   }
  
//   &:hover {
//     background-color: #e5e5e5;
//     transform: translateY(-2px);
//   }
// `;

// Recently Visited Products Section
const ProductsSection = styled(motion.section)`
  padding: 15px 40px;
  max-width: 1200px;
  margin: 15px auto;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const ProductsTitle = styled.h2`
  font-size: 28px;
  font-weight: 500;
  color: #333;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 16px;
  }
`;

const ProductImage = styled.div`
  height: 200px;
  background-color: #f5f5f5;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .badge-container {
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    gap: 8px;
  }
  
  .badge {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
    font-size: 14px;
    
    &.purple {
      background-color: #8A2BE2;
    }
    
    &.orange {
      background-color: #FF8C00;
    }
  }
  
  .buyer-badge {
    position: absolute;
    right: 16px;
    bottom: 16px;
    background-color: #E0F7FF;
    color: #026283;
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 500;
  }
`;

const ProductContent = styled.div`
  padding: 20px;
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const ProductTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
`;

const ProductCompany = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  margin-bottom: 12px;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #f5f5f5;
  padding: 4px 8px;
  border-radius: 16px;
  
  span {
    font-weight: 500;
  }
`;

const ActionButton = styled.button`
  background-color: #f5f5f5;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #e5e5e5;
  }
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
  line-height: 1.5;
`;

const PriceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PriceLabel = styled.span`
  font-size: 12px;
  color: #666;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #333;
`;

const BuyButton = styled.button`
  background-color: #026283;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #014e6a;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const CategoryMessage = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const MessageText = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.5;
  
  strong {
    font-weight: 600;
  }
`;

const ViewAllButton = styled.button`
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 999px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #e5e5e5;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const CategorySliderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 40px;
  max-width: 1200px;
  margin: 15px auto;
  background: white;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px 20px;
    gap: 16px;
  }
`;

const CategoryTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const CategorySliderContainer = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 10px;
    
    /* Hide scrollbar */
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const SliderArrowButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  margin: 0 10px;
  
  &:hover {
    background-color: #555;
  }
  
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 12px;
    flex-shrink: 0;
  }
`;

// const CategoryList = styled.div`
//   display: flex;
//   gap: 12px;
  
//   @media (max-width: 768px) {
//     gap: 8px;
//   }
// `;

const CategoryButton = styled.button`
  background-color: #f5f5f5;
  border: none;
  border-radius: 999px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  white-space: nowrap;
  
  .circle {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: ${props => props.color || '#026283'};
    flex-shrink: 0;
  }
  
  span {
    font-size: 16px;
    font-weight: 400;
    color: #333;
  }
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    
    .circle {
      width: 20px;
      height: 20px;
    }
    
    span {
      font-size: 14px;
    }
  }
`;

// Add these new styled components for the slider functionality
const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const SliderWrapper = styled.div`
  display: flex;
  transition: transform 0.3s ease;
  transform: translateX(${props => `-${props.translateValue}%`});
`;

const SliderControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 12px;
`;

const SliderDot = styled.div`
  width: 40px;
  height: 8px;
  border-radius: 4px;
  background-color: ${props => props.active ? '#026283' : '#E5E7EB'};
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  @media (max-width: 768px) {
    width: 24px;
    height: 6px;
  }
`;

const ProductCardWrapper = styled.div`
  flex: 0 0 ${props => `${100 / props.slidesPerView}%`};
  padding: 0 10px;
  box-sizing: border-box;
`;

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownItems, setDropdownItems] = useState([]);
  const [sliderStartIndex, setSliderStartIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [activeCategory, setActiveCategory] = useState(0);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const totalSlides = 6; // Total number of products in the slider
  const dropdownRef = useRef(null);

  const cardsPerCategory = [4, 3, 1, 1]; // index: 0=creative, 1=bot, 2=doc, 3=sales

  // Featured Categories data
  const categoryData = [
    { 
      name: "AI powered creative tools",
      logo: creativetool,
      path: '/featured-categories'
    },
    { 
      name: "Conversation BOT", 
      logo: coversationbot,
      path: '/conversation-bot'
    },
    { 
      name: "Sales Automation AI",
      logo: salesautomation,
      path: '/sale-automation'
    },
    { 
      name: "Documentation AI", 
      logo: documentation,
      path: '/documentation-ai'
    },
  ];

  // Handle slider previous for Featured Categories
  const handleSliderPrev = () => {
    // If at start, loop to the end
    if (sliderStartIndex <= 0) {
      setSliderStartIndex(Math.floor((categoryData.length - 3) / 3) * 3);
    } else {
      setSliderStartIndex(Math.max(0, sliderStartIndex - 3));
    }
  };

  // Handle slider next for Featured Categories
  const handleSliderNext = () => {
    // If at the end or near end, loop back to start
    if (sliderStartIndex + 3 >= categoryData.length) {
      setSliderStartIndex(0);
    } else {
      setSliderStartIndex(sliderStartIndex + 3);
    }
  };
  
  // Handle slider navigation for Recently Visited Products
  const handleProductSlide = (index) => {
    setCurrentSlide(index);
  };
  
  const handlePrevSlide = () => {
    const newSlide = currentSlide === 0 ? Math.ceil(6 / slidesPerView) - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };
  
  const handleNextSlide = () => {
    const newSlide = currentSlide === Math.ceil(6 / slidesPerView) - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(1);
        setIsMobile(true);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
        setIsMobile(false);
      } else {
        setSlidesPerView(3);
        setIsMobile(false);
      }
    };
    
    handleResize(); // Call once on component mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const popularCategories = [
    { id: 1, name: 'AI powered creative tools', path: '/featured-categories' },
    { id: 2, name: 'Conversation BOT', path: '/conversation-bot' },
    { id: 3, name: 'Documentation AI', path: '/documentation-ai' },
    { id: 4, name: 'Sales Automation tool', path: '/sale-automation' },
    { id: 5, name: 'HRMS', path: '/categories/hrms' },
  ];

  const trendingProducts = [
    { id: 1, name: 'QuicksmartAI', path: '/quick-smart-review' },
    { id: 2, name: 'ScogoAI', path: '/products/scogo-ai' },
    { id: 3, name: 'AmmplifAI', path: '/products/ammplif-ai' },
    { id: 4, name: 'NapkinAI', path: '/products/napkin-ai' },
    { id: 5, name: 'InvideoAI', path: '/products/invideo-ai' },
    { id: 6, name: 'Quicksmart', path: '/products/quicksmart' },
    { id: 7, name: 'HiavaAI', path: '/products/hiava-ai' },
    { id: 8, name: 'CaptionAI', path: '/products/caption-ai' },
    { id: 9, name: 'ZrikaAI', path: '/products/zrika-ai' },
    { id: 10, name: 'LowtouchAI', path: '/products/lowtouch-ai' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  const handleInputFocus = () => {
    setShowDropdown(true);
  };

 

  const handleItemClick = (path) => {
    navigate(path);
    setShowDropdown(false);
  };


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
      // navigate(`/products?search=${searchTerm}`);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(value.toLowerCase())
      );
      const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );
      setDropdownItems([...filteredCategories, ...filteredProducts]);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
      setDropdownItems([]);
    }
  };

  const selectDropdownItem = (item) => {
    setSearchTerm(item.name || item.title);
    setShowDropdown(false);
    handleSearch();
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
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
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

  // Software categories data
  const softwareCategories = [
    'Ai powered creative tools', 
    'Conversation BOT', 
    'Documentation AI', 
    'Sales Automation AI', 
   
  ];
  
  // Software data for each category (same data for all categories in this example)
  const softwareData = [
    { color: '#FFB347', name: 'Napkin.ai', rating: '5.0', reviews: 144,  image:napkinlogo2 },
    { color: '#FFB347', name: 'Caption.ai', rating: '5.0', reviews: 144, image: caption },
    { color: '#779ECB', name: 'Invideo.ai', rating: '5.0', reviews: 144, image: invideo },
    { color: '#FF6961', name: 'Ammplify.ai', rating: '5.0', reviews: 144, image: amplify },
    { color: '#FFD700', name: 'Quicksmart.ai', rating: '5.0', reviews: 144, image: quick },
    { color: '#B19CD9', name: 'Scogo.ai', rating: '5.0', reviews: 144,  image : scogologo },
    { color: '#B19CD9', name: 'Lowtouch.ai', rating: '5.0', reviews: 144, image: lowtouch},
    { color: '#B19CD9', name: 'Hiava.ai', rating: '5.0', reviews: 144, image: ava },
    { color: '#B19CD9', name: 'Zrika.ai', rating: '5.0', reviews: 144, image: zrika},
  ];
  
  // Handler for category tab click
  const handleCategoryClick = (index) => {
    if (index === activeCategory) return;
    
    setLoadingCategory(true);
    
    // Simulate loading data for the new category
    setTimeout(() => {
      setActiveCategory(index);
      setLoadingCategory(false);
    }, 500); // Simulate a short loading time
  };

  const productData = [
    {
      id: 1,
      image: QuicksmartAI,
      title: "Quicksmart AI",
      company: "AI-Powered Assistants",
      rating: 5.0,
      description: "QuickSmart AI offers AI-driven SIP VoIP with 10+ years of expertise..",
      price: "On Request"
    },
    {
      id: 2,
      image: NapkinAI,
      title: "Napkin AI",
      company: "By Sketch Solutions",
      rating: 4.8,
      description: "Convert hand-drawn sketches into professional wireframes using AI technology.",
      price: "₹3,499"
    },
    {
      id: 3,
      image: HiavaAI,
      title: "Hiava AI",
      company: "AI-powered writing assistant",
      rating: 4.9,
      description: "Ava an AI assistant boosts by create drafts first helping is productivity quickly that users writing.",
      price: "$9/month"
    },
    {
      id: 4,
      image: ScogoAI,
      title: "Scogo AI",
      company: "AI Customer Support Platform",
      rating: 4.7,
      description: "Scogo.ai makes AI as simple and affordable as UPI to help businesses grow.",
      price: "On Request"
    },
    {
      id: 5,
      image: QuicksmartAI,
      title: "Quicksmart AI",
      company: "By Vision Analytics",
      rating: 4.5,
      description: "Computer vision software for automated quality control and inspection systems.",
      price: "₹6,299"
    },
    {
      id: 6,
      image: NapkinAI,
      title: "Napkin AI",
      company: "AI-Powered Assistants",
      rating: 4.3,
      description: "Ava an AI assistant boosts by create drafts first helping is productivity quickly that users writing.",
      price: "₹4,599"
    },
    {
      id: 7,
      image: HiavaAI,
      title: "Hiava AI",
      company: " AI-Powered Assistants​",
      rating: 4.8,
      description: "Ava an AI assistant boosts by create drafts first helping is productivity quickly that users writing.",
      price: "₹8,999"
    },
    {
      id: 8,
      image: ScogoAI,
      title: "Scogo AI",
      company: "By Cloud Solutions",
      rating: 4.9,
      description: "Cloud-based AI infrastructure for deploying and scaling machine learning models.",
      price: "₹5,499"
    },
    {
      id: 9,
      image: QuicksmartAI,
      title: "TextGenius",
      company: "By Language Tech",
      rating: 4.7,
      description: "Natural language processing tool for content analysis and text summarization.",
      price: "₹3,299"
    },
    {
      id: 10,
      image: NapkinAI,
      title: "AudioSense",
      company: "By Sound Technologies",
      rating: 5.0,
      description: "AI-powered audio processing software for speech recognition and sound analysis.",
      price: "₹4,799"
    }
  ];
  

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
      ref={dropdownRef}
    >
      <SearchInput
        placeholder="Search by Category, Product or Keyword"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
      <SearchButton
        onClick={handleSearch}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <IoIosSearch />
        Search
      </SearchButton>
      
      {showDropdown && (
        <DropdownContainer>
          <Section>
            <SectionTitle>Popular Categories</SectionTitle>
            <CategoryList>
              {popularCategories.map((category) => (
                <CategoryItem 
                  key={category.id} 
                  onClick={() => handleItemClick(category.path)}
                >
                  {category.name}
                </CategoryItem>
              ))}
            </CategoryList>
          </Section>
          
          <Section>
            <SectionTitle>Trending Products</SectionTitle>
            <ProductList>
              {trendingProducts.map((product) => (
                <ProductItem 
                  key={product.id} 
                  onClick={() => handleItemClick(product.path)}
                >
                  <SearchIcon>
                    <IoIosSearch />
                  </SearchIcon>
                  {product.name}
                </ProductItem>
              ))}
            </ProductList>
          </Section>
        </DropdownContainer>
      )}
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
              <motion.img src={seo} alt="SEO Tool" whileHover={{ scale: 1.05 }} />
            </ImageWrapper>

            <ImageWrapper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <motion.img src={seo_2} alt="AI Interface" whileHover={{ scale: 1.05 }} />
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

      <CategorySliderSection>
  <CategoryTitle>Featured Categories</CategoryTitle>
  <CategorySliderContainer>
    <SliderArrowButton onClick={handleSliderPrev}>
      <span>&#10094;</span>
    </SliderArrowButton>
    <CategoryList>
      {categoryData.slice(sliderStartIndex, sliderStartIndex + 3).map((category, index) => (
        <CategoryButton 
          key={index}
          onClick={() => navigate(category.path)}
        >
          <span>{category.name}</span>
        </CategoryButton>
      ))}
    </CategoryList>
    <SliderArrowButton onClick={handleSliderNext}>
      <span>&#10095;</span>
    </SliderArrowButton>
  </CategorySliderContainer>
</CategorySliderSection>

<ProductsSection
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ProductsTitle>Recently Visited Products</ProductsTitle>
      <SliderContainer>
        <SliderWrapper translateValue={currentSlide * (100 / slidesPerView) * slidesPerView}>
          {productData.map((product, index) => (
            <ProductCardWrapper key={index} slidesPerView={slidesPerView}>
              <ProductCard>
                <ProductImage>
                  <img src={product.image} alt={product.title} />
                </ProductImage>
                <ProductContent>
                  <ProductHeader>
                    <div>
                      <ProductTitle>Software Rating</ProductTitle>
                      <ProductCompany>{product.company}</ProductCompany>
                    </div>
                  </ProductHeader>
                  <RatingContainer>
                    <Rating>
                      <span>{product.rating.toFixed(1)}</span>
                      <Star size={16} fill="#FFD700" color="#FFD700" />
                    </Rating>
                    <ActionButton>Read reviews</ActionButton>
                    <ActionButton>Features</ActionButton>
                  </RatingContainer>
                  <ProductDescription>
                    {product.description}
                  </ProductDescription>
                  <PriceSection>
                    <PriceContainer>
                      <PriceLabel>Starting at</PriceLabel>
                      <Price>{product.price}</Price>
                    </PriceContainer>
                    <BuyButton>Buy Now</BuyButton>
                  </PriceSection>
                </ProductContent>
              </ProductCard>
            </ProductCardWrapper>
          ))}
        </SliderWrapper>
        <SliderControls>
          {Array.from({ length: Math.ceil(productData.length / slidesPerView) }).map((_, index) => (
            <SliderDot 
              key={index} 
              active={currentSlide === index} 
              onClick={() => handleProductSlide(index)}
            />
          ))}
        </SliderControls>
      </SliderContainer>
      <CategoryMessage>
        {/* <MessageText>
          You have only visited <strong>three product(s)</strong>.<br />
          There are over <strong>60+ categories</strong> for u to explore.
        </MessageText>
        <ViewAllButton onClick={() => navigate('/categories')}>
          View All Categories
        </ViewAllButton> */}
      </CategoryMessage>
    </ProductsSection>


      
      {/* <Section>
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
            Recently Visited Products
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
      </Section> */}

      

      <UniqueContentWrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <UniqueSectionTitle
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Discover Top Software by Categories
      </UniqueSectionTitle>

      <UniqueDiscoveryContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        
        <UniqueCategoryLists>
          {isMobile ? (
            <select 
              style={{ 
                width: '100%', 
                padding: '10px', 
                borderRadius: '8px', 
                border: '1px solid #ddd',
                backgroundColor: '#f9f9f9'
              }}
              value={activeCategory}
              onChange={(e) => handleCategoryClick(parseInt(e.target.value))}
            >
              {softwareCategories.map((cat, idx) => (
                <option key={idx} value={idx}>{cat}</option>
              ))}
            </select>
          ) : (
            softwareCategories.map((cat, idx) => (
              <UniqueCategoryTab 
                key={idx} 
                active={idx === activeCategory}
                onClick={() => handleCategoryClick(idx)}
              >
                {cat}
              </UniqueCategoryTab>
            ))
          )}
        </UniqueCategoryLists>

        <UniqueSoftwareGrid>
  {loadingCategory ? (
    Array(cardsPerCategory[activeCategory]).fill(0).map((_, i) => (
      <UniqueSoftwareCard key={i} style={{ opacity: 0.6 }}>
        <UniqueSoftwareIcon bg="#eee" />
        <div style={{ width: '80%', height: '14px', background: '#eee', margin: '0 auto 8px', borderRadius: '4px' }} />
        <div style={{ width: '60%', height: '14px', background: '#eee', margin: '0 auto', borderRadius: '4px' }} />
      </UniqueSoftwareCard>
    ))
  ) : (
    softwareData.slice(0, cardsPerCategory[activeCategory]).map((software, i) => (
      <UniqueSoftwareCard 
        key={i} 
        whileHover={{ scale: 1.03 }}
        onClick={() => navigate(`/products/software-${i+1}`)}
      >
        <UniqueSoftwareIcon bg={software.color}>
          <img src={software.image} alt={software.name} />
        </UniqueSoftwareIcon>
        <UniqueRatingStars>
          <UniqueRatingBadge>{software.rating} ★</UniqueRatingBadge>
          <UniqueReviewCount>({software.reviews} Reviews)</UniqueReviewCount>
        </UniqueRatingStars>
        <UniqueSoftwareName>{software.name}</UniqueSoftwareName>
      </UniqueSoftwareCard>
    ))
  )}
</UniqueSoftwareGrid>
      </UniqueDiscoveryContainer>
    </UniqueContentWrapper>
     
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
            {/* <ReviewAllButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
            >
              All Review
            </ReviewAllButton> */}
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
                  // onClick={() => navigate(`/products/${review.product_id}`)}
                >
                  <div className="quote-icon">❝</div>
                  <p className="quote-text">
                    "{review.comment || "Every new business and start-up, big or small, goes through the five stages of business growth. These phases include existence, survival, success, take-off, and resource maturity."}"
                  </p>
                  <div className="rating">
                    {renderStars(review.rating || 5)}
                    <span className="rating-count">({review.rating_count || 1156})</span>
                  </div>
                  {/* <a href="#" className="read-more" onClick={(e) => {
                    e.preventDefault();
                    navigate(`/products/${review.product_id}`);
                  }}>
                    Read More <span>→</span>
                  </a> */}
                </SoftwareReviewCard>
              );
            })}
          </ReviewCardsGrid>
        </ContentWrapper>
      </ReviewsWrapper>
{/* 
      <ExploreSection
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.0 }}
    >
      <SectionTitle>Explore Products by Services</SectionTitle>
      <ProductGrid>
        {[...Array(6)].map((_, index) => (
          <ProductCard key={index}>
            <CardTitle>Software & App</CardTitle>
            <CategoryLink href="#"> Software Companies</CategoryLink>
            {[...Array(8)].map((_, i) => (
              <CompanyName key={i}>Software Companies</CompanyName>
            ))}
          </ProductCard>
        ))}
      </ProductGrid>
    </ExploreSection> */}

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
              { id: 1, name: "Quicksmart AI", image: QuicksmartAI, description: "offers AI-driven SIP VoIP with 10+ years of expertise." },
              { id: 2, name: "Napkin AI", image: NapkinAI, description: "AI transforms text into visuals, boosting business communicatio." },
              { id: 3, name: "Hiava AI", image: HiavaAI, description: "Ava is an AI assistant that speeds up first draft creation." },
              { id: 4, name: "Scogo AI", image: ScogoAI, description: "Makes AI easy and affordable for business growth." }
            ]).map((product, i) => (
              <Card 
                key={product.id || i}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + (i * 0.1) }}
                // onClick={() => navigate(`/products/${product.id}`)}
              >
                <CardImage 
                  src={product.image_url || product.logo || [QuicksmartAI, NapkinAI, HiavaAI, ScogoAI][i % 4]} 
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
                      View Product 
                      <ArrowRight size={14} />
                    </a>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </ContentWrapper>
      </Section>

      {/* <Section>
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
                    // onClick={() => {
                    //   const ids = [products[idx1].id, products[idx2].id].join(',');
                    //   navigate(`/comparison?products=${ids}`);
                    // }}
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
      </Section> */}

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
              {/* <ExploreButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 2.2 }}
                onClick={() => navigate('/products')}
              >
                Explore All Tools
              </ExploreButton> */}
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

      {/* <RegisterSection
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <TextSection>
        <h2>
          Grow your business faster <br />
          <span>by selling your product</span>
        </h2>
        <p>Sell your products to customers on selectease.world</p>
      </TextSection>

      <FormSection>
        <RegisterForm>
          <Titles>List Your Product - It's Free</Titles>

          <InputGroup>
            <InputField>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Select-Ease" />
            </InputField>

            <InputField>
              <label htmlFor="businessEmail">Business Email</label>
              <input type="email" id="businessEmail" placeholder="business@gmail.com" />
            </InputField>
          </InputGroup>

          <InputGroup>
            <InputField>
              <label htmlFor="organization">Organization</label>
              <input type="text" id="organization" placeholder="Organization" />
            </InputField>

            <InputField>
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" placeholder="+91" />
            </InputField>
          </InputGroup>

          <InputGroup>
            <InputField>
              <label htmlFor="website">Website</label>
              <input type="url" id="website" placeholder="selectease.com" />
            </InputField>

            <InputField>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="********" />
            </InputField>
          </InputGroup>

          <NextButton type="submit">Next</NextButton>

          <LoginLink>
            Already have an account? <span>Sign In</span>
          </LoginLink>

          <TermsText>
            By signing up you agree to the <span style={{ color: "#ffffff" }}>Terms of Use</span> and{' '}
            <span style={{ color: "#ffffff" }}>Privacy Policy</span>.
          </TermsText>
        </RegisterForm>
      </FormSection>
    </RegisterSection> */}

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
            style={{ textAlign: 'left' }}
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
                // onClick={() => navigate(`/blog-details/${blog.id}`)}
              >
                <CardImage 
                  src={blog.image_url || [categories_1, categories_2, categories_3][i % 3]} 
                  alt={blog.title}
                  whileHover={{ scale: 1.05 }}
                />
                <CardContent>
                  <h3>{blog.title}</h3>
                  <p>{blog.summary?.substring(0, 80) || "Lorem ipsum dolor sit amet consectetur."}{blog.summary?.length > 80 ? "..." : ""}</p>
                  {/* <a href="#" onClick={(e) => {
                    e.preventDefault();
                    navigate(`/blog-details/${blog.id}`);
                  }}>
                    Read More <ArrowRight size={14} />
                  </a> */}
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
                {/* <input type="email" placeholder="Your work email address" /> */}
                {/* <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join the waitlist
                </motion.button> */}
              </motion.div>
            </div>
          </WaitlistBanner>
        </ContentWrapper>
      </Section>
    </Container>
  );
};

export default Home;