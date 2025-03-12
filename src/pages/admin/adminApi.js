import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const adminAPI = {
  admin: {
    login: (data) => axios.post(`${API_URL}/auth/login`, data),
    signup: (data) => axios.post(`${API_URL}/auth/signup`, data),
    getStats: () => axios.get(`${API_URL}/admin/stats`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
  },
  
  users: {
    getAll: () => axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    getById: (id) => axios.get(`${API_URL}/users/${id}`, {
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
    getAll: () => axios.get(`${API_URL}/products`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    create: (data) => axios.post(`${API_URL}/products`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    update: (id, data) => axios.put(`${API_URL}/products/${id}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    delete: (id) => axios.delete(`${API_URL}/products/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
  },
};

export default adminAPI;