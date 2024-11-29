import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Addplanbyadmin, getcategoryplan, getplanlist, getActivecategoryplan } from '../../../Services/Admin';



const Addplan = () => {


    const navigate = useNavigate();
    const user_id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const [clients, setClients] = useState([]);
    const [plan, setPlan] = useState([]);


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
            title: "",
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
                    navigate("/staff/plan");
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
            col_size: 4,
            disable: false,
        },
        {
            name: "validity",
            label: "Validity",
            type: "select",
            label_size: 12,
            col_size: 4,
            disable: false,
            options: [
                { value: "1 month", label: "1 Month" },
                { value: "3 months", label: "3 Months" },
                { value: "6 months", label: "6 Months" },
                { value: "1 year", label: "1 Year" }
            ].filter((option) => {
                return !plan.some((item) => item?.validity === option.value);
            })
        },
        
        
        {
            name: "price",
            label: "Price",
            type: "number",
            label_size: 12,
            col_size: 4,
            disable: false,
        },

        {
            name: "description",
            label: "Description",
            type: "text5",
            label_size: 12,
            col_size: 12,
            disable: false,
        },
    ];



    useEffect(() => {
        const getplanlistfordetail = async () => {
            try {
                const response = await getplanlist(token);
                if (response.status) {
                    const filteredPlans = response.data.filter(item => item.category === formik.values.category);
                    setPlan(filteredPlans);

                }
            } catch (error) {
                console.error("Plan list fetch error:", error);
            }
        };
    
        if (formik.values.category) {
            getplanlistfordetail();
        }
    }, [formik.values.category]);
    




    return (
        <div style={{ marginTop: "100px" }}>
            <DynamicForm
                fields={fields}
                formik={formik}
                page_title="Add New Plan"
                btn_name="Add Plan"
                btn_name1="Cancel"
                sumit_btn={true}
                btn_name1_route={"/staff/plan"}
                additional_field={<></>}
            />
        </div>
    );
};

export default Addplan;
