import React, { useState, useEffect } from 'react';
import { Users, Package, List, Copy, Layers, Book } from 'lucide-react';
import styled from 'styled-components';
import adminAPI from './adminApi';
import toast from 'react-hot-toast';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { motion } from 'framer-motion';

const API_URL = 'http://localhost:3000/api';

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
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color};
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

const TableSection = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const TableTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  padding: 1.5rem;
  margin: 0;
  border-bottom: 1px solid #e5e7eb;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
`;

const Td = styled.td`
  padding: 1rem 1.5rem;
  color: #111827;
  border-bottom: 1px solid #e5e7eb;
`;

const TablesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
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
  padding: 1rem 1.5rem;
  color: #6b7280;
  text-align: center;
`;

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
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch all data in parallel
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

      // Update stats
      setStats({
        users: usersResponse.data?.users?.length || 0,
        products: productsResponse.data?.products?.length || 0,
        categories: categoriesResponse.data?.length || 0,
        blogs: blogsResponse.data?.blogs?.length || 0
      });

      // Update recent data
      setRecentData({
        users: usersResponse.data?.users?.slice(0, 5) || [],
        products: productsResponse.data?.products?.slice(0, 5) || [],
        categories: categoriesResponse.data?.slice(0, 5) || [],
        blogs: blogsResponse.data?.blogs?.slice(0, 5) || []
      });

      // Set up random product comparison (select 3 random products)
      const allProducts = productsResponse.data?.products || [];
      if (allProducts.length > 2) {
        const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
        setComparisonProducts(shuffled.slice(0, 3));
      }

      // Generate simulated sales data based on products
      const lastSixMonths = [];
      const currentDate = new Date();
      for (let i = 5; i >= 0; i--) {
        const month = new Date(currentDate);
        month.setMonth(currentDate.getMonth() - i);
        const monthName = month.toLocaleString('default', { month: 'short' });
        
        // Simulate some sales data based on the number of products
        const productCount = productsResponse.data?.products?.length || 0;
        const randomMultiplier = Math.floor(Math.random() * 5) + 1;
        const sales = productCount * randomMultiplier;
        
        lastSixMonths.push({
          name: monthName,
          sales: sales
        });
      }
      setSalesData(lastSixMonths);

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
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <TableSection>
                <TableTitle>Sales Overview</TableTitle>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#026283" />
                  </BarChart>
                </ResponsiveContainer>
              </TableSection>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <TableSection>
                <TableTitle>Data Summary</TableTitle>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { name: 'Users', value: stats.users },
                    { name: 'Products', value: stats.products },
                    { name: 'Categories', value: stats.categories },
                    { name: 'Blogs', value: stats.blogs }
                  ]}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#026283" strokeWidth={2} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </TableSection>
            </motion.div>
          </ChartsGrid>

          {comparisonProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <TableSection>
                <TableTitle>Product Comparison Spotlight</TableTitle>
                <Table>
                  <thead>
                    <tr>
                      <Th>Feature</Th>
                      {comparisonProducts.map(product => (
                        <Th key={product.id}>{product.name}</Th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <FeatureCell>Price</FeatureCell>
                      {comparisonProducts.map(product => (
                        <Td key={product.id}>${product.price}</Td>
                      ))}
                    </tr>
                    <tr>
                      <FeatureCell>Category</FeatureCell>
                      {comparisonProducts.map(product => (
                        <Td key={product.id}>{product.category?.name || 'N/A'}</Td>
                      ))}
                    </tr>
                    <tr>
                      <FeatureCell>Description</FeatureCell>
                      {comparisonProducts.map(product => (
                        <Td key={product.id}>{product.description || 'No description available'}</Td>
                      ))}
                    </tr>
                  </tbody>
                </Table>
              </TableSection>
            </motion.div>
          )}

          <TablesGrid>
            <TableSection
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <TableTitle>Recent Users</TableTitle>
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
                      <tr key={user.id}>
                        <Td>{user.username}</Td>
                        <Td>
                          {user.email}
                          <CopyIcon onClick={() => copyToClipboard(user.email)} size={16} />
                        </Td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <Td colSpan={2}>
                        <NoData>No data</NoData>
                      </Td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </TableSection>

            <TableSection
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <TableTitle>Recent Products</TableTitle>
              <Table>
                <thead>
                  <tr>
                    <Th>Name</Th>
                    <Th>Price</Th>
                  </tr>
                </thead>
                <tbody>
                  {recentData.products.length > 0 ? (
                    recentData.products.map((product) => (
                      <tr key={product.id}>
                        <Td>{product.name}</Td>
                        <Td>${product.price}</Td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <Td colSpan={2}>
                        <NoData>No data</NoData>
                      </Td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </TableSection>

            <TableSection
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <TableTitle>Recent Blogs</TableTitle>
              <Table>
                <thead>
                  <tr>
                    <Th>Title</Th>
                    <Th>Author</Th>
                  </tr>
                </thead>
                <tbody>
                  {recentData.blogs.length > 0 ? (
                    recentData.blogs.map((blog) => (
                      <tr key={blog.id}>
                        <Td>{blog.title}</Td>
                        <Td>{blog.author || 'Unknown'}</Td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <Td colSpan={2}>
                        <NoData>No data</NoData>
                      </Td>
                    </tr>
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