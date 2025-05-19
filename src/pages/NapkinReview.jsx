import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaStar, FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa';
import NapkinFeature from './NapkinFeature';
import NapkinRating from './NapkinRating';
import NapkinSpecification from './NapkinSpecification';
import NapkinSoftwareReviews from './NapkinSoftwareReviews';
import NapkinGetSoftwareCompanyDemo from './NapkinGetSoftwareCompanyDemo';
import NapkinDropdwon from './NapkinDropdwon';
// import image6 from '../src/assets/image6.png';
// import image7 from './src/assets/image7.png';
// import image8 from './src/assets/image8.png';
// import image9 from './src/assets/image9.png';
// import image10 from './src/assets/image10.png'; 
// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
 padding: 50px 25px;
`;

const PageContainer = styled.div`
  background-color: #fff;
  padding: 30px;
  font-family: 'Outfit', sans-serif;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  margin-bottom: 30px;
  background-color: #fff;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageSection = styled.div`
  width: 300px;
  margin-right: 30px;
  position: relative;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const MainImageSlider = styled.div`
  width: 100%;
  height: 200px;
  background-color: #000;
  border-radius: 8px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #777;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SliderArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.95);
    color: #026283;
  }
`;

const LeftArrow = styled(SliderArrow)`
  left: 10px;
`;

const RightArrow = styled(SliderArrow)`
  right: 10px;
`;

const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #333;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.95);
    color: #026283;
  }
`;

const ImageThumbnails = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 5px;
  
  &::-webkit-scrollbar {
    height: 3px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 10px;
  }
`;

const Thumbnail = styled.div`
  width: 60px;
  height: 45px;
  background-color: ${props => props.active ? '#e0e0e0' : '#f0f0f0'};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  color: #777;
  overflow: hidden;
  border: ${props => props.active ? '2px solid #026283' : '1px solid #ddd'};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfoSection = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TitleSection = styled.div`
  flex: 1;
`;

const AvatarSection = styled.div`
  @media (max-width: 768px) {
    margin-top: 15px;
    align-self: flex-end;
  }
`;

const Avatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color:rgb(9, 9, 9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 5px;
  font-size: 20px;
  color: #333;
  font-family: 'Outfit', sans-serif;
`;

const Company = styled.p`
  margin-bottom: 10px;
  font-size: 14px;
  color: #777;
  font-family: 'Outfit', sans-serif;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #ffc107;
  font-size: 14px;
  font-family: 'Outfit', sans-serif;
`;

const StarIcon = styled(FaStar)`
  margin-right: 5px;
`;

const ReviewCount = styled.span`
  color: #777;
  margin-left: 5px;
`;

const WriteReview = styled.a`
  color: #026283;
  font-size: 14px;
  text-decoration: none;
  display: inline-block;
  padding: 5px 0;
  font-family: 'Outfit', sans-serif;
  
  &:hover {
    text-decoration: underline;
  }
`;

const PricingSection = styled.div`
  margin: 15px 0;
`;

const PricingLabel = styled.div`
  font-size: 14px;
  color: #777;
  margin-bottom: 3px;
`;

const Pricing = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
  font-family: 'Outfit', sans-serif;
`;

const Description = styled.p`
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 25px;
  font-family: 'Outfit', sans-serif;
`;

const CallToAction = styled.button`
  background-color: #026283;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s ease;
  width: fit-content;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-family: 'Outfit', sans-serif;
  
  &:hover {
    background-color: #01516d;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 3px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 10px;
  }
  
  @media (max-width: 768px) {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
`;

const Tab = styled.button`
  border: none;
  background: none;
  padding: 15px 25px;
  cursor: pointer;
  font-size: 15px;
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? '#026283' : '#555'};
  border-bottom: 2px solid ${props => props.active ? '#026283' : 'transparent'};
  transition: all 0.3s ease;
  white-space: nowrap;
  font-family: 'Outfit', sans-serif;
  
  &:hover {
    color: #026283;
  }
`;

const ContentSection = styled.div`
  padding: 20px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

// Overview Content Component
const OverviewSection = styled.div`
  padding: 15px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
  font-size: 18px;
  font-family: 'Outfit', sans-serif;
`;

const SectionParagraph = styled.p`
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 10px;
  font-family: 'Outfit', sans-serif;
`;

const CompanyDetailsContainer = styled.div`
  padding: 15px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
`;

