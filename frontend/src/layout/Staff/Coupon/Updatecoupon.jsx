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


  console.log("row",row)
   

  const token = localStorage.getItem("token");

  const imageBaseUrl = "/assets/uploads/coupon/";


  const validate = (values) => {
    let errors = {};

    if (!values.name) {
      errors.name = "Please enter Name";
    }
    if (!values.code) {
      errors.code = "Please enter code";
    }
    if (!values.type) {
      errors.type = "Please enter type";
    }
    if (!values.value) {
      errors.value = "Please enter value";
    }
    if (!values.startdate) {
      errors.startdate = "Please enter Start Date";
    }
    if (!values.enddate) {
      errors.enddate = "Please enter End Date";
    }
    if (!values.minpurchasevalue) {
      errors.minpurchasevalue = "Please enter Min Purchase value";
    }
    if (!values.mincouponvalue) {
      errors.mincouponvalue = "Please enter Min Coupon value";
    }

    return errors;
  };

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
      description: row?.description || "",
      image: row?.image || "",
      id: "",
    },
    validate,
    onSubmit,
  });

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      label_size: 6,
      col_size: 6,
      disable: false,
    },
    {
      name: "code",
      label: "Code",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "type",
      label: "Type",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "value",
      label: "Value",
      type: "number",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "minpurchasevalue",
      label: "Min Purchase Value",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "mincouponvalue",
      label: "Min Coupon Value",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "startdate",
      label: "Start Date",
      type: "date",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "enddate",
      label: "End Date",
      type: "date",
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: "image",
      label: "Image",
      type: "file2",
      label_size: 12,
      col_size: 6,
      disable: false,
      additional_content: row?.image ? (
        <img
          src={`${imageBaseUrl}${row.image}`}
          alt="Uploaded"
          style={{ width: "100px", marginTop: "10px" }}
        />
      ) : null,
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
    <div style={{ marginTop: "100px" }}>
      <DynamicForm
        fields={fields}
        page_title="Update User"
        btn_name="Update User"
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
