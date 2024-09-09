import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../layout/Admin/Admin_dashboard/Dashboard';


import Client from '../layout/Admin/Admin_client/Client';
import Profile from '../layout/Admin/Admin_profile/Profile';
import Service from '../layout/Admin/Admin_service/Service.s';
import Kyc from '../layout/Admin/Admin_kyc/Kyc';
import Signal from '../layout/Admin/Admin_signal/Signal';
import Permision from '../layout/Admin/Admin_permision/Permision';
import Faq from '../layout/Admin/Admin_faq/Faq';
import Basket from '../layout/Admin/Admin_basket/Basket';
import Sidebar from '../layout/Admin/Sidebar';
import Header from '../layout/Admin/Header';
import Footer from '../layout/Admin/Footer';
import Staff from '../layout/Admin/Admin_staff/Staff';
import AddUser from '../layout/Admin/Admin_client/AddUser';
import AddStaff from '../layout/Admin/Admin_staff/AddStaff';
import Update from '../layout/Admin/Admin_staff/Update';
import Refer from '../layout/Admin/Admin_refer/Refer';
import Paymenthistory from '../layout/Admin/Payment_history/Paymenthistory';



function MainApp() {
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
                    {/* <Route path="/client" element={<Dashboard/>} /> */}
                    <Route path="/client" element={<Client/>} />
                    <Route path="/addclient" element={<AddUser/>} />
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/service" element={<Service/>} />
                    <Route path="/kyc" element={<Kyc/>} />
                    <Route path="/signal" element={<Signal/>} />
                    <Route path="/permision" element={<Permision/>} />
                    <Route path="/staff" element={<Staff/>} />
                    <Route path="/addstaff" element={<AddStaff/>} />
                    <Route path="/staff/updatestaff/:id" element={<Update/>} />
                    <Route path="/basket" element={<Basket/>} />
                    <Route path="/faq" element={<Faq/>} />
                    <Route path="/refer" element={<Refer />} />
                    <Route path="/paymenthistory" element={<Paymenthistory />} />
                    
                </Routes>
            </div>
            <Footer />


        </div>

    );
}

export default MainApp;
