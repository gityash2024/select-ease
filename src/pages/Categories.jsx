import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryAPI } from '../services/api';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { Search, ArrowRight, Tag, ChevronUp } from 'lucide-react';

const PageContainer = styled.div`
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, #026283 0%, #012E3D 100%);
  color: white;
  padding: 4rem 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/path/to/pattern.svg');
    opacity: 0.1;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    position: relative;
  }

  p {
    font-size: 1.2rem;
    max-width: 830px;
    margin: 0 auto 1.5rem;
    opacity: 0.9;
  }
`;

const SearchContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;

  input {
    flex: 1;
    border: none;
    font-size: 1rem;
    outline: none;
    padding: 0.5rem 0;
  }
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const CategoryCard = styled(motion.div)`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .image-container {
    height: 160px;
    background-color: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .content {
    padding: 1.25rem;
  }

  h3 {
    font-size: 1.25rem;
    margin: 0 0 0.5rem;
    color: #111827;
  }

  p {
    color: #6b7280;
    font-size: 0.875rem;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .footer-category {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    padding-top: 0.75rem;
    border-top: 1px solid #e5e7eb;
  }

  .count {
    font-size: 0.875rem;
    color: #6b7280;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .view-more {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #026283;
  }
`;

const ScrollTopButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: #026283;
  color: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;

  &:hover {
    background-color: #015272;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  
  svg {
    color: #d1d5db;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.25rem;
    color: #111827;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #6b7280;
    max-width: 400px;
    margin: 0 auto;
  }
`;

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

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    fetchCategories();
    
    // Show/hide scroll to top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryAPI.getAllCategories();
      setCategories(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories. Please try again later.');
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Images for categories (random from assets)
  const getCategoryImage = (id) => {
    const images = [
      '/src/assets/categories_1.png',
      '/src/assets/categories_2.png',
      '/src/assets/categories_3.png',
      '/src/assets/product_1.png',
      '/src/assets/product_2.png',
      '/src/assets/product_3.png',
      '/src/assets/product_4.png',
    ];
    return images[id % images.length];
  };

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection>
          <h1>Browse Categories</h1>
          <p>Explore our collection of carefully curated categories to find the perfect products for your needs</p>
          {/* <SearchContainer>
            <Search size={20} color="#6b7280" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchContainer> */}
        </HeroSection>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading categories...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
            <button onClick={fetchCategories}>Try Again</button>
          </div>
        ) : filteredCategories.length > 0 ? (
          <CategoriesGrid>
            {filteredCategories.map((category, index) => (
              <CategoryCard
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="image-container">
                  <img src={getCategoryImage(category.id)} alt={category.name} />
                </div>
                <div className="content">
                  <h3>{category.name}</h3>
                  <p>{category.description || 'Explore products in this category'}</p>
                  <div className="footer-category">
                    <span className="count">
                      <Tag size={16} />
                      {Math.floor(Math.random() * 20) + 5} products
                    </span>
                    <span className="view-more">
                      View Products <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </CategoryCard>
            ))}
          </CategoriesGrid>
        ) : (
          <EmptyState>
            <Tag size={48} />
            <h3>No Categories Found</h3>
            <p>We couldn't find any categories matching your search. Try a different search term or browse all products.</p>
          </EmptyState>
        )}
      </motion.div>

      {showScrollTop && (
        <ScrollTopButton
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp size={24} />
        </ScrollTopButton>
      )}
    </PageContainer>
  );
};

export default Categories;