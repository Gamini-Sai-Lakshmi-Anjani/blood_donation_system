import React, { useState } from "react";
import axios from "axios";

export default function DonationForm() {
  const [formData, setFormData] = useState({
    donorId: "", orgId: "", userId: "", date: "", volume: "", status: "Safe"
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/donations", formData);
    alert("Donation added successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="donorId" placeholder="Donor ID" onChange={handleChange} className="form-control mb-2" />
      <input name="orgId" placeholder="Organization ID" onChange={handleChange} className="form-control mb-2" />
      <input name="userId" placeholder="User ID" onChange={handleChange} className="form-control mb-2" />
      <input type="date" name="date" onChange={handleChange} className="form-control mb-2" />
      <input name="volume" placeholder="Volume (ml)" onChange={handleChange} className="form-control mb-2" />
      <button type="submit" className="btn btn-danger">Add Donation</button>
    </form>
  );
}
