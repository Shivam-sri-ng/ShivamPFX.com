const express = require('express');
const router = express.Router();
const { getVisitorCount, recordVisit } = require('../controllers/visitorsController');

router.get('/', getVisitorCount);
router.post('/hit', recordVisit);

module.exports = router;
