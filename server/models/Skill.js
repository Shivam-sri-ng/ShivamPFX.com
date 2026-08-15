const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    icon: { type: String, default: '' }, // URL or SVG string
    iconColor: { type: String, default: '#7c3aed' },
    category: { type: String, enum: ['frontend', 'backend', 'database', 'datascience', 'analytics', 'ml', 'tools', 'other'], default: 'frontend' },
    level: { type: Number, min: 1, max: 100, default: 80 }, // proficiency percentage
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
