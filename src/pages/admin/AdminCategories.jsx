import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
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

const Button = styled.button`
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

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0.25rem;
  color: ${props => props.color || '#6b7280'};
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${props => props.hoverColor || '#374151'};
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

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #026283;
    box-shadow: 0 0 0 2px rgba(2, 98, 131, 0.1);
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.25rem;
  
  &:hover {
    color: #374151;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await adminAPI.categories.getAll();
      setCategories(response.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await adminAPI.categories.update(selectedCategory.id, formData);
        toast.success('Category updated successfully');
      } else {
        await adminAPI.categories.create(formData);
        toast.success('Category created successfully');
      }
      closeModal();
      fetchCategories();
    } catch (error) {
      toast.error(isEditMode ? 'Failed to update category' : 'Failed to create category');
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const openDeleteConfirmation = (category) => {
    setCategoryToDelete(category);
    setIsConfirmModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await adminAPI.categories.delete(categoryToDelete.id);
      toast.success('Category deleted successfully');
      setIsConfirmModalOpen(false);
      setCategoryToDelete(null);
      fetchCategories();
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  const formatDateAndTime = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    const formattedTime = new Date(date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    return `${formattedDate} at ${formattedTime}`
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedCategory(null);
    setFormData({ name: '' });
  };

  return (
    <Container>
      <Header>
        <Title>Categories Management</Title>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          Add Category
        </Button>
      </Header>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Created At</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <Td>{category.name}</Td>
                <Td>{formatDateAndTime(category.createdAt) || '-'}</Td>
                <Td>
                  <ActionButtons>
                    <IconButton onClick={() => handleEdit(category)} color="#026283" hoverColor="#015272">
                      <Edit size={20} />
                    </IconButton>
                    <IconButton onClick={() => openDeleteConfirmation(category)} color="#ef4444" hoverColor="#dc2626">
                      <Trash2 size={20} />
                    </IconButton>
                  </ActionButtons>
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
              <h2>{isEditMode ? 'Edit Category' : 'Add New Category'}</h2>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
             
              <ButtonGroup>
                <Button type="button" onClick={closeModal} style={{ backgroundColor: '#6b7280' }}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditMode ? 'Update Category' : 'Add Category'}
                </Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}

      {isConfirmModalOpen && (
        <Modal>
          <ConfirmModalContent>
            <ConfirmModalHeader>Delete Category</ConfirmModalHeader>
            <ConfirmModalText>
              Are you sure you want to delete "{categoryToDelete?.name}"? This action cannot be undone.
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

export default AdminCategories;