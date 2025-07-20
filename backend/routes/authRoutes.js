const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
const { protect } = require('../middleware/auth'); // Add this line

// Add this new route
router.get('/me', protect, (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user
  });
});
const { getMe } = require('../controllers/authController');

router.get('/me', protect, getMe);