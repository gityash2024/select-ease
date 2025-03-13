// src/services/api.js
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance with custom config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
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

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error('Please Login to continue.');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Don't redirect from here to prevent infinite loops
    }
    return Promise.reject(error);
  }
);

export const productAPI = {
  getAllProducts: (page = 1, limit = 10, filters = {}) => {
    const params = { page, limit, ...filters };
    return axiosInstance.get('/products', { params });
  },
  getProductById: (id) => axiosInstance.get(`/products/${id}`),
  createProduct: (data) => axiosInstance.post('/products', data),
  updateProduct: (id, data) => axiosInstance.put(`/products/${id}`, data),
  deleteProduct: (id) => axiosInstance.delete(`/products/${id}`),
  compareProducts: (productIds) => axiosInstance.post('/products/compare', { productIds }),
  uploadImage: (formData) => {
    return axiosInstance.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};
  
export const categoryAPI = {
  getAllCategories: () => axiosInstance.get('/categories'),
  getCategoryById: (id) => axiosInstance.get(`/categories/${id}`),
  createCategory: (data) => axiosInstance.post('/categories', data),
  updateCategory: (id, data) => axiosInstance.put(`/categories/${id}`, data),
  deleteCategory: (id) => axiosInstance.delete(`/categories/${id}`),
};

// Auth API calls
export const authAPI = {
  login: (data) => axiosInstance.post('/auth/login', data),
  signup: (data) => axiosInstance.post('/auth/signup', data),
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Blog API calls
export const blogAPI = {
  getAllBlogs: () => axiosInstance.get('/blogs'),
  getBlogById: (id) => axiosInstance.get(`/blogs/${id}`),
  createBlog: (data) => axiosInstance.post('/blogs', data),
  updateBlog: (id, data) => axiosInstance.put(`/blogs/${id}`, data),
  deleteBlog: (id) => axiosInstance.delete(`/blogs/${id}`),
};

// Review API calls
export const reviewAPI = {
  getAllReviews: (productId) => {
    const params = productId ? { productId } : {};
    return axiosInstance.get('/reviews', { params });
  },
  getReviewById: (id) => axiosInstance.get(`/reviews/${id}`),
  getProductReviews: (productId) => axiosInstance.get(`/products/${productId}/reviews`),
  getUserReviews: (userId) => axiosInstance.get(`/user_reviews/${userId || ''}`),
  createReview: (data) => axiosInstance.post('/reviews', data),
  updateReview: (id, data) => axiosInstance.put(`/reviews/${id}`, data),
  deleteReview: (id) => axiosInstance.delete(`/reviews/${id}`),
};

// User API calls
export const userAPI = {
  getAllUsers: () => axiosInstance.get('/users'),
};

export default axiosInstance;