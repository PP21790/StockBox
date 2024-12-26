import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import Swal from "sweetalert2";
import Table from "../../../components/Table";
import { BasketAllList, deletebasket } from "../../../Services/Admin";
import { fDate } from "../../../Utils/Date_formate";

const ViewPurchaseClient = () => {
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
      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3"> View Purchase Client</div>
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

export default ViewPurchaseClient;
