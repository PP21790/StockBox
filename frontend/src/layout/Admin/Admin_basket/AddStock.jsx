import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Formik, Field, Form } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { Addstockbasketform } from "../../../Services/Admin";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";


const AddStock = () => {
  const { id: basket_id } = useParams(); // Extract basket_id from the URL
  const [selectedServices, setSelectedServices] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

 

  // Update the validation schema dynamically
  const getValidationSchema = (formData) => {
    return Yup.object().shape(
      Object.keys(formData).reduce((acc, serviceKey) => {
        acc[serviceKey] = Yup.object({
          name: Yup.string().required(`${serviceKey} name is required`),
          tradesymbol: Yup.string().required(`${serviceKey} trade symbol is required`),
          percentage: Yup.number()
            .required(`${serviceKey} percentage is required`)
            .min(0, `${serviceKey} percentage must be at least 0`)
            .max(100, `${serviceKey} percentage cannot exceed 100`),
          price: Yup.number()
            .required(`${serviceKey} price is required`)
            .min(0, `${serviceKey} price must be greater than 0`),
        });
        return acc;
      }, {})
    );
  };

  // Update the initial form values dynamically
  const getInitialValues = (formData) => {
    const initialValues = {};
    if (formData) {
      Object.keys(formData).forEach((key) => {
        initialValues[key] = formData[key];
      });
    }
    return initialValues;
  };

  useEffect(() => {
    // Whenever selectedServices change, update the initial formData structure
    const initialData = selectedServices.reduce((acc, service) => {
      acc[service.value] = { name: "", tradesymbol: "", percentage: "", price: "" };
      return acc;
    }, {});

    setFormData(initialData);
  }, [selectedServices]);

  const handleServiceChange = (selectedOption) => {
    console.log("Selected Option:", selectedOption);
    setSelectedServices(selectedOption);

    // if (
    //   selectedOption &&
    //   !selectedServices.some(
    //     (service) => service.value === selectedOption.value
    //   )
    // ) {
    //   setSelectedServices(selectedOption);
    // }
  };

  const handleRemoveService = (serviceValue) => {
    console.log("Removing service:", serviceValue);
    setSelectedServices((prevServices) =>
      prevServices.filter((service) => service.value !== serviceValue)
    );
  };

  const handleSubmit = async (values) => {
    const token = localStorage.getItem("token");

    if (!basket_id) {
      Swal.fire({
        title: "Error",
        text: "Basket ID is missing in the URL. Please try again.",
        icon: "error",
      });
      return;
    }

    console.log("Basket ID from URL:", basket_id);
    console.log("Form Data:", values);

    const req = {
      basket_id, // Use the basket_id from the URL
      stocks: Object.values(values),
    };

    try {
      const response = await Addstockbasketform(req, token);
      console.log("API Response:", response);

      if (response.status) {
        Swal.fire({
          title: "Success",
          text: response.message,
          icon: "success",
        });
        setTimeout(() => navigate("/admin/basket"), 1500);
      } else {
        Swal.fire({
          title: "Error",
          text: response.message,
          icon: "error",
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred. Please try again later.",
        icon: "error",
      });
    }
  };


  const fetchOptions = async (inputValue) => {
    try {
      // Ensure inputValue is a string
      if (typeof inputValue !== "string") {
        inputValue = "";
      }

      // If inputValue is empty, don't make the request
      if (!inputValue) {
        setOptions([]); // Reset options if no input
        setLoading(false);
        return;
      }

      setLoading(true); // Start loading

      // Making the API request dynamically based on the input
      const data = JSON.stringify({
        symbol: inputValue,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://192.168.0.11:5001/stock/getstockbysymbol",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);

      // Check if the response has the correct data format
      if (response.data && Array.isArray(response.data.data)) {
        const fitervalue = response.data.data.map((item) => ({
          label: String(item._id), // Ensure label is a string
          value: String(item._id), // Ensure value is a string
        }));

        setOptions(fitervalue); // Update options state
      } else {
        setOptions([]); // Reset options if response is incorrect
      }
    } catch (error) {
      console.error("Error fetching options:", error);
      setOptions([]); // Reset options on error
    } finally {
      setLoading(false); // Stop loading
    }
  };
console.log("selectedServices",selectedServices);


  return (
    <div className="page-content">
      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3">Add Stock</div>
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
      <hr />
      <div className="card">
        <div className="card-body">
          <Formik
            initialValues={getInitialValues(formData)} // Make sure formData is not null or undefined
            validationSchema={getValidationSchema(formData)} // Make sure validation schema is valid
            onSubmit={handleSubmit}
          >
            {({ handleChange, values, handleSubmit, touched, errors }) => (
              <Form onSubmit={handleSubmit}>
                <div className="row">
                <div className="col-6 ">
          <input
            type="text"
            placeholder="Search..."
            className="form-control"
            onChange={(e) => fetchOptions(e.target.value)}
          />
        </div>
        <div className="col-6 ">
                <Select
                  options={options}
                  onChange={handleServiceChange}
                  placeholder="Select a stock"
                  isClearable

                  isMulti
                  name="colors"
                  className="basic-multi-select"
                  classNamePrefix="select"
                  isLoading={loading} // Show loading indicator while fetching


                />

</div>
</div>
                {selectedServices && selectedServices.map((service) => (
                  <div key={service.value} className="mt-4">
                    {console.log(service)}
                    <h5>
                      {service.label}
                      <button
                      
                        type="button"
                        className="btn btn-danger btn-sm float-end"
                        onClick={() => handleRemoveService(service.value)}
                      >
                        <i className="bx bx-trash m-0"></i>
                      </button>
                    </h5>
                    <div className="row">
                      {Object.keys(formData[service.value] || {}).map(
                        (fieldKey, index) => (
                          <div key={index} className="col-md-3">
                            <label>{fieldKey}</label>
                            <Field
                              type={fieldKey === "percentage" || fieldKey === "price" ? "number" : "text"}
                              name={`${service.value}.${fieldKey}`}
                              className={`form-control ${
                                touched[service.value]?.[fieldKey] && errors[service.value]?.[fieldKey]
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder={`Enter ${fieldKey}`}
                            />
                            {touched[service.value]?.[fieldKey] && errors[service.value]?.[fieldKey] && (
                              <div className="invalid-feedback">
                                {errors[service.value]?.[fieldKey]}
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}
                <button type="submit" className="btn btn-primary mt-4">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddStock;



