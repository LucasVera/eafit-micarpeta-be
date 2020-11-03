const mongoose = require('mongoose');
const { addIdFieldToSchema } = require('./helpers');

const UserSchema = new mongoose.Schema({
  name: String,
  nationalId: { type: String, required: true, unique: true },
  email: { type: String },
  password: { type: String, select: false },
  address: String,
  validCitizen: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.index({ nationalId: 1 }, { unique: true });

addIdFieldToSchema(UserSchema);

UserSchema.post('save', function(doc) {
  doc.password = '';
})

UserSchema.post('find', function(doc) {
  doc.password = '';
})

module.exports = mongoose.model('User', UserSchema);
