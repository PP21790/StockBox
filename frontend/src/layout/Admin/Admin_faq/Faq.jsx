import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFaqlist, AddFaq, UpdateFaq, changeFAQStatus, DeleteFAQ } from '../../../Services/Admin';
import Table from '../../../components/Table';
import { SquarePen, Trash2, PanelBottomOpen, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import { Tooltip } from 'antd';
import { fDate } from '../../../Utils/Date_formate';

const Faq = () => {



    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [model, setModel] = useState(false);
    const [serviceid, setServiceid] = useState({});
    const [searchInput, setSearchInput] = useState("");
    const [updatetitle, setUpdatetitle] = useState({
        title: "",
        id: "",
        description: "",


    });




    const [title, setTitle] = useState({
        title: "",
        description: "",
        add_by: "",
    });

    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('id');





    // Getting blogs
    const getFaq = async () => {
        try {
            const response = await getFaqlist(token);
            if (response.status) {
                const filterdata = response.data.filter((item) =>
                    searchInput === "" ||
                    item.title.toLowerCase().includes(searchInput.toLowerCase())
                );
                setClients(searchInput ? filterdata : response.data);
            }
        } catch (error) {
            console.log("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        getFaq();
    }, [searchInput]);





    // Update service
    const updateFaqbyadmin = async () => {
        try {
            const data = { title: updatetitle.title, id: serviceid._id, description: updatetitle.description };
            const response = await UpdateFaq(data, token);

            if (response && response.status) {
                Swal.fire({
                    title: 'Success!',
                    text: 'bolgs updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                });

                setUpdatetitle({ title: "", id: "" });
                getFaq();
                setModel(false);
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error updating the blogs.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'There was an error updating the blogs.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };





    // Add blogs
    const addfaqbyadmin = async () => {
        try {
            const data = { title: title.title, description: title.description, add_by: userid };
            const response = await AddFaq(data, token);
            if (response && response.status) {
                Swal.fire({
                    title: 'Success!',
                    text: 'blogs added successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                });

                setTitle({ title: "", add_by: "", description: "" });
                getFaq();

                const modal = document.getElementById('exampleModal');
                const bootstrapModal = window.bootstrap.Modal.getInstance(modal);
                if (bootstrapModal) {
                    bootstrapModal.hide();
                }
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error adding.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'There was an error adding',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };




    // Update status
    const handleSwitchChange = async (event, id) => {
        const user_active_status = event.target.checked ? "true" : "false";
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
                const response = await changeFAQStatus(data, token);
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
                getFaq();
            } catch (error) {
                Swal.fire(
                    "Error",
                    "There was an error processing your request.",
                    "error"
                );
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            getFaq();
        }
    };




    // delete blogs


    const DeleteFaq = async (_id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to delete this Faq ? This action cannot be undone.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel',
            });

            if (result.isConfirmed) {
                const response = await DeleteFAQ(_id, token);
                if (response.status) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'The Faq has been successfully deleted.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    getFaq();

                }
            } else {

                Swal.fire({
                    title: 'Cancelled',
                    text: 'The Faq deletion was cancelled.',
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



    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '100px',
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
            width: '200px',

        },
        {
            name: 'Active Status',
            selector: row => (
                <div className="form-check form-switch form-check-info">
                    <input
                        id={`rating_${row.status}`}
                        className="form-check-input toggleswitch"
                        type="checkbox"
                        checked={row.status === true}
                        onChange={(event) => handleSwitchChange(event, row._id)}
                    />
                    <label
                        htmlFor={`rating_${row.status}`}
                        className="checktoggle checkbox-bg"
                    ></label>
                </div>
            ),
            sortable: true,
            width: '200px',


        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
            width: '200px',
        },

        {
            name: 'Created At',
            selector: row => fDate(row.created_at),
            sortable: true,
        },
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
                        <Tooltip placement="top" overlay="View">
                            <Eye style={{ marginRight: "10px" }} data-bs-toggle="modal"
                                data-bs-target="#example1" />
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip placement="top" overlay="Update">
                            <SquarePen
                                onClick={() => {
                                    setModel(true);
                                    setServiceid(row);
                                    setUpdatetitle({ title: row.title, id: row._id, description: row.description });
                                }}
                            />
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip placement="top" overlay="Delete">
                            <Trash2 onClick={() => DeleteFaq(row._id)} />
                        </Tooltip>
                    </div>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];



    // const updateServiceTitle = (value) => {
    //     setUpdatetitle(prev => ({
    //         ...prev,
    //         title: value
    //     }));
    // };


    const updateServiceTitle = (updatedField) => {
        setUpdatetitle(prev => ({
            ...prev,
            ...updatedField
        }));
    };




    return (
        <div>
            <div className="page-content">

                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">FAQ</div>
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
                                    placeholder="Search Faq"
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    value={searchInput}
                                />
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
                                    Add FAQ
                                </button>

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
                                                    Add FAQ
                                                </h5>
                                                <button
                                                    type="button"
                                                    className="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                />
                                            </div>
                                            <div className="modal-body">
                                                <form>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <label htmlFor="">Title</label>
                                                            <input
                                                                className="form-control mb-3"
                                                                type="text"
                                                                placeholder='Enter blogs Title'
                                                                value={title.title}
                                                                onChange={(e) => setTitle({ ...title, title: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <label htmlFor="">description</label>
                                                            <textarea
                                                                className="form-control mb-3"
                                                                type="text"
                                                                placeholder='Enter description'
                                                                value={title.description}
                                                                onChange={(e) => setTitle({ ...title, description: e.target.value })}
                                                            />
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
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={addfaqbyadmin}
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {model && (
                                    <>
                                        <div className="modal-backdrop fade show"></div>
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
                                                            Update FAQ
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
                                                                    <label htmlFor="">Title</label>
                                                                    <input
                                                                        className="form-control mb-2"
                                                                        type="text"
                                                                        placeholder='Enter blogs Title'
                                                                        value={updatetitle.title}
                                                                        onChange={(e) => updateServiceTitle({ title: e.target.value })}
                                                                    />
                                                                </div>
                                                            </div>


                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <label htmlFor="">Description</label>
                                                                    <textarea
                                                                        className="form-control mb-2"
                                                                        type="text"
                                                                        placeholder='Enter  Description'
                                                                        value={updatetitle.description}
                                                                        onChange={(e) => updateServiceTitle({ description: e.target.value })}
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
                                                            onClick={updateFaqbyadmin}
                                                        >
                                                            Update FAQ
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                            </div>
                        </div>
                        <div className="table-responsive">
                            <Table
                                columns={columns}
                                data={clients}
                                pagination
                                striped
                                highlightOnHover
                                dense
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="button-group">

                <div
                    className="modal fade"
                    id="example1"
                    tabIndex={-1}
                    aria-labelledby="example1"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="example1">
                                    FAQ Details
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
                                                <b>Title</b>
                                            </div>
                                            <div className="col-md-6">

                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row justify-content-between">
                                            <div className="col-md-6">
                                                <b>Discription</b>
                                            </div>
                                            <div className="col-md-6">

                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row justify-content-between">
                                            <div className="col-md-6">
                                                <b>Created At</b>
                                            </div>
                                            <div className="col-md-6">

                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row justify-content-between">
                                            <div className="col-md-6">
                                                <b>Updated At</b>
                                            </div>
                                            <div className="col-md-6">

                                            </div>
                                        </div>
                                    </li>
                                 
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Faq;
