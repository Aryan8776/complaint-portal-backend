const router = require("express").Router();

const {
  registerUser,
  loginUser,
  adminLogin
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

// USER AUTH
router.post("/register", registerUser);
router.post("/login", loginUser);

// ADMIN AUTH
router.post("/admin-login", adminLogin);

module.exports = router;
