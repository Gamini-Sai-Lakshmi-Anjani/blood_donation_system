import React, { useState } from "react";
import axios from "axios";

export default function RequestForm() {
  const [formData, setFormData] = useState({
    recipientId: "", userId: "", requestDate: "",
    requiredBloodType: "A", requiredRh: "+", quantity: "", status: "Pending"
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/requests", formData);
    alert("Request created successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="recipientId" placeholder="Recipient ID" onChange={handleChange} className="form-control mb-2" />
      <input name="userId" placeholder="User ID" onChange={handleChange} className="form-control mb-2" />
      <input type="date" name="requestDate" onChange={handleChange} className="form-control mb-2" />
      <input name="quantity" placeholder="Units Required" onChange={handleChange} className="form-control mb-2" />
      <button type="submit" className="btn btn-danger">Submit Request</button>
    </form>
  );
}
