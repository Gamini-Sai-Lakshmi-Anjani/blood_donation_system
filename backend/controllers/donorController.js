import db from "../db.js";

export const addDonor = (req, res) => {
  const { name, bloodType, gender, dateOfBirth, contactInfo, address, medicalHistory } = req.body;
  const sql = `
    CALL AddNewDonor(?, ?, ?, ?, ?, ?, ?);
  `;
  db.query(sql, [name, bloodType, gender, dateOfBirth, contactInfo, address, medicalHistory], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "✅ Donor added successfully!" });
  });
};

export const getAllDonors = (req, res) => {
  db.query("SELECT * FROM Donor", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
