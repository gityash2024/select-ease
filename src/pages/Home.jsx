import React from 'react';
import styled from 'styled-components';
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
import Comparison_1 from '../assets/Comparison_1.png'
import Comparison_2 from '../assets/Comparison_2.png'
import Comparison_3 from '../assets/Comparison_3.png'
import Comparison_4 from '../assets/Comparison_4.png'
import Comparison_5 from '../assets/Comparison_5.png'
import Comparison_6 from '../assets/Comparison_6.png'
import Comparison_7 from '../assets/Comparison_7.png'
import Comparison_8 from '../assets/Comparison_8.png'
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
// import {BgMask} from '../assets/BgMask.png'
 
const Section = styled.section`
  width: 100%;
  padding: ${props => props.padding || '20px 0'};
  background: ${props => props.background || 'white'};
`;

const HeroSection = styled(Section)`
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

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
  overflow-x: hidden; // Add this line
`;

const Container = styled.div`
  width: 100%;
  overflow-x: hidden; // Add this line
`;





const Title = styled.h1`
  font-size: 56px;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 40px;
  max-width: 830px;
  margin-left: auto;
  margin-right: auto;
  color: black; 
  font-family:outfit;
`;


const BoldSpan = styled.span`
  font-weight: 700; 
`;

const SearchContainer = styled.div`
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

const SearchButton = styled.button`
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

const ImagesSection = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 0px;
  padding: 0 20px; // Add this line
  box-sizing: border-box; // Add this line
`;
const ImageWrapper = styled.div`
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


const Dot = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${props => props.color};
  ${props => props.position};
  z-index: 2;
`;

// const SectionTitle = styled.h2`
//   font-size: 42px;
//   font-weight: 400;
//   color: ${props => props.color || '#1A1A1A'};
//   margin-bottom: 40px;
// `;

const Grid = styled.div`
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

const Card = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  color:#383B46;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
  border: 1px solid #E0E0E0; 
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-4px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
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
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ReviewsSection = styled(Section)`
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  color: white;
  padding: 60px 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 55, 80, 0.9);
  }
`;

// const SoftwareReviewCard = styled.div`
// background: white;
// border-radius: 16px;
// padding: 32px;
// position: relative;
// width: 380px;

// .quote-icon {
//   color: #026283;
//   font-size: 45px;
//   line-height: 1;
//   font-family: serif;
// }

// .quote-text {
//   font-size: 20px;
//   line-height: 34px;
//   margin: 24px 0;
//   color: #111111;
//   font-weight: 400;
//   font-family: 'Outfit', sans-serif;
// }

// .rating {
//   display: flex;
//   align-items: center;
//   gap: 4px;
//   margin-bottom: 16px;
// }

// .stars {
//   display: flex;
//   gap: 4px;
// }

// .rating-count {
//   color: #111111;
//   font-size: 16px;
//   margin-left: 8px;
// }

// .read-more {
//   color: #006B8F;
//   text-decoration: none;
//   font-size: 16px;
//   display: flex;
//   align-items: center;
//   gap: 8px;
  
//   &:hover {
//     text-decoration: underline;
//   }
// }
// `;
const ReviewGrid = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 40px;
  overflow-x: hidden; // Change from auto to hidden
  padding-bottom: 20px;
  
  // Remove scrollbar styles since we're hiding overflow
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ReviewButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50px;
  color: white;
  padding: 16px 32px;
  font-size: 16px;
  cursor: pointer;
  height: 52px;
  transition: background 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ComparisonTable = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

const ComparisonItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

const CompanyGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  
  span {
    font-size: 14px;
    color: #333;
  }
`;

const VsCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #006B8F;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;


const ReviewCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  position: relative;

  .review-image {
    position: absolute;
    top: -20px;
    left: -20px;
    width: 40px;
    height: 40px;
  }

  p {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 16px;
    color: #333;
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 12px;
    
    svg {
      color: #FFD700;
      width: 16px;
      height: 16px;
    }
    
    span {
      color: #666;
      font-size: 14px;
    }
  }
`;

const TestimonialsSection = styled(Section)`
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
`;

