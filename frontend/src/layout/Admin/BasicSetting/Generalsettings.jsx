import React, { useEffect, useState } from 'react';
import { basicsettinglist, Updatebasicsettings } from '../../../Services/Admin';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Generalsettings = () => {
  const token = localStorage.getItem('token');
  const user_id = localStorage.getItem('id');
  const navigate = useNavigate();

  const [clients, setClients] = useState(null);

  const getAdminclient = async () => {
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
    getAdminclient();
  }, []);

  const validationSchema = Yup.object().shape({
    from_name: Yup.string().required('From Name is required'),
    address: Yup.string().required('Address is required'),
    contact_number: Yup.string().required('Contact Number is required'),
    email_address: Yup.string().email('Invalid email').required('Email Address is required'),
    favicon: Yup.mixed().required('Favicon is required').test(
      "fileFormat",
      "Unsupported Format",
      value => !value || (value && ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(value.type))
    ),
    logo: Yup.mixed().required('Logo is required').test(
      "fileFormat",
      "Unsupported Format",
      value => !value || (value && ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(value.type))
    ),
  });

  if (!clients) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <div className="general-settings">
        <h2 className="header">General Settings</h2>
        <Formik
          enableReinitialize={true}
          initialValues={{
            id: user_id,
            from_name: clients[0].from_name || '',
            address: clients[0].address || '',
            contact_number: clients[0].contact_number || '',
            email_address: clients[0].email_address || '',
            favicon: null,
            logo: null,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            const req = {
              from_name: values.from_name,
              address: values.address,
              contact_number: values.contact_number,
              email_address: values.email_address,
              favicon: values.favicon,
              logo: values.logo,
              id: user_id,
            };

            try {
              const response = await Updatebasicsettings(req, token);
              if (response.status) {
                Swal.fire({
                  title: "Update Successful!",
                  text: response.message,
                  icon: "success",
                  timer: 1500,
                  timerProgressBar: true,
                });
                setTimeout(() => {
                  navigate("/admin/client");
                }, 1500);
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
          {({ setFieldValue, values }) => (
            <Form className="form-container">
              <div className="form-group">
                <label htmlFor="from_name">From Name</label>
                <Field name="from_name" type="text" className="form-control" />
                <ErrorMessage name="from_name" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <Field name="address" type="text" className="form-control" />
                <ErrorMessage name="address" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="contact_number">Contact Number</label>
                <Field name="contact_number" type="text" className="form-control" />
                <ErrorMessage name="contact_number" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="email_address">Email Address</label>
                <Field name="email_address" type="email" className="form-control" />
                <ErrorMessage name="email_address" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="favicon">Favicon</label>
                <input
                  name="favicon"
                  type="file"
                  className="form-control-file"
                  onChange={(event) => setFieldValue("favicon", event.currentTarget.files[0])}
                />
                {clients[0].favicon && (
                  <div className="file-preview">
                    <p>Current Favicon:</p>
                    <img src={`/path/to/images/${clients[0].favicon}`} alt="Favicon Preview" className="image-preview" />
                  </div>
                )}
                <ErrorMessage name="favicon" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="logo">Logo</label>
                <input
                  name="logo"
                  type="file"
                  className="form-control-file"
                  onChange={(event) => setFieldValue("logo", event.currentTarget.files[0])}
                />
                {clients[0].logo && (
                  <div className="file-preview">
                    <p>Current Logo:</p>
                    <img src={`/assets/uploads/basicsetting/${clients[0].logo}`} alt="Logo Preview" className="image-preview" />
                  </div>
                )}
                <ErrorMessage name="logo" component="div" className="error" />
              </div>

              <button type="submit" className="btn btn-primary">Update</button>
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
          width: 100px;
          height: auto;
          margin-top: 10px;
        }
        .error {
          color: red;
          font-size: 12px;
        }
      `}</style>
      </div> */}
      <div className='page-content'>
        {/* <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">General Setting</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="javascript:;">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  General Setting
                </li>
              </ol>
            </nav>
          </div>
          <div className="ms-auto">

          </div>
        </div> */}


        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="card">
              <div className="card-body p-4">
                <h5 className="mb-4">General Setting</h5>
                <div className="row mb-3">
                  <label htmlFor="input49" className="col-sm-3 col-form-label">
                    From Name
                  </label>
                  <div className="col-sm-9">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-user" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="input49"
                        placeholder="Your Name"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="input50" className="col-sm-3 col-form-label">
                    Phone No
                  </label>
                  <div className="col-sm-9">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-microphone" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="input50"
                        placeholder="Phone No"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="input51" className="col-sm-3 col-form-label">
                    Email Address
                  </label>
                  <div className="col-sm-9">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-envelope" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="input51"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="row mb-3">
                <label htmlFor="input52" className="col-sm-3 col-form-label">
                  Choose Password
                </label>
                <div className="col-sm-9">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-lock-open" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="input52"
                      placeholder="Choose Password"
                    />
                  </div>
                </div>
              </div> */}
                <div className="row mb-3">
                  <label htmlFor="input53" className="col-sm-3 col-form-label">
                    Favicon
                  </label>
                  <div className="col-sm-9">

                    <input
                      className="form-control"
                      type="file"
                      id="formFileMultiple"
                      multiple=""
                    />
                  </div>

                </div>
                <div className="row mb-3">
                  <label htmlFor="input53" className="col-sm-3 col-form-label">
                    Current Favicon
                  </label>
                  <div className="col-sm-9">

                    <input
                      className="form-control"
                      type="file"
                      id="formFileMultiple"
                      multiple=""
                    />
                  </div>

                </div>
                <div className="row mb-3">
                  <label htmlFor="input53" className="col-sm-3 col-form-label">
                    Logo
                  </label>
                  <div className="col-sm-9">

                    <input
                      className="form-control"
                      type="file"
                      id="formFileMultiple"
                      multiple=""
                    />
                  </div>

                </div>
                <div className="row mb-3">
                  <label htmlFor="input53" className="col-sm-3 col-form-label">
                    Current Logo
                  </label>
                  <div className="col-sm-9">

                    <input
                      className="form-control"
                      type="file"
                      id="formFileMultiple"
                      multiple=""
                    />
                  </div>

                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label" />
                  <div className="col-sm-9">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="input54"
                      />
                      <label className="form-check-label" htmlFor="input54">
                        Check me out
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-3 col-form-label" />
                  <div className="col-sm-9">
                    <div className="d-md-flex d-grid align-items-center gap-3">
                      <button type="button" className="btn btn-primary px-4">
                        Submit
                      </button>
                      <button type="button" className="btn btn-light px-4">
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generalsettings; 
