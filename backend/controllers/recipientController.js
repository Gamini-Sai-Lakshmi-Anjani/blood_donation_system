import db from "../db.js";

export const addRecipient = (req, res) => {
  const { name, bloodType, rhFactor, gender, dateOfBirth, contactInfo, address } = req.body;
  const sql = `INSERT INTO Recipient (RecipientID, Name, BloodType, RhFactor, Gender, DateOfBirth, ContactInfo, Address)
               VALUES ((SELECT IFNULL(MAX(RecipientID),500) + 1 FROM Recipient), ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [name, bloodType, rhFactor, gender, dateOfBirth, contactInfo, address], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "✅ Recipient added successfully!" });
  });
};

export const getAllRecipients = (req, res) => {
  db.query("SELECT * FROM Recipient", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
