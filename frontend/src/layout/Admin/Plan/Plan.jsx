import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GetClient } from '../../../Services/Admin';
import Table from '../../../components/Table';
import { Pencil, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
// import { deleteClient ,UpdateClientStatus} from '../../../Services/Admin';
import { getplanlist } from '../../../Services/Admin';


const Plan = () => {


    const navigate = useNavigate();

    const [clients, setClients] = useState([]);

    const token = localStorage.getItem('token');

    const getAdminclient = async () => {
        try {
            const response = await getplanlist(token);
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



    // update status 

    //  const handleSwitchChange = async (event, id) => {

    //     const user_active_status = event.target.checked ? "1" : "0";

    //     const data = { id:id, status: user_active_status }
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
    //             getAdminclient();
    //         } catch (error) {
    //             Swal.fire(
    //                 "Error",
    //                 "There was an error processing your request.",
    //                 "error"
    //             );
    //         }
    //     } else if (result.dismiss === Swal.DismissReason.cancel) {
    //         getAdminclient();
    //     }
    // };





    // const columns = [
    //     {
    //         name: 'S.No',
    //         selector: (row, index) => index + 1,
    //         sortable: false,
    //         width: '70px',
    //     },
    //     {
    //         name: 'Title',
    //         selector: row => row.title,
    //         sortable: true,
    //     },
    //     {
    //         name: 'Validity',
    //         selector: row => row.validity,
    //         sortable: true,
    //         width: '220px',
    //     },
    //     {
    //         name: 'price',
    //         selector: row => row.price,
    //         sortable: true,
    //     },
    //     {
    //         name: 'Description',
    //         selector: row => row.description,
    //         sortable: true,
    //     },

    //     {
    //         name: 'Active Status',
    //         selector: row => (
    //           <div className="form-check form-switch form-check-info">
    //             <input
    //               id={`rating_${row.status}`}
    //               className="form-check-input"
    //               type="checkbox"
    //               defaultChecked={row.status === "active"}
    //             //   onChange={(event) => handleSwitchChange(event, row._id)}
    //             />
    //             <label
    //               htmlFor={`rating_${row.ActiveStatus}`}
    //               className="checktoggle checkbox-bg"
    //             ></label>
    //           </div>
    //         ),
    //         sortable: true,
    //       },


    //     {
    //         name: 'Created At',
    //         selector: row => new Date(row.created_at).toLocaleDateString(),
    //         sortable: true,
    //     },
    //     {
    //         name: 'Updated At',
    //         selector: row => new Date(row.updated_at).toLocaleDateString(),
    //         sortable: true,
    //     },
    //     // {
    //     //     name: 'Actions',
    //     //     cell: row => (
    //     //         <>
    //     //         <div>
    //     //          <Pencil onClick={() => updateClient(row)} />
    //     //         </div>
    //     //        <div>
    //     //        <Trash2 onClick={() => DeleteClient(row._id)} />
    //     //        </div>
    //     //        </>
    //     //     ),
    //     //     ignoreRowClick: true,
    //     //     allowOverflow: true,
    //     //     button: true,
    //     // }
    // ];

    return (
        <div>

            <div className="page-content">
                {/*breadcrumb*/}
                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Plan</div>
                    <div className="ps-3">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0 p-0">
                                <li className="breadcrumb-item">
                                    <a href="javascript:;">
                                        <i className="bx bx-home-alt" />
                                    </a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">

                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="ms-auto">
                        <div className="btn-group">
                            <Link to="/admin/   addplan" className="btn btn-primary">
                                <i
                                    className="bx bxs-plus-square"
                                    aria-hidden="true"
                                />
                                Add Plan

                            </Link>


                        </div>
                    </div>
                </div>
                {/*end breadcrumb*/}
                {/* Section: Pricing table */}
                <div className="pricing-table">

                    <hr />
                    <div className="row row-cols-1 row-cols-lg-3">
                        {/* Free Tier */}
                        <div className="col">
                            <div className="card mb-5 mb-lg-0">
                                <div className="card-header bg-danger py-3">
                                    <h5 className="card-title text-white text-uppercase text-center">
                                        Free
                                    </h5>
                                    <h6 className="card-price text-white text-center">
                                        $0<span className="term">/month</span>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item text-secondary">
                                            <p>Title :</p>

                                        </li>
                                        <li className="list-group-item">
                                            <p>Price : </p>

                                        </li>
                                        <li className="list-group-item">
                                            <p>category: </p>

                                        </li>

                                        <li className="list-group-item">
                                            <p>Description :</p>

                                        </li>


                                        <li className="list-group-item text-secondary">
                                            <p>Updated At :</p>

                                        </li>
                                        <li className="list-group-item text-secondary">
                                            <p>validity :</p>

                                        </li>
                                    </ul>
                                    <div className="d-grid">
                                        {" "}
                                        <a href="#" className="btn btn-danger my-2 radius-30">
                                            Order Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Plus Tier */}
                        <div className="col">
                            <div className="card mb-5 mb-lg-0">
                                <div className="card-header bg-primary py-3">
                                    <h5 className="card-title text-white text-uppercase text-center">
                                        Plus
                                    </h5>
                                    <h6 className="card-price text-white text-center">
                                        $9<span className="term">/month</span>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item text-secondary">
                                            <p>Title :</p>

                                        </li>
                                        <li className="list-group-item">
                                            <p>Price : </p>

                                        </li>
                                        <li className="list-group-item">
                                            <p>category: </p>

                                        </li>

                                        <li className="list-group-item">
                                            <p>Description :</p>

                                        </li>


                                        <li className="list-group-item text-secondary">
                                            <p>Updated At :</p>

                                        </li>
                                        <li className="list-group-item text-secondary">
                                            <p>validity :</p>

                                        </li>
                                    </ul>
                                    <div className="d-grid">
                                        {" "}
                                        <a href="#" className="btn btn-primary my-2 radius-30">
                                            Order Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Pro Tier */}
                        <div className="col">
                            <div className="card">
                                <div className="card-header bg-warning py-3">
                                    <h5 className="card-title text-dark text-uppercase text-center">
                                        Pro
                                    </h5>
                                    <h6 className="card-price text-center">
                                        $49<span className="term">/month</span>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item text-secondary">
                                            <p>Title :</p>

                                        </li>
                                        <li className="list-group-item">
                                            <p>Price : </p>

                                        </li>
                                        <li className="list-group-item">
                                            <p>category: </p>

                                        </li>

                                        <li className="list-group-item">
                                            <p>Description :</p>

                                        </li>


                                        <li className="list-group-item text-secondary">
                                            <p>Updated At :</p>

                                        </li>
                                        <li className="list-group-item text-secondary">
                                            <p>validity :</p>

                                        </li>
                                    </ul>
                                    <div className="d-grid">
                                        {" "}
                                        <a href="#" className="btn btn-warning my-2 radius-30">
                                            Order Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>

            </div>
        </div>


    );
}

export default Plan;
