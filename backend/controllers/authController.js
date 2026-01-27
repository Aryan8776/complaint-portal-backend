const Admin = require("../models/Admin");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed
  });

  res.json({
    token: generateToken(user._id),
    role: user.role
  });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  res.json({
    token: generateToken(user._id),
    role: user.role
  });
};


exports.adminLogin = async (req, res) => {
  try {
    const { adminId, password } = req.body;

    const admin = await Admin.findOne({ adminId });

    if (!admin) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    // Plain text comparison (because admins collection stores plain passwords)
    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const token = generateToken(admin._id);

    res.json({
      token,
      role: "admin"
    });

  } catch (err) {
    console.error("ADMIN LOGIN ERROR:", err);
    res.status(500).json({
      message: "Admin login failed"
    });
  }
};
