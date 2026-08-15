const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema(
  {
    institution: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    field: { type: String, default: '' },
    startYear: { type: String, required: true },
    endYear: { type: String, default: 'Present' },
    current: { type: Boolean, default: false },
    description: { type: String, default: '' },
    grade: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Education', educationSchema);
