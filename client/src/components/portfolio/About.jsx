import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiMapPin, FiBriefcase, FiPhone, FiCopy, FiCode, FiBarChart2, FiCpu, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const About = ({ about }) => {
  const name = about?.name || 'Shivam Srivastava';
  const email = about?.email || 'shivam.srivastava.dev@gmail.com';
  const phone = about?.phone || '+91 98765 43210';
  const location = about?.location || 'India';
  const freelance = about?.freelance || 'Available for Hire';
  const bio =
    about?.bio ||
    'I am Shivam Srivastava, a results-driven Full Stack Engineer and Data Analyst / Scientist. I bridge the gap between robust software engineering and high-impact data analytics. With expertise in MERN stack web development, Python data science ecosystem (Pandas, Scikit-Learn, TensorFlow, SQL, Power BI/Tableau), and cloud architecture, I design end-to-end data-driven applications that transform complex data into actionable business intelligence.';
  const aboutImage = about?.aboutImage || '/profile-nobg.png';

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${label} to clipboard!`);
  };

  const highlights = [
    { title: 'Full-Stack Web Dev', desc: 'React, Node.js, Express, MongoDB, REST APIs', icon: FiCode, color: '#a855f7' },
    { title: 'Data Science & ML', desc: 'Python, Scikit-Learn, TensorFlow, PyTorch', icon: FiCpu, color: '#38bdf8' },
    { title: 'Data Analytics & BI', desc: 'SQL, Pandas, NumPy, Power BI, Tableau', icon: FiBarChart2, color: '#34d399' },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden border border-purple-500/20 shadow-2xl backdrop-blur-xl bg-[#0d0d18]/80"
        >
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: About Photo Card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl border border-purple-500/30 group"
              >
                <img
                  src={aboutImage}
                  alt={name}
                  className="w-full h-[280px] sm:h-[380px] object-cover object-top group-hover:scale-108 transition-transform duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/profile.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090e] via-transparent to-transparent opacity-70" />
                
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#09090e]/85 backdrop-blur-md border border-white/10 shadow-lg">
                  <p className="text-xs font-bold text-purple-300">Shivam Srivastava</p>
                  <p className="text-[11px] text-slate-300 font-medium mt-0.5">Full Stack Engineer & Data Scientist</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Bio & Interactive Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="flex items-center space-x-2.5">
                <span className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-md">
                  <FiUser size={22} />
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">Shivam Srivastava</span>
                </h2>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                {bio}
              </p>

              {/* 3 Core Expertise Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                {highlights.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="p-4 rounded-2xl bg-purple-950/20 border border-purple-800/30 hover:border-purple-500/50 transition-all shadow-lg hover:shadow-purple-950/40"
                    >
                      <div className="p-2 rounded-xl inline-block bg-white/5 mb-2.5">
                        <Icon size={22} style={{ color: item.color }} />
                      </div>
                      <h4 className="text-xs font-bold text-white tracking-wide">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-snug">{item.desc}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Personal Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <motion.div whileHover={{ scale: 1.01 }} className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all shadow-md">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-lg bg-purple-900/40 text-purple-400">
                      <FiUser size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">Name:</p>
                      <p className="text-sm font-semibold text-white">{name}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => copyToClipboard(email, 'Email')}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer group shadow-md"
                  title="Click to copy email"
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="p-2.5 rounded-lg bg-purple-900/40 text-purple-400 shrink-0">
                      <FiMail size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs text-slate-400 font-medium">Email:</p>
                      <p className="text-xs sm:text-sm font-semibold text-white truncate">{email}</p>
                    </div>
                  </div>
                  <FiCopy className="text-slate-400 group-hover:text-purple-400 shrink-0 ml-2" size={16} />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => copyToClipboard(phone, 'Phone')}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer group shadow-md"
                  title="Click to copy phone"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-lg bg-purple-900/40 text-purple-400">
                      <FiPhone size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">Phone:</p>
                      <p className="text-sm font-semibold text-white">{phone}</p>
                    </div>
                  </div>
                  <FiCopy className="text-slate-400 group-hover:text-purple-400 shrink-0" size={16} />
                </motion.div>

                <motion.div whileHover={{ scale: 1.01 }} className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all shadow-md">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-lg bg-purple-900/40 text-purple-400">
                      <FiBriefcase size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">Freelance:</p>
                      <p className="text-sm font-semibold text-emerald-400">{freelance}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
