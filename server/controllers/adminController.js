const User = require('../models/User');
const URL = require('../models/URL');
const Report = require('../models/Report');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all scans
// @route   GET /api/admin/scans
// @access  Private/Admin
const getAllScans = async (req, res) => {
  try {
    const scans = await URL.find({}).populate('user', 'name email');
    res.status(200).json(scans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get system stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalScans = await URL.countDocuments();
    const maliciousScans = await URL.countDocuments({ status: 'malicious' });
    const safeScans = await URL.countDocuments({ status: 'safe' });

    res.status(200).json({
      totalUsers,
      totalScans,
      maliciousScans,
      safeScans
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getAllScans,
  getStats
};
