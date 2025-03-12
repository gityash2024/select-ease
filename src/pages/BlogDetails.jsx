import React, { useState, useEffect } from 'react';
import './BlogDetails.css';
import hero from '../assets/Hero.png';
import { BsCalendar3 } from 'react-icons/bs';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { blogAPI } from '../services/api';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

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
  
  return (
    <div className="blog-details">
      <section className="blog-details-hero">
        <img src={hero} alt="" className="blog-details-hero-bg" />
        <h1>Blog Details</h1>
      </section>

      <div className="blog-details-container">
        <div className="blog-details-content">
          <div className="blog-details-header">
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
              <span className="back-button">
                <button style={{border:"1px solid #026283"}} onClick={() => navigate(-1)}>Back</button>
              </span>
            </div>
            <h1 className="blog-title">{blog.title}</h1>
          </div>

          {blog.image_url && (
            <div className="blog-featured-image">
              <img src={blog.image_url} alt={blog.title} />
            </div>
          )}

          <div className="blog-content">
            {blog.summary && (
              <div className="blog-summary">
                <p>{blog.summary}</p>
              </div>
            )}
            <div className="blog-text">
              {blog.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="share-section">
            <span className="share-text">Share Here:</span>
            <div className="social-icons">
              <div className="social-icon" onClick={shareOnFacebook}>
                <FaFacebookF size={18} />
              </div>
              <div className="social-icon" onClick={shareOnTwitter}>
                <FaTwitter size={18} />
              </div>
              <div className="social-icon">
                <FaInstagram size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;