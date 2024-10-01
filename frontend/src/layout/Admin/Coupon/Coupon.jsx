import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getcouponlist } from '../../../Services/Admin';
import Table from '../../../components/Table';
import { Pencil, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { DeleteCoupon, UpdateClientStatus } from '../../../Services/Admin';
import { image_baseurl } from '../../../Utils/config';
import { Tooltip } from 'antd';

const Coupon = () => {


    const navigate = useNavigate();

    const [clients, setClients] = useState([]);

    const token = localStorage.getItem('token');

    const getcoupon = async () => {
        try {
            const response = await getcouponlist(token);
            if (response.status) {
                setClients(response.data);
            }
        } catch (error) {
            console.log("error");
        }
    }

    useEffect(() => {
        getcoupon();
    }, []);




    const updatecoupon = async (row) => {
        navigate("/admin/coupon/updatecoupon/" + row._id, { state: { row } })
    }


    const DeleteCouponbyadmin = async (_id) => {
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
                const response = await DeleteCoupon(_id, token);
                if (response.status) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'The staff has been successfully deleted.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    getcoupon();

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
                getcoupon();
            } catch (error) {
                Swal.fire(
                    "Error",
                    "There was an error processing your request.",
                    "error"
                );
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            getcoupon();
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
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Code',
            selector: row => row.code,
            sortable: true,

        },
        {
            name: 'Image',
            cell: row => <img src={`${image_baseurl}/uploads/coupon/${row.image}`} alt="Image" width="50" height="50" />,
            sortable: true,
        },
        {
            name: 'Min Purchase Value',
            selector: row => row.minpurchasevalue,
            sortable: true,
            width: '188px',
        },
        {
            name: 'Min Coupon Value',
            selector: row => row.mincouponvalue,
            sortable: true,
            width: '180px',
        },

        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
            width: '180px',
        },
        {
            name: 'Type',
            selector: row => row.type,
            sortable: true,
            width: '115px',
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
            width: '142px',
        },


        {
            name: 'Startdate',
            selector: row => new Date(row.startdate).toLocaleDateString(),
            sortable: true,
            width: '142px',
        },
        {
            name: 'Enddate',
            selector: row => new Date(row.enddate).toLocaleDateString(),
            sortable: true,
            width: '142px',
        },
        {
            name: 'Date',
            selector: row => new Date(row.enddate).toLocaleDateString(),
            sortable: true,
            width: '142px',
        },
        {
            name: 'Actions',
            cell: row => (
                <>
                    <div>
                        <Tooltip placement="top" overlay="Edit">
                            <Pencil onClick={() => updatecoupon(row)} />
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip placement="top" overlay="Delete">
                            <Trash2 onClick={() => DeleteCouponbyadmin(row._id)} />
                        </Tooltip>
                    </div>
                </>
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
                        <div className="breadcrumb-title pe-3">Coupon</div>
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
                                        to="/admin/addcoupon"
                                        className="btn btn-primary"
                                    >
                                        <i
                                            className="bx bxs-plus-square"
                                            aria-hidden="true"
                                        />
                                        Add Coupon
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

export default Coupon;
