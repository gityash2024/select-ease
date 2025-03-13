// BlogDetails.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import './BlogDetails.css';
import hero from '../assets/Hero.png';
import { BsCalendar3 } from 'react-icons/bs';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { blogAPI } from '../services/api';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const Container = styled(motion.div)``;

const Hero = styled(motion.section)``;

const Content = styled(motion.div)``;

const Header = styled(motion.div)``;

const Title = styled(motion.h1)``;

const Image = styled(motion.div)`
  img {
    width: 100%;
  }
`;

const ContentBody = styled(motion.div)``;

const ShareSection = styled(motion.div)``;

const SocialIcon = styled(motion.div)``;

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  const { id: routeId } = useParams();
  const queryId = searchParams.get('id');
  const blogId = routeId || queryId;
  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!blogId) {
          toast.error('Blog ID not provided');
          navigate('/blogs');
          return;
        }
        
        const response = await blogAPI.getBlogById(blogId);
        setBlog(response.data.blog);
      } catch (error) {
        console.error('Error fetching blog details:', error);
        toast.error('Failed to load blog details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [blogId, navigate]);
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (!blog) {
    return <div className="not-found">Blog not found</div>;
  }
  
  const formattedDate = blog.createdAt 
    ? format(new Date(blog.createdAt), 'dd MMMM yyyy')
    : 'No date available';
    
  const shareOnFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };
  
  const shareOnTwitter = () => {
    const url = window.location.href;
    const text = blog.title;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  return (
    <Container 
      className="blog-details"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <Hero 
        className="blog-details-hero"
        variants={fadeIn}
        transition={{ duration: 0.6 }}
      >
        <img src={hero} alt="" className="blog-details-hero-bg" />
        <h1>Blog Details</h1>
      </Hero>

      <div className="blog-details-container">
        <Content 
          className="blog-details-content"
          variants={slideUp}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Header 
            className="blog-details-header"
            variants={slideUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="blog-meta-info">
              <div className="blog-date">
                <BsCalendar3 size={16} />
                <span>{formattedDate}</span>
              </div>
              {blog.author && (
                <div className="blog-author">
                  <span>By {blog.author}</span>
                </div>
              )}
              <span className="back-button-blog">
                <motion.button 
                  onClick={() => navigate(-1)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back
                </motion.button>
              </span>
            </div>
            <Title 
              className="blog-title"
              variants={slideUp}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {blog.title}
            </Title>
          </Header>

          {blog.image_url && (
            <Image 
              className="blog-featured-image"
              variants={fadeIn}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <img src={blog.image_url} alt={blog.title} />
            </Image>
          )}

          <ContentBody 
            className="blog-content"
            variants={slideUp}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {blog.summary && (
              <motion.div 
                className="blog-summary"
                variants={slideUp}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <p>{blog.summary}</p>
              </motion.div>
            )}
            <motion.div 
              className="blog-text"
              variants={slideUp}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {blog.content.split('\n').map((paragraph, index) => (
                <motion.p 
                  key={index}
                  variants={fadeIn}
                  transition={{ duration: 0.3, delay: 0.1 * index + 0.9 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
          </ContentBody>

          <ShareSection 
            className="share-section"
            variants={slideUp}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <span className="share-text">Share Here:</span>
            <div className="social-icons">
              <SocialIcon 
                className="social-icon" 
                onClick={shareOnFacebook}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaFacebookF size={18} />
              </SocialIcon>
              <SocialIcon 
                className="social-icon" 
                onClick={shareOnTwitter}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTwitter size={18} />
              </SocialIcon>
              <SocialIcon 
                className="social-icon"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaInstagram size={18} />
              </SocialIcon>
            </div>
          </ShareSection>
        </Content>
      </div>
    </Container>
  );
};

export default BlogDetails;