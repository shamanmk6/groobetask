import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/userComponents/Login";
import Signup from "./components/userComponents/Signup";
import Home from "./components/userComponents/Home";
import ProtectedRoute from "./components/userComponents/ProtectedRoute";
import AdminLogin from "./components/adminComponents/AdminLogin";
import AdminHome from "./components/adminComponents/AdminHome";
import Error from "./components/Error";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/admin" element={<AdminLogin/>}></Route>
          <Route path="/admin-home" element={<ProtectedRoute><AdminHome/></ProtectedRoute>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
          <Route path="*" element={<Error/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
