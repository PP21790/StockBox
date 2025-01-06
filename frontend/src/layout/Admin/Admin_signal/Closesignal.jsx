import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { GetClient } from "../../../Services/Admin";
import Table from "../../../components/Table1";
import {
  Eye,
  RefreshCcw,
  Trash2,
  SquarePen,
  IndianRupee,
  ArrowDownToLine,
} from "lucide-react";
import Swal from "sweetalert2";
import {
  GetSignallist,
  GetSignallistWithFilter,
  DeleteSignal,
  SignalCloseApi,
  GetService,
  GetStockDetail,
  UpdatesignalReport,
} from "../../../Services/Admin";
import { fDateTimeSuffix, fDateTimeH } from "../../../Utils/Date_formate";
import { exportToCSV } from "../../../Utils/ExportData";
import Select from "react-select";
import { Tooltip } from "antd";
import { image_baseurl } from "../../../Utils/config";

const Closesignal = () => {
  const [activeTab, setActiveTab] = useState("table"); // State to manage active tab

  const token = localStorage.getItem("token");
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [header, setheader] = useState("Close Signal");

  const [updatetitle, setUpdatetitle] = useState({
    report: "",
    id: "",
    description: "",
  });

  const location = useLocation();
  const clientStatus = location?.state?.clientStatus;

  useEffect(() => {
    if (clientStatus == "todayclosesignal") {
      setheader("Todays Close Signal");
    }
  }, [clientStatus]);

  const today = new Date();
  const formattedDate = today.toISOString().slice(0, 10);

  const [filters, setFilters] = useState({
    from: "",
    to: "",
    service: "",
    stock: "",
  });

  const [serviceList, setServiceList] = useState([]);
  const [stockList, setStockList] = useState([]);
  const [searchstock, setSearchstock] = useState("");
  const [ForGetCSV, setForGetCSV] = useState([]);
  const [model1, setModel1] = useState(false);
  const [serviceid, setServiceid] = useState({});

  const navigate = useNavigate();
  const [clients, setClients] = useState([]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const options = clients.map((item) => ({
    value: item.stock,
    label: item.stock,
  }));

  const handleChange = (selectedOption) => {
    setSearchstock(selectedOption ? selectedOption.value : "");
  };

  const getexportfile = async () => {
    try {
      const response = await GetSignallist(token);
      if (response.status) {
        if (response.data?.length > 0) {
          let filterdata = response.data.filter(
            (item) => item.close_status === true
          );
          const csvArr = filterdata.map((item) => {
            let profitAndLoss = 0;
            if (item.calltype === "BUY") {
              profitAndLoss = (
                (item.closeprice - item.price) *
                item.lotsize
              ).toFixed(2);
            } else if (item.calltype === "SELL") {
              profitAndLoss = (
                (item.price - item.closeprice) *
                item.lotsize
              ).toFixed(2);
            }

            return {
              Symbol: item.tradesymbol || "",
              segment: item?.segment || "",
              EntryType: item?.calltype || "",
              EntryPrice: item?.price || "",
              ExitPrice: item?.closeprice || "",
              ProfitAndLoss: profitAndLoss || "",
              EntryDate: fDateTimeH(item?.created_at) || "",
              ExitDate: fDateTimeH(item?.closedate) || "",
            };
          });
          exportToCSV(csvArr, "Close Signal");
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getAllSignal = async () => {
    try {
      const data = {
        page: currentPage,
        from:
          clientStatus === "todayclosesignal"
            ? formattedDate
            : filters.from
              ? filters.from
              : "",
        to:
          clientStatus === "todayclosesignal"
            ? formattedDate
            : filters.to
              ? filters.to
              : "",
        service: filters.service,
        stock: searchstock,
        closestatus: "true",
        search: searchInput,
      };

      const response = await GetSignallistWithFilter(data, token);
      if (response && response.status) {
        let filterdata = response.data.filter(
          (item) => item.close_status === true
        );

        setClients(filterdata);
        setTotalRows(response.pagination.totalRecords);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchAdminServices = async () => {
    try {
      const response = await GetService(token);
      if (response.status) {
        setServiceList(response.data);
      }
    } catch (error) {
      console.log("Error fetching services:", error);
    }
  };

  const fetchStockList = async () => {
    try {
      const response = await GetStockDetail(token);
      if (response.status) {
        setStockList(response.data);
      }
    } catch (error) {
      console.log("Error fetching stock list:", error);
    }
  };

  useEffect(() => {
    fetchAdminServices();
    fetchStockList();
  }, [filters]);

  useEffect(() => {
    getAllSignal();
  }, [filters, searchInput, searchstock, currentPage]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const Signaldetail = async (_id) => {
    navigate(`/admin/signaldetaile/${_id}`);
  };

  const handleDownload = (row) => {
    const url = `${image_baseurl}uploads/report/${row.report}`;
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  let columns = [
    {
      name: "S.No",
      selector: (row, index) => (currentPage - 1) * 10 + index + 1,
      sortable: false,
      width: "100px",
    },
    {
      name: "Segment",
      selector: (row) =>
        row.segment == "C" ? "CASH" : row.segment == "O" ? "OPTION" : "FUTURE",
      sortable: true,
      width: "132px",
    },
    {
      name: "Symbol",
      selector: (row) => row.tradesymbol,
      sortable: true,
      width: "300px",
    },
    {
      name: "Entry Type",
      selector: (row) => row.calltype,
      sortable: true,
      width: "200px",
    },
    {
      name: "Quantity/Lot",
      selector: (row) => row.lot,
      sortable: true,
      width: "200px",
    },
    {
      name: "Entry Price",
      selector: (row) => (
        <div>
          {" "}
          <IndianRupee />
          {row.price}
        </div>
      ),
      sortable: true,
      width: "200px",
    },

    {
      name: "Exit Price",
      selector: (row) => (
        <div>
          {" "}
          <IndianRupee />
          {row.closeprice ? row.closeprice : "-"}
        </div>
      ),
      sortable: true,
      width: "132px",
    },
    {
      name: "Total P&L",
      cell: (row) => {
        let totalPL = 0;
        if (row.calltype === "BUY") {
          totalPL = ((row.closeprice - row.price) * row.lotsize).toFixed(2);
        } else if (row.calltype === "SELL") {
          totalPL = ((row.price - row.closeprice) * row.lotsize).toFixed(2);
        }
        const style = {
          color: totalPL < 0 ? "red" : "green",
        };
        return <span style={style}>{totalPL}</span>;
      },
      sortable: true,
      width: "200px",
    },
    {
      name: "Entry Date",
      selector: (row) => fDateTimeH(row.created_at),
      sortable: true,
      width: "200px",
    },
    {
      name: "Exit Date",
      selector: (row) => fDateTimeH(row.closedate),
      sortable: true,
      width: "200px",
    },

    {
      name: "Actions",
      cell: (row) => (
        <>
          <div>
            <Eye onClick={() => Signaldetail(row._id)} />
          </div>
          {/* <div>
                        <Trash2 onClick={() => DeleteSignals(row._id)} />
                    </div> */}
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Upload Report",
      cell: (row) => (
        <>
          <div className="d-flex">
            {row.report ? (
              <div
                style={{ color: "green", cursor: "pointer" }}
                onClick={() => handleDownload(row)}
              >
                <Tooltip placement="top" overlay="Download">
                  <ArrowDownToLine />
                </Tooltip>
              </div>
            ) : (
              ""
            )}
            <div className="mx-3">
              <Tooltip placement="top" overlay="Update">
                <SquarePen
                  onClick={() => {
                    setModel1(true);
                    setServiceid(row);
                    setUpdatetitle({ report: row.report, id: row._id });
                  }}
                />
              </Tooltip>
            </div>
          </div>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "200px",
    },
  ];

  const resethandle = () => {
    setFilters({
      from: "",
      to: "",
      service: "",
      stock: "",
    });
    setSearchstock("");
    setSearchInput("");
    fetchAdminServices();
    fetchStockList();
    getAllSignal();
  };

  // Update service
  const updateReportpdf = async () => {
    try {
      const data = {
        id: serviceid._id,
        report: updatetitle.report,
        description: updatetitle.description,
      };

      const response = await UpdatesignalReport(data, token);
      if (response && response.status) {
        Swal.fire({
          title: "Success!",
          text: response.message || "File updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
          timer: 2000,
        });

        setUpdatetitle({ report: "", id: "", description: "" });
        setModel1(false);
        getAllSignal();
      } else {
        Swal.fire({
          title: "Error!",
          text: response.message || "There was an error updating the file.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "server error",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  const updateServiceTitle = (updatedField) => {
    setUpdatetitle((prev) => ({
      ...prev,
      ...updatedField,
    }));
  };

  return (
    <div>
      <div>
        <div className="page-content">
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
          <div className="card">
            <div className="card-body">
              <div className="d-lg-flex align-items-center mb-4 gap-3 justify-content-between">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control ps-5 radius-10"
                    placeholder="Search Signal"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <span className="position-absolute top-50 product-show translate-middle-y">
                    <i className="bx bx-search" />
                  </span>
                </div>

                <div className="ms-2" onClick={(e) => getexportfile()}>
                  <button
                    type="button"
                    className="btn btn-primary float-end"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Export To Excel"
                    delay={{ show: "0", hide: "100" }}
                  >
                    <i className="bx bxs-download" aria-hidden="true"></i>
                    Export-Excel
                  </button>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <label>From Date</label>
                  <input
                    type="date"
                    name="from"
                    className="form-control radius-10"
                    placeholder="From"
                    value={filters.from}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="col-md-3">
                  <label>To Date</label>
                  <input
                    type="date"
                    name="to"
                    className="form-control radius-10"
                    placeholder="To"
                    value={filters.to}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="col-md-3">
                  <label>Select Service</label>
                  <select
                    name="service"
                    className="form-control radius-10"
                    value={filters.service}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Service</option>
                    {serviceList.map((service) => (
                      <option key={service._id} value={service._id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3 d-flex">
                  <div style={{ width: "80%" }}>
                    <label>Select Stock</label>
                    <Select
                      options={options}
                      value={
                        options.find(
                          (option) => option.value === searchstock
                        ) || null
                      }
                      onChange={handleChange}
                      className="form-control radius-10"
                      isClearable
                      placeholder="Select Stock"
                    />
                  </div>
                  <div className="rfreshicon">
                    <RefreshCcw onClick={resethandle} />
                  </div>
                </div>
              </div>
            </div>

            <Table
              columns={columns}
              data={clients}
              totalRows={totalRows}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>

          <div className="card">
            <div className="card-body">
              {/* Tab Navigation */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="btn-group">
                  <button
                    className={`btn btn-outline-primary  ${activeTab === "table" ? "active" : ""
                      }`}
                    onClick={() => setActiveTab("table")}
                  >
                    Table View
                  </button>
                  <button
                    className={`btn btn-outline-primary  ${activeTab === "card" ? "active" : ""
                      }`}
                    onClick={() => setActiveTab("card")}
                  >
                    Card View
                  </button>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="d-lg-flex align-items-center mb-4 gap-3 justify-content-between">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control ps-5 radius-10"
                    placeholder="Search Signal"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <span className="position-absolute top-50 product-show translate-middle-y">
                    <i className="bx bx-search" />
                  </span>
                </div>
                <div className="ms-2" onClick={(e) => getexportfile()}>
                  <button
                    type="button"
                    className="btn btn-primary float-end"
                    title="Export To Excel"
                  >
                    <i className="bx bxs-download" aria-hidden="true"></i>
                    Export-Excel
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="row mb-4">
                <div className="col-md-3">
                  <label>From Date</label>
                  <input
                    type="date"
                    name="from"
                    className="form-control radius-10"
                    placeholder="From"
                    value={filters.from}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="col-md-3">
                  <label>To Date</label>
                  <input
                    type="date"
                    name="to"
                    className="form-control radius-10"
                    placeholder="To"
                    value={filters.to}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="col-md-3">
                  <label>Select Service</label>
                  <select
                    name="service"
                    className="form-control radius-10"
                    value={filters.service}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Service</option>
                    {serviceList.map((service) => (
                      <option key={service._id} value={service._id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3 d-flex">
                  <div style={{ width: "80%" }}>
                    <label>Select Stock</label>
                    <Select
                      options={options}
                      value={
                        options.find(
                          (option) => option.value === searchstock
                        ) || null
                      }
                      onChange={handleChange}
                      className="form-control radius-10"
                      isClearable
                      placeholder="Select Stock"
                    />
                  </div>
                  <div className="rfreshicon">
                    <RefreshCcw onClick={resethandle} />
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === "table" && (
                <Table
                  columns={columns}
                  data={clients}
                  totalRows={totalRows}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}

              {activeTab === "card" && (
                <div className="row">
                  {clients.map((client) => (
                    <div className="col-md-12 mb-3" key={client.id}>
                      <div className="card card radius-10 mb-3 border">
                        <div className="card-body ">
                          <div className="d-flex justify-content-between">
                            <div>
                              <p className="mb-1">
                                <b>Date: 20-10-2021</b>
                              </p>
                              <p className="mb-2">
                                <b>Segment: {client?.segment == "C" ? "CASH" : client?.segment == "O" ? "OPTION" : "FUTURE"}</b>
                              </p>
                            </div>
                            <div>
                              <p className="mb-1"><b>P/L : <span className="text-success"> 20% <i className='bx bx-up-arrow-alt'></i></span></b> </p>
                            </div>
                          </div>
                          <p className="mb-1">
                            Symbol : {client?.tradesymbol} , Entry Type : {client?.calltype} , Quantity/Lot : {client?.lot}, Entry Price : {client?.price} , Entry Date : {fDateTimeH(client?.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {model1 && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Upload Report
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setModel1(false)}
                  />
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="col-md-10">
                        <label htmlFor="imageUpload">Upload Report</label>
                        <span className="text-danger">*</span>
                        <input
                          className="form-control mb-3"
                          type="file"
                          accept="application/pdf"
                          id="imageUpload"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              updateServiceTitle({ report: file });
                            }
                          }}
                        />
                      </div>
                      <div className="col-md-2"></div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <label htmlFor="description">Description</label>
                        <input
                          className="form-control mb-2"
                          type="text"
                          placeholder="Enter Description Title"
                          value={updatetitle.description}
                          onChange={(e) =>
                            updateServiceTitle({ description: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setModel1(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={updateReportpdf}
                  >
                    Update File
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Closesignal;
