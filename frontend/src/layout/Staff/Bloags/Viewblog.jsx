import React from 'react';
import { useFormik } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { image_baseurl } from '../../../Utils/config';

const Viewblog = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { row } = location.state;  

    return (
        <div className="page-content">
            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div className="breadcrumb-title pe-3">Blog Details</div>
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
            <hr />
            <div className="row">
                <div className="col-lg-8 mx-auto">
                    <div className="card radius-15">
                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                title: row.title || '',
                                description: row.description || '',
                                image: row.image || '',
                            }}
                        >
                            {({ values }) => (
                                <Form className="card-body p-4">
                                    <div className="p-4 border radius-15">
                                        {/* Title */}
                                        <div className="row mb-3 align-items-center">
                                            <label htmlFor="title" className="col-sm-3 col-form-label">
                                                <b>Title</b>
                                            </label>
                                            <div className="col-sm-9">
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="fadeIn animated bx bx-building" />
                                                    </span>
                                                    <Field
                                                        name="title"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Blog Title"
                                                    />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row mb-3 align-items-center">
                                            <label htmlFor="description" className="col-sm-3 col-form-label">
                                                <b>Description</b>
                                            </label>
                                            <div className="col-sm-9">
                                                <div className="input-group">
                                                    <div
                                                        className="form-control"
                                                        style={{ width: "100%" }}
                                                        dangerouslySetInnerHTML={{ __html: row.description || "" }}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row mb-3 align-items-center">
                                            <label htmlFor="image" className="col-sm-3 col-form-label">
                                                <b>Image</b>
                                            </label>
                                            <div className="col-sm-9">
                                                <div className="input-group">
                                                    {row.image && (
                                                        <div className="file-preview">
                                                            <img
                                                                src={`${image_baseurl}uploads/blogs/${row.image}`}
                                                                alt="Image Preview"
                                                                className="image-preview"
                                                            />
                                                        </div>
                                                    )}
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
                .file-preview {
                    width: 100px;
                    height: 100px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    overflow: hidden;
                    margin-top: 10px;
                }
                .image-preview {
                    width: 100%;
                    height: auto;
                }
                .error {
                    color: red;
                    font-size: 12px;
                }
            `}</style>
        </div>
    );
};

export default Viewblog;
