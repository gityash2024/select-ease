import React, { useState, useEffect } from 'react';
import { Users, Package, List, Copy } from 'lucide-react';
import styled from 'styled-components';
import adminAPI from './adminApi';
import toast from 'react-hot-toast';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

const StatCard = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
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

const TableSection = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
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
    categories: 0
  });
  const [recentData, setRecentData] = useState({
    users: [],
    products: [],
    categories: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [usersResponse, productsResponse, categoriesResponse] = await Promise.all([
        adminAPI.users.getAll(),
        adminAPI.products.getAll(),
        adminAPI.categories.getAll()
      ]);

      setStats({
        users: usersResponse.data?.users.length,
        products: productsResponse?.data?.products.length,
        categories: categoriesResponse.data.length
      });

      setRecentData({
        users: usersResponse.data?.users.slice(0, 5),
        products: productsResponse.data?.products.slice(0, 5),
        categories: categoriesResponse.data.slice(0, 5)
      });
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <DashboardContainer>
      <StatsGrid>
        <StatCard>
          <IconWrapper color="#026283">
            <Users size={24} />
          </IconWrapper>
          <StatInfo>
            <h3>{stats.users}</h3>
            <p>Total Users</p>
          </StatInfo>
        </StatCard>
        <StatCard>
          <IconWrapper color="#10b981">
            <Package size={24} />
          </IconWrapper>
          <StatInfo>
            <h3>{stats.products}</h3>
            <p>Total Products</p>
          </StatInfo>
        </StatCard>
        <StatCard>
          <IconWrapper color="#8b5cf6">
            <List size={24} />
          </IconWrapper>
          <StatInfo>
            <h3>{stats.categories}</h3>
            <p>Total Categories</p>
          </StatInfo>
        </StatCard>
      </StatsGrid>

      <ChartsGrid>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[
            { name: 'Users', value: stats.users },
            { name: 'Products', value: stats.products },
            { name: 'Categories', value: stats.categories }
          ]}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={[
            { name: 'Users', value: stats.users },
            { name: 'Products', value: stats.products },
            { name: 'Categories', value: stats.categories }
          ]}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </ChartsGrid>

      <TablesGrid>
        <TableSection>
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

        <TableSection>
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

        <TableSection>
          <TableTitle>Recent Categories</TableTitle>
          <Table>
            <thead>
              <tr>
                <Th>Name</Th>
              </tr>
            </thead>
            <tbody>
              {recentData.categories.length > 0 ? (
                recentData.categories.map((category) => (
                  <tr key={category.id}>
                    <Td>{category.name}</Td>
                  </tr>
                ))
              ) : (
                <tr>
                  <Td>
                    <NoData>No data</NoData>
                  </Td>
                </tr>
              )}
            </tbody>
          </Table>
        </TableSection>
      </TablesGrid>
    </DashboardContainer>
  );
};

export default AdminDashboard;  