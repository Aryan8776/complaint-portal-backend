const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  department: String,
  area: String,
  name: String,
  mobile: String,
  description: String,
  image: String,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Complaint", complaintSchema);
