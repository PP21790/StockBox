import React from 'react';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { addStaffpermission } from '../../../Services/Admin';

const Staffpermission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { row } = location.state;

  const user_id = localStorage.getItem('id');
  const token = localStorage.getItem('token');



  const validate = (values) => {
    let errors = {};

    if (!values.FullName) {
      errors.FullName = 'Please enter Full Name';
    }
    if (!values.Email) {
      errors.Email = 'Please enter Email';
    }
    if (!values.UserName) {
      errors.UserName = 'Please enter Username';
    }
    if (!values.PhoneNo) {
      errors.PhoneNo = 'Please enter Phone Number';
    }

    return errors;
  };

  const onSubmit = async (values) => {
    const permissions = {};

    if (values.adduser) permissions.adduser = 'adduser';
    if (values.edituser) permissions.edituser = 'edituser';
    if (values.deleteuser) permissions.deleteuser = 'deleteuser';
    if (values.viewuser) permissions.viewuser = 'viewuser';
    if (values.addservice) permissions.addservice = 'addservice';

    const req = {
      permissions,
      id: row._id,
    };
       console.log("req",req)
    try {
      const response = await addStaffpermission(req, token);
      if (response.status) {
        Swal.fire({
          title: 'Update Successful!',
          text: response.msg,
          icon: 'success',
          timer: 1500,
          timerProgressBar: true,
        });
        setTimeout(() => {
          navigate('/admin/staff');
        }, 1500);
      } else {
        Swal.fire({
          title: 'Error',
          text: response.msg,
          icon: 'error',
          timer: 1500,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error('An error occurred', error);
      Swal.fire({
        title: 'Error',
        text: 'An unexpected error occurred. Please try again later.',
        icon: 'error',
        timer: 1500,
        timerProgressBar: true,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      FullName: row?.FullName || '',
      UserName: row?.UserName || '',
      Email: row?.Email || '',
      PhoneNo: row?.PhoneNo || '',
      adduser: false,
      edituser: false,
      deleteuser:  false,
      viewuser: false,
      addservice: false,
    },
    validate,
    onSubmit,
  });

  const fields = [
    {
      name: 'FullName',
      label: 'Full Name',
      type: 'text',
      label_size: 6,
      col_size: 6,
      disable: true,
    },
    {
      name: 'UserName',
      label: 'User Name',
      type: 'text',
      label_size: 12,
      col_size: 6,
      disable: true,
    },
    {
      name: 'adduser',
      label: 'Add User',
      type: 'checkbox',
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: 'edituser',
      label: 'Edit User',
      type: 'checkbox',
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: 'deleteuser',
      label: 'Delete User',
      type: 'checkbox',
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: 'viewuser',
      label: 'View User',
      type: 'checkbox',
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: 'addservice',
      label: 'Add Service',
      type: 'checkbox',
      label_size: 12,
      col_size: 6,
      disable: false,
    },
  ];

  return (
    <div style={{ marginTop: '100px' }}>
      <DynamicForm
        fields={fields}
        page_title="Edit Staff"
        btn_name="Edit Staff"
        btn_name1="Cancel"
        formik={formik}
        btn_name1_route={'/admin/staff'}
        additional_field={<></>}
      />
    </div>
  );
};

export default Staffpermission;
