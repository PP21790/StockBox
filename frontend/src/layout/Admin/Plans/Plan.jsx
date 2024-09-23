import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getplanlist, getcategoryplan } from '../../../Services/Admin';

const colors = ['bg-danger', 'bg-primary', 'bg-success', 'bg-info', 'bg-warning'];

const Plan = () => {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [category, setCategory] = useState([]);

    const token = localStorage.getItem('token');



    const getcategoryplanlist = async () => {
        try {
            const response = await getcategoryplan(token);
            if (response.status) {
                setCategory(response.data);
            }
        } catch (error) {
            console.log("error");
        }
    }

   
  




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
        getcategoryplanlist();
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
                        {category.map((category, index) => (
                            <li className="nav-item" role="presentation" key={category.id}>
                                <a
                                    className={`nav-link ${index === 0 ? 'active' : ''}`}
                                    data-bs-toggle="tab"
                                    href={`#${category.id}`}
                                    role="tab"
                                    aria-selected={index === 0}
                                    tabIndex={index === 0 ? 0 : -1}
                                >
                                    <div className="d-flex align-items-center">
                                        <div className="tab-icon">
                                            <i className={`bx ${category.icon} font-18 me-1`} />
                                        </div>
                                        <div className="tab-title">{category.title}</div>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>


                    <div className="tab-content py-3">
                        <div
                            className="tab-pane fade active show"
                            id="primaryhome"
                            role="tabpanel"
                        >

                            <div className="pricing-section mt-5">

                                <div className="card-container">
                                  

                                    <div className='row'>
                                        <div className="col-md-6 mb-3">

                                            <div className="pricing-card highlight-card">

                                                <div className="offer-tag">Limited Time Offer</div>
                                                <div className='row justify-content-end mb-3'>
                                                    <div className='col-md-6 d-flex justify-content-end'>
                                            
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
                        
                       


                    </div>


                </div>

            </div>





        </div>
    );
};

export default Plan;
