import React from "react";
import { useFormik } from "formik";
import DynamicForm from "../../../components/FormicForm";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { updateCouponbyadmin } from "../../../Services/Admin";

const Updatecoupon = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { row } = location.state;


  const token = localStorage.getItem("token");




  // const validate = (values) => {
  //   let errors = {};

  //   if (!values.name) {
  //     errors.name = "Please enter Name";
  //   }
  //   if (!values.code) {
  //     errors.code = "Please enter code";
  //   }
  //   if (!values.type) {
  //     errors.type = "Please enter type";
  //   }
  //   if (!values.value) {
  //     errors.value = "Please enter value";
  //   }
  //   if (!values.startdate) {
  //     errors.startdate = "Please enter Start Date";
  //   }
  //   if (!values.enddate) {
  //     errors.enddate = "Please enter End Date";
  //   }
  //   if (!values.minpurchasevalue) {
  //     errors.minpurchasevalue = "Please enter Min Purchase value";
  //   }
  //   if (!values.mincouponvalue) {
  //     errors.mincouponvalue = "Please enter Min Coupon value";
  //   }

  //   return errors;
  // };

  const onSubmit = async (values) => {
    const req = {
      name: values.name,
      code: values.code,
      type: values.type,
      value: values.value,
      startdate: values.startdate,
      enddate: values.enddate,
      minpurchasevalue: values.minpurchasevalue,
      mincouponvalue: values.mincouponvalue,
      description: values.description,
      image: values.image,
      id: row._id,
    };

    try {
      const response = await updateCouponbyadmin(req, token);
      if (response.status) {
        Swal.fire({
          title: "Update Successful!",
          text: response.message,
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
        });
        setTimeout(() => {
          navigate("/staff/coupon");
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
      name: row?.name || "",
      code: row?.code || "",
      type: row?.type || "",
      value: row?.value || "",
      startdate: row?.startdate ? new Date(row.startdate).toISOString().split("T")[0] : "",
      enddate: row?.enddate ? new Date(row.enddate).toISOString().split("T")[0] : "",
      minpurchasevalue: row?.minpurchasevalue || "",
      mincouponvalue: row?.mincouponvalue || "",
      id: "",
    },
    // validate,
    onSubmit,
  });

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      label_size: 6,
      col_size: 4,
      disable: false,
    },
    {
      name: "code",
      label: "Code",
      type: "text",
      label_size: 12,
      col_size: 4,
      disable: false,
    },
    {
      name: "type",
      label: "Type",
      type: "select",
      label_size: 12,
      col_size: 10,
      disable: false,
      options: [
        { value: "percentage", label: "Percentage" },
        { value: "fixed", label: "Fixed" },  
    ] 
    },
    {
      name: "value",
      label: "Value",
      type: "number",
      label_size: 12,
      col_size: 4,
      disable: false,
    },
    {
      name: "minpurchasevalue",
      label: "Min Purchase Value",
      type: "text",
      label_size: 12,
      col_size: 4,
      disable: false,
    },
    {
      name: "mincouponvalue",
      label: "Min Discount Amount",
      type: "text",
      label_size: 12,
      col_size: 4,
      disable: false,
      showWhen: (values) => values.type === "percentage"
    },
    {
      name: "startdate",
      label: "Start Date",
      type: "date",
      label_size: 12,
      col_size: 4,
      disable: false,
    },
    {
      name: "enddate",
      label: "End Date",
      type: "date",
      label_size: 12,
      col_size: 4,
      disable: false,
    },
   
  ];

  return (
    <div style={{ marginTop: "100px" }}>
      <DynamicForm
        fields={fields.filter(field => !field.showWhen || field.showWhen(formik.values))}
        page_title="Update Coupon Code"
        btn_name="Update Coupon"
        btn_name1="Cancel"
        formik={formik}
        sumit_btn={true}
        btn_name1_route={"/staff/coupon"}
        additional_field={<></>}
      />
    </div>
  );
};

export default Updatecoupon;
