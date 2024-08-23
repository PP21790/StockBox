import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Spinner } from 'react-bootstrap'; // You can use any spinner or loader component
import { Link } from 'react-router-dom';

const Signal = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Body',
            selector: row => row.body,
            sortable: true,
        },
    ];

    return (
        <div>

            <div className="page-content">
                {/*breadcrumb*/}
                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Signal History</div>
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
                                                            <label htmlFor="">Full Name</label>
                                                            <input className="form-control mb-2" type="text" placeholder='enter your name' />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor="">Email</label>
                                                            <input className="form-control" type="email" placeholder='enter your mail' />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor="">Phone No</label>
                                                            <input className="form-control" type="number" placeholder='enter your Phone no ' />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor="">Selelct Service</label>
                                                            <select className="form-select mb-3" aria-label="Default select example">
                                                                <option selected="">Selelct Service</option>
                                                                <option value={1}>One</option>
                                                                <option value={2}>Two</option>
                                                                <option value={3}>Three</option>
                                                            </select>

                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor=""> City/State</label>
                                                            <input className="form-control" type="text" placeholder='enter your City/State' />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor="">Password</label>
                                                            <input className="form-control" type="password" placeholder='enter your password' />
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
                        <div style={{ padding: '20px' }}>
                            {loading ? (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                    <Spinner animation="border" />
                                </div>
                            ) : (
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    pagination
                                    highlightOnHover
                                    responsive
                                    striped
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Signal;
