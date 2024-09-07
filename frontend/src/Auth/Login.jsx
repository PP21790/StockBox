import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login_Api } from "../Services/Apis"
import { Link } from 'react-router-dom';
import swal from 'sweetalert';


const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const loginpageOpen = async (e) => {
        e.preventDefault();

        let req = {
            UserName: username,
            password: password,
        };

        try {
            var login_data = await login_Api(req);

            if (login_data.data.status) {
                // Success - Show SweetAlert and navigate to the dashboard
                swal({
                    title: "Login Successful!",
                    text: "You will be redirected to the dashboard.",
                    icon: "success",
                    button: "OK",
                }).then(() => {
                    localStorage.setItem("token", login_data.data.data.token);
                    localStorage.setItem("id", login_data.data.data.id);
                    localStorage.setItem("Role", login_data.data.data.Role);
                    localStorage.setItem("FullName", login_data.data.data.FullName);
                    navigate("/admin/dashboard");
                });
            } else {
                // Error - Show SweetAlert with the error message
                swal({
                    title: "Login Failed",
                    text: login_data.data.message || "Invalid username or password.",
                    icon: "error",
                    button: "Try Again",
                });
            }
        } catch (error) {
            console.error('There was an error logging in!', error);

            // General error handling with SweetAlert
            swal({
                title: "Error!",
                text: "Something went wrong during login. Please try again later.",
                icon: "error",
                button: "OK",
            });
        }
    };


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
                                            <h5 className="">StockBox</h5>
                                        </div>
                                        <div className="form-body">
                                            <form className="row g-3" onSubmit={loginpageOpen}>
                                                <div className="col-12">
                                                    <label htmlFor="inputEmailAddress" className="form-label">
                                                        Username
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="inputEmailAddress"
                                                        placeholder="Enter Your Username"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
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
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            placeholder="Enter Password"
                                                        />
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
                                                    <p onClick={() => navigate("/forgetpass")}>
                                                        Forgot Password?
                                                    </p>
                                                </div>

                                                <div className="col-12">
                                                    <div className="d-grid">
                                                        <button type="submit" className="btn btn-primary">
                                                            Sign in
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="text-center ">
                                                        <p className="mb-0">
                                                            Don't have an account yet?{" "}
                                                            <Link to="./register">Sign up here</Link>
                                                        </p>
                                                    </div>
                                                </div>
                                            </form>
                                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                                        </div>
                                        <div className="login-separater text-center mb-5">
                                            <span>OR SIGN IN WITH</span>
                                            <hr />
                                        </div>
                                        {/* <div className="list-inline contacts-social text-center">
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
                                        </div> */}
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
