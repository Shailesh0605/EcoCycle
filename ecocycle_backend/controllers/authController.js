const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ==============================
// REGISTER USER
// ==============================
const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Check required fields
    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({
        message: 'Please fill all required fields',
      });
    }

    // Check valid role
    const validRoles = ['household', 'collector', 'recycler'];

    if (!validRoles.includes(role)) {
      return res.status(400).json({
        message: 'Invalid user role',
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'Email is already registered',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      role,
    });

    // Send response without password
    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Registration error:', error.message);

    res.status(500).json({
      message: 'Server error during registration',
    });
  }
};

// ==============================
// LOGIN USER
// ==============================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please enter email and password',
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    // User not found
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );

    // Send response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error.message);

    res.status(500).json({
      message: 'Server error during login',
    });
  }
};

// ==============================
// EXPORT CONTROLLERS
// ==============================
module.exports = {
  registerUser,
  loginUser,
};