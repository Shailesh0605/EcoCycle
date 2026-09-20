const express = require('express');

const {
  registerUser,
  loginUser,
} = require('../controllers/authController');

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({
    message: 'Auth routes are working',
  });
});

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

module.exports = router;