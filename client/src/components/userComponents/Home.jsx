import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Home.css";
import Navbar from "./Navbar";

function Home() {
  const location = useLocation();
  let user = location.state;
  console.log(user.user);
  return (
    <div className="home">
      <Navbar user={user} />
      <div className="user-details">
        <table>
          <thead>
            <tr>
              <th>USERNAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.user.username}</td>
              <td>{user.user.email}</td>
              <td>{user.user.role}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
