const asyncHandler = require('express-async-handler');
const Experience = require('../models/Experience');

const getExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.find().sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: experience });
});

const createExperience = asyncHandler(async (req, res) => {
  const exp = await Experience.create(req.body);
  res.status(201).json({ success: true, data: exp });
});

const updateExperience = asyncHandler(async (req, res) => {
  const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!exp) { res.status(404); throw new Error('Experience not found'); }
  res.json({ success: true, data: exp });
});

const deleteExperience = asyncHandler(async (req, res) => {
  const exp = await Experience.findByIdAndDelete(req.params.id);
  if (!exp) { res.status(404); throw new Error('Experience not found'); }
  res.json({ success: true, message: 'Experience deleted' });
});

module.exports = { getExperience, createExperience, updateExperience, deleteExperience };
