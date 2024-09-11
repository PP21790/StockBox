import React from 'react';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';



const Addsignal = () => {
    
    const formik = useFormik({
        initialValues: {
            FullName: "",
            UserName: "",
            Email: "",
            PhoneNo: "",
            password: "",
            ConfirmPassword: "",
            add_by: "",
        },

    });

    const fields = [
        {

            name: "Select Service",

            label: "Select Service",

            type: "select",

            options: [

                { label: "Demo", value: "1" },

                { label: "2 Day Live", value: "0" },

                { label: "Live", value: "2" },

            ],

            label_size: 12,

            col_size: 6,

            disable: false,

        },

        {

            name: "Buy/Sell",

            label: "Buy/Sell",

            type: "select",

            options: [

                { label: "Buy", value: "1" },

                { label: "Sell", value: "0" },

                { label: "Hold", value: "2" },

            ],

            label_size: 12,

            col_size: 6,

            disable: false,

        },

        {

            name: "Select Stock",

            label: "Selelct Stock",

            type: "select",

            options: [

                { label: "Demo", value: "1" },

                { label: "2 Day Live", value: "0" },

                { label: "Live", value: "2" },

            ],

            label_size: 12,

            col_size: 6,

            disable: false,

        },

        {

            name: "Rate",

            label: "Rate",

            type: "select",

            options: [

                { label: "5%", value: "1" },

                { label: "10%", value: "0" },

                { label: "50%", value: "2" },

            ],

            label_size: 12,

            col_size: 6,

            disable: false,

        },



        {
            name: "Target_1",
            label: "Target-1",
            type: "text",
            label_size: 6,
            col_size: 6,
            disable: false,
        },
        {
            name: "Target-2",
            label: "Target-2",
            type: "text",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "Target-3",
            label: "Target-3",
            type: "text",
            label_size: 12,
            col_size: 6,
            disable: false,
        },

        {
            name: "Stoploss",
            label: "Stoploss",
            type: "text",
            label_size: 12,
            col_size: 6,
            disable: false,
        },

    ];

    return (
        <div>
            <div style={{ marginTop: "100px" }}>
                <DynamicForm
                    fields={fields}
                    page_title="Add Signal"
                    btn_name="Add Signal"
                    btn_name1="Cancel"
                    formik={formik}
                    btn_name1_route={"/admin/signal"}
                    additional_field={<></>}
                />
            </div>
        </div>
    );
}

export default Addsignal;
