// Blog.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import './Blog.css';
import Img from '../assets/Img.png';
import calendar from '../assets/calendar.png';
import hero from '../assets/Hero.png';
import { useNavigate } from 'react-router-dom';
import { blogAPI } from '../services/api';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const StyledBlogCard = styled(motion.div)`
  cursor: pointer;
`;

const StyledImage = styled(motion.img)``;

const StyledContent = styled(motion.div)``;

const StyledTitle = styled(motion.h3)``;

const StyledBlogContainer = styled(motion.section)``;

const StyledHeroSection = styled(motion.section)``;

const BlogCard = ({ blog, defaultImage }) => {
  const navigate = useNavigate();
  const formattedDate = blog.createdAt
    ? format(new Date(blog.createdAt), 'dd MMMM, yyyy')
    : 'No date available';
    
  return (
    <StyledBlogCard 
      className="blog-card-custom"
      onClick={() => navigate(`/blog-details/${blog.id}`)}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <StyledImage 
        src={blog.image_url || defaultImage} 
        alt={blog.title} 
        className="blog-image"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <StyledContent 
        className="blog-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <StyledTitle 
          className="blog-title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {blog.title}
        </StyledTitle>
        <motion.div 
          className="blog-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="date-container">
            <img src={calendar} alt="calendar" className="calendar-icon" />
            <span>{formattedDate}</span>
          </div>
          {blog.author && (
            <div className="author-container">
              <span className="author">By {blog.author}</span>
            </div>
          )}
        </motion.div>
        {blog.summary && (
          <motion.p 
            className="blog-summary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {blog.summary?.split(' ').slice(0, 20).join(' ')} {blog?.summary?.length > 20 && '...'}
          </motion.p>
        )}
      </StyledContent>
    </StyledBlogCard>
  );
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const defaultImages = [Img, Img, Img, Img, Img, Img];
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogAPI.getAllBlogs();
        setBlogs(response.data?.blogs || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast.error('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);
  
  if (loading) {
    return (
      <>
        <StyledHeroSection 
          className="contact-hero-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img src={hero} alt="" className="contact-hero-background" />
          <h1>Blogs</h1>
        </StyledHeroSection>
        <motion.div 
          className="loading-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Loading blogs...
        </motion.div>
      </>
    );
  }
  
  return (
    <>
      <StyledHeroSection 
        className="contact-hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img src={hero} alt="" className="contact-hero-background" />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Blogs
        </motion.h1>
      </StyledHeroSection>
      <StyledBlogContainer 
        className="blog-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.div 
          className="blog-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {blogs.length === 0 ? (
            <motion.div 
              className="no-blogs-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              No blogs available at the moment.
            </motion.div>
          ) : (
            <motion.div 
              className="blog-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {blogs.map((blog, index) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  defaultImage={defaultImages[index % defaultImages.length]}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      </StyledBlogContainer>
    </>
  );
};

export default Blogs;