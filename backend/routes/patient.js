const express = require('express');
const router = express.Router();
const { addPatient, getPatients } = require('../controllers/patientController');
const { protect } = require('../middleware/auth');

router.post('/', protect, addPatient);
router.get('/', protect, getPatients);

module.exports = router;