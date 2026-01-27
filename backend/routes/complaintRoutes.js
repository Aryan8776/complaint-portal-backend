const router = require("express").Router();
const multer = require("multer");
const Complaint = require("../models/Complaint");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const complaint = new Complaint({
      ...req.body,
      image: req.file ? req.file.filename : null
    });

    await complaint.save();
    res.json(complaint);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
