import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Viewbasket } from "../../../Services/Admin"; // Adjust the import based on your project structure
import Swal from "sweetalert2";
import { useNavigate, useParams, Link } from "react-router-dom";

// Define field configurations for dynamic rendering
const fieldConfigurations = [
  { col_size: 4, name: "price", label: "Price", type: "number", placeholder: "Enter price", disabled: true },
  { col_size: 4, name: "title", label: "Title", type: "text", placeholder: "Enter title" },
  { col_size: 4, name: "accuracy", label: "Accuracy", type: "number", placeholder: "Enter accuracy" },
  { col_size: 4, name: "mininvamount", label: "Minimum Investment Amount", type: "number", placeholder: "Enter minimum investment amount" },
  { col_size: 4, name: "portfolioweightage", label: "Portfolio Weightage", type: "number", placeholder: "Enter portfolio weightage" },
  { col_size: 4, name: "themename", label: "Theme Name", type: "text", placeholder: "Enter theme name" },
  { col_size: 4, name: "returnpercentage", label: "Return Percentage", type: "number", placeholder: "Enter Return Percentage" },
  { col_size: 4, name: "holdingperiod", label: "Holding Period", type: "text", placeholder: "Enter Holding Period" },
  { col_size: 4, name: "potentialleft", label: "Potential Left", type: "text", placeholder: "Enter Potential Left" },
  { col_size: 4, name: "description", label: "Description", type: "text", placeholder: "Enter description" },
  { col_size: 4, name: "cagr", label: "CAGR", type: "number", placeholder: "Enter CAGR" },
  { col_size: 4, name: "validity", label: "Validity", type: "text", placeholder: "Enter validity" },
  { col_size: 4, name: "next_rebalance_date", label: "Next Rebalance Date", type: "date", placeholder: "Enter next rebalance date" },
  {
    col_size: 12,
    name: "Stock",
    label: "Stock",
    type: "Stock",
    placeholder: "Add Stock",
    data: [
      { stocks: "", pricerange: "", stockweightage: "", entryprice: "", exitprice: "", exitdate: "", comment: "" },
    ],
  },
];

// Validation schema for the form
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  accuracy: Yup.string().required("Accuracy is required"),
  mininvamount: Yup.string().required("Minimum Investment Amount is required"),
  portfolioweightage: Yup.string().required("Portfolio Weightage is required"),
  themename: Yup.string().required("Theme Name is required"),
  returnpercentage: Yup.string().required("Return percentage is required"),
  holdingperiod: Yup.string().required("Holding period is required"),
  potentialleft: Yup.string().required("Potential left is required"),
  Stock: Yup.array().of(
    Yup.object().shape({
      stocks: Yup.string().required("Stocks are required"),
      pricerange: Yup.string().required("Price range is required"),
      stockweightage: Yup.string().required("Stock weightage is required"),
      entryprice: Yup.string().required("Entry price is required"),
      exitprice: Yup.string().required("Exit price is required"),
      exitdate: Yup.string().required("Exit date is required"),
      comment: Yup.string().required("Comment is required"),
    })
  ),
});

const Viewbasketdetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    accuracy: "",
    price: "",
    cagr: "",
    mininvamount: "",
    portfolioweightage: "",
    themename: "",
    returnpercentage: "",
    holdingperiod: "",
    potentialleft: "",
    validity: "",
    next_rebalance_date: "",
    Stock: [{ stocks: "", pricerange: "", stockweightage: "", entryprice: "", exitprice: "", exitdate: "", comment: "" }],
  });

  useEffect(() => {
    getbasketdetail();
  }, []);

  const getbasketdetail = async () => {
    try {
      const response = await Viewbasket(id, token);
      if (response.status) {
        const basketData = response.data;
        setInitialValues({
          title: basketData.title || "",
          description: basketData.description || "",
          accuracy: basketData.accuracy || "",
          cagr: basketData.cagr || "",
          price: basketData.price || "",
          mininvamount: basketData.mininvamount || "",
          portfolioweightage: basketData.portfolioweightage || "",
          themename: basketData.themename || "",
          returnpercentage: basketData.returnpercentage || "",
          holdingperiod: basketData.holdingperiod || "",
          potentialleft: basketData.potentialleft || "",
          validity: basketData.validity || "",
          next_rebalance_date: basketData.next_rebalance_date || "",
          Stock: basketData.groupedData || [{ stocks: "", pricerange: "", stockweightage: "", entryprice: "", exitprice: "", exitdate: "", comment: "" }],
        });
      }
    } catch (error) {
      console.error("Error fetching basket details:", error);
      Swal.fire("Error", "Failed to fetch basket details.", "error");
    }
  };

  return (
    <div className="page-content">
      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3">View Basket</div>
        <div className="ps-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 p-0">
              <li className="breadcrumb-item">
                <Link to="/admin/dashboard"><i className="bx bx-home-alt" /></Link>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <hr />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ values }) => (
          <div>
            <h4>Basket Details</h4>
            <div className="row">
              {fieldConfigurations.map((field) => (
                field.type !== "Stock" ? (
                  <div key={field.name} className={`col-md-${field.col_size}`}>
                    <label>{field.label}</label>
                    <input
                      type={field.type}
                      className="form-control"
                      value={values[field.name] || ""}
                      disabled
                    />
                  </div>
                ) : (
                  <div key={field.name} className="col-md-12">
                    <label>{field.label}</label>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Stock</th>
                          <th>Price Range</th>
                          <th>Stock Weightage</th>
                          <th>Entry Price</th>
                          <th>Exit Price</th>
                          <th>Exit Date</th>
                          <th>Comment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.Stock.map((stock, index) => (
                          <tr key={index}>
                            <td>{stock.stocks || "-"}</td>
                            <td>{stock.pricerange || "-"}</td>
                            <td>{stock.stockweightage || "-"}</td>
                            <td>{stock.entryprice || "-"}</td>
                            <td>{stock.exitprice || "-"}</td>
                            <td>{stock.exitdate || "-"}</td>
                            <td>{stock.comment || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              ))}
            </div>
            <div className="mt-3">
              <Link to="/admin/basket" className="btn btn-secondary">Back</Link>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Viewbasketdetail;
