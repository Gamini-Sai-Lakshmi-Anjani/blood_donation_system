import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import donorRoutes from "./routes/donorRoutes.js";
import recipientRoutes from "./routes/recipientRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import db from "./db.js"; // ✅ ensure database connection initializes

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// ✅ API routes
app.use("/api/donors", donorRoutes);
app.use("/api/recipients", recipientRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/stock", stockRoutes);

app.get("/", (req, res) => {
  res.send("🩸 Blood Donation Management API is running...");
});

const PORT =5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("✅ Connected to MySQL Database (via db.js)");
});
