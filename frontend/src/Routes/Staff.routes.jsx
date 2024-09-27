import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../layout/Admin/Admin_dashboard/Dashboard';



import Profile from '../layout/Admin/Admin_profile/Profile';


import Faq from '../layout/Admin/Admin_faq/Faq';
import Sidebar from '../layout/Staff/Sidebar'
import Header from '../layout/Staff/Header';
import Footer from '../layout/Staff/Footer';

import Client from '../layout/Staff/StaffClient/Client';
import Addclient from '../layout/Staff/StaffClient/Addclient';
import EditClient from '../layout/Staff/StaffClient/Editclient';
import { getstaffperuser } from '../Services/Admin';



function Staff() {
  
    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('id');
    
    const [permission, setPermission] = useState([]);
   
    const [isToggled, setIsToggled] = useState(false);
    const [isSidebarHovered, setIsSidebarHovered] = useState(false);

    useEffect(() => {

        if (!isToggled) {
            setIsSidebarHovered(false);
        }
    }, [isToggled]);

    const handleMouseEnter = () => {
        if (isToggled) {
            setIsSidebarHovered(true);
        }
    };

    const handleMouseLeave = () => {
        if (isToggled) {
            setIsSidebarHovered(false);
        }
    };

    const handleToggleClick = () => {
        setIsToggled((prevState) => !prevState);
    };



    
    const getpermissioninfo = async () => {
        try {
            const response = await getstaffperuser(userid, token);
            if (response.status) {
                setPermission(response.data.permissions);
            }
        } catch (error) {
            console.log("error", error);
        }
    };
    

    useEffect(()=>{
        getpermissioninfo()
    })


    return (

        <div
            className={`wrapper ${isToggled ? 'toggled' : ''} ${isSidebarHovered ? 'sidebar-hovered' : ''}`}
        >
            <div
                className="sidebar-wrapper"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Sidebar onToggleClick={handleToggleClick} />
            </div>
            <Header />
            <div className="page-wrapper">
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                
                {permission.includes("viewclient") ?    <Route path="/client" element={<Client />} /> :"   " }
                {permission.includes("addclient") ?    <Route path="/addclient" element={<Addclient />} /> :"   " }
                  
                  
                    <Route path="/client/updateclient/:id" element={<EditClient />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/faq" element={<Faq />} />

                </Routes>
            </div>
            <Footer />


        </div>

    );
}

export default Staff;
