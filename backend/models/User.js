const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Basic Info
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: false, // Not required for Google login
    },

    // Email Verification
    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
    },

    // OTP Verification
    otp: {
      type: String,
    },

    otpExpiry: {
      type: Date,
    },

    // Google Auth
    googleId: {
      type: String,
    },

    // Role (Future scalability)
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);