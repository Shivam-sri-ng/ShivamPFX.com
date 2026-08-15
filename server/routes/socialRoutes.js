const express = require('express');
const router = express.Router();
const { getSocials, getAllSocials, createSocial, updateSocial, deleteSocial } = require('../controllers/socialController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getSocials)
  .post(protect, createSocial);

router.get('/all', protect, getAllSocials);

router.route('/:id')
  .put(protect, updateSocial)
  .delete(protect, deleteSocial);

module.exports = router;
