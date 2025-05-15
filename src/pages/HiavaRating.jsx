import React from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Outfit', sans-serif;
`;

const RatingsSection = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-top: 0;
  margin-bottom: 24px;
`;

const ScoreCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ScoreCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
`;

const CircleGraph = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  
  @media (max-width: 576px) {
    width: 80px;
    height: 80px;
  }
`;

// SVG Circle Progress Component
const CircleProgress = styled.svg`
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
`;

const CircleBackground = styled.circle`
  fill: none;
  stroke: #e0e0e0;
  stroke-width: 8;
`;

const CircleForeground = styled.circle`
  fill: none;
  stroke: ${props => props.color || "#026283"};
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: ${props => props.circumference};
  stroke-dashoffset: ${props => props.dashoffset};
  transition: stroke-dashoffset 0.5s ease;
`;

const ScoreValue = styled.div`
  position: absolute;
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;

const ScoreLabel = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 4px;
`;

const OverallScoreCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
`;

const OverallScoreTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const OverallScoreLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const OverallScore = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const OverallScale = styled.div`
  font-size: 14px;
  color: #666;
  display: inline;
`;

const StarRating = styled.div`
  display: flex;
  margin: 8px 0;
  color: #FFD700;
`;

const ReviewCount = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 4px;
`;

const OverallScoreRight = styled.div`
  flex: 1;
  padding-left: 32px;
  
  @media (max-width: 768px) {
    width: 100%;
    padding-left: 0;
  }
`;

const RatingDetailItem = styled.div`
  margin-bottom: 16px;
`;

const RatingLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
`;

const RatingValue = styled.div`
  font-weight: 500;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${props => props.percentage}%;
  background-color: #026283;
  border-radius: 4px;
`;

const AddReviewButton = styled.button`
  background-color: #fff;
  color: #026283;
  border: 1px solid #026283;
  border-radius: 24px;
  padding: 8px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-left: auto;
  display: block;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #026283;
    color: #fff;
  }
`;

const CompaniesSection = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CompaniesSlider = styled.div`
  width: auto;
  position: relative;
  padding: 0 32px;
`;

const CompaniesGrid = styled.div`
  display: flex;
  overflow-x: hidden;
  scroll-behavior: smooth;
  gap: 16px;
`;

const CompanyCard = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  min-width: 250px;
  flex: 0 0 auto;
`;

const CompanyLogo = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${props => props.color || "#4CAF50"};
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CompanyName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const SliderArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 20px;
  color: #333;
  cursor: pointer;
  padding: 10px;
  z-index: 10;
  
  &:hover {
    color: #026283;
  }
`;

const LeftArrow = styled(SliderArrow)`
  left: 0;
`;

const RightArrow = styled(SliderArrow)`
  right: 0;
