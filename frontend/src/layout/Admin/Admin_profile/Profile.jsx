import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getstaffperuser } from '../../../Services/Admin';

const Profile = () => {
   
    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('id');

    const [data,setData] = useState([])
  
    const getpermissioninfo = async () => {
        try {
          const response = await getstaffperuser(userid, token);
          if (response.status) {
            setData(response.data.permissions);
          }
        } catch (error) {
          console.log("error", error);
        }
      };


      useEffect(()=>{
        getpermissioninfo()
      },[])

    return (
        <div>
            <div className="page-content">
                {/*breadcrumb*/}
                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Admin Profile</div>
                    <div className="ps-3">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0 p-0">
                                <li className="breadcrumb-item">
                                    <a href="javascript:;">
                                        <i className="bx bx-home-alt" />
                                    </a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Admin Profile
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="ms-auto">
                        <div className="btn-group">


                            <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">
                                {" "}
                                <a className="dropdown-item" href="javascript:;">
                                    Action
                                </a>
                                <a className="dropdown-item" href="javascript:;">
                                    Another action
                                </a>
                                <a className="dropdown-item" href="javascript:;">
                                    Something else here
                                </a>
                                <div className="dropdown-divider" />{" "}
                                <a className="dropdown-item" href="javascript:;">
                                    Separated link
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/*end breadcrumb*/}
                <div className="container">
                    <div className="main-body">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <img
                                                src="/assets/images/avatars/avatar-2.png"
                                                alt="Admin"
                                                className="rounded-circle p-1 bg-primary"
                                                width={110}
                                            />
                                            <div className="mt-3">
                                                <h4>Admin</h4>
          
                                            </div>
                                        </div>
                                        <hr className="my-4" />
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 className="mb-0">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={24}
                                                        height={24}
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="feather feather-globe me-2 icon-inline"
                                                    >
                                                        <circle cx={12} cy={12} r={10} />
                                                        <line x1={2} y1={12} x2={22} y2={12} />
                                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                                    </svg>
                                                    Website
                                                </h6>
                                                <span className="text-secondary">https://codervent.com</span>
                                            </li>

                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 className="mb-0">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={24}
                                                        height={24}
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="feather feather-twitter me-2 icon-inline text-info"
                                                    >
                                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                                                    </svg>
                                                    Twitter
                                                </h6>
                                                <span className="text-secondary">@codervent</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 className="mb-0">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={24}
                                                        height={24}
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="feather feather-instagram me-2 icon-inline text-danger"
                                                    >
                                                        <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
                                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                                    </svg>
                                                    Instagram
                                                </h6>
                                                <span className="text-secondary">codervent</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 className="mb-0">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={24}
                                                        height={24}
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="feather feather-facebook me-2 icon-inline text-primary"
                                                    >
                                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                                    </svg>
                                                    Facebook
                                                </h6>
                                                <span className="text-secondary">codervent</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="card">
                                    <div className="card-body mt-5">
                                        
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Full Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <p>John Doe</p>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <p>john@example.com</p>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Phone</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <p>9876543210   </p>
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Address</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <p>
                                                    Bay Area, San Francisco, CA
                                                </p>
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <Link to="/admin/changepass" className="btn btn-primary mb-0" style={{fontSize:"14px"}}>Change Password</Link>
                                            </div>
                                            <div className="col-sm-9 text-secondary">

                                            </div>
                                        </div>

                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default Profile;


