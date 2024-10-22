import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Addblogsbyadmin} from '../../../Services/Admin';


const Addblogs = () => {


    const navigate = useNavigate();


    const user_id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
  

    
     

    const validate = (values) => {
        let errors = {};

        if (!values.title) {
            errors.title = "Please enter title";
        }
        if (!values.description) {
            errors.description = "Please enter description";
        }
        if (!values.image) {
            errors.image = "Please enter image";
        }
        console.log("errors",errors)

        return errors;
    };

    const onSubmit = async (values) => {
        const req = {
            title: values.title,
            description: values.description,
            image: values.image,
            add_by: user_id ,
        };
       
        try {
            const response = await Addblogsbyadmin(req, token);
            if (response.status) {
                Swal.fire({
                    title: "Blog Add  Successful!",
                    text: response.message,
                    icon: "success",
                    timer: 1500,
                    timerProgressBar: true,
                });
                setTimeout(() => {
                    navigate("/staff/blogs");
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
            image: "", 
        },
        validate,
        onSubmit,
    });

    const fields = [
       
        {
            name: "title",
            label: "Title",
            type: "text",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "image",
            label: "Upload Image",
            type: "file2",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "description",
            label: "Description",
            type: "ckeditor", 
            label_size: 12,
            col_size: 12,
            disable: false,
        },
    ];

    return (
        <div style={{ marginTop: "100px" }}>
            <DynamicForm
                fields={fields}
                formik={formik}
                page_title="Add Blog"
                btn_name="Add Blog"
                btn_name1="Cancel"
                sumit_btn={true}
                btn_name1_route={"/staff/blogs"}
                additional_field={<></>}
            />
           
           
        </div>
    );
};

export default Addblogs;
