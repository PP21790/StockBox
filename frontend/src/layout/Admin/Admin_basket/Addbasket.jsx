import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import DynamicForm from "../../../components/DynamicForm";
import { Addbasketplan } from "../../../Services/Admin";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { monthsInQuarter } from "date-fns/constants";

const fieldConfigurations = [
  {
    col_size: 4,
    name: "title",
    label: "Basket Name",
    type: "text",
    placeholder: "Enter Basket Name",
  },
  {
    col_size: 4,
    name: "themename",
    label: "Theme Name",
    type: "text",
    placeholder: "Enter theme name",
  },
  {
    col_size: 4,
    name: "cagr",
    label: "CAGR",
    type: "text",
    placeholder: "Enter CAGR",
  },
  {
    col_size: 4,
    name: "mininvamount",
    label: "Amount",
    type: "number",
    placeholder: "Enter Amount",
  },

  {
    col_size: 4,
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter description",
  },

  {
    type: "select",
    label: "Frequency",
    name: "frequency",
    col_size: 4,
    options: [
      { value: "monthly", label: "Monthly" },
      { value: "quarterly", label: "Quarterly" },
      { value: "halfyearly", label: "Half Yearly" },
      { value: "yearly", label: "Yearly" },
    ],
  },
  {
    type: "number",
    label: "Basket Price",
    name: "basket_price",
    col_size: 4,
    placeholder: "Enter Basket Price",
  },
  {
    type: "text",
    label: "Next Rebalance Date",
    name: "next_rebalance_date",
    col_size: 4,
    placeholder: "Enter Next Rebalance Date",
  },
  {
    col_size: 4,
    name: "validity",
    label: "Validity",
    type: "select",
    placeholder: "Enter validity",
  },
];

const initialValues = {
  title: "",
  description: "",
  next_rebalance_date: "",

  mininvamount: "",

  themename: "",
  cagr: "",

  frequency: "",
  basket_price: "",
  next_rebalance_date: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),

  mininvamount: Yup.string().required("Minimum Investment Amount is required"),

  themename: Yup.string().required("Theme Name is required"),

  cagr: Yup.string().required("CAGR is required"),
  frequency: Yup.string().required("Frequency is required"),
  basket_price: Yup.string().required("Basket Price is required"),
  next_rebalance_date: Yup.string().required("Next Rebalance Date is required"),
});



const AddBasket = () => {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const onSubmit = async (values) => {
    const req = {
      title: values.title,
      description: values.description,
      themename: values.themename,
      cagr: values.cagr,
      mininvamount: values.mininvamount,
      frequency: values.frequency,
      basket_price: values.basket_price,
      next_rebalance_date: values.next_rebalance_date,
      add_by: user_id,
    };

    console.log("Rendering field: ", fieldConfigurations.values.themename);

    try {
      const response = await Addbasketplan(req, token);
      console.log(response);

      if (response.status) {
        Swal.fire({
          title: "Create Successful!",
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

  return (
    <div className="page-content">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formikProps) => (
          <DynamicForm
            fields={fieldConfigurations}
            formik={formikProps}
            btn_name="Submit"
            sumit_btn={true}
            page_title="Add Basket"
            btn_name1="Cancel"
            btn_name1_route="/admin/basket"
            showAddRemoveButtons={true}
          />
        )}
      </Formik>
    </div>
  );
};

export default AddBasket;
