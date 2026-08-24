const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

// Inline schema for visitor daily tracking
const VisitorSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // YYYY-MM-DD
  count: { type: Number, default: 0 },
});
const Visitor = mongoose.models.Visitor || mongoose.model('Visitor', VisitorSchema);

// GET /api/visitors — return total all-time count
const getVisitorCount = asyncHandler(async (req, res) => {
  const result = await Visitor.aggregate([{ $group: { _id: null, total: { $sum: '$count' } } }]);
  const count = result[0]?.total || 0;
  res.json({ success: true, count });
});

// POST /api/visitors/hit — increment today's count (called from portfolio frontend)
const recordVisit = asyncHandler(async (req, res) => {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  await Visitor.findOneAndUpdate(
    { date: today },
    { $inc: { count: 1 } },
    { upsert: true, new: true }
  );
  const result = await Visitor.aggregate([{ $group: { _id: null, total: { $sum: '$count' } } }]);
  const count = result[0]?.total || 0;
  res.json({ success: true, count });
});

module.exports = { getVisitorCount, recordVisit };
