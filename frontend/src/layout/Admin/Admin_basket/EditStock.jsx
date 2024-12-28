import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import Swal from 'sweetalert2';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateStockList, Viewbasket } from '../../../Services/Admin';


const EditStock = () => {


    const location = useLocation()
    const { stock } = location.state;

    console.log("stock", stock)

    const navigate = useNavigate();

    const user_id = localStorage.getItem("id");
    const token = localStorage.getItem("token");


    useEffect(() => {
        if (data) {
            formik.setValues({
                title: data.title || "",
                description: data.description || "",
                basket_price: data.basket_price || "",
                mininvamount: data.mininvamount || "",
                themename: data.themename || "",
                frequency: data.frequency || "",
                validity: data?.validity ? data?.validity : "",
                next_rebalance_date: data?.next_rebalance_date ? data?.next_rebalance_date : "",
            });
        }
    }, [data]);


    const validate = (values) => {
        let errors = {};

        if (!values.title) {
            errors.title = "Please Enter Title";
        }

        if (!values.themename) {
            errors.themename = "Please Enter Theme Name";
        }

        if (!values.basket_price) {
            errors.basket_price = "Please Enter Basket Price";
        }
        if (!values.mininvamount) {
            errors.mininvamount = "Please Enter Minimum Investment Amount";
        }
        if (!values.frequency) {
            errors.frequency = "Please Enter Frequency";
        }

        if (!values.validity) {
            errors.validity = "Please Select Validity";
        }

        if (!values.next_rebalance_date) {
            errors.next_rebalance_date = "Please Select Rebalance Date";
        }

        if (!values.description) {
            errors.description = "Please Enter Description";
        }

        return errors;
    };

    const onSubmit = async (values) => {

        const req = {
            title: values.title,
            // id: data._id,
            description: values.description,
            basket_price: values.basket_price,
            mininvamount: values.mininvamount,
            themename: values.themename,
            frequency: values.frequency,
            validity: values.validity,
            next_rebalance_date: values.next_rebalance_date

        };


        try {
            const response = await updateStockList(req, token);

            if (response.status) {
                Swal.fire({
                    title: "Client Create Successfull !",
                    text: response.message,
                    icon: "success",
                    timer: 1500,
                    timerProgressBar: true,
                });
                setTimeout(() => {
                    navigate("/admin/basket");
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
            id: "",
            title: "",
            description: "",
            basket_price: "",
            add_by: "",
            mininvamount: "",
            themename: "",
            frequency: "",
            validity: "",
            next_rebalance_date: ""
        },
        validate,
        onSubmit,
    });




    const fields = [
        {
            name: "title",
            label: "Basket Name",
            type: "text",
            label_size: 6,
            col_size: 6,
            disable: false,
            star: true
        },
        {
            name: "themename",
            label: "Theme Name",
            type: "text",
            label_size: 6,
            col_size: 6,
            disable: false,
            star: true
        },

        {
            name: "basket_price",
            label: "Basket Price",
            type: "number",
            label_size: 12,
            col_size: 6,
            disable: false,
            star: true

        },
        {
            name: "mininvamount",
            label: "MinimumAmount",
            type: "number",
            label_size: 12,
            col_size: 6,
            disable: false,
            star: true
        },
        {
            name: "frequency",
            label: "Frequency",
            type: "number",
            label_size: 12,
            col_size: 6,
            disable: false,
            star: true
        },

        {
            name: "validity",
            label: "Validity",
            type: "select",
            label_size: 12,
            col_size: 6,
            disable: false,
            options: [
                { value: "1 month", label: "1 Month" },
                { value: "3 months", label: "3 Months" },
                { value: "6 months", label: "6 Months" },
                { value: "1 year", label: "1 Year" }
            ],
            star: true
        },
        {
            name: "next_rebalance_date",
            label: "Rebalance Date",
            type: "date",
            label_size: 12,
            col_size: 6,
            disable: false,
            star: true
        },
        {
            name: "description",
            label: "Description",
            type: "text",
            label_size: 12,
            col_size: 6,
            disable: false,
            star: true
        },
    ];




    return (
        <div style={{ marginTop: "100px" }}>
            <DynamicForm
                fields={fields}
                formik={formik}
                page_title="Edit Basket"
                btn_name="Edit Basket"
                btn_name1="Cancel"
                sumit_btn={true}
                btn_name1_route={"/admin/basket"}
                additional_field={<></>}

            />
        </div>
    );
};

export default EditStock;
