import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../layout/Admin/Admin_dashboard/Dashboard';


import Profile from '../layout/Admin/Admin_profile/Profile';


import Faq from '../layout/Admin/Admin_faq/Faq';
import Sidebar from '../layout/Client/Sidebar'
import Header from '../layout/Client/Header';
import Footer from '../layout/Client/Footer';


// import AddUser from '../layout/Admin/Admin_client/AddUser';
// import EditClient from '../layout/Admin/Admin_client/EditClient';


function Client() {



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
                    {/* <Route path="/addclient" element={<AddUser />} /> */}
                    {/* <Route path="/client/updateclient/:id" element={<EditClient />} /> */}
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/faq" element={<Faq />} />

                </Routes>
            </div>
            <Footer />


        </div>

    );
}

export default Client;
