import Complaint from "../models/Complaint.js";

// 1. Report a new complaint
export const reportComplaint = async (req, res) => {
  try {
    const { category, description, location, priority } = req.body;

    if (!category || !description || !location) {
      return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }

    // Support both req.user._id and req.user.userId safely
    const citizenId = req.user._id || req.user.userId;

    if (!citizenId) {
      return res.status(401).json({ success: false, message: "Not authorized, user ID missing" });
    }

    const count = await Complaint.countDocuments();
    const ticketId = `TS-2026-${String(count + 1).padStart(3, "0")}`;

    const complaint = await Complaint.create({
      ticketId,
      citizen: citizenId,
      category,
      description,
      location,
      priority: priority || "Medium",
      evidence: req.file ? req.file.path : undefined,
    });

    res.status(201).json({ success: true, complaint });
  } catch (error) {
    console.error("Report Complaint Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Get logged-in user's complaints
export const getMyComplaints = async (req, res) => {
  try {
    const citizenId = req.user._id || req.user.userId;
    const complaints = await Complaint.find({ citizen: citizenId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, complaints });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Get all complaints (For Authority Dashboard)
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, complaints });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Get single complaint by ID
export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }
    res.status(200).json({ success: true, complaint });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5. Update complaint status (For Authority Dashboard)
export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const validStatuses = ["SUBMITTED", "UNDER_REVIEW", "ASSIGNED", "IN_PROGRESS", "RESOLVED"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    res.status(200).json({ success: true, message: "Complaint status updated successfully", complaint });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};