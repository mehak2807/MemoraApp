const Caregiver = require('../models/Caregiver');
const generateToken = require('../utils/generateToken');

// Register caregiver
exports.register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const exists = await Caregiver.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Caregiver already exists' });
    }
    const caregiver = await Caregiver.create({ name, email, password, phone });
    res.status(201).json({
      _id: caregiver._id,
      name: caregiver.name,
      email: caregiver.email,
      token: generateToken(caregiver._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login caregiver
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const caregiver = await Caregiver.findOne({ email });
    if (caregiver && (await caregiver.matchPassword(password))) {
      res.json({
        _id: caregiver._id,
        name: caregiver.name,
        email: caregiver.email,
        token: generateToken(caregiver._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};