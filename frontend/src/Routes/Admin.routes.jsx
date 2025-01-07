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
import Paymenthistory from '../layout/Admin/Payment_history/Paymenthistory';
import EditClient from '../layout/Admin/Admin_client/EditClient';
import AddSignal from '../layout/Admin/Admin_signal/AddSignal';
import Signaldetail from '../layout/Admin/Admin_signal/Signaldetail';
import Addbasket from '../layout/Admin/Admin_basket/Addbasket';
import Staffpermission from '../layout/Admin/Admin_staff/Staffpermission';
import Perfom from '../layout/Admin/Admin_perfom/Perfom';
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
import Addbroadcast from '../layout/Admin/Broadcast/Addbroadcast';

import Viewclientdetail from '../layout/Admin/Admin_client/Viewclient';
import Emailtemplate from '../layout/Admin/BasicSetting/Emailtemplate';
import Changepass from '../Auth/Changepass';

import Help from '../layout/Admin/Help_center/Help';
import Closesignal from '../layout/Admin/Admin_signal/Closesignal';
import PaymentRequest from '../layout/Admin/PaymentRequest/PaymentRequest';
import FreetrialStatus from '../layout/Admin/Freetrialstatus/FreetrialStatus';
import ReferAndEarn from '../layout/Admin/BasicSetting/ReferAndEarn';
import Updatebroadcast from '../layout/Admin/Broadcast/Updatebroadcast';
import Addnews from '../layout/Admin/News/Addnews';
import Updatenews from '../layout/Admin/News/Updatenews';
import Addblogs from '../layout/Admin/Bloags/Addblogs';
import Viewblog from '../layout/Admin/Bloags/Viewblog';
import Updatecondition from '../layout/Admin/Termscondition/Updatecondition';
import Updateblogs from '../layout/Admin/Bloags/Updateblogs';
import { UpdateCondition } from '../Services/Admin';
import Editfreeclient from '../layout/Admin/Admin_client/Editfreeclient';
import Autosquareoff from '../layout/Admin/BasicSetting/Autosquareoff';
import Planexpiry from '../layout/Admin/PlanExpiry/Planexpiry';
import Cash from '../layout/Admin/Admin_perfom/Cash';
import Bankdetail from '../layout/Admin/BasicSetting/BankDetaildata/Bankdetail';
import Addbankdetail from '../layout/Admin/BasicSetting/BankDetaildata/Addbankdetail';
import Updatebankdetail from '../layout/Admin/BasicSetting/BankDetaildata/Updatebankdetail';
import QRDetails from '../layout/Admin/BasicSetting/QRDetails/QRDetails';
import ClientDeleteHistory from '../layout/Admin/Admin_client/ClientDeleteHistory';
import Planexpirymonth from '../layout/Admin/PlanExpiryMonth/Planexpirymonth';
import Notificationlist from '../layout/Admin/Notification/Notificationlist';
import AddStock from '../layout/Admin/Admin_basket/AddStock';
import BasketStockPublish from '../layout/Admin/Admin_basket/BasketStockPublish';
import Rebalncing from '../layout/Admin/Admin_basket/Rebalncing';
import BasketPurchaseHistory from '../layout/Admin/Admin_basket/BasketPurchaseHistory';
import ViewBasketStock from '../layout/Admin/Admin_basket/ViewBasketStock';
import EditStock from '../layout/Admin/Admin_basket/EditStock';
import AllBasketHistory from '../layout/Admin/Admin_basket/AllBasketHistory';
import ClientSignaldetail from '../layout/Admin/Admin_client/ClientSignaldetail';
import ClientRequest from '../layout/Admin/Admin_client/ClientRequest/ClientRequest';





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
                    <Route path="/client" element={<Client />} />
                    <Route path="/freeclient" element={<Freeclient />} />
                    <Route path="/addclient" element={<AddUser />} />
                    <Route path="/client/updateclient/:id" element={<EditClient />} />
                    <Route path="/client/clientdetail/:id" element={<Viewclientdetail />} />
                    <Route path="/editfreeclient/:id" element={<Editfreeclient />} />
                    <Route path="/clientdeletehistory" element={<ClientDeleteHistory />} />
                    <Route path="/clientsignaldetail/:id" element={<ClientSignaldetail />} />
                    <Route path="/clientrequest" element={<ClientRequest />} />



                    <Route path="/perfom" element={<Perfom />} />
                    <Route path="/cash" element={<Cash />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/service" element={<Service />} />
                    <Route path="/kyc" element={<Kyc />} />
                    <Route path="/staff" element={<Staff />} />
                    <Route path="/addstaff" element={<AddStaff />} />
                    <Route path="/staff/updatestaff/:id" element={<Update />} />
                    <Route path="/staff/staffpermission/:id" element={<Staffpermission />} />


                    <Route path="/faq" element={<Faq />} />
                    <Route path="/paymenthistory" element={<Paymenthistory />} />



                    <Route path="/signal" element={<Signal />} />
                    <Route path="/addsignal" element={<AddSignal />} />
                    <Route path="/signaldetaile/:id" element={<Signaldetail />} />
                    <Route path="/closesignal" element={<Closesignal />} />


                    <Route path="/basket" element={<Basket />} />
                    <Route path="/addbasket" element={<Addbasket />} />
                    <Route path="/viewdetail/:id" element={<Viewbasketdetail />} />
                    <Route path="/basket/editbasket/:id" element={<Editbasket />} />
                    <Route path="/addstock/:id" element={<AddStock />} />
                    <Route path="/basket/basketstockpublish" element={<BasketStockPublish />} />
                    <Route path="/basket/rebalancing" element={<Rebalncing />} />
                    <Route path="/basket-purchase-history/:id" element={<BasketPurchaseHistory />} />
                    <Route path="/basket/view-basket-stock" element={<ViewBasketStock />} />
                    <Route path="/purchasebaskethistory" element={<AllBasketHistory />} />




                    <Route path="/plan" element={<Plan />} />
                    <Route path="/addplan" element={<Addplan />} />
                    <Route path="/plan/editplan/:id" element={<Editplan />} />



                    <Route path="/category" element={<Category />} />
                    <Route path="/stock" element={<Stock />} />


                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/addblogs" element={<Addblogs />} />
                    <Route path="/updatebolgs" element={<Updateblogs />} />
                    <Route path="/viewblog" element={<Viewblog />} />


                    <Route path="/news" element={<News />} />
                    <Route path="/addnews" element={<Addnews />} />
                    <Route path="/updatenews" element={<Updatenews />} />



                    <Route path="/coupon" element={<Coupon />} />
                    <Route path="/addcoupon" element={<Addcoupon />} />
                    <Route path="/coupon/updatecoupon/:id" element={<Updatecoupon />} />


                    <Route path="/termsandcondtion" element={<Condition />} />
                    <Route path="/updatecondition" element={<Updatecondition />} />



                    <Route path="/banner" element={<Banner />} />


                    <Route path="/generalsettings" element={<Generalsettings />} />
                    <Route path="/Apiinfo" element={<Apiinfo />} />
                    <Route path="/paymentgeteway" element={<Payementgateway />} />
                    <Route path="/emailsetting" element={<Emailsettings />} />
                    <Route path="/emailtemplate" element={<Emailtemplate />} />
                    <Route path="/referandearn" element={<ReferAndEarn />} />
                    <Route path="/autosquareoff" element={<Autosquareoff />} />

                    <Route path="/bankdetail" element={<Bankdetail />} />
                    <Route path="/addbankdetail" element={<Addbankdetail />} />
                    <Route path="/updatebankdetail/:id" element={<Updatebankdetail />} />

                    <Route path="/QRdetails" element={<QRDetails />} />



                    <Route path="/message" element={<Message />} />
                    <Route path="/changepass" element={<Changepass />} />




                    {/* <Route path="/changepass" element={<Changepass />} /> */}
                    <Route path="/help" element={<Help />} />
                    <Route path="/paymentrequest" element={<PaymentRequest />} />

                    <Route path="/freetrialstatus" element={<FreetrialStatus />} />




                    <Route path="/addbroadcast" element={<Addbroadcast />} />
                    <Route path="/updatebroadcast" element={<Updatebroadcast />} />

                    <Route path="/planexpiry" element={<Planexpiry />} />
                    <Route path="/planexpirymonth" element={<Planexpirymonth />} />
                    <Route path="/notificationlist" element={<Notificationlist />} />


                    <Route path="/editstock/:id" element={<EditStock />} />



                </Routes>
            </div>
            <Footer />


        </div>

    );
}

export default MainApp;
