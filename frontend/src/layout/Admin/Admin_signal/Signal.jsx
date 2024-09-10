import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Signal = () => {

    return (
        <div>
            <div>
                <div className="page-content">
                    {/*breadcrumb*/}
                    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div className="breadcrumb-title pe-3">Signal</div>
                        <div className="ps-3">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0 p-0">
                                    <li className="breadcrumb-item">
                                        <a href="javascript:;">
                                            <i className="bx bx-home-alt" />
                                        </a>
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
                                <div className="ms-auto">
                                    <Link
                                        to="/admin/addsignal" className="btn btn-primary"

                                    >
                                        <i className="bx bxs-plus-square" />
                                        Add Signal
                                    </Link>
                                    {/* Modal start */}
                                    {/* <div
                                        className="modal fade"
                                        id="exampleModal"
                                        tabIndex={-1}
                                        aria-labelledby="exampleModalLabel"
                                        aria-hidden="true"
                                    >
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">
                                                        Add Signal
                                                    </h5>
                                                    <button
                                                        type="button"
                                                        className="btn-close"
                                                        data-bs-dismiss="modal"
                                                        aria-label="Close"
                                                    />
                                                </div>
                                                <div className="modal-body">
                                                    <form action="">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label htmlFor="">Name</label>
                                                                <input className="form-control mb-2" type="text" placeholder='enter your name' />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="">Email</label>
                                                                <input className="form-control" type="email" placeholder='enter your mail' />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="">Phone</label>
                                                                <input className="form-control" type="number" placeholder='enter your Phone no ' />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="">Broker</label>
                                                                <input className="form-control" type="text" placeholder='enter broker' />
                                                            </div>

                                                        </div>
                                                    </form>
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
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* Modal end*/}
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>S.No</th>
                                            <th>Service name</th>
                                            <th>stock name</th>
                                            <th>Buy/Sell </th>
                                            <th>Rate</th>
                                            <th>Target</th>
                                            <th>Stoploss</th>
                                            <th>Date</th>
                                            <th>Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                1
                                            </td>
                                            <td>xyz</td>
                                            <td>
                                                abx
                                            </td>
                                            <td>sell</td>
                                            <td>20%</td>
                                            <td>TGT-1</td>
                                            <td>June 10, 2020</td>
                                            <td>June 10, 2020</td>

                                            <td>
                                                <button className='btn btn-danger'>
                                                    Closed
                                                </button>
                                            </td>


                                        </tr>
                                        <tr>
                                            <td>
                                                2
                                            </td>
                                            <td>xyz</td>
                                            <td>
                                                abx
                                            </td>
                                            <td>sell</td>
                                            <td>20%</td>
                                            <td>TGT-3</td>
                                            <td>June 10, 2020</td>
                                            <td>June 10, 2020</td>
                                            <td>
                                                <button className='btn btn-danger'>
                                                    Closed
                                                </button>
                                            </td>



                                        </tr>
                                        <tr>
                                            <td>
                                                3
                                            </td>
                                            <td>xyz</td>
                                            <td>
                                                abx
                                            </td>
                                            <td>sell</td>
                                            <td>20%</td>
                                            <td>TGT-1</td>
                                            <td>June 10, 2020</td>
                                            <td>June 10, 2020</td>
                                            <td>
                                                <button className='btn btn-danger'>
                                                    Closed
                                                </button>
                                            </td>



                                        </tr>
                                        <tr>
                                            <td>
                                                4
                                            </td>
                                            <td>xyz</td>
                                            <td>
                                                abx
                                            </td>
                                            <td>sell</td>
                                            <td>20%</td>
                                            <td>TGT-2</td>
                                            <td>June 10, 2020</td>
                                            <td>June 10, 2020</td>
                                            <td>
                                                <button className='btn btn-danger'>
                                                    Closed
                                                </button>
                                            </td>


                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Signal;
