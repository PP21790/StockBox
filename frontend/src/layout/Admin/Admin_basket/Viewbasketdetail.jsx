
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import Swal from 'sweetalert2';
import { useLocation, useNavigate, useParams} from 'react-router-dom';
import { UpdateClient } from '../../../Services/Admin';
import { Viewbasket } from '../../../Services/Admin';



const Viewbasketdetail = () => {


  const navigate = useNavigate();

  
      useEffect(() => {
        getbasketdetail();
    }, []);


    const { id } = useParams()

    const [clients, setClients] = useState([]);


    const getbasketdetail = async () => {
        try {
            const response = await Viewbasket(id, token);
            if (response.status) {
                setClients([response.data]);
            } 
        } catch (error) {
            console.log("Error fetching signal details:", error);
        }
    };






  console.log("clients",clients)

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
      title: values.title,
      PhoneNo: values.PhoneNo,
      password: values.password,
      id: clients._id,
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
      FullName: clients?.FullName || "",
      // UserName: row?.UserName || "",
      title: clients?.title || "",
      PhoneNo: clients?.PhoneNo || "",

    },
    validate,
    onSubmit,
  });

  const fields = [
    {
      name: "title",
      label: "title",
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
        page_title="Update Client"
        btn_name="Update Client"
        btn_name1="Cancel"
        formik={formik}
        sumit_btn={true}
        btn_name1_route={"/admin/client"}
        additional_field={<></>}
      />
    </div>
  );
};

export default Viewbasketdetail;
