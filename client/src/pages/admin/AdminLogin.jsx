import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiEye, FiEyeOff, FiLogIn, FiShield, FiKey } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@portfolio.com');
  const [password, setPassword] = useState('Admin@12345');
  const [adminKey, setAdminKey] = useState('');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in admin email and password');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      if (res.data.success) {
        login(res.data.data);
        toast.success('Admin authentication successful!');
        navigate('/admin/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminKeyLogin = async (e) => {
    e.preventDefault();
    if (!adminKey) {
      toast.error('Please enter Admin Key');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/auth/admin-key', { adminKey });
      if (res.data.success) {
        login(res.data.data);
        toast.success('LoggedIn with Admin Key!');
        navigate('/admin/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid Admin Key');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090e] flex flex-col items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-md space-y-6 z-10">
        {/* Shield Icon Top Header matching Screenshot 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center text-center space-y-3"
        >
          <div className="relative w-20 h-20 rounded-3xl bg-purple-950/50 border-2 border-purple-500/40 flex items-center justify-center text-purple-400 shadow-2xl shadow-purple-900/50">
            <FiShield size={44} />
            <div className="absolute inset-0 bg-purple-500/10 rounded-3xl blur-md" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Admin <span className="text-purple-400">Login</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            Welcome back! Please login to continue.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-5"
        >
          <form onSubmit={handleAdminLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Admin Email</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-3.5 text-purple-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  className="w-full pl-11 pr-4 py-3 rounded-xl glass-input text-sm text-white placeholder-slate-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-3.5 text-purple-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-11 pr-11 py-3 rounded-xl glass-input text-sm text-white placeholder-slate-500 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center space-x-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-purple-950 border-purple-500/50 text-purple-600 focus:ring-purple-500"
                />
                <span>Remember me</span>
              </label>
              <a href="#" onClick={(e) => { e.preventDefault(); toast('Default admin password is set in .env file'); }} className="text-purple-400 hover:text-purple-300 font-medium">
                Forgot Password?
              </a>
            </div>

            {/* Primary Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-purple-600/40 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <FiLogIn size={18} />
                  <span>Login</span>
                </>
              )}
            </button>
          </form>

          {/* Divider matching Screenshot 2 */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/10" />
            <span className="flex-shrink mx-4 text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
              OR
            </span>
            <div className="flex-grow border-t border-white/10" />
          </div>

          {/* Secondary Admin Key Button matching Screenshot 2 */}
          <button
            type="button"
            onClick={() => setShowKeyModal(true)}
            className="w-full py-3.5 rounded-xl glass-card hover:bg-white/5 border border-white/10 text-white font-semibold text-sm transition-all flex items-center justify-center space-x-2"
          >
            <FiShield size={18} className="text-purple-400" />
            <span>Login with Admin Key</span>
          </button>
        </motion.div>

        {/* Secure Admin Access Alert matching bottom of Screenshot 2 */}
        <div className="flex items-center space-x-3 p-4 rounded-2xl bg-purple-950/30 border border-purple-500/20 text-xs text-slate-300">
          <div className="p-2 rounded-lg bg-purple-900/40 text-purple-400 shrink-0">
            <FiShield size={18} />
          </div>
          <div>
            <p className="font-bold text-white">Secure Admin Access</p>
            <p className="text-slate-400">Only authorized administrators can access this panel.</p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 pt-2">
          © 2024 <span className="text-purple-400 font-medium">Your Portfolio</span>. All rights reserved.
        </p>
      </div>

      {/* Admin Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl p-6 w-full max-w-sm border border-purple-500/30 space-y-4">
            <div className="flex items-center space-x-3 text-purple-400">
              <FiKey size={24} />
              <h3 className="text-lg font-bold text-white">Enter Admin Key</h3>
            </div>
            <p className="text-xs text-slate-400">
              Enter the master secret admin key configured in your server .env file.
            </p>
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="e.g. adminkey123"
              className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white focus:outline-none"
            />
            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setShowKeyModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAdminKeyLogin}
                className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs text-white font-semibold shadow-lg shadow-purple-600/30"
              >
                Submit Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
