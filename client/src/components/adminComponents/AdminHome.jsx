import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./AdminHome.css";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";

function AdminHome() {
  const location = useLocation();
  let user = location.state;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("//localhost:3000/admin/usersList", { withCredentials: true })
      .then((response) => {
        setUsers(response.data.users);
      });
  }, []);

  let handleAdminAction = async (item) => {
    let email = item.email;
    await axios.post(
      "//localhost:3000/admin/change-admin",
      { email },
      { withCredentials: true }
    );
    await axios
      .get("//localhost:3000/admin/usersList", { withCredentials: true })
      .then((response) => {
        setUsers(response.data.users);
      });
  };
  return (
    <div className="home">
      <AdminNavbar user={user} />
      <div className="user-details">
        <table>
          <thead>
            <tr>
              <th>USERNAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
              <th>ADMIN ROLE</th>
              <th>Assign Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => {
              return (
                <>
                  <tr key={item._id}>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td style={{textAlign:"center"}}>{item.isAdmin ? "Yes" : "No"}</td>
                    <td>
                      {item.isAdmin ? (
                        <button
                          className="admin-button"
                          onClick={() => handleAdminAction(item)}
                        >
                          Remove  from Admin
                        </button>
                      ) : (
                        <button
                          className="admin-button"
                          onClick={() => handleAdminAction(item)}
                        >
                          Assign as Admin
                        </button>
                      )}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminHome;
