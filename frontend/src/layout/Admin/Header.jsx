import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { getHelpMessagelist , gettradestatus} from '../../Services/Admin'
import { fDateTime } from '../../Utils/Date_formate';
import { formatDistanceToNow } from 'date-fns';

const Header = () => {
  
  
  const token = localStorage.getItem('token');
  const FullName = localStorage.getItem('FullName');
  
  const [clients, setClients] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  
  
  useEffect(() => {
    getdemoclient();

  }, []);


  const getdemoclient = async () => {
    try {
      const response = await getHelpMessagelist(token);
      if (response.status) {
        const today = new Date().toISOString().split('T')[0];
        const todaysData = response.data.filter(item => {
          if (!item.created_at) {
            return false;
          }

          const itemDate = new Date(item.created_at);
          if (isNaN(itemDate.getTime())) {
            return false;
          }

          return itemDate.toISOString().split('T')[0] === today;
        });

        setClients(todaysData);
      }
    } catch (error) {
      console.log("error", error);
    }
  }



  const getstatusdetaile = async () => {
    try {
      const response = await gettradestatus(token);
      console.log("reponse")
      if (response.status === true && response.url) {
        window.location.href = response.url; 
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  







  const handleToggle = () => {
    setIsChecked(!isChecked);
  };


  return (
    <div>
      <>
        {/*start header */}
        <header>
          <div className="topbar d-flex align-items-center">
            <nav className="navbar navbar-expand gap-3">
              <div className="mobile-toggle-menu">
                <i className="bx bx-menu" />
              </div>
              {/* <div
                className="position-relative search-bar d-lg-block d-none"
                data-bs-toggle="modal"
                data-bs-target="#SearchModal"
              >
                <input
                  className="form-control px-5"
                  type="search"
                  placeholder="Search"
                />
                <span className="position-absolute top-50 search-show ms-3 translate-middle-y start-0 top-50 fs-5">
                  <i className="bx bx-search" />
                </span>
              </div> */}
              <div className="top-menu ms-auto">
                <ul className="navbar-nav align-items-center gap-1">
                  <li
                    className="nav-item mobile-search-icon d-flex d-lg-none"
                    data-bs-toggle="modal"
                    data-bs-target="#SearchModal"
                  >
                    <a className="nav-link" href="avascript:;">
                      <i className="bx bx-search" />
                    </a>
                  </li>

                  <li>
                    <div className='d-flex'>
                      <span className="switch-label p-1">Trading Status :{isChecked ? "On" : "Off"}</span>
                      <div className="form-check form-switch form-check-dark" style={{ margin: "inherit", fontSize: "21px" }}>

                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDark"
                          checked={isChecked}
                          onChange={getstatusdetaile}
                        />

                      </div>
                    </div>
                  </li>



                  <li className="nav-item dropdown dropdown-large">
                    <a
                      className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      {clients.length ?
                        <>
                          <span className="alert-count">{clients.length}</span>

                        </>
                        : ""}
                      <i className="bx bx-bell" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">
                      <a href="javascript:;">
                        <div className="msg-header">
                          <p className="msg-header-title">Notifications</p>
                          <p className="msg-header-badge">{clients.length} New</p>
                        </div>
                      </a>
                      <div className="header-notifications-list" style={{ overflowY: "scroll " }}>

                        {clients && clients.map((notification, index) => (
                          <a key={index} className="dropdown-item" href="javascript:;">
                            <div className="d-flex align-items-center">

                              <div className="notify bg-light-danger text-danger">
                                {notification.clientDetails.FullName.split(' ').map(word => word.charAt(0)).join('')}
                              </div>

                              <div className="flex-grow-1">
                                <h6 className="msg-name">
                                  {notification.clientDetails.FullName}
                                  <span className="msg-time float-end">
                                    {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                                  </span>
                                </h6>
                                <Link to="/admin/help">
                                  <p
                                    className="msg-info"
                                    style={{
                                      display: "block",
                                      maxWidth: "200px",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      margin: 0
                                    }}
                                  >

                                    {notification.message}

                                  </p>
                                </Link>
                              </div>
                            </div>
                          </a>

                        ))}
                      </div>
                      <a>
                        <div className="text-center msg-footer">
                          <Link to="/admin/help">
                            <button className="btn btn-primary w-100">View All Notifications</button>
                          </Link>
                        </div>
                      </a>
                    </div>

                  </li>

                </ul>
              </div>
              <div className="user-box dropdown px-3">
                <a
                  className="d-flex align-items-center nav-link dropdown-toggle gap-3 dropdown-toggle-nocaret"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="/assets/images/user.png"
                    className="user-img"
                    alt="user avatar"
                  />
                  <div className="user-info">
                    <p className="user-name mb-0">{FullName && FullName}</p>
                    <p className="designattion mb-0">Admin</p>
                  </div>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center"
                      to="/admin/profile"
                    >
                      <i className="bx bx-user fs-5" />
                      <span>Profile</span>
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      className="dropdown-item d-flex align-items-center"
                      to="/admin/changepass"
                    >
                      <i className="bx bx-cog fs-5" />
                      <span>Settings</span>
                    </Link>
                  </li> */}

                  <li>
                    <div className="dropdown-divider mb-0" />
                  </li>
                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center"
                      to="/login"
                      onClick={(e) => localStorage.clear()}
                    >
                      <i className="bx bx-log-out-circle" />
                      <span>Logout</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
        {/*end header */}
      </>

    </div>
  )
}

export default Header
