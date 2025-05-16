import React from 'react';
import styled from 'styled-components';

// Common Styles
const SectionContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  font-family: 'Outfit', sans-serif;
  margin: 20px 100px 20px 100px;
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #333;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  text-align: center;
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
  margin-bottom: 20px;
  align-items: flex-start; /* Align items to the start */

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
  margin-right: 40px;
  
  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: row;
    gap: 15px;
    margin-right: 0;
    margin-bottom: 15px;
  }
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #1a3c70;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: 120px;
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 20px;
    margin-bottom: 0;
  }
`;

const UserInfo = styled.div`
  text-align: right;
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 5px;
  color: #222;
`;

const BusinessType = styled.div`
  font-size: 13px;
  color: #555;
  margin-bottom: 5px;
`;

const UserType = styled.div`
  font-size: 13px;
  color: #555;
  margin-bottom: 5px;
`;

const UserSince = styled.div`
  font-size: 13px;
  color: #555;
  margin-bottom: 8px;
`;

const ReviewDate = styled.div`
  font-size: 12px;
  color: #666;
`;

const ReviewContent = styled.div`
  flex: 1;
`;

const RatingStars = styled.div`
  display: flex;
  color: #FFB800;
  font-size: 16px;
  margin-bottom: 8px;
`;

const RatingText = styled.span`
  color: #666;
  font-size: 13px;
  margin-left: 5px;
`;

const ReviewQuote = styled.div`
  font-size: 15px;
  font-weight: normal;
  margin-bottom: 20px;
  line-height: 1.5;
  color: #333;
`;

const ProsConsSection = styled.div`
  margin-bottom: 15px;
  font-size: 13px;
`;

const ProsConsTitle = styled.span`
  font-weight: 600;
  color: #333;
  margin-right: 5px;
`;

const ProsConsText = styled.span`
  color: #666;
  line-height: 1.5;
`;

const SwitchedFrom = styled.div`
  margin-top: 15px;
  font-size: 13px;
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
  gap: 15px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const RatingCategory = styled.div`
  flex: 1;
  min-width: 200px;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 12px;
  
  @media (max-width: 576px) {
    min-width: 100%;
  }
`;

const CategoryTitle = styled.div`
  font-size: 13px;
  margin-bottom: 5px;
  font-weight: 500;
  color: #222;
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
  font-size: 13px;
  color: #666;
  margin-left: 5px;
`;

