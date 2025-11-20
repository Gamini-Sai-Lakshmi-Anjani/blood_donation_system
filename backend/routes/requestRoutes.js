import express from "express";
import db from "../db.js";

const router = express.Router();

// ✅ Add new blood request (safe ID generation)
router.post("/add", async (req, res) => {
  console.log("📩 Received Request Data:", req.body);

  const { recipientID, requiredBloodType, requiredRh, quantityRequired } = req.body;

  if (!recipientID || !requiredBloodType || !quantityRequired) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [rows] = await db.promise().query("SELECT IFNULL(MAX(RequestID), 600) + 1 AS nextID FROM Request");
    const nextID = rows[0].nextID;

    const query = `
      INSERT INTO Request (RequestID, RecipientID, UserID, RequestDate, RequiredBloodType, RequiredRh, QuantityRequired, Status)
      VALUES (?, ?, 101, CURDATE(), ?, ?, ?, 'Pending')
    `;

    await db.promise().query(query, [
      nextID,
      recipientID,
      requiredBloodType,
      requiredRh || "+",
      quantityRequired
    ]);

    console.log(`✅ Request added successfully (RequestID: ${nextID})`);
    res.json({ message: "✅ Blood request submitted successfully", RequestID: nextID });

  } catch (err) {
    console.error("❌ Error adding request:", err);
    res.status(500).json({ error: "Database error while adding request", details: err.message });
  }
});

// ✅ Get all requests
router.get("/list", async (req, res) => {
  try {
    const [results] = await db.promise().query("SELECT * FROM Request");
    res.json(results);
  } catch (err) {
    console.error("❌ Error fetching requests:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Get donors matching required blood type & Rh
router.post("/matching-donors", async (req, res) => {
  const { bloodType, rhFactor } = req.body;

  try {
    const [rows] = await db.promise().query(
      `SELECT d.DonorID, d.Name, d.BloodType, d.RhFactor, d.ContactInfo,
              IFNULL(b.Status, 'No History') AS BloodStatus
       FROM Donor d
       LEFT JOIN BloodUnit b ON d.DonorID = b.DonorID
       WHERE d.BloodType = ? AND d.RhFactor = ?`,
      [bloodType, rhFactor]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching donor matches" });
  }
});



export default router;
