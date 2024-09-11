import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { GetClient } from '../../../Services/Admin';
import Table from '../../../components/Table';
import { Eye, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { Signalperdetail } from '../../../Services/Admin';

const Signaldetail = () => {


    const { id } = useParams()

    const [clients, setClients] = useState([]);

    const token = localStorage.getItem('token');



    const getsignaldetail = async () => {
        try {
            const response = await Signalperdetail(id, token);
            if (response.status) {
                setClients([response.data]);
            } 
        } catch (error) {
            console.log("Error fetching signal details:", error);
        }
    };


    
    useEffect(() => {
        getsignaldetail();
    }, [id]);



    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '70px',
        },
        {
            name: 'Call Duration',
            selector: row => row.callduration,
            sortable: true,
        },
        {
            name: 'Type',
            selector: row => row.calltype,
            sortable: true,
        },
        {
            name: 'Rate',
            selector: row => row.price,
            sortable: true,
        },
        {
            name: 'Stoploss',
            selector: row => row.stoploss,
            sortable: true,
        },
        {
            name: 'tag1',
            selector: row => row.tag1,
            sortable: true,
        },
        {
            name: 'tag2',
            selector: row => row.tag2,
            sortable: true,
        },
        {
            name: 'tag3',
            selector: row => row.tag3,
            sortable: true,
        },
        {
            name: 'targetprice',
            selector: row => row.targetprice,
            sortable: true,
        },
        {
            name: 'Close Date',
            selector: row => new Date(row.closedate).toLocaleDateString(),
            sortable: true,
        },
        
        {
            name: 'Updated At',
            selector: row => new Date(row.updated_at).toLocaleDateString(),
            sortable: true,
        },

        

    ];

    return (
        <div>
            <div>
                <div className="page-content">
                    {/* breadcrumb */}
                    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div className="breadcrumb-title pe-3">Signal Detail</div>
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
    );
}

export default Signaldetail;
