import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FiHome,
  FiUser,
  FiCode,
  FiFolder,
  FiBriefcase,
  FiAward,
  FiMessageSquare,
  FiSettings,
  FiLogOut,
  FiShare2,
} from 'react-icons/fi';

const Sidebar = ({ messageCount = 5, isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: FiHome },
    { name: 'About', path: '/admin/about', icon: FiUser },
    { name: 'Skills', path: '/admin/skills', icon: FiCode },
    { name: 'Projects', path: '/admin/projects', icon: FiFolder },
    { name: 'Experience', path: '/admin/experience', icon: FiBriefcase },
    { name: 'Education', path: '/admin/education', icon: FiAward },
    { name: 'Social Links', path: '/admin/social', icon: FiShare2 },
    { name: 'Messages', path: '/admin/messages', icon: FiMessageSquare, badge: messageCount },
    { name: 'Settings', path: '/admin/settings', icon: FiSettings },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-[#0d0d16] border-r border-white/5 flex flex-col justify-between transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div>
        {/* Top Logo / App name */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <NavLink to="/" className="text-xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Shivam<span className="text-purple-500">PRX</span>
            <span className="text-purple-400">.</span>
          </NavLink>
        </div>

        {/* Navigation links */}
        <nav className="px-3 py-6 space-y-1 overflow-y-auto max-h-[calc(100vh-160px)]">
          {navItems.map((item) => {
            const IconComp = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen && setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-purple-600/90 text-white shadow-lg shadow-purple-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <div className="flex items-center space-x-3">
                  <IconComp size={18} />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-purple-500 text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout Footer */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <FiLogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
