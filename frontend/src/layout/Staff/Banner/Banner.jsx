import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getbannerlist, Addbanner, UpdateBanner, changeBannerStatus, DeleteBanner } from '../../../Services/Admin';
import Table from '../../../components/Table';
import { SquarePen, Trash2, PanelBottomOpen } from 'lucide-react';
import Swal from 'sweetalert2';
import { fDateTime } from '../../../Utils/Date_formate';
import { image_baseurl } from '../../../Utils/config';
import { getstaffperuser } from '../../../Services/Admin';


const Banner = () => {



    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [model, setModel] = useState(false);
    const [serviceid, setServiceid] = useState({});
    const [searchInput, setSearchInput] = useState("");
    const [updatetitle, setUpdatetitle] = useState({
        title: "",
        id: "",
        description: "",
        image: "",

    });


    const [permission, setPermission] = useState([]);


    const [title, setTitle] = useState({
        title: "",
        description: "",
        image: "",
        add_by: "",
    });

    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('id');





    // Getting services
    const getBanner = async () => {
        try {
            const response = await getbannerlist(token);
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



    const getpermissioninfo = async () => {
        try {
            const response = await getstaffperuser(userid, token);
            if (response.status) {
                setPermission(response.data.permissions);
            }
        } catch (error) {
            console.log("error", error);
        }
    };



    useEffect(() => {
        getBanner();
        getpermissioninfo()
    }, [searchInput]);





    // Update service
    const updatebanner = async () => {
        try {
            const data = {  id: serviceid._id, image: updatetitle.image };
            const response = await UpdateBanner(data, token);

            if (response && response.status) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Service updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                });

                setUpdatetitle({ title: "", id: "" });
                getBanner();
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
    const AddBanner = async () => {
        try {
            const data = { title: title.title, description: title.description, image: title.image, add_by: userid };
            const response = await Addbanner(data, token);
            if (response && response.status) {
                Swal.fire({
                    title: 'Success!',
                    text: 'blogs added successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                });

                setTitle({ title: "", add_by: "" });
                getBanner();

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
                const response = await changeBannerStatus(data, token);
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
                getBanner();
            } catch (error) {
                Swal.fire(
                    "Error",
                    "There was an error processing your request.",
                    "error"
                );
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            getBanner();
        }
    };




    // delete news

    const Deletebannerlist = async (_id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to delete this ? This action cannot be undone.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel',
            });

            if (result.isConfirmed) {
                const response = await DeleteBanner(_id, token);
                if (response.status) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'The staff has been successfully deleted.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    getBanner();

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



    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '70px',
        },
        // {
        //     name: 'Title',
        //     selector: row => row.title,
        //     sortable: true,
        // },
        {
            name: 'Image',
            cell: row => <img src={`${image_baseurl}/uploads/banner/${row.image}`} alt="image" width="50" height="50" />,
            sortable: true,
        },
        permission.includes("bannerstatus") ? {
            name: 'Active Status',
            selector: row => (
                <div className="form-check form-switch form-check-info">
                    <input
                        id={`rating_${row.status}`}
                        className="form-check-input toggleswitch"
                        type="checkbox"
                        checked={row.status == true}
                        onChange={(event) => handleSwitchChange(event, row._id)}
                    />
                    <label
                        htmlFor={`rating_${row.status}`}
                        className="checktoggle checkbox-bg"
                    ></label>
                </div>
            ),
            sortable: true,
        } : "",
        {
            name: 'Created At',
            selector: row => fDateTime(row.created_at),
            sortable: true,
        },
        {
            name: 'Updated At',
            selector: row => fDateTime(row.updated_at),
            sortable: true,
        },
        permission.includes("editbanner") ||  permission.includes("deletebanner") ?{
            name: 'Actions',
            cell: row => (
                <>
                    {permission.includes("editbanner") ?  <div>
                        <SquarePen
                            onClick={() => {
                                setModel(true);
                                setServiceid(row);
                                setUpdatetitle({ title: row.title, id: row._id, description: row.description, image: row.image });
                            }}
                        />
                    </div> : "" }
                    {permission.includes("deletebanner") ? <div>
                        <Trash2 onClick={() => Deletebannerlist(row._id)} />
                    </div> : "" }
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        } : ""
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
                    <div className="breadcrumb-title pe-3">Banner</div>
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
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    value={searchInput}
                                />
                                <span className="position-absolute top-50 product-show translate-middle-y">
                                    <i className="bx bx-search" />
                                </span>
                            </div>
                            <div className="ms-auto">
                            {permission.includes("addbanner") ? <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                >
                                    <i className="bx bxs-plus-square" />
                                    Add Banner
                                </button> : "" }

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
                                                    Add Banner
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
                                                            <label htmlFor="imageUpload">Upload Image</label>
                                                            <input
                                                                className="form-control mb-3"
                                                                type="file"
                                                                accept="image/*"
                                                                id="imageUpload"
                                                                onChange={(e) => setTitle({ ...title, image: e.target.files[0] })}
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
                                                    onClick={AddBanner}
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
                                        aria-labelledby="exampleModalLabel"
                                        aria-hidden="true"
                                    >
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">
                                                        Update News
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
                                                                <label htmlFor="imageUpload">Image</label>
                                                                <input
                                                                    className="form-control mb-3"
                                                                    type="file"
                                                                    accept="image/*"
                                                                    id="imageUpload"
                                                                    onChange={(e) => {
                                                                        const file = e.target.files[0];
                                                                        if (file) {
                                                                            updateServiceTitle({ image: file });
                                                                        }
                                                                    }}
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
                                                        onClick={updatebanner}
                                                    >
                                                        Update Banner
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

export default Banner;
