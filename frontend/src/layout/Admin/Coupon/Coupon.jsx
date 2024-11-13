import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getcouponlist } from '../../../Services/Admin';
import Table from '../../../components/Table';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { DeleteCoupon, UpdateClientStatus, CouponStatus } from '../../../Services/Admin';
import { image_baseurl } from '../../../Utils/config';
import { Tooltip } from 'antd';
import { fDate, fDateTime } from '../../../Utils/Date_formate';



const Coupon = () => {


    const navigate = useNavigate();

    const [clients, setClients] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [viewpage, setViewpage] = useState({});
    const [datewise, setDatewise] = useState("")

    const token = localStorage.getItem('token');



    const getcoupon = async () => {
        try {
            const response = await getcouponlist(token);
            if (response.status) {
                const filterdata = response.data.filter((item) =>
                    searchInput === "" ||
                    item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                    item.code.toLowerCase().includes(searchInput.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchInput.toLowerCase())
                );
                setClients(searchInput ? filterdata : response.data);
                setDatewise(response.data)
                // setClients(response.data);
            }
        } catch (error) {
            console.log("error");
        }
    }




    useEffect(() => {
        getcoupon();
    }, [searchInput]);




    const updatecoupon = async (row) => {
        navigate("/admin/coupon/updatecoupon/" + row._id, { state: { row } })
    }


    const DeleteCouponbyadmin = async (_id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to delete this coupon? This action cannot be undone.',
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
                        text: 'The coupon has been successfully deleted.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    getcoupon();

                }
            } else {

                Swal.fire({
                    title: 'Cancelled',
                    text: 'The coupon deletion was cancelled.',
                    icon: 'info',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'There was an error deleting the coupon.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });

        }
    };





    // update status 

    const handleSwitchChange = async (event, id) => {

        const user_active_status = event.target.checked === true ? "true" : "false"

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
                const response = await CouponStatus(data, token)
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




    const expiredbydate = () => {
        const data = datewise?.map((item) => {
            console.log("datewise", item.enddate)
            return item.enddate

        })
    }



    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '100px',
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Code',
            selector: row => row.code,
            sortable: true,
            width: '150px',
        },
        {
            name: 'Fixed/Percent Value',
            selector: row => row.type === "fixed" ? row.value : `${row.value}%`,
            sortable: true,
            width: '300px',
        },
        // {
        //     name: 'Image',
        //     cell: row => <img src={`${image_baseurl}/uploads/coupon/${row.image}`} alt="Image" width="50" height="50" />,
        //     sortable: true,
        //     width: '110px',
        // },
        {
            name: 'Min Purchase Value',
            selector: row => row.minpurchasevalue,
            sortable: true,
            width: '210px',
        },
        {
            name: 'Max Discount Value',
            selector: row => row.mincouponvalue ? row.mincouponvalue : "-",
            sortable: true,
            width: '210px',
        },

        // {
        //     name: 'Description',
        //     selector: row => row.description,
        //     sortable: true,
        //     width: '180px',
        // },
        {
            name: 'Type',
            selector: row => row.type,
            sortable: true,
            width: '120px',
        },

        {
            name: 'Active Status',
            selector: row => {
                const currentDate = new Date();
                const endDate = new Date(row.enddate);
                if (currentDate > endDate) {
                    return <span className="text-danger" style={{ color: "red" }}>Expired</span>;
                } else {
                    return (
                        <div className="form-check form-switch form-check-info">
                            <input
                                id={`rating_${row.status}`}
                                className="form-check-input toggleswitch"
                                type="checkbox"
                                defaultChecked={row.status === true}
                                onChange={(event) => handleSwitchChange(event, row._id)}
                            />
                            <label
                                htmlFor={`rating_${row.status}`}
                                className="checktoggle checkbox-bg"
                            ></label>
                        </div>
                    );
                }
            },
            sortable: true,
            width: '156px',
        },


        {
            name: 'Startdate',
            selector: row => fDateTime(row.startdate),
            sortable: true,
            width: '200px',
        },
        {
            name: 'Enddate',
            selector: row => fDateTime(row.enddate),
            sortable: true,
            width: '200px',
        },

        {
            name: 'Actions',
            cell: row => {
                const currentDate = new Date();
                const endDate = new Date(row.enddate);

                return (
                    <>
                        {currentDate > endDate ? (
                            <span className="text-danger" >-</span>
                        ) : (
                            <div className='d-flex' >
                                <div >
                                    <Tooltip placement="top" overlay="View">
                                        <Eye
                                            style={{ marginRight: "10px" }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#example2"
                                            onClick={() => setViewpage(row)}
                                        />
                                    </Tooltip>
                                </div>
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
                            </div>
                        )}
                    </>
                );
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }

    ];

    return (
        <div>
            <div>
                <div className="page-content">
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
                    <hr />
                    <div className="card">
                        <div className="card-body">
                            <div className="d-lg-flex align-items-center mb-4 gap-3">
                                <div className="position-relative">
                                    <input
                                        type="text"
                                        className="form-control ps-5 radius-10"
                                        placeholder="Search Coupon"
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        value={searchInput}
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
                <div className="button-group">

                    <div
                        className="modal fade"
                        id="example2"
                        tabIndex={-1}
                        aria-labelledby="example2"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="example1">
                                        Coupon Details
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    />
                                </div>
                                <div className="modal-body">
                                    <ul>
                                        <li>
                                            <div className="row justify-content-between">
                                                <div className="col-md-6">
                                                    <b>Name : {viewpage?.name}</b>
                                                </div>
                                                <div className="col-md-6">

                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row justify-content-between">
                                                <div className="col-md-6">
                                                    <b>Code : {viewpage?.code}</b>
                                                </div>
                                                <div className="col-md-6">

                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="row justify-content-between">
                                                <div className="col-md-6">
                                                    <b>Min Purchase Value : {viewpage?.minpurchasevalue}</b>
                                                </div>
                                                <div className="col-md-6">

                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row justify-content-between">
                                                <div className="col-md-6">
                                                    <b>Max Discount Value  : {viewpage?.mincouponvalue}</b>
                                                </div>
                                                <div className="col-md-6">

                                                </div>
                                            </div>
                                        </li>
                                        {/* <li>
                                            <div className="row justify-content-between">
                                                <div >
                                                    <b>Discription : {viewpage?.description}</b>
                                                </div>
                                                <div className="col-md-6">

                                                </div>
                                            </div>
                                        </li> */}
                                        <li>
                                            <div className="row justify-content-between">
                                                <div className="col-md-8">
                                                    {viewpage?.startdate ? (
                                                        <b>Start Date: {fDateTime(viewpage.startdate)}</b>
                                                    ) : (
                                                        <b>Start Date: Not available</b>
                                                    )}
                                                </div>
                                                <div className="col-md-6"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row justify-content-between">
                                                <div className="col-md-6">
                                                    {viewpage?.enddate ? (
                                                        <b>End Date: {fDateTime(viewpage.enddate)}</b>
                                                    ) : (
                                                        <b>End Date: Not available</b>
                                                    )}
                                                </div>
                                                <div className="col-md-6"></div>
                                            </div>
                                        </li>

                                        {/* <li>
                                            <div className="row justify-content-between">
                                                <div className="col-md-6">
                                                    <b>Image </b>
                                                </div>
                                                <div className="col-md-6">

                                                </div>
                                            </div>
                                        </li> */}

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Coupon;
