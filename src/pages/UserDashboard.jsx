import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Star, ShoppingCart, Heart, User, Package, Eye, BarChart2, Award, TrendingUp, Clock } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = 'https://select-ease-backend-1.onrender.com/api';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const pulse = {
  scale: [1, 1.05, 1],
  transition: { 
    duration: 1.5,
    repeat: Infinity,
    repeatType: "loop"
  }
};

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    repeatType: "loop"
  }
};

// Styled components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1.5rem;
`;

const WelcomeSection = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #026283 0%, #3490dc 100%);
  border-radius: 12px;
  padding: 2.5rem;
  color: white;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const WelcomeText = styled.div`
  z-index: 1;
  
  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1.1rem;
    opacity: 0.9;
    max-width: 600px;
  }
`;

const WelcomeGraphic = styled(motion.div)`
  position: absolute;
  right: -50px;
  top: -50px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
  border-radius: 50%;
`;

const WelcomeGraphic2 = styled(motion.div)`
  position: absolute;
  left: -30px;
  bottom: -30px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
  border-radius: 50%;
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const StatCard = styled(motion.div)`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color || '#026283'};
  color: white;
`;

const StatInfo = styled.div`
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #111827;
    margin: 0;
  }

  p {
    color: #6b7280;
    font-size: 0.875rem;
    margin: 0;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled(motion.div)`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: fit-content;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-top: 0;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProductGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled(motion.div)`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
`;

const ProductContent = styled.div`
  padding: 1rem;
`;

const ProductTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
`;

const ProductPrice = styled.p`
  font-weight: 600;
  color: #026283;
  margin: 0 0 0.5rem 0;
`;

const StarRating = styled.div`
  display: flex;
  color: #f59e0b;
  gap: 2px;
  margin-bottom: 0.5rem;
`;

const ViewButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  background-color: #026283;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #01516e;
  }
`;

const BlogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BlogItem = styled(motion.div)`
  display: flex;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const BlogImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

const BlogContent = styled.div`
  flex: 1;
`;

const BlogTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.8rem;
  color: #6b7280;
`;

const TrendingProducts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TrendingItem = styled(motion.div)`
  display: flex;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    opacity: 0.8;
  }
`;

const TrendingImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
`;

const TrendingContent = styled.div`
  flex: 1;
`;

const TrendingTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 500;
  margin: 0 0 0.25rem 0;
`;

const TrendingMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
`;

const Price = styled.span`
  font-weight: 600;
  color: #026283;
`;

const TrendingRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #f59e0b;
`;

const ViewAllLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #026283;
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

