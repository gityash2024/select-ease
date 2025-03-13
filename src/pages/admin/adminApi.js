import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance with custom config
const adminAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
adminAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
adminAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error('Your session has expired. Please login again.');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    } else if (error.response?.status === 403) {
      toast.error('You do not have permission to perform this action');
    }
    return Promise.reject(error);
  }
);

// Products API
const products = {
  getAll: (page = 1, limit = 10) => 
    adminAxios.get('/admin/products', { params: { page, limit } }),
  
  getById: (id) => 
    adminAxios.get(`/products/${id}`),
  
  create: (data) => 
    adminAxios.post('/products', data),
  
  update: (id, data) => 
    adminAxios.put(`/admin/products/${id}`, data),
  
  updateStatus: (id, status) => 
    adminAxios.put(`/admin/products/${id}/status`, { status }),
  
  delete: (id) => 
    adminAxios.delete(`/products/${id}`),
  
  uploadImage: (formData) => 
    adminAxios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
};

// Categories API
const categories = {
  getAll: () => 
    adminAxios.get('/categories'),
  
  getById: (id) => 
    adminAxios.get(`/categories/${id}`),
  
  create: (data) => 
    adminAxios.post('/categories', data),
  
  update: (id, data) => 
    adminAxios.put(`/categories/${id}`, data),
  
  delete: (id) => 
    adminAxios.delete(`/categories/${id}`)
};

// Users API
const users = {
  getAll: () => 
    adminAxios.get('/users'),
  
  getById: (id) => 
    adminAxios.get(`/users/${id}`),
  
  update: (id, data) => 
    adminAxios.put(`/users/${id}`, data),
  
  delete: (id) => 
    adminAxios.delete(`/users/${id}`)
};

// Reviews API
const reviews = {
  getAll: () => 
    adminAxios.get('/reviews'),
  
  getById: (id) => 
    adminAxios.get(`/reviews/${id}`),
  
  delete: (id) => 
    adminAxios.delete(`/reviews/${id}`)
};

// Blogs API
const blogs = {
  getAll: () => 
    adminAxios.get('/blogs'),
  
  getById: (id) => 
    adminAxios.get(`/blogs/${id}`),
  
  create: (data) => 
    adminAxios.post('/blogs', data),
  
  update: (id, data) => 
    adminAxios.put(`/blogs/${id}`, data),
  
  delete: (id) => 
    adminAxios.delete(`/blogs/${id}`)
};

// Auth API
const auth = {
  login: (credentials) => 
    adminAxios.post('/auth/login', credentials),
  
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  
  isAdmin: () => {
    const user = localStorage.getItem('user');
    if (!user) return false;
    
    try {
      const userData = JSON.parse(user);
      return userData.is_admin === true;
    } catch (error) {
      return false;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Dashboard statistics
const dashboard = {
  getStats: () => 
    adminAxios.get('/admin/dashboard/stats')
};

export default {
  products,
  categories,
  users,
  reviews,
  blogs,
  auth,
  dashboard
};