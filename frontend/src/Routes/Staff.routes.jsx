import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../layout/Admin/Admin_dashboard/Dashboard';


import Client from '../layout/Staff/StaffClient/Client';
import Addclient from '../layout/Staff/StaffClient/Addclient';
import EditClient from '../layout/Staff/StaffClient/Editclient';
import { getstaffperuser } from '../Services/Admin';
import Freeclient from '../layout/Staff/StaffClient/Freeclient';



import Dashbord from '../layout/Staff/Dashboard/Dashboard';
 

import Profile from '../layout/Staff/Profile/Profile';
import Service from '../layout/Staff/Service/Service.s';
import Kyc from '../layout/Staff/Kyc/Kyc';
import Signal from '../layout/Staff/Signal/Signal';



import Faq from '../layout/Staff/Faq/Faq';
import Basket from '../layout/Staff/Basket/Basket';
import Sidebar from '../layout/Staff/Sidebar';
import Header from '../layout/Staff/Header';
import Footer from '../layout/Staff/Footer';
import Staff from '../layout/Staff/Staff/Staff';
import AddStaff from '../layout/Staff/Staff/AddStaff';
import Update from '../layout/Staff/Staff/Update';
import Refer from '../layout/Staff/Refer/Refer';
import Paymenthistory from '../layout/Staff/Payment_history/Paymenthistory';
import AddSignal from '../layout/Staff/Signal/AddSignal';
import Signaldetail from '../layout/Staff/Signal/Signaldetail';
import Addbasket from '../layout/Staff/Basket/Addbasket';
import Staffpermission from '../layout/Staff/Staff/Staffpermission';
import Plan from '../layout/Staff/Plans/Plan';
import Addplan from '../layout/Staff/Plans/Addplan';
import Category from '../layout/Staff/Category/Category';
import Stock from '../layout/Staff/Stock/Stock';
import Blogs from '../layout/Staff/Bloags/Blogs';
import News from '../layout/Staff/News/News';
import Coupon from '../layout/Staff/Coupon/Coupon';
import Addcoupon from '../layout/Staff/Coupon/Addcoupon';
import Updatecoupon from '../layout/Staff/Coupon/Updatecoupon';
import Condition from '../layout/Staff/Termscondition/Condition';
import Editbasket from '../layout/Staff/Basket/Editbasket';
import Viewbasketdetail from '../layout/Staff/Basket/Viewbasketdetail';
import Editplan from '../layout/Staff/Plans/Editplan';
import Banner from '../layout/Staff/Banner/Banner';
import Generalsettings from '../layout/Staff/BasicSetting/Generalsettings';
import Apiinfo from '../layout/Staff/BasicSetting/Apiinfo';
import Payementgateway from '../layout/Staff/BasicSetting/Payementgateway';
import Emailsettings from '../layout/Staff/BasicSetting/Emailsettings';
import Message from '../layout/Staff/Broadcast/Message';
import Changepass from '../layout/Staff/Password/Changepass';




function Staffrouting() {

    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('id');

    const [permission, setPermission] = useState([]);

    const [isToggled, setIsToggled] = useState(false);
    const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  

    useEffect(() => {
        getpermissioninfo()
    })



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

                    {permission.includes("viewclient") ? <Route path="/client" element={<Client />} /> : ""}
                    {permission.includes("addclient") ? <Route path="/addclient" element={<Addclient />} /> : ""}
                    {permission.includes("editclient") ?  <Route path="/client/updateclient/:id" element={<EditClient />}/> : ""}

                     <Route path="/freeclient" element={<Freeclient />} />
                   

                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/faq" element={<Faq />} />
                       

                    <Route path="/dashboard" element={<Dashbord/>} />
    
                
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

export default Staffrouting;
