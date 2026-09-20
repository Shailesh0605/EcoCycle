const express = require('express');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', protect, (req, res) => {
  res.json({
    message: 'Authentication successful',
    user: {
      userId: req.user.userId,
      role: req.user.role,
    },
  });
});

module.exports = router;