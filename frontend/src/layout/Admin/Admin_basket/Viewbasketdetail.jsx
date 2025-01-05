import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Viewbasket, getstocklistById } from "../../../Services/Admin";
import Swal from "sweetalert2";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Tooltip } from 'antd';
import { SquarePen } from 'lucide-react';



function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}


const fieldConfigurations = [

  {
    name: "title",
    label: "Basket Name",
    type: "text",
    label_size: 6,
    col_size: 4,
    disable: false,
    star: true
  },
  {
    name: "themename",
    label: "Theme Name",
    type: "text",
    label_size: 6,
    col_size: 4,
    disable: false,
    star: true
  },

  {
    name: "basket_price",
    label: "Basket Price",
    type: "number",
    label_size: 12,
    col_size: 4,
    disable: false,
    star: true

  },

  {
    name: "mininvamount",
    label: "Minimum Amount",
    type: "number",
    label_size: 12,
    col_size: 4,
    disable: false,
    star: true
  },

  {
    name: "frequency",
    label: "Frequency",
    type: "select",
    label_size: 12,
    col_size: 4,
    disable: false,
    star: true
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
    ],
    star: true
  },
  {
    name: "next_rebalance_date",
    label: "Rebalance Date",
    type: "date",
    label_size: 12,
    col_size: 4,
    disable: false,
    star: true
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    label_size: 12,
    col_size: 4,
    disable: false,
    star: true
  },
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
  const [stockdata, setStockdata] = useState({})



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
    GetStocklistbyid()
  }, []);


  const GetStocklistbyid = async () => {
    try {
      const response = await getstocklistById(id, token);
      if (response.status) {
        setStockdata(response?.data)
      }
    } catch (error) {
      console.log("error");
    }
  };


  const updateStock = async (stock) => {
    navigate("/admin/editstock/" + stock._id, { state: { stock } })
  }




  const getbasketdetail = async () => {
    try {
      const response = await Viewbasket(id, token);
      if (response.status) {
        const basketData = response.data;
        setInitialValues({
          title: basketData?.title || "",
          description: stripHtml(basketData?.description) || "",
          basket_price: basketData?.basket_price || "",
          mininvamount: basketData?.mininvamount || "",
          themename: basketData?.themename || "",
          frequency: basketData?.frequency ? basketData?.frequency : "",
          validity: basketData?.validity ? basketData?.validity : "",
          next_rebalance_date: basketData?.next_rebalance_date ? basketData?.next_rebalance_date : "",

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
      <div className="card">
        <div className="card-body">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
          >
            {({ values }) => (
              <div>
                <h4>Basket Details</h4>
                <div className="row">
                  {fieldConfigurations?.map((field) =>
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


                        {Object.keys(
                          (Array.isArray(stockdata) ? stockdata : Object.values(stockdata)).reduce((acc, stock) => {
                            if (!acc[stock.version]) {
                              acc[stock.version] = [];
                            }
                            acc[stock.version].push(stock);
                            return acc;
                          }, {})
                        ).map((version) => {
                          const versionStocks = (Array.isArray(stockdata) ? stockdata : Object.values(stockdata)).filter(
                            (stock) => stock.version === parseInt(version)
                          );

                          return (
                            <>
                              <h5 className="mt-4 mb-3">Stock Details</h5>
                              <div key={version}>
                                <div className="d-flex justify-content-between align-items-center">
                                  <h6>Version {version}</h6>

                                  {versionStocks[0].status == 0 ?
                                    <Tooltip title="Update All">
                                      <SquarePen className="cursor-pointer" onClick={() => updateStock(versionStocks)} />
                                    </Tooltip> : ""}
                                </div>
                                <table className="table table-bordered">
                                  <thead>
                                    <tr>
                                      <th>Stock Name</th>
                                      <th>Weightage</th>
                                      <th>Price</th>
                                      <th>Type</th>
                                      <th>Quantity</th>

                                    </tr>
                                  </thead>
                                  <tbody>
                                    {versionStocks.map((stock, index) => (
                                      <tr key={index}>
                                        <td>{stock?.name}</td>
                                        <td>{stock?.weightage}</td>
                                        <td>{stock?.price}</td>
                                        <td>{stock?.type}</td>
                                        <td>{stock?.quantity}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    )
                  )}
                </div>
                <div className="mt-3">
                  <Link to="/admin/basket" className="btn btn-secondary">
                    Back
                  </Link>
                </div>
              </div>

            )}
          </Formik>
        </div>
      </div>

    </div>
  );
};

export default Viewbasketdetail;
