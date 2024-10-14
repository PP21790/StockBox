import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import Swal from 'sweetalert2';
import { Tooltip } from 'antd';
import { BasketAllList, deletebasket } from '../../../Services/Admin';
import { fDate } from '../../../Utils/Date_formate';

const Basket = () => {


    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const token = localStorage.getItem('token');

    const colors = [
        'bg-danger',
        'bg-success',
        'bg-warning',
        'bg-info',
        'bg-primary',
        'bg-secondary'
    ];

    const getbasketlist = async () => {
        try {
            const response = await BasketAllList(token);
            if (response.status) {
                setClients(response.data);
            }
        } catch (error) {
            console.log("error");
        }
    }

    useEffect(() => {
        getbasketlist();
    }, []);


// delete basket page 


    const Deletebasket = async (_id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to delete this item? This action cannot be undone.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel',
            });

            if (result.isConfirmed) {
                const response = await deletebasket(_id, token);
                if (response.status) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'The item has been successfully deleted.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    getbasketlist();
                }
            } else {
                Swal.fire({
                    title: 'Cancelled',
                    text: 'The item deletion was cancelled.',
                    icon: 'info',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'There was an error deleting the item.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };

    return (
        <div>
            <div className="page-content">
                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Basket</div>
                    <div className="ps-3">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0 p-0">
                                <li className="breadcrumb-item">
                                    <Link to="/staff/dashboard">
                                        <i className="bx bx-home-alt" />
                                    </Link>
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
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
                                    to="/staff/addbasket"
                                    className="btn btn-primary"
                                >
                                    <i className="bx bxs-plus-square" aria-hidden="true" />
                                    Add Basket
                                </Link>
                            </div>
                        </div>

                        {clients && (
                            <div className="pricing-table">
                                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                                    {clients.map((item, index) => (
                                        <div className="col" key={index}>
                                            <div className="card mb-5">
                                                <div className={`card-header ${colors[index % colors.length]} py-3`}>
                                                    <div className='d-flex justify-content-between'>
                                                        <h6 className="card-price text-white text-start">
                                                            INR {item.price}
                                                        </h6>
                                                        <Tooltip title="Delete">
                                                            <X 
                                                                style={{ fontSize: "1.6rem", color: "white" }} 
                                                                onClick={() => Deletebasket(item._id)} 
                                                            />
                                                        </Tooltip>
                                                    </div>
                                                </div>

                                                <div className="card-body">
                                                    <p><b>Title:</b> {item.title}</p>
                                                    <p><b>Theme Name:</b> {item.themename}</p>
                                                    <p><b>Entry Price:</b> {item.entryprice}</p>
                                                    <p><b>Exit Price:</b> {item.exitprice}</p>
                                                    <p><b>Description:</b> {item.description}</p>
                                                    <p><b>Created At:</b> {fDate(item.created_at)}</p>

                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <Link to={`viewdetail/${item._id}`} className="btnanchor btn btn-danger my-2 radius-30">
                                                                View
                                                            </Link>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <Link to={`editbasket/${item._id}`} className="btnanchor btn btn-danger my-2 radius-30">
                                                                Edit
                                                            </Link>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <Link to="/staff/editbasket" className="btnanchor btn btn-outline-danger my-2 radius-30">
                                                                Rebalancing
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Basket;
