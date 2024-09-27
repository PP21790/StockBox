import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getstaffperuser } from '../../Services/Admin';

const Sidebar = ({ onToggleClick }) => {
  const token = localStorage.getItem('token');
  const userid = localStorage.getItem('id');

  const [permission, setPermission] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);



  useEffect(() => {
    getpermissioninfo();
  }, []);



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




  const toggleDropdown = (dropdownName) => (e) => {
    e.preventDefault();
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };


  
  const menuItems = [
    { title: 'Dashboard', icon: 'bx bx-home-alt', link: '/staff/dashboard' },
    permission.includes('viewclient') && { title: 'Client', icon: 'bx bx-user', link: '/staff/client' },
    { title: 'Free Trial Client', icon: 'bx bx-user', link: '/staff/freeclient' },
    {
      title: 'Plan',
      icon: 'bx bxl-redux',
      isDropdown: true,
      dropdownName: 'plan',
      subItems: [
        { title: 'Plan', link: '/staff/plan' },
        { title: 'Services', link: '/staff/service' },
        { title: 'Category', link: '/staff/category' },
      ],
    },
    { title: 'Staff', icon: 'bx bx-user-plus', link: '/staff/staff' },
    { title: 'Signal', icon: 'bx bx-wifi-2', link: '/staff/signal' },
    { title: 'Payment History', icon: 'bx bx-credit-card', link: '/staff/paymenthistory' },
    { title: 'Blogs', icon: 'bx bx-comment-detail', link: '/staff/blogs' },
    { title: 'News', icon: 'bx bx-news', link: '/staff/news' },
    { title: 'Coupon', icon: 'bx bx-edit-alt', link: '/staff/coupon' },
    { title: 'Banner', icon: 'bx bx-news', link: '/staff/banner' },
    {
      title: 'Basic Settings',
      icon: 'bx bx-cog',
      isDropdown: true,
      dropdownName: 'Basic Settings',
      subItems: [
        { title: 'General Setting', link: '/staff/generalsettings' },
        { title: 'Email Setting', link: '/staff/emailsetting' },
        { title: 'Api Information', link: '/staff/Apiinfo' },
        { title: 'Payment Gateway', link: '/staff/paymentgeteway' },
      ],
    },
    { title: 'Broadcast SMS', icon: 'bx bx-conversation', link: '/staff/message' },
    { title: 'KYC Agreement', icon: 'bx bxs-chevron-right', link: '/staff/kyc' },
    { title: 'FAQ', icon: 'bx bx-help-circle', link: '/staff/faq' },
    { title: 'Help Center', icon: 'bx bxs-chevron-right', link: '/staff/faq' },
    { title: 'Terms And Condition', icon: 'bx bx-info-square', link: '/staff/termsandcondtion' },
  ].filter(Boolean);

  return (
    <div>
      <div data-simplebar="init">
        <div className="sidebar-header">
          <div>
            <img src="/assets/images/logo-icon.png" className="logo-icon" alt="logo icon" />
          </div>
          <div>
            <h4 className="logo-text">STOCK BOX</h4>
          </div>
          <div className="toggle-icon ms-auto" onClick={onToggleClick}>
            <i className="bx bx-arrow-back" />
          </div>
        </div>




        <ul className="metismenu mm-show" id="menu">
          {menuItems.map((item, index) => (
            <li key={index} className={activeDropdown === item.dropdownName ? 'mm-active' : ''}>
              {item.isDropdown ? (
                <>
                  <a href="#" onClick={toggleDropdown(item.dropdownName)} className="has-arrow" aria-expanded={activeDropdown === item.dropdownName}>
                    <div className="parent-icon"><i className={item.icon} /></div>
                    <div className="menu-title">{item.title}</div>
                  </a>
                  <ul className={`mm-collapse ${activeDropdown === item.dropdownName ? 'mm-show' : ''}`}>
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link to={subItem.link}>
                          <div className="parent-icon"><i className="bx bx-radio-circle" /></div>
                          <div className="menu-title">{subItem.title}</div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link to={item.link}>
                  <div className="parent-icon"><i className={item.icon} /></div>
                  <div className="menu-title">{item.title}</div>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
