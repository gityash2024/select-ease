import React, { useState, useEffect, useRef } from 'react';
import { Users, Package, List, Copy, Layers, Book, ChevronLeft, ChevronRight } from 'lucide-react';
import styled from 'styled-components';
import adminAPI from './adminApi';
import toast from 'react-hot-toast';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area } from 'recharts';
import axios from 'axios';
import { motion } from 'framer-motion';

const API_URL = 'https://select-ease-backend-1.onrender.com/api';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled(motion.div)`
  background-color: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.accentColor || '#026283'};
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color};
  color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
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

const TableSection = styled.div`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transform-style: preserve-3d;
  perspective: 1000px;
  
  &:hover {
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
    transform: translateY(-5px) rotateX(2deg);
  }
`;

const TableTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  padding: 1.5rem;
  margin: 0;
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  background: linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  span {
    font-weight: 400;
    font-size: 0.875rem;
    color: #6b7280;
    margin-left: 0.5rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

const Th = styled.th`
  text-align: left;
  padding: 1.25rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #4b5563;
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  background-color: rgba(249, 250, 251, 0.8);
`;

const Td = styled.td`
  padding: 1.25rem 1.5rem;
  color: #111827;
  border-bottom: 1px solid rgba(229, 231, 235, 0.3);
  transition: background-color 0.2s ease;
  
  &:first-child {
    font-weight: 500;
  }
`;

const FeatureCell = styled(Td)`
  font-weight: 600;
  color: #4b5563;
  background-color: rgba(249, 250, 251, 0.5);
`;

const TRow = styled.tr`
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(249, 250, 251, 0.5);
    transform: translateZ(5px);
  }
`;

const TablesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const CopyIcon = styled(Copy)`
  cursor: pointer;
  margin-left: 0.5rem;
  color: #6b7280;
  
  &:hover {
    color: #111827;
  }
`;

const NoData = styled.div`
  padding: 2rem 1.5rem;
  color: #6b7280;
  text-align: center;
  font-weight: 500;
  background-color: rgba(249, 250, 251, 0.5);
`;

const ChartContainer = styled.div`
  padding: 1rem;
  position: relative;
`;

const ScrollableChartContainer = styled.div`
  position: relative;
  padding: 1rem;
  overflow: hidden;
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &.left {
    left: 10px;
  }
  
  &.right {
    right: 10px;
  }
