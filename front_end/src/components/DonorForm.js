import React, { useState } from "react";
import axios from "axios";

export default function DonorForm() {
  const [formData, setFormData] = useState({
    name: "", bloodType: "A", gender: "M",
    dateOfBirth: "", contactInfo: "", address: "", medicalHistory: ""
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/donors", formData);
    alert("Donor added successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Full Name" onChange={handleChange} className="form-control mb-2" />
      <select name="bloodType" className="form-control mb-2" onChange={handleChange}>
        <option>A</option><option>B</option><option>AB</option><option>O</option>
      </select>
      <select name="gender" className="form-control mb-2" onChange={handleChange}>
        <option>M</option><option>F</option><option>O</option>
      </select>
      <input type="date" name="dateOfBirth" onChange={handleChange} className="form-control mb-2" />
      <input name="contactInfo" placeholder="Phone/Email" onChange={handleChange} className="form-control mb-2" />
      <input name="address" placeholder="Address" onChange={handleChange} className="form-control mb-2" />
      <textarea name="medicalHistory" placeholder="Medical History" onChange={handleChange} className="form-control mb-2" />
      <button type="submit" className="btn btn-danger">Register Donor</button>
    </form>
  );
}
