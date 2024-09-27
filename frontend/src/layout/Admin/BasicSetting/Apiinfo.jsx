import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { basicsettinglist, updateApiinfo } from '../../../Services/Admin';
import Swal from 'sweetalert2';


const Apiinfo = () => {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('id');
    const navigate = useNavigate();

    const [clients, setClients] = useState("");


    const [updateapi, setUpdateapi] = useState({
        digio_client_id: "",
        digio_client_secret: ""
    });



    const getApidetail = async () => {
        try {
            const response = await basicsettinglist(token);
            if (response?.status && response?.data) {
                const clientData = response.data;
                setClients(clientData);
                setUpdateapi({
                    digio_client_id: clientData[0].digio_client_id || "",
                    digio_client_secret: clientData[0].digio_client_secret || ""
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
            if (!updateapi.digio_client_id || !updateapi.digio_client_secret) {
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
                digio_client_id: updateapi.digio_client_id,
                digio_client_secret: updateapi.digio_client_secret
            };

            const response = await updateApiinfo(data, token);
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
                        <div className="breadcrumb-title pe-3">Api Information</div>
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

                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 row-cols-xl-3 justify-content-center">
                    <div className="col">
                        <div className="card">
                            <div className="card-header mt-2">
                                <h5>Digio</h5>
                            </div>
                            <div className="card-body mt-2">
                                <form className="row g-3 mt-2 mb-3">
                                    <div className="row">
                                        <div className="col-md-12 mb-2">
                                            <label htmlFor="digioClientId" className="form-label">
                                                Digio Client ID
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="digioClientId"
                                                value={updateapi.digio_client_id}
                                                onChange={(e) => setUpdateapi({ ...updateapi, digio_client_id: e.target.value })}
                                            />
                                        </div>

                                        <div className="col-md-12 mb-2">
                                            <label htmlFor="digioClientSecret" className="form-label">
                                                Digio Client Secret
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="digioClientSecret"
                                                value={updateapi.digio_client_secret}
                                                onChange={(e) => setUpdateapi({ ...updateapi, digio_client_secret: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer text-center">
                                <button type="button" className="btn btn-primary mb-2" onClick={(e) => UpdateApi()}>
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Apiinfo;