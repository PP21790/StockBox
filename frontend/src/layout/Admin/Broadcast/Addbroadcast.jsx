import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import DynamicForm from '../../../components/FormicForm';
import { useNavigate } from 'react-router-dom';
import { SendBroadCast, GetService } from '../../../Services/Admin';

const Addbroadcast = () => {

    const navigate = useNavigate();
    const [servicedata, setServicedata] = useState([]);
    
    useEffect(() => {
        getservice();
    }, []);


  
    const user_id = localStorage.getItem("id");
    const token = localStorage.getItem("token");


    
    const getservice = async () => {
        try {
            const response = await GetService(token);
            if (response.status) {
                setServicedata(response.data);
            }
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    

    const validate = (values) => {
        let errors = {};
        if (!values.service) {
            errors.service = "Please Enter Service";
        }
        if (!values.subject) {
            errors.subject = "Please Enter Subject";
        }
        if (!values.message) {
            errors.message = "Please Enter Message";
        }
        if (!values.type) {
            errors.type = "Please Enter Type";
        }
        return errors;
    };

    const onSubmit = async (values) => {
        const req = {
            service: values.service,
            subject: values.subject,
            message: values.message,
            type:  values.type 
        };

        try {
            const response = await SendBroadCast(req, token);
            console.log("response",response)
            if (response.status) {
                Swal.fire({
                    title: "Send Successful!",
                    text: response.message,
                    icon: "success",
                    timer: 1500,
                    timerProgressBar: true,
                });
                setTimeout(() => {
                    navigate("/admin/message");
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
            // console.error("Error in API call:", error);
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
            service: "",
            subject: "",
            message: "",
            type:"" 
            
        },
        validate,
        onSubmit,
    });

    const fields = [
        {
            name: "service",
            label: "Select Service",
            type: "select",       //selectchecbox  for multiple
            label_size: 6,
            col_size: 4,
            disable: false,
            options: servicedata?.map((item) => ({
                label: item?.title,
                value: item?._id,
            })),
        },
        {
            name: "subject",
            label: "Subject",
            type: "text",
            label_size: 12,
            col_size: 4,
            disable: false,
        },
        {
            name: "type",
            label: "Select Type",
            type: "select",
            label_size: 6,
            col_size: 4,
            disable: false,
            options:[
                { value: "all", label: "All" },
                { value: "active", label: "Active" },
                { value: "expired", label: "Expired" },
                { value: "nonsubscribe", label: "Non Subscribe" },
            ]
        },
        {
            name: "message",
            label: "Message",
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
                page_title="Add Broadcast"
                btn_name="Add Broadcast"
                btn_name1="Cancel"
                sumit_btn={true}
                btn_name1_route={"/admin/message"}
                additional_field={<></>}
            />
        </div>
    );
};

export default Addbroadcast;
