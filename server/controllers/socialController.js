const asyncHandler = require('express-async-handler');
const Social = require('../models/Social');
const { getIsConnected } = require('../config/db');

const defaultSocials = [
  { _id: '1', platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'FaLinkedinIn', order: 1 },
  { _id: '2', platform: 'GitHub', url: 'https://github.com', icon: 'FaGithub', order: 2 },
  { _id: '3', platform: 'Twitter', url: 'https://twitter.com', icon: 'FaTwitter', order: 3 },
  { _id: '4', platform: 'Instagram', url: 'https://instagram.com', icon: 'FaInstagram', order: 4 },
];

const getSocials = asyncHandler(async (req, res) => {
  if (!getIsConnected()) {
    return res.json({ success: true, data: defaultSocials, dbConnected: false });
  }

  try {
    const socials = await Social.find({ visible: true }).sort({ order: 1 });
    res.json({ success: true, data: socials.length > 0 ? socials : defaultSocials, dbConnected: true });
  } catch (err) {
    res.json({ success: true, data: defaultSocials, dbConnected: false });
  }
});

const getAllSocials = asyncHandler(async (req, res) => {
  if (!getIsConnected()) return res.json({ success: true, data: defaultSocials, dbConnected: false });
  const socials = await Social.find().sort({ order: 1 });
  res.json({ success: true, data: socials.length > 0 ? socials : defaultSocials });
});

const createSocial = asyncHandler(async (req, res) => {
  if (!getIsConnected()) { res.status(503); throw new Error('Database is offline.'); }
  const social = await Social.create(req.body);
  res.status(201).json({ success: true, data: social });
});

const updateSocial = asyncHandler(async (req, res) => {
  if (!getIsConnected()) { res.status(503); throw new Error('Database is offline.'); }
  const social = await Social.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!social) { res.status(404); throw new Error('Social link not found'); }
  res.json({ success: true, data: social });
});

const deleteSocial = asyncHandler(async (req, res) => {
  if (!getIsConnected()) { res.status(503); throw new Error('Database is offline.'); }
  const social = await Social.findByIdAndDelete(req.params.id);
  if (!social) { res.status(404); throw new Error('Social link not found'); }
  res.json({ success: true, message: 'Social link deleted' });
});

module.exports = { getSocials, getAllSocials, createSocial, updateSocial, deleteSocial };
