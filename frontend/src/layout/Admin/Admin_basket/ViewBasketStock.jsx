import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import Swal from "sweetalert2";
import Table from "../../../components/Table";
import { BasketAllList, deletebasket } from "../../../Services/Admin";
import { fDate } from "../../../Utils/Date_formate";
import { Tooltip } from "antd";


const ViewBasketStock = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch basket list
  const getbasketlist = async () => {
    try {
      const response = await BasketAllList(token);
      if (response.status) {
        setClients(response.data);
      }
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getbasketlist();
  }, []);

  // Delete basket
  const Deletebasket = async (_id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this item? This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel",
      });

      if (result.isConfirmed) {
        const response = await deletebasket(_id, token);
        if (response.status) {
          Swal.fire({
            title: "Deleted!",
            text: "The item has been successfully deleted.",
            icon: "success",
            confirmButtonText: "OK",
          });
          getbasketlist();
        }
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "The item deletion was cancelled.",
          icon: "info",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an error deleting the item.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  // Columns for DataTable
  const columns = [
    {
      name: " Name",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.title,
      sortable: true,
    },
    {
    name: "Phone",
    selector: (row) => row.title,
    sortable: true,
  },
    {
      name: "Basket Name",
      selector: (row) => row.title,
      sortable: true,
    },
    
    {
      name: "Min. Inv. Amount",
      selector: (row) => row.mininvamount,
    },
    
    
    {
      name: "Validity",
      selector: (row) => row.validity,
      sortable: true,
    },
    
  ];

  return (
    <div className="page-content">
      {/* <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3"> View Details</div>
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
      </div> */}
      <div className="row">
        <div className="col-md-6">
          <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div className="breadcrumb-title pe-3">View Details</div>
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
          <Link to="/admin/basket/basketstockpublish">
            <Tooltip title="Back">
              <i className="lni lni-arrow-left-circle" style={{ fontSize: "2rem", color: "#000" }} />
            </Tooltip>
          </Link>
        </div>
      </div>
      <hr />
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title">Basket Details</h5>
        </div>
        <div className="">
          
          <Table
            columns={columns}
            data={clients}
            pagination
            highlightOnHover
            striped
          />
        </div>
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title">Stock Details</h5>
        </div>
        <div className="">
          
          <Table
            columns={columns}
            data={clients}
            pagination
            highlightOnHover
            striped
          />
        </div>
      </div>
    </div>
  );
};

export default ViewBasketStock;
