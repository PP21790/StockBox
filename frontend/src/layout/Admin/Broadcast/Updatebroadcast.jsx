import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { SendBroadCast, GetService, UpdateCastmessage } from '../../../Services/Admin';

const Updatebroadcast = () => {
    const location = useLocation();
    const { item } = location.state;
  

    const [servicedata, setServicedata] = useState([]);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const getservice = async () => {
        try {
            const response = await GetService(token);
            if (response.status) {
                setServicedata(response.data);
            }
        } catch (error) {
            console.log("Error fetching services:", error);
        }
    };

    useEffect(() => {
        getservice();
    }, []);

    const formik = useFormik({
        initialValues: {
            service: item?.service ? item.service.split(',') : [], 
            subject: item?.subject || "",
            message: item?.message || "",
        },

        onSubmit: async (values) => {
            const req = {
                message: values.message,
                id: item._id,
                subject: values.subject,
                service: values.service.join(','), 
            };

            try {
                const response = await UpdateCastmessage(req, token);
                if (response.status) {
                    Swal.fire({
                        title: "Update Successful!",
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
                Swal.fire({
                    title: "Error",
                    text: "An unexpected error occurred. Please try again later.",
                    icon: "error",
                    timer: 1500,
                    timerProgressBar: true,
                });
            }
        },
    });

    const fields = [
        {
            name: "service",
            label: "Select Service",
            type: "selectchecbox",
            label_size: 6,
            col_size: 6,
            disable: false,
            options: servicedata && servicedata.length > 0 && servicedata.map((item) => ({
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
            {servicedata && servicedata.length > 0 && (
                <DynamicForm
                    fields={fields}
                    formik={formik}
                    page_title="Update Broadcast"
                    btn_name="Update Broadcast"
                    btn_name1="Cancel"
                    sumit_btn={true}
                    btn_name1_route={"/admin/message"}
                    additional_field={<></>}
                />
            )}
        </div>
    );
};

export default Updatebroadcast;
