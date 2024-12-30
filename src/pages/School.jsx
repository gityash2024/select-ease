import react from 'react';
import './School.css';
import corexta from '../assets/corexta.png';
import hero from '../assets/Hero.png';


// School.jsx
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

          {[1, 2, 3].map((item) => (
            <div className="software-card" key={item}>
              <div className="card-left">
                <img src={corexta} alt="Software logo" className="software-logo" />
              </div>
              <div className="card-middle">
                <h3>Software Rating</h3>
                <p>No. 1 School Information Software</p>
                <div className="description">
                  Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                </div>
              </div>
              <div className="card-right">
                <button className="buy-btn">Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default School;