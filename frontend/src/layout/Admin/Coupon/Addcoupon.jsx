import React from 'react';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Addcouponbyadmin } from '../../../Services/Admin';


const Addcoupon = () => {
    const navigate = useNavigate();

    const user_id = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    const validate = (values) => {
        let errors = {};

        if (!values.name) {
            errors.name = "Please enter  Name";
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
            errors.startdate = "Please enter Startdate";
        }
        if (!values.enddate) {
            errors.enddate = "Please enter Enddate";
        }
        if (!values.minpurchasevalue) {
            errors.minpurchasevalue = "Please enter Min Purchase value";
        }
        if (!values.mincouponvalue) {
            errors.mincouponvalue = "Please enter Min Coupon value";
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
            add_by: user_id,
        };

        try {
            const response = await Addcouponbyadmin(req, token);
            if (response.status) {

                Swal.fire({
                    title: "Create Successful!",
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
            console.log("An error occurred", error);
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
            name: '',
            code: '',
            type: '',
            value: '',
            startdate: '',
            enddate: '',
            minpurchasevalue: '',
            mincouponvalue: '',
            description: '',
            image: '',
            add_by: ''
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
            type: "number",
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
                formik={formik}
                page_title="Add Coupon Code"
                btn_name="Add Coupon"
                btn_name1="Cancel"
                sumit_btn={true}
                btn_name1_route={"/admin/coupon"}
                additional_field={<></>}

            />
        </div>
    );
};

export default Addcoupon;
