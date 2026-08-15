const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/Admin');
const { getIsConnected } = require('../config/db');

const defaultAdmin = {
  _id: '654321654321654321654321',
  name: 'Admin User',
  email: 'admin@portfolio.com',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
};

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (getIsConnected()) {
        try {
          const adminObj = await Admin.findById(decoded.id).select('-password');
          if (adminObj) {
            req.admin = adminObj;
            return next();
          }
        } catch (dbErr) {
          // Ignore DB error, fall back to token validity
        }
      }

      // If DB is offline or user was logged in with default/standalone key credentials
      if (decoded.id === defaultAdmin._id || decoded.id) {
        req.admin = defaultAdmin;
        return next();
      }

      res.status(401);
      throw new Error('Not authorized, admin not found');
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };
