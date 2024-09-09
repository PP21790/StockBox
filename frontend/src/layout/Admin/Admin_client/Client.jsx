import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GetClient } from '../../../Services/Admin';
import Table from '../../../components/Table';

const Client = () => {
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
        },
        {
            name: 'Email',
            selector: row => row.Email,
            sortable: true,
        },
        {
            name: 'Phone No',
            selector: row => row.PhoneNo,
            sortable: true,
        },
        {
            name: 'Active Status',
            selector: row => row.ActiveStatus === "1" ? 'Active' : 'Inactive',
            sortable: true,
        },
        {
            name: 'Created At',
            selector: row => new Date(row.createdAt).toLocaleDateString(),
            sortable: true,
        },
        {
            name: 'Updated At',
            selector: row => new Date(row.updatedAt).toLocaleDateString(),
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <div className="d-flex order-actions">
                    <button
                        className="btn-f"
                        data-bs-toggle="modal"
                        data-bs-target="#updateUserModal"
                    >
                        <i className="bx bxs-edit" />
                    </button>
                    <button className="text-danger btn-d">
                        <i className="bx bxs-trash" />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
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
