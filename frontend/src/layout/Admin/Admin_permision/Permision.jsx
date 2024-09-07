import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Permision = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    // Fetch users from the API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5001/user/add');
                setUsers(response.data); // Assuming the response data is an array of users
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    // Handle selection change
    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
    };

    return (
        <div>
            <div className="page-content">
                {/*breadcrumb*/}
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
                {/*end breadcrumb*/}
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
                                    {users.map((user) => (
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
    );
};

export default Permision;
