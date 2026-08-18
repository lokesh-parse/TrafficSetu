import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js"; // Sahi relative path under src/

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "TrafficSetu API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

export default app;