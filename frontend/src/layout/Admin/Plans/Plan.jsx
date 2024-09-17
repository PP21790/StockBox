import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getplanlist } from '../../../Services/Admin';

const colors = ['bg-danger', 'bg-primary', 'bg-success', 'bg-info', 'bg-warning'];

const Plan = () => {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const token = localStorage.getItem('token');
    const getAdminclient = async () => {
        try {
            const response = await getplanlist(token);
            if (response.status) {
                setClients(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch plans", error);
        }
    };

    useEffect(() => {
        getAdminclient();
    }, []);


    return (
        <div className="page-content">
            {/* Breadcrumb */}
            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div className="breadcrumb-title pe-3">Plan</div>
                <div className="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 p-0">
                            <li className="breadcrumb-item">
                                <a href="javascript:;">
                                    <i className="bx bx-home-alt" />
                                </a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                {/* Plan */}
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className="ms-auto">
                    <div className="btn-group">
                        <Link to="/admin/addplan" className="btn btn-primary">
                            Add Plan
                        </Link>
                    </div>
                </div>
            </div>
            {/* End Breadcrumb */}

            {/* Section: Pricing Table */}
            <div className="pricing-table">
                <hr />
                <div className="row row-cols-1 row-cols-lg-4">
                    {/* Free Tier */}
                    {clients && clients.map((item, index) => (
                        <div key={item.id} className="col mb-4">
                            <div className={`card ${colors[index % colors.length]} text-white`}>
                                <div className="card-header py-3">
                                    <h6 className="card-price text-white text-center">
                                        {item.validity}<span className="term">/month</span>
                                    </h6>
                                </div>
                                <div className="card-body" style={{ height: "433px" }}>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item bg-transparent text-white">
                                            <p><b>Title:</b> {item.title}</p>
                                        </li>
                                        <li className="list-group-item bg-transparent text-white">
                                            <p><b>Price:</b> {item.price}</p>
                                        </li>
                                        <li className="list-group-item bg-transparent text-white">
                                            <p><b>Description:</b> {item.description}</p>
                                        </li>
                                        <li className="list-group-item bg-transparent text-white">
                                            <p><b>Updated At:</b> {item.updated_at}</p>
                                        </li>
                                        <li className="list-group-item bg-transparent text-white">
                                            <p><b>Created At:</b> {new Date(item.created_at).toLocaleDateString()}</p>
                                        </li>


                                    </ul>
                                    {/* <div className="d-grid">
                                        <a href="#" className="btn btn-light my-2 radius-30">
                                            Order Now
                                        </a>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* End Section: Pricing Table */}
        </div>
    );
};

export default Plan;
