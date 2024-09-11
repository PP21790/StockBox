import React from 'react';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AddSignalByAdmin } from '../../../Services/Admin';


const AddSignal = () => {

    const navigate = useNavigate();

    const user_id = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    const validate = (values) => {
        let errors = {};

        if (!values.price) {
            errors.price = "Please enter Price";
        }
        if (!values.service) {
            errors.service = "Please enter service";
        }
        if (!values.calltype) {
            errors.calltype = "Please enter calltype";
        }
        if (!values.callduration) {
            errors.callduration = "Please enter Call Duration";
        }
        if (!values.stock) {
            errors.stock = "Please enter stock";
        }
        if (!values.tag1) {
            errors.tag1 = "Please enter tag1";
        }
        if (!values.tag2) {
            errors.tag2 = "Please enter tag2";
        }
        if (!values.tag3) {
            errors.tag3 = "Please enter tag3";
        }
        if (!values.stoploss) {
            errors.stoploss = "Please enter stoploss";
        }
        if (!values.add_by) {
            errors.stoploss = "Please enter stoploss";
        }
        if (!values.description) {
            errors.description = "Please enter description";
        }
        if (!values.report) {
            errors.report = "Please enter report";
        }

    };

    const onSubmit = async (values) => {
        const req = {
            price: values.price,
            service: values.service,
            calltype: values.calltype,
            callduration: values.callduration,
            stock: values.stock,
            tag1: values.tag1,
            tag2: values.tag2,
            tag3: values.tag3,
            stoploss: values.stoploss,
            add_by: user_id,
            description: values.description,
            report: values.report,
        };

        try {
            const response = await AddSignalByAdmin(req, token);
            if (response.status) {
                Swal.fire({
                    title: "Create Successful!",
                    text: response.msg,
                    icon: "success",
                    timer: 1500,
                    timerProgressBar: true,
                });
                setTimeout(() => {
                    navigate("/admin/client");
                }, 1500);
            } else {
                Swal.fire({
                    title: "Error",
                    text: response.msg,
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
            price: "",
            service: "",
            calltype: "",
            callduration: "",
            stock: "",
            tag1: "",
            tag2: "",
            tag3: "",
            stoploss: "",
            add_by: user_id,
            description: "",
            report: "",
        },
        validate,
        onSubmit,
    });

    const fields = [
        {
            name: "price",
            label: "Price",
            type: "number",
            label_size: 6,
            col_size: 6,
            disable: false,
        },
        {
            name: "service",
            label: "Service",
            type: "text",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "calltype",
            label: "calltype",
            type: "text3",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "callduration",
            label: "Call Duration",
            type: "number",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "stock",
            label: "Stock",
            type: "text",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "tag1",
            label: "tag1",
            type: "number",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "tag2",
            label: "tag2",
            type: "number",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "tag3",
            label: "tag3",
            type: "number",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "stoploss",
            label: "stoploss",
            type: "number",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "description",
            label: "description",
            type: "text",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "report",
            label: "report",
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
                page_title="Add Signal"
                btn_name="Add Signal"
                btn_name1="Cancel"
                formik={formik}
                btn_name1_route={"/admin/client"}
                additional_field={<></>}
            />
        </div>
    );
};

export default AddSignal;
