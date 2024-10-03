import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import DynamicForm from '../../../components/FormicForm';
import { useFormik } from 'formik';
import { clientdetailbyid } from '../../../Services/Admin';

const Viewclientdetail = () => {
    const { id } = useParams();
    const token = localStorage?.getItem('token');
    
    const [data, setData] = useState(null);

    useEffect(() => {
        getsignaldetail();
    }, []);

    const getsignaldetail = async () => {
        try {
            const response = await clientdetailbyid(id, token);
            if (response.status) {
                console.log("data", response.data);
                setData(response.data); 
            }
        } catch (error) {
            console.log("Error fetching signal details:", error);
        }
    };

    const formik = useFormik({
        initialValues: {
            FullName: data?.FullName || '',
            Email: data?.Email ||  '',
            PhoneNo: data?.PhoneNo || '',
            wamount:  data?.wamount || '',
        },
        enableReinitialize: true,
        onSubmit: (values) => {
        },
    });

   

    const fields = [
        {
            name: 'FullName',
            label: 'Full Name',
            type: 'text',
            label_size: 12,
            col_size: 4,
            disable: true,
        },
        {
            name: 'Email',
            label: 'Email',
            type: 'text',
            label_size: 12,
            col_size: 4,
            disable: true,
        },
        {
            name: 'PhoneNo',
            label: 'Phone Number',
            type: 'text',
            label_size: 12,
            col_size: 4,
            disable: true,
        },
        {
            name: 'wamount',
            label: 'Amount',
            type: 'text',
            label_size: 12,
            col_size: 4,
            disable: true,
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
                                <div className="col-md-4 d-flex align-items-center">
                                    <div>
                                        <strong>Full Name</strong>
                                    </div>
                                    <div>
                                        <p className='my-0 ms-4'>qdwqdf</p>
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex  align-items-center">
                                    <div>
                                        <strong>Email</strong>
                                    </div>
                                    <div>
                                        <p className='my-0 ms-4'>fff@gmail.com</p>
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex align-items-center">
                                    <div>
                                        <strong>Phone No</strong>
                                    </div>
                                    <div>
                                        <p className='my-0 ms-4'>7894563210</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='card'>
                    <div className="card-body">
                        <DynamicForm
                            fields={fields}
                            formik={formik}
                            sumit_btn={false}
                            additional_field={<></>}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Viewclientdetail;
