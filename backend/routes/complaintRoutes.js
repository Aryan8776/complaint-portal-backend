const router = require("express").Router();
const {
  createComplaint,
  getAllComplaints,
  updateStatus
} = require("../controllers/complaintController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createComplaint);
router.get("/", protect, getAllComplaints);
router.put("/:id", protect, updateStatus);

module.exports = router;
