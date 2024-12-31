import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import DynamicForm from "../../../components/FormicForm";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { updateCouponbyadmin, GetService } from "../../../Services/Admin";

const Updatecoupon = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { row } = location.state;

  const token = localStorage.getItem("token");
  const [servicedata, setServicedata] = useState([]);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    getService();
  }, []);

  // Fetch the services to populate the select dropdown
  const getService = async () => {
    try {
      const response = await GetService(token);
      if (response.status) {
        setServicedata(response.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const validate = (values) => {
    let errors = {};

    if (!values.name) {
      errors.name = "Please Enter Name";
    }
    if (!values.code) {
      errors.code = "Please Enter Coupon Code";
    }
    if (values.code) {
      if (values.code.length < 6 || values.code.length > 8) {
        errors.code = "Coupon Code must be between 6 and 8 characters.";
      } else if (!/^[a-zA-Z0-9]+$/.test(values.code)) {
        errors.code = "Coupon Code must contain only numbers and letters.";
      }
    }

    if (values.minpurchasevalue && parseFloat(values.minpurchasevalue) < parseFloat(values.mincouponvalue)) {
      errors.minpurchasevalue = "Min Purchase Value should be greater than Max Discount Value.";
    }
    if (values.mincouponvalue && parseFloat(values.minpurchasevalue) < parseFloat(values.mincouponvalue)) {
      errors.mincouponvalue = "Max Discount Value should be less than Min Purchase Value.";
    }
    if (values.value && parseFloat(values.minpurchasevalue) < parseFloat(values.value)) {
      errors.minpurchasevalue = "Min Purchase Value should be greater than Discount Value.";
    }
    if (values.enddate && values.startdate > values.enddate) {
      errors.enddate = "End Date should be later than Start Date.";
    }
    if (!values.type) {
      errors.type = "Please select a coupon type.";
    }
    if (!values.value) {
      errors.value = "Please enter a discount value.";
    }
    if (!values.startdate) {
      errors.startdate = "Please select a Start Date.";
    }
    if (!values.enddate) {
      errors.enddate = "Please select an End Date.";
    }
    if (!values.minpurchasevalue) {
      errors.minpurchasevalue = "Please enter Min Purchase Value.";
    }
    if (values.mincouponvalue && !values.mincouponvalue) {
      errors.mincouponvalue = "Please enter Max Discount Value.";
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
      limitation: values.limitation,
      service: values.service, // Add selected service to the request
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
          navigate("/admin/coupon");
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
      limitation: row?.limitation || "",
      service: row?.service || "", // Set the initial service value (if available)
      id: "",
    },
    validate,
    onSubmit,
  });

  // Watch type field for changes
  useEffect(() => {
    setIsFixed(formik.values.type === "fixed");
  }, [formik.values.type]);

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      label_size: 6,
      col_size: 6,
      disable: true, // Name field will be non-editable
      star: true,
    },
    {
      name: "code",
      label: "Coupon Code",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: true, // Coupon Code will be non-editable
      star: true,
    },
    {
      name: "type",
      label: "Type",
      type: "select",
      label_size: 12,
      col_size: 6,
      disable: true, // Type field is editable
      options: [
        { value: "percentage", label: "Percentage" },
        { value: "fixed", label: "Fixed" },
      ],
      star: true,
    },
    {
      name: "value",
      label: "Percent/Fixed Discount",
      type: "number",
      label_size: 12,
      col_size: 6,
      disable: false, // Always editable
      showWhen: (values) => values.type === "fixed" || values.type === "percentage", // Editable for both types
      star: true,
    },
    {
      name: "minpurchasevalue",
      label: "Min Purchase Value",
      type: "number",
      label_size: 12,
      col_size: 6,
      disable: false, // Always editable
      star: true,
    },
    {
      name: "mincouponvalue",
      label: "Max Discount Value",
      type: "number",
      label_size: 12,
      col_size: 6,
      disable: isFixed, // Disable if type is "fixed"
      showWhen: (values) => values.type === "percentage",
      star: true,
    },
    {
      name: "startdate",
      label: "Start Date",
      type: "date1",
      label_size: 12,
      col_size: 6,
      disable: true, // Start Date will be non-editable
      star: true,
    },
    {
      name: "enddate",
      label: "End Date",
      type: "date",
      label_size: 12,
      col_size: 6,
      disable: false, // Always editable
      star: true,
    },
    {
      name: "limitation",
      label: "Set Limit",
      type: "number",
      label_size: 12,
      col_size: 6,
      disable: true, // Set Limit will be non-editable
      star: true,
    },
    {
      name: "service",
      label: "Select Service",
      type: "select",
      label_size: 12,
      col_size: 6,
      disable: true, // Select Service will be non-editable
      options: [
        { label: "All", value: "0" },
        ...servicedata?.map((item) => ({
          label: item?.title,
          value: item?._id,
        })),
      ],
      star: true,
    },
  ];

  return (
    <div style={{ marginTop: "100px" }}>
      <DynamicForm
        fields={fields.filter((field) => !field.showWhen || field.showWhen(formik.values))}
        page_title="Update Coupon Code"
        btn_name="Update Coupon"
        btn_name1="Cancel"
        formik={formik}
        sumit_btn={true}
        btn_name1_route={"/admin/coupon"}
        additional_field={<></>}
      />
    </div>
  );
};

export default Updatecoupon;
