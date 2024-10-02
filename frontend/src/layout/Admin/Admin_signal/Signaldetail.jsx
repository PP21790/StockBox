import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Table from '../../../components/Table';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import { Signalperdetail } from '../../../Services/Admin';

const Signaldetail = () => {



    const { id } = useParams();
    const token = localStorage?.getItem('token');



    useEffect(() => {
        getsignaldetail();
    }, []);


    const getsignaldetail = async () => {
        try {
            const response = await Signalperdetail(id, token);
            if (response.status) {
                const clientData = response.data;
                Object.keys(clientData).forEach(key => {
                    if (formik.values.hasOwnProperty(key)) {
                        formik.setFieldValue(key, clientData[key], false);
                    }
                });
            }
        } catch (error) {
            console.log("Error fetching signal details:", error);
        }
    };



    const formik = useFormik({
        initialValues: {
            service: '',
            price: '',
            stock: '',
            tag1: '',
            tag2: '',
            tag3: '',
            stoploss: '',
            report: '',
            description: '',
            callduration: '',
            calltype: '',
            callperiod: ''
        },
    });

    const fields = [
        {
            name: 'callduration',
            label: 'Call Duration',
            type: 'text',
            label_size: 12,
            col_size: 6,
            disable: true,
        },
        {
            name: 'calltype',
            label: 'Type',
            type: 'text',
            label_size: 12,
            col_size: 6,
            disable: true,
        },
        {
            name: 'price',
            label: 'Rate',
            type: 'text',
            label_size: 12,
            col_size: 6,
            disable: true,
        },
        {
            name: 'stoploss',
            label: 'Stoploss',
            type: 'text',
            label_size: 12,
            col_size: 6,
            disable: true,
        },
        {
            name: 'tag1',
            label: 'Target-1',
            type: 'number',
            label_size: 6,
            col_size: 4,
            disable: true,
        },
        {
            name: 'tag2',
            label: 'Target-2',
            type: 'number',
            label_size: 12,
            col_size: 4,
            disable: true,
        },
        {
            name: 'tag3',
            label: 'Target-3',
            type: 'number',
            label_size: 12,
            col_size: 4,
            disable: true,
        },

    ];




    return (
        <div>
            <div className="page-content">
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

                <hr />
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="card radius-15">
                            <div className="card-body ">
                                <div className='p-4 border radius-15'>
                                    <div className="row">
                                        <div className="card-body col-md-6">


                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">
                                                        Segment

                                                    </h6>
                                                    <span className="text-secondary">Cash</span>
                                                </li>

                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">
                                                        Type
                                                    </h6>
                                                    <span className="text-secondary">Buy</span>
                                                </li>

                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">
                                                        Entry Price
                                                    </h6>
                                                    <span className="text-secondary">10</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">
                                                        Entry Date & Time
                                                    </h6>
                                                    <span className="text-secondary">20/03/2024<br />

                                                    </span>
                                                </li>

                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">
                                                        Target-1
                                                    </h6>
                                                    <span className="text-secondary">97</span>
                                                </li>

                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">
                                                        Target-3
                                                    </h6>
                                                    <span className="text-secondary">93</span>
                                                </li>

                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">
                                                        Discription
                                                    </h6>
                                                    <span className="text-secondary">Lorem ipsum dolor sit amet.</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="card-body col-md-6">


                                            <ul className="list-group list-group-flush">

                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">
                                                        Stock Name
                                                    </h6>
                                                    <span className="text-secondary">qdqdq</span>
                                                </li>

                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">
                                                        Trade Duration
                                                    </h6>
                                                    <span className="text-secondary">Long Term</span>
                                                </li>

                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">
                                                        Exit Price
                                                    </h6>
                                                    <span className="text-secondary">9</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">
                                                        Exit Date & Time
                                                    </h6>
                                                    <span className="text-secondary">20/03/2024<br />

                                                    </span>
                                                </li>

                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">
                                                        Target-2
                                                    </h6>
                                                    <span className="text-secondary">92</span>
                                                </li>

                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">
                                                        Stoploss
                                                    </h6>
                                                    <span className="text-secondary">19</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">
                                                        Uploaded Document
                                                    </h6>
                                                    <span>

                                                    </span>
                                                </li>


                                            </ul>
                                        </div>
                                        <hr />
                                    </div>

                                    <div className="row">
                                        <div className='col-lg-12'>
                                            <div className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 className="ms-3">
                                                    Total Gain
                                                </h6>
                                                <h6 className="text-secondary me-2">80 INR</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>


                <div>
                    <DynamicForm
                        fields={fields}
                        page_title="Signal Detail"
                        formik={formik}
                        sumit_btn={false}
                        additional_field={<></>}
                    />
                </div>
            </div>
        </div>
    );
}

export default Signaldetail;
