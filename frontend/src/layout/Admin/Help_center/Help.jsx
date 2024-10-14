import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHelpMessagelist } from '../../../Services/Admin';
import Table from '../../../components/Table';
import { Tooltip } from 'antd';
import { Eye } from 'lucide-react';
import { fDate } from '../../../Utils/Date_formate';



const Help = () => {

    const token = localStorage.getItem('token');

    const [clients, setClients] = useState([]);
    const [searchInput, setSearchInput] = useState("");


    const getdemoclient = async () => {
        try {
            const response = await getHelpMessagelist(token);
            if (response.status) {

                const filterdata = response.data.filter((item) =>
                    searchInput === "" ||
                    item.clientDetails.FullName.toLowerCase().includes(searchInput.toLowerCase()) ||
                    item.clientDetails.Email.toLowerCase().includes(searchInput.toLowerCase()) ||
                    item.message.toLowerCase().includes(searchInput.toLowerCase()) ||
                    item.subject.toLowerCase().includes(searchInput.toLowerCase())
                );
                setClients(searchInput ? filterdata : response.data);
            }
        } catch (error) {
            console.log("error", error);
        }
    }


    useEffect(() => {
        getdemoclient();

    }, [searchInput]);



    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '100px',
        },
        {
            name: 'Full Name',
            selector: row => row.clientDetails.FullName,
            sortable: true,
            width: '165px',
        },
        {
            name: 'Email',
            selector: row => row.clientDetails.Email,
            sortable: true,
            width: '300px',
        },
        {
            name: 'Subject',
            selector: row => row.subject,
            sortable: true,
            width: '243px',
        },
        {
            name: 'Message',
            selector: row => row.message,
            sortable: true,
            width: '243px',
        },
        {
            name: 'Phone No',
            selector: row => row.clientDetails.PhoneNo,
            sortable: true,
        },


        {
            name: 'CreatedAt',
            selector: row => fDate(row.created_at),
            sortable: true,
            width: '200px',
        },
        {
            name: 'Actions',
            cell: row => (
                <>
                    <div>
                        <Tooltip placement="top" overlay="View">
                            <Eye style={{ marginRight: "10px" }} />
                        </Tooltip>
                    </div>


                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }

    ];




    return (
        <div>


            <div>
                <div>
                    <div>
                        <div className="page-content">
                            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                                <div className="breadcrumb-title pe-3">Help Message</div>
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
                                                placeholder="Search message"
                                                onChange={(e) => setSearchInput(e.target.value)}
                                                value={searchInput}
                                            />
                                            <span className="position-absolute top-50 product-show translate-middle-y">
                                                <i className="bx bx-search" />
                                            </span>
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

        </div>
    );
}

export default Help;
