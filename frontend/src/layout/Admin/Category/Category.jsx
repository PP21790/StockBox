import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GetService, Addplancategory, UpdateCategoryplan, getcategoryplan, deleteplancategory, updatecategorydstatus } from '../../../Services/Admin';
import Table from '../../../components/Table';
import { SquarePen, Trash2, PanelBottomOpen } from 'lucide-react';
import Swal from 'sweetalert2';

const Category = () => {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [model, setModel] = useState(false);
    const [serviceid, setServiceid] = useState({});
    const [servicedata, setServicedata] = useState([]);


    const [searchInput, setSearchInput] = useState("");

    const [updatetitle, setUpdatetitle] = useState({
        title: "",
        id: "",
        service: ""
    });


    const [title, setTitle] = useState({
        title: "",
        add_by: "",
        service: ""
    });

    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('id');




    // Getting services
    const getcategory = async () => {
        try {
            const response = await getcategoryplan(token);
            if (response.status) {
                const filterdata = response.data.filter((item) =>
                    searchInput === "" ||
                    item.title.toLowerCase().includes(searchInput.toLowerCase())
                );
                setClients(searchInput ? filterdata : response.data);
            }
        } catch (error) {
            console.log("Error fetching services:", error);
        }
    };



    const getservice = async () => {
        try {
            const response = await GetService(token);
            if (response.status) {
                setServicedata(response.data)
            }
        } catch (error) {
            console.log("Error fetching services:", error);
        }
    };



    useEffect(() => {
        getcategory();
        getservice()
    }, [searchInput]);




    // Update service
    const Updatecategory = async () => {
        try {
            const data = { title: updatetitle.title, id: serviceid._id, service: updatetitle.service };

            const response = await UpdateCategoryplan(data, token);

            if (response && response.status) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Service updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                });

                setUpdatetitle({ title: "", id: "", service: "" });
                getcategory();
                setModel(false);
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error updating the service.',
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



    // Add service
    const addcategory = async () => {
        try {

            const data = { title: title.title, add_by: userid, service: title.service };

            console.log("data", data)
            const response = await Addplancategory(data, token);
            if (response && response.status) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Service added successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                });

                setTitle({ title: "", add_by: "", service: "" });
                getcategory();

                const modal = document.getElementById('exampleModal');
                const bootstrapModal = window.bootstrap.Modal.getInstance(modal);
                if (bootstrapModal) {
                    bootstrapModal.hide();
                }
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error adding the service.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch (error) {
            console.error("Error adding service:", error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an error adding the service.',
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
                const response = await updatecategorydstatus(data, token);
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
                getcategory();
            } catch (error) {
                Swal.fire(
                    "Error",
                    "There was an error processing your request.",
                    "error"
                );
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            getcategory();
        }
    };




    // delete plan cartegory 

    const DeleteCategory = async (_id) => {
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
                const response = await deleteplancategory(_id, token);
                if (response.status) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'The staff has been successfully deleted.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    getcategory();

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




    const [selectedServices, setSelectedServices] = useState([]);


    const handleCheckboxChange = (serviceId) => {
        setSelectedServices((prevSelected) => {
            if (prevSelected.includes(serviceId)) {
                // If already selected, remove it
                return prevSelected.filter((id) => id !== serviceId);
            } else {
                // Otherwise, add it
                return [...prevSelected, serviceId];
            }
        });
    };


    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '70px',
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
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
        },
        {
            name: 'Created At',
            selector: row => new Date(row.created_at).toLocaleDateString(),
            sortable: true,
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
                        <SquarePen
                            onClick={() => {
                                setModel(true);
                                setServiceid(row);
                                setUpdatetitle({ title: row.title, id: row._id });
                            }}
                        />
                    </div>
                    <div>
                        <Trash2 onClick={() => DeleteCategory(row._id)} />
                    </div>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];



    const updateServiceTitle = (key, value) => {
        setUpdatetitle(prev => ({
            ...prev,
            [key]: value
        }));
    };








    return (
        <div>
            <div className="page-content">

                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Category</div>
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
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                >
                                    <i className="bx bxs-plus-square" />
                                    Add Category
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
                                                    Add Category
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
                                                            <label htmlFor="categoryTitle">Category</label>
                                                            <input
                                                                id="categoryTitle"
                                                                className="form-control mb-3"
                                                                type="text"
                                                                placeholder="Enter Service Title"
                                                                value={title.title}
                                                                onChange={(e) => setTitle({ ...title, title: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <label htmlFor="service">Service</label>
                                                            <select
                                                                id="service"
                                                                className="form-control mb-3"
                                                                value={title.service}
                                                                onChange={(e) => setTitle({ ...title, service: e.target.value })}
                                                            >
                                                                <option value="">Select a Service</option>
                                                                {servicedata &&
                                                                    servicedata.map((item) => (
                                                                        <option key={item._id} value={item._id}>
                                                                            {item.title}
                                                                        </option>
                                                                    ))}
                                                            </select>
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
                                                    onClick={addcategory}
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {model && (
                                    <div
                                        className="modal fade show"
                                        style={{ display: 'block' }}
                                        tabIndex={-1}
                                        aria-labelledby="updateServiceModalLabel"
                                        aria-hidden="true"
                                        role="dialog"
                                    >
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="updateServiceModalLabel">
                                                        Update Category
                                                    </h5>
                                                    <button
                                                        type="button"
                                                        className="btn-close"
                                                        aria-label="Close"
                                                        onClick={() => setModel(false)}
                                                    />
                                                </div>
                                                <div className="modal-body">
                                                    <form>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <label htmlFor="category">Category</label>
                                                                <input
                                                                    className="form-control mb-2"
                                                                    type="text"
                                                                    placeholder="Enter Category Title"
                                                                    id="category"
                                                                    value={updatetitle.title}
                                                                    onChange={(e) =>
                                                                        updateServiceTitle('title', e.target.value)
                                                                    }
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <label htmlFor="service">Service</label>
                                                                <select
                                                                    className="form-control mb-2"
                                                                    id="service"
                                                                    value={updatetitle.service}
                                                                    onChange={(e) =>
                                                                        updateServiceTitle('service', e.target.value)
                                                                    }
                                                                    required
                                                                >
                                                                    <option value="" disabled>
                                                                        Select a service
                                                                    </option>
                                                                    {servicedata &&
                                                                        servicedata.map((item) => (
                                                                            <option key={item._id} value={item._id}>
                                                                                {item.title}
                                                                            </option>
                                                                        ))}
                                                                </select>
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
                                                        onClick={Updatecategory}
                                                        disabled={!updatetitle.title || !updatetitle.service}
                                                    >
                                                        Update Service
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
        </div>
    );
};

export default Category;