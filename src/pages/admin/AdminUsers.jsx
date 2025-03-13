import React, { useState, useEffect } from 'react';
import { UserPlus, Trash2, CopyIcon } from 'lucide-react';
import styled from 'styled-components';
import adminAPI from './adminApi';
import toast from 'react-hot-toast';

const Container = styled.div`
  padding: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #111827;
  font-weight: 600;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #026283;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #015272;
  }
`;

const TableContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem 1.5rem;
  background-color: #f9fafb;
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

const Badge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${props => props.type === 'admin' ? '#dcfce7' : '#def2fe'};
  color: ${props => props.type === 'admin' ? '#166534' : '#1d4ed8'};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #dc2626;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 32rem;
`;

const ConfirmModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  width: 100%;
  max-width: 24rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ConfirmModalHeader = styled.h3`
  font-size: 1.25rem;
  color: #111827;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ConfirmModalText = styled.p`
  color: #4b5563;
  margin-bottom: 1.5rem;
`;

const ConfirmModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const CancelButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  background-color: #f3f4f6;
  color: #374151;
  border: none;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  background-color: #ef4444;
  color: white;
  border: none;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #dc2626;
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
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #026283;
    box-shadow: 0 0 0 2px rgba(2, 98, 131, 0.1);
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
`;

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    is_vendor: false,
    is_admin: false
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await adminAPI.users.getAll();
      setUsers(response.data?.users || []);
    } catch (error) {
      toast.error('Failed to fetch users');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminAPI.users.create(formData);
      toast.success('User created successfully');
      setIsModalOpen(false);
      setFormData({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        is_vendor: false,
        is_admin: false
      });
      fetchUsers();
    } catch (error) {
      toast.error('Failed to create user');
    }
  };

  const formatDateAndTime = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    const formattedTime = new Date(date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    return `${formattedDate} at ${formattedTime}`;
  };

  const openDeleteConfirmation = (userId) => {
    setUserToDelete(userId);
    setIsConfirmModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await adminAPI.users.delete(userToDelete);
      toast.success('User deleted successfully');
      fetchUsers();
      setIsConfirmModalOpen(false);
      setUserToDelete(null);
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <Container>
      <Header>
        <Title>Users Management</Title>
        <AddButton onClick={() => setIsModalOpen(true)}>
          <UserPlus size={20} />
          Add User
        </AddButton>
      </Header>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Created At</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <Td>{user.username || '--'}</Td>
                <Td>
                  {user.email || '--'}
                  <CopyIcon 
                    style={{ cursor: 'pointer', marginLeft: '5px' }} 
                    onClick={() => copyToClipboard(user.email)} 
                    size={16} 
                  />
                </Td>
                <Td>
                  <Badge type={user.is_admin ? 'admin' : 'vendor'}>
                    {user.is_admin ? 'Admin' : 'Vendor'}
                  </Badge>
                </Td>
                <Td>{formatDateAndTime(user.createdAt) || '--'}</Td>
                <Td>
                  <ActionButton onClick={() => openDeleteConfirmation(user.id)}>
                    <Trash2 size={20} />
                  </ActionButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <h2>Add New User</h2>
              <button onClick={() => setIsModalOpen(false)}>×</button>
            </ModalHeader>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Username</Label>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Last Name</Label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <CheckboxGroup>
                <label>
                  <input
                    type="checkbox"
                    name="is_vendor"
                    checked={formData.is_vendor}
                    onChange={handleInputChange}
                  />
                  Vendor
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="is_admin"
                    checked={formData.is_admin}
                    onChange={handleInputChange}
                  />
                  Admin
                </label>
              </CheckboxGroup>
              <ModalFooter>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '0.5rem 1rem' }}
                >
                  Cancel
                </button>
                <AddButton type="submit">
                  Add User
                </AddButton>
              </ModalFooter>
            </Form>
          </ModalContent>
        </Modal>
      )}

      {isConfirmModalOpen && (
        <Modal>
          <ConfirmModalContent>
            <ConfirmModalHeader>Delete User</ConfirmModalHeader>
            <ConfirmModalText>
              Are you sure you want to delete this user? This action cannot be undone.
            </ConfirmModalText>
            <ConfirmModalFooter>
              <CancelButton onClick={() => setIsConfirmModalOpen(false)}>
                Cancel
              </CancelButton>
              <DeleteButton onClick={handleDelete}>
                Delete
              </DeleteButton>
            </ConfirmModalFooter>
          </ConfirmModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default AdminUsers;