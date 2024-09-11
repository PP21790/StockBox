import React from 'react';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import { AddSignalByAdmin } from '../../../Services/Admin';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';






const AddSignal = () => {
  const navigate = useNavigate();

  const user_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");





  // Validation function
  const validate = (values) => {
    let errors = {};
    if (!values["Select Service"]) {
      errors["Select Service"] = "Please select a service";
    }
    if (!values["Buy/Sell"]) {
      errors["Buy/Sell"] = "Please select an option";
    }
    if (!values["Select Stock"]) {
      errors["Select Stock"] = "Please select a stock";
    }
    if (!values.Rate) {
      errors.Rate = "Please select a rate";
    }
    if (!values.Target_1) {
      errors.Target_1 = "Please enter Target-1";
    }
    if (!values["Target-2"]) {
      errors["Target-2"] = "Please enter Target-2";
    }
    if (!values["Target-3"]) {
      errors["Target-3"] = "Please enter Target-3";
    }
    if (!values.Stoploss) {
      errors.Stoploss = "Please enter Stoploss";
    }

    return errors;
  };



  // Submit function
  const onSubmit = async (values) => {
    const req = {
      add_by: user_id,
      service: values["Select Service"],
      action: values["Buy/Sell"],
      stock: values["Select Stock"],
      price: values.price,
      tag1: values.Target_1,
      tag2: values["Target-2"],
      tag3: values["Target-3"],
      stoploss: values.Stoploss,
    };

    try {
      const response = await AddSignalByAdmin(req, token);
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
      
      "Select Service": "",
      "Buy/Sell": "",
      "Select Stock": "",
      Rate: "",
      Target_1: "",
      "Target-2": "",
      "Target-3": "",
      Stoploss: "",
    },
    validate,
    onSubmit,
  });



  
  const fields = [
    {
      name: "service",
      label: "Select Service",
      type: "select",
      options: [
        { label: "Demo", value: "1" },
        { label: "2 Day Live", value: "0" },
        { label: "Live", value: "2" },
      ],
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "calltype",
      label: "Buy/Sell",
      type: "select",
      options: [
        { label: "Buy", value: "buy" },
        { label: "Sell", value: "sell" },
        { label: "Hold", value: "hold" },
      ],
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "Select Stock",
      label: "Select Stock",
      type: "select",
      options: [
        { label: "Demo", value: "1" },
        { label: "2 Day Live", value: "0" },
        { label: "Live", value: "2" },
      ],
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "price",
      label: "Rate",
      type: "select",
      options: [
        { label: "5%", value: "1" },
        { label: "10%", value: "0" },
        { label: "50%", value: "2" },
      ],
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "tag1",
      label: "Target-1",
      type: "text",
      label_size: 6,
      col_size: 6,
      disable: false,
    },
    {
      name: "tag2",
      label: "Target-2",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "tag3",
      label: "Target-3",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "stoploss",
      label: "Stoploss",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
        name: "description",
        label: "Description",
        type: "text",
        label_size: 12,
        col_size: 6,
        disable: false,
      },
  ];



  return (
    <div>
      <div style={{ marginTop: "100px" }}>
        <DynamicForm
          fields={fields}
          page_title="Add Signal"
          btn_name="Add Signal"
          btn_name1="Cancel"
          formik={formik}
          btn_name1_route={"/admin/signal"}
          additional_field={<></>}
        />
      </div>
    </div>
  );
};

export default AddSignal;
