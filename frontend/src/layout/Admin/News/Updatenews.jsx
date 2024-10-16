import React from 'react';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AddClient } from '../../../Services/Admin';


const Updatenews = () => {
    const navigate = useNavigate();

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
        if (!values.PhoneNo) {
            errors.PhoneNo = "Please enter Phone Number";
        }
        if (!values.password) {
            errors.password = "Please enter password";
        }
        if (!values.ConfirmPassword) {
            errors.ConfirmPassword = "Please confirm your password";
        } else if (values.password !== values.ConfirmPassword) {
            errors.ConfirmPassword = "Passwords must match";
        }

        return errors;
    };

    const onSubmit = async (values) => {
        const req = {
            FullName: values.FullName,
            Email: values.Email,
            PhoneNo: values.PhoneNo,
            password: values.password,
            add_by: user_id,
        };

        try {
            const response = await AddClient(req, token);
            if (response.status) {
                Swal.fire({
                    title: "Create Successful!",
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
            FullName: "",
            Email: "",
            PhoneNo: "",
            password: "",
            ConfirmPassword: "",
            add_by: "",
        },
        validate,
        onSubmit,
    });

    const fields = [
        {
            name: "Select Service",
            label: "Service",
            type: "text",
            label_size: 6,
            col_size: 6,
            disable: false,
        },
        {
            name: "Subject",
            label: "Subject",
            type: "text",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "Message",
            label: "Message",
            type: "text5",
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
                page_title="Update News"
                btn_name="Update"
                btn_name1="Cancel"
                sumit_btn={true}
                btn_name1_route={"/admin/news"}
                additional_field={<></>}

            />
        </div>
    );
};

export default Updatenews;
