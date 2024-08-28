import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { Spinner } from 'react-bootstrap';


const Client = () => {
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (values, { resetForm }) => {
    const requestData = {
      FullName: values.FullName,
      Email: values.Email,
      PhoneNo: values.PhoneNo,
      password: values.password,
      UserName: values.UserName,
      add_by: "66bc8b0c3fb6f1724c02bfec", // Replace this with the actual user ID from your login
    };

    axios.post('http://localhost:5001/user/add', requestData)
      .then(response => {
        setSuccessMessage('Client added successfully!');
        resetForm();

        // Close the modal after success
        const modalElement = document.getElementById('exampleModal');
        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();

        // Hide the success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 10000);
      })
      .catch(error => {
        console.error('There was an error adding the client!', error);
      });
  };
  const [data, setData] = useState([]);
  console.log(data)
  const [loading, setLoading] = useState(true);
  // const res = await axios.get(`${Config.base_url}Last_Pattern`,
  //   {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     }
  //   }
  // )

  const fetchData = async () => {
    const token = localStorage.getItem("token")
    try {
      const response = await axios.get('http://localhost:5001/user/list',
        {
          headers: {
            '': ', ',
            'Authorization': '2a05cfe1cbb974533e35'
          },
          }

      )
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                  Add client
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
                          Add User
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
                                  <Field className="form-control mb-2" name="PhoneNo" placeholder="Enter your phone no" />
                                </div>
                                <div className="col-md-6">
                                  <label htmlFor="Password">Password</label>
                                  <Field className="form-control" type="password" name="password" placeholder="Enter your password" />
                                </div>
                                <div className="col-md-6">
                                  <label htmlFor="UserName">Username</label>
                                  <Field className="form-control mb-2" name="UserName" placeholder="Enter your username" />
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
              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                  <Spinner animation="border" />
                </div>
              ) : (
                <table className="table mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>S.No</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Phone No</th>
                      <th>Username</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.FullName}</td>
                        <td>{item.Email}</td>
                        <td>{item.PhoneNo}</td>
                        <td>{item.UserName}</td>
                        <td>
                          <div className="d-flex order-actions">
                            <a href="javascript:;" className="me-3">
                              <i className="bx bxs-edit" />
                            </a>
                            <a href="javascript:;" className="text-danger">
                              <i className="bx bxs-trash" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Client;
