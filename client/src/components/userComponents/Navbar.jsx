import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import axios from 'axios'

function Navbar(props) {
    const navigate = useNavigate();
    let userName=props.user.user.username|| "user"
    let handleLogout = () => {
        axios
          .post("//localhost:3000/logout", {}, { withCredentials: true })
          .then((response) => {
            navigate("/");
          });
      };
  return (
    <nav className="navbar">
      <div className="navbar-brand">Welcome {userName}</div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar