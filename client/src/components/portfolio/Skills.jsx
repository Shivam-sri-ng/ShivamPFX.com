import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGithub,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaBrain,
  FaJava,
  FaBootstrap,
  FaTerminal,
} from 'react-icons/fa';
import {
  SiTailwindcss,
  SiMongodb,
  SiPandas,
  SiScikitlearn,
  SiPostgresql,
  SiExpress,
  SiTypescript,
  SiDjango,
  SiMysql,
  SiSqlite,
  SiPostman,
  SiJsonwebtokens,
  SiVercel,
} from 'react-icons/si';

const iconMap = {
  SiPython: { comp: FaPython, color: '#3776ab' },
  FaPython: { comp: FaPython, color: '#3776ab' },
  SiJavascript: { comp: FaJs, color: '#f7df1e' },
  SiTypescript: { comp: SiTypescript, color: '#3178c6' },
  FaJava: { comp: FaJava, color: '#5382a1' },
  SiC: { comp: FaTerminal, color: '#a8b9cc' },
  SiPostgresql: { comp: SiPostgresql, color: '#4169e1' },
  SiPandas: { comp: SiPandas, color: '#38bdf8' },
  SiScikitlearn: { comp: SiScikitlearn, color: '#f7931e' },
  FaBrain: { comp: FaBrain, color: '#10a37f' },
  SiReact: { comp: FaReact, color: '#61dafb' },
  SiHtml5: { comp: FaHtml5, color: '#e34f26' },
  SiCss3: { comp: FaCss3Alt, color: '#1572b6' },
  SiBootstrap: { comp: FaBootstrap, color: '#7952b3' },
  SiNodedotjs: { comp: FaNodeJs, color: '#339933' },
  SiExpress: { comp: SiExpress, color: '#a855f7' },
  SiDjango: { comp: SiDjango, color: '#10b981' },
  SiPostman: { comp: SiPostman, color: '#ff6c37' },
  SiJsonwebtokens: { comp: SiJsonwebtokens, color: '#d63aff' },
  SiMongodb: { comp: SiMongodb, color: '#47a248' },
  SiMysql: { comp: SiMysql, color: '#4479a1' },
  SiSqlite: { comp: SiSqlite, color: '#38bdf8' },
  SiGithub: { comp: FaGithub, color: '#f05032' },
  SiVercel: { comp: SiVercel, color: '#cbd5e1' },
  FaTerminal: { comp: FaTerminal, color: '#007acc' },
};

const defaultSkills = [
  // Languages
  { _id: '1', name: 'Python', icon: 'SiPython', iconColor: '#3776ab', category: 'datascience', level: 95 },
  { _id: '2', name: 'JavaScript (ES6+)', icon: 'SiJavascript', iconColor: '#f7df1e', category: 'frontend', level: 92 },
  { _id: '3', name: 'TypeScript', icon: 'SiTypescript', iconColor: '#3178c6', category: 'frontend', level: 85 },
  { _id: '4', name: 'Java', icon: 'FaJava', iconColor: '#5382a1', category: 'backend', level: 80 },
  { _id: '5', name: 'C', icon: 'SiC', iconColor: '#a8b9cc', category: 'backend', level: 78 },
  { _id: '6', name: 'SQL', icon: 'SiPostgresql', iconColor: '#4169e1', category: 'database', level: 90 },

  // Data Science & Analytics
  { _id: '7', name: 'Pandas & NumPy', icon: 'SiPandas', iconColor: '#38bdf8', category: 'datascience', level: 94 },
  { _id: '8', name: 'Matplotlib & Seaborn', icon: 'SiPython', iconColor: '#ff6f61', category: 'datascience', level: 88 },
  { _id: '9', name: 'Machine Learning', icon: 'SiScikitlearn', iconColor: '#f7931e', category: 'ml', level: 90 },
  { _id: '10', name: 'LLMs & RAG Architectures', icon: 'FaBrain', iconColor: '#10a37f', category: 'ml', level: 88 },
  { _id: '11', name: 'Exploratory Data Analysis (EDA)', icon: 'SiPython', iconColor: '#06b6d4', category: 'analytics', level: 92 },
  { _id: '12', name: 'Statistical Analysis', icon: 'SiPython', iconColor: '#8b5cf6', category: 'analytics', level: 86 },

  // Frontend Development
  { _id: '13', name: 'React.js', icon: 'SiReact', iconColor: '#61dafb', category: 'frontend', level: 92 },
  { _id: '14', name: 'HTML5 & CSS3', icon: 'SiHtml5', iconColor: '#e34f26', category: 'frontend', level: 95 },
  { _id: '15', name: 'Bootstrap & Responsive Design', icon: 'SiBootstrap', iconColor: '#7952b3', category: 'frontend', level: 90 },

  // Backend Development
  { _id: '16', name: 'Node.js', icon: 'SiNodedotjs', iconColor: '#339933', category: 'backend', level: 90 },
  { _id: '17', name: 'Express.js', icon: 'SiExpress', iconColor: '#a855f7', category: 'backend', level: 90 },
  { _id: '18', name: 'Django (Python)', icon: 'SiDjango', iconColor: '#10b981', category: 'backend', level: 88 },
  { _id: '19', name: 'REST APIs & WebSockets', icon: 'SiPostman', iconColor: '#ff6c37', category: 'backend', level: 94 },
  { _id: '20', name: 'JWT Auth & Security', icon: 'SiJsonwebtokens', iconColor: '#d63aff', category: 'backend', level: 90 },

  // Databases
  { _id: '21', name: 'MongoDB', icon: 'SiMongodb', iconColor: '#47a248', category: 'database', level: 90 },
  { _id: '22', name: 'MySQL', icon: 'SiMysql', iconColor: '#4479a1', category: 'database', level: 88 },
  { _id: '23', name: 'SQLite', icon: 'SiSqlite', iconColor: '#38bdf8', category: 'database', level: 86 },

  // Tools & Deployment
  { _id: '24', name: 'Git & GitHub', icon: 'SiGithub', iconColor: '#f05032', category: 'tools', level: 92 },
  { _id: '25', name: 'Render & Vercel Deployment', icon: 'SiVercel', iconColor: '#cbd5e1', category: 'tools', level: 90 },
  { _id: '26', name: 'VS Code', icon: 'FaTerminal', iconColor: '#007acc', category: 'tools', level: 95 },
];

