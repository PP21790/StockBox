import React from 'react';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import Swal from 'sweetalert2';
import { useLocation, useNavigate ,useParams} from 'react-router-dom';
import { UpdateClient } from '../../../Services/Admin';



const Editfreeclient = () => {

  const {id} = useParams()
  const navigate = useNavigate();
  const location = useLocation();
  const { row } = location.state;
console.log(id);



  const user_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const validate = (values) => {
    let errors = {};

    if (!values.FullName) {
      errors.FullName = "Please Enter Full Name";
    } else if (!/^[A-Za-z\s]+$/.test(values.FullName)) {
      errors.FullName = "Full Name should contain only alphabetic characters";
    }
    if (!values.Email) {
      errors.Email = "Please Enter Email";
    }
    
    if (!values.PhoneNo) {
      errors.PhoneNo = "Please Enter Phone Number";
    }
    
    return errors;
  };

  const onSubmit = async (values) => {
    const req = {
      FullName: values.FullName,
      // UserName: values.UserName,
      Email: values.Email,
      PhoneNo: values.PhoneNo,
      // password: values.password,
      id: id,
    };

    try {
      const response = await UpdateClient(req, token);
      if (response.status) {
        Swal.fire({
          title: "Update Successful!",
          text: response.message,
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
        });
        setTimeout(() => {
          navigate("/admin/freeclient");
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
      FullName: row?.clientDetails.FullName || "",
      // UserName: row?.UserName || "",
      Email: row?.clientDetails.Email || "",
      PhoneNo: row?.clientDetails.PhoneNo || "",

    },
    validate,
    onSubmit,
  });

  const fields = [
    {
      name: "FullName",
      label: "Full Name",
      type: "text",
      star: true,
      label_size: 12,
      col_size: 4,
      disable: false,
      star:true
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
      star: true,
      label_size: 12,
      col_size: 4,
      disable: false,
      star:true
    },
    {
      name: "PhoneNo",
      label: "Phone Number",
      type: "text3",
      label_size: 12,
      col_size: 4,
      disable: false,
    },
    // {
    //   name: "password",
    //   label: "Password",
    //   type: "text",
    //   label_size: 12,
    //   col_size: 3,
    //   disable: false,
    // },
  ];

  return (
    <div style={{ marginTop: "100px" }}>
      <DynamicForm
        fields={fields}
        page_title="Update Client"
        btn_name="Update Client"
        btn_name1="Cancel"
        formik={formik}
        sumit_btn={true}
        btn_name1_route={"/admin/freeclient"}
        additional_field={<></>}
      />
    </div>
  );
};

export default Editfreeclient;
