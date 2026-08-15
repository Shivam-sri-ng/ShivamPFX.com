import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiBriefcase, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import API from '../../api/axios';

const defaultExperienceList = [
  {
    _id: 'exp_1',
    company: 'Enterprise Solutions Tech',
    position: 'Senior Full Stack & Data Engineer',
    location: 'Remote / Hybrid',
    startDate: '2023',
    endDate: 'Present',
    current: true,
    description: 'Engineering scalable MERN stack web applications, designing SQL/NoSQL schemas, and deploying ML pipelines.',
  },
  {
    _id: 'exp_2',
    company: 'Analytics Solutions Corp',
    position: 'Data Analyst / Scientist Intern',
    location: 'Hybrid',
    startDate: '2022',
    endDate: '2023',
    current: false,
    description: 'Developing machine learning models, statistical analysis, and interactive Power BI dashboards.',
  },
];

const ManageExperience = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [experience, setExperience] = useState(() => {
    const saved = localStorage.getItem('portfolio_experience');
    return saved ? JSON.parse(saved) : defaultExperienceList;
  });
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: 'Present',
    description: '',
    current: true,
  });

  const fetchExperience = async () => {
    try {
      const res = await API.get('/experience');
      if (res.data.success && res.data.data.length > 0) {
        setExperience(res.data.data);
        localStorage.setItem('portfolio_experience', JSON.stringify(res.data.data));
      }
    } catch (err) {
      // Use state / localStorage
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ company: '', position: '', startDate: '', endDate: 'Present', description: '', current: true });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingId(item._id);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this experience entry?')) return;
    const updated = experience.filter((e) => e._id !== id);
    setExperience(updated);
    localStorage.setItem('portfolio_experience', JSON.stringify(updated));
    toast.success('Experience deleted!');

    try {
      await API.delete(`/experience/${id}`);
    } catch (err) {
      // Optimistic update retained
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.company || !formData.position) {
      toast.error('Company and position are required');
      return;
    }

    const newItem = {
      _id: editingId ? editingId : `exp_${Date.now()}`,
      company: formData.company,
      position: formData.position,
      startDate: formData.startDate || '2023',
      endDate: formData.endDate || 'Present',
      description: formData.description || '',
      current: formData.current,
    };

    let updatedExp;
    if (editingId) {
      updatedExp = experience.map((e) => (e._id === editingId ? newItem : e));
      toast.success('Experience updated!');
    } else {
      updatedExp = [newItem, ...experience];
      toast.success('New experience added!');
    }

    setExperience(updatedExp);
    localStorage.setItem('portfolio_experience', JSON.stringify(updatedExp));
    setShowModal(false);

    try {
      if (editingId) {
        await API.put(`/experience/${editingId}`, newItem);
      } else {
        await API.post('/experience', newItem);
      }
    } catch (err) {
      // Retain optimistic UI update
    }
  };

  return (
    <div className="min-h-screen relative flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <Header
          title="Manage Experience"
          subtitle="Add or edit your work history and positions"
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black text-white">Work Experience ({experience.length})</h2>
              <p className="text-xs text-slate-400">Career timeline & employment history</p>
            </div>
            <button
              onClick={openAddModal}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-lg shadow-purple-600/30 flex items-center space-x-2 active:scale-95 cursor-pointer"
            >
              <FiPlus size={16} />
              <span>Add Experience</span>
            </button>
          </div>

          <div className="space-y-4">
            {experience.map((item) => (
              <div key={item._id} className="glass-card rounded-2xl p-5 border border-white/5 flex items-center justify-between shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-purple-950/40 text-purple-400">
                    <FiBriefcase size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{item.position}</h3>
                    <p className="text-xs text-purple-400 font-semibold">{item.company}</p>
                    <p className="text-xs text-slate-400 mt-1">{item.startDate} - {item.endDate}</p>
                    {item.description && <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.description}</p>}
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button onClick={() => openEditModal(item)} className="p-2 text-slate-400 hover:text-purple-400 cursor-pointer">
                    <FiEdit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="p-2 text-slate-400 hover:text-red-400 cursor-pointer">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl p-6 w-full max-w-md border border-purple-500/30 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">{editingId ? 'Edit Experience' : 'Add Experience'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Company *</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Enterprise Solutions Tech"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Position *</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="e.g. Senior Full Stack & Data Engineer"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    placeholder="2023"
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">End Date</label>
                  <input
                    type="text"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    placeholder="Present"
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Responsibilities & tech stack used..."
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white resize-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-white/10">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl border border-white/10 text-xs text-slate-400">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs text-white font-semibold">Save Experience</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageExperience;
