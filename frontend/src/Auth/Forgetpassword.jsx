import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { ForgetPasswordApi } from '../Services/Admin';

const Forgetpassword = () => {
    const token = localStorage.getItem('token');

    const UpdateForgetPassword = async (values, { resetForm }) => {
        try {
            const data = {
                Email: values.Email,
            };
            const response = await ForgetPasswordApi(data, token);

            if (response && response.status) {
                Swal.fire({
                    title: 'Success!',
                    text: response.message || 'Password reset email sent successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                });
                resetForm();
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: response.message || 'There was an error sending the password reset email.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'There was an error sending the password reset email.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };

    const validationSchema = Yup.object().shape({
        Email: Yup.string().email('Invalid email format').required('Email is required'),
    });

    return (
        <div>
            <div className="page-content">
                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Forget Password</div>
                    <div className="ps-3">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0 p-0">
                                <li className="breadcrumb-item active" aria-current="page">
                                    Profile
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-6 mx-auto">
                        <div className="card">
                            <div className="card-body p-4">
                                <Formik
                                    initialValues={{
                                        Email: '',
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={UpdateForgetPassword}
                                >
                                    {({ values, handleSubmit, isSubmitting }) => (
                                        <Form className="row g-3">
                                            <div className="col-md-12">
                                                <label htmlFor="Email" className="form-label">
                                                    Email Address
                                                </label>
                                                <div className="input-group">
                                                    <Field
                                                        type="email"
                                                        name="Email"
                                                        className="form-control"
                                                        placeholder="Enter your email"
                                                    />
                                                </div>
                                                <ErrorMessage name="Email" component="div" className="text-danger" />
                                            </div>

                                            <div className="col-md-12">
                                                <div className="d-md-flex d-grid align-items-center gap-3">
                                                    <button type="submit" className="btn btn-primary px-4" disabled={isSubmitting}>
                                                        {isSubmitting ? 'Sending...' : 'Send Email'}
                                                    </button>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forgetpassword;
