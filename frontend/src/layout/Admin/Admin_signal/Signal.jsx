import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GetClient } from '../../../Services/Admin';
import Table from '../../../components/Table';
import { Eye, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { GetSignallist, DeleteSignal, SignalCloseApi } from '../../../Services/Admin';


const Signal = () => {


    const [checkedIndex, setCheckedIndex] = useState(null);

    const handleTabChange = (index) => {
        setCheckedIndex(index); // Update the checked tab index
    };


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


    // const updateClient= async(row)=>{
    //     navigate("/admin/client/updateclient/" + row._id ,{ state: { row } })
    // }


    // const DeleteClient = async (_id) => {
    //     try {
    //         const result = await Swal.fire({
    //             title: 'Are you sure?',
    //             text: 'Do you want to delete this staff member? This action cannot be undone.',
    //             icon: 'warning',
    //             showCancelButton: true,
    //             confirmButtonText: 'Yes, delete it!',
    //             cancelButtonText: 'No, cancel',
    //         });

    //         if (result.isConfirmed) {
    //             const response = await deleteClient(_id,token);
    //             if (response.status) {
    //                 Swal.fire({
    //                     title: 'Deleted!',
    //                     text: 'The staff has been successfully deleted.',
    //                     icon: 'success',
    //                     confirmButtonText: 'OK',
    //                 });
    //                 getAdminclient();

    //             }
    //         } else {

    //             Swal.fire({
    //                 title: 'Cancelled',
    //                 text: 'The staff deletion was cancelled.',
    //                 icon: 'info',
    //                 confirmButtonText: 'OK',
    //             });
    //         }
    //     } catch (error) {
    //         Swal.fire({
    //             title: 'Error!',
    //             text: 'There was an error deleting the staff.',
    //             icon: 'error',
    //             confirmButtonText: 'Try Again',
    //         });

    //     }
    // };




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
            if (!closedata.closeprice || !closedata.close_description) {
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
            name: 'Signal Time',
            selector: row => row.callduration,
            sortable: true,
            width: '132px',
        },
        {
            name: 'Symbol',
            selector: row => row.calltype,
            sortable: true,
            width: '132px',
        },
        {
            name: 'Entry Type',
            selector: row => row.price,
            sortable: true,
            width: '132px',
        },
        {
            name: 'Entry Price',
            selector: row => row.stoploss,
            sortable: true,
            width: '132px',
        },
        {
            name: 'Exit Price',
            selector: row => row.stoploss,
            sortable: true,
            width: '132px',
        },
        {
            name: 'Exit status',
            selector: row => row.stoploss,
            sortable: true,
            width: '132px',
        },
        // {
        //     name: 'Status',
        //     selector: row => row.close_status === true ? 'On' : 'Off',
        //     sortable: true,
        //     cell: row => (
        //         <span style={{ color: row.close_status === true ? 'blue' : 'red' }}>
        //             {row.close_status === true ? 'On' : 'Off'}
        //         </span>
        //     ),
        // },
        // {
        //     name: 'Updated At',
        //     selector: row => new Date(row.updated_at).toLocaleDateString(),
        //     sortable: true,
        // },

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
                    <button className='btn btn-danger btnclose'
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
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Close Signal
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setModel(false)}
                                />
                            </div>
                            <div className="modal-body">
                                <div className='card '>
                                    <div className='d-flex justify-content-between align-items-center card-body'>
                                        {['Fully Closed', 'Partially Closed', 'SL Hit', 'Closed Signal'].map((tab, index) => (
                                            <label key={index} className='labelfont'>
                                                <input
                                                    type="radio"
                                                    name="tab"
                                                    checked={checkedIndex === index}
                                                    onChange={() => handleTabChange(index)}
                                                />
                                                <span className='ps-2'>{tab}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                {/* Conditional Form Rendering for Each Tab */}
                                <div className='card'>
                                    {checkedIndex === 0 && (
                                        <form className='card-body'>

                                            <p>
                                                Target 1 : 

                                            </p>

                                            <p>
                                                Target 2 :

                                            </p>

                                            <p>
                                                Target 3 :

                                            </p>

                                            <div className="col-md-12">
                                                <label htmlFor="input11" className="form-label">
                                                    Remark
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    id="input11"
                                                    placeholder="Remark ..."
                                                    rows={3}
                                                    defaultValue={""}
                                                />
                                            </div>

                                            <button type="submit" className='btn btn-danger mt-2'>Submit</button>
                                        </form>
                                    )}

                                    {checkedIndex === 1 && (
                                        <form className='card-body'>

                                            <div className="col-md-12">
                                                <div className="form-check mb-2">
                                                    <input className="form-check-input" type="checkbox" id="input12" />
                                                    <label className="form-check-label" htmlFor="input12">
                                                        Target 1
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input className="form-control" type="text" id="input12" />

                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-check mb-2">
                                                    <input className="form-check-input" type="checkbox" id="input12" />
                                                    <label className="form-check-label" htmlFor="input12">
                                                        Target 2
                                                    </label>
                                                </div>

                                                <div className="form-check mb-2">
                                                    <input className="form-control" type="text" id="input12" />

                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-check mb-2">
                                                    <input className="form-check-input" type="checkbox" id="input12" />
                                                    <label className="form-check-label" htmlFor="input12">
                                                        Target 3
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input className="form-control" type="text" id="input12" />

                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-check mb-2">
                                                    <input className="form-check-input" type="checkbox" id="input12" />
                                                    <label className="form-check-label" htmlFor="input12">
                                                        close
                                                    </label>
                                                </div>

                                            </div>

                                            <div className="col-md-12">
                                                <label className='mb-1'>Remark</label>
                                                <textarea
                                                    className="form-control"
                                                    id="input11"
                                                    placeholder="Remark ..."
                                                    rows={2}
                                                    defaultValue={""}
                                                />
                                            </div>

                                            <button type="submit" className='btn btn-danger mt-2'>Submit</button>
                                        </form>
                                    )}

                                    {checkedIndex === 2 && (
                                        <form className='card-body'>

                                            <div className="col-md-12">

                                                <p>
                                                    Stoploss: qff
                                                </p>


                                            </div>


                                            <div className="col-md-12">
                                                <label className='mb-1'>Remark</label>
                                                <textarea
                                                    className="form-control"
                                                    id="input11"
                                                    placeholder="Remark ..."
                                                    rows={2}
                                                    defaultValue={""}
                                                />
                                            </div>

                                            <button type="submit" className='btn btn-danger mt-2'>Submit</button>
                                        </form>
                                    )}

                                    {checkedIndex === 3 && (
                                        <form className='card-body'>

                                            <div className="col-md-12  mb-2">

                                                <label>Exit price</label>
                                                <input className="form-control" type="text" />


                                            </div>


                                            <div className="col-md-12">
                                                <label className='mb-1'>Remark</label>
                                                <textarea
                                                    className="form-control"
                                                    id="input11"
                                                    placeholder="Remark ..."
                                                    rows={2}
                                                    defaultValue={""}
                                                />
                                            </div>

                                            <button type="submit" className='btn btn-danger mt-2'>Submit</button>
                                        </form>
                                    )}
                                </div>



                            </div>
                            {/* <div className="modal-footer">
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
                                    Update Signal
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            )}


            
        </div>
    );
}

export default Signal;
