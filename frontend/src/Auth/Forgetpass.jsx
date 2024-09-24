import React, { useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';

const Forgetpass = () => {
    const [email, setEmail] = useState('');

    const handleForgotPassword = async () => {
        if (!email) {
            swal({
                title: "Error!",
                text: "Please enter your email address.",
                icon: "error",
                button: "OK",
            });
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/user/forgot-password', { Email:email });
            
            if (response.data.status) {
                swal({
                    title: "Success!",
                    text: "Password reset link has been sent to your email.",
                    icon: "success",
                    button: "OK",
                });
            } else {
                swal({
                    title: "Failed!",
                    text: response.data.message || "Unable to send reset link. Please try again.",
                    icon: "error",
                    button: "OK",
                });
            }
        } catch (error) {
            swal({
                title: "Error!",
                text: "There was an error processing your request. Please try again later.",
                icon: "error",
                button: "OK",
            });
           
        }
    };

    return (
        <div>
            <div className="section-authentication-cover">
                <div className="">
                    <div className="row g-0">
                        <div className="col-12 col-xl-7 col-xxl-8 auth-cover-left bg-gradient-branding align-items-center justify-content-center d-none d-xl-flex">
                            <div className="card shadow-none bg-transparent shadow-none rounded-0 mb-0">
                                <div className="card-body">
                                    <img
                                        src="assets/images/login-images/forgot-password-cover.svg"
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
                                    <div className="p-3">
                                        <div className="text-center">
                                            <img
                                                src="assets/images/icons/forgot-2.png"
                                                width={100}
                                                alt=""
                                            />
                                        </div>
                                        <h4 className="mt-5 font-weight-bold">Forgot Password?</h4>
                                        <p className="text-muted">
                                            Enter your registered email ID to reset the password
                                        </p>
                                        <div className="my-4">
                                            <label className="form-label">Email id</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="example@user.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button type="button" className="btn btn-primary" onClick={handleForgotPassword}>
                                                Send
                                            </button>
                                            <a href="/login">
                                                <i className="bx bx-arrow-back me-1" />
                                                Back to Login
                                            </a>
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

export default Forgetpass;
