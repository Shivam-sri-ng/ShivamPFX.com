import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  FiSearch,
  FiBell,
  FiMenu,
  FiX,
  FiMail,
  FiFolder,
  FiCode,
  FiUser,
  FiSettings,
  FiCheckCircle,
  FiArrowRight,
  FiShare2,
  FiBookOpen,
  FiSun,
  FiMoon,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../../api/axios';
import { useTheme } from '../../context/ThemeContext';

const Header = ({ title = 'Dashboard', subtitle = 'Welcome back, Shivam Srivastava! 👋', toggleSidebar }) => {
  const { admin } = useAuth();
  const { theme, toggleTheme, isMorning } = useTheme();
  const navigate = useNavigate();

  // Search States
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  // Notification States
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'New message from Priya Sharma',
      desc: "I'd like to know more about your work...",
      time: '10m ago',
      read: false,
      type: 'message',
      link: '/admin/messages',
    },
    {
      id: '2',
      title: 'New message from Rohit Verma',
      desc: 'Great portfolio! Love your projects.',
      time: '1h ago',
      read: false,
      type: 'message',
      link: '/admin/messages',
    },
    {
      id: '3',
      title: 'Portfolio System Status',
      desc: 'All API routes operating normally',
      time: '2h ago',
      read: true,
      type: 'system',
      link: '/admin/dashboard',
    },
  ]);

  // Fetch real contact messages for notifications if backend is connected
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await API.get('/contact');
        if (res.data?.data && res.data.data.length > 0) {
          const apiNotifs = res.data.data.slice(0, 5).map((msg) => ({
            id: msg._id,
            title: `New message from ${msg.name}`,
            desc: msg.subject || msg.message,
            time: 'Recently',
            read: msg.status !== 'new',
            type: 'message',
            link: '/admin/messages',
          }));
          setNotifications(apiNotifs);
        }
      } catch (err) {
        // Fall back to preset notifications if offline
      }
    };

    fetchNotifications();
  }, []);

  // Keyboard shortcut Ctrl+K to trigger search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setNotifOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Search items index
  const navigationItems = [
    { title: 'Dashboard Overview', desc: 'Analytics & main statistics', icon: FiMenu, link: '/admin/dashboard', category: 'Page' },
    { title: 'Manage About Me', desc: 'Edit bio, profile image & CV', icon: FiUser, link: '/admin/about', category: 'Page' },
    { title: 'Manage Projects', desc: 'Add, edit or remove portfolio projects', icon: FiFolder, link: '/admin/projects', category: 'Page' },
    { title: 'Manage Skills', desc: 'Add or edit technical skills & icons', icon: FiCode, link: '/admin/skills', category: 'Page' },
    { title: 'Manage Experience', desc: 'Work history & career details', icon: FiBookOpen, link: '/admin/experience', category: 'Page' },
    { title: 'Manage Education', desc: 'Academic degrees & grades', icon: FiBookOpen, link: '/admin/education', category: 'Page' },
    { title: 'Manage Social Links', desc: 'LinkedIn, GitHub, Kaggle URLs', icon: FiShare2, link: '/admin/social', category: 'Page' },
    { title: 'Contact Messages', desc: 'Read & reply to client inquiries', icon: FiMail, link: '/admin/messages', category: 'Messages' },
    { title: 'Account Settings', desc: 'Update credentials & security', icon: FiSettings, link: '/admin/settings', category: 'Settings' },
  ];

  const searchResults = searchQuery.trim()
    ? navigationItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : navigationItems;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const handleNotifClick = (notif) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
    setNotifOpen(false);
    if (notif.link) {
      navigate(notif.link);
    }
  };

  const handleSearchResultClick = (link) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(link);
  };

  return (
    <header className="sticky top-0 z-30 bg-[#09090e]/90 backdrop-blur-md border-b border-white/5 px-4 sm:px-8 py-4 flex items-center justify-between">
      {/* Title & Mobile Sidebar Toggle */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-white/5 transition-colors"
        >
          <FiMenu size={22} />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{title}</h1>
          <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
        </div>
      </div>

      {/* Header Actions: Search, Notifications, Avatar */}
      <div className="flex items-center space-x-3">

        {/* Quick Search Button / Input Trigger */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-white/5 hover:bg-purple-950/40 border border-white/10 hover:border-purple-500/40 text-slate-300 text-xs sm:text-sm font-medium transition-all shadow-md group cursor-pointer"
          title="Search dashboard (Ctrl+K)"
        >
          <FiSearch size={16} className="text-purple-400 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Search admin...</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 rounded border border-slate-700">
            Ctrl K
          </kbd>
        </button>

        {/* Notifications Icon Button */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setSearchOpen(false);
            }}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-purple-950/40 border border-white/10 hover:border-purple-500/40 text-slate-300 hover:text-white transition-all relative cursor-pointer"
            title="Notifications"
          >
            <FiBell size={18} className="text-purple-400" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 border-2 border-[#09090e] text-[10px] font-bold text-white rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Menu */}
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-[#0e0e1a]/95 backdrop-blur-xl border border-purple-500/30 shadow-2xl shadow-purple-950/80 z-50 overflow-hidden"
              >
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-purple-950/40">
                  <div className="flex items-center space-x-2">
                    <FiBell className="text-purple-400" size={16} />
                    <h3 className="text-sm font-bold text-white">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-600 text-white">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-[11px] font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => handleNotifClick(notif)}
                        className={`p-3.5 flex items-start space-x-3 transition-colors cursor-pointer hover:bg-white/5 ${
                          !notif.read ? 'bg-purple-950/20' : ''
                        }`}
                      >
                        <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 shrink-0 mt-0.5">
                          <FiMail size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-white truncate">{notif.title}</h4>
                            <span className="text-[10px] text-slate-500">{notif.time}</span>
                          </div>
                          <p className="text-xs text-slate-400 truncate mt-0.5">{notif.desc}</p>
                        </div>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-xs text-slate-500">
                      No new notifications
                    </div>
                  )}
                </div>

                <div className="p-3 border-t border-white/10 text-center bg-slate-950/40">
                  <Link
                    to="/admin/messages"
                    onClick={() => setNotifOpen(false)}
                    className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center justify-center space-x-1"
                  >
                    <span>View All Messages</span>
                    <FiArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Admin Avatar Badge */}
        <div className="flex items-center space-x-3 pl-1">
          <div className="relative">
            <img
              src={admin?.avatar || '/shiva_pro.jpeg'}
              alt={admin?.name || 'Shivam Srivastava'}
              className="w-10 h-10 rounded-full object-cover border-2 border-purple-500/50 shadow-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/shiva_pro.jpeg';
              }}
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#09090e] rounded-full" />
          </div>
        </div>
      </div>

      {/* Global Interactive Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-20 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="glass-card max-w-xl w-full rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden"
            >
              {/* Search Header Bar */}
              <div className="p-4 border-b border-white/10 flex items-center space-x-3 bg-[#0c0c16]">
                <FiSearch size={20} className="text-purple-400 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search admin pages, projects, messages..."
                  className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Search Results List */}
              <div className="max-h-80 overflow-y-auto p-2 divide-y divide-white/5">
                {searchResults.length > 0 ? (
                  searchResults.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        onClick={() => handleSearchResultClick(item.link)}
                        className="p-3 rounded-xl flex items-center justify-between hover:bg-purple-950/40 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-400 group-hover:scale-110 transition-transform shrink-0">
                            <Icon size={18} />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-[11px] text-slate-400 truncate">{item.desc}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 shrink-0">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-white/5 text-slate-400 border border-white/10">
                            {item.category}
                          </span>
                          <FiArrowRight size={14} className="text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-xs text-slate-500">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>

              {/* Modal Footer Note */}
              <div className="p-3 bg-slate-950/60 border-t border-white/5 text-[11px] text-slate-400 flex justify-between items-center px-4">
                <span>Press <kbd className="px-1 py-0.5 bg-slate-800 rounded font-mono text-slate-300">Esc</kbd> to close</span>
                <span className="text-purple-400 font-medium">Shivam Srivastava Portfolio Admin</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
