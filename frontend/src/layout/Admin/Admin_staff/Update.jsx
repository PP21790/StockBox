import React from 'react';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { UpdateStaff } from '../../../Services/Admin';

const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { row } = location.state; 

  const token = localStorage.getItem("token");

  const validate = (values) => {
    const errors = {};
    if (!values.FullName) {
      errors.FullName = "Please Enter Full Name";
    }
    if (!values.Email) {
      errors.Email = "Please Enter Email";
    }
    if (!values.UserName) {
      errors.UserName = "Please Enter Username";
    }
    if (!values.PhoneNo) {
      errors.PhoneNo = "Please Enter Phone Number";
    }
    return errors;
  };

  const onSubmit = async (values) => {

    const req = {
      FullName: values.FullName,
      UserName: values.UserName,
      Email: values.Email,
      PhoneNo: values.PhoneNo,
      // password: values.password,
      id: row._id,
    };

    try {
      const response = await UpdateStaff(req, token);
    
      if (response.status) {
        Swal.fire({
          title: "Update Successful!",
          text: response.message,
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
        });
        setTimeout(() => {
          navigate("/admin/staff");
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
  };

  const formik = useFormik({
    initialValues: {
      FullName: row?.FullName || "",
      UserName: row?.UserName || "",
      Email: row?.Email || "",
      PhoneNo: row?.PhoneNo || "",
      // password: "", 
    },
    validate,
    onSubmit,
  });

  const fields = [
    {
      name: "FullName",
      label: "Full Name",
      type: "text",
      label_size: 6,
      col_size: 6,
      disable: false,
      star:true
    },
    {
      name: "UserName",
      label: "User Name",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: true,
      star:true
    },
    {
      name: "Email",
      label: "Email",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
      star:true
    },
    {
      name: "PhoneNo",
      label: "Phone Number",
      type: "text3", 
      label_size: 12,
      col_size: 6,
      disable: false,
      star:true
    },
    // {
    //   name: "password",
    //   label: "Password",
    //   type: "password", 
    //   label_size: 12,
    //   col_size: 3,
    //   disable: false,
    //   star:true
    // },
  ];

  return (
    <div style={{ marginTop: "100px" }}>
      <DynamicForm
        fields={fields}
        page_title="Edit Staff"
        btn_name="Edit Staff"
        btn_name1="Cancel"
        formik={formik}
        sumit_btn={true}
        btn_name1_route={"/admin/staff"}
        additional_field={<></>}
      />
    </div>
  );
};

export default Update;
