import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Styled Components for Specifications Section
const SpecificationsContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.14);
  font-family: 'Outfit', sans-serif;
  margin: 20px;
`;

const SpecTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const SpecTable = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  border-radius: 10px;
  overflow: hidden;
`;

const SpecRow = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
 
  padding: 15px 20px;
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 100%;
    padding: 10px 15px;
  }
`;

const SpecLabel = styled.div`
  font-weight: 500;
  color: #333;
  
  @media (max-width: 768px) {
    margin-bottom: 5px;
  }
`;

const SpecValue = styled.div`
  color: #666;
  
  @media (max-width: 768px) {
    
  }
`;

// Styled Components for Software Comparison Section
const ComparisonContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  font-family: 'Outfit', sans-serif;
  margin: 20px;
`;

const ComparisonTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #333;
  text-align: center;
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  width: 100%;
  overflow: visible;
`;

const VsCircle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
  z-index: 1;
  margin: 0 10px;
`;

const Card = styled(motion.div)`
  flex: 1;
  min-width: 280px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #eee;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 992px) {
    min-width: 250px;
  }
  
  @media (max-width: 768px) {
    min-width: 90%;
    margin: 10px auto;
  }
`;

const CardImage = styled.div`
  width: 100px;
  height: 100px;
  background-color: #8cc63f;
  border-radius: 50%;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 80%;
    max-height: 80%;
  }
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
  text-align: center;
  color: #333;
`;

const CardCompany = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
  text-align: center;
`;

const RatingContainer = styled.div`
  background-color: #026283;
  border-radius: 20px;
  padding: 8px 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const RatingValue = styled.span`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const RatingIcon = styled.span`
  color: #ffc107;
  font-size: 16px;
`;

const ReviewCount = styled.span`
  color: white;
  font-size: 14px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  cursor: pointer;
  color: #333;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      transform: translateY(-50%);
    }
  }
  
  &:hover {
    transform: translateY(-50%) scale(1.1);
  }
  
  &.prev {
    left: 10px;
  }
  
  &.next {
    right: 10px;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    
    &.prev {
      left: 5px;
    }
    
    &.next {
      right: 5px;
    }
  }
`;

const CompareSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  flex-direction: column;
  gap: 15px;
`;

const SelectedCount = styled.div`
  font-size: 16px;
  color: #666;
`;

const CompareButton = styled.button`
  background-color: #026283;
  color: white;
  padding: 12px 30px;
  border-radius: 50px;
  border: none;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  
  &:hover {
    background-color: #01516d;
    transform: scale(1.05);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
    
    &:hover {
      background-color: #ccc;
      transform: none;
    }
  }
`;
// Demo Section Component (from your existing code)
const SectionContainer = styled.section`
  background-color: #003750;
  padding: 60px 20px;
  width: 100%;
  font-family: 'Outfit', sans-serif;
  margin: 0; /* Ensure no margin interferes with adjacent sections */
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  
  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ContentLeft = styled.div`
  flex: 1;
  color: white;
  
  @media (max-width: 992px) {
    margin-bottom: 30px;
  }
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 20px;
  line-height: 1.2;
  font-family: 'Outfit', sans-serif;
  color: white;
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 30px;
  font-family: 'Outfit', sans-serif;
  color: white;
`;

const DemoButton = styled.a`
  display: inline-block;
  background-color: #026283;
  color: white;
  padding: 12px 25px;
  border-radius: 50px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Outfit', sans-serif;
  
  &:hover {
    background-color: #01516d;
  }
`;

const VideoContainer = styled.div`
  flex: 1.2;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  aspect-ratio: 16/9;
  
  @media (max-width: 992px) {
    width: 100%;
    max-width: 600px;
  }
