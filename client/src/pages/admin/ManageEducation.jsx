import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiAward, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import API from '../../api/axios';

const defaultEducationList = [
  {
    _id: 'edu_1',
    institution: 'Technological University',
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Computer Science & Data Science',
    startYear: '2019',
    endYear: '2023',
    grade: 'First Class with Distinction',
  },
];

const ManageEducation = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [education, setEducation] = useState(() => {
    const saved = localStorage.getItem('portfolio_education');
    return saved ? JSON.parse(saved) : defaultEducationList;
  });
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field: '',
    startYear: '',
    endYear: '',
    grade: '',
  });

  const fetchEducation = async () => {
    try {
      const res = await API.get('/education');
      if (res.data.success && res.data.data.length > 0) {
        setEducation(res.data.data);
        localStorage.setItem('portfolio_education', JSON.stringify(res.data.data));
      }
    } catch (err) {
      // Use state / localStorage
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ institution: '', degree: '', field: '', startYear: '', endYear: '', grade: '' });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingId(item._id);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete education item?')) return;
    const updated = education.filter((e) => e._id !== id);
    setEducation(updated);
    localStorage.setItem('portfolio_education', JSON.stringify(updated));
    toast.success('Education deleted!');

    try {
      await API.delete(`/education/${id}`);
    } catch (err) {
      // Optimistic state update retained
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.institution || !formData.degree) {
      toast.error('Institution and degree are required');
      return;
    }

    const newItem = {
      _id: editingId ? editingId : `edu_${Date.now()}`,
      institution: formData.institution,
      degree: formData.degree,
      field: formData.field || 'Computer Science & Engineering',
      startYear: formData.startYear || '2019',
      endYear: formData.endYear || '2023',
      grade: formData.grade || 'First Class',
    };

    let updatedEdu;
    if (editingId) {
      updatedEdu = education.map((e) => (e._id === editingId ? newItem : e));
      toast.success('Education updated!');
    } else {
      updatedEdu = [newItem, ...education];
      toast.success('New education added!');
    }

    setEducation(updatedEdu);
    localStorage.setItem('portfolio_education', JSON.stringify(updatedEdu));
    setShowModal(false);

    try {
      if (editingId) {
        await API.put(`/education/${editingId}`, newItem);
      } else {
        await API.post('/education', newItem);
      }
    } catch (err) {
      // Optimistic update retained
    }
  };

  return (
    <div className="min-h-screen relative flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <Header
          title="Manage Education"
          subtitle="Add or edit your academic background"
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black text-white">Education ({education.length})</h2>
              <p className="text-xs text-slate-400 font-medium">Degrees, universities & academic honors</p>
            </div>
            <button
              onClick={openAddModal}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-lg shadow-purple-600/30 flex items-center space-x-2 active:scale-95 cursor-pointer"
            >
              <FiPlus size={16} />
              <span>Add Education</span>
            </button>
          </div>

          <div className="space-y-4">
            {education.map((item) => (
              <div key={item._id} className="glass-card rounded-2xl p-5 border border-white/5 flex items-center justify-between shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-purple-950/40 text-purple-400">
                    <FiAward size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{item.degree}</h3>
                    <p className="text-xs text-purple-400 font-semibold">{item.institution}</p>
                    <p className="text-xs text-slate-400 mt-1">{item.startYear} - {item.endYear || 'Present'}</p>
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
              <h3 className="text-lg font-bold text-white">{editingId ? 'Edit Education' : 'Add Education'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Institution *</label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="e.g. Technological University"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Degree *</label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="e.g. Bachelor of Technology (B.Tech)"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Start Year</label>
                  <input
                    type="text"
                    value={formData.startYear}
                    onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
                    placeholder="2019"
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">End Year</label>
                  <input
                    type="text"
                    value={formData.endYear}
                    onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
                    placeholder="2023"
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-white/10">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl border border-white/10 text-xs text-slate-400">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs text-white font-semibold">Save Education</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEducation;
