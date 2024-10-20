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
            errors.service = "Please enter service";
        }
        if (!values.subject) {
            errors.subject = "Please enter subject";
        }
        if (!values.message) {
            errors.message = "Please enter message";
        }
        return errors;
    };

    const onSubmit = async (values) => {
        const req = {
            service: values.service,
            subject: values.subject,
            message: values.message,
        };

        try {
            const response = await SendBroadCast(req, token);
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
            console.error("Error in API call:", error);
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
        },
        validate,
        onSubmit,
    });

    const fields = [
        {
            name: "service",
            label: "Select Service",
            type: "selectchecbox",
            label_size: 6,
            col_size: 6,
            disable: false,
            options: servicedata  && servicedata.length > 0 && servicedata?.map((item) => ({
                label: item?.title,
                value: item?._id,
            })),
        },
        {
            name: "subject",
            label: "Subject",
            type: "text",
            label_size: 12,
            col_size: 6,
            disable: false,
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
