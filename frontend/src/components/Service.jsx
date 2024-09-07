import React, { useState } from 'react';
import swal from 'sweetalert';

const Service = () => {
  const [title, setTitle] = useState('');
  const token = localStorage.getItem('token');


  const handleAddService = async () => {
    try {
      const response = await fetch('https://api.example.com/add-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({ title }), // Send the title in the request body
      });

      if (response.ok) {
        // Assuming the API response returns a JSON object
        const result = await response.json();

        console.log(result);


        swal({
          title: 'Success!',
          text: 'Service added successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        // Clear the input field after successful addition
        setTitle('');
      } else {
        throw new Error('Failed to add service');
      }
    } catch (error) {
      swal({
        title: 'Error!',
        text: 'There was an error adding the service.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  return (
    <div>
      <div className="page-content">
        {/*breadcrumb*/}
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Service</div>
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
                  Add services
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
                            <div className="col-md-12">
                              <label htmlFor="serviceTitle">Title</label>
                              <input
                                id="serviceTitle"
                                className="form-control mb-2"
                                type="text"
                                placeholder="Enter your title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} // Update title state
                              />
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
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleAddService}  // Call function on button click
                          data-bs-dismiss="modal"  // Close modal after click
                        >
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
                  {/* Table data */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
