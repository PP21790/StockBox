import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getplanlist, getcategoryplan, Deleteplan, changeplanstatus } from '../../../Services/Admin';
import { fDateTime } from '../../../Utils/Date_formate';
import Swal from 'sweetalert2';

const Plan = () => {
    const [clients, setClients] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        getAdminclient();
        getcategoryplanlist();
    }, []);

    const getcategoryplanlist = async () => {
        try {
            const response = await getcategoryplan(token);
            if (response.status) {
                setCategory(response.data);
                if (response.data.length > 0) {
                    setSelectedCategoryId('all');
                }
            }
        } catch (error) {
            console.log("error");
        }
    };



    const getAdminclient = async () => {
        try {
            const response = await getplanlist(token);
            if (response.status) {
                setClients(response.data);
            }
        } catch (error) {
            console.log("Failed to fetch plans", error);
        }
    };



    const Deleteplanbyadmin = async (_id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to delete this plan? This action cannot be undone.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel',
            });

            if (result.isConfirmed) {
                const response = await Deleteplan(_id, token);
                if (response.status) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'The plan has been successfully deleted.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    getAdminclient();
                }
            } else {
                Swal.fire({
                    title: 'Cancelled',
                    text: 'The plan deletion was cancelled.',
                    icon: 'info',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'There was an error deleting the plan.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };



    const handleSwitchChange = async (event, id) => {
        const originalChecked = event.target.checked;
        const user_active_status = originalChecked ? "active" : "inactive";
        const data = { id: id, status: user_active_status };

        const result = await Swal.fire({
            title: "Do you want to save the changes?",
            showCancelButton: true,
            confirmButtonText: "Save",
            cancelButtonText: "Cancel",
            allowOutsideClick: false,
        });

        if (result.isConfirmed) {
            try {
                const response = await changeplanstatus(data, token);
                if (response.status) {
                    Swal.fire({
                        title: "Saved!",
                        icon: "success",
                        timer: 1000,
                        timerProgressBar: true,
                    });
                    setTimeout(() => {
                        Swal.close();
                    }, 1000);
                }
                // Reload the plan list
                getcategoryplanlist();
            } catch (error) {
                Swal.fire(
                    "Error",
                    "There was an error processing your request.",
                    "error"
                );
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            event.target.checked = !originalChecked;
            getcategoryplanlist();
        }
    };




    const filteredClients = selectedCategoryId === 'all'
        ? clients
        : clients.filter(client => client.category === selectedCategoryId);

    return (
        <div className="page-content">
            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div className="breadcrumb-title pe-3">Plan</div>
                <div className="ms-auto">
                    <div className="btn-group">
                        <Link to="/admin/addplan" className="btn btn-primary">
                            Add Plan
                        </Link>
                    </div>
                </div>
            </div>
            <hr />

            <div className="card">
                <div className="card-body">
                    <ul className="nav nav-pills mb-1" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a
                                className={`nav-link ${selectedCategoryId === 'all' ? 'active' : ''}`}
                                onClick={() => setSelectedCategoryId('all')}
                                role="tab"
                                aria-selected={selectedCategoryId === 'all'}
                                tabIndex={0}
                            >
                                <div className="d-flex align-items-center">
                                    <div className="tab-title">All</div>
                                </div>
                            </a>
                        </li>
                        {category.map((cat) => (
                            <li className="nav-item" role="presentation" key={cat._id}>
                                <a
                                    className={`nav-link ${cat._id === selectedCategoryId ? 'active' : ''}`}
                                    onClick={() => setSelectedCategoryId(cat._id)}
                                    role="tab"
                                    aria-selected={cat._id === selectedCategoryId}
                                    tabIndex={0}
                                >
                                    <div className="d-flex align-items-center">
                                        <div className="tab-title">{cat.title}</div>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <hr />

                    <div className="tab-content">
                        <div className="tab-pane fade active show">
                            <div className="pricing-section mt-5">
                                <div className="card-container">
                                    <div className="row">
                                        {filteredClients.map((client) => (
                                            <div className="col-md-6 mb-3" key={client._id}>
                                                <div className="pricing-card">
                                                    <div className="category-name text-center mb-3">
                                                        <span className="badge bg-primary">
                                                            {category.find(cat => cat._id === client.category)?.title || 'Unknown'}
                                                        </span>
                                                    </div>

                                                    <div className="row justify-content-end mb-3">
                                                        <div className="col-md-6 d-flex justify-content-start">
                                                            <div className="form-check form-switch form-check-info">
                                                                <input
                                                                    id={`rating_${client.status}`}
                                                                    className="form-check-input toggleswitch"
                                                                    type="checkbox"
                                                                    defaultChecked={client.status === "active"}
                                                                    onChange={(event) => handleSwitchChange(event, client._id)}
                                                                />
                                                                <label
                                                                    htmlFor={`rating_${client.ActiveStatus}`}
                                                                    className="checktoggle checkbox-bg"
                                                                ></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 d-flex justify-content-end">
                                                            <div>
                                                                <i className="bx bx-trash trashbtn ms-3" onClick={() => Deleteplanbyadmin(client._id)} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row justify-content-between align-items-center">
                                                        <div className="col-md-6">
                                                            <h3 className="fonth3">{client.title}</h3>
                                                            <h2 className="fonth2">{client.planType}</h2>
                                                        </div>
                                                        <div className="price-section col-md-6">
                                                            <span className="discount">{client.discount}</span>
                                                            {/* <span className="original-price">INR {client.originalPrice}</span> */}
                                                            <h3 className="ms-4 fnt">INR {client.price}</h3>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <ul>
                                                        <li><b>Validity</b>: {client.validity}</li>
                                                        <li><b className='mb-1'>Description</b>:<textarea className='form-control' >{client.description}</textarea></li>

                                                        <li><b>Created At</b>: {fDateTime(client.created_at)}</li>
                                                        {/* <li><b>Updated At</b>: {fDateTime(client.updated_at)}</li> */}
                                                    </ul>
                                                    <div className="button-group">
                                                        <button
                                                            type="button"
                                                            className="btnsecond"
                                                            data-bs-toggle="modal"
                                                            data-bs-target={`#modal-${client._id}`}

                                                        >
                                                            View More
                                                        </button>
                                                        <div
                                                            className="modal fade"
                                                            id={`modal-${client._id}`}
                                                            tabIndex={-1}
                                                            aria-labelledby={`modalLabel-${client._id}`}
                                                            aria-hidden="true"
                                                        >
                                                            <div className="modal-dialog">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h5 className="modal-title" id={`modalLabel-${client._id}`}>
                                                                            {client.title}
                                                                        </h5>
                                                                        <button
                                                                            type="button"
                                                                            className="btn-close"
                                                                            data-bs-dismiss="modal"
                                                                            aria-label="Close"
                                                                        />
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <ul>
                                                                            <li>
                                                                                <div className="row justify-content-between">
                                                                                    <div className="col-md-6">
                                                                                        <b>Title</b>
                                                                                    </div>
                                                                                    <div className="col-md-6">
                                                                                        {client.title}
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="row justify-content-between">
                                                                                    <div className="col-md-6">
                                                                                        <b>Price</b>
                                                                                    </div>
                                                                                    <div className="col-md-6">
                                                                                        {client.price}
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="row justify-content-between">
                                                                                    <div className="col-md-6">
                                                                                        <b>Validity</b>
                                                                                    </div>
                                                                                    <div className="col-md-6">
                                                                                        {client.validity}
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="row justify-content-between">
                                                                                    <div className="col-md-6">
                                                                                        <b>Description</b>
                                                                                    </div>
                                                                                    <div className="col-md-6">
                                                                                        {client.description}
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="row justify-content-between">
                                                                                    <div className="col-md-6">
                                                                                        <b>Created At</b>
                                                                                    </div>
                                                                                    <div className="col-md-6">
                                                                                        {fDateTime(client.created_at)}
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="row justify-content-between">
                                                                                    <div className="col-md-6">
                                                                                        <b>Updated At</b>
                                                                                    </div>
                                                                                    <div className="col-md-6">
                                                                                        {fDateTime(client.updated_at)}
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Link to={`editplan/${client._id}`} className="btn-primary btnprime" style={{ color: 'inherit', textDecoration: 'none' }}>
                                                            <div >

                                                                Edit

                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Plan;
