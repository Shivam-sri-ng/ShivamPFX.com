const asyncHandler = require('express-async-handler');
const Education = require('../models/Education');

const getEducation = asyncHandler(async (req, res) => {
  const education = await Education.find().sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: education });
});

const createEducation = asyncHandler(async (req, res) => {
  const edu = await Education.create(req.body);
  res.status(201).json({ success: true, data: edu });
});

const updateEducation = asyncHandler(async (req, res) => {
  const edu = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!edu) { res.status(404); throw new Error('Education not found'); }
  res.json({ success: true, data: edu });
});

const deleteEducation = asyncHandler(async (req, res) => {
  const edu = await Education.findByIdAndDelete(req.params.id);
  if (!edu) { res.status(404); throw new Error('Education not found'); }
  res.json({ success: true, message: 'Education deleted' });
});

module.exports = { getEducation, createEducation, updateEducation, deleteEducation };
