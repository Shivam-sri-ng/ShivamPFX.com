const asyncHandler = require('express-async-handler');
const Skill = require('../models/Skill');
const { getIsConnected } = require('../config/db');

const defaultSkills = [
  // Languages
  { _id: '1', name: 'Python', icon: 'SiPython', iconColor: '#3776ab', category: 'datascience', level: 95, order: 1 },
  { _id: '2', name: 'JavaScript (ES6+)', icon: 'SiJavascript', iconColor: '#f7df1e', category: 'frontend', level: 92, order: 2 },
  { _id: '3', name: 'TypeScript', icon: 'SiTypescript', iconColor: '#3178c6', category: 'frontend', level: 85, order: 3 },
  { _id: '4', name: 'Java', icon: 'FaJava', iconColor: '#5382a1', category: 'backend', level: 80, order: 4 },
  { _id: '5', name: 'C', icon: 'SiC', iconColor: '#a8b9cc', category: 'backend', level: 78, order: 5 },
  { _id: '6', name: 'SQL', icon: 'SiPostgresql', iconColor: '#4169e1', category: 'database', level: 90, order: 6 },

  // Data Science & Analytics
  { _id: '7', name: 'Pandas & NumPy', icon: 'SiPandas', iconColor: '#38bdf8', category: 'datascience', level: 94, order: 7 },
  { _id: '8', name: 'Matplotlib & Seaborn', icon: 'SiPython', iconColor: '#ff6f61', category: 'datascience', level: 88, order: 8 },
  { _id: '9', name: 'Machine Learning', icon: 'SiScikitlearn', iconColor: '#f7931e', category: 'ml', level: 90, order: 9 },
  { _id: '10', name: 'LLMs & RAG Architectures', icon: 'SiOpenai', iconColor: '#10a37f', category: 'ml', level: 88, order: 10 },
  { _id: '11', name: 'Exploratory Data Analysis (EDA)', icon: 'SiPython', iconColor: '#06b6d4', category: 'analytics', level: 92, order: 11 },
  { _id: '12', name: 'Statistical Analysis', icon: 'SiPython', iconColor: '#8b5cf6', category: 'analytics', level: 86, order: 12 },

  // Frontend Development
  { _id: '13', name: 'React.js', icon: 'SiReact', iconColor: '#61dafb', category: 'frontend', level: 92, order: 13 },
  { _id: '14', name: 'HTML5 & CSS3', icon: 'SiHtml5', iconColor: '#e34f26', category: 'frontend', level: 95, order: 14 },
  { _id: '15', name: 'Bootstrap & Responsive Design', icon: 'SiBootstrap', iconColor: '#7952b3', category: 'frontend', level: 90, order: 15 },

  // Backend Development
  { _id: '16', name: 'Node.js', icon: 'SiNodedotjs', iconColor: '#339933', category: 'backend', level: 90, order: 16 },
  { _id: '17', name: 'Express.js', icon: 'SiExpress', iconColor: '#a855f7', category: 'backend', level: 90, order: 17 },
  { _id: '18', name: 'Django (Python)', icon: 'SiDjango', iconColor: '#10b981', category: 'backend', level: 88, order: 18 },
  { _id: '19', name: 'REST APIs & WebSockets', icon: 'SiPostman', iconColor: '#ff6c37', category: 'backend', level: 94, order: 19 },
  { _id: '20', name: 'JWT Auth & Security', icon: 'SiJsonwebtokens', iconColor: '#d63aff', category: 'backend', level: 90, order: 20 },

  // Databases
  { _id: '21', name: 'MongoDB', icon: 'SiMongodb', iconColor: '#47a248', category: 'database', level: 90, order: 21 },
  { _id: '22', name: 'MySQL', icon: 'SiMysql', iconColor: '#4479a1', category: 'database', level: 88, order: 22 },
  { _id: '23', name: 'SQLite', icon: 'SiSqlite', iconColor: '#38bdf8', category: 'database', level: 86, order: 23 },

  // DevOps & Tools
  { _id: '24', name: 'Git & GitHub', icon: 'SiGithub', iconColor: '#f05032', category: 'tools', level: 92, order: 24 },
  { _id: '25', name: 'Render & Vercel Deployment', icon: 'SiVercel', iconColor: '#cbd5e1', category: 'tools', level: 90, order: 25 },
  { _id: '26', name: 'VS Code', icon: 'SiVisualstudiocode', iconColor: '#007acc', category: 'tools', level: 95, order: 26 },
];

const getSkills = asyncHandler(async (req, res) => {
  if (!getIsConnected()) {
    return res.json({ success: true, data: defaultSkills, dbConnected: false });
  }

  try {
    const skills = await Skill.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: skills.length > 0 ? skills : defaultSkills, dbConnected: true });
  } catch (err) {
    res.json({ success: true, data: defaultSkills, dbConnected: false });
  }
});

const createSkill = asyncHandler(async (req, res) => {
  if (!getIsConnected()) { res.status(503); throw new Error('Database is offline. Connect MongoDB to create skills.'); }
  const skill = await Skill.create(req.body);
  res.status(201).json({ success: true, data: skill });
});

const updateSkill = asyncHandler(async (req, res) => {
  if (!getIsConnected()) { res.status(503); throw new Error('Database is offline.'); }
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!skill) { res.status(404); throw new Error('Skill not found'); }
  res.json({ success: true, data: skill });
});

const deleteSkill = asyncHandler(async (req, res) => {
  if (!getIsConnected()) { res.status(503); throw new Error('Database is offline.'); }
  const skill = await Skill.findByIdAndDelete(req.params.id);
  if (!skill) { res.status(404); throw new Error('Skill not found'); }
  res.json({ success: true, message: 'Skill deleted' });
});

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
