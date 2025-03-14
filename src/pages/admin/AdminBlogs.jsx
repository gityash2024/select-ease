import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Plus, Edit, Trash, Search, Book, Clock, User, X, Image, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const API_URL = 'https://select-ease-backend-1.onrender.com/api';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
};

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #111827;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #026283;
  color: white;
  border: none;
  
  &:hover {
    background-color: #015272;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  background-color: white;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 0.5rem;
  outline: none;
  font-size: 0.95rem;
`;

const SearchIcon = styled(Search)`
  color: #6b7280;
`;

const BlogsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const BlogCard = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const BlogContent = styled.div`
  padding: 1.25rem;
`;

const BlogTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: #111827;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  font-size: 0.85rem;
  color: #6b7280;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const BlogDescription = styled.p`
  margin: 0 0 1.25rem 0;
  color: #374151;
  font-size: 0.95rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BlogActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ActionButtonSmall = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.edit {
    background-color: #f3f4f6;
    color: #1f2937;
    border: 1px solid #e5e7eb;
    
    &:hover {
      background-color: #e5e7eb;
    }
  }
  
  &.delete {
    background-color: #fef2f2;
    color: #ef4444;
    border: 1px solid #fee2e2;
    
    &:hover {
      background-color: #fee2e2;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const EmptyStateTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #111827;
`;

const EmptyStateDescription = styled.p`
  color: #6b7280;
  margin-bottom: 1.5rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  background-color: ${props => props.active ? '#026283' : 'white'};
  color: ${props => props.active ? 'white' : '#374151'};
  cursor: pointer;
  
  &:hover:not(:disabled) {
    background-color: ${props => props.active ? '#015272' : '#f3f4f6'};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const ModalOverlay = styled(motion.div)`
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
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: #111827;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: #111827;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
  overflow-x: hidden;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.95rem;
  width: 100%;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #026283;
    box-shadow: 0 0 0 2px rgba(2, 98, 131, 0.1);
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.95rem;
  width: 100%;
  resize: vertical;
  min-height: 120px;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #026283;
    box-shadow: 0 0 0 2px rgba(2, 98, 131, 0.1);
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  background-color: #f9fafb;
`;

const CancelButton = styled.button`
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: white;
  color: #374151;
  border: 1px solid #d1d5db;
  
  &:hover {
    background-color: #f3f4f6;
  }
`;

const SaveButton = styled.button`
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #026283;
  color: white;
  border: none;
  
  &:hover {
    background-color: #015272;
  }
  
  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const ConfirmDialog = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  padding: 1.5rem;
`;

const ConfirmTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: #111827;
`;

const ConfirmText = styled.p`
  margin: 0 0 1.5rem 0;
  color: #6b7280;
`;

const ConfirmButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    image_url: '',
    summary: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  
  useEffect(() => {
    fetchBlogs();
  }, []);
  
  useEffect(() => {
    if (searchTerm) {
      const filtered = blogs.filter(blog => 
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs);
    }
    setCurrentPage(1);
  }, [searchTerm, blogs]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/blogs`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (response.data && response.data.blogs) {
        setBlogs(response.data.blogs);
        setFilteredBlogs(response.data.blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blogs');
    }
  };
  
  const handleOpenModal = (blog = null) => {
    if (blog) {
      setCurrentBlog(blog);
      setFormData({
        title: blog.title || '',
        author: blog.author || '',
        content: blog.content || '',
        image_url: blog.image_url || '',
        summary: blog.summary || ''
      });
    } else {
      setCurrentBlog(null);
      setFormData({
        title: '',
        author: '',
        content: '',
        image_url: '',
        summary: ''
      });
    }
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setCurrentBlog(null);
      setFormData({
        title: '',
        author: '',
        content: '',
        image_url: '',
        summary: ''
      });
    }, 300);
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
    if (!formData.title || !formData.content) {
      toast.error('Title and content are required');
      return;
    }
    
    setIsSubmitting(true);
    try {
      if (currentBlog) {
        await axios.put(
          `${API_URL}/blogs/${currentBlog.id}`,
          formData,
          { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } }
        );
        toast.success('Blog updated successfully');
      } else {
        await axios.post(
          `${API_URL}/blogs`,
          formData,
          { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } }
        );
        toast.success('Blog created successfully');
      }
      
      handleCloseModal();
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error(error.response?.data?.message || 'Failed to save blog');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleOpenConfirm = (blog) => {
    setCurrentBlog(blog);
    setIsConfirmOpen(true);
  };
  
  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
    setTimeout(() => setCurrentBlog(null), 300);
  };
  
  const handleDelete = async () => {
    if (!currentBlog) return;
    
    try {
      await axios.delete(
        `${API_URL}/blogs/${currentBlog.id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } }
      );
      toast.success('Blog deleted successfully');
      handleCloseConfirm();
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
    }
  };
  
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <PageHeader>
        <Title><Book size={24} /> Manage Blogs</Title>
        <ActionButton onClick={() => handleOpenModal()}>
          <Plus size={18} /> Add New Blog
        </ActionButton>
      </PageHeader>
      
      <SearchContainer>
        <SearchIcon size={20} />
        <SearchInput 
          type="text" 
          placeholder="Search blogs..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
      
      {currentBlogs.length > 0 ? (
        <>
          <BlogsGrid
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            initial="hidden"
            animate="visible"
          >
            {currentBlogs.map(blog => (
              <BlogCard key={blog.id} variants={fadeIn}>
                <BlogImage 
                  src={blog.image_url || 'https://via.placeholder.com/300x180?text=Blog+Image'} 
                  alt={blog.title} 
                />
                <BlogContent>
                  <BlogTitle>{blog.title}</BlogTitle>
                  <BlogMeta>
                    <MetaItem>
                      <Clock size={14} />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </MetaItem>
                    <MetaItem>
                      <User size={14} />
                      {blog.author || 'Admin'}
                    </MetaItem>
                  </BlogMeta>
                  <BlogDescription>
                    {blog.summary || blog.content?.substring(0, 120) + '...'}
                  </BlogDescription>
                  <BlogActions>
                    <ActionButtonSmall 
                      className="edit"
                      onClick={() => handleOpenModal(blog)}
                    >
                      <Edit size={16} /> Edit
                    </ActionButtonSmall>
                    <ActionButtonSmall 
                      className="delete"
                      onClick={() => handleOpenConfirm(blog)}
                    >
                      <Trash size={16} /> Delete
                    </ActionButtonSmall>
                  </BlogActions>
                </BlogContent>
              </BlogCard>
            ))}
          </BlogsGrid>
          
          {totalPages > 1 && (
            <Pagination>
              <PaginationButton 
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </PaginationButton>
              
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationButton
                  key={index}
                  active={currentPage === index + 1}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </PaginationButton>
              ))}
              
              <PaginationButton 
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </PaginationButton>
            </Pagination>
          )}
        </>
      ) : (
        <EmptyState>
          <EmptyStateTitle>No blogs found</EmptyStateTitle>
          <EmptyStateDescription>
            {searchTerm 
              ? `No blogs matching "${searchTerm}". Try a different search term or clear the search.`
              : 'Get started by creating your first blog post.'}
          </EmptyStateDescription>
          <ActionButton onClick={() => handleOpenModal()}>
            <Plus size={18} /> Create Your First Blog
          </ActionButton>
        </EmptyState>
      )}
      
      <AnimatePresence>
        {isModalOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ModalHeader>
                <ModalTitle>{currentBlog ? 'Edit Blog' : 'Add New Blog'}</ModalTitle>
                <CloseButton onClick={handleCloseModal}>
                  <X size={24} />
                </CloseButton>
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label><Book size={16} /> Blog Title</Label>
                    <Input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter blog title"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label><User size={16} /> Author</Label>
                    <Input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="Enter author name"
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label><Image size={16} /> Image URL</Label>
                    <Input
                      type="text"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleInputChange}
                      placeholder="Enter image URL"
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label><LinkIcon size={16} /> Summary</Label>
                    <Textarea
                      name="summary"
                      value={formData.summary}
                      onChange={handleInputChange}
                      placeholder="Enter a short summary of the blog post"
                      rows={2}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label><Book size={16} /> Content</Label>
                    <Textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Enter blog content"
                      rows={8}
                      required
                    />
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <CancelButton type="button" onClick={handleCloseModal}>
                  Cancel
                </CancelButton>
                <SaveButton type="button" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : (currentBlog ? 'Update Blog' : 'Create Blog')}
                </SaveButton>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isConfirmOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ConfirmDialog
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ConfirmTitle>Delete Blog</ConfirmTitle>
              <ConfirmText>
                Are you sure you want to delete "{currentBlog?.title}"? This action cannot be undone.
              </ConfirmText>
              <ConfirmButtons>
                <CancelButton onClick={handleCloseConfirm}>
                  Cancel
                </CancelButton>
                <ActionButtonSmall 
                  className="delete" 
                  onClick={handleDelete}
                  style={{ backgroundColor: '#ef4444', color: 'white', borderColor: '#ef4444' }}
                >
                  <Trash size={16} /> Delete
                </ActionButtonSmall>
              </ConfirmButtons>
            </ConfirmDialog>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminBlogs;