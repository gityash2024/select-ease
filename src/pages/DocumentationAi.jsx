import React, { useState } from 'react';
import styled from 'styled-components';

import zrikalogo from '../assets/zrikalogo.png'

import hero from '../assets/Hero.png';

// ─── Styled Components ─────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  background-color:rgb(250, 250, 250);
`;

const HeroSection = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 300px;
  margin-bottom: 30px;
  text-align: center;
  color: #0e2431;
  border-radius: 8px;

  /* background image */
  background-image: url(${hero});
  background-size: cover;
  background-position: center;

  /* translucent overlay */
  &::after {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(255, 255, 255, 0);
    border-radius: 8px;
  }

  /* bring text on top */
  > * {
    position: relative;
    z-index: 1;
  }

  h1 {
    font-size: 1.8em;
    margin: 60px 0 12px;
    @media(min-width: 769px) {
      font-size: 2.5em;
      margin: 80px 0 16px;
    }
  }

  p {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 16px;
    color: #33475b;
    font-size: 0.95em;
    line-height: 1.5;
    @media(min-width: 769px) {
      font-size: 1.1em;
    }
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  max-width: 1200px;
  width: 100%;
  gap: 20px;
  padding: 0 16px 40px;


  @media(min-width: 769px) {
    flex-direction: row;
    gap: 24px;
    padding: 0;
  }
`;

const Sidebar = styled.aside`
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  height: 700px; 
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;

  @media(min-width: 769px) {
    width: 280px;
    margin-bottom: 0;
  }
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #026283;
  color: #fff;
  padding: 8px 12px;
  border-radius: 6px 6px 0 0;
  margin-bottom: 16px;

  h3 { margin: 0; font-size: 1em; }
  button {
    background: none;
    border: none;
    color: #fff;
    font-size: 0.85em;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity .2s;
    &:hover { opacity: 1; }
  }
`;

const FilterSection = styled.div`
  background-color: #ffffff;
  border: 1px solid #E1E5EB;
  border-radius: 6px;
  margin-bottom: 16px;
  padding: 12px 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 8px;

  h4 {
    margin: 0;
    color: #333;
    font-size: 1em;
    @media(min-width: 769px) { font-size: 1.1em; }
  }
  span { font-size: 0.9em; color: #777; }
`;

const OptionsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 4px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  color: #555;
  font-size: 0.9em;
  cursor: pointer;

  input {
    margin-right: 6px;
  }
  .rating {
    color: #FFC107;
    margin-right: 4px;
  }
`;

const MainContent = styled.main`
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ContentHeader = styled.div`
  margin-bottom: 20px;
  color: #333;

  h2 {
    margin: 0 0 6px;
    font-size: 1.4em;
    @media(min-width: 769px) { font-size: 1.6em; }
  }
  p {
    margin: 0;
    color: #777;
    font-size: 0.85em;
    @media(min-width: 769px) { font-size: 0.9em; }
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  gap: 12px;

  @media(min-width: 769px) {
    flex-direction: row;
    align-items: center;
    gap: 24px;
  }
`;

const CardLeft = styled.div`
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;
`;
const Logo = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;
const CardMiddle = styled.div`
  flex: 1;

  h3 {
    margin: 0 0 4px;
    font-size: 1em;
    color: #333;
  }
  .sub {
    margin: 0 0 8px;
    color: #777;
    font-size: 0.85em;
  }
  .badge {
    display: inline-block;
    background-color: #FFD965;
    color: #333;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75em;
    margin-bottom: 10px;
  }
  .description {
    margin: 0 0 12px;
    color: #555;
    font-size: 0.9em;
    line-height: 1.4;
  }
  .rating-container {
    display: flex;
    align-items: center;
    gap: 6px;
    .rating { color: #FFC107; font-size: 0.9em; }
    .reviews { color: #777; font-size: 0.85em; }
  }
`;

