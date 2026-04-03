const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const passport = require("passport");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

/* =========================
   REGISTER
========================= */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Incoming email:", email);
    console.log("BACKEND_URL:", process.env.BACKEND_URL);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
    });

    const verificationLink = `${process.env.BACKEND_URL}/api/users/verify/${verificationToken}`;
    await sendEmail(
      user.email,
      "Verify Your Email - Sheer Threads",
      `
      <h2>Welcome to Sheer Threads</h2>
      <p>Click below to verify your email:</p>
      <a href="${verificationLink}">Verify Email</a>
      `
    );

    res.json({ message: "Registration successful. Check your email." });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/* =========================
   LOGIN
========================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: "Please verify your email first",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/* =========================
   VERIFY EMAIL
========================= */
router.get("/verify/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      verificationToken: req.params.token,
    });

    if (!user) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/verified?error=invalid`
      );
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    // Redirect to frontend verified page
    res.redirect(
      `${process.env.FRONTEND_URL}/verified?success=true`
    );

  } catch (error) {
    res.redirect(
      `${process.env.FRONTEND_URL}/verified?error=server`
    );
  }
});


/* =========================
   GOOGLE AUTH START
========================= */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);


/* =========================
   GOOGLE CALLBACK
========================= */
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {

    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.redirect(
      `${process.env.FRONTEND_URL}/oauth-success?token=${token}`
    );
  }
);

module.exports = router;