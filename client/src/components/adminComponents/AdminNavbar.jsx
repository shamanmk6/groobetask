import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminNavbar.css";
import axios from 'axios'

function AdminNavbar(props) {
    const navigate = useNavigate();
    let adminName=props.admin.admin.username|| "user"
    let handleLogout = () => {
        axios
          .post("//localhost:3000/logout", {}, { withCredentials: true })
          .then((response) => {
            navigate("/admin");
          });
      };
  return (
    <nav className="navbar">
      <div className="navbar-brand">Welcome Admin {adminName}</div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default AdminNavbar