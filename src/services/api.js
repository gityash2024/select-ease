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
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const productAPI = {
  getAllProducts: () => axiosInstance.get('/products'),
  getProductById: (id) => axiosInstance.get(`/products/${id}`),
  createProduct: (data) => axiosInstance.post('/products', data),
  updateProduct: (id, data) => axiosInstance.put(`/products/${id}`, data),
  deleteProduct: (id) => axiosInstance.delete(`/products/${id}`),
};
  
export const categoryAPI = {
  getAllCategories: () => axiosInstance.get('/categories'),
  getCategoryById: (id) => axiosInstance.get(`/categories/${id}`),
};

// Auth API calls
export const authAPI = {
  login: (data) => axiosInstance.post('/auth/login', data),
  signup: (data) => axiosInstance.post('/auth/signup', data),
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
  getAllReviews: () => axiosInstance.get('/reviews'),
  getReviewById: (id) => axiosInstance.get(`/reviews/${id}`),
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