const CompanyDetailsTitle = styled(SectionTitle)`
  color: #333;
`;

const DetailsTable = styled.table`
  width: 100%;
`;

const DetailRow = styled.tr`
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const DetailLabel = styled.td`
  font-weight: 600;
  color: #555;
  padding-right: 15px;
  padding-bottom: 10px;
  width: 120px;
  font-family: 'Outfit', sans-serif;
`;

const DetailValue = styled.td`
  color: #555;
  padding-bottom: 10px;
  font-family: 'Outfit', sans-serif;
`;

// Skeleton Components
const SkeletonPulse = styled.div`
  background: #eee;
  background-image: linear-gradient(
    to right,
    #eee 0%,
    #f5f5f5 20%,
    #eee 40%,
    #eee 100%
  );
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s linear infinite;
`;

const SkeletonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const SkeletonProductCard = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SkeletonImageSection = styled.div`
  width: 300px;
  margin-right: 30px;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const SkeletonMainImage = styled(SkeletonPulse)`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const SkeletonThumbnails = styled.div`
  display: flex;
  gap: 10px;
`;

const SkeletonThumbnail = styled(SkeletonPulse)`
  width: 60px;
  height: 45px;
  border-radius: 4px;
`;

const SkeletonInfoSection = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const SkeletonTitle = styled(SkeletonPulse)`
  width: 70%;
  height: 24px;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const SkeletonSubtitle = styled(SkeletonPulse)`
  width: 40%;
  height: 16px;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const SkeletonRating = styled(SkeletonPulse)`
  width: 30%;
  height: 16px;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const SkeletonPricing = styled(SkeletonPulse)`
  width: 25%;
  height: 20px;
  margin: 15px 0;
  border-radius: 4px;
`;

const SkeletonDescription = styled(SkeletonPulse)`
  width: 100%;
  height: 80px;
  margin-bottom: 25px;
  border-radius: 4px;
`;

const SkeletonButton = styled(SkeletonPulse)`
  width: 150px;
  height: 42px;
  border-radius: 30px;
`;

const SkeletonTabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  overflow-x: auto;
`;

const SkeletonTab = styled(SkeletonPulse)`
  width: 100px;
  height: 36px;
  border-radius: 4px;
  flex-shrink: 0;
`;

const SkeletonContent = styled(SkeletonPulse)`
  width: 100%;
  height: 300px;
  border-radius: 8px;