// Main Component
const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [recommended, setRecommended] = useState([]);
  const [trending, setTrending] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [stats, setStats] = useState({
    wishlist: 0,
    viewed: 0,
    reviewed: 0,
    comparisons: 0
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchDashboardData();
  }, []);
  
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch all data in parallel
      const [productsResponse, blogsResponse] = await Promise.all([
        axios.get(`${API_URL}/products`),
        axios.get(`${API_URL}/blogs`)
      ]);
      
      const allProducts = productsResponse.data?.products || [];
      const allBlogs = blogsResponse.data?.blogs || [];
      
      // Filter products with rating > 4 for trending
      const trendingProducts = [...allProducts]
        .filter(p => p.rating >= 4)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);
      
      // Get random products for recommendations
      const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
      const recommendedProducts = shuffled.slice(0, 4);
      
      // Simulate recently viewed (just using a different random set)
      const recentlyViewedProducts = shuffled.slice(4, 7);
      
      // Get latest blogs
      const latestBlogs = [...allBlogs]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);
      
      // Set data
      setTrending(trendingProducts);
      setRecommended(recommendedProducts);
      setRecentlyViewed(recentlyViewedProducts);
      setBlogs(latestBlogs);
      
      // Simulate stats
      setStats({
        wishlist: Math.floor(Math.random() * 8),
        viewed: Math.floor(Math.random() * 15) + 5,
        reviewed: Math.floor(Math.random() * 3),
        comparisons: Math.floor(Math.random() * 5)
      });
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };
  
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          fill={i < fullStars ? '#f59e0b' : 'none'}
          stroke={i < fullStars ? '#f59e0b' : '#d1d5db'}
        />
      );
    }
    
    return <>{stars}</>;
  };
  
  const handleViewProduct = (productId) => {
    navigate(`/products/${productId}`);
  };
  
  if (loading) {
    return <PageContainer>Loading dashboard data...</PageContainer>;
  }
  
  return (
    <PageContainer>
      <WelcomeSection
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <WelcomeText>
          <h1>Welcome back, {user?.firstName || 'there'}!</h1>
          <p>
            Discover personalized product recommendations, browse trending items, 
            and stay updated with the latest from our blog.
          </p>
        </WelcomeText>
        <WelcomeGraphic 
          animate={floatAnimation}
        />
        <WelcomeGraphic2 
          animate={{
            ...floatAnimation,
            transition: { 
              delay: 0.5,
              duration: 2.5,
              repeat: Infinity,
              repeatType: "loop"
            }
          }}
        />
      </WelcomeSection>
      
      <StatsGrid
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <StatCard variants={fadeInUp}>
          <IconWrapper color="#026283">
            <Heart size={24} />
          </IconWrapper>
          <StatInfo>
            <h3>{stats.wishlist}</h3>
            <p>Wishlist Items</p>
          </StatInfo>
        </StatCard>
        
        <StatCard variants={fadeInUp}>
          <IconWrapper color="#10b981">
            <Eye size={24} />
          </IconWrapper>
          <StatInfo>
            <h3>{stats.viewed}</h3>
            <p>Products Viewed</p>
          </StatInfo>
        </StatCard>
        
        <StatCard variants={fadeInUp}>
          <IconWrapper color="#8b5cf6">
            <Star size={24} />
          </IconWrapper>
          <StatInfo>
            <h3>{stats.reviewed}</h3>
            <p>Reviews Posted</p>
          </StatInfo>
        </StatCard>
        
        <StatCard variants={fadeInUp}>
          <IconWrapper color="#f59e0b">
            <BarChart2 size={24} />
          </IconWrapper>
          <StatInfo>
            <h3>{stats.comparisons}</h3>
            <p>Product Comparisons</p>
          </StatInfo>
        </StatCard>
      </StatsGrid>
      
      <ContentGrid>
        <Section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle>
            <Award size={20} />
            Recommended for You
          </SectionTitle>
          <ProductGrid
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {recommended.map((product) => (
              <ProductCard 
                key={product.id}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <ProductImage 
                  src={product.image_url || 'https://via.placeholder.com/300x200?text=Product+Image'} 
                  alt={product.name} 
                />
                <ProductContent>
                  <ProductTitle>{product.name}</ProductTitle>
                  <ProductPrice>${product.price}</ProductPrice>
                  <StarRating>{renderRating(product.rating)}</StarRating>
                  <ViewButton onClick={() => handleViewProduct(product.id)}>
                    <Eye size={16} />
                    View Details
                  </ViewButton>
                </ProductContent>
              </ProductCard>
            ))}
          </ProductGrid>
          <ViewAllLink to="/products">View All Products</ViewAllLink>
        </Section>
        
        <Section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionTitle>
            <TrendingUp size={20} />
            Trending Products
          </SectionTitle>
          <TrendingProducts>
            {trending.map((product) => (
              <TrendingItem 
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                whileHover={{ x: 5 }}
                onClick={() => handleViewProduct(product.id)}
              >
                <TrendingImage 
                  src={product.image_url || 'https://via.placeholder.com/100x100?text=Product'} 
                  alt={product.name} 
                />
                <TrendingContent>
                  <TrendingTitle>{product.name}</TrendingTitle>
                  <TrendingMeta>
                    <Price>${product.price}</Price>
                    <TrendingRating>
                      <Star size={12} fill="#f59e0b" />
                      {product.rating.toFixed(1)}
                    </TrendingRating>
                  </TrendingMeta>
                </TrendingContent>
              </TrendingItem>
            ))}
          </TrendingProducts>
        </Section>
      </ContentGrid>
      
      <ContentGrid>
        <Section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle>
            <Clock size={20} />
            Recently Viewed
          </SectionTitle>
          {recentlyViewed.length > 0 ? (
            <TrendingProducts>
              {recentlyViewed.map((product) => (
                <TrendingItem 
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  whileHover={{ x: 5 }}
                  onClick={() => handleViewProduct(product.id)}
                >
                  <TrendingImage 
                    src={product.image_url || 'https://via.placeholder.com/100x100?text=Product'} 
                    alt={product.name} 
                  />
                  <TrendingContent>
                    <TrendingTitle>{product.name}</TrendingTitle>
                    <TrendingMeta>
                      <Price>${product.price}</Price>
                      <TrendingRating>
                        <Star size={12} fill="#f59e0b" />
                        {product.rating.toFixed(1)}
                      </TrendingRating>
                    </TrendingMeta>
                  </TrendingContent>
                </TrendingItem>
              ))}
            </TrendingProducts>
          ) : (
            <p>No recently viewed products</p>
          )}
        </Section>
        
        <Section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionTitle>
            <Book size={20} />
            Latest From Our Blog
          </SectionTitle>
          <BlogList>
            {blogs.map((blog) => (
              <BlogItem 
                key={blog.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                whileHover={{ x: 5 }}
              >
                <BlogImage 
                  src={blog.image_url || 'https://via.placeholder.com/100x100?text=Blog'} 
                  alt={blog.title} 
                />
                <BlogContent>
                  <BlogTitle>
                    <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {blog.title}
                    </Link>
                  </BlogTitle>
                  <BlogMeta>
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    <span>{blog.author || 'Admin'}</span>
                  </BlogMeta>
                </BlogContent>
              </BlogItem>
            ))}
          </BlogList>
          <ViewAllLink to="/blogs">View All Blog Posts</ViewAllLink>
        </Section>
      </ContentGrid>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '1rem' }}
      >
        <motion.h2 
          animate={pulse}
          style={{ color: '#026283', fontWeight: 600 }}
        >
          Ready to explore more products?
        </motion.h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: '#6b7280' }}>
          Check out our latest products, compare features, and find the perfect items for your needs.
        </p>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          style={{ marginTop: '1.5rem' }}
        >
          <Link 
            to="/products" 
            style={{ 
              backgroundColor: '#026283', 
              color: 'white', 
              padding: '0.75rem 1.5rem', 
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 500,
              display: 'inline-block'
            }}
          >
            Browse All Products
          </Link>
        </motion.div>
      </motion.div>
    </PageContainer>
  );
};

export default UserDashboard;