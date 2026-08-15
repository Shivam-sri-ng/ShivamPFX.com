const express = require('express');
const router = express.Router();
const { uploadImage, uploadResume } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

router.post('/image', protect, upload.single('image'), uploadImage);
router.post('/resume', protect, upload.single('resume'), uploadResume);

module.exports = router;
