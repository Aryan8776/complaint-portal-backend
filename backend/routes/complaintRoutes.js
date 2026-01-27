const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const protect = require("../middleware/authMiddleware");
const {
  createComplaint,
  getMyComplaints
} = require("../controllers/complaintController");

// storage config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// IMPORTANT: upload.single("image")
router.post("/", protect, upload.single("image"), createComplaint);

router.get("/my", protect, getMyComplaints);

module.exports = router;
