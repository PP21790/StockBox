import React from 'react';
import { Link } from 'react-router-dom';

const Kyc = () => {
    return (
        <div>
            <div className="page-content">
                {/*breadcrumb*/}
                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Kyc/Document</div>
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
                {/*end breadcrumb*/}
                <div className="card">
                    <div className="card-body">
                        <div className="d-lg-flex align-items-center mb-4 gap-3">
                            <div className="position-relative">
                                <input
                                    type="text"
                                    className="form-control ps-5 radius-10"
                                    placeholder="Search Order"
                                />{" "}
                                <span className="position-absolute top-50 product-show translate-middle-y">
                                    <i className="bx bx-search" />
                                </span>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="">Full Name</label>
                                <input className="form-control mb-2" type="text" placeholder='enter your name' />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Email</label>
                                <input className="form-control" type="email" placeholder='enter your mail' />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Phone No</label>
                                <input className="form-control" type="number" placeholder='enter your Phone no ' />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Selelct Service</label>
                                <select className="form-select mb-3" aria-label="Default select example">
                                    <option selected="">Selelct Service</option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </select>

                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">DOB</label>
                                <input className="form-control" type="date" placeholder='enter your City/State' />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Date and Time</label>
                                <input className="form-control mb-3" type="datetime-local" placeholder='enter your password' />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor=""> KYC Document(PDF)</label>
                                <input className="form-control" type="text" placeholder='enter your City/State' />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Agreement Document(PDF)</label>
                                <input className="form-control mb-3" type="password" placeholder='enter your password' />
                            </div>

                            <div className="col-md-12">
                                <div className="d-md-flex d-grid align-items-center gap-3">
                                    <button type="submit" className="btn btn-primary px-4">
                                        Submit
                                    </button>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Kyc;