const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true },
    email:   { type: String, required: true, lowercase: true, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    status:  { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  },
  { timestamps: true, collection: 'messages' }  // explicitly named 'messages' in MongoDB
);

module.exports = mongoose.model('Message', messageSchema);
