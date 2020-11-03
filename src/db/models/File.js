const mongoose = require('mongoose');
const { addIdFieldToSchema } = require('./helpers');

const FileSchema = new mongoose.Schema({
  name: String,
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  url: String,
  type: String,
  createdAt: { type: Date, default: Date.now },
});

addIdFieldToSchema(FileSchema);

module.exports = mongoose.model('File', FileSchema);
