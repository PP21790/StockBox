import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Addplanbyadmin, getcategoryplan, getActivecategoryplan } from '../../../Services/Admin';



const Addplan = () => {


    const navigate = useNavigate();
    const user_id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const [clients, setClients] = useState([]);



    const getcategoryplanlist = async () => {
        try {
            const response = await getActivecategoryplan(token);
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
            errors.title = "Please enter Title";
        }
        if (!values.description) {
            errors.description = "Please enter Description";
        }
        if (!values.price) {
            errors.price = "Please enter Price";
        }
        if (values.price && values.price < 0) {
            errors.price = "Please Enter Price greater Than 0";
        }
        if (!values.validity) {
            errors.validity = "Please enter Validity";
        }
        if (!values.category) {
            errors.category = "Please enter Category";
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
            category: "",
            add_by: "",
        },
        validate,
        onSubmit,
    });




    const fields = [
        {
            name: "category",
            label: "Category",
            type: 'select',
            options: clients.map((item) => ({
                label: `${item.title} (${item.servicesDetails.map(service => service.title).join(', ')})`,
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
                { value: "1 months", label: "1 months" },
                { value: "3 months", label: "3 months" },
                { value: "6 months", label: "6 months" },
                { value: "9 months", label: "9 months" },
                { value: "1 years", label: "1 years" }

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
                page_title="Add New Plan"
                btn_name="Add Plan"
                btn_name1="Cancel"
                sumit_btn={true}
                btn_name1_route={"/admin/plan"}
                additional_field={<></>}
            />
        </div>
    );
};

export default Addplan;
