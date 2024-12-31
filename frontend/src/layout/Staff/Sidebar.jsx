import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getstaffperuser } from '../../Services/Admin';
import { basicsettinglist } from '../../Services/Admin';
import { image_baseurl } from '../../Utils/config';


const Sidebar = ({ onToggleClick }) => {

  const token = localStorage.getItem('token');
  const userid = localStorage.getItem('id');

  const [permission, setPermission] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  

  const [clients, setClients] = useState([]);
  
  
  
      useEffect(() => {
        getpermissioninfo();
        getsettinglist()
      }, []);


  const getsettinglist = async () => {
    try {
        const response = await basicsettinglist(token);
        if (response.status) {
            setClients(response.data);
        }
    } catch (error) {
        console.log('error', error);
    }
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



  const toggleDropdown = (dropdownName) => (e) => {
    e.preventDefault();
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };




  const menuItems = [
    { title: 'Dashboard', icon: 'bx bx-home-alt', link: '/staff/dashboard' },
    permission.includes('viewclient') && { title: 'Client', icon: 'bx bx-user', link: '/staff/client' },
    permission.includes('viewfreeclient') &&
    { title: 'Free Trial Client', icon: 'bx bx-user', link: '/staff/freeclient' },
    (permission.includes('viewplan') || permission.includes('viewcategory')) && {
      title: 'Plan',
      icon: 'bx bxl-redux',
      isDropdown: true,
      dropdownName: 'plan',
      subItems: [
        ...(permission.includes('viewplan') ? [{ title: 'Package', link: '/staff/plan' }] : []),
        ...(permission.includes('viewcategory') ? [{ title: 'Category', link: '/staff/category' }] : []),
      ].filter(Boolean),
    },
    // permission.includes('viewstaff') && { title: 'Staff', icon: 'bx bx-user-plus', link: '/staff/staff' },
    permission.includes('viewsignal') &&
    {
      title: 'Signal',
      icon: 'bx bx-wifi-2 fs-3 text-white',
      isDropdown: true,
      dropdownName: 'Signal',
      subItems: [
        { title: 'Open Signal', icon: 'bx-radio-circle', link: '/staff/signal' },
        { title: 'Close Signal', icon: 'bx-radio-circle', link: '/staff/closesignal' },

      ]
    },


    permission.includes('paymenthistory') && { title: 'Payment History', icon: 'bx bx-credit-card', link: '/staff/paymenthistory' },
    permission.includes('planexpiry') && { title: 'Plan Expiry', icon: 'bx bx-credit-card', link: '/staff/planexpiry' },
    permission.includes('perform') && { title: 'Performance', icon: 'bx bx-credit-card', link: '/staff/perform' },
    permission.includes('viewblogs') && { title: 'Blogs', icon: 'bx bx-comment-detail', link: '/staff/blogs' },
    permission.includes('viewnews') && { title: 'News', icon: 'bx bx-news', link: '/staff/news' },
    permission.includes('viewcoupon') && { title: 'Coupon', icon: 'bx bx-edit-alt', link: '/staff/coupon' },
    permission.includes('viewbanner') && { title: 'Banner', icon: 'bx bx-news', link: '/staff/banner' },
    permission.includes('viewfaq') && { title: 'Faq', icon: 'bx bx-news', link: '/staff/faq' },
    // permission.includes('viewfaq') && { title: 'Payment Request', icon: 'bx bx-news', link: '/staff/paymentrequest' },
  ].filter(Boolean);

  return (
    <div>
      <div data-simplebar="init">
        <div className="sidebar-header">
          <div>
            {/* <img  src={`${image_baseurl}uploads/basicsetting/${clients[0]?.favicon}`} /> */}
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
