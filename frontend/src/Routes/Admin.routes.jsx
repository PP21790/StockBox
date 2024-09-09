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
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

// import Sidebar from './layout/Sidebar';
import Dashboard from '../layout/Admin/Admin_dashboard/Dashboard';
import History from '../layout/Admin/Payment_history/Paymenthistory';
import Refer from '../layout/Admin/Admin_refer/Refer';
// import Header from './layout/Header';
// import Footer from './layout/Footer';
// import Client from './components/Client';

// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Profile from './components/Profile';
// import Service from './components/Service';
// import Kyc from './components/Kyc';
// import Signal from './components/Signal';
// import Permision from './components/Permision';
// import User from './components/User';
// import Basket from './components/Basket';
// import Faq from './components/Faq';





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
                    
                    {/* <Route path="/user" element={<User />} /> */}
                    {/* <Route path="/user" element={<User />} /> */}
                    <Route path="/basket" element={<Basket/>} />
                    <Route path="/faq" element={<Faq/>} />
                    <Route path="/history" element={<History/>} />
                    <Route path="/refer" element={<Refer />} />
                    

                     
                   
                </Routes>
            </div>
            <Footer />


        </div>

    );
}

export default MainApp;
