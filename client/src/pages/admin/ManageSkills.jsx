import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiTrash2, FiEdit2, FiCode, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import API from '../../api/axios';

const iconOptions = [
  'SiPython',
  'SiPandas',
  'SiScikitlearn',
  'SiPostgresql',
  'SiTableau',
  'SiJavascript',
  'SiReact',
  'SiNodedotjs',
  'SiExpress',
  'SiMongodb',
  'SiTailwindcss',
  'SiGithub',
];

const defaultSkillsList = [
  // Languages
  { _id: 'sk_1', name: 'Python', icon: 'SiPython', iconColor: '#3776ab', category: 'datascience', level: 95 },
  { _id: 'sk_2', name: 'JavaScript (ES6+)', icon: 'SiJavascript', iconColor: '#f7df1e', category: 'frontend', level: 92 },
  { _id: 'sk_3', name: 'TypeScript', icon: 'SiTypescript', iconColor: '#3178c6', category: 'frontend', level: 85 },
  { _id: 'sk_4', name: 'Java', icon: 'FaJava', iconColor: '#5382a1', category: 'backend', level: 80 },
  { _id: 'sk_5', name: 'C', icon: 'SiC', iconColor: '#a8b9cc', category: 'backend', level: 78 },
  { _id: 'sk_6', name: 'SQL', icon: 'SiPostgresql', iconColor: '#4169e1', category: 'database', level: 90 },

  // Data Science & Analytics
  { _id: 'sk_7', name: 'Pandas & NumPy', icon: 'SiPandas', iconColor: '#38bdf8', category: 'datascience', level: 94 },
  { _id: 'sk_8', name: 'Matplotlib & Seaborn', icon: 'SiPython', iconColor: '#ff6f61', category: 'datascience', level: 88 },
  { _id: 'sk_9', name: 'Machine Learning', icon: 'SiScikitlearn', iconColor: '#f7931e', category: 'ml', level: 90 },
  { _id: 'sk_10', name: 'LLMs & RAG Architectures', icon: 'SiOpenai', iconColor: '#10a37f', category: 'ml', level: 88 },
  { _id: 'sk_11', name: 'Exploratory Data Analysis (EDA)', icon: 'SiPython', iconColor: '#06b6d4', category: 'analytics', level: 92 },
  { _id: 'sk_12', name: 'Statistical Analysis', icon: 'SiPython', iconColor: '#8b5cf6', category: 'analytics', level: 86 },

  // Frontend Development
  { _id: 'sk_13', name: 'React.js', icon: 'SiReact', iconColor: '#61dafb', category: 'frontend', level: 92 },
  { _id: 'sk_14', name: 'HTML5 & CSS3', icon: 'SiHtml5', iconColor: '#e34f26', category: 'frontend', level: 95 },
  { _id: 'sk_15', name: 'Bootstrap & Responsive Design', icon: 'SiBootstrap', iconColor: '#7952b3', category: 'frontend', level: 90 },

  // Backend Development
  { _id: 'sk_16', name: 'Node.js', icon: 'SiNodedotjs', iconColor: '#339933', category: 'backend', level: 90 },
  { _id: 'sk_17', name: 'Express.js', icon: 'SiExpress', iconColor: '#a855f7', category: 'backend', level: 90 },
  { _id: 'sk_18', name: 'Django (Python)', icon: 'SiDjango', iconColor: '#10b981', category: 'backend', level: 88 },
  { _id: 'sk_19', name: 'REST APIs & WebSockets', icon: 'SiPostman', iconColor: '#ff6c37', category: 'backend', level: 94 },
  { _id: 'sk_20', name: 'JWT Auth & Security', icon: 'SiJsonwebtokens', iconColor: '#d63aff', category: 'backend', level: 90 },

  // Databases
  { _id: 'sk_21', name: 'MongoDB', icon: 'SiMongodb', iconColor: '#47a248', category: 'database', level: 90 },
  { _id: 'sk_22', name: 'MySQL', icon: 'SiMysql', iconColor: '#4479a1', category: 'database', level: 88 },
  { _id: 'sk_23', name: 'SQLite', icon: 'SiSqlite', iconColor: '#38bdf8', category: 'database', level: 86 },

  // Tools & Deployment
  { _id: 'sk_24', name: 'Git & GitHub', icon: 'SiGithub', iconColor: '#f05032', category: 'tools', level: 92 },
  { _id: 'sk_25', name: 'Render & Vercel Deployment', icon: 'SiVercel', iconColor: '#cbd5e1', category: 'tools', level: 90 },
  { _id: 'sk_26', name: 'VS Code', icon: 'SiVisualstudiocode', iconColor: '#007acc', category: 'tools', level: 95 },
];

