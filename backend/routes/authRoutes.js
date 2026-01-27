const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Admin = require("../models/Admin");

// USER REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "User exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hash });
    await user.save();

    res.json({ msg: "User registered" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// USER LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid login" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid login" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ token, role: "user" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADMIN LOGIN ONLY
router.post("/admin-login", async (req, res) => {
  const { adminId, password } = req.body;

  const admin = await Admin.findOne({ adminId });
  if (!admin) return res.status(400).json({ msg: "Unauthorized" });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(400).json({ msg: "Unauthorized" });

  const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET);

  res.json({ token, role: "admin" });
});

module.exports = router;
