import React from 'react';
import './Testimonials.css';
import testimonial_1 from '../assets/testimonials_1.png';
import testimonial_2 from '../assets/testimonials_2.png';
import categories_1 from '../assets/categories_1.png';
import categories_2 from '../assets/categories_2.png';
import categories_3 from '../assets/categories_3.png';
import Photo from '../assets/testimonials_1.png';
import photo_1 from '../assets/testimonials_2.png';

const Testimonials = () => {
    return (
        <div className="testimonials-page">
            {/* Top Reviews Section */}
            <div className="top-reviews">
                <div className="top-reviews-content">
                    <h2 style={{ color: '#fff' }}>Top 8 Most Reviewed Software of June 2024</h2>
                    <button className="all-review-btn">All Review</button>
                </div>
                <div className="reviews-grid">
                    <div className="review-card">
                        <p className="review-text">
                            "Every new business and start-up, big or small, goes through the five stages of business growth. These phases include existence, survival, success, take-off, and resource maturity."
                        </p>
                        <div className="rating">
                            <div className="stars">★★★★★</div>
                            <span>(1156)</span>
                        </div>
                        <a href="#" className="read-more">Read More</a>
                    </div>
                    <div className="review-card">
                        <p className="review-text">
                            "Every new business and start-up, big or small, goes through the five stages of business growth. These phases include existence, survival, success, take-off, and resource maturity."
                        </p>
                        <div className="rating">
                            <div className="stars">★★★★★</div>
                            <span>(1156)</span>
                        </div>
                        <a href="#" className="read-more">Read More</a>
                    </div>
                </div>
            </div>

            {/* Comparison Tables */}
            <div className="comparison-section">
                <h2>Comparison Tables</h2>
                <div className="comparison-grid">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="comparison-item">
                            <div className="company-pair">
                                <div className="company">
                                    <img src={photo_1} alt="BambooHR" />
                                    <span>BambooHR</span>
                                </div>
                                <div className="vs">vs</div>
                                <div className="company">
                                    <img src={photo_1} alt="BambooHR" />
                                    <span>BambooHR</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* How It Works */}
            <div className="how-it-works">
                <div className="how-it-works-content">
                    <h2 style={{ color: '#fff' }}>How It Works</h2>
                    <div className="features-list">
                        <div className="feature-item">
                            <div className="feature-icon">🔍</div>
                            <div className="feature-text">
                                <h3>Sales Analytics</h3>
                                <p>Trends to Drive Informed Decisions and Optimize Performance.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">📊</div>
                            <div className="feature-text">
                                <h3>Products Analytics</h3>
                                <p>Unleashing Insights to Enhance Offerings, Maximize Impact, and Delight Customers.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">👥</div>
                            <div className="feature-text">
                                <h3>Customers Analytics</h3>
                                <p>Preferences for Exceptional Customer Experiences and Lasting Relationships.</p>
                            </div>
                        </div>
                    </div>
                    <button className="explore-tools-btn">Explore All Tools</button>
                </div>
                <div className="how-it-works-image">
                    <img src={Photo} alt="Workspace" />
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="testimonials-section">
                <h2>Testimonials</h2>
                <div className="testimonials-grid">
                    <div className="testimonial-card">
                        <p className="testimonial-text">
                            "Every new business and start-up, big or small, goes through the five stages of business growth. These phases include existence, survival, success, take-off, and resource maturity."
                        </p>
                        <div className="testimonial-author">
                            <img src={testimonial_1} alt="Devon Lane" />
                            <div className="author-info">
                                <h4>Devon Lane</h4>
                                <p>Founder of Brilex</p>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <p className="testimonial-text">
                            "Business growth is a point a business reaches where it expands and requires more avenues to generate a profit. This can happen when a company increases revenue."
                        </p>
                        <div className="testimonial-author">
                            <img src={testimonial_2} alt="Robert Fox" />
                            <div className="author-info">
                                <h4>Robert Fox</h4>
                                <p>Manager of Miro</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog Highlights */}
            <div className="blog-highlights">
                <h2>Blog Highlights</h2>
                <div className="blog-grid">
                    {[categories_1, categories_2, categories_3].map((img, index) => (
                        <div key={index} className="blog-card">
                            <img src={img} alt="Blog post" />
                            <h3>Meta AI</h3>
                            <p>Lorem ipsum dolor sit amet consectetur. Semper ornare viverra voluptat.</p>
                            <a href="#" className="read-more">Read More</a>
                        </div>
                    ))}
                </div>
            </div>

            {/* Waitlist Section */}
            <div className="waitlist-section">
                <div className="waitlist-content">
                    <div className="waitlist-text">
                        <h2 style={{color:"white"}}>Join 569 more people in the waitlist</h2>
                        <div className="waitlist-form">
                            <input type="email" placeholder="Your work email address" />
                            <button>Join the waitlist</button>
                        </div>
                    </div>
                    <img src={Photo} alt="VR User"  style={{margin:"10px",height:"300px"}} className="waitlist-image" />
                </div>
            </div>
        </div>
    );
};

export default Testimonials;