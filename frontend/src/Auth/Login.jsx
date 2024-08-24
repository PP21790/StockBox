import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const loginpageOpen = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        try {
            const response = await axios.post('http://localhost:5001/user/loginbody', {
                UserName: username,
                password: password,
            });

            // Assuming the API response contains a token
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                navigate("/admin/dashboard");
            } else {
                setError('Invalid login credentials');
            }
        } catch (error) {
            setError('An error occurred while logging in');
        }
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
                                                    <a href="auth-basic-forgot-password.html">
                                                        Forgot Password ?
                                                    </a>
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
                                                            <a href="auth-basic-signup.html">Sign up here</a>
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