`;

// Circular progress indicator component
const CircularProgressIndicator = ({ value, maxValue = 100, color, size = 100 }) => {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const progress = value / maxValue;
  const dashoffset = circumference * (1 - progress);
  
  return (
    <CircleGraph>
      <CircleProgress viewBox="0 0 100 100">
        <CircleBackground cx="50" cy="50" r={radius} />
        <CircleForeground 
          cx="50" 
          cy="50" 
          r={radius} 
          color={color}
          circumference={circumference}
          dashoffset={dashoffset}
        />
      </CircleProgress>
      <ScoreValue>{value}</ScoreValue>
    </CircleGraph>
  );
};

// Mock data structure for dynamic content
const mockRatingsData = {
  scores: [
    { id: 1, name: "Feature Score", value: 85.5, color: "#026283", maxValue: 100 },
    { id: 2, name: "Social Impact Score", value: 54.5, color: "#026283", maxValue: 100 },
    { id: 3, name: "Brand Score", value: 75, color: "#026283", maxValue: 100 },
    { id: 4, name: "Innovation Score", value: 68, color: "#026283", maxValue: 100 },
    { id: 5, name: "NPS", value: 85.5, color: "#38AD2F", maxValue: 100 }
  ],
  overallScore: {
    score: 4.6,
    scale: "/5",
    reviewCount: 65,
    ratings: [
      { id: 1, name: "Value For Money", value: 4.6, scale: "/5" },
      { id: 2, name: "Ease of Use", value: 4.6, scale: "/5" },
      { id: 3, name: "Customer Support", value: 4.6, scale: "/5" }
    ]
  },
  companies: [
    { id: 1, name: "Jasper AI", color: "#4CAF50" },
    { id: 2, name: "Writesonic", color: "#FFC107" },
    { id: 3, name: "Copy.ai", color: "#F44336" },
    { id: 4, name: "Descript", color: "#4CAF50" },
    { id: 5, name: "Veed.io", color: "#FFC107" },
    { id: 6, name: "Pictory", color: "#F44336" }
  ]
};

const HiavaRating = ({ ratingsData = mockRatingsData }) => {
  const scrollLeft = () => {
    const container = document.getElementById('companies-slider');
    if (container) {
      container.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('companies-slider');
    if (container) {
      container.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  return (
    <Container>
      <RatingsSection>
        <SectionTitle>Software Performance & Ratings</SectionTitle>
        
        <ScoreCardsGrid>
          {ratingsData.scores.map(score => (
            <ScoreCard key={score.id}>
              <CircularProgressIndicator 
                value={score.value} 
                maxValue={score.maxValue} 
                color={score.color} 
              />
              <ScoreLabel>{score.name}</ScoreLabel>
            </ScoreCard>
          ))}
        </ScoreCardsGrid>
        
        <OverallScoreCard>
          <OverallScoreTop>
            <OverallScoreLeft>
              <OverallScore>
                {ratingsData.overallScore.score}
                <OverallScale>{ratingsData.overallScore.scale}</OverallScale>
              </OverallScore>
              <StarRating>
                {[...Array(5)].map((_, index) => (
                  <FaStar 
                    key={index}
                    color={index < Math.floor(ratingsData.overallScore.score) ? "#FFD700" : "#E0E0E0"}
                    size={20}
                  />
                ))}
              </StarRating>
              <ReviewCount>
                (Based on {ratingsData.overallScore.reviewCount} Reviews)
              </ReviewCount>
            </OverallScoreLeft>
            
            <OverallScoreRight>
              {ratingsData.overallScore.ratings.map(rating => (
                <RatingDetailItem key={rating.id}>
                  <RatingLabel>
                    {rating.name}
                    <RatingValue>{rating.value}{rating.scale}</RatingValue>
                  </RatingLabel>
                  <ProgressBarContainer>
                    <ProgressBar percentage={(rating.value / 5) * 100} />
                  </ProgressBarContainer>
                </RatingDetailItem>
              ))}
            </OverallScoreRight>
          </OverallScoreTop>
          
          <AddReviewButton>Add Review</AddReviewButton>
        </OverallScoreCard>
      </RatingsSection>
      
      <CompaniesSection>
        <SectionTitle>Tech Companies That Uses Software Company</SectionTitle>
        
        <CompaniesSlider>
          <LeftArrow onClick={scrollLeft}>
            <FaChevronLeft />
          </LeftArrow>
          
          <CompaniesGrid id="companies-slider">
            {ratingsData.companies.map(company => (
              <CompanyCard key={company.id}>
                <CompanyLogo color={company.color}>
                  {company.name.charAt(0)}
                </CompanyLogo>
                <CompanyName>{company.name}</CompanyName>
              </CompanyCard>
            ))}
          </CompaniesGrid>
          
          <RightArrow onClick={scrollRight}>
            <FaChevronRight />
          </RightArrow>
        </CompaniesSlider>
      </CompaniesSection>
    </Container>
  );
};

export default HiavaRating;