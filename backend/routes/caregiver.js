const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/caregiverController');
const { protect } = require('../middleware/auth');

router.get('/profile', protect, getProfile);

module.exports = router;