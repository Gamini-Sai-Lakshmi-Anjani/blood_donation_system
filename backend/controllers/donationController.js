import db from "../db.js";

export const addDonation = (req, res) => {
  const { donorId, orgId, userId, date, volume, status } = req.body;
  const sql = `INSERT INTO Donation (DonationID, DonorID, OrganizationID, UserID, DonationDate, Volume, Status)
               VALUES ((SELECT IFNULL(MAX(DonationID),300) + 1 FROM Donation), ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [donorId, orgId, userId, date, volume, status], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "✅ Donation recorded successfully!" });
  });
};

export const getAllDonations = (req, res) => {
  db.query("SELECT * FROM Donation", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
