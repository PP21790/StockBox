import React from 'react';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AddClient } from '../../../Services/Admin';


const AddUser = () => {


  const navigate = useNavigate();

  const user_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const validate = (values) => {
    let errors = {};


    if (!values.FullName) {
      errors.FullName = "Please Enter Full Name";
    }
    
    if (/\d/.test(values.FullName)) {
      errors.FullName = "Numbers are not allowed in the Full Name";
    }
    //updated code 
    if(/\W/.test(values.FullName)){
      errors.FullName = "Special character are not allowed"
    }
    if (!values.Email) {
      errors.Email = "Please Enter Email";
    }
    if (!values.PhoneNo) {
      errors.PhoneNo = "Please Enter Phone Number";
    }
    if (!values.password) {
      errors.password = "Please Enter Password";
    }
    if (!values.ConfirmPassword) {
      errors.ConfirmPassword = "Please Confirm Your Password";
    } else if (values.password !== values.ConfirmPassword) {
      errors.ConfirmPassword = "Passwords Must Match";
    }

    return errors;
  };

  const onSubmit = async (values) => {
  
    const req = {
      FullName: values.FullName,
      Email: values.Email,
      PhoneNo: values.PhoneNo,
      password: values.password,
      add_by: user_id,
      freetrial:values.freetrial
    };
    
   
    try {
      const response = await AddClient(req, token);

      if (response.status) {
        Swal.fire({
          title: "Client Create Successfull !",
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
          title: "Alert",
          text: response.message,
          icon: "warning",
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
      FullName: "",
      Email: "",
      PhoneNo: "",
      password: "",
      ConfirmPassword: "",
      freetrial: 0,
      add_by: "",
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
    {
      name: "password",
      label: "Password",
      type: "password", 
      label_size: 12,
      col_size: 6,
      disable: false,
      star:true
    },
    {
      name: "ConfirmPassword",
      label: "Confirm Password",
      type: "password1",
      label_size: 12,
      col_size: 6,
      disable: false,
      star:true
    },
    {
      name: "freetrial",
      label: "Free trial status",
      type: "togglebtn",
      label_size: 6,
      col_size: 4,
      disable: false,
      star:true
    },
  ];



  
  return (
    <div style={{ marginTop: "100px" }}>
      <DynamicForm
        fields={fields}
        formik={formik}
        page_title="Add New Client"
        btn_name="Add Client"
        btn_name1="Cancel"
        sumit_btn={true}
        btn_name1_route={"/admin/client"}
        additional_field={<></>}
        
      />
    </div>
  );
};

export default AddUser;