`;

// Skeleton Loader Component
const SkeletonLoader = () => (
  <SkeletonContainer>
    <SkeletonProductCard>
      <SkeletonImageSection>
        <SkeletonMainImage />
        <SkeletonThumbnails>
          <SkeletonThumbnail />
          <SkeletonThumbnail />
          <SkeletonThumbnail />
          <SkeletonThumbnail />
        </SkeletonThumbnails>
      </SkeletonImageSection>
      <SkeletonInfoSection>
        <SkeletonTitle />
        <SkeletonSubtitle />
        <SkeletonRating />
        <SkeletonSubtitle />
        <SkeletonPricing />
        <SkeletonDescription />
        <SkeletonButton />
      </SkeletonInfoSection>
    </SkeletonProductCard>
    
    <SkeletonTabs>
      <SkeletonTab />
      <SkeletonTab />
      <SkeletonTab />
      <SkeletonTab />
      <SkeletonTab />
      <SkeletonTab />
      <SkeletonTab />
    </SkeletonTabs>
    
    <SkeletonContent />
  </SkeletonContainer>
);

// Dynamic Overview Content Component
const OverviewContent = ({ data }) => {
  return (
    <div>
      <OverviewSection>
        <SectionTitle>Napkin.ai</SectionTitle>
        <SectionParagraph>
          {data.softwareOverview}
        </SectionParagraph>
      </OverviewSection>

      <CompanyDetailsContainer>
        <CompanyDetailsTitle>Company Details</CompanyDetailsTitle>
        <DetailsTable>
          <tbody>
            <DetailRow>
              <DetailLabel>Brand Name</DetailLabel>
              <DetailValue>{data.companyDetails.brandName}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Information</DetailLabel>
              <DetailValue>{data.companyDetails.information}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Founded</DetailLabel>
              <DetailValue>{data.companyDetails.founded}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Founder</DetailLabel>
              <DetailValue>{data.companyDetails.founder}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Company Size</DetailLabel>
              <DetailValue>{data.companyDetails.companySize}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Other Products</DetailLabel>
              <DetailValue>{data.companyDetails.otherProducts}</DetailValue>
            </DetailRow>
          </tbody>
        </DetailsTable>
      </CompanyDetailsContainer>
    </div>
  );
};

// Dynamic Features Content
const FeaturesContent = () => (
  <div>Features content will be here.</div>
);

// Dynamic Reviews Content
const ReviewsContent = () => (
  <div>Reviews content will be here.</div>
);

// Dynamic Pricing Content
const PricingContent = () => (
  <div>Pricing & Plans content will be here.</div>
);

// Dynamic Specifications Content
const SpecificationsContent = () => (
  <div>Specifications content will be here.</div>
);

// Dynamic Compare Content
const CompareContent = () => (
  <div>Compare content will be here.</div>
);

// Dynamic FAQ Content
const FAQContent = () => (
  <div>Frequently Asked Questions will be here.</div>
);

// Mocked data structure for dynamic content
const mockProductData = {
    id: 1,
    title: "Napkin.ai",
    company: " AI-Powered Assistants​",
    rating: 4.3,
    reviewCount: 26,
    pricing: "₹ 9999",
    description: "An AI-powered automation platform that streamlines workflows, enhances decision-making, and reduces operational errors for businesses.",
    images: [
      { id: 1, url: "/api/placeholder/300/200", alt: "image40" },
      { id: 2, url: "/api/placeholder/300/200", alt: "image40" },
      { id: 3, url: "/api/placeholder/300/200", alt: "image40" },
      { id: 4, url: "/api/placeholder/300/200", alt: "image40" },
      { id: 5, url: "/api/placeholder/300/200", alt: "image40" }
    ],
    overview: {
      softwareOverview: "Napkin AI is an innovative platform that transforms text into compelling visuals, such as diagrams, charts, and flowcharts, enhancing business storytelling and communication.",
      companyDetails: {
        brandName: "Napkin.ai",
        information: "all-in-one solution for remote access, collaboration and desktop sharing over the internet.",
        founded: "2021",
        founder: "Pramod Sharma and Jerome Scholler",
        companySize: "11-50 employees",
        otherProducts: "QuickSmart Insights, QuickSmart Analytics"
      }
    }
  };

// Main Component with Dynamic Content
const NapkinReview = ({ product = mockProductData }) => {
  const [activeTab, setActiveTab] = useState('Reviews');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sectionsVisible, setSectionsVisible] = useState({
    mainContent: false,
    quickFeature: false,
    quickRating: false,
    quickspecifications: false,
    quicksoftwareReviews: false,
    softwareDemo: false,
    dropdown: false
  });

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setSectionsVisible(prev => ({...prev, mainContent: true}));
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Scroll loading effect for additional sections
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show components sequentially based on scroll position  
      if (scrollPosition > 0.2 * documentHeight && !sectionsVisible.NapkinFeature) {
        setSectionsVisible(prev => ({...prev, NapkinFeature: true}));
      }
      
      if (scrollPosition > 0.3 * documentHeight && !sectionsVisible.NapkinRating) {
        setSectionsVisible(prev => ({...prev, NapkinRating: true}));
      }
      
      if (scrollPosition > 0.4 * documentHeight && !sectionsVisible.NapkinSpecifications) {
        setSectionsVisible(prev => ({...prev, NapkinSpecifications: true}));
      }
      
      if (scrollPosition > 0.5 * documentHeight && !sectionsVisible.NapkinSoftwareReviews) {
        setSectionsVisible(prev => ({...prev, NapkinSoftwareReviews: true}));
      }
      
      if (scrollPosition > 0.6 * documentHeight && !sectionsVisible.NapkinGetSoftwareDemo) {
        setSectionsVisible(prev => ({...prev, NapkinGetSoftwareDemo: true}));
      }
      
      if (scrollPosition > 0.7 * documentHeight && !sectionsVisible.NapkinDropdwon) {
        setSectionsVisible(prev => ({...prev, NapkinDropdwon: true}));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionsVisible]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : product.images.length - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < product.images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  // Generate stars for rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarIcon key={i} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<StarIcon key={i} style={{ opacity: 0.5 }} />);
      } else {
        stars.push(<StarIcon key={i} style={{ opacity: 0.2 }} />);
      }
    }
    
    return stars;
  };

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OverviewContent data={product.overview} />;
      case 'Features':
        return <FeaturesContent />;
      case 'Reviews':
        return <ReviewsContent />;
      case 'Pricing & Plans':
        return <PricingContent />;
      case 'Specifications':
        return <SpecificationsContent />;
      case 'Compare':
        return <CompareContent />;
      case "FAQ's":
        return <FAQContent />;
      default:
        return <OverviewContent data={product.overview} />;
    }
  };

  return (
    <Container>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <>
          {sectionsVisible.mainContent && (
            <PageContainer>
              <ProductCard>
                <ImageSection>
                  <MainImageSlider>
                    <LeftArrow onClick={goToPreviousImage}>
                      <FaChevronLeft />
                    </LeftArrow>
                    <img 
                      src={product.images[currentImageIndex].url} 
                      alt={product.images[currentImageIndex].alt} 
                    />
                    <PlayButton>
                      <FaPlay />
                    </PlayButton>
                    <RightArrow onClick={goToNextImage}>
                      <FaChevronRight />
                    </RightArrow>
                  </MainImageSlider>
                  <ImageThumbnails>
                    {product.images.map((img, index) => (
                      <Thumbnail
                        key={index}
                        active={currentImageIndex === index}
                        onClick={() => handleThumbnailClick(index)}
                      >
                        <img src={img.url} alt={`Thumbnail ${index + 1}`} />
                      </Thumbnail>
                    ))}
                  </ImageThumbnails>
                </ImageSection>
                <InfoSection>
                  <HeaderSection>
                    <TitleSection>
                      <Title>{product.title}</Title>
                      <Company>By {product.company}</Company>
                      <Rating>
                        {renderStars(product.rating)} {product.rating} <ReviewCount>({product.reviewCount} reviews)</ReviewCount>
                      </Rating>
                      <WriteReview href="#">Write a Review</WriteReview>
                    </TitleSection>
                    {/* <AvatarSection>
                      <Avatar>H</Avatar>
                    </AvatarSection> */}
                  </HeaderSection>
                  
                  <PricingSection>
                    <PricingLabel>Starting At</PricingLabel>
                    <Pricing>{product.pricing}</Pricing>
                  </PricingSection>
                  
                  <Description>{product.description}</Description>
                  <CallToAction>Get Free Demo</CallToAction>
                </InfoSection>
              </ProductCard>

              <TabsContainer>
                <Tab 
                  active={activeTab === 'Overview'} 
                  onClick={() => handleTabClick('Overview')}
                >
                  Overview
                </Tab>
                <Tab 
                  active={activeTab === 'Features'} 
                  onClick={() => handleTabClick('Features')}
                >
                  Features
                </Tab>
                <Tab 
                  active={activeTab === 'Reviews'} 
                  onClick={() => handleTabClick('Reviews')}
                >
                  Reviews
                </Tab>
                <Tab 
                  active={activeTab === 'Pricing & Plans'} 
                  onClick={() => handleTabClick('Pricing & Plans')}
                >
                  Pricing & Plans
                </Tab>
                <Tab 
                  active={activeTab === 'Specifications'} 
                  onClick={() => handleTabClick('Specifications')}
                >
                  Specifications
                </Tab>
                <Tab 
                  active={activeTab === 'Compare'} 
                  onClick={() => handleTabClick('Compare')}
                >
                  Compare
                </Tab>
                <Tab 
                  active={activeTab === "FAQ's"} 
                  onClick={() => handleTabClick("FAQ's")}
                >
                  FAQ's
                </Tab>
              </TabsContainer>

              <ContentSection>
                {renderTabContent()}
              </ContentSection>
            </PageContainer>
          )}
          
          {sectionsVisible.NapkinFeature && <NapkinFeature />}
          {sectionsVisible.NapkinRating && <NapkinRating />}
          {sectionsVisible.NapkinSpecifications && <NapkinSpecification />}
          {sectionsVisible.NapkinSoftwareReviews && <NapkinSoftwareReviews />}
          {sectionsVisible.NapkinGetsoftwareDemo && <NapkinGetSoftwareCompanyDemo />}
          {sectionsVisible.NapkinDropdwon && <NapkinDropdwon />}
        </>
      )}
    </Container>
  );
};

export default NapkinReview;