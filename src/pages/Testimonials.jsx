import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Testimonials.css';
import { productAPI, reviewAPI, blogAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import testimonial_1 from '../assets/testimonials_1.png';
import testimonial_2 from '../assets/testimonials_2.png';
import categories_1 from '../assets/categories_1.png';
import categories_2 from '../assets/categories_2.png';
import categories_3 from '../assets/categories_3.png';
import Photo from '../assets/testimonials_1.png';
import hero from '../assets/Hero.png';
import toast from 'react-hot-toast';
import { Star, ArrowRight } from 'lucide-react';

const Testimonials = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Fetch top reviewed products
                const productsResponse = await productAPI.getAllProducts();
                const allProducts = productsResponse.data?.products || [];
                setProducts(allProducts.filter(product => product.rating > 0).slice(0, 2));
                
                // Fetch reviews
                const reviewsResponse = await reviewAPI.getAllReviews();
                setReviews(Array.isArray(reviewsResponse.data) ? reviewsResponse.data.slice(0, 4) : []);
                
                // Fetch blogs
                const blogsResponse = await blogAPI.getAllBlogs();
                setBlogs(blogsResponse.data?.blogs || []);
                
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to load testimonials data');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);
    
    const renderStars = (rating) => {
        return (
            <div className="stars">
                {[...Array(5)].map((_, i) => (
                    <Star 
                        key={i} 
                        size={16} 
                        fill={i < Math.floor(rating) ? '#FDB241' : 'none'}
                        color={i < Math.floor(rating) ? '#FDB241' : '#d1d5db'}
                    />
                ))}
            </div>
        );
    };
    
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };
    
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading testimonials...</p>
            </div>
        );
    }
    
    return (
        <motion.div 
            className="testimonials-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Top Reviews Section */}
            <motion.div 
                className="top-reviews"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="top-reviews-content">
                    <motion.h2 
                        style={{ color: '#fff' }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Top Most Reviewed Software of {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}
                    </motion.h2>
                    <motion.button 
                        className="all-review-btn"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/reviews')}
                    >
                        All Reviews
                    </motion.button>
                </div>
                <div className="reviews-grid">
                    {products.map((product, index) => (
                        <motion.div 
                            key={product.id} 
                            className="review-card"
                            custom={index}
                            variants={fadeIn}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                            onClick={() => navigate(`/products/${product.id}`)}
                        >
                            <p className="review-text">
                                "{product.description?.substring(0, 150)}..."
                            </p>
                            <div className="rating">
                                {renderStars(product.rating || 0)}
                                <span>({product.reviews?.length || 0})</span>
                            </div>
                            <a className="read-more">
                                Read More <ArrowRight size={14} />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Comparison Tables */}
            <motion.div 
                className="comparison-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    Comparison Tables
                </motion.h2>
                <motion.div 
                    className="comparison-grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5, staggerChildren: 0.1 }}
                >
                    {products.length >= 2 && (
                        [...Array(Math.min(9, products.length * 2))].map((_, i) => (
                            <motion.div 
                                key={i} 
                                className="comparison-item"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 * i }}
                                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}
                                onClick={() => {
                                    const ids = [products[i % products.length].id, products[(i + 1) % products.length].id].join(',');
                                    navigate(`/comparison?products=${ids}`);
                                }}
                            >
                                <div className="company-pair">
                                    <div className="company">
                                        <img src={products[i % products.length]?.logo || testimonial_1} alt={products[i % products.length]?.name} />
                                        <span>{products[i % products.length]?.name}</span>
                                    </div>
                                    <div className="vs">vs</div>
                                    <div className="company">
                                        <img src={products[(i + 1) % products.length]?.logo || testimonial_2} alt={products[(i + 1) % products.length]?.name} />
                                        <span>{products[(i + 1) % products.length]?.name}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) || (
                        [...Array(9)].map((_, i) => (
                            <motion.div 
                                key={i} 
                                className="comparison-item"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 * i }}
                                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}
                            >
                                <div className="company-pair">
                                    <div className="company">
                                        <img src={testimonial_1} alt="BambooHR" />
                                        <span>Product A</span>
                                    </div>
                                    <div className="vs">vs</div>
                                    <div className="company">
                                        <img src={testimonial_2} alt="BambooHR" />
                                        <span>Product B</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </motion.div>

            {/* How It Works */}
            <motion.div 
                className="how-it-works"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
            >
                <div className="how-it-works-content">
                    <motion.h2 
                        style={{ color: '#fff' }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        How It Works
                    </motion.h2>
                    <motion.div 
                        className="features-list"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        <motion.div 
                            className="feature-item"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                            whileHover={{ x: 5 }}
                        >
                            <div className="feature-icon">🔍</div>
                            <div className="feature-text">
                                <h3>Sales Analytics</h3>
                                <p>Trends to Drive Informed Decisions and Optimize Performance.</p>
                            </div>
                        </motion.div>
                        <motion.div 
                            className="feature-item"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 1.0 }}
                            whileHover={{ x: 5 }}
                        >
                            <div className="feature-icon">📊</div>
                            <div className="feature-text">
                                <h3>Products Analytics</h3>
                                <p>Unleashing Insights to Enhance Offerings, Maximize Impact, and Delight Customers.</p>
                            </div>
                        </motion.div>
                        <motion.div 
                            className="feature-item"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 1.1 }}
                            whileHover={{ x: 5 }}
                        >
                            <div className="feature-icon">👥</div>
                            <div className="feature-text">
                                <h3>Customers Analytics</h3>
                                <p>Preferences for Exceptional Customer Experiences and Lasting Relationships.</p>
                            </div>
                        </motion.div>
                    </motion.div>
                    <motion.button 
                        className="explore-tools-btn"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/products')}
                    >
                        Explore All Tools
                    </motion.button>
                </div>
                <motion.div 
                    className="how-it-works-image"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                >
                    <motion.img 
                        src={Photo} 
                        alt="Workspace"
                        whileHover={{ scale: 1.03 }}
                    />
                </motion.div>
            </motion.div>

            {/* Testimonials Section */}
            <motion.div 
                className="testimonials-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
            >
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                >
                    Testimonials
                </motion.h2>
                <motion.div 
                    className="testimonials-grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                >
                    {reviews.slice(0, 2).map((review, index) => (
                        <motion.div 
                            key={review.id} 
                            className="testimonial-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                            whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                        >
                            <p className="testimonial-text">
                                "{review.comment || "Every new business and start-up, big or small, goes through the five stages of business growth. These phases include existence, survival, success, take-off, and resource maturity."}"
                            </p>
                            <div className="testimonial-author">
                                <img src={index === 0 ? testimonial_1 : testimonial_2} alt="User" />
                                <div className="author-info">
                                    <h4>{review.product?.name || "Product Review"}</h4>
                                    <p>{review.title || "Verified User"}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {reviews.length === 0 && (
                        <>
                            <motion.div 
                                className="testimonial-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.1 }}
                                whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                            >
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
                            </motion.div>
                            <motion.div 
                                className="testimonial-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.2 }}
                                whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                            >
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
                            </motion.div>
                        </>
                    )}
                </motion.div>
            </motion.div>

            {/* Blog Highlights */}
            <motion.div 
                className="blog-highlights"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
            >
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                >
                    Blog Highlights
                </motion.h2>
                <motion.div 
                    className="blog-grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                >
                    {(blogs.length > 0 ? blogs.slice(0, 3) : [
                        { id: 1, title: "Meta AI", summary: "Lorem ipsum dolor sit amet consectetur. Semper ornare viverra voluptat.", image_url: categories_1 },
                        { id: 2, title: "Product Analytics", summary: "Lorem ipsum dolor sit amet consectetur. Semper ornare viverra voluptat.", image_url: categories_2 },
                        { id: 3, title: "Growth Strategies", summary: "Lorem ipsum dolor sit amet consectetur. Semper ornare viverra voluptat.", image_url: categories_3 }
                    ]).map((blog, index) => (
                        <motion.div 
                            key={blog.id} 
                            className="blog-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                            whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                            onClick={() => navigate(`/blog-details/${blog.id}`)}
                        >
                            <motion.img 
                                src={blog.image_url || [categories_1, categories_2, categories_3][index % 3]} 
                                alt="Blog post"
                                whileHover={{ scale: 1.05 }}
                            />
                            <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                            >
                                {blog.title}
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                            >
                                {blog.summary?.substring(0, 80) || "Lorem ipsum dolor sit amet consectetur. Semper ornare viverra voluptat."}
                                {blog.summary?.length > 80 && "..."}
                            </motion.p>
                            <motion.a 
                                className="read-more"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
                                whileHover={{ x: 5 }}
                            >
                                Read More <ArrowRight size={14} />
                            </motion.a>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Waitlist Section */}
            <motion.div 
                className="waitlist-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
            >
                <div className="waitlist-content">
                    <motion.div 
                        className="waitlist-text"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.6 }}
                    >
                        <motion.h2 
                            style={{color:"white"}}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.7 }}
                        >
                            Join 569 more people in the waitlist
                        </motion.h2>
                        <motion.div 
                            className="waitlist-form"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.8 }}
                        >
                            <input type="email" placeholder="Your work email address" />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Join the waitlist
                            </motion.button>
                        </motion.div>
                    </motion.div>
                    <motion.img 
                        src={Photo} 
                        alt="VR User" 
                        style={{margin:"10px",height:"300px"}} 
                        className="waitlist-image"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 1.7 }}
                        whileHover={{ scale: 1.05 }}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Testimonials;