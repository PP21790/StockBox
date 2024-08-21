import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate()

    const loginpageOpen = (e) => {
        localStorage.setItem("token", "1e1e616fytfxff")
        navigate("/admin/dashboard");

    }

    return (
        <div className='bg-login'>
            <div className="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
                <div className="container-fluid ">
                    <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
                        <div className="col mx-auto">
                            <div className="card mb-0">
                                <div className="card-body">
                                    <div className="p-4">
                                        <div className="mb-3 text-center">
                                            <img src="/assets/images/logo-icon.png" width={60} alt="" />
                                        </div>
                                        <div className="text-center mb-4">
                                            <h5 className="">Rukada Admin</h5>
                                            {/* <p className="mb-0">Please log in to your account</p> */}
                                        </div>
                                        <div className="form-body">
                                            <form className="row g-3">
                                                <div className="col-12">
                                                    <label htmlFor="inputEmailAddress" className="form-label">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="inputEmailAddress"
                                                        placeholder="jhon@example.com"
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="inputChoosePassword" className="form-label">
                                                        Password
                                                    </label>
                                                    <div className="input-group" id="show_hide_password">
                                                        <input
                                                            type="password"
                                                            className="form-control border-end-0"
                                                            id="inputChoosePassword"
                                                            defaultValue={12345678}
                                                            placeholder="Enter Password"
                                                        />{" "}
                                                        <a
                                                            href="javascript:;"
                                                            className="input-group-text bg-transparent"
                                                        >
                                                            <i className="bx bx-hide" />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="flexSwitchCheckChecked"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="flexSwitchCheckChecked"
                                                        >
                                                            Remember Me
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 text-end">
                                                    <a href="auth-basic-forgot-password.html">
                                                        Forgot Password ?
                                                    </a>
                                                </div>
                                                <div className="col-12">
                                                    <div className="d-grid">
                                                        <button type="submit" className="btn btn-primary" onClick={(e) => loginpageOpen(e)}>
                                                            Sign in
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="text-center ">
                                                        <p className="mb-0">
                                                            Don't have an account yet?{" "}
                                                            <a href="auth-basic-signup.html">Sign up here</a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="login-separater text-center mb-5">
                                            {" "}
                                            <span>OR SIGN IN WITH</span>
                                            <hr />
                                        </div>
                                        <div className="list-inline contacts-social text-center">
                                            <a
                                                href="javascript:;"
                                                className="list-inline-item bg-facebook text-white border-0 rounded-3"
                                            >
                                                <i className="bx bxl-facebook" />
                                            </a>
                                            <a
                                                href="javascript:;"
                                                className="list-inline-item bg-twitter text-white border-0 rounded-3"
                                            >
                                                <i className="bx bxl-twitter" />
                                            </a>
                                            <a
                                                href="javascript:;"
                                                className="list-inline-item bg-google text-white border-0 rounded-3"
                                            >
                                                <i className="bx bxl-google" />
                                            </a>
                                            <a
                                                href="javascript:;"
                                                className="list-inline-item bg-linkedin text-white border-0 rounded-3"
                                            >
                                                <i className="bx bxl-linkedin" />
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

export default Login;
<>Hey! Loginers</>