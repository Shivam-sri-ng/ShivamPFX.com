const express = require('express');
const router = express.Router();
const { loginAdmin, loginWithAdminKey, getMe, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.post('/admin-key', loginWithAdminKey);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

module.exports = router;