`;

const COLORS = ['#026283', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#3b82f6'];

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    categories: 0,
    blogs: 0
  });
  const [recentData, setRecentData] = useState({
    users: [],
    products: [],
    categories: [],
    blogs: []
  });
  const [comparisonProducts, setComparisonProducts] = useState([]);
  const [productCategoryData, setProductCategoryData] = useState([]);
  const [productStatusData, setProductStatusData] = useState([]);
  const [dailyProductData, setDailyProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartScrollPosition, setChartScrollPosition] = useState(0);
  
  const scrollableChartRef = useRef(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [usersResponse, productsResponse, categoriesResponse, blogsResponse] = await Promise.all([
        axios.get(`${API_URL}/users`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        }),
        axios.get(`${API_URL}/products`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        }),
        axios.get(`${API_URL}/categories`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        }),
        axios.get(`${API_URL}/blogs`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        })
      ]);

      const users = usersResponse.data?.users || [];
      const products = productsResponse.data?.products || [];
      const categories = categoriesResponse.data || [];
      const blogs = blogsResponse.data?.blogs || [];

      setStats({
        users: users.length,
        products: products.length,
        categories: categories.length,
        blogs: blogs.length
      });

      setRecentData({
        users: users.slice(0, 5),
        products: products.slice(0, 5),
        categories: categories.slice(0, 5),
        blogs: blogs.slice(0, 5)
      });

      if (products.length > 2) {
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        setComparisonProducts(shuffled.slice(0, 3));
      }

      const categoryMap = new Map();
      const statusMap = new Map();

      products.forEach(product => {
        const categoryName = categories.find(c => c.id === product.category_id)?.name || 'Uncategorized';
        
        if (categoryMap.has(categoryName)) {
          categoryMap.set(categoryName, categoryMap.get(categoryName) + 1);
        } else {
          categoryMap.set(categoryName, 1);
        }
        
        const status = product.status || 'pending';
        if (statusMap.has(status)) {
          statusMap.set(status, statusMap.get(status) + 1);
        } else {
          statusMap.set(status, 1);
        }
      });

      const categoryData = Array.from(categoryMap).map(([category, count]) => ({
        name: category,
        value: count
      }));
      
      const statusData = Array.from(statusMap).map(([status, count]) => ({
        name: status.charAt(0).toUpperCase() + status.slice(1),
        value: count
      }));

      setProductCategoryData(categoryData);
      setProductStatusData(statusData);

      const last30Days = [];
      const currentDate = new Date();
      
      for (let i = 29; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - i);
        const dayLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        const randomValue = Math.floor(Math.random() * 5) + 1;
        
        last30Days.push({
          day: dayLabel,
          products: randomValue,
          users: Math.floor(Math.random() * 3),
          categories: Math.random() > 0.8 ? 1 : 0
        });
      }
      
      setDailyProductData(last30Days);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };
  
  const handleScrollLeft = () => {
    if (chartScrollPosition > 0) {
      setChartScrollPosition(prev => Math.max(0, prev - 1));
    }
  };
  
  const handleScrollRight = () => {
    if (chartScrollPosition < dailyProductData.length - 10) {
      setChartScrollPosition(prev => Math.min(dailyProductData.length - 10, prev + 1));
    }
  };
  
  const getVisibleData = () => {
    return dailyProductData.slice(chartScrollPosition, chartScrollPosition + 10);
  };

  return (
    <DashboardContainer>
      {loading ? (
        <p>Loading dashboard data...</p>
      ) : (
        <>
          <StatsGrid>
            <StatCard
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.3, delay: 0.1 }}
              accentColor="#026283"
            >
              <IconWrapper color="#026283">
                <Users size={24} />
              </IconWrapper>
              <StatInfo>
                <h3>{stats.users}</h3>
                <p>Total Users</p>
              </StatInfo>
            </StatCard>
            
            <StatCard 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.3, delay: 0.2 }}
              accentColor="#10b981"
            >
              <IconWrapper color="#10b981">
                <Package size={24} />
              </IconWrapper>
              <StatInfo>
                <h3>{stats.products}</h3>
                <p>Total Products</p>
              </StatInfo>
            </StatCard>
            
            <StatCard
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.3, delay: 0.3 }}
              accentColor="#8b5cf6"
            >
              <IconWrapper color="#8b5cf6">
                <List size={24} />
              </IconWrapper>
              <StatInfo>
                <h3>{stats.categories}</h3>
                <p>Total Categories</p>
              </StatInfo>
            </StatCard>
            
            <StatCard
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.3, delay: 0.4 }}
              accentColor="#f59e0b"
            >
              <IconWrapper color="#f59e0b">
                <Book size={24} />
              </IconWrapper>
              <StatInfo>
                <h3>{stats.blogs}</h3>
                <p>Total Blogs</p>
              </StatInfo>
            </StatCard>
          </StatsGrid>

          <ChartsGrid>
            <div>
              <TableSection>
                <TableTitle>
                  Product Categories
                  <span>Distribution by category</span>
                </TableTitle>
                <ChartContainer>
                  {productCategoryData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart outerRadius={90} data={productCategoryData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis />
                        <Radar
                          name="Products"
                          dataKey="value"
                          stroke="#026283"
                          fill="#026283"
                          fillOpacity={0.6}
                        />
                        <Tooltip />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  ) : (
                    <NoData>No category data available</NoData>
                  )}
                </ChartContainer>
              </TableSection>
            </div>

            <div>
              <TableSection>
                <TableTitle>
                  Product Status
                  <span>Published vs pending vs denied</span>
                </TableTitle>
                <ChartContainer>
                  {productStatusData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={productStatusData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="Number of Products" fill="#026283" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <NoData>No status data available</NoData>
                  )}
                </ChartContainer>
              </TableSection>
            </div>
          </ChartsGrid>

        

          <TablesGrid>
            <TableSection>
              <TableTitle>
                Recent Users
                <span>Latest user activity</span>
              </TableTitle>
              <Table>
                <thead>
                  <tr>
                    <Th>Username</Th>
                    <Th>Email</Th>
                  </tr>
                </thead>
                <tbody>
                  {recentData.users.length > 0 ? (
                    recentData.users.map((user) => (
                      <TRow key={user.id}>
                        <Td>{user.username}</Td>
                        <Td>
                          {user.email}
                          <CopyIcon onClick={() => copyToClipboard(user.email)} size={16} />
                        </Td>
                      </TRow>
                    ))
                  ) : (
                    <TRow>
                      <Td colSpan={2}>
                        <NoData>No user data available</NoData>
                      </Td>
                    </TRow>
                  )}
                </tbody>
              </Table>
            </TableSection>

            <TableSection>
              <TableTitle>
                Recent Products
                <span>Latest product additions</span>
              </TableTitle>
              <Table>
                <thead>
                  <tr>
                    <Th>Name</Th>
                    <Th>Price</Th>
                    <Th>Status</Th>
                  </tr>
                </thead>
                <tbody>
                  {recentData.products.length > 0 ? (
                    recentData.products.map((product) => (
                      <TRow key={product.id}>
                        <Td>{product.name}</Td>
                        <Td>${parseFloat(product.price).toFixed(2)}</Td>
                        <Td>
                          <span style={{ 
                            padding: '0.25rem 0.5rem', 
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            backgroundColor: product.status === 'published' ? '#dcfce7' : 
                                           product.status === 'denied' ? '#fee2e2' : '#fef3c7',
                            color: product.status === 'published' ? '#166534' : 
                                   product.status === 'denied' ? '#991b1b' : '#92400e'
                          }}>
                            {product.status?.charAt(0).toUpperCase() + product.status?.slice(1) || 'Pending'}
                          </span>
                        </Td>
                      </TRow>
                    ))
                  ) : (
                    <TRow>
                      <Td colSpan={3}>
                        <NoData>No product data available</NoData>
                      </Td>
                    </TRow>
                  )}
                </tbody>
              </Table>
            </TableSection>

            <TableSection>
              <TableTitle>
                Recent Categories
                <span>Latest category additions</span>
              </TableTitle>
              <Table>
                <thead>
                  <tr>
                    <Th>Name</Th>
                    <Th>Products</Th>
                  </tr>
                </thead>
                <tbody>
                  {recentData.categories.length > 0 ? (
                    recentData.categories.map((category) => (
                      <TRow key={category.id}>
                        <Td>{category.name}</Td>
                        <Td>
                          {(recentData.products.filter(p => p.category_id === category.id)).length}
                        </Td>
                      </TRow>
                    ))
                  ) : (
                    <TRow>
                      <Td colSpan={2}>
                        <NoData>No category data available</NoData>
                      </Td>
                    </TRow>
                  )}
                </tbody>
              </Table>
            </TableSection>
          </TablesGrid>
        </>
      )}
    </DashboardContainer>
  );
};

export default AdminDashboard;