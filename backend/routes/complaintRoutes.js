const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const protect = require("../middleware/authMiddleware");

const {
  createComplaint,
  getAllComplaints,
  updateStatus
} = require("../controllers/complaintController");

// multer storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// USER create
router.post("/", protect, upload.single("image"), createComplaint);

// ADMIN list
router.get("/", protect, getAllComplaints);

// ADMIN update
router.put("/:id", protect, updateStatus);

module.exports = router;
