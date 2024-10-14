import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Table from '../../../components/Table';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import { clientdetailbyid, clientplandatabyid } from '../../../Services/Admin';
import { fDateTime, fDate } from '../../../Utils/Date_formate';

const Viewclientdetail = () => {



    const { id } = useParams();
    const token = localStorage?.getItem('token');

    const [data, setData] = useState([])
    const [client,setClient] = useState([])


    useEffect(() => {
        getsignaldetail();
        getplandetail()
    }, []);


    const getplandetail = async () => {
        try {
            const response = await clientplandatabyid(id, token);
            if (response.status) {
                setData(response.data)


            }
        } catch (error) {
            console.log("Error fetching signal details:", error);
        }
    };



    const getsignaldetail = async () => {
        try {
            const response = await clientdetailbyid(id, token);
            if (response.status) {
                setClient([response.data])
            }
        } catch (error) {
            console.log("Error fetching signal details:", error);
        }
    };





    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '100px',
        },
        {
            name: 'Plan Name',
            selector: row => row.planDetails.title,
            sortable: true,
            width: '180px',
        },
        {
            name: 'Amount',
            selector: row => row.plan_price,
            sortable: true,
            width: '189px',
        },
        {
            name: 'Validity Date',
            selector: row => row.planDetails.validity,
            sortable: true,
            width: '180px',
        },
        {
            name: 'Purchase Date',
            selector: row => fDate(row.plan_start),
            sortable: true,
            width: '180px',
        },

        {
            name: 'Expiry Date',
            selector: row => fDate(row.plan_end),
            sortable: true,
            width: '180px',
        },
    ];



    return (
        <div>
            <div className="page-content">
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
                <div className="card radius-15">
                    <div className="card-body">
                        <div className="p-4 border radius-15">
                            <div className="row justify-content-center align-items-center">
                                {client && client.map((item) => (
                                    <div key={item.id} className="row">
                                        <div className="col-md-4 d-flex align-items-center">
                                            <div>
                                                <strong>Full Name</strong>
                                            </div>
                                            <div>
                                                <p className='my-0 ms-4'>{item.FullName}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4 d-flex align-items-center">
                                            <div>
                                                <strong>Email</strong>
                                            </div>
                                            <div>
                                                <p className='my-0 ms-4'>{item.Email}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4 d-flex align-items-center">
                                            <div>
                                                <strong>Phone No</strong>
                                            </div>
                                            <div>
                                                <p className='my-0 ms-4'>{item.PhoneNo}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>

                <div className='card'>
                    <div className="card-body">

                        <Table
                            columns={columns}
                            data={data}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Viewclientdetail;