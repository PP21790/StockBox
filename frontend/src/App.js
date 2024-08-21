
import './App.css';
import Forgetpass from './Auth/Forgetpass';
import Resetpass from './Auth/Resetpass';
import Login from './Auth/Login';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import Main_Route from './Route'
import Register from './Auth/Register';
function App() {
  const navigate = useNavigate()
  const location = useLocation();
  const token = localStorage.getItem('token')

  useEffect(() => {


    // Check if user details exist
    if (!token || token === "null" || location.pathname === "/login") {
      navigate("/login");
      return;
    }


    // Redirect based on user role and route prefix
    // switch (Role) {
    //   case "Admin":
    //     if (location.pathname === "/login" || location.pathname === "/" || !location.pathname.startsWith("/admin")) {
    //       navigate("/admin/dashboard");
    //     }
    //     break;
    //   case "User":
    //     if (location.pathname === "/login" || location.pathname === "/" || !location.pathname.startsWith("/user")) {
    //       navigate("/user/dashboard");
    //     }
    //     break;
    //   default:
    //     break;
    // }
  }, [navigate, location.pathname, token]);

  return (
    <>



      <Routes>
        <Route path="/admin/*" element={(token) ? <Main_Route /> : <Login />} />

        <Route path="/login" element={<Login />} />
        <Route path="/resetpass" element={<Resetpass />} />
        <Route path="/forgetpass" element={<Forgetpass />} />
        <Route path="/register" element={<Register />} />

      </Routes>



    </>

  );
}

export default App;
