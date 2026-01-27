const Complaint = require("../models/Complaint");

exports.createComplaint = async (req, res) => {
  const complaint = await Complaint.create({
    ...req.body,
    user: req.user.id
  });

  res.status(201).json(complaint);
};

exports.getAllComplaints = async (req, res) => {
  const complaints = await Complaint.find().populate("user", "name email");
  res.json(complaints);
};

exports.updateStatus = async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);

  complaint.status = req.body.status;
  await complaint.save();

  res.json(complaint);
};
