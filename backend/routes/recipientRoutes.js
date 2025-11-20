import express from "express";
import db from "../db.js";

const router = express.Router();

// ✅ Add new recipient (fixed for DOB & ContactInfo)
router.post("/add", async (req, res) => {
  console.log("📩 Received Recipient Data:", req.body);

  const { name, bloodType, rhFactor, gender, dateOfBirth, contactInfo, address } = req.body;

  if (!name || !bloodType) {
    return res.status(400).json({ error: "Name and Blood Type are required" });
  }

  try {
    // ✅ Step 1: Get next RecipientID safely
    const [rows] = await db.promise().query("SELECT IFNULL(MAX(RecipientID), 500) + 1 AS nextID FROM Recipient");
    const nextID = rows[0].nextID;

    // ✅ Step 2: Insert new recipient
    const query = `
      INSERT INTO Recipient (RecipientID, Name, BloodType, RhFactor, Gender, DateOfBirth, ContactInfo, Address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db
      .promise()
      .query(query, [
        nextID,
        name,
        bloodType,
        rhFactor || null,
        gender || null,
        dateOfBirth || null,
        contactInfo || null,
        address || null
      ]);

    console.log(`✅ Recipient added successfully (RecipientID: ${nextID})`);
    res.json({ message: "✅ Recipient added successfully", RecipientID: nextID });
  } catch (err) {
    console.error("❌ Error adding recipient:", err);
    res.status(500).json({ error: "Database error while adding recipient", details: err.message });
  }
});

// ✅ Get all recipients
router.get("/list", async (req, res) => {
  try {
    const [results] = await db.promise().query("SELECT * FROM Recipient");
    res.json(results);
  } catch (err) {
    console.error("❌ Error fetching recipients:", err);
    res.status(500).json({ error: "Database error" });
  }
});

router.get("/list", (req, res) => {
  db.query("SELECT * FROM Recipient", (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(results);
  });
});


export default router;
