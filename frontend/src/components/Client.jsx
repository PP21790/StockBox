import React from 'react'
import { Formik } from 'formik';
import { useEffect } from 'react';

const Client = () => {
    return (
    <div>
      <div className="page-content">
        {/*breadcrumb*/}
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Clients</div>
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
                  Add New Client
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
                    <th>Name</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>View Details</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      1
                    </td>
                    <td>Gaspur Antunes</td>
                    <td>
                      <div className="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3">
                        <i className="bx bxs-circle me-1" />
                        FulFilled
                      </div>
                    </td>
                    <td>$485.20</td>
                    <td>June 10, 2020</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm radius-10 px-4"
                      >
                        View Details
                      </button>
                    </td>
                    <td>
                      <div className="d-flex order-actions">
                        <a href="javascript:;" className="">
                          <i className="bx bxs-edit" />
                        </a>
                        <a href="javascript:;" className="ms-3">
                          <i className="bx bxs-trash" />
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      2
                    </td>
                    <td>Gaspur Antunes</td>
                    <td>
                      <div className="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3">
                        <i className="bx bxs-circle me-1" />
                        FulFilled
                      </div>
                    </td>
                    <td>$650.30</td>
                    <td>June 12, 2020</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm radius-10 px-4"
                      >
                        View Details
                      </button>
                    </td>
                    <td>
                      <div className="d-flex order-actions">
                        <a href="javascript:;" className="">
                          <i className="bx bxs-edit" />
                        </a>
                        <a href="javascript:;" className="ms-3">
                          <i className="bx bxs-trash" />
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      3
                    </td>
                    <td>Gaspur Antunes</td>
                    <td>
                      <div className="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3">
                        <i className="bx bxs-circle me-1" />
                        FulFilled
                      </div>
                    </td>
                    <td>$159.45</td>
                    <td>June 14, 2020</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm radius-10 px-4"
                      >
                        View Details
                      </button>
                    </td>
                    <td>
                      <div className="d-flex order-actions">
                        <a href="javascript:;" className="">
                          <i className="bx bxs-edit" />
                        </a>
                        <a href="javascript:;" className="ms-3">
                          <i className="bx bxs-trash" />
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      4
                    </td>
                    <td>Gaspur Antunes</td>
                    <td>
                      <div className="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3">
                        <i className="bx bxs-circle align-middle me-1" />
                        FulFilled
                      </div>
                    </td>
                    <td>$968.40</td>
                    <td>June 16, 2020</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm radius-10 px-4"
                      >
                        View Details
                      </button>
                    </td>
                    <td>
                      <div className="d-flex order-actions">
                        <a href="javascript:;" className="">
                          <i className="bx bxs-edit" />
                        </a>
                        <a href="javascript:;" className="ms-3">
                          <i className="bx bxs-trash" />
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      5
                    </td>
                    <td>Gaspur Antunes</td>
                    <td>
                      <div className="badge rounded-pill text-info bg-light-info p-2 text-uppercase px-3">
                        <i className="bx bxs-circle align-middle me-1" />
                        Confirmed
                      </div>
                    </td>
                    <td>$689.50</td>
                    <td>June 18, 2020</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm radius-10 px-4"
                      >
                        View Details
                      </button>
                    </td>
                    <td>
                      <div className="d-flex order-actions">
                        <a href="javascript:;" className="">
                          <i className="bx bxs-edit" />
                        </a>
                        <a href="javascript:;" className="ms-3">
                          <i className="bx bxs-trash" />
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      6
                    </td>
                    <td>Gaspur Antunes</td>
                    <td>
                      <div className="badge rounded-pill text-info bg-light-info p-2 text-uppercase px-3">
                        <i className="bx bxs-circle align-middle me-1" />
                        Confirmed
                      </div>
                    </td>
                    <td>$478.60</td>
                    <td>June 20, 2020</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm radius-10 px-4"
                      >
                        View Details
                      </button>
                    </td>
                    <td>
                      <div className="d-flex order-actions">
                        <a href="javascript:;" className="">
                          <i className="bx bxs-edit" />
                        </a>
                        <a href="javascript:;" className="ms-3">
                          <i className="bx bxs-trash" />
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Client
