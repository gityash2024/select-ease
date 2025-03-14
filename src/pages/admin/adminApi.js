import axios from 'axios';

const API_URL = 'https://select-ease-backend-1.onrender.com/api';

const adminAPI = {
  admin: {
    login: (data) => axios.post(`${API_URL}/auth/login`, data),
    signup: (data) => axios.post(`${API_URL}/auth/signup`, data),
    getStats: () => axios.get(`${API_URL}/admin/stats`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    getCurrentUser: () => {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    },
    isAuthenticated: () => {
      return !!localStorage.getItem('adminToken');
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
      localStorage.removeItem('adminToken');
      localStorage.removeItem('user');
    }
  },
  
  users: {
    getAll: (page = 1, limit = 10) => axios.get(`${API_URL}/users`, {
      params: { page, limit },
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    getById: (id) => axios.get(`${API_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    update: (id, data) => axios.put(`${API_URL}/users/${id}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    delete: (id) => axios.delete(`${API_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
  },

  categories: {
    getAll: () => axios.get(`${API_URL}/categories`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    getById: (id) => axios.get(`${API_URL}/categories/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    create: (data) => axios.post(`${API_URL}/categories`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    update: (id, data) => axios.put(`${API_URL}/categories/${id}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    delete: (id) => axios.delete(`${API_URL}/categories/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
  },

  products: {
    getAll: (page = 1, limit = 10) => axios.get(`${API_URL}/products`, {
      params: { page, limit },
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    getById: (id) => axios.get(`${API_URL}/products/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    create: (data) => axios.post(`${API_URL}/products`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    update: (id, data) => axios.put(`${API_URL}/products/${id}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    updateStatus: (id, status) => axios.put(`${API_URL}/admin/products/${id}/status`, { status }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    delete: (id) => axios.delete(`${API_URL}/products/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    uploadImage: (formData) => axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
      }
    })
  },

  reviews: {
    getAll: () => axios.get(`${API_URL}/reviews`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    getById: (id) => axios.get(`${API_URL}/reviews/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    delete: (id) => axios.delete(`${API_URL}/reviews/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    })
  },

  blogs: {
    getAll: () => axios.get(`${API_URL}/blogs`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    getById: (id) => axios.get(`${API_URL}/blogs/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    create: (data) => axios.post(`${API_URL}/blogs`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    update: (id, data) => axios.put(`${API_URL}/blogs/${id}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    delete: (id) => axios.delete(`${API_URL}/blogs/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    })
  },

  dashboard: {
    getStats: () => axios.get(`${API_URL}/admin/dashboard/stats`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    })
  }
};

export default adminAPI;