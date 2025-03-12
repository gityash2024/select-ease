import React, { useState, useEffect } from 'react';
import './Blog.css';
import Img from '../assets/Img.png';
import calendar from '../assets/calendar.png';
import hero from '../assets/Hero.png';
import { useNavigate } from 'react-router-dom';
import { blogAPI } from '../services/api';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const BlogCard = ({ blog, defaultImage }) => {
  const navigate = useNavigate();
  const formattedDate = blog.createdAt
    ? format(new Date(blog.createdAt), 'dd MMMM, yyyy')
    : 'No date available';
    
  return (
    <div 
      className="blog-card-custom" 
      style={{cursor:"pointer"}} 
      onClick={() => navigate(`/blog-details?id=${blog.id}`)}
    >
      <img src={defaultImage} alt={blog.heading} className="blog-image" />
      <div className="blog-content">
        <h3 className="blog-title">{blog.heading}</h3>
        <div className="blog-meta">
          <div className="date-container">
            <img src={calendar} alt="calendar" className="calendar-icon" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Sample images to use for blogs that don't have images
  const defaultImages = [Img, Img, Img, Img, Img, Img];
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogAPI.getAllBlogs();
        setBlogs(response.data?.blogs||[]);
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
        <section className="contact-hero-section">
          <img src={hero} alt="" className="contact-hero-background" />
          <h1>Blogs</h1>
        </section>
        <div className="loading-container">Loading blogs...</div>
      </>
    );
  }
  
  return (
    <>
      <section className="contact-hero-section">
        <img src={hero} alt="" className="contact-hero-background" />
        <h1>Blogs</h1>
      </section>
      <section className="blog-section">
        <div className="blog-container">
          {blogs.length === 0 ? (
            <div className="no-blogs-message">No blogs available at the moment.</div>
          ) : (
            <div className="blog-grid">
              {blogs?.map((blog, index) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  defaultImage={defaultImages[index % defaultImages.length]}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blogs;