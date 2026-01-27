const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminId: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// IMPORTANT: this must match collection name "admins"
module.exports = mongoose.model("Admin", adminSchema, "admins");
