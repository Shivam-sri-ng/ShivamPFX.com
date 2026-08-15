import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiUser, FiMessageSquare, FiBookOpen } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../../api/axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/contact', formData);
      if (res.data.success) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner matching screenshot 4 & 5 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl p-6 sm:p-10 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border border-purple-500/20 shadow-2xl shadow-purple-950/20 backdrop-blur-xl bg-[#0d0d18]/80"
        >
          <div className="flex items-center space-x-4 text-left">
            <div className="p-4 rounded-2xl bg-purple-900/40 text-purple-400 border border-purple-500/30 shrink-0 shadow-lg">
              <FiSend size={28} />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Let's Work Together
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Have a project or data engineering role in mind? Let's build something exceptional together.
              </p>
            </div>
          </div>

          <motion.a
            whileHover={{ scale: 1.05, translateY: -2 }}
            whileTap={{ scale: 0.95 }}
            href="#contact-form"
            className="w-full md:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all duration-300 shadow-xl shadow-purple-600/35 flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
          >
            <span>Contact Me</span>
            <FiSend size={16} />
          </motion.a>
        </motion.div>

        {/* Contact Form Container */}
        <div id="contact-form" className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-6 sm:p-10 border border-purple-500/20 shadow-2xl backdrop-blur-xl bg-[#0c0c16]/90"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Send Me a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Message</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
                Fill out the details below and I will get back to you promptly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Your Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-3.5 top-3.5 text-purple-400" size={18} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/30 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Your Email</label>
                  <div className="relative">
                    <FiMail className="absolute left-3.5 top-3.5 text-purple-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/30 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Subject</label>
                <div className="relative">
                  <FiBookOpen className="absolute left-3.5 top-3.5 text-purple-400" size={18} />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/30 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Message</label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-3.5 top-3.5 text-purple-400" size={18} />
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, idea, or role..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/30 transition-all resize-none"
                    required
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all duration-300 shadow-xl shadow-purple-600/40 flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FiSend size={18} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
