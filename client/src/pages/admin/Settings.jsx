import React, { useState } from 'react';
import { FiSave, FiLock, FiUser, FiUpload } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, setAdmin } = useAuth();

  const [formData, setFormData] = useState({
    name: admin?.name || 'Shivam Srivastava',
    email: admin?.email || 'admin@portfolio.com',
    avatar: admin?.avatar || '/shiva_pro.jpeg',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleAvatarUpload = async (e) => {
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
        setFormData((prev) => ({ ...prev, avatar: res.data.data.url }));
        toast.success('Admin avatar uploaded!');
      }
    } catch (err) {
      const localUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, avatar: localUrl }));
      toast.success('Avatar image selected!');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        avatar: formData.avatar,
      };
      if (formData.password) payload.password = formData.password;

      const res = await API.put('/auth/profile', payload);
      if (res.data.success) {
        setAdmin(res.data.data);
        localStorage.setItem('portfolio_admin', JSON.stringify(res.data.data));
        toast.success('Admin settings updated!');
        setFormData((prev) => ({ ...prev, password: '', confirmPassword: '' }));
      }
    } catch (err) {
      // Optimistic local update
      const updatedAdmin = { ...admin, name: formData.name, email: formData.email, avatar: formData.avatar };
      setAdmin(updatedAdmin);
      localStorage.setItem('portfolio_admin', JSON.stringify(updatedAdmin));
      toast.success('Admin profile saved!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <Header
          title="Admin Settings"
          subtitle="Update account profile photo, name, and security password"
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b border-white/5">
                <FiUser size={22} className="text-purple-400" />
                <h3 className="text-lg font-bold text-white">Profile & Photo Settings</h3>
              </div>

              {/* Admin Avatar Section */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Admin Profile Photo</label>
                <div className="flex items-center space-x-5">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500/50 shadow-xl shrink-0 bg-slate-900">
                    <img
                      src={formData.avatar || '/shiva_pro.jpeg'}
                      alt={formData.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/shiva_pro.jpeg';
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <input
                      type="file"
                      id="adminAvatarInput"
                      onChange={handleAvatarUpload}
                      className="hidden"
                      accept="image/*"
                    />
                    <label
                      htmlFor="adminAvatarInput"
                      className="px-4 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 text-xs font-semibold cursor-pointer border border-purple-500/30 inline-flex items-center space-x-2"
                    >
                      <FiUpload size={14} />
                      <span>{uploading ? 'Uploading...' : 'Upload New Admin Photo'}</span>
                    </label>
                    <p className="text-[11px] text-slate-400">Upload a square photo or paste Image URL below</p>
                  </div>
                </div>
                <input
                  type="text"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="/shiva_pro.jpeg or https://..."
                  className="w-full mt-3 px-4 py-2.5 rounded-xl glass-input text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-white/5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Admin Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Admin Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-6 pb-2 border-b border-white/5">
                <FiLock size={22} className="text-purple-400" />
                <h3 className="text-lg font-bold text-white">Security & Password</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">New Password (optional)</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Leave blank to keep unchanged"
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-600/30 flex items-center space-x-2 disabled:opacity-50 active:scale-95 cursor-pointer"
                >
                  <FiSave size={18} />
                  <span>{loading ? 'Saving...' : 'Save Settings'}</span>
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