const RecommendBar = styled.div`
  background-color: #eee;
  height: 6px;
  width: 100%;
  border-radius: 3px;
  position: relative;
  margin-top: 8px;
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
const PricingPlansContainer = styled.div`
  width:60%;
  height: 614px;
  display: flex;
  gap: 30px;
  margin-top: 30px;
  justify-content: center;

  @media (max-width: 992px) {
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const PricingCard = styled.div`
  flex: 1;
  min-width: 300px;
  height: auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 992px) {
    min-width: calc(50% - 30px);
  }

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const PricingHeader = styled.div`
  padding: 20px 25px;
  background-color: ${props => props.bgColor || '#FFB800'};
  color: white;
  font-weight: 600;
  font-size: 20px;
  text-align: center;
`;

const PricingContent = styled.div`
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 30px 0;
  flex: 1;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
  font-size: 14px;
  color: #333;
`;

const FeatureIcon = styled.span`
  color: #000;
  font-size: 18px;
`;

const PricingFooter = styled.div`
  margin-top: auto;
  padding-top: 20px;
  text-align: center;
`;

const PriceAmount = styled.div`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #222;
`;

const BillingCycle = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 25px;
`;

const BuyButton = styled.button`
  background-color: ${props => props.bgColor || '#FFB800'};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

// Software Reviews Component
const AmmplifySoftwareReviews = ({ reviews = [] }) => {
  // Sample data based on the image
    const reviewsData = [
        {
            id: 1,
            initials: 'JD',
            userName: 'John Doe',
            businessType: 'Owner, Retail',
            userType: 'Individual Contributor',
            userSince: 'Software user since: 6-12 months',
            reviewDate: 'Reviewed on: March 27, 2025',
            rating: 5,
            quote: '"QuickSmart AI has transformed our content creation process.  The quality and speed of output are impressive."',
            pros: 'Easy to Use, Great Templates, Saves Time',
            cons: 'Some features are still in development',
            switchedFrom: null,
            categories: [
                { name: 'Features', rating: 5 },
                { name: 'Value for money', rating: 4.5 },
                { name: 'Customer Support', rating: 5 },
                { name: 'Ease of Use', rating: 5 },
                { name: 'Likely to Recommend', rating: 5, scale: 5 }
            ]
        }
        // You can add more review objects here based on the image if there are multiple reviews
    ];

  // Render stars for rating
  const renderStars = (rating, scale = 5) => {
    return Array(scale).fill(0).map((_, index) => (
      <span key={index}>{index < rating ? '\u2605' : '\u2606'}</span>
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
                  {review.userType && <UserType>{review.userType}</UserType>}
                  {review.userSince && <UserSince>{review.userSince}</UserSince>}
                  <ReviewDate>{review.reviewDate}</ReviewDate>
                </UserInfo>
              </AvatarSection>

              <ReviewContent>
                <RatingStars>
                  {renderStars(review.rating)}
                  <RatingText>{review.rating}/5</RatingText>
                </RatingStars>

                <ReviewQuote>{review.quote}</ReviewQuote>

                {review.pros && (
                  <ProsConsSection>
                    <ProsConsTitle>Pros :</ProsConsTitle>
                    <ProsConsText>{review.pros}</ProsConsText>
                  </ProsConsSection>
                )}

                {review.cons && (
                  <ProsConsSection>
                    <ProsConsTitle>Cons :</ProsConsTitle>
                    <ProsConsText>{review.cons}</ProsConsText>
                  </ProsConsSection>
                )}

                {review.switchedFrom && (
                  <SwitchedFrom>
                    Switched from : <SwitchedLink href="#">{review.switchedFrom}</SwitchedLink>
                  </SwitchedFrom>
                )}

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

// Pricing & Plans Component (TEXT CONTENT UPDATED)
const PricingPlans = ({ plans = [] }) => {
    // Sample data based on the image
    const plansData = [
        {
            id: 1,
            title: 'Standard',
            color: '#FFB800',
            features: [
                'Free 7 days trail available',
                'Available during beta phase',
                'No hidden cost',
                'Perfect for individual content creators',
            ],
            price: 999,
            currency: '₹',
            billing: 'Billed Monthly'
        },
        {
            id: 2,
            title: 'Pro',
            color: '#38AD2F',
            features: [
                'Free Trail Available',
                'Available during beta phase',
                'No hidden cost',
                'Ideal for small teams and businesses',
            ],
            price: null, // No price shown for Pro in the image
            currency: null,
            billing: 'Billed Monthly',
        },
    ];

    return (
        <SectionContainer>
            <SectionTitle>Pricing & Plans</SectionTitle>

            <PricingPlansContainer>
                {plansData.map(plan => (
                    <PricingCard key={plan.id} style={{ height: 'auto' }}>
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
                                 <PriceAmount>
                                    {plan.price !== null ? (
                                        <>
                                            Starting at {plan.currency}
                                            {plan.price.toLocaleString()}
                                        </>
                                    ) : (
                                        'Request a quote'
                                    )}
                                </PriceAmount>
                                {plan.price !== null && <BillingCycle>[{plan.billing}]</BillingCycle>}
                                <BuyButton bgColor={plan.color}>BUY NOW</BuyButton>
                            </PricingFooter>
                        </PricingContent>
                    </PricingCard>
                ))}
            </PricingPlansContainer>
        </SectionContainer>
    );
};

// Main App Component to demonstrate usage
const App = () => {
  return (
    <div className="app">
      <AmmplifySoftwareReviews />
      <PricingPlans />
    </div>
  );
};

export default App;
