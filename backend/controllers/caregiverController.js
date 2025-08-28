const Caregiver = require('../models/Caregiver');

// Get caregiver profile
exports.getProfile = async (req, res) => {
  try {
    const caregiver = await Caregiver.findById(req.caregiver._id).populate('patients');
    res.json(caregiver);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};