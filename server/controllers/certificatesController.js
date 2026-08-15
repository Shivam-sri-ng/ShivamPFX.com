const asyncHandler = require('express-async-handler');
const Certificate = require('../models/Certificate');

const getCertificates = asyncHandler(async (req, res) => {
  const certs = await Certificate.find().sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: certs });
});

const createCertificate = asyncHandler(async (req, res) => {
  const cert = await Certificate.create(req.body);
  res.status(201).json({ success: true, data: cert });
});

const updateCertificate = asyncHandler(async (req, res) => {
  const cert = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!cert) { res.status(404); throw new Error('Certificate not found'); }
  res.json({ success: true, data: cert });
});

const deleteCertificate = asyncHandler(async (req, res) => {
  const cert = await Certificate.findByIdAndDelete(req.params.id);
  if (!cert) { res.status(404); throw new Error('Certificate not found'); }
  res.json({ success: true, message: 'Certificate deleted' });
});

module.exports = { getCertificates, createCertificate, updateCertificate, deleteCertificate };
