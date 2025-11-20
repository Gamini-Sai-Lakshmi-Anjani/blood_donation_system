import db from "../db.js";

export const addRequest = (req, res) => {
  const { recipientId, userId, requestDate, requiredBloodType, requiredRh, quantity, status } = req.body;
  const sql = `INSERT INTO Request (RequestID, RecipientID, UserID, RequestDate, RequiredBloodType, RequiredRh, QuantityRequired, Status)
               VALUES ((SELECT IFNULL(MAX(RequestID),600) + 1 FROM Request), ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [recipientId, userId, requestDate, requiredBloodType, requiredRh, quantity, status], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "✅ Request created successfully!" });
  });
};

export const getAllRequests = (req, res) => {
  db.query("SELECT * FROM Request", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
