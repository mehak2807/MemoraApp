const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const caregiverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }]
});

// Hash password before saving
caregiverSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
caregiverSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Caregiver', caregiverSchema);