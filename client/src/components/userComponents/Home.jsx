import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Home.css";
import Navbar from "./Navbar";

function Home() {
  const location = useLocation();
  const user = location.state;
  return (
    <div className="home">
      <Navbar user={user} />
    </div>
  );
}

export default Home;
