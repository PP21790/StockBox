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
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne"
                                    aria-expanded="false"
                                    aria-controls="collapseOne"
                                >
                                    Stock
                                </button>
                            </h2>
                            <div
                                id="collapseOne"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample"
                                style={{}}
                            >
                                <div className="accordion-body">
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

                                                        <div className='row'>
                                                            <div className="col-md-6 mb-3">

                                                                <div className="pricing-card highlight-card">

                                                                    <div className="offer-tag">Limited Time Offer</div>
                                                                    <div className='row justify-content-end mb-3'>
                                                                        <div className='col-md-6 d-flex justify-content-end'>
                                                                            {/* <div>
                                                                                <h4 className='text-success'>active</h4>
                                                                            </div> */}
                                                                            <div>
                                                                                <i className="bx bx-trash trashbtn ms-3" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='row justify-content-between align-items-center'>
                                                                        <div className='col-md-6'>
                                                                            <h2 className='fonth3 me-4'>Basic Plan Plus</h2>
                                                                            <h3 className='fonth2'>Monthly Plan</h3>
                                                                        </div>
                                                                        <div className="price-section col-md-6">
                                                                            <span className="discount">-46%</span>
                                                                            <span className="original-price">INR 750</span>
                                                                            <h3 className='ms-4 fnt'>INR 8000</h3>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <ul>

                                                                        <li>
                                                                            <b>validity</b> : 1 Month
                                                                        </li>
                                                                        <li><b>Description</b> : This is a basic plan with essential features.</li>
                                                                        <li><b>Created At</b> : 2024-09-03T11:01:32.841Z</li>
                                                                        <li><b>Updated At</b> : 2024-09-03T11:01:32.841Z</li>


                                                                    </ul>
                                                                    <div className="button-group">
                                                                        <>

                                                                            <button
                                                                                type="button"
                                                                                className="btnsecond "
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#exampleModal"
                                                                            >
                                                                                Know More
                                                                            </button>

                                                                            <div
                                                                                className="modal fade"
                                                                                id="exampleModal"
                                                                                tabIndex={-1}
                                                                                aria-labelledby="exampleModalLabel"
                                                                                aria-hidden="true"
                                                                                style={{ display: "none" }}
                                                                            >
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content">
                                                                                        <div className="modal-header">
                                                                                            <h5 className="modal-title" id="exampleModalLabel">
                                                                                                Modal title
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
                                                                                                    <b>Title</b> : Basic Plan Plus
                                                                                                </li>
                                                                                                <li><b>Price</b> : 8000</li>


                                                                                                <li>
                                                                                                    <b>validity</b> : 1 Month
                                                                                                </li>
                                                                                                <li><b>Description</b> : This is a basic plan with essential features.</li>
                                                                                                <li><b>Created At</b> : 2024-09-03T11:01:32.841Z</li>
                                                                                                <li><b>Updated At</b> : 2024-09-03T11:01:32.841Z</li>


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
                                                                                            {/* <button type="button" className="btn btn-primary">
                                                                            Save changes
                                                                        </button> */}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                        <button className="btn-primary btnprime">Edit</button>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            {/* Second Card */}
                                                            <div className="col-md-6 mb-3">
                                                                <div className="pricing-card">
                                                                    <div className='row justify-content-end mb-3'>
                                                                        <div className='col-md-6 d-flex justify-content-end'>
                                                                            {/* <div>
                                                                                <h4 className='text-success'>active</h4>
                                                                            </div> */}
                                                                            <div>
                                                                                <i className="bx bx-trash trashbtn ms-3" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='row justify-content-between align-items-center'>
                                                                        <div className='col-md-6'>


                                                                            <h3 className='fonth3'>Basic Plan Lite</h3>
                                                                            <h2 className='fonth2'>Monthly Plan</h2>
                                                                        </div>

                                                                        <div className="price-section col-md-6">
                                                                            <span className="discount">-16%</span>
                                                                            <span className="original-price">INR 6199</span>
                                                                            <h3 className='ms-4 fnt'>INR 5000</h3>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <ul>
                                                                        <li>
                                                                            <b>validity</b> : 1 Month
                                                                        </li>
                                                                        <li><b>Description</b> : This is a basic plan with essential features.</li>
                                                                        <li><b>Created At</b> : 2024-09-03T11:01:32.841Z</li>
                                                                        <li><b>Updated At</b> : 2024-09-03T11:01:32.841Z</li>
                                                                    </ul>
                                                                    <div className="button-group">
                                                                        <>

                                                                            <button
                                                                                type="button"
                                                                                className="btnsecond "
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#exampleModal"
                                                                            >
                                                                                Know More
                                                                            </button>

                                                                            <div
                                                                                className="modal fade"
                                                                                id="exampleModal"
                                                                                tabIndex={-1}
                                                                                aria-labelledby="exampleModalLabel"
                                                                                aria-hidden="true"
                                                                                style={{ display: "none" }}
                                                                            >
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content">
                                                                                        <div className="modal-header">
                                                                                            <h5 className="modal-title" id="exampleModalLabel">
                                                                                                About Plan
                                                                                            </h5>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn-close"
                                                                                                data-bs-dismiss="modal"
                                                                                                aria-label="Close"
                                                                                            />
                                                                                        </div>
                                                                                        <div className="modal-body">
                                                                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It
                                                                                            has roots in a piece of classical Latin literature from 45 BC, making
                                                                                            it over 2000 years old. Richard McClintock, a Latin professor at
                                                                                            Hampden-Sydney College in Virginia, looked up one of the more obscure
                                                                                            Latin words, consectetur.
                                                                                        </div>
                                                                                        <div className="modal-footer">
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-secondary"
                                                                                                data-bs-dismiss="modal"
                                                                                            >
                                                                                                Close
                                                                                            </button>
                                                                                            <button type="button" className="btn btn-primary">
                                                                                                Save changes
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                        <button className="btn-primary btnprime">Edit</button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                            <div className="tab-pane fade" id="primaryprofile" role="tabpanel">
                                                <div className="pricing-section mt-5">

                                                    <div className="card-container">
                                                        {/* First Card */}
                                                        <div className='row'>
                                                            <div className="col-md-6 mb-3">

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
                                                                        <>

                                                                            <button
                                                                                type="button"
                                                                                className="btnsecond "
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#exampleModal2"
                                                                            >
                                                                                Know More
                                                                            </button>

                                                                            <div
                                                                                className="modal fade"
                                                                                id="exampleModal2"
                                                                                tabIndex={-1}
                                                                                aria-labelledby="exampleModalLabel"
                                                                                aria-hidden="true"
                                                                                style={{ display: "none" }}
                                                                            >
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content">
                                                                                        <div className="modal-header">
                                                                                            <h5 className="modal-title" id="exampleModalLabel">
                                                                                                Modal title
                                                                                            </h5>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn-close"
                                                                                                data-bs-dismiss="modal"
                                                                                                aria-label="Close"
                                                                                            />
                                                                                        </div>
                                                                                        <div className="modal-body">
                                                                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It
                                                                                            has roots in a piece of classical Latin literature from 45 BC, making
                                                                                            it over 2000 years old. Richard McClintock, a Latin professor at
                                                                                            Hampden-Sydney College in Virginia, looked up one of the more obscure
                                                                                            Latin words, consectetur.
                                                                                        </div>
                                                                                        <div className="modal-footer">
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-secondary"
                                                                                                data-bs-dismiss="modal"
                                                                                            >
                                                                                                Close
                                                                                            </button>
                                                                                            <button type="button" className="btn btn-primary">
                                                                                                Save changes
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                        <button className="btn-primary btnprime">Edit</button>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            {/* Second Card */}
                                                            <div className="col-md-6 mb-3">
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
                                                                        <>

                                                                            <button
                                                                                type="button"
                                                                                className="btnsecond "
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#exampleModal2"
                                                                            >
                                                                                Know More
                                                                            </button>

                                                                            <div
                                                                                className="modal fade"
                                                                                id="exampleModal2"
                                                                                tabIndex={-1}
                                                                                aria-labelledby="exampleModalLabel"
                                                                                aria-hidden="true"
                                                                                style={{ display: "none" }}
                                                                            >
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content">
                                                                                        <div className="modal-header">
                                                                                            <h5 className="modal-title" id="exampleModalLabel">
                                                                                                Modal title
                                                                                            </h5>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn-close"
                                                                                                data-bs-dismiss="modal"
                                                                                                aria-label="Close"
                                                                                            />
                                                                                        </div>
                                                                                        <div className="modal-body">
                                                                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It
                                                                                            has roots in a piece of classical Latin literature from 45 BC, making
                                                                                            it over 2000 years old. Richard McClintock, a Latin professor at
                                                                                            Hampden-Sydney College in Virginia, looked up one of the more obscure
                                                                                            Latin words, consectetur.
                                                                                        </div>
                                                                                        <div className="modal-footer">
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-secondary"
                                                                                                data-bs-dismiss="modal"
                                                                                            >
                                                                                                Close
                                                                                            </button>
                                                                                            <button type="button" className="btn btn-primary">
                                                                                                Save changes
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                        <button className="btn-primary btnprime">Edit</button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="tab-pane fade" id="primarycontact" role="tabpanel">
                                                <div className="pricing-section mt-5">

                                                    <div className="card-container">
                                                        {/* First Card */}
                                                        <div className='row'>
                                                            <div className="col-md-6 mb-3">

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
                                                                        <>

                                                                            <button
                                                                                type="button"
                                                                                className="btnsecond "
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#exampleModal3"
                                                                            >
                                                                                Know More
                                                                            </button>

                                                                            <div
                                                                                className="modal fade"
                                                                                id="exampleModal3"
                                                                                tabIndex={-1}
                                                                                aria-labelledby="exampleModalLabel"
                                                                                aria-hidden="true"
                                                                                style={{ display: "none" }}
                                                                            >
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content">
                                                                                        <div className="modal-header">
                                                                                            <h5 className="modal-title" id="exampleModalLabel">
                                                                                                Modal title
                                                                                            </h5>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn-close"
                                                                                                data-bs-dismiss="modal"
                                                                                                aria-label="Close"
                                                                                            />
                                                                                        </div>
                                                                                        <div className="modal-body">
                                                                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It
                                                                                            has roots in a piece of classical Latin literature from 45 BC, making
                                                                                            it over 2000 years old. Richard McClintock, a Latin professor at
                                                                                            Hampden-Sydney College in Virginia, looked up one of the more obscure
                                                                                            Latin words, consectetur.
                                                                                        </div>
                                                                                        <div className="modal-footer">
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-secondary"
                                                                                                data-bs-dismiss="modal"
                                                                                            >
                                                                                                Close
                                                                                            </button>
                                                                                            <button type="button" className="btn btn-primary">
                                                                                                Save changes
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                        <button className="btn-primary btnprime">Edit</button>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            {/* Second Card */}
                                                            <div className="col-md-6 mb-3">
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
                                                                        <>

                                                                            <button
                                                                                type="button"
                                                                                className="btnsecond "
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#exampleModal3"
                                                                            >
                                                                                Know More
                                                                            </button>

                                                                            <div
                                                                                className="modal fade"
                                                                                id="exampleModal3"
                                                                                tabIndex={-1}
                                                                                aria-labelledby="exampleModalLabel"
                                                                                aria-hidden="true"
                                                                                style={{ display: "none" }}
                                                                            >
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content">
                                                                                        <div className="modal-header">
                                                                                            <h5 className="modal-title" id="exampleModalLabel">
                                                                                                Modal title
                                                                                            </h5>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn-close"
                                                                                                data-bs-dismiss="modal"
                                                                                                aria-label="Close"
                                                                                            />
                                                                                        </div>
                                                                                        <div className="modal-body">
                                                                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It
                                                                                            has roots in a piece of classical Latin literature from 45 BC, making
                                                                                            it over 2000 years old. Richard McClintock, a Latin professor at
                                                                                            Hampden-Sydney College in Virginia, looked up one of the more obscure
                                                                                            Latin words, consectetur.
                                                                                        </div>
                                                                                        <div className="modal-footer">
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-secondary"
                                                                                                data-bs-dismiss="modal"
                                                                                            >
                                                                                                Close
                                                                                            </button>
                                                                                            <button type="button" className="btn btn-primary">
                                                                                                Save changes
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>

                                                                        <button className="btn-primary btnprime">Edit</button>
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
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo"
                                    aria-expanded="false"
                                    aria-controls="collapseTwo"
                                >
                                    Case
                                </button>
                            </h2>
                            <div
                                id="collapseTwo"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingTwo"
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body">
                                    <div className="card-body">
                                        <ul className="nav nav-tabs nav-primary" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <a
                                                    className="nav-link active"
                                                    data-bs-toggle="tab"
                                                    href="#primaryhome1"
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
                                                    href="#primaryprofile1"
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
                                                    href="#primarycontact1"
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
                                                id="primaryhome1"
                                                role="tabpanel"
                                            >

                                                <div className="pricing-section mt-5">

                                                    <div className="card-container">
                                                        {/* First Card */}
                                                        <div className='row'>
                                                            <div className="col-md-6 mb-3">

                                                                <div className="pricing-card highlight-card">

                                                                    <div className="offer-tag">Limited Time Offer</div>
                                                                    <div className='row justify-content-between align-items-center'>
                                                                        <div className='col-md-6'>
                                                                            <h2 className='fonth3 me-4'>Basic Plan Plus</h2>
                                                                            <h3 className='fonth2'>Monthly Plan</h3>
                                                                        </div>
                                                                        <div className="price-section col-md-6">
                                                                            <span className="discount">-46%</span>
                                                                            <span className="original-price">INR 750</span>
                                                                            <h3 className='ms-4 fnt'>INR 8000</h3>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <ul>

                                                                        <li>
                                                                            <b>validity</b> : 1 Month
                                                                        </li>
                                                                        <li><b>Description</b> : This is a basic plan with essential features.</li>
                                                                        <li><b>Created At</b> : 2024-09-03T11:01:32.841Z</li>
                                                                        <li><b>Updated At</b> : 2024-09-03T11:01:32.841Z</li>


                                                                    </ul>
                                                                    <div className="button-group">
                                                                        <>

                                                                            <button
                                                                                type="button"
                                                                                className="btnsecond "
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#exampleModal0"
                                                                            >
                                                                                Know More
                                                                            </button>

                                                                            <div
                                                                                className="modal fade"
                                                                                id="exampleModal0"
                                                                                tabIndex={-1}
                                                                                aria-labelledby="exampleModalLabel"
                                                                                aria-hidden="true"
                                                                                style={{ display: "none" }}
                                                                            >
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content">
                                                                                        <div className="modal-header">
                                                                                            <h5 className="modal-title" id="exampleModalLabel">
                                                                                                Modal title
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
                                                                                                    <b>Title</b> : Basic Plan Plus
                                                                                                </li>
                                                                                                <li><b>Price</b> : 8000</li>


                                                                                                <li>
                                                                                                    <b>validity</b> : 1 Month
                                                                                                </li>
                                                                                                <li><b>Description</b> : This is a basic plan with essential features.</li>
                                                                                                <li><b>Created At</b> : 2024-09-03T11:01:32.841Z</li>
                                                                                                <li><b>Updated At</b> : 2024-09-03T11:01:32.841Z</li>


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
                                                                                            {/* <button type="button" className="btn btn-primary">
                                                                            Save changes
                                                                        </button> */}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                        <button className="btn-primary btnprime">Edit</button>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            {/* Second Card */}
                                                            <div className="col-md-6 mb-3">
                                                                <div className="pricing-card">
                                                                    <div className='row justify-content-between align-items-center'>
                                                                        <div className='col-md-6'>


                                                                            <h3 className='fonth3'>Basic Plan Lite</h3>
                                                                            <h2 className='fonth2'>Monthly Plan</h2>
                                                                        </div>

                                                                        <div className="price-section col-md-6">
                                                                            <span className="discount">-16%</span>
                                                                            <span className="original-price">INR 6199</span>
                                                                            <h3 className='ms-4 fnt'>INR 5000</h3>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <ul>
                                                                        <li>
                                                                            <b>validity</b> : 1 Month
                                                                        </li>
                                                                        <li><b>Description</b> : This is a basic plan with essential features.</li>
                                                                        <li><b>Created At</b> : 2024-09-03T11:01:32.841Z</li>
                                                                        <li><b>Updated At</b> : 2024-09-03T11:01:32.841Z</li>
                                                                    </ul>
                                                                    <div className="button-group">
                                                                        <>

                                                                            <button
                                                                                type="button"
                                                                                className="btnsecond "
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#exampleModal0"
                                                                            >
                                                                                Know More
                                                                            </button>

                                                                            <div
                                                                                className="modal fade"
                                                                                id="exampleModal0"
                                                                                tabIndex={-1}
                                                                                aria-labelledby="exampleModalLabel"
                                                                                aria-hidden="true"
                                                                                style={{ display: "none" }}
                                                                            >
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content">
                                                                                        <div className="modal-header">
                                                                                            <h5 className="modal-title" id="exampleModalLabel">
                                                                                                About Plan
                                                                                            </h5>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn-close"
                                                                                                data-bs-dismiss="modal"
                                                                                                aria-label="Close"
                                                                                            />
                                                                                        </div>
                                                                                        <div className="modal-body">
                                                                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It
                                                                                            has roots in a piece of classical Latin literature from 45 BC, making
                                                                                            it over 2000 years old. Richard McClintock, a Latin professor at
                                                                                            Hampden-Sydney College in Virginia, looked up one of the more obscure
                                                                                            Latin words, consectetur.
                                                                                        </div>
                                                                                        <div className="modal-footer">
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-secondary"
                                                                                                data-bs-dismiss="modal"
                                                                                            >
                                                                                                Close
                                                                                            </button>
                                                                                            <button type="button" className="btn btn-primary">
                                                                                                Save changes
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                        <button className="btn-primary btnprime">Edit</button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                            <div className="tab-pane fade" id="primaryprofile1" role="tabpanel">
                                                <div className="pricing-section mt-5">

                                                    <div className="card-container">
                                                        {/* First Card */}
                                                        <div className='row'>
                                                            <div className="col-md-6 mb-3">

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
                                                                        <>

                                                                            <button
                                                                                type="button"
                                                                                className="btnsecond "
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#exampleModal0"
                                                                            >
                                                                                Know More
                                                                            </button>

                                                                            <div
                                                                                className="modal fade"
                                                                                id="exampleModal0"
                                                                                tabIndex={-1}
                                                                                aria-labelledby="exampleModalLabel"
                                                                                aria-hidden="true"
                                                                                style={{ display: "none" }}
                                                                            >
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content">
                                                                                        <div className="modal-header">
                                                                                            <h5 className="modal-title" id="exampleModalLabel">
                                                                                                Modal title
                                                                                            </h5>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn-close"
                                                                                                data-bs-dismiss="modal"
                                                                                                aria-label="Close"
                                                                                            />
                                                                                        </div>
                                                                                        <div className="modal-body">
                                                                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It
                                                                                            has roots in a piece of classical Latin literature from 45 BC, making
                                                                                            it over 2000 years old. Richard McClintock, a Latin professor at
                                                                                            Hampden-Sydney College in Virginia, looked up one of the more obscure
                                                                                            Latin words, consectetur.
                                                                                        </div>
                                                                                        <div className="modal-footer">
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-secondary"
                                                                                                data-bs-dismiss="modal"
                                                                                            >
                                                                                                Close
                                                                                            </button>
                                                                                            <button type="button" className="btn btn-primary">
                                                                                                Save changes
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                        <button className="btn-primary btnprime">Edit</button>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            {/* Second Card */}
                                                            <div className="col-md-6 mb-3">
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
                                                                        <>

                                                                            <button
                                                                                type="button"
                                                                                className="btnsecond "
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#exampleModal0"
                                                                            >
                                                                                Know More
                                                                            </button>

                                                                            <div
                                                                                className="modal fade"
                                                                                id="exampleModal0"
                                                                                tabIndex={-1}
                                                                                aria-labelledby="exampleModalLabel"
                                                                                aria-hidden="true"
                                                                                style={{ display: "none" }}
                                                                            >
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content">
                                                                                        <div className="modal-header">
                                                                                            <h5 className="modal-title" id="exampleModalLabel">
                                                                                                Modal title
                                                                                            </h5>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn-close"
                                                                                                data-bs-dismiss="modal"
                                                                                                aria-label="Close"
                                                                                            />
                                                                                        </div>
                                                                                        <div className="modal-body">
                                                                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It
                                                                                            has roots in a piece of classical Latin literature from 45 BC, making
                                                                                            it over 2000 years old. Richard McClintock, a Latin professor at
                                                                                            Hampden-Sydney College in Virginia, looked up one of the more obscure
                                                                                            Latin words, consectetur.
                                                                                        </div>
                                                                                        <div className="modal-footer">
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-secondary"
                                                                                                data-bs-dismiss="modal"
                                                                                            >
                                                                                                Close
                                                                                            </button>
                                                                                            <button type="button" className="btn btn-primary">
                                                                                                Save changes
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                        <button className="btn-primary btnprime">Edit</button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="tab-pane fade" id="primarycontact1" role="tabpanel">
                                                <div className="pricing-section mt-5">

                                                    <div className="card-container">
                                                        {/* First Card */}
                                                        <div className='row'>
                                                            <div className="col-md-6 mb-3">

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
                                                                        <>

                                                                            <button
                                                                                type="button"
                                                                                className="btnsecond "
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#exampleModal3"
                                                                            >
                                                                                Know More
                                                                            </button>

                                                                            <div
                                                                                className="modal fade"
                                                                                id="exampleModal3"
                                                                                tabIndex={-1}
                                                                                aria-labelledby="exampleModalLabel"
                                                                                aria-hidden="true"
                                                                                style={{ display: "none" }}
                                                                            >
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content">
                                                                                        <div className="modal-header">
                                                                                            <h5 className="modal-title" id="exampleModalLabel">
                                                                                                Modal title
                                                                                            </h5>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn-close"
                                                                                                data-bs-dismiss="modal"
                                                                                                aria-label="Close"
                                                                                            />
                                                                                        </div>
                                                                                        <div className="modal-body">
                                                                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It
                                                                                            has roots in a piece of classical Latin literature from 45 BC, making
                                                                                            it over 2000 years old. Richard McClintock, a Latin professor at
                                                                                            Hampden-Sydney College in Virginia, looked up one of the more obscure
                                                                                            Latin words, consectetur.
                                                                                        </div>
                                                                                        <div className="modal-footer">
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-secondary"
                                                                                                data-bs-dismiss="modal"
                                                                                            >
                                                                                                Close
                                                                                            </button>
                                                                                            <button type="button" className="btn btn-primary">
                                                                                                Save changes
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                        <button className="btn-primary btnprime">Edit</button>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            {/* Second Card */}
                                                            <div className="col-md-6 mb-3">
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
                                                                        <>

                                                                            <button
                                                                                type="button"
                                                                                className="btnsecond "
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#exampleModal3"
                                                                            >
                                                                                Know More
                                                                            </button>

                                                                            <div
                                                                                className="modal fade"
                                                                                id="exampleModal3"
                                                                                tabIndex={-1}
                                                                                aria-labelledby="exampleModalLabel"
                                                                                aria-hidden="true"
                                                                                style={{ display: "none" }}
                                                                            >
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content">
                                                                                        <div className="modal-header">
                                                                                            <h5 className="modal-title" id="exampleModalLabel">
                                                                                                Modal title
                                                                                            </h5>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn-close"
                                                                                                data-bs-dismiss="modal"
                                                                                                aria-label="Close"
                                                                                            />
                                                                                        </div>
                                                                                        <div className="modal-body">
                                                                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It
                                                                                            has roots in a piece of classical Latin literature from 45 BC, making
                                                                                            it over 2000 years old. Richard McClintock, a Latin professor at
                                                                                            Hampden-Sydney College in Virginia, looked up one of the more obscure
                                                                                            Latin words, consectetur.
                                                                                        </div>
                                                                                        <div className="modal-footer">
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-secondary"
                                                                                                data-bs-dismiss="modal"
                                                                                            >
                                                                                                Close
                                                                                            </button>
                                                                                            <button type="button" className="btn btn-primary">
                                                                                                Save changes
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>

                                                                        <button className="btn-primary btnprime">Edit</button>
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
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingThree">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseThree"
                                    aria-expanded="false"
                                    aria-controls="collapseThree"
                                >
                                    Future
                                </button>
                            </h2>
                            <div
                                id="collapseThree"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingThree"
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body">
                                    <div className="card-body">
                                        <ul className="nav nav-tabs nav-primary" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <a
                                                    className="nav-link active"
                                                    data-bs-toggle="tab"
                                                    href="#primaryhome2"
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
                                                    href="#primaryprofile2"
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
                                                    href="#primarycontact2"
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
                                                id="primaryhome2"
                                                role="tabpanel"
                                            >

                                                <div className="pricing-section mt-5">

                                                    <div className="card-container">
                                                        {/* First Card */}
                                                        <div className='row'>
                                                            <div className="col-md-6 mb-3">

                                                                <div className="pricing-card highlight-card">

                                                                    <div className="offer-tag">Limited Time Offer</div>
                                                                    <div className='row justify-content-between align-items-center'>
                                                                        <div className='col-md-6'>
                                                                            <h2 className='fonth3 me-4'>Basic Plan Plus</h2>
                                                                            <h3 className='fonth2'>Monthly Plan</h3>
                                                                        </div>
                                                                        <div className="price-section col-md-6">
                                                                            <span className="discount">-46%</span>
                                                                            <span className="original-price">INR 750</span>
                                                                            <h3 className='ms-4 fnt'>INR 8000</h3>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <ul>

                                                                        <li>
                                                                            <b>validity</b> : 1 Month
                                                                        </li>
                                                                        <li><b>Description</b> : This is a basic plan with essential features.</li>
                                                                        <li><b>Created At</b> : 2024-09-03T11:01:32.841Z</li>
                                                                        <li><b>Updated At</b> : 2024-09-03T11:01:32.841Z</li>


                                                                    </ul>
                                                                    <div className="button-group">
                                                                        <>

                                                                            <button
                                                                                type="button"
                                                                                className="btnsecond "
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#exampleModal2"
                                                                            >
                                                                                Know More
                                                                            </button>

                                                                            <div
                                                                                className="modal fade"
                                                                                id="exampleModal2"
                                                                                tabIndex={-1}
                                                                                aria-labelledby="exampleModalLabel"
                                                                                aria-hidden="true"
                                                                                style={{ display: "none" }}
                                                                            >
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content">
                                                                                        <div className="modal-header">
                                                                                            <h5 className="modal-title" id="exampleModalLabel">
                                                                                                Modal title
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
                                                                                                    <b>Title</b> : Basic Plan Plus
                                                                                                </li>
                                                                                                <li><b>Price</b> : 8000</li>


                                                                                                <li>
                                                                                                    <b>validity</b> : 1 Month
                                                                                                </li>
                                                                                                <li><b>Description</b> : This is a basic plan with essential features.</li>
                                                                                                <li><b>Created At</b> : 2024-09-03T11:01:32.841Z</li>
                                                                                                <li><b>Updated At</b> : 2024-09-03T11:01:32.841Z</li>


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
                                                                                            {/* <button type="button" className="btn btn-primary">
                                                                            Save changes
                                                                        </button> */}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                        <button className="btn-primary btnprime">Edit</button>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            {/* Second Card */}
                                                            <div className="col-md-6 mb-3">
                                                                <div className="pricing-card">
                                                                    <div className='row justify-content-between align-items-center'>
                                                                        <div className='col-md-6'>


                                                                            <h3 className='fonth3'>Basic Plan Lite</h3>
                                                                            <h2 className='fonth2'>Monthly Plan</h2>
                                                                        </div>

                                                                        <div className="price-section col-md-6">
                                                                            <span className="discount">-16%</span>
                                                                            <span className="original-price">INR 6199</span>
                                                                            <h3 className='ms-4 fnt'>INR 5000</h3>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <ul>
                                                                        <li>
                                                                            <b>validity</b> : 1 Month
                                                                        </li>
                                                                        <li><b>Description</b> : This is a basic plan with essential features.</li>
                                                                        <li><b>Created At</b> : 2024-09-03T11:01:32.841Z</li>
                                                                        <li><b>Updated At</b> : 2024-09-03T11:01:32.841Z</li>
                                                                    </ul>
                                                                    <div className="button-group">
                                                                        <>

                                                                            <button
                                                                                type="button"
                                                                                className="btnsecond "
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#exampleModal2"
                                                                            >
                                                                                Know More
                                                                            </button>

                                                                            <div
                                                                                className="modal fade"
                                                                                id="exampleModal2"
                                                                                tabIndex={-1}
                                                                                aria-labelledby="exampleModalLabel"
                                                                                aria-hidden="true"
                                                                                style={{ display: "none" }}
                                                                            >
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content">
                                                                                        <div className="modal-header">
                                                                                            <h5 className="modal-title" id="exampleModalLabel">
                                                                                                About Plan
                                                                                            </h5>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn-close"
                                                                                                data-bs-dismiss="modal"
                                                                                                aria-label="Close"
                                                                                            />
                                                                                        </div>
                                                                                        <div className="modal-body">
                                                                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It
                                                                                            has roots in a piece of classical Latin literature from 45 BC, making
                                                                                            it over 2000 years old. Richard McClintock, a Latin professor at
                                                                                            Hampden-Sydney College in Virginia, looked up one of the more obscure
                                                                                            Latin words, consectetur.
                                                                                        </div>
                                                                                        <div className="modal-footer">
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-secondary"
                                                                                                data-bs-dismiss="modal"
                                                                                            >
                                                                                                Close
                                                                                            </button>
                                                                                            <button type="button" className="btn btn-primary">
                                                                                                Save changes
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                        <button className="btn-primary btnprime">Edit</button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                            <div className="tab-pane fade" id="primaryprofile2" role="tabpanel">
                                                <div className="pricing-section mt-5">

                                                    <div className="card-container">
                                                        {/* First Card */}
                                                        <div className='row'>
                                                            <div className="col-md-6 mb-3">

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
                                                                        <>

                                                                            <button
                                                                                type="button"
                                                                                className="btnsecond "
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#exampleModal2"
                                                                            >
                                                                                Know More
                                                                            </button>

                                                                            <div
                                                                                className="modal fade"
                                                                                id="exampleModal2"
                                                                                tabIndex={-1}
                                                                                aria-labelledby="exampleModalLabel"
                                                                                aria-hidden="true"
                                                                                style={{ display: "none" }}
                                                                            >
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content">
                                                                                        <div className="modal-header">
                                                                                            <h5 className="modal-title" id="exampleModalLabel">
                                                                                                Modal title
                                                                                            </h5>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn-close"
                                                                                                data-bs-dismiss="modal"
                                                                                                aria-label="Close"
                                                                                            />
                                                                                        </div>
                                                                                        <div className="modal-body">
                                                                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It
                                                                                            has roots in a piece of classical Latin literature from 45 BC, making
                                                                                            it over 2000 years old. Richard McClintock, a Latin professor at
                                                                                            Hampden-Sydney College in Virginia, looked up one of the more obscure
                                                                                            Latin words, consectetur.
                                                                                        </div>
                                                                                        <div className="modal-footer">
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-secondary"
                                                                                                data-bs-dismiss="modal"
                                                                                            >
                                                                                                Close
                                                                                            </button>
                                                                                            <button type="button" className="btn btn-primary">
                                                                                                Save changes
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                        <button className="btn-primary btnprime">Edit</button>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            {/* Second Card */}
                                                            <div className="col-md-6 mb-3">
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
                                                                        <>

                                                                            <button
                                                                                type="button"
                                                                                className="btnsecond "
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#exampleModal2"
                                                                            >
                                                                                Know More
                                                                            </button>

                                                                            <div
                                                                                className="modal fade"
                                                                                id="exampleModal2"
                                                                                tabIndex={-1}
                                                                                aria-labelledby="exampleModalLabel"
                                                                                aria-hidden="true"
                                                                                style={{ display: "none" }}
                                                                            >
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content">
                                                                                        <div className="modal-header">
                                                                                            <h5 className="modal-title" id="exampleModalLabel">
                                                                                                Modal title
                                                                                            </h5>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn-close"
                                                                                                data-bs-dismiss="modal"
                                                                                                aria-label="Close"
                                                                                            />
                                                                                        </div>
                                                                                        <div className="modal-body">
                                                                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It
                                                                                            has roots in a piece of classical Latin literature from 45 BC, making
                                                                                            it over 2000 years old. Richard McClintock, a Latin professor at
                                                                                            Hampden-Sydney College in Virginia, looked up one of the more obscure
                                                                                            Latin words, consectetur.
                                                                                        </div>
                                                                                        <div className="modal-footer">
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-secondary"
                                                                                                data-bs-dismiss="modal"
                                                                                            >
                                                                                                Close
                                                                                            </button>
                                                                                            <button type="button" className="btn btn-primary">
                                                                                                Save changes
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                        <button className="btn-primary btnprime">Edit</button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="tab-pane fade" id="primarycontact2" role="tabpanel">
                                                <div className="pricing-section mt-5">

                                                    <div className="card-container">
                                                        {/* First Card */}
                                                        <div className='row'>
                                                            <div className="col-md-6 mb-3">

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
                                                                        <>

                                                                            <button
                                                                                type="button"
                                                                                className="btnsecond "
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#exampleModal3"
                                                                            >
                                                                                Know More
                                                                            </button>

                                                                            <div
                                                                                className="modal fade"
                                                                                id="exampleModal3"
                                                                                tabIndex={-1}
                                                                                aria-labelledby="exampleModalLabel"
                                                                                aria-hidden="true"
                                                                                style={{ display: "none" }}
                                                                            >
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content">
                                                                                        <div className="modal-header">
                                                                                            <h5 className="modal-title" id="exampleModalLabel">
                                                                                                Modal title
                                                                                            </h5>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn-close"
                                                                                                data-bs-dismiss="modal"
                                                                                                aria-label="Close"
                                                                                            />
                                                                                        </div>
                                                                                        <div className="modal-body">
                                                                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It
                                                                                            has roots in a piece of classical Latin literature from 45 BC, making
                                                                                            it over 2000 years old. Richard McClintock, a Latin professor at
                                                                                            Hampden-Sydney College in Virginia, looked up one of the more obscure
                                                                                            Latin words, consectetur.
                                                                                        </div>
                                                                                        <div className="modal-footer">
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-secondary"
                                                                                                data-bs-dismiss="modal"
                                                                                            >
                                                                                                Close
                                                                                            </button>
                                                                                            <button type="button" className="btn btn-primary">
                                                                                                Save changes
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                        <button className="btn-primary btnprime">Edit</button>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            {/* Second Card */}
                                                            <div className="col-md-6 mb-3">
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
                                                                        <>

                                                                            <button
                                                                                type="button"
                                                                                className="btnsecond "
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#exampleModal3"
                                                                            >
                                                                                Know More
                                                                            </button>

                                                                            <div
                                                                                className="modal fade"
                                                                                id="exampleModal3"
                                                                                tabIndex={-1}
                                                                                aria-labelledby="exampleModalLabel"
                                                                                aria-hidden="true"
                                                                                style={{ display: "none" }}
                                                                            >
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content">
                                                                                        <div className="modal-header">
                                                                                            <h5 className="modal-title" id="exampleModalLabel">
                                                                                                Modal title
                                                                                            </h5>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn-close"
                                                                                                data-bs-dismiss="modal"
                                                                                                aria-label="Close"
                                                                                            />
                                                                                        </div>
                                                                                        <div className="modal-body">
                                                                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It
                                                                                            has roots in a piece of classical Latin literature from 45 BC, making
                                                                                            it over 2000 years old. Richard McClintock, a Latin professor at
                                                                                            Hampden-Sydney College in Virginia, looked up one of the more obscure
                                                                                            Latin words, consectetur.
                                                                                        </div>
                                                                                        <div className="modal-footer">
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-secondary"
                                                                                                data-bs-dismiss="modal"
                                                                                            >
                                                                                                Close
                                                                                            </button>
                                                                                            <button type="button" className="btn btn-primary">
                                                                                                Save changes
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>

                                                                        <button className="btn-primary btnprime">Edit</button>
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
                            </div>
                        </div>

                    </div>
                </div>
            </div>





        </div>
    );
};

export default Plan;
