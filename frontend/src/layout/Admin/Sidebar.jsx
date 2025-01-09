import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { image_baseurl } from "../../Utils/config";
import { basicsettinglist } from "../../Services/Admin";

const menuItems = [
  { title: "Dashboard", icon: "bx-home-alt", link: "/admin/dashboard" },
  { title: "Client", icon: "bx-user", link: "/admin/client" },
  { title: "Client Request", icon: "bx-user", link: "/admin/clientrequest" },
  { title: "Free Trial Client", icon: "bx-user", link: "/admin/freeclient" },
  {
    title: "Plan",
    icon: "bxl-redux",
    subMenu: [
      { title: "Package", icon: "bx-radio-circle", link: "/admin/plan" },
      { title: "Segment", icon: "bx-radio-circle", link: "/admin/service" },
      { title: "Category", icon: "bx-radio-circle", link: "/admin/category" },
      { title: "Free Trial Status", icon: "bx-radio-circle", link: "/admin/freetrialstatus" },
    ],
  },
  { title: "Staff", icon: "bx-user-plus", link: "/admin/staff" },
  {
    title: "Basket",
    icon: "bx-basket",
    subMenu: [
      { title: "Basket Detail", icon: "bx-basket", link: "/admin/basket" },
      { title: "Basket Stock Published", icon: "bx-radio-circle", link: "/admin/basket/basketstockpublish" },
      { title: "Subscription History", icon: "bx-radio-circle", link: "/admin/purchasebaskethistory" },
    ],
  },
  {
    title: "Signal",
    icon: "bx-wifi-2",
    subMenu: [
      { title: "Open Signal", icon: "bx-radio-circle", link: "/admin/signal" },
      { title: "Close Signal", icon: "bx-radio-circle", link: "/admin/closesignal" },
    ],
  },
  { title: "Payment History", icon: "bx-credit-card", link: "/admin/paymenthistory" },
  { title: "Withdrawal Request", icon: "bx-credit-card", link: "/admin/paymentrequest" },
  { title: "Blogs", icon: "bx-comment-detail", link: "/admin/blogs" },
  { title: "News", icon: "bx-news", link: "/admin/news" },
  { title: "Coupon", icon: "bx-edit-alt", link: "/admin/coupon" },
  { title: "Banner", icon: "bx-news", link: "/admin/banner" },
  { title: "Client Plan Expiry", icon: "lni-dropbox", link: "/admin/planexpiry" },
  { title: "Performance", icon: "bx-news", link: "/admin/perfom" },
  {
    title: "Basic Settings",
    icon: "bx-cog",
    subMenu: [
      { title: "General Setting", icon: "bx-radio-circle", link: "/admin/generalsettings" },
      { title: "Email Setting", icon: "bx-radio-circle", link: "/admin/emailsetting" },
      { title: "API Information", icon: "bx-radio-circle", link: "/admin/Apiinfo" },
      { title: "Payment Gateway", icon: "bx-radio-circle", link: "/admin/paymentgeteway" },
      { title: "Email Template", icon: "bx-radio-circle", link: "/admin/emailtemplate" },
      { title: "Refer And Earn", icon: "bx-radio-circle", link: "/admin/referandearn" },
      { title: "Auto SquareOff", icon: "bx-radio-circle", link: "/admin/autosquareoff" },
      { title: "Bank Detail", icon: "bx-radio-circle", link: "/admin/bankdetail" },
      { title: "QR Detail", icon: "bx-radio-circle", link: "/admin/QRdetails" },
    ],
  },
  { title: "Broadcast SMS", icon: "bx-conversation", link: "/admin/message" },
  { title: "FAQ", icon: "bx-help-circle", link: "/admin/faq" },
  { title: "Help Center", icon: "bxs-chevron-right", link: "/admin/help" },
  { title: "Policy", icon: "bx-info-square", link: "/admin/termsandcondtion" },
];

const Sidebar = ({ onToggleClick }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [clients, setClients] = useState([]);

  const token = localStorage.getItem("token");

  const toggleDropdown = (dropdownName) => (e) => {
    e.preventDefault();
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const getSettingList = async () => {
    try {
      const response = await basicsettinglist(token);
      if (response.status) {
        setClients(response.data);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  useEffect(() => {
    getSettingList();
  }, []);

  return (
    <div>
      <div data-simplebar="init">
        <div className="simplebar-wrapper" style={{ margin: 0 }}>
          <div className="simplebar-content" style={{ padding: 0 }}>
            <div className="sidebar-header">
              <div>
                <img
                  src={`${image_baseurl}uploads/basicsetting/${clients[0]?.favicon}`}
                  className="logo-icon"
                  alt="logo icon"
                />
              </div>
              <div>
                <h4 className="logo-text">{clients[0]?.from_name}</h4>
              </div>
              <div className="toggle-icon ms-auto" onClick={onToggleClick}>
                <i className="bx bx-arrow-back" />
              </div>
            </div>

            <ul className="metismenu mm-show" id="menu">
              {menuItems.map((item, index) => (
                <li key={index} className={activeDropdown === item.title ? "" : ""}>
                  {item.subMenu ? (
                    <>
                      <a
                        href="#"
                        onClick={toggleDropdown(item.title)}
                        className="has-arrow"
                        aria-expanded={activeDropdown === item.title}
                      >
                        <div className="parent-icon">
                          <i className={`bx ${item.icon}`} />
                        </div>
                        <div className="menu-title">{item.title}</div>
                      </a>
                      <ul className={`mm-collapse ${activeDropdown === item.title ? "mm-show" : ""}`}>
                        {item.subMenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <NavLink
                              to={subItem.link}
                              className={({ isActive }) => (isActive ? "active" : "")}
                            >
                              <div className="parent-icon">
                                <i className={`bx ${subItem.icon}`} />
                              </div>
                              <div className="menu-title">{subItem.title}</div>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </>
                    
                  ) : (
                    <NavLink
                      to={item.link}
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      <div className="parent-icon">
                        <i className={`bx ${item.icon}`} />
                      </div>
                      <div className="menu-title">{item.title}</div>
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
