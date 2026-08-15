import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiUpload, FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import API from '../../api/axios';

const defaultAboutData = {
  name: 'Shivam Srivastava',
  title: 'Full Stack Engineer & Data Analyst / Scientist',
  shortBio: 'Versatile Full Stack Engineer and Data Analyst/Scientist specializing in scalable web applications, predictive machine learning models, and interactive data analytics dashboards.',
  bio: 'I am Shivam Srivastava, a results-driven Full Stack Engineer and Data Analyst / Scientist. I bridge the gap between robust software engineering and high-impact data analytics. With expertise in MERN stack web development, Python data science ecosystem (Pandas, Scikit-Learn, TensorFlow, SQL, Power BI/Tableau), and cloud architecture, I design end-to-end data-driven applications that transform complex data into actionable business intelligence.',
  email: 'shivam.srivastava.dev@gmail.com',
  phone: '+91 98765 43210',
  location: 'India',
  freelance: 'Available for Hire',
  profileImage: '/profile.jpg',
  aboutImage: '/about-photo.jpg',
  resumeUrl: '/Shivam_2.0_CV.pdf',
};

const ManageAbout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('portfolio_about');
    return saved ? JSON.parse(saved) : defaultAboutData;
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await API.get('/about');
        if (res.data.success && res.data.data) {
          setFormData(res.data.data);
          localStorage.setItem('portfolio_about', JSON.stringify(res.data.data));
        }
      } catch (err) {
        // Fallback
      }
    };
    fetchAbout();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e, field) => {
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
        setFormData((prev) => ({ ...prev, [field]: res.data.data.url }));
        toast.success('Image uploaded successfully!');
      }
    } catch (err) {
      const localUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, [field]: localUrl }));
      toast.success('Local image selected!');
    } finally {
      setUploading(false);
    }
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('resume', file);

    setUploading(true);
    try {
      const res = await API.post('/upload/resume', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        setFormData((prev) => ({ ...prev, resumeUrl: res.data.data.url }));
        toast.success('CV / Resume PDF uploaded successfully!');
      }
    } catch (err) {
      const localUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, resumeUrl: localUrl }));
      toast.success('CV file attached!');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    // Save locally immediately
    localStorage.setItem('portfolio_about', JSON.stringify(formData));
    toast.success('About section updated successfully!');

    try {
      await API.put('/about', formData);
    } catch (err) {
      // Optimistic update retained
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen relative flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <Header
          title="Edit About Section"
          subtitle="Update your personal details, profile picture, and bio"
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile & About Image Previews */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Profile Avatar Image</label>
                  <div className="flex items-center space-x-4">
                    <img
                      src={formData.profileImage || '/profile.jpg'}
                      alt="Avatar Preview"
                      className="w-20 h-20 rounded-full object-cover border-2 border-purple-500/40 shrink-0"
                      onError={(e) => { e.target.onerror = null; e.target.src = '/profile.jpg'; }}
                    />
                    <div>
                      <input
                        type="file"
                        id="profileImgInput"
                        onChange={(e) => handleImageUpload(e, 'profileImage')}
                        className="hidden"
                        accept="image/*"
                      />
                      <label
                        htmlFor="profileImgInput"
                        className="px-4 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 text-xs font-semibold cursor-pointer border border-purple-500/30 inline-flex items-center space-x-2"
                      >
                        <FiUpload size={14} />
                        <span>{uploading ? 'Uploading...' : 'Upload Avatar'}</span>
                      </label>
                      <p className="text-[11px] text-slate-500 mt-1">Or paste URL below</p>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="profileImage"
                    value={formData.profileImage}
                    onChange={handleChange}
                    placeholder="/profile.jpg"
                    className="w-full mt-3 px-4 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">About Section Image</label>
                  <div className="flex items-center space-x-4">
                    <img
                      src={formData.aboutImage || '/about-photo.jpg'}
                      alt="About Image Preview"
                      className="w-20 h-20 rounded-xl object-cover border border-white/10 shrink-0"
                      onError={(e) => { e.target.onerror = null; e.target.src = '/about-photo.jpg'; }}
                    />
                    <div>
                      <input
                        type="file"
                        id="aboutImgInput"
                        onChange={(e) => handleImageUpload(e, 'aboutImage')}
                        className="hidden"
                        accept="image/*"
                      />
                      <label
                        htmlFor="aboutImgInput"
                        className="px-4 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 text-xs font-semibold cursor-pointer border border-purple-500/30 inline-flex items-center space-x-2"
                      >
                        <FiUpload size={14} />
                        <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                      </label>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="aboutImage"
                    value={formData.aboutImage}
                    onChange={handleChange}
                    placeholder="/about-photo.jpg"
                    className="w-full mt-3 px-4 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>
              </div>

              {/* Text details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-white/5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Job Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Short Bio (Hero section subtitle) *</label>
                <input
                  type="text"
                  name="shortBio"
                  value={formData.shortBio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Full Bio (About Me paragraph) *</label>
                <textarea
                  name="bio"
                  rows="4"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Freelance Status</label>
                  <input
                    type="text"
                    name="freelance"
                    value={formData.freelance}
                    onChange={handleChange}
                    placeholder="Available for Hire"
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <label className="block text-xs font-semibold text-slate-300 mb-2">CV / Resume PDF File URL</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    name="resumeUrl"
                    value={formData.resumeUrl || ''}
                    onChange={handleChange}
                    placeholder="/shivam-srivastava-cv.pdf or Google Drive link"
                    className="flex-1 px-4 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                  <input
                    type="file"
                    id="cvFileInput"
                    onChange={handlePdfUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                  />
                  <label
                    htmlFor="cvFileInput"
                    className="px-4 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 text-xs font-semibold cursor-pointer border border-purple-500/30 flex items-center space-x-1.5 shrink-0"
                  >
                    <FiUpload size={14} />
                    <span>{uploading ? 'Uploading...' : 'Upload PDF CV'}</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-600/30 flex items-center space-x-2 disabled:opacity-50 active:scale-95 cursor-pointer"
                >
                  <FiSave size={18} />
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default ManageAbout;
