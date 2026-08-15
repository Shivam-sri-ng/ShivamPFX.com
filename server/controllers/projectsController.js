const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');
const { getIsConnected } = require('../config/db');

const defaultProjects = [
  {
    _id: '1',
    title: 'E-Commerce Website',
    description: 'A responsive e-commerce website built with React and Tailwind CSS featuring dynamic cart management.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    technologies: ['React', 'Tailwind CSS', 'Redux'],
    category: 'Web App',
    featured: true,
  },
  {
    _id: '2',
    title: 'Task Manager App',
    description: 'A task management app to organize tasks and boost productivity with kanban layout.',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    technologies: ['React', 'Node.js', 'MongoDB'],
    category: 'Web App',
    featured: true,
  },
  {
    _id: '3',
    title: 'Portfolio Website',
    description: 'A personal portfolio website showcasing my skills and projects with sleek dark design.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    technologies: ['React', 'Framer Motion', 'Express'],
    category: 'Web App',
    featured: true,
  },
];

const getProjects = asyncHandler(async (req, res) => {
  if (!getIsConnected()) {
    return res.json({ success: true, data: defaultProjects, dbConnected: false });
  }

  try {
    const projects = await Project.find().sort({ featured: -1, order: 1, createdAt: -1 });
    res.json({ success: true, data: projects.length > 0 ? projects : defaultProjects, dbConnected: true });
  } catch (err) {
    res.json({ success: true, data: defaultProjects, dbConnected: false });
  }
});

const getProject = asyncHandler(async (req, res) => {
  if (!getIsConnected()) {
    const project = defaultProjects.find((p) => p._id === req.params.id) || defaultProjects[0];
    return res.json({ success: true, data: project });
  }
  const project = await Project.findById(req.params.id);
  if (!project) { res.status(404); throw new Error('Project not found'); }
  res.json({ success: true, data: project });
});

const createProject = asyncHandler(async (req, res) => {
  if (!getIsConnected()) { res.status(503); throw new Error('Database is offline.'); }
  const project = await Project.create(req.body);
  res.status(201).json({ success: true, data: project });
});

const updateProject = asyncHandler(async (req, res) => {
  if (!getIsConnected()) { res.status(503); throw new Error('Database is offline.'); }
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!project) { res.status(404); throw new Error('Project not found'); }
  res.json({ success: true, data: project });
});

const deleteProject = asyncHandler(async (req, res) => {
  if (!getIsConnected()) { res.status(503); throw new Error('Database is offline.'); }
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) { res.status(404); throw new Error('Project not found'); }
  res.json({ success: true, message: 'Project deleted' });
});

module.exports = { getProjects, getProject, createProject, updateProject, deleteProject };
