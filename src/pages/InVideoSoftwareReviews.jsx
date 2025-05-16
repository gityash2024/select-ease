import React from 'react';
import styled from 'styled-components';

// Common Styles
const SectionContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 25px; /* Adjusted padding */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  font-family: 'Outfit', sans-serif;
  margin: 20px;

  @media (max-width: 768px) {
    padding: 15px; /* Adjusted padding for smaller screens */
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px; /* Adjusted font size */
  font-weight: 600;
  margin-bottom: 20px; /* Adjusted margin */
  color: #333;
  padding-bottom: 10px; /* Adjusted padding */
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
  gap: 25px; /* Adjusted gap */
`;

const ReviewItem = styled.div`
  padding-bottom: 25px; /* Adjusted padding */
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  margin-bottom: 10px; /* Adjusted margin */

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px; /* Adjusted gap for smaller screens */
  }
`;

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px; /* Adjusted min width */
  margin-right: 15px; /* Added right margin */

  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: row;
    gap: 10px; /* Adjusted gap for smaller screens */
    margin-right: 0; /* Reset right margin on smaller screens */
    margin-bottom: 10px; /* Added bottom margin on smaller screens */
  }
`;

const Avatar = styled.div`
  width: 50px; /* Adjusted width */
  height: 50px; /* Adjusted height */
  border-radius: 50%;
  background-color: #1a3c70;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px; /* Adjusted font size */
  font-weight: bold;
  margin-bottom: 5px; /* Adjusted margin */

  @media (max-width: 768px) {
    width: 40px; /* Adjusted width for smaller screens */
    height: 40px; /* Adjusted height for smaller screens */
    font-size: 16px; /* Adjusted font size for smaller screens */
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
  font-size: 14px; /* Adjusted font size */
  margin-bottom: 1px;
`;

const BusinessType = styled.div`
  font-size: 12px; /* Adjusted font size */
  color: #666;
  margin-bottom: 1px;
`;

const UserType = styled.div`
  font-size: 12px; /* Adjusted font size */
  color: #666;
  margin-bottom: 1px;
`;

const UserSince = styled.div`
  font-size: 12px; /* Adjusted font size */
  color: #666;
  margin-bottom: 3px; /* Adjusted margin */
`;

const ReviewDate = styled.div`
  font-size: 12px; /* Adjusted font size */
  color: #666;
`;

const ReviewContent = styled.div`
  flex: 1;
`;

const RatingStars = styled.div`
  display: flex;
  color: #FFB800;
  font-size: 14px; /* Adjusted font size */
  margin-bottom: 3px; /* Adjusted margin */
`;

const RatingText = styled.span`
  color: #666;
  font-size: 12px; /* Adjusted font size */
  margin-left: 3px; /* Adjusted margin */
`;

const ReviewQuote = styled.div`
  font-size: 14px; /* Adjusted font size */
  font-weight: normal; /* Changed font weight */
  margin-bottom: 10px; /* Adjusted margin */
  line-height: 1.4;
  color: #333; /* Added color */
`;

const ProsConsSection = styled.div`
  margin-bottom: 10px; /* Adjusted margin */
  font-size: 12px; /* Adjusted font size */
`;

const ProsConsTitle = styled.span`
  font-weight: 600;
  color: #333;
  margin-right: 3px; /* Adjusted margin */
`;

const ProsConsText = styled.span`
  color: #666;
  line-height: 1.4;
`;

const SwitchedFrom = styled.div`
  margin-top: 10px; /* Adjusted margin */
  font-size: 12px; /* Adjusted font size */
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
  gap: 8px; /* Adjusted gap */
  margin-top: 15px; /* Adjusted margin */

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px; /* Adjusted gap for smaller screens */
  }
`;

const RatingCategory = styled.div`
  flex: 1;
  min-width: 100px; /* Adjusted min width */
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 8px; /* Adjusted padding */

  @media (max-width: 576px) {
    min-width: 100%;
  }
`;

const CategoryTitle = styled.div`
  font-size: 12px; /* Adjusted font size */
  margin-bottom: 3px; /* Adjusted margin */
`;

const CategoryRating = styled.div`
  display: flex;
  align-items: center;
`;

const CategoryStars = styled.div`
  display: flex;
  color: #FFB800;
  font-size: 12px; /* Adjusted font size */
`;

const CategoryScore = styled.span`
  font-size: 12px; /* Adjusted font size */
  color: #666;
  margin-left: 3px; /* Adjusted margin */
`;

const RecommendBar = styled.div`
  background-color: #eee;
  height: 4px; /* Adjusted height */
  width: 100%;
  border-radius: 2px; /* Adjusted border radius */
  position: relative;
  margin-top: 3px; /* Adjusted margin */
`;

const RecommendFill = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #38AD2F;
  border-radius: 2px; /* Adjusted border radius */
  width: ${props => `${props.value}%`};
`;

// Pricing & Plans Styled Components (FIXED)
const PricingPlansContainer = styled.div`
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
  height: 524px;
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
const InVideoSoftwareReviews = ({ reviews = [] }) => {
  // Sample data based on the image
    const reviewsData = [
        {
            id: 1,
            initials: 'JD',
            userName: 'John D',
            businessType: 'Owner, Retail',
            userType: 'Individual',
            userSince: 'Software user since: 6-12 months',
            reviewDate: 'Reviewed on: March 27, 2025',
            rating: 5,
            quote: '"QuickSmart.ai helped us streamline our workflows and automate repetitive tasks, significantly improving our efficiency."',
            pros: 'QuickSmart.ai helped us streamline our workflows and automate repetitive tasks, significantly improving our efficiency.',
            cons: 'QuickSmart.ai helped us streamline our workflows and automate repetitive tasks, significantly improving our efficiency.',
            switchedFrom: null,
            categories: [
                { name: 'Features', rating: 5 },
                { name: 'Value for money', rating: 5 },
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

// Pricing & Plans Component (FIXED)
const PricingPlans = ({ plans = [] }) => {
    // Sample data if none provided
    const plansData = [
        {
            id: 1,
            title: 'Free',
            color: '#FFB800',
            features: [
                'Free Trail Available',
                'Available during beta phase',
                'No hidden cost',
            ],
            price: 0,
            currency: '$',
            billing: 'Billed Monthly'
        },
        {
            id: 2,
            title: 'Plus Plan',
            color: '#38AD2F',
            features: [
                'Free Trail Available',
                'Available during beta phase',
                'No hidden cost',
            ],
            price: 28,
            priceYear: 336,
            currency: '$',
            billing: 'Billed Monthly',
            billingYear: 'or $336/year'
        },
        {
            id: 3,
            title: 'Max Plan',
            color: '#026283',
            features: [
                'Free Trail Available',
                'Available during beta phase',
                'No hidden cost',
            ],
            price: 48,
            priceYear: 576,
            currency: '$',
            billing: 'Billed Monthly',
            billingYear: 'or $576/year'
        }
    ];

    return (
        <SectionContainer>
            <SectionTitle>Pricing & Plans</SectionTitle>

            <PricingPlansContainer>
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
                                <PriceAmount>
                                    Starting at {plan.currency}
                                    {plan.price === 0 ? '0' : plan.price.toLocaleString()}
                                     {plan.priceYear && <span style={{fontSize: '14px', color: '#666', display: 'block'}}>{plan.billingYear}</span>}
                                </PriceAmount>
                                <BillingCycle>[{plan.billing}]</BillingCycle>
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
      <InVideoSoftwareReviews />
      <PricingPlans />
    </div>
  );
};

export default App;
