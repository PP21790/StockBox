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
import AddSignal from '../layout/Staff/Signal/AddSignal';
import Signaldetail from '../layout/Staff/Signal/Signaldetail';
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
import Editplan from '../layout/Staff/Plans/Editplan';
import Banner from '../layout/Staff/Banner/Banner';
import Closesignal from '../layout/Staff/Signal/Closesignal';
import PaymentRequest from '../layout/Staff/PaymentRequest/PaymentRequest';
import Viewclientdetail from '../layout/Staff/StaffClient/Viewclient';
import Editfreeclient from '../layout/Staff/StaffClient/Editfreeclient';
import Addblogs from '../layout/Staff/Bloags/Addblogs';
import Updateblogs from '../layout/Staff/Bloags/Updateblogs';
import Viewblog from '../layout/Staff/Bloags/Viewblog';
import Addnews from '../layout/Staff/News/Addnews';
import Updatenews from '../layout/Staff/News/Updatenews';
import Changepass from '../Auth/Changepass';
import History from '../layout/Staff/Payment_history copy/Paymenthistory';
import Planexpiry from '../layout/Staff/PlanExpiry/Planexpiry';
import Perform from '../layout/Staff/Perform/Perfom';




function Staffrouting() {

    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('id');

    const [permission, setPermission] = useState([]);

    const [isToggled, setIsToggled] = useState(false);
    const [isSidebarHovered, setIsSidebarHovered] = useState(false);

    useEffect(() => {
        getpermissioninfo()
    }, [])



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
                    <Route path="/dashboard" element={<Dashbord />} />

                    {permission.includes("viewclient") ? <Route path="/client" element={<Client />} /> : ""}
                    {permission.includes("addclient") ? <Route path="/addclient" element={<Addclient />} /> : ""}
                    {permission.includes("editclient") ? <Route path="/client/updateclient/:id" element={<EditClient />} /> : ""}
                    {permission.includes("viewdetail") ? <Route path="/clientdetail/:id" element={<Viewclientdetail />} /> : ""}
                    {permission.includes("viewfreeclient") ? <Route path="/freeclient" element={<Freeclient />} /> : ""}
                    {permission.includes("editfreeclient") ? <Route path="/editfreeclient/:id" element={<Editfreeclient />} /> : ""}
                    <Route path="/profile" element={<Profile />} />



                    {permission.includes("viewstaff") ? <Route path="/staff" element={<Staff />} /> : ""}
                    {permission.includes("addstaff") ? <Route path="/addstaff" element={<AddStaff />} /> : ""}
                    {permission.includes("editstaff") ? <Route path="/staff/updatestaff/:id" element={<Update />} /> : ""}

                    {/* {permission.includes("editstaff") ? <Route path="/staff/staffpermission/:id" element={<Staffpermission />} /> : ""} */}


                    {permission.includes("viewfaq") ? <Route path="/faq" element={<Faq />} /> : ""}


                    {permission.includes("viewsignal") ? <Route path="/signal" element={<Signal />} /> : ""}
                    {permission.includes("addsignal") ? <Route path="/addsignal" element={<AddSignal />} /> : ""}
                    {permission.includes("signaldetail") ? <Route path="/signaldetaile/:id" element={<Signaldetail />} /> : ""}
                    {permission.includes("viewsignal") ? <Route path="/closesignal" element={<Closesignal />} /> : ""}



                    {permission.includes("viewplan") ? <Route path="/plan" element={<Plan />} /> : ""}
                    {permission.includes("addplan") ? <Route path="/addplan" element={<Addplan />} /> : ""}
                    {permission.includes("editplan") ? <Route path="/plan/editplan/:id" element={<Editplan />} /> : ""}



                    {permission.includes("viewcategory") ? <Route path="/category" element={<Category />} /> : ""}


                    {permission.includes("viewblogs") ? <Route path="/blogs" element={<Blogs />} /> : ""}
                    {permission.includes("addblogs") ? <Route path="/addblogs" element={<Addblogs />} /> : ""}
                    {permission.includes("editblogs") ? <Route path="/updatebolgs" element={<Updateblogs />} /> : ""}
                    {permission.includes("blogdetail") ? <Route path="/viewblog" element={<Viewblog />} /> : ""}





                    {permission.includes("viewnews") ? <Route path="/news" element={<News />} /> : ""}
                    {permission.includes("addnews") ? <Route path="/addnews" element={<Addnews />} /> : ""}
                    {permission.includes("editnews") ? <Route path="/updatenews" element={<Updatenews />} /> : ""}




                    {permission.includes("viewcoupon") ? <Route path="/coupon" element={<Coupon />} /> : ""}
                    {permission.includes("addcoupon") ? <Route path="/addcoupon" element={<Addcoupon />} /> : ""}
                    {permission.includes("editcoupon") ? <Route path="/coupon/updatecoupon/:id" element={<Updatecoupon />} /> : ""}



                    {permission.includes("viewbanner") ? <Route path="/banner" element={<Banner />} /> : ""}

                    {permission.includes("paymenthistory") ? <Route path="/paymenthistory" element={<History/>} /> : ""}
                    {permission.includes("planexpiry") ? <Route path="/planexpiry" element={<Planexpiry/>} /> : ""}
                    {permission.includes("perform") ? <Route path="/perform" element={<Perform/>} /> : ""}


                    <Route path="/paymentrequest" element={<PaymentRequest />} />
                    <Route path="/changepass" element={<Changepass />} />






                </Routes>
            </div>
            <Footer />


        </div>

    );
}

export default Staffrouting;
