import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, User, Lock, ChevronRight, Mail } from 'lucide-react';
import styled from 'styled-components';
import AuthContext from '../../context/AuthContext';
import toast from 'react-hot-toast';
import adminAPI from '../../pages/admin/adminApi';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  padding: 20px;
`;

const LoginContainer = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #111827;
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s ease;

  &:hover {
    color: #111827;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #026283;
    box-shadow: 0 0 0 2px rgba(2, 98, 131, 0.1);
  }
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
  
  & > * {
    flex: 1;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #026283;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #015272;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const ToggleContainer = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #026283;
  font-weight: 500;
  cursor: pointer;
  padding: 0 0.25rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
`;

const ModalContent = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const AdminLogin = () => {
  const navigate = useNavigate();
  const { setIsLoading } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    firstName: '',
    lastName: '',
    confirmPassword: ''
  });
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    // Add animation to fix focus bug on vendor signup
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('blur', (e) => {
        if (e.target.type === 'checkbox') return;
        // Small delay to ensure focus is properly handled
        setTimeout(() => {
          const activeEl = document.activeElement;
          if (activeEl && activeEl.tagName === 'INPUT') {
            // Another input was focused, do nothing
          } else {
            // No input focused, fix the bug
            document.body.focus();
          }
        }, 50);
      });
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return false;
    }
    
    if (!isLogin) {
      if (!formData.username || !formData.firstName || !formData.lastName) {
        toast.error('Please fill in all required fields');
        return false;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (isLogin) {
        const response = await adminAPI.admin.login({
          email: formData.email,
          password: formData.password
        });

        if (response?.data?.token && response?.data?.user) {
          if (response.data.user.is_admin) {
            localStorage.setItem('adminToken', response.data.token);
            localStorage.setItem('adminUser', JSON.stringify(response.data.user));
            
            toast.success('Login successful!');
            
            setTimeout(() => {
              navigate('/admin/dashboard', { replace: true });
            }, 100);
          } else {
            toast.error('Unauthorized access. Admin privileges required.');
          }
        } else {
          toast.error('Invalid response from server');
        }
      } else {
        // For signup, show the confirmation modal
        setShowSignupModal(true);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Operation failed. Please try again.');
      } else if (error.request) {
        toast.error('No response from server. Please try again.');
      } else {
        toast.error('An error occurred. Please try again.');
      }
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const response = await adminAPI.admin.signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        is_admin: true
      });

      if (response?.data?.token && response?.data?.user) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminUser', JSON.stringify(response.data.user));
        
        toast.success('Admin account created successfully!');
        
        setShowSignupModal(false);
        setTimeout(() => {
          navigate('/admin/dashboard', { replace: true });
        }, 100);
      } else {
        toast.error('Invalid response from server');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Signup failed. Please try again.');
      } else if (error.request) {
        toast.error('No response from server. Please try again.');
      } else {
        toast.error('An error occurred. Please try again.');
      }
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <LoginContainer
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Header>
          <h2>{isLogin ? 'Admin Login' : 'Create Admin Account'}</h2>
          <CloseButton onClick={() => navigate('/')}>
            <X size={24} />
          </CloseButton>
        </Header>

        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <FormGroup>
                <Label><User size={16} /> Username</Label>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                  required={!isLogin}
                />
              </FormGroup>
              
              <Row>
                <FormGroup>
                  <Label><User size={16} /> First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First name"
                    required={!isLogin}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label><User size={16} /> Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last name"
                    required={!isLogin}
                  />
                </FormGroup>
              </Row>
            </>
          )}

          <FormGroup>
            <Label><Mail size={16} /> Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter admin email"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label><Lock size={16} /> Password</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              required
            />
          </FormGroup>

          {!isLogin && (
            <FormGroup>
              <Label><Lock size={16} /> Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm password"
                required={!isLogin}
              />
            </FormGroup>
          )}

          <ActionButton type="submit">
            {isLogin ? 'Login' : 'Create Account'}
          </ActionButton>
        </Form>

        <ToggleContainer>
          {isLogin ? "Don't have an admin account?" : "Already have an admin account?"}
          <ToggleButton onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </ToggleButton>
        </ToggleContainer>
      </LoginContainer>

      {showSignupModal && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 style={{ marginTop: 0 }}>Confirm Admin Registration</h3>
            <p>
              You are about to create a new administrator account with full system access. Please confirm this is intended.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              <ActionButton
                style={{ backgroundColor: '#6b7280' }}
                onClick={() => setShowSignupModal(false)}
              >
                Cancel
              </ActionButton>
              <ActionButton onClick={handleSignup}>
                Confirm <ChevronRight size={16} />
              </ActionButton>
            </div>
          </ModalContent>
        </Modal>
      )}
    </PageContainer>
  );
};

export default AdminLogin;