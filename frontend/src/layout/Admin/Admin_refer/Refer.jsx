import React from 'react';

const Refer = () => {
    return (
        <div>
            <div>
                <div className="page-content">
                    {/*breadcrumb*/}
                    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div className="breadcrumb-title pe-3">Refer & Earn</div>
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
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                    >
                                        <i className="bx bxs-plus-square" />
                                        Add Basket
                                    </button>
                                    {/* Modal start */}
                                    <div
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
                                                        Add Client
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
                                    </div>
                                    {/* Modal end*/}
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>S.No</th>
                                            <th>Client Name</th>
                                            <th>Purchased By</th>
                                            <th>Installed Date</th>


                                        </tr>
                                    </thead>
                                    <tbody>


                                        <tr>
                                            <td>
                                                1
                                            </td>
                                            <td>Kishor Singh</td>
                                            <td>
                                                Raj
                                            </td>
                                            <td>10/05/2024</td>


                                        </tr>
                                        <tr>
                                            <td>
                                                2
                                            </td>
                                            <td>Neha Sharma</td>
                                            <td>
                                                Raj
                                            </td>
                                            <td>10/05/2024</td>


                                        </tr>

                                        <tr>
                                            <td>
                                                3
                                            </td>
                                            <td>Kishor Singh</td>
                                            <td>
                                                Raj
                                            </td>
                                            <td>10/05/2024</td>


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

export default Refer;
