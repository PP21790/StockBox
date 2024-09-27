import React, { useEffect, useState } from 'react';
import { basicsettinglist, UpdateEmailSettings } from '../../../Services/Admin'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; 
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';  
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
    <div className="general-settings">
      <h2 className="header">Email Settings</h2>
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
          <Form className="form-container">
            <div className="form-group">
              <label htmlFor="smtp_host">SMTP Host</label>
              <Field name="smtp_host" type="text" className="form-control" />
              <ErrorMessage name="smtp_host" component="div" className="error" />
            </div>
            
            <div className="form-group">
              <label htmlFor="smtp_port">SMTP Port</label>
              <Field name="smtp_port" type="text" className="form-control" />
              <ErrorMessage name="smtp_port" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="smtp_username">SMTP Username</label>
              <Field name="smtp_username" type="text" className="form-control" />
              <ErrorMessage name="smtp_username" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="to_mail">To Email</label>
              <Field name="to_mail" type="email" className="form-control" />
              <ErrorMessage name="to_mail" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="encryption">Encryption</label>
              <Field name="encryption" type="text" className="form-control" />
              <ErrorMessage name="encryption" component="div" className="error" />
            </div>

            <div className="form-group password-group">
              <label htmlFor="smtp_password">SMTP Password</label>
              <div style={{ position: 'relative' }}>
                <Field 
                  name="smtp_password" 
                  type={passwordVisible ? 'text' : 'password'} 
                  className="form-control" 
                />
                <span 
                  onClick={() => setPasswordVisible(!passwordVisible)} 
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                >
                  <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
                </span>
              </div>
              <ErrorMessage name="smtp_password" component="div" className="error" />
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
        .error {
          color: red;
          font-size: 12px;
        }
        .password-group {
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default Emailsettings; 
