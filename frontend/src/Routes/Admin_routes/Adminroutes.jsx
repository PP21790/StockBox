import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashbord';  // Corrected component name
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Client from './components/Client';

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './layout/Admin-profile/Profile';
import Service from './layout/Admin_service/Service';
import Kyc from './layout/Admin_kyc/Kyc';
import Signal from './layout/Admin_signal/Signal';
import Permision from './layout/Admin-permision/Permision';
import User from './layout/Admin_staff/Staff';
import Basket from './layout/Admin_basket/Basket';
import Faq from './layout/Admin-faq/Faq';


function MainApp() {
    const [isToggled, setIsToggled] = useState(false);
    const [isSidebarHovered, setIsSidebarHovered] = useState(false);

    useEffect(() => {
        // Reset hover state when toggled is false
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
                    <Route path="/client" element={<Client />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/service" element={<Service />} />
                    <Route path="/kyc" element={<Kyc />} />
                    <Route path="/signal" element={<Signal />} />
                    <Route path="/permision" element={<Permision />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/basket" element={<Basket />} />
                    <Route path="/faq" element={<Faq />} />
                </Routes>
            </div>
            <Footer />


        </div>

    );
}

export default MainApp;
