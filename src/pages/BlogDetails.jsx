import React from 'react';
import './BlogDetails.css';
import hero from '../assets/Hero.png';
import { BsCalendar3 } from 'react-icons/bs';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const BlogDetails = () => {
  return (
    <div className="blog-details">
      <section className="blog-details-hero">
        <img src={hero} alt="" className="blog-details-hero-bg" />
        <h1>Blog Details</h1>
      </section>

      <div className="blog-details-content">
        <div className="blog-details-header">
          <div className="blog-meta-info">
            <div className="blog-date">
              <BsCalendar3 size={16} />
              <span>15 June 2024</span>
            </div>
            <div className="blog-category">Business</div>
          </div>
          <h1 className="blog-title">Announcing the free upgrade for the subscribed plans</h1>
        </div>

        <div className="blog-content">
          <p className="blog-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ullamcorper augue ut libero suscipit, vel convallis turpis euismod. Nullam at mauris malesuada, convallis ipsum ut, consequat enim. Aliquam erat volutpat. Sed fermentum nisi vitae diam sagittis pharetra.
          </p>

          <div className="blog-quote">
            "Early in my career... I had to choose between honest arrogance and hypocritical humility... I deliberately chose honest arrogance, and I've never been sorry."
          </div>

          <div className="sustainable-design">
            <h2>Sustainable Concrete Design</h2>
            <div className="design-points">
              <div className="design-point">By enhancing sustainable concrete design processes</div>
              <div className="design-point">Making climate-conscious choices when we can</div>
              <div className="design-point">Resources have always been used in a diverse and regular basis</div>
              <div className="design-point">A competitive price point can add value into your lot or area </div>
            </div>
          </div>

          <p className="blog-text">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Et harum quidem rerum facilis est et expedita distinctio.
          </p>
        </div>

        <div className="share-section">
          <span className="share-text">Share Here:</span>
          <div className="social-icons">
            <FaFacebookF size={18} className="social-icon" />
            <FaTwitter size={18} className="social-icon" />
            <FaInstagram size={18} className="social-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;