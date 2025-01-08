import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { updateStockList } from "../../../Services/Admin";
import Swal from "sweetalert2";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as Config from "../../../Utils/config";

const EditStock = () => {
    const location = useLocation();
    const { stock } = location.state || {};

    const [selectedServices, setSelectedServices] = useState([]);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [formikValues, setFormikValues] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (stock && Array.isArray(stock)) {
            setSelectedServices(
                stock.map((item) => ({
                    label: item.name || item.symbol || item.tradesymbol || "",
                    value: String(item._id),
                    tradesymbol: item.tradesymbol,
                    name: item.name || item.symbol || "",
                    weightage: item.weightage || "",
                    price: item.price || "",
                    type: item.type || "",
                }))
            );
        }
    }, [stock]);

    const fetchOptions = async (inputValue) => {
        if (!inputValue) {
            setOptions([]);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                `${Config.base_url}stock/getstockbysymbol`,
                { symbol: inputValue },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.data?.data) {
                setOptions(
                    response.data.data.map((item) => ({
                        label: String(item._id),
                        value: String(item._id),
                        tradesymbol: item.data[0]?.tradesymbol,
                    }))
                );
            } else {
                setOptions([]);
            }
        } catch (error) {
            console.error("Error fetching options:", error);
            setOptions([]);
        } finally {
            setLoading(false);
        }
    };


    const handleServiceChange = (selectedOption) => {
        const uniqueServices = selectedOption.filter(
            (newOption) =>
                !selectedServices.some((service) => service.value === newOption.value)
        );


        // Add new services at the top
        const updatedServices = [...uniqueServices, ...selectedServices];

        setSelectedServices(updatedServices);

        const newFormikValues = { ...formikValues };
        uniqueServices.forEach((service) => {
            newFormikValues[service.value] = {
                tradesymbol: service.tradesymbol,
                name: service.label,
                weightage: service.weightage || "",
                price: service.price || "",
                type: service.type || "",
            };
        });
        setFormikValues(newFormikValues);
    };


    // const handleRemoveService = (serviceValue) => {
    //     setSelectedServices((prev) =>
    //         prev.filter((service) => service.value !== serviceValue)
    //     );
    // };



    const handleRemoveService = (serviceValue) => {
        setSelectedServices((prev) =>
            prev.filter((service) => service.value !== serviceValue)
        );

        setFormikValues((prevValues) => {
            const updatedValues = { ...prevValues };
            delete updatedValues[serviceValue];
            return updatedValues;
        });
        setOptions((prevOptions) =>
            prevOptions.filter((option) => option.value !== serviceValue)
        );
    }



    useEffect(() => {
        const initialValues = selectedServices.reduce((acc, service) => {
            acc[service.value] = {
                tradesymbol: service.tradesymbol,
                name: service.name || service.symbol || service.label,
                weightage: service.weightage || "",
                price: service.price || "",
                type: service.type || "",
            };
            return acc;
        }, {});
        setFormikValues(initialValues);
    }, [selectedServices]);



    const validationSchema = Yup.object(
        selectedServices.reduce((acc, service) => {
            acc[service.value] = Yup.object({
                name: Yup.string().required("Name is required"),
                weightage: Yup.number()
                    .min(0, "Weightage should be between 0 and 100")
                    .max(100, "Weightage should be between 0 and 100")
                    .required("This field is required"),
                price: Yup.number()
                    .min(0, "Price should be greater than 0")
                    .required("This field is required"),
            });
            return acc;
        }, {})
    );

    const handleSubmit = async (values, status) => {
        // Check if there are no selected stocks
        if (Object.keys(values).length === 0) {
            Swal.fire("error", "Stock is required for edit", "warning");

            return;
        }

        const totalWeightage = Object.values(values).reduce(
            (sum, stock) => sum + Number(stock.weightage || 0),
            0
        );

        if (totalWeightage !== 100) {
            Swal.fire(
                "Error",
                "Total weightage of all stocks must be exactly 100.",
                "error"
            );
            return;
        }

        const stocksWithStatus = Object.values(values).map((stock) => ({
            ...stock,
            status,
            name: stock.name || stock.symbol,
            percentage: stock.weightage,
        }));

        const version = stock && stock[0]?.version ? stock[0].version : '';

        const requestData = {
            basket_id: stock[0]?.basket_id || "",
            stocks: stocksWithStatus,
            version,
            publishstatus: status == 0 ? false : status == 1 ? true : ""
        };

        try {
            const response = await updateStockList(requestData);
            if (response?.status) {
                Swal.fire("Success", response.message, "success");
                setTimeout(() => navigate("/admin/basket"), 1500);
            } else {
                Swal.fire("Error", response.message, "error");
            }
        } catch (error) {
            Swal.fire(
                "Error",
                "An unexpected error occurred. Please try again.",
                "error"
            );
        }
    };



    const handleInputChange = (value) => {
        setInputValue(value);
        fetchOptions(value);
    };

    return (
        <div className="page-content">
            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div className="breadcrumb-title pe-3">Edit Stock </div>
                <div className="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 p-0">
                            <li className="breadcrumb-item">
                                <Link to="/admin/dashboard">
                                    <i className="bx bx-home-alt" />
                                </Link>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            <hr />
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-12">
                            <Select
                                inputValue={inputValue}
                                onInputChange={handleInputChange}
                                options={options}
                                onChange={handleServiceChange}
                                placeholder="Search and select stocks..."
                                isClearable
                                isMulti
                                isLoading={loading}
                                noOptionsMessage={() =>
                                    loading ? "Loading..." : "No options found"
                                }
                            />
                        </div>
                    </div>
                    <Formik
                        initialValues={formikValues}
                        validationSchema={validationSchema}
                        enableReinitialize
                        onSubmit={(values, { setSubmitting }) => {
                            handleSubmit(values, 0);
                            setSubmitting(false);
                        }}
                    >
                        {({ values }) => (
                            <Form>
                                {selectedServices.map((service) => (
                                    <div key={service.value} className="mt-4">
                                        <h5>
                                            {service.label}
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm float-end"
                                                onClick={() => handleRemoveService(service.value)}
                                            >
                                                <i className="bx bx-trash" />
                                            </button>
                                        </h5>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <label>Name</label>
                                                <Field
                                                    name={`${service.value}.name`}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Name"
                                                />
                                                <ErrorMessage
                                                    name={`${service.value}.name`}
                                                    component="p"
                                                    className="text-danger"
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label>Weightage</label>
                                                <Field
                                                    name={`${service.value}.weightage`}
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Enter weightage"
                                                />
                                                <ErrorMessage
                                                    name={`${service.value}.weightage`}
                                                    component="p"
                                                    className="text-danger"
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label>Price</label>
                                                <Field
                                                    name={`${service.value}.price`}
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Enter Price"
                                                />
                                                <ErrorMessage
                                                    name={`${service.value}.price`}
                                                    component="p"
                                                    className="text-danger"
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label>Type</label>
                                                <Field
                                                    as="select"
                                                    name={`${service.value}.type`}
                                                    className="form-control"
                                                >
                                                    <option value="">Select Type</option>
                                                    <option value="Large Cap">Large Cap</option>
                                                    <option value="Mid Cap">Mid Cap</option>
                                                    <option value="Small Cap">Small Cap</option>
                                                </Field>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="btn btn-primary mt-4"
                                    onClick={() => handleSubmit(values, 0)}
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary mt-4 ms-2"
                                    onClick={() => handleSubmit(values, 1)}
                                >
                                    Submit & Publish
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default EditStock;
