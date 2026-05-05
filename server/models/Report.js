const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, 'Please add a URL'],
    trim: true
  },
  reason: {
    type: String,
    required: [true, 'Please add a reason for reporting']
  },
  reportedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'resolved'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Report', reportSchema);
