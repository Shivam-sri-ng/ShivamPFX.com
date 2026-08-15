import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiShare2, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import API from '../../api/axios';

const defaultSocialsList = [
  { _id: 'soc_1', platform: 'LinkedIn', url: 'https://linkedin.com/in/shivam-srivastava', icon: 'FaLinkedinIn' },
  { _id: 'soc_2', platform: 'GitHub', url: 'https://github.com/shivam-srivastava', icon: 'FaGithub' },
  { _id: 'soc_3', platform: 'Twitter', url: 'https://twitter.com', icon: 'FaTwitter' },
];

const ManageSocial = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [socials, setSocials] = useState(() => {
    const saved = localStorage.getItem('portfolio_socials');
    return saved ? JSON.parse(saved) : defaultSocialsList;
  });
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    platform: '',
    url: '',
    icon: 'FaLinkedinIn',
  });

  const fetchSocials = async () => {
    try {
      const res = await API.get('/social/all');
      if (res.data.success && res.data.data.length > 0) {
        setSocials(res.data.data);
        localStorage.setItem('portfolio_socials', JSON.stringify(res.data.data));
      }
    } catch (err) {
      // Use state / localStorage
    }
  };

  useEffect(() => {
    fetchSocials();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ platform: '', url: '', icon: 'FaLinkedinIn' });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingId(item._id);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this social link?')) return;
    const updated = socials.filter((s) => s._id !== id);
    setSocials(updated);
    localStorage.setItem('portfolio_socials', JSON.stringify(updated));
    toast.success('Social link deleted!');

    try {
      await API.delete(`/social/${id}`);
    } catch (err) {
      // Optimistic update retained
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.platform || !formData.url) {
      toast.error('Platform and URL are required');
      return;
    }

    const newItem = {
      _id: editingId ? editingId : `soc_${Date.now()}`,
      platform: formData.platform,
      url: formData.url,
      icon: formData.icon || 'FaLinkedinIn',
    };

    let updatedSocials;
    if (editingId) {
      updatedSocials = socials.map((s) => (s._id === editingId ? newItem : s));
      toast.success('Social link updated!');
    } else {
      updatedSocials = [newItem, ...socials];
      toast.success('New social link added!');
    }

    setSocials(updatedSocials);
    localStorage.setItem('portfolio_socials', JSON.stringify(updatedSocials));
    setShowModal(false);

    try {
      if (editingId) {
        await API.put(`/social/${editingId}`, newItem);
      } else {
        await API.post('/social', newItem);
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
          title="Manage Social Links"
          subtitle="Update LinkedIn, GitHub, Twitter, and Instagram URLs"
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black text-white">Social Links ({socials.length})</h2>
              <p className="text-xs text-slate-400">Profiles connected to Hero & Footer sections</p>
            </div>
            <button
              onClick={openAddModal}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-lg shadow-purple-600/30 flex items-center space-x-2 active:scale-95 cursor-pointer"
            >
              <FiPlus size={16} />
              <span>Add Social Link</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {socials.map((item) => (
              <div key={item._id} className="glass-card rounded-2xl p-5 border border-white/5 flex items-center justify-between shadow-xl">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="p-3 rounded-xl bg-purple-950/40 text-purple-400 shrink-0">
                    <FiShare2 size={20} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-white">{item.platform}</h3>
                    <a href={item.url} target="_blank" rel="noreferrer" className="text-xs text-purple-400 truncate max-w-[150px] block hover:underline">
                      {item.url}
                    </a>
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
              <h3 className="text-lg font-bold text-white">{editingId ? 'Edit Social Link' : 'Add Social Link'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Platform Name *</label>
                <input
                  type="text"
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  placeholder="e.g. LinkedIn or Kaggle"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">URL *</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Icon Preset</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#12121f] text-sm text-white border border-white/10"
                >
                  <option value="FaLinkedinIn">LinkedIn</option>
                  <option value="FaGithub">GitHub</option>
                  <option value="FaTwitter">Twitter</option>
                  <option value="FaInstagram">Instagram</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-white/10">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl border border-white/10 text-xs text-slate-400">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs text-white font-semibold">Save Link</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSocial;
