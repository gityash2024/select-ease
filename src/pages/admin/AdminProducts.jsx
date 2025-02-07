import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, NotepadTextDashed } from 'lucide-react';
import styled from 'styled-components';
import  adminAPI  from './adminApi';
import toast from 'react-hot-toast';
import { BsEmojiAngry, BsEmojiAstonishedFill, BsEmojiFrown } from 'react-icons/bs';

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

const StatusSelect = styled.select`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  border: 1px solid #e5e7eb;
  background-color: ${props => 
    props.value === 'published' ? '#dcfce7' :
    props.value === 'pending' ? '#fef3c7' : '#fee2e2'};
  color: ${props => 
    props.value === 'published' ? '#166534' :
    props.value === 'pending' ? '#92400e' : '#991b1b'};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.color || '#ef4444'};
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.2s;

  &:hover {
    color: ${props => props.hoverColor || '#dc2626'};
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

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    status: 'pending'
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await adminAPI.products.getAll();
      setProducts(response.data?.products||[]);
    } catch (error) {
      toast.error('Failed to fetch products');
    }
  };

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
      await adminAPI.products.create(formData);
      toast.success('Product created successfully');
      setIsModalOpen(false);
      setFormData({
        name: '',
        description: '',
        price: '',
        category_id: '',
        status: 'pending'
      });
      fetchProducts();
    } catch (error) {
      toast.error('Failed to create product');
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await adminAPI.products.delete(productId);
        toast.success('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  const handleStatusChange = async (productId, newStatus) => {
    try {
      await adminAPI.products.update(productId, { status: newStatus });
      toast.success('Product status updated successfully');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to update product status');
    }
  };

  return (
    <Container>
      <Header>
        <Title>Products Management</Title>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          Add Product
        </Button>
      </Header>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <Td>{product.name}</Td>
                <Td>{categories.find(c => c.id === product.category_id)?.name || 'N/A'}</Td>
                <Td>${product.price}</Td>
                <Td>
                  <StatusSelect
                    value={product.status}
                    onChange={(e) => handleStatusChange(product.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="published">Published</option>
                    <option value="denied">Denied</option>
                  </StatusSelect>
                </Td>
                <Td>
                  <ActionButton onClick={() => handleDelete(product.id)}>
                    <Trash2 size={20} />
                  </ActionButton>
                </Td>
              </tr>
            ))}
            {!products.length && (
              <tr style={{ textAlign: 'center' }} >
                <Td colSpan="5">  No products found</Td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableContainer>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <h2>Add New Product</h2>
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
              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Price</Label>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Category</Label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                <Button type="button" onClick={() => setIsModalOpen(false)} style={{ backgroundColor: '#6b7280' }}>
                  Cancel
                </Button>
                <Button type="submit">
                  Add Product
                </Button>
              </div>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default AdminProducts;