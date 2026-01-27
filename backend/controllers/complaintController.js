const Complaint = require("../models/Complaint");

/**
 * CREATE COMPLAINT (USER)
 * supports image upload via multer
 */
exports.createComplaint = async (req, res) => {
  try {
    const {
      department,
      area,
      name,
      mobile,
      description
    } = req.body;

    if (!department || !area || !description) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const complaint = await Complaint.create({
      department,
      area,
      name,
      mobile,
      description,
      image: req.file ? req.file.filename : null,
      user: req.user._id
    });

    res.status(201).json(complaint);

  } catch (error) {
    console.error("CREATE COMPLAINT ERROR:", error);
    res.status(500).json({
      message: "Server error while creating complaint"
    });
  }
};


/**
 * GET ALL COMPLAINTS (ADMIN)
 */
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(complaints);

  } catch (error) {
    console.error("GET COMPLAINTS ERROR:", error);
    res.status(500).json({
      message: "Failed to load complaints"
    });
  }
};


/**
 * UPDATE STATUS (ADMIN)
 */
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    complaint.status = status;

    await complaint.save();

    res.json(complaint);

  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    res.status(500).json({
      message: "Could not update complaint"
    });
  }
};
