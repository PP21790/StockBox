import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import {getcategoryplan, getbyidplan , Updateplan } from '../../../Services/Admin';

const Editplan = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    const user_id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const [clients, setClients] = useState([]);
    const [info, setInfo] = useState({});




    const getcategoryplanlist = async () => {
        try {
            const response = await getcategoryplan(token);
            if (response.status) {
                setClients(response.data);
            }
        } catch (error) {
            console.log("error");
        }
    };

    const getplaninfo = async () => {
        try {
            const response = await getbyidplan(id, token);
            if (response.status) {
                setInfo(response.data); 
            }
        } catch (error) {
            console.error("Failed to fetch plans", error);
        }
    };

    useEffect(() => {
        getcategoryplanlist();
        getplaninfo();
    }, []);


    const validate = (values) => {
        let errors = {};
        if (!values.title) errors.title = "Please enter Title";
        if (!values.description) errors.description = "Please enter Description";
        if (!values.price) errors.price = "Please enter Price";
        if (!values.validity) errors.validity = "Please enter Validity";
        if (!values.category) errors.category = "Please enter Category";
        return errors;
    };

    const onSubmit = async (values) => {
        const req = {
            title: values.title,
            description: values.description,
            price: values.price,
            totaldays: values.validity,
            category: values.category,
            id: id,
        };

        try {
            const response = await Updateplan(req, token);
            if (response.status) {
                Swal.fire({
                    title: "Edit Successful!",
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
            title: info.title || "",
            description: info.description || "",
            price: info.price || "",
            validity: info.validity || "",
            category: info.category || "",
        },
        enableReinitialize: true, // This ensures the form is re-initialized when 'info' is updated
        validate,
        onSubmit,
    });

    const fields = [
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
            name: "validity",
            label: "Validity",
            type: "select",
            label_size: 12,
            col_size: 6,
            disable: false,
            options: [
                { value: "3 months", label: "3 months" },
                { value: "6 months", label: "6 months" },
                { value: "9 months", label: "9 months" },
                { value: "1 year", label: "1 year" },
                { value: "2 years", label: "2 years" },
                { value: "3 years", label: "3 years" },
                { value: "4 years", label: "4 years" },
                { value: "5 years", label: "5 years" }
            ]
        },
        {
            name: "title",
            label: "Title",
            type: "text",
            label_size: 6,
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
            name: "description",
            label: "Description",
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
                page_title="Edit Plan"
                btn_name="Edit Plan"
                btn_name1="Cancel"
                sumit_btn={true}
                btn_name1_route={"/admin/plan"}
                additional_field={<></>}
            />
        </div>
    );
};

export default Editplan;
