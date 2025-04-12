import React from 'react';
import styled from 'styled-components';
import yestick from '../assets/yestick.svg';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Outfit', sans-serif;
`;

const FeatureSection = styled.div`
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

const CategoryTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-top: 24px;
  margin-bottom: 16px;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const FeatureIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  color: #026283;
`;

const FeatureText = styled.span`
  font-size: 14px;
  color: #333;
`;

// Mock data structure for dynamic content
const mockFeaturesData = {
  categories: [
    {
      id: 1,
      name: "Core Features",
      features: [
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
      ]
    },
    {
      id: 2,
      name: "Advanced Features",
      features: [
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
      ]
    },
    {
      id: 3,
      name: "Integrations",
      features: [
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
      ]
    },
    {
      id: 4,
      name: "AI Features",
      features: [
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
      ]
    },
    {
      id: 5,
      name: "System Management & Support",
      features: [
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
      ]
    },
    {
      id: 6,
      name: "Security & Compliance",
      features: [
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
        "Cross-Platform Compatibility",
      ]
    }
  ]
};

const Features = ({ featuresData = mockFeaturesData }) => {
  return (
    <Container>
      <FeatureSection>
        <SectionTitle>Features</SectionTitle>
        
        {featuresData.categories.map(category => (
          <div key={category.id}>
            <CategoryTitle>{category.name}</CategoryTitle>
            <FeaturesGrid>
              {category.features.map((feature, index) => (
                <FeatureItem key={index}>
                  <FeatureIcon src={yestick} alt="Feature included" />
                  <FeatureText>{feature}</FeatureText>
                </FeatureItem>
              ))}
            </FeaturesGrid>
          </div>
        ))}
      </FeatureSection>
    </Container>
  );
};


export default Features;