// Review.jsx
import React from 'react';
import './Review.css';
import Instagram from '../assets/Instagram.svg';
import hero from '../assets/Hero.png';
import { useNavigate } from 'react-router-dom';

const ProductCard = () => {
   const navigate=useNavigate();
   return(

  <div className="product-card" style={{cursor:"pointer"}} onClick={() => navigate('/write-feedback')}>
   <div className="icon-circles">
     <img src={Instagram} alt="Product icon" />
   </div>
   <h3>SALESFORCE</h3>
   <p>by Salesforce</p>
 </div>
   )
  };

const Review = () => {
 return (
   <div className="review-page"   >
     <section className="review-hero-section">
       <img src={hero} alt="" className="hero-background" />
       <div className="review-hero-content">
         <h1>Your feedback can make a BIG impact</h1>
         <div className="review-search-box">
           <input type="text" placeholder="Search..." />
           <button>Search</button>
         </div>
       </div>
     </section>

     <section className="products-section">
       <h2>Here are some popular products to review</h2>
       <div className="products-grid">
         {[...Array(8)].map((_, i) => (
           <ProductCard key={i} />
         ))}
       </div>
     </section>

     <section className="solutions-section">
       <h2>Select the other solutions you use, and then click to start a review:</h2>
       <div className="products-grid">
         {[...Array(8)].map((_, i) => (
           <ProductCard key={i} />
         ))}
       </div>
     </section>
   </div>
 );
};

export default Review;