import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFolder, FiArrowRight, FiExternalLink, FiGithub, FiX, FiCheck, FiLayers } from 'react-icons/fi';
import { FaPython, FaReact, FaDatabase, FaBrain } from 'react-icons/fa';

const defaultProjects = [
  {
    _id: '1',
    title: 'Retrieval-Augmented AI Assistant',
    description:
      'AI assistant using TF-IDF semantic search over a SQLite knowledge base. Integrated with Gemini API — repeat query latency cut by 60%. Deployed on Vercel.',
    longDescription:
      'Developed a retrieval-augmented assistant using TF-IDF semantic search over a SQLite knowledge base for contextual answers. Used Pandas to preprocess and structure the knowledge base, improving retrieval relevance for downstream queries. Integrated Gemini API via REST APIs with response caching, cutting repeat query latency by 60%. Deployed on Vercel.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=800&auto=format&fit=crop',
    liveUrl: 'https://github.com/shivam-sri-ng',
    githubUrl: 'https://github.com/shivam-sri-ng',
    technologies: ['Python', 'TF-IDF', 'SQLite', 'Pandas', 'Gemini API', 'REST APIs', 'Vercel'],
    category: 'AI & ML',
    featured: true,
  },
  {
    _id: '2',
    title: 'AC Repairing Management System',
    description:
      'Service platform with JWT authentication and role-based authorization for admin, technician & customer. ORM-driven CRUD REST APIs across MySQL and MongoDB.',
    longDescription:
      'Built a service management platform with JWT authentication and role-based authorization covering admin, technician, and customer workflows. Implemented ORM-driven CRUD REST APIs across MySQL and MongoDB, automating booking and technician assignment. Features multi-role dashboards and full request lifecycle management.',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800&auto=format&fit=crop',
    liveUrl: 'https://github.com/shivam-sri-ng',
    githubUrl: 'https://github.com/shivam-sri-ng',
    technologies: ['Node.js', 'Express.js', 'JWT', 'MySQL', 'MongoDB', 'React.js', 'REST APIs'],
    category: 'Full Stack',
    featured: true,
  },
  {
    _id: '3',
    title: 'TravelSafely Portal',
    description:
      'Real-time trip tracking with WebSockets delivering live location updates at sub-second latency. Backend optimized with DB indexing — 40% throughput improvement.',
    longDescription:
      'Engineered real-time trip tracking with WebSockets and REST APIs, delivering live location updates at sub-second latency. Optimized the backend through database indexing and query tuning, improving CRUD throughput by 40% on the deployed build. Features live SOS alerts, trip history, and role-based traveler & guardian views.',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop',
    liveUrl: 'https://github.com/shivam-sri-ng',
    githubUrl: 'https://github.com/shivam-sri-ng',
    technologies: ['Node.js', 'Express.js', 'WebSockets', 'React.js', 'MongoDB', 'REST APIs'],
    category: 'Full Stack',
    featured: true,
  },
];

const Projects = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const displayProjects = projects && projects.length > 0 ? projects : defaultProjects;

  const categories = ['All', 'AI & ML', 'Full Stack'];

  const filteredProjects = displayProjects.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6"
        >
          <div className="flex items-center space-x-3">
            <span className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-md">
              <FiFolder size={24} />
            </span>
            <div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">CV Projects</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Full Stack Web Engineering, Machine Learning Models & Data Analytics Solutions
              </p>
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="relative px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer focus:outline-none"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectTab"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg shadow-purple-600/30"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? 'text-white font-bold' : 'text-slate-400 hover:text-white'}`}>
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project._id || project.title}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(project)}
                className="glass-card rounded-3xl p-5 flex flex-col justify-between group border border-purple-500/10 hover:border-purple-500/40 shadow-xl backdrop-blur-xl bg-[#0c0c16]/80 transition-all cursor-pointer"
              >
                <div>
                  {/* Category Pill Badge */}
                  <div className="flex justify-between items-center mb-3.5">
                    <span className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-purple-950/80 text-purple-300 border border-purple-800/50">
                      {project.category || 'Project'}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono group-hover:text-purple-300 transition-colors">
                      Details →
                    </span>
                  </div>

                  {/* Image Container */}
                  <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video bg-slate-900 border border-white/5">
                    <img
                      src={project.image || 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c16] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies Badges */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-white/5 text-slate-300 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-purple-950 text-purple-300 border border-purple-800/40">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Action Links */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center space-x-1.5"
                  >
                    <span>View Architecture</span>
                    <FiArrowRight size={14} />
                  </button>

                  <div className="flex items-center space-x-2">
                    {project.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.2 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 text-slate-400 hover:text-white transition-colors"
                        title="GitHub Code"
                      >
                        <FiGithub size={16} />
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a
                        whileHover={{ scale: 1.2 }}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 text-slate-400 hover:text-purple-400 transition-colors"
                        title="Live Preview"
                      >
                        <FiExternalLink size={16} />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Interactive Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border border-purple-500/30 relative shadow-2xl bg-[#0c0c16]/95"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <FiX size={20} />
              </button>

              <div className="mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-900/60 text-purple-300 border border-purple-500/30">
                  {selectedProject.category}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
                {selectedProject.title}
              </h3>

              <div className="rounded-2xl overflow-hidden aspect-video mb-5 border border-white/10 bg-slate-900">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-slate-300 text-xs sm:text-sm leading-relaxed">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-1">
                    Project Overview & Architecture
                  </h4>
                  <p>{selectedProject.longDescription || selectedProject.description}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
                    Technologies & Tools Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies?.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-purple-950/70 text-purple-300 border border-purple-800/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-6 mt-6 border-t border-white/10">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center space-x-2 transition-all shadow-lg shadow-purple-600/30"
                  >
                    <span>View Demo</span>
                    <FiExternalLink size={14} />
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center space-x-2 transition-all border border-white/10"
                  >
                    <span>GitHub Repository</span>
                    <FiGithub size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
