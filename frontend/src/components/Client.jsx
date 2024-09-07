import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Client = () => {
  const [clients, setClients] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {

    axios.get('http://localhost:5001/client/list', {
      headers: {
        Authorization: `${token}`,
      }
    })
      .then(response => {

        if (response.data.status) {
          setClients(response.data.data);

        } else {
          setClients([]);
        }

      })
      .catch(error => {
        console.log("There was an error fetching the client data!", error);
      });
  }, []);

  return (
    <div>
      <div>
        <div className="page-content">
          {/* breadcrumb */}
          <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div className="breadcrumb-title pe-3">Client</div>
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
          {/* end breadcrumb */}
          <div className="card">
            <div className="card-body">
              <div className="d-lg-flex align-items-center mb-4 gap-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control ps-5 radius-10"
                    placeholder="Search Order"
                  />
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
                    Add Client
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
                          <form>
                            <div className="row">
                              <div className="col-md-6">
                                <label>Name</label>
                                <input className="form-control mb-2" type="text" placeholder="Enter your name" />
                              </div>
                              <div className="col-md-6">
                                <label>Email</label>
                                <input className="form-control" type="email" placeholder="Enter your email" />
                              </div>
                              <div className="col-md-6">
                                <label>Phone</label>
                                <input className="form-control" type="number" placeholder="Enter your phone number" />
                              </div>
                              <div className="col-md-6">
                                <label>Broker</label>
                                <input className="form-control" type="text" placeholder="Enter broker" />
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
                  {/* Modal end */}
                </div>
              </div>
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>S.No</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Phone No</th>
                      <th>Active Status</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.length > 0 ? (
                      clients.map((client, index) => (
                        <tr key={client._id}>
                          <td>{index + 1}</td>
                          <td>{client.FullName}</td>
                          <td>{client.Email}</td>
                          <td>{client.PhoneNo}</td>
                          <td>{client.ActiveStatus === "1" ? 'Active' : 'Inactive'}</td>
                          <td>{new Date(client.createdAt).toLocaleDateString()}</td>
                          <td>{new Date(client.updatedAt).toLocaleDateString()}</td>
                           <td>
                                                <div className="d-flex order-actions">
                                                    <button
                                                        className="btn-f"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#updateUserModal"
                                                        
                                                    >
                                                        <i className="bx bxs-edit" />
                                                    </button>
                                                    <button
                                                        className="text-danger btn-d"
                                                        
                                                    >
                                                        <i className="bx bxs-trash" />
                                                    </button>
                                                </div>
                                            </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">No Clients Found</td>
                      </tr>
                    )}
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

export default Client;
