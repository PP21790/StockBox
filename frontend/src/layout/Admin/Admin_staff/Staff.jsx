import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

const User = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [userData, setUserData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const token = localStorage.getItem('token');
    const User_id = localStorage.getItem('id');



    const handleSubmit = (values, { resetForm }) => {
        const requestData = {
            FullName: values.FullName,
            Email: values.Email,
            PhoneNo: values.PhoneNo,
            password: values.password,
            UserName: values.UserName,
            add_by: User_id,
        };

        axios.post('http://localhost:5001/user/add', requestData)
            .then(response => {
                if (response.status === 200) { // Checking for a successful status code
                    swal({
                        title: "Success!",
                        text: "User added successfully!",
                        icon: "success",
                        timer: "1500",
                        button: "OK",
                    }).then(() => {
                        resetForm();
                        fetchUserList(); // Assuming this updates your user list
                        const modalElement = document.getElementById('addUserModal');
                        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
                        modalInstance.hide();
                    });
                } else {
                    swal({
                        title: "Error!",
                        text: response.data.error || "Something went wrong!",
                        icon: "error",
                        timer: "1500",

                        button: "OK",
                    }).then(() => {
                        resetForm();
                        fetchUserList();
                        const modalElement = document.getElementById('addUserModal');
                        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
                        modalInstance.hide();
                    });
                }
            })
            .catch(error => {
                console.error('There was an error adding the user!', error);
                swal({
                    title: "Error!",
                    text: "There was an error adding the user. Please try again.",
                    icon: "error",
                    timer: "1500",

                    button: "OK",
                });
            });
    };

    useEffect(() => {
        fetchUserList();
    }, [token]);

    const fetchUserList = () => {
        axios.get('http://localhost:5001/user/list', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
            .then(response => {
                setUserData(response.data.data);
            })
            .catch(error => {
                console.log('There was an error fetching the data:', error);
            });
    };


    const handleUpdate = (values, { resetForm }) => {
        swal({
            title: "Are you sure?",
            text: "You are about to update this user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                const requestData = {
                    FullName: values.FullName,
                    Email: values.Email,
                    PhoneNo: values.PhoneNo,
                    password: values.password,
                    id: selectedUser._id, // Use dynamic ID
                };

                axios.put('http://localhost:5001/user/update', requestData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    }
                })
                    .then(response => {
                        swal("User updated successfully!", {
                            icon: "success",
                        });
                        resetForm();

                        // Close the modal
                        const modalElement = document.getElementById('updateUserModal');
                        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
                        modalInstance.hide();
                    })
                    .catch(error => {
                        swal("Error updating user!", error.message, "error");
                    });
            }
        });
    };



    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.get(`http://localhost:5001/user/delete/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    }
                })
                    .then(response => {
                        swal("User deleted successfully!", {
                            icon: "success",
                        });
                        fetchUserList(); // Refetch the user list after deletion
                    })
                    .catch(error => {
                        swal("Error deleting user!", error.message, "error");
                    });
            }
        });
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        const modalElement = document.getElementById('updateUserModal');
        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
        modalInstance.show();
    };

    if (!userData) return <div>Loading...</div>;

    return (
        <div>
            <div className="page-content">
                {/* Breadcrumb */}
                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Staff</div>
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
                {/* End Breadcrumb */}
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
                                    data-bs-target="#addUserModal"
                                >
                                    <i className="bx bxs-plus-square" />
                                    Add New Staff
                                </button>
                                {/* Modal for Adding User */}
                                <div
                                    className="modal fade"
                                    id="addUserModal"
                                    tabIndex={-1}
                                    aria-labelledby="addUserModalLabel"
                                    aria-hidden="true"
                                >
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="addUserModalLabel">
                                                    Add Staff
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
                                {/* Modal for Updating User */}
                                <div
                                    className="modal fade"
                                    id="updateUserModal"
                                    tabIndex={-1}
                                    aria-labelledby="updateUserModalLabel"
                                    aria-hidden="true"
                                >
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="updateUserModalLabel">
                                                    Update User
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
                                                    enableReinitialize
                                                    initialValues={{
                                                        FullName: selectedUser ? selectedUser.FullName : '',
                                                        Email: selectedUser ? selectedUser.Email : '',
                                                        PhoneNo: selectedUser ? selectedUser.PhoneNo : '',
                                                        password: selectedUser ? selectedUser.password : '',
                                                        UserName: selectedUser ? selectedUser.UserName : '',
                                                    }}
                                                    onSubmit={handleUpdate}
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
                                                                    {isSubmitting ? 'Updating...' : 'Update'}
                                                                </button>
                                                            </div>
                                                        </Form>
                                                    )}
                                                </Formik>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                        <th>Username</th>

                                        <th>Actions</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userData.map((data, index) => (
                                        <tr key={data._id}>
                                            <td>{index + 1}</td>
                                            <td>{data.FullName}</td>
                                            <td>{data.Email}</td>
                                            <td>{data.PhoneNo}</td>
                                            <td>{data.UserName}</td>
                                            <td>
                                                <div className="d-flex order-actions">
                                                    <button
                                                        className="btn-f"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#updateUserModal"
                                                        onClick={() => handleEditClick(data)}
                                                    >
                                                        <i className="bx bxs-edit" />
                                                    </button>
                                                    <button
                                                        className="text-danger btn-d"
                                                        onClick={() => handleDelete(data._id)}
                                                    >
                                                        <i className="bx bxs-trash" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;
