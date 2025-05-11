import React from 'react';
import styled from 'styled-components';

// Common Styles
const SectionContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  font-family: 'Outfit', sans-serif;
  margin: 20px;
  
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #333;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
`;

// Software Reviews Styled Components
const ReviewsCount = styled.span`
  font-weight: normal;
  color: #666;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ReviewItem = styled.div`
  padding-bottom: 30px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 130px;
  
  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: row;
    gap: 15px;
  }
`;

const Avatar = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: #1a3c70;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 22px;
    margin-bottom: 0;
  }
`;

const UserInfo = styled.div`
  text-align: center;
  
  @media (max-width: 768px) {
    text-align: left;
  }
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 2px;
`;

const BusinessType = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 2px;
`;

const UserType = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 2px;
`;

const UserSince = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const ReviewDate = styled.div`
  font-size: 14px;
  color: #666;
`;

const ReviewContent = styled.div`
  flex: 1;
`;

const RatingStars = styled.div`
  display: flex;
  color: #FFB800;
  font-size: 18px;
  margin-bottom: 5px;
`;

const RatingText = styled.span`
  color: #666;
  font-size: 14px;
  margin-left: 5px;
`;

const ReviewQuote = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
  line-height: 1.4;
`;

const ProsConsSection = styled.div`
  margin-bottom: 15px;
`;

const ProsConsTitle = styled.span`
  font-weight: 600;
  color: #333;
  margin-right: 5px;
`;

const ProsConsText = styled.span`
  color: #666;
  font-size: 15px;
  line-height: 1.5;
`;

const SwitchedFrom = styled.div`
  margin-top: 15px;
  font-size: 14px;
`;

const SwitchedLink = styled.a`
  color: #026283;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const RatingCategories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const RatingCategory = styled.div`
  flex: 1;
  min-width: 120px;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 10px;
  
  @media (max-width: 576px) {
    min-width: 100%;
  }
`;

const CategoryTitle = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;

const CategoryRating = styled.div`
  display: flex;
  align-items: center;
`;

const CategoryStars = styled.div`
  display: flex;
  color: #FFB800;
  font-size: 14px;
`;

const CategoryScore = styled.span`
  font-size: 14px;
  color: #666;
  margin-left: 5px;
`;

const RecommendBar = styled.div`
  background-color: #eee;
  height: 6px;
  width: 100%;
  border-radius: 3px;
  position: relative;
  margin-top: 5px;
`;

const RecommendFill = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #38AD2F;
  border-radius: 3px;
  width: ${props => `${props.value}%`};
`;

