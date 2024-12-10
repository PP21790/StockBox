// import React from 'react';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import DynamicForm from '../../../components/DynamicForm';
// import { Addbasketplan } from '../../../Services/Admin';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';

// const fieldConfigurations = [
//     {
//       col_size: 12,
//       name: 'Stock',
//       label: 'Stock',
//       type: 'Stock',
//       placeholder: 'Add Stock',
//       data: [
//         {
//           stocks: '',
//           type: '', // Dropdown for Type (buy, sell, hold)
//           typeOptions: [ // Options for the select field
//             { label: 'Buy', value: 'buy' },
//             { label: 'Sell', value: 'sell' },
//             { label: 'Hold', value: 'hold' },
//           ],
//           suggestedPrice: { min: '', max: '' }, // Two input fields for Suggested Price
//           stockWeightage: '', // Input for Weightage
//           quantity: '', // Input for Quantity
//         },
//       ],
//     },
//   ];

// const initialValues = {

//   Stock: [
//     { stocks: '', pricerange: '', stockweightage: '', entryprice: '', exitprice: '', exitdate: '', comment: '' }],
// };

// const validationSchema = Yup.object().shape({

//   Stock: Yup.array().of(
//     Yup.object().shape({
//       stocks: Yup.string().required('Stocks are required'),
//       pricerange: Yup.string().required('Price range is required'),
//       stockweightage: Yup.string().required('Stock weightage is required'),
//       entryprice: Yup.string().required('Entry price is required'),
//       exitprice: Yup.string().required('Exit price is required'),
//       exitdate: Yup.string().required('Exit date is required'),
//       comment: Yup.string().required('Comment is required'),
//     })
//   ),
// });

// const AddStock = () => {

//   const navigate = useNavigate();
//   const user_id = localStorage.getItem("id");
//   const token = localStorage.getItem("token");

//   const onSubmit = async (values) => {

//     const req = {

//       Stock: values.Stock
//     };

//     try {
//       const response = await AddStock(req, token);
//       console.log(response);

//       if (response.status) {
//         Swal.fire({
//           title: "Create Successful!",
//           text: response.message,
//           icon: "success",
//           timer: 1500,
//           timerProgressBar: true,
//         });
//         setTimeout(() => {
//           navigate("/admin/basket");
//         }, 1500);
//       } else {
//         Swal.fire({
//           title: "Error",
//           text: response.message,
//           icon: "error",
//           timer: 1500,
//           timerProgressBar: true,
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         title: "Error",
//         text: "An unexpected error occurred. Please try again later.",
//         icon: "error",
//         timer: 1500,
//         timerProgressBar: true,
//       });
//     }
//   };

//   return (

//     <div className='page-content'>

//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={onSubmit}
//     >
//       {formikProps => (
//         <DynamicForm
//           fields={fieldConfigurations}
//           formik={formikProps}
//           btn_name="Submit"
//           sumit_btn={true}
//           page_title="Add Stock"
//           btn_name1="Cancel"
//           btn_name1_route="/admin/basket"
//           showAddRemoveButtons={true}
//         />
//       )}
//     </Formik>
//   </div>
//   );
// };

// export default AddStock;
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Formik, Field, Form } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { Addstockbasketform } from "../../../Services/Admin";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

const AddStock = () => {
  const { id: basket_id } = useParams(); // Extract basket_id from the URL
  const [selectedServices, setSelectedServices] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const serviceOptions = [
    { value: "service1", label: "Stock 1" },
    { value: "service2", label: "Stock 2" },
    { value: "service3", label: "Stock 3" },
  ];

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
    if (
      selectedOption &&
      !selectedServices.some(
        (service) => service.value === selectedOption.value
      )
    ) {
      setSelectedServices((prevServices) => [...prevServices, selectedOption]);
    }
  };

  const handleRemoveService = (serviceValue) => {
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
                <Select
                  options={serviceOptions}
                  onChange={handleServiceChange}
                  placeholder="Select a stock"
                  isClearable
                  className="mt-4"
                />
                {selectedServices.map((service) => (
                  <div key={service.value} className="mt-4">
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



