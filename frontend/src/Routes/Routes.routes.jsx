import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Forgetpass from '../Auth/Forgetpass';
import Resetpass from '../Auth/Resetpass';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import AdminRouting from './Admin.routes';
import Staff from './Staff.routes';




const Routing = () => {


    const location = useLocation();
    const navigate = useNavigate();
    const roles = localStorage.getItem('Role');
    const FullName = localStorage.getItem("FullName");
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");


    useEffect(() => {
        
        if (location.pathname === "/forget") {
            navigate("/forget");
            return;
        }

        if (location.pathname === "/register") {
            navigate("/register");
            return;
        }

        // Check if user details exist
        if ( !roles || token === "null" || roles === "null" || location.pathname === "/login") {
            navigate("/login");
            return;
        }


        //Redirect based on user role and route prefix
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

    }, [navigate, location.pathname, roles, id,FullName,token]);



    return (
        <Routes>
         
            <Route path="/admin/*" element={(roles === "1") ? <AdminRouting /> : <Login />} />
            <Route path="/Staff/*" element={(roles === "2") ? <Staff /> : <Login />} />
            {/*<Route path="/user/*" element={(roles === "USER") ? <UserRouting /> : <Login />} />
            <Route path="/employee/*" element={(roles === "EMPLOYEE") ? <EmployeeRouting /> : <Login />} />
            <Route path="/research/*" element={(roles === "RESEARCH") ? <ResearchRouting /> : <Login />} />
            <Route path="/superadmin/*" element={(roles === "SUPERADMIN") ? <SuperadminRouting /> : <Login />} /> */}



            {/* Add other routes here */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/forget" element={<Forgetpass />} />
            {/* <Route path="/updatepassword/:id" element={<Update />} /> */}
        </Routes>
    );
}

export default Routing;
