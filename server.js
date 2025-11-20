// server.js

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

// Load environment variables from .env
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();
app.use(express.json());

// --------------------
// Middleware
// --------------------
app.use(cors());                  // Enable CORS for frontend requests
app.use(express.json());          // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Optional: parse URL-encoded data

// --------------------
// Routes
// --------------------

// Root route
app.get('/', (req, res) => {
  res.send('🗳️ Online Voting System API is running');
});

// Auth routes
app.use('/api/auth', require('./routes/auth'));

// Voter routes
app.use('/api/voter', require('./routes/voter'));

// Admin routes
app.use('/api/admin', require('./routes/admin'));

// --------------------
// 404 Handler
// --------------------
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// --------------------
// Global Error Handler
// --------------------
app.use((err, req, res, next) => {
  console.error('Server Error:', err); // Log the full error
  res.status(500).json({ message: 'Internal Server Error' });
});

// --------------------
// Start Server
// --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