const CardRight = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  @media(min-width: 769px) {
    justify-content: flex-end;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 0.9em;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity .2s;

  ${({ variant }) =>
    variant === 'demo'
      ? `
    background-color: #026283;
    color: #fff;
    border: none;
  `
      : `
    background-color: #fff;
    color: #026283;
    border: 1px solid #026283;
  `}

  &:hover {
    opacity: 0.85;
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────

const DocumentationAi = () => {
  const [ratingFilters, setRatingFilters] = useState([]);
  const [deviceFilters, setDeviceFilters] = useState([]);
  const [sortFilters, setSortFilters] = useState([]);
  const [openSections, setOpenSections] = useState({
    rating: true,
    device: true,
    sort: true,
  });

  const products = [
    {
      id: 1,
      logo: zrikalogo,
      title: 'Zrika.ai',
      sub: 'Financial Technology (Fintech) Services',
      rating: 4.3,
      reviews: 26,
      badge: 'Highly Recommended',
      description: 'Zrika is a fintech software firm delivering innovative, secure, and scalable solutions in Payments, Solutions, and Value Plus, empowering partners to bridge legacy systems with modern digital needs.',
    },
    
  ];

  const toggle = (section) =>
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  const handleCheck = (value, list, setList) => e =>
    e.target.checked
      ? setList([...list, value])
      : setList(list.filter(i => i !== value));
  const reset = () => {
    setRatingFilters([]);
    setDeviceFilters([]);
    setSortFilters([]);
  };

  
  const displayed = products;

  return (
    <PageWrapper>
      <HeroSection>
      <h1>Documentation AI</h1>
        <p>
          Revolutionize how teams handle documentation. These tools use AI to summarize, generate, and
          organize documents, meeting notes, and knowledge bases — ensuring clarity, consistency, and faster
          workflows across projects and teams.
        </p>
      </HeroSection>

      <ContentContainer>
        <Sidebar>
          <FilterHeader>
            <h3>Filters</h3>
            <button onClick={reset}>Reset Filter</button>
          </FilterHeader>

          {/* Software Rating */}
          <FilterSection>
            <TitleRow onClick={() => toggle('rating')}>
              <h4>Software Rating</h4>
              <span>{openSections.rating ? '▲' : '▼'}</span>
            </TitleRow>
            {openSections.rating && (
              <OptionsGroup>
                {['5.0', '4.0', '3.0'].map(v => (
                  <CheckboxLabel key={v}>
                    <input
                      type="checkbox"
                      value={v}
                      checked={ratingFilters.includes(v)}
                      onChange={handleCheck(v, ratingFilters, setRatingFilters)}
                    />
                    <span className="rating">{v} ★</span>
                    {v !== '5.0' && ' & above'}
                  </CheckboxLabel>
                ))}
              </OptionsGroup>
            )}
          </FilterSection>

          {/* Device Supported */}
          <FilterSection>
            <TitleRow onClick={() => toggle('device')}>
              <h4>Device Supported</h4>
              <span>{openSections.device ? '▲' : '▼'}</span>
            </TitleRow>
            {openSections.device && (
              <OptionsGroup>
                {['Web App', 'Windows', 'MacOS', 'iOS', 'Android'].map(v => (
                  <CheckboxLabel key={v}>
                    <input
                      type="checkbox"
                      value={v}
                      checked={deviceFilters.includes(v)}
                      onChange={handleCheck(v, deviceFilters, setDeviceFilters)}
                    />
                    {v}
                  </CheckboxLabel>
                ))}
              </OptionsGroup>
            )}
          </FilterSection>

          {/* Sort By */}
          <FilterSection>
            <TitleRow onClick={() => toggle('sort')}>
              <h4>Sort By</h4>
              <span>{openSections.sort ? '▲' : '▼'}</span>
            </TitleRow>
            {openSections.sort && (
              <OptionsGroup>
                {['Most Popular', 'Newest First', 'Top Rated Products'].map(v => (
                  <CheckboxLabel key={v}>
                    <input
                      type="checkbox"
                      value={v}
                      checked={sortFilters.includes(v)}
                      onChange={handleCheck(v, sortFilters, setSortFilters)}
                    />
                    {v}
                  </CheckboxLabel>
                ))}
              </OptionsGroup>
            )}
          </FilterSection>
        </Sidebar>

        <MainContent>
          <ContentHeader>
            <h2>Documentation AI</h2>
            <p>
              Showing 1 – {displayed.length} of {products.length} products
            </p>
          </ContentHeader>

          {displayed.map(item => (
            <Card key={item.id}>
              <CardLeft>
                <Logo src={item.logo} alt={item.title} />
              </CardLeft>
              <CardMiddle>
                <h3>{item.title}</h3>
                <p className="sub">{item.sub}</p>
                {item.badge && <span className="badge">{item.badge}</span>}
                <p className="description">{item.description}</p>
                <div className="rating-container">
                  <span className="rating">★ {item.rating}</span>
                  <span className="reviews">({item.reviews} reviews)</span>
                </div>
              </CardMiddle>
              <CardRight>
                <Button variant="demo">Read Reviews</Button>
                <Button variant="buy">
                  {item.id === 1 ? 'Get Free Demo' : 'Buy Now'}
                </Button>
              </CardRight>
            </Card>
          ))}
        </MainContent>
      </ContentContainer>
    </PageWrapper>
  );
};

export default DocumentationAi;
