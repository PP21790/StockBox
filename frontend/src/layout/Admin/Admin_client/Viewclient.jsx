import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Table from '../../../components/Table';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import { clientdetailbyid } from '../../../Services/Admin';

const Viewclientdetail = () => {



    const { id } = useParams();
    const token = localStorage?.getItem('token');



    useEffect(() => {
        getsignaldetail();
    }, []);


    const getsignaldetail = async () => {
        try {
            const response = await clientdetailbyid(id, token);
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
            FullName: '',
            Email: '',
            PhoneNo: '',

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
            name: 'SignupsStatus',
            label: 'Signup Status',
            type: 'text',
            label_size: 12,
            col_size: 4,
            disable: true,
        },
        {
            name: 'CraeatedAt',
            label: 'Created At',
            type: 'text',
            label_size: 12,
            col_size: 4,
            disable: true,
        },
        {
            name: 'PlanName',
            label: 'Plan Name',
            type: 'text',
            label_size: 12,
            col_size: 4,
            disable: true,
        },
        {
            name: 'PurchaseDate',
            label: 'Purchase Date',
            type: 'text',
            label_size: 12,
            col_size: 4,
            disable: true,
        },
        {
            name: 'ExpiryDate',
            label: 'Expiry Date',
            type: 'text',
            label_size: 12,
            col_size: 4,
            disable: true,
        },
        {
            name: 'Amount',
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

                <div>
                    <DynamicForm
                        fields={fields}
                        page_title="Client Detail"
                        formik={formik}
                        sumit_btn={false}
                        additional_field={<></>}
                    />
                </div>
            </div>
        </div>
    );
}

export default Viewclientdetail;
