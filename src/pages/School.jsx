import React from 'react';
import './School.css';
import corexta from '../assets/corexta.png';
import hero from '../assets/Hero.png';

const School = () => {
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
            <button className="reset-btn">Reset Filter</button>
          </div>

          <div className="filter-section">
            <h4>Software Rating</h4>
            <div className="rating-options">
              <label className="checkbox-item">
                <input type="checkbox" />
                <span className="rating">5.0 ★</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" />
                <span className="rating">5.0 ★</span>
                <span>& above</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" />
                <span className="rating">5.0 ★</span>
                <span>& above</span>
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h4>Device Supported</h4>
            <div className="device-options">
              <label className="checkbox-item">
                <input type="checkbox" />
                <span>Web App</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" />
                <span>Windows</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" />
                <span>MacOS</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" />
                <span>iOS</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" />
                <span>Android</span>
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h4>Business type</h4>
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