import React, { useState } from 'react';
import './WriteFeedback.css';
import hero from '../assets/Hero.png';
import saleforce from '../assets/saleforce.png';
import gogle from '../assets/gogle.png';
import lnik from '../assets/lnik.png';
import fack from '../assets/fack.png';
import Guidelines from '../assets/Guidelines.png';
import Guidelines1 from '../assets/Guidelines1.png';
import Guidelines2 from '../assets/Guidelines2.png';
import Guidelines3 from '../assets/Guidelines3.png';

const WriteFeedback = () => {
  const [ratings, setRatings] = useState({
    overall: 0,
    features: 0,
    ease: 0,
    value: 0
  });

  const handleRating = (category, value) => {
    setRatings(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const RatingStars = ({ category, value }) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRating(category, star)}
            style={{ color: star <= value ? '#FDB241' : '#D1D5DB' }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="write-feedback">
      <section className="write-hero-section">
        <img src={hero} alt="" className="write-hero-background" />
        <h1>Your feedback can make a BIG impact</h1>
        <div className="search-container">
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>
      </section>

      <section className="review-section">
        <div className="review-header">
          <img src={saleforce} alt="Salesforce logo" className="company-logo" />
          <div>
            <h2>Write Review for Salesforce</h2>
            <p>Sed ut perspiciatis unde omnis iste natus the error sit voluptatem accusantium doloremque laudantium totam rem aperiam...</p>
          </div>
        </div>

        <div className="auth-buttons">
          <button className="google-btn">
            <img src={gogle} alt="Google" />
            Sign in with Google
          </button>
          <button className="linkedin-btn">
            <img src={lnik} alt="LinkedIn" />
            Sign in with LinkedIn
          </button>
          <button className="facebook-btn">
            <img src={fack} alt="Facebook" />
            Login with Facebook
          </button>
        </div>

        <form className="review-form">
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Name" />
            </div>
            <div className="form-group">
              <label>Business Email</label>
              <input type="email" placeholder="Your Business Email Address" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Organization Name</label>
              <input type="text" placeholder="Organization Name" />
            </div>
            <div className="form-group">
              <label>Job Title</label>
              <input type="text" placeholder="Job Title" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Company Size</label>
              <select defaultValue="">
                <option value="" disabled>Please select</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501+">501+ employees</option>
              </select>
            </div>
            <div className="form-group">
              <label>How long have you used this software?</label>
              <select defaultValue="">
                <option value="" disabled>Please select</option>
                <option value="less-6">Less than 6 months</option>
                <option value="6-12">6-12 months</option>
                <option value="1-2">1-2 years</option>
                <option value="2+">More than 2 years</option>
              </select>
            </div>
          </div>

          <div className="rating-section">
            <div className="rating-group">
              <label>Overall Rating</label>
              <RatingStars category="overall" value={ratings.overall} />
            </div>
            <div className="rating-group">
              <label>Features</label>
              <RatingStars category="features" value={ratings.features} />
            </div>
            <div className="rating-group">
              <label>Ease of use</label>
              <RatingStars category="ease" value={ratings.ease} />
            </div>
            <div className="rating-group">
              <label>Value for money</label>
              <RatingStars category="value" value={ratings.value} />
            </div>
          </div>

          <div className="form-group">
            <label>Title of Review</label>
            <input type="text" placeholder="Describe your experience in a short sentence." />
          </div>

          <div className="form-group">
            <label>Your Review</label>
            <textarea placeholder="Salesforce is"></textarea>
          </div>

          <div className="form-checkbox">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              I certify that my feedback is based on my experience with this product. By submitting, I agree to the terms of use and privacy policy of SoftwareSuggest.
            </label>
          </div>

          <button type="submit" className="next-btn">Next</button>
        </form>

        <div className="guidelines">
          <h3>Review Guidelines</h3>
          <div className="guidelines-grid">
            <div className="guideline-card">
              <img src={Guidelines} alt="No Incomplete Information" />
              <p>No Incomplete Information</p>
            </div>
            <div className="guideline-card">
              <img src={Guidelines1} alt="No Self-Promotional Activity" />
              <p>No Self-Promotional Activity</p>
            </div>
            <div className="guideline-card">
              <img src={Guidelines2} alt="No Hateful Language" />
              <p>No Hateful or Disparaging Language</p>
            </div>
            <div className="guideline-card">
              <img src={Guidelines3} alt="No Fake Names" />
              <p>No Use of Fake Names or Spam Content.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WriteFeedback;