const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

// POST /api/auth/register
router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: "User already exists" });

      const hash = await bcrypt.hash(password, 10);
      user = await User.create({ name, email, password: hash });

      const payload = { user: { id: user._id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (e) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// POST /api/auth/login
router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ message: "Invalid credentials" });

      const payload = { user: { id: user._id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (e) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// GET /api/auth/me
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

// POST /api/auth/logout
router.post("/logout", auth, (req, res) => {
  try {
    // Since JWT is stateless, we can't "invalidate" it on the server
    // Instead, the client should delete it from storage (localStorage/cookies)
    res.json({ message: "Logged out successfully. Please remove token on client side." });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
