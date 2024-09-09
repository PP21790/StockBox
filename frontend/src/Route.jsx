import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './layout/Sidebar';
import Dashboard from './components/Dashbord';  // Corrected component name
import Header from './layout/Header';
import Footer from './layout/Footer';
import Client from './components/Client';

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './components/Profile';
import Service from './components/Service';
import Kyc from './components/Kyc';
import Signal from './components/Signal';
import Permision from './components/Permision';
import User from './components/User';
import Basket from './components/Basket';
import Faq from './components/Faq';


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
