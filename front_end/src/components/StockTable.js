import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StockTable() {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/stock").then((res) => setStock(res.data));
  }, []);

  return (
    <div>
      <h4>🧫 Available Blood Stock</h4>
      <table className="table table-bordered">
        <thead className="table-danger">
          <tr>
            <th>Blood Type</th>
            <th>Rh Factor</th>
            <th>Component</th>
            <th>Available Units</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((row, i) => (
            <tr key={i}>
              <td>{row.BloodType}</td>
              <td>{row.RhFactor}</td>
              <td>{row.Component}</td>
              <td>{row.AvailableUnits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
