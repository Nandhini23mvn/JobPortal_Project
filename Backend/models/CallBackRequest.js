
const mongoose = require('mongoose');

const callbackRequestSchema = new mongoose.Schema({
  yourname: { type: String, required: true },
  youremail: { type: String, required: true },
  message: { type: String, required: true },
  callbackdate: { type: Date, required: true },
  callbacktime: { type: String, required: true },
  isRead: { type: Boolean, default: false }, // Add this line
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CallbackRequest', callbackRequestSchema);
