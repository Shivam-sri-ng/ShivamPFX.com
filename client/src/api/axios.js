import axios from 'axios';

const API = axios.create({
  // In production (Vercel), use the deployed backend URL via env variable
  // In local dev, Vite proxy handles /api → http://localhost:5000/api
  baseURL: import.meta.env.VITE_API_URL || '/api',
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
