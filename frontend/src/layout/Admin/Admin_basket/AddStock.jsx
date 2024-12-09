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
import React, { useState } from "react";
import Select from "react-select";
import { Formik, Field, Form } from "formik";
import { useNavigate, Link } from "react-router-dom";

const AddStock = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const serviceOptions = [
    { value: "service1", label: "Service 1" },
    { value: "service2", label: "Service 2" },
    { value: "service3", label: "Service 3" },
  ];

  const handleServiceChange = (selectedOption) => {
    if (
      selectedOption &&
      !selectedServices.some(
        (service) => service.value === selectedOption.value
      )
    ) {
      setSelectedServices((prevServices) => [...prevServices, selectedOption]);
      setFormData((prevData) => ({
        ...prevData,
        [selectedOption.value]: {
          stocks: "",
          tradesymbol: "",
          percentage: "",
          price: "",
        },
      }));
    }
  };

  const handleRemoveService = (serviceValue) => {
    setSelectedServices((prevServices) =>
      prevServices.filter((service) => service.value !== serviceValue)
    );
    setFormData((prevData) => {
      const newData = { ...prevData };
      delete newData[serviceValue];
      return newData;
    });
  };

  const handleSubmit = (values) => {
    // Log the form values when submitted
    console.log("Form values:", values);
    console.log("Dynamic formData:", formData);
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
            initialValues={formData}
            onSubmit={handleSubmit}
          >
            {({ handleChange, values, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Select
                  options={serviceOptions}
                  onChange={handleServiceChange}
                  placeholder="Select a service"
                  isClearable
                  className="mt-4"
                />
                {selectedServices.map((service) => (
                  <div key={service.value} className="mt-4">
                    <h5>
                      {service.label}

                      {selectedServices && selectedServices.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-danger btn-sm float-end"
                          onClick={() => handleRemoveService(service.value)}
                        >
                          <i className="bx bx-trash m-0"></i>
                        </button>
                      )}
                    </h5>
                    <div className="row">
                      {Object.keys(formData[service.value]).map(
                        (fieldKey, index) => (
                          <div key={index} className="col-md-3">
                            <label>{fieldKey}</label>
                            <Field
                              type="text"
                              name={`${service.value}.${fieldKey}`}
                              className="form-control "
                              placeholder={`Enter ${fieldKey}`}
                            />
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
