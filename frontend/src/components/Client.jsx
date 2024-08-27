import React from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';

const Client = () => {
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (values, { resetForm }) => {
    const requestData = {
      FullName: values.FullName,
      Email: values.Email,
      PhoneNo: values.PhoneNo,
      Password: values.Password,
      UserName: values.UserName,
      add_by: "66bc8b0c3fb6f1724c02bfec", // Replace this with the actual user ID from your login
    };

    axios.post('http://localhost:5001/user/add', requestData)
      .then(response => {
        setSuccessMessage('Client added successfully!');
        resetForm();
      })
      .catch(error => {
        console.error('There was an error adding the client!', error);
      });
  };

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
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        <Formik
                          initialValues={{
                            FullName: '',
                            Email: '',
                            PhoneNo: '',
                            Password: '',
                            UserName: '',
                          }}
                          onSubmit={handleSubmit}
                        >
                          {({ isSubmitting }) => (
                            <Form>
                              <div className="row">
                                <div className="col-md-6">
                                  <label htmlFor="FullName">Full Name</label>
                                  <Field className="form-control mb-2" name="FullName" placeholder="Enter your name" />
                                </div>
                                <div className="col-md-6">
                                  <label htmlFor="Email">Email</label>
                                  <Field className="form-control" type="email" name="Email" placeholder="Enter your email" />
                                </div>
                                <div className="col-md-6">
                                  <label htmlFor="PhoneNo">Phone No</label>
                                  <Field className="form-control" name="PhoneNo" placeholder="Enter your phone no" />
                                </div>
                                <div className="col-md-6">
                                  <label htmlFor="Password">Password</label>
                                  <Field className="form-control" type="password" name="Password" placeholder="Enter your password" />
                                </div>
                                <div className="col-md-6">
                                  <label htmlFor="UserName">Username</label>
                                  <Field className="form-control" name="UserName" placeholder="Enter your username" />
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ? 'Adding...' : 'Add'}
                                </button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Modal end */}
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
                    <td>1</td>
                    <td>Gaspur Antunes</td>
                    <td>
                      <div className="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3">
                        <i className="bx bxs-circle me-1" />
                        Fulfilled
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Client;
