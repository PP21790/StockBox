import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { basiclist } from '../../../Services/Admin';
import Table from '../../../components/Table';
import { SquarePen, Trash2, PanelBottomOpen } from 'lucide-react';
import Swal from 'sweetalert2';



const Basicsetting = () => {



    const navigate = useNavigate();

    const [clients, setClients] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    
   

    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('id');





    // Getting services
    const getsettingdetail = async () => {
        try {
            const response = await basiclist(token);
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

    useEffect(() => {
        getsettingdetail();
    }, [searchInput]);

    // delete news

    // const DeleteService = async (_id) => {
    //     // console.log("_id",_id)
    //     try {
    //         const result = await Swal.fire({
    //             title: 'Are you sure?',
    //             text: 'Do you want to delete this ? This action cannot be undone.',
    //             icon: 'warning',
    //             showCancelButton: true,
    //             confirmButtonText: 'Yes, delete it!',
    //             cancelButtonText: 'No, cancel',
    //         });

    //         if (result.isConfirmed) {
    //             const response = await DeleteNews(_id, token);
    //             if (response.status) {
    //                 Swal.fire({
    //                     title: 'Deleted!',
    //                     text: 'The staff has been successfully deleted.',
    //                     icon: 'success',
    //                     confirmButtonText: 'OK',
    //                 });
    //                 getNews();

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

    

    console.log("clients",clients)

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
        // {
        //     name: 'Active Status',
        //     selector: row => (
        //         <div className="form-check form-switch form-check-info">
        //             <input
        //                 id={`rating_${row.status}`}
        //                 className="form-check-input toggleswitch"
        //                 type="checkbox"
        //                 checked={row.status === true}
        //                 onChange={(event) => handleSwitchChange(event, row._id)}
        //             />
        //             <label
        //                 htmlFor={`rating_${row.status}`}
        //                 className="checktoggle checkbox-bg"
        //             ></label>
        //         </div>
        //     ),
        //     sortable: true,
        // },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        // {
        //     name: 'Image',
        //     cell: row => <img src={`/assets/uploads/news/${row.image}`} alt="Image" width="50" height="50" />,
        //     sortable: true,
        // },
        

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
        // {
        //     name: 'Actions',
        //     cell: row => (
        //         <>
        //             <div>
        //                 <SquarePen
        //                     onClick={() => {
        //                         setModel(true);
        //                         setServiceid(row);
        //                         setUpdatetitle({ title: row.title, id: row._id, description: row.description, image: row.image });
        //                     }}
        //                 />
        //             </div>
        //             <div>
        //                 <Trash2 onClick={() => DeleteService(row._id)} />
        //             </div>
        //         </>
        //     ),
        //     ignoreRowClick: true,
        //     allowOverflow: true,
        //     button: true,
        // }
    ];



    // const updateServiceTitle = (updatedField) => {
    //     setUpdatetitle(prev => ({
    //         ...prev,
    //         ...updatedField
    //     }));
    // };




    return (
        <div>
            <div className="page-content">

                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Basic Setting</div>
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
                                    Add Setting
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
                                                    Add Setting
                                                </h5>
                                                <button
                                                    type="button"
                                                    className="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                />
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
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

export default Basicsetting;
