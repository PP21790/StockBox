import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GetClient } from '../../../Services/Admin';
import Table from '../../../components/Table';
import { Settings2, Eye, UserPen, Trash2, Download } from 'lucide-react';
import Swal from 'sweetalert2';
import { deleteClient, UpdateClientStatus, PlanSubscription, getplanlist, BasketSubscription, BasketAllList, getcategoryplan } from '../../../Services/Admin';
import { Tooltip } from 'antd';
import { fDateTime } from '../../../Utils/Date_formate';
import { image_baseurl } from '../../../Utils/config';


const Client = () => {


    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [category, setCategory] = useState([]);
    const [checkedIndex, setCheckedIndex] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [clients, setClients] = useState([]);
    const [planlist, setPlanlist] = useState([]);
    const [basketlist, setBasketlist] = useState([]);
    const [client, setClientid] = useState({});
    const [selectcategory, setSelectcategory] = useState("")
    const [searchInput, setSearchInput] = useState("");


    const handleDownload = (row) => {

        const url = `${image_baseurl}uploads/pdf/${row.pdf}`;
        const link = document.createElement('a');
        link.href = url;
        link.download = url;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    };



    const [basketdetail, setBasketdetail] = useState({
        plan_id: "",
        client_id: "",
        price: "",
        discount: ""
    });

    const [updatetitle, setUpdatetitle] = useState({
        plan_id: "",
        client_id: "",
        price: ""
    });




    const handleTabChange = (index) => {
        setCheckedIndex(index);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectcategory("")
    };


    useEffect(() => {
        getAdminclient();
        getplanlistbyadmin()
        getbasketlist()
        getcategoryplanlist()
    }, [searchInput]);

    const getcategoryplanlist = async () => {
        try {
            const response = await getcategoryplan(token);
            if (response.status) {
                setCategory(response.data);

            }
        } catch (error) {
            console.log("error");
        }
    };

    const getAdminclient = async () => {
        try {
            const response = await GetClient(token);
            if (response.status) {
                const filterdata = response.data.filter((item) =>
                    searchInput === "" ||
                    item.FullName.toLowerCase().includes(searchInput.toLowerCase()) ||
                    item.Email.toLowerCase().includes(searchInput.toLowerCase()) ||
                    item.PhoneNo.toLowerCase().includes(searchInput.toLowerCase())

                );
                setClients(searchInput ? filterdata : response.data);
            }
        } catch (error) {
            console.log("error");
        }
    }




    const getplanlistbyadmin = async () => {
        try {
            const response = await getplanlist(token);
            if (response.status) {

                setPlanlist(response.data);
            }
        } catch (error) {
            console.log("error");
        }
    }



    const getbasketlist = async () => {
        try {
            const response = await BasketAllList(token);
            if (response.status) {
                setBasketlist(response.data);
            }
        } catch (error) {
            console.log("error");
        }
    }




    const updateClient = async (row) => {
        navigate("/admin/client/updateclient/" + row._id, { state: { row } })
    }


    const Clientdetail = async (row) => {
        navigate("/admin/client/clientdetail/" + row._id, { state: { row } })
    }




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
        const originalChecked = event.target.checked;
        const user_active_status = originalChecked ? "1" : "0";
        const data = { id: id, status: user_active_status };

        const result = await Swal.fire({
            title: "Do you want to save the changes?",
            showCancelButton: true,
            confirmButtonText: "Save",
            cancelButtonText: "Cancel",
            allowOutsideClick: false,
        });

        if (result.isConfirmed) {
            try {
                const response = await UpdateClientStatus(data, token);
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
                // Reload the plan list
                getAdminclient();
            } catch (error) {
                Swal.fire(
                    "Error",
                    "There was an error processing your request.",
                    "error"
                );
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            event.target.checked = !originalChecked;
            getAdminclient();
        }
    };



    // Update service
    const Updateplansubscription = async () => {

        try {
            const data = { plan_id: updatetitle.plan_id, client_id: client._id, price: updatetitle.price };
            const response = await PlanSubscription(data, token);


            if (response && response.status) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Plan updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                });

                setUpdatetitle({ plan_id: "", client_id: "", price: "" });
                getAdminclient();
                handleCancel()
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error updating the Plan.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'There was an error updating the Plan.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };




    // assign basket 
    const UpdateBasketservice = async () => {

        try {
            const data = { basket_id: basketdetail.basket_id, client_id: client._id, price: basketdetail.price, discount: basketdetail.discount };
            const response = await BasketSubscription(data, token);

            if (response && response.status) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Basket service updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                });

                setBasketdetail({ basket_id: "", client_id: "", price: "", discount: "" });
                getAdminclient();
                handleCancel()
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error updating the Basket.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'There was an error updating the Basket.',
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
            name: 'Full Name',
            selector: row => row.FullName,
            sortable: true,
            width: '165px',
        },
        {
            name: 'Email',
            selector: row => row.Email,
            sortable: true,
            width: '284px',
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
        // {
        // name: 'Date',
        // selector: row => row.Status,
        // sortable: true,
        // width: '165px',
        // },

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
        {
            name: 'Kyc',
            selector: row => (
                row.kyc_verification === "1" ? (
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
            name: 'CreatedAt',
            selector: row => fDateTime(row.createdAt),
            sortable: true,
            width: '165px',
        },
        {
            name: 'Actions',
            selector: (row) => (
                <>
                    <Tooltip placement="top" overlay="Kyc Agreement">

                        {row.kyc_verification === "1" ? <Download onClick={() => handleDownload(row)} /> : ""}

                    </Tooltip>

                    <Tooltip placement="top" overlay="Package Assign">
                        <span onClick={(e) => { showModal(true); setClientid(row); }} style={{ cursor: 'pointer' }}>
                            <Settings2 />
                        </span>
                    </Tooltip>

                    <Tooltip title="view">
                        <Eye

                            onClick={() => Clientdetail(row)} />
                    </Tooltip>

                    <div
                        className="modal fade"
                        id={`modal-${client.id}`}
                        tabIndex={-1}
                        aria-labelledby={`modalLabel-${client.id}`}
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id={`modalLabel-${client.id}`}>
                                        View Client
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
                                        <li className='viewlist'>
                                            <div className='row justify-content-between'>
                                                <div className="col">
                                                    <b>Name</b>
                                                </div>
                                                <div className="col">
                                                    Pankaj
                                                </div>

                                            </div>
                                        </li>
                                        <li className='viewlist'> <div className='row justify-content-between'>
                                            <div className="col">
                                                <b>Email</b>
                                            </div>
                                            <div className="col">
                                                pankaj@gmail.com
                                            </div>

                                        </div></li>
                                        <li className='viewlist'> <div className='row justify-content-between'>
                                            <div className="col">
                                                <b>Phone No.</b>
                                            </div>
                                            <div className="col">
                                                9876543210
                                            </div>

                                        </div></li>
                                        <li className='viewlist'> <div className='row justify-content-between'>
                                            <div className="col">
                                                <b>Signup Status</b>
                                            </div>
                                            <div className="col">
                                                App
                                            </div>

                                        </div></li>
                                        <li className='viewlist'> <div className='row justify-content-between'>
                                            <div className="col">
                                                <b>Created At</b>
                                            </div>
                                            <div className="col">
                                                25/09/2024
                                            </div>

                                        </div></li>
                                        <li className='viewlist'> <div className='row justify-content-between'>
                                            <div className="col">
                                                <b>Updated At</b>
                                            </div>
                                            <div className="col">
                                                26/09/2024
                                            </div>

                                        </div></li>
                                    </ul>
                                </div>
                                {/* <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div>
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
                    <hr />
                    {/* end breadcrumb */}
                    <div className="card">
                        <div className="card-body">
                            <div className="d-lg-flex align-items-center mb-4 gap-3">
                                <div className="position-relative">
                                    <input
                                        type="text"
                                        className="form-control ps-5 radius-10"
                                        placeholder="Search Order"
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        value={searchInput}
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



            {isModalVisible && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div
                        className="modal fade show d-block"
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
                                    <div className='card'>
                                        <div className='d-flex justify-content-center align-items-center card-body'>
                                            {['Plan'].map((tab, index) => (
                                                <label key={index} className='labelfont'>
                                                    <input
                                                        className='ms-3'
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

                                    <div className='card'>
                                        {checkedIndex === 0 && (
                                            <>

                                                <div className='row mt-3'>
                                                    {category && category.map((item, index) => (
                                                        <div className='col-lg-4' key={index}>
                                                            <input
                                                                className="form-check-input mx-2"
                                                                type="radio"
                                                                name="planSelection"
                                                                id={`proplus-${index}`}
                                                                onClick={() => setSelectcategory(item._id)}
                                                            />
                                                            <label className="form-check-label" htmlFor={`proplus-${index}`}>
                                                                {item.title}

                                                            </label>

                                                        </div>

                                                    ))}
                                                </div>


                                                {selectcategory && (
                                                    <form className='card-body'>
                                                        <div className="row">
                                                            {planlist
                                                                .filter(item => item.category === selectcategory)
                                                                .map((item, index) => (
                                                                    <div className="col-md-6" key={index}>
                                                                        <div className="form-check mb-2">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type="radio"
                                                                                name="planSelection"
                                                                                id={`input-plan-${index}`}
                                                                                onClick={() => {
                                                                                    setUpdatetitle({ plan_id: item._id, price: item.price, title: item.title });
                                                                                }}
                                                                            />
                                                                            <label className="form-check-label" htmlFor={`input-plan-${index}`}>
                                                                                {item.title}
                                                                            </label>
                                                                            <div className="row mt-3">
                                                                                <div className="col-12">
                                                                                    <div className="card radius-10 border-4 border-start border-0 border-primary" style={{ width: '391px' }}>
                                                                                        <div className="card-body">
                                                                                            <div className="d-flex align-items-center justify-content-between">
                                                                                                <div>
                                                                                                    <strong className="mb-0 text-secondary">Hini</strong>
                                                                                                    <p>4000</p>
                                                                                                </div>
                                                                                                <div>
                                                                                                    <strong className="mb-0 text-secondary">Validity</strong>
                                                                                                    <p>3 months</p>

                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="d-flex align-items-center justify-content-between">
                                                                                                <div>
                                                                                                    <strong className="mb-0 text-secondary">created At</strong>
                                                                                                    <p>29/05/2024</p>
                                                                                                </div>
                                                                                                <div>
                                                                                                    <strong className="mb-0 text-secondary">Updated At</strong>
                                                                                                    <p>29/05/2024</p>

                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>


                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    </form>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={handleCancel}

                                    >
                                        Close
                                    </button>

                                    {checkedIndex === 0 && (
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => Updateplansubscription()}
                                        >
                                            Save Plan
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
            }




        </div >


    );
}

export default Client;