const Skills = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const displaySkills = skills && skills.length > 0 ? skills : defaultSkills;

  const filteredSkills = displaySkills.filter((skill) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'datascience')
      return skill.category === 'datascience' || skill.category === 'analytics' || skill.category === 'ml';
    if (activeCategory === 'fullstack')
      return skill.category === 'frontend' || skill.category === 'backend';
    if (activeCategory === 'database')
      return skill.category === 'database' || skill.category === 'analytics';
    if (activeCategory === 'tools') return skill.category === 'tools';
    return true;
  });

  const categories = [
    { key: 'all', label: 'All Skills' },
    { key: 'datascience', label: 'Data Science & ML' },
    { key: 'fullstack', label: 'Full Stack & Web' },
    { key: 'database', label: 'Databases & SQL' },
    { key: 'tools', label: 'Tools & Deployment' },
  ];

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-4xl font-black text-white flex items-center justify-center space-x-2 tracking-tight">
            <span className="text-purple-400 font-mono text-xl sm:text-3xl">&lt;/&gt;</span>
            <span>
              Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Skills & Expertise</span>
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            Comprehensive technical competencies across Data Science, Machine Learning, Full-Stack Web Architecture & Cloud Databases.
          </p>

          {/* Category Filter Tabs with Spring Pill */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className="relative px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer focus:outline-none"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillTab"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg shadow-purple-600/30"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? 'text-white font-bold' : 'text-slate-400 hover:text-white'}`}>
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Skill Cards Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const iconConfig = iconMap[skill.icon] || { comp: FaBrain, color: skill.iconColor || '#8b5cf6' };
              const IconComponent = iconConfig.comp;

              return (
                <motion.div
                  layout
                  key={skill._id || skill.name}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ duration: 0.35, delay: index * 0.02 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-between cursor-pointer group border border-purple-500/10 hover:border-purple-500/40 shadow-xl backdrop-blur-xl bg-[#0c0c16]/80 transition-all"
                >
                  <div className="p-3.5 rounded-2xl bg-white/5 group-hover:bg-purple-950/50 transition-all duration-300 mb-3 shadow-inner">
                    <IconComponent size={34} style={{ color: skill.iconColor || iconConfig.color }} />
                  </div>

                  <div className="text-center w-full">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-purple-300 transition-colors block truncate">
                      {skill.name}
                    </span>

                    {/* Skill Level Progress Bar */}
                    <div className="w-full bg-slate-900 rounded-full h-1.5 mt-2.5 overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level || 85}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                        className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 h-full rounded-full"
                      />
                    </div>
                    <span className="text-[10px] text-purple-300/80 font-mono mt-1 block">
                      {skill.level || 85}% Proficiency
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
