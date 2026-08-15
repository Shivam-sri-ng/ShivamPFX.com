import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiTrash2, FiEdit2, FiFolder, FiX, FiUpload, FiExternalLink, FiGithub } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import API from '../../api/axios';

const defaultProjectsList = [
  {
    _id: 'proj_1',
    title: 'AI Customer Churn Analytics & Prediction',
    description: 'Machine learning pipeline and interactive dashboard predicting customer churn risk with 92% accuracy.',
    longDescription: 'End-to-end Machine Learning solution utilizing XGBoost and Random Forest classifiers to detect customer churn risk factors.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    liveUrl: 'https://github.com/shivam-srivastava',
    githubUrl: 'https://github.com/shivam-srivastava',
    technologies: ['Python', 'Scikit-Learn', 'Pandas', 'React', 'FastAPI', 'Tailwind CSS'],
    category: 'Data Science & ML',
    featured: true,
  },
  {
    _id: 'proj_2',
    title: 'Full-Stack Enterprise E-Commerce SaaS',
    description: 'Production-ready MERN e-commerce application with real-time inventory, payment gateways, and admin analytics.',
    longDescription: 'Scalable multi-tenant e-commerce platform built with React 18, Node.js, Express, and MongoDB Atlas.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop',
    liveUrl: 'https://github.com/shivam-srivastava',
    githubUrl: 'https://github.com/shivam-srivastava',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux Toolkit'],
    category: 'Full Stack',
    featured: true,
  },
  {
    _id: 'proj_3',
    title: 'Real-Time Financial Market & Stock Forecaster',
    description: 'Financial market analysis web app performing time-series forecasting and volatility metrics.',
    longDescription: 'Time-series predictive analytics platform using Prophet and ARIMA algorithms to forecast stock trends.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop',
    liveUrl: 'https://github.com/shivam-srivastava',
    githubUrl: 'https://github.com/shivam-srivastava',
    technologies: ['Python', 'Streamlit', 'Prophet', 'Plotly', 'SQL'],
    category: 'Data Analytics',
    featured: true,
  },
];

