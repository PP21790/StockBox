import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Login from '../Auth/Login';
import Register from '../Auth/Register';
import AdminRouting from './Admin.routes';
// import Staff from './Staff.routes';
import Staffrouting from './Staff.routes';
// import Client from './Client.routes';
import Forgetpassword from '../Auth/Forgetpassword';
import Resetpassword from '../Auth/Resetpassword';



const Routing = () => {


    const location = useLocation();
    const navigate = useNavigate();
    const roles = localStorage.getItem('Role');
    const FullName = localStorage.getItem("FullName");
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");


    useEffect(() => {

        if (location.pathname.includes("resetpassword")) {
            navigate(location.pathname);
            return;
        }

        if (location.pathname === "/forget") {
            navigate("/forget");
            return;
        }

        if (location.pathname === "/register") {
            navigate("/register");
            return;
        }


        if (!roles || token === "null" || roles === "null" || location.pathname === "/login") {
            navigate("/login");
            return;
        }



        switch (roles) {
            case "1":
                if (location.pathname === "/login" || location.pathname === "/" || !location.pathname.startsWith("/admin")) {
                    navigate("/admin/dashboard");
                }
                break;
            case "2":
                if (location.pathname === "/login" || location.pathname === "/" || !location.pathname.startsWith("/staff")) {
                    navigate("/staff/dashboard");
                }
                break;
            
            default:
                break;
        }

    }, [navigate, location.pathname, roles, id, FullName, token]);



    return (
        <Routes>

            <Route path="/admin/*" element={(roles === "1") ? <AdminRouting /> : <Login />} />
            <Route path="/Staff/*" element={(roles === "2") ? <Staffrouting /> : <Login />} />
            {/* <Route path="/client/*" element={(roles === "3") ? <Client /> : <Login />} /> */}




            {/* Add other routes here */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/resetpassword/:id" element={<Resetpassword/>} />
            <Route path="/forget" element={<Forgetpassword/>} />
            {/* <Route path="/updatepassword/:id" element={<Update />} /> */}
        </Routes>
    );
}

export default Routing;
