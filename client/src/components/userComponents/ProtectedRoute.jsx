import { Children, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";

function ProtectedRoute({children}) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("//localhost:3000/auth/check",{ withCredentials: true })
    .then((response)=>{
        if(response.data.success){
            setIsAuthenticated(true)
        }else{
            setIsAuthenticated(false)
            navigate('/')
        }
    })
    .catch((error)=>{
       console.log("error in validation");
       setIsAuthenticated(false)
       navigate('/')
    })
  },[navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
  return isAuthenticated? children : <Navigate to='/' replace/>
}

export default ProtectedRoute;