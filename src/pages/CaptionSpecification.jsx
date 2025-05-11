
import React from 'react';
import styled from 'styled-components';
import plus from '../assets/plus.svg';
import minus from '../assets/minus.svg';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Outfit', sans-serif;
`;

const ProsConsSection = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ProsConsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProsColumn = styled.div``;

const ConsColumn = styled.div``;

const ColumnTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-top: 0;
  margin-bottom: 16px;
`;

const ReviewItem = styled.div`
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const ReviewIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 12px;
  margin-top: 2px;
`;

const ReviewText = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  margin: 0 0 8px 0;
`;

const ReviewAuthor = styled.div`
  font-size: 12px;
  color: #777;
  margin-top: 8px;
  margin-left: 32px;
`;

const mockProsConsData = {
  pros: [
    {
      id: 1,
      text: "Salesforce is an American cloud computing company head quartered in San Francisco, California.",
      author: "Jane Doe",
      date: "August 16, 2024"
    },
    {
      id: 2,
      text: "Salesforce is an American cloud computing company head quartered in San Francisco, California.",
      author: "Jane Doe",
      date: "August 16, 2024"
    },
    {
      id: 3,
      text: "Salesforce is an American cloud computing company head quartered in San Francisco, California.",
      author: "Jane Doe",
      date: "August 16, 2024"
    }
  ],
  cons: [
    {
      id: 1,
      text: "Salesforce is an American cloud computing company head quartered in San Francisco, California.",
      author: "Jane Doe",
      date: "August 16, 2024"
    },
    {
      id: 2,
      text: "Salesforce is an American cloud computing company head quartered in San Francisco, California.",
      author: "Jane Doe",
      date: "August 16, 2024"
    },
    {
      id: 3,
      text: "Salesforce is an American cloud computing company head quartered in San Francisco, California.",
      author: "Jane Doe",
      date: "August 16, 2024"
    }
  ]
};

const CaptionSpecification = ({ prosConsData = mockProsConsData }) => {
  return (
    <Container>
      <ProsConsSection>
        <ProsConsGrid>
          <ProsColumn>
            <ColumnTitle>Pros</ColumnTitle>
            {prosConsData.pros.map(pro => (
              <ReviewItem key={pro.id}>
                <ReviewHeader>
                  <ReviewIcon src={plus} alt="Plus" />
                  <ReviewText>{pro.text}</ReviewText>
                </ReviewHeader>
                <ReviewAuthor>{pro.author} - {pro.date}</ReviewAuthor>
              </ReviewItem>
            ))}
          </ProsColumn>
          
          <ConsColumn>
            <ColumnTitle>Cons</ColumnTitle>
            {prosConsData.cons.map(con => (
              <ReviewItem key={con.id}>
                <ReviewHeader>
                  <ReviewIcon src={minus} alt="Minus" />
                  <ReviewText>{con.text}</ReviewText>
                </ReviewHeader>
                <ReviewAuthor>{con.author} - {con.date}</ReviewAuthor>
              </ReviewItem>
            ))}
          </ConsColumn>
        </ProsConsGrid>
      </ProsConsSection>
    </Container>
  );
};

export default CaptionSpecification;