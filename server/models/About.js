const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Your Name' },
    title: { type: String, default: 'Frontend Developer' },
    typingTexts: { type: [String], default: ['Frontend Developer', 'MERN Stack Developer', 'UI/UX Enthusiast'] },
    bio: { type: String, default: "I'm a passionate Frontend Developer with experience in building beautiful and functional web applications." },
    shortBio: { type: String, default: 'I build responsive and user-friendly websites that bring ideas to life.' },
    email: { type: String, default: 'youremail@example.com' },
    phone: { type: String, default: '' },
    location: { type: String, default: 'India' },
    freelance: { type: String, default: 'Available' },
    profileImage: { type: String, default: '' },
    aboutImage: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    resumeFileName: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('About', aboutSchema);
