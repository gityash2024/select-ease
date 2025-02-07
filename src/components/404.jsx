import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 64px);
  text-align: center;
  padding: 2rem;
`;

const NotFoundImage = styled.img`
  width: 100%;
  max-width: 400px;
  margin-bottom: 2rem;
`;

const NotFoundTitle = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 1rem;
`;

const NotFoundText = styled.p`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 2rem;
`;

const HomeLink = styled(Link)`
  font-size: 1.2rem;
  color: #fff;
  background-color: #026283;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #015272;
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundTitle>Oops! Page not found</NotFoundTitle>
      <NotFoundText>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</NotFoundText>
      <HomeLink to="/">Go to Home</HomeLink>
    </NotFoundContainer>
  );
};

export default NotFound;