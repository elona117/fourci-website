const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'Ongoing' },
  location: { type: String, default: 'Borno State, Nigeria' },
  image: { type: String, required: true },
  metrics: [{ label: String, value: String }],
  content: { type: String, required: true },
  isCustom: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', resourceSchema);