const TestimonialsGrid = styled.div`
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

const TestimonialCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px;
  text-align: left;
  border: 1px solid #E5E7EB;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  
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


const WaitlistBanner = styled.div`
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
        background: #026283;
        color: white;
        border: none;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
        white-space: nowrap;
        transition: background 0.2s;
        
        &:hover {
          background: #015272;
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

const HowItWorksSection = styled(Section)`
  background: #003750;
  color: white;
  padding: 40px 0; // Reduced from 80px to 40px
  
  ${ContentWrapper} {
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px; // Reduced from 48px to 32px
  align-items: center;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; // Reduced from 32px to 20px
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  
  .icon-wrapper {
    width: 40px; // Reduced from 48px
    height: 40px; // Reduced from 48px
    border-radius: 50%;
    background: #026283;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
      width: 20px; // Reduced from 24px
      height: 20px; // Reduced from 24px
    }
  }
  
  .text {
    h3 {
      font-size: 18px; // Reduced from 20px
      font-weight: 600;
      margin-bottom: 4px; // Reduced from 8px
      color: white;
    }
    
    p {
      color: rgba(255, 255, 255, 0.8);
      font-size: 14px; // Reduced from 16px
      line-height: 1.4;
    }
  }
`;

const ExploreButton = styled.a`
  display: inline-block;
  margin-top: 24px; // Reduced from 32px
  padding: 12px 24px;
  background: #006B8F;
  color: white;
  text-decoration: none;
  border-radius: 23px;
  transition: background 0.2s;
  
  &:hover {
    background: #005472;
  }
`;

const ReviewsWrapper = styled.section`
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

// const ContentWrapper = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 0 24px;
//   position: relative;
//   z-index: 1;
// `;

const ReviewHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 48px;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SectionTitle = styled.h2`
  color: ${props => props.color};
  font-size: 42px;
  font-weight: 700;
  line-height: 1.2;
  max-width: 400px;
  margin: 0;
  padding: 15px;
`;

const ReviewAllButton = styled.button`
  background-color: #026283;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;

  &:hover {
    background-color: #037399;
  }
`;

const ReviewCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SoftwareReviewCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  
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

    .stars {
      color: #FFD700;
      font-size: 20px;
      letter-spacing: 2px;
    }

    .rating-count {
      color: #666;
      font-size: 14px;
    }
  }

  .read-more {
    color: #026283;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    font-size: 16px;

    span {
      transition: transform 0.2s ease;
    }

    &:hover span {
      transform: translateX(4px);
    }
  }
