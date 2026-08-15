import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn, FiShield } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }
    toast.success('Redirecting to Portfolio...');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#09090e] flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative z-10"
      >
        {/* Logo Container matching Screenshot 1 */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 text-2xl font-bold shadow-lg shadow-purple-950/50 mb-3">
            &lt;/&gt;
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Port<span className="text-purple-500">Folio</span>
            <span className="text-purple-400">.</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">
            Welcome back! Please login to your account.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-3.5 text-purple-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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
                placeholder="Enter your password"
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
            <a href="#" onClick={(e) => { e.preventDefault(); toast('Password reset link sent!'); }} className="text-purple-400 hover:text-purple-300 font-medium">
              Forgot Password?
            </a>
          </div>

          {/* Primary Login Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-purple-600/40 flex items-center justify-center space-x-2"
          >
            <FiLogIn size={18} />
            <span>Login</span>
          </button>

          {/* Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/10" />
            <span className="flex-shrink mx-4 text-[11px] text-slate-500 font-medium uppercase tracking-wider">
              or continue with
            </span>
            <div className="flex-grow border-t border-white/10" />
          </div>

          {/* Social OAuth Buttons matching Screenshot 1 */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => toast('Google authentication initiated')}
              className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl glass-card hover:bg-white/5 border border-white/10 text-xs font-semibold text-white transition-all"
            >
              <FcGoogle size={18} />
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => toast('GitHub authentication initiated')}
              className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl glass-card hover:bg-white/5 border border-white/10 text-xs font-semibold text-white transition-all"
            >
              <FaGithub size={18} />
              <span>GitHub</span>
            </button>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-slate-400">
              Don't have an account?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); toast('Registration is open for admin users.'); }} className="text-purple-400 font-semibold hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </form>

        {/* Security Shield Graphic matching bottom of Screenshot 1 */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-xl mb-2">
            <FiShield size={32} />
          </div>
          <Link to="/admin/login" className="text-xs text-purple-400 hover:text-purple-300 font-medium underline">
            Are you an administrator? Switch to Admin Login →
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
