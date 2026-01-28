const router = require("express").Router();

const {
  registerUser,
  loginUser,
  adminLogin
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/admin-login", adminLogin);

module.exports = router;
