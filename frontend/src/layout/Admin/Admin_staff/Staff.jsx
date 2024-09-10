import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GetStaff } from '../../../Services/Admin';
import Table from '../../../components/Table';
import { Pencil ,Trash2 } from 'lucide-react';
import { deleteStaff , updateStaffstatus} from '../../../Services/Admin';
import Swal from 'sweetalert2';

const Staff = () => {

    const navigate = useNavigate();



    const [clients, setClients] = useState([]);

    const token = localStorage.getItem('token');




    const getAdminclient = async () => {
        try {
            const response = await GetStaff(token);
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

   


    
// staff delete 

    const DeleteStaff = async (_id) => {
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
                const response = await deleteStaff(_id,token);
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
    

    

const updateStaff= async(row)=>{
    navigate("/admin/staff/updatestaff/" + row._id ,{ state: { row } })
}



// update status

const handleSwitchChange = async (event, id) => {

    const user_active_status = event.target.checked ? "1" : "0";

    const data = { id:id, status: user_active_status }
    const result = await Swal.fire({
        title: "Do you want to save the changes?",
        showCancelButton: true,
        confirmButtonText: "Save",
        cancelButtonText: "Cancel",
        allowOutsideClick: false,
    });

    if (result.isConfirmed) {
        try {
            const response = await updateStaffstatus(data, token)
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
            getAdminclient();
        } catch (error) {
            Swal.fire(
                "Error",
                "There was an error processing your request.",
                "error"
            );
        }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
        getAdminclient();
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
        },
        {
            name: 'Email',
            selector: row => row.Email,
            sortable: true,
        },
        {
            name: 'Phone No',
            selector: row => row.PhoneNo,
            sortable: true,
        },
        {
            name: 'Active Status',
            selector: row => (
              <div className="form-check form-switch form-check-info">
                <input
                  id={`rating_${row.ActiveStatus}`}
                  className="form-check-input"
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
          },
        {
            name: 'Created At',
            selector: row => new Date(row.createdAt).toLocaleDateString(),
            sortable: true,
        },
        {
            name: 'Updated At',
            selector: row => new Date(row.updatedAt).toLocaleDateString(),
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <>
                <div>
                 <Pencil onClick={() => updateStaff(row)} />
                </div>
               <div>
               <Trash2 onClick={() => DeleteStaff(row._id)} />
               </div>
               </>
            ),
        }
        
    ];


  return (
    <div>
        <div>
            <div>
                <div className="page-content">
                    {/* breadcrumb */}
                    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div className="breadcrumb-title pe-3">Staff</div>
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
                                        to="/admin/addstaff"
                                        className="btn btn-primary"
                                    >
                                        <i
                                            className="bx bxs-plus-square"
                                            aria-hidden="true"
                                        />
                                        Add Staff
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
    </div>
  )
}



export default Staff
