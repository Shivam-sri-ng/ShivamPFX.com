import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('admin');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAdmin = async () => {
      if (token) {
        try {
          const res = await API.get('/auth/me');
          if (res.data?.data) {
            setAdmin(res.data.data);
            localStorage.setItem('admin', JSON.stringify(res.data.data));
          }
        } catch (err) {
          // If server is 401 unauthorized specifically, log out. If network error, preserve session.
          if (err.response?.status === 401) {
            logout();
          }
        }
      }
      setLoading(false);
    };
    verifyAdmin();
  }, [token]);

  const login = (authData) => {
    setToken(authData.token);
    setAdmin(authData);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('admin', JSON.stringify(authData));
  };

  const logout = () => {
    setToken('');
    setAdmin(null);
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  };

  return (
    <AuthContext.Provider value={{ admin, token, isAuthenticated: !!token, loading, login, logout, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
