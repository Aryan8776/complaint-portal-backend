const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const protect = require("../middleware/authMiddleware");

const {
  createComplaint,
  getAllComplaints,
  updateStatus
} = require("../controllers/complaintController");


const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });


router.post("/", protect, upload.single("image"), createComplaint);


router.get("/", protect, getAllComplaints);


router.put("/:id", protect, updateStatus);

module.exports = router;
