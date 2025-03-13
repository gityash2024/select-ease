import React from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Package, List, LogOut, BookAIcon } from 'lucide-react';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { MdReviews } from 'react-icons/md';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f3f4f6;
`;

const Sidebar = styled.aside`
  width: 280px;
  background-color: #026283;
  color: white;
  position: fixed;
  height: 100vh;
  padding: 1.5rem 0;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.div`
  padding: 0 1.5rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1.5rem;

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
  }
`;

const NavLinks = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const NavLink = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem 1.5rem;
  color: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.8)'};
  background-color: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }

  svg {
    margin-right: 1rem;
  }
`;

const LogoutButton = styled(NavLink)`
  color: #ff6b6b;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto;

  &:hover {
    background-color: rgba(255, 99, 99, 0.1);
    color: #ff8787;
  }
`;

const Content = styled.main`
  margin-left: 280px;
  flex: 1;
  padding: 2rem;
  background-color: #f3f4f6;
`;

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: List, label: 'Categories', path: '/admin/categories' },
    { icon: BookAIcon, label: 'Blogs', path: '/admin/blogs' },
  ];

  return (
    <Container>
      <Sidebar>
        <SidebarHeader>
          <h1>Admin Panel</h1>
        </SidebarHeader>
        <NavLinks>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              onClick={() => navigate(item.path)}
              active={location.pathname === item.path}
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </NavLinks>
        <LogoutButton onClick={handleLogout}>
          <LogOut size={20} />
          Logout
        </LogoutButton>
      </Sidebar>
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
};

export default AdminLayout;