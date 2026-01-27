const router = require("express").Router();
const Complaint = require("../models/Complaint");


router.get("/complaints", async (req, res) => {
  const complaints = await Complaint.find().sort({ createdAt: -1 });
  res.json(complaints);
});


router.put("/complaint/:id", async (req, res) => {
  const { status } = req.body;

  const updated = await Complaint.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(updated);
});

module.exports = router;
