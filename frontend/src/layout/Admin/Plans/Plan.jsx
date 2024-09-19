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
            <div className="card">
                <div className="card-body">
                    <ul className="nav nav-tabs nav-primary" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a
                                className="nav-link active"
                                data-bs-toggle="tab"
                                href="#primaryhome"
                                role="tab"
                                aria-selected="true"
                            >
                                <div className="d-flex align-items-center">
                                    <div className="tab-icon">
                                        <i className="bx bx-home font-18 me-1" />
                                    </div>
                                    <div className="tab-title">Pro</div>
                                </div>
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className="nav-link"
                                data-bs-toggle="tab"
                                href="#primaryprofile"
                                role="tab"
                                aria-selected="false"
                                tabIndex={-1}
                            >
                                <div className="d-flex align-items-center">
                                    <div className="tab-icon">
                                        <i className="bx bx-user-pin font-18 me-1" />
                                    </div>
                                    <div className="tab-title">Pro Plus</div>
                                </div>
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className="nav-link"
                                data-bs-toggle="tab"
                                href="#primarycontact"
                                role="tab"
                                aria-selected="false"
                                tabIndex={-1}
                            >
                                <div className="d-flex align-items-center">
                                    <div className="tab-icon">
                                        <i className="bx bx-microphone font-18 me-1" />
                                    </div>
                                    <div className="tab-title">Pro Lite</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content py-3">
                        <div
                            className="tab-pane fade active show"
                            id="primaryhome"
                            role="tabpanel"
                        >
                            <div className="pricing-section mt-5">

                                <div className="card-container">
                                    {/* First Card */}
                                    <div className="pricing-card highlight-card">

                                        <div className="offer-tag">Limited Time Offer</div>
                                        <div className='row justify-content-between align-items-center'>
                                            <div className='col-md-6'>
                                                <h2 className='fonth3 me-4'>Cricbuzz Plus</h2>
                                                <h3 className='fonth2'>Annual Plan</h3>
                                            </div>
                                            <div className="price-section col-md-6">
                                                <span className="discount">-46%</span>
                                                <span className="original-price">INR 750</span>
                                                <h3 className='ms-4 fnt'>INR 399</h3>
                                            </div>
                                        </div>
                                        <hr />
                                        <ul>
                                            <li>Avail Fantasy Handbook: Comprehensive Fantasy Cricket Guide</li>
                                            <li>
                                                Exclusive access to premium editorial content and Cricbuzz Originals
                                            </li>
                                            <li>Enjoy an ad-free experience on the platform</li>
                                        </ul>
                                        <div className="button-group">
                                            <button className="btn-secondary btnsecond">Know More</button>
                                            <button className="btn-primary btnprime">Subscribe</button>
                                        </div>
                                       
                                    </div>
                                    {/* Second Card */}
                                    <div className="pricing-card">
                                        <div className='row justify-content-between align-items-center'>
                                            <div className='col-md-6'>


                                                <h3 className='fonth3'>Cricbuzz Plus Times Prime</h3>
                                                <h2 className='fonth2'>Annual Combo Plan</h2>
                                            </div>

                                            <div className="price-section col-md-6">
                                                <span className="discount">-16%</span>
                                                <span className="original-price">INR 1199</span>
                                                <h3 className='ms-4 fnt'>INR 999</h3>
                                            </div>
                                        </div>
                                        <hr />
                                        <ul>
                                            <li>
                                                Access to 23 premium subscriptions, spanning popular platforms.

                                            </li>
                                            <li>Avail Fantasy Handbook: Comprehensive Fantasy Cricket Guide</li>
                                            <li>Enjoy an ad-free experience on Cricbuzz</li>
                                        </ul>
                                        <div className="button-group">
                                            <button className="btn-secondary btnsecond">Know More</button>
                                            <button className="btn-primary btnprime">Subscribe</button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="tab-pane fade" id="primaryprofile" role="tabpanel">
                            <div className="pricing-table">

                                <div className="row row-cols-1 row-cols-lg-3">
                                    {/* Free Tier */}
                                    <div className="col">
                                        <div className="card mb-5 mb-lg-0">
                                            <div className="card-header bg-danger py-3">
                                                <h5 className="card-title text-white text-uppercase text-center">
                                                    Free
                                                </h5>
                                                <h6 className="card-price text-white text-center">
                                                    $0<span className="term">/month</span>
                                                </h6>
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Single User
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        5GB Storage
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Unlimited Public Projects
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Community Access
                                                    </li>
                                                    <li className="list-group-item text-secondary">
                                                        <i className="bx bx-x me-2 font-18" />
                                                        Unlimited Private Projects
                                                    </li>
                                                    <li className="list-group-item text-secondary">
                                                        <i className="bx bx-x me-2 font-18" />
                                                        Dedicated Phone Support
                                                    </li>
                                                    <li className="list-group-item text-secondary">
                                                        <i className="bx bx-x me-2 font-18" />
                                                        Free Subdomain
                                                    </li>
                                                    <li className="list-group-item text-secondary">
                                                        <i className="bx bx-x me-2 font-18" />
                                                        Monthly Status Reports
                                                    </li>
                                                </ul>
                                                <div className="d-grid">
                                                    {" "}
                                                    <a href="#" className="btn btn-danger my-2 radius-30">
                                                        Order Now
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Plus Tier */}
                                    <div className="col">
                                        <div className="card mb-5 mb-lg-0">
                                            <div className="card-header bg-primary py-3">
                                                <h5 className="card-title text-white text-uppercase text-center">
                                                    Plus
                                                </h5>
                                                <h6 className="card-price text-white text-center">
                                                    $9<span className="term">/month</span>
                                                </h6>
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Single User
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        5GB Storage
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Unlimited Public Projects
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Community Access
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Unlimited Private Projects
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Dedicated Phone Support
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Free Subdomain
                                                    </li>
                                                    <li className="list-group-item text-secondary">
                                                        <i className="bx bx-x me-2 font-18" />
                                                        Monthly Status Reports
                                                    </li>
                                                </ul>
                                                <div className="d-grid">
                                                    {" "}
                                                    <a href="#" className="btn btn-primary my-2 radius-30">
                                                        Order Now
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Pro Tier */}
                                    <div className="col">
                                        <div className="card">
                                            <div className="card-header bg-warning py-3">
                                                <h5 className="card-title text-dark text-uppercase text-center">
                                                    Pro
                                                </h5>
                                                <h6 className="card-price text-center">
                                                    $49<span className="term">/month</span>
                                                </h6>
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Single User
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        5GB Storage
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Unlimited Public Projects
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Community Access
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Unlimited Private Projects
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Dedicated Phone Support
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Free Subdomain
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Monthly Status Reports
                                                    </li>
                                                </ul>
                                                <div className="d-grid">
                                                    {" "}
                                                    <a href="#" className="btn btn-warning my-2 radius-30">
                                                        Order Now
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="tab-pane fade" id="primarycontact" role="tabpanel">
                            <div className="pricing-table">

                                <div className="row row-cols-1 row-cols-lg-3">
                                    {/* Free Tier */}
                                    <div className="col">
                                        <div className="card mb-5 mb-lg-0">
                                            <div className="card-header bg-danger py-3">
                                                <h5 className="card-title text-white text-uppercase text-center">
                                                    Free
                                                </h5>
                                                <h6 className="card-price text-white text-center">
                                                    $0<span className="term">/month</span>
                                                </h6>
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Single User
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        5GB Storage
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Unlimited Public Projects
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Community Access
                                                    </li>
                                                    <li className="list-group-item text-secondary">
                                                        <i className="bx bx-x me-2 font-18" />
                                                        Unlimited Private Projects
                                                    </li>
                                                    <li className="list-group-item text-secondary">
                                                        <i className="bx bx-x me-2 font-18" />
                                                        Dedicated Phone Support
                                                    </li>
                                                    <li className="list-group-item text-secondary">
                                                        <i className="bx bx-x me-2 font-18" />
                                                        Free Subdomain
                                                    </li>
                                                    <li className="list-group-item text-secondary">
                                                        <i className="bx bx-x me-2 font-18" />
                                                        Monthly Status Reports
                                                    </li>
                                                </ul>
                                                <div className="d-grid">
                                                    {" "}
                                                    <a href="#" className="btn btn-danger my-2 radius-30">
                                                        Order Now
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Plus Tier */}
                                    <div className="col">
                                        <div className="card mb-5 mb-lg-0">
                                            <div className="card-header bg-primary py-3">
                                                <h5 className="card-title text-white text-uppercase text-center">
                                                    Plus
                                                </h5>
                                                <h6 className="card-price text-white text-center">
                                                    $9<span className="term">/month</span>
                                                </h6>
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Single User
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        5GB Storage
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Unlimited Public Projects
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Community Access
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Unlimited Private Projects
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Dedicated Phone Support
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Free Subdomain
                                                    </li>
                                                    <li className="list-group-item text-secondary">
                                                        <i className="bx bx-x me-2 font-18" />
                                                        Monthly Status Reports
                                                    </li>
                                                </ul>
                                                <div className="d-grid">
                                                    {" "}
                                                    <a href="#" className="btn btn-primary my-2 radius-30">
                                                        Order Now
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Pro Tier */}
                                    <div className="col">
                                        <div className="card">
                                            <div className="card-header bg-warning py-3">
                                                <h5 className="card-title text-dark text-uppercase text-center">
                                                    Pro
                                                </h5>
                                                <h6 className="card-price text-center">
                                                    $49<span className="term">/month</span>
                                                </h6>
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Single User
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        5GB Storage
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Unlimited Public Projects
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Community Access
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Unlimited Private Projects
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Dedicated Phone Support
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Free Subdomain
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="bx bx-check me-2 font-18" />
                                                        Monthly Status Reports
                                                    </li>
                                                </ul>
                                                <div className="d-grid">
                                                    {" "}
                                                    <a href="#" className="btn btn-warning my-2 radius-30">
                                                        Order Now
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
            </div>


            {/* Section: Pricing Table */}
            {/* <div className="pricing-table">
                <hr />
                <div className="row row-cols-1 row-cols-lg-4">
      
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
                                   
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}

        </div>
    );
};

export default Plan;
