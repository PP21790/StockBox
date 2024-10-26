import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Table from '../../../components/Table';
import { Tooltip } from 'antd';
import { clientdetailbyid, clientplandatabyid, getcategoryplan } from '../../../Services/Admin';
import { fDate } from '../../../Utils/Date_formate';

const Viewclientdetail = () => {
    const { id } = useParams();
    const token = localStorage?.getItem('token');

    const [data, setData] = useState([]);
    const [client, setClient] = useState([]);
    const [categoryTitle, setCategoryTitle] = useState('');



    useEffect(() => {
        getPlanDetail();
        getClientDetail();
    }, []);




    const getCategoryPlanList = async (categoryId) => {
        try {
            const response = await getcategoryplan(token);
            if (response.status) {
                const filteredTitles = response.data
                    .filter(item => item._id === categoryId)
                    .map(item => item.title);

                if (filteredTitles.length) {
                    setCategoryTitle(filteredTitles[0]);
                    console.log("Filtered Titles:", filteredTitles);
                } else {
                    console.log("No matching category title found.");
                }
            }
        } catch (error) {
            console.error("Error fetching category plans:", error);
        }
    };

    const getPlanDetail = async () => {
        try {
            const response = await clientplandatabyid(id, token);
            if (response.status) {
                setData(response.data);
                const categoryId = response.data[0]?.planDetails?.category ?? '';
                if (categoryId) getCategoryPlanList(categoryId);
            }
        } catch (error) {
            console.error("Error fetching plan details:", error);
        }
    };

    const getClientDetail = async () => {
        try {
            const response = await clientdetailbyid(id, token);
            if (response.status) {
                setClient([response.data]);
            }
        } catch (error) {
            console.error("Error fetching client details:", error);
        }
    };

    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            width: '100px'
        }
        ,
        {
            name: 'Plan Name',
            selector: () => categoryTitle || '-',
            width: '180px'
        },
        {
            name: 'Amount',
            selector: row => row.plan_price ?? '-',
            width: '189px'
        },
        {
            name: 'Validity Date',
            selector: row => row.planDetails?.validity ?? '-',
            width: '180px'
        },
        {
            name: 'Purchase Date',
            selector: row => fDate(row.plan_start),
            width: '180px'
        },
        {
            name: 'Expiry Date',
            selector: row => fDate(row.plan_end),
            width: '180px'
        },
    ];

    return (
        <div>
            <div className="page-content">
                <div className="row">
                    <div className="col-md-6">
                        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                            <div className="breadcrumb-title pe-3">Client Detail</div>
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
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                        <Link to="/admin/client">
                            <Tooltip title="Back">
                                <i className="lni lni-arrow-left-circle" style={{ fontSize: "2rem" }} />
                            </Tooltip>
                        </Link>
                    </div>
                </div>

                <div className="card radius-15">
                    <div className="card-body">
                        <div className="p-4 border radius-15">
                            <div className="row justify-content-center align-items-center">
                                {client.map(({ id, FullName, Email, PhoneNo }) => (
                                    <div key={id} className="row">
                                        <div className="col-md-4 d-flex align-items-center">
                                            <strong>Full Name</strong>
                                            <p className='my-0 ms-4'>{FullName}</p>
                                        </div>
                                        <div className="col-md-4 d-flex align-items-center">
                                            <strong>Email</strong>
                                            <p className='my-0 ms-4'>{Email}</p>
                                        </div>
                                        <div className="col-md-4 d-flex align-items-center">
                                            <strong>Phone No</strong>
                                            <p className='my-0 ms-4'>{PhoneNo}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="card">
                    <div className="card-body">
                        <Table columns={columns} data={data} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Viewclientdetail;
