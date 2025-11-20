import React, { useState } from "react";
import axios from "axios";

export default function RecipientForm() {
  const [formData, setFormData] = useState({
    name: "", bloodType: "A", rhFactor: "+",
    gender: "M", dateOfBirth: "", contactInfo: "", address: ""
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/recipients", formData);
    alert("Recipient added successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Full Name" onChange={handleChange} className="form-control mb-2" />
      <select name="bloodType" onChange={handleChange} className="form-control mb-2">
        <option>A</option><option>B</option><option>AB</option><option>O</option>
      </select>
      <select name="rhFactor" onChange={handleChange} className="form-control mb-2">
        <option>+</option><option>-</option>
      </select>
      <input type="date" name="dateOfBirth" onChange={handleChange} className="form-control mb-2" />
      <input name="contactInfo" placeholder="Contact Info" onChange={handleChange} className="form-control mb-2" />
      <input name="address" placeholder="Address" onChange={handleChange} className="form-control mb-2" />
      <button type="submit" className="btn btn-danger">Register Recipient</button>
    </form>
  );
}
