import React from 'react';
import './Blog.css';
import Img from '../assets/Img.png';
import Img1 from '../assets/Img1.png';
import Img2 from '../assets/Img2.png';
import Img3 from '../assets/Img3.png';
import Img4 from '../assets/Img4.png';
import Img5 from '../assets/Img5.png';
import calendar from '../assets/calendar.png';
import hero from '../assets/Hero.png';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ image, title, date }) => {
  const navigate=useNavigate();
  return (
    <div className="blog-card-custom" style={{cursor:"pointer"}} onClick={() => navigate('/blog-details')}>
      <img src={image} alt={title} className="blog-image" />
      <div className="blog-content">
        <h3 className="blog-title">{title}</h3>
        <div className="blog-meta">
          <div className="category-tag">Category</div>
          <div className="date-container">
            <img src={calendar} alt="calendar" className="calendar-icon" />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Blogs = () => {
  const blogPosts = [
    {
      image: Img,
      title: "Juan Diego Rodriguez wrote Gatsby Headaches.",
      date: "20 June, 2023"
    },
    {
      image: Img1,
      title: "Juan Diego Rodriguez wrote Gatsby Headaches.",
      date: "20 June, 2023"
    },
    {
      image: Img2,
      title: "Juan Diego Rodriguez wrote Gatsby Headaches.",
      date: "20 June, 2023"
    },
    {
      image: Img3,
      title: "Juan Diego Rodriguez wrote Gatsby Headaches.",
      date: "20 June, 2023"
    },
    {
      image: Img4,
      title: "Juan Diego Rodriguez wrote Gatsby Headaches.",
      date: "20 June, 2023"
    },
    {
      image: Img5,
      title: "Juan Diego Rodriguez wrote Gatsby Headaches.",
      date: "20 June, 2023"
    }
  ];

  return (
    <>
         <section className="contact-hero-section">
        <img src={hero} alt="" className="contact-hero-background" />
        <h1>Blogs</h1>
      </section>
    <section className="blog-section">
      <div className="blog-container">
        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <BlogCard
              key={index}
              image={post.image}
              title={post.title}
              date={post.date}
            />
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default Blogs;