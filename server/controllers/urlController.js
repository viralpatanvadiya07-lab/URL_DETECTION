const URL = require('../models/URL');
const { checkUrlSafety } = require('../utils/urlChecker');

// @desc    Scan a URL
// @route   POST /api/url/scan
// @access  Private
const scanUrl = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'Please provide a URL' });
  }

  try {
    const safetyResult = await checkUrlSafety(url);

    // Save to database
    const savedUrl = await URL.create({
      url,
      status: safetyResult.status,
      threatType: safetyResult.threatType,
      user: req.user._id
    });

    res.status(200).json(savedUrl);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's scan history
// @route   GET /api/url/history
// @access  Private
const getHistory = async (req, res) => {
  try {
    const history = await URL.find({ user: req.user._id }).sort({ scanDate: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a scan result
// @route   DELETE /api/url/:id
// @access  Private
const deleteScan = async (req, res) => {
  try {
    const scan = await URL.findById(req.params.id);

    if (!scan) {
      return res.status(404).json({ message: 'Scan result not found' });
    }

    // Check if user owns the scan
    if (scan.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await scan.deleteOne();
    res.status(200).json({ message: 'Scan result removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get global statistics
// @route   GET /api/url/stats
// @access  Public
const getStats = async (req, res) => {
  try {
    const totalScans = await URL.countDocuments();
    const safeScans = await URL.countDocuments({ status: 'safe' });
    const maliciousScans = await URL.countDocuments({ status: 'malicious' });
    
    // Get total unique users
    const totalUsers = await URL.distinct('user').then(users => users.length);

    res.status(200).json({
      totalScans,
      safeScans,
      maliciousScans,
      totalUsers: totalUsers || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  scanUrl,
  getHistory,
  deleteScan,
  getStats
};
