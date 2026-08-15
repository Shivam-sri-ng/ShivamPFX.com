import React, { useState, useEffect } from 'react';
import { FiTrash2, FiMail, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import API from '../../api/axios';

const Messages = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await API.get('/contact');
      if (res.data.success) {
        setMessages(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to load messages');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await API.patch(`/contact/${id}`, { status });
      toast.success(`Marked as ${status}`);
      fetchMessages();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await API.delete(`/contact/${id}`);
      toast.success('Message deleted!');
      fetchMessages();
    } catch (err) {
      toast.error('Failed to delete message');
    }
  };

  return (
    <div className="min-h-screen bg-[#09090e] text-slate-100 flex">
      <Sidebar messageCount={messages.length} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <Header
          title="Contact Messages"
          subtitle="View and manage form submissions from visitors"
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-white">All Messages ({messages.length})</h2>
          </div>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="glass-card rounded-2xl p-8 text-center text-slate-400">
                <FiMail size={40} className="mx-auto mb-3 text-purple-400" />
                <p className="text-sm font-semibold">No messages received yet.</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg._id} className="glass-card rounded-2xl p-5 border border-white/5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-base font-bold text-white">{msg.name}</h3>
                        <span className="text-xs text-purple-400">({msg.email})</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-300 mt-0.5">Subject: {msg.subject}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <select
                        value={msg.status}
                        onChange={(e) => handleUpdateStatus(msg._id, e.target.value)}
                        className="bg-[#12121f] text-xs text-slate-300 border border-white/10 rounded-xl px-3 py-1.5 focus:outline-none"
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>

                      <button onClick={() => handleDelete(msg._id)} className="p-2 text-slate-400 hover:text-red-400">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                  <p className="text-[10px] text-slate-500">{new Date(msg.createdAt).toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Messages;
