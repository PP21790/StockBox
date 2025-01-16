import React, { useState } from "react";
import { useFormik } from "formik";
import DynamicForm from "../../../../components/FormicForm";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { UpdateBankDetailbyadmin } from "../../../../Services/Admin";
import { image_baseurl } from "../../../../Utils/config";

const Updatebankdetail = () => {


  const navigate = useNavigate();
  const location = useLocation();
  const { row } = location.state;

  const [loading, setLoading] = useState(false);


  const token = localStorage.getItem("token");
  

  const validate = (values) => {
    let errors = {};

    if (!values.name) {
        errors.name = "Please Enter Bank Name";
    }
    if (/\d/.test(values.name)) {
        errors.name = "Numbers are not allowed in the Bank Name";
      }
    if (!values.branch) {
        errors.branch = "Please Enter Branch Name";
    }
    if (/\d/.test(values.branch)) {
        errors.branch = "Numbers are not allowed in the Branch Name";
      }
      if (!values.accountno) {
        errors.accountno = "Please Enter Account Number";
    } else {
        const accountnoStr = values.accountno.toString(); // Ensure it's a string
        if (accountnoStr.length < 9) {
            errors.accountno = "Account Number must be at least 9 digits";
        } else if (accountnoStr.length > 16) {
            errors.accountno = "Account Number must not exceed 16 digits";
        }
    }
    
    if (!values.Confirmnumber) {
        errors.Confirmnumber = "Please Confirm Your Account Number";
      } else if (values.accountno !== values.Confirmnumber) {
        errors.Confirmnumber = "Account Number Must Match";
      }

    
    if (!values.ifsc) {
        errors.ifsc = "Please Enter IFSC Code";
    }
    if (!values.image) {
        errors.image = "Please Select Image";
    }

    return errors;
};

  const onSubmit = async (values) => {
    setLoading(!loading)
    const req = {
             name: values.name,
            branch: values.branch,
            accountno: values.accountno,
            ifsc: values.ifsc,
            image: values.image,
            id: row._id,
    };

    try {
      const response = await UpdateBankDetailbyadmin(req, token);
      if (response.status) {
        Swal.fire({
          title: "Update Successful!",
          text: response.message,
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
        });
        setTimeout(() => {
          navigate("/admin/bankdetail");
        }, 1500);
      } else {
        Swal.fire({
          title: "Error",
          text: response.message,
          icon: "error",
          timer: 1500,
          timerProgressBar: true,
        });
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
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
      branch: row?.branch || "",
      accountno: row?.accountno || "",
      Confirmnumber: row?.accountno || "",
      ifsc: row?.ifsc || "",
      image: row?.image || "",
      id: "",
    },
    validate,
    onSubmit,
  });

  const fields = [
    {
        name: "name",
        label: "Bank Name",
        type: "text",
        label_size: 6,
        col_size: 6,
        disable: false,
    },
    {
        name: "branch",
        label: "Branch Name",
        type: "text",
        label_size: 12,
        col_size: 6,
        disable: false,
    },
    {
        name: "accountno",
        label: "Account Number",
        type: "number",
        label_size: 12,
        col_size: 6,
        disable: false,
    },
    {
        name: "Confirmnumber",
        label: "Confirm Account Number",
        type: "number",
        label_size: 12,
        col_size: 6,
        disable: false,
    },
    {
        name: "ifsc",
        label: "IFSC Code",
        type: "text",
        label_size: 12,
        col_size: 6,
        disable: false,

    },
    {
      name: "image",
      label: "Image",
      type: "file3",
      label_size: 12,
      col_size: 6,
      disable: false,
      image: true,
      imageWidth: "60px",
      imageHeight: "auto",
      src: `${image_baseurl}/uploads/bank/${row.image}`
  },
   

];

  return (
    <div style={{ marginTop: "100px" }}>
      <DynamicForm
        fields={fields.filter(field => !field.showWhen || field.showWhen(formik.values))}
        page_title="Update Detail Code"
        btn_name="Update Detail"
        btn_name1="Cancel"
        formik={formik}
        sumit_btn={true}
        btnstatus={loading}
        btn_name1_route={"/admin/bankdetail"}
        additional_field={<></>}
      />
    </div>
  );
};

export default Updatebankdetail;
