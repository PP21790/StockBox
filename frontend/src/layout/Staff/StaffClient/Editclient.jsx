import React from 'react';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { UpdateClient } from '../../../Services/Admin';



const EditClient = () => {


  const navigate = useNavigate();
  const location = useLocation();
  const { row } = location.state; 

  // console.log("row",row)

  const user_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const validate = (values) => {
    let errors = {};

    if (!values.FullName) {
      errors.FullName = "Please enter Full Name";
    }
    if (!values.Email) {
      errors.Email = "Please enter Email";
    }
    // if (!values.UserName) {
    //   errors.UserName = "Please enter Username";
    // }
    if (!values.PhoneNo) {
      errors.PhoneNo = "Please enter Phone Number";
    }
    if (!values.password) {
      errors.password = "Please enter Phone Number";
    }
    

    return errors;
  };

  const onSubmit = async (values) => {
    const req = {
      FullName: values.FullName,
      // UserName: values.UserName,
      Email: values.Email,
      PhoneNo: values.PhoneNo,
      password:values.password,
      id: row._id,
    };

    try {
      const response = await UpdateClient(req,token);
      if (response.status) {
        Swal.fire({
          title: "Update Successful!",
          text: response.message,
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
        });
        setTimeout(() => {
          navigate("/staff/client");
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
      // UserName: row?.UserName || "",
      Email: row?.Email || "",
      PhoneNo: row?.PhoneNo || "",
    
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
    },
    // {
    //   name: "UserName",
    //   label: "User Name",
    //   type: "text",
    //   label_size: 12,
    //   col_size: 6,
    //   disable: false,
    // },
    {
      name: "Email",
      label: "Email",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "PhoneNo",
      label: "Phone Number",
      type: "text3", 
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "password",
      label: "Password",
      type: "text", 
      label_size: 12,
      col_size: 6,
      disable: false,
    },
  ];

  return (
    <div style={{ marginTop: "100px" }}>
      <DynamicForm
        fields={fields}
        page_title="Update User"
        btn_name="Update User"
        btn_name1="Cancel"
        formik={formik}
        btn_name1_route={"/staff/client"}
        additional_field={<></>}
      />
    </div>
  );
};

export default EditClient;
