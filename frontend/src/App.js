
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
    if (!token) {

      if (location.pathname.includes("forgetpass")) {
        navigate('/forgetpass')
      } else if (location.pathname.includes("resetpass")) {
        navigate('/resetpass')
      } else if (location.pathname.includes("register")) {
        navigate('/register')
      } else {
        navigate('/login')
      }

    }


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
