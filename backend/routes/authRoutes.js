const router = require("express").Router();
const {
  registerUser,
  loginUser
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin-login", adminLogin);

module.exports = router;
