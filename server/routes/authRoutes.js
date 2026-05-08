const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.json({
      success: true,
      message: "Signup successful"
    });
  } catch (error) {
    console.log("SIGNUP ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: "Signup failed"
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: "Login failed"
    });
  }
});

// Forgot Password - Send OTP
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Forgot password request for:", email);

    const user = await User.findOne({ email });
    console.log("User found:", user ? "YES" : "NO");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email"
      });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    console.log("OTP generated:", otp);

    // Save OTP to user with 10 min expiry
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();
    console.log("OTP saved to user");

    // Send email
    console.log("Sending email to:", email);
    await sendEmail(email, otp);
    console.log("Email sent successfully!");

    res.json({
      success: true,
      message: "OTP sent to your email"
    });
  } catch (error) {
    console.log("FORGOT PASSWORD ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Reset Password - Verify OTP
router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    console.log("Reset password request for:", email);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check OTP
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    // Check OTP expiry
    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired. Please request again"
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear OTP
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    console.log("Password reset successful for:", email);

    res.json({
      success: true,
      message: "Password reset successful"
    });
  } catch (error) {
    console.log("RESET PASSWORD ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;