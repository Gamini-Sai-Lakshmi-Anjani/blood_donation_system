import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">🩸 Blood Donation System</Link>
        <div>
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="/donors">Donors</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/recipients">Recipients</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/donations">Donations</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/requests">Requests</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
