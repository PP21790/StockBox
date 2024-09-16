import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Addplanbyadmin , getcategoryplan } from '../../../Services/Admin';




const Addplan = () => {
  

    const navigate = useNavigate();

    const user_id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const [clients, setClients] = useState([]);
  

    const getcategoryplanlist = async () => {
        try {
            const response = await getcategoryplan(token);
            if (response.status) {
                setClients(response.data);
            }
        } catch (error) {
            console.log("error");
        }
    }

    useEffect(() => {
        getcategoryplanlist();
    }, []);


    const validate = (values) => {
        let errors = {};

        if (!values.title) {
            errors.title = "Please enter Full Name";
        }
        if (!values.description) {
            errors.description = "Please enter Email";
        }
        if (!values.price) {
            errors.PhoneNo = "Please enter Phone Number";
        }
        if (!values.validity) {
            errors.category = "Please enter password";
        }
        if (!values.category) {
            errors.category = "Please enter password";
        }
       

        return errors;
    };

    const onSubmit = async (values) => {
        const req = {
            title: values.title,
            description: values.description,
            price: values.price,
            validity: values.validity,
            category: values.category,
            add_by: user_id,
        };

        try {
            const response = await Addplanbyadmin(req, token);
            if (response.status) {
                Swal.fire({
                    title: "Create Successful!",
                    text: response.message,
                    icon: "success",
                    timer: 1500,
                    timerProgressBar: true,
                });
                setTimeout(() => {
                    navigate("/admin/plan");
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
            title: "",
            description: "",
            price: "",
            validity: "",
            category:"",
            add_by: "",
        },
        validate,
        onSubmit,
    });

    const fields = [
        {
            name: "Title",
            label: "title",
            type: "text",
            label_size: 6,
            col_size: 6,
            disable: false,
        },
        {
            name: "Email",
            label: "Email",
            type: "text",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "price",
            label: "Price",
            type: "number",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "validity",
            label: "Validity",
            type: "select", 
            label_size: 12,
            col_size: 6,
            disable: false,
            options: [
                { value: "1Month", label: "1 Month" },
                { value: "3Month", label: "3 Month" },
                { value: "6Month", label: "6 Month" },
                { value: "1Year", label: "1 Year" },
                { value: "5Year", label: "5 Year" }
            ]  
        },
        
        {
            name: "category",
            label: "Category",
            type: 'select',
            options: clients.map((item) => ({
              label: item.title,
              value: item._id,
            })),
            label_size: 12,
            col_size: 6,
            disable: false,
        },

        {
            name: "Description",
            label: "description",
            type: "password",
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
                page_title="Add New User"
                btn_name="Add User"
                btn_name1="Cancel"
                sumit_btn={true}
                btn_name1_route={"/admin/plan"}
                additional_field={<></>}

            />
        </div>
    );
};

export default Addplan;
