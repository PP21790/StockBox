import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const menuItems = [
  { title: 'Dashboard', icon: 'bx-home-alt', link: '/admin/dashboard' },
  { title: 'Client', icon: 'bx-user', link: '/admin/client' },
  { title: 'Free Trial Client', icon: 'bx-user', link: '/admin/freeclient' },
  {
    title: 'Plan',
    icon: 'bxl-redux',
    subMenu: [
      { title: 'Plan', icon: 'bx-radio-circle', link: '/admin/plan' },
      { title: 'Services', icon: 'bx-radio-circle', link: '/admin/service' },
      { title: 'Category', icon: 'bx-radio-circle', link: '/admin/category' }
    ]
  },
  { title: 'Staff', icon: 'bx-user-plus', link: '/admin/staff' },
  { title: 'Signal', icon: 'bx-wifi-2', link: '/admin/signal' },
  { title: 'Payment History', icon: 'bx-credit-card', link: '/admin/paymenthistory' },
  { title: 'Blogs', icon: 'bx-comment-detail', link: '/admin/blogs' },
  { title: 'News', icon: 'bx-news', link: '/admin/news' },
  { title: 'Coupon', icon: 'bx-edit-alt', link: '/admin/coupon' },
  { title: 'Banner', icon: 'bx-news', link: '/admin/banner' },
  {
    title: 'Basic Settings',
    icon: 'bx-cog',
    subMenu: [
      { title: 'General Setting', icon: 'bx-radio-circle', link: '/admin/generalsettings' },
      { title: 'Email Setting', icon: 'bx-radio-circle', link: '/admin/emailsetting' },
      { title: 'Api Information', icon: 'bx-radio-circle', link: '/admin/Apiinfo' },
      { title: 'Payment Gateway', icon: 'bx-radio-circle', link: '/admin/paymentgeteway' },
      { title: 'Email Template', icon: 'bx-radio-circle', link: '/admin/emailtemplate' }
    ]
  },
  { title: 'Broadcast SMS', icon: 'bx-conversation', link: '/admin/message' },
  { title: 'KYC Agreement', icon: 'bxs-chevron-right', link: '/admin/kyc' },
  { title: 'FAQ', icon: 'bx-help-circle', link: '/admin/faq' },
  { title: 'Help Center', icon: 'bxs-chevron-right', link: '/admin/helpcenter' },
  { title: 'Terms And Condition', icon: 'bx-info-square', link: '/admin/termsandcondtion' }
];

const Sidebar = ({ onToggleClick }) => {
  const [activeIndex, setActiveIndex] = useState(null); // Track the active li by index
  const [activeDropdown, setActiveDropdown] = useState(null); // Track the active dropdown

  const handleItemClick = (index) => () => {
    setActiveIndex(index); // Set the clicked li as active
  };

  const toggleDropdown = (dropdownName, index) => (e) => {
    e.preventDefault();
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    setActiveIndex(index); // Also set the dropdown as active when clicked
  };

  return (
    <div>
      <div data-simplebar="init">
        <div className="simplebar-wrapper" style={{ margin: 0 }}>
          <div className="simplebar-content mm-active" style={{ padding: 0 }}>
            <div className="sidebar-header">
              <div>
                <img
                  src="/assets/images/logo-icon.png"
                  className="logo-icon"
                  alt="logo icon"
                />
              </div>
              <div>
                <h4 className="logo-text">STOCK BOX</h4>
              </div>
              <div className="toggle-icon ms-auto" onClick={onToggleClick}>
                <i className="bx bx-arrow-back" />
              </div>
            </div>

            {/* Dynamic Navigation */}
            <ul className="metismenu mm-show" id="menu">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={
                    activeIndex === index ? 'mm-active' : '' // Add mm-active if the item is active
                  }
                >
                  {item.subMenu ? (
                    <>
                      <a
                        href="#"
                        onClick={toggleDropdown(item.title, index)}
                        className="has-arrow"
                        aria-expanded={activeDropdown === item.title}
                      >
                        <div className="parent-icon">
                          <i className={`bx ${item.icon}`} />
                        </div>
                        <div className="menu-title">{item.title}</div>
                      </a>
                      <ul
                        className={`mm-collapse ${activeDropdown === item.title ? 'mm-show' : ''
                          }`}
                      >
                        {item.subMenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link to={subItem.link}>
                              <div className="parent-icon">
                                <i className={`bx ${subItem.icon}`} />
                              </div>
                              <div className="menu-title">{subItem.title}</div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link to={item.link} onClick={handleItemClick(index)}>
                      <div className="parent-icon">
                        <i className={`bx ${item.icon}`} />
                      </div>
                      <div className="menu-title">{item.title}</div>
                    </Link>
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
