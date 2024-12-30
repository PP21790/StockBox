import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, RefreshCcw, Trash2, SquarePen, IndianRupee, X, Plus, History } from 'lucide-react';
import Swal from "sweetalert2";
import { Tooltip } from 'antd';
import Table from "../../../components/Table";
import { BasketAllList, deletebasket, Basketstatusofdetail } from "../../../Services/Admin";
import { fDate } from "../../../Utils/Date_formate";



const BasketStockPublish = () => {


  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const token = localStorage.getItem("token");



  useEffect(() => {
    getbasketlist();
  }, []);



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





  const handleSwitchChange = async (event, id) => {
    const originalChecked = event.target.checked;
    const user_active_status = originalChecked
    const data = { id: id, status: user_active_status };

    const result = await Swal.fire({
      title: "Do you want to save the changes?",
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      allowOutsideClick: false,
    });

    if (result.isConfirmed) {
      try {
        const response = await Basketstatusofdetail(data, token);
        if (response.status) {
          Swal.fire({
            title: "Saved!",
            icon: "success",
            timer: 1000,
            timerProgressBar: true,
          });
          setTimeout(() => {
            Swal.close();
          }, 1000);
        }
        getbasketlist();
      } catch (error) {
        Swal.fire(
          "Error",
          "There was an error processing your request.",
          "error"
        );
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      event.target.checked = !originalChecked;
      getbasketlist();
    }
  };





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
      name: "Basket Name",
      selector: (row) => row.title,
      sortable: true,
      width: '200px',
    },
    {
      name: "Theme Name",
      selector: (row) => row.themename,
      sortable: true,
      width: '200px',
    },
    {
      name: "Min. Inv. Amount",
      selector: (row) => row.mininvamount,
      width: '200px',
    },

    {
      name: "Description",
      selector: (row) => row.description,
      wrap: true,
      width: '200px',
    },
    {
      name: "Validity",
      selector: (row) => row.validity,
      sortable: true,
      width: '200px',
    },
    {
      name: 'Active Status',
      selector: row => (
        <div className="form-check form-switch form-check-info">
          <input
            id={`rating_${row.status}`}
            className="form-check-input toggleswitch"
            type="checkbox"
            defaultChecked={row.status == false}
            onChange={(event) => handleSwitchChange(event, row._id)}
          />
          <label
            htmlFor={`rating_${row.status}`}
            className="checktoggle checkbox-bg"
          ></label>
        </div>
      ),
      sortable: true,
      width: '165px',
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Tooltip title="Add Stock">
            <Link
              to={`/admin/addstock/${row._id}`}
              className="btn px-2"
            >
              <Plus />

            </Link>
          </Tooltip>
          <Tooltip title="view">
            <Link

              to={`/admin/viewdetail/${row._id}`}
              className="btn px-2"
            >
              <Eye />
            </Link>
          </Tooltip>
          {/* <Tooltip title="Edit">
            <Link
              to={`editbasket/${row._id}`}
              className="btn px-2"
            >
              <SquarePen />
            </Link>
          </Tooltip> */}
          <Tooltip title="History ">
            <Link
              to={`/admin/basket-purchase-history/${row._id}`}
              className="btn px-2"
            >
              <History />
            </Link>
          </Tooltip>
          <button
            className="btn px-2"
            onClick={() => Deletebasket(row._id)}
          >
            <Trash2 />
          </button>
        </div>
      ),
    },
  ];





  return (
    <div className="page-content">
      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3">Basket-Stock Published List </div>
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
      <hr />
      <div className="card">
        <div className="card-body">
          <div className="d-lg-flex align-items-center mb-4 gap-3">
            <div className="position-relative">
              <input
                type="text"
                className="form-control ps-5 radius-10"
                placeholder="Search Basket"
              />
              <span className="position-absolute top-50 product-show translate-middle-y">
                <i className="bx bx-search" />
              </span>
            </div>
            <div className="ms-auto">
              <Link to="/admin/addbasket" className="btn btn-primary">
                <i className="bx bxs-plus-square" aria-hidden="true" />
                Add Basket
              </Link>
            </div>
            {/* <div className="ms-2">
              <Link to="/admin/basket/rebalancing" className="btn btn-primary">
                <i className="bx bxs-plus-square" aria-hidden="true" />
                RebBalancing
              </Link>
            </div> */}
          </div>
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

export default BasketStockPublish;
