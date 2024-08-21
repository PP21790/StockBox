import React from 'react';

const Resetpass = () => {
    return (
        <div>
            <div className="section-authentication-cover">
                <div className="">
                    <div className="row g-0">
                        <div className="col-12 col-xl-7 col-xxl-8 auth-cover-left bg-gradient-moonlit align-items-center justify-content-center d-none d-xl-flex">
                            <div className="card shadow-none bg-transparent shadow-none rounded-0 mb-0">
                                <div className="card-body">
                                    <img
                                        src="assets/images/login-images/reset-password-cover.svg"
                                        className="img-fluid"
                                        width={600}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-xl-5 col-xxl-4 auth-cover-right align-items-center justify-content-center">
                            <div className="card rounded-0 m-3 shadow-none bg-transparent mb-0">
                                <div className="card-body p-sm-5">
                                    <div className="">
                                        <div className="mb-4 text-center">
                                            <img src="assets/images/logo-icon.png" width={60} alt="" />
                                        </div>
                                        <div className="text-start mb-4">
                                            <h5 className="">Genrate New Password</h5>
                                            <p className="mb-0">
                                                We received your reset password request. Please enter your new
                                                password!
                                            </p>
                                        </div>
                                        <div className="mb-3 mt-4">
                                            <label className="form-label">New Password</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter new password"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="form-label">Confirm Password</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Confirm password"
                                            />
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button type="button" className="btn btn-primary">
                                                Change Password
                                            </button>{" "}
                                            <a href="auth-cover-signin.html" className="btn btn-light">
                                                <i className="bx bx-arrow-back mr-1" />
                                                Back to Login
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*end row*/}
                </div>
            </div>


        </div>
    );
}

export default Resetpass;
