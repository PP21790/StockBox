import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import { Addstockbasketform } from "../../../Services/Admin";
import Swal from "sweetalert2";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as Config from "../../../Utils/config";
import { Tooltip } from 'antd';

const AddStock = () => {


  const { id: basket_id } = useParams();
  const [selectedServices, setSelectedServices] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [formikValues, setFormikValues] = useState({});
  const [currentlocation,setCurrentlocation] = useState({})
  const [header,setHeader] = useState("Add Stock")
  const navigate = useNavigate();


  const location = useLocation();
  console.log("location",location?.state);
  useEffect(() => {
    if (location?.state) {
      setCurrentlocation(location?.state?.state);  
    }
    if(location?.state?.state == "publish"){
      setHeader("Rebalance Stock")
    }
  }, [location]);

  console.log("currentlocation",currentlocation);
   
  const redirectTo = (currentlocation === "publish") ? "/admin/basket/basketstockpublish" : "/admin/basket";
     
  // Fetch options based on user input
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

  // Handle changes when a stock is selected
  const handleServiceChange = (selectedOption) => {
    setSelectedServices(selectedOption || []);

    const updatedValues = {};
    (selectedOption || []).forEach((service) => {
      updatedValues[service.value] = formikValues[service.value] || {
        tradesymbol: service.tradesymbol,
        name: service.label,
        percentage: "",
        price: "",
        type: "",
      };
    });

    setFormikValues(updatedValues);
  };


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


  };






  // Validation Schema for Formik
const validationSchema = Yup.object().shape(
  selectedServices.reduce((acc, service) => {
    acc[service.value] = Yup.object({
      percentage: Yup.number()
        .min(0, "Percentage should be between 0 and 100")
        .max(100, "Percentage should be between 0 and 100")
        .required("This field is required"),
      price: Yup.number()
        .min(0, "Price should be greater than 0")
        .required("This field is required"),
      // New Fields
      type: Yup.string()
        .oneOf(["Large Cap", "Mid Cap", "Small Cap"], "Invalid type selected")
        .required("This field is required"), // Type is mandatory
      name: Yup.string()
        .min(3, "Name must be at least 3 characters long")
        .required("Name is required"), // Name is mandatory
    });
    return acc;
  }, {})
);


  // Handle form submission
  const handleSubmit = async (values, status) => {
    if (Object.keys(values).length === 0) {
      Swal.fire("warning", "Please add stock ", "warning");

      return;
    }

    let totalWeightage = 0;
    Object.values(values).forEach((stock) => {
      totalWeightage += Number(stock.percentage || 0);
    });

    if (totalWeightage !== 100) {
      Swal.fire(
        "Error",
        "Total weightage of all stocks must be exactly 100.",
        "error"
      );
      return;
    }

    if (!basket_id) {
      Swal.fire("Error", "Basket ID is missing. Please try again.", "error");
      return;
    }

    const stocksWithStatus = Object.values(values).map((stock) => ({
      ...stock,
      status,
    }));

    const requestData = {
      basket_id,
      stocks: stocksWithStatus,
      publishstatus: status == 0 ? false : status == 1 ? true : ""
    };

    try {
      const response = await Addstockbasketform(requestData);
      if (response?.status) {
        Swal.fire("Success", response.message, "success");
        setTimeout(() => navigate(redirectTo), 1500);
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

  // Handle input change for stock symbol search
  const handleInputChange = (value) => {
    setInputValue(value);
    fetchOptions(value);
  };

  // Sync options with selected services
  useEffect(() => {
    setOptions((prevOptions) =>
      prevOptions.filter((option) =>
        selectedServices.some((service) => service.value === option.value)
      )
    );
  }, [selectedServices]);

  return (
    <div className="page-content">
      <div className="row">
        <div className="col-md-6">
          <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div className="breadcrumb-title pe-3">{header}</div>
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
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <Link to={redirectTo}>
            <Tooltip title="Back">
              <i
                className="lni lni-arrow-left-circle"
                style={{ fontSize: "2rem", color: "#000" }}
              />
            </Tooltip>
          </Link>
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
                value={selectedServices}
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
                      {Object.keys(values[service.value] || {}).map(
                        (fieldKey) =>
                          fieldKey !== "tradesymbol" && (
                            <div key={fieldKey} className="col-md-3">
                              <label>
                                {fieldKey === "percentage"
                                  ? "Weightage"
                                  : fieldKey.charAt(0).toUpperCase() +
                                  fieldKey.slice(1)}
                              </label>
                              {fieldKey === "type" ? (
                                <Field
                                  as="select"
                                  name={`${service.value}.${fieldKey}`}
                                  className="form-control"
                                >
                                  <option value="">Select an option</option>
                                  <option value="Large Cap">Large Cap</option>
                                  <option value="Mid Cap">Mid Cap</option>
                                  <option value="Small Cap">Small Cap</option>
                                </Field>
                              ) : (
                                <Field
                                  name={`${service.value}.${fieldKey}`}
                                  type={
                                    fieldKey === "percentage" ||
                                      fieldKey === "price"
                                      ? "number"
                                      : "text"
                                  }
                                  className="form-control"
                                  placeholder={`Enter ${fieldKey === "percentage"
                                    ? "Weightage"
                                    : fieldKey
                                    }`}
                                  readOnly={fieldKey === "name"}
                                />
                              )}
                              <ErrorMessage
                                name={`${service.value}.${fieldKey}`}
                                component="p"
                                className="text-danger"
                              />
                            </div>
                          )
                      )}
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

export default AddStock;
