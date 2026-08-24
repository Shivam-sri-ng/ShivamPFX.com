import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  FiUsers,
  FiMail,
  FiFolder,
  FiMessageSquare,
  FiArrowUpRight,
  FiUser,
  FiCode,
  FiBriefcase,
  FiSend,
  FiArrowRight,
} from 'react-icons/fi';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import API from '../../api/axios';

const chartData = [
  { name: 'May 1', visitors: 280 },
  { name: 'May 5', visitors: 340 },
  { name: 'May 8', visitors: 480 },
  { name: 'May 12', visitors: 420 },
  { name: 'May 15', visitors: 628 },
  { name: 'May 18', visitors: 510 },
  { name: 'May 22', visitors: 380 },
  { name: 'May 25', visitors: 450 },
  { name: 'May 29', visitors: 420 },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    visitors: '—',
    messagesCount: 0,
    projectsCount: 0,
    testimonialsCount: 0,
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [messagesRes, projectsRes, visitorsRes] = await Promise.allSettled([
          API.get('/contact'),
          API.get('/projects'),
          API.get('/visitors'),
        ]);

        if (messagesRes.status === 'fulfilled') {
          const msgs = messagesRes.value.data.data;
          setRecentMessages(msgs.slice(0, 3));
          setStats((prev) => ({ ...prev, messagesCount: msgs.length || 32 }));
        }

        if (projectsRes.status === 'fulfilled') {
          const projs = projectsRes.value.data.data;
          setStats((prev) => ({ ...prev, projectsCount: projs.length || 0 }));
        }

        if (visitorsRes.status === 'fulfilled') {
          const count = visitorsRes.value.data.count || 0;
          setStats((prev) => ({ ...prev, visitors: count.toLocaleString() }));
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const defaultMessages = [
    {
      _id: '1',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      message: "I'd like to know more about your work...",
      status: 'new',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    },
    {
      _id: '2',
      name: 'Rohit Verma',
      email: 'rohitverma@example.com',
      message: 'Great portfolio! Love your projects.',
      status: 'read',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    },
    {
      _id: '3',
      name: 'Anjali Mehta',
      email: 'anjali.mehta@example.com',
      message: 'Can we collaborate on a project?',
      status: 'replied',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    },
  ];

  const displayMessages = recentMessages.length > 0 ? recentMessages : defaultMessages;

  return (
    <div className="min-h-screen flex relative transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar
        messageCount={stats.messagesCount}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <Header
          title="Dashboard"
          subtitle="Welcome back, Admin! 👋"
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Top 4 Stat Cards matching Screenshot 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Stat 1: Total Visitors */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-2xl p-5 border border-white/5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-purple-600/20 text-purple-400">
                  <FiUsers size={22} />
                </div>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded-lg border border-emerald-800/40 flex items-center space-x-1">
                  <FiArrowUpRight size={14} />
                  <span>18.6%</span>
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">Total Visitors</p>
                <h3 className="text-2xl font-extrabold text-white mt-1">{stats.visitors}</h3>
                <p className="text-[11px] text-slate-500 mt-1">vs last month</p>
              </div>
            </motion.div>

            {/* Stat 2: Messages */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="glass-card rounded-2xl p-5 border border-white/5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-blue-600/20 text-blue-400">
                  <FiMail size={22} />
                </div>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded-lg border border-emerald-800/40 flex items-center space-x-1">
                  <FiArrowUpRight size={14} />
                  <span>12.5%</span>
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">Messages</p>
                <h3 className="text-2xl font-extrabold text-white mt-1">{stats.messagesCount}</h3>
                <p className="text-[11px] text-slate-500 mt-1">vs last month</p>
              </div>
            </motion.div>

            {/* Stat 3: Projects */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="glass-card rounded-2xl p-5 border border-white/5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-emerald-600/20 text-emerald-400">
                  <FiFolder size={22} />
                </div>
                <span className="text-xs font-semibold text-slate-400 bg-slate-800/40 px-2 py-1 rounded-lg border border-slate-700/40 flex items-center space-x-1">
                  <span>0%</span>
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">Projects</p>
                <h3 className="text-2xl font-extrabold text-white mt-1">{stats.projectsCount}</h3>
                <p className="text-[11px] text-slate-500 mt-1">vs last month</p>
              </div>
            </motion.div>

            {/* Stat 4: Testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="glass-card rounded-2xl p-5 border border-white/5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-amber-600/20 text-amber-400">
                  <FiMessageSquare size={22} />
                </div>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded-lg border border-emerald-800/40 flex items-center space-x-1">
                  <FiArrowUpRight size={14} />
                  <span>14.3%</span>
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">Testimonials</p>
                <h3 className="text-2xl font-extrabold text-white mt-1">{stats.testimonialsCount}</h3>
                <p className="text-[11px] text-slate-500 mt-1">vs last month</p>
              </div>
            </motion.div>
          </div>

          {/* Visitors Overview Chart matching Screenshot 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-card rounded-2xl p-5 sm:p-6 border border-white/5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">Visitors Overview</h3>
              </div>
              <select className="bg-[#12121f] text-xs text-slate-300 border border-white/10 rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer">
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Year</option>
              </select>
            </div>

            <div className="h-64 sm:h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#12121f',
                      borderColor: 'rgba(139, 92, 246, 0.3)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                    formatter={(value) => [`${value} Visitors`, 'Visitors']}
                  />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorVisitors)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Messages Section matching Screenshot 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-card rounded-2xl p-5 sm:p-6 border border-white/5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-white">Recent Messages</h3>
              <Link
                to="/admin/messages"
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center space-x-1"
              >
                <span>View All</span>
                <FiArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-3 divide-y divide-white/5">
              {displayMessages.map((msg) => (
                <div key={msg._id} className="pt-3 first:pt-0 flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-3 min-w-0">
                    <img
                      src={
                        msg.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.name || msg.email || 'User')}&background=6d28d9&color=fff&bold=true&size=80&rounded=true`
                      }
                      alt={msg.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.name || 'User')}&background=6d28d9&color=fff&bold=true&size=80`;
                      }}
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">{msg.name}</h4>
                      <p className="text-xs text-slate-400 truncate">{msg.email}</p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{msg.message}</p>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {msg.status === 'new' && (
                      <span className="px-2.5 py-1 text-[11px] font-semibold bg-purple-600/30 text-purple-300 rounded-lg border border-purple-500/30">
                        New
                      </span>
                    )}
                    {msg.status === 'read' && (
                      <span className="px-2.5 py-1 text-[11px] font-semibold bg-blue-600/30 text-blue-300 rounded-lg border border-blue-500/30">
                        Read
                      </span>
                    )}
                    {msg.status === 'replied' && (
                      <span className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-600/30 text-emerald-300 rounded-lg border border-emerald-500/30">
                        Replied
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions Grid matching Screenshot 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="glass-card rounded-2xl p-5 sm:p-6 border border-white/5 space-y-4"
          >
            <h3 className="text-base sm:text-lg font-bold text-white">Quick Actions</h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link
                to="/admin/about"
                className="glass-card p-5 rounded-2xl border border-white/5 hover:border-purple-500/40 flex flex-col items-center justify-center space-y-3 group transition-all"
              >
                <div className="p-3.5 rounded-full bg-purple-600/20 text-purple-400 group-hover:scale-110 transition-transform">
                  <FiUser size={22} />
                </div>
                <span className="text-xs font-semibold text-slate-200 group-hover:text-white">Edit About</span>
              </Link>

              <Link
                to="/admin/skills"
                className="glass-card p-5 rounded-2xl border border-white/5 hover:border-blue-500/40 flex flex-col items-center justify-center space-y-3 group transition-all"
              >
                <div className="p-3.5 rounded-full bg-blue-600/20 text-blue-400 group-hover:scale-110 transition-transform">
                  <FiCode size={22} />
                </div>
                <span className="text-xs font-semibold text-slate-200 group-hover:text-white">Manage Skills</span>
              </Link>

              <Link
                to="/admin/projects"
                className="glass-card p-5 rounded-2xl border border-white/5 hover:border-emerald-500/40 flex flex-col items-center justify-center space-y-3 group transition-all"
              >
                <div className="p-3.5 rounded-full bg-emerald-600/20 text-emerald-400 group-hover:scale-110 transition-transform">
                  <FiBriefcase size={22} />
                </div>
                <span className="text-xs font-semibold text-slate-200 group-hover:text-white">Add Project</span>
              </Link>

              <Link
                to="/admin/messages"
                className="glass-card p-5 rounded-2xl border border-white/5 hover:border-amber-500/40 flex flex-col items-center justify-center space-y-3 group transition-all"
              >
                <div className="p-3.5 rounded-full bg-amber-600/20 text-amber-400 group-hover:scale-110 transition-transform">
                  <FiSend size={22} />
                </div>
                <span className="text-xs font-semibold text-slate-200 group-hover:text-white">View Messages</span>
              </Link>
            </div>
          </motion.div>
        </main>

        <footer className="p-4 text-center text-xs text-slate-500 border-t border-white/5 mt-auto">
          © {new Date().getFullYear()} <span className="text-purple-400 font-medium">Shivam Srivastava</span>. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