`;

const ResponsiveIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

// Specifications Component
const Specifications = () => {
  const specifications = [
    { label: 'Supported Platform', value: 'Web, WhatsApp, Email, CRM' },
    { label: 'Devices', value: 'Compatible with desktops, laptops, and mobile devices via web browsers.' },
    { label: 'Deployment', value: 'On-premise within enterprise infrastructure' },
    { label: 'Suitable for', value: 'Enterprises seeking AI-driven automation within their own infrastructure' },
    { label: 'Business Size', value: '51-200 employees' },
    { label: 'Setup Time', value: '1-3 business days' },
    { label: 'Customer Support', value: '24/7 available' },
    { label: 'Support Report Time', value: 'Good' },
    { label: 'Training', value: 'Demo available' },
    { label: 'Language', value: '9+ languages' },
    { label: 'Demographic', value: 'Available Worldwide' }
  ];

  return (
    <SpecificationsContainer>
      <SpecTitle>Specifications</SpecTitle>
      <SpecTable>
        {specifications.map((spec, index) => (
          <SpecRow key={index}>
            <SpecLabel>{spec.label}</SpecLabel>
            <SpecValue>{spec.value}</SpecValue>
          </SpecRow>
        ))}
      </SpecTable>
    </SpecificationsContainer>
  );
};

// Software Comparison Component
const SoftwareComparison = () => {
  const [selectedCount, setSelectedCount] = useState(1); // Initialize with 1 selected (first card)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChecked, setIsChecked] = useState([true, false, false, false]);
  const [isCompareEnabled, setIsCompareEnabled] = useState(false);
  const cardsRef = useRef(null);
  
  // Sample software data
  const softwareOptions = [
    {
      id: 1,
      name: 'Software Company A',
      company: 'By : Company A',
      rating: '5.0',
      reviews: '144',
      image: 'https://via.placeholder.com/80', // Replace with actual image URLs
    },
    {
      id: 2,
      name: 'Software Company B',
      company: 'By : Company B',
      rating: '4.5',
      reviews: '120',
      image: 'https://via.placeholder.com/80',
    },
    {
      id: 3,
      name: 'Software Company C',
      company: 'By : Company C',
      rating: '4.0',
      reviews: '98',
      image: 'https://via.placeholder.com/80',
    },
     {
      id: 4,
      name: 'Software Company D',
      company: 'By : Company D',
      rating: '4.8',
      reviews: '202',
      image: 'https://via.placeholder.com/80',
    }
  ];
  
  useEffect(() => {
    // Count selected software
    const count = isChecked.filter(Boolean).length;
    setSelectedCount(count);
    setIsCompareEnabled(count >= 2);
  }, [isChecked]);
  
  const handleCheckboxChange = (index) => {
    const newChecked = [...isChecked];
    newChecked[index] = !newChecked[index];
    setIsChecked(newChecked);
  };
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  const handleNext = () => {
    if (currentIndex < softwareOptions.length - 3) { // changed from 2 to 3
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  // First card is fixed, others slide
    const renderCards = () => {
    const cardVariants = {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
    };

    return (
      <>
        <Card
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <CardImage>
             <img src={softwareOptions[0].image} alt={softwareOptions[0].name} />
          </CardImage>
          <CardTitle>{softwareOptions[0].name}</CardTitle>
          <CardCompany>{softwareOptions[0].company}</CardCompany>
          <RatingContainer>
            <RatingValue>{softwareOptions[0].rating}</RatingValue>
            <RatingIcon>★</RatingIcon>
            <ReviewCount>({softwareOptions[0].reviews} Reviews)</ReviewCount>
          </RatingContainer>
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              id={`compare-${0}`}
              checked={isChecked[0]}
              onChange={() => handleCheckboxChange(0)}
            />
            <CheckboxLabel htmlFor={`compare-${0}`}>
              Add To Compare
            </CheckboxLabel>
          </CheckboxContainer>
        </Card>

        <VsCircle>VS</VsCircle>

        <AnimatePresence>
          {softwareOptions.slice(1).map((software, idx) => {
            const actualIndex = idx + 1;
            const isVisible = idx >= currentIndex && idx < currentIndex + 2;

            return isVisible ? (
              <Card
                key={software.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <CardImage>
                  <img src={software.image} alt={software.name} />
                </CardImage>
                <CardTitle>{software.name}</CardTitle>
                <CardCompany>{software.company}</CardCompany>
                <RatingContainer>
                  <RatingValue>{software.rating}</RatingValue>
                  <RatingIcon>★</RatingIcon>
                  <ReviewCount>({software.reviews} Reviews)</ReviewCount>
                </RatingContainer>
                <CheckboxContainer>
                  <Checkbox
                    type="checkbox"
                    id={`compare-${actualIndex}`}
                    checked={isChecked[actualIndex]}
                    onChange={() => handleCheckboxChange(actualIndex)}
                  />
                  <CheckboxLabel htmlFor={`compare-${actualIndex}`}>
                    Add To Compare
                  </CheckboxLabel>
                </CheckboxContainer>
              </Card>
            ) : null;
          })}
        </AnimatePresence>
      </>
    );
  };
  
  return (
    <ComparisonContainer>
      <ComparisonTitle>Compare Software Company with Other Softwares</ComparisonTitle>
      <CarouselContainer>
        <NavigationButton 
          className="prev" 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
        >
          ❮
        </NavigationButton>
        
        <CardContainer ref={cardsRef}>
          {renderCards()}
        </CardContainer>
        
        <NavigationButton 
          className="next" 
          onClick={handleNext} 
          disabled={currentIndex >= softwareOptions.length - 3} // changed from 2 to 3
        >
          ❯
        </NavigationButton>
      </CarouselContainer>
      
      <CompareSection>
        <SelectedCount>({selectedCount}) Product Selected</SelectedCount>
        <CompareButton disabled={!isCompareEnabled}>
            Compare Now
        </CompareButton>
      </CompareSection>
    </ComparisonContainer>
  );
};

const InVideoGetSoftwareCompanyDemo = ({
  youtubeVideoId = "Ou-K_BAC9pY",
  title = "Get Software Company Demo",
  description = "We make it happen! Get your hands on the best solution based on your needs.",
  buttonText = "Get Free Demo/Trial",
  buttonLink = "#request-demo"
}) => {
  return (
    <SectionContainer>
      <Container>
        <ContentLeft>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <DemoButton href={buttonLink}>{buttonText}</DemoButton>
        </ContentLeft>
        
        <VideoContainer>
          <ResponsiveIframe 
            src={`https://www.youtube.com/embed/${youtubeVideoId}`}
            title="Software Company Demo Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        </VideoContainer>
      </Container>
    </SectionContainer>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="app">
      <InVideoGetSoftwareCompanyDemo/>
      <Specifications />
      <SoftwareComparison />
    </div>
  );
};

export default App;

