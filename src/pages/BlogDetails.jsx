import React, { useState, useEffect } from 'react';
import './BlogDetails.css';
import hero from '../assets/Hero.png';
import { BsCalendar3 } from 'react-icons/bs';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { blogAPI } from '../services/api';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Get blog ID from query parameters
        const searchParams = new URLSearchParams(location.search);
        const blogId = searchParams.get('id');
        
        if (!blogId) {
          toast.error('Blog ID not provided');
          navigate('/blogs');
          return;
        }
        
        const response = await blogAPI.getBlogById(blogId);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog details:', error);
        toast.error('Failed to load blog details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [location.search, navigate]);
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (!blog) {
    return <div className="not-found">Blog not found</div>;
  }
  
  // Format date if available
  const formattedDate = blog.createdAt 
    ? format(new Date(blog.createdAt), 'dd MMMM yyyy')
    : 'No date available';
  
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
              <span>{formattedDate}</span>
            </div>
          </div>
          <h1 className="blog-title">{blog.heading}</h1>
        </div>

        <div className="blog-content">
          <p className="blog-text">
            {blog.text}
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