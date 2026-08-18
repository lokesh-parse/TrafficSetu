import express from "express";
import { 
  reportComplaint, 
  getMyComplaints, 
  getAllComplaints, 
  getComplaintById,
  updateComplaintStatus 
} from "../controllers/complaintController.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/report", protect, upload.single("evidence"), reportComplaint);
router.get("/my", protect, getMyComplaints);
router.get("/", protect, getAllComplaints);
router.get("/:id", protect, getComplaintById);
router.patch("/:id/status", protect, updateComplaintStatus); // 🔥 Added status update route

export default router;