import dotenv from "dotenv";
import express from "express"; // 🔥 Import express if not already imported here
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// 🔥 Make sure the uploads folder is served statically so evidence files can be viewed
app.use("/uploads", express.static("uploads"));

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`TrafficSetu server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();