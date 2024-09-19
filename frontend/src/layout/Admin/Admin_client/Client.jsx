import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GetClient } from '../../../Services/Admin';
import Table from '../../../components/Table';
import { Settings2, Eye, UserPen, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { deleteClient, UpdateClientStatus } from '../../../Services/Admin';
import { Tooltip } from 'antd';

const Client = () => {


    const navigate = useNavigate();

    const [clients, setClients] = useState([]);

    const token = localStorage.getItem('token');

    const getAdminclient = async () => {
        try {
            const response = await GetClient(token);
            if (response.status) {
                setClients(response.data);
            }
        } catch (error) {
            console.log("error");
        }
    }

    useEffect(() => {
        getAdminclient();
    }, []);




    const updateClient = async (row) => {
        navigate("/admin/client/updateclient/" + row._id, { state: { row } })
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    // Function to show the modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    // Function to handle modal closing
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Form submit handler
    const onFinish = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const values = Object.fromEntries(formData.entries());
        console.log('Form values:', values);

        // Handle form submission logic here
        updateClient(row);  // Update the client based on form data if needed
        setIsModalVisible(false);
    };
    const DeleteClient = async (_id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to delete this staff member? This action cannot be undone.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel',
            });

            if (result.isConfirmed) {
                const response = await deleteClient(_id, token);
                if (response.status) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'The staff has been successfully deleted.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    getAdminclient();

                }
            } else {

                Swal.fire({
                    title: 'Cancelled',
                    text: 'The staff deletion was cancelled.',
                    icon: 'info',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'There was an error deleting the staff.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });

        }
    };



    // update status 

    const handleSwitchChange = async (event, id) => {

        const user_active_status = event.target.checked ? "1" : "0";

        const data = { id: id, status: user_active_status }
        const result = await Swal.fire({
            title: "Do you want to save the changes?",
            showCancelButton: true,
            confirmButtonText: "Save",
            cancelButtonText: "Cancel",
            allowOutsideClick: false,
        });

        if (result.isConfirmed) {
            try {
                const response = await UpdateClientStatus(data, token)
                if (response.status) {
                    Swal.fire({
                        title: "Saved!",
                        icon: "success",
                        timer: 1000,
                        timerProgressBar: true,
                    });
                    setTimeout(() => {
                        Swal.close();
                    }, 1000);
                }
                getAdminclient();
            } catch (error) {
                Swal.fire(
                    "Error",
                    "There was an error processing your request.",
                    "error"
                );
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            getAdminclient();
        }
    };





    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '70px',
        },
        {
            name: 'Full Name',
            selector: row => row.FullName,
            sortable: true,
            width: '165px',
        },
        {
            name: 'Email',
            selector: row => row.Email,
            sortable: true,
            width: '243px',
        },
        {
            name: 'Phone No',
            selector: row => row.PhoneNo,
            sortable: true,
        },

        {
            name: 'Signup Status',
            selector: row => row.Status,
            sortable: true,
            width: '165px',
        },

        {
            name: 'Active Status',
            selector: row => (
                <div className="form-check form-switch form-check-info">
                    <input
                        id={`rating_${row.ActiveStatus}`}
                        className="form-check-input toggleswitch"
                        type="checkbox"
                        defaultChecked={row.ActiveStatus == 1}
                        onChange={(event) => handleSwitchChange(event, row._id)}
                    />
                    <label
                        htmlFor={`rating_${row.ActiveStatus}`}
                        className="checktoggle checkbox-bg"
                    ></label>
                </div>
            ),
            sortable: true,
            width: '165px',
        },


        // {
        //     name: 'Created At',
        //     selector: row => new Date(row.createdAt).toLocaleDateString(),
        //     sortable: true,
        //     width: '165px',
        // },
        // {
        //     name: 'Updated At',
        //     selector: row => new Date(row.updatedAt).toLocaleDateString(),
        //     sortable: true,
        //     width: '165px',
        // },
        {
            name: 'Actions',
            cell: row => (
                <>
                    <Tooltip placement="top" overlay="Package Assign">
                        <span onClick={showModal} style={{ cursor: 'pointer' }}>
                            <Settings2 />
                        </span>
                    </Tooltip>

                    {/* Bootstrap Modal */}
                    <div
                        className={`modal fade ${isModalVisible ? 'show d-block' : ''}`}
                        style={{ backdropFilter: 'blur(1px)' }}  // Only apply blur effect to the background
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Package Assign</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={handleCancel}
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    {/* Form inside the modal */}
                                    <form onSubmit={onFinish}>
                                        <div className="mb-3">
                                            <label htmlFor="clientId" className="form-label">
                                                Service
                                            </label>
                                            <select
                                                className="default-select wide form-control"
                                                aria-describedby="basic-addon1"
                                                id="calltype"
                                                name="calltype"
                                            >
                                                <option value="">Select Service</option>
                                                <option value="buy">Stock</option>
                                                <option value="sell">Future</option>
                                                <option value="hold">Option</option>
                                            </select>

                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="clientId" className="form-label">
                                                Basket
                                            </label>
                                            <select
                                                className="default-select wide form-control"
                                                aria-describedby="basic-addon1"
                                                id="calltype"
                                                name="calltype"
                                            >
                                                <option value="">Select Type</option>
                                                <option value="buy">Buy</option>
                                                <option value="sell">Sell</option>
                                                <option value="hold">Hold</option>
                                            </select>

                                        </div>

                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                                                Close
                                            </button>
                                            <button type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Tooltip title="view">
                        <Eye onClick={() => updateClient(row)} />
                    </Tooltip>
                    <Tooltip title="Update">
                        <UserPen onClick={() => updateClient(row)} />
                    </Tooltip>
                    <Tooltip title="delete">
                        <Trash2 onClick={() => DeleteClient(row._id)} />
                    </Tooltip>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '165px',
        }
    ];

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
                                    <Link
                                        to="/admin/addclient"
                                        className="btn btn-primary"
                                    >
                                        <i
                                            className="bx bxs-plus-square"
                                            aria-hidden="true"
                                        />
                                        Add Client
                                    </Link>
                                </div>
                            </div>

                            <Table
                                columns={columns}
                                data={clients}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Client;
