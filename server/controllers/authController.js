const asyncHandler = require('express-async-handler');
const Admin = require('../models/Admin');
const generateToken = require('../utils/generateToken');
const { getIsConnected } = require('../config/db');

const defaultAdmin = {
  _id: '654321654321654321654321',
  name: 'Admin User',
  email: 'admin@portfolio.com',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
};

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  // Fallback check if DB offline
  if (!getIsConnected()) {
    const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@portfolio.com';
    const defaultPass = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@12345';

    if (email.toLowerCase() === defaultEmail.toLowerCase() && password === defaultPass) {
      return res.json({
        success: true,
        data: {
          ...defaultAdmin,
          token: generateToken(defaultAdmin._id),
        },
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  }

  try {
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin || !(await admin.matchPassword(password))) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    res.json({
      success: true,
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        avatar: admin.avatar,
        token: generateToken(admin._id),
      },
    });
  } catch (error) {
    if (error.status === 401) throw error;
    // Fallback if DB error during findOne
    const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@portfolio.com';
    const defaultPass = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@12345';
    if (email.toLowerCase() === defaultEmail.toLowerCase() && password === defaultPass) {
      return res.json({
        success: true,
        data: { ...defaultAdmin, token: generateToken(defaultAdmin._id) },
      });
    }
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Login with admin key
// @route   POST /api/auth/admin-key
// @access  Public
const loginWithAdminKey = asyncHandler(async (req, res) => {
  const { adminKey } = req.body;

  if (!adminKey) {
    res.status(400);
    throw new Error('Admin key is required');
  }

  const expectedKey = process.env.ADMIN_KEY || 'adminkey123';

  if (adminKey !== expectedKey) {
    res.status(401);
    throw new Error('Invalid admin key');
  }

  res.json({
    success: true,
    data: {
      ...defaultAdmin,
      token: generateToken(defaultAdmin._id),
    },
  });
});

// @desc    Get current admin profile
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  if (req.admin) {
    return res.json({
      success: true,
      data: {
        _id: req.admin._id,
        name: req.admin.name,
        email: req.admin.email,
        role: req.admin.role,
        avatar: req.admin.avatar,
      },
    });
  }

  res.json({ success: true, data: defaultAdmin });
});

// @desc    Update admin profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  if (!getIsConnected()) {
    res.status(503);
    throw new Error('Database is offline. Connect MongoDB to persist profile updates.');
  }

  const admin = await Admin.findById(req.admin._id);
  if (!admin) {
    res.status(404);
    throw new Error('Admin not found');
  }

  admin.name = req.body.name || admin.name;
  admin.email = req.body.email || admin.email;
  admin.avatar = req.body.avatar || admin.avatar;

  if (req.body.password) {
    admin.password = req.body.password;
  }

  const updatedAdmin = await admin.save();

  res.json({
    success: true,
    data: {
      _id: updatedAdmin._id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      role: updatedAdmin.role,
      avatar: updatedAdmin.avatar,
      token: generateToken(updatedAdmin._id),
    },
  });
});

module.exports = { loginAdmin, loginWithAdminKey, getMe, updateProfile };
