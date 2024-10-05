import React, { useState, useEffect } from 'react';
import { basicsettinglist, updatePayementgateway } from '../../../Services/Admin';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';



const Payementgateway = () => {


    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('id');


    const [clients, setClients] = useState(null);
    const [updateapi, setUpdateapi] = useState({
        razorpay_secret: "",
        razorpay_key: ""
    });


    const getApidetail = async () => {
        try {
            const response = await basicsettinglist(token);
            if (response?.status && response?.data) {
                const clientData = response.data;
                setClients(clientData);
                setUpdateapi({
                    razorpay_key: clientData[0].razorpay_key || "",
                    razorpay_secret: clientData[0].razorpay_secret || ""
                });
            }
        } catch (error) {
            console.error('Error fetching API details:', error);
        }
    };



    useEffect(() => {
        getApidetail();
    }, []);




    const UpdateApi = async () => {
        try {
            if (!updateapi.razorpay_key?.trim() || !updateapi.razorpay_secret?.trim()) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Update Failed',
                    text: 'Please fill all the required fields.',
                    timer: 1500,
                    timerProgressBar: true,
                });
                return;
            }
            const data = {
                id: user_id,
                razorpay_key: updateapi.razorpay_secret,
                razorpay_secret: updateapi.razorpay_secret
            };

            const response = await updatePayementgateway(data, token);
            if (response?.status) {
                Swal.fire({
                    icon: 'success',
                    title: 'Update Successful!',
                    text: 'Your API information was updated successfully.',
                    timer: 1500,
                    timerProgressBar: true,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'There was an error updating the API information. Please try again.',
                timer: 1500,
                timerProgressBar: true,
            });
        }
    };



    return (
        <div>
            <div className="page-content">

                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Payment Gateway Detail</div>
                    <div className="ps-3">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0 p-0">
                                <li className="breadcrumb-item">
                                    <Link to="/admin/dashboard">
                                        <i className="bx bx-home-alt" />
                                    </Link>
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <hr />
                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 row-cols-xl-3 justify-content-center">

                    <div className="col" style={{ width: "50%" }}>
                        <div className="card">
                            <div className="card-header mt-2">
                                <h5>Razorpay</h5></div>
                            <div className="card-body mt-2">
                                <form className="row g-3 mt-2 mb-3">
                                    <div className="row">


                                        <div className="col-md-12 mb-2">
                                            <label htmlFor="input3" className="form-label">
                                                Razorpay Key
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="input3"
                                                value={updateapi.razorpay_key}
                                                onChange={(e) => setUpdateapi({ ...updateapi, razorpay_key: e.target.value })}

                                            />
                                        </div>

                                        <div className="col-md-12 mb-2">
                                            <label htmlFor="input3" className="form-label">
                                                Razorpay Secret Key
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="input3"
                                                value={updateapi.razorpay_secret}
                                                onChange={(e) => setUpdateapi({ ...updateapi, razorpay_secret: e.target.value })}

                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer text-center">

                                <button type="button" className="btn btn-primary mb-2"
                                    onClick={(e) => UpdateApi()}
                                >
                                    Update
                                </button></div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Payementgateway