import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "//localhost:3000/signup",
        { email, username, password, role },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.success) {
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("An unexpected error occured");
        }
        console.log(error);
      });
  };
  return (
    <div className="signup-form">
      <h1>Signup</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="form-group">
          <p>Email</p>
          <input
            type="email"
            value={email}
            onChange={(evnt) => setEmail(evnt.target.value)}
          />
        </div>
        <div className="form-group">
          <p>Username</p>
          <input
            type="text"
            value={username}
            onChange={(evnt) => setUsername(evnt.target.value)}
          />
        </div>
        <div className="form-group">
          <p>Role</p>
          <select
            name=""
            id=""
            value={role}
            onChange={(evnt) => {
              setRole(evnt.target.value);
            }}
          >
            <option value="">Select Role</option>
            <option value="manager">Manager</option>
            <option value="l1">L1</option>
            <option value="l2">L2</option>
          </select>
        </div>
        <div className="form-group">
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(evnt) => setPassword(evnt.target.value)}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="login-route">
        <p>Already have an account?</p>
        <Link className="login-button" to="/">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
