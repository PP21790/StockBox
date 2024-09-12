import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GetStaff } from '../../../Services/Admin';
import Table from '../../../components/Table';




const Permision = () => {


    const [clients, setClients] = useState([]);

    const [selectedUser, setSelectedUser] = useState('');

    const token = localStorage.getItem('token');

    const [model, setModel] = useState(false)
    const [filter, setFilter] = useState("")
            
   


    const getstafflist = async () => {
        try {
            const response = await GetStaff(token);
            if (response.status) {
                const filterdata  = response.data && response.data.filter((item)=>{
                    return item._id === selectedUser
                })
                setFilter(filterdata)
                setClients(response.data);
            }
        } catch (error) {
            console.log("error");
        }
    }

    useEffect(() => {
        getstafflist();
    }, []);



    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
        setModel(true)
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
            name: 'Created At',
            selector: row => new Date(row.createdAt).toLocaleDateString(),
            sortable: true,
        },
        {
            name: 'Updated At',
            selector: row => new Date(row.updatedAt).toLocaleDateString(),
            sortable: true,
        },
        
        
    ];


    


    return (
        <>
            <div>
                <div className="page-content">
                    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div className="breadcrumb-title pe-3">Permission</div>
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
                            <div className="row">
                                <div className="col-lg-6">
                                    <label htmlFor="selectProfile">Select Profile</label>
                                    <select
                                        className="form-select mb-3"
                                        id="selectProfile"
                                        value={selectedUser}
                                        onChange={handleUserChange}
                                    >
                                        <option value="" disabled>
                                            Open this select menu
                                        </option>
                                        {clients.map((user) => (
                                            <option key={user._id} value={user._id}>
                                                {user.FullName} ({user.UserName})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {model && <div>

                {/* <Table
                    columns={columns}
                    data={filter}
                /> */}
            </div>}
        </>
    );
};

export default Permision;
