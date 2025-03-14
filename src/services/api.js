import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE_URL = 'https://select-ease-backend-1.onrender.com/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error('Please Login to continue.');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export const productAPI = {
  getAllProducts: (page = 1, limit = 10, filters = {}) => {
    const params = { page, limit, ...filters };
    return axiosInstance.get('/products', { 
      params,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  },
  getProductById: (id) => axiosInstance.get(`/products/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),
  createProduct: (data) => axiosInstance.post('/products', data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),
  updateProduct: (id, data) => axiosInstance.put(`/products/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),
  deleteProduct: (id) => axiosInstance.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),
  compareProducts: (productIds) => axiosInstance.post('/products/compare', { productIds }, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),
  uploadImage: (formData) => {
    return axiosInstance.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
};
  
export const categoryAPI = {
  getAllCategories: () => axiosInstance.get('/categories', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),
  getCategoryById: (id) => axiosInstance.get(`/categories/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),
  createCategory: (data) => axiosInstance.post('/categories', data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),
  updateCategory: (id, data) => axiosInstance.put(`/categories/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),
  deleteCategory: (id) => axiosInstance.delete(`/categories/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),
};

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

export const blogAPI = {
  getAllBlogs: () => axiosInstance.get('/blogs', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),
  getBlogById: (id) => axiosInstance.get(`/blogs/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),
  createBlog: (data) => axiosInstance.post('/blogs', data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),
  updateBlog: (id, data) => axiosInstance.put(`/blogs/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),
  deleteBlog: (id) => axiosInstance.delete(`/blogs/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),
};

export const reviewAPI = {
  getAllReviews: (productId) => {
    const params = productId ? { productId } : {};
    return axiosInstance.get('/reviews', { 
      params,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  },
  getReviewById: (id) => axiosInstance.get(`/reviews/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),
  getProductReviews: (productId) => axiosInstance.get(`/products/${productId}/reviews`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),
  getUserReviews: (userId) => axiosInstance.get(`/user_reviews/${userId || ''}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),
  createReview: (data) => axiosInstance.post('/reviews', data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),
  updateReview: (id, data) => axiosInstance.put(`/reviews/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),
  deleteReview: (id) => axiosInstance.delete(`/reviews/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),
};

export const userAPI = {
  getAllUsers: () => axiosInstance.get('/users', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),
  deleteUser: (id) => axiosInstance.delete(`/users/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }),
};

export default axiosInstance;