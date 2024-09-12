import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GetClient } from '../../../Services/Admin';
import Table from '../../../components/Table';
import { Eye, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { GetSignallist, DeleteSignal, SignalCloseApi } from '../../../Services/Admin';

const Signal = () => {


    const navigate = useNavigate();

    const [clients, setClients] = useState([]);

    const [model, setModel] = useState(false);
    const [serviceid, setServiceid] = useState({});

    const [closedata, setClosedata] = useState({
        id: "",
        closeprice: "",
        close_status: "",
        close_description: ""
    })



    const token = localStorage.getItem('token');



    const getAllSignal = async () => {
        try {
            const response = await GetSignallist(token);
            if (response.status) {
                setClients(response.data);
            }
        } catch (error) {
            console.log("error");
        }
    }

    useEffect(() => {
        getAllSignal();
    }, []);




    const Signaldetail = async (_id) => {
        navigate(`signaldetaile/${_id}`)
    }


    const DeleteSignals = async (_id) => {
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
                const response = await DeleteSignal(_id, token);
                if (response.status) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'The staff has been successfully deleted.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    getAllSignal();

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




    // close signal

    const closeSignalperUser = async () => {
        try {
            if(!closedata.closeprice || !closedata.close_description){
                Swal.fire({
                    title: 'Alert',
                    text: 'Please fill in all required fields',
                    icon: 'warning', 
                    confirmButtonText: 'OK',
                    timer: 2000,
                });
                return; 
            }

            const data = { id: serviceid._id, closeprice: closedata.closeprice, close_status: "false", close_description: closedata.close_description };
            const response = await SignalCloseApi(data, token);

            if (response && response.status) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Signal Close Sucessfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                });

                setClosedata({ closeprice: "", close_description: "" });
                getAllSignal();
                setModel(!model)

            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error  close signal.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch (error) {

            Swal.fire({
                title: 'Error!',
                text: 'There was an error updating the service.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
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
            name: 'Call Duration',
            selector: row => row.callduration,
            sortable: true,
        },
        {
            name: 'Type',
            selector: row => row.calltype,
            sortable: true,
        },
        {
            name: 'Rate',
            selector: row => row.price,
            sortable: true,
        },
        {
            name: 'Stoploss',
            selector: row => row.stoploss,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.close_status === true ? 'On' : 'Off',
            sortable: true,
            cell: row => (
                <span style={{ color: row.close_status === true ? 'blue' : 'red' }}>
                    {row.close_status === true ? 'On' : 'Off'}
                </span>
            ),
        },
        {
            name: 'Updated At',
            selector: row => new Date(row.updated_at).toLocaleDateString(),
            sortable: true,
        },

        {
            name: 'Actions',
            cell: row => (
                <>
                    <div>
                        <Eye onClick={() => Signaldetail(row._id)} />
                    </div>
                    <div>
                        <Trash2 onClick={() => DeleteSignals(row._id)} />
                    </div>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },

        {
            name: 'Status',
            cell: row => (
                <>
                    <button className='btn btn-danger'
                        onClick={() => { setModel(true); setServiceid(row); }}
                    >
                        close
                    </button>

                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        // {
        //     name: 'Actions',
        //     cell: row => (
        //         <>
        //         <div>
        //          <Pencil onClick={() => updateClient(row)} />
        //         </div>
        //        <div>
        //        <Trash2 onClick={() => DeleteClient(row._id)} />
        //        </div>
        //        </>
        //     ),
        //     ignoreRowClick: true,
        //     allowOverflow: true,
        //     button: true,
        // }
    ];



    return (
        <div>
            <div>
                <div className="page-content">
                    {/* breadcrumb */}
                    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div className="breadcrumb-title pe-3">Signal</div>
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
                                        to="/admin/addsignal"
                                        className="btn btn-primary"
                                    >
                                        <i
                                            className="bx bxs-plus-square"
                                            aria-hidden="true"
                                        />
                                        Add Signal
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
            {model && (
                <div
                    className="modal fade show"
                    style={{ display: 'block' }}
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Update Service
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setModel(false)}
                                />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label htmlFor="">Closeprice</label>
                                            <input
                                                className="form-control mb-2"
                                                type="number"
                                                placeholder='Enter Service Title'
                                                value={closedata.closeprice}
                                                onChange={(e) => setClosedata({ ...closedata, closeprice: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="">Description</label>
                                            <textarea
                                                className='form-control'
                                                rows={2.5}
                                                cols={72}
                                                name="comment"
                                                form="usrform"
                                                defaultValue={"Enter Description here..."}
                                                value={closedata.close_description}
                                                onChange={(e) => setClosedata({ ...closedata, close_description: e.target.value })}
                                            />

                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setModel(false)}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={closeSignalperUser}
                                >
                                    Update Service
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Signal;
