const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, 'Please add a URL'],
    trim: true
  },
  status: {
    type: String,
    enum: ['safe', 'malicious', 'suspicious', 'unknown'],
    default: 'unknown'
  },
  threatType: {
    type: String,
    default: 'none'
  },
  detectedBy: {
    type: String,
    default: 'system'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  scanDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('URL', urlSchema);
