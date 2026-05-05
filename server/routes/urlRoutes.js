const express = require('express');
const router = express.Router();
const {
  scanUrl,
  getHistory,
  deleteScan,
  getStats
} = require('../controllers/urlController');
const { protect } = require('../middleware/authMiddleware');

router.get('/stats', getStats);
router.post('/scan', protect, scanUrl);
router.get('/history', protect, getHistory);
router.delete('/history/:id', protect, deleteScan);

module.exports = router;