`;



const Home = () => {
  return (
    <Container>
      <HeroSection>
        <img src={hero} alt="" className="contact-hero-background" />

        <ContentWrapper>
          <Title>
            Find the <BoldSpan>Best AI Tools</BoldSpan> with <BoldSpan>Expert Reviews</BoldSpan> and <BoldSpan>Comparisons</BoldSpan>.
          </Title>

          <SearchContainer>
      <SearchInput placeholder="Search..." />
      <SearchButton><IoIosSearch />Search</SearchButton>
    </SearchContainer>

          <ImagesSection>
            <ImageWrapper>
              <Dot color="#FF6B6B" position="top: -35px; left: -160px;" />
              <img src={seo} alt="SEO Tool" />
            </ImageWrapper>

            <ImageWrapper>
              <img src={seo_2} alt="AI Interface" />
              <img className="icon python" src={python} alt="Python" />
              <img className="icon oracle" src={oracl} alt="Oracle" />
              <img className="icon boat" src={boat} alt="Boat" />
            </ImageWrapper>

            <ImageWrapper>
              <Dot color="#FF6B6B" position="bottom: 110px; right: -90px;" />
              <img src={seo_3} alt="Model Directory" />
            </ImageWrapper>
          </ImagesSection>
        </ContentWrapper>
      </HeroSection>

      <Section>
        <ContentWrapper>
          <SectionTitle>Featured Categories</SectionTitle>
          <Grid columns="repeat(3, 1fr)">
            {[categories_1, categories_2, categories_3].map((img, i) => (
              <Card key={i}>
                <CardImage src={img} alt="Category" />
                <CardContent>
                  <h3>Meta AI</h3>
                  <p>Lorem ipsum dolor sit amet consectetur. Semper ornare viverra volutpat.</p>
                  <a href="#">Explore Categories →</a>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </ContentWrapper>
      </Section>

      <Section>
        <ContentWrapper>
          <SectionTitle>Top Rated Products</SectionTitle>
          <Grid columns="repeat(4, 1fr)">
            {[product_1, product_2, product_3, product_4].map((img, i) => (
              <Card key={i}>
                <CardImage src={img} alt="Product" />
                <CardContent>
                  <h3>Meta AI</h3>
                  <p>Lorem ipsum dolor sit amet consectetur.</p>
                  <a href="#">Explore Categories →</a>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </ContentWrapper>
      </Section>
      
      <ReviewsWrapper>
      <ContentWrapper>
        <ReviewHeading>
          <SectionTitle color="white">
            Top 8 Most Reviewed Software of June 2024
          </SectionTitle>
          <ReviewAllButton>All Review</ReviewAllButton>
        </ReviewHeading>
        
        <ReviewCardsGrid>
          <SoftwareReviewCard>
            <div className="quote-icon">❝</div>
            <p className="quote-text">
              "Every new business and start-up, big or small, goes through the five stages of business growth. These phases include existence, survival, success, take-off, and resource maturity."
            </p>
            <div className="rating">
              <div className="stars">{'★★★★★'}</div>
              <span className="rating-count">(1156)</span>
            </div>
            <a href="#" className="read-more">
              Read More <span>→</span>
            </a>
          </SoftwareReviewCard>

          <SoftwareReviewCard>
            <div className="quote-icon">❝</div>
            <p className="quote-text">
              "Every new business and start-up, big or small, goes through the five stages of business growth. These phases include existence, survival, success, take-off, and resource maturity."
            </p>
            <div className="rating">
              <div className="stars">{'★★★★★'}</div>
              <span className="rating-count">(1156)</span>
            </div>
            <a href="#" className="read-more">
              Read More <span>→</span>
            </a>
          </SoftwareReviewCard>
        </ReviewCardsGrid>
      </ContentWrapper>
    </ReviewsWrapper>

      <Section>
        <ContentWrapper>
          <SectionTitle>Comparison Tables</SectionTitle>
          <ComparisonTable>
            {[
              [Comparison_1, Comparison_2],
              [Comparison_3, Comparison_4],
              [Comparison_5, Comparison_6],
              [Comparison_7, Comparison_8],
              [Comparison_8, Comparison_9],
              [Comparison_1, Comparison_3],
              [Comparison_4, Comparison_5],
              [Comparison_6, Comparison_7],
              [Comparison_8, Comparison_9],
            ].map(([img1, img2], i) => (
              <div className="comparison-item" key={i}>
                {/* <div className="company">
            <img src={img1} alt="Company 1" />
            <span>BambooHR</span>
          </div> */}
                <div className="vs">
                  <div className="dot"></div>
                  <img src={img2} alt="Company 2" />
                </div>
              </div>
            ))}
          </ComparisonTable>
        </ContentWrapper>
      </Section>

      <HowItWorksSection>
        <ContentWrapper>
          <Content>
            <div>
              <SectionTitle color="white">How It Works</SectionTitle>
              <FeatureList>
                <FeatureItem>
                  <div className="icon-wrapper">
                    <img src={SalesAnalytics} alt="Sales Analytics" />
                  </div>
                  <div className="text">
                    <h3>Sales Analytics:</h3>
                    <p>Trends to Drive Informed Decisions and Optimize Performance.</p>
                  </div>
                </FeatureItem>

                <FeatureItem>
                  <div className="icon-wrapper">
                    <img src={ProductsAnalytics} alt="Products Analytics" />
                  </div>
                  <div className="text">
                    <h3>Products Analytics:</h3>
                    <p>Unleashing Insights to Enhance Offerings, Maximize Impact, and Delight Customers.</p>
                  </div>
                </FeatureItem>

                <FeatureItem>
                  <div className="icon-wrapper">
                    <img src={CustomersAnalytics} alt="Customers Analytics" />
                  </div>
                  <div className="text">
                    <h3>Customers Analytics:</h3>
                    <p>Preferences for Exceptional Customer Experiences and Lasting Relationships.</p>
                  </div>
                </FeatureItem>
              </FeatureList>
              <ExploreButton href="#">Explore All Tools</ExploreButton>
            </div>

            <img src={howItWorks} alt="How it works" style={{
              width: '100%',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
            }} />
          </Content>
        </ContentWrapper>
      </HowItWorksSection>

      <TestimonialsSection>
        <ContentWrapper>
          <SectionTitle style={{ textAlign: 'center' }}>Testimonials</SectionTitle>
                  <TestimonialsGrid>
            <TestimonialCard>
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

            <TestimonialCard>
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
        <ContentWrapper>
          <SectionTitle>Blog Highlights</SectionTitle>
          <Grid columns="repeat(3, 1fr)">
            {[categories_1, categories_2, categories_3].map((img, i) => (
              <Card key={i}>
                <CardImage src={img} alt="Blog" />
                <CardContent>
                  <h3>Meta AI</h3>
                  <p>Lorem ipsum dolor sit amet consectetur.</p>
                  <a href="#">Read More →</a>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </ContentWrapper>
      </Section>

      <Section>
        <ContentWrapper>
          <WaitlistBanner>
            <div className="image-section">
              <img src={waitlist} alt="Person wearing VR headset" />
            </div>
            <div className="content-section">
              <h2>Join 569 more people in the waitlist</h2>
              <div className="input-group">
                <input type="email" placeholder="Your work email address" />
                <button>Join the waitlist</button>
              </div>
            </div>
          </WaitlistBanner>
        </ContentWrapper>
      </Section>
    </Container>
  );
};

export default Home;