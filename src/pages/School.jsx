import React, { useState } from 'react';
import './School.css';
import corexta from '../assets/corexta.png';
import hero from '../assets/Hero.png';

const School = () => {
  const [ratingFilters, setRatingFilters] = useState([]);
  const [deviceFilters, setDeviceFilters] = useState([]);
  const [businessTypeFilters, setBusinessTypeFilters] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [isRatingOpen, setIsRatingOpen] = useState(true);
  const [isDeviceOpen, setIsDeviceOpen] = useState(true);
  const [isBusinessOpen, setIsBusinessOpen] = useState(true);

  const productsData = [
    {
      id: 1,
      title: 'Software Rating',
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
      rating: 5.0,
      reviews: 23,
      badge: 'Highly Recommended',
    },
    {
      id: 2,
      title: 'Software Rating',
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
      rating: 4.5,
      reviews: 19,
    },
    {
      id: 3,
      title: 'Software Rating',
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
      rating: 5.0,
      reviews: 30,
      badge: "Editor's Choice",
    },
  ];

  const handleRatingChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setRatingFilters([...ratingFilters, value]);
    } else {
      setRatingFilters(ratingFilters.filter((item) => item !== value));
    }
  };

  const handleDeviceChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setDeviceFilters([...deviceFilters, value]);
    } else {
      setDeviceFilters(deviceFilters.filter((item) => item !== value));
    }
  };

  const handleBusinessTypeChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setBusinessTypeFilters([...businessTypeFilters, value]);
    } else {
      setBusinessTypeFilters(businessTypeFilters.filter((item) => item !== value));
    }
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    // Implement sorting logic here based on sortOption
  };

  const resetFilters = () => {
    setRatingFilters([]);
    setDeviceFilters([]);
    setBusinessTypeFilters([]);
    setSortOption('');
    // You might also want to reset any sorting applied to the products
  };

  const toggleRatingDropdown = () => {
    setIsRatingOpen(!isRatingOpen);
  };

  const toggleDeviceDropdown = () => {
    setIsDeviceOpen(!isDeviceOpen);
  };

  const toggleBusinessDropdown = () => {
    setIsBusinessOpen(!isBusinessOpen);
  };

  // In a real application, you would filter the productsData based on the selected filters
  const filteredProducts = productsData;

  return (
    <div className="school-page">
      <div className="hero-section">
        <h1>School Management Software</h1>
        <img src={hero} alt="" className="contact-hero-background" />
      </div>

      <div className="content-container">
        <div className="filter-sidebar">
          <div className="filter-header">
            <h3>Filters</h3>
            <button className="reset-btn" onClick={resetFilters}>
              Reset Filter
            </button>
          </div>

          <div className="filter-section">
            <div className="filter-title" onClick={toggleRatingDropdown} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4>Software Rating</h4>
              <span>{isRatingOpen ? '▲' : '▼'}</span>
            </div>
            {isRatingOpen && (
              <div className="rating-options">
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    value="5.0"
                    checked={ratingFilters.includes('5.0')}
                    onChange={handleRatingChange}
                  />
                  <span className="rating">5.0 ★</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    value="4.0"
                    checked={ratingFilters.includes('4.0')}
                    onChange={handleRatingChange}
                  />
                  <span className="rating">4.0 ★</span>
                  <span>& above</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    value="3.0"
                    checked={ratingFilters.includes('3.0')}
                    onChange={handleRatingChange}
                  />
                  <span className="rating">3.0 ★</span>
                  <span>& above</span>
                </label>
              </div>
            )}
          </div>

          <div className="filter-section">
            <div className="filter-title" onClick={toggleDeviceDropdown} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4>Device Supported</h4>
              <span>{isDeviceOpen ? '▲' : '▼'}</span>
            </div>
            {isDeviceOpen && (
              <div className="device-options">
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    value="Web App"
                    checked={deviceFilters.includes('Web App')}
                    onChange={handleDeviceChange}
                  />
                  <span>Web App</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    value="Windows"
                    checked={deviceFilters.includes('Windows')}
                    onChange={handleDeviceChange}
                  />
                  <span>Windows</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    value="MacOS"
                    checked={deviceFilters.includes('MacOS')}
                    onChange={handleDeviceChange}
                  />
                  <span>MacOS</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    value="iOS"
                    checked={deviceFilters.includes('iOS')}
                    onChange={handleDeviceChange}
                  />
                  <span>iOS</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    value="Android"
                    checked={deviceFilters.includes('Android')}
                    onChange={handleDeviceChange}
                  />
                  <span>Android</span>
                </label>
              </div>
            )}
          </div>

          <div className="filter-section">
            <div className="filter-title" onClick={toggleBusinessDropdown} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4>Sort By</h4>
              <span>{isBusinessOpen ? '▲' : '▼'}</span>
            </div>
            {isBusinessOpen && (
              <div className="business-type-options">
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    value="Most Popular"
                    checked={businessTypeFilters.includes('Most Popular')}
                    onChange={handleBusinessTypeChange}
                  />
                  <span>Most Popular</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    value="Newest First"
                    checked={businessTypeFilters.includes('Newest First')}
                    onChange={handleBusinessTypeChange}
                  />
                  <span>Newest First</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    value="Top Rated Products"
                    checked={businessTypeFilters.includes('Top Rated Products')}
                    onChange={handleBusinessTypeChange}
                  />
                  <span>Top Rated Products</span>
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="main-content">
          <div className="content-header">
            <h2>School Management Software</h2>
            <p>Showing 1 - 20 of 535 products</p>
          </div>

          {[
            {
              id: 1,
              title: 'Software Rating',
              description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,',
              rating: 5.0,
              reviews: 23,
              badge: 'Highly Recommended',
            },
            {
              id: 2,
              title: 'Software Rating',
              description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,',
              rating: 4.5,
              reviews: 19,
            },
            {
              id: 3,
              title: 'Software Rating',
              description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,',
              rating: 5.0,
              reviews: 30,
              badge: 'Editor\'s Choice',
            },
          ].map((item) => (
            <div className="software-card" key={item.id}>
              <div className="card-left">
                <img src={corexta} alt="Software logo" className="software-logo" />
              </div>
              <div className="card-middle">
                <h3>{item.title}</h3>
                <p>No. 1 School Information Software</p>
                {item.badge && <span className="badge">{item.badge}</span>}
                <div className="description">{item.description}</div>
                <div className="rating-container">
                  <span className="rating">{item.rating} ★</span>
                  <span className="reviews">({item.reviews} reviews)</span>
                </div>
              </div>
              <div className="card-right">
                <button className="review-btn">Read Reviews</button>
                {item.id === 1 ? (
                  <button className="demo-btn">Get Your Demo</button>
                ) : (
                  <button className="buy-btn">Buy Now</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default School;