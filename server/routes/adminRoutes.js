const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getAllScans,
  getStats
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// All routes here are protected and restricted to admins
router.use(protect);
router.use(authorize('admin'));

router.get('/users', getAllUsers);
router.get('/scans', getAllScans);
router.get('/stats', getStats);

module.exports = router;
