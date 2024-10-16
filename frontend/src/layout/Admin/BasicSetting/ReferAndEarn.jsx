import React, { useEffect, useState } from 'react';
import { basicsettinglist, UpdatereferAndEarn } from '../../../Services/Admin';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const ReferAndEarn = () => {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('id');
    const navigate = useNavigate();
    const [clients, setClients] = useState(null);

    const getsettinglist = async () => {
        try {
            const response = await basicsettinglist(token);
            if (response.status) {
                setClients(response.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        getsettinglist();
    }, []);

    const validationSchema = Yup.object().shape({
        sender_earn: Yup.string().required('Sender is required'),
        receiver_earn: Yup.string().required('Receiver is required'),
        refer_title: Yup.string().required('Title is required'),
        refer_description: Yup.string().required('Description is required'),
        refer_image: Yup.mixed()
            .required('Image is required')
            .test(
                'fileFormat',
                'Unsupported Format',
                (value) =>
                    !value ||
                    (value && ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(value.type))
            ),
    });

    if (!clients) {
        return <div>Loading...</div>;
    }

    return (
        <div className="page-content">
            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div className="breadcrumb-title pe-3">Refer And Earn</div>
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
            <div className="row">
                <div className="col-lg-8 mx-auto">
                    <div className="card radius-15">
                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                sender_earn: clients[0].sender_earn || '',
                                receiver_earn: clients[0].receiver_earn || '',
                                refer_title: clients[0].refer_title || '',
                                refer_description: clients[0].refer_description || '',
                                refer_image: null,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={async (values) => {
                                const req = {
                                    sender_earn: values.sender_earn,
                                    receiver_earn: values.receiver_earn,
                                    refer_title: values.refer_title,
                                    refer_description: values.refer_description,
                                    refer_image: values.refer_image,
                                };

                                try {
                                    const response = await UpdatereferAndEarn(req, token);
                                    if (response.status) {
                                        Swal.fire({
                                            title: 'Update Successful!',
                                            text: response.message,
                                            icon: 'success',
                                            timer: 1500,
                                            timerProgressBar: true,
                                        });
                                    } else {
                                        Swal.fire({
                                            title: 'Error',
                                            text: response.message,
                                            icon: 'error',
                                            timer: 1500,
                                            timerProgressBar: true,
                                        });
                                    }
                                } catch (error) {
                                    Swal.fire({
                                        title: 'Error',
                                        text: 'An unexpected error occurred. Please try again later.',
                                        icon: 'error',
                                        timer: 1500,
                                        timerProgressBar: true,
                                    });
                                }
                            }}
                        >
                            {({ setFieldValue, values }) => (
                                <Form className="card-body p-4">
                                    <div className="p-4 border radius-15">
                                        <div className="row mb-3 align-items-center">
                                            <label htmlFor="refer_title" className="col-sm-3 col-form-label">
                                                <b>Title</b>
                                            </label>
                                            <div className="col-sm-9">
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="fadeIn animated bx bx-building" />
                                                    </span>
                                                    <Field
                                                        name="refer_title"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Title"
                                                    />
                                                </div>
                                                <ErrorMessage name="refer_title" component="div" className="error" />
                                            </div>
                                        </div>

                                        <div className="row mb-3 align-items-center">
                                            <label htmlFor="sender_earn" className="col-sm-3 col-form-label">
                                                <b>Sender Earn</b>
                                            </label>
                                            <div className="col-sm-9">
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="fadeIn animated bx bx-phone" />
                                                    </span>
                                                    <Field
                                                        name="sender_earn"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Sender"
                                                    />
                                                </div>
                                                <ErrorMessage name="sender_earn" component="div" className="error" />
                                            </div>
                                        </div>

                                        <div className="row mb-3 align-items-center">
                                            <label htmlFor="receiver_earn" className="col-sm-3 col-form-label">
                                                <b>Receiver Earn</b>
                                            </label>
                                            <div className="col-sm-9">
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="bx bx-envelope" />
                                                    </span>
                                                    <Field
                                                        name="receiver_earn"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Receiver"
                                                    />
                                                </div>
                                                <ErrorMessage name="receiver_earn" component="div" className="error" />
                                            </div>
                                        </div>

                                        <div className="row mb-3 align-items-center">
                                            <label htmlFor="refer_description" className="col-sm-3 col-form-label">
                                                <b>Description</b>
                                            </label>
                                            <div className="col-sm-9">
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="bx bx-envelope" />
                                                    </span>
                                                    <Field
                                                        name="refer_description"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Description"
                                                    />
                                                </div>
                                                <ErrorMessage
                                                    name="refer_description"
                                                    component="div"
                                                    className="error"
                                                />
                                            </div>
                                        </div>

                                        <div className="row mb-3 align-items-center">
                                            <label htmlFor="refer_image" className="col-sm-3 col-form-label">
                                                <b>Image</b>
                                            </label>
                                            <div className="col-sm-8">
                                                <input
                                                    name="refer_image"
                                                    type="file"
                                                    className="form-control"
                                                    onChange={(event) =>
                                                        setFieldValue('refer_image', event.currentTarget.files[0])
                                                    }
                                                />
                                            </div>
                                            <div className="col-sm-1">
                                                {clients[0].refer_image && (
                                                    <div className="file-preview">
                                                        <img
                                                            src={`/assets/uploads/basicsetting/${clients[0].refer_image}`}
                                                            alt="Image Preview"
                                                            className="image-preview"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <label className="col-sm-3 col-form-label" />
                                            <div className="col-sm-9">
                                                <div className="d-md-flex d-grid align-items-center justify-content-end gap-3">
                                                    <button type="submit" className="btn btn-primary px-4">
                                                        Update
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .general-settings {
                    width: 50%;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-radius: 8px;
                }

                .error {
                    color: red;
                    font-size: 12px;
                }

                .file-preview {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                }

                .image-preview {
                    width: 40px;
                    height: 40px;
                    object-fit: cover;
                    border-radius: 4px;
                }
            `}</style>
        </div>
    );
};

export default ReferAndEarn;
