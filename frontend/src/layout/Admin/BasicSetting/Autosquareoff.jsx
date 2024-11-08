import React, { useEffect, useState } from 'react';
import { basicsettinglist, Updatesquareoffdata } from '../../../Services/Admin';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ArrowDown } from 'lucide-react';


const Autosquareoff = () => {



  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [clients, setClients] = useState(null);

  const getsettingdetail = async () => {
    try {
      const response = await basicsettinglist(token);
      if (response.status) {
        setClients(response.data);
      }
    } catch (error) {
      console.log('Error fetching settings:', error);
    }
  };

  useEffect(() => {
    getsettingdetail();
  }, []);

  const validationSchema = Yup.object().shape({
    cashexpiretime: Yup.string().required('Cash Expire Time is required'),
    foexpiretime: Yup.string().required('FO Expire Time is required'),
    cashexpirehours: Yup.string().required('Cash Expire Hours is required'),
    foexpirehours: Yup.string().required('FO Expire Hours is required'),
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
      <hr />
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card radius-15">
            <Formik
              enableReinitialize={true}
              initialValues={{
                cashexpiretime: clients[0].cashexpiretime || '',
                foexpiretime: clients[0].foexpiretime || '',
                cashexpirehours: clients[0].cashexpirehours || '',
                foexpirehours: clients[0].foexpirehours || '',
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                const req = {
                  cashexpiretime: values.cashexpiretime,
                  foexpiretime: values.foexpiretime,
                  cashexpirehours: values.cashexpirehours,
                  foexpirehours: values.foexpirehours,
                };

                try {
                  const response = await Updatesquareoffdata(req, token);
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
                  console.log('Update error:', error);
                  Swal.fire({
                    title: "Error",
                    text: "An unexpected error occurred. Please try again later.",
                    icon: "error",
                    timer: 1500,
                    timerProgressBar: true,
                  });
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ dirty, isSubmitting }) => (
                <Form className="card-body">
                  <div className='p-4 border radius-15'>
                    <div className="row">
                      <div className="row mb-1 align-items-center">
                        <label htmlFor="cashexpiretime" className="col-sm-3 col-form-label"><b>Cash Expire Time</b></label>
                        <div className="col-sm-9">
                          <Field name="cashexpiretime" type="text" className="form-control mb-2" />
                        </div>
                        <ErrorMessage name="cashexpiretime" component="div" className="error" />
                      </div>

                      <div className="row mb-1 align-items-center">
                        <label htmlFor="foexpiretime" className="col-sm-3 col-form-label"><b>FO Expire Time</b></label>
                        <div className="col-sm-9">
                          <Field name="foexpiretime" type="text" className="form-control" />
                        </div>
                        <ErrorMessage name="foexpiretime" component="div" className="error" />
                      </div>

                      <div className="row mb-1 align-items-center">
                        <label htmlFor="cashexpirehours" className="col-sm-3 col-form-label"><b>Cash Expire Hours</b></label>
                        <div className="col-sm-9">
                          <Field as="select" name="cashexpirehours" className="form-control custom-select">
                            <option value="">Select Expiry Hours</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">1</option>
                            <option value="14">2</option>
                            <option value="15">3</option>
                          </Field>
                        </div>
                        <ErrorMessage name="cashexpirehours" component="div" className="error" />
                      </div>



                      <div className="row mb-1 align-items-center">
                        <label htmlFor="foexpirehours" className="col-sm-3 col-form-label"><b>FO Expire Hours</b></label>
                        <div className="col-sm-9">
                          <Field as="select" name="foexpirehours" className="form-control custom-select">
                            <option value="">Select Expiry Hours</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">1</option>
                            <option value="14">2</option>
                            <option value="15">3</option>
                          </Field>
                        </div>
                        <ErrorMessage name="foexpirehours" component="div" className="error" />
                      </div>


                      <div className="row mt-2">
                        <label className="col-sm-3 col-form-label" />
                        <div className="col-sm-9">
                          <div className="d-md-flex d-grid align-items-center justify-content-end gap-3">
                            <button
                              type="submit"
                              className="btn btn-primary px-4"
                              disabled={!dirty || isSubmitting}
                            >
                              {isSubmitting ? 'Updating...' : 'Update'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

            <style jsx>{`
                          .error {
                            color: red;
                            font-size: 30px;
                          }
                         .custom-select {
  appearance: none; /* Remove default arrow */
  background: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="4" height="34" viewBox="0 0 24 24"><path fill="gray" d="M7 10l5 5 5-5z"/></svg>') no-repeat right center;
  background-size: 1em; /* Adjust size of the custom arrow */
  padding-right: 1.5em; /* Space for the custom arrow */
}                            
                        `}</style>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Autosquareoff;
