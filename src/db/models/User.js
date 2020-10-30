const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  nationalId: { type: String, required: true },
  email: { type: String },
  password: { type: String, select: false },
  validCitizen: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
