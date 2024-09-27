
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const Changepass = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = (e) => {
        e.preventDefault();
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div>
            <div className="page-content">
                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Change Password</div>
                    <div className="ps-3">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0 p-0">
                                <li className="breadcrumb-item">
                                    <Link to="/admin/dashboard">
                                        <i className="bx bx-home-alt" />
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Profile
                                </li>
                            </ol>
                        </nav>
                    </div>

                </div>

                <div className="row">
                    <div className="col-xl-6 mx-auto">
                        <div className="card">
                            <div className="card-body p-4">

                                <form className="row g-3">

                                    <div className="col-md-12">
                                        <label htmlFor="inputChoosePassword" className="form-label">
                                            current Password
                                        </label>
                                        <div className="input-group" id="show_hide_password">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                className="form-control border-end-0"
                                                id="inputChoosePassword"

                                                placeholder="Enter Password"
                                            />
                                            <a
                                                href="javascript:;"
                                                onClick={togglePasswordVisibility}
                                                className="input-group-text bg-transparent"

                                            >
                                                <i className={`bx ${showPassword ? 'bx-show' : 'bx-hide'}`} />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="inputChoosePassword" className="form-label">
                                            New Password
                                        </label>
                                        <div className="input-group" id="show_hide_password">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                className="form-control border-end-0"
                                                id="inputChoosePassword"

                                                placeholder="Enter Password"
                                            />
                                            <a
                                                href="javascript:;"
                                                onClick={togglePasswordVisibility}
                                                className="input-group-text bg-transparent"

                                            >
                                                <i className={`bx ${showPassword ? 'bx-show' : 'bx-hide'}`} />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="d-md-flex d-grid align-items-center gap-3">
                                            <button type="button" className="btn btn-primary px-4">
                                                Update
                                            </button>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}

export default Changepass;
