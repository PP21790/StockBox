
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Addstockbasketform } from "../../../Services/Admin";
import Swal from "sweetalert2";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddStock = () => {
  const { id: basket_id } = useParams();
  const [selectedServices, setSelectedServices] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchOptions = async (inputValue) => {
    if (!inputValue) {
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://192.168.0.11:5001/stock/getstockbysymbol",
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
    setSelectedServices(selectedOption || []);
  };

  const handleRemoveService = (serviceValue) => {
    setSelectedServices((prev) => prev.filter((service) => service.value !== serviceValue));
  };

  const validationSchema = Yup.object().shape(
    selectedServices.reduce((acc, service) => {
      acc[service.value] = Yup.object({
        // name: Yup.string().required("This field is required"),
        percentage: Yup.number()
          .min(0, "Percentage should be between 0 and 100")
          .max(100, "Percentage should be between 0 and 100")
          .required("This field is required"),
        price: Yup.number()
          .min(0, "Price should be greater than 0")
          .required("This field is required"),
      });
      return acc;
    }, {})
  );

  const handleSubmit = async (values) => {
console.log("values",values)

    if (!basket_id) {
      Swal.fire("Error", "Basket ID is missing. Please try again.", "error");
      return;
    }

    const requestData = {
      basket_id,
      stocks: Object.values(values),
    };

    try {
       const response = await Addstockbasketform(requestData );
      console.log("API Response:", response);

      if (response?.status) {
        Swal.fire("Success", response.message, "success");
        setTimeout(() => navigate("/admin/basket"), 1500);
      } else {
        Swal.fire("Error", response.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "An unexpected error occurred. Please try again.", "error");
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
          <div className="row">
            <div className="col-6">
              <input
                type="text"
                placeholder="Search..."
                className="form-control"
                onChange={(e) => fetchOptions(e.target.value)}
              />
            </div>
            <div className="col-6">
              <Select
                options={options}
                onChange={handleServiceChange}
                placeholder="Select a stock"
                isClearable
                isMulti
                isLoading={loading}
              />
            </div>
          </div>
          <Formik
            initialValues={selectedServices.reduce((acc, service) => {
              acc[service.value] = {
                tradesymbol: service.tradesymbol,
                name:service.label,
                percentage: "",
                price: "",
                type:""
              };
              return acc;
            }, {})}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
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
                    {Object.keys(values[service.value] || {}).map((fieldKey) => (
  <div key={fieldKey} className="col-md-3">
    <label>{fieldKey}</label>
    {fieldKey === "type" ? (
      <Field
        as="select"
        name={`${service.value}.${fieldKey}`}
        className="form-control"
      >
        <option value="">Select an option</option>
        <option value="Buy">Buy</option>
        <option value="sell">Sell</option>
        <option value="Hold">Hold</option>
        {/* Add more options as needed */}
      </Field>
    ) : (
      <Field
        name={`${service.value}.${fieldKey}`}
        type={
          fieldKey === "percentage" || fieldKey === "price"
            ? "number"
            : "text"
        }
        className="form-control"
        placeholder={`Enter ${fieldKey}`}
        readOnly={fieldKey === "tradesymbol" || fieldKey === "name"}
      />
    )}
    <ErrorMessage
      name={`${service.value}.${fieldKey}`}
      component="p"
      className="text-danger"
    />
  </div>
))}

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