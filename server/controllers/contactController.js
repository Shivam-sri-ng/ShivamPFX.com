const asyncHandler = require('express-async-handler');
const Contact = require('../models/Contact');
const { getIsConnected } = require('../config/db');

const defaultMessages = [
  {
    _id: '1',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    subject: 'Work Inquiry',
    message: "I'd like to know more about your work...",
    status: 'new',
    createdAt: new Date(),
  },
  {
    _id: '2',
    name: 'Rohit Verma',
    email: 'rohitverma@example.com',
    subject: 'Feedback',
    message: 'Great portfolio! Love your projects.',
    status: 'read',
    createdAt: new Date(),
  },
  {
    _id: '3',
    name: 'Anjali Mehta',
    email: 'anjali.mehta@example.com',
    subject: 'Collaboration',
    message: 'Can we collaborate on a project?',
    status: 'replied',
    createdAt: new Date(),
  },
];

const submitContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    res.status(400);
    throw new Error('All fields are required');
  }

  if (!getIsConnected()) {
    return res.status(201).json({
      success: true,
      message: 'Message received! (Standalone Mode)',
      data: { name, email, subject, message, status: 'new', createdAt: new Date() },
    });
  }

  const contact = await Contact.create({ name, email, subject, message });
  res.status(201).json({ success: true, message: 'Message sent successfully!', data: contact });
});

const getMessages = asyncHandler(async (req, res) => {
  if (!getIsConnected()) {
    return res.json({ success: true, data: defaultMessages, count: defaultMessages.length, dbConnected: false });
  }

  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages.length > 0 ? messages : defaultMessages, count: messages.length });
  } catch (err) {
    res.json({ success: true, data: defaultMessages, count: defaultMessages.length });
  }
});

const updateMessageStatus = asyncHandler(async (req, res) => {
  if (!getIsConnected()) { res.status(503); throw new Error('Database is offline.'); }
  const message = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!message) { res.status(404); throw new Error('Message not found'); }
  res.json({ success: true, data: message });
});

const deleteMessage = asyncHandler(async (req, res) => {
  if (!getIsConnected()) { res.status(503); throw new Error('Database is offline.'); }
  const message = await Contact.findByIdAndDelete(req.params.id);
  if (!message) { res.status(404); throw new Error('Message not found'); }
  res.json({ success: true, message: 'Message deleted' });
});

module.exports = { submitContact, getMessages, updateMessageStatus, deleteMessage };
