import express from "express";
import db from "../db.js";

const router = express.Router();

// ✅ Add a new donor with RhFactor & DOB
router.post("/add", (req, res) => {
  console.log("📩 Received Donor Data:", req.body);

  const { name, bloodType, rhFactor, gender, dateOfBirth, contactInfo, address, medicalHistory } = req.body;

  if (!name || !bloodType) {
    return res.status(400).json({ error: "Name and Blood Type are required" });
  }

  const getNextIdQuery = "SELECT IFNULL(MAX(DonorID), 200) + 1 AS nextId FROM Donor";

  db.query(getNextIdQuery, (err, result) => {
    if (err) {
      console.error("❌ Error getting next DonorID:", err);
      return res.status(500).json({ error: "Error fetching next DonorID" });
    }

    const nextId = result[0].nextId;

    const insertQuery = `
      INSERT INTO Donor (DonorID, Name, BloodType, RhFactor, Gender, DateOfBirth, ContactInfo, Address, MedicalHistory)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertQuery,
      [
        nextId,
        name,
        bloodType,
        rhFactor || null,
        gender || null,
        dateOfBirth || null,
        contactInfo || null,
        address || null,
        medicalHistory || null
      ],
      (err2) => {
        if (err2) {
          console.error("❌ MySQL Error adding donor:", err2);
          return res.status(500).json({ error: "Database error while adding donor" });
        }

        console.log(`✅ Donor added successfully (DonorID: ${nextId})`);
        res.json({ message: "✅ Donor added successfully", DonorID: nextId });
      }
    );
  });
});

router.get("/list", (req, res) => {
  db.query("SELECT * FROM Donor", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

// ✅ Get Donors (with optional bloodType filter)
router.get("/list", (req, res) => {
  const { bloodType } = req.query;

  let query = "SELECT * FROM Donor";
  let params = [];

  if (bloodType) {
    query += " WHERE BloodType = ?";
    params.push(bloodType);
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(results);
  });
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await db.promise().query("DELETE FROM Donor WHERE DonorID = ?", [req.params.id]);
    res.json({ message: "Donor deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting donor" });
  }
});



export default router;
