import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Common Components
import WhatsAppButton from './components/common/WhatsAppButton';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ManageAbout from './pages/admin/ManageAbout';
import ManageSkills from './pages/admin/ManageSkills';
import ManageProjects from './pages/admin/ManageProjects';
import ManageExperience from './pages/admin/ManageExperience';
import ManageEducation from './pages/admin/ManageEducation';
import ManageSocial from './pages/admin/ManageSocial';
import Messages from './pages/admin/Messages';
import Settings from './pages/admin/Settings';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#12121f',
                color: '#fff',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '12px',
                fontSize: '13px',
              },
            }}
          />
          <WhatsAppButton phoneNumber="919170845849" />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Admin Auth Route */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/about" element={<ManageAbout />} />
              <Route path="/admin/skills" element={<ManageSkills />} />
              <Route path="/admin/projects" element={<ManageProjects />} />
              <Route path="/admin/experience" element={<ManageExperience />} />
              <Route path="/admin/education" element={<ManageEducation />} />
              <Route path="/admin/social" element={<ManageSocial />} />
              <Route path="/admin/messages" element={<Messages />} />
              <Route path="/admin/settings" element={<Settings />} />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