const ManageProjects = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('portfolio_projects');
    return saved ? JSON.parse(saved) : defaultProjectsList;
  });
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    image: '',
    liveUrl: '',
    githubUrl: '',
    technologies: '',
    category: 'Full Stack',
    featured: true,
  });

  const fetchProjects = async () => {
    try {
      const res = await API.get('/projects');
      if (res.data.success && res.data.data.length > 0) {
        setProjects(res.data.data);
        localStorage.setItem('portfolio_projects', JSON.stringify(res.data.data));
      }
    } catch (err) {
      // Use state / localStorage items if API offline
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      longDescription: '',
      image: '',
      liveUrl: '',
      githubUrl: '',
      technologies: '',
      category: 'Full Stack',
      featured: true,
    });
    setShowModal(true);
  };

  const openEditModal = (proj) => {
    setEditingId(proj._id);
    setFormData({
      ...proj,
      technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies || '',
    });
    setShowModal(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    setUploading(true);
    try {
      const res = await API.post('/upload/image', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        setFormData((prev) => ({ ...prev, image: res.data.data.url }));
        toast.success('Project image uploaded!');
      }
    } catch (err) {
      // Fallback local preview URL
      const localUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: localUrl }));
      toast.success('Image attached!');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    // Update local state immediately
    const updated = projects.filter((p) => p._id !== id);
    setProjects(updated);
    localStorage.setItem('portfolio_projects', JSON.stringify(updated));
    toast.success('Project deleted!');

    try {
      await API.delete(`/projects/${id}`);
    } catch (err) {
      // Ignore network error since local state updated
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error('Title and description are required');
      return;
    }

    const techArray = typeof formData.technologies === 'string'
      ? formData.technologies.split(',').map((t) => t.trim()).filter(Boolean)
      : formData.technologies;

    const newProjectItem = {
      _id: editingId ? editingId : `proj_${Date.now()}`,
      title: formData.title,
      description: formData.description,
      longDescription: formData.longDescription || formData.description,
      image: formData.image || 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop',
      liveUrl: formData.liveUrl || '',
      githubUrl: formData.githubUrl || '',
      technologies: techArray.length ? techArray : ['React', 'Node.js'],
      category: formData.category || 'Full Stack',
      featured: formData.featured,
    };

    let updatedProjects;
    if (editingId) {
      updatedProjects = projects.map((p) => (p._id === editingId ? newProjectItem : p));
      toast.success('Project updated successfully!');
    } else {
      updatedProjects = [newProjectItem, ...projects];
      toast.success('New project added successfully!');
    }

    setProjects(updatedProjects);
    localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
    setShowModal(false);

    try {
      if (editingId) {
        await API.put(`/projects/${editingId}`, newProjectItem);
      } else {
        await API.post('/projects', newProjectItem);
      }
    } catch (err) {
      // Keep optimistic UI update
    }
  };

  return (
    <div className="min-h-screen relative flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <Header
          title="Manage Projects"
          subtitle="Add, edit, or delete projects shown on your portfolio website"
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black text-white">Projects ({projects.length})</h2>
              <p className="text-xs text-slate-400">All portfolio projects currently published</p>
            </div>
            <button
              onClick={openAddModal}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-lg shadow-purple-600/40 flex items-center space-x-2 active:scale-95 cursor-pointer"
            >
              <FiPlus size={16} />
              <span>Add New Project</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div key={proj._id} className="glass-card rounded-2xl p-5 border border-white/5 space-y-4 flex flex-col justify-between hover:border-purple-500/40 transition-all shadow-xl">
                <div>
                  <div className="aspect-video rounded-xl overflow-hidden mb-3 bg-slate-900 border border-white/10 relative">
                    <img src={proj.image || 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=600&auto=format&fit=crop'} alt={proj.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950/80 text-purple-300 border border-purple-800/50">
                      {proj.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white line-clamp-1">{proj.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{proj.description}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex flex-wrap gap-1">
                    {proj.technologies?.slice(0, 3).map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded text-[9px] bg-white/5 text-purple-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    <button onClick={() => openEditModal(proj)} className="p-2 text-slate-400 hover:text-purple-400 cursor-pointer">
                      <FiEdit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(proj._id)} className="p-2 text-slate-400 hover:text-red-400 cursor-pointer">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl p-6 sm:p-8 w-full max-w-lg border border-purple-500/30 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">{editingId ? 'Edit Project' : 'Add New Project'}</h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. AI Customer Churn Predictor"
                  className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#12121f] text-xs sm:text-sm text-white border border-white/10"
                >
                  <option value="Full Stack">Full Stack</option>
                  <option value="Data Science & ML">Data Science & ML</option>
                  <option value="Data Analytics">Data Analytics</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description *</label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief overview for project cards..."
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-white resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Architecture / Long Description</label>
                <textarea
                  rows="3"
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  placeholder="Deep dive into system features, ML models & backend..."
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL or Upload</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                    className="flex-1 px-4 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                  <label className="px-4 py-2.5 rounded-xl bg-purple-600/30 text-purple-300 text-xs font-semibold cursor-pointer border border-purple-500/30 flex items-center space-x-1 shrink-0 hover:bg-purple-600/50">
                    <FiUpload size={14} />
                    <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                    <input type="file" onChange={handleImageUpload} className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Live Demo URL</label>
                  <input
                    type="text"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub Repo URL</label>
                  <input
                    type="text"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="Python, React, Node.js, SQL"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-white"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-white/10">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-xl border border-white/10 text-xs text-slate-400 hover:text-white">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs text-white font-semibold shadow-lg shadow-purple-600/30">
                  {editingId ? 'Update Project' : 'Save New Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProjects;
