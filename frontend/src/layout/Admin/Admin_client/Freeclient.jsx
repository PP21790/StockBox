import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Table from '../../../components/Table';
import { Settings2, Eye, UserPen, Trash2, Download } from 'lucide-react';
import Swal from 'sweetalert2';
import { FreeClientList, deleteClient, UpdateClientStatus, DeleteFreeClient } from '../../../Services/Admin';
import { Tooltip } from 'antd';
import { image_baseurl } from '../../../Utils/config';


const Freeclient = () => {


    const token = localStorage.getItem('token');
    const navigate = useNavigate();


    const [clients, setClients] = useState([]);



    useEffect(() => {
        getdemoclient();

    }, []);




    const getdemoclient = async () => {
        try {
            const response = await FreeClientList(token);
            if (response.status) {
                setClients(response.data);
            }
        } catch (error) {
            console.log("error");
        }
    }

    const handleDownload = (row) => {

        const url = `${image_baseurl}uploads/pdf/${row.clientDetails.pdf}`;
        const link = document.createElement('a');
        link.href = url;
        link.download = url;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    };




    const DeleteClient = async (_id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to delete this member? This action cannot be undone.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel',
            });

            if (result.isConfirmed) {
                const response = await DeleteFreeClient(_id, token);
                if (response.status) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'The Client has been successfully deleted.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    getdemoclient();

                }
            } else {

                Swal.fire({
                    title: 'Cancelled',
                    text: 'The  deletion was cancelled.',
                    icon: 'info',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'There was an error deleting the Member.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });

        }
    };



    // // update status 

    // const handleSwitchChange = async (event, id) => {

    //     const user_active_status = event.target.checked ? "1" : "0";

    //     const data = { id: id, status: user_active_status }
    //     const result = await Swal.fire({
    //         title: "Do you want to save the changes?",
    //         showCancelButton: true,
    //         confirmButtonText: "Save",
    //         cancelButtonText: "Cancel",
    //         allowOutsideClick: false,
    //     });

    //     if (result.isConfirmed) {
    //         try {
    //             const response = await UpdateClientStatus(data, token)
    //             if (response.status) {
    //                 Swal.fire({
    //                     title: "Saved!",
    //                     icon: "success",
    //                     timer: 1000,
    //                     timerProgressBar: true,
    //                 });
    //                 setTimeout(() => {
    //                     Swal.close();
    //                 }, 1000);
    //             }
    //             getdemoclient();
    //         } catch (error) {
    //             Swal.fire(
    //                 "Error",
    //                 "There was an error processing your request.",
    //                 "error"
    //             );
    //         }
    //     } else if (result.dismiss === Swal.DismissReason.cancel) {
    //         getdemoclient();
    //     }
    // };







    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '78px',
        },
        {
            name: 'Full Name',
            selector: row => row.clientDetails.FullName,
            sortable: true,
            width: '165px',
        },
        {
            name: 'Email',
            selector: row => row.clientDetails.Email,
            sortable: true,
            width: '243px',
        },
        {
            name: 'Phone No',
            selector: row => row.clientDetails.PhoneNo,
            sortable: true,
        },
        {
            name: 'Kyc',
            selector: row => (
                row.clientDetails.kyc_verification === "1" ? (
                    <div style={{ color: "green" }}>
                        Verfied
                    </div>
                ) : (
                    <div style={{ color: "red" }}>
                        Not Verfied
                    </div>
                )
            ),
            sortable: true,
            width: '160px',
        },
        {
            name: 'Start Date',
            selector: row => row.startdate,
            sortable: true,
            width: '230px',
        },
        {
            name: 'End Start',
            selector: row => row.enddate,
            sortable: true,
            width: '230px',
        },

        // {
        //     name: 'Active Status',
        //     selector: row => (
        //         <div className="form-check form-switch form-check-info">
        //             <input
        //                 id={`rating_${row.clientDetails.ActiveStatus}`}
        //                 className="form-check-input toggleswitch"
        //                 type="checkbox"
        //                 defaultChecked={row.clientDetails.ActiveStatus == 1}
        //                 onChange={(event) => handleSwitchChange(event, row._id)}
        //             />
        //             <label
        //                 htmlFor={`rating_${row.clientDetails.ActiveStatus}`}
        //                 className="checktoggle checkbox-bg"
        //             ></label>
        //         </div>
        //     ),
        //     sortable: true,
        //     width: '165px',
        // },
        {
            name: 'CreatedAt',
            selector: row => row.clientDetails.createdAt,
            sortable: true,
            width: '220px',
        },
        {
            name: 'Actions',
            selector: (row) => (
                <>
                    <Tooltip placement="top" overlay="Kyc Agreement">

                        {row.clientDetails.kyc_verification === "1" ? <Download onClick={() => handleDownload(row)} /> : ""}

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
                <div>
                    <div className="page-content">
                        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                            <div className="breadcrumb-title pe-3">Free Trial Client</div>
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
                        <hr />
                        <div className="card">
                            <div className="card-body">
                                <div className="d-lg-flex align-items-center mb-4 gap-3">
                                    <div className="position-relative">
                                        <input
                                            type="text"
                                            className="form-control ps-5 radius-10"
                                            placeholder="Search Free Trial Client"
                                        />
                                        <span className="position-absolute top-50 product-show translate-middle-y">
                                            <i className="bx bx-search" />
                                        </span>
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

        </div>
    );
}

export default Freeclient;
