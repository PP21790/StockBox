import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({ onToggleClick }) => {


  return (
    <div>
      <div data-simplebar="init">
        <div className="simplebar-wrapper" style={{ margin: 0 }}>
          <div className="simplebar-height-auto-observer-wrapper">
            <div className="simplebar-height-auto-observer" />
          </div>
          <div className="simplebar-mask">
            <div className="simplebar-offset" style={{ right: 0, bottom: 0 }}>
              <div
                className="simplebar-content-wrapper"

              >
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
                  {/*navigation*/}
                  <ul className="metismenu mm-show" id="menu">
                    <li>
                      <Link
                        to={'/admin/dashboard'}
                      >
                        <div className="parent-icon">
                          <i className="bx bx-home-alt" />
                        </div>
                        <div className="menu-title">Dashboard</div>
                      </Link>

                    </li>


                    <li>
                      <Link to={'/admin/client'}>
                        <div className="parent-icon">
                          <i className="bx bx-user" />
                        </div>
                        <div className="menu-title">Client </div>
                      </Link>
                    </li>
                    <li>
                      <Link to={'/admin/staff'}>
                        <div className="parent-icon">
                          <i className="bx bx-user-plus" />
                        </div>
                        <div className="menu-title">Staff</div>
                      </Link>
                    </li>


                    <li>
                      <Link to="/admin/service">
                        <div className="parent-icon">
                          <i className="bx bx-cog" />
                        </div>
                        <div className="menu-title">Services</div>
                      </Link>
                    </li>

                    <li>
                      <Link to="/admin/basket">
                        <div className="parent-icon">
                          <i className="bx bx-basket" />
                        </div>
                        <div className="menu-title">Basket</div>
                      </Link>
                    </li>

                    <li>
                      <a href="form-froala-editor.html">
                        <div className="parent-icon">
                          <i className="bx bxl-redux" />
                        </div>
                        <div className="menu-title">Refer & Earn</div>
                      </a>
                    </li>

                    <li>
                      <Link to="/admin/kyc">
                        <div className="parent-icon">
                          <i className="bx bx-edit-alt" />
                        </div>
                        <div className="menu-title">Kyc & Agreement
                        </div>
                      </Link>
                    </li>

                    <li>
                      <Link to="/admin/signal">
                        <div className="parent-icon">
                          <i className="bx bx-wifi-2" />
                        </div>
                        <div className="menu-title">Signal History
                        </div>
                      </Link>
                    </li>

                    <li>
                      <a href="form-froala-editor.html">
                        <div className="parent-icon">
                          <i className="bx bx-credit-card" />
                        </div>
                        <div className="menu-title"> Payment History
                        </div>
                      </a>
                    </li>

                    <li>
                      <Link to="/admin/faq">
                        <div className="parent-icon">
                          <i className="bx bxs-chevron-right" />
                        </div>
                        <div className="menu-title">FAQ
                        </div>
                      </Link>
                    </li>

                    <li>
                      <a href="form-froala-editor.html">
                        <div className="parent-icon">
                          <i className="bx bxs-coupon" />
                        </div>
                        <div className="menu-title">Coupon Code
                        </div>
                      </a>
                    </li>
                    <li>
                      <Link to="/admin/permision">
                        <div className="parent-icon">
                          <i className="bx bxs-coupon" />
                        </div>
                        <div className="menu-title">Permision
                        </div>
                      </Link>
                    </li>


                  </ul>
                  {/*end navigation*/}
                </div>
              </div>
            </div>
          </div>
          <div
            className="simplebar-placeholder"
            style={{ width: "auto", height: 1393 }}
          />
        </div>
        <div
          className="simplebar-track simplebar-horizontal"
          style={{ visibility: "hidden" }}
        >
          <div
            className="simplebar-scrollbar"
            style={{ width: 0, display: "none" }}
          />
        </div>
        <div
          className="simplebar-track simplebar-vertical"
          style={{ visibility: "visible" }}
        >
          <div
            className="simplebar-scrollbar"
            style={{
              height: 294,
              transform: "translate3d(0px, 347px, 0px)",
              display: "block"
            }}
          />
        </div>
      </div>

    </div>
  )
}

export default Sidebar