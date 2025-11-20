import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  const [donor, setDonor] = useState({
    name: "",
    bloodType: "",
    rhFactor: "",
    gender: "",
    dateOfBirth: "",
    contactInfo: "",
    address: "",
    medicalHistory: "",
  });

  const [recipient, setRecipient] = useState({
    name: "",
    bloodType: "",
    rhFactor: "",
    gender: "",
    dateOfBirth: "",
    contactInfo: "",
    address: "",
  });

  const [request, setRequest] = useState({
    recipientID: "",
    requiredBloodType: "",
    requiredRh: "",
    quantityRequired: "",
  });

  const [stock, setStock] = useState([]);
  const [matchedDonors, setMatchedDonors] = useState([]);
  const [donorList, setDonorList] = useState([]);
  const [recipientList, setRecipientList] = useState([]);
  const [filterBlood, setFilterBlood] = useState("");
  const [login, setLogin] = useState({ email: "", password: "" });


  
  // Submit donor
  const handleDonorSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/donors/add", donor);
      alert("✅ Donor registered successfully!");
      setDonor({
        name: "",
        bloodType: "",
        rhFactor: "",
        gender: "",
        dateOfBirth: "",
        contactInfo: "",
        address: "",
        medicalHistory: "",
      });
      fetchDonors();
    } catch {
      alert("❌ Error registering donor");
    }
  };

  // Submit recipient
  const handleRecipientSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/recipients/add", recipient);
      alert("✅ Recipient registered successfully!");
      setRecipient({
        name: "",
        bloodType: "",
        rhFactor: "",
        gender: "",
        dateOfBirth: "",
        contactInfo: "",
        address: "",
      });
      fetchRecipients();
    } catch {
      alert("❌ Error registering recipient");
    }
  };

  // Submit blood request
  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/requests/add", request);
      alert("✅ Blood request submitted!");
      setRequest({
        recipientID: "",
        requiredBloodType: "",
        requiredRh: "",
        quantityRequired: "",
      });
      setMatchedDonors([]);
    } catch {
      alert("❌ Error submitting request");
    }
  };

  // Fetch stock
  const fetchStock = async () => {
    const res = await axios.get("http://localhost:5000/api/stock/list");
    setStock(res.data);
  };

  // Fetch matched donors (with blood availability)
  const fetchMatchedDonors = async (bloodType, rh) => {
    if (!bloodType || !rh) {
      setMatchedDonors([]);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/requests/matching-donors",
        { bloodType, rhFactor: rh }
      );
      setMatchedDonors(res.data);
    } catch {
      setMatchedDonors([]);
    }
  };

  // Fetch donors (with filter)
  const fetchDonors = useCallback(async () => {
    const url = filterBlood
      ? `http://localhost:5000/api/donors/list?bloodType=${filterBlood}`
      : `http://localhost:5000/api/donors/list`;
    const res = await axios.get(url);
    setDonorList(res.data);
  }, [filterBlood]);

  // Fetch recipients
  const fetchRecipients = async () => {
    const res = await axios.get("http://localhost:5000/api/recipients/list");
    setRecipientList(res.data);
  };

  useEffect(() => {
    fetchStock();
    fetchDonors();
    fetchRecipients();
  }, [fetchDonors]);

  useEffect(() => {
    if (page === "donors") fetchDonors();
  }, [filterBlood, page, fetchDonors]);

  return (
    <div className="App">
      <header className="header">
        <h1>🩸 Blood Donation Management System</h1>
      </header>

      <div className="menu">
        <button onClick={() => setPage("home")}>🏠 Home</button>
        <button onClick={() => setPage("donors")}>🩸 View Donors</button>
        <button onClick={() => setPage("recipients")}>❤️ View Recipients</button>
        <button onClick={() => setPage("login")}>🔐 Login</button>
      </div>

      {/* HOME */}
      {page === "home" && (
        <>
          <section className="main">
            {/* Donor */}
            <div className="card">
              <h2>Register Donor</h2>
              <form onSubmit={handleDonorSubmit}>
                <input
                  placeholder="Name"
                  value={donor.name}
                  onChange={(e) => setDonor({ ...donor, name: e.target.value })}
                  required
                />
                <input
                  placeholder="Blood Type (A/B/AB/O)"
                  value={donor.bloodType}
                  onChange={(e) =>
                    setDonor({ ...donor, bloodType: e.target.value })
                  }
                  required
                />
                <input
                  placeholder="Rh Factor (+/-)"
                  value={donor.rhFactor}
                  onChange={(e) =>
                    setDonor({ ...donor, rhFactor: e.target.value })
                  }
                  required
                />
                <input
                  placeholder="Gender"
                  value={donor.gender}
                  onChange={(e) =>
                    setDonor({ ...donor, gender: e.target.value })
                  }
                  required
                />
                <input
                  type="date"
                  value={donor.dateOfBirth}
                  onChange={(e) =>
                    setDonor({ ...donor, dateOfBirth: e.target.value })
                  }
                />
                <input
                  placeholder="Contact Info"
                  value={donor.contactInfo}
                  onChange={(e) =>
                    setDonor({ ...donor, contactInfo: e.target.value })
                  }
                />
                <input
                  placeholder="Address"
                  value={donor.address}
                  onChange={(e) =>
                    setDonor({ ...donor, address: e.target.value })
                  }
                />
                <input
                  placeholder="Medical History"
                  value={donor.medicalHistory}
                  onChange={(e) =>
                    setDonor({ ...donor, medicalHistory: e.target.value })
                  }
                />
                <button>Add Donor</button>
              </form>
            </div>

            {/* Recipient */}
            <div className="card">
              <h2>Register Recipient</h2>
              <form onSubmit={handleRecipientSubmit}>
                <input
                  placeholder="Name"
                  value={recipient.name}
                  onChange={(e) =>
                    setRecipient({ ...recipient, name: e.target.value })
                  }
                  required
                />
                <input
                  placeholder="Blood Type"
                  value={recipient.bloodType}
                  onChange={(e) =>
                    setRecipient({ ...recipient, bloodType: e.target.value })
                  }
                  required
                />
                <input
                  placeholder="Rh Factor (+/-)"
                  value={recipient.rhFactor}
                  onChange={(e) =>
                    setRecipient({ ...recipient, rhFactor: e.target.value })
                  }
                  required
                />
                <input
                  placeholder="Gender"
                  value={recipient.gender}
                  onChange={(e) =>
                    setRecipient({ ...recipient, gender: e.target.value })
                  }
                />
                <input
                  type="date"
                  value={recipient.dateOfBirth}
                  onChange={(e) =>
                    setRecipient({ ...recipient, dateOfBirth: e.target.value })
                  }
                />
                <input
                  placeholder="Contact Info"
                  value={recipient.contactInfo}
                  onChange={(e) =>
                    setRecipient({ ...recipient, contactInfo: e.target.value })
                  }
                />
                <input
                  placeholder="Address"
                  value={recipient.address}
                  onChange={(e) =>
                    setRecipient({ ...recipient, address: e.target.value })
                  }
                />
                <button>Add Recipient</button>
              </form>
            </div>

            {/* Request */}
            <div className="card">
              <h2>Make Blood Request</h2>
              <form onSubmit={handleRequestSubmit}>
                <input
                  placeholder="Recipient ID"
                  value={request.recipientID}
                  onChange={(e) =>
                    setRequest({ ...request, recipientID: e.target.value })
                  }
                  required
                />
                <input
                  placeholder="Required Blood Type"
                  value={request.requiredBloodType}
                  onChange={(e) => {
                    const v = e.target.value;
                    setRequest({ ...request, requiredBloodType: v });
                    fetchMatchedDonors(v, request.requiredRh);
                  }}
                  required
                />
                <input
                  placeholder="Rh Factor (+/-)"
                  value={request.requiredRh}
                  onChange={(e) => {
                    const v = e.target.value;
                    setRequest({ ...request, requiredRh: v });
                    fetchMatchedDonors(request.requiredBloodType, v);
                  }}
                  required
                />
                <input
                  type="number"
                  placeholder="Quantity Required"
                  value={request.quantityRequired}
                  onChange={(e) =>
                    setRequest({
                      ...request,
                      quantityRequired: e.target.value,
                    })
                  }
                  required
                />

                {/* Matched donors with blood status */}
                <div style={{ marginTop: "10px" }}>
                  <h4>Matching Donors:</h4>
                  {matchedDonors.length === 0 ? (
                    <p>No donors available for this blood group</p>
                  ) : (
                    <table
                      style={{ width: "100%", background: "#fff", marginTop: "10px" }}
                    >
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Blood</th>
                          <th>Rh</th>
                          <th>Contact</th>
                          <th>Status</th>
                          

                        </tr>
                      </thead>
                      <tbody>
                        {matchedDonors.map((d, i) => (
                          <tr key={i}>
                            <td>{d.Name}</td>
                            <td>{d.BloodType}</td>
                            <td>{d.RhFactor}</td>
                            <td>{d.ContactInfo}</td>
                            <td
                              style={{
                                color:
                                  d.BloodStatus === "Available"
                                    ? "green"
                                    : d.BloodStatus === "Used"
                                    ? "red"
                                    : "gray",
                                fontWeight: "bold",
                              }}
                            >
                              {d.BloodStatus}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                <button>Submit Request</button>
              </form>
            </div>
          </section>

          {/* Stock */}
          <section className="stock-section">
            <h2>🧊 Available Blood Stock</h2>
            <table>
              <thead>
                <tr>
                  <th>Blood</th>
                  <th>Rh</th>
                  <th>Component</th>
                  <th>Units</th>
                </tr>
              </thead>
              <tbody>
                {stock.map((unit, i) => (
                  <tr key={i}>
                    <td>{unit.BloodType}</td>
                    <td>{unit.RhFactor}</td>
                    <td>{unit.Component}</td>
                    <td>{unit.AvailableUnits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}

      {/* Donor list with delete button */}
      {page === "donors" && (
        <div className="card">
          <h2>🩸 Donor List</h2>
          <label>Filter Blood Group:</label>
          <input
            placeholder="A/B/AB/O"
            value={filterBlood}
            onChange={(e) => setFilterBlood(e.target.value)}
          />
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Blood</th>
                <th>Rh</th>
                <th>Contact</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {donorList.map((d) => (
                <tr key={d.DonorID}>
                  <td>{d.DonorID}</td>
                  <td>{d.Name}</td>
                  <td>{d.BloodType}</td>
                  <td>{d.RhFactor}</td>
                  <td>{d.ContactInfo}</td>
                  <td>
                    <button
                      onClick={async () => {
                        await axios.delete(
                          `http://localhost:5000/api/donors/delete/${d.DonorID}`
                        );
                        alert("🗑 Donor deleted");
                        fetchDonors();
                      }}
                      style={{
                        background: "red",
                        color: "white",
                        borderRadius: "6px",
                        padding: "5px 10px",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Recipient list */}
      {page === "recipients" && (
        <div className="card">
          <h2>❤️ Recipient List</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Blood</th>
                <th>Rh</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {recipientList.map((r) => (
                <tr key={r.RecipientID}>
                  <td>{r.RecipientID}</td>
                  <td>{r.Name}</td>
                  <td>{r.BloodType}</td>
                  <td>{r.RhFactor}</td>
                  <td>{r.ContactInfo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Login */}
      {page === "login" && (
        <div className="card">
          <h2>🔐 Admin Login</h2>
          <input
            placeholder="Email"
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
          <button>Login</button>
        </div>
      )}

      <footer>
        <p>© 2025 Blood Donation System | DBMS Project</p>
      </footer>
    </div>
  );
}

export default App;
