const asyncHandler = require('express-async-handler');
const About = require('../models/About');
const { getIsConnected } = require('../config/db');

const defaultAbout = {
  name: 'Shivam Srivastava',
  title: 'Full Stack Engineer & Data Analyst / Scientist',
  typingTexts: [
    'Full Stack Engineer',
    'Data Analyst & Scientist',
    'MERN Stack Specialist',
    'Machine Learning & AI Enthusiast',
    'Python & SQL Analytics',
  ],
  shortBio: 'Versatile Full Stack Engineer and Data Analyst/Scientist specializing in scalable web applications, predictive machine learning models, and interactive data analytics dashboards.',
  bio: 'I am Shivam Srivastava, a results-driven Full Stack Engineer and Data Analyst / Scientist. I bridge the gap between robust software engineering and high-impact data analytics. With expertise in MERN stack web development, Python data science ecosystem (Pandas, Scikit-Learn, TensorFlow, SQL, Power BI/Tableau), and cloud architecture, I design end-to-end data-driven applications that transform complex data into actionable business intelligence.',
  email: 'shivamsri.srivastava2@gmail.com',
  phone: '+91 9170845849',
  location: 'India',
  freelance: 'Available for Hire',
  profileImage: '/shiva_pro.jpeg',
  aboutImage: '/shiva_pro.jpeg',
  resumeUrl: '/Shivam_2.0_CV.pdf',
};

// @desc    Get about info
// @route   GET /api/about
// @access  Public
const getAbout = asyncHandler(async (req, res) => {
  if (!getIsConnected()) {
    return res.json({ success: true, data: defaultAbout, dbConnected: false });
  }

  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create(defaultAbout);
    } else {
      // Ensure defaults are populated
      let needsSave = false;
      if (!about.name || about.name === 'Your Name') {
        about.name = defaultAbout.name;
        needsSave = true;
      }
      if (!about.profileImage || about.profileImage.includes('unsplash')) {
        about.profileImage = defaultAbout.profileImage;
        needsSave = true;
      }
      if (!about.aboutImage || about.aboutImage.includes('unsplash')) {
        about.aboutImage = defaultAbout.aboutImage;
        needsSave = true;
      }
      if (needsSave) {
        await about.save();
      }
    }
    res.json({ success: true, data: about, dbConnected: true });
  } catch (error) {
    res.json({ success: true, data: defaultAbout, dbConnected: false });
  }
});

// @desc    Update about info
// @route   PUT /api/about
// @access  Private/Admin
const updateAbout = asyncHandler(async (req, res) => {
  if (!getIsConnected()) {
    return res.json({ success: true, data: req.body, dbConnected: false });
  }

  try {
    let about = await About.findOne();
    if (about) {
      about = await About.findByIdAndUpdate(about._id, req.body, { new: true, runValidators: true });
    } else {
      about = await About.create(req.body);
    }
    res.json({ success: true, data: about, dbConnected: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = {
  getAbout,
  updateAbout,
};
