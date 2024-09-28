import React, { useEffect, useState } from 'react';
import { basicsettinglist, UpdateEmailSettings } from '../../../Services/Admin';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';




const Emailsettings = () => {


  const token = localStorage.getItem('token');
  const user_id = localStorage.getItem('id');
  const navigate = useNavigate();


  const [clients, setClients] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);



  const getsettingdetail = async () => {
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
    getsettingdetail();
  }, []);

  const validationSchema = Yup.object().shape({
    smtp_host: Yup.string().required('SMTP Host is required'),
    smtp_port: Yup.string().required('SMTP Port is required'),
    smtp_username: Yup.string().required('SMTP Username is required'),
    to_mail: Yup.string().email('Invalid email').required('To Email is required'),
    encryption: Yup.string().required('Encryption method is required'),
    smtp_password: Yup.string().required('SMTP Password is required'),
  });

  if (!clients) {
    return <div>Loading...</div>;
  }

  return (
    <div className='page-content'>
      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3">Email Settings</div>
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
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card">

            <Formik
              enableReinitialize={true}
              initialValues={{
                id: user_id,
                smtp_host: clients[0].smtp_host || '',
                smtp_port: clients[0].smtp_port || '',
                smtp_username: clients[0].smtp_username || '',
                to_mail: clients[0].to_mail || '',
                encryption: clients[0].encryption || '',
                smtp_password: clients[0].smtp_password || '',
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                const req = {
                  smtp_host: values.smtp_host,
                  smtp_port: values.smtp_port,
                  smtp_username: values.smtp_username,
                  to_mail: values.to_mail,
                  encryption: values.encryption,
                  smtp_password: values.smtp_password,
                  id: user_id,
                };

                try {
                  const response = await UpdateEmailSettings(req, token);
                  if (response.status) {
                    Swal.fire({
                      title: "Update Successful!",
                      text: response.message,
                      icon: "success",
                      timer: 1500,
                      timerProgressBar: true,
                    });
                  } else {
                    Swal.fire({
                      title: "Error",
                      text: response.message,
                      icon: "error",
                      timer: 1500,
                      timerProgressBar: true,
                    });
                  }
                } catch (error) {
                  Swal.fire({
                    title: "Error",
                    text: "An unexpected error occurred. Please try again later.",
                    icon: "error",
                    timer: 1500,
                    timerProgressBar: true,
                  });
                }
              }}
            >
              {({ values }) => (
                <Form className="card-body">
                  <h5 className="mb-4">Email Setting</h5>
                  <div className="row">

                    <div className="row mb-1 align-items-center">
                      <label htmlFor="smtp_host" className="col-sm-3 col-form-label">SMTP Host</label>
                      <div className="col-sm-9">
                        <Field name="smtp_host" type="text" className="form-control mb-2" />
                      </div>
                      <ErrorMessage name="smtp_host" component="div" className="error" />

                    </div>

                    <div className="row mb-1 align-items-center">
                      <label htmlFor="smtp_port" className="col-sm-3 col-form-label">SMTP Port</label>
                      <div className="col-sm-9">
                        <Field name="smtp_port" type="text" className="form-control" />
                      </div>
                      <ErrorMessage name="smtp_port" component="div" className="error" />
                    </div>

                    <div className="row mb-1 align-items-center">
                      <label htmlFor="smtp_username" className="col-sm-3 col-form-label">SMTP Username</label>
                      <div className="col-sm-9">
                        <Field name="smtp_username" type="text" className="form-control" />
                      </div>
                      <ErrorMessage name="smtp_username" component="div" className="error" />
                    </div>

                    <div className="row mb-1 align-items-center">
                      <label htmlFor="to_mail" className="col-sm-3 col-form-label">To Email</label>
                      <div className="col-sm-9">
                        <Field name="to_mail" type="email" className="form-control" />
                      </div>
                      <ErrorMessage name="to_mail" component="div" className="error" />
                    </div>

                    <div className="row mb-1 align-items-center">
                      <label htmlFor="encryption" className="col-sm-3 col-form-label">Encryption</label>
                      <div className="col-sm-9">
                        <Field name="encryption" type="text" className="form-control" />
                      </div>
                      <ErrorMessage name="encryption" component="div" className="error" />
                    </div>

                    <div className="row mb-1 align-items-center password-group">
                      <label htmlFor="smtp_password" className="col-sm-3 col-form-label">SMTP Password</label>
                      <div style={{ position: 'relative' }} className="col-sm-9">

                        <Field
                          name="smtp_password"
                          type={passwordVisible ? 'text' : 'password'}
                          className="form-control"
                        />
                        <span
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          style={{ position: 'absolute', right: '18px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                        >
                          <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
                        </span>
                      </div>
                      <ErrorMessage name="smtp_password" component="div" className="error" />
                    </div>

                    <div className="row mt-2">
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

            <style jsx>{`
        .general-settings {
          width: 50%;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
        }
        .header {
          text-align: center;
          font-size: 24px;
          margin-bottom: 20px;
        }
        .form-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
        }
        .form-control, .form-control-file {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .btn {
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .file-preview {
          margin-top: 10px;
          font-size: 14px;
          color: #555;
        }
       .image-preview {
    width: 42px;
    height: auto;
    margin-top: -10px;
}
        .error {
          color: red;
          font-size: 12px;
        }
      `}</style>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emailsettings; 
