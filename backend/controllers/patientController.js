const Patient = require('../models/Patient');

// Add a new patient
exports.addPatient = async (req, res) => {
  const { name, age, diagnosis, notes } = req.body;
  try {
    const patient = await Patient.create({
      name,
      age,
      diagnosis,
      notes,
      caregiver: req.caregiver._id,
    });
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all patients for the caregiver
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ caregiver: req.caregiver._id });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};