import db from "../db.js";

export const getAvailableStock = (req, res) => {
  const query = "CALL GetAvailableStock();";
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error executing stored procedure:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Stored procedure returns results as [ [rows], [metadata] ]
    res.json(results[0]);
  });
};