// Pricing & Plans Styled Components
const PricingContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  
  @media (max-width: 992px) {
    flex-wrap: wrap;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PricingCard = styled.div`
  flex: 1;
  min-width: 250px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  
  @media (max-width: 992px) {
    min-width: calc(50% - 20px);
  }
  
  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const PricingHeader = styled.div`
  padding: 15px 20px;
  background-color: ${props => props.bgColor || '#FFB800'};
  color: white;
  font-weight: 600;
  font-size: 18px;
`;

const PricingContent = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
  flex: 1;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #333;
`;

const FeatureIcon = styled.span`
  color: #000;
  font-size: 16px;
`;

const PricingFooter = styled.div`
  margin-top: auto;
`;

const PriceAmount = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const BillingCycle = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

const BuyButton = styled.button`
  background-color: ${props => props.bgColor || '#FFB800'};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
`;

// Software Reviews Component
const ScogoSoftwareReviews = ({ reviews = [] }) => {
  // Sample data if none provided
  const reviewsData = reviews.length > 0 ? reviews : [
    {
      id: 1,
      initials: 'LH',
      userName: 'Laksh Hardwares',
      businessType: 'Owner, Retail',
      userType: 'Individual',
      userSince: 'Software user since: 6-12 months',
      reviewDate: 'Reviewed on: Mar 16, 2020',
      rating: 5,
      quote: 'You can do all types of business transactions with Vyapaar. No need to carry any account books or managing manually ledgers.',
      pros: 'Overall, Vyapar is a fine software that is always working towards improvising its features. Through the software, you can assess the stock value, stock quantity, profit, expenses, losses, etc. Vyapar also helps with easy filing of GSTR returns. The Vyapar team was also quite supportive with all notification related information for GST. Upload your products in Excel sheet easily with the software and divide these into proper categories.',
      cons: 'Frankly speaking I don\'t think any least about this software. However, nothing is perfect and so one con would be the missing Multilanguage support. Banking integration too required. Currently, the development team is focused on resolving only one request at a time.',
      switchedFrom: 'QuickBooks',
      categories: [
        { name: 'Features', rating: 5 },
        { name: 'Value for Money', rating: 5 },
        { name: 'Customer Support', rating: 5 },
        { name: 'Ease of Use', rating: 5 },
        { name: 'Likely to Recommend', rating: 10, scale: 10 }
      ]
    },
    {
      id: 2,
      initials: 'LH',
      userName: 'Laksh Hardwares',
      businessType: 'Owner, Retail',
      userType: 'Individual',
      userSince: 'Software user since: 6-12 months',
      reviewDate: 'Reviewed on: Mar 16, 2020',
      rating: 5,
      quote: 'You can do all types of business transactions with Vyapaar. No need to carry any account books or managing manually ledgers.',
      pros: 'Overall, Vyapar is a fine software that is always working towards improvising its features. Through the software, you can assess the stock value, stock quantity, profit, expenses, losses, etc. Vyapar also helps with easy filing of GSTR returns. The Vyapar team was also quite supportive with all notification related information for GST. Upload your products in Excel sheet easily with the software and divide these into proper categories.',
      cons: 'Frankly speaking I don\'t think any least about this software. However, nothing is perfect and so one con would be the missing Multilanguage support. Banking integration too required. Currently, the development team is focused on resolving only one request at a time.',
      switchedFrom: 'QuickBooks',
      categories: [
        { name: 'Features', rating: 5 },
        { name: 'Value for Money', rating: 5 },
        { name: 'Customer Support', rating: 5 },
        { name: 'Ease of Use', rating: 5 },
        { name: 'Likely to Recommend', rating: 10, scale: 10 }
      ]
    }
  ];

  // Render stars for rating
  const renderStars = (rating, scale = 5) => {
    return Array(scale).fill(0).map((_, index) => (
      <span key={index}>{index < rating ? '★' : '☆'}</span>
    ));
  };

  return (
    <SectionContainer>
      <SectionTitle>
        Software Reviews <ReviewsCount>({reviewsData.length})</ReviewsCount>
      </SectionTitle>
      
      <ReviewList>
        {reviewsData.map(review => (
          <ReviewItem key={review.id}>
            <ReviewHeader>
              <AvatarSection>
                <Avatar>{review.initials}</Avatar>
                <UserInfo>
                  <UserName>{review.userName}</UserName>
                  <BusinessType>{review.businessType}</BusinessType>
                  <UserType>{review.userType}</UserType>
                  <UserSince>{review.userSince}</UserSince>
                  <ReviewDate>{review.reviewDate}</ReviewDate>
                </UserInfo>
              </AvatarSection>
              
              <ReviewContent>
                <RatingStars>
                  {renderStars(review.rating)}
                  <RatingText>{review.rating}/5</RatingText>
                </RatingStars>
                
                <ReviewQuote>"{review.quote}"</ReviewQuote>
                
                <ProsConsSection>
                  <ProsConsTitle>Pros :</ProsConsTitle>
                  <ProsConsText>{review.pros}</ProsConsText>
                </ProsConsSection>
                
                <ProsConsSection>
                  <ProsConsTitle>Cons :</ProsConsTitle>
                  <ProsConsText>{review.cons}</ProsConsText>
                </ProsConsSection>
                
                <SwitchedFrom>
                  Switched from : <SwitchedLink href="#">{review.switchedFrom}</SwitchedLink>
                </SwitchedFrom>
                
                <RatingCategories>
                  {review.categories.map((category, index) => (
                    <RatingCategory key={index}>
                      <CategoryTitle>{category.name}</CategoryTitle>
                      <CategoryRating>
                        <CategoryStars>
                          {renderStars(category.rating, category.scale || 5)}
                        </CategoryStars>
                        <CategoryScore>
                          {category.rating}/{category.scale || 5}
                        </CategoryScore>
                      </CategoryRating>
                      
                      {category.name === 'Likely to Recommend' && (
                        <RecommendBar>
                          <RecommendFill value={(category.rating / (category.scale || 5)) * 100} />
                        </RecommendBar>
                      )}
                    </RatingCategory>
                  ))}
                </RatingCategories>
              </ReviewContent>
            </ReviewHeader>
          </ReviewItem>
        ))}
      </ReviewList>
    </SectionContainer>
  );
};

// Pricing & Plans Component
const PricingPlans = ({ plans = [] }) => {
  // Sample data if none provided
  const plansData = plans.length > 0 ? plans : [
    {
      id: 1,
      title: 'Software Company Business',
      color: '#FFB800',
      features: [
        'Cross-Platform Compatibility',
        'Cross-Platform Compatibility',
        'Cross-Platform Compatibility',
        'Cross-Platform Compatibility',
        'Cross-Platform Compatibility',
        'Cross-Platform Compatibility',
        'Cross-Platform Compatibility',
        'Cross-Platform Compatibility',
        'Cross-Platform Compatibility',
      ],
      price: 6800,
      currency: '₹',
      billing: 'Billed Annually'
    },
    {
      id: 2,
      title: 'Software Company Premiuim',
      color: '#38AD2F',
      features: [
        'Cross-Platform Compatibility',
        'Cross-Platform Compatibility',
        'Cross-Platform Compatibility',
        'Cross-Platform Compatibility',
        'Cross-Platform Compatibility',
        'Cross-Platform Compatibility',
        'Cross-Platform Compatibility',
        'Cross-Platform Compatibility',
        'Cross-Platform Compatibility'
      ],
      price: 9800,
      currency: '₹',
      billing: 'Billed Annually'
    },
    {
      id: 3,
      title: 'Software Company Organization',
      color: '#026283',
      features: [
        'Cross-Platform Compatibility',
        'Cross-Platform Compatibility',
        'Cross-Platform Compatibility',
        'Cross-Platform Compatibility',
        'Cross-Platform Compatibility',
        'Cross-Platform Compatibility',
        'Cross-Platform Compatibility',
        'Cross-Platform Compatibility',
        'Cross-Platform Compatibility'
      ],
      price: 12800,
      currency: '₹',
      billing: 'Billed Annually'
    }
  ];

  return (
    <SectionContainer>
      <SectionTitle>Pricing & Plans</SectionTitle>
      
      <PricingContainer>
        {plansData.map(plan => (
          <PricingCard key={plan.id}>
            <PricingHeader bgColor={plan.color}>
              {plan.title}
            </PricingHeader>
            
            <PricingContent>
              <FeatureList>
                {plan.features.map((feature, index) => (
                  <FeatureItem key={index}>
                    <FeatureIcon>●</FeatureIcon>
                    {feature}
                  </FeatureItem>
                ))}
              </FeatureList>
              
              <PricingFooter>
                <PriceAmount>Starting at {plan.currency} {plan.price.toLocaleString()}</PriceAmount>
                <BillingCycle>[{plan.billing}]</BillingCycle>
                <BuyButton bgColor={plan.color}>BUY NOW</BuyButton>
              </PricingFooter>
            </PricingContent>
          </PricingCard>
        ))}
      </PricingContainer>
    </SectionContainer>
  );
};

// Main App Component to demonstrate usage
const App = () => {
  return (
    <div className="app">
      <ScogoSoftwareReviews />
      <PricingPlans />
    </div>
  );
};

export default App;