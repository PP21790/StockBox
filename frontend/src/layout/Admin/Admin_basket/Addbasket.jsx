import React from 'react';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Addbasketplan } from '../../../Services/Admin';


const AddBasket = () => {


  const navigate = useNavigate();

  const user_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const validate = (values) => {
    let errors = {};

    if (!values.title) {
      errors.title = "Please Enter Title";
    }

    if (!values.themename) {
      errors.themename = "Please Enter Theme Name";
    }

    // if (!values.full_price) {
    //   errors.full_price = "Please Enter Full Price";
    // }

    if (!values.basket_price) {
      errors.basket_price = "Please Enter Basket Price";
    }

    // if (!values.accuracy) {
    //   errors.accuracy = "Please Enter Accuracy";

    // }
    if (!values.mininvamount) {
      errors.mininvamount = "Please Enter Minimum Investment Amount";
    }

    // if (!values.portfolioweightage) {
    //   errors.portfolioweightage = "Please Enter Portfolio Weightage";
    // }

    if (!values.frequency) {
      errors.frequency = "Please Enter Frequency";
    }

    // if (!values.cagr) {
    //   errors.cagr = "Please Enter CAGR";
    // }

    if (!values.validity) {
      errors.validity = "Please Select Validity";
    }

    if (!values.next_rebalance_date) {
      errors.next_rebalance_date = "Please Select Rebalance Date";
    }

    if (!values.description) {
      errors.description = "Please Enter Description";
    }

    return errors;
  };

  const onSubmit = async (values) => {

    const req = {
      title: values.title,
      add_by: user_id,
      description: values.description,
      // full_price: values.full_price,
      basket_price: values.basket_price,
      // accuracy: values.accuracy,
      mininvamount: values.mininvamount,
      // portfolioweightage: values.portfolioweightage,
      themename: values.themename,
      // cagr: values.cagr,
      frequency: values.frequency,
      validity: values.validity,
      next_rebalance_date: values.next_rebalance_date

    };


    try {
      const response = await Addbasketplan(req, token);

      if (response.status) {
        Swal.fire({
          title: "Client Create Successfull !",
          text: response.message,
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
        });
        setTimeout(() => {
          navigate("/admin/basket");
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
      title: "",
      description: "",
      // full_price: "",
      basket_price: "",
      add_by: "",
      // accuracy: "",
      mininvamount: "",
      // portfolioweightage: "",
      themename: "",
      // cagr: "",
      frequency: "",
      validity: "",
      next_rebalance_date: ""
    },
    validate,
    onSubmit,
  });




  const fields = [
    {
      name: "title",
      label: "Basket Name",
      type: "text",
      label_size: 6,
      col_size: 6,
      disable: false,
      star: true
    },
    {
      name: "themename",
      label: "Theme Name",
      type: "text",
      label_size: 6,
      col_size: 6,
      disable: false,
      star: true
    },
    // {
    //   name: "full_price",
    //   label: "Price",
    //   type: "number",
    //   label_size: 12,
    //   col_size: 6,
    //   disable: false,
    //   star: true

    // },
    {
      name: "basket_price",
      label: "Basket Price",
      type: "number",
      label_size: 12,
      col_size: 6,
      disable: false,
      star: true

    },
    // {
    //   name: "accuracy",
    //   label: "Accuracy",
    //   type: "number",
    //   label_size: 12,
    //   col_size: 6,
    //   disable: false,
    //   star: true
    // },

    {
      name: "mininvamount",
      label: "MinimumAmount",
      type: "number",
      label_size: 12,
      col_size: 6,
      disable: false,
      star: true
    },
    // {
    //   name: "portfolioweightage",
    //   label: "PortfolioWeightage",
    //   type: "number",
    //   label_size: 12,
    //   col_size: 6,
    //   disable: false,
    //   star: true
    // },
    {
      name: "frequency",
      label: "Frequency",
      type: "number",
      label_size: 12,
      col_size: 6,
      disable: false,
      star: true
    },
    // {
    //   name: "cagr",
    //   label: "Cagr",
    //   type: "text",
    //   label_size: 12,
    //   col_size: 6,
    //   disable: false,
    //   star: true
    // },
    {
      name: "validity",
      label: "Validity",
      type: "select",
      label_size: 12,
      col_size: 4,
      disable: false,
      options: [
        { value: "1 month", label: "1 Month" },
        { value: "3 months", label: "3 Months" },
        { value: "6 months", label: "6 Months" },
        { value: "1 year", label: "1 Year" }
      ],
      star: true
    },
    {
      name: "next_rebalance_date",
      label: "Rebalance Date",
      type: "date",
      label_size: 12,
      col_size: 6,
      disable: false,
      star: true
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
      star: true
    },
  ];




  return (
    <div style={{ marginTop: "100px" }}>
      <DynamicForm
        fields={fields}
        formik={formik}
        page_title="Add Basket"
        btn_name="Add Basket"
        btn_name1="Cancel"
        sumit_btn={true}
        btn_name1_route={"/admin/basket"}
        additional_field={<></>}

      />
    </div>
  );
};

export default AddBasket;
