import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login_Api } from "../Services/Apis"
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { basicsettinglist } from '../Services/Admin';
import { image_baseurl } from '../Utils/config';
import $ from "jquery";

const Login = () => {


    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [clients, setClients] = useState([]);
    
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('id');
   
   

    const getsettinglist = async () => {
        try {
            const response = await basicsettinglist(token);
            if (response.status) {
                const faviconElement = document.querySelector("link[rel='icon']");
                if (faviconElement) {
                   
                    
                    faviconElement.href = image_baseurl + "uploads/basicsetting/" + response.data[0].favicon;

                    $('.companyName').html(response.data[0].from_name)
                } else {
                    console.log("Favicon element not found");
                }
    
                setClients(response.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    };
    
    
    useEffect(() => {
        getsettinglist();
    }, []);


    const loginpageOpen = async (e) => {
        e.preventDefault();

        let req = {
            UserName: username,
            password: password,
        };

        try {
            var login_data = await login_Api(req);
           
            if (login_data.data.status) {
                Swal.fire({
                    title: login_data.data.message || "Login Successful!",
                    text: "You will be redirected to the dashboard.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000,
                }).then(() => {
                    localStorage.setItem("token", login_data.data.data.token);
                    localStorage.setItem("id", login_data.data.data.id);
                    localStorage.setItem("Role", login_data.data.data.Role);
                    localStorage.setItem("FullName", login_data.data.data.FullName);
                    navigate("/admin/dashboard");
                });
            } else {
                Swal.fire({
                    title: "Login Failed",
                    text: login_data.data.message || "Invalid username or password.",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.message || "Something went wrong during login. Please try again later.",
                icon: "error",
                showConfirmButton: false,
                timer: 2000,
            });
        }
    };

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
        <div className='bg-login'>
            <div className="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
                <div className="container-fluid ">
                    <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
                        <div className="col mx-auto">
                            <div className="card mb-0">
                                <div className="card-body">
                                    <div className="p-4">
                                        <div className="mb-5 text-center">
                                            <img style={{width:"241px"}} src={`${image_baseurl}uploads/basicsetting/${clients[0]?.logo}`} />
                                        </div>
                                        {/* <div className="text-center mb-4">
                                            <h5 className="">Stock RA</h5>
                                        </div> */}
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
                                                            type={showPassword ? 'text' : 'password'}
                                                            className="form-control border-end-0"
                                                            id="inputChoosePassword"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
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
                                                    {/* <p onClick={() => navigate("/forgetpass")}>
                                                        Forgot Password?
                                                    </p> */}
                                                    <p className="mb-0">

                                                        <Link to="/forget">Forgot Password?</Link>
                                                    </p>
                                                </div>

                                                <div className="col-12">
                                                    <div className="d-grid">
                                                        <button type="submit" className="btn btn-primary">
                                                            Sign in
                                                        </button>
                                                    </div>
                                                </div>
                                                {/* <div className="col-12">
                                                    <div className="text-center ">
                                                        <p className="mb-0">
                                                            Don't have an account yet?{" "}
                                                            <Link to="/register">Sign up here</Link>
                                                        </p>
                                                    </div>
                                                </div> */}
                                            </form>
                                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                                        </div>
                                        <div className="login-separater text-center mb-5">
                                            {/* <span>OR SIGN IN WITH</span> */}
                                            {/* <hr /> */}
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

export default Login;
