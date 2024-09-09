import React from 'react';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AddClient } from '../../../Services/Admin';

const AddStaff = () => {
  const navigate = useNavigate();

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
    if (!values.UserName) {
      errors.UserName = "Please enter Username";
    }
    if (!values.PhoneNo) {
      errors.PhoneNo = "Please enter Phone Number";
    }
    if (!values.password) {
      errors.password = "Please enter password";
    }
    if (!values.ConfirmPassword) {
      errors.ConfirmPassword = "Please confirm your password";
    } else if (values.password !== values.ConfirmPassword) {
      errors.ConfirmPassword = "Passwords must match";
    }

    return errors;
  };

  const onSubmit = async (values) => {
    const req = {
      FullName: values.FullName,
      UserName: values.UserName,
      Email: values.Email,
      PhoneNo: values.PhoneNo,
      password: values.password,
      add_by: user_id,
    };

    try {
      const response = await AddClient(req, token);
      if (response.status) {
        Swal.fire({
          title: "Create Successful!",
          text: response.msg,
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
          text: response.msg,
          icon: "error",
          timer: 1500,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("An error occurred", error);
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
      UserName: "",
      Email: "",
      PhoneNo: "",
      password: "",
      ConfirmPassword: "",
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
    },
    {
      name: "UserName",
      label: "User Name",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
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
      type: "text3", // Ensure this is handled correctly in DynamicForm
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "password",
      label: "Password",
      type: "password", 
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "ConfirmPassword",
      label: "Confirm Password",
      type: "password",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
  ];

  return (
    <div style={{ marginTop: "100px" }}>
      <DynamicForm
        fields={fields}
        page_title="Add New User"
        btn_name="Add User"
        btn_name1="Cancel"
        formik={formik}
        btn_name1_route={"/admin/client"}
        additional_field={<></>}
      />
    </div>
  );
};

export default AddStaff;