const ManageSkills = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem('portfolio_skills');
    return saved ? JSON.parse(saved) : defaultSkillsList;
  });
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: 'SiReact',
    iconColor: '#61dafb',
    category: 'frontend',
    level: 80,
  });

  const fetchSkills = async () => {
    try {
      const res = await API.get('/skills');
      if (res.data.success && res.data.data.length > 0) {
        setSkills(res.data.data);
        localStorage.setItem('portfolio_skills', JSON.stringify(res.data.data));
      }
    } catch (err) {
      // Use fallback
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: '', icon: 'SiReact', iconColor: '#61dafb', category: 'frontend', level: 80 });
    setShowModal(true);
  };

  const openEditModal = (skill) => {
    setEditingId(skill._id);
    setFormData(skill);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    const updated = skills.filter((s) => s._id !== id);
    setSkills(updated);
    localStorage.setItem('portfolio_skills', JSON.stringify(updated));
    toast.success('Skill deleted!');

    try {
      await API.delete(`/skills/${id}`);
    } catch (err) {
      // Keep optimistic update
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error('Skill name is required');
      return;
    }

    const newSkillItem = {
      _id: editingId ? editingId : `sk_${Date.now()}`,
      name: formData.name,
      icon: formData.icon,
      iconColor: formData.iconColor || '#8b5cf6',
      category: formData.category || 'frontend',
      level: Number(formData.level) || 80,
    };

    let updatedSkills;
    if (editingId) {
      updatedSkills = skills.map((s) => (s._id === editingId ? newSkillItem : s));
      toast.success('Skill updated!');
    } else {
      updatedSkills = [newSkillItem, ...skills];
      toast.success('New skill added!');
    }

    setSkills(updatedSkills);
    localStorage.setItem('portfolio_skills', JSON.stringify(updatedSkills));
    setShowModal(false);

    try {
      if (editingId) {
        await API.put(`/skills/${editingId}`, newSkillItem);
      } else {
        await API.post('/skills', newSkillItem);
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
          title="Manage Skills"
          subtitle="Add, edit, or delete skills displayed on your portfolio"
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black text-white">Technical Skills ({skills.length})</h2>
              <p className="text-xs text-slate-400">Frontend, Backend, Data Science, Databases & Tools</p>
            </div>
            <button
              onClick={openAddModal}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-lg shadow-purple-600/30 flex items-center space-x-2 active:scale-95 cursor-pointer"
            >
              <FiPlus size={16} />
              <span>Add New Skill</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div
                key={skill._id}
                className="glass-card rounded-2xl p-5 border border-white/5 flex items-center justify-between shadow-xl"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-bold"
                    style={{ color: skill.iconColor || '#8b5cf6' }}
                  >
                    <FiCode size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{skill.name}</h3>
                    <p className="text-xs text-slate-400 capitalize">{skill.category} • {skill.level}%</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditModal(skill)}
                    className="p-2 rounded-lg text-slate-400 hover:text-purple-400 hover:bg-purple-950/30 transition-colors cursor-pointer"
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(skill._id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl p-6 w-full max-w-md border border-purple-500/30 space-y-5 relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">{editingId ? 'Edit Skill' : 'Add New Skill'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Skill Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Python or React"
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Icon Preset</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#12121f] text-sm text-white border border-white/10"
                  >
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Icon Color</label>
                  <input
                    type="color"
                    value={formData.iconColor}
                    onChange={(e) => setFormData({ ...formData, iconColor: e.target.value })}
                    className="w-full h-11 p-1 rounded-xl bg-[#12121f] border border-white/10 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#12121f] text-sm text-white border border-white/10"
                >
                  <option value="datascience">Data Science & ML</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="database">Database & SQL</option>
                  <option value="analytics">Analytics & BI</option>
                  <option value="tools">Tools & DevOps</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Proficiency Level ({formData.level}%)</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-xs text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs text-white font-semibold shadow-lg shadow-purple-600/30"
                >
                  {editingId ? 'Update Skill' : 'Save Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSkills;
