import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../layout/Admin/Admin_dashboard/Dashboard';


import Client from '../layout/Admin/Admin_client/Client';
import Profile from '../layout/Admin/Admin_profile/Profile';
import Service from '../layout/Admin/Admin_service/Service.s';
import Kyc from '../layout/Admin/Admin_kyc/Kyc';
import Signal from '../layout/Admin/Admin_signal/Signal';

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
import EditClient from '../layout/Admin/Admin_client/EditClient';
import AddSignal from '../layout/Admin/Admin_signal/AddSignal';
import Signaldetail from '../layout/Admin/Admin_signal/Signaldetail';
import Addbasket from '../layout/Admin/Admin_basket/Addbasket';
import Staffpermission from '../layout/Admin/Admin_staff/Staffpermission';
import Plan from '../layout/Admin/Plans/Plan';
import Addplan from '../layout/Admin/Plans/Addplan';
import Category from '../layout/Admin/Category/Category';
import Stock from '../layout/Admin/Stock/Stock';
import Blogs from '../layout/Admin/Bloags/Blogs';
import News from '../layout/Admin/News/News';
import Coupon from '../layout/Admin/Coupon/Coupon';
import Addcoupon from '../layout/Admin/Coupon/Addcoupon';
import Updatecoupon from '../layout/Admin/Coupon/Updatecoupon';
import Condition from '../layout/Admin/Termscondition/Condition';
import Editbasket from '../layout/Admin/Admin_basket/Editbasket';
import Viewbasketdetail from '../layout/Admin/Admin_basket/Viewbasketdetail';
import Editplan from '../layout/Admin/Plans/Editplan';
import Banner from '../layout/Admin/Banner/Banner';
import Generalsettings from '../layout/Admin/BasicSetting/Generalsettings';
import Apiinfo from '../layout/Admin/BasicSetting/Apiinfo';
import Payementgateway from '../layout/Admin/BasicSetting/Payementgateway';
import Emailsettings from '../layout/Admin/BasicSetting/Emailsettings';
import Freeclient from '../layout/Admin/Admin_client/Freeclient';
import Message from '../layout/Admin/Broadcast/Message';
import Changepass from '../layout/Admin/Password/Changepass';
import Viewclientdetail from '../layout/Admin/Admin_client/Viewclient';





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
                    <Route path="/client" element={<Client/>} />
                    <Route path="/freeclient" element={<Freeclient />} />
                    <Route path="/addclient" element={<AddUser/>} />
                    <Route path="/client/updateclient/:id" element={<EditClient/>} />
                    <Route path="/client/clientdetail/:id" element={<Viewclientdetail/>} />

                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/service" element={<Service/>} />
                    <Route path="/kyc" element={<Kyc/>} />
    
                   


                    <Route path="/staff" element={<Staff/>} />
                    <Route path="/addstaff" element={<AddStaff/>} />
                    <Route path="/staff/updatestaff/:id" element={<Update/>} />
                    <Route path="/staff/staffpermission/:id" element={<Staffpermission/>} />


                    <Route path="/faq" element={<Faq/>} />
                    <Route path="/refer" element={<Refer />} />
                    <Route path="/paymenthistory" element={<Paymenthistory />} />
                    


                    <Route path="/signal" element={<Signal/>} />
                    <Route path="/addsignal" element={<AddSignal/>} />
                    <Route path="/signal/signaldetaile/:id" element={<Signaldetail/>} />
                        

                    <Route path="/basket" element={<Basket/>} />
                    <Route path="/addbasket" element={<Addbasket/>} />
                    <Route path="/basket/viewdetail/:id" element={<Viewbasketdetail/>} />
                    <Route path="/basket/editbasket/:id" element={<Editbasket />} />
                     
                    

                    <Route path="/plan" element={<Plan/>} />
                    <Route path="/addplan" element={<Addplan/>} />
                    <Route path="/plan/editplan/:id" element={<Editplan/>} />



                    <Route path="/category" element={<Category/>} />
                    <Route path="/stock" element={<Stock/>} />


                    <Route path="/blogs" element={<Blogs/>} />
                    <Route path="/news" element={<News/>} />
                      


                    <Route path="/coupon" element={<Coupon/>} />
                    <Route path="/addcoupon" element={<Addcoupon/>} />
                    <Route path="/coupon/updatecoupon/:id" element={<Updatecoupon/>} />


                    <Route path="/termsandcondtion" element={<Condition/>} />

                    
                    <Route path="/banner" element={<Banner/>} />


                    <Route path="/generalsettings" element={<Generalsettings/>} />
                    <Route path="/Apiinfo" element={<Apiinfo/>} />
                    <Route path="/paymentgeteway" element={<Payementgateway/>} />
                    <Route path="/emailsetting" element={<Emailsettings/>} />
                    <Route path="/message" element={<Message />} />
                    <Route path="/changepass" element={<Changepass />} />
                    

                    
                    
                    
                      
                </Routes>
            </div>
            <Footer />


        </div>

    );
}

export default MainApp;
