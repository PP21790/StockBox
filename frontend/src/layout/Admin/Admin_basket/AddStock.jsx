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
import { Addstockbasketform } from "../../../Services/Admin";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

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
          name: "",
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

  const handleSubmit = async () => {
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
    console.log("Form Data:", formData);

    const req = {
      basket_id, // Use the basket_id from the URL
      stocks: Object.values(formData),
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
            initialValues={formData}
            onSubmit={handleSubmit}
          >
            {({ handleChange, values, handleSubmit }) => (
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
                      {Object.keys(formData[service.value]).map(
                        (fieldKey, index) => (
                          <div key={index} className="col-md-3">
                            <label>{fieldKey}</label>
                            <Field
                             type={fieldKey === "percentage" || fieldKey === "price" ? "number" : "text"}
                              // type="text"
                              name={`${service.value}.${fieldKey}`}
                              className="form-control"
                              placeholder={`Enter ${fieldKey}`}
                              onChange={(e) => {
                                const value = e.target.value;
                                setFormData((prevData) => ({
                                  ...prevData,
                                  [service.value]: {
                                    ...prevData[service.value],
                                    [fieldKey]: value,
                                  },
                                }));
                              }}
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
