import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

// Styled Components for Specifications Section
const SpecificationsContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  font-family: 'Outfit', sans-serif;
  margin: 20px;
`;

const SpecTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
`;

const SpecTable = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SpecRow = styled.div`
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  padding: 15px 0;
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px 0;
  }
`;

const SpecLabel = styled.div`
  flex: 0 0 25%;
  font-weight: 500;
  color: #333;
  
  @media (max-width: 768px) {
    margin-bottom: 5px;
  }
`;

const SpecValue = styled.div`
  flex: 1;
  color: #666;
`;

// Styled Components for Software Comparison Section
const ComparisonContainer = styled.div`
  background-color: #fff;
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
  text-align: left;
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const VsCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  z-index: 1;
`;

const Card = styled.div`
  flex: 1;
  min-width: 250px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #eee;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
  
  @media (max-width: 992px) {
    min-width: 200px;
  }
  
  @media (max-width: 576px) {
    min-width: 180px;
  }
`;

const CardImage = styled.div`
  width: 80px;
  height: 80px;
  background-color: #8cc63f;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 2px;
  text-align: center;
`;

const CardCompany = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  text-align: center;
`;

const RatingContainer = styled.div`
  background-color: #026283;
  border-radius: 20px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 15px;
`;

const RatingValue = styled.span`
  color: white;
  font-weight: 600;
  font-size: 14px;
`;

const RatingIcon = styled.span`
  color: #ffc107;
  font-size: 14px;
`;

const ReviewCount = styled.span`
  color: white;
  font-size: 14px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  cursor: pointer;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &.prev {
    left: -20px;
  }
  
  &.next {
    right: -20px;
  }
  
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    
    &.prev {
      left: -15px;
    }
    
    &.next {
      right: -15px;
    }
  }
`;

const CompareSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const SelectedCount = styled.div`
  font-size: 14px;
  color: #666;
`;

const CompareButton = styled.button`
  background-color: #026283;
  color: white;
  padding: 10px 25px;
  border-radius: 50px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #01516d;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// Specifications Component
const Specifications = () => {
  const specifications = [
    { label: 'Supported Platform', value: 'Web, iOS, Android' },
    { label: 'Devices', value: 'Desktops, laptops, tablets, smartphones' },
    { label: 'Deployment', value: 'Cloud-Based (SaaS)' },
    { label: 'Suitable for', value: 'Creators, marketers, educators, small to mid-sized businesses' },
    { label: 'Business Size', value: 'NA' },
    { label: 'Setup Time', value: '' },
    { label: 'Customer Support', value: 'Available via Help section' },
    { label: 'Support Report Time', value: 'Not specified' },
    { label: 'Training', value: 'Tutorials, blog, FAQ' },
    { label: 'Language', value: '29+ languages supported (subtitle and dubbing tools)' },
    { label: 'Demographic', value: 'Global audience, especially creators and influencers' }
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
  const [selectedCount, setSelectedCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChecked, setIsChecked] = useState([true, false, false]);
  const cardsRef = useRef(null);
  
  // Sample software data
  const softwareOptions = [
    {
      id: 1,
      name: 'Name of Software',
      company: 'By : Software Company',
      rating: '5.0',
      reviews: '144'
    },
    {
      id: 2,
      name: 'Name of Software',
      company: 'By : Software Company',
      rating: '5.0',
      reviews: '144'
    },
    {
      id: 3,
      name: 'Name of Software',
      company: 'By : Software Company',
      rating: '5.0',
      reviews: '144'
    },
    {
      id: 4,
      name: 'Name of Software',
      company: 'By : Software Company',
      rating: '5.0',
      reviews: '144'
    }
  ];
  
  useEffect(() => {
    // Count selected software
    const count = isChecked.filter(Boolean).length;
    setSelectedCount(count);
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
    if (currentIndex < softwareOptions.length - 2) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  // First card is fixed, others slide
  const renderCards = () => {
    return (
      <>
        <Card>
          <CardImage />
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
            <CheckboxLabel htmlFor={`compare-${0}`}>Add To Compare</CheckboxLabel>
          </CheckboxContainer>
        </Card>
        
        <VsCircle>VS</VsCircle>
        
        {softwareOptions.slice(1).map((software, idx) => {
          const actualIndex = idx + 1;
          const isVisible = idx >= currentIndex && idx < currentIndex + 2;
          
          return isVisible ? (
            <Card key={software.id}>
              <CardImage />
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
                <CheckboxLabel htmlFor={`compare-${actualIndex}`}>Add To Compare</CheckboxLabel>
              </CheckboxContainer>
            </Card>
          ) : null;
        })}
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
          &#10094;
        </NavigationButton>
        
        <CardContainer ref={cardsRef}>
          {renderCards()}
        </CardContainer>
        
        <NavigationButton 
          className="next" 
          onClick={handleNext} 
          disabled={currentIndex >= softwareOptions.length - 3}
        >
          &#10095;
        </NavigationButton>
      </CarouselContainer>
      
      <CompareSection>
        <SelectedCount>({selectedCount}) Product Selected</SelectedCount>
        <CompareButton disabled={selectedCount === 0}>Compare Now</CompareButton>
      </CompareSection>
    </ComparisonContainer>
  );
};

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

const CaptionGetSoftwareCompanyDemo = ({
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
      <CaptionGetSoftwareCompanyDemo/>
      <Specifications />
      <SoftwareComparison />
    </div>
  );
};

export default App;