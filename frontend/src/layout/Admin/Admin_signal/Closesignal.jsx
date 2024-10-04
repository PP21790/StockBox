import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GetClient } from '../../../Services/Admin';
import Table from '../../../components/Table';
import { Eye, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { GetSignallist, DeleteSignal, SignalCloseApi, GetService, GetStockDetail } from '../../../Services/Admin';
import { fDateTimeSuffix } from '../../../Utils/Date_formate'



const Closesignal = () => {

    const token = localStorage.getItem('token');
    const [searchInput, setSearchInput] = useState("");




    const [filters, setFilters] = useState({
        from: '',
        to: '',
        service: '',
        stock: '',
    });




    const [serviceList, setServiceList] = useState([]);
    const [stockList, setStockList] = useState([]);

   

    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
  


    const getAllSignal = async () => {
        try {
            const response = await GetSignallist(filters, token);
            if (response && response.status) {
                 const filterdata = response.data.filter((item)=>{
                    return item.close_status == true
                 })
                const searchInputMatch = filterdata.filter((item) => {
                    return (
                        searchInput === "" ||
                        item.stock.title.toLowerCase().includes(searchInput.toLowerCase())
                        ||
                        item.calltype.toLowerCase().includes(searchInput.toLowerCase())
                    );
                });

                setClients(searchInput ? searchInputMatch : filterdata);
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
            console.log('Error fetching services:', error);
        }
    };



    const fetchStockList = async () => {
        try {
            const response = await GetStockDetail(token);
            if (response.status) {
                setStockList(response.data);
            }
        } catch (error) {
            console.log('Error fetching stock list:', error);
        }
    };




    useEffect(() => {
        fetchAdminServices()
        fetchStockList()
    }, []);

    useEffect(() => {
        getAllSignal();
    }, [filters, searchInput]);


    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };


    const Signaldetail = async (_id) => {
        navigate(`/admin/signaldetaile/${_id}`)
    }


 
    let columns = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '70px',
        },

        {
            name: 'Symbol',
            selector: row => row.stock,
            sortable: true,
            width: '132px',
        },
        {
            name: 'Entry Type',
            selector: row => row.close_status == true ? "sell" :"buy",
            sortable: true,
            width: '132px',
        },
        {
            name: 'Entry Price',
            selector: row =>  row.price ,
            sortable: true,
            width: '132px',
        },

        {
            name: 'Exit Price',
            selector: row =>  row.closeprice ? row.closeprice : "-" ,
            sortable: true,
            width: '132px',

        },
        {
            name: 'Entry Date',
            selector: row => fDateTimeSuffix(row.created_at) ,
            sortable: true,
            width: '190px',
        },
        {
            name: 'Exit Date',
            selector: row =>  fDateTimeSuffix(row.closedate) ,
            sortable: true,
            width: '180px',
        },



        {
            name: 'Actions',
            cell: row => (
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
        // {
        //     name: 'Status',
        //     cell: row => (
        //         <>
        //             {!row.close_status ? (
        //                 <button
        //                     className="btn btn-danger btnclose"
        //                     onClick={() => {
        //                         setModel(true);
        //                         setServiceid(row);
        //                         setTargetvalue(row);
        //                     }}
        //                     disabled
        //                 >
        //                    Closed
        //                 </button>
        //             ) : (
        //                 <button
        //                     className="btn btn-danger btnclose"
        //                     onClick={() => {
        //                         setModel(true);
        //                         setServiceid(row);
        //                         setTargetvalue(row);
        //                     }}
        //                     disabled
        //                 >
        //                     Closed
        //                 </button>
        //             )}
        //         </>
        //     ),
        //     ignoreRowClick: true,
        //     allowOverflow: true,
        //     button: true,
        // }

    ];



    return (
        <div>
            <div>
                <div className="page-content">
                    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div className="breadcrumb-title pe-3">Close Signal</div>
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
                            <div className="d-lg-flex align-items-center mb-4 gap-3">
                                <div className="position-relative">
                                    <input
                                        type="text"
                                        className="form-control ps-5 radius-10"
                                        placeholder="Search Order"
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}

                                    />
                                    <span className="position-absolute top-50 product-show translate-middle-y">
                                        <i className="bx bx-search" />
                                    </span>
                                </div>

                                {/* <div className="ms-auto">
                                    <Link
                                        to="/admin/addsignal"
                                        className="btn btn-primary"
                                    >
                                        <i
                                            className="bx bxs-plus-square"
                                            aria-hidden="true"
                                        />
                                        Add Signal
                                    </Link>
                                </div> */}
                            </div>

                            <div className="row">

                                <div className="col-md-4">
                                    <input
                                        type="date"
                                        name="from"
                                        className="form-control radius-10"
                                        placeholder="From"
                                        value={filters.from}
                                        onChange={handleFilterChange}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <input
                                        type="date"
                                        name="to"
                                        className="form-control radius-10"
                                        placeholder="To"
                                        value={filters.to}
                                        onChange={handleFilterChange}
                                    />
                                </div>
                                <div className="col-md-4">
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

                                {/* <div className="col-md-3">
                                    <div className="col-md-10">
                                        <input
                                            type="text"
                                            name="stock"
                                            className="form-control radius-10"
                                            value={filters.stock}
                                            onChange={handleFilterChange}
                                            placeholder="Enter Stock"
                                        />
                                    </div>

                                </div> */}

                            </div>

                        </div>

                        <Table
                            columns={columns}
                            data={clients}
                        />

                    </div>
                </div>
            </div>

        </div>
    );
}

export default Closesignal;
