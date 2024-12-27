import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReadNotificationStatus, getDashboardNotification, gettradestatus, basicsettinglist, UpdateLogin_status } from '../../Services/Admin';
import { formatDistanceToNow } from 'date-fns';
import Swal from 'sweetalert2';
import $ from "jquery";
import { image_baseurl } from '../../Utils/config';




const Header = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const FullName = localStorage.getItem('FullName');



  const [clients, setClients] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);



  const [model, setModel] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [getstatus, setGetstatus] = useState([]);


  const [statusinfo, setStatusinfo] = useState({
    aliceuserid: "",
    apikey: "",
    secretkey: ""
  });



  useEffect(() => {
    getdemoclient();
    gettradedetail();
  }, []);



  useEffect(() => {
    if (getstatus[0]?.brokerloginstatus === 1) {
      setIsChecked(true);
    }
  }, [getstatus]);



  const gettradedetail = async () => {
    try {
      const response = await basicsettinglist(token);
      if (response?.status) {
        const data = response.data?.[0];
        if (data) {
          setGetstatus(response.data);

          const faviconElement = document.querySelector("link[rel='icon']");
          if (faviconElement) {
            faviconElement.href = `${image_baseurl}uploads/basicsetting/${data.favicon}`;
          } else {
            console.warn("Favicon element not found");
          }


          const companyNameElement = document.querySelector(".companyName");
          if (companyNameElement) {
            companyNameElement.textContent = data.from_name;
          }
          if (data.staffstatus === 0) {
            localStorage.clear();
          }
        }
      } else {
        console.error("Invalid response status:", response);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };


  const handleNotificationClick = async (event, notification) => {

    const user_active_status = "1";
    const data = { id: notification._id, status: user_active_status };

    try {
      const response = await ReadNotificationStatus(data, token);
      if (response.status) {
        if (notification.type === "payout") {
          navigate("/admin/paymentrequest")
          getdemoclient()
        } else if (notification.type === "add client") {
          navigate("/admin/client")
          getdemoclient()
        } else if (notification.type === "plan purchase") {
          navigate("/admin/paymenthistory")
          getdemoclient()
        } else if (notification.type === "plan expire") {
          navigate("/admin/planexpiry")
          getdemoclient()
        } else {
          navigate("/admin/client")
          getdemoclient()

        }
      } else {
        Swal.fire(
          "Error",
          "Failed to update the notification status.",
          "error"
        );
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "There was an error processing your request.",
        "error"
      );
    }
  };




  const getdemoclient = async () => {
    try {
      const response = await getDashboardNotification(token);
      if (response.status) {
        setClients(response.data);
      } else {

      }
    } catch (error) {
      console.log("error", error);
    }
  };




  const getstatusdetaile = async () => {
    if (!statusinfo.aliceuserid || !statusinfo.apikey || !statusinfo.secretkey) {
      Swal.fire({
        title: 'Warning!',
        text: "Please fill in all fields",
        icon: 'warning',
        confirmButtonText: 'OK',
        timer: 2000,
      });
      return;
    }
    const data = {
      aliceuserid: statusinfo.aliceuserid || getstatus[0].aliceuserid,
      apikey: statusinfo.apikey || getstatus[0].apikey,
      secretkey: statusinfo.secretkey || getstatus[0].secretkey
    };
    try {
      const response = await gettradestatus(data, token);
      if (response.status === true && response.url) {
        window.location.href = response.url;
      }
    } catch (error) {
      console.log("error", error);
    }
  };



  const UpdateloginOff = async (e) => {
    const dataoff = e.target.checked ? 1 : 0;
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to log off?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log off',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const data = {
            brokerloginstatus: dataoff,
          };
          const response = await UpdateLogin_status(data, token);
          if (response?.status) {
            Swal.fire({
              icon: 'success',
              title: 'Successful!',
              text: 'Status Log Out Successful',
              timer: 1500,
              timerProgressBar: true,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'There was an error logging out',
            timer: 1500,
            timerProgressBar: true,
          });
        }
      }
    });
  };





  const handleToggle = () => {
    if (getstatus[0]?.brokerloginstatus === 1) {
      setIsChecked(!isChecked);

    } else {
      setModel(true);
      setStatusinfo({
        aliceuserid: getstatus[0]?.aliceuserid || "",
        apikey: getstatus[0]?.apikey || "",
        secretkey: getstatus[0]?.secretkey || ""
      });
    }
  };




  return (
    <div>
      <header>
        <div className="topbar d-flex align-items-center">
          <nav className="navbar navbar-expand gap-3">
            <div className="mobile-toggle-menu">
              <i className="bx bx-menu" />
            </div>
            <div className="top-menu ms-auto">
              <ul className="navbar-nav align-items-center gap-1">
                <li className="nav-item mobile-search-icon d-flex d-lg-none" data-bs-toggle="modal" data-bs-target="#SearchModal">
                  <a className="nav-link" href="#">
                    <i className="bx bx-search" />
                  </a>
                </li>
                <li>
                  <div className='d-flex'>
                    <span className="switch-label p-1">
                      Trading Status:
                      <span style={{ color: isChecked ? 'green' : 'red' }}>
                        {isChecked ? "On" : "Off"}
                      </span>
                    </span>

                    <div className="form-check form-switch form-check-dark" style={{ margin: "inherit", fontSize: "21px" }}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDark"
                        disabled={isDisabled}
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleToggle();
                          } else {
                            setIsDisabled(true);
                            // UpdateloginOff(e);
                          }
                        }}
                      />
                    </div>
                  </div>
                </li>
                <li className="nav-item dropdown dropdown-large">
                  <a
                    className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative"
                    href="#"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {clients.filter(notification => notification.status === 0).length ? (
                      <span className="alert-count">
                        {clients.filter(notification => notification.status === 0).length}
                      </span>
                    ) : ""}
                    <i className="bx bx-bell" />
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <div className="msg-header">
                      <p className="msg-header-title">Notifications</p>
                      <p className="msg-header-badge">{clients.filter(notification => notification.status === 0).length} New</p>
                    </div>
                    <div className="header-notifications-list" style={{ overflowY: "scroll", maxHeight: "300px" }}>
                      {clients.length > 0 ? (
                        clients.map((notification, index) => (
                          <a
                            key={index}
                            className={`dropdown-item notification ${notification.status === 1
                              ? " text-info font-bold"
                              : " text-muted bg-dark"
                              } `}
                            onClick={(event) => handleNotificationClick(event, notification)}
                          >
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1">
                                <h6 className={` msg-name  ${notification.status === 1
                                  ? "  font-bold"
                                  : " text-muted"

                                  } `}>

                                  {notification?.title}
                                  <span className="msg-time float-end">
                                    {notification.createdAt
                                      ? formatDistanceToNow(new Date(notification.createdAt), {
                                        addSuffix: true,
                                      })
                                      : "Empty Message"}
                                  </span>
                                </h6>
                                <p
                                  className="msg-info text-truncate"
                                  title={notification.message}
                                  style={{
                                    fontWeight: notification.status === 0 ? "bold" : "normal",
                                  }}
                                >
                                  {notification.message}
                                </p>
                              </div>
                            </div>
                          </a>

                        ))
                      ) : (
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            color: "#6c757d",
                          }}
                        >
                          <h4>No Notifications</h4>
                        </span>
                      )}
                    </div>

                    <div className="text-center msg-footer">
                      <Link to="/admin/notificationlist">
                        <button className="btn btn-primary w-100">View All Notifications</button>
                      </Link>
                    </div>
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
                <img src="/assets/images/user.png" className="user-img" alt="user avatar" />
                <div className="user-info">
                  <p className="user-name mb-0">{FullName}</p>
                  <p className="designattion mb-0">Admin</p>
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item d-flex align-items-center" to="/admin/profile">
                    <i className="bx bx-user fs-5" />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <div className="dropdown-divider mb-0" />
                </li>
                <li>
                  <Link className="dropdown-item d-flex align-items-center" to="/login" onClick={() => localStorage.clear()}>
                    <i className="bx bx-log-out-circle" />
                    <span>Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      {model && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div
            className="modal fade show"
            style={{ display: 'block' }}
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Trading Status
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setModel(false)}
                  />
                </div>
                <div className="modal-body">
                  <form>
                    <label> User ID </label>
                    <input
                      type="text"
                      className="form-control"
                      value={statusinfo.aliceuserid}
                      onChange={(e) => setStatusinfo({ ...statusinfo, aliceuserid: e.target.value })}
                    />
                    <label> API Key </label>
                    <input
                      type="text"
                      className="form-control"
                      value={statusinfo.apikey}
                      onChange={(e) => setStatusinfo({ ...statusinfo, apikey: e.target.value })}
                    />
                    <label> Secret Key </label>
                    <input
                      type="text"
                      className="form-control"
                      value={statusinfo.secretkey}
                      onChange={(e) => setStatusinfo({ ...statusinfo, secretkey: e.target.value })}
                    />
                  </form>


                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setModel(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={getstatusdetaile}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
