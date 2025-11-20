// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// -------------------- REGISTER --------------------
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, voterId } = req.body;

    if (!username || !email || !password || !voterId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      username,
      email,
      password, // 🔥 plain password (as you requested)
      voterId,
      tempPin: null,
      hasVoted: false,
      isAdmin: false,
    });

    await newUser.save();
    res.json({ message: "Registered successfully" });

  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// -------------------- LOGIN → GENERATE OTP --------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📩 Login request received:", req.body);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.password !== password) {
      console.log("❌ Password mismatch");
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    user.tempPin = otp;
    await user.save();

    console.log("🔐 OTP generated:", otp);

    const safeUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      hasVoted: user.hasVoted,
    };

    return res.json({
      success: true,
      message: "OTP generated",
      otp, // 🔥 OTP returned to frontend
      user: safeUser,
    });

  } catch (err) {
    console.error("🔥 Login error:", err);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
});

module.exports = router;
