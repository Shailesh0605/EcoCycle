require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const pickupRoutes = require('./routes/pickupRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Debug every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Test route
app.get('/', (req, res) => {
  res.json({
    message: 'EcoCycle API is running successfully',
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pickups', pickupRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`EcoCycle API running on port ${PORT}`);
});