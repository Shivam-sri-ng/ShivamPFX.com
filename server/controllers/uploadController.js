const asyncHandler = require('express-async-handler');
const { uploadToCloudinary } = require('../middleware/uploadMiddleware');

// @desc  Upload image to Cloudinary
// @route POST /api/upload/image
// @access Private
const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  const folder = req.body.folder || 'portfolio';
  const result = await uploadToCloudinary(req.file.buffer, folder, 'image');

  res.json({
    success: true,
    data: {
      url: result.secure_url,
      public_id: result.public_id,
    },
  });
});

// @desc  Upload resume PDF to Cloudinary
// @route POST /api/upload/resume
// @access Private
const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  const result = await uploadToCloudinary(req.file.buffer, 'portfolio/resumes', 'raw');

  res.json({
    success: true,
    data: {
      url: result.secure_url,
      public_id: result.public_id,
      fileName: req.file.originalname,
    },
  });
});

module.exports = { uploadImage, uploadResume };
