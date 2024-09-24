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
            col_size: 3,
            disable: true,
        },
        {
            name: 'tag2',
            label: 'Target-2',
            type: 'number',
            label_size: 12,
            col_size: 3,
            disable: true,
        },
        {
            name: 'tag3',
            label: 'Target-3',
            type: 'number',
            label_size: 12,
            col_size: 3,
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

                <div style={{ marginTop: '100px' }}>
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
