import axios from 'axios';

// Normalize API base URL — always ensures it ends with /api
// Works whether VITE_API_URL is set with or without /api suffix
const rawUrl = import.meta.env.VITE_API_URL || '';
const baseURL = rawUrl
  ? rawUrl.replace(/\/api\/?$/, '') + '/api'   // strip trailing /api then re-add
  : '/api';                                     // local dev — Vite proxy handles it

const API = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT Token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 unauthorized (auto logout)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to admin login if inside admin section
      if (window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/login')) {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
