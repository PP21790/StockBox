import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getplanlist, getcategoryplan, Deleteplan } from '../../../Services/Admin';
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
                    setSelectedCategoryId(response.data[0]._id);
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
                text: 'Do you want to delete this staff member? This action cannot be undone.',
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
                        text: 'The staff has been successfully deleted.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    getAdminclient();

                }
            } else {

                Swal.fire({
                    title: 'Cancelled',
                    text: 'The staff deletion was cancelled.',
                    icon: 'info',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'There was an error deleting the staff.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });

        }
    };

    const filteredClients = clients.filter(client => client.category === selectedCategoryId);

    return (
        <div className="page-content">
            {/* Breadcrumb */}
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

            <div className="card">
                <div className="card-body">
                    <ul className="nav nav-tabs nav-primary" role="tablist">
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
                                        <div className="tab-icon">
                                            <i className={`bx ${cat.icon} font-18 me-1`} />
                                        </div>
                                        <div className="tab-title">{cat.title}</div>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="tab-content py-3">
                        <div className="tab-pane fade active show">
                            <div className="pricing-section mt-5">
                                <div className="card-container">
                                    <div className='row'>
                                        {filteredClients.map((client) => (
                                            <div className="col-md-6 mb-3" key={client._id}>
                                                <div className="pricing-card">
                                                    <div className='row justify-content-end mb-3'>
                                                        <div className='col-md-6 d-flex justify-content-start'>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input toggleswitch"
                                                                    type="checkbox"
                                                                    role="switch"
                                                                    id="flexSwitchCheckDefault1"
                                                                    defaultChecked=""
                                                                />

                                                            </div>

                                                        </div>
                                                        <div className='col-md-6 d-flex justify-content-end'>
                                                            <div>
                                                                <i className="bx bx-trash trashbtn ms-3" onClick={() => Deleteplanbyadmin(client._id)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='row justify-content-between align-items-center'>
                                                        <div className='col-md-6'>
                                                            <h3 className='fonth3'>{client.title}</h3>
                                                            <h2 className='fonth2'>{client.planType}</h2>
                                                        </div>
                                                        <div className="price-section col-md-6">
                                                            <span className="discount">{client.discount}</span>
                                                            <span className="original-price">INR {client.originalPrice}</span>
                                                            <h3 className='ms-4 fnt'>INR {client.price}</h3>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <ul>
                                                        <li><b>Validity</b>: {client.validity}</li>
                                                        <li><b>Description</b>: {client.description}</li>
                                                        <li><b>Created At</b>: {fDateTime(client.created_at)}</li>
                                                        <li><b>Updated At</b>: {fDateTime(client.updated_at)}</li>
                                                    </ul>
                                                    <div className="button-group">
                                                        <button
                                                            type="button"
                                                            className="btnsecond"
                                                            data-bs-toggle="modal"
                                                            data-bs-target={`#modal-${client.id}`}
                                                        >
                                                            Know More
                                                        </button>
                                                        <div
                                                            className="modal fade"
                                                            id={`modal-${client.id}`}
                                                            tabIndex={-1}
                                                            aria-labelledby={`modalLabel-${client.id}`}
                                                            aria-hidden="true"
                                                        >
                                                            <div className="modal-dialog">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h5 className="modal-title" id={`modalLabel-${client.id}`}>
                                                                            About {client.title}
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
                                                                            <li><b>Title</b>: {client.title}</li>
                                                                            <li><b>Price</b>: {client.price}</li>
                                                                            <li><b>Validity</b>: {client.validity}</li>
                                                                            <li><b>Description</b>: {client.description}</li>
                                                                            <li><b>Created At</b>: {fDateTime(client.created_at)}</li>
                                                                            <li><b>Updated At</b>: {fDateTime(client.updated_at)}</li>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-secondary"
                                                                            data-bs-dismiss="modal"
                                                                        >
                                                                            Close
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="btn-primary btnprime">
                                                            <Link to={`editplan/${client._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                                Edit
                                                            </Link>
                                                        </div>


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
