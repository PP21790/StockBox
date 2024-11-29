import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Table from '../../../components/Table';
import { Tooltip } from 'antd';
import { clientdetailbyid, clientplandatabyid, getcategoryplan, getclientsubscription } from '../../../Services/Admin';
import { fDate, fDateTime } from '../../../Utils/Date_formate';




const Viewclientdetail = () => {
    
    const { id } = useParams();
    const token = localStorage?.getItem('token');

    const [data, setData] = useState([]);
    const [client, setClient] = useState([]);
    const [service, setService] = useState([]);

    useEffect(() => {
        getPlanDetail();
        getClientDetail();
        getclientservice()
    }, []);



    const getCategoryTitle = async (categoryId) => {
        try {
            const response = await getcategoryplan(token);
            if (response.status) {
                const category = response.data.find(item => item._id === categoryId);
                return category ? category.title : '-';
            }
        } catch (error) {
            console.error("Error fetching category title:", error);
        }
        return '-';
    };




    const getPlanDetail = async () => {
        try {
            const response = await clientplandatabyid(id, token);
            if (response.status) {
                const plansWithTitles = await Promise.all(
                    response.data.map(async (plan) => {
                        const categoryId = plan.planDetails?.category;
                        if (categoryId) {
                            const categoryTitle = await getCategoryTitle(categoryId);
                            return { ...plan, categoryTitle };
                        }
                        return plan;
                    })
                );
                setData(plansWithTitles);
            }
        } catch (error) {
            console.error("Error fetching plan details:", error);
        }
    };




    const getClientDetail = async () => {
        try {
            const response = await clientdetailbyid(id, token);
            if (response.status) {
                setClient([response.data])
            }
        } catch (error) {
            console.error("Error fetching client details:", error);
        }
    };



    const getclientservice = async () => {
        try {
            const response = await getclientsubscription(id, token);
            if (response.status) {
                setService(response.data);
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
        },
        {
            name: 'Plan Name',
            selector: row => row.categoryTitle || '-',
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
            name: 'Order_ID',
            selector: row => row.orderid ?? 'Assign By Admin',
            width: '189px'
        },

        {
            name: 'Purchase Date',
            selector: row => fDateTime(row.plan_start),
            width: '180px'
        },
        {
            name: 'Expiry Date',
            selector: row => fDateTime(row.plan_end),
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
                                            <Link to="/staff/dashboard">
                                                <i className="bx bx-home-alt" />
                                            </Link>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                        <Link to="/staff/client">
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


                        <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0">Service Name</h6>
                                <h6 className="mb-0">Expiry Date</h6>
                            </li>
                            {service && service.map((item) => (
                                <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0">{item?.serviceName}</h6>
                                    <span className="text-secondary">{fDateTime(item?.enddate)}</span>
                                </li>
                            ))}
                        </ul>

